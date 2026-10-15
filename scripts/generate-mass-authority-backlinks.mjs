// scripts/generate-mass-authority-backlinks.mjs
// 서울 25개 전 자치구 + 경기·인천 20대 핵심 거점 + 경쟁사 정복 키워드 + 웰니스 테마 가이드
// DA 93 글로벌 고권위(Telegraph) 백링크 대량 양성 파이프라인 (Tier-1 Backlink Farm)

import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://abam.kr';

// 1. 서울 25개 전 자치구
const SEOUL_DISTRICTS = [
  { gu: '강남구', short: '강남', areas: '역삼·논현·삼성·선릉·압구정·청담', kw: '강남출장마사지', desc: '테헤란로 업무지구와 호텔 밀집 지역' },
  { gu: '서초구', short: '서초', areas: '반포·교대·양재·서초동·방배', kw: '서초출장마사지', desc: '법조타운 직장인 및 반포 호텔 투숙객' },
  { gu: '송파구', short: '송파', areas: '잠실·방이·문정·석촌·가락', kw: '송파출장마사지', desc: '롯데월드타워·방이동 호텔 및 문정 법조타운' },
  { gu: '마포구', short: '마포', areas: '홍대·합정·상암·공덕·연남', kw: '마포출장마사지', desc: '홍대 관광객 및 공덕·상암 미디어 직장인' },
  { gu: '용산구', short: '용산', areas: '한남·이태원·용산역·삼각지', kw: '용산출장마사지', desc: '외국인 투숙객 및 비즈니스 호텔' },
  { gu: '영등포구', short: '영등포', areas: '여의도·당산·문래·영등포동', kw: '영등포출장마사지', desc: '여의도 금융가 직장인 및 호텔' },
  { gu: '성동구', short: '성동', areas: '성수·왕십리·뚝섬·옥수', kw: '성동출장마사지', desc: '성수동 부티크 호텔 및 거주지' },
  { gu: '광진구', short: '광진', areas: '건대·구의·자양·광장동', kw: '광진출장마사지', desc: '건대 상권 및 광장동 호텔' },
  { gu: '동작구', short: '동작', areas: '사당·이수·노량진·상도동', kw: '동작출장마사지', desc: '사당 환승역 및 주거지' },
  { gu: '관악구', short: '관악', areas: '신림·봉천·서울대입구', kw: '관악출장마사지', desc: '1~2인 가구 주거지' },
  { gu: '서대문구', short: '서대문', areas: '신촌·연희·홍제·충정로', kw: '서대문출장마사지', desc: '대학가 및 충정로 업무지구' },
  { gu: '종로구', short: '종로', areas: '광화문·인사동·종로3가·혜화', kw: '종로출장마사지', desc: '광화문 비즈니스 호텔 및 관광지' },
  { gu: '중구', short: '중구', areas: '명동·을지로·충무로·동대문', kw: '중구출장마사지', desc: '명동·을지로 관광 및 비즈니스 호텔 밀집지' },
  { gu: '동대문구', short: '동대문', areas: '청량리·장안동·답십리·회기', kw: '동대문출장마사지', desc: '패션 상권 및 청량리 교통 거점' },
  { gu: '성북구', short: '성북', areas: '길음·성신여대·종암·돈암', kw: '성북출장마사지', desc: '길음 뉴타운 및 대학가 주거지' },
  { gu: '강북구', short: '강북', areas: '수유·미아·번동·우이', kw: '강북출장마사지', desc: '수유·미아 상권 및 주거지' },
  { gu: '도봉구', short: '도봉', areas: '창동·쌍문·방학·도봉동', kw: '도봉출장마사지', desc: '창동 주거 단지' },
  { gu: '노원구', short: '노원', areas: '상계·중계·하계·공릉', kw: '노원출장마사지', desc: '대단지 아파트 밀집지' },
  { gu: '중랑구', short: '중랑', areas: '상봉·면목·망우·중화', kw: '중랑출장마사지', desc: '상봉 교통 거점 및 주거지' },
  { gu: '강서구', short: '강서', areas: '마곡·발산·화곡·염창', kw: '강서출장마사지', desc: '마곡 R&D 직장인 및 공항 호텔' },
  { gu: '양천구', short: '양천', areas: '목동·신정·신월', kw: '양천출장마사지', desc: '목동 주거 단지' },
  { gu: '구로구', short: '구로', areas: '구로디지털·신도림·구로동', kw: '구로출장마사지', desc: '구로디지털단지 IT 직장인' },
  { gu: '금천구', short: '금천', areas: '가산디지털·독산·시흥', kw: '금천출장마사지', desc: '가산디지털단지 IT 직장인' },
  { gu: '은평구', short: '은평', areas: '연신내·불광·응암·진관', kw: '은평출장마사지', desc: '연신내 및 뉴타운 단지' },
  { gu: '강동구', short: '강동', areas: '천호·암사·길동·명일', kw: '강동출장마사지', desc: '천호 상권 및 주거 단지' }
];

