"""A tiny dependency-free SVG toolkit for the resource-page cover images.

`generate_resource_covers.py` draws every `Resources/Books/*.md` cover through
this module, in the same spirit as `figure_kit.py` draws the concept figures:
hand-written SVG, no third-party dependency, a couple of KB per file.

Three things separate a cover from a concept figure:

1. **It does not follow the theme.** A figure has to stay legible on the app's
   dark canvas *and* on the light published site, so `figure_kit` ships a
   `prefers-color-scheme` override. A cover is a picture of an object — a real
   book's jacket does not invert when the room lights go off — so the palette
   here is fixed. The jacket is deliberately the brightest thing on the
   Resources page: a shelf of pale objects on the app's dark canvas reads as a
   shelf, where a shelf of dark ones reads as more chrome.
2. **The livery is the publisher's, not the page's.** Covers are looked at as a
   shelf (the Resources list, the search results, the concept popup), so the
   colour is keyed off the publisher: every CAS study note shares one jacket,
   every ASOP another. That reads as a series, which is what the source material
   actually is.
3. **The type has to be measured, not estimated.** A figure that mis-guesses a
   label's width loses a little air; a cover that mis-guesses a title's width
   sets it two steps too large and runs it off the edge of the jacket. The
   tables below are the *real* per-character advances of the cover font stack,
   measured once in a browser with `getComputedTextLength` — see
   `text_width` for how to regenerate them.
"""

from __future__ import annotations

import hashlib
from dataclasses import dataclass
from xml.sax.saxutils import escape

# The aspect the covers in Media/Attachments are drawn at.
W, H = 400, 580

# Deliberately metric-predictable: Helvetica Neue, Helvetica, Arial and
# Liberation Sans all share advance widths, so the tables below describe what
# every platform actually draws. `-apple-system` (SF Pro) is narrower and would
# make the measured wrap wrong on exactly one platform, so it is not in here.
SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif"


# ── text metrics ─────────────────────────────────────────────────────────────
# Advance widths as a fraction of the em, grouped by value. To regenerate:
# render `<text>` in a browser at font-size 100 in the stack above and read
# `getComputedTextLength()` for `n<char>n` minus `nn`, for weights 400 and 700.
_REGULAR_GROUPS = {
    0.1909: "'",
    0.2222: 'ijlł’',
    0.2598: '|',
    0.2778: ' !,./:;I[\\]ftí',
    0.333: '()-`r·“”',
    0.3341: '{}',
    0.355: '"',
    0.3892: '*',
    0.4692: '^',
    0.5: 'Jcksvxyzçćśźż',
    0.5563: '#$0123456789?L_abdeghnopquáäéóöüąęŁńū–',
    0.5841: '+<=>~',
    0.6109: 'FTZŻ',
    0.667: '&ABEKPSVXY',
    0.7222: 'CDHNRUw',
    0.7778: 'GOQ',
    0.833: 'Mm',
    0.8892: '%',
    0.9439: 'W',
    1.0: '—',
    1.0152: '@',
}
_BOLD_GROUPS = {
    0.2378: "'",
    0.2778: ' ,./I\\ijlíł’',
    0.2798: '|',
    0.333: '!()-:;[]`ft·',
    0.3892: '*r{}',
    0.4742: '"',
    0.5: 'zźż“”',
    0.5563: '#$0123456789J_aceksvxyáäçéąćęś–',
    0.5841: '+<=>^~',
    0.6109: '?FLTZbdghnopquóöüŁńūŻ',
    0.667: 'EPSVXY',
    0.7222: '&ABCDHKNRU',
    0.7778: 'GOQw',
    0.833: 'M',
    0.8892: '%m',
    0.9439: 'W',
    0.9752: '@',
    1.0: '—',
}


REGULAR: dict[str, float] = {}
BOLD: dict[str, float] = {}
for _w, _chars in _REGULAR_GROUPS.items():
    for _c in _chars:
        REGULAR[_c] = _w
for _w, _chars in _BOLD_GROUPS.items():
    for _c in _chars:
        BOLD[_c] = _w

# Anything outside the tables — a glyph from a language the vault has not
# needed yet — is charged at a lowercase advance, which errs narrow by less
# than a capital would err wide.
DEFAULT_REGULAR = 0.5563
DEFAULT_BOLD = 0.6109


