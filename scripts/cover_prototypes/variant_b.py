"""Variant B — "Motif".

A near-black field with a large line drawing of what the source is *about*: the
density and its tail, the loss triangle, the scatter and its fit, the
compounding curve. The picture is what a reader recognises at thumbnail size,
so two sources on the same shelf never read as the same dark rectangle.
"""
from __future__ import annotations

from proto_kit import (H, SANS, W, Canvas, Meta, balance, darken, fit,
                       lighten, mix, text_width)
from palettes import livery_for
from motifs import MOTIFS

PAD = 32
MEASURE = W - PAD * 2
HEAD = 60            # the rule under the kicker row
FOOT = H - 40        # baseline of the imprint line


def draw(m: Meta) -> str:
    lv = livery_for(m.publisher, m.byline)
    field = mix(lv.deep, "#05070c", 0.45)
    ink = "#ffffff"
    alt = " — ".join(x for x in (m.title, m.byline or m.publisher, m.year) if x)
    c = Canvas(f"Cover of {alt}" if alt else "Cover")

    c.d(f'<linearGradient id="{c.gid("f")}" x1="0" y1="0" x2="0.4" y2="1">'
        f'<stop offset="0" stop-color="{lighten(lv.deep, 0.06)}"/>'
        f'<stop offset="1" stop-color="{field}"/></linearGradient>')
    c.d(f'<radialGradient id="{c.gid("halo")}" cx="0.5" cy="0.32" r="0.62">'
        f'<stop offset="0" stop-color="{lv.base}" stop-opacity="0.55"/>'
        f'<stop offset="1" stop-color="{lv.base}" stop-opacity="0"/>'
        f'</radialGradient>')
    c.d(f'<pattern id="{c.gid("rule")}" width="20" height="20" '
        'patternUnits="userSpaceOnUse">'
        f'<path d="M 20 0 L 0 0 0 20" fill="none" stroke="{ink}" '
        'stroke-width="0.6" opacity="0.055"/></pattern>')

    c.rect(0, 0, W, H, c.url("f"))
    c.rect(0, 0, W, H, c.url("halo"))

    # ── the header row ───────────────────────────────────────────────────────
    kicker = m.kicker.upper()
    facts = " · ".join(f for f in (m.code, m.edition, m.year) if f)
    # One line, two labels. "ACTUARIAL STANDARD OF PRACTICE" plus
    # "ASOP No. 43 · 2007" does not fit in 336 px and the two would overprint
    # rather than truncate, so when they collide the facts drop to the foot,
    # beside the imprint, where there is always room.
    room = MEASURE - text_width(kicker, 10, bold=True, tracking=1.8) - 16
    head_facts = bool(facts) and text_width(facts, 10, tracking=1.1) <= room

    # ── measure the text block before drawing anything ───────────────────────
    # The drawing takes whatever height the words leave, so a four-line title
    # and a one-line title both close up against the motif instead of leaving a
    # different-sized hole under it.
    tsize, trows = fit(m.title, [38, 34, 30, 27, 24, 21], MEASURE, 4, bold=True)
    tlead = tsize * 1.08
    ssize, srows = 14, (balance(m.subtitle, 14, MEASURE) if m.subtitle else [])
    bsize, brows = (fit(m.byline, [14.5, 13.5, 12.5], MEASURE, 2, bold=True)
                    if m.byline else (0, []))

    y = FOOT
    if m.publisher or (facts and not head_facts):
        y -= 26
    if brows:
        y -= (len(brows) - 1) * bsize * 1.3 + 24
    if srows:
        y -= (len(srows) - 1) * ssize * 1.28 + 22
    title_top = y - (len(trows) - 1) * tlead - tsize

    # ── the drawing ──────────────────────────────────────────────────────────
    box_top = HEAD + 32
    box_h = max(120, title_top - box_top - 26)
    c.rect(0, 0, W, box_top + box_h + 14, c.url("rule"))
    MOTIFS[m.subject](c, PAD + 14, box_top, W - (PAD + 14) * 2, box_h,
                      lv.accent, ink)

    c.text(PAD, 46, kicker, 10, weight="700", tracking=1.8, fill=lv.accent)
    if head_facts:
        c.text(W - PAD, 46, facts, 10, weight="600", tracking=1.1, fill=ink,
               anchor="end", opacity=0.5)
    c.line(PAD, HEAD, W - PAD, HEAD, ink, 1, 0.16)

    # ── the words, laid out upward from the foot ─────────────────────────────
    y = FOOT
    if m.publisher:
        c.text(PAD, y, m.publisher.upper(), 9.5, weight="600", tracking=1.5,
               fill=ink, opacity=0.45)
    if facts and not head_facts:
        c.text(W - PAD, y, facts, 9.5, weight="600", tracking=1.1, fill=ink,
               anchor="end", opacity=0.45)
    if m.publisher or (facts and not head_facts):
        y -= 26
    if brows:
        y -= (len(brows) - 1) * bsize * 1.3
        c.lines(PAD, y, brows, bsize, bsize * 1.3, weight="600", fill=lv.accent)
        y -= 24
    if srows:
        y -= (len(srows) - 1) * ssize * 1.28
        c.lines(PAD, y, srows, ssize, ssize * 1.28, fill=ink, opacity=0.62)
        y -= 22
    y -= (len(trows) - 1) * tlead
    c.lines(PAD, y, trows, tsize, tlead, weight="700", fill=ink)

    c.rect(0, H - 6, W, 6, lv.accent)
    return c.render()
