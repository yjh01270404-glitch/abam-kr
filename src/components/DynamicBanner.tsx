import React, { useMemo } from 'react';
import Link from 'next/link';
import { Zap, Crown, Diamond, Star } from 'lucide-react';
import { JobAd } from '../lib/mockData';
import { generateBannerStyle, mapJobTypeToTier } from '../lib/generateBannerStyle';
import styles from './DynamicBanner.module.css';

interface DynamicBannerProps {
  jobAd: JobAd;
  className?: string;
  size?: 'normal' | 'vvip';
}

const TIER_ICONS = {
  vip: <Crown size={18} />,
  premium: <Diamond size={18} />,
  general: <Star size={18} />,
};

export default function DynamicBanner({ jobAd, className = '', size = 'normal' }: DynamicBannerProps) {
  const bannerStyle = useMemo(() => generateBannerStyle(jobAd), [jobAd]);
  const tier = mapJobTypeToTier(jobAd.type);

  const { colorPalette, animationStyle, copyText, decorations } = bannerStyle;

  const isVVIP = size === 'vvip';

  const animClass = animationStyle ? styles['anim_' + animationStyle.replace(/-/g, '_')] : '';
  const sizeClass = size === 'vvip' ? styles.bannerVVIP : '';

  const containerClasses = [
    styles.bannerContainer,
    animClass,
    sizeClass,
    className
  ].filter(Boolean).join(' ');

  const containerStyle = {
    background: colorPalette.bg,
    borderColor: colorPalette.accent,
    boxShadow: isVVIP 
      ? `0 0 30px ${colorPalette.accent}80, inset 0 0 30px ${colorPalette.accent}80` 
      : `0 0 10px ${colorPalette.accent}40, inset 0 0 10px ${colorPalette.accent}40`,
  };

  const badgeBoxStyle: React.CSSProperties = {
    borderColor: colorPalette.accent,
    color: '#fff',
    boxShadow: isVVIP
      ? `0 0 20px ${colorPalette.accent}aa`
      : `0 0 8px ${colorPalette.accent}60`,
    background: isVVIP ? `${colorPalette.accent}33` : 'rgba(0,0,0,0.4)',
  };

  const mainTextStyle: React.CSSProperties = {
    textShadow: isVVIP
      ? `0 0 15px ${colorPalette.accent}, 0 0 30px ${colorPalette.accent}`
      : `0 0 10px ${colorPalette.accent}, 0 0 20px ${colorPalette.accent}`,
    color: '#fff',
  };

  const highlightKeywords = (text: string) => {
    const useHighlight = jobAd.addons ? jobAd.addons.textHighlight : true;
    if (!useHighlight) return text;
    
    const regex = /(100%|당일지급보장|최고대우|초보환영|초보가능|확실하게|단기알바|\d+만|\d+명|\+@)/g;
    const parts = text.split(regex);
    return parts.map((part, i) => {
      if (part.match(regex)) {
        return <span key={i} className={isVVIP ? styles.textBlinkVVIP : styles.textBlink} style={{ color: colorPalette.accent }}>{part}</span>;
      }
      return part;
    });
  };
  const labelParts = copyText.label.split(' ');
  const labelLine1 = labelParts[0];
  const labelLine2 = labelParts.length > 1 ? labelParts.slice(1).join(' ') : '';

  const decorationElements = decorations.map((dec, i) => {
    let decClass = '';
    let decContent = null;
    if (dec.type === 'sparkle') {
      decClass = styles.decSparkle;
    } else if (dec.type === 'flash') {
      decClass = styles.decFlash;
      decContent = <Zap size={isVVIP ? 32 : 14} fill="currentColor" />;
    } else if (dec.type === 'star') {
      decClass = styles.decStar;
      decContent = '✦';
    }
    
    return (
      <div 
        key={i} 
        className={decClass} 
        style={{
          top: dec.top, 
          left: dec.left, 
          color: colorPalette.accent,
          '--dec-scale': isVVIP ? (dec.scale * 1.5) : dec.scale,
        } as React.CSSProperties}
      >
        {decContent}
      </div>
    );
  });

  return (
    <Link href={/job/ + jobAd.id} className={containerClasses} style={containerStyle}>
      <div className={styles.starryBg}></div>
      {decorationElements}

      <div className={styles.leftBox} style={badgeBoxStyle}>
        <div className={styles.lightningIcon} style={{ color: colorPalette.accent }}>
          <Zap size={size === 'vvip' ? 24 : 16} fill="currentColor" />
        </div>
        <div className={styles.leftBoxText}>
          {labelLine1}<br/>
          {labelLine2 || (size === 'vvip' ? <Crown size={24} /> : TIER_ICONS[tier])}
        </div>
      </div>
      
      <div className={styles.rightContent}>
        <div className={styles.mainCopy} style={mainTextStyle}>
          {highlightKeywords(copyText.main)}
        </div>
        <div className={styles.subRow}>
          <div className={styles.subCopy}>
            {copyText.sub}
          </div>
          <div className={styles.ctaButton}>
            바로가기 ▸
          </div>
        </div>
      </div>
    </Link>
  );
}