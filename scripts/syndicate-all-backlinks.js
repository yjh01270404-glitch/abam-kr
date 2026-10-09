const fs = require('fs');

const SEOUL_DISTRICTS = [
  { gu: '강남구', short: '강남', title: '강남출장마사지·강남출장안마 [20대 ACE 총출동] 역삼·선릉·논현 30분 총알도착 후불제' },
  { gu: '서초구', short: '서초', title: '서초출장마사지·서초출장안마 [20대 ACE 총출동] 반포·교대·양재 호텔·자택 100% 후불제' },
  { gu: '송파구', short: '송파', title: '송파출장마사지·잠실출장안마 [20대 ACE 총출동] 롯데월드타워·방이동 호텔 정찰제 케어' },
  { gu: '강동구', short: '강동', title: '강동출장마사지·천호출장안마 [20대 ACE 총출동] 암사·길동 30분 안심 대면결제' },
  { gu: '마포구', short: '마포', title: '마포출장마사지·홍대출장안마 [20대 ACE 총출동] 합정·상암·공덕 프라이빗 1:1 방문케어' },
  { gu: '용산구', short: '용산', title: '용산출장마사지·이태원출장안마 [20대 ACE 총출동] 한남동·용산역 비즈니스 호텔 전문' },
  { gu: '영등포구', short: '영등포', title: '영등포출장마사지·여의도출장안마 [20대 ACE 총출동] 콘래드·IFC 비즈니스 출장객 전용' },
  { gu: '성동구', short: '성동', title: '성동출장마사지·성수출장안마 [20대 ACE 총출동] 성수동·왕십리 프라이빗 힐링 테라피' },
  { gu: '광진구', short: '광진', title: '광진출장마사지·건대출장안마 [20대 ACE 총출동] 구의·자양동 호텔 프라이빗 1:1 홈케어' },
  { gu: '동작구', short: '동작', title: '동작출장마사지·사당출장안마 [20대 ACE 총출동] 이수·상도동 야근 피로회복 100% 후불제' },
  { gu: '관악구', short: '관악', title: '관악출장마사지·신림출장안마 [20대 ACE 총출동] 봉천·서울대입구 20~30분 신속 배차' },
  { gu: '서대문구', short: '서대문', title: '서대문출장마사지·신촌출장안마 [20대 ACE 총출동] 연세대·이대 인근 프라이빗 방문케어' },
  { gu: '종로구', short: '종로', title: '종로출장마사지·종로출장안마 [20대 ACE 총출동] 광화문·인사동 호텔 외국인·비즈니스 1:1' },
  { gu: '중구', short: '중구', title: '중구출장마사지·명동출장안마 [20대 ACE 총출동] 을지로·동대문 호텔 투숙객 안심 대면결제' },
  { gu: '강서구', short: '강서', title: '강서출장마사지·마곡출장안마 [20대 ACE 총출동] 발산·화곡 심야 프라이빗 홈케어 정찰제' },
  { gu: '양천구', short: '양천', title: '양천출장마사지·목동출장안마 [20대 ACE 총출동] 신정·오목교 자택 1:1 맞춤 테라피' },
  { gu: '구로구', short: '구로', title: '구로출장마사지·신도림출장안마 [20대 ACE 총출동] 구로디지털단지 직장인 맞춤 지압' },
  { gu: '금천구', short: '금천', title: '금천출장마사지·가산출장안마 [20대 ACE 총출동] 가산디지털단지 IT 직장인 힐링 케어' },
  { gu: '은평구', short: '은평', title: '은평출장마사지·연신내출장안마 [20대 ACE 총출동] 불광·응암동 자택 프라이빗 100% 후불제' },
  { gu: '노원구', short: '노원', title: '노원출장마사지·노원역출장안마 [20대 ACE 총출동] 상계·중계동 심야 안심 방문케어' },
  { gu: '도봉구', short: '도봉', title: '도봉출장마사지·창동출장안마 [20대 ACE 총출동] 쌍문·방학동 타이·아로마 전문 출장' },
  { gu: '강북구', short: '강북', title: '강북출장마사지·수유출장안마 [20대 ACE 총출동] 미아동 연중무휴 신속 배차 1:1 케어' },
  { gu: '성북구', short: '성북', title: '성북출장마사지·길음출장안마 [20대 ACE 총출동] 종암·성신여대 인근 1:1 방문 홈케어' },
  { gu: '중랑구', short: '중랑', title: '중랑출장마사지·상봉출장안마 [20대 ACE 총출동] 면목·망우동 30분 안심 대면결제' },
  { gu: '동대문구', short: '동대문', title: '동대문출장마사지·장안동출장안마 [20대 ACE 총출동] 청량리·회기역 호텔 전문 홈케어' }
];

