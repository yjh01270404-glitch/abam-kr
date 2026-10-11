// scripts/build-parasite-network.mjs
// GitHub Pages (github.io DA 96) 기생 SEO 정적 고권위 웹사이트 생성기
// [핵심] Google Local Intent & Proximity 알고리즘 대응:
// 1) 각 지역별 정밀 위도/경도(GeoCoordinates) & Geo Meta Tags (<meta name="geo.position">, <meta name="ICBM">)
// 2) Schema.org areaServed 동/상권 세분화
// 3) 브라우저 실시간 위치 감지(Geo-Personalization) 배너 탑재

import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://abam.kr';
const GITHUB_REPO_URL = 'https://yjh01270404-glitch.github.io/abam-kr';
const OUT_DIR = path.join(process.cwd(), 'parasite-site');

const SEOUL_DISTRICTS = [
  { slug: 'gangnam', name: '강남구', short: '강남', hubs: '역삼·논현·삼성·선릉·청담·대치', desc: '테헤란로 IT 밸리 및 호텔 밀집 지역 30분 총알 도착', region: 'KR-11', placename: '서울특별시 강남구', lat: 37.497952, lng: 127.027619 },
  { slug: 'seocho', name: '서초구', short: '서초', hubs: '반포·교대·양재·서초동·잠원·방배', desc: '고속터미널 및 반포 호텔·고급 주거지 프라이빗 케어', region: 'KR-11', placename: '서울특별시 서초구', lat: 37.483712, lng: 127.032411 },
  { slug: 'songpa', name: '송파구', short: '송파', hubs: '잠실·방이·문정·석촌·가락·삼전', desc: '롯데월드타워·방이동 비즈니스 호텔 및 문정 법조타운', region: 'KR-11', placename: '서울특별시 송파구', lat: 37.514575, lng: 127.105856 },
  { slug: 'mapo', name: '마포구', short: '마포', hubs: '홍대·합정·상암·공덕·망원·연남', desc: '홍대 상권 및 상암 미디어시티 직장인 안심 홈케어', region: 'KR-11', placename: '서울특별시 마포구', lat: 37.566324, lng: 126.901614 },
  { slug: 'yongsan', name: '용산구', short: '용산', hubs: '한남·이태원·용산역·삼각지·동부이촌', desc: '외국인 투숙객 및 서울 도심 비즈니스 호텔 맞춤 서비스', region: 'KR-11', placename: '서울특별시 용산구', lat: 37.532600, lng: 126.990000 },
  { slug: 'yeongdeungpo', name: '영등포구', short: '영등포', hubs: '여의도·당산·문래·영등포동·신길', desc: '여의도 금융가 직장인 및 호텔 투숙객 1:1 방문', region: 'KR-11', placename: '서울특별시 영등포구', lat: 37.526436, lng: 126.896204 },
  { slug: 'seongdong', name: '성동구', short: '성동', hubs: '성수·왕십리·뚝섬·옥수·금호·행당', desc: '성수동 카페거리 및 왕십리 교통 요충지 빠른 매니저 출발', region: 'KR-11', placename: '서울특별시 성동구', lat: 37.563456, lng: 127.036921 },
  { slug: 'gwangjin', name: '광진구', short: '광진', hubs: '건대·구의·자양·광장동·화양·군자', desc: '건대 입구 및 광진 호텔·오피스텔 프라이빗 테라피', region: 'KR-11', placename: '서울특별시 광진구', lat: 37.538568, lng: 127.082386 },
  { slug: 'dongjak', name: '동작구', short: '동작', hubs: '사당·이수·노량진·상도동·대방·흑석', desc: '사당 환승역 및 주거지 편안한 자택 방문 홈케어', region: 'KR-11', placename: '서울특별시 동작구', lat: 37.512402, lng: 126.939300 },
  { slug: 'gwanak', name: '관악구', short: '관악', hubs: '신림·봉천·서울대입구·낙성대·신대방', desc: '1~2인 가구 및 주거 밀집지 100% 현장 대면결제', region: 'KR-11', placename: '서울특별시 관악구', lat: 37.478406, lng: 126.951559 },
  { slug: 'seodaemun', name: '서대문구', short: '서대문', hubs: '신촌·연희·홍제·충정로·남가좌·북가좌', desc: '신촌 상권 및 충정로 업무지구 힐링 방문 마사지', region: 'KR-11', placename: '서울특별시 서대문구', lat: 37.579116, lng: 126.936778 },
  { slug: 'jongno', name: '종로구', short: '종로', hubs: '광화문·인사동·종로3가·혜화·평창·익선', desc: '광화문 정부청사·비즈니스 호텔 투숙객 안심 케어', region: 'KR-11', placename: '서울특별시 종로구', lat: 37.573050, lng: 126.979400 },
  { slug: 'junggu', name: '중구', short: '중구', hubs: '명동·을지로·충무로·동대문·남대문·회현', desc: '명동·동대문 호텔 밀집 구역 1층 로비 대면 미팅', region: 'KR-11', placename: '서울특별시 중구', lat: 37.563843, lng: 126.997602 },
  { slug: 'dongdaemun', name: '동대문구', short: '동대문', hubs: '청량리·장안동·답십리·회기·이문·휘경', desc: '장안동·답십리 주거지 및 청량리 교통 허브 출장', region: 'KR-11', placename: '서울특별시 동대문구', lat: 37.574363, lng: 127.039600 },
  { slug: 'seongbuk', name: '성북구', short: '성북', hubs: '길음·성신여대·종암·돈암·안암·정릉', desc: '길음 뉴타운 및 아파트 대단지 자택 방문 힐링 케어', region: 'KR-11', placename: '서울특별시 성북구', lat: 37.589116, lng: 127.018215 },
  { slug: 'gangbuk', name: '강북구', short: '강북', hubs: '수유·미아·번동·우이동·삼양·송중', desc: '수유역 먹자골목 및 미아사거리 프라이빗 테라피', region: 'KR-11', placename: '서울특별시 강북구', lat: 37.639610, lng: 127.025538 },
  { slug: 'dobong', name: '도봉구', short: '도봉', hubs: '창동·쌍문·방학·도봉동·도봉산', desc: '창동역 환승 거점 및 주거 단지 전문 매니저 방문', region: 'KR-11', placename: '서울특별시 도봉구', lat: 37.668768, lng: 127.047163 },
  { slug: 'nowon', name: '노원구', short: '노원', hubs: '상계·중계·하계·공릉·월계', desc: '노원 대단지 아파트 및 직장인 힐링 맞춤 케어', region: 'KR-11', placename: '서울특별시 노원구', lat: 37.654200, lng: 127.056800 },
  { slug: 'jungnang', name: '중랑구', short: '중랑', hubs: '상봉·면목·망우·중화·신내·묵동', desc: '상봉역 엔터식스 상권 및 면목동 프라이빗 홈케어', region: 'KR-11', placename: '서울특별시 중랑구', lat: 37.606600, lng: 127.092700 },
  { slug: 'gangseo', name: '강서구', short: '강서', hubs: '마곡·발산·화곡·염창·가양·등촌', desc: '마곡 R&D 산업단지 직장인 및 김포공항 투숙객', region: 'KR-11', placename: '서울특별시 강서구', lat: 37.550937, lng: 126.849532 },
  { slug: 'yangcheon', name: '양천구', short: '양천', hubs: '목동·신정·신월·오목교', desc: '목동 주상복합 및 아파트 단지 안심 방문 케어', region: 'KR-11', placename: '서울특별시 양천구', lat: 37.516900, lng: 126.866500 },
  { slug: 'guro', name: '구로구', short: '구로', hubs: '구로디지털·신도림·구로동·오류·개봉', desc: '구디 IT 밸리 직장인 및 디큐브시티 호텔', region: 'KR-11', placename: '서울특별시 구로구', lat: 37.495400, lng: 126.887400 },
  { slug: 'geumcheon', name: '금천구', short: '금천', hubs: '가산디지털·독산·시흥·가산동', desc: '가산디지털단지 IT 야근 직장인 피로회복 전문', region: 'KR-11', placename: '서울특별시 금천구', lat: 37.456800, lng: 126.895500 },
  { slug: 'eunpyeong', name: '은평구', short: '은평', hubs: '연신내·불광·응암·진관·녹번·구파발', desc: '은평뉴타운 및 연신내 중심가 100% 후불 케어', region: 'KR-11', placename: '서울특별시 은평구', lat: 37.602700, lng: 126.929100 },
  { slug: 'gangdong', name: '강동구', short: '강동', hubs: '천호·암사·길동·명일·고덕·둔촌', desc: '천호 로데오거리 및 고덕 비즈밸리 30분 총알 도착', region: 'KR-11', placename: '서울특별시 강동구', lat: 37.530100, lng: 127.123800 }
];

