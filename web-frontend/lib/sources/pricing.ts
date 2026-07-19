// ═══════════════════════════════════════════════
// Pricing Extractor — discovers and parses pricing pages
// ═══════════════════════════════════════════════

import { EvidenceBundle } from '@/lib/types';
import { fetchFirstSuccessful, guessProductUrls } from './web-extractor';
import { callAI } from '@/lib/gemini';

export async function fetchPricing(
  productName: string,
  websiteBase: string
): Promise<{ data: string; parsed: EvidenceBundle['extractedPricing']; url: string }> {
  const urls = guessProductUrls(productName, websiteBase);
  const defaultParsed = { plans: [], freeTrialAvailable: false, enterprisePricing: '' };

  try {
    const result = await fetchFirstSuccessful(urls.pricing);
    if (!result.content) {
      return { data: '', parsed: defaultParsed, url: '' };
    }

    // Use AI to extract structured pricing data from the raw text
    const prompt = `
Extract pricing tiers from this page content for ${productName}.
Return ONLY a valid JSON object matching this schema exactly, with no markdown formatting or other text:
{
  "plans": [
    { "name": "Plan Name", "price": "Price per month/user", "features": ["feature 1", "feature 2"], "limits": "Any usage limits" }
  ],
  "freeTrialAvailable": boolean,
  "enterprisePricing": "Details about enterprise plan or 'Contact Sales'"
}

PAGE CONTENT:
${result.content}
`;

    const jsonStr = await callAI(prompt, true);
    
    let parsed = defaultParsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (parseErr) {
      console.warn(`[pricing] Failed to parse pricing JSON for ${productName}:`, parseErr);
    }

    return {
      data: result.content,
      parsed,
      url: result.url
    };

  } catch (err) {
    console.warn(`[pricing] Failed to fetch pricing for ${productName}:`, err);
    return { data: '', parsed: defaultParsed, url: '' };
  }
}
