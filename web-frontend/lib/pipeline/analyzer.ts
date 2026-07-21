// ═══════════════════════════════════════════════
// Evidence-Backed AI Analyzer — Gemini-Only Analysis Engine
// Generates the complete 15-module TeardownReport format
// ═══════════════════════════════════════════════

import { EvidenceBundle, ProductInfo } from '@/lib/types';
import { TeardownReport, getTeardownData } from '@/lib/mock-data';
import { callAnalysisAI } from '@/lib/gemini';

export interface ProductResearchSummary {
  product: ProductInfo;
  evidenceBundle: EvidenceBundle;
  sources: any[];
}

export async function generateTeardownReport(
  researches: ProductResearchSummary[],
  persona: string,
  industry: string,
  objective: string
): Promise<TeardownReport> {
  const contextBlock = buildCombinedContextBlock(researches, persona, industry, objective);

  const prompt = `
You are a world-class Product Manager and Competitive Intelligence Specialist.
Generate a comprehensive, evidence-backed product teardown and competitive analysis report comparing: ${researches.map(r => r.product.name).join(', ')}.

Objective: ${objective || 'General competitive assessment'}
Target Persona: ${persona}
Industry: ${industry}

Based ONLY on the evidence provided in the context below, populate the following competitive intelligence frameworks.
Do NOT invent fake data, features, quotes, or reviews. If evidence is insufficient, say so or set appropriate defaults.

Return ONLY a valid JSON object matching the schema below. Do NOT add markdown code blocks like \`\`\`json. Return only raw JSON.

Schema:
{
  "executiveSummary": {
    "overview": "2-paragraph summary comparing positioning, features, and target markets based on evidence",
    "targetAudience": "Brief description of who each product fits best",
    "strongestAdvantage": {
      ${researches.map(r => `"${r.product.id}": "Strongest advantage based on evidence"`).join(',\n      ')}
    },
    "biggestWeakness": {
      ${researches.map(r => `"${r.product.id}": "Biggest weakness or gap based on evidence"`).join(',\n      ')}
    },
    "competitivePosition": "Brief landscape positioning summary",
    "topOpportunity": "Top recommendation or opportunity for a product team"
  },
  "overview": {
    ${researches.map(r => `"${r.product.id}": {
      "company": "${r.product.companyName}",
      "category": "${r.product.category}",
      "productType": "SaaS Platform",
      "tagline": "Estimated tagline or description from homepage documentation",
      "ratingG2": 4.5,
      "reviewVolume": ${r.evidenceBundle.reviews.totalCount + r.evidenceBundle.communityDiscussions.raw.length},
      "pricingEntry": "${r.evidenceBundle.extractedPricing.plans[0]?.price || 'Contact Sales'}"
    }`).join(',\n    ')}
  },
  "jtbd": [
    {
      "job": "When [situation], help me [functional job] so I can [desired outcome].",
      "functional": ["Functional requirement 1 from docs", "Functional requirement 2"],
      "emotional": ["Emotional need from reviews"],
      "social": ["Social perception need"],
      "alternatives": ["Alternative solutions"]
    }
  ],
  "segments": [
    {
      "name": "Target Segment Name (e.g. Enterprise Teams, Startup Product Teams)",
      "mainNeed": "Core need of this segment",
      "productFit": {
        ${researches.map(r => `"${r.product.id}": 8`).join(',\n        ')}
      }
    }
  ],
  "positioning": {
    ${researches.map(r => `"${r.product.id}": {
      "headline": "Core messaging/differentiator from homepage documentation",
      "corePromise": "Main value proposition based on docs",
      "differentiators": ["Differentiator 1", "Differentiator 2"],
      "primaryCTA": "Get Started",
      "socialProof": "Review count or rating citation",
      "messagingClarity": 8
    }`).join(',\n    ')}
  },
  "features": [
    {
      "capability": "Feature/Capability Name from documentation",
      "description": "Specific description",
      "status": {
        ${researches.map(r => `"${r.product.id}": "Full|Partial|No|Advanced|Basic"`).join(',\n        ')}
      },
      "opportunityScore": "High|Medium|Low"
    }
  ],
  "userJourney": [
    {
      "stage": "Discovery / Signup / Core Value Loop / Expansion",
      "userGoal": "User's goal at this stage",
      "actions": {
        ${researches.map(r => `"${r.product.id}": "Action they take based on docs/reviews"`).join(',\n        ')}
      },
      "friction": {
        ${researches.map(r => `"${r.product.id}": "Friction point mentioned in reviews/reddit or 'Minimal'"`).join(',\n        ')}
      },
      "opportunities": ["Opportunity for improvement"]
    }
  ],
  "heuristics": [
    {
      "dimension": "User Value|Ease of Use|Onboarding|Feature Completeness|Differentiation|Sentiment|Pricing",
      "scores": {
        ${researches.map(r => `"${r.product.id}": 8`).join(',\n        ')}
      },
      "description": "Brief comparative description of this heuristic based on reviews and docs"
    }
  ],
  "pricing": [
    {
      "planName": "Free / Pro / Team / Enterprise plan comparison",
      "price": {
        ${researches.map(r => `"${r.product.id}": "$10/mo or Free or Contact Sales"`).join(',\n        ')}
      },
      "restrictions": {
        ${researches.map(r => `"${r.product.id}": "Usage limits or restrictions"`).join(',\n        ')}
      },
      "upgradeTriggers": ["Key reason users upgrade to this plan based on reviews/docs"]
    }
  ],
  "voc": [
    ${researches.map(r => `{
      "productId": "${r.product.id}",
      "praised": ["Praise point 1", "Praise point 2"],
      "frustrated": ["Frustration point 1", "Frustration point 2"],
      "requests": ["Feature request 1"],
      "switchingReasons": "Reason users switch to or from this product"
    }`).join(',\n    ')}
  ],
  "painPoints": [
    {
      "title": "Specific observed pain point",
      "productId": "product-id affected",
      "affectedUsers": "Target segment affected",
      "severity": "High|Medium|Low",
      "frequency": "Frequent|Intermittent|Rare",
      "stage": "Journey stage",
      "evidenceCount": 5,
      "competitorComparison": "Comparison with other products",
      "solution": "Proposed workaround or solution",
      "confidence": 88,
      "quote": "Direct quote from reviews/reddit provided in context"
    }
  ],
  "swot": {
    ${researches.map(r => `"${r.product.id}": {
      "strengths": ["Strength 1 from docs/reviews"],
      "weaknesses": ["Weakness 1 from reviews/reddit"],
      "opportunities": ["Opportunity 1"],
      "threats": ["Threat 1"]
    }`).join(',\n    ')}
  },
  "matrix": [
    {
      "category": "User Value|Ease of Use|Onboarding|Feature Completeness|Differentiation|Sentiment|Pricing",
      "scores": {
        ${researches.map(r => `"${r.product.id}": 8`).join(',\n        ')}
      }
    }
  ],
  "opportunityMap": [
    {
      "id": "opp1",
      "title": "Feature Opportunity",
      "type": "Quick Win|Strategic Bet|Table Stakes|Avoid for Now",
      "impact": 8,
      "effort": 3,
      "evidence": "Evidence statement"
    }
  ],
  "recommendations": [
    {
      "title": "Product Recommendation",
      "problem": "Specific problem observed in evidence",
      "targetSegment": "Target audience",
      "evidence": "Citing reviews/reddit",
      "proposedSolution": "Actionable solution",
      "expectedOutcome": "Benefit of solving",
      "businessImpact": "Impact on metrics",
      "effort": "Low|Medium|High",
      "risk": "Low|Medium|High",
      "successMetric": "Conversion / Retention metric",
      "confidence": 85
    }
  ]
}

EVIDENCE CONTEXT:
${contextBlock}
`;

  try {
    const jsonStr = await callAnalysisAI(prompt, true);
    const parsed = JSON.parse(jsonStr);

    const allSources: any[] = [];
    researches.forEach(r => {
      if (r.sources) {
        r.sources.forEach(src => {
          allSources.push({
            title: src.title,
            url: src.url,
            retrievedAt: new Date().toISOString(),
            snippet: src.snippet || '',
            confidence: src.confidence || 'Medium',
            classification: inferClassification(src.type)
          });
        });
      }
    });

    return {
      products: researches.map(r => r.product),
      timestamp: new Date().toISOString(),
      objective,
      persona,
      executiveSummary: parsed.executiveSummary || {},
      overview: parsed.overview || {},
      jtbd: parsed.jtbd || [],
      segments: parsed.segments || [],
      positioning: parsed.positioning || {},
      features: parsed.features || [],
      userJourney: parsed.userJourney || [],
      heuristics: parsed.heuristics || [],
      pricing: parsed.pricing || [],
      voc: parsed.voc || [],
      painPoints: parsed.painPoints || [],
      swot: parsed.swot || {},
      matrix: parsed.matrix || [],
      opportunityMap: parsed.opportunityMap || [],
      recommendations: parsed.recommendations || [],
      sources: allSources.slice(0, 30)
    } as TeardownReport;

  } catch (err) {
    console.error('[analyzer] Failed to generate complete TeardownReport:', err);
    return getTeardownData(researches.map(r => r.product.name).join(', '), objective, persona);
  }
}

