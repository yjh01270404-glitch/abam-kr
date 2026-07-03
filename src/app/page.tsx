'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Heart, User, Menu, ChevronRight, Phone, MessageSquare, PlusSquare, Star, Award, Zap, HelpCircle } from 'lucide-react';
import styles from './page.module.css';
import { topBanners, priorityJobs, recommendedJobs, generalJobs, forumPosts, talentListings } from '../lib/mockData';

export default function Home_Page() {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination for bottom table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(generalJobs.length / itemsPerPage);
  
  const currentGeneralJobs = generalJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles.portalWrapper}>
      {/* 1. Top Mini Utility Bar */}
      <div className={styles.topUtilityBar}>
        <div className={styles.topUtilityLeft}>
          <span>★ 즐겨찾기 추가</span>
        </div>
        <div className={styles.topUtilityRight}>
          <span>로그인</span>
          <span className={styles.utilityDivider}>|</span>
          <span>회원가입</span>
          <span className={styles.utilityDivider}>|</span>
          <span className={styles.textHighlight}>관리자페이지</span>
          <span className={styles.utilityDivider}>|</span>
          <span>고객센터</span>
        </div>
      </div>

      {/* 2. Brand Header Section */}
      <header className={styles.brandHeader}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logoText}>아름다운밤</h1>
          <span className={styles.logoDomain}>abam.kr</span>
        </div>
        
        {/* Glowing Center Flash Banner */}
        <div className={styles.flashBanner}>
          <div className={styles.flashInner}>
            <span className={styles.flashBadge}>HOT</span>
            <p className={styles.flashText}>
              ⚡ 2시간 50만 쩜오세이렌 당일지급 ⚡ 1등 K팀 하루 100~200만원 보장! 초보/경력 무관 당일 매칭 지원 ⚡
            </p>
          </div>
        </div>

        {/* Right Kakao/Phone Info Widget */}
        <div className={styles.headerInfoWidget}>
          <div className={styles.widgetContact}>
            <div className={styles.contactItem}>
              <Phone size={14} className={styles.widgetIcon} />
              <span>대표번호: <strong>1588-0000</strong></span>
            </div>
            <div className={styles.contactItem}>
              <MessageSquare size={14} className={styles.widgetIconKakao} />
              <span>카카오톡: <strong>abam_recruit</strong></span>
            </div>
          </div>
          <button className={styles.registerButton}>
            <PlusSquare size={16} />
            <span>채용공고 무료등록</span>
          </button>
        </div>
      </header>

      {/* 3. Main Navigation Bar */}
      <nav className={styles.mainNavBar}>
        <div className={styles.navMenu}>
          <Link href="/" className={`${styles.navItem} ${styles.navActive}`}>아름다운밤</Link>
          <span className={styles.navItem}>채용정보</span>
          <span className={styles.navItem}>지역별채용</span>
          <span className={styles.navItem}>직종별채용</span>
          <span className={styles.navItem}>인재정보</span>
          <span className={styles.navItem}>커뮤니티</span>
          <span className={styles.navItem}>고객센터</span>
        </div>
        <div className={styles.navAdBadge}>
          <span>📢 7월 신규회원 무료 배너 이벤트 진행 중!</span>
        </div>
      </nav>

      {/* 4. Flower Alba Style Main Visual Hero Banner */}
      <div className={styles.heroVisualBanner}>
        <div className={styles.heroOverlay}>
          <h2 className={styles.heroTitle}>아름다운밤</h2>
          <p className={styles.heroSubtitle}>여성 고수익 일자리 정보를 제공하는 플랫폼</p>
          <div className={styles.heroSEOText}>
            유흥알바 · 밤알바 · 룸알바 · 노래방알바 · 바알바 · 여우알바 · 악녀알바 · 술집알바 · 고소득 여성전용 구인구직 1위
          </div>
        </div>
      </div>

      {/* 5. Main Layout with Double Sidebars */}
      <div className={styles.mainLayout}>
        {/* Left Sidebar Banner Ads */}
        <aside className={styles.leftSidebar}>
          <div className={`${styles.sidebarAdCard} ${styles.bgPink}`}>
            <span className={styles.sidebarAdBadge}>인기</span>
            <h4>초보환영</h4>
            <p>당일 100% 정산</p>
            <p className={styles.highlight}>차량 지원</p>
            <div className={styles.sidebarAdArrow}>CLICK ▶</div>
          </div>
          <div className={`${styles.sidebarAdCard} ${styles.bgPurple}`}>
            <span className={styles.sidebarAdBadge}>추천</span>
            <h4>개인 이벤트</h4>
            <p>시급 8만+인센</p>
            <p className={styles.highlight}>복장 자유</p>
            <div className={styles.sidebarAdArrow}>CLICK ▶</div>
          </div>
          <div className={styles.sidebarStickyBanner}>
            <p>아름다운밤<br/>배너광고<br/>문의전화<br/><strong>1588-0000</strong></p>
          </div>
        </aside>

        {/* Center Main Content Area */}
        <div className={styles.centerContent}>
          {/* Top Hero Section: Login Box + 11 Square Banner Ads */}
          <section className={styles.topHeroSection}>
            {/* Login Widget */}
            <div className={styles.loginCard}>
              <h3 className={styles.loginTitle}>MEMBER LOGIN</h3>
              <form className={styles.loginForm} onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="아이디" className={styles.loginInput} />
                <input type="password" placeholder="비밀번호" className={styles.loginInput} />
                <div className={styles.loginOptions}>
                  <label className={styles.loginCheckboxLabel}>
                    <input type="checkbox" /> 자동로그인
                  </label>
                </div>
                <button type="submit" className={styles.loginSubmitBtn}>로그인</button>
              </form>
              <div className={styles.loginLinks}>
                <span>회원가입</span>
                <span className={styles.loginDivider}>|</span>
                <span>아이디/비밀번호 찾기</span>
              </div>
            </div>

            {/* 11 Square Ad Grid (Queen Alba style colorful grids) */}
            <div className={styles.squareAdGrid}>
              <div className={`${styles.squareAdItem} ${styles.borderPink}`}>
                <span className={styles.adTag}>강남 1등</span>
                <span className={styles.adHighlight}>시급 15~25+@</span>
                <p>하루 100~150만 보장</p>
                <p className={styles.adCompany}>텐프로 에이스</p>
              </div>
              <div className={`${styles.squareAdItem} ${styles.borderBlue}`}>
                <span className={styles.adTag}>유흥의 종가</span>
                <span className={styles.adHighlight}>당일 지급 100%</span>
                <p>초보자 전담 안심케어</p>
                <p className={styles.adCompany}>역삼 릴렉스</p>
              </div>
              <div className={`${styles.squareAdItem} ${styles.borderYellow}`}>
                <span className={styles.adTag}>갯수 보장</span>
                <span className={styles.adHighlight}>천송이실장 케어</span>
                <p>마이킹 선지원 가능</p>
                <p className={styles.adCompany}>논현 클라우드</p>
              </div>
              <div className={`${styles.squareAdItem} ${styles.borderGreen}`}>
                <span className={styles.adTag}>의전 모델</span>
                <span className={styles.adHighlight}>120+a 플레이</span>
                <p>초보/대학생 투잡환영</p>
                <p className={styles.adCompany}>신사 밸벳</p>
              </div>
              <div className={`${styles.squareAdItem} ${styles.borderPurple}`}>
                <span className={styles.adTag}>분당 최강</span>
                <span className={styles.adHighlight}>하이퍼블릭 글램</span>
                <p>EIMI 17만 / 차량지원</p>
                <p className={styles.adCompany}>분당 글램</p>
              </div>
              <div className={`${styles.squareAdItem} ${styles.borderPink}`}>
                <span className={styles.adTag}>쩜오 에이스</span>
                <span className={styles.adHighlight}>이승기 부장 케어</span>
                <p>최고 대우 성실정산</p>
                <p className={styles.adCompany}>청담 시그널</p>
              </div>
              <div className={`${styles.squareAdItem} ${styles.borderBlue}`}>
                <span className={styles.adTag}>플러스 업소</span>
                <span className={styles.adHighlight}>잠실 랜드마크</span>
                <p>매너 손님 예약 위주</p>
                <p className={styles.adCompany}>잠실 플러스</p>
              </div>
              <div className={`${styles.squareAdItem} ${styles.borderYellow}`}>
                <span className={styles.adTag}>VVIP 케어</span>
                <span className={styles.adHighlight}>고페이 푸오빠</span>
                <p>주말 단기 고수익 알바</p>
                <p className={styles.adCompany}>서면 퍼플</p>
              </div>
              <div className={`${styles.squareAdItem} ${styles.borderGreen}`}>
                <span className={styles.adTag}>수원 1위</span>
                <span className={styles.adHighlight}>하루 200만 가능</span>
                <p>독보적인 콜수 보장</p>
                <p className={styles.adCompany}>인계 클래식</p>
              </div>
              <div className={`${styles.squareAdItem} ${styles.borderPurple}`}>
                <span className={styles.adTag}>안심 보장</span>
                <span className={styles.adHighlight}>가족같은 분위기</span>
                <p>진상 필터링 시스템</p>
                <p className={styles.adCompany}>마포 레몬드롭</p>
              </div>
              <div className={`${styles.squareAdItem} ${styles.borderPink}`}>
                <span className={styles.adTag}>해운대 핫플</span>
                <span className={styles.adHighlight}>오션뷰 칵테일바</span>
                <p>숙식 제공 및 휴가 지원</p>
                <p className={styles.adCompany}>해운대 오션</p>
              </div>
            </div>
          </section>

          {/* Search bar inside portal center */}
          <div className={styles.searchBarBox}>
            <div className={styles.searchBarWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="검색어로 찾기 (예: 강남 룸바텐더, 노래방알바, 바알바, 당일지급)" 
                className={styles.searchBarInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className={styles.searchBarBtn}>검색</button>
            </div>
            <div className={styles.searchHotKeywords}>
              <span>인기키워드:</span>
              <span className={styles.keywordLink}>#강남텐프로</span>
              <span className={styles.keywordLink}>#노래방바텐더</span>
              <span className={styles.keywordLink}>#당일정산</span>
              <span className={styles.keywordLink}>#초보자구직</span>
              <span className={styles.keywordLink}>#주말단기</span>
            </div>
          </div>

          {/* 6. Info Category Widgets (Flower Alba Style) */}
          <section className={styles.categoryWidgetsSection}>
            <div className={styles.widgetCard}>
              <div className={`${styles.widgetCardHeader} ${styles.widgetHeaderPink}`}>
                <MapPin size={16} />
                <h4>지역별 채용정보</h4>
              </div>
              <div className={styles.widgetCardLinks}>
                <span>서울</span> <span>경기</span> <span>인천</span> <span>부산</span> 
                <span>대구</span> <span>광주</span> <span>대전</span> <span>울산</span>
                <span>세종</span> <span>충북</span> <span>충남</span> <span>전북</span>
              </div>
            </div>
            <div className={styles.widgetCard}>
              <div className={`${styles.widgetCardHeader} ${styles.widgetHeaderPurple}`}>
                <Award size={16} />
                <h4>직종별 채용정보</h4>
              </div>
              <div className={styles.widgetCardLinks}>
                <span>클래식바</span> <span>룸바텐더</span> <span>라운지펍</span> <span>모던바</span>
                <span>와인바</span> <span>토킹바</span> <span>DJ/이벤트</span> <span>스태프</span>
              </div>
            </div>
            <div className={styles.widgetCard}>
              <div className={`${styles.widgetCardHeader} ${styles.widgetHeaderYellow}`}>
                <Zap size={16} />
                <h4>키워드별 채용정보</h4>
              </div>
              <div className={styles.widgetCardLinks}>
                <span>#초보환영</span> <span>#당일지급</span> <span>#복장자유</span> <span>#숙식지원</span>
                <span>#투잡가능</span> <span>#단기알바</span> <span>#주말근무</span> <span>#고소득알바</span>
              </div>
            </div>
            <div className={styles.widgetCard}>
              <div className={`${styles.widgetCardHeader} ${styles.widgetHeaderGreen}`}>
                <HelpCircle size={16} />
                <h4>오늘의 구인 소식</h4>
              </div>
              <div className={styles.widgetNoticeText}>
                <p>★ 초보/대학생도 부담 없이 배우는 칵테일바 스태프 대모집 중!</p>
                <p>★ 당일 지급 확실한 룸/라운지 알바 1대1 매칭 시스템 운영 안내</p>
              </div>
            </div>
          </section>

          {/* 7. Community Boards Section ("아름다운밤 수다방") */}
          <section className={styles.communitySection}>
            <h3 className={styles.sectionHeading}>💬 아름다운밤 수다방</h3>
            <div className={styles.communityGrid}>
              <div className={styles.communityCol}>
                <div className={styles.colHeader}>⭐ 베스트글</div>
                <ul className={styles.colList}>
                  {forumPosts.filter(p => p.category === 'best').map(p => (
                    <li key={p.id} className={styles.colListItem}>
                      <span className={styles.colListTitle}>{p.title}</span>
                      <span className={styles.colListDate}>{p.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.communityCol}>
                <div className={styles.colHeader}>🌙 밤문화이야기</div>
                <ul className={styles.colList}>
                  {forumPosts.filter(p => p.category === 'night').map(p => (
                    <li key={p.id} className={styles.colListItem}>
                      <span className={styles.colListTitle}>{p.title}</span>
                      <span className={styles.colListDate}>{p.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.communityCol}>
                <div className={styles.colHeader}>🤝 같이일할 단짝찾기</div>
                <ul className={styles.colList}>
                  {forumPosts.filter(p => p.category === 'friend').map(p => (
                    <li key={p.id} className={styles.colListItem}>
                      <span className={styles.colListTitle}>{p.title}</span>
                      <span className={styles.colListDate}>{p.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.communityCol}>
                <div className={styles.colHeader}>⚖️ 무료법률자문</div>
                <ul className={styles.colList}>
                  {forumPosts.filter(p => p.category === 'legal').map(p => (
                    <li key={p.id} className={styles.colListItem}>
                      <span className={styles.colListTitle}>{p.title}</span>
                      <span className={styles.colListDate}>{p.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 8. 우대 채용 정보 (Priority Jobs) */}
          <section className={styles.jobsSection}>
            <h3 className={styles.sectionHeading}>💖 우대 채용 정보 <span className={styles.subHeadingText}>유흥알바 밤알바 여성고소득 추천공고</span></h3>
            <div className={styles.priorityGrid}>
              {priorityJobs.slice(0, 16).map((job) => (
                <Link href={`/job/${job.id}`} key={job.id} className={styles.priorityCard}>
                  <div className={styles.priorityBadgeRow}>
                    <span className={styles.priorityLocBadge}>{job.location}</span>
                    {job.tag && <span className={styles.priorityTagBadge}>{job.tag}</span>}
                  </div>
                  <h4 className={styles.priorityJobTitle}>{job.title}</h4>
                  <div className={styles.priorityCompany}>{job.companyName}</div>
                  <div className={styles.priorityPayRow}>
                    <span className={styles.priorityPayLabel}>급여</span>
                    <span className={styles.priorityPayVal}>{job.pay}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 9. 프리미엄 채용 정보 (Premium Jobs) */}
          <section className={styles.jobsSection}>
            <h3 className={styles.sectionHeading}>👑 프리미엄 채용 정보 <span className={styles.subHeadingText}>검증된 고소득 안심 일자리 모음</span></h3>
            <div className={styles.premiumGrid}>
              {topBanners.map((job) => (
                <Link href={`/job/${job.id}`} key={job.id} className={styles.premiumCard}>
                  <div className={styles.premiumImageWrapper}>
                    <img src={job.image} alt="" className={styles.premiumImg} />
                    <span className={styles.premiumBadge}>HIT</span>
                  </div>
                  <div className={styles.premiumContent}>
                    <h4 className={styles.premiumTitle}>{job.title}</h4>
                    <p className={styles.premiumLocation}>{job.location} · {job.companyName}</p>
                    <div className={styles.premiumPay}>{job.pay}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 10. 추천 채용 정보 (Special Jobs) */}
          <section className={styles.jobsSection}>
            <h3 className={styles.sectionHeading}>⭐ 실시간 추천 채용 <span className={styles.subHeadingText}>오늘 바로 출근 가능한 특급 채용관</span></h3>
            <div className={styles.specialGrid}>
              {recommendedJobs.slice(0, 12).map((job) => (
                <Link href={`/job/${job.id}`} key={job.id} className={styles.specialCard}>
                  <div className={styles.specialBadgeRow}>
                    <span className={styles.specialLoc}>{job.location}</span>
                    <span className={styles.specialHit}>HOT</span>
                  </div>
                  <h4 className={styles.specialTitle}>{job.title}</h4>
                  <p className={styles.specialCompany}>{job.companyName}</p>
                  <div className={styles.specialPay}>{job.pay}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* 11. Flower Alba Style Tabular Main List (모든 채용정보) */}
          <section className={styles.tableListSection}>
            <h3 className={styles.sectionHeading}>📋 실시간 신규 등록 모든 채용정보</h3>
            <div className={styles.tableWrapper}>
              <table className={styles.jobTable}>
                <thead>
                  <tr>
                    <th>지역 / 업종</th>
                    <th>회사명 / 연락정보</th>
                    <th>구인 제목 (우대사항)</th>
                    <th>급여 조건</th>
                  </tr>
                </thead>
                <tbody>
                  {currentGeneralJobs.map((job) => (
                    <tr key={job.id}>
                      <td className={styles.tableLocCol}>
                        <span className={styles.tableLocBadge}>{job.location}</span>
                        <span className={styles.tableJobBadge}>바텐더</span>
                      </td>
                      <td className={styles.tableCompanyCol}>
                        <strong>{job.companyName}</strong>
                        <span className={styles.tableOnlineBadge}>온라인지원</span>
                      </td>
                      <td className={styles.tableTitleCol}>
                        <Link href={`/job/${job.id}`} className={styles.tableLink}>
                          {job.title}
                        </Link>
                      </td>
                      <td className={styles.tablePayCol}>
                        <span className={styles.tablePayVal}>{job.pay}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className={styles.tablePagination}>
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={`gen-page-${pageNum}`}
                    className={`${styles.pageBtn} ${pageNum === currentPage ? styles.pageBtnActive : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 12. 최신 인재 정보 (Talent Table) */}
          <section className={styles.talentSection}>
            <h3 className={styles.sectionHeading}>🙋‍♀️ 최신 인재 구직 정보</h3>
            <div className={styles.tableWrapper}>
              <table className={styles.talentTable}>
                <thead>
                  <tr>
                    <th>이름 / 나이</th>
                    <th>희망 업종</th>
                    <th>자기 소개 및 한마디</th>
                    <th>희망 급여</th>
                    <th>등록일</th>
                  </tr>
                </thead>
                <tbody>
                  {talentListings.slice(0, 10).map((talent) => (
                    <tr key={talent.id}>
                      <td className={styles.talentNameCol}>
                        <strong>{talent.name}</strong> ({talent.age}/{talent.gender})
                      </td>
                      <td className={styles.talentJobCol}>
                        <span className={styles.talentJobBadge}>{talent.jobType}</span>
                      </td>
                      <td className={styles.talentTitleCol}>
                        {talent.title}
                      </td>
                      <td className={styles.talentPayCol}>
                        <strong>{talent.pay}</strong>
                      </td>
                      <td className={styles.talentDateCol}>
                        {talent.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Sidebar Banner Ads */}
        <aside className={styles.rightSidebar}>
          <div className={`${styles.sidebarAdCard} ${styles.bgGold}`}>
            <span className={styles.sidebarAdBadgeGold}>VIP</span>
            <h4>분당 최고대우</h4>
            <p>초보 환영 17만</p>
            <p className={styles.highlight}>출퇴근 지원</p>
            <div className={styles.sidebarAdArrow}>CLICK ▶</div>
          </div>
          <div className={`${styles.sidebarAdCard} ${styles.bgBlue}`}>
            <span className={styles.sidebarAdBadge}>에이스</span>
            <h4>강남 에이원</h4>
            <p>시급 15~25+@</p>
            <p className={styles.highlight}>최고의 환경</p>
            <div className={styles.sidebarAdArrow}>CLICK ▶</div>
          </div>
          <div className={styles.sidebarStickyBanner}>
            <p>아름다운밤<br/>24시간<br/>고객상담센터<br/><strong>1588-0000</strong></p>
          </div>
        </aside>
      </div>
    </div>
  );
}
