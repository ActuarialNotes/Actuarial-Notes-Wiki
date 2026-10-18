import { useMemo } from 'react'
import { ExamDateMeta, ExamRow, ExamRowMeta } from '@/components/ExamRow'
import { ListPanel } from '@/components/ui/ListPanel'
import { TodayQuizNavBadge } from '@/components/TodayQuizBadge'
import type { ExamBody } from '@/lib/bodyFilter'
import { bankLabelFor } from '@/lib/examIds'
import { examStatus } from '@/lib/examStatus'
import type { Question } from '@/lib/parser'
import {
  activeQuizExamValues,
  formatTargetDate,
  quizQuestionCounts,
  quizTrackGroups,
} from '@/lib/quizBuilder'
import { badgeCountFor, type TodayPlanCount } from '@/lib/todayPlanCount'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

// QuizFloatingSearch height: h-[calc(3.5rem-1px)] + 1px border = 56px (sticky top-0)
const SEARCH_BAR_H = 56

function QuizExamRow({
  exam,
  onClick,
  questionCount,
  isActive,
  targetDate,
  subtitle,
  todayQuizCount = 0,
  todayQuizComplete = false,
}: {
  exam: { value: string; label: string; progressKey: string }
  onClick: () => void
  questionCount: number
  /** The reader is studying this exam. */
  isActive: boolean
  targetDate?: string | null
  subtitle?: string | null
  /** Questions left in this exam's plan today — picking the row starts here. */
  todayQuizCount?: number
  /** Today's plan for this exam is finished — the count becomes a check. */
  todayQuizComplete?: boolean
}) {
  // The Study Guides tab draws the same exam with the same row
  // (components/ExamRow.tsx); only the facts differ. Here they are the size
  // of the bank and, for an exam being studied, when it is sat. A date is
  // information and takes the blue info hue; being part-way through with no
  // date is neither, so it stays muted (style guide §4.1).
  return (
    <ExamRow
      examKey={exam.progressKey}
      title={exam.label}
      topic={subtitle}
      status={examStatus(exam.progressKey)}
      onClick={onClick}
      tourId={exam.value === 'Probability' ? 'quiz-exam-p' : undefined}
      meta={
        <ExamRowMeta
          items={[
            `${questionCount} question${questionCount !== 1 ? 's' : ''}`,
            isActive && (targetDate
              ? <ExamDateMeta>Exam: {formatTargetDate(targetDate)}</ExamDateMeta>
              : 'In progress'),
          ]}
        />
      }
      trailing={<TodayQuizNavBadge count={todayQuizCount} complete={todayQuizComplete} />}
    />
  )
}

/**
 * The Quiz tab's exam list: one body's tracks, each a sticky heading over a
 * grouped list of its exams (lib/quizBuilder.ts says which).
 */
export function QuizExamLadder({
  body,
  syllabi,
  questions,
  examProgress,
  examVariants,
  targetDates,
  todayQuizByExam,
  onOpenExam,
}: {
  /** The examining body picked on the title row. */
  body: ExamBody
  syllabi: WikiExamSyllabus[]
  questions: Question[]
  examProgress: Record<string, string | undefined>
  examVariants: Record<string, string | null | undefined>
  targetDates: Record<string, string | null | undefined>
  todayQuizByExam: Record<string, TodayPlanCount | undefined>
  onOpenExam: (value: string) => void
}) {
  // Exam subtitles (e.g. "Basic Techniques for Ratemaking and Estimating Claim
  // Liabilities" for Exam 5) sourced from the wiki syllabus so the Quiz tab
  // matches the Study Guides tab exactly. Keyed by bank label rather than
  // progress key: 6C and 6U share `CAS-6`, and the 6C card must not carry the
  // U.S. syllabus's subject line.
  const examTopicByLabel = useMemo(() => {
    const map: Record<string, string> = {}
    for (const s of syllabi) {
      const label = bankLabelFor(s)
      if (label) map[label] = s.examTopic
    }
    return map
  }, [syllabi])

  // Question counts per exam (for the exam selection cards)
  const questionCounts = useMemo(() => quizQuestionCounts(questions), [questions])

  const groups = quizTrackGroups(body)

  // The exams the reader is studying — in progress, on the variant they picked.
  const activeExamValues = activeQuizExamValues(examProgress, examVariants)

  return (
    <div className="space-y-6">
      {groups.map(group => (
        <div key={group.key}>
          {/* Sticky track header — sits just below the search bar, the
              same row the Study Guides ladder pins its headings to. */}
          <div
            className="sticky z-10 -mx-4 sm:-mx-6 px-4 sm:px-6 py-1.5 mb-3 bg-background/95 backdrop-blur-sm"
            style={{ top: `${SEARCH_BAR_H}px` }}
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {group.name}
            </p>
          </div>
          {/* One grouped list per track, a row per exam (components/ExamRow.tsx),
              two columns from `sm` up. */}
          <ListPanel columns={2}>
            {group.exams.map(exam => {
              const isActive = activeExamValues.includes(exam.value)
              return (
                <QuizExamRow
                  key={exam.value}
                  exam={exam}
                  onClick={() => onOpenExam(exam.value)}
                  questionCount={questionCounts[exam.value] ?? 0}
                  isActive={isActive}
                  targetDate={isActive ? (targetDates[exam.progressKey] ?? null) : null}
                  subtitle={examTopicByLabel[exam.value]}
                  todayQuizCount={badgeCountFor(todayQuizByExam[exam.progressKey])}
                  todayQuizComplete={todayQuizByExam[exam.progressKey]?.complete ?? false}
                />
              )
            })}
          </ListPanel>
        </div>
      ))}
    </div>
  )
}