def text_width(s: str, size: float, bold: bool = False,
               tracking: float = 0.0) -> float:
    """Rendered width of `s` in user units at `size`.

    `tracking` is the SVG `letter-spacing`, which the renderer adds after every
    character including the last — matching that here keeps a tracked-out caps
    line inside its measure.
    """
    table = BOLD if bold else REGULAR
    default = DEFAULT_BOLD if bold else DEFAULT_REGULAR
    return sum(table.get(ch, default) for ch in s) * size + tracking * len(s)


def wrap(s: str, size: float, limit: float, bold: bool = False) -> list[str]:
    """Greedy word wrap against a pixel measure."""
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
    a line of its own, which under a title reads as a mistake. Tightening the
    measure while the line count holds pulls a word down instead.
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
    """Largest size in `sizes` that wraps `s` into lines that all fit.

    Both halves matter. A title can overrun on line *count* (five lines where
    there is room for three) or on *width* — one unbreakable word, "Property/
    Casualty", wider than the measure at any wrap. Checking only the first is
    how a cover ends up with its title running off the edge.
    """
    for size in sizes:
        lines = balance(s, size, limit, bold)
        if len(lines) <= max_lines and all(
                text_width(line, size, bold) <= limit for line in lines):
            return size, lines
    return sizes[-1], balance(s, sizes[-1], limit, bold)[:max_lines]


# ── colour ───────────────────────────────────────────────────────────────────
@dataclass(frozen=True)
class Livery:
    """A publisher's jacket: the field colour and the one bright accent."""
    base: str
    accent: str


# Matched against the publisher (first hit wins), so every source from one house
# shares a jacket. `base` carries white type in the band, so each is dark enough
# to clear 4.5:1; `accent` is the shape cut out of it and the rule under it.
JACKETS: list[tuple[str, Livery]] = [
    ("casualty actuarial society", Livery("#1b4f8a", "#fbbf24")),
    ("actuarial standards board", Livery("#374151", "#f87171")),
    ("society of actuaries", Livery("#1d4ed8", "#38bdf8")),
    ("american academy", Livery("#1d4ed8", "#38bdf8")),
    ("american mathematical society", Livery("#1e40af", "#93c5fd")),
    ("springer", Livery("#0f766e", "#fde047")),
    ("world scientific", Livery("#0e7490", "#5eead4")),
    ("chapman", Livery("#6d28d9", "#f472b6")),
    ("routledge", Livery("#6d28d9", "#f472b6")),
    ("taylor", Livery("#6d28d9", "#f472b6")),
    ("pearson", Livery("#be123c", "#fbbf24")),
    ("prentice hall", Livery("#be123c", "#fbbf24")),
    ("academic press", Livery("#c2410c", "#fdba74")),
    ("elsevier", Livery("#c2410c", "#fdba74")),
    ("cambridge", Livery("#15803d", "#a3e635")),
    ("oxford", Livery("#1e40af", "#93c5fd")),
    ("wiley", Livery("#1d4ed8", "#22d3ee")),
    ("brooks/cole", Livery("#9a3412", "#fdba74")),
    ("actex", Livery("#9f1239", "#fcd34d")),
    ("actuarialbrew", Livery("#0f766e", "#facc15")),
    ("lightning source", Livery("#0e7490", "#f4d35e")),
    ("actuarial notes", Livery("#6d28d9", "#2dd4bf")),
]
DEFAULT_JACKET = Livery("#334155", "#94a3b8")


def jacket_for(publisher: str, author: str = "") -> Livery:
    hay = f"{publisher} {author}".lower()
    for needle, livery in JACKETS:
        if needle in hay:
            return livery
    return DEFAULT_JACKET


def _rgb(hex_: str) -> tuple[int, int, int]:
    h = hex_.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def mix(a: str, b: str, t: float) -> str:
    """Blend `a` toward `b` by `t` (0 → a, 1 → b)."""
    ra, ga, ba = _rgb(a)
    rb, gb, bb = _rgb(b)
    return "#%02x%02x%02x" % tuple(
        max(0, min(255, round(x + (y - x) * t)))
        for x, y in ((ra, rb), (ga, gb), (ba, bb)))


