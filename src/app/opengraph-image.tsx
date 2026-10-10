import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Abam.kr 아름다운 밤 | 프라이빗 1:1 방문 홈케어 · 서울·경기';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #04070b 0%, #0a0f15 50%, #1a1408 100%)',
          position: 'relative',
          gap: 24,
        }}
      >
        {/* 배경 글로우 */}
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(224,176,74,0.22) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* 달 이모지 */}
        <div style={{ fontSize: 120, lineHeight: 1 }}>🌙</div>

        {/* 브랜드명 */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: '#e0b04a',
            letterSpacing: '-4px',
          }}
        >
          아름다운밤
        </div>

        {/* 슬로건 */}
        <div
          style={{
            fontSize: 36,
            color: 'rgba(242, 244, 242, 0.92)',
            letterSpacing: '2px',
            marginTop: -8,
          }}
        >
          프라이빗 1:1 방문 홈케어 · 서울·경기
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(243, 213, 142, 0.7)',
            letterSpacing: '4px',
            marginTop: 8,
          }}
        >
          abam.kr
        </div>
      </div>
    ),
    { ...size }
  );
}
