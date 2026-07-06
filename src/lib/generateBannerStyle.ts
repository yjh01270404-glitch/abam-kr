import { STYLE_POOLS, TierType, ColorPalette, CopyTemplate } from '../constants/bannerStylePools';
import { xmur3, mulberry32, pickRandomIndex } from './seededRandom';
import { JobAd } from './mockData';

export interface BannerDecoration {
  type: 'sparkle' | 'flash' | 'star';
  top: string;
  left: string;
  delay: string;
  scale: number;
}

export interface GeneratedBannerStyle {
  colorPalette: ColorPalette;
  animationStyle: string;
  copyText: CopyTemplate;
  decorations: BannerDecoration[];
}

export function mapJobTypeToTier(type: JobAd['type']): TierType {
  switch (type) {
    case 'top':
      return 'vip';
    case 'priority':
    case 'special':
      return 'premium';
    case 'general':
    default:
      return 'general';
  }
}

export function generateBannerStyle(jobAd: JobAd): GeneratedBannerStyle {
  const tier = mapJobTypeToTier(jobAd.type);
  const pool = STYLE_POOLS[tier];
  
  const seedFn = xmur3(jobAd.id);
  const rng = mulberry32(seedFn());
  
  const colorIdx = pickRandomIndex(pool.colorPalettes, rng);
  const animIdx = pickRandomIndex(pool.animationStyles, rng);
  const copyIdx = pickRandomIndex(pool.copyTemplates, rng);
  
  const template = pool.copyTemplates[copyIdx];
  
  const copyText = {
    label: template.label.replace('{pay}', jobAd.pay).replace('{location}', jobAd.location).replace('{companyName}', jobAd.companyName),
    main: template.main.replace('{pay}', jobAd.pay).replace('{location}', jobAd.location).replace('{companyName}', jobAd.companyName),
    sub: template.sub.replace('{pay}', jobAd.pay).replace('{location}', jobAd.location).replace('{companyName}', jobAd.companyName),
  };

  const decorations: BannerDecoration[] = [];
  
  // Default to true if addons is undefined, otherwise use addons.decorations
  const useDecorations = jobAd.addons ? jobAd.addons.decorations : true;
  
  if (useDecorations) {
    const numDecorations = 3 + Math.floor(rng() * 4); // 3 to 6 decorations
    const decTypes: Array<'sparkle' | 'flash' | 'star'> = ['sparkle', 'flash', 'star'];
    for (let i = 0; i < numDecorations; i++) {
      decorations.push({
        type: decTypes[Math.floor(rng() * decTypes.length)],
        top: `${Math.floor(rng() * 100)}%`,
        left: `${Math.floor(rng() * 100)}%`,
        delay: `${(rng() * 2).toFixed(2)}s`,
        scale: 0.5 + rng(),
      });
    }
  }

  return {
    colorPalette: pool.colorPalettes[colorIdx],
    animationStyle: pool.animationStyles[animIdx],
    copyText,
    decorations,
  };
}