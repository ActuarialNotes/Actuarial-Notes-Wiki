#!/usr/bin/env python3
"""Draw a cover image for every `Resources/Books/*.md` page that lacks one.

A resource page's metadata card (`quiz/src/components/wiki/ResourceMetaCard.tsx`)
shows the first image embedded in the page body as the source's cover, and the
card looks unfinished without one. Real jacket art is the better picture and is
kept wherever it exists — this script never touches a page whose first embed it
does not own, so dropping a scanned or publisher-supplied cover into
`Media/Attachments/` and embedding it takes precedence permanently.

For everything else it draws a jacket from the page's own front matter: a band
of the publisher's colour holding a drawing of the subject, then paper below
with the title set large in black. Output is SVG (a couple of KB, crisp at the
64–112 px the card renders it at, and served as `image/svg+xml` by
raw.githubusercontent.com).

    python3 scripts/generate_resource_covers.py            # fill in the gaps
    python3 scripts/generate_resource_covers.py --force    # redraw ours too
    python3 scripts/generate_resource_covers.py --check    # CI: any drift?

Like the concept figures, these are **generated** — edit this script, not the
SVG, or the next run will discard the change.
"""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from cover_kit import (H, W, Cover, balance, darken, fit, jacket_for, mix,
                       text_width)
from cover_motifs import MOTIFS

REPO = Path(__file__).resolve().parent.parent
BOOKS = REPO / "Resources" / "Books"
ATTACHMENTS = REPO / "Media" / "Attachments"

# The suffix this script owns. A cover embed ending in anything else is somebody
# else's (a real jacket) and is left alone.
OURS = " - Cover.svg"

IMAGE_EMBED_RE = re.compile(r"!\[\[([^\]|]+\.(?:png|jpe?g|gif|svg|webp|avif))\]\]", re.I)

ORDINALS = {1: "st", 2: "nd", 3: "rd"}

# ── layout ───────────────────────────────────────────────────────────────────
PAD = 30                 # left and right margin for everything
MEASURE = W - PAD * 2
BAND = 236               # where the colour band ends and the paper starts
FOOT_RULE = H - 58       # the hairline the citation sits under
PAPER = "#f6f5f1"
GRAPHITE = "#14161a"


# ── front matter ─────────────────────────────────────────────────────────────
def parse_front_matter(raw: str) -> tuple[dict[str, str], str]:
    """Split a page into its `key: value` front matter and its body.

    Deliberately not a YAML parser — these blocks are flat scalars, and the
    vault has no PyYAML dependency (see `scripts/figure_kit.py` for the same
    trade).
    """
    m = re.match(r"^---\n(.*?)\n---\n?", raw, re.S)
    if not m:
        return {}, raw
    attrs: dict[str, str] = {}
    for line in m.group(1).split("\n"):
        km = re.match(r"^([A-Za-z][A-Za-z0-9 _/-]*):\s*(.*)$", line)
        if not km:
            continue
        value = km.group(2).strip().strip("\r")
        if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
            value = value[1:-1]
        attrs[km.group(1).strip()] = value.strip()
    return attrs, raw[m.end():]


def ordinal_edition(edition: str) -> str | None:
    """`4e`, `5th`, `12e` → `4th ed.`. Anything wordier is not an edition."""
    m = re.fullmatch(r"(\d+)\s*(?:e|st|nd|rd|th)?", edition.strip(), re.I)
    if not m:
        return None
    n = int(m.group(1))
    # 11th/12th/13th break the last-digit rule.
    suffix = "th" if n % 100 in (11, 12, 13) else ORDINALS.get(n % 10, "th")
    return f"{n}{suffix} ed."


# A body, not a person: these are never reduced to a surname, and never set as a
# byline when the imprint line at the foot is going to name them anyway.
ORG_WORDS = re.compile(
    r"\b(society|board|academy|association|institute|committee|council|"
    r"bureau|press|university|actuaries|actuarial notes|casualty actuarial)\b",
    re.I)


def short_authors(author: str) -> str:
    """`Hogg, R.V., McKean, J.W., and Craig, A.T.` → `Hogg, McKean & Craig`.

    A byline at cover size has room for surnames, not for a full citation —
    which the page's own front matter still carries, and which the metadata
    card beside the jacket prints in full.
    """
    a = author.strip()
    if not a or ORG_WORDS.search(a):
        return a
    a = re.sub(r"\s+et\s+al\.?$", " et al.", a)
    names: list[str] = []
    for part in re.split(r",\s*(?![A-Z]\.)|\s+and\s+|\s*&\s*", a):
        part = part.strip().rstrip(",")
        if not part or re.fullmatch(r"(?:[A-Z]\.\s*)+[A-Z]?\.?", part):
            continue  # a stray initials fragment from `Surname, R.V.`
        part = re.sub(r"^(?:[A-Z]\.[- ]?)+\s*", "", part)       # leading initials
        part = re.sub(r"\s*,?\s*(?:[A-Z]\.[- ]?)+$", "", part)  # trailing initials
        words = part.split()
        if len(words) > 1 and not part.endswith("et al."):
            part = words[-1]
        if part:
            names.append(part)
    if not names:
        return a
    if len(names) > 3:
        return f"{names[0]} et al."
    if len(names) == 1:
        return names[0]
    return ", ".join(names[:-1]) + " & " + names[-1]


