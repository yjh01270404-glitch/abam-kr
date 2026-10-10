const fs = require('fs');

const targetFile = 'src/components/AbamLanding.tsx';
let content = fs.readFileSync(targetFile, 'utf8');

// 1. 헤더 수정: desktop-only 네비게이션 제거 및 스피드출장과 100% 동일한 미니멀 깔끔 헤더
// <nav className="desktop-only" ... </nav> 제거
content = content.replace(
  /<nav className="desktop-only"[\s\S]*?<\/nav>/,
  ''
);

// 2. 히어로 섹션 수정: 스피드출장 전면 풀스크린 화보 배경 (모델 바스트 샷 정면 응시)
const heroStart = '{/* ── 2. 스피드출장 정석 비율: 화보 전면 풀스크린 히어로 (Full-Bleed 100% Background Hero) ── */}';
const heroEnd = '{/* ── 3. 출장안마 서비스 안내 ── */}';

const hStartIndex = content.indexOf(heroStart);
const hEndIndex = content.indexOf(heroEnd);

if (hStartIndex === -1 || hEndIndex === -1) {
  console.error('Hero markers not found!');
  process.exit(1);
}

const newHero = `{/* ── 2. 스피드출장 정석 비율: 화보 전면 풀스크린 히어로 (Full-Bleed 100% Background Hero) ── */}
        <section
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '82vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
          }}
        >
          {/* 전면 100% 배경 화보: 스피드출장과 100% 동일한 구도의 한국 20대 모델 바스트 샷 */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src="/images/abam_hero_speed_model.jpg"
              alt="아밤 24시 출장마사지 힐링 케어"
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
              sizes="100vw"
            />
            {/* 시네마틱 다크 그라데이션 오버레이: 상단은 모델 얼굴이 맑게 보이고 하단 텍스트 영역은 짙은 블랙으로 가독성 100% */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(10,11,16,0.15) 0%, rgba(10,11,16,0.3) 35%, rgba(10,11,16,0.78) 65%, rgba(10,11,16,0.96) 88%, #0c0d11 100%)',
              }}
            />
          </div>

          {/* 화보 위에 시원시원하게 얹힌 텍스트 & 스피드출장 스타일 2대 둥근 캡슐 버튼 */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              maxWidth: '600px',
              margin: '0 auto',
              padding: '40px 16px 24px',
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
                  border: '1px solid rgba(245,158,11,0.4)',
                  borderRadius: '20px',
                  padding: '5px 14px',
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#fef08a',
                  marginBottom: '14px',
                }}
              >
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: status === 'closed' ? '#f59e0b' : '#10b981' }} />
                {x.status[status]}
              </div>
            )}

            {/* 대형 H1 메인 타이틀: 스피드출장 100% 동일 비율 */}
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 900,
                lineHeight: 1.35,
                color: '#ffffff',
                margin: '0 0 14px',
                letterSpacing: '-0.5px',
                textShadow: '0 2px 14px rgba(0,0,0,0.95), 0 0 4px rgba(0,0,0,0.9)',
                wordBreak: 'keep-all',
              }}
            >
              서울출장마사지 서울출장안마 24시 예약 안내<br />
              <span style={{ color: '#f59e0b' }}>– 아름다운 밤 [아밤]</span>
            </h1>

            {/* 스피드출장 정석 본문 설명 텍스트 (화면 가득 시원시원한 가독성) */}
            <p
              style={{
                fontSize: '16px',
                color: '#f8fafc',
                lineHeight: 1.7,
                margin: '0 auto 20px',
                wordBreak: 'keep-all',
                textShadow: '0 2px 12px rgba(0,0,0,0.95)',
                maxWidth: '520px',
              }}
            >
              서울출장마사지는 고객이 머무시는 자택이나 호텔, 모텔, 오피스텔 등으로 100% 한국인 관리사가 직접 찾아가는 1:1 방문 맞춤 케어 서비스입니다. 선입금·예약금이 단 1원도 없는 <strong style={{ color: '#fef08a' }}>100% 현장 대면결제</strong>로 안전하고 편안하게 컨디션을 관리하실 수 있습니다.
            </p>

            {/* 핵심 3대 신뢰 포인트 바 */}
            <div
              style={{
                background: 'rgba(18, 20, 28, 0.88)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '11px 12px',
                margin: '0 auto 20px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                fontSize: '14px',
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
                gap: '10px',
                maxWidth: '420px',
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
                  fontSize: '17.5px',
                  fontWeight: 900,
                  padding: '15px 0',
                  borderRadius: '35px',
                  textDecoration: 'none',
                  boxShadow: '0 6px 18px rgba(245,158,11,0.5)',
                  boxSizing: 'border-box',
                }}
              >
                <PhoneIcon size={19} /> 전화하기
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
                  fontSize: '17.5px',
                  fontWeight: 900,
                  padding: '15px 0',
                  borderRadius: '35px',
                  textDecoration: 'none',
                  boxShadow: '0 6px 18px rgba(255,255,255,0.3)',
                  boxSizing: 'border-box',
                }}
              >
                💆 코스 보기
              </a>
            </div>

            {/* 1시간 전 예약 안내 */}
            <div style={{ marginTop: '14px', fontSize: '13px', color: '#cbd5e1', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
              ※ 희망 시간 <strong>1시간 전 미리 예약</strong>해 주시면 원하시는 시간대에 가장 수월하게 이용 가능합니다.
            </div>
          </div>
        </section>
        `;

content = content.substring(0, hStartIndex) + newHero + content.substring(hEndIndex);

// 3. abam-container 스타일 수정: 화면 가로폭을 절대 좁히지 않고 100% 꽉 차게
content = content.replace(
  /@media \(min-width: 640px\) \{\s*\.abam-container \{\s*max-width: 860px;\s*padding: 0 20px;\s*\}\s*\}/,
  `@media (min-width: 640px) {
    .abam-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 16px;
    }
  }`
);

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully applied speedmassage bust shot model and layout!');
