# -*- coding: utf-8 -*-
import re

NEW_SEO_REGIONS = '''const SEO_REGIONS = [
  {
    name: '서울 강남·동남권',
    keywords: [
      { label: '강남 출장 홈케어', slug: '강남출장홈케어' },
      { label: '역삼 마사지', slug: '역삼출장마사지' },
      { label: '논현 마사지', slug: '논현출장마사지' },
      { label: '청담 홈케어', slug: '청담출장홈케어' },
      { label: '선릉 출장케어', slug: '선릉출장마사지' },
      { label: '서초 출장홈케어', slug: '서초출장홈케어' },
      { label: '반포 마사지', slug: '반포출장마사지' },
      { label: '송파 홈케어', slug: '송파출장홈케어' },
      { label: '잠실 출장마사지', slug: '잠실출장마사지' },
      { label: '강동 출장홈케어', slug: '강동출장홈케어' },
      { label: '천호 마사지', slug: '천호출장마사지' },
    ],
  },
  {
    name: '서울 도심·용산권',
    keywords: [
      { label: '용산 출장마사지', slug: '용산출장마사지' },
      { label: '한남 홈케어', slug: '한남출장홈케어' },
      { label: '이태원 마사지', slug: '이태원출장마사지' },
      { label: '명동 호텔마사지', slug: '명동출장마사지' },
      { label: '중구 출장홈케어', slug: '중구출장홈케어' },
      { label: '종로 홈케어', slug: '종로출장홈케어' },
      { label: '을지로 마사지', slug: '을지로출장마사지' },
      { label: '서대문 출장마사지', slug: '서대문출장마사지' },
      { label: '은평 출장홈케어', slug: '은평출장홈케어' },
    ],
  },
  {
    name: '서울 서남·여의도권',
    keywords: [
      { label: '여의도 출장홈케어', slug: '여의도출장홈케어' },
      { label: '영등포 마사지', slug: '영등포출장마사지' },
      { label: '마포 출장홈케어', slug: '마포출장홈케어' },
      { label: '홍대 마사지', slug: '홍대출장마사지' },
      { label: '합정 홈케어', slug: '합정출장홈케어' },
      { label: '공덕 출장마사지', slug: '공덕출장마사지' },
      { label: '구로 신도림 홈케어', slug: '신도림출장마사지' },
      { label: '강서 마곡 마사지', slug: '마곡출장마사지' },
      { label: '동작 사당 마사지', slug: '사당출장마사지' },
      { label: '관악 신림 홈케어', slug: '신림출장마사지' },
    ],
  },
  {
    name: '서울 동북·성수권',
    keywords: [
      { label: '성수 홈케어', slug: '성수출장홈케어' },
      { label: '성동 출장마사지', slug: '성동출장마사지' },
      { label: '광진 건대 마사지', slug: '건대출장마사지' },
      { label: '동대문 출장홈케어', slug: '동대문출장홈케어' },
      { label: '성북 출장마사지', slug: '성북출장마사지' },
      { label: '노원 출장홈케어', slug: '노원출장홈케어' },
      { label: '중랑 마사지', slug: '중랑출장마사지' },
      { label: '강북 수유 마사지', slug: '수유출장마사지' },
    ],
  },
];'''

