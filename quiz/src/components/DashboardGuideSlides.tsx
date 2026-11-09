import type { ComponentType } from 'react'
import { CalendarDays, ChevronRight, Gauge, ListChecks } from 'lucide-react'
import { MasteryBadge } from '@/components/MasteryBadge'
import { MASTERY_FILL } from '@/lib/masteryBadge'
import { DECAY_DAYS_LEVEL1, DECAY_DAYS_LEVEL2, DECAY_DAYS_LEVEL3, type MasteryState } from '@/lib/mastery'
import { cn } from '@/lib/utils'

// The Dashboard guide's explainer slides (DashboardGuideModal, behind the "?"
// in the Dashboard header). Every fact here is the app's own rule, read from
// where it lives: the ladder and decay from lib/mastery.ts
// (docs/concept-learning-progression.md), the plan's pacing from
// lib/studyPlan.ts (docs/study-plan-generation.md — up to five introductions a
// day, Level 1 reviewed a day later, Level 2 two days later), and the credit
// per level from lib/readiness.ts (docs/exam-readiness.md). Change one of
// those and this copy has to change with it.

const Arrow = () => <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />

// ─── 1 · How It Works ────────────────────────────────────────────────────────

// The levels step draws a tiny ladder of the mastery fills instead of an icon.
const LOOP: { Icon: ComponentType<{ className?: string }> | null; label: string }[] = [
  { Icon: CalendarDays, label: 'Study plan' },
  { Icon: ListChecks, label: 'Quiz' },
  { Icon: null, label: 'Levels' },
  { Icon: Gauge, label: 'Readiness' },
]

function LoopVisual() {
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {LOOP.map(({ Icon, label }, i) => (
        <div key={label} className="flex items-center gap-1 flex-1 min-w-0">
          <div className="flex-1 min-w-0 rounded-lg bg-muted/40 px-1 py-2.5 flex flex-col items-center gap-1.5">
            {Icon ? (
              <Icon className="h-4 w-4 text-primary" />
            ) : (
              <span className="flex items-end gap-0.5 h-4">
                {(['level1', 'level2', 'level3'] as const).map((s, k) => (
                  <span key={s} className={cn('w-1.5 rounded-sm', MASTERY_FILL[s])} style={{ height: `${(k + 1) * 33}%` }} />
                ))}
              </span>
            )}
            <span className="text-xs font-medium truncate">{label}</span>
          </div>
          {i < LOOP.length - 1 && <Arrow />}
        </div>
      ))}
    </div>
  )
}

export function HowItWorksSlide() {
  return (
    <div className="space-y-4">
      <LoopVisual />
      <p className="text-muted-foreground">
        Every exam's syllabus is split into concepts, about one idea each. Answer quiz questions on a concept and it
        climbs from New to Level 3. Your study plan picks which concepts to practise each day, and your readiness score
        adds up your levels across the syllabus, weighted the way the exam weights it. 100% means every concept is at
        Level 3.
      </p>
    </div>
  )
}

// ─── 2 · Concept Levels ──────────────────────────────────────────────────────

const LADDER: { state: MasteryState; desc: string }[] = [
  { state: 'new', desc: 'Not answered yet.' },
  { state: 'level1', desc: 'Your first correct answer. Its flashcard joins your collection.' },
  { state: 'level2', desc: 'Correct again on a later day.' },
  { state: 'level3', desc: 'Correct on a third day.' },
  { state: 'forgotten', desc: 'Three wrong answers in a row, or left too long. One correct answer brings it back to Level 1.' },
]

const DECAY: { from: MasteryState; days: number }[] = [
  { from: 'level3', days: DECAY_DAYS_LEVEL3 },
  { from: 'level2', days: DECAY_DAYS_LEVEL2 },
  { from: 'level1', days: DECAY_DAYS_LEVEL1 },
]

