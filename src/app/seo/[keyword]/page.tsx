import Link from "next/link";
import Image from "next/image";
import { permanentRedirect } from "next/navigation";
import AbamBrandLogo from "../../../components/AbamBrandLogo";
import AbamBottomBookingBar from "../../../components/AbamBottomBookingBar";
import {
  INDEXABLE_KEYWORDS,
  generateSeoPageData,
  isIndexableKeyword,
  isServedKeyword,
  hubKeywordFor,
  generateUniqueSeoSections,
} from "../../../lib/seo-keywords";
import { DISTRICTS } from "../../../lib/region-data";
import { findGeoLocation } from "../../../lib/geo-coords";

type Props = { params: Promise<{ keyword: string }> };

export const dynamic = "force-static";
export const revalidate = 86400;
export const dynamicParams = true;

const SITE_URL  = "https://abam.kr";
const UNIFIED_SMS_BODY = encodeURIComponent("[아밤 예약] 방문주소/호텔·호수 공비[1층비번/호출/호텔로비] 주차가능 타이90 10만 잔돈X");
const SMS_HREF  = `sms:01066072239?body=${UNIFIED_SMS_BODY}`;
const PHONE_TEL = "tel:010-6607-2239";
const PHONE_NUM = "010-6607-2239";

const COMPARISON_ROWS = [
  {
    category: "기본 요금",
    thai: "80,000원 ~ 120,000원",
    aroma: "90,000원 ~ 140,000원",
    vip: "100,000원 ~ 160,000원",
  },
  {
    category: "관리 방식",
    thai: "전통 건식 지압 · 스트레칭",
    aroma: "천연 에센셜 오일 케어",
    vip: "타이 지압 + 아로마 오일",
  },
  {
    category: "주요 특징",
    thai: "뭉친 근육과 어깨·허리 이완",
    aroma: "림프 순환 및 부드러운 휴식",
    vip: "지압과 오일 관리를 동시에 진행",
  },
];

const COURSES = [
  {
    id: "thai",
    name: "타이",
    badge: "인기",
    img: "/images/thai.jpg",
    priceSummary: "80,000원 ~ 120,000원",
    desc: "전통 방식의 건식 지압으로 뭉친 근육을 시원하게 풀어주고 스트레칭으로 전신 균형을 잡아줍니다.",
    prices: [
      { time: "60분", price: "80,000원" },
      { time: "90분", price: "100,000원", isBest: true },
      { time: "120분", price: "120,000원" },
    ],
  },
  {
    id: "aroma",
    name: "아로마",
    badge: "추천",
    img: "/images/aroma.jpg",
    priceSummary: "90,000원 ~ 140,000원",
    desc: "식물성 아로마 오일을 사용하여 부드럽게 전신을 관리하고 림프 순환과 편안한 휴식을 돕습니다.",
    prices: [
      { time: "60분", price: "90,000원" },
      { time: "90분", price: "110,000원", isBest: true },
      { time: "120분", price: "140,000원" },
    ],
  },
  {
    id: "special",
    name: "스페셜",
    badge: "복합",
    img: "/images/flower_spa.jpg",
    priceSummary: "100,000원 ~ 160,000원",
    desc: "타이의 시원한 건식 지압과 아로마의 부드러운 오일 관리를 함께 받을 수 있는 복합 코스입니다.",
    prices: [
      { time: "60분", price: "100,000원" },
      { time: "90분", price: "120,000원", isBest: true },
      { time: "120분", price: "160,000원" },
    ],
  },
];

