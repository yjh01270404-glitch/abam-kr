// scripts/publish-all-competitors-backlinks.js
// 국내 대표 출장마사지 비교 및 순위 고권위(DA 93) 백링크 발행 엔진
// 상대 업체 비하 일절 없음 / 객관적 서비스 비교 및 아밤 100% 현장후불제 안내

const ARTICLES = [
  {
    title: '출장마사지 순위 및 플랫폼별 특징 총정리 — 도도·스피드·나비·황제·아밤 비교 분석',
    author: '한국 방문케어 리포트',
    content: [
      { tag: 'p', children: ['온라인상에서 출장마사지, 출장안마 서비스를 이용할 때 많은 이용자들이 도도, 스피드, 나비, 황제, 아밤 등 대표적인 플랫폼들의 순위와 서비스 특징을 비교합니다. 샵 방문 없이 편안한 휴식을 누리기 위해 각 업체의 운영 특성을 사전에 파악하는 것이 좋습니다.'] },
      { tag: 'h3', children: ['1. 대표 출장안마 플랫폼별 운영 형태'] },
      { tag: 'p', children: ['도도출장안마, 스피드출장안마, 나비출장마사지 등은 국내에서 오랜 기간 검색 수요를 유지해온 대표적인 방문 테라피 서비스들입니다. 각 플랫폼마다 권역별 대기조 운영 방식과 코스 세부 구성에 차이가 있습니다.'] },
      { tag: 'h3', children: ['2. 결제 방식과 안전성 확인 기준'] },
      { tag: 'p', children: ['서비스를 이용할 때 가장 중요한 것은 사전 예약금이나 보증금 없이 관리사가 현장에 도착한 후 결제하는 100% 현장 대면결제 시스템입니다.'] },
      { tag: 'h3', children: ['3. 아밤(Abam.kr)의 운영 원칙과 차별점'] },
      { tag: 'p', children: ['아밤은 서울 25개 구 및 수도권 핵심 거점 전역에 전원 20대 전문 에이스 관리사 라인업을 배치하여 20~30분 내 신속한 방문 서비스를 제공합니다. 건식 타이, 천연 아로마, VIP 스페셜 전 코스에 대해 0원 예약금 원칙을 고수합니다.'] },
      { tag: 'p', children: ['상세 비교 분석은 ', { tag: 'a', attrs: { href: 'https://abam.kr/guide/outcall-massage-platform-ranking-comparison' }, children: ['출장마사지 플랫폼 순위 비교 공식 가이드'] }, ' 및 ', { tag: 'a', attrs: { href: 'https://abam.kr' }, children: ['Abam.kr 공식 홈페이지'] }, '에서 확인하실 수 있습니다.'] },
    ]
  },
  {
    title: '나비출장안마·황제출장마사지 서비스 비교 — 20대 전문 에이스 관리사 및 정찰제 기준',
    author: '수도권 힐링 정보센터',
    content: [
      { tag: 'p', children: ['수도권 전역에서 나비출장안마, 황제출장마사지 등의 상호를 검색하시는 분들은 주로 프라이빗한 1:1 수기 케어와 투명한 요금 체계를 중요하게 생각하는 고객층입니다.'] },
      { tag: 'h3', children: ['1. 서비스 퀄리티와 정찰 요금'] },
      { tag: 'p', children: ['방문 케어의 만족도는 현장에서 추가 비용을 요구하지 않는 정찰제 준수와 정식 교육을 수료한 전문 테라피스트의 배치 여부에서 결정됩니다.'] },
      { tag: 'h3', children: ['2. 아밤(Abam.kr)의 안심 이용 수칙'] },
      { tag: 'p', children: ['아밤은 타이 60분 8만 원부터 시작하는 투명한 요금표를 공시하고 있으며, 자택 및 호텔 어디서든 관리사 대면 후 결제하는 100% 현장 후불제로 운영됩니다.'] },
      { tag: 'p', children: ['세부 코스 안내는 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EB%82%98%EB%B9%84%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80' }, children: ['나비출장마사지 서비스 비교'] }, ' 및 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%ED%99%A9%EC%A0%9C%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80' }, children: ['황제출장마사지 서비스 비교'] }, '에서 확인 가능합니다.'] },
    ]
  },
  {
    title: '에이스출장안마·원출장마사지 비교 가이드 — 서울·수도권 30분 총알 방문 시스템',
    author: '프라이빗 홈케어 매거진',
    content: [
      { tag: 'p', children: ['에이스출장마사지, 원출장안마 등 빠른 배차를 선호하는 이용자들을 위한 객관적인 서비스 비교 분석입니다.'] },
      { tag: 'h3', children: ['1. 신속한 출장 시간의 조건'] },
      { tag: 'p', children: ['강남, 서초, 송파, 마포, 영등포 등 서울 주요 도심은 물론 분당, 일산, 수원, 부천 등 수도권 거점에 상시 대기조가 분산되어 있어야 야간 피크타임에도 30분 내 도착이 가능합니다.'] },
      { tag: 'h3', children: ['2. 아밤(Abam.kr) 100% 후불제 시스템'] },
      { tag: 'p', children: ['아밤은 비즈니스 출장객과 직장인 고객을 위해 호텔 1층 로비 사전 연락 및 현장 결제 시스템을 갖추고 있어 안심하고 이용하실 수 있습니다.'] },
      { tag: 'p', children: ['상세 정보는 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EC%97%90%EC%9D%B4%EC%8A%A4%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80' }, children: ['에이스출장마사지 서비스 비교'] }, ' 및 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EC%9B%90%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80' }, children: ['원출장마사지 서비스 비교'] }, '를 참조해 주세요.'] },
    ]
  }
];

async function run() {
  console.log('전체 대표 플랫폼 비교 고권위 백링크 발행 시작...');
  const accRes = await fetch('https://api.telegra.ph/createAccount?short_name=abam_brands&author_name=한국방문케어리포트');
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
      console.log(`[DA 93 백링크 생성 성공] ${article.title.slice(0, 30)}... -> https://telegra.ph/${pageData.result.path}`);
    } else {
      console.error(`발행 실패:`, pageData);
    }
    await new Promise((r) => setTimeout(r, 600));
  }
  console.log('전체 대표 플랫폼 비교 백링크 발행 완료.');
}

run().catch(console.error);
