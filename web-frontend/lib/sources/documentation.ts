// ═══════════════════════════════════════════════
// Documentation Extractor — Gemini Grounded Discovery
// Discovers and extracts features from real product documentation
// ═══════════════════════════════════════════════

import { RawEvidence } from '@/lib/types';
import { callResearchAI } from '@/lib/gemini';

export async function fetchDocumentation(
  productName: string,
  websiteBase: string
): Promise<{ evidence: RawEvidence[]; features: string[]; docsUrl: string }> {
  try {
    const prompt = `
Search for official ${productName} (${websiteBase}) documentation, help centers, API docs, and feature overviews.

Find: core capabilities, API/integrations, security/compliance standards, enterprise administration features, and recent release notes.

Return ONLY a valid JSON object:
{
  "docsUrl": "URL of the main documentation page found",
  "documentationExtracts": [
    "Extract 1: Specific feature/capability description from docs",
    "Extract 2: Another specific detail from official docs"
  ],
  "features": [
    "Feature Name 1",
    "Feature Name 2"
  ]
}

RULES:
- Only include information actually found in official documentation or product pages.
- Do NOT invent features.
- Include 8-20 specific features.
Return ONLY the JSON object.`;

    const { text, sources } = await callResearchAI(prompt, true);

    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
      else return { evidence: [], features: [], docsUrl: '' };
    }

    const evidence: RawEvidence[] = [];
    const docsUrl = parsed.docsUrl || sources[0]?.url || websiteBase;

    const extracts: string[] = parsed.documentationExtracts || [];
    for (const extract of extracts) {
      if (extract && extract.length > 20) {
        evidence.push({
          text: extract,
          source: `${productName} Documentation`,
          sourceUrl: docsUrl,
          type: 'documentation',
          confidence: sources.length > 0 ? 'High' : 'Medium',
        });
      }
    }

    for (const gs of sources) {
      if (gs.url && !evidence.some(e => e.sourceUrl === gs.url)) {
        evidence.push({
          text: `Source: ${gs.title}`,
          source: `${productName} Official`,
          sourceUrl: gs.url,
          type: 'documentation',
          confidence: 'High',
        });
      }
    }

    const features: string[] = (parsed.features || []).filter((f: string) => f && f.length > 2);

    return { evidence, features, docsUrl };
  } catch (err) {
    console.warn(`[documentation] Search failed for ${productName}:`, err);
    return { evidence: [], features: [], docsUrl: '' };
  }
}
