import { NextResponse } from 'next/server';
import { syncAddHistory, syncToggleFavorite, syncGetData } from '@/lib/sheets';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    const hasSheets = !!process.env.GOOGLE_SHEETS_WEBAPP_URL;
    if (!hasSheets) {
      return NextResponse.json({ sheetsConnected: false });
    }

    const data = await syncGetData(userId);
    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    return NextResponse.json({
      sheetsConnected: true,
      history: data.history || [],
      favorites: data.favorites || []
    });
  } catch (error: any) {
    console.error('Fetch user data API error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch user data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { action, userId, products, persona, objective, isFavorite } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    const hasSheets = !!process.env.GOOGLE_SHEETS_WEBAPP_URL;
    if (!hasSheets) {
      return NextResponse.json({ sheetsConnected: false });
    }

    let result: any = {};

    if (action === 'addHistory') {
      result = await syncAddHistory(userId, products, persona, objective);
    } else if (action === 'toggleFavorite') {
      result = await syncToggleFavorite(userId, products, persona, objective, !!isFavorite);
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, sheetsConnected: true });
  } catch (error: any) {
    console.error('Sync API POST error:', error);
    return NextResponse.json({ error: error.message || 'Sync error' }, { status: 500 });
  }
}
