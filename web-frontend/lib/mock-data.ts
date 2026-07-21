// ═══════════════════════════════════════════════
// ProductLens AI — Mock Data & TeardownReport Interfaces
// ═══════════════════════════════════════════════

import { ProductInfo } from './types';
export type { ProductInfo };

export interface TeardownReport {
  products: ProductInfo[];
  timestamp: string;
  objective: string;
  persona: string;
  executiveSummary: {
    overview: string;
    targetAudience: string;
    strongestAdvantage: { [product: string]: string };
    biggestWeakness: { [product: string]: string };
    competitivePosition: string;
    topOpportunity: string;
  };
  overview: {
    [productId: string]: {
      company: string;
      category: string;
      productType: string;
      tagline?: string;
      ratingG2?: number;
      reviewVolume?: number;
      pricingEntry?: string;
      platforms?: string[];
      targetUsers?: string;
      businessModel?: string;
      coreUseCases?: string[];
      maturity?: string;
      geography?: string;
    };
  };
  jtbd: {
    job: string;
    functional: string[];
    emotional: string[];
    social: string[];
    alternatives: string[];
  }[];
  segments: {
    name: string;
    mainNeed: string;
    features?: string[];
    painPoints?: string[];
    willingnessToPay?: 'Low' | 'Medium' | 'High';
    productFit: { [productId: string]: number }; // 1-10
  }[];
  positioning: {
    [productId: string]: {
      headline: string;
      corePromise: string;
      differentiators: string[];
      primaryCTA: string;
      socialProof: string;
      messagingClarity: number; // 1-10
    };
  };
  features: {
    capability: string;
    description: string;
    status: { [productId: string]: 'Full' | 'Partial' | 'No' | 'Advanced' | 'Basic' };
    opportunityScore: 'High' | 'Medium' | 'Low';
  }[];
  userJourney: {
    stage: string;
    userGoal: string;
    actions: { [productId: string]: string };
    friction: { [productId: string]: string };
    opportunities: string[];
  }[];
  heuristics: {
    dimension: string;
    scores: { [productId: string]: number }; // 1-10
    description: string;
  }[];
  pricing: {
    planName: string;
    price: { [productId: string]: string };
    restrictions: { [productId: string]: string };
    upgradeTriggers: string[];
  }[];
  voc: {
    productId: string;
    praised: string[];
    frustrated: string[];
    requests: string[];
    switchingReasons: string;
  }[];
  painPoints: {
    title: string;
    productId: string;
    affectedUsers: string;
    severity: 'High' | 'Medium' | 'Low';
    frequency: 'Frequent' | 'Intermittent' | 'Rare';
    stage: string;
    evidenceCount: number;
    competitorComparison: string;
    solution: string;
    confidence: number;
    quote: string;
  }[];
  swot: {
    [productId: string]: {
      strengths: string[];
      weaknesses: string[];
      opportunities: string[];
      threats: string[];
    };
  };
  matrix: {
    category: string;
    scores: { [productId: string]: number }; // 1-10
  }[];
  opportunityMap: {
    id: string;
    title: string;
    type: 'Quick Win' | 'Strategic Bet' | 'Table Stakes' | 'Avoid for Now';
    impact: number; // 1-10
    effort: number; // 1-10
    evidence: string;
  }[];
  recommendations: {
    title: string;
    problem: string;
    targetSegment: string;
    evidence: string;
    proposedSolution: string;
    expectedOutcome: string;
    businessImpact: string;
    effort: 'Low' | 'Medium' | 'High';
    risk: 'Low' | 'Medium' | 'High';
    successMetric: string;
    confidence: number;
  }[];
  sources: {
    title: string;
    url: string;
    retrievedAt: string;
    snippet: string;
    confidence: 'High' | 'Medium' | 'Low';
    classification: 'Verified Fact' | 'User Finding' | 'AI Observation' | 'AI Hypothesis';
  }[];
}

// Preset product metadata
export const PRESET_PRODUCTS: { [name: string]: ProductInfo } = {
  notion: {
    id: 'notion',
    name: 'Notion',
    website: 'https://notion.so',
    logoText: 'N',
    logoBg: 'bg-black text-white',
    companyName: 'Notion Labs, Inc.',
    category: 'Productivity & Workspace',
    description: 'An all-in-one workspace for notes, docs, wikis, and databases.'
  },
  clickup: {
    id: 'clickup',
    name: 'ClickUp',
    website: 'https://clickup.com',
    logoText: 'C',
    logoBg: 'bg-purple-600 text-white',
    companyName: 'Mango Technologies, Inc. (ClickUp)',
    category: 'Project Management & Collaboration',
    description: 'One app to replace them all. Docs, reminders, goals, and project tracking.'
  },
  asana: {
    id: 'asana',
    name: 'Asana',
    website: 'https://asana.com',
    logoText: 'A',
    logoBg: 'bg-rose-500 text-white',
    companyName: 'Asana, Inc.',
    category: 'Work Management',
    description: 'Work management platform designed to help teams organize and track tasks.'
  },
  jira: {
    id: 'jira',
    name: 'Jira',
    website: 'https://atlassian.com/software/jira',
    logoText: 'J',
    logoBg: 'bg-blue-600 text-white',
    companyName: 'Atlassian Corporation',
    category: 'Issue Tracking & Agile',
    description: 'Agile project management and issue tracking for software engineering teams.'
  },
  linear: {
    id: 'linear',
    name: 'Linear',
    website: 'https://linear.app',
    logoText: 'L',
    logoBg: 'bg-zinc-900 text-white border border-zinc-700',
    companyName: 'Linear Orbit, Inc.',
    category: 'Issue Tracking & Planning',
    description: 'Fast, keyboard-first issue tracking software built for modern product teams.'
  }
};

