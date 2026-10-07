import { useEffect, useRef } from 'react'
import { Plus } from 'lucide-react'
import { CheckMark } from '@/components/CheckMark'
import { ExamLogo } from '@/components/ExamLogo'
import type { CraftTopic } from '@/lib/conceptCraft'
import { examAccentStyle } from '@/lib/examColors'
import { cn } from '@/lib/utils'

export interface PackGroup {
  /** The exam_progress key — the logo and the colour. */
  exam: string
  /** "Exam P", "Exam MAS-I" — as the ladder names it. */
  name: string
  topics: CraftTopic[]
}

/**
 * **The starter packs** — what the board's **+** opens: every exam section the
 * vault makes a topic of (`craftTopics`), under its exam's logo, in ladder
 * order. Picking one adds its seeds to the board; a pack already on the board
 * carries the checkmark and can't be added twice. A menu hung off the button,
 * scrolling in place rather than covering the board.
 */
export function CraftPackMenu({
  groups,
  added,
  onAdd,
  onClose,
}: {
  groups: readonly PackGroup[]
  /** Topic ids already on the board. */
  added: ReadonlySet<string>
  onAdd: (topic: CraftTopic) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const target = e.target as Element | null
      // The + itself toggles the menu; leave that click to it.
      if (target?.closest('[data-craft-add]')) return
      if (ref.current && !ref.current.contains(target)) onClose()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="Starter packs"
      data-testid="craft-pack-menu"
      className="paper-drop absolute right-2 top-full z-50 mt-1 flex max-h-[min(70dvh,34rem)] w-[min(22rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-xl ring-1 ring-border"
    >
      <p className="shrink-0 border-b border-border/60 px-4 py-2.5 text-sm font-semibold">Add a starter pack</p>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-1 [scrollbar-width:thin]">
        {groups.map(group => (
          <section key={group.name} aria-label={group.name} style={examAccentStyle(group.exam)}>
            <h3 className="sticky top-0 z-10 flex items-center gap-2 bg-popover/95 px-4 pb-1.5 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
              <ExamLogo examKey={group.exam} size="sm" />
              {group.name}
            </h3>
            {group.topics.map(t => {
              const isAdded = added.has(t.id)
              return (
                <button
                  key={t.id}
                  type="button"
                  role="menuitem"
                  disabled={isAdded}
                  aria-disabled={isAdded}
                  onClick={() => onAdd(t)}
                  data-testid="craft-pack"
                  data-pack={t.id}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-2 text-left transition-colors focus-visible:outline-none focus-visible:bg-accent',
                    isAdded ? 'cursor-default' : 'hover:bg-accent',
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className={cn('block truncate text-sm', isAdded && 'text-muted-foreground')}>{t.title}</span>
                    <span className="block truncate text-xs tabular-nums text-muted-foreground">
                      {t.concepts.length} concepts{t.weight ? ` · ${t.weight} of the exam` : ''}
                    </span>
                  </span>
                  {isAdded ? (
                    <CheckMark className="h-4 w-4" label="On the board" />
                  ) : (
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ background: 'var(--exam-accent-vivid, hsl(var(--primary)))' }}
                      aria-hidden
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>
              )
            })}
          </section>
        ))}
      </div>
    </div>
  )
}
