// Shared refresh-token cookie for cross-subdomain SSO between wiki.actuarialnotes.com
// and quiz.actuarialnotes.com. publish.js on the wiki mirrors this cookie.
//
// HttpOnly is intentionally NOT set: publish.js is a static client-side bundle with
// no server proxy, so it must read the cookie via document.cookie to hydrate the
// Supabase session. The trade-off is XSS exposure of the refresh token; mitigate by
// keeping the wiki's Content-Security-Policy tight and auditing third-party scripts.

const COOKIE_NAME = 'an_auth_rt'

function domainAttr(): string {
  if (typeof location === 'undefined') return ''
  return /(^|\.)actuarialnotes\.com$/i.test(location.hostname)
    ? '; Domain=.actuarialnotes.com'
    : ''
}

export function writeSharedCookie(refreshToken: string | null | undefined): void {
  if (!refreshToken) return
  try {
    document.cookie =
      `${COOKIE_NAME}=${encodeURIComponent(refreshToken)}` +
      `${domainAttr()}; Path=/; Max-Age=2592000; Secure; SameSite=Lax`
  } catch {
    // ignore
  }
}

export function clearSharedCookie(): void {
  try {
    document.cookie =
      `${COOKIE_NAME}=${domainAttr()}; Path=/; Max-Age=0; Secure; SameSite=Lax`
  } catch {
    // ignore
  }
}

export function readSharedCookie(): string | null {
  try {
    if (typeof document === 'undefined' || !document.cookie) return null
    for (const part of document.cookie.split(';')) {
      const [rawName, ...rest] = part.trim().split('=')
      if (rawName === COOKIE_NAME && rest.length > 0) {
        const value = decodeURIComponent(rest.join('='))
        return value || null
      }
    }
  } catch {
    // ignore
  }
  return null
}
