# -*- coding: utf-8 -*-
import re

NEW_REGIONS_CODE = '''// ── 서울 25개 전 자치구 & 인접 경기권 실시간 출장 쾌속 레이더 ──
const METRO_REGIONS = [
  {
    name: '서울 강남·서초·송파·강동',
    tag: '⚡ 20~25분 쾌속',
    badge: '강남권 4개구 전지역 100% 방문',
    landmark: '강남역, 테헤란로, 청담 명품거리, 압구정 로데오, 신사 가로수길, 서초 교대, 잠실 롯데타워, 천호',
    desc: '서울 비즈니스와 프리미엄 주거의 중심지로, 20대 S급 에이스 테라피스트들이 가장 촘촘하게 분산 대기하고 있어 예약 확정 즉시 20~25분 이내로 총알 방문합니다. 비즈니스 호텔, 고급 레지던스, 아파트, 오피스텔 등 어디든 완벽한 프라이버시를 보장합니다.',
    tip: '※ 강남·서초·송파 일대 호텔 및 오피스텔은 객실 호수만 알려주시면 로비 미팅 없이 룸으로 곧장 방문 가능합니다.',
  },
  {
    name: '서울 마포·용산·여의도·영등포',
    tag: '⚡ 25~30분 쾌속',
    badge: '도심 비즈니스 & 한남·여의도 핫스팟',
    landmark: '여의도 IFC·파크원, 용산역·한남동 유엔빌리지, 홍대입구, 합정, 공덕, 영등포 타임스퀘어',
    desc: '여의도 금융가, 용산·한남의 최고급 주거단지, 마포·홍대의 트렌디한 호텔 및 자택까지 전역을 24시간 신속하게 커버합니다. 야근 후 지친 직장인과 호텔 투숙객의 깊은 피로를 왓포 건식 지압과 감미로운 림프 아로마로 시원하게 풀어드립니다.',
    tip: '※ 여의도 및 마포 일대 특급 호텔 투숙 시 카드키 보안 정책에 맞춰 로비 또는 룸 앞 안심 미팅을 지원합니다.',
  },
  {
    name: '서울 종로·중구·성동·광진',
    tag: '⚡ 25~30분 쾌속',
    badge: '도심 전통 상권 & 성수 서울숲권',
    landmark: '명동·을지로 특급호텔, 종로 광화문, 동대문 DDP, 성수동 서울숲, 건대입구, 뚝섬',
    desc: '서울 역사 문화의 중심지이자 명동 특급 호텔가, 성수동 핫플레이스까지 30분 이내 방문을 보장합니다. 국내외 비즈니스 출장객, 관광객, 인근 거주 고객님 모두에게 최고 수준의 1:1 맞춤형 힐링을 제공합니다.',
    tip: '※ 명동·동대문 호텔의 경우 외국인 고객님을 위한 영어, 일본어, 중국어 맞춤 상담 및 실시간 왓츠앱 소통을 지원합니다.',
  },
  {
    name: '서울 강서·구로·동작·관악·양천',
    tag: '⚡ 25~30분 쾌속',
    badge: '서울 서남부 전지역 100% 방문',
    landmark: '마곡지구 R&D센터, 목동 오목교, 신도림 디큐브시티, 노량진, 신림, 사당역',
    desc: '서울 서남부 주요 주거 및 비즈니스 거점(마곡, 목동, 신도림, 사당 등)에 상주하는 관리사들이 신속히 배치되어 있습니다. 자택, 오피스텔, 호텔 어디든 부담 없이 편안하게 이용하실 수 있습니다.',
    tip: '※ 대단지 아파트 및 주거 밀집 지역의 경우 주차 게이트 안내를 미리 주시면 더욱 빠르게 도착합니다.',
  },
  {
    name: '경기 분당·판교·성남·수원',
    tag: '⚡ 25~35분 쾌속',
    badge: '경기 남부 IT 밸리 & 주요 신도시',
    landmark: '판교 테크노밸리, 그래비티 호텔, 코트야드, 분당 정자·서현 카페거리, 수원 인계동, 광교 아브뉴프랑',
    desc: '서울과 가장 인접한 경기 남부 핵심 거점으로, 분당·판교·수원 전담 20대 테라피스트들이 상시 상주하여 서울 도심 못지않은 25~35분 초고속 배차를 자랑합니다. 판교 IT 임직원 및 수원 비즈니스 호텔 예약 1위 권역입니다.',
    tip: '※ 판교 테크노밸리 및 광교 신도시 일대 호텔 및 레지던스는 24시간 언제든 지체 없이 즉시 방문합니다.',
  },
  {
    name: '경기 일산·부천·안양·용인·광명',
    tag: '⚡ 25~35분 쾌속',
    badge: '서울 인접 경기 핵심 거점 도시',
    landmark: '일산 킨텍스·라페스타, 부천 상동·중동, 안양 평촌·범계, 용인 수지·죽전, 광명역 KTX 인근',
    desc: '서울 경계와 맞닿아 있는 경기 서북부 및 남부 거점 도시 전역으로, 24시간 관리사가 신속 배차됩니다. 킨텍스 출장 바이어, 부천·안양·용인 주택가 및 호텔 어디서든 서울과 동일한 최고급 VIP 홈케어를 누리실 수 있습니다.',
    tip: '※ 서울 인접 경기 도시 전 지역은 추가 장거리 출장비가 일체 없으며, 100% 동일한 정찰제 가격이 적용됩니다.',
  },
];'''

