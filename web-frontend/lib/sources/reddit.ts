// ═══════════════════════════════════════════════
// Reddit Source Collector — Public JSON API client
// ═══════════════════════════════════════════════

import { RawEvidence } from '@/lib/types';

const REDDIT_BASE = 'https://www.reddit.com';
const MAX_POSTS = 20;

export async function fetchRedditDiscussions(
  productName: string,
  category: string = 'saas'
): Promise<RawEvidence[]> {
  try {
    const url = `${REDDIT_BASE}/search.json?q=${encodeURIComponent(productName)}&sort=relevance&limit=${MAX_POSTS}&type=link`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'ProductLensAI/1.0 (Research Agent)' },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) return [];

    const data = await res.json();
    const children = data?.data?.children || [];
    const evidence: RawEvidence[] = [];

    for (const child of children) {
      const post = child?.data;
      if (!post || post.ups < 2) continue;

      const text = post.selftext || post.title || '';
      if (text.length < 40) continue;

      evidence.push({
        text: text.slice(0, 1500),
        source: `Reddit (r/${post.subreddit || 'all'})`,
        sourceUrl: `${REDDIT_BASE}${post.permalink}`,
        type: 'discussion',
        date: new Date(post.created_utc * 1000).toISOString().split('T')[0],
        upvotes: post.ups,
        sentiment: inferSentiment(text),
      });
    }

    return evidence;
  } catch (err) {
    console.warn(`[reddit] Failed to fetch discussions for ${productName}:`, err);
    return [];
  }
}

function inferSentiment(text: string): 'positive' | 'negative' | 'neutral' {
  const lower = text.toLowerCase();
  const positive = ['love', 'great', 'amazing', 'best', 'awesome', 'intuitive', 'fast'];
  const negative = ['hate', 'terrible', 'awful', 'slow', 'buggy', 'expensive', 'frustrating', 'switching from'];

  let pos = 0, neg = 0;
  for (const w of positive) if (lower.includes(w)) pos++;
  for (const w of negative) if (lower.includes(w)) neg++;

  if (pos > neg) return 'positive';
  if (neg > pos) return 'negative';
  return 'neutral';
}
