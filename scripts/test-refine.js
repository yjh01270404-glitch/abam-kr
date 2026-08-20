// Direct unit test of the Next.js Route Handler for AI text refinement
const { POST } = require('../src/app/api/ai/refine/route.ts');

async function test() {
  console.log('--- Testing AI Refine API Route Handler (Direct Call) ---');
  
  const dummyInput = {
    raw_input: {
      companyName: '선릉 미소네',
      title: '초보자도 환영!! 연락주셈',
      description: '선릉역 5분거리임. 일당 25만원 당일지급함. 술강요 절대 없고 퇴근 자유. 카톡 아이디 misone11. 전화 010-9999-8888.',
      qna: [
        { question: '술 못마셔도 되나여?', answer: '네 안마셔도됨' }
      ],
      location: '서울 강남구 테헤란로 123',
      pay: '일급 250,000원',
      workHours: '오후 8시 ~ 오전 2시',
      requirements: '20세 이상 여성',
      contactPhone: '010-9999-8888',
      contactKakao: 'misone11'
    }
  };

  // Mock Request object
  const mockReq = {
    json: async () => dummyInput
  };

  try {
    const response = await POST(mockReq);
    const data = await response.json();
    console.log('\nResponse Status:', response.status);
    console.log('Fallback Used:', data.fallbackUsed);
    console.log('\nRefined Data Result:');
    console.log(JSON.stringify(data.refined, null, 2));
  } catch (error) {
    console.error('Test failed with error:', error);
  }
}

test();
