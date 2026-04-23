# Resume Analyzer

An AI-powered web application that analyzes resumes and provides actionable feedback, including an ATS (Applicant Tracking System) score, formatting suggestions, and content improvement tips.

## Features

- 📄 **PDF Processing**: Seamlessly upload and parse PDF resumes directly in the browser.
- 🤖 **AI-Driven Feedback**: Get intelligent feedback on Tone & Style, Content, Structure, and Skills.
- 📊 **ATS Scoring**: See how well your resume will perform against automated tracking systems.
- 💅 **Premium UI**: Modern, glassmorphic design built with Tailwind CSS.

## Tech Stack

- **Framework**: [React Router](https://reactrouter.com/) (SPA Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend/AI/Storage**: [Puter.js](https://docs.puter.com/) SDK
- **PDF Rendering**: `pdfjs-dist`

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Your application will be up and running at `http://localhost:5173`.

---

*Note: This project relies on the Puter SDK for authentication, file storage, and AI analysis. Ensure you have internet access so the Puter.js script can load properly in the browser.*
