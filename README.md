# ProductLens AI (DiscoveryOS Competitive Intelligence)

> **Turn any product name into an evidence-backed product teardown and competitive opportunity report in minutes.**

Developed by [@ani212](https://github.com/ani212). Part of the **DiscoveryOS** product suite.

---

## Why I Built ProductLens AI (The Origin Story)

As a Product Manager, I constantly found myself spending hours—often days—manually conducting competitive product teardowns. The process was painfully repetitive: scouring competitor websites, comparing pricing tiers, reading endless reviews on G2 and Capterra, digging through Reddit threads to find raw user opinions, and finally trying to synthesize all that fragmented data into a cohesive spreadsheet or presentation. 

I realized there had to be a way to automate the "discovery" phase of competitive intelligence so PMs could spend more time on the "strategy" phase. That was the genesis of ProductLens AI.

## The Pain Points It Solves

- **Information Overload & Fragmentation:** PMs have to visit dozens of different sources (marketing sites, support docs, review boards, social media) to get a full picture of a competitor. ProductLens aggregates this automatically.
- **Generic LLM Hallucinations:** Most AI tools just give you generic, unverified summaries. ProductLens uses Google Search Grounding to pull *real, cited evidence* from the live web.
- **Manual Framework Mapping:** Taking raw data and fitting it into PM frameworks (SWOT, JTBD, Feature Matrices) is tedious. ProductLens structures unstructured data directly into 15 actionable PM modules.
- **Time to Insight:** What used to take a week of manual research now takes minutes, allowing teams to move faster in market positioning and roadmap planning.

## AI Product Management: Fixing the Core Challenges

Building an AI-native product isn't just about calling an LLM API. As an AI PM, here are the specific product challenges ProductLens was engineered to solve:

- **Trust & Verifiability:** Users don't trust black-box AI. That's why every insight in ProductLens is classified (Verified Fact, User Finding, AI Observation, or AI Hypothesis) and backed by source citations.
- **Non-Deterministic Outputs:** Structuring LLM responses reliably is hard. ProductLens enforces strict schemas to ensure the 15-module dashboard always renders correctly, even when the underlying data is chaotic.
- **Latency vs. Quality Trade-offs:** Deep research takes time. We implemented a 1.5s queue gap and rate-limit shielding so the system can reliably process massive amounts of web data without failing or timing out.
- **Data Deduplication:** AI can easily repeat the same insights if multiple sources say the same thing. We use Jaccard Similarity deduplication to merge duplicate reviews and complaints, giving the user signal instead of noise.
- **Actionability:** Information without a 'next step' is useless. The tool deliberately translates research into *Interactive Opportunity Maps* and *Actionable Recommendations* (Problem, Solution, Risk & Metrics) so the user knows exactly what to build next.

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
