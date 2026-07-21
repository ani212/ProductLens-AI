// ═══════════════════════════════════════════════
// Pricing Extractor — Gemini Grounded Discovery
// Discovers real pricing data from official pages & comparisons
// ═══════════════════════════════════════════════

import { EvidenceBundle, RawEvidence } from '@/lib/types';
import { callResearchAI } from '@/lib/gemini';

export async function fetchPricing(
  productName: string,
  websiteBase: string
): Promise<{ data: string; parsed: EvidenceBundle['extractedPricing']; url: string; evidence: RawEvidence[] }> {
  const defaultParsed: EvidenceBundle['extractedPricing'] = {
    plans: [],
    freeTrialAvailable: false,
    enterprisePricing: ''
  };

  try {
    const prompt = `
Search for official pricing for ${productName} (website: ${websiteBase}).

Find the current pricing tiers, monthly/annual costs, feature limits, free trial availability, and enterprise details.

Return ONLY a valid JSON object:
{
  "pricingPageUrl": "URL of the pricing page",
  "plans": [
    {
      "name": "Plan Name (e.g. Free, Pro, Business, Enterprise)",
      "price": "Price per month/user (e.g. '$10/user/month' or 'Free')",
      "features": ["Key feature 1", "Key feature 2"],
      "limits": "Usage limits"
    }
  ],
  "freeTrialAvailable": true,
  "enterprisePricing": "Enterprise pricing details or 'Contact Sales'"
}

Only include real prices found online. Do NOT invent prices.
Return ONLY the JSON object.`;

    const { text, sources } = await callResearchAI(prompt, true);

    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
      else return { data: '', parsed: defaultParsed, url: '', evidence: [] };
    }

    const pricingUrl = parsed.pricingPageUrl || sources[0]?.url || websiteBase;
    const evidence: RawEvidence[] = [];

    const plans = (parsed.plans || []).map((p: any) => ({
      name: p.name || 'Plan',
      price: p.price || 'Not listed',
      features: Array.isArray(p.features) ? p.features : [],
      limits: p.limits || '',
    }));

    for (const plan of plans) {
      evidence.push({
        text: `${plan.name}: ${plan.price} — ${plan.features.slice(0, 5).join(', ')}`,
        source: `${productName} Pricing`,
        sourceUrl: pricingUrl,
        type: 'pricing',
        confidence: 'High',
      });
    }

    return {
      data: JSON.stringify(parsed, null, 2),
      parsed: {
        plans,
        freeTrialAvailable: Boolean(parsed.freeTrialAvailable),
        enterprisePricing: parsed.enterprisePricing || 'Contact Sales',
      },
      url: pricingUrl,
      evidence
    };

  } catch (err) {
    console.warn(`[pricing] Failed to fetch pricing for ${productName}:`, err);
    return { data: '', parsed: defaultParsed, url: '', evidence: [] };
  }
}
