import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { SectionLeak } from '@/lib/performanceAnalytics'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { dialogOpenOver } from '@/lib/layeredDialog'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { SectionLeaksCard } from './SectionLeaksCard'

/**
 * **Where you're losing marks**, opened from the Analytics summary's *Marks at
 * risk* tile: every section's marks lost, each row a quiz on that section.
 */
export function SectionLeaksDialog({ leaks, examLabel, onClose }: {
  leaks: SectionLeak[]
  examLabel: string
  onClose: () => void
}) {
  useSoundOnMount('open')
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !dialogOpenOver(dialogRef.current)) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <OverlayPortal>
      <div
        ref={dialogRef}
        className="fixed inset-0 z-[130] flex items-start justify-center overflow-y-auto bg-background/80 backdrop-blur-sm paper-scrim"
        role="dialog"
        aria-modal="true"
        aria-label="Where you're losing marks"
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
      >
        <div className="relative mx-4 my-8 w-full max-w-lg">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <SectionLeaksCard leaks={leaks} examLabel={examLabel} />
        </div>
      </div>
    </OverlayPortal>
  )
}
