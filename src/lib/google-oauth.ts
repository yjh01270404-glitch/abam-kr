// 아름다운밤 (abam.kr) Google OAuth 1초 간편 로그인 유틸리티
export function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (clientId && clientSecret) {
    return { clientId, clientSecret };
  }
  return null;
}

export function buildGoogleAuthorizeUrl(state: string) {
  const creds = getGoogleCredentials();
  const clientId = creds ? creds.clientId : (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '');
  const redirectUri = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback`
    : 'https://abam.kr/api/auth/google/callback';

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state: state,
    prompt: 'select_account',
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}
