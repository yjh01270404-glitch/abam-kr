import Image from 'next/image';
import React from 'react';

const TEST_JOBS = [
  { id: 'test-vvip-luxury-0', companyName: '로얄 럭셔리클럽' },
  { id: 'test-vvip-star-1', companyName: '은하수 스타알바' },
  { id: 'test-vvip-pastel-2', companyName: '캔디 파스텔시즌' },
  { id: 'test-vvip-heart-3', companyName: '에밀리 하트방' },
  { id: 'test-vvip-texture-4', companyName: '멤피스 기하학' },
  { id: 'test-vvip-badge-5', companyName: '골든 배지스티커' },
  { id: 'test-vvip-mascot-6', companyName: '캣앤베어 캐릭터' },
  { id: 'test-vvip-object-7', companyName: '다이아몬드 에메랄드' },
  { id: 'test-vvip-neon-8', companyName: '도파민 네온클럽' },
  { id: 'test-vvip-ribbon-9', companyName: '트로피컬 리조트' },
  { id: 'test-vvip-lux-10', companyName: 'VVIP 에이스클럽' },
  { id: 'test-vvip-galaxy-11', companyName: '갤럭시 오션뷰' },
  { id: 'test-vvip-love-12', companyName: '샤샤 러브룸' },
  { id: 'test-vvip-retro-13', companyName: '복고풍 오락실' },
  { id: 'test-vvip-beach-14', companyName: '하와이안 비치' }
];

export default function TestBannersPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', background: '#0f172a', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', margin: '0 0 10px 0', fontSize: '28px' }}>🎨 AI 자동생성 배너 소재 다양성 검증 보드 (15종)</h1>
        <p style={{ color: '#94a3b8', margin: 0 }}>서로 다른 15개의 구인 ID 해시에 따라 10가지 배경 소재(패턴, 장식, 폰트, 레이아웃)가 다양하게 생성됩니다.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '20px'
      }}>
        {TEST_JOBS.map((job, i) => (
          <div 
            key={job.id} 
            style={{ 
              background: '#1e293b', 
              borderRadius: '12px', 
              padding: '12px', 
              border: '1px solid #334155',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '11px', fontWeight: 'bold' }}>
              <span>템플릿 #{i + 1}</span>
              <span style={{ color: '#38bdf8' }}>ID: {job.id}</span>
            </div>
            
            <Image unoptimized 
              src={`/api/banner/${job.id}?companyName=${encodeURIComponent(job.companyName)}`}
              alt={job.companyName}
              style={{
                width: '100%',
                aspectRatio: '240/117', // Match real card banner aspect ratio!
                borderRadius: '6px',
                border: '1px solid #475569',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                background: '#000000'
              }}
            />
            
            <div style={{ color: '#94a3b8', fontSize: '11px', lineHeight: '1.4' }}>
              <strong>상호명:</strong> {job.companyName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}