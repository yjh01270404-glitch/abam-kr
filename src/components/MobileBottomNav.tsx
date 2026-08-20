'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Mail, HelpCircle, Download } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname?.startsWith('/abam-nightman-2026')) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60px',
      background: 'rgba(15, 23, 42, 0.96)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid rgba(255,255,255,0.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 9999,
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.4)',
      fontFamily: '"Noto Sans KR", sans-serif',
    }} className="mobile-only-bottom-nav">
      <Link href="/" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: isActive('/') ? '#f43f5e' : '#cbd5e1',
        textDecoration: 'none',
        fontSize: '11px',
        fontWeight: isActive('/') ? '900' : '700',
        gap: '3px',
        flex: 1,
      }}>
        <Home size={20} />
        <span>홈</span>
      </Link>

      <Link href="/jobs" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: isActive('/jobs') ? '#f43f5e' : '#cbd5e1',
        textDecoration: 'none',
        fontSize: '11px',
        fontWeight: isActive('/jobs') ? '900' : '700',
        gap: '3px',
        flex: 1,
      }}>
        <Briefcase size={20} />
        <span>채용정보</span>
      </Link>

      <Link href="/messages" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: isActive('/messages') ? '#f43f5e' : '#fda4af',
        textDecoration: 'none',
        fontSize: '11px',
        fontWeight: '900',
        gap: '3px',
        flex: 1,
        position: 'relative'
      }}>
        <div style={{ position: 'relative' }}>
          <Mail size={20} />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-4px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#f43f5e',
            boxShadow: '0 0 10px #f43f5e'
          }} />
        </div>
        <span>1:1 쪽지함</span>
      </Link>

      <Link href="/support" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: isActive('/support') ? '#f43f5e' : '#cbd5e1',
        textDecoration: 'none',
        fontSize: '11px',
        fontWeight: isActive('/support') ? '900' : '700',
        gap: '3px',
        flex: 1,
      }}>
        <HelpCircle size={20} />
        <span>고객센터</span>
      </Link>
    </nav>
  );
}
