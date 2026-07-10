import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, ChevronDown, Clock, Target, TrendingDown } from 'lucide-react'
import {
  conceptsAboutToDecay,
  projectReadiness,
  weakestTopics,
  type DecayWarning,
  type ReadinessProjectionPoint,
  type WeakTopic,
} from '@/lib/masteryAnalytics'
import { trackMasteryAnalyticsQuiz } from '@/lib/analytics'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

// Warn about concepts decaying within two weeks — long enough to be actionable,
// short enough to stay urgent.
const DECAY_HORIZON_DAYS = 14
// How many days ahead to project readiness when the learner hasn't set an exam date.
const DEFAULT_PROJECTION_DAYS = 90
const MS_PER_DAY = 24 * 60 * 60 * 1000

const STATE_LABEL: Record<MasteryState, string> = {
  new: 'New',
  level1: 'Level 1',
  level2: 'Level 2',
  level3: 'Level 3',
  forgotten: 'Forgotten',
}

function formatDays(days: number): string {
  const d = Math.max(0, Math.ceil(days))
  if (d <= 1) return 'in 1 day'
  if (d < 14) return `in ${d} days`
  return `in ${Math.round(d / 7)} weeks`
}

function shortDate(d: Date): string {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

// ── Predicted readiness sparkline ────────────────────────────────────────────
// A compact line+area chart of overall readiness from today to the exam date,
// assuming no further study. Same SVG idiom as MiniReadinessRing / the study
// radial — no chart dependency.
function ReadinessProjectionChart({
  points,
  examDate,
}: {
  points: ReadinessProjectionPoint[]
  examDate: Date
}) {
  const W = 320
  const H = 96
  const padX = 6
  const padT = 6
  const padB = 4
  const n = points.length
  const first = points[0]
  const last = points[n - 1]

  const xFor = (i: number) => (n <= 1 ? padX : padX + (i / (n - 1)) * (W - 2 * padX))
  const yFor = (pct: number) => padT + (1 - Math.min(100, Math.max(0, pct)) / 100) * (H - padT - padB)

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xFor(i).toFixed(1)},${yFor(p.overallPct).toFixed(1)}`).join(' ')
  const area = `${line} L${xFor(n - 1).toFixed(1)},${(H - padB).toFixed(1)} L${xFor(0).toFixed(1)},${(H - padB).toFixed(1)} Z`

  const startPct = Math.round(first.overallPct)
  const endPct = Math.round(last.overallPct)
  const dropped = endPct < startPct

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">Predicted readiness</p>
        <p className="text-xs font-semibold tabular-nums">
          {endPct}% <span className="font-normal text-muted-foreground">on {shortDate(examDate)}</span>
        </p>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-1.5 w-full" preserveAspectRatio="none" role="img" aria-label={`Readiness projected to fall to ${endPct}% by the exam`}>
        <path d={area} fill="#22c55e" fillOpacity={0.12} />
        <path d={line} fill="none" stroke="#22c55e" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <circle cx={xFor(0)} cy={yFor(first.overallPct)} r={2.5} fill="#22c55e" />
        <circle cx={xFor(n - 1)} cy={yFor(last.overallPct)} r={2.5} fill={dropped ? '#f59e0b' : '#22c55e'} />
      </svg>
      <div className="flex justify-between text-[10px] tabular-nums text-muted-foreground">
        <span>Today · {startPct}%</span>
        <span>{shortDate(examDate)} · {endPct}%</span>
      </div>
    </div>
  )
}

// ── Card ─────────────────────────────────────────────────────────────────────

interface Props {
  syllabus: WikiExamSyllabus
  /** Mastery records already filtered to the active exam. */
  masteryRecords: ConceptMasteryRecord[]
  /** Exam/target date (YYYY-MM-DD) or null. */
  examDate: string | null
}

/**
 * Learner mastery-analytics card (roadmap P2.5). Collapsed to a one-line summary
 * — how many concepts are fading and current readiness — and expandable into
 * three read-only views derived from the mastery records the Dashboard already
 * loads: concepts about to decay, a predicted exam-readiness-by-date curve, and
 * a weakest-topics ranking whose rows launch a targeted quiz. Hides itself until
 * the learner has some mastery to analyse.
 */
export function MasteryAnalyticsCard({ syllabus, masteryRecords, examDate }: Props) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)

  const { warnings, weak, projection, readinessNow, projectionEnd } = useMemo(() => {
    const now = new Date()
    const warnings = conceptsAboutToDecay(syllabus, masteryRecords, now, DECAY_HORIZON_DAYS)
    const weak = weakestTopics(syllabus, masteryRecords, now, 4)

    // Project to the exam date if it's in the future, else a default horizon.
    const parsed = examDate ? new Date(examDate + 'T00:00:00') : null
    const projectionEnd =
      parsed && parsed.getTime() > now.getTime()
        ? parsed
        : new Date(now.getTime() + DEFAULT_PROJECTION_DAYS * MS_PER_DAY)
    const totalDays = Math.max(1, (projectionEnd.getTime() - now.getTime()) / MS_PER_DAY)
    const stepDays = Math.max(1, Math.ceil(totalDays / 40))
    const projection = projectReadiness(syllabus, masteryRecords, now, projectionEnd, stepDays)

    return { warnings, weak, projection, readinessNow: Math.round(projection[0].overallPct), projectionEnd }
  }, [syllabus, masteryRecords, examDate])

  // Nothing to analyse until the learner has advanced at least one concept.
  const hasProgress = masteryRecords.some(r => r.state !== 'new')
  if (!hasProgress) return null

  const launchConceptQuiz = (concept: string) => {
    trackMasteryAnalyticsQuiz({ source: 'decay_warning', exam: syllabus.examTopic })
    const params = new URLSearchParams({ concept, mode: 'quiz', reveal: 'during', from: 'dashboard' })
    navigate(`/quiz?${params.toString()}`)
  }

  const launchTopicQuiz = (topic: WeakTopic) => {
    trackMasteryAnalyticsQuiz({ source: 'weak_topic', exam: syllabus.examTopic, topic: topic.name })
    const concepts = topic.weakConceptNames.length > 0 ? topic.weakConceptNames : topic.conceptNames
    const params = new URLSearchParams({ exam: syllabus.examTopic, mode: 'quiz', reveal: 'during', from: 'dashboard' })
    params.set('concepts', concepts.join(','))
    navigate(`/quiz?${params.toString()}`)
  }

  return (
    <div className="rounded-2xl border bg-card">
      {/* Header — the whole row toggles the section. */}
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center gap-2 rounded-2xl p-5 text-left transition-colors hover:bg-muted/40"
      >
        <Activity className="h-4 w-4 shrink-0 text-primary" />
        <h2 className="text-sm font-bold tracking-tight">Mastery insights</h2>
        <span className="min-w-0 flex-1 truncate text-xs font-medium tabular-nums text-muted-foreground">
          {warnings.length > 0
            ? `${warnings.length} fading · ${readinessNow}% ready`
            : `${readinessNow}% ready`}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded && (
        <div className="space-y-5 px-5 pb-5">
          {/* About to decay */}
          {warnings.length > 0 && (
            <section>
              <div className="mb-2 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-amber-500" />
                <h3 className="text-xs font-semibold">About to decay</h3>
              </div>
              <ul className="space-y-1.5">
                {warnings.slice(0, 5).map(w => (
                  <DecayRow key={w.concept} warning={w} onReview={() => launchConceptQuiz(w.concept)} />
                ))}
              </ul>
            </section>
          )}

          {/* Predicted readiness by date */}
          <section>
            <ReadinessProjectionChart points={projection} examDate={projectionEnd} />
          </section>

          {/* Weakest topics */}
          {weak.length > 0 && (
            <section>
              <div className="mb-2 flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-primary" />
                <h3 className="text-xs font-semibold">Weakest topics</h3>
              </div>
              <ul className="space-y-2">
                {weak.map(t => (
                  <WeakTopicRow key={t.name} topic={t} onPractice={() => launchTopicQuiz(t)} />
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  )
}

function DecayRow({ warning, onReview }: { warning: DecayWarning; onReview: () => void }) {
  return (
    <li className="flex items-center gap-2">
      <TrendingDown className="h-4 w-4 shrink-0 text-amber-500" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{warning.concept}</p>
        <p className="truncate text-xs text-muted-foreground">
          {STATE_LABEL[warning.currentState]} → {STATE_LABEL[warning.nextState]} {formatDays(warning.daysUntil)}
        </p>
      </div>
      <button
        type="button"
        onClick={onReview}
        className="shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-colors hover:bg-muted"
      >
        Review
      </button>
    </li>
  )
}

function WeakTopicRow({ topic, onPractice }: { topic: WeakTopic; onPractice: () => void }) {
  const pct = Math.round(topic.readinessPct)
  return (
    <li className="flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-sm font-medium">{topic.name}</p>
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{pct}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onPractice}
        className="shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-colors hover:bg-muted"
      >
        Practice
      </button>
    </li>
  )
}
