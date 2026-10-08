import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '아밤 - 20대 ACE 총출동 서울 출장마사지',
    short_name: '아밤 (Abam)',
    description: '서울 전역 자택·호텔 30분 총알도착! 전원 20대 에이스 관리사 라인업, 사전 예약금 없는 100% 현장 후불제 안심 케어.',
    start_url: '/',
    display: 'standalone',
    background_color: '#06090d',
    theme_color: '#06090d',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: '전화 바로 예약 (010-6607-2239)',
        short_name: '전화예약',
        description: '고객센터 010-6607-2239 전화 바로 연결',
        url: 'tel:010-6607-2239',
        icons: [{ src: '/icon.png', sizes: '192x192' }],
      },
      {
        name: '20대 ACE 관리사 라인업',
        short_name: 'ACE 라인업',
        description: '오늘 밤 20대 ACE 총출동 프로필 보기',
        url: '/#therapists',
        icons: [{ src: '/icon.png', sizes: '192x192' }],
      },
      {
        name: '코스 및 정찰제 요금표',
        short_name: '요금안내',
        description: '타이·아로마·스페셜 60분/90분/120분 요금표',
        url: '/#courses',
        icons: [{ src: '/icon.png', sizes: '192x192' }],
      },
      {
        name: '서울 25개 자치구 지역별 안내',
        short_name: '지역안내',
        description: '강남·서초·송파·마포·용산 등 서울 전역 30분 도착',
        url: '/keywords',
        icons: [{ src: '/icon.png', sizes: '192x192' }],
      },
    ],
  };
}