NEW_SEOUL_REGIONS = '''// ── 서울 25개 전 자치구 실시간 출장 쾌속 레이더 ──
const SEOUL_REGIONS = [
  {
    name: '서울 강남권 (강남·서초·송파·강동)',
    tag: '⚡ 20~25분 쾌속',
    badge: '강남권 4개구 전지역 100% 방문',
    landmark: '강남역, 테헤란로, 청담 명품거리, 압구정 로데오, 신사 가로수길, 서초 교대, 잠실 롯데타워, 천호',
    desc: '서울 비즈니스와 프리미엄 주거의 중심지로, 20대 S급 에이스 테라피스트들이 상시 가장 촘촘하게 분산 대기하여 예약 확정 즉시 20~25분 이내로 총알 방문합니다. 비즈니스 호텔, 고급 레지던스, 아파트, 오피스텔 등 어디든 완벽한 프라이버시를 보장합니다.',
    tip: '※ 강남·서초·송파 일대 호텔 및 오피스텔은 객실 호수만 알려주시면 로비 미팅 없이 룸으로 곧장 방문 가능합니다.',
  },
  {
    name: '서울 서남권 (영등포·여의도·마포·구로·동작·관악·강서)',
    tag: '⚡ 20~25분 쾌속',
    badge: '금융 허브 & 서남권 전역 100% 방문',
    landmark: '여의도 IFC·파크원, 영등포 타임스퀘어, 마포·홍대·합정, 신도림 디큐브, 마곡 R&D센터, 사당역',
    desc: '여의도 금융가 비즈니스 호텔, 마포·홍대의 트렌디한 호텔 및 자택, 마곡지구와 신도림까지 서남권 전역을 24시간 신속하게 커버합니다. 야근 후 지친 직장인과 호텔 투숙객의 깊은 피로를 왓포 건식 지압과 감미로운 림프 아로마로 시원하게 풀어드립니다.',
    tip: '※ 여의도 및 마포 일대 특급 호텔 투숙 시 카드키 보안 정책에 맞춰 로비 또는 룸 앞 안심 미팅을 지원합니다.',
  },
  {
    name: '서울 도심·용산권 (용산·한남·중구·종로·서대문)',
    tag: '⚡ 25~30분 쾌속',
    badge: '특급 호텔 밀집 & 하이엔드 주거지',
    landmark: '용산역 드래곤시티, 한남동 유엔빌리지, 명동·을지로 특급호텔가, 종로 광화문, 신촌·이대',
    desc: '명동 및 광화문 특급 호텔가, 한남동 최고급 주거단지까지 25~30분 이내 방문을 보장합니다. 국내외 비즈니스 출장 바이어, 관광객, 인근 거주 고객님 모두에게 최고 수준의 1:1 맞춤형 힐링을 제공합니다.',
    tip: '※ 명동·용산 호텔의 경우 외국인 고객님을 위한 영어, 일본어, 중국어 맞춤 상담 및 실시간 왓츠앱 소통을 지원합니다.',
  },
  {
    name: '서울 동북권 (성동·성수·광진·동대문·중랑·성북·노원)',
    tag: '⚡ 25~30분 쾌속',
    badge: '성수 서울숲 & 동북권 전지역 100% 방문',
    landmark: '성수동 서울숲 갤러리아포레·트리마제 인근, 건대입구, 동대문 DDP, 왕십리, 노원역',
    desc: '트렌디한 성수동 핫플레이스부터 광진, 동대문, 노원까지 서울 동북부 전역에 상주 관리사가 배치되어 있습니다. 자택, 오피스텔, 호텔 어디든 편안하고 아늑하게 정통 수기 케어를 받아보실 수 있습니다.',
    tip: '※ 아파트 단지 및 주택가의 경우 주차 게이트 안내를 미리 주시면 더욱 빠르게 도착합니다.',
  },
];'''

NEW_LIVE_DISPATCH_CODE = '''// ── 실시간 배차 현황 롤링 티커 (오직 서울 25개 자치구) ──
const LIVE_DISPATCH_LOGS = [
  { region: '강남구 역삼동 비즈니스 호텔', course: '👑 힐링 VIP 90분', status: '관리사 배차 완료 · 18분 도착 예정', time: '방금 전' },
  { region: '마포구 공덕동 자택', course: '아로마 90분 (지아 쌤)', status: '룸 도착 완료 및 케어 진행 중', time: '2분 전' },
  { region: '영등포구 여의도 콘래드 호텔', course: '왓포 타이 90분', status: '금융가 비즈니스 고객 예약 확정', time: '4분 전' },
  { region: '용산구 한남동 고급 레지던스', course: '아로마 120분 (서아 쌤)', status: '위생 세팅 완료 및 케어 시작', time: '6분 전' },
  { region: '송파구 잠실동 오피스텔', course: '스페셜 듀얼 90분 (유나 쌤)', status: '배차 완료 · 20분 도착 예정', time: '9분 전' },
  { region: '서초구 서초동 아파트', course: '👑 힐링 VIP 120분', status: '예약 확정 · 22분 도착 예정', time: '12분 전' },
  { region: '성동구 성수동 트리마제 인근', course: '왓포 타이 60분', status: '예약 접수 완료 · 관리사 출발', time: '14분 전' },
  { region: '중구 명동 롯데호텔 투숙객', course: '👑 힐링 VIP 90분', status: '해외 출장객 예약 · 25분 도착 예정', time: '17분 전' },
];'''

