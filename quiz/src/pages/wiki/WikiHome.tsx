import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigationType } from 'react-router-dom'
import { CheckCircle2, Compass, Hammer } from 'lucide-react'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { buildWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { examDisplayName, wikiRoute } from '@/lib/wikiRoutes'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { TRACKS, type Track } from '@/data/tracks'
import { GENERAL_GUIDES } from '@/data/examGuides'
import { examAccentStyle } from '@/lib/examColors'
import { ExamLogo } from '@/components/ExamLogo'
import { LogoTile } from '@/components/LogoTile'
import { matchesSelectedVariant } from '@/data/examSittings'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { computeExamReadiness } from '@/lib/readiness'
import { examStatus } from '@/lib/examStatus'
import { splitAuthors } from '@/lib/authorNames'
import { ExamPill, MetaPill } from '@/components/wiki/ResourcePills'
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
    <div className="space-y-6">
      <header className="flex items-center gap-2">
        <img
          src="/favicon.png"
          alt=""
          aria-hidden="true"
          className="h-6 w-6 shrink-0 brightness-0 dark:invert"
        />
        <h1 className="text-2xl font-bold tracking-tight">Study Guides</h1>
      </header>

      {/* The guides that belong to no single exam — read before there is an
          exam to study for, so they sit above the ladder rather than in it.
          Same grid, same card, same tile as an exam below: a guide is one more
          thing to open, not a prose block introducing the page. */}
      {GENERAL_GUIDES.length > 0 && (
        <section>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {GENERAL_GUIDES.map(guide => (
              <button
                key={guide.ref.path ?? guide.title}
                type="button"
                onClick={() => openAt([guide.ref], 0, '/wiki')}
                className="w-full text-left appearance-none bg-transparent p-0"
              >
                <Card className="h-full transition-all duration-150 hover:bg-accent/30">
                  <CardHeader className="flex-row items-start gap-3 space-y-0 p-4 pb-3">
                    {/* The exam cards' tile, carrying an icon instead of a
                        monogram — a guide has no place on the colour ramp, so
                        it takes the wiki's teal rather than borrowing a hue. */}
                    <LogoTile size="lg" className="mt-0.5 bg-teal-500 text-white shadow-sm">
                      <Compass className="h-6 w-6" />
                    </LogoTile>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base leading-snug">{guide.title}</CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              </button>
            ))}
          </div>
        </section>
      )}

      <section>
        {/* ── Sticky block: Exams heading + filter + in-progress pills ── */}
        <div
          ref={examsHeaderRef}
          className="sticky z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2.5 bg-background/95 backdrop-blur-sm mb-3"
          style={{ top: `${SEARCH_BAR_H}px` }}
        >
          {/* Same row the quiz builder leads with — a field label and the
              body picker — so the two tabs open on the same shape. */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Exams</p>
            <SegmentedControl
              label="Examining body"
              size="sm"
              value={filter}
              onChange={handleSetFilter}
              options={[
                { value: 'SOA', label: 'SOA' },
                { value: 'CAS', label: 'CAS' },
              ]}
              className="shrink-0"
            />
          </div>

          {/* In-progress exam quick-links */}
          {inProgressPills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {inProgressPills.map(({ syllabus, item }) => (
                <Link key={syllabus.examId} to={wikiRoute({ kind: 'exam', name: item.name })}>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-opacity hover:opacity-80">
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
          <div className="space-y-4">
            {filteredTrackGroups.filter(g => g.exams.length > 0).map(({ track, exams: trackExams }) => (
              <div key={track.key}>
                {/* Sticky track header — sits just below the sticky Exams block */}
                <div
                  className="sticky z-10 -mx-4 sm:-mx-6 px-4 sm:px-6 py-1.5 mb-2 bg-background/95 backdrop-blur-sm"
                  style={{ top: `${SEARCH_BAR_H + headerHeight}px` }}
                >
                  {/* The quiz builder's track heading, to the letter — one
                      `LABEL | Full name` line at `text-xs` — except that here
                      it is a button: the designation is a page of its own
                      (what it is, what it takes, what it lets an actuary
                      sign), so the heading is the way into it. */}
                  {track.conceptPage ? (
                    <button
                      type="button"
                      onClick={() => openAt([{ kind: 'concept', name: track.conceptPage! }], 0, '/wiki')}
                      className="group block text-left appearance-none bg-transparent p-0 text-xs font-semibold text-muted-foreground uppercase tracking-wider transition-colors hover:text-foreground"
                    >
                      <span className="group-hover:underline underline-offset-4">
                        {track.label} | {track.fullName}
                      </span>
                    </button>
                  ) : (
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {track.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
                    // Exams 6–9 are still only a syllabus outline. They stay
                    // listed (candidates should see what's coming) but greyed
                    // out, so the card never reads as material to study from.
                    const contentStatus = examStatus(examId)
                    const inDevelopment = contentStatus === 'development'

                    const now = new Date()
                    const examRecords = match
                      ? masteryRecords.filter(r => r.exam_id === examId)
                      : []
                    // The same score the exam page's Exam Readiness Score card
                    // and the Dashboard radial show — one definition of readiness.
                    const { overallPct, sections } = match
                      ? computeExamReadiness(match, examRecords, now, examId)
                      : { overallPct: 0, sections: [] }
                    const total = sections.reduce((sum, s) => sum + s.total, 0)
                    const level3Count = sections.reduce((sum, s) => sum + s.level3Count, 0)
                    const level2Count = sections.reduce((sum, s) => sum + s.level2Count, 0)
                    const level1Count = sections.reduce((sum, s) => sum + s.level1Count, 0)
                    const readinessPct = Math.round(overallPct)
                    const level3Pct = total > 0 ? Math.round((level3Count / total) * 100) : 0
                    const level2Pct = total > 0 ? Math.round((level2Count / total) * 100) : 0
                    const level1Pct = total > 0 ? Math.round((level1Count / total) * 100) : 0

                    // No readiness readout on an exam with nothing to be ready for.
                    const hasProgressBar = isInProgress && total > 0 && !inDevelopment

                    // The exam's place on the ladder, as a colour (blue at
                    // Exam P through to red at Exam 9 — see lib/examColors.ts).
                    // Scoped to the card as custom properties, so the highlight
                    // below is one use of it rather than the only place the
                    // colour exists.
                    const accent = examAccentStyle(examId)

                    return (
                      <Link key={exam.path} to={wikiRoute({ kind: 'exam', name: exam.name })} data-tour={examId === 'P' ? 'exam-p' : undefined}>
                        <Card
                          style={accent}
                          className={cn(
                            'h-full flex flex-col transition-all duration-150 overflow-hidden ring-1 ring-transparent',
                            // Center content vertically when the card is only a header
                            // (completed / beta cards) so it stays balanced if the card
                            // is stretched to match a taller sibling in the grid row.
                            !hasProgressBar && 'justify-center',
                            isInProgress && !inDevelopment && 'bg-primary/10',
                            // Unbuilt exam: no card surface, a dashed outline and
                            // dimmed contents — the same "nothing here yet" material
                            // the empty-state placeholders use. The page is still
                            // reachable (it holds the published syllabus), it just
                            // never looks like something to study from.
                            inDevelopment && 'bg-muted/40 border border-dashed border-muted-foreground/30 shadow-none',
                            // Hover picks the exam's own colour up off the card's
                            // custom properties. Exams only: a requirement with no
                            // rung on the ladder keeps the neutral hover.
                            accent
                              ? 'hover:bg-[var(--exam-accent-soft)] hover:ring-[var(--exam-accent-muted)]'
                              : isInProgress && !inDevelopment
                                ? 'hover:bg-primary/25'
                                : inDevelopment
                                  ? 'hover:bg-muted/60'
                                  : 'hover:bg-accent/30',
                          )}
                        >
                          <CardHeader className="flex-row items-start gap-3 space-y-0 p-4 pb-3">
                            {/* The exam's logo — its monogram in its own place
                                on the colour ramp. A visual anchor, so a card
                                is recognisable before its title is read; the
                                title beside it is what actually names the exam,
                                which is why the tile is aria-hidden. */}
                            <ExamLogo examKey={examId} size="lg" muted={inDevelopment} className="mt-0.5" />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <CardTitle className={cn('text-base leading-snug', inDevelopment && 'text-muted-foreground')}>
                                  {examDisplayName(exam.name)}
                                </CardTitle>
                                {isCompleted && (
                                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                                )}
                              </div>
                              {match && (
                                <CardDescription className="mt-0.5">{match.examTopic}</CardDescription>
                              )}

                              {/* Status pill — hidden for completed exams. "In
                                  development" outranks everything: it says the
                                  material isn't there, which is true whatever the
                                  candidate has marked this exam as. */}
                              {!isCompleted && (inDevelopment || isInProgress || contentStatus === 'beta') && (
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {/* The quiz builder's pills, to the letter:
                                      blue is the info hue a scheduled date
                                      takes, being part-way through is neutral,
                                      and Beta is the amber caution (style
                                      guide §4.1). They used to be one size
                                      smaller and a different colour here. */}
                                  {inDevelopment ? (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-muted-foreground/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                      <Hammer className="h-3 w-3" aria-hidden="true" />
                                      In development — not yet available
                                    </span>
                                  ) : isInProgress ? (
                                    <span className={cn(
                                      'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                                      targetDate
                                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                        : 'bg-muted text-muted-foreground',
                                    )}>
                                      {targetDate ? `Exam: ${formatTargetDate(targetDate)}` : 'In progress'}
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                                      Beta
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </CardHeader>

                          {/* Progress bar — in-progress only, not for completed */}
                          {hasProgressBar && (
                            <div className="px-4 pb-4 space-y-1">
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
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
        {/* Same field-label treatment the Exams block above uses, so the page
            has one heading size rather than two. */}
        <p className="text-sm font-medium mb-3">Resources</p>
        {books.length === 0 ? (
          <p className="text-sm text-muted-foreground">Loading resources…</p>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book, bookIdx) => (
              <button
                key={book.path}
                type="button"
                onClick={() => openAt(resourceRefs, bookIdx, '/wiki')}
                className="w-full text-left appearance-none bg-transparent p-0"
              >
                <Card className="h-full transition-all duration-150 hover:bg-accent/40 overflow-hidden flex flex-row items-stretch">
                  {book.coverImage && (
                    <div className="flex-shrink-0 p-2 pt-4 flex items-start">
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
                    {(book.exams?.length || book.author || book.year || book.edition || book.publisher) && (
                      <div className="flex flex-wrap gap-1">
                        {/* The exam(s) this source is a reading for lead the row:
                            on a shelf that mixes every exam's syllabus, that is
                            what the card is being scanned for. */}
                        {book.exams?.map(exam => (
                          <ExamPill key={`exam-${exam}`}>{exam}</ExamPill>
                        ))}
                        {splitAuthors(book.author).map((author, i) => (
                          <MetaPill key={`author-${i}`}>{author}</MetaPill>
                        ))}
                        {book.year && <MetaPill>{book.year}</MetaPill>}
                        {book.edition && <MetaPill>{book.edition} ed.</MetaPill>}
                        {book.publisher && <MetaPill>{book.publisher}</MetaPill>}
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
