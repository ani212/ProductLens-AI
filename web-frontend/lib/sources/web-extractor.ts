// ═══════════════════════════════════════════════
// Web Extractor — fetches public page text via server proxy
// ═══════════════════════════════════════════════

import { RawEvidence } from '@/lib/types';

/**
 * Fetches a public URL through the server-side proxy and returns extracted text.
 * Strips HTML, scripts, styles, and boilerplate.
 */
export async function fetchPageContent(url: string): Promise<string> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    const res = await fetch(`${backendUrl}/api/fetch-page`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      console.warn(`[web-extractor] Failed to fetch ${url}: ${res.status}`);
      return '';
    }

    const data = await res.json();
    return data.content || '';
  } catch (err) {
    console.warn(`[web-extractor] Error fetching ${url}:`, err);
    return '';
  }
}

/**
 * Discovers the official website for a product.
 * Tries common URL patterns.
 */
export function guessProductUrls(productName: string, websiteBase: string): {
  homepage: string;
  docs: string[];
  pricing: string[];
  about: string[];
  careers: string[];
  changelog: string[];
  security: string[];
  enterprise: string[];
  api: string[];
} {
  const base = websiteBase.replace(/\/$/, '');
  const clean = productName.toLowerCase().replace(/[^a-z0-9]/g, '');

  return {
    homepage: base,
    docs: [
      `https://docs.${clean}.com`,
      `${base}/docs`,
      `${base}/documentation`,
      `https://help.${clean}.com`,
      `${base}/help`,
    ],
    pricing: [
      `${base}/pricing`,
      `${base}/plans`,
      `${base}/compare-plans`,
      `${base}/enterprise`,
    ],
    about: [
      `${base}/about`,
      `${base}/about-us`,
      `${base}/company`,
    ],
    careers: [
      `${base}/careers`,
      `${base}/jobs`,
    ],
    changelog: [
      `${base}/changelog`,
      `${base}/releases`,
      `${base}/whats-new`,
      `${base}/updates`,
    ],
    security: [
      `${base}/security`,
      `${base}/trust`,
      `${base}/compliance`,
    ],
    enterprise: [
      `${base}/enterprise`,
      `${base}/business`,
      `${base}/teams`,
    ],
    api: [
      `${base}/api`,
      `${base}/developers`,
      `https://api.${clean}.com`,
    ],
  };
}

/**
 * Fetches multiple URLs in parallel, returning the first successful result.
 * Used for discovering which URL pattern works for docs, pricing, etc.
 */
export async function fetchFirstSuccessful(urls: string[]): Promise<{ content: string; url: string }> {
  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const content = await fetchPageContent(url);
      if (content && content.length > 100) {
        return { content, url };
      }
      throw new Error(`No meaningful content at ${url}`);
    })
  );

  for (const result of results) {
    if (result.status === 'fulfilled') {
      return result.value;
    }
  }

  return { content: '', url: '' };
}

/**
 * Converts raw web page content into RawEvidence items.
 */
export function contentToEvidence(
  content: string,
  source: string,
  sourceUrl: string,
  type: RawEvidence['type']
): RawEvidence[] {
  if (!content || content.length < 50) return [];

  // Split into meaningful paragraphs (at least 50 chars each)
  const paragraphs = content
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(p => p.length >= 50 && p.length <= 2000);

  return paragraphs.slice(0, 30).map(text => ({
    text,
    source,
    sourceUrl,
    type,
  }));
}