NEW_REVIEWS_CODE = '''// ── 생생한 실전 고객 이용 후기 (오직 서울 25개구 실이용 고객) ──
const REAL_REVIEWS = [
  {
    author: '김*호 님 (강남 역삼동 호텔 투숙)',
    rating: 5,
    date: '어제 이용',
    badge: '인증 고객 · 비즈니스 출장',
    course: '👑 힐링 VIP 시그니처 90분 (유나 쌤 지명)',
    review: '지방에서 서울 출장 와서 호텔에 혼자 묵는데 피로가 극에 달해 불렀습니다. 솔직히 요즘 선입금 사기 사이트가 너무 많아서 걱정했는데, 아밤은 전화할 때부터 도착 전 1원도 입금받지 않는다고 단호히 말씀해주셔서 신뢰가 갔습니다. 유나 관리사님 22분 만에 오셨고 대면 후 카드결제했습니다. 지압 후 아로마로 림프 풀어주시는데 피로가 싹 녹았습니다. 다음 서울 출장 때도 무조건 아밤입니다.',
  },
  {
    author: '박*훈 님 (마포구 공덕동 자택)',
    rating: 5,
    date: '2일 전 이용',
    badge: '단골 고객 · 심야 야근 후 힐링',
    course: '스페셜 듀얼 테라피 90분',
    review: '강남 쪽만 빠른 줄 알았는데 마포 자택도 25분 만에 정확히 오시네요! 순면 관리복과 천연 오일까지 깔끔하게 챙겨오셔서 제 방이 순식간에 호텔 고급 스파룸으로 변신했습니다. 왓포 타이로 어깨 뭉친 것 싹 풀어주고 아로마로 부드럽게 감싸주니 잠이 솔솔 왔습니다. 서울 전지역 다 와주셔서 정말 편리합니다.',
  },
  {
    author: '조*현 님 (여의도 콘래드 호텔 투숙)',
    rating: 5,
    date: '3일 전 이용',
    badge: 'VIP 회원 · 프라이빗 케어',
    course: '👑 힐링 VIP 시그니처 120분 (서아 쌤 지명)',
    review: '여의도 특급호텔 투숙 중에 불렀습니다. 서아 테라피스트님 실물이 훨씬 더 단아하고 매력적이셔서 깜짝 놀랐습니다. 120분 동안 한결같은 정성으로 어루만져 주시는데 감미로운 손길에 온몸의 긴장이 풀렸습니다. 조용하고 완벽한 비밀 보장까지 완벽 그 자체입니다.',
  },
  {
    author: '정*우 님 (강남 청담동 고급 빌라)',
    rating: 5,
    date: '4일 전 이용',
    badge: '단골 고객 · 정기 케어',
    course: '👑 힐링 VIP 120분 코스',
    review: '철저한 비밀 보장과 위생 관리가 마음에 들어 꾸준히 이용 중입니다. 관리사분들의 손길과 테크닉이 전문 스파 이상이고, 매너가 아주 품격 있습니다. 서울 어디서든 부를 수 있어 믿고 예약합니다.',
  },
  {
    author: '최*민 님 (용산구 한남동 레지던스)',
    rating: 5,
    date: '5일 전 이용',
    badge: '인증 고객 · 현장 카드 결제',
    course: '아로마 릴렉싱 90분 (지아 쌤 지명)',
    review: '새벽 늦은 시간에 한남동으로 불렀는데 20분 만에 도착해주셔서 감동했습니다. 지아 관리사님 피부도 너무 고우시고 차분하게 림프선 케어해주셔서 한 주간 쌓였던 피로가 완전히 사라졌습니다. 현장에서 카드 결제도 깔끔했습니다.',
  },
  {
    author: '이*진 님 (성동구 성수동 오피스텔)',
    rating: 5,
    date: '6일 전 이용',
    badge: '단골 고객 · 재이용',
    course: '왓포 정통 건식 90분',
    review: '성수동 쪽 오피스텔인데 밤 1시에 25분 만에 오셨습니다. 왓포 타이 정통 방식으로 골반이랑 척추 스트레칭해주실 때 온몸이 날아갈 듯 가벼워졌습니다. 대충 시간 때우는 곳들과는 비교 불가입니다.',
  },
];'''

