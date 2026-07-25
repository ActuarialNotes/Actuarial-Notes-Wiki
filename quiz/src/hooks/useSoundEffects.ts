import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react'
import type { SoundEvent } from '@/lib/soundConfig'
import {
  canIgnoreSilentSwitch,
  getSoundSettings,
  playSound,
  setIgnoreSilentSwitch,
  setSoundEnabled,
  setSoundVolume,
  subscribeSound,
  toggleSoundEnabled,
} from '@/lib/soundEngine'

/**
 * React binding for the sound engine.
 *
 * The settings live in the engine, not in component state, so a mute toggle in
 * the quiz header and the one in Settings stay in sync (they used to hold
 * independent `useState` copies and silently disagree).
 */
export function useSoundEffects() {
  const settings = useSyncExternalStore(subscribeSound, getSoundSettings, getSoundSettings)

  const play = useCallback((event: SoundEvent) => { playSound(event) }, [])

  return {
    enabled: settings.enabled,
    volume: settings.volume,
    toggle: toggleSoundEnabled,
    setEnabled: setSoundEnabled,
    setVolume: setSoundVolume,
    play,
    // iOS ringer switch — `showSilentSwitchOption` is false everywhere else,
    // so the control simply doesn't render on browsers with no switch to fight.
    ignoreSilentSwitch: settings.ignoreSilentSwitch,
    setIgnoreSilentSwitch,
    showSilentSwitchOption: canIgnoreSilentSwitch(),
  }
}

/**
 * Play a cue once, when the component mounts — the shape most of this app's
 * modals and overlays take, since they're conditionally rendered rather than
 * held mounted behind an `open` prop. Pass `false` to stay quiet (an overlay
 * that decides mid-render it has nothing to celebrate).
 */
export function useSoundOnMount(event: SoundEvent, when = true) {
  useEffect(() => {
    if (when) playSound(event)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once per mount, on the entering edge of `when`
  }, [when])
}

/**
 * Play a cue when `active` flips true, and optionally another when it flips
 * back. Used for surfaces whose sound belongs to the surface itself rather than
 * to whichever of a dozen buttons opened it — the concept popup's paper slide,
 * for instance, which can be triggered by a wiki link, the search panel, a
 * keyboard shortcut or the dashboard.
 *
 * Nothing plays on the initial mount when `active` starts out true, so a page
 * refresh with a panel already open stays quiet.
 */
export function useSoundOnToggle(active: boolean, onEvent: SoundEvent, offEvent?: SoundEvent) {
  const previous = useRef(active)
  useEffect(() => {
    if (previous.current === active) return
    previous.current = active
    const event = active ? onEvent : offEvent
    if (event) playSound(event)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cue names are constants at every call site
  }, [active])
}
