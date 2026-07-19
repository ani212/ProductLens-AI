import { NextResponse } from 'next/server';
import { syncAddHistory, syncToggleFavorite, syncGetData } from '@/lib/sheets';

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400, headers: CORS_HEADERS });
    }

    const hasSheets = !!process.env.GOOGLE_SHEETS_WEBAPP_URL;
    if (!hasSheets) {
      return NextResponse.json({ sheetsConnected: false }, { headers: CORS_HEADERS });
    }

    const data = await syncGetData(userId);
    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400, headers: CORS_HEADERS });
    }

    return NextResponse.json({
      sheetsConnected: true,
      history: data.history || [],
      favorites: data.favorites || []
    }, { headers: CORS_HEADERS });
  } catch (error: any) {
    console.error('Fetch user data API error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch user data' }, { status: 550, headers: CORS_HEADERS });
  }
}

export async function POST(request: Request) {
  try {
    const { action, userId, products, persona, objective, isFavorite } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400, headers: CORS_HEADERS });
    }

    const hasSheets = !!process.env.GOOGLE_SHEETS_WEBAPP_URL;
    if (!hasSheets) {
      return NextResponse.json({ sheetsConnected: false }, { headers: CORS_HEADERS });
    }

    let result: any = {};

    if (action === 'addHistory') {
      result = await syncAddHistory(userId, products, persona, objective);
    } else if (action === 'toggleFavorite') {
      result = await syncToggleFavorite(userId, products, persona, objective, !!isFavorite);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400, headers: CORS_HEADERS });
    }

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400, headers: CORS_HEADERS });
    }

    return NextResponse.json({ success: true, sheetsConnected: true }, { headers: CORS_HEADERS });
  } catch (error: any) {
    console.error('Sync API POST error:', error);
    return NextResponse.json({ error: error.message || 'Sync error' }, { status: 550, headers: CORS_HEADERS });
  }
}
