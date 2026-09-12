#!/usr/bin/env python3
"""
mdmath.py — math-aware text normalisation for authored question markdown.

The PDF→markdown pipeline (`docs/pdf-question-pipeline.md`) does every
mechanical repair here rather than spending model tokens on it. Two jobs:

1. **Normalise** the characters a PDF text layer hands back — smart quotes,
   ligatures, Unicode minus/×/≤, vulgar fractions, superscripts, bullets — into
   what the vault is authored in. The substitution depends on where the
   character sits: inside math `×` must become `\\times`, outside it is fine as
   a literal, and `½` becomes `\\frac{1}{2}` in math but `1/2` in prose. So the
   text is split into math spans and prose spans first and each gets its own
   table.

2. **Lint** (and fix) the shapes that render wrong or read badly in the app.
   `quiz/src/lib/vaultMath.ts` already repairs *delimiter* shapes at render
   time, so this module deliberately does not touch them. What it covers is
   what the renderer cannot: a literal `\\n` escape left in a file by a
   generator, an `align*` line carrying two evaluation `=` signs (which
   overflows a phone), and OCR characters that survive into the bytes the
   content hash is taken over.

Pure stdlib, no PyMuPDF — importable from tests and from the vault scripts.
"""

from __future__ import annotations

import re

# ─── Span tokenisation ────────────────────────────────────────────────────────

CODE_FENCE_RE = re.compile(r"^(?:```|~~~)")


def split_math_spans(text: str) -> list[tuple[str, str]]:
    """Split `text` into ``(kind, chunk)`` pairs where kind is prose/math/code.

    Chunks concatenate back to the input byte-for-byte. `$$…$$` and `$…$` are
    math; a fenced code block is opaque (never rewritten). A `$` preceded by a
    backslash is a dollar sign, not a delimiter — the same reading
    `vaultMath.ts` uses, so the two agree about where math starts.
    """
    spans: list[tuple[str, str]] = []
    buf: list[str] = []
    i = 0
    in_code = False
    at_line_start = True

    def flush(kind: str = "prose") -> None:
        if buf:
            spans.append((kind, "".join(buf)))
            buf.clear()

    while i < len(text):
        ch = text[i]

        if at_line_start and not in_code and CODE_FENCE_RE.match(text[i:]):
            flush()
            end = text.find("\n", i)
            close = _find_code_close(text, end + 1 if end >= 0 else len(text))
            spans.append(("code", text[i:close]))
            i = close
            at_line_start = True
            continue

        if ch == "\\" and i + 1 < len(text):
            buf.append(text[i : i + 2])
            at_line_start = False
            i += 2
            continue

        if text.startswith("$$", i):
            end = text.find("$$", i + 2)
            if end < 0:
                buf.append(text[i:])
                break
            flush()
            spans.append(("math", text[i : end + 2]))
            i = end + 2
            at_line_start = False
            continue

        if ch == "$":
            j = _inline_close(text, i + 1)
            if j < 0:
                buf.append(ch)
                i += 1
                at_line_start = False
                continue
            flush()
            spans.append(("math", text[i : j + 1]))
            i = j + 1
            at_line_start = False
            continue

        buf.append(ch)
        at_line_start = ch == "\n"
        i += 1

    flush()
    return spans


def _find_code_close(text: str, start: int) -> int:
    """Index just past the closing fence of a code block opened before `start`."""
    pos = start
    while pos < len(text):
        end = text.find("\n", pos)
        line = text[pos : end if end >= 0 else len(text)]
        if CODE_FENCE_RE.match(line.strip()):
            return end + 1 if end >= 0 else len(text)
        if end < 0:
            return len(text)
        pos = end + 1
    return len(text)


def _inline_close(text: str, start: int) -> int:
    """Index of the `$` closing an inline span opened at `start - 1`, or -1.

    An inline span never spans a blank line — that is a paragraph break, and a
    lone `$` in prose (a dollar amount) would otherwise swallow the page.
    """
    i = start
    while i < len(text):
        if text[i] == "\\":
            i += 2
            continue
        if text[i] == "$":
            return i
        if text.startswith("\n\n", i):
            return -1
        i += 1
    return -1


# ─── Character tables ─────────────────────────────────────────────────────────

# Applied everywhere: these are never correct in the vault's bytes.
UNIVERSAL = {
    "\u2018": "'", "\u2019": "'", "\u201a": "'", "\u201b": "'",
    "\u201c": '"', "\u201d": '"', "\u201e": '"',
    "\ufb00": "ff", "\ufb01": "fi", "\ufb02": "fl", "\ufb03": "ffi", "\ufb04": "ffl",
    "\u00a0": " ", "\u2007": " ", "\u2009": " ", "\u202f": " ",
    "\ufeff": "", "\u200b": "", "\u200c": "", "\u200d": "", "\u00ad": "",
    "\u2010": "-", "\u2011": "-", "\u2212": "-",
    "\u2032": "'", "\u2033": "''",
}

