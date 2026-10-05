import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, BookOpen, Play, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarkdownText } from '@/components/MarkdownText'
import { MasteryBadge } from '@/components/MasteryBadge'
import { ConceptActionMenu } from '@/components/ConceptActionMenu'
import { ConceptQuestionsModal } from '@/components/wiki/ConceptQuestionsModal'
import { fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath, type WikiEntryRef } from '@/lib/wikiRoutes'
import { filterQuestions, type Question } from '@/lib/parser'
import { questionPreview } from '@/lib/questionPreview'
import {
  CRAFT_RELATIONS,
  conceptSummary,
  isPrimitive,
  nodeConnections,
  type CraftModule,
  type CraftProgress,
  type CraftRecipe,
} from '@/lib/conceptCraft'
import type { ConceptLevels } from '@/hooks/useConceptLevels'
import { cn } from '@/lib/utils'

/**
 * **The inspector** — what a concept on the board *is*, without leaving the
 * board: its opening definition and formula, the links it has on the board
 * (and how many it has left to find), and the practice questions tagged to it.
 *
 * It is a summary, not a reader. The title opens the app's concept action
 * menu (`ConceptActionMenu` — quiz, study guide, deck, learning progress, fact
 * check) exactly as the concept popup's title does, **Read the page** opens
 * the popup itself, and **Practice** opens the concept's question browser
 * (`ConceptQuestionsModal`), the one every other surface starts a concept quiz
 * from. A drawer on the right of a wide board, a sheet over a phone's.
 */
export interface CraftInspectorProps {
  module: CraftModule
  progress: CraftProgress
  name: string
  levels: ConceptLevels
  /** Every question in the bank, or null while they load. */
  questions: Question[] | null
  layout: 'drawer' | 'sheet'
  onClose: () => void
  /** Select another concept on the board (a name in a connection). */
  onFocus: (name: string) => void
  /** Show a link's reveal card again. */
  onRecipe: (recipe: CraftRecipe) => void
  /** Open the concept in the app's reader. */
  onRead: (name: string) => void
}

const PREVIEWS = 3

