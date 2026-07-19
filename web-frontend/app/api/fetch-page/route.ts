import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Server-side fetch avoids CORS issues
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'ProductLensAI/2.0 (Research Bot)'
      },
      signal: AbortSignal.timeout(10000)
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Failed to fetch: ${res.status}` }, { status: res.status });
    }

    const html = await res.text();
    
    // Naive text extraction (strip HTML tags, scripts, styles)
    const text = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return NextResponse.json({ 
      content: text.slice(0, 15000), // Cap at ~15k chars for prompt context
      status: 200 
    });

  } catch (err: any) {
    console.error('[fetch-page] Error:', err.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
