# Changelog & Architectural Decisions

## [V2.0.0] - 2026-07-20

### ProductLens AI V2: The Competitive Intelligence Platform

The goal of V2 was to transform ProductLens from a basic AI prompt wrapper into a robust, evidence-backed competitive intelligence platform designed for Product Managers.

### Added / Implemented
- **Multi-Source Research Pipeline:** 
  - *Why:* V1 relied purely on a single LLM's pre-trained knowledge, leading to generic and often outdated (hallucinated) comparisons. We added scrapers for Docs, Pricing, Reddit, and Reviews to pull live, factual data.
- **Groq as Primary AI Provider:** 
  - *Why:* To process the massive amounts of scraped context in parallel without huge latency, we switched the primary engine to Groq (`llama3-70b-8192` and `mixtral-8x7b-32768`), falling back to Gemini only if needed.
- **Server-Sent Events (SSE) Progress UI:** 
  - *Why:* Because the new pipeline takes time to scrape and analyze data across multiple sources, a static spinner was bad UX. SSE allows us to stream real-time logs (e.g., "Scraping Documentation...") directly to the frontend.
- **Story-Driven Report UI:** 
  - *Why:* V1 used isolated tabs, which made it hard to read as a cohesive report or share with stakeholders. V2 uses a linear, presentation-style layout with a scroll-tracking sidebar, mimicking professional analyst reports (like G2 or Forrester).
- **Export System (Markdown, CSV, PDF):** 
  - *Why:* PMs need to drop this data into Jira, Notion, or internal wikis. We added native exports to support integration into existing PM workflows.

### Removed
- **User Authentication (Login/Sign-up):** 
  - *Why:* We wanted to reduce friction for the V2 launch and focus purely on the core pipeline. Auth gated the core value and wasn't strictly necessary for a standalone intelligence tool.
- **Rocket Rust Backend (`rocket-backend/`):** 
  - *Why:* Maintaining a separate Rust backend for simple state and routing added unnecessary infrastructure complexity. Everything was migrated to Next.js API Routes (Serverless) for unified deployment on Vercel.
- **Google Sheets Sync Integration:** 
  - *Why:* The setup was overly complex for most users. In V2, we replaced this with rich local storage caching and direct CSV/Markdown exports, which provide the same data portability with zero configuration.

---

## [V1.0.0] - Initial Release

### The Foundation

ProductLens V1 was built as a proof of concept to see if LLMs could automate product teardowns and comparisons.

### Added / Implemented
- **Basic AI Teardown Generation:** Using Gemini to generate SWOT and feature matrices based on user input.
- **Tabbed Dashboard UI:** Simple interface separating different parts of the teardown.
- **Authentication & Sheets Sync:** Allowed saving reports to Google Sheets for authenticated users.
- **Rust Backend API:** Handled initial request routing and Google API integrations.
