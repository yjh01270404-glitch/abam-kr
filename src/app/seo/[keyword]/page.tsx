import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SEO_KEYWORDS, generateSeoPageData } from '../../../lib/seo-keywords';
import { topBanners, priorityJobs, recommendedJobs, generalJobs } from '../../../lib/mockData';
import { MapPin, Briefcase, ShieldAlert, HeartHandshake } from 'lucide-react';
import styles from './seo.module.css';

type Props = { params: Promise<{ keyword: string }> };

// ISR: 요청 시 동적 생성 (빌드 시 정적 생성 안 함 → 디스크 용량 절약)
// SEO 크롤러가 처음 방문할 때 페이지가 생성되고 캐싱됨
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1시간마다 재검증

// dynamicParams: true → generateStaticParams 없이도 모든 키워드 URL 허용
export const dynamicParams = true;

const REGIONS = [
  '강남', '마포', '홍대', '신촌', '서초', '역삼', '선릉', '송파', '영등포',
  '인천', '수원', '부천', '일산', '분당', '평택', '대구', '부산', '대전',
  '광주', '울산', '천안', '청주', '전주', '제주'
];

export async function generateMetadata({ params }: Props) {
  const { keyword } = await params;
  const data = generateSeoPageData(keyword);
  const decoded = decodeURIComponent(keyword).replace(/-/g, ' ');

    const canonicalUrl = `https://abam.kr/seo/${encodeURIComponent(decoded.replace(/\s+/g, '-'))}`;
    return {
      title: data.title,
      description: data.description,
      keywords: [
        ...data.keywords,
        '아름다운밤', '아밤', 'abam', '여성알바', '고수익알바', '당일지급',
        decoded + ' 추천', decoded + ' 후기', decoded + ' 사이트', decoded + ' 1위',
      ].join(', '),
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large' as const,
          'max-video-preview': -1,
        },
      },
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: data.title,
        description: data.description,
        type: 'website' as const,
        url: canonicalUrl,
        siteName: '아름다운밤(아밤)',
        locale: 'ko_KR',
      },
    twitter: {
      card: 'summary_large_image' as const,
      title: data.title,
      description: data.description,
    },
  };
}


