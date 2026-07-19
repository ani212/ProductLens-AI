# ProductLens AI - Monorepo Workspace 🔍🤖📱

Welcome to the ProductLens AI monorepo. This repository coordinates the entire product intelligence ecosystem:
1.  **`/web-frontend`**: Next.js client application (Vercel host).
2.  **`/rocket-backend`**: Rust Rocket REST API (Railway host).
3.  **`/android-app`**: Android mobile application workspace.

---

## Directory Index

```text
ProductLensAI/
├── web-frontend/           <-- Next.js client & dashboard (Vercel)
│   ├── app/
│   ├── components/
│   └── package.json
├── rocket-backend/         <-- Rust Rocket API backend (Railway)
│   ├── Cargo.toml
│   └── src/main.rs
└── android-app/            <-- Mobile client project layout
    └── README.md
```

---

## Getting Started

### 1. Web Frontend (Next.js)
To run the web app interface locally:
```bash
cd web-frontend
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)**. Set your `.env.local` inside the `web-frontend/` directory with `GROQ_API_KEY` and `GOOGLE_SHEETS_WEBAPP_URL`.

### 2. Rust API Backend (Rocket)
To run the Rust backend locally:
```bash
cd rocket-backend
cargo run
```
Your Rocket server will start on port `8000`. Exposes endpoint `GET http://localhost:8000/api/health`.

### 3. Android Mobile Application
Gradle build file configurations and Kotlin source trees reside in `/android-app`. Open this folder in **Android Studio** to run the emulator client.

---

## Deployment Architecture

*   **UI Client Hosting**: Deploy `/web-frontend` directory as a Next.js project on **Vercel**. Set `NEXT_PUBLIC_BACKEND_URL` to point to the active backend server.
*   **Database Server Hosting**: Deploy `/rocket-backend` (or the unified routing setup) on **Railway** with `GROQ_API_KEY` and `GOOGLE_SHEETS_WEBAPP_URL` environment parameters.
