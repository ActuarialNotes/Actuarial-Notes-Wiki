// Analytics as Today shows it before the screen is opened: the tile's small
// chart on a phone, and on desktop a row of the three figures with the chart
// beside them (docs/redesign-spec.md §4.1). Lazy, with the Analytics screen:
// it reads the answer history, which Today's first paint doesn't wait for.

import { useMemo } from 'react'
import type { AccuracyTrends } from '@/hooks/useAccuracyTrend'
import type { AnswerRow } from '@/lib/accuracyTrend'
import type { Question } from '@/lib/parser'
import { formatMarks } from '@/lib/analyticsSummary'
import { clock, pacing, rowsInSpan, sectionLeaks } from '@/lib/performanceAnalytics'
import { todayISO } from '@/lib/studyPlan'
import { accuracyColumns, paceReadout, tileColumns, totalMarksLost } from '@/lib/todayAnalytics'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { ANSWER_FILL } from '@/lib/answerState'
import { AnalyticsTileChart } from './AnalyticsScreen'

/** The span Today's tile and summary cover. */
export const PEEK_SPAN = 30

export function AnalyticsTilePeek({ trends }: { trends: AccuracyTrends }) {
  const columns = useMemo(() => tileColumns(trends[PEEK_SPAN]), [trends])
  return <AnalyticsTileChart columns={columns} />
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex flex-col gap-1">
      <span className="text-sm">{label}</span>
      <span className="text-[28px] font-bold leading-none tabular-nums">{value}</span>
    </span>
  )
}

export function AnalyticsSummaryPeek({
  trends, rows, examLabel, syllabus, questions, accuracyPct,
}: {
  trends: AccuracyTrends
  rows: readonly AnswerRow[]
  examLabel: string
  syllabus: WikiExamSyllabus
  questions: readonly Question[]
  accuracyPct: number
}) {
  const today = todayISO()
  const trend = trends[PEEK_SPAN]
  const examQuestions = useMemo(
    () => new Map(questions.filter(q => q.exam === examLabel).map(q => [q.id, q])),
    [questions, examLabel],
  )
  const spanRows = useMemo(() => rowsInSpan(rows, today, { span: PEEK_SPAN }), [rows, today])
  const pace = useMemo(() => paceReadout(pacing(spanRows, examQuestions, examLabel)), [spanRows, examQuestions, examLabel])
  const lost = useMemo(() => totalMarksLost(sectionLeaks(spanRows, examQuestions, syllabus)), [spanRows, examQuestions, syllabus])
  const columns = useMemo(() => accuracyColumns(trend, today, { height: 36 }), [trend, today])

  return (
    <>
      <Figure label="Accuracy" value={`${accuracyPct}%`} />
      {pace && <Figure label="Pace" value={clock(pace.median)} />}
      {lost !== null && <Figure label="Marks lost" value={formatMarks(lost)} />}
      <span aria-hidden="true" className="flex h-9 min-w-[160px] flex-1 items-end gap-[3px]">
        {columns.map((c, i) => (
          <span key={i} className="flex flex-1 flex-col gap-px">
            {c.missed > 0 && <span className={`rounded-sm ${ANSWER_FILL.incorrect}`} style={{ height: c.missed }} />}
            {c.correct > 0 && <span className={`rounded-sm ${ANSWER_FILL.correct}`} style={{ height: c.correct }} />}
          </span>
        ))}
      </span>
    </>
  )
}
