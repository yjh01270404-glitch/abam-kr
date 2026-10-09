// 서울 25개 자치구 전역 + 테마별 35개 고권위(DA 93) 백링크 전체 융단폭격 생성기
const SEOUL_DISTRICTS_FULL = [
  { gu: '강남구', kw: '강남출장마사지', title: '강남출장마사지·강남출장안마 24시 호텔·자택 프라이빗 1:1 방문 홈케어' },
  { gu: '서초구', kw: '서초출장마사지', title: '서초출장마사지·서초출장안마 반포·교대역 호텔 신속 1:1 홈케어' },
  { gu: '송파구', kw: '송파출장마사지', title: '송파출장마사지·잠실출장안마 롯데월드타워·방이동 호텔 정찰제 케어' },
  { gu: '강동구', kw: '강동출장마사지', title: '강동출장마사지·천호출장안마 암사·명일 24시간 안심 대면결제' },
  { gu: '마포구', kw: '마포출장마사지', title: '마포출장마사지·홍대출장안마 합정·상암·공덕 프라이빗 1:1 방문케어' },
  { gu: '용산구', kw: '용산출장마사지', title: '용산출장마사지·이태원출장안마 한남동·용산역 비즈니스 호텔 전문 케어' },
  { gu: '영등포구', kw: '영등포출장마사지', title: '영등포출장마사지·여의도출장안마 콘래드·IFC 인근 비즈니스 출장객 전용' },
  { gu: '성동구', kw: '성동출장마사지', title: '성동출장마사지·성수출장안마 성수동·왕십리 24시 자택 힐링 테라피' },
  { gu: '광진구', kw: '광진출장마사지', title: '광진출장마사지·건대출장안마 구의·자양동 호텔 프라이빗 1:1 홈케어' },
  { gu: '동작구', kw: '동작출장마사지', title: '동작출장마사지·사당출장안마 이수·상도동 야근 피로회복 타이·아로마' },
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
  console.log('서울 25개 전 자치구 대량 백링크 생성 가동...');
  const accRes = await fetch('https://api.telegra.ph/createAccount?short_name=abam_all&author_name=아밤네트워크');
  const accData = await accRes.json();
  if (!accData.ok) {
    console.error('계정 생성 실패:', accData);
    return;
  }
  const token = accData.result.access_token;
  const urls = [];

  for (const item of SEOUL_DISTRICTS_FULL) {
    const content = [
      { tag: 'p', children: [`서울특별시 ${item.gu} 전역에서 믿고 이용할 수 있는 프라이빗 1:1 방문 홈케어, 출장마사지, 출장안마 안내입니다. 거주하시는 자택(아파트, 빌라, 오피스텔) 및 호텔, 레지던스로 전문 테라피스트가 직접 방문합니다.`] },
      { tag: 'h3', children: [`1. ${item.gu} 안심 이용 및 정찰제 요금`] },
      { tag: 'p', children: ['선입금 사기 피해가 전혀 없도록 100% 현장 도착 후 대면결제 원칙을 준수합니다. 타이 건식 60분 8만원, 90분 10만원부터 천연 아로마 및 복합 스페셜 코스까지 정찰제로 운영됩니다.'] },
      { tag: 'p', children: [`자세한 ${item.gu} 방문 안내는 `, { tag: 'a', attrs: { href: `https://abam.kr/seo/${encodeURIComponent(item.kw)}` }, children: [`${item.kw} 공식 안내`] }, ` 및 `, { tag: 'a', attrs: { href: 'https://abam.kr' }, children: ['아밤(Abam.kr) 메인 홈'] }, '에서 확인하실 수 있습니다.'] },
      { tag: 'h3', children: ['2. 운영 시간 및 빠른 예약'] },
      { tag: 'p', children: ['예약은 매일 18:00부터 접수되며, 영업 시간은 19:00부터 익일 05:00까지 심야 시간대에도 20~30분 이내 신속하게 배차됩니다. 고객센터: 010-6607-2239'] }
    ];

    const pageRes = await fetch('https://api.telegra.ph/createPage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: token,
        title: item.title,
        author_name: '아밤 서울 공식 홈케어 (abam.kr)',
        author_url: 'https://abam.kr',
        content,
        return_content: false
      })
    });

    const pageData = await pageRes.json();
    if (pageData.ok) {
      const pageUrl = `https://telegra.ph/${pageData.result.path}`;
      urls.push(pageUrl);
      console.log(`[DA 93 백링크 생성 성공] ${item.gu} -> ${pageUrl}`);
    }
  }

  // 생성된 백링크 목록 저장
  const fs = require('fs');
  fs.writeFileSync('generated_backlinks.json', JSON.stringify(urls, null, 2));
  console.log(`총 ${urls.length}개 서울 전역 고권위 백링크 파일 저장 완료!`);
}

run().catch(console.error);
