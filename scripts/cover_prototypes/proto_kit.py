"""Shared bits for the three cover-design prototypes.

Pure hand-written SVG, no dependencies — same trade `cover_kit.py` makes.
"""
from __future__ import annotations

import hashlib
import re
from dataclasses import dataclass
from xml.sax.saxutils import escape

W, H = 400, 580

# Deliberately metric-predictable: Helvetica Neue, Helvetica, Arial and
# Liberation Sans share advance widths, so the table in `metrics.py` describes
# what every platform actually draws. `-apple-system` (SF Pro) is narrower and
# would make the measured wrap wrong on exactly one platform, so it is not here.
SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif"
SERIF = "Georgia, 'Times New Roman', Times, serif"
MONO = "'SF Mono', 'Roboto Mono', Menlo, Consolas, monospace"

from metrics import text_width  # noqa: E402  (measured advances)


def wrap(s, size, limit, bold=False):
    """Greedy word wrap against a pixel measure."""
    lines, current = [], ""
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


def balance(s, size, limit, bold=False):
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


def fit(s, sizes, limit, max_lines, bold=False):
    """Largest size that wraps `s` into `max_lines` lines that all fit.

    Both halves matter: a title can overrun on line *count* (five lines where
    there is room for three) or on width (one unbreakable word — "Property/
    Casualty" — wider than the measure), and only checking the first is how a
    cover ends up with its title running off the edge.
    """
    for size in sizes:
        lines = balance(s, size, limit, bold)
        if len(lines) <= max_lines and all(
                text_width(l, size, bold) <= limit for l in lines):
            return size, lines
    return sizes[-1], balance(s, sizes[-1], limit, bold)[:max_lines]


# ── colour ───────────────────────────────────────────────────────────────────
def _rgb(hex_: str):
    h = hex_.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def _hex(r, g, b):
    return "#%02x%02x%02x" % (
        max(0, min(255, int(round(r)))),
        max(0, min(255, int(round(g)))),
        max(0, min(255, int(round(b)))))


def mix(a: str, b: str, t: float) -> str:
    ra, ga, ba = _rgb(a)
    rb, gb, bb = _rgb(b)
    return _hex(ra + (rb - ra) * t, ga + (gb - ga) * t, ba + (bb - ba) * t)


def darken(c: str, t: float) -> str:
    return mix(c, "#000000", t)


def lighten(c: str, t: float) -> str:
    return mix(c, "#ffffff", t)


def _n(v) -> str:
    if isinstance(v, int) or float(v).is_integer():
        return str(int(v))
    return f"{float(v):.2f}".rstrip("0").rstrip(".")


