import re

# Read current page.tsx
with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add state for FAQ accordion and active Gangnam area
faq_state_code = """  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeDong, setActiveDong] = useState<string>('역삼·강남역');
"""

code = code.replace(
    "  const [globalLang, setGlobalLang] = useState<'en' | 'jp' | 'cn'>('en');\n",
    "  const [globalLang, setGlobalLang] = useState<'en' | 'jp' | 'cn'>('en');\n" + faq_state_code
)

# 2. Add Gangnam Dong Data and FAQ Data constants
gangnam_constants = '''
// ── 강남 12대 핵심 동별 실시간 출장 랜드마크 가이드 ──
const GANGNAM_DONGS = [
  {
    name: '역삼·강남역',
    tag: '⚡ 20분 쾌속',
    badge: '비즈니스 호텔·오피스텔 최다',
    landmark: '강남역, 테헤란로, 르메르디앙 인근 호텔, 역삼동 주택가',
    desc: '강남의 중심부로 야간 비즈니스 미팅 후 피로 회복을 원하는 직장인 및 호텔 투숙객의 예약이 가장 집중되는 지역입니다. 20대 에이스 관리사가 상시 대기하여 평균 20분 이내 방문합니다.',
    tip: '※ 강남역 사거리 및 테헤란로 일대 호텔은 객실 호수만 알려주시면 로비 미팅 없이 룸으로 곧장 방문 가능합니다.',
  },
  {
    name: '논현·신논현',
    tag: '⚡ 20분 쾌속',
    badge: '심야 나이트라이프 핫스팟',
    landmark: '신논현역, 논현동 먹자골목, 학동역, 논현 가구거리',
    desc: '새벽 늦은 시간까지 야간 유동인구가 많은 대표 거점으로, 늦은 밤 피로를 풀고자 하는 고객분들이 가장 많이 찾는 지역입니다. 순면 관리복과 최고급 천연 에센셜 오일을 지참하여 신속히 방문합니다.',
    tip: '※ 빌라 및 다세대 주택의 경우 1층 공동현관 비밀번호를 미리 메모해 주시면 대기 없이 즉시 입실합니다.',
  },
  {
    name: '삼성·코엑스',
    tag: '⚡ 25분 쾌속',
    badge: '5성급 호텔 비즈니스 특화',
    landmark: '코엑스 인터컨티넨탈, 파르나스, 오크우드, 포스코사거리',
    desc: '국내외 비즈니스 출장객 및 바이어 방문이 잦은 특급 호텔 밀집 지역입니다. 장거리 비행과 회의로 굳어진 어깨·승모근·허리를 정통 왓포 건식 지압과 림프 마사지로 시원하게 케어합니다.',
    tip: '※ 코엑스 특급 호텔의 경우 객실 카드키 보안 정책에 따라 관리사 도착 시 로비 또는 엘리베이터 앞 미팅으로 진행될 수 있습니다.',
  },
  {
    name: '신사·압구정',
    tag: '⚡ 25분 쾌속',
    badge: '부티크 호텔 & 감각 힐링',
    landmark: '신사 가로수길, 안다즈 서울 강남, 압구정 로데오',
    desc: '트렌디한 부티크 호텔 및 게스트하우스, 주거지가 어우러진 지역으로 럭셔리 아로마 림프 케어와 감미로운 휴식을 선호하는 VIP 고객의 만족도가 매우 높은 거점입니다.',
    tip: '※ 프라이빗 보안이 엄격한 주거지나 호텔에서도 100% 비밀 보장 및 조용한 무소음 방문 관리가 진행됩니다.',
  },
  {
    name: '청담·봉은사',
    tag: '⚡ 25분 쾌속',
    badge: '최고급 주거 & 하이엔드 VIP',
    landmark: '청담동 명품거리, 프리마호텔 인근, 리베라호텔, 청담 빌라단지',
    desc: '철저한 프라이버시와 무결점 매너를 최우선으로 여기는 VIP 고객층이 밀집한 지역입니다. 검증된 에이스 테라피스트가 1:1 맞춤형 고품격 힐링 케어를 제공합니다.',
    tip: '※ 고급 빌라 및 레지던스 입실 시 방문객 차량 발렛 및 주차 등록이 원활하도록 사전 조율해 드립니다.',
  },
  {
    name: '대치·도곡',
    tag: '⚡ 25분 쾌속',
    badge: '조용한 주거지 & 타워팰리스권',
    landmark: '도곡 타워팰리스, 대치 아파트단지, 한티역, 매봉역',
    desc: '조용하고 아늑한 자택에서 일상의 스트레스와 만성 피로를 풀고자 하는 고객분들이 꾸준히 찾는 지역입니다. 냄새 없는 천연 식물성 오일과 1회용 청결 소독 패드를 완비하여 쾌적하게 진행됩니다.',
    tip: '※ 대단지 아파트의 경우 동·호수 및 주차장 진입 게이트를 안내해 주시면 더욱 신속하게 찾아뵙습니다.',
  },
];

// ── 강남출장마사지 자주 묻는 질문 (FAQ 8문 8답) ──
const GANGNAM_FAQS = [
  {
    q: 'Q1. 호텔이나 모텔, 레지던스 객실에서도 이용이 가능한가요?',
    a: '네, 100% 가능합니다. 일반 자택(아파트, 빌라, 원룸)은 물론이고 서울·강남 전지역의 4~5성급 비즈니스 호텔, 부티크 호텔, 모텔, 오피스텔 등 고객님만의 프라이빗한 독립 공간이라면 24시간 언제든 방문 케어가 가능합니다. 호텔의 경우 예약 시 호텔명과 객실 호수만 알려주시면 관리사가 방문합니다.',
  },
  {
    q: 'Q2. 예약 시 예약금이나 선입금을 요구하는 경우가 있나요?',
    a: '절대 없습니다! 아름다운 밤 타이 홈케어(Abam)는 선입금 사기를 원천 차단하기 위해 100% 현장 대면결제 원칙만을 고수합니다. 관리사가 고객님 객실/자택에 직접 도착하여 얼굴을 뵙고 난 뒤 결제를 진행하므로, 단 1원의 예약금이나 이동비, 보증금도 사전에 입금하실 필요가 없습니다.',
  },
  {
    q: 'Q3. 예약 후 관리사 도착까지 시간은 얼마나 걸리나요?',
    a: '강남구(역삼, 논현, 삼성, 신사, 청담, 대치 등) 전 지역은 20대 에이스 관리사가 권역별로 상시 대기하고 있어 예약 확정 후 평균 20~30분 이내로 신속하게 도착합니다. 비가 오거나 야간 피크타임 교통 상황에 따라 약간의 변동이 있을 경우 출발 전 실시간 예상 도착시간을 미리 안내해 드립니다.',
  },
  {
    q: 'Q4. 결제는 어떤 수단으로 가능한가요? (카드/현금)',
    a: '현장 도착 후 신용카드(국내 모든 카드사 및 해외 Visa, Master, Amex, JCB), 현금(원화 KRW 및 달러 USD), 현장 계좌이체 등 고객님이 편하신 방식으로 100% 자유롭게 결제하실 수 있습니다. 법인카드 결제 및 필요 시 카드 전표 영수증 발행도 모두 가능합니다.',
  },
  {
    q: 'Q5. 출장 마사지를 처음 이용해보는데 따로 준비할 게 있나요?',
    a: '고객님께서는 편안하게 쉴 수 있는 공간만 마련해 주시면 됩니다. 전문 테라피스트가 푹신한 최고급 이동식 전용 매트, 위생 1회용 패드, 순면 관리복, 최고급 천연 에센셜 오일 등 마사지에 필요한 모든 비품을 완벽히 지참하여 방문합니다.',
  },
  {
    q: 'Q6. 프로필 사진 속 관리사분이 실제로 직접 오시나요?',
    a: '네, 100% 실물 일치 관리사 배정을 원칙으로 합니다. 아밤은 출처 불명의 무단 도용 사진을 사용하지 않으며, 엄격한 자체 면접과 위생·서비스 교육을 수료한 매력적인 20대 S급 전문 테라피스트만을 배정합니다. 예약 시 원하시는 테라피스트(유나, 서아, 지아 등) 지명도 가능합니다.',
  },
  {
    q: 'Q7. 예약 후 시간 변경이나 코스 변경이 가능한가요?',
    a: '관리사가 출발하기 전이라면 언제든지 카카오톡이나 전화를 통해 편하게 변경하실 수 있습니다. 관리사 도착 후에도 당일 컨디션에 따라 건식에서 아로마로, 또는 60분에서 90분/120분 VIP 코스로 업그레이드 연장이 가능합니다.',
  },
  {
    q: 'Q8. 심야 늦은 시간(새벽 2~5시)에도 예약이 가능한가요?',
    a: '네, 아밤 타이 홈케어는 새벽 5시 마감 직전까지 1분도 쉬지 않고 24시간 실시간 예약과 배차가 진행됩니다. 야근 후 늦은 귀가, 심야 회식 후 피로, 불면증으로 지친 밤 언제든 연락 주시면 가장 가까운 곳의 테라피스트가 30분 내로 즉시 달려갑니다.',
  },
];
'''

