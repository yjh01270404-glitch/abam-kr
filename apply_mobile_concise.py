with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Top Notice Bar
old_top_bar = '''      {/* ── 최상단 프레스티지 블랙 & 샴페인 골드 안내 띠 ── */}
      <div style={{ background: '#070a10', borderBottom: '1px solid rgba(212, 175, 55, 0.45)', color: '#f3e5ab', padding: '10px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 800, letterSpacing: '0.3px', boxShadow: '0 2px 12px rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap', wordBreak: 'keep-all' }}>
        <span>⏰ 이용가능 시간 : <strong style={{ color: '#fde047', fontSize: '13px' }}>오후 7시부터 새벽 5시까지 예약가능</strong> · 오직 서울 전지역 20~30분 도착 (※ 서울 이외에는 이동이 어려운 점 양해 부탁드립니다) · 100% 현장 대면결제</span>
        <span style={{ color: '#d4af37' }}>|</span>
        <span style={{ color: '#ffffff' }}>🌍 English/日本語/中文 24/7 WhatsApp: +82 10-6607-2239</span>
      </div>'''

new_top_bar = '''      {/* ── 최상단 프레스티지 블랙 & 샴페인 골드 안내 띠 ── */}
      <div className="mobile-top-bar" style={{ background: '#070a10', borderBottom: '1px solid rgba(212, 175, 55, 0.45)', color: '#f3e5ab', padding: '9px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 800, letterSpacing: '0.3px', boxShadow: '0 2px 12px rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap', wordBreak: 'keep-all' }}>
        <span>⏰ 이용가능 시간 : <strong style={{ color: '#fde047', fontSize: '13px' }}>오후 7시부터 새벽 5시까지 예약가능</strong> · 오직 서울 전지역 20~30분 도착 (※ 서울 외 이동 불가 양해 요망) · 100% 현장 대면결제</span>
        <span className="mobile-hide-on-mobile" style={{ color: '#d4af37' }}>|</span>
        <span className="mobile-hide-on-mobile" style={{ color: '#ffffff' }}>🌍 English/日本語/中文 24/7 WhatsApp: +82 10-6607-2239</span>
      </div>'''

if old_top_bar in text:
    text = text.replace(old_top_bar, new_top_bar)
    print('1. Top bar updated!')

# 2. Header: Slim single row on mobile, hide duplicate buttons
old_header = '''        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AbamMoonLogo size={44} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 950, color: '#090d16', letterSpacing: '-0.5px' }}>
                  아름다운 밤 <span style={{ color: '#b38728', fontSize: '16.5px', fontWeight: 900 }}>타이 홈케어</span>
                </span>
                <span style={{ fontSize: '10.5px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>
                  Abam
                </span>
              </div>
              <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: 700, letterSpacing: '0.4px', marginTop: '1px' }}>
                MIDNIGHT VIP SENSORY THERAPY · 프라이빗 심야 힐링
              </span>
            </div>
          </div>

          {/* 우측: 다국어 스위처 & 예약 버튼 그룹 (WhatsApp / 카카오 / 전화) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f1f5f9', padding: '3px 6px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', fontWeight: 950, color: '#090d16', background: '#ffffff', padding: '3px 7px', borderRadius: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>🇰🇷 KR</span>
              <Link href="/en" style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textDecoration: 'none', padding: '3px 6px' }}>🇺🇸 EN</Link>
              <Link href="/jp" style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textDecoration: 'none', padding: '3px 6px' }}>🇯🇵 JP</Link>
              <Link href="/cn" style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textDecoration: 'none', padding: '3px 6px' }}>🇨🇳 CN</Link>
            </div>

            <a href={WHATSAPP_LINK} onClick={handleWhatsAppConnect} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#25D366', padding: '9px 13px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.3)', cursor: 'pointer' }}>
              <span style={{ fontSize: '14px' }}>💬</span> WhatsApp
            </a>

            <a href={KAKAO_LINK} onClick={handleKakaoConnect} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 900, color: '#181600', backgroundColor: '#FEE500', padding: '9px 16px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(254,229,0,0.32)', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
              카톡: {KAKAO_ID}
            </a>
            <a href={PHONE_TEL} onClick={handlePhoneCall} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 800, color: '#f8fafc', padding: '9px 16px', borderRadius: '6px', textDecoration: 'none', backgroundColor: '#090d16', border: '1px solid #d4af37', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', cursor: 'pointer' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#f8fafc"/></svg>
              전화예약
            </a>
          </div>
        </div>'''

