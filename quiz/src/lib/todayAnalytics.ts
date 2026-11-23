// The redesigned **Analytics** screen's drawing maths (docs/redesign-spec.md
// §4.5; `components/today/AnalyticsScreen.tsx`). Every figure on that screen is
// one the libs beside this already compute (`accuracyTrend.ts`,
// `performanceAnalytics.ts`, `analyticsSummary.ts`); this module only turns
// them into heights, widths and positions. Pure and tested.

import { ACCURACY_SPANS, type AccuracySpan, type AccuracyTrend, type Tally } from './accuracyTrend'
import { dailyColumns } from './analyticsSummary'
import type { PacingResult, SectionLeak } from './performanceAnalytics'
import { localDayKey } from './streak'

// ── The span ────────────────────────────────────────────────────────────────

/** Where the span is remembered: the key the Dashboard's Analytics section has always used. */
export const ANALYTICS_SPAN_KEY = 'actuarial_accuracy_span'
export const DEFAULT_ANALYTICS_SPAN: AccuracySpan = 30

/** The stored span, or the default for anything that isn't one of the three. */
export function spanFromStored(raw: string | null): AccuracySpan {
  const n = Number(raw)
  return raw !== null && (ACCURACY_SPANS as readonly number[]).includes(n) ? (n as AccuracySpan) : DEFAULT_ANALYTICS_SPAN
}

// ── Answers per day ─────────────────────────────────────────────────────────

/** Most columns the accuracy chart draws: past this, days are pooled so a bar stays legible on a phone. */
export const MAX_CHART_COLUMNS = 30

/** One column of a stacked chart, in pixels: green `correct` under red `missed`. */
export interface ChartColumn {
  correct: number
  missed: number
}

/**
 * Pools consecutive days so there are at most `max` columns. Buckets are
 * counted back from the last day, so the newest column always ends today and
 * any short bucket is the oldest one.
 */
export function bucketTallies(days: readonly Tally[], max = MAX_CHART_COLUMNS): Tally[] {
  if (days.length <= max || max <= 0) return days.map(d => ({ answered: d.answered, correct: d.correct }))
  const size = Math.ceil(days.length / max)
  const out: Tally[] = []
  for (let end = days.length; end > 0; end -= size) {
    const t: Tally = { answered: 0, correct: 0 }
    for (const d of days.slice(Math.max(0, end - size), end)) {
      t.answered += d.answered
      t.correct += d.correct
    }
    out.unshift(t)
  }
  return out
}

/** The shortest a segment standing for at least one answer is drawn, in pixels. */
export const MIN_SEGMENT = 2

/**
 * Tallies as stacked columns: the tallest column fills `height`, less the
 * `gap` between its two segments when it has both. A segment with any answers
 * in it is at least `MIN_SEGMENT` tall; an empty one is 0. Whole pixels.
 */
export function scaleColumns(tallies: readonly Tally[], height: number, gap = 2): ChartColumn[] {
  const most = Math.max(0, ...tallies.map(t => t.answered))
  if (most === 0) return tallies.map(() => ({ correct: 0, missed: 0 }))
  return tallies.map(t => {
    const right = Math.max(0, Math.min(t.correct, t.answered))
    const wrong = Math.max(0, t.answered - right)
    const room = height - (right > 0 && wrong > 0 ? gap : 0)
    const seg = (n: number) => (n === 0 ? 0 : Math.max(MIN_SEGMENT, Math.round((room * n) / most)))
    let correct = seg(right)
    let missed = seg(wrong)
    const over = correct + missed - room
    if (over > 0) {
      if (correct >= missed) correct = Math.max(MIN_SEGMENT, correct - over)
      else missed = Math.max(MIN_SEGMENT, missed - over)
    }
    return { correct, missed }
  })
}

/** The accuracy chart: the span day by day (pooled past `max` columns), scaled to `height` pixels. */
export function accuracyColumns(
  trend: Pick<AccuracyTrend, 'span' | 'days'>,
  today: string,
  { height = 72, max = MAX_CHART_COLUMNS, gap = 2 }: { height?: number; max?: number; gap?: number } = {},
): ChartColumn[] {
  return scaleColumns(bucketTallies(dailyColumns(trend, today), max), height, gap)
}

/** The Today page's Analytics tile: the last `n` days of the trend, scaled to 16 pixels. */
export function tileColumns(
  trend: Pick<AccuracyTrend, 'span' | 'days'>,
  n = 10,
  today: string = localDayKey(new Date()),
): ChartColumn[] {
  return scaleColumns(dailyColumns(trend, today).slice(-n), 16, 1)
}

// ── Pace ────────────────────────────────────────────────────────────────────

/** Where the exam's pace sits on the line, as a percentage of it: the line runs from 0 to allowed / 0.6. */
export const PACE_TICK = 60

export interface PaceLine {
  /** The exam's pace, as a percentage along the line. */
  tick: number
  /** The reader's median, as a percentage along the line, kept inside it. */
  dot: number
}

/** The pace line's two marks, to one scale. Null with no allowance or no time to place. */
export function paceLine(median: number | null, allowed: number): PaceLine | null {
  if (median === null || !(allowed > 0) || !(median >= 0)) return null
  const dot = Math.min(100, Math.max(0, (PACE_TICK * median) / allowed))
  return { tick: PACE_TICK, dot: Math.round(dot * 10) / 10 }
}

/** The reader's pace against the exam's, or null when either is missing: nothing is drawn then. */
export function paceReadout(pace: PacingResult | null): { median: number; allowed: number; per: 'question' | 'point'; line: PaceLine } | null {
  if (!pace || pace.overall.median === null) return null
  const line = paceLine(pace.overall.median, pace.allowed)
  return line ? { median: pace.overall.median, allowed: pace.allowed, per: pace.pace.per, line } : null
}

// ── Marks lost ──────────────────────────────────────────────────────────────

export interface MarksBar {
  name: string
  /** The bar's width, a percentage: the section's share of the exam over the largest section's. */
  width: number
  /** The part of the bar lost, a percentage of the bar. Null for a section with too few answers to judge. */
  lost: number | null
  /** Marks in a hundred lost here; null when not judged. */
  marksLost: number | null
}

/** One bar per section, in the order `sectionLeaks` ranks them. */
export function marksBars(leaks: readonly SectionLeak[]): MarksBar[] {
  const widest = Math.max(0, ...leaks.map(l => l.share))
  return leaks.map(l => ({
    name: l.name,
    width: widest > 0 ? Math.round((100 * l.share) / widest) : 0,
    lost: l.marksLost === null || l.share <= 0
      ? null
      : Math.min(100, Math.max(0, Math.round((100 * l.marksLost) / l.share))),
    marksLost: l.marksLost,
  }))
}

/** Marks in a hundred lost over every judged section; null when none is judged yet. */
export function totalMarksLost(leaks: readonly SectionLeak[]): number | null {
  const judged = leaks.filter(l => l.marksLost !== null)
  return judged.length === 0 ? null : judged.reduce((sum, l) => sum + (l.marksLost ?? 0), 0)
}
