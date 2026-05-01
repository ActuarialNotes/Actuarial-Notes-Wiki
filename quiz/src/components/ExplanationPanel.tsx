import { cn } from '@/lib/utils'
import { MarkdownText } from '@/components/MarkdownText'
import { WikiContent } from '@/components/WikiContent'

interface ExplanationPanelProps {
  explanation: string
  wikiLinks: string[]
  isCorrect: boolean
}

export function ExplanationPanel({ explanation, wikiLinks, isCorrect }: ExplanationPanelProps) {
  return (
    <div
      className={cn(
        'rounded-lg border p-4 mt-4 space-y-3',
        isCorrect
          ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
          : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
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

      <MarkdownText className="text-sm text-foreground leading-relaxed [&_p]:my-1.5 [&_p:first-child]:mt-0 [&_table]:text-xs [&_th]:text-left [&_td]:pr-4 [&_table]:border-collapse [&_td]:border [&_td]:border-current/20 [&_th]:border [&_th]:border-current/20 [&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1">
        {explanation}
      </MarkdownText>

      {wikiLinks.length > 0 && (
        <div className="space-y-2 pt-1">
          {wikiLinks.map(link => (
            <WikiContent key={link} link={link} />
          ))}
        </div>
      )}
    </div>
  )
}
