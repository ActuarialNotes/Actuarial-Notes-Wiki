import { useMemo } from 'react'
import { TrendingUp, X } from 'lucide-react'
import {
  projectReadiness,
  projectReadinessWithPlan,
  type ReadinessProjectionPoint,
} from '@/lib/masteryAnalytics'
import { computeReadiness } from '@/lib/readiness'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import type { StudyPlan } from '@/lib/studyPlan'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

// How many days ahead to project readiness when there's no exam/target date.
const DEFAULT_PROJECTION_DAYS = 90
const MS_PER_DAY = 24 * 60 * 60 * 1000

function shortDate(d: Date): string {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

// ── Predicted readiness chart ─────────────────────────────────────────────────
// A dashed line+area chart of projected readiness from today to the exam/ready
// date. Dashed to signal it's a prediction.
function ReadinessProjectionChart({
  points,
  endDate,
}: {
  points: ReadinessProjectionPoint[]
  endDate: Date
}) {
  const W = 320
  const H = 120
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

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">Predicted readiness · if you follow your plan</p>
        <p className="text-xs font-semibold tabular-nums">
          {endPct}% <span className="font-normal text-muted-foreground">on {shortDate(endDate)}</span>
        </p>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-1.5 w-full" preserveAspectRatio="none" role="img" aria-label={`Readiness projected to reach ${endPct}% by ${shortDate(endDate)} if you follow your study plan`}>
        <path d={area} fill="#22c55e" fillOpacity={0.1} />
        <path
          d={line}
          fill="none"
          stroke="#22c55e"
          strokeWidth={2}
          strokeDasharray="4 3"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx={xFor(0)} cy={yFor(first.overallPct)} r={2.5} fill="#22c55e" />
        <circle cx={xFor(n - 1)} cy={yFor(last.overallPct)} r={2.5} fill="#22c55e" />
      </svg>
      <div className="flex justify-between text-[10px] tabular-nums text-muted-foreground">
        <span>Today · {startPct}%</span>
        <span>{shortDate(endDate)} · {endPct}%</span>
      </div>
    </div>
  )
}

// ── Modal ─────────────────────────────────────────────────────────────────────

interface Props {
  open: boolean
  onClose: () => void
  syllabus: WikiExamSyllabus
  /** Mastery records already filtered to the active exam. */
  masteryRecords: ConceptMasteryRecord[]
  /** Exam/target date (YYYY-MM-DD) or null. */
  examDate: string | null
  /** The active exam's study plan, used to project readiness assuming completion. */
  plan: StudyPlan | null
  /** Optional secondary action — jump to the full study-guide radial on the Dashboard. */
  onViewStudyGuide?: () => void
}

/**
 * Predicted-readiness popup opened from the Dashboard readiness stat. Shows the
 * projected exam-readiness curve (assuming today's study plan is completed on
 * schedule), plus the current readiness score. Computes the projection the same
 * way the Mastery insights card used to, reading only data the Dashboard already
 * loads (mastery records + syllabus + plan) — no new fetch.
 */
export function ReadinessProjectionModal({
  open, onClose, syllabus, masteryRecords, examDate, plan, onViewStudyGuide,
}: Props) {
  const { projection, readinessNow, projectionEnd } = useMemo(() => {
    const now = new Date()
    const readinessNow = Math.round(computeReadiness(syllabus, masteryRecords, now).overallPct)

    // Project to the exam date if it's in the future, else the plan's ready date,
    // else a default horizon.
    const parsedExam = examDate ? new Date(examDate + 'T00:00:00') : null
    const planEnd = plan?.effectiveReadyDate ? new Date(plan.effectiveReadyDate + 'T00:00:00') : null
    const projectionEnd =
      parsedExam && parsedExam.getTime() > now.getTime()
        ? parsedExam
        : planEnd && planEnd.getTime() > now.getTime()
          ? planEnd
          : new Date(now.getTime() + DEFAULT_PROJECTION_DAYS * MS_PER_DAY)

    const totalDays = Math.max(1, (projectionEnd.getTime() - now.getTime()) / MS_PER_DAY)
    const stepDays = Math.max(1, Math.ceil(totalDays / 40))
    const projection = plan
      ? projectReadinessWithPlan(syllabus, masteryRecords, plan, now, projectionEnd, stepDays)
      : projectReadiness(syllabus, masteryRecords, now, projectionEnd, stepDays)

    return { projection, readinessNow, projectionEnd }
  }, [syllabus, masteryRecords, examDate, plan])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Predicted readiness"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-sm bg-card border rounded-xl shadow-2xl flex flex-col my-16">
        <div className="flex items-center gap-2 px-4 h-12 border-b shrink-0">
          <TrendingUp className="h-4 w-4 text-primary shrink-0" />
          <span className="flex-1 font-semibold text-sm">Predicted Readiness</span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 transition-colors rounded-md hover:bg-muted/50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5 space-y-4 text-sm leading-relaxed">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tabular-nums leading-none text-primary">{readinessNow}%</span>
            <span className="text-xs text-muted-foreground">ready today</span>
          </div>

          <section>
            <ReadinessProjectionChart points={projection} endDate={projectionEnd} />
          </section>

          <p className="text-xs text-muted-foreground">
            This projection assumes you complete each day's study plan on schedule. Readiness is weighted by both topic weight and how deeply you've mastered each concept.
          </p>
        </div>
        <div className="px-5 pb-5 flex justify-end gap-2">
          {onViewStudyGuide && (
            <button
              type="button"
              onClick={() => { onViewStudyGuide(); onClose() }}
              className="rounded-md px-3 py-1.5 text-sm font-medium border hover:bg-muted transition-colors"
            >
              View study guide
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
