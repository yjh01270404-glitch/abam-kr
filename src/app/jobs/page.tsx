'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import styles from './jobs.module.css';
import BannerTemplate from '../../components/BannerTemplate';

export default function JobsPage() {
  const { topBanners, priorityJobs, recommendedJobs, generalJobs } = useApp();
  
  // Combine all jobs
  const allJobs = [
    ...topBanners,
    ...priorityJobs,
    ...recommendedJobs,
    ...generalJobs,
  ];

  // Filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedJobSector, setSelectedJobSector] = useState<string | null>(null);

  // Constants
  const regions = ['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '충북', '충남', '전북'];
  const sectors = ['클래식바', '바텐더', '라운지펍', '모던바', '와인바', '토킹바', 'DJ/이벤트', '스태프'];

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
    if (sector === '바텐더') return lowerTitle.includes('룸') || lowerTitle.includes('텐프로') || lowerTitle.includes('에이스');
    if (sector === '라운지펍') return lowerTitle.includes('라운지') || lowerTitle.includes('펍');
    if (sector === '모던바') return lowerTitle.includes('모던') || lowerTitle.includes('바텐더');
    if (sector === '와인바') return lowerTitle.includes('와인');
    if (sector === '토킹바') return lowerTitle.includes('토킹') || lowerTitle.includes('바텐더');
    if (sector === 'DJ/이벤트') return lowerTitle.includes('dj') || lowerTitle.includes('이벤트') || lowerTitle.includes('모델');
    if (sector === '스태프') return lowerTitle.includes('스태프') || lowerTitle.includes('서빙');
    return false;
  };

  // Filter logic
  const filteredJobs = allJobs.filter(job => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesQ = job.companyName.toLowerCase().includes(q) || 
                       job.title.toLowerCase().includes(q) || 
                       job.location.toLowerCase().includes(q);
      if (!matchesQ) return false;
    }
    if (selectedRegion) {
      if (!matchRegion(job.location, selectedRegion)) return false;
    }
    if (selectedJobSector) {
      if (!matchJobSector(job.title, selectedJobSector)) return false;
    }
    return true;
  });

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
                onClick={() => setSelectedRegion(selectedRegion === r ? null : r)}
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
                onClick={() => setSelectedJobSector(selectedJobSector === s ? null : s)}
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
            onChange={(e) => setSearchQuery(e.target.value)}
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
              }}
            >
              필터 초기화
            </button>
          </div>
        )}

        <div className={styles.resultsCount}>
          총 <strong>{filteredJobs.length}</strong> 건의 구인공고 노출 중
        </div>

        {/* Jobs Cards Grid */}
        {filteredJobs.length > 0 ? (
          <div className={styles.jobsGrid}>
            {filteredJobs.map((job) => {
              if (job.customStyle) {
                return (
                  <Link href={`/job/${job.id}`} key={job.id} style={{ textDecoration: 'none', display: 'block' }}>
                    <BannerTemplate
                      data={{
                        companyName: job.companyName,
                        region: job.location,
                        jobType: job.tag || '업종',
                        payType: '일급',
                        payAmount: '',
                        description: job.title,
                        tags: job.tag ? [job.tag] : [],
                        customStyle: job.customStyle,
                      }}
                      compact={true}
                    />
                  </Link>
                );
              }
              return (
                <Link href={`/job/${job.id}`} key={job.id} className={styles.jobCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.companyName}>{job.companyName}</span>
                    {job.tag && <span className={styles.tagBadge}>{job.tag}</span>}
                  </div>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  
                  <div className={styles.cardDivider}></div>

                  <div className={styles.cardDetails}>
                    <div className={styles.detailField}>
                      <strong>급여 조건:</strong> <span className={styles.payValue}>{job.pay}</span>
                    </div>
                    <div className={styles.detailField}>
                      <strong>근무 지역:</strong> <span>{job.location}</span>
                    </div>
                    {job.requirements && (
                      <div className={styles.detailField}>
                        <strong>지원 자격:</strong> <span>{job.requirements}</span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
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