const METRO_HUBS = [
  { slug: 'suwon', name: '수원시', short: '수원', hubs: '인계동·영통·광교·수원역·매탄·권선·팔달', desc: '삼성전자 영통 사업장 및 인계동 호텔가 전역 30분 도착', region: 'KR-41', placename: '경기도 수원시', lat: 37.263573, lng: 127.028601 },
  { slug: 'incheon', name: '인천광역시', short: '인천', hubs: '송도·청라·부평·구월·주안·연수', desc: '송도국제도시 호텔 및 부평·구월 번화가 안심 홈타이', region: 'KR-28', placename: '인천광역시', lat: 37.456255, lng: 126.705206 },
  { slug: 'bundang', name: '성남시 분당·판교', short: '분당', hubs: '판교테크노밸리·서현·정자·야탑·미금·이매', desc: '판교 IT 기업 임직원 및 정자동 주상복합 1:1 전담', region: 'KR-41', placename: '경기도 성남시 분당구', lat: 37.382698, lng: 127.118905 },
  { slug: 'ilsan', name: '고양시 일산', short: '일산', hubs: '라페스타·웨스턴돔·킨텍스·백석·주엽·마두', desc: '킨텍스 전시장 출장객 및 일산 호수공원 호텔 투숙객', region: 'KR-41', placename: '경기도 고양시 일산동구', lat: 37.658364, lng: 126.772535 },
  { slug: 'bucheon', name: '부천시', short: '부천', hubs: '중동·상동·부천역·신중동·송내·소사', desc: '부천 중동 롯데·현대백화점 인근 및 상동 호텔', region: 'KR-41', placename: '경기도 부천시', lat: 37.503414, lng: 126.766031 },
  { slug: 'anyang', name: '안양시', short: '안양', hubs: '평촌·범계·인덕원·안양역·명학·석수', desc: '평촌 스마트스퀘어 및 범계역 로데오 안심 대면결제', region: 'KR-41', placename: '경기도 안양시', lat: 37.394253, lng: 126.956821 },
  { slug: 'pyeongtaek', name: '평택시', short: '평택', hubs: '고덕국제신도시·송탄·평택역·포승·서정리', desc: '삼성전자 고덕캠퍼스 엔지니어 및 송탄 미군기지 호텔', region: 'KR-41', placename: '경기도 평택시', lat: 36.992107, lng: 127.112945 },
  { slug: 'dongtan', name: '화성시 동탄', short: '동탄', hubs: '동탄1·2신도시·반송동·영천동·오산동·병점', desc: '동탄 테크노밸리 및 호수공원 주거단지 프라이빗 방문', region: 'KR-41', placename: '경기도 화성시 동탄', lat: 37.199493, lng: 127.072792 },
  { slug: 'gimpo', name: '김포시', short: '김포', hubs: '구래동·장기동·풍무동·사우동·걸포·운양', desc: '구래동 중심상권 및 한강신도시 자택·호텔 맞춤 케어', region: 'KR-41', placename: '경기도 김포시', lat: 37.615246, lng: 126.715732 }
];

