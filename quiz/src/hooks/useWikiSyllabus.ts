// The exam syllabi, parsed from the `Exam *.md` pages.
//
// Read from the build-time bundle (`virtual:exam-pages`) rather than fetched.
// These pages decide which exams exist — the Dashboard's exam tabs, the
// Sidebar, the quiz builder's exam cards, Flashcards — and they used to come
// from GitHub's Contents API at runtime. That made the whole app depend on a
// third-party API being reachable *and* under its rate limit (60 requests/hour
// per IP when no `VITE_GITHUB_TOKEN` is configured). When the call failed, the
// list came back empty and stayed empty for the session: a new account could
// add an exam, save it, and watch the dashboard keep saying it had none. The
// markdown is ~80 KB, so bundling it removes the failure mode outright.
//
// The network path is kept only as a fallback for a build whose bundle came out
// empty, and `error` is still reported so a caller can say so rather than
// render a silent empty state.

import { useState, useEffect } from 'react'
import examPages from 'virtual:exam-pages'
import { listRepoContents, fetchWikiFile } from '@/lib/github'
import { parseExamMetadata, parseExamSyllabus, type WikiExamSyllabus } from '@/lib/wikiParser'

function parseExamPage(fileName: string, content: string): WikiExamSyllabus | null {
  const meta = parseExamMetadata(content)
  if (!meta) return null
  const bare = fileName.replace(/\.md$/i, '')
  return parseExamSyllabus(content, meta.examId, meta.examLabel, meta.examTopic, bare)
}

// Parsed once per session — the bundle never changes while the app is running.
let bundledSyllabi: WikiExamSyllabus[] | null = null

function readBundledSyllabi(): WikiExamSyllabus[] {
  if (bundledSyllabi) return bundledSyllabi
  const out: WikiExamSyllabus[] = []
  for (const [name, content] of Object.entries(examPages)) {
    try {
      const parsed = parseExamPage(name, content)
      if (parsed) out.push(parsed)
    } catch {
      // A malformed page shouldn't take the other exams down with it.
    }
  }
  bundledSyllabi = out
  return out
}

// Fallback for a build that shipped no exam pages: scan the repo for them the
// old way. Files that can't be fetched or lack the expected metadata are skipped.
async function fetchAllExamSyllabi(): Promise<WikiExamSyllabus[]> {
  const rootItems = await listRepoContents()
  const examFiles = rootItems.filter(
    item => item.type === 'file' && item.name.startsWith('Exam') && item.name.endsWith('.md'),
  )

  const results = await Promise.allSettled(
    examFiles.map(async item => {
      const parsed = parseExamPage(item.name, await fetchWikiFile(item.name))
      if (!parsed) throw new Error(`No exam metadata in ${item.name}`)
      return parsed
    }),
  )

  return results
    .filter((r): r is PromiseFulfilledResult<WikiExamSyllabus> => r.status === 'fulfilled')
    .map(r => r.value)
}

export function useWikiSyllabus() {
  const [syllabi, setSyllabi] = useState<WikiExamSyllabus[]>(readBundledSyllabi)
  const [loading, setLoading] = useState(() => readBundledSyllabi().length === 0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (syllabi.length > 0) return

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchAllExamSyllabi()
      .then(parsed => {
        if (cancelled) return
        setSyllabi(parsed)
        if (parsed.length === 0) setError('No exam syllabus pages could be loaded.')
      })
      .catch(err => { if (!cancelled) setError((err as Error).message) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  // Runs once: the bundle is static, so `syllabi` only goes from empty to full.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { syllabi, loading, error }
}
