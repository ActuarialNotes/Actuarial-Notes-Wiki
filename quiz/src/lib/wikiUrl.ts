const WIKI_BASE = 'https://wiki.actuarialnotes.com'

export function buildWikiUrl(path: string): string {
  const normalized = path ? (path.startsWith('/') ? path : '/' + path) : ''
  return WIKI_BASE + normalized
}
