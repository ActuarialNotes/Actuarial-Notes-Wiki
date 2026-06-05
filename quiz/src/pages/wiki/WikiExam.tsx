import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams, Link, useSearchParams, useNavigationType } from 'react-router-dom'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { extractWikiLinksFromText } from '@/lib/wikiExtract'
import { fromSlug, examIdFromFile, type WikiEntryRef } from '@/lib/wikiRoutes'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { useAuth } from '@/hooks/useAuth'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { loadStudyPlanConfig, todayISO } from '@/lib/studyPlan'
import { useExamsPopout } from '@/hooks/useExamsPopout'
import type { ItemStatus } from '@/data/tracks'

const STATUS_TITLE: Record<ItemStatus, string> = {
  not_started: 'Not started — click to update exam status',
  in_progress: 'In Progress — click to update exam status',
  completed: 'Passed — click to update exam status',
}

function ExamStatusIcon({ status, size = 'md' }: { status: ItemStatus; size?: 'sm' | 'md' }) {
  const cls = size === 'sm' ? 'h-5 w-5' : 'h-7 w-7'
  if (status === 'completed') {
    return (
      <svg className={`${cls} text-green-500`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" fill="currentColor" opacity=".2" />
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
        <polyline points="6.5 10.5 9 13 14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (status === 'in_progress') {
    return (
      <svg className={`${cls} text-amber-500`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 2a8 8 0 0 1 0 16" fill="currentColor" opacity=".45" />
      </svg>
    )
  }
  return (
    <svg className={`${cls} text-muted-foreground/50`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 1.5" />
      <line x1="10" y1="7" x2="10" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ExamStatusBadge({ progressKey, size = 'md' }: { progressKey: string; size?: 'sm' | 'md' }) {
  const { user } = useAuth()
  const { progress } = useExamProgress()
  const currentStatus = ((progress[progressKey] as ItemStatus) ?? 'not_started')
  const openExams = useExamsPopout(s => s.openExams)

  return (
    <button
      type="button"
      onClick={openExams}
      title={user ? STATUS_TITLE[currentStatus] : 'Sign in to track progress'}
      aria-label={user ? STATUS_TITLE[currentStatus] : 'Sign in to track progress'}
      className="inline-flex items-center justify-center shrink-0 rounded-full transition-opacity opacity-70 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring not-prose"
    >
      <ExamStatusIcon status={currentStatus} size={size} />
    </button>
  )
}

function ExamDaysPill({
  count,
  explanation,
  className,
  size = 'md',
}: {
  count: number
  explanation: string
  className?: string
  size?: 'sm' | 'md'
}) {
  const [open, setOpen] = useState(false)
  const sizeCls = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs'
  return (
    <span className="relative inline-flex not-prose">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`inline-flex items-center justify-center rounded-full ${sizeCls} font-bold leading-none cursor-pointer select-none ${className ?? ''}`}
      >
        {count}
      </button>
      {open && (
        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 z-50 w-max max-w-52 rounded-lg bg-popover border text-popover-foreground shadow-md px-3 py-2 text-xs font-normal leading-snug whitespace-normal text-center">
          {explanation}
        </span>
      )}
    </span>
  )
}

export default function WikiExam() {
  const { slug = '' } = useParams()
  const [searchParams] = useSearchParams()
  const conceptParam = searchParams.get('concept')
  const examFileName = fromSlug(slug)
  const { setPageRefs, setExamId, setPageTitle, setPageTitleBadge, setIsInDevelopment, setIsBeta } = useWikiPage()
  const openAt = useConceptPopup(s => s.openAt)
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const popupOpenedRef = useRef(false)
  const navigationType = useNavigationType()

  // Scroll to top on forward navigation; don't override browser's own restoration on back/forward
  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])

  const progressKey = useMemo(() => {
    const cleaned = examFileName
      .replace(/^Exam\s+/i, '')
      .replace(/\s*\([^)]*\)\s*$/, '')
      .trim()
    return wikiExamIdToProgressKey(cleaned)
  }, [examFileName])

  const { examRows, progress } = useExamProgress()
  const examStatus = ((progress[progressKey] as ItemStatus) ?? 'not_started')

  const { daysToPrepare, daysUntilExam } = useMemo(() => {
    const row = examRows.find(r => r.exam_id === progressKey)
    const examDate = row?.target_date ?? null
    const targetReadyDate = row?.study_plan_config?.targetReadyDate
      ?? loadStudyPlanConfig(progressKey).targetReadyDate
    const now = new Date(); now.setHours(0, 0, 0, 0)
    const calcDays = (date: string | null) =>
      date ? Math.max(Math.ceil((new Date(date + 'T00:00:00').getTime() - now.getTime()) / 86400000), 0) : null
    return { daysToPrepare: calcDays(targetReadyDate), daysUntilExam: calcDays(examDate) }
  }, [examRows, progressKey])

  const titleBadge = useMemo(() => (
    <span className="inline-flex items-center gap-2 not-prose">
      <ExamStatusBadge progressKey={progressKey} />
      {examStatus !== 'completed' && daysToPrepare !== null && (
        <ExamDaysPill
          count={daysToPrepare}
          explanation={`${daysToPrepare} days to prepare until your target study-ready date`}
          className="bg-amber-400/20 text-amber-400"
        />
      )}
      {examStatus !== 'completed' && daysUntilExam !== null && (
        <ExamDaysPill
          count={daysUntilExam}
          explanation={`${daysUntilExam} days until your scheduled exam`}
          className="bg-muted text-foreground"
        />
      )}
    </span>
  ), [progressKey, examStatus, daysToPrepare, daysUntilExam])

  const smallTitleBadge = useMemo(() => (
    <span className="inline-flex items-center gap-1.5 not-prose shrink-0">
      <ExamStatusBadge progressKey={progressKey} size="sm" />
      {examStatus !== 'completed' && daysToPrepare !== null && (
        <ExamDaysPill
          count={daysToPrepare}
          explanation={`${daysToPrepare} days to prepare until your target study-ready date`}
          className="bg-amber-400/20 text-amber-400"
          size="sm"
        />
      )}
      {examStatus !== 'completed' && daysUntilExam !== null && (
        <ExamDaysPill
          count={daysUntilExam}
          explanation={`${daysUntilExam} days until your scheduled exam`}
          className="bg-muted text-foreground"
          size="sm"
        />
      )}
    </span>
  ), [progressKey, examStatus, daysToPrepare, daysUntilExam])

  const extractedTitle = useMemo(() => {
    if (!content) return null
    const withoutFm = content.replace(/^---\n[\s\S]*?\n---\n?/, '')
    const match = withoutFm.match(/^#\s+(.+)$/m)
    return match ? match[1].trim() : null
  }, [content])

  const isExamInDevelopment = progressKey !== 'P' && progressKey !== 'FM'
  const isExamBeta = progressKey === 'P' || progressKey === 'FM'

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

  const studyPlanRefs = useMemo(() => {
    const row = examRows.find(r => r.exam_id === progressKey)
    const cache = row?.study_plan_cache
    if (!cache || cache.generatedDate !== todayISO() || !cache.todaysConcepts?.length) return null
    const planSet = new Set(cache.todaysConcepts.map(n => n.toLowerCase()))
    const refs = pageRefs
      .filter(r => r.kind === 'concept' && !/ \([^)]*\d{4}\)$/.test(r.name))
      .filter(r => planSet.has(r.name.toLowerCase()))
    return refs.length > 0 ? refs : null
  }, [examRows, progressKey, pageRefs])

  const resourceRefs = useMemo(() => {
    const seen = new Set<string>()
    const refs: WikiEntryRef[] = []
    for (const r of pageRefs) {
      if (r.kind === 'resource' || (r.kind === 'concept' && / \([^)]*\d{4}\)$/.test(r.name))) {
        const key = r.name.toLowerCase()
        if (!seen.has(key)) {
          seen.add(key)
          refs.push({ kind: 'resource', name: r.name })
        }
      }
    }
    return refs.length > 0 ? refs : null
  }, [pageRefs])

  useEffect(() => {
    setExamId(examIdFromFile(examFileName))
    setPageRefs(pageRefs)
  }, [pageRefs, examFileName, setExamId, setPageRefs])

  useEffect(() => {
    setPageTitle(extractedTitle)
    setIsInDevelopment(isExamInDevelopment)
    setIsBeta(isExamBeta)
  }, [extractedTitle, isExamInDevelopment, isExamBeta, setPageTitle, setIsInDevelopment, setIsBeta])

  useEffect(() => {
    setPageTitleBadge(smallTitleBadge)
  }, [smallTitleBadge, setPageTitleBadge])

  const onWikiLink = useCallback((ref: WikiEntryRef, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ref.kind === 'exam') return false
    const conceptList = pageRefs
      .filter(r => r.kind === 'concept')
      .filter(r => !/ \([^)]*\d{4}\)$/.test(r.name))
    if (ref.kind === 'resource' || / \([^)]*\d{4}\)$/.test(ref.name)) {
      e.preventDefault()
      const resList = resourceRefs ?? [{ kind: 'resource' as const, name: ref.name }]
      const resIdx = resList.findIndex(r => r.name.toLowerCase() === ref.name.toLowerCase())
      openAt(resList, resIdx >= 0 ? resIdx : 0, `${examFileName}.md`, studyPlanRefs, resourceRefs, { initialFilter: 'source-material', fullList: conceptList })
      return true
    }
    if (ref.kind !== 'concept') return false
    e.preventDefault()
    const idx = conceptList.findIndex(r => r.name.toLowerCase() === ref.name.toLowerCase())
    openAt(
      conceptList.length > 0 ? conceptList : [ref],
      idx >= 0 ? idx : 0,
      `${examFileName}.md`,
      studyPlanRefs,
      resourceRefs,
    )
    return true
  }, [pageRefs, examFileName, openAt, studyPlanRefs, resourceRefs])

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
    openAt(openList, idx >= 0 ? idx : 0, `${examFileName}.md`, studyPlanRefs, resourceRefs)
  }, [conceptParam, pageRefs, examFileName, openAt, studyPlanRefs, resourceRefs])

  return (
    <div className="space-y-4">
      <Link to="/wiki" state={{ fromExam: true }} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
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
