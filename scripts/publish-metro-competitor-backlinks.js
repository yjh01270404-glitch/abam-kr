// scripts/publish-metro-competitor-backlinks.js
// 수도권 핵심 거점 및 경쟁사 비교 고권위(DA 93) 백링크 발행 엔진
// AI스러운 어투/이모지 배제, 담백하고 명확한 전문 리뷰·이용 가이드 형식

const ARTICLES = [
  {
    title: '출장마사지 1위 아밤(Abam.kr) — 선입금 없는 100% 현장 대면결제 안심 이용 기준',
    author: '아밤 공식 운영팀',
    content: [
      { tag: 'p', children: ['출장마사지 서비스를 이용할 때 가장 중요한 것은 금전적 안전성과 관리사의 전문성입니다. 최근 온라인상에서 사전에 예약금이나 보증금을 요구한 뒤 잠적하는 피해 사례가 늘어나면서, 100% 현장 후불제를 원칙으로 하는 업체를 선택하는 것이 필수적입니다.'] },
      { tag: 'h3', children: ['1. 선입금 요구 업체를 피해야 하는 이유'] },
      { tag: 'p', children: ['정상적인 플랫폼은 관리사가 고객이 계신 자택이나 호텔 객실 문 앞에 도착하여 대면하기 전까지 단 1원도 입금을 요구하지 않습니다. 예약금, 이동 경비, 안전 보증금 등의 명목으로 계좌 이체를 유도하는 곳은 사기 가능성이 매우 높으므로 즉시 거래를 중단해야 합니다.'] },
      { tag: 'h3', children: ['2. 아밤(Abam.kr)의 운영 원칙과 특장점'] },
      { tag: 'p', children: ['아밤은 서울·경기·인천 수도권 전역을 대상으로 전원 20대 전문 관리사 라인업을 운영하며, 모든 코스는 현장에서 직접 확인 후 결제하는 100% 현장 후불제 시스템을 철저히 지킵니다. 타이 60분 8만 원부터 시작하는 투명한 정찰제로 운영됩니다.'] },
      { tag: 'p', children: ['자세한 코스 안내 및 실시간 예약 현황은 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80' }, children: ['출장마사지 1위 아밤 상세 안내'] }, ' 또는 ', { tag: 'a', attrs: { href: 'https://abam.kr' }, children: ['Abam.kr 공식 홈페이지'] }, '에서 확인하실 수 있습니다.'] },
    ]
  },
  {
    title: '도도출장안마·도도출장마사지 비교 및 선입금 주의사항 — 100% 후불제 아밤 이용법',
    author: '한국 방문케어 안전 가이드',
    content: [
      { tag: 'p', children: ['온라인상에서 도도출장안마나 도도출장마사지를 검색하시는 분들이 가장 많이 우려하시는 부분은 실제 도착 여부와 결제의 안전성입니다. 유명 상호를 모방한 피싱 사이트들이 기승을 부리고 있어 이용 전 명확한 판별 기준이 필요합니다.'] },
      { tag: 'h3', children: ['1. 도도출장안마 이용 시 체크포인트'] },
      { tag: 'p', children: ['예약 시 전화나 메신저로 선입금을 유도하는지 반드시 확인해야 합니다. 후불제라고 안내하면서도 "첫 이용 고객이라 보증금이 필요하다"고 말을 바꾸는 곳은 이용하지 않는 것이 원칙입니다.'] },
      { tag: 'h3', children: ['2. 아밤(Abam.kr)과의 비교 및 차별점'] },
      { tag: 'p', children: ['아밤은 타 업체들과 달리 사전 결제가 일절 없으며, 서울·수도권 전역 20~30분 내외 신속 배차 시스템을 갖추고 있습니다. 호텔이나 모텔 투숙 시에는 도착 전 기사가 미리 전화를 드려 1층 로비 미팅 후 결제가 가능하도록 안내하여 불필요한 마찰을 방지합니다.'] },
      { tag: 'p', children: ['비교 상세 분석은 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EB%8F%84%EB%8F%84%EC%B6%9C%EC%9E%A5%EC%95%88%EB%A7%88' }, children: ['도도출장안마 비교 1위 안내'] }, ' 및 ', { tag: 'a', attrs: { href: 'https://abam.kr/guide/outcall-massage-scam-prevention-comparison' }, children: ['출장마사지 선입금 사기 예방 가이드'] }, '에서 확인하실 수 있습니다.'] },
    ]
  },
  {
    title: '스피드출장안마·스피드출장마사지 비교 분석 — 서울·경기·인천 30분 총알도착 정찰 요금제',
    author: '수도권 홈케어 정보센터',
    content: [
      { tag: 'p', children: ['신속한 방문을 강조하는 스피드출장안마, 스피드출장마사지 계열의 서비스를 찾으시는 분들은 주로 야근 후 피로 회복이나 심야 시간대 빠른 케어를 원하시는 고객층입니다.'] },
      { tag: 'h3', children: ['1. 빠른 도착과 서비스 퀄리티의 균형'] },
      { tag: 'p', children: ['단순히 도착 시간만 빠른 것이 아니라, 위생 매트와 일회용 소모품을 완비하고 정식 교육을 수료한 한국인 20대 전문 테라피스트가 방문하는지가 만족도를 결정합니다.'] },
      { tag: 'h3', children: ['2. 아밤(Abam.kr)의 실시간 권역별 대기조 시스템'] },
      { tag: 'p', children: ['아밤은 강남, 송파, 마포, 영등포 등 서울 주요 거점뿐만 아니라 수원, 분당, 일산, 부천, 인천 등 수도권 전역에 상시 대기조를 분산 배치하여 이동 시간을 20~30분대로 단축했습니다. 건식 타이, 천연 아로마, VIP 스페셜 코스 모두 정찰 요금으로 운영됩니다.'] },
      { tag: 'p', children: ['자세한 내용은 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EC%8A%A4%ED%94%BC%EB%93%9C%EC%B6%9C%EC%9E%A5%EC%95%88%EB%A7%88' }, children: ['스피드출장안마 비교 안내 페이지'] }, ' 및 ', { tag: 'a', attrs: { href: 'https://abam.kr' }, children: ['Abam.kr 메인 포털'] }, '을 참조하시기 바랍니다.'] },
    ]
  },
  {
    title: '수원·분당·판교 출장마사지 24시 — 직장인·비즈니스 호텔 전문 1:1 방문 홈케어',
    author: '경기남부 홈케어 가이드',
    content: [
      { tag: 'p', children: ['수원 인계동, 영통, 광교 및 분당 판교 테크노밸리, 서현, 정자역 일대는 IT·비즈니스 직장인들의 심야 힐링 수요가 매우 높은 지역입니다.'] },
      { tag: 'h3', children: ['1. 경기 남부권 호텔 및 오피스텔 이용 안내'] },
      { tag: 'p', children: ['판교 코트야드, 수원 노보텔 등 주요 비즈니스 호텔 및 오피스텔 밀집 지역은 차량 진입 및 주차 동선이 중요합니다. 아밤은 차량 이동 특성에 맞춰 주차장 도착 시 사전 연락 및 로비 대면 미팅 시스템을 구축하여 편안하게 이용하실 수 있습니다.'] },
      { tag: 'h3', children: ['2. 맞춤 힐링 프로그램'] },
      { tag: 'p', children: ['오랜 컴퓨터 업무로 인한 거북목과 어깨 뭉침 완화에 특화된 타이 건식 스트레칭 코스와 림프 순환을 돕는 천연 아로마 코스를 선택하실 수 있으며, 100% 현장 결제로 안심하고 예약하실 수 있습니다.'] },
      { tag: 'p', children: ['상세 정보는 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EC%88%98%EC%9B%90%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80' }, children: ['수원출장마사지 공식 페이지'] }, ' 및 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EB%B6%84%EB%8B%B9%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80' }, children: ['분당출장마사지 공식 페이지'] }, '에서 확인 가능합니다.'] },
    ]
  },
  {
    title: '일산·부천·인천 출장마사지 1위 — 송도·청라·부평 전역 100% 후불제 이용 팁',
    author: '인천·경기서북부 센터',
    content: [
      { tag: 'p', children: ['인천 송도국제도시, 청라, 부평, 구월동 및 일산 킨텍스, 부천 중동·상동 일대에서 신뢰할 수 있는 출장 홈타이 및 마사지 업체를 선별하는 핵심 가이드입니다.'] },
      { tag: 'h3', children: ['1. 송도·부평·일산 출장 케어의 특장점'] },
      { tag: 'p', children: ['호텔 투숙객이나 늦은 귀가 후 이동이 어려운 자택 고객을 위해 침구 및 바닥 위생을 완벽하게 보호하는 전용 매트와 식물성 오일을 준비하여 방문합니다. 사전 예약금 요구 없이 현장 대면 후 결제하므로 첫 이용객도 불안감 없이 서비스를 받으실 수 있습니다.'] },
      { tag: 'h3', children: ['2. 예약 접수 및 배차 안내'] },
      { tag: 'p', children: ['매일 18:00부터 사전 예약 접수가 시작되며, 19:00부터 익일 05:00까지 심야 시간대에도 30분 내 도착 가능하도록 상시 대기조를 운영합니다.'] },
      { tag: 'p', children: ['지역별 상세 예약은 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EC%9D%B8%EC%B2%9C%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80' }, children: ['인천출장마사지'] }, ', ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EC%9D%BC%EC%82%B0%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80' }, children: ['일산출장마사지'] }, ', ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EB%B6%80%EC%B2%9C%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80' }, children: ['부천출장마사지'] }, ' 안내를 참조하세요.'] },
    ]
  },
  {
    title: '동탄·평택·안양 출장마사지 — 자택·오피스텔 전문 프리미엄 홈타이 & 아로마 케어',
    author: '수도권 외곽 홈케어 리포트',
    content: [
      { tag: 'p', children: ['화성 동탄1·2신도시, 평택 고덕·송탄, 안양 평촌·범계 일대에서 운영되는 출장 방문 케어는 신도시 주거 특성에 맞춘 깔끔하고 조용한 방문이 핵심입니다.'] },
      { tag: 'h3', children: ['1. 신도시 오피스텔 및 자택 이용 요령'] },
      { tag: 'p', children: ['공동현관 비밀번호나 방문 차량 등록이 필요한 단지의 경우 예약 시 미리 말씀해 주시면 지체 없이 방문이 진행됩니다. 20대 전문 에이스 관리사가 철저한 개인위생 수칙을 준수하여 1:1 프라이빗 케어를 제공합니다.'] },
      { tag: 'h3', children: ['2. 정찰제 투명 요금'] },
      { tag: 'p', children: ['현장에서 추가 비용을 요구하거나 팁을 강요하지 않는 정찰제 원칙으로 운영되며, 타이/아로마/VIP스페셜 전 코스에 대해 대면 확인 후 결제하는 100% 현장 후불제입니다.'] },
      { tag: 'p', children: ['상세 정보는 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EB%8F%99%ED%83%84%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80' }, children: ['동탄출장마사지'] }, ', ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%ED%8F%89%ED%83%9D%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80' }, children: ['평택출장마사지'] }, ', ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EC%95%88%EC%96%91%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80' }, children: ['안양출장마사지'] }, ' 페이지에서 확인하실 수 있습니다.'] },
    ]
  }
];

async function run() {
  console.log('수도권 거점 및 경쟁사 비교 고권위 백링크 발행 시작...');
  const accRes = await fetch('https://api.telegra.ph/createAccount?short_name=abam_metro&author_name=아밤운영본부');
  const accData = await accRes.json();
  if (!accData.ok) {
    console.error('Telegraph 계정 생성 실패:', accData);
    return;
  }
  const token = accData.result.access_token;

  for (const article of ARTICLES) {
    const pageRes = await fetch('https://api.telegra.ph/createPage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: token,
        title: article.title,
        author_name: article.author,
        author_url: 'https://abam.kr',
        content: article.content,
        return_content: false
      })
    });

    const pageData = await pageRes.json();
    if (pageData.ok) {
      console.log(`[DA 93 백링크 생성 성공] ${article.title.slice(0, 25)}... -> https://telegra.ph/${pageData.result.path}`);
    } else {
      console.error(`발행 실패:`, pageData);
    }
    // rate limit
    await new Promise((r) => setTimeout(r, 600));
  }
  console.log('수도권 거점 및 경쟁사 비교 백링크 발행 완료.');
}

run().catch(console.error);
