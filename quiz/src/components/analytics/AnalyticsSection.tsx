import { useMemo, useState } from 'react'
import { ACCURACY_SPANS, type AccuracySpan, type AnswerRow } from '@/lib/accuracyTrend'
import { pacing, rowsInSpan, sectionLeaks } from '@/lib/performanceAnalytics'
import type { AccuracyTrends } from '@/hooks/useAccuracyTrend'
import type { Question } from '@/lib/parser'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { todayISO } from '@/lib/studyPlan'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { ExamLogo } from '@/components/ExamLogo'
import { ProBadge } from '@/components/ProBadge'
import { AccuracyTrendCard } from '@/components/AccuracyTrendCard'
import { SectionLeaksCard } from './SectionLeaksCard'
import { PacingCard } from './PacingCard'

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
 * every card over the one span picked in the section's header (7, 30 or 90
 * days, remembered). Accuracy (`lib/accuracyTrend.ts`) leads; under it, where
 * the marks are being lost and how the pace compares with the sitting's
 * (`lib/performanceAnalytics.ts`). Lazy, signed-in and Pro only — the answers
 * it reads are kept server-side; anyone else sees `AnalyticsLocked`.
 */
export function AnalyticsSection({ trends, rows, examLabel, examKey, syllabus, questions }: {
  trends: AccuracyTrends
  rows: readonly AnswerRow[]
  /** The question bank's exam label (`questionExamLabel`). */
  examLabel: string
  /** The exam_progress key, for the logo. */
  examKey: string | null
  syllabus: WikiExamSyllabus
  questions: readonly Question[]
}) {
  const [span, setSpanState] = useState<AccuracySpan>(loadSpan)
  const setSpan = (s: AccuracySpan) => { setSpanState(s); saveSpan(s) }

  const examQuestions = useMemo(
    () => new Map(questions.filter(q => q.exam === examLabel).map(q => [q.id, q])),
    [questions, examLabel],
  )
  const spanRows = useMemo(() => rowsInSpan(rows, todayISO(), { span }), [rows, span])
  const leaks = useMemo(() => sectionLeaks(spanRows, examQuestions, syllabus), [spanRows, examQuestions, syllabus])
  const pace = useMemo(() => pacing(spanRows, examQuestions, examLabel), [spanRows, examQuestions, examLabel])

  return (
    <section aria-labelledby="analytics-heading" className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 id="analytics-heading" className="flex items-center gap-2 text-lg font-semibold">
          {examKey && <ExamLogo examKey={examKey} size="sm" />}
          Analytics
          <ProBadge />
        </h2>
        <SegmentedControl
          size="xs"
          pill
          label="Period"
          value={String(span) as `${AccuracySpan}`}
          onChange={v => setSpan(Number(v) as AccuracySpan)}
          options={ACCURACY_SPANS.map(s => ({ value: String(s) as `${AccuracySpan}`, label: `${s}D`, ariaLabel: `Last ${s} days` }))}
          className="w-36"
        />
      </div>
      <AccuracyTrendCard trend={trends[span]} span={span} examLabel={examLabel} questions={questions} />
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <SectionLeaksCard leaks={leaks} examLabel={examLabel} />
        {pace && <PacingCard result={pace} />}
      </div>
    </section>
  )
}
