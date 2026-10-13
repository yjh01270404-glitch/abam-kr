import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  SERVED_KEYWORDS,
  INDEXABLE_KEYWORDS,
  generateSeoPageData,
  isIndexableKeyword,
  isServedKeyword,
  hubKeywordFor,
} from "../../../lib/seo-keywords";
import { DISTRICTS } from "../../../lib/region-data";
import { findGeoLocation } from "../../../lib/geo-coords";

type Props = { params: Promise<{ keyword: string }> };

export const dynamic = "force-static";
export const revalidate = 86400; // 하루(86400초) 캐시
export const dynamicParams = false;

const SITE_URL  = "https://abam.kr";
const SMS_HREF  = "sms:01066072239";
const PHONE_TEL = "tel:010-6607-2239";
const PHONE_NUM = "010-6607-2239";

const COMPARISON_ROWS = [
  {
    category: "기본 가격대",
    thai: "80,000원 ~ 120,000원",
    aroma: "90,000원 ~ 140,000원",
    vip: "100,000원 ~ 160,000원",
  },
  {
    category: "압의 세기",
    thai: "시원하고 강함 ★★★★☆",
    aroma: "부드러움~중간 ★★☆☆☆",
    vip: "시원한 지압 + 부드러운 오일 ★★★☆☆",
  },
  {
    category: "오일 여부",
    thai: "오일 없음 (건식)",
    aroma: "천연 에센셜 오일",
    vip: "타이 지압 + 천연 아로마 오일",
  },
  {
    category: "주요 효과",
    thai: "척추·골반 이완, 뭉친 근육통 완화",
    aroma: "숙면 유도, 피부 보습, 피로 회복",
    vip: "지압과 오일 관리를 동시에 받는 복합 케어",
  },
  {
    category: "추천 고객",
    thai: "운동 후 뻐근함, 강한 지압 선호",
    aroma: "만성 피로, 부드러운 케어 희망",
    vip: "타이와 아로마를 함께 원하는 분",
  },
];

const COURSES = [
  {
    id: "thai",
    name: "타이",
    badge: "인기",
    img: "/images/thai.jpg",
    priceSummary: "80,000원 ~ 120,000원",
    desc: "전통 건식 지압 · 시원한 압. 왓포 전통 방식의 건식 지압으로 뭉친 근육을 시원하게 풀어주고 스트레칭으로 몸의 균형을 잡아줍니다.",
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
    desc: "천연 아로마 오일 · 부드러운 케어. 천연 식물성 아로마 오일을 사용하여 부드럽게 전신을 케어하고 림프 순환과 깊은 휴식을 돕습니다.",
    prices: [
      { time: "60분", price: "90,000원" },
      { time: "90분", price: "110,000원", isBest: true },
      { time: "120분", price: "140,000원" },
    ],
  },
  {
    id: "special",
    name: "스페셜",
    badge: "프리미엄",
    img: "/images/flower_spa.jpg",
    priceSummary: "100,000원 ~ 160,000원",
    desc: "타이 + 아로마 복합 케어. 타이의 시원한 지압과 아로마의 부드러운 오일 관리를 동시에 받을 수 있는 프리미엄 코스입니다.",
    prices: [
      { time: "60분", price: "100,000원" },
      { time: "90분", price: "120,000원", isBest: true },
      { time: "120분", price: "160,000원" },
    ],
  },
];

