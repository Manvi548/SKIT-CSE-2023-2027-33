# SKIT-CSE-2023-2027-33
Final Year Project-Multimodal_Emotion_Recognition_System

# Multimodal Emotion Recognition System

**Final Year Project — SKIT CSE (2023–2027), Batch 33**

A system for detecting and classifying human emotions from text using both classical Machine Learning and Deep Learning approaches, built as part of the B.Tech final year project.

---

## 📌 Overview

Emotion recognition is a core problem in affective computing, with applications in mental health monitoring, customer sentiment analysis, human-computer interaction, and social media analytics. This project explores and compares two approaches to detecting emotion from textual input:

- A **classical Machine Learning pipeline** (feature engineering + traditional classifiers)
- A **Deep Learning pipeline** (neural network–based text classification)

The goal is to identify emotions such as *joy, sadness, anger, fear, surprise,* and *neutral* (adjust to match your actual label set) from raw text data, and to compare the performance and trade-offs of ML vs. DL methods on the same task.

> **Note:** This repository currently implements the **text modality**. If audio/visual modalities are part of the broader multimodal system, add a short section describing their status (planned / in progress / integrated) once available.

---

## 🗂️ Repository Structure

```
.
├── ML_Textual_detection.ipynb   # Classical ML pipeline for text-based emotion detection
├── DL_text_detection.ipynb      # Deep Learning pipeline for text-based emotion detection
├── Untitled28 (1).ipynb         # Supplementary / exploratory notebook
└── README.md
```

---

## ⚙️ Approach

### 1. Machine Learning Pipeline (`ML_Textual_detection.ipynb`)
- Text preprocessing (cleaning, tokenization, stopword removal, etc.)
- Feature extraction (e.g., TF-IDF / Bag-of-Words / word embeddings)
- Classical classifiers (e.g., Logistic Regression, SVM, Naive Bayes, Random Forest — update to match what's used)
- Evaluation using standard classification metrics

### 2. Deep Learning Pipeline (`DL_text_detection.ipynb`)
- Text preprocessing and sequence encoding
- Neural network architecture (e.g., LSTM / BiLSTM / CNN / Transformer-based model — update to match what's used)
- Model training with validation
- Evaluation and comparison against the ML baseline

---

## 🧰 Tech Stack

- **Language:** Python
- **Environment:** Jupyter Notebook
- **Core Libraries:** NumPy, Pandas, Scikit-learn, TensorFlow/Keras or PyTorch, NLTK/spaCy *(update based on actual imports used in the notebooks)*

---

## 🚀 Getting Started

### Prerequisites
```bash
pip install numpy pandas scikit-learn tensorflow nltk matplotlib seaborn
```
*(Update this list to match the exact dependencies used in the notebooks.)*

### Running the Project
1. Clone the repository
   ```bash
   git clone https://github.com/Manvi548/SKIT-CSE-2023-2027-33.git
   cd SKIT-CSE-2023-2027-33
   ```
2. Launch Jupyter Notebook
   ```bash
   jupyter notebook
   ```
3. Open `ML_Textual_detection.ipynb` or `DL_text_detection.ipynb` and run the cells sequentially.

---

## 📊 Dataset

*(Add details here: dataset name/source, number of samples, emotion labels/classes, and a link if publicly available — e.g., ISEAR, GoEmotions, EmoInt, or a custom dataset.)*

---

## 📈 Results

| Model | Accuracy | Precision | Recall | F1-Score |
|-------|----------|-----------|--------|----------|
| ML (e.g., SVM/Logistic Regression) | – | – | – | – |
| DL (e.g., LSTM/BiLSTM) | – | – | – | – |

*(Fill in with actual results from the notebooks.)*

---

## 🔮 Future Scope

- Extend to audio and facial-expression modalities for true multimodal fusion
- Real-time emotion detection pipeline
- Deployment as a web application / API

---

## 👥 Team

Final Year Project — SKIT CSE, Batch 2023–2027, Group 33
*(Add team member names here.)*

---

## 📄 License

*(Add a license if applicable, e.g., MIT License.)*
