import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Compass } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { buildWikiIndex, bundledWikiIndex, type WikiIndexItem } from '@/lib/wikiIndex'
import { examDisplayName, wikiRoute } from '@/lib/wikiRoutes'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { TRACKS, type Track } from '@/data/tracks'
import { GENERAL_GUIDES } from '@/data/examGuides'
import { defaultBody, loadBody, saveBody, SOA_TRACK_KEYS, CAS_TRACK_KEYS, type ExamBody } from '@/lib/bodyFilter'
import { ExamDateMeta, ExamRow, ExamRowMeta } from '@/components/ExamRow'
import { ListPanel, ListRow } from '@/components/ui/ListPanel'
import { LogoTile } from '@/components/LogoTile'
import { matchesSelectedVariant } from '@/data/examSittings'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { useWikiPage } from '@/components/wiki/WikiLayout'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { computeExamReadiness, type ExamReadinessAssessment } from '@/lib/readiness'
import { examStatus, type ExamStatus } from '@/lib/examStatus'
import { useWikiPageHead } from '@/hooks/useWikiPageHead'
import { ActuariaHubCard } from '@/components/actuaria/ActuariaHubCard'
import { ACTUARIA_ENABLED } from '@/lib/featureFlags'

function examNameToTrackKey(name: string): string {
  const cleaned = name
    .replace(/^Exam\s+/i, '')
    .replace(/\s*\([^)]*\)\s*$/, '')
    .trim()
  return wikiExamIdToProgressKey(cleaned)
}

const TRACK_ORDER = ['ACAS', 'FCAS', 'ASA', 'FSA']

// WikiFloatingSearch height: h-[calc(3.5rem-1px)] + 1px border = 56px (sticky top-0 on mobile)
const SEARCH_BAR_H = 56


function formatTargetDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}

/** Everything an exam card shows, derived once per exam page. */
interface ExamCardModel {
  exam: WikiIndexItem
  examId: string
  topic: string | null
  isInProgress: boolean
  isCompleted: boolean
  targetDate: string | null
  /** How far along the exam's material is — `lib/examStatus.ts`, by the page's own id. */
  contentStatus: ExamStatus
  readiness: ExamReadinessAssessment | null
  /** An exam in progress with something to be ready for. */
  showReadiness: boolean
}

/**
 * A group's heading bar — sticky, just below the search bar, so the group
 * being scrolled through stays named.
 */
function GroupHeading({ children }: { children: ReactNode }) {
  return (
    <div
      className="sticky z-10 -mx-4 sm:-mx-6 px-4 sm:px-6 py-1.5 mb-3 bg-background/95 backdrop-blur-sm"
      style={{ top: `${SEARCH_BAR_H}px` }}
    >
      {children}
    </div>
  )
}

function ExamGuideRow({ model, tourId }: { model: ExamCardModel; tourId?: string }) {
  const { exam, examId, topic, isInProgress, isCompleted, targetDate, contentStatus, readiness, showReadiness } = model

  // The Quiz tab draws the same exam with the same row (components/ExamRow.tsx);
  // only the facts differ. Here they are the reader's own: when the exam is sat,
  // and how ready they are for it — the one readiness score
  // (`computeExamReadiness`), as a number. A date is information and takes the
  // blue info hue; being part-way through with no date stays muted (§4.1).
  return (
    <ExamRow
      examKey={examId}
      title={examDisplayName(exam.name)}
      topic={topic}
      status={contentStatus}
      to={wikiRoute({ kind: 'exam', name: exam.name })}
      tourId={tourId}
      meta={isInProgress && (
        <ExamRowMeta
          items={[
            targetDate
              ? <ExamDateMeta>Exam: {formatTargetDate(targetDate)}</ExamDateMeta>
              : 'In progress',
            showReadiness && readiness && `${Math.round(readiness.overallPct)}% ready`,
          ]}
        />
      )}
      trailing={isCompleted && <CheckMark className="h-5 w-5" label="Completed" />}
    />
  )
}

