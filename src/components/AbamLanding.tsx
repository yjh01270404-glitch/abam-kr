'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type LandingContent } from '../lib/landing-content';
import { UI } from '../lib/landing-ui';

const WA_LINK =
  'https://wa.me/821066072239?text=Hello%20Abam.kr,%20I%20would%20like%20to%20inquire%20about%20your%20private%201:1%20home%20care%20service.';

/* 실제 한국 상용 사이트 표준 디자인 토큰 — 깊은 다크 배경 + 솔리드 포인트 컬러 */
const C = {
  bg: '#0c0d11',
  cardBg: '#15171e',
  cardBgAlt: '#1c1f28',
  line: '#282b36',
  lineLight: '#3a3f50',
  text: '#ffffff',
  textSub: '#cbd5e1',
  textMuted: '#94a3b8',
  pointRed: '#e11d48',      // 강렬한 직관적 통화/강조 레드
  pointGold: '#f59e0b',     // 단색 웜 골드/옐로우 (그라데이션 제거)
  pointGreen: '#10b981',    // 후불제 신뢰 그린
};

const FONT = '-apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';

type Lang = 'ko' | 'en' | 'jp' | 'cn';

const LANGS: { code: Lang; label: string; href: string }[] = [
  { code: 'ko', label: 'KR', href: '/' },
  { code: 'en', label: 'EN', href: '/en' },
  { code: 'jp', label: 'JP', href: '/jp' },
  { code: 'cn', label: 'CN', href: '/cn' },
];

type Extra = {
  h1a: string;
  h1b: string;
  status: { open: string; pre: string; closed: string };
  nav: [string, string, string, string, string];
  priceNote: string;
  guideTitle: string;
  steps: string[];
  modalTitle: string;
  modalBody: string;
  callNow: string;
};

const EXTRA: Record<Lang, Extra> = {
  ko: {
    h1a: '출장안마 · 출장마사지 아밤',
    h1b: '20대 ACE가 문 앞으로 찾아갑니다',
    status: { open: '지금 예약 접수 중 · 바로 상담 가능', pre: '예약 접수 중 · 19:00부터 매니저 출발', closed: '예약 접수 18:00부터 · 출발 19:00부터' },
    nav: ['소개말', '코스안내', '방문·결제', '고객후기', '자주묻는질문'],
    priceNote: '60분 기준 · 전체 정찰제 요금',
    guideTitle: '이용 안내',
    steps: ['전화·문자로 예약', '코스·주소·시간 전달', '30분 내 방문 1:1 케어'],
    modalTitle: '아밤 예약 및 상담',
    modalBody: '전화 또는 문자로 편하게 남겨주시면 바로 안내해 드립니다.',
    callNow: '전화 바로연결',
  },
  en: {
    h1a: 'Tonight, a private massage',
    h1b: 'comes to your door',
    status: { open: 'Booking open now · Message us', pre: 'Booking open · Departures from 19:00', closed: 'Booking from 18:00 · Departures from 19:00' },
    nav: ['Intro', 'Courses', 'Visit/Pay', 'Reviews', 'FAQ'],
    priceNote: 'Per 60 min · all transparent prices',
    guideTitle: 'How it works',
    steps: ['Message or call us', 'Confirm course, place, time', '1:1 care at your location'],
    modalTitle: 'Book your private care',
    modalBody: 'Message us on WhatsApp or call directly.',
    callNow: 'Call now',
  },
  jp: {
    h1a: '今夜、プライベートな癒しが',
    h1b: 'あなたの元へ伺います',
    status: { open: 'ご予約受付中 · すぐにご相談いただけます', pre: '予約受付中 · 19:00より出発', closed: '予約は18:00から · 出発19:00から' },
    nav: ['紹介', 'コース', '利用案内', 'レビュー', 'よくある質問'],
    priceNote: '60分の料金 · 全料金表示',
    guideTitle: 'ご利用案内',
    steps: ['メッセージまたはお電話', 'コース・場所・時間を確定', 'ご希望の場所で1:1ケア'],
    modalTitle: 'ご予約・ご相談',
    modalBody: 'WhatsAppまたはお電話でご連絡ください。',
    callNow: '電話する',
  },
  cn: {
    h1a: '今晚，私人专属护理',
    h1b: '上门为您服务',
    status: { open: '正在接受预约 · 可立即咨询', pre: '接受预约 · 19:00起出发', closed: '18:00起接受预约 · 19:00起出发' },
    nav: ['介绍', '项目', '须知', '评价', '常见问题'],
    priceNote: '60分钟价格 · 查看全部',
    guideTitle: '预约须知',
    steps: ['留言或来电咨询', '确认项目、地点、时间', '在您指定的地点1:1服务'],
    modalTitle: '预约咨询',
    modalBody: '请通过WhatsApp留言或直接来电。',
    callNow: '立即致电',
  },
};

/* **굵게** 와 \n 줄바꿈을 지원하는 간단한 텍스트 렌더러 */
const rich = (str: string, color?: string) =>
  str.split('\n').map((line, li) => (
    <React.Fragment key={li}>
      {li > 0 && <br />}
      {line.split('**').map((p, i) =>
        i % 2 ? <strong key={i} style={color ? { color } : undefined}>{p}</strong> : <React.Fragment key={i}>{p}</React.Fragment>,
      )}
    </React.Fragment>
  ));

const LANG_NAME: Record<Lang, string> = { ko: '한국어', en: 'English', jp: '日本語', cn: '中文' };

const PhoneIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.59 3.68a1 1 0 01-.24 1.02l-2.23 2.09z" />
  </svg>
);

const SmsIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z" />
  </svg>
);

/* 히어로 전면 전체에 반짝이는 작은 별 & 다이아몬드 스파클 데이터 */
type StarType = 'cross' | 'sparkle' | 'twinkle';
interface HeroStarItem {
  top: string;
  left: string;
  size: number;
  dur: string;
  delay: string;
  color: string;
  type: StarType;
}