// 2. 경기·인천 핵심 거점 (20개 도시)
const METRO_HUBS = [
  { city: '수원', areas: '인계동·영통·광교·수원역', kw: '수원출장마사지', desc: '인계동 상권 및 비즈니스 호텔' },
  { city: '성남 분당·판교', areas: '판교테크노밸리·서현·정자·미금', kw: '분당출장마사지', desc: '판교 IT 직장인 및 호텔' },
  { city: '고양 일산', areas: '라페스타·웨스턴돔·킨텍스·백석', kw: '일산출장마사지', desc: '킨텍스 출장객 및 주거지' },
  { city: '부천', areas: '중동·상동·부천역·신중동', kw: '부천출장마사지', desc: '중동 신도시 및 호텔' },
  { city: '안양', areas: '평촌·범계·인덕원·안양역', kw: '안양출장마사지', desc: '평촌 업무단지 및 호텔' },
  { city: '평택', areas: '고덕국제신도시·송탄·평택역·지제', kw: '평택출장마사지', desc: '고덕 산단 직장인 및 숙박 시설' },
  { city: '화성 동탄', areas: '동탄1·2신도시·반송동·영천동', kw: '동탄출장마사지', desc: '동탄 산업단지 및 오피스텔' },
  { city: '김포', areas: '구래동·장기동·풍무동·사우동', kw: '김포출장마사지', desc: '김포 한강신도시 주거지' },
  { city: '인천 송도', areas: '송도국제도시·센트럴파크·테크노파크', kw: '인천출장마사지', desc: '송도 비즈니스 호텔 및 오피스텔' },
  { city: '인천 부평·청라', areas: '부평역·청라국제도시·구월동', kw: '부평출장마사지', desc: '부평 번화가 및 청라 신도시' },
  { city: '안산', areas: '중앙동·고잔동·상록수·선부동', kw: '안산출장마사지', desc: '중앙동 상권 및 고잔 신도시' },
  { city: '시흥', areas: '배곧신도시·정왕동·은계지구', kw: '시흥출장마사지', desc: '배곧 신도시 및 공단 직장인' },
  { city: '파주', areas: '야당역·운정신도시·금촌', kw: '파주출장마사지', desc: '운정 신도시 및 야당 상권' },
  { city: '의정부', areas: '의정부역·민락2지구·회룡', kw: '의정부출장마사지', desc: '경기 북부 교통 거점 및 상권' },
  { city: '남양주', areas: '다산신도시·별내·호평·평내', kw: '남양주출장마사지', desc: '다산 및 별내 신도시 주거 단지' },
  { city: '하남', areas: '미사강변도시·풍산동·하남시청', kw: '하남출장마사지', desc: '미사 R&D 오피스텔 단지' },
  { city: '광명', areas: '광명역·철산동·하안동', kw: '광명출장마사지', desc: 'KTX 광명역 역세권 및 호텔' },
  { city: '용인 수지·기흥', areas: '죽전·수지구청·기흥역·동백', kw: '용인출장마사지', desc: '수지 주거 단지 및 기흥 IT 벨트' },
  { city: '이천', areas: '부발읍·하이닉스·이천터미널', kw: '이천출장마사지', desc: '반도체 직장인 및 숙박업소' },
  { city: '오산', areas: '오산역·세교지구·원동', kw: '오산출장마사지', desc: '세교 신도시 및 오산 상권' }
];

