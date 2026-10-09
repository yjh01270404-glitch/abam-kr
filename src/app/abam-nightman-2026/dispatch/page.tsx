'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────────────────────
   아밤(ABAM) 통합 배차 관제 시스템 (Dispatcher Terminal)
   - 순수 실무형 엔터프라이즈 모빌리티 관제 터미널
   - AI 특유의 배지 남발, 화려한 컬러, 겹치는 툴팁 박스 전면 제거
   - 실제 네이버지도/티맵 스타일의 미니멀 마커 + 깨끗한 도로망 실사 지도
   - 고밀도 실무 데이터 테이블 (매니저 출근부 / 차량 배차 그리드)
   - 기사 ➔ 매니저 ➔ 고객 3자 이동 동선 실선/화살표 및 일원화된 타임라인
───────────────────────────────────────────────────────────── */

type Role = 'boss' | 'driver' | 'manager';

interface Manager {
  id: string;
  name: string;
  status: 'standby' | 'working' | 'transit' | 'offline';
  count: number;
  lat: number;
  lng: number;
  location: string;
  remainingMinutes?: number;
}

interface Driver {
  id: string;
  carNum: string;
  name: string;
  status: 'standby' | 'transit' | 'offline';
  lat: number;
  lng: number;
  location: string;
  etaMinutes: number;
}

interface Mission {
  id: string;
  customerName: string;
  address: string;
  room: string;
  course: string;
  price: string;
  memo: string;
  managerId: string;
  driverId: string;
  stage: 'moving' | 'working' | 'pickup_ready';
  subStage?: 'pickup' | 'delivery'; // 픽업 이동중 vs 고객 도착 이동중
  startLat?: number;
  startLng?: number;
  pickupLat?: number;
  pickupLng?: number;
  destLat: number;
  destLng: number;
  step1Eta: number; // 기사 ➔ 매니저 (분)
  step2Eta: number; // 매니저 ➔ 고객 (분)
  totalEta: number; // 잔여 총 분
  remainingSeconds: number; // 실시간 초단위 카운트다운
  expectedArrivalStr: string; // 실시간 예상 도착 시각 (예: 13:18)
  distKm: number;
  remainingMinutes?: number;
}

