"""A tiny dependency-free SVG toolkit for the resource-page cover images.

`generate_resource_covers.py` draws every `Resources/Books/*.md` cover through
this module, in the same spirit as `figure_kit.py` draws the concept figures:
hand-written SVG, no third-party dependency, a couple of KB per file.

Two things separate a cover from a concept figure:

1. **It does not follow the theme.** A figure has to stay legible on the app's
   dark canvas *and* on the light published site, so `figure_kit` ships a
   `prefers-color-scheme` override. A cover is a picture of an object — a real
   book's jacket does not invert when the room lights go off — so the palette
   here is fixed.
2. **The livery is the publisher's, not the page's.** Covers are looked at as a
   shelf (the Resources list, the search results, the concept popup), so the
   colour is keyed off the publisher: every CAS study note shares one jacket,
   every ASOP another. That reads as a series, which is what the source material
   actually is.

Text is laid out without a font engine, so `text_width` estimates advances from
a per-character table normalised to the em. It only has to be good enough to
decide where to wrap and when to step the title down a size.
"""

from __future__ import annotations

from dataclasses import dataclass
from xml.sax.saxutils import escape

# The aspect the covers already in Media/Attachments were drawn at.
W, H = 400, 580

SERIF = "Georgia, 'Times New Roman', Times, serif"
SANS = ("-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, "
        "'Helvetica Neue', Arial, sans-serif")


@dataclass(frozen=True)
class Livery:
    """A publisher's jacket: the field it is printed on and its accent."""
    top: str      # gradient start (upper left)
    bottom: str   # gradient end (lower right)
    accent: str   # the bars, the rule, the ornament
    ink: str = "#ffffff"
    dim: str = "#dbe3ec"


# ── text metrics ─────────────────────────────────────────────────────────────
# Advance widths as a fraction of the font size, close enough to Georgia/Arial
# to wrap a title correctly. Anything not listed takes the default.
_NARROW = ".,:;'!|iljtfrI()[]-"
_WIDE = "mwMW@%"


def text_width(s: str, size: float, bold: bool = False) -> float:
    total = 0.0
    for ch in s:
        if ch == " ":
            w = 0.26
        elif ch in _NARROW:
            w = 0.30
        elif ch in _WIDE:
            w = 0.85
        elif ch.isupper() or ch.isdigit():
            w = 0.62
        else:
            w = 0.51
        total += w
    return total * size * (1.045 if bold else 1.0)


def wrap(s: str, size: float, limit: float, bold: bool = False) -> list[str]:
    """Greedy word wrap against a pixel width."""
    lines: list[str] = []
    current = ""
    for word in s.split():
        trial = f"{current} {word}".strip()
        if current and text_width(trial, size, bold) > limit:
            lines.append(current)
            current = word
        else:
            current = trial
    if current:
        lines.append(current)
    return lines


def balance(s: str, size: float, limit: float, bold: bool = False) -> list[str]:
    """Wrap, then narrow the measure until the last line is not a stub.

    A greedy wrap leaves `…with Applications in / R` — one orphaned character on
    a line of its own, which on a centred title block looks like a mistake.
    Tightening the measure while the line count holds pulls a word down instead.
    """
    lines = wrap(s, size, limit, bold)
    if len(lines) < 2:
        return lines
    best = lines
    for shrink in (0.94, 0.88, 0.82, 0.76, 0.70):
        if text_width(best[-1], size, bold) >= 0.34 * limit:
            break
        trial = wrap(s, size, limit * shrink, bold)
        if len(trial) != len(lines):
            break
        best = trial
    return best


def fit(s: str, sizes: list[float], limit: float, max_lines: int,
        bold: bool = False) -> tuple[float, list[str]]:
    """Largest size in `sizes` that wraps `s` into at most `max_lines`."""
    for size in sizes:
        lines = balance(s, size, limit, bold)
        if len(lines) <= max_lines:
            return size, lines
    return sizes[-1], balance(s, sizes[-1], limit, bold)[:max_lines]


# ── svg ──────────────────────────────────────────────────────────────────────
class Cover:
    def __init__(self, livery: Livery, alt: str):
        self.lv = livery
        self.alt = alt
        self.parts: list[str] = []

    def raw(self, markup: str) -> None:
        self.parts.append(markup)

    def rect(self, x, y, w, h, fill, opacity: float | None = None) -> None:
        op = "" if opacity is None else f' opacity="{opacity}"'
        self.raw(f'<rect x="{_n(x)}" y="{_n(y)}" width="{_n(w)}" '
                 f'height="{_n(h)}" fill="{fill}"{op}/>')

    def line(self, x1, y1, x2, y2, stroke, width=1.0, opacity=None) -> None:
        op = "" if opacity is None else f' opacity="{opacity}"'
        self.raw(f'<line x1="{_n(x1)}" y1="{_n(y1)}" x2="{_n(x2)}" '
                 f'y2="{_n(y2)}" stroke="{stroke}" '
                 f'stroke-width="{_n(width)}"{op}/>')

    def frame(self, x, y, w, h, stroke, width=1.0, opacity=None) -> None:
        op = "" if opacity is None else f' opacity="{opacity}"'
        self.raw(f'<rect x="{_n(x)}" y="{_n(y)}" width="{_n(w)}" '
                 f'height="{_n(h)}" fill="none" stroke="{stroke}" '
                 f'stroke-width="{_n(width)}"{op}/>')

    def text(self, x, y, s, size, *, family=SANS, fill=None, weight="normal",
             anchor="middle", spacing=None, opacity=None) -> None:
        fill = fill or self.lv.ink
        sp = "" if spacing is None else f' letter-spacing="{_n(spacing)}"'
        op = "" if opacity is None else f' opacity="{opacity}"'
        self.raw(f'<text x="{_n(x)}" y="{_n(y)}" font-family="{family}" '
                 f'font-size="{_n(size)}" font-weight="{weight}" '
                 f'fill="{fill}" text-anchor="{anchor}"{sp}{op}>'
                 f'{escape(s)}</text>')

    def lines(self, x, y, rows: list[str], size, leading, **kw) -> float:
        """Draw stacked lines from baseline `y`; returns the next free baseline."""
        for i, row in enumerate(rows):
            self.text(x, y + i * leading, row, size, **kw)
        return y + len(rows) * leading

    def render(self) -> str:
        lv = self.lv
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
            f'width="{W}" height="{H}" role="img" '
            f'aria-label="{escape(self.alt)}">'
            f'<title>{escape(self.alt)}</title>'
            '<defs>'
            f'<linearGradient id="field" x1="0" y1="0" x2="0.35" y2="1">'
            f'<stop offset="0" stop-color="{lv.top}"/>'
            f'<stop offset="1" stop-color="{lv.bottom}"/>'
            '</linearGradient>'
            '<radialGradient id="glow" cx="0.5" cy="0.28" r="0.75">'
            f'<stop offset="0" stop-color="{lv.ink}" stop-opacity="0.10"/>'
            f'<stop offset="1" stop-color="{lv.ink}" stop-opacity="0"/>'
            '</radialGradient>'
            '</defs>'
            + "".join(self.parts) +
            '</svg>\n'
        )


def _n(v: float) -> str:
    if isinstance(v, int) or float(v).is_integer():
        return str(int(v))
    return f"{float(v):.2f}".rstrip("0").rstrip(".")
