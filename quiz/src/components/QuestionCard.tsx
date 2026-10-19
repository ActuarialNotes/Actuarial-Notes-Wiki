import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { AnswerOption } from '@/components/AnswerOption'
import { ExplanationPanel } from '@/components/ExplanationPanel'
import { TopicBadge } from '@/components/TopicBadge'
import { MarkdownText, MARKDOWN_LIST_CLASS, READING_MD_CLASS } from '@/components/MarkdownText'
import { SelfGradeButtons } from '@/components/SelfGradeButtons'
import { SampleAnswerCards, ExaminerReportCard } from '@/components/AnswerReference'
import { MatchingQuestion } from '@/components/MatchingQuestion'
import { OrderingQuestion } from '@/components/OrderingQuestion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { isAnswerCorrect, normalizeAnswerText, estimateEssayScore } from '@/lib/parser'
import { matchingLayout, orderingLayout } from '@/lib/questionLayout'
import type { Question, Part, SelfGrade } from '@/lib/parser'

export type { SelfGrade }

// A part's question reads at the size of the question's own stem — the
// reading class a size up, so a part is the thing the eye lands on.
const PART_STEM_CLASS = cn(READING_MD_CLASS, 'text-[17px] sm:text-lg')

interface QuestionCardProps {
  question: Question
  selectedAnswer: string | null
  onAnswer: (key: string) => void
  showExplanation: boolean
  isLocked?: boolean   // true once the answer is confirmed and cannot be changed
  showMeta?: boolean   // show exam/topic/difficulty badges; false during live quiz
  onNext?: () => void  // when provided, clicking any locked answer advances
  essaySelfGrades?: Record<string, SelfGrade>  // keyed by part label (for essay self-grading)
  onEssaySelfGrade?: (partLabel: string, grade: SelfGrade) => void
  // Manual grade override for free-entry (top-level) and multi-part free-entry parts
  selfGrade?: SelfGrade  // for free-entry questions
  onSelfGrade?: (grade: SelfGrade) => void
  partManualGrades?: Record<string, SelfGrade>  // keyed by part.label for multi-part
  onPartManualGrade?: (partLabel: string, grade: SelfGrade) => void
  /**
   * Concept names to underline wherever the question's text writes them, so
   * a tap opens the concept (lib/conceptMentions.ts). The quiz handles the tap.
   */
  conceptNames?: readonly string[]
}

// ── Free-entry input ────────────────────────────────────────────────────────

interface FreeEntryInputProps {
  answer: string
  isLocked: boolean
  correctAnswer: string
  showExplanation: boolean
  onSubmit: (value: string) => void
  autoSubmit?: boolean
  selfGrade?: SelfGrade
  onSelfGrade?: (grade: SelfGrade) => void
}

