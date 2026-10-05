import { useMemo, useRef, useState } from 'react'
import { ChevronLeft, Layers, Search } from 'lucide-react'
import { ConceptTile } from '@/components/ConceptTile'
import type { ConceptLevels } from '@/hooks/useConceptLevels'
import { cn } from '@/lib/utils'

/**
 * **The Concept Deck** — every concept the reader holds, in the order they came
 * into hand, as the app's concept tile (`components/ConceptTile.tsx`, the same
 * card the flashcard picker and Quiz Battle's topic pick draw), so a concept is
 * one card wherever it is shown, its foil edge its level. A card made and not
 * yet played with is ringed in the exam's colour, as it is on the board.
 *
 * Every card in the deck is also on the board; the deck is the way to find one
 * by name and to play without a drag. A card dragged onto another card on the
 * board is tried against it; onto empty board, it is moved there. Or a card is
 * tapped to *hold* it, and the next card tapped, here or on the board, is tried
 * against it (a keyboard, a switch, a hand that can't hold a drag). Tapping a
 * held card puts it back.
 *
 * Two shapes: a panel down the side of a wide board, and a strip along the
 * bottom of a phone's. The drag reads its axis from the shape — across the
 * strip is a scroll, *up* out of it is a drag; down the panel is a scroll,
 * *across* is a drag — so neither steals the other's gesture. With a mouse
 * any movement is a drag.
 */
export interface CraftDeckProps {
  /** The concepts in hand, in the order they came. */
  concepts: readonly string[]
  /** How many concepts the topic has in all. */
  total: number
  /** Made and not yet played with, lower-cased. */
  fresh: ReadonlySet<string>
  levels: ConceptLevels
  held: string | null
  layout: 'panel' | 'strip'
  /** Say how to play — only until the first connection is found; after that the board shows it. */
  showHow: boolean
  onTap: (name: string) => void
  /** A card in flight, at a screen point — the page draws it. */
  onDrag: (name: string, x: number, y: number) => void
  /** Let go at a screen point. */
  onDrop: (name: string, x: number, y: number) => void
  onCancel: () => void
}

const SLOP = 7

interface Press {
  name: string
  pointerId: number
  x: number
  y: number
  mouse: boolean
  dragging: boolean
}