// 3. 경쟁사 비교 및 상업 정복 토픽 (12개)
const COMPETITOR_TOPICS = [
  {
    title: '도도출장마사지 vs 아름다운밤 [아밤.Abam.kr] — 서비스 비교 및 선입금 없는 안심 선택법',
    kw: '도도출장마사지',
    competitor: '도도출장마사지',
    summary: '도도출장마사지와 아밤의 배차 속도, 결제 투명성, 테라피스트 프로필을 객관적으로 비교 분석합니다.'
  },
  {
    title: '도도출장안마 서비스 비교 총정리 — 20대 전문 에이스 관리사 및 100% 현장후불제',
    kw: '도도출장안마',
    competitor: '도도출장안마',
    summary: '도도출장안마 검색 시 유의해야 할 선입금 피싱 주의사항과 아밤의 0원 예약금 원칙을 안내합니다.'
  },
  {
    title: '스피드출장마사지 vs 아밤 — 서울·경기 30분 총알도착 정찰 요금제 비교',
    kw: '스피드출장마사지',
    competitor: '스피드출장마사지',
    summary: '신속한 배차를 강조하는 스피드출장마사지와 아밤의 권역별 상시 대기조 시스템을 상세 비교합니다.'
  },
  {
    title: '스피드출장안마 vs 아름다운밤 [아밤.Abam.kr] — 야근 직장인 심야 케어 가이드',
    kw: '스피드출장안마',
    competitor: '스피드출장안마',
    summary: '심야 시간대(19:00~05:00) 빠른 도착과 정찰제 요금 운영 기준을 투명하게 공개합니다.'
  },
  {
    title: '나비출장마사지 서비스 비교 분석 — 투명한 정찰 요금과 프라이빗 1:1 방문 홈케어',
    kw: '나비출장마사지',
    competitor: '나비출장마사지',
    summary: '수도권 전역에서 오랜 인지도를 가진 나비출장마사지와 아밤의 코스별 구성과 결제 신뢰성을 분석합니다.'
  },
  {
    title: '황제출장마사지 vs 아밤 — VIP 스페셜 복합 코스 및 20대 전문 힐러 케어 비교',
    kw: '황제출장마사지',
    competitor: '황제출장마사지',
    summary: '타이와 아로마가 결합된 VIP 스페셜 코스의 품질과 관리사 전문성 기준을 평가합니다.'
  },
  {
    title: '에이스출장마사지 비교 가이드 — 전원 20대 에이스 관리사 실시간 배차 시스템',
    kw: '에이스출장마사지',
    competitor: '에이스출장마사지',
    summary: '에이스출장마사지와 아밤의 관리사 검증 시스템 및 고객 만족도 지표를 객관적으로 다룹니다.'
  },
  {
    title: '원출장마사지 vs 아름다운밤 [아밤.Abam.kr] — 비즈니스 호텔 객실 1:1 케어 요령',
    kw: '원출장마사지',
    competitor: '원출장마사지',
    summary: '호텔 로비 대면 미팅 및 결제 에티켓, 위생 매트 완비 기준을 상세히 비교 설명합니다.'
  },
  {
    title: '로얄출장마사지 서비스 비교 — 사전 예약금 없는 100% 현장 대면결제 가이드',
    kw: '로얄출장마사지',
    competitor: '로얄출장마사지',
    summary: '로얄출장마사지 이용 고객층을 위한 안전 결제 원칙과 현장 계좌이체/현금 결제 안내입니다.'
  },
  {
    title: '출장마사지 플랫폼 순위 및 추천 기준 총정리 — 2026년 수도권 베스트 5',
    kw: '출장마사지순위',
    competitor: '주요 출장 플랫폼',
    summary: '소비자 만족도, 안전 결제율, 재방문율을 종합 분석한 2026 출장마사지 랭킹 리포트입니다.'
  },
  {
    title: '선입금 없는 출장마사지 판별 기준 3가지 — 피싱 사기 100% 차단 비법',
    kw: '선입금없는출장마사지',
    competitor: '선입금 사기 업체',
    summary: '첫 이용 보증금, 예약금, 기사 유류비 등을 요구하는 사기 수법을 원천 차단하는 방법을 고지합니다.'
  },
  {
    title: '출장마사지 정찰제 가격표 기준 — 건식 타이 8만, 아로마 9만, 스페셜 10만 원',
    kw: '출장마사지가격',
    competitor: '불투명 추가금 업체',
    summary: '현장에서 팁이나 추가 비용을 요구하지 않는 완벽한 투명 정찰제 요금 체계를 공시합니다.'
  }
];

