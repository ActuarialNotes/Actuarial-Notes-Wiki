#!/usr/bin/env python3
"""Draw a cover image for every `Resources/Books/*.md` page that lacks one.

A resource page's metadata card (`quiz/src/components/wiki/ResourceMetaCard.tsx`)
shows the first image embedded in the page body as the source's cover, and the
card looks unfinished without one. Real jacket art is the better picture and is
kept wherever it exists — this script never touches a page that already embeds
an image, so dropping a scanned or publisher-supplied cover into
`Media/Attachments/` and embedding it takes precedence permanently.

For everything else it draws a typographic cover from the page's own front
matter: title, author, edition, year, and a jacket colour keyed off the
publisher, so the CAS study notes look like a series and the ASOPs look like a
different one. Output is SVG (a couple of KB, crisp at the 56–96 px the card
renders it at, and served as `image/svg+xml` by raw.githubusercontent.com).

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
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from cover_kit import H, SANS, SERIF, W, Cover, Livery, balance, fit, text_width

REPO = Path(__file__).resolve().parent.parent
BOOKS = REPO / "Resources" / "Books"
ATTACHMENTS = REPO / "Media" / "Attachments"

# The suffix this script owns. A cover embed ending in anything else is somebody
# else's (a real jacket) and is left alone.
OURS = " - Cover.svg"

IMAGE_EMBED_RE = re.compile(r"!\[\[([^\]|]+\.(?:png|jpe?g|gif|svg|webp|avif))\]\]", re.I)

# ── jackets ──────────────────────────────────────────────────────────────────
# Matched against the publisher (first hit wins), so every source from one house
# shares a jacket. Field colours are dark enough for white type to clear 4.5:1.
JACKETS: list[tuple[str, Livery]] = [
    ("casualty actuarial society", Livery("#123f63", "#08243b", "#e8b23a")),
    ("actuarial standards board", Livery("#39414d", "#1d222a", "#c0503c")),
    ("society of actuaries", Livery("#12356f", "#071b40", "#ffffff")),
    ("american academy", Livery("#12356f", "#071b40", "#ffffff")),
    ("springer", Livery("#15537f", "#0a2f4d", "#f2c14e")),
    ("chapman", Livery("#4b1f4a", "#28102a", "#d98c2b")),
    ("routledge", Livery("#4b1f4a", "#28102a", "#d98c2b")),
    ("taylor", Livery("#4b1f4a", "#28102a", "#d98c2b")),
    ("pearson", Livery("#9e1122", "#5f0a15", "#f2c14e")),
    ("academic press", Livery("#123a5e", "#0a2540", "#e87722")),
    ("elsevier", Livery("#123a5e", "#0a2540", "#e87722")),
    ("cambridge", Livery("#14452f", "#0a2a1d", "#c9a227")),
    ("oxford", Livery("#0f2f52", "#08203a", "#9fc3e8")),
    ("wiley", Livery("#1d3f8f", "#0f2255", "#5fb0e5")),
    ("actex", Livery("#7a1f2b", "#45101a", "#e2b04a")),
    ("lightning source", Livery("#0a5a6b", "#053540", "#f4d35e")),
    ("actuarial notes", Livery("#4c1d95", "#2a1063", "#2dd4bf")),
]
DEFAULT_JACKET = Livery("#243040", "#131a24", "#93a4bb")

ORDINALS = {1: "st", 2: "nd", 3: "rd"}


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
        value = km.group(2).strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
            value = value[1:-1]
        attrs[km.group(1).strip()] = value.strip()
    return attrs, raw[m.end():]


def ordinal_edition(edition: str) -> str | None:
    """`4e`, `5th`, `12e` → `4th Edition`. Anything wordier is not an edition."""
    m = re.fullmatch(r"(\d+)\s*(?:e|st|nd|rd|th)?", edition.strip(), re.I)
    if not m:
        return None
    n = int(m.group(1))
    # 11th/12th/13th break the last-digit rule.
    suffix = "th" if n % 100 in (11, 12, 13) else ORDINALS.get(n % 10, "th")
    return f"{n}{suffix} Edition"


def jacket_for(publisher: str, author: str) -> Livery:
    hay = f"{publisher} {author}".lower()
    for needle, livery in JACKETS:
        if needle in hay:
            return livery
    return DEFAULT_JACKET


def split_title(title: str, code: str, type_: str) -> str:
    """Drop from the title what the subtitle and badge already say."""
    out = title.strip()
    if code:
        out = re.sub(rf"^{re.escape(code)}\s*[—–:-]\s*", "", out)
    if type_:
        out = re.sub(rf"\s*[—–]\s*{re.escape(type_)}$", "", out, flags=re.I)
    return out.strip()


def badge_for(type_: str, edition: str) -> str:
    """The line of small caps above the imprint: what kind of document this is."""
    if type_:
        return type_
    # The CAS study notes carry their kind in the Edition field
    # ("Study Note (Oct 2014, rev. Sep 2015)") because they have no other.
    m = re.match(r"^(Study Note|Monograph|Syllabus Reading)\b", edition, re.I)
    return m.group(1) if m else ""


# ── drawing ──────────────────────────────────────────────────────────────────
def draw(attrs: dict[str, str]) -> str:
    title_raw = attrs.get("Title", "")
    author = attrs.get("Authors") or attrs.get("Author") or ""
    publisher = attrs.get("Publisher", "")
    year = attrs.get("Year", "")
    edition = attrs.get("Edition", "")
    code = attrs.get("Code", "")
    type_ = attrs.get("Type", "")

    title = split_title(title_raw, code, type_)
    badge = badge_for(type_, edition)
    subtitle = " · ".join(x for x in (code, ordinal_edition(edition), year) if x)
    # The standards name the same body twice; the imprint at the foot says it.
    byline = "" if author.strip().lower() == publisher.strip().lower() else author
    imprint = publisher or author

    lv = jacket_for(publisher, author)
    alt = " — ".join(x for x in (title, byline or publisher, year) if x)
    c = Cover(lv, f"Cover of {alt}" if alt else "Cover")

    # Field, then the light that falls on the upper half of a jacket.
    c.rect(0, 0, W, H, "url(#field)")
    c.rect(0, 0, W, H, "url(#glow)")
    # Spine: a strip of shadow down the binding edge, closed by an accent rule.
    c.rect(0, 0, 17, H, "#000000", 0.20)
    c.line(17.5, 0, 17.5, H, lv.accent, 1.5, 0.55)
    # Head and tail bands.
    c.rect(0, 0, W, 9, lv.accent)
    c.rect(0, H - 9, W, 9, lv.accent)
    # The hairline an academic jacket is usually ruled with.
    c.frame(38, 30, W - 76, H - 88, lv.ink, 1, 0.22)

    inner = W - 76 - 34  # frame width less its own padding
    cx = 38 + (W - 76) / 2

    # A two-part title is set the way a jacket sets it — the main title large,
    # what follows the colon smaller underneath. Run on, "Nonlife Actuarial
    # Models: Theory, Methods and Evaluation" is one undifferentiated block.
    main, _, sub = title.partition(": ")
    size, rows = fit(main, [31, 28, 25, 22, 20, 18], inner, 5, bold=True)
    leading = size * 1.2
    sub_size = max(13.5, round(size * 0.58, 1))
    sub_rows = balance(sub, sub_size, inner) if sub else []
    sub_leading = sub_size * 1.28

    block = len(rows) * leading
    if sub_rows:
        block += 10 + len(sub_rows) * sub_leading
    # The title block sits on the upper third, as the covers already in the
    # vault do; it grows downward from there rather than off the head band.
    y = max(74, 176 - block / 2)
    y = c.lines(cx, y, rows, size, leading,
                family=SERIF, weight="bold", fill=lv.ink)
    if sub_rows:
        y = c.lines(cx, y + 10, sub_rows, sub_size, sub_leading,
                    family=SERIF, fill=lv.ink, opacity=0.85)

    if subtitle:
        y += 6
        c.text(cx, y, subtitle, 13.5, fill=lv.dim, opacity=0.92)
        y += 13.5

    y += 30
    c.line(cx - 130, y, cx + 130, y, lv.accent, 2, 0.9)

    if byline:
        y += 26
        bsize, brows = fit(byline, [14, 13, 12], inner, 3, bold=True)
        c.lines(cx, y, brows, bsize, bsize * 1.35, weight="bold", fill=lv.ink)
        y += bsize * 1.35 * len(brows)

    # A small ornament so the lower half is not a blank field — three rules
    # stepping in, the way a title page is usually closed off.
    oy = 430
    if y < oy - 24:
        for i, half in enumerate((44, 28, 14)):
            c.line(cx - half, oy + i * 7, cx + half, oy + i * 7,
                   lv.accent, 1.5, 0.75 - i * 0.2)

    if badge:
        c.text(cx, 505, badge.upper(), 9.5, fill=lv.accent,
               weight="bold", spacing=1.6, opacity=0.95)
    if imprint:
        isize = 13 if text_width(imprint, 13) <= inner else 11
        c.text(cx, 535, imprint, isize, fill=lv.dim, opacity=0.9)

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
