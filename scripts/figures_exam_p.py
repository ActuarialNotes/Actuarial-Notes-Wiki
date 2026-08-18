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

@figure("Probability", "Five of twelve equally likely outcomes shaded, and the "
        "resulting probability marked on a 0-to-1 scale", width=WID)
def probability() -> Fig:
    f = vcard("Probability counts the outcomes that work",
              "P(E) = |E| / |S| = 5/12 ≈ 0.42")

    universe(f, 40, 82, 280, 168, "S")
    shaded = {0, 1, 4, 6, 9}
    for i in range(12):
        cx, cy = 86 + (i % 4) * 62, 122 + (i // 4) * 52
        on = i in shaded
        f.circle(cx, cy, 19, fill=BLUE if on else "var(--surf)",
                 fill_opacity="0.85" if on else "1",
                 stroke=BLUE if on else "var(--edge)", stroke_width="1.4")
    f.text(BCX, 278, "5 of the 12 outcomes are in E", cls="sm dim")

    x0, x1, y = 60, 300, 342
    f.rect(x0, y - 8, x1 - x0, 16, rx=8, fill="var(--soft)", stroke="var(--edge)")
    f.rect(x0, y - 8, (x1 - x0) * 5 / 12, 16, rx=8, fill=BLUE, fill_opacity="0.55")
    for v, lab in ((0, "0"), (1, "1")):
        x = x0 + (x1 - x0) * v
        f.line(x, y + 10, x, y + 15, cls="tick")
        f.text(x, y + 28, lab, cls="sm dim")
    x = x0 + (x1 - x0) * 5 / 12
    f.arrow(x, y - 34, x, y - 12, colour=BLUE, width=1.6)
    f.text(x, y - 40, "P(E)", cls="sm bold", fill=BLUE)
    return f


@figure("Set Function", "A set function mapping events to real numbers", width=WID)
def set_function() -> Fig:
    f = vcard("A set function maps sets to numbers", "f : 𝓕 → ℝ")

    universe(f, 30, 84, 176, 176, "S")
    blobs = [(118, 116, "A", BLUE, 0.80), (118, 172, "B", AMBER, 0.48),
             (118, 228, "C", GREEN, 0.18)]
    for cx, cy, lab, colour, _ in blobs:
        f.ellipse(cx, cy, 56, 20, fill=colour, fill_opacity="0.16", stroke=colour,
                  stroke_width="1.4")
        f.text(cx, cy + 5, lab, cls="bold", fill=colour)
    f.text(192, 100, "𝓕", cls="sm dim", anchor="end")

    ax, ay0, ay1 = 268, 96, 268
    f.arrow(ax, ay1 + 8, ax, ay0 - 10, colour="var(--axis)", width=1.1)
    f.text(ax - 8, ay0 - 14, "ℝ", cls="sm dim", anchor="end")
    for cx, cy, _, colour, v in blobs:
        y = ay1 - (ay1 - ay0) * v
        f.arrow(cx + 60, cy, ax - 10, y, colour=colour, width=1.1, dash=True)
        f.line(ax - 4, y, ax + 4, y, cls="tick")
        f.circle(ax, y, 4, fill=colour)
    for lab, colour, v in (("f(A)", BLUE, 0.80), ("f(B)", AMBER, 0.48),
                           ("f(C)", GREEN, 0.18)):
        y = ay1 - (ay1 - ay0) * v
        f.text(ax + 12, y + 4, lab, cls="sm", anchor="start", fill=colour)
    f.text(BCX, 320, "probability is the set function with f(S) = 1", cls="sm dim")
    return f


@figure("Sample Space", "A sample space partitioned into its elementary outcomes",
        width=WID)
def sample_space() -> Fig:
    f = vcard("The sample space lists every outcome once", "S = {ω₁, ω₂, …, ω₆}")

    universe(f, 36, 86, 288, 234, "S")
    for i in range(6):
        cx = 96 + (i % 3) * 84
        cy = 152 + (i // 3) * 100
        f.circle(cx, cy, 36, fill=BLUE, fill_opacity="0.12", stroke=BLUE,
                 stroke_width="1.4")
        f.text(cx, cy + 6, f"ω{'₁₂₃₄₅₆'[i]}", cls="")
    f.text(BCX, 350, "one roll of a die", cls="sm dim")
    return f


@figure("Event", "An event as a subset of the sample space, simple versus compound",
        width=WID)
def event() -> Fig:
    f = vcard("An event is a subset of the sample space",
              "E ⊆ S,   F = {ω₄} is a simple event")

    universe(f, 30, 92, 296, 232, "S")
    f.ellipse(116, 196, 74, 68, fill=BLUE, fill_opacity="0.15", stroke=BLUE,
              stroke_width="1.6")
    f.text(116, 118, "E", cls="bold", fill=BLUE)
    f.ellipse(258, 168, 30, 28, fill=VIOLET, fill_opacity="0.15", stroke=VIOLET,
              stroke_width="1.6")
    f.text(258, 126, "F", cls="bold", fill=VIOLET)
    for x, y in ((88, 166), (152, 158), (210, 180), (258, 168),
                 (96, 236), (156, 248), (216, 238), (276, 280)):
        f.circle(x, y, 4.5, fill="var(--dim)")
    f.text(BCX, 352, "outcomes ω ∈ S", cls="sm dim")
    return f


@figure("Axioms of Probability", "The three Kolmogorov axioms shown as diagrams",
        width=WID)
def axioms_of_probability() -> Fig:
    f = vcard("Kolmogorov's three axioms", "P(⋃ Eᵢ) = Σ P(Eᵢ)  for disjoint Eᵢ")

    for i, label in enumerate(("P(S) = 1", "P(E) ≥ 0", "P(E₁ ∪ E₂) = P(E₁) + P(E₂)")):
        y = 74 + i * 106
        f.box(26, y, 308, 92, colour=None)
        f.text(180, y + 78, label, cls="bold")

        if i == 0:
            f.rect(126, y + 14, 108, 44, rx=6, fill=BLUE, fill_opacity="0.22",
                   stroke=BLUE, stroke_width="1.4")
            f.text(180, y + 42, "S", cls="bold")
        elif i == 1:
            base = y + 46
            f.line(112, base, 250, base, cls="axis")
            f.line(181, base - 4, 181, base + 4, cls="tick")
            f.text(181, base + 16, "0", cls="sm dim")
            f.arrow(184, base - 12, 246, base - 12, colour=GREEN, width=1.6)
            f.arrow(178, base - 12, 116, base - 12, colour=ROSE, width=1.6)
            f.text(147, base - 18, "✗", cls="sm bold", fill=ROSE)
        else:
            f.circle(146, y + 36, 24, fill=AMBER, fill_opacity="0.2", stroke=AMBER,
                     stroke_width="1.4")
            f.circle(214, y + 36, 24, fill=VIOLET, fill_opacity="0.2", stroke=VIOLET,
                     stroke_width="1.4")
            f.text(146, y + 41, "E₁", cls="sm")
            f.text(214, y + 41, "E₂", cls="sm")
    return f


@figure("Set Theory", "Union, intersection, complement and difference on Venn diagrams",
        width=WID)
def set_theory() -> Fig:
    f = vcard("Set operations are the language of events", "P(Aᶜ) = 1 − P(A)")

    labels = ["A ∪ B", "A ∩ B", "Aᶜ", "A \\ B"]
    for i, lab in enumerate(labels):
        cx = 100 + (i % 2) * 160
        cy = 136 + (i // 2) * 148
        r, sep = 36, 36
        ax, bx = cx - sep / 2, cx + sep / 2
        px, py, pw, ph = cx - 70, cy - 52, 140, 104
        f.rect(px, py, pw, ph, rx=7, fill="var(--soft)", stroke="var(--edge)",
               stroke_width="1")
        f.text(px + 11, py + 15, "S", cls="sm dim")

        # Regions are painted with clip paths so each operation shades exactly
        # the right area at a single, uniform opacity.
        cid = f"clipA{i}"
        f.defs.append(f'<clipPath id="{cid}"><circle cx="{ax}" cy="{cy}" r="{r}"/></clipPath>')
        blank = "var(--soft)"
        if i == 0:      # union — one group so the overlap isn't double-painted
            f.raw(f'<g opacity="0.22" fill="{BLUE}">'
                  f'<circle cx="{ax}" cy="{cy}" r="{r}"/>'
                  f'<circle cx="{bx}" cy="{cy}" r="{r}"/></g>')
        elif i == 1:    # intersection — B, clipped to A
            f.raw(f'<g clip-path="url(#{cid})">'
                  f'<circle cx="{bx}" cy="{cy}" r="{r}" fill="{BLUE}" '
                  f'fill-opacity="0.3"/></g>')
        elif i == 2:    # complement — the whole space, then punch out A
            f.rect(px, py, pw, ph, rx=7, fill=BLUE, fill_opacity="0.22")
            f.circle(ax, cy, r, fill=blank)
        else:           # difference — A, then punch out the lens
            f.circle(ax, cy, r, fill=BLUE, fill_opacity="0.22")
            f.raw(f'<g clip-path="url(#{cid})">'
                  f'<circle cx="{bx}" cy="{cy}" r="{r}" fill="{blank}"/></g>')
        f.circle(ax, cy, r, fill="none", stroke=BLUE, stroke_width="1.4")
        f.circle(bx, cy, r, fill="none", stroke=AMBER, stroke_width="1.4")
        f.text(ax - 26, cy - 28, "A", cls="sm bold", fill=BLUE)
        f.text(bx + 26, cy - 28, "B", cls="sm bold", fill=AMBER)
        f.text(cx, cy + 74, lab, cls="bold")
    return f


@figure("Venn Diagram", "Two overlapping events with all four region probabilities "
        "filled in", width=WID)
def venn_diagram() -> Fig:
    f = vcard("Fill the overlap first, then work outwards",
              ["P(A ∪ B) = P(A) + P(B) − P(A ∩ B)",
               "= 0.70 + 0.40 − 0.20 = 0.90"])

    sx, sy, sw, sh = 32, 108, 296, 200
    universe(f, sx, sy, sw, sh)
    cy = sy + sh / 2 + 6
    (ax, _), (bx, _) = venn2(f, sx + sw / 2, cy, r=66, sep=68)
    # The four regions a question can ask for, each carrying its probability.
    f.text(ax - 30, cy + 5, "0.50", cls="bold", fill=BLUE)
    f.text((ax + bx) / 2, cy + 5, "0.20", cls="bold")
    f.text(bx + 30, cy + 5, "0.20", cls="bold", fill=AMBER)
    f.text(sx + sw - 34, sy + sh - 32, "neither", cls="sm dim")
    f.text(sx + sw - 34, sy + sh - 14, "0.10", cls="bold dim")
    f.note(BCX, 336, "P(A) = 0.70 auto,   P(B) = 0.40 home")
    return f


@figure("Combinatorics", "Counting ordered arrangements versus unordered selections",
        width=WID)
def combinatorics() -> Fig:
    f = vcard("Choosing k from n: the two questions",
              ["P(n, k) = n! / (n − k)!", "C(n, k) = P(n, k) / k!"])

    x0, cw, gap = 100, 118, 4
    f.text(x0 + cw / 2, 100, "no repeats", cls="sm dim")
    f.text(x0 + cw + gap + cw / 2, 100, "repeats", cls="sm dim")
    rows = [
        ("Order", "matters", [("n!/(n−k)!", "12", VIOLET), ("nᵏ", "16", AMBER)]),
        ("Order", "ignored", [("n!/[k!(n−k)!]", "6", GREEN),
                              ("C(n+k−1, k)", "10", TEAL)]),
    ]
    for r, (head, sub, cells) in enumerate(rows):
        y = 110 + r * 96
        f.text(92, y + 34, head, cls="sm bold", anchor="end")
        f.text(92, y + 50, sub, cls="sm bold", anchor="end")
        for c, (formula, value, colour) in enumerate(cells):
            x = x0 + c * (cw + gap)
            f.box(x, y, cw, 80, colour=colour)
            f.text(x + cw / 2, y + 34, formula, cls="sm mono")
            f.text(x + cw / 2, y + 58, value, cls="bold", fill=colour)
    f.text(BCX, 326, "counts for n = 4, k = 2", cls="sm dim")
    return f


@figure("Combination", "The six unordered pairs chosen from four objects", width=WID)
def combination() -> Fig:
    f = vcard("Order ignored: C(4, 2) = 6", "C(n, k) = n! / [k! (n − k)!]")

    for i, o in enumerate("ABCD"):
        cx = 78 + i * 68
        f.circle(cx, 104, 18, fill=BLUE, fill_opacity="0.14", stroke=BLUE,
                 stroke_width="1.4")
        f.text(cx, 110, o, cls="")
    f.text(BCX, 152, "choose 2 of these 4", cls="sm dim")

    for i, (a, b) in enumerate((("A", "B"), ("A", "C"), ("A", "D"),
                                ("B", "C"), ("B", "D"), ("C", "D"))):
        cx = 90 + (i % 3) * 90
        cy = 200 + (i // 3) * 62
        f.rect(cx - 32, cy - 18, 64, 36, rx=7, fill=GREEN, fill_opacity="0.14",
               stroke=GREEN, stroke_width="1.3")
        f.text(cx, cy + 6, f"{a}{b}", cls="")
    f.text(BCX, 322, "AB and BA are the same choice", cls="sm dim")
    return f


@figure("Permutation", "The twelve ordered pairs drawn from four objects", width=WID)
def permutation() -> Fig:
    f = vcard("Order matters: P(4, 2) = 12", "P(n, k) = n! / (n − k)!")

    ordered = [("A", "B"), ("B", "A"), ("A", "C"), ("C", "A"),
               ("A", "D"), ("D", "A"), ("B", "C"), ("C", "B"),
               ("B", "D"), ("D", "B"), ("C", "D"), ("D", "C")]
    for i, (a, b) in enumerate(ordered):
        cx = 76 + (i % 4) * 72
        cy = 116 + (i // 4) * 66
        colour = VIOLET if i % 2 == 0 else BLUE
        f.rect(cx - 30, cy - 17, 60, 34, rx=7, fill=colour, fill_opacity="0.13",
               stroke=colour, stroke_width="1.3")
        f.text(cx, cy + 5, f"{a}{b}", cls="")
    f.text(BCX, 332, "AB ≠ BA — each pair counted twice", cls="sm dim")
    return f


@figure("Independent Events", "Independence as a product of areas on the unit square",
        width=WID)
def independent_events() -> Fig:
    f = vcard("Independence multiplies the areas",
              ["P(A ∩ B) = P(A) · P(B)", "0.6 × 0.5 = 0.30"])

    x0, y0, side = 92, 106, 200
    pa, pb = 0.6, 0.5
    f.rect(x0, y0, side, side, rx=4, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    f.rect(x0, y0, side * pa, side, fill=BLUE, fill_opacity="0.14")
    f.rect(x0, y0, side, side * pb, fill=AMBER, fill_opacity="0.14")
    f.rect(x0, y0, side * pa, side * pb, fill=GREEN, fill_opacity="0.32")
    f.line(x0 + side * pa, y0, x0 + side * pa, y0 + side, cls="thin", stroke=BLUE,
           stroke_width="1.4")
    f.line(x0, y0 + side * pb, x0 + side, y0 + side * pb, cls="thin", stroke=AMBER,
           stroke_width="1.4")
    brace(f, x0, x0 + side * pa, y0 + side + 8, depth=8, label="P(A) = 0.6", colour=BLUE)
    f.text(x0 - 10, y0 + side * pb / 2, "P(B)", cls="sm", anchor="end", fill=AMBER)
    f.text(x0 - 10, y0 + side * pb / 2 + 15, "= 0.5", cls="sm", anchor="end", fill=AMBER)
    f.text(x0 + side * pa / 2, y0 + side * pb / 2 + 5, "0.30", cls="bold", fill=GREEN)
    f.text(BCX, 358, "knowing B tells you nothing about A", cls="sm dim")
    return f


@figure("Mutually Exclusive Events", "Disjoint events versus overlapping events",
        width=WID)
def mutually_exclusive_events() -> Fig:
    f = vcard("Mutually exclusive events cannot overlap",
              "A ∩ B = ∅  ⇒  P(A ∪ B) = P(A) + P(B)")

    for i, (sep, caption) in enumerate(((92, "A ∩ B = ∅"), (48, "A ∩ B ≠ ∅"))):
        y = 88 + i * 150
        cy = y + 62
        f.rect(34, y, 292, 124, rx=8, fill="var(--soft)", stroke="var(--edge)",
               stroke_width="1")
        f.text(46, y + 16, "S", cls="sm dim")
        if i == 1:
            f.defs.append(f'<clipPath id="meA"><circle cx="{180 - sep / 2}" cy="{cy}" '
                          f'r="46"/></clipPath>')
        venn2(f, 180, cy, r=46, sep=sep, colours=(BLUE, AMBER))
        if i == 1:
            f.raw(f'<g clip-path="url(#meA)"><circle cx="{180 + sep / 2}" cy="{cy}" '
                  f'r="46" fill="{ROSE}" fill-opacity="0.4"/></g>')
        f.text(180, y + 144, caption, cls="bold",
               fill=BLUE if i == 0 else ROSE)
    return f


@figure("Probability Addition Rule", "The addition rule correcting for a double-counted "
        "overlap", width=WID)
def probability_addition_rule() -> Fig:
    f = vcard("Subtract the double-counted overlap",
              ["P(A ∪ B) = P(A) + P(B) − P(A ∩ B)", "0.45 + 0.40 − 0.15 = 0.70"])

    cx, cy, r, sep = 180, 200, 78, 78
    f.rect(28, 100, 304, 200, rx=8, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1")
    f.text(42, 120, "S", cls="sm dim")
    ax, bx = cx - sep / 2, cx + sep / 2
    f.circle(ax, cy, r, fill=BLUE, fill_opacity="0.18", stroke=BLUE, stroke_width="1.6")
    f.circle(bx, cy, r, fill=AMBER, fill_opacity="0.18", stroke=AMBER, stroke_width="1.6")
    hh = math.sqrt(r * r - (sep / 2) ** 2)
    f.path(f"M{cx},{cy - hh:.2f} A{r},{r} 0 0 1 {cx},{cy + hh:.2f} "
           f"A{r},{r} 0 0 1 {cx},{cy - hh:.2f} Z",
           cls="", fill=ROSE, fill_opacity="0.4", stroke="none")
    f.text(ax - 36, cy + 5, "0.30", cls="")
    f.text(cx, cy + 5, "0.15", cls="bold")
    f.text(bx + 36, cy + 5, "0.25", cls="")
    f.text(ax - 44, cy - 62, "A", cls="bold", fill=BLUE)
    f.text(bx + 44, cy - 62, "B", cls="bold", fill=AMBER)
    f.text(BCX, 330, "the overlap belongs to both circles", cls="sm dim")
    return f


@figure("Probability Multiplication Rule", "A two-stage probability tree whose branch "
        "probabilities multiply", width=WID)
def probability_multiplication_rule() -> Fig:
    f = vcard("Chain the stages: P(A), then P(B | A)",
              "P(A ∩ B) = P(A) · P(B | A) = 0.24")

    f.circle(180, 92, 6, fill="var(--dim)")
    stage1 = ((96, "A", 0.30, BLUE), (264, "Aᶜ", 0.70, "var(--dim)"))
    for x, lab, p, colour in stage1:
        f.arrow(180, 100, x, 168, colour=colour, width=1.5)
        f.text((180 + x) / 2 + (-14 if x < 180 else 14), 132, f"{p:.2f}", cls="sm",
               fill=colour)
        f.circle(x, 184, 17, fill=colour, fill_opacity="0.14", stroke=colour,
                 stroke_width="1.4")
        f.text(x, 190, lab, cls="")

    leaves = [(96, 56, "B", 0.80, GREEN, "0.24", True),
              (96, 148, "Bᶜ", 0.20, "var(--dim)", "0.06", False),
              (264, 216, "B", 0.10, GREEN, "0.07", False),
              (264, 308, "Bᶜ", 0.90, "var(--dim)", "0.63", False)]
    for x_from, x_to, lab, p, colour, product, strong in leaves:
        f.arrow(x_from, 201, x_to, 268, colour=colour, width=1.4)
        f.text((x_from + x_to) / 2 + (-14 if x_to < x_from else 14), 234, f"{p:.2f}",
               cls="sm", fill=colour)
        f.circle(x_to, 284, 17, fill=colour, fill_opacity="0.14", stroke=colour,
                 stroke_width="1.4")
        f.text(x_to, 290, lab, cls="")
        f.text(x_to, 322, product, cls="bold" if strong else "sm dim",
               fill=colour if strong else None)
    return f


@figure("Inclusion-Exclusion Principle", "Alternating signs over the seven regions of a "
        "three-set Venn diagram", width=WID)
def inclusion_exclusion() -> Fig:
    f = vcard("Alternating signs count each region once",
              ["P(A ∪ B ∪ C) = P(A) + P(B) + P(C)",
               "− P(A∩B) − P(A∩C) − P(B∩C) + P(A∩B∩C)"])

    cx, cy, r = 180, 216, 78
    centres = [(cx, cy - 42), (cx - 46, cy + 34), (cx + 46, cy + 34)]
    for (x, y), colour in zip(centres, (BLUE, AMBER, GREEN)):
        f.circle(x, y, r, fill=colour, fill_opacity="0.16", stroke=colour,
                 stroke_width="1.6")
    f.text(cx, cy - r - 52, "A", cls="bold", fill=BLUE)
    f.text(cx - r - 34, cy + r + 16, "B", cls="bold", fill=AMBER)
    f.text(cx + r + 34, cy + r + 16, "C", cls="bold", fill=GREEN)
    for x, y, s in ((cx, cy - 86, "+"), (cx - 74, cy + 62, "+"), (cx + 74, cy + 62, "+"),
                    (cx - 40, cy - 12, "−"), (cx + 40, cy - 12, "−"), (cx, cy + 62, "−"),
                    (cx, cy + 18, "+")):
        f.text(x, y + 4, s, cls="bold")
    return f


@figure("Conditional Probability", "Conditioning on B rescales the sample space to B",
        width=WID)
def conditional_probability() -> Fig:
    f = vcard("Conditioning shrinks the space to B",
              ["P(A | B) = P(A ∩ B) / P(B)", "= 0.12 / 0.40 = 0.30"])

    f.rect(30, 82, 300, 132, rx=8, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1")
    f.text(42, 100, "S", cls="sm dim")
    cx, cy, r, sep = 180, 148, 50, 54
    ax, bx = cx - sep / 2, cx + sep / 2
    f.circle(ax, cy, r, fill=BLUE, fill_opacity="0.16", stroke=BLUE, stroke_width="1.5")
    f.circle(bx, cy, r, fill=AMBER, fill_opacity="0.16", stroke=AMBER, stroke_width="1.5")
    hh = math.sqrt(r * r - (sep / 2) ** 2)
    f.path(f"M{cx},{cy - hh:.2f} A{r},{r} 0 0 1 {cx},{cy + hh:.2f} "
           f"A{r},{r} 0 0 1 {cx},{cy - hh:.2f} Z",
           cls="", fill=VIOLET, fill_opacity="0.4", stroke="none")
    f.text(ax - 30, cy - 40, "A", cls="bold", fill=BLUE)
    f.text(bx + 30, cy - 40, "B", cls="bold", fill=AMBER)
    f.text(cx, cy + 4, "0.12", cls="sm bold")
    f.text(bx + 26, cy + 4, "0.28", cls="sm")

    f.arrow(180, 224, 180, 250, colour="var(--dim)", width=1.5)
    f.text(196, 242, "given B", cls="sm dim", anchor="start")

    ccx, ccy, cr, frac = 180, 322, 60, 0.30
    f.circle(ccx, ccy, cr, fill=AMBER, fill_opacity="0.12", stroke=AMBER,
             stroke_width="1.6")
    theta = 2 * math.pi * frac
    ex, ey = ccx + cr * math.sin(theta), ccy - cr * math.cos(theta)
    f.path(f"M{ccx},{ccy} L{ccx},{ccy - cr} A{cr},{cr} 0 0 1 {ex:.2f},{ey:.2f} Z",
           cls="", fill=VIOLET, fill_opacity="0.42", stroke="none")
    f.line(ccx, ccy, ccx, ccy - cr, cls="thin", stroke=VIOLET, stroke_width="1.2")
    f.line(ccx, ccy, ex, ey, cls="thin", stroke=VIOLET, stroke_width="1.2")
    f.text(ccx + 84, ccy - 24, "A ∩ B", cls="sm bold", fill=VIOLET)
    f.text(ccx - 84, ccy + 24, "B", cls="bold", fill=AMBER)
    return f


@figure("Bayes Theorem", "The prior split into two columns whose shaded claim areas make "
        "up P(C), half of it high-risk", width=WID)
def bayes_theorem() -> Fig:
    f = vcard("The posterior is the claiming slice of the prior",
              ["P(H | C) = P(C | H) P(H) / P(C)", "= 0.08 / 0.16 = 0.50"])

    p_h, p_c_h, p_c_l = 0.20, 0.40, 0.10
    x0, y0, w, h = 70, 108, 240, 168
    split = x0 + w * p_h
    # Width is the prior, height within a column is the likelihood, so a shaded
    # area is a joint probability and the two shaded areas add to P(C).
    f.rect(x0, y0, w * p_h, h, fill=BLUE, fill_opacity="0.12")
    f.rect(split, y0, w * (1 - p_h), h, fill=ROSE, fill_opacity="0.12")
    f.rect(x0, y0 + h * (1 - p_c_h), w * p_h, h * p_c_h, fill=BLUE, fill_opacity="0.55")
    f.rect(split, y0 + h * (1 - p_c_l), w * (1 - p_h), h * p_c_l, fill=ROSE,
           fill_opacity="0.55")
    f.rect(x0, y0, w, h, rx=3, fill="none", stroke="var(--edge)", stroke_width="1.2")
    f.line(split, y0, split, y0 + h, cls="", stroke="var(--surf)", stroke_width="1.4")
    f.text(x0 + w * p_h / 2, y0 - 8, "H 0.20", cls="sm bold", fill=BLUE)
    f.text(split + w * (1 - p_h) / 2, y0 - 8, "L 0.80", cls="sm bold", fill=ROSE)
    f.text(x0 + w * p_h / 2, y0 + h - 28, "0.08", cls="sm bold")
    f.text(split + w * (1 - p_h) / 2, y0 + h - 4, "0.08", cls="sm bold")
    f.note(BCX, y0 + h + 20, "shaded = files a claim")

    # The same two shaded areas laid side by side: P(C), half of it blue.
    by = 312
    f.rect(80, by, 110, 26, rx=3, fill=BLUE, fill_opacity="0.55")
    f.rect(190, by, 110, 26, rx=3, fill=ROSE, fill_opacity="0.55")
    f.rect(80, by, 220, 26, rx=3, fill="none", stroke="var(--edge)", stroke_width="1.2")
    f.text(135, by + 17, "0.08", cls="sm bold")
    f.text(245, by + 17, "0.08", cls="sm bold")
    f.note(BCX, by + 48, "P(C) = 0.16 — the blue half is P(H | C)")
    return f


@figure("The Law of Total Probability", "B decomposed across a partition of the sample "
        "space", width=WID)
def law_of_total_probability() -> Fig:
    f = vcard("Split B across a partition, then weight",
              "P(B) = Σ P(B | Aᵢ) P(Aᵢ) = 0.19")

    x0, y0, w, h = 30, 88, 300, 152
    f.rect(x0, y0, w, h, rx=8, fill="var(--soft)", stroke="var(--edge)", stroke_width="1")
    parts = [("A₁", 0.30, 0.10, BLUE), ("A₂", 0.25, 0.40, AMBER),
             ("A₃", 0.25, 0.20, GREEN), ("A₄", 0.20, 0.05, VIOLET)]
    x = x0
    for lab, frac, _, colour in parts:
        pw = w * frac
        f.rect(x, y0, pw, h, fill=colour, fill_opacity="0.12")
        f.line(x, y0, x, y0 + h, cls="", stroke="var(--edge)", stroke_width="1")
        f.text(x + pw / 2, y0 + 20, lab, cls="bold", fill=colour)
        x += pw
    f.ellipse(x0 + w * 0.46, y0 + 92, 104, 42, fill=ROSE, fill_opacity="0.28",
              stroke=ROSE, stroke_width="1.6")
    f.text(x0 + w * 0.46, y0 + 97, "B", cls="bold", fill=ROSE)

    total = sum(p * q for _, p, q, _ in parts)
    bx, bw = 40, 280
    f.text(BCX, 284, "P(B) split into P(B | Aᵢ) P(Aᵢ)", cls="sm dim")
    x = bx
    for lab, p, q, colour in parts:
        seg = bw * (p * q) / total
        f.rect(x, 298, seg, 30, rx=3, fill=colour, fill_opacity="0.6")
        if seg > 26:
            f.text(x + seg / 2, 318, f"{p * q:.2f}", cls="sm bold")
        x += seg
    f.line(bx, 336, bx + bw, 336, cls="", stroke=ROSE, stroke_width="1.6")
    f.text(BCX, 356, f"P(B) = {total:.2f}", cls="bold", fill=ROSE)
    return f


@figure("Discrete Univariate Distributions", "The six discrete families on the syllabus, "
        "each drawn as a probability mass function", width=WID)
def discrete_univariate() -> Fig:
    f = vcard("The discrete families on the syllabus",
              ["p(k) = P(X = k),   Σ p(k) = 1",
               "variance ÷ mean:  <1 binomial, =1 Poisson"])

    def binom(n, p, k):
        c = math.factorial(n) / (math.factorial(k) * math.factorial(n - k))
        return c * p ** k * (1 - p) ** (n - k)

    specs = [
        ("Binomial", BLUE, [binom(8, 0.4, k) for k in range(9)]),
        ("Poisson", AMBER, [math.exp(-2.5) * 2.5 ** k / math.factorial(k)
                            for k in range(9)]),
        ("Geometric", GREEN, [0.45 * 0.55 ** k for k in range(9)]),
        ("Negative binomial", TEAL,
         [binom(k + 2, 0.5, 2) * 0.5 ** (k) if k >= 0 else 0 for k in range(9)]),
        ("Hypergeometric", VIOLET, [binom(8, 0.5, k) * (1.4 if k in (3, 4, 5) else 0.6)
                                    for k in range(9)]),
        ("Discrete uniform", ROSE, [0.16] * 6 + [0, 0, 0]),
    ]
    for i, (name, colour, masses) in enumerate(specs):
        px = 34 + (i % 2) * 156
        py = 96 + (i // 2) * 100
        a = _panel(f, px, py, 130, 58, name, colour)
        a.xmin, a.xmax = -0.6, 8.6
        a.ymin, a.ymax = 0, max(masses) * 1.2
        a.stems([(k, m) for k, m in enumerate(masses) if m > 0], colour=colour,
                dot=2.4, width=2.6)
    return f


@figure("Continuous Univariate Distributions", "Shapes and supports of the six continuous "
        "families on the syllabus", width=WID)
def continuous_univariate() -> Fig:
    f = vcard("The continuous families on the syllabus",
              "P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx")

    specs = [
        (lambda x: 1.0 if 0.12 < x < 0.88 else 0.002, BLUE, 0, 1, "Uniform (a, b)"),
        (lambda x: math.exp(-x), AMBER, 0, 4, "Exponential (θ)"),
        (lambda x: x * math.exp(-x), GREEN, 0, 8, "Gamma (α, θ)"),
        (lambda x: max(x, 1e-6) ** 1.5 * max(1 - x, 1e-6) ** 2.5, VIOLET, 0, 1,
         "Beta (α, β)"),
        (_npdf, ROSE, -3.2, 3.2, "Normal (μ, σ²)"),
        (lambda x: _lognorm(x, 0.0, 0.6), TEAL, 0.02, 5, "Lognormal (μ, σ²)"),
    ]
    for i, (fn, colour, xa, xb, name) in enumerate(specs):
        px = 34 + (i % 2) * 156
        py = 96 + (i // 2) * 100
        a = _panel(f, px, py, 130, 58, name, colour)
        a.xmin, a.xmax = xa, xb
        ys = [fn(xa + (xb - xa) * j / 60) for j in range(61)]
        a.ymin, a.ymax = 0, max(ys) * 1.18
        a.area(fn, xa, xb, colour=colour, opacity="0.16")
        a.curve(fn, colour=colour, n=90)
    return f


# ═══════════════════════════════════════════════════════════════════════════
# 2. Univariate random variables
# ═══════════════════════════════════════════════════════════════════════════

@figure("Random Variable", "A random variable mapping outcomes of two coin tosses to the "
        "number of heads", width=WID)
def random_variable() -> Fig:
    f = vcard("A random variable maps outcomes to numbers",
              ["X : S → ℝ", "here X = number of heads"])

    universe(f, 36, 110, 288, 92, "S")
    outcomes = [("TT", 0, 74), ("HT", 1, 146), ("TH", 1, 218), ("HH", 2, 290)]
    for lab, _, cx in outcomes:
        f.rect(cx - 32, 152, 64, 34, rx=7, fill=BLUE, fill_opacity="0.12",
               stroke=BLUE, stroke_width="1.3")
        f.text(cx, 174, lab, cls="")

    lx0, lx1, ly = 66, 294, 330
    f.arrow(lx0 - 16, ly, lx1 + 16, ly, colour="var(--axis)", width=1.1)
    f.text(lx1 + 26, ly + 4, "ℝ", cls="sm dim", anchor="start")
    targets = {}
    for k in (0, 1, 2):
        x = lx0 + k * (lx1 - lx0) / 2
        targets[k] = x
        f.line(x, ly - 5, x, ly + 5, cls="tick")
        f.circle(x, ly, 5, fill=VIOLET)
        f.text(x, ly + 22, str(k), cls="")
    for _, k, cx in outcomes:
        f.arrow(cx, 188, targets[k], ly - 14, colour="var(--dim)", width=1, dash=True)
    return f


@figure("Probability Density Function (PDF)", "Probability as the area under a density "
        "curve between a and b", width=WID)
def pdf() -> Fig:
    f = vcard("For a density, probability is area",
              ["P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx", "f(x) ≥ 0,   ∫ f(x) dx = 1"])

    a = vaxes(f, -3.4, 3.4, 0, 0.46, top=40)
    a.area(_npdf, -0.6, 1.5, colour=BLUE, opacity="0.28")
    a.curve(_npdf, colour=BLUE)
    a.frame(xlabel="x", ylabel="f(x)", xticks=[-0.6, 1.5],
            xfmt=lambda t: "a" if t < 0 else "b")
    a.vline(-0.6, y_top=_npdf(-0.6), colour=BLUE)
    a.vline(1.5, y_top=_npdf(1.5), colour=BLUE)
    a.label(0.45, 0.11, "P(a ≤ X ≤ b)", cls="sm bold")
    return f


@figure("Cumulative Distribution Function (CDF)", "A density and the CDF that accumulates "
        "its area", width=WID)
def cdf() -> Fig:
    f = vcard("The CDF accumulates the density",
              ["F(x) = P(X ≤ x) = ∫₋∞ˣ f(t) dt", "f(x) = F′(x)"])

    x_star = 0.7
    a1 = Axes(f, 66, 86, 326, 212, -3.2, 3.2, 0, 0.46)
    a1.area(_npdf, -3.2, x_star, colour=BLUE, opacity="0.26")
    a1.curve(_npdf, colour=BLUE)
    a1.frame(ylabel="f(t)", xticks=[x_star], xfmt=lambda t: "x")
    a1.label(-1.1, 0.13, "area", cls="sm bold")

    a2 = Axes(f, 66, 252, 326, 350, -3.2, 3.2, 0, 1.08)
    a2.curve(lambda t: 0.5 * (1 + math.erf(t / math.sqrt(2))), colour=VIOLET)
    a2.frame(ylabel="F(x)", xlabel="x", xticks=[x_star], yticks=[0, 0.5, 1],
             xfmt=lambda t: "x", yfmt=lambda t: f"{t:g}")
    fv = 0.5 * (1 + math.erf(x_star / math.sqrt(2)))
    a2.hline(fv, x_to=x_star, colour=VIOLET)
    a2.vline(x_star, y_top=fv, colour=VIOLET)
    a2.point(x_star, fv, colour=VIOLET)
    f.text(a2.x0 - 8, a2.py(fv) + 3.6, f"{fv:.2f}", cls="sm bold", anchor="end",
           fill=VIOLET)
    return f


@figure("Percentile", "The percentile read off the CDF and the matching tail area",
        width=WID)
def percentile() -> Fig:
    f = vcard("A percentile inverts the CDF",
              ["xₚ = F⁻¹(p)", "F(x₀.₉₀) = 0.90 — 10% of the mass is above"])

    p, xp = 0.90, 1.2816
    a1 = Axes(f, 66, 86, 326, 212, -3.2, 3.4, 0, 0.46)
    a1.area(_npdf, -3.2, xp, colour=BLUE, opacity="0.2")
    a1.area(_npdf, xp, 3.4, colour=ROSE, opacity="0.34")
    a1.curve(_npdf, colour=BLUE)
    a1.frame(ylabel="f(x)", xticks=[xp], xfmt=lambda t: "x₀.₉₀")
    a1.label(-0.8, 0.12, "0.90", cls="sm bold")
    a1.label(2.2, 0.06, "0.10", cls="sm bold", fill=ROSE)

    a2 = Axes(f, 66, 252, 326, 350, -3.2, 3.4, 0, 1.08)
    a2.curve(lambda t: 0.5 * (1 + math.erf(t / math.sqrt(2))), colour=VIOLET)
    a2.frame(ylabel="F(x)", xlabel="x", xticks=[xp], yticks=[0, 0.9],
             xfmt=lambda t: "x₀.₉₀", yfmt=lambda t: f"{t:g}")
    a2.hline(p, x_to=xp, colour=VIOLET)
    a2.vline(xp, y_top=p, colour=VIOLET)
    a2.point(xp, p, colour=VIOLET)
    return f


@figure("Expected Value", "The mean as the balance point of a distribution", width=WID)
def expected_value() -> Fig:
    f = vcard("The mean is the balance point",
              ["E[X] = ∫ x f(x) dx", "= Σ k p(k)  when X is discrete"])

    a = vaxes(f, 0, 6.2, 0, 0.42, top=40, bottom=56)
    dens = lambda t: _lognorm(t, 0.55, 0.55)
    a.area(dens, 0.02, 6.2, colour=BLUE, opacity="0.14")
    a.curve(dens, colour=BLUE)
    a.frame(xlabel="x", ylabel="f(x)")
    mu = math.exp(0.55 + 0.55 ** 2 / 2)
    a.vline(mu, colour=AMBER, y_top=0.40)
    a.label(mu, 0.31, "μ = E[X]", cls="sm bold", dx=40, dy=-2)
    px = a.px(mu)
    f.line(a.x0, a.y1 + 3, a.x1, a.y1 + 3, cls="", stroke=AMBER, stroke_width="1.8")
    f.polygon([(px, a.y1 + 3), (px - 10, a.y1 + 19), (px + 10, a.y1 + 19)], fill=AMBER)
    return f


@figure("Variance", "Two distributions with the same mean and different variance",
        width=WID)
def variance() -> Fig:
    f = vcard("Variance is the average squared distance from the mean",
              ["Var(X) = E[(X − μ)²]", "= E[X²] − μ²"])

    a = vaxes(f, -5, 5, 0, 0.46, top=40)
    a.curve(lambda t: _npdf(t, 0, 1.9), colour=AMBER)
    a.curve(lambda t: _npdf(t, 0, 1.0), colour=BLUE)
    a.frame(xlabel="x", ylabel="f(x)", xticks=[0], xfmt=lambda t: "μ")
    a.label(0.5, 0.42, "σ² = 1", cls="sm bold", anchor="start", fill=BLUE)
    a.label(2.5, 0.19, "σ² = 3.6", cls="sm bold", anchor="start", fill=AMBER)
    for sd, colour, y in ((1.0, BLUE, 0.055), (1.9, AMBER, 0.02)):
        x1, y1 = a.p(-sd, y)
        x2, _ = a.p(sd, y)
        f.arrow(x1, y1, x2, y1, colour=colour, width=1.3)
        f.arrow(x2, y1, x1, y1, colour=colour, width=1.3)
    f.text(a.px(0), a.py(0.055) - 8, "±σ", cls="sm", fill=BLUE)
    return f


@figure("Standard Deviation", "The one-, two- and three-sigma bands of a distribution",
        width=WID)
def standard_deviation() -> Fig:
    f = vcard("Standard deviation, in the units of X",
              ["σ = √Var(X)", "σ(aX + b) = |a| σ(X)"])

    a = vaxes(f, -3.7, 3.7, 0, 0.44, left=30, right=20, top=40)
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
        f.text(a.px(0), y1 - 6, lab, cls="sm bold", fill=colour)
    return f


@figure("Coefficient of Variation", "Equal standard deviations meaning very different "
        "relative risk", width=WID)
def coefficient_of_variation() -> Fig:
    f = vcard("Spread relative to the mean", "CV = σ / μ = √Var(X) / E[X]")

    a = vaxes(f, 0, 12, 0, 0.50, top=40, bottom=52)
    a.curve(lambda t: _npdf(t, 2.2, 0.9), colour=ROSE)
    a.curve(lambda t: _npdf(t, 8.0, 0.9), colour=BLUE)
    a.frame(ylabel="f(x)", xticks=[2.2, 8.0], xfmt=lambda t: f"μ = {t:g}")
    a.label(2.2, 0.47, "CV = 0.41", cls="sm bold", fill=ROSE)
    a.label(8.0, 0.47, "CV = 0.11", cls="sm bold", fill=BLUE)
    for mu, colour in ((2.2, ROSE), (8.0, BLUE)):
        x1, y1 = a.p(mu - 0.9, 0.06)
        x2, _ = a.p(mu + 0.9, 0.06)
        f.arrow(x1, y1, x2, y1, colour=colour, width=1.2)
        f.arrow(x2, y1, x1, y1, colour=colour, width=1.2)
    f.text((a.x0 + a.x1) / 2, a.y1 + 44, "both have σ = 0.9", cls="sm dim")
    return f


@figure("Binomial Distribution", "Ten policies with four of them claiming, above the "
        "binomial mass function of the claim count", width=WID)
def binomial_distribution() -> Fig:
    f = vcard("Successes in a fixed number of trials",
              ["P(X = k) = C(n, k) pᵏ (1 − p)ⁿ⁻ᵏ",
               "E[X] = np,   Var(X) = np(1 − p)"])

    n, p = 10, 0.3
    f.text(BCX, 92, "10 policies, each claiming with probability 0.3", cls="sm dim")
    _trial_strip(f, 102, (False, True, False, False, True, True, False, False, False, True))
    f.text(BCX, 152, "4 of the 10 claimed → k = 4", cls="sm bold", fill=BLUE)

    masses = [_binom_pmf(n, p, k) for k in range(n + 1)]
    a = Axes(f, 60, 190, 326, 330, -0.7, 10.7, 0, max(masses) * 1.35)
    a.stems([(k, m) for k, m in enumerate(masses) if k != 4], colour=BLUE)
    a.stems([(4, masses[4])], colour=AMBER, width=2.8, dot=3.8)
    a.frame(xlabel="k", ylabel="P(X = k)", xticks=list(range(n + 1)))
    a.label(4, masses[4], "0.200", cls="sm bold", dy=-11, fill=AMBER)
    return f


@figure("Geometric Distribution", "Two policies without a claim then one with, above the "
        "geometric mass function of the trial the first claim lands on", width=WID)
def geometric_distribution() -> Fig:
    f = vcard("Trials until the first success",
              ["P(X = k) = (1 − p)ᵏ⁻¹ p,  k ≥ 1",
               "E[X] = 1/p,   P(X > n) = (1 − p)ⁿ"])

    p = 0.2
    f.text(BCX, 92, "each policy claims with probability 0.2", cls="sm dim")
    _trial_strip(f, 102, (False, False, True), ring=(2,))
    f.text(BCX, 154, "the first claim is the 3rd policy → k = 3", cls="sm bold", fill=BLUE)

    ks = list(range(1, 11))
    masses = [(1 - p) ** (k - 1) * p for k in ks]
    a = Axes(f, 60, 192, 326, 330, 0.3, 10.7, 0, max(masses) * 1.35)
    a.stems([(k, m) for k, m in zip(ks, masses) if k != 3], colour=BLUE)
    a.stems([(3, masses[2])], colour=AMBER, width=2.8, dot=3.8)
    a.frame(xlabel="k", ylabel="P(X = k)", xticks=ks)
    a.label(3, masses[2], "0.128", cls="sm bold", dy=-11, fill=AMBER)
    return f


@figure("Hypergeometric Distribution", "Three of ten policies drawn without replacement, "
        "above the hypergeometric mass function of the number drawn with errors",
        width=WID)
def hypergeometric_distribution() -> Fig:
    f = vcard("Drawing without replacement from a finite pool",
              ["P(X = k) = C(K,k) C(N−K, n−k) / C(N,n)",
               "E[X] = nK/N"])

    N, K, n = 10, 4, 3
    f.text(BCX, 92, "10 policies, 4 with errors — 3 drawn (dashed)", cls="sm dim")
    _trial_strip(f, 102, (True, True, False, False, True, False, True, False, False, False),
                 colour=ROSE, ring=(1, 4, 7))
    f.text(BCX, 154, "2 of the 3 drawn have errors → k = 2", cls="sm bold", fill=ROSE)

    ks = list(range(n + 1))
    masses = [math.comb(K, k) * math.comb(N - K, n - k) / math.comb(N, n) for k in ks]
    a = Axes(f, 60, 192, 326, 330, -0.45, 3.45, 0, max(masses) * 1.35)
    a.stems([(k, m) for k, m in zip(ks, masses) if k != 2], colour=BLUE)
    a.stems([(2, masses[2])], colour=AMBER, width=2.8, dot=3.8)
    a.frame(xlabel="k", ylabel="P(X = k)", xticks=ks)
    a.label(2, masses[2], "0.300", cls="sm bold", dy=-11, fill=AMBER)
    return f


@figure("Negative Binomial Distribution", "Seven claims with the third large loss on the "
        "seventh, above the negative binomial mass function of the trial count", width=WID)
def negative_binomial_distribution() -> Fig:
    f = vcard("Trials until the r-th success",
              ["P(X = k) = C(k−1, r−1) pʳ (1 − p)ᵏ⁻ʳ",
               "E[X] = r/p,   Var(X) = r(1 − p)/p²"])

    r, p = 3, 0.25
    f.text(BCX, 92, "each claim is a large loss with probability 0.25", cls="sm dim")
    _trial_strip(f, 102, (False, True, False, False, True, False, True), ring=(6,))
    f.text(BCX, 154, "the 3rd large loss is the 7th claim → k = 7", cls="sm bold", fill=BLUE)

    ks = list(range(r, 17))
    masses = [math.comb(k - 1, r - 1) * p ** r * (1 - p) ** (k - r) for k in ks]
    a = Axes(f, 60, 192, 326, 330, 2.4, 16.6, 0, max(masses) * 1.4)
    a.stems([(k, m) for k, m in zip(ks, masses) if k != 7], colour=BLUE, dot=2.8)
    a.stems([(7, masses[ks.index(7)])], colour=AMBER, width=2.8, dot=3.8)
    a.frame(xlabel="k", ylabel="P(X = k)", xticks=list(range(3, 17, 2)))
    a.label(7, masses[ks.index(7)], "0.074", cls="sm bold", dy=-11, fill=AMBER)
    return f


@figure("Poisson Distribution", "Three claims falling in one month, above the Poisson "
        "mass function of the monthly claim count", width=WID)
def poisson_distribution() -> Fig:
    f = vcard("Counting events in a fixed interval",
              ["P(X = k) = e^(−λ) λᵏ / k!",
               "E[X] = Var(X) = λ"])

    lam = 3.0
    f.text(BCX, 92, "claims arrive at a rate of λ = 3 per month", cls="sm dim")
    tx0, tx1, ty = 46, 306, 126
    f.arrow(tx0 - 8, ty, tx1 + 14, ty, colour="var(--axis)", width=1.2)
    for t in (0.16, 0.43, 0.81):
        ex = tx0 + t * (tx1 - tx0)
        f.line(ex, ty, ex, ty - 15, cls="", stroke=BLUE, stroke_width="2.2",
               stroke_linecap="round")
        f.circle(ex, ty - 18, 3.4, fill=BLUE)
    f.text(tx0, ty + 16, "0", cls="sm dim")
    f.text(tx1 + 20, ty + 16, "1 month", cls="sm dim", anchor="end")
    f.text(BCX, 158, "3 claims in the month → k = 3", cls="sm bold", fill=BLUE)

    ks = list(range(11))
    masses = [math.exp(-lam) * lam ** k / math.factorial(k) for k in ks]
    a = Axes(f, 60, 196, 326, 330, -0.7, 10.7, 0, max(masses) * 1.35)
    a.stems([(k, m) for k, m in zip(ks, masses) if k != 3], colour=BLUE)
    a.stems([(3, masses[3])], colour=AMBER, width=2.8, dot=3.8)
    a.frame(xlabel="k", ylabel="P(X = k)", xticks=ks)
    a.label(3, masses[3], "0.224", cls="sm bold", dy=-11, fill=AMBER)
    return f


@figure("Uniform Discrete", "The discrete uniform PMF and CDF for a fair die", width=WID)
def uniform_discrete() -> Fig:
    f = vcard("Discrete uniform: n equally likely values",
              ["E[X] = (n + 1)/2 = 3.5", "Var(X) = (n² − 1)/12 ≈ 2.92"])

    a1 = Axes(f, 68, 90, 326, 208, 0.3, 6.7, 0, 0.24)
    a1.stems([(k, 1 / 6) for k in range(1, 7)], colour=BLUE)
    a1.frame(ylabel="P(X = k)", xticks=list(range(1, 7)), yticks=[1 / 6],
             yfmt=lambda t: "1/6")

    a2 = Axes(f, 68, 250, 326, 350, 0.3, 6.9, 0, 1.1)
    a2.frame(xlabel="k", ylabel="F(k)", xticks=list(range(1, 7)), yticks=[0, 1],
             yfmt=lambda t: f"{t:g}")
    prev = 0.0
    for k in range(1, 7):
        v = k / 6
        x1 = a2.px(k)
        x2 = a2.px(k + 1) if k < 6 else a2.x1
        f.line(x1, a2.py(v), x2, a2.py(v), cls="curve", stroke=VIOLET, stroke_width="2")
        f.line(x1, a2.py(prev), x1, a2.py(v), cls="curve dash", stroke=VIOLET,
               stroke_width="1.2")
        f.circle(x1, a2.py(v), 3, fill=VIOLET)
        prev = v
    return f


@figure("Beta", "Four beta densities on the unit interval — flat, right-skewed, "
        "left-skewed and in between", width=WID)
def beta_distribution() -> Fig:
    f = vcard("Any shape a proportion can take",
              ["f(x) ∝ x^(α−1) (1 − x)^(β−1)",
               "E[X] = α/(α + β);  α = β = 1 is uniform"])

    f.text(BCX, 90, "each curve is labelled (α, β)", cls="sm dim")
    a = vaxes(f, 0, 1, 0, 2.95, left=40, right=16, top=52, bottom=46)
    for aa, bb, colour in ((1, 1, BLUE), (2, 5, AMBER), (5, 2, GREEN), (3, 2, VIOLET)):
        a.curve(lambda t, aa=aa, bb=bb: _beta_pdf(t, aa, bb), colour=colour, n=170,
                xa=0.003, xb=0.997)
    a.frame(xlabel="x", ylabel="f(x)", xticks=[0, 0.25, 0.5, 0.75, 1],
            xfmt=lambda t: f"{t:g}", yticks=[1, 2], yfmt=lambda t: f"{t:g}")
    a.label(0.15, 1, "(1, 1)", cls="sm bold", dy=-9, fill=BLUE)
    a.label(0.2, _beta_pdf(0.2, 2, 5), "(2, 5)", cls="sm bold", dy=-10, fill=AMBER)
    a.label(0.8, _beta_pdf(0.8, 5, 2), "(5, 2)", cls="sm bold", dy=-10, fill=GREEN)
    a.label(0.47, _beta_pdf(0.47, 3, 2), "(3, 2)", cls="sm bold", dy=-10, fill=VIOLET)
    return f


@figure("Exponential Distribution", "An exponential density and, past a deductible, the "
        "same curve starting over", width=WID)
def exponential_distribution() -> Fig:
    f = vcard("Memoryless: the curve starts over at d",
              ["S(x) = e^(−x/θ),   E[X] = θ",
               "E[X − d | X > d] = θ"])

    theta, d = 500.0, 300.0
    dens = lambda t: math.exp(-t / theta) / theta
    a = Axes(f, 58, 122, 326, 322, 0, 2500, 0, 0.0024)
    a.curve(dens, colour=BLUE, n=180)
    a.curve(lambda t: dens(t - d), colour=AMBER, n=180, xa=d, dash=True)
    a.frame(xlabel="x", ylabel="f(x)", xticks=[0, 500, 1000, 1500, 2000, 2500])
    a.vline(d, colour="var(--dim)", y_top=1 / theta)
    a.label(d, 1 / theta, "d = 300", cls="sm bold", dy=-9)
    f.legend(180, 148, [(BLUE, "X ~ Exp(500)"), (AMBER, "X given X > 300")])
    return f


@figure("Gamma", "Four exponential waiting times laid end to end, and the gamma density "
        "of their total", width=WID)
def gamma_distribution() -> Fig:
    f = vcard("α exponential waits add up to a gamma",
              ["f(x) = x^(α−1) e^(−x/θ) / [Γ(α) θ^α]",
               "E[X] = αθ,   Var(X) = αθ²"])

    alpha, theta = 4, 250.0
    f.text(BCX, 92, "4 waits, each Exp(θ = 250)", cls="sm dim")
    bx0, bw, by = 34, 292, 106
    x = bx0
    for i, wait in enumerate((210, 430, 150, 320)):
        seg = bw * wait / 1110
        f.rect(x, by, seg - 3, 17, rx=3, fill=SERIES[i], fill_opacity="0.65")
        x += seg
    brace(f, bx0, bx0 + bw, by + 26, label="one Gamma(4, 250) draw")

    dens = lambda t: _gamma_pdf(t, alpha, theta)
    a = Axes(f, 58, 198, 326, 330, 0, 2500, 0, 0.0011)
    a.area(dens, 0, 2500, colour=BLUE, opacity="0.14")
    a.curve(dens, colour=BLUE, n=200)
    a.frame(xlabel="x", ylabel="f(x)", xticks=[0, 500, 1000, 1500, 2000, 2500])
    a.vline(1000, colour=AMBER, y_top=dens(1000))
    a.label(1000, dens(1000), "mean 1,000", cls="sm bold", dx=6, dy=-10, fill=AMBER,
            anchor="start")
    return f


@figure("Lognormal Distribution", "A normal density in log dollars above the right-skewed "
        "lognormal it exponentiates to, with the same tail shaded on both", width=WID)
def lognormal_distribution() -> Fig:
    f = vcard("A lognormal is a normal in logs",
              ["F(x) = Φ((ln x − μ)/σ)",
               "E[X] = e^(μ + σ²/2)"])

    mu, sd = 6.0, 0.8
    cut = math.log(1000)

    a1 = Axes(f, 66, 100, 326, 196, mu - 3.2 * sd, mu + 3.2 * sd, 0, 0.56)
    a1.area(lambda t: _npdf(t, mu, sd), cut, mu + 3.2 * sd, colour=AMBER, opacity="0.32")
    a1.curve(lambda t: _npdf(t, mu, sd), colour=BLUE, n=170)
    a1.frame(ylabel="ln X ~ N(6, 0.8²)", xticks=[mu, cut],
             xfmt=lambda t: "μ" if t == mu else "ln 1000")
    a1.label(7.72, 0.115, "0.128", cls="sm bold", fill=AMBER)

    f.arrow(BCX, 222, BCX, 244, colour="var(--dim)", width=1.3)
    f.text(BCX + 10, 240, "x = e^t", cls="sm dim", anchor="start")

    dens = lambda t: _lognorm(t, mu, sd)
    a2 = Axes(f, 66, 256, 326, 348, 0, 2000, 0, 0.0019)
    a2.area(dens, 1000, 2000, colour=AMBER, opacity="0.32")
    a2.curve(dens, colour=BLUE, n=200, xa=1)
    a2.frame(ylabel="X ~ Lognormal", xticks=[0, 1000, 2000],
             xfmt=lambda t: f"{t:,.0f}")
    a2.label(1360, 0.00028, "0.128", cls="sm bold", fill=AMBER)
    return f


@figure("Normal Distribution", "A normal density with its right tail shaded, over a "
        "second ruler carrying the standardized z scale", width=WID)
def normal_distribution() -> Fig:
    f = vcard("Any normal standardizes to the z scale",
              ["Z = (X − μ)/σ ~ N(0, 1)",
               "P(S > 55) = 1 − Φ(0.79) = 0.215"])

    mu, sd = 50.0, 6.3246
    dens = lambda t: _npdf(t, mu, sd)
    f.text(BCX, 100, "aggregate loss S ~ N(50, 6.32²), in thousands", cls="sm dim")

    a = Axes(f, 54, 116, 326, 286, mu - 3.4 * sd, mu + 3.4 * sd, 0, 0.072)
    a.area(dens, 55, mu + 3.4 * sd, colour=AMBER, opacity="0.3")
    a.curve(dens, colour=BLUE, n=200)
    a.frame(xticks=[30, 40, 50, 60, 70], xfmt=lambda t: f"{t:g}")
    a.vline(55, colour=AMBER, y_top=dens(55))
    a.label(55, dens(55), "55", cls="sm bold", dy=-8, fill=AMBER)
    a.label(60.5, 0.0075, "0.215", cls="sm bold", fill=AMBER)

    # The same axis, read again in standard deviations: the z ruler is what a
    # Φ table is indexed by, so the figure shows both scales at once.
    zy = 330
    f.arrow(a.x0 - 8, zy, a.x1 + 12, zy, colour="var(--axis)", width=1.1)
    for z in (-3, -2, -1, 0, 1, 2, 3):
        zx = a.px(mu + z * sd)
        f.line(zx, zy, zx, zy + 4, cls="tick")
        f.text(zx, zy + 16, f"{z:g}".replace("-", "−"), cls="sm dim")
    f.text(a.x0 - 14, zy + 4, "z", cls="sm dim", anchor="end")
    zx = a.px(55)
    f.line(zx, a.y1, zx, zy, cls="thin dash", stroke=AMBER, stroke_width="1.2")
    f.line(zx, zy - 5, zx, zy + 5, cls="", stroke=AMBER, stroke_width="1.8")
    f.text(zx, zy - 11, "0.79", cls="sm bold", fill=AMBER)
    return f


@figure("Uniform Continuous Distribution", "The continuous uniform density and its "
        "straight-line CDF", width=WID)
def uniform_continuous() -> Fig:
    f = vcard("Continuous uniform: a flat density on (a, b)",
              ["f(x) = 1 / (b − a)", "E[X] = (a+b)/2,   Var(X) = (b−a)²/12"])

    aa, bb = 2.0, 7.0
    dens = 1 / (bb - aa)
    a1 = Axes(f, 76, 90, 326, 208, 0.5, 8.5, 0, 0.30)
    a1.area(lambda t: dens if aa <= t <= bb else 0.0, aa, bb, colour=BLUE, opacity="0.2")
    a1.polyline([(0.5, 0), (aa, 0), (aa, dens), (bb, dens), (bb, 0), (8.5, 0)],
                colour=BLUE)
    a1.frame(ylabel="f(x)", xticks=[aa, bb], xfmt=lambda t: "a" if t == aa else "b",
             yticks=[dens], yfmt=lambda t: "1/(b−a)")
    a1.label((aa + bb) / 2, dens / 2, "area = 1", cls="sm bold")

    a2 = Axes(f, 76, 250, 326, 350, 0.5, 8.5, 0, 1.12)
    a2.polyline([(0.5, 0), (aa, 0), (bb, 1), (8.5, 1)], colour=VIOLET)
    a2.frame(xlabel="x", ylabel="F(x)", xticks=[aa, bb],
             xfmt=lambda t: "a" if t == aa else "b", yticks=[0, 1],
             yfmt=lambda t: f"{t:g}")
    a2.label(5.6, 0.55, "(x−a)/(b−a)", cls="sm")
    return f


@figure("Transformations of Random Variables", "A monotone transformation carrying the "
        "density of X into the density of Y", width=WID)
def transformations() -> Fig:
    f = vcard("A transformation reshapes the density",
              ["f_Y(y) = f_X(g⁻¹(y)) · |d g⁻¹/dy|", "y = g(x) = x², x > 0"])

    gx0, gx1, gy0, gy1 = 128, 328, 96, 268
    a = Axes(f, gx0, gy0, gx1, gy1, 0, 2.6, 0, 6.8)
    a.frame(arrows=True)
    a.curve(lambda t: t * t, colour=VIOLET, xa=0, xb=2.6)
    f.text(gx1 - 4, gy0 + 12, "y = g(x)", cls="sm bold", anchor="end", fill=VIOLET)

    xv = 1.5
    a.vline(xv, y_top=xv * xv, colour="var(--dim)")
    f.line(gx0, a.py(xv * xv), a.px(xv), a.py(xv * xv), cls="thin dash",
           stroke="var(--dim)", stroke_width="1.2")
    a.point(xv, xv * xv, colour=VIOLET, r=3.4)

    dx = Axes(f, gx0, gy1 + 14, gx1, gy1 + 66, 0, 2.6, 0, 0.95)
    dx.area(lambda t: _npdf(t, 1.4, 0.45), 0, 2.6, colour=BLUE, opacity="0.2")
    dx.curve(lambda t: _npdf(t, 1.4, 0.45), colour=BLUE, n=90)
    f.line(gx0, gy1 + 66, gx1, gy1 + 66, cls="axis")
    f.text(gx1 - 4, gy1 + 60, "f_X(x)", cls="sm bold", fill=BLUE, anchor="end")

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
    f.text(gx0 - 54, gy0 + 4, "f_Y(y)", cls="sm bold", fill=GREEN)
    return f


@figure("Calculus", "The derivative as a tangent slope and the integral as an area",
        width=WID)
def calculus() -> Fig:
    f = vcard("The two operations Exam P leans on",
              ["F′(x) = f(x)", "∫ₐᵇ f(x) dx = F(b) − F(a)"])

    fn = lambda t: 0.28 * t * t - 0.2 * t + 1.1

    a1 = Axes(f, 72, 92, 320, 210, 0, 3.4, 0, 3.6)
    a1.curve(fn, colour=BLUE)
    a1.frame(arrows=True)
    x0 = 2.2
    slope = 0.56 * x0 - 0.2
    a1.polyline([(x0 - 1.1, fn(x0) - 1.1 * slope), (x0 + 1.0, fn(x0) + 1.0 * slope)],
                colour=AMBER, width=1.6)
    a1.point(x0, fn(x0), colour=AMBER)
    f.text(196, 228, "the slope of the tangent", cls="sm dim")

    a2 = Axes(f, 72, 256, 320, 348, 0, 3.4, 0, 3.6)
    a2.area(fn, 0.8, 2.6, colour=GREEN, opacity="0.22")
    a2.curve(fn, colour=BLUE)
    a2.frame(xticks=[0.8, 2.6], xfmt=lambda t: "a" if t < 2 else "b", arrows=True)
    a2.label(1.7, 0.8, "∫ₐᵇ f", cls="sm bold")
    f.text(196, 384, "the area under the curve", cls="sm dim")
    return f


@figure("Discrete Mathematics", "The power set of a three-element set", width=WID)
def discrete_mathematics() -> Fig:
    f = vcard("The power set of {a, b, c}", "|𝒫(S)| = 2ⁿ = 2³ = 8")

    levels = [["∅"], ["{a}", "{b}", "{c}"], ["{a,b}", "{a,c}", "{b,c}"], ["{a,b,c}"]]
    colours = ["var(--dim)", BLUE, VIOLET, GREEN]
    positions = []
    for li, row in enumerate(levels):
        y = 96 + li * 74
        xs = []
        for i, lab in enumerate(row):
            x = 180 + (i - (len(row) - 1) / 2) * 104
            f.rect(x - 34, y - 15, 68, 30, rx=7, fill=colours[li], fill_opacity="0.13",
                   stroke=colours[li], stroke_width="1.3")
            f.text(x, y + 5, lab, cls="")
            xs.append(x)
        positions.append((y, xs))
    for li in range(3):
        y_a, xs_a = positions[li]
        y_b, xs_b = positions[li + 1]
        for xa in xs_a:
            for xb in xs_b:
                f.line(xa, y_a + 15, xb, y_b - 15, cls="thin", stroke="var(--edge)",
                       stroke_width="1")
    f.text(BCX, 386, "each element is in or out — 2 × 2 × 2", cls="sm dim")
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


@figure("Deductible", "Insurer payment against loss under an ordinary and a franchise "
        "deductible", width=WID)
def deductible() -> Fig:
    f = vcard("A deductible removes the first d",
              ["Y = max(X − d, 0)", "E[Y] = ∫_d^∞ (x − d) f(x) dx"])

    d = 3.0
    a = _payment_axes(f, reference=False)
    a.polyline([(0, 0), (d, 0)], colour=BLUE, width=2.4)
    a.polyline([(d, 0), (10, 7)], colour=BLUE, width=2.4)
    a.polyline([(d, d), (10, 10)], colour=AMBER, width=2.4)
    a.point(d, d, colour=AMBER, r=3)
    f.circle(a.px(d), a.py(0), 3.2, fill="var(--surf)", stroke=AMBER, stroke_width="1.4")
    a.frame(xlabel="loss X", ylabel="payment Y", xticks=[d], xfmt=lambda t: "d")
    a.vline(d, y_top=d, colour="var(--dim)")
    a.label(1.4, 0.9, "pays 0", cls="sm dim")
    a.label(9.4, 6.2, "ordinary", cls="sm bold", anchor="end", fill=BLUE)
    a.label(7.4, 8.6, "franchise", cls="sm bold", anchor="end", fill=AMBER)
    return f


@figure("Benefit Limit", "Insurer payment capped at the benefit limit u", width=WID)
def benefit_limit() -> Fig:
    f = vcard("A limit caps what the insurer pays",
              ["Y = min(X, u)", "the insured keeps every dollar above u"])

    u = 6.0
    a = _payment_axes(f)
    a.polyline([(0, 0), (u, u)], colour=BLUE, width=2.4)
    a.polyline([(u, u), (10, u)], colour=BLUE, width=2.4)
    f.polygon([a.p(u, u), a.p(10, 10), a.p(10, u)], fill=ROSE, fill_opacity="0.2",
              stroke="none")
    a.label(9.6, 7.0, "the insured", cls="sm", anchor="end", fill=ROSE)
    a.label(9.6, 6.3, "keeps this", cls="sm", anchor="end", fill=ROSE)
    a.frame(xlabel="loss X", ylabel="payment Y", xticks=[u], xfmt=lambda t: "u",
            yticks=[u], yfmt=lambda t: "u")
    a.hline(u, colour="var(--dim)")
    return f


@figure("Coinsurance Percentage", "Coinsurance flattening the payment line by the factor "
        "alpha", width=WID)
def coinsurance() -> Fig:
    f = vcard("Coinsurance shares each covered dollar",
              ["Y = α (X − d)₊,   α ∈ (0, 1]", "E[Y] scales by α,  Var(Y) by α²"])

    d, alpha = 2.0, 0.8
    a = _payment_axes(f, reference=False)
    a.polyline([(0, 0), (d, 0), (10, alpha * (10 - d))], colour=BLUE, width=2.4)
    a.polyline([(0, 0), (d, 0), (10, 10 - d)], colour="var(--dim)", width=1.4, dash=True)
    f.polygon([a.p(d, 0), a.p(10, 10 - d), a.p(10, alpha * (10 - d))], fill=AMBER,
              fill_opacity="0.24", stroke="none")
    a.label(9.9, 8.5, "α = 1", cls="sm dim", anchor="end")
    a.label(9.9, 5.2, "α = 0.8", cls="sm bold", anchor="end", fill=BLUE)
    a.label(7.6, 5.05, "1 − α", cls="sm", fill=AMBER)
    a.frame(xlabel="loss X", ylabel="payment Y", xticks=[d], xfmt=lambda t: "d")
    return f


@figure("Policy Information", "Deductible, coinsurance and limit applied in order to a "
        "ground-up loss", width=WID)
def policy_information() -> Fig:
    f = vcard("Deductible, then coinsurance, then limit",
              "Y = min( α (X − d)₊ , u )")

    d, alpha, u = 2.0, 0.8, 4.0
    cap_x = d + u / alpha
    a = _payment_axes(f)
    a.polyline([(0, 0), (d, 0), (cap_x, u), (10, u)], colour=BLUE, width=2.6)
    a.frame(xlabel="loss X", ylabel="payment Y", xticks=[d, cap_x],
            xfmt=lambda t: "d" if t < 3 else "d + u/α", yticks=[u], yfmt=lambda t: "u")
    a.hline(u, colour="var(--dim)")
    a.vline(d, y_top=u, colour="var(--dim)")
    a.label(0.9, 0.9, "0", cls="sm dim")
    a.label(4.3, 1.6, "slope α", cls="sm")
    a.label(8.4, u - 1.1, "capped", cls="sm dim")
    return f


@figure("Loss Random Variable", "The ground-up loss distribution and the part of it the "
        "insurer sees", width=WID)
def loss_random_variable() -> Fig:
    f = vcard("X is the ground-up loss",
              ["E[(X − d)₊] = ∫_d^∞ (x − d) f(x) dx", "E[Y] ≠ E[X] − d"])

    d = 1.6
    dens = lambda t: _lognorm(t, 0.6, 0.62)
    a = vaxes(f, 0, 8, 0, 0.42, top=40)
    a.area(dens, 0.02, d, colour="var(--dim)", opacity="0.2")
    a.area(dens, d, 8, colour=BLUE, opacity="0.22")
    a.curve(dens, colour=BLUE, xa=0.02)
    a.frame(xlabel="x", ylabel="f_X(x)", xticks=[d], xfmt=lambda t: "d")
    a.vline(d, y_top=dens(d), colour=AMBER)
    a.label(4.6, 0.16, "insurer pays X − d", cls="sm")
    return f


@figure("Payment Random Variable", "The mixed distribution of the insurer's payment",
        width=WID)
def payment_random_variable() -> Fig:
    f = vcard("Y is mixed: a mass at 0 and at u",
              ["Y = α min( (X − d)₊ , u )", "compute E[Y] from Y — never rescale X"])

    a = vaxes(f, -1.1, 8, 0, 0.42, top=48)
    dens = lambda t: _lognorm(t + 1.6, 0.6, 0.62) * 0.8
    a.area(lambda t: dens(t) if 0.05 <= t <= 5 else 0.0, 0.05, 5, colour=BLUE,
           opacity="0.22")
    a.curve(dens, colour=BLUE, xa=0.05, xb=5)
    a.frame(xlabel="y", ylabel="density", xticks=[0, 5],
            xfmt=lambda t: "0" if t == 0 else "u")
    for x, height, colour, lab in ((0, 0.34, AMBER, "P(X ≤ d)"),
                                   (5, 0.16, ROSE, "P(X ≥ d + u/α)")):
        f.line(a.px(x), a.y1, a.px(x), a.py(height), cls="", stroke=colour,
               stroke_width="3.4", stroke_linecap="round")
        f.circle(a.px(x), a.py(height), 4.5, fill=colour)
        f.text(a.px(x) + (0 if x == 0 else -6), a.py(height) - 11, lab, cls="sm bold",
               fill=colour, anchor="middle" if x == 0 else "end")
    return f


@figure("Inflation", "Inflation shifting the loss distribution and leveraging the "
        "deductible", width=WID)
def inflation() -> Fig:
    f = vcard("Inflation leverages a fixed deductible",
              ["X′ = (1 + r) X", "payments rise by more than r"])

    d, r = 2.0, 0.25
    base = lambda t: _lognorm(t, 0.75, 0.55)
    infl = lambda t: base(t / (1 + r)) / (1 + r)
    a = vaxes(f, 0, 9, 0, 0.42, top=44)
    a.curve(base, colour="var(--dim)", xa=0.02)
    a.area(infl, d, 9, colour=BLUE, opacity="0.18")
    a.curve(infl, colour=BLUE, xa=0.02)
    a.frame(xlabel="loss", ylabel="density", xticks=[d], xfmt=lambda t: "d")
    a.vline(d, colour=AMBER, y_top=0.40)
    a.label(2.05, 0.415, "X", cls="sm bold", anchor="end", dx=-6)
    a.label(3.5, 0.335, "X′", cls="sm bold", fill=BLUE)
    a.label(5.8, 0.14, "more mass clears d", cls="sm dim")
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


@figure("Multivariate Distribution", "A joint distribution with its marginals shown on "
        "the axes", width=WID)
def multivariate_distribution() -> Fig:
    f = vcard("The joint law, with both marginals",
              ["f_X(x) = ∫ f(x, y) dy", "f_Y(y) = ∫ f(x, y) dx"])

    bx0, by0, side = 128, 122, 186
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

    fx = [(bx0 + side * i / 60, by1 + 52 - 100 * _npdf(-3 + 6 * i / 60))
          for i in range(61)]
    f.poly(fx, cls="curve", stroke=AMBER, stroke_width="1.8")
    f.text(bx1 + 6, by1 + 46, "f_X", cls="sm bold", fill=AMBER, anchor="start")
    fy = [(bx0 - 46 + 92 * _npdf(-3 + 6 * i / 60), by1 - side * i / 60)
          for i in range(61)]
    f.poly(fy, cls="curve", stroke=GREEN, stroke_width="1.8")
    f.text(bx0 - 40, by0 - 6, "f_Y", cls="sm bold", fill=GREEN)
    f.text(BCX, 386, "each marginal integrates the other variable out", cls="sm dim")
    return f


@figure("Joint Probability Function", "A joint probability mass function laid out as a "
        "table", width=WID)
def joint_probability_function() -> Fig:
    f = vcard("One probability for every (x, y) pair",
              ["p(x, y) = P(X = x, Y = y)", "Σ Σ p(x, y) = 1"])

    _joint_table(f, 78, 140, cell=68, row_h=48, show_margins=False)
    f.text(BCX, 332, "every entry ≥ 0, and the table sums to 1", cls="sm dim")
    return f


@figure("Marginal Probability Function", "Marginals as the row and column sums of a joint "
        "table", width=WID)
def marginal_probability_function() -> Fig:
    f = vcard("A marginal is a row or column sum",
              ["pₓ(x) = Σ_y p(x, y)", "f_X(x) = ∫ f(x, y) dy"])

    x0, y0, cell, row_h = 64, 126, 62, 42
    _joint_table(f, x0, y0, cell=cell, row_h=row_h)
    f.arrow(x0 + 3 * cell - 10, y0 + 21, x0 + 3 * cell + 2, y0 + 21, colour=AMBER,
            width=1.5)
    f.arrow(x0 + cell / 2, y0 + 3 * row_h - 8, x0 + cell / 2, y0 + 3 * row_h + 2,
            colour=GREEN, width=1.5)
    f.text(BCX, 352, "both margins sum to 1 — a fast check", cls="sm dim")
    return f


@figure("Conditional Probability Function", "One row of a joint table renormalised into a "
        "conditional distribution", width=WID)
def conditional_probability_function() -> Fig:
    f = vcard("Fix a row, then renormalise it", "p(y | x) = p(x, y) / pₓ(x)")

    x0, cell = 78, 68
    _joint_table(f, x0, 110, cell=cell, row_h=44, highlight=lambda i, j: i == 1,
                 show_margins=False)
    f.text(BCX, 264, "the row X = 1 sums to 0.40", cls="sm dim")
    f.arrow(BCX, 274, BCX, 296, colour=VIOLET, width=1.6)
    f.text(BCX + 12, 290, "÷ 0.40", cls="sm", fill=VIOLET, anchor="start")

    row = JOINT[1]
    total = sum(row)
    for j, v in enumerate(row):
        cx = x0 + j * cell
        f.rect(cx, 306, cell, 40, rx=3, fill=VIOLET, fill_opacity="0.18", stroke=VIOLET,
               stroke_width="1.2")
        f.text(cx + cell / 2, 331, f"{v / total:.2f}", cls="sm bold")
    f.text(BCX, 368, "0.15 + 0.50 + 0.35 = 1.00", cls="sm dim")
    return f


@figure("Joint Cumulative Distribution Function", "The joint CDF as the probability mass "
        "in the lower-left quadrant", width=WID)
def joint_cdf() -> Fig:
    f = vcard("F(x, y) is a lower-left quadrant",
              ["F(x, y) = P(X ≤ x, Y ≤ y)", "f(x, y) = ∂²F / ∂x ∂y"])

    px0, py0, side = 88, 106, 216
    f.rect(px0, py0, side, side, rx=4, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1")
    xq, yq = px0 + side * 0.62, py0 + side * 0.42
    f.rect(px0, yq, xq - px0, py0 + side - yq, fill=BLUE, fill_opacity="0.22")
    f.line(xq, py0, xq, py0 + side, cls="thin dash", stroke=BLUE, stroke_width="1.3")
    f.line(px0, yq, px0 + side, yq, cls="thin dash", stroke=BLUE, stroke_width="1.3")
    f.arrow(px0, py0 + side, px0 + side + 16, py0 + side, colour="var(--axis)", width=1.1)
    f.arrow(px0, py0 + side, px0, py0 - 12, colour="var(--axis)", width=1.1)
    f.text(xq, py0 + side + 20, "x", cls="sm dim")
    f.text(px0 - 10, yq + 4, "y", cls="sm dim", anchor="end")
    f.text(px0 + (xq - px0) / 2, yq + (py0 + side - yq) / 2 + 5, "F(x, y)",
           cls="bold", fill=BLUE)
    f.text(BCX, 366, "F(∞, ∞) = 1,  F(−∞, y) = 0", cls="sm dim")
    return f


@figure("Joint Probability Density Function", "Setting up the limits of a double integral "
        "over a triangular support", width=WID)
def joint_pdf() -> Fig:
    f = vcard("Sketch the support, then set the limits",
              ["∫₀¹ ∫ₓ¹ f(x, y) dy dx", "support 0 < x < y < 1"])

    px0, py1, side = 92, 320, 200
    py0 = py1 - side
    px1 = px0 + side
    f.polygon([(px0, py1), (px1, py0), (px0, py0)], fill=BLUE, fill_opacity="0.2",
              stroke=BLUE, stroke_width="1.4")
    f.arrow(px0, py1, px1 + 20, py1, colour="var(--axis)", width=1.1)
    f.arrow(px0, py1, px0, py0 - 18, colour="var(--axis)", width=1.1)
    f.text(px1 + 26, py1 + 4, "x", cls="sm dim", anchor="start")
    f.text(px0 - 8, py0 - 22, "y", cls="sm dim", anchor="end")
    for v, lab in ((0, "0"), (1, "1")):
        f.text(px0 + v * side, py1 + 18, lab, cls="sm dim")
        f.text(px0 - 8, py1 - v * side + 4, lab, cls="sm dim", anchor="end")
    xs = px0 + side * 0.42
    f.arrow(xs, py1 - 3, xs, py0 + side * 0.58, colour=AMBER, width=1.8)
    f.text(xs + 10, (py1 + py0 + side * 0.58) / 2, "y runs x → 1", cls="sm", fill=AMBER,
           anchor="start")
    f.text(xs, py1 + 34, "fix x", cls="sm dim")
    f.text(px1 - 26, py0 + 18, "y = x", cls="sm", fill=BLUE, anchor="end")
    return f


@figure("Moments for Joint Distributions", "E[XY] built cell by cell from a joint table",
        width=WID)
def moments_for_joint() -> Fig:
    f = vcard("Every joint moment is one weighted sum",
              ["E[g(X, Y)] = Σ Σ g(x, y) p(x, y)", "E[XY] = 1.88,  E[X] E[Y] = 1.72"])

    _joint_table(f, 78, 140, cell=68, row_h=48, show_margins=False)
    f.text(BCX, 332, "each cell contributes g(x, y) · p(x, y)", cls="sm dim")
    return f


@figure("Covariance", "Covariance as the signed contribution of each quadrant around the "
        "means", width=WID)
def covariance() -> Fig:
    f = vcard("Covariance adds signed rectangles",
              ["Cov(X, Y) = E[(X − μₓ)(Y − μ_Y)]", "= E[XY] − E[X] E[Y]"])

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
    f = vcard("ρ is how tightly the cloud hugs a line",
              ["ρ(X, Y) = Cov(X, Y) / (σₓ σ_Y)", "−1 ≤ ρ ≤ 1, and ρ = ±1 is a line"])

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
    f = vcard("Independence: the joint density factors",
              ["f(x, y) = f_X(x) · f_Y(y)", "⇒ E[XY] = E[X] E[Y]  and  Cov = 0"])

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
    f = vcard("Order statistics are the sorted sample",
              ["F_min(x) = 1 − [1 − F(x)]ⁿ", "F_max(x) = F(x)ⁿ"])

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
    f = vcard("Total variance splits in two",
              "Var(X) = E[Var(X | Y)] + Var(E[X | Y])")

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
    f = vcard("Collapsing many variables into one",
              ["E[L] = Σ cᵢ E[Xᵢ]",
               "Var(L) = Σ cᵢ²Var(Xᵢ) + 2Σᵢ<ⱼ cᵢcⱼCov(Xᵢ, Xⱼ)"])

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
    f = vcard("Covariance is what independence removes",
              "Var(X₁ + X₂) = Var X₁ + Var X₂ + 2 Cov")

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
    f = vcard("Independent normals add to a normal",
              ["X₁ + X₂ ~ N(μ₁ + μ₂,  σ₁² + σ₂²)", "13 = 5 + 8,  5.96 = 1.96 + 4.00"])

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
    f = vcard("Average enough draws and the shape turns normal",
              ["(Sₙ − nμ) / (σ√n) → N(0, 1)", "so Sₙ ≈ N(nμ, nσ²) for large n"])

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