export async function generateStaticParams() {
  return INDEXABLE_KEYWORDS.map((keyword) => ({
    keyword: keyword.replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { keyword } = await params;
  const data = generateSeoPageData(keyword);
  const decoded = decodeURIComponent(keyword).replace(/-/g, " ");
  const selfUrl = `${SITE_URL}/seo/${encodeURIComponent(decoded.replace(/\s+/g, "-"))}`;
  const canonicalUrl = isIndexableKeyword(decoded)
    ? selfUrl
    : data.district
 
    ? `${SITE_URL}/seo/${encodeURIComponent(hubKeywordFor(data.district))}`
      : SITE_URL;

  return {
    title: { absolute: data.title },
    description: data.description,
    keywords: [
      ...data.keywords,
      `${decoded} 가격`, `${decoded} 코스`, `${decoded} 비용`,
      `${decoded} 안마`, `${decoded} 마사지`,
      "프라이빗 1:1 방문 홈케어", "Abam.kr",
      "출장마사지가격", "출장안마가격",
    ].join(", "),
    robots: isIndexableKeyword(decoded)
      ? {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" as const, "max-video-preview": -1 },
        }
      : { index: false, follow: true },
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${decoded} — 아밤(Abam.kr) 1:1 방문 홈케어`,
      description: data.description,
      type: "website" as const,
      url: canonicalUrl,
      siteName: "Abam.kr",
      locale: "ko_KR",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: `${decoded} 아밤 1:1 방문 홈케어` }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${decoded} — 아밤(Abam.kr) 1:1 방문 홈케어`,
      description: `${decoded} 예약 18:00부터 · 출발 19:00부터 · 마지막 예약 05:00 마감.`,
      images: [`${SITE_URL}/og-image.png`],
    },
    other: {
      "geo.region": findGeoLocation(decoded).region,
      "geo.placename": findGeoLocation(decoded).placename,
      "geo.position": `${findGeoLocation(decoded).lat};${findGeoLocation(decoded).lng}`,
      "ICBM": `${findGeoLocation(decoded).lat}, ${findGeoLocation(decoded).lng}`,
    },
  };
}

export default async function SeoLandingPage({ params }: Props) {
  const { keyword } = await params;
  const decoded = decodeURIComponent(keyword).replace(/-/g, " ");
  if (!isServedKeyword(decoded)) {
    permanentRedirect('/seo/출장마사지');
  }
  const data = generateSeoPageData(keyword);
  const district = data.district;
  const unique = generateUniqueSeoSections(decoded);
  const canonicalUrl = `${SITE_URL}/seo/${encodeURIComponent(decoded.replace(/\s+/g, "-"))}`;

  const hubLinks = DISTRICTS.map((d) => hubKeywordFor(d)).filter((k) => k !== decoded);
  const relatedKeywords = Array.from(
    new Set([...data.relatedKeywords, ...hubLinks, ...INDEXABLE_KEYWORDS.slice(0, 12)]),
  )
    .filter((k) => k !== decoded)
    .slice(0, 24);

  const localFaq = unique.faqs;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      name: `${decoded} — 아밤(Abam.kr) 1:1 방문 홈케어`,
      description: data.description,
      url: canonicalUrl,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Abam.kr 홈", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "서비스 지역", item: `${SITE_URL}/keywords` },
          { "@type": "ListItem", position: 3, name: decoded, item: canonicalUrl },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
      "@id": `${SITE_URL}/#business`,
      name: `아밤 (Abam.kr) — ${decoded}`,
      alternateName: [`${decoded} 출장안마`, `${decoded} 출장마사지`, "Abam.kr"],
      description: `${decoded} 지역 1:1 방문 홈케어. 자택·호텔 방문, 예약 18:00부터 · 출발 19:00부터 · 마지막 예약 05:00 마감.`,
      url: SITE_URL,
      image: `${SITE_URL}/og-image.png`,
      telephone: PHONE_NUM,
      geo: {
        "@type": "GeoCoordinates",
        latitude: findGeoLocation(decoded).lat,
        longitude: findGeoLocation(decoded).lng,
      },
      areaServed: district
        ? [
            { "@type": "AdministrativeArea", name: district.city ? `${district.city} ${district.gu}` : `서울특별시 ${district.gu}` },
            ...district.areas.map((a) => ({ "@type": "AdministrativeArea", name: a })),
            ...district.stations.map((s) => ({ "@type": "Place", name: `${s} 인근` })),
          ]
        : [
            { "@type": "AdministrativeArea", name: findGeoLocation(decoded).placename },
            { "@type": "AdministrativeArea", name: "서울·경기 전역" },
          ],
      priceRange: "₩80,000 - ₩160,000",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "19:00",
        closes: "05:00",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: localFaq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#060913", color: "#0f172a", fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "Pretendard", sans-serif', WebkitFontSmoothing: "antialiased" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. 상단 클린 헤더 */}
      <header style={{ background: "#0a0f1d", borderBottom: "1px solid #1e293b", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "11px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
            <AbamBrandLogo size="compact" />
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Link href="/keywords" style={{ fontSize: "12px", color: "#cbd5e1", fontWeight: 700, textDecoration: "none", padding: "4px 8px", borderRadius: "6px", backgroundColor: "#1e293b", border: "1px solid #334155" }}>
                전체지역
              </Link>
              <Link href="/" style={{ fontSize: "12px", color: "#0f172a", fontWeight: 800, textDecoration: "none", padding: "4px 8px", borderRadius: "6px", backgroundColor: "#ffffff" }}>
                메인홈
              </Link>
            </div>
          </div>

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

      {/* 실시간 즉시 배차 상단 배너 */}
      <aside style={{ background: "linear-gradient(90deg, #032014 0%, #064e3b 50%, #032014 100%)", borderBottom: "2px solid #34d399", padding: "10px 16px", textAlign: "center", boxShadow: "0 4px 20px rgba(16,185,129,0.3)", position: "relative", zIndex: 40 }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "8px", fontSize: "12.5px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", textAlign: "left" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "2px 7px", borderRadius: "999px", background: "#10b981", color: "#022c22", fontWeight: 900, fontSize: "10.5px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ffffff" }}></span>
              실시간 배차중
            </span>
            <span style={{ color: "#ffffff", fontWeight: 800, fontSize: "13px" }}>
              🟢 <strong style={{ color: "#6ee7b7" }}>{decoded} 지금 즉시 이용 가능</strong> (25~35분)
            </span>
          </div>
          <span style={{ color: "#a7f3d0", fontSize: "11px", fontWeight: 700, background: "rgba(6, 78, 59, 0.6)", padding: "2px 7px", borderRadius: "6px", border: "1px solid rgba(52, 211, 153, 0.4)" }}>
            🛡️ 100% 현장후불제
          </span>
        </div>
      </aside>

      {/* 2. 본문 컨테이너 */}
      <main style={{ maxWidth: "640px", margin: "12px auto", background: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "0 16px 110px" }}>
        
        {/* 상단 공식 광고 안심 인증 박스 */}
        <div style={{ margin: "14px 0 10px", padding: "12px 14px", background: "linear-gradient(135deg, #022c22 0%, #064e3b 100%)", border: "1.5px solid #10b981", borderRadius: "10px", color: "#ffffff", display: "flex", flexDirection: "column", gap: "4px", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "15px" }}>🛡️</span>
              <span style={{ fontSize: "13px", fontWeight: 900, color: "#ffffff" }}>공식 광고 실시간 인증: {decoded} 즉시 배차 가능</span>
            </div>
            <span style={{ background: "#10b981", color: "#022c22", fontSize: "10px", fontWeight: 900, padding: "2px 6px", borderRadius: "4px" }}>선입금 0원 보증</span>
          </div>
          <p style={{ fontSize: "11.5px", color: "#a7f3d0", margin: 0, lineHeight: 1.45 }}>
            {decoded} 일대는 관리사 도착 후 직접 대면 확인 후 결제하는 <strong>100% 현장 대면후불제</strong>로만 운영됩니다. 예약금·출발비 요구는 일체 없습니다.
          </p>
        </div>
        
        {/* 상단 요약 카드 */}
        <section style={{ padding: "16px 0 12px", borderBottom: "1px solid #f1f3f4" }}>
          {data.isCompetitor && (
            <div style={{
              background: "#f8fafc",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              padding: "12px 14px",
              marginBottom: "12px",
              fontSize: "12.5px",
              lineHeight: "1.6",
              color: "#334155",
            }}>
              <div style={{ fontWeight: 800, fontSize: "13px", color: "#0f172a", marginBottom: "3px" }}>
                안내: {decoded} 검색 고객님을 위한 서비스 안내
              </div>
              본 페이지는 <strong>{decoded}</strong> 검색 방문자분들께 코스 및 이용 정보를 안내해 드립니다. 저희는 독자 브랜드 <strong>아밤(Abam.kr)</strong>으로 운영되며 <strong>100% 현장 대면결제</strong> 원칙을 준수합니다.
            </div>
          )}

          <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0", background: "#ffffff" }}>
            <div style={{ position: "relative", width: "100%", height: "180px", background: "#0f172a" }}>
              <Image
                src="/images/thai.jpg"
                alt={`${decoded} 아밤 방문 홈케어`}
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                style={{ objectFit: "cover" }}
                priority
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.25) 65%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: "12px", left: "14px", right: "14px", color: "#ffffff" }}>
                <div style={{ fontSize: "11.5px", fontWeight: 700, color: "#fbbf24", marginBottom: "2px" }}>
                  {data.region} 자택 · 호텔 방문 · 100% 현장결제
                </div>
                <h1 style={{ fontSize: "18.5px", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.25, margin: 0, color: "#ffffff" }}>
                  {data.h1}
                </h1>
              </div>
            </div>

            <div style={{ padding: "14px", background: "#ffffff" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#64748b" }}>예약 및 상담 직통 (영업시간 내 100% 방문 가능)</div>
                  <div style={{ fontSize: "21px", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em" }}>{PHONE_NUM}</div>
                </div>
                <div style={{ fontSize: "12px", color: "#475569", textAlign: "right", lineHeight: 1.45 }}>
                  <strong>18:00 예약 접수</strong> · 19:00 출발<br />
                  새벽 05:00 마감 (100% 방문)
                </div>
              </div>

              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "8px 10px", marginBottom: "10px", fontSize: "11.5px", color: "#334155", lineHeight: 1.45 }}>
                <strong>안심 안내 (웹사이트 기록 없음):</strong> 예약 양식에 입력하시는 주소·출입번호 등 모든 정보는 웹사이트에 절대 저장·기록되지 않으며 휴대폰 문자창에만 자동 입력됩니다.
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <a
                  href={SMS_HREF}
                  data-abam-open-modal="true"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0f172a",
                    color: "#fbbf24",
                    padding: "11px 0",
                    borderRadius: "8px",
                    fontWeight: 800,
                    fontSize: "13.5px",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  문자 예약 · 문의
                </a>
                <a
                  href={PHONE_TEL}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#dc2626",
                    color: "#ffffff",
                    padding: "11px 0",
                    borderRadius: "8px",
                    fontWeight: 800,
                    fontSize: "13.5px",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  전화 상담 · 예약
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 메뉴 · 정찰 가격표 */}
        <section id="menu-section" style={{ padding: "18px 0", borderBottom: "1px solid #f1f3f4" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
              {decoded} 코스 및 정찰 요금
            </h2>
            <span style={{ fontSize: "12px", color: "#1d4ed8", fontWeight: 700 }}>
              100% 현장 대면결제
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {COURSES.map((course, idx) => (
              <div
                key={course.id}
                style={{
                  padding: "14px 0",
                  borderBottom: idx === COURSES.length - 1 ? "none" : "1px solid #f1f3f4",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                    <span style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a" }}>
                      {course.name} 코스
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#008744", background: "#f0fdf4", padding: "1px 6px", borderRadius: "4px" }}>
                      {course.badge}
                    </span>
                  </div>

                  <p style={{ fontSize: "12.5px", lineHeight: 1.5, color: "#475569", margin: "0 0 8px 0", paddingLeft: "8px", borderLeft: "2px solid #e2e8f0", wordBreak: "keep-all" }}>
                    {course.desc}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
                    {course.prices.map((p) => (
                      <button
                        key={p.time}
                        type="button"
                        data-abam-course={`${course.name} ${p.time} (${p.price})`}
                        style={{
                          padding: "7px 4px",
                          borderRadius: "6px",
                          border: p.isBest ? "1.5px solid #1d4ed8" : "1px solid #cbd5e1",
                          background: p.isBest ? "#eff6ff" : "#f8fafc",
                          color: p.isBest ? "#1d4ed8" : "#1e293b",
                          fontSize: "12px",
                          fontWeight: 800,
                          cursor: "pointer",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.time} {p.price}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ width: "64px", height: "64px", position: "relative", borderRadius: "6px", overflow: "hidden", flexShrink: 0, background: "#f8f9fa" }}>
                  <Image
                    src={course.img}
                    alt={course.name}
                    fill
                    sizes="64px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 코스 요약 비교표 */}
        <section style={{ padding: "18px 0", borderBottom: "1px solid #f1f3f4" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: "0 0 10px 0" }}>
            코스별 특징 비교
          </h2>

          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", fontSize: "12px", background: "#ffffff" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <th style={{ padding: "8px 6px", fontWeight: 700, color: "#475569", width: "20%" }}>구분</th>
                  <th style={{ padding: "8px 6px", fontWeight: 700, color: "#1d4ed8", width: "26%" }}>타이</th>
                  <th style={{ padding: "8px 6px", fontWeight: 700, color: "#047857", width: "27%" }}>아로마</th>
                  <th style={{ padding: "8px 6px", fontWeight: 700, color: "#b45309", width: "27%" }}>스페셜</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: rIdx === COMPARISON_ROWS.length - 1 ? "none" : "1px solid #f1f5f9" }}>
                    <td style={{ padding: "8px 6px", fontWeight: 700, color: "#334155", background: "#f8fafc" }}>{row.category}</td>
                    <td style={{ padding: "8px 6px", color: "#0f172a" }}>{row.thai}</td>
                    <td style={{ padding: "8px 6px", color: "#0f172a" }}>{row.aroma}</td>
                    <td style={{ padding: "8px 6px", color: "#92400e", fontWeight: 700, background: "#fffbeb" }}>{row.vip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 지역 배차 및 FAQ 안내 */}
        <section id="local-guide" style={{ padding: "18px 0", borderBottom: "1px solid #f1f3f4" }}>
          <h2 style={{ fontSize: "15.5px", fontWeight: 800, color: "#0f172a", margin: "0 0 10px 0", lineHeight: 1.4 }}>
            {unique.summaryTitle}
          </h2>
          <div style={{ fontSize: "13px", color: "#334155", lineHeight: 1.7 }}>
            {unique.introParagraphs.map((para, i) => (
              <p key={i} style={{ margin: "0 0 10px 0", wordBreak: "keep-all" }}>
                {para}
              </p>
            ))}
          </div>

          <div style={{ marginTop: "12px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px 14px" }}>
            <h3 style={{ fontSize: "13.5px", fontWeight: 800, color: "#0f172a", margin: "0 0 8px 0" }}>
              {unique.dispatchHighlightTitle}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12.5px", color: "#334155", lineHeight: 1.55 }}>
              {unique.dispatchBullets.map((b, idx) => (
                <div key={idx} style={{ paddingLeft: "10px", borderLeft: "2px solid #93c5fd", wordBreak: "keep-all" }}>
                  <div style={{ fontWeight: 800, color: "#1d4ed8", marginBottom: "1px" }}>{b.label}</div>
                  <div>{b.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <h3 style={{ fontSize: "14.5px", fontWeight: 800, color: "#0f172a", margin: "0 0 2px 0" }}>
              {decoded} 자주 묻는 질문
            </h3>
            {localFaq.map((f) => (
              <div key={f.q} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "11px 13px", wordBreak: "keep-all" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 800, color: "#1d4ed8", fontSize: "13px", flexShrink: 0 }}>Q.</span>
                  <h4 style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", margin: 0, lineHeight: 1.45 }}>{f.q}</h4>
                </div>
                <div style={{ paddingLeft: "18px", fontSize: "12.5px", color: "#475569", lineHeight: 1.6 }}>
                  <div style={{ paddingLeft: "8px", borderLeft: "2px solid #cbd5e1" }}>{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 인근 서비스 지역 (3열 균등 그리드 줄맞춤) */}
        <section style={{ padding: "16px 0", borderBottom: "1px solid #f1f3f4" }}>
          <div style={{ fontSize: "13.5px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
            인근 지역 방문 안내
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
            {relatedKeywords.map((kw) => (
              <Link
                key={kw}
                href={`/seo/${encodeURIComponent(kw.replace(/\s+/g, "-"))}`}
                style={{
                  fontSize: "12px",
                  color: "#1e293b",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "5px",
                  padding: "6px 4px",
                  textAlign: "center",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {kw}
              </Link>
            ))}
          </div>
        </section>

        {/* 푸터 */}
        <footer style={{ padding: "18px 0 8px", fontSize: "11.5px", color: "#64748b", lineHeight: 1.65 }}>
          <div style={{ paddingLeft: "8px", borderLeft: "2px solid #cbd5e1" }}>
            <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "12px", marginBottom: "2px" }}>
              아밤 (Abam.kr) · 서울·경기 1:1 방문 홈케어
            </div>
            <div>예약 및 상담: {PHONE_NUM} · 18:00 예약 접수 · 19:00 출발 · 05:00 마감</div>
            <div>코스: 타이 · 아로마 · 스페셜 (60분 / 90분 / 120분)</div>
          </div>
        </footer>

      </main>

      <AbamBottomBookingBar regionHint={decoded} />
    </div>
  );
}
