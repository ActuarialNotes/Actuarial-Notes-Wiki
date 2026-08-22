"""Flat geometric compositions for cover variant C.

Variant B draws the subject as a line chart; this draws the same idea as solid
shapes cropped by the colour band — the hump of a density, the staircase of a
loss triangle, the climb of a compounding curve. Two constants run through every
one of them (an outline ring at the left, a full-width stripe) so the shelf still
reads as one series.
"""
from __future__ import annotations

import math

from proto_kit import _n

WHITE = "#ffffff"


def _base(c, w, h):
    c.circle(66, h * 0.56, 58, fill="none", stroke=WHITE, width=10, opacity=0.15)
    c.rect(0, h * 0.79, w, 5, WHITE, opacity=0.20)


def _disc(c, cx, cy, r, fill, opacity=1.0):
    c.circle(cx, cy, r, fill=fill, opacity=opacity)


def bell(c, w, h, accent):
    """A density: the silhouette of the curve, sitting on the band's baseline."""
    _base(c, w, h)
    base = h * 0.79
    left, right = 150, 400
    pts = []
    for i in range(49):
        t = i / 48
        z = (t - 0.5) * 6.2
        pts.append((left + t * (right - left),
                    base - math.exp(-z * z / 2) * (base - 26)))
    d = (f"M {_n(left)} {_n(base)} L "
         + " L ".join(f"{_n(x)} {_n(y)}" for x, y in pts)
         + f" L {_n(right)} {_n(base)} Z")
    c.path(d, fill=accent)
    # The tail, cut out lighter — the half of a distribution an exam asks about.
    cut = [p for p in pts if p[0] >= left + (right - left) * 0.72]
    c.path(f"M {_n(cut[0][0])} {_n(base)} L "
           + " L ".join(f"{_n(x)} {_n(y)}" for x, y in cut)
           + f" L {_n(cut[-1][0])} {_n(base)} Z", fill=WHITE, opacity=0.3)
    _disc(c, 176, 96, 44, WHITE, 0.13)


def regression(c, w, h, accent):
    """A trend: one bold diagonal and the points it was fitted through."""
    _base(c, w, h)
    c.path(f'M 128 {_n(h * 0.86)} L 380 34 L 400 66 L 152 {_n(h * 0.98)} Z',
           fill=accent)
    for fx, fy in ((0.42, 0.72), (0.58, 0.44), (0.74, 0.52), (0.88, 0.24)):
        _disc(c, fx * w, fy * h, 13, WHITE, 0.85)
    _disc(c, 300, 62, 40, WHITE, 0.13)


def triangle(c, w, h, accent):
    """A development triangle: the staircase, stepping down to the right."""
    _base(c, w, h)
    bar = 34
    gap = 9
    for i in range(5):
        x = 168 + i * (bar + gap)
        top = 30 + i * 30
        c.rect(x, top, bar, h - top, accent, rx=4,
               opacity=1.0 if i % 2 == 0 else 0.66)
    _disc(c, 150, 78, 40, WHITE, 0.13)


def wave(c, w, h, accent):
    """A series: one thick band oscillating clean across the block."""
    _base(c, w, h)
    pts_top, pts_bot = [], []
    band = 26
    for i in range(65):
        t = i / 64
        x = 96 + t * (w - 60)
        y = h * 0.52 - math.sin(t * 7.4) * h * 0.20
        pts_top.append((x, y - band / 2))
        pts_bot.append((x, y + band / 2))
    d = ("M " + " L ".join(f"{_n(x)} {_n(y)}" for x, y in pts_top)
         + " L " + " L ".join(f"{_n(x)} {_n(y)}" for x, y in reversed(pts_bot)) + " Z")
    c.path(d, fill=accent)
    _disc(c, 330, 62, 40, WHITE, 0.13)


def survival(c, w, h, accent):
    """A survival function: a quarter disc falling away to the right."""
    _base(c, w, h)
    r = 150
    cx, cy = 176, h * 0.79
    c.path(f'M {_n(cx)} {_n(cy - r)} A {r} {r} 0 0 1 {_n(cx + r)} {_n(cy)} '
           f'L {_n(cx)} {_n(cy)} Z', fill=accent)
    c.rect(cx + r + 16, h * 0.52, 62, h * 0.27, WHITE, opacity=0.18, rx=4)
    _disc(c, 344, 58, 36, WHITE, 0.13)


def jumps(c, w, h, accent):
    """Arrivals: bars stepping up, one disc per jump."""
    _base(c, w, h)
    bar = 26
    for i, k in enumerate((0.30, 0.46, 0.58, 0.74, 0.92)):
        x = 150 + i * (bar + 18)
        c.rect(x, h * 0.79 - h * k * 0.78, bar, h * k * 0.78, accent, rx=4,
               opacity=1.0 if i % 2 else 0.72)
        _disc(c, x + bar / 2, h * 0.79 - h * k * 0.78 - 16, 7, WHITE, 0.7)
    _disc(c, 108, 62, 34, WHITE, 0.13)


def compound(c, w, h, accent):
    """Growth: a quarter disc sweeping up out of the corner."""
    _base(c, w, h)
    r = 196
    cx, cy = 150, h * 0.79
    c.path(f'M {_n(cx)} {_n(cy)} L {_n(cx + r)} {_n(cy)} '
           f'A {r} {r} 0 0 0 {_n(cx)} {_n(cy - r)} Z', fill=accent)
    for i in range(3):
        c.circle(cx, cy, r * (1.10 + i * 0.16), fill="none", stroke=WHITE,
                 width=3, opacity=0.16)
    _disc(c, 348, 56, 32, WHITE, 0.14)


def shield(c, w, h, accent):
    """A standard of practice: the shield, solid, with its tick cut out."""
    _base(c, w, h)
    cx, cy, r = 292, h * 0.50, 104
    c.path(f'M {_n(cx)} {_n(cy - r * 0.92)} '
           f'L {_n(cx + r * 0.72)} {_n(cy - r * 0.48)} '
           f'L {_n(cx + r * 0.72)} {_n(cy + r * 0.22)} '
           f'Q {_n(cx + r * 0.72)} {_n(cy + r * 0.76)} {_n(cx)} {_n(cy + r * 0.96)} '
           f'Q {_n(cx - r * 0.72)} {_n(cy + r * 0.76)} {_n(cx - r * 0.72)} {_n(cy + r * 0.22)} '
           f'L {_n(cx - r * 0.72)} {_n(cy - r * 0.48)} Z', fill=accent)
    c.path(f'M {_n(cx - r * 0.34)} {_n(cy + r * 0.02)} '
           f'L {_n(cx - r * 0.06)} {_n(cy + r * 0.32)} '
           f'L {_n(cx + r * 0.38)} {_n(cy - r * 0.34)}',
           stroke=WHITE, width=13, opacity=0.9)
    _disc(c, 162, 92, 40, WHITE, 0.13)


def grid(c, w, h, accent):
    """No single picture fits: a lattice, and one disc to anchor it."""
    _base(c, w, h)
    _disc(c, 316, 78, 92, accent)
    for r in range(4):
        for col in range(7):
            _disc(c, 132 + col * 34, 44 + r * 40, 6.5, WHITE, 0.30)


FLAT_MOTIFS = {
    "bell": bell, "regression": regression, "wave": wave, "survival": survival,
    "jumps": jumps, "compound": compound, "triangle": triangle,
    "shield": shield, "grid": grid,
}
