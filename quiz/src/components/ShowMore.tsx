import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface ShowMoreProps {
  /** How many the press adds. Nothing is drawn at 0. */
  nextSize: number
  /** How many are still folded away, the next page included. */
  remaining: number
  /** What the list holds, plural: "resources", "questions". */
  noun: string
  onShowMore: () => void
  /**
   * Add the next page as the reader nears the foot of the list, so a long
   * list scrolls on without a stop at every page. The button stays, for a
   * keyboard and for a browser that can't watch the scroll.
   */
  auto?: boolean
}

/** The foot of a paged list (hooks/usePagedList.ts): one more page, and how much is left. */
export function ShowMore({ nextSize, remaining, noun, onShowMore, auto = false }: ShowMoreProps) {
  const foot = useRef<HTMLDivElement>(null)
  const more = useRef(onShowMore)
  more.current = onShowMore
  const active = auto && nextSize > 0
  useEffect(() => {
    const node = foot.current
    if (!active || !node || typeof IntersectionObserver === 'undefined') return
    // Watched against the screen, whatever scrolls the list: a page ahead of the foot.
    const observer = new IntersectionObserver(
      entries => { if (entries.some(e => e.isIntersecting)) more.current() },
      { rootMargin: '600px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
    // `remaining` re-arms it after each page: a foot still in view asks again.
  }, [active, remaining])
  if (nextSize <= 0) return null
  return (
    <div ref={foot} className="flex justify-center pt-4">
      <button
        type="button"
        onClick={onShowMore}
        className="inline-flex h-11 items-center gap-2 rounded-full bg-card px-5 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Show {nextSize} more
        <span className="text-muted-foreground">of {remaining} {noun}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      </button>
    </div>
  )
}
