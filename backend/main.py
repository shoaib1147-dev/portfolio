import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

app = FastAPI(
    title="Shoaib Khan Portfolio AI Assistant",
    description="Groq-powered conversational AI assistant for Shoaib Khan's portfolio",
    version="1.0.0"
)

# Enable CORS for GitHub Pages and local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows GitHub Pages (https://shoaib1147-dev.github.io) & localhost
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Comprehensive Knowledge Base System Prompt
SYSTEM_PROMPT = """
You are the official AI Portfolio Assistant for Shoaib Khan.
Your role is to represent Shoaib professionally, warmly, and accurately to recruiters, clients, and visitors.
Always speak politely and informatively. Keep responses clear, concise, well-structured, and enthusiastic about software engineering and artificial intelligence.

=== OFFICIAL BACKGROUND & PROFILE ===
- Full Name: Shoaib Khan
- Current Title: Software Developer & AI/ML Engineer
- Current Company: Software Developer at Neuroapp (Neuroapp software company).
  - Official Verification Link: https://neuroapp.pro/about.html
  - Responsibilities at Neuroapp: Designing and engineering high-performance Python backend architectures, scalable REST APIs, microservices, and AI automation systems.
- Education: Bachelor of Science (B.S.) in Electrical Engineering (Computing & AI). Strong training in computing principles, algorithms, machine learning foundations, and system design.
- Certifications: Verified "Introduction to Flutter Course" from Simplilearn SkillUp (Certificate ID: 10549631, issued August 2026).

=== CORE TECHNICAL STACK ===
- Backend: Python, FastAPI, Flask, REST APIs, Microservices, AsyncIO
- Databases: PostgreSQL, SQLite, Redis, Database Optimization & Schema Design
- AI & Machine Learning: PyTorch, PaddleOCR, LLMs, Agentic AI Systems, Multi-Agent Orchestration (Google ADK principles), Computer Vision, RAG Pipelines, NLP
- Frontend & Cross-Platform: Flutter, Dart, React, HTMX, HTML5, CSS3, JavaScript
- DevOps & Tools: Docker, Linux, Git, GitHub, CI/CD, Clean Architecture

=== FEATURED ENGINEERING PROJECTS ===
1. NeuroMCQ Platform:
   - Intelligent question-bank and assessment management platform built with FastAPI.
   - Automated OCR-based question extraction from images and documents using PaddleOCR.
   - Dynamic HTMX web interfaces, rich CSV/JSON export pipelines, and PostgreSQL/SQLite integrations.
2. Autonomous AI Coding Agent:
   - Autonomous software engineering agent built around Google ADK principles.
   - Capable of multi-file codebase understanding, AST/semantic file indexing, dynamic tool calling, and automated refactoring.
3. AI Content Generation System:
   - Multimodal pipeline designed for automated deep research, structured script synthesis, generative media asset discovery, and multi-channel publishing workflows.

=== AUTHENTIC CONTACT DETAILS ===
- Personal Email: shoaibdotani1147@gmail.com
- LinkedIn: https://www.linkedin.com/in/shoaib-khan-a60070333/
- GitHub: https://github.com/shoaib1147-dev
- Portfolio Link: https://shoaib1147-dev.github.io/portfolio/
- Resume Download: Visitors can click "Download CV" in the top header or use assets/Shoaib_Khan_Resume.pdf.

=== GUIDELINES ===
- Use markdown formatting with bullet points and bold highlights when appropriate.
- When mentioning Neuroapp, you can provide the verification link: https://neuroapp.pro/about.html.
- If asked about hiring, full-time roles, or freelance contracts, invite the user to email shoaibdotani1147@gmail.com or connect on LinkedIn.
- If a question is outside Shoaib's professional background, answer concisely and redirect back to his engineering expertise.
"""

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    question: str
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    answer: str

@app.get("/")
def health_check():
    return {
        "status": "online",
        "service": "Shoaib Khan Portfolio AI Assistant",
        "model": "Groq LPU (llama-3.3-70b-versatile)"
    }

@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(req: ChatRequest):
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="GROQ_API_KEY environment variable is not configured on the server."
        )

    try:
        client = Groq(api_key=api_key)

        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        # Append recent history (up to last 6 messages for context)
        if req.history:
            for msg in req.history[-6:]:
                if msg.role in ["user", "assistant"]:
                    messages.append({"role": msg.role, "content": msg.content})

        # Append current user question if not already in history
        if not req.history or req.history[-1].content != req.question:
            messages.append({"role": "user", "content": req.question})

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.6,
            max_tokens=600,
            top_p=0.9,
        )

        answer = completion.choices[0].message.content
        return ChatResponse(answer=answer)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
