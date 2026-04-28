import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const feedbackFile = path.join(process.cwd(), 'data', 'feedback.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read existing feedback
function readFeedback() {
  ensureDataDir();
  try {
    if (fs.existsSync(feedbackFile)) {
      const data = fs.readFileSync(feedbackFile, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading feedback:', err);
  }
  return [];
}

// Write feedback
function writeFeedback(feedback: any[]) {
  ensureDataDir();
  fs.writeFileSync(feedbackFile, JSON.stringify(feedback, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const feedback = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...body,
    };

    const allFeedback = readFeedback();
    allFeedback.push(feedback);
    writeFeedback(allFeedback);

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
    const feedback = readFeedback();
    return NextResponse.json(feedback);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}
