import { Metadata } from 'next';
import AbamLanding from '@/components/AbamLanding';

export const metadata: Metadata = {
  title: '아밤 공식 코스 및 정찰제 이용 안내 | 서울·경기 전지역 30분 도착 100% 현장후불제',
  description: '아밤(Abam.kr) 공식 정찰제 요금표. 타이 8만원, 아로마 9만원. 선입금 0원, 예약금 0원, 100% 기사 대면 현장결제. 서울 25개구 경기 전지역 30분 신속 도착.',
  alternates: {
    canonical: 'https://abam.kr/',
  },
};

export default function OfficialRatesPage() {
  return <AbamLanding />;
}
