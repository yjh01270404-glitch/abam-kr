const fs = require('fs');

const targetFile = 'src/components/AbamLanding.tsx';
let content = fs.readFileSync(targetFile, 'utf8');

// 교체할 대상: header부터 section id="intro" 직전까지
const startMarker = '{/* ── 1. 상단 헤더: 좌측 로고 & 상단 우측 메뉴 배치 ── */}';
const endMarker = '{/* ── 3. 출장안마 서비스 안내 ── */}';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found! startIndex:', startIndex, 'endIndex:', endIndex);
  process.exit(1);
}

const replacement = `{/* ── 1. 상단 헤더: 스피드출장 스타일 모바일 햄버거 + 중앙 로고 + 퀵 통화 ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#0a0b10', borderBottom: '1px solid #1f232e' }}>
        <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
          
          {/* 좌측: 모바일 햄버거 메뉴 버튼 (스피드출장 노란색 ☰ 스타일) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="전체 메뉴 열기"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#f59e0b',
                fontSize: '26px',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
              }}
            >
              ☰
            </button>

            {/* 중앙 로고: 아름다운 밤 [아밤] */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.9))' }}>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="url(#headerMoonGradSpeed)" />
                <defs>
                  <linearGradient id="headerMoonGradSpeed" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
              <span style={{ fontSize: '20px', fontWeight: 900, color: '#f59e0b', letterSpacing: '-0.5px' }}>
                아름다운 밤 <span style={{ color: '#ffffff' }}>아밤</span>
              </span>
            </Link>
          </div>

          {/* 우측: 데스크톱 메뉴 + 모바일 퀵 통화 아이콘 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <a href="#intro" style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: 700, textDecoration: 'none', padding: '6px 8px' }}>소개</a>
              <a href="#price" style={{ color: '#ffffff', fontSize: '14px', fontWeight: 800, textDecoration: 'none', padding: '6px 8px' }}>코스</a>
              <a href="#rules" style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: 700, textDecoration: 'none', padding: '6px 8px' }}>안내</a>
              <a href="#reviews" style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: 700, textDecoration: 'none', padding: '6px 8px' }}>후기</a>
              <a href="#faq" style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: 700, textDecoration: 'none', padding: '6px 8px' }}>FAQ</a>
            </nav>

            <a
              href={c.contact.tel}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#e11d48',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '14px',
                padding: '7px 12px',
                borderRadius: '20px',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(225,29,72,0.4)',
              }}
            >
              <PhoneIcon size={15} /> <span>전화예약</span>
            </a>
          </div>
        </div>

        {/* ── 스피드출장 스타일 서브 카테고리 칩 바 (가로 2열 / 스크롤) ── */}
        <div style={{ background: '#0e1017', borderTop: '1px solid #1a1e29', padding: '8px 12px', overflowX: 'auto', whiteSpace: 'nowrap', WebkitOverflowScrolling: 'touch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '14px', fontSize: '13.5px', fontWeight: 800 }}>
              <a href="#price" style={{ color: '#ffffff', textDecoration: 'none' }}>아밤출장마사지</a>
              <a href="#price" style={{ color: '#f59e0b', textDecoration: 'none' }}>코스안내</a>
              <a href="#safety" style={{ color: '#cbd5e1', textDecoration: 'none' }}>100%후불제</a>
              <a href="#intro" style={{ color: '#cbd5e1', textDecoration: 'none' }}>서울출장마사지</a>
              <a href="#intro" style={{ color: '#cbd5e1', textDecoration: 'none' }}>경기출장마사지</a>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '12.5px', fontWeight: 700, color: '#94a3b8' }}>
              <a href="/seo/%EA%B0%95%EB%82%A8%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80" style={{ color: '#fef08a', textDecoration: 'none' }}>강남출장안마</a>
              <a href="/seo/%EC%84%9C%EC%B4%88%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80" style={{ color: '#cbd5e1', textDecoration: 'none' }}>서초출장안마</a>
              <a href="/seo/%EC%86%A1%ED%8C%8C%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80" style={{ color: '#cbd5e1', textDecoration: 'none' }}>송파출장안마</a>
              <a href="/seo/%EB%B6%84%EB%8B%B9%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80" style={{ color: '#cbd5e1', textDecoration: 'none' }}>분당·판교</a>
              <a href="/seo/%EC%88%98%EC%9B%90%EC%B6%9C%EC%9E%A5%EB%A7%88%EC%82%AC%EC%A7%80" style={{ color: '#cbd5e1', textDecoration: 'none' }}>수원·동탄</a>
            </div>
          </div>
        </div>

        {/* ── 햄버거 메뉴 모바일 슬라이드 드로어 ── */}
        {menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              zIndex: 9999,
              display: 'flex',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '80%',
                maxWidth: '320px',
                height: '100%',
                background: '#12141c',
                borderRight: '1px solid #282b36',
                padding: '24px 20px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#f59e0b' }}>🌙 아름다운 밤 메뉴</div>
                  <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#cbd5e1', fontSize: '24px', cursor: 'pointer' }}>✕</button>
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <a href="#intro" onClick={() => setMenuOpen(false)} style={{ color: '#ffffff', fontSize: '17px', fontWeight: 800, textDecoration: 'none', padding: '6px 0' }}>서비스 소개</a>
                  <a href="#price" onClick={() => setMenuOpen(false)} style={{ color: '#ffffff', fontSize: '17px', fontWeight: 800, textDecoration: 'none', padding: '6px 0' }}>코스 및 가격표</a>
                  <a href="#rules" onClick={() => setMenuOpen(false)} style={{ color: '#ffffff', fontSize: '17px', fontWeight: 800, textDecoration: 'none', padding: '6px 0' }}>이용 및 방문안내</a>
                  <a href="#safety" onClick={() => setMenuOpen(false)} style={{ color: '#ffffff', fontSize: '17px', fontWeight: 800, textDecoration: 'none', padding: '6px 0' }}>100% 현장 대면결제</a>
                  <a href="#reviews" onClick={() => setMenuOpen(false)} style={{ color: '#ffffff', fontSize: '17px', fontWeight: 800, textDecoration: 'none', padding: '6px 0' }}>고객 이용 후기</a>
                  <a href="#faq" onClick={() => setMenuOpen(false)} style={{ color: '#ffffff', fontSize: '17px', fontWeight: 800, textDecoration: 'none', padding: '6px 0' }}>자주 묻는 질문 FAQ</a>
                </nav>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #282b36' }}>
                  <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px' }}>다국어 언어 선택</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {LANGS.map((l) => (
                      <Link
                        key={l.code}
                        href={l.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '13px',
                          fontWeight: 800,
                          textDecoration: 'none',
                          background: l.code === c.lang ? '#f59e0b' : '#1c1f2b',
                          color: l.code === c.lang ? '#000000' : '#cbd5e1',
                        }}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href={c.contact.tel}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: '#e11d48',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '16px',
                    padding: '14px 0',
                    borderRadius: '8px',
                    textDecoration: 'none',
                  }}
                >
                  <PhoneIcon size={18} /> 24시 전화 바로연결
                </a>
                <a
                  href={SMS_HREF}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: '#2b3245',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '15px',
                    padding: '12px 0',
                    borderRadius: '8px',
                    textDecoration: 'none',
                  }}
                >
                  <SmsIcon size={18} /> 문자 간편예약
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── 메인 콘텐츠 ── */}
      <main className="abam-container" style={{ position: 'relative', zIndex: 1, wordBreak: 'keep-all' }}>

        {/* ── 2. 스피드출장 정석 비율: 화보 전면 풀스크린 히어로 (Full-Bleed 100% Background Hero) ── */}
        <section
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '78vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          {/* 전면 100% 배경 화보 이미지 (스피드출장과 동일한 풀스크린 비주얼) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src="/images/abam_hero_seductive.jpg"
              alt="아밤 24시 출장마사지 힐링 케어"
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
              sizes="100vw"
            />
            {/* 상단 및 하단 시네마틱 다크 그라데이션 오버레이 (텍스트 가독성 100% 확보) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(10,11,16,0.3) 0%, rgba(10,11,16,0.55) 40%, rgba(10,11,16,0.92) 80%, #0c0d11 100%)',
              }}
            />
          </div>

          {/* 화보 위에 시원시원하게 얹힌 텍스트 & 스피드출장 스타일 2대 둥근 캡슐 버튼 */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              maxWidth: '680px',
              margin: '0 auto',
              padding: '60px 18px 28px',
              textAlign: 'center',
              boxSizing: 'border-box',
            }}
          >
            {/* 영업 상태 뱃지 */}
            {status && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(18, 20, 28, 0.88)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(245,158,11,0.35)',
                  borderRadius: '20px',
                  padding: '6px 16px',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  color: '#fef08a',
                  marginBottom: '16px',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: status === 'closed' ? '#f59e0b' : '#10b981' }} />
                {x.status[status]}
              </div>
            )}

            {/* 대형 H1 메인 타이틀: 스피드출장 스타일 */}
            <h1
              style={{
                fontSize: '25px',
                fontWeight: 900,
                lineHeight: 1.4,
                color: '#ffffff',
                margin: '0 0 16px',
                letterSpacing: '-0.5px',
                textShadow: '0 2px 12px rgba(0,0,0,0.85)',
                wordBreak: 'keep-all',
              }}
            >
              서울출장마사지 서울출장안마 24시 예약 안내<br />
              <span style={{ color: '#f59e0b' }}>– 아름다운 밤 [아밤]</span>
            </h1>

            {/* 스피드출장 정석 본문 설명 텍스트 (화면 가득 시원시원한 가독성) */}
            <p
              style={{
                fontSize: '16.5px',
                color: '#f1f5f9',
                lineHeight: 1.75,
                margin: '0 auto 24px',
                wordBreak: 'keep-all',
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                maxWidth: '560px',
              }}
            >
              아밤은 선입금·예약금이 단 1원도 없는 <strong style={{ color: '#fef08a' }}>100% 현장 대면결제</strong> 원칙을 준수합니다.
              서울·경기 전지역 고객님이 머무시는 자택이나 호텔, 오피스텔 등으로 전원 20대 에이스 관리사가 30분 내 직접 찾아가는 1:1 프라이빗 맞춤 케어 서비스입니다.
            </p>

            {/* 핵심 3대 신뢰 포인트 바 */}
            <div
              style={{
                background: 'rgba(18, 20, 28, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '12px 14px',
                margin: '0 auto 24px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                fontSize: '14.5px',
                color: '#ffffff',
                fontWeight: 800,
              }}
            >
              <span>100% 대면결제</span>
              <span style={{ color: '#475569' }}>|</span>
              <span>20대 전문 힐러</span>
              <span style={{ color: '#475569' }}>|</span>
              <span>서울·경기 30분 도착</span>
            </div>

            {/* ── 스피드출장 100% 동일한 2대 시그니처 둥근 캡슐 버튼 ── */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                maxWidth: '460px',
                margin: '0 auto',
              }}
            >
              {/* 🟡 노란색 둥근 알약 버튼: 전화하기 */}
              <a
                href={c.contact.tel}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#f59e0b',
                  color: '#000000',
                  fontSize: '18px',
                  fontWeight: 900,
                  padding: '16px 0',
                  borderRadius: '35px',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(245,158,11,0.5)',
                  boxSizing: 'border-box',
                }}
              >
                <PhoneIcon size={20} /> 전화하기
              </a>

              {/* ⚪ 흰색 둥근 알약 버튼: 코스 보기 */}
              <a
                href="#price"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#ffffff',
                  color: '#0a0b10',
                  fontSize: '18px',
                  fontWeight: 900,
                  padding: '16px 0',
                  borderRadius: '35px',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(255,255,255,0.3)',
                  boxSizing: 'border-box',
                }}
              >
                💆 코스 보기
              </a>
            </div>

            {/* 1시간 전 예약 안내 */}
            <div style={{ marginTop: '16px', fontSize: '13.5px', color: '#cbd5e1', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
              ※ 희망 시간 <strong>1시간 전 미리 예약</strong>해 주시면 원하시는 시간대에 가장 수월하게 이용 가능합니다.
            </div>
          </div>
        </section>
        `;

const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);
fs.writeFileSync(targetFile, newContent, 'utf8');
console.log('Successfully refactored AbamLanding.tsx with speedmassage layout!');
