import { useEffect, useRef, useState } from 'react'
import { Volume1, Volume2, VolumeX } from 'lucide-react'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { DEFAULT_VOLUME } from '@/lib/soundConfig'
import { cn } from '@/lib/utils'

/**
 * The sidebar's sound control: mute/unmute plus a volume slider in a small
 * popout, sitting beside the theme picker so the two ambient settings people
 * actually fiddle with mid-session are one press away from any page.
 *
 * Settings → Sound (`SoundSettingsCard`) is still the full surface (it adds the
 * cue previews); both read the same engine store, so they can't disagree.
 */
export function SoundPopover({ collapsed = false }: { collapsed?: boolean }) {
  const { enabled, setEnabled, volume, setVolume, play } = useSoundEffects()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  // A muted-looking icon covers both ways sound can be off: the switch, and a
  // slider dragged to zero.
  const muted = !enabled || volume <= 0
  const Icon = muted ? VolumeX : volume < 0.5 ? Volume1 : Volume2

  function toggleMute() {
    if (muted) {
      // Unmuting from a zeroed slider would otherwise turn sound "on" silently.
      if (volume <= 0) setVolume(DEFAULT_VOLUME)
      setEnabled(true)
      play('toggleOn')
    } else {
      setEnabled(false)
    }
  }

  return (
    <div ref={ref} className="relative">
      {open && (
        <div className="absolute bottom-full right-0 mb-1 w-48 rounded-md border bg-popover shadow-md p-2 z-50 text-left">
          <p className="px-1 pb-1.5 text-xs font-semibold text-muted-foreground">Sound</p>

          <button
            type="button"
            data-sound="none"
            onClick={toggleMute}
            aria-pressed={!muted}
            className="w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent/60 transition-colors"
          >
            <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="font-medium">{muted ? 'Unmute' : 'Mute'}</span>
            <span className="ml-auto text-xs text-muted-foreground tabular-nums">
              {muted ? 'Off' : `${Math.round(volume * 100)}%`}
            </span>
          </button>

          <div className="px-2 pt-2 pb-1">
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={Math.round(volume * 100)}
              disabled={!enabled}
              aria-label="Sound volume"
              onChange={e => setVolume(Number(e.target.value) / 100)}
              // Audition the new level, but only on release / keyboard commit so
              // dragging doesn't machine-gun the click cue.
              onPointerUp={() => play('click')}
              onKeyUp={() => play('click')}
              className="w-full accent-primary disabled:opacity-40"
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label="Sound settings"
        aria-expanded={open}
        title="Sound"
        className={cn(
          'flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors',
          collapsed ? 'lg:w-full py-2 px-3' : 'h-full px-2',
          open && 'bg-accent/60 text-foreground'
        )}
      >
        <Icon className="h-4 w-4" />
      </button>
    </div>
  )
}
