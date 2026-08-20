import { NextResponse } from 'next/server';
import { verifyBrokerageCompliance } from '@/lib/legal-checker';

// Server-side in-memory mock database for dynamic jobs to enforce payment gating
const globalRef = global as any;
if (!globalRef.dynamicJobs) {
  globalRef.dynamicJobs = new Map();
}
const dynamicJobs = globalRef.dynamicJobs;

export async function POST(request: Request) {
  try {
    const job = await request.json();
    if (!job.id) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    // 직업중개자(플랫폼 사업자) 법적 책임 차단을 위한 직업안정법 및 관련 법률 검증
    const legalCheck = verifyBrokerageCompliance({
      title: job.title,
      content: job.content,
      description: job.description,
      location: job.location || job.area,
      contact: job.contact || job.phone,
      pay: job.pay || job.salary,
    });

    const processedJob = {
      ...job,
      approval_status: legalCheck.status, // 'approved', 'pending_legal_review', or 'rejected_illegal'
      brokerage_legal_result: legalCheck,
      updated_at: new Date().toISOString(),
    };

    // Save/Update job on the server
    dynamicJobs.set(String(job.id), processedJob);

    return NextResponse.json({
      success: legalCheck.isApproved,
      job: processedJob,
      message: legalCheck.reason,
      violations: legalCheck.violations,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    // Return all dynamic jobs as an array
    const all = Array.from(dynamicJobs.values());
    return NextResponse.json({ success: true, jobs: all });
  }

  const job = dynamicJobs.get(String(id));
  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, job });
}
