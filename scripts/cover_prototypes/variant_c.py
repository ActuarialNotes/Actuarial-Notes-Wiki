"""Variant C — "Paper".

Two-tone: a saturated block of house colour across the top carrying a cropped
geometric composition, then bright paper below with the title set large in
black. On the app's dark canvas a shelf of these reads as a row of lit objects
rather than more dark rectangles — the opposite bet from A and B.
"""
from __future__ import annotations

from proto_kit import (SANS, H, W, Canvas, Meta, balance, darken, fit,
                       lighten, mix, text_width)
from palettes import livery_for
from flat_motifs import FLAT_MOTIFS

PAD = 30
MEASURE = W - PAD * 2
BLOCK = 236          # where the colour band ends
PAPER = "#f6f5f1"
GRAPHITE = "#14161a"


def draw(m: Meta) -> str:
    lv = livery_for(m.publisher, m.byline)
    alt = " — ".join(x for x in (m.title, m.byline or m.publisher, m.year) if x)
    c = Canvas(f"Cover of {alt}" if alt else "Cover")

    c.d(f'<linearGradient id="{c.gid("band")}" x1="0" y1="0" x2="0.8" y2="1">'
        f'<stop offset="0" stop-color="{lighten(lv.base, 0.14)}"/>'
        f'<stop offset="1" stop-color="{darken(lv.base, 0.22)}"/></linearGradient>')
    c.d(f'<linearGradient id="{c.gid("paper")}" x1="0" y1="0" x2="0" y2="1">'
        f'<stop offset="0" stop-color="#fbfaf7"/>'
        f'<stop offset="1" stop-color="{PAPER}"/></linearGradient>')
    c.d(f'<clipPath id="{c.gid("topclip")}">'
        f'<rect x="0" y="0" width="{W}" height="{BLOCK}"/></clipPath>')

    c.rect(0, 0, W, H, c.url("paper"))
    c.raw(f'<g clip-path="{c.url("topclip")}">')
    c.rect(0, 0, W, BLOCK, c.url("band"))
    # The subject, cut out of the band as flat shapes — the hump of a density,
    # the staircase of a loss triangle, the climb of a compounding curve.
    FLAT_MOTIFS[m.subject](c, W, BLOCK, lv.accent)
    c.raw('</g>')
    c.rect(0, BLOCK - 6, W, 6, lv.accent)

    c.text(PAD, 52, m.kicker.upper(), 10.5, weight="700", tracking=1.9,
           fill="#ffffff", opacity=0.92)

    # The words are centred in the paper area rather than hung from the band:
    # a two-word title otherwise leaves 200 px of blank paper at the foot, which
    # reads as a layout that ran out rather than as white space.
    size, rows = fit(m.title, [40, 36, 32, 28, 25, 22, 20], MEASURE, 5, bold=True)
    leading = size * 1.06
    srows = balance(m.subtitle, max(14.0, round(size * 0.40, 1)), MEASURE) \
        if m.subtitle else []
    ssize = max(14.0, round(size * 0.40, 1))
    bsize, brows = (fit(m.byline, [15, 14, 13], MEASURE, 2, bold=True)
                    if m.byline else (0, []))

    block = (len(rows) - 1) * leading + size
    if srows:
        block += ssize + 12 + (len(srows) - 1) * ssize * 1.3
    if brows:
        block += 34 + (len(brows) - 1) * bsize * 1.3 + bsize
    top = BLOCK + (H - 58 - BLOCK - block) / 2
    y = c.lines(PAD, top + size, rows, size, leading, weight="700", fill=GRAPHITE)

    if srows:
        y = c.lines(PAD, y + ssize + 12, srows, ssize, ssize * 1.3,
                    fill=mix(GRAPHITE, PAPER, 0.42))
    if brows:
        c.lines(PAD, y + 34, brows, bsize, bsize * 1.3, weight="600",
                fill=darken(lv.base, 0.10))

    # Foot: a hairline, then the citation facts.
    c.line(PAD, H - 58, W - PAD, H - 58, GRAPHITE, 1, 0.14)
    if m.publisher:
        c.text(PAD, H - 36, m.publisher.upper(), 9.5, weight="700", tracking=1.5,
               fill=mix(GRAPHITE, PAPER, 0.45))
    facts = " · ".join(f for f in (m.code, m.edition, m.year) if f)
    if facts:
        c.text(W - PAD, H - 36, facts, 9.5, weight="600", tracking=1.1,
               fill=mix(GRAPHITE, PAPER, 0.45), anchor="end")

    return c.render()