# Which drawing a source gets, matched against its title and kind. First hit
# wins, so the more specific patterns come first: an unpaid-claims *standard* is
# a triangle before it is a shield.
SUBJECTS: list[tuple[str, str]] = [
    ("triangle", r"unpaid claim|reserv|loss development|ratemaking|principles|nonlife"),
    ("regression", r"generalized linear|linear model|regression|statistical learning|mixed model"),
    ("wave", r"time series"),
    ("survival", r"life conting|surviv|mortalit"),
    ("arrivals", r"poisson|stochastic|process"),
    ("compounding", r"interest|financial math|investment|credit|annuit"),
    ("bell", r"probabilit|statistic|distribution|random"),
    ("shield", r"asop|standard|risk classification|trending|insurance"),
]


def subject_for(title: str, kind: str) -> str:
    hay = f"{title} {kind}".lower()
    for name, pattern in SUBJECTS:
        if re.search(pattern, hay):
            return name
    return "lattice"


def split_title(title: str, code: str, type_: str) -> str:
    """Strip from the title everything the rest of the cover already says.

    The code (`ASOP No. 12`) is set in the citation line and the type
    (`Reference Sheet`) in the kicker, so neither is repeated. A trailing
    parenthetical goes too: `Risk Classification (for All Practice Areas)` wraps
    to four lines at cover size, and the qualifier is the half nobody scans a
    shelf by.
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


@dataclass(frozen=True)
class Meta:
    """Everything the drawing needs, lifted out of one page's front matter."""
    title: str
    subtitle: str
    kind: str
    byline: str
    imprint: str
    facts: str
    subject: str


def read_meta(attrs: dict[str, str]) -> Meta:
    author = attrs.get("Authors") or attrs.get("Author") or ""
    publisher = attrs.get("Publisher", "")
    year = attrs.get("Year", "")
    edition = attrs.get("Edition", "")
    code = attrs.get("Code", "")
    type_ = attrs.get("Type", "")

    title = split_title(attrs.get("Title", ""), code, type_)
    main, _, sub = title.partition(": ")
    if not sub:
        main, _, sub = title.partition(" — ")

    kind = type_
    if not kind:
        # The CAS study notes carry their kind in the Edition field ("Study Note
        # (Oct 2014, rev. Sep 2015)") because they have no other field for it.
        m = re.match(r"^(Study Note|Monograph|Syllabus Reading)\b", edition, re.I)
        kind = m.group(1) if m else "Textbook"

    imprint = publisher or author
    # The imprint at the foot already names the house; a byline repeating it
    # (every ASOP, the CAS statement, the vault's own reference sheets) is noise
    # — the same rule `ResourceMetaCard` applies to its publisher chip.
    byline = ("" if author.strip().lower() == imprint.strip().lower()
              else short_authors(author))

    return Meta(
        title=main.strip(),
        subtitle=sub.strip(),
        kind=kind,
        byline=byline,
        imprint=imprint,
        facts=" · ".join(f for f in (code, ordinal_edition(edition), year) if f),
        subject=subject_for(title, kind),
    )


