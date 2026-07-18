import { NextResponse } from 'next/server';
import { runTeardownAnalysis } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { productsInput, objective, persona, depth } = await request.json();

    if (!productsInput || typeof productsInput !== 'string') {
      return NextResponse.json(
        { error: 'Invalid products input' },
        { status: 400 }
      );
    }

    const result = await runTeardownAnalysis(
      productsInput,
      objective || '',
      persona || '',
      depth || 'deep'
    );

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Teardown API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate teardown report' },
      { status: 500 }
    );
  }
}
