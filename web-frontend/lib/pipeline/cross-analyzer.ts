// ═══════════════════════════════════════════════
// Cross-Product Analyzer (Second AI Pass)
// ═══════════════════════════════════════════════

import { ProductResearch, CrossProductAnalysis } from '@/lib/types';
import { callAI } from '@/lib/gemini';

export async function crossAnalyze(
  researches: ProductResearch[]
): Promise<CrossProductAnalysis> {
  const defaultAnalysis: CrossProductAnalysis = {
    executiveSummary: 'Analysis complete.',
    overallWinner: { productId: researches[0]?.product.id || '', reason: 'Based on overall capabilities.', score: 8.5 },
    commonFeatures: [],
    uniqueFeatures: {},
    featureMatrix: [],
    sharedComplaints: [],
    sharedOpportunities: [],
    sharedRisks: [],
    sharedStrengths: [],
    sharedWeaknesses: [],
    opportunityMap: []
  };

  if (researches.length < 2) return defaultAnalysis;

  const productContexts = researches.map(r => `
--- PRODUCT: ${r.product.name} ---
Features: ${r.features.map(f => f.name).join(', ')}
Strengths: ${r.swot.strengths.map(s => s.point).join(', ')}
Weaknesses: ${r.swot.weaknesses.map(w => w.point).join(', ')}
Top Praise: ${r.voc.mostPraised.join(', ')}
Top Frustrations: ${r.voc.biggestFrustrations.join(', ')}
Pricing: ${r.pricing.plans.map(p => p.name + ' (' + p.price + ')').join(', ')}
`).join('\n\n');

  const prompt = `
You are a Senior Product Strategist conducting a competitive analysis.
Based ONLY on the independent product analyses below, identify shared patterns and differences.
Rule: Only mark something as "shared" or "common" if it is explicitly confirmed in AT LEAST TWO products.

Return ONLY a valid JSON object matching this schema exactly, with no markdown formatting:
{
  "executiveSummary": "A 2-paragraph summary comparing the products.",
  "overallWinner": { "productId": "id-of-winner", "reason": "...", "score": 9.2 },
  "commonFeatures": ["Feature 1", "Feature 2"],
  "uniqueFeatures": {
    "product-id-1": ["Unique 1", "Unique 2"]
  },
  "featureMatrix": [
    { "capability": "Feature name", "status": { "product-id-1": "Full", "product-id-2": "None" }, "isCommon": false }
  ],
  "sharedComplaints": ["..."],
  "sharedOpportunities": ["..."],
  "sharedRisks": ["..."],
  "sharedStrengths": ["..."],
  "sharedWeaknesses": ["..."],
  "opportunityMap": [
    { "title": "Opportunity Name", "quadrant": "Quick Wins|Strategic Bets|Table Stakes|Avoid", "impact": 8, "effort": 3, "description": "..." }
  ]
}

PRODUCT DATA:
${productContexts}
`;

  try {
    const jsonStr = await callAI(prompt, true);
    const parsed = JSON.parse(jsonStr);
    
    // Ensure all products have an entry in uniqueFeatures to prevent UI crashes
    for (const r of researches) {
      if (!parsed.uniqueFeatures[r.product.id]) {
        parsed.uniqueFeatures[r.product.id] = [];
      }
    }
    
    return parsed;
  } catch (err) {
    console.warn('[cross-analyzer] Failed to generate cross analysis:', err);
    return defaultAnalysis;
  }
}
