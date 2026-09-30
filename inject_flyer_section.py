import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. State addition
if 'const [flyerModalOpen, setFlyerModalOpen]' not in content:
    content = content.replace(
        'const [kakaoModalOpen, setKakaoModalOpen] = useState(false);',
        'const [kakaoModalOpen, setKakaoModalOpen] = useState(false);\n  const [flyerModalOpen, setFlyerModalOpen] = useState(false);'
    )

# 2. Flyer Modal Addition right after kakao modal closing
flyer_modal_code = '''
      {/* ── 전단 이미지 원본 모달 ── */}
      {flyerModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(5px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setFlyerModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '2px solid #d4af37',
              maxWidth: '520px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px 20px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
              position: 'relative',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setFlyerModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '16px',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                zIndex: 10,
              }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 950, color: '#090d16', margin: '0 0 4px' }}>
              아름다운 밤 (Abam) 모바일 전단 원본
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: '0 0 16px' }}>
              터치하거나 우클릭하여 이미지를 저장하실 수 있습니다.
            </p>

            <div style={{ position: 'relative', width: '100%', height: 'auto', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
              <img
                src="/images/abam_flyer_menu.jpg"
                alt="아름다운 밤 모바일 전단 메뉴"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href="/images/abam_flyer_menu.jpg"
                download="아름다운밤_모바일전단.jpg"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  backgroundColor: '#090d16',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '14px',
                  padding: '12px 0',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  border: '1px solid #d4af37',
                  cursor: 'pointer',
                }}
              >
                💾 전단 이미지 저장하기
              </a>
              <button
                onClick={() => setFlyerModalOpen(false)}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#f1f5f9',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 900,
                  color: '#475569',
                  cursor: 'pointer',
                }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
'''

target_after_kakao = '''              <button
                onClick={() => setKakaoModalOpen(false)}
                style={{
                  padding: '14px 20px',
                  backgroundColor: '#f1f5f9',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 900,
                  color: '#475569',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}'''

if target_after_kakao in content and 'flyerModalOpen &&' not in content:
    content = content.replace(target_after_kakao, target_after_kakao + '\n' + flyer_modal_code)

