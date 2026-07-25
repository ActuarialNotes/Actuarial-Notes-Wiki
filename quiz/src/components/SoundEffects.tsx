import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ACTIVATION_EVENTS, playSound, unlockSound } from '@/lib/soundEngine'
import { resolveInteractionSound, type InteractionTarget } from '@/lib/soundInteractions'

/**
 * Mounted once at the app root. Gives *every* interaction a sound without
 * touching every component:
 *
 *   • one delegated pointer listener plays the press cue for whatever
 *     interactive element was hit (see `lib/soundInteractions.ts` for the
 *     mapping, and `data-sound` to override or silence it per element)
 *   • keyboard activation (Enter/Space on a focused control) gets the same cue
 *   • the first gesture unlocks the AudioContext, so a cue fired later from a
 *     timer — a level-up ceremony, say — isn't eaten by the autoplay policy
 *
 * Renders nothing.
 */

/** Elements that are interactive enough to deserve a cue. */
const INTERACTIVE_SELECTOR = 'a, button, summary, input, textarea, select, [role], [data-sound]'

// The last route we made a sound for. Module-level rather than a ref so
// StrictMode's mount → unmount → remount doesn't read as a navigation and fire
// a cue before the user has touched anything.
let lastSoundedPath: string | null = null

function describe(node: EventTarget | null): InteractionTarget | null {
  if (!(node instanceof Element)) return null
  // Nearest wins: the selector matches both real controls and `data-sound`
  // wrappers, so a button inside a `data-sound="none"` card still clicks, while
  // a press on the card itself takes the card's cue.
  const target = node.closest<HTMLElement>(INTERACTIVE_SELECTOR)
  if (!target) return null

  const input = target instanceof HTMLInputElement ? target : null
  return {
    tag: target.tagName,
    explicit: target.dataset.sound,
    role: target.getAttribute('role'),
    type: input?.type ?? target.getAttribute('type'),
    disabled:
      (target as HTMLButtonElement).disabled === true ||
      target.getAttribute('aria-disabled') === 'true',
    checked: input?.checked ?? (target.getAttribute('aria-checked') === 'true' ? true : null),
  }
}

export default function SoundEffects() {
  const location = useLocation()

  useEffect(() => {
    // pointerdown, not click: the cue should land the instant the finger does,
    // which is also what makes it feel like a physical button. On iOS this
    // press is too early to *start* the audio context, so the engine holds the
    // first cue and the `pointerup`/`touchend` below replays it milliseconds
    // later — see ACTIVATION_EVENTS in soundEngine.
    function onPointerDown(e: PointerEvent) {
      unlockSound()
      if (e.button !== 0 && e.pointerType === 'mouse') return
      const event = resolveInteractionSound(describe(e.target))
      if (event) playSound(event)
    }

    // Keyboard activation synthesises a click with `detail === 0`; pointer
    // clicks always report a positive detail, so this only fires for the cases
    // pointerdown missed.
    function onClick(e: MouseEvent) {
      unlockSound()
      if (e.detail !== 0) return
      const event = resolveInteractionSound(describe(e.target))
      if (event) playSound(event)
    }

    // Every activation-granting event tries to start the context, for as long
    // as it takes: a browser may refuse the first few, and one refusal must not
    // leave the app mute for the rest of the session.
    function onActivation() { unlockSound() }

    // iOS suspends (or 'interrupts') the context when the tab is backgrounded,
    // a call comes in, or Siri takes over. Returning to the page is itself
    // enough to restart it.
    function onVisibility() {
      if (document.visibilityState === 'visible') unlockSound()
    }

    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('click', onClick, true)
    for (const type of ACTIVATION_EVENTS) {
      if (type === 'click') continue // handled above, with the cue
      document.addEventListener(type, onActivation, true)
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('click', onClick, true)
      for (const type of ACTIVATION_EVENTS) {
        if (type === 'click') continue
        document.removeEventListener(type, onActivation, true)
      }
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // A route change is a bigger movement than the link press that caused it, so
  // it gets its own soft whoosh. The very first route is silent — nothing has
  // moved yet, and playing here would try to open an AudioContext before the
  // page has seen a gesture.
  const path = location.pathname
  useEffect(() => {
    if (lastSoundedPath === path) return
    const isFirstRoute = lastSoundedPath === null
    lastSoundedPath = path
    if (!isFirstRoute) playSound('navigate')
  }, [path])

  return null
}
