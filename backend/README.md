# Shoaib Khan Portfolio AI Assistant Backend (FastAPI + Groq)

This is the lightweight, ultra-fast Python backend powering the AI Assistant on Shoaib Khan's portfolio website.

## 🚀 How to Deploy on Render for FREE (Takes 2 Minutes)

1. **Sign up / Log in to [Render.com](https://render.com)** (you can sign in with your GitHub account).
2. Click **New +** in the top navigation bar and select **Web Service**.
3. Choose **Build and deploy from a Git repository** and connect your `portfolio` repository (`https://github.com/shoaib1147-dev/portfolio`).
4. Configure the settings:
   - **Name:** `shoaib-portfolio-ai` (or any name you prefer)
   - **Region:** Choose whichever is closest (e.g. Frankfurt, Oregon, Singapore)
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type:** Select **Free**
5. **Add Environment Variable:**
   - Under **Environment Variables**, click **Add Environment Variable**:
     - Key: `GROQ_API_KEY`
     - Value: `your_actual_groq_api_key_from_console.groq.com`
6. Click **Create Web Service**!

---

## 🔗 Connect to your GitHub Pages Portfolio:
Once Render finishes deploying (about 1-2 minutes), Render will give you a live URL, for example:
`https://shoaib-portfolio-ai.onrender.com`

Simply open `script.js` in your portfolio and update line ~485:
```javascript
const GROQ_BACKEND_API_URL = "https://shoaib-portfolio-ai.onrender.com/api/chat";
```
Push changes to GitHub:
```bash
git add .
git commit -m "feat: connect portfolio chatbot to live Render Groq backend"
git push origin main
```
Your chatbot will now be powered live by Groq LPUs on your public GitHub Pages website!