# 3. Flyer Board Section Addition right before "{/* ── 정찰제 코스 프로그램 카드 ── */}"
flyer_section_code = '''        {/* ── 📱 한눈에 보는 VIP 전단 코스 메뉴 보드 (Ultra-Clean Luxury Flyer Board) ── */}
        <section style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '2px solid #d4af37',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.28)',
          padding: '36px 20px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* 상단 럭셔리 골드 데코 띠 */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #d4af37 0%, #fef08a 50%, #d4af37 100%)' }} />

          {/* 상단 헤더 & 이용시간 안내 */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#fefcf2',
              border: '1.5px solid #d4af37',
              borderRadius: '20px',
              padding: '6px 16px',
              fontSize: '12.5px',
              fontWeight: 900,
              color: '#854d0e',
              marginBottom: '10px',
              boxShadow: '0 2px 6px rgba(212, 175, 55, 0.15)',
            }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dc2626' }} />
              ⏰ 오후 7시 ~ 새벽 5시 예약가능 · 서울 25개 구 전지역 20~30분 도착
            </div>

            <h2 style={{ fontSize: '26px', fontWeight: 950, color: '#090d16', margin: '2px 0 6px', letterSpacing: '-0.6px' }}>
              정통 왓포 수기 &amp; 감성 힐링 모바일 전단 메뉴
            </h2>
            <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
              선입금 0원 100% 현장 대면결제 · 서울 전지역 자택/호텔/오피스텔 신속 방문
            </p>
          </div>

          {/* 상단 대형 전화연결 캡슐 배너 (Flyer Red Banner) */}
          <div style={{ marginBottom: '22px' }}>
            <a
              href={PHONE_TEL}
              onClick={handlePhoneCall}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                borderRadius: '50px',
                padding: '12px 20px',
                color: '#ffffff',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(220, 38, 38, 0.35)',
                border: '2px solid #ffffff',
                cursor: 'pointer',
                transition: 'transform 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#fecaca', fontWeight: 800 }}>아밤 24시간 실시간 예약센터</div>
                  <div style={{ fontSize: '20px', fontWeight: 950, letterSpacing: '0.5px' }}>CALL : 010-6607-2239</div>
                </div>
              </div>
              <div style={{
                backgroundColor: '#991b1b',
                color: '#fef08a',
                padding: '8px 14px',
                borderRadius: '30px',
                fontSize: '12.5px',
                fontWeight: 950,
                border: '1px solid rgba(254, 240, 138, 0.4)',
                whiteSpace: 'nowrap',
              }}>
                👆 화면 클릭 시 즉시 전화연결
              </div>
            </a>
          </div>

          {/* 5대 코스 전단형 가로 캡슐 카드 리스트 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
            {[
              {
                id: 'thai',
                name: '타이 정통 코스',
                img: '/images/thai.jpg',
                tag: '왓포 정통 건식 수기',
                badge: null,
                badgeColor: '',
                isVip: false,
                p1_t: '60분', p1_v: '8만',
                p2_t: '90분', p2_v: '10만',
                p3_t: '120분', p3_v: '12만',
              },
              {
                id: 'aroma',
                name: '아로마 힐링 코스',
                img: '/images/aroma.jpg',
                tag: '100% 천연 에센셜 오일',
                badge: null,
                badgeColor: '',
                isVip: false,
                p1_t: '60분', p1_v: '9만',
                p2_t: '90분', p2_v: '11만',
                p3_t: '120분', p3_v: '14만',
              },
              {
                id: 'healing',
                name: '감성힐링 테라피',
                img: '/images/sensual_touch.jpg',
                tag: '섬세하고 감미로운 릴렉싱',
                badge: '🔥 추천코스',
                badgeColor: '#dc2626',
                isVip: false,
                p1_t: '60분', p1_v: '9만',
                p2_t: '90분', p2_v: '12만',
                p3_t: '120분', p3_v: '15만',
              },
              {
                id: 'special',
                name: '스페셜 듀얼 코스',
                img: '/images/sensual_care.jpg',
                tag: '타이 + 아로마 오일 믹스',
                badge: '👑 만족도 1위',
                badgeColor: '#2563eb',
                isVip: false,
                p1_t: '60분', p1_v: '10만',
                p2_t: '90분', p2_v: '14만',
                p3_t: '120분', p3_v: '17만',
              },
              {
                id: 'vip',
                name: '황제 VIP 시그니처',
                img: '/images/hero_sensual_goddess.jpg',
                tag: '풀코스 VIP 림프 집중 케어',
                badge: '👑 강추 1티어 코스',
                badgeColor: '#d4af37',
                isVip: true,
                p1_t: '60분', p1_v: '12만',
                p2_t: '90분', p2_v: '16만',
                p3_t: '120분', p3_v: '20만',
              },
            ].map(item => (
              <div
                key={item.id}
                onClick={handlePhoneCall}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  backgroundColor: item.isVip ? '#fefdf7' : '#ffffff',
                  border: item.isVip ? '2px solid #d4af37' : '1.5px solid #e2e8f0',
                  borderRadius: '18px',
                  padding: '12px 14px',
                  boxShadow: item.isVip ? '0 4px 18px rgba(212, 175, 55, 0.22)' : '0 2px 10px rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                }}
              >
                {/* 썸네일 이미지 */}
                <div style={{
                  position: 'relative',
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: item.isVip ? '2.5px solid #d4af37' : '2px solid #cbd5e1',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}>
                  <Image src={item.img} alt={item.name} fill style={{ objectFit: 'cover' }} />
                </div>

                {/* 중앙/우측 콘텐츠 */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '16.5px', fontWeight: 950, color: item.isVip ? '#854d0e' : '#090d16', letterSpacing: '-0.3px' }}>
                        {item.name}
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                        {item.tag}
                      </span>
                    </div>

                    {item.badge && (
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 900,
                        color: item.badgeColor === '#d4af37' ? '#181600' : '#ffffff',
                        backgroundColor: item.badgeColor,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        flexShrink: 0,
                        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* 가격 3단 필 바 */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    backgroundColor: item.isVip ? '#fffdf7' : '#f8fafc',
                    border: item.isVip ? '1px solid #d4af37' : '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '6px 10px',
                    fontSize: '13px',
                    fontWeight: 800,
                  }}>
                    <div>
                      <span style={{ color: '#475569', fontSize: '12px' }}>{item.p1_t} </span>
                      <strong style={{ color: '#dc2626', fontSize: '15px' }}>{item.p1_v}</strong>
                    </div>
                    <span style={{ color: '#cbd5e1' }}>·</span>
                    <div>
                      <span style={{ color: '#475569', fontSize: '12px' }}>{item.p2_t} </span>
                      <strong style={{ color: '#dc2626', fontSize: '15px' }}>{item.p2_v}</strong>
                    </div>
                    <span style={{ color: '#cbd5e1' }}>·</span>
                    <div>
                      <span style={{ color: '#475569', fontSize: '12px' }}>{item.p3_t} </span>
                      <strong style={{ color: '#dc2626', fontSize: '15px' }}>{item.p3_v}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 2단 안심 보장 뱃지 (Dual Guarantee) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', marginBottom: '16px' }}>
            <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '26px' }}>⏱️</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 950, color: '#090d16' }}>20~30분 내 신속 방문</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>서울 25개 구 전지역 즉시 배차 시스템</div>
              </div>
            </div>

            <div style={{ backgroundColor: '#fefcf4', border: '1.5px solid #d4af37', borderRadius: '14px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '26px' }}>💳</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 950, color: '#854d0e' }}>100% 현장 대면결제</div>
                <div style={{ fontSize: '12px', color: '#b45309', marginTop: '2px' }}>선입금 0원 · 카드 / 계좌이체 현장 결제</div>
              </div>
            </div>
          </div>

          {/* 이용 안내 체크리스트 박스 (Notice Box) */}
          <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <div style={{ backgroundColor: '#fee2e2', border: '1.5px solid #ef4444', borderRadius: '12px', padding: '10px 14px', textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: '11px', fontWeight: 900, color: '#991b1b' }}>이용 안내</div>
              <div style={{ fontSize: '16px', fontWeight: 950, color: '#dc2626', marginTop: '2px' }}>퇴폐 문의 X</div>
            </div>
            <div style={{ flex: 1, minWidth: '220px', fontSize: '12px', color: '#334155', lineHeight: 1.6 }}>
              <div>• <strong>방문 장소:</strong> 자택(아파트·빌라) 및 서울 전역 호텔·오피스텔 방문 가능</div>
              <div style={{ color: '#b91c1c', fontWeight: 800 }}>• <strong>지역 제한:</strong> 서울 이외에는 이동이 어려운 점 너른 양해 부탁드립니다.</div>
              <div>• <strong>매너 원칙:</strong> 과도한 만취 · 폭언 · 비매너 · 발신번호표시제한 이용 불가</div>
            </div>
          </div>

          {/* 하단 3단 액션 버튼 (전화연결 + 카톡 + 전단 원본 크게보기) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            <a
              href={PHONE_TEL}
              onClick={handlePhoneCall}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                color: '#ffffff',
                fontWeight: 950,
                fontSize: '14.5px',
                padding: '13px 0',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(220, 38, 38, 0.35)',
                cursor: 'pointer',
              }}
            >
              📞 즉시 전화연결 (010-6607-2239)
            </a>

            <a
              href={KAKAO_LINK}
              onClick={handleKakaoConnect}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#FEE500',
                color: '#181600',
                fontWeight: 950,
                fontSize: '14.5px',
                padding: '13px 0',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(254, 229, 0, 0.3)',
                cursor: 'pointer',
              }}
            >
              💬 카카오톡 1:1 예약
            </a>

            <button
              onClick={() => setFlyerModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                backgroundColor: '#ffffff',
                color: '#854d0e',
                border: '1.5px solid #d4af37',
                fontWeight: 900,
                fontSize: '13.5px',
                padding: '13px 0',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(212, 175, 55, 0.15)',
              }}
            >
              🖼️ 전단 원본 이미지 보기
            </button>
          </div>
        </section>

'''

if '{/* ── 정찰제 코스 프로그램 카드 ── */}' in content and 'Ultra-Clean Luxury Flyer Board' not in content:
    content = content.replace('{/* ── 정찰제 코스 프로그램 카드 ── */}', flyer_section_code + '        {/* ── 정찰제 코스 프로그램 카드 ── */}')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Injection complete!')