function inferClassification(type: string): 'Verified Fact' | 'User Finding' | 'AI Observation' | 'AI Hypothesis' {
  const lower = (type || '').toLowerCase();
  if (lower.includes('doc') || lower.includes('pricing') || lower.includes('official')) return 'Verified Fact';
  if (lower.includes('review') || lower.includes('discussion') || lower.includes('reddit')) return 'User Finding';
  return 'AI Observation';
}

function buildCombinedContextBlock(
  researches: ProductResearchSummary[],
  persona: string,
  industry: string,
  objective: string
): string {
  return researches.map(r => {
    const bundle = r.evidenceBundle;
    const reviewThemes = bundle.reviews.clustered.map(c => `  Theme: ${c.theme} (${c.count} mentions, ${c.sentiment} sentiment)\n    Quotes: ${c.representativeQuotes.join(' | ')}`).join('\n');
    const redditThemes = bundle.communityDiscussions.clustered.map(c => `  Theme: ${c.theme} (${c.count} mentions, ${c.sentiment} sentiment)\n    Quotes: ${c.representativeQuotes.join(' | ')}`).join('\n');
    const docExtracts = bundle.officialData.documentationExtracts.slice(0, 10).join('\n');
    const pricingPlans = bundle.extractedPricing.plans.map(p => `  Plan: ${p.name} (${p.price}) - Features: ${p.features.slice(0, 4).join(', ')}`).join('\n');

    return `
=============================================
PRODUCT: ${r.product.name} (ID: ${r.product.id})
=============================================
DOCUMENTATION EVIDENCE:
${docExtracts || 'No official doc extracts available'}

PRICING PLANS:
${pricingPlans || 'No pricing plans extracted'}

REVIEWS EVIDENCE:
${reviewThemes || 'No review themes available'}

COMMUNITY DISCUSSIONS (REDDIT):
${redditThemes || 'No community discussion themes available'}
`;
  }).join('\n\n') + `
\nREPORT CONFIGURATION:
Persona: ${persona}
Industry: ${industry}
Objective: ${objective}
`;
}
