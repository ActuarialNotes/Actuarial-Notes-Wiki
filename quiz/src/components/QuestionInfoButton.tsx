import { lazy, Suspense } from 'react'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Question } from '@/lib/parser'

// The panel is its own chunk: it opens on a click, and with the Fact Check
// sheet behind it, it is too much to send every reader before first paint.
const QuestionInfoDialog = lazy(() =>
  import('@/components/QuestionInfoDialog').then(m => ({ default: m.QuestionInfoDialog })),
)

/** The button half of **Question info** — the panel is `QuestionInfoDialog`. */
interface QuestionInfoButtonProps {
  question: Question
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Show topic / objective / difficulty — only once the answer is locked in. */
  showStudyMeta?: boolean
  /**
   * Open one of the question's concepts in the concept popup — `links` is
   * the question's `wiki_link` tags, `index` the one tapped. Without it, a
   * concept row goes to the concept's page.
   */
  onOpenConcept?: (links: string[], index: number) => void
  className?: string
}

export function QuestionInfoButton({
  question,
  open,
  onOpenChange,
  showStudyMeta = false,
  onOpenConcept,
  className,
}: QuestionInfoButtonProps) {
  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-label="Question info"
        aria-expanded={open}
        title="Where this question came from (i)"
        className={cn(
          'flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:bg-accent sm:px-3',
          open ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
          className,
        )}
      >
        <Info className="h-[18px] w-[18px] sm:h-4 sm:w-4" aria-hidden />
        {/* On a phone the icon carries it (the quiz bar's tools sit right of the
            question count); from `sm` up there is room for the word. */}
        <span className="sr-only sm:not-sr-only">Info</span>
      </button>

      {open && (
        <Suspense fallback={null}>
        <QuestionInfoDialog
          question={question}
          showStudyMeta={showStudyMeta}
          onOpenConcept={onOpenConcept}
          onClose={() => onOpenChange(false)}
        />
        </Suspense>
      )}
    </>
  )
}

