import { useState, useEffect, useRef, useMemo } from 'react'
import { AnswerOption, AnswerList } from '@/components/AnswerOption'
import { ExplanationPanel } from '@/components/ExplanationPanel'
import { TopicBadge } from '@/components/TopicBadge'
import { MarkdownText, MARKDOWN_LIST_CLASS, READING_MD_CLASS } from '@/components/MarkdownText'
import { SelfGradeButtons } from '@/components/SelfGradeButtons'
import { GradeSuggestion } from '@/components/GradeSuggestion'
import { SampleAnswerCards, ExaminerReportCard } from '@/components/AnswerReference'
import { Button } from '@/components/ui/button'
import { InsertCellButton } from '@/components/quiz/InsertCellButton'
import { insertAtCaret, partWantsSheet } from '@/lib/questionSheetPart'
import { SpreadsheetPartButton } from '@/components/quiz/SpreadsheetButton'
import { cn } from '@/lib/utils'
import { isAnswerCorrect, normalizeAnswerText, estimateEssayScore } from '@/lib/parser'
import { useAnswerChecks } from '@/hooks/useAnswerChecks'
import { RUBRIC } from '@/lib/checklistKeys'
import { checklistKey, useChecklistStore, usePartTicks } from '@/stores/checklistStore'
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
  /**
   * The exam is sat with a spreadsheet (data/examSpreadsheets.ts): a part that
   * asks for numbers gets a **Use spreadsheet** button beside its label.
   */
  spreadsheet?: boolean
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
  /** The question whose spreadsheet's selected cell this box can take (Insert). */
  sheetQuestionId?: string
  /** The stem and explanation the answer belongs to, for the numeric check's suggested grade. */
  checkSource?: { stem: string; explanation: string }
}

