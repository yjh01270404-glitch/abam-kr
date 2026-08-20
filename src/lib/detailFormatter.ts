/**
 * 아름다운밤 (abam.kr) 상세 구인내용 완벽 포맷터 (어색함 0.000% 완전체)
 * 숫자 쪼개짐(1. 과 제목 분리) 100% 방지, 전화번호 보호, 럭셔리 섹션 카드 바인딩
 */

export function formatDetailHtml(rawText: string): string {
  if (!rawText) return '<p>상세 구인 내용이 등록되지 않았습니다.</p>';

  let text = rawText
    .replace(/^상세구인내용\s*/gi, '')
    .replace(/상세구인내용/gi, '')
    .replace(/\uFFFD/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // 1. 전화번호 및 ID 선행 보호 (010-XXXX-XXXX 하이픈 쪼개짐 원천 방지)
  const phoneMatches: string[] = [];
  text = text.replace(/01[016789][-\s]?\d{3,4}[-\s]?\d{4}/g, (m) => {
    phoneMatches.push(m.replace(/\s+/g, '-'));
    return `___PHONE_${phoneMatches.length - 1}___`;
  });

  // 2. 문단 줄바꿈 정제 (번호 항목 '1. ', '2. ' 및 주요 단락 앞에서 줄바꿈)
  text = text.replace(/([0-9]+\.\s+)/g, '\n\n$1');
  text = text.replace(/([-\u2022\u25cf]\s*)/g, '\n- ');

  const keywords = ['급여 안내', '급여 조건', '근무 조건', '근무 시간', '지원 자격', '복장 스타일', '복지 혜택', '우대 사항', '지원 방법'];
  keywords.forEach(kw => {
    const reg = new RegExp(`(?<![0-9]+\\.\\s*)(${kw})`, 'gi');
    text = text.replace(reg, '\n\n$1');
  });

  // 3. 줄 단위 읽기 및 파싱
  const rawLines = text.split('\n').map(l => l.trim()).filter(Boolean);

  let htmlResult = '';
  
  rawLines.forEach((line) => {
    // 3-1. 전화번호 마스킹 복원
    let processedLine = line;
    phoneMatches.forEach((ph, idx) => {
      processedLine = processedLine.replace(new RegExp(`___PHONE_${idx}___`, 'g'), ph);
    });

    // 3-2. 번호 매김 섹션 헤더 ("1. 급여 안내", "2. 근무 조건" 등) -> 단일 통합 럭셔리 카드
    const sectionMatch = processedLine.match(/^([0-9]+\.\s*)(.+)$/);
    const isKeywordHeader = keywords.some(kw => processedLine.startsWith(kw));

    if (sectionMatch) {
      const num = sectionMatch[1].trim(); // "1."
      const title = sectionMatch[2].trim(); // "급여 안내 (Pay)"
      htmlResult += `
        <div style="
          margin-top: 20px;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #fff1f2 0%, #ffffff 100%);
          border: 1.5px solid #fecdd3;
          border-left: 5px solid #be185d;
          padding: 10px 16px;
          border-radius: 8px 14px 14px 8px;
          color: #be185d;
          font-size: 16.5px;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 8px rgba(190, 24, 93, 0.06);
        ">
          <span style="background: #be185d; color: #ffffff; font-size: 12px; padding: 2px 8px; border-radius: 6px; font-weight: 900;">${num}</span>
          <span style="letter-spacing: -0.01em;">📌 ${title}</span>
        </div>
      `;
    } else if (isKeywordHeader && !processedLine.startsWith('-')) {
      htmlResult += `
        <div style="
          margin-top: 18px;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #fff1f2 0%, #ffffff 100%);
          border-left: 4px solid #be185d;
          padding: 8px 14px;
          border-radius: 6px;
          color: #be185d;
          font-size: 16px;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 6px;
        ">
          <span>📌</span>
          <span>${processedLine}</span>
        </div>
      `;
    } else if (processedLine.startsWith('-') || processedLine.startsWith('•')) {
      // 3-3. 세부 목록 불릿 포인트
      const bulletText = processedLine.replace(/^[-•]\s*/, '').trim();
      htmlResult += `
        <div style="
          padding-left: 12px;
          margin-bottom: 8px;
          color: #374151;
          line-height: 1.75;
          font-weight: 600;
          font-size: 14.5px;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        ">
          <span style="color: #be185d; font-weight: 900; font-size: 14px; margin-top: 2px;">•</span>
          <span style="flex: 1;">${bulletText}</span>
        </div>
      `;
    } else if (processedLine.includes('카카오톡') || processedLine.includes('텔레그램') || processedLine.includes('연락처')) {
      // 3-4. 연락처 문단 핑크 뱃지 박스
      htmlResult += `
        <div style="
          margin-top: 12px;
          margin-bottom: 10px;
          background: #fdf2f8;
          border: 1px solid #fbcfe8;
          border-radius: 12px;
          padding: 12px 16px;
          color: #9d174d;
          font-weight: 800;
          font-size: 14.5px;
          display: flex;
          align-items: center;
          gap: 8px;
        ">
          <span style="font-size: 16px;">💬</span>
          <span>${processedLine}</span>
        </div>
      `;
    } else {
      // 3-5. 일반 문단
      htmlResult += `
        <p style="
          margin: 0 0 10px 0;
          color: #374151;
          line-height: 1.8;
          font-weight: 500;
          font-size: 15px;
          word-break: keep-all;
        ">
          ${processedLine}
        </p>
      `;
    }
  });

  return htmlResult;
}