export default function DispatcherTerminal() {
  const [role, setRole] = useState<Role>('boss');
  const [selectedDriverUserId, setSelectedDriverUserId] = useState<string>('d1'); // 기사 본인 계정 (기본 1호차)
  const [selectedManagerUserId, setSelectedManagerUserId] = useState<string>('m1'); // 매니저 본인 계정 (기본 가빈)
  const [isBossLocked, setIsBossLocked] = useState<boolean>(false);
  const [bossPinInput, setBossPinInput] = useState<string>('');

  const [currentTime, setCurrentTime] = useState<string>('02:24:15');
  const [simSpeed, setSimSpeed] = useState<number>(1); // 시뮬레이션 배속 (1x, 2x, 5x)
  const [simTimeSeconds, setSimTimeSeconds] = useState<number>(2 * 3600 + 24 * 60 + 15); // 야간 피크 02:24:15 시작
  const [incomingToast, setIncomingToast] = useState<{ title: string; desc: string } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersRef = useRef<{ [key: string]: any }>({});

  // URL 쿼리에 따른 단말기 역할 자동 잠금
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlRole = params.get('role') as Role;
      if (urlRole === 'driver') {
        setRole('driver');
        const drvId = params.get('id');
        if (drvId) setSelectedDriverUserId(drvId);
      } else if (urlRole === 'manager') {
        setRole('manager');
        const mgrId = params.get('id');
        if (mgrId) setSelectedManagerUserId(mgrId);
      }
    }
  }, []);

  // 1. 매니저 출근 데이터 (서울 전 권역 야간 피크타임 실출근 16명)
  const [managers, setManagers] = useState<Manager[]>([
    // 강남·서초권
    { id: 'm1', name: '가빈', status: 'working', count: 3, lat: 37.5038, lng: 127.0415, location: '역삼동 신라스테이 (입실)', remainingMinutes: 22 },
    { id: 'm2', name: '송이', status: 'transit', count: 3, lat: 37.5052, lng: 127.0498, location: '선릉역 ➔ 1호차 탑승 이동' },
    { id: 'm3', name: '보름', status: 'standby', count: 2, lat: 37.4985, lng: 127.0285, location: '강남역 11번출구 앞 대기' },
    { id: 'm4', name: '수지', status: 'transit', count: 3, lat: 37.5042, lng: 127.0048, location: '반포 센트럴 ➔ 2호차 탑승' },

    // 송파·강동권
    { id: 'm5', name: '예린', status: 'transit', count: 2, lat: 37.5135, lng: 127.1008, location: '잠실 롯데월드몰 ➔ 3호차 탑승' },
    { id: 'm6', name: '하린', status: 'standby', count: 2, lat: 37.5385, lng: 127.1265, location: '천호 로데오거리 대기' },

    // 마포·영등포·신촌권
    { id: 'm7', name: '서아', status: 'transit', count: 3, lat: 37.5572, lng: 126.9245, location: '홍대입구역 ➔ 4호차 탑승' },
    { id: 'm8', name: '유진', status: 'standby', count: 1, lat: 37.5445, lng: 126.9515, location: '마포 공덕역 부근 대기' },
    { id: 'm9', name: '채원', status: 'working', count: 4, lat: 37.5255, lng: 126.9265, location: '여의도 콘래드호텔 (입실)', remainingMinutes: 41 },
    { id: 'm16', name: '소율', status: 'transit', count: 2, lat: 37.4842, lng: 126.9295, location: '신림 ➔ 5호차 탑승 이동' },

    // 종로·중구·도심권
    { id: 'm10', name: '은비', status: 'standby', count: 2, lat: 37.5718, lng: 126.9915, location: '종로3가 익선동 대기' },
    { id: 'm11', name: '지우', status: 'working', count: 3, lat: 37.5645, lng: 126.9818, location: '명동 롯데호텔 앞 (퇴실임박)', remainingMinutes: 4 },
    { id: 'm12', name: '나연', status: 'standby', count: 2, lat: 37.5298, lng: 126.9645, location: '용산 아이파크몰 대기' },

    // 성수·광진·동대문권
    { id: 'm13', name: '민서', status: 'transit', count: 3, lat: 37.5405, lng: 127.0695, location: '건대입구 ➔ 7호차 탑승' },
    { id: 'm14', name: '다은', status: 'standby', count: 1, lat: 37.5448, lng: 127.0565, location: '성수 카페거리 대기' },
    { id: 'm15', name: '시은', status: 'standby', count: 1, lat: 37.5665, lng: 127.0095, location: '동대문 두타 앞 대기' },
  ]);

  // 2. 기사 출근 데이터 (서울 7대 핵심 거점 전원 가동)
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: 'd1', carNum: '1호차', name: '김기사(강남)', status: 'transit', lat: 37.5025, lng: 127.0425, location: '테헤란로 ➔ 서초대로 주행중', etaMinutes: 8 },
    { id: 'd2', carNum: '2호차', name: '박기사(서초)', status: 'transit', lat: 37.5075, lng: 127.0095, location: '반포 삼호가든 ➔ 서초동 이동', etaMinutes: 5 },
    { id: 'd3', carNum: '3호차', name: '최기사(송파)', status: 'transit', lat: 37.5145, lng: 127.0855, location: '잠실 종합운동장 ➔ 방이동', etaMinutes: 7 },
    { id: 'd4', carNum: '4호차', name: '이기사(마포)', status: 'transit', lat: 37.5512, lng: 126.9155, location: '합정·홍대 ➔ 마포대로 이동', etaMinutes: 4 },
    { id: 'd5', carNum: '5호차', name: '정기사(여의도)', status: 'transit', lat: 37.5185, lng: 126.9215, location: '신림 ➔ 여의도 주행중', etaMinutes: 9 },
    { id: 'd6', carNum: '6호차', name: '강기사(종로)', status: 'standby', lat: 37.5702, lng: 126.9825, location: '종로 광화문·종각 거점 대기', etaMinutes: 0 },
    { id: 'd7', carNum: '7호차', name: '윤기사(성수/건대)', status: 'transit', lat: 37.5422, lng: 127.0615, location: '성수역 ➔ 건대 화양동 주행', etaMinutes: 11 },
  ]);

  // 3. 운행 오더 (서울 6대 거점 실시간 동시 운행 6건 + 입실 관리 3건)
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: '9105',
      customerName: '서초VIP',
      address: '서초구 서초대로 301',
      room: '502호',
      course: '아로마 90분',
      price: '130,000',
      memo: '도착 전 전화 필수 (노크 금지)',
      managerId: 'm2',
      driverId: 'd1',
      stage: 'moving',
      subStage: 'delivery',
      startLat: 37.5025,
      startLng: 127.0425,
      pickupLat: 37.5052,
      pickupLng: 127.0498,
      destLat: 37.4938,
      destLng: 127.0142,
      step1Eta: 2,
      step2Eta: 8,
      totalEta: 8,
      remainingSeconds: 480,
      expectedArrivalStr: '02:32',
      distKm: 4.2,
    },
    {
      id: '9108',
      customerName: '반포리더',
      address: '서초구 반포동 래미안퍼스티지',
      room: '103동 1204호',
      course: 'VIP스웨디시 90분',
      price: '160,000',
      memo: '지하 2층 주차장 기둥 B04 앞',
      managerId: 'm4',
      driverId: 'd2',
      stage: 'moving',
      subStage: 'delivery',
      startLat: 37.5075,
      startLng: 127.0095,
      pickupLat: 37.5042,
      pickupLng: 127.0048,
      destLat: 37.5015,
      destLng: 127.0012,
      step1Eta: 1,
      step2Eta: 5,
      totalEta: 5,
      remainingSeconds: 300,
      expectedArrivalStr: '02:29',
      distKm: 2.6,
    },
    {
      id: '9112',
      customerName: '잠실호텔',
      address: '송파구 방이동 호텔더엠',
      room: '602호',
      course: '힐링아로마 120분',
      price: '150,000',
      memo: '프런트 거치지 말고 엘리베이터 직행',
      managerId: 'm5',
      driverId: 'd3',
      stage: 'moving',
      subStage: 'delivery',
      startLat: 37.5145,
      startLng: 127.0855,
      pickupLat: 37.5135,
      pickupLng: 127.1008,
      destLat: 37.5165,
      destLng: 127.1120,
      step1Eta: 2,
      step2Eta: 7,
      totalEta: 7,
      remainingSeconds: 420,
      expectedArrivalStr: '02:31',
      distKm: 3.4,
    },
    {
      id: '9201',
      customerName: '마포골드',
      address: '마포구 마포대로 130 한화오벨리스크',
      room: '803호',
      course: '타이 90분',
      price: '110,000',
      memo: '지하 1층 주차장 픽업요청 (벨금지)',
      managerId: 'm7',
      driverId: 'd4',
      stage: 'moving',
      subStage: 'delivery',
      startLat: 37.5512,
      startLng: 126.9155,
      pickupLat: 37.5572,
      pickupLng: 126.9245,
      destLat: 37.5405,
      destLng: 126.9535,
      step1Eta: 1,
      step2Eta: 4,
      totalEta: 4,
      remainingSeconds: 240,
      expectedArrivalStr: '02:28',
      distKm: 2.8,
    },
    {
      id: '9205',
      customerName: '여의도아이비',
      address: '영등포구 여의도동 롯데캐슬아이비',
      room: '1402호',
      course: '아로마 90분',
      price: '130,000',
      memo: '도착 5분 전 문자 필수',
      managerId: 'm16',
      driverId: 'd5',
      stage: 'moving',
      subStage: 'delivery',
      startLat: 37.5185,
      startLng: 126.9215,
      pickupLat: 37.4842,
      pickupLng: 126.9295,
      destLat: 37.5215,
      destLng: 126.9310,
      step1Eta: 3,
      step2Eta: 9,
      totalEta: 9,
      remainingSeconds: 540,
      expectedArrivalStr: '02:33',
      distKm: 3.9,
    },
    {
      id: '9304',
      customerName: '건대클래식',
      address: '광진구 화양동 더클래식500',
      room: '1501호',
      course: 'VIP스웨디시 120분',
      price: '180,000',
      memo: '조용히 입실요망 (카드키 소지)',
      managerId: 'm13',
      driverId: 'd7',
      stage: 'moving',
      subStage: 'delivery',
      startLat: 37.5422,
      startLng: 127.0615,
      pickupLat: 37.5405,
      pickupLng: 127.0695,
      destLat: 37.5435,
      destLng: 127.0725,
      step1Eta: 2,
      step2Eta: 11,
      totalEta: 11,
      remainingSeconds: 660,
      expectedArrivalStr: '02:35',
      distKm: 3.1,
    },
    // 입실 관리중 오더 (working)
    {
      id: '8902',
      customerName: '역삼신라',
      address: '강남구 역삼동 신라스테이',
      room: '1204호',
      course: '타이 90분',
      price: '100,000',
      memo: '노크 2번 (벨 금지)',
      managerId: 'm1',
      driverId: 'd1',
      stage: 'working',
      destLat: 37.5038,
      destLng: 127.0415,
      step1Eta: 0,
      step2Eta: 0,
      totalEta: 0,
      remainingSeconds: 0,
      expectedArrivalStr: '입실진행중',
      distKm: 1.4,
      remainingMinutes: 22,
    },
    {
      id: '8905',
      customerName: '여의도콘래드',
      address: '영등포구 여의도 콘래드호텔',
      room: '2301호',
      course: 'VIP 120분',
      price: '180,000',
      memo: '룸서비스 호출 금지',
      managerId: 'm9',
      driverId: 'd5',
      stage: 'working',
      destLat: 37.5255,
      destLng: 126.9265,
      step1Eta: 0,
      step2Eta: 0,
      totalEta: 0,
      remainingSeconds: 0,
      expectedArrivalStr: '입실진행중',
      distKm: 2.1,
      remainingMinutes: 41,
    },
    {
      id: '8909',
      customerName: '명동프라자',
      address: '중구 명동 롯데호텔 앞 프라자오피스텔',
      room: '702호',
      course: '아로마 90분',
      price: '120,000',
      memo: '퇴실 5분전 1층 로비 픽업 대기',
      managerId: 'm11',
      driverId: 'd6',
      stage: 'pickup_ready',
      destLat: 37.5645,
      destLng: 126.9818,
      step1Eta: 0,
      step2Eta: 0,
      totalEta: 0,
      remainingSeconds: 0,
      expectedArrivalStr: '퇴실임박',
      distKm: 1.2,
      remainingMinutes: 4,
    },
  ]);

  // 배차 입력 폼 (기본값: 서울 중심)
  const [inputAddress, setInputAddress] = useState('마포구 홍대입구역 9번출구 앞');
  const [inputRoom, setInputRoom] = useState('704호');
  const [inputCustomer, setInputCustomer] = useState('홍대VIP');
  const [inputCourse, setInputCourse] = useState('아로마 90분');
  const [inputMemo, setInputMemo] = useState('도착 5분전 연락');
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number }>({ lat: 37.5572, lng: 126.9245 });

  // 지도 & 네비게이션 최적화 엔진 상태 (실제 서울 도로와 지명이 선명한 국토부 VWorld 기본값)
  const [mapTheme, setMapTheme] = useState<'carto-dark' | 'vworld' | 'satellite' | 'standard'>('vworld');
  const [showTraffic, setShowTraffic] = useState<boolean>(false);
  const [showDispatchPreview, setShowDispatchPreview] = useState<boolean>(false);
  const [trafficCondition, setTrafficCondition] = useState<'fast' | 'normal' | 'heavy'>('normal');
  const trafficMultiplier = trafficCondition === 'fast' ? 0.8 : trafficCondition === 'heavy' ? 1.35 : 1.0;
  const [viewFilter, setViewFilter] = useState<'all' | 'moving' | 'standby'>('all');
  const tileLayerRef = useRef<any>(null);
  const trafficLayerRef = useRef<any[]>([]);

  // 대한민국 3대 네비게이션 (T맵, 카카오내비, 네이버내비) 모바일 딥링크 및 PC 웹 폴백 연동 유틸리티
  const launchNavigation = (appName: 'tmap' | 'kakao' | 'naver', targetName: string, lat: number, lng: number) => {
    if (typeof window === 'undefined') return;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const encodedName = encodeURIComponent(targetName);

    if (appName === 'tmap') {
      if (isMobile) {
        // T맵 앱 실행 (목적지 자동 설정 및 안내 시작)
        window.location.href = `tmap://route?goalname=${encodedName}&goalx=${lng}&goaly=${lat}`;
        setTimeout(() => {
          window.open(`https://map.kakao.com/link/to/${encodedName},${lat},${lng}`, '_blank');
        }, 1500);
      } else {
        window.open(`https://map.kakao.com/link/to/${encodedName},${lat},${lng}`, '_blank');
      }
    } else if (appName === 'kakao') {
      if (isMobile) {
        // 카카오내비 앱 실행
        window.location.href = `kakaonavi://navigate?name=${encodedName}&x=${lng}&y=${lat}&coord_type=wgs84`;
        setTimeout(() => {
          window.open(`https://map.kakao.com/link/to/${encodedName},${lat},${lng}`, '_blank');
        }, 1500);
      } else {
        window.open(`https://map.kakao.com/link/to/${encodedName},${lat},${lng}`, '_blank');
      }
    } else if (appName === 'naver') {
      if (isMobile) {
        // 네이버 지도 내비 앱 실행
        window.location.href = `nmap://navigation?dlat=${lat}&dlng=${lng}&dname=${encodedName}&appname=abam.kr`;
        setTimeout(() => {
          window.open(`https://map.naver.com/v5/directions/-/${lat},${lng},${encodedName}/-/car`, '_blank');
        }, 1500);
      } else {
        window.open(`https://map.naver.com/v5/directions/-/${lat},${lng},${encodedName}/-/car`, '_blank');
      }
    }
  };

  // 카카오 로드뷰 (거리뷰)로 건물 입구/주차장 사전 파악
  const openKakaoRoadview = (lat: number, lng: number) => {
    window.open(`https://map.kakao.com/link/roadview/${lat},${lng}`, '_blank');
  };

  // 2점 간 실제 구면/평면 투영 거리 계산 (km)
  const calcDistanceKm = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const dLat = (lat1 - lat2) * 111;
    const dLng = (lng1 - lng2) * 88.8;
    return Math.sqrt(dLat * dLat + dLng * dLng);
  };

  // 🧠 [실시간 다차원 최적 배차 엔진]: 대기 기사 × 대기 매니저 전체 조합의 거리, 시간, 갯수 실시간 스코어링
  const dispatchCandidates = useMemo(() => {
    const standbyMgrs = managers.filter((m) => m.status === 'standby');
    const activeDrivers = drivers.filter((d) => d.status !== 'offline');

    const list: Array<{
      driver: Driver;
      manager: Manager;
      distDrvToMgr: number;
      distMgrToDest: number;
      totalDist: number;
      eta1: number;
      eta2: number;
      totalEta: number;
      score: number;
      isFarDriver: boolean;
      isFarManager: boolean;
    }> = [];

    activeDrivers.forEach((drv) => {
      standbyMgrs.forEach((mgr) => {
        const dist1 = calcDistanceKm(drv.lat, drv.lng, mgr.lat, mgr.lng);
        const dist2 = calcDistanceKm(mgr.lat, mgr.lng, selectedCoords.lat, selectedCoords.lng);
        const eta1 = Math.max(2, Math.round(dist1 * 2.3 * trafficMultiplier));
        const eta2 = Math.max(3, Math.round(dist2 * 2.6 * trafficMultiplier));
        const totalEta = eta1 + eta2;
        const totalDist = Number((dist1 + dist2).toFixed(1));

        // 기사가 5.5km 초과 또는 픽업시간 13분 초과 시 "동떨어진 기사"로 판정
        const isFarDriver = dist1 > 5.0 || eta1 > 13;
        const isFarManager = dist2 > 6.5 || eta2 > 16;

        // 최적화 종합 스코어: 총시간(1.2) + 기사공차거리(2.5) + 매니저갯수(개당 3.2점 페널티) + 원거리패널티(25)
        const score = totalEta * 1.2 + dist1 * 2.5 + mgr.count * 3.2 + (isFarDriver ? 30 : 0);

        list.push({
          driver: drv,
          manager: mgr,
          distDrvToMgr: Number(dist1.toFixed(1)),
          distMgrToDest: Number(dist2.toFixed(1)),
          totalDist,
          eta1,
          eta2,
          totalEta,
          score,
          isFarDriver,
          isFarManager,
        });
      });
    });

    list.sort((a, b) => a.score - b.score);
    return list;
  }, [managers, drivers, selectedCoords, trafficMultiplier]);

  // 1순위: 종합 최적 추천 (효율 극대화)
  const bestCandidate = dispatchCandidates[0];
  // 2순위: 최단 도착 추천 (긴급콜용)
  const fastestCandidate = [...dispatchCandidates].sort((a, b) => a.totalEta - b.totalEta)[0];
  // 3순위: 갯수 밸런스 추천 (수당 공평용)
  const balancedCandidate = [...dispatchCandidates].sort((a, b) => a.manager.count - b.manager.count || a.totalEta - b.totalEta)[0];

  const standbyManagers = managers
    .filter((m) => m.status === 'standby')
    .sort((a, b) => a.count - b.count);
  const bestManager = bestCandidate?.manager || standbyManagers[0];
  const bestDriver = bestCandidate?.driver || drivers.find((d) => d.status === 'standby') || drivers[0];

  // 배차 선택 상태
  const [selectedManagerId, setSelectedManagerId] = useState<string>(bestCandidate?.manager.id || '');
  const [selectedDriverId, setSelectedDriverId] = useState<string>(bestCandidate?.driver.id || '');
  // 목적지 클릭 시 누가 오고 있는지 및 총 소요시간을 직관적으로 확인하기 위한 선택된 미션 상태
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);

  // 초기 자동 바인딩
  useEffect(() => {
    if (bestCandidate && !selectedManagerId) {
      setSelectedManagerId(bestCandidate.manager.id);
      setSelectedDriverId(bestCandidate.driver.id);
    }
  }, [bestCandidate]);

  // 현재 선택된 매니저 & 기사 분석
  const previewMgr = managers.find((m) => m.id === selectedManagerId) || bestCandidate?.manager || managers[0];
  const previewDrv = drivers.find((d) => d.id === selectedDriverId) || bestCandidate?.driver || drivers[0];

  const previewDist1 = previewMgr && previewDrv ? calcDistanceKm(previewDrv.lat, previewDrv.lng, previewMgr.lat, previewMgr.lng) : 0;
  const previewDist2 = previewMgr ? calcDistanceKm(previewMgr.lat, previewMgr.lng, selectedCoords.lat, selectedCoords.lng) : 0;

  const previewEta1 = Math.max(2, Math.round(previewDist1 * 2.3 * trafficMultiplier));
  const previewEta2 = Math.max(3, Math.round(previewDist2 * 2.6 * trafficMultiplier));
  const previewTotalEta = previewEta1 + previewEta2;

  // 🚨 [동떨어진 기사/매니저 경고 판정]
  const isSelectedDriverFar = previewDist1 > 5.0 || previewEta1 > 13;
  const isSelectedManagerFar = previewDist2 > 6.5 || previewEta2 > 16;
  const hasRouteInefficiency = isSelectedDriverFar || isSelectedManagerFar;

  // 기사 출동 지령 팝업 모달 상태
  const [dispatchOrderModal, setDispatchOrderModal] = useState<{
    driverName: string;
    carNum: string;
    managerName: string;
    managerLoc: string;
    destAddress: string;
    room: string;
    course: string;
    memo: string;
    step1Eta: number;
    step2Eta: number;
    totalEta: number;
  } | null>(null);

  // 5분전 퇴실 픽업 약속 모달 상태 (1층, 지하주차장 등)
  const [exitCallModal, setExitCallModal] = useState<{
    missionId: string;
    managerName: string;
    driverName: string;
    room: string;
  } | null>(null);

  // 🌟 [실시간 야간 피크타임 라이브 영업 시뮬레이터 엔진]
  useEffect(() => {
    let tickCount = 0;

    const t = setInterval(() => {
      tickCount += 1;

      // 1. 야간 피크타임 시계 전진 (새벽 02시 골든타임 기준)
      setSimTimeSeconds((prevSec) => {
        const nextSec = prevSec + simSpeed;
        const h = Math.floor(nextSec / 3600) % 24;
        const m = Math.floor((nextSec % 3600) / 60);
        const s = nextSec % 60;
        setCurrentTime(
          `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
        );
        return nextSec;
      });

      // 2. 주행 중인 미션(stage === 'moving')의 실시간 도로 주행 및 소요시간 카운트다운
      setMissions((prevMissions) => {
        const updated = prevMissions.map((mis) => {
          // 입실 중인 건: 60초마다 1분씩 관리 타이머 감소
          if (mis.stage === 'working') {
            if (tickCount % 6 === 0 && mis.remainingMinutes && mis.remainingMinutes > 0) {
              const nextMin = mis.remainingMinutes - 1;
              if (nextMin <= 5) {
                return { ...mis, remainingMinutes: nextMin, stage: 'pickup_ready' as const, expectedArrivalStr: '퇴실임박' };
              }
              return { ...mis, remainingMinutes: nextMin };
            }
            return mis;
          }

          if (mis.stage !== 'moving') return mis;

          const stepSec = simSpeed;
          const nextSec = Math.max(0, mis.remainingSeconds - stepSec);
          const nextMin = Math.ceil(nextSec / 60);

          const totalDurationSec = (mis.step1Eta + mis.step2Eta) * 60;
          const elapsedSec = totalDurationSec - nextSec;
          const step1Sec = mis.step1Eta * 60;

          const isPickupPhase = elapsedSec < step1Sec;
          const subStage: 'pickup' | 'delivery' = isPickupPhase ? 'pickup' : 'delivery';

          // 기사의 실제 실시간 좌표 보간 (도로 위를 전진)
          let currentDrvLat = mis.startLat || 37.5020;
          let currentDrvLng = mis.startLng || 127.0440;
          let currentMgrLat = mis.pickupLat || 37.5052;
          let currentMgrLng = mis.pickupLng || 127.0498;

          if (isPickupPhase) {
            const r1 = Math.min(1, Math.max(0, elapsedSec / step1Sec));
            currentDrvLat = (mis.startLat || 37.5020) + ((mis.pickupLat || 37.5052) - (mis.startLat || 37.5020)) * r1;
            currentDrvLng = (mis.startLng || 127.0440) + ((mis.pickupLng || 127.0498) - (mis.startLng || 127.0440)) * r1;
          } else {
            const r2 = Math.min(1, Math.max(0, (elapsedSec - step1Sec) / (mis.step2Eta * 60)));
            currentDrvLat = (mis.pickupLat || 37.5052) + (mis.destLat - (mis.pickupLat || 37.5052)) * r2;
            currentDrvLng = (mis.pickupLng || 127.0498) + (mis.destLng - (mis.pickupLng || 127.0498)) * r2;
            currentMgrLat = currentDrvLat;
            currentMgrLng = currentDrvLng;
          }

          // 기사 및 매니저 상태에 실시간 좌표 반영
          setDrivers((prevD) =>
            prevD.map((d) =>
              d.id === mis.driverId
                ? {
                    ...d,
                    lat: currentDrvLat,
                    lng: currentDrvLng,
                    etaMinutes: nextMin,
                    location: isPickupPhase ? '매니저 픽업 이동중' : '고객지 주행중',
                  }
                : d
            )
          );

          setManagers((prevM) =>
            prevM.map((m) =>
              m.id === mis.managerId
                ? { ...m, lat: currentMgrLat, lng: currentMgrLng, location: isPickupPhase ? '픽업 대기중' : '차량 탑승 이동중' }
                : m
            )
          );

          if (nextSec <= 0) {
            // 고객지에 최종 도착 ➔ 문 앞 입실 관리 모드로 자동 전환
            return {
              ...mis,
              stage: 'working' as const,
              remainingMinutes: 90,
              remainingSeconds: 0,
              expectedArrivalStr: '도착완료',
            };
          }

          return {
            ...mis,
            subStage,
            remainingSeconds: nextSec,
            totalEta: nextMin,
          };
        });

        return updated;
      });

      // 3. 주기적 신규 예약콜 인커밍 시뮬레이션 (35초마다 발생)
      if (tickCount % 35 === 0) {
        setIncomingToast({
          title: '📢 [야간 실시간 인커밍 예약]',
          desc: '강남구 신사동 도산대로 703호 / VIP아로마 90분 (원클릭 최적 배차 가능)',
        });
        setTimeout(() => setIncomingToast(null), 7000);
      }
    }, 1000);

    return () => clearInterval(t);
  }, [simSpeed]);

  // 실시간 지도 초기화
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    if (!(window as any).L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => initMap();
      document.body.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      const L = (window as any).L;
      if (!L || mapInstanceRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: [37.5300, 127.0050], // 서울 중심 (용산·반포·성수 삼각축)
        zoom: 12.4,
        zoomSnap: 0.1,
        zoomControl: false,
        attributionControl: false,
      });

      // 국토부 VWorld 2D 고해상도 실무 도로망 타일 (기본값: 도로명, 한강, 지명 완벽 노출)
      const initialLayer = L.tileLayer('https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);
      tileLayerRef.current = initialLayer;

      L.control.zoom({ position: 'topright' }).addTo(map);

      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        setSelectedCoords({ lat, lng });
        setInputAddress(`지정위치 (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
      });

      mapInstanceRef.current = map;
      drawMapElements();
      drawTrafficOverlay();
    }
  }, []);

  // 지도 테마 실시간 전환 (국토부 VWorld / 정밀 표준맵 / 위성 스카이뷰 / 야간 다크)
  useEffect(() => {
    const L = (window as any).L;
    const map = mapInstanceRef.current;
    if (!L || !map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const tilePane = map.getPanes().tilePane;
    if (tilePane) tilePane.style.filter = 'none';

    let newTileUrl = '';
    let subdomains = ['a', 'b', 'c'];
    let maxZoom = 19;

    if (mapTheme === 'vworld') {
      newTileUrl = 'https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png';
    } else if (mapTheme === 'standard') {
      newTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    } else if (mapTheme === 'carto-dark') {
      // API Key 워터마크가 없는 OSM 다크 필터 타일 (도로망 및 한강 선명하게 보임)
      newTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      if (tilePane) {
        tilePane.style.filter = 'invert(100%) hue-rotate(180deg) brightness(85%) contrast(95%)';
      }
    } else if (mapTheme === 'satellite') {
      newTileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }

    const newLayer = L.tileLayer(newTileUrl, { maxZoom, subdomains }).addTo(map);
    tileLayerRef.current = newLayer;
  }, [mapTheme]);

  // 실시간 서울 전지역 주요 간선도로 교통망 오버레이 (강변북로, 올림픽대로, 테헤란로, 마포대로, 종로)
  // 실시간 도로 오버레이 완전 제거 (굴곡 없는 깨끗한 직선 관제 화면 유지)
  const drawTrafficOverlay = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    trafficLayerRef.current.forEach((l) => map.removeLayer(l));
    trafficLayerRef.current = [];
  };

  useEffect(() => {
    drawTrafficOverlay();
  }, [showTraffic]);

  // 지도 마커 및 실시간 주행선 (역할별 색상·심볼 직관화 + 선택 추천 하이라이트 + 가시성 필터)
  const drawMapElements = () => {
    const L = (window as any).L;
    const map = mapInstanceRef.current;
    if (!L || !map) return;

    // 기존 레이어 클리어
    Object.values(layersRef.current).forEach((l) => l.remove());
    layersRef.current = {};

    // 1. 매니저 핀 (대기: 그린 / 입실: 퍼플 / 이동: 인디고블루)
    if (viewFilter === 'all' || viewFilter === 'standby' || viewFilter === 'moving') {
      managers.forEach((m) => {
        if (m.status === 'offline') return;

        const isTransit = m.status === 'transit';
        const isWorking = m.status === 'working';
        const isStandby = m.status === 'standby';

        if (viewFilter === 'standby' && !isStandby) return;
        if (viewFilter === 'moving' && !isTransit) return;

        const isSelected = selectedManagerId === m.id;

        const bgColor = isSelected ? '#1e293b' : isTransit ? '#1e1b4b' : isWorking ? '#2e1065' : '#064e3b';
        const borderColor = isSelected ? '#38bdf8' : isTransit ? '#818cf8' : isWorking ? '#7c3aed' : '#059669';
        const statusLabel = isTransit ? '탑승' : isWorking ? `입실(${m.remainingMinutes}분)` : '대기';
        const statusColor = isTransit ? '#c7d2fe' : isWorking ? '#c084fc' : '#6ee7b7';

        const html = `
          <div style="transform: translate(-50%, -100%); cursor: pointer; white-space: nowrap; display: inline-flex; flex-direction: column; align-items: center;">
            <div style="background: ${bgColor}; border: 1px solid ${borderColor}; padding: 2px 5px; font-size: 10px; font-weight: 700; color: #f8fafc; display: flex; align-items: center; gap: 3px; box-shadow: 0 1px 4px rgba(0,0,0,0.6);">
              <span>${m.name}</span>
              <span style="color: ${statusColor}; font-size: 9px; font-weight: 800;">${statusLabel}</span>
            </div>
            <div style="width: 0; height: 0; border-left: 3px solid transparent; border-right: 3px solid transparent; border-top: 4px solid ${borderColor};"></div>
          </div>
        `;
        const icon = L.divIcon({ html, className: 'm-pin', iconSize: [0, 0] });
        const marker = L.marker([m.lat, m.lng], { icon, zIndexOffset: isSelected ? 350 : isTransit ? 280 : 200 }).addTo(map);
        marker.on('click', () => {
          setSelectedManagerId(m.id);
          map.setView([m.lat, m.lng], 15);
        });
        layersRef.current[`mgr-${m.id}`] = marker;
      });
    }

    // 2. 기사 핀 (대기: 차콜 그레이 / 운행중: 딥 블루)
    drivers.forEach((d) => {
      if (d.status === 'offline') return;

      const isTransit = d.status === 'transit';
      if (viewFilter === 'moving' && !isTransit) return;
      if (viewFilter === 'standby' && isTransit) return;

      const isSelected = selectedDriverId === d.id;
      const activeMis = missions.find((m) => m.driverId === d.id && m.stage === 'moving');
      const minLeft = activeMis ? Math.ceil(activeMis.remainingSeconds / 60) : d.etaMinutes;
      const isLinkedToSelectedMis = selectedMissionId && activeMis && activeMis.id === selectedMissionId;

      const bgColor = (isSelected || isLinkedToSelectedMis) ? '#1e293b' : isTransit ? '#1e3a8a' : '#0f172a';
      const borderColor = (isSelected || isLinkedToSelectedMis) ? '#38bdf8' : isTransit ? '#2563eb' : '#475569';

      const html = isTransit
        ? `
          <div style="transform: translate(-50%, -100%); cursor: pointer; white-space: nowrap; display: inline-flex; flex-direction: column; align-items: center;">
            <!-- [기사 머릿말 위 실시간 소요시간 배지] -->
            <div style="background: #0f172a; border: 1.5px solid ${isLinkedToSelectedMis ? '#38bdf8' : '#3b82f6'}; color: #ffffff; padding: 1px 5px; font-size: 9px; font-weight: 800; border-radius: 2px; margin-bottom: 2px; box-shadow: 0 2px 5px rgba(0,0,0,0.8); display: flex; align-items: center; gap: 3px;">
              <span style="color: #93c5fd; font-size: 8.5px;">도착</span>
              <span style="color: #fde047; font-size: 10px; font-weight: 900;">${minLeft}분 전</span>
            </div>
            <!-- 기사 핀 본체 -->
            <div style="background: ${bgColor}; border: 1.5px solid ${borderColor}; padding: 2px 6px; font-size: 10px; font-weight: 700; color: #ffffff; display: flex; align-items: center; gap: 3px; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">
              <span>${d.carNum}</span>
              <span style="color: #cbd5e1;">${d.name}</span>
            </div>
            <div style="width: 0; height: 0; border-left: 3px solid transparent; border-right: 3px solid transparent; border-top: 4px solid ${borderColor};"></div>
          </div>
        `
        : `
          <div style="transform: translate(-50%, -100%); cursor: pointer; white-space: nowrap; display: inline-flex; flex-direction: column; align-items: center;">
            <div style="background: ${bgColor}; border: 1px solid ${borderColor}; padding: 2px 4px; font-size: 9.5px; font-weight: 600; color: #cbd5e1; display: flex; align-items: center; gap: 3px;">
              <span>${d.carNum}</span>
              <span style="color: #64748b; font-size: 8.5px;">대기</span>
            </div>
            <div style="width: 0; height: 0; border-left: 3px solid transparent; border-right: 3px solid transparent; border-top: 4px solid ${borderColor};"></div>
          </div>
        `;

      const icon = L.divIcon({ html, className: 'd-pin', iconSize: [0, 0] });
      const marker = L.marker([d.lat, d.lng], { icon, zIndexOffset: (isSelected || isLinkedToSelectedMis) ? 450 : isTransit ? 300 : 180 }).addTo(map);
      marker.on('click', () => {
        setSelectedDriverId(d.id);
        if (activeMis) {
          setSelectedMissionId(activeMis.id);
          setSelectedManagerId(activeMis.managerId);
        }
        map.setView([d.lat, d.lng], 15);
      });
      layersRef.current[`driver-${d.id}`] = marker;
    });

    // 3. 목적지 핀 & 동선 표시선 (중앙 소요시간 배지 및 클릭 상호작용)
    if (viewFilter === 'all' || viewFilter === 'moving') {
      missions.forEach((mis) => {
        const drv = drivers.find((d) => d.id === mis.driverId);
        const mgr = managers.find((m) => m.id === mis.managerId);
        if (!drv || !mgr) return;

        const isSelectedMis = selectedMissionId === mis.id;
        const minLeft = Math.ceil(mis.remainingSeconds / 60);
        const shortAddr = mis.address.split(' ').slice(0, 2).join(' ');

        // 목적지 핀 디자인 (선택 시 상단 [선택됨] 태그 및 진한 레드/스카이 테두리)
        const destHtml = `
          <div style="transform: translate(-50%, -100%); cursor: pointer; white-space: nowrap; display: inline-flex; flex-direction: column; align-items: center;">
            ${isSelectedMis ? `
              <div style="background: #ef4444; color: #ffffff; padding: 1px 4px; font-size: 8.5px; font-weight: 800; border-radius: 2px; margin-bottom: 2px; box-shadow: 0 1px 4px rgba(0,0,0,0.8);">
                선택된 목적지
              </div>
            ` : ''}
            <div style="background: ${isSelectedMis ? '#7f1d1d' : '#450a0a'}; border: ${isSelectedMis ? '2px solid #ef4444' : '1px solid #dc2626'}; padding: 2px 6px; font-size: 10px; font-weight: 800; color: #ffffff; display: flex; align-items: center; gap: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.7);">
              <span>📍 ${shortAddr}</span>
              <span style="background: #dc2626; color: #fff; padding: 0 4px; font-size: 9px; font-weight: 800;">${minLeft}분</span>
            </div>
            <div style="width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid ${isSelectedMis ? '#ef4444' : '#dc2626'};"></div>
          </div>
        `;
        const destIcon = L.divIcon({ html: destHtml, className: 'dest-pin', iconSize: [0, 0] });
        const destMarker = L.marker([mis.destLat, mis.destLng], { icon: destIcon, zIndexOffset: isSelectedMis ? 480 : 320 }).addTo(map);

        // 목적지 클릭 시: 누가 오고 있는지 & 기사부터 목적지까지 총 소요시간을 팝업 및 화면에 직관적으로 표출
        const popupContent = `
          <div style="font-family: inherit; min-width: 230px; padding: 4px 2px; color: #f8fafc;">
            <div style="border-bottom: 1px solid #334155; padding-bottom: 5px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 11.5px; font-weight: 800; color: #f87171;">[목적지 배송 관제]</span>
              <span style="font-size: 9px; background: #dc2626; color: #fff; padding: 1px 5px; font-weight: 800;">#${mis.id} 운행중</span>
            </div>
            <div style="font-size: 10.5px; line-height: 1.6; color: #cbd5e1;">
              <div>🚘 <strong style="color: #60a5fa;">오고 있는 기사:</strong> <b style="color: #ffffff;">${drv.carNum} (${drv.name})</b></div>
              <div>👤 <strong style="color: #34d399;">탑승 매니저:</strong> <b style="color: #ffffff;">${mgr.name} 매니저</b></div>
              <div>📍 <strong style="color: #fca5a5;">도착지:</strong> ${mis.address} (${mis.room})</div>
            </div>
            <div style="margin-top: 6px; padding: 5px 8px; background: #0f172a; border-left: 3px solid #f59e0b; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 10px; color: #94a3b8; font-weight: 700;">총 소요시간</span>
              <span style="font-size: 13px; font-weight: 900; color: #fbbf24;">약 ${minLeft}분 <span style="font-size: 9px; color: #94a3b8; font-weight: 600;">(${mis.distKm}km)</span></span>
            </div>
          </div>
        `;
        destMarker.bindPopup(popupContent, { offset: [0, -10] });

        destMarker.on('click', () => {
          setSelectedMissionId(mis.id);
          setSelectedDriverId(drv.id);
          setSelectedManagerId(mgr.id);
          // 기사와 목적지가 한눈에 보이도록 지도 뷰 맞춤
          map.fitBounds([[drv.lat, drv.lng], [mis.destLat, mis.destLng]], { padding: [80, 80], maxZoom: 16 });
        });
        layersRef.current[`dest-${mis.id}`] = destMarker;

        // 🌟 [핵심] 기사 & 매니저 ➔ 목적지 간 굴곡 없는 100% 직선(Straight Solid Line) 정확한 연결
        if (mis.stage === 'moving') {
          // 1구간: 기사 ➔ 매니저 정확한 직선 (블루 실선)
          const line1 = L.polyline(
            [[drv.lat, drv.lng], [mgr.lat, mgr.lng]],
            {
              color: isSelectedMis ? '#38bdf8' : '#2563eb',
              weight: isSelectedMis ? 3.5 : 2.5,
              opacity: 0.95,
              smoothFactor: 0,
            }
          ).addTo(map);
          layersRef.current[`line1-${mis.id}`] = line1;

          // 2구간: 매니저 ➔ 목적지 정확한 직선 (레드/오렌지 실선)
          const line2 = L.polyline(
            [[mgr.lat, mgr.lng], [mis.destLat, mis.destLng]],
            {
              color: isSelectedMis ? '#f59e0b' : '#dc2626',
              weight: isSelectedMis ? 3.5 : 2.5,
              opacity: 0.95,
              smoothFactor: 0,
            }
          ).addTo(map);
          layersRef.current[`line2-${mis.id}`] = line2;

          // 🌟 [표시선 정중앙 소요시간 배지] 매니저 ➔ 목적지 직선 한가운데 정확히 배치
          const midLat = (mgr.lat + mis.destLat) / 2;
          const midLng = (mgr.lng + mis.destLng) / 2;
          const midEtaHtml = `
            <div style="transform: translate(-50%, -50%); cursor: pointer; white-space: nowrap; background: #0b0f19; border: 1.5px solid ${isSelectedMis ? '#38bdf8' : '#f59e0b'}; padding: 2px 7px; font-size: 10px; font-weight: 800; color: #ffffff; display: inline-flex; align-items: center; gap: 4px; border-radius: 2px; box-shadow: 0 2px 8px rgba(0,0,0,0.85);">
              <span style="color: ${isSelectedMis ? '#7dd3fc' : '#fde047'}; font-size: 9px;">소요시간</span>
              <span style="color: #ffffff; font-size: 11px; font-weight: 900;">${minLeft}분</span>
              <span style="color: #94a3b8; font-size: 8.5px;">(${mis.distKm}km)</span>
            </div>
          `;
          const midEtaMarker = L.marker([midLat, midLng], {
            icon: L.divIcon({ html: midEtaHtml, className: 'mid-eta-pin', iconSize: [0, 0] }),
            zIndexOffset: isSelectedMis ? 470 : 360,
          }).addTo(map);

          midEtaMarker.on('click', () => {
            setSelectedMissionId(mis.id);
            setSelectedDriverId(drv.id);
            setSelectedManagerId(mgr.id);
            map.fitBounds([[drv.lat, drv.lng], [mis.destLat, mis.destLng]], { padding: [80, 80], maxZoom: 16 });
          });
          layersRef.current[`mid-eta-${mis.id}`] = midEtaMarker;
        }

        // 입실 중일 때: 오직 해당 오더가 선택되었을 때만 기사 ➔ 목적지 대기 직선 표시
        if ((mis.stage === 'working' || mis.stage === 'pickup_ready') && isSelectedMis) {
          const pickupLine = L.polyline(
            [[drv.lat, drv.lng], [mis.destLat, mis.destLng]],
            { color: '#8b5cf6', weight: 2, opacity: 0.8, smoothFactor: 0 }
          ).addTo(map);
          layersRef.current[`pickup-${mis.id}`] = pickupLine;
        }
      });
    }

    // 4. 신규 배차 동선 표시선 (배차 폼 미리보기가 켜져 있을 때만 렌더링)
    if (showDispatchPreview && previewDrv && previewMgr && selectedCoords) {
      const pLine1 = L.polyline(
        [[previewDrv.lat, previewDrv.lng], [previewMgr.lat, previewMgr.lng]],
        { color: '#0284c7', weight: 2.5, opacity: 0.9, smoothFactor: 0 }
      ).addTo(map);
      layersRef.current['preview-line1'] = pLine1;

      const pLine2 = L.polyline(
        [[previewMgr.lat, previewMgr.lng], [selectedCoords.lat, selectedCoords.lng]],
        { color: '#ea580c', weight: 2.5, opacity: 0.9, smoothFactor: 0 }
      ).addTo(map);
      layersRef.current['preview-line2'] = pLine2;

      const shortInput = inputAddress.split(' ').slice(0, 2).join(' ') || '지정위치';
      const pDestHtml = `
        <div style="transform: translate(-50%, -100%); white-space: nowrap; display: inline-flex; flex-direction: column; align-items: center;">
          <div style="background: #0f172a; border: 1px solid #38bdf8; padding: 2px 5px; font-size: 10px; font-weight: 700; color: #f8fafc; display: flex; align-items: center; gap: 3px;">
            <span>${shortInput}</span>
            <span style="color: #38bdf8; font-size: 9px;">${previewTotalEta}분</span>
          </div>
          <div style="width: 0; height: 0; border-left: 3px solid transparent; border-right: 3px solid transparent; border-top: 4px solid #38bdf8;"></div>
        </div>
      `;
      const pDestMarker = L.marker([selectedCoords.lat, selectedCoords.lng], {
        icon: L.divIcon({ html: pDestHtml, className: 'preview-dest', iconSize: [0, 0] }),
        zIndexOffset: 450,
      }).addTo(map);
      layersRef.current['preview-dest-pin'] = pDestMarker;
    }
  };

  useEffect(() => {
    drawMapElements();
  }, [managers, drivers, missions, selectedManagerId, selectedDriverId, selectedMissionId, selectedCoords, inputAddress, viewFilter, showDispatchPreview]);

  // 배차 실행
  const handleExecuteDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const mgrId = selectedManagerId || bestManager?.id;
    const drvId = selectedDriverId || bestDriver?.id;
    if (!mgrId || !drvId) {
      alert('대기 인원이 부족합니다.');
      return;
    }

    const assignedMgr = managers.find((m) => m.id === mgrId);
    const assignedDrv = drivers.find((d) => d.id === drvId);

    const destLat = selectedCoords.lat;
    const destLng = selectedCoords.lng;

    // 1구간(기사 ➔ 매니저) 및 2구간(매니저 ➔ 목적지) 거리 및 소요시간 산출
    const dist1 = Math.sqrt(Math.pow((assignedDrv?.lat || 37.5) - (assignedMgr?.lat || 37.5), 2) + Math.pow((assignedDrv?.lng || 127.0) - (assignedMgr?.lng || 127.0), 2)) * 111;
    const dist2 = Math.sqrt(Math.pow((assignedMgr?.lat || 37.5) - destLat, 2) + Math.pow((assignedMgr?.lng || 127.0) - destLng, 2)) * 111;

    const eta1 = Math.max(2, Math.round(dist1 * 2.5));
    const eta2 = Math.max(4, Math.round(dist2 * 2.8));
    const totalEta = eta1 + eta2;
    const totalDist = parseFloat((dist1 + dist2).toFixed(1));

    const totalDurationSec = totalEta * 60;
    const expDate = new Date(Date.now() + totalDurationSec * 1000);
    const expTimeStr = `${String(expDate.getHours()).padStart(2, '0')}:${String(expDate.getMinutes()).padStart(2, '0')}`;

    const newMis: Mission = {
      id: String(Date.now()).slice(-4),
      customerName: inputCustomer || '고객',
      address: inputAddress,
      room: inputRoom || '호수 확인',
      course: inputCourse,
      price: '100,000',
      memo: inputMemo,
      managerId: mgrId,
      driverId: drvId,
      stage: 'moving',
      subStage: 'pickup',
      startLat: assignedDrv?.lat || 37.5020,
      startLng: assignedDrv?.lng || 127.0440,
      pickupLat: assignedMgr?.lat || 37.5052,
      pickupLng: assignedMgr?.lng || 127.0498,
      destLat,
      destLng,
      step1Eta: eta1,
      step2Eta: eta2,
      totalEta,
      remainingSeconds: totalDurationSec,
      expectedArrivalStr: expTimeStr,
      distKm: totalDist,
    };

    setMissions((prev) => [newMis, ...prev]);

    setManagers((prev) =>
      prev.map((m) => (m.id === mgrId ? { ...m, status: 'transit', count: m.count + 1 } : m))
    );
    setDrivers((prev) =>
      prev.map((d) => (d.id === drvId ? { ...d, status: 'transit', etaMinutes: totalEta } : d))
    );

    // 기사에게 전송될 출동 지령 모달 오픈
    setDispatchOrderModal({
      driverName: assignedDrv?.name || '기사',
      carNum: assignedDrv?.carNum || '차량',
      managerName: assignedMgr?.name || '매니저',
      managerLoc: assignedMgr?.location || '대기위치',
      destAddress: inputAddress,
      room: inputRoom || '호수 확인',
      course: inputCourse,
      memo: inputMemo || '특이사항 없음',
      step1Eta: eta1,
      step2Eta: eta2,
      totalEta,
    });

    if (mapInstanceRef.current && (window as any).L) {
      const L = (window as any).L;
      const bounds = L.latLngBounds([
        [assignedDrv?.lat || 37.5050, assignedDrv?.lng || 127.0420],
        [assignedMgr?.lat || 37.5050, assignedMgr?.lng || 127.0420],
        [destLat, destLng],
      ]);
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
    }
  };

  // ──────────────── 1. 기사 전용 단말기 화면 (관제 화면 차단 및 오직 기사 지령만 노출) ────────────────
  if (role === 'driver') {
    const activeDriver = drivers.find((d) => d.id === selectedDriverUserId) || drivers[0];
    const driverMission = missions.find((m) => m.driverId === activeDriver.id && m.stage === 'moving');
    const onboardManager = driverMission ? managers.find((m) => m.id === driverMission.managerId) : null;
    const minLeft = driverMission ? Math.ceil(driverMission.remainingSeconds / 60) : 0;

    return (
      <div style={{ width: '100vw', height: '100vh', background: '#07090e', color: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: 'Pretendard, monospace, sans-serif', padding: '16px', boxSizing: 'border-box' }}>
        {/* 기사 헤더 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e2430', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ background: '#2563eb', color: '#fff', padding: '3px 8px', borderRadius: '3px', fontWeight: 900, fontSize: '12px' }}>기사 전용 단말기</span>
            <select
              value={selectedDriverUserId}
              onChange={(e) => setSelectedDriverUserId(e.target.value)}
              style={{ background: '#11141c', border: '1px solid #334155', color: '#f8fafc', padding: '4px 8px', fontSize: '12px', fontWeight: 700 }}
            >
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.carNum} · {d.name} ({d.status === 'transit' ? '주행중' : '대기'})
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>{currentTime}</span>
            <button
              onClick={() => {
                const pin = prompt('오야(실장) 마스터 보안 PIN을 입력하세요:');
                if (pin === '7777') {
                  setRole('boss');
                } else if (pin) {
                  alert('보안 PIN이 올바르지 않습니다.');
                }
              }}
              style={{ background: '#1e2430', border: '1px solid #334155', color: '#94a3b8', padding: '4px 8px', fontSize: '11px', cursor: 'pointer' }}
            >
              [관제 복귀]
            </button>
          </div>
        </div>

        {/* 메인 내용: 배정된 오더 또는 대기 안내 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '560px', margin: '0 auto', width: '100%', gap: '14px' }}>
          {driverMission ? (
            <>
              {/* 1단계: 픽업 대상 */}
              <div style={{ background: '#0f141f', border: '1px solid #1e3a8a', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ background: '#1e3a8a', color: '#fff', padding: '2px 6px', fontSize: '10.5px', fontWeight: 700 }}>
                    1단계: 픽업 대상
                  </span>
                  <span style={{ color: '#93c5fd', fontSize: '11.5px', fontWeight: 700 }}>
                    {driverMission.subStage === 'pickup' ? `픽업 이동 약 ${driverMission.step1Eta}분` : '픽업 완료'}
                  </span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  {onboardManager?.name || '배정 매니저'} ({onboardManager?.location || '대기위치'})
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px', marginTop: '10px' }}>
                  <button onClick={() => alert(`${onboardManager?.name} 매니저 통화 연결`)} style={{ background: '#1e2638', border: '1px solid #3b4252', color: '#d8dee9', padding: '9px 4px', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>
                    [전화 통화]
                  </button>
                  <button onClick={() => onboardManager && launchNavigation('tmap', `${onboardManager.name} 픽업지`, onboardManager.lat, onboardManager.lng)} style={{ background: '#1d4ed8', border: 'none', color: '#fff', padding: '9px 4px', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>
                    [T맵 픽업]
                  </button>
                  <button onClick={() => onboardManager && launchNavigation('kakao', `${onboardManager.name} 픽업지`, onboardManager.lat, onboardManager.lng)} style={{ background: '#2563eb', border: 'none', color: '#fff', padding: '9px 4px', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>
                    [카카오 픽업]
                  </button>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <button onClick={() => alert('매니저 탑승 완료 처리 (고객지로 주행 시작)')} style={{ width: '100%', background: '#15803d', border: 'none', color: '#fff', padding: '10px', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>
                    [매니저 탑승 완료 ➔ 2단계 출발]
                  </button>
                </div>
              </div>

              {/* 2단계: 고객 목적지 */}
              <div style={{ background: '#16130b', border: '1px solid #b45309', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ background: '#b45309', color: '#fff', padding: '2px 6px', fontSize: '10.5px', fontWeight: 700 }}>
                    2단계: 고객 목적지
                  </span>
                  <span style={{ color: '#fbbf24', fontSize: '14px', fontWeight: 800 }}>
                    남은시간 {minLeft}분
                  </span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
                  {driverMission.address} <span style={{ color: '#fbbf24' }}>({driverMission.room})</span>
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                  코스: {driverMission.course} | 전달메모: <span style={{ color: '#fca5a5' }}>{driverMission.memo || '없음'}</span>
                </div>

                {/* 3대 모바일 네비게이션 앱 원터치 실행 바 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px', marginTop: '10px' }}>
                  <button
                    onClick={() => launchNavigation('tmap', `${driverMission.address} ${driverMission.room}`, driverMission.destLat, driverMission.destLng)}
                    style={{ background: '#1d4ed8', border: 'none', color: '#fff', padding: '11px 4px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    [T맵 길안내]
                  </button>
                  <button
                    onClick={() => launchNavigation('kakao', `${driverMission.address} ${driverMission.room}`, driverMission.destLat, driverMission.destLng)}
                    style={{ background: '#2563eb', border: 'none', color: '#fff', padding: '11px 4px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    [카카오내비]
                  </button>
                  <button
                    onClick={() => launchNavigation('naver', `${driverMission.address} ${driverMission.room}`, driverMission.destLat, driverMission.destLng)}
                    style={{ background: '#0284c7', border: 'none', color: '#fff', padding: '11px 4px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    [네이버지도]
                  </button>
                </div>

                {/* 현장 로드뷰 및 상황 보고 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px', marginTop: '6px' }}>
                  <button
                    onClick={() => openKakaoRoadview(driverMission.destLat, driverMission.destLng)}
                    style={{ background: '#1e2430', border: '1px solid #475569', color: '#93c5fd', padding: '9px 4px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    [현장 로드뷰]
                  </button>
                  <button
                    onClick={() => alert('오야에게 차 막힘 (+5분 지연) 보고 전송')}
                    style={{ background: '#451a03', border: '1px solid #78350f', color: '#fde68a', padding: '9px 4px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    [정체보고(+5분)]
                  </button>
                  <button
                    onClick={() => {
                      setMissions((prev) => prev.map((m) => (m.id === driverMission.id ? { ...m, stage: 'working', remainingMinutes: 90 } : m)));
                      alert('현장 고객지 도착 완료 보고');
                    }}
                    style={{ background: '#15803d', border: 'none', color: '#fff', padding: '9px 4px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    [현장 도착완료]
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '36px 16px', background: '#0f141f', border: '1px solid #1e2430' }}>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>배정된 운행 지령 없음</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#34d399' }}>대기 상태 (대기지: {activeDriver.location})</div>
              <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '10px' }}>오야의 배차 지령 하달 시 픽업 경로와 내비게이션이 활성화됩니다.</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ──────────────── 2. 매니저 전용 스마트폰 화면 (관제 화면 차단 및 오직 본인 오더만 노출) ────────────────
  if (role === 'manager') {
    const activeMgr = managers.find((m) => m.id === selectedManagerUserId) || managers[0];
    const mgrMission = missions.find((m) => m.managerId === activeMgr.id);
    const assignedDriver = mgrMission ? drivers.find((d) => d.id === mgrMission.driverId) : null;

    return (
      <div style={{ width: '100vw', height: '100vh', background: '#06080d', color: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: 'Pretendard, monospace, sans-serif', padding: '16px', boxSizing: 'border-box' }}>
        {/* 매니저 헤더 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e2430', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: '#047857', color: '#fff', padding: '3px 8px', fontWeight: 700, fontSize: '11px' }}>매니저 단말기</span>
            <select
              value={selectedManagerUserId}
              onChange={(e) => setSelectedManagerUserId(e.target.value)}
              style={{ background: '#11141c', border: '1px solid #334155', color: '#f8fafc', padding: '4px 8px', fontSize: '12px', fontWeight: 700 }}
            >
              {managers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.count}개 완료)
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>{currentTime}</span>
            <button
              onClick={() => {
                const pin = prompt('오야(실장) 마스터 보안 PIN을 입력하세요:');
                if (pin === '7777') {
                  setRole('boss');
                } else if (pin) {
                  alert('보안 PIN이 올바르지 않습니다.');
                }
              }}
              style={{ background: '#1e2430', border: '1px solid #334155', color: '#94a3b8', padding: '4px 8px', fontSize: '11px', cursor: 'pointer' }}
            >
              [관제 복귀]
            </button>
          </div>
        </div>

        {/* 매니저 업무 카드 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '480px', margin: '0 auto', width: '100%', gap: '14px' }}>
          {/* 오늘 수행 갯수 카운터 */}
          <div style={{ background: '#0d131f', border: '1px solid #1e293b', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>오늘 완료 건수</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc' }}>{activeMgr.count}건</div>
            </div>
            <span style={{ background: '#1e293b', color: '#94a3b8', border: '1px solid #334155', padding: '4px 8px', fontSize: '11px', fontWeight: 700 }}>
              {activeMgr.status === 'working' ? `입실 (${activeMgr.remainingMinutes}분 잔여)` : activeMgr.status === 'transit' ? '차량 이동중' : '대기중'}
            </span>
          </div>

          {/* 배정된 오더 카드 */}
          {mgrMission ? (
            <div style={{ background: '#0e141f', border: '1px solid #1e3a8a', padding: '16px' }}>
              <div style={{ fontSize: '11px', color: '#93c5fd', fontWeight: 700, marginBottom: '4px' }}>
                현재 배정 목적지
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#f8fafc', marginBottom: '6px' }}>
                {mgrMission.address} <span style={{ color: '#60a5fa' }}>({mgrMission.room})</span>
              </div>
              <div style={{ fontSize: '12.5px', color: '#cbd5e1', marginBottom: '8px' }}>
                코스: <b>{mgrMission.course}</b> | 금액: <b>{mgrMission.price}원</b>
              </div>
              <div style={{ background: '#1e2638', padding: '8px 10px', fontSize: '11px', color: '#fca5a5', marginBottom: '14px', border: '1px solid #334155' }}>
                전달메모: {mgrMission.memo || '벨 금지 (노크 필수)'}
              </div>

              {/* 기사 정보 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1e293b', paddingTop: '10px', marginBottom: '14px' }}>
                <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>담당 기사: <b style={{ color: '#fff' }}>{assignedDriver ? `${assignedDriver.carNum}·${assignedDriver.name}` : '기사 배정중'}</b></span>
                <button onClick={() => alert(`${assignedDriver?.name} 기사 직통 통화`)} style={{ background: '#1e293b', border: '1px solid #475569', color: '#fff', padding: '5px 8px', fontSize: '10.5px', fontWeight: 700, cursor: 'pointer' }}>
                  [기사 통화]
                </button>
              </div>

              {/* 원터치 액션 버튼 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                {mgrMission.stage === 'moving' ? (
                  <button
                    onClick={() => {
                      setMissions((prev) => prev.map((m) => (m.id === mgrMission.id ? { ...m, stage: 'working', remainingMinutes: 90 } : m)));
                      setManagers((prev) => prev.map((m) => (m.id === activeMgr.id ? { ...m, status: 'working', remainingMinutes: 90 } : m)));
                    }}
                    style={{ background: '#1e40af', border: 'none', color: '#fff', padding: '14px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    [문 앞 입실 완료 (타이머 시작)]
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setExitCallModal({
                        missionId: mgrMission.id,
                        managerName: activeMgr.name,
                        driverName: assignedDriver ? `${assignedDriver.carNum}·${assignedDriver.name}` : '배정기사',
                        room: mgrMission.room,
                      })
                    }
                    style={{ background: '#991b1b', border: 'none', color: '#fff', padding: '14px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    [퇴실 5분 전 호출 (픽업 위치 선택)]
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '36px 16px', background: '#0e1118', border: '1px solid #1e2430' }}>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>현재 배정된 콜 없음</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#34d399' }}>대기중 (배차 순번: 1순위)</div>
              <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '10px' }}>새로운 배차 접수 시 목적지 호수와 전달메모가 자동 표시됩니다.</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ──────────────── 3. 오야 종합 관제 터미널 화면 (오야 전용) ────────────────
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0c10', color: '#cbd5e1', fontFamily: 'Pretendard, -apple-system, system-ui, monospace, sans-serif', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      
      {/* ──────────────── 최상단 오야 관제 헤더 ──────────────── */}
      <header style={{ height: '38px', background: '#11141c', borderBottom: '1px solid #1e2430', padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.2px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }}></span>
            ABAM DISPATCHER <span style={{ background: '#dc2626', color: '#fff', padding: '1px 5px', fontSize: '9.5px', borderRadius: '2px', fontWeight: 800 }}>야간 영업중</span>
          </span>
          <span style={{ height: '12px', width: '1px', background: '#2d3748' }}></span>
          <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#94a3b8' }}>
            <span>오늘 완료: <b style={{ color: '#38bdf8' }}>31건</b> <span style={{ color: '#64748b' }}>(매출 4,450,000원)</span></span>
            <span>실시간 주행: <b style={{ color: '#f59e0b' }}>{missions.filter((m) => m.stage === 'moving').length}건</b></span>
            <span>입실 관리: <b style={{ color: '#a855f7' }}>{missions.filter((m) => m.stage === 'working' || m.stage === 'pickup_ready').length}건</b></span>
            <span>출근 매니저: <b style={{ color: '#e2e8f0' }}>{managers.filter((m) => m.status !== 'offline').length}명</b> (대기 {managers.filter((m) => m.status === 'standby').length})</span>
            <span>가동 차량: <b style={{ color: '#e2e8f0' }}>{drivers.filter((d) => d.status !== 'offline').length}대</b></span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* 시뮬레이션 배속 컨트롤러 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: '#0e121b', border: '1px solid #1e2430', padding: '2px 5px' }}>
            <span style={{ fontSize: '9.5px', color: '#64748b', fontWeight: 700 }}>주행 배속:</span>
            {[1, 2, 5].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setSimSpeed(spd)}
                style={{
                  background: simSpeed === spd ? '#1e3a8a' : '#141822',
                  border: '1px solid ' + (simSpeed === spd ? '#2563eb' : '#232a3b'),
                  color: simSpeed === spd ? '#93c5fd' : '#64748b',
                  fontSize: '9.5px',
                  fontWeight: 700,
                  padding: '1px 5px',
                  cursor: 'pointer',
                }}
              >
                {spd}x
              </button>
            ))}
          </div>

          <span style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc', fontFamily: 'monospace', background: '#141822', border: '1px solid #1e2430', padding: '2px 7px' }}>
            {currentTime}
          </span>
          
          {/* 오야 감독 전용 단말기 프리뷰 전환 스위치 */}
          <div style={{ display: 'flex', border: '1px solid #2d3748' }}>
            <button
              onClick={() => setRole('driver')}
              style={{ padding: '3px 9px', fontSize: '10.5px', border: 'none', borderRight: '1px solid #2d3748', background: '#11141c', color: '#94a3b8', cursor: 'pointer', borderRadius: '0px' }}
              title="기사 단말기 화면을 점검합니다"
            >
              [기사 단말 점검]
            </button>
            <button
              onClick={() => setRole('manager')}
              style={{ padding: '3px 9px', fontSize: '10.5px', border: 'none', background: '#11141c', color: '#94a3b8', cursor: 'pointer', borderRadius: '0px' }}
              title="매니저 단말기 화면을 점검합니다"
            >
              [매니저 단말 점검]
            </button>
          </div>
          <Link href="/abam-nightman-2026" style={{ fontSize: '10.5px', color: '#64748b', textDecoration: 'none', border: '1px solid #2d3748', padding: '3px 8px', borderRadius: '0px' }}>
            관리자
          </Link>
        </div>
      </header>

      {/* 🌟 [신규 실시간 예약 인커밍 플로팅 알림] */}
      {incomingToast && (
        <div
          style={{
            position: 'fixed',
            top: '44px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            background: '#0f172a',
            border: '1.5px solid #f59e0b',
            boxShadow: '0 4px 20px rgba(0,0,0,0.9)',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'fadeIn 0.2s ease-in-out',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#fbbf24' }}>{incomingToast.title}</span>
          <span style={{ fontSize: '11px', color: '#f8fafc' }}>{incomingToast.desc}</span>
          <button
            type="button"
            onClick={() => {
              setInputAddress('강남구 신사동 640-2 도산대로');
              setInputRoom('703호');
              setInputCustomer('신사VIP');
              setSelectedCoords({ lat: 37.5235, lng: 127.0375 });
              setIncomingToast(null);
            }}
            style={{ background: '#b45309', border: 'none', color: '#fff', fontSize: '10.5px', fontWeight: 800, padding: '3px 8px', cursor: 'pointer' }}
          >
            [배차창 불러오기]
          </button>
          <button
            type="button"
            onClick={() => setIncomingToast(null)}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '11px', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* ──────────────── 2. 본문 3단 레이아웃 (정밀 데이터 테이블) ──────────────── */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '260px 1fr 330px', overflow: 'hidden' }}>
        
        {/* [좌측] 매니저 출근 테이블 */}
        <aside style={{ background: '#0e1118', borderRight: '1px solid #1a202c', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '8px 10px', borderBottom: '1px solid #1a202c', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#f1f5f9' }}>매니저 출근부 (공평 배차순)</span>
            <span style={{ fontSize: '10px', color: '#64748b' }}>총 {managers.length}명</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10.5px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#141822', color: '#64748b', borderBottom: '1px solid #1a202c' }}>
                  <th style={{ padding: '4px 6px', fontWeight: 700 }}>이름</th>
                  <th style={{ padding: '4px 4px', fontWeight: 700 }}>갯수</th>
                  <th style={{ padding: '4px 6px', fontWeight: 700 }}>상태</th>
                  <th style={{ padding: '4px 6px', fontWeight: 700 }}>위치</th>
                  <th style={{ padding: '4px 4px', textAlign: 'right' }}>출근</th>
                </tr>
              </thead>
              <tbody>
                {managers
                  .slice()
                  .sort((a, b) => {
                    if (a.status === 'offline') return 1;
                    if (b.status === 'offline') return -1;
                    return a.count - b.count;
                  })
                  .map((m) => {
                    const isSelected = selectedManagerId === m.id;
                    const isTop = bestManager?.id === m.id;

                    const statusStyle = {
                      standby: { label: '대기', color: '#34d399' },
                      working: { label: `입실(${m.remainingMinutes}분)`, color: '#60a5fa' },
                      transit: { label: '이동', color: '#fde047' },
                      offline: { label: '미출근', color: '#64748b' },
                    }[m.status];

                    return (
                      <tr
                        key={m.id}
                        onClick={() => {
                          if (m.status === 'standby') setSelectedManagerId(m.id);
                          if (mapInstanceRef.current) mapInstanceRef.current.setView([m.lat, m.lng], 16);
                        }}
                        style={{
                          background: isSelected ? '#1e293b' : 'transparent',
                          borderBottom: '1px solid #141822',
                          cursor: 'pointer',
                        }}
                      >
                        <td style={{ padding: '6px', fontWeight: 700, color: isTop ? '#38bdf8' : '#f8fafc' }}>
                          {m.name} {isTop ? '*' : ''}
                        </td>
                        <td style={{ padding: '6px 4px', color: '#cbd5e1' }}>{m.count}</td>
                        <td style={{ padding: '6px', color: statusStyle.color, fontWeight: 700 }}>{statusStyle.label}</td>
                        <td style={{ padding: '6px', color: '#64748b' }}>{m.location}</td>
                        <td style={{ padding: '6px 4px', textAlign: 'right' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setManagers((prev) =>
                                prev.map((item) =>
                                  item.id === m.id
                                    ? { ...item, status: item.status === 'offline' ? 'standby' : 'offline' }
                                    : item
                                )
                              );
                            }}
                            style={{ background: '#1e2430', border: '1px solid #2d3748', color: '#94a3b8', fontSize: '9px', padding: '1px 4px', cursor: 'pointer' }}
                          >
                            {m.status === 'offline' ? '출' : '퇴'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div style={{ height: '26px', padding: '0 10px', background: '#0a0c10', borderTop: '1px solid #1a202c', fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center' }}>
            우선배차: <b style={{ color: '#38bdf8', marginLeft: '4px' }}>{bestManager ? `${bestManager.name} (${bestManager.count}개)` : '없음'}</b>
          </div>
        </aside>

        {/* [중앙] 실사 지도 + 오야 전용 고객문의 0.1초 즉답 HUD 전광판 */}
        <main style={{ position: 'relative', width: '100%', height: '100%', background: '#000' }}>
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

          {/* [지도 상단 고정] 초슬림 실시간 운행 상태 티커 + 직관적 뷰 필터 및 범례 */}
          <div style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 999, display: 'flex', gap: '6px', alignItems: 'center', pointerEvents: 'auto', flexWrap: 'wrap' }}>
            {/* 1. 실시간 주행 칩 */}
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
              <div style={{ background: '#0e121b', border: '1px solid #1e2430', padding: '3px 7px', fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>
                실시간 관제
              </div>
              {missions
                .filter((m) => m.stage === 'moving')
                .map((m) => {
                  const drv = drivers.find((d) => d.id === m.driverId);
                  const minLeft = Math.ceil(m.remainingSeconds / 60);
                  const isSelected = selectedMissionId === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        setSelectedMissionId(m.id);
                        if (drv) setSelectedDriverId(drv.id);
                        setSelectedManagerId(m.managerId);
                        if (mapInstanceRef.current && drv) {
                          mapInstanceRef.current.fitBounds([
                            [drv.lat, drv.lng],
                            [m.destLat, m.destLng]
                          ], { padding: [80, 80], maxZoom: 16 });
                        }
                      }}
                      style={{
                        background: isSelected ? '#1e293b' : '#111622',
                        border: isSelected ? '1.5px solid #38bdf8' : '1px solid #1d4ed8',
                        padding: '3px 7px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '10.5px',
                        fontFamily: 'monospace',
                        cursor: 'pointer',
                        boxShadow: isSelected ? '0 0 6px rgba(56, 189, 248, 0.4)' : 'none',
                      }}
                    >
                      <span style={{ color: isSelected ? '#38bdf8' : '#60a5fa', fontWeight: 800 }}>{drv?.carNum}</span>
                      <span style={{ color: '#cbd5e1' }}>{m.address.split(' ')[1] || m.address.slice(0, 4)}</span>
                      <span style={{ background: isSelected ? '#2563eb' : '#1d4ed8', color: '#ffffff', padding: '0 4px', fontWeight: 700, fontSize: '9.5px' }}>{minLeft}분</span>
                    </div>
                  );
                })}
            </div>

            {/* 2. 지도 직관 가시성 필터 */}
            <div style={{ display: 'flex', border: '1px solid #1e2430', background: '#0a0d14' }}>
              {[
                { key: 'all', label: '전체 보기' },
                { key: 'moving', label: '운행 차량만' },
                { key: 'standby', label: '대기 자원만' },
              ].map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setViewFilter(f.key as any)}
                  style={{
                    background: viewFilter === f.key ? '#1e3a8a' : 'transparent',
                    border: 'none',
                    borderRight: '1px solid #1e2430',
                    color: viewFilter === f.key ? '#93c5fd' : '#64748b',
                    padding: '3px 7px',
                    fontSize: '10px',
                    fontWeight: viewFilter === f.key ? 800 : 500,
                    cursor: 'pointer',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* 3. 직관적 색상 범례 (Legend) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#0e121b', border: '1px solid #1e2430', padding: '3px 7px', fontSize: '9.5px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#93c5fd' }}>
                <span style={{ width: '7px', height: '7px', background: '#1e40af', border: '1px solid #38bdf8', display: 'inline-block' }}></span>
                차량
              </span>
              <span style={{ color: '#334155' }}>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#6ee7b7' }}>
                <span style={{ width: '7px', height: '7px', background: '#064e3b', border: '1px solid #10b981', display: 'inline-block' }}></span>
                매니저(대기)
              </span>
              <span style={{ color: '#334155' }}>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#d8b4fe' }}>
                <span style={{ width: '7px', height: '7px', background: '#3b0764', border: '1px solid #a855f7', display: 'inline-block' }}></span>
                매니저(입실)
              </span>
              <span style={{ color: '#334155' }}>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#fca5a5' }}>
                <span style={{ width: '7px', height: '7px', background: '#7f1d1d', border: '1px solid #ef4444', display: 'inline-block' }}></span>
                목적지
              </span>
            </div>
          </div>

          {/* [지도 좌측 하단] 지도 엔진 & 실시간 교통 제어 툴바 */}
          <div style={{ position: 'absolute', bottom: '18px', left: '12px', zIndex: 999, display: 'flex', flexDirection: 'column', gap: '5px', pointerEvents: 'auto', background: '#0e121b', border: '1px solid #1e2430', borderRadius: '0px', padding: '7px 9px', boxShadow: '0 4px 12px rgba(0,0,0,0.7)' }}>
            {/* 1. 지도 엔진 선택기 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, width: '56px' }}>지도 타일:</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[
                  { key: 'vworld', label: '국토부 도로망' },
                  { key: 'standard', label: '표준 상세맵' },
                  { key: 'carto-dark', label: '야간 관제' },
                  { key: 'satellite', label: '위성 사진' },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setMapTheme(t.key as any)}
                    style={{
                      background: mapTheme === t.key ? '#1e3a8a' : '#141822',
                      border: '1px solid ' + (mapTheme === t.key ? '#2563eb' : '#232a3b'),
                      color: mapTheme === t.key ? '#93c5fd' : '#94a3b8',
                      padding: '3px 8px',
                      borderRadius: '0px',
                      fontSize: '10px',
                      fontWeight: mapTheme === t.key ? 700 : 500,
                      cursor: 'pointer',
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. 교통정보 오버레이 & 실도로 계수 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', borderTop: '1px solid #1a202c', paddingTop: '5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, width: '56px' }}>동선 연결:</span>
                <span style={{ background: '#0f172a', border: '1px solid #38bdf8', color: '#38bdf8', padding: '2px 7px', fontSize: '9.5px', fontWeight: 800 }}>
                  100% 정밀 직선 (기사·매니저·목적지)
                </span>
              </div>

              {/* 3. 교통 할증 보정 계수 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>속도 보정:</span>
                {[
                  { key: 'fast', label: '쾌속(0.8x)' },
                  { key: 'normal', label: '표준(1.0x)' },
                  { key: 'heavy', label: '정체(1.35x)' },
                ].map((tc) => (
                  <button
                    key={tc.key}
                    onClick={() => setTrafficCondition(tc.key as any)}
                    style={{
                      background: trafficCondition === tc.key ? '#273142' : '#141822',
                      border: '1px solid ' + (trafficCondition === tc.key ? '#475569' : '#1e2430'),
                      color: trafficCondition === tc.key ? '#f8fafc' : '#64748b',
                      padding: '2px 5px',
                      borderRadius: '0px',
                      fontSize: '9.5px',
                      cursor: 'pointer',
                    }}
                  >
                    {tc.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 🌟 [목적지 클릭 시 활성화되는 직관적 관제 카드] 누가 오고 있는지 + 기사~목적지 총 소요시간 */}
          {(() => {
            if (!selectedMissionId) return null;
            const focusedMis = missions.find((m) => m.id === selectedMissionId);
            if (!focusedMis) return null;
            const drv = drivers.find((d) => d.id === focusedMis.driverId);
            const mgr = managers.find((m) => m.id === focusedMis.managerId);
            const minLeft = Math.ceil(focusedMis.remainingSeconds / 60);

            return (
              <div
                style={{
                  position: 'absolute',
                  top: '46px',
                  right: '12px',
                  zIndex: 999,
                  width: '320px',
                  background: '#0d131f',
                  border: '1.5px solid #ef4444',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.85)',
                  padding: '10px 12px',
                  pointerEvents: 'auto',
                }}
              >
                {/* 헤더 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '6px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ background: '#dc2626', color: '#fff', fontSize: '9.5px', fontWeight: 800, padding: '1px 5px', borderRadius: '2px' }}>
                      선택된 목적지
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#f8fafc' }}>
                      {focusedMis.customerName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedMissionId(null)}
                    style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', fontSize: '11px', padding: '1px 6px', cursor: 'pointer', fontWeight: 700 }}
                  >
                    ✕ 닫기
                  </button>
                </div>

                {/* 1. 누가 오고 있는지 */}
                <div style={{ background: '#141c2e', border: '1px solid #1e3a8a', padding: '7px 9px', marginBottom: '8px' }}>
                  <div style={{ fontSize: '10px', color: '#93c5fd', fontWeight: 700, marginBottom: '3px' }}>
                    누가 오고 있는가? (배정 기사 & 탑승 매니저)
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#f8fafc' }}>
                      🚘 <span style={{ color: '#60a5fa' }}>{drv ? `${drv.carNum} (${drv.name})` : '기사 배정중'}</span>
                      <span style={{ color: '#64748b', margin: '0 5px' }}>➔</span>
                      👤 <span style={{ color: '#34d399' }}>{mgr ? `${mgr.name} 매니저` : '매니저'}</span>
                    </div>
                    {drv && (
                      <button
                        type="button"
                        onClick={() => alert(`${drv.name} 기사(${drv.phone}) 즉시 통화 연결`)}
                        style={{ background: '#1e3a8a', border: '1px solid #3b82f6', color: '#fff', fontSize: '10px', padding: '2px 6px', fontWeight: 700, cursor: 'pointer' }}
                      >
                        기사 통화
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. 기사로부터 목적지까지 총 소요시간 */}
                <div style={{ background: '#181309', border: '1px solid #b45309', padding: '7px 9px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                    <span style={{ fontSize: '10px', color: '#fbbf24', fontWeight: 700 }}>
                      기사 ➔ 목적지 총 소요시간
                    </span>
                    <span style={{ fontSize: '9.5px', color: '#94a3b8' }}>
                      예상도착: <b style={{ color: '#f8fafc' }}>{focusedMis.expectedArrivalStr}</b>
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 900, color: '#fde047', fontFamily: 'monospace' }}>
                      약 {minLeft}분
                    </span>
                    <span style={{ fontSize: '11px', color: '#cbd5e1' }}>
                      (잔여 {focusedMis.distKm}km)
                    </span>
                    <span style={{ fontSize: '9.5px', color: '#94a3b8', marginLeft: 'auto' }}>
                      {focusedMis.subStage === 'pickup' ? '매니저 픽업 이동중' : '고객실 이동중'}
                    </span>
                  </div>
                </div>

                {/* 목적지 상세 주소 및 전달 사항 */}
                <div style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '8px', lineHeight: 1.5 }}>
                  <div>📍 <b>주소:</b> {focusedMis.address} ({focusedMis.room})</div>
                  <div>📋 <b>코스:</b> {focusedMis.course} | <b>메모:</b> <span style={{ color: '#fca5a5' }}>{focusedMis.memo || '없음'}</span></div>
                </div>

                {/* 실도로 3대 내비게이션 바로 호출 */}
                <div style={{ display: 'flex', gap: '4px', borderTop: '1px solid #1e293b', paddingTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => launchNavigation('tmap', focusedMis.address, focusedMis.destLat, focusedMis.destLng)}
                    style={{ flex: 1, background: '#1e2433', border: '1px solid #334155', color: '#38bdf8', padding: '4px 0', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    T맵 길안내
                  </button>
                  <button
                    type="button"
                    onClick={() => launchNavigation('kakao', focusedMis.address, focusedMis.destLat, focusedMis.destLng)}
                    style={{ flex: 1, background: '#1e2433', border: '1px solid #334155', color: '#facc15', padding: '4px 0', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    카카오내비
                  </button>
                  <button
                    type="button"
                    onClick={() => launchNavigation('naver', focusedMis.address, focusedMis.destLat, focusedMis.destLng)}
                    style={{ flex: 1, background: '#1e2433', border: '1px solid #334155', color: '#34d399', padding: '4px 0', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    네이버지도
                  </button>
                  <button
                    type="button"
                    onClick={() => openKakaoRoadview(focusedMis.destLat, focusedMis.destLng)}
                    style={{ background: '#1e2433', border: '1px solid #334155', color: '#cbd5e1', padding: '4px 6px', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    로드뷰
                  </button>
                </div>
              </div>
            );
          })()}
        </main>

        {/* [우측] 기사 현황 & 배차 접수 */}
        <aside style={{ background: '#0e1118', borderLeft: '1px solid #1a202c', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '8px 10px', borderBottom: '1px solid #1a202c', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#f1f5f9' }}>차량 운행 현황</span>
            <span style={{ fontSize: '10px', color: '#64748b' }}>{drivers.filter((d) => d.status !== 'offline').length}대 가동</span>
          </div>

          {/* 기사 테이블 */}
          <div style={{ maxHeight: '135px', overflowY: 'auto', borderBottom: '1px solid #1a202c' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10.5px', textAlign: 'left', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ background: '#141822', color: '#64748b', borderBottom: '1px solid #1a202c' }}>
                  <th style={{ padding: '4px 6px', width: '46px' }}>차량</th>
                  <th style={{ padding: '4px 5px', width: '86px' }}>기사명</th>
                  <th style={{ padding: '4px 5px', width: '68px', whiteSpace: 'nowrap' }}>상태</th>
                  <th style={{ padding: '4px 6px' }}>대기위치</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((d) => {
                  const isSelected = selectedDriverId === d.id;
                  const isTransit = d.status === 'transit';
                  return (
                    <tr
                      key={d.id}
                      onClick={() => {
                        if (d.status === 'standby') setSelectedDriverId(d.id);
                        if (mapInstanceRef.current) mapInstanceRef.current.setView([d.lat, d.lng], 16);
                      }}
                      style={{
                        background: isSelected ? '#1e293b' : 'transparent',
                        borderBottom: '1px solid #141822',
                        cursor: 'pointer',
                      }}
                    >
                      <td style={{ padding: '5px 6px', fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap' }}>{d.carNum}</td>
                      <td style={{ padding: '5px 5px', color: '#cbd5e1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={d.name}>{d.name}</td>
                      <td style={{ padding: '5px 5px', color: isTransit ? '#fde047' : '#34d399', fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {isTransit ? `주행(${d.etaMinutes}분)` : '대기'}
                      </td>
                      <td style={{ padding: '5px 6px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={d.location}>
                        {d.location}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 신규 배차 폼 */}
          <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid #1a202c', paddingBottom: '6px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#f1f5f9' }}>배차 오더 접수</span>
              {bestCandidate && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDriverId(bestCandidate.driver.id);
                    setSelectedManagerId(bestCandidate.manager.id);
                  }}
                  style={{
                    background: '#1e293b',
                    border: '1px solid #334155',
                    color: '#93c5fd',
                    padding: '2px 6px',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  title="거리 및 소요시간 기준 가장 가까운 차량과 매니저 자동 지정"
                >
                  권장 배정: {bestCandidate.driver.carNum} + {bestCandidate.manager.name}
                </button>
              )}
            </div>

            {/* 동선 이격거리 주의 안내 */}
            {hasRouteInefficiency && (
              <div style={{ background: '#1c1308', border: '1px solid #b45309', borderRadius: '0px', padding: '6px 8px', marginBottom: '8px', fontSize: '10px', color: '#fde68a' }}>
                <div style={{ fontWeight: 700, color: '#f59e0b', marginBottom: '2px' }}>
                  차량·매니저 이격거리 과다
                </div>
                {isSelectedDriverFar && (
                  <div style={{ lineHeight: 1.4, marginBottom: '3px', color: '#cbd5e1' }}>
                    차량 {previewDrv?.carNum}: 픽업지까지 {previewDist1.toFixed(1)}km (약 {previewEta1}분)
                  </div>
                )}
                {isSelectedManagerFar && (
                  <div style={{ lineHeight: 1.4, marginBottom: '3px', color: '#cbd5e1' }}>
                    매니저 {previewMgr?.name}: 목적지까지 {previewDist2.toFixed(1)}km (약 {previewEta2}분)
                  </div>
                )}
                {bestCandidate && (selectedDriverId !== bestCandidate.driver.id || selectedManagerId !== bestCandidate.manager.id) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDriverId(bestCandidate.driver.id);
                      setSelectedManagerId(bestCandidate.manager.id);
                    }}
                    style={{ width: '100%', background: '#78350f', border: '1px solid #92400e', color: '#fef3c7', padding: '4px', fontSize: '10px', fontWeight: 700, cursor: 'pointer', marginTop: '2px' }}
                  >
                    인근 차량({bestCandidate.driver.carNum} + {bestCandidate.manager.name})으로 변경
                  </button>
                )}
              </div>
            )}

            <form onSubmit={handleExecuteDispatch} style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              {/* 서울 전지역 핫스팟 바로가기 */}
              <div>
                <label style={{ fontSize: '9.5px', color: '#64748b', display: 'block', marginBottom: '3px' }}>
                  권역별 기준점 바로가기:
                </label>
                <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
                  {[
                    { label: '홍대', address: '마포구 서교동 홍대입구역 9번출구 앞', room: '704호', lat: 37.5572, lng: 126.9245 },
                    { label: '강남', address: '강남구 역삼동 테헤란로 152', room: '1202호', lat: 37.5006, lng: 127.0364 },
                    { label: '종로', address: '중구 명동 을지로입구역 5번출구', room: '901호', lat: 37.5662, lng: 126.9825 },
                    { label: '건대', address: '광진구 화양동 건대입구역 2번출구', room: '1503호', lat: 37.5405, lng: 127.0695 },
                    { label: '여의도', address: '영등포구 여의도동 여의도역 5번출구', room: '1105호', lat: 37.5218, lng: 126.9245 },
                    { label: '잠실', address: '송파구 잠실동 롯데월드몰 앞', room: '2001호', lat: 37.5135, lng: 127.1008 },
                    { label: '신림', address: '관악구 신림동 신림역 3번출구', room: '402호', lat: 37.4842, lng: 126.9295 },
                  ].map((spot) => (
                    <button
                      key={spot.label}
                      type="button"
                      onClick={() => {
                        setInputAddress(spot.address);
                        setInputRoom(spot.room);
                        setSelectedCoords({ lat: spot.lat, lng: spot.lng });
                        if (mapInstanceRef.current) {
                          mapInstanceRef.current.setView([spot.lat, spot.lng], 14);
                        }
                      }}
                      style={{
                        background: '#141824',
                        border: '1px solid #232c3f',
                        color: '#93c5fd',
                        padding: '2px 5px',
                        borderRadius: '0px',
                        fontSize: '9.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {spot.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <label style={{ fontSize: '9.5px', color: '#64748b' }}>목적지 주소 (도로명/지번/건물명):</label>
                  <button
                    type="button"
                    onClick={() => openKakaoRoadview(selectedCoords.lat, selectedCoords.lng)}
                    style={{ background: '#0369a1', border: 'none', color: '#ffffff', padding: '1px 6px', borderRadius: '0px', fontSize: '9.5px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    현장 로드뷰
                  </button>
                </div>
                <input
                  type="text"
                  value={inputAddress}
                  onChange={(e) => setInputAddress(e.target.value)}
                  style={{ width: '100%', background: '#141822', border: '1px solid #2d3748', borderRadius: '0px', padding: '5px 7px', color: '#f8fafc', fontSize: '11px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                <div>
                  <label style={{ fontSize: '9.5px', color: '#64748b', display: 'block', marginBottom: '2px' }}>호수:</label>
                  <input
                    type="text"
                    value={inputRoom}
                    onChange={(e) => setInputRoom(e.target.value)}
                    style={{ width: '100%', background: '#141822', border: '1px solid #2d3748', borderRadius: '0px', padding: '5px 7px', color: '#f8fafc', fontSize: '11px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '9.5px', color: '#64748b', display: 'block', marginBottom: '2px' }}>고객명:</label>
                  <input
                    type="text"
                    value={inputCustomer}
                    onChange={(e) => setInputCustomer(e.target.value)}
                    style={{ width: '100%', background: '#141822', border: '1px solid #2d3748', borderRadius: '0px', padding: '5px 7px', color: '#f8fafc', fontSize: '11px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                <div>
                  <label style={{ fontSize: '9.5px', color: '#64748b', display: 'block', marginBottom: '2px' }}>코스:</label>
                  <select
                    value={inputCourse}
                    onChange={(e) => setInputCourse(e.target.value)}
                    style={{ width: '100%', background: '#141822', border: '1px solid #2d3748', borderRadius: '0px', padding: '5px 4px', color: '#f8fafc', fontSize: '10.5px' }}
                  >
                    <option value="타이 60분">타이 60분</option>
                    <option value="타이 90분">타이 90분</option>
                    <option value="아로마 90분">아로마 90분</option>
                    <option value="VIP 120분">VIP 120분</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '9.5px', color: '#64748b', display: 'block', marginBottom: '2px' }}>전달 메모:</label>
                  <input
                    type="text"
                    value={inputMemo}
                    onChange={(e) => setInputMemo(e.target.value)}
                    style={{ width: '100%', background: '#141822', border: '1px solid #2d3748', borderRadius: '0px', padding: '5px 7px', color: '#f8fafc', fontSize: '11px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* 픽업 매니저 및 출동 기사 직접 지정 (실시간 거리 표기) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginTop: '2px' }}>
                <div>
                  <label style={{ fontSize: '9.5px', color: '#64748b', display: 'block', marginBottom: '2px' }}>픽업 매니저:</label>
                  <select
                    value={selectedManagerId}
                    onChange={(e) => setSelectedManagerId(e.target.value)}
                    style={{ width: '100%', background: '#141822', border: '1px solid #2d3748', borderRadius: '0px', padding: '4px', color: '#f8fafc', fontSize: '10px' }}
                  >
                    {managers
                      .filter((m) => m.status !== 'offline')
                      .map((m) => {
                        const distToDest = calcDistanceKm(m.lat, m.lng, selectedCoords.lat, selectedCoords.lng).toFixed(1);
                        return (
                          <option key={m.id} value={m.id}>
                            {m.name} ({m.count}개) [{distToDest}km] {m.status === 'standby' ? '대기' : '운행'}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '9.5px', color: '#64748b', display: 'block', marginBottom: '2px' }}>출동 기사:</label>
                  <select
                    value={selectedDriverId}
                    onChange={(e) => setSelectedDriverId(e.target.value)}
                    style={{ width: '100%', background: '#141822', border: '1px solid #2d3748', borderRadius: '0px', padding: '4px', color: '#f8fafc', fontSize: '10px' }}
                  >
                    {drivers
                      .filter((d) => d.status !== 'offline')
                      .map((d) => {
                        const distToMgr = previewMgr ? calcDistanceKm(d.lat, d.lng, previewMgr.lat, previewMgr.lng).toFixed(1) : 0;
                        return (
                          <option key={d.id} value={d.id}>
                            {d.carNum}·{d.name} [픽업 {distToMgr}km] {d.status === 'standby' ? '대기' : '주행'}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              {/* 실시간 배차 견적 박스 */}
              <div style={{ background: '#0e131d', border: '1px solid #1e3a8a', borderRadius: '0px', padding: '7px 9px', fontSize: '11px', color: '#cbd5e1', marginTop: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#93c5fd', fontWeight: 700 }}>운행 소요시간 산출</span>
                    <span style={{ fontSize: '9px', background: '#1e3a8a', color: '#e0e7ff', padding: '0 4px', borderRadius: '0px' }}>
                      {trafficCondition === 'fast' ? '심야 0.8x' : trafficCondition === 'heavy' ? '정체 1.35x' : '표준 1.0x'}
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#38bdf8' }}>총 {previewTotalEta}분</span>
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8', lineHeight: 1.4 }}>
                  1. {previewDrv?.carNum} ➔ <b style={{ color: '#f8fafc' }}>{previewMgr?.name} 픽업</b>: 약 {previewEta1}분<br />
                  2. {previewMgr?.name} ➔ <b style={{ color: '#f8fafc' }}>목적지 도착</b>: 약 {previewEta2}분
                </div>
                <div style={{ display: 'flex', gap: '4px', marginTop: '5px', borderTop: '1px solid #1e293b', paddingTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => launchNavigation('tmap', inputAddress, selectedCoords.lat, selectedCoords.lng)}
                    style={{ flex: 1, background: '#141a29', border: '1px solid #23314d', color: '#93c5fd', padding: '4px', fontSize: '9.5px', borderRadius: '0px', cursor: 'pointer' }}
                  >
                    티맵 내비 연동
                  </button>
                  <button
                    type="button"
                    onClick={() => launchNavigation('kakao', inputAddress, selectedCoords.lat, selectedCoords.lng)}
                    style={{ flex: 1, background: '#141a29', border: '1px solid #23314d', color: '#fde047', padding: '4px', fontSize: '9.5px', borderRadius: '0px', cursor: 'pointer' }}
                  >
                    카카오내비 연동
                  </button>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: 'auto',
                  padding: '10px',
                  background: '#1d4ed8',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 700,
                  border: '1px solid #2563eb',
                  borderRadius: '0px',
                  cursor: 'pointer',
                }}
              >
                배차 지령 전송 (기사 단말기 하달)
              </button>
            </form>
          </div>
        </aside>
      </div>

      {/* ──────────────── 3. 하단 실시간 오더 현황 & 퀵 컨트롤러 바 (겹침 제로) ──────────────── */}
      <footer style={{ height: '42px', minHeight: '42px', background: '#0a0d14', borderTop: '1px solid #1a202c', padding: '0 10px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1000, boxSizing: 'border-box', overflow: 'hidden' }}>
        {/* 좌측: 실시간 가동 요약 뱃지 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <span style={{ background: '#1e2430', border: '1px solid #334155', color: '#94a3b8', padding: '2px 7px', fontSize: '10.5px', fontWeight: 800, fontFamily: 'monospace' }}>
            실시간 오더 ({missions.length})
          </span>
        </div>

        {/* 중앙: 전체 오더 가로 스크롤 칩 리스트 (절대 겹치지 않는 슬림 뱃지) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, overflowX: 'auto', whiteSpace: 'nowrap', padding: '2px 0' }}>
          {missions.length === 0 ? (
            <span style={{ fontSize: '11px', color: '#64748b' }}>현재 진행 중인 오더가 없습니다.</span>
          ) : (
            missions.map((mis) => {
              const isMoving = mis.stage === 'moving';
              const isSelected = selectedMissionId === mis.id;
              const mgr = managers.find((m) => m.id === mis.managerId);
              const drv = drivers.find((d) => d.id === mis.driverId);
              const minLeft = Math.ceil(mis.remainingSeconds / 60);

              const chipBg = isSelected ? '#1e293b' : isMoving ? '#0f172a' : '#1a102b';
              const chipBorder = isSelected ? '#38bdf8' : isMoving ? '#2563eb' : '#9333ea';
              const chipText = isSelected ? '#ffffff' : isMoving ? '#93c5fd' : '#d8b4fe';

              return (
                <div
                  key={mis.id}
                  onClick={() => {
                    setSelectedMissionId(mis.id);
                    if (drv) setSelectedDriverId(drv.id);
                    if (mgr) setSelectedManagerId(mgr.id);
                    if (mapInstanceRef.current && drv) {
                      mapInstanceRef.current.fitBounds([
                        [drv.lat, drv.lng],
                        [mis.destLat, mis.destLng]
                      ], { padding: [80, 80], maxZoom: 16 });
                    }
                  }}
                  style={{
                    background: chipBg,
                    border: `1px solid ${chipBorder}`,
                    padding: '3px 8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    flexShrink: 0,
                    boxShadow: isSelected ? '0 0 6px rgba(56, 189, 248, 0.4)' : 'none',
                  }}
                >
                  <span style={{ background: isMoving ? '#1e40af' : '#6b21a8', color: '#fff', padding: '0 4px', fontSize: '9px', fontWeight: 800 }}>
                    #{mis.id}
                  </span>
                  <span style={{ color: chipText, fontWeight: 700 }}>
                    {mis.address.split(' ').slice(0, 2).join(' ')} ({mis.room})
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: '10px' }}>
                    {mgr?.name}·{drv?.carNum}
                  </span>
                  <span style={{ color: isMoving ? '#fde047' : '#a78bfa', fontWeight: 800, fontSize: '10px' }}>
                    {isMoving ? `${minLeft}분 도착` : `입실 ${mis.remainingMinutes}분`}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* 우측: 선택된(또는 기준) 오더 원터치 액션 컨트롤러 */}
        {(() => {
          const targetMis = missions.find((m) => m.id === selectedMissionId) || missions[0];
          if (!targetMis) return null;
          const targetMgr = managers.find((m) => m.id === targetMis.managerId);
          const targetDrv = drivers.find((d) => d.id === targetMis.driverId);

          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0, borderLeft: '1px solid #1e2430', paddingLeft: '8px' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>
                [#{targetMis.id}]
              </span>
              {targetMis.stage === 'moving' ? (
                <button
                  type="button"
                  onClick={() => {
                    setMissions((prev) =>
                      prev.map((m) => (m.id === targetMis.id ? { ...m, stage: 'working', remainingMinutes: 90 } : m))
                    );
                    setManagers((prev) =>
                      prev.map((m) => (m.id === targetMis.managerId ? { ...m, status: 'working', remainingMinutes: 90 } : m))
                    );
                  }}
                  style={{ background: '#1d4ed8', border: '1px solid #2563eb', color: '#fff', fontSize: '10.5px', padding: '3px 8px', cursor: 'pointer', fontWeight: 700 }}
                >
                  입실 완료
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setExitCallModal({
                      missionId: targetMis.id,
                      managerName: targetMgr?.name || '매니저',
                      driverName: targetDrv ? `${targetDrv.carNum}·${targetDrv.name}` : '배정기사',
                      room: targetMis.room,
                    })
                  }
                  style={{ background: '#7f1d1d', border: '1px solid #dc2626', color: '#fff', fontSize: '10.5px', padding: '3px 8px', cursor: 'pointer', fontWeight: 800 }}
                >
                  5분전 퇴실호출
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setMissions((prev) => prev.filter((m) => m.id !== targetMis.id));
                  setManagers((prev) => prev.map((m) => (m.id === targetMis.managerId ? { ...m, status: 'standby' } : m)));
                  setDrivers((prev) => prev.map((d) => (d.id === targetMis.driverId ? { ...d, status: 'standby', etaMinutes: 0 } : d)));
                  if (selectedMissionId === targetMis.id) setSelectedMissionId(null);
                }}
                style={{ background: '#1e2430', border: '1px solid #334155', color: '#94a3b8', fontSize: '10px', padding: '3px 7px', cursor: 'pointer' }}
                title="해당 오더 완료 및 자원 대기 전환"
              >
                오더 종료
              </button>
            </div>
          );
        })()}
      </footer>

      {/* ──────────────── 4. 오야 출동 지령 팝업 모달 ──────────────── */}
      {dispatchOrderModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#11141c', border: '1px solid #1d4ed8', borderRadius: '0px', width: '420px', maxWidth: '90vw', padding: '16px', color: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e2430', paddingBottom: '8px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ background: '#1e3a8a', color: '#93c5fd', padding: '2px 6px', borderRadius: '0px', fontSize: '11px', fontWeight: 700 }}>출동 지령</span>
                <span style={{ fontSize: '12.5px', fontWeight: 700 }}>수신: {dispatchOrderModal.carNum}·{dispatchOrderModal.driverName}</span>
              </div>
              <button onClick={() => setDispatchOrderModal(null)} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '16px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ background: '#0a0d14', border: '1px solid #1e2430', borderRadius: '0px', padding: '10px 12px', fontSize: '11.5px', fontFamily: 'monospace', lineHeight: 1.6, marginBottom: '12px' }}>
              <div style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '4px' }}>
                [1단계 픽업] {dispatchOrderModal.managerName} 매니저
              </div>
              <div style={{ color: '#94a3b8', paddingLeft: '8px', marginBottom: '6px' }}>
                위치: {dispatchOrderModal.managerLoc} (약 {dispatchOrderModal.step1Eta}분 소요)
              </div>

              <div style={{ color: '#fbbf24', fontWeight: 700, marginBottom: '4px' }}>
                [2단계 이동] {dispatchOrderModal.destAddress}
              </div>
              <div style={{ color: '#94a3b8', paddingLeft: '8px', marginBottom: '6px' }}>
                호수: {dispatchOrderModal.room} | 코스: {dispatchOrderModal.course} (약 {dispatchOrderModal.step2Eta}분 소요)
              </div>

              <div style={{ borderTop: '1px solid #1e2430', paddingTop: '6px', marginTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#e2e8f0', fontWeight: 700 }}>총 예상 소요시간:</span>
                <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '12.5px' }}>총 {dispatchOrderModal.totalEta}분</span>
              </div>
              {dispatchOrderModal.memo && (
                <div style={{ color: '#fca5a5', marginTop: '4px', fontSize: '10.5px' }}>
                  전달메모: {dispatchOrderModal.memo}
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <button
                onClick={() => {
                  const text = `[출동지령] ${dispatchOrderModal.carNum}·${dispatchOrderModal.driverName}\n1. 픽업: ${dispatchOrderModal.managerName} (${dispatchOrderModal.managerLoc}) [${dispatchOrderModal.step1Eta}분]\n2. 목적지: ${dispatchOrderModal.destAddress} (${dispatchOrderModal.room}) [${dispatchOrderModal.step2Eta}분]\n총 ${dispatchOrderModal.totalEta}분 소요 | 코스: ${dispatchOrderModal.course}\n메모: ${dispatchOrderModal.memo}\n※ 안내: 주차장 도착시 호출 / 현관비번 확인 / 호텔·모텔은 도착전 전화 후 1층 로비 미팅`;
                  navigator.clipboard.writeText(text);
                  alert('기사 전송용 지령 메시지가 복사되었습니다.');
                }}
                style={{ background: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', padding: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', borderRadius: '0px' }}
              >
                지령문 복사
              </button>
              <button
                onClick={() => setDispatchOrderModal(null)}
                style={{ background: '#1d4ed8', border: '1px solid #2563eb', color: '#fff', padding: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', borderRadius: '0px' }}
              >
                지령 전송 하달
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── 5. 5분전 퇴실 픽업장소 약속 모달 ──────────────── */}
      {exitCallModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#11141c', border: '1px solid #991b1b', borderRadius: '0px', width: '380px', maxWidth: '90vw', padding: '16px', color: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e2430', paddingBottom: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#f87171' }}>
                [퇴실 5분 전] 픽업 접견 장소 지정
              </span>
              <button onClick={() => setExitCallModal(null)} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '16px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ fontSize: '11px', color: '#cbd5e1', marginBottom: '10px' }}>
              <b>{exitCallModal.managerName}</b> ({exitCallModal.room}) ➔ <b>{exitCallModal.driverName}</b> 접견 위치:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '10px' }}>
              {['1층 정문 로비 앞', '지하 1층 주차장 앞', '건물 후문 골목', '기사 직통 전화'].map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    alert(`[기사 알림 전송]\n${exitCallModal.driverName}님, ${exitCallModal.managerName} 매니저가 5분 뒤 [${loc}]에서 픽업 대기합니다.`);
                    setExitCallModal(null);
                  }}
                  style={{ background: '#161b26', border: '1px solid #283347', color: '#f1f5f9', padding: '8px 6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', borderRadius: '0px' }}
                >
                  {loc}
                </button>
              ))}
            </div>

            <div style={{ fontSize: '9.5px', color: '#64748b', textAlign: 'center' }}>
              선택 시 기사 단말기 및 텔레그램으로 접견 위치가 즉시 전송됩니다.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
