import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigationType } from 'react-router-dom'
import { BookMarked, CheckCircle2, GraduationCap } from 'lucide-react'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { wikiRoute } from '@/lib/wikiRoutes'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { TRACKS, type Track } from '@/data/tracks'
import { matchesSelectedVariant } from '@/data/examSittings'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { computeReadiness } from '@/lib/readiness'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { cn } from '@/lib/utils'

function examNameToTrackKey(name: string): string {
  const cleaned = name
    .replace(/^Exam\s+/i, '')
    .replace(/\s*\([^)]*\)\s*$/, '')
    .trim()
  return wikiExamIdToProgressKey(cleaned)
}

type BodyFilter = 'SOA' | 'CAS'

const TRACK_ORDER = ['ACAS', 'FCAS', 'ASA', 'FSA']
const SOA_TRACK_KEYS = new Set(['ASA', 'FSA'])
const CAS_TRACK_KEYS = new Set(['ACAS', 'FCAS'])
const BODY_FILTER_KEY = 'quiz.bodyFilter'

// WikiFloatingSearch height: h-[calc(3.5rem-1px)] + 1px border = 56px (sticky top-0 on mobile)
const SEARCH_BAR_H = 56


function formatTargetDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}

export default function WikiHome() {
  const { syllabi, loading } = useWikiSyllabus()
  const { setPageRefs, setExamId } = useWikiPage()
  const { progress: examProgress, targetDates, examVariants, selectedTrack } = useExamProgress()
  const { records: masteryRecords } = useConceptMastery()
  const openAt = useConceptPopup(s => s.openAt)
  const [index, setIndex] = useState<WikiIndexItem[]>([])
  const location = useLocation()
  const navigationType = useNavigationType()

  // Restore scroll when returning from an exam or resource page; scroll to top on fresh visits
  const shouldRestore = useRef(
    navigationType === 'POP' ||
    !!(location.state as { fromExam?: boolean; fromResource?: boolean } | null)?.fromExam ||
    !!(location.state as { fromExam?: boolean; fromResource?: boolean } | null)?.fromResource,
  )
  const scrollRestored = useRef(false)
  // On fresh visits scroll to top immediately; on returns wait for index to load
  // so the page is tall enough before we try to jump to the saved position.
  useEffect(() => {
    if (!shouldRestore.current) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])
  useEffect(() => {
    if (!shouldRestore.current || scrollRestored.current || index.length === 0) return
    scrollRestored.current = true
    const saved = sessionStorage.getItem('wiki-home:scroll')
    if (saved !== null) {
      const top = parseInt(saved, 10)
      requestAnimationFrame(() => window.scrollTo({ top, behavior: 'instant' }))
    }
  }, [index])
  useEffect(() => {
    return () => { sessionStorage.setItem('wiki-home:scroll', String(window.scrollY)) }
  }, [])

  // Default to the user's current track body; user can override with the control
  // Persisted in localStorage so the Quiz tab stays in sync
  const [filterOverride, setFilterOverride] = useState<BodyFilter | null>(() => {
    try {
      const saved = localStorage.getItem(BODY_FILTER_KEY)
      return saved === 'SOA' || saved === 'CAS' ? saved : null
    } catch { return null }
  })
  const defaultFilter: BodyFilter = CAS_TRACK_KEYS.has(selectedTrack) ? 'CAS' : 'SOA'
  const filter = filterOverride ?? defaultFilter

  function handleSetFilter(f: BodyFilter) {
    try { localStorage.setItem(BODY_FILTER_KEY, f) } catch { /* ignore */ }
    setFilterOverride(f)
  }

  // Used to position sticky track headers just below the sticky Exams header
  const examsHeaderRef = useRef<HTMLDivElement>(null)
  const [headerHeight, setHeaderHeight] = useState(56)

  useEffect(() => {
    setPageRefs([])
    setExamId(null)
  }, [setPageRefs, setExamId])

  useEffect(() => {
    buildWikiIndex().then(setIndex).catch(() => setIndex([]))
  }, [])

  useEffect(() => {
    const el = examsHeaderRef.current
    if (!el) return
    const observer = new ResizeObserver(() => setHeaderHeight(el.offsetHeight))
    observer.observe(el)
    setHeaderHeight(el.offsetHeight)
    return () => observer.disconnect()
  }, [])

  const exams = useMemo(() => index.filter(i => i.category === 'exam'), [index])
  const books = useMemo(() => index.filter(i => i.category === 'document'), [index])
  const resourceRefs = useMemo<WikiEntryRef[]>(
    () => books.map(book => ({ kind: 'resource', name: book.name })),
    [books],
  )

  const examsByKey = useMemo(() => {
    const map = new Map<string, WikiIndexItem[]>()
    for (const exam of exams) {
      const key = examNameToTrackKey(exam.name)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(exam)
    }
    return map
  }, [exams])

  // In-progress syllabi in the same order as Flashcards tab so colour indices align
  const inProgressSyllabi = useMemo(
    () => syllabi.filter(s => {
      const key = wikiExamIdToProgressKey(s.examId)
      return examProgress[key] === 'in_progress' && matchesSelectedVariant(key, s.examId, examVariants[key])
    }),
    [syllabi, examProgress, examVariants],
  )

  // Pill data for all in-progress exams (shown regardless of active body filter)
  const inProgressPills = useMemo(() =>
    inProgressSyllabi
      .map((syllabus) => {
        const progressKey = wikiExamIdToProgressKey(syllabus.examId)
        const item = (examsByKey.get(progressKey) ?? [])[0]
        return item ? { syllabus, item } : null
      })
      .filter((x): x is NonNullable<typeof x> => x != null),
    [inProgressSyllabi, examsByKey],
  )

  const allTrackGroups = useMemo(() => {
    const credTracks = TRACK_ORDER
      .map(key => TRACKS.find(t => t.key === key))
      .filter((t): t is Track => t != null)

    return credTracks.map(track => {
      const orderedExams: WikiIndexItem[] = []
      const seenKeys = new Set<string>()
      for (const section of track.sections) {
        if (section.collapsed) continue
        for (const item of section.items) {
          if (seenKeys.has(item.id)) continue
          seenKeys.add(item.id)
          const items = examsByKey.get(item.id)
          if (items) orderedExams.push(...items)
        }
      }
      return { track, exams: orderedExams }
    })
  }, [examsByKey])

  const filteredTrackGroups = useMemo(() =>
    allTrackGroups.filter(g =>
      filter === 'SOA' ? SOA_TRACK_KEYS.has(g.track.key) : CAS_TRACK_KEYS.has(g.track.key),
    ),
    [allTrackGroups, filter],
  )

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Study Guides</h1>
      </header>

      <section>
        {/* ── Sticky block: Exams heading + filter + in-progress pills ── */}
        <div
          ref={examsHeaderRef}
          className="sticky z-20 -mx-4 px-4 pt-3 pb-3 bg-background/95 backdrop-blur-sm mb-4"
          style={{ top: `${SEARCH_BAR_H}px` }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-teal-500" />
              Exams
            </h2>
            <div className="flex items-center rounded-lg border bg-muted/50 p-0.5 gap-0.5">
              {(['SOA', 'CAS'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => handleSetFilter(tab)}
                  className={cn(
                    'px-5 py-2 rounded-md text-sm font-medium transition-colors',
                    filter === tab
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* In-progress exam quick-links */}
          {inProgressPills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {inProgressPills.map(({ syllabus, item }) => (
                <Link key={syllabus.examId} to={wikiRoute({ kind: 'exam', name: item.name })}>
                  <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-opacity hover:opacity-80">
                    {syllabus.examLabel}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {loading && exams.length === 0 ? (
          <p className="text-sm text-muted-foreground">Loading exams…</p>
        ) : (
          <div className="space-y-8">
            {filteredTrackGroups.filter(g => g.exams.length > 0).map(({ track, exams: trackExams }) => (
              <div key={track.key}>
                {/* Sticky track header — sits just below the sticky Exams block */}
                <div
                  className="sticky z-10 -mx-4 px-4 py-1.5 mb-3 bg-background/95 backdrop-blur-sm border-b"
                  style={{ top: `${SEARCH_BAR_H + headerHeight}px` }}
                >
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {track.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {trackExams.map(exam => {
                    const examId = examNameToTrackKey(exam.name)
                    const examIdCleaned = exam.name.replace(/^Exam\s+/i, '').replace(/\s*\([^)]*\)\s*$/, '').trim()
                    const match = syllabi.find(s => s.examId === examIdCleaned)
                      ?? syllabi.find(s => wikiExamIdToProgressKey(s.examId) === examNameToTrackKey(exam.name))
                    const status = examProgress[examId]
                    const variantMatch = matchesSelectedVariant(examId, examIdCleaned, examVariants[examId])
                    const isInProgress = status === 'in_progress' && variantMatch
                    const isCompleted = status === 'completed' && variantMatch
                    const targetDate = targetDates[examId]

                    const now = new Date()
                    const examRecords = match
                      ? masteryRecords.filter(r => r.exam_id === examId)
                      : []
                    const { overallPct, sections } = match
                      ? computeReadiness(match, examRecords, now)
                      : { overallPct: 0, sections: [] }
                    const total = sections.reduce((sum, s) => sum + s.total, 0)
                    const level3Count = sections.reduce((sum, s) => sum + s.level3Count, 0)
                    const level2Count = sections.reduce((sum, s) => sum + s.level2Count, 0)
                    const level1Count = sections.reduce((sum, s) => sum + s.level1Count, 0)
                    const readinessPct = Math.round(overallPct)
                    const level3Pct = total > 0 ? Math.round((level3Count / total) * 100) : 0
                    const level2Pct = total > 0 ? Math.round((level2Count / total) * 100) : 0
                    const level1Pct = total > 0 ? Math.round((level1Count / total) * 100) : 0

                    return (
                      <Link key={exam.path} to={wikiRoute({ kind: 'exam', name: exam.name })} data-tour={examId === 'P' ? 'exam-p' : undefined}>
                        <Card
                          className={cn(
                            'h-full transition-all duration-150 overflow-hidden',
                            !isInProgress && 'hover:bg-accent/30',
                            isInProgress && 'bg-primary/10 border-primary/40 hover:bg-primary/25 hover:border-primary/70',
                          )}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-2">
                              <CardTitle className="text-base leading-snug">{exam.name}</CardTitle>
                              {isCompleted && (
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                              )}
                            </div>
                            {match && (
                              <CardDescription className="mt-0.5">{match.examTopic}</CardDescription>
                            )}

                            {/* Status pill — hidden for completed exams */}
                            {!isCompleted && (isInProgress || (examId !== 'P' && examId !== 'FM')) && (
                              <div className="mt-2">
                                {isInProgress ? (
                                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                                    {targetDate ? `Exam: ${formatTargetDate(targetDate)}` : 'In Progress'}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                    Beta
                                  </span>
                                )}
                              </div>
                            )}
                          </CardHeader>

                          {/* Progress bar — in-progress only, not for completed */}
                          {isInProgress && total > 0 && (
                            <div className="px-6 pb-4 space-y-1">
                              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                                <span>Readiness</span>
                                <span className="font-medium tabular-nums">{readinessPct}%</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden flex">
                                <div className="h-full transition-all" style={{ width: `${level3Pct}%`, backgroundColor: 'rgba(34, 197, 94, 1)' }} />
                                <div className="h-full transition-all" style={{ width: `${level2Pct}%`, backgroundColor: 'rgba(34, 197, 94, 0.55)' }} />
                                <div className="h-full transition-all" style={{ width: `${level1Pct}%`, backgroundColor: 'rgba(34, 197, 94, 0.25)' }} />
                              </div>
                            </div>
                          )}
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <BookMarked className="h-5 w-5 text-muted-foreground" />
          Resources
        </h2>
        {books.length === 0 ? (
          <p className="text-sm text-muted-foreground">Loading resources…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {books.map((book, bookIdx) => (
              <button
                key={book.path}
                type="button"
                onClick={() => openAt(resourceRefs, bookIdx, '/wiki')}
                className="w-full text-left appearance-none bg-transparent p-0"
              >
                <Card className="h-full transition-all duration-150 hover:bg-accent/40 overflow-hidden flex flex-row items-stretch">
                  {book.coverImage && (
                    <div className="flex-shrink-0 p-2 flex items-center">
                      <img
                        src={book.coverImage}
                        alt={book.title ?? book.name}
                        className="w-16 sm:w-20 rounded-md object-contain max-h-28 bg-muted/20"
                        loading="lazy"
                        onError={(e) => {
                          const p = e.currentTarget.parentElement
                          if (p) p.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <p className="text-sm font-semibold leading-snug">{book.title ?? book.name}</p>
                    {(book.author || book.year || book.edition || book.publisher) && (
                      <div className="flex flex-wrap gap-1">
                        {book.author && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                            {book.author}
                          </span>
                        )}
                        {book.year && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                            {book.year}
                          </span>
                        )}
                        {book.edition && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                            {book.edition} ed.
                          </span>
                        )}
                        {book.publisher && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                            {book.publisher}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
