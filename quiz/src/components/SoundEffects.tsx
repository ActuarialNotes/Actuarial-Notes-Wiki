import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { playSound, unlockSound } from '@/lib/soundEngine'
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
    // which is also what makes it feel like a physical button.
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
      if (e.detail !== 0) return
      const event = resolveInteractionSound(describe(e.target))
      if (event) playSound(event)
    }

    function onKeyDown() { unlockSound() }

    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('click', onClick, true)
    document.addEventListener('keydown', onKeyDown, { capture: true, once: true })
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('keydown', onKeyDown, true)
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
