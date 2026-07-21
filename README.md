# ProductLens AI (DiscoveryOS Competitive Intelligence)

> **Turn any product name into an evidence-backed product teardown and competitive opportunity report in minutes.**

Developed by [@ani212](https://github.com/ani212). Part of the **DiscoveryOS** product suite.

---

## Why ProductLens AI Was Built

Product Managers spend hours or days manually conducting competitive product teardowns—visiting websites, comparing pricing pages, reading app reviews (G2, Capterra, Product Hunt), scouring Reddit discussions, and organizing observations into spreadsheets.

**ProductLens AI** automates this fragmented workflow. Instead of generic LLM responses, ProductLens collects **real-world grounded evidence** across docs, pricing, reviews, and community discussions, transforming scattered public data into actionable PM frameworks and roadmap recommendations.

---

## How It Was Built

### 1. Grounded Multi-Source Research Engine
- **Gemini 2.0 Flash Grounded Search**: Collects live, cited web evidence for official documentation, pricing tiers, feature lists, G2/App Store reviews, and Reddit discussions.
- **Rate Limit & Retry Shielding**: Equipped with a 1.5s queue gap and exponential backoff retries (`429` protection) for 100% reliable execution.

### 2. Evidence Normalization & Verification Layer
- **Jaccard Similarity Deduplication**: Merges duplicate reviews and complaints.
- **Citation Classification**: Every output insight is classified into **Verified Fact**, **User Finding**, **AI Observation**, or **AI Hypothesis** with source links.

### 3. Complete 15-Module PM Teardown Dashboard
1. **Executive Summary & Landscape Positioning**
2. **Jobs to Be Done (JTBD Framework)**: Functional, Emotional & Social Jobs
3. **Target User Segments & Willingness to Pay**
4. **Positioning & Messaging Analysis**: Headline & Promise Clarity Scores
5. **Feature Matrix & Gap Taxonomy**: Capability Maturity Ratings
6. **User Journey & Onboarding Friction Mapping**
7. **UX Heuristic Evaluation**: Interactive Weighted Score Sliders
8. **Pricing Strategy & Tier Breakdown**: Free Trial, Restrictions & Upgrade Triggers
9. **Voice of Customer (VoC)**: Praise, Frustrations & Switching Triggers
10. **Structured Pain Point Clusters**: Affected Users, Severity, Evidence Count & Solutions
11. **SWOT Quad-Matrix**: Strengths, Weaknesses, Opportunities, Threats
12. **Competitive Category Scores Matrix**
13. **Interactive 2x2 Opportunity Map**: Impact vs. Effort Quadrants
14. **Actionable PM Product Recommendations**: Problem, Solution, Risk & Success Metrics
15. **Evidence & Source Citations**: Direct Links & Verification Tags

---

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 + Glassmorphism
- **AI & Research**: Gemini 2.0 Flash with Google Search Grounding
- **Icons & Charts**: Lucide React + Recharts
- **Exports**: Markdown, CSV, Print/PDF, Local Storage Library

---

## Local Development

```bash
# 1. Clone repository
git clone https://github.com/ani212/ProductLens-AI.git
cd ProductLens-AI/web-frontend

# 2. Install dependencies
npm install

# 3. Configure environment
# Add GEMINI_API_KEY to .env.local

# 4. Start dev server
npx next dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Author & Credits

Designed and engineered by **[@ani212](https://github.com/ani212)**.
