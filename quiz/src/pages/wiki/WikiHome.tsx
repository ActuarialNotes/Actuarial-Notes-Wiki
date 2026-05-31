import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
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

type BodyFilter = 'all' | 'SOA' | 'CAS'

const TRACK_ORDER = ['ACAS', 'FCAS', 'ASA', 'FSA']
const SOA_TRACK_KEYS = new Set(['ASA', 'FSA'])
const CAS_TRACK_KEYS = new Set(['ACAS', 'FCAS'])

// Matches the PACK_COLOR_PALETTE in Flashcards.tsx so in-progress exams use the same colour on both tabs
const PACK_COLORS = [
  { bg: 'bg-blue-500/10 border-blue-400/40',     bar: 'bg-blue-500' },
  { bg: 'bg-emerald-500/10 border-emerald-400/40', bar: 'bg-emerald-500' },
  { bg: 'bg-violet-500/10 border-violet-400/40',  bar: 'bg-violet-500' },
  { bg: 'bg-orange-500/10 border-orange-400/40',  bar: 'bg-orange-500' },
  { bg: 'bg-rose-500/10 border-rose-400/40',      bar: 'bg-rose-500' },
  { bg: 'bg-cyan-500/10 border-cyan-400/40',      bar: 'bg-cyan-500' },
] as const

const COMPLETED_COLOR = { bg: 'bg-emerald-500/10 border-emerald-400/40', bar: 'bg-emerald-500' }

function formatTargetDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}

export default function WikiHome() {
  const { syllabi, loading } = useWikiSyllabus()
  const { setPageRefs, setExamId } = useWikiPage()
  const { progress: examProgress, targetDates } = useExamProgress()
  const { byConcept } = useConceptMastery()
  const [index, setIndex] = useState<WikiIndexItem[]>([])
  const [filter, setFilter] = useState<BodyFilter>('all')

  useEffect(() => {
    setPageRefs([])
    setExamId(null)
  }, [setPageRefs, setExamId])

  useEffect(() => {
    buildWikiIndex().then(setIndex).catch(() => setIndex([]))
  }, [])

  const exams = useMemo(() => index.filter(i => i.category === 'exam'), [index])
  const books = useMemo(() => index.filter(i => i.category === 'document'), [index])

  // Map progress key → exam index items
  const examsByKey = useMemo(() => {
    const map = new Map<string, WikiIndexItem[]>()
    for (const exam of exams) {
      const key = examNameToTrackKey(exam.name)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(exam)
    }
    return map
  }, [exams])

  // Syllabi for in-progress exams — same ordering as Flashcards tab so colorIndex aligns
  const inProgressSyllabi = useMemo(
    () => syllabi.filter(s => examProgress[wikiExamIdToProgressKey(s.examId)] === 'in_progress'),
    [syllabi, examProgress],
  )

  // Build ordered track groups (deduplication handled per-track via seenKeys)
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

  // Groups filtered by body, then organised into CAS / SOA buckets for the "All" view
  const bodyGroups = useMemo(() => {
    const filtered = allTrackGroups.filter(g => {
      if (filter === 'SOA') return SOA_TRACK_KEYS.has(g.track.key)
      if (filter === 'CAS') return CAS_TRACK_KEYS.has(g.track.key)
      return true
    })

    if (filter !== 'all') return [{ body: filter, groups: filtered }]

    const casGroups = filtered.filter(g => CAS_TRACK_KEYS.has(g.track.key) && g.exams.length > 0)
    const soaGroups = filtered.filter(g => SOA_TRACK_KEYS.has(g.track.key) && g.exams.length > 0)
    const result: { body: string; groups: typeof filtered }[] = []
    if (casGroups.length > 0) result.push({ body: 'CAS', groups: casGroups })
    if (soaGroups.length > 0) result.push({ body: 'SOA', groups: soaGroups })
    return result
  }, [allTrackGroups, filter])

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Study Guides</h1>
        <p className="text-muted-foreground mt-1">
          Concepts, learning objectives, and resources for the actuarial exams.
        </p>
      </header>

      <section>
        {/* Section heading + segmented control */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-teal-500" />
            Exams
          </h2>
          <div className="flex items-center rounded-lg border bg-muted/50 p-0.5 gap-0.5">
            {(['all', 'SOA', 'CAS'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                  filter === tab
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {tab === 'all' ? 'All' : tab}
              </button>
            ))}
          </div>
        </div>

        {loading && exams.length === 0 ? (
          <p className="text-sm text-muted-foreground">Loading exams…</p>
        ) : (
          <div className="space-y-8">
            {bodyGroups.map(({ body, groups }) => (
              <div key={body}>
                {/* Sticky body header — only rendered in "All" view */}
                {filter === 'all' && (
                  <div className="sticky top-0 z-10 -mx-4 px-4 py-1.5 mb-4 bg-background/95 backdrop-blur-sm border-b">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      {body}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {groups.filter(g => g.exams.length > 0).map(({ track, exams: trackExams }) => (
                    <div key={track.key}>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        {track.name}
                      </h3>
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

                          // Colour index mirrors Flashcards tab assignment
                          const inProgressIdx = match
                            ? inProgressSyllabi.findIndex(s => s.examId === match.examId)
                            : -1
                          const colorEntry = isCompleted
                            ? COMPLETED_COLOR
                            : isInProgress && inProgressIdx >= 0
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

                                  {/* Status pill */}
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
                                    ) : isCompleted ? null : (
                                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium border bg-muted text-muted-foreground border-border/60">
                                        New
                                      </span>
                                    )}
                                  </div>
                                </CardHeader>

                                {/* Progress bar — only for started exams */}
                                {(isInProgress || isCompleted) && colorEntry && (
                                  <div className="px-6 pb-4">
                                    <div className="h-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                                      <div
                                        className={cn('h-full rounded-full transition-all', colorEntry.bar)}
                                        style={{ width: `${isCompleted ? 100 : progressPct}%` }}
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
