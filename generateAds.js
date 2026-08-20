const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, 'src/lib/mockData.ts');
let content = fs.readFileSync(mockDataPath, 'utf8');

// Extract all images
const imageRegex = /image:\s*['"]([^'"]+)['"]/g;
const images = new Set();
let match;
while ((match = imageRegex.exec(content)) !== null) {
    if (match[1].includes('upload/')) {
        images.add(match[1]);
    }
}
const imgList = Array.from(images);
console.log(`Found ${imgList.length} unique images.`);

const companies = ["하트", "퀸즈", "별밤", "다이아", "엔젤", "텐프로", "비밀", "야화", "핑크", "로맨스"];
const locations = ["서울 강남구", "서울 서초구", "경기 수원시", "부산 해운대구", "인천 부평구", "대구 수성구"];
const titles = [
    "최고대우 당일지급 보장",
    "초보환영 텃세절대없음",
    "숙식제공 무조건 당일정산",
    "투잡가능 자유로운 출퇴근",
    "시급 최고보장 꿀알바",
    "페이협의 무조건 맞춰드림",
    "가족같은 분위기 편한가게",
    "프리미엄 룸 매니저 모집",
    "야간 단기알바 환영",
    "출퇴근차량지원 숙식가능"
];

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Shuffle images to randomize but keep sequential picking to avoid duplicates
for (let i = imgList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imgList[i], imgList[j]] = [imgList[j], imgList[i]];
}

let imageIndex = 0;
function getNextImage() {
    const img = imgList[imageIndex % imgList.length];
    imageIndex++;
    return img;
}

function generateAd(idPrefix, idx) {
    return {
        id: `${idPrefix}-${idx}`,
        type: 'top',
        title: randomChoice(titles),
        companyName: randomChoice(companies) + ` ${Math.floor(Math.random()*10)}호점`,
        location: randomChoice(locations),
        pay: "협의 (당일결제)",
        tag: "#고수익 #당일지급",
        viewCount: Math.floor(Math.random() * 900) + 100,
        image: getNextImage(),
        description: "상세설명",
        requirements: "20세이상",
        workHours: "협의"
    };
}

const vvip = {
    id: "vvip-1",
    type: 'top',
    title: "VVIP 스카이 대표",
    companyName: "스카이 김대표",
    location: "서울 강남구",
    pay: "최고대우",
    tag: "#VVIP #최고수익",
    viewCount: 9999,
    image: getNextImage(),
    description: "상세설명",
    requirements: "20세이상",
    workHours: "협의"
};

const grandVip = Array.from({length: 19}, (_, i) => generateAd('grand', i));
const premium = Array.from({length: 80}, (_, i) => generateAd('premium', i));
const lineAds = Array.from({length: 30}, (_, i) => ({
    id: `line-${i}`,
    type: 'general',
    title: `[급구] ${randomChoice(titles)} - ${randomChoice(companies)}`,
    companyName: randomChoice(companies),
    location: randomChoice(locations),
    pay: "시급 10만+",
    tag: "",
    viewCount: Math.floor(Math.random() * 500),
    description: "상세설명",
    requirements: "20세이상",
    workHours: "협의"
}));

const tsContent = `// Automatically generated realistic mock data
import { JobAd } from './mockData';

export const vvipBanner: JobAd = ${JSON.stringify(vvip, null, 2)};
export const grandVipBanners: JobAd[] = ${JSON.stringify(grandVip, null, 2)};
export const premiumBanners: JobAd[] = ${JSON.stringify(premium, null, 2)};
export const lineAdsData: JobAd[] = ${JSON.stringify(lineAds, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'src/lib/mockAds.ts'), tsContent);
console.log("Successfully generated mockAds.ts with real images!");
