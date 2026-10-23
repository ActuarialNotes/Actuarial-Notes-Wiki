// The pictures on the Upgrade page.
//
// Each benefit is shown as a small, static vignette of the surface it unlocks —
// the day's plan, the strategy picker, a concept's level history, a project
// attempt, the exams still being built, Listen —
// drawn from the same tokens and marks as the real thing (CheckMark, the
// mastery greens), so what a reader is shown here is what
// they get after checkout. They are pictures, not controls: every one is
// `aria-hidden` and carries no handlers; the card beside it says it in words.

import { BookOpen, Car, Circle, FileSpreadsheet, Pause, Sparkles } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import { LogoTile } from '@/components/LogoTile'
import { examAccentStyle } from '@/lib/examColors'
import { EXAM_STATUS_LABEL, examStatus } from '@/lib/examStatus'
import { cn } from '@/lib/utils'

/** The frame every vignette sits in, so the four read as one set. */
function ArtFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none select-none rounded-lg bg-muted/50 p-3 ring-1 ring-border/60',
        className,
      )}
    >
      {children}
    </div>
  )
}

const PLAN_ROWS: { name: string; done: boolean; target: string }[] = [
  { name: 'Bayes Theorem', done: true, target: 'Level 2' },
  { name: 'Poisson Distribution', done: true, target: 'Level 1' },
  { name: 'Annuity Immediate', done: false, target: 'Level 1' },
  { name: 'Loss Development', done: false, target: 'Level 1' },
]