const THEME_GUIDES = [
  {
    title: '서울 출장마사지 선입금 없는 100% 현장 후불제 안심 가이드 [20대 ACE 총출동]',
    p: '최근 출장마사지 및 출장안마 사기 수법(예약금, 보증금 선입금 요구)이 늘고 있습니다. 아밤(Abam.kr)은 전원 20대 에이스 관리사가 고객님의 자택이나 호텔에 도착한 후 대면 결제하는 100% 현장 후불제만을 고집합니다.'
  },
  {
    title: '20대 ACE 총출동 테라피스트 라인업 및 프라이빗 1:1 케어 안내',
    p: '아밤(Abam.kr)은 철저한 실력과 매너 검증을 통과한 전원 20대 에이스(ACE) 관리사로 구성되어 있습니다. 서울 25개 자치구 전역 어디든 20~30분 이내에 신속하게 배차됩니다.'
  },
  {
    title: '서울 주요 호텔 출장마사지 객실 이용 가이드 및 에티켓',
    p: '강남, 여의도, 광화문, 명동, 잠실 등 서울 시내 비즈니스 호텔 및 특급 호텔 객실에서 프라이빗하게 1:1 맞춤 홈케어를 즐기실 수 있습니다. 모든 필수 위생 소모품과 매트를 테라피스트가 직접 구비하여 방문합니다.'
  },
  {
    title: '정통 왓포 건식 타이 vs 천연 식물성 아로마 테라피 효능 비교',
    p: '뭉친 승모근과 척추 근육을 시원한 압으로 풀어주는 타이 케어(60분 8만원~)와 림프 순환 및 숙면을 유도하는 천연 아로마 케어(60분 9만원~), 둘을 결합한 스페셜 코스(10만원~)의 차이점을 상세히 알아봅니다.'
  },
  {
    title: '야근 직장인과 교대 근무자를 위한 심야 출장안마 힐링 프로그램',
    p: '만성 피로와 수면 장애에 시달리는 현대인을 위해 매일 저녁 18:00부터 사전 예약을 접수하며, 영업 시간인 19:00부터 05:00까지 조용하고 안락한 휴식을 선사합니다.'
  }
];

