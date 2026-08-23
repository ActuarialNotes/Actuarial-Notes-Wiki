/**
 * Which cue does a given interaction make?
 *
 * The app has hundreds of buttons across ~90 components, so rather than wiring
 * a `play()` call into every `onClick`, one delegated listener
 * (`components/SoundEffects.tsx`) walks up from the event target, describes the
 * nearest interactive element, and asks this module what to play.
 *
 * The decision itself is a pure function over a plain description, so it can be
 * unit-tested without a DOM.
 *
 * Components override the default with `data-sound`:
 *   data-sound="none"   → stay silent (something else plays a better cue)
 *   data-sound="open"   → any SoundEvent name
 *
 * Two overrides carry most of the weight in practice: `press` for the solid,
 * primary-action buttons that should keep the low thump under the press (the
 * `Button` component applies it for its solid variants), and `tick` for a row
 * in a list of choices — a topic, a concept, a question.
 */

import { SOUND_RECIPES, type SoundEvent } from '@/lib/soundConfig'

/** What the delegated listener managed to learn about the pressed element. */
export interface InteractionTarget {
  /** Tag name, e.g. `button` (case-insensitive). */
  tag: string
  /** Value of the nearest `data-sound` attribute, if any. */
  explicit?: string | null
  role?: string | null
  /** `type` attribute, for inputs. */
  type?: string | null
  disabled?: boolean
  /** Checked state *before* the interaction, for checkboxes/switches. */
  checked?: boolean | null
}

const EVENT_NAMES = new Set<string>(Object.keys(SOUND_RECIPES))

/** Typing, dragging and scrubbing should never make noise. */
const SILENT_TAGS = new Set(['input', 'textarea', 'select', 'option'])

/** Inputs that behave like a switch rather than a field. */
const TOGGLE_INPUT_TYPES = new Set(['checkbox', 'radio'])

/** Roles that flip a setting on or off — those get the pitched toggle pair. */
const TOGGLE_ROLES = new Set(['switch'])

/**
 * Roles that tick an item in a list of choices — the topic/concept/question
 * pickers. A box is ticked, not flipped, so it gets the dry `tick` detent in
 * both directions rather than the up/down toggle pair.
 */
const CHECK_ROLES = new Set(['checkbox', 'menuitemcheckbox'])

/** Roles that mean "you picked one of several", which gets the softer cue. */
const SELECT_ROLES = new Set(['tab', 'option', 'radio', 'menuitemradio'])

/** Roles that behave like a plain button. */
const BUTTON_ROLES = new Set(['button', 'link', 'menuitem'])

export function isSoundEvent(name: string): name is SoundEvent {
  return EVENT_NAMES.has(name)
}

/**
 * Resolve the cue for an interaction, or `null` for silence.
 *
 * Order matters: disabled controls are always silent, then an explicit
 * `data-sound` wins (including `data-sound="none"`), then the element's kind.
 */
export function resolveInteractionSound(target: InteractionTarget | null): SoundEvent | null {
  if (!target) return null

  if (target.disabled) return null

  const explicit = target.explicit?.trim()
  if (explicit) {
    if (explicit === 'none') return null
    return isSoundEvent(explicit) ? explicit : null
  }

  const tag = target.tag.toLowerCase()
  const role = target.role?.toLowerCase() ?? null
  const inputType = target.type?.toLowerCase() ?? ''

  // Switches report which way they just flipped. `checked` is read before the
  // browser applies the change, so the cue describes the state being entered,
  // not the one being left. Checkboxes tick the same either way.
  if (role && TOGGLE_ROLES.has(role)) return target.checked ? 'toggleOff' : 'toggleOn'
  if (role && CHECK_ROLES.has(role)) return 'tick'
  if (tag === 'input' && TOGGLE_INPUT_TYPES.has(inputType)) {
    return inputType === 'radio' ? 'select' : 'tick'
  }

  if (SILENT_TAGS.has(tag)) return null

  if (role && SELECT_ROLES.has(role)) return 'select'
  if (tag === 'a' || tag === 'button' || tag === 'summary') return 'click'
  if (role && BUTTON_ROLES.has(role)) return 'click'

  return null
}

/**
 * How far a finger may travel between press and release and still count as a
 * tap rather than a drag. Roughly the touch slop the platforms themselves use
 * (~8dp on Android); big enough that a still finger's jitter doesn't read as a
 * drag, small enough that the first moments of a scroll do.
 */
export const PRESS_SLOP_PX = 10

/** What became of a press, measured between `pointerdown` and `pointerup`. */
export interface PressRelease {
  /** Distance the pointer travelled between press and release, in CSS px. */
  movedPx: number
  /** Did the release land back on (or inside) the element that was pressed? */
  onTarget: boolean
}

/**
 * Did a press actually activate the thing under it?
 *
 * On a touch screen a `pointerdown` is not yet a press: the same finger starts
 * a scroll, and the control it happened to land on is never activated. So the
 * cue waits for the release and asks this — a tap is a release that lands back
 * on what it pressed, having barely moved.
 *
 * Both halves matter. The release lands on target but the finger travelled:
 * that's a scroll, where the content moves *with* the finger and leaves the
 * same element underneath it. The finger stayed put but the release is
 * elsewhere: the element moved or was covered, and the browser fires no click
 * either.
 */
export function pressActivates({ movedPx, onTarget }: PressRelease): boolean {
  return onTarget && movedPx <= PRESS_SLOP_PX
}
