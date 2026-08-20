import Image from 'next/image';
import { ImageResponse } from 'next/og';
import { topBanners, priorityJobs, recommendedJobs, generalJobs } from '../../../../lib/mockData';
import { vvipBanner, grandVipBanners, premiumBanners, lineAdsData } from '../../../../lib/mockAds';
import scrapedJobs from '../../../../lib/scraped_jobs.json';
import fs from 'fs';
import path from 'path';

// 8 Theme Sets Configuration for detailed flyer images
interface ThemeSet {
  themeName: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  headerBg: string;
  headerTextColor: string;
  headerBorderBottom: string;
  
  // Title Card
  titleCardBg: string;
  titleCardBorder: string;
  companyNameColor: string;
  titleColor: string;
  metaLabelColor: string;
  metaValColor: string;
  
  // Section Headers
  sectionHeaderColor: string;
  sectionHeaderBorderLeft: string;
  
  // Detailed Intro Box
  introBoxBg: string;
  introBoxBorder: string;
  introBoxTextColor: string;
  
  // PR Highlights Box
  prBoxBg: string;
  prBoxBorder: string;
  prBoxTitleColor: string;
  prBoxValColor: string;
  
  // FAQ Box
  faqItemBg: string;
  faqItemBorder: string;
  faqQuestionColor: string;
  faqAnswerColor: string;
  
  // Highlight Sentence Box
  highlightBoxBg: string;
  highlightBoxBorder: string;
  highlightTitleColor: string;
  highlightTextColor: string;
  
  // Contact Box
  contactBoxBg: string;
  contactBoxBorder: string;
  contactBoxTitleColor: string;
  contactFieldLabelColor: string;
  contactFieldValueColor: string;
  
  // Footer
  footerBg: string;
  footerBorderTop: string;
  footerTitleColor: string;
  footerTextColor: string;
  
  watermarkColor: string;
}

