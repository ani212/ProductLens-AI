// ═══════════════════════════════════════════════
// AI Provider Helpers (Groq Primary, Gemini Fallback)
// ═══════════════════════════════════════════════

import { getTeardownData, TeardownReport } from './mock-data';
import { runResearchPipeline } from './pipeline/orchestrator';

const GROQ_KEY = process.env.GROQ_API_KEY || '';
const GEMINI_KEY = process.env.GEMINI_API_KEY || '';

/**
 * Primary AI Call - Groq (Llama-3.1-70b-versatile)
 */
export async function callGroq(prompt: string, jsonMode = false): Promise<string> {
  if (!GROQ_KEY) throw new Error('Missing GROQ_API_KEY');

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.1-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2, // Low temp for analytical consistency
      response_format: jsonMode ? { type: 'json_object' } : { type: 'text' }
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Groq API Error: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

/**
 * Secondary AI Call - Gemini Fallback (1.5 Flash)
 */
export async function callGemini(prompt: string, jsonMode = false): Promise<string> {
  if (!GEMINI_KEY) throw new Error('Missing GEMINI_API_KEY');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: jsonMode ? "application/json" : "text/plain",
      }
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini API Error: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

/**
 * Unified AI call with built-in fallback logic
 */
export async function callAI(prompt: string, jsonMode = false): Promise<string> {
  try {
    // Try primary provider first
    return await callGroq(prompt, jsonMode);
  } catch (groqErr) {
    console.warn('[AI] Groq failed, falling back to Gemini...', groqErr);
    try {
      return await callGemini(prompt, jsonMode);
    } catch (geminiErr) {
      console.error('[AI] Both providers failed.', geminiErr);
      throw new Error('All AI providers failed');
    }
  }
}

// ───────────────────────────────────────────────
// LEGACY COMPATIBILITY WRAPPER
// (Kept temporarily until UI components are fully updated to V2Report)
// ───────────────────────────────────────────────

export async function runTeardownAnalysis(
  productsInput: string,
  objective: string,
  persona: string,
  depth: 'quick' | 'deep'
): Promise<{ report: TeardownReport; isMock: boolean; sourcesCount: number }> {
  console.log('[Legacy AI Wrapper] Redirecting request to mock data for backward compatibility while UI upgrades.');
  const mockReport = getTeardownData(productsInput, objective, persona);
  return { report: mockReport, isMock: true, sourcesCount: 20 };
}
