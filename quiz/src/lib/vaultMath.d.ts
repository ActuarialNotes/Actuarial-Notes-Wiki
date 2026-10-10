/**
 * Normalise the vault's math delimiters into the exact shapes remark-math can
 * tokenise.
 *
 * The vault is authored in Obsidian, whose math parser is more forgiving than
 * the `remark-math` / micromark pipeline the app renders with. Two shapes are
 * written all over the concept pages, read correctly in Obsidian, and are
 * mis-tokenised here — both loudly, as red KaTeX error text on the page:
 *
 * 1. **An escaped dollar inside inline math** — `$\$400$`. Math text, like a
 *    code span, has no character escapes: the *first* `$` after the opener
 *    closes the span. `$\$400$` parses as the math `\`, the text `400`, and a
 *    fresh opener that runs on until the next `$` — swallowing the sentence
 *    after it as italic "math". Currency is everywhere in ratemaking examples,
 *    so this is the common one. Inside `$$…$$` a lone `$` is harmless (the
 *    closing fence is a run of two), so promoting the delimiters fixes the span
 *    without touching what the author wrote inside it.
 *
 * 2. **A multi-line `$$` block whose fence is not alone on its line** —
 *    `$$\begin{align*}` … `\end{align*}$$`. Flow math treats the rest of the
 *    opening line as the fence's *meta* and drops it, and only a line that is
 *    just `$$` closes the block. So the `\begin{align*}` is lost, the `\end` is
 *    not, and the block runs to the next bare `$$` or the end of the page.
 *
 * A third, rarer shape is fixed on the way past: a display-only environment
 * (`align*`, `gather*`, …) written on one line as `$$…$$`. That parses as
 * *inline* math — the vault's usual formula-box spelling — and KaTeX refuses
 * `align*` outside display mode. Giving it real fence lines makes it a display
 * block, which is what the environment needs.
 *
 * The rewrite is idempotent and only ever moves delimiters: no LaTeX body is
 * edited, and lines with no math are returned byte-for-byte.
 */
/**
 * Promote `$…\$…$` to `$$…\$…$$`.
 *
 * Spans are read the way the author meant them — a `$` preceded by a backslash
 * is a dollar sign, not a delimiter — and only spans that actually contain an
 * escaped dollar are rewritten. Existing `$$…$$` spans are stepped over
 * untouched.
 */
export declare function promoteEscapedDollarMath(text: string): string;
export declare function normalizeVaultMath(markdown: string): string;