function getCommonStyles() {
  return `
    :root {
      --bg: #07090e;
      --card: #0f1422;
      --card-border: #1e293b;
      --text: #e2e8f0;
      --text-muted: #94a3b8;
      --primary: #f59e0b;
      --primary-hover: #d97706;
      --accent: #3b82f6;
      --red: #ef4444;
      --green: #10b981;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
      line-height: 1.65;
      padding-bottom: 90px;
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; text-decoration: none; }
    .container { max-width: 860px; margin: 0 auto; padding: 0 16px; }
    
    /* Header */
    header {
      background: rgba(15, 20, 34, 0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--card-border);
      position: sticky;
      top: 0;
      z-index: 50;
      padding: 14px 0;
    }
    .nav-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-size: 1.4rem;
      font-weight: 900;
      background: linear-gradient(135deg, #f59e0b, #fbbf24);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.5px;
    }
    .badge-verified {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 9999px;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }
    
    /* Geo Location Banner */
    .geo-live-banner {
      background: rgba(59, 130, 246, 0.12);
      border: 1px solid rgba(59, 130, 246, 0.35);
      border-radius: 10px;
      padding: 10px 14px;
      margin: 14px 0 6px;
      font-size: 0.88rem;
      color: #93c5fd;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 700;
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      background: #34d399;
      border-radius: 50%;
      display: inline-block;
      margin-right: 6px;
      box-shadow: 0 0 8px #34d399;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.85); } }

    /* Hero */
    .hero {
      text-align: center;
      padding: 30px 0 24px;
      background: radial-gradient(circle at top, rgba(245, 158, 11, 0.08) 0%, transparent 70%);
      border-bottom: 1px solid rgba(30, 41, 59, 0.5);
    }
    .hero-badge {
      display: inline-block;
      background: rgba(245, 158, 11, 0.12);
      color: #f59e0b;
      border: 1px solid rgba(245, 158, 11, 0.3);
      padding: 5px 12px;
      border-radius: 9999px;
      font-size: 0.82rem;
      font-weight: 700;
      margin-bottom: 14px;
    }
    h1 {
      font-size: 1.95rem;
      font-weight: 900;
      line-height: 1.35;
      letter-spacing: -0.8px;
      margin-bottom: 14px;
      color: #ffffff;
    }
    .hero-sub {
      font-size: 1.02rem;
      color: var(--text-muted);
      max-width: 680px;
      margin: 0 auto 20px;
      word-break: keep-all;
    }
    
    /* Notice Card */
    .notice-card {
      background: rgba(239, 68, 68, 0.07);
      border: 1px solid rgba(239, 68, 68, 0.25);
      border-radius: 12px;
      padding: 16px;
      margin: 20px 0;
      text-align: left;
    }
    .notice-title {
      font-weight: 800;
      color: #f87171;
      font-size: 0.95rem;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .notice-list {
      list-style: none;
      font-size: 0.88rem;
      color: #cbd5e1;
    }
    .notice-list li {
      margin-bottom: 6px;
      padding-left: 18px;
      position: relative;
    }
    .notice-list li::before {
      content: "✔";
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: bold;
    }

    /* Section Cards */
    .section-title {
      font-size: 1.35rem;
      font-weight: 800;
      margin: 32px 0 16px;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-title::before {
      content: "";
      width: 4px;
      height: 20px;
      background: var(--primary);
      border-radius: 2px;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 16px;
    }
    
    /* Price Grid */
    .price-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 14px;
      margin-top: 12px;
    }
    .price-card {
      background: rgba(15, 20, 34, 0.6);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 16px;
      text-align: center;
    }
    .price-card.featured {
      border-color: rgba(245, 158, 11, 0.4);
      background: rgba(245, 158, 11, 0.04);
    }
    .course-name { font-size: 1.1rem; font-weight: 800; color: #fff; margin-bottom: 6px; }
    .course-price { font-size: 1.45rem; font-weight: 900; color: var(--primary); margin: 6px 0; }
    .course-desc { font-size: 0.82rem; color: var(--text-muted); }
    
    /* Region Grid */
    .region-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 8px;
      margin-top: 12px;
    }
    .region-pill {
      background: #13192b;
      border: 1px solid #1e293b;
      padding: 10px 8px;
      border-radius: 8px;
      text-align: center;
      font-size: 0.85rem;
      font-weight: 600;
      color: #cbd5e1;
      transition: all 0.15s ease;
      display: block;
    }
    .region-pill:hover {
      background: rgba(245, 158, 11, 0.15);
      border-color: var(--primary);
      color: #ffffff;
      transform: translateY(-2px);
    }
    
    /* FAQ Accordion */
    .faq-item {
      border-bottom: 1px solid var(--card-border);
      padding: 14px 0;
    }
    .faq-item:last-child { border-bottom: none; }
    .faq-q { font-weight: 700; color: #ffffff; font-size: 0.95rem; margin-bottom: 6px; }
    .faq-a { font-size: 0.88rem; color: var(--text-muted); word-break: keep-all; }
    
    /* Floating Bottom Action Bar */
    .bottom-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(10, 14, 26, 0.95);
      backdrop-filter: blur(16px);
      border-top: 1px solid #1e293b;
      padding: 10px 16px;
      z-index: 100;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
    }
    .bottom-inner {
      max-width: 860px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1.2fr 1fr 1.3fr;
      gap: 8px;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 12px 10px;
      border-radius: 8px;
      font-weight: 800;
      font-size: 0.88rem;
      cursor: pointer;
      text-align: center;
      transition: opacity 0.15s;
    }
    .btn:active { opacity: 0.8; }
    .btn-call { background: #10b981; color: #ffffff; }
    .btn-sms { background: #3b82f6; color: #ffffff; }
    .btn-web { background: linear-gradient(135deg, #f59e0b, #d97706); color: #000000; }
  `;
}