// 4. 전문 웰니스 및 건강 케어 테마 (8개)
const WELLNESS_TOPICS = [
  {
    title: '만성 거북목과 어깨 결림을 해소하는 1:1 방문 수기 테라피 가이드',
    kw: '방문마사지',
    focus: '컴퓨터 및 스마트폰 장시간 사용으로 굳어진 경추와 승모근 이완 스트레칭'
  },
  {
    title: '천연 식물성 에센셜 오일 아로마 테라피의 림프 순환과 부종 완화 효능',
    kw: '아로마출장마사지',
    focus: '림프절 자극을 통한 노폐물 배출과 자율신경계 이완으로 깊은 숙면 유도'
  },
  {
    title: '정통 왓포 건식 타이 테라피의 에너지 라인(Sen) 지압 기법 분석',
    kw: '타이출장마사지',
    focus: '손과 팔꿈치, 무릎을 활용한 깊은 압력으로 근막 유착 해소 및 유연성 회복'
  },
  {
    title: '타이 지압 + 천연 아로마 VIP 복합 스페셜 코스의 시너지 효과',
    kw: '스페셜출장마사지',
    focus: '강한 압으로 뭉친 근육을 먼저 풀고 아로마 오일로 진정시키는 2중 테라피'
  },
  {
    title: '야근 직장인과 교대 근무자를 위한 심야 방문 케어 (19:00 ~ 익일 05:00)',
    kw: '야간출장마사지',
    focus: '늦은 새벽 퇴근 후 샵 이동 없이 자택 침실에서 받는 편안한 힐링 솔루션'
  },
  {
    title: '서울·경기 전역 20대 전문 에이스 관리사 라인업과 철저한 위생 관리 수칙',
    kw: '20대출장마사지',
    focus: '정식 테라피 교육 수료, 1회용 위생 매트 및 소모품 완비, 100% 매너 검증'
  },
  {
    title: '비즈니스 호텔 투숙객을 위한 프라이빗 룸 케어 프로토콜 및 에티켓',
    kw: '호텔출장마사지',
    focus: '로비 사전 미팅, 차량 주차 안내, 침구 위생 보호, 대면결제 안심 절차'
  },
  {
    title: '서울출장마사지 1위 아밤(Abam.kr)이 고객 재이용률 1위를 달성한 3대 비결',
    kw: '서울출장마사지',
    focus: '0원 예약금 원칙, 전원 20대 에이스 관리사, 30분 총알 도착 네트워크'
  }
];