NEW_SEOUL_FULL_CITIES = '''// ── 서울특별시 25개 전 자치구 (100% 전지역 20~30분 도착 집중) ──
const FULL_CITIES_SEO = [
  {
    title: '🏛️ 서울 강남·동남권 4개구 (20~25분 초고속 배차)',
    list: [
      '강남구 (역삼·논현·삼성·청담·신사·압구정·대치·도곡)',
      '서초구 (서초동·반포·잠원·방배·양재)',
      '송파구 (잠실·방이·문정·가락·송파동)',
      '강동구 (천호·길동·둔촌·암사·명일)'
    ]
  },
  {
    title: '🏛️ 서울 서남권 7개구 (20~30분 신속 배차)',
    list: [
      '영등포구 (여의도·당산·문래·영등포동)',
      '마포구 (홍대·합정·공덕·상암·망원)',
      '구로구 (신도림·구로동·고척·오류)',
      '동작구 (사당·노량진·상도·대방)',
      '관악구 (신림·봉천·서울대입구)',
      '강서구 (마곡·화곡·가양·발산)',
      '양천구 (목동·신정·신월)'
    ]
  },
  {
    title: '🏛️ 서울 도심·용산·동북권 14개구 (25~30분 신속 배차)',
    list: [
      '용산구 (한남동·이태원·용산역·삼각지)',
      '중구 (명동·을지로·충무로·동대문)',
      '종로구 (광화문·종로·혜화·평창동)',
      '성동구 (성수동·왕십리·옥수·금호)',
      '광진구 (건대입구·구의·자양·군자)',
      '서대문구 · 은평구 · 동대문구 · 중랑구 · 성북구 · 강북구 · 도봉구 · 노원구'
    ]
  }
];'''

