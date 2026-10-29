
import React, { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  FileImage,
  FileVideo,
  Heart,
  Image as ImageIcon,
  Menu,
  MessageSquareText,
  RotateCcw,
  ScanFace,
  Sparkles,
  Upload,
  X,
  Zap,
} from "lucide-react";

const modalities = [
  {
    id: "text",
    title: "Text",
    description: "Explore emotion in written language",
    formats: "Sentences, messages, or paragraphs",
    icon: MessageSquareText,
  },
  {
    id: "image",
    title: "Image",
    description: "Select a photo or portrait",
    formats: "JPG, PNG, WEBP · Up to 10 MB",
    icon: ScanFace,
  },
  {
    id: "video",
    title: "Video",
    description: "Choose a video clip",
    formats: "MP4, WEBM, MOV · Up to 100 MB",
    icon: FileVideo,
  },
];

const emotions = [
  { name: "Joy", emoji: "😊", color: "#d9a441", keywords: ["happy", "joy", "love", "wonderful", "excited", "great", "amazing", "grateful", "cheerful", "delighted"] },
  { name: "Sadness", emoji: "😔", color: "#6686d9", keywords: ["sad", "lonely", "miss", "cry", "upset", "disappointed", "unhappy", "hurt", "heartbroken"] },
  { name: "Anger", emoji: "😠", color: "#df6b65", keywords: ["angry", "hate", "furious", "annoyed", "frustrated", "irritated", "terrible", "mad"] },
  { name: "Fear", emoji: "😟", color: "#4f9d8d", keywords: ["afraid", "scared", "worried", "nervous", "anxious", "fear", "uncertain", "panic"] },
  { name: "Surprise", emoji: "😮", color: "#a17ad9", keywords: ["wow", "unexpected", "surprised", "unbelievable", "shocked", "astonished"] },
  { name: "Neutral", emoji: "😐", color: "#87909f", keywords: [] },
];

