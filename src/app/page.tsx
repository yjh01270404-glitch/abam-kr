import { DISTRICTS } from '../lib/region-data';
import AbamLanding from '../components/AbamLanding';
import { KO } from '../lib/landing-content';

/* 서울 지역 링크 */
const POPULAR_AREAS = [
  '강남출장안마', '강남출장마사지', '강남출장홈타이', '강남출장서비스', '강남홈타이',
  '서초출장안마', '서초출장마사지', '서초출장홈타이', '서초출장서비스', '서초홈타이',
  '송파출장안마', '송파출장마사지', '송파출장홈타이', '송파출장서비스', '잠실출장마사지',
  '마포출장안마', '마포출장마사지', '마포출장홈타이', '마포출장서비스', '홍대출장마사지',
  '용산출장안마', '용산출장마사지', '용산출장홈타이', '용산출장서비스', '이태원출장마사지',
  '영등포출장안마', '영등포출장마사지', '여의도출장마사지', '성수출장마사지', '종로출장마사지',
  '호텔출장마사지', '호텔출장안마', '24시출장마사지',
  '출장홈타이', '서울출장서비스', '출장안마', '출장마사지',
];

const AREA_LINKS = Array.from(
  new Set([
    ...DISTRICTS.flatMap((d) => [
      `${d.short}출장마사지`,
      `${d.short}출장안마`,
      `${d.short}출장홈타이`,
      `${d.short}출장서비스`,
    ]),
    ...POPULAR_AREAS,
  ]),
);

export default function HomePage() {
  return <AbamLanding c={KO} areaLinks={AREA_LINKS} />;
}
