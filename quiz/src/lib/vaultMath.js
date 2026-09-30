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
// Leading blockquote markers (`> `, `> > `, indented or not). Everything in the
// vault's examples lives inside callouts, so a fence usually carries one.
var BLOCKQUOTE_PREFIX_RE = /^(?:[ \t]*>[ \t]?)*/;
var CODE_FENCE_RE = /^(?:```|~~~)/;
// Environments KaTeX will only typeset in display mode.
var DISPLAY_ONLY_ENV_RE = /\\begin\{(?:align|alignat|gather|equation|multline|flalign)\*?\}/;
/** Split a line into its blockquote prefix and the content after it. */
function splitPrefix(line) {
    var _a, _b;
    var prefix = (_b = (_a = BLOCKQUOTE_PREFIX_RE.exec(line)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : '';
    return [prefix, line.slice(prefix.length)];
}
/**
 * Promote `$…\$…$` to `$$…\$…$$`.
 *
 * Spans are read the way the author meant them — a `$` preceded by a backslash
 * is a dollar sign, not a delimiter — and only spans that actually contain an
 * escaped dollar are rewritten. Existing `$$…$$` spans are stepped over
 * untouched.
 */
export function promoteEscapedDollarMath(text) {
    var out = '';
    var i = 0;
    while (i < text.length) {
        if (text[i] === '\\' && text[i + 1] === '$') {
            out += text.slice(i, i + 2);
            i += 2;
            continue;
        }
        if (text.startsWith('$$', i)) {
            var end = fenceIndex(text, i + 2);
            if (end < 0)
                return out + text.slice(i);
            out += text.slice(i, end + 2);
            i = end + 2;
            continue;
        }
        if (text[i] === '$') {
            var j = i + 1;
            while (j < text.length && !(text[j] === '$' && text[j - 1] !== '\\'))
                j++;
            if (j >= text.length)
                return out + text.slice(i);
            var body = text.slice(i + 1, j);
            out += body.includes('\\$') ? "$$".concat(body, "$$") : "$".concat(body, "$");
            i = j + 1;
            continue;
        }
        out += text[i];
        i++;
    }
    return out;
}
/**
 * Index of the next `$$` fence at or after `from`, or -1.
 *
 * An escaped dollar is a dollar *sign*, so `\$$950$` is a literal `$` followed
 * by inline math — not a fence. Missing that reads a whole example paragraph as
 * the opening of a display block.
 */
function fenceIndex(body, from) {
    if (from === void 0) { from = 0; }
    for (var i = from; i < body.length; i++) {
        if (body[i] === '\\' && body[i + 1] === '$') {
            i++;
            continue;
        }
        if (body[i] === '$' && body[i + 1] === '$')
            return i;
    }
    return -1;
}
/** Every `$$` fence position on a line, escapes respected. */
function fencePositions(body) {
    var found = [];
    var at = fenceIndex(body);
    while (at >= 0) {
        found.push(at);
        at = fenceIndex(body, at + 2);
    }
    return found;
}
export function normalizeVaultMath(markdown) {
    if (!markdown.includes('$'))
        return markdown;
    var lines = markdown.split('\n');
    var out = [];
    var inCodeFence = false;
    var inDisplay = false;
    var push = function (prefix, body) { return out.push(prefix + body); };
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var _a = splitPrefix(line), prefix = _a[0], body = _a[1];
        if (CODE_FENCE_RE.test(body)) {
            inCodeFence = !inCodeFence;
            out.push(line);
            continue;
        }
        if (inCodeFence) {
            out.push(line);
            continue;
        }
        if (inDisplay) {
            var close_1 = fenceIndex(body);
            if (close_1 < 0) {
                out.push(line);
                continue;
            }
            var before_1 = body.slice(0, close_1);
            var after_1 = body.slice(close_1 + 2);
            if (before_1.trim())
                push(prefix, before_1.trimEnd());
            push(prefix, '$$');
            inDisplay = false;
            if (after_1.trim())
                push(prefix, promoteEscapedDollarMath(after_1.trimStart()));
            continue;
        }
        var fences = fencePositions(body);
        if (fences.length % 2 === 0) {
            var rewritten = promoteEscapedDollarMath(body);
            var single = /^\$\$([\s\S]+)\$\$$/.exec(rewritten.trim());
            // A display-only environment needs real fence lines, not the one-line
            // `$$…$$` the vault uses for its inline formula boxes.
            if (single && DISPLAY_ONLY_ENV_RE.test(single[1])) {
                push(prefix, '$$');
                push(prefix, single[1].trim());
                push(prefix, '$$');
                continue;
            }
            push(prefix, rewritten);
            continue;
        }
        // Odd number of fences: the last one opens a multi-line block. Anything
        // before it is ordinary text (with balanced fences of its own); anything
        // after it is the block's first line, not fence meta.
        var open_1 = fences[fences.length - 1];
        var before = body.slice(0, open_1);
        var after = body.slice(open_1 + 2);
        if (before.trim())
            push(prefix, promoteEscapedDollarMath(before.trimEnd()));
        push(prefix, '$$');
        if (after.trim())
            push(prefix, after.trimStart());
        inDisplay = true;
    }
    return out.join('\n');
}
