import { useMemo } from 'react'
import {
  projectReadiness,
  projectReadinessWithPlan,
  type ReadinessProjectionPoint,
} from '@/lib/masteryAnalytics'
import { computeExamReadiness } from '@/lib/readiness'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import type { StudyPlan } from '@/lib/studyPlan'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

// The Dashboard guide's last page, Projected Readiness (DashboardGuideModal).
// The heatmap and registration slides that used to live here were rendered
// nowhere and have been removed.

// How many days ahead to project readiness when there's no exam/target date.
const DEFAULT_PROJECTION_DAYS = 90
const MS_PER_DAY = 24 * 60 * 60 * 1000

function shortDate(d: Date): string {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

// A dashed line+area chart of projected readiness from today to the exam/ready
// date. Dashed to signal it's a prediction.
function ReadinessProjectionChart({
  points,
  endDate,
  withPlan,
}: {
  points: ReadinessProjectionPoint[]
  endDate: Date
  /** Whether the line follows a study plan, or only decay with no more study. */
  withPlan: boolean
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
        <p className="text-xs font-medium text-muted-foreground">
          Projected readiness · {withPlan ? 'if you follow your study plan' : 'if you stop studying today'}
        </p>
        <p className="text-xs font-semibold tabular-nums">
          {endPct}% <span className="font-normal text-muted-foreground">on {shortDate(endDate)}</span>
        </p>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-1.5 w-full" preserveAspectRatio="none" role="img" aria-label={`Readiness projected to reach ${endPct}% by ${shortDate(endDate)} ${withPlan ? 'if you follow your study plan' : 'if you stop studying today'}`}>
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

export function ReadinessProjectionSlide({
  syllabus, masteryRecords, examDate, plan,
}: {
  syllabus: WikiExamSyllabus
  masteryRecords: ConceptMasteryRecord[]
  examDate: string | null
  plan: StudyPlan | null
}) {
  const { projection, readinessNow, projectionEnd } = useMemo(() => {
    const now = new Date()
    const readinessNow = Math.round(computeExamReadiness(syllabus, masteryRecords, now).overallPct)

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

  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tabular-nums leading-none text-primary">{readinessNow}%</span>
        <span className="text-xs text-muted-foreground">ready today</span>
      </div>
      <ReadinessProjectionChart points={projection} endDate={projectionEnd} withPlan={plan !== null} />
      <p className="text-xs text-muted-foreground">
        {plan
          ? "This assumes you finish today's study plan every day."
          : 'With no study plan, this shows your levels stepping down as concepts go unpractised.'}
      </p>
    </div>
  )
}
