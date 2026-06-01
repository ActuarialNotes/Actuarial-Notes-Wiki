import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigationType } from 'react-router-dom'
import { BookMarked, CheckCircle2, GraduationCap } from 'lucide-react'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { wikiRoute, examIdFromFile } from '@/lib/wikiRoutes'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { TRACKS, type Track } from '@/data/tracks'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { useConceptMastery } from '@/hooks/useConceptMastery'
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

// WikiFloatingSearch height: h-[calc(3.5rem-1px)] + 1px border = 56px (sticky top-0 on mobile)
const SEARCH_BAR_H = 56

// Mirrors PACK_COLOR_PALETTE in Flashcards.tsx so in-progress exams share the same colour across tabs
const PACK_COLORS = [
  { bg: 'bg-blue-500/10 border-blue-400/40',      bar: 'bg-blue-500',    text: 'text-blue-600 dark:text-blue-400' },
  { bg: 'bg-emerald-500/10 border-emerald-400/40', bar: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
  { bg: 'bg-violet-500/10 border-violet-400/40',   bar: 'bg-violet-500',  text: 'text-violet-600 dark:text-violet-400' },
  { bg: 'bg-orange-500/10 border-orange-400/40',   bar: 'bg-orange-500',  text: 'text-orange-600 dark:text-orange-400' },
  { bg: 'bg-rose-500/10 border-rose-400/40',       bar: 'bg-rose-500',    text: 'text-rose-600 dark:text-rose-400' },
  { bg: 'bg-cyan-500/10 border-cyan-400/40',       bar: 'bg-cyan-500',    text: 'text-cyan-600 dark:text-cyan-400' },
] as const

function formatTargetDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}

export default function WikiHome() {
  const { syllabi, loading } = useWikiSyllabus()
  const { setPageRefs, setExamId } = useWikiPage()
  const { progress: examProgress, targetDates, selectedTrack } = useExamProgress()
  const { byConcept } = useConceptMastery()
  const [index, setIndex] = useState<WikiIndexItem[]>([])
  const location = useLocation()
  const navigationType = useNavigationType()

  // Restore scroll when returning from an exam page; scroll to top on fresh visits
  const shouldRestore = useRef(navigationType === 'POP' || !!(location.state as { fromExam?: boolean } | null)?.fromExam)
  useEffect(() => {
    if (shouldRestore.current) {
      const saved = sessionStorage.getItem('wiki-home:scroll')
      if (saved !== null) {
        const top = parseInt(saved, 10)
        requestAnimationFrame(() => window.scrollTo({ top, behavior: 'instant' }))
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])
  useEffect(() => {
    return () => { sessionStorage.setItem('wiki-home:scroll', String(window.scrollY)) }
  }, [])

  // Default to the user's current track body; user can override with the control
  const [filterOverride, setFilterOverride] = useState<BodyFilter | null>(null)
  const defaultFilter: BodyFilter = SOA_TRACK_KEYS.has(selectedTrack) ? 'SOA' : 'CAS'
  const filter = filterOverride ?? defaultFilter

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
    () => syllabi.filter(s => examProgress[wikiExamIdToProgressKey(s.examId)] === 'in_progress'),
    [syllabi, examProgress],
  )

  // Pill data for all in-progress exams (shown regardless of active body filter)
  const inProgressPills = useMemo(() =>
    inProgressSyllabi
      .map((syllabus, idx) => {
        const progressKey = wikiExamIdToProgressKey(syllabus.examId)
        const item = (examsByKey.get(progressKey) ?? [])[0]
        return item ? { syllabus, item, colorIdx: idx } : null
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
          className="sticky z-20 -mx-4 px-4 pt-3 pb-3 bg-background/95 backdrop-blur-sm border-b mb-4"
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
                  onClick={() => setFilterOverride(tab)}
                  className={cn(
                    'px-3 py-1 rounded-md text-xs font-medium transition-colors',
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
              {inProgressPills.map(({ syllabus, item, colorIdx }) => {
                const color = PACK_COLORS[colorIdx % PACK_COLORS.length]
                return (
                  <Link key={syllabus.examId} to={wikiRoute({ kind: 'exam', name: item.name })}>
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border transition-opacity hover:opacity-80',
                        color.bg,
                        color.text,
                      )}
                    >
                      {syllabus.examLabel}
                    </span>
                  </Link>
                )
              })}
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
                    const match = syllabi.find(
                      s => examIdFromFile(s.examLabel) === examIdFromFile(exam.name),
                    )
                    const status = examProgress[examId]
                    const isInProgress = status === 'in_progress'
                    const isCompleted = status === 'completed'
                    const targetDate = targetDates[examId]

                    // Colour mirrors Flashcards tab assignment; key-based so it works
                    // even when examIdFromFile can't match the syllabus label to exam.name
                    const inProgressIdx = inProgressSyllabi.findIndex(
                      s => wikiExamIdToProgressKey(s.examId) === examId,
                    )
                    const colorEntry = isInProgress && inProgressIdx >= 0
                      ? PACK_COLORS[inProgressIdx % PACK_COLORS.length]
                      : null

                    // Concept mastery progress (level3 = fully mastered)
                    const allConcepts = match
                      ? match.topics.flatMap(t => t.concepts.map(c => c.name))
                      : []
                    const masteredCount = allConcepts.filter(name => {
                      const rec = byConcept.get(`${examId}::${name.toLowerCase()}`)
                      return rec?.state === 'level3'
                    }).length
                    const progressPct = allConcepts.length > 0
                      ? Math.round((masteredCount / allConcepts.length) * 100)
                      : 0

                    return (
                      <Link key={exam.path} to={wikiRoute({ kind: 'exam', name: exam.name })}>
                        <Card
                          className={cn(
                            'h-full transition-colors hover:bg-accent/30 overflow-hidden',
                            // Completed: green border only, no filled background
                            isCompleted && 'border-emerald-500/50',
                            // In-progress: coloured background
                            colorEntry && colorEntry.bg,
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
                            {!isCompleted && (
                              <div className="mt-2">
                                {isInProgress ? (
                                  <span
                                    className={cn(
                                      'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium border',
                                      targetDate
                                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-400/30'
                                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-400/30',
                                    )}
                                  >
                                    {targetDate ? `Exam: ${formatTargetDate(targetDate)}` : 'In Progress'}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium border bg-muted text-muted-foreground border-border/60">
                                    New
                                  </span>
                                )}
                              </div>
                            )}
                          </CardHeader>

                          {/* Progress bar — in-progress only, not for completed */}
                          {isInProgress && colorEntry && (
                            <div className="px-6 pb-4">
                              <div className="h-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                                <div
                                  className={cn('h-full rounded-full transition-all', colorEntry.bar)}
                                  style={{ width: `${progressPct}%` }}
                                />
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
            {books.map(book => (
              <Link key={book.path} to={wikiRoute({ kind: 'resource', name: book.name })}>
                <Card className="h-full transition-colors hover:bg-accent/30">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm leading-snug">
                      {book.title ?? book.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
