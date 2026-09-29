// A dialog opened from an in-world screen. It is portalled to the body like
// every overlay that must clear its host's stacking context (style guide §8.3),
// which takes it out of the `.actuaria dark` scope — so it carries the scope
// with it, and stays in space.

import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { cn } from '@/lib/utils'

export function ActuariaDialog({
  title,
  onClose,
  children,
  className,
}: {
  title: ReactNode
  onClose: () => void
  children: ReactNode
  className?: string
}) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    panel.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [onClose])

  return (
    <OverlayPortal>
      {/* z-50: the modal band of the ladder (style guide §8.2). */}
      <div className="actuaria dark fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 text-foreground backdrop-blur-sm paper-scrim" style={{ colorScheme: 'dark' }} onClick={onClose}>
        <div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label={typeof title === 'string' ? title : undefined}
          tabIndex={-1}
          onClick={e => e.stopPropagation()}
          className={cn('relative flex max-h-[85vh] w-full max-w-md flex-col gap-4 overflow-y-auto rounded-2xl bg-card p-6 shadow-2xl outline-none', className)}
        >
          <div className="flex items-start gap-3">
            <h2 className="actuaria-display min-w-0 flex-1 text-sm">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss"
              className="-mr-2 -mt-2 rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </OverlayPortal>
  )
}
