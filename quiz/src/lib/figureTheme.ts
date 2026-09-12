import type { Theme } from '@/hooks/useTheme'

/**
 * Tell a vault figure which theme it is being shown in.
 *
 * The concept figures (`Media/Figures/*.svg`, drawn by
 * `scripts/generate_concept_figures.py` — see `docs/concept-figures.md`) carry
 * both palettes and pick one of two ways:
 *
 * - on their own — in Obsidian, on GitHub, opened as a file — from the OS,
 *   via `@media (prefers-color-scheme: dark)`;
 * - in the app, from a `#dark` / `#light` fragment on the embed URL, which
 *   overrides the media query through a `:target` rule.
 *
 * The second exists because the OS is the wrong signal here. The app's theme is
 * a toggle that defaults to dark and never consults `prefers-color-scheme`
 * (`useTheme`, a `.dark` class on `<html>`), so the common case — an OS-light
 * reader on the default dark app — rendered a white figure on a black card.
 *
 * A fragment is the only channel available. An `<img>` renders its SVG as an
 * isolated document with no script and no view of the host: the `.dark` class
 * and the app's custom properties simply are not reachable from inside it.
 *
 * Only the generated figures understand the fragment, so only they get one.
 * Everything else embedded from the vault — a book jacket under
 * `Media/Attachments/`, a photograph, a diagram a question shipped with — is
 * artwork with its own colours and is passed through untouched; a stray
 * fragment on those is harmless but meaningless, and leaving it off keeps the
 * URL the browser caches identical to the one it already has.
 */

/** Figures the generator drew, and therefore the only ones carrying both palettes. */
const GENERATED_FIGURE_RE = /\/Media\/Figures\/[^/]+\.svg$/i

export function isThemedFigure(src: string): boolean {
  // Match on the path only: a raw.githubusercontent URL has no query string
  // today, but a `?token=` would otherwise defeat the `.svg$` anchor.
  const path = src.split('#')[0].split('?')[0]
  return GENERATED_FIGURE_RE.test(path)
}

/**
 * Name the palette a generated figure should draw itself in.
 *
 * Callers pass the *surface the figure sits on*, which is usually the app's
 * theme but is not the same question: the image lightbox is `bg-black/95` in
 * both modes, so a figure opened there is asked for `'dark'` even when the app
 * is light. Follow the surface, not the toggle.
 *
 * Returns other sources unchanged, and replaces rather than stacks a fragment
 * so re-theming an already-themed URL stays idempotent.
 */
export function themedFigureSrc(src: string | undefined, theme: Theme): string | undefined {
  if (!src || !isThemedFigure(src)) return src
  return `${src.split('#')[0]}#${theme}`
}
