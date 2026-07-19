import { NextResponse } from 'next/server';
import { runTeardownAnalysis } from '@/lib/gemini';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

export async function POST(request: Request) {
  try {
    const { productsInput, objective, persona, depth } = await request.json();

    if (!productsInput || typeof productsInput !== 'string') {
      return NextResponse.json(
        { error: 'Invalid products input' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const result = await runTeardownAnalysis(
      productsInput,
      objective || '',
      persona || '',
      depth || 'deep'
    );

    return NextResponse.json(result, { headers: CORS_HEADERS });
  } catch (error: any) {
    console.error('Teardown API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate teardown report' },
      { status: 550, headers: CORS_HEADERS }
    );
  }
}