/** Today's Study Plan — a day's concepts, two ticked off, on a pace bar. */
export function StudyPlanArt() {
  return (
    <ArtFrame>
      <div className="rounded-md bg-card p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold">Today's Study Plan</span>
          <span className="text-[10px] font-medium text-green-600 dark:text-green-400">2 of 4</span>
        </div>
        <ul className="mt-2 space-y-1">
          {PLAN_ROWS.map(row => (
            <li key={row.name} className="flex items-center gap-2">
              {row.done ? (
                <CheckMark className="h-3.5 w-3.5" />
              ) : (
                <Circle className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
              )}
              <span
                className={cn(
                  'min-w-0 flex-1 truncate text-[11px]',
                  row.done && 'text-muted-foreground line-through decoration-muted-foreground/40',
                )}
              >
                {row.name}
              </span>
              <span className="shrink-0 text-[10px] text-muted-foreground">→ {row.target}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 space-y-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[62%] rounded-full bg-green-500" />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>On pace</span>
            <span>Exam in 42 days</span>
          </div>
        </div>
      </div>
    </ArtFrame>
  )
}

/** The strategy step — the two ways a plan can order the syllabus. */
export function StrategyArt() {
  return (
    <ArtFrame className="space-y-2">
      <div className="flex items-center gap-2.5 rounded-md bg-card p-2.5 shadow-sm">
        <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-medium">Master everything</div>
          <div className="truncate text-[10px] text-muted-foreground">In the order the syllabus teaches it</div>
        </div>
      </div>
      <div className="flex items-center gap-2.5 rounded-md bg-card p-2.5 shadow-sm ring-2 ring-amber-400/70">
        <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-medium">Heaviest topics first</div>
          <div className="truncate text-[10px] text-muted-foreground">What the exam weights most</div>
        </div>
        <CheckMark className="h-4 w-4" />
      </div>
    </ArtFrame>
  )
}

// A concept's level over a few weeks: New, up through L1 and L2, a dip to
// Forgotten, then back and on to L3 — the ladder the progress graph draws.
const LEVELS = ['New', 'L1', 'L2', 'L3'] as const
const STEPS: { x: number; level: number; forgotten?: boolean }[] = [
  { x: 0, level: 0 },
  { x: 40, level: 1 },
  { x: 90, level: 2 },
  { x: 140, level: 1, forgotten: true },
  { x: 175, level: 2 },
  { x: 220, level: 3 },
]

/** Learning progress — a concept's mastery climbing the ladder over time. */
export function ProgressArt() {
  const W = 240
  const H = 84
  const y = (level: number) => H - 8 - level * ((H - 16) / 3)
  let path = `M ${STEPS[0].x} ${y(STEPS[0].level)}`
  for (let i = 1; i < STEPS.length; i++) {
    path += ` H ${STEPS[i].x} V ${y(STEPS[i].level)}`
  }
  path += ` H ${W}`
  return (
    <ArtFrame>
      <div className="rounded-md bg-card p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold">Chain Ladder Method</span>
          <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
            Level 3
          </span>
        </div>
        <div className="mt-2 flex gap-2">
          <div className="flex flex-col justify-between py-0.5 text-[9px] leading-none text-muted-foreground">
            {[...LEVELS].reverse().map(l => <span key={l}>{l}</span>)}
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="h-[84px] w-full" preserveAspectRatio="none">
            {LEVELS.map((_, i) => (
              <line
                key={i}
                x1={0}
                x2={W}
                y1={y(i)}
                y2={y(i)}
                className="stroke-border"
                strokeWidth={1}
                strokeDasharray="2 3"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path
              d={path}
              fill="none"
              className="stroke-green-500"
              strokeWidth={2}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            {STEPS.slice(1).map(s => (
              <circle
                key={s.x}
                cx={s.x}
                cy={y(s.level)}
                r={3}
                className={s.forgotten ? 'fill-amber-500' : 'fill-green-500'}
              />
            ))}
          </svg>
        </div>
      </div>
    </ArtFrame>
  )
}

/**
 * A PCPA attempt under way — the brief's tile (the Projects tab's, drawn here
 * from its parts so the entry chunk doesn't carry the brief catalogue), a line
 * of the model in R, and the report against the CAS's word limit.
 */
export function ProjectArt() {
  return (
    <ArtFrame>
      <div className="rounded-md bg-card p-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <LogoTile size="sm" style={examAccentStyle('CAS-PCPA')} className="bg-[var(--exam-accent-vivid)] text-white shadow-sm">
            <Car className="h-3.5 w-3.5" />
          </LogoTile>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-semibold">Collision Claim Severity</div>
            <div className="text-[10px] text-muted-foreground">Rehearsal · 10 days left</div>
          </div>
        </div>
        <div className="mt-2.5 truncate rounded bg-muted px-2 py-1.5 font-mono text-[10px]">
          <span className="text-muted-foreground">fit &lt;- </span>glm(severity ~ ., family = Gamma(link = &quot;log&quot;))
        </div>
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Report</span>
            <span>912 / 1,250 words</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[73%] rounded-full bg-[var(--exam-accent-vivid)]" style={examAccentStyle('CAS-PCPA')} />
          </div>
        </div>
      </div>
    </ArtFrame>
  )
}

// Exams still being filled out. Their tags are read from `examStatus`, so the
// picture can't claim an exam is unfinished after it has been promoted — drop
// one from this list once it reads ready.
const BUILDING: { examKey: string; examId?: string; name: string }[] = [
  { examKey: 'MAS-II', name: 'MAS-II' },
  { examKey: 'CAS-5', name: 'Exam 5' },
  { examKey: 'CAS-9', name: 'Exam 9' },
  { examKey: 'CAS-6', examId: '6U', name: 'Exam 6U' },
]

/** The exams the subscription goes into: still in beta or in development. */
export function FundArt() {
  return (
    <ArtFrame>
      <div className="rounded-md bg-card p-3 shadow-sm">
        <div className="text-xs font-semibold">Still being built</div>
        <ul className="mt-2 grid grid-cols-2 gap-1.5">
          {BUILDING.map(({ examKey, examId, name }) => {
            const status = examStatus(examKey, examId)
            const label = EXAM_STATUS_LABEL[status]
            return (
              <li key={name} className="flex items-center gap-2 rounded-md bg-muted/60 p-1.5">
                <ExamLogo examKey={examKey} size="sm" muted={status === 'development'} />
                <div className="min-w-0">
                  <div className="truncate text-[11px] font-medium">{name}</div>
                  {label && <div className="truncate text-[9px] text-muted-foreground">{label}</div>}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </ArtFrame>
  )
}

// Bar heights for the waveform, as a fraction of the track.
const WAVE = [0.35, 0.6, 0.9, 0.5, 0.75, 1, 0.65, 0.4, 0.8, 0.55, 0.95, 0.7, 0.45, 0.6, 0.3, 0.5, 0.25, 0.35, 0.2, 0.3]
const PLAYED = 11

/** Listen — a page read aloud, the sentence being spoken highlighted. */
export function ListenArt() {
  return (
    <ArtFrame>
      <div className="rounded-md bg-card p-3 shadow-sm">
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          The chain ladder method projects{' '}
          <span className="rounded-sm bg-primary/15 px-0.5 text-foreground">
            ultimate losses from historical development patterns
          </span>
          , assuming future development will follow the past.
        </p>
        <div className="mt-3 flex items-center gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
            <Pause className="h-3.5 w-3.5" fill="currentColor" />
          </span>
          <div className="flex h-7 flex-1 items-center gap-[3px]">
            {WAVE.map((h, i) => (
              <span
                key={i}
                className={cn('w-full rounded-full', i < PLAYED ? 'bg-foreground' : 'bg-muted-foreground/30')}
                style={{ height: `${h * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </ArtFrame>
  )
}

/** Cowork — a deliverable's exhibit, columns laid out and ready for Excel. */
export function CoworkArt() {
  return (
    <ArtFrame className="bg-violet-500/5 ring-violet-500/20">
      <div className="rounded-md bg-card p-2.5 shadow-sm">
        <div className="mb-2 flex items-center gap-1.5">
          <FileSpreadsheet className="h-3.5 w-3.5 text-violet-500" />
          <span className="text-[11px] font-medium">Rate indication.xlsx</span>
        </div>
        <div className="grid grid-cols-4 gap-px overflow-hidden rounded-sm bg-border text-[9px]">
          {['Year', 'Premium', 'Losses', 'Ratio'].map(h => (
            <div key={h} className="bg-muted px-1.5 py-1 font-semibold">{h}</div>
          ))}
          {[2022, 2023, 2024].map(yr => (
            <div key={yr} className="contents">
              <div className="bg-card px-1.5 py-1 text-muted-foreground">{yr}</div>
              <div className="bg-card px-1.5 py-1" />
              <div className="bg-card px-1.5 py-1" />
              <div className="bg-card px-1.5 py-1" />
            </div>
          ))}
        </div>
      </div>
    </ArtFrame>
  )
}