export default function WikiHome() {
  const { syllabi, loading } = useWikiSyllabus()
  const { setPageRefs, setExamId } = useWikiPage()
  useWikiPageHead('hub', '')
  const { progress: examProgress, targetDates, examVariants, selectedTrack } = useExamProgress()
  const { records: masteryRecords } = useConceptMastery()
  const openAt = useConceptPopup(s => s.openAt)
  // Seeded from the bundle rather than left empty for a tick: `buildWikiIndex`
  // resolves with the very same array, but it resolves a microtask *after* the
  // first commit, which is one frame of "Loading exams…" on every visit — and
  // one frame in which a tab switch's view transition has no exam card to
  // match the card it came from. The effect below still runs, for the build
  // that shipped no bundle.
  const [index, setIndex] = useState<WikiIndexItem[]>(() => bundledWikiIndex() ?? [])
  // Where the list was left is kept by the router (lib/routeScrollMemory.ts),
  // which brings an exam page's "All exams" arrow and Back here to it.

  // Default to the reader's own track's body; the control overrides it, and the
  // choice is stored so the Quiz tab opens on the same body — one ladder, seen
  // twice. `lib/bodyFilter.ts` holds the key, the track sets and the fallback,
  // so the two tabs cannot drift apart on any of them.
  const [filterOverride, setFilterOverride] = useState<ExamBody | null>(loadBody)
  const filter = filterOverride ?? defaultBody(selectedTrack)

  function handleSetFilter(f: ExamBody) {
    saveBody(f)
    setFilterOverride(f)
  }

  useEffect(() => {
    setPageRefs([])
    setExamId(null)
  }, [setPageRefs, setExamId])

  useEffect(() => {
    buildWikiIndex().then(setIndex).catch(() => setIndex([]))
  }, [])

  const exams = useMemo(() => index.filter(i => i.category === 'exam'), [index])

  const examsByKey = useMemo(() => {
    const map = new Map<string, WikiIndexItem[]>()
    for (const exam of exams) {
      const key = examNameToTrackKey(exam.name)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(exam)
    }
    return map
  }, [exams])

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

  // One model per exam page, shared by every card that shows it — an exam in
  // progress is drawn twice (at the top, and in its place on the ladder), and
  // the two must never disagree.
  const cardModels = useMemo(() => {
    const now = new Date()
    const models = new Map<string, ExamCardModel>()
    for (const exam of exams) {
      const examId = examNameToTrackKey(exam.name)
      const examIdCleaned = exam.name.replace(/^Exam\s+/i, '').replace(/\s*\([^)]*\)\s*$/, '').trim()
      const match = syllabi.find(s => s.examId === examIdCleaned)
        ?? syllabi.find(s => wikiExamIdToProgressKey(s.examId) === examId)
      const status = examProgress[examId]
      const variantMatch = matchesSelectedVariant(examId, examIdCleaned, examVariants[examId])
      const isInProgress = status === 'in_progress' && variantMatch
      // The DISCs and Exam 6U are still only a syllabus outline.
      // They stay listed (candidates should see what's coming) but
      // greyed out, so the card never reads as material to study
      // from. By the page's own id: 6C and 6U share a key.
      const contentStatus = examStatus(examId, examIdCleaned)
      const inDevelopment = contentStatus === 'development'
      // The same score the exam page's Exam Readiness Score card
      // and the Dashboard radial show — one definition of readiness.
      const readiness = match
        ? computeExamReadiness(match, masteryRecords.filter(r => r.exam_id === examId), now)
        : null
      models.set(exam.path, {
        exam,
        examId,
        topic: match?.examTopic ?? null,
        isInProgress,
        isCompleted: status === 'completed' && variantMatch,
        targetDate: targetDates[examId] ?? null,
        contentStatus,
        readiness,
        // No readiness readout on an exam with nothing to be ready for.
        showReadiness: isInProgress && !!readiness && readiness.counts.total > 0 && !inDevelopment,
      })
    }
    return models
  }, [exams, syllabi, examProgress, examVariants, targetDates, masteryRecords])

  // The exams being studied, lifted above the ladder so the reader's own exams
  // are the first thing on the page rather than somewhere down a credential.
  // Walked over all four credentials — not just the picked body's — because
  // they are the reader's exams whichever ladder is being browsed; in ladder
  // order, once each (P and FM sit on both an associate and a fellow path).
  const inProgressModels = useMemo(() => {
    const seen = new Set<string>()
    const out: ExamCardModel[] = []
    for (const { exams: trackExams } of allTrackGroups) {
      for (const exam of trackExams) {
        if (seen.has(exam.path)) continue
        seen.add(exam.path)
        const model = cardModels.get(exam.path)
        if (model?.isInProgress) out.push(model)
      }
    }
    return out
  }, [allTrackGroups, cardModels])

  return (
    <div className="space-y-8">
      {/* The body picker rides the title row rather than a label row of its
          own further down: it governs everything below it, and the ladder it
          switches between needs no "Exams" heading to say what it is. */}
      <header className="flex items-center gap-2">
        <h1 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight">Study Guides</h1>
        <SegmentedControl
          label="Examining body"
          size="lg"
          pill
          value={filter}
          onChange={handleSetFilter}
          options={[
            { value: 'SOA', label: 'SOA' },
            { value: 'CAS', label: 'CAS' },
          ]}
          className="shrink-0"
        />
      </header>

      {/* The guides that belong to no single exam — read before there is an
          exam to study for, so they sit above the ladder rather than in it.
          A one-row panel of the same list the exams are drawn in, with the
          same 48px tile: a guide is one more thing to open, not a prose block
          introducing the page. */}
      {GENERAL_GUIDES.length > 0 && (
        <section>
          <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
            {GENERAL_GUIDES.map(guide => (
              <ListPanel key={guide.ref.path ?? guide.title}>
                <ListRow
                  onClick={() => openAt([guide.ref], 0, '/wiki')}
                  // The exam rows' tile, carrying an icon instead of a
                  // monogram — a guide has no place on the colour ramp, so
                  // it takes the wiki's teal rather than borrowing a hue.
                  leading={
                    <LogoTile size="lg" className="bg-teal-500 text-white shadow-sm">
                      <Compass className="h-6 w-6" />
                    </LogoTile>
                  }
                  title={guide.title}
                />
              </ListPanel>
            ))}
            {/* Actuaria Online — a way of studying rather than a guide, in the
                same row so the exam lists below still line up (§6.2). */}
            {ACTUARIA_ENABLED && <ActuariaHubCard />}
          </div>
        </section>
      )}

      <section>
        {loading && exams.length === 0 ? (
          <p className="text-sm text-muted-foreground">Loading exams…</p>
        ) : (
          <div className="space-y-6">
            {/* The exams being studied, first — the same row as on the
                ladder below, which keeps showing it in its place too. */}
            {inProgressModels.length > 0 && (
              <div>
                <GroupHeading>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    In progress
                  </p>
                </GroupHeading>
                <ListPanel columns={2}>
                  {inProgressModels.map(model => (
                    <ExamGuideRow key={model.exam.path} model={model} />
                  ))}
                </ListPanel>
              </div>
            )}

            {filteredTrackGroups.filter(g => g.exams.length > 0).map(({ track, exams: trackExams }) => (
              <div key={track.key}>
                <GroupHeading>
                  {/* The designation as a heading of its own — the short
                      label as the title, a step below the page's own, with
                      the long form beneath it. It is a button: the
                      designation is a page of its own (what it is, what it
                      takes, what it lets an actuary sign), so the heading is
                      the way into it. */}
                  {track.conceptPage ? (
                    <button
                      type="button"
                      onClick={() => openAt([{ kind: 'concept', name: track.conceptPage! }], 0, '/wiki')}
                      className="group block min-w-0 max-w-full text-left appearance-none bg-transparent p-0"
                    >
                      <h2 className="text-xl font-bold tracking-tight underline-offset-4 group-hover:underline">
                        {track.label}
                      </h2>
                      {track.fullName && (
                        <p className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                          {track.fullName}
                        </p>
                      )}
                    </button>
                  ) : (
                    <h2 className="text-xl font-bold tracking-tight">{track.name}</h2>
                  )}
                </GroupHeading>

                {/* One grouped list per credential, a row per exam, two
                    columns from `sm` up. */}
                <ListPanel columns={2}>
                  {trackExams.map(exam => {
                    const model = cardModels.get(exam.path)
                    if (!model) return null
                    // The tour's marker stays on the ladder's row, so an
                    // exam in progress doesn't carry it twice.
                    return (
                      <ExamGuideRow
                        key={exam.path}
                        model={model}
                        tourId={model.examId === 'P' ? 'exam-p' : undefined}
                      />
                    )
                  })}
                </ListPanel>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
