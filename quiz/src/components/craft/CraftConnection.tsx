import { useEffect, useRef } from 'react'
import { ArrowRight, Play, X } from 'lucide-react'
import { MarkdownText } from '@/components/MarkdownText'
import { MIN_STRENGTH, STRENGTH_TIERS, strengthTier, type Connection } from '@/lib/conceptGraph'
import { connectionPoints } from '@/lib/conceptCraft'
import type { Recipe } from '@/lib/conceptRecipes'
import { relationSentence, type Relation } from '@/lib/conceptRelations'
import { cn } from '@/lib/utils'

/**
 * **A connection's card** — opened from the strength on a line between two
 * cards. Its job is one action: **Practice**, a quiz on the questions that test
 * the two together (or, where none do, on either concept's — see
 * `practiceQuestions`). Above it, how strong the connection is; below it, what
 * the connection **makes** — each concept with its own page's words for how
 * the two build it (`lib/conceptRecipes.ts`) — then what each page says about
 * the other, transcribed from the graph (`lib/conceptGraph.ts`), each naming
 * its page. Its title is the connection as a sentence — the two names and
 * what one is to the other (`lib/conceptRelations.ts`) — and under the meter,
 * what finding it scored (practice is an ordinary quiz, and scores nothing on
 * the board). The concepts
 * themselves are read in the app's popup, which their names open. A drawer on
 * the right of a wide board, a sheet over a phone's.
 */
export interface CraftConnectionProps {
  connection: Connection
  /** The questions Practice starts a quiz on. */
  practice: readonly string[]
  /** What the connection makes. */
  makes: readonly Recipe[]
  /** What the connection says, 1–5 words between the two names. */
  relation: Relation
  layout: 'drawer' | 'sheet'
  onClose: () => void
  /** Open a concept in the app's popup. */
  onRead: (name: string) => void
  /** Start a quiz on these questions. */
  onPractice: (ids: string[]) => void
}

const TIER_WORD = { weak: 'Weak connection', moderate: 'Moderate connection', strong: 'Strong connection' } as const

export function CraftConnection({ connection, practice, makes, relation, layout, onClose, onRead, onPractice }: CraftConnectionProps) {
  const { strength, mentions } = connection
  const tier = strengthTier(strength)
  const faint = strength < MIN_STRENGTH
  const found = connectionPoints(strength)
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
      aria-label={`Connection: ${relationSentence(relation)}`}
      className={cn(
        'flex flex-col bg-card text-card-foreground shadow-2xl',
        layout === 'drawer' ? 'craft-drawer-in h-full w-[22rem] rounded-xl' : 'craft-sheet-in max-h-[70dvh] w-full rounded-t-2xl',
      )}
      data-testid="craft-connection"
    >
      <div className="flex items-start gap-2 px-4 pb-2 pt-4">
        {/* The connection as a sentence: subject, what it is to the other, object. */}
        <h2 className="min-w-0 flex-1 text-lg">
          {name(relation.from)}
          {/* Said of both: "A and B together make C". */}
          {relation.symmetric && (
            <>
              <span className="mx-1.5 font-normal text-muted-foreground">and</span>
              {name(relation.to)}
            </>
          )}
          <span
            className="mx-1.5 font-normal"
            style={{ color: 'var(--exam-accent, hsl(var(--primary)))' }}
            data-testid="craft-connection-relation"
          >
            {relation.label}
          </span>
          {!relation.symmetric && name(relation.to)}
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
            <span className="text-sm font-medium">{faint ? 'Faint connection' : TIER_WORD[tier]}</span>
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
          <p className="text-xs tabular-nums text-muted-foreground" data-testid="craft-connection-points">
            +{found} for finding it
          </p>
          {faint && (
            <p className="text-xs text-muted-foreground">
              {connection.via
                ? `The notes don't tie these two directly; they meet through ${connection.via}.`
                : `The notes don't tie these two directly.`}
            </p>
          )}
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

        {makes.length > 0 && (
          <ul className="space-y-2" aria-label="What it makes">
            {makes.map(r => (
              <li
                key={r.makes}
                className="rounded-lg px-3 py-2 text-sm leading-relaxed"
                style={{ background: 'var(--exam-accent-soft, hsl(var(--primary) / 0.15))' }}
                data-testid="craft-makes"
              >
                <p className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Makes
                  <button
                    type="button"
                    onClick={() => onRead(r.makes)}
                    className="action-title-underline text-left text-sm font-semibold text-foreground"
                  >
                    {r.makes}
                  </button>
                </p>
                <MarkdownText className="[&_p]:my-0">{r.text}</MarkdownText>
              </li>
            ))}
          </ul>
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
