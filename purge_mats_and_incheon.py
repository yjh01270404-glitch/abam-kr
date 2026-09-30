import re

# ─────────────────────────────────────────────────────────────
# 1. Clean src/app/page.tsx
# ─────────────────────────────────────────────────────────────
with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    page = f.read()

# [매트 관련 삭제 및 자연스러운 위생 용품으로 대체]
page = page.replace("status: '소독 매트 세팅 및 케어 시작'", "status: '위생 세팅 완료 및 케어 시작'")
page = page.replace("푹신한 전용 매트랑 순면 관리복까지 다 챙겨오셔서 제 방이 순식간에 호텔 고급 스파룸으로 변신했네요.", "순면 관리복과 최고급 천연 오일까지 깔끔하게 챙겨오셔서 제 방이 순식간에 호텔 고급 스파룸으로 변신했네요.")
page = page.replace("'소음 없는 조용한 이동 및 무소음 위생 매트 세팅',", "'소음 없는 조용한 이동 및 조용한 프라이빗 힐링 케어',")
page = page.replace("1회용 청결 소독 패드 & 층간소음 방지 매트 완비", "1회용 청결 소독 용품 완비")
page = page.replace("푹신한 최고급 이동식 전용 매트, 위생 1회용 패드, 순면 관리복, 최고급 천연 에센셜 오일 등", "위생 1회용 패드, 순면 관리복, 최고급 천연 에센셜 오일 등")
page = page.replace("소독 용품을 지참하여", "위생 비품과 순면 관리복을 지참하여")
page = page.replace("소독 패드를 완비하여", "위생 패드와 비품을 완비하여")
page = page.replace("매트/천연 오일 세팅", "위생 비품 세팅")
page = page.replace("전용 위생 매트 및 천연 오일 세팅", "순면 관리복 및 최고급 천연 오일 세팅")
page = re.sub(r'매트[를은이가]?\s*', '', page)

# [인천, 영종도, 송도, 청라 전면 삭제 및 서울·경기로 대체]
page = page.replace("name: '경기 북부·인천권',", "name: '경기 북부·서부권',")
page = page.replace("{ label: '인천 송도 홈케어', slug: '송도출장홈케어' },", "{ label: '김포 한강신도시 홈케어', slug: '김포출장홈케어' },")
page = page.replace("{ label: '청라 홈케어', slug: '청라출장홈케어' },", "{ label: '파주 운정 마사지', slug: '운정출장마사지' },")

# Live ticker
page = page.replace(
    "{ region: '인천 송도 센트럴파크 호텔', course: '👑 힐링 VIP 90분', status: '외국인 투숙객 왓츠앱 예약 출발', time: '13분 전' },",
    "{ region: '분당 판교 그래비티 호텔', course: '👑 힐링 VIP 90분', status: '판교 IT 기업 임원 예약 확정 · 출발', time: '13분 전' },"
)

# Review
page = page.replace(
    "author: '강*혁 대표님 (인천 송도 특급호텔)',",
    "author: '강*혁 대표님 (판교 그래비티 호텔)',"
)
page = page.replace(
    "course: '👑 힐링 VIP 90분 2인 룸 예약',",
    "course: '👑 힐링 VIP 90분 코스',"
)
page = page.replace(
    "해외에서 온 바이어가 시차 때문에 잠을 못 자서 호텔 객실로 각각 1인 1실 배차를 요청드렸습니다. 외국인 왓츠앱으로도 바로 응대해주시고, 바이어가 한국의 홈케어 마사지 퀄리티가 5성급 호텔 스파보다 훨씬 뛰어나다고 엄지척했습니다. 사업상 신뢰를 지켜주셔서 감사드립니다.",
    "판교 출장 온 해외 파트너와 미팅 후 호텔 객실로 예약했습니다. 왓츠앱으로 예약도 빠르고, 테라피스트 분이 수준급이라 피로가 싹 가셨습니다. 신용카드 영수증도 깔끔하게 발행해주셔서 너무 만족스럽습니다."
)

# Gangnam radar 12th card / Full cities
old_incheon_card = """    title: '✈️ 인천광역시 및 공항권역 (특급호텔 24시간 대응)',
    list: [
      '송도 센트럴파크', '청라국제도시', '부평구', '구월동', '영종도(인천공항)', '간석동', '주안'
    ]"""

new_gyeonggi_card = """    title: '🏙️ 경기 북부 및 주요 거점 도시 (24시간 신속 배차)',
    list: [
      '일산 동구·서구', '김포 한강신도시', '파주 운정', '하남 미사강변', '남양주 다산', '의정부시', '구리시', '광명시'
    ]"""
page = page.replace(old_incheon_card, new_gyeonggi_card)

# Foreigner sections in page.tsx
page = page.replace("Seoul & Incheon", "Seoul & Greater Seoul")
page = page.replace("서울·인천 전 지역 30분 도착", "서울 및 수도권 전 지역 30분 도착")
page = page.replace("서울·인천 전지역", "서울 및 경기 수도권 전지역")
page = page.replace("across Seoul & Incheon", "across Seoul & Gyeonggi")
page = page.replace("소울·仁川", "ソウル・首都圏")
page = page.replace("ソウル・仁川エリア", "ソウル・首都圏エリア")
page = page.replace("首尔及仁川", "首尔及京畿道")
page = page.replace("서울 25개 전 자치구와 경기·인천 20개 주요 시군구", "서울 25개 전 자치구와 경기 15개 주요 도시")
page = page.replace("서울, 명동, 동대문, 홍대 및 仁川", "서울, 명동, 동대문, 홍대 및 강남")
page = page.replace("首尔全境五星级酒店/公寓客房上门SPA服务", "首尔及首都圈五星级酒店/公寓客房上门SPA服务")
page = page.replace("首尔江南、明洞、东大门、弘大及仁川全境酒店", "首尔江南、明洞、东大门、弘大及首都圈全境酒店")

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(page)
print("page.tsx cleaned: No mats, No Incheon/Yeongjongdo")