NEW_LIVE_DISPATCH_CODE = '''// ── 실시간 배차 현황 롤링 티커 ──
const LIVE_DISPATCH_LOGS = [
  { region: '강남구 역삼동 비즈니스 호텔', course: '👑 힐링 VIP 90분', status: '관리사 배차 완료 · 18분 도착 예정', time: '방금 전' },
  { region: '마포구 공덕동 자택', course: '아로마 90분 (지아 쌤)', status: '룸 도착 완료 및 케어 진행 중', time: '2분 전' },
  { region: '영등포구 여의도 콘래드 호텔', course: '왓포 타이 90분', status: '금융가 비즈니스 고객 예약 확정', time: '4분 전' },
  { region: '분당구 판교 그래비티 호텔', course: '👑 힐링 VIP 120분', status: '판교 IT 임원 예약 · 출발', time: '6분 전' },
  { region: '용산구 한남동 고급 레지던스', course: '아로마 120분 (서아 쌤)', status: '위생 세팅 완료 및 케어 시작', time: '9분 전' },
  { region: '수원시 팔달구 인계동 호텔', course: '👑 힐링 VIP 90분', status: '배차 완료 · 25분 도착 예정', time: '11분 전' },
  { region: '일산동구 킨텍스 인근 호텔', course: '왓포 타이 60분', status: '전시장 출장 고객 예약 확정', time: '13분 전' },
  { region: '송파구 잠실동 오피스텔', course: '스페셜 듀얼 90분 (유나 쌤)', status: '배차 완료 · 20분 도착 예정', time: '15분 전' },
];'''

