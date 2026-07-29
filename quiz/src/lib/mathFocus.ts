/**
 * Math focus mode — the rules behind "tap an equation to magnify it".
 *
 * One delegated listener (`components/MathFocus.tsx`) turns every rendered
 * KaTeX display equation into a zoom target, so the behaviour is identical in
 * the concept popup, on a flashcard, in the wiki and inside the collect modal
 * without any of them wiring it up. This module holds the decisions that
 * listener makes: what counts as a hit, which equations travel together as one
 * prev/next set, and how large the magnified copy should be drawn.
 */

/** A display equation — the wrapper KaTeX adds in display mode. */
export const MATH_DISPLAY_SELECTOR = '.katex-display'

/** The root of any rendered equation, display or inline. */
export const MATH_ROOT_SELECTOR = '.katex'

/**
 * A blockquote whose content is a formula — the boxed equations on concept
 * pages. Marked by `MarkdownCallout` so the whole box (padding included) is the
 * tap target, and so the formulas in it count as equations even though the
 * vault writes them as `> $$…$$`, which remark parses as *inline* math and
 * KaTeX therefore renders without a `.katex-display` wrapper.
 */
export const MATH_BLOCK_SELECTOR = '[data-math-block]'

/** Everything that magnifies: boxed formulas, plus standalone display math. */
const EQUATION_SELECTOR = `${MATH_DISPLAY_SELECTOR}, ${MATH_BLOCK_SELECTOR} ${MATH_ROOT_SELECTOR}`

/**
 * Marks a container whose equations form one prev/next set. The *outermost*
 * scope around the tapped equation wins: `WikiArticle` marks itself, but a
 * surface that stacks several articles (the popup body in Math View, a
 * flashcard back) marks the wrapper so stepping runs through all of them in
 * reading order rather than stopping at the first article.
 */
export const MATH_SCOPE_SELECTOR = '[data-math-scope]'

/**
 * Real controls own their clicks: an equation inside an answer button is that
 * button's label, and a wiki link inside a formula is still a link. Role-based
 * surfaces (`[role="button"]` on a drag-and-drop card, say) are deliberately
 * not listed — those wrap whole cards, and the equation on them is content.
 */
const CONTROL_SELECTOR = 'a, button, summary, input, textarea, select, label'

/** Per-subtree escape hatch, also how the overlay excludes its own copy. */
const OPT_OUT_SELECTOR = '[data-math-magnify="none"]'

/** Font size the magnified equation is measured at, before scaling. */
export const MATH_FOCUS_BASE_PX = 22

/** An equation never shrinks below this (it scrolls sideways instead) … */
export const MATH_FOCUS_MIN_SCALE = 0.7

/** … and never grows past this, so a two-symbol formula isn't absurd. */
export const MATH_FOCUS_MAX_SCALE = 4

/**
 * The equation a click landed on, or null when the click wasn't a request to
 * magnify one. `clientY` disambiguates a press on the padding of a box that
 * frames several stacked equations.
 */
export function resolveMathTarget(node: EventTarget | null, clientY?: number): HTMLElement | null {
  if (!(node instanceof Element)) return null
  if (node.closest(OPT_OUT_SELECTOR)) return null
  if (node.closest(CONTROL_SELECTOR)) return null
  const hit = node.closest<HTMLElement>(
    `${MATH_DISPLAY_SELECTOR}, ${MATH_ROOT_SELECTOR}, ${MATH_BLOCK_SELECTOR}`,
  )
  if (!hit) return null

  // `closest` returns the nearest match, so a press on the glyphs themselves has
  // already resolved to an equation; only a press on the box around them — the
  // padding, or the gap between two stacked formulas — arrives as a blockquote.
  if (hit.matches(MATH_BLOCK_SELECTOR)) {
    const framed = equationsWithin(hit)
    if (framed.length === 0) return null
    if (framed.length === 1 || clientY === undefined) return framed[0]
    // Some boxes frame a chain of equations. Pressing beside one of them should
    // magnify that one, not whichever happens to be first.
    const centers = framed.map(el => {
      const rect = el.getBoundingClientRect()
      return rect.top + rect.height / 2
    })
    return framed[nearestIndexByY(centers, clientY)]
  }

  const equation = hit.closest<HTMLElement>(MATH_DISPLAY_SELECTOR) ?? hit
  // Display math is a block wherever it appears. Inline math only magnifies
  // inside a formula box — a symbol mid-sentence is prose, and grabbing its
  // clicks would fight text selection.
  if (equation.matches(MATH_DISPLAY_SELECTOR) || equation.closest(MATH_BLOCK_SELECTOR)) return equation
  return null
}

/**
 * The equations inside `root`, in reading order, each represented by its
 * outermost node. Equations hidden inside a collapsed callout are left out —
 * they aren't on screen, so they shouldn't appear in the count the reader is
 * stepping through.
 */
function equationsWithin(root: Element): HTMLElement[] {
  const equations = new Set<HTMLElement>()
  root.querySelectorAll<HTMLElement>(EQUATION_SELECTOR).forEach(el => {
    // A display equation matches twice — once as `.katex-display`, once as the
    // `.katex` inside it. Fold both onto the wrapper.
    const equation = el.closest<HTMLElement>(MATH_DISPLAY_SELECTOR) ?? el
    if (!equation.closest('[hidden]')) equations.add(equation)
  })
  return Array.from(equations)
}

/** Index of the entry whose centre sits closest to `y`; ties go to the first. */
export function nearestIndexByY(centers: number[], y: number): number {
  let best = 0
  let bestDistance = Infinity
  centers.forEach((center, i) => {
    const distance = Math.abs(center - y)
    if (distance < bestDistance) {
      best = i
      bestDistance = distance
    }
  })
  return best
}

/** Every equation that steps together with `target`, in document order. */
export function collectMathScope(target: HTMLElement): HTMLElement[] {
  let scope: Element | null = null
  for (let node: Element | null = target; node; node = node.parentElement) {
    if (node.matches(MATH_SCOPE_SELECTOR)) scope = node
  }
  const found = equationsWithin(scope ?? target.ownerDocument.body)
  return found.includes(target) ? found : [target]
}

/**
 * How much to blow the equation up so it fills the stage without spilling out
 * of it. Degenerate measurements (a font still loading, a zero-height stage)
 * fall back to 1× rather than to a scale of Infinity.
 */
export function fitScale(
  naturalWidth: number,
  naturalHeight: number,
  availableWidth: number,
  availableHeight: number,
): number {
  if (naturalWidth <= 0 || naturalHeight <= 0) return 1
  if (availableWidth <= 0 || availableHeight <= 0) return 1
  const scale = Math.min(availableWidth / naturalWidth, availableHeight / naturalHeight)
  if (!Number.isFinite(scale)) return 1
  return Math.min(MATH_FOCUS_MAX_SCALE, Math.max(MATH_FOCUS_MIN_SCALE, scale))
}

/** Move `index` by `delta`, stopping at either end of a `count`-long list. */
export function stepIndex(index: number, delta: number, count: number): number {
  if (count <= 0) return 0
  return Math.min(count - 1, Math.max(0, index + delta))
}
