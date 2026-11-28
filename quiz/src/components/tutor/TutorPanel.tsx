import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { TutorCharacter } from '@/components/tutor/TutorCharacter'
import type { TutorCharacter as Character } from '@/lib/tutor/character'

// The Tutor with a part open (docs/tutor.md §9): the bubble grown to fit one
// past-paper part. A complementary panel, not a dialog — the page behind stays
// live. A card above the character on a wide screen, a bottom sheet on a
// phone; wide, because an Exam 5 part carries a table. In the popup band of
// the layer ladder (z-[58]), so it clears the concept popup it so often sits
// beside, and portalled so no host's stacking context can pin it (style guide
// §8.2–8.3). `Esc` closes it only while focus is inside it — the popup owns
// the key otherwise.

interface Props {
  character: Character
  onClose: () => void
  children: ReactNode
}

export function TutorPanel({ character, onClose, children }: Props) {
  const ref = useRef<HTMLElement>(null)

  // Take focus on open, so the keyboard (and a screen reader) lands in it.
  useEffect(() => { ref.current?.focus() }, [])

  return createPortal(
    <aside
      ref={ref}
      tabIndex={-1}
      role="complementary"
      aria-label="Tutor"
      onKeyDown={e => {
        if (e.key === 'Escape') {
          e.stopPropagation()
          onClose()
        }
      }}
      className={[
        'tutor-panel tutor-panel-frame fixed z-[58] flex flex-col bg-card text-card-foreground shadow-2xl outline-none',
        'inset-x-0 rounded-t-2xl border-t border-border',
        'sm:inset-x-auto sm:right-4 sm:w-[min(40rem,calc(100vw-2rem))] sm:rounded-2xl sm:border',
      ].join(' ')}
    >
      <header className="flex h-12 shrink-0 items-center gap-2 pl-4 pr-1">
        <TutorCharacter avatarUrl={character.avatarUrl} size={24} />
        <h2 className="min-w-0 flex-1 truncate text-sm font-semibold">Tutor</h2>
        <button
          type="button"
          onClick={onClose}
          data-sound="none"
          aria-label="Close the Tutor"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4">{children}</div>
    </aside>,
    document.body,
  )
}