function buildStructuredData(pageTitle, pageDesc, pageUrl, geo, hubsStr = '') {
  const hubsList = hubsStr ? hubsStr.split('·').map(h => ({
    "@type": "Place",
    "name": `${h.trim()} 상권 및 주거지`
  })) : [];

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": `${pageUrl}/#business`,
        "name": `아밤 출장마사지 (${geo.placename})`,
        "alternateName": ["Abam Massage", "아밤 출장안마"],
        "url": pageUrl,
        "telephone": "+82-10-2345-6789",
        "priceRange": "₩120,000 ~ ₩200,000",
        "paymentAccepted": "100% 현장 대면결제 (선입금·예약금 0원)",
        "currenciesAccepted": "KRW",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": geo.lat,
          "longitude": geo.lng
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": geo.placename },
          ...hubsList,
          { "@type": "AdministrativeArea", "name": "서울·경기 수도권 전역" }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "18:00",
            "closes": "05:00",
            "description": "오후 18:00 예약 접수 개시, 19:00 매니저 출발, 마지막 예약 마감 새벽 05:00"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.96",
          "reviewCount": "2418",
          "bestRating": "5",
          "worstRating": "1"
        },
        "description": pageDesc
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `${geo.placename} 선입금이나 예약금이 있나요?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "아닙니다. 아밤은 100% 현장 후불 대면결제 원칙으로 운영되며 예약금, 보증금, 유류비 등 일체의 선입금을 1원도 요구하지 않습니다."
            }
          },
          {
            "@type": "Question",
            "name": `${geo.placename} 운영시간과 예약 가능 시간은 어떻게 되나요?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "아밤의 운영시간은 오후 18시부터 예약 접수를 시작하며, 매니저는 19시부터 신속하게 출발합니다. 마지막 예약 접수는 새벽 05시에 최종 마감됩니다."
            }
          },
          {
            "@type": "Question",
            "name": "호텔이나 모텔에서 이용할 때 절차가 어떻게 되나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "호텔 및 모텔 이용 시 매니저가 1층 로비에 도착하면 고객님께서 1층에서 직접 만나 대면결제를 진행한 후, 매니저를 객실로 픽업하여 함께 올라가시는 안전한 절차로 진행됩니다."
            }
          },
          {
            "@type": "Question",
            "name": "아파트나 오피스텔 주차장 및 공동현관은 어떻게 하나요?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "주차장 및 1층 공동현관 비밀번호는 예약 시 미리 알려주시거나, 세대 호출버튼으로 개폐 가능 여부를 미리 고지해 주시면 매니저가 신속하고 프라이빗하게 방문 드립니다."
            }
          }
        ]
      }
    ]
  });
}

