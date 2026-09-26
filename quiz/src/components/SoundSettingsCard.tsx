import { Volume2, VolumeX } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { cn } from '@/lib/utils'

/**
 * Settings → Sound. Master on/off plus a volume slider.
 *
 * The slider plays as you release it, so the level is auditioned rather than
 * guessed at.
 */
export function SoundSettingsCard() {
  const { enabled, setEnabled, volume, setVolume, play } = useSoundEffects()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sound</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Sound effects</p>
          <div className="flex gap-2">
            <button
              type="button"
              data-sound="none"
              onClick={() => { setEnabled(true); play('toggleOn') }}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                enabled
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Volume2 className="h-4 w-4" />
              On
            </button>
            <button
              type="button"
              data-sound="none"
              onClick={() => setEnabled(false)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                !enabled
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <VolumeX className="h-4 w-4" />
              Off
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Volume</p>
            <span className="text-xs text-muted-foreground tabular-nums">{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={Math.round(volume * 100)}
            disabled={!enabled}
            aria-label="Sound volume"
            onChange={e => setVolume(Number(e.target.value) / 100)}
            // Audition the new level as the slider moves, but only on release /
            // keyboard commit so dragging doesn't machine-gun the click cue.
            onPointerUp={() => play('click')}
            onKeyUp={() => play('click')}
            className="w-full max-w-xs accent-primary disabled:opacity-40"
          />
        </div>
      </CardContent>
    </Card>
  )
}
