// ═══════════════════════════════════════════════
// Reviews Aggregator — Real reviews via Gemini Grounded Search
// ═══════════════════════════════════════════════

import { RawEvidence } from '@/lib/types';
import { callResearchAI } from '@/lib/gemini';

export async function fetchReviews(productName: string): Promise<RawEvidence[]> {
  try {
    const prompt = `
Search for real customer reviews of ${productName} on G2, Capterra, Product Hunt, Trustpilot, App Store, Google Play.

Return ONLY a valid JSON array of real reviews found via search:
[
  {
    "text": "Actual review quote or summary",
    "rating": 4,
    "source": "G2",
    "sourceUrl": "https://...",
    "date": "2024-06-15",
    "sentiment": "positive"
  }
]

Return 6 to 15 reviews. Do NOT invent fake reviews.
Return ONLY the JSON array.`;

    const { text, sources } = await callResearchAI(prompt, true);

    let reviews: any[];
    try {
      const parsed = JSON.parse(text);
      reviews = Array.isArray(parsed) ? parsed : [];
    } catch {
      const match = text.match(/\[[\s\S]*\]/);
      if (match) reviews = JSON.parse(match[0]);
      else return [];
    }

    return reviews
      .filter((r: any) => r.text && r.text.length > 20)
      .map((r: any) => ({
        text: r.text.slice(0, 1500),
        source: r.source || 'Review Site',
        sourceUrl: r.sourceUrl || sources[0]?.url || '',
        type: 'review' as const,
        rating: typeof r.rating === 'number' ? r.rating : 4,
        sentiment: r.sentiment === 'positive' || r.sentiment === 'negative' || r.sentiment === 'neutral'
          ? r.sentiment : 'neutral',
        date: r.date || new Date().toISOString().split('T')[0],
        confidence: r.sourceUrl ? ('High' as const) : ('Medium' as const),
      }));

  } catch (err) {
    console.warn(`[reviews] Search failed for ${productName}:`, err);
    return [];
  }
}
