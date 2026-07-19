# ProductLens AI V2 🔍🤖📈

**ProductLens AI** is an advanced, evidence-backed **Competitive Intelligence Platform** built for Product Managers, Founders, and Strategy teams. 

Unlike basic AI wrappers that rely solely on pre-trained (and often hallucinated) knowledge, ProductLens AI V2 orchestrates a multi-source web research pipeline to gather live evidence before generating a comprehensive, presentation-ready teardown.

---

## 🚀 Key Features

*   **Multi-Source Evidence Gathering:** The backend scraper engine dynamically extracts data from:
    *   Official Product Documentation & Knowledge Bases
    *   Public Pricing Pages & Tier Breakdowns
    *   Reddit Discussions & Community Forums
    *   App Store & G2-style Customer Reviews
    *   Company Profiles (Hiring Trends, Growth Signals)
*   **Groq-Powered AI Pipeline:** Built on Groq's LPU architecture (using `llama3-70b-8192` and `mixtral-8x7b-32768`) to process massive amounts of scraped context in parallel at blazing speeds, with Google Gemini acting as a reliable fallback.
*   **Real-Time SSE Progress UI:** Watch the research pipeline in action. Server-Sent Events (SSE) stream the real-time status of data extraction and AI analysis directly to your dashboard.
*   **Story-Driven Analyst Report:** 
    *   Executive Summary & Overall Winner Recommendation
    *   Feature Comparison Matrix
    *   Pricing & Tier Analysis
    *   Voice of the Customer (Praise, Frustrations, Quotes)
    *   SWOT Analysis & Opportunity Mapping
*   **Export & Share:** Export your intelligence reports directly to **Markdown**, download the Feature Matrix as a **CSV**, or generate a clean, print-ready **PDF**.

---

## 🏗️ Architecture (V2)

The V2 release heavily simplified the infrastructure. We removed the legacy Rust (`rocket-backend`) and moved entirely to a unified Serverless architecture via **Next.js (App Router)**.

```text
ProductLensAI/
├── web-frontend/           <-- Unified Next.js application (Frontend + API)
│   ├── app/
│   │   ├── api/            <-- Serverless endpoints (SSE Pipeline, Proxies)
│   │   ├── dashboard/      <-- Real-time UI and Report Viewer
│   │   └── page.tsx        <-- Landing & Parameter Config
│   ├── components/         <-- Modular React UI (Report layout, Charts, Loaders)
│   ├── lib/
│   │   ├── pipeline/       <-- AI Orchestration, Normalization, Cross-Analysis
│   │   ├── sources/        <-- Web Extractors (Docs, Reddit, Pricing)
│   │   └── export.ts       <-- MD / CSV Generators
│   └── package.json
└── android-app/            <-- Mobile client project layout (Stub)
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- Node.js 18.x or later
- A Groq API Key (required for primary inference)
- A Google Gemini API Key (recommended for fallback)

### 2. Installation
Clone the repository and install dependencies for the web frontend:
```bash
git clone https://github.com/ani212/ProductLens-AI.git
cd ProductLens-AI/web-frontend
npm install
```

### 3. Environment Variables
Create a `.env.local` file inside the `web-frontend/` directory with the following keys:
```env
# Primary Fast Inference
GROQ_API_KEY=your_groq_key_here

# Fallback Inference
GEMINI_API_KEY=your_gemini_key_here

# Self-referencing URL for internal API proxies
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

### 4. Run Locally
Start the Next.js development server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📝 Design Philosophy & Inspiration

The user interface was built to evoke a premium, professional feel—drawing inspiration from the design systems of **Linear, Notion, Vercel, and Stripe**.

- **Glassmorphism & Gradients:** Subtle blurs and curated color palettes replace harsh generic colors.
- **Micro-interactions:** Interactive components have snappy feedback.
- **Scroll Spy Navigation:** The report viewer tracks your reading progress automatically.

---

## 📜 Changelog

For a detailed history of the architectural changes between V1 and V2 (including the removal of Authentication and Google Sheets sync in favor of local caching and native exports), please see the [CHANGELOG.md](./CHANGELOG.md).