# Applied inside math only — a LaTeX command for each printed glyph.
MATH_ONLY = {
    "\u00d7": r"\times ", "\u00f7": r"\div ", "\u00b1": r"\pm ",
    "\u2264": r"\leq ", "\u2265": r"\geq ", "\u2260": r"\neq ",
    "\u2248": r"\approx ", "\u2261": r"\equiv ", "\u221e": r"\infty ",
    "\u2211": r"\sum ", "\u220f": r"\prod ", "\u222b": r"\int ",
    "\u221a": r"\sqrt ", "\u2202": r"\partial ", "\u2229": r"\cap ",
    "\u222a": r"\cup ", "\u2208": r"\in ", "\u2209": r"\notin ",
    "\u2282": r"\subset ", "\u2286": r"\subseteq ", "\u2205": r"\emptyset ",
    "\u2192": r"\to ", "\u21d2": r"\implies ", "\u2234": r"\therefore ",
    "\u00b2": "^2", "\u00b3": "^3", "\u00b9": "^1", "\u2070": "^0",
    "\u2074": "^4", "\u2075": "^5", "\u2076": "^6", "\u2077": "^7",
    "\u2078": "^8", "\u2079": "^9",
    "\u00bd": r"\frac{1}{2}", "\u00bc": r"\frac{1}{4}", "\u00be": r"\frac{3}{4}",
    "\u2153": r"\frac{1}{3}", "\u2154": r"\frac{2}{3}",
    "\u215b": r"\frac{1}{8}", "\u215c": r"\frac{3}{8}",
    "\u03b1": r"\alpha ", "\u03b2": r"\beta ", "\u03b3": r"\gamma ",
    "\u03b4": r"\delta ", "\u03b5": r"\varepsilon ", "\u03b8": r"\theta ",
    "\u03bb": r"\lambda ", "\u03bc": r"\mu ", "\u03c0": r"\pi ",
    "\u03c1": r"\rho ", "\u03c3": r"\sigma ", "\u03c4": r"\tau ",
    "\u03c6": r"\phi ", "\u03c7": r"\chi ", "\u03c8": r"\psi ",
    "\u03c9": r"\omega ", "\u0393": r"\Gamma ", "\u0394": r"\Delta ",
    "\u0398": r"\Theta ", "\u039b": r"\Lambda ", "\u03a3": r"\Sigma ",
    "\u03a6": r"\Phi ", "\u03a9": r"\Omega ",
}

# Applied in prose only — plain ASCII, since there is no math mode to render in.
PROSE_ONLY = {
    "\u00bd": "1/2", "\u00bc": "1/4", "\u00be": "3/4",
    "\u2153": "1/3", "\u2154": "2/3",
    "\u215b": "1/8", "\u215c": "3/8",
    "\u2022": "-", "\u25cf": "-", "\u25aa": "-", "\u2043": "-",
    "\u2026": "...",
}


def _sub(chunk: str, table: dict[str, str]) -> str:
    for src, dst in table.items():
        if src in chunk:
            chunk = chunk.replace(src, dst)
    return chunk


def normalize_chars(text: str) -> str:
    """Normalise OCR/PDF characters, choosing a table per span kind."""
    out: list[str] = []
    for kind, chunk in split_math_spans(text):
        if kind == "code":
            out.append(chunk)
            continue
        chunk = _sub(chunk, UNIVERSAL)
        chunk = _sub(chunk, MATH_ONLY if kind == "math" else PROSE_ONLY)
        out.append(chunk)
    text = "".join(out)
    # A glyph substitution can leave `\times ` hugging a closing brace or fence.
    text = re.sub(r"(\\[a-zA-Z]+) +(?=[}$])", r"\1", text)
    return text


# ─── Literal escape repair ────────────────────────────────────────────────────

# A two-character `\n` in prose: a generator wrote the escape instead of the
# newline. `\\n` (an escaped backslash then n) is left alone, and so is anything
# inside math, where `\n` opens real commands (`\nu`, `\neq`).
LITERAL_NL_RE = re.compile(r"(?<!\\)\\n")


def fix_literal_escapes(text: str) -> str:
    """Turn literal `\\n` / `\\t` escapes in prose back into real whitespace."""
    out: list[str] = []
    for kind, chunk in split_math_spans(text):
        if kind == "prose":
            chunk = LITERAL_NL_RE.sub("\n", chunk)
            chunk = re.sub(r"(?<!\\)\\t", "    ", chunk)
        out.append(chunk)
    return "".join(out)


def has_literal_escapes(text: str) -> bool:
    return any(
        kind == "prose" and LITERAL_NL_RE.search(chunk)
        for kind, chunk in split_math_spans(text)
    )


# ─── align* chains ────────────────────────────────────────────────────────────

ALIGN_ENV_RE = re.compile(r"\\begin\{(align\*?|aligned)\}(.*?)\\end\{\1\}", re.DOTALL)
# Two evaluation steps on one line: `&= formula = result`. A `=` inside braces
# or after a relation command is not a second evaluation.
_CHAIN_RE = re.compile(r"^(?P<head>.*?&\s*=.*?)\s=\s(?P<tail>[^=]*)$")