NEW_REVIEWS_CODE = '''// ── 생생한 실전 고객 이용 후기 (Social Proof) ──
const REAL_REVIEWS = [
  {
    author: '김*호 님 (강남 역삼동 호텔 투숙)',
    rating: 5,
    date: '어제 이용',
    badge: '인증 고객 · 비즈니스 출장',
    course: '👑 힐링 VIP 시그니처 90분 (유나 쌤 지명)',
    review: '지방에서 서울 출장 와서 호텔에 혼자 묵는데 피로가 극에 달해 불렀습니다. 솔직히 요즘 선입금 사기 사이트가 너무 많아서 걱정했는데, 아밤은 전화할 때부터 도착 전 1원도 입금받지 않는다고 단호히 말씀해주셔서 신뢰가 갔습니다. 유나 관리사님 22분 만에 오셨고 대면 후 카드결제했습니다. 지압 후 아로마로 림프 풀어주시는데 피로가 싹 녹았습니다. 다음 출장 때도 무조건 아밤입니다.',
  },
  {
    author: '박*훈 님 (마포구 공덕동 자택)',
    rating: 5,
    date: '2일 전 이용',
    badge: '단골 고객 · 심야 야근 후 힐링',
    course: '스페셜 듀얼 테라피 90분',
    review: '강남만 가는 곳인 줄 알았는데 마포 자택도 25분 만에 오시네요! 순면 관리복과 천연 오일까지 깔끔하게 챙겨오셔서 제 방이 순식간에 호텔 고급 스파룸으로 변신했습니다. 왓포 타이로 어깨 뭉친 것 싹 풀어주고 아로마로 부드럽게 감싸주니 잠이 솔솔 왔습니다. 강남 외 서울 전지역 다 와주셔서 정말 편리합니다.',
  },
  {
    author: '강*혁 대표님 (판교 그래비티 호텔)',
    rating: 5,
    date: '3일 전 이용',
    badge: '해외 바이어 동행 이용',
    course: '👑 힐링 VIP 120분 코스',
    review: '판교 테크노밸리 출장 온 해외 파트너와 미팅 후 호텔 객실로 예약했습니다. 판교 쪽도 배차가 바로 될까 싶었는데 25분 만에 정확히 도착하셨습니다. 테라피스트 분이 실력도 최고급이고 매너가 훌륭해서 바이어도 극찬했습니다. 신용카드 영수증도 깔끔하게 발행해주셔서 법인 경비 처리도 완벽했습니다.',
  },
  {
    author: '조*현 님 (여의도 콘래드 호텔 투숙)',
    rating: 5,
    date: '4일 전 이용',
    badge: 'VIP 회원 · 프라이빗 케어',
    course: '👑 힐링 VIP 시그니처 120분 (서아 쌤 지명)',
    review: '여의도 특급호텔 투숙 중에 불렀습니다. 서아 테라피스트님 실물이 훨씬 더 단아하고 매력적이셔서 깜짝 놀랐습니다. 120분 동안 한결같은 정성으로 어루만져 주시는데 감미로운 손길에 온몸의 긴장이 풀렸습니다. 조용하고 완벽한 비밀 보장까지 완벽 그 자체입니다.',
  },
  {
    author: '임*석 님 (수원 인계동 비즈니스 출장)',
    rating: 5,
    date: '5일 전 이용',
    badge: '인증 고객 · 현장 카드 결제',
    course: '아로마 릴렉싱 90분 (지아 쌤 지명)',
    review: '수원 출장 와서 늦은 밤에 예약했는데 추가 출장비 없이 서울과 똑같은 정찰제 가격으로 30분 만에 도착해주셔서 감동했습니다. 지아 관리사님 피부도 너무 고우시고 차분하게 림프선 케어해주셔서 한 주간 쌓였던 피로가 완전히 사라졌습니다.',
  },
  {
    author: '윤*진 님 (일산 킨텍스 인근 호텔)',
    rating: 5,
    date: '6일 전 이용',
    badge: '킨텍스 박람회 참가 바이어',
    course: '왓포 정통 건식 90분',
    review: '전시회 일정으로 하루 종일 서 있어서 다리가 퉁퉁 부었었는데, 일산까지 30분도 안 걸려서 오셨습니다. 왓포 타이 정통 방식으로 골반이랑 척추 스트레칭해주실 때 온몸이 날아갈 듯 가벼워졌습니다. 서울뿐만 아니라 경기권 출장 홈케어 원탑입니다.',
  },
];'''

