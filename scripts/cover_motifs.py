"""The nine subject drawings that fill a cover's colour band.

`generate_resource_covers.py` picks one from the page's title and draws it as
solid shapes cut out of the band: the hump of a density, the staircase of a loss
triangle, the climb of a compounding curve. It is what makes a shelf of jackets
scannable — at the 64–112 px the metadata card renders them, the picture is
legible long before the title is.

Two constants run through every one of them — an outline ring at the left and a
full-width stripe near the band's foot — so nine different drawings still read
as one series.

Each function takes the `Cover`, the band's width and height, and the
publisher's accent, and draws in the band's own coordinates. Nothing here knows
about the type below it.
"""

from __future__ import annotations

import math

from cover_kit import n

WHITE = "#ffffff"


def _frame(c, w, h) -> None:
    """The two marks every subject shares."""
    c.circle(66, h * 0.56, 58, fill="none", stroke=WHITE, width=10, opacity=0.15)
    c.rect(0, h * 0.79, w, 5, WHITE, opacity=0.20)


def _disc(c, cx, cy, r, fill, opacity=None) -> None:
    c.circle(cx, cy, r, fill=fill, opacity=opacity)


def _area(pts, base: float) -> str:
    return (f"M {n(pts[0][0])} {n(base)} L "
            + " L ".join(f"{n(x)} {n(y)}" for x, y in pts)
            + f" L {n(pts[-1][0])} {n(base)} Z")


def bell(c, w, h, accent) -> None:
    """Probability: the density, sitting on the band's own baseline."""
    _frame(c, w, h)
    base = h * 0.79
    left, right = 150, 400
    pts = []
    for i in range(49):
        t = i / 48
        z = (t - 0.5) * 6.2
        pts.append((left + t * (right - left),
                    base - math.exp(-z * z / 2) * (base - 26)))
    c.path(_area(pts, base), fill=accent)
    # The tail, cut lighter — the half of a distribution an exam asks about.
    tail = [p for p in pts if p[0] >= left + (right - left) * 0.72]
    c.path(_area(tail, base), fill=WHITE, opacity=0.3)
    _disc(c, 176, 96, 44, WHITE, 0.13)


def regression(c, w, h, accent) -> None:
    """Statistical models: one bold trend and the points it was fitted through."""
    _frame(c, w, h)
    c.path(f"M 128 {n(h * 0.86)} L 380 34 L 400 66 L 152 {n(h * 0.98)} Z",
           fill=accent)
    for fx, fy in ((0.42, 0.72), (0.58, 0.44), (0.74, 0.52), (0.88, 0.24)):
        _disc(c, fx * w, fy * h, 13, WHITE, 0.85)
    _disc(c, 300, 62, 40, WHITE, 0.13)


def triangle(c, w, h, accent) -> None:
    """Ratemaking and reserving: the development triangle, stepping down."""
    _frame(c, w, h)
    bar, gap = 34, 9
    for i in range(5):
        x = 168 + i * (bar + gap)
        top = 30 + i * 30
        c.rect(x, top, bar, h - top, accent, rx=4,
               opacity=None if i % 2 == 0 else 0.66)
    _disc(c, 150, 78, 40, WHITE, 0.13)


def wave(c, w, h, accent) -> None:
    """Time series: one thick band oscillating clean across the block."""
    _frame(c, w, h)
    band = 26
    top, bottom = [], []
    for i in range(65):
        t = i / 64
        x = 96 + t * (w - 60)
        y = h * 0.52 - math.sin(t * 7.4) * h * 0.20
        top.append((x, y - band / 2))
        bottom.append((x, y + band / 2))
    c.path("M " + " L ".join(f"{n(x)} {n(y)}" for x, y in top)
           + " L " + " L ".join(f"{n(x)} {n(y)}" for x, y in reversed(bottom))
           + " Z", fill=accent)
    _disc(c, 330, 62, 40, WHITE, 0.13)


def survival(c, w, h, accent) -> None:
    """Life contingencies: a quarter disc falling away to the right."""
    _frame(c, w, h)
    r = 150
    cx, cy = 176, h * 0.79
    c.path(f"M {n(cx)} {n(cy - r)} A {r} {r} 0 0 1 {n(cx + r)} {n(cy)} "
           f"L {n(cx)} {n(cy)} Z", fill=accent)
    c.rect(cx + r + 16, h * 0.52, 62, h * 0.27, WHITE, opacity=0.18, rx=4)
    _disc(c, 344, 58, 36, WHITE, 0.13)


def arrivals(c, w, h, accent) -> None:
    """Poisson processes: bars stepping up, one mark per arrival."""
    _frame(c, w, h)
    bar = 26
    for i, k in enumerate((0.30, 0.46, 0.58, 0.74, 0.92)):
        x = 150 + i * (bar + 18)
        top = h * 0.79 - h * k * 0.78
        c.rect(x, top, bar, h * k * 0.78, accent, rx=4,
               opacity=None if i % 2 else 0.72)
        _disc(c, x + bar / 2, top - 16, 7, WHITE, 0.7)
    _disc(c, 108, 62, 34, WHITE, 0.13)


def compounding(c, w, h, accent) -> None:
    """Interest theory: a quarter disc sweeping up out of the corner."""
    _frame(c, w, h)
    r = 196
    cx, cy = 150, h * 0.79
    c.path(f"M {n(cx)} {n(cy)} L {n(cx + r)} {n(cy)} "
           f"A {r} {r} 0 0 0 {n(cx)} {n(cy - r)} Z", fill=accent)
    for i in range(3):
        c.circle(cx, cy, r * (1.10 + i * 0.16), fill="none", stroke=WHITE,
                 width=3, opacity=0.16)
    _disc(c, 348, 56, 32, WHITE, 0.14)


def shield(c, w, h, accent) -> None:
    """A standard of practice: the shield, with its tick cut out."""
    _frame(c, w, h)
    cx, cy, r = 292, h * 0.50, 104
    c.path(f"M {n(cx)} {n(cy - r * 0.92)} "
           f"L {n(cx + r * 0.72)} {n(cy - r * 0.48)} "
           f"L {n(cx + r * 0.72)} {n(cy + r * 0.22)} "
           f"Q {n(cx + r * 0.72)} {n(cy + r * 0.76)} {n(cx)} {n(cy + r * 0.96)} "
           f"Q {n(cx - r * 0.72)} {n(cy + r * 0.76)} {n(cx - r * 0.72)} {n(cy + r * 0.22)} "
           f"L {n(cx - r * 0.72)} {n(cy - r * 0.48)} Z", fill=accent)
    c.path(f"M {n(cx - r * 0.34)} {n(cy + r * 0.02)} "
           f"L {n(cx - r * 0.06)} {n(cy + r * 0.32)} "
           f"L {n(cx + r * 0.38)} {n(cy - r * 0.34)}",
           stroke=WHITE, width=13, opacity=0.9)
    _disc(c, 162, 92, 40, WHITE, 0.13)


def lattice(c, w, h, accent) -> None:
    """No single picture fits: a grid of points, and one disc to anchor it."""
    _frame(c, w, h)
    _disc(c, 316, 78, 92, accent)
    for row in range(4):
        for col in range(7):
            _disc(c, 132 + col * 34, 44 + row * 40, 6.5, WHITE, 0.30)


MOTIFS = {
    "bell": bell,
    "regression": regression,
    "triangle": triangle,
    "wave": wave,
    "survival": survival,
    "arrivals": arrivals,
    "compounding": compounding,
    "shield": shield,
    "lattice": lattice,
}