const HERO_STARS: HeroStarItem[] = [
  // 상단부 0% ~ 25% (풍성한 밤하늘 밀키웨이)
  { top: '2%', left: '5%', size: 2, dur: '2.2s', delay: '0.1s', color: '#ffffff', type: 'twinkle' },
  { top: '3%', left: '16%', size: 4, dur: '3.4s', delay: '0.8s', color: '#fef08a', type: 'cross' },
  { top: '4%', left: '28%', size: 1.5, dur: '1.9s', delay: '1.5s', color: '#ffffff', type: 'twinkle' },
  { top: '2%', left: '42%', size: 3, dur: '2.8s', delay: '0.3s', color: '#fde047', type: 'sparkle' },
  { top: '5%', left: '55%', size: 2, dur: '3.1s', delay: '1.2s', color: '#bae6fd', type: 'twinkle' },
  { top: '3%', left: '68%', size: 4.5, dur: '3.6s', delay: '1.9s', color: '#ffffff', type: 'cross' },
  { top: '4%', left: '80%', size: 2.5, dur: '2.4s', delay: '0.6s', color: '#fef08a', type: 'sparkle' },
  { top: '2%', left: '92%', size: 1.5, dur: '2.0s', delay: '1.1s', color: '#ffffff', type: 'twinkle' },

  { top: '8%', left: '9%', size: 1.5, dur: '2.5s', delay: '0.4s', color: '#ffffff', type: 'twinkle' },
  { top: '10%', left: '22%', size: 2.5, dur: '2.7s', delay: '1.7s', color: '#bae6fd', type: 'twinkle' },
  { top: '7%', left: '35%', size: 3.5, dur: '3.5s', delay: '0.2s', color: '#fef08a', type: 'cross' },
  { top: '9%', left: '48%', size: 2, dur: '2.1s', delay: '1.4s', color: '#ffffff', type: 'twinkle' },
  { top: '8%', left: '62%', size: 2.5, dur: '3.0s', delay: '0.9s', color: '#fde047', type: 'sparkle' },
  { top: '11%', left: '74%', size: 1.5, dur: '1.8s', delay: '1.6s', color: '#ffffff', type: 'twinkle' },
  { top: '9%', left: '87%', size: 4, dur: '3.8s', delay: '0.5s', color: '#ffffff', type: 'cross' },
  { top: '12%', left: '96%', size: 2, dur: '2.3s', delay: '2.1s', color: '#fef08a', type: 'twinkle' },

  { top: '15%', left: '4%', size: 3, dur: '3.2s', delay: '1.0s', color: '#fde047', type: 'sparkle' },
  { top: '17%', left: '14%', size: 1.5, dur: '2.0s', delay: '0.3s', color: '#ffffff', type: 'twinkle' },
  { top: '14%', left: '26%', size: 4, dur: '3.7s', delay: '2.3s', color: '#ffffff', type: 'cross' },
  { top: '18%', left: '39%', size: 2, dur: '2.6s', delay: '0.7s', color: '#bae6fd', type: 'twinkle' },
  { top: '16%', left: '52%', size: 1.5, dur: '1.9s', delay: '1.3s', color: '#ffffff', type: 'twinkle' },
  { top: '19%', left: '66%', size: 3, dur: '3.3s', delay: '0.8s', color: '#fef08a', type: 'sparkle' },
  { top: '15%', left: '79%', size: 2, dur: '2.4s', delay: '1.8s', color: '#ffffff', type: 'twinkle' },
  { top: '18%', left: '91%', size: 3.5, dur: '3.6s', delay: '0.4s', color: '#ffffff', type: 'cross' },

  // 중상단부 20% ~ 45% (H1 제목 및 요약 바 주변)
  { top: '22%', left: '7%', size: 2, dur: '2.5s', delay: '1.5s', color: '#bae6fd', type: 'twinkle' },
  { top: '24%', left: '18%', size: 3, dur: '3.1s', delay: '0.6s', color: '#fde047', type: 'sparkle' },
  { top: '21%', left: '32%', size: 1.5, dur: '2.2s', delay: '2.0s', color: '#ffffff', type: 'twinkle' },
  { top: '25%', left: '44%', size: 4.5, dur: '3.9s', delay: '1.1s', color: '#fef08a', type: 'cross' },
  { top: '23%', left: '58%', size: 2, dur: '2.8s', delay: '0.2s', color: '#ffffff', type: 'twinkle' },
  { top: '26%', left: '72%', size: 3, dur: '3.4s', delay: '1.7s', color: '#ffffff', type: 'sparkle' },
  { top: '22%', left: '84%', size: 2.5, dur: '2.3s', delay: '0.9s', color: '#fef08a', type: 'twinkle' },
  { top: '25%', left: '95%', size: 3.5, dur: '3.5s', delay: '1.4s', color: '#ffffff', type: 'cross' },

  { top: '29%', left: '3%', size: 1.5, dur: '1.9s', delay: '0.5s', color: '#ffffff', type: 'twinkle' },
  { top: '31%', left: '12%', size: 4, dur: '3.8s', delay: '2.2s', color: '#ffffff', type: 'cross' },
  { top: '28%', left: '23%', size: 2, dur: '2.4s', delay: '1.0s', color: '#bae6fd', type: 'twinkle' },
  { top: '32%', left: '36%', size: 3, dur: '3.2s', delay: '0.3s', color: '#fde047', type: 'sparkle' },
  { top: '30%', left: '64%', size: 2, dur: '2.7s', delay: '1.6s', color: '#ffffff', type: 'twinkle' },
  { top: '33%', left: '77%', size: 4, dur: '3.6s', delay: '0.7s', color: '#fef08a', type: 'cross' },
  { top: '29%', left: '88%', size: 1.5, dur: '2.1s', delay: '1.9s', color: '#ffffff', type: 'twinkle' },
  { top: '32%', left: '97%', size: 2.5, dur: '3.0s', delay: '0.4s', color: '#bae6fd', type: 'twinkle' },

  { top: '36%', left: '6%', size: 3, dur: '3.4s', delay: '1.2s', color: '#fef08a', type: 'sparkle' },
  { top: '38%', left: '16%', size: 1.5, dur: '2.0s', delay: '0.8s', color: '#ffffff', type: 'twinkle' },
  { top: '35%', left: '29%', size: 2.5, dur: '2.8s', delay: '1.5s', color: '#ffffff', type: 'twinkle' },
  { top: '39%', left: '70%', size: 3, dur: '3.3s', delay: '0.1s', color: '#fde047', type: 'sparkle' },
  { top: '37%', left: '83%', size: 4, dur: '3.7s', delay: '2.4s', color: '#ffffff', type: 'cross' },
  { top: '40%', left: '93%', size: 2, dur: '2.5s', delay: '1.3s', color: '#bae6fd', type: 'twinkle' },

  // 중하단부 45% ~ 70% (전화/문자 버튼 및 화보 주변)
  { top: '44%', left: '4%', size: 4.5, dur: '3.9s', delay: '0.9s', color: '#ffffff', type: 'cross' },
  { top: '46%', left: '15%', size: 2, dur: '2.3s', delay: '1.8s', color: '#bae6fd', type: 'twinkle' },
  { top: '43%', left: '25%', size: 3, dur: '3.1s', delay: '0.4s', color: '#fef08a', type: 'sparkle' },
  { top: '47%', left: '74%', size: 2.5, dur: '2.9s', delay: '1.6s', color: '#ffffff', type: 'twinkle' },
  { top: '45%', left: '86%', size: 3.5, dur: '3.5s', delay: '0.2s', color: '#fde047', type: 'cross' },
  { top: '48%', left: '96%', size: 1.5, dur: '2.1s', delay: '1.1s', color: '#ffffff', type: 'twinkle' },

  { top: '52%', left: '7%', size: 2, dur: '2.6s', delay: '0.7s', color: '#ffffff', type: 'twinkle' },
  { top: '55%', left: '19%', size: 3.5, dur: '3.6s', delay: '2.1s', color: '#fef08a', type: 'cross' },
  { top: '53%', left: '81%', size: 3, dur: '3.2s', delay: '1.0s', color: '#ffffff', type: 'sparkle' },
  { top: '56%', left: '92%', size: 2, dur: '2.4s', delay: '0.5s', color: '#bae6fd', type: 'twinkle' },

  { top: '60%', left: '5%', size: 3, dur: '3.3s', delay: '1.4s', color: '#fde047', type: 'sparkle' },
  { top: '63%', left: '14%', size: 1.5, dur: '1.9s', delay: '0.3s', color: '#ffffff', type: 'twinkle' },
  { top: '61%', left: '26%', size: 2.5, dur: '2.8s', delay: '2.0s', color: '#bae6fd', type: 'twinkle' },
  { top: '64%', left: '72%', size: 4, dur: '3.8s', delay: '0.8s', color: '#ffffff', type: 'cross' },
  { top: '62%', left: '85%', size: 2, dur: '2.2s', delay: '1.7s', color: '#fef08a', type: 'twinkle' },
  { top: '65%', left: '95%', size: 3, dur: '3.4s', delay: '0.6s', color: '#ffffff', type: 'sparkle' },

  // 하단부 70% ~ 98% (모델 화보 및 히어로 바닥)
  { top: '70%', left: '8%', size: 4, dur: '3.7s', delay: '1.2s', color: '#ffffff', type: 'cross' },
  { top: '73%', left: '21%', size: 2, dur: '2.5s', delay: '0.5s', color: '#bae6fd', type: 'twinkle' },
  { top: '71%', left: '33%', size: 1.5, dur: '2.0s', delay: '1.8s', color: '#ffffff', type: 'twinkle' },
  { top: '74%', left: '46%', size: 3, dur: '3.2s', delay: '0.9s', color: '#fde047', type: 'sparkle' },
  { top: '72%', left: '59%', size: 2, dur: '2.7s', delay: '1.4s', color: '#ffffff', type: 'twinkle' },
  { top: '75%', left: '69%', size: 4.5, dur: '4.0s', delay: '2.2s', color: '#fef08a', type: 'cross' },
  { top: '71%', left: '82%', size: 2.5, dur: '2.9s', delay: '0.3s', color: '#ffffff', type: 'twinkle' },
  { top: '74%', left: '93%', size: 3, dur: '3.5s', delay: '1.6s', color: '#bae6fd', type: 'sparkle' },

  { top: '80%', left: '4%', size: 2, dur: '2.3s', delay: '1.1s', color: '#ffffff', type: 'twinkle' },
  { top: '83%', left: '16%', size: 3.5, dur: '3.6s', delay: '0.4s', color: '#fef08a', type: 'cross' },
  { top: '81%', left: '27%', size: 1.5, dur: '1.8s', delay: '1.5s', color: '#ffffff', type: 'twinkle' },
  { top: '84%', left: '40%', size: 2.5, dur: '2.8s', delay: '2.3s', color: '#bae6fd', type: 'twinkle' },
  { top: '82%', left: '54%', size: 3, dur: '3.3s', delay: '0.7s', color: '#fde047', type: 'sparkle' },
  { top: '85%', left: '66%', size: 2, dur: '2.4s', delay: '1.9s', color: '#ffffff', type: 'twinkle' },
  { top: '81%', left: '78%', size: 4, dur: '3.8s', delay: '0.2s', color: '#ffffff', type: 'cross' },
  { top: '84%', left: '89%', size: 1.5, dur: '2.1s', delay: '1.3s', color: '#fef08a', type: 'twinkle' },
  { top: '86%', left: '97%', size: 3, dur: '3.4s', delay: '0.8s', color: '#ffffff', type: 'sparkle' },

  { top: '91%', left: '7%', size: 3.5, dur: '3.5s', delay: '1.7s', color: '#ffffff', type: 'cross' },
  { top: '93%', left: '18%', size: 2, dur: '2.2s', delay: '0.6s', color: '#bae6fd', type: 'twinkle' },
  { top: '90%', left: '31%', size: 1.5, dur: '1.9s', delay: '1.2s', color: '#ffffff', type: 'twinkle' },
  { top: '94%', left: '44%', size: 3, dur: '3.1s', delay: '2.0s', color: '#fde047', type: 'sparkle' },
  { top: '92%', left: '58%', size: 2, dur: '2.6s', delay: '0.4s', color: '#ffffff', type: 'twinkle' },
  { top: '95%', left: '71%', size: 4, dur: '3.9s', delay: '1.5s', color: '#fef08a', type: 'cross' },
  { top: '91%', left: '84%', size: 2.5, dur: '2.8s', delay: '0.9s', color: '#ffffff', type: 'twinkle' },
  { top: '96%', left: '94%', size: 3, dur: '3.3s', delay: '2.4s', color: '#ffffff', type: 'sparkle' },
];

