import { useEffect, useRef } from 'react'
import { Play, X } from 'lucide-react'
import { MarkdownText } from '@/components/MarkdownText'
import { STRENGTH_TIERS, strengthTier, type Connection } from '@/lib/conceptGraph'
import { cn } from '@/lib/utils'

/**
 * **A connection's card** — opened from the strength on a line between two
 * cards. Its job is one action: **Practice**, a quiz on the questions that test
 * the two together (or, where none do, on either concept's — see
 * `practiceQuestions`). Above it, how strong the connection is; below it, what
 * each page says about the other, transcribed from the graph
 * (`lib/conceptGraph.ts`), each naming its page. The concepts themselves are
 * read in the app's popup, which the two names open. A drawer on the right of a
 * wide board, a sheet over a phone's.
 */
export interface CraftConnectionProps {
  connection: Connection
  /** The questions Practice starts a quiz on. */
  practice: readonly string[]
  layout: 'drawer' | 'sheet'
  onClose: () => void
  /** Open a concept in the app's popup. */
  onRead: (name: string) => void
  /** Start a quiz on these questions. */
  onPractice: (ids: string[]) => void
}

const TIER_WORD = { weak: 'Weak connection', moderate: 'Moderate connection', strong: 'Strong connection' } as const

export function CraftConnection({ connection, practice, layout, onClose, onRead, onPractice }: CraftConnectionProps) {
  const { a, b, strength, mentions } = connection
  const tier = strengthTier(strength)
  const practiceRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  // A card opened by a tap takes the focus — on its one action, when it has one.
  useEffect(() => {
    ;(practiceRef.current ?? closeRef.current)?.focus({ preventScroll: true })
  }, [connection.key])

  const name = (n: string) => (
    <button
      type="button"
      onClick={() => onRead(n)}
      className="action-title-underline text-left font-semibold leading-snug"
    >
      {n}
    </button>
  )

  return (
    <aside
      aria-label={`Connection: ${a} and ${b}`}
      className={cn(
        'flex flex-col bg-card text-card-foreground shadow-2xl',
        layout === 'drawer' ? 'craft-drawer-in h-full w-[22rem] rounded-xl' : 'craft-sheet-in max-h-[70dvh] w-full rounded-t-2xl',
      )}
      data-testid="craft-connection"
    >
      <div className="flex items-start gap-2 px-4 pb-2 pt-4">
        <h2 className="min-w-0 flex-1 text-lg">
          {name(a)}
          <span className="mx-1.5 font-normal text-muted-foreground">and</span>
          {name(b)}
        </h2>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close the connection"
          className="-mr-1 -mt-1 rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-4 [scrollbar-width:thin]" data-math-scope="">
        <section aria-label="Strength" className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tabular-nums leading-none" data-testid="craft-connection-strength">{strength}</span>
            <span className="text-sm font-medium">{TIER_WORD[tier]}</span>
          </div>
          {/* The measure, 0–100, with the two places its bands start. */}
          <div className="relative h-1.5 rounded-full bg-muted" role="img" aria-label={`${strength} out of 100`}>
            <div
              className="h-full rounded-full"
              style={{ width: `${strength}%`, background: 'var(--exam-accent-vivid, hsl(var(--primary)))' }}
            />
            {[STRENGTH_TIERS.moderate, STRENGTH_TIERS.strong].map(t => (
              <span key={t} aria-hidden className="absolute top-0 h-full w-px bg-card" style={{ left: `${t}%` }} />
            ))}
          </div>
        </section>

        {practice.length > 0 && (
          <button
            ref={practiceRef}
            type="button"
            onClick={() => onPractice([...practice])}
            data-sound="begin"
            className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-semibold text-white shadow-[var(--shadow-card)] transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            style={{ background: 'var(--exam-accent-vivid, hsl(var(--primary)))' }}
          >
            <Play className="h-5 w-5" aria-hidden />
            Practice {practice.length} {practice.length === 1 ? 'question' : 'questions'}
          </button>
        )}

        {mentions.length > 0 && (
          <ul className="space-y-2">
            {mentions.map(m => (
              <li key={`${m.from}|${m.text}`} className="rounded-lg bg-muted/50 px-3 py-2 text-sm leading-relaxed">
                <MarkdownText className="[&_p]:my-0">{m.text}</MarkdownText>
                <button
                  type="button"
                  onClick={() => onRead(m.from)}
                  className="mt-1 text-xs text-muted-foreground underline decoration-border underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground"
                >
                  {m.from}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  )
}