// 1. 메인 인덱스 생성
function generateMainIndexHtml() {
  const pageTitle = "아밤 공식 출장마사지 · 출장안마 1위 | 100% 현장 대면결제 서울·경기 전지역";
  const pageDesc = "서울 25개 구 및 수도권 전지역 30분 총알 도착. 선입금·예약금 0원 100% 현장 대면결제. 전원 20대 에이스 매니저 1:1 방문 홈케어. 자택, 오피스텔, 호텔 1층 로비 대면 미팅.";
  const pageUrl = GITHUB_REPO_URL;
  const seoulCenter = { region: 'KR-11', placename: '서울특별시', lat: 37.566535, lng: 126.977969 };

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${pageTitle}</title>
  <meta name="description" content="${pageDesc}">
  <meta name="keywords" content="출장마사지, 출장안마, 서울출장마사지, 서울출장안마, 출장홈타이, 마사지출장, 100%후불제, 20대관리사, 호텔출장마사지, 자택출장마사지">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${pageUrl}">

  <!-- [Google Local Intent] 지리 메타 태그 (Geo-Targeting Meta Tags) -->
  <meta name="geo.region" content="${seoulCenter.region}">
  <meta name="geo.placename" content="${seoulCenter.placename}">
  <meta name="geo.position" content="${seoulCenter.lat};${seoulCenter.lng}">
  <meta name="ICBM" content="${seoulCenter.lat}, ${seoulCenter.lng}">
  
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${pageDesc}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="아밤 출장마사지 공식 네트워크">
  
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
    ${buildStructuredData(pageTitle, pageDesc, pageUrl, seoulCenter, "서울 25개 구·수도권 거점")}
  </script>
  
  <style>${getCommonStyles()}</style>
</head>
<body>
  <header>
    <div class="container nav-inner">
      <div class="logo">ABAM · 아밤</div>
      <div class="badge-verified">✔ 100% 현장 대면결제 보증</div>
    </div>
  </header>

  <main class="container">
    <!-- 실시간 접속 위치 감지 배너 -->
    <div class="geo-live-banner" id="geo-banner">
      <div>
        <span class="pulse-dot"></span>
        <span id="geo-text">현재 계신 위치 주변 20대 전문 매니저 상시 배차 대기 중</span>
      </div>
      <span style="font-size: 0.78rem; color: #6ee7b7; border: 1px solid #059669; padding: 2px 6px; border-radius: 4px;">평균 30분 도착</span>
    </div>

    <div class="hero">
      <div class="hero-badge">서울 25개 구 & 경기·수도권 30분 총알 방문</div>
      <h1>대한민국 1등 출장마사지 · 출장안마<br><span style="color: #f59e0b;">100% 현장 대면결제</span> 안심 케어</h1>
      <p class="hero-sub">
        아밤(Abam)은 예약금이나 선입금을 1원도 요구하지 않습니다. 매니저가 현장에 직접 도착하여 대면한 후 결제하는 안전한 1:1 방문 테라피를 경험해 보세요.
      </p>
    </div>

    <!-- 운영 원칙 공지 -->
    <div class="notice-card">
      <div class="notice-title">📢 아밤 공식 필수 이용 안내 및 운영 원칙</div>
      <ul class="notice-list">
        <li><strong>선입금·예약금 0원:</strong> 100% 현장 대면결제 (선입금을 요구하는 유사 사칭 업체를 주의하세요).</li>
        <li><strong>운영 시간:</strong> 오후 18:00 예약 접수 개시 · 19:00 매니저 출발 · 새벽 05:00 최종 마감.</li>
        <li><strong>호텔·모텔 이용:</strong> 1층 로비에서 매니저와 만나 대면결제 후 매니저를 객실로 픽업 동행합니다.</li>
        <li><strong>주차장·공동현관:</strong> 비밀번호 사전 전달 또는 세대 호출버튼 개폐 여부를 미리 알려주세요.</li>
      </ul>
    </div>

    <!-- 정찰제 코스 요금표 -->
    <h2 class="section-title">정찰제 코스 및 가격 안내</h2>
    <div class="card">
      <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 12px;">모든 코스는 유류비·출장비 일체 포함 정찰 가격이며 현장에서 카드, 현금, 계좌이체 대면결제 가능합니다.</p>
      <div class="price-grid">
        <div class="price-card">
          <div class="course-name">타이 힐링 케어 A</div>
          <div class="course-desc">전신 건식 지압 스트레칭 (60분)</div>
          <div class="course-price">₩120,000</div>
          <div class="course-desc">뭉친 근육 집중 이완 관리</div>
        </div>
        <div class="price-card featured">
          <div style="font-size: 0.75rem; color: #f59e0b; font-weight: bold; margin-bottom: 4px;">BEST 인기 코스</div>
          <div class="course-name">아로마 림프 힐링 B</div>
          <div class="course-desc">천연 수용성 에센셜 오일 테라피 (90분)</div>
          <div class="course-price">₩150,000</div>
          <div class="course-desc">림프 순환 및 전신 피로 회복</div>
        </div>
        <div class="price-card">
          <div class="course-name">VVIP 스페셜 C</div>
          <div class="course-desc">타이 건식 + 아로마 오일 복합 (120분)</div>
          <div class="course-price">₩200,000</div>
          <div class="course-desc">머리끝부터 발끝까지 최고급 풀케어</div>
        </div>
      </div>
    </div>

    <!-- 서울 25개 자치구 빠른 이동 -->
    <h2 class="section-title">서울 25개 자치구별 출장안마 안내</h2>
    <div class="card">
      <div class="region-grid">
        ${SEOUL_DISTRICTS.map(d => `<a href="./seoul/${d.slug}.html" class="region-pill">${d.short}출장마사지</a>`).join('\n        ')}
      </div>
    </div>

    <!-- 경기/인천 수도권 거점 빠른 이동 -->
    <h2 class="section-title">경기·인천 수도권 핵심 거점 안내</h2>
    <div class="card">
      <div class="region-grid">
        ${METRO_HUBS.map(m => `<a href="./metro/${m.slug}.html" class="region-pill">${m.short}출장마사지</a>`).join('\n        ')}
      </div>
    </div>

    <!-- 자주 묻는 질문 FAQ -->
    <h2 class="section-title">자주 묻는 질문 (FAQ)</h2>
    <div class="card">
      <div class="faq-item">
        <div class="faq-q">Q. 예약금이나 선입금이 있나요?</div>
        <div class="faq-a">A. 전혀 없습니다. 아밤은 100% 현장 후불 대면결제 시스템입니다. 예약금을 요구하는 사칭 업체를 절대 주의하시기 바랍니다.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Q. 예약 및 출발 시간은 언제인가요?</div>
        <div class="faq-a">A. 오후 18시부터 예약 접수를 진행하며, 매니저는 19시부터 고객님 계신 곳으로 출발합니다. 마지막 예약은 새벽 05시에 마감됩니다.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Q. 호텔이나 모텔 객실로 바로 오나요?</div>
        <div class="faq-a">A. 고객님의 안전과 매니저 보호를 위해 호텔/모텔 이용 시 1층 로비에서 먼저 만나 대면결제를 진행한 후 매니저와 함께 객실로 이동합니다.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Q. 주차장 및 아파트 공동현관은 어떻게 통과하나요?</div>
        <div class="faq-a">A. 비밀번호를 예약 시 미리 공유해 주시거나, 세대 호출버튼으로 열어주실 수 있다고 말씀해 주시면 도착 즉시 호출 드립니다.</div>
      </div>
    </div>

    <div style="text-align: center; margin: 30px 0; color: var(--text-muted); font-size: 0.8rem;">
      <p>아밤(Abam) 공식 방문 홈케어 네트워크 · 사업자 및 프라이버시 보호 정책 준수</p>
      <p style="margin-top: 4px;">공식 웹사이트: <a href="${SITE_URL}" style="color: #f59e0b; text-decoration: underline;">https://abam.kr</a></p>
    </div>
  </main>

  <!-- Floating Mobile Bar -->
  <div class="bottom-bar">
    <div class="bottom-inner">
      <a href="tel:010-6607-2239" class="btn btn-call">📞 전화 간편예약</a>
      <a href="sms:010-6607-2239?body=아밤출장마사지예약문의" class="btn btn-sms">💬 문자 예약</a>
      <a href="${SITE_URL}" target="_blank" class="btn btn-web">🌐 아밤 메인</a>
    </div>
  </div>

  <script>
    // 브라우저 위치 신호 감지 (Local Intent 최적화)
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
          var lat = pos.coords.latitude;
          var lng = pos.coords.longitude;
          var el = document.getElementById('geo-text');
          if (el) el.innerHTML = "📍 <strong>현재 위치 주변</strong> 전문 매니저 실시간 배차 가능 (30분 도착)";
        }, function(err) {});
      }
    } catch(e) {}
  </script>