// 빌더 함수들
function buildDistrictArticle(item) {
  return {
    title: `${item.gu} ${item.kw} — ${item.areas} 100% 현장 대면결제 프라이빗 1:1 방문 홈케어`,
    content: [
      { tag: 'p', children: [`서울특별시 ${item.gu}(${item.areas}) 전역에서 믿고 이용할 수 있는 프라이빗 1:1 방문 홈케어, 출장마사지, 출장안마 안내입니다. ${item.desc}에 맞춰 머무시는 자택(아파트·오피스텔·빌라) 및 호텔 객실로 전문 매니저가 30분 내 신속하게 방문합니다.`] },
      { tag: 'h3', children: [`1. ${item.gu} 안심 이용 원칙 — 100% 현장 대면결제`] },
      { tag: 'p', children: ['아름다운밤 [아밤.Abam.kr]은 어떠한 선입금이나 예약금도 일절 요구하지 않습니다. 매니저가 현장에 직접 도착하여 고객님과 대면한 후 결제(현금, 계좌이체, 카드)를 진행하므로 예약금 먹튀나 사기 걱정 없이 안심하고 이용하실 수 있습니다.'] },
      { tag: 'p', children: [
        `상세한 ${item.gu} 코스 및 가격 안내는 `,
        { tag: 'a', attrs: { href: `${SITE_URL}/seo/${encodeURIComponent(item.kw)}` }, children: [`${item.kw} 1위 아밤 공식 페이지`] },
        ' 및 ',
        { tag: 'a', attrs: { href: `${SITE_URL}/keywords` }, children: ['서울·경기 지역별 안내 디렉터리'] },
        '에서 확인하실 수 있습니다.'
      ]},
      { tag: 'h3', children: ['2. 코스별 정찰 요금표'] },
      { tag: 'p', children: ['• 타이 케어 (건식 지압): 60분 80,000원 / 90분 100,000원 / 120분 120,000원\n• 아로마 케어 (천연 오일): 60분 90,000원 / 90분 110,000원 / 120분 140,000원\n• 스페셜 케어 (타이 + 아로마): 60분 100,000원 / 90분 120,000원 / 120분 160,000원'] },
      { tag: 'h3', children: ['3. 방문 전 필수 안내 — 주차장·공동현관·호텔 이용법'] },
      { tag: 'p', children: ['• 주차장 및 1층 공동현관: 비밀번호는 예약 시 미리 알려주시거나 호출버튼으로 열어주실 수 있다고 말씀해 주시면 지체 없이 방문이 진행됩니다.\n• 호텔·모텔 투숙 시: 1층 로비에서 매니저를 만나 대면결제를 진행하신 뒤 객실로 함께 이동합니다.'] },
      { tag: 'h3', children: ['4. 운영 시간 안내'] },
      { tag: 'p', children: ['• 사전 예약 접수: 매일 18:00부터 가능\n• 매니저 현장 출발: 19:00부터 시작\n• 마지막 예약 마감: 새벽 05:00\n(※ 이용 1시간 전 사전 예약을 권장해 드립니다.)'] },
      { tag: 'p', children: [
        '공식 포털: ',
        { tag: 'a', attrs: { href: SITE_URL }, children: ['아름다운밤 [아밤.Abam.kr] 공식 센터'] }
      ]}
    ]
  };
}

