import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const FEEDBACK_KEY = 'nutrition:feedback';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const feedback = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...body,
    };

    const allFeedback = (await kv.get(FEEDBACK_KEY)) || [];
    allFeedback.push(feedback);
    await kv.set(FEEDBACK_KEY, allFeedback);

    return NextResponse.json({ success: true, id: feedback.id });
  } catch (err) {
    console.error('Error submitting feedback:', err);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (authHeader !== `Bearer ${adminPassword}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const feedback = (await kv.get(FEEDBACK_KEY)) || [];
    return NextResponse.json(feedback);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}