async function main() {
  console.log('Telegraph 고권위 백링크 대량 퍼블리싱 시작...');
  const accRes = await fetch('https://api.telegra.ph/createAccount?short_name=abam_ace&author_name=아밤공식네트워크');
  const acc = await accRes.json();
  if (!acc.ok) {
    console.error('계정 생성 실패:', acc);
    return;
  }
  const token = acc.result.access_token;
  const urls = [];

  // 1. 서울 25개 자치구 발행
  for (const item of SEOUL_DISTRICTS) {
    const content = [
      { tag: 'p', children: [`서울특별시 ${item.gu} 전역에서 믿고 이용할 수 있는 [20대 ACE 총출동] 프라이빗 1:1 방문 홈케어, 서울 출장마사지, 출장안마 공식 안내입니다.`] },
      { tag: 'h3', children: [`1. ${item.gu} [20대 ACE 총출동] & 100% 현장 후불제`] },
      { tag: 'p', children: [`아밤(Abam.kr)은 전원 20대 에이스 관리사 라인업을 상시 배치하여 ${item.gu} 내 모든 자택(아파트·오피스텔·빌라) 및 호텔·모텔로 20~30분 내 총알 도착합니다. 예약금이나 선입금이 전혀 없는 100% 현장 후불제이므로 안심하고 이용하실 수 있습니다.`] },
      { tag: 'h3', children: ['2. 코스별 정찰제 요금표'] },
      { tag: 'p', children: ['• 타이 케어 (건식 지압): 60분 80,000원 / 90분 100,000원 / 120분 120,000원\n• 아로마 케어 (천연 오일): 60분 90,000원 / 90분 110,000원 / 120분 140,000원\n• 스페셜 케어 (타이 + 아로마): 60분 100,000원 / 90분 120,000원 / 120분 160,000원'] },
      { tag: 'p', children: [
        '공식 웹사이트 바로가기: ',
        { tag: 'a', attrs: { href: `https://abam.kr/seo/${encodeURIComponent(item.short + '출장마사지')}` }, children: [`아밤 ${item.gu} 출장마사지 상세안내`] },
        ' | ',
        { tag: 'a', attrs: { href: 'https://abam.kr' }, children: ['아밤(Abam.kr) 공식 홈페이지'] }
      ]},
      { tag: 'h3', children: ['3. 예약 및 고객센터 안내'] },
      { tag: 'p', children: ['• 예약 접수: 매일 18:00부터 가능\n• 영업 시간: 19:00 ~ 익일 05:00 (연중무휴)\n• 대표 고객센터: 010-6607-2239\n• 카카오톡 공식 상담: Abam1004'] }
    ];

    try {
      const res = await fetch('https://api.telegra.ph/createPage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: token,
          title: item.title,
          author_name: '아밤(Abam.kr) 20대 ACE 총출동',
          author_url: 'https://abam.kr',
          content,
          return_content: false
        })
      });
      const d = await res.json();
      if (d.ok) {
        console.log(`[완료] ${item.gu}: ${d.result.url}`);
        urls.push(d.result.url);
      } else {
        console.error(`[실패] ${item.gu}:`, d);
      }
    } catch(err) {
      console.error(`[에러] ${item.gu}:`, err);
    }
    await new Promise(r => setTimeout(r, 600));
  }

  // 2. 5대 테마 가이드 발행
  for (const guide of THEME_GUIDES) {
    const content = [
      { tag: 'p', children: [guide.p] },
      { tag: 'h3', children: ['안심 이용 수칙 및 100% 현장 후불제 원칙'] },
      { tag: 'p', children: ['사전 예약금이나 보증금 요구 업체는 100% 사기입니다. 아밤(Abam.kr)은 철저한 대면 결제 원칙으로 고객님의 소중한 자산을 안전하게 보호합니다. 전원 20대 에이스 관리사 라인업으로 서울 25개 자치구 전역에 20~30분 내 방문합니다.'] },
      { tag: 'p', children: [
        '자세한 정보는 ',
        { tag: 'a', attrs: { href: 'https://abam.kr/guide' }, children: ['아밤 이용 가이드'] },
        ' 및 ',
        { tag: 'a', attrs: { href: 'https://abam.kr' }, children: ['아밤(Abam.kr) 메인 홈'] },
        '에서 즉시 확인하실 수 있습니다.'
      ]},
      { tag: 'h3', children: ['고객센터 및 실시간 예약'] },
      { tag: 'p', children: ['전화: 010-6607-2239 | 카카오톡 ID: Abam1004 | 영업: 19:00~05:00 (예약 18:00부터)'] }
    ];

    try {
      const res = await fetch('https://api.telegra.ph/createPage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: token,
          title: guide.title,
          author_name: '아밤(Abam.kr) 공식 가이드',
          author_url: 'https://abam.kr',
          content,
          return_content: false
        })
      });
      const d = await res.json();
      if (d.ok) {
        console.log(`[완료] 테마가이드: ${d.result.url}`);
        urls.push(d.result.url);
      }
    } catch(e) {}
    await new Promise(r => setTimeout(r, 600));
  }

  fs.writeFileSync('generated_backlinks_all.json', JSON.stringify(urls, null, 2), 'utf8');
  console.log(`총 ${urls.length}개 Telegraph 고권위 백링크 발행 및 저장 완료!`);
}

main();
