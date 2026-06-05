// Builds a single index of everything the wiki search panel knows about:
// exams (Exam*.md at repo root), concepts (/Concepts), and resources
// (/Resources/Books). Cached in localStorage for 6h, matching the TTL
// used by useWikiSyllabus.

import fm from 'front-matter'
import { listRepoContents, fetchWikiFile, rawGithubUrl } from '@/lib/github'

export type WikiIndexCategory = 'exam' | 'concept' | 'document'

export interface WikiIndexItem {
  category: WikiIndexCategory
  name: string          // display name ("Expected Value", "Exam P-1 (SOA)")
  path: string          // repo path ("Concepts/Expected Value.md")
  // Optional metadata, pulled from YAML frontmatter on resource files.
  topic?: string        // exam id the item belongs to (for filtering)
  author?: string
  year?: number
  title?: string        // resource display title (overrides name)
  questionCount?: number // number of questions whose wiki_link points here
  coverImage?: string   // full GitHub raw URL to cover image
  edition?: string
  publisher?: string
}

const CACHE_KEY = 'actuarial_wiki_index_v3'
const CACHE_TTL_MS = 6 * 60 * 60 * 1000

interface CacheEntry {
  data: WikiIndexItem[]
  expiresAt: number
}

function readCache(): WikiIndexItem[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry: CacheEntry = JSON.parse(raw)
    if (Date.now() > entry.expiresAt) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }
    return entry.data
  } catch {
    return null
  }
}

function writeCache(data: WikiIndexItem[]): void {
  const entry: CacheEntry = { data, expiresAt: Date.now() + CACHE_TTL_MS }
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    /* quota exceeded — skip */
  }
}

function stripExt(name: string): string {
  return name.replace(/\.md$/i, '')
}

const IMAGE_EXT_RE = /\.(png|jpe?g|gif|svg|webp|avif)$/i

function extractCoverImageUrl(content: string): string | undefined {
  const m = /!\[\[([^\]]+)\]\]/.exec(content)
  if (!m) return undefined
  const imagePath = m[1].trim()
  if (!IMAGE_EXT_RE.test(imagePath)) return undefined
  // Short filenames (no directory) live under Media/Attachments/ by convention
  const resolved = imagePath.includes('/') ? imagePath : `Media/Attachments/${imagePath}`
  return rawGithubUrl(resolved)
}

function parseFrontmatter(raw: string): Record<string, string> {
  // Delegates to front-matter (already a dep) so quoted values, escaped quotes,
  // and YAML edge cases are handled correctly. Coerces to string for callers.
  try {
    const attrs = fm<Record<string, unknown>>(raw).attributes ?? {}
    const out: Record<string, string> = {}
    for (const [k, v] of Object.entries(attrs)) {
      if (v != null) out[k] = String(v)
    }
    return out
  } catch {
    return {}
  }
}

let bundledIndex: WikiIndexItem[] | null = null
export function setWikiIndexBundle(items: WikiIndexItem[]): void { bundledIndex = items }

// Synchronous check against the bundled index. Returns true when the entry
// exists or when the index hasn't been loaded yet (fail-open so links aren't
// incorrectly styled as missing during hydration).
export function isInWikiIndex(kind: string, name: string): boolean {
  if (!bundledIndex) return true
  const expectedCategory = kind === 'resource' ? 'document' : kind
  const nameLower = name.toLowerCase()
  return bundledIndex.some(
    item => item.category === expectedCategory && item.name.toLowerCase() === nameLower
  )
}

export async function buildWikiIndex(): Promise<WikiIndexItem[]> {
  if (bundledIndex) return bundledIndex
  const cached = readCache()
  if (cached) return cached

  const items: WikiIndexItem[] = []

  // Repo root — grab exam files.
  const rootItems = await listRepoContents().catch(() => [])
  for (const it of rootItems) {
    if (it.type !== 'file' || !it.name.endsWith('.md')) continue
    if (!/^Exam\b/i.test(it.name)) continue
    const bare = stripExt(it.name)
    items.push({ category: 'exam', name: bare, path: it.path })
  }

  // Concepts directory.
  const conceptItems = await listRepoContents('Concepts').catch(() => [])
  for (const it of conceptItems) {
    if (it.type !== 'file' || !it.name.endsWith('.md')) continue
    items.push({ category: 'concept', name: stripExt(it.name), path: it.path })
  }

  // Resources — only Books for now; other subdirs would be added here.
  const bookItems = await listRepoContents('Resources/Books').catch(() => [])
  const bookMetaPromises = bookItems
    .filter(it => it.type === 'file' && it.name.endsWith('.md'))
    .map(async it => {
      let fmData: Record<string, string> = {}
      let coverImage: string | undefined
      try {
        const raw = await fetchWikiFile(it.path)
        fmData = parseFrontmatter(raw)
        coverImage = extractCoverImageUrl(raw)
      } catch {
        /* ignore — keep item with filename-derived display */
      }
      const yearNum = fmData['Year'] ? parseInt(fmData['Year'], 10) : undefined
      const item: WikiIndexItem = {
        category: 'document',
        name: stripExt(it.name),
        path: it.path,
        author: fmData['Authors'] || fmData['Author'] || undefined,
        year: Number.isFinite(yearNum) ? yearNum : undefined,
        title: fmData['Title'] || undefined,
        edition: fmData['Edition'] || undefined,
        publisher: fmData['Publisher'] || undefined,
        coverImage,
      }
      return item
    })
  items.push(...(await Promise.all(bookMetaPromises)))

  // Only cache when we got real data — an empty array means all API calls
  // failed (rate limit, network error) and caching it would block retries
  // for 6 hours since [] is truthy and would be returned immediately.
  if (items.length > 0) writeCache(items)
  return items
}

export function clearWikiIndexCache(): void {
  localStorage.removeItem(CACHE_KEY)
  localStorage.removeItem('actuarial_wiki_index_v2')
  localStorage.removeItem('actuarial_wiki_index_v1')
}
