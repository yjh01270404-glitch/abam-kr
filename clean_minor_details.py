# -*- coding: utf-8 -*-

def clean_minor_details():
    path = 'src/app/page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Clean line 240 duplicate comment
    content = content.replace(
        '// ── 서울 25개 전 자치구 & 인접 경기권 실시간 출장 쾌속 레이더 ──\n// ── 서울 25개 전 자치구 실시간 출장 쾌속 레이더 ──',
        '// ── 서울 25개 전 자치구 실시간 출장 쾌속 레이더 ──'
    )

    # 2. Update PLACE_TIPS rendering to structured flex bullet items
    old_place_ul = '''                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12.5px', color: '#475569', lineHeight: 1.7 }}>
                    {pt.points.map((p, pi) => (
                      <li key={pi} style={{ marginBottom: '4px' }}>{p}</li>
                    ))}
                  </ul>'''
    new_place_ul = '''                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '4px 0 0' }}>
                    {pt.points.map((p, pi) => (
                      <div key={pi} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: '#b38728', fontWeight: 900, fontSize: '12px', lineHeight: 1.6, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.65, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>{p}</span>
                      </div>
                    ))}
                  </div>'''
    content = content.replace(old_place_ul, new_place_ul)

    # 3. Update Metropolitan 45-Districts header to Seoul 25-Districts
    content = content.replace('METROPOLITAN 45-DISTRICTS', 'SEOUL 25-DISTRICTS FULL NETWORK')
    content = content.replace('수도권 전지역 45개 권역 실시간 출장 홈케어 네트워크', '서울특별시 25개 전 자치구 실시간 출장 홈케어 네트워크')
    content = content.replace('수도권 심야 출장 홈케어 지역 안내', '서울 25개 자치구 심야 출장 홈케어 지역 안내')

    # 4. Clean clean slug for cityName in FULL_CITIES_SEO
    old_city_link = '''                  {cityGroup.list.map((cityName, cni) => (
                    <Link
                      key={cni}
                      href={`/seo/${encodeURIComponent(cityName + '출장마사지')}`}'''
    new_city_link = '''                  {cityGroup.list.map((cityName, cni) => {
                    const cleanSlug = cityName.split(' ')[0] + '출장마사지';
                    return (
                    <Link
                      key={cni}
                      href={`/seo/${encodeURIComponent(cleanSlug)}`}'''
    content = content.replace(old_city_link, new_city_link)
    content = content.replace('                    </Link>\n                  ))}\n                </div>', '                    </Link>\n                    );\n                  })}\n                </div>')

    # 5. Clean FAQ comment
    content = content.replace('{/* ── [벤치마크 특화 4] ❓ 서울 전지역 & 경기권 출장 홈케어 자주 묻는 질문 (FAQ 8문 8답 아코디언) ── */}', '{/* ── [벤치마크 특화 4] ❓ 서울 전지역 출장 홈케어 자주 묻는 질문 (FAQ 8문 8답 아코디언) ── */}')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Cleaned minor details and list typography successfully!')

clean_minor_details()