</body>
</html>`;
}

// 2. 서울 자치구별 상세 페이지 생성
function generateDistrictHtml(d) {
  const pageTitle = `[공식] ${d.name} ${d.short}출장마사지 · ${d.short}출장안마 1위 | 100% 현장대면결제 아밤`;
  const pageDesc = `${d.name}(${d.hubs}) 전지역 30분 도착. 선입금·예약금 없는 100% 현장 후불 대면결제. 전원 20대 에이스 매니저 1:1 방문 홈케어. 자택, 오피스텔, 호텔 1층 로비 대면 미팅.`;
  const pageUrl = `${GITHUB_REPO_URL}/seoul/${d.slug}.html`;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${pageTitle}</title>
  <meta name="description" content="${pageDesc}">
  <meta name="keywords" content="${d.name}출장마사지, ${d.short}출장마사지, ${d.name}출장안마, ${d.short}출장안마, ${d.hubs.replace(/·/g, '출장마사지, ')}출장마사지">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${pageUrl}">

  <!-- [Google Local Intent] 정밀 위치 메타 태그 -->
  <meta name="geo.region" content="${d.region}">
  <meta name="geo.placename" content="${d.placename}">
  <meta name="geo.position" content="${d.lat};${d.lng}">
  <meta name="ICBM" content="${d.lat}, ${d.lng}">
  
  <meta property="og:type" content="article">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${pageDesc}">
  <meta property="og:url" content="${pageUrl}">
  
  <script type="application/ld+json">
    ${buildStructuredData(pageTitle, pageDesc, pageUrl, d, d.hubs)}
  </script>
  <style>${getCommonStyles()}</style>
</head>
<body>
  <header>
    <div class="container nav-inner">
      <a href="../index.html" class="logo">ABAM · ${d.short}</a>
      <div class="badge-verified">✔ 100% 현장 대면결제</div>
    </div>
  </header>

  <main class="container">
    <div class="geo-live-banner">
      <div>
        <span class="pulse-dot"></span>
        <span>📍 <strong>${d.name} (${d.hubs})</strong> 상주 매니저 출발 대기 중</span>
      </div>
      <span style="font-size: 0.78rem; color: #6ee7b7; border: 1px solid #059669; padding: 2px 6px; border-radius: 4px;">30분 도착 보증</span>
    </div>

    <div class="hero">
      <div class="hero-badge">${d.name} 전지역 30분 총알 도착</div>
      <h1>${d.name} ${d.short}출장마사지 · 출장안마<br><span style="color: #f59e0b;">100% 현장 후불 대면결제</span></h1>
      <p class="hero-sub">${d.desc}. ${d.hubs} 일대 자택, 오피스텔, 호텔 어디든 전문 매니저가 신속하게 방문합니다.</p>
    </div>

    <div class="notice-card">
      <div class="notice-title">📢 ${d.name} 출장 테라피 필수 안심 원칙</div>
      <ul class="notice-list">
        <li><strong>선입금 0원:</strong> 매니저 대면 후 결제 (선입금 요구 시 100% 사기입니다).</li>
        <li><strong>운영시간:</strong> 18:00 예약 접수 개시 · 19:00 매니저 출발 · 새벽 05:00 최종 마감.</li>
        <li><strong>호텔·모텔 이용:</strong> 1층 로비에서 매니저를 만나 대면결제 후 객실로 픽업 동행합니다.</li>
        <li><strong>공동현관/주차장:</strong> 비밀번호 사전 전달 또는 세대 호출버튼 개폐 여부를 알려주세요.</li>
      </ul>
    </div>

    <h2 class="section-title">${d.short} 정찰제 가격표</h2>
    <div class="card">
      <div class="price-grid">
        <div class="price-card">
          <div class="course-name">타이 힐링 A (60분)</div>
          <div class="course-price">₩120,000</div>
          <div class="course-desc">전신 건식 지압 스트레칭</div>
        </div>
        <div class="price-card featured">
          <div style="font-size: 0.75rem; color: #f59e0b; font-weight: bold; margin-bottom: 4px;">BEST 추천</div>
          <div class="course-name">아로마 림프 B (90분)</div>
          <div class="course-price">₩150,000</div>
          <div class="course-desc">스위스 천연 오일 전신 순환 케어</div>
        </div>
        <div class="price-card">
          <div class="course-name">VIP 스페셜 C (120분)</div>
          <div class="course-price">₩200,000</div>
          <div class="course-desc">건식 지압 + 아로마 오일 듀얼 테라피</div>
        </div>
      </div>
    </div>

    <h2 class="section-title">${d.name} 주요 방문 거점</h2>
    <div class="card">
      <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.8;">
        아밤 ${d.short} 지점은 <strong>${d.hubs}</strong> 등 ${d.name} 전 지역 어디든 도로 상황에 맞추어 평균 30분 이내로 신속히 도착합니다.
        자택은 물론 업무 스트레스에 지친 비즈니스 출장객의 호텔 투숙 시에도 가장 쾌적하고 안전한 힐링을 선사합니다.
      </p>
      <div style="margin-top: 14px;">
        <a href="${SITE_URL}/seo/${d.slug}" style="color: #f59e0b; font-weight: 700; text-decoration: underline;">
          👉 아밤 공식 사이트에서 ${d.name} 매니저 프로필 및 상세 정보 보기
        </a>
      </div>
    </div>

    <!-- 인근 자치구 이동 -->
    <h2 class="section-title">서울 다른 자치구 둘러보기</h2>
    <div class="card">
      <div class="region-grid">
        ${SEOUL_DISTRICTS.filter(x => x.slug !== d.slug).slice(0, 10).map(x => `<a href="./${x.slug}.html" class="region-pill">${x.short}출장마사지</a>`).join('\n        ')}
      </div>
    </div>

    <div style="text-align: center; margin: 30px 0; color: var(--text-muted); font-size: 0.8rem;">
      <p>아밤(Abam) ${d.name} 지점 · 공식 웹사이트: <a href="${SITE_URL}" style="color: #f59e0b;">https://abam.kr</a></p>
    </div>
  </main>

  <div class="bottom-bar">
    <div class="bottom-inner">
      <a href="tel:010-6607-2239" class="btn btn-call">📞 ${d.short} 전화예약</a>
      <a href="sms:010-6607-2239?body=${encodeURIComponent(d.name + '출장마사지 예약문의')}" class="btn btn-sms">💬 문자예약</a>
      <a href="${SITE_URL}" target="_blank" class="btn btn-web">🌐 아밤 메인</a>
    </div>
  </div>
</body>
</html>`;
}

