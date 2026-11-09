// The pictures on the Upgrade page.
//
// Each benefit is shown as a small, static vignette of the surface it unlocks —
// the day's plan, the strategy picker, today's plan as a quiz, the daily
// podcast, accuracy analytics, a project attempt, Listen —
// drawn from the same tokens and marks as the real thing (CheckMark), so what a reader is shown here is what
// they get after checkout. They are pictures, not controls: every one is
// `aria-hidden` and carries no handlers; the card beside it says it in words.

import { ArrowUp, BookOpen, CalendarCheck, Car, Circle, FileSpreadsheet, Headphones, Pause, Sparkles } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { LogoTile } from '@/components/LogoTile'
import { examAccentStyle } from '@/lib/examColors'
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
          <div className="text-[11px] font-medium">Syllabus order</div>
          <div className="truncate text-[10px] text-muted-foreground">Concepts as the syllabus lists them</div>
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

/** The quiz builder's source picker, Today's Plan chosen, and its start. */
export function PlanQuizArt() {
  return (
    <ArtFrame>
      <div className="rounded-md bg-card p-3 shadow-sm space-y-2.5">
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-0.5 rounded-md bg-muted p-0.5 text-[10px]">
          <div className="flex items-center justify-center gap-1 rounded bg-background px-1.5 py-1 font-medium shadow-sm">
            <CalendarCheck className="h-3 w-3 shrink-0" />
            <span className="truncate">Today's Study Plan</span>
          </div>
          <div className="truncate px-1.5 py-1 text-center text-muted-foreground">Practice Exam</div>
          <div className="truncate px-1.5 py-1 text-center text-muted-foreground">Past Papers</div>
        </div>
        <div className="flex flex-wrap gap-1">
          {['Bayes Theorem', 'Poisson Distribution', 'Annuity Immediate', 'Loss Development'].map(c => (
            <span key={c} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">{c}</span>
          ))}
        </div>
        <div className="rounded-md bg-foreground py-1.5 text-center text-[11px] font-medium text-background">
          Start quiz · 8 questions
        </div>
      </div>
    </ArtFrame>
  )
}

// Share of answers right per studied day, and how many were answered.
const ACCURACY_DAYS: { rate: number; answers: number }[] = [
  { rate: 0.55, answers: 6 }, { rate: 0.6, answers: 10 }, { rate: 0, answers: 0 },
  { rate: 0.65, answers: 12 }, { rate: 0.7, answers: 8 }, { rate: 0.68, answers: 14 },
  { rate: 0, answers: 0 }, { rate: 0.75, answers: 9 }, { rate: 0.8, answers: 11 },
  { rate: 0.78, answers: 7 },
]

/** The Dashboard's Accuracy card — a rate, its movement, a trend, the weak spot. */
export function AnalyticsArt() {
  const max = Math.max(...ACCURACY_DAYS.map(d => d.answers))
  return (
    <ArtFrame>
      <div className="rounded-md bg-card p-3 shadow-sm">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-semibold">Accuracy</span>
          <span className="text-[10px] text-muted-foreground">Last 30 days</span>
        </div>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="text-lg font-bold tabular-nums leading-none">74%</span>
          <span className="flex items-center text-[10px] font-medium text-green-600 dark:text-green-400">
            <ArrowUp className="h-3 w-3" />9 pts
          </span>
        </div>
        <div className="mt-2 flex h-10 items-end gap-1">
          {ACCURACY_DAYS.map((d, i) => (
            <div key={i} className="flex h-full flex-1 items-end">
              {d.answers > 0 && (
                <div
                  className="w-full rounded-sm bg-primary/70"
                  style={{ height: `${Math.round((d.answers / max) * d.rate * 100 + 15)}%` }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex items-center justify-between rounded bg-muted/60 px-2 py-1 text-[10px]">
          <span className="truncate">Weakest: Loss Development</span>
          <span className="shrink-0 tabular-nums text-muted-foreground">48%</span>
        </div>
      </div>
    </ArtFrame>
  )
}

/**
 * The daily podcast — the plan card's "Listen to today's plan" row
 * (components/podcast/PodcastButton.tsx), playing, over the concept it's on.
 */
export function PodcastArt() {
  return (
    <ArtFrame>
      <div className="rounded-md bg-card p-3 shadow-sm">
        <div className="flex items-center gap-2.5 rounded-md bg-muted/60 px-2.5 py-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Headphones className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-medium">Playing today's study plan</div>
            <div className="text-[10px] text-muted-foreground">4 concepts · 11 min</div>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span className="truncate">Poisson Distribution</span>
            <span className="shrink-0 tabular-nums">4:12 / 11:03</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[38%] rounded-full bg-primary" />
          </div>
        </div>
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