export function CraftDeck({ concepts, total, fresh, levels, held, layout, showHow, onTap, onDrag, onDrop, onCancel }: CraftDeckProps) {
  const [query, setQuery] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const press = useRef<Press | null>(null)

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? concepts.filter(n => n.toLowerCase().includes(q)) : concepts
  }, [concepts, query])

  const tileHandlers = (name: string) => ({
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return
      press.current = { name, pointerId: e.pointerId, x: e.clientX, y: e.clientY, mouse: e.pointerType === 'mouse', dragging: false }
      // A touch is held by the card it starts on anyway; a mouse is not, and a
      // quick flick can leave the card before its first move is heard.
      if (e.pointerType === 'mouse') e.currentTarget.setPointerCapture(e.pointerId)
    },
    onPointerMove: (e: React.PointerEvent<HTMLButtonElement>) => {
      const p = press.current
      if (!p || p.pointerId !== e.pointerId) return
      const dx = e.clientX - p.x
      const dy = e.clientY - p.y
      if (!p.dragging) {
        const far = Math.hypot(dx, dy) >= SLOP
        if (!far) return
        const intoBoard = p.mouse
          || (layout === 'strip' ? dy < 0 && Math.abs(dy) > Math.abs(dx) : Math.abs(dx) > Math.abs(dy))
        if (!intoBoard) {
          // The other axis: that's the list scrolling, not a card leaving it.
          press.current = null
          return
        }
        p.dragging = true
        e.currentTarget.setPointerCapture(e.pointerId)
      }
      onDrag(p.name, e.clientX, e.clientY)
    },
    onPointerUp: (e: React.PointerEvent<HTMLButtonElement>) => {
      const p = press.current
      press.current = null
      if (!p || p.pointerId !== e.pointerId) return
      if (p.dragging) onDrop(p.name, e.clientX, e.clientY)
      else onTap(p.name)
    },
    onPointerCancel: () => {
      if (press.current?.dragging) onCancel()
      press.current = null
    },
    // Taps are resolved on pointerup above; this is the keyboard's way in.
    onClick: (e: React.MouseEvent) => {
      if (e.detail === 0) onTap(name)
    },
  })

  const tile = (name: string, className?: string) => {
    const isHeld = held?.toLowerCase() === name.toLowerCase()
    const isNew = fresh.has(name.toLowerCase())
    return (
      <div
        key={name}
        className={cn('rounded-md', isNew && 'ring-2 ring-offset-2 ring-offset-background', className)}
        // The exam's colour, as the card wears it on the board.
        style={isNew ? ({ '--tw-ring-color': 'var(--exam-accent-vivid, hsl(var(--primary)))' } as React.CSSProperties) : undefined}
      >
        <ConceptTile
          name={name}
          state={levels.levelOf(name)}
          collected={levels.isCollected(name)}
          selected={isHeld}
          showLock={false}
          aria-pressed={isHeld}
          aria-label={`${name}${isNew ? ', new' : ''}${isHeld ? ' — held' : ''}`}
          data-sound="none"
          data-testid="craft-deck-tile"
          className={cn('w-full', layout === 'strip' ? 'touch-pan-x' : 'touch-pan-y', 'cursor-grab')}
          {...tileHandlers(name)}
        />
      </div>
    )
  }

  if (layout === 'strip') {
    return (
      <section aria-label="Concept deck" className="border-t border-border bg-background pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2">
        <p className="flex items-center gap-1.5 whitespace-nowrap px-4 pb-1.5 text-xs text-muted-foreground">
          <Layers className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="font-medium text-foreground">Concept deck</span>
          <span className="tabular-nums">{concepts.length} of {total}</span>
          {showHow && <span className="ml-auto truncate">Drag a card up</span>}
        </p>
        <div className="flex gap-2 overflow-x-auto px-4 pb-1 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {concepts.map(name => tile(name, 'w-[68px] shrink-0'))}
        </div>
      </section>
    )
  }

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        className="flex items-center gap-2 rounded-full bg-card px-3.5 py-2 text-sm font-medium shadow-[var(--shadow-card)] transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={false}
      >
        <Layers className="h-4 w-4" aria-hidden />
        Concept deck
        <span className="tabular-nums text-muted-foreground">{concepts.length} of {total}</span>
      </button>
    )
  }

  return (
    <section aria-label="Concept deck" className="flex max-h-full w-72 flex-col overflow-hidden rounded-xl bg-background/95 shadow-xl ring-1 ring-border backdrop-blur-sm">
      <div className="flex items-center gap-2 px-3 pb-2 pt-3">
        <Layers className="h-4 w-4 text-muted-foreground" aria-hidden />
        <h2 className="flex-1 text-sm font-semibold">Concept deck</h2>
        <span className="text-xs tabular-nums text-muted-foreground">{concepts.length} of {total}</span>
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          aria-label="Collapse the deck"
          title="Collapse"
          aria-expanded
          className="-mr-1 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      {concepts.length > 9 && (
        <label className="mx-3 mb-2 flex h-9 items-center gap-2 rounded-md bg-muted/60 px-2.5 text-sm">
          <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Find a concept"
            aria-label="Find a concept in the deck"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
      )}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3 pt-1 [scrollbar-width:thin]">
        {shown.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground">No concept in the deck matches.</p>
        ) : (
          <div className="grid grid-cols-3 gap-2">{shown.map(name => tile(name))}</div>
        )}
      </div>
      {showHow && (
        <p className="border-t border-border/60 px-3 py-2 text-[11px] leading-snug text-muted-foreground">
          No drag? Tap a card here, then the card to try it against.
        </p>
      )}
    </section>
  )
}
