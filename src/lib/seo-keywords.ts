export const JOB_CATEGORIES = [
  '뷰티·에스테틱', '헤어·바디케어', '카페·베이커리', '다이닝·F&B', '피트니스·운동', '스튜디오·문화'
];

export const REGIONS = [
  '강남구', '서초구', '송파구', '마포구', '용산구', '영등포구', '분당구', '수원시', '인천시', '부산시', '대구시', '대전시', '광주시'
];

export const SEO_KEYWORDS = [
  '로컬 비즈니스', '매장 홍보', '배너 광고', '디지털 마케팅', '상가 정보',
  '뷰티 에스테틱', '피부관리실', '헤어살롱', '스페셜티 카페', '베이커리 창업',
  '프리미엄 레스토랑', '피트니스 센터', '필라테스 스튜디오', '소상공인 마케팅',
  '강남 매장 홍보', '홍대 카페 광고', '판교 뷰티샵', '아밤', 'ABAM'
];

export const ALL_SEO_SLUGS = SEO_KEYWORDS.map(k => ({
  keyword: k,
  slug: encodeURIComponent(k.replace(/\s+/g, '-'))
}));

export function generateSeoPageData(keyword: string) {
  const decodedKeyword = decodeURIComponent(keyword).replace(/-/g, ' ');
  return {
    keyword: decodedKeyword,
    title: `${decodedKeyword} 전문 매장 정보 및 배너 광고 | 아밤(ABAM)`,
    description: `대한민국 1등 로컬 비즈니스 플랫폼 아밤에서 ${decodedKeyword} 관련 검증된 매장 정보 및 프리미엄 디지털 마케팅 배너 서비스를 만나보세요.`,
    h1: `${decodedKeyword} 우수 매장 & 배너 마케팅 가이드`,
    tags: ['#로컬비즈니스', '#매장홍보', '#배너광고', '#디지털마케팅', '#아밤'],
    relatedKeywords: SEO_KEYWORDS.filter(k => k !== decodedKeyword).slice(0, 6)
  };
}
