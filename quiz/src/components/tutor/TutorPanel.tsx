import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { TutorCharacter } from '@/components/tutor/TutorCharacter'
import { TutorNowView } from '@/components/tutor/TutorNowView'
import { TutorConfusingView } from '@/components/tutor/TutorConfusingView'
import { TutorJourneyView } from '@/components/tutor/TutorJourneyView'
import { TutorSessionView } from '@/components/tutor/TutorSessionView'
import { useTutorStore, type TutorView } from '@/stores/tutorStore'
import type { TutorEngine } from '@/hooks/useTutorEngine'
import type { TutorActions } from '@/components/tutor/actions'
import type { TutorPlace } from '@/lib/tutor/context'
import type { TutorCharacter as Character } from '@/lib/tutor/character'
import { PHASES } from '@/lib/tutor/journey'

// The Tutor's panel (docs/tutor.md §9): a complementary panel, not a dialog —
// the page behind stays live — opened from the character. A card above it on a wide
// screen, a bottom sheet on a phone; wider while a session runs, because an
// Exam 5 part carries a table. In the popup band of the layer ladder (z-[58]),
// so it clears the concept popup it so often sits beside, and portalled so no
// host's stacking context can pin it (style guide §8.2–8.3). `Esc` closes it
// only while focus is inside it — the popup owns the key otherwise.

const VIEWS: { value: TutorView; label: string }[] = [
  { value: 'now', label: 'Now' },
  { value: 'confusing', label: 'Confusing' },
  { value: 'journey', label: 'Journey' },
]

interface Props {
  engine: TutorEngine
  actions: TutorActions
  place: TutorPlace
  character: Character
}

export function TutorPanel({ engine, actions, place, character }: Props) {
  const view = useTutorStore(s => s.view)
  const session = useTutorStore(s => s.session)
  const closePanel = useTutorStore(s => s.closePanel)
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
          closePanel()
        }
      }}
      className={[
        'tutor-panel tutor-panel-frame fixed z-[58] flex flex-col bg-card text-card-foreground shadow-2xl outline-none',
        'inset-x-0 rounded-t-2xl border-t border-border',
        'sm:inset-x-auto sm:right-4 sm:rounded-2xl sm:border',
        session ? 'sm:w-[min(40rem,calc(100vw-2rem))]' : 'sm:w-[26rem]',
      ].join(' ')}
    >
      <header className="flex h-14 shrink-0 items-center gap-2 px-4">
        <TutorCharacter avatarUrl={character.avatarUrl} size={28} mood={engine.ready ? 'idle' : 'thinking'} />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold">Tutor</h2>
          <p className="truncate text-xs text-muted-foreground">
            {engine.exam.label} · {PHASES[engine.phase].label}{session ? ' · in a session' : ''}
          </p>
        </div>
        <button
          type="button"
          onClick={closePanel}
          data-sound="none"
          aria-label="Close the Tutor"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </header>

      {!session && (
        <div className="shrink-0 px-4 pb-3">
          <SegmentedControl
            label="Tutor view"
            size="sm"
            value={view}
            onChange={v => useTutorStore.setState({ view: v })}
            options={VIEWS}
          />
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4">
        {session ? (
          <TutorSessionView engine={engine} actions={actions} character={character} />
        ) : view === 'now' ? (
          <TutorNowView engine={engine} actions={actions} place={place} />
        ) : view === 'confusing' ? (
          <TutorConfusingView engine={engine} actions={actions} />
        ) : (
          <TutorJourneyView engine={engine} actions={actions} character={character} />
        )}
      </div>

      {session && (
        <footer className="flex shrink-0 justify-end border-t border-border px-4 py-2">
          <Button size="sm" variant="ghost" onClick={actions.endSession}>End session</Button>
        </footer>
      )}
    </aside>,
    document.body,
  )
}
