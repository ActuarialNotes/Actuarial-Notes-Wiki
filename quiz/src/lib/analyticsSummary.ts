// The Dashboard's **analytics summary** — the tiles and bars that lead the
// Analytics section (`components/analytics/AnalyticsSummary.tsx`), above the
// full cards the "All analytics" button opens. Every figure is one the full
// cards already compute (`lib/accuracyTrend.ts`, `lib/performanceAnalytics.ts`);
// this module only lays the span out day by day and picks what a tile shows.
// Pure and tested.

import type { AccuracySpan, AccuracyTrend, Tally } from './accuracyTrend'
import type { SectionLeak } from './performanceAnalytics'
import { localDayKey } from './streak'

/** The section header for a span. */
export function spanTitle(span: AccuracySpan): string {
  return span === 7 ? 'Past week' : `Past ${span} days`
}

export interface DayColumn extends Tally {
  /** Local calendar day, YYYY-MM-DD. */
  day: string
}

/** One column per calendar day of the span, oldest first, today last — a day with no answers is a zero. */
export function dailyColumns(trend: Pick<AccuracyTrend, 'span' | 'days'>, today: string): DayColumn[] {
  const byDay = new Map(trend.days.map(d => [d.day, d]))
  const end = new Date(`${today}T12:00:00`)
  const out: DayColumn[] = []
  for (let i = trend.span - 1; i >= 0; i--) {
    const d = new Date(end)
    d.setDate(end.getDate() - i)
    const day = localDayKey(d)
    const hit = byDay.get(day)
    out.push({ day, answered: hit?.answered ?? 0, correct: hit?.correct ?? 0 })
  }
  return out
}

/** The section costing the most marks — null until one has enough answers to judge. */
export function costliestSection(leaks: readonly SectionLeak[]): SectionLeak | null {
  return leaks.find(l => l.marksLost !== null) ?? null
}

/** Marks in a hundred, as the leaks card prints them: one decimal under ten. */
export function formatMarks(n: number): string {
  return n >= 10 ? String(Math.round(n)) : n.toFixed(1).replace(/\.0$/, '')
}

/** A quiz on one section — the quiz reads `concepts` as a comma list, so a name with a comma can't ride it. */
export function sectionQuizHref(examLabel: string, leak: Pick<SectionLeak, 'concepts'>): string {
  const concepts = leak.concepts.filter(c => !c.includes(','))
  const params = new URLSearchParams({ exam: examLabel, concepts: concepts.join(','), count: '10' })
  return `/quiz?${params.toString()}`
}
