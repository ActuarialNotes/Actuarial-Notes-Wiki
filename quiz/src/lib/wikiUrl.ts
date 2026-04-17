const WIKI_BASE = 'https://wiki.actuarialnotes.com'

export function buildWikiUrl(path: string, accessToken?: string | null, refreshToken?: string | null): string {
  const normalized = path ? (path.startsWith('/') ? path : '/' + path) : ''
  const base = WIKI_BASE + normalized
  if (accessToken && refreshToken) {
    return `${base}#access_token=${encodeURIComponent(accessToken)}&refresh_token=${encodeURIComponent(refreshToken)}&token_type=bearer`
  }
  return base
}
