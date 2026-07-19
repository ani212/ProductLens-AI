const SHEETS_URL = process.env.GOOGLE_SHEETS_WEBAPP_URL || '';

async function postToSheet(payload: any) {
  if (!SHEETS_URL) {
    return { error: 'No Google Sheets URL configured' };
  }

  try {
    const res = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Google Sheet responded with status ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.error('Google Sheets sync error:', err);
    return { error: err.message || 'Sync connection timeout' };
  }
}

export async function syncRegister(identifier: string, passwordHash: string) {
  return await postToSheet({
    action: 'register',
    identifier,
    password: passwordHash
  });
}

export async function syncLogin(identifier: string, passwordHash: string) {
  return await postToSheet({
    action: 'login',
    identifier,
    password: passwordHash
  });
}

export async function syncAddHistory(
  userId: string,
  products: string,
  persona: string,
  objective: string
) {
  return await postToSheet({
    action: 'addHistory',
    userId,
    products,
    persona,
    objective
  });
}

export async function syncToggleFavorite(
  userId: string,
  products: string,
  persona: string,
  objective: string,
  isFavorite: boolean
) {
  return await postToSheet({
    action: 'toggleFavorite',
    userId,
    products,
    persona,
    objective,
    isFavorite
  });
}

export async function syncGetData(userId: string) {
  return await postToSheet({
    action: 'getData',
    userId
  });
}
