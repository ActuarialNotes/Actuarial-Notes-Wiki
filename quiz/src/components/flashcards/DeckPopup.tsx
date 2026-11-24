// The deck, as a popup over the card being studied (docs/redesign-spec.md
// §7a.3; deck management decided with the maintainer, 2026-11-23): every card
// as a tile, the one on screen outlined. A tile goes to its card, is dragged to
// another place, and is taken out by its cross; the foot clears the completed
// cards and empties the deck.

import { useEffect, useId, useRef, useState } from 'react'
import { X } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CheckMark } from '@/components/CheckMark'
import { LevelSquare } from '@/components/LevelSquare'
import { Button } from '@/components/ui/button'
import { OUTLINE_TILE } from '@/components/ui/OutlineCard'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import type { FlashCard } from '@/hooks/useFlashcards'
import { deckCountLabel } from '@/lib/flashcardDeck'
import type { MasteryState } from '@/lib/mastery'
import { MASTERY_LABEL } from '@/lib/masteryBadge'
import { cn } from '@/lib/utils'

// The layers of a card's clear animation: the line racing round the border,
// the disc flooding out from the middle, the halo, and the checkmark stroked
// over the top. The shared timeline lives in index.css (`.flashcard-clearing`
// and friends). The four are gathered under one `.flashcard-clear-body`
// because that wrapper is what implodes at the end; the burst of little lines
// is outside it, so it is still full size when the card has shrunk away.
const CLEAR_OVERLAY = (
  <>
    <span className="flashcard-clear-body" aria-hidden="true">
      <svg className="flashcard-clear-ring" width="100%" height="100%" aria-hidden="true">
        <rect width="100%" height="100%" rx="11" pathLength="100" />
      </svg>
      <span className="flashcard-clear-glow" />
      <span className="flashcard-clear-wash"><span /></span>
      <svg className="flashcard-clear-check" viewBox="0 0 24 24">
        <path d="M4 12.5 L9.5 18 L20 6.5" />
      </svg>
    </span>
    <svg className="flashcard-clear-burst" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M34 24 H44 M14 24 H4 M24 14 V4 M24 34 V44" />
      <path
        className="flashcard-clear-burst-short"
        d="M30.4 17.6 L34.6 13.4 M17.6 17.6 L13.4 13.4 M30.4 30.4 L34.6 34.6 M17.6 30.4 L13.4 34.6"
      />
    </svg>
  </>
)

function DeckTile({
  card,
  level,
  current,
  clearing,
  onSelect,
  onRemove,
}: {
  card: FlashCard
  level: MasteryState
  current: boolean
  clearing: boolean
  onSelect: () => void
  onRemove: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.name })
  return (
    <li
      ref={setNodeRef}
      data-card-name={card.name}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 50 : undefined,
      }}
      className={cn(
        OUTLINE_TILE,
        'relative flex min-h-[60px] items-stretch',
        current && 'border-2 border-foreground',
        clearing && 'flashcard-clearing',
      )}
    >
      {clearing && CLEAR_OVERLAY}
      <button
        type="button"
        {...attributes}
        {...listeners}
        data-testid="deck-card"
        data-sound="study"
        aria-current={current || undefined}
        onClick={onSelect}
        className="flex min-w-0 flex-1 cursor-pointer select-none items-center gap-2.5 rounded-[18px] py-2 pl-3.5 text-left text-[15px] font-semibold leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <LevelSquare state={level} size="sm" decorative />
        <span className="min-w-0 flex-1 break-words">{card.name}</span>
        <span className="sr-only">{MASTERY_LABEL[level]}</span>
        {card.completedAt && <CheckMark className="h-5 w-5 shrink-0 text-foreground" label="Completed" />}
      </button>
      <button
        type="button"
        aria-label={`Remove ${card.name}`}
        title="Remove"
        onClick={onRemove}
        className="flex w-11 shrink-0 items-center justify-center rounded-[18px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
    </li>
  )
}

export function DeckPopup({
  cards,
  activeName,
  levels,
  clearingNames,
  onSelect,
  onRemove,
  onDragEnd,
  onClearCompleted,
  onRemoveAll,
  onClose,
}: {
  /** The deck, in the order it is studied. */
  cards: readonly FlashCard[]
  /** The card on screen behind the popup. */
  activeName: string | undefined
  /** Each concept's level, by lower-cased name. */
  levels: ReadonlyMap<string, MasteryState>
  /** Lower-cased names of the cards playing their clear animation. */
  clearingNames: ReadonlySet<string>
  onSelect: (name: string) => void
  onRemove: (name: string) => void
  onDragEnd: (event: DragEndEvent) => void
  onClearCompleted: () => void
  onRemoveAll: () => void
  onClose: () => void
}) {
  const titleId = useId()
  const [confirming, setConfirming] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
  )
  const completed = cards.filter(c => c.completedAt).length

  // Open on the card being studied.
  useEffect(() => {
    if (!activeName) return
    for (const el of listRef.current?.querySelectorAll<HTMLElement>('[data-card-name]') ?? []) {
      if (el.dataset.cardName === activeName) {
        el.scrollIntoView({ block: 'center', behavior: 'instant' })
        break
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Follow the clear sweep down the deck: the card that started last, when it
  // has drifted out of view.
  const clearingNow = clearingNames.size > 0 ? [...clearingNames].at(-1) : undefined
  useEffect(() => {
    if (!clearingNow) return
    for (const el of listRef.current?.querySelectorAll<HTMLElement>('[data-card-name]') ?? []) {
      if (el.dataset.cardName?.toLowerCase() !== clearingNow) continue
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      break
    }
  }, [clearingNow])

  return (
    <Popup onClose={onClose} labelledBy={titleId} className="sm:max-w-2xl">
      <div className="flex items-baseline justify-between gap-3">
        <PopupTitle id={titleId}>Deck</PopupTitle>
        <span className="text-base font-semibold tabular-nums" data-testid="deck-count">{deckCountLabel(cards.length)}</span>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={cards.map(c => c.name)} strategy={rectSortingStrategy}>
          <ul ref={listRef} className="grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2 sm:grid-cols-3">
            {cards.map(card => (
              <DeckTile
                key={card.name}
                card={card}
                level={levels.get(card.name.toLowerCase()) ?? 'new'}
                current={card.name === activeName}
                clearing={clearingNames.has(card.name.toLowerCase())}
                onSelect={() => { onSelect(card.name); onClose() }}
                onRemove={() => onRemove(card.name)}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <div className="flex flex-col gap-3">
        {completed > 0 && (
          <Button variant="edge" className="h-12 rounded-full text-base" onClick={onClearCompleted}>
            Clear {completed} completed
          </Button>
        )}
        {confirming ? (
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1" role="group" aria-label="Remove all cards">
            <span className="text-base font-semibold">Remove all {cards.length}?</span>
            <span className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="min-h-11 rounded-md px-2 text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Keep them
              </button>
              <button
                type="button"
                onClick={onRemoveAll}
                className="min-h-11 rounded-md px-2 text-base font-semibold text-answer-incorrect focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Remove all
              </button>
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="min-h-11 self-start rounded-md text-base font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Remove all
          </button>
        )}
      </div>
    </Popup>
  )
}