function App() {
  const [activeModality, setActiveModality] = useState("text");
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const imageInput = useRef(null);
  const videoInput = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [imageUrl, videoUrl]);

  const currentModality =
    modalities.find((item) => item.id === activeModality) || modalities[0];

  function chooseModality(id) {
    setActiveModality(id);
    setResult(null);
    setError("");
  }

  function handleFile(event, type) {
    const file = event.target.files?.[0];
    if (!file) return;

    const isImage = type === "image";
    const validType = isImage
      ? file.type.startsWith("image/")
      : file.type.startsWith("video/");
    const maxSize = isImage ? 10 * 1024 * 1024 : 100 * 1024 * 1024;

    if (!validType) {
      setError(isImage ? "Choose a valid image file." : "Choose a valid video file.");
      event.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      setError(
        isImage
          ? "The image must be smaller than 10 MB."
          : "The video must be smaller than 100 MB."
      );
      event.target.value = "";
      return;
    }

    setError("");
    setResult(null);

    if (isImage) {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  }

  function getTextEmotion(value) {
    const normalized = value.toLowerCase();

    for (const emotion of emotions) {
      if (emotion.keywords.some((word) =>
        new RegExp(`\\b${word}\\b`, "i").test(normalized)
      )) {
        return emotion;
      }
    }

    return emotions[5];
  }

  function analyze() {
    setError("");
    setResult(null);

    if (activeModality === "text" && !text.trim()) {
      setError("Enter some text to continue.");
      return;
    }

    if (activeModality === "image" && !imageFile) {
      setError("Select an image to continue.");
      return;
    }

    if (activeModality === "video" && !videoFile) {
      setError("Select a video to continue.");
      return;
    }

    // Text uses a simple local keyword demonstration.
    // Image and video require a connected model for genuine analysis.
    if (activeModality !== "text") {
      setError(
        "Your file is ready. Connect your emotion-recognition model to analyze image and video inputs."
      );
      return;
    }

    setBusy(true);

    timer.current = window.setTimeout(() => {
      const emotion = getTextEmotion(text);
      const entry = {
        ...emotion,
        modality: "text",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setResult(entry);
      setHistory((previous) => [entry, ...previous].slice(0, 5));
      setBusy(false);
    }, 500);
  }

  function clearInput() {
    setText("");
    setImageFile(null);
    setVideoFile(null);

    if (imageUrl) URL.revokeObjectURL(imageUrl);
    if (videoUrl) URL.revokeObjectURL(videoUrl);

    setImageUrl("");
    setVideoUrl("");
    setResult(null);
    setError("");

    if (imageInput.current) imageInput.current.value = "";
    if (videoInput.current) videoInput.current.value = "";
  }

  function resetResult() {
    setResult(null);
    setError("");
  }

  function goToWorkspace() {
    document.getElementById("workspace")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setMenuOpen(false);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="EmotionAI home">
          <span className="brand-mark"><Activity size={21} /></span>
          <span className="brand-name">emotion<span>ai</span></span>
        </a>

        <button
          className="mobile-menu"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#workspace" onClick={() => setMenuOpen(false)}>Explore</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <button className="nav-cta" onClick={goToWorkspace}>
            Get started <ArrowRight size={16} />
          </button>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> UNDERSTAND THE FEELING</div>
            <h1>Every emotion tells a story<span>.</span></h1>
            <p className="hero-description">
              Discover the feelings behind words, expressions, and visual moments
              with a thoughtful approach to emotion recognition.
            </p>
            <div className="hero-actions">
              <button className="button-primary" onClick={goToWorkspace}>
                Explore emotion analysis <ArrowRight size={17} />
              </button>
              <a className="text-link" href="#features">
                Discover more <ArrowDown size={15} />
              </a>
            </div>
            <div className="hero-benefits">
              <span><Check size={15} /> Simple to use</span>
              <span><Check size={15} /> Multiple input types</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Emotion visualization">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-card card-back">
              <span className="tiny-label">EMOTIONAL SIGNALS</span>
              <div className="wave-bars">
                {[22, 38, 16, 45, 29, 39, 18, 32, 24].map((height, index) => (
                  <i key={index} style={{ height }} />
                ))}
              </div>
              <span className="art-caption">Patterns in expression</span>
            </div>
            <div className="art-card card-front">
              <div className="face-icon">☺</div>
              <div className="art-card-bottom">
                <div><span className="tiny-label">EXPLORE</span><strong>Human emotion</strong></div>
                <span className="sparkle"><Sparkles size={19} /></span>
              </div>
            </div>
            <div className="floating-chip chip-top"><span className="chip-dot purple-dot" /> Language</div>
            <div className="floating-chip chip-bottom"><span className="chip-dot yellow-dot" /> Expression</div>
          </div>
        </section>

        <section className="intro-strip">
          <div className="section-wrap intro-inner">
            <p className="intro-kicker">A NEW PERSPECTIVE</p>
            <div className="intro-statement">
              Look beyond the surface.
              <span>Explore the emotional signals hidden in everyday content.</span>
            </div>
            <div className="intro-side"><Heart size={19} /> Made for meaningful insights.</div>
          </div>
        </section>

        <section className="workspace-section section-wrap" id="workspace">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-number">01</span> EMOTION EXPLORER</div>
              <h2>What would you like to explore?</h2>
              <p>Choose an input type to get started.</p>
            </div>
            <div className="workspace-tag"><span /> Ready when you are</div>
          </div>

          <div className="workspace-layout">
            <aside className="modality-sidebar">
              <p className="sidebar-label">SELECT INPUT</p>
              {modalities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`modality-option ${activeModality === item.id ? "selected" : ""}`}
                    onClick={() => chooseModality(item.id)}
                  >
                    <span className="modality-icon"><Icon size={20} /></span>
                    <span className="modality-copy">
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>
                    <span className="modality-index">0{index + 1}</span>
                  </button>
                );
              })}

              <div className="sidebar-prompt">
                <Sparkles size={17} />
                <div>
                  <strong>Start with a feeling</strong>
                  <p>Try a sentence that captures a moment or mood.</p>
                </div>
              </div>

              <button className="history-toggle" onClick={() => setHistoryOpen(!historyOpen)}>
                <RotateCcw size={15} /> Recent activity
                <ChevronDown className={historyOpen ? "rotated" : ""} size={15} />
              </button>

              {historyOpen && (
                <div className="history-list">
                  {history.length ? history.map((item, index) => (
                    <div className="history-item" key={`${item.time}-${index}`}>
                      <span>{item.emoji}</span>
                      <div><strong>{item.name}</strong><small>{item.modality} · {item.time}</small></div>
                    </div>
                  )) : <p className="history-empty">Your recent activity will appear here.</p>}
                </div>
              )}
            </aside>

            <div className="workspace-main">
              <div className="workspace-topline">
                <span><span className="live-dot" /> {currentModality.title.toUpperCase()} INPUT</span>
                <span className="step-count">YOUR CONTENT</span>
              </div>

              {!result ? (
                <div className="input-area">
                  <div className="input-title-row">
                    <div>
                      <h3>
                        {activeModality === "text"
                          ? "Put your thoughts into words."
                          : activeModality === "image"
                          ? "Choose an image to explore."
                          : "Choose a video to explore."}
                      </h3>
                      <p>{currentModality.formats}</p>
                    </div>
                    <span className="input-type-icon">
                      {activeModality === "text" ? <MessageSquareText size={22} /> :
                       activeModality === "image" ? <FileImage size={22} /> : <FileVideo size={22} />}
                    </span>
                  </div>

                  {activeModality === "text" && (
                    <div className="text-input-wrap">
                      <textarea
                        value={text}
                        onChange={(event) => { setText(event.target.value.slice(0, 1000)); setError(""); }}
                        maxLength={1000}
                        placeholder="Write a thought, a message, or describe a moment..."
                        aria-label="Text for emotion exploration"
                      />
                      <div className="textarea-footer">
                        <span>{text.length} / 1,000 characters</span>
                        <button className="subtle-button" onClick={() => setText("I felt nervous at first, but the support from my friends made me feel confident and happy.")}>
                          Try an example
                        </button>
                      </div>
                    </div>
                  )}

                  {activeModality === "image" && (
                    <div className={`dropzone ${imageUrl ? "has-preview" : ""}`}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) => {
                        event.preventDefault();
                        const file = event.dataTransfer.files?.[0];
                        if (file) handleFile({ target: { files: [file], value: "" } }, "image");
                      }}>
                      {imageUrl ? (
                        <>
                          <img className="image-preview" src={imageUrl} alt="Selected image preview" />
                          <div className="file-details"><strong>{imageFile?.name}</strong><span>{(imageFile.size / 1048576).toFixed(2)} MB</span></div>
                          <button className="icon-button" onClick={clearInput} aria-label="Remove image"><X size={17} /></button>
                        </>
                      ) : (
                        <>
                          <span className="upload-symbol"><Upload size={24} /></span>
                          <strong>Drop an image here, or <button className="inline-upload" onClick={() => imageInput.current?.click()}>browse files</button></strong>
                          <small>JPG, PNG, or WEBP · Maximum 10 MB</small>
                        </>
                      )}
                      <input ref={imageInput} type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleFile(event, "image")} />
                    </div>
                  )}

                  {activeModality === "video" && (
                    <div className={`dropzone ${videoUrl ? "has-preview" : ""}`}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) => {
                        event.preventDefault();
                        const file = event.dataTransfer.files?.[0];
                        if (file) handleFile({ target: { files: [file], value: "" } }, "video");
                      }}>
                      {videoUrl ? (
                        <>
                          <video className="video-preview" src={videoUrl} controls aria-label="Selected video preview" />
                          <div className="file-details"><strong>{videoFile?.name}</strong><span>{(videoFile.size / 1048576).toFixed(2)} MB</span></div>
                          <button className="icon-button" onClick={clearInput} aria-label="Remove video"><X size={17} /></button>
                        </>
                      ) : (
                        <>
                          <span className="upload-symbol"><Upload size={24} /></span>
                          <strong>Drop a video here, or <button className="inline-upload" onClick={() => videoInput.current?.click()}>browse files</button></strong>
                          <small>MP4, WEBM, or MOV · Maximum 100 MB</small>
                        </>
                      )}
                      <input ref={videoInput} type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(event) => handleFile(event, "video")} />
                    </div>
                  )}

                  {error && <p className="error-message" role="alert">{error}</p>}

                  <div className="input-actions">
                    <button className="clear-button" onClick={clearInput}>Clear</button>
                    <button className="button-primary analyze-cta" onClick={analyze} disabled={busy}>
                      {busy ? <>Exploring <span className="mini-spinner" /></> : <>Explore emotion <ArrowRight size={16} /></>}
                    </button>
                  </div>
                  {busy && <p className="processing-note">Exploring the language in your text…</p>}
                </div>
              ) : (
                <div className="result-view">
                  <div className="result-top">
                    <span className="result-check"><Check size={18} /></span>
                    <div><span className="result-overline">TEXT INSIGHT</span><h3>A possible emotional tone</h3><p>Based on a simple keyword-based text demonstration.</p></div>
                    <button className="icon-button result-close" onClick={resetResult} aria-label="Close result"><X size={18} /></button>
                  </div>
                  <div className="result-grid">
                    <div className="primary-emotion">
                      <span className="result-label">SUGGESTED EMOTION</span>
                      <div className="emotion-face">{result.emoji}</div>
                      <h4>{result.name}</h4>
                      <p>Text-based suggestion</p>
                    </div>
                    <div className="confidence-panel">
                      <div className="signal-heading"><Zap size={18} /><strong>What this may suggest</strong></div>
                      <p>{result.name === "Neutral"
                        ? "The text did not contain a clear match for the emotion keywords used in this demonstration."
                        : `Some words in your text are commonly associated with ${result.name.toLowerCase()}. Context can change their meaning.`}</p>
                      <div className="result-note">This is a simple language-based suggestion, not a clinical assessment or a model confidence score.</div>
                    </div>
                  </div>
                  <button className="button-primary" onClick={resetResult}>Explore another text <ArrowRight size={16} /></button>
                </div>
              )}

              <div className="workspace-footer">
                <span><Heart size={14} /> Your content stays in this browser preview.</span>
                <span>{currentModality.formats}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <div className="section-wrap">
            <div className="section-heading features-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-number">02</span> EXPLORE THE POSSIBILITIES</div>
                <h2>More ways to understand emotion.</h2>
                <p>Different forms of content offer different signals to explore.</p>
              </div>
            </div>

            <div className="feature-cards">
              <article className="feature-card">
                <span className="feature-icon"><MessageSquareText size={22} /></span>
                <h3>Language & tone</h3>
                <p>Explore the words, phrases, and patterns that can communicate an emotional tone.</p>
                <span className="feature-link">Text exploration <ArrowRight size={15} /></span>
              </article>
              <article className="feature-card">
                <span className="feature-icon"><ImageIcon size={22} /></span>
                <h3>Visual expression</h3>
                <p>Bring in a photo or portrait to preview it before image-analysis capabilities are connected.</p>
                <span className="feature-link">Image input <ArrowRight size={15} /></span>
              </article>
              <article className="feature-card">
                <span className="feature-icon"><Activity size={22} /></span>
                <h3>Moments in motion</h3>
                <p>Select and preview a video clip as part of a multimodal emotion workflow.</p>
                <span className="feature-link">Video input <ArrowRight size={15} /></span>
              </article>
            </div>
          </div>
        </section>

        <section className="closing-cta section-wrap">
          <div>
            <span className="closing-kicker">A MOMENT OF REFLECTION</span>
            <h2>Start with what you feel.</h2>
            <p>Choose a piece of content and begin exploring its emotional tone.</p>
          </div>
          <button className="button-light" onClick={goToWorkspace}>Get started <ArrowRight size={16} /></button>
        </section>
      </main>

      <footer className="footer">
        <a className="footer-brand" href="#home"><span className="brand-mark"><Activity size={17} /></span> emotionai</a>
        <span>Explore the language of emotion.</span>
        <a className="back-top" href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}

export default App;
