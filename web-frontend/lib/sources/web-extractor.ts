// ═══════════════════════════════════════════════
// Web Extractor — fetches public page text via server proxy
// ═══════════════════════════════════════════════

import { RawEvidence } from '@/lib/types';

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
      return '';
    }

    const data = await res.json();
    return data.content || '';
  } catch (err) {
    return '';
  }
}

export function guessProductUrls(productName: string, websiteBase: string): {
  homepage: string;
  docs: string[];
  pricing: string[];
  about: string[];
  careers: string[];
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
    ],
    pricing: [
      `${base}/pricing`,
      `${base}/plans`,
      `${base}/enterprise`,
    ],
    about: [
      `${base}/about`,
      `${base}/company`,
    ],
    careers: [
      `${base}/careers`,
      `${base}/jobs`,
    ],
  };
}

export function contentToEvidence(
  content: string,
  source: string,
  sourceUrl: string,
  type: RawEvidence['type']
): RawEvidence[] {
  if (!content || content.length < 50) return [];

  const paragraphs = content
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(p => p.length >= 50 && p.length <= 2000);

  return paragraphs.slice(0, 20).map(text => ({
    text,
    source,
    sourceUrl,
    type,
  }));
}