const THEME_SETS: ThemeSet[] = [
  {
    themeName: 'Luxury Red Ribbon',
    bgGradient: 'linear-gradient(180deg, #fdfbf7 0%, #faf7f0 50%, #f5eedc 100%)',
    borderColor: '#be123c',
    textColor: '#0f172a',
    headerBg: '#ffffff',
    headerTextColor: '#be123c',
    headerBorderBottom: '2px solid #e11d48',
    titleCardBg: 'rgba(244, 63, 94, 0.04)',
    titleCardBorder: '1.5px solid rgba(225, 29, 72, 0.15)',
    companyNameColor: '#be123c',
    titleColor: '#0f172a',
    metaLabelColor: '#be123c',
    metaValColor: '#0f172a',
    sectionHeaderColor: '#be123c',
    sectionHeaderBorderLeft: '3px solid #e11d48',
    introBoxBg: '#ffffff',
    introBoxBorder: '1px solid #e5e7eb',
    introBoxTextColor: '#0f172a',
    prBoxBg: 'rgba(109, 40, 217, 0.04)',
    prBoxBorder: '1.5px solid rgba(109, 40, 217, 0.15)',
    prBoxTitleColor: '#6d28d9',
    prBoxValColor: '#0f172a',
    faqItemBg: 'rgba(244, 63, 94, 0.02)',
    faqItemBorder: '1px solid #f3f4f6',
    faqQuestionColor: '#be123c',
    faqAnswerColor: '#0f172a',
    highlightBoxBg: 'rgba(244, 63, 94, 0.05)',
    highlightBoxBorder: '1.5px dashed #f43f5e',
    highlightTitleColor: '#e11d48',
    highlightTextColor: '#be123c',
    contactBoxBg: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
    contactBoxBorder: '2px solid #fda4af',
    contactBoxTitleColor: '#be123c',
    contactFieldLabelColor: '#e11d48',
    contactFieldValueColor: '#0f172a',
    footerBg: '#fafafa',
    footerBorderTop: '2px solid #e5e7eb',
    footerTitleColor: '#9f1239',
    footerTextColor: '#4b5563',
    watermarkColor: '#f43f5e',
  },
  {
    themeName: 'Luxury Gold & Cream',
    bgGradient: 'linear-gradient(180deg, #fdfbf7 0%, #fffbeb 50%, #fef3c7 100%)',
    borderColor: '#d97706',
    textColor: '#0f172a',
    headerBg: '#ffffff',
    headerTextColor: '#d97706',
    headerBorderBottom: '2px solid #fbbf24',
    titleCardBg: 'rgba(251, 191, 36, 0.05)',
    titleCardBorder: '1.5px solid rgba(217, 119, 6, 0.2)',
    companyNameColor: '#b45309',
    titleColor: '#0f172a',
    metaLabelColor: '#b45309',
    metaValColor: '#0f172a',
    sectionHeaderColor: '#b45309',
    sectionHeaderBorderLeft: '3px solid #d97706',
    introBoxBg: '#ffffff',
    introBoxBorder: '1px solid #fef3c7',
    introBoxTextColor: '#0f172a',
    prBoxBg: 'rgba(234, 179, 8, 0.03)',
    prBoxBorder: '1.5px solid rgba(234, 179, 8, 0.15)',
    prBoxTitleColor: '#b45309',
    prBoxValColor: '#0f172a',
    faqItemBg: 'rgba(254, 243, 199, 0.3)',
    faqItemBorder: '1px solid #fef3c7',
    faqQuestionColor: '#b45309',
    faqAnswerColor: '#0f172a',
    highlightBoxBg: 'rgba(217, 119, 6, 0.05)',
    highlightBoxBorder: '1.5px dashed #d97706',
    highlightTitleColor: '#b45309',
    highlightTextColor: '#78350f',
    contactBoxBg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    contactBoxBorder: '2px solid #fbbf24',
    contactBoxTitleColor: '#b45309',
    contactFieldLabelColor: '#d97706',
    contactFieldValueColor: '#0f172a',
    footerBg: '#fafaf9',
    footerBorderTop: '2px solid #f5f5f4',
    footerTitleColor: '#b45309',
    footerTextColor: '#4b5563',
    watermarkColor: '#fbbf24',
  },
  {
    themeName: 'Pastel Love Heart',
    bgGradient: 'linear-gradient(180deg, #fff5f5 0%, #fff0f6 50%, #f3e8ff 100%)',
    borderColor: '#ec4899',
    textColor: '#0f172a',
    headerBg: '#ffffff',
    headerTextColor: '#db2777',
    headerBorderBottom: '2px solid #f472b6',
    titleCardBg: 'rgba(236, 72, 153, 0.03)',
    titleCardBorder: '1.5px solid rgba(244, 114, 182, 0.2)',
    companyNameColor: '#db2777',
    titleColor: '#0f172a',
    metaLabelColor: '#db2777',
    metaValColor: '#0f172a',
    sectionHeaderColor: '#db2777',
    sectionHeaderBorderLeft: '3px solid #ec4899',
    introBoxBg: '#ffffff',
    introBoxBorder: '1px solid #fae8ff',
    introBoxTextColor: '#0f172a',
    prBoxBg: 'rgba(168, 85, 247, 0.03)',
    prBoxBorder: '1.5px solid rgba(168, 85, 247, 0.15)',
    prBoxTitleColor: '#a855f7',
    prBoxValColor: '#0f172a',
    faqItemBg: 'rgba(253, 242, 248, 0.7)',
    faqItemBorder: '1px solid #fce7f3',
    faqQuestionColor: '#ec4899',
    faqAnswerColor: '#0f172a',
    highlightBoxBg: 'rgba(236, 72, 153, 0.05)',
    highlightBoxBorder: '1.5px dashed #f472b6',
    highlightTitleColor: '#db2777',
    highlightTextColor: '#ec4899',
    contactBoxBg: 'linear-gradient(135deg, #fff0f6 0%, #fae8ff 100%)',
    contactBoxBorder: '2px solid #f472b6',
    contactBoxTitleColor: '#db2777',
    contactFieldLabelColor: '#ec4899',
    contactFieldValueColor: '#0f172a',
    footerBg: '#fff5f5',
    footerBorderTop: '2px solid #fce7f3',
    footerTitleColor: '#db2777',
    footerTextColor: '#4b5563',
    watermarkColor: '#f472b6',
  },
  {
    themeName: 'Soft Lavender & Violet',
    bgGradient: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)',
    borderColor: '#9333ea',
    textColor: '#0f172a',
    headerBg: '#ffffff',
    headerTextColor: '#9333ea',
    headerBorderBottom: '2px solid #a855f7',
    titleCardBg: 'rgba(147, 51, 234, 0.03)',
    titleCardBorder: '1.5px solid rgba(147, 51, 234, 0.2)',
    companyNameColor: '#7e22ce',
    titleColor: '#0f172a',
    metaLabelColor: '#7e22ce',
    metaValColor: '#0f172a',
    sectionHeaderColor: '#7e22ce',
    sectionHeaderBorderLeft: '3px solid #9333ea',
    introBoxBg: '#ffffff',
    introBoxBorder: '1px solid #f3e8ff',
    introBoxTextColor: '#0f172a',
    prBoxBg: 'rgba(168, 85, 247, 0.03)',
    prBoxBorder: '1.5px solid rgba(168, 85, 247, 0.15)',
    prBoxTitleColor: '#7e22ce',
    prBoxValColor: '#0f172a',
    faqItemBg: 'rgba(250, 245, 255, 0.8)',
    faqItemBorder: '1px solid #e9d5ff',
    faqQuestionColor: '#9333ea',
    faqAnswerColor: '#0f172a',
    highlightBoxBg: 'rgba(147, 51, 234, 0.05)',
    highlightBoxBorder: '1.5px dashed #a855f7',
    highlightTitleColor: '#7e22ce',
    highlightTextColor: '#581c87',
    contactBoxBg: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    contactBoxBorder: '2px solid #c084fc',
    contactBoxTitleColor: '#7e22ce',
    contactFieldLabelColor: '#9333ea',
    contactFieldValueColor: '#0f172a',
    footerBg: '#fafafa',
    footerBorderTop: '2px solid #e4e4e7',
    footerTitleColor: '#7e22ce',
    footerTextColor: '#4b5563',
    watermarkColor: '#c084fc',
  },
  {
    themeName: 'Ocean Mint Blue',
    bgGradient: 'linear-gradient(180deg, #f0fdf4 0%, #ecfeff 50%, #e0f2fe 100%)',
    borderColor: '#0d9488',
    textColor: '#0f172a',
    headerBg: '#ffffff',
    headerTextColor: '#0d9488',
    headerBorderBottom: '2px solid #0d9488',
    titleCardBg: 'rgba(13, 148, 136, 0.03)',
    titleCardBorder: '1.5px solid rgba(13, 148, 136, 0.2)',
    companyNameColor: '#0d9488',
    titleColor: '#1e293b',
    metaLabelColor: '#0d9488',
    metaValColor: '#0f172a',
    sectionHeaderColor: '#0d9488',
    sectionHeaderBorderLeft: '3px solid #0d9488',
    introBoxBg: '#ffffff',
    introBoxBorder: '1px solid #ccfbf1',
    introBoxTextColor: '#334155',
    prBoxBg: 'rgba(2, 132, 199, 0.03)',
    prBoxBorder: '1.5px solid rgba(2, 132, 199, 0.15)',
    prBoxTitleColor: '#0284c7',
    prBoxValColor: '#334155',
    faqItemBg: 'rgba(240, 253, 250, 0.7)',
    faqItemBorder: '1px solid #e2e8f0',
    faqQuestionColor: '#0d9488',
    faqAnswerColor: '#334155',
    highlightBoxBg: 'rgba(13, 148, 136, 0.05)',
    highlightBoxBorder: '1.5px dashed #0d9488',
    highlightTitleColor: '#0d9488',
    highlightTextColor: '#115e59',
    contactBoxBg: 'linear-gradient(135deg, #e6fffa 0%, #e0f7fa 100%)',
    contactBoxBorder: '2px solid #4fd1c5',
    contactBoxTitleColor: '#0d9488',
    contactFieldLabelColor: '#0d9488',
    contactFieldValueColor: '#1e293b',
    footerBg: '#f0fdf4',
    footerBorderTop: '2px solid #ccfbf1',
    footerTitleColor: '#0f766e',
    footerTextColor: '#64748b',
    watermarkColor: '#0d9488',
  },
  {
    themeName: 'Sweet Lavender Galaxy',
    bgGradient: 'linear-gradient(180deg, #faf5ff 0%, #fae8ff 50%, #fdf2f8 100%)',
    borderColor: '#d8b4fe',
    textColor: '#581c87',
    headerBg: '#ffffff',
    headerTextColor: '#a855f7',
    headerBorderBottom: '2px solid #e9d5ff',
    titleCardBg: 'rgba(168, 85, 247, 0.03)',
    titleCardBorder: '1.5px solid rgba(168, 85, 247, 0.15)',
    companyNameColor: '#9333ea',
    titleColor: '#581c87',
    metaLabelColor: '#9333ea',
    metaValColor: '#3b0764',
    sectionHeaderColor: '#9333ea',
    sectionHeaderBorderLeft: '3px solid #c084fc',
    introBoxBg: '#ffffff',
    introBoxBorder: '1px solid #f3e8ff',
    introBoxTextColor: '#3b0764',
    prBoxBg: 'rgba(236, 72, 153, 0.02)',
    prBoxBorder: '1.5px solid rgba(236, 72, 153, 0.1)',
    prBoxTitleColor: '#db2777',
    prBoxValColor: '#3b0764',
    faqItemBg: 'rgba(250, 245, 255, 0.8)',
    faqItemBorder: '1px solid #f3e8ff',
    faqQuestionColor: '#9333ea',
    faqAnswerColor: '#3b0764',
    highlightBoxBg: 'rgba(168, 85, 247, 0.04)',
    highlightBoxBorder: '1.5px dashed #c084fc',
    highlightTitleColor: '#9333ea',
    highlightTextColor: '#7e22ce',
    contactBoxBg: 'linear-gradient(135deg, #faf5ff 0%, #fae8ff 100%)',
    contactBoxBorder: '2px solid #d8b4fe',
    contactBoxTitleColor: '#7e22ce',
    contactFieldLabelColor: '#9333ea',
    contactFieldValueColor: '#3b0764',
    footerBg: '#faf5ff',
    footerBorderTop: '2px solid #f3e8ff',
    footerTitleColor: '#7e22ce',
    footerTextColor: '#6b21a8',
    watermarkColor: '#d8b4fe',
  },
  {
    themeName: 'Sweet Yellow Candy',
    bgGradient: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 50%, #ffedd5 100%)',
    borderColor: '#d97706',
    textColor: '#374151',
    headerBg: '#ffffff',
    headerTextColor: '#d97706',
    headerBorderBottom: '2px solid #fbbf24',
    titleCardBg: 'rgba(251, 191, 36, 0.04)',
    titleCardBorder: '1.5px solid rgba(251, 191, 36, 0.2)',
    companyNameColor: '#d97706',
    titleColor: '#4b5563',
    metaLabelColor: '#d97706',
    metaValColor: '#1f2937',
    sectionHeaderColor: '#d97706',
    sectionHeaderBorderLeft: '3px solid #f59e0b',
    introBoxBg: '#ffffff',
    introBoxBorder: '1px solid #fde68a',
    introBoxTextColor: '#4b5563',
    prBoxBg: 'rgba(249, 115, 22, 0.03)',
    prBoxBorder: '1.5px solid rgba(249, 115, 22, 0.15)',
    prBoxTitleColor: '#f97316',
    prBoxValColor: '#4b5563',
    faqItemBg: 'rgba(254, 243, 199, 0.7)',
    faqItemBorder: '1px solid #fde68a',
    faqQuestionColor: '#d97706',
    faqAnswerColor: '#4b5563',
    highlightBoxBg: 'rgba(251, 191, 36, 0.06)',
    highlightBoxBorder: '1.5px dashed #f59e0b',
    highlightTitleColor: '#d97706',
    highlightTextColor: '#b45309',
    contactBoxBg: 'linear-gradient(135deg, #fffbeb 0%, #ffedd5 100%)',
    contactBoxBorder: '2px solid #f59e0b',
    contactBoxTitleColor: '#d97706',
    contactFieldLabelColor: '#f97316',
    contactFieldValueColor: '#1f2937',
    footerBg: '#fffbeb',
    footerBorderTop: '2px solid #fde68a',
    footerTitleColor: '#b45309',
    footerTextColor: '#9ca3af',
    watermarkColor: '#f59e0b',
  },
  {
    themeName: 'Soft Holographic',
    bgGradient: 'linear-gradient(180deg, #fafafa 0%, #f5f3ff 50%, #ede9fe 100%)',
    borderColor: '#7c3aed',
    textColor: '#1e1b4b',
    headerBg: '#ffffff',
    headerTextColor: '#7c3aed',
    headerBorderBottom: '2px solid #a78bfa',
    titleCardBg: 'rgba(124, 58, 237, 0.03)',
    titleCardBorder: '1.5px solid rgba(124, 58, 237, 0.2)',
    companyNameColor: '#7c3aed',
    titleColor: '#1e1b4b',
    metaLabelColor: '#7c3aed',
    metaValColor: '#1e1b4b',
    sectionHeaderColor: '#7c3aed',
    sectionHeaderBorderLeft: '3px solid #7c3aed',
    introBoxBg: '#ffffff',
    introBoxBorder: '1px solid #ddd6fe',
    introBoxTextColor: '#3730a3',
    prBoxBg: 'rgba(219, 39, 119, 0.03)',
    prBoxBorder: '1.5px solid rgba(219, 39, 119, 0.15)',
    prBoxTitleColor: '#db2777',
    prBoxValColor: '#3730a3',
    faqItemBg: 'rgba(245, 243, 255, 0.7)',
    faqItemBorder: '1px solid #e4e4e7',
    faqQuestionColor: '#7c3aed',
    faqAnswerColor: '#3730a3',
    highlightBoxBg: 'rgba(124, 58, 237, 0.05)',
    highlightBoxBorder: '1.5px dashed #7c3aed',
    highlightTitleColor: '#7c3aed',
    highlightTextColor: '#4c1d95',
    contactBoxBg: 'linear-gradient(135deg, #f5f3ff 0%, #e0e7ff 100%)',
    contactBoxBorder: '2px solid #a78bfa',
    contactBoxTitleColor: '#7c3aed',
    contactFieldLabelColor: '#7c3aed',
    contactFieldValueColor: '#1e1b4b',
    footerBg: '#fafafa',
    footerBorderTop: '2px solid #e4e4e7',
    footerTitleColor: '#5b21b6',
    footerTextColor: '#71717a',
    watermarkColor: '#a78bfa',
  }
];