new_header = '''        <div className="mobile-compact-header" style={{ maxWidth: '1080px', margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AbamMoonLogo size={36} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '16.5px', fontWeight: 950, color: '#090d16', letterSpacing: '-0.4px' }}>
                  아름다운 밤 <span style={{ color: '#b38728', fontSize: '15px', fontWeight: 900 }}>홈케어</span>
                </span>
                <span style={{ fontSize: '10px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '1px 6px', borderRadius: '4px' }}>
                  Abam
                </span>
              </div>
              <span className="logo-subtext" style={{ display: 'block', fontSize: '10.5px', color: '#64748b', fontWeight: 700, letterSpacing: '0.3px' }}>
                프라이빗 심야 1:1 방문 테라피
              </span>
            </div>
          </div>

          {/* 우측: 다국어 스위처 & (데스크톱 전용 버튼 그룹) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: '#f1f5f9', padding: '2px 4px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 950, color: '#090d16', background: '#ffffff', padding: '2px 5px', borderRadius: '4px' }}>🇰🇷 KR</span>
              <Link href="/en" style={{ fontSize: '10.5px', fontWeight: 800, color: '#475569', textDecoration: 'none', padding: '2px 5px' }}>🇺🇸 EN</Link>
              <Link href="/jp" style={{ fontSize: '10.5px', fontWeight: 800, color: '#475569', textDecoration: 'none', padding: '2px 5px' }}>🇯🇵 JP</Link>
              <Link href="/cn" style={{ fontSize: '10.5px', fontWeight: 800, color: '#475569', textDecoration: 'none', padding: '2px 5px' }}>🇨🇳 CN</Link>
            </div>

            <div className="mobile-hide-header-btns" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <a href={WHATSAPP_LINK} onClick={handleWhatsAppConnect} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 900, color: '#ffffff', backgroundColor: '#25D366', padding: '8px 12px', borderRadius: '6px', textDecoration: 'none', cursor: 'pointer' }}>
                💬 WhatsApp
              </a>
              <a href={KAKAO_LINK} onClick={handleKakaoConnect} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', fontWeight: 900, color: '#181600', backgroundColor: '#FEE500', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', cursor: 'pointer' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
                카톡: {KAKAO_ID}
              </a>
              <a href={PHONE_TEL} onClick={handlePhoneCall} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', fontWeight: 800, color: '#f8fafc', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none', backgroundColor: '#090d16', border: '1px solid #d4af37', cursor: 'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#f8fafc"/></svg>
                전화예약
              </a>
            </div>
          </div>
        </div>'''

if old_header in text:
    text = text.replace(old_header, new_header)
    print('2. Header updated!')

# 3. Hero Section: Clean up text wall on mobile
old_hero_sec = '<section style={{ position: \'relative\', overflow: \'hidden\', backgroundColor: \'#ffffff\', borderRadius: \'22px\', border: \'1.5px solid rgba(212, 175, 55, 0.45)\', boxShadow: \'0 0 35px rgba(212, 175, 55, 0.16), 0 22px 50px rgba(0, 0, 0, 0.36)\', padding: \'46px 32px\' }}>'
new_hero_sec = '<section className="mobile-hero-section" style={{ position: \'relative\', overflow: \'hidden\', backgroundColor: \'#ffffff\', borderRadius: \'22px\', border: \'1.5px solid rgba(212, 175, 55, 0.45)\', boxShadow: \'0 0 35px rgba(212, 175, 55, 0.16), 0 22px 50px rgba(0, 0, 0, 0.36)\', padding: \'40px 28px\' }}>'

if old_hero_sec in text:
    text = text.replace(old_hero_sec, new_hero_sec)
    print('3. Hero section tag updated!')

