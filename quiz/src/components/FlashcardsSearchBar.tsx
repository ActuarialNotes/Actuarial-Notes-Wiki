import { useEffect, useMemo, useRef, useState } from 'react'
import { Layers, Plus, Sparkles } from 'lucide-react'
import {
  FloatingSearchBar,
  FloatingSearchInput,
  SearchBackdrop,
  SearchScopePill,
} from '@/components/FloatingSearchBar'
import { highlightMatch } from '@/components/SearchHighlight'
import { useCollectedCards } from '@/hooks/useCollectedCards'
import { useFlashcards, type FlashCard } from '@/hooks/useFlashcards'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { searchBy } from '@/lib/appSearch'

/**
 * The **Flashcards top bar** — a search bar, not a wordmark.
 *
 * Same trade as the Dashboard's (see `DashboardSearchBar`): below `lg` this row
 * held the logo and the mode pill, and it now answers the question a deck of a
 * hundred cards makes you ask — *where is that card?* It carries the hamburger
 * on its own line, and `lib/mobileNavHost.ts` is what stops `Sidebar` drawing a
 * second row above it.
 *
 * Two scopes, because a name means two different things here. **My Deck**
 * finds a card that is already in the deck and goes to it. **All Concepts**
 * searches everything that could become one — every concept on every syllabus,
 * plus anything already collected — and offers to add it, which is what the
 * "+" sheet does at length. A concept that is already in the deck says so
 * either way, and goes there instead of being added twice.
 */

type Scope = 'deck' | 'all'

const RESULT_LIMIT = 20

export function FlashcardsSearchBar({
  cards,
  onSelectCard,
  onCardsAdded,
}: {
  /** The deck, in the order it is laid out on screen. */
  cards: FlashCard[]
  /** Go to a card that is already in the deck. */
  onSelectCard: (name: string) => void
  /** A card was just added — the page flashes it into view. */
  onCardsAdded?: () => void
}) {
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState<Scope>('deck')
  const [active, setActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { syllabi } = useWikiSyllabus()
  const collectedCards = useCollectedCards(s => s.cards)
  const addCard = useFlashcards(s => s.addCard)

  // An empty deck has nothing to search, so the bar opens on the scope that
  // does — the same rule the wiki's bar follows when a page lists no concepts.
  useEffect(() => {
    if (cards.length === 0 && scope === 'deck') setScope('all')
  }, [cards.length, scope])

  useEffect(() => {
    if (!active) return
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) dismiss()
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') dismiss()
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [active])

  function dismiss() {
    setQuery('')
    setActive(false)
    inputRef.current?.blur()
  }

  const deckNames = useMemo(
    () => new Set(cards.map(c => c.name.toLowerCase())),
    [cards],
  )

  // Every concept a card could be made of: the syllabi, plus anything the
  // learner has collected (a concept can be collected off a syllabus this
  // account no longer studies).
  const allConcepts = useMemo(() => {
    const set = new Set<string>()
    for (const s of syllabi) for (const t of s.topics) for (const c of t.concepts) set.add(c.name)
    for (const c of collectedCards) set.add(c.name)
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [syllabi, collectedCards])

  const results = useMemo(() => {
    const pool = scope === 'deck' ? cards.map(c => c.name) : allConcepts
    return searchBy(pool, query, name => [name], RESULT_LIMIT)
  }, [scope, cards, allConcepts, query])

  const hasQuery = query.trim().length > 0
  const isExpanded = active && hasQuery

  function goToCard(name: string) {
    dismiss()
    onSelectCard(name)
  }

  function add(name: string) {
    addCard({ kind: 'concept', name })
    dismiss()
    onCardsAdded?.()
  }

  return (
    <>
      {isExpanded && <SearchBackdrop onDismiss={dismiss} />}

      <FloatingSearchBar ref={containerRef}>
        <>
          <FloatingSearchInput
            inputRef={inputRef}
            value={query}
            onChange={setQuery}
            onFocus={() => setActive(true)}
            onClear={dismiss}
            placeholder={scope === 'deck' ? 'Search your deck' : 'Search concepts to add'}
            ariaLabel="Search flashcards"
            navCollapsed={active}
          />

          {active && (
            <div className="pb-3">
              <div className="flex flex-wrap gap-1.5 py-2.5">
                <SearchScopePill
                  active={scope === 'deck'}
                  disabled={cards.length === 0}
                  onClick={() => setScope('deck')}
                >
                  My Deck
                </SearchScopePill>
                <SearchScopePill active={scope === 'all'} onClick={() => setScope('all')}>
                  All Concepts
                </SearchScopePill>
              </div>

              {hasQuery && (
                <ul className="max-h-[50vh] space-y-0.5 overflow-y-auto">
                  {results.length === 0 ? (
                    <li className="px-2 py-2 text-xs text-muted-foreground">No matches.</li>
                  ) : (
                    results.map(name => {
                      const inDeck = deckNames.has(name.toLowerCase())
                      return (
                        <li key={name}>
                          <ConceptRow
                            name={name}
                            query={query}
                            inDeck={inDeck}
                            onSelect={() => (inDeck ? goToCard(name) : add(name))}
                          />
                        </li>
                      )
                    })
                  )}
                </ul>
              )}
            </div>
          )}
        </>
      </FloatingSearchBar>
    </>
  )
}

function ConceptRow({
  name,
  query,
  inDeck,
  onSelect,
}: {
  name: string
  query: string
  inDeck: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-sound={inDeck ? undefined : 'select'}
      aria-label={inDeck ? `Go to ${name}` : `Add ${name} to your deck`}
      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent/60"
    >
      {inDeck ? (
        <Layers className="h-4 w-4 shrink-0 text-violet-500" aria-hidden />
      ) : (
        <Sparkles className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      )}
      <span className="min-w-0 flex-1 truncate text-sm">{highlightMatch(name, query)}</span>
      {inDeck ? (
        // Not a CheckMark: in this deck that mark means a card you have
        // *finished*, and a row that only says "already here" must not claim it.
        <span className="shrink-0 text-[11px] font-medium text-muted-foreground">In deck</span>
      ) : (
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary">
          <Plus className="h-3 w-3 shrink-0" />
          Add
        </span>
      )}
    </button>
  )
}