export default async function SeoLandingPage({ params }: Props) {
  const { keyword } = await params;
  const data = generateSeoPageData(keyword);
  
  const decoded = decodeURIComponent(keyword).replace(/-/g, ' ');
  const region = REGIONS.find(r => decoded.includes(r)) || '';

  // 전체 구인 광고 병합
  const allJobs = [
    ...topBanners,
    ...priorityJobs,
    ...recommendedJobs,
    ...generalJobs
  ];

  // 키워드 매칭 필터링
  const filteredJobs = allJobs.filter(job => {
    if (!job) return false;
    const locMatch = region ? (job.location?.includes(region) ?? false) : false;
    const textMatch = (job.title?.includes(decoded) || job.companyName?.includes(decoded) || job.description?.includes(decoded)) ?? false;
    return locMatch || textMatch;
  });

  const hasMatchedJobs = filteredJobs.length > 0;
  const displayJobs = hasMatchedJobs ? filteredJobs.slice(0, 15) : allJobs.slice(0, 10);

  // 구글 공식 FAQPage 스키마 및 WebPage 스키마 병합 (검색 결과 리치 스니펫 노출 극대화)
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `https://abam.kr/seo/${keyword}#webpage`,
      name: data.title,
      description: data.description,
      url: `https://abam.kr/seo/${keyword}`,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '아름다운밤', item: 'https://abam.kr' },
          { '@type': 'ListItem', position: 2, name: decoded, item: `https://abam.kr/seo/${keyword}` }
        ]
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `${decoded} 초보 지원 시 무엇을 준비해야 하나요?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: '신분증 지참 외에 특별한 기술이나 경력은 요구되지 않으며, 업소별로 1:1 안심 오리엔테이션 및 유니폼 코칭을 무료로 제공하므로 누구나 부담 없이 근무를 시작할 수 있습니다.'
          }
        },
        {
          '@type': 'Question',
          name: `${decoded} 급여 정산은 어떻게 진행되나요?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: '아름다운밤(아밤)에 입점된 파트너 공고들은 대부분 당일 정산(일급 지급) 방식을 기본으로 채택하고 있어, 근무를 마친 즉시 확실하고 투명하게 지급받으실 수 있습니다.'
          }
        },
        {
          '@type': 'Question',
          name: `${decoded} 근무 시간 조절이 자유로운가요?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: '네, 주말 알바, 하루 몇 시간 단위의 파트타임, 혹은 퇴근 후 야간 알바(투잡) 등 스케줄을 본인의 일정에 맞춰 완전 유연하게 조율하여 근무할 수 있습니다.'
          }
        }
      ]
    }
  ];

  const relatedKeywords = SEO_KEYWORDS
    .filter(k => k !== decoded)
    .sort(() => 0.5 - Math.random())
    .slice(0, 12);

  return (
    <main className={styles.seoPageWrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. Header Bar */}
      <div className={styles.headerSection}>
        <Link href="/" className={styles.homeLink}>
          <span>👑 아름다운밤</span>
        </Link>
        
        <div className={styles.searchBarWrapper}>
          <input 
            type="text" 
            placeholder="구인 키워드 검색..." 
            className={styles.searchInput}
            defaultValue={decoded}
            readOnly
          />
          <button className={styles.searchButton}>검색</button>
        </div>
      </div>

      {/* 2. Hero Content Section */}
      <section className={styles.heroContent}>
        <div className={styles.badge}>검증된 여성 고수익 안심 채용</div>
        <h1 className={styles.title}>{data.h1}</h1>
        <p className={styles.introText}>{data.content}</p>
      </section>

      {/* 3. Main content Grid */}
      <div className={styles.mainGrid}>
        
        {/* Left: Job listings & Editorial Guides */}
        <section className={styles.jobsSection}>
          
          {/* 가설 기반 고품질 가이드 아티클 (구글 E-E-A-T 지수 및 네이버 C-Rank 대응 문장력 극대화) */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#db2777', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={20} />
              {decoded} 안전 지원 가이드 및 주의사항
            </h2>
            <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: '1.7', margin: '0 0 16px 0', wordBreak: 'keep-all' }}>
              고수익 여성 구직 시 가장 중요한 가치는 **개인 정보 보호**와 **안전한 근무 여건**입니다. 선불금 사기나 정산 미루기 같은 부당 대우를 피하기 위해서는 반드시 검증된 인증 플랫폼을 통해 실제 등록 업체 정보를 면밀히 살피셔야 합니다.
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13.5px', color: '#475569', lineHeight: '1.8' }}>
              <li><strong>철저한 프라이버시 약속:</strong> 전화번호나 개인 SNS 아이디 노출 없이 안심 톡을 우선적으로 사용하여 문의를 조율하세요.</li>
              <li><strong>당일 정산 원칙 확인:</strong> 근무 종료 후 급여가 당일 현금 또는 당일 송금으로 칼같이 이뤄지는지 사전 확인이 필요합니다.</li>
              <li><strong>면접 시 강요 행위 주의:</strong> 과한 복장 규정이나 강요가 없는 자율적인 근무 여건을 약속하는 업소를 선택하는 것이 중요합니다.</li>
            </ul>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#880e4f', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HeartHandshake size={20} />
              {decoded} 급여 및 근무 조건 최적화 안내
            </h2>
            <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: '1.7', margin: '0 0 16px 0', wordBreak: 'keep-all' }}>
              보통 초보자의 경우 근무 시간 선택에 어려움을 겪으시는 경우가 많습니다. 아밤에 등재된 업소들은 주말 단기 스태프, 하루 4시간 파트타임 등 **완전 자율 근무제**를 시행하고 있어 구직자의 스케줄 상황에 맞춘 조율이 가능합니다.
            </p>
          </div>

          <h2 className={styles.sectionTitle}>
            {hasMatchedJobs ? `📢 ${decoded} 맞춤 추천 채용공고` : `🔥 아름다운밤 프리미엄 추천 공고`}
          </h2>

          {displayJobs.map((job) => (
            <Link key={job.id} href={`/jobs`} className={styles.jobCard}>
              <div className={styles.jobHeader}>
                <div>
                  <div className={styles.companyName}>{job.companyName}</div>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                </div>
                <span className={styles.jobBadge}>{job.type.toUpperCase()}</span>
              </div>
              
              <div className={styles.jobDetails}>
                <div className={styles.detailItem}>
                  <MapPin size={14} />
                  <span>{job.location}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>급여:</span>
                  <span>{job.pay}</span>
                </div>
                <div className={styles.detailItem}>
                  <Briefcase size={14} />
                  <span>{job.workHours}</span>
                </div>
              </div>

              {job.tag && (
                <div className={styles.tagsWrapper}>
                  {job.tag.split(' ').map((t, idx) => (
                    <span key={idx} className={styles.tag}>{t}</span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </section>

        {/* Right: Sidebar widgets */}
        <aside className={styles.sidebarSection}>
          
          {/* FAQ Widget */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>💡 {decoded} 자주 묻는 질문</h3>
            <div className={styles.faqList}>
              <div className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>{decoded} 평균 급여 수준은 어떤가요?</h4>
                <p className={styles.faqAnswer}>
                  급여는 업종과 근무 형태(주간/야간/파트타임)에 따라 다르지만, 대부분 당일 정산(일급 지급) 제도를 채택하고 있어 일한 날 바로 확실하게 정산받으실 수 있습니다.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>초보나 직장인 투잡도 가능합니까?</h4>
                <p className={styles.faqAnswer}>
                  네, 아름다운밤의 구인 업소들은 경력 여부와 상관없이 초보자를 위한 1:1 맞춤 교육 및 안심 근무를 지원합니다. 자율 출퇴근제로 주말이나 야간 투잡도 용이합니다.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>나이나 복장 제한이 심한가요?</h4>
                <p className={styles.faqAnswer}>
                  만 19세 성인 여성이시라면 누구나 지원이 가능하며, 억압적인 유니폼 규정 대신 자신만의 매력을 뽐낼 수 있는 깔끔한 자유 복장을 보장하는 업소들이 다수입니다.
                </p>
              </div>
            </div>
          </div>


          {/* Links Cloud Widget - 관련 키워드 30개 */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>🔗 관련 인기 검색어</h3>
            <div className={styles.keywordsCloud}>
              {SEO_KEYWORDS
                .filter(k => k !== decoded)
                .slice(0, 30)
                .map((kw) => (
                  <Link
                    key={kw}
                    href={`/seo/${encodeURIComponent(kw.replace(/\s+/g, '-'))}`}
                    className={styles.keywordTag}
                  >
                    {kw}
                  </Link>
                ))}
            </div>
          </div>

          {/* 아름다운밤 바로가기 */}
          <div className={styles.sidebarCard} style={{ background: 'linear-gradient(135deg, #fff0f6 0%, #fce4ec 100%)', border: '1.5px solid #f48fb1' }}>
            <h3 className={styles.sidebarTitle} style={{ color: '#880e4f' }}>👑 아름다운밤(아밤) 바로가기</h3>
            <p style={{ fontSize: '12.5px', color: '#6b4c5e', lineHeight: '1.6', margin: '0 0 12px 0' }}>
              대한민국 1등 여성 고수익 일자리 전문 플랫폼.<br/>
              밤알바·유흥알바·룸알바 전국 검증 채용정보.
            </p>
            <Link href="/jobs" style={{ display: 'block', background: 'linear-gradient(135deg, #c2185b, #e91e63)', color: '#fff', textAlign: 'center', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '13px' }}>
              🔥 전체 채용공고 보기
            </Link>
            <Link href="/register" style={{ display: 'block', marginTop: '8px', background: '#fff', color: '#c2185b', textAlign: 'center', padding: '9px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px', border: '1.5px solid #f48fb1' }}>
              ✨ 무료 회원가입
            </Link>
          </div>
          
        </aside>
      </div>

      {/* ── 하단 전체 키워드 인덱스 (크롤러 링크 주스 극대화) ── */}
      <section style={{ borderTop: '1px solid #e2e8f0', padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '15px', fontWeight: '900', color: '#1e293b', marginBottom: '16px' }}>
          📋 아름다운밤 전체 검색 키워드 인덱스
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}>
          {SEO_KEYWORDS.map((kw) => (
            <Link
              key={kw}
              href={`/seo/${encodeURIComponent(kw.replace(/\s+/g, '-'))}`}
              style={{ fontSize: '11px', color: '#64748b', textDecoration: 'none', padding: '3px 8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}
            >
              {kw}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
