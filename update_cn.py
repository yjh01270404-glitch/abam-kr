import re

# Update cn/page.tsx
cn_path = 'src/app/cn/page.tsx'
with open(cn_path, 'r', encoding='utf-8') as f:
    cn_content = f.read()

# Replace metadata
cn_content = re.sub(
    r'微信号咨询',
    'WhatsApp咨询',
    cn_content
)
cn_content = re.sub(
    r'支持微信咨询、',
    '支持WhatsApp咨询、',
    cn_content
)
cn_content = re.sub(
    r'添加微信客服即刻安排。',
    '添加WhatsApp客服即刻安排。',
    cn_content
)

# Remove unused consts
cn_content = re.sub(
    r"const WECHAT_ID = 'Abam1004';\s*",
    "",
    cn_content
)
cn_content = re.sub(
    r"const LINE_LINK = 'https://line\.me/ti/p/~abam1004';\s*",
    "",
    cn_content
)
cn_content = re.sub(
    r"const TELEGRAM_LINK = 'https://t\.me/abam1004';\s*",
    "",
    cn_content
)

# Header contact buttons
header_old_cn = """          {/* Quick Contact Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 900, color: '#ffffff', backgroundColor: '#07C160', padding: '7px 12px', borderRadius: '6px' }}>
              微信: {WECHAT_ID}
            </div>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 900, color: '#ffffff', backgroundColor: '#25D366', padding: '7px 12px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.35)' }}>
              WhatsApp
            </a>
          </div>"""

header_new_cn = """          {/* Quick Contact Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 900, color: '#ffffff', backgroundColor: '#25D366', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.35)' }}>
              💬 WhatsApp
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 800, color: '#090d16', backgroundColor: '#f3e5ab', border: '1px solid #d4af37', padding: '8px 14px', borderRadius: '6px', textDecoration: 'none' }}>
              📞 电话咨询
            </a>
          </div>"""

cn_content = cn_content.replace(header_old_cn, header_new_cn)

# Hero actions
hero_old_cn = """              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '14.5px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}>
                  WhatsApp 立即预约 (推荐)
                </a>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#07C160', color: '#ffffff', fontWeight: 900, fontSize: '14.5px', padding: '12px 22px', borderRadius: '8px' }}>
                  微信: {WECHAT_ID}
                </div>
                <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 800, fontSize: '14.5px', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', border: '1px solid #d4af37' }}>
                  电话: {PHONE_DISPLAY}
                </a>
              </div>"""

hero_new_cn = """              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.45)' }}>
                  💬 WhatsApp 立即预约 (24小时中文对应)
                </a>
                <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 24px', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}>
                  📞 电话: {PHONE_DISPLAY}
                </a>
              </div>"""

cn_content = cn_content.replace(hero_old_cn, hero_new_cn)

# Bottom section
sec_old_cn = """          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}>
              WhatsApp: +82 10-6607-2239
            </a>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#07C160', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '12px 24px', borderRadius: '8px' }}>
              微信号: {WECHAT_ID}
            </div>
            <a href={LINE_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#06C755', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}>
              LINE: abam1004
            </a>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#229ED9', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}>
              Telegram: @abam1004
            </a>
          </div>"""

sec_new_cn = """          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}>
              💬 WhatsApp: +82 10-6607-2239
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e293b', border: '1px solid #d4af37', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              📞 国际电话: {PHONE_DISPLAY}
            </a>
          </div>"""

cn_content = cn_content.replace(sec_old_cn, sec_new_cn)

# Fixed bar
bar_old_cn = """        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ flex: 1.3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '14px', padding: '13px 0', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(37,211,102,0.35)' }}>
            WhatsApp 咨询
          </a>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#07C160', color: '#ffffff', fontWeight: 900, fontSize: '13.5px', padding: '13px 0', borderRadius: '8px' }}>
            微信: {WECHAT_ID}
          </div>
          <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 800, fontSize: '14px', padding: '13px 0', borderRadius: '8px', textDecoration: 'none', border: '1px solid #d4af37' }}>
            直接致电
          </a>
        </div>"""

bar_new_cn = """        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 2px 10px rgba(37,211,102,0.35)' }}>
            💬 WhatsApp 24小时咨询
          </a>
          <a href={PHONE_TEL} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#090d16', color: '#f3e5ab', fontWeight: 900, fontSize: '14.5px', padding: '14px 0', borderRadius: '10px', textDecoration: 'none', border: '1px solid #d4af37' }}>
            📞 直接致电
          </a>
        </div>"""

cn_content = cn_content.replace(bar_old_cn, bar_new_cn)

with open(cn_path, 'w', encoding='utf-8') as f:
    f.write(cn_content)

print("Updated cn/page.tsx successfully!")
