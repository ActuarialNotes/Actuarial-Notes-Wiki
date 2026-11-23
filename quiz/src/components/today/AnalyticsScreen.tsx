// **Analytics** (docs/redesign-spec.md §4.5), an overlay on Today: how one
// exam's practice is going over a span of 7, 30 or 90 days. Accuracy with the
// answers day by day, the reader's pace against the exam's, the marks each
// section is losing, and accuracy by difficulty. Presentational: the rows and
// trends come in from `useAccuracyTrend`, and every figure is one the libs
// already compute (`accuracyTrend.ts`, `performanceAnalytics.ts`); the heights
// and positions are `lib/todayAnalytics.ts`.

import { useId, useMemo, useState } from 'react'
import {
  ACCURACY_SPANS, DIFFICULTY_ORDER, accuracyPercent, isThin, type AccuracySpan, type AnswerRow,
} from '@/lib/accuracyTrend'
import { clock, pacing, rowsInSpan, sectionLeaks } from '@/lib/performanceAnalytics'
import { formatMarks } from '@/lib/analyticsSummary'
import { DIFFICULTY_LABEL } from '@/lib/difficultyBreakdown'
import {
  ANALYTICS_SPAN_KEY, accuracyColumns, marksBars, paceReadout, spanFromStored, totalMarksLost,
  type ChartColumn,
} from '@/lib/todayAnalytics'
import { ANSWER_FILL } from '@/lib/answerState'
import { todayISO } from '@/lib/studyPlan'
import { cn } from '@/lib/utils'
import type { AccuracyTrends } from '@/hooks/useAccuracyTrend'
import type { Question } from '@/lib/parser'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { ExamLogo } from '@/components/ExamLogo'
import { LoadingMark } from '@/components/LoadingMark'
import { Popup } from '@/components/ui/Popup'
import { CloseButton } from './SyllabusPanel'

function loadSpan(): AccuracySpan {
  try { return spanFromStored(localStorage.getItem(ANALYTICS_SPAN_KEY)) } catch { return spanFromStored(null) }
}

function saveSpan(span: AccuracySpan) {
  try { localStorage.setItem(ANALYTICS_SPAN_KEY, String(span)) } catch { /* ignore */ }
}

const SECTION = 'flex flex-col gap-3.5 border-t border-border pt-6'
const DASH = '–'

/** Stacked columns, red missed over green correct: the chart's bars at any size. */
function Columns({ columns, gap, segmentGap }: { columns: readonly ChartColumn[]; gap: number; segmentGap: number }) {
  return (
    <>
      {columns.map((c, i) => (
        <span key={i} className="flex min-w-0 flex-1 basis-0 flex-col" style={{ gap: segmentGap, marginLeft: i === 0 ? 0 : gap }}>
          {c.missed > 0 && <span className={cn('rounded-[2px]', ANSWER_FILL.incorrect)} style={{ height: c.missed }} />}
          {c.correct > 0 && <span className={cn('rounded-[2px]', ANSWER_FILL.correct)} style={{ height: c.correct }} />}
        </span>
      ))}
    </>
  )
}

/** The Today page's Analytics tile chart: ten small columns from `tileColumns`. */
export function AnalyticsTileChart({ columns }: { columns: readonly ChartColumn[] }) {
  return (
    <span aria-hidden="true" className="flex h-4 items-end">
      <Columns columns={columns} gap={3} segmentGap={1} />
    </span>
  )
}

export interface AnalyticsScreenProps {
  /** Null while the answers are being read. */
  trends: AccuracyTrends | null
  rows: readonly AnswerRow[] | null
  /** The question bank's exam label (`questionExamLabel`). */
  examLabel: string
  /** The `exam_progress` key, for the exam's logo. */
  examKey: string
  syllabus: WikiExamSyllabus
  questions: readonly Question[]
  onClose: () => void
}

/** The overlay Today's Analytics tile opens. */
export function AnalyticsOverlay({ trends, rows, onClose, ...rest }: AnalyticsScreenProps) {
  const titleId = useId()
  return (
    <Popup onClose={onClose} labelledBy={titleId} className="sm:max-w-[640px]">
      {trends && rows ? (
        <AnalyticsBody trends={trends} rows={rows} onClose={onClose} titleId={titleId} {...rest} />
      ) : (
        <div className="flex min-h-[240px] items-center justify-center">
          <h2 id={titleId} className="sr-only">Analytics</h2>
          <LoadingMark />
        </div>
      )}
    </Popup>
  )
}

