import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { AnswerOption } from '@/components/AnswerOption'
import { ExplanationPanel } from '@/components/ExplanationPanel'
import { TopicBadge } from '@/components/TopicBadge'
import { MarkdownText } from '@/components/MarkdownText'
import { Button } from '@/components/ui/button'
import { isAnswerCorrect, normalizeAnswerText, estimateEssayScore } from '@/lib/parser'
import type { Question, Part } from '@/lib/parser'

export type SelfGrade = 'correct' | 'partial' | 'incorrect'

interface QuestionCardProps {
  question: Question
  selectedAnswer: string | null
  onAnswer: (key: string) => void
  showExplanation: boolean
  isLocked?: boolean   // true once the answer is confirmed and cannot be changed
  showMeta?: boolean   // show exam/topic/difficulty badges; false during live quiz
  onNext?: () => void  // when provided, clicking any locked answer advances
  essaySelfGrades?: Record<string, SelfGrade>  // keyed by part label (for controlled self-grading)
  onEssaySelfGrade?: (partLabel: string, grade: SelfGrade) => void
}

// ── Free-entry input ────────────────────────────────────────────────────────

interface FreeEntryInputProps {
  answer: string
  isLocked: boolean
  correctAnswer: string
  showExplanation: boolean
  onSubmit: (value: string) => void
  autoSubmit?: boolean
}

