import { notFound } from 'next/navigation';
import { topBanners, priorityJobs, recommendedJobs, generalJobs } from '../../../lib/mockData';
import { vvipBanner, grandVipBanners, premiumBanners, lineAdsData } from '../../../lib/mockAds';
import scrapedJobs from '../../../lib/scraped_jobs.json';
import JobDetailClient from './JobDetailClient';

export const revalidate = 86400;
export const dynamicParams = true;

const sanitizeText = (text: string | undefined) => {
  if (!text) return '';
  return text
    .replace(/아밤 비즈니스/gi, '아름다운밤')
    .replace(/아밤 비즈니스/gi, '아름다운밤')
    .replace(/로컬 채용/gi, '여성알바')
    .replace(/여우/gi, '아밤')
    .replace(/퀸/gi, '아밤')
    .replace(/queenalba\.net/gi, 'abam.kr')
    .replace(/foxalba\.com/gi, 'abam.kr')
    .replace(/queenalba/gi, 'abam')
    .replace(/foxalba/gi, 'abam')
    .replace(/\[아름다운밤\]/gi, '')
    .replace(/\[아밤\]/gi, '')
    .trim();
};

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

const allJobs = allJobsRaw.map((job: any) => ({
  ...job,
  companyName: sanitizeText(job.companyName),
  title: sanitizeText(job.title),
  description: sanitizeText(job.description),
  requirements: sanitizeText(job.requirements),
  workHours: sanitizeText(job.workHours),
  pay: sanitizeText(job.pay),
  location: sanitizeText(job.location)
}));

const getJobById = (id: string) => {
  let job = allJobs.find(j => String(j.id) === id) as any;
  if (!job) {
    const globalRef = global as any;
    const dynamicJobs = globalRef.dynamicJobs || new Map();
    const serverJob = dynamicJobs.get(id);
    if (serverJob) {
      job = {
        ...serverJob,
        companyName: sanitizeText(serverJob.companyName),
        title: sanitizeText(serverJob.title),
        description: sanitizeText(serverJob.description),
        requirements: sanitizeText(serverJob.requirements),
        workHours: sanitizeText(serverJob.workHours),
        pay: sanitizeText(serverJob.pay),
        location: sanitizeText(serverJob.location)
      };
    }
  }
  return job;
};

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return allJobsRaw.map((job) => ({
    id: String(job.id),
  }));
}

// 구글 채용정보(Google Jobs) 및 네이버 봇 최적화 동적 메타데이터 생성
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const job = getJobById(resolvedParams.id);
  if (!job) return {};

  const cleanTitle = job.title.replace(/[♥❤♡]/g, '').trim();
  const desc = `${job.companyName}에서 등록한 ${cleanTitle} 여성 구인 정보입니다. 위치: ${job.location}, 급여: ${job.pay}. 아름다운밤(아밤)에서 안심하고 확인하세요.`;

  return {
    title: `${cleanTitle} - ${job.companyName} 채용공고 | 아름다운밤`,
    description: desc,
    alternates: {
      canonical: `https://abam.kr/job/${job.id}`,
    },
    openGraph: {
      title: `${cleanTitle} | 아름다운밤`,
      description: desc,
      type: 'website',
      url: `https://abam.kr/job/${job.id}`,
    }
  };
}

export default async function JobDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const job = getJobById(resolvedParams.id);
  if (!job) {
    notFound();
  }

  let cleanDesc = job.description || '';
  const phone = job.contactPhone;
  const kakao = job.contactKakao;
  const telegram = job.telegram;
  if (phone && phone !== '010-XXXX-XXXX') {
    cleanDesc = cleanDesc.replace(/☎\s*연락처:\s*[^\n]*/gi, `☎ 연락처: ${phone}`);
  }
  if (kakao && kakao !== 'abam1004') {
    cleanDesc = cleanDesc.replace(/💬\s*카카오톡\s*ID:\s*[^\n]*/gi, `💬 카카오톡 ID: ${kakao}`);
  }
  if (telegram) {
    cleanDesc = cleanDesc.replace(/💬\s*텔레그램\s*ID:\s*[^\n]*/gi, `💬 텔레그램 ID: ${telegram}`);
  } else {
    cleanDesc = cleanDesc.replace(/💬\s*텔레그램\s*ID:\s*[^\n]*\n?/gi, '');
  }

  // 구글 공식 JobPosting 구조화 데이터 마크업 생성
  const jobPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title.replace(/[♥❤♡]/g, '').trim(),
    description: cleanDesc || `${job.companyName}의 상세 구인 조건입니다.`,
    datePosted: job.createdAt || new Date().toISOString(),
    validThrough: job.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    hiringOrganization: {
      '@type': 'Organization',
      name: job.companyName,
      sameAs: 'https://abam.kr'
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location.split(' ')[1] || job.location,
        addressRegion: job.location.split(' ')[0] || '서울',
        addressCountry: 'KR'
      }
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'KRW',
      value: {
        '@type': 'QuantitativeValue',
        value: 100000, // 대표 급여 시급/일급 매칭용 예시 수치
        unitText: 'HOUR'
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
      />
      <JobDetailClient job={job} currentUser={null} />
    </>
  );
}
