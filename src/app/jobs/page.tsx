'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import styles from './jobs.module.css';
import DynamicBanner from '../../components/DynamicBanner';

function JobsContent() {
  const { topBanners, priorityJobs, recommendedJobs, generalJobs } = useApp();
  
  // Combine and deduplicate all jobs by id
  const allJobs = Array.from(new Map([
    ...topBanners,
    ...priorityJobs,
    ...recommendedJobs,
    ...generalJobs,
  ].map(job => [job.id, job])).values());

  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  // Filtering states
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedJobSector, setSelectedJobSector] = useState<string | null>(null);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  // Constants
  const regions = ['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '충북', '충남', '전북'];
  const sectors = ['클래식바', '바텐더', '라운지펍', '모던바', '와인바', '토킹바', '노래방', '룸알바', '텐프로', 'DJ/이벤트', '스태프', '기타'];

  // Match helpers
  const matchRegion = (location: string, region: string) => {
    if (region === '서울') {
      return location.includes('서울') || location.includes('강남') || location.includes('역삼') || 
             location.includes('논현') || location.includes('신사') || location.includes('마포') || 
             location.includes('서초') || location.includes('송파') || location.includes('잠실');
    }
    if (region === '경기') {
      return location.includes('경기') || location.includes('분당') || location.includes('수원') || 
             location.includes('인계') || location.includes('정자동');
    }
    if (region === '인천') return location.includes('인천') || location.includes('송도');
    if (region === '부산') return location.includes('부산') || location.includes('해운대') || location.includes('서면');
    return location.includes(region);
  };

  const matchJobSector = (title: string, sector: string) => {
    const lowerTitle = title.toLowerCase();
    if (sector === '클래식바') return lowerTitle.includes('클래식') || lowerTitle.includes('정통');
    if (sector === '바텐더') return lowerTitle.includes('바텐더') || lowerTitle.includes('에이스');
    if (sector === '라운지펍') return lowerTitle.includes('라운지') || lowerTitle.includes('펍');
    if (sector === '모던바') return lowerTitle.includes('모던') || lowerTitle.includes('바텐더');
    if (sector === '와인바') return lowerTitle.includes('와인');
    if (sector === '토킹바') return lowerTitle.includes('토킹') || lowerTitle.includes('바텐더');
    if (sector === '노래방') return lowerTitle.includes('노래방') || lowerTitle.includes('노래');
    if (sector === '룸알바') return lowerTitle.includes('룸') || lowerTitle.includes('하이퍼블릭') || lowerTitle.includes('퍼블릭');
    if (sector === '텐프로') return lowerTitle.includes('텐') || lowerTitle.includes('쩜오') || lowerTitle.includes('텐프로');
    if (sector === 'DJ/이벤트') return lowerTitle.includes('dj') || lowerTitle.includes('이벤트') || lowerTitle.includes('모델');
    if (sector === '스태프') return lowerTitle.includes('스태프') || lowerTitle.includes('서빙');
    if (sector === '기타') return !['클래식', '정통', '룸', '텐프로', '에이스', '라운지', '펍', '모던', '와인', '토킹', 'dj', '이벤트', '모델', '스태프', '서빙', '노래방', '노래', '하이퍼블릭', '퍼블릭', '쩜오'].some(k => lowerTitle.includes(k));
    return false;
  };

  // 3-Stage Filtering Logic
  const matchesFilters = (job: any) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return job.companyName.toLowerCase().includes(q) || 
             job.title.toLowerCase().includes(q) || 
             job.location.toLowerCase().includes(q);
    }
    if (selectedRegion) {
      if (!matchRegion(job.location, selectedRegion)) return false;
    }
    if (selectedJobSector) {
      if (!matchJobSector(job.title, selectedJobSector)) return false;
    }
    return true;
  };

  const filteredCardJobs = Array.from(new Map([
    ...topBanners,
    ...recommendedJobs
  ].map(job => [job.id, job])).values()).filter(matchesFilters);
  const filteredPriorityJobs = priorityJobs.filter(matchesFilters);
  const filteredLineJobs = generalJobs.filter(matchesFilters);

  const [cardLimit, setCardLimit] = useState(60);
  const [priorityLimit, setPriorityLimit] = useState(30);
  const [linePage, setLinePage] = useState(1);
  const linesPerPage = 20;

  const totalResultsCount = filteredCardJobs.length + filteredPriorityJobs.length + filteredLineJobs.length;

  return (
    <div className={styles.container}>
      {/* Left Sidebar Filter panel */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>필터 검색</h2>
        
        <div className={styles.filterSection}>
          <h3 className={styles.sectionHeading}>지역 선택</h3>
          <div className={styles.filterList}>
            {regions.map(r => (
              <span 
                key={r}
                className={`${styles.filterItem} ${selectedRegion === r ? styles.filterActive : ''}`}
                onClick={() => {
                  setSelectedRegion(selectedRegion === r ? null : r);
                  setLinePage(1);
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3 className={styles.sectionHeading}>직종 선택</h3>
          <div className={styles.filterList}>
            {sectors.map(s => (
              <span 
                key={s}
                className={`${styles.filterItem} ${selectedJobSector === s ? styles.filterActive : ''}`}
                onClick={() => {
                  setSelectedJobSector(selectedJobSector === s ? null : s);
                  setLinePage(1);
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Jobs Listing Area */}
      <main className={styles.mainContent}>
        {/* Text Search Box */}
        <div className={styles.searchBarWrapper}>
          <input 
            type="text" 
            placeholder="상호명, 키워드, 지역 등을 검색하세요..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setLinePage(1);
            }}
          />
          <button className={styles.searchBtn}>검색</button>
        </div>

        {/* Filter Indicator */}
        {(selectedRegion || selectedJobSector) && (
          <div className={styles.activeFilterIndicator}>
            <span className={styles.indicatorText}>
              🎯 필터:
              {selectedRegion && <span className={styles.indicatorBadge}>지역: {selectedRegion}</span>}
              {selectedJobSector && <span className={styles.indicatorBadge}>직종: {selectedJobSector}</span>}
            </span>
            <button 
              className={styles.clearBtn}
              onClick={() => {
                setSelectedRegion(null);
                setSelectedJobSector(null);
                setLinePage(1);
              }}
            >
              필터 초기화
            </button>
          </div>
        )}

        <div className={styles.resultsCount} style={{ marginBottom: '20px' }}>
          총 <strong>{totalResultsCount}</strong> 건의 구인공고 노출 중
        </div>

        {totalResultsCount > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Stage 1: VVIP/GRAND 스페셜 이미지 광고 (이미지배너가 있는 카드만 60개 노출) */}
            {filteredCardJobs.length > 0 && (
              <div>
                <h3 className={styles.sectionHeading} style={{ marginTop: 0, marginBottom: '12px', fontSize: '17px', fontWeight: '800', borderLeft: '4px solid #db2777', paddingLeft: '8px', color: '#db2777' }}>
                  👑 스페셜 이미지 배너 채용 (VVIP/GRAND)
                </h3>
                <div className={styles.jobsGrid}>
                  {filteredCardJobs.slice(0, cardLimit).map((job) => (
                    <DynamicBanner key={job.id} jobAd={job} size="grandvip" />
                  ))}
                </div>
                {filteredCardJobs.length > cardLimit && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <button 
                      onClick={() => setCardLimit(prev => prev + 30)}
                      style={{
                        padding: '8px 28px',
                        fontSize: '13px',
                        fontWeight: '800',
                        color: '#db2777',
                        background: '#ffffff',
                        border: '2px solid #db2777',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: '0 2px 6px rgba(219,39,119,0.08)'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#db2777'; e.currentTarget.style.color = '#ffffff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#db2777'; }}
                    >
                      스페셜 채용 더보기 ▾
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Stage 2: PREMIUM 핫 구인 (배너 이미지가 없는 카드형) */}
            {filteredPriorityJobs.length > 0 && (
              <div>
                <h3 className={styles.sectionHeading} style={{ marginTop: 0, marginBottom: '12px', fontSize: '17px', fontWeight: '800', borderLeft: '4px solid #0284c7', paddingLeft: '8px', color: '#0284c7' }}>
                  💎 PREMIUM 핫 구인 (카드형 광고)
                </h3>
                <div className={styles.jobsGrid} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                  {filteredPriorityJobs.slice(0, priorityLimit).map((job) => (
                    <DynamicBanner key={job.id} jobAd={job} size="premium" />
                  ))}
                </div>
                {filteredPriorityJobs.length > priorityLimit && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <button 
                      onClick={() => setPriorityLimit(prev => prev + 24)}
                      style={{
                        padding: '8px 28px',
                        fontSize: '13px',
                        fontWeight: '800',
                        color: '#0284c7',
                        background: '#ffffff',
                        border: '2px solid #0284c7',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: '0 2px 6px rgba(2,132,199,0.08)'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#0284c7'; e.currentTarget.style.color = '#ffffff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#0284c7'; }}
                    >
                      PREMIUM 더보기 ▾
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Stage 3: 일반 실시간 줄광고 (텍스트 줄광고, 20줄 나열, 하단 페이지 변경) */}
            {filteredLineJobs.length > 0 && (
              <div>
                <h3 className={styles.sectionHeading} style={{ marginTop: 0, marginBottom: '12px', fontSize: '17px', fontWeight: '800', borderLeft: '4px solid #475569', paddingLeft: '8px', color: '#475569' }}>
                  📝 최신 실시간 줄광고
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden' }}>
                  {filteredLineJobs.slice((linePage - 1) * linesPerPage, linePage * linesPerPage).map((ad) => (
                    <div 
                      key={ad.id} 
                      onClick={() => (window.location.href = `/job/${ad.id}`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #e2e8f0',
                        background: '#ffffff',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flexGrow: 1 }}>
                        <span style={{ color: '#db2777', fontWeight: '800', fontSize: '12.5px', flexShrink: 0 }}>[{ad.location.split(' ')[0]} {ad.location.split(' ')[1] || ''}]</span>
                        <strong style={{ color: '#0f172a', fontWeight: '900', flexShrink: 0 }}>{ad.companyName}</strong>
                        <span style={{ color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ad.title}</span>
                      </div>
                      <strong style={{ color: '#ea580c', flexShrink: 0, marginLeft: '12px', fontSize: '13.5px' }}>{ad.pay}</strong>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '20px' }}>
                  {Array.from({ length: Math.min(5, Math.ceil(filteredLineJobs.length / linesPerPage)) }).map((_, i) => {
                    const pageNum = i + 1;
                    const isActive = linePage === pageNum;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setLinePage(pageNum)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '4px',
                          border: '1px solid',
                          borderColor: isActive ? '#db2777' : '#cbd5e1',
                          background: isActive ? 'linear-gradient(135deg, #db2777, #701a75)' : '#ffffff',
                          color: isActive ? '#ffffff' : '#475569',
                          fontWeight: '800',
                          fontSize: '13px',
                          cursor: 'pointer',
                          boxShadow: isActive ? '0 2px 8px rgba(219,39,119,0.2)' : '0 1px 2px rgba(0,0,0,0.05)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className={styles.noResults}>
            <h3 className={styles.noResultsTitle}>조건에 맞는 구인공고가 없습니다</h3>
            <p>필터를 초기화하거나 다른 검색어로 다시 검색해 보세요.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>로딩 중...</div>}>
      <JobsContent />
    </Suspense>
  );
}
