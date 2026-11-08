path = r"C:\Users\yjh01\.gemini\antigravity-ide\scratch\abam-kr\src\components\AbamLanding.tsx"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

new_price_section = """        {/* 3. 코스 및 정찰 요금표 */}
        <section id="price" style={{ marginBottom: '26px', scrollMarginTop: '56px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '10px',
              gap: '8px',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0, whiteSpace: 'nowrap' }}>
              {isKo ? '코스 및 정찰 요금표' : t.priceTitle}
            </h2>
            <span style={{ fontSize: '12px', color: C.accent, fontWeight: 700, whiteSpace: 'nowrap' }}>
              {isKo ? '요금 터치 시 예약 양식 열림' : 'Tap price to book'}
            </span>
          </div>

          <div
            style={{
              backgroundColor: C.cardBg,
              border: `1px solid ${C.border}`,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            }}
          >
            {c.courses.map((course, idx) => (
              <div
                key={course.no}
                style={{
                  borderTop: idx > 0 ? `1px solid ${C.border}` : 'none',
                  padding: '14px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '6px',
                    gap: '8px',
                  }}
                >
                  <strong style={{ fontSize: '16.5px', color: '#ffffff', fontWeight: 800, whiteSpace: 'nowrap' }}>
                    {course.name} 코스
                  </strong>
                  <span style={{ fontSize: '12px', color: C.accent, fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {course.subtitle}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '13px',
                    color: C.textSub,
                    margin: '0 0 10px',
                    paddingLeft: '10px',
                    borderLeft: '2px solid #1e293b',
                    lineHeight: 1.5,
                  }}
                >
                  {course.desc}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {course.prices.map((pr, pi) => {
                    const slipCodes = [
                      ['타이 60분 8만', '타이 90분 10만', '타이 120분 12만'],
                      ['아로마 60분 9만', '아로마 90분 11만', '아로마 120분 14만'],
                      ['스페셜 60분 10만', '스페셜 90분 12만', '스페셜 120분 16만'],
                    ];
                    const code = slipCodes[idx]?.[pi] || `${course.name} ${c.priceSection.durations[pi]} ${pr}`;
                    return (
                      <button
                        key={pi}
                        type="button"
                        onClick={() => openDirectAbamSms(code)}
                        style={{
                          textAlign: 'center',
                          border: `1px solid ${C.border}`,
                          backgroundColor: '#090d18',
                          borderRadius: '8px',
                          padding: '10px 4px',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'border-color 0.2s',
                        }}
                      >
                        <div style={{ fontSize: '12px', color: C.textMuted, fontWeight: 600 }}>
                          {c.priceSection.durations[pi]}
                        </div>
                        <div
                          style={{
                            fontSize: '14.5px',
                            fontWeight: 800,
                            color: '#ffffff',
                            marginTop: '2px',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          {pr}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>"""

i1 = text.find('        {/* 3. 코스 및 요금표')
if i1 == -1:
    i1 = text.find('        {/* 3. 코스 및 정찰 요금표')
i2 = text.find('        {/* 5. 이용 및 예약 필수 안내')
if i2 == -1:
    i2 = text.find('        {/* 4. 이용 안내')
if i2 == -1:
    i2 = text.find('<section id="guide"')

if i1 != -1 and i2 != -1 and i2 > i1:
    text = text[:i1] + new_price_section + "\n\n" + text[i2:]
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Fixed Abam course price table cleanly!")
else:
    print(f"Error finding markers: i1={i1}, i2={i2}")

