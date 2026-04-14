# Smart Resume Analyzer Setup

Your full-stack modern resume analyzer has been successfully created with a highly responsive, glass-morphism aesthetic!

## Project Structure
The application code is placed in your workspace under:
`C:\Users\Asus\.gemini\antigravity\scratch\resume-analyzer\`

It is divided into two parts:
1. **Frontend**: A React built with Vite (`/frontend`) featuring Framer Motion for smooth transitions, Recharts for dynamic resume score plotting, and styling done via pure CSS for absolute aesthetic control.
2. **Backend**: An Express.js REST API (`/backend`) capable of parsing PDFs natively via multer & pdf-parse, and analyzing keyword density/section tracking.

## Running the Application Locally

The frontend and backend development servers have already been launched in the background for you. But if you need to run them manually in the future, follow these steps:

**1. Start the Backend:**
```bash
cd C:\Users\Asus\.gemini\antigravity\scratch\resume-analyzer\backend
npm install
npm run start
```
The API server will run on `http://localhost:5000`

**2. Start the Frontend:**
```bash
cd C:\Users\Asus\.gemini\antigravity\scratch\resume-analyzer\frontend
npm install
npm run dev
```
The React Application will run on `http://localhost:5173`

## Try it out!

You can visit **[http://localhost:5173](http://localhost:5173)** in your browser right now!
- Select a job role from the dropdown. 
- Paste some dummy text into the **Paste Text** tab or upload a real PDF resume in the **PDF Upload** tab.
- Click **Analyze Resume** to see your score, missing skills heatmap, and actionable advice!

## Here is a working demonstration!
![Resume Analyzer Demonstration](file:///C:/Users/Asus/.gemini/antigravity/brain/396f6a8f-2906-4a81-b9f6-e51e17d41748/resume_analyzer_success_1776019024349.webp)
