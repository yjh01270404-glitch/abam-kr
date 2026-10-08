'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────────────────────
   아밤(Abam.kr) 스마트 관제탑 (Abam Dispatch Cockpit)
   태블릿 가로화면 최적화 + 사장/기사/매니저 3자 무소통 자동화 관제 시스템
───────────────────────────────────────────────────────────── */

type Role = 'boss' | 'driver' | 'manager';

interface Manager {
  id: string;
  name: string;
  status: 'offline' | 'standby' | 'transit' | 'working' | 'ready_pickup';
  count: number; // 오늘 뛴 갯수
  currentMissionId?: string;
  photo: string;
  workStartTime?: string;
  remainingMinutes?: number;
}

interface Driver {
  id: string;
  carName: string; // 1호차, 2호차 등
  driverName: string;
  status: 'offline' | 'standby' | 'transit' | 'pickup_standby';
  currentZone: string; // 현재 대기 구역
  currentMissionId?: string;
  etaMinutes?: number;
}

interface Mission {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  roomDetail: string;
  courseName: string;
  courseDuration: number; // 60, 90, 120분
  price: string;
  tags: string[];
  managerId: string;
  driverId: string;
  stage: 'assigned' | 'moving' | 'arrived' | 'working' | 'pickup_ready' | 'completed';
  createdAt: number;
  workStartTime?: number;
  officialEndTime?: number;
  pickupTargetTime?: number; // 공식종료 - 20분
  earlyAlertSent?: boolean;
}

// 사운드 비프 생성기 (외부 파일 없이 브라우저 Web Audio API로 즉각 재생)
const playBeep = (freq: number = 880, duration: number = 0.2, type: OscillatorType = 'sine') => {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // ignore
  }
};

