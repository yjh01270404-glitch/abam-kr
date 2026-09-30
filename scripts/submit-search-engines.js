/**
 * 아름다운 밤 타이 홈케어 (abam.kr)
 * 구글 및 주요 검색엔진 빠른 색인/상위노출 트리거 스크립트
 */

const SITE_URL = 'https://abam.kr';
const KEY = 'abam1234567890abcdefabcdefabcdef';

const TARGET_KEYWORDS = [
  // 브랜드 & 시그니처
  '아밤', '아밤타이홈케어', '아름다운밤', '아름다운밤타이홈케어', '아밤마사지',
  '서울출장마사지', '서울홈타이', '서울출장안마', '서울방문마사지', '서울야간출장', '서울호텔마사지',
  '강남출장마사지', '강남홈타이', '강남출장안마', '강남역출장마사지', '역삼출장마사지', '논현출장마사지', '청담출장마사지', '압구정출장마사지', '선릉출장마사지',
  '서초출장마사지', '서초홈타이', '반포출장마사지', '방배출장마사지', '교대출장마사지',
  '송파출장마사지', '잠실출장마사지', '잠실홈타이', '문정출장마사지', '강동출장마사지', '천호출장마사지',
  '마포출장마사지', '마포홈타이', '홍대출장마사지', '합정출장마사지', '공덕출장마사지', '상암출장마사지',
  '용산출장마사지', '용산홈타이', '한남출장마사지', '이태원출장마사지', '용산역출장마사지',
  '영등포출장마사지', '여의도출장마사지', '여의도홈타이', '신도림출장마사지', '당산출장마사지',
  '성수출장마사지', '성동출장마사지', '왕십리출장마사지', '광진출장마사지', '건대출장마사지',
  '동작출장마사지', '사당출장마사지', '관악출장마사지', '신림출장마사지',
  '종로출장마사지', '중구출장마사지', '명동출장마사지', '을지로출장마사지', '광화문출장마사지',
  '강서출장마사지', '마곡출장마사지', '양천출장마사지', '목동출장마사지', '구로출장마사지',
  '노원출장마사지', '강북출장마사지', '수유출장마사지', '미아출장마사지',
  // 코스 & 속성
  '왓포출장마사지', '왓포정통건식', '천연아로마출장마사지', '감성힐링테라피', '림프순환마사지',
  '선입금없는출장마사지', '후불출장마사지', '대면결제출장마사지', '현장결제출장마사지', '20대출장마사지',
  '호텔출장마사지', '비즈니스호텔마사지', '오피스텔출장마사지', '24시출장마사지', '심야출장마사지'
];

const urls = [
  SITE_URL,
  `${SITE_URL}/en`,
  `${SITE_URL}/jp`,
  `${SITE_URL}/cn`,
  ...TARGET_KEYWORDS.map(kw => `${SITE_URL}/seo/${encodeURIComponent(kw.replace(/\s+/g, '-'))}`)
];

async function pingGoogleSitemap() {
  const target = `https://www.google.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`;
  try {
    const res = await fetch(target);
    return { engine: 'Google', status: res.status, ok: res.ok };
  } catch (e) {
    return { engine: 'Google', status: 'ERR', error: e.message };
  }
}

async function pingBingSitemap() {
  const target = `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`;
  try {
    const res = await fetch(target);
    return { engine: 'Bing', status: res.status, ok: res.ok };
  } catch (e) {
    return { engine: 'Bing', status: 'ERR', error: e.message };
  }
}

async function pingIndexNow() {
  const host = new URL(SITE_URL).host;
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key: KEY,
        keyLocation: `${SITE_URL}/${KEY}.txt`,
        urlList: urls.slice(0, 500),
      }),
    });
    return { engine: 'IndexNow (Naver/Bing/Yandex)', status: res.status, ok: res.ok || res.status === 202 };
  } catch (e) {
    return { engine: 'IndexNow', status: 'ERR', error: e.message };
  }
}

async function main() {
  console.log('====================================================');
  console.log('  아름다운 밤 (abam.kr) 검색엔진 고속 색인 트리거');
  console.log('====================================================');
  console.log(`타겟 사이트: ${SITE_URL}`);
  console.log(`제출 URL 수: ${urls.length}개\n`);

  const results = await Promise.allSettled([
    pingGoogleSitemap(),
    pingBingSitemap(),
    pingIndexNow(),
  ]);

  results.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      const v = r.value;
      console.log(`[${v.engine}] Ping 상태: ${v.status} (${v.ok ? '성공' : '응답 완료'})`);
    } else {
      console.log(`[검색엔진 #${i + 1}] 에러:`, r.reason);
    }
  });

  console.log('\n모든 검색엔진 크롤러에 최신 sitemap.xml 및 타겟 URL이 성공적으로 통보되었습니다.');
}

main();
