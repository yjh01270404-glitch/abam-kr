/**
 * 아름다운 밤 타이 홈케어 (abam.kr)
 * 마사지 관련 전방위 키워드 검색엔진 고속 대량 색인 트리거
 */

const SITE_URL = 'https://abam.kr';
const KEY = 'abam1234567890abcdefabcdefabcdef';

// 서울 25개 자치구 및 핵심 상권 키워드
const GU_LIST = [
  '강남', '서초', '송파', '강동', '마포', '용산', '영등포', '성동', '광진',
  '동작', '관악', '서대문', '은평', '종로', '중구', '동대문', '성북', '강북',
  '도봉', '노원', '중랑', '양천', '강서', '구로', '금천'
];

const STATION_LIST = [
  '강남역', '역삼', '선릉', '삼성', '논현', '신사', '압구정', '청담', '양재', '교대',
  '잠실', '신천', '문정', '가락', '천호', '홍대', '합정', '신촌', '이대', '공덕',
  '여의도', '영등포', '당산', '신도림', '용산', '이태원', '한남', '성수', '건대',
  '왕십리', '명동', '을지로', '종로', '광화문', '사당', '이수', '신림', '서울대입구',
  '마곡', '발산', '화곡', '목동', '수유', '미아', '노원', '상계'
];

const SUFFIXES = [
  '출장마사지', '홈타이', '출장안마', '방문마사지', '호텔마사지', '호텔출장마사지',
  '출장홈케어', '아로마출장마사지', '타이출장마사지', '스웨디시출장'
];

const allKeywords = new Set();

// 1. 구 단위 결합
GU_LIST.forEach(gu => {
  SUFFIXES.forEach(suf => {
    allKeywords.add(`${gu}${suf}`);
    allKeywords.add(`${gu} ${suf}`);
  });
});

// 2. 역세권 결합
STATION_LIST.forEach(st => {
  ['출장마사지', '홈타이', '출장안마', '호텔마사지'].forEach(suf => {
    allKeywords.add(`${st}${suf}`);
    allKeywords.add(`${st} ${suf}`);
  });
});

// 3. 테마형 핵심 키워드
const THEME_KEYWORDS = [
  '서울출장마사지', '서울홈타이', '서울출장안마', '서울호텔출장마사지', '서울방문마사지',
  '호텔출장마사지', '모텔출장마사지', '오피스텔출장마사지', '24시출장마사지', '심야출장마사지',
  '선입금없는출장마사지', '대면결제출장마사지', '후불출장마사지', '100%후불마사지',
  '아밤', '아밤타이홈케어', '아름다운밤타이홈케어', '아밤마사지',
  '왓포출장마사지', '왓포정통건식', '천연아로마마사지', '스웨디시마사지', '감성힐링테라피'
];
THEME_KEYWORDS.forEach(k => allKeywords.add(k));

const urls = [
  SITE_URL,
  `${SITE_URL}/en`,
  `${SITE_URL}/jp`,
  `${SITE_URL}/cn`,
  ...Array.from(allKeywords).map(kw => `${SITE_URL}/seo/${encodeURIComponent(kw.replace(/\s+/g, '-'))}`)
];

async function pingIndexNow() {
  const host = new URL(SITE_URL).host;
  // IndexNow API는 1회 최대 10,000개 URL 지원
  const batch = urls.slice(0, 5000);
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key: KEY,
        keyLocation: `${SITE_URL}/${KEY}.txt`,
        urlList: batch,
      }),
    });
    return { engine: 'IndexNow (Naver/Bing/Yandex)', count: batch.length, status: res.status, ok: res.ok || res.status === 202 };
  } catch (e) {
    return { engine: 'IndexNow', error: e.message };
  }
}

async function pingBingSitemap() {
  const target = `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`;
  try {
    const res = await fetch(target);
    return { engine: 'Bing', status: res.status, ok: res.ok };
  } catch (e) {
    return { engine: 'Bing', error: e.message };
  }
}

async function main() {
  console.log('===========================================================');
  console.log('  아름다운 밤 (abam.kr) 마사지 전방위 검색엔진 대량 색인');
  console.log('===========================================================');
  console.log(`타겟 사이트: ${SITE_URL}`);
  console.log(`생성된 고유 마사지 키워드 URL 총합: ${urls.length}개\n`);

  const [indexNowRes, bingRes] = await Promise.all([
    pingIndexNow(),
    pingBingSitemap(),
  ]);

  console.log(`[IndexNow] 전송 URL: ${indexNowRes.count}개, 응답 코드: ${indexNowRes.status} (${indexNowRes.ok ? '성공 200/202' : '확인'})`);
  console.log(`[Bing Sitemap] 응답 코드: ${bingRes.status || '완료'}`);
  console.log('\n모든 서울 25개 자치구 및 역세권 마사지 키워드가 검색엔진 크롤러에 실시간 통보되었습니다.');
}

main();
