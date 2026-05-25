import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { extractWikiLinksFromText } from '@/lib/wikiExtract'
import { fromSlug, examIdFromFile, type WikiEntryRef } from '@/lib/wikiRoutes'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import { useExamProgress, type ExamProgressRow } from '@/contexts/ExamProgressContext'
import { useAuth } from '@/hooks/useAuth'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import type { ItemStatus } from '@/data/tracks'

const STATUS_CYCLE: Record<ItemStatus, ItemStatus> = {
  not_started: 'in_progress',
  in_progress: 'completed',
  completed: 'not_started',
}

const STATUS_TITLE: Record<ItemStatus, string> = {
  not_started: 'Not started — click to mark as In Progress',
  in_progress: 'In Progress — click to mark as Passed',
  completed: 'Passed — click to reset',
}

function ExamStatusIcon({ status }: { status: ItemStatus }) {
  if (status === 'completed') {
    return (
      <svg className="h-7 w-7 text-green-500" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" fill="currentColor" opacity=".2" />
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
        <polyline points="6.5 10.5 9 13 14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (status === 'in_progress') {
    return (
      <svg className="h-7 w-7 text-amber-500" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 2a8 8 0 0 1 0 16" fill="currentColor" opacity=".45" />
      </svg>
    )
  }
  return (
    <svg className="h-7 w-7 text-muted-foreground/50" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 1.5" />
      <line x1="10" y1="7" x2="10" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ExamStatusBadge({ progressKey }: { progressKey: string }) {
  const { user } = useAuth()
  const { progress, examRows, saveExamRows } = useExamProgress()
  const currentStatus = ((progress[progressKey] as ItemStatus) ?? 'not_started')

  const handleClick = async () => {
    if (!user) return
    const nextStatus = STATUS_CYCLE[currentStatus]
    const existing = examRows.find((r: ExamProgressRow) => r.exam_id === progressKey)
    const updatedRow: ExamProgressRow = {
      exam_id: progressKey,
      status: nextStatus,
      target_date: existing?.target_date ?? null,
    }
    await saveExamRows([...examRows.filter((r: ExamProgressRow) => r.exam_id !== progressKey), updatedRow])
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      title={user ? STATUS_TITLE[currentStatus] : 'Sign in to track progress'}
      aria-label={user ? STATUS_TITLE[currentStatus] : 'Sign in to track progress'}
      className="inline-flex items-center justify-center shrink-0 rounded-full transition-opacity opacity-70 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring not-prose"
    >
      <ExamStatusIcon status={currentStatus} />
    </button>
  )
}

export default function WikiExam() {
  const { slug = '' } = useParams()
  const [searchParams] = useSearchParams()
  const conceptParam = searchParams.get('concept')
  const examFileName = fromSlug(slug)
  const { setPageRefs, setExamId } = useWikiPage()
  const openAt = useConceptPopup(s => s.openAt)
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const popupOpenedRef = useRef(false)

  const progressKey = useMemo(() => {
    const cleaned = examFileName
      .replace(/^Exam\s+/i, '')
      .replace(/\s*\([^)]*\)\s*$/, '')
      .trim()
    return wikiExamIdToProgressKey(cleaned)
  }, [examFileName])

  const titleBadge = useMemo(() => <ExamStatusBadge progressKey={progressKey} />, [progressKey])

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setContent(null)
    fetchWikiFile(`${examFileName}.md`)
      .then(raw => {
        if (cancelled) return
        setContent(raw)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [examFileName])

  const pageRefs = useMemo(
    () => (content ? extractWikiLinksFromText(content) : []),
    [content],
  )

  useEffect(() => {
    setExamId(examIdFromFile(examFileName))
    setPageRefs(pageRefs)
  }, [pageRefs, examFileName, setExamId, setPageRefs])

  const onWikiLink = useCallback((ref: WikiEntryRef, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ref.kind !== 'concept') return false
    if (/ \([^)]*\d{4}\)$/.test(ref.name)) {
      e.preventDefault()
      openAt([{ kind: 'resource', name: ref.name }], 0, undefined)
      return true
    }
    e.preventDefault()
    const conceptList = pageRefs
      .filter(r => r.kind === 'concept')
      .filter(r => !/ \([^)]*\d{4}\)$/.test(r.name))
    const idx = conceptList.findIndex(r => r.name.toLowerCase() === ref.name.toLowerCase())
    openAt(
      conceptList.length > 0 ? conceptList : [ref],
      idx >= 0 ? idx : 0,
      `${examFileName}.md`,
    )
    return true
  }, [pageRefs, examFileName, openAt])

  // Reset the opened flag whenever the exam or the requested concept changes.
  useEffect(() => {
    popupOpenedRef.current = false
  }, [examFileName, conceptParam])

  // When arriving from search with ?concept=, open the popup once pageRefs load.
  useEffect(() => {
    if (!conceptParam || pageRefs.length === 0 || popupOpenedRef.current) return
    popupOpenedRef.current = true
    const conceptList = pageRefs
      .filter(r => r.kind === 'concept')
      .filter(r => !/ \([^)]*\d{4}\)$/.test(r.name))
    const idx = conceptList.findIndex(
      r => r.name.toLowerCase() === conceptParam.toLowerCase(),
    )
    const openList = idx >= 0 ? conceptList : [{ kind: 'concept' as const, name: conceptParam }]
    openAt(openList, idx >= 0 ? idx : 0, `${examFileName}.md`)
  }, [conceptParam, pageRefs, examFileName, openAt])

  return (
    <div className="space-y-4">
      <Link to="/wiki" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> All exams
      </Link>

      {status === 'loading' && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading {examFileName}…
        </div>
      )}
      {status === 'error' && (
        <p className="text-sm text-muted-foreground">Couldn't load {examFileName}.</p>
      )}

      {content !== null && (
        <WikiArticle
          markdown={content}
          sourcePath={`${examFileName}.md`}
          onWikiLink={onWikiLink}
          titleBadge={titleBadge}
        />
      )}
    </div>
  )
}
