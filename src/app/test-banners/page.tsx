import React from 'react';
import DynamicBanner from '../../components/DynamicBanner';
import { JobAd } from '../../lib/mockData';

const MOCK_JOBS: any[] = [
  { id: 't1', type: 'top', title: '에이스 구함', companyName: '아름다운밤 라운지', location: '강남구', pay: '시급 25만', date: '오늘', isNew: true },
  { id: 't2', type: 'top', title: '에이스 구함', companyName: '잠실요정', location: '송파구', pay: '일급 100만', date: '오늘', isNew: true },
  { id: 't3', type: 'top', title: '에이스 구함', companyName: '역삼초이스', location: '강남구', pay: '시급 30만', date: '오늘', isNew: true },
  { id: 'p1', type: 'priority', title: '당일지급', companyName: '서대문구', location: '서대문구', pay: '시급 12만', date: '오늘' },
  { id: 'p2', type: 'priority', title: '대학생 알바', companyName: '마포구', location: '마포구', pay: '시급 10만', date: '어제' },
  { id: 'p3', type: 'priority', title: '투잡 환영', companyName: '용산구', location: '용산구', pay: '시급 11만', date: '어제' },
  { id: 'g1', type: 'general', title: '웨이트리스', companyName: '수원시', location: '수원시', pay: '시급 8만', date: '2일전' },
  { id: 'g2', type: 'general', title: '매니저 구함', companyName: '부천시', location: '부천시', pay: '시급 9만', date: '2일전' },
  { id: 'g3', type: 'general', title: '초보가능', companyName: '안양시', location: '안양시', pay: '시급 7만', date: '3일전' },
  { id: 'g4', type: 'general', title: '초보가능', companyName: '고양시', location: '고양시', pay: '시급 8.5만', date: '3일전' },
];

export default function TestBannersPage() {
  const vvipJob = MOCK_JOBS.find(j => j.id === 't1');
  const normalJobs = MOCK_JOBS.filter(j => j.id !== 't1');

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', background: '#000', minHeight: '100vh' }}>
      <h1 style={{ color: '#fff', marginBottom: '20px' }}>배너 디자인 (VVIP 한자리 대형 사이즈 추가)</h1>
      
      {/* CSS Grid for the layout */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '12px'
      }}>
        {/* The 2x2 VVIP Slot */}
        {vvipJob && (
          <DynamicBanner jobAd={vvipJob} size="vvip" />
        )}
        
        {/* The rest of the normal banners */}
        {normalJobs.map((job) => (
          <DynamicBanner key={job.id} jobAd={job} size="normal" />
        ))}
      </div>
    </div>
  );
}