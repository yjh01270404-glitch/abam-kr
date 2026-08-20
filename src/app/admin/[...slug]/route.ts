import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.redirect(new URL('/abam-nightman-2026', req.url), 307);
}

export async function POST(req: NextRequest) {
  return NextResponse.redirect(new URL('/abam-nightman-2026', req.url), 307);
}
