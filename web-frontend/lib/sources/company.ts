// ═══════════════════════════════════════════════
// Company Intelligence Extractor — Gemini Grounded Research
// ═══════════════════════════════════════════════

import { RawEvidence } from '@/lib/types';
import { callResearchAI } from '@/lib/gemini';

export async function fetchCompanyInfo(
  productName: string,
  websiteBase: string
): Promise<{ companyIntel: any; employeeIntel: any; evidence: RawEvidence[] }> {
  try {
    const prompt = `
Search for company information and employee feedback about the maker of ${productName} (${websiteBase}).

Find: employee headcount, headquarters, funding, hiring signals, engineering & product culture.

Return ONLY a valid JSON object:
{
  "companyIntel": {
    "size": "Estimated employee count (e.g. '500-1000')",
    "headquarters": "City, Country",
    "industry": "Software",
    "growthSignals": ["Growth signal 1", "Growth signal 2"],
    "hiringTrends": "Hiring summary",
    "openPMRoles": 2,
    "engineeringHiring": "Engineering hiring summary",
    "recentUpdates": ["Recent news 1"]
  },
  "employeeIntel": {
    "leadership": "Leadership summary",
    "engineeringCulture": "Engineering culture",
    "productCulture": "Product culture",
    "pros": ["Pro 1"],
    "cons": ["Con 1"],
    "workLifeBalance": "Good"
  }
}

Return ONLY the JSON object.`;

    const { text, sources } = await callResearchAI(prompt, true);

    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
      else return { companyIntel: null, employeeIntel: null, evidence: [] };
    }

    const evidence: RawEvidence[] = sources.map(s => ({
      text: `Company info: ${s.title}`,
      source: `${productName} Company`,
      sourceUrl: s.url,
      type: 'company_info' as const,
      confidence: 'High' as const,
    }));

    return {
      companyIntel: parsed.companyIntel || null,
      employeeIntel: parsed.employeeIntel || null,
      evidence
    };

  } catch (err) {
    console.warn(`[company] Failed to fetch info for ${productName}:`, err);
    return { companyIntel: null, employeeIntel: null, evidence: [] };
  }
}