function buildMetroArticle(item) {
  return {
    title: `${item.city} ${item.kw} — ${item.areas} 자택·호텔 100% 후불제 1:1 방문 홈케어`,
    content: [
      { tag: 'p', children: [`${item.city}(${item.areas}) 일대에서 업무 후 피로 회복이나 심야 힐링을 원하시는 분들을 위한 공식 출장마사지·홈타이 안내입니다. ${item.desc} 특성에 맞춰 조용하고 위생적인 1:1 맞춤 케어를 선사합니다.`] },
      { tag: 'h3', children: [`1. ${item.city} 전역 정찰제 요금 및 선입금 0원 원칙`] },
      { tag: 'p', children: ['타이 왓포 정통 건식 지압(60분 8만원~), 천연 식물성 아로마 림프 케어(60분 9만원~), 타이와 아로마를 결합한 VIP 스페셜 복합 코스(60분 10만원~)까지 전 코스 정찰제로 운영됩니다. 어떠한 선입금도 받지 않으며 100% 현장 도착 후 대면결제입니다.'] },
      { tag: 'p', children: [
        `자세한 정보는 `,
        { tag: 'a', attrs: { href: `${SITE_URL}/seo/${encodeURIComponent(item.kw)}` }, children: [`${item.kw} 상세 안내 페이지`] },
        ' 및 ',
        { tag: 'a', attrs: { href: `${SITE_URL}/guide/chuljang-massage-price` }, children: ['출장마사지 가격 가이드'] },
        '를 참고하시기 바랍니다.'
      ]},
      { tag: 'h3', children: ['2. 출입 및 호텔 이용 안내'] },
      { tag: 'p', children: ['자택 방문 시 주차장과 1층 공동현관 비밀번호를 예약 시 전달해 주시거나 호출버튼으로 열어주실 수 있음을 미리 알려주시면 더욱 빠른 방문이 가능합니다. 호텔·모텔은 1층 로비에서 매니저를 만나 대면결제 후 객실로 함께 이동합니다.'] },
      { tag: 'h3', children: ['3. 운영 안내'] },
      { tag: 'p', children: ['예약 접수는 18:00부터 가능하며, 매니저 출발은 19:00부터 진행됩니다. 마지막 예약 마감은 새벽 05:00입니다. 1시간 전 예약하시면 가장 원활하게 원하시는 시간대에 이용하실 수 있습니다.'] },
      { tag: 'p', children: [
        '공식 센터: ',
        { tag: 'a', attrs: { href: SITE_URL }, children: ['아름다운밤 [아밤.Abam.kr]'] }
      ]}
    ]
  };
}

function buildCompetitorArticle(item) {
  return {
    title: item.title,
    content: [
      { tag: 'p', children: [`수도권 전역에서 ${item.competitor} 및 신뢰할 수 있는 출장 방문 홈케어를 검색하시는 고객층을 위한 객관적인 서비스 가이드입니다. ${item.summary}`] },
      { tag: 'h3', children: ['1. 출장마사지 선택 시 최우선 안전 수칙: 선입금 절대 금지'] },
      { tag: 'p', children: ['정상적인 전문 플랫폼은 매니저가 현장에 도착하여 대면하기 전까지 단 1원의 예약금, 보증금, 이동비도 요구하지 않습니다. 사전에 계좌 이체나 상품권 결제를 요구하는 곳은 100% 사기이므로 즉시 상담을 중단해야 합니다.'] },
      { tag: 'p', children: [
        '피싱 사기 수법에 관한 상세 분석은 ',
        { tag: 'a', attrs: { href: `${SITE_URL}/guide/outcall-massage-scam-prevention-comparison` }, children: ['선입금 사기 예방 완벽 가이드'] },
        ' 및 ',
        { tag: 'a', attrs: { href: `${SITE_URL}/seo/${encodeURIComponent(item.kw)}` }, children: [`${item.kw} vs 아밤 서비스 비교`] },
        '에서 확인하실 수 있습니다.'
      ]},
      { tag: 'h3', children: ['2. 아밤(Abam.kr)의 3대 핵심 차별화 원칙'] },
      { tag: 'p', children: ['① 100% 현장 대면결제: 매니저 도착 후 현금·계좌이체·카드 결제\n② 전원 20대 전문 에이스 관리사 라인업 상시 배치\n③ 서울·수도권 30분 총알 도착 권역별 대기조 네트워크 운영'] },
      { tag: 'p', children: [
        '상세 비교 및 실시간 예약 현황은 ',
        { tag: 'a', attrs: { href: `${SITE_URL}/guide/outcall-massage-platform-ranking-comparison` }, children: ['출장마사지 플랫폼 순위 및 비교'] },
        ' 및 ',
        { tag: 'a', attrs: { href: SITE_URL }, children: ['아름다운밤 [아밤.Abam.kr] 공식 홈페이지'] },
        '를 참조하시기 바랍니다.'
      ]}
    ]
  };
}

