// The pictures on the Upgrade page.
//
// Each benefit is shown as a small, static vignette of the surface it opens:
// the day's plan, the strategy picker, the daily podcast, Analytics, a project
// attempt. They are drawn the way the redesigned screens are (style guide
// §13): outlines on the one ground, one text colour, a chosen option a 2px
// outline with the CheckMark, and the answer colours only where answers are
// counted (Analytics). They are pictures, not controls: every one is
// `aria-hidden` and carries no handlers; the card beside it says it in words.
// ListenArt and CoworkArt, at the foot, are for benefits not on the page yet
// and keep the older look until they are.

import { Car, FileSpreadsheet, Headphones, Pause } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { LevelSquare } from '@/components/LevelSquare'
import { LogoTile } from '@/components/LogoTile'
import { ANSWER_FILL } from '@/lib/answerState'
import { examAccentStyle } from '@/lib/examColors'
import { cn } from '@/lib/utils'

/** The frame every vignette sits in, so they read as one set. */
function ArtFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none min-w-0 select-none rounded-[14px] border border-border p-4 text-[13px] leading-tight',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** A track and its fill in the text colour, with an optional tick on it. */
function Track({ pct, tick }: { pct: number; tick?: number }) {
  return (
    <div className="relative h-2 rounded-full bg-border">
      <div className="h-full rounded-full bg-foreground" style={{ width: `${pct}%` }} />
      {tick !== undefined && (
        <span className="absolute -top-1 h-4 w-0.5 bg-foreground" style={{ left: `${tick}%` }} />
      )}
    </div>
  )
}

const PLAN_ROWS: { name: string; done: boolean; level: 'new' | 'level1' }[] = [
  { name: 'Bayes Theorem', done: true, level: 'level1' },
  { name: 'Poisson Distribution', done: true, level: 'level1' },
  { name: 'Annuity Immediate', done: false, level: 'new' },
  { name: 'Loss Development', done: false, level: 'new' },
]

/** The plan: a day's concepts, two done, and the syllabus bar with the plan's tick on it. */
export function StudyPlanArt() {
  return (
    <ArtFrame className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <span className="font-bold">Today</span>
        <span>Exam in 42 days</span>
      </div>
      <ul className="flex flex-col gap-2">
        {PLAN_ROWS.map(row => (
          <li key={row.name} className="flex items-center gap-2.5">
            <LevelSquare state={row.level} size="sm" decorative />
            <span className="min-w-0 flex-1 truncate">{row.name}</span>
            {row.done && <CheckMark className="h-4 w-4 text-foreground" />}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2 pt-1">
        <Track pct={38} tick={36} />
        <div className="flex justify-between">
          <span className="font-semibold">Syllabus 38%</span>
          <span>On pace</span>
        </div>
      </div>
    </ArtFrame>
  )
}

/** The strategy step: the two ways a plan can order the syllabus, one chosen. */
export function StrategyArt() {
  return (
    <ArtFrame className="flex flex-col gap-2">
      <div className="rounded-[12px] border border-border px-3 py-2.5 font-semibold">Syllabus order</div>
      <div className="flex items-center gap-2 rounded-[12px] border-2 border-foreground px-3 py-2.5">
        <span className="min-w-0 flex-1 font-semibold">Heaviest topics first</span>
        <CheckMark className="h-4 w-4 text-foreground" />
      </div>
    </ArtFrame>
  )
}

/**
 * A PCPA attempt under way: the brief's tile (drawn here from its parts so
 * this chunk doesn't carry the brief catalogue), a line of the model in R, and
 * the report against the CAS's word limit.
 */
export function ProjectArt() {
  return (
    <ArtFrame className="flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <LogoTile size="sm" style={examAccentStyle('CAS-PCPA')} className="bg-[var(--exam-accent-vivid)] text-white">
          <Car className="h-3.5 w-3.5" />
        </LogoTile>
        <span className="min-w-0 flex-1 truncate font-bold">Collision Claim Severity</span>
        <span className="shrink-0 rounded-full border border-foreground px-2 py-0.5 text-[12px] font-semibold">Rehearsal</span>
      </div>
      <div className="truncate rounded-[8px] border border-border px-2.5 py-2 font-mono text-[12px]">
        fit &lt;- glm(severity ~ ., family = Gamma(link = &quot;log&quot;))
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="font-semibold">Report</span>
          <span className="tabular-nums">912 / 1,250 words</span>
        </div>
        <Track pct={73} />
      </div>
    </ArtFrame>
  )
}

// A studied day's answers: how many were right, how many missed.
const ANSWER_DAYS: { right: number; missed: number }[] = [
  { right: 3, missed: 3 }, { right: 6, missed: 4 }, { right: 0, missed: 0 },
  { right: 8, missed: 4 }, { right: 6, missed: 2 }, { right: 10, missed: 4 },
  { right: 0, missed: 0 }, { right: 7, missed: 2 }, { right: 9, missed: 2 },
  { right: 6, missed: 1 },
]

/** Analytics: accuracy over a span, each day's answers, and the marks a section cost. */
export function AnalyticsArt() {
  const max = Math.max(...ANSWER_DAYS.map(d => d.right + d.missed))
  return (
    <ArtFrame className="flex flex-col gap-3">
      <div className="flex items-baseline gap-2">
        <span className="text-[28px] font-bold leading-none tabular-nums">74%</span>
        <span className="min-w-0 flex-1 font-medium">accuracy</span>
        <span>30 days</span>
      </div>
      <div className="flex h-12 items-end gap-1">
        {ANSWER_DAYS.map((d, i) => (
          <div key={i} className="flex h-full flex-1 flex-col justify-end gap-0.5">
            {d.missed > 0 && (
              <div className={cn('rounded-sm', ANSWER_FILL.incorrect)} style={{ height: `${(d.missed / max) * 100}%` }} />
            )}
            {d.right > 0 && (
              <div className={cn('rounded-sm', ANSWER_FILL.correct)} style={{ height: `${(d.right / max) * 100}%` }} />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-baseline justify-between border-t border-border pt-3">
        <span className="font-semibold">Marks lost</span>
        <span className="truncate pl-3">Loss Development 4.5</span>
      </div>
    </ArtFrame>
  )
}

/** The daily podcast, playing, over the concept it is on. */
export function PodcastArt() {
  return (
    <ArtFrame className="flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-foreground">
          <Headphones className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1 truncate font-bold">Listen to today’s plan</span>
        <span className="shrink-0">11 min</span>
      </div>
      <div className="flex flex-col gap-2">
        <Track pct={38} />
        <div className="flex justify-between">
          <span className="truncate">Poisson Distribution</span>
          <span className="shrink-0 tabular-nums">4:12 / 11:03</span>
        </div>
      </div>
    </ArtFrame>
  )
}

const OLD_FRAME = 'rounded-lg border-0 bg-muted/50 p-3 ring-1 ring-border/60'

// Bar heights for the waveform, as a fraction of the track.
const WAVE = [0.35, 0.6, 0.9, 0.5, 0.75, 1, 0.65, 0.4, 0.8, 0.55, 0.95, 0.7, 0.45, 0.6, 0.3, 0.5, 0.25, 0.35, 0.2, 0.3]
const PLAYED = 11

/** Listen — a page read aloud, the sentence being spoken highlighted. */
export function ListenArt() {
  return (
    <ArtFrame className={OLD_FRAME}>
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
    <ArtFrame className={cn(OLD_FRAME, 'bg-violet-500/5 ring-violet-500/20')}>
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
