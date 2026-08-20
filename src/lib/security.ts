/**
 * 아름다운밤 (abam.kr) — 엔터프라이즈 보안 & 세니타이징 유틸리티
 */

/**
 * XSS (크로스 사이트 스크립팅) 및 악의적 태그 자동 세니타이징
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/onerror\s*=/gi, '')
    .replace(/onload\s*=/gi, '')
    .replace(/onclick\s*=/gi, '')
    .replace(/eval\((.*)\)/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * 개인 식별 정보 (주민번호, 계좌번호 등) 자동 탐지 및 마스킹
 */
export function maskSensitiveInfo(text: string): string {
  if (!text) return '';
  
  // 주민등록번호 패턴 (6자리-7자리)
  const rrnPattern = /\b\d{6}[- ]?[1-4]\d{6}\b/g;
  // 카드번호 패턴 (16자리)
  const cardPattern = /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g;

  return text
    .replace(rrnPattern, '******-*******')
    .replace(cardPattern, '****-****-****-****');
}

/**
 * 닉네임 안심 보안 검증
 */
export function validateNickname(nickname: string): { valid: boolean; message?: string } {
  const sanitized = sanitizeInput(nickname).trim();

  if (!sanitized) {
    return { valid: false, message: '닉네임을 입력해 주세요.' };
  }

  if (sanitized.length < 2 || sanitized.length > 12) {
    return { valid: false, message: '닉네임은 2자 이상 12자 이하로 설정해야 합니다.' };
  }

  // 금지어 / 비속어 패턴
  const forbidden = ['관리자', 'admin', '운영자', '아밤대표', '시스템'];
  const isForbidden = forbidden.some(word => sanitized.toLowerCase().includes(word));

  if (isForbidden) {
    return { valid: false, message: '관리자 및 시스템 사칭 닉네임은 사용할 수 없습니다.' };
  }

  return { valid: true };
}
