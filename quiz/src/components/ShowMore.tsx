import { ChevronDown } from 'lucide-react'

interface ShowMoreProps {
  /** How many the press adds. Nothing is drawn at 0. */
  nextSize: number
  /** How many are still folded away, the next page included. */
  remaining: number
  /** What the list holds, plural: "resources", "questions". */
  noun: string
  onShowMore: () => void
}

/** The foot of a paged list (hooks/usePagedList.ts): one more page, and how much is left. */
export function ShowMore({ nextSize, remaining, noun, onShowMore }: ShowMoreProps) {
  if (nextSize <= 0) return null
  return (
    <div className="flex justify-center pt-4">
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