def darken(c: str, t: float) -> str:
    return mix(c, "#000000", t)


def lighten(c: str, t: float) -> str:
    return mix(c, "#ffffff", t)


# ── svg ──────────────────────────────────────────────────────────────────────
def n(v: float) -> str:
    """Shortest exact-enough representation of a coordinate."""
    if isinstance(v, int) or float(v).is_integer():
        return str(int(v))
    return f"{float(v):.2f}".rstrip("0").rstrip(".")


class Cover:
    """A cover being drawn: a `<defs>` bucket and a body bucket.

    Every `<defs>` id is suffixed with a hash of the cover's own alt text. An
    `<img src="…svg">` is its own document and could not collide, but the same
    files inlined into one page — a contact sheet, a future inline render —
    share an id space, and two covers both defining `#band` means the second
    silently wears the first's gradient.
    """

    def __init__(self, alt: str):
        self.alt = alt
        self.uid = hashlib.sha1(alt.encode("utf-8")).hexdigest()[:7]
        self.defs: list[str] = []
        self.parts: list[str] = []

    def gid(self, name: str) -> str:
        return f"{name}-{self.uid}"

    def url(self, name: str) -> str:
        return f"url(#{self.gid(name)})"

    def define(self, markup: str) -> None:
        self.defs.append(markup)

    def raw(self, markup: str) -> None:
        self.parts.append(markup)

    @staticmethod
    def _attrs(**kw) -> str:
        out = ""
        for key, value in kw.items():
            if value is None:
                continue
            rendered = n(value) if isinstance(value, (int, float)) else value
            out += f' {key.replace("_", "-")}="{rendered}"'
        return out

    def rect(self, x, y, w, h, fill, opacity=None, rx=None) -> None:
        self.raw(f'<rect x="{n(x)}" y="{n(y)}" width="{n(w)}" height="{n(h)}" '
                 f'fill="{fill}"{self._attrs(opacity=opacity, rx=rx)}/>')

    def circle(self, cx, cy, r, fill="none", stroke=None, width=None,
               opacity=None) -> None:
        self.raw(f'<circle cx="{n(cx)}" cy="{n(cy)}" r="{n(r)}" fill="{fill}"'
                 f'{self._attrs(stroke=stroke, stroke_width=width, opacity=opacity)}/>')

    def line(self, x1, y1, x2, y2, stroke, width=1.0, opacity=None,
             cap=None) -> None:
        self.raw(f'<line x1="{n(x1)}" y1="{n(y1)}" x2="{n(x2)}" y2="{n(y2)}" '
                 f'stroke="{stroke}" stroke-width="{n(width)}"'
                 f'{self._attrs(opacity=opacity, stroke_linecap=cap)}/>')

    def path(self, d, fill="none", stroke=None, width=None, opacity=None,
             cap="round", join="round") -> None:
        self.raw(f'<path d="{d}" fill="{fill}"'
                 f'{self._attrs(stroke=stroke, stroke_width=width, opacity=opacity, stroke_linecap=cap if stroke else None, stroke_linejoin=join if stroke else None)}/>')

    def text(self, x, y, s, size, *, fill, weight="400", anchor="start",
             tracking=None, opacity=None) -> None:
        self.raw(f'<text x="{n(x)}" y="{n(y)}" font-family="{SANS}" '
                 f'font-size="{n(size)}" font-weight="{weight}" fill="{fill}" '
                 f'text-anchor="{anchor}"'
                 f'{self._attrs(letter_spacing=tracking, opacity=opacity)}>'
                 f'{escape(s)}</text>')

    def lines(self, x, y, rows: list[str], size, leading, **kw) -> float:
        """Draw stacked lines from baseline `y`; returns the last baseline."""
        for i, row in enumerate(rows):
            self.text(x, y + i * leading, row, size, **kw)
        return y + (len(rows) - 1) * leading

    def render(self) -> str:
        defs = f'<defs>{"".join(self.defs)}</defs>' if self.defs else ""
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
                f'width="{W}" height="{H}" role="img" '
                f'aria-label="{escape(self.alt)}">'
                f'<title>{escape(self.alt)}</title>{defs}'
                f'{"".join(self.parts)}</svg>\n')
