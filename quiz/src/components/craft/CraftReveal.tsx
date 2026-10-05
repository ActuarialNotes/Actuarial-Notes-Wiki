import { useEffect } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { MarkdownText } from '@/components/MarkdownText'
import { CRAFT_RELATIONS, type CraftRecipe } from '@/lib/conceptCraft'
import { cn } from '@/lib/utils'

/**
 * The card a link is revealed on: the two ingredients, the relation between
 * them, what they make, and why — the recipe's `why` line, which restates the
 * result's own page. Shown when a link is found, when a known pair is dropped
 * together again, and when a tag on the board is tapped. It leaves by itself
 * after a while; tapping the result opens it in the inspector.
 */
export interface RevealState {
  recipe: CraftRecipe
  /** Found just now, rather than recalled. */
  found: boolean
  /** The result is new to the board. */
  newNode: boolean
  /** Ingredients a milestone has just added to the deck. */
  introduces: string[]
  /** A line of celebration above the recipe — the challenge met, the graph complete. */
  headline?: string
}

const STAY_MS = 9000

export function CraftReveal({ reveal, onClose, onInspect }: { reveal: RevealState; onClose: () => void; onInspect: (name: string) => void }) {
  const { recipe } = reveal
  useEffect(() => {
    const t = window.setTimeout(onClose, reveal.headline ? STAY_MS * 1.5 : STAY_MS)
    return () => window.clearTimeout(t)
  }, [reveal, onClose])

  return (
    <div
      role="status"
      aria-live="polite"
      className="toast-pop-in pointer-events-auto relative w-full max-w-md rounded-xl bg-card p-4 text-card-foreground shadow-2xl"
      data-testid="craft-reveal"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
      {reveal.headline && <p className="mb-1.5 pr-8 text-sm font-semibold text-green-600 dark:text-green-400">{reveal.headline}</p>}
      <p className="pr-8 text-sm leading-relaxed">
        <span className="font-medium">{recipe.a}</span>{' '}
        <span className="mx-0.5 inline-flex rounded-full bg-muted px-2 py-0.5 align-middle text-[11px] font-medium text-muted-foreground">
          {CRAFT_RELATIONS[recipe.relation].label.toLowerCase()}
        </span>{' '}
        <span className="font-medium">{recipe.b}</span>
        <ArrowRight className="mx-1.5 inline h-3.5 w-3.5 align-[-2px] text-muted-foreground" aria-label="makes" />
        <button
          type="button"
          onClick={() => onInspect(recipe.result)}
          className={cn(
            'rounded font-semibold underline decoration-border underline-offset-2 transition-colors hover:decoration-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          {recipe.result}
        </button>
        {reveal.found && reveal.newNode && (
          <span className="ml-1.5 inline-flex rounded-full bg-green-50 px-1.5 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wide text-green-900 dark:bg-green-950 dark:text-green-100">
            New
          </span>
        )}
      </p>
      <MarkdownText className="mt-2 text-sm leading-relaxed text-muted-foreground [&_p]:my-0">{recipe.why}</MarkdownText>
      {reveal.introduces.length > 0 && (
        <p className="mt-2 text-xs text-foreground">
          New in your deck: <span className="font-medium">{reveal.introduces.join(', ')}</span>
        </p>
      )}
    </div>
  )
}
