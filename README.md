# ProductLens AI 🔍🤖

An AI-powered competitive product intelligence platform that turns any software product name or URL into a structured product teardown, opportunity analysis, and dynamic comparison deck in minutes.

Developed for Product Managers, strategy teams, and aspiring builders.

---

## 🎨 Design Aesthetic: Futuristic Minimal, Clean, Light

ProductLens AI features a custom design system styled to look like an interactive technical schematic or hardware dashboard:
- **Blueprint Grids**: Light zinc canvas (`#fafafa`) overlaid with fine linear grids.
- **Frosted Light Glassmorphic Panels**: White frosted containers with heavy background blur filters and soft shadows.
- **Monochromatic PM controls**: High-contrast dark-zinc primary action items and slider ranges similar to Figma or Linear.
- **Precision Neon Accents**: Cyber cyan, indigo, and emerald indicator details highlighting active scanning agents and verified findings.

---

## ✨ Core Product Capabilities

### 1. Multi-Agent Pipeline Simulator
- Simulates a 6-stage coordination callstack where discrete agents (Product Resolver, Research, Taxonomy Normalizer, Review Analyzer, Opportunity Mapper, Verification Validator) output live log arrays while researching documentation and forums.

### 2. Side-by-Side Normalized Comparison
- Normalizes disparate features (e.g. "Smart AI Assitant" vs. "Copilot") under common taxonomies inside a comparative checklists matrix.

### 3. Structured Pain-Points & Voices-of-Customer
- Scrapes user review channels to cluster frustrations. Maps complaints onto card layouts detailing journey stages, severity grades, evidence occurrences, and representative user quotes.

### 4. Interactive Scoring weighting Framework
- Allows PMs to adjust dimension weights (User Value, Ease of Use, Onboarding, Feature Completeness, Differentiation, Sentiment, and Pricing Value) from `0%` to `50%` in real-time. Changing weight values dynamically recalculates and animates product score comparison bars on the fly.

### 5. On-the-Fly Target Segment selector
- An interactive dropdown inline with the metadata card on the dashboard allows switching target personas instantly. Selecting a new segment updates the URL search query, reloading the active loader to run a fresh scan for that target audience.

---

## 🛠️ Technical Architecture

- **Frontend**: Next.js App Router (React, TypeScript, Tailwind CSS v4)
- **APIs & Backend**: Next.js server-side API Routes (`/api/resolve`, `/api/teardown`)
- **AI Core**: Gemini Developer API (AI Studio) utilizing **Google Search Grounding** for live web indexing, page scraping, and citation assertions.
- **Archiving**: Browser `localStorage` integration for archiving historical teardowns.

---

## 🚀 Getting Started

### Prerequisites
Make sure Node.js (v18+) is installed on your system.

### Installation & Launch

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ani212/ProductLens-AI.git
   cd ProductLens-AI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Launch the development server**:
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📁 Repository Documentation

- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Details the styling parameters and routing blueprints.
- [FUTURE_SCOPE.md](./FUTURE_SCOPE.md) - Outlines future phases (authenticated crawlers, Similarweb traffic integrations, PRD ticket sync).