def _chain_lines(body: str) -> list[str]:
    return [ln for ln in body.split("\\\\") if "&=" in ln.replace(" ", "")]


def align_chain_lines(text: str) -> list[str]:
    """Lines inside an `align*` block that pack a formula and its result.

    Short numeric pairs (`0.0453 = 4.53\\%`) are allowed by the style guide and
    are not reported.
    """
    hits: list[str] = []
    for env in ALIGN_ENV_RE.finditer(text):
        for line in _chain_lines(env.group(2)):
            m = _CHAIN_RE.match(line.strip())
            if not m:
                continue
            head = m.group("head")
            if not _balanced(head):
                continue  # the `=` sits inside \frac{…=…} or f(x … = 2), not at top level
            if len(head.split("&=", 1)[1].strip()) <= 12 and len(m.group("tail")) <= 12:
                continue  # both sides brief — the documented exception
            hits.append(line.strip())
    return hits


def _balanced(s: str) -> bool:
    """True when every brace, bracket and paren opened in `s` is also closed.

    An unbalanced opener means the `=` that follows sits inside a group — a
    `\frac{…}` or an `f(x \mid \theta = 2)` — and is not an evaluation step.
    """
    depth = {"{": 0, "[": 0, "(": 0}
    close = {"}": "{", "]": "[", ")": "("}
    i = 0
    while i < len(s):
        ch = s[i]
        if ch == "\\":
            i += 2
            continue
        if ch in depth:
            depth[ch] += 1
        elif ch in close:
            depth[close[ch]] -= 1
        i += 1
    return all(v == 0 for v in depth.values())


def split_align_chains(text: str) -> str:
    """Break `&= formula = result` onto a second `&=` line.

    The block is rebuilt row by row so the result keeps one row per line with
    the continuation `&=` indented under the first — the shape the style guide
    asks for — rather than being patched in place.
    """

    def fix_env(match: re.Match[str]) -> str:
        env, body = match.group(1), match.group(2)
        chains = set(align_chain_lines(match.group(0)))
        if not chains:
            return match.group(0)

        rows = body.split("\\\\")
        trailing = rows[-1][len(rows[-1].rstrip()) :]  # whitespace before \end
        out: list[str] = []
        for row in rows:
            stripped = row.strip()
            m = _CHAIN_RE.match(stripped)
            if stripped in chains and m:
                lhs = m.group("head").split("&=", 1)[0].strip()
                pad = " " * len(lhs)
                out.append(f"{m.group('head').strip()}")
                out.append(f"{pad} &= {m.group('tail').strip()}")
            elif stripped:
                out.append(stripped)
        joined = " \\\\\n".join(out)
        tail = trailing if trailing.strip("\t ") else "\n"
        return f"\\begin{{{env}}}\n{joined}{tail}\\end{{{env}}}"

    return ALIGN_ENV_RE.sub(fix_env, text)


# ─── Composite entry points ───────────────────────────────────────────────────

def normalize_markdown(text: str) -> str:
    """Every mechanical repair, in the order they compose safely."""
    text = fix_literal_escapes(text)
    text = normalize_chars(text)
    text = split_align_chains(text)
    text = re.sub(r"[ \t]+$", "", text, flags=re.MULTILINE)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.rstrip() + "\n"


def unnormalised_chars(text: str) -> list[str]:
    """Characters `normalize_chars` would rewrite, in the order they appear.

    Position matters, so the check asks each span's own table: a `×` inside
    math is wrong (it should be `\\times`) while the same character in prose is
    a literal the vault is happy to carry. Reporting only what the fixer would
    change keeps the lint and the fix from disagreeing.
    """
    found: list[str] = []
    for kind, chunk in split_math_spans(text):
        if kind == "code":
            continue
        table = {**UNIVERSAL, **(MATH_ONLY if kind == "math" else PROSE_ONLY)}
        for ch in chunk:
            if ch in table and ch not in found:
                found.append(ch)
    return found


def lint_markdown(text: str) -> list[str]:
    """Mechanical issues in an authored question body, as human-readable lines."""
    issues: list[str] = []

    if has_literal_escapes(text):
        issues.append("literal '\\n' escape in prose (should be a real newline)")

    residue = unnormalised_chars(text)
    if residue:
        shown = " ".join(f"U+{ord(c):04X} {c!r}" for c in residue[:6])
        issues.append(f"un-normalised character(s): {shown}")

    for line in align_chain_lines(text):
        issues.append(f"align* line packs formula and result: {line[:70]}")

    for env in ALIGN_ENV_RE.finditer(text):
        opener = text.rfind("\n", 0, env.start())
        before = text[opener + 1 : env.start()].strip()
        if before not in ("", "$$"):
            issues.append("align* block does not start on its own line after '$$'")
            break

    return issues


if __name__ == "__main__":  # pragma: no cover - thin CLI for spot checks
    import sys

    for path in sys.argv[1:]:
        with open(path, encoding="utf-8") as fh:
            found = lint_markdown(fh.read())
        for issue in found:
            print(f"{path}: {issue}")