# ── drawing ──────────────────────────────────────────────────────────────────
def draw(attrs: dict[str, str]) -> str:
    """One jacket: a band of house colour over paper.

    The two-tone split is the point. The band carries the publisher's livery and
    the subject drawing, so a shelf reads as a series and a single cover says
    what the book is about before its title is legible; the paper carries the
    title in black, which is the most readable thing the format allows at 88 px.
    Together they make the jacket the brightest object on the Resources page
    rather than another dark rectangle on a dark canvas.
    """
    m = read_meta(attrs)
    lv = jacket_for(attrs.get("Publisher", ""), m.byline)
    alt = " — ".join(x for x in (m.title, m.byline or m.imprint,
                                 attrs.get("Year", "")) if x)
    c = Cover(f"Cover of {alt}" if alt else "Cover")

    c.define(f'<linearGradient id="{c.gid("band")}" x1="0" y1="0" x2="0.8" y2="1">'
             f'<stop offset="0" stop-color="{mix(lv.base, "#ffffff", 0.14)}"/>'
             f'<stop offset="1" stop-color="{darken(lv.base, 0.22)}"/>'
             '</linearGradient>')
    c.define(f'<linearGradient id="{c.gid("paper")}" x1="0" y1="0" x2="0" y2="1">'
             '<stop offset="0" stop-color="#fbfaf7"/>'
             f'<stop offset="1" stop-color="{PAPER}"/></linearGradient>')
    c.define(f'<clipPath id="{c.gid("crop")}">'
             f'<rect x="0" y="0" width="{W}" height="{BAND}"/></clipPath>')

    c.rect(0, 0, W, H, c.url("paper"))
    # The drawing is cropped by the band, not fitted inside it — a shape running
    # off the edge is what stops the block reading as a pasted-in icon.
    c.raw(f'<g clip-path="{c.url("crop")}">')
    c.rect(0, 0, W, BAND, c.url("band"))
    MOTIFS[m.subject](c, W, BAND, lv.accent)
    c.raw("</g>")
    c.rect(0, BAND - 6, W, 6, lv.accent)

    c.text(PAD, 52, m.kind.upper(), 10.5, weight="700", tracking=1.9,
           fill="#ffffff", opacity=0.92)

    # The words are centred in the paper rather than hung from the band: a
    # two-word title otherwise leaves 200 px of blank paper at the foot, which
    # reads as a layout that ran out rather than as white space.
    size, rows = fit(m.title, [40, 36, 32, 28, 25, 22, 20], MEASURE, 5, bold=True)
    leading = size * 1.06
    sub_size = max(14.0, round(size * 0.40, 1))
    sub_rows = balance(m.subtitle, sub_size, MEASURE) if m.subtitle else []
    by_size, by_rows = (fit(m.byline, [15, 14, 13], MEASURE, 2, bold=True)
                        if m.byline else (0.0, []))

    block = (len(rows) - 1) * leading + size
    if sub_rows:
        block += sub_size + 12 + (len(sub_rows) - 1) * sub_size * 1.3
    if by_rows:
        block += 34 + (len(by_rows) - 1) * by_size * 1.3 + by_size
    y = BAND + (FOOT_RULE - BAND - block) / 2 + size

    y = c.lines(PAD, y, rows, size, leading, weight="700", fill=GRAPHITE)
    if sub_rows:
        y = c.lines(PAD, y + sub_size + 12, sub_rows, sub_size, sub_size * 1.3,
                    fill=mix(GRAPHITE, PAPER, 0.42))
    if by_rows:
        c.lines(PAD, y + 34, by_rows, by_size, by_size * 1.3, weight="600",
                fill=darken(lv.base, 0.10))

    c.line(PAD, FOOT_RULE, W - PAD, FOOT_RULE, GRAPHITE, 1, 0.14)
    foot_ink = mix(GRAPHITE, PAPER, 0.45)
    if m.imprint:
        size_ = 9.5 if text_width(m.imprint.upper(), 9.5, True, 1.5) <= MEASURE * 0.6 else 8
        c.text(PAD, H - 36, m.imprint.upper(), size_, weight="700", tracking=1.5,
               fill=foot_ink)
    if m.facts:
        c.text(W - PAD, H - 36, m.facts, 9.5, weight="600", tracking=1.1,
               fill=foot_ink, anchor="end")

    return c.render()


# ── page wiring ──────────────────────────────────────────────────────────────
def cover_filename(page: Path) -> str:
    return re.sub(r"[:/\\]", "-", page.stem) + OURS


def existing_embed(body: str) -> str | None:
    m = IMAGE_EMBED_RE.search(body)
    return m.group(1) if m else None


def insert_embed(raw: str, body: str, embed_name: str) -> str:
    head = raw[: len(raw) - len(body)]
    return f"{head}![[{embed_name}]]\n\n{body.lstrip()}"


def process(page: Path, force: bool) -> tuple[str, dict[str, str]] | None:
    """Return the (filename, files-to-write) for `page`, or None to skip it."""
    raw = page.read_text(encoding="utf-8")
    attrs, body = parse_front_matter(raw)
    if not attrs:
        return None

    embed = existing_embed(body)
    if embed and not embed.endswith(OURS):
        return None  # a real cover, or a figure the page opens with
    if embed and not force:
        return None

    name = cover_filename(page)
    writes = {str(ATTACHMENTS / name): draw(attrs)}
    if not embed:
        writes[str(page)] = insert_embed(raw, body, name)
    return name, writes


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--force", action="store_true",
                    help="redraw covers this script already owns")
    ap.add_argument("--check", action="store_true",
                    help="exit non-zero if anything would change")
    args = ap.parse_args()

    ATTACHMENTS.mkdir(parents=True, exist_ok=True)
    pending: dict[str, str] = {}
    drawn: list[str] = []

    for page in sorted(BOOKS.glob("*.md")):
        result = process(page, force=args.force or args.check)
        if not result:
            continue
        name, writes = result
        drawn.append(name)
        pending.update(writes)

    stale = {p: t for p, t in pending.items()
             if not Path(p).exists() or Path(p).read_text(encoding="utf-8") != t}

    if args.check:
        for path in sorted(stale):
            print(f"drift: {Path(path).relative_to(REPO)}")
        print(f"{len(stale)} file(s) out of date")
        return 1 if stale else 0

    for path, text in sorted(stale.items()):
        Path(path).write_text(text, encoding="utf-8")
        print(f"wrote {Path(path).relative_to(REPO)}")
    print(f"{len(drawn)} cover(s) considered, {len(stale)} file(s) written")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
