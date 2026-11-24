// The Flashcards screen's More menu (docs/redesign-spec.md §7a.3): what the
// footer's toolbar held before the screen was redrawn. Rows that do something
// close the menu; rows that switch a setting stay open and say how it stands.

import type { ReactNode } from 'react'
import { BookOpen, Image, Keyboard, Layers, Maximize2, RotateCcw, Shuffle, Sigma, Sparkles, Trash2, Type } from 'lucide-react'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import { CARD_BACK_PARTS, type CardBackPart } from '@/lib/flashcardDeck'
import { cn } from '@/lib/utils'

function Row({ icon, label, value, onClick, className, pressed, sound, testId }: {
  icon: ReactNode
  label: string
  /** The setting as it stands, at the right. */
  value?: string
  onClick: () => void
  className?: string
  pressed?: boolean
  sound?: string
  testId?: string
}) {
  return (
    <li className={cn('border-b border-border last:border-b-0', className)}>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={pressed}
        data-sound={sound}
        data-testid={testId}
        className="flex min-h-[56px] w-full items-center gap-3.5 rounded-md text-left text-[17px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center">{icon}</span>
        <span className="min-w-0 flex-1">{label}</span>
        {value && <span className="shrink-0 text-base font-normal">{value}</span>}
      </button>
    </li>
  )
}

const BACK_ICON: Record<CardBackPart, ReactNode> = {
  definition: <Type className="h-[22px] w-[22px]" />,
  math: <Sigma className="h-[22px] w-[22px]" />,
  images: <Image className="h-[22px] w-[22px]" />,
}

const onOff = (on: boolean) => (on ? 'On' : 'Off')

export function FlashcardsMoreMenu({
  onClose,
  conceptName,
  onRead,
  shuffled,
  onShuffle,
  backFirst,
  onBackFirst,
  backParts,
  onBackPart,
  onFocus,
  completedCount,
  onClearCompleted,
  onStudyAgain,
  onRemove,
  onShortcuts,
}: {
  onClose: () => void
  /** The card on screen. */
  conceptName: string
  /** Open its page in the reader. */
  onRead: () => void
  shuffled: boolean
  onShuffle: () => void
  /** Cards open on their back. */
  backFirst: boolean
  onBackFirst: () => void
  backParts: ReadonlySet<CardBackPart>
  onBackPart: (part: CardBackPart) => void
  onFocus: () => void
  completedCount: number
  onClearCompleted: () => void
  /** Un-complete every card and start over. */
  onStudyAgain: () => void
  /** Take the card on screen out of the deck. */
  onRemove: () => void
  onShortcuts: () => void
}) {
  const icon = 'h-[22px] w-[22px]'
  const then = (act: () => void) => () => { onClose(); act() }
  return (
    <Popup onClose={onClose} labelledBy="flashcards-more-title">
      <PopupTitle id="flashcards-more-title" className="sr-only">More</PopupTitle>
      <ul className="-my-2 flex flex-col">
        <Row icon={<BookOpen className={icon} />} label={`Read ${conceptName}`} onClick={then(onRead)} />
        <Row
          icon={<Shuffle className={icon} />}
          label="Shuffle"
          value={onOff(shuffled)}
          pressed={shuffled}
          sound="none"
          onClick={onShuffle}
        />
        <Row
          icon={<Layers className={icon} />}
          label="Show the back first"
          value={onOff(backFirst)}
          pressed={backFirst}
          onClick={onBackFirst}
        />
        {CARD_BACK_PARTS.map(({ part, label }) => (
          <Row
            key={part}
            icon={BACK_ICON[part]}
            label={`${label} on the back`}
            value={onOff(backParts.has(part))}
            pressed={backParts.has(part)}
            onClick={() => onBackPart(part)}
          />
        ))}
        <Row icon={<Maximize2 className={icon} />} label="Focus mode" testId="flashcards-focus" onClick={then(onFocus)} />
        {completedCount > 0 && (
          <>
            <Row
              icon={<Sparkles className={icon} />}
              label={`Clear ${completedCount} completed`}
              onClick={then(onClearCompleted)}
            />
            <Row icon={<RotateCcw className={icon} />} label="Study them all again" sound="study" onClick={then(onStudyAgain)} />
          </>
        )}
        <Row icon={<Trash2 className={icon} />} label="Remove this card" onClick={then(onRemove)} />
        <Row icon={<Keyboard className={icon} />} label="Keyboard shortcuts" onClick={then(onShortcuts)} className="hidden sm:block" />
      </ul>
    </Popup>
  )
}