function buildWellnessArticle(item) {
  return {
    title: `${item.title} [아름다운밤 아밤]`,
    content: [
      { tag: 'p', children: [`현대인의 일상 피로와 스트레스 해소를 위한 전문 테라피 리포트입니다. ${item.focus}에 특화된 1:1 방문 홈케어의 올바른 활용법을 안내합니다.`] },
      { tag: 'h3', children: ['1. 방문 홈케어 테라피의 생체 이완 메커니즘'] },
      { tag: 'p', children: ['외부 샵까지 직접 이동할 필요 없이 자신이 머무는 가장 안락한 공간(자택 침실 또는 호텔 룸)에서 받는 마사지는 심리적 안정감을 극대화하고 이완 효과를 200% 배가시킵니다.'] },
      { tag: 'p', children: [
        '전문 힐러의 맞춤 수기 요법에 대한 상세 안내는 ',
        { tag: 'a', attrs: { href: `${SITE_URL}/seo/%EC%84%9C%EC%9A%B8%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80` }, children: ['서울출장마사지 1위 아밤'] },
        ' 및 ',
        { tag: 'a', attrs: { href: `${SITE_URL}/seo/%EA%B2%BD%EA%B8%B0%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80` }, children: ['경기출장마사지 1위 아밤'] },
        '에서 확인하실 수 있습니다.'
      ]},
      { tag: 'h3', children: ['2. 청결과 안전을 보장하는 정찰제 이용 수칙'] },
      { tag: 'p', children: ['아밤(Abam.kr)은 모든 위생 매트와 일회용 소모품을 매니저가 직접 완비하여 방문하며, 예약금 없는 100% 현장 대면결제 시스템으로 운영됩니다. 타이 60분 8만, 아로마 60분 9만, 스페셜 60분 10만 원의 정찰제로 추가금 걱정 없이 안심하고 이용하실 수 있습니다.'] },
      { tag: 'p', children: [
        '자세한 예약 요령은 ',
        { tag: 'a', attrs: { href: `${SITE_URL}/guide/how-to-book-outcall-massage` }, children: ['출장마사지 예약 방법 가이드'] },
        ' 및 ',
        { tag: 'a', attrs: { href: SITE_URL }, children: ['아름다운밤 [아밤.Abam.kr] 포털'] },
        '에서 확인 가능합니다.'
      ]}
    ]
  };
}

