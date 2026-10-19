// scripts/generate-station-parasite-network.mjs
// GitHub Pages (github.io DA 96) 고권위 도메인을 활용한 서울·수도권 50대 핵심 역세권 전용 침투 페이지 생성기

import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'parasite-site');
const STATION_DIR = path.join(OUT_DIR, 'station');

if (!fs.existsSync(STATION_DIR)) {
  fs.mkdirSync(STATION_DIR, { recursive: true });
}

const STATIONS = [
  // 강남·서초권
  { slug: 'gangnam-station', name: '강남역', district: '강남구', lat: 37.4979, lng: 127.0276, hotels: '신라스테이 역삼·L7 강남·오클라우드' },
  { slug: 'yeoksam-station', name: '역삼역', district: '강남구', lat: 37.5006, lng: 127.0365, hotels: '조선팰리스·센터필드·머큐어' },
  { slug: 'seolleung-station', name: '선릉역', district: '강남구', lat: 37.5045, lng: 127.0490, hotels: 'L7 선릉·신라스테이 삼성' },
  { slug: 'samseong-station', name: '삼성역', district: '강남구', lat: 37.5088, lng: 127.0631, hotels: '그랜드 인터컨티넨탈·파크하얏트' },
  { slug: 'nonhyeon-station', name: '논현역', district: '강남구', lat: 37.5111, lng: 127.0215, hotels: '보코서울강남·호텔 안테룸' },
  { slug: 'sinsa-station', name: '신사역', district: '강남구', lat: 37.5163, lng: 127.0202, hotels: '포포인츠 강남·리버사이드' },
  { slug: 'cheongdam-station', name: '청담역', district: '강남구', lat: 37.5194, lng: 127.0537, hotels: '엔트라 호텔·알로프트 서울' },
  { slug: 'apgujeong-station', name: '압구정역', district: '강남구', lat: 37.5270, lng: 127.0284, hotels: '안다즈 서울 강남' },
  { slug: 'yangjae-station', name: '양재역', district: '서초구', lat: 37.4842, lng: 127.0345, hotels: '힐튼 가든 인·더케이호텔' },
  { slug: 'express-bus-terminal', name: '고속터미널역', district: '서초구', lat: 37.5049, lng: 127.0049, hotels: 'JW 메리어트 서울' },
  { slug: 'gyodae-station', name: '교대역', district: '서초구', lat: 37.4934, lng: 127.0142, hotels: '서초 비즈니스 호텔' },
  // 송파·강동권
  { slug: 'jamsil-station', name: '잠실역', district: '송파구', lat: 37.5133, lng: 127.1001, hotels: '시그니엘 서울·소피텔 앰배서더·롯데호텔월드' },
  { slug: 'munjeong-station', name: '문정역', district: '송파구', lat: 37.4859, lng: 127.1225, hotels: '호텔 파크하비오' },
  { slug: 'cheonho-station', name: '천호역', district: '강동구', lat: 37.5385, lng: 127.1235, hotels: '천호 로데오 비즈니스 호텔' },
  // 마포·서대문·용산권
  { slug: 'hongdae-station', name: '홍대입구역', district: '마포구', lat: 37.5575, lng: 126.9245, hotels: '라이즈 오토그래프·머큐어 앰배서더 홍대' },
  { slug: 'hapjeong-station', name: '합정역', district: '마포구', lat: 37.5495, lng: 126.9137, hotels: '합정역 부티크 호텔' },
  { slug: 'gongdeok-station', name: '공덕역', district: '마포구', lat: 37.5444, lng: 126.9515, hotels: '글래드 마포·신라스테이 마포·롯데시티호텔' },
  { slug: 'sinchon-station', name: '신촌역', district: '서대문구', lat: 37.5552, lng: 126.9369, hotels: '신촌 가비호텔' },
  { slug: 'yongsan-station', name: '용산역', district: '용산구', lat: 37.5298, lng: 126.9647, hotels: '서울드래곤시티(노보텔·이비스)' },
  { slug: 'itaewon-station', name: '이태원역', district: '용산구', lat: 37.5345, lng: 126.9946, hotels: '몬드리안 서울 이태원·해밀톤' },
  // 영등포·구로·금천권
  { slug: 'yeouido-station', name: '여의도역', district: '영등포구', lat: 37.5216, lng: 126.9242, hotels: '콘래드 서울·페어몬트 앰배서더·글래드 여의도' },
  { slug: 'yeongdeungpo-station', name: '영등포역', district: '영등포구', lat: 37.5156, lng: 126.9076, hotels: '코트야드 메리어트 타임스퀘어' },
  { slug: 'dangsan-station', name: '당산역', district: '영등포구', lat: 37.5349, lng: 126.9027, hotels: '호텔 로프트' },
  { slug: 'sindorim-station', name: '신도림역', district: '구로구', lat: 37.5088, lng: 126.8913, hotels: '쉐라톤 디큐브시티' },
  { slug: 'guro-digital-station', name: '구로디지털단지역', district: '구로구', lat: 37.4852, lng: 126.9015, hotels: '포포인츠 바이 쉐라톤 구로' },
  { slug: 'gasan-digital-station', name: '가산디지털단지역', district: '금천구', lat: 37.4811, lng: 126.8826, hotels: '골드리버 호텔' },
  // 종로·중구권
  { slug: 'gwanghwamun-station', name: '광화문역', district: '종로구', lat: 37.5716, lng: 126.9765, hotels: '포시즌스 호텔 서울·서머셋 팰리스' },
  { slug: 'myeongdong-station', name: '명동역', district: '중구', lat: 37.5609, lng: 126.9863, hotels: '롯데호텔 서울·웨스틴조선·르메르디앙' },
  { slug: 'euljiro-station', name: '을지로입구역', district: '중구', lat: 37.5660, lng: 126.9822, hotels: '나인트리 명동·이비스 앰배서더' },
  { slug: 'dongdaemun-station', name: '동대문역사문화공원역', district: '중구', lat: 37.5657, lng: 127.0079, hotels: '노보텔 앰배서더 동대문' },
  // 성동·광진권
  { slug: 'seongsu-station', name: '성수역', district: '성동구', lat: 37.5446, lng: 127.0559, hotels: '호텔 포코 성수' },
  { slug: 'wangsimni-station', name: '왕십리역', district: '성동구', lat: 37.5615, lng: 127.0374, hotels: '엔터식스 비즈니스 호텔' },
  { slug: 'kondae-station', name: '건대입구역', district: '광진구', lat: 37.5404, lng: 127.0692, hotels: '더클래식500' },
  // 동작·관악권
  { slug: 'sadang-station', name: '사당역', district: '동작구', lat: 37.4765, lng: 126.9816, hotels: '사당 비즈니스 부티크 호텔' },
  { slug: 'sillim-station', name: '신림역', district: '관악구', lat: 37.4842, lng: 126.9297, hotels: '신림 삼모스포렉스 부근 호텔' },
  // 강서·양천권
  { slug: 'magok-station', name: '마곡역', district: '강서구', lat: 37.5602, lng: 126.8255, hotels: '코트야드 메리어트 보타닉파크' },
  { slug: 'balsan-station', name: '발산역', district: '강서구', lat: 37.5585, lng: 126.8377, hotels: '인터시티서울' },
  { slug: 'mokdong-station', name: '목동역', district: '양천구', lat: 37.5261, lng: 126.8647, hotels: '목동 하이페리온 인근' },
  // 수도권 핵심 거점역
  { slug: 'pangyo-station', name: '판교역', district: '성남시 분당구', lat: 37.3948, lng: 127.1114, hotels: '코트야드 메리어트 판교·그래비티 서울 판교' },
  { slug: 'seohyeon-station', name: '서현역', district: '성남시 분당구', lat: 37.3852, lng: 127.1235, hotels: '서현 킨스타워 인근' },
  { slug: 'jeongja-station', name: '정자역', district: '성남시 분당구', lat: 37.3667, lng: 127.1084, hotels: '더블트리 바이 힐튼 서울 판교' },
  { slug: 'suwon-station', name: '수원역', district: '수원시', lat: 37.2659, lng: 127.0000, hotels: '노보텔 앰배서더 수원' },
  { slug: 'ingyedong-station', name: '수원시청역(인계동)', district: '수원시', lat: 37.2625, lng: 127.0298, hotels: '포포인츠 바이 쉐라톤 수원·인계동 호텔가' },
  { slug: 'ilsan-kintex', name: '킨텍스역(대화·주엽)', district: '고양시 일산', lat: 37.6690, lng: 126.7470, hotels: '소노캄 고양' },
  { slug: 'bucheon-jungdong', name: '신중동역(부천)', district: '부천시', lat: 37.5030, lng: 126.7758, hotels: '부천 롯데호텔 인근' },
  { slug: 'beomgye-station', name: '범계역(평촌)', district: '안양시', lat: 37.3898, lng: 126.9507, hotels: '평촌 로데오 호텔' },
  { slug: 'dongtan-station', name: '동탄역(SRT)', district: '화성시 동탄', lat: 37.2001, lng: 127.0982, hotels: '신라스테이 동탄·스타즈호텔' },
  { slug: 'songdo-station', name: '송도센트럴파크', district: '인천 연수구', lat: 37.3930, lng: 126.6340, hotels: '오크우드 프리미어 인천·쉐라톤 그랜드' }
];

