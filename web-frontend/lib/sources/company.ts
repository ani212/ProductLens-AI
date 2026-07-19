// ═══════════════════════════════════════════════
// Company Intelligence Extractor
// ═══════════════════════════════════════════════

import { fetchFirstSuccessful, guessProductUrls } from './web-extractor';
import { callAI } from '@/lib/gemini';

export async function fetchCompanyInfo(
  productName: string,
  websiteBase: string
): Promise<any> {
  const urls = guessProductUrls(productName, websiteBase);
  const defaultInfo = {
    size: 'Unknown', headquarters: 'Unknown', industry: 'Software',
    growthSignals: [], hiringTrends: 'Unknown', openPMRoles: 0,
    engineeringHiring: 'Unknown', expansion: 'Unknown',
    recentUpdates: [], techIndicators: [], investmentSignals: []
  };

  try {
    // Try to get info from About or Careers pages
    const result = await fetchFirstSuccessful([...urls.about, ...urls.careers]);
    
    if (!result.content) {
      return defaultInfo;
    }

    const prompt = `
Extract company intelligence for ${productName} based ONLY on this text.
Return ONLY a valid JSON object matching this schema exactly, with no markdown formatting:
{
  "size": "Estimated employee count (e.g. '500-1000' or 'Unknown')",
  "headquarters": "Location",
  "industry": "Primary industry",
  "growthSignals": ["Signal 1", "Signal 2"],
  "hiringTrends": "Brief summary of hiring",
  "openPMRoles": 0,
  "engineeringHiring": "Brief summary",
  "expansion": "Brief summary",
  "recentUpdates": ["Update 1"],
  "techIndicators": ["Tech 1"],
  "investmentSignals": ["Signal 1"]
}

PAGE CONTENT:
${result.content}
`;

    const jsonStr = await callAI(prompt, true);
    
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      return defaultInfo;
    }

  } catch (err) {
    console.warn(`[company] Failed to fetch company info for ${productName}:`, err);
    return defaultInfo;
  }
}
