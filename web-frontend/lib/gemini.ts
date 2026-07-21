// ═══════════════════════════════════════════════
// ProductLens AI — Gemini AI Provider
// Uses Gemini 2.0 Flash with Google Search Grounding
// Protected with rate limiting and exponential backoff retries
// ═══════════════════════════════════════════════

import { getTeardownData, TeardownReport } from './mock-data';

const GEMINI_KEY = process.env.GEMINI_API_KEY || '';

// Rate limiting: queue requests to avoid hitting free-tier limits
let lastRequestTime = 0;
const MIN_REQUEST_GAP_MS = 1500; // 1.5s gap between calls

async function rateLimitedWait(): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < MIN_REQUEST_GAP_MS) {
    await new Promise(r => setTimeout(r, MIN_REQUEST_GAP_MS - elapsed));
  }
  lastRequestTime = Date.now();
}

/**
 * Retry wrapper with exponential backoff for 429 rate limit errors.
 */
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      await rateLimitedWait();
      return await fn();
    } catch (error: any) {
      const isRateLimit = error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED');
      if (isRateLimit && attempt < maxRetries) {
        const delay = Math.pow(2, attempt + 1) * 2000; // 4s, 8s, 16s
        console.warn(`[AI] Rate limited, retrying in ${delay / 1000}s (attempt ${attempt + 1}/${maxRetries})...`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}

// ───────────────────────────────────────────────
// GEMINI GROUNDED — Research with Google Search
// ───────────────────────────────────────────────

export async function callGeminiGrounded(
  prompt: string,
  jsonMode = false
): Promise<{ text: string; sources: { title: string; url: string }[] }> {
  if (!GEMINI_KEY) throw new Error('Missing GEMINI_API_KEY');

  return withRetry(async () => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(60000),
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        tools: [{ google_search: {} }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 8192,
          responseMimeType: jsonMode ? 'application/json' : 'text/plain',
        }
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Gemini Grounded API Error: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text || '';

    const sources: { title: string; url: string }[] = [];
    const groundingMeta = candidate?.groundingMetadata;
    if (groundingMeta?.groundingChunks) {
      for (const chunk of groundingMeta.groundingChunks) {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || 'Web Source',
            url: chunk.web.uri || ''
          });
        }
      }
    }

    return { text, sources };
  });
}

// ───────────────────────────────────────────────
// GEMINI STANDARD — Analysis from evidence
// ───────────────────────────────────────────────

export async function callGemini(prompt: string, jsonMode = false): Promise<string> {
  if (!GEMINI_KEY) throw new Error('Missing GEMINI_API_KEY');

  return withRetry(async () => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(90000),
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        systemInstruction: {
          parts: [{
            text: 'You are a Senior Product Analyst helping Product Managers make data-driven decisions. You ONLY analyze evidence provided to you. You NEVER invent data, features, pricing, or reviews. If evidence is insufficient, say so. Every claim must be traceable to evidence.'
          }]
        },
        generationConfig: {
          temperature: 0.15,
          maxOutputTokens: 8192,
          responseMimeType: jsonMode ? 'application/json' : 'text/plain',
        }
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Gemini API Error: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  });
}

// ───────────────────────────────────────────────
// UNIFIED DISPATCH
// ───────────────────────────────────────────────

export async function callResearchAI(
  prompt: string,
  jsonMode = false
): Promise<{ text: string; sources: { title: string; url: string }[] }> {
  return callGeminiGrounded(prompt, jsonMode);
}

export async function callAnalysisAI(prompt: string, jsonMode = false): Promise<string> {
  return callGemini(prompt, jsonMode);
}

export async function callAI(prompt: string, jsonMode = false): Promise<string> {
  return callGemini(prompt, jsonMode);
}

// ───────────────────────────────────────────────
// LEGACY COMPATIBILITY WRAPPER
// ───────────────────────────────────────────────

export async function runTeardownAnalysis(
  productsInput: string,
  objective: string,
  persona: string,
  depth: 'quick' | 'deep'
): Promise<{ report: TeardownReport; isMock: boolean; sourcesCount: number }> {
  console.log('[Legacy AI Wrapper] Redirecting to mock data for backward compat.');
  const mockReport = getTeardownData(productsInput, objective, persona);
  return { report: mockReport, isMock: true, sourcesCount: 20 };
}
