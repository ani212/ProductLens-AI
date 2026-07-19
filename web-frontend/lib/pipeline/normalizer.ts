// ═══════════════════════════════════════════════
// Normalizer — cleans, deduplicates, and clusters raw evidence
// ═══════════════════════════════════════════════

import { RawEvidence, ClusteredInsight } from '@/lib/types';
import { callAI } from '@/lib/gemini';

export async function normalizeAndCluster(
  evidence: RawEvidence[],
  productName: string,
  type: 'review' | 'discussion'
): Promise<{ raw: RawEvidence[]; clustered: ClusteredInsight[] }> {
  if (!evidence || evidence.length === 0) {
    return { raw: [], clustered: [] };
  }

  // 1. Basic Cleaning & Deduplication
  const cleaned = dedupAndClean(evidence);
  
  if (cleaned.length === 0) {
    return { raw: [], clustered: [] };
  }

  // 2. Clustering via AI (chunked to fit context window if needed)
  const clustered = await clusterWithAI(cleaned, productName, type);

  return { raw: cleaned, clustered };
}

function dedupAndClean(evidence: RawEvidence[]): RawEvidence[] {
  const seen = new Set<string>();
  const cleaned: RawEvidence[] = [];

  for (const item of evidence) {
    if (item.text.length < 30) continue; // Filter too short

    // Basic spam filter (excessive links)
    const linkCount = (item.text.match(/https?:\/\//g) || []).length;
    if (linkCount > 3) continue;

    // Deduplication key (first 100 chars, alphanumeric only)
    const key = item.text.slice(0, 100).toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!seen.has(key)) {
      seen.add(key);
      cleaned.push(item);
    }
  }

  return cleaned;
}

async function clusterWithAI(
  evidence: RawEvidence[],
  productName: string,
  type: 'review' | 'discussion'
): Promise<ClusteredInsight[]> {
  // If too many, just take top 30 to avoid massive prompt context
  const sample = evidence.slice(0, 30);
  
  const evidenceText = sample.map((e, i) => 
    `[Item ${i+1}] Source: ${e.source} | Text: ${e.text.slice(0, 500)}`
  ).join('\n\n');

  const prompt = `
You are a qualitative data analyst. Group the following ${type}s about ${productName} into distinct themes.
Merge similar complaints and praise.
Return ONLY a valid JSON array matching this schema exactly, with no markdown formatting:
[
  {
    "theme": "Short descriptive theme name (e.g. 'Confusing UI' or 'Fast Performance')",
    "count": 5,
    "sources": ["Reddit", "G2"],
    "sentiment": "positive", 
    "confidence": "High",
    "representativeQuotes": ["A great quote from the text", "Another good quote"]
  }
]

EVIDENCE:
${evidenceText}
`;

  try {
    const jsonStr = await callAI(prompt, true);
    return JSON.parse(jsonStr);
  } catch (err) {
    console.warn(`[normalizer] Failed to cluster ${type}s for ${productName}:`, err);
    return [];
  }
}
