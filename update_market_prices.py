# -*- coding: utf-8 -*-
import re

NEW_COURSES_CODE = '''const COURSES: CourseItem[] = [
  {
    id: 'thai',
    name: '타이 정통 테라피',
    tag: '왓포 왕실 정통 건식 수기',
    badge: '정통 왓포 수기 지압',
    img: '/images/thai.jpg',
    subtitle: '전신 스트레칭 & 경혈 지압 딥티슈 케어',
    description: '오일을 사용하지 않고 편안한 순면 관리복을 착용한 상태에서 진행되는 왓포 정통 건식 수기 관리입니다. 체계적인 경혈 지압과 전신 관절 스트레칭을 통해 굳어있는 골반, 척추, 어깨 승모근의 깊은 피로를 시원하게 풀어드립니다.',
    features: ['오일 미사용 (순면 관리복)', '경혈 지압 & 딥티슈 압', '골반 및 척추 관절 교정 스트레칭'],
    recommend: '장시간 좌식 근무나 운전으로 온몸이 뻐근하신 분, 깊고 강한 압의 개운함을 원하시는 분',
    prices: [
      { time: '60분', price: '80,000원' },
      { time: '90분', price: '100,000원', isBest: true },
      { time: '120분 (2시간)', price: '120,000원' },
    ],
  },
  {
    id: 'healing',
    name: '힐링 감성 테라피',
    tag: '섬세하고 감미로운 릴렉싱',
    badge: '심신 안정 감성 케어',
    img: '/images/sensual_touch.jpg',
    subtitle: '숨소리까지 편안해지는 섬세한 터치와 릴렉싱',
    description: '심신의 깊은 이완과 일상의 스트레스 해소를 위해 부드럽고 섬세한 수기 테크닉으로 교감 신경을 안정시켜 드리는 감성 힐링 프로그램입니다. 일상의 번뇌를 잊게 하는 감미로운 터치로 편안한 휴식을 선사합니다.',
    features: ['섬세하고 감미로운 감성 수기', '교감 신경 안정 & 멘탈 릴렉스', '부드러운 압과 감각적인 힐링'],
    recommend: '극심한 스트레스와 피로로 심신에 따뜻한 위로와 깊은 감성적 휴식이 필요하신 분',
    prices: [
      { time: '60분', price: '90,000원' },
      { time: '90분', price: '120,000원', isBest: true },
      { time: '120분 (2시간)', price: '150,000원' },
    ],
  },
  {
    id: 'aroma',
    name: '아로마 릴렉싱 테라피',
    tag: '천연 에센셜 오일 림프 케어',
    badge: '100% 천연 에센셜 오일',
    img: '/images/aroma.jpg',
    subtitle: '살결을 타고 흐르는 은은한 아로마와 부드러운 손길',
    description: '체온에 부드럽게 녹아드는 최고급 천연 식물성 에센셜 오일을 도포하여, 섬세하고 감미로운 수기 테크닉으로 전신 림프절을 부드럽게 자극합니다. 깊은 향기와 부드러운 온기가 지친 일상의 긴장을 사르르 녹여내는 매혹적인 릴렉싱 테라피입니다.',
    features: ['100% 천연 식물성 에센셜 오일', '전신 림프 순환 & 매끄러운 바디 케어', '심신을 감싸는 매혹적인 향기 힐링'],
    recommend: '만성 스트레스와 붓기로 고생하시는 분, 은은한 향기와 부드러운 림프 순환 힐링을 원하시는 분',
    prices: [
      { time: '60분', price: '90,000원' },
      { time: '90분', price: '110,000원', isBest: true },
      { time: '120분 (2시간)', price: '140,000원' },
    ],
  },
  {
    id: 'special',
    name: '스페셜 듀얼 테라피',
    tag: '타이 건식 + 힐링 아로마 믹스',
    badge: '인기 가성비 올인원 코스',
    img: '/images/sensual_care.jpg',
    subtitle: '시원한 수기 지압과 감미로운 오일 힐링의 완벽한 조화',
    description: '정통 타이 수기 지압으로 굳은 대근육과 관절을 먼저 시원하게 풀어준 뒤, 힐링 아로마 오일 테라피로 전환하여 전신 림프와 미세 근육을 섬세하게 이완시키는 인기 만족도 1위 복합 프로그램입니다.',
    features: ['건식 지압 + 힐링 아로마 복합 구성', '대근육 이완 후 림프 순환 극대화', '가장 균형 잡힌 가성비 만점 코스'],
    recommend: '강한 압의 개운함과 부드러운 오일 힐링의 장점을 동시에 한 번에 누리고 싶으신 분',
    prices: [
      { time: '60분', price: '100,000원' },
      { time: '90분', price: '140,000원', isBest: true },
      { time: '120분 (2시간)', price: '170,000원' },
    ],
  },
  {
    id: 'vip',
    name: 'VIP 시그니처 테라피',
    tag: '👑 최고급 프리미엄 풀코스 · 시그니처 1위',
    badge: '아름다운 밤 프리미엄 대표 코스',
    isVip: true,
    img: '/images/hero_sensual_goddess.jpg',
    subtitle: '전신 수기 + 최고급 힐링 오일 + 림프 집중 시크릿 케어',
    description: '아름다운 밤(Abam)의 정수를 담은 최고급 시그니처 프로그램입니다. 에이스 전담 테라피스트가 배정되어 정통 건식 수기, 프리미엄 힐링 오일, 그리고 전신 림프 집중 케어까지 모든 과정을 정성스럽게 헌신하여 최상의 황홀경과 휴식을 선사합니다.',
    features: ['에이스 전담 테라피스트 우선 배정', '전신 건식 + 최고급 오일 + 림프 집중', '고객 만족도 및 재이용률 압도적 1위'],
    recommend: '어떤 타협도 없는 최상의 프라이빗 풀케어와 완벽한 감성 힐링을 원하시는 VIP 고객님',
    prices: [
      { time: '60분', price: '120,000원' },
      { time: '90분', price: '160,000원', isBest: true },
      { time: '120분 (2시간)', price: '200,000원' },
    ],
  },
];'''

