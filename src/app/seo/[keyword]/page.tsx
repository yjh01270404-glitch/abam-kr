import Link from "next/link";
import Image from "next/image";
import { SEO_KEYWORDS, generateSeoPageData } from "../../../lib/seo-keywords";

type Props = { params: Promise<{ keyword: string }> };

export const dynamic = "force-static";
export const revalidate = 86400; // 24시간 캐시
export const dynamicParams = true;

const SITE_URL  = "https://abam.kr";
const KAKAO_ID  = "Abam1004";
const KAKAO_LINK = "kakaotalk://";
const PHONE_TEL = "tel:010-6607-2239";
const PHONE_NUM = "010-6607-2239";

const COMPARISON_ROWS = [
  {
    category: "기본 가격대",
    thai: "80,000원 ~ 120,000원",
    aroma: "90,000원 ~ 140,000원",
    vip: "120,000원 ~ 200,000원",
  },
  {
    category: "압의 세기",
    thai: "시원하고 강함 ★★★★☆",
    aroma: "부드러움~중간 ★★☆☆☆",
    vip: "맞춤 압 (지압+부드러움) ★★★★★",
  },
  {
    category: "오일 여부",
    thai: "오일 없음 (건식)",
    aroma: "천연 에센셜 오일",
    vip: "식물성 천연 오일 + 수기 지압",
  },
  {
    category: "주요 효과",
    thai: "척추·골반 이완, 뭉친 근육통 완화",
    aroma: "숙면 유도, 피부 보습, 피로 회복",
    vip: "전신 림프 순환, 심신 안정, 감성 힐링",
  },
  {
    category: "추천 고객",
    thai: "운동 후 뻐근함, 강한 지압 선호",
    aroma: "만성 피로, 부드러운 케어 희망",
    vip: "극심한 스트레스, 프리미엄 힐링 선호",
  },
];

const COURSES = [
  {
    id: "thai",
    name: "타이 테라피 (건식)",
    badge: "인기",
    img: "/images/thai.jpg",
    priceSummary: "80,000원 ~ 120,000원",
    desc: "오일을 사용하지 않고 편안한 순면 관리복으로 진행되는 왓포 정통 건식 수기 관리. 전신 스트레칭과 경혈 압박으로 뭉친 근육을 시원하게 이완합니다.",
    prices: [
      { time: "60분", price: "80,000원" },
      { time: "90분", price: "100,000원", isBest: true },
      { time: "120분", price: "120,000원" },
    ],
  },
  {
    id: "aroma",
    name: "아로마 테라피 (천연오일)",
    badge: "추천",
    img: "/images/aroma.jpg",
    priceSummary: "90,000원 ~ 140,000원",
    desc: "100% 최고급 천연 에센셜 오일을 도포하여 림프 순환을 돕고, 부드러운 압으로 전신 긴장과 피로를 풀어주는 순환 릴렉싱 케어입니다.",
    prices: [
      { time: "60분", price: "90,000원" },
      { time: "90분", price: "110,000원", isBest: true },
      { time: "120분", price: "140,000원" },
    ],
  },
  {
    id: "vip",
    name: "프리미엄 VIP 시그니처",
    badge: "대표 코스",
    img: "/images/hero_sensual_goddess.jpg",
    priceSummary: "120,000원 ~ 200,000원",
    desc: "에이스 테라피스트 전담 배정. 정통 건식 지압으로 큰 근육을 선이완한 뒤 천연 오일로 림프와 미세 근막을 섬세하게 관리하는 최고급 풀코스 프로그램입니다.",
    prices: [
      { time: "60분", price: "120,000원" },
      { time: "90분", price: "160,000원", isBest: true },
      { time: "120분", price: "200,000원" },
    ],
  },
];