const allJobsRaw = [
  ...topBanners,
  ...priorityJobs,
  ...recommendedJobs,
  ...generalJobs,
  vvipBanner,
  ...grandVipBanners,
  ...premiumBanners,
  ...lineAdsData,
  ...scrapedJobs
];

// Helper function to auto-highlight key selling points (pay, benefits, accommodation) inside description
function renderHighlightedText(text: string, textColor: string, highlightColor: string) {
  const highlightRegex = /(TC\s*\d+만[+@]*|\d+만[+@]*|\d+만원|당일\s*정산|당일\s*지급|당일\s*100%|만근\s*보너스|인센티브|출퇴근\s*차량|차량\s*지원|숙소\s*지원|숙식\s*제공|1인\s*1실|자율\s*출퇴근|초보[자]*\s*대환영|초보\s*대환영|초보[자]*\s*환영|무조건\s*합격|고수익|자유\s*복장|강요하지\s*않으니|안심보증|안심번호)/i;
  
  const parts = text.split(highlightRegex);
  
  return parts.map((part, idx) => {
    if (!part) return null;
    const isMatch = idx % 2 === 1;
    return (
      <span
        key={idx}
        style={{
          color: isMatch ? highlightColor : textColor,
          fontWeight: isMatch ? 900 : 700,
        }}
      >
        {part}
      </span>
    );
  });
}

// Helper function to split text by commas and periods with a minimum character threshold to ensure clean sentence formatting
function splitTextByPunctuation(text: string, minLength: number = 20): string[] {
  const segments: string[] = [];
  let currentSegment = "";
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    currentSegment += char;
    
    if (char === ',' || char === '.') {
      if (currentSegment.length >= minLength) {
        const nextChar = text[i + 1];
        if (!nextChar || nextChar === ' ' || nextChar === '\n') {
          segments.push(currentSegment.trim());
          currentSegment = "";
          if (nextChar === ' ') {
            i++;
          }
        }
      }
    }
  }
  
  if (currentSegment.trim()) {
    segments.push(currentSegment.trim());
  }
  
  return segments;
}

