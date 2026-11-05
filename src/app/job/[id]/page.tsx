import { permanentRedirect } from 'next/navigation';

export async function generateStaticParams() {
  return [];
}

export default function LegacyJobPage() {
  permanentRedirect('/');
}