// 3. 경기 수도권 상세 페이지 생성
function generateMetroHtml(m) {
  const pageTitle = `[공식] ${m.name} ${m.short}출장마사지 · ${m.short}출장안마 1위 | 100% 현장대면결제 아밤`;
  const pageDesc = `${m.name}(${m.hubs}) 전지역 30분 도착. 선입금·예약금 없는 100% 현장 후불 대면결제. 전원 20대 에이스 매니저 1:1 방문 홈케어. 자택, 오피스텔, 호텔 1층 로비 대면 미팅.`;
  const pageUrl = `${GITHUB_REPO_URL}/metro/${m.slug}.html`;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${pageTitle}</title>
  <meta name="description" content="${pageDesc}">
  <meta name="keywords" content="${m.name}출장마사지, ${m.short}출장마사지, ${m.name}출장안마, ${m.short}출장안마, ${m.hubs.replace(/·/g, '출장마사지, ')}출장마사지">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${pageUrl}">

  <!-- [Google Local Intent] 정밀 위치 메타 태그 -->
  <meta name="geo.region" content="${m.region}">
  <meta name="geo.placename" content="${m.placename}">
  <meta name="geo.position" content="${m.lat};${m.lng}">
  <meta name="ICBM" content="${m.lat}, ${m.lng}">
  
  <meta property="og:type" content="article">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${pageDesc}">
  <meta property="og:url" content="${pageUrl}">
  
  <script type="application/ld+json">
    ${buildStructuredData(pageTitle, pageDesc, pageUrl, m, m.hubs)}
  </script>
  <style>${getCommonStyles()}</style>
</head>
<body>
  <header>
    <div class="container nav-inner">
      <a href="../index.html" class="logo">ABAM · ${m.short}</a>
      <div class="badge-verified">✔ 100% 현장 대면결제</div>
    </div>
  </header>

  <main class="container">
    <div class="geo-live-banner">
      <div>
        <span class="pulse-dot"></span>
        <span>📍 <strong>${m.name} (${m.hubs})</strong> 상주 매니저 출발 대기 중</span>
      </div>
      <span style="font-size: 0.78rem; color: #6ee7b7; border: 1px solid #059669; padding: 2px 6px; border-radius: 4px;">30분 도착 보증</span>
    </div>

    <div class="hero">
      <div class="hero-badge">${m.name} 30분 신속 배차 시스템</div>
      <h1>${m.name} ${m.short}출장마사지 · 출장안마<br><span style="color: #f59e0b;">100% 현장 후불 대면결제</span></h1>
      <p class="hero-sub">${m.desc}. ${m.hubs} 등 어디든 매니저가 정직하고 품격 있는 케어로 방문합니다.</p>
    </div>

    <div class="notice-card">
      <div class="notice-title">📢 ${m.name} 안심 이용 운영 정책</div>
      <ul class="notice-list">
        <li><strong>선입금 0원:</strong> 100% 현장 대면결제 (예약금 입금 요구는 100% 사기입니다).</li>
        <li><strong>운영시간:</strong> 18:00 예약 접수 개시 · 19:00 매니저 출발 · 새벽 05:00 최종 마감.</li>
        <li><strong>호텔·모텔 이용:</strong> 1층 로비에서 매니저와 만나 대면결제 후 객실로 함께 이동합니다.</li>
        <li><strong>공동현관/주차장:</strong> 비밀번호 사전 전달 또는 세대 호출버튼 개폐 여부를 알려주세요.</li>
      </ul>
    </div>

    <h2 class="section-title">${m.short} 정찰제 요금표</h2>
    <div class="card">
      <div class="price-grid">
        <div class="price-card">
          <div class="course-name">타이 힐링 A (60분)</div>
          <div class="course-price">₩120,000</div>
          <div class="course-desc">전신 건식 지압 스트레칭</div>
        </div>
        <div class="price-card featured">
          <div style="font-size: 0.75rem; color: #f59e0b; font-weight: bold; margin-bottom: 4px;">BEST 추천</div>
          <div class="course-name">아로마 림프 B (90분)</div>
          <div class="course-price">₩150,000</div>
          <div class="course-desc">스위스 천연 오일 전신 순환 케어</div>
        </div>
        <div class="price-card">
          <div class="course-name">VIP 스페셜 C (120분)</div>
          <div class="course-price">₩200,000</div>
          <div class="course-desc">건식 지압 + 아로마 오일 듀얼 테라피</div>
        </div>
      </div>
    </div>

    <h2 class="section-title">${m.name} 주요 서비스 거점</h2>
    <div class="card">
      <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.8;">
        아밤 ${m.short} 센터는 <strong>${m.hubs}</strong> 등 관내 주요 아파트 단지 및 상업지구 인근에서 상시 대기하여 지체 없는 30분대 방문을 약속드립니다.
      </p>
      <div style="margin-top: 14px;">
        <a href="${SITE_URL}/seo/${m.slug}" style="color: #f59e0b; font-weight: 700; text-decoration: underline;">
          👉 아밤 공식 사이트에서 ${m.name} 상세 코스 및 매니저 안내 보기
        </a>
      </div>
    </div>

    <div style="text-align: center; margin: 30px 0; color: var(--text-muted); font-size: 0.8rem;">
      <p>아밤(Abam) ${m.name} 지점 · 공식 웹사이트: <a href="${SITE_URL}" style="color: #f59e0b;">https://abam.kr</a></p>
    </div>
  </main>

  <div class="bottom-bar">
    <div class="bottom-inner">
      <a href="tel:010-6607-2239" class="btn btn-call">📞 ${m.short} 전화예약</a>
      <a href="sms:010-6607-2239?body=${encodeURIComponent(m.name + '출장마사지 예약문의')}" class="btn btn-sms">💬 문자예약</a>
      <a href="${SITE_URL}" target="_blank" class="btn btn-web">🌐 아밤 메인</a>
    </div>
  </div>
</body>
</html>`;
}

// 4. 사이트맵 생성
function generateSitemapXml() {
  const urls = [
    `${GITHUB_REPO_URL}/`,
    ...SEOUL_DISTRICTS.map(d => `${GITHUB_REPO_URL}/seoul/${d.slug}.html`),
    ...METRO_HUBS.map(m => `${GITHUB_REPO_URL}/metro/${m.slug}.html`)
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`).join('\n')}
</urlset>`;
}

// 5. robots.txt 생성
function generateRobotsTxt() {
  return `User-agent: *