export function CraftInspector({
  module,
  progress,
  name,
  levels,
  questions,
  layout,
  onClose,
  onFocus,
  onRecipe,
  onRead,
}: CraftInspectorProps) {
  const entry = useMemo<WikiEntryRef>(() => ({ kind: 'concept', name }), [name])
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [practising, setPractising] = useState(false)
  const titleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let cancelled = false
    setMarkdown(null)
    setFailed(false)
    fetchWikiFile(entryRefToRepoPath(entry))
      .then(raw => { if (!cancelled) setMarkdown(raw) })
      .catch(() => { if (!cancelled) setFailed(true) })
    return () => { cancelled = true }
  }, [entry])

  const summary = useMemo(() => (markdown ? conceptSummary(markdown) : null), [markdown])
  const links = useMemo(() => nodeConnections(module, progress, name), [module, progress, name])
  const tagged = useMemo(() => (questions ? filterQuestions(questions, { concept: name }) : null), [questions, name])
  const primitive = isPrimitive(module, name)

  const conceptButton = (n: string) => (
    <button
      type="button"
      onClick={() => onFocus(n)}
      className={cn(
        'rounded font-medium underline decoration-border underline-offset-2 transition-colors hover:decoration-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        n.toLowerCase() === name.toLowerCase() && 'no-underline',
      )}
    >
      {n}
    </button>
  )

  const linkRow = (r: CraftRecipe) => (
    <li key={`${r.a}|${r.b}`} className="flex items-start gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm leading-snug">
      <span className="min-w-0 flex-1">
        {conceptButton(r.a)}{' '}
        <button
          type="button"
          onClick={() => onRecipe(r)}
          className="mx-0.5 inline-flex items-center rounded-full bg-background px-2 py-0.5 align-middle text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          title="Why?"
        >
          {CRAFT_RELATIONS[r.relation].label.toLowerCase()}
        </button>{' '}
        {conceptButton(r.b)}
        <ArrowRight className="mx-1 inline h-3.5 w-3.5 align-[-2px] text-muted-foreground" aria-label="makes" />
        {conceptButton(r.result)}
      </span>
    </li>
  )

  const body = (
    <>
      <div className="flex items-start gap-2 px-4 pb-3 pt-4">
        <div className="min-w-0 flex-1 space-y-1.5">
          {/* The title is the concept's action menu, as it is in the reader. */}
          <button
            ref={titleRef}
            type="button"
            data-play-menu-trigger
            onClick={() => setMenuOpen(v => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label={`${name} — page actions`}
            className="action-title-underline text-left text-lg font-semibold leading-snug"
          >
            {name}
          </button>
          <ConceptActionMenu entry={entry} open={menuOpen} onClose={() => setMenuOpen(false)} anchorRef={titleRef} content={markdown} />
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <MasteryBadge state={levels.levelOf(name)} />
            <span>{primitive ? 'Starting concept' : 'Crafted'}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close the inspector"
          className="-mr-1 -mt-1 rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 pb-4 [scrollbar-width:thin]" data-math-scope="">
        <section className="space-y-3">
          {failed && <p className="text-sm text-muted-foreground">Couldn’t load this page.</p>}
          {!summary && !failed && <div className="h-16 animate-pulse rounded-lg bg-muted/60" />}
          {summary?.lead && <MarkdownText className="text-sm leading-relaxed [&_p]:my-0">{summary.lead}</MarkdownText>}
          {summary && summary.formulas.length > 0 && (
            <div className="space-y-1 overflow-x-auto rounded-lg bg-muted/50 px-3 py-2 text-sm" data-math-block="">
              {summary.formulas.map(f => (
                <MarkdownText key={f}>{`$$${f}$$`}</MarkdownText>
              ))}
            </div>
          )}
          <Button variant="outline" size="sm" className="gap-2" onClick={() => onRead(name)}>
            <BookOpen className="h-4 w-4" aria-hidden />
            Read the page
          </Button>
        </section>

        <section className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">On the board</h3>
          {links.madeFrom.length + links.usedIn.length === 0 ? (
            <p className="text-sm text-muted-foreground">No links yet — drag it onto another concept.</p>
          ) : (
            <ul className="space-y-1.5">
              {links.madeFrom.map(linkRow)}
              {links.usedIn.map(linkRow)}
            </ul>
          )}
          {links.undiscovered > 0 && (
            <p className="text-xs text-muted-foreground" data-testid="craft-undiscovered">
              {links.undiscovered === 1 ? 'One more link' : `${links.undiscovered} more links`} to find
            </p>
          )}
        </section>

        <section className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Practice questions</h3>
          {tagged === null ? (
            <div className="h-10 animate-pulse rounded-lg bg-muted/60" />
          ) : tagged.length === 0 ? (
            <p className="text-sm text-muted-foreground">No questions are tagged to this concept yet.</p>
          ) : (
            <>
              <ul className="space-y-1.5">
                {tagged.slice(0, PREVIEWS).map(q => (
                  <li key={q.id} className="rounded-lg bg-muted/50 px-3 py-2 text-xs leading-relaxed">
                    {/* The clamp sits inside the padding, or the third line
                        shows half-cut in it. */}
                    <span className="line-clamp-2">
                      <MarkdownText inline>{questionPreview(q, '')}</MarkdownText>
                    </span>
                  </li>
                ))}
              </ul>
              <Button size="sm" className="gap-2" onClick={() => setPractising(true)} data-sound="begin">
                <Play className="h-4 w-4" aria-hidden />
                Practice {tagged.length} {tagged.length === 1 ? 'question' : 'questions'}
              </Button>
            </>
          )}
        </section>
      </div>
      {practising && <ConceptQuestionsModal conceptName={name} onClose={() => setPractising(false)} />}
    </>
  )

  return (
    <aside
      aria-label={`Inspector: ${name}`}
      className={cn(
        'flex flex-col bg-card text-card-foreground shadow-2xl',
        layout === 'drawer' ? 'craft-drawer-in h-full w-[22rem] rounded-xl' : 'craft-sheet-in max-h-[70dvh] w-full rounded-t-2xl',
      )}
      data-testid="craft-inspector"
    >
      {body}
    </aside>
  )
}
