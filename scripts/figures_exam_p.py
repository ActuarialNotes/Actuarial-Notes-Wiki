"""Figures for the Exam P (Probability) concept pages.

Each builder returns a `Fig` built by `vcard()`: a **portrait** card carrying a
title, one picture, and one formula — nothing else. Annotations live inside the
picture only when they are needed to read it. Grouped in syllabus order:

1. General probability — sets, events, counting, conditioning
2. Univariate random variables — PDF/CDF, moments, the two uniforms
3. Insurance applications — deductible, limit, coinsurance, inflation
4. Multivariate — joint/marginal/conditional, covariance, order statistics,
   linear combinations
"""

from __future__ import annotations

import math
from fractions import Fraction

from figure_kit import (
    AMBER, BLUE, GREEN, ROSE, SERIES, TEAL, VIOLET,
    Axes, Fig, brace, universe, venn2, vaxes, vcard,
    BX0, BY0, BX1, BY1, BCX,
    building, car, coins, cross, document, house, person, scales, shield, tower,
)
from figure_registry import figure

WID = 340   # the |NNN| every portrait embed asks for


def _npdf(x, mu=0.0, sd=1.0):
    return math.exp(-((x - mu) ** 2) / (2 * sd * sd)) / (sd * math.sqrt(2 * math.pi))


def _lognorm(x, mu=0.0, sd=0.7):
    if x <= 0:
        return 0.0
    return math.exp(-((math.log(x) - mu) ** 2) / (2 * sd * sd)) / (x * sd * math.sqrt(2 * math.pi))


def _std_normals(seed: int, n: int) -> list[tuple[float, float]]:
    """`n` independent standard-normal pairs — a scatter cloud, reproducibly.

    An LCG plus Box–Muller rather than `random`, so the same figure comes out of
    every Python build.
    """
    out = []
    for _ in range(n):
        seed = (1103515245 * seed + 12345) % 2147483648
        u1 = seed / 2147483648
        seed = (1103515245 * seed + 12345) % 2147483648
        u2 = seed / 2147483648
        r = math.sqrt(-2 * math.log(u1 + 1e-9))
        out.append((r * math.cos(2 * math.pi * u2), r * math.sin(2 * math.pi * u2)))
    return out


def _mean_density(n: int, j: int, bars: int) -> float:
    """Density of the mean of `n` iid Uniform(0,1) draws at the centre of bar `j`.

    The Irwin–Hall density, summed in exact rational arithmetic — for n = 30 the
    alternating terms run to 40-odd digits and float64 cancels away the answer.
    """
    s = Fraction(n * (2 * j + 1), 2 * bars)          # the sum, on [0, n]
    total = sum((-1) ** k * math.comb(n, k) * (s - k) ** (n - 1)
                for k in range(int(s) + 1))
    return float(total) * n / math.factorial(n - 1)


def _panel(f: Fig, px, py, pw, ph, name, colour):
    """A small titled sub-plot — used by the two "families" figures."""
    f.text(px + pw / 2, py - 6, name, cls="sm bold", fill=colour)
    f.line(px, py + ph, px + pw, py + ph, cls="axis")
    return Axes(f, px, py, px + pw, py + ph, 0, 1, 0, 1)


def _binom_pmf(n, p, k):
    return math.comb(n, k) * p ** k * (1 - p) ** (n - k)


def _gamma_pdf(x, alpha, theta):
    if x <= 0:
        return 0.0
    return math.exp((alpha - 1) * math.log(x) - x / theta
                    - math.lgamma(alpha) - alpha * math.log(theta))


def _beta_pdf(x, a, b):
    if not 0 < x < 1:
        return 0.0
    log_beta = math.lgamma(a) + math.lgamma(b) - math.lgamma(a + b)
    return math.exp((a - 1) * math.log(x) + (b - 1) * math.log(1 - x) - log_beta)


def _trial_strip(f: Fig, y, wins, size=26, gap=5, colour=BLUE, ring=()):
    """A row of Bernoulli trial boxes, filled where the trial succeeded.

    The five named discrete distributions share this strip: each of those
    figures is the mechanism (which trials happened) above the mass function it
    produces, so a reader flipping between them meets the same two-part story
    every time. `ring` outlines the trials that were drawn or that ended the
    count. Returns the box centres.
    """
    x = BCX - (len(wins) * size + (len(wins) - 1) * gap) / 2
    centres = []
    for i, win in enumerate(wins):
        f.rect(x, y, size, size, rx=5, fill=colour if win else "var(--soft)",
               fill_opacity="0.7" if win else "1",
               stroke=colour if win else "var(--edge)", stroke_width="1.2")
        if i in ring:
            f.rect(x - 4, y - 4, size + 8, size + 8, rx=8, fill="none",
                   stroke="var(--dim)", stroke_width="1.2", stroke_dasharray="3 2.5")
        centres.append(x + size / 2)
        x += size + gap
    return centres


# ═══════════════════════════════════════════════════════════════════════════
# 1. General probability
# ═══════════════════════════════════════════════════════════════════════════

@figure("Probability", "A disc cut into twelve equal slices, the equally likely "
        "outcomes, with five of them shaded as the event E", width=WID)
def probability() -> Fig:
    f = vcard()

    cx, cy, r, n = BCX, 232, 140, 12
    f.circle(cx, cy, r + 1.5, fill="none", stroke="var(--edge)", stroke_width="1.2")
    for k in range(n):
        a0, a1 = 2 * math.pi * k / n, 2 * math.pi * (k + 1) / n
        x0, y0 = cx + r * math.sin(a0), cy - r * math.cos(a0)
        x1, y1 = cx + r * math.sin(a1), cy - r * math.cos(a1)
        on = k < 5
        f.path(f"M{cx},{cy} L{x0:.2f},{y0:.2f} A{r},{r} 0 0 1 {x1:.2f},{y1:.2f} Z",
               cls="", fill=BLUE if on else "var(--soft)", fill_opacity="0.7" if on else "1",
               stroke="var(--surf)", stroke_width="3", stroke_linejoin="round")
    mid = 2 * math.pi * 2.5 / n
    f.text(cx + 0.58 * r * math.sin(mid), cy - 0.58 * r * math.cos(mid) + 7, "E",
           cls="bold")
    f.text(cx - 0.8 * r, cy - 0.8 * r, "S", cls="sm dim")
    return f


@figure("Set Function", "Three sets A, B and C inside S, each sent by an arrow to its "
        "own point on the real line", width=WID)
def set_function() -> Fig:
    f = vcard()

    universe(f, 30, 80, 180, 300, "S")
    blobs = [(120, 138, "A", BLUE, 0.80), (120, 230, "B", AMBER, 0.48),
             (120, 322, "C", GREEN, 0.18)]
    for cx, cy, lab, colour, _ in blobs:
        f.ellipse(cx, cy, 62, 30, fill=colour, fill_opacity="0.16", stroke=colour,
                  stroke_width="1.4")
        f.text(cx, cy + 5, lab, cls="bold")
    f.text(196, 96, "𝓕", cls="sm dim", anchor="end")

    ax, ay0, ay1 = 268, 96, 368
    f.arrow(ax, ay1 + 10, ax, ay0 - 14, colour="var(--axis)", width=1.1)
    f.text(ax - 8, ay0 - 16, "ℝ", cls="sm dim", anchor="end")
    for cx, cy, lab, colour, v in blobs:
        y = ay1 - (ay1 - ay0) * v
        f.arrow(cx + 66, cy, ax - 10, y, colour=colour, width=1.2, dash=True)
        f.line(ax - 4, y, ax + 4, y, cls="tick")
        f.circle(ax, y, 4.5, fill=colour)
        f.text(ax + 12, y + 4, f"f({lab})", cls="sm", anchor="start")
    return f


def _p_die(f: Fig, cx, cy, s, n, colour=BLUE):
    """A die face showing `n` pips, `s` units on a side."""
    f.rect(cx - s / 2, cy - s / 2, s, s, rx=0.18 * s, fill=colour, fill_opacity="0.12",
           stroke=colour, stroke_width="1.4")
    o = 0.26 * s
    spots = {1: [(0, 0)], 2: [(-1, -1), (1, 1)], 3: [(-1, -1), (0, 0), (1, 1)],
             4: [(-1, -1), (1, -1), (-1, 1), (1, 1)],
             5: [(-1, -1), (1, -1), (0, 0), (-1, 1), (1, 1)],
             6: [(-1, -1), (1, -1), (-1, 0), (1, 0), (-1, 1), (1, 1)]}[n]
    for dx, dy in spots:
        f.circle(cx + dx * o, cy + dy * o, 0.085 * s, fill=colour)


@figure("Sample Space", "The six faces of a die laid out inside S, one for each outcome "
        "of a roll", width=WID)