Allow: /
Sitemap: ${GITHUB_REPO_URL}/sitemap.xml
`;
}

// 메인 빌더 실행
async function main() {
  console.log('=== [기생 SEO] Google Local Intent & Proximity 최적화 빌드 시작 ===');
  
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }
  const seoulDir = path.join(OUT_DIR, 'seoul');
  const metroDir = path.join(OUT_DIR, 'metro');
  fs.mkdirSync(seoulDir, { recursive: true });
  fs.mkdirSync(metroDir, { recursive: true });

  // 1. 메인 인덱스
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), generateMainIndexHtml(), 'utf8');
  console.log('✔ 메인 index.html 생성 완료 (지리 메타태그 & Live Geo-Banner 탑재)');

  // 2. 서울 25개 자치구
  for (const d of SEOUL_DISTRICTS) {
    fs.writeFileSync(path.join(seoulDir, `${d.slug}.html`), generateDistrictHtml(d), 'utf8');
  }
  console.log(`✔ 서울 25개 자치구 정밀 좌표(lat/lng) 및 areaServed 탑재 완료 (${SEOUL_DISTRICTS.length}개)`);

  // 3. 경기 9개 거점
  for (const m of METRO_HUBS) {
    fs.writeFileSync(path.join(metroDir, `${m.slug}.html`), generateMetroHtml(m), 'utf8');
  }
  console.log(`✔ 경기·인천 9개 거점 정밀 좌표 탑재 완료 (${METRO_HUBS.length}개)`);

  // 4. sitemap.xml & robots.txt
  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), generateSitemapXml(), 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), generateRobotsTxt(), 'utf8');
  console.log('✔ sitemap.xml 및 robots.txt 생성 완료');

  console.log('\n=== [빌드 완료] 총 35개 Local Intent 정밀 타깃팅 SEO 페이지 빌드 완료 ===');
}

main().catch(console.error);
