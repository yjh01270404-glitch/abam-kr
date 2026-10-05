// telegra.ph 공식 API를 활용한 고권위(DA 93) 백링크 발행기
const articles = [
  {
    title: '서울 출장마사지·출장안마 완벽 가이드 — 선입금 사기 예방과 정찰 요금표',
    content: [
      { tag: 'p', children: ['서울 25개 자치구에서 방문 홈케어, 출장마사지, 출장안마 서비스를 이용할 때 가장 중요한 것은 안전과 신뢰성입니다. 최근 온라인상에서 선입금이나 예약금을 요구한 뒤 잠적하는 사기 사례가 빈번하게 발생하고 있어 각별한 주의가 필요합니다.'] },
      { tag: 'h3', children: ['1. 출장마사지·출장안마 선택 시 필수 체크리스트'] },
      { tag: 'p', children: ['믿을 수 있는 업체를 선별하기 위해서는 반드시 100% 현장 대면결제 원칙을 고수하는지 확인해야 합니다. 관리사가 예약 장소에 직접 도착하여 대면한 후 결제하는 방식을 선택하면 선입금 피해를 사전에 완벽히 방지할 수 있습니다.'] },
      { tag: 'p', children: ['대표적인 서울 전용 홈케어 브랜드인 ', { tag: 'a', attrs: { href: 'https://abam.kr' }, children: ['아름다운 밤(아밤)'] }, '은 사전 예약금 0원, 도착 후 현장 결제 시스템을 준수하며 투명한 정찰 요금표를 제공하고 있습니다.'] },
      { tag: 'h3', children: ['2. 서울 권역별 신속 방문 및 코스 안내'] },
      { tag: 'p', children: ['강남, 서초, 송파, 마포, 용산, 여의도 등 서울 전 지역 주요 호텔과 자택으로 20~30분 내외로 전문 테라피스트가 방문합니다. 상세한 지역별 정보는 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80' }, children: ['서울 출장마사지 안내'] }, ' 및 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EC%B6%9C%EC%9E%A5%EC%95%88%EB%A7%88' }, children: ['서울 출장안마 공식 센터'] }, '에서 확인하실 수 있습니다.'] },
      { tag: 'h3', children: ['3. 투명한 정찰제 요금 기준'] },
      { tag: 'p', children: ['타이 정통 건식 60분 80,000원부터 천연 아로마 림프 케어, 프리미엄 VIP 시그니처 코스까지 60·90·120분 단위로 정찰제가 공시되어 있습니다. 자세한 비용 기준은 ', { tag: 'a', attrs: { href: 'https://abam.kr/guide/chuljang-massage-price' }, children: ['출장마사지 가격 기준 총정리'] }, '를 참고하세요.'] }
    ]
  },
  {
    title: '출장 홈타이란? 출장안마·출장마사지 차이점과 안심 이용 팁',
    content: [
      { tag: 'p', children: ['바쁜 현대인들과 서울 출장객, 호텔 투숙객들 사이에서 프라이빗하게 피로를 해소할 수 있는 출장 홈타이 서비스가 대세로 자리 잡고 있습니다. 샵을 직접 방문할 필요 없이 편안한 독립된 공간에서 왓포 왕실 정통 건식 지압과 천연 에센셜 오일 테라피를 받을 수 있습니다.'] },
      { tag: 'h3', children: ['1. 출장홈타이의 주요 특징'] },
      { tag: 'p', children: ['홈타이(Home Thai)는 순면 관리복을 착용한 상태에서 스트레칭과 전신 혈자리 지압을 중심으로 진행되는 힐링 테라피입니다. 서울 전역에서 운영 중인 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EC%B6%9C%EC%9E%A5%ED%99%88%ED%83%80%EC%9D%B4' }, children: ['서울 출장홈타이 전문 아밤'] }, '에서는 철저한 실물 프로필 검증과 20대 전문 테라피스트 배차로 만족도를 높이고 있습니다.'] },
      { tag: 'h3', children: ['2. 안심 이용 3대 수칙'] },
      { tag: 'p', children: ['첫째, 예약 시 링크 결제나 문화상품권 결제를 유도하는 곳은 즉시 피하세요. 둘째, 정식 사업자 상호와 투명한 가격이 공지된 곳을 선택하세요. 셋째, 도착 확인 후 현장 대면결제를 진행하세요. 상세 가이드는 ', { tag: 'a', attrs: { href: 'https://abam.kr/guide/outcall-hometai-guide' }, children: ['출장 홈타이 안심 이용법'] }, '에서 확인하실 수 있습니다.'] },
      { tag: 'p', children: ['서울 25개 구 호텔, 오피스텔, 자택 어디서나 24시간 연중무휴 상시 문의는 공식 웹사이트 ', { tag: 'a', attrs: { href: 'https://abam.kr' }, children: ['https://abam.kr'] }, '을 통해 가능합니다.'] }
    ]
  },
  {
    title: '서울 호텔·자택 방문 출장서비스 — 24시 심야 홈케어 현장 대면결제 가이드',
    content: [
      { tag: 'p', children: ['야근 후 지친 직장인이나 서울 비즈니스 출장으로 호텔에 투숙 중인 분들을 위한 24시간 야간 출장서비스 이용 안내입니다. 서울은 교통망이 잘 발달되어 있어 예약 후 20~30분 내외로 신속하게 방문 관리를 받을 수 있는 것이 장점입니다.'] },
      { tag: 'h3', children: ['1. 호텔 및 레지던스 이용 방법'] },
      { tag: 'p', children: ['호텔 방문을 원하실 경우 객실 호수와 호텔명을 정확히 전달해 주시면 외부 노출 없이 조용하고 쾌적하게 방문 서비스가 진행됩니다. 사전 예약금 없이 관리사 도착 후 결제하므로 투숙객 입장에서 가장 안심할 수 있습니다.'] },
      { tag: 'p', children: ['강남, 서초, 잠실, 여의도, 마포 등 비즈니스 호텔 밀집 지역은 ', { tag: 'a', attrs: { href: 'https://abam.kr/keywords' }, children: ['서울 지역별 출장서비스 디렉터리'] }, '에서 권역별 도착 소요 시간을 확인하실 수 있습니다.'] },
      { tag: 'h3', children: ['2. 믿을 수 있는 힐링 파트너 아밤'] },
      { tag: 'p', children: ['아름다운 밤(아밤)은 서울특별시 전용 출장안마, 출장마사지, 출장홈타이 1:1 방문 홈케어를 제공합니다. 자세한 예약 상담 및 코스 확인은 ', { tag: 'a', attrs: { href: 'https://abam.kr' }, children: ['아밤 공식 홈페이지'] }, '에서 확인해 보세요.'] }
    ]
  }
];

async function run() {
  console.log('Telegraph 백링크 발행 시작...');
  const accRes = await fetch('https://api.telegra.ph/createAccount?short_name=abam_kr&author_name=아름다운밤');
  const accData = await accRes.json();
  if (!accData.ok) {
    console.error('계정 생성 실패:', accData);
    return;
  }
  const token = accData.result.access_token;
  console.log('Telegraph 세션 획득 성공');

  for (const art of articles) {
    const pageRes = await fetch('https://api.telegra.ph/createPage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: token,
        title: art.title,
        author_name: '아밤 공식 홈케어 (abam.kr)',
        author_url: 'https://abam.kr',
        content: art.content,
        return_content: false
      })
    });
    const pageData = await pageRes.json();
    if (pageData.ok) {
      console.log(`[백링크 생성 완료] ${art.title} -> https://telegra.ph/${pageData.result.path}`);
    } else {
      console.error('발행 실패:', pageData);
    }
  }
}

run().catch(console.error);
