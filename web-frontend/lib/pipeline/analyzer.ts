// ═══════════════════════════════════════════════
// Evidence-Backed AI Analyzer
// ═══════════════════════════════════════════════

import { EvidenceBundle } from '@/lib/types';
import { callAI } from '@/lib/gemini';

export async function generateAnalysis(
  bundle: EvidenceBundle,
  persona: string,
  industry: string,
  competitors: string[]
): Promise<any> {
  const contextBlock = buildContextBlock(bundle, persona, industry, competitors);

  // Run generation steps in parallel
  const [voc, swot, painPoints] = await Promise.all([
    generateVoC(contextBlock),
    generateSWOT(contextBlock),
    generatePainPoints(contextBlock)
  ]);

  return {
    voc: voc || defaultVoC(),
    swot: swot || defaultSWOT(),
    painPoints: painPoints || [],
    employeeIntel: bundle.product.name ? defaultEmployeeIntel() : defaultEmployeeIntel(), // Fallback for MVP
    companyIntel: defaultCompanyIntel(), // Filled by company source directly in orchestrator
    reviews: {
      totalAnalyzed: bundle.reviews.totalCount,
      sources: bundle.reviews.sourceBreakdown.map(s => s.source),
      confidence: bundle.reviews.totalCount > 10 ? 'High' : 'Medium',
      lastUpdated: new Date().toISOString().split('T')[0],
      overallSentiment: bundle.reviews.averageRating || 3,
      themes: bundle.reviews.clustered.map(c => ({
        theme: c.theme,
        count: c.count,
        sentiment: c.sentiment
      })),
      sampleReviews: [] // Populated by orchestrator from raw reviews
    }
  };
}

function buildContextBlock(bundle: EvidenceBundle, persona: string, industry: string, competitors: string[]): string {
  const reviewsContext = bundle.reviews.clustered.map(c => 
    `Theme: ${c.theme} (${c.count} mentions, ${c.sentiment})\nQuotes: ${c.representativeQuotes.join(' | ')}`
  ).join('\n');

  const discussionsContext = bundle.communityDiscussions.clustered.map(c =>
    `Theme: ${c.theme} (${c.count} mentions, ${c.sentiment})\nQuotes: ${c.representativeQuotes.join(' | ')}`
  ).join('\n');

  return `
=== OFFICIAL DOCUMENTATION ===
${bundle.officialData.documentationExtracts.join('\n')}

=== PRICING DATA ===
${JSON.stringify(bundle.extractedPricing, null, 2)}

=== CUSTOMER REVIEWS (${bundle.reviews.totalCount} reviews) ===
${reviewsContext}

=== COMMUNITY DISCUSSIONS ===
${discussionsContext}

=== EXTRACTED FEATURES ===
${bundle.extractedFeatures.join(', ')}

=== CONTEXT ===
Product: ${bundle.product.name}
Target Audience: ${persona}
Industry: ${industry}
Competitors: ${competitors.join(', ')}

RULES:
- Only use supplied evidence. Do NOT invent features.
- Every claim must cite which source type it came from.
- If evidence is insufficient, say so. Do NOT speculate.
`;
}

async function generateVoC(contextBlock: string) {
  const prompt = `
You are a Senior Product Manager. Based ONLY on the evidence below, generate a Voice of Customer analysis.
Return ONLY a valid JSON object matching this schema exactly:
{
  "mostPraised": ["Point 1", "Point 2"],
  "biggestFrustrations": ["Point 1", "Point 2"],
  "customerQuotes": [{"quote": "...", "source": "...", "sentiment": "positive"}],
  "switchingTriggers": ["..."],
  "adoptionDrivers": ["..."],
  "retentionDrivers": ["..."],
  "commonRequests": ["..."],
  "powerUserFeedback": ["..."],
  "beginnerFeedback": ["..."],
  "enterpriseFeedback": ["..."]
}

EVIDENCE:
${contextBlock}
`;
  try {
    const res = await callAI(prompt, true);
    return JSON.parse(res);
  } catch (e) {
    return null;
  }
}

async function generateSWOT(contextBlock: string) {
  const prompt = `
You are a Senior Product Manager. Based ONLY on the evidence below, generate a SWOT analysis.
Return ONLY a valid JSON object matching this schema exactly:
{
  "strengths": [{"point": "...", "evidence": "...", "sources": ["..."]}],
  "weaknesses": [{"point": "...", "evidence": "...", "sources": ["..."]}],
  "opportunities": [{"point": "...", "evidence": "...", "sources": ["..."]}],
  "threats": [{"point": "...", "evidence": "...", "sources": ["..."]}],
  "context": {"targetAudience": "...", "industry": "...", "competitors": ["..."]}
}

EVIDENCE:
${contextBlock}
`;
  try {
    const res = await callAI(prompt, true);
    return JSON.parse(res);
  } catch (e) {
    return null;
  }
}

async function generatePainPoints(contextBlock: string) {
  const prompt = `
You are a Senior Product Manager. Based ONLY on the evidence below, extract specific user pain points.
Return ONLY a valid JSON array matching this schema exactly:
[
  {
    "title": "Short title",
    "severity": "Critical" | "High" | "Medium" | "Low",
    "frequency": "Daily" | "Weekly" | "Monthly" | "Rare",
    "affectedSegment": "e.g. Enterprise users",
    "description": "...",
    "evidenceCount": 5,
    "sources": ["Reddit", "G2"],
    "confidence": "High",
    "quote": "A representative quote"
  }
]

EVIDENCE:
${contextBlock}
`;
  try {
    const res = await callAI(prompt, true);
    return JSON.parse(res);
  } catch (e) {
    return null;
  }
}

function defaultVoC() { return { mostPraised: [], biggestFrustrations: [], customerQuotes: [], switchingTriggers: [], adoptionDrivers: [], retentionDrivers: [], commonRequests: [], powerUserFeedback: [], beginnerFeedback: [], enterpriseFeedback: [] }; }
function defaultSWOT() { return { strengths: [], weaknesses: [], opportunities: [], threats: [], context: { targetAudience: '', industry: '', competitors: [] } }; }
function defaultEmployeeIntel() { return { leadership: 'Unknown', engineeringCulture: 'Unknown', productCulture: 'Unknown', innovation: 'Unknown', hiring: 'Unknown', growth: 'Unknown', pros: [], cons: [], workLifeBalance: 'Unknown', stability: 'Unknown' }; }
function defaultCompanyIntel() { return { size: 'Unknown', headquarters: 'Unknown', industry: 'Unknown', growthSignals: [], hiringTrends: 'Unknown', openPMRoles: 0, engineeringHiring: 'Unknown', expansion: 'Unknown', recentUpdates: [], techIndicators: [], investmentSignals: [] }; }
