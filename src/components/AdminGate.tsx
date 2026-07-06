'use client';

import { usePathname } from 'next/navigation';
import LegalWarning from './LegalWarning';
import AgeGateway from './AgeGateway';
import Footer from './Footer';

const ADMIN_PATH = '/abam-nightman-2026';

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith(ADMIN_PATH);

  // 관리자 페이지 — AgeGateway, LegalWarning, Footer 없이 직접 렌더
  if (isAdmin) {
    return <>{children}</>;
  }

  // 일반 페이지 — 법적경고 + 로그인 게이트 + 푸터
  return (
    <>
      <LegalWarning />
      <AgeGateway>
        <div className="container">
          {children}
          <Footer />
        </div>
      </AgeGateway>
    </>
  );
}
