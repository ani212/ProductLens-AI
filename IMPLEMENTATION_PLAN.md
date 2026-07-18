# Implementation Plan - Futuristic Minimal, Clean, Light Multipage Redesign

This plan covers the visual and architectural redesign of ProductLens AI to transition from the dark-mode dashboard to an ultra-premium, **futuristic minimal, clean, and light** aesthetic, structured as a true **multipage** Next.js application.

---

## Architecture & Design System

### 1. Futuristic Minimal, Clean, Light Design System
- **Core Background**: Stark white (`#ffffff`) or light slate (`#fafafa`) mixed with subtle light-gray grid patterns (`background-image: linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px)`) that evoke blueprints or architectural sketches.
- **Glassmorphic Light Cards**: Frosted white containers (`rgba(255, 255, 255, 0.7)`) with heavy backdrop blur, thin borders (`rgba(0, 0, 0, 0.05)`), and very soft drop shadows.
- **Accents**: Neon cyber accents (e.g., glowing cyan or violet indicator dots, thin gradient borders) used sparingly to maintain a "futuristic" and "minimal" feel without cluttering the screen.
- **Typography**: Large headers with geometric tracking, crisp Slate-900 typography, and clean, readable gray text for descriptions.

### 2. True Multipage Next.js Architecture
Restructured the single-page state machine into physical Next.js pages:
- **`/` (Homepage)**: Minimal, clean search interface and analysis configuration form.
- **`/dashboard` (Analysis View)**: The PM teardown workspace, loading and displaying reports.
- **`/archive` (Saved Library)**: A separate page to browse past generated reports.
- **Shared Layout**: A sticky, floating header that links these three pages together with smooth active state indicators.

---

## Core MVP Pages & UX Flow

#### 1. Landing Page (Stark Minimal Light)
- Hero section: `"Name any product. Get the complete teardown."`
- Minimal layout, high whitespace, stark dark-zinc primary action button.

#### 2. Product Setup & Resolution
- Input field: enter 1 to 3 product names or URLs (e.g., `Notion, ClickUp, Asana`).
- Fields for Target Persona, Geography, and Analysis Goal.
- **Product Resolver Card**: Frosted white card overlays showing resolved organization websites and logos for user confirmation.

#### 3. Agent Research Loader
- Multi-agent console output window displaying active scans:
  1. 🔍 **Product Resolver Agent**: Validating product identities...
  2. 🌐 **Research Agent**: Scoping landing pages, pricing, and reviews...
  3. 🏷️ **Feature Taxonomy Agent**: Standardizing feature categories...
  4. 💬 **Review Analysis Agent**: Extracting user pain points and sentiment...
  5. 🔍 **Verification Agent**: Filtering and verifying claims...

#### 4. The Teardown Dashboard
Interactive tabs:
- **Executive Summary & SWOT**: Key highlights, strengths, weaknesses, opportunities, threats.
- **Feature Matrix**: Side-by-side normalized feature capability check.
- **Pricing & Tiering**: Detail comparison of free, entry, and enterprise plans.
- **Pain Points**: Structured cards containing severity, frequency, journey stage, evidence mentions, and quotes.
- **Opportunity Map**: Custom Grid Quadrant mapping *Quick Wins*, *Strategic Bets*, *Table Stakes*, and ideas to *Avoid*.
- **Recommendations**: Actionable product recommendations with proposed solution, impact, effort, risk, and metrics.
- **Sources & Evidence**: Citations table classifying claims into *Verified Fact*, *User Finding*, *AI Observation*, or *AI Hypothesis*.
