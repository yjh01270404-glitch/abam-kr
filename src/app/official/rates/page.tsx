import type { Metadata } from 'next';
import { DISTRICTS } from '@/lib/region-data';
import AbamLanding from '@/components/AbamLanding';
import { KO } from '@/lib/landing-content';

export const metadata: Metadata = {
  title: '아밤 공식 코스 및 정찰제 이용 안내 | 서울·경기 전지역 30분 도착 100% 현장후불제',
  description: '아밤(Abam.kr) 공식 정찰제 요금표. A코스(로얄 타이) 8만원, B코스(힐링 아로마) 9만원, C코스(로얄 스페셜 더블케어) 12만원. 선입금 0원, 예약금 0원, 100% 기사 대면 현장결제. 서울 25개구 경기 전지역 30분 신속 도착.',
  alternates: {
    canonical: 'https://abam.kr/',
  },
};

const POPULAR_AREAS = [
  '출장마사지', '출장안마', '출장홈타이', '홈타이',
  '방문마사지', '호텔출장마사지', '후불제출장마사지', '선입금없는출장마사지',
  '서울출장마사지', '서울출장안마', '경기출장마사지', '경기출장안마',
  '강남출장마사지', '강남출장안마', '수원출장마사지', '분당출장마사지',
  '일산출장마사지', '부천출장마사지', '평택출장마사지', '동탄출장마사지'
];

const AREA_LINKS = Array.from(
  new Set([
    ...POPULAR_AREAS,
    ...DISTRICTS.map((d) => `${d.short}출장마사지`),
  ]),
);

export default function OfficialRatesPage() {
  return <AbamLanding c={KO} areaLinks={AREA_LINKS} />;
}