NEW_COMPARISON_ROWS_CODE = '''const COMPARISON_ROWS = [
  { category: '가격 (60분)', thai: '80,000원', healing: '90,000원', aroma: '90,000원', special: '100,000원', vip: '120,000원' },
  { category: '가격 (90분)', thai: '100,000원', healing: '120,000원', aroma: '110,000원', special: '140,000원', vip: '160,000원' },
  { category: '가격 (120분/2시간)', thai: '120,000원', healing: '150,000원', aroma: '140,000원', special: '170,000원', vip: '200,000원' },
  { category: '관리 기법', thai: '왓포 건식 지압 & 전신 스트레칭', healing: '섬세한 감성 터치 & 심신 이완', aroma: '천연 오일 전신 림프 순환 케어', special: '타이 건식 + 힐링 아로마 믹스', vip: '전신 수기+오일+림프 풀코스' },
  { category: '압의 강도', thai: '시원하고 깊은 압', healing: '부드럽고 감각적인 압', aroma: '감미롭고 부드러운 압', special: '시원한 압 + 부드러운 압', vip: '맞춤형 최상급 올인원 압' },
  { category: '오일 사용', thai: '오일 미사용 (순면 관리복)', healing: '소량 천연 에센셜 오일', aroma: '천연 식물성 에센셜 전신 도포', special: '건식 후 아로마 오일 도포', vip: '최고급 프리미엄 오일 집중 도포' },
  { category: '추천 대상', thai: '뭉친 근육, 뻐근함 해소', healing: '심신 안정, 스트레스 완화', aroma: '피부 보습, 림프 순환', special: '가성비 최고의 올인원 복합', vip: '최상의 프라이빗 황홀 힐링' },
];'''

def update_main_page():
    path = 'src/app/page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace COURSES
    c_start = content.find('const COURSES: CourseItem[] = [')
    c_end = content.find('const SENSORY_GALLERY = [')
    if c_start == -1 or c_end == -1:
        print('Error locating COURSES block')
        return
    content = content[:c_start] + NEW_COURSES_CODE + '\n\n' + content[c_end:]

    # 2. Replace COMPARISON_ROWS
    comp_start = content.find('const COMPARISON_ROWS = [')
    comp_end = content.find('const SEO_REGIONS = [')
    if comp_start == -1 or comp_end == -1:
        print('Error locating COMPARISON_ROWS block')
        return
    content = content[:comp_start] + NEW_COMPARISON_ROWS_CODE + '\n\n' + content[comp_end:]

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Updated src/app/page.tsx with standard market prices successfully!')

update_main_page()
