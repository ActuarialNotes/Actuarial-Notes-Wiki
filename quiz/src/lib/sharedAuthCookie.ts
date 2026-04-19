// Shared refresh-token cookie used for cross-subdomain SSO between the wiki
// (wiki.actuarialnotes.com) and the quiz app (quiz.actuarialnotes.com). The
// wiki's publish.js maintains the same cookie with the same attributes.

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
