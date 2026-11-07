import { cn } from '@/lib/utils'

/**
 * **Ink** — the app's control style (style guide §7.0), as class strings for
 * the controls that aren't a `<Button>`: dropdown triggers and their menus,
 * the labelled tool tiles of an exam's header strip, and filter chips.
 *
 * Three rules, and every helper here is one of them:
 * - **Nothing is filled at rest.** A control is its words or its icon; a press
 *   or hover lays a light wash (`bg-muted`) under it.
 * - **What is chosen goes solid** in the *pick* — `bg-pick text-pick-foreground`:
 *   black on white / white on black, or the exam's own vivid hue inside an
 *   exam's scope (`examAccentStyle` sets `--pick`). A selected chip, an open
 *   dropdown, the picked menu row and an active tool all take it.
 * - **A dropdown is a bold label and a chevron**, the same everywhere.
 *
 * The view's committing action stays the inverted solid of `buttonVariants`'
 * `default`, so colour reads as "chosen" and black/white as "do it".
 */

/** The fill of what is chosen. */
export const PICK = 'bg-pick text-pick-foreground'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

/** A dropdown's trigger: a bold label and a chevron, solid while its menu is open. */
export function inkTrigger(open: boolean, className?: string): string {
  return cn(
    'not-prose inline-flex h-10 shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-2 text-base font-semibold transition-colors',
    'disabled:cursor-not-allowed disabled:opacity-40',
    FOCUS,
    open ? PICK : 'text-foreground enabled:hover:bg-muted',
    className,
  )
}

/** The chevron inside a trigger; it turns over while the menu is open. */
export function inkChevron(open: boolean, className?: string): string {
  return cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180', className)
}

/** A dropdown's panel. Give it `examAccentStyle` when it portals out of an exam's scope. */
export const INK_MENU =
  'rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg'

/** A menu's heading line ("Sitting"). */
export const INK_MENU_HEADING = 'px-3 pt-2 pb-1 text-xs font-medium text-muted-foreground'

/** One row of a menu: plain text, the pick solid and bold. */
export function inkMenuItem(selected: boolean, className?: string): string {
  return cn(
    'flex w-full min-h-10 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[15px] transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
    selected ? cn(PICK, 'font-semibold') : 'text-muted-foreground hover:bg-muted hover:text-foreground',
    className,
  )
}

/**
 * A labelled tool: an icon over an 11px word, in an exam's header strip
 * (Info, Syllabus, Quiz, Project, Study Guide). Solid while the panel it
 * opens is open (`aria-expanded`), or when `active`.
 */
export function inkToolTile(active = false, className?: string): string {
  return cn(
    'not-prose inline-flex h-11 min-w-12 shrink-0 flex-col items-center justify-center gap-0.5 rounded-[10px] px-1.5 pt-0.5',
    'text-[11px] font-medium leading-none no-underline transition-colors',
    FOCUS,
    active
      ? PICK
      : 'text-muted-foreground hover:bg-muted hover:text-foreground aria-expanded:bg-pick aria-expanded:text-pick-foreground',
    className,
  )
}

/** A filter chip: words at rest, a solid pill when on. */
export function inkChip(on: boolean, className?: string): string {
  return cn(
    'inline-flex h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-sm font-medium transition-colors',
    'disabled:cursor-not-allowed disabled:opacity-40',
    FOCUS,
    on ? cn(PICK, 'font-semibold') : 'text-muted-foreground enabled:hover:bg-muted enabled:hover:text-foreground',
    className,
  )
}
