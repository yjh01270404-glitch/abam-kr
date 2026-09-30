# -*- coding: utf-8 -*-
import re

HOURS_HERO_BANNER = '''{/* ── [대문짝만한 이용가능 시간 공지] ── */}
            <div style={{
              background: 'linear-gradient(135deg, #090d16 0%, #161f33 100%)',
              border: '2.5px solid #d4af37',
              borderRadius: '16px',
              padding: '16px 20px',
              marginBottom: '20px',
              boxShadow: '0 8px 30px rgba(212,175,55,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              wordBreak: 'keep-all',
              overflowWrap: 'break-word',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '30px', flexShrink: 0 }}>⏰</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 900, color: '#d4af37', letterSpacing: '1px', marginBottom: '2px' }}>
                    OPERATING &amp; RESERVATION HOURS
                  </div>
                  <div style={{ fontSize: 'clamp(18px, 4vw, 23px)', fontWeight: 950, color: '#ffffff', letterSpacing: '-0.5px', lineHeight: 1.35 }}>
                    이용가능 시간 : <span style={{ color: '#fde047', fontWeight: 950, textDecoration: 'underline', textUnderlineOffset: '5px', textDecorationColor: '#d4af37' }}>오후 7시부터 새벽 4시까지</span> 예약가능
                  </div>
                </div>
              </div>
              <div style={{ backgroundColor: '#fde047', color: '#181600', fontWeight: 950, fontSize: '12.5px', padding: '7px 16px', borderRadius: '30px', boxShadow: '0 2px 10px rgba(253,224,71,0.4)', flexShrink: 0 }}>
                ⚡ 서울 전지역 20~30분 총알 배차
              </div>
            </div>'''

def update_hours():
    path = 'src/app/page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update top bar
    old_top_bar = r'<div style=\{\{ background: \'#070a10\'.*?<span>🌙 SEOUL EXCLUSIVE VIP.*?</div>'
    new_top_bar = '''<div style={{ background: '#070a10', borderBottom: '1px solid rgba(212, 175, 55, 0.45)', color: '#f3e5ab', padding: '10px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 800, letterSpacing: '0.3px', boxShadow: '0 2px 12px rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap', wordBreak: 'keep-all' }}>
        <span>⏰ 이용가능 시간 : <strong style={{ color: '#fde047', fontSize: '13px' }}>오후 7시부터 새벽 4시까지 예약가능</strong> · 오직 서울 전지역 20~30분 도착 · 100% 현장 대면결제</span>
        <span style={{ color: '#d4af37' }}>|</span>
        <span style={{ color: '#ffffff' }}>🌍 English/日本語/中文 24/7 WhatsApp: +82 10-6607-2239</span>
      </div>'''
    content = re.sub(old_top_bar, new_top_bar, content, flags=re.DOTALL)

    # 2. Add HOURS_HERO_BANNER right above Hero Headline or badge
    hero_marker = '{/* 실시간 심야 배차 펄스 뱃지 (새벽 5시 마감) */}'
    if hero_marker in content:
        content = content.replace(hero_marker, HOURS_HERO_BANNER + '\n\n            ' + hero_marker)
    else:
        # fallback
        badge_marker = '<div style={{ display: \'inline-flex\', alignItems: \'center\', gap: \'8px\', backgroundColor: \'#090d16\','
        content = content.replace(badge_marker, HOURS_HERO_BANNER + '\n\n            ' + badge_marker, 1)

    # 3. Update pulse badge
    content = content.replace(
        '🔥 20대 S급 테라피스트 상시 대기 · 오직 서울 25개 구 20~30분 총알 배차',
        '🔥 20대 S급 테라피스트 출근 완료 · 이용시간: 오후 7시 ~ 새벽 4시 예약가능 (서울 20~30분 도착)'
    )

    # 4. Update 3 core cards (subtext)
    content = content.replace(
        "{ num: '30분 도착', label: '수도권 심야 총알배차', sub: '새벽 5시 마감까지' }",
        "{ num: '20~30분 도착', label: '서울 전역 총알배차', sub: '오후 7시 ~ 새벽 4시 예약' }"
    )

    # 5. Update Night Banner
    old_nb_title = '🌙 MIDNIGHT VIP SECRET ESCAPE · 새벽 5시 마감까지 상시 즉시 배차'
    new_nb_title = '⏰ 이용시간: 오후 7시부터 새벽 4시까지 예약가능 · 서울 전지역 20~30분 즉시 도착'
    content = content.replace(old_nb_title, new_nb_title)

    old_nb_p = '선입금 0원 · 100% 현장 대면결제! 24시간 연중무휴 오직 서울 25개 자치구 전지역 어디든 20~30분 내외로 즉시 찾아갑니다.'
    new_nb_p = '선입금 0원 · 100% 현장 대면결제! 오후 7시부터 새벽 4시까지 오직 서울 25개 자치구 전지역 어디든 20~30분 내외로 즉시 찾아갑니다.'
    content = content.replace(old_nb_p, new_nb_p)

    # 6. Update FAQ Q8
    old_faq_q8 = "q: 'Q8. 심야 늦은 시간(새벽 2~5시)에도 예약이 가능한가요?'"
    new_faq_q8 = "q: 'Q8. 이용 및 예약 가능 시간은 어떻게 되나요?'"
    content = content.replace(old_faq_q8, new_faq_q8)

    old_faq_a8 = "a: '네, 아밤 타이 홈케어는 24시간 연중무휴로 운영되며, 새벽 늦은 시간에도 실시간 예약과 신속 배차가 진행됩니다. 야근 후 늦은 귀가, 심야 회식 후 피로, 불면증으로 지친 밤 언제든 연락 주시면 가장 가까운 곳의 테라피스트가 20~30분 내로 즉시 달려갑니다.'"
    new_faq_a8 = "a: '아밤 타이 홈케어의 이용가능 시간은 매일 오후 7시부터 새벽 4시까지 예약 가능합니다. 퇴근 후 저녁 시간부터 늦은 심야까지 서울 25개 구 전지역 어디든 전화(010-6607-2239) 또는 카카오톡(Abam1004)으로 예약 주시면 가장 가까운 곳의 20대 테라피스트가 20~30분 내로 즉시 달려갑니다.'"
    content = content.replace(old_faq_a8, new_faq_a8)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Updated src/app/page.tsx with prominent operating hours successfully!')

def update_foreign_hours():
    # en
    with open('src/app/en/page.tsx', 'r', encoding='utf-8') as f:
        en = f.read()
    en = en.replace('24/7 Available', 'Operating Hours: 7:00 PM – 4:00 AM (Booking Available)')
    en = en.replace('24/7 Hotel In-Room Massage', '7:00 PM – 4:00 AM Hotel In-Room Massage')
    with open('src/app/en/page.tsx', 'w', encoding='utf-8') as f:
        f.write(en)

    # jp
    with open('src/app/jp/page.tsx', 'r', encoding='utf-8') as f:
        jp = f.read()
    jp = jp.replace('24時間', '午後7時〜深夜4時予約可能')
    with open('src/app/jp/page.tsx', 'w', encoding='utf-8') as f:
        f.write(jp)

    # cn
    with open('src/app/cn/page.tsx', 'r', encoding='utf-8') as f:
        cn = f.read()
    cn = cn.replace('24小时', '晚上7点至凌晨4点可预约')
    with open('src/app/cn/page.tsx', 'w', encoding='utf-8') as f:
        f.write(cn)

    print('Updated foreign hours successfully!')

update_hours()
update_foreign_hours()
