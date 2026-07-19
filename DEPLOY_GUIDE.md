# Decoupled Deployment Guide: Vercel, Railway, & Groq 🚀

This guide explains how to host **ProductLens AI** in a high-speed, decoupled architecture:
1.  **Vercel** (Frontend UI)
2.  **Railway** (Persistent Node.js Backend API to prevent Vercel's 10-second timeout constraints)
3.  **Groq** (Llama-3-70b completions engine)
4.  **Google Sheets** (Serverless Database)

---

## Part 1: Get Your API Keys & Webhooks

1.  **Groq API Key**: 
    *   Sign up at [console.groq.com](https://console.groq.com).
    *   Navigate to **API Keys** and generate a new key (starts with `gsk_...`).
2.  **Google Sheets Web App URL**:
    *   Open your Google Sheets database sheet, go to *Extensions ➜ Apps Script*, paste the code from [GOOGLE_SHEET_SETUP.md](./GOOGLE_SHEET_SETUP.md), and deploy it as a Web App (Access: *Anyone*).
    *   Copy the web app link (starts with `https://script.google.com/macros/s/...`).

---

## Part 2: Deploy Backend to Railway

Railway runs a persistent Node.js container, allowing your long-running product research scans to complete without HTTP request timeout failures.

1.  Sign up at [railway.app](https://railway.app).
2.  Click **New Project** ➜ **Deploy from GitHub repo** and select your repository: `ani212/ProductLens-AI`.
3.  Once the project starts, click the service block and go to the **Variables** tab.
4.  Add these environment variables:
    *   `GROQ_API_KEY`: `gsk_your_key_here` (Your Groq API key)
    *   `GOOGLE_SHEETS_WEBAPP_URL`: `https://script.google.com/macros/s/.../exec` (Your Apps Script URL)
    *   `PORT`: `3000` (Optional, Railway configures port binding automatically)
5.  Go to the **Settings** tab of the service, scroll down to the **Networking** section, and click **Generate Domain**.
6.  Copy the generated Railway domain (e.g. `https://productlens-ai-production.up.railway.app`). This is your **Backend URL**.

---

## Part 3: Deploy Frontend to Vercel

Vercel provides lightning-fast page loading and global CDN caching for the user interface.

1.  Sign up at [vercel.com](https://vercel.com).
2.  Click **Add New...** ➜ **Project** and import your repository: `ani212/ProductLens-AI`.
3.  Under the **Environment Variables** accordion, add the following key-value pair:
    *   **Key**: `NEXT_PUBLIC_BACKEND_URL`
    *   **Value**: `https://productlens-ai-production.up.railway.app` (Paste the Railway domain you generated in Part 2)
4.  Click **Deploy**.

Vercel will build the frontend assets. When users query a teardown or register an account, Vercel makes direct browser calls to the backend running on Railway, which queries Groq and syncs logs to Google Sheets!
