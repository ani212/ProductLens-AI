// ═══════════════════════════════════════════════
// Reddit Source Collector — Public JSON API client
// ═══════════════════════════════════════════════

import { RawEvidence } from '@/lib/types';

const REDDIT_BASE = 'https://www.reddit.com';
const MAX_POSTS = 15;
const MAX_COMMENTS_PER_POST = 5;
const MIN_UPVOTES = 3;
const MIN_TEXT_LENGTH = 50;

const SUBREDDITS_BY_CATEGORY: Record<string, string[]> = {
  saas: ['SaaS', 'startups', 'productivity', 'projectmanagement', 'Entrepreneur'],
  devtools: ['programming', 'webdev', 'devops', 'selfhosted', 'coding'],
  ai: ['artificial', 'MachineLearning', 'ChatGPT', 'LocalLLaMA'],
  general: ['technology', 'software', 'apps'],
};

/**
 * Fetches Reddit discussions for a product using public JSON endpoints.
 * No authentication required.
 */
export async function fetchRedditDiscussions(
  productName: string,
  category: string = 'saas'
): Promise<RawEvidence[]> {
  const allEvidence: RawEvidence[] = [];

  try {
    // 1. Global search
    const globalResults = await searchReddit(productName);
    allEvidence.push(...globalResults);

    // 2. Subreddit-specific searches
    const subreddits = SUBREDDITS_BY_CATEGORY[category] || SUBREDDITS_BY_CATEGORY.general;
    const subredditPromises = subreddits.slice(0, 3).map(sub =>
      searchRedditSubreddit(productName, sub)
    );

    const subredditResults = await Promise.allSettled(subredditPromises);
    for (const result of subredditResults) {
      if (result.status === 'fulfilled') {
        allEvidence.push(...result.value);
      }
    }

    // Deduplicate by text content
    const seen = new Set<string>();
    return allEvidence.filter(e => {
      const key = e.text.slice(0, 100).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  } catch (err) {
    console.warn(`[reddit] Failed to fetch discussions for ${productName}:`, err);
    return [];
  }
}

async function searchReddit(query: string): Promise<RawEvidence[]> {
  try {
    const url = `${REDDIT_BASE}/search.json?q=${encodeURIComponent(query)}&sort=relevance&limit=${MAX_POSTS}&type=link`;
    const res = await fetchWithRetry(url);
    if (!res.ok) return [];

    const data = await res.json();
    return extractPostsFromListing(data);
  } catch {
    return [];
  }
}

async function searchRedditSubreddit(query: string, subreddit: string): Promise<RawEvidence[]> {
  try {
    const url = `${REDDIT_BASE}/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&restrict_sr=on&sort=relevance&limit=10`;
    const res = await fetchWithRetry(url);
    if (!res.ok) return [];

    const data = await res.json();
    return extractPostsFromListing(data);
  } catch {
    return [];
  }
}

function extractPostsFromListing(data: any): RawEvidence[] {
  const evidence: RawEvidence[] = [];

  if (!data?.data?.children) return evidence;

  for (const child of data.data.children) {
    const post = child?.data;
    if (!post) continue;

    // Filter: skip low-quality posts
    if (post.ups < MIN_UPVOTES) continue;
    if (post.removed_by_category) continue;
    if (post.is_self === false && !post.selftext) continue;

    const text = post.selftext || post.title || '';
    if (text.length < MIN_TEXT_LENGTH) {
      // Even if selftext is short, the title might be useful with context
      if (post.title && post.title.length >= 30) {
        evidence.push({
          text: post.title,
          source: 'Reddit',
          sourceUrl: `${REDDIT_BASE}${post.permalink}`,
          type: 'discussion',
          date: new Date(post.created_utc * 1000).toISOString().split('T')[0],
          upvotes: post.ups,
          sentiment: inferSentiment(post.title),
        });
      }
      continue;
    }

    evidence.push({
      text: truncateText(text, 1500),
      source: 'Reddit',
      sourceUrl: `${REDDIT_BASE}${post.permalink}`,
      type: 'discussion',
      date: new Date(post.created_utc * 1000).toISOString().split('T')[0],
      upvotes: post.ups,
      sentiment: inferSentiment(text),
    });
  }

  return evidence;
}

/**
 * Simple keyword-based sentiment inference for Reddit posts.
 */
function inferSentiment(text: string): 'positive' | 'negative' | 'neutral' {
  const lower = text.toLowerCase();
  const positiveWords = ['love', 'great', 'amazing', 'best', 'awesome', 'excellent', 'perfect', 'fantastic', 'recommend', 'impressed', 'intuitive', 'smooth'];
  const negativeWords = ['hate', 'terrible', 'awful', 'worst', 'broken', 'frustrating', 'annoying', 'slow', 'buggy', 'expensive', 'confusing', 'disappointed', 'switching from', 'left', 'moved away'];

  let posScore = 0;
  let negScore = 0;

  for (const w of positiveWords) if (lower.includes(w)) posScore++;
  for (const w of negativeWords) if (lower.includes(w)) negScore++;

  if (posScore > negScore) return 'positive';
  if (negScore > posScore) return 'negative';
  return 'neutral';
}

function truncateText(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen) + '...';
}

/**
 * Fetch with exponential backoff for Reddit rate limiting.
 */
async function fetchWithRetry(url: string, retries = 2): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'ProductLensAI/2.0 (Research Tool)',
        },
        signal: AbortSignal.timeout(10000),
      });

      if (res.status === 429 && i < retries) {
        // Rate limited — exponential backoff
        const delay = Math.pow(2, i + 1) * 1000;
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      return res;
    } catch (err) {
      if (i === retries) throw err;
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  throw new Error('Max retries reached');
}