function FreeEntryInput({ answer, isLocked, correctAnswer, showExplanation, onSubmit, autoSubmit = false, selfGrade, onSelfGrade, sheetQuestionId, checkSource }: FreeEntryInputProps) {
  const [text, setText] = useState(answer)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setText(answer)
  }, [answer])

  const isAnswered = isLocked && answer !== ''
  const autoIsRight = isAnswered && normalizeAnswerText(answer) === normalizeAnswerText(correctAnswer)
  // If user has manually graded, use that; otherwise use auto-grade
  const isRight = selfGrade !== undefined ? selfGrade === 'correct' : autoIsRight
  // A key the exact match can't read ("Approximately \$17,735 (thousands)"):
  // the figures, compared, suggest the grade the reader then gives.
  const checks = useAnswerChecks(isAnswered && !autoIsRight && !!checkSource)
  const check = useMemo(
    () => (checks && isAnswered && !autoIsRight && checkSource
      ? checks.checkNumericAnswer(answer, { ...checkSource, answer: correctAnswer })
      : null),
    [checks, isAnswered, autoIsRight, checkSource, answer, correctAnswer],
  )
  // Not red while the figures say it matches and the reader hasn't graded it.
  const looksWrong = !isRight && !(selfGrade === undefined && check?.verdict === 'match')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setText(val)
    if (autoSubmit) onSubmit(val)
  }

  function insertCell(value: string) {
    const el = inputRef.current
    const { text: next, caret } = insertAtCaret(text, el?.selectionStart ?? text.length, el?.selectionEnd ?? text.length, value)
    setText(next)
    if (autoSubmit) onSubmit(next)
    requestAnimationFrame(() => {
      el?.focus()
      el?.setSelectionRange(caret, caret)
    })
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
            isAnswered && looksWrong ? 'border-red-400 dark:border-red-600' : '',
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
      {!isLocked && sheetQuestionId && <InsertCellButton questionId={sheetQuestionId} onInsert={insertCell} />}

      {showExplanation && isAnswered && (
        <div className="space-y-2 text-sm">
          {!autoIsRight && (
            <p className="text-muted-foreground">
              Correct answer: <span className="font-semibold text-foreground">{correctAnswer}</span>
            </p>
          )}
          {!autoIsRight && onSelfGrade && (
            <SelfGradeButtons
              value={selfGrade ?? null}
              onChange={onSelfGrade}
              suggested={check?.suggestion}
              hint={check && checks && <GradeSuggestion {...checks.numericCheckMessage(check)} from="figure" />}
            />
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
  /** The question this part belongs to — whose spreadsheet's selected cell Insert drops in. */
  questionId: string
  /** The part asks for numbers and the exam is sat with a spreadsheet. */
  wantsSheet?: boolean
  /** The question's own stem: a question with no lettered parts asks its question there, not in the part. */
  questionStem?: string
}

function PartCard({ part, partAnswer, isLocked, showExplanation, onPartAnswer, selfGrade: externalSelfGrade, onSelfGrade, isOnlyPart = false, conceptNames, questionId, wantsSheet = false, questionStem = '' }: PartCardProps) {
  // What the answer checks read: the part, asking its question in the
  // question's stem when it has none of its own.
  const asked = useMemo(() => (part.stem ? part : { ...part, stem: questionStem }), [part, questionStem])
  const checks = useAnswerChecks(isLocked && part.answer === '')
  const checklist = useMemo(
    () => (checks && part.answer === '' ? checks.partChecklist(asked) : null),
    [checks, part.answer, asked],
  )
  const ticksKey = checklistKey(questionId, part.label)
  const ticks = usePartTicks(ticksKey)
  const toggleTick = useChecklistStore(state => state.toggle)
  const clearTicks = useChecklistStore(state => state.clear)
  // A part open for answering again starts with no ticks.
  useEffect(() => {
    if (!isLocked) clearTicks(ticksKey)
  }, [isLocked, ticksKey, clearTicks])
  const isEssay = part.answer === ''
  const isAnswered = isLocked && (isEssay || partAnswer !== '')
  const autoIsRight = !isEssay && isAnswered && (
    part.type === 'multiple-choice'
      ? partAnswer === part.answer
      : normalizeAnswerText(partAnswer) === normalizeAnswerText(part.answer)
  )

  const [internalSelfGrade, setInternalSelfGrade] = useState<SelfGrade | null>(null)
  const responseRef = useRef<HTMLTextAreaElement>(null)

  function insertCell(value: string) {
    const el = responseRef.current
    const { text, caret } = insertAtCaret(partAnswer, el?.selectionStart ?? partAnswer.length, el?.selectionEnd ?? partAnswer.length, value)
    onPartAnswer(part.label, text)
    requestAnimationFrame(() => {
      el?.focus()
      el?.setSelectionRange(caret, caret)
    })
  }
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
    // A calculation part is checked on its final figure, an essay against its
    // checklist; the keyword count is left for a part with neither.
    const check = isLocked && checks ? checks.checkNumericAnswer(partAnswer, asked) : null
    const ticked = checklist && checks ? checks.checklistSuggestion(checklist, ticks) : null
    const keywordScore =
      isLocked && checks && partAnswer.trim() && !check && !checklist
        ? estimateEssayScore(partAnswer, part.explanation ?? '')
        : null

    // No surface of its own: the question sits on the page, and a hairline
    // above each part is all that sets it off from the one before.
    return (
      <div className="border-t border-border pt-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Part {part.label.toUpperCase()}
            {part.points > 0 && (
              <span className="ml-1 font-normal">({part.points} pt{part.points !== 1 ? 's' : ''})</span>
            )}
          </span>
          {!isLocked && wantsSheet
            ? <SpreadsheetPartButton />
            : <span className="text-sm text-muted-foreground italic">Written response</span>}
        </div>

        {part.stem && <MarkdownText className={PART_STEM_CLASS} conceptNames={conceptNames}>{part.stem}</MarkdownText>}

        {!isLocked ? (
          <div className="space-y-2">
          <textarea
            ref={responseRef}
            value={partAnswer}
            onChange={e => onPartAnswer(part.label, e.target.value)}
            placeholder="Write your response here…"
            rows={5}
            className="w-full rounded-md border px-3 py-2 text-base leading-relaxed bg-background resize-y focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <InsertCellButton questionId={questionId} onInsert={insertCell} />
          </div>
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
            {showExplanation && part.explanation && (
              <SampleAnswerCards
                markdown={part.explanation}
                checklist={checklist ? { list: checklist, ticks, onToggle: (sample, point) => toggleTick(ticksKey, sample, point) } : undefined}
              />
            )}
            {showExplanation && part.examiner_report && (
              <ExaminerReportCard
                markdown={part.examiner_report}
                rubric={checklist?.rubric ? { list: checklist.rubric, ticked: ticks[RUBRIC] ?? [], onToggle: point => toggleTick(ticksKey, RUBRIC, point) } : undefined}
              />
            )}

            {showExplanation && (
              <SelfGradeButtons
                value={effectiveSelfGrade}
                onChange={handleSelfGradeClick}
                prompt={isOnlyPart ? 'How did you do?' : 'How did you do on this part?'}
                suggested={check?.suggestion ?? ticked?.suggestion}
                hint={checks && (check
                  ? <GradeSuggestion {...checks.numericCheckMessage(check)} from="figure" />
                  : ticked && checklist && <GradeSuggestion {...checks.checklistMessage(ticked, checklist)} from="checklist" />)}
              />
            )}
          </div>
        )}
      </div>
    )
  }

  // ── Graded part (MC or free-entry) ─────────────────────────────────────────
  return (
    <div className="border-t border-border pt-5 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Part {part.label.toUpperCase()}
          {part.points > 0 && (
            <span className="ml-1 font-normal">({part.points} pt{part.points !== 1 ? 's' : ''})</span>
          )}
        </span>
        {!isLocked && wantsSheet && <SpreadsheetPartButton />}
        {isAnswered && (
          <span className={isRight ? 'text-green-600 dark:text-green-400 text-sm font-medium' : effectiveSelfGrade === 'partial' ? 'text-yellow-600 dark:text-yellow-400 text-sm font-medium' : 'text-red-600 dark:text-red-400 text-sm font-medium'}>
            {isRight ? '✓ Correct' : effectiveSelfGrade === 'partial' ? '~ Partial' : '✗ Incorrect'}
          </span>
        )}
      </div>

      {part.stem && <MarkdownText className={PART_STEM_CLASS} conceptNames={conceptNames}>{part.stem}</MarkdownText>}

      {part.type === 'multiple-choice' ? (
        <AnswerList>
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
        </AnswerList>
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
          sheetQuestionId={questionId}
          checkSource={asked}
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
  spreadsheet = false,
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
      <div className="w-full">
        <div className="pb-6">
          {showMeta && (
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
          )}
          <MarkdownText conceptNames={conceptNames} className={`text-[17px] sm:text-lg leading-relaxed [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 ${MARKDOWN_LIST_CLASS}`}>
            {question.stem}
          </MarkdownText>
        </div>

        <div className="space-y-3">
          <AnswerList data-tour="answer-options">
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
          </AnswerList>

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
        </div>
      </div>
    )
  }

  // ── free-entry ───────────────────────────────────────────────────────────
  if (question.type === 'free-entry') {
    const answered = isLocked && selectedAnswer !== null
    const autoCorrect = answered && isAnswerCorrect(question, selectedAnswer!)
    const correct = selfGrade !== undefined ? selfGrade === 'correct' : autoCorrect

    return (
      <div className="w-full">
        <div className="pb-6">
          {showMeta && (
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
          )}
          <MarkdownText conceptNames={conceptNames} className={`text-[17px] sm:text-lg leading-relaxed [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_table]:text-sm [&_th]:text-left [&_td]:pr-4 [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_th]:border [&_th]:border-border [&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1 ${MARKDOWN_LIST_CLASS}`}>
            {question.stem}
          </MarkdownText>
        </div>

        <div className="space-y-3">
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
            sheetQuestionId={question.id}
            checkSource={question}
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
        </div>
      </div>
    )
  }

  // ── multi-part ───────────────────────────────────────────────────────────
  const parts = question.parts ?? []

  return (
    <div className="w-full">
      <div className="pb-6">
        {showMeta && (
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
        )}
        {question.stem && (
          <MarkdownText conceptNames={conceptNames} className={`text-[17px] sm:text-lg leading-relaxed [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_table]:text-sm [&_th]:text-left [&_td]:pr-4 [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_th]:border [&_th]:border-border [&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1 ${MARKDOWN_LIST_CLASS}`}>
            {question.stem}
          </MarkdownText>
        )}
      </div>

      <div className="space-y-6">
        {parts.map(part => (
          <PartCard
            // Part labels repeat across questions ("a", "b", …), so keying on
            // the label alone would hand the next question's part A the
            // previous one's self-grade and typed answer.
            key={`${question.id}__${part.label}`}
            part={part}
            questionStem={question.stem}
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
            questionId={question.id}
            wantsSheet={spreadsheet && part.type !== 'multiple-choice' && partWantsSheet(part.stem, question.stem)}
          />
        ))}
      </div>
    </div>
  )
}