export async function generateStaticParams() {
  return SEO_KEYWORDS.map((keyword) => ({
    keyword: encodeURIComponent(keyword.replace(/\s+/g, "-")),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { keyword } = await params;
  const data = generateSeoPageData(keyword);
  const decoded = decodeURIComponent(keyword).replace(/-/g, " ");
  const canonicalUrl = `${SITE_URL}/seo/${encodeURIComponent(decoded.replace(/\s+/g, "-"))}`;

  return {
    title: `${decoded} | 선입금 0원 · 100% 현장 대면결제 · 아밤 공식`,
    description: `${decoded} 안내 센터. 선입금 0원, 관리사 도착 후 현장 결제. 서울·경기 수도권 30분 내외 방문. 타이 70,000원~힐링 VIP 140,000원 정찰제.`,
    keywords: [
      ...data.keywords,
      `${decoded} 가격`, `${decoded} 코스`, `${decoded} 비용`,
      `${decoded} 안마`, `${decoded} 마사지`,
      "선입금없는출장안마", "대면결제출장마사지", "24시간출장마사지",
      "출장마사지가격", "출장안마가격",
    ].join(", "),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" as const, "max-video-preview": -1 },
    },
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${decoded} — 선입금 0원 100% 현장 대면결제`,
      description: `${decoded} 24시간 상시 운영. 관리사 도착 후 현장 결제. 30분 내외 방문. 타이·아로마·힐링 VIP.`,
      type: "website" as const,
      url: canonicalUrl,
      siteName: "아밤 출장안마",
      locale: "ko_KR",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: `${decoded} 아밤 출장안마` }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${decoded} — 선입금 0원 100% 현장 대면결제`,
      description: `${decoded} 24시간 연중무휴 상시 운영.`,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export default async function SeoLandingPage({ params }: Props) {
  const { keyword } = await params;
  const data = generateSeoPageData(keyword);
  const decoded = decodeURIComponent(keyword).replace(/-/g, " ");
  const canonicalUrl = `${SITE_URL}/seo/${encodeURIComponent(decoded.replace(/\s+/g, "-"))}`;

  const relatedKeywords = SEO_KEYWORDS
    .filter((k) => k !== decoded)
    .slice(0, 18);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      name: `${decoded} — 선입금 0원 100% 현장 대면결제`,
      description: data.description,
      url: canonicalUrl,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "아밤 홈", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "서비스 지역", item: `${SITE_URL}/keywords` },
          { "@type": "ListItem", position: 3, name: decoded, item: canonicalUrl },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: `아밤 홈타이·테라피 (${decoded})`,
      alternateName: [`${decoded} 출장안마`, `${decoded} 출장마사지`, "아밤홈케어"],
      description: `${decoded} 지역 24시간 100% 현장 대면결제 출장홈케어. 선입금 0원, 관리사 도착 후 현장 대면결제.`,
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      telephone: PHONE_NUM,
      areaServed: data.region,
      priceRange: "₩80,000 - ₩200,000",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "19:00",
        closes: "05:00",
      },
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "transparent", color: "#0f172a", fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "Pretendard", sans-serif', WebkitFontSmoothing: "antialiased" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. 상단 클린 헤더 */}
      <header style={{ background: "rgba(10, 15, 29, 0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255, 255, 255, 0.12)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "12px 18px 10px" }}>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "17px", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.3px" }}>아름다운 밤</span>
              <span style={{ fontSize: "11px", fontWeight: 800, color: "#fbbf24", backgroundColor: "rgba(245, 158, 11, 0.18)", border: "1px solid rgba(245, 158, 11, 0.35)", padding: "2px 6px", borderRadius: "4px" }}>Abam</span>
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Link href="/keywords" style={{ fontSize: "12px", color: "#cbd5e1", fontWeight: 700, textDecoration: "none", padding: "4px 8px", borderRadius: "6px", backgroundColor: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)" }}>
                전체지역
              </Link>
              <Link href="/" style={{ fontSize: "12px", color: "#0f172a", fontWeight: 800, textDecoration: "none", padding: "4px 8px", borderRadius: "6px", backgroundColor: "#ffffff" }}>
                메인홈
              </Link>
            </div>
          </div>

          {/* 브레드크럼 */}
          <nav aria-label="breadcrumb">
            <ol style={{ display: "flex", gap: "6px", listStyle: "none", margin: 0, padding: 0, fontSize: "11.5px", color: "#94a3b8" }}>
              <li><Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>홈</Link></li>
              <li>›</li>
              <li><Link href="/keywords" style={{ color: "#94a3b8", textDecoration: "none" }}>서비스 지역</Link></li>
              <li>›</li>
              <li style={{ color: "#ffffff", fontWeight: 800 }}>{decoded}</li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. 본문 컨테이너 */}
      <main style={{ maxWidth: "640px", margin: "16px auto", background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(20px)", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.3)", padding: "0 18px 120px", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
        
        {/* 상단: 대표 포스터 카드 */}
        <section style={{ padding: "18px 0 12px" }}>
          <a
            href={PHONE_TEL}
            style={{
              display: "block",
              textDecoration: "none",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "220px", background: "#f8fafc" }}>
              <Image
                src="/images/hero_sensual_goddess.jpg"
                alt={`${decoded} 아름다운 밤 타이 홈케어`}
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                style={{ objectFit: "cover" }}
                priority
              />
              <div style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(15,23,42,0.85)", padding: "3px 8px", borderRadius: "4px", fontSize: "10.5px", fontWeight: 800, color: "#fef08a" }}>
                100% 현장 대면결제 · 선입금 0원
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 14px 10px", background: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.3) 70%, transparent 100%)", color: "#ffffff" }}>
                <div style={{ fontSize: "11.5px", fontWeight: 700, color: "#fde68a", marginBottom: "2px" }}>
                  {data.region} 20~30분 신속 방문
                </div>
                <div style={{ fontSize: "19px", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                  {decoded} 아밤 타이 홈케어
                </div>
              </div>
            </div>

            <div style={{ padding: "16px 14px 14px", background: "#ffffff", textAlign: "center" }}>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#dc2626", marginBottom: "6px" }}>
                고객만족 1위 & 재방문율 1위
              </div>
              <div style={{ fontSize: "24px", fontWeight: 900, color: "#111827", letterSpacing: "-0.02em", margin: "4px 0 10px 0" }}>
                {PHONE_NUM}
              </div>
              <div style={{ fontSize: "13px", lineHeight: 1.6, color: "#4b5563", margin: "0 0 12px 0" }}>
                엄선된 20대 전문 테라피스트 상시 대기<br />
                <strong>선입금 0원</strong> · 관리사 도착 후 <strong>100% 현장 대면결제</strong><br />
                {data.region} 전 지역 <strong>30분 내외 빠른 방문</strong>
              </div>
              <div style={{ background: "#1a73e8", color: "#ffffff", padding: "12px 0", borderRadius: "6px", fontWeight: 800, fontSize: "14px" }}>
                사진 클릭 → 즉시 전화연결 / 예약 상담
              </div>
            </div>
          </a>

          {/* 액션 버튼 (순서 통일: 카카오 ➔ 전화) */}
          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            <a
              href={KAKAO_LINK}
              style={{
                flex: 1.2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                background: "#FEE500",
                color: "#181600",
                padding: "11px 0",
                borderRadius: "20px",
                fontWeight: 800,
                fontSize: "13px",
                textDecoration: "none",
                boxShadow: "0 2px 6px rgba(254,229,0,0.3)",
                cursor: "pointer",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
              카톡 바로연결 (ID: {KAKAO_ID})
            </a>
            <a
              href={PHONE_TEL}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                background: "#090d16",
                color: "#ffffff",
                padding: "11px 0",
                borderRadius: "20px",
                fontWeight: 700,
                fontSize: "13px",
                textDecoration: "none",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                border: "1px solid #d4af37",
                cursor: "pointer",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
              즉시 전화연결
            </a>
          </div>

          {/* 구글형 사이트링크 리스트 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", padding: "12px 0", borderTop: "1px solid #f1f3f4" }}>
            {COURSES.map((c) => (
              <div key={c.id}>
                <a href="#menu-section" style={{ textDecoration: "none" }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a0dab", marginBottom: "2px" }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#5f6368" }}>
                    {c.priceSummary}
                  </div>
                </a>
              </div>
            ))}
            <div>
              <a href="#guide-section" style={{ textDecoration: "none" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a0dab", marginBottom: "2px" }}>
                  선입금 0원 안심수칙
                </div>
                <div style={{ fontSize: "12px", color: "#008744", fontWeight: 600 }}>
                  100% 현장 대면결제
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* 3열 갤러리 */}
        <section style={{ padding: "18px 0", borderBottom: "1px solid #f1f3f4" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#202124", marginBottom: "10px" }}>
            코스별 대표 갤러리
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            {COURSES.map((c) => (
              <div key={c.id}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: "4px", overflow: "hidden", background: "#f8f9fa" }}>
                  <Image
                    src={c.img}
                    alt={c.name}
                    fill
                    sizes="(max-width: 640px) 33vw, 200px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#202124", textAlign: "center", marginTop: "6px" }}>
                  {c.name.split(" ")[0]}
                </div>
                <div style={{ fontSize: "11px", color: "#5f6368", textAlign: "center" }}>
                  {c.prices[0].price}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 메뉴 · 정찰 가격표 (박스 테두리 없는 깔끔한 라인 리스트) */}
        <section id="menu-section" style={{ padding: "20px 0", borderBottom: "1px solid #f1f3f4" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#202124", margin: 0 }}>
              {decoded} 코스별 정찰 가격표
            </h2>
            <span style={{ fontSize: "12px", color: "#1a73e8", fontWeight: 600 }}>
              선입금 0원 · 현장 대면결제
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {COURSES.map((course, idx) => (
              <div
                key={course.id}
                style={{
                  padding: "16px 0",
                  borderBottom: idx === COURSES.length - 1 ? "none" : "1px solid #f1f3f4",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "14px",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#202124" }}>
                      {course.name}
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#008744" }}>
                      {course.badge}
                    </span>
                  </div>

                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#1a73e8", marginBottom: "6px" }}>
                    {course.priceSummary}
                  </div>

                  <p style={{ fontSize: "13px", lineHeight: 1.55, color: "#5f6368", margin: "0 0 8px 0", wordBreak: "keep-all" }}>
                    {course.desc}
                  </p>

                  <div style={{ fontSize: "12px", color: "#3c4043" }}>
                    {course.prices.map((p) => `${p.time} ${p.price}`).join(" · ")}
                  </div>
                </div>

                <div style={{ width: "72px", height: "72px", position: "relative", borderRadius: "4px", overflow: "hidden", flexShrink: 0, background: "#f8f9fa" }}>
                  <Image
                    src={course.img}
                    alt={course.name}
                    fill
                    sizes="72px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3대 코스 특성 한눈에 비교하기 (화이트/라이트 모드 정갈한 표) */}
        <section style={{ padding: "24px 0 18px", borderBottom: "1px solid #f1f3f4" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#202124", margin: 0 }}>
              3대 코스 특성 한눈에 비교하기
            </h2>
            <span style={{ fontSize: "11px", color: "#5f6368" }}>
              정찰 요금 기준
            </span>
          </div>

          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", border: "1px solid #e8eaed", borderRadius: "6px" }}>
            <table style={{ width: "100%", minWidth: "460px", borderCollapse: "collapse", textAlign: "center", fontSize: "12px", background: "#ffffff" }}>
              <thead>
                <tr style={{ background: "#f8f9fa", borderBottom: "1px solid #e8eaed" }}>
                  <th style={{ padding: "10px 8px", fontWeight: 700, color: "#5f6368", width: "22%" }}>구분</th>
                  <th style={{ padding: "10px 8px", fontWeight: 700, color: "#1a73e8", width: "26%" }}>타이 건식 (실속)</th>
                  <th style={{ padding: "10px 8px", fontWeight: 700, color: "#008744", width: "26%" }}>아로마 릴렉싱 (균형)</th>
                  <th style={{ padding: "10px 8px", fontWeight: 700, color: "#b45309", width: "26%" }}>힐링 VIP (시그니처 1위)</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: rIdx === COMPARISON_ROWS.length - 1 ? "none" : "1px solid #f1f3f4" }}>
                    <td style={{ padding: "10px 8px", fontWeight: 600, color: "#3c4043", background: "#fafafa" }}>{row.category}</td>
                    <td style={{ padding: "10px 8px", color: "#202124", fontWeight: rIdx === 0 ? 700 : 500 }}>{row.thai}</td>
                    <td style={{ padding: "10px 8px", color: "#202124", fontWeight: rIdx === 0 ? 700 : 500 }}>{row.aroma}</td>
                    <td style={{ padding: "10px 8px", color: "#b45309", fontWeight: 700, background: "#fffbeb" }}>{row.vip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 이용 수칙 안내 */}
        <section id="guide-section" style={{ padding: "20px 0", borderBottom: "1px solid #f1f3f4" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#202124", margin: "0 0 14px 0" }}>
            {decoded} 이용 절차 안내
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "#3c4043", lineHeight: 1.6 }}>
            <div>
              <strong>1. 코스 및 시간 선택:</strong> 원하시는 코스(타이, 아로마, 힐링 VIP)와 관리 시간을 선택 후 메신저나 전화로 접수합니다.
            </div>
            <div>
              <strong>2. 방문 장소 확인:</strong> {data.region} 내 정확한 방문 주소(아파트, 빌라, 오피스텔, 호텔명)를 전달합니다.
            </div>
            <div>
              <strong>3. 100% 현장 대면결제:</strong> 관리사 도착 확인 후 직접 현금 또는 계좌이체로 결제하시고 편안하게 관리를 받으시면 됩니다.
            </div>
          </div>
        </section>

        {/* 수도권 연관 서비스 지역 */}
        <section style={{ padding: "20px 0", borderBottom: "1px solid #f1f3f4" }}>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#202124", marginBottom: "10px" }}>
            수도권 관련 서비스 지역
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 12px" }}>
            {relatedKeywords.map((kw) => (
              <Link
                key={kw}
                href={`/seo/${encodeURIComponent(kw.replace(/\s+/g, "-"))}`}
                style={{
                  fontSize: "13px",
                  color: "#1a0dab",
                  textDecoration: "none",
                }}
              >
                {kw}
              </Link>
            ))}
          </div>
        </section>

        {/* 푸터 */}
        <footer style={{ padding: "24px 0", fontSize: "11px", color: "#70757a", lineHeight: 1.7 }}>
          <div style={{ fontWeight: 700, color: "#202124", fontSize: "12px", marginBottom: "4px" }}>
            아밤 (ABAM) 홈타이·테라피 공식 온라인 센터
          </div>
          <div>대표 상담 전화: {PHONE_NUM} · 24시간 연중무휴 상시 운영</div>
          <div>결제 정책: 선입금 0원 · 관리사 방문 후 100% 현장 대면결제 준수</div>
          <div style={{ marginTop: "8px" }}>
            © ABAM. All rights reserved.
          </div>
        </footer>

      </main>

      {/* 3. 모바일 하단 플로팅 예약 바 */}
      <aside aria-label="상담 예약" style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid #e2e8f0",
        padding: "8px 16px calc(8px + env(safe-area-inset-bottom, 0px))",
        zIndex: 100,
        boxShadow: "0 -4px 16px rgba(0,0,0,0.06)",
      }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", display: "flex", gap: "8px", alignItems: "center" }}>
          
          <a
            href={KAKAO_LINK}
            style={{
              flex: 1.3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              background: "#FEE500",
              color: "#181600",
              padding: "12px 0",
              borderRadius: "10px",
              fontWeight: 900,
              fontSize: "14px",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(254,229,0,0.25)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.63 1.58 4.96 4 6.37L6 20l3.5-2.1c.8.17 1.63.26 2.5.26 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#181600"/></svg>
            <span>카톡: {KAKAO_ID}</span>
          </a>

          <a
            href={PHONE_TEL}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              background: "#0f172a",
              color: "#ffffff",
              padding: "12px 0",
              borderRadius: "10px",
              fontWeight: 800,
              fontSize: "13.5px",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(15,23,42,0.15)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffff"/></svg>
            <span>전화예약</span>
          </a>

          <a
            href="https://wa.me/821066072239?text=Hello%20Abam%20Spa"
            target="_blank"
            rel="noreferrer"
            title="WhatsApp"
            style={{
              width: "42px",
              height: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#25D366",
              color: "#ffffff",
              borderRadius: "10px",
              flexShrink: 0,
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(37,211,102,0.3)",
            }}
          >
            <span style={{ fontSize: "18px" }}>💬</span>
          </a>

        </div>
      </aside>

    </div>
  );
}
