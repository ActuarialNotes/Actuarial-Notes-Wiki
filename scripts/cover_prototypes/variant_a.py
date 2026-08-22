"""Variant A — "Poster".

A saturated mesh-gradient field, oversized flush-left type at the head, the
citation at the foot, nothing in between but light. Built to survive being
64 px wide: at that size only the colour and the first two words of the title
are legible, so those are what the design spends everything on.
"""
from __future__ import annotations

from proto_kit import (H, SANS, W, Canvas, Meta, balance, darken, fit,
                       lighten, mix, text_width)
from palettes import livery_for

PAD = 38
MEASURE = W - PAD * 2


def draw(m: Meta) -> str:
    lv = livery_for(m.publisher, m.byline)
    alt = " — ".join(x for x in (m.title, m.byline or m.publisher, m.year) if x)
    c = Canvas(f"Cover of {alt}" if alt else "Cover")

    # Three overlaid gradients, which is what makes the field read as lit rather
    # than as a flat swatch: the base ramp, a hot accent bloom off the top-right
    # corner, and a cool one climbing out of the bottom-left.
    c.d(f'<linearGradient id="{c.gid("f")}" x1="0" y1="0" x2="0.55" y2="1">'
        f'<stop offset="0" stop-color="{lighten(lv.base, 0.06)}"/>'
        f'<stop offset="0.5" stop-color="{lv.base}"/>'
        f'<stop offset="1" stop-color="{lv.deep}"/></linearGradient>')
    c.d(f'<radialGradient id="{c.gid("hot")}" cx="0.86" cy="0.06" r="0.9">'
        f'<stop offset="0" stop-color="{lv.accent}" stop-opacity="0.55"/>'
        f'<stop offset="0.45" stop-color="{lv.accent}" stop-opacity="0.14"/>'
        f'<stop offset="1" stop-color="{lv.accent}" stop-opacity="0"/>'
        f'</radialGradient>')
    c.d(f'<radialGradient id="{c.gid("cool")}" cx="0.04" cy="0.98" r="0.85">'
        f'<stop offset="0" stop-color="{lighten(lv.base, 0.45)}" stop-opacity="0.42"/>'
        f'<stop offset="1" stop-color="{lighten(lv.base, 0.45)}" stop-opacity="0"/>'
        f'</radialGradient>')
    c.d(f'<filter id="{c.gid("grain")}"><feTurbulence type="fractalNoise" '
        'baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>'
        '<feColorMatrix type="saturate" values="0"/></filter>')

    c.rect(0, 0, W, H, c.url("f"))
    c.rect(0, 0, W, H, c.url("cool"))
    c.rect(0, 0, W, H, c.url("hot"))

    # Concentric rings, centred off the lower-right corner and cropped by it.
    # They give the lower half a subject and a sense of scale.
    for r, op, wdt in ((92, 0.30, 2.2), (150, 0.20, 1.8), (212, 0.13, 1.6),
                       (280, 0.08, 1.4)):
        c.circle(372, 452, r, stroke="#ffffff", width=wdt, opacity=op)
    c.circle(372, 452, 92, fill="#ffffff", opacity=0.06)

    c.rect(0, 0, W, H, "#ffffff", opacity=0.05, filter=c.url("grain"),
           style="mix-blend-mode:overlay")

    # The one place the house colour runs at full strength.
    c.rect(0, 0, 8, H, lv.accent)

    x = PAD

    c.line(x, 54, x + 22, 54, lv.accent, 2.6, cap="round")
    c.text(x + 32, 58, m.kicker.upper(), 10.5, weight="700", tracking=1.7,
           fill=lv.accent)

    size, rows = fit(m.title, [46, 41, 36, 32, 28, 25, 22], MEASURE, 5, bold=True)
    leading = size * 1.03
    y = 112 + size
    y = c.lines(x, y, rows, size, leading, weight="700", fill="#ffffff")

    if m.subtitle:
        ssize = max(15.0, round(size * 0.42, 1))
        srows = balance(m.subtitle, ssize, MEASURE)
        y = c.lines(x, y + ssize + 16, srows, ssize, ssize * 1.3,
                    fill="#ffffff", opacity=0.72)

    # Foot, laid out upward from the baseline so a three-line title never
    # pushes into it.
    foot = H - 44
    facts = " · ".join(f for f in (m.code, m.edition, m.year, m.publisher) if f)
    if facts:
        fsize = 11 if text_width(facts, 11, tracking=1.0) <= MEASURE else 9.5
        c.text(x, foot + 21, facts, fsize, weight="600", tracking=1.0,
               fill="#ffffff", opacity=0.6)
    if m.byline:
        bsize, brows = fit(m.byline, [18, 16, 14.5], MEASURE, 2, bold=True)
        c.lines(x, foot - (len(brows) - 1) * bsize * 1.25, brows, bsize,
                bsize * 1.25, weight="700", fill="#ffffff")
        c.line(x, foot - 44 - (len(brows) - 1) * bsize * 1.25, x + 36,
               foot - 44 - (len(brows) - 1) * bsize * 1.25, lv.accent, 3.5,
               cap="round")

    return c.render()
