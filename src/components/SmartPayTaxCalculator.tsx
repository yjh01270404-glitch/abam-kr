'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, Clock, ShieldCheck, Sparkles, HelpCircle, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';

export default function SmartPayTaxCalculator() {
  const [calcType, setCalcType] = useState<'hourly' | 'daily' | 'monthly'>('daily');
  const [basePay, setBasePay] = useState<number>(150000);
  const [hoursPerDay, setHoursPerDay] = useState<number>(6);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(4);
  const [nightHours, setNightHours] = useState<number>(2);
  const [taxType, setTaxType] = useState<'3.3' | 'none' | '4in1'>('3.3');
  const [includeWeeklyBonus, setIncludeWeeklyBonus] = useState<boolean>(true);

  // Calculations
  const calculations = useMemo(() => {
    let rawDaily = 0;
    let rawMonthly = 0;
    // Clamp nightHours to not exceed hoursPerDay (물리적으로 불가능한 조합 방지)
    const clampedNightHours = Math.min(nightHours, hoursPerDay);

    if (calcType === 'daily') {
      rawDaily = Math.max(0, basePay);
      rawMonthly = rawDaily * (daysPerWeek * 4.345);
    } else if (calcType === 'hourly') {
      // 근로기준법 제56조: 야간근로수당 = 통상임금 × 50% 가산
      const regularHours = hoursPerDay - clampedNightHours;
      const regularPay = regularHours * Math.max(0, basePay);
      const nightPay = clampedNightHours * (Math.max(0, basePay) * 1.5);
      rawDaily = regularPay + nightPay;
      rawMonthly = rawDaily * (daysPerWeek * 4.345);
    } else {
      // monthly mode
      rawMonthly = Math.max(0, basePay);
      rawDaily = rawMonthly / Math.max(daysPerWeek * 4.345, 1);
    }

    // 주휴수당 (근로기준법 제55조): 주 15시간 이상 개근 시 1일치 유급 휴일
    const weeklyHours = hoursPerDay * daysPerWeek;
    let weeklyBonusMonthly = 0;
    if (includeWeeklyBonus && weeklyHours >= 15) {
      const hourlyEquivalent =
        calcType === 'hourly'
          ? Math.max(0, basePay)
          : rawDaily / Math.max(hoursPerDay, 1);
      // 주휴수당 = (주 소정근로시간 / 40) × 8 × 시급, 최대 8시간치
      const weeklyBonusHours = Math.min(8, (weeklyHours / 40) * 8);
      const weeklyBonusAmount = weeklyBonusHours * hourlyEquivalent;
      weeklyBonusMonthly = weeklyBonusAmount * 4.345;
    }

    const totalGrossMonthly = rawMonthly + weeklyBonusMonthly;

    // 세금 계산
    let taxRate = 0;
    if (taxType === '3.3') taxRate = 0.033;
    else if (taxType === '4in1') taxRate = 0.0932;

    const taxAmountMonthly = Math.round(totalGrossMonthly * taxRate);
    const netMonthly = Math.round(totalGrossMonthly - taxAmountMonthly);
    const netDaily = Math.round(netMonthly / Math.max(daysPerWeek * 4.345, 1));

    // 2026년 최저임금 기준 (10,030원/시) 경고
    const MIN_HOURLY_2026 = 10030;
    const effectiveHourlyRate =
      calcType === 'hourly' ? basePay : rawDaily / Math.max(hoursPerDay, 1);
    const isBelowMinWage = effectiveHourlyRate < MIN_HOURLY_2026;

    return {
      rawDaily: Math.round(rawDaily),
      rawMonthly: Math.round(rawMonthly),
      weeklyBonusMonthly: Math.round(weeklyBonusMonthly),
      totalGrossMonthly: Math.round(totalGrossMonthly),
      taxAmountMonthly,
      netMonthly,
      netDaily,
      weeklyHours,
      clampedNightHours,
      isBelowMinWage
    };
  }, [calcType, basePay, hoursPerDay, daysPerWeek, nightHours, taxType, includeWeeklyBonus]);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(18, 14, 28, 0.95) 0%, rgba(26, 16, 38, 0.98) 100%)',
      border: '1px solid rgba(255, 42, 109, 0.3)',
      borderRadius: '24px',
      padding: '28px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
      color: '#fff',
      margin: '24px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Neon Glow */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255, 42, 109, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #ff2a6d 0%, #990033 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(255, 42, 109, 0.4)'
            }}>
              <Calculator style={{ width: '22px', height: '22px', color: '#fff' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
                아밤 스마트 <span style={{ color: '#ff2a6d' }}>실시간 급여/수당 계산기</span>
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: '2px 0 0 0' }}>
                야간수당(+50%), 주휴수당, 3.3% 3초 자동 계산 시스템
              </p>
            </div>
          </div>

          <span style={{
            background: 'rgba(255, 215, 0, 0.15)',
            border: '1px solid rgba(255, 215, 0, 0.4)',
            color: '#ffd700',
            fontSize: '12px',
            fontWeight: '700',
            padding: '6px 12px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Sparkles style={{ width: '14px', height: '14px' }} /> 2026 실시간 최신
          </span>
        </div>

        {/* Calc Mode Selector */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          background: 'rgba(0,0,0,0.4)',
          padding: '4px',
          borderRadius: '14px',
          marginBottom: '20px'
        }}>
          {(['daily', 'hourly', 'monthly'] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                setCalcType(type);
                if (type === 'daily') setBasePay(150000);
                else if (type === 'hourly') setBasePay(20000);
                else setBasePay(3500000);
              }}
              style={{
                padding: '10px 0',
                borderRadius: '10px',
                border: 'none',
                background: calcType === type ? 'linear-gradient(135deg, #ff2a6d 0%, #d81b60 100%)' : 'transparent',
                color: calcType === type ? '#fff' : 'rgba(255,255,255,0.6)',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: calcType === type ? '0 4px 12px rgba(255, 42, 109, 0.4)' : 'none'
              }}
            >
              {type === 'daily' ? '일급 기준' : type === 'hourly' ? '시급 기준' : '월급 기준'}
            </button>
          ))}
        </div>

        {/* Form Inputs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {/* Base Amount */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '6px' }}>
              {calcType === 'daily' ? '기본 일급 금액 (원)' : calcType === 'hourly' ? '기본 시급 금액 (원)' : '월급 총액 (원)'}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                step="5000"
                value={basePay}
                onChange={(e) => setBasePay(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255, 42, 109, 0.3)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  color: '#ffd700',
                  fontSize: '18px',
                  fontWeight: '800',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Hours & Days */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '6px' }}>
              1일 근무 시간 / 주 근무 일수
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                style={{
                  flex: 1,
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  padding: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                {[4, 5, 6, 7, 8, 9, 10, 12].map(h => (
                  <option key={h} value={h} style={{ background: '#120e1c' }}>일 {h}시간</option>
                ))}
              </select>
              <select
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                style={{
                  flex: 1,
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  padding: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7].map(d => (
                  <option key={d} value={d} style={{ background: '#120e1c' }}>주 {d}일</option>
                ))}
              </select>
            </div>
          </div>

          {/* Night Bonus & Tax Type */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '6px' }}>
              야간수당 (22시~06시) / 공제 유형
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select
                value={nightHours}
                onChange={(e) => setNightHours(Number(e.target.value))}
                style={{
                  flex: 1,
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  padding: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].filter(nh => nh <= hoursPerDay).map(nh => (
                  <option key={nh} value={nh} style={{ background: '#120e1c' }}>야간 {nh}시간</option>
                ))}
              </select>
              <select
                value={taxType}
                onChange={(e) => setTaxType(e.target.value as '3.3' | 'none' | '4in1')}
                style={{
                  flex: 1,
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  padding: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                <option value="3.3" style={{ background: '#120e1c' }}>3.3% 원천징수</option>
                <option value="none" style={{ background: '#120e1c' }}>공제 없음 (100%)</option>
                <option value="4in1" style={{ background: '#120e1c' }}>4대보험 (~9.3%)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 최저임금 경고 */}
        {calculations.isBelowMinWage && (
          <div style={{
            background: 'rgba(255, 193, 7, 0.12)',
            border: '1px solid rgba(255, 193, 7, 0.4)',
            borderRadius: '12px',
            padding: '10px 14px',
            marginBottom: '16px',
            fontSize: '12px',
            color: '#ffc107',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ⚠️ <strong>최저임금 미달 주의</strong>: 2026년 최저시급은 10,030원입니다. 입력된 금액이 최저임금 기준에 미달할 수 있습니다.
          </div>
        )}

        {/* Results Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 42, 109, 0.15) 0%, rgba(255, 215, 0, 0.08) 100%)',
          border: '1px solid rgba(255, 42, 109, 0.4)',
          borderRadius: '18px',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '4px' }}>
              예상 월 실수령액 (세후)
            </span>
            <div style={{ fontSize: '32px', fontWeight: '900', color: '#ffd700', letterSpacing: '-1px' }}>
              {calculations.netMonthly.toLocaleString()} <span style={{ fontSize: '18px', color: '#fff' }}>원</span>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
              주휴수당 포함 · 세금({taxType === '3.3' ? '3.3%' : taxType === '4in1' ? '약 9.3%' : '0%'}) 공제 후 수령액
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>
              ※ 근로기준법 제55조·56조 기준 / 실제 금액은 고용계약서 확인
            </div>
          </div>

          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>1일 평균 실수령:</span>
              <span style={{ fontWeight: '700', color: '#fff' }}>{calculations.netDaily.toLocaleString()} 원</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>월 주휴수당{calculations.weeklyHours < 15 ? ' (15h 미만 미해당)' : ''}:</span>
              <span style={{ fontWeight: '700', color: calculations.weeklyBonusMonthly > 0 ? '#ff2a6d' : 'rgba(255,255,255,0.3)' }}>
                {calculations.weeklyBonusMonthly > 0 ? `+${calculations.weeklyBonusMonthly.toLocaleString()} 원` : '-'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>예상 공제 세금:</span>
              <span style={{ fontWeight: '700', color: 'rgba(255,255,255,0.5)' }}>-{calculations.taxAmountMonthly.toLocaleString()} 원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
