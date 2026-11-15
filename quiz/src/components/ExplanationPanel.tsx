import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { MarkdownText, QUESTION_MD_CLASS } from '@/components/MarkdownText'
import { WikiContent } from '@/components/WikiContent'
import { FactCheckBadge } from '@/components/FactCheckBadge'
import { contentPathFromVerification, type Verification } from '@/lib/verification'

interface ExplanationPanelProps {
  explanation: string
  wikiLinks: string[]
  /**
   * The verdict on the reader's answer. Left out where the solution is only
   * being shown (a question browsed, not answered), and then no verdict is drawn.
   */
  isCorrect?: boolean
  examinerReport?: string
  /** The question's VERIFY record, so the reader can see and challenge it. */
  verification?: Verification
  /** Display name for the log panel's header, e.g. the question id. */
  questionId?: string
}

// Marks each display equation that runs past the panel's edge, so the edge
// fades (index.css, `.math-scroll--more`) and a reader on a phone can see
// there is more to scroll to. The equation already scrolls; nothing said so.
function useMathScrollHint(ref: React.RefObject<HTMLElement | null>, deps: unknown[]) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const blocks = Array.from(root.querySelectorAll<HTMLElement>('.katex-display'))
    const mark = (el: HTMLElement) =>
      el.classList.toggle('math-scroll--more', el.scrollWidth - el.clientWidth - el.scrollLeft > 4)
    const update = () => blocks.forEach(mark)
    update()
    const onScroll = (e: Event) => mark(e.currentTarget as HTMLElement)
    blocks.forEach(el => el.addEventListener('scroll', onScroll, { passive: true }))
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update)
    observer?.observe(root)
    return () => {
      blocks.forEach(el => el.removeEventListener('scroll', onScroll))
      observer?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
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
  const bodyRef = useRef<HTMLDivElement>(null)
  useMathScrollHint(bodyRef, [explanation, examinerReport])
  return (
    <div className="mt-4 space-y-2">
      {/* The verdict wears its colour; the solution under it is the lesson and
          reads as ordinary text on an ordinary surface (style guide §4.1). */}
      {isCorrect !== undefined && (
        <div
          role="status"
          className={cn(
            'flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold',
            isCorrect
              ? 'bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100'
              : 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100'
          )}
        >
          <span aria-hidden="true">{isCorrect ? '✓' : '✗'}</span>
          <span>{isCorrect ? 'Correct' : 'Incorrect'}</span>
        </div>
      )}

      <div ref={bodyRef} className="rounded-lg bg-card p-4 space-y-3">
        {explanation && (
          <MarkdownText className={QUESTION_MD_CLASS}>
            {explanation}
          </MarkdownText>
        )}

        {examinerReport && (
          <section className="space-y-1.5 border-t border-border pt-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Examiner&apos;s Report
            </h4>
            <MarkdownText className={QUESTION_MD_CLASS}>{examinerReport}</MarkdownText>
          </section>
        )}

        {wikiLinks.length > 0 && (
          <div className="space-y-2 pt-1">
            {wikiLinks.map(link => (
              <WikiContent key={link} link={link} />
            ))}
          </div>
        )}

        {contentPath && (
          <div className="flex items-center justify-end border-t border-border pt-2">
            <FactCheckBadge
              verification={verification}
              contentPath={contentPath}
              contentName={questionId ?? contentPath}
            />
          </div>
        )}
      </div>
    </div>
  )
}
