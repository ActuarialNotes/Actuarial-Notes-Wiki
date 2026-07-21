import type { Question, Part } from '@/lib/parser'
import { MarkdownText } from '@/components/MarkdownText'
import { ExplanationPanel } from '@/components/ExplanationPanel'
import { WikiContent } from '@/components/WikiContent'

// Shared markdown styling for revealed answers — matches the table styling the
// quiz and question rows use so data-heavy answers (triangles, etc.) render as
// tables rather than raw pipe text.
const ANSWER_MD_CLASS =
  'text-sm text-foreground leading-relaxed [&_p]:my-1.5 [&_p:first-child]:mt-0 [&_table]:text-xs [&_th]:text-left [&_td]:pr-4 [&_table]:border-collapse [&_td]:border [&_td]:border-current/20 [&_th]:border [&_th]:border-current/20 [&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1'

// One part of a multi-part question, rendered read-only with its correct answer.
function PartReveal({ part }: { part: Part }) {
  const isEssay = part.answer === ''
  return (
    <div className="rounded-md bg-background/60 p-3 space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Part {part.label.toUpperCase()}
        {part.points > 0 && (
          <span className="ml-1 font-normal">({part.points} pt{part.points !== 1 ? 's' : ''})</span>
        )}
      </p>

      {part.stem && <MarkdownText className={ANSWER_MD_CLASS}>{part.stem}</MarkdownText>}

      {part.type === 'multiple-choice' ? (
        <div className="space-y-1">
          {part.options.map(opt => {
            const isCorrect = opt.key === part.answer
            return (
              <div
                key={opt.key}
                className={`flex gap-2 text-sm rounded px-2 py-1 ${
                  isCorrect ? 'bg-green-100 dark:bg-green-900/50 text-green-900 dark:text-green-200 font-medium' : ''
                }`}
              >
                <span className="font-medium text-muted-foreground shrink-0">{opt.key})</span>
                <span><MarkdownText inline>{opt.text}</MarkdownText></span>
              </div>
            )
          })}
        </div>
      ) : !isEssay ? (
        <p className="text-sm">
          <span className="text-muted-foreground">Answer: </span>
          <span className="font-semibold text-foreground"><MarkdownText inline>{part.answer}</MarkdownText></span>
        </p>
      ) : null}

      {part.explanation && (
        <div className="space-y-1">
          {isEssay && (
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sample Answer</p>
          )}
          <MarkdownText className={ANSWER_MD_CLASS}>{part.explanation}</MarkdownText>
        </div>
      )}

      {part.examiner_report && (
        <div className="pt-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
            Examiner&apos;s Notes
          </p>
          <MarkdownText className={ANSWER_MD_CLASS}>{part.examiner_report}</MarkdownText>
        </div>
      )}
    </div>
  )
}

// Read-only answer reveal used by the question browsers (Search page + quiz
// floating search + concept modal). Handles every question type: multiple-choice
// (explanation only — the row itself highlights the correct option), free-entry
// (the correct answer value + explanation), and multi-part (per-part answers).
export function QuestionAnswerReveal({ question }: { question: Question }) {
  // ── multi-part ────────────────────────────────────────────────────────────
  if (question.type === 'multi-part') {
    const parts = question.parts ?? []
    return (
      <div className="rounded-lg p-4 mt-4 space-y-3 bg-green-50 dark:bg-green-950">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="text-lg">✓</span>
          <span className="font-semibold text-green-800 dark:text-green-300">Sample Answer</span>
        </div>

        {parts.map(part => <PartReveal key={part.label} part={part} />)}

        {question.wiki_link.length > 0 && (
          <div className="space-y-2 pt-1">
            {question.wiki_link.map(link => (
              <WikiContent key={link} link={link} />
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── free-entry ────────────────────────────────────────────────────────────
  if (question.type === 'free-entry') {
    return (
      <div className="mt-4 space-y-2">
        {question.answer && (
          <div className="rounded-lg bg-green-50 dark:bg-green-950 px-4 py-3 text-sm">
            <span className="text-muted-foreground">Correct answer: </span>
            <span className="font-semibold text-foreground"><MarkdownText inline>{question.answer}</MarkdownText></span>
          </div>
        )}
        <ExplanationPanel
          explanation={question.explanation}
          wikiLinks={question.wiki_link}
          isCorrect
          examinerReport={question.examiner_report}
        />
      </div>
    )
  }

  // ── multiple-choice ───────────────────────────────────────────────────────
  return (
    <ExplanationPanel
      explanation={question.explanation}
      wikiLinks={question.wiki_link}
      isCorrect
      examinerReport={question.examiner_report}
    />
  )
}
