import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Question, SelfGrade } from '@/lib/parser'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { sittingOf } from '@/lib/paperResults'
import {
  PASS_MARK_INDEX, PENALISED_EXAMS, debriefSections, estimateGrade, gradeLabel, hasEstimate,
  paperScore, type Estimate,
} from '@/lib/practiceExamEstimate'
import { timeTaken } from '@/lib/sessionResults'
import { cn } from '@/lib/utils'

type Responses = Record<string, { chosen: string | null; timeSpent?: number } | undefined>

const ROW = 'flex min-h-[56px] w-full items-center gap-3 py-1.5 text-left rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
const PRO_TAG = 'rounded-full border-[1.5px] border-foreground px-2.5 py-0.5 text-[13px] font-bold'

// Rounded down, so the figure agrees with the grade: 89.7% of the mark is a 4, never "90%".
function percent(ratio: number): string {
  return `${Math.floor(ratio * 100 + 1e-9)}%`
}

/** The one line under the grade: what it was measured against. */
function againstLine(e: Estimate): string {
  if (e.kind === 'sitting') {
    return `${percent(e.ratio)} of the ${e.sitting.session} ${e.sitting.year} pass mark.`
  }
  const years = `${e.fromYear} to ${e.toYear}`
  if (e.low.grade === e.high.grade) {
    return e.median.grade === 'pass'
      ? `A pass on every pass mark from ${years}.`
      : `A ${gradeLabel(e.median.grade)} on every pass mark from ${years}.`
  }
  const top = e.high.grade === 'pass' ? 'a pass' : gradeLabel(e.high.grade)
  return `From ${gradeLabel(e.low.grade)} to ${top} on the pass marks of ${years}.`
}

/** What the estimate rests on, in a sentence or two. */
function basisLine(e: Estimate): string {
  const base = e.kind === 'sitting'
    ? 'An estimate on the CAS\'s 0 to 10 scale, against the pass mark it printed for this paper.'
    : 'An estimate on the CAS\'s 0 to 10 scale, against pass marks set for real papers, not this one. The CAS hasn\'t published a pass mark since 2019.'
  const mas = PENALISED_EXAMS.has(e.exam)
    ? e.kind === 'sitting'
      ? ' That mark counted a quarter of a question off for a wrong answer, which ended in Fall 2022, so it\'s restated without it.'
      : ' Those marks counted a quarter of a question off for a wrong answer, which ended in Fall 2022, so they\'re restated without it.'
    : ''
  const pass = (e.kind === 'sitting' ? e.grade : e.median.grade) === 'pass'
    ? ' A pass is a grade from 6 to 10, which the CAS doesn\'t define.'
    : ''
  return base + mas + pass
}

/**
 * The Practice Exam debrief (docs/practice-exam-debrief.md), on the results
 * screen: the estimated CAS grade, then each section's points lost and time
 * spent. Pro's; a reader without Pro gets one row to Upgrade, and only for an
 * exam the estimate covers.
 */
export function PracticeExamDebrief({ questions, responses, manualGrades, syllabus, isPro, onPractice }: {
  questions: Question[]
  responses: Responses
  manualGrades: Record<string, SelfGrade>
  syllabus: WikiExamSyllabus | null
  isPro: boolean
  /** Start a quiz on these questions. */
  onPractice: (ids: string[]) => void
}) {
  const navigate = useNavigate()
  const exam = questions[0]?.exam
  if (!exam) return null
  const estimable = hasEstimate(exam)

  if (!isPro) {
    if (!estimable) return null
    return (
      <section aria-label="Estimated grade" className="border-t border-border">
        <button type="button" className={ROW} onClick={() => navigate('/upgrade')} data-testid="debrief-pro">
          <span className="min-w-0 flex-1 text-base font-semibold">See your estimated grade</span>
          <span className={PRO_TAG}>Pro</span>
          <ChevronRight aria-hidden="true" strokeWidth={2.5} className="h-4 w-4 shrink-0" />
        </button>
      </section>
    )
  }

  const score = paperScore(questions, responses, manualGrades)
  const estimate = estimable && score.ungraded.length === 0
    ? estimateGrade(exam, score.share, sittingOf('mock-exam', questions))
    : null
  const debrief = debriefSections(questions, responses, manualGrades, syllabus, exam)
  const spent = timeTaken(debrief.seconds)
  const allowed = debrief.allowed !== null ? timeTaken(debrief.allowed) : null

  return (
    <>
      {estimable && (
        <section aria-labelledby="debrief-grade" className="flex flex-col gap-2 border-t border-border pt-5" data-testid="debrief-grade">
          <h2 id="debrief-grade" className="text-lg font-bold">Estimated grade</h2>
          {score.ungraded.length > 0 ? (
            <p className="text-base">
              Grade your written answers to see an estimate. {score.ungraded.length === 1
                ? '1 question isn\'t graded yet.'
                : `${score.ungraded.length} questions aren't graded yet.`}
            </p>
          ) : estimate ? (
            <>
              <p className="flex items-baseline gap-3">
                <span className="text-[44px] font-bold leading-none tabular-nums" data-testid="debrief-grade-value">
                  {gradeLabel(estimate.kind === 'sitting' ? estimate.grade : estimate.median.grade)}
                </span>
                <span className="text-base">{againstLine(estimate)}</span>
              </p>
              {estimate.kind === 'sitting' && estimate.percentile && (
                <p className="text-base">Above the {estimate.percentile}th percentile that sitting.</p>
              )}
              <p className="text-[15px] text-muted-foreground">
                {basisLine(estimate)}{' '}
                <a href={PASS_MARK_INDEX} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                  The CAS's pass marks
                </a>
              </p>
            </>
          ) : (
            <p className="text-base">The CAS printed no pass mark for this sitting.</p>
          )}
        </section>
      )}

      {debrief.sections.length > 0 && (
        <section aria-labelledby="debrief-sections" className="flex flex-col border-t border-border pt-5">
          <h2 id="debrief-sections" className="text-lg font-bold">By section</h2>
          {spent && (
            <p className="mb-1 text-[15px]">
              {allowed ? `${spent} of the ${allowed} the paper allows` : spent}
            </p>
          )}
          <ul>
            {debrief.sections.map(s => {
              const time = timeTaken(s.seconds)
              const allow = s.allowed !== null ? timeTaken(s.allowed) : null
              const line = [
                `Lost ${formatPoints(s.lost)} of ${formatPoints(s.possible)} ${s.possible === 1 ? 'point' : 'points'}`,
                time && (allow ? `${time} of ${allow}` : time),
              ].filter(Boolean).join(', ')
              const can = s.missed.length > 0
              return (
                <li key={s.name} className="border-b border-border last:border-b-0">
                  <button
                    type="button"
                    disabled={!can}
                    onClick={() => onPractice(s.missed)}
                    aria-label={can ? `Practice ${s.name}: ${line}` : `${s.name}: ${line}`}
                    className={cn(ROW, !can && 'cursor-default')}
                  >
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-base font-semibold">{s.name}</span>
                      <span className="text-[15px]">{line}</span>
                    </span>
                    {can && <ChevronRight aria-hidden="true" strokeWidth={2.5} className="h-4 w-4 shrink-0" />}
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </>
  )
}

function formatPoints(n: number): string {
  return String(Math.round(n * 100) / 100)
}
