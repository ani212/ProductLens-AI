export interface ProductInfo {
  id: string;
  name: string;
  website: string;
  logoText: string;
  logoBg: string;
  companyName: string;
  category: string;
  description: string;
}

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
      platforms: string[];
      targetUsers: string;
      businessModel: string;
      coreUseCases: string[];
      maturity: string;
      geography: string;
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
    features: string[];
    painPoints: string[];
    willingnessToPay: 'Low' | 'Medium' | 'High';
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

// Popular resolved products
export const PRESET_PRODUCTS: { [name: string]: ProductInfo } = {
  notion: {
    id: 'notion',
    name: 'Notion',
    website: 'https://notion.so',
    logoText: 'N',
    logoBg: 'bg-black text-white',
    companyName: 'Notion Labs, Inc.',
    category: 'Productivity & Workspace',
    description: 'An all-in-one workspace for your notes, tasks, wikis, and databases, highly customizable for teams and individuals.'
  },
  clickup: {
    id: 'clickup',
    name: 'ClickUp',
    website: 'https://clickup.com',
    logoText: 'C',
    logoBg: 'bg-purple-600 text-white',
    companyName: 'Mango Technologies, Inc. (ClickUp)',
    category: 'Project Management & Collaboration',
    description: 'One app to replace them all. ClickUp offers docs, reminders, goals, calendars, and an inbox, custom-tailored for agile and project teams.'
  },
  asana: {
    id: 'asana',
    name: 'Asana',
    website: 'https://asana.com',
    logoText: 'A',
    logoBg: 'bg-rose-500 text-white',
    companyName: 'Asana, Inc.',
    category: 'Work Management',
    description: 'A web and mobile application designed to help teams organize, track, and manage their work, focusing on clarity, ownership, and timeline alignment.'
  },
  spotify: {
    id: 'spotify',
    name: 'Spotify',
    website: 'https://spotify.com',
    logoText: 'S',
    logoBg: 'bg-green-500 text-black',
    companyName: 'Spotify Technology S.A.',
    category: 'Music & Audio Streaming',
    description: 'A proprietary Swedish audio streaming and media services provider offering millions of songs, podcasts, and personalized recommendations.'
  },
  'apple music': {
    id: 'applemusic',
    name: 'Apple Music',
    website: 'https://music.apple.com',
    logoText: '',
    logoBg: 'bg-gradient-to-tr from-pink-500 via-rose-500 to-red-500 text-white',
    companyName: 'Apple Inc.',
    category: 'Music Streaming',
    description: 'A music and video streaming service developed by Apple Inc. offering spatial audio, lossless quality, and deep integration with iOS devices.'
  },
  'youtube music': {
    id: 'youtubemusic',
    name: 'YouTube Music',
    website: 'https://music.youtube.com',
    logoText: 'Y',
    logoBg: 'bg-red-600 text-white',
    companyName: 'Google LLC',
    category: 'Audio & Video Streaming',
    description: 'A music streaming service developed by YouTube, a subsidiary of Google, featuring official songs, albums, and user-uploaded video integrations.'
  },
  jira: {
    id: 'jira',
    name: 'Jira',
    website: 'https://atlassian.com/software/jira',
    logoText: 'J',
    logoBg: 'bg-blue-600 text-white',
    companyName: 'Atlassian Corporation',
    category: 'Issue Tracking & Agile Project Management',
    description: 'The standard tracker for teams planning and building great products. Excellent for issue tracking, release management, and software developer workflows.'
  },
  linear: {
    id: 'linear',
    name: 'Linear',
    website: 'https://linear.app',
    logoText: 'L',
    logoBg: 'bg-neutral-900 text-white border border-neutral-700',
    companyName: 'Linear Orbit, Inc.',
    category: 'Issue Tracking & Project Management',
    description: 'The issue tracker you will actually enjoy using. Modern, keyboard-shortcut-driven project management designed for high-performance software teams.'
  }
};

export function resolveProducts(namesInput: string): ProductInfo[] {
  const parts = namesInput.split(',').map(p => p.trim().toLowerCase()).filter(Boolean);
  const resolved: ProductInfo[] = [];

  parts.forEach(part => {
    // Check if we have a direct match
    const preset = Object.keys(PRESET_PRODUCTS).find(key => key === part || PRESET_PRODUCTS[key].name.toLowerCase().includes(part));
    if (preset) {
      resolved.push(PRESET_PRODUCTS[preset]);
    } else {
      // Create a dynamic product info based on input
      const id = part.replace(/[^a-z0-9]/g, '');
      const capitalized = part.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      resolved.push({
        id: id || 'temp',
        name: capitalized || 'Generic Product',
        website: `https://${id || 'generic'}.com`,
        logoText: (capitalized ? capitalized.charAt(0) : 'P'),
        logoBg: 'bg-blue-800 text-white',
        companyName: `${capitalized} Inc.`,
        category: 'SaaS Software',
        description: `A competitive digital product offering core workflows, collaboration utilities, and customer value propositions in the ${capitalized} space.`
      });
    }
  });

  return resolved.slice(0, 5); // Max 5 products
}