function AnalyticsBody({
  trends, rows, examLabel, examKey, syllabus, questions, onClose, titleId,
}: Omit<AnalyticsScreenProps, 'trends' | 'rows'> & { trends: AccuracyTrends; rows: readonly AnswerRow[]; titleId: string }) {
  const [span, setSpanState] = useState<AccuracySpan>(loadSpan)
  const setSpan = (s: AccuracySpan) => { setSpanState(s); saveSpan(s) }

  const today = todayISO()
  const trend = trends[span]
  const examQuestions = useMemo(
    () => new Map(questions.filter(q => q.exam === examLabel).map(q => [q.id, q])),
    [questions, examLabel],
  )
  const spanRows = useMemo(() => rowsInSpan(rows, today, { span }), [rows, today, span])
  const leaks = useMemo(() => sectionLeaks(spanRows, examQuestions, syllabus), [spanRows, examQuestions, syllabus])
  const pace = useMemo(() => paceReadout(pacing(spanRows, examQuestions, examLabel)), [spanRows, examQuestions, examLabel])
  const columns = useMemo(() => accuracyColumns(trend, today), [trend, today])
  const bars = useMemo(() => marksBars(leaks), [leaks])
  const lostTotal = totalMarksLost(leaks)

  const total = trend.total
  const percent = accuracyPercent(total)

  return (
      <div data-testid="analytics-overlay" className="flex flex-col gap-[26px]">
        <div className="flex items-center gap-3">
          <ExamLogo examKey={examKey} size="sm" />
          <h2 id={titleId} className="min-w-0 flex-1 text-xl font-bold">Analytics</h2>
          <div role="group" aria-label="Days" className="flex shrink-0 gap-0.5">
            {ACCURACY_SPANS.map(s => (
              <button
                key={s}
                type="button"
                aria-pressed={s === span}
                onClick={() => setSpan(s)}
                className={cn(
                  'h-9 w-11 rounded-full text-sm tabular-nums',
                  s === span ? 'bg-foreground font-bold text-ground' : 'font-semibold',
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <CloseButton onClose={onClose} />
        </div>

        {total.answered === 0 || percent === null ? (
          <p className="text-[17px] leading-normal">No answers in the past {span} days yet.</p>
        ) : (
          <>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-baseline gap-3">
                <span className="text-[56px] font-bold leading-none tracking-[-0.03em] tabular-nums">{percent}%</span>
                <span className="text-[17px] font-medium">accuracy</span>
              </div>
              <div
                role="img"
                aria-label={`Answers each day over ${span} days, right in green and missed in red. ${total.correct} of ${total.answered} right.`}
                className="flex h-[72px] items-end"
              >
                <Columns columns={columns} gap={3} segmentGap={2} />
              </div>
            </div>

            {pace && (
              <div className={SECTION}>
                <div className="flex items-baseline gap-2.5">
                  <span className="min-w-0 flex-1 text-base font-semibold">
                    {pace.per === 'point' ? 'Pace per point' : 'Pace'}
                  </span>
                  <span className="text-[28px] font-bold leading-none tabular-nums">{clock(pace.median)}</span>
                </div>
                <div
                  role="img"
                  aria-label={`Your pace is ${clock(pace.median)} a ${pace.per}. The exam allows ${clock(pace.allowed)}.`}
                  className="relative h-[38px]"
                >
                  <span className="absolute inset-x-0 top-2 h-0.5 bg-border" />
                  <span className="absolute top-0 h-[18px] w-0.5 bg-foreground" style={{ left: `${pace.line.tick}%` }} />
                  <span
                    className="absolute top-px h-4 w-4 rounded-full bg-foreground"
                    style={{ left: `calc(${pace.line.dot}% - ${(pace.line.dot * 0.16).toFixed(1)}px)` }}
                  />
                  <span
                    className="absolute top-[22px] -translate-x-full whitespace-nowrap pr-1 text-sm tabular-nums"
                    style={{ left: `${pace.line.tick}%` }}
                  >
                    Exam {clock(pace.allowed)}
                  </span>
                </div>
              </div>
            )}

            {bars.length > 0 && (
              <div className={SECTION}>
                <div className="flex items-baseline gap-2.5">
                  <span className="min-w-0 flex-1 text-base font-semibold">Marks lost</span>
                  <span className="text-[28px] font-bold leading-none tabular-nums">
                    {lostTotal === null ? DASH : formatMarks(lostTotal)}
                  </span>
                </div>
                <ul className="flex flex-col gap-3.5">
                  {bars.map(b => (
                    <li key={b.name} className="grid grid-cols-[minmax(0,1fr)_36px] items-end gap-x-3">
                      <span className="flex min-w-0 flex-col gap-1.5">
                        <span className="text-[15px]">{b.name}</span>
                        <span
                          aria-hidden="true"
                          className="flex h-2.5 overflow-hidden rounded-[5px] bg-border"
                          style={{ width: `${b.width}%` }}
                        >
                          {b.lost !== null && (
                            <>
                              <span className="bg-foreground" style={{ width: `${100 - b.lost}%` }} />
                              <span className={ANSWER_FILL.incorrect} style={{ width: `${b.lost}%` }} />
                            </>
                          )}
                        </span>
                      </span>
                      <span className="text-right text-base font-bold tabular-nums">
                        {b.marksLost === null ? DASH : formatMarks(b.marksLost)}
                        <span className="sr-only">{b.marksLost === null ? ' too few answers' : ' marks lost'}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={cn(SECTION, 'gap-3')}>
              <span className="text-base font-semibold">By difficulty</span>
              <ul className="flex flex-col gap-3">
                {DIFFICULTY_ORDER.map(d => {
                  const tally = total.byDifficulty[d]
                  const pct = accuracyPercent(tally)
                  const shown = pct !== null && !isThin(tally)
                  return (
                    <li key={d} className="grid grid-cols-[72px_minmax(0,1fr)_44px] items-center">
                      <span className="text-[15px]">{DIFFICULTY_LABEL[d]}</span>
                      <span aria-hidden="true" className="block h-2.5 rounded-[5px] bg-border">
                        {shown && <span className="block h-2.5 rounded-[5px] bg-foreground" style={{ width: `${pct}%` }} />}
                      </span>
                      <span className="text-right text-[15px] font-bold tabular-nums">
                        {shown ? `${pct}%` : DASH}
                        {!shown && <span className="sr-only"> too few answers</span>}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </>
        )}
      </div>
  )
}
