// Builds a single index of everything the wiki search panel knows about:
// exams (Exam*.md at repo root), concepts (/Concepts), and resources
// (/Resources/Books). Cached in localStorage for 6h, matching the TTL
// used by useWikiSyllabus.

import fm from 'front-matter'
import { listRepoContents, fetchWikiFile } from '@/lib/github'

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
}

const CACHE_KEY = 'actuarial_wiki_index_v1'
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

export async function buildWikiIndex(): Promise<WikiIndexItem[]> {
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
      let fm: Record<string, string> = {}
      try {
        const raw = await fetchWikiFile(it.path)
        fm = parseFrontmatter(raw)
      } catch {
        /* ignore — keep item with filename-derived display */
      }
      const yearNum = fm['Year'] ? parseInt(fm['Year'], 10) : undefined
      const item: WikiIndexItem = {
        category: 'document',
        name: stripExt(it.name),
        path: it.path,
        author: fm['Author'] || undefined,
        year: Number.isFinite(yearNum) ? yearNum : undefined,
        title: fm['Title'] || undefined,
      }
      return item
    })
  items.push(...(await Promise.all(bookMetaPromises)))

  writeCache(items)
  return items
}

export function clearWikiIndexCache(): void {
  localStorage.removeItem(CACHE_KEY)
}
