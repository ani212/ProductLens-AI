import { NextResponse } from 'next/server';
import { resolveProducts } from '@/lib/mock-data';

export async function POST(request: Request) {
  try {
    const { productsInput } = await request.json();
    if (!productsInput || typeof productsInput !== 'string') {
      return NextResponse.json(
        { error: 'Invalid products input' },
        { status: 400 }
      );
    }

    const resolved = resolveProducts(productsInput);
    return NextResponse.json({ products: resolved });
  } catch (error: any) {
    console.error('Resolution API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to resolve products' },
      { status: 500 }
    );
  }
}
