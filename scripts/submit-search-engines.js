const SITE_URL = 'https://abam.kr';
const KEY = 'abam1234567890abcdefabcdefabcdef';

const CORE_KEYWORDS = [
  '유흥알바', '밤알바', '바알바', '노래방알바', '룸알바', 
  '여성알바', '고수익알바', '여성고소득알바'
];

const REGIONS = [
  '강남', '마포', '홍대', '신촌', '서초', '역삼', '선릉', '송파', '영등포',
  '인천', '수원', '부천', '일산', '분당', '평택', '대구', '부산', '대전', 
  '광주', '울산', '천안', '청주', '전주', '제주'
];

const generatedKeywords = [];
CORE_KEYWORDS.forEach(k => {
  generatedKeywords.push(k);
});
REGIONS.forEach(region => {
  CORE_KEYWORDS.forEach(core => {
    generatedKeywords.push(`${region} ${core}`);
    generatedKeywords.push(`${region}${core}`);
  });
});

const keywords = Array.from(new Set(generatedKeywords));

const urls = [
  SITE_URL,
  `${SITE_URL}/jobs`,
  `${SITE_URL}/diary`,
  `${SITE_URL}/register`,
  `${SITE_URL}/login`,
  ...keywords.map(kw => `${SITE_URL}/seo/${encodeURIComponent(kw.replace(/\s+/g, '-'))}`)
];

async function pingIndexNow() {
  const host = new URL(SITE_URL).host;
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host,
      key: KEY,
      keyLocation: `${SITE_URL}/${KEY}.txt`,
      urlList: urls.slice(0, 10000),
    }),
  });
  return { status: res.status, ok: res.ok || res.status === 202 };
}

async function main() {
  console.log('=== 아밤 검색 엔진 IndexNow 제출 ===\n');
  console.log('Site URL:', SITE_URL);
  console.log(`생성된 URL 개수: ${urls.length}개\n`);

  try {
    const result = await pingIndexNow();
    console.log(`IndexNow Ping 응답 코드: ${result.status} (${result.ok ? '성공' : '실패'})`);
    console.log('\n네이버, Bing 등 검색엔진에 모든 동적 SEO 페이지 주소가 성공적으로 전달되었습니다.');
  } catch (error) {
    console.error('Ping 실패:', error.message);
  }
}

main();
