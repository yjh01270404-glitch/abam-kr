const fs = require('fs');
const path = require('path');
const { GET } = require('../src/app/api/detail-image/[jobId]/route.tsx');

// Pre-populate global server jobs
const globalRef = global;
globalRef.dynamicJobs = globalRef.dynamicJobs || new Map();

const dummyJobBase = {
  companyName: '강남 에이스',
  title: '가족같은 분위기 최고 대우 보장',
  description: '최고의 시설과 검증된 안전을 자랑하는 업소입니다. 주간/야간/파트타임 모두 환영하며 초보자 맞춤 안내 해 드립니다.',
  qna: [
    { question: 'Q. 일급 지급 방식이 어떻게 되나요?', answer: 'A. 퇴근 직후 당일 정산하여 전액 지급해 드립니다.' },
    { question: 'Q. 근무 요일은 선택 가능한가요?', answer: 'A. 네, 본인이 원하는 요일만 사전에 체크해주시면 맞춤 조정해 드립니다.' },
    { question: 'Q. 복장이 따로 정해져 있나요?', answer: 'A. 본인에게 가장 잘 어울리는 편한 사복 스타일로 출근하시면 됩니다.' }
  ],
  location: '서울 강남구 역삼동 789',
  pay: '일급 300,000원',
  workHours: '오후 7시 ~ 오전 3시',
  requirements: '만 20세 이상 성인 여성',
  contactPhone: '010-1234-5678',
  contactKakao: 'acevip77',
  welfare: '만근 수당 추가 지원 및 최고급 대기실 제공',
  atmosphere: '텃세와 진상 없는 매너 있고 따뜻한 분위기',
  prMessage: '친동생이라 생각하고 실장이 하나하나 정성스럽게 챙겨드립니다.',
  highlightSentence: '초보자도 첫날부터 100% 안심하고 근무할 수 있도록 보장합니다!'
};

globalRef.dynamicJobs.set('dynamic-unpaid-test', {
  ...dummyJobBase,
  id: 'dynamic-unpaid-test',
  payment_status: 'unpaid',
  approval_status: 'draft'
});

globalRef.dynamicJobs.set('dynamic-paid-test', {
  ...dummyJobBase,
  id: 'dynamic-paid-test',
  payment_status: 'paid',
  approval_status: 'approved'
});

async function runTests() {
  console.log('--- Testing Detail Image Rendering Pipeline ---');

  // Test 1: Unpaid job without preview=true parameter -> Should be blocked with 403
  console.log('\n[Test 1] Unpaid job without preview parameter...');
  const req1 = {
    url: 'http://localhost:3000/api/detail-image/dynamic-unpaid-test'
  };
  const res1 = await GET(req1, { params: Promise.resolve({ jobId: 'dynamic-unpaid-test' }) });
  console.log('Response status (expected 403):', res1.status);
  const text1 = await res1.text();
  console.log('Response body:', text1);

  // Test 2: Unpaid job with preview=true parameter -> Should render preview image (success, 200)
  console.log('\n[Test 2] Unpaid job with preview=true parameter...');
  const req2 = {
    url: 'http://localhost:3000/api/detail-image/dynamic-unpaid-test?preview=true'
  };
  const res2 = await GET(req2, { params: Promise.resolve({ jobId: 'dynamic-unpaid-test' }) });
  console.log('Response status (expected 200):', res2.status);
  if (res2.status === 200) {
    const arrayBuffer = await res2.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const outputPath = path.join(__dirname, 'unpaid-preview-out.png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved preview image output to: ${outputPath} (${buffer.byteLength} bytes)`);
  }

  // Test 3: Paid job without preview=true parameter -> Should render clean final image (success, 200)
  console.log('\n[Test 3] Paid job without preview parameter...');
  const req3 = {
    url: 'http://localhost:3000/api/detail-image/dynamic-paid-test'
  };
  const res3 = await GET(req3, { params: Promise.resolve({ jobId: 'dynamic-paid-test' }) });
  console.log('Response status (expected 200):', res3.status);
  if (res3.status === 200) {
    const arrayBuffer = await res3.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const outputPath = path.join(__dirname, 'paid-out.png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved paid image output to: ${outputPath} (${buffer.byteLength} bytes)`);
  }
}

runTests().catch(err => console.error('Tests failed with error:', err));
