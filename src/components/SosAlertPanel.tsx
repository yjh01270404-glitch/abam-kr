'use client';

/**
 * SosAlertPanel
 * 구직자가 SOS 긴급 알림 수신 설정을 언제든지 변경할 수 있는 패널
 * - 메인 페이지 대시보드 / 마이페이지 등 어디서든 삽입 가능
 */

import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  SOS_REGIONS,
  registerSosServiceWorker,
  requestSosPermission,
  getSosPermission,
} from '../lib/sos-notify';

export default function SosAlertPanel() {
  const { currentUser, updateSosSettings } = useApp();

  const [sosAlert, setSosAlert] = useState(currentUser?.sosAlert ?? false);
  const [sosRegions, setSosRegions] = useState<string[]>(currentUser?.sosRegions ?? []);
  const [permission, setPermission] = useState<'granted' | 'denied' | 'default' | 'unsupported'>('default');
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setPermission(getSosPermission());
  }, []);

  // 현재 유저 값과 동기화
  useEffect(() => {
    setSosAlert(currentUser?.sosAlert ?? false);
    setSosRegions(currentUser?.sosRegions ?? []);
  }, [currentUser]);

  const toggleRegion = (r: string) => {
    setSosRegions(prev =>
      prev.includes(r)
        ? prev.filter(x => x !== r)
        : prev.length >= 5 ? prev : [...prev, r]
    );
  };

  const handleRequestPush = async () => {
    await registerSosServiceWorker();
    const result = await requestSosPermission();
    setPermission(result === 'granted' ? 'granted' : result === 'denied' ? 'denied' : 'default');
  };

  const handleSave = async () => {
    if (sosAlert && sosRegions.length === 0) {
      alert('최소 1개 지역을 선택해주세요.');
      return;
    }
    // 알림 ON이면 SW 등록 + 권한 요청
    if (sosAlert && permission !== 'granted') {
      await registerSosServiceWorker();
      await requestSosPermission();
      setPermission(getSosPermission());
    }
    updateSosSettings(sosAlert, sosRegions);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const hasChanged =
    sosAlert !== (currentUser?.sosAlert ?? false) ||
    JSON.stringify(sosRegions) !== JSON.stringify(currentUser?.sosRegions ?? []);

  return (
    <div style={{
      background: sosAlert
        ? 'linear-gradient(135deg, rgba(233,30,99,0.12), rgba(190,24,93,0.06))'
        : 'rgba(255,255,255,0.04)',
      border: `1.5px solid ${sosAlert ? 'rgba(249,168,212,0.4)' : 'rgba(255,255,255,0.1)'}`,
      borderRadius: 12,
      padding: '12px 14px',
      marginBottom: 10,
      transition: 'all 0.3s ease',
    }}>

      {/* 헤더 토글 행 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        onClick={() => setExpanded(v => !v)}>

        {/* 슬라이드 토글 */}
        <div
          onClick={(e) => { e.stopPropagation(); setSosAlert(v => !v); setExpanded(true); }}
          style={{
            width: 40, height: 22, borderRadius: 11,
            background: sosAlert ? '#e91e63' : 'rgba(255,255,255,0.2)',
            position: 'relative', transition: 'background 0.25s', flexShrink: 0,
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: 16, height: 16, borderRadius: '50%', background: '#fff',
            position: 'absolute', top: 3,
            left: sosAlert ? 21 : 3,
            transition: 'left 0.25s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: sosAlert ? '#f9a8d4' : 'rgba(255,255,255,0.7)' }}>
            ⚡ SOS 긴급 알림
            {currentUser?.sosAlert && (
              <span style={{ marginLeft: 6, fontSize: 10, color: '#fde047', fontWeight: 600 }}>
                ({(currentUser.sosRegions ?? []).length}개 지역)
              </span>
            )}
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>
            {sosAlert ? '알림 ON — 탭하여 지역 설정' : '급구 공고 알림 받기'}
          </div>
        </div>

        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
          {expanded ? '▲' : '▼'}
        </span>
      </div>

      {/* 확장 영역 */}
      {expanded && (
        <div style={{ marginTop: 12 }}>

          {sosAlert && (
            <>
              {/* 지역 선택 */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', marginBottom: 7 }}>
                  알림 받을 지역 선택{' '}
                  <span style={{ color: sosRegions.length >= 5 ? '#f87171' : 'rgba(255,255,255,0.3)' }}>
                    ({sosRegions.length}/5)
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {SOS_REGIONS.map(r => {
                    const selected = sosRegions.includes(r);
                    const disabled = !selected && sosRegions.length >= 5;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => toggleRegion(r)}
                        disabled={disabled}
                        style={{
                          padding: '4px 10px', borderRadius: 16, fontSize: 11, fontWeight: 700,
                          border: `1.5px solid ${selected ? '#e91e63' : 'rgba(255,255,255,0.15)'}`,
                          background: selected ? '#e91e63' : 'rgba(255,255,255,0.06)',
                          color: selected ? '#fff' : disabled ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.65)',
                          cursor: disabled ? 'not-allowed' : 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >
                        {selected ? '✓ ' : ''}{r}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Push 권한 상태 */}
              <div style={{
                padding: '8px 10px', borderRadius: 8, marginBottom: 10,
                background: permission === 'granted'
                  ? 'rgba(22,163,74,0.15)'
                  : 'rgba(234,179,8,0.1)',
                border: `1px solid ${permission === 'granted' ? 'rgba(22,163,74,0.3)' : 'rgba(234,179,8,0.25)'}`,
              }}>
                {permission === 'granted' ? (
                  <div style={{ fontSize: 11, color: '#86efac', fontWeight: 700 }}>
                    ✅ 폰 알림창 허용됨 — SOS 발생 즉시 알림이 표시됩니다
                  </div>
                ) : permission === 'denied' ? (
                  <div style={{ fontSize: 11, color: '#fca5a5' }}>
                    ⛔ 알림 차단됨 — 브라우저 설정에서 직접 허용해주세요
                  </div>
                ) : permission === 'unsupported' ? (
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                    이 브라우저는 Push 알림을 지원하지 않습니다
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ fontSize: 11, color: '#fde047' }}>
                      📱 폰 알림 허용 필요
                    </div>
                    <button
                      type="button"
                      onClick={handleRequestPush}
                      style={{
                        background: '#e91e63', color: '#fff', border: 'none',
                        padding: '5px 10px', borderRadius: 6, fontSize: 10.5, fontWeight: 700,
                        cursor: 'pointer', whiteSpace: 'nowrap',
                      }}
                    >
                      허용하기
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* 저장 버튼 */}
          {hasChanged && (
            <button
              type="button"
              onClick={handleSave}
              style={{
                width: '100%', padding: '8px', borderRadius: 8, border: 'none',
                background: saved ? '#16a34a' : 'linear-gradient(90deg, #e91e63, #c2185b)',
                color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {saved ? '✅ 저장완료!' : '설정 저장'}
            </button>
          )}

          {!hasChanged && !saved && (
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
              현재 설정이 저장되어 있습니다
            </div>
          )}
        </div>
      )}
    </div>
  );
}
