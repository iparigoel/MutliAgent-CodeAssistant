# Multi-Agent Code Assistant

An AI-powered coding assistant that leverages a multi-agent workflow to generate, review, test, and evaluate code. The system combines Large Language Models (LLMs) with a machine learning–based code quality analyzer to provide reliable and high-quality coding solutions.

## 🚀 Features

* Multi-agent architecture for structured code generation
* Automated planning, coding, review, and testing workflow
* Machine Learning–based code quality analysis
* Interactive web interface for coding queries
* LLM-powered code generation and reasoning
* Real-time communication between frontend, backend, and ML services
* Scalable cloud deployment using Railway and Vercel

---

## 🏗️ Architecture

```text
User
 │
 ▼
Frontend (Next.js)
 │
 ▼
Backend (Express.js + LangGraph)
 │
 ├── Planner Agent
 ├── Coding Agent
 ├── Reviewer Agent
 │
 ▼
ML Quality Analyzer
(FastAPI + Random Forest)
 │
 ▼
Testing Agent
 │
 ▼
Final Response
```

---

## 🧠 Workflow

1. User submits a coding query.
2. Planner Agent analyzes the problem and creates a solution strategy.
3. Coding Agent generates the code implementation.
4. Reviewer Agent inspects the generated code and suggests improvements.
5. The generated code is sent to the ML-based Code Quality Analyzer for quality assessment.
6. Testing Agent uses both the reviewed code and quality analysis results to validate correctness and identify potential issues.
7. The final refined solution is returned to the user.

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* LangGraph
* LangChain

### AI & Machine Learning

* OpenAI API / Gemini API
* Scikit-learn
* Random Forest Classifier
* Python

### ML Service

* FastAPI

### Deployment

* Railway
* Vercel

### Version Control

* Git
* GitHub

---

## 🤖 Machine Learning Component

The project includes a Code Quality Analyzer trained using the CodeXGLUE Defect Detection Dataset.

### Dataset

* Dataset: Google CodeXGLUE Defect Detection
* Size: 27,318 C functions
* Labels:

  * Defective
  * Non-Defective

### Model

* Random Forest Classifier
* TF-IDF Feature Extraction
* Scikit-learn Pipeline

### Purpose

The ML model predicts potential code quality issues and provides an additional validation layer beyond LLM-based generation.

---

## 📂 Project Structure

```text
Multi-Agent-CodeAssistant/
│
├── frontend/
│   ├── app/
│   ├── components/
│   └── ...
│
├── backend/
│   ├── agents/
│   ├── Quality-Analyser/
│   |     ├── ml_service.py
│   |     ├── quality_model.pkl
|   |     ├── vectorizer.pkl
│   |     └── requirements.txt
│   └── index.ts
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/iparigoel/MutliAgent-CodeAssistant.git
cd MutliAgent-CodeAssistant
```

### Backend Setup

```bash
cd backend

npm install

npm start
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

### ML Service Setup

```bash
cd Quality-Analyser

pip install -r requirements.txt

uvicorn ml_service:app --reload
```

---

## 🔑 Environment Variables

### Backend

```env
OPENAI_API_KEY=your_api_key

ML_SERVICE_URL=http://localhost:8000

CLIENT_URL=http://localhost:3000
```

### Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## ☁️ Deployment

### Frontend

Deploy on Vercel:

```bash
vercel
```

### Backend

Deploy on Railway:

```bash
npm start
```

### ML Service

Deploy on Railway:

```bash
uvicorn ml_service:app --host 0.0.0.0 --port $PORT
```

---

## 📈 Future Improvements

* Support for multiple programming languages
* Automated execution sandbox
* Advanced static code analysis
* RAG-based coding documentation retrieval
* Fine-tuned code generation models
* User authentication and chat history
* Code complexity and security analysis

---

## 👨‍💻 Author

Pari Goel

---

## 📄 License

This project is licensed under the MIT License.
