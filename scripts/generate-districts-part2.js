const REMAINING_DISTRICTS = [
  { gu: '관악구', kw: '관악출장마사지', title: '관악출장마사지·신림출장안마 봉천·서울대입구 24시 신속 배차 안내' },
  { gu: '서대문구', kw: '서대문출장마사지', title: '서대문출장마사지·신촌출장안마 연세대·이대 인근 프라이빗 방문케어' },
  { gu: '종로구', kw: '종로출장마사지', title: '종로출장마사지·종로출장안마 광화문·인사동 호텔 외국인·비즈니스 1:1' },
  { gu: '중구', kw: '중구출장마사지', title: '중구출장마사지·명동출장안마 을지로·동대문 호텔 투숙객 안심 대면결제' },
  { gu: '강서구', kw: '강서출장마사지', title: '강서출장마사지·마곡출장안마 발산·화곡 24시간 심야 홈케어 정찰제' },
  { gu: '양천구', kw: '양천출장마사지', title: '양천출장마사지·목동출장안마 신정·오목교 자택 1:1 맞춤 테라피' },
  { gu: '구로구', kw: '구로출장마사지', title: '구로출장마사지·신도림출장안마 구로디지털단지 직장인 맞춤 지압' },
  { gu: '금천구', kw: '금천출장마사지', title: '금천출장마사지·가산출장안마 가산디지털단지 IT 직장인 힐링 케어' },
  { gu: '은평구', kw: '은평출장마사지', title: '은평출장마사지·연신내출장안마 불광·응암동 24시 자택 프라이빗' },
  { gu: '노원구', kw: '노원출장마사지', title: '노원출장마사지·노원역출장안마 상계·중계동 심야 안심 방문케어' },
  { gu: '도봉구', kw: '도봉출장마사지', title: '도봉출장마사지·창동출장안마 쌍문·방학동 타이·아로마 전문 출장' },
  { gu: '강북구', kw: '강북출장마사지', title: '강북출장마사지·수유출장안마 미아동 24시간 연중무휴 신속 배차' },
  { gu: '성북구', kw: '성북출장마사지', title: '성북출장마사지·길음출장안마 종암·성신여대 인근 1:1 방문 홈케어' },
  { gu: '중랑구', kw: '중랑출장마사지', title: '중랑출장마사지·상봉출장안마 면목·망우동 24시 안심 대면결제' },
  { gu: '동대문구', kw: '동대문출장마사지', title: '동대문출장마사지·장안동출장안마 청량리·회기역 호텔 전문 홈케어' }
];

async function run() {
  const accRes = await fetch('https://api.telegra.ph/createAccount?short_name=abam_seoul2&author_name=아밤공식홈케어');
  const accData = await accRes.json();
  if (!accData.ok) {
    console.error('계정 생성 실패:', accData);
    return;
  }
  const token = accData.result.access_token;
  const urls = [];

  for (const item of REMAINING_DISTRICTS) {
    const content = [
      { tag: 'p', children: [`서울특별시 ${item.gu} 전역 자택 및 호텔로 신속 방문하는 프라이빗 1:1 방문 출장마사지, 출장안마 안내입니다. 예약금이나 선입금 일체 없이 현장 도착 후 대면결제하므로 가장 안전합니다.`] },
      { tag: 'h3', children: [`1. ${item.gu} 출장마사지 정찰제 코스`] },
      { tag: 'p', children: ['타이 건식 지압(60분 8만/90분 10만), 천연 아로마 림프 케어(60분 9만/90분 11만), 복합 스페셜 코스(60분 10만/90분 12만) 정찰제 운영.'] },
      { tag: 'p', children: [`상세 안내: `, { tag: 'a', attrs: { href: `https://abam.kr/seo/${encodeURIComponent(item.kw)}` }, children: [`${item.kw} 공식 센터`] }, ` | `, { tag: 'a', attrs: { href: 'https://abam.kr' }, children: ['아밤 메인 홈페이지'] }] },
      { tag: 'p', children: ['예약 접수: 18:00부터 / 영업 시간: 19:00~05:00 / 고객센터: 010-6607-2239'] }
    ];

    const pageRes = await fetch('https://api.telegra.ph/createPage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: token,
        title: item.title,
        author_name: '아밤 서울 출장케어 (abam.kr)',
        author_url: 'https://abam.kr',
        content,
        return_content: false
      })
    });

    const pageData = await pageRes.json();
    if (pageData.ok) {
      const pageUrl = `https://telegra.ph/${pageData.result.path}`;
      urls.push(pageUrl);
      console.log(`[DA 93 백링크 완료] ${item.gu} -> ${pageUrl}`);
    }
    await new Promise(r => setTimeout(r, 600)); // rate limit 방지
  }

  const fs = require('fs');
  fs.writeFileSync('generated_backlinks_part2.json', JSON.stringify(urls, null, 2));
  console.log(`나머지 ${urls.length}개 서울 자치구 고권위 백링크 완료!`);
}

run().catch(console.error);