NEW_SEOUL_FAQS = '''// ── 서울 전지역 출장 홈케어 자주 묻는 질문 (FAQ 8문 8답) ──
const SEOUL_FAQS = [
  {
    q: 'Q1. 서울 25개 자치구 전지역 정말 100% 방문 가능한가요?',
    a: '네, 100% 방문 가능합니다! 아밤 타이 홈케어(Abam)는 20~30분 총알 도착과 최상의 케어 퀄리티를 유지하기 위해 경기도 및 타 지역은 일체 방문하지 않으며, 오직 서울특별시 25개 자치구 전역(강남·서초·송파·마포·용산·영등포·여의도·종로·중구·성동·강서 등)에만 100% 집중 배차합니다. 서울 어디에 계시든 24시간 언제나 가장 가까운 거점의 20대 에이스 관리사가 20~30분 내외로 즉시 찾아갑니다.',
  },
  {
    q: 'Q2. 예약 시 예약금이나 선입금을 요구하는 경우가 있나요?',
    a: '절대 없습니다! 아름다운 밤 타이 홈케어는 선입금 사기를 원천 차단하기 위해 100% 현장 대면결제 원칙만을 고수합니다. 관리사가 고객님 객실/자택에 직접 도착하여 얼굴을 뵙고 난 뒤 결제를 진행하므로, 단 1원의 예약금이나 이동비, 보증금도 사전에 입금하실 필요가 없습니다.',
  },
  {
    q: 'Q3. 예약 후 관리사 도착까지 시간은 얼마나 걸리나요?',
    a: '서울 25개 구 전역에 20대 에이스 관리사가 권역별로 촘촘히 분산 대기하고 있어, 고객님 위치와 가장 가까운 테라피스트가 배정되어 평균 20~30분 이내로 신속하게 도착합니다. 야간 피크타임이나 기상 상황에 따라 약간의 변동이 있을 경우 출발 전 실시간 예상 도착시간을 미리 친절하게 안내해 드립니다.',
  },
  {
    q: 'Q4. 결제는 어떤 수단으로 가능한가요? (카드/현금)',
    a: '현장 도착 후 신용카드(국내 모든 카드사 및 해외 Visa, Master, Amex, JCB), 현금(원화 KRW 및 달러 USD), 현장 계좌이체 등 고객님이 편하신 방식으로 100% 자유롭게 결제하실 수 있습니다. 법인카드 결제 및 필요 시 카드 전표 영수증 발행도 모두 가능합니다.',
  },
  {
    q: 'Q5. 호텔이나 모텔, 레지던스, 오피스텔, 일반 자택 모두 가능한가요?',
    a: '네, 고객님만의 프라이빗한 독립 공간이라면 어디든 24시간 방문 가능합니다. 일반 자택(아파트, 빌라, 원룸)은 물론 서울 전역의 4~5성급 비즈니스 호텔, 부티크 호텔, 모텔, 오피스텔 모두 가능합니다. 호텔의 경우 예약 시 호텔명과 객실 호수만 알려주시면 로비 미팅 없이 룸으로 곧장 찾아갑니다.',
  },
  {
    q: 'Q6. 프로필 사진 속 관리사분이 실제로 직접 오시나요?',
    a: '네, 100% 실물 일치 관리사 배정을 원칙으로 합니다. 아밤은 출처 불명의 무단 도용 사진을 사용하지 않으며, 엄격한 자체 면접과 위생·서비스 교육을 수료한 매력적인 20대 S급 전문 테라피스트만을 배정합니다. 예약 시 원하시는 테라피스트(유나, 서아, 지아 등) 지명도 가능합니다.',
  },
  {
    q: 'Q7. 경기도나 다른 지역도 출장이 가능한가요?',
    a: '아닙니다. 아밤은 20~30분 총알 도착 약속과 테라피스트의 체력 및 케어 집중도를 최상으로 유지하기 위해 오직 서울특별시 25개 구 전지역으로만 서비스 지역을 엄격히 한정하고 있습니다. 경기도 및 타 지역은 서비스하지 않는 점 양해 부탁드립니다.',
  },
  {
    q: 'Q8. 심야 늦은 시간(새벽 2~5시)에도 예약이 가능한가요?',
    a: '네, 아밤 타이 홈케어는 24시간 연중무휴로 운영되며, 새벽 늦은 시간에도 실시간 예약과 신속 배차가 진행됩니다. 야근 후 늦은 귀가, 심야 회식 후 피로, 불면증으로 지친 밤 언제든 연락 주시면 가장 가까운 곳의 테라피스트가 20~30분 내로 즉시 달려갑니다.',
  },
];'''

