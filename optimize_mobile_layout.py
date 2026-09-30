import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Clean up duplicate 3-column grid inside mobile-hero-summary
old_mobile_summary = '''            {/* 모바일 전용 간결한 3단 요약 배너 */}
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

new_mobile_summary = '''            {/* 모바일 전용 간결한 요약 문구 */}
            <div className="mobile-hero-summary" style={{ marginBottom: '14px' }}>
              <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.55, margin: 0, fontWeight: 600 }}>
                도메인 <strong>abam.kr</strong> 그대로, 서울 25개 구 전지역 <strong>20~30분 도착</strong>하는 1:1 프라이빗 럭셔리 홈케어입니다.
              </p>
            </div>'''

if old_mobile_summary in text:
    text = text.replace(old_mobile_summary, new_mobile_summary)
    print('1. Duplicate 3-card grid in mobile summary removed!')

# 2. In Hero top operating hours badge, clean up for mobile
old_hero_badge = '''            {/* 운영시간 & 서울 전역 배차 뱃지 */}
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

new_hero_badge = '''            {/* 운영시간 & 서울 전역 배차 뱃지 */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#fefcf2',
              border: '1.5px solid #d4af37',
              borderRadius: '24px',
              padding: '6px 14px',
              marginBottom: '14px',
              boxShadow: '0 2px 8px rgba(212, 175, 55, 0.12)',
              flexWrap: 'wrap',
              fontSize: '12.5px',
              fontWeight: 900,
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#dc2626' }} />
              <span style={{ color: '#854d0e' }}>
                ⏰ 오후 7시 ~ 새벽 5시 예약가능
              </span>
              <span style={{ color: '#64748b', fontSize: '11.5px' }}>
                · 서울 20~30분 도착 (서울 외 이동 불가)
              </span>
            </div>'''

if old_hero_badge in text:
    text = text.replace(old_hero_badge, new_hero_badge)
    print('2. Hero badge streamlined!')

# 3. Clean up Foreigner card (purge 수도권, Greater Seoul, hide duplicate buttons on mobile)
text = text.replace('Seoul & Greater Seoul', 'Seoul 25 Districts')
text = text.replace('(서울 및 수도권 전 지역 30분 도착)', '(서울 25개 구 전지역 20~30분 도착)')

# In foreigner concierge bottom buttons:
target_foreign_btns = '''          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            <a
              href={WHATSAPP_LINK}'''

replace_foreign_btns = '''          <div className="mobile-hide-on-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            <a
              href={WHATSAPP_LINK}'''

if target_foreign_btns in text:
    text = text.replace(target_foreign_btns, replace_foreign_btns)
    print('3. Foreigner duplicate buttons hidden on mobile!')

# 4. In bottom floating bar, shorten notice text
old_bottom_notice = '⏰ <span style={{ color: \'#b38728\' }}>이용가능 시간 :</span> <strong>오후 7시부터 새벽 5시까지 예약가능</strong> · 서울 20~30분 도착 (※ 서울 이외 이동 불가 양해 요망)'
new_bottom_notice = '⏰ <strong style={{ color: \'#b38728\' }}>오후 7시 ~ 새벽 5시 예약가능</strong> · 서울 20~30분 도착 (※ 서울 외 이동 불가)'

if old_bottom_notice in text:
    text = text.replace(old_bottom_notice, new_bottom_notice)
    print('4. Bottom bar notice streamlined!')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print('Mobile optimization script finished successfully!')