# Insert constants before HomePage function
code = code.replace(
    'export default function HomePage() {',
    gangnam_constants + '\nexport default function HomePage() {'
)

# 3. Create the Benchmark-Infused Sections JSX:
# Section A: Anti-Scam Alert & 100% Pay on Arrival Guarantee Card
# Section B: Gangnam 12-Dong Regional Radar & Hotel Outcall Guide
# Section C: Professional Etiquette 5 Rules (Clean & Trusted)
# Section D: Gangnam FAQ 8-Q&A Accordion

new_sections_jsx = '''
        {/* ── [벤치마크 특화 1] ⚠️ 선입금 사기 박멸 안전 주의보 & 100% 현장 후불 보증 ── */}
        <section style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '2px solid #ef4444',
          boxShadow: '0 12px 36px rgba(239, 68, 68, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
          padding: '32px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #f87171', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 950, letterSpacing: '0.5px' }}>
              ⚠️ 긴급 필독 · 사기 피해 방지 공지
            </span>
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#090d16' }}>
              온라인 출장마사지 예약 시 선입금 사기 피해 절대 주의
            </span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 950, color: '#090d16', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
            관리사 얼굴 보고 결제하세요! <span style={{ color: '#dc2626' }}>도착 전 단 1원도 입금받지 않습니다.</span>
          </h2>

          <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: '0 0 20px' }}>
            최근 출장 홈케어 사이트를 모방하여 <strong>“예약 확정금 1~2만원 송금 요망”</strong>, <strong>“관리사 이동 유류비 추가 요구”</strong>, <strong>“첫 고객 안전보증금 명목 수십만원 추가 요구 후 잠적”</strong>하는 악질적인 보이스피싱형 선입금 사기 피해가 속출하고 있습니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '22px' }}>
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 950, color: '#dc2626', marginBottom: '6px' }}>
                ❌ 사기 업체의 전형적인 수법
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: '#7f1d1d', lineHeight: 1.7 }}>
                <li>상담 시작 직후 계좌번호부터 주며 예약금 요구</li>
                <li>입금하면 “신규 고객 보증금”이라며 20~30만원 추가 요구</li>
                <li>환불을 요구하면 전산 핑계를 대며 연락 두절 잠적</li>
              </ul>
            </div>

            <div style={{ backgroundColor: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 950, color: '#166534', marginBottom: '6px' }}>
                🛡️ 아름다운 밤 타이 홈케어의 100% 안심 원칙
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: '#14532d', lineHeight: 1.7 }}>
                <li><strong>도착 전 계좌 입금 절대 불가</strong> (1원도 요구 안 함)</li>
                <li>관리사 객실/자택 도착 후 <strong>직접 대면 확인 후 결제</strong></li>
                <li><strong>신용카드 / 체크카드 / 현금 / 계좌이체</strong> 100% 현장 자유 결제</li>
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '14px 18px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ fontSize: '13px', color: '#292524', fontWeight: 800 }}>
              안전한 이용을 위해 의심스러운 입금 요청이 있을 경우 즉시 아밤 고객센터로 확인해 주세요.
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href={KAKAO_LINK} onClick={handleKakaoConnect} style={{ backgroundColor: '#FEE500', color: '#181600', padding: '8px 16px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 900, textDecoration: 'none' }}>
                카톡 1:1 상담
              </a>
              <a href={PHONE_TEL} onClick={handlePhoneCall} style={{ backgroundColor: '#090d16', color: '#f3e5ab', border: '1px solid #d4af37', padding: '8px 16px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 900, textDecoration: 'none' }}>
                직통전화 010-6607-2239
              </a>
            </div>
          </div>
        </section>

        {/* ── [벤치마크 특화 2] 📍 강남 12대 동별 30분 쾌속 출장 레이더 & 호텔 특화 가이드 ── */}
        <section style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e8e0d0',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)',
          padding: '36px 24px',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '3px 10px', borderRadius: '4px', letterSpacing: '1px' }}>
              GANGNAM 12-DISTRICTS RADAR
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 950, color: '#090d16', margin: '8px 0 6px', letterSpacing: '-0.5px' }}>
              강남구 주요 동별 실시간 30분 출장 가이드
            </h2>
            <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
              강남역·테헤란로부터 청담·압구정·삼성동까지, 가장 가까운 거점의 20대 에이스 관리사가 고객님이 계신 곳으로 즉시 달려갑니다.
            </p>
          </div>

          {/* 동별 탭 선택기 */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '18px', scrollbarWidth: 'none' }}>
            {GANGNAM_DONGS.map((dong) => {
              const isActive = activeDong === dong.name;
              return (
                <button
                  key={dong.name}
                  onClick={() => setActiveDong(dong.name)}
                  style={{
                    flexShrink: 0,
                    padding: '10px 18px',
                    borderRadius: '10px',
                    border: isActive ? '1.5px solid #d4af37' : '1px solid #e2e8f0',
                    backgroundColor: isActive ? '#090d16' : '#f8fafc',
                    color: isActive ? '#f3e5ab' : '#475569',
                    fontSize: '13px',
                    fontWeight: isActive ? 950 : 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
                  }}
                >
                  {dong.name}
                </button>
              );
            })}
          </div>

          {/* 선택된 동 상세 카드 */}
          {(() => {
            const current = GANGNAM_DONGS.find((d) => d.name === activeDong) || GANGNAM_DONGS[0];
            return (
              <div style={{ backgroundColor: '#faf9f6', border: '1.5px solid #e8e0d0', borderRadius: '16px', padding: '24px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 950, color: '#090d16', margin: 0 }}>
                      {current.name} 출장 홈케어
                    </h3>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '2px 8px', borderRadius: '4px' }}>
                      {current.badge}
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 900, color: '#16a34a', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '4px 10px', borderRadius: '20px' }}>
                    {current.tag} (평균 도착)
                  </span>
                </div>

                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, marginBottom: '12px' }}>
                  📍 <strong>주요 거점 랜드마크:</strong> {current.landmark}
                </div>

                <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.7, margin: '0 0 14px' }}>
                  {current.desc}
                </p>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 16px', fontSize: '12.5px', color: '#b45309', fontWeight: 700, lineHeight: 1.6 }}>
                  {current.tip}
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
                  <a href={KAKAO_LINK} onClick={handleKakaoConnect} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#FEE500', color: '#181600', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 900, textDecoration: 'none' }}>
                    💬 {current.name} 예약 문의하기
                  </a>
                  <a href={PHONE_TEL} onClick={handlePhoneCall} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#090d16', color: '#f3e5ab', border: '1px solid #d4af37', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 900, textDecoration: 'none' }}>
                    📞 010-6607-2239 전화연결
                  </a>
                </div>
              </div>
            );
          })()}
        </section>

        {/* ── [벤치마크 특화 3] 🤝 강남출장 이용 시 안심 에티켓 5대 수칙 ── */}
        <section style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e8e0d0',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)',
          padding: '36px 24px',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '26px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '3px 10px', borderRadius: '4px', letterSpacing: '1px' }}>
              SERVICE ETIQUETTE &amp; SAFETY
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 950, color: '#090d16', margin: '8px 0 6px', letterSpacing: '-0.5px' }}>
              품격 있는 힐링을 위한 아밤 이용 에티켓 5대 수칙
            </h2>
            <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
              관리사와 고객님 간의 상호 존중을 바탕으로 가장 안전하고 쾌적한 힐링 테라피 환경을 약속드립니다.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {[
              {
                no: '01',
                title: '상호 존중 및 폭언·모욕 절대 금지',
                desc: '아밤의 테라피스트는 전문 교육을 이수한 힐링 전문가입니다. 비하 발언, 욕설, 강압적 태도는 엄격히 금지되며 위반 시 즉시 서비스가 중단됩니다.',
              },
              {
                no: '02',
                title: '1인 1실 프라이빗 원칙 준수',
                desc: '출장 마사지는 1인의 고객님께 집중 케어를 제공하는 1인 1실 케어가 원칙입니다. 동반 인원이 있거나 다수 인원이 머무는 공간은 사전에 별도 상담을 진행해 주셔야 합니다.',
              },
              {
                no: '03',
                title: '허위 예약 및 상습 노쇼(No-Show) 금지',
                desc: '예약 확정 즉시 담당 관리사가 이동을 시작하므로 장난 전화나 연락 두절 노쇼는 영업에 심각한 지장을 줍니다. 부득이한 취소는 출발 전 즉시 연락해 주시기 바랍니다.',
              },
              {
                no: '04',
                title: '무리한 요구 및 퇴폐 불법 요청 절대 금지',
                desc: '아밤은 건전하고 건강한 왓포 건식 지압 및 림프 순환 케어만을 고수합니다. 관리사의 업무 범위를 벗어난 무리하고 부당한 요구는 일체 수용되지 않습니다.',
              },
              {
                no: '05',
                title: '과도한 만취자 예약 불가 안내',
                desc: '과음 상태에서의 마사지는 신체 혈관 및 심장에 무리를 주어 안전사고의 위험이 있습니다. 음주 후에는 충분한 수면 후 맑은 정신일 때 예약해 주시길 권장합니다.',
              },
              {
                no: '06',
                title: '개인정보 보호 및 프라이버시 100% 보장',
                desc: '고객님의 방문 장소, 전화번호 및 예약 정보는 서비스 완료 즉시 전산에서 파기되며 어떠한 외부 유출도 없음을 법적으로 보증합니다.',
              },
            ].map((rule, idx) => (
              <div key={idx} style={{ backgroundColor: '#faf9f6', border: '1px solid #e8e0d0', borderRadius: '14px', padding: '20px', display: 'flex', gap: '14px' }}>
                <div style={{ fontSize: '20px', fontWeight: 950, color: '#b38728', lineHeight: 1, flexShrink: 0 }}>
                  {rule.no}
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 950, color: '#090d16', margin: '0 0 6px' }}>
                    {rule.title}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                    {rule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── [벤치마크 특화 4] ❓ 강남출장안마 자주 묻는 질문 (FAQ 8문 8답 아코디언) ── */}
        <section style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e8e0d0',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)',
          padding: '36px 24px',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '26px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '3px 10px', borderRadius: '4px', letterSpacing: '1px' }}>
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 950, color: '#090d16', margin: '8px 0 6px', letterSpacing: '-0.5px' }}>
              강남출장마사지 자주 묻는 질문 (FAQ 8문 8답)
            </h2>
            <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
              처음 이용하시는 고객분들이 가장 많이 궁금해하시는 이용 절차와 주의사항을 투명하게 안내해 드립니다.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {GANGNAM_FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  style={{
                    border: isOpen ? '1.5px solid #d4af37' : '1px solid #e2e8f0',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: isOpen ? '#fffdf7' : '#ffffff',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: '14.5px', fontWeight: 950, color: isOpen ? '#b38728' : '#090d16' }}>
                      {faq.q}
                    </span>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#b38728', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                      ▾
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 20px 18px', fontSize: '13.5px', color: '#475569', lineHeight: 1.7, borderTop: '1px dashed #e8e0d0', paddingTop: '14px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
'''

# Find the insertion point: insert right before the SEO_REGIONS section
target_anchor = "{/* SEO 지역 디렉토리 */}"
code = code.replace(target_anchor, new_sections_jsx + '\n        ' + target_anchor)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully integrated benchmark strengths into page.tsx!")