// Generate high-fidelity comparison for Notion vs ClickUp vs Asana
export function getNotionClickUpAsanaReport(objective: string, persona: string): TeardownReport {
  return {
    products: [PRESET_PRODUCTS.notion, PRESET_PRODUCTS.clickup, PRESET_PRODUCTS.asana],
    timestamp: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    objective: objective || 'General competitive assessment and opportunity analysis',
    persona: persona || 'Startup Product Teams',
    executiveSummary: {
      overview: 'This teardown analyzes the three dominant tools in collaborative workspace and project management: Notion, ClickUp, and Asana. Notion excels as a flexible repository of knowledge (wiki + database); ClickUp positions as the high-feature, all-in-one customizable hub; Asana targets enterprise teams seeking structured, timeline-driven work coordination with clear ownership.',
      targetAudience: 'Startup founders, project managers, operations teams, and cross-functional builders who coordinate remote and hybrid work environments.',
      strongestAdvantage: {
        notion: 'Unrivaled layout flexibility and wiki-centric document storage that lets teams shape the workspace to their exact organizational needs.',
        clickup: 'Highly granular feature completeness out-of-the-box (time tracking, dashboard reporting, goals) at a aggressive entry price.',
        asana: 'Superior tracking of task dependencies and timelines (Gantt charts) with an intuitive UX that guarantees organizational adoption.'
      },
      biggestWeakness: {
        notion: 'High cognitive load on setup. New users experience decision fatigue, and complex relational databases can suffer severe performance degradation.',
        clickup: 'Severe UI complexity. Features overlap and clutter the interface, leading to high onboarding friction and loading lag.',
        asana: 'Cost rigidity. Limited customization capabilities outside task lists and columns, and a high per-seat cost that restricts startup adoption.'
      },
      competitivePosition: 'Notion dominates early-stage startups and document-heavy teams. ClickUp captures feature-hungry product teams transitioning away from spreadsheets. Asana retains medium-to-enterprise organizations that prioritize stable integrations and clean hierarchy.',
      topOpportunity: 'Introduce role-based, pre-built onboarding blueprints specifically for product teams (connecting roadmap to design files and spec docs) to reduce initial workspace configuration from days to seconds.'
    },
    overview: {
      notion: {
        company: 'Notion Labs, Inc.',
        category: 'Productivity & Workspace',
        productType: 'No-Code Workspace / Wiki / Relational Database',
        platforms: ['Web', 'macOS', 'Windows', 'iOS', 'Android'],
        targetUsers: 'Founders, Knowledge Workers, Creators, Document-Heavy Teams',
        businessModel: 'Freemium PLG (Product-Led Growth), per-user enterprise subscriptions',
        coreUseCases: ['Product Wikis', 'Knowledge Management', 'Lightweight CRM', 'Roadmaps'],
        maturity: 'Mature (Scale-up)',
        geography: 'Global (Available in English, Spanish, Japanese, Korean, French, German)'
      },
      clickup: {
        company: 'Mango Technologies, Inc.',
        category: 'Agile Project Management',
        productType: 'All-in-One Collaboration & Task Hub',
        platforms: ['Web', 'macOS', 'Windows', 'Linux', 'iOS', 'Android'],
        targetUsers: 'Engineering Teams, Operations, Agencies, Agile Startup Squads',
        businessModel: 'Freemium, highly discounted tier pricing, seat-based billing',
        coreUseCases: ['Sprint Planning', 'Time Tracking', 'Custom Dashboards', 'Resource Management'],
        maturity: 'Mature (Scale-up)',
        geography: 'Global (Primarily English speaking, expanding translation)'
      },
      asana: {
        company: 'Asana, Inc. (Public NYSE: ASAN)',
        category: 'Work Management',
        productType: 'Task Manager & Portfolio Tracker',
        platforms: ['Web', 'macOS', 'Windows', 'iOS', 'Android'],
        targetUsers: 'Enterprise Operations, Cross-functional Marketing, Mid-Market Project Managers',
        businessModel: 'Seat-based SaaS, high free tier barriers, annual contract focus',
        coreUseCases: ['Cross-team Coordination', 'Timeline Tracking', 'Portfolio Reporting', 'Okrs Tracking'],
        maturity: 'Established Public Company',
        geography: 'Global (20+ languages supported)'
      }
    },
    jtbd: [
      {
        job: 'Centralize product plans and specifications',
        functional: [
          'Store product requirements documents (PRDs) alongside roadmaps',
          'Link epics directly to active research documents and mocks',
          'Maintain a single source of truth for engineering guidelines'
        ],
        emotional: [
          'Feel confident that all team members are looking at the latest spec',
          'Reduce anxiety of scattered information across Google Docs and Slack'
        ],
        social: [
          'Present a clean, organized face to investors and external advisors',
          'Help new hires onboard into the team context independently'
        ],
        alternatives: ['Google Docs + Confluence', 'Local Markdown files', 'Slack Canvas']
      },
      {
        job: 'Track engineering sprint progress and task allocations',
        functional: [
          'Visualize development velocity using burn-down charts',
          'Assign tickets with subtasks and track custom statuses (QA, Code Review)',
          'Track active time spent per issue'
        ],
        emotional: [
          'Feel control over delivery dates and blockers',
          'Reduce frustration of asking status updates in Standup'
        ],
        social: [
          'Build alignment between engineers, designers and PMs on weekly deliverables',
          'Report progress clearly to executive leadership'
        ],
        alternatives: ['Jira', 'Spreadsheets (Excel/Sheets)', 'Sticky notes on physical boards']
      }
    ],
    segments: [
      {
        name: 'Early-stage Startup Founders',
        mainNeed: 'Quick workspace setup, affordable cost, high adaptability for business pivots.',
        features: ['Templates', 'Free Tiers', 'Document Collaboration', 'Light Database'],
        painPoints: ['Workspace clutter', 'Time spent configuring instead of building', 'High license fees'],
        willingnessToPay: 'Low',
        productFit: { notion: 9, clickup: 6, asana: 4 }
      },
      {
        name: 'Agile Product & Engineering Squads',
        mainNeed: 'Roadmap-to-task connection, sprint tracking, bug dashboards, code integration.',
        features: ['GitHub Integration', 'Sprint boards', 'Time tracking', 'Custom fields'],
        painPoints: ['Slow loading speeds', 'Relational database lookup errors', 'Vague task ownership'],
        willingnessToPay: 'Medium',
        productFit: { notion: 7, clickup: 9, asana: 7 }
      },
      {
        name: 'Enterprise Marketing & Operations Teams',
        mainNeed: 'Stable workflows, security compliance (SOC2), complex task dependencies, portfolio views.',
        features: ['Timeline/Gantt', 'Portfolio dashboard', 'Workload allocations', 'SSO/SAML'],
        painPoints: ['High learning curve for simple tools', 'Rigidity of databases', 'Lack of cross-team coordination'],
        willingnessToPay: 'High',
        productFit: { notion: 5, clickup: 7, asana: 9 }
      }
    ],
    positioning: {
      notion: {
        headline: 'Write, plan, share. With AI.',
        corePromise: 'A single space that connects wiki, docs, databases, and AI-assisted drafts.',
        differentiators: ['No-code canvas flexibility', 'Clean, distraction-free aesthetic', 'Extensive community template ecosystem'],
        primaryCTA: 'Get Notion free',
        socialProof: 'Used by millions including Figma, Pixar, and Uber.',
        messagingClarity: 9
      },
      clickup: {
        headline: 'One app to replace them all.',
        corePromise: 'All your work—tasks, docs, chats, goals, and more—integrated into one workspace.',
        differentiators: ['Granular feature depth', 'Affordable pricing', 'Endless customization of dashboards and views'],
        primaryCTA: 'Get ClickUp free',
        socialProof: 'Trusted by 100,000+ teams at Netflix, Samsung, and IBM.',
        messagingClarity: 7
      },
      asana: {
        headline: 'The easiest way to manage team work.',
        corePromise: 'Track work from start to finish with timelines, goals, and clear employee ownership.',
        differentiators: ['Intuitive, visually satisfying task flow', 'Robust timeline/dependency engine', 'Enterprise-grade reliability and scalability'],
        primaryCTA: 'Get Started',
        socialProof: '80%+ of Fortune 100 teams run on Asana.',
        messagingClarity: 8
      }
    },
    features: [
      {
        capability: 'Knowledge Base (Wiki & Docs)',
        description: 'Creating, hosting, and linking rich text documentation and company guidelines.',
        status: { notion: 'Advanced', clickup: 'Partial', asana: 'Basic' },
        opportunityScore: 'Low'
      },
      {
        capability: 'Relational Databases',
        description: 'Connecting different tables, rollups, and structured metadata for complex queries.',
        status: { notion: 'Advanced', clickup: 'Partial', asana: 'No' },
        opportunityScore: 'High'
      },
      {
        capability: 'Gantt / Timeline Views',
        description: 'Interactive timeline charts depicting task dependencies, milestones, and critical paths.',
        status: { notion: 'Partial', clickup: 'Advanced', asana: 'Advanced' },
        opportunityScore: 'Medium'
      },
      {
        capability: 'Native Time Tracking',
        description: 'In-app stopwatch and timesheet reporting without requiring external tools like Toggl.',
        status: { notion: 'No', clickup: 'Full', asana: 'Partial' },
        opportunityScore: 'High'
      },
      {
        capability: 'AI Task Generation & Copilot',
        description: 'AI assisting in writing PRDs, summarizing discussions, and creating action items.',
        status: { notion: 'Advanced', clickup: 'Advanced', asana: 'Partial' },
        opportunityScore: 'High'
      },
      {
        capability: 'Guest & Client Collaboration',
        description: 'Sharing single projects or sub-pages with clients without paying for full seats.',
        status: { notion: 'Full', clickup: 'Partial', asana: 'Basic' },
        opportunityScore: 'Medium'
      }
    ],
    userJourney: [
      {
        stage: 'Sign-up',
        userGoal: 'Create an account with minimal effort using Google authentication.',
        actions: {
          notion: '1-click sign-up. Prompts for profile name, photo, and initial intended use.',
          clickup: 'Requires email validation code. Takes user through several custom setup slides.',
          asana: 'Fast corporate email verification. Multi-field name and role entry.'
        },
        friction: {
          notion: 'Low. Simple choice: "For myself" or "With my team".',
          clickup: 'High. Too many options asking to configure workspace naming, colors, and integrations.',
          asana: 'Medium. Forces user to create their first project before entering the dashboard.'
        },
        opportunities: ['Skip workspace layout customization and use defaults based on email domain.']
      },
      {
        stage: 'Onboarding (First 5 mins)',
        userGoal: 'Understand the interface and create the first task or page.',
        actions: {
          notion: 'Lands on a pre-populated "Getting Started" page containing tips, toggle lists, and slash command guides.',
          clickup: 'Enters workspace filled with default cards and tooltips pointing to every sidebar item.',
          asana: 'Lands directly inside the task list template the user built during the signup flow.'
        },
        friction: {
          notion: 'Medium. Complete blank-slate anxiety. The user must figure out how to create pages and databases.',
          clickup: 'Very High. The screen is packed with widgets, options, and pop-ups that create immediate overwhelm.',
          asana: 'Low. Very clear "Add Task" button with floating elements.'
        },
        opportunities: ['Provide a "Blank Slate vs. Guided Template" toggle to adapt to different user comfort levels.']
      },
      {
        stage: 'First Meaningful Action (Aha! Moment)',
        userGoal: 'Experience the core value: linking documents or tracking dependencies.',
        actions: {
          notion: 'Linking two database pages together via a relation or typing `/page` and spawning nested wiki cards.',
          clickup: 'Adding custom fields and filtering tasks by assignee or priority in a dashboard.',
          asana: 'Viewing a visual line connecting a blocked task to its parent milestone in Timeline view.'
        },
        friction: {
          notion: 'High. Relational databases are complex to configure for non-technical users.',
          clickup: 'Medium. Finding where custom fields are configured requires digging into settings.',
          asana: 'Low. Drag-and-drop connections are highly intuitive.'
        },
        opportunities: ['Interactive templates showing pre-built relational databases for common use cases.']
      }
    ],
    heuristics: [
      {
        dimension: 'Clarity & Simplicity',
        scores: { notion: 8, clickup: 5, asana: 9 },
        description: 'Clean interface with minimal visual noise and obvious hierarchy. ClickUp is penalized for excessive sidebar toggles and overlapping card lists.'
      },
      {
        dimension: 'Discoverability of Features',
        scores: { notion: 6, clickup: 9, asana: 8 },
        description: 'How easily users can find advanced tools. Notion relies heavily on slash commands, which are hidden until typed. ClickUp exposes almost all features instantly but clutters the screen.'
      },
      {
        dimension: 'Cognitive Load',
        scores: { notion: 7, clickup: 4, asana: 8 },
        description: 'The amount of mental effort required to use the product. Lower scores mean higher friction. Clickup triggers immediate decision fatigue.'
      },
      {
        dimension: 'Time-to-Value (Aha! speed)',
        scores: { notion: 7, clickup: 6, asana: 9 },
        description: 'How fast a new user completes their first successful workflow. Asana guides users straight to task creation, achieving fastest time-to-value.'
      }
    ],
    pricing: [
      {
        planName: 'Free Tier',
        price: { notion: '$0 (Unlimited blocks for individuals, limited collaborative blocks)', clickup: '$0 (100MB storage, basic tasks, 5 spaces limit)', asana: '$0 (Up to 10 users, basic list/board views, no timelines)' },
        restrictions: { notion: 'Cannot invite more than 10 guests. Database history limited to 7 days.', clickup: 'Limits advanced features like custom fields (100 uses) and dashboards.', asana: 'No Gantt/Timeline view, no custom templates, limited reports.' },
        upgradeTriggers: ['Inviting clients/guests', 'Hitting custom field limits', 'Needing timeline view']
      },
      {
        planName: 'Standard User (Growth/Plus)',
        price: { notion: '$8 - $10 / user / month', clickup: '$7 - $12 / user / month', asana: '$10.99 - $13.49 / user / month' },
        restrictions: { notion: 'No SSO/SAML, basic permission groups, limited page history.', clickup: 'Unlimited storage, unlimited spaces, integrations included.', asana: 'Includes timeline view, milestones, task templates.' },
        upgradeTriggers: ['Requiring workspace security controls', 'Needing advanced formula calculations', 'Cross-team project portfolio tracking']
      }
    ],
    voc: [
      {
        productId: 'notion',
        praised: [
          'Beautiful, minimalist aesthetic makes writing documentation a pleasure.',
          'Database relations allow us to build our own customized CRM and inventory system.',
          'Great keyboard shortcuts and command palette (`/` command).'
        ],
        frustrated: [
          'Mobile app is extremely sluggish and borderline unusable for quick note captures.',
          'Relational databases load very slowly once a database has over 5,000 entries.',
          'Setting up permissions across workspace hierarchies can get very confusing and lead to leaks.'
        ],
        requests: [
          'Better offline editing support that syncs without losing changes.',
          'Native integration with Google Calendar (2-way sync).'
        ],
        switchingReasons: 'Left Confluence because it felt corporate and dated; moved to Notion to keep wiki and docs in a highly interactive canvas.'
      },
      {
        productId: 'clickup',
        praised: [
          'Unbelievable value. Standard tier has time tracking, forms, dashboards, and documents.',
          'Extremely customizable. You can view tasks as list, board, calendar, mindmap, or Gantt.',
          'Excellent bulk edit options and automation triggers.'
        ],
        frustrated: [
          'The application is incredibly slow, constantly hitting loading Spinners.',
          'The user interface is a cluttered mess; features feel bolted-on rather than designed.',
          'Constant notification overload that is difficult to tame.'
        ],
        requests: [
          'A stripped-down, simplified UI option for non-technical team members.',
          'Improved stability and offline capability.'
        ],
        switchingReasons: 'Switched from Asana to save licensing costs while gaining built-in time-tracking and custom reporting widgets.'
      }
    ],
    painPoints: [
      {
        title: 'Confusing Workspace Permissions',
        productId: 'notion',
        affectedUsers: 'Operations managers, HR, security administrators',
        severity: 'High',
        frequency: 'Frequent',
        stage: 'Collaboration',
        evidenceCount: 42,
        competitorComparison: 'Asana offers project-level security which is simpler and less prone to user error.',
        solution: 'Develop a security audit dashboard showing exactly which external guests have access to which sub-pages.',
        confidence: 89,
        quote: 'We accidentally shared our corporate cap table with an external marketing contractor because they had guest access to a parent folder.'
      },
      {
        title: 'Severe UI Lag & Loading Spinners',
        productId: 'clickup',
        affectedUsers: 'Developers, fast-paced project managers',
        severity: 'High',
        frequency: 'Frequent',
        stage: 'Repeat usage',
        evidenceCount: 68,
        competitorComparison: 'Notion is faster for text, but Linear is the gold standard for immediate response times.',
        solution: 'Refactor client-side state caching; implement local-first database sync for task updates.',
        confidence: 94,
        quote: 'ClickUp loading spinners are a running joke in our team. We spend hours collectively waiting for tasks to open.'
      },
      {
        title: 'Lack of custom fields on Free Tier',
        productId: 'asana',
        affectedUsers: 'Bootstrapped startup founders, indie builders',
        severity: 'Medium',
        frequency: 'Intermittent',
        stage: 'First meaningful action',
        evidenceCount: 29,
        competitorComparison: 'ClickUp allows unlimited custom fields even on free tiers, making it much friendlier to cash-strapped teams.',
        solution: 'Unlock a limited set (e.g., 3 custom fields) on the free tier to increase activation.',
        confidence: 81,
        quote: 'We wanted to track bug priority (Low/Medium/High) but Asana forced us to upgrade our entire 10-person team to the paid plan just for that.'
      }
    ],
    swot: {
      notion: {
        strengths: ['Massive brand equity & community loyalty', 'Database customization flexibility', 'Clean, high-design UI/UX', 'Excellent templating engine'],
        weaknesses: ['Poor performance with large volumes of data', 'Steep setup curve for team workspaces', 'Weak offline editing support', 'Sluggish mobile apps'],
        opportunities: ['Integrate deeply with developer tools (GitHub/Jira)', 'Introduce native calendar syncing', 'Create automated database clean-up alerts'],
        threats: ['Clones capturing specific vertical use cases (e.g. Linear for dev, Coda for calculation-heavy tables)', 'Enterprise security lockouts']
      },
      clickup: {
        strengths: ['Feature richness out-of-the-box', 'High value-for-money ratio', 'Excellent dashboard widgets', 'Customization views'],
        weaknesses: ['Visual clutter & complexity', 'Frequent bugs & performance latency', 'Difficult onboarding for non-tech roles'],
        opportunities: ['Release a Lite version focused strictly on speed', 'Leverage ClickUp Brain AI to clean up messy tasks', 'Improve offline synchronization'],
        threats: ['User churn due to tool fatigue & return to simpler workflows (Linear/Notion)']
      },
      asana: {
        strengths: ['Extremely intuitive task flow & high adoption rate', 'Robust Gantt charting engine', 'Enterprise compliance and sales team', 'Reliable API integrations'],
        weaknesses: ['High per-seat pricing', 'Rigid feature structures (restricted customization)', 'Limited note-taking/doc capabilities within tasks'],
        opportunities: ['Offer cheaper pricing structures for early startups', 'Introduce documentation canvases within tasks', 'Build a stronger client sharing portal'],
        threats: ['Pricing pressure from cheaper competitors like ClickUp', 'Erosion of mid-market client base to Notion']
      }
    },
    matrix: [
      { category: 'Ease of Onboarding', scores: { notion: 7.8, clickup: 6.2, asana: 8.8 } },
      { category: 'Feature Depth & Utility', scores: { notion: 8.5, clickup: 9.6, asana: 7.8 } },
      { category: 'Real-time Collaboration', scores: { notion: 9.0, clickup: 8.1, asana: 8.4 } },
      { category: 'Pricing Accessibility', scores: { notion: 8.2, clickup: 9.1, asana: 6.0 } },
      { category: 'Performance & Speed', scores: { notion: 6.8, clickup: 5.2, asana: 8.5 } }
    ],
    opportunityMap: [
      { id: '1', title: 'Interactive Spec Template', type: 'Quick Win', impact: 8, effort: 3, evidence: 'Notion database friction mentions' },
      { id: '2', title: 'Performance Caching Refactor', type: 'Strategic Bet', impact: 9, effort: 8, evidence: 'ClickUp loading latency reviews' },
      { id: '3', title: 'Flexible Guest Workspace Permissions', type: 'Table Stakes', impact: 7, effort: 4, evidence: 'Notion permission leaks' },
      { id: '4', title: 'Unlimited Custom Fields (Free Trial)', type: 'Quick Win', impact: 8, effort: 2, evidence: 'Asana pricing limitations complaints' },
      { id: '5', title: 'Local-first Capture Widget', type: 'Strategic Bet', impact: 7, effort: 7, evidence: 'Notion mobile capture speed complains' }
    ],
    recommendations: [
      {
        title: 'Adaptive Onboarding Blueprints',
        problem: 'New users land in Notion/ClickUp and experience instant decision fatigue, leading to churn before they can build their workspace.',
        targetSegment: 'Startup Founders & Product Managers',
        evidence: '34 reviews complain of empty-canvas anxiety in Notion; 68 reviews complain of ClickUp layout clutter.',
        proposedSolution: 'Introduce vertical-specific blueprints during onboarding (e.g., "SaaS Product Launch"). Automatically build out the required pages (PRD template, sprint tracker, feedback inbox) and hide all other advanced sidebars initially.',
        expectedOutcome: 'Shorten time-to-value by 40% and increase user retention at week 2 by 15%.',
        businessImpact: 'Increase conversion rates from free-to-paid by boosting initial engagement.',
        effort: 'Medium',
        risk: 'Low',
        successMetric: 'Activation rate (first project created within 3 minutes of signup)',
        confidence: 88
      },
      {
        title: 'Local-first Caching layer for Task Transitions',
        problem: 'ClickUp users experience severe latency (1.5s - 3s) when clicking tasks or switching views, degrading the daily work experience.',
        targetSegment: 'Daily Active Users (Developers & PMs)',
        evidence: '68 mentions of "loading spinners" and "latency lag" in app reviews.',
        proposedSolution: 'Implement client-side state caching using IndexedDB and optimistic UI updates for task movements (e.g., dragging a task to Done immediately reflects in the UI, syncing asynchronously in the background).',
        expectedOutcome: 'Reduce task transition latency to under 100ms.',
        businessImpact: 'Decrease user churn due to performance frustration by 20%.',
        effort: 'High',
        risk: 'Medium',
        successMetric: 'Average page interaction response time (measured in milliseconds)',
        confidence: 95
      },
      {
        title: 'Limited Custom Fields for Bootstrapped Teams',
        problem: 'Asana forces startups to pay high premium subscriptions just to get custom status labels, forcing them to cheaper alternatives like ClickUp.',
        targetSegment: 'Small Teams & Startups (Under 10 users)',
        evidence: '29 complaints about immediate upgrade gates for basic task tags in Asana.',
        proposedSolution: 'Provide up to 3 custom fields for free workspaces. Keep advanced formulas and cascading custom field integrations locked behind paid tiers.',
        expectedOutcome: 'Increase signup-to-active conversion for small teams.',
        businessImpact: 'Expands top-of-funnel users which convert to paid seats as the startup grows and hires.',
        effort: 'Low',
        risk: 'Low',
        successMetric: 'Self-serve signup-to-active conversion rate',
        confidence: 82
      }
    ],
    sources: [
      {
        title: 'G2 Review Data - Project Management Software',
        url: 'https://www.g2.com/categories/project-management',
        retrievedAt: new Date().toISOString(),
        snippet: 'Aggregated user sentiment: Notion scored highest in ease of use for documentation (9.2), ClickUp scored highest in feature variety (9.5), Asana scored highest in task organization (9.0).',
        confidence: 'High',
        classification: 'User Finding'
      },
      {
        title: 'Notion Official Help Center - Relational Database Permissions',
        url: 'https://www.notion.so/help/relations-and-rollups',
        retrievedAt: new Date().toISOString(),
        snippet: 'Official behavior: "When you share a database page, permissions do not automatically restrict referenced items in other databases unless those databases are restricted independently."',
        confidence: 'High',
        classification: 'Verified Fact'
      },
      {
        title: 'ClickUp Pricing and Capability Restrictions List',
        url: 'https://clickup.com/pricing',
        retrievedAt: new Date().toISOString(),
        snippet: 'Free Forever tier includes: 100MB storage, unlimited tasks, unlimited members, two-factor authentication, collaborative docs, and whiteboards.',
        confidence: 'High',
        classification: 'Verified Fact'
      }
    ]
  };
}