export default function SmartDispatchPage() {
  const [role, setRole] = useState<Role>('boss');
  const [currentTime, setCurrentTime] = useState<string>('');

  // 매니저 초기 출근부
  const [managers, setManagers] = useState<Manager[]>([
    { id: 'm1', name: '가빈', status: 'working', count: 2, photo: '/images/t_gabin.jpg', remainingMinutes: 38 },
    { id: 'm2', name: '송이', status: 'standby', count: 1, photo: '/images/t_songi.jpg' },
    { id: 'm3', name: '지나', status: 'standby', count: 1, photo: '/images/t_jina.jpg' },
    { id: 'm4', name: '보름', status: 'standby', count: 2, photo: '/images/t_boreum.jpg' },
    { id: 'm5', name: '수은', status: 'offline', count: 0, photo: '/images/t_sueun.jpg' },
    { id: 'm6', name: '수지', status: 'standby', count: 1, photo: '/images/t_suji.jpg' },
    { id: 'm7', name: '애니', status: 'offline', count: 0, photo: '/images/t_annie.jpg' },
    { id: 'm8', name: '예린', status: 'standby', count: 2, photo: '/images/t_yerin.jpg' },
    { id: 'm9', name: '지유', status: 'offline', count: 0, photo: '/images/t_jiyu.jpg' },
    { id: 'm10', name: '해인', status: 'standby', count: 3, photo: '/images/t_haein.jpg' },
  ]);

  // 기사 초기 출근부
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: 'd1', carName: '1호차', driverName: '김기사', status: 'standby', currentZone: '강남 역삼동', etaMinutes: 8 },
    { id: 'd2', carName: '2호차', driverName: '박기사', status: 'transit', currentZone: '서초 반포동', etaMinutes: 14 },
    { id: 'd3', carName: '3호차', driverName: '최기사', status: 'pickup_standby', currentZone: '송파 잠실동', etaMinutes: 2 },
  ]);

  // 진행 중인 미션(콜)
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 'col-101',
      customerName: '김*호 고객님',
      phone: '010-9821-****',
      address: '강남구 역삼동 신라스테이 역삼',
      roomDetail: '1204호',
      courseName: '타이 90분',
      courseDuration: 90,
      price: '100,000원',
      tags: ['🚪 노크 2번 (벨X)', '💵 현금 결제'],
      managerId: 'm1',
      driverId: 'd1',
      stage: 'working',
      createdAt: Date.now() - 52 * 60 * 1000,
      workStartTime: Date.now() - 52 * 60 * 1000,
      officialEndTime: Date.now() + 38 * 60 * 1000,
      pickupTargetTime: Date.now() + 18 * 60 * 1000, // 공식종료 - 20분 (앞으로 18분 뒤 현장 대기 필수!)
      earlyAlertSent: true,
    },
  ]);

  // 신규 콜 접수용 폼 상태
  const [newCustomer, setNewCustomer] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [newCourse, setNewCourse] = useState('타이 90분 (10만)');
  const [newDuration, setNewDuration] = useState(90);
  const [newPrice, setNewPrice] = useState('100,000원');
  const [selectedTags, setSelectedTags] = useState<string[]>(['🚪 노크 2번 (벨X)']);
  const [smartPasteText, setSmartPasteText] = useState('');
  const [showPasteModal, setShowPasteModal] = useState(false);

  // 시계 갱신 및 타이머 틱
  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setCurrentTime(
        `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 공평 갯수 알고리즘: 출근한 매니저 중 '가장 갯수가 적은 매니저' 1순위 추천
  const standbyManagers = managers
    .filter((m) => m.status === 'standby')
    .sort((a, b) => a.count - b.count);

  const bestRecommendedManager = standbyManagers[0];
  const bestRecommendedDriver = drivers.find((d) => d.status === 'standby') || drivers[0];

  const [selectedManagerId, setSelectedManagerId] = useState<string>(bestRecommendedManager?.id || '');
  const [selectedDriverId, setSelectedDriverId] = useState<string>(bestRecommendedDriver?.id || '');

  useEffect(() => {
    if (bestRecommendedManager && !selectedManagerId) {
      setSelectedManagerId(bestRecommendedManager.id);
    }
    if (bestRecommendedDriver && !selectedDriverId) {
      setSelectedDriverId(bestRecommendedDriver.id);
    }
  }, [standbyManagers.length, drivers.length]);

  // 카톡/문자 스마트 자동 파싱 함수
  const handleSmartParse = () => {
    if (!smartPasteText.trim()) return;
    const t = smartPasteText;

    // 코스 파싱
    if (t.includes('120') || t.includes('2시간')) {
      setNewDuration(120);
      setNewCourse(t.includes('스페셜') ? '스페셜 120분 (16만)' : '아로마 120분 (14만)');
      setNewPrice(t.includes('스페셜') ? '160,000원' : '140,000원');
    } else if (t.includes('90') || t.includes('한시간반')) {
      setNewDuration(90);
      setNewCourse(t.includes('아로마') ? '아로마 90분 (11만)' : t.includes('스페셜') ? '스페셜 90분 (12만)' : '타이 90분 (10만)');
      setNewPrice(t.includes('스페셜') ? '120,000원' : t.includes('아로마') ? '110,000원' : '100,000원');
    } else {
      setNewDuration(60);
      setNewCourse('타이 60분 (8만)');
      setNewPrice('80,000원');
    }

    // 호수 파싱 (예: 1204호, 702호 등)
    const roomMatch = t.match(/\d{2,4}호/);
    if (roomMatch) {
      setNewRoom(roomMatch[0]);
    }

    // 주소 대략 추출
    setNewAddress(t.replace(/\d{2,4}호/, '').replace(/타이|아로마|스페셜|60분|90분|120분/g, '').trim());
    setNewCustomer('예약 손님');
    setNewPhone('010-****-1004');
    setShowPasteModal(false);
    setSmartPasteText('');
    playBeep(1200, 0.15);
  };

  // 신규 배차 실행
  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress) {
      alert('주소나 목적지를 입력하거나 선택해 주세요.');
      return;
    }
    const mgrId = selectedManagerId || bestRecommendedManager?.id;
    const drvId = selectedDriverId || bestRecommendedDriver?.id;
    if (!mgrId || !drvId) {
      alert('출근 중인 매니저 또는 기사가 없습니다.');
      return;
    }

    const newMis: Mission = {
      id: `col-${Date.now().toString().slice(-4)}`,
      customerName: newCustomer || '예약 고객님',
      phone: newPhone || '010-6607-2239',
      address: newAddress,
      roomDetail: newRoom || '호수 도착 전 확인',
      courseName: newCourse,
      courseDuration: newDuration,
      price: newPrice,
      tags: selectedTags,
      managerId: mgrId,
      driverId: drvId,
      stage: 'moving',
      createdAt: Date.now(),
    };

    setMissions((prev) => [newMis, ...prev]);

    // 매니저 & 기사 상태 업데이트
    setManagers((prev) =>
      prev.map((m) => (m.id === mgrId ? { ...m, status: 'transit', count: m.count + 1, currentMissionId: newMis.id } : m))
    );
    setDrivers((prev) =>
      prev.map((d) => (d.id === drvId ? { ...d, status: 'transit', currentMissionId: newMis.id, etaMinutes: 12 } : d))
    );

    // 폼 리셋
    setNewAddress('');
    setNewRoom('');
    playBeep(980, 0.25, 'triangle');
    alert(`🚀 [배차 성공!] ${newMis.customerName} 콜이 매니저 [${managers.find((m) => m.id === mgrId)?.name}] 및 [${drivers.find((d) => d.id === drvId)?.carName}]에 자동 배차되었습니다.`);
  };

  // 매니저 입실 완료 처리 (골든 20분 조기 픽업 타이머 가동)
  const handleManagerCheckIn = (missionId: string) => {
    const now = Date.now();
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId) {
          const officialEnd = now + m.courseDuration * 60 * 1000;
          const pickupTarget = officialEnd - 20 * 60 * 1000; // 공식시간보다 20분 일찍 기사 대기 목표!
          return {
            ...m,
            stage: 'working',
            workStartTime: now,
            officialEndTime: officialEnd,
            pickupTargetTime: pickupTarget,
          };
        }
        return m;
      })
    );
    playBeep(880, 0.2);
  };

  // 매니저 조기 퇴실 임박 (5분 뒤 내려감)
  const handleEarlyNotice = (missionId: string) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, stage: 'pickup_ready' } : m))
    );
    playBeep(1400, 0.3, 'sawtooth');
    alert('🚨 [기사 알림 발송] 매니저님이 샤워를 마치고 5분 내 퇴실합니다! 기사님은 건물 바로 앞 픽업 위치로 차를 이동해 주세요.');
  };

  // 미션 최종 완료
  const handleCompleteMission = (missionId: string) => {
    const mis = missions.find((m) => m.id === missionId);
    if (!mis) return;

    setMissions((prev) => prev.filter((m) => m.id !== missionId));
    setManagers((prev) =>
      prev.map((m) => (m.id === mis.managerId ? { ...m, status: 'standby', currentMissionId: undefined } : m))
    );
    setDrivers((prev) =>
      prev.map((d) => (d.id === mis.driverId ? { ...d, status: 'standby', currentMissionId: undefined, etaMinutes: 0 } : d))
    );
    playBeep(600, 0.2);
    alert('✅ 콜 운행 및 정산이 정상 완료되어 매니저와 기사가 [대기중]으로 복귀했습니다.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#070b10', color: '#f3f4f6', fontFamily: 'Pretendard, system-ui, sans-serif' }}>
      {/* ──────────────── 상단 관제탑 헤더 ──────────────── */}
      <header style={{ background: '#0d131a', borderBottom: '1px solid #1f2937', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#e0b04a', letterSpacing: '-0.5px' }}>
            ABAM <span style={{ color: '#fff' }}>관제탑</span>
          </div>
          <span style={{ fontSize: '11px', background: 'rgba(224,176,74,0.15)', color: '#f3d58e', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
            태블릿 실시간 스마트 관제판
          </span>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#60a5fa', fontFamily: 'monospace' }}>
            🕒 {currentTime || '04:00:00'}
          </div>
        </div>

        {/* 3자 역할 스위처 (사장님 / 기사님 / 매니저님 화면 시뮬레이션) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#111827', padding: '4px', borderRadius: '8px', border: '1px solid #374151' }}>
          <span style={{ fontSize: '11px', color: '#9ca3af', padding: '0 6px' }}>역할 전환:</span>
          <button
            onClick={() => setRole('boss')}
            style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 800, borderRadius: '6px', background: role === 'boss' ? '#e0b04a' : 'transparent', color: role === 'boss' ? '#000' : '#9ca3af' }}
          >
            👑 사장님 관제탑
          </button>
          <button
            onClick={() => setRole('driver')}
            style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 800, borderRadius: '6px', background: role === 'driver' ? '#3b82f6' : 'transparent', color: role === 'driver' ? '#fff' : '#9ca3af' }}
          >
            🚗 기사님 HUD
          </button>
          <button
            onClick={() => setRole('manager')}
            style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 800, borderRadius: '6px', background: role === 'manager' ? '#ec4899' : 'transparent', color: role === 'manager' ? '#fff' : '#9ca3af' }}
          >
            🌸 매니저님 출근폰
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/abam-nightman-2026" style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'none', padding: '6px 10px', border: '1px solid #374151', borderRadius: '6px' }}>
            ← 일반 관리자
          </Link>
        </div>
      </header>

      {/* ──────────────── 1. 사장님 관제탑 화면 (메인 태블릿 장기판) ──────────────── */}
      {role === 'boss' && (
        <div style={{ padding: '16px', maxWidth: '1600px', margin: '0 auto' }}>
          {/* 상단 브리핑 메트릭 카드 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '14px', borderRadius: '10px' }}>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>출근 매니저 전력</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#4ade80', marginTop: '4px' }}>
                {managers.filter((m) => m.status !== 'offline').length} / {managers.length}명
              </div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>대기 {managers.filter((m) => m.status === 'standby').length}명 · 관리중 {managers.filter((m) => m.status === 'working').length}명</div>
            </div>
            <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '14px', borderRadius: '10px' }}>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>운행 차량 기사</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#60a5fa', marginTop: '4px' }}>
                {drivers.filter((d) => d.status !== 'offline').length}대 가동
              </div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>즉시 배차 가능 {drivers.filter((d) => d.status === 'standby').length}대</div>
            </div>
            <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '14px', borderRadius: '10px' }}>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>오늘 누적 콜 / 배차중</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#f59e0b', marginTop: '4px' }}>
                {missions.length + 8}건 완료 · {missions.length}건 진행중
              </div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>공평 배차 밸런서 정상 작동중</div>
            </div>
            <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '14px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  playBeep(1200, 0.3, 'sawtooth');
                  alert('📢 전체 기사·매니저 폰으로 [비상 출근 현황 점검] 알림 신호를 송출했습니다.');
                }}
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 800, fontSize: '13px' }}
              >
                🚨 전체 차량 위치 비상 점검
              </button>
            </div>
          </div>

          {/* 메인 3단 장기판 레이아웃 */}
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 340px', gap: '16px', alignItems: 'start' }}>
            {/* [좌측 1단] ♟️ 매니저 출근 장기판 (갯수 균등 밸런서) */}
            <div style={{ background: '#0e1520', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#f3d58e', margin: 0 }}>
                  ♟️ 매니저 출근판
                </h3>
                <span style={{ fontSize: '11px', color: '#9ca3af' }}>갯수 순 자동정렬</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '720px', overflowY: 'auto' }}>
                {managers.map((m) => {
                  const isBest = bestRecommendedManager?.id === m.id;
                  const isSelected = selectedManagerId === m.id;
                  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
                    offline: { bg: '#374151', text: '#9ca3af', label: '미출근' },
                    standby: { bg: '#065f46', text: '#34d399', label: '대기중' },
                    transit: { bg: '#854d0e', text: '#fde047', label: '이동중' },
                    working: { bg: '#1e3a8a', text: '#93c5fd', label: '관리중' },
                    ready_pickup: { bg: '#991b1b', text: '#fca5a5', label: '픽업대기' },
                  };
                  const st = statusColors[m.status];

                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        if (m.status !== 'offline') setSelectedManagerId(m.id);
                      }}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: isSelected ? 'rgba(224,176,74,0.18)' : '#131b26',
                        border: isSelected ? '2px solid #e0b04a' : '1px solid #1f2a38',
                        cursor: m.status !== 'offline' ? 'pointer' : 'default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ position: 'relative' }}>
                          <img src={m.photo} alt={m.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                          {isBest && (
                            <span style={{ position: 'absolute', top: '-5px', left: '-5px', background: '#e0b04a', color: '#000', fontSize: '9px', fontWeight: 900, padding: '1px 4px', borderRadius: '4px' }}>
                              추천1위
                            </span>
                          )}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>
                            {m.name}
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b', marginLeft: '6px' }}>
                              ({m.count}개)
                            </span>
                          </div>
                          {m.status === 'working' ? (
                            <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 700 }}>
                              ⏱️ 약 {m.remainingMinutes || 35}분 남음
                            </div>
                          ) : (
                            <div style={{ fontSize: '11px', color: '#9ca3af' }}>
                              {m.status === 'standby' ? '배차 대기 완료' : '오프라인'}
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', background: st.bg, color: st.text }}>
                          {st.label}
                        </span>
                        <div style={{ marginTop: '4px' }}>
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
                            style={{ fontSize: '10px', background: 'transparent', border: '1px solid #374151', color: '#9ca3af', padding: '1px 5px', borderRadius: '3px' }}
                          >
                            {m.status === 'offline' ? '출근' : '퇴근'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* [중앙 2단] 🗺️ 실시간 콜 상황판 & 3초 퀵 접수 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* 퀵 콜 접수 패널 (수기 0% 터치 방식) */}
              <div style={{ background: '#0e1520', border: '1px solid #e0b04a', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#e0b04a' }}>
                    ⚡ 3초 스마트 콜 배차 (수기 타이핑 0%)
                  </div>
                  <button
                    onClick={() => setShowPasteModal(true)}
                    style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}
                  >
                    📋 카톡 주소 스마트 붙여넣기
                  </button>
                </div>

                <form onSubmit={handleDispatchSubmit}>
                  {/* 지역 퀵 선택 칩 */}
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '6px' }}>지역 빠른 선택 (원터치):</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {['강남 역삼동 호텔', '강남 논현동 레지던스', '서초 반포동 아파트', '송파 잠실 호텔', '마포 홍대입구', '영등포 여의도 호텔', '용산 이태원/한남'].map((zone) => (
                        <button
                          key={zone}
                          type="button"
                          onClick={() => setNewAddress(zone)}
                          style={{
                            padding: '5px 10px',
                            fontSize: '12px',
                            fontWeight: 700,
                            borderRadius: '6px',
                            background: newAddress.includes(zone.split(' ')[1] || zone) ? '#e0b04a' : '#1f2937',
                            color: newAddress.includes(zone.split(' ')[1] || zone) ? '#000' : '#d1d5db',
                            border: 'none',
                          }}
                        >
                          {zone}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 목적지 세부 및 코스 선택 */}
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      placeholder="목적지 호텔 / 건물명 (위 버튼 터치 또는 입력)"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      style={{ background: '#111827', border: '1px solid #374151', padding: '10px 12px', borderRadius: '6px', color: '#fff', fontSize: '13px' }}
                    />
                    <input
                      type="text"
                      placeholder="호수 (예: 1204호)"
                      value={newRoom}
                      onChange={(e) => setNewRoom(e.target.value)}
                      style={{ background: '#111827', border: '1px solid #374151', padding: '10px 12px', borderRadius: '6px', color: '#fff', fontSize: '13px' }}
                    />
                  </div>

                  {/* 코스 선택 칩 */}
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '6px' }}>코스 선택:</div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {[
                        { name: '타이 60분 (8만)', dur: 60, p: '80,000원' },
                        { name: '타이 90분 (10만)', dur: 90, p: '100,000원' },
                        { name: '아로마 90분 (11만)', dur: 90, p: '110,000원' },
                        { name: '스페셜 90분 (12만)', dur: 90, p: '120,000원' },
                        { name: '스페셜 120분 (16만)', dur: 120, p: '160,000원' },
                      ].map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => {
                            setNewCourse(c.name);
                            setNewDuration(c.dur);
                            setNewPrice(c.p);
                          }}
                          style={{
                            padding: '6px 10px',
                            fontSize: '12px',
                            fontWeight: 700,
                            borderRadius: '6px',
                            background: newCourse === c.name ? '#f59e0b' : '#1f2937',
                            color: newCourse === c.name ? '#000' : '#d1d5db',
                            border: 'none',
                          }}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 요청사항 원터치 칩 */}
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '6px' }}>요청사항 칩 (누르면 기사에게 음성 자동 전달):</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {['🚪 노크 2번 (벨X)', '🏨 호텔 로비 문자만', '🅿️ 후문 골목 주차', '💵 현금 10만 준비', '⚡ 20분 내 도착요청'].map((tag) => {
                        const hasTag = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              setSelectedTags((prev) => (hasTag ? prev.filter((t) => t !== tag) : [...prev, tag]));
                            }}
                            style={{
                              padding: '4px 9px',
                              fontSize: '11.5px',
                              borderRadius: '20px',
                              background: hasTag ? '#10b981' : '#1f2937',
                              color: hasTag ? '#000' : '#9ca3af',
                              fontWeight: 700,
                              border: 'none',
                            }}
                          >
                            {tag} {hasTag ? '✓' : '+'}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 스마트 매칭 결과 및 원클릭 배차 버튼 */}
                  <div style={{ background: '#151f2c', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#9ca3af' }}>시스템 자동 추천 매칭:</div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginTop: '2px' }}>
                        매니저: <span style={{ color: '#f3d58e' }}>{managers.find((m) => m.id === selectedManagerId)?.name}</span> (오늘 {managers.find((m) => m.id === selectedManagerId)?.count}개) ｜ 기사: <span style={{ color: '#60a5fa' }}>{drivers.find((d) => d.id === selectedDriverId)?.carName} ({drivers.find((d) => d.id === selectedDriverId)?.driverName})</span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      style={{
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg, #e0b04a, #d49f33)',
                        color: '#000',
                        fontSize: '15px',
                        fontWeight: 900,
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(224,176,74,0.3)',
                      }}
                    >
                      🚀 즉시 배차 출발
                    </button>
                  </div>
                </form>
              </div>

              {/* 실시간 진행중인 미션 현황 카드 */}
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
                  🔴 실시간 진행 오더 ({missions.length}건 운행중)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {missions.map((mis) => {
                    const mgr = managers.find((m) => m.id === mis.managerId);
                    const drv = drivers.find((d) => d.id === mis.driverId);

                    return (
                      <div
                        key={mis.id}
                        style={{
                          background: '#0e1520',
                          border: mis.stage === 'pickup_ready' ? '2px solid #ef4444' : '1px solid #1f2a38',
                          borderRadius: '10px',
                          padding: '16px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '12px', background: '#374151', padding: '2px 6px', borderRadius: '4px', color: '#d1d5db' }}>
                              {mis.id}
                            </span>
                            <span style={{ fontSize: '16px', fontWeight: 900, color: '#fff' }}>{mis.customerName}</span>
                            <span style={{ fontSize: '13px', color: '#e0b04a', fontWeight: 800 }}>{mis.courseName}</span>
                          </div>
                          <div style={{ fontSize: '12px', color: '#9ca3af' }}>{mis.price}</div>
                        </div>

                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#d1d5db', marginBottom: '6px' }}>
                          📍 {mis.address} <span style={{ color: '#60a5fa' }}>({mis.roomDetail})</span>
                        </div>

                        {/* 요청사항 칩 표시 */}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                          {mis.tags.map((t) => (
                            <span key={t} style={{ fontSize: '11px', background: 'rgba(255,255,255,0.06)', color: '#9ca3af', padding: '2px 7px', borderRadius: '4px' }}>
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* ★ 골든 20분 조기 픽업 타이머 바 */}
                        <div style={{ background: '#111827', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #ef4444', marginBottom: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                            <span style={{ color: '#9ca3af' }}>담당 매니저: <b style={{ color: '#fff' }}>{mgr?.name}</b></span>
                            <span style={{ color: '#9ca3af' }}>담당 차량: <b style={{ color: '#60a5fa' }}>{drv?.carName} ({drv?.driverName})</b></span>
                          </div>

                          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                            <div>
                              <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: 800 }}>★ 조기 퇴실 대비 픽업 목표 시간:</div>
                              <div style={{ fontSize: '16px', fontWeight: 900, color: '#f87171' }}>
                                종료 20분 전 현장 대기 (앞으로 약 18분 뒤 도착 스탠바이)
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '11px', color: '#9ca3af' }}>공식 관리 종료 예정:</div>
                              <div style={{ fontSize: '13px', color: '#d1d5db' }}>38분 남음</div>
                            </div>
                          </div>
                        </div>

                        {/* 컨트롤 액션 버튼 */}
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleEarlyNotice(mis.id)}
                            style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 800 }}
                          >
                            🚨 5분 전 퇴실 기사 호출
                          </button>
                          <button
                            onClick={() => handleCompleteMission(mis.id)}
                            style={{ background: '#10b981', color: '#000', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 900 }}
                          >
                            ✅ 결제 및 오더 완료
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* [우측 3단] 🚗 기사 출근판 & 차량 관제 (운전 중 연락 0%) */}
            <div style={{ background: '#0e1520', border: '1px solid #1f2937', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#60a5fa', margin: 0 }}>
                  🚗 기사 차량 관제판
                </h3>
                <span style={{ fontSize: '11px', color: '#9ca3af' }}>실시간 ETA 연동</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {drivers.map((d) => {
                  const isSelected = selectedDriverId === d.id;
                  const stColors: Record<string, { bg: string; text: string; label: string }> = {
                    offline: { bg: '#374151', text: '#9ca3af', label: '운행종료' },
                    standby: { bg: '#065f46', text: '#34d399', label: '대기중' },
                    transit: { bg: '#854d0e', text: '#fde047', label: '이동중' },
                    pickup_standby: { bg: '#1e3a8a', text: '#93c5fd', label: '픽업대기' },
                  };
                  const st = stColors[d.status];

                  return (
                    <div
                      key={d.id}
                      onClick={() => {
                        if (d.status !== 'offline') setSelectedDriverId(d.id);
                      }}
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        background: isSelected ? 'rgba(96,165,250,0.15)' : '#131b26',
                        border: isSelected ? '2px solid #60a5fa' : '1px solid #1f2a38',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#fff' }}>
                          {d.carName} <span style={{ fontSize: '13px', color: '#9ca3af' }}>({d.driverName})</span>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 7px', borderRadius: '4px', background: st.bg, color: st.text }}>
                          {st.label}
                        </span>
                      </div>

                      <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>
                        📍 현재 대기: <b style={{ color: '#d1d5db' }}>{d.currentZone}</b>
                      </div>

                      {d.status === 'transit' && (
                        <div style={{ fontSize: '12px', color: '#fde047', fontWeight: 700 }}>
                          ⚡ 목적지까지 약 {d.etaMinutes || 12}분 남음 (사장이 전화할 필요 없음)
                        </div>
                      )}

                      {d.status === 'pickup_standby' && (
                        <div style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 700 }}>
                          🅿️ 호텔 골목 20분 전 스탠바이 완료
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── 2. 기사님 전용 HUD 화면 (운전 중 타자 0% 모바일 뷰) ──────────────── */}
      {role === 'driver' && (
        <div style={{ padding: '20px', maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ background: '#111827', border: '1px solid #3b82f6', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', background: '#2563eb', color: '#fff', padding: '4px 10px', borderRadius: '20px', fontWeight: 800 }}>
              기사님 운행 전용 모바일 HUD (운전 중 답장 금지)
            </span>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#fff', marginTop: '12px' }}>
              1호차 김기사님
            </div>
            <div style={{ fontSize: '13px', color: '#34d399', fontWeight: 700, marginTop: '2px' }}>
              ● 관제탑과 실시간 GPS 연결 상태
            </div>
          </div>

          {/* 배차 오더 카드 */}
          <div style={{ background: '#0e1520', border: '2px solid #e0b04a', borderRadius: '14px', padding: '20px', textAlign: 'left', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 800, marginBottom: '4px' }}>
              [배차 미션] 역삼동 신라스테이 호텔
            </div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '6px' }}>
              1204호 (타이 90분)
            </div>
            <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '12px' }}>
              동승 매니저: <b style={{ color: '#fff' }}>가빈</b> ｜ 결제: <b style={{ color: '#4ade80' }}>현금 100,000원</b>
            </div>

            {/* 요청사항 음성 브리핑 영역 */}
            <div style={{ background: '#1f2937', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>🗣️ 손님 요청사항 (음성 브리핑):</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#f3d58e', marginTop: '3px' }}>
                "🚪 노크 2번 (벨 누르지 마세요) / 주차는 건물 뒤편"
              </div>
            </div>

            {/* 거치대 전용 주먹만 한 대형 버튼들 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="https://map.kakao.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: '#facc15',
                  color: '#000',
                  padding: '16px',
                  borderRadius: '10px',
                  fontSize: '17px',
                  fontWeight: 900,
                  textDecoration: 'none',
                }}
              >
                🗺️ 카카오내비 / 티맵 자동 실행
              </a>

              <button
                onClick={() => {
                  playBeep(900, 0.2);
                  alert('관제탑에 [차 막힘: 5분 지연] 상태를 1초 만에 전송했습니다. (사장님 화면에 즉시 반영)');
                }}
                style={{
                  background: '#f97316',
                  color: '#fff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 800,
                }}
              >
                ⚠️ 차 막힘 (+5분 지연 원터치 알림)
              </button>

              <button
                onClick={() => {
                  playBeep(1200, 0.2);
                  alert('관제탑에 [현장 도착 완료]를 전송했습니다. 손님 대기 상태로 전환됩니다.');
                }}
                style={{
                  background: '#10b981',
                  color: '#000',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '10px',
                  fontSize: '17px',
                  fontWeight: 900,
                }}
              >
                🏁 호텔 앞 도착 완료 (원터치)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── 3. 매니저님 전용 모바일 화면 (텍스트 0% 버튼 3개) ──────────────── */}
      {role === 'manager' && (
        <div style={{ padding: '20px', maxWidth: '440px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ background: '#111827', border: '1px solid #ec4899', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
            <img src="/images/t_gabin.jpg" alt="가빈" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 10px' }} />
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#fff' }}>가빈 매니저님</div>
            <div style={{ fontSize: '13px', color: '#f472b6', fontWeight: 700, marginTop: '2px' }}>
              오늘 완료: 2개 ｜ 현재 상태: 관리중
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <button
              onClick={() => {
                playBeep(880, 0.2);
                alert('관제탑에 [출근 완료] 알림이 1초 만에 등록되었습니다. 사장님 태블릿에 초록불이 켜졌습니다.');
              }}
              style={{ padding: '18px', background: '#059669', color: '#fff', fontSize: '18px', fontWeight: 900, borderRadius: '12px', border: 'none' }}
            >
              🟢 오늘 출근 완료 (대기 시작)
            </button>

            <button
              onClick={() => {
                playBeep(980, 0.2);
                alert('객실 입실 완료! 타이머가 가동되며 70분 시점에 기사님이 건물 앞으로 20분 일찍 도착합니다.');
              }}
              style={{ padding: '18px', background: '#2563eb', color: '#fff', fontSize: '18px', fontWeight: 900, borderRadius: '12px', border: 'none' }}
            >
              🚪 객실 입실 완료 (타이머 시작)
            </button>

            <button
              onClick={() => {
                playBeep(1400, 0.3, 'sawtooth');
                alert('🚨 [기사 긴급 호출] 손님 샤워 중! 기사님이 건물 문 앞으로 차를 댑니다. 내려가서 바로 탑승하세요.');
              }}
              style={{ padding: '20px', background: 'linear-gradient(135deg, #ef4444, #b91c1c)', color: '#fff', fontSize: '19px', fontWeight: 900, borderRadius: '12px', border: 'none', boxShadow: '0 4px 14px rgba(239,68,68,0.4)' }}
            >
              ⏱️ 5분 뒤 내려갑니다! (기사 픽업 호출)
            </button>

            <button
              onClick={() => {
                playBeep(500, 0.2);
                alert('오늘 마감/퇴근 처리되었습니다. 고생하셨습니다!');
              }}
              style={{ padding: '14px', background: '#374151', color: '#9ca3af', fontSize: '14px', fontWeight: 700, borderRadius: '10px', border: 'none', marginTop: '10px' }}
            >
              🔴 오늘 업무 마감 (퇴근)
            </button>
          </div>
        </div>
      )}

      {/* 스마트 붙여넣기 모달 */}
      {showPasteModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#111827', border: '1px solid #374151', borderRadius: '14px', maxWidth: '480px', width: '100%', padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>
              📋 카톡 / 문자 주소 스마트 자동 파싱
            </h3>
            <p style={{ fontSize: '12.5px', color: '#9ca3af', margin: '0 0 14px' }}>
              손님이 보낸 카톡이나 문자 내용을 그대로 붙여넣으면, 장소/호수/코스를 1초 만에 자동 분석하여 배차표에 입력합니다.
            </p>
            <textarea
              rows={4}
              placeholder="예: 역삼동 신라스테이 1204호 타이 90분 노크 부탁해요"
              value={smartPasteText}
              onChange={(e) => setSmartPasteText(e.target.value)}
              style={{ width: '100%', background: '#0b0f15', border: '1px solid #374151', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '13px', marginBottom: '14px' }}
            />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowPasteModal(false)}
                style={{ padding: '8px 14px', background: '#374151', color: '#d1d5db', border: 'none', borderRadius: '6px', fontSize: '13px' }}
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSmartParse}
                style={{ padding: '8px 16px', background: '#e0b04a', color: '#000', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 800 }}
              >
                ⚡ 1초 자동 파싱 적용
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