def sample_space() -> Fig:
    f = vcard()

    universe(f, 30, 80, 300, 300, "S")
    for i in range(6):
        _p_die(f, 88 + (i % 3) * 92, 176 + (i // 3) * 116, 74, i + 1)
    return f


@figure("Event", "Outcomes scattered in S, four of them ringed by the event E and one "
        "alone in the simple event F", width=WID)
def event() -> Fig:
    f = vcard()

    universe(f, 30, 80, 300, 300, "S")
    f.ellipse(126, 240, 86, 104, fill=BLUE, fill_opacity="0.15", stroke=BLUE,
              stroke_width="1.6")
    f.text(126, 124, "E", cls="bold")
    f.circle(264, 156, 34, fill=VIOLET, fill_opacity="0.15", stroke=VIOLET,
             stroke_width="1.6")
    f.text(264, 110, "F", cls="bold")
    for x, y in ((98, 192), (156, 178), (108, 282), (164, 300),
                 (264, 156), (238, 256), (294, 232), (284, 336)):
        f.circle(x, y, 5, fill="var(--dim)")
    return f


@figure("Axioms of Probability", "S drawn as a unit-wide rectangle on a 0-to-1 ruler, "
        "with two disjoint events side by side whose widths add to the width of their "
        "union", width=WID)
def axioms_of_probability() -> Fig:
    f = vcard()

    x0, x1, y0, y1 = 46, 314, 104, 336
    w = x1 - x0
    e1, e2 = 0.30, 0.25
    f.rect(x0, y0, w, y1 - y0, rx=6, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    f.rect(x0, y0, w * e1, y1 - y0, fill=BLUE, fill_opacity="0.45")
    f.rect(x0 + w * e1, y0, w * e2, y1 - y0, fill=VIOLET, fill_opacity="0.45")
    f.line(x0 + w * e1, y0, x0 + w * e1, y1, cls="", stroke="var(--surf)",
           stroke_width="2")
    f.rect(x0, y0, w, y1 - y0, rx=6, fill="none", stroke="var(--edge)", stroke_width="1.2")
    f.text(x0 + w * e1 / 2, (y0 + y1) / 2 + 5, "E₁", cls="bold")
    f.text(x0 + w * (e1 + e2 / 2), (y0 + y1) / 2 + 5, "E₂", cls="bold")
    f.text(x0 + w * (1 + e1 + e2) / 2, (y0 + y1) / 2 + 5, "S", cls="bold dim")

    for x, lab in ((x0, "0"), (x1, "1")):
        f.line(x, y0 - 10, x, y0 - 2, cls="tick")
        f.text(x, y0 - 16, lab, cls="sm dim")
    brace(f, x0, x0 + w * (e1 + e2), y1 + 8, depth=10, label="E₁ ∪ E₂",
          label_cls="sm bold")
    return f


@figure("Set Theory", "One Venn diagram of A and B inside S with its four regions shaded "
        "apart: A without B, the overlap, B without A, and the outside", width=WID)
def set_theory() -> Fig:
    f = vcard()

    sx, sy, sw, sh = 26, 86, 308, 290
    f.rect(sx, sy, sw, sh, rx=8, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    f.text(sx + 13, sy + 18, "S", cls="sm dim")
    cx, cy, r, sep = BCX, 222, 92, 92
    ax, bx = cx - sep / 2, cx + sep / 2
    hh = math.sqrt(r * r - (sep / 2) ** 2)
    lens = (f"M{cx},{cy - hh:.2f} A{r},{r} 0 0 1 {cx},{cy + hh:.2f} "
            f"A{r},{r} 0 0 1 {cx},{cy - hh:.2f} Z")
    f.circle(ax, cy, r, fill=BLUE, fill_opacity="0.3", stroke="none")
    f.circle(bx, cy, r, fill=AMBER, fill_opacity="0.3", stroke="none")
    f.path(lens, cls="", fill="var(--surf)", stroke="none")
    f.path(lens, cls="", fill=VIOLET, fill_opacity="0.5", stroke="none")
    f.circle(ax, cy, r, fill="none", stroke=BLUE, stroke_width="1.6")
    f.circle(bx, cy, r, fill="none", stroke=AMBER, stroke_width="1.6")
    f.text(ax - 62, cy - 80, "A", cls="bold")
    f.text(bx + 62, cy - 80, "B", cls="bold")
    f.text(ax - 38, cy + 5, "A \\ B", cls="sm bold")
    f.text(cx, cy + 5, "A ∩ B", cls="sm bold")
    f.text(bx + 38, cy + 5, "B \\ A", cls="sm bold")
    f.text(sx + sw - 14, sy + sh - 14, "(A ∪ B)ᶜ", cls="sm bold", anchor="end")
    return f


@figure("Venn Diagram", "Two overlapping events A and B inside S, with the probability "
        "of each of the four regions written in it", width=WID)
def venn_diagram() -> Fig:
    f = vcard()

    sx, sy, sw, sh = 26, 86, 308, 290
    universe(f, sx, sy, sw, sh)
    cy = sy + sh / 2
    (ax, _), (bx, _) = venn2(f, sx + sw / 2, cy, r=86, sep=90)
    # The four regions a question can ask for, each carrying its probability.
    f.text(ax - 38, cy + 5, "0.50", cls="bold")
    f.text((ax + bx) / 2, cy + 5, "0.20", cls="bold")
    f.text(bx + 38, cy + 5, "0.20", cls="bold")
    f.text(sx + sw - 30, sy + sh - 18, "0.10", cls="bold dim")
    return f


@figure("Combinatorics", "A four-by-four grid of every ordered pick of two from A, B, C "
        "and D: the diagonal repeats a letter, and the cells above and below it mirror "
        "each other", width=WID)
def combinatorics() -> Fig:
    f = vcard()

    letters, cell = "ABCD", 60
    x0, y0 = 96, 116
    for i in range(4):
        f.text(x0 - 14, y0 + (i + 0.5) * cell + 5, letters[i], cls="bold", anchor="end")
        f.text(x0 + (i + 0.5) * cell, y0 - 12, letters[i], cls="bold")
        for j in range(4):
            colour, op = ((AMBER, "0.4") if i == j else
                          (GREEN, "0.45") if j > i else (VIOLET, "0.3"))
            f.rect(x0 + j * cell + 2, y0 + i * cell + 2, cell - 4, cell - 4, rx=6,
                   fill=colour, fill_opacity=op, stroke=colour, stroke_width="1.2")
    f.text(x0 - 30, y0 + 2 * cell + 4, "1st", cls="sm dim", anchor="end")
    f.text(x0 + 2 * cell, y0 - 34, "2nd", cls="sm dim")
    return f


def _p_pick_nodes():
    """Four objects A–D at the corners of a square; returns their centres."""
    return [(84, 134), (276, 134), (276, 326), (84, 326)]


@figure("Combination", "Four objects joined by every possible line between two of them "
        "— six lines, one for each unordered pair", width=WID)
def combination() -> Fig:
    f = vcard()

    pts, r = _p_pick_nodes(), 24
    for i in range(4):
        for j in range(i + 1, 4):
            (xa, ya), (xb, yb) = pts[i], pts[j]
            d = math.hypot(xb - xa, yb - ya)
            ux, uy = (xb - xa) / d, (yb - ya) / d
            f.line(xa + ux * (r + 4), ya + uy * (r + 4), xb - ux * (r + 4),
                   yb - uy * (r + 4), cls="", stroke=GREEN, stroke_width="3",
                   stroke_linecap="round")
    for (x, y), lab in zip(pts, "ABCD"):
        f.circle(x, y, r, fill=BLUE, fill_opacity="0.14", stroke=BLUE, stroke_width="1.5")
        f.text(x, y + 5, lab, cls="bold")
    return f


@figure("Permutation", "Four objects with a pair of opposing arrows between every two "
        "of them — twelve arrows, one for each ordered pair", width=WID)
def permutation() -> Fig:
    f = vcard()

    pts, r = _p_pick_nodes(), 24
    for i in range(4):
        for j in range(i + 1, 4):
            (xa, ya), (xb, yb) = pts[i], pts[j]
            d = math.hypot(xb - xa, yb - ya)
            ux, uy = (xb - xa) / d, (yb - ya) / d
            nx, ny = -uy * 6, ux * 6
            f.arrow(xa + ux * (r + 6) + nx, ya + uy * (r + 6) + ny,
                    xb - ux * (r + 8) + nx, yb - uy * (r + 8) + ny, colour=BLUE, width=2)
            f.arrow(xb - ux * (r + 6) - nx, yb - uy * (r + 6) - ny,
                    xa + ux * (r + 8) - nx, ya + uy * (r + 8) - ny, colour=VIOLET,
                    width=2)
    for (x, y), lab in zip(pts, "ABCD"):
        f.circle(x, y, r, fill=BLUE, fill_opacity="0.14", stroke=BLUE, stroke_width="1.5")
        f.text(x, y + 5, lab, cls="bold")
    return f


@figure("Independent Events", "A unit square split 0.6 across for A and 0.5 down for B, "
        "so the corner where they cross has area 0.30", width=WID)
def independent_events() -> Fig:
    f = vcard()

    x0, y0, side = 82, 92, 236
    pa, pb = 0.6, 0.5
    f.rect(x0, y0, side, side, rx=4, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    f.rect(x0, y0, side * pa, side, fill=BLUE, fill_opacity="0.16")
    f.rect(x0, y0, side, side * pb, fill=AMBER, fill_opacity="0.16")
    f.rect(x0, y0, side * pa, side * pb, fill=GREEN, fill_opacity="0.34")
    f.line(x0 + side * pa, y0, x0 + side * pa, y0 + side, cls="thin", stroke=BLUE,
           stroke_width="1.6")
    f.line(x0, y0 + side * pb, x0 + side, y0 + side * pb, cls="thin", stroke=AMBER,
           stroke_width="1.6")
    f.text(x0 + side * pa / 2, y0 + side * 0.76, "A", cls="bold")
    f.text(x0 + side * (1 + pa) / 2, y0 + side * pb / 2 + 5, "B", cls="bold")
    f.text(x0 + side * pa / 2, y0 + side * pb / 2 + 5, "0.30", cls="bold")
    brace(f, x0, x0 + side * pa, y0 + side + 8, depth=9, label="0.6", colour=BLUE,
          label_cls="sm bold")
    f.text(x0 - 12, y0 + side * pb / 2 + 4, "0.5", cls="sm bold", anchor="end")
    f.line(x0 - 6, y0 + 2, x0 - 6, y0 + side * pb - 2, cls="", stroke=AMBER,
           stroke_width="2", stroke_linecap="round")
    return f


@figure("Mutually Exclusive Events", "Two events A and B drawn apart inside S, with no "
        "overlap between them", width=WID)
def mutually_exclusive_events() -> Fig:
    f = vcard()

    universe(f, 26, 86, 308, 290)
    cy = 236
    venn2(f, BCX, cy, r=68, sep=162, colours=(BLUE, AMBER))
    return f


@figure("Probability Addition Rule", "Two overlapping events A and B inside S with their "
        "region probabilities, the overlap shaded as the part both circles count",
        width=WID)
def probability_addition_rule() -> Fig:
    f = vcard()

    universe(f, 26, 86, 308, 290)
    cx, cy, r, sep = BCX, 236, 92, 92
    ax, bx = cx - sep / 2, cx + sep / 2
    f.circle(ax, cy, r, fill=BLUE, fill_opacity="0.18", stroke=BLUE, stroke_width="1.6")
    f.circle(bx, cy, r, fill=AMBER, fill_opacity="0.18", stroke=AMBER, stroke_width="1.6")
    hh = math.sqrt(r * r - (sep / 2) ** 2)
    f.path(f"M{cx},{cy - hh:.2f} A{r},{r} 0 0 1 {cx},{cy + hh:.2f} "
           f"A{r},{r} 0 0 1 {cx},{cy - hh:.2f} Z",
           cls="", fill=ROSE, fill_opacity="0.4", stroke="none")
    f.text(ax - 42, cy + 5, "0.30", cls="")
    f.text(cx, cy + 5, "0.15", cls="bold")
    f.text(bx + 42, cy + 5, "0.25", cls="")
    f.text(ax - 56, cy - 80, "A", cls="bold")
    f.text(bx + 56, cy - 80, "B", cls="bold")
    return f


@figure("Probability Multiplication Rule", "A two-stage probability tree, with the path "
        "through A and then B picked out and its branch probabilities multiplied at the "
        "leaf", width=WID)
def probability_multiplication_rule() -> Fig:
    f = vcard()

    root, y1, y2 = (180, 88), 206, 322
    f.circle(*root, 6, fill="var(--dim)")
    stage1 = ((100, "A", 0.30, BLUE), (260, "Aᶜ", 0.70, "var(--dim)"))
    for x, lab, p, colour in stage1:
        on = lab == "A"
        f.arrow(root[0], root[1] + 8, x, y1 - 20, colour=colour, width=2.4 if on else 1.4)
        f.text((root[0] + x) / 2 + (-16 if x < 180 else 16), (root[1] + y1) / 2 - 4,
               f"{p:.2f}", cls="sm bold" if on else "sm")
        f.circle(x, y1, 18, fill=colour, fill_opacity="0.14", stroke=colour,
                 stroke_width="1.4")
        f.text(x, y1 + 5, lab, cls="")

    leaves = [(100, 50, "B", 0.80, GREEN, True), (100, 144, "Bᶜ", 0.20, "var(--dim)", False),
              (260, 216, "B", 0.10, GREEN, False), (260, 310, "Bᶜ", 0.90, "var(--dim)", False)]
    for x_from, x_to, lab, p, colour, on in leaves:
        f.arrow(x_from, y1 + 19, x_to, y2 - 20, colour=colour, width=2.4 if on else 1.4)
        f.text((x_from + x_to) / 2 + (-16 if x_to < x_from else 16), (y1 + y2) / 2,
               f"{p:.2f}", cls="sm bold" if on else "sm")
        f.circle(x_to, y2, 18, fill=colour, fill_opacity="0.14", stroke=colour,
                 stroke_width="1.4")
        f.text(x_to, y2 + 5, lab, cls="")
    f.text(50, y2 + 42, "0.24", cls="bold")
    return f


@figure("Inclusion-Exclusion Principle", "Three overlapping circles with a plus sign in "
        "each region covered once or three times and a minus sign in each region covered "
        "twice", width=WID)
def inclusion_exclusion() -> Fig:
    f = vcard()

    cx, cy, r = BCX, 238, 88
    centres = [(cx, cy - 46), (cx - 50, cy + 38), (cx + 50, cy + 38)]
    for (x, y), colour in zip(centres, (BLUE, AMBER, GREEN)):
        f.circle(x, y, r, fill=colour, fill_opacity="0.16", stroke=colour,
                 stroke_width="1.6")
    f.text(cx - 76, cy - 118, "A", cls="bold")
    f.text(cx - r - 50, cy + r + 30, "B", cls="bold")
    f.text(cx + r + 50, cy + r + 30, "C", cls="bold")
    for x, y, s in ((cx, cy - 96, "+"), (cx - 82, cy + 70, "+"), (cx + 82, cy + 70, "+"),
                    (cx - 44, cy - 12, "−"), (cx + 44, cy - 12, "−"), (cx, cy + 70, "−"),
                    (cx, cy + 20, "+")):
        f.text(x, y + 5, s, cls="bold")
    return f


@figure("Conditional Probability", "Two overlapping events inside S with everything "
        "outside B faded, so B becomes the whole space and the overlap is the share of it "
        "that is also A", width=WID)
def conditional_probability() -> Fig:
    f = vcard()

    sx, sy, sw, sh = 26, 86, 308, 290
    universe(f, sx, sy, sw, sh)
    cx, cy, r, sep = BCX, 236, 92, 96
    ax, bx = cx - sep / 2, cx + sep / 2
    f.circle(ax, cy, r, fill=BLUE, fill_opacity="0.2", stroke=BLUE, stroke_width="1.5")
    f.circle(bx, cy, r, fill=AMBER, fill_opacity="0.2", stroke="none")
    hh = math.sqrt(r * r - (sep / 2) ** 2)
    f.path(f"M{cx},{cy - hh:.2f} A{r},{r} 0 0 1 {cx},{cy + hh:.2f} "
           f"A{r},{r} 0 0 1 {cx},{cy - hh:.2f} Z",
           cls="", fill=VIOLET, fill_opacity="0.5", stroke="none")
    # Conditioning on B: everything outside B fades, and B is the new whole.
    f.path(f"M{sx},{sy} h{sw} v{sh} h{-sw} Z "
           f"M{bx - r},{cy} a{r},{r} 0 1 0 {2 * r},0 a{r},{r} 0 1 0 {-2 * r},0 Z",
           cls="", fill="var(--surf)", fill_opacity="0.72", fill_rule="evenodd",
           stroke="none")
    f.circle(bx, cy, r, fill="none", stroke=AMBER, stroke_width="2.8")
    f.text(ax - 56, cy - 80, "A", cls="bold dim")
    f.text(bx + 56, cy - 80, "B", cls="bold")
    f.text(cx, cy + 5, "0.12", cls="bold")
    f.text(bx + 42, cy + 5, "0.28", cls="bold")
    return f


@figure("Bayes Theorem", "A square split into a narrow high-risk column and a wide "
        "low-risk column, each with its claiming share shaded, the two shaded areas "
        "equal", width=WID)
def bayes_theorem() -> Fig:
    f = vcard()

    p_h, p_c_h, p_c_l = 0.20, 0.40, 0.10
    x0, y0, w, h = 56, 100, 248, 262
    split = x0 + w * p_h
    # Width is the prior, height within a column is the likelihood, so a shaded
    # area is a joint probability and the two shaded areas add to P(C).
    f.rect(x0, y0, w * p_h, h, fill=BLUE, fill_opacity="0.12")
    f.rect(split, y0, w * (1 - p_h), h, fill=ROSE, fill_opacity="0.12")
    f.rect(x0, y0 + h * (1 - p_c_h), w * p_h, h * p_c_h, fill=BLUE, fill_opacity="0.6")
    f.rect(split, y0 + h * (1 - p_c_l), w * (1 - p_h), h * p_c_l, fill=ROSE,
           fill_opacity="0.6")
    f.rect(x0, y0, w, h, rx=3, fill="none", stroke="var(--edge)", stroke_width="1.2")
    f.line(split, y0, split, y0 + h, cls="", stroke="var(--surf)", stroke_width="1.6")
    f.text(x0 + w * p_h / 2, y0 - 10, "H 0.20", cls="sm bold")
    f.text(split + w * (1 - p_h) / 2, y0 - 10, "L 0.80", cls="sm bold")
    f.text(x0 - 6, y0 + h * (1 - p_c_h) + 4, "0.40", cls="sm dim", anchor="end")
    f.text(x0 + w + 6, y0 + h * (1 - p_c_l) + 4, "0.10", cls="sm dim", anchor="start")
    f.text(x0 + w * p_h / 2, y0 + h - h * p_c_h / 2 + 4, "0.08", cls="sm bold")
    f.text(split + w * (1 - p_h) / 2, y0 + h - h * p_c_l / 2 + 4, "0.08", cls="sm bold")
    return f


@figure("The Law of Total Probability", "A sample space cut into four columns A1 to A4, "
        "with an event B spanning them and each piece of B shaded in its column's colour "
        "and marked with its probability", width=WID)
def law_of_total_probability() -> Fig:
    f = vcard()

    x0, y0, w, h = 26, 92, 308, 280
    f.rect(x0, y0, w, h, rx=8, fill="var(--soft)", stroke="var(--edge)", stroke_width="1")
    parts = [("A₁", 0.30, 0.10, BLUE), ("A₂", 0.25, 0.40, AMBER),
             ("A₃", 0.25, 0.20, GREEN), ("A₄", 0.20, 0.05, VIOLET)]
    ecx, ecy, erx, ery = 180, 262, 136, 74
    f.defs.append(f'<clipPath id="ltpB"><ellipse cx="{ecx}" cy="{ecy}" rx="{erx}" '
                  f'ry="{ery}"/></clipPath>')
    x, pieces, values = x0, [], []
    for lab, frac, q, colour in parts:
        pw = w * frac
        f.rect(x, y0, pw, h, fill=colour, fill_opacity="0.1")
        f.line(x, y0, x, y0 + h, cls="", stroke="var(--edge)", stroke_width="1")
        f.text(x + pw / 2, y0 + 24, lab, cls="bold")
        pieces.append(f'<rect x="{x:.2f}" y="{ecy - ery}" width="{pw:.2f}" '
                      f'height="{2 * ery}" fill="{colour}" fill-opacity="0.55"/>')
        lo, hi = max(x, ecx - erx), min(x + pw, ecx + erx)
        values.append(((lo + hi) / 2, f"{frac * q:.2f}"))
        x += pw
    f.raw(f'<g clip-path="url(#ltpB)">{"".join(pieces)}</g>')
    for vx, v in values:
        f.text(vx, ecy + 5, v, cls="sm bold")
    f.ellipse(ecx, ecy, erx, ery, fill="none", stroke=ROSE, stroke_width="2")
    f.text(ecx, ecy - ery - 10, "B", cls="bold")
    return f


@figure("Discrete Univariate Distributions", "A probability mass function drawn as "
        "stems standing on the integers 0 to 8", width=WID)
def discrete_univariate() -> Fig:
    f = vcard()

    masses = [_binom_pmf(8, 0.35, k) for k in range(9)]
    a = vaxes(f, -0.7, 8.7, 0, max(masses) * 1.15, top=24)
    a.stems(list(enumerate(masses)), colour=BLUE, dot=4.2, width=2.6)
    a.frame(xlabel="k", ylabel="p(k)", xticks=list(range(9)))
    return f


@figure("Continuous Univariate Distributions", "A smooth right-skewed density over the "
        "positive reals, the whole area under it shaded", width=WID)
def continuous_univariate() -> Fig:
    f = vcard()

    dens = lambda t: _gamma_pdf(t, 2.4, 1.0)
    a = vaxes(f, 0, 9, 0, 0.36, top=24)
    a.area(dens, 0, 9, colour=BLUE, opacity="0.22")
    a.curve(dens, colour=BLUE)
    a.frame(xlabel="x", ylabel="f(x)", xticks=[0])
    return f


# ═══════════════════════════════════════════════════════════════════════════
# 2. Univariate random variables
# ═══════════════════════════════════════════════════════════════════════════

@figure("Random Variable", "The four outcomes of two coin tosses, each sent by an arrow "
        "to its number of heads on the real line", width=WID)
def random_variable() -> Fig:
    f = vcard()

    universe(f, 30, 92, 300, 108, "S")
    outcomes = [("TT", 0, 72), ("HT", 1, 144), ("TH", 1, 216), ("HH", 2, 288)]
    for lab, _, cx in outcomes:
        f.rect(cx - 30, 134, 60, 40, rx=8, fill=BLUE, fill_opacity="0.14",
               stroke=BLUE, stroke_width="1.4")
        f.text(cx, 159, lab, cls="bold")

    lx0, lx1, ly = 72, 288, 342
    f.arrow(lx0 - 30, ly, lx1 + 26, ly, colour="var(--axis)", width=1.1)
    f.text(lx1 + 36, ly + 4, "ℝ", cls="sm dim", anchor="start")
    targets = {}
    for k in (0, 1, 2):
        x = lx0 + k * (lx1 - lx0) / 2
        targets[k] = x
        f.line(x, ly - 5, x, ly + 5, cls="tick")
        f.circle(x, ly, 6, fill=VIOLET)
        f.text(x, ly + 24, str(k), cls="bold")
    for _, k, cx in outcomes:
        f.arrow(cx, 178, targets[k], ly - 16, colour="var(--dim)", width=1.2, dash=True)
    return f


@figure("Probability Density Function (PDF)", "A bell-shaped density with the area under "
        "it between a and b shaded", width=WID)
def pdf() -> Fig:
    f = vcard()

    a = vaxes(f, -3.4, 3.4, 0, 0.44, top=24)
    a.area(_npdf, -0.6, 1.5, colour=BLUE, opacity="0.3")
    a.curve(_npdf, colour=BLUE)
    a.frame(xlabel="x", ylabel="f(x)", xticks=[-0.6, 1.5],
            xfmt=lambda t: "a" if t < 0 else "b")
    a.vline(-0.6, y_top=_npdf(-0.6), colour=BLUE)
    a.vline(1.5, y_top=_npdf(1.5), colour=BLUE)
    return f


def _p_phi(t):
    """The standard normal CDF."""
    return 0.5 * (1 + math.erf(t / math.sqrt(2)))


@figure("Cumulative Distribution Function (CDF)", "A density with its area to the left of "
        "x shaded and, on the same axes, the S-shaped CDF whose height at x equals that "
        "area", width=WID)
def cdf() -> Fig:
    f = vcard()

    x_star = 0.7
    fv = _p_phi(x_star)
    a = vaxes(f, -3.2, 3.2, 0, 1.08, top=24)
    a.area(_npdf, -3.2, x_star, colour=BLUE, opacity="0.26")
    a.curve(_npdf, colour=BLUE)
    a.curve(_p_phi, colour=VIOLET)
    a.frame(xlabel="x", xticks=[x_star], yticks=[0, 1], xfmt=lambda t: "x",
            yfmt=lambda t: f"{t:g}")
    a.hline(fv, x_to=x_star, colour=VIOLET)
    xs = a.px(x_star)
    f.line(xs, a.y1, xs, a.py(fv), cls="", stroke=VIOLET, stroke_width="2.6",
           stroke_linecap="round")
    a.point(x_star, fv, colour=VIOLET, r=4.2)
    f.text(a.x0 - 8, a.py(fv) + 3.6, f"{fv:.2f}", cls="sm bold", anchor="end")
    a.label(-2.1, 0.12, "f", cls="bold")
    a.label(2.2, 0.99, "F", cls="bold", dy=-8)
    return f


@figure("Percentile", "A density with its top ten percent shaded, and on the same axes "
        "the CDF read backwards from 0.90 across to the curve and down to the 90th "
        "percentile", width=WID)
def percentile() -> Fig:
    f = vcard()

    p, xp = 0.90, 1.2816
    a = vaxes(f, -3.2, 3.4, 0, 1.08, top=24)
    a.area(_npdf, -3.2, xp, colour=BLUE, opacity="0.2")
    a.area(_npdf, xp, 3.4, colour=ROSE, opacity="0.45")
    a.curve(_npdf, colour=BLUE)
    a.curve(_p_phi, colour=VIOLET)
    a.frame(xlabel="x", xticks=[xp], yticks=[0, p, 1], xfmt=lambda t: "x₀.₉₀",
            yfmt=lambda t: f"{t:g}")
    xs, ys = a.px(xp), a.py(p)
    f.arrow(a.x0 + 2, ys, xs - 6, ys, colour=VIOLET, width=1.5, dash=True)
    f.arrow(xs, ys + 6, xs, a.y1 - 3, colour=VIOLET, width=1.5, dash=True)
    a.point(xp, p, colour=VIOLET, r=4.2)
    a.label(-2.1, 0.12, "f", cls="bold")
    a.label(2.3, 0.99, "F", cls="bold", dy=-8)
    return f


@figure("Expected Value", "A right-skewed density resting on a beam, balanced on a "
        "fulcrum placed at its mean", width=WID)
def expected_value() -> Fig:
    f = vcard()

    a = vaxes(f, 0, 6.2, 0, 0.56, top=24, bottom=58)
    dens = lambda t: _lognorm(t, 0.55, 0.55)
    a.area(dens, 0.02, 6.2, colour=BLUE, opacity="0.18")
    a.curve(dens, colour=BLUE)
    a.frame(xlabel="x", ylabel="f(x)")
    mu = math.exp(0.55 + 0.55 ** 2 / 2)
    a.vline(mu, colour=AMBER, y_top=0.52)
    a.label(mu, 0.52, "E[X]", cls="sm bold", anchor="start", dx=6, dy=4)
    px = a.px(mu)
    f.line(a.x0, a.y1 + 3, a.x1, a.y1 + 3, cls="", stroke=AMBER, stroke_width="1.8")
    f.polygon([(px, a.y1 + 3), (px - 11, a.y1 + 21), (px + 11, a.y1 + 21)], fill=AMBER)
    return f


@figure("Variance", "Two bell curves with the same mean, a tall narrow one and a low wide "
        "one, each with an arrow spanning one standard deviation either side", width=WID)
def variance() -> Fig:
    f = vcard()

    a = vaxes(f, -5, 5, 0, 0.44, top=24)
    for sd, colour in ((1.9, AMBER), (1.0, BLUE)):
        a.area(lambda t, s=sd: _npdf(t, 0, s), -5, 5, colour=colour, opacity="0.1")
        a.curve(lambda t, s=sd: _npdf(t, 0, s), colour=colour)
    a.frame(xlabel="x", ylabel="f(x)", xticks=[0], xfmt=lambda t: "μ")
    for sd, colour in ((1.0, BLUE), (1.9, AMBER)):
        y = _npdf(sd, 0, sd)
        x1, y1 = a.p(-sd, y)
        x2, _ = a.p(sd, y)
        f.arrow(x1 + 4, y1, x2, y1, colour=colour, width=1.6)
        f.arrow(x2 - 4, y1, x1, y1, colour=colour, width=1.6)
    return f


@figure("Standard Deviation", "A bell curve with the bands one, two and three standard "
        "deviations either side of the mean shaded and marked 68%, 95% and 99.7%",
        width=WID)
def standard_deviation() -> Fig:
    f = vcard()

    a = vaxes(f, -3.7, 3.7, 0, 0.44, left=30, right=20, top=24)
    bands = [(1, "68%", BLUE), (2, "95%", VIOLET), (3, "99.7%", AMBER)]
    for k, _, colour in reversed(bands):
        a.area(_npdf, -k, k, colour=colour, opacity="0.14")
    a.curve(_npdf, colour=BLUE)
    a.frame(xlabel="x", xticks=[-3, -2, -1, 0, 1, 2, 3],
            xfmt=lambda t: "μ" if t == 0 else (f"{'+' if t > 0 else '−'}{abs(int(t))}σ"))
    for k, lab, colour in bands:
        y = {1: 0.20, 2: 0.105, 3: 0.028}[k]
        x1, y1 = a.p(-k, y)
        x2, _ = a.p(k, y)
        f.arrow(x1, y1, x2, y1, colour=colour, width=1.2)
        f.arrow(x2, y1, x1, y1, colour=colour, width=1.2)
        f.text(a.px(0), y1 - 6, lab, cls="sm bold")
    return f


@figure("Coefficient of Variation", "Two bell curves with the same spread, one near zero "
        "and one far from it, so the same standard deviation is a large share of the "
        "first mean and a small share of the second", width=WID)
def coefficient_of_variation() -> Fig:
    f = vcard()

    a = vaxes(f, 0, 12, 0, 0.52, top=24)
    for mu, colour in ((2.2, ROSE), (8.0, BLUE)):
        a.area(lambda t, m=mu: _npdf(t, m, 0.9), 0, 12, colour=colour, opacity="0.1")
        a.curve(lambda t, m=mu: _npdf(t, m, 0.9), colour=colour)
        x1, y1 = a.p(mu - 0.9, _npdf(0.9, 0, 0.9))
        x2, _ = a.p(mu + 0.9, 0)
        f.arrow(x1 + 4, y1, x2, y1, colour=colour, width=1.5)
        f.arrow(x2 - 4, y1, x1, y1, colour=colour, width=1.5)
    a.frame(xlabel="x", ylabel="f(x)", xticks=[0, 2.2, 8.0], xfmt=lambda t: f"{t:g}")
    a.label(2.2, 0.47, "CV 0.41", cls="sm bold")
    a.label(8.0, 0.47, "CV 0.11", cls="sm bold")
    return f


@figure("Binomial Distribution", "The binomial mass function of the number of claims "
        "among ten policies that each claim with probability 0.3, drawn as stems from 0 "
        "to 10", width=WID)
def binomial_distribution() -> Fig:
    f = vcard()

    n, p = 10, 0.3
    masses = [_binom_pmf(n, p, k) for k in range(n + 1)]
    a = vaxes(f, -0.7, 10.7, 0, max(masses) * 1.15, top=24)
    a.stems(list(enumerate(masses)), colour=BLUE, dot=4, width=2.6)
    a.frame(xlabel="k", ylabel="P(X = k)", xticks=list(range(n + 1)))
    return f


def _p_trial_axis(f: Fig, a: Axes, n, wins, labels, size=16):
    """A row of trial boxes standing in for the x-axis ticks, trial k under k.

    A filled box is a success and the last success is amber — the trial the
    count ends on, which is the stem picked out above it. The trials after it
    never happened, so they are dashed outlines. Tick numbers go under the boxes
    for the trials in `labels`.
    """
    y, end = a.y1 + 6, max(wins)
    for k in range(1, n + 1):
        x = a.px(k)
        colour = AMBER if k == end else BLUE
        if k > end:
            f.rect(x - size / 2, y, size, size, rx=3.5, fill="none", stroke="var(--edge)",
                   stroke_width="1.2", stroke_dasharray="3 2.5")
        else:
            f.rect(x - size / 2, y, size, size, rx=3.5,
                   fill=colour if k in wins else "var(--soft)",
                   fill_opacity="0.75" if k in wins else "1",
                   stroke=colour if k in wins else "var(--axis)", stroke_width="1.2")
        if k in labels:
            f.text(x, y + size + 14, str(k), cls="sm dim")


@figure("Geometric Distribution", "The geometric mass function over trials 1 to 10, its "
        "axis a row of trials where the first two fail and the third succeeds, the stem "
        "at 3 picked out", width=WID)
def geometric_distribution() -> Fig:
    f = vcard()

    p, first = 0.2, 3
    ks = list(range(1, 11))
    masses = [(1 - p) ** (k - 1) * p for k in ks]
    a = vaxes(f, 0.3, 10.7, 0, max(masses) * 1.15, top=24, bottom=50)
    a.stems([(k, m) for k, m in zip(ks, masses) if k != first], colour=BLUE, dot=4,
            width=2.6)
    a.stems([(first, masses[first - 1])], colour=AMBER, dot=4.6, width=3)
    a.frame(ylabel="P(X = k)")
    _p_trial_axis(f, a, 10, {first}, set(ks))
    return f


@figure("Hypergeometric Distribution", "A pool of ten policies, four of them with errors, "
        "with three drawn out of it into a sample, leaving empty places behind", width=WID)
def hypergeometric_distribution() -> Fig:
    f = vcard()

    # The pool: two rows of five, the four with errors in rose. Three are drawn
    # out and do not go back — their places in the pool are left empty.
    errors = {1, 3, 5, 9}
    drawn = [5, 7, 9]
    xs = [72 + 54 * (i % 5) for i in range(10)]
    ys = [132 + 62 * (i // 5) for i in range(10)]
    f.rect(36, 92, 288, 142, rx=14, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    for i in range(10):
        colour = ROSE if i in errors else "var(--dim)"
        if i in drawn:
            f.circle(xs[i], ys[i], 19, fill="none", stroke="var(--edge)",
                     stroke_width="1.4", stroke_dasharray="3 3")
        else:
            f.circle(xs[i], ys[i], 19, fill=colour, fill_opacity="0.55" if i in errors
                     else "0.25", stroke=colour, stroke_width="1.4")

    sx = [124, 180, 236]
    f.rect(92, 294, 176, 76, rx=14, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    for i, x in zip(drawn, sx):
        colour = ROSE if i in errors else "var(--dim)"
        f.arrow(xs[i], ys[i] + 22, x, 306, colour="var(--dim)", width=1.2, dash=True)
        f.circle(x, 332, 19, fill=colour, fill_opacity="0.55" if i in errors else "0.25",
                 stroke=colour, stroke_width="1.4")
    return f


@figure("Negative Binomial Distribution", "The negative binomial mass function of the "
        "trial the third success lands on, its axis a row of trials with successes on "
        "the 2nd, 5th and 7th, the stem at 7 picked out", width=WID)
def negative_binomial_distribution() -> Fig:
    f = vcard()

    r, p, wins = 3, 0.25, {2, 5, 7}
    ks = list(range(r, 17))
    masses = [math.comb(k - 1, r - 1) * p ** r * (1 - p) ** (k - r) for k in ks]
    a = vaxes(f, 0.4, 16.6, 0, max(masses) * 1.15, top=24, bottom=50)
    a.stems([(k, m) for k, m in zip(ks, masses) if k != 7], colour=BLUE, dot=3.4,
            width=2.4)
    a.stems([(7, masses[ks.index(7)])], colour=AMBER, dot=4.4, width=3)
    a.frame(ylabel="P(X = k)")
    _p_trial_axis(f, a, 16, wins, set(range(1, 17, 2)), size=13)
    return f


@figure("Poisson Distribution", "The Poisson mass function of a monthly claim count with "
        "mean 3, drawn as stems from 0 to 10", width=WID)
def poisson_distribution() -> Fig:
    f = vcard()

    lam = 3.0
    ks = list(range(11))
    masses = [math.exp(-lam) * lam ** k / math.factorial(k) for k in ks]
    a = vaxes(f, -0.7, 10.7, 0, max(masses) * 1.15, top=24)
    a.stems(list(zip(ks, masses)), colour=BLUE, dot=4, width=2.6)
    a.frame(xlabel="k", ylabel="P(X = k)", xticks=ks)
    return f


@figure("Uniform Discrete", "Six stems of equal height, one over each face of a die",
        width=WID)
def uniform_discrete() -> Fig:
    f = vcard()

    a = vaxes(f, 0.3, 6.7, 0, 0.21, top=24, bottom=56)
    a.stems([(k, 1 / 6) for k in range(1, 7)], colour=BLUE, dot=4.4, width=2.8)
    a.frame(ylabel="P(X = k)", yticks=[1 / 6], yfmt=lambda t: "1/6")
    for k in range(1, 7):
        _p_die(f, a.px(k), a.y1 + 24, 28, k)
    return f


@figure("Beta", "Four beta densities on the unit interval — flat, right-skewed, "
        "left-skewed and in between — each labelled with its two parameters", width=WID)
def beta_distribution() -> Fig:
    f = vcard()

    a = vaxes(f, 0, 1, 0, 2.95, left=40, right=16, top=24)
    for aa, bb, colour in ((1, 1, BLUE), (2, 5, AMBER), (5, 2, GREEN), (3, 2, VIOLET)):
        a.curve(lambda t, aa=aa, bb=bb: _beta_pdf(t, aa, bb), colour=colour, n=170,
                xa=0.003, xb=0.997)
    a.frame(xlabel="x", ylabel="f(x)", xticks=[0, 0.25, 0.5, 0.75, 1],
            xfmt=lambda t: f"{t:g}", yticks=[1, 2], yfmt=lambda t: f"{t:g}")
    a.label(0.15, 1, "(1, 1)", cls="sm bold", dy=-9)
    a.label(0.2, _beta_pdf(0.2, 2, 5), "(2, 5)", cls="sm bold", dy=-10)
    a.label(0.8, _beta_pdf(0.8, 5, 2), "(5, 2)", cls="sm bold", dy=-10)
    a.label(0.47, _beta_pdf(0.47, 3, 2), "(3, 2)", cls="sm bold", dy=-10)
    return f


@figure("Exponential Distribution", "An exponential density with its tail past the "
        "deductible d shaded, and the same curve drawn again starting over at d",
        width=WID)
def exponential_distribution() -> Fig:
    f = vcard()

    theta, d = 500.0, 300.0
    dens = lambda t: math.exp(-t / theta) / theta
    a = vaxes(f, 0, 2500, 0, 0.0022, top=24)
    a.area(dens, d, 2500, colour=AMBER, opacity="0.18")
    a.curve(dens, colour=BLUE, n=180)
    a.curve(lambda t: dens(t - d), colour=AMBER, n=180, xa=d, dash=True)
    a.frame(xlabel="x", ylabel="f(x)", xticks=[0, 1000, 2000], xfmt=lambda t: f"{t:,.0f}")
    a.vline(d, colour="var(--dim)", y_top=1 / theta)
    a.label(d, 1 / theta, "d", cls="sm bold", dy=-8)
    return f


@figure("Gamma", "A gamma density, with four exponential waits laid end to end along its "
        "axis to make one draw from it", width=WID)
def gamma_distribution() -> Fig:
    f = vcard()

    alpha, theta = 4, 250.0
    dens = lambda t: _gamma_pdf(t, alpha, theta)
    a = vaxes(f, 0, 2500, 0, 0.0011, top=24)
    a.area(dens, 0, 2500, colour=BLUE, opacity="0.14")
    a.curve(dens, colour=BLUE, n=200)
    # One draw from the gamma is four exponential waits end to end.
    x, top = 0, a.y1 - 18
    for i, wait in enumerate((210, 430, 150, 320)):
        f.rect(a.px(x) + 0.8, top, a.px(x + wait) - a.px(x) - 1.6, 14, rx=3,
               fill=SERIES[i], fill_opacity="0.8")
        x += wait
    f.line(a.px(x), top - 6, a.px(x), a.y1, cls="", stroke="var(--ink)", stroke_width="1.6")
    a.frame(xlabel="x", ylabel="f(x)", xticks=[0, 1000, 2000], xfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Lognormal Distribution", "A right-skewed lognormal density in dollars with its "
        "tail past 1,000 shaded, over a second ruler in log dollars whose evenly spaced "
        "marks spread apart to the right", width=WID)
def lognormal_distribution() -> Fig:
    f = vcard()

    mu, sd = 6.0, 0.8
    dens = lambda t: _lognorm(t, mu, sd)
    a = vaxes(f, 0, 2000, 0, 0.0019, top=24, bottom=66)
    a.area(dens, 1000, 2000, colour=AMBER, opacity="0.36")
    a.area(dens, 1, 1000, colour=BLUE, opacity="0.14")
    a.curve(dens, colour=BLUE, n=220, xa=1)
    a.frame(ylabel="f(x)", xticks=[0, 1000, 2000], xfmt=lambda t: f"{t:,.0f}")
    a.label(1330, 0.00022, "0.128", cls="sm bold")

    # The same axis read in logs: equal steps in ln x land further and further
    # apart in dollars, which is where the long right tail comes from.
    ly = a.y1 + 34
    f.line(a.x0, ly, a.x1, ly, cls="axis")
    for v in (5, 6, 7):
        x = a.px(math.exp(v))
        f.line(x, ly - 4, x, ly + 4, cls="tick")
        f.text(x, ly + 16, str(v), cls="sm dim")
    f.text(a.x0 - 8, ly + 4, "ln x", cls="sm dim", anchor="end")
    return f


@figure("Normal Distribution", "A normal density of aggregate loss with the tail past 55 "
        "shaded, over a second ruler carrying the standardized z scale", width=WID)
def normal_distribution() -> Fig:
    f = vcard()

    mu, sd = 50.0, 6.3246
    dens = lambda t: _npdf(t, mu, sd)
    a = Axes(f, 54, 90, 326, 300, mu - 3.4 * sd, mu + 3.4 * sd, 0, 0.068)
    a.area(dens, 55, mu + 3.4 * sd, colour=AMBER, opacity="0.34")
    a.curve(dens, colour=BLUE, n=200)
    a.frame(xticks=[30, 40, 50, 60, 70], xfmt=lambda t: f"{t:g}")
    a.vline(55, colour=AMBER, y_top=dens(55))
    a.label(55, dens(55), "55", cls="sm bold", dy=-8)
    a.label(60.5, 0.0075, "0.215", cls="sm bold")

    # The same axis, read again in standard deviations: the z ruler is what a
    # Φ table is indexed by, so the figure shows both scales at once.
    zy = 346
    f.arrow(a.x0 - 8, zy, a.x1 + 12, zy, colour="var(--axis)", width=1.1)
    for z in (-3, -2, -1, 0, 1, 2, 3):
        zx = a.px(mu + z * sd)
        f.line(zx, zy, zx, zy + 4, cls="tick")
        f.text(zx, zy + 16, f"{z:g}".replace("-", "−"), cls="sm dim")
    f.text(a.x0 - 14, zy + 4, "z", cls="sm dim", anchor="end")
    zx = a.px(55)
    f.line(zx, a.y1, zx, zy, cls="thin dash", stroke=AMBER, stroke_width="1.2")
    f.line(zx, zy - 5, zx, zy + 5, cls="", stroke=AMBER, stroke_width="1.8")
    f.text(zx + 6, zy - 8, "0.79", cls="sm bold", anchor="start")
    return f


@figure("Uniform Continuous Distribution", "A flat density on the interval from a to b, "
        "the rectangle under it shaded", width=WID)
def uniform_continuous() -> Fig:
    f = vcard()

    aa, bb = 2.0, 7.0
    dens = 1 / (bb - aa)
    a = vaxes(f, 0.5, 8.5, 0, 0.26, left=62, top=24)
    a.area(lambda t: dens if aa <= t <= bb else 0.0, aa, bb, colour=BLUE, opacity="0.24")
    a.polyline([(0.5, 0), (aa, 0), (aa, dens), (bb, dens), (bb, 0), (8.5, 0)],
               colour=BLUE, width=2.4)
    a.frame(xlabel="x", ylabel="f(x)", xticks=[aa, bb],
            xfmt=lambda t: "a" if t == aa else "b", yticks=[dens], yfmt=lambda t: "1/(b−a)")
    return f


@figure("Transformations of Random Variables", "The curve y = g(x) with the density of X "
        "drawn under its x-axis and the reshaped density of Y drawn beside its y-axis",
        width=WID)
def transformations() -> Fig:
    f = vcard()

    gx0, gx1, gy0, gy1 = 128, 328, 84, 280
    a = Axes(f, gx0, gy0, gx1, gy1, 0, 2.6, 0, 6.8)
    a.frame(arrows=True)
    a.curve(lambda t: t * t, colour=VIOLET, xa=0, xb=2.6)
    f.text(gx1 - 4, gy0 + 12, "g", cls="bold", anchor="end")

    xv = 1.5
    a.vline(xv, y_top=xv * xv, colour="var(--dim)")
    f.line(gx0, a.py(xv * xv), a.px(xv), a.py(xv * xv), cls="thin dash",
           stroke="var(--dim)", stroke_width="1.2")
    a.point(xv, xv * xv, colour=VIOLET, r=3.8)

    dx = Axes(f, gx0, gy1 + 14, gx1, gy1 + 72, 0, 2.6, 0, 0.95)
    dx.area(lambda t: _npdf(t, 1.4, 0.45), 0, 2.6, colour=BLUE, opacity="0.2")
    dx.curve(lambda t: _npdf(t, 1.4, 0.45), colour=BLUE, n=90)
    f.line(gx0, gy1 + 72, gx1, gy1 + 72, cls="axis")
    f.text(gx1 - 4, gy1 + 64, "f_X", cls="sm bold", anchor="end")

    ypts = []
    for i in range(81):
        yv = 0.06 + (6.8 - 0.06) * i / 80
        xx = math.sqrt(yv)
        ypts.append((_npdf(xx, 1.4, 0.45) / (2 * xx), yv))
    scale = 92 / max(d for d, _ in ypts)
    poly = [(gx0 - d * scale, a.py(yv)) for d, yv in ypts]
    f.polygon([(gx0, a.py(0.06))] + poly + [(gx0, a.py(6.8))], fill=GREEN,
              fill_opacity="0.18", stroke="none")
    f.poly(poly, cls="curve", stroke=GREEN, stroke_width="2")
    f.text(gx0 - 54, gy0 + 4, "f_Y", cls="sm bold")
    return f


@figure("Calculus", "One curve carrying both operations: a tangent line touching it at x "
        "and the area under it between a and b shaded", width=WID)
def calculus() -> Fig:
    f = vcard()

    fn = lambda t: 0.28 * t * t - 0.2 * t + 1.1
    a = vaxes(f, 0, 3.4, 0, 3.9, top=24)
    a.area(fn, 0.4, 1.6, colour=GREEN, opacity="0.26")
    a.curve(fn, colour=BLUE)
    x0 = 2.5
    slope = 0.56 * x0 - 0.2
    a.polyline([(x0 - 1.05, fn(x0) - 1.05 * slope), (x0 + 0.85, fn(x0) + 0.85 * slope)],
               colour=AMBER, width=2)
    a.vline(x0, y_top=fn(x0), colour="var(--dim)")
    a.point(x0, fn(x0), colour=AMBER, r=4.2)
    a.frame(xticks=[0.4, 1.6, x0], xfmt=lambda t: {0.4: "a", 1.6: "b"}.get(t, "x"))
    a.label(1.0, 0.55, "∫ f", cls="bold")
    a.label(x0 + 0.62, fn(x0) + 0.62 * slope, "f′", cls="bold", dx=-12, dy=-2)
    return f


@figure("Discrete Mathematics", "The eight subsets of {a, b, c} stacked by size from the "
        "empty set to the whole set, each linked to the subsets one element larger",
        width=WID)
def discrete_mathematics() -> Fig:
    f = vcard()

    levels = [[""], ["a", "b", "c"], ["ab", "ac", "bc"], ["abc"]]
    colours = ["var(--dim)", BLUE, VIOLET, GREEN]
    nodes = {}
    for li, row in enumerate(levels):
        for i, s in enumerate(row):
            nodes[s] = (180 + (i - (len(row) - 1) / 2) * 104, 98 + li * 88)
    # An edge for each subset one element larger — the Hasse diagram of ⊆.
    for s, (xa, ya) in nodes.items():
        for t, (xb, yb) in nodes.items():
            if len(t) == len(s) + 1 and set(s) <= set(t):
                f.line(xa, ya + 16, xb, yb - 16, cls="thin", stroke="var(--axis)",
                       stroke_width="1.1")
    for s, (x, y) in nodes.items():
        colour = colours[len(s)]
        f.rect(x - 36, y - 16, 72, 32, rx=8, fill=colour, fill_opacity="0.14",
               stroke=colour, stroke_width="1.3")
        f.text(x, y + 5, "{" + ",".join(s) + "}" if s else "∅", cls="")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# 3. Insurance applications — the loss becomes the payment
# ═══════════════════════════════════════════════════════════════════════════

def _payment_axes(f: Fig, reference=True):
    """The shared payment-vs-loss panel: payment Y up, ground-up loss X across.

    Curves are labelled where they run rather than in a legend box — one less
    block of text between the reader and the shape. `reference=False` drops the
    "Y = X" caption where a payment line already runs along that diagonal.
    """
    a = vaxes(f, 0, 10, 0, 10, left=46, right=16, top=30, bottom=42)
    a.polyline([(0, 0), (10, 10)], colour="var(--dim)", width=1.1, dash=True)
    if reference:
        a.label(9.0, 9.8, "Y = X", cls="sm dim", anchor="end")
    return a


@figure("Deductible", "Payment against loss: nothing below the deductible d, then an "
        "ordinary deductible's line one d below the diagonal and a franchise deductible's "
        "line jumping up onto it", width=WID)
def deductible() -> Fig:
    f = vcard()

    d = 3.0
    a = _payment_axes(f, reference=False)
    a.polyline([(0, 0), (d, 0)], colour=BLUE, width=2.4)
    a.polyline([(d, 0), (10, 7)], colour=BLUE, width=2.4)
    a.polyline([(d, d), (10, 10)], colour=AMBER, width=2.4)
    a.point(d, d, colour=AMBER, r=3)
    f.circle(a.px(d), a.py(0), 3.2, fill="var(--surf)", stroke=AMBER, stroke_width="1.4")
    a.frame(xlabel="loss X", ylabel="payment Y", xticks=[d], xfmt=lambda t: "d")
    a.vline(d, y_top=d, colour="var(--dim)")
    a.label(9.4, 6.2, "ordinary", cls="sm bold", anchor="end")
    a.label(7.4, 8.6, "franchise", cls="sm bold", anchor="end")
    return f


@figure("Benefit Limit", "Payment against loss rising with the loss up to the limit u "
        "and flat after it, the wedge above u that the insured keeps shaded", width=WID)
def benefit_limit() -> Fig:
    f = vcard()

    u = 6.0
    a = _payment_axes(f)
    f.polygon([a.p(u, u), a.p(10, 10), a.p(10, u)], fill=ROSE, fill_opacity="0.24",
              stroke="none")
    a.polyline([(0, 0), (u, u)], colour=BLUE, width=2.4)
    a.polyline([(u, u), (10, u)], colour=BLUE, width=2.4)
    a.label(8.7, 6.8, "retained", cls="sm bold")
    a.frame(xlabel="loss X", ylabel="payment Y", xticks=[u], xfmt=lambda t: "u",
            yticks=[u], yfmt=lambda t: "u")
    a.vline(u, y_top=u, colour="var(--dim)")
    return f


@figure("Coinsurance Percentage", "Payment against loss past a deductible, the full "
        "line dashed and the coinsured line below it flattened by the factor alpha, the "
        "gap between them shaded", width=WID)
def coinsurance() -> Fig:
    f = vcard()

    d, alpha = 2.0, 0.75
    a = _payment_axes(f, reference=False)
    f.polygon([a.p(d, 0), a.p(10, 10 - d), a.p(10, alpha * (10 - d))], fill=AMBER,
              fill_opacity="0.3", stroke="none")
    a.polyline([(0, 0), (d, 0), (10, 10 - d)], colour="var(--dim)", width=1.4, dash=True)
    a.polyline([(0, 0), (d, 0), (10, alpha * (10 - d))], colour=BLUE, width=2.4)
    a.label(9.2, 6.0, "1 − α", cls="sm bold")
    a.label(8.4, alpha * (8.4 - d), "× α", cls="sm bold", dx=4, dy=18)
    a.frame(xlabel="loss X", ylabel="payment Y", xticks=[d], xfmt=lambda t: "d")
    return f


@figure("Policy Information", "Payment against loss with the deductible, coinsurance "
        "and limit applied in turn: zero up to d, a line of slope alpha, then flat at u",
        width=WID)
def policy_information() -> Fig:
    f = vcard()

    d, alpha, u = 2.0, 0.8, 4.0
    cap_x = d + u / alpha
    a = _payment_axes(f)
    a.polyline([(0, 0), (d, 0), (cap_x, u), (10, u)], colour=BLUE, width=2.6)
    a.frame(xlabel="loss X", ylabel="payment Y", xticks=[d, cap_x],
            xfmt=lambda t: "d" if t < 3 else "d + u/α", yticks=[u], yfmt=lambda t: "u")
    a.hline(u, colour="var(--dim)")
    a.vline(d, y_top=u, colour="var(--dim)")
    a.vline(cap_x, y_top=u, colour="var(--dim)")
    a.label(4.9, 1.7, "slope α", cls="sm bold", anchor="start")
    return f


@figure("Loss Random Variable", "A right-skewed loss density split at the deductible d, "
        "the part below it grey and the part the insurer pays shaded", width=WID)
def loss_random_variable() -> Fig:
    f = vcard()

    d = 1.6
    dens = lambda t: _lognorm(t, 0.6, 0.62)
    a = vaxes(f, 0, 8, 0, 0.5, top=24)
    a.area(dens, 0.02, d, colour="var(--dim)", opacity="0.25")
    a.area(dens, d, 8, colour=BLUE, opacity="0.24")
    a.curve(dens, colour=BLUE, xa=0.02)
    a.frame(xlabel="x", ylabel="f(x)", xticks=[d], xfmt=lambda t: "d")
    a.vline(d, y_top=dens(d), colour=AMBER)
    a.label(2.6, 0.08, "X − d", cls="sm bold")
    return f


@figure("Payment Random Variable", "The insurer's payment as a mixed distribution: a "
        "spike of probability at zero, a density between zero and the limit u, and a "
        "second spike at u", width=WID)
def payment_random_variable() -> Fig:
    f = vcard()

    a = vaxes(f, -1.1, 8, 0, 0.4, top=24)
    dens = lambda t: _lognorm(t + 1.6, 0.6, 0.62) * 0.8
    a.area(lambda t: dens(t) if 0.05 <= t <= 5 else 0.0, 0.05, 5, colour=BLUE,
           opacity="0.22")
    a.curve(dens, colour=BLUE, xa=0.05, xb=5)
    a.frame(xlabel="y", ylabel="f(y)", xticks=[0, 5],
            xfmt=lambda t: "0" if t == 0 else "u")
    for x, height, colour in ((0, 0.34, AMBER), (5, 0.16, ROSE)):
        f.line(a.px(x), a.y1, a.px(x), a.py(height), cls="", stroke=colour,
               stroke_width="3.6", stroke_linecap="round")
        f.circle(a.px(x), a.py(height), 5, fill=colour)
    return f


@figure("Inflation", "A loss density and the same density stretched by inflation, the "
        "inflated one's area past a fixed deductible d shaded", width=WID)
def inflation() -> Fig:
    f = vcard()

    d, r = 2.0, 0.25
    base = lambda t: _lognorm(t, 0.75, 0.55)
    infl = lambda t: base(t / (1 + r)) / (1 + r)
    a = vaxes(f, 0, 9, 0, 0.42, top=24)
    a.curve(base, colour="var(--dim)", xa=0.02)
    a.area(infl, d, 9, colour=BLUE, opacity="0.2")
    a.curve(infl, colour=BLUE, xa=0.02)
    a.frame(xlabel="loss", ylabel="f(x)", xticks=[d], xfmt=lambda t: "d")
    a.vline(d, colour=AMBER, y_top=0.41)
    a.label(1.2, 0.405, "X", cls="sm bold")
    a.label(3.4, 0.335, "X′", cls="sm bold", anchor="start")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# 4. Multivariate random variables
# ═══════════════════════════════════════════════════════════════════════════

# One joint PMF is reused across the discrete multivariate pages so a student
# reading them in sequence sees the same table each time.
JOINT = [
    #  y=0    y=1    y=2
    [0.10, 0.08, 0.02],   # x = 0
    [0.06, 0.20, 0.14],   # x = 1
    [0.04, 0.12, 0.24],   # x = 2
]


def _joint_table(f, x0, y0, cell=58, row_h=36, highlight=None, show_margins=True):
    """Draw the shared 3×3 joint PMF, optionally with margins and a highlight."""
    for j in range(3):
        f.text(x0 + (j + 0.5) * cell, y0 - 8, f"y = {j}", cls="sm dim")
    for i in range(3):
        f.text(x0 - 8, y0 + (i + 0.5) * row_h + 4, f"x = {i}", cls="sm dim", anchor="end")
    for i in range(3):
        for j in range(3):
            cx, cy = x0 + j * cell, y0 + i * row_h
            on = highlight is not None and highlight(i, j)
            f.rect(cx, cy, cell, row_h, rx=3, fill=BLUE if on else "var(--soft)",
                   fill_opacity="0.26" if on else "1", stroke="var(--edge)",
                   stroke_width="1")
            f.text(cx + cell / 2, cy + row_h / 2 + 4, f"{JOINT[i][j]:.2f}",
                   cls="sm bold" if on else "sm")
    if show_margins:
        f.text(x0 + 3.5 * cell + 6, y0 - 8, "pₓ(x)", cls="sm dim", fill=AMBER)
        for i in range(3):
            cx, cy = x0 + 3 * cell + 6, y0 + i * row_h
            f.rect(cx, cy, cell, row_h, rx=3, fill=AMBER, fill_opacity="0.16",
                   stroke=AMBER, stroke_width="1")
            f.text(cx + cell / 2, cy + row_h / 2 + 4, f"{sum(JOINT[i]):.2f}",
                   cls="sm bold")
        f.text(x0 - 8, y0 + 3 * row_h + 28, "p_Y(y)", cls="sm dim", anchor="end",
               fill=GREEN)
        for j in range(3):
            cx, cy = x0 + j * cell, y0 + 3 * row_h + 6
            f.rect(cx, cy, cell, row_h, rx=3, fill=GREEN, fill_opacity="0.16",
                   stroke=GREEN, stroke_width="1")
            f.text(cx + cell / 2, cy + row_h / 2 + 4,
                   f"{sum(JOINT[i][j] for i in range(3)):.2f}", cls="sm bold")


@figure("Multivariate Distribution", "Contours of a tilted joint density in the x–y "
        "plane, with the marginal density of X drawn under the x-axis and that of Y beside "
        "the y-axis", width=WID)
def multivariate_distribution() -> Fig:
    f = vcard()

    bx0, by0, side = 128, 104, 192
    bx1, by1 = bx0 + side, by0 + side
    ccx, ccy = bx0 + side / 2, by0 + side / 2
    f.rect(bx0, by0, side, side, rx=4, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1")
    for k, op in ((1, "0.30"), (1.7, "0.17"), (2.4, "0.08")):
        f.raw(f'<ellipse cx="{ccx}" cy="{ccy}" rx="{34 * k:.0f}" ry="{19 * k:.0f}" '
              f'transform="rotate(-28 {ccx} {ccy})" fill="{BLUE}" fill-opacity="{op}" '
              f'stroke="{BLUE}" stroke-width="1"/>')
    f.arrow(bx0, by1, bx1 + 12, by1, colour="var(--axis)", width=1.1)
    f.arrow(bx0, by1, bx0, by0 - 12, colour="var(--axis)", width=1.1)
    f.text(bx1 + 16, by1 + 4, "x", cls="sm dim", anchor="start")
    f.text(bx0 - 6, by0 - 16, "y", cls="sm dim", anchor="end")

    fx = [(bx0 + side * i / 60, by1 + 56 - 104 * _npdf(-3 + 6 * i / 60))
          for i in range(61)]
    f.poly(fx, cls="curve", stroke=AMBER, stroke_width="2")
    f.text(bx1 + 6, by1 + 50, "f_X", cls="sm bold", anchor="start")
    fy = [(bx0 - 48 + 96 * _npdf(-3 + 6 * i / 60), by1 - side * i / 60)
          for i in range(61)]
    f.poly(fy, cls="curve", stroke=GREEN, stroke_width="2")
    f.text(bx0 - 42, by0 - 8, "f_Y", cls="sm bold")
    return f


def _p_joint_grid(f: Fig, x0, y1, cell, scale=0.46, style=None):
    """The shared joint PMF drawn as a 3×3 lattice of discs, area ∝ p(x, y).

    x runs across and y runs up from the corner (x0, y1). `style(i, j)` gives
    the (colour, opacity) of the disc at x = i, y = j. Returns each disc's
    centre and radius, keyed (i, j).
    """
    pmax = max(max(row) for row in JOINT)
    top, right = y1 - 3 * cell, x0 + 3 * cell
    for k in range(3):
        c, r = x0 + (k + 0.5) * cell, y1 - (k + 0.5) * cell
        f.line(c, top, c, y1, cls="grid")
        f.line(x0, r, right, r, cls="grid")
        f.line(c, y1, c, y1 + 4, cls="tick")
        f.text(c, y1 + 16, str(k), cls="sm dim")
        f.line(x0 - 4, r, x0, r, cls="tick")
        f.text(x0 - 8, r + 4, str(k), cls="sm dim", anchor="end")
    f.arrow(x0, y1, right + 12, y1, colour="var(--axis)", width=1.1)
    f.arrow(x0, y1, x0, top - 12, colour="var(--axis)", width=1.1)
    f.text(right + 16, y1 + 4, "x", cls="sm dim", anchor="start")
    f.text(x0 - 6, top - 16, "y", cls="sm dim", anchor="end")
    out = {}
    for i in range(3):
        for j in range(3):
            cx, cy = x0 + (i + 0.5) * cell, y1 - (j + 0.5) * cell
            rad = scale * cell * math.sqrt(JOINT[i][j] / pmax)
            colour, op = style(i, j) if style else (BLUE, "0.5")
            f.circle(cx, cy, rad, fill=colour, fill_opacity=op, stroke=colour,
                     stroke_width="1.3")
            out[i, j] = (cx, cy, rad)
    return out


@figure("Joint Probability Function", "A three-by-three lattice of points (x, y), each "
        "carrying a disc whose area is the probability of that pair", width=WID)
def joint_probability_function() -> Fig:
    f = vcard()

    _p_joint_grid(f, 72, 346, 84)
    return f


@figure("Marginal Probability Function", "The joint probabilities as discs on a "
        "three-by-three lattice, with each column's total drawn as a bar above it and "
        "each row's total as a bar beside it", width=WID)
def marginal_probability_function() -> Fig:
    f = vcard()

    x0, y1, cell = 62, 362, 66
    _p_joint_grid(f, x0, y1, cell)
    top, right = y1 - 3 * cell, x0 + 3 * cell
    for k in range(3):
        px = sum(JOINT[k])
        py = sum(JOINT[i][k] for i in range(3))
        c, r = x0 + (k + 0.5) * cell, y1 - (k + 0.5) * cell
        hgt = 130 * px
        f.rect(c - 14, top - 18 - hgt, 28, hgt, rx=3, fill=AMBER, fill_opacity="0.7")
        wid = 130 * py
        f.rect(right + 24, r - 14, wid, 28, rx=3, fill=GREEN, fill_opacity="0.7")
    f.line(x0, top - 18, right, top - 18, cls="axis")
    f.line(right + 24, top, right + 24, y1, cls="axis")
    f.text(x0 - 8, top - 50, "pₓ", cls="sm bold", anchor="end")
    f.text(right + 24, top - 6, "p_Y", cls="sm bold", anchor="start")
    return f


@figure("Conditional Probability Function", "The joint probabilities as discs on a "
        "lattice with every column but x = 1 faded, and each disc in that column ringed "
        "at its renormalised size", width=WID)
def conditional_probability_function() -> Fig:
    f = vcard()

    x0, y1, cell, scale = 72, 346, 84, 0.3
    row = JOINT[1]
    total = sum(row)
    discs = _p_joint_grid(
        f, x0, y1, cell, scale=scale,
        style=lambda i, j: (VIOLET, "0.55") if i == 1 else ("var(--dim)", "0.18"))
    for j in range(3):
        cx, cy, rad = discs[1, j]
        f.circle(cx, cy, rad / math.sqrt(total), fill="none", stroke=VIOLET,
                 stroke_width="1.6", stroke_dasharray="4 3")
        f.text(cx, cy + 4, f"{row[j] / total:.2f}", cls="sm bold")
    f.text(x0 + 1.5 * cell, y1 - 3 * cell - 8, f"÷ {total:.2f}", cls="sm bold")
    return f


@figure("Joint Cumulative Distribution Function", "Contours of a joint density with the "
        "quadrant below and to the left of the point (x, y) shaded", width=WID)
def joint_cdf() -> Fig:
    f = vcard()

    px0, py0, side = 78, 92, 240
    f.rect(px0, py0, side, side, rx=4, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1")
    ccx, ccy = px0 + side * 0.5, py0 + side * 0.5
    for k in (1, 1.8, 2.6):
        f.raw(f'<ellipse cx="{ccx}" cy="{ccy}" rx="{34 * k:.0f}" ry="{22 * k:.0f}" '
              f'transform="rotate(-30 {ccx} {ccy})" fill="none" stroke="var(--axis)" '
              f'stroke-width="1"/>')
    xq, yq = px0 + side * 0.62, py0 + side * 0.4
    f.rect(px0, yq, xq - px0, py0 + side - yq, fill=BLUE, fill_opacity="0.3")
    f.line(xq, py0, xq, py0 + side, cls="thin dash", stroke=BLUE, stroke_width="1.4")
    f.line(px0, yq, px0 + side, yq, cls="thin dash", stroke=BLUE, stroke_width="1.4")
    f.circle(xq, yq, 4.5, fill=BLUE)
    f.arrow(px0, py0 + side, px0 + side + 16, py0 + side, colour="var(--axis)", width=1.1)
    f.arrow(px0, py0 + side, px0, py0 - 12, colour="var(--axis)", width=1.1)
    f.text(xq, py0 + side + 18, "x", cls="sm dim")
    f.text(px0 - 10, yq + 4, "y", cls="sm dim", anchor="end")
    f.text(px0 + 44, py0 + side - 16, "F(x, y)", cls="bold")
    return f


@figure("Joint Probability Density Function", "The triangular support above the line "
        "y = x in the unit square, with an arrow at a fixed x running from the line up "
        "to y = 1", width=WID)
def joint_pdf() -> Fig:
    f = vcard()

    px0, py1, side = 84, 340, 228
    py0, px1 = py1 - side, px0 + side
    f.polygon([(px0, py1), (px1, py0), (px0, py0)], fill=BLUE, fill_opacity="0.22",
              stroke=BLUE, stroke_width="1.4")
    f.arrow(px0, py1, px1 + 20, py1, colour="var(--axis)", width=1.1)
    f.arrow(px0, py1, px0, py0 - 18, colour="var(--axis)", width=1.1)
    f.text(px1 + 26, py1 + 4, "x", cls="sm dim", anchor="start")
    f.text(px0 - 8, py0 - 22, "y", cls="sm dim", anchor="end")
    for v, lab in ((0, "0"), (1, "1")):
        f.text(px0 + v * side, py1 + 18, lab, cls="sm dim")
        f.text(px0 - 8, py1 - v * side + 4, lab, cls="sm dim", anchor="end")
    # Fix x, and y runs from the line y = x up to the top of the square.
    xv = 0.4
    xs, yd = px0 + side * xv, py1 - side * xv
    f.line(xs, py1, xs, yd, cls="thin dash", stroke="var(--dim)", stroke_width="1.2")
    f.line(xs, py1 - 4, xs, py1 + 4, cls="tick")
    f.text(xs, py1 + 18, "x", cls="sm bold")
    f.arrow(xs, yd - 2, xs, py0 + 4, colour=AMBER, width=2.2)
    f.circle(xs, yd, 3.6, fill=AMBER)
    f.text(px1 - 30, py0 + 70, "y = x", cls="sm bold", anchor="start")
    return f


@figure("Moments for Joint Distributions", "The joint probabilities as discs on a "
        "three-by-three lattice, with their balance point — the pair of means — marked "
        "by a crosshair", width=WID)
def moments_for_joint() -> Fig:
    f = vcard()

    x0, y1, cell = 72, 346, 84
    _p_joint_grid(f, x0, y1, cell, scale=0.36)
    ex = sum(i * sum(JOINT[i]) for i in range(3))
    ey = sum(j * JOINT[i][j] for i in range(3) for j in range(3))
    cx, cy = x0 + (ex + 0.5) * cell, y1 - (ey + 0.5) * cell
    f.line(cx, y1, cx, cy, cls="thin dash", stroke=AMBER, stroke_width="1.4")
    f.line(x0, cy, cx, cy, cls="thin dash", stroke=AMBER, stroke_width="1.4")
    f.circle(cx, cy, 9, fill="none", stroke=AMBER, stroke_width="2")
    f.line(cx - 14, cy, cx + 14, cy, cls="", stroke=AMBER, stroke_width="2")
    f.line(cx, cy - 14, cx, cy + 14, cls="", stroke=AMBER, stroke_width="2")
    f.text(cx + 12, cy - 16, "(E[X], E[Y])", cls="sm bold", anchor="start")
    return f


@figure("Covariance", "Covariance as the signed contribution of each quadrant around the "
        "means", width=WID)
def covariance() -> Fig:
    f = vcard()

    px0, py0, side = 84, 100, 220
    f.rect(px0, py0, side, side, rx=4, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1")
    mx, my = px0 + side / 2, py0 + side / 2
    for qx, qy, sign, colour in ((0, 0, "−", ROSE), (1, 0, "+", GREEN),
                                 (0, 1, "+", GREEN), (1, 1, "−", ROSE)):
        rx_, ry_ = px0 + qx * side / 2, py0 + qy * side / 2
        f.rect(rx_, ry_, side / 2, side / 2, fill=colour, fill_opacity="0.10")
        f.text(rx_ + side / 4, ry_ + side / 4 + 5, sign, cls="bold", fill=colour)
    f.line(mx, py0, mx, py0 + side, cls="thin", stroke="var(--dim)", stroke_width="1.2")
    f.line(px0, my, px0 + side, my, cls="thin", stroke="var(--dim)", stroke_width="1.2")
    for z1, z2 in _std_normals(7, 52):
        x = mx + z1 * side / 6.4
        y = my - (0.72 * z1 + 0.7 * z2) * side / 6.4
        if px0 + 3 < x < px0 + side - 3 and py0 + 3 < y < py0 + side - 3:
            f.circle(x, y, 2.8, fill=BLUE, fill_opacity="0.75")
    f.text(mx, py0 + side + 20, "μₓ", cls="sm dim")
    f.text(px0 - 8, my + 4, "μ_Y", cls="sm dim", anchor="end")
    f.text(BCX, 366, "Cov > 0: the + quadrants win", cls="sm dim")
    return f


@figure("Correlation Coefficient", "The same scatter cloud at six correlations, from a "
        "falling line through a shapeless blob to a rising line", width=WID)
def correlation_coefficient() -> Fig:
    f = vcard()

    # One cloud, drawn six times: only ρ changes, so the panels read as the same
    # points tilting rather than six unrelated pictures.
    cloud = _std_normals(23, 64)
    pw = 92
    for i, rho in enumerate((-1, -0.8, -0.4, 0, 0.6, 1)):
        px = 28 + (i % 3) * 106
        py = 100 + (i // 3) * 130
        f.rect(px, py, pw, pw, rx=4, fill="var(--soft)", stroke="var(--edge)",
               stroke_width="1")
        scale, spread = pw / 6.6, math.sqrt(1 - rho * rho)
        for z1, z2 in cloud:
            x = px + pw / 2 + z1 * scale
            y = py + pw / 2 - (rho * z1 + spread * z2) * scale
            if px + 3 < x < px + pw - 3 and py + 3 < y < py + pw - 3:
                f.circle(x, y, 2.1, fill=BLUE, fill_opacity="0.7")
        f.text(px + pw / 2, py + pw + 16, f"ρ = {rho:g}".replace("-", "−"),
               cls="sm bold")
    return f


@figure("Independent Random Variables", "Independent variables give a rectangular, "
        "untilted joint density", width=WID)
def independent_random_variables() -> Fig:
    f = vcard()

    for k, (label, rot, colour) in enumerate((("Independent", 0, GREEN),
                                              ("Dependent", -30, ROSE))):
        px0, py0, side = 106, 88 + k * 156, 148
        cx, cy = px0 + side / 2, py0 + side / 2
        f.rect(px0, py0, side, side, rx=4, fill="var(--soft)", stroke="var(--edge)",
               stroke_width="1")
        for j, op in ((1.0, "0.28"), (1.7, "0.17"), (2.4, "0.08")):
            f.raw(f'<ellipse cx="{cx}" cy="{cy}" rx="{25 * j:.0f}" ry="{17 * j:.0f}" '
                  f'transform="rotate({rot} {cx} {cy})" fill="{colour}" '
                  f'fill-opacity="{op}" stroke="{colour}" stroke-width="1"/>')
        f.arrow(px0, py0 + side, px0 + side + 12, py0 + side, colour="var(--axis)",
                width=1.1)
        f.arrow(px0, py0 + side, px0, py0 - 10, colour="var(--axis)", width=1.1)
        f.text(px0 + side + 24, py0 + side / 2, label, cls="sm bold", fill=colour,
               anchor="middle")
        f.text(px0 + side + 24, py0 + side / 2 + 16,
               "Cov = 0" if k == 0 else "Cov ≠ 0", cls="sm dim", anchor="middle")
    return f


@figure("Order Statistics", "A sample sorted into order statistics, with the densities of "
        "the minimum and maximum", width=WID)
def order_statistics() -> Fig:
    f = vcard()

    sample = [0.62, 0.18, 0.87, 0.41, 0.29]
    lx0, lx1 = 68, 300
    for row, (vals, lab, colour) in enumerate((
            (sample, "X₁ … X₅  as observed", "var(--dim)"),
            (sorted(sample), "X₍₁₎ … X₍₅₎  sorted", BLUE))):
        y = 108 + row * 74
        f.arrow(lx0 - 12, y, lx1 + 14, y, colour="var(--axis)", width=1.1)
        for i, v in enumerate(vals):
            x = lx0 + v * (lx1 - lx0)
            f.circle(x, y, 5, fill=colour)
            f.text(x, y - 12, f"{'X' if row == 0 else 'X₍'}{i + 1}{'' if row == 0 else '₎'}",
                   cls="sm dim")
        f.text((lx0 + lx1) / 2, y + 24, lab, cls="sm dim")
    f.arrow(44, 146, 44, 170, colour=VIOLET, width=1.5)
    f.text(52, 164, "sort", cls="sm", fill=VIOLET, anchor="start")

    a = Axes(f, 68, 240, 314, 348, 0, 1, 0, 5.2)
    a.curve(lambda t: 5 * (1 - t) ** 4, colour=AMBER)
    a.curve(lambda t: 5 * t ** 4, colour=ROSE)
    a.frame(xticks=[0, 1], yticks=[])
    f.text(a.px(0.18), a.py(3.4), "min", cls="sm bold", fill=AMBER)
    f.text(a.px(0.82), a.py(3.4), "max", cls="sm bold", fill=ROSE)
    f.text((a.x0 + a.x1) / 2, a.y1 + 34, "Uniform(0, 1), n = 5", cls="sm dim")
    return f


@figure("Variance for Conditional and Marginal Distributions", "The law of total variance "
        "splitting spread into within-group and between-group parts", width=WID)
def conditional_variance() -> Fig:
    f = vcard()

    a = vaxes(f, 0, 10, 0, 0.62, top=44)
    groups = [(2.4, 0.62, BLUE, "Y = 1"), (5.0, 0.62, VIOLET, "Y = 2"),
              (7.6, 0.62, GREEN, "Y = 3")]
    for mu, sd, colour, lab in groups:
        a.curve(lambda t, m=mu, s=sd: _npdf(t, m, s) / 3, colour=colour, width=1.7)
        a.vline(mu, y_top=0.24, colour=colour)
        a.label(mu, 0.235, lab, cls="sm", dy=-6)
    a.curve(lambda t: sum(_npdf(t, m, s) for m, s, _, _ in groups) / 3, colour=AMBER,
            width=2.2)
    a.frame(xlabel="x", ylabel="density")
    a.label(9.4, 0.15, "marginal", cls="sm bold", anchor="end", fill=AMBER)
    x1, y1 = a.p(2.4 - 0.62, 0.06)
    x2, _ = a.p(2.4 + 0.62, 0.06)
    f.arrow(x1, y1, x2, y1, colour=BLUE, width=1.2)
    f.arrow(x2, y1, x1, y1, colour=BLUE, width=1.2)
    f.text(a.px(2.4), y1 + 16, "within", cls="sm", fill=BLUE)
    bx1, by1 = a.p(2.4, 0.31)
    bx2, _ = a.p(7.6, 0.31)
    f.arrow(bx1, by1, bx2, by1, colour=ROSE, width=1.2)
    f.arrow(bx2, by1, bx1, by1, colour=ROSE, width=1.2)
    f.text(a.px(5.0), by1 - 8, "between", cls="sm", fill=ROSE)
    return f


@figure("Linear Combinations of Random Variables", "Several variables collapsing into one "
        "weighted sum", width=WID)
def linear_combinations() -> Fig:
    f = vcard()

    for i, (mu, sd, colour, lab) in enumerate(((0, 1.0, BLUE, "c₁X₁"),
                                               (0, 0.7, VIOLET, "c₂X₂"),
                                               (0, 1.3, GREEN, "c₃X₃"))):
        px = 30 + i * 104
        a = Axes(f, px, 96, px + 92, 156, -3.4, 3.4, 0, 0.6)
        a.area(lambda t, s=sd: _npdf(t, mu, s), -3.4, 3.4, colour=colour, opacity="0.18")
        a.curve(lambda t, s=sd: _npdf(t, mu, s), colour=colour, width=1.7)
        f.line(px, 156, px + 92, 156, cls="axis")
        f.text(px + 46, 90, lab, cls="sm bold", fill=colour)
        f.arrow(px + 46, 166, 180, 206, colour="var(--dim)", width=1.2, dash=True)

    a = Axes(f, 60, 232, 320, 348, -5, 5, 0, 0.30)
    tot = math.sqrt(1.0 ** 2 + 0.7 ** 2 + 1.3 ** 2)
    a.area(lambda t: _npdf(t, 0, tot), -5, 5, colour=AMBER, opacity="0.2")
    a.curve(lambda t: _npdf(t, 0, tot), colour=AMBER, width=2.2)
    a.frame(xticks=[0], xfmt=lambda t: "E[L]")
    f.text(190, 226, "L = c₁X₁ + c₂X₂ + c₃X₃", cls="bold", fill=AMBER)
    return f


@figure("Moments for Linear Combinations", "Variance of a sum with and without the "
        "covariance term", width=WID)
def moments_for_linear_combinations() -> Fig:
    f = vcard()

    scale = 280 / (1.0 + 0.7 + 2 * 0.35)
    for k, (head, cov, colour) in enumerate((("Independent", 0.0, GREEN),
                                             ("Positively correlated", 0.35, ROSE))):
        y = 100 + k * 148
        f.text(BCX, y, head, cls="bold", fill=colour)
        segs = [(1.0, BLUE, "Var(X₁)"), (0.7, VIOLET, "Var(X₂)")]
        if cov:
            segs.append((2 * cov, ROSE, "2 Cov"))
        x = 40
        for v, c, _ in segs:
            wpx = v * scale
            f.rect(x, y + 16, wpx, 36, rx=3, fill=c, fill_opacity="0.55")
            f.text(x + wpx / 2, y + 40, f"{v:.2f}", cls="sm bold")
            x += wpx
        f.line(40, y + 62, x, y + 62, cls="", stroke=colour, stroke_width="1.8")
        f.text((40 + x) / 2, y + 80, f"Var = {1.7 + 2 * cov:.2f}", cls="bold")
        for i, (_, c, lab) in enumerate(segs):
            lx = 40 + i * 96
            f.line(lx, y + 98, lx + 12, y + 98, cls="", stroke=c, stroke_width="2.6",
                   stroke_linecap="round")
            f.text(lx + 18, y + 102, lab, cls="sm dim", anchor="start")
    return f


@figure("Probabilities for Linear Combinations", "A sum of independent normals is normal "
        "with added means and added variances", width=WID)
def probabilities_for_linear_combinations() -> Fig:
    f = vcard()

    a = vaxes(f, -2, 22, 0, 0.34, top=30)
    a.curve(lambda t: _npdf(t, 5, 1.4), colour=BLUE)
    a.curve(lambda t: _npdf(t, 8, 2.0), colour=VIOLET)
    a.curve(lambda t: _npdf(t, 13, math.sqrt(1.4 ** 2 + 2.0 ** 2)), colour=AMBER,
            width=2.4)
    a.frame(xlabel="value", ylabel="density", xticks=[5, 8, 13], xfmt=lambda t: f"{t:g}")
    a.label(5, _npdf(0, 0, 1.4), "X₁", cls="sm bold", fill=BLUE, dy=-8)
    a.label(8, _npdf(0, 0, 2.0), "X₂", cls="sm bold", fill=VIOLET, dy=-8)
    a.label(13, _npdf(0, 0, math.sqrt(1.4 ** 2 + 2.0 ** 2)), "X₁ + X₂", cls="sm bold",
            fill=AMBER, dy=-8)
    return f


@figure("Central Limit Theorem", "The density of the sample mean of n uniform draws, "
        "flat at n = 1 and normal by n = 30", width=WID)
def central_limit_theorem() -> Fig:
    f = vcard()

    bars, x0, x1, ph = 26, 84, 326, 54
    bw = (x1 - x0) / bars
    for row, n in enumerate((1, 2, 5, 30)):
        py = 92 + row * 72
        dens = [_mean_density(n, j, bars) for j in range(bars)]
        peak = max(dens)
        for j, d in enumerate(dens):
            hgt = d / peak * ph
            f.rect(x0 + j * bw + 0.5, py + ph - hgt, bw - 1, hgt, rx=1, fill=BLUE,
                   fill_opacity="0.6")
        f.line(x0, py + ph, x1, py + ph, cls="axis")
        f.text(x0 - 12, py + ph - 4, f"n = {n}", cls="sm bold", anchor="end")
        if n == 30:
            # Each panel is scaled to its own peak, so the convergence shows up as
            # the spread narrowing — with the limiting normal drawn over the last.
            mu, sd = 0.5, 1 / math.sqrt(12 * n)
            top = _npdf(mu, mu, sd)
            f.poly([(x0 + t / 80 * (x1 - x0), py + ph - _npdf(t / 80, mu, sd) / top * ph)
                    for t in range(81)], cls="curve", stroke=ROSE, stroke_width="1.8")
            f.text(x1, py - 4, "N(μ, σ²/n)", cls="sm bold", fill=ROSE, anchor="end")
    f.note(BCX, 380, "sample mean x̄ of n Uniform(0, 1) draws")
    return f
