# KrishiLynk

### Explainable AI for Crop Disease Intelligence

<p align="center">
  <img src="https://img.shields.io/badge/AI-Explainable-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Frontend-React_+_Vite-0ea5e9?style=for-the-badge">
  <img src="https://img.shields.io/badge/Backend-FastAPI-16a34a?style=for-the-badge">
  <img src="https://img.shields.io/badge/XAI-GradCAM_|_LIME_|_IG-7c3aed?style=for-the-badge">
  <img src="https://img.shields.io/badge/Research-AOPC_Validated-f59e0b?style=for-the-badge">
</p>

---

## Overview

KrishiLynk is a research-grade explainable artificial intelligence platform for precision agricultural diagnostics.

The system combines:

- Multi-model convolutional neural inference
- Explainable AI attribution systems
- Visual lesion localization
- Faithfulness validation
- Neural consensus analysis

into a unified crop disease intelligence workflow.

Unlike conventional black-box classifiers, KrishiLynk provides transparent reasoning behind predictions using multiple explainability techniques.

---

# Core Features

## Multi-Model Neural Inference

KrishiLynk performs disease analysis using multiple CNN architectures:

- ResNet-18
- EfficientNet-B0
- DenseNet-121

This enables:
- cross-model validation
- consensus diagnostics
- reliability comparison
- explainability benchmarking

---

## Explainable AI (XAI)

The platform integrates multiple explainability systems:

| Method | Purpose |
|---|---|
| Grad-CAM | Lesion localization |
| LIME | Perturbation explainability |
| Integrated Gradients | Attribution analysis |
| AOPC | Faithfulness validation |

---

## Research-Grade Validation

KrishiLynk evaluates explainability quality using:

### AOPC (Area Over Perturbation Curve)

This quantitatively measures whether highlighted regions genuinely influence model predictions.

Positive AOPC scores indicate:
- faithful explanations
- meaningful attribution
- reliable neural focus

---

# System Architecture

```text
Frontend (React + Vite)
        ↓
FastAPI Backend
        ↓
CNN Inference Pipeline
        ↓
XAI Generation Layer
        ↓
AOPC Faithfulness Validation
        ↓
Interactive Visualization Dashboard
```

---

# Tech Stack

## Frontend
- React
- Vite
- TailwindCSS
- Lucide Icons

## Backend
- FastAPI
- PyTorch
- OpenCV
- NumPy

## Explainability
- Grad-CAM
- LIME
- Integrated Gradients

---

# UI Philosophy

KrishiLynk is designed as a cinematic research-grade AI interface inspired by:

- OpenAI
- Anthropic
- Perplexity
- enterprise deep-tech platforms

Design goals:
- explainability clarity
- investor-grade presentation
- premium interaction design
- high-density information visualization

---

# Local Development

## Clone Repository

```bash
git clone https://github.com/prasharindustries/KrishiLynk.git
cd KrishiLynk
```

---

# Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

---

# API Endpoint

## Predict Disease

```http
POST /api/v1/predict
```

Returns:
- disease prediction
- confidence scores
- top-5 predictions
- Grad-CAM visualization
- LIME explanation
- Integrated Gradients attribution
- AOPC-based reliability insights

---

# Project Structure

```text
KrishiLynk/
│
├── backend/
│   ├── routes/
│   ├── utils/
│   ├── xai/
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── hooks/
│   └── services/
│
├── scripts/
├── tests/
└── docker-compose.yml
```

---

# Future Roadmap

- Voice-enabled AI agronomist assistant
- Gemini-powered agricultural chatbot
- Real-time field diagnostics
- Mobile deployment
- Satellite crop analysis integration
- Edge AI inference
- Disease progression forecasting
- Precision treatment recommendation system

---

# Research Direction

KrishiLynk explores the intersection of:

- Explainable AI
- Agricultural Intelligence
- Neural Attribution Systems
- Precision Farming
- Human-Centered Machine Learning

---

# Status

### Active Development

Current focus:
- premium AI interface refinement
- multimodal explainability
- AI agronomist assistant
- investor/demo readiness

---

# License

MIT License

---

# Vision

KrishiLynk aims to make agricultural AI:

- transparent
- trustworthy
- interpretable
- research-driven
- field-deployable

while bridging the gap between deep learning systems and real-world agricultural decision making.