export function ConceptLevelsSlide() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Each concept moves up one level per day at most, so a concept you know well still takes three days to reach
        Level 3.
      </p>
      <ul className="space-y-1.5">
        {LADDER.map(({ state, desc }) => (
          <li key={state} className="flex items-start gap-2.5">
            <span className="w-[4.75rem] shrink-0 mt-px">
              <MasteryBadge state={state} size="sm" />
            </span>
            <span className="text-muted-foreground">{desc}</span>
          </li>
        ))}
      </ul>
      <p className="text-muted-foreground">
        A level lasts as long as you keep answering correctly. Leave a concept alone and it steps down:
      </p>
      <div className="flex items-center gap-1 flex-wrap" aria-label={`Level 3 to Level 2 after ${DECAY_DAYS_LEVEL3} days, Level 2 to Level 1 after ${DECAY_DAYS_LEVEL2} more, Level 1 to Forgotten after ${DECAY_DAYS_LEVEL1} more`}>
        {DECAY.map(({ from, days }) => (
          <span key={from} className="flex items-center gap-1" aria-hidden="true">
            <MasteryBadge state={from} compact size="sm" />
            <span className="flex flex-col items-center px-0.5">
              <span className="text-[11px] text-muted-foreground tabular-nums leading-none">{days} days</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            </span>
          </span>
        ))}
        <span aria-hidden="true"><MasteryBadge state="forgotten" size="sm" /></span>
      </div>
    </div>
  )
}

// ─── 3 · Today's Study Plan ──────────────────────────────────────────────────

// One concept's first four days: introduced, reviewed the next day, a day off
// (Level 2 waits two days), then reviewed to Level 3.
const PLAN_DAYS: { day: number; reach: MasteryState | null }[] = [
  { day: 1, reach: 'level1' },
  { day: 2, reach: 'level2' },
  { day: 3, reach: null },
  { day: 4, reach: 'level3' },
]

export function StudyPlanSlide() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-1.5" role="img" aria-label="One concept: Level 1 on day 1, Level 2 on day 2, nothing on day 3, Level 3 on day 4">
        {PLAN_DAYS.map(({ day, reach }) => (
          <div
            key={day}
            className={cn(
              'rounded-lg px-1 py-2.5 flex flex-col items-center gap-1.5',
              'border', reach ? 'bg-muted/40 border-transparent' : 'border-dashed border-border',
            )}
          >
            <span className="text-xs font-medium text-muted-foreground">Day {day}</span>
            {reach ? (
              <MasteryBadge state={reach} size="sm" />
            ) : (
              <span className="text-xs text-muted-foreground/60 leading-5">Rest</span>
            )}
          </div>
        ))}
      </div>
      <p className="text-muted-foreground">
        The plan works back from your ready date. It brings in up to five new concepts a day and books each
        one's reviews: the next day for Level 2, then two days after that for Level 3. Concepts that are slipping come
        first, and a Level 3 concept gets a refresher before it would step down.
      </p>
    </div>
  )
}

// ─── 4 · Exam Readiness ──────────────────────────────────────────────────────

const CREDIT: { state: MasteryState; share: number; label: string }[] = [
  { state: 'level1', share: 1 / 3, label: '⅓' },
  { state: 'level2', share: 2 / 3, label: '⅔' },
  { state: 'level3', share: 1, label: 'Full' },
]

export function ExamReadinessSlide() {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5" role="img" aria-label="Credit per concept: a third at Level 1, two-thirds at Level 2, full at Level 3">
        {CREDIT.map(({ state, share, label }) => (
          <div key={state} className="flex items-center gap-2.5">
            <span className="w-[4.75rem] shrink-0"><MasteryBadge state={state} size="sm" /></span>
            <span className="flex-1 h-2 rounded-full bg-muted/50 overflow-hidden">
              <span className={cn('block h-full rounded-full', MASTERY_FILL[state])} style={{ width: `${share * 100}%` }} />
            </span>
            <span className="w-8 text-right text-xs font-medium tabular-nums">{label}</span>
          </div>
        ))}
      </div>
      <p className="text-muted-foreground">
        Each concept counts a third at Level 1, two-thirds at Level 2 and in full at Level 3. A topic worth 30% of the
        exam counts three times as much as one worth 10%. Concepts that slip down a level take their credit with them,
        so the score can go down as well as up.
      </p>
    </div>
  )
}
