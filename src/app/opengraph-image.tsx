import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = '아름다운밤 | 여성 고수익 일자리 정보 플랫폼';

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
          background: 'linear-gradient(135deg, #0d001f 0%, #1a0035 40%, #3d0060 100%)',
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
            background: 'radial-gradient(circle, rgba(233,30,99,0.18) 0%, transparent 70%)',
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
            color: '#fde047',
            letterSpacing: '-4px',
          }}
        >
          아름다운밤
        </div>

        {/* 슬로건 */}
        <div
          style={{
            fontSize: 36,
            color: 'rgba(253, 164, 175, 0.9)',
            letterSpacing: '2px',
            marginTop: -8,
          }}
        >
          여성 고수익 일자리 정보 플랫폼
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(253, 224, 71, 0.6)',
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
