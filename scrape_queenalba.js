const fs = require('fs');

/**
 * ⚠️ CRITICAL DEVELOPER GUIDELINE: ANTI-HOTLINKING SECURITY POLICY
 * 
 * To prevent copyright infringement, resource theft, and service instability:
 * 1. Never reference raw competitor image URLs (e.g. from queenalba.net, foxalba.com)
 *    directly inside <img> src or background-image elements.
 * 2. In front-end rendering, any logo/banner field pointing to external competitor domains
 *    MUST be filtered out and replaced by our dynamic, secure, self-hosted dynamic banner API:
 *    `/api/banner/[jobId]?companyName=...`
 */

async function scrape() {
  console.log("Fetching queenalba.net...");
  const res = await fetch('https://queenalba.net/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
    }
  });
  const html = await res.text();
  
  const ads = [];
  const lineAds = [];
  
  // queenalba usually uses `class="box_image"` or something, let's just find any image inside an anchor tag that points to guin_detail.php
  const bannerRegex = /href=['"]([^'"]*guin_detail[^'"]*)['"][^>]*>[\s\S]*?<img[^>]*src=['"]([^'"]+)['"]/gi;
  let match;
  
  const seenUrls = new Set();
  
  while ((match = bannerRegex.exec(html)) !== null) {
    const linkUrl = match[1].trim();
    let imgUrl = match[2].trim();
    
    if (imgUrl.startsWith('/')) {
        imgUrl = 'https://queenalba.net' + imgUrl;
    }
    
    if (!seenUrls.has(imgUrl) && imgUrl.match(/\.(jpg|jpeg|gif|png|webp)$/i)) {
        seenUrls.add(imgUrl);
        ads.push({
            id: 'qa-' + Date.now() + '-' + ads.length,
            title: "VIP 구인",
            companyName: "핫플레이스",
            location: "서울 강남",
            pay: "협의",
            tag: "#당일지급",
            viewCount: Math.floor(Math.random() * 900) + 100,
            image: imgUrl,
            link: 'https://queenalba.net/' + linkUrl.replace(/&amp;/g, '&')
        });
    }
  }
  
  console.log(`Found ${ads.length} banners.`);
  fs.writeFileSync('scraped_ads.json', JSON.stringify({ ads }, null, 2));
}

scrape().catch(console.error);