function generateStationHtml(st) {
  const pageTitle = `${st.name} 출장마사지 · ${st.name} 출장안마 1위 아밤 [100% 현장후불제]`;
  const metaDesc = `${st.name} 인근 호텔·자택 20~30분 총알 도착! 선입금·예약금 없는 100% 현장 대면결제 안심 후불제 출장마사지 1위 아름다운밤(아밤.kr). ${st.hotels} 객실 전용 1:1 방문 맞춤 케어.`;
  const canonicalUrl = `https://seoul.abam.kr/station/${st.slug}.html`;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDesc}">
  <meta name="keywords" content="${st.name}출장마사지, ${st.name}출장안마, ${st.name}홈타이, ${st.district}출장마사지, ${st.name}호텔마사지, 아름다운밤, 아밤출장마사지">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:type" content="article">
  <meta name="geo.region" content="KR-11">
  <meta name="geo.placename" content="${st.name} (${st.district})">
  <meta name="geo.position" content="${st.lat};${st.lng}">
  <meta name="ICBM" content="${st.lat}, ${st.lng}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "아밤 타이홈케어 - ${st.name} 지점",
    "telephone": "010-6607-2239",
    "url": "${canonicalUrl}",
    "priceRange": "80,000원 - 160,000원",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "${st.district}",
      "streetAddress": "${st.name} 역세권 및 인근 호텔 밀집구역",
      "addressCountry": "KR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": ${st.lat},
      "longitude": ${st.lng}
    },
    "areaServed": "${st.name} 반경 3km 내 호텔 및 주거지"
  }
  </script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #07090e; color: #f1f5f9; margin: 0; padding: 20px; line-height: 1.6; }
    .container { max-width: 720px; margin: 0 auto; background: #0f1422; border: 1px solid #1e293b; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .badge { display: inline-block; background: #3b82f6; color: #fff; padding: 4px 12px; border-radius: 999px; font-size: 13px; font-weight: 700; margin-bottom: 12px; }
    h1 { font-size: 24px; color: #fff; margin-top: 0; line-height: 1.3; }
    .highlight { color: #60a5fa; font-weight: 700; }
    .cta-btn { display: block; text-align: center; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #fff; text-decoration: none; padding: 18px; border-radius: 12px; font-size: 18px; font-weight: 700; margin: 24px 0; box-shadow: 0 4px 15px rgba(37,99,235,0.4); }
    .cta-btn:hover { background: #1d4ed8; }
    .box { background: #131929; border: 1px solid #1e293b; border-radius: 10px; padding: 18px; margin-bottom: 20px; }
    .box h3 { margin-top: 0; color: #93c5fd; font-size: 16px; }
    ul { padding-left: 20px; margin: 0; color: #94a3b8; font-size: 14px; }
    li { margin-bottom: 6px; }
    .footer { text-align: center; font-size: 12px; color: #64748b; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <span class="badge">100% 현장후불제 정찰제</span>
    <h1>${st.name} 출장마사지 · 출장안마 1위 <span class="highlight">아밤(Abam.kr)</span></h1>
    <p>${st.name} 및 ${st.district} 전역, 인근 비즈니스 호텔과 자택으로 전문 테라피스트가 20~30분 내 신속하게 찾아가는 1:1 프라이빗 힐링 케어 서비스입니다.</p>

    <a href="https://abam.kr" class="cta-btn">👉 공식 홈페이지 (Abam.kr) 실시간 예약하기</a>

    <div class="box">
      <h3>📍 ${st.name} 주요 신속 방문 호텔 & 랜드마크</h3>
      <p style="color: #cbd5e1; font-size: 14px; margin: 0 0 10px 0;"><strong>주요 방문 권역:</strong> ${st.hotels}</p>
      <ul>
        <li>호텔 객실 방문 시 전용 매트 및 1회용 위생용품을 모두 지참하여 방문합니다.</li>
        <li>도착 전 1층 로비 또는 객실 문 앞 도착 후 대면 미팅을 진행합니다.</li>
        <li>예약금이나 보증금을 단 1원도 요구하지 않는 <strong>100% 현장 대면 후불제</strong>입니다.</li>
      </ul>
    </div>

    <div class="box">
      <h3>💎 정찰제 코스 및 가격 안내</h3>
      <ul>
        <li><strong>전통 건식 타이:</strong> 60분 8만 / 90분 10만 / 120분 12만</li>
        <li><strong>천연 식물성 아로마:</strong> 60분 9만 / 90분 11만 / 120분 14만</li>
        <li><strong>VIP 복합 스페셜:</strong> 60분 10만 / 90분 12만 / 120분 16만</li>
      </ul>
    </div>

    <a href="https://abam.kr" class="cta-btn" style="background: linear-gradient(135deg, #059669, #047857);">📞 아밤 공식 사이트 바로가기</a>

    <div class="footer">
      © 2026 아름다운밤 아밤 [Abam.kr]. All rights reserved.
    </div>
  </div>
</body>
</html>`;
}

console.log('=== [기생 SEO] 50대 핵심 역세권 침투 페이지 생성 시작 ===');
const generatedUrls = [];

for (const st of STATIONS) {
  const html = generateStationHtml(st);
  const filePath = path.join(STATION_DIR, `${st.slug}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  generatedUrls.push(`https://seoul.abam.kr/station/${st.slug}.html`);
}

console.log(`✔ 총 ${STATIONS.length}개 역세권 침투 페이지 생성 완료 (${STATION_DIR})`);

// sitemap.xml 업데이트
const sitemapPath = path.join(OUT_DIR, 'sitemap.xml');
let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

const stationEntries = generatedUrls.map(u => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>`).join('\n');

sitemapContent = sitemapContent.replace('</urlset>', `${stationEntries}\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
console.log('✔ parasite-site/sitemap.xml 에 50개 역세권 URL 추가 완료!');
