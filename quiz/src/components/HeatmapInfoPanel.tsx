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

// The heatmap/readiness explainer slides. The modal that used to wrap them
// (opened from the Study Schedule card's info button) is gone —
// DashboardGuideModal renders ReadinessProjectionSlide as its last page.

// How many days ahead to project readiness when there's no exam/target date.
const DEFAULT_PROJECTION_DAYS = 90
const MS_PER_DAY = 24 * 60 * 60 * 1000

export function HeatmapOverviewSlide() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Each square represents one day of study. When you have an active study plan, the brightness shows how much of your daily concept quota you completed that day.
      </p>
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-start gap-2.5">
          <span className="inline-block h-4 w-4 rounded-[2px] shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(34,197,94,0.25)' }} />
          <span>Studied this day; daily plan quota not yet met</span>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="inline-block h-4 w-4 rounded-[2px] shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(34,197,94,0.65)' }} />
          <span>Good session; roughly half of the daily plan complete</span>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="inline-block h-4 w-4 rounded-[2px] shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(34,197,94,1)' }} />
          <span>Daily plan fully completed (or any active day if no plan is configured)</span>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="inline-block h-4 w-4 rounded-[2px] bg-muted/30 shrink-0 mt-0.5" />
          <span>No activity</span>
        </div>
      </div>
    </div>
  )
}

export function ExamDatesSlide() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-primary/5 px-3 py-2.5 space-y-1.5">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary/70 shrink-0" />
          Exam Date <span className="text-muted-foreground font-normal">(blue highlight)</span>
        </div>
        <p className="text-sm text-muted-foreground">
          The actual date of your exam sitting.
        </p>
      </div>
      <div className="rounded-lg bg-amber-400/5 px-3 py-2.5 space-y-1.5">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400 shrink-0" />
          Target Ready Date <span className="text-muted-foreground font-normal">(amber highlight)</span>
        </div>
        <p className="text-sm text-muted-foreground">
          The date you want to feel fully prepared by, typically a few weeks before your exam.
        </p>
      </div>
    </div>
  )
}

function shortDate(d: Date): string {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

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
      <ReadinessProjectionChart points={projection} endDate={projectionEnd} />
      <p className="text-xs text-muted-foreground">
        This projection assumes you complete each day's study plan on schedule. Readiness is weighted by both topic weight and how deeply you've mastered each concept.
      </p>
    </div>
  )
}

export function RegistrationSlide() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Actuarial exams are offered at fixed sittings throughout the year through the SOA and CAS.
      </p>
      <div className="space-y-2.5 text-sm">
        <div className="rounded-lg bg-muted/30 px-3 py-2.5 space-y-1">
          <p className="font-semibold">SOA Exams (P, FM, IFM, LTAM, STAM, SRM, PA)</p>
          <p className="text-muted-foreground">Register at soa.org. Most exams have multiple sittings per year.</p>
        </div>
        <div className="rounded-lg bg-muted/30 px-3 py-2.5 space-y-1">
          <p className="font-semibold">CAS Exams (Exams 1–9)</p>
          <p className="text-muted-foreground">Register at casact.org. Check the exam calendar for sitting dates.</p>
        </div>
      </div>
    </div>
  )
}
