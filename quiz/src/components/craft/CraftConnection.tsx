import { useEffect, useRef } from 'react'
import { FileText, GraduationCap, ListChecks, Play, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarkdownText } from '@/components/MarkdownText'
import { STRENGTH_TIERS, strengthTier, type Connection, type PageEvidence } from '@/lib/conceptGraph'
import type { Question } from '@/lib/parser'
import { questionPreview } from '@/lib/questionPreview'
import { cn } from '@/lib/utils'

/**
 * **A connection's card** — opened from the strength on a line between two
 * cards: how strong the connection is, what that is measured on, and the
 * vault's own words for it — each page's sentence about the other, the
 * practice questions that test the two together (with a way to practise
 * them), and the syllabus line that names both.
 *
 * Everything on it is transcribed from the graph (`lib/conceptGraph.ts`), which
 * is transcribed from the vault; nothing is written for it. The concepts
 * themselves are read in the app's popup, which the two names open. A drawer
 * on the right of a wide board, a sheet over a phone's.
 */
export interface CraftConnectionProps {
  connection: Connection
  /** The bank by id, or null while it loads. */
  questions: ReadonlyMap<string, Question> | null
  layout: 'drawer' | 'sheet'
  onClose: () => void
  /** Open a concept in the app's popup. */
  onRead: (name: string) => void
  /** Start a quiz on these questions. */
  onPractice: (ids: string[]) => void
}

const TIER_WORD = { weak: 'Weak connection', moderate: 'Moderate connection', strong: 'Strong connection' } as const
const PREVIEWS = 2

function pageLine(from: string, to: string, side: PageEvidence): string | null {
  if (side.links > 0) return `${from}’s page links to ${to}`
  if (side.texts > 0) return `${from}’s page names ${to}`
  return null
}

export function CraftConnection({ connection, questions, layout, onClose, onRead, onPractice }: CraftConnectionProps) {
  const { a, b, strength, evidence, mentions, lines } = connection
  const tier = strengthTier(strength)
  const closeRef = useRef<HTMLButtonElement>(null)
  // A card opened by a tap takes the focus, so a keyboard can read on or close it.
  useEffect(() => { closeRef.current?.focus({ preventScroll: true }) }, [connection.key])

  const tested = questions ? connection.questions.map(id => questions.get(id)).filter((q): q is Question => !!q) : null
  const pageLines = evidence.ab.links > 0 && evidence.ba.links > 0
    ? ['Each page links to the other']
    : [pageLine(a, b, evidence.ab), pageLine(b, a, evidence.ba)].filter((l): l is string => !!l)

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
      <div className="flex items-start gap-2 px-4 pb-3 pt-4">
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

      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 pb-4 [scrollbar-width:thin]" data-math-scope="">
        <section aria-label="Strength" className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tabular-nums leading-none" data-testid="craft-connection-strength">{strength}</span>
            <span className="text-sm font-medium">{TIER_WORD[tier]}</span>
          </div>
          {/* The measure, 0–100, with the two places its bands start. */}
          <div className="relative h-1.5 rounded-full bg-muted" role="img" aria-label={`${strength} out of 100`}>
            <div className={cn('h-full rounded-full', tier === 'strong' ? 'bg-primary' : 'bg-foreground/60')} style={{ width: `${strength}%` }} />
            {[STRENGTH_TIERS.moderate, STRENGTH_TIERS.strong].map(t => (
              <span key={t} aria-hidden className="absolute top-0 h-full w-px bg-card" style={{ left: `${t}%` }} />
            ))}
          </div>
          <ul className="space-y-1.5 pt-1 text-sm">
            {pageLines.map(line => (
              <li key={line} className="flex items-start gap-2">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                {line}
              </li>
            ))}
            {connection.questions.length > 0 && (
              <li className="flex items-start gap-2">
                <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                Tested together in {connection.questions.length} {connection.questions.length === 1 ? 'question' : 'questions'}
              </li>
            )}
            {lines.length > 0 && (
              <li className="flex items-start gap-2">
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                Named together in the syllabus
              </li>
            )}
          </ul>
        </section>

        {mentions.length > 0 && (
          <section className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What the pages say</h3>
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
          </section>
        )}

        {connection.questions.length > 0 && (
          <section className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tested together</h3>
            {tested === null ? (
              <div className="h-10 animate-pulse rounded-lg bg-muted/60" />
            ) : (
              <>
                <ul className="space-y-1.5">
                  {tested.slice(0, PREVIEWS).map(q => (
                    <li key={q.id} className="rounded-lg bg-muted/50 px-3 py-2 text-xs leading-relaxed">
                      {/* The clamp sits inside the padding, or the third line
                          shows half-cut in it. */}
                      <span className="line-clamp-2">
                        <MarkdownText inline>{questionPreview(q, '')}</MarkdownText>
                      </span>
                    </li>
                  ))}
                </ul>
                {tested.length > 0 && (
                  <Button size="sm" className="gap-2" onClick={() => onPractice(tested.map(q => q.id))} data-sound="begin">
                    <Play className="h-4 w-4" aria-hidden />
                    Practice {tested.length} {tested.length === 1 ? 'question' : 'questions'}
                  </Button>
                )}
              </>
            )}
          </section>
        )}

        {lines.length > 0 && (
          <section className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">In the syllabus</h3>
            <ul className="space-y-2">
              {lines.map(line => (
                <li key={line} className="border-l-2 border-border pl-3 text-sm leading-relaxed text-muted-foreground">
                  <MarkdownText inline>{line}</MarkdownText>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </aside>
  )
}