async function main() {
  console.log('========================================================');
  console.log('  아밤(Abam.kr) 고권위(DA 93) 대량 백링크 양성 파이프라인 가동');
  console.log('========================================================');

  // Telegraph 계정 생성
  console.log('\n[1/4] Telegraph 고권위 세션 생성 중...');
  const accRes = await fetch('https://api.telegra.ph/createAccount?short_name=abam_hub&author_name=아름다운밤공식네트워크');
  const accData = await accRes.json();
  if (!accData.ok) {
    throw new Error('Telegraph 계정 생성 실패: ' + JSON.stringify(accData));
  }
  const token = accData.result.access_token;
  console.log('✔ Telegraph 계정 인증 성공 (Access Token 획득)');

  const allArticles = [
    ...SEOUL_DISTRICTS.map(buildDistrictArticle),
    ...METRO_HUBS.map(buildMetroArticle),
    ...COMPETITOR_TOPICS.map(buildCompetitorArticle),
    ...WELLNESS_TOPICS.map(buildWellnessArticle)
  ];

  console.log(`\n[2/4] 총 ${allArticles.length}개의 고권위 백링크 아티클 퍼블리싱 시작...`);

  const outPath = path.join(process.cwd(), 'scripts', 'published-backlinks.json');
  let publishedLinks = [];
  if (fs.existsSync(outPath)) {
    try {
      publishedLinks = JSON.parse(fs.readFileSync(outPath, 'utf8'));
    } catch {
      publishedLinks = [];
    }
  }

  const newlyPublishedUrls = [];
  let successCount = 0;

  for (let i = 0; i < allArticles.length; i++) {
    const art = allArticles[i];
    try {
      const res = await fetch('https://api.telegra.ph/createPage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: token,
          title: art.title,
          author_name: '아름다운밤 [아밤.Abam.kr]',
          author_url: SITE_URL,
          content: art.content,
          return_content: false
        })
      });

      const d = await res.json();
      if (d.ok) {
        successCount++;
        const publishedUrl = `https://telegra.ph/${d.result.path}`;
        console.log(`[${i + 1}/${allArticles.length}] ✔ ${art.title.slice(0, 26)}... -> ${publishedUrl}`);
        
        publishedLinks.unshift({
          title: art.title,
          url: publishedUrl,
          date: new Date().toISOString()
        });
        newlyPublishedUrls.push(publishedUrl);
      } else {
        console.log(`[${i + 1}/${allArticles.length}] ✖ 퍼블리싱 실패:`, d.error);
        if (d.error && d.error.includes('FLOOD_WAIT')) {
          console.log('Flood wait 감지, 3초간 대기...');
          await new Promise(r => setTimeout(r, 3000));
        }
      }
    } catch (err) {
      console.log(`[${i + 1}/${allArticles.length}] ✖ 네트워크 에러:`, err.message);
    }

    // Telegraph Rate Limit 준수
    await new Promise(r => setTimeout(r, 400));
  }

  // 3. 결과 파일 최종 저장
  fs.writeFileSync(outPath, JSON.stringify(publishedLinks, null, 2), 'utf8');
  console.log(`\n[3/4] 신규 ${successCount}개 / 누적 총 ${publishedLinks.length}개의 고권위 백링크가 영구 저장되었습니다: ${outPath}`);

  // 4. IndexNow로 검색엔진에 실시간 핑 전송
  console.log('\n[4/4] IndexNow로 검색엔진 일괄 핑 전송 중...');
  try {
    const INDEXNOW_KEY = 'abam1234567890abcdefabcdefabcdef';
    const host = new URL(SITE_URL).host;

    const pingUrls = [
      SITE_URL,
      `${SITE_URL}/keywords`,
      `${SITE_URL}/guide`,
      `${SITE_URL}/guide/outcall-massage-scam-prevention-comparison`,
      `${SITE_URL}/guide/chuljang-massage-price`,
      `${SITE_URL}/seo/%EC%84%9C%EC%9A%B8%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80`,
      `${SITE_URL}/seo/%EA%B2%BD%EA%B8%B0%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80`,
      `${SITE_URL}/seo/%EA%B0%95%EB%82%A8%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80`,
      `${SITE_URL}/seo/%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%801%EC%9C%84`,
      `${SITE_URL}/seo/%EB%8F%84%EB%8F%84%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80`,
      `${SITE_URL}/seo/%EC%8A%A4%ED%94%BC%EB%93%9C%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80`,
    ];

    const r = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: pingUrls
      })
    });
    console.log(`✔ IndexNow 핑 응답 상태: HTTP ${r.status}`);
  } catch (e) {
    console.log('IndexNow 핑 스킵:', e.message);
  }

  console.log('\n========================================================');
  console.log(`  대량 백링크 양성 완료: 이번 회차 ${successCount}개 추가 발행 성공`);
  console.log('========================================================');
}

main().catch(console.error);
