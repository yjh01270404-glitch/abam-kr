const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

/**
 * 퀸알바 웹 크롤러 스크립트
 *
 * [사용 방법]
 * 1. 필요한 패키지를 설치합니다: npm install axios cheerio
 * 2. 스크립트를 실행합니다: node scraper.js
 */

// 크롤링할 대상 URL의 기본 형태 (페이지 번호가 붙기 전의 주소)
const BASE_URL = "https://queenalba.net/guin_list.php?pg="; // 목록 페이지로 추정된 주소
const START_PAGE = 1; // 시작 페이지 번호
const END_PAGE = 3; // 끝 페이지 번호 (예: 1페이지부터 3페이지까지 수집)

// 퀸알바 사이트의 HTML 구조에 맞게 수정된 CSS 선택자(Selector)
const SELECTORS = {
  jobItem: 'td[valign="top"][width="20%"] > div', // 게시글 한 칸을 통째로 감싸는 부모 태그
  title: "td.smfont4 font", // 제목
  companyWrapper: "a > b", // 지역명과 상호명을 모두 포함하는 태그
  location: "font.smfont3", // 지역명
  image: "a > img", // 썸네일 이미지
  link: "a" // 상세페이지 링크
};

// 지정된 시간(밀리초)만큼 대기하는 지연 함수 (서버 차단 방지)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function scrapeJobs() {
  const allScrapedData = [];

  try {
    // 1페이지부터 END_PAGE까지 반복해서 접속합니다.
    for (let page = START_PAGE; page <= END_PAGE; page++) {
      const targetUrl = BASE_URL + page;
      console.log(`[진행 상황] ${page}페이지 접근 중... (${targetUrl})`);

      // 1. 해당 URL의 HTML 문서를 가져옵니다.
      const { data } = await axios.get(targetUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });

      console.log(` - HTML 파싱 및 데이터 추출 중...`);

      // 2. Cheerio를 이용해 HTML을 파싱합니다.
      const $ = cheerio.load(data);
      let pageItemCount = 0;

      // 3. 선택자를 이용해 구인글 목록을 순회하며 데이터를 추출합니다.
      $(SELECTORS.jobItem).each((index, element) => {
        // 제목 추출
        const title = $(element).find(SELECTORS.title).text().trim();

        // 지역 추출
        const location = $(element)
          .find(SELECTORS.companyWrapper)
          .find(SELECTORS.location)
          .text()
          .trim();

        // 상호명 추출: 부모(b 태그)에서 자식(font 태그 - 지역명)을 제외한 순수 텍스트만 가져오기
        let company = $(element)
          .find(SELECTORS.companyWrapper)
          .clone()
          .children()
          .remove()
          .end()
          .text()
          .trim();
        company = company.replace(/"/g, "").trim(); // 앞뒤에 붙은 따옴표 제거

        // 썸네일 이미지 절대 경로로 변환
        let imageSrc = $(element).find(SELECTORS.image).attr("src");
        if (imageSrc && imageSrc.startsWith("./")) {
          imageSrc = "https://queenalba.net" + imageSrc.substring(1);
        }

        // 상세페이지 링크 절대 경로로 변환
        let linkHref = $(element).find(SELECTORS.link).attr("href");
        if (linkHref && linkHref.startsWith("./")) {
          linkHref = "https://queenalba.net" + linkHref.substring(1);
        }

        // 목록에서는 급여/연락처가 보이지 않으므로 빈 값(혹은 안내 문구) 처리
        const pay = "상세페이지 확인";
        const contact = "상세페이지 확인";

        if (title || company) {
          allScrapedData.push({
            id: `scraped-${Date.now()}-${page}-${index}`,
            type: "general",
            title,
            companyName: company || "상호명 없음",
            location,
            pay,
            contactInfo: contact,
            image:
              imageSrc ||
              "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=600&auto=format",
            link: linkHref
          });
          pageItemCount++;
        }
      });

      console.log(
        ` - ${page}페이지에서 ${pageItemCount}개의 데이터를 찾았습니다.`
      );

      // 4. 다음 페이지로 넘어가기 전 랜덤한 시간만큼 의도적으로 대기합니다 (서버 차단 방지)
      if (page < END_PAGE) {
        const waitTime = Math.floor(Math.random() * 2000) + 3000; // 3초 ~ 5초
        console.log(
          ` ⚠️ 봇 차단 방지: 다음 페이지 접속 전 ${waitTime / 1000}초 동안 대기합니다...`
        );
        await delay(waitTime);
      }
    }

    console.log(
      `\n🎉 모든 크롤링 완료! 총 ${allScrapedData.length}개의 데이터를 수집했습니다.`
    );

    // 수집한 데이터를 JSON 파일로 일괄 저장합니다.
    if (allScrapedData.length > 0) {
      fs.writeFileSync(
        "scraped_jobs.json",
        JSON.stringify(allScrapedData, null, 2),
        "utf-8"
      );
      console.log(
        "✅ 데이터가 scraped_jobs.json 파일로 성공적으로 저장되었습니다!"
      );
    } else {
      console.log(
        "⚠️ 데이터를 찾지 못했습니다. CSS 선택자(Selector)가 올바른지 확인해주세요."
      );
    }
  } catch (error) {
    console.error("❌ 크롤링 중 오류가 발생했습니다:", error.message);
  }
}

// 스크립 실행
scrapeJobs();
