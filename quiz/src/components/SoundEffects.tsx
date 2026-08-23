import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { msSinceSound, playSound, unlockSound } from '@/lib/soundEngine'
import { pressActivates, resolveInteractionSound, type InteractionTarget } from '@/lib/soundInteractions'

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

/**
 * How long a quiz launch keeps the route-change whoosh quiet. Long enough to
 * cover `begin`'s run-up and the note it lands on (~1s), short enough that a
 * navigation a user makes *after* the quiz has opened still sounds.
 */
const LAUNCH_COVERS_NAVIGATION_MS = 1400

/**
 * How long after a touch press the click it produces is ignored. The pointer
 * pass already sounded that press; browsers disagree about the `detail` on a
 * click synthesised from a tap, so the keyboard path is closed for a moment
 * rather than trusted to tell them apart.
 */
const CLICK_ECHO_MS = 700

// The last route we made a sound for. Module-level rather than a ref so
// StrictMode's mount → unmount → remount doesn't read as a navigation and fire
// a cue before the user has touched anything.
let lastSoundedPath: string | null = null

/** The nearest element around `node` that is worth a cue. */
function findTarget(node: EventTarget | null): HTMLElement | null {
  if (!(node instanceof Element)) return null
  // Nearest wins: the selector matches both real controls and `data-sound`
  // wrappers, so a button inside a `data-sound="none"` card still clicks, while
  // a press on the card itself takes the card's cue.
  return node.closest<HTMLElement>(INTERACTIVE_SELECTOR)
}

function describe(target: HTMLElement | null): InteractionTarget | null {
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
    // A touch press in flight: where it started and what it landed on. Only one
    // is tracked — a second finger during a press isn't a press of its own.
    let pending: { id: number; x: number; y: number; target: HTMLElement } | null = null
    let clickEchoUntil = 0

    function sound(target: HTMLElement | null) {
      const event = resolveInteractionSound(describe(target))
      if (event) playSound(event)
      return event !== null
    }

    function onPointerDown(e: PointerEvent) {
      unlockSound()
      if (e.button !== 0 && e.pointerType === 'mouse') return
      const target = findTarget(e.target)

      // A mouse press is a press: there is nothing else a button-down on a
      // control can turn into, so the cue lands the instant it happens, which
      // is what makes it feel like a physical button.
      if (e.pointerType === 'mouse') {
        pending = null
        sound(target)
        return
      }

      // A finger is different. The same touch-down starts a scroll, and the
      // control it happened to land on is never activated — so hold the cue
      // until the release says the press was really a press.
      pending = target ? { id: e.pointerId, x: e.clientX, y: e.clientY, target } : null
    }

    function onPointerUp(e: PointerEvent) {
      const press = pending
      pending = null
      if (!press || press.id !== e.pointerId) return

      const released = document.elementFromPoint(e.clientX, e.clientY)
      const activated = pressActivates({
        movedPx: Math.hypot(e.clientX - press.x, e.clientY - press.y),
        onTarget: released instanceof Node && press.target.contains(released),
      })
      if (!activated) return

      // `checked` is still the pre-press state here — the browser applies the
      // change on click, which comes after — so a switch's cue keeps describing
      // the state being entered.
      if (sound(press.target)) clickEchoUntil = performance.now() + CLICK_ECHO_MS
    }

    // The browser takes the gesture over — a scroll, a pull-to-refresh, a
    // system edge swipe. Whatever it became, it wasn't a press.
    function onPointerCancel() { pending = null }

    // Keyboard activation synthesises a click with `detail === 0`; pointer
    // clicks always report a positive detail, so this only fires for the cases
    // the pointer pass missed.
    function onClick(e: MouseEvent) {
      if (e.detail !== 0) return
      if (performance.now() < clickEchoUntil) return
      sound(findTarget(e.target))
    }

    function onKeyDown() { unlockSound() }

    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('pointerup', onPointerUp, true)
    document.addEventListener('pointercancel', onPointerCancel, true)
    document.addEventListener('click', onClick, true)
    document.addEventListener('keydown', onKeyDown, { capture: true, once: true })
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('pointerup', onPointerUp, true)
      document.removeEventListener('pointercancel', onPointerCancel, true)
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('keydown', onKeyDown, true)
    }
  }, [])

  // A route change is a bigger movement than the link press that caused it, so
  // it gets its own soft whoosh. The very first route is silent — nothing has
  // moved yet, and playing here would try to open an AudioContext before the
  // page has seen a gesture.
  //
  // Except behind a launch: pressing "Start Quiz" navigates, and `navigate` is
  // itself a rising sweep, so it lands inside `begin`'s run-up and smears the
  // count-in that cue is built around. When something bigger is already sounding
  // the movement it caused doesn't need announcing too.
  const path = location.pathname
  useEffect(() => {
    if (lastSoundedPath === path) return
    const isFirstRoute = lastSoundedPath === null
    lastSoundedPath = path
    if (isFirstRoute) return
    if (msSinceSound('begin') < LAUNCH_COVERS_NAVIGATION_MS) return
    playSound('navigate')
  }, [path])

  return null
}
