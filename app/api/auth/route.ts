import { NextResponse } from 'next/server';
import { syncLogin, syncRegister } from '@/lib/sheets';
import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'users.json');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
};

function getLocalUsers(): any[] {
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  try {
    const content = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    return [];
  }
}

function saveLocalUsers(users: any[]) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (e) {
    console.error('Failed to save local users file:', e);
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const check = searchParams.get('check');

  if (check === 'config') {
    return NextResponse.json({
      sheetsConnected: !!process.env.GOOGLE_SHEETS_WEBAPP_URL
    }, { headers: CORS_HEADERS });
  }

  return NextResponse.json({ error: 'Invalid query' }, { status: 400, headers: CORS_HEADERS });
}

export async function POST(request: Request) {
  try {
    const { action, identifier, passwordHash } = await request.json();

    if (!identifier || !passwordHash) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400, headers: CORS_HEADERS });
    }

    const hasSheets = !!process.env.GOOGLE_SHEETS_WEBAPP_URL;

    if (action === 'register') {
      if (hasSheets) {
        const result = await syncRegister(identifier, passwordHash);
        if (result.error) {
          return NextResponse.json({ error: result.error }, { status: 400, headers: CORS_HEADERS });
        }
        return NextResponse.json(result, { headers: CORS_HEADERS });
      } else {
        // Fallback local file registration
        const users = getLocalUsers();
        if (users.some(u => u.identifier === identifier)) {
          return NextResponse.json({ error: 'User identifier already registered' }, { status: 400, headers: CORS_HEADERS });
        }
        
        const userId = 'usr_' + Math.random().toString(36).substr(2, 9);
        const newUser = { userId, identifier, passwordHash, createdAt: new Date().toISOString() };
        users.push(newUser);
        saveLocalUsers(users);

        return NextResponse.json({ success: true, userId, identifier }, { headers: CORS_HEADERS });
      }
    } else if (action === 'login') {
      if (hasSheets) {
        const result = await syncLogin(identifier, passwordHash);
        if (result.error) {
          return NextResponse.json({ error: result.error }, { status: 400, headers: CORS_HEADERS });
        }
        return NextResponse.json(result, { headers: CORS_HEADERS });
      } else {
        // Fallback local file login
        const users = getLocalUsers();
        const matched = users.find(u => u.identifier === identifier);
        
        if (!matched) {
          return NextResponse.json({ error: 'User not found' }, { status: 400, headers: CORS_HEADERS });
        }

        if (matched.passwordHash !== passwordHash) {
          return NextResponse.json({ error: 'Incorrect password' }, { status: 400, headers: CORS_HEADERS });
        }

        return NextResponse.json({ success: true, userId: matched.userId, identifier: matched.identifier }, { headers: CORS_HEADERS });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400, headers: CORS_HEADERS });
  } catch (error: any) {
    console.error('Auth API error:', error);
    return NextResponse.json({ error: error.message || 'Authentication error' }, { status: 500, headers: CORS_HEADERS });
  }
}