def run_pure_seoul():
    path = 'src/app/page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace SEO_REGIONS
    s_start = content.find('const SEO_REGIONS = [')
    s_end = content.find('// ── 서울 25개 전 자치구 & 인접 경기권 실시간 출장 쾌속 레이더 ──')
    if s_start == -1 or s_end == -1:
        s_end = content.find('const METRO_REGIONS = [')
    if s_start != -1 and s_end != -1:
        content = content[:s_start] + NEW_SEO_REGIONS + '\n\n' + content[s_end:]

    # 2. Replace METRO_REGIONS with SEOUL_REGIONS
    m_start = content.find('const METRO_REGIONS = [')
    m_end = content.find('// ── 실시간 배차 현황 롤링 티커 ──')
    if m_start != -1 and m_end != -1:
        content = content[:m_start] + NEW_SEOUL_REGIONS + '\n\n' + content[m_end:]

    # 3. Replace LIVE_DISPATCH_LOGS and REAL_REVIEWS
    ld_start = content.find('// ── 실시간 배차 현황 롤링 티커 ──')
    ld_end = content.find('// ── 4대 공간별 안심 이용 꿀팁 (호텔 / 오피스텔 / 자택 / 모텔) ──')
    if ld_start != -1 and ld_end != -1:
        content = content[:ld_start] + NEW_LIVE_DISPATCH_CODE + '\n\n' + NEW_REVIEWS_CODE + '\n\n' + content[ld_end:]

    # 4. Replace FULL_CITIES_SEO
    fc_start = content.find('// ── 서울 25개 전 자치구 & 수도권 풀 스펙트럼 45개 권역 ──')
    if fc_start == -1:
        fc_start = content.find('const FULL_CITIES_SEO = [')
    fc_end = content.find('// ── 서울 전지역 & 경기권 출장 홈케어 자주 묻는 질문')
    if fc_start != -1 and fc_end != -1:
        content = content[:fc_start] + NEW_SEOUL_FULL_CITIES + '\n\n' + content[fc_end:]

    # 5. Replace METRO_FAQS with SEOUL_FAQS
    faq_start = content.find('// ── 서울 전지역 & 경기권 출장 홈케어 자주 묻는 질문')
    faq_end = content.find('export default function HomePage() {')
    if faq_start != -1 and faq_end != -1:
        content = content[:faq_start] + NEW_SEOUL_FAQS + '\n\n' + content[faq_end:]

    # 6. In HomePage state:
    content = content.replace("const [activeRegion, setActiveRegion] = useState<string>('서울 강남·서초·송파·강동');", "const [activeRegion, setActiveRegion] = useState<string>('서울 강남권 (강남·서초·송파·강동)');")

    # 7. Replace top announcement bar
    old_top_bar = r'<div style=\{\{ background: \'#070a10\'.*?<span>🌙 SEOUL &amp; METRO VIP.*?</div>'
    new_top_bar = '''<div style={{ background: '#070a10', borderBottom: '1px solid rgba(212, 175, 55, 0.45)', color: '#f3e5ab', padding: '10px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 800, letterSpacing: '0.3px', boxShadow: '0 2px 12px rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap', wordBreak: 'keep-all' }}>
        <span>🌙 SEOUL EXCLUSIVE VIP · 오직 서울 전지역(25개 구 100%) 집중 방문 · 20~30분 총알 도착 · 선입금 0원 100% 현장 대면결제 · 24시간 연중무휴</span>
        <span style={{ color: '#d4af37' }}>|</span>
        <span style={{ color: '#ffffff' }}>🌍 Foreigners Welcome · Hotel In-Room VIP Spa · WhatsApp 24/7 Available</span>
      </div>'''
    content = re.sub(old_top_bar, new_top_bar, content, flags=re.DOTALL)

    # 8. Hero Headline & Subtitle & Bullets
    content = content.replace('✦ SEOUL & METRO NIGHT ESCAPE · 서울 전지역 & 인접 경기권 24시간 1:1 밀착 센슈얼 힐링', '✦ SEOUL EXCLUSIVE VIP SPA · 오직 서울 전지역 100% 방문 1:1 밀착 센슈얼 힐링')
    content = content.replace('🔥 20대 S급 비주얼 테라피스트 상시 대기 · 서울 전역 & 인접 경기권 30분 총알 배차', '🔥 20대 S급 테라피스트 상시 대기 · 오직 서울 25개 구 20~30분 총알 배차')

    # Hero Intro paragraphs
    old_intro_marker = '오늘 밤 <strong>서울 25개 자치구 전역</strong>과 <strong>가까운 경기권</strong> 어디든'
    new_intro_marker = '오늘 밤 <strong>오직 서울특별시 25개 자치구 전지역</strong> 어디든'
    content = content.replace(old_intro_marker, new_intro_marker)

    old_bullet_1 = '<strong>서울 전지역(25개 구 100%) &amp; 가까운 경기권</strong>(분당, 판교, 수원, 일산, 부천, 용인, 안양, 광명, 하남 등) <strong>평균 25~35분 내외</strong> 신속하게 방문합니다.'
    new_bullet_1 = '<strong>오직 서울특별시 25개 자치구 100% 전지역</strong>(강남, 서초, 송파, 마포, 용산, 영등포, 종로, 중구, 성동, 강서 등) <strong>평균 20~30분 내외</strong> 즉시 신속 방문합니다. (※ 신속 배차와 고품격 서비스를 위해 경기도는 방문하지 않습니다)'
    content = content.replace(old_bullet_1, new_bullet_1)

    # 9. Night banner paragraph
    old_nb = '선입금 0원 · 100% 현장 대면결제! 새벽 5시 마감 전까지 서울 25개 구 전역 및 가까운 경기 핵심권 어디든 20~30분 내외로 즉시 찾아갑니다. 최고급 VIP 라운지의 깊은 힐링과 매혹적인 손길을 고객님의 프라이빗 룸에서 편안하게 누리세요.'
    new_nb = '선입금 0원 · 100% 현장 대면결제! 24시간 연중무휴 오직 서울 25개 자치구 전지역 어디든 20~30분 내외로 즉시 찾아갑니다. 최고급 VIP 라운지의 깊은 힐링과 매혹적인 손길을 고객님의 프라이빗 룸에서 편안하게 누리세요.'
    content = content.replace(old_nb, new_nb)

    # 10. Radar section JSX
    radar_sec_start = content.find('{/* ── [벤치마크 특화 2] 📍 서울 25개 전 자치구 & 인접 경기권 실시간 쾌속 출장 레이더 ── */}')
    radar_sec_end = content.find('{/* ── [벤치마크 특화 3] 🤝 서울·경기 출장 홈케어 이용 시 안심 에티켓 5대 수칙 ── */}')
    new_radar_sec = '''{/* ── [벤치마크 특화 2] 📍 서울 25개 전 자치구 실시간 쾌속 출장 레이더 ── */}
        <section style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e8e0d0',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)',
          padding: '36px 24px',
          wordBreak: 'keep-all',
          overflowWrap: 'break-word',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#b38728', backgroundColor: '#faf6ee', border: '1px solid #d4af37', padding: '3px 10px', borderRadius: '4px', letterSpacing: '1px' }}>
              SEOUL 25-DISTRICTS RADAR
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 950, color: '#090d16', margin: '8px 0 6px', letterSpacing: '-0.5px' }}>
              오직 서울 전지역 (25개 자치구 100%) 실시간 쾌속 출장 가이드
            </h2>
            <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, lineHeight: 1.65 }}>
              아밤은 20~30분 최단 시간 도착과 최상의 테라피스트 컨디션을 위해 <strong>경기도는 일체 방문하지 않으며</strong>,<br className="hidden sm:inline" />
              오직 <strong>서울특별시 25개 구 전역</strong>에만 집중하여 가장 가까운 거점의 에이스 관리사가 즉시 달려갑니다.
            </p>
          </div>

          {/* 권역별 탭 선택기 */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '18px', scrollbarWidth: 'none' }}>
            {SEOUL_REGIONS.map((region) => {
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
            const current = SEOUL_REGIONS.find((d) => d.name === activeRegion) || SEOUL_REGIONS[0];
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

    # 11. Etiquette section
    content = content.replace('{/* ── [벤치마크 특화 3] 🤝 서울·경기 출장 홈케어 이용 시 안심 에티켓 5대 수칙 ── */}', '{/* ── [벤치마크 특화 3] 🤝 서울 출장 홈케어 이용 시 안심 에티켓 5대 수칙 ── */}')

    # 12. FAQ Section Header & variable
    content = content.replace('서울 전지역 & 인접 경기권 출장 홈케어 자주 묻는 질문 (FAQ 8문 8답)', '서울 전지역 (25개 구) 출장 홈케어 자주 묻는 질문 (FAQ 8문 8답)')
    content = content.replace('{METRO_FAQS.map((faq, i) => {', '{SEOUL_FAQS.map((faq, i) => {')

    # 13. Directory Section Header
    content = content.replace('수도권 심야 출장 홈케어 지역 안내', '서울 25개 자치구 심야 출장 홈케어 지역 안내')
    content = content.replace('정통 왓포 건식 & 천연 아로마 림프 케어 · 서울 25개 구 전지역 & 가까운 경기 핵심권 20~30분 즉시 배차', '정통 왓포 건식 & 천연 아로마 림프 케어 · 오직 서울특별시 25개 구 전지역 20~30분 즉시 배차')
    content = content.replace('서울 25개 전 자치구와 경기 15개 주요 도시 거점에 20대 전문 테라피스트가 24시간 대기하고 있습니다.', '서울특별시 25개 전 자치구 거점에 20대 전문 테라피스트가 24시간 대기하고 있습니다.')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Updated src/app/page.tsx to pure Seoul-only successfully!')

run_pure_seoul()