export async function generateStaticParams() {
  return SERVED_KEYWORDS.map((keyword) => ({
    keyword: keyword.replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { keyword } = await params;
  const data = generateSeoPageData(keyword);
  const decoded = decodeURIComponent(keyword).replace(/-/g, " ");
  const selfUrl = `${SITE_URL}/seo/${encodeURIComponent(decoded.replace(/\s+/g, "-"))}`;
  // 색인 대상이 아닌 변형 페이지는 자치구 허브(없으면 홈)로 신호를 모읍니다.
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
      title: `${decoded} — Abam.kr 프라이빗 1:1 방문 홈케어`,
      description: data.description,
      type: "website" as const,
      url: canonicalUrl,
      siteName: "Abam.kr",
      locale: "ko_KR",
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: `${decoded} Abam.kr 프라이빗 1:1 방문 홈케어` }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${decoded} — Abam.kr 프라이빗 1:1 방문 홈케어`,
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
  const data = generateSeoPageData(keyword);
  const decoded = decodeURIComponent(keyword).replace(/-/g, " ");
  if (!isServedKeyword(decoded)) notFound();
  const district = data.district;
  const canonicalUrl = `${SITE_URL}/seo/${encodeURIComponent(decoded.replace(/\s+/g, "-"))}`;

  // 내부 링크: 같은 자치구·인접 키워드를 우선 노출하고, 부족하면 전체 자치구 허브로 채웁니다.
  const hubLinks = DISTRICTS.map((d) => hubKeywordFor(d)).filter((k) => k !== decoded);
  const relatedKeywords = Array.from(
    new Set([...data.relatedKeywords, ...hubLinks, ...INDEXABLE_KEYWORDS.slice(0, 12)]),
  )
    .filter((k) => k !== decoded)
    .slice(0, 30);

  const localFaq = [
    {
      q: `${decoded} 예약은 어떻게 하나요?`,
      a: "전화 또는 문자로 코스(타이·아로마·스페셜)와 방문 장소를 알려 주세요. 예약은 18:00부터 가능하며, 1시간 전에 예약해 주시면 더욱 편안하게 이용하실 수 있습니다.",
    },
    {
      q: district ? `${district.gu}에서는 어떤 장소로 방문하나요?` : "어떤 장소로 방문하나요?",
      a: district
        ? `${district.gu} 내 자택·호텔 등 원하시는 공간으로 방문합니다. ${district.stations.slice(0, 3).join(", ")} 인근 주소도 안내해 주시면 됩니다.`
        : "자택·호텔 등 원하시는 공간으로 서울·경기 전역 방문합니다.",
    },
    {
      q: "예약 시간과 출발 시간은 어떻게 되나요?",
      a: "예약 접수는 18:00부터, 매니저 출발은 19:00부터, 마지막 예약 마감은 새벽 05:00입니다. 1시간 전에 예약해 주시면 더욱 편안하게 이용하실 수 있습니다.",
    },
    {
      q: "주차장·공동현관·호텔은 어떻게 이용하나요?",
      a: "주차장과 1층 공동현관 비밀번호는 예약 시 미리 알려 주세요. 비밀번호를 알려 주기 어려우시면 호출(세대 호출벨) 버튼으로 열어 주실 수 있다고 미리 말씀해 주시면 됩니다. 호텔·모텔은 1층 로비에서 매니저를 만나 대면결제를 하신 뒤, 매니저가 객실까지 픽업·동행합니다.",
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      name: `${decoded} — Abam.kr 프라이빗 1:1 방문 홈케어`,
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
      name: `Abam.kr 프라이빗 1:1 방문 홈케어 (${decoded})`,
      alternateName: [`${decoded} 출장안마`, `${decoded} 출장마사지`, "Abam.kr"],
      description: `${decoded} 지역 프라이빗 1:1 방문 홈케어. 자택·호텔 방문, 예약 18:00부터 · 출발 19:00부터 · 마지막 예약 05:00 마감.`,
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
            { "@type": "AdministrativeArea", name: `서울특별시 ${district.gu}` },
            ...district.areas.map((a) => ({ "@type": "AdministrativeArea", name: a })),
            ...district.stations.map((s) => ({ "@type": "Place", name: `${s} 인근` })),
          ]
        : [
            { "@type": "AdministrativeArea", name: findGeoLocation(decoded).placename },
            { "@type": "AdministrativeArea", name: "서울·경기 전역" },
          ],
      priceRange: "₩80,000 - ₩160,000",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "850",
        reviewCount: "620",
      },
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
    <div style={{ minHeight: "100vh", background: "transparent", color: "#0f172a", fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", "Pretendard", sans-serif', WebkitFontSmoothing: "antialiased" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. 상단 클린 헤더 */}
      <header style={{ background: "rgba(10, 15, 29, 0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255, 255, 255, 0.12)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "12px 18px 10px" }}>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "20px" }}>🌙</span>
                <span className="abam-script-font" style={{
                  fontSize: "26px",
                  color: "#fef08a",
                  fontStyle: "italic",
                  transform: "rotate(-1deg) skewX(-6deg)",
                  display: "inline-block",
                  lineHeight: 1,
                }}>아름다운 밤</span>
                <span style={{ fontSize: "16px", fontWeight: 900, color: "#e11d48", letterSpacing: "-0.3px" }}>[아밤 · Abam]</span>
              </span>
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
                src="/images/thai.jpg"
                alt={`${decoded} Abam.kr 프라이빗 1:1 방문 홈케어`}
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                style={{ objectFit: "cover" }}
                priority
              />
              <div style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(15,23,42,0.85)", padding: "3px 8px", borderRadius: "4px", fontSize: "10.5px", fontWeight: 800, color: "#fef08a" }}>
                예약 18:00부터 · 출발 19:00부터 · 마지막 예약 05:00 마감
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 14px 10px", background: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.3) 70%, transparent 100%)", color: "#ffffff" }}>
                <div className="abam-copperplate-en" style={{ fontSize: "16px", color: "#fef08a", letterSpacing: "0.06em", opacity: 0.95, marginBottom: "2px", lineHeight: 1.2 }}>
                  Beautiful Night · Private 1:1 Care
                </div>
                <div style={{ fontSize: "11.5px", fontWeight: 700, color: "#cbd5e1", marginBottom: "2px" }}>
                  {data.region} 자택 · 호텔 방문
                </div>
                <h1 style={{ fontSize: "19px", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.25, margin: 0, color: "#ffffff" }}>
                  {data.h1}
                </h1>
              </div>
            </div>

            <div style={{ padding: "16px 14px 14px", background: "#ffffff", textAlign: "center" }}>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#dc2626", marginBottom: "6px" }}>
                프라이빗 1:1 방문 홈케어
              </div>
              <div style={{ fontSize: "24px", fontWeight: 900, color: "#111827", letterSpacing: "-0.02em", margin: "4px 0 10px 0" }}>
                {PHONE_NUM}
              </div>
              <div style={{ fontSize: "13.5px", lineHeight: 1.7, color: "#4b5563", margin: "0 0 12px 0" }}>
                <span className="abam-script-font" style={{ fontSize: "21px", color: "#d97706", fontStyle: "italic", verticalAlign: "middle" }}>아름다운 밤</span>, 당신을 위한 특별한 시간<br />
                <strong>예약 18:00부터</strong> · 출발 19:00부터 · 마지막 예약 05:00 마감<br />
                {data.region} 전 지역 <strong>자택 · 호텔 방문</strong>
              </div>
              <div style={{ background: "#1a73e8", color: "#ffffff", padding: "12px 0", borderRadius: "6px", fontWeight: 800, fontSize: "14px" }}>
                사진 클릭 → 즉시 전화연결 / 예약 상담
              </div>
            </div>
          </a>

          {/* 액션 버튼 (문자 예약 및 전화 예약) */}
          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            <a
              href={SMS_HREF}
              style={{
                flex: 1.2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                background: "#242836",
                color: "#ffffff",
                padding: "11px 0",
                borderRadius: "20px",
                fontWeight: 800,
                fontSize: "13px",
                textDecoration: "none",
                border: "1px solid #3a3f50",
                cursor: "pointer",
              }}
            >
              ✉️ 문자 간편예약
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
                  예약 · 영업 안내
                </div>
                <div style={{ fontSize: "12px", color: "#008744", fontWeight: 600 }}>
                  예약 18:00부터 · 출발 19:00부터 · 마지막 예약 05:00 마감
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
              {decoded} COURSE & PRICE
            </h2>
            <span style={{ fontSize: "12px", color: "#1a73e8", fontWeight: 600 }}>
              60분 · 90분 · 120분
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
              3가지 코스 한눈에 비교하기
            </h2>
            <span style={{ fontSize: "11px", color: "#5f6368" }}>
              COURSE & PRICE 기준
            </span>
          </div>

          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", border: "1px solid #e8eaed", borderRadius: "6px" }}>
            <table style={{ width: "100%", minWidth: "460px", borderCollapse: "collapse", textAlign: "center", fontSize: "12px", background: "#ffffff" }}>
              <thead>
                <tr style={{ background: "#f8f9fa", borderBottom: "1px solid #e8eaed" }}>
                  <th style={{ padding: "10px 8px", fontWeight: 700, color: "#5f6368", width: "22%" }}>구분</th>
                  <th style={{ padding: "10px 8px", fontWeight: 700, color: "#1a73e8", width: "26%" }}>타이</th>
                  <th style={{ padding: "10px 8px", fontWeight: 700, color: "#008744", width: "26%" }}>아로마</th>
                  <th style={{ padding: "10px 8px", fontWeight: 700, color: "#b45309", width: "26%" }}>스페셜</th>
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

        {/* 지역 고유 안내 + 지역 FAQ (페이지별 고유 콘텐츠) */}
        <section id="local-guide" style={{ padding: "20px 0", borderBottom: "1px solid #f1f3f4" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#202124", margin: "0 0 12px 0" }}>
            {district ? `${district.gu} 출장안마·출장마사지·출장홈타이·출장서비스 이용 안내` : `${decoded} 이용 안내`}
          </h2>
          {district ? (
            <div style={{ fontSize: "13px", color: "#3c4043", lineHeight: 1.75 }}>
              <p style={{ margin: "0 0 10px 0" }}>
                Abam.kr(아름다운 밤)은 {district.gu}의 {district.areas.join(", ")} 일대를 포함해 {district.stations.join(", ")} 주변으로 방문하는
                프라이빗 1:1 방문 홈케어입니다. {district.gu}은(는) {district.note}입니다.
              </p>
              <p style={{ margin: "0 0 10px 0" }}>
                주요 방문 환경은 {district.stay}이며, 자택은 정확한 주소와 출입 방법(주차장·공동현관 비밀번호 또는 호출버튼)을, 호텔·모텔은 호텔명을 알려 주시면
                1층 로비에서 만나 대면결제 후 객실까지 안내해 드립니다. 예약 접수는 18:00부터, 매니저 출발은 19:00부터, 마지막 예약 마감은 새벽 05:00입니다.
              </p>
              <p style={{ margin: 0 }}>
                타이(80,000원~), 아로마(90,000원~), 스페셜(100,000원~) 3가지 코스를 60·90·120분으로
                선택하실 수 있습니다. 1시간 전에 예약해 주시면 더욱 편안하게 이용하실 수 있습니다.
              </p>
            </div>
          ) : (
            <p style={{ fontSize: "13px", color: "#3c4043", lineHeight: 1.75, margin: 0 }}>
              {decoded}에 관한 안내입니다. Abam.kr(아름다운 밤)은 서울·경기 전역 자택·호텔로 방문하는 프라이빗 1:1 방문 홈케어이며,
              예약 접수는 18:00부터, 매니저 출발은 19:00부터, 마지막 예약 마감은 새벽 05:00입니다.
            </p>
          )}

          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {localFaq.map((f) => (
              <div key={f.q}>
                <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: "#202124", margin: "0 0 3px 0" }}>{f.q}</h3>
                <p style={{ fontSize: "12.5px", color: "#5f6368", lineHeight: 1.65, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 이용 수칙 안내 */}
        <section id="guide-section" style={{ padding: "20px 0", borderBottom: "1px solid #f1f3f4" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#202124", margin: "0 0 14px 0" }}>
            {decoded} 이용 절차 안내
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "#3c4043", lineHeight: 1.6 }}>
            <div>
              <strong>1. 코스 및 시간 선택:</strong> 원하시는 코스(타이, 아로마, 스페셜)와 관리 시간(60·90·120분)을 선택 후 문자나 전화로 접수합니다.
            </div>
            <div>
              <strong>2. 방문 장소 확인:</strong> {data.region} 내 정확한 방문 장소(자택 주소 또는 호텔명)를 전달합니다. 자택은 주차장·공동현관 비밀번호(어려우시면 호출버튼으로 열어 주실 수 있다고 미리 안내), 호텔·모텔은 1층 로비에서 만나 대면결제 후 객실로 이동합니다.
            </div>
            <div>
              <strong>3. 프라이빗 1:1 케어:</strong> 예약은 18:00부터 받으며 매니저 출발은 19:00부터입니다. 1시간 전에 예약하시면 더욱 편안하게 원하시는 공간에서 케어를 받으실 수 있습니다.
            </div>
          </div>
        </section>

        {/* 수도권 연관 서비스 지역 */}
        <section style={{ padding: "20px 0", borderBottom: "1px solid #f1f3f4" }}>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#202124", marginBottom: "10px" }}>
            서울 지역별 출장마사지 바로가기
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
            Abam.kr · 아름다운 밤, 당신을 위한 특별한 시간
          </div>
          <div>대표 상담 전화: {PHONE_NUM} · 예약 18:00부터 · 출발 19:00부터 · 마지막 예약 05:00 마감</div>
          <div>코스: 타이 · 아로마 · 스페셜 (60분 / 90분 / 120분)</div>
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
            href={SMS_HREF}
            style={{
              flex: 1.3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              background: "#242836",
              color: "#ffffff",
              padding: "12px 0",
              borderRadius: "10px",
              fontWeight: 900,
              fontSize: "14px",
              textDecoration: "none",
              border: "1px solid #3a3f50",
            }}
          >
            <span>✉️ 문자 간편예약</span>
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
