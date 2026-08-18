import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import type { Components } from 'react-markdown'

/**
 * How fenced code and inline code render on every markdown surface in the app —
 * question stems, explanations, wiki articles, exam guides.
 *
 * The vault uses fenced blocks for **console output**: an R model summary, a
 * `summary()` table, a worked triangle. That output only reads as a table while
 * its columns stay aligned, so the block never wraps — it scrolls sideways
 * inside its own inset panel.
 *
 * The panel is the fix as much as the look. A `<pre>` left to the browser
 * overflows `visible`: on a phone the model output in a MAS-II question ran
 * straight out of the question card and off the side of the screen, unreachable,
 * with none of the surface a boxed formula gets. An `overflow-x-auto` scroller
 * on a bordered panel keeps the block inside the card it belongs to and makes
 * the hidden columns reachable.
 *
 * `not-prose` opts the block out of `@tailwindcss/typography` (which otherwise
 * paints a zinc box on the wiki and hangs backtick quotes off inline code), so
 * the same panel appears on every surface whether or not it sits in `prose`.
 */

// Inline code — a chip in running text.
const CODE_CLASS =
  'not-prose rounded border border-border bg-muted px-1 py-0.5 font-mono text-[0.9em]'

// The panel: an inset region, so a border rather than a shadow (style guide §6.2).
const PANEL_CLASS = 'not-prose my-3 max-w-full rounded-lg border border-border bg-muted'

const SCROLLER_CLASS = [
  'overflow-x-auto overscroll-x-contain rounded-lg px-3 py-2.5',
  'font-mono text-xs leading-relaxed text-foreground sm:text-[0.8125rem]',
  // A scrollable region has to be reachable from the keyboard, so the block
  // takes focus and shows the app's standard ring when it does.
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  // The `<code>` inside a fence is only markup — the panel carries the styling,
  // so undo the inline chip for it. These win over the chip's own classes on
  // specificity (`.x > code` beats `.y`), whatever order Tailwind emits them in.
  '[&>code]:rounded-none [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0',
  '[&>code]:[font-size:inherit] [&>code]:text-inherit',
].join(' ')

/**
 * A fenced block: an inset panel whose content scrolls sideways.
 *
 * The trailing edge fades only while columns remain off to the right (the same
 * affordance the Dashboard exam-tab strip uses), so a half-cut number reads as
 * "scroll for more" rather than as a clipped render. Masking the scroller
 * rather than the panel keeps the panel's border and fill crisp.
 *
 * `tabIndex` is set unconditionally rather than measured — a block that fits
 * costs one extra tab stop, while a block that doesn't would otherwise be
 * unreadable without a mouse.
 */
function CodeBlock({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLPreElement>(null)
  const [moreRight, setMoreRight] = useState(false)

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    setMoreRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 1)
  }, [])

  // No dependency array: a new question re-uses this component with different
  // content, which changes scrollWidth without resizing anything, so the only
  // reliable trigger is "after every render". `measure` bails out of the state
  // update when the answer is unchanged, so this settles immediately.
  useEffect(() => { measure() })

  // The other half of the story: the block staying put while the card around it
  // narrows. Kept in its own effect so the observer isn't torn down and rebuilt
  // on every render of the question.
  useEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [measure])

  return (
    <div className={PANEL_CLASS}>
      <pre
        ref={ref}
        tabIndex={0}
        onScroll={measure}
        className={`${SCROLLER_CLASS}${moreRight ? ' code-block--fade' : ''}`}
      >
        {children}
      </pre>
    </div>
  )
}

/** Block-level surfaces: a fenced block becomes a scrollable panel. */
export const codeComponents: Components = {
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  code: ({ children }) => <code className={CODE_CLASS}>{children}</code>,
}

/**
 * Inline surfaces (answer options, search rows) render markdown inside a
 * `<span>`, where a `<pre>` would be invalid nesting. A fence there is a
 * mistake in the content rather than console output, so it degrades to
 * monospace text that wraps with the rest of the line.
 */
export const inlineCodeComponents: Components = {
  pre: ({ children }) => (
    <span className="font-mono text-[0.9em] whitespace-pre-wrap">{children}</span>
  ),
  code: ({ children }) => <code className={CODE_CLASS}>{children}</code>,
}
