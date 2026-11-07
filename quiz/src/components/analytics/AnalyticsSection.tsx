import { useId, useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ACCURACY_SPANS, type AccuracySpan, type AnswerRow } from '@/lib/accuracyTrend'
import { pacing, rowsInSpan, sectionLeaks } from '@/lib/performanceAnalytics'
import type { AccuracyTrends } from '@/hooks/useAccuracyTrend'
import type { Question } from '@/lib/parser'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { todayISO } from '@/lib/studyPlan'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { ProBadge } from '@/components/ProBadge'
import { AccuracyTrendCard } from '@/components/AccuracyTrendCard'
import { SectionLeaksCard } from './SectionLeaksCard'
import { PacingCard } from './PacingCard'
import { AnalyticsSummary } from './AnalyticsSummary'
import { spanTitle } from '@/lib/analyticsSummary'

const SPAN_KEY = 'actuarial_accuracy_span'
const DEFAULT_SPAN: AccuracySpan = 30

function loadSpan(): AccuracySpan {
  try {
    const n = Number(localStorage.getItem(SPAN_KEY))
    return (ACCURACY_SPANS as readonly number[]).includes(n) ? (n as AccuracySpan) : DEFAULT_SPAN
  } catch {
    return DEFAULT_SPAN
  }
}

function saveSpan(span: AccuracySpan) {
  try { localStorage.setItem(SPAN_KEY, String(span)) } catch { /* ignore */ }
}

/**
 * The Dashboard's **Analytics** section: how this exam's practice is going,
 * everything over the one span picked in the section's header (7, 30 or 90
 * days, remembered). It leads with a summary (`AnalyticsSummary`: four tiles,
 * the answers day by day, accuracy by difficulty); **All analytics** opens the
 * full cards under it — Accuracy (`lib/accuracyTrend.ts`), where the marks
 * are being lost and how the pace compares with the sitting's
 * (`lib/performanceAnalytics.ts`). Lazy, signed-in and Pro only — the answers
 * it reads are kept server-side; anyone else sees `AnalyticsLocked`.
 */
export function AnalyticsSection({ trends, rows, examLabel, syllabus, questions }: {
  trends: AccuracyTrends
  rows: readonly AnswerRow[]
  /** The question bank's exam label (`questionExamLabel`). */
  examLabel: string
  syllabus: WikiExamSyllabus
  questions: readonly Question[]
}) {
  const [span, setSpanState] = useState<AccuracySpan>(loadSpan)
  const [expanded, setExpanded] = useState(false)
  const detailsId = useId()
  const setSpan = (s: AccuracySpan) => { setSpanState(s); saveSpan(s) }

  const examQuestions = useMemo(
    () => new Map(questions.filter(q => q.exam === examLabel).map(q => [q.id, q])),
    [questions, examLabel],
  )
  const spanRows = useMemo(() => rowsInSpan(rows, todayISO(), { span }), [rows, span])
  const leaks = useMemo(() => sectionLeaks(spanRows, examQuestions, syllabus), [spanRows, examQuestions, syllabus])
  const pace = useMemo(() => pacing(spanRows, examQuestions, examLabel), [spanRows, examQuestions, examLabel])

  return (
    <section aria-label="Analytics" className="space-y-3">
      <div className="rounded-3xl bg-card p-5 text-card-foreground shadow-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="flex min-w-0 items-center gap-2 text-lg font-extrabold tracking-tight">
            <span className="truncate">{spanTitle(span)}</span>
            <ProBadge />
          </h2>
          <SegmentedControl
            size="xs"
            pill
            label="Period"
            value={String(span) as `${AccuracySpan}`}
            onChange={v => setSpan(Number(v) as AccuracySpan)}
            options={ACCURACY_SPANS.map(s => ({ value: String(s) as `${AccuracySpan}`, label: `${s}D`, ariaLabel: `Last ${s} days` }))}
            className="w-32 shrink-0"
          />
        </div>
        <AnalyticsSummary trend={trends[span]} span={span} leaks={leaks} pace={pace} examLabel={examLabel} />
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
          aria-controls={detailsId}
          className="mt-5 flex h-12 w-full items-center justify-center gap-1.5 rounded-2xl bg-muted/60 text-[15px] font-bold transition-colors hover:bg-muted"
        >
          All analytics
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      </div>
      {expanded && (
        <div id={detailsId} className="space-y-3">
          <AccuracyTrendCard trend={trends[span]} span={span} examLabel={examLabel} questions={questions} />
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <SectionLeaksCard leaks={leaks} examLabel={examLabel} />
            {pace && <PacingCard result={pace} />}
          </div>
        </div>
      )}
    </section>
  )
}
