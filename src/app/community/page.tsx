import { permanentRedirect } from 'next/navigation';

export default function LegacyRedirectPage() {
  permanentRedirect('/');
}
