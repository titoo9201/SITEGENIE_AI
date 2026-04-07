<div align="center">

# 🧞 SiteGenie.ai

### Build Stunning Websites with AI

*Describe your idea and let AI generate a modern, responsive, production-ready website.*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-SiteGenie.ai-purple?style=for-the-badge)](https://sitegenie-ai-1.onrender.com/)
[![GitHub](https://img.shields.io/badge/GitHub-SITEGENIE__AI-black?style=for-the-badge&logo=github)](https://github.com/titoo9201/SITEGENIE_AI)

</div>

---

## 🧠 About

**SiteGenie.ai** is an AI-powered website builder that lets you create modern, responsive, and production-ready websites just by describing your idea.

> "Describe → Generate → Preview → Deploy 🚀"

---

## 🌐 Live Demo

https://sitegenie-ai-1.onrender.com/

---

## ✨ Features

- 🤖 AI Generated Code  
- 📱 Fully Responsive  
- 🚀 Production Ready  
- 👁️ Live Preview  
- 💻 Code Viewer  
- 🔐 Google Auth  
- 📊 Dashboard  
- 🌐 One-Click Deploy  
- ✏️ AI Chat Editor  

---

## 🛠️ Tech Stack

Frontend: React, JavaScript, Tailwind CSS  
Backend: Node.js, Express.js  
AI: OpenRouter / Gemini API  
Database: MongoDB  
Auth: Firebase  
Deployment: Render  

---

## 🚀 Getting Started

### 📥 Installation

```bash
# Clone repository
git clone https://github.com/titoo9201/SITEGENIE_AI.git

# Enter project
cd SITEGENIE_AI
```

---

### 📦 Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPEN_ROUTER_API_KEY=your_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

---

## ▶️ Run the App

### ▶️ Start Backend Server

```bash
cd backend
npm run dev
```

---

### ▶️ Start Frontend Server

```bash
cd frontend
npm run dev
```

---

🌐 Open in browser: http://localhost:5173

---

## 🔄 How It Works

```bash
User Input
   ↓
AI Processing (Gemini)
   ↓
Code Generation (HTML + CSS + JS)
   ↓
Live Preview
   ↓
Edit via Chat
   ↓
Deploy 🚀
```

---

## 📁 Project Structure

```bash
SITEGENIE_AI/
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── pages/          # Page Components
│   │   │   ├── Home.jsx        # Landing Page
│   │   │   ├── Dashboard.jsx   # User Dashboard
│   │   │   ├── Generate.jsx    # Website Generator
│   │   │   └── Editor.jsx      # Live Preview + Editor
│   │   ├── context/        # Auth & App Context
│   │   └── App.jsx
│   └── package.json
│
├── backend/                # Node.js Backend
│   ├── routes/             # API Routes
│   ├── controllers/        # Business Logic
│   ├── models/             # MongoDB Models
│   ├── middleware/         # Auth Middleware
│   └── server.js
│
├── .gitignore
└── README.md
```

---


