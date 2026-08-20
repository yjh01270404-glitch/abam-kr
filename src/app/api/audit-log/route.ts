import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Audit log successfully received and processed
    return NextResponse.json({ success: true, timestamp: new Date().toISOString(), log: body });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid audit log payload' }, { status: 400 });
  }
}
