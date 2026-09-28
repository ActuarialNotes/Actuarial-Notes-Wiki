import { useEffect, useState, type ReactNode } from 'react'
import { Volume2, VolumeX, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSoundEffects } from '@/hooks/useSoundEffects'

/**
 * The thin row over a battle in progress: leave it (a second tap confirms,
 * so a stray one doesn't throw a close game away), what it's on, and sound.
 */
export function BattleTopRow({ onLeave, leaveLabel = 'End battle', children }: {
  onLeave: () => void
  leaveLabel?: string
  children?: ReactNode
}) {
  const [confirming, setConfirming] = useState(false)
  const { enabled, toggle, play } = useSoundEffects()

  useEffect(() => {
    if (!confirming) return
    const id = window.setTimeout(() => setConfirming(false), 3000)
    return () => window.clearTimeout(id)
  }, [confirming])

  return (
    <div className="flex items-center justify-between gap-2 pt-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => (confirming ? onLeave() : setConfirming(true))}
        className={confirming ? 'text-destructive hover:text-destructive' : 'text-muted-foreground hover:text-foreground'}
        data-testid="battle-leave"
      >
        <X className="mr-1 h-4 w-4" aria-hidden />
        {confirming ? 'Tap again to end' : leaveLabel}
      </Button>
      <div className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
        {children}
        <Button
          variant="ghost"
          size="sm"
          data-sound="none"
          onClick={() => { toggle(); play('toggleOn') }}
          aria-label={enabled ? 'Mute sounds' : 'Unmute sounds'}
          className="text-muted-foreground hover:text-foreground"
        >
          {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
