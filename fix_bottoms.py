import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Any lingering LINE_LINK or TELEGRAM_LINK or WECHAT_ID declarations
    content = re.sub(r'const\s+(?:WECHAT_ID|LINE_LINK|TELEGRAM_LINK)\s*=[^;]+;\s*', '', content)

    # 2. Replace any remaining LINE_LINK in links
    content = content.replace('href={LINE_LINK}', 'href={WHATSAPP_LINK}')
    content = content.replace('href={TELEGRAM_LINK}', 'href={WHATSAPP_LINK}')

    # 3. Fix course cards buttons if they had LINE
    content = content.replace('LINEでこのコースを予約する', 'WhatsAppで今すぐ予約')
    content = content.replace('LINE咨询', 'WhatsApp咨询')

    # 4. Global messengers section regex replacement
    global_sec_regex = r'\{\/\* Global Messengers?.*?\*\/\}[\s\S]*?<\/section>'
    
    if '/cn/' in filepath.replace('\\', '/'):
        new_sec = """{/* Global Messengers */}
        <section style={{ backgroundColor: '#090d16', borderRadius: '20px', border: '1.5px solid #d4af37', padding: '36px 28px', color: '#ffffff', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 950, color: '#f3e5ab', margin: '0 0 10px' }}>
            今夜在首尔，让温暖与极上香薰伴您入眠
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '640px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            无需韩国手机号码，通过 WhatsApp 发送您的“酒店名称、房间号与心仪套餐”，即可极速安排专车送达。
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}>
              💬 WhatsApp: +82 10-6607-2239
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e293b', border: '1px solid #d4af37', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              📞 国际电话: {PHONE_DISPLAY}
            </a>
          </div>
        </section>"""
        
        new_bar = """{/* Fixed Bottom Bar */}
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
}"""

    elif '/jp/' in filepath.replace('\\', '/'):
        new_sec = """{/* Global Messengers */}
        <section style={{ backgroundColor: '#090d16', borderRadius: '20px', border: '1.5px solid #d4af37', padding: '36px 28px', color: '#ffffff', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 950, color: '#f3e5ab', margin: '0 0 10px' }}>
            今夜の旅の疲れを、極上のプライベートマッサージで癒やしませんか？
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '640px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            韓国の電話番号は不要です。WhatsAppで「ホテル名・部屋番号・ご希望のコース」をお送りいただくだけで、すぐにお伺いします。
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', color: '#ffffff', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}>
              💬 WhatsApp: +82 10-6607-2239
            </a>
            <a href={PHONE_TEL} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e293b', border: '1px solid #d4af37', color: '#f3e5ab', fontWeight: 900, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none' }}>
              📞 国際電話: {PHONE_DISPLAY}
            </a>
          </div>
        </section>"""
        
        new_bar = """{/* Fixed Bottom Bar */}
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
}"""
    else:
        new_sec = None
        new_bar = None

    if new_sec:
        content = re.sub(global_sec_regex, new_sec, content)
    if new_bar:
        content = re.sub(r'\{\/\* Fixed Bottom Bar.*?\*\/\}[\s\S]*?;\s*\}', new_bar, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {filepath}")

fix_file('src/app/cn/page.tsx')
fix_file('src/app/jp/page.tsx')
