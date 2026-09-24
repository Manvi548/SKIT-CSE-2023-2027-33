let selectedInput = "";


/* ================= SELECT INPUT ================= */

function selectInput(inputType) {

  selectedInput = inputType;

  const workspace = document.getElementById("inputWorkspace");
  const textPanel = document.getElementById("textInputPanel");
  const imagePanel = document.getElementById("imageInputPanel");
  const videoPanel = document.getElementById("videoInputPanel");
  const title = document.getElementById("workspaceTitle");
  const message = document.getElementById("message");

  textPanel.classList.add("hidden");
  imagePanel.classList.add("hidden");
  videoPanel.classList.add("hidden");

  if (inputType === "Text") {
    textPanel.classList.remove("hidden");
    title.textContent = "Text Analysis";
  }

  if (inputType === "Image") {
    imagePanel.classList.remove("hidden");
    title.textContent = "Image Analysis";
  }

  if (inputType === "Video") {
    videoPanel.classList.remove("hidden");
    title.textContent = "Video Analysis";
  }

  workspace.classList.remove("hidden");
  message.classList.add("hidden");

  workspace.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* ================= CLOSE WORKSPACE ================= */

function closeWorkspace() {

  document.getElementById("inputWorkspace").classList.add("hidden");
  document.getElementById("resultBox").classList.add("hidden");
  document.getElementById("processingBox").classList.add("hidden");
  document.getElementById("message").classList.remove("hidden");

  document.getElementById("message").textContent =
    "Select a modality above to begin analysis.";

  selectedInput = "";
}


/* ================= TEXT CHARACTER COUNT ================= */

const textInput = document.getElementById("textInput");
const characterCount = document.getElementById("characterCount");

textInput.addEventListener("input", function () {
  characterCount.textContent = this.value.length + " / 1000";
});


/* ================= IMAGE PREVIEW ================= */

function previewImage(event) {

  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const preview = document.getElementById("imagePreview");
  const container = document.getElementById("imagePreviewContainer");
  const name = document.getElementById("imageName");

  preview.src = URL.createObjectURL(file);
  name.textContent = file.name;

  container.classList.remove("hidden");
}


/* ================= VIDEO PREVIEW ================= */

function previewVideo(event) {

  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const preview = document.getElementById("videoPreview");
  const container = document.getElementById("videoPreviewContainer");
  const name = document.getElementById("videoName");

  preview.src = URL.createObjectURL(file);
  name.textContent = file.name;

  container.classList.remove("hidden");
}


/* ================= ANALYZE INPUT ================= */

function analyzeInput() {

  let valid = true;

  if (selectedInput === "Text") {

    const text = document
      .getElementById("textInput")
      .value
      .trim();

    if (text.length === 0) {

      alert("Please enter some text before analysis.");

      valid = false;
    }
  }

  if (selectedInput === "Image") {

    const image = document.getElementById("imageInput");

    if (image.files.length === 0) {

      alert("Please select an image before analysis.");

      valid = false;
    }
  }

  if (selectedInput === "Video") {

    const video = document.getElementById("videoInput");

    if (video.files.length === 0) {

      alert("Please select a video before analysis.");

      valid = false;
    }
  }

  if (!valid) {
    return;
  }

  document.getElementById("inputWorkspace").classList.add("hidden");

  const processing = document.getElementById("processingBox");

  processing.classList.remove("hidden");

  processing.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  /*
    Temporary frontend simulation.

    Later this section can be replaced
    with a fetch() request to the backend API.
  */

  setTimeout(function () {

    processing.classList.add("hidden");

    showResult();

  }, 1800);
}


/* ================= SHOW RESULT ================= */

function showResult() {

  const result = document.getElementById("resultBox");
  const modality = document.getElementById("resultModality");
  const emotion = document.getElementById("emotionName");
  const emoji = document.getElementById("emotionEmoji");
  const confidence = document.getElementById("confidenceValue");
  const fill = document.getElementById("confidenceFill");

  modality.textContent = selectedInput;

  emotion.textContent = "Happy";

  emoji.textContent = "😊";

  confidence.textContent = "92%";

  result.classList.remove("hidden");

  setTimeout(function () {
    fill.style.width = "92%";
  }, 100);

  result.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


/* ================= NEW ANALYSIS ================= */

function startNewAnalysis() {

  document.getElementById("resultBox").classList.add("hidden");

  document.getElementById("inputWorkspace").classList.remove("hidden");

  if (selectedInput === "Text") {

    document
      .getElementById("textInputPanel")
      .classList.remove("hidden");

  } else if (selectedInput === "Image") {

    document
      .getElementById("imageInputPanel")
      .classList.remove("hidden");

  } else if (selectedInput === "Video") {

    document
      .getElementById("videoInputPanel")
      .classList.remove("hidden");
  }

  document
    .getElementById("inputWorkspace")
    .scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
}
