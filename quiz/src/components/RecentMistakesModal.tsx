import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, RotateCcw, X } from 'lucide-react'
import type { RecentMistake } from '@/lib/recentMistakes'
import { MarkdownText } from '@/components/MarkdownText'
import { Button } from '@/components/ui/button'

// Question markdown (GFM tables + LaTeX) with the same table styling the quiz
// uses — mirrors QuestionSearchRow so data-heavy stems render as tables.
const STEM_MD_CLASS =
  'leading-relaxed [&_p]:my-1.5 [&_p:first-child]:mt-0 [&_table]:text-xs [&_th]:text-left [&_td]:pr-4 [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_th]:border [&_th]:border-border [&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1'

// Only the current slide and its immediate neighbours are rendered — the rest
// stay empty spacers so a long mistake list doesn't typeset dozens of LaTeX
// stems up front. Neighbours are kept warm so a swipe lands on real content.
const RENDER_WINDOW = 1

function missedAgo(answeredAt: string, now: Date): string {
  const days = Math.floor((now.getTime() - new Date(answeredAt).getTime()) / 86_400_000)
  if (!Number.isFinite(days) || days < 0) return 'Missed just now'
  if (days === 0) return 'Missed today'
  if (days === 1) return 'Missed yesterday'
  return `Missed ${days} days ago`
}

interface Props {
  /** Uncorrected mistakes, most recent first. */
  mistakes: RecentMistake[]
  onClose: () => void
  /** Launch a quiz of just this one question. */
  onRetry: (questionId: string) => void
}

/**
 * Recent-mistakes reader. Shows one missed question at a time — the most recent
 * first — as a swipeable horizontal track, with a single big "Try Again" that
 * quizzes just the question on screen. The correct answer is deliberately never
 * revealed here: the point is to re-attempt it, not to read the solution.
 */
export function RecentMistakesModal({ mistakes, onClose, onRetry }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const current = mistakes[Math.min(index, mistakes.length - 1)]

  const goTo = useCallback((next: number) => {
    const track = trackRef.current
    const clamped = Math.max(0, Math.min(next, mistakes.length - 1))
    setIndex(clamped)
    track?.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' })
  }, [mistakes.length])

  // Keep the counter in step with a swipe/drag on the track.
  const handleScroll = () => {
    const track = trackRef.current
    if (!track || track.clientWidth === 0) return
    const at = Math.round(track.scrollLeft / track.clientWidth)
    setIndex(prev => (prev === at ? prev : at))
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') goTo(index - 1)
      else if (e.key === 'ArrowRight') goTo(index + 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, goTo, index])

  if (!current) return null
  const now = new Date()

  return createPortal(
    // z-[120]: the ceremony band — same layer as the other dashboard insight
    // overlays, so it clears the sidebar/bottom-nav chrome.
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Mistakes"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-[121] flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-card text-card-foreground shadow-2xl sm:rounded-2xl">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <RotateCcw className="h-4 w-4 shrink-0 text-primary" />
          <h2 className="text-sm font-bold tracking-tight">Mistakes</h2>
          <span className="ml-auto text-xs tabular-nums text-muted-foreground">
            {index + 1} of {mistakes.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="-mr-1 ml-2 p-1 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* One question per slide — swipe on touch, arrows on desktop. */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex flex-1 snap-x snap-mandatory overflow-x-auto overscroll-x-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {mistakes.map((mistake, i) => (
            <div key={mistake.question.id} className="w-full shrink-0 snap-center overflow-y-auto p-4">
              {Math.abs(i - index) <= RENDER_WINDOW && <MistakeSlide mistake={mistake} now={now} />}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t px-4 py-3">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
            aria-label="Previous mistake"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <Button size="lg" className="flex-1 gap-2" onClick={() => onRetry(current.question.id)}>
            <RotateCcw className="h-5 w-5" />
            Try Again
          </Button>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index >= mistakes.length - 1}
            className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
            aria-label="Next mistake"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function MistakeSlide({ mistake, now }: { mistake: RecentMistake; now: Date }) {
  const { question } = mistake
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1.5">
        {mistake.problemConcepts.map(c => (
          <span
            key={c.slug}
            className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {c.name}
          </span>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">{missedAgo(mistake.answeredAt, now)}</p>

      <MarkdownText className={`text-sm ${STEM_MD_CLASS}`}>{question.stem}</MarkdownText>

      {question.options.length > 0 && (
        <ul className="space-y-1">
          {question.options.map(opt => (
            <li key={opt.key} className="flex gap-2 text-sm text-muted-foreground">
              <span className="shrink-0 font-medium">{opt.key})</span>
              <span>
                <MarkdownText inline>{opt.text}</MarkdownText>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