// Generate high-fidelity comparison for Spotify vs Apple Music vs YouTube Music
export function getSpotifyAppleYouTubeReport(objective: string, persona: string): TeardownReport {
  return {
    products: [PRESET_PRODUCTS.spotify, PRESET_PRODUCTS['apple music'], PRESET_PRODUCTS['youtubemusic']],
    timestamp: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    objective: objective || 'Compare audio streaming platforms on recommendation, UX and pricing.',
    persona: persona || 'General Consumers',
    executiveSummary: {
      overview: 'Analysis of the top music streaming platforms: Spotify, Apple Music, and YouTube Music. Spotify remains the industry leader in playlist personalization and social integration. Apple Music captures high-fidelity audio enthusiasts with spatial audio and iOS ecosystem synergies. YouTube Music serves video-heavy listeners and users seeking covers and live versions.',
      targetAudience: 'Everyday music listeners, audio enthusiasts, and family accounts.',
      strongestAdvantage: {
        spotify: 'Superior algorithm-driven recommendation engine (Discover Weekly) and seamless multi-device handover (Spotify Connect).',
        applemusic: 'Lossless audio compression and Dolby Atmos support included in the base subscription price, paired with high creator royalty rates.',
        youtubemusic: 'Seamless integration with YouTube, giving users access to live performances, bootlegs, and rare covers not on other platforms.'
      },
      biggestWeakness: {
        spotify: 'Lack of high-resolution audio (Spotify HiFi is repeatedly delayed), leading to audiophile churn to Apple/Tidal.',
        applemusic: 'Sub-par Windows and Android app performance, coupled with a rigid user library structure.',
        youtubemusic: 'Cluttered UI mixing user-uploaded videos with studio recordings, leading to library organization issues.'
      },
      competitivePosition: 'Spotify sits as the default cultural choice. Apple Music dominates Apple device users. YouTube Music wins on content variety and YouTube Premium bundling.',
      topOpportunity: 'Launch cross-service playlist synchronization to reduce switching barriers for users looking to migrate libraries.'
    },
    overview: {
      spotify: {
        company: 'Spotify Technology S.A.',
        category: 'Music & Audio Streaming',
        productType: 'Music & Podcast Streaming Platform',
        platforms: ['Web', 'macOS', 'Windows', 'iOS', 'Android', 'Smart Speakers', 'Gaming Consoles'],
        targetUsers: 'Social Listeners, Podcast Fans, Multi-device Users',
        businessModel: 'Freemium (Ad-supported) & Premium Subscription',
        coreUseCases: ['Daily commute listening', 'Podcast consumption', 'Social party playlists'],
        maturity: 'Established Public Company',
        geography: 'Global (180+ countries)'
      },
      applemusic: {
        company: 'Apple Inc.',
        category: 'Music Streaming',
        productType: 'Ecosystem-Integrated Audio Streaming',
        platforms: ['iOS', 'macOS', 'iPadOS', 'watchOS', 'Apple TV', 'Android', 'Web', 'Windows'],
        targetUsers: 'Apple Device Owners, Audiophiles, Studio Sound Admirers',
        businessModel: 'Paid Subscription Only (No free tier)',
        coreUseCases: ['Hi-Fi listening', 'CarPlay music', 'Local library integration'],
        maturity: 'Established Corporate Product',
        geography: 'Global (167 countries)'
      },
      youtubemusic: {
        company: 'Google LLC (YouTube)',
        category: 'Audio & Video Streaming',
        productType: 'Video-Integrated Audio Streaming',
        platforms: ['Web', 'iOS', 'Android', 'Smart TVs', 'WearOS'],
        targetUsers: 'YouTube Premium Subscribers, Live Concert Fans, Casual Listeners',
        businessModel: 'Freemium (Ad-supported) & Premium Subscription (bundled with YouTube Premium)',
        coreUseCases: ['Background music while working', 'Watching music videos', 'Finding rare tracks and covers'],
        maturity: 'Mature Product',
        geography: 'Global (100+ countries)'
      }
    },
    jtbd: [
      {
        job: 'Find new music aligned with my current mood',
        functional: [
          'Generate infinite playlists matching a specific seed track or genre',
          'Provide weekly fresh recommendations of emerging artists',
          'Let me filter music by activity (focus, workout, sleep)'
        ],
        emotional: [
          'Feel excited by discovering a new favorite song',
          'Avoid the boredom of listening to the same tracks repeatedly'
        ],
        social: [
          'Share cool new tracks with friends on Instagram Stories',
          'Stay current with pop culture and viral audio trends'
        ],
        alternatives: ['Radio stations', 'Shazam-ing tracks in public', 'TikTok videos']
      }
    ],
    segments: [
      {
        name: 'The Audiophile / Studio Enthusiast',
        mainNeed: 'lossless audio quality, spatial sound fields, detailed metadata, clean DAC support.',
        features: ['Dolby Atmos', 'Hi-Res Lossless', 'Lyrics Sync', 'CarPlay Integration'],
        painPoints: ['Compressed lossy sound quality', 'Lack of hardware integrations', 'High pricing tiers'],
        willingnessToPay: 'High',
        productFit: { spotify: 4, applemusic: 9, youtubemusic: 5 }
      },
      {
        name: 'The Casual Multi-device Listener',
        mainNeed: 'Instant playback, seamless transfer between speaker and phone, social playlists.',
        features: ['Spotify Connect', 'Shared Playlists', 'Podcast player', 'Offline sync'],
        painPoints: ['Inability to play on smart home speakers easily', 'Disconnected queues', 'Lack of podcasts'],
        willingnessToPay: 'Medium',
        productFit: { spotify: 9, applemusic: 7, youtubemusic: 7 }
      }
    ],
    positioning: {
      spotify: {
        headline: 'Listening is everything.',
        corePromise: 'Millions of songs and podcasts, personalized for you, wherever you are.',
        differentiators: ['Spotify Connect device handoff', 'Cultural events like Spotify Wrapped', 'Best-in-class collaborative sessions'],
        primaryCTA: 'Get Spotify Free',
        socialProof: 'Over 600 million active monthly users.',
        messagingClarity: 10
      },
      applemusic: {
        headline: 'Hear what you’ve been missing.',
        corePromise: 'Lossless audio, spatial audio, and your entire library in one place on all Apple devices.',
        differentiators: ['Lossless/Spatial Audio included in base price', 'Live radio (Apple Music 1)', 'Seamless Apple Watch sync'],
        primaryCTA: 'Try it free',
        socialProof: 'Bundled inside Apple One, default player for iOS.',
        messagingClarity: 9
      },
      youtubemusic: {
        headline: 'It’s all here.',
        corePromise: 'Official albums, live recordings, music videos, and covers, all connected to YouTube.',
        differentiators: ['Integration with YouTube video library', 'Includes offline background play for YouTube videos', 'Deep search by typing lyrics'],
        primaryCTA: 'Get YouTube Music',
        socialProof: 'Bundled with YouTube Premium (100M+ users).',
        messagingClarity: 8
      }
    },
    features: [
      {
        capability: 'High-Fidelity Audio',
        description: 'Lossless compression codec (CD-quality) and spatial 3D audio.',
        status: { spotify: 'No', applemusic: 'Full', youtubemusic: 'No' },
        opportunityScore: 'High'
      },
      {
        capability: 'Device Hand-off (Connect)',
        description: 'Using your phone as a remote to instantly transfer and control music on computers, TVs, and speakers.',
        status: { spotify: 'Full', applemusic: 'Basic', youtubemusic: 'Basic' },
        opportunityScore: 'High'
      },
      {
        capability: 'Algorithmic Personalization',
        description: 'Discover playlists tailored weekly to your taste and active mood shifting.',
        status: { spotify: 'Advanced', applemusic: 'Partial', youtubemusic: 'Advanced' },
        opportunityScore: 'Low'
      },
      {
        capability: 'Video & Bootleg Catalog',
        description: 'Access to user-uploaded concert videos, covers, and unofficial remixes.',
        status: { spotify: 'Basic', youtubemusic: 'Advanced', applemusic: 'No' },
        opportunityScore: 'Medium'
      }
    ],
    userJourney: [
      {
        stage: 'Discovery & Signup',
        userGoal: 'Create an account and immediately start listening to a favorite track.',
        actions: {
          spotify: 'Download app or use web. Sign up via email or Google. Guided choice of 3 initial favorite artists.',
          applemusic: 'Pre-installed on iOS. Requires Apple ID authentication. Asks to select bubble genres.',
          youtubemusic: 'Log in with existing Google account. Instant sign-in.'
        },
        friction: {
          spotify: 'Low. Immediate entry to the dashboard.',
          applemusic: 'High. Immediate credit card/payment screen before the user can explore.',
          youtubemusic: 'Low. Fast entry, leverages active Google login.'
        },
        opportunities: ['Provide a 30-second guest preview listening session without requiring an account.']
      }
    ],
    heuristics: [
      {
        dimension: 'Interface Consistency',
        scores: { spotify: 9, applemusic: 8, youtubemusic: 6 },
        description: 'Spotify maintains a very uniform layout across web, desktop, and mobile. YouTube Music mixes video player aesthetics which breaks consistency.'
      },
      {
        dimension: 'Time-to-Value',
        scores: { spotify: 9, applemusic: 7, youtubemusic: 9 },
        description: 'Spotify and YouTube Music allow immediate ad-supported playback. Apple Music blocks users with a paywall, delaying time-to-value.'
      }
    ],
    pricing: [
      {
        planName: 'Individual Premium',
        price: { spotify: '$11.99 / month', applemusic: '$10.99 / month (includes Lossless)', youtubemusic: '$10.99 / month (or $13.99 inside YouTube Premium)' },
        restrictions: { spotify: 'Lossy compression only (320kbps).', applemusic: 'No free ad-supported mode.', youtubemusic: 'Standard 256kbps quality.' },
        upgradeTriggers: ['Audio quality upgrading', 'Removing advertisements', 'Background playing on mobile']
      }
    ],
    voc: [
      {
        productId: 'spotify',
        praised: ['Spotify Connect is magic. I can walk into my room and transfer music to my Sonos speaker instantly.', 'Best discovery algorithm. It has introduced me to hundreds of artists.', 'Wrapped is a global event.'],
        frustrated: ['Where is the HiFi audio quality? We have been promised it for years.', 'Too many podcast recommendations cluttering my music home screen.'],
        requests: ['Ability to block specific podcast shows from showing up on feed.', '24-bit lossless audio streaming.'],
        switchingReasons: "Left Apple Music because the desktop app on Windows was extremely slow and didn't support device transfer."
      }
    ],
    painPoints: [
      {
        title: 'Cluttered Podcast-Heavy Interface',
        productId: 'spotify',
        affectedUsers: 'Music purists',
        severity: 'Medium',
        frequency: 'Frequent',
        stage: 'Repeat usage',
        evidenceCount: 51,
        competitorComparison: 'Apple Music separates podcasts into a completely separate app, maintaining a pure music environment.',
        solution: 'Introduce a "Music Only" home feed filter to suppress podcast and audiobook panels.',
        confidence: 90,
        quote: 'I open Spotify to listen to jazz, and I am blasted with true-crime podcast cards occupying half my screen.'
      }
    ],
    swot: {
      spotify: {
        strengths: ['Best device connectivity ecosystem (Spotify Connect)', 'Massive social network sharing and Wrapped viral campaigns', 'Strongest algorithm recommendations'],
        weaknesses: ['No high-resolution audio support', 'High cost of content royalties', 'User backlash over podcast clutter'],
        opportunities: ['Offer a dedicated audiophile tier', 'Integrate ticket purchases directly in the player'],
        threats: ['Apple and Google bundling music into hardware/ecosystem subscriptions']
      }
    },
    matrix: [
      { category: 'Device Connection Ecosystem', scores: { spotify: 9.8, clickup: 0, applemusic: 7.2, youtubemusic: 6.8 } }, // padding clickup with 0 since it is not evaluated
      { category: 'Audio Fidelity & CD-quality', scores: { spotify: 6.0, clickup: 0, applemusic: 9.8, youtubemusic: 6.5 } },
      { category: 'Music Video Integration', scores: { spotify: 5.5, clickup: 0, applemusic: 7.0, youtubemusic: 9.6 } }
    ],
    opportunityMap: [
      { id: '1', title: 'Music Only Feed Toggle', type: 'Quick Win', impact: 8, effort: 3, evidence: 'Podcast clutter complaints' },
      { id: '2', title: 'Lossless Audio launch', type: 'Strategic Bet', impact: 9, effort: 7, evidence: 'Audiophile churn to Apple' }
    ],
    recommendations: [
      {
        title: 'Music Only Home Feed Filter',
        problem: 'Users complain that podcast and audiobook content overrides their primary music interface, making it difficult to find their songs.',
        targetSegment: 'Music Purists & Casual Listeners',
        evidence: '51 complaints regarding podcast-cluttered dashboard in Spotify user surveys.',
        proposedSolution: 'Create a simple pill filter at the top of the homepage: "Music" vs. "Podcasts". Tapping "Music" hides all podcast suggestions, maintaining a pure audio interface.',
        expectedOutcome: 'Increase user home-screen satisfaction and reduce accidental clicks on non-music elements.',
        businessImpact: 'Increase music retention rates and decrease negative ratings on app stores.',
        effort: 'Low',
        risk: 'Low',
        successMetric: 'Engagement rates on recommended music items post-filter usage',
        confidence: 91
      }
    ],
    sources: [
      {
        title: 'Apple Music Technical Specifications',
        url: 'https://support.apple.com/en-us/HT212182',
        retrievedAt: new Date().toISOString(),
        snippet: 'Official: Apple Music offers Lossless audio up to 24-bit/192 kHz at no extra cost, utilizing ALAC codec.',
        confidence: 'High',
        classification: 'Verified Fact'
      }
    ]
  };
}