class Canvas:
    """Minimal SVG builder: a defs bucket and a body bucket.

    Every `<defs>` id is suffixed with a hash of the cover's own alt text. An
    `<img src="…svg">` is its own document and could not collide, but the same
    file inlined into a page — a contact sheet, a future React inline — shares
    one id space, and two covers both defining `#field` means the second silently
    wears the first's gradient.
    """

    def __init__(self, alt: str):
        self.alt = alt
        self.uid = hashlib.sha1(alt.encode("utf-8")).hexdigest()[:7]
        self.defs: list[str] = []
        self.body: list[str] = []

    def gid(self, name: str) -> str:
        return f"{name}-{self.uid}"

    def url(self, name: str) -> str:
        return f"url(#{self.gid(name)})"

    def d(self, markup: str):
        self.defs.append(markup)

    def raw(self, markup: str):
        self.body.append(markup)

    @staticmethod
    def _opt(**kw):
        out = ""
        for k, v in kw.items():
            if v is None:
                continue
            out += f' {k.replace("_", "-")}="{_n(v) if isinstance(v, (int, float)) else v}"'
        return out

    def rect(self, x, y, w, h, fill, opacity=None, rx=None, **kw):
        self.raw(f'<rect x="{_n(x)}" y="{_n(y)}" width="{_n(w)}" height="{_n(h)}" '
                 f'fill="{fill}"{self._opt(opacity=opacity, rx=rx, **kw)}/>')

    def circle(self, cx, cy, r, fill="none", stroke=None, width=None, opacity=None, **kw):
        self.raw(f'<circle cx="{_n(cx)}" cy="{_n(cy)}" r="{_n(r)}" fill="{fill}"'
                 f'{self._opt(stroke=stroke, stroke_width=width, opacity=opacity, **kw)}/>')

    def line(self, x1, y1, x2, y2, stroke, width=1.0, opacity=None, cap=None):
        self.raw(f'<line x1="{_n(x1)}" y1="{_n(y1)}" x2="{_n(x2)}" y2="{_n(y2)}" '
                 f'stroke="{stroke}" stroke-width="{_n(width)}"'
                 f'{self._opt(opacity=opacity, stroke_linecap=cap)}/>')

    def path(self, d, stroke=None, fill="none", width=1.0, opacity=None, cap="round",
             join="round", **kw):
        self.raw(f'<path d="{d}" fill="{fill}"'
                 f'{self._opt(stroke=stroke, stroke_width=width if stroke else None, opacity=opacity, stroke_linecap=cap if stroke else None, stroke_linejoin=join if stroke else None, **kw)}/>')

    def text(self, x, y, s, size, *, family=SANS, fill="#fff", weight="400",
             anchor="start", tracking=None, opacity=None, **kw):
        self.raw(f'<text x="{_n(x)}" y="{_n(y)}" font-family="{family}" '
                 f'font-size="{_n(size)}" font-weight="{weight}" fill="{fill}" '
                 f'text-anchor="{anchor}"'
                 f'{self._opt(letter_spacing=tracking, opacity=opacity, **kw)}>'
                 f'{escape(s)}</text>')

    def lines(self, x, y, rows, size, leading, **kw):
        for i, row in enumerate(rows):
            self.text(x, y + i * leading, row, size, **kw)
        return y + (len(rows) - 1) * leading

    def render(self) -> str:
        defs = f'<defs>{"".join(self.defs)}</defs>' if self.defs else ""
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
                f'width="{W}" height="{H}" role="img" aria-label="{escape(self.alt)}">'
                f'<title>{escape(self.alt)}</title>{defs}'
                f'{"".join(self.body)}</svg>\n')


# ── metadata ─────────────────────────────────────────────────────────────────
ORDINALS = {1: "st", 2: "nd", 3: "rd"}


def parse_front_matter(raw: str):
    m = re.match(r"^---\n(.*?)\n---\n?", raw, re.S)
    if not m:
        return {}, raw
    attrs = {}
    for line in m.group(1).split("\n"):
        km = re.match(r"^([A-Za-z][A-Za-z0-9 _/-]*):\s*(.*)$", line)
        if not km:
            continue
        v = km.group(2).strip()
        if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
            v = v[1:-1]
        attrs[km.group(1).strip()] = v.strip()
    return attrs, raw[m.end():]


def ordinal_edition(edition: str):
    m = re.fullmatch(r"(\d+)\s*(?:e|st|nd|rd|th)?", edition.strip(), re.I)
    if not m:
        return None
    n = int(m.group(1))
    suffix = "th" if n % 100 in (11, 12, 13) else ORDINALS.get(n % 10, "th")
    return f"{n}{suffix} ed."


# A body, not a person: these never get reduced to a surname, and never set as
# a byline when the imprint line is already going to name them.
ORG_WORDS = re.compile(
    r"\b(society|board|academy|association|institute|committee|council|"
    r"bureau|press|university|actuaries|actuarial notes|casualty actuarial)\b",
    re.I)


def is_organisation(name: str) -> bool:
    return bool(ORG_WORDS.search(name))


