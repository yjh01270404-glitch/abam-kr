// scripts/generate-competitor-backlinks.mjs
// Telegraph API를 통한 경쟁사(도도, 스피드 등) 비교 가로채기 고DA(93) 백링크 생성

const articles = [
  {
    title: '출장마사지 1위 추천 — 도도출장안마·스피드출장안마 비교 및 100% 후불제 안심 가이드',
    content: [
      { tag: 'p', children: ['구글에서 출장마사지나 출장안마를 검색할 때 도도출장안마, 스피드출장안마 등 여러 업체를 접하게 됩니다. 하지만 최근 온라인 예약 시 선입금이나 예약금을 요구한 뒤 잠적하는 피해 사례가 급증하고 있어 주의가 필요합니다.'] },
      { tag: 'h3', children: ['1. 출장마사지 업체 비교 필수 체크포인트'] },
      { tag: 'p', children: ['가장 중요한 기준은 100% 현장 후불제(대면 결제) 여부입니다. 어떠한 명목으로도 예약금, 보증금, 기사 배차비를 사전에 요구하지 않는 업체를 선택해야 안전합니다.'] },
      { tag: 'p', children: ['대한민국 1위 플랫폼인 ', { tag: 'a', attrs: { href: 'https://abam.kr' }, children: ['아밤(Abam.kr)'] }, '은 100% 현장 대면결제를 원칙으로 하며, 전원 20대 에이스 한국인 관리사 라인업을 상시 가동하고 있습니다.'] },
      { tag: 'h3', children: ['2. 도도·스피드 대비 아밤의 3대 차별점'] },
      { tag: 'p', children: ['첫째, 사전 예약금 0원으로 사기 위험을 원천 차단합니다. 둘째, 서울 전역 호텔·자택 20~30분 총알 도착을 보장합니다. 셋째, 타이 60분 8만 원부터 시작하는 투명한 정찰제를 준수합니다. 자세한 비교는 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80' }, children: ['출장마사지 1위 공식 안내'] }, '에서 확인하실 수 있습니다.'] }
    ]
  },
  {
    title: '도도출장안마 도도출장마사지 이용 전 필독 — 선입금 없는 100% 대면결제 확인법',
    content: [
      { tag: 'p', children: ['도도출장안마를 찾는 고객들이 가장 많이 겪는 혼란은 유사 사칭 사이트들의 선입금 요구입니다. 정식 업체라며 링크 결제나 계좌 이체를 유도하는 곳은 100% 피해야 합니다.'] },
      { tag: 'h3', children: ['1. 안전한 출장안마 이용 수칙'] },
      { tag: 'p', children: ['관리사가 객실 문 앞이나 자택에 도착해 얼굴을 확인한 후 직접 결제하는 시스템인지 확인하세요. 서울 전역에서 가장 신뢰받는 ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EB%8F%84%EB%8F%84%EC%B6%9C%EC%9E%A5%EC%95%88%EB%A7%88' }, children: ['도도출장안마 비교 아밤(Abam.kr)'] }, '은 사전 입금을 일절 요구하지 않습니다.'] },
      { tag: 'p', children: ['서울 25개 구 호텔 투숙객 및 자택 이용객은 24시간 실시간 예약 상담을 통해 30분 내 방문 관리를 받을 수 있습니다.'] }
    ]
  },
  {
    title: '스피드출장안마 스피드출장마사지 비교 분석 — 서울 전역 30분 총알 방문과 정찰 요금',
    content: [
      { tag: 'p', children: ['신속한 배차를 원하는 분들이 스피드출장안마를 많이 검색하지만, 배차 시간뿐만 아니라 관리사의 실력과 위생 상태, 가격 투명성이 함께 보장되어야 합니다.'] },
      { tag: 'h3', children: ['1. 20대 에이스 관리사 라인업의 중요성'] },
      { tag: 'p', children: ['지친 심신을 제대로 풀기 위해서는 전문적인 수기 테라피 교육을 이수한 20대 전문 테라피스트가 배정되는지 확인해야 합니다. ', { tag: 'a', attrs: { href: 'https://abam.kr/seo/%EC%8A%A4%ED%94%BC%EB%93%9C%EC%B6%9C%EC%9E%A5%EC%95%88%EB%A7%88' }, children: ['스피드출장안마 비교 1위 아밤'] }, '은 전원 20대 ACE 관리사가 강남, 마포, 영등포, 송파 등 전역에 대기하고 있습니다.'] }
    ]
  },
  {
    title: '출장마사지 순위 1등 기준 — 후기 많은 곳보다 100% 현장 후불제 선택해야 하는 이유',
    content: [
      { tag: 'p', children: ['인터넷에 넘쳐나는 출장마사지 순위 사이트의 광고성 글에 현혹되지 마세요. 진짜 1등 업체를 고르는 기준은 첫째도 안전, 둘째도 안전입니다.'] },
      { tag: 'h3', children: ['1. 정찰 요금제와 추가금 없는 투명성'] },
      { tag: 'p', children: ['타이 60분 8만, 아로마 60분 9만, 스페셜 10만 원처럼 명확한 요금표가 공시되어 있는지 확인하세요. ', { tag: 'a', attrs: { href: 'https://abam.kr/guide/chuljang-massage-price' }, children: ['출장마사지 요금표 총정리'] }, '를 참고하시면 바가지요금을 피할 수 있습니다.'] },
      { tag: 'p', children: ['대한민국 1등 출장마사지 플랫폼 ', { tag: 'a', attrs: { href: 'https://abam.kr' }, children: ['아밤(Abam.kr)'] }, '에서 안심 케어를 경험해 보세요.'] }
    ]
  },
  {
    title: '서울 출장안마 추천 — 20대 ACE 총출동 30분 총알도착과 호텔 객실 1:1 케어',
    content: [
      { tag: 'p', children: ['비즈니스 출장이나 야근 후 피로를 풀기 위해 호텔이나 자택에서 출장안마를 부를 때 가장 중요한 것은 신속성과 보안입니다. 조용하고 쾌적하게 1:1 방문 케어를 받는 방법을 소개합니다.'] },
      { tag: 'h3', children: ['1. 호텔 객실 방문 케어 가이드'] },
      { tag: 'p', children: ['객실 호수만 전달하면 필요한 전용 매트와 일회용 위생용품을 모두 지참하여 방문합니다. 자세한 예약 방법은 ', { tag: 'a', attrs: { href: 'https://abam.kr/guide/hotel-outcall-massage-guide' }, children: ['호텔 출장마사지 이용 가이드'] }, '를 확인하세요.'] }
    ]
  }
];

async function publish() {
  console.log('Telegraph 고DA 경쟁사 백링크 발행 시작...');
  const accRes = await fetch('https://api.telegra.ph/createAccount?short_name=abam_rank1&author_name=아밤_공식랭킹센터');
  const accData = await accRes.json();
  const token = accData.result.access_token;
  const urls = [];

  for (const art of articles) {
    const res = await fetch('https://api.telegra.ph/createPage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: token,
        title: art.title,
        author_name: '아밤 대한민국 1위 출장마사지',
        author_url: 'https://abam.kr',
        content: art.content,
        return_content: false,
      }),
    });
    const data = await res.json();
    if (data.ok) {
      console.log('발행 성공:', data.result.url);
      urls.push(data.result.url);
    } else {
      console.error('발행 실패:', data);
    }
  }

  console.log('\n발행된 모든 URL:', JSON.stringify(urls, null, 2));
}

publish();