NEW_FAQS_CODE = '''// ── 서울 전지역 & 경기권 출장 홈케어 자주 묻는 질문 (FAQ 8문 8답) ──
const METRO_FAQS = [
  {
    q: 'Q1. 서울 어디든, 그리고 경기권도 정말 방문 가능한가요?',
    a: '네, 100% 방문 가능합니다! 강남·서초·송파는 물론이고 마포·용산·영등포·여의도·종로·중구·강서·성동·광진 등 서울 25개 자치구 전지역 어디든 100% 방문합니다. 또한 분당, 판교, 성남, 수원, 일산, 부천, 용인, 안양, 광명, 하남 등 서울과 인접한 경기 핵심 도시까지 거점별 20대 전문 테라피스트가 상시 대기하고 있어 예약 확정 후 평균 25~35분 이내로 신속하게 방문합니다.',
  },
  {
    q: 'Q2. 예약 시 예약금이나 선입금을 요구하는 경우가 있나요?',
    a: '절대 없습니다! 아름다운 밤 타이 홈케어(Abam)는 선입금 사기를 원천 차단하기 위해 100% 현장 대면결제 원칙만을 고수합니다. 관리사가 고객님 객실/자택에 직접 도착하여 얼굴을 뵙고 난 뒤 결제를 진행하므로, 단 1원의 예약금이나 이동비, 보증금도 사전에 입금하실 필요가 없습니다.',
  },
  {
    q: 'Q3. 예약 후 관리사 도착까지 시간은 얼마나 걸리나요?',
    a: '서울 전지역 및 가까운 경기권 전역에 20대 에이스 관리사가 거점별로 분산 대기하고 있어, 고객님 위치와 가장 가까운 테라피스트가 배정되어 평균 20~35분 이내로 신속하게 도착합니다. 야간 피크타임이나 기상 상황에 따라 약간의 변동이 있을 경우 출발 전 실시간 예상 도착시간을 미리 친절하게 안내해 드립니다.',
  },
  {
    q: 'Q4. 결제는 어떤 수단으로 가능한가요? (카드/현금)',
    a: '현장 도착 후 신용카드(국내 모든 카드사 및 해외 Visa, Master, Amex, JCB), 현금(원화 KRW 및 달러 USD), 현장 계좌이체 등 고객님이 편하신 방식으로 100% 자유롭게 결제하실 수 있습니다. 법인카드 결제 및 필요 시 카드 전표 영수증 발행도 모두 가능합니다.',
  },
  {
    q: 'Q5. 호텔이나 모텔, 레지던스, 오피스텔, 일반 자택 모두 가능한가요?',
    a: '네, 고객님만의 프라이빗한 독립 공간이라면 어디든 24시간 방문 가능합니다. 일반 자택(아파트, 빌라, 원룸)은 물론 서울·경기 전역의 4~5성급 비즈니스 호텔, 부티크 호텔, 모텔, 오피스텔 모두 가능합니다. 호텔의 경우 예약 시 호텔명과 객실 호수만 알려주시면 로비 미팅 없이 룸으로 곧장 찾아갑니다.',
  },
  {
    q: 'Q6. 프로필 사진 속 관리사분이 실제로 직접 오시나요?',
    a: '네, 100% 실물 일치 관리사 배정을 원칙으로 합니다. 아밤은 출처 불명의 무단 도용 사진을 사용하지 않으며, 엄격한 자체 면접과 위생·서비스 교육을 수료한 매력적인 20대 S급 전문 테라피스트만을 배정합니다. 예약 시 원하시는 테라피스트(유나, 서아, 지아 등) 지명도 가능합니다.',
  },
  {
    q: 'Q7. 경기 지역의 경우 추가 장거리 출장비가 발생하나요?',
    a: '아닙니다. 분당, 판교, 성남, 수원, 일산, 부천, 용인, 안양, 광명, 하남 등 서비스 제공 경기 권역은 서울과 100% 동일한 정찰제 가격이 적용되며 부당한 추가 출장비를 일체 요구하지 않습니다.',
  },
  {
    q: 'Q8. 심야 늦은 시간(새벽 2~5시)에도 예약이 가능한가요?',
    a: '네, 아밤 타이 홈케어는 24시간 연중무휴로 운영되며, 새벽 늦은 시간에도 실시간 예약과 신속 배차가 진행됩니다. 야근 후 늦은 귀가, 심야 회식 후 피로, 불면증으로 지친 밤 언제든 연락 주시면 가장 가까운 곳의 테라피스트가 30분 내로 즉시 달려갑니다.',
  },
];'''

