// 서울 핵심 핫스팟 10대 권역 고권위(DA 93) 백링크 대량 발행 엔진
const TARGET_AREAS = [
  { area: '강남', title: '강남출장마사지·강남출장안마 24시 호텔·자택 프라이빗 1:1 홈케어 완벽 안내', kw: '강남출장마사지', path: '강남출장마사지' },
  { area: '역삼·선릉', title: '역삼출장마사지·선릉출장안마 직장인 야근 피로회복 타이·아로마 가이드', kw: '역삼출장마사지', path: '역삼출장마사지' },
  { area: '서초·반포', title: '서초출장마사지·서초출장안마 반포·교대역 호텔 신속 방문 서비스', kw: '서초출장마사지', path: '서초출장마사지' },
  { area: '송파·잠실', title: '송파출장마사지·잠실출장안마 롯데월드타워·방이동 호텔 홈케어 정찰제', kw: '잠실출장마사지', path: '잠실출장마사지' },
  { area: '마포·홍대', title: '마포출장마사지·홍대출장안마 합정·상암 24시간 안심 대면결제 가이드', kw: '홍대출장마사지', path: '홍대출장마사지' },
  { area: '용산·이태원·한남', title: '용산출장마사지·이태원출장안마 한남동 외국인·호텔 전문 1:1 케어', kw: '용산출장마사지', path: '용산출장마사지' },
  { area: '영등포·여의도', title: '영등포출장마사지·여의도출장안마 IFC·콘래드 인근 비즈니스 출장객 전용', kw: '여의도출장마사지', path: '여의도출장마사지' },
  { area: '성동·성수', title: '성수출장마사지·성수동출장안마 성수·뚝섬 프라이빗 자택 힐링 테라피', kw: '성수출장마사지', path: '성수출장마사지' },
  { area: '24시·호텔', title: '24시간 서울 호텔출장마사지·출장안마 100% 현장결제 안심 이용 수칙', kw: '호텔출장마사지', path: '호텔출장마사지' },
  { area: '코스·가격표', title: '서울 출장마사지 가격표 및 출장안마 요금 기준 — 타이·아로마·스페셜 비교', kw: '출장마사지가격표', path: '출장마사지가격표' }
];

async function run() {
  console.log('대량 고권위 백링크 발행 시작...');
  const accRes = await fetch('https://api.telegra.ph/createAccount?short_name=abam_seoul&author_name=아밤공식센터');
  const accData = await accRes.json();
  if (!accData.ok) {
    console.error('계정 생성 실패:', accData);
    return;
  }
  const token = accData.result.access_token;

  for (const item of TARGET_AREAS) {
    const content = [
      { tag: 'p', children: [`서울 ${item.area} 지역에서 신뢰할 수 있는 출장마사지, 출장안마, 출장홈타이 1:1 프라이빗 케어를 찾으시는 분들을 위한 공식 가이드입니다. 샵 방문 없이 머무시는 자택이나 호텔 객실에서 전문 테라피스트의 체계적인 관리를 받으실 수 있습니다.`] },
      { tag: 'h3', children: [`1. ${item.area} 프라이빗 1:1 방문 홈케어의 특징`] },
      { tag: 'p', children: ['사전 예약금이나 선입금 없이 관리사가 현장에 도착한 후 결제하는 100% 현장 대면결제 시스템으로 안전성을 보장합니다. 타이 정통 건식 수기 지압, 천연 식물성 아로마 림프 케어, 복합 스페셜 코스 등 컨디션 맞춤 프로그램을 제공합니다.'] },
      { tag: 'p', children: ['상세 정보 및 실시간 배차 현황은 ', { tag: 'a', attrs: { href: `https://abam.kr/seo/${encodeURIComponent(item.path)}` }, children: [`${item.kw} 공식 안내 페이지`] }, ' 및 ', { tag: 'a', attrs: { href: 'https://abam.kr' }, children: ['Abam.kr 공식 홈페이지'] }, '에서 확인하실 수 있습니다.'] },
      { tag: 'h3', children: ['2. 이용 시간 및 예약 안내'] },
      { tag: 'p', children: ['예약 접수는 매일 18:00부터 가능하며, 영업 시간은 19:00부터 익일 05:00까지 심야 시간대에도 서울 전 지역 20~30분 내외로 신속 배차가 진행됩니다.'] }
    ];

    const pageRes = await fetch('https://api.telegra.ph/createPage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: token,
        title: item.title,
        author_name: '아밤 서울 프라이빗 홈케어 (abam.kr)',
        author_url: 'https://abam.kr',
        content,
        return_content: false
      })
    });

    const pageData = await pageRes.json();
    if (pageData.ok) {
      console.log(`[DA 93 백링크 생성 성공] ${item.area} -> https://telegra.ph/${pageData.result.path}`);
    } else {
      console.error(`발행 실패 (${item.area}):`, pageData);
    }
  }
}

run().catch(console.error);
