import { cn } from '@/lib/utils'
import { MarkdownText } from '@/components/MarkdownText'
import { WikiContent } from '@/components/WikiContent'
import { VerificationBadge } from '@/components/VerificationBadge'
import { contentPathFromVerification, type Verification } from '@/lib/verification'

interface ExplanationPanelProps {
  explanation: string
  wikiLinks: string[]
  isCorrect: boolean
  examinerReport?: string
  /** The question's VERIFY record, so the reader can see and challenge it. */
  verification?: Verification
  /** Display name for the log panel's header, e.g. the question id. */
  questionId?: string
}

export function ExplanationPanel({
  explanation,
  wikiLinks,
  isCorrect,
  examinerReport,
  verification,
  questionId,
}: ExplanationPanelProps) {
  // A student who has just worked the question and disagreed with it is the
  // best-placed error detector this project has, and this is the moment they
  // are looking straight at the discrepancy. Put the affordance here.
  const contentPath = contentPathFromVerification(verification)
  return (
    <div
      className={cn(
        'rounded-lg p-4 mt-4 space-y-3',
        isCorrect
          ? 'bg-green-50 dark:bg-green-950'
          : 'bg-red-50 dark:bg-red-950'
      )}
    >
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="text-lg">{isCorrect ? '✓' : '✗'}</span>
        <span
          className={cn(
            'font-semibold',
            isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'
          )}
        >
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </span>
      </div>

      {explanation && (
        <MarkdownText className="text-sm text-foreground leading-relaxed [&_p]:my-1.5 [&_p:first-child]:mt-0 [&_table]:text-xs [&_th]:text-left [&_td]:pr-4 [&_table]:border-collapse [&_td]:border [&_td]:border-current/20 [&_th]:border [&_th]:border-current/20 [&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1">
          {explanation}
        </MarkdownText>
      )}

      {examinerReport && (
        <div className="pt-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
            Examiner&apos;s Notes
          </p>
          <MarkdownText className="text-sm text-foreground leading-relaxed [&_p]:my-1.5 [&_p:first-child]:mt-0">
            {examinerReport}
          </MarkdownText>
        </div>
      )}

      {wikiLinks.length > 0 && (
        <div className="space-y-2 pt-1">
          {wikiLinks.map(link => (
            <WikiContent key={link} link={link} />
          ))}
        </div>
      )}

      {contentPath && (
        <div className="flex items-center justify-end border-t border-current/10 pt-2">
          <VerificationBadge
            verification={verification}
            contentPath={contentPath}
            contentName={questionId ?? contentPath}
          />
        </div>
      )}
    </div>
  )
}
