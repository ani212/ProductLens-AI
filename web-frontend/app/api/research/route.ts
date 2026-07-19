import { NextResponse } from 'next/server';
import { runResearchPipeline } from '@/lib/pipeline/orchestrator';
import { ProductInfo } from '@/lib/types';

export const maxDuration = 300; // Allow 5 minutes for the AI pipeline

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { products, persona, industry, objective, depth } = body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: 'Products array is required' }, { status: 400 });
    }

    const competitors = products.map((p: any) => p.name);
    
    // We create a readable stream to send SSE events to the client
    const stream = new ReadableStream({
      async start(controller) {
        const sendEvent = (event: string, data: any) => {
          controller.enqueue(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
        };

        try {
          const report = await runResearchPipeline(
            products,
            persona || 'Startup Product Teams',
            industry || 'Software',
            objective || '',
            competitors,
            (progress) => {
              sendEvent('progress', progress);
            }
          );

          sendEvent('complete', { report });
          controller.close();
        } catch (err: any) {
          console.error('[research-api] Pipeline failed:', err);
          sendEvent('error', { message: err.message || 'Pipeline failed' });
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });

  } catch (err: any) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
