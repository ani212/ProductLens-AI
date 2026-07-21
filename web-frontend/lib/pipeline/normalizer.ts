// ═══════════════════════════════════════════════
// Normalizer — cleans, deduplicates, and clusters raw evidence
// ═══════════════════════════════════════════════

import { RawEvidence, ClusteredInsight } from '@/lib/types';
import { callAnalysisAI } from '@/lib/gemini';

export async function normalizeAndCluster(
  evidence: RawEvidence[],
  productName: string,
  type: 'review' | 'discussion'
): Promise<{ raw: RawEvidence[]; clustered: ClusteredInsight[] }> {
  if (!evidence || evidence.length === 0) {
    return { raw: [], clustered: [] };
  }

  // 1. Spam & trash filtering
  const filtered = filterSpam(evidence);

  // 2. Jaccard similarity deduplication
  const cleaned = dedupByJaccard(filtered);

  if (cleaned.length === 0) {
    return { raw: [], clustered: [] };
  }

  // 3. Cluster into themes via Gemini
  const clustered = await clusterWithAI(cleaned, productName, type);

  return { raw: cleaned, clustered };
}

function filterSpam(evidence: RawEvidence[]): RawEvidence[] {
  return evidence.filter(item => {
    const text = item.text;
    if (text.length < 30) return false;
    if ((text.match(/https?:\/\//g) || []).length > 3) return false;
    if (text === '[deleted]' || text === '[removed]') return false;
    return true;
  });
}

function dedupByJaccard(evidence: RawEvidence[]): RawEvidence[] {
  const result: RawEvidence[] = [];
  const keys: string[] = [];

  for (const item of evidence) {
    const key = item.text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
    if (key.length < 10) continue;

    let isDup = false;
    for (const existing of keys) {
      if (jaccardSimilarity(key, existing) > 0.55) {
        isDup = true;
        break;
      }
    }

    if (!isDup) {
      keys.push(key);
      result.push(item);
    }
  }

  return result;
}

function jaccardSimilarity(a: string, b: string): number {
  const wordsA = new Set(a.split(' ').filter(w => w.length > 2));
  const wordsB = new Set(b.split(' ').filter(w => w.length > 2));
  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let intersection = 0;
  for (const w of wordsA) if (wordsB.has(w)) intersection++;
  const union = wordsA.size + wordsB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

async function clusterWithAI(
  evidence: RawEvidence[],
  productName: string,
  type: 'review' | 'discussion'
): Promise<ClusteredInsight[]> {
  const sample = evidence.slice(0, 35);
  const textBlock = sample.map((e, i) =>
    `[Item ${i+1}] Source: ${e.source} | Text: ${e.text.slice(0, 500)}`
  ).join('\n\n');

  const prompt = `
Group the following ${type}s about ${productName} into distinct themes.
Merge similar complaints and praise together.

Return ONLY a valid JSON array:
[
  {
    "theme": "Short descriptive theme name specific to ${productName}",
    "count": 4,
    "sources": ["G2", "Reddit"],
    "sentiment": "positive|negative|mixed",
    "confidence": "High|Medium|Low",
    "representativeQuotes": ["Direct quote from evidence"]
  }
]

EVIDENCE:
${textBlock}
`;

  try {
    const jsonStr = await callAnalysisAI(prompt, true);
    const parsed = JSON.parse(jsonStr);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn(`[normalizer] Failed to cluster ${type}s for ${productName}:`, err);
    return [];
  }
}