function FreeEntryInput({ answer, isLocked, correctAnswer, showExplanation, onSubmit, autoSubmit = false, selfGrade, onSelfGrade }: FreeEntryInputProps) {
  const [text, setText] = useState(answer)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setText(answer)
  }, [answer])

  const isAnswered = isLocked && answer !== ''
  const autoIsRight = isAnswered && normalizeAnswerText(answer) === normalizeAnswerText(correctAnswer)
  // If user has manually graded, use that; otherwise use auto-grade
  const isRight = selfGrade !== undefined ? selfGrade === 'correct' : autoIsRight

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setText(val)
    if (autoSubmit) onSubmit(val)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !autoSubmit && text.trim()) {
      onSubmit(text.trim())
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-center">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isLocked}
          placeholder="Enter your answer…"
          className={[
            'flex-1 rounded-md border px-3 py-2 text-[16px] sm:text-sm bg-background',
            'focus:outline-none focus:ring-2 focus:ring-ring',
            isLocked ? 'opacity-70 cursor-not-allowed' : '',
            isAnswered && isRight ? 'border-green-400 dark:border-green-600' : '',
            isAnswered && !isRight ? 'border-red-400 dark:border-red-600' : '',
          ].join(' ')}
        />
        {!isLocked && !autoSubmit && (
          <Button
            size="sm"
            variant="outline"
            disabled={!text.trim()}
            onClick={() => text.trim() && onSubmit(text.trim())}
          >
            Submit
          </Button>
        )}
      </div>

      {showExplanation && isAnswered && (
        <div className="space-y-2 text-sm">
          {!autoIsRight && (
            <p className="text-muted-foreground">
              Correct answer: <span className="font-semibold text-foreground">{correctAnswer}</span>
            </p>
          )}
          {!autoIsRight && onSelfGrade && (
            <SelfGradeButtons value={selfGrade ?? null} onChange={onSelfGrade} />
          )}
          {!autoIsRight && !onSelfGrade && selfGrade && (
            <p className={`text-xs font-medium ${selfGrade === 'correct' ? 'text-green-600 dark:text-green-400' : selfGrade === 'partial' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
              {selfGrade === 'correct' ? '✓ Marked correct' : selfGrade === 'partial' ? '~ Marked partial' : '✗ Marked incorrect'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// ── Single part of a multi-part question ────────────────────────────────────

interface PartCardProps {
  part: Part
  partAnswer: string
  isLocked: boolean
  showExplanation: boolean
  onPartAnswer: (label: string, value: string) => void
  selfGrade?: SelfGrade
  onSelfGrade?: (grade: SelfGrade) => void
  /** The question's one part — asked about as the question, not "this part". */
  isOnlyPart?: boolean
  conceptNames?: readonly string[]
}

function PartCard({ part, partAnswer, isLocked, showExplanation, onPartAnswer, selfGrade: externalSelfGrade, onSelfGrade, isOnlyPart = false, conceptNames }: PartCardProps) {
  const isEssay = part.answer === ''
  const isAnswered = isLocked && (isEssay || partAnswer !== '')
  const autoIsRight = !isEssay && isAnswered && (
    part.type === 'multiple-choice'
      ? partAnswer === part.answer
      : normalizeAnswerText(partAnswer) === normalizeAnswerText(part.answer)
  )

  const [internalSelfGrade, setInternalSelfGrade] = useState<SelfGrade | null>(null)
  const effectiveSelfGrade = externalSelfGrade ?? internalSelfGrade

  // For free-entry parts, if user manually graded, use that for display
  const isRight = (!isEssay && part.type === 'free-entry' && effectiveSelfGrade !== null)
    ? effectiveSelfGrade === 'correct'
    : autoIsRight

  function handleSelfGradeClick(grade: SelfGrade) {
    setInternalSelfGrade(grade)
    onSelfGrade?.(grade)
  }

  // ── Essay part ─────────────────────────────────────────────────────────────
  if (isEssay) {
    const keywordScore =
      isLocked && partAnswer.trim()
        ? estimateEssayScore(partAnswer, part.explanation ?? '')
        : null

    // The part sits flush with the question on a phone (its card is the same
    // surface as the question's, so its padding only narrowed the text) and
    // gets its own inset from `sm` up.
    return (
      <div className="rounded-lg bg-card sm:p-4 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Part {part.label.toUpperCase()}
            {part.points > 0 && (
              <span className="ml-1 font-normal">({part.points} pt{part.points !== 1 ? 's' : ''})</span>
            )}
          </span>
          <span className="text-sm text-muted-foreground italic">Written response</span>
        </div>

        {part.stem && <MarkdownText className={PART_STEM_CLASS} conceptNames={conceptNames}>{part.stem}</MarkdownText>}

        {!isLocked ? (
          <textarea
            value={partAnswer}
            onChange={e => onPartAnswer(part.label, e.target.value)}
            placeholder="Write your response here…"
            rows={5}
            className="w-full rounded-md border px-3 py-2 text-base leading-relaxed bg-background resize-y focus:outline-none focus:ring-2 focus:ring-ring"
          />
        ) : (
          <div className="space-y-4">
            {partAnswer.trim() ? (
              <section aria-label="Your response" className="rounded-xl border border-border p-4 space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Your response</h4>
                <p className="text-base leading-relaxed whitespace-pre-wrap text-foreground">{partAnswer}</p>
              </section>
            ) : (
              <p className="text-sm text-muted-foreground italic">No response written</p>
            )}

            {keywordScore !== null && keywordScore.total > 0 && (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-muted-foreground">Keyword match:</span>
                <span className={
                  keywordScore.pct >= 60
                    ? 'font-medium text-green-600 dark:text-green-400'
                    : keywordScore.pct >= 30
                      ? 'font-medium text-yellow-600 dark:text-yellow-400'
                      : 'text-muted-foreground'
                }>
                  {keywordScore.matched}/{keywordScore.total} ({keywordScore.pct}%)
                </span>
              </div>
            )}

            {/* The reference first, then the grade: a reader marks themselves
                against the sample answer, so they read it before being asked. */}
            {showExplanation && part.explanation && <SampleAnswerCards markdown={part.explanation} />}
            {showExplanation && part.examiner_report && <ExaminerReportCard markdown={part.examiner_report} />}

            {showExplanation && (
              <SelfGradeButtons
                value={effectiveSelfGrade}
                onChange={handleSelfGradeClick}
                prompt={isOnlyPart ? 'How did you do?' : 'How did you do on this part?'}
              />
            )}
          </div>
        )}
      </div>
    )
  }

  // ── Graded part (MC or free-entry) ─────────────────────────────────────────
  return (
    <div className="rounded-lg bg-card sm:p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Part {part.label.toUpperCase()}
          {part.points > 0 && (
            <span className="ml-1 font-normal">({part.points} pt{part.points !== 1 ? 's' : ''})</span>
          )}
        </span>
        {isAnswered && (
          <span className={isRight ? 'text-green-600 dark:text-green-400 text-sm font-medium' : effectiveSelfGrade === 'partial' ? 'text-yellow-600 dark:text-yellow-400 text-sm font-medium' : 'text-red-600 dark:text-red-400 text-sm font-medium'}>
            {isRight ? '✓ Correct' : effectiveSelfGrade === 'partial' ? '~ Partial' : '✗ Incorrect'}
          </span>
        )}
      </div>

      {part.stem && <MarkdownText className={PART_STEM_CLASS} conceptNames={conceptNames}>{part.stem}</MarkdownText>}

      {part.type === 'multiple-choice' ? (
        <div className="space-y-2">
          {part.options.map(option => (
            <AnswerOption
              key={option.key}
              optionKey={option.key}
              text={option.text}
              isSelected={partAnswer === option.key}
              isCorrect={part.answer === option.key}
              isDisabled={isLocked}
              revealAnswer={showExplanation && isAnswered}
              onClick={key => !isLocked && onPartAnswer(part.label, key)}
            />
          ))}
        </div>
      ) : (
        <FreeEntryInput
          answer={partAnswer}
          isLocked={isLocked}
          correctAnswer={part.answer}
          showExplanation={showExplanation && isAnswered}
          onSubmit={val => onPartAnswer(part.label, val)}
          autoSubmit={true}
          selfGrade={effectiveSelfGrade ?? undefined}
          onSelfGrade={onSelfGrade ? handleSelfGradeClick : undefined}
        />
      )}

      {showExplanation && isAnswered && (part.explanation || (!autoIsRight && part.answer)) && (
        <div className={[
          'rounded-xl p-4 space-y-2 text-sm',
          isRight
            ? 'bg-green-50 dark:bg-green-950'
            : effectiveSelfGrade === 'partial'
              ? 'bg-yellow-50 dark:bg-yellow-950'
              : 'bg-red-50 dark:bg-red-950',
        ].join(' ')}>
          {!autoIsRight && part.answer && (
            <p className="text-muted-foreground text-xs">
              Correct answer: <span className="font-semibold text-foreground">{part.answer}</span>
            </p>
          )}
          {part.explanation && (
            <MarkdownText className={READING_MD_CLASS}>{part.explanation}</MarkdownText>
          )}
        </div>
      )}
      {showExplanation && isAnswered && part.examiner_report && (
        <ExaminerReportCard markdown={part.examiner_report} />
      )}
    </div>
  )
}

// ── Exam / topic / difficulty badges ────────────────────────────────────────

function QuestionMeta({ question }: { question: Question }) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      <TopicBadge label={question.exam} variant="topic" />
      <TopicBadge label={question.topic} variant="tag" />
      <TopicBadge label={question.difficulty} variant="difficulty" />
      {question.originally_exam && (
        <TopicBadge label={`Formerly ${question.originally_exam}`} variant="tag" />
      )}
      {question.off_syllabus && (
        <TopicBadge label="Not on a current syllabus" variant="tag" />
      )}
    </div>
  )
}

// ── Main QuestionCard ────────────────────────────────────────────────────────

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswer,
  showExplanation,
  isLocked = false,
  showMeta = false,
  onNext,
  essaySelfGrades,
  onEssaySelfGrade,
  selfGrade,
  onSelfGrade,
  partManualGrades,
  onPartManualGrade,
  conceptNames,
}: QuestionCardProps) {
  // Per-part answer state for multi-part questions
  const [partAnswers, setPartAnswers] = useState<Record<string, string>>({})

  // Sync part answers from selectedAnswer (JSON) when question changes
  useEffect(() => {
    if (question.type === 'multi-part') {
      if (selectedAnswer) {
        try {
          setPartAnswers(JSON.parse(selectedAnswer) as Record<string, string>)
        } catch {
          setPartAnswers({})
        }
      } else {
        setPartAnswers({})
      }
    }
  }, [question.id, question.type]) // eslint-disable-line react-hooks/exhaustive-deps

  function handlePartAnswer(label: string, value: string) {
    const updated = { ...partAnswers, [label]: value }
    setPartAnswers(updated)
    onAnswer(JSON.stringify(updated))
  }

  // ── multiple-choice ──────────────────────────────────────────────────────
  if (question.type === 'multiple-choice') {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          {showMeta && <QuestionMeta question={question} />}
          <MarkdownText conceptNames={conceptNames} className={`text-[17px] sm:text-lg leading-relaxed [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 ${MARKDOWN_LIST_CLASS}`}>
            {question.stem}
          </MarkdownText>
        </CardHeader>

        <CardContent className="space-y-2" data-tour="answer-options">
          {question.options.map((option, idx) => (
            <AnswerOption
              key={option.key}
              optionKey={option.key}
              text={option.text}
              isSelected={selectedAnswer === option.key}
              isCorrect={question.answer === option.key}
              isDisabled={isLocked}
              revealAnswer={showExplanation}
              onClick={onAnswer}
              onNext={isLocked ? onNext : undefined}
              keyHint={String(idx + 1)}
            />
          ))}

          {isLocked && onNext && (
            <p className="text-xs text-center text-muted-foreground pt-1 select-none">
              Tap any answer to continue →
            </p>
          )}

          {showExplanation && selectedAnswer !== null && (
            <ExplanationPanel
              explanation={question.explanation}
              wikiLinks={question.wiki_link}
              verification={question.verification}
              questionId={question.id}
              isCorrect={selectedAnswer === question.answer}
              examinerReport={question.examiner_report}
            />
          )}
        </CardContent>
      </Card>
    )
  }

  // ── free-entry ───────────────────────────────────────────────────────────
  if (question.type === 'free-entry') {
    const answered = isLocked && selectedAnswer !== null
    const autoCorrect = answered && isAnswerCorrect(question, selectedAnswer!)
    const correct = selfGrade !== undefined ? selfGrade === 'correct' : autoCorrect
    const ordering = orderingLayout(question)
    const stemClass = `text-[17px] sm:text-lg leading-relaxed [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_table]:text-sm [&_th]:text-left [&_td]:pr-4 [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_th]:border [&_th]:border-border [&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1 ${MARKDOWN_LIST_CLASS}`

    if (ordering) {
      return (
        <Card className="w-full">
          <CardHeader className="pb-3">
            {showMeta && <QuestionMeta question={question} />}
            {ordering.lead && (
              <MarkdownText conceptNames={conceptNames} className={stemClass}>{ordering.lead}</MarkdownText>
            )}
          </CardHeader>

          <CardContent className="space-y-3">
            <OrderingQuestion
              key={question.id}
              layout={ordering}
              answer={selectedAnswer}
              correctAnswer={question.answer}
              isLocked={isLocked}
              showExplanation={showExplanation}
              onAnswer={onAnswer}
            />
            {/* The tail is the entry instruction ("Enter the letters…"), which
                the list replaces; anything else it says still reads. */}
            {ordering.tail && !/^enter the letters/i.test(ordering.tail) && (
              <MarkdownText conceptNames={conceptNames} className={stemClass}>{ordering.tail}</MarkdownText>
            )}

            {showExplanation && answered && (
              <ExplanationPanel
                explanation={question.explanation}
                wikiLinks={question.wiki_link}
                verification={question.verification}
                questionId={question.id}
                isCorrect={autoCorrect}
                examinerReport={question.examiner_report}
              />
            )}
          </CardContent>
        </Card>
      )
    }

    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          {showMeta && <QuestionMeta question={question} />}
          <MarkdownText conceptNames={conceptNames} className={`text-[17px] sm:text-lg leading-relaxed [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_table]:text-sm [&_th]:text-left [&_td]:pr-4 [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_th]:border [&_th]:border-border [&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1 ${MARKDOWN_LIST_CLASS}`}>
            {question.stem}
          </MarkdownText>
        </CardHeader>

        <CardContent className="space-y-3">
          <FreeEntryInput
            // A free-entry answer that was typed but never submitted lives only
            // in the input's own state, where no prop change would clear it —
            // so tie the input's identity to the question.
            key={question.id}
            answer={selectedAnswer ?? ''}
            isLocked={isLocked}
            correctAnswer={question.answer}
            showExplanation={showExplanation}
            onSubmit={onAnswer}
            selfGrade={selfGrade}
            onSelfGrade={onSelfGrade}
          />

          {showExplanation && answered && (
            <ExplanationPanel
              explanation={question.explanation}
              wikiLinks={question.wiki_link}
              verification={question.verification}
              questionId={question.id}
              isCorrect={correct}
              examinerReport={question.examiner_report}
            />
          )}
        </CardContent>
      </Card>
    )
  }

  // ── multi-part ───────────────────────────────────────────────────────────
  const parts = question.parts ?? []
  const matching = matchingLayout(question)

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        {showMeta && <QuestionMeta question={question} />}
        {question.stem && (
          <MarkdownText conceptNames={conceptNames} className={`text-[17px] sm:text-lg leading-relaxed [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_table]:text-sm [&_th]:text-left [&_td]:pr-4 [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_th]:border [&_th]:border-border [&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1 ${MARKDOWN_LIST_CLASS}`}>
            {question.stem}
          </MarkdownText>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {matching ? (
          <MatchingQuestion
            layout={matching}
            answers={isLocked && selectedAnswer
              ? (() => { try { return JSON.parse(selectedAnswer) as Record<string, string> } catch { return {} } })()
              : partAnswers}
            isLocked={isLocked}
            showExplanation={showExplanation}
            onPick={handlePartAnswer}
            conceptNames={conceptNames}
          />
        ) : parts.map(part => (
          <PartCard
            // Part labels repeat across questions ("a", "b", …), so keying on
            // the label alone would hand the next question's part A the
            // previous one's self-grade and typed answer.
            key={`${question.id}__${part.label}`}
            part={part}
            partAnswer={isLocked && selectedAnswer
              ? (() => { try { return (JSON.parse(selectedAnswer) as Record<string, string>)[part.label] ?? '' } catch { return '' } })()
              : (partAnswers[part.label] ?? '')
            }
            isLocked={isLocked}
            showExplanation={showExplanation}
            onPartAnswer={handlePartAnswer}
            selfGrade={
              part.answer === ''
                ? essaySelfGrades?.[part.label]
                : partManualGrades?.[part.label]
            }
            onSelfGrade={
              part.answer === ''
                ? (onEssaySelfGrade ? (grade) => onEssaySelfGrade(part.label, grade) : undefined)
                : (onPartManualGrade ? (grade) => onPartManualGrade(part.label, grade) : undefined)
            }
            isOnlyPart={parts.length === 1}
            conceptNames={conceptNames}
          />
        ))}
      </CardContent>
    </Card>
  )
}
