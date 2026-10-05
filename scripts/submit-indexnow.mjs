/**
 * IndexNow 제출 스크립트 (Bing · Naver · Yandex · Seznam 즉시 색인 요청)
 * 사용법: 배포 후 `npm run submit:indexnow`
 * - 키 파일: public/abam1234567890abcdefabcdefabcdef.txt (https://abam.kr/<KEY>.txt 로 공개되어 있어야 함)
 * - 구글은 IndexNow를 지원하지 않으므로 Search Console에서 사이트맵(https://abam.kr/sitemap.xml)을 제출하세요.
 */
const HOST = 'abam.kr';
const KEY = 'abam1234567890abcdefabcdefabcdef';
const SITEMAP = `https://${HOST}/sitemap.xml`;

async function main() {
  const xml = await (await fetch(SITEMAP)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (!urls.length) throw new Error('사이트맵에서 URL을 찾지 못했습니다: ' + SITEMAP);
  console.log(`제출 대상 URL ${urls.length}개`);

  for (let i = 0; i < urls.length; i += 9000) {
    const chunk = urls.slice(i, i + 9000);
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: chunk,
      }),
    });
    console.log(`IndexNow 응답: ${res.status} ${res.statusText} (${chunk.length}개)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