# ─────────────────────────────────────────────────────────────
# 2. Clean src/app/en/page.tsx
# ─────────────────────────────────────────────────────────────
with open('src/app/en/page.tsx', 'r', encoding='utf-8') as f:
    en = f.read()

en = en.replace("Seoul & Incheon", "Seoul & Metropolitan Area")
en = en.replace("clean massage mats and organic oils", "pure cotton robes, organic oils, and sanitary items")
en = en.replace("'Incheon airport transit hotel massage',", "'Seoul 5 star hotel massage',")
en = en.replace("'Songdo hotel massage'", "'Pangyo hotel massage'")
en = en.replace("Gangnam, Myeongdong, Incheon, etc.", "Gangnam, Myeongdong, Yeouido, etc.")
en = en.replace("Sofitel Ambassador, Paradise City Incheon.", "Sofitel Ambassador, Josun Palace.")
en = en.replace("Incheon Airport Transit Hotels, Songdo Central Park Hotels, Gimpo Airport area.", "Gimpo Airport area, Pangyo Tech Valley Hotels, Bundang area.")
en = re.sub(r'massage mats\s*(and)?', '', en)

with open('src/app/en/page.tsx', 'w', encoding='utf-8') as f:
    f.write(en)
print("en/page.tsx cleaned")


# ─────────────────────────────────────────────────────────────
# 3. Clean src/app/jp/page.tsx
# ─────────────────────────────────────────────────────────────
with open('src/app/jp/page.tsx', 'r', encoding='utf-8') as f:
    jp = f.read()

jp = jp.replace("ソウル・仁川エリア", "ソウル・首都圏エリア")
jp = jp.replace("ソウル全域・仁川", "ソウル全域・首都圏")
jp = jp.replace("ソウル・仁川", "ソウル・首都圏")
jp = jp.replace("仁川空港 ホテル 出張マッサージ", "明洞 ホテル 出張マッサージ")
jp = jp.replace("江南、明洞、東大門、弘大、仁川", "江南、明洞、東大門、弘大、汝矣島")
jp = jp.replace("専用マット", "衛生アメニティ")
jp = jp.replace("マッサージ用マット", "衛生用品")
jp = re.sub(r'マット[をにや]?\s*', '', jp)

with open('src/app/jp/page.tsx', 'w', encoding='utf-8') as f:
    f.write(jp)
print("jp/page.tsx cleaned")


# ─────────────────────────────────────────────────────────────
# 4. Clean src/app/cn/page.tsx
# ─────────────────────────────────────────────────────────────
with open('src/app/cn/page.tsx', 'r', encoding='utf-8') as f:
    cn = f.read()

cn = cn.replace("首尔及仁川", "首尔及首都圈")
cn = cn.replace("仁川", "京畿道")
cn = cn.replace("带齐高级芳香精油与专用床垫", "带齐高级纯棉管理服与天然芳香精油")
cn = cn.replace("专用床垫", "卫生用品")
cn = cn.replace("床垫", "纯棉管理服")
cn = re.sub(r'床垫[与和]?\s*', '', cn)

with open('src/app/cn/page.tsx', 'w', encoding='utf-8') as f:
    f.write(cn)
print("cn/page.tsx cleaned")


# ─────────────────────────────────────────────────────────────
# 5. Clean src/app/layout.tsx
# ─────────────────────────────────────────────────────────────
with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
    layout = f.read()

layout = layout.replace("서울·경기·인천", "서울·경기")
layout = layout.replace("강남·서울·경기·인천", "강남·서울·경기")
layout = layout.replace("'인천출장홈케어', '송도출장홈케어',", "'광교출장홈케어', '위례출장홈케어',")
layout = layout.replace("'인천출장마사지', '인천출장홈케어',", "'분당출장마사지', '수원출장홈타이',")
layout = layout.replace("{ '@type': 'City', name: '인천광역시 (송도, 청라, 부평 등)' },", "")

with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(layout)
print("layout.tsx cleaned")


# ─────────────────────────────────────────────────────────────
# 6. Clean src/app/sitemap.ts and seo-keywords
# ─────────────────────────────────────────────────────────────
with open('src/app/sitemap.ts', 'r', encoding='utf-8') as f:
    sitemap = f.read()

sitemap = sitemap.replace("SEOUL_SEO, GYEONGGI_SEO, INCHEON_SEO,", "SEOUL_SEO, GYEONGGI_SEO,")
sitemap = sitemap.replace("  // 인천 지역 (0.85)\n  const incheonPages = INCHEON_SEO.map(k => toSeoPage(k, 0.85));\n", "")
sitemap = sitemap.replace("    ...incheonPages,\n", "")

with open('src/app/sitemap.ts', 'w', encoding='utf-8') as f:
    f.write(sitemap)
print("sitemap.ts cleaned")


# ─────────────────────────────────────────────────────────────
# 7. Clean src/app/seo/[keyword]/page.tsx
# ─────────────────────────────────────────────────────────────
with open('src/app/seo/[keyword]/page.tsx', 'r', encoding='utf-8') as f:
    seopage = f.read()

seopage = seopage.replace("서울·경기·인천", "서울·경기 수도권")
seopage = seopage.replace("매트", "비품")

with open('src/app/seo/[keyword]/page.tsx', 'w', encoding='utf-8') as f:
    f.write(seopage)
print("seo/[keyword]/page.tsx cleaned")