# Hero h1
old_hero_h1 = '<h1 style={{ fontSize: \'33px\', fontWeight: 950, lineHeight: 1.32, letterSpacing: \'-1px\', margin: \'0 0 16px\', color: \'#090d16\' }}>'
new_hero_h1 = '<h1 className="mobile-hero-h1" style={{ fontSize: \'clamp(22px, 5.2vw, 32px)\', fontWeight: 950, lineHeight: 1.32, letterSpacing: \'-0.8px\', margin: \'0 0 14px\', color: \'#090d16\' }}>'

if old_hero_h1 in text:
    text = text.replace(old_hero_h1, new_hero_h1)
    print('4. Hero h1 updated!')

# Hero text wall & bullets
old_hero_text = '''            <div style={{ fontSize: '15px', color: '#334155', lineHeight: 1.75, margin: '0 0 28px', wordBreak: 'keep-all' }}>
              <p style={{ margin: '0 0 14px', fontWeight: 800, color: '#090d16', fontSize: '15.5px', letterSpacing: '-0.3px', lineHeight: 1.65 }}>
                도메인 <strong>abam.kr</strong>의 의미 그대로,<br className="hidden sm:inline" />
                오늘 밤 <strong>오직 서울특별시 25개 자치구 전지역</strong> 어디든 당신만을 위한 가장 매혹적이고 감미로운 '아름다운 밤'을 선물합니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '14px', borderLeft: '3px solid #d4af37', margin: '12px 0 0 2px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#b38728', fontWeight: 950, lineHeight: 1.6, fontSize: '15px', flexShrink: 0 }}>•</span>
                  <span style={{ lineHeight: 1.65, fontSize: '14px', color: '#334155' }}>
                    <strong>오직 서울특별시 25개 자치구 100% 전지역</strong>(강남, 서초, 송파, 마포, 용산, 영등포, 종로, 중구, 성동, 강서 등) <strong>평균 20~30분 내외</strong> 즉시 신속 방문합니다. <strong>(※ 최상의 케어 집중도와 20~30분 도착 약속을 위해 서울 이외에는 이동이 어렵사오니 고객님의 너른 양해 부탁드립니다)</strong>
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#b38728', fontWeight: 950, lineHeight: 1.6, fontSize: '15px', flexShrink: 0 }}>•</span>
                  <span style={{ lineHeight: 1.65, fontSize: '14px', color: '#334155' }}>
                    타인의 시선 없는 고객님의 프라이빗 룸(자택·호텔·오피스텔)이 달빛 아래 단둘이 누리는 <strong>은밀하고 화려한 최고급 럭셔리 스파</strong>로 바뀝니다.
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#b38728', fontWeight: 950, lineHeight: 1.6, fontSize: '15px', flexShrink: 0 }}>•</span>
                  <span style={{ lineHeight: 1.65, fontSize: '14px', color: '#334155' }}>
                    살결을 타고 흐르는 은은한 천연 아로마 향과 섬세하고 감미로운 손길이 온몸의 감각을 깨우며 <strong>깊어가는 밤 잊지 못할 극상의 전율</strong>을 선사합니다.
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#b38728', fontWeight: 950, lineHeight: 1.6, fontSize: '15px', flexShrink: 0 }}>•</span>
                  <span style={{ lineHeight: 1.65, fontSize: '14px', color: '#334155' }}>
                    선입금 0원 · 100% 현장 대면결제! 엄선된 20대 S급 에이스 관리사가 새벽 5시 마감 전까지 지체 없이 찾아갑니다.
                  </span>
                </div>
              </div>
            </div>'''

