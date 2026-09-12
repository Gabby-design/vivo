import { NextResponse } from 'next/server';

const ADMIN_PIN = process.env.ADMIN_PIN || '1234';

export async function POST(request) {
  try {
    const { pin } = await request.json();

    if (String(pin).trim() === ADMIN_PIN) {
      return NextResponse.json(
        {
          success: true,
          message: 'Authenticated successfully',
          token: 'vivo_admin_session_auth_token_9823',
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid Security PIN. Default PIN is 1234.',
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Authentication error' }, { status: 500 });
  }
}
