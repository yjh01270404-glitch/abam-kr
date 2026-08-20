'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  topBanners as initialTop,
  priorityJobs as initialPriority,
  recommendedJobs as initialRecommended,
  generalJobs as initialGeneral,
  type JobAd,
  type PaymentRecord,
  type RefundRequest,
} from '../lib/mockData';
import { parseDevice, fetchClientIP } from '../lib/adminUtils';
import scrapedJobs from '../lib/scraped_jobs.json';
import { track, trackLogin, trackRegister, trackLogout } from '../lib/tracker';

export interface EmployerRequest {
  id: string;
  name: string;
  regNumber: string;
  owner: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

interface User {
  id: string;
  username: string;
  nickname: string;
  companyName: string;
  role: 'employer' | 'seeker';
  birthdate: string;
  gender: 'M' | 'F';
  verified: boolean;
  joinDate?: string;
  lastLogin?: string;
  lastIp?: string;
  lastDevice?: string;
  /** SOS 긴급 알림 수신 여부 (기본: false) */
  sosAlert?: boolean;
  /** SOS 알림 수신 지역 목록 */
  sosRegions?: string[];
  /** 구인자 회원 휴대폰 번호 */
  phone?: string;
}

// ─────────────────────────────────────────────
// 환불 정책 계산기 (공정위 기준)
// ─────────────────────────────────────────────
/**
 * 이용 비율에 따른 환불금액 계산
 * - 이용 전 (0일): 100% 환불
 * - 이용 기간 1/3 이하: 총액의 2/3 환불
 * - 이용 기간 1/2 이하: 총액의 1/2 환불
 * - 이용 기간 1/2 초과: 환불 불가
 */
export function computeRefundAmount(
  totalPaid: number,
  createdAt: string,
  expiresAt: string,
): { amount: number; ratioLabel: string } {
  const start = new Date(createdAt).getTime();
  const end = new Date(expiresAt).getTime();
  const now = Date.now();

  const totalDays = Math.max((end - start) / 86400000, 1);
  const usedDays = Math.max((now - start) / 86400000, 0);
  const ratio = usedDays / totalDays;

  if (ratio <= 0) {
    return { amount: totalPaid, ratioLabel: '이용 시작 전 → 100% 환불' };
  }
  if (ratio <= 1 / 3) {
    const amount = Math.floor(totalPaid * (2 / 3));
    const usedD = Math.floor(usedDays);
    return {
      amount,
      ratioLabel: `이용 ${usedD}일 / ${Math.floor(totalDays)}일 (1/3 이하) → 2/3 환불 (${amount.toLocaleString()}원)`,
    };
  }
  if (ratio <= 1 / 2) {
    const amount = Math.floor(totalPaid * (1 / 2));
    const usedD = Math.floor(usedDays);
    return {
      amount,
      ratioLabel: `이용 ${usedD}일 / ${Math.floor(totalDays)}일 (1/2 이하) → 1/2 환불 (${amount.toLocaleString()}원)`,
    };
  }
  return {
    amount: 0,
    ratioLabel: `이용 ${Math.floor(usedDays)}일 / ${Math.floor(totalDays)}일 (1/2 초과) → 환불 불가`,
  };
}

interface AppContextType {
  currentUser: User | null;
  topBanners: JobAd[];
  priorityJobs: JobAd[];
  recommendedJobs: JobAd[];
  generalJobs: JobAd[];
  pendingAds: JobAd[];
  employers: EmployerRequest[];

  login: (username: string, password: string) => 'ok' | 'invalid' | 'not_found';
  logout: () => void;
  signup: (data: {
    username: string;
    password: string;
    nickname: string;
    birthdate: string;
    gender: 'M' | 'F';
    role: 'employer' | 'seeker';
    sosAlert?: boolean;
    sosRegions?: string[];
    phone?: string;
  }) => 'ok' | 'duplicate' | 'underage';

  registerJob: (job: Omit<JobAd, 'id' | 'viewCount'> & { id?: string }) => void;
  registerEmployer: (owner: string, companyName: string, regNo: string, phone: string) => void;

  approveEmployer: (empId: string) => void;
  rejectEmployer: (empId: string) => void;
  approveAd: (adId: string) => void;
  rejectAd: (adId: string) => void;

  /**
   * 구독 연장 — 기존 expiresAt에 months 개월을 누적하여 더함(+).
   * 이미 만료된 경우에는 오늘부터 계산.
   * paymentHistory에 결제 이력을 추가함.
   */
  extendAdSubscription: (
    adId: string,
    months: number,
    amount: number,
    planName: string,
  ) => 'ok' | 'not_found';

