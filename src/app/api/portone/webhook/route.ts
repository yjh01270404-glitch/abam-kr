import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imp_uid, merchant_uid, status } = body;

    console.log(`[PortOne Webhook Received] imp_uid: ${imp_uid}, merchant_uid: ${merchant_uid}, status: ${status}`);

    return NextResponse.json({
      status: 'ok',
      message: 'PortOne webhook processed successfully',
      imp_uid,
      merchant_uid,
      received_status: status,
      processed_at: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Webhook processing failed' },
      { status: 400 }
    );
  }
}