// Helper function to render theme-based SVG decorations natively
function renderDecorationSvg(type: string, size: number, color: string) {
  switch (type) {
    case 'ribbon':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
        </svg>
      );
    case 'maple':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M12 2s-1 3-3 4c-2 1-5-1-6 1s3 3 2 5c-1 2-4 1-3 3s4 0 5 2c1 2-2 3-1 5s3-2 5-1c2 1 1 4 3 4s1-3 3-4c2-1 4 3 5 1s-2-3-1-5c1-2 4 0 5-2s-2-1-3-3c-1-2 3-4 2-5s-4 0-6-1c-2-1-3-4-3-4z" />
        </svg>
      );
    case 'heart':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    case 'star':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    case 'clover':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M12 2c-1.1 0-2 .9-2 2 .5 1.5 1.5 2 2 2.5.5-.5 1.5-1 2-2.5 0-1.1-.9-2-2-2zm-6 8c-1.1 0-2 .9-2 2 .5 1.5 1.5 2 2 2.5.5-.5 1.5-1 2-2.5 0-1.1-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2 .5 1.5 1.5 2 2 2.5.5-.5 1.5-1 2-2.5 0-1.1-.9-2-2-2zm-6 6c-1.1 0-2 .9-2 2 .5 1.5 1.5 2 2 2.5.5-.5 1.5-1 2-2.5 0-1.1-.9-2-2-2zm0-7c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1z" />
        </svg>
      );
    case 'candy':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.12 0 2.05-.74 2.37-1.75C17.72 6.9 20 10.18 20 14c0 1.28-.27 2.48-.73 3.59-.1-.13-.23-.25-.37-.36z" />
        </svg>
      );
    case 'fruit':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M12 2c-1.1 0-2 .9-2 2v2.09C6.42 6.64 4 9.53 4 13c0 4.41 3.59 8 8 8s8-3.59 8-8c0-3.47-2.42-6.36-6-6.91V4c0-1.1-.9-2-2-2zm3.5 11c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-7 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3.5 4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
      );
    case 'sakura':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'flex' }}>
          <path d="M12 21.5c-4.5-3.5-7.5-7.5-7.5-11.5s3.5-6.5 7.5-6.5 7.5 2.5 7.5 6.5-3 8-7.5 11.5z" />
        </svg>
      );
    default:
      return null;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  const { searchParams } = new URL(request.url);
  const isPreviewParam = searchParams.get('preview') === 'true';

  // Load background images for B approach templates
  let logoBase64 = '';
  let navyGoldTopBase64 = '';
  let navyGoldBottomBase64 = '';
  let autumnMapleTopBase64 = '';
  let autumnMapleBottomBase64 = '';
  let pastelSakuraTopBase64 = '';
  let pastelSakuraBottomBase64 = '';

  try {
    const logoPath = path.join(process.cwd(), 'public/images/logo.png');
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
    }
    const navyTopPath = path.join(process.cwd(), 'public/images/templates/navy_gold_top.jpg');
    if (fs.existsSync(navyTopPath)) {
      const topBuffer = fs.readFileSync(navyTopPath);
      navyGoldTopBase64 = `data:image/jpeg;base64,${topBuffer.toString('base64')}`;
    }

    const navyBottomPath = path.join(process.cwd(), 'public/images/templates/navy_gold_bottom.jpg');
    if (fs.existsSync(navyBottomPath)) {
      const bottomBuffer = fs.readFileSync(navyBottomPath);
      navyGoldBottomBase64 = `data:image/jpeg;base64,${bottomBuffer.toString('base64')}`;
    }

    const mapleTopPath = path.join(process.cwd(), 'public/images/templates/autumn_maple_top.jpg');
    if (fs.existsSync(mapleTopPath)) {
      const topBuffer = fs.readFileSync(mapleTopPath);
      autumnMapleTopBase64 = `data:image/jpeg;base64,${topBuffer.toString('base64')}`;
    }

    const mapleBottomPath = path.join(process.cwd(), 'public/images/templates/autumn_maple_bottom.jpg');
    if (fs.existsSync(mapleBottomPath)) {
      const bottomBuffer = fs.readFileSync(mapleBottomPath);
      autumnMapleBottomBase64 = `data:image/jpeg;base64,${bottomBuffer.toString('base64')}`;
    }

    const sakuraTopPath = path.join(process.cwd(), 'public/images/templates/pastel_sakura_top.jpg');
    if (fs.existsSync(sakuraTopPath)) {
      const topBuffer = fs.readFileSync(sakuraTopPath);
      pastelSakuraTopBase64 = `data:image/jpeg;base64,${topBuffer.toString('base64')}`;
    }

    const sakuraBottomPath = path.join(process.cwd(), 'public/images/templates/pastel_sakura_bottom.jpg');
    if (fs.existsSync(sakuraBottomPath)) {
      const bottomBuffer = fs.readFileSync(sakuraBottomPath);
      pastelSakuraBottomBase64 = `data:image/jpeg;base64,${bottomBuffer.toString('base64')}`;
    }
  } catch (e) {
    console.error('Failed to load background template images', e);
  }

  // 1. Find job details
  const globalRef = global as any;
  const dynamicJobs = globalRef.dynamicJobs || new Map();
  const serverJob = dynamicJobs.get(jobId);

  const job = serverJob || allJobsRaw.find((j) => String(j.id) === jobId) as any;

  // 2. Enforce payment gating logic
  const isDynamic = String(jobId).startsWith('dynamic-');
  const isPaid = isDynamic ? (job?.payment_status === 'paid') : true;

  if (isDynamic && !isPaid && !isPreviewParam) {
    return new Response('Forbidden: Payment required to access high-res final image.', { status: 403 });
  }

  // 3. Extract fields (Use Refined Text if available, fallback to searchParams/job details)
  const source = job?.ai_refined_text || job;

  const companyName = searchParams.get('companyName') || source?.companyName || '아름다운밤';
  const title = searchParams.get('title') || source?.title || `${companyName}에서 함께하실 인재 대모집`;
  const location = searchParams.get('location') || source?.location || '서울 강남구';
  const pay = searchParams.get('pay') || source?.pay || '시급 협의';
  const workHours = searchParams.get('workHours') || source?.workHours || '협의 (자율출퇴근)';
  const requirements = searchParams.get('requirements') || source?.requirements || '만 20세 이상 성인 여성';
  const highlightSentence = source?.highlightSentence || '';
  const hideCard = searchParams.get('hideCard') === 'true';
  
  const welfare = source?.welfare || '';
  const atmosphere = source?.atmosphere || '';
  const prMessage = source?.prMessage || '';

  // 4. Contact Information
  const contactPhone = source?.contactPhone || '010-XXXX-XXXX';
  const contactKakao = source?.contactKakao || 'abam1004';
  const telegram = source?.telegram || '';
  const line = source?.line || '';

  // Select theme based on jobId hash or searchParam themeIndex override
  const hash = Array.from(jobId).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const themeQuery = searchParams.get('themeIndex');
  const themeIndex = themeQuery !== null ? parseInt(themeQuery) : (Math.abs(hash) % THEME_SETS.length);
  const theme = THEME_SETS[themeIndex] || THEME_SETS[0];
  const neonColor = theme.companyNameColor.toLowerCase().includes('rose') || 
                    theme.companyNameColor.toLowerCase().includes('red') || 
                    theme.companyNameColor === '#be123c' || 
                    theme.companyNameColor === '#db2777'
                    ? '#ff007f' 
                    : (theme.companyNameColor === '#0284c7' || theme.companyNameColor === '#2563eb' ? '#00f0ff' : '#ffaa00');
  const glassBg = theme.textColor === '#f8fafc' ? 'rgba(15, 23, 42, 0.88)' : 'rgba(255, 255, 255, 0.88)';

  // Define template background motif types for 8 unique user-selectable styles
  type TemplateType = 'ribbon' | 'maple' | 'heart' | 'star' | 'clover' | 'candy' | 'fruit' | 'sakura';
  
  let currentTemplateType: TemplateType = 'maple';
  switch (themeIndex) {
    case 0:
      currentTemplateType = 'ribbon';
      break;
    case 1:
      currentTemplateType = 'maple';
      break;
    case 2:
      currentTemplateType = 'heart';
      break;
    case 3:
      currentTemplateType = 'star';
      break;
    case 4:
      currentTemplateType = 'clover';
      break;
    case 5:
      currentTemplateType = 'candy';
      break;
    case 6:
      currentTemplateType = 'fruit';
      break;
    case 7:
      currentTemplateType = 'sakura';
      break;
  }

  let containerBg = '#faf7f0';
  if (currentTemplateType === 'sakura' || currentTemplateType === 'heart') {
    containerBg = '#fdf2f8';
  } else if (currentTemplateType === 'clover') {
    containerBg = '#f0fdf4';
  } else if (currentTemplateType === 'star' || currentTemplateType === 'candy') {
    containerBg = '#faf5ff';
  }

  // 5. Description mapping & Sanitation
  let rawDesc = source?.description || '';
  if (!rawDesc || rawDesc.trim().length === 0) {
    rawDesc = `${companyName}은(는) 안전이 검증된 여성 고소득알바 추천 업소입니다. 최고의 시설 and 쾌적한 환경, 그리고 철저한 익명성을 보장합니다. 당일 지급을 기본으로 하며 출퇴근 시간을 자유롭게 조율하실 수 있는 자율근무 시스템을 운영하고 있습니다.`;
  }

  // Replace placeholder contacts in rawDesc with actual database values
  if (contactPhone && contactPhone !== '010-XXXX-XXXX') {
    rawDesc = rawDesc.replace(/☎\s*연락처:\s*[^\n]*/gi, `☎ 연락처: ${contactPhone}`);
  }
  if (contactKakao && contactKakao !== 'abam1004') {
    rawDesc = rawDesc.replace(/💬\s*카카오톡\s*ID:\s*[^\n]*/gi, `💬 카카오톡 ID: ${contactKakao}`);
  }
  if (telegram) {
    rawDesc = rawDesc.replace(/💬\s*텔레그램\s*ID:\s*[^\n]*/gi, `💬 텔레그램 ID: ${telegram}`);
  } else {
    rawDesc = rawDesc.replace(/💬\s*텔레그램\s*ID:\s*[^\n]*\n?/gi, '');
  }

  const description = rawDesc.length > 800 ? rawDesc.slice(0, 800) + '...' : rawDesc;
  const descParagraphs = description
    .split('\n')
    .map((p: string) => p.trim())
    .filter((p: string) => p.length > 0);

  // 8. Dynamic Q&A List mapping (Use raw/polished Q&A if available, fallback to defaults)
  const defaultQnas = [
    {
      question: 'Q. 급여 지급 방식 및 보너스 혜택이 어떻게 되나요?',
      answer: 'A. 100% 퇴근 시 당일 계좌이체 및 현금 지급을 원칙으로 하며, 성실히 출근해 주시는 분들을 위한 다양한 만근 보너스 혜택을 제공합니다.',
    },
    {
      question: 'Q. 근무 일정 및 시간 조율이 자유로운가요?',
      answer: 'A. 네, 전적으로 구직자님의 일정을 존중합니다. 주 1회 아르바이트, 주말 고정, 자율출퇴근 등 원하시는 시간대를 매칭해 드립니다.',
    },
    {
      question: 'Q. 초보자나 대학생도 쉽게 배울 수 있나요?',
      answer: 'A. 네! 근무자의 90% 이상이 초보자로 첫날 바로 배우고 완벽하게 적응하셨습니다. 1대1로 친절하고 든든하게 교육해 드립니다.',
    },
    {
      question: 'Q. 개인정보 보안 및 익명 보장이 철저한가요?',
      answer: 'A. 당연합니다. 일체의 개인정보가 외부로 유출되지 않도록 가명 근무를 철저히 보장하고 안심번호 시스템을 운영합니다.',
    },
  ];

  const rawQnas = source?.qna && source.qna.length > 0 ? source.qna : defaultQnas;

  // Height pre-calculation
  const baseHeight = 750; // Optimized base height to remove empty space at bottom
  const introTextHeight = descParagraphs.length * 45 + Math.ceil(description.length / 18) * 45;
  const highlightHeight = highlightSentence ? 150 : 0;
  
  const welfareLines = Math.ceil((welfare || '').length / 22) || 1;
  const atmosphereLines = Math.ceil((atmosphere || '').length / 22) || 1;
  const prMessageLines = Math.ceil((prMessage || '').length / 22) || 1;
  const prCardHeight = 120 + (welfareLines + atmosphereLines + prMessageLines) * 32;

  const estimatedFullHeight = baseHeight + introTextHeight + (rawQnas.length * 165) + highlightHeight + prCardHeight;

  // Dynamic Truncating logic
  let displayQnas = [...rawQnas];
  let showFaqTruncatedMessage = false;

  // Safety threshold below 4000px limit
  if (estimatedFullHeight > 3800) {
    displayQnas = rawQnas.slice(0, 2);
    showFaqTruncatedMessage = true;
  }

  const faqHeight = displayQnas.length * 165 + (showFaqTruncatedMessage ? 80 : 0);
  const calculatedHeight = baseHeight + introTextHeight + faqHeight + highlightHeight + prCardHeight;
  const imageHeight = Math.min(4000, Math.max(900, calculatedHeight));

  // 6. Build Watermarks (using crescent moon tile) - Spaced out for larger font (2 per row, only in description body area)
  const watermarkOpacity = 0.20; // Increased opacity for bold brand visibility
  const watermarks: { top: number; left: number }[] = [];
  const rows = Math.ceil(imageHeight / 240);
  const cols = 2;
  for (let r = 0; r < rows; r++) {
    const top = r * 240 + 120;
    // Only place watermarks in the body area (between 420px and calculated height limit)
    if (top < 420 || top > imageHeight - 320) {
      continue;
    }
    for (let c = 0; c < cols; c++) {
      const offset = (r % 2) * 90;
      const left = c * 280 + 30 + offset;
      watermarks.push({ top, left });
    }
  }

  // 7. Build Floating Background Decorations (Maple leaves / Sakura petals)
  const bgDecorations: { top: number; left: number; size: number; rotate: number }[] = [];
  const decorCount = Math.ceil(imageHeight / 280) * 2;
  for (let i = 0; i < decorCount; i++) {
    const top = Math.floor(450 + ((Math.sin(i * 17) + 1) / 2) * (imageHeight - 900));
    const left = Math.floor(((Math.cos(i * 31) + 1) / 2) * 440 + 40);
    const size = Math.floor(20 + ((Math.sin(i * 59) + 1) / 2) * 22);
    const rotate = Math.floor(((Math.cos(i * 73) + 1) / 2) * 360);
    bgDecorations.push({ top, left, size, rotate });
  }

  // 8. Build Margin Frame Ornaments (Side borders)
  const borderDecorations: { top: number; side: 'left' | 'right'; size: number; rotate: number }[] = [];
  const edgeDecorCount = Math.ceil(imageHeight / 260);
  for (let i = 1; i < edgeDecorCount; i++) {
    const top = i * 260;
    borderDecorations.push({
      top,
      side: 'left',
      size: 20,
      rotate: Math.floor((Math.sin(i * 19) + 1) * 180)
    });
    borderDecorations.push({
      top,
      side: 'right',
      size: 20,
      rotate: Math.floor((Math.cos(i * 43) + 1) * 180)
    });
  }

  // 9. Load local Jua, Gaegu & Nanum Brush Script fonts
  let titleFontData: ArrayBuffer | null = null;
  let bodyFontData: ArrayBuffer | null = null;
  let logoFontData: ArrayBuffer | null = null;
  try {
    const juaPath = path.join(process.cwd(), 'src/assets/Jua-Regular.ttf');
    if (fs.existsSync(juaPath)) {
      const buffer = fs.readFileSync(juaPath);
      titleFontData = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    }

    const gaeguPath = path.join(process.cwd(), 'src/assets/Gaegu-Regular.ttf');
    if (fs.existsSync(gaeguPath)) {
      const buffer = fs.readFileSync(gaeguPath);
      bodyFontData = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    }

    const brushPath = path.join(process.cwd(), 'src/assets/NanumBrushScript-Regular.ttf');
    if (fs.existsSync(brushPath)) {
      const buffer = fs.readFileSync(brushPath);
      logoFontData = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    }
  } catch (e) {
    console.error('Failed to load fonts locally', e);
  }

  const fontOptions = [];
  if (titleFontData) {
    fontOptions.push({
      name: 'Jua',
      data: titleFontData,
      style: 'normal' as const,
    });
  }
  if (bodyFontData) {
    fontOptions.push({
      name: 'Gaegu',
      data: bodyFontData,
      style: 'normal' as const,
    });
  }
  if (logoFontData) {
    fontOptions.push({
      name: 'NanumBrushScript',
      data: logoFontData,
      style: 'normal' as const,
    });
  }

  const previewWidth = (isDynamic && !isPaid) ? 550 : 600;

  return new ImageResponse(
    (
      <div
        style={{
          width: `${previewWidth}px`,
          height: `${imageHeight}px`,
          display: 'flex',
          flexDirection: 'column',
          background: containerBg,
          border: (isDynamic && !isPaid) ? `8px dashed #f43f5e` : `8px solid ${theme.borderColor}`,
          fontFamily: 'Jua',
          color: theme.textColor,
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Background Templates for B Approach */}
        
        {currentTemplateType === 'maple' && autumnMapleTopBase64 && autumnMapleBottomBase64 && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', pointerEvents: 'none', zIndex: 0 }}>
            <Image unoptimized src={autumnMapleTopBase64} alt="top" style={{ width: '100%', height: '50%', objectFit: 'cover', display: 'flex' }} />
            <Image unoptimized src={autumnMapleBottomBase64} alt="bottom" style={{ width: '100%', height: '50%', objectFit: 'cover', display: 'flex' }} />
          </div>
        )}

        {currentTemplateType === 'sakura' && pastelSakuraTopBase64 && pastelSakuraBottomBase64 && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', pointerEvents: 'none', zIndex: 0 }}>
            <Image unoptimized src={pastelSakuraTopBase64} alt="top" style={{ width: '100%', height: '50%', objectFit: 'cover', display: 'flex' }} />
            <Image unoptimized src={pastelSakuraBottomBase64} alt="bottom" style={{ width: '100%', height: '50%', objectFit: 'cover', display: 'flex' }} />
          </div>
        )}

        {/* Decorative Inner Frame Borders (wrapping the entire content like an envelope) */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            bottom: '20px',
            border: `2px solid ${theme.borderColor}55`,
            borderRadius: '12px',
            pointerEvents: 'none',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '26px',
            left: '26px',
            right: '26px',
            bottom: '26px',
            border: `1px solid ${theme.borderColor}33`,
            borderRadius: '8px',
            pointerEvents: 'none',
            display: 'flex',
          }}
        />

        {/* Frame Corner Ornaments */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', pointerEvents: 'none' }}>
          {renderDecorationSvg(currentTemplateType, 24, theme.borderColor)}
        </div>
        <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', pointerEvents: 'none' }}>
          {renderDecorationSvg(currentTemplateType, 24, theme.borderColor)}
        </div>
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', display: 'flex', pointerEvents: 'none' }}>
          {renderDecorationSvg(currentTemplateType, 24, theme.borderColor)}
        </div>
        <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', pointerEvents: 'none' }}>
          {renderDecorationSvg(currentTemplateType, 24, theme.borderColor)}
        </div>

        {/* Margin Repeating Ornaments along Left & Right borders */}
        {borderDecorations.map((dec, i) => {
          const styleObj: any = {
            position: 'absolute',
            top: `${dec.top}px`,
            transform: `rotate(${dec.rotate}deg)`,
            opacity: 0.25,
            display: 'flex',
            pointerEvents: 'none',
          };
          if (dec.side === 'left') {
            styleObj.left = '18px';
          } else {
            styleObj.right = '18px';
          }
          return (
            <div key={i} style={styleObj}>
              {renderDecorationSvg(currentTemplateType, dec.size, theme.borderColor)}
            </div>
          );
        })}

        {/* Floating Background Decorations (leaves & petals) */}
        {bgDecorations.map((dec, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${dec.top}px`,
              left: `${dec.left}px`,
              transform: `rotate(${dec.rotate}deg)`,
              opacity: 0.12,
              display: 'flex',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            {renderDecorationSvg(currentTemplateType, dec.size, theme.watermarkColor || theme.borderColor)}
          </div>
        ))}

        {/* Massive Horizontal Preview Warning Banner (only in unpaid preview mode) */}
        {isDynamic && !isPaid && (
          <div
            style={{
              position: 'absolute',
              top: `${Math.floor(imageHeight / 2) - 80}px`,
              left: 0,
              width: '100%',
              height: '110px',
              background: 'rgba(225, 29, 72, 0.96)',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderTop: '6px solid #e11d48',
              borderBottom: '6px solid #e11d48',
              zIndex: 100,
              boxShadow: '0 12px 25px rgba(0,0,0,0.15)',
            }}
          >
            <div style={{ display: 'flex', fontSize: '26px', fontWeight: 900, letterSpacing: '0.05em' }}>
              결제 대기 중 · 복제 금지 프리뷰
            </div>
            <div style={{ display: 'flex', fontSize: '13px', marginTop: '4px', color: '#ffe4e6', fontWeight: 700 }}>
              결제 완료 후 원본 다운로드 및 게시가 가능합니다.
            </div>
          </div>
        )}

        {/* 1. Header Area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '24px 20px',
            borderBottom: theme.headerBorderBottom,
            background: theme.headerBg,
            zIndex: 10,
            gap: '8px',
          }}
        >
          {/* Logo row (Moon SVG + Cursive text) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
            <svg width="42" height="42" viewBox="0 0 40 40" fill="none" style={{ display: 'flex' }}>
              <defs>
                <mask id="abam-moon-mask">
                  <rect width="40" height="40" fill="white" />
                  <circle cx="27" cy="17" r="13" fill="black" />
                </mask>
              </defs>
              <circle cx="20" cy="20" r="16" fill="#fde047" mask="url(#abam-moon-mask)" />
            </svg>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ 
                fontFamily: 'NanumBrushScript', 
                fontSize: '54px', 
                color: '#ff9d00', 
                marginRight: '6px',
                display: 'flex',
                lineHeight: 1
              }}>아름다운</span>
              <span style={{ 
                fontFamily: 'NanumBrushScript', 
                fontSize: '54px', 
                color: '#e91e63', 
                display: 'flex',
                lineHeight: 1
              }}>밤</span>
            </div>
          </div>
          <span style={{ fontSize: '15px', color: theme.textColor === '#fafafa' ? '#fbbf24' : '#be123c', fontWeight: 700, display: 'flex', fontFamily: 'Jua', marginTop: '4px' }}>
            [안심보증] 24시간 안심 보증 1위 플랫폼
          </span>
        </div>

        {/* Scroll/Content wrapper container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: '28px',
            boxSizing: 'border-box',
            flexGrow: 1,
            zIndex: 5,
          }}
        >
          {/* 2. Job Title Card (Hero Banner Card) - Displays ONLY the Company Name styled as a gorgeous glowing neon sign */}
          {!hideCard ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                background: '#ffffff', // Clean white background for high-contrast light theme
                border: `4px solid ${neonColor}`,
                borderRadius: '16px',
                padding: '28px 20px',
                marginBottom: '24px',
                boxShadow: `0 0 15px ${neonColor}88, inset 0 0 10px ${neonColor}44`,
              }}
            >
              <span style={{ 
                fontSize: '52px', 
                fontWeight: 900, 
                color: neonColor, 
                textAlign: 'center',
                fontFamily: 'Jua',
                display: 'flex',
                textShadow: `0 0 4px #ffffff, 0 0 10px ${neonColor}55`
              }}>
                {companyName}
              </span>
            </div>
          ) : (
            // Empty placeholder box to preserve exact height preventing layout shifts
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '116px', // Height of the card including borders (28 + 52 + 28 + 8)
                marginBottom: '24px',
              }}
            />
          )}

          {/* 3. Detailed Introduction */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '24px' }}>
            <span style={{ fontSize: '23px', color: theme.sectionHeaderColor, fontWeight: 900, marginBottom: '10px', borderLeft: theme.sectionHeaderBorderLeft, paddingLeft: '8px', display: 'flex' }}>
              [상세 구인소개 및 근무조건]
            </span>
            <div
              style={{
                display: 'flex',
                background: glassBg,
                borderRadius: '8px',
                padding: '20px',
                border: theme.introBoxBorder,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle background watermark leaf decoration inside the card */}
              <div style={{ position: 'absolute', right: '-15px', bottom: '-15px', opacity: 0.08, display: 'flex', pointerEvents: 'none' }}>
                {currentTemplateType === 'maple' ? (
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="#b91c1c"><path d="M12 2s-1 3-3 4c-2 1-5-1-6 1s3 3 2 5c-1 2-4 1-3 3s4 0 5 2c1 2-2 3-1 5s3-2 5-1c2 1 1 4 3 4s1-3 3-4c2-1 4 3 5 1s-2-3-1-5c1-2 4 0 5-2s-2-1-3-3c-1-2 3-4 2-5s-4 0-6-1c-2-1-3-4-3-4z" /></svg>
                ) : (
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="#f472b6"><path d="M12 21.5c-4.5-3.5-7.5-7.5-7.5-11.5s3.5-6.5 7.5-6.5 7.5 2.5 7.5 6.5-3 8-7.5 11.5z" /></svg>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', zIndex: 1 }}>
                {descParagraphs.map((p: string, idx: number) => {
                  const trimmed = p.trim();
                  if (!trimmed) return <div key={idx} style={{ height: '8px', display: 'flex' }} />;
                  
                  // Regular expression to check if line starts with a list bullet or number
                  const bulletMatch = trimmed.match(/^([-\*•✔✿🌸❤️💖💡👉☎💬✅⭐✨]|\d+\.)\s*(.*)$/);
                  if (bulletMatch) {
                    const bullet = bulletMatch[1];
                    const text = bulletMatch[2];
                    
                    const isHeader = /^\d+\./.test(bullet); // e.g. "1.", "2."
                    
                    if (isHeader) {
                      return (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            fontSize: '29px', // Section titles are larger
                            color: theme.sectionHeaderColor,
                            lineHeight: '1.6',
                            fontFamily: 'Gaegu',
                            fontWeight: 900,
                            marginTop: idx > 0 ? '16px' : '0px',
                            marginBottom: '6px',
                            width: '100%',
                          }}
                        >
                          <span style={{ display: 'flex', marginRight: '8px', color: theme.companyNameColor }}>{bullet}</span>
                          <span style={{ display: 'flex', flexGrow: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                            {renderHighlightedText(text, theme.sectionHeaderColor, theme.companyNameColor)}
                          </span>
                        </div>
                      );
                    }
                    
                    // Regular list items with punctuation-based split layout
                    const textSegments = splitTextByPunctuation(text, 20);
                    return (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          fontSize: '25px', // Enlarged body font
                          color: theme.introBoxTextColor,
                          lineHeight: '1.7',
                          fontFamily: 'Gaegu',
                          fontWeight: 700,
                          marginBottom: '6px',
                          width: '100%',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                          <span style={{ display: 'flex', width: '28px', flexShrink: 0, color: theme.companyNameColor }}>{bullet}</span>
                          <span style={{ display: 'flex', flexGrow: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                            {renderHighlightedText(textSegments[0], theme.introBoxTextColor, theme.companyNameColor)}
                          </span>
                        </div>
                        {textSegments.slice(1).map((seg, sIdx) => (
                          <div key={sIdx} style={{ display: 'flex', paddingLeft: '28px', width: '100%' }}>
                            <span style={{ display: 'flex', flexGrow: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                              {renderHighlightedText(seg, theme.introBoxTextColor, theme.companyNameColor)}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  
                  // Regular paragraphs with punctuation-based split layout
                  const textSegments = splitTextByPunctuation(trimmed, 20);
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        marginBottom: '10px',
                      }}
                    >
                      {textSegments.map((seg, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            fontSize: '25px', // Enlarged body font
                            color: theme.introBoxTextColor,
                            lineHeight: '1.7',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            fontFamily: 'Gaegu',
                            fontWeight: 700,
                            textAlign: 'justify',
                            width: '100%',
                            textIndent: sIdx === 0 && (trimmed.startsWith('안녕하세요') || trimmed.startsWith('저희')) ? '16px' : '0px',
                          }}
                        >
                          {renderHighlightedText(seg, theme.introBoxTextColor, theme.companyNameColor)}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ⭐ 우리 업소만의 특별한 강점 & PR */}
          {(welfare || atmosphere || prMessage) ? (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '24px' }}>
              <span style={{ fontSize: '23px', color: theme.sectionHeaderColor, fontWeight: 900, marginBottom: '10px', borderLeft: theme.sectionHeaderBorderLeft, paddingLeft: '8px', display: 'flex' }}>
                [우리 업소만의 특별한 강점 & PR]
              </span>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  background: glassBg, 
                  borderRadius: '8px',
                  padding: '18px',
                  border: theme.prBoxBorder,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Subtle background watermark leaf decoration inside the card */}
                <div style={{ position: 'absolute', right: '-15px', bottom: '-15px', opacity: 0.08, display: 'flex', pointerEvents: 'none' }}>
                  {currentTemplateType === 'maple' ? (
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="#b91c1c"><path d="M12 2s-1 3-3 4c-2 1-5-1-6 1s3 3 2 5c-1 2-4 1-3 3s4 0 5 2c1 2-2 3-1 5s3-2 5-1c2 1 1 4 3 4s1-3 3-4c2-1 4 3 5 1s-2-3-1-5c1-2 4 0 5-2s-2-1-3-3c-1-2 3-4 2-5s-4 0-6-1c-2-1-3-4-3-4z" /></svg>
                  ) : (
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="#f472b6"><path d="M12 21.5c-4.5-3.5-7.5-7.5-7.5-11.5s3.5-6.5 7.5-6.5 7.5 2.5 7.5 6.5-3 8-7.5 11.5z" /></svg>
                  )}
                </div>
                {welfare ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: theme.prBoxTitleColor, display: 'flex', fontFamily: 'Gaegu' }}>💎 독보적 강점 및 복지 혜택:</span>
                    <span style={{ fontSize: '21px', color: theme.prBoxValColor, lineHeight: '1.6', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', fontFamily: 'Gaegu', fontWeight: 700 }}>
                      {renderHighlightedText(welfare, theme.prBoxValColor, theme.companyNameColor)}
                    </span>
                  </div>
                ) : null}
                {atmosphere ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: welfare ? `1px dashed ${theme.watermarkColor}33` : 'none', paddingTop: welfare ? '8px' : '0' }}>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: theme.prBoxTitleColor, display: 'flex', fontFamily: 'Gaegu' }}>✨ 근무 환경 및 분위기:</span>
                    <span style={{ fontSize: '21px', color: theme.prBoxValColor, lineHeight: '1.6', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', fontFamily: 'Gaegu', fontWeight: 700 }}>
                      {renderHighlightedText(atmosphere, theme.prBoxValColor, theme.companyNameColor)}
                    </span>
                  </div>
                ) : null}
                {prMessage ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: (welfare || atmosphere) ? `1px dashed ${theme.watermarkColor}33` : 'none', paddingTop: (welfare || atmosphere) ? '8px' : '0' }}>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: theme.prBoxTitleColor, display: 'flex', fontFamily: 'Gaegu' }}>💬 실장님의 각오/메시지:</span>
                    <span style={{ fontSize: '21px', color: theme.companyNameColor, fontWeight: 700, lineHeight: '1.6', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', fontFamily: 'Gaegu' }}>
                      {renderHighlightedText(prMessage, theme.companyNameColor, theme.prBoxTitleColor)}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* 4. Q&A Box (FAQ) */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '24px' }}>
            <span style={{ fontSize: '23px', color: theme.sectionHeaderColor, fontWeight: 900, marginBottom: '10px', borderLeft: theme.sectionHeaderBorderLeft, paddingLeft: '8px', display: 'flex' }}>
              [자주 묻는 질문 (FAQ)]
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {displayQnas.map((item: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: glassBg,
                    borderRadius: '6px',
                    padding: '12px 14px',
                    borderLeft: `3px solid ${theme.borderColor}`,
                    borderTop: theme.faqItemBorder,
                    borderRight: theme.faqItemBorder,
                    borderBottom: theme.faqItemBorder,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Subtle background watermark leaf decoration inside the card */}
                  <div style={{ position: 'absolute', right: '-8px', bottom: '-8px', opacity: 0.06, display: 'flex', pointerEvents: 'none' }}>
                    {currentTemplateType === 'maple' ? (
                      <svg width="50" height="50" viewBox="0 0 24 24" fill="#b91c1c"><path d="M12 2s-1 3-3 4c-2 1-5-1-6 1s3 3 2 5c-1 2-4 1-3 3s4 0 5 2c1 2-2 3-1 5s3-2 5-1c2 1 1 4 3 4s1-3 3-4c2-1 4 3 5 1s-2-3-1-5c1-2 4 0 5-2s-2-1-3-3c-1-2 3-4 2-5s-4 0-6-1c-2-1-3-4-3-4z" /></svg>
                    ) : (
                      <svg width="50" height="50" viewBox="0 0 24 24" fill="#f472b6"><path d="M12 21.5c-4.5-3.5-7.5-7.5-7.5-11.5s3.5-6.5 7.5-6.5 7.5 2.5 7.5 6.5-3 8-7.5 11.5z" /></svg>
                    )}
                  </div>
                  <span style={{ fontSize: '22px', fontWeight: 900, color: theme.faqQuestionColor, marginBottom: '4px', display: 'flex', fontFamily: 'Gaegu' }}>
                    {item.question}
                  </span>
                  <span style={{ fontSize: '20px', color: theme.faqAnswerColor, lineHeight: '1.5', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', fontFamily: 'Gaegu', fontWeight: 700 }}>
                    {renderHighlightedText(item.answer, theme.faqAnswerColor, theme.companyNameColor)}
                  </span>
                </div>
              ))}

              {showFaqTruncatedMessage && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '12px',
                    background: theme.introBoxBg,
                    border: theme.introBoxBorder,
                    borderRadius: '6px',
                  }}
                >
                  <span style={{ fontSize: '18px', fontWeight: 700, color: theme.companyNameColor, display: 'flex', fontFamily: 'Gaegu' }}>
                    더 궁금하신 점은 하단 문의처로 문의해주세요. 💬
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Highlight Sentence Box */}
          {highlightSentence ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                background: glassBg,
                border: theme.highlightBoxBorder,
                borderRadius: '8px',
                padding: '14px 18px',
                marginBottom: '24px',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: 900, color: theme.highlightTitleColor, marginBottom: '4px', display: 'flex', fontFamily: 'Gaegu' }}>
                [공고 핵심 약속]
              </span>
              <span style={{ fontSize: '21px', fontWeight: 900, color: theme.highlightTextColor, textAlign: 'center', display: 'flex', justifyContent: 'center', fontFamily: 'Jua' }}>
                "{highlightSentence}"
              </span>
            </div>
          ) : null}

          {/* 5. Contact Information Box */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              background: glassBg,
              border: theme.contactBoxBorder,
              borderRadius: '12px',
              padding: '22px',
              boxSizing: 'border-box',
              marginBottom: '10px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle background watermark leaf decoration inside the card */}
            <div style={{ position: 'absolute', right: '-15px', bottom: '-15px', opacity: 0.08, display: 'flex', pointerEvents: 'none' }}>
              {currentTemplateType === 'maple' ? (
                <svg width="100" height="100" viewBox="0 0 24 24" fill="#b91c1c"><path d="M12 2s-1 3-3 4c-2 1-5-1-6 1s3 3 2 5c-1 2-4 1-3 3s4 0 5 2c1 2-2 3-1 5s3-2 5-1c2 1 1 4 3 4s1-3 3-4c2-1 4 3 5 1s-2-3-1-5c1-2 4 0 5-2s-2-1-3-3c-1-2 3-4 2-5s-4 0-6-1c-2-1-3-4-3-4z" /></svg>
              ) : (
                <svg width="100" height="100" viewBox="0 0 24 24" fill="#f472b6"><path d="M12 21.5c-4.5-3.5-7.5-7.5-7.5-11.5s3.5-6.5 7.5-6.5 7.5 2.5 7.5 6.5-3 8-7.5 11.5z" /></svg>
              )}
            </div>
            <span style={{ fontSize: '22px', color: theme.contactBoxTitleColor, fontWeight: 900, textAlign: 'center', marginBottom: '14px', borderBottom: `1px solid ${theme.borderColor}22`, paddingBottom: '8px', display: 'flex', justifyContent: 'center' }}>
              [실시간 안심문의 및 접수]
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '19px', color: theme.contactFieldLabelColor, fontWeight: 700, display: 'flex', fontFamily: 'Gaegu' }}>전화문의:</span>
                <span style={{ fontSize: '22px', color: theme.contactFieldValueColor, fontWeight: 900, display: 'flex', fontFamily: 'Gaegu' }}>
                  {isPaid ? contactPhone : '010-XXXX-XXXX (결제후 공개)'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '19px', color: theme.contactFieldLabelColor, fontWeight: 700, display: 'flex', fontFamily: 'Gaegu' }}>카카오톡 ID:</span>
                <span style={{ fontSize: '22px', color: theme.contactFieldValueColor, fontWeight: 900, display: 'flex', fontFamily: 'Gaegu' }}>
                  {isPaid ? contactKakao : '결제후 공개'}
                </span>
              </div>
              {telegram && isPaid ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '19px', color: theme.contactFieldLabelColor, fontWeight: 700, display: 'flex', fontFamily: 'Gaegu' }}>텔레그램 ID:</span>
                  <span style={{ fontSize: '22px', color: theme.contactFieldValueColor, fontWeight: 900, display: 'flex', fontFamily: 'Gaegu' }}>{telegram}</span>
                </div>
              ) : null}
              {line && isPaid ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '19px', color: theme.contactFieldLabelColor, fontWeight: 700, display: 'flex', fontFamily: 'Gaegu' }}>라인 ID:</span>
                  <span style={{ fontSize: '22px', color: theme.contactFieldValueColor, fontWeight: 900, display: 'flex', fontFamily: 'Gaegu' }}>{line}</span>
                </div>
              ) : null}
            </div>
            <span style={{ fontSize: '16px', color: theme.textColor === '#fafafa' ? '#a1a1aa' : '#4b5563', lineHeight: '1.4', marginTop: '12px', textAlign: 'center', opacity: 0.9, display: 'flex', justifyContent: 'center', fontFamily: 'Gaegu', fontWeight: 700 }}>
              "아름다운밤 보고 연락했다"고 말씀하시면 우대 혜택을 받으실 수 있습니다.
            </span>
          </div>
        </div>

        {/* 6. Footer Banner Area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '20px',
            borderTop: theme.footerBorderTop,
            background: theme.footerBg,
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: '17px', fontWeight: 900, color: theme.footerTitleColor, marginBottom: '4px', display: 'flex' }}>
            [아밤 안심보증 200% 신뢰 구인광고]
          </span>
          <span style={{ fontSize: '13px', color: theme.footerTextColor, textAlign: 'center', display: 'flex', fontFamily: 'Gaegu', fontWeight: 700 }}>
            본 구인 공고는 등록 절차 준수 및 사전 신원 확인이 완료된 검증된 안심 업소입니다.
          </span>
        </div>

        {/* Background Tiled Watermarks (Rendered at the very end to enforce overlay since zIndex is ignored in Satori) */}
        {watermarks.map((wm, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${wm.top}px`,
              left: `${wm.left}px`,
              transform: 'rotate(-25deg)',
              fontSize: '24px', // Bigger font size as requested
              fontWeight: 900,
              color: theme.textColor === '#f8fafc' ? '#ffffff' : '#0f172a',
              opacity: watermarkOpacity,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ display: 'flex' }}>🌙</span>
            <span style={{ display: 'flex' }}>아름다운밤 abam.kr</span>
          </div>
        ))}
      </div>
    ),
    {
      width: previewWidth,
      height: imageHeight,
      fonts: fontOptions,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      }
    }
  );
}