export default function AbamLanding({ c, areaLinks }: { c: LandingContent; areaLinks?: string[] }) {
  const isKo = c.lang === 'ko';
  const x = EXTRA[c.lang];
  const t = UI[c.lang];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [smsModal, setSmsModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [status, setStatus] = useState<'open' | 'pre' | 'closed' | null>(null);

  /* 영업 상태 (한국 시간 기준) */
  useEffect(() => {
    const calc = () => {
      const h = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })).getHours();
      setStatus(h >= 19 || h < 5 ? 'open' : h === 18 ? 'pre' : 'closed');
    };
    calc();
    const t = setInterval(calc, 60000);
    return () => clearInterval(t);
  }, []);

  // 주차장, 공동현관(비번/호출버튼), 호텔 1층 로비 미팅·대면결제, 결제수단(현금/이체/카드) 포함 문자 예약 템플릿
  const BOOKING_TEMPLATE = t.tpl;

  const SMS_BODY = encodeURIComponent(t.smsBody);
  const SMS_HREF = `sms:01066072239?body=${SMS_BODY}`;

  const copyTemplate = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(BOOKING_TEMPLATE).catch(() => {});
      setToast(t.toast);
      setTimeout(() => setToast(null), 2500);
    }
  };

  const card: React.CSSProperties = {
    background: C.cardBg,
    border: `1px solid ${C.line}`,
    borderRadius: '8px',
  };

  const btn: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 700,
    borderRadius: '6px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  };

  const section: React.CSSProperties = { marginTop: '40px', scrollMarginTop: '70px', width: '100%' };

  /* 섹션 영문 깃펜 캘리그래피 캡션 매핑 (아밤 타이틀 필기체와 조화로운 앙상블) */
  const getSectionEnglishTag = (title: string): string => {
    if (title.includes('서비스') || (title.includes('안내') && !title.includes('이용') && !title.includes('방문'))) return 'Private Therapy & Service Guide';
    if (title.includes('코스') || title.includes('가격표')) return 'Signature Courses & Transparent Prices';
    if (title.includes('방문') || title.includes('이용') || title.includes('절차')) return 'Usage Guidelines & Safe Procedures';
    if (title.includes('후기') || title.includes('리뷰')) return 'Real Customer Stories & Experiences';
    if (title.includes('질문') || title.includes('FAQ')) return 'Frequently Asked Questions';
    if (title.includes('대면결제') || title.includes('안심')) return '100% On-Site Direct Payment Guarantee';
    return 'Beautiful Night · Private Care';
  };

  /* 시원시원하고 직관적인 한국형 섹션 타이틀 + 럭셔리 깃펜 필기체 서브 캡션 페어링 */
  const head = (title: string, sub?: string, tag?: string) => {
    const englishTag = tag || getSectionEnglishTag(title);
    return (
      <div style={{ marginBottom: '22px', borderLeft: `5px solid ${C.pointRed}`, marginLeft: '12px', paddingLeft: '14px', position: 'relative' }}>
        <div className="abam-copperplate-en" style={{ fontSize: '20px', color: '#fef08a', letterSpacing: '0.06em', opacity: 0.92, marginBottom: '2px', lineHeight: 1.2, textShadow: '0 0 10px rgba(245,158,11,0.4)' }}>
          {englishTag}
        </div>
        <h2 className="abam-head-title" style={{ fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '-0.5px', wordBreak: 'keep-all', lineHeight: 1.3 }}>{title}</h2>
        {sub && <p className="abam-head-sub" style={{ color: '#cbd5e1', margin: '6px 0 0', wordBreak: 'keep-all', fontWeight: 600 }}>{sub}</p>}
      </div>
    );
  };


  return (
    <div lang={c.htmlLang} style={{ position: 'relative', minHeight: '100vh', width: '100%', background: C.bg, color: C.text, fontFamily: FONT, paddingBottom: '140px', lineHeight: 1.65 }}>
      
      {/* ── 브라우저 기본 스크롤 및 고딕 폰트 지정 + 히어로 화려한 별빛 & 유성 애니메이션 ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Great+Vibes&family=Monsieur+La+Doulaise&family=Alex+Brush&display=swap');

        @font-face {
          font-family: 'KccEunyeong';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/KCC-eunyoung-Regular.woff') format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        .abam-script-font {
          font-family: 'KccEunyeong', 'Pinyon Script', cursive, sans-serif !important;
          font-weight: normal !important;
          font-style: italic !important;
          letter-spacing: 0.02em !important;
        }

        .abam-copperplate-en {
          font-family: 'Pinyon Script', 'Monsieur La Doulaise', cursive !important;
          font-weight: normal !important;
          font-style: italic !important;
        }

        html { scroll-behavior: smooth; font-family: ${FONT}; width: 100%; overflow-x: hidden; }
        body { width: 100%; overflow-x: hidden; }

        @keyframes heroStarTwinkle {
          0%, 100% {
            opacity: 0.15;
            transform: translate3d(0, 0, 0) scale(0.6);
          }
          50% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1.35);
          }
        }
        @keyframes heroDiamondSparkle {
          0%, 100% {
            opacity: 0.15;
            transform: translate3d(0, 0, 0) scale(0.5) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1.4) rotate(45deg);
          }
        }
        @keyframes heroCrossGlint {
          0%, 100% {
            opacity: 0.12;
            transform: translate3d(0, 0, 0) scale(0.5);
          }
          45%, 55% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1.35);
          }
        }
        @keyframes heroShootingStarA {
          0% {
            transform: translate3d(0, 0, 0) rotate(-35deg);
            opacity: 0;
            width: 0px;
          }
          4% {
            opacity: 1;
            width: 120px;
          }
          12% {
            transform: translate3d(-220px, 160px, 0) rotate(-35deg);
            opacity: 0;
            width: 25px;
          }
          100% {
            transform: translate3d(-220px, 160px, 0) rotate(-35deg);
            opacity: 0;
            width: 0px;
          }
        }
        @keyframes heroShootingStarB {
          0% {
            transform: translate3d(0, 0, 0) rotate(-40deg);
            opacity: 0;
            width: 0px;
          }
          5% {
            opacity: 1;
            width: 140px;
          }
          14% {
            transform: translate3d(-250px, 200px, 0) rotate(-40deg);
            opacity: 0;
            width: 25px;
          }
          100% {
            transform: translate3d(-250px, 200px, 0) rotate(-40deg);
            opacity: 0;
            width: 0px;
          }
        }

        /* ── 모바일 화면 최적화: 좌우 여백 0 완전 100% 풀와이드(Full-Width) 레이아웃 + 데스크톱 860px 확대 ── */
        .abam-container {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 0;
          box-sizing: border-box;
        }
        @media (min-width: 640px) {
          html:not(.abam-m) .abam-container {
            max-width: 860px;
            padding: 0 20px;
          }
        }

        .abam-header-right { margin-left: auto; }
        .abam-lang {
          display: flex;
          align-items: center;
          gap: 6px;
          order: 3;
          margin-left: 16px;
        }
        .abam-lang-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 46px;
          height: 38px;
          padding: 0 12px;
          border-radius: 8px;
          border: 1px solid #3a3f50;
          background: #1c1f28;
          color: #e2e8f0;
          font-size: 14.5px;
          font-weight: 800;
          letter-spacing: 0.3px;
          text-decoration: none;
          box-sizing: border-box;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .abam-lang-btn:hover { border-color: #f59e0b; color: #ffffff; background: #262a36; }
        .abam-lang-btn:active { transform: scale(0.96); }
        .abam-lang-on {
          background: #f59e0b;
          border-color: #f59e0b;
          color: #1a1204;
          cursor: default;
        }
        .abam-lang-on:hover { background: #f59e0b; color: #1a1204; }

        .abam-header-inner {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
        }
        @media (min-width: 640px) {
          html:not(.abam-m) .abam-header-inner {
            max-width: 900px;
            padding: 14px 20px;
          }
        }

        /* 모바일에서는 좁은 카드 상자 형태가 아니라, 화면 좌우 끝까지 100% 닿는 풀스크린 섹션으로 전환 */
        .abam-card {
          background: #15171e;
          border-top: 1px solid #282b36;
          border-bottom: 1px solid #282b36;
          border-left: none;
          border-right: none;
          border-radius: 0;
          padding: 20px 16px;
          box-sizing: border-box;
          width: 100%;
        }
        @media (min-width: 640px) {
          html:not(.abam-m) .abam-card {
            border: 1px solid #282b36;
            border-radius: 10px;
            padding: 22px 24px;
          }
        }

        .abam-hero-box {
          width: 100%;
          max-width: 100%;
          padding-left: 12px;
          padding-right: 12px;
          box-sizing: border-box;
        }
        @media (min-width: 640px) {
          html:not(.abam-m) .abam-hero-box {
            max-width: 640px;
            padding-left: 0;
            padding-right: 0;
          }
        }

        .abam-bottom-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(12, 13, 17, 0.98);
          border-top: 1px solid #282b36;
          padding: 8px 10px;
          z-index: 50;
          box-sizing: border-box;
          width: 100%;
        }
        @media (min-width: 640px) {
          html:not(.abam-m) .abam-bottom-bar {
            padding: 10px 20px;
          }
        }

        /* ── 모바일 정돈 시스템: 실제 폰 폭(360~430px) 기준 · 들여쓰기/줄바꿈/줄맞춤 통일 ── */
        .abam-head-title { font-size: 26px; }
        .abam-head-sub { font-size: 18px; }
        .abam-bottom-btn { white-space: nowrap; }

        @media (max-width: 640px) {
          /* 헤더: 모바일에서 상단 타이틀과 네비게이션바가 완벽하게 한 줄(Single Line)로 정렬 */
          .abam-header-inner {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            align-items: center !important;
            justify-content: space-between !important;
            padding: 0 10px !important;
            height: 52px !important;
            box-sizing: border-box !important;
          }
          .abam-header-badge { display: none !important; }
          /* 모바일 헤더 조합의 어울림과 1줄 유지를 위해 언어 버튼은 헤더에서 제거(푸터 제공) */
          .abam-lang { display: none !important; }
          .abam-header-moon {
            width: 19px !important;
            height: 19px !important;
            flex-shrink: 0 !important;
          }
          .abam-header-title-text {
            font-size: 21px !important;
            line-height: 1 !important;
          }
          .abam-header-tag-text {
            font-size: 13px !important;
            font-weight: 900 !important;
            letter-spacing: -0.4px !important;
            white-space: nowrap !important;
          }
          .abam-header-right {
            width: auto !important;
            margin-left: auto !important;
            display: flex !important;
            align-items: center !important;
            flex-shrink: 0 !important;
            gap: 0 !important;
          }
          .abam-header-nav {
            display: flex !important;
            align-items: center !important;
            gap: 1px !important;
            flex-shrink: 0 !important;
            white-space: nowrap !important;
            overflow: visible !important;
          }
          /* 소개는 최상단 직후이므로 모바일 1줄 균형을 위해 제거, 핵심 4대 메뉴(코스·안내·후기·FAQ) 노출 */
          .abam-nav-intro { display: none !important; }
          .abam-nav-link {
            padding: 5px 6px !important;
            font-size: 13px !important;
            font-weight: 700 !important;
            white-space: nowrap !important;
            color: #cbd5e1 !important;
          }
          .abam-nav-price {
            color: #fef08a !important;
            font-weight: 800 !important;
          }

          /* 히어로 타이틀: 로고+이름 / [아밤·Abam] / 서브카피 3단 중앙정렬 */
          .abam-hero-title-main { font-size: 48px !important; }
          .abam-hero-title-tag {
            font-size: 22px !important;
            flex-basis: 100% !important;
            text-align: center !important;
            margin-top: -2px !important;
          }
          .abam-hero-subtitle {
            font-size: 17px !important;
            line-height: 1.6 !important;
            padding: 0 16px !important;
            text-wrap: balance;
          }

          /* 히어로 박스류: 버튼과 같은 좌우 16px 안쪽 라인에 정렬 */
          .abam-hero-desc,
          .abam-hero-summary-bar,
          .abam-hero-advance-box {
            width: calc(100% - 32px) !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .abam-hero-box {
            padding-left: 16px !important;
            padding-right: 16px !important;
            box-sizing: border-box !important;
          }
          .abam-hero-desc {
            font-size: 15.5px !important;
            line-height: 1.75 !important;
            padding: 16px 14px !important;
            text-wrap: pretty;
          }
          .abam-hero-summary-bar {
            font-size: 13.5px !important;
            font-weight: 800 !important;
            padding: 14px 6px !important;
            gap: 4px !important;
          }
          .abam-hero-summary-bar span {
            flex: 1 1 0 !important;
            text-align: center !important;
            line-height: 1.4 !important;
            text-wrap: balance;
          }
          .abam-hero-summary-bar span:nth-child(even) { flex: 0 0 auto !important; }
          .abam-hero-advance-box {
            font-size: 14.5px !important;
            line-height: 1.7 !important;
            padding: 14px 16px !important;
            text-wrap: pretty;
          }
          .abam-hero-call-btn {
            font-size: 17px !important;
            padding: 16px 12px !important;
            gap: 8px !important;
            white-space: nowrap !important;
          }
          .abam-hero-sub-btn {
            font-size: 15px !important;
            padding: 14px 8px !important;
            white-space: nowrap !important;
          }

          /* 본문 카드: 좌우 16px 통일, 16px 본문, 단어 단위 줄바꿈 */
          .abam-card { padding: 20px 16px !important; }
          .abam-card.abam-card-flush { padding: 0 !important; }
          .abam-head-title { font-size: 21px !important; }
          .abam-head-sub { font-size: 14.5px !important; line-height: 1.55 !important; text-wrap: balance; }
          .abam-body-text {
            font-size: 15.5px !important;
            line-height: 1.8 !important;
            text-wrap: pretty;
          }
          .abam-course-name { font-size: 19px !important; text-wrap: balance; }
          .abam-course-desc {
            font-size: 15px !important;
            line-height: 1.75 !important;
            text-wrap: pretty;
          }
          .abam-course-chip {
            font-size: 13px !important;
            padding: 6px 10px !important;
          }
          .abam-course-price-cell { padding: 12px 2px !important; }
          .abam-course-price-val {
            font-size: 17px !important;
            font-weight: 900 !important;
            letter-spacing: -0.3px !important;
            white-space: nowrap !important;
          }
          .abam-course-duration {
            font-size: 13px !important;
            font-weight: 800 !important;
          }
          .abam-rule-title { font-size: 17px !important; font-weight: 900 !important; line-height: 1.4 !important; text-wrap: balance; }
          .abam-rule-desc {
            font-size: 15px !important;
            line-height: 1.75 !important;
            text-wrap: pretty;
          }
          .abam-review-text {
            font-size: 15px !important;
            line-height: 1.75 !important;
            text-wrap: pretty;
          }
          .abam-faq-q { font-size: 16px !important; line-height: 1.5 !important; }
          .abam-faq-a {
            font-size: 15px !important;
            line-height: 1.75 !important;
            text-wrap: pretty;
          }

          /* 하단 고정 버튼 */
          .abam-bottom-bar { padding: 8px 10px calc(8px + env(safe-area-inset-bottom)) !important; }
          .abam-bottom-btn {
            font-size: 16px !important;
            padding: 14px 0 !important;
            gap: 6px !important;
          }
          .abam-photo-banner { height: 220px !important; }

          .abam-container { padding: 0 !important; max-width: 100% !important; }
          .abam-header-inner { max-width: 100% !important; }
        }
        /* 폰 "데스크톱 사이트" 모드(약 980px 레이아웃 + 자동 줌 보정): 동일한 모바일 규칙 적용 */
        html.abam-m {
          /* 헤더: 모바일에서 상단 타이틀과 네비게이션바가 완벽하게 한 줄(Single Line)로 정렬 */
          .abam-header-inner {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            align-items: center !important;
            justify-content: space-between !important;
            padding: 0 10px !important;
            height: 52px !important;
            box-sizing: border-box !important;
          }
          .abam-header-badge { display: none !important; }
          /* 모바일 헤더 조합의 어울림과 1줄 유지를 위해 언어 버튼은 헤더에서 제거(푸터 제공) */
          .abam-lang { display: none !important; }
          .abam-header-moon {
            width: 19px !important;
            height: 19px !important;
            flex-shrink: 0 !important;
          }
          .abam-header-title-text {
            font-size: 21px !important;
            line-height: 1 !important;
          }
          .abam-header-tag-text {
            font-size: 13px !important;
            font-weight: 900 !important;
            letter-spacing: -0.4px !important;
            white-space: nowrap !important;
          }
          .abam-header-right {
            width: auto !important;
            margin-left: auto !important;
            display: flex !important;
            align-items: center !important;
            flex-shrink: 0 !important;
            gap: 0 !important;
          }
          .abam-header-nav {
            display: flex !important;
            align-items: center !important;
            gap: 1px !important;
            flex-shrink: 0 !important;
            white-space: nowrap !important;
            overflow: visible !important;
          }
          /* 소개는 최상단 직후이므로 모바일 1줄 균형을 위해 제거, 핵심 4대 메뉴(코스·안내·후기·FAQ) 노출 */
          .abam-nav-intro { display: none !important; }
          .abam-nav-link {
            padding: 5px 6px !important;
            font-size: 13px !important;
            font-weight: 700 !important;
            white-space: nowrap !important;
            color: #cbd5e1 !important;
          }
          .abam-nav-price {
            color: #fef08a !important;
            font-weight: 800 !important;
          }

          /* 히어로 타이틀: 로고+이름 / [아밤·Abam] / 서브카피 3단 중앙정렬 */
          .abam-hero-title-main { font-size: 48px !important; }
          .abam-hero-title-tag {
            font-size: 22px !important;
            flex-basis: 100% !important;
            text-align: center !important;
            margin-top: -2px !important;
          }
          .abam-hero-subtitle {
            font-size: 17px !important;
            line-height: 1.6 !important;
            padding: 0 16px !important;
            text-wrap: balance;
          }

          /* 히어로 박스류: 버튼과 같은 좌우 16px 안쪽 라인에 정렬 */
          .abam-hero-desc,
          .abam-hero-summary-bar,
          .abam-hero-advance-box {
            width: calc(100% - 32px) !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .abam-hero-box {
            padding-left: 16px !important;
            padding-right: 16px !important;
            box-sizing: border-box !important;
          }
          .abam-hero-desc {
            font-size: 15.5px !important;
            line-height: 1.75 !important;
            padding: 16px 14px !important;
            text-wrap: pretty;
          }
          .abam-hero-summary-bar {
            font-size: 13.5px !important;
            font-weight: 800 !important;
            padding: 14px 6px !important;
            gap: 4px !important;
          }
          .abam-hero-summary-bar span {
            flex: 1 1 0 !important;
            text-align: center !important;
            line-height: 1.4 !important;
            text-wrap: balance;
          }
          .abam-hero-summary-bar span:nth-child(even) { flex: 0 0 auto !important; }
          .abam-hero-advance-box {
            font-size: 14.5px !important;
            line-height: 1.7 !important;
            padding: 14px 16px !important;
            text-wrap: pretty;
          }
          .abam-hero-call-btn {
            font-size: 17px !important;
            padding: 16px 12px !important;
            gap: 8px !important;
            white-space: nowrap !important;
          }
          .abam-hero-sub-btn {
            font-size: 15px !important;
            padding: 14px 8px !important;
            white-space: nowrap !important;
          }

          /* 본문 카드: 좌우 16px 통일, 16px 본문, 단어 단위 줄바꿈 */
          .abam-card { padding: 20px 16px !important; }
          .abam-card.abam-card-flush { padding: 0 !important; }
          .abam-head-title { font-size: 21px !important; }
          .abam-head-sub { font-size: 14.5px !important; line-height: 1.55 !important; text-wrap: balance; }
          .abam-body-text {
            font-size: 15.5px !important;
            line-height: 1.8 !important;
            text-wrap: pretty;
          }
          .abam-course-name { font-size: 19px !important; text-wrap: balance; }
          .abam-course-desc {
            font-size: 15px !important;
            line-height: 1.75 !important;
            text-wrap: pretty;
          }
          .abam-course-chip {
            font-size: 13px !important;
            padding: 6px 10px !important;
          }
          .abam-course-price-cell { padding: 12px 2px !important; }
          .abam-course-price-val {
            font-size: 17px !important;
            font-weight: 900 !important;
            letter-spacing: -0.3px !important;
            white-space: nowrap !important;
          }
          .abam-course-duration {
            font-size: 13px !important;
            font-weight: 800 !important;
          }
          .abam-rule-title { font-size: 17px !important; font-weight: 900 !important; line-height: 1.4 !important; text-wrap: balance; }
          .abam-rule-desc {
            font-size: 15px !important;
            line-height: 1.75 !important;
            text-wrap: pretty;
          }
          .abam-review-text {
            font-size: 15px !important;
            line-height: 1.75 !important;
            text-wrap: pretty;
          }
          .abam-faq-q { font-size: 16px !important; line-height: 1.5 !important; }
          .abam-faq-a {
            font-size: 15px !important;
            line-height: 1.75 !important;
            text-wrap: pretty;
          }

          /* 하단 고정 버튼 */
          .abam-bottom-bar { padding: 8px 10px calc(8px + env(safe-area-inset-bottom)) !important; }
          .abam-bottom-btn {
            font-size: 16px !important;
            padding: 14px 0 !important;
            gap: 6px !important;
          }
          .abam-photo-banner { height: 220px !important; }

          .abam-container { padding: 0 !important; max-width: 100% !important; }
          .abam-header-inner { max-width: 100% !important; }
        }


        .abam-photo-banner {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
          border-top: 1px solid #282b36;
          border-bottom: 1px solid #282b36;
          border-left: none;
          border-right: none;
          border-radius: 0;
          box-sizing: border-box;
          margin-top: 16px;
        }
        @media (min-width: 640px) {
          html:not(.abam-m) .abam-photo-banner {
            border: 1px solid #282b36;
            border-radius: 10px;
            height: 330px;
          }
        }
      `}</style>

      {/* ── 전체 페이지 밤하늘 고정 배경 (전체 스크롤 구간에 반짝이는 작은 별 & 유성 쏟아짐) ── */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(12,13,17,0.85), rgba(12,13,17,0.98)), url(/images/seoul-night.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        
        {/* 전체 화면 밤하늘 유성 1 */}
        <span
          style={{
            position: 'absolute',
            top: '12%',
            right: '8%',
            height: '1.5px',
            background: 'linear-gradient(to left, rgba(255,255,255,0), #ffffff, rgba(254,240,138,0.9))',
            borderRadius: '999px',
            boxShadow: '0 0 8px #ffffff',
            animation: 'heroShootingStarA 8s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
            animationDelay: '1.2s',
          }}
        />
        {/* 전체 화면 밤하늘 유성 2 */}
        <span
          style={{
            position: 'absolute',
            top: '48%',
            right: '18%',
            height: '1.5px',
            background: 'linear-gradient(to left, rgba(255,255,255,0), #bae6fd, #ffffff)',
            borderRadius: '999px',
            boxShadow: '0 0 8px #bae6fd',
            animation: 'heroShootingStarB 11s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
            animationDelay: '5.5s',
          }}
        />

        {/* 전체 페이지 고정 반짝이는 별빛 모션 (스크롤을 내려도 끝까지 아름답게 반짝임 · GPU 가속) */}
        {HERO_STARS.map((s, idx) => {
          if (s.type === 'cross') {
            return (
              <span
                key={idx}
                style={{
                  position: 'absolute',
                  top: s.top,
                  left: s.left,
                  width: `${s.size * 3}px`,
                  height: `${s.size * 3}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: `heroCrossGlint ${s.dur} ease-in-out infinite`,
                  animationDelay: s.delay,
                  willChange: 'transform, opacity',
                  transform: 'translate3d(0, 0, 0)',
                }}
              >
                <svg width={s.size * 3} height={s.size * 3} viewBox="0 0 24 24" fill={s.color}>
                  <path d="M12 0L14 9.5L24 12L14 14.5L12 24L10 14.5L0 12L10 9.5Z" />
                </svg>
              </span>
            );
          }
          if (s.type === 'sparkle') {
            return (
              <span
                key={idx}
                style={{
                  position: 'absolute',
                  top: s.top,
                  left: s.left,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  background: s.color,
                  transform: 'translate3d(0, 0, 0) rotate(45deg)',
                  animation: `heroDiamondSparkle ${s.dur} ease-in-out infinite`,
                  animationDelay: s.delay,
                  willChange: 'transform, opacity',
                }}
              />
            );
          }
          return (
            <span
              key={idx}
              style={{
                position: 'absolute',
                top: s.top,
                left: s.left,
                width: `${s.size}px`,
                height: `${s.size}px`,
                borderRadius: '50%',
                background: s.color,
                animation: `heroStarTwinkle ${s.dur} ease-in-out infinite`,
                animationDelay: s.delay,
                willChange: 'transform, opacity',
                transform: 'translate3d(0, 0, 0)',
              }}
            />
          );
        })}
      </div>

      {/* 토스트 알림 */}
      {toast && (
        <div style={{ position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)', background: '#1e293b', border: `1px solid ${C.lineLight}`, color: '#ffffff', padding: '10px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, zIndex: 99999, boxShadow: '0 8px 24px rgba(0,0,0,0.8)' }}>
          {toast}
        </div>
      )}

      {/* ── 직관적이고 실용적인 문자 예약 양식 모달 ── */}
      {smsModal && (
        <div onClick={() => setSmsModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 99998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#161820', border: `1px solid ${C.lineLight}`, borderRadius: '10px', maxWidth: '420px', width: '100%', padding: '24px 20px', textAlign: 'center', boxShadow: '0 20px 45px rgba(0,0,0,0.9)' }}>
            
            {/* 모달 헤더 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>{t.modalHead}</div>
              <button onClick={() => setSmsModal(false)} style={{ background: 'transparent', border: 'none', color: C.textMuted, fontSize: '20px', cursor: 'pointer', lineHeight: 1, padding: '2px 6px' }}>✕</button>
            </div>
            
            <p style={{ fontSize: '13px', color: C.textSub, margin: '0 0 12px', textAlign: 'left', wordBreak: 'keep-all', lineHeight: 1.6 }}>
              {rich(t.modalDesc)}
            </p>

            {/* 1시간 전 예약 강조 알림 */}
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '6px', padding: '9px 12px', textAlign: 'left', fontSize: '12.5px', color: '#fef08a', marginBottom: '12px', lineHeight: 1.5, wordBreak: 'keep-all' }}>
              {rich(t.modalNotice)}
            </div>

            {/* 예약 양식 프리뷰 카드 */}
            <div style={{ background: '#0e1015', border: `1px solid ${C.line}`, borderRadius: '6px', padding: '12px 14px', textAlign: 'left', fontSize: '12.5px', lineHeight: 1.7, color: '#e2e8f0', marginBottom: '14px', fontFamily: 'monospace, sans-serif' }}>
              <div style={{ color: C.pointGold, fontWeight: 700, marginBottom: '4px', fontFamily: FONT }}>{t.previewTitle}</div>
              <div>{t.preview[0]}</div>
              <div>{t.preview[1]}</div>
              <div>{t.preview[2]}</div>
              <div>{t.preview[3]}</div>
              <div>{t.preview[4]}</div>
              <div>{t.preview[5]}</div>
            </div>

            {/* 메인 액션 버튼군 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              <a href={SMS_HREF} onClick={() => setSmsModal(false)} style={{ ...btn, background: C.pointRed, color: '#ffffff', fontSize: '15px', padding: '13px 0' }}>
                {t.send}
              </a>

              <button onClick={copyTemplate} style={{ ...btn, background: '#252936', border: `1px solid ${C.lineLight}`, color: '#ffffff', fontSize: '14px', padding: '11px 0' }}>
                {t.copy}
              </button>

              <a href={c.contact.tel} onClick={() => setSmsModal(false)} style={{ ...btn, background: 'transparent', border: `1px solid ${C.lineLight}`, color: C.textSub, fontSize: '14px', padding: '11px 0' }}>
                <PhoneIcon size={16} /> {c.contact.phone} {t.callModal}
              </a>
            </div>

            {/* 안심 현장 대면결제 안내 */}
            <div style={{ background: '#1c1f2b', border: `1px solid ${C.line}`, borderRadius: '6px', padding: '10px 12px', textAlign: 'left', fontSize: '12px', lineHeight: 1.6, color: '#94a3b8' }}>
              {t.assure1}<br />
              {t.assure2}
            </div>

            <button onClick={() => setSmsModal(false)} style={{ marginTop: '12px', width: '100%', padding: '9px 0', background: 'transparent', color: C.textMuted, fontSize: '13px', border: `1px solid ${C.line}`, borderRadius: '6px', cursor: 'pointer' }}>
              {t.close}
            </button>
          </div>
        </div>
      )}

      {/* ── 1. 상단 헤더: 좌측 로고 & 상단 우측 메뉴 배치 ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(12,13,17,0.96)', borderBottom: `1px solid ${C.line}` }}>
        <div className="abam-header-inner">
          
          <Link href="/" className="abam-header-logo-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <svg className="abam-header-moon" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.9))' }}>
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="url(#headerMoonGrad)" />
              <defs>
                <linearGradient id="headerMoonGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span className="abam-script-font abam-header-title-text" style={{
                fontSize: '29px',
                fontFamily: "'KccEunyeong', 'Pinyon Script', cursive",
                fontStyle: 'italic',
                fontWeight: 'normal',
                transform: 'rotate(-1deg) skewX(-6deg)',
                display: 'inline-block',
                background: 'linear-gradient(180deg, #ffffff 15%, #fef08a 65%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 8px rgba(245,158,11,0.5))',
                lineHeight: 1,
                padding: '0 2px',
              }}>{t.logoA}</span>
              <span className="abam-header-tag-text" style={{ fontSize: '18px', fontWeight: 900, color: C.pointRed, letterSpacing: '-0.3px', lineHeight: 1 }}>{t.heroTag}</span>
            </span>
          </Link>

          {/* 언어 전환 버튼 (데스크톱 전용 — 모바일에서는 깔끔한 1줄 배치를 위해 헤더에서 숨기고 푸터에서 제공) */}
          <div className="abam-lang" role="group" aria-label="Language">
            {LANGS.map((l) =>
              l.code === c.lang ? (
                <span key={l.code} className="abam-lang-btn abam-lang-on" aria-current="page" title={LANG_NAME[l.code]}>{l.label}</span>
              ) : (
                <Link key={l.code} href={l.href} className="abam-lang-btn" hrefLang={l.code === 'jp' ? 'ja' : l.code === 'cn' ? 'zh' : l.code} aria-label={LANG_NAME[l.code]} title={LANG_NAME[l.code]}>{l.label}</Link>
              ),
            )}
          </div>

          {/* 우측 메뉴 (표준 네비게이션: 모바일에서도 상단 타이틀과 나란히 1줄로 배치) */}
          <div className="abam-header-right" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <nav className="abam-header-nav" style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
              <a href="#intro" className="abam-nav-link abam-nav-intro" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '6px 6px' }}>{t.hnav[0]}</a>
              <a href="#price" className="abam-nav-link abam-nav-price" style={{ color: '#ffffff', fontSize: '13px', fontWeight: 700, textDecoration: 'none', padding: '6px 6px' }}>{t.hnav[1]}</a>
              <a href="#rules" className="abam-nav-link abam-nav-rules" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '6px 6px' }}>{t.hnav[2]}</a>
              <a href="#reviews" className="abam-nav-link abam-nav-reviews" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '6px 6px' }}>{t.hnav[3]}</a>
              <a href="#faq" className="abam-nav-link abam-nav-faq" style={{ color: C.textSub, fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '6px 6px' }}>{t.hnav[4]}</a>
            </nav>
          </div>
        </div>
      </header>

      {/* ── 메인 콘텐츠 ── */}
      <main className="abam-container" style={{ position: 'relative', zIndex: 1, wordBreak: 'keep-all' }}>

        {/* ── 2. 히어로 섹션 (시원하고 여유로운 간격 + 전면 밤하늘 별빛 투과) ── */}
        <section style={{ position: 'relative', padding: '32px 0 0', textAlign: 'center' }}>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* 영업 상태 배지 (간격 22px 확보 및 폰트 14px) */}
            {status && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(23, 25, 34, 0.88)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: `1px solid ${C.lineLight}`, borderRadius: '6px', padding: '8px 18px', fontSize: '14px', fontWeight: 700, color: C.textSub, marginBottom: '22px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: status === 'closed' ? C.pointGold : '#10b981' }} />
                {x.status[status]}
              </div>
            )}

            {/* H1 메인 타이틀 박스 (간격 26px 확보로 조잡함 완전 해소) */}
            <h1 style={{ fontSize: '34px', fontWeight: 900, lineHeight: 1.3, color: '#ffffff', margin: '0 0 26px', letterSpacing: '-0.8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                {/* 화려하게 빛나는 골드 달모양 로고 */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 0 14px rgba(245,158,11,0.95)) drop-shadow(0 0 28px rgba(254,240,138,0.7))' }}>
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="url(#heroMoonGrad)" />
                  <defs>
                    <linearGradient id="heroMoonGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="35%" stopColor="#fef08a" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="abam-hero-title-main abam-script-font" style={{
                  color: '#ffffff',
                  fontSize: '56px',
                  fontFamily: "'KccEunyeong', 'Pinyon Script', cursive, sans-serif",
                  fontStyle: 'italic',
                  fontWeight: 'normal',
                  lineHeight: 1,
                  display: 'inline-block',
                  background: 'linear-gradient(180deg, #ffffff 10%, #fef08a 60%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 2px 14px rgba(245,158,11,0.6))',
                  transform: 'rotate(-2deg) skewX(-7deg)',
                  padding: '0 6px',
                  letterSpacing: '0.01em',
                }}>{t.heroMain}</span>
                <span className="abam-hero-title-tag" style={{ fontSize: '28px', fontWeight: 800, color: C.pointRed }}>{t.heroTag}</span>
              </div>
              {/* 미국 독립선언문 스타일 정통 영문 깃펜 필기체 서브 타이틀 */}
              <div className="abam-copperplate-en" style={{ fontSize: '26px', color: '#fef08a', opacity: 0.9, marginTop: '-2px', marginBottom: '8px', letterSpacing: '0.06em', textShadow: '0 0 12px rgba(245,158,11,0.5)', lineHeight: 1.2 }}>
                Beautiful Night · 1:1 Private Care
              </div>
              <span className="abam-hero-subtitle" style={{ fontSize: '21px', fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.4px', display: 'block', marginTop: '10px', lineHeight: 1.5 }}>
                {t.heroSub}
              </span>
            </h1>

            {/* 아밤이 왜 아밤인지 설명 배너 (모바일 점보 폰트 17px) */}
            <div className="abam-hero-box abam-hero-desc" style={{ margin: '0 auto 22px', background: 'rgba(20, 23, 34, 0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: `1px solid ${C.lineLight}`, borderRadius: '10px', padding: '18px 20px', fontSize: '16.5px', color: '#e2e8f0', lineHeight: 1.75, textAlign: 'center' }}>
              🌙 <strong className="abam-script-font" style={{ color: C.pointGold, fontSize: '30px', verticalAlign: 'baseline', display: 'inline-block', marginRight: '4px', fontStyle: 'italic', fontWeight: 'normal', transform: 'skewX(-6deg)' }}>{t.leadA}</strong>{t.leadB}<strong style={{ color: '#ffffff' }}>{t.leadC}</strong>{t.leadD}<br />
              {t.leadE}
            </div>

            {/* 핵심 서비스 요약 바 (모바일 점보 폰트 16px) */}
            <div className="abam-hero-box abam-hero-summary-bar" style={{ background: 'rgba(22, 24, 34, 0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: `1px solid ${C.line}`, borderRadius: '8px', padding: '15px 16px', margin: '0 auto 20px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: '15.5px', color: '#e2e8f0', fontWeight: 800 }}>
              <span>{t.sum[0]}</span>
              <span style={{ color: C.lineLight }}>|</span>
              <span>{t.sum[1]}</span>
              <span style={{ color: C.lineLight }}>|</span>
              <span>{t.sum[2]}</span>
            </div>

            {/* 1시간 전 예약 안내 (모바일 점보 폰트 15.5px) */}
            <div className="abam-hero-box abam-hero-advance-box" style={{ margin: '0 auto 24px', background: 'rgba(24, 27, 38, 0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: `1px solid ${C.lineLight}`, borderRadius: '8px', padding: '15px 16px', fontSize: '15.5px', color: C.pointGold, textAlign: 'center', lineHeight: 1.65 }}>
              {rich(t.adv)}
            </div>

            {/* 방문 전 안내 (주차장·공동현관·호텔) */}
            <div className="abam-hero-box abam-hero-advance-box" style={{ margin: '0 auto 24px', background: 'rgba(24, 27, 38, 0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: `1px solid ${C.lineLight}`, borderRadius: '8px', padding: '15px 16px', fontSize: '15.5px', color: '#e2e8f0', textAlign: 'left', lineHeight: 1.7, wordBreak: 'keep-all' }}>
              <strong style={{ color: C.pointGold }}>{t.noticeTitle}</strong><br />
              {rich(t.notice1)}<br />
              {rich(t.notice2)}
            </div>

            {/* 대표 전화 상담 연결 버튼 (모바일 점보 폰트 22px) */}
            <div className="abam-hero-box" style={{ margin: '0 auto 12px' }}>
              <a
                href={c.contact.tel}
                className="abam-hero-call-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  background: C.pointRed,
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '22px',
                  padding: '18px 20px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                  boxShadow: '0 4px 20px rgba(225,29,72,0.4)',
                }}
              >
                <PhoneIcon size={26} /> {c.contact.phone} {t.callHero}
              </a>
            </div>

            {/* 문자로 간편 예약하기 버튼 (양식 자동입력) */}
            <div className="abam-hero-box" style={{ margin: '0 auto 16px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '8px' }}>
              <a
                href={isKo ? SMS_HREF : WA_LINK}
                target={isKo ? undefined : '_blank'}
                rel={isKo ? undefined : 'noreferrer'}
                className="abam-hero-sub-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: 'rgba(36, 40, 54, 0.92)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: `1px solid ${C.lineLight}`,
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '16px',
                  padding: '15px 10px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  boxSizing: 'border-box',
                }}
              >
                {t.smsHero}
              </a>

              <button
                onClick={() => setSmsModal(true)}
                className="abam-hero-sub-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  background: 'rgba(22, 24, 34, 0.92)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: `1px solid ${C.line}`,
                  color: C.textSub,
                  fontWeight: 800,
                  fontSize: '15.5px',
                  padding: '15px 10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                }}
              >
                {t.formHero}
              </button>
            </div>

            <div style={{ fontSize: '14px', color: C.textMuted, marginBottom: '26px', lineHeight: 1.6 }}>
              {t.smsNote}
            </div>

            {/* 히어로 실사 모델 화보 */}
            <div className="abam-photo-banner">
              <Image
                src="/images/abam_hero_seductive.jpg"
                alt={t.altHero}
                fill
                sizes="(max-width: 640px) 100vw, 860px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </section>

        {/* ── 3. 출장안마 서비스 안내 ── */}
        <section id="intro" style={section}>
          {head(t.introTitle, t.introSub)}
          <div className="abam-card abam-body-text" style={{ fontSize: '15.5px', color: '#e2e8f0', lineHeight: 1.8 }}>
            <p style={{ margin: '0 0 14px' }}>
              {t.intro1}
            </p>
            <p style={{ margin: '0 0 14px' }}>
              {rich(t.intro2, '#ffffff')}
            </p>
            <p style={{ margin: 0 }}>
              {t.intro3}
            </p>
          </div>
        </section>

        {/* ── 4. 코스 및 정찰 가격표 (하나의 일체형 큰 박스 안에서 종류별 고유 컬러 구분) ── */}
        <section id="price" style={section}>
          {head(t.priceTitle, t.priceSub)}
          
          {/* 3대 코스 통합 단일 마스터 박스 (따로 놀지 않고 하나로 묶인 일체형 메뉴판) */}
          <div
            className="abam-card abam-card-flush"
            style={{
              padding: 0,
              overflow: 'hidden',
              border: '1px solid #333846',
              borderRadius: '12px',
              background: '#13151c',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            {/* 마스터 안내 바 */}
            <div
              style={{
                padding: '12px 18px',
                background: '#1a1d26',
                borderBottom: '1px solid #282b36',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.pointGold }} />
                <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>{t.priceBar1}</span>
              </div>
              <span style={{ fontSize: '12px', color: C.pointGold, fontWeight: 700 }}>{t.priceBar2}</span>
            </div>

            {/* 3대 코스: A(시안 블루), B(앰버 골드), C(루비 레드)로 종류별 확실한 컬러 구분 */}
            {c.courses.map((course, idx) => {
              const isThai = course.no === 1;
              const isAroma = course.no === 2;
              const isSpecial = course.no === 3;

              /* 코스별 고유 시그니처 테마 컬러 */
              const themeColor = isAroma ? '#f59e0b' : isSpecial ? '#e11d48' : '#38bdf8';
              const themeBg = isAroma
                ? 'rgba(245, 158, 11, 0.035)'
                : isSpecial
                ? 'rgba(225, 29, 72, 0.035)'
                : 'transparent';

              const badgeText = t.courseLetter[course.no - 1] ?? t.courseLetter[0];
              const tagText = isAroma ? t.tags[1] : isSpecial ? t.tags[2] : t.tags[0];

              const chips = isThai ? t.chips[0] : isAroma ? t.chips[1] : t.chips[2];

              return (
                <div
                  key={course.no}
                  style={{
                    background: themeBg,
                    borderTop: idx > 0 ? '1px solid #282b36' : 'none',
                    borderLeft: `5px solid ${themeColor}`,
                  }}
                >
                  {/* 코스별 헤더 바 (고유 컬러 뱃지 및 타이틀) */}
                  <div
                    style={{
                      padding: '14px 18px',
                      background: isAroma ? 'rgba(245, 158, 11, 0.08)' : isSpecial ? 'rgba(225, 29, 72, 0.08)' : 'rgba(56, 189, 248, 0.06)',
                      borderBottom: '1px solid #282b36',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          background: themeColor,
                          color: '#ffffff',
                          fontWeight: 900,
                          fontSize: '12.5px',
                          padding: '3px 9px',
                          borderRadius: '4px',
                        }}
                      >
                        {badgeText}
                      </span>
                      <strong style={{ fontSize: '18px', color: '#ffffff' }}>{course.name}{t.courseSuffix}</strong>

                      <span
                        style={{
                          background: isAroma ? 'rgba(245, 158, 11, 0.2)' : isSpecial ? 'rgba(225, 29, 72, 0.2)' : 'rgba(56, 189, 248, 0.15)',
                          border: `1px solid ${themeColor}`,
                          color: isAroma ? '#fef08a' : isSpecial ? '#fda4af' : '#bae6fd',
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '2px 7px',
                          borderRadius: '4px',
                        }}
                      >
                        {tagText}
                      </span>
                    </div>

                    <span style={{ fontSize: '13.5px', color: isAroma ? '#fef08a' : themeColor, fontWeight: 700 }}>
                      {course.subtitle}
                    </span>
                  </div>

                  {/* 코스 본문 & 특징 불릿 칩 & 3열 가격표 그리드 */}
                  <div style={{ padding: '18px 18px 22px' }}>
                    <p className="abam-course-desc" style={{ fontSize: '16.5px', color: C.textSub, margin: '0 0 14px', lineHeight: 1.75 }}>
                      {course.desc}
                    </p>

                    {/* 핵심 포인트 칩 3개 */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
                      {chips.map((chip, ci) => (
                        <span
                          key={ci}
                          className="abam-course-chip"
                          style={{
                            background: '#0d0f14',
                            border: `1px solid ${themeColor}66`,
                            color: '#e2e8f0',
                            fontSize: '13.5px',
                            fontWeight: 700,
                            padding: '6px 12px',
                            borderRadius: '5px',
                          }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    {/* 가격표 셀 (90분/120분 추천 하이라이트) */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px' }}>
                      {course.prices.map((pr, pi) => {
                        const isRecom = (isThai && pi === 1) || (isAroma && pi === 1) || (isSpecial && pi === 2);
                        return (
                          <div
                            key={pi}
                            className="abam-course-price-cell"
                            style={{
                              textAlign: 'center',
                              border: isRecom ? `1.5px solid ${themeColor}` : `1px solid ${C.line}`,
                              background: isRecom ? `${themeColor}18` : '#0e1016',
                              borderRadius: '8px',
                              padding: '14px 6px',
                              position: 'relative',
                            }}
                          >
                            {isRecom && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '-10px',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  background: themeColor,
                                  color: '#ffffff',
                                  fontSize: '11px',
                                  fontWeight: 900,
                                  padding: '2px 8px',
                                  borderRadius: '3px',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {isSpecial ? t.vipFull : t.recommend}
                              </div>
                            )}
                            <div className="abam-course-duration" style={{ fontSize: '14px', color: C.textMuted, fontWeight: 700 }}>{c.priceSection.durations[pi]}</div>
                            <div
                              className="abam-course-price-val"
                              style={{
                                fontSize: '18.5px',
                                fontWeight: 900,
                                color: isRecom ? '#ffffff' : '#f1f5f9',
                                marginTop: '4px',
                                letterSpacing: '-0.5px',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {pr}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 코스 설명 하단 화보 */}
          <div className="abam-photo-banner">
            <Image
              src="/images/abam_penthouse_night.jpg"
              alt={t.altNight}
              fill
              sizes="(max-width: 640px) 100vw, 860px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* 외국인 전용 VIP 요금 정책 안내 (다국어 페이지) */}
          {c.priceNotice && (
            <div className="abam-card" style={{ marginTop: '12px', border: `1px solid ${C.lineLight}` }}>
              <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 800, color: C.pointGold, background: 'rgba(245,158,11,0.12)', padding: '2px 6px', borderRadius: '4px', marginBottom: '8px' }}>
                {c.priceNotice.tag}
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', margin: '0 0 6px' }}>{c.priceNotice.title}</h3>
              <p style={{ fontSize: '12.5px', color: C.textSub, margin: '0 0 10px' }}>{c.priceNotice.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {c.priceNotice.reasons.map((r, ri) => (
                  <div key={ri} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#1c1f2b', padding: '9px 10px', borderRadius: '6px', borderLeft: `3px solid ${C.pointRed}` }}>
                    <span style={{ fontSize: '14px' }}>{r.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>{r.title}</div>
                      <div style={{ fontSize: '12px', color: C.textSub }}>{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── 5. 방문 확인사항 및 결제 안내 ── */}
        <section id="rules" style={section}>
          {head(t.rulesTitle, t.rulesSub)}
          
          <div className="abam-card" style={{ padding: '20px 18px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <div className="abam-rule-title" style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>{t.rules[0][0]}</div>
                <div className="abam-rule-desc" style={{ fontSize: '16px', color: C.textSub, lineHeight: 1.75 }}>{t.rules[0][1]}</div>
              </div>
              <div>
                <div className="abam-rule-title" style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>{t.rules[1][0]}</div>
                <div className="abam-rule-desc" style={{ fontSize: '16px', color: C.textSub, lineHeight: 1.75 }}>{t.rules[1][1]}</div>
              </div>
              <div>
                <div className="abam-rule-title" style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>{t.rules[2][0]}</div>
                <div className="abam-rule-desc" style={{ fontSize: '16px', color: C.textSub, lineHeight: 1.75 }}>{t.rules[2][1]}</div>
              </div>
              <div>
                <div className="abam-rule-title" style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>{t.rules[3][0]}</div>
                <div className="abam-rule-desc" style={{ fontSize: '16px', color: C.textSub, lineHeight: 1.75 }}>{t.rules[3][1]}</div>
              </div>
              <div>
                <div className="abam-rule-title" style={{ fontSize: '18px', fontWeight: 800, color: C.pointGold, marginBottom: '4px' }}>{t.rules[4][0]}</div>
                <div className="abam-rule-desc" style={{ fontSize: '16px', color: C.textSub, lineHeight: 1.75 }}>{t.rules[4][1]}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. 100% 현장 직접 대면결제 원칙 ── */}
        <section id="safety" style={section}>
          <div className="abam-card" style={{ borderLeft: `6px solid ${C.pointRed}`, textAlign: 'left', padding: '22px 20px' }}>
            <div className="abam-copperplate-en" style={{ fontSize: '20px', color: '#fef08a', letterSpacing: '0.06em', opacity: 0.92, marginBottom: '2px', lineHeight: 1.2 }}>
              100% On-Site Direct Payment Guarantee
            </div>
            <h3 className="abam-rule-title" style={{ color: '#ffffff', fontSize: '21px', fontWeight: 900, margin: '0 0 10px' }}>
              {t.safetyTitle}
            </h3>
            <div className="abam-rule-desc" style={{ fontSize: '18.5px', color: '#e2e8f0', lineHeight: 1.85, wordBreak: 'keep-all' }}>
              {t.safety1}<br />
              {t.safety2}
            </div>
          </div>
        </section>

        {/* ── 화보 2: 천연 에센셜 오일 테라피 ── */}
        <div className="abam-photo-banner">
          <Image
            src="/images/sensual_back.jpg"
            alt={t.altAroma}
            fill
            sizes="(max-width: 640px) 100vw, 860px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* ── 7. 이용 안내 ── */}
        <section id="guide" style={section}>
          {head(x.guideTitle, t.guideSub)}
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px', marginBottom: '12px' }}>
            {c.info.map((p, i) => (
              <div key={i} className="abam-card" style={{ borderLeft: `5px solid ${C.pointRed}`, padding: '16px 16px' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>{p.title}</div>
                <div style={{ fontSize: '15.5px', color: '#cbd5e1', marginTop: '6px', lineHeight: 1.5 }}>{p.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px' }}>
            {x.steps.map((s, i) => (
              <div key={i} className="abam-card" style={{ padding: '16px 8px', textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: C.pointRed, color: '#ffffff', fontWeight: 900, fontSize: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>{i + 1}</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', lineHeight: 1.4 }}>{s}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 화보 3: 프라이빗 1:1 케어 ── */}
        <div className="abam-photo-banner">
          <Image
            src="/images/sensual_touch.jpg"
            alt={t.altCare}
            fill
            sizes="(max-width: 640px) 100vw, 860px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* ── 8. 고객 후기 (11개 전체 표시) ── */}
        <section id="reviews" style={section}>
          {head(c.reviewSection.title, t.reviewsSub)}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {c.reviews.map((rev, i) => (
              <figure key={i} className="abam-card" style={{ margin: 0, padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ color: C.pointGold, fontSize: '14px', letterSpacing: '1px' }}>★★★★★</span>
                  <span style={{ fontSize: '15px', color: C.pointGold, fontWeight: 800 }}>{rev.course}</span>
                </div>
                <blockquote className="abam-review-text" style={{ margin: 0, fontSize: '16.5px', color: '#e2e8f0', lineHeight: 1.8, wordBreak: 'keep-all' }}>
                  {rev.text}
                </blockquote>
                <figcaption style={{ fontSize: '13.5px', color: C.textMuted, marginTop: '12px' }}>
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>{rev.author}</span> · {rev.area}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── 9. 자주 묻는 질문 FAQ ── */}
        <section id="faq" style={section}>
          {head(c.faqSection.title, c.faqSection.sub)}
          
          <div className="abam-card" style={{ overflow: 'hidden', padding: 0 }}>
            {c.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderTop: i ? `1px solid ${C.line}` : 'none', background: isOpen ? '#1a1d27' : 'transparent' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} aria-expanded={isOpen} style={{ width: '100%', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', gap: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span className="abam-faq-q" style={{ fontSize: '17px', fontWeight: 800, color: isOpen ? C.pointGold : '#ffffff' }}>{faq.q}</span>
                    <span style={{ fontSize: '18px', color: C.pointRed, fontWeight: 800 }}>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="abam-faq-a" style={{ margin: '0 16px 18px', padding: '16px 18px', background: '#101218', borderLeft: `4px solid ${C.pointRed}`, borderRadius: '6px', fontSize: '16px', color: C.textSub, lineHeight: 1.8, whiteSpace: 'pre-line', wordBreak: 'keep-all' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 10. SEO 본문 안내 ── */}
        <section id="about" style={{ marginTop: '38px', paddingTop: '22px', borderTop: `1px solid ${C.line}`, paddingLeft: '16px', paddingRight: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: '0 0 10px' }}>{c.about.title}</h2>
          <div style={{ fontSize: '14.5px', color: C.textMuted, lineHeight: 1.8, wordBreak: 'keep-all' }}>
            <p style={{ margin: '0 0 10px' }}>{c.about.p1}</p>
            <p style={{ margin: 0 }}>
              {c.about.p2}
              {isKo && (
                <>
                  {' '}지역별 안내는 <Link href="/keywords" style={{ color: '#ffffff', fontWeight: 700, textDecoration: 'underline' }}>서울·경기 지역별 안내</Link>에서, 이용 방법은 <Link href="/guide" style={{ color: '#ffffff', fontWeight: 700, textDecoration: 'underline' }}>이용 가이드</Link>에서 확인하실 수 있습니다.
                </>
              )}
            </p>
          </div>
        </section>

        {/* ── 11. 푸터 & 지역 네트워크 링크 ── */}
        <footer style={{ marginTop: '30px', paddingTop: '22px', borderTop: `1px solid ${C.line}`, paddingBottom: '28px', paddingLeft: '16px', paddingRight: '16px' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>{c.footer.title}</div>
          <p style={{ fontSize: '13.5px', color: C.textMuted, lineHeight: 1.65, margin: '0 0 14px', wordBreak: 'keep-all' }}>{c.footer.sub}</p>
          {areaLinks && areaLinks.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px 10px', fontSize: '12.5px', marginBottom: '16px' }}>
              {areaLinks.slice(0, 80).map((area, i) => (
                <Link key={i} href={`/seo/${encodeURIComponent(area)}`} style={{ textDecoration: 'none', color: i < 5 ? '#f59e0b' : '#94a3b8', fontWeight: i < 5 ? 700 : 400 }}>{area}</Link>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 14px', fontSize: '13px', margin: '14px 0', padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Link href="/keywords" style={{ color: '#fef08a', textDecoration: 'none', fontWeight: 700 }}>전체 570+ 지역 디렉터리 →</Link>
            <Link href="/guide/chuljang-massage-price" style={{ color: '#cbd5e1', textDecoration: 'none' }}>출장마사지 정찰 가격표</Link>
            <Link href="/guide/outcall-massage-scam-prevention-comparison" style={{ color: '#cbd5e1', textDecoration: 'none' }}>선입금 사기 예방 가이드</Link>
            <Link href="/guide/outcall-massage-platform-ranking-comparison" style={{ color: '#cbd5e1', textDecoration: 'none' }}>플랫폼 순위 및 비교</Link>
            <Link href="/guide/late-night-massage" style={{ color: '#cbd5e1', textDecoration: 'none' }}>심야 방문 케어 안내</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', margin: '14px 0 10px', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>Language:</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {LANGS.map((l) => (
                <Link
                  key={l.code}
                  href={l.href}
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    color: l.code === c.lang ? '#1a1204' : '#cbd5e1',
                    background: l.code === c.lang ? '#f59e0b' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${l.code === c.lang ? '#f59e0b' : 'rgba(255,255,255,0.1)'}`,
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.65 }}>{c.footer.line}</div>
        </footer>

      </main>

      {/* ── 12. 하단 고정 퀵바 (큼직한 대형 통화/문자 버튼 · 압도적 터치감과 가독성) ── */}
      <div className="abam-bottom-bar">
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
          {isKo ? (
            <a
              href={SMS_HREF} className="abam-bottom-btn"
              style={{
                ...btn,
                background: 'linear-gradient(180deg, #2b3245, #1e2333)',
                border: '1.5px solid #475569',
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: 900,
                padding: '18px 0',
                borderRadius: '8px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
              }}
            >
              <SmsIcon size={23} /> {t.smsBar}
            </a>
          ) : (
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer" className="abam-bottom-btn"
              style={{
                ...btn,
                background: '#25D366',
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: 900,
                padding: '18px 0',
                borderRadius: '8px',
              }}
            >
              {c.cta.whatsapp}
            </a>
          )}
          <a
            href={c.contact.tel} className="abam-bottom-btn"
            style={{
              ...btn,
              background: 'linear-gradient(180deg, #f43f5e, #be123c)',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 900,
              padding: '18px 0',
              borderRadius: '8px',
              boxShadow: '0 4px 18px rgba(225,29,72,0.45)',
            }}
          >
            <PhoneIcon size={23} /> {t.callBar}
          </a>
        </div>
      </div>

    </div>
  );
}