export function resolveProducts(namesInput: string): ProductInfo[] {
  const parts = namesInput.split(',').map(p => p.trim().toLowerCase()).filter(Boolean);
  const resolved: ProductInfo[] = [];

  parts.forEach(part => {
    const presetKey = Object.keys(PRESET_PRODUCTS).find(k => k === part || PRESET_PRODUCTS[k].name.toLowerCase().includes(part));
    if (presetKey) {
      resolved.push(PRESET_PRODUCTS[presetKey]);
    } else {
      const id = part.replace(/[^a-z0-9]/g, '');
      const cap = part.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      resolved.push({
        id: id || 'temp',
        name: cap || 'Product',
        website: `https://${id || 'product'}.com`,
        logoText: cap ? cap.charAt(0) : 'P',
        logoBg: 'bg-indigo-700 text-white',
        companyName: `${cap} Inc.`,
        category: 'SaaS Platform',
        description: `Digital product offering core features and workflows for ${cap}.`
      });
    }
  });

  return resolved.length > 0 ? resolved : [PRESET_PRODUCTS.notion, PRESET_PRODUCTS.clickup];
}

export function getTeardownData(productsInput: string, objective: string, persona: string): TeardownReport {
  const products = resolveProducts(productsInput);
  const p1 = products[0] || PRESET_PRODUCTS.notion;
  const p2 = products[1] || PRESET_PRODUCTS.clickup;

  return {
    products,
    timestamp: new Date().toISOString(),
    objective: objective || 'Competitive Positioning & Gap Analysis',
    persona: persona || 'Product Managers',
    executiveSummary: {
      overview: `${p1.name} and ${p2.name} serve distinct segments in the market. ${p1.name} excels at unconstrained flexible documentation, whereas ${p2.name} offers deeper feature-rich task automation.`,
      targetAudience: `PMs, Founders, and Cross-functional Teams looking for streamlined coordination.`,
      strongestAdvantage: {
        [p1.id]: 'Flexible doc-database architecture & clean minimal aesthetic',
        [p2.id]: 'Deep task customization, multi-view flexibility & native time tracking'
      },
      biggestWeakness: {
        [p1.id]: 'Initial setup decision fatigue & steep learning curve for complex relational databases',
        [p2.id]: 'UI clutter & performance degradation with heavy dashboard setups'
      },
      competitivePosition: `${p1.name} leads in knowledge management while ${p2.name} competes aggressively on task feature depth.`,
      topOpportunity: 'Introduce role-based onboarding templates to reduce first-session friction and shorten time-to-value.'
    },
    overview: {
      [p1.id]: {
        company: p1.companyName,
        category: p1.category,
        productType: 'SaaS Workspace',
        tagline: 'Write, plan, and organize in one place.',
        ratingG2: 4.7,
        reviewVolume: 5200,
        pricingEntry: '$8/user/mo'
      },
      [p2.id]: {
        company: p2.companyName,
        category: p2.category,
        productType: 'Work Operating System',
        tagline: 'One app to replace them all.',
        ratingG2: 4.6,
        reviewVolume: 6400,
        pricingEntry: '$7/user/mo'
      }
    },
    jtbd: [
      {
        job: 'When coordinating team releases, help me centralize specs and status so I can ship on time without manual status updates.',
        functional: ['Centralized documentation', 'Task status updates', 'Assignee notifications'],
        emotional: ['Feel in control of delivery', 'Reduce anxiety over missed deadlines'],
        social: ['Demonstrate clear execution clarity to leadership'],
        alternatives: ['Spreadsheets', 'Standalone Wiki', 'Email chains']
      }
    ],
    segments: [
      {
        name: 'Startup Product Teams',
        mainNeed: 'Speed, flexibility, and fast onboarding',
        productFit: { [p1.id]: 9, [p2.id]: 7 }
      },
      {
        name: 'Enterprise Engineering',
        mainNeed: 'Granular permissions, audit logs, and compliance',
        productFit: { [p1.id]: 7, [p2.id]: 8 }
      }
    ],
    positioning: {
      [p1.id]: {
        headline: 'Your connected workspace for wiki, docs & projects',
        corePromise: 'Unify company knowledge and project workflows',
        differentiators: ['Block-based canvas', 'Relational database pages'],
        primaryCTA: 'Get Notion free',
        socialProof: 'Trusted by 100,000+ teams',
        messagingClarity: 9
      },
      [p2.id]: {
        headline: 'All your work in one place',
        corePromise: 'Save 1 day every week by consolidating apps',
        differentiators: ['15+ project views', 'Built-in goal tracking'],
        primaryCTA: 'Get Started',
        socialProof: 'Used by over 800,000 teams',
        messagingClarity: 8
      }
    },
    features: [
      {
        capability: 'Real-time Collaboration',
        description: 'Multi-user editing with cursor visibility and instant sync',
        status: { [p1.id]: 'Full', [p2.id]: 'Full' },
        opportunityScore: 'Low'
      },
      {
        capability: 'Native Time Tracking',
        description: 'Built-in timer and manual time log entry on tasks',
        status: { [p1.id]: 'No', [p2.id]: 'Full' },
        opportunityScore: 'High'
      },
      {
        capability: 'AI Assistance & Summarization',
        description: 'Auto-generate action items, drafts, and meeting notes',
        status: { [p1.id]: 'Advanced', [p2.id]: 'Partial' },
        opportunityScore: 'High'
      }
    ],
    userJourney: [
      {
        stage: 'Onboarding',
        userGoal: 'Set up initial team workspace',
        actions: { [p1.id]: 'Blank workspace creation', [p2.id]: 'Template selection wizard' },
        friction: { [p1.id]: 'Overwhelmed by blank screen', [p2.id]: 'Too many setting toggles' },
        opportunities: ['Pre-configure workspace by industry role']
      }
    ],
    heuristics: [
      { dimension: 'User Value', scores: { [p1.id]: 8.8, [p2.id]: 8.0 }, description: 'Core utility delivered to everyday users' },
      { dimension: 'Ease of Use', scores: { [p1.id]: 8.0, [p2.id]: 5.8 }, description: 'Intuitive UI navigation and minimal cognitive load' },
      { dimension: 'Onboarding', scores: { [p1.id]: 7.8, [p2.id]: 6.5 }, description: 'First-run setup speed and time-to-value' }
    ],
    pricing: [
      {
        planName: 'Pro Tier',
        price: { [p1.id]: '$8/user/mo', [p2.id]: '$7/user/mo' },
        restrictions: { [p1.id]: '7-day page history', [p2.id]: '100MB file limit on free tier' },
        upgradeTriggers: ['File storage expansion', 'Unlimited AI queries']
      }
    ],
    voc: [
      {
        productId: p1.id,
        praised: ['Beautiful UI', 'Flexible databases', 'Nested pages'],
        frustrated: ['Slow search in large workspaces', 'Mobile app lag'],
        requests: ['Better offline mode'],
        switchingReasons: 'Left legacy tools for cleaner documentation canvas'
      }
    ],
    painPoints: [
      {
        title: 'Initial workspace setup decision fatigue',
        productId: p1.id,
        affectedUsers: 'New non-technical users',
        severity: 'High',
        frequency: 'Frequent',
        stage: 'Onboarding',
        evidenceCount: 42,
        competitorComparison: `${p2.name} offers pre-built template wizards.`,
        solution: 'Role-based onboarding wizard with pre-populated views.',
        confidence: 89,
        quote: 'I sat at a blank screen for 30 minutes wondering where to begin.'
      }
    ],
    swot: {
      [p1.id]: {
        strengths: ['Unmatched documentation flexibility', 'Massive template ecosystem'],
        weaknesses: ['Complex relational database setup', 'Search performance slowdowns'],
        opportunities: ['Deeper AI workflows', 'Dedicated desktop app optimizations'],
        threats: ['Focused niche issue trackers like Linear']
      }
    },
    matrix: [
      { category: 'User Value', scores: { [p1.id]: 8.8, [p2.id]: 8.0 } },
      { category: 'Ease of Use', scores: { [p1.id]: 8.0, [p2.id]: 5.8 } }
    ],
    opportunityMap: [
      {
        id: 'opp1',
        title: 'Role-Based Onboarding Wizards',
        type: 'Quick Win',
        impact: 8.5,
        effort: 3.0,
        evidence: '42 user reviews cite setup paralysis on blank workspace creation.'
      }
    ],
    recommendations: [
      {
        title: 'Launch Guided Role Templates',
        problem: 'New users feel overwhelmed by unconfigured blank pages',
        targetSegment: 'Startup Product Managers & Designers',
        evidence: 'User reviews and community feedback highlight high drop-off in week 1.',
        proposedSolution: 'Prompt for role upon signup and instantiate a curated workspace with tasks & docs pre-connected.',
        expectedOutcome: 'Increase 7-day active user retention by 18%.',
        businessImpact: 'Shorter time-to-value and higher upgrade conversion.',
        effort: 'Low',
        risk: 'Low',
        successMetric: 'Day 7 Retention Rate',
        confidence: 88
      }
    ],
    sources: [
      {
        title: `${p1.name} Official Product Documentation`,
        url: p1.website,
        retrievedAt: new Date().toISOString(),
        snippet: `${p1.name} provides flexible workspace databases and block canvases.`,
        confidence: 'High',
        classification: 'Verified Fact'
      }
    ]
  };
}
