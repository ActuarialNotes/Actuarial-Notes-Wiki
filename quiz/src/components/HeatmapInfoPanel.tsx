import { useMemo, useState } from 'react'
import { X, BarChart2, Calendar, ClipboardList, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'
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
}

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

export function HeatmapInfoPanel({ open, onClose, syllabus, masteryRecords, examDate, plan }: Props) {
  const [slide, setSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)

  if (!open) return null

  const slides = [
    { Icon: BarChart2, title: 'Your Activity Heatmap', Content: HeatmapOverviewSlide },
    { Icon: Calendar, title: 'Exam Date vs. Target Ready Date', Content: ExamDatesSlide },
    {
      Icon: TrendingUp,
      title: 'Predicted Readiness',
      Content: () => <ReadinessProjectionSlide syllabus={syllabus} masteryRecords={masteryRecords} examDate={examDate} plan={plan} />,
    },
    { Icon: ClipboardList, title: 'Registering for Exams', Content: RegistrationSlide },
  ]

  const total = slides.length
  const { Icon, title } = slides[slide]
  const prev = () => setSlide(s => Math.max(0, s - 1))
  const next = () => setSlide(s => Math.min(total - 1, s + 1))

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Exam heatmap information"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-lg bg-card rounded-xl shadow-2xl flex flex-col my-12">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 h-12 shrink-0">
          <Icon className="h-4 w-4 text-primary shrink-0" />
          <span className="flex-1 font-semibold text-sm">{title}</span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 transition-colors rounded-md hover:bg-muted/50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Slide content: all slides stacked in the same grid cell so the
            container always sizes to the tallest slide, keeping the footer
            buttons from shifting as the user navigates. */}
        <div
          className="grid p-5 text-sm leading-relaxed"
          onTouchStart={e => setTouchStart(e.touches[0].clientX)}
          onTouchEnd={e => {
            const diff = touchStart - e.changedTouches[0].clientX
            if (Math.abs(diff) > 40) { diff > 0 ? next() : prev() }
          }}
        >
          {slides.map(({ Content: SlideContent }, i) => (
            <div
              key={i}
              className="col-start-1 row-start-1"
              style={i === slide ? undefined : { visibility: 'hidden', pointerEvents: 'none' }}
              aria-hidden={i === slide ? undefined : true}
            >
              <SlideContent />
            </div>
          ))}
        </div>

        {/* Footer: prev / dots / next-or-got-it */}
        <div className="px-5 pb-5 flex items-center justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={slide === 0}
            className="p-2.5 rounded-full bg-muted/40 text-foreground hover:bg-muted disabled:opacity-30 disabled:hover:bg-muted/40 transition-colors shadow-sm"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-1.5 items-center">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${i === slide ? 'w-4 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'}`}
              />
            ))}
          </div>
          {slide < total - 1 ? (
            <button
              type="button"
              onClick={next}
              className="p-2.5 rounded-full bg-muted/40 text-foreground hover:bg-muted transition-colors shadow-sm"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Got it
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