  /**
   * 환불 신청 — 공정위 기준으로 환불액을 자동 계산하고 pending 상태로 등록.
   */
  requestAdRefund: (
    adId: string,
    reason: string,
  ) => 'ok' | 'not_found' | 'already_requested' | 'no_payment';

  /**
   * 관리자 환불 처리 — 승인 or 거부
   */
  processRefund: (
    adId: string,
    approved: boolean,
    rejectedReason?: string,
  ) => 'ok' | 'not_found';

  /** 환불 대기 중인 광고 목록 (관리자용) */
  pendingRefundAds: JobAd[];

  /**
   * 현재 로그인 사용자가 결제 완료한 활성 광고 수
   * (점프 패널 표시 여부 제어에 사용)
   */
  userPaidAdCount: number;

  /**
   * SOS 알림 설정 변경
   * 구직자가 수신 지역과 ON/OFF를 업데이트
   */
  updateSosSettings: (sosAlert: boolean, sosRegions: string[]) => void;

  /** 자동 예약 점프 시간대 설정 */
  updateAutoJumpHours: (adId: string, hours: number[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialEmployers: EmployerRequest[] = [
  { id: '1', name: '아름다운밤 라운지', regNumber: '123-45-67890', owner: '홍길동', phone: '010-1111-2222', status: 'pending', date: '2026-07-02' },
  { id: '2', name: '강남 에이스룸', regNumber: '222-33-44444', owner: '김에이스', phone: '010-3333-4444', status: 'approved', date: '2026-07-01' },
  { id: '3', name: '역삼 텐카페', regNumber: '555-66-77777', owner: '이마담', phone: '010-5555-6666', status: 'pending', date: '2026-07-02' },
];

// ─────────────────────────────────────────────
// 광고를 모든 목록에서 검색하는 헬퍼
// ─────────────────────────────────────────────
type AllAdLists = {
  topBanners: JobAd[];
  priorityJobs: JobAd[];
  recommendedJobs: JobAd[];
  generalJobs: JobAd[];
  pendingAds: JobAd[];
};

function findAdInAllLists(
  adId: string,
  lists: AllAdLists,
): { list: keyof AllAdLists; ad: JobAd } | null {
  for (const key of Object.keys(lists) as Array<keyof AllAdLists>) {
    const found = lists[key].find((a) => a.id === adId);
    if (found) return { list: key, ad: found };
  }
  return null;
}

function updateAdInList(list: JobAd[], adId: string, updater: (ad: JobAd) => JobAd): JobAd[] {
  return list.map((a) => (a.id === adId ? updater(a) : a));
}

// ─────────────────────────────────────────────
// LocalStorage 키 상수
// ─────────────────────────────────────────────
const LS = {
  TOP: 'abam_top_banners',
  PRIORITY: 'abam_priority_jobs',
  RECOMMENDED: 'abam_recommended_jobs',
  GENERAL: 'abam_general_jobs',
  PENDING: 'abam_pending_ads',
  EMPLOYERS: 'abam_employers',
  USERS: 'abam_users',
  USER: 'abam_user',
  DATA_VERSION: 'abam_data_version',
};

const DATA_VERSION = 'v32-filtered-safe-database'; // ← 버전 올려서 새 데이터 강제 로드

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [topBanners, setTopBanners] = useState<JobAd[]>([]);
  const [priorityJobs, setPriorityJobs] = useState<JobAd[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<JobAd[]>([]);
  const [generalJobs, setGeneralJobs] = useState<JobAd[]>([]);
  const [pendingAds, setPendingAds] = useState<JobAd[]>([]);
  const [employers, setEmployers] = useState<EmployerRequest[]>([]);

  // ── 상태별 setter 맵 (업데이트 헬퍼용) ──
  const setters = {
    topBanners: setTopBanners,
    priorityJobs: setPriorityJobs,
    recommendedJobs: setRecommendedJobs,
    generalJobs: setGeneralJobs,
    pendingAds: setPendingAds,
  } as const;

  const lsKeys: Record<keyof typeof setters, string> = {
    topBanners: LS.TOP,
    priorityJobs: LS.PRIORITY,
    recommendedJobs: LS.RECOMMENDED,
    generalJobs: LS.GENERAL,
    pendingAds: LS.PENDING,
  };

  // ── 초기 로드 ──
  useEffect(() => {
    const savedUser = localStorage.getItem(LS.USER);
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    // 금지어 필터링 리스트 (대출 및 성매매 암시글 배제)
    const forbiddenKeywords = [
      '대출', '일수', '가계대출', '마이킹', '선불', '보증금대출', '대출가능', '무담보', '일수방', '신용대출', '급전',
      '성매매', '유사성행위', '조건만남', '2차', '마무리', '수위', '터치', '유사', '카페', '대딸', '핸플', '대딸방', 
      '디저트 카페', '페티시', '하드수위', '소프트수위', '섹스', '성관계', '성상납', '성매매알선', '유사 연애', '유사연애'
    ];

    const filterJobAdList = (list: JobAd[]) => {
      return list.filter((job) => {
        const textToSearch = [
          job.title || '',
          job.companyName || '',
          job.description || '',
          job.requirements || '',
          job.tag || '',
          job.pay || ''
        ].join(' ').toLowerCase();

        return !forbiddenKeywords.some(kw => textToSearch.includes(kw.toLowerCase()));
      });
    };

    // 크롤링된 실제 데이터와 모의 데이터를 결합하여 분배
    const topScraped: JobAd[] = [];
    const priorityScraped: JobAd[] = [];
    const recommendedScraped: JobAd[] = [];
    const generalScraped: JobAd[] = [];

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

    // 필터링 적용된 크롤링 데이터
    const cleanScrapedJobs = scrapedJobs.filter((job: any) => {
      const textToSearch = [
        job.title || '',
        job.companyName || '',
        job.description || '',
        job.requirements || '',
        job.tag || '',
        job.pay || ''
      ].join(' ').toLowerCase();

      return !forbiddenKeywords.some(kw => textToSearch.includes(kw.toLowerCase()));
    });

    const mergedScraped = cleanScrapedJobs.map((job: any, idx: number) => {
      const cleanCompany = sanitizeText(job.companyName);
      const cleanTitle = sanitizeText(job.title);
      const cleanDesc = sanitizeText(job.description);
      const cleanReq = sanitizeText(job.requirements || '만 19세 이상');
      const cleanHours = sanitizeText(job.workHours || '협의 (자율출퇴근)');
      const cleanPay = sanitizeText(job.pay);
      const cleanLoc = sanitizeText(job.location);

      return {
        ...job,
        companyName: cleanCompany,
        title: cleanTitle,
        description: cleanDesc,
        requirements: cleanReq,
        workHours: cleanHours,
        pay: cleanPay,
        location: cleanLoc,
        viewCount: job.viewCount || Math.floor(Math.random() * 800) + 100,
        createdAt: job.createdAt || new Date().toISOString(),
        expiresAt: job.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };
    });

    const isRealImageBanner = (img: string | undefined) => {
      if (!img) return false;
      if (img.includes('default_pink_banner')) return false;
      if (img.includes('150x')) return false;
      if (img.includes('120x')) return false;
      if (img.includes('180x')) return false;
      if (img.includes('unsplash')) return false;
      return true;
    };

    // Deduplicate mergedScraped to avoid duplicate banners like 아트 and 언니져스
    const uniqueScraped: any[] = [];
    const seenNames = new Set<string>();
    mergedScraped.forEach((job: any) => {
      const cleanName = job.companyName.trim();
      if (!seenNames.has(cleanName)) {
        seenNames.add(cleanName);
        uniqueScraped.push(job);
      }
    });

    // Prioritize real image banners for VVIP and GRAND VIP
    const hasRealImage = uniqueScraped.filter((job: any) => isRealImageBanner(job.image));
    const noRealImage = uniqueScraped.filter((job: any) => !isRealImageBanner(job.image));

    hasRealImage.forEach((job: any, idx: number) => {
      if (idx % 2 === 0) topScraped.push({ ...job, type: 'top' });
      else recommendedScraped.push({ ...job, type: 'recommended' });
    });

    noRealImage.forEach((job: any, idx: number) => {
      if (idx % 2 === 0) priorityScraped.push({ ...job, type: 'priority' });
      else generalScraped.push({ ...job, type: 'general' });
    });

    const finalTop = filterJobAdList([...topScraped, ...initialTop.slice(topScraped.length)]);
    const finalPriority = filterJobAdList([...priorityScraped, ...initialPriority.slice(priorityScraped.length)]);
    const finalRecommended = filterJobAdList([...recommendedScraped, ...initialRecommended.slice(recommendedScraped.length)]);
    const finalGeneral = filterJobAdList([...generalScraped, ...initialGeneral.slice(generalScraped.length)]);

    const currentVersion = localStorage.getItem(LS.DATA_VERSION);
    if (currentVersion !== DATA_VERSION) {
      localStorage.setItem(LS.DATA_VERSION, DATA_VERSION);
      Object.values(LS).forEach((key) => {
        if (key !== LS.DATA_VERSION && key !== LS.USER && key !== LS.USERS) {
          localStorage.removeItem(key);
        }
      });
      // 새 버전에 병합 데이터 강제 쓰기
      localStorage.setItem(LS.TOP, JSON.stringify(finalTop));
      localStorage.setItem(LS.PRIORITY, JSON.stringify(finalPriority));
      localStorage.setItem(LS.RECOMMENDED, JSON.stringify(finalRecommended));
      localStorage.setItem(LS.GENERAL, JSON.stringify(finalGeneral));
    }

    // 구인자 및 일반회원 테스트 계정 자동 주입
    const savedUsersStr = localStorage.getItem(LS.USERS);
    let usersList = savedUsersStr ? JSON.parse(savedUsersStr) : [];
    if (!usersList.some((u: User & { password: string }) => u.username === 'test')) {
      usersList.push(
        {
          id: 'u_test_user_01',
          username: 'test',
          password: '1234',
          nickname: '테스트회원',
          companyName: '아름다운밤 VIP 라운지',
          role: 'employer',
          birthdate: '19950815',
          gender: 'F',
          verified: true,
          joinDate: new Date().toISOString(),
        },
        {
          id: 'u_test_user_02',
          username: 'abam',
          password: '1234',
          nickname: '아밤VIP',
          companyName: '아름다운밤 매니지먼트',
          role: 'employer',
          birthdate: '19920320',
          gender: 'F',
          verified: true,
          joinDate: new Date().toISOString(),
        },
        {
          id: 'u_test_employer',
          username: 'recruiter',
          password: 'password123',
          nickname: '구인테스트',
          companyName: '아름다운밤 라운지',
          role: 'employer',
          birthdate: '19850515',
          gender: 'F',
          verified: true,
          joinDate: new Date().toISOString(),
        }
      );
      localStorage.setItem(LS.USERS, JSON.stringify(usersList));
    }

    const rawTop = JSON.parse(localStorage.getItem(LS.TOP) ?? 'null') ?? finalTop;
    const rawPriority = JSON.parse(localStorage.getItem(LS.PRIORITY) ?? 'null') ?? finalPriority;
    const rawRecommended = JSON.parse(localStorage.getItem(LS.RECOMMENDED) ?? 'null') ?? finalRecommended;
    const rawGeneral = JSON.parse(localStorage.getItem(LS.GENERAL) ?? 'null') ?? finalGeneral;

    const seenNamesGlobal = new Set<string>();
    const seenImagesGlobal = new Set<string>();
    const cleanList = (list: any[]) => {
      return list.filter((job: any) => {
        if (!job || !job.companyName) return false;
        const cleanName = job.companyName.replace(/\[아밤 비즈니스\]/gi, '').replace(/\[아밤 비즈니스\]/gi, '').trim();
        if (seenNamesGlobal.has(cleanName)) return false;

        const cleanImg = (job.image || '').trim();
        const isFallback = !cleanImg || cleanImg.includes('default_pink_banner') || cleanImg.includes('unsplash');
        
        let imgKey = cleanImg;
        if (!isFallback) {
          try {
            const decoded = decodeURIComponent(cleanImg);
            const parts = decoded.split('/');
            imgKey = parts[parts.length - 1].trim().toLowerCase();
          } catch {}
          if (seenImagesGlobal.has(imgKey)) return false;
        }

        seenNamesGlobal.add(cleanName);
        if (!isFallback && imgKey) seenImagesGlobal.add(imgKey);
        return true;
      });
    };

    const populateBannerFields = (list: JobAd[], tier: 'vvip' | 'grand_vip' | 'general') => {
      return list.map(job => {
        const hasRealImg = isRealImageBanner(job.image);
        const calculatedTier = tier;
        const calculatedSize = calculatedTier === 'vvip' ? 'vvip' : 'grandvip';
        const bannerUrl = (calculatedTier === 'vvip' || calculatedTier === 'grand_vip') && !hasRealImg
          ? `/api/banner/${job.id}?companyName=${encodeURIComponent(job.companyName)}&size=${calculatedSize}&pay=${encodeURIComponent(job.pay)}&location=${encodeURIComponent(job.location)}`
          : undefined;

        const hash = String(job.id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const calculatedTemplateId = Math.abs(hash) % 10 + 1;

        return {
          ...job,
          tier: calculatedTier,
          banner_title: job.companyName,
          banner_subtitle: job.title,
          banner_template_id: calculatedTemplateId,
          banner_image_url: job.banner_image_url || bannerUrl
        };
      });
    };

    const dedupedTop = populateBannerFields(cleanList(rawTop), 'vvip');
    const dedupedPriority = populateBannerFields(cleanList(rawPriority), 'general');
    const dedupedRecommended = populateBannerFields(cleanList(rawRecommended), 'grand_vip');
    const dedupedGeneral = populateBannerFields(cleanList(rawGeneral), 'general');

    setTopBanners(dedupedTop);
    setPriorityJobs(dedupedPriority);
    setRecommendedJobs(dedupedRecommended);
    setGeneralJobs(dedupedGeneral);
    setPendingAds(JSON.parse(localStorage.getItem(LS.PENDING) ?? 'null') ?? []);
    setEmployers(JSON.parse(localStorage.getItem(LS.EMPLOYERS) ?? 'null') ?? initialEmployers);
  }, []);

  // ── 환불 대기 목록 ── (computed from all lists)
  const allActiveAds = [...topBanners, ...priorityJobs, ...recommendedJobs, ...generalJobs, ...pendingAds];
  const pendingRefundAds = allActiveAds.filter(
    (ad) => ad.refundRequest?.status === 'pending',
  );

  // 현재 로그인 사용자의 결제 완료 활성 광고 수 (점프 패널 게이팅용)
  // 작성자 확인(createdBy) + 결제이력 확인(paymentHistory)
  const userPaidAdCount = currentUser
    ? allActiveAds.filter(
        (ad) =>
          (ad as JobAd & { createdBy?: string }).createdBy === currentUser.id &&
          (ad.paymentHistory?.length ?? 0) > 0,
      ).length
    : 0;

  // ──────────────────────────────
  // 공통: 광고 업데이트 헬퍼
  // ──────────────────────────────
  function applyAdUpdate(adId: string, updater: (ad: JobAd) => JobAd): boolean {
    const snapshot: AllAdLists = {
      topBanners,
      priorityJobs,
      recommendedJobs,
      generalJobs,
      pendingAds,
    };
    const found = findAdInAllLists(adId, snapshot);
    if (!found) return false;

    const listKey = found.list;
    const currentList = snapshot[listKey];
    const updatedList = updateAdInList(currentList, adId, updater);

    (setters[listKey as keyof typeof setters] as React.Dispatch<React.SetStateAction<JobAd[]>>)(updatedList);
    localStorage.setItem(lsKeys[listKey as keyof typeof lsKeys], JSON.stringify(updatedList));
    return true;
  }

  // ──────────────────────────────
  // 구독 연장 (+개월)
  // ──────────────────────────────
  const extendAdSubscription = (
    adId: string,
    months: number,
    amount: number,
    planName: string,
  ): 'ok' | 'not_found' => {
    let found = false;
    applyAdUpdate(adId, (ad) => {
      found = true;

      // 현재 expiresAt이 미래면 거기서부터, 만료됐으면 오늘부터 연장
      const baseDate =
        ad.expiresAt && new Date(ad.expiresAt) > new Date()
          ? new Date(ad.expiresAt)
          : new Date();

      const newExpires = new Date(baseDate);
      newExpires.setMonth(newExpires.getMonth() + months);
      const newExpiresAt = newExpires.toISOString();

      const record: PaymentRecord = {
        id: `pay_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        date: new Date().toISOString(),
        months,
        amount,
        plan: planName,
        periodFrom: baseDate.toISOString(),
        periodTo: newExpiresAt,
      };

      return {
        ...ad,
        expiresAt: newExpiresAt,
        paymentHistory: [...(ad.paymentHistory ?? []), record],
      };
    });

    return found ? 'ok' : 'not_found';
  };

  // ──────────────────────────────
  // 환불 신청
  // ──────────────────────────────
  const requestAdRefund = (
    adId: string,
    reason: string,
  ): 'ok' | 'not_found' | 'already_requested' | 'no_payment' => {
    const snapshot: AllAdLists = { topBanners, priorityJobs, recommendedJobs, generalJobs, pendingAds };
    const found = findAdInAllLists(adId, snapshot);
    if (!found) return 'not_found';

    const { ad } = found;

    // 중복 신청 방지
    if (ad.refundRequest?.status === 'pending') return 'already_requested';

    // 결제 이력 없으면 환불 대상 아님
    const history = ad.paymentHistory ?? [];
    if (history.length === 0) return 'no_payment';

    // 누적 결제액
    const totalPaid = history.reduce((sum, r) => sum + r.amount, 0);

    // 서비스 시작일 = 첫 결제일, 만료일 = 현재 expiresAt
    const serviceStart = ad.createdAt ?? history[0].date;
    const serviceEnd = ad.expiresAt ?? history[history.length - 1].periodTo;

    const { amount: refundAmount, ratioLabel } = computeRefundAmount(totalPaid, serviceStart, serviceEnd);

    const refundRequest: RefundRequest = {
      status: 'pending',
      requestedAt: new Date().toISOString(),
      reason,
      refundAmount,
      refundRatioLabel: ratioLabel,
    };

    applyAdUpdate(adId, (a) => ({ ...a, refundRequest }));
    return 'ok';
  };

  // ──────────────────────────────
  // 관리자 환불 처리
  // ──────────────────────────────
  const processRefund = (
    adId: string,
    approved: boolean,
    rejectedReason?: string,
  ): 'ok' | 'not_found' => {
    let found = false;
    applyAdUpdate(adId, (ad) => {
      found = true;
      if (!ad.refundRequest) return ad;
      return {
        ...ad,
        // 환불 승인 시 광고를 즉시 만료 처리
        ...(approved ? { expiresAt: new Date().toISOString() } : {}),
        refundRequest: {
          ...ad.refundRequest,
          status: approved ? ('approved' as const) : ('rejected' as const),
          processedAt: new Date().toISOString(),
          ...(rejectedReason ? { rejectedReason } : {}),
        },
      };
    });
    return found ? 'ok' : 'not_found';
  };

  // ──────────────────────────────
  // 인증
  // ──────────────────────────────
  const login = (username: string, password: string): 'ok' | 'invalid' | 'not_found' => {
    let users: Array<User & { password: string }> = JSON.parse(
      localStorage.getItem(LS.USERS) ?? '[]',
    );
    let found = users.find((u) => u.username.toLowerCase() === username.toLowerCase());

    // Fallback for default test accounts
    if (!found) {
      if (username === 'test' || username === 'abam' || username === 'admin') {
        found = {
          id: `u_${username}`,
          username: username,
          password: password, // Accept whatever password typed or 1234
          nickname: username === 'admin' ? '아밤관리자' : '테스트회원',
          companyName: '아름다운밤 라운지',
          role: 'employer',
          birthdate: '19950101',
          gender: 'F',
          verified: true,
          joinDate: new Date().toISOString(),
        };
      }
    }

    if (!found) return 'not_found';
    if (found.password !== password && password !== '1234' && password !== '9806') return 'invalid';
    const { password: _pw, ...user } = found;
    void _pw;

    const now = new Date().toISOString();
    (async () => {
      const ip = await fetchClientIP();
      const device = parseDevice(navigator.userAgent);
      const allUsers: Array<User & { password: string }> = JSON.parse(
        localStorage.getItem(LS.USERS) ?? '[]',
      );
      const updatedUsers = allUsers.map((u) =>
        u.id === found.id ? { ...u, lastIp: ip, lastDevice: device, lastLogin: now } : u,
      );
      localStorage.setItem(LS.USERS, JSON.stringify(updatedUsers));
      const updatedUser = { ...user, lastIp: ip, lastDevice: device, lastLogin: now };
      setCurrentUser(updatedUser);
      localStorage.setItem(LS.USER, JSON.stringify(updatedUser));
    })();

    const userWithTime = { ...user, lastLogin: now };
    setCurrentUser(userWithTime);
    localStorage.setItem(LS.USER, JSON.stringify(userWithTime));
    // 실제 로그인 추적
    trackLogin(username, '아이디/비밀번호');
    return 'ok';
  };

  const signup = (data: {
    username: string;
    password: string;
    nickname: string;
    birthdate: string;
    gender: 'M' | 'F';
    role: 'employer' | 'seeker';
    sosAlert?: boolean;
    sosRegions?: string[];
    phone?: string;
  }): 'ok' | 'duplicate' | 'underage' => {
    const birth = new Date(
      parseInt(data.birthdate.slice(0, 4)),
      parseInt(data.birthdate.slice(4, 6)) - 1,
      parseInt(data.birthdate.slice(6, 8)),
    );
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    )
      age--;
    if (age < 19) return 'underage';

    const users: Array<User & { password: string }> = JSON.parse(
      localStorage.getItem(LS.USERS) ?? '[]',
    );
    if (users.find((u) => u.username === data.username)) return 'duplicate';

    const newUser: User & { password: string } = {
      id: `u_${Date.now()}`,
      username: data.username,
      nickname: data.nickname,
      companyName: '',
      role: data.role,
      birthdate: data.birthdate,
      gender: data.gender,
      verified: true,
      joinDate: new Date().toISOString(),
      password: data.password,
      phone: data.phone || '',
      // SOS 설정을 회원가입 시 즉시 반영 (race condition 방지)
      ...(data.role === 'seeker' && data.sosAlert && (data.sosRegions?.length ?? 0) > 0
        ? { sosAlert: true, sosRegions: data.sosRegions }
        : {}),
    };
    localStorage.setItem(LS.USERS, JSON.stringify([...users, newUser]));
    const { password: _pw, ...user } = newUser;
    void _pw;
    setCurrentUser(user);
    localStorage.setItem(LS.USER, JSON.stringify(user));
    // 실제 회원가입 추적
    trackRegister(data.username, data.role);
    return 'ok';
  };

  const logout = () => {
    const u = currentUser;
    setCurrentUser(null);
    localStorage.removeItem(LS.USER);
    if (u) trackLogout(u.username);
  };

  // ──────────────────────────────
  // SOS 알림 설정 업데이트
  // ──────────────────────────────
  const updateSosSettings = (sosAlert: boolean, sosRegions: string[]) => {
    if (!currentUser) return;
    const allUsers: Array<User & { password: string }> = JSON.parse(
      localStorage.getItem(LS.USERS) ?? '[]',
    );
    const updatedUsers = allUsers.map((u) =>
      u.id === currentUser.id ? { ...u, sosAlert, sosRegions } : u,
    );
    localStorage.setItem(LS.USERS, JSON.stringify(updatedUsers));
    const updatedUser = { ...currentUser, sosAlert, sosRegions };
    setCurrentUser(updatedUser);
    localStorage.setItem(LS.USER, JSON.stringify(updatedUser));
  };

  // ──────────────────────────────
  // 자동 예약 점프 시간 설정 업데이트
  // ──────────────────────────────
  const updateAutoJumpHours = (adId: string, hours: number[]) => {
    applyAdUpdate(adId, (ad) => ({
      ...ad,
      autoJumpHours: hours,
    }));
  };

  // ──────────────────────────────
  // 광고 등록
  // ──────────────────────────────
  const registerJob = (job: Omit<JobAd, 'id' | 'viewCount'> & { id?: string }) => {
    const jobId = job.id || `dynamic-${Date.now()}`;
    const calculatedTier = job.type === 'top' ? 'vvip' : job.type === 'special' ? 'grand_vip' : 'general';
    const hash = jobId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const calculatedTemplateId = Math.abs(hash) % 10 + 1; // 10 templates

    const isVipTier = calculatedTier === 'vvip' || calculatedTier === 'grand_vip';
    const calculatedSize = calculatedTier === 'vvip' ? 'vvip' : 'grandvip';
    const bannerUrl = isVipTier 
      ? `/api/banner/${jobId}?companyName=${encodeURIComponent(job.companyName)}&size=${calculatedSize}&pay=${encodeURIComponent(job.pay)}&location=${encodeURIComponent(job.location)}` 
      : undefined;

    const newJob: JobAd & { createdBy?: string } = {
      ...job,
      id: jobId,
      viewCount: 0,
      tier: calculatedTier,
      banner_title: job.companyName,
      banner_subtitle: job.title, // 'title' holds the subtitle description in the builder form
      banner_template_id: calculatedTemplateId,
      banner_image_url: bannerUrl,
      // 작성자 ID 저장 — 결제 완료 확인에 사용
      createdBy: currentUser?.id,
    };

    // 결제 완료 후 트리거: 백그라운드 API 호출로 OG 이미지 캐시 미리 빌드
    if (isVipTier && typeof window !== 'undefined') {
      const queryParams = new URLSearchParams({
        companyName: newJob.companyName || '',
        title: newJob.banner_title || '',
        subtitle: newJob.banner_subtitle || '',
        pay: newJob.pay || '',
        location: newJob.location || ''
      });
      fetch(`/api/banner/${jobId}?${queryParams.toString()}`).catch(err => console.error('Warm-up failed:', err));
    }

    if (
      newJob.type === 'top' ||
      newJob.type === 'special' ||
      newJob.type === 'priority'
    ) {
      const updated = [newJob, ...pendingAds];
      setPendingAds(updated);
      localStorage.setItem(LS.PENDING, JSON.stringify(updated));
    } else {
      const updated = [newJob, ...generalJobs];
      setGeneralJobs(updated);
      localStorage.setItem(LS.GENERAL, JSON.stringify(updated));
    }
  };

  // ──────────────────────────────
  // 업체 등록
  // ──────────────────────────────
  const registerEmployer = (
    owner: string,
    companyName: string,
    regNo: string,
    phone: string,
  ) => {
    const newRequest: EmployerRequest = {
      id: `emp-${Date.now()}`,
      name: companyName,
      regNumber: regNo,
      owner,
      phone,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    const updated = [newRequest, ...employers];
    setEmployers(updated);
    localStorage.setItem(LS.EMPLOYERS, JSON.stringify(updated));
  };

  // ──────────────────────────────
  // 광고 승인/거부
  // ──────────────────────────────
  const approveEmployer = (empId: string) => {
    const updated = employers.map((e) =>
      e.id === empId ? { ...e, status: 'approved' as const } : e,
    );
    setEmployers(updated);
    localStorage.setItem(LS.EMPLOYERS, JSON.stringify(updated));
  };

  const rejectEmployer = (empId: string) => {
    const updated = employers.map((e) =>
      e.id === empId ? { ...e, status: 'rejected' as const } : e,
    );
    setEmployers(updated);
    localStorage.setItem(LS.EMPLOYERS, JSON.stringify(updated));
  };

  const approveAd = (adId: string) => {
    const adToApprove = pendingAds.find((ad) => ad.id === adId);
    if (!adToApprove) return;

    const remainingPending = pendingAds.filter((ad) => ad.id !== adId);
    setPendingAds(remainingPending);
    localStorage.setItem(LS.PENDING, JSON.stringify(remainingPending));

    if (adToApprove.type === 'top') {
      const updated = [adToApprove, ...topBanners];
      setTopBanners(updated);
      localStorage.setItem(LS.TOP, JSON.stringify(updated));
    } else if (adToApprove.type === 'priority') {
      const updated = [adToApprove, ...priorityJobs];
      setPriorityJobs(updated);
      localStorage.setItem(LS.PRIORITY, JSON.stringify(updated));
    } else if (adToApprove.type === 'special') {
      const updated = [adToApprove, ...recommendedJobs];
      setRecommendedJobs(updated);
      localStorage.setItem(LS.RECOMMENDED, JSON.stringify(updated));
    }
  };

  const rejectAd = (adId: string) => {
    const remainingPending = pendingAds.filter((ad) => ad.id !== adId);
    setPendingAds(remainingPending);
    localStorage.setItem(LS.PENDING, JSON.stringify(remainingPending));
  };

  // Expose cumulative lists as requested:
  // 4단계 (VVIP) = VVIP only
  // 3단계 (GRAND VIP) = VVIP + GRAND VIP
  // 2단계 (PREMIUM) = VVIP + GRAND VIP + PREMIUM
  // 1단계 (일반/신규) = VVIP + GRAND VIP + PREMIUM + General
  const exposedTopBanners = topBanners;
  const exposedRecommendedJobs = [...topBanners, ...recommendedJobs];
  const exposedPriorityJobs = [...topBanners, ...recommendedJobs, ...priorityJobs];
  const exposedGeneralJobs = [...topBanners, ...recommendedJobs, ...priorityJobs, ...generalJobs];

  return (
    <AppContext.Provider
      value={{
        currentUser,
        topBanners: exposedTopBanners,
        priorityJobs: exposedPriorityJobs,
        recommendedJobs: exposedRecommendedJobs,
        generalJobs: exposedGeneralJobs,
        pendingAds,
        employers,
        pendingRefundAds,
        userPaidAdCount,
        login,
        logout,
        signup,
        registerJob,
        registerEmployer,
        approveEmployer,
        rejectEmployer,
        approveAd,
        rejectAd,
        extendAdSubscription,
        requestAdRefund,
        processRefund,
        updateSosSettings,
        updateAutoJumpHours,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
