"""Subject motifs for cover variant B.

One line drawing per family of source material, picked from the title by
`proto_kit.subject_for`. Each takes the canvas and a box and draws inside it in
`accent` over `ink`; nothing here knows about layout.
"""
from __future__ import annotations

import math

from proto_kit import _n


def _poly(pts):
    return " ".join(f"{_n(x)},{_n(y)}" for x, y in pts)


def _curve(c, pts, stroke, width=2.6, opacity=1.0):
    c.raw(f'<polyline points="{_poly(pts)}" fill="none" stroke="{stroke}" '
          f'stroke-width="{_n(width)}" stroke-linecap="round" '
          f'stroke-linejoin="round" opacity="{opacity}"/>')


def _area(c, pts, y0, fill, opacity):
    d = f'M {_n(pts[0][0])} {_n(y0)} L ' + ' L '.join(
        f'{_n(x)} {_n(y)}' for x, y in pts) + f' L {_n(pts[-1][0])} {_n(y0)} Z'
    c.path(d, fill=fill, opacity=opacity)


def _axes(c, bx, by, bw, bh, ink):
    c.line(bx, by + bh, bx + bw, by + bh, ink, 1.4, 0.35)


def bell(c, bx, by, bw, bh, accent, ink):
    n = 64
    pts = []
    for i in range(n + 1):
        t = i / n
        x = bx + t * bw
        z = (t - 0.5) * 6.4
        y = by + bh - math.exp(-z * z / 2) * bh * 0.92
        pts.append((x, y))
    tail = [p for p in pts if p[0] >= bx + bw * 0.70]
    _area(c, pts, by + bh, accent, 0.10)
    _area(c, tail, by + bh, accent, 0.34)
    _curve(c, pts, accent, 3)
    _axes(c, bx, by, bw, bh, ink)
    c.line(bx + bw * 0.70, by + bh, bx + bw * 0.70, by + bh * 0.34, accent, 1.4, 0.6)
    c.line(bx + bw / 2, by + bh, bx + bw / 2, by + bh * 0.06, ink, 1.2, 0.28)


def regression(c, bx, by, bw, bh, accent, ink):
    pts = [(0.06, 0.80), (0.14, 0.62), (0.20, 0.74), (0.28, 0.55), (0.34, 0.63),
           (0.42, 0.44), (0.48, 0.52), (0.55, 0.33), (0.62, 0.42), (0.69, 0.26),
           (0.76, 0.33), (0.84, 0.16), (0.92, 0.24)]
    _axes(c, bx, by, bw, bh, ink)
    c.line(bx, by + bh, bx, by, ink, 1.4, 0.35)
    c.line(bx + bw * 0.04, by + bh * 0.86, bx + bw * 0.94, by + bh * 0.14,
           accent, 3, 0.95, cap="round")
    for fx, fy in pts:
        c.circle(bx + fx * bw, by + fy * bh, 5.2, fill=ink, opacity=0.9)
        c.circle(bx + fx * bw, by + fy * bh, 5.2, fill="none", stroke=accent,
                 width=1.6, opacity=0.9)


def wave(c, bx, by, bw, bh, accent, ink):
    n = 96
    pts = []
    for i in range(n + 1):
        t = i / n
        x = bx + t * bw
        v = (math.sin(t * 7.6) * 0.52 + math.sin(t * 19 + 1.2) * 0.18
             + math.sin(t * 3.1) * 0.22)
        y = by + bh / 2 - v * bh * 0.42
        pts.append((x, y))
    c.line(bx, by + bh / 2, bx + bw, by + bh / 2, ink, 1.2, 0.28)
    _curve(c, pts, accent, 3)
    for i in range(0, n + 1, 12):
        c.circle(*pts[i], 3.4, fill=accent, opacity=0.85)


def survival(c, bx, by, bw, bh, accent, ink):
    n = 60
    pts = []
    for i in range(n + 1):
        t = i / n
        x = bx + t * bw
        y = by + bh * (1 - 1 / (1 + math.exp((t - 0.58) * 9.5)))
        pts.append((x, y))
    _area(c, pts, by + bh, accent, 0.14)
    _curve(c, pts, accent, 3)
    _axes(c, bx, by, bw, bh, ink)
    c.line(bx, by + bh, bx, by, ink, 1.4, 0.35)
    c.line(bx, by + bh * 0.5, bx + bw * 0.58, by + bh * 0.5, ink, 1.2, 0.3)


