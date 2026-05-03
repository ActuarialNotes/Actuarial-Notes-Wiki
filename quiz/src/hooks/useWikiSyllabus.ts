import { useState, useEffect } from 'react'
import { listRepoContents, fetchWikiFile } from '@/lib/github'
import { parseExamMetadata, parseExamSyllabus, type WikiExamSyllabus } from '@/lib/wikiParser'

const CACHE_KEY = 'actuarial_wiki_syllabus_v4'
const CACHE_TTL_MS = 6 * 60 * 60 * 1000  // 6 hours

interface CacheEntry {
  data: WikiExamSyllabus[]
  expiresAt: number
}

function readCache(): WikiExamSyllabus[] | null {
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

function writeCache(data: WikiExamSyllabus[]): void {
  const entry: CacheEntry = { data, expiresAt: Date.now() + CACHE_TTL_MS }
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    // ignore quota errors
  }
}

// Scan the repo root for Exam*.md files, fetch and parse each one.
// Files that can't be fetched or lack the expected metadata are silently skipped.
async function fetchAllExamSyllabi(): Promise<WikiExamSyllabus[]> {
  const rootItems = await listRepoContents()
  const examFiles = rootItems.filter(
    item => item.type === 'file' && item.name.startsWith('Exam') && item.name.endsWith('.md'),
  )

  const results = await Promise.allSettled(
    examFiles.map(async item => {
      const content = await fetchWikiFile(item.name)
      const meta = parseExamMetadata(content)
      if (!meta) throw new Error(`No exam metadata in ${item.name}`)
      const fileName = item.name.replace(/\.md$/i, '')
      return parseExamSyllabus(content, meta.examId, meta.examLabel, meta.examTopic, fileName)
    }),
  )

  return results
    .filter((r): r is PromiseFulfilledResult<WikiExamSyllabus> => r.status === 'fulfilled')
    .map(r => r.value)
}

export function useWikiSyllabus() {
  const [syllabi, setSyllabi] = useState<WikiExamSyllabus[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cached = readCache()
    if (cached) {
      setSyllabi(cached)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    fetchAllExamSyllabi()
      .then(parsed => {
        // Only cache when we got real results — caching [] would block
        // retries for 6 hours since [] is truthy and returned immediately.
        if (parsed.length > 0) writeCache(parsed)
        setSyllabi(parsed)
      })
      .catch(err => setError((err as Error).message))
      .finally(() => setLoading(false))
  }, [])

  return { syllabi, loading, error }
}