def short_authors(author: str) -> str:
    """`Hogg, R.V., McKean, J.W., and Craig, A.T.` → `Hogg, McKean & Craig`.

    A byline set at cover size has room for surnames, not full citations.
    """
    a = author.strip()
    if not a or is_organisation(a):
        return a
    a = re.sub(r"\s+et\s+al\.?$", " et al.", a)
    parts = re.split(r",\s*(?![A-Z]\.)|\s+and\s+|\s*&\s*", a)
    names = []
    for p in parts:
        p = p.strip().rstrip(",")
        if not p or re.fullmatch(r"(?:[A-Z]\.\s*)+[A-Z]?\.?", p):
            continue  # a stray initials fragment from `Surname, R.V.`
        p = re.sub(r"^(?:[A-Z]\.[- ]?)+\s*", "", p)          # leading initials
        p = re.sub(r"\s*,?\s*(?:[A-Z]\.[- ]?)+$", "", p)     # trailing initials
        p = re.sub(r"^(?:[A-Z][a-z]+\.?\s)+(?=[A-Z])", lambda m: m.group(0), p)
        words = p.split()
        if len(words) > 1 and not p.endswith("et al."):
            p = words[-1]
        if p:
            names.append(p)
    if not names:
        return a
    if len(names) > 3:
        return f"{names[0]} et al."
    if len(names) == 1:
        return names[0]
    return ", ".join(names[:-1]) + " & " + names[-1]


@dataclass
class Meta:
    title: str
    subtitle: str
    kicker: str
    byline: str
    publisher: str
    year: str
    edition: str
    code: str
    subject: str


def split_title(title: str, code: str, type_: str) -> str:
    """Strip from the title everything the rest of the cover already says.

    The code (`ASOP No. 12`) is set in the facts line and the type
    (`Reference Sheet`) in the kicker, so neither is repeated. A trailing
    parenthetical goes too: `Risk Classification (for All Practice Areas)`
    wraps to four lines at cover size and the qualifier is the half nobody
    scans a shelf by.
    """
    out = title.strip()
    if code:
        out = re.sub(rf"^{re.escape(code)}\s*[—–:-]\s*", "", out)
    if type_:
        out = re.sub(rf"\s*[—–]\s*{re.escape(type_)}$", "", out, flags=re.I)
    trimmed = re.sub(r"\s*\([^()]*\)$", "", out).strip()
    if trimmed and len(trimmed.split()) >= 2:
        out = trimmed
    return out.strip()


SUBJECTS = [
    ("triangle", r"unpaid claim|reserv|loss development|ratemaking|principles|nonlife"),
    ("regression", r"generalized linear|linear model|regression|statistical learning|mixed model"),
    ("wave", r"time series"),
    ("survival", r"life conting|surviv|mortalit"),
    ("jumps", r"poisson|stochastic|process"),
    ("compound", r"interest|financial math|investment|credit|annuit"),
    ("bell", r"probabilit|statistic|distribution|random"),
    ("shield", r"asop|standard|risk classification|trending|insurance"),
]


def subject_for(title: str, kicker: str) -> str:
    hay = f"{title} {kicker}".lower()
    for name, pattern in SUBJECTS:
        if re.search(pattern, hay):
            return name
    return "grid"


def read_meta(attrs: dict) -> Meta:
    title_raw = attrs.get("Title", "")
    author = attrs.get("Authors") or attrs.get("Author") or ""
    publisher = attrs.get("Publisher", "")
    year = attrs.get("Year", "")
    edition_raw = attrs.get("Edition", "")
    code = attrs.get("Code", "")
    type_ = attrs.get("Type", "")

    title = split_title(title_raw, code, type_)
    main, _, sub = title.partition(": ")
    if not sub:
        main, _, sub = title.partition(" — ")

    kicker = type_
    if not kicker:
        m = re.match(r"^(Study Note|Monograph|Syllabus Reading)\b", edition_raw, re.I)
        kicker = m.group(1) if m else "Textbook"

    imprint = publisher or author
    # The imprint at the foot already names the house; a byline that repeats it
    # (every ASOP, the CAS statement, the vault's own reference sheets) is noise.
    byline = ("" if author.strip().lower() == imprint.strip().lower()
              else short_authors(author))
    return Meta(
        title=main.strip(),
        subtitle=sub.strip(),
        kicker=kicker,
        byline=byline,
        publisher=imprint,
        year=year,
        edition=ordinal_edition(edition_raw) or "",
        code=code,
        subject=subject_for(title, kicker),
    )