function FreeEntryInput({ answer, isLocked, correctAnswer, showExplanation, onSubmit, autoSubmit = false }: FreeEntryInputProps) {
  const [text, setText] = useState(answer)
  const inputRef = useRef<HTMLInputElement>(null)

  // Sync when answer changes externally (e.g. navigating back to a question)
  useEffect(() => {
    setText(answer)
  }, [answer])

  const isAnswered = isLocked && answer !== ''
  const isRight = isAnswered && normalizeAnswerText(answer) === normalizeAnswerText(correctAnswer)

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
            'flex-1 rounded-md border px-3 py-2 text-sm bg-background',
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
        <div className="text-sm">
          {!isRight && (
            <p className="text-muted-foreground">
              Correct answer: <span className="font-semibold text-foreground">{correctAnswer}</span>
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
}

const PART_MD_CLASS = 'text-sm leading-relaxed [&_p]:my-1.5 [&_p:first-child]:mt-0 [&_table]:text-xs [&_th]:text-left [&_td]:pr-4 [&_table]:border-collapse [&_td]:border [&_td]:border-current/20 [&_th]:border [&_th]:border-current/20 [&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1'

function SelfGradeButtons({ value, onChange }: { value: SelfGrade | null; onChange: (g: SelfGrade) => void }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs text-muted-foreground">How did you do on this part?</p>
      <div className="flex flex-wrap gap-2">
        {(['correct', 'partial', 'incorrect'] as const).map(grade => {
          const active = value === grade
          const cfg = {
            correct: { label: '✓ Full credit', active: 'bg-green-600 hover:bg-green-700 text-white border-green-600', inactive: 'border-green-600/40 text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950' },
            partial:  { label: '~ Partial',     active: 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500', inactive: 'border-yellow-500/40 text-yellow-700 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-950' },
            incorrect:{ label: '✗ No credit',   active: 'bg-red-600 hover:bg-red-700 text-white border-red-600',         inactive: 'border-red-600/40 text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950' },
          }[grade]
          return (
            <button
              key={grade}
              onClick={() => onChange(grade)}
              className={[
                'inline-flex items-center rounded-md border px-3 py-1.5 text-xs font-medium transition-colors',
                active ? cfg.active : cfg.inactive,
              ].join(' ')}
            >
              {cfg.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PartCard({ part, partAnswer, isLocked, showExplanation, onPartAnswer, selfGrade: externalSelfGrade, onSelfGrade }: PartCardProps) {
  const isEssay = part.answer === ''
  const isAnswered = isLocked && (isEssay || partAnswer !== '')
  const isRight = !isEssay && isAnswered && (
    part.type === 'multiple-choice'
      ? partAnswer === part.answer
      : normalizeAnswerText(partAnswer) === normalizeAnswerText(part.answer)
  )

  const [internalSelfGrade, setInternalSelfGrade] = useState<SelfGrade | null>(null)
  const effectiveSelfGrade = externalSelfGrade ?? internalSelfGrade

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

    return (
      <div className="rounded-lg border bg-card p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Part {part.label.toUpperCase()}
            {part.points > 0 && (
              <span className="ml-1 font-normal">({part.points} pt{part.points !== 1 ? 's' : ''})</span>
            )}
          </span>
          <span className="text-xs text-muted-foreground italic">Written response</span>
        </div>

        <MarkdownText className={PART_MD_CLASS}>{part.stem}</MarkdownText>

        {!isLocked ? (
          <textarea
            value={partAnswer}
            onChange={e => onPartAnswer(part.label, e.target.value)}
            placeholder="Write your response here…"
            rows={4}
            className="w-full rounded-md border px-3 py-2 text-sm bg-background resize-y focus:outline-none focus:ring-2 focus:ring-ring"
          />
        ) : (
          <div className="space-y-3">
            {partAnswer.trim() ? (
              <div className="rounded-md border bg-muted/20 p-3 space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Your Response</p>
                <p className="text-sm whitespace-pre-wrap text-foreground">{partAnswer}</p>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">No response written</p>
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

            {showExplanation && (part.explanation || part.examiner_report) && (
              <div className="rounded-md border border-border bg-muted/40 p-3 space-y-2 text-sm">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Sample Answer</p>
                {part.explanation && (
                  <MarkdownText className={PART_MD_CLASS}>{part.explanation}</MarkdownText>
                )}
                {part.examiner_report && (
                  <div className="pt-2 border-t border-current/10">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      Examiner&apos;s Notes
                    </p>
                    <MarkdownText className="leading-relaxed [&_p]:my-1.5 [&_p:first-child]:mt-0">
                      {part.examiner_report}
                    </MarkdownText>
                  </div>
                )}
              </div>
            )}

            {showExplanation && (
              <SelfGradeButtons value={effectiveSelfGrade} onChange={handleSelfGradeClick} />
            )}
          </div>
        )}
      </div>
    )
  }

  // ── Graded part (MC or free-entry) ─────────────────────────────────────────
  return (
    <div className="rounded-lg border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Part {part.label.toUpperCase()}
          {part.points > 0 && (
            <span className="ml-1 font-normal">({part.points} pt{part.points !== 1 ? 's' : ''})</span>
          )}
        </span>
        {isAnswered && (
          <span className={isRight ? 'text-green-600 dark:text-green-400 text-xs font-medium' : 'text-red-600 dark:text-red-400 text-xs font-medium'}>
            {isRight ? '✓ Correct' : '✗ Incorrect'}
          </span>
        )}
      </div>

      <MarkdownText className={PART_MD_CLASS}>{part.stem}</MarkdownText>

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
        />
      )}

      {showExplanation && isAnswered && (part.explanation || part.examiner_report) && (
        <div className={[
          'rounded-md border p-3 space-y-2 text-sm',
          isRight
            ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
            : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950',
        ].join(' ')}>
          {!isRight && part.answer && (
            <p className="text-muted-foreground text-xs">
              Correct answer: <span className="font-semibold text-foreground">{part.answer}</span>
            </p>
          )}
          {part.explanation && (
            <MarkdownText className={PART_MD_CLASS}>{part.explanation}</MarkdownText>
          )}
          {part.examiner_report && (
            <div className="pt-2 border-t border-current/10">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Examiner&apos;s Notes
              </p>
              <MarkdownText className="leading-relaxed [&_p]:my-1.5 [&_p:first-child]:mt-0">
                {part.examiner_report}
              </MarkdownText>
            </div>
          )}
        </div>
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
          {showMeta && (
            <div className="flex flex-wrap gap-2 mb-3">
              <TopicBadge label={question.exam} variant="topic" />
              <TopicBadge label={question.topic} variant="tag" />
              <TopicBadge label={question.difficulty} variant="difficulty" />
            </div>
          )}
          <MarkdownText className="text-base leading-relaxed [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
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
    const correct = answered && isAnswerCorrect(question, selectedAnswer!)

    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          {showMeta && (
            <div className="flex flex-wrap gap-2 mb-3">
              <TopicBadge label={question.exam} variant="topic" />
              <TopicBadge label={question.topic} variant="tag" />
              <TopicBadge label={question.difficulty} variant="difficulty" />
            </div>
          )}
          <MarkdownText className="text-base leading-relaxed [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_table]:text-sm [&_th]:text-left [&_td]:pr-4 [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_th]:border [&_th]:border-border [&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1">
            {question.stem}
          </MarkdownText>
        </CardHeader>

        <CardContent className="space-y-3">
          <FreeEntryInput
            answer={selectedAnswer ?? ''}
            isLocked={isLocked}
            correctAnswer={question.answer}
            showExplanation={showExplanation}
            onSubmit={onAnswer}
          />

          {showExplanation && answered && (
            <ExplanationPanel
              explanation={question.explanation}
              wikiLinks={question.wiki_link}
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

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        {showMeta && (
          <div className="flex flex-wrap gap-2 mb-3">
            <TopicBadge label={question.exam} variant="topic" />
            <TopicBadge label={question.topic} variant="tag" />
            <TopicBadge label={question.difficulty} variant="difficulty" />
          </div>
        )}
        {question.stem && (
          <MarkdownText className="text-base leading-relaxed [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_table]:text-sm [&_th]:text-left [&_td]:pr-4 [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_th]:border [&_th]:border-border [&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1">
            {question.stem}
          </MarkdownText>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {parts.map(part => (
          <PartCard
            key={part.label}
            part={part}
            partAnswer={isLocked && selectedAnswer
              ? (() => { try { return (JSON.parse(selectedAnswer) as Record<string, string>)[part.label] ?? '' } catch { return '' } })()
              : (partAnswers[part.label] ?? '')
            }
            isLocked={isLocked}
            showExplanation={showExplanation}
            onPartAnswer={handlePartAnswer}
            selfGrade={essaySelfGrades?.[part.label]}
            onSelfGrade={onEssaySelfGrade ? (grade) => onEssaySelfGrade(part.label, grade) : undefined}
          />
        ))}

        {isLocked && onNext && (
          <p className="text-xs text-center text-muted-foreground pt-1 select-none">
            Tap any answer to continue →
          </p>
        )}
      </CardContent>
    </Card>
  )
}