// Generate dynamic report for any products entered by the user
export function generateGenericReport(namesInput: string, objective: string, persona: string): TeardownReport {
  const products = resolveProducts(namesInput);
  const p1 = products[0] || { id: 'p1', name: 'Product A', website: 'https://producta.com', logoText: 'A', logoBg: 'bg-indigo-600 text-white', companyName: 'Product A Inc.', category: 'SaaS Software', description: 'A productivity application.' };
  const p2 = products[1] || { id: 'p2', name: 'Product B', website: 'https://productb.com', logoText: 'B', logoBg: 'bg-emerald-600 text-white', companyName: 'Product B Inc.', category: 'SaaS Software', description: 'A workflow software.' };
  const p3 = products[2] || null;

  const names = products.map(p => p.name);
  const activeProducts = products;

  const strongestAdvantage: { [product: string]: string } = {};
  const biggestWeakness: { [product: string]: string } = {};
  const overview: { [productId: string]: any } = {};
  const positioning: { [productId: string]: any } = {};
  const swot: { [productId: string]: any } = {};

  activeProducts.forEach((p, idx) => {
    strongestAdvantage[p.id] = `Leading-edge specialization in core workflow automation and user journey onboarding tailored to ${persona || 'target personas'}.`;
    biggestWeakness[p.id] = `Potential feature bloat and platform learning curve, particularly for non-technical users in fast-moving industries.`;

    overview[p.id] = {
      company: p.companyName,
      category: p.category,
      productType: 'Digital Cloud Platform',
      platforms: ['Web', 'iOS', 'Android'],
      targetUsers: persona || 'Product Managers, Builders, Operations Managers',
      businessModel: 'Subscription SaaS model with monthly per-seat pricing',
      coreUseCases: ['Task automation', 'Centralized communication', 'Resource management'],
      maturity: 'Mature Growth Stage',
      geography: 'Global availability'
    };

    positioning[p.id] = {
      headline: `The future of modern team collaboration is here.`,
      corePromise: `Unifying your distributed teams and data into a single, high-velocity workspace.`,
      differentiators: ['Optimized user layouts', 'Best-in-class third-party integrations', 'Affordable entry pricing'],
      primaryCTA: 'Start for free',
      socialProof: `Trusted by thousands of high-growth tech startups.`,
      messagingClarity: 8
    };

    swot[p.id] = {
      strengths: ['Robust core features', 'Highly responsive client-side interface', 'Active customer support ecosystem'],
      weaknesses: ['Steep learning curve for advanced relations', 'Lack of offline workspace syncing', 'Pricing rigidity on scale'],
      opportunities: ['Introduce contextual AI automation blocks', 'Expand marketplace template offerings'],
      threats: ['Rapidly emerging low-cost competitors', 'Security constraints blocking enterprise sales']
    };
  });

  const features = [
    {
      capability: 'Core Workflow Dashboard',
      description: 'Central visualization of active progress status, milestones, and task assignees.',
      status: activeProducts.reduce((acc, p, idx) => {
        acc[p.id] = idx === 0 ? 'Advanced' : 'Full';
        return acc;
      }, {} as any),
      opportunityScore: 'Medium' as const
    },
    {
      capability: 'Integrations Engine',
      description: 'Syncing data streams with external messaging apps and development repositories.',
      status: activeProducts.reduce((acc, p, idx) => {
        acc[p.id] = idx === 1 ? 'Advanced' : 'Partial';
        return acc;
      }, {} as any),
      opportunityScore: 'High' as const
    },
    {
      capability: 'Native Collaboration Suite',
      description: 'Inline editing, comments, mentions, and shared workspace permissions.',
      status: activeProducts.reduce((acc, p, idx) => {
        acc[p.id] = 'Full';
        return acc;
      }, {} as any),
      opportunityScore: 'Low' as const
    },
    {
      capability: 'AI Synthesis Copilot',
      description: 'Generates summaries, auto-populates tags, and drafts updates.',
      status: activeProducts.reduce((acc, p, idx) => {
        acc[p.id] = idx === 0 ? 'Full' : 'No';
        return acc;
      }, {} as any),
      opportunityScore: 'High' as const
    }
  ];

  const heuristics = [
    {
      dimension: 'Clarity of Layout',
      scores: activeProducts.reduce((acc, p, idx) => {
        acc[p.id] = 8.5 - idx * 0.5;
        return acc;
      }, {} as any),
      description: 'Ensuring structural paths and actions are visually obvious to reduce cognitive load.'
    },
    {
      dimension: 'Discoverability of Utilities',
      scores: activeProducts.reduce((acc, p, idx) => {
        acc[p.id] = 7.0 + idx * 0.8;
        return acc;
      }, {} as any),
      description: 'Exposing complex settings naturally rather than hiding them under sub-menus.'
    },
    {
      dimension: 'Onboarding Time-to-Value',
      scores: activeProducts.reduce((acc, p, idx) => {
        acc[p.id] = 8.0 - idx * 0.4;
        return acc;
      }, {} as any),
      description: 'The number of pages and confirmations needed before a user completes their first action.'
    }
  ];

  const pricing = [
    {
      planName: 'Free / Tier 1',
      price: activeProducts.reduce((acc, p, idx) => {
        acc[p.id] = '$0 Basic usage';
        return acc;
      }, {} as any),
      restrictions: activeProducts.reduce((acc, p, idx) => {
        acc[p.id] = 'Limited storage, max 5 members.';
        return acc;
      }, {} as any),
      upgradeTriggers: ['Inviting team members', 'Accessing advanced reporting']
    },
    {
      planName: 'Pro / Tier 2',
      price: activeProducts.reduce((acc, p, idx) => {
        acc[p.id] = `$12 - $15 / user / mo`;
        return acc;
      }, {} as any),
      restrictions: activeProducts.reduce((acc, p, idx) => {
        acc[p.id] = 'Unlimited workspaces, includes integrations.';
        return acc;
      }, {} as any),
      upgradeTriggers: ['Needing SSO integration', 'Compliance reviews']
    }
  ];

  const voc = activeProducts.map(p => ({
    productId: p.id,
    praised: [`Intuitive default layout that is easy to navigate.`, `Extremely useful template center that shortens setup.`, `Polished notification panel.`],
    frustrated: [`Mobile app loading speeds are noticeably slower than web.`, `Relational fields become clunky to search at scale.`, `Occasional dashboard syncing errors when collaborating in real time.`],
    requests: [`Better offline synchronization support.`, `Expanded third-party marketplace options.`],
    switchingReasons: `Migrated from manual spreadsheets and legacy software to gain automated dashboards and collaborative workspace velocity.`
  }));

  const painPoints = activeProducts.map((p, idx) => ({
    title: `Dashboard load latency at scale`,
    productId: p.id,
    affectedUsers: 'High-frequency operations managers',
    severity: 'High' as const,
    frequency: 'Frequent' as const,
    stage: 'Daily engagement',
    evidenceCount: 15 + idx * 4,
    competitorComparison: `Alternative products utilize cached local DB states to speed up client rendering times.`,
    solution: `Implement client-side query indexing and load assets incrementally based on viewport.`,
    confidence: 85,
    quote: `When our task database grew past a few thousand, the loading time became noticeably sluggish.`
  }));

  const matrix = [
    { category: 'Onboarding Ease', scores: activeProducts.reduce((acc, p, idx) => { acc[p.id] = 8.0 - idx * 0.5; return acc; }, {} as any) },
    { category: 'Feature Completeness', scores: activeProducts.reduce((acc, p, idx) => { acc[p.id] = 7.5 + idx * 0.6; return acc; }, {} as any) },
    { category: 'Interface Speed', scores: activeProducts.reduce((acc, p, idx) => { acc[p.id] = 8.5 - idx * 0.8; return acc; }, {} as any) },
    { category: 'Pricing Value', scores: activeProducts.reduce((acc, p, idx) => { acc[p.id] = 8.0 - idx * 0.2; return acc; }, {} as any) }
  ];

  return {
    products,
    timestamp: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    objective: objective || 'General competitive assessment',
    persona: persona || 'Product Managers & Startup Teams',
    executiveSummary: {
      overview: `A complete competitive intelligence teardown of ${names.join(', ')} configured for ${persona || 'standard product teams'}. This analysis evaluates core workflows, pricing tiers, and public sentiment to uncover product opportunities.`,
      targetAudience: persona || 'Product Managers, developers, and project leaders seeking to optimize their stack.',
      strongestAdvantage,
      biggestWeakness,
      competitivePosition: `The market consists of highly refined alternatives where ${p1.name} leads in onboarding velocity and layout design, while ${p2.name} focuses heavily on developer features and integrations.`,
      topOpportunity: `Implement dynamic template personalization during workspace creation to help teams bypass blank-canvas friction and reach activation faster.`
    },
    overview,
    jtbd: [
      {
        job: `Organize team deliverables and priorities`,
        functional: [
          'Filter active work tasks by department and priority tier',
          'Coordinate project timelines with clear employee ownership'
        ],
        emotional: [
          'Feel control and clarity over upcoming release cycles',
          'Reduce anxiety regarding missed project deadlines'
        ],
        social: [
          'Maintain high team trust through transparent progress tracking',
          'Report team performance clearly to stakeholders'
        ],
        alternatives: ['Offline spreadsheets', 'Weekly sync meetings', 'Slack channel lists']
      }
    ],
    segments: [
      {
        name: 'Startup Product Managers',
        mainNeed: 'Fast setup, custom specs integration, and product feedback loops.',
        features: ['Templates', 'Free Tiers', 'Docs Integration'],
        painPoints: ['Complex permissions configuration', 'Slow database loading speeds'],
        willingnessToPay: 'Medium',
        productFit: activeProducts.reduce((acc, p, idx) => {
          acc[p.id] = 9 - idx;
          return acc;
        }, {} as any)
      }
    ],
    positioning,
    features,
    userJourney: [
      {
        stage: 'Onboarding & Workspace setup',
        userGoal: 'Initialize a workspace and invite the core team within 2 minutes.',
        actions: activeProducts.reduce((acc, p, idx) => {
          acc[p.id] = `User inputs email, selects role, and is prompted to name their first team board.`;
          return acc;
        }, {} as any),
        friction: activeProducts.reduce((acc, p, idx) => {
          acc[p.id] = idx === 0 ? 'Low. Simple guided inputs.' : 'Medium. Requires inviting 2 users before showing dashboard.';
          return acc;
        }, {} as any),
        opportunities: ['Allow users to skip teammate invites and populate with mock teammates initially.']
      }
    ],
    heuristics,
    pricing,
    voc,
    painPoints,
    swot,
    matrix,
    opportunityMap: [
      { id: '1', title: 'Local database caching', type: 'Strategic Bet', impact: 8, effort: 7, evidence: 'Reviews complaining of scale latency' },
      { id: '2', title: ' teampate pre-population', type: 'Quick Win', impact: 8, effort: 3, evidence: 'Onboarding activation dropdown dropouts' }
    ],
    recommendations: [
      {
        title: 'Adaptive Workspace Pre-population',
        problem: 'Users sign up and abandon the workspace because configuring empty dashboards and databases takes too much manual effort.',
        targetSegment: persona || 'Startup Founders & Product Managers',
        evidence: 'Multiple public reviews complaining about high setup overhead and empty-dashboard anxiety.',
        proposedSolution: 'Ask the user their core workspace objective during signup, then pre-populate their account with 3 finished project cards, a timeline, and a documentation template.',
        expectedOutcome: 'Increase user retention in week 1 by 18% by immediately demonstrating value.',
        businessImpact: 'Boost free-to-paid subscriber conversion rates.',
        effort: 'Medium',
        risk: 'Low',
        successMetric: 'Active database items created in day 1',
        confidence: 85
      }
    ],
    sources: [
      {
        title: `${p1.name} Official Product Portal`,
        url: p1.website,
        retrievedAt: new Date().toISOString(),
        snippet: `Home page features listed: Custom workspace templates, real-time doc collaboration, granular sharing.`,
        confidence: 'High',
        classification: 'Verified Fact'
      },
      {
        title: `Public Community Discussion Forum`,
        url: `https://reddit.com/r/${p1.id}`,
        retrievedAt: new Date().toISOString(),
        snippet: `User threads: Discussion of loading speeds, Relational database limitations, workarounds for shared guest accounts.`,
        confidence: 'Medium',
        classification: 'User Finding'
      }
    ]
  };
}

export function getTeardownData(productsInput: string, objective: string, persona: string): TeardownReport {
  const normalized = productsInput.toLowerCase();
  
  if (normalized.includes('notion') || normalized.includes('clickup') || normalized.includes('asana')) {
    // If the input is some combination of these, returns the high-fidelity prebaked report
    return getNotionClickUpAsanaReport(objective, persona);
  } else if (normalized.includes('spotify') || normalized.includes('apple music') || normalized.includes('youtube music')) {
    return getSpotifyAppleYouTubeReport(objective, persona);
  } else {
    // Return a dynamically generated report using the inputs
    return generateGenericReport(productsInput, objective, persona);
  }
}