new_hero_text = '''            {/* 데스크톱 전용 상세 설명 */}
            <div className="mobile-hero-bullets" style={{ fontSize: '15px', color: '#334155', lineHeight: 1.75, margin: '0 0 24px', wordBreak: 'keep-all' }}>
              <p style={{ margin: '0 0 12px', fontWeight: 800, color: '#090d16', fontSize: '15px', letterSpacing: '-0.3px', lineHeight: 1.6 }}>
                도메인 <strong>abam.kr</strong>의 의미 그대로, 오늘 밤 <strong>오직 서울특별시 25개 자치구 전지역</strong> 어디든 당신만을 위한 가장 매혹적이고 감미로운 '아름다운 밤'을 선물합니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '12px', borderLeft: '3px solid #d4af37', margin: '10px 0 0 2px' }}>
                <div style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.6 }}>
                  • <strong>오직 서울특별시 25개 자치구 전지역</strong> 평균 20~30분 내외 신속 방문 (※ 서울 외 이동 불가 양해 요망)
                </div>
                <div style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.6 }}>
                  • 타인의 시선 없는 고객님의 프라이빗 룸(자택·호텔·오피스텔)에서 1:1 방문 맞춤 스파
                </div>
                <div style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.6 }}>
                  • 선입금 0원 · 100% 현장 대면결제! 엄선된 20대 S급 에이스 관리사 방문
                </div>
              </div>
            </div>

            {/* 모바일 전용 간결한 3단 요약 배너 */}
            <div className="mobile-hero-summary" style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.55, margin: '0 0 10px', fontWeight: 600 }}>
                도메인 <strong>abam.kr</strong> 그대로, 서울 25개 구 전지역 <strong>20~30분 도착</strong>하는 1:1 프라이빗 럭셔리 홈케어입니다.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', textAlign: 'center' }}>
                <div style={{ backgroundColor: '#fefcf4', border: '1px solid #d4af37', borderRadius: '10px', padding: '8px 4px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 950, color: '#854d0e' }}>선입금 0원</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '1px' }}>100% 대면결제</div>
                </div>
                <div style={{ backgroundColor: '#fefcf4', border: '1px solid #d4af37', borderRadius: '10px', padding: '8px 4px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 950, color: '#854d0e' }}>20~30분 도착</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '1px' }}>서울 25개 구</div>
                </div>
                <div style={{ backgroundColor: '#fefcf4', border: '1px solid #d4af37', borderRadius: '10px', padding: '8px 4px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 950, color: '#854d0e' }}>20대 S급</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '1px' }}>실물 100% 보증</div>
                </div>
              </div>
            </div>'''

if old_hero_text in text:
    text = text.replace(old_hero_text, new_hero_text)
    print('5. Hero text updated!')

# Hero buttons on desktop vs mobile (hide redundant duplicate buttons on mobile)
old_hero_btns = '{/* 일관된 순서: 카카오톡 바로연결 (좌) ➔ 전화예약 (우) */}\n            <div style={{ display: \'flex\', gap: \'10px\', flexWrap: \'wrap\', marginBottom: \'30px\' }}>'
new_hero_btns = '{/* 일관된 순서: 카카오톡 바로연결 (좌) ➔ 전화예약 (우) */}\n            <div className="mobile-hero-cta-btns" style={{ display: \'flex\', gap: \'10px\', flexWrap: \'wrap\', marginBottom: \'24px\' }}>'

if old_hero_btns in text:
    text = text.replace(old_hero_btns, new_hero_btns)
    print('6. Hero buttons class updated!')

# 4. Ace roster首都圈 typo fix
if '전원 실시간 배차 가능 (수도권 30분 도착)' in text:
    text = text.replace('전원 실시간 배차 가능 (수도권 30분 도착)', '전원 실시간 배차 가능 (서울 20~30분 도착)')
    print('7. Ace roster region text fixed to Seoul!')

# 5. Bottom Fixed Bar
old_bot_bar = '<div style={{ position: \'fixed\', bottom: 0, left: 0, right: 0, backgroundColor: \'rgba(255,255,255,0.98)\', backdropFilter: \'blur(16px)\', borderTop: \'1.5px solid rgba(212, 175, 55, 0.4)\', padding: \'6px 16px 8px\', display: \'flex\', flexDirection: \'column\', gap: \'5px\', zIndex: 50, boxShadow: \'0 -6px 25px rgba(0,0,0,0.18)\' }}>'
new_bot_bar = '<div className="mobile-bottom-bar" style={{ position: \'fixed\', bottom: 0, left: 0, right: 0, backgroundColor: \'rgba(255,255,255,0.98)\', backdropFilter: \'blur(16px)\', borderTop: \'1.5px solid rgba(212, 175, 55, 0.4)\', padding: \'5px 12px 6px\', display: \'flex\', flexDirection: \'column\', gap: \'4px\', zIndex: 50, boxShadow: \'0 -6px 25px rgba(0,0,0,0.18)\' }}>'

if old_bot_bar in text:
    text = text.replace(old_bot_bar, new_bot_bar)
    print('8. Bottom bar class updated!')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print('Mobile concise script completed!')