def run_fix():
    path = 'src/app/page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace top announcement bar
    old_top_bar = r'<div style=\{\{ background: \'#070a10\'.*?<span>🌙 GANGNAM MIDNIGHT VIP.*?</div>'
    new_top_bar = '''<div style={{ background: '#070a10', borderBottom: '1px solid rgba(212, 175, 55, 0.45)', color: '#f3e5ab', padding: '10px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 800, letterSpacing: '0.3px', boxShadow: '0 2px 12px rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap', wordBreak: 'keep-all' }}>
        <span>🌙 SEOUL &amp; METRO VIP · 서울 25개구 전지역 100% 방문 &amp; 가까운 경기권 20~30분 신속 배차 · 선입금 X 100% 현장 대면결제 · 24시간 심야 운영</span>
        <span style={{ color: '#d4af37' }}>|</span>
        <span style={{ color: '#ffffff' }}>🌍 Foreigners Welcome · Hotel In-Room VIP Spa · WhatsApp 24/7 Available</span>
      </div>'''
    content = re.sub(old_top_bar, new_top_bar, content, flags=re.DOTALL)

    # 2. Replace Hero Badge & Subtitle & Headline
    content = content.replace('✦ GANGNAM MIDNIGHT VIP ESCAPE · 1:1 밀착 센슈얼 케어', '✦ SEOUL & METRO NIGHT ESCAPE · 서울 전지역 & 인접 경기권 24시간 1:1 밀착 센슈얼 힐링')
    content = content.replace('🔥 20대 S급 비주얼 테라피스트 출근 완료 · 심야 30분 도착', '🔥 20대 S급 비주얼 테라피스트 상시 대기 · 서울 전역 & 인접 경기권 30분 총알 배차')

    # 3. Replace Hero Text and Bullets with perfect indentation and responsive line breaks
    old_hero_intro_start = content.find('<div style={{ fontSize: \'15px\', color: \'#334155\', lineHeight: 1.8, margin: \'0 0 28px\', wordBreak: \'keep-all\' }}>')
    old_hero_intro_end = content.find('{/* 일관된 순서: 카카오톡 바로연결 (좌) ➔ 전화예약 (우) */}')
    if old_hero_intro_start != -1 and old_hero_intro_end != -1:
        new_hero_intro = '''<div style={{ fontSize: '15px', color: '#334155', lineHeight: 1.75, margin: '0 0 28px', wordBreak: 'keep-all' }}>
              <p style={{ margin: '0 0 14px', fontWeight: 800, color: '#090d16', fontSize: '15.5px', letterSpacing: '-0.3px', lineHeight: 1.65 }}>
                도메인 <strong>abam.kr</strong>의 의미 그대로,<br className="hidden sm:inline" />
                오늘 밤 <strong>서울 25개 자치구 전역</strong>과 <strong>가까운 경기권</strong> 어디든 당신만을 위한 가장 매혹적이고 감미로운 '아름다운 밤'을 선물합니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '14px', borderLeft: '3px solid #d4af37', margin: '12px 0 0 2px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#b38728', fontWeight: 950, lineHeight: 1.6, fontSize: '15px', flexShrink: 0 }}>•</span>
                  <span style={{ lineHeight: 1.65, fontSize: '14px', color: '#334155' }}>
                    <strong>서울 전지역(25개 구 100%) &amp; 가까운 경기권</strong>(분당, 판교, 수원, 일산, 부천, 용인, 안양, 광명, 하남 등) <strong>평균 25~35분 내외</strong> 신속하게 방문합니다.
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
            </div>

            '''
        content = content[:old_hero_intro_start] + new_hero_intro + content[old_hero_intro_end:]

    # 4. Replace GANGNAM_DONGS with METRO_REGIONS
    d_start = content.find('// ── 강남 12대 핵심 동별 실시간 출장 랜드마크 가이드 ──')
    d_end = content.find('// ── 실시간 배차 현황 롤링 티커 ──')
    if d_start != -1 and d_end != -1:
        content = content[:d_start] + NEW_REGIONS_CODE + '\n\n' + content[d_end:]

    # 5. Replace LIVE_DISPATCH_LOGS and REAL_REVIEWS
    ld_start = content.find('// ── 실시간 배차 현황 롤링 티커 ──')
    ld_end = content.find('// ── 4대 공간별 안심 이용 꿀팁 (호텔 / 오피스텔 / 자택 / 모텔) ──')
    if ld_start != -1 and ld_end != -1:
        content = content[:ld_start] + NEW_LIVE_DISPATCH_CODE + '\n\n' + NEW_REVIEWS_CODE + '\n\n' + content[ld_end:]

    # 6. Replace GANGNAM_FAQS with METRO_FAQS
    faq_start = content.find('// ── 강남출장마사지 자주 묻는 질문 (FAQ 8문 8답) ──')
    faq_end = content.find('export default function HomePage() {')
    if faq_start != -1 and faq_end != -1:
        content = content[:faq_start] + NEW_FAQS_CODE + '\n\n' + content[faq_end:]

    # 7. In HomePage component state: activeDong -> activeRegion
    content = content.replace("const [activeDong, setActiveDong] = useState<string>('역삼·강남역');", "const [activeRegion, setActiveRegion] = useState<string>('서울 강남·서초·송파·강동');")

    # 8. Replace Radar section JSX
    radar_sec_start = content.find('{/* ── [벤치마크 특화 2] 📍 강남 12대 동별 30분 쾌속 출장 레이더 & 호텔 특화 가이드 ── */}')
    radar_sec_end = content.find('{/* ── [벤치마크 특화 3] 🤝 강남출장 이용 시 안심 에티켓 5대 수칙 ── */}')
    new_radar_sec = '''{/* ── [벤치마크 특화 2] 📍 서울 25개 전 자치구 & 인접 경기권 실시간 쾌속 출장 레이더 ── */}
        <section style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e8e0d0',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)',
          padding: '36px 24px',
          wordBreak: 'keep-all',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '3px 10px', borderRadius: '4px', letterSpacing: '1px' }}>
              METRO SEOUL &amp; GYEONGGI RADAR
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 950, color: '#090d16', margin: '8px 0 6px', letterSpacing: '-0.5px' }}>
              서울 25개 자치구 전지역 &amp; 가까운 경기권 실시간 쾌속 출장 가이드
            </h2>
            <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
              강남·서초·송파는 물론 마포·용산·영등포·종로 및 분당·판교·일산·수원·부천·용인·안양까지,<br className="hidden sm:inline" />
              가장 가까운 거점의 20대 에이스 관리사가 고객님이 계신 곳으로 즉시 달려갑니다.
            </p>
          </div>

          {/* 권역별 탭 선택기 */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '18px', scrollbarWidth: 'none' }}>
            {METRO_REGIONS.map((region) => {
              const isActive = activeRegion === region.name;
              return (
                <button
                  key={region.name}
                  onClick={() => setActiveRegion(region.name)}
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
                    whiteSpace: 'nowrap',
                  }}
                >
                  {region.name}
                </button>
              );
            })}
          </div>

          {/* 선택된 권역 상세 카드 */}
          {(() => {
            const current = METRO_REGIONS.find((d) => d.name === activeRegion) || METRO_REGIONS[0];
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

                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, marginBottom: '12px', lineHeight: 1.6 }}>
                  📍 <strong>주요 거점 및 랜드마크:</strong> {current.landmark}
                </div>

                <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.7, margin: '0 0 14px' }}>
                  {current.desc}
                </p>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 16px', fontSize: '12.5px', color: '#b45309', fontWeight: 700, lineHeight: 1.6 }}>
                  {current.tip}
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
                  <a href={KAKAO_LINK} onClick={handleKakaoConnect} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#FEE500', color: '#181600', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 900, textDecoration: 'none' }}>
                    💬 {current.name} 실시간 예약 문의
                  </a>
                  <a href={PHONE_TEL} onClick={handlePhoneCall} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#090d16', color: '#f3e5ab', border: '1px solid #d4af37', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 900, textDecoration: 'none' }}>
                    📞 010-6607-2239 즉시 전화연결
                  </a>
                </div>
              </div>
            );
          })()}
        </section>'''
    if radar_sec_start != -1 and radar_sec_end != -1:
        content = content[:radar_sec_start] + new_radar_sec + '\n\n        ' + content[radar_sec_end:]

    # 9. Update Etiquette Section Header
    content = content.replace('{/* ── [벤치마크 특화 3] 🤝 강남출장 이용 시 안심 에티켓 5대 수칙 ── */}', '{/* ── [벤치마크 특화 3] 🤝 서울·경기 출장 홈케어 이용 시 안심 에티켓 5대 수칙 ── */}')

    # 10. Update FAQ Section Title and Variable
    content = content.replace('강남출장마사지 자주 묻는 질문 (FAQ 8문 8답)', '서울 전지역 & 인접 경기권 출장 홈케어 자주 묻는 질문 (FAQ 8문 8답)')
    content = content.replace('{GANGNAM_FAQS.map((faq, i) => {', '{METRO_FAQS.map((faq, i) => {')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Updated src/app/page.tsx with Metro coverage and responsive layout!')

run_fix()
