import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { raw_input } = body;

    if (!raw_input) {
      return NextResponse.json({ error: 'raw_input is required' }, { status: 400 });
    }

    const {
      companyName = '아름다운밤',
      title = '',
      description = '',
      qna = [],
      highlightSentence = '',
      welfare = '',
      atmosphere = '',
      prMessage = '',
      location = '',
      pay = '',
      workHours = '',
      requirements = '',
      contactPhone = '',
      contactKakao = '',
    } = raw_input;

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (apiKey && apiKey !== '여기에_API_KEY_입력') {
      try {
        const systemPrompt = `You are a professional copywriting assistant for high-end job recruitment flyers on a premium hospitality job platform named '아름다운밤' (abam.kr).
Your task is to refine, polish, and optimize raw input text submitted by employers.

CRITICAL INSTRUCTIONS:
1. Preserve ALL factual information exactly as-is. You MUST NOT modify, translate, or invent phone numbers, Kakao IDs, pay amounts/criteria (e.g. 시급 15000원, 일당 20만원), working hours, or location addresses. Keep them identical to the raw input.
2. Refine the title and description to sound highly attractive, professional, and readable. Remove awkward Korean grammar, repetitions, and slang while maintaining a welcoming tone.
3. Align and refine the Q&A list. Make sure there are exactly 4 high-quality Q&As matching the tone of the platform.
4. Refine the highlight sentence (highlightSentence) which represents the employer's final promise/statement to be displayed prominently at the bottom. Keep it under 60 characters, highly convincing and bold.
5. Refine the welfare, atmosphere, and prMessage details. Keep them clear, appealing, trustworthy, and highly readable.
6. Output your response as a strict JSON object only, matching the exact schema below. Do not wrap the JSON in markdown codeblocks (e.g. \`\`\`json) or add any commentary.

JSON Output Schema:
{
  "companyName": "string (refined/cleaned company name)",
  "title": "string (highly engaging flyer title)",
  "description": "string (polished description paragraph, use paragraphs or clean newlines)",
  "qna": [
    { "question": "string", "answer": "string" }
  ],
  "highlightSentence": "string (refined short highlight statement)",
  "welfare": "string (polished welfare/benefits details)",
  "atmosphere": "string (polished atmosphere details)",
  "prMessage": "string (polished message/promise details)",
  "location": "string (address as provided)",
  "pay": "string (salary information as provided)",
  "workHours": "string (work hours details as provided)",
  "requirements": "string (requirements as provided)",
  "contactPhone": "string (contact number)",
  "contactKakao": "string (kakao talk ID)"
}`;

        const userContent = `Raw Input Data to Refine:
- Company Name: ${companyName}
- Flyer Title: ${title}
- Detailed Description: ${description}
- User Q&As: ${JSON.stringify(qna)}
- Highlight Sentence: ${highlightSentence}
- Welfare: ${welfare}
- Atmosphere: ${atmosphere}
- PR Message: ${prMessage}
- Location: ${location}
- Pay: ${pay}
- Work Hours: ${workHours}
- Requirements: ${requirements}
- Phone: ${contactPhone}
- Kakao: ${contactKakao}`;

        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2048,
            system: systemPrompt,
            messages: [
              {
                role: 'user',
                content: userContent,
              },
            ],
          }),
        });

        if (response.ok) {
          const result = await response.json();
          const responseText = result.content[0].text.trim();
          const cleanJsonString = responseText.replace(/^```json\s*|```$/g, '');
          const refinedData = JSON.parse(cleanJsonString);
          return NextResponse.json({ success: true, refined: refinedData });
        } else {
          const errorDetail = await response.text();
          console.error('Claude API responded with error:', errorDetail);
        }
      } catch (apiError) {
        console.error('Error during Claude API call:', apiError);
      }
    }

    // Heuristic Fallback Copywriter
    const cleanTitle = title.trim() || '최고의 대우와 안전한 환경을 보장합니다';
    const polishedTitle = cleanTitle.startsWith('★') 
      ? cleanTitle 
      : `★ ${cleanTitle} ★ [당일 100% 지급 / 자율출퇴근]`;

    const polishedDescription = `💖 ${companyName}에서 함께 빛날 소중한 파트너를 초대합니다 💖\n\n` +
      (description.trim() 
        ? `${description.trim()}\n\n✔ 저희는 철저한 익명 보장과 함께 업계 최고의 처우를 약속드립니다. 처음 일하시는 초보자분들도 쉽게 적응하실 수 있도록 체계적으로 케어해 드립니다. 망설이지 마시고 편하게 문의 주세요!`
        : `저희 ${companyName}은(는) 안전이 확실하게 검증된 고소득 구인 업소입니다. 쾌적한 근무 분위기와 함께 100% 당일 정산을 철칙으로 지키고 있습니다. 대학생, 초보자 분들도 대환영하며 모든 일정은 자유롭게 조율이 가능합니다.`);

    const defaultQnas = [
      {
        question: 'Q. 급여 지급 방식 및 보너스 혜택이 어떻게 되나요?',
        answer: 'A. 100% 퇴근 시 당일 계좌이체 및 현금 지급을 원칙으로 하며, 성실히 출근해 주시는 분들을 위한 다양한 만근 보너스 혜택을 제공합니다.',
      },
      {
        question: 'Q. 근무 일정 및 시간 조율이 자유로운가요?',
        answer: 'A. 네, 전적으로 구직자님의 일정을 존중합니다. 주 1회 아르바이트, 주말 고정, 자율출퇴근 등 원하시는 시간대를 매칭해 드립니다.',
      },
      {
        question: 'Q. 초보자나 대학생도 쉽게 배울 수 있나요?',
        answer: 'A. 네! 근무자의 90% 이상이 초보자로 첫날 바로 배우고 완벽하게 적응하셨습니다. 1대1로 친절하고 든든하게 교육해 드립니다.',
      },
      {
        question: 'Q. 개인정보 보안 및 익명 보장이 철저한가요?',
        answer: 'A. 당연합니다. 일체의 개인정보가 외부로 유출되지 않도록 가명 근무를 철저히 보장하고 안심번호 시스템을 운영합니다.',
      },
    ];

    const polishedQnas = qna.length > 0 
      ? qna.map((item: any, i: number) => {
          let q = item.question || '';
          let a = item.answer || '';
          if (!q.startsWith('Q.')) q = `Q. ${q}`;
          if (!a.startsWith('A.')) a = `A. ${spanPrefix(a)}`;
          return { question: q, answer: a };
        })
      : defaultQnas;

    while (polishedQnas.length < 4) {
      polishedQnas.push(defaultQnas[polishedQnas.length]);
    }

    const refinedFallback = {
      companyName: companyName.trim(),
      title: polishedTitle,
      description: polishedDescription,
      qna: polishedQnas.slice(0, 4),
      highlightSentence: highlightSentence.trim() || '처음부터 끝까지 편안하고 안전하게 일하실 수 있도록 지원합니다!',
      welfare: welfare.trim() || '최고급 대기실 제공, 만근 보너스 수당 등 다양한 복지 제공',
      atmosphere: atmosphere.trim() || '텃세나 술 강요 없는 매너 있고 가족 같은 편안한 분위기',
      prMessage: prMessage.trim() || '처음 오시는 분들도 안전하고 부담 없이 목돈을 마련하도록 실장이 1대1로 보장 케어합니다.',
      location,
      pay,
      workHours,
      requirements,
      contactPhone,
      contactKakao,
    };

    return NextResponse.json({ success: true, refined: refinedFallback, fallbackUsed: true });
  } catch (error: any) {
    console.error('Refiner API top-level error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

function spanPrefix(text: string) {
  if (text.startsWith('A.')) return text.slice(2).trim();
  return text.trim();
}
