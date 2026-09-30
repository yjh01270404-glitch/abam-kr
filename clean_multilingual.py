import re

# 1. Clean en/page.tsx
with open('src/app/en/page.tsx', 'r', encoding='utf-8') as f:
    en = f.read()

# Remove remaining LINE_LINK, TELEGRAM_LINK
en = re.sub(r"const LINE_LINK = [^;]+;\s*", "", en)
en = re.sub(r"const TELEGRAM_LINK = [^;]+;\s*", "", en)

# Header contact buttons
en = re.sub(
    r'\{\/\* Quick Contact Buttons \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/header>',
    """{/* Quick Contact Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#25D366', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.35)' }}>
              💬 WhatsApp
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 800, color: '#090d16', backgroundColor: '#f3e5ab', border: '1px solid #d4af37', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none' }}>
              📞 Call
            </a>
          </div>
        </div>
      </header>""",
    en
)

# Bottom floating bar
en = re.sub(
    r'\{\/\* Fixed Bottom Bar for Mobile\/Tablet \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*;\s*\}',
    """{/* Fixed Bottom Bar for Mobile/Tablet */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', borderTop: '1.5px solid rgba(212, 175, 55, 0.4)', padding: '10px 16px', zIndex: 50, boxShadow: '0 -6px 25px rgba(0,0,0,0.18)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(37,211,102,0.35)' }}>
            💬 WhatsApp 24/7 Booking
          </a>
          <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '14.5px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37' }}>
            📞 Call Now
          </a>
        </div>
      </div>
    </div>
  );
}""",
    en
)

with open('src/app/en/page.tsx', 'w', encoding='utf-8') as f:
    f.write(en)
print("en/page.tsx fully cleaned")


# 2. Clean jp/page.tsx
with open('src/app/jp/page.tsx', 'r', encoding='utf-8') as f:
    jp = f.read()

jp = re.sub(r"const LINE_LINK = [^;]+;\s*", "", jp)
jp = re.sub(r"const TELEGRAM_LINK = [^;]+;\s*", "", jp)

# Header contact buttons
jp = re.sub(
    r'\{\/\* Quick Contact Buttons \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/header>',
    """{/* Quick Contact Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#25D366', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.35)' }}>
              💬 WhatsApp
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 800, color: '#090d16', backgroundColor: '#f3e5ab', border: '1px solid #d4af37', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none' }}>
              📞 お電話
            </a>
          </div>
        </div>
      </header>""",
    jp
)

# Hero actions
jp = re.sub(
    r'\{\/\* Action Buttons \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*\{\/\* Right Photo Card',
    """{/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.45)' }}>
                  💬 WhatsAppで即時予約 (24時間日本語対応)
                </a>
                <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 24px', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}>
                  📞 お電話: {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Right Photo Card""",
    jp
)

# Bottom section
jp = re.sub(
    r'\{\/\* Global Messenger Floating Card \*\/\}[\s\S]*?<\/section>',
    """{/* Global Messenger Floating Card */}
        <section style={{ backgroundColor: '#090d16', borderRadius: '20px', border: '1.5px solid #d4af37', padding: '36px 28px', color: '#ffffff', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 950, color: '#f3e5ab', margin: '0 0 10px' }}>
            今夜ソウルのホテルで極上の癒やしを。24時間受付中
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '640px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            韓国の電話番号は不要です。WhatsAppまたは国際直通電話から日本語で安心してお問い合わせいただけます。
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}>
              💬 WhatsApp: +82 10-6607-2239
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e293b', border: '1px solid #d4af37', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              📞 国際電話: {PHONE_DISPLAY}
            </a>
          </div>
        </section>""",
    jp
)

# Bottom bar
jp = re.sub(
    r'\{\/\* Fixed Bottom Bar for Mobile\/Tablet \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*;\s*\}',
    """{/* Fixed Bottom Bar for Mobile/Tablet */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', borderTop: '1.5px solid rgba(212, 175, 55, 0.4)', padding: '10px 16px', zIndex: 50, boxShadow: '0 -6px 25px rgba(0,0,0,0.18)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(37,211,102,0.35)' }}>
            💬 WhatsApp 24時間予約
          </a>
          <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '14.5px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37' }}>
            📞 今すぐお電話
          </a>
        </div>
      </div>
    </div>
  );
}""",
    jp
)

with open('src/app/jp/page.tsx', 'w', encoding='utf-8') as f:
    f.write(jp)
print("jp/page.tsx fully cleaned")


# 3. Clean cn/page.tsx
with open('src/app/cn/page.tsx', 'r', encoding='utf-8') as f:
    cn = f.read()

cn = re.sub(r"const WECHAT_ID = [^;]+;\s*", "", cn)
cn = re.sub(r"const LINE_LINK = [^;]+;\s*", "", cn)
cn = re.sub(r"const TELEGRAM_LINK = [^;]+;\s*", "", cn)

# Header contact buttons
cn = re.sub(
    r'\{\/\* (?:WeChat & WhatsApp|Quick Contact Buttons) \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/header>',
    """{/* Quick Contact Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#25D366', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.35)' }}>
              💬 WhatsApp
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 800, color: '#090d16', backgroundColor: '#f3e5ab', border: '1px solid #d4af37', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none' }}>
              📞 电话咨询
            </a>
          </div>
        </div>
      </header>""",
    cn
)

# Hero actions
cn = re.sub(
    r'\{\/\* Action Buttons \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*\{\/\* Right Photo Card',
    """{/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.45)' }}>
                  💬 WhatsApp 立即预约 (24小时中文对应)
                </a>
                <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 24px', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}>
                  📞 电话: {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Right Photo Card""",
    cn
)

# Bottom section
cn = re.sub(
    r'\{\/\* Global Messenger Floating Card \*\/\}[\s\S]*?<\/section>',
    """{/* Global Messenger Floating Card */}
        <section style={{ backgroundColor: '#090d16', borderRadius: '20px', border: '1.5px solid #d4af37', padding: '36px 28px', color: '#ffffff', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 950, color: '#f3e5ab', margin: '0 0 10px' }}>
            今夜在首尔酒店尽享私人专属SPA・24小时竭诚为您服务
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '640px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            无需韩国本地手机号，直接通过WhatsApp或国际直通电话与我们联系，中文客服全天候贴心响应。
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}>
              💬 WhatsApp: +82 10-6607-2239
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e293b', border: '1px solid #d4af37', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              📞 国际电话: {PHONE_DISPLAY}
            </a>
          </div>
        </section>""",
    cn
)

# Bottom bar
cn = re.sub(
    r'\{\/\* Fixed Bottom Bar for Mobile\/Tablet \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*;\s*\}',
    """{/* Fixed Bottom Bar for Mobile/Tablet */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', borderTop: '1.5px solid rgba(212, 175, 55, 0.4)', padding: '10px 16px', zIndex: 50, boxShadow: '0 -6px 25px rgba(0,0,0,0.18)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(37,211,102,0.35)' }}>
            💬 WhatsApp 24小时咨询
          </a>
          <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '14.5px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37' }}>
            📞 直接致电
          </a>
        </div>
      </div>
    </div>
  );
}""",
    cn
)

with open('src/app/cn/page.tsx', 'w', encoding='utf-8') as f:
    f.write(cn)
print("cn/page.tsx fully cleaned")
