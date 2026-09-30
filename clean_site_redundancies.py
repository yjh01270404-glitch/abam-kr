import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Remove Target 1: Redundant top black banner at 971-1043
pattern_top_banner = r'\{\/\* ── \[대문짝만한 이용가능 시간 공지 배너 \(1080px 와이드 전면 노출\)\] ── \*\/\}\s*<div style=\{\{\s*position: \'relative\',[\s\S]*?📞 010-6607-2239 지금 즉시 예약\s*<\/a>\s*<\/div>\s*<\/div>'

match1 = re.search(pattern_top_banner, text)
if match1:
    print('Found Target 1 top banner, removing...')
    text = text[:match1.start()] + text[match1.end():]
else:
    print('Target 1 regex not matched, trying manual replacement')
    # Try finding exact markers
    start_marker = '{/* ── [대문짝만한 이용가능 시간 공지 배너 (1080px 와이드 전면 노출)] ── */}'
    end_marker = '{/* ── 매혹적인 분위기의 럭셔리 스파 히어로 카드 & 오늘 밤 출근 20대 S급 에이스 라인업 ── */}'
    if start_marker in text and end_marker in text:
        s_idx = text.find(start_marker)
        e_idx = text.find(end_marker)
        text = text[:s_idx] + text[e_idx:]
        print('Target 1 removed via markers!')

# 2. Clean Target 2: Duplicate black banner inside Hero
pattern_hero_duplicate = r'\{\/\* ── \[대문짝만한 이용가능 시간 공지\] ── \*\/\}\s*<div style=\{\{\s*background: \'linear-gradient\(135deg, #090d16 0%, #161f33 100%\)\',[\s\S]*?🔥 20대 S급 테라피스트 출근 완료 · 이용시간: 오후 7시 ~ 새벽 5시 예약가능 · 서울 외 이동 불가 양해 요망<\/span>\s*<\/div>'

replacement_hero_clean = '''{/* 운영시간 & 서울 전역 배차 뱃지 */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#fefcf2',
              border: '1.5px solid #d4af37',
              borderRadius: '24px',
              padding: '8px 18px',
              marginBottom: '18px',
              boxShadow: '0 2px 10px rgba(212, 175, 55, 0.12)',
              flexWrap: 'wrap',
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dc2626' }} />
              <span style={{ fontSize: '13.5px', fontWeight: 950, color: '#854d0e' }}>
                ⏰ 이용가능 시간 : 오후 7시 ~ 새벽 5시 예약가능
              </span>
              <span style={{ color: '#d4af37' }}>|</span>
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#475569' }}>
                서울 25개 구 전지역 20~30분 도착 (※ 서울 외 이동 불가 양해 요망)
              </span>
            </div>'''

match2 = re.search(pattern_hero_duplicate, text)
if match2:
    print('Found Target 2 hero banner, replacing...')
    text = text[:match2.start()] + replacement_hero_clean + text[match2.end():]
else:
    print('Target 2 regex not matched, trying manual replacement')
    start_m2 = '{/* ── [대문짝만한 이용가능 시간 공지] ── */}'
    end_m2 = '<div style={{ fontSize: \'13px\', fontWeight: 900, color: \'#b38728\''
    if start_m2 in text and end_m2 in text:
        s_idx = text.find(start_m2)
        e_idx = text.find(end_m2)
        text = text[:s_idx] + replacement_hero_clean + '\n\n            ' + text[e_idx:]
        print('Target 2 replaced via markers!')

# 3. Remove Target 3: Redundant duplicate course card section
start_m3 = '{/* ── 정찰제 코스 프로그램 카드 ── */}'
end_m3 = '{/* ── 5대 코스 특성 비교표 ── */}'
if start_m3 in text and end_m3 in text:
    s_idx = text.find(start_m3)
    e_idx = text.find(end_m3)
    text = text[:s_idx] + text[e_idx:]
    print('Target 3 redundant course cards removed!')

# 4. Clean Target 4: Convert dark secret banner to 100% white mode
dark_banner_marker = '{/* ── 심야 VIP 시크릿 힐링 배너 ── */}'
next_marker = '{/* ── [벤치마크 특화 1] ⚠️ 선입금 사기 박멸 안전 주의보 & 100% 현장 후불 보증 ── */}'
if dark_banner_marker in text and next_marker in text:
    s_idx = text.find(dark_banner_marker)
    e_idx = text.find(next_marker)
    white_secret_banner = '''{/* ── 심야 VIP 시크릿 힐링 배너 (화이트 럭셔리) ── */}
        <section style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          border: '2px solid #d4af37',
          borderRadius: '20px',
          padding: '40px 28px',
          textAlign: 'center',
          boxShadow: '0 12px 32px rgba(212, 175, 55, 0.18)',
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '12.5px', fontWeight: 900, color: '#b38728', marginBottom: '8px', letterSpacing: '1px' }}>
              ⏰ 오후 7시부터 새벽 5시까지 예약가능 · 서울 전지역 20~30분 즉시 도착
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#090d16', margin: '0 0 10px', letterSpacing: '-0.5px' }}>
              깊어가는 밤, 당신만을 위한 가장 은밀한 힐링 — 아름다운 밤 (Abam)
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', margin: '0 auto 24px', maxWidth: '640px', lineHeight: 1.65 }}>
              선입금 0원 · 100% 현장 대면결제! 오후 7시부터 새벽 5시까지 오직 서울 25개 자치구 전지역 어디든 20~30분 내외로 즉시 찾아갑니다. (※ 20~30분 신속 배차 약속과 집중 케어를 위해 서울 이외에는 이동이 어렵습니다. 너른 양해 부탁드립니다.)
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={KAKAO_LINK} onClick={handleKakaoConnect}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#FEE500', color: '#181600', fontWeight: 900, fontSize: '15px', padding: '13px 26px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(254,229,0,0.35)', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
                카카오톡 바로연결 (ID: {KAKAO_ID})
              </a>
              <a href={PHONE_TEL} onClick={handlePhoneCall}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#dc2626', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '13px 26px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(220,38,38,0.3)', cursor: 'pointer' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
                {PHONE_NUM} 즉시 전화연결
              </a>
            </div>
          </div>
        </section>\n\n        '''
    text = text[:s_idx] + white_secret_banner + text[e_idx:]
    print('Target 4 converted to white mode!')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print('Clean redundancies script finished successfully!')