def jumps(c, bx, by, bw, bh, accent, ink):
    steps = [0.0, 0.16, 0.27, 0.44, 0.58, 0.72, 0.88, 1.0]
    _axes(c, bx, by, bw, bh, ink)
    c.line(bx, by + bh, bx, by, ink, 1.4, 0.35)
    level = 0
    pts = []
    for i in range(len(steps) - 1):
        y = by + bh - (i / (len(steps) - 1)) * bh * 0.92
        pts.append((bx + steps[i] * bw, y))
        pts.append((bx + steps[i + 1] * bw, y))
        level = y
    _curve(c, pts, accent, 3)
    for i in range(1, len(steps) - 1):
        y = by + bh - (i / (len(steps) - 1)) * bh * 0.92
        c.circle(bx + steps[i] * bw, y, 3.8, fill=accent)


def compound(c, bx, by, bw, bh, accent, ink):
    n = 48
    pts = []
    for i in range(n + 1):
        t = i / n
        pts.append((bx + t * bw, by + bh - (math.exp(t * 2.35) - 1) / (math.exp(2.35) - 1) * bh * 0.94))
    _axes(c, bx, by, bw, bh, ink)
    c.line(bx, by + bh, bx, by, ink, 1.4, 0.35)
    cols = 7
    for i in range(cols):
        t = (i + 0.5) / cols
        h = (math.exp(t * 2.35) - 1) / (math.exp(2.35) - 1) * bh * 0.94
        w = bw / cols * 0.44
        c.rect(bx + t * bw - w / 2, by + bh - h, w, h, accent, opacity=0.22, rx=2)
    _area(c, pts, by + bh, accent, 0.10)
    _curve(c, pts, accent, 3)


def triangle(c, bx, by, bw, bh, accent, ink):
    rows = 6
    gap = 5.5
    cell = min((bw - gap * (rows - 1)) / rows, (bh - gap * (rows - 1)) / rows)
    grid_w = cell * rows + gap * (rows - 1)
    ox = bx + (bw - grid_w) / 2
    oy = by + (bh - (cell * rows + gap * (rows - 1))) / 2
    for r in range(rows):
        for col in range(rows - r):
            x = ox + col * (cell + gap)
            y = oy + r * (cell + gap)
            filled = col == rows - r - 1
            if filled:
                c.rect(x, y, cell, cell, accent, opacity=0.9, rx=2.5)
            else:
                c.rect(x, y, cell, cell, ink, opacity=0.13, rx=2.5)
                c.rect(x, y, cell, cell, "none", stroke=accent, opacity=0.35,
                       rx=2.5, stroke_width=1.2)


def shield(c, bx, by, bw, bh, accent, ink):
    cx, cy = bx + bw / 2, by + bh / 2
    r = min(bw, bh) / 2
    for k, op in ((1.0, 0.30), (0.78, 0.18), (0.56, 0.12)):
        c.circle(cx, cy, r * k, stroke=ink, width=1.4, opacity=op)
    c.path(f'M {_n(cx)} {_n(cy - r * 0.86)} '
           f'L {_n(cx + r * 0.66)} {_n(cy - r * 0.44)} '
           f'L {_n(cx + r * 0.66)} {_n(cy + r * 0.24)} '
           f'Q {_n(cx + r * 0.66)} {_n(cy + r * 0.74)} {_n(cx)} {_n(cy + r * 0.92)} '
           f'Q {_n(cx - r * 0.66)} {_n(cy + r * 0.74)} {_n(cx - r * 0.66)} {_n(cy + r * 0.24)} '
           f'L {_n(cx - r * 0.66)} {_n(cy - r * 0.44)} Z',
           stroke=accent, width=3, fill=accent, fill_opacity="0.10")
    c.line(cx - r * 0.30, cy + r * 0.02, cx - r * 0.06, cy + r * 0.28, accent, 3.4, cap="round")
    c.line(cx - r * 0.06, cy + r * 0.28, cx + r * 0.34, cy - r * 0.30, accent, 3.4, cap="round")


def grid(c, bx, by, bw, bh, accent, ink):
    cols, rows = 9, 6
    for r in range(rows):
        for col in range(cols):
            x = bx + (col + 0.5) * bw / cols
            y = by + (r + 0.5) * bh / rows
            on = (col + r) % 4 == 0
            c.circle(x, y, 3.6 if on else 2.2,
                     fill=accent if on else ink, opacity=0.9 if on else 0.28)
    c.line(bx + bw * 0.06, by + bh * 0.88, bx + bw * 0.94, by + bh * 0.12,
           accent, 2.6, 0.85, cap="round")


MOTIFS = {
    "bell": bell, "regression": regression, "wave": wave, "survival": survival,
    "jumps": jumps, "compound": compound, "triangle": triangle,
    "shield": shield, "grid": grid,
}
