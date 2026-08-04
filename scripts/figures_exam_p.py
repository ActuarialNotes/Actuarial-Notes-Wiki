"""Figures for the Exam P (Probability) concept pages.

Each builder returns a `Fig`; the `@figure` decorator records which
`Concepts/*.md` page it belongs to. Grouped in syllabus order:

1. General probability — sets, events, counting, conditioning
2. Univariate random variables — PDF/CDF, moments, the two uniforms
3. Insurance applications — deductible, limit, coinsurance, inflation
4. Multivariate — joint/marginal/conditional, covariance, order statistics,
   linear combinations
"""

from __future__ import annotations

import math

from figure_kit import (
    AMBER, BLUE, GREEN, ROSE, TEAL, VIOLET,
    Axes, Fig, axes, brace, universe, venn2,
)
from figure_registry import figure

W = 560


# ═══════════════════════════════════════════════════════════════════════════
# 1. General probability
# ═══════════════════════════════════════════════════════════════════════════

@figure("Probability", "Five of twelve equally likely outcomes shaded, and the "
        "resulting probability marked on a 0-to-1 scale", width=520)
def probability() -> Fig:
    f = Fig(W, 244)
    f.title("Probability as a proportion of equally likely outcomes")

    universe(f, 40, 58, 236, 116, "S")
    idx = 0
    shaded = {0, 1, 4, 6, 9}
    for r in range(3):
        for c in range(4):
            cx, cy = 74 + c * 54, 88 + r * 34
            on = idx in shaded
            f.circle(cx, cy, 12, fill=BLUE if on else "var(--surf)",
                     fill_opacity="0.85" if on else "1",
                     stroke=BLUE if on else "var(--edge)", stroke_width="1.4")
            idx += 1
    f.text(158, 190, "|E| = 5 shaded of |S| = 12", cls="sm dim")

    f.text(422, 76, "P(E) = |E| / |S| = 5/12 ≈ 0.42", cls="sm")
    x0, x1, y = 316, 528, 132
    f.rect(x0, y - 7, x1 - x0, 14, rx=7, fill="var(--soft)", stroke="var(--edge)")
    f.rect(x0, y - 7, (x1 - x0) * 5 / 12, 14, rx=7, fill=BLUE, fill_opacity="0.55")
    for v, lab in ((0, "0\nimpossible"), (0.5, "0.5"), (1, "1\ncertain")):
        x = x0 + (x1 - x0) * v
        f.line(x, y + 9, x, y + 14, cls="tick")
        parts = lab.split("\n")
        f.text(x, y + 27, parts[0], cls="sm dim")
        if len(parts) > 1:
            f.text(x, y + 39, parts[1], cls="sm dim")
    x = x0 + (x1 - x0) * 5 / 12
    f.arrow(x, y - 26, x, y - 11, colour=BLUE, width=1.6)
    f.text(x, y - 32, "P(E)", cls="sm bold", fill=BLUE)
    f.note(422, 200, "Every probability lives in [0, 1]")
    return f


@figure("Set Function", "A set function mapping events to real numbers", width=500)
def set_function() -> Fig:
    f = Fig(W, 238)
    f.title("A set function maps sets — not points — to numbers")

    universe(f, 26, 58, 214, 140, "S")
    ax_y0, ax_y1 = 78, 186
    blobs = [(136, 96, "A", BLUE, 0.78), (136, 132, "B", AMBER, 0.46),
             (136, 168, "C", GREEN, 0.18)]
    for cx, cy, lab, colour, _ in blobs:
        f.ellipse(cx, cy, 52, 17, fill=colour, fill_opacity="0.16", stroke=colour,
                  stroke_width="1.4")
        f.text(cx, cy + 4, lab, cls="sm bold", fill=colour)
    f.text(133, 216, "𝓕 — a collection of subsets of S", cls="sm dim")

    f.text(440, 62, "f : 𝓕 → ℝ", cls="bold")
    f.arrow(384, ax_y1 + 8, 384, ax_y0 - 8, colour="var(--axis)", width=1.1)
    f.text(366, ax_y0 - 12, "ℝ", cls="sm dim", anchor="end")
    for cx, cy, _, colour, v in blobs:
        y = ax_y1 - (ax_y1 - ax_y0) * v
        f.arrow(cx + 56, cy, 372, y, colour=colour, width=1.2, dash=True)
        f.line(380, y, 388, y, cls="tick")
        f.circle(384, y, 4, fill=colour)
    for lab, colour, v in (("f(A)", BLUE, 0.78), ("f(B)", AMBER, 0.46),
                           ("f(C)", GREEN, 0.18)):
        y = ax_y1 - (ax_y1 - ax_y0) * v
        f.text(396, y + 4, lab, cls="sm", anchor="start", fill=colour)
    f.note(390, 216, "Probability is the set function with f(S) = 1")
    return f


@figure("Sample Space", "A sample space partitioned into its elementary outcomes",
        width=520)
def sample_space() -> Fig:
    f = Fig(W, 254)
    f.title("The sample space collects every elementary outcome exactly once")

    universe(f, 34, 58, 254, 150, "S")
    for i in range(6):
        cx = 74 + (i % 3) * 76
        cy = 100 + (i // 3) * 62
        f.circle(cx, cy, 22, fill=BLUE, fill_opacity="0.12", stroke=BLUE,
                 stroke_width="1.3")
        f.text(cx, cy + 5, f"ω{'₁₂₃₄₅₆'[i]}", cls="sm")
    f.text(161, 226, "S = {ω₁, …, ω₆}  — one roll of a die", cls="sm dim")

    f.text(424, 72, "Two requirements", cls="bold")
    for i, (lab, sub) in enumerate((
        ("Mutually exclusive", "no two outcomes can occur together"),
        ("Collectively exhaustive", "together they cover every possibility"),
    )):
        y = 96 + i * 56
        f.box(316, y, 216, 44, colour=GREEN if i else AMBER)
        f.text(424, y + 18, lab, cls="sm bold")
        f.text(424, y + 33, sub, cls="sm dim")
    f.note(424, 226, "S may be finite, countable, or uncountable")
    return f


@figure("Event", "An event as a subset of the sample space, simple versus compound",
        width=520)
def event() -> Fig:
    f = Fig(W, 246)
    f.title("An event is any subset of the sample space")

    universe(f, 34, 58, 250, 140, "S")
    pts = [(78, 96), (132, 90), (188, 100), (240, 92),
           (86, 150), (140, 158), (196, 152), (244, 146)]
    f.ellipse(105, 122, 56, 46, fill=BLUE, fill_opacity="0.15", stroke=BLUE,
              stroke_width="1.5")
    f.text(70, 76, "E", cls="bold", fill=BLUE)
    f.ellipse(240, 92, 20, 18, fill=VIOLET, fill_opacity="0.15", stroke=VIOLET,
              stroke_width="1.5")
    f.text(266, 74, "F", cls="bold", fill=VIOLET)
    for x, y in pts:
        f.circle(x, y, 4, fill="var(--dim)")
    f.text(159, 216, "outcomes ω ∈ S", cls="sm dim")

    rows = [
        ("Simple event", "F = {ω₄} — exactly one outcome", VIOLET),
        ("Compound event", "E = {ω₁, ω₅} — two or more", BLUE),
        ("Certain / impossible", "P(S) = 1,  P(∅) = 0", "var(--dim)"),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        y = 72 + i * 50
        f.line(312, y + 4, 312, y + 34, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(324, y + 14, lab, cls="sm bold", anchor="start")
        f.text(324, y + 30, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 232, "Probability is assigned to events — that is, to subsets of S")
    return f


@figure("Axioms of Probability", "The three Kolmogorov axioms shown as diagrams",
        width=540)
def axioms_of_probability() -> Fig:
    f = Fig(W, 232)
    f.title("Kolmogorov's three axioms")

    panel_w, gap = 164, 16
    x0 = (W - (3 * panel_w + 2 * gap)) / 2
    xs = [x0 + i * (panel_w + gap) for i in range(3)]

    # 1 — P(S) = 1
    f.box(xs[0], 52, panel_w, 128, colour=None)
    f.rect(xs[0] + 22, 76, panel_w - 44, 62, rx=6, fill=BLUE, fill_opacity="0.22",
           stroke=BLUE, stroke_width="1.4")
    f.text(xs[0] + panel_w / 2, 112, "S", cls="bold")
    f.text(xs[0] + panel_w / 2, 158, "P(S) = 1", cls="sm bold")
    f.text(xs[0] + panel_w / 2, 173, "something must happen", cls="sm dim")

    # 2 — P(E) ≥ 0
    f.box(xs[1], 52, panel_w, 128, colour=None)
    bx0, bx1, by = xs[1] + 24, xs[1] + panel_w - 24, 104
    f.line(bx0, by, bx1, by, cls="axis")
    f.rect(bx0 + (bx1 - bx0) / 2, by - 26, (bx1 - bx0) / 2, 26, rx=3, fill=GREEN,
           fill_opacity="0.2", stroke=GREEN, stroke_width="1.2")
    f.line(bx0 + (bx1 - bx0) / 2, by - 34, bx0 + (bx1 - bx0) / 2, by + 8, cls="thin",
           stroke="var(--axis)", stroke_width="1.1")
    f.text(bx0 + (bx1 - bx0) / 2, by + 20, "0", cls="sm dim")
    f.text(bx0 + 26, by - 12, "✗", cls="sm", fill=ROSE)
    f.text(xs[1] + panel_w / 2, 158, "P(E) ≥ 0", cls="sm bold")
    f.text(xs[1] + panel_w / 2, 173, "no negative probability", cls="sm dim")

    # 3 — additivity
    f.box(xs[2], 52, panel_w, 128, colour=None)
    cy = 104
    f.circle(xs[2] + 54, cy, 26, fill=AMBER, fill_opacity="0.2", stroke=AMBER,
             stroke_width="1.4")
    f.circle(xs[2] + 112, cy, 26, fill=VIOLET, fill_opacity="0.2", stroke=VIOLET,
             stroke_width="1.4")
    f.text(xs[2] + 54, cy + 5, "E₁", cls="sm")
    f.text(xs[2] + 112, cy + 5, "E₂", cls="sm")
    f.text(xs[2] + panel_w / 2, 158, "P(E₁ ∪ E₂) = P(E₁) + P(E₂)", cls="sm bold")
    f.text(xs[2] + panel_w / 2, 173, "when they cannot overlap", cls="sm dim")

    f.note(W / 2, 208, "Everything else in probability is derived from these three")
    return f


@figure("Set Theory", "Union, intersection, complement and difference on Venn diagrams",
        width=540)
def set_theory() -> Fig:
    f = Fig(W, 250)
    f.title("Set operations are the language of events")

    labels = ["A ∪ B  (or)", "A ∩ B  (and)", "Aᶜ  (not)", "A \\ B  (only A)"]
    for i, lab in enumerate(labels):
        cx, cy, r, sep = 82 + i * 134, 108, 36, 36
        ax, bx = cx - sep / 2, cx + sep / 2
        px, py, pw, ph = cx - 62, cy - 52, 124, 104
        f.rect(px, py, pw, ph, rx=7, fill="var(--soft)", stroke="var(--edge)",
               stroke_width="1")
        f.text(px + 10, py + 14, "S", cls="sm dim")

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
        f.text(ax - 24, cy - 28, "A", cls="sm bold", fill=BLUE)
        f.text(bx + 24, cy - 28, "B", cls="sm bold", fill=AMBER)
        f.text(cx, cy + 74, lab, cls="sm")

    f.note(W / 2, 224, "An event is a subset of S; \"or\", \"and\", \"not\" are ∪, ∩, ᶜ")
    return f


@figure("Combinatorics", "Counting ordered arrangements versus unordered selections",
        width=540)
def combinatorics() -> Fig:
    f = Fig(W, 264)
    f.title("Choosing k from n: the two questions that pick the formula")

    # A 2×2 table: order matters? × repetition allowed? — n = 4, k = 2 throughout.
    x0, y0, cw, ch = 148, 78, 186, 62
    f.text(x0 + cw / 2, y0 - 12, "No repetition", cls="sm bold")
    f.text(x0 + cw + 8 + cw / 2, y0 - 12, "Repetition allowed", cls="sm bold")
    rows = [
        ("Order matters", "arrangements", [
            ("P(n,k) = n!/(n−k)!", "P(4,2) = 12", VIOLET),
            ("nᵏ", "4² = 16", AMBER),
        ]),
        ("Order ignored", "selections", [
            ("C(n,k) = n!/[k!(n−k)!]", "C(4,2) = 6", GREEN),
            ("C(n+k−1, k)", "C(5,2) = 10", TEAL),
        ]),
    ]
    for r, (head, sub, cells) in enumerate(rows):
        y = y0 + r * (ch + 10)
        f.text(138, y + 26, head, cls="sm bold", anchor="end")
        f.text(138, y + 42, sub, cls="sm dim", anchor="end")
        for c, (formula, example, colour) in enumerate(cells):
            x = x0 + c * (cw + 8)
            f.box(x, y, cw, ch, colour=colour)
            f.text(x + cw / 2, y + 26, formula, cls="sm mono")
            f.text(x + cw / 2, y + 45, example, cls="sm bold", fill=colour)

    f.line(28, 218, 532, 218, cls="rule")
    f.text(W / 2, 236, "Arranging all n objects is the k = n case:  n! = 4! = 24",
           cls="sm dim")
    f.text(W / 2, 252, "For equally likely outcomes P(A) = |A| / |S| — the counting is the work",
           cls="sm dim")
    return f


@figure("Combination", "The six unordered pairs chosen from four objects", width=520)
def combination() -> Fig:
    f = Fig(W, 246)
    f.title("C(4,2) = 6 — order does not matter")

    objs = ["A", "B", "C", "D"]
    for i, o in enumerate(objs):
        cx = 74 + i * 46
        f.circle(cx, 78, 16, fill=BLUE, fill_opacity="0.14", stroke=BLUE,
                 stroke_width="1.3")
        f.text(cx, 83, o, cls="sm")
    f.text(140, 112, "choose 2 of these 4", cls="sm dim")

    pairs = [("A", "B"), ("A", "C"), ("A", "D"), ("B", "C"), ("B", "D"), ("C", "D")]
    for i, (a, b) in enumerate(pairs):
        cx = 74 + (i % 3) * 62
        cy = 148 + (i // 3) * 44
        f.rect(cx - 26, cy - 15, 52, 30, rx=6, fill=GREEN, fill_opacity="0.12",
               stroke=GREEN, stroke_width="1.2")
        f.text(cx, cy + 5, f"{a}{b}", cls="sm")
    f.text(136, 226, "6 selections", cls="sm bold", fill=GREEN)

    f.text(410, 74, "C(n,k) = n! / [k!(n−k)!]", cls="sm bold")
    f.text(410, 96, "C(4,2) = 24 / (2 · 2) = 6", cls="sm dim")
    f.box(300, 116, 224, 46, colour=AMBER)
    f.text(412, 134, "AB and BA are the same choice", cls="sm")
    f.text(412, 150, "divide the 12 orderings by 2! = 2", cls="sm dim")
    f.box(300, 172, 224, 46, colour=VIOLET)
    f.text(412, 190, "C(n,k) = C(n, n−k)", cls="sm")
    f.text(412, 206, "picking who is in = picking who is out", cls="sm dim")
    return f


@figure("Permutation", "The twelve ordered pairs drawn from four objects", width=520)
def permutation() -> Fig:
    f = Fig(W, 254)
    f.title("P(4,2) = 12 — order matters")

    ordered = [("A", "B"), ("B", "A"), ("A", "C"), ("C", "A"), ("A", "D"), ("D", "A"),
               ("B", "C"), ("C", "B"), ("B", "D"), ("D", "B"), ("C", "D"), ("D", "C")]
    for i, (a, b) in enumerate(ordered):
        cx = 66 + (i % 4) * 62
        cy = 84 + (i // 4) * 44
        pair_index = i // 2
        colour = VIOLET if i % 2 == 0 else BLUE
        f.rect(cx - 26, cy - 15, 52, 30, rx=6, fill=colour, fill_opacity="0.12",
               stroke=colour, stroke_width="1.2")
        f.text(cx, cy + 5, f"{a}{b}", cls="sm")
        del pair_index
    f.text(159, 232, "12 ordered arrangements — AB ≠ BA", cls="sm dim")

    f.text(424, 74, "P(n,k) = n! / (n−k)!", cls="sm bold")
    f.text(424, 96, "P(4,2) = 24 / 2 = 12", cls="sm dim")
    f.box(316, 116, 216, 52, colour=GREEN)
    f.text(424, 136, "P(n,k) = C(n,k) × k!", cls="sm")
    f.text(424, 154, "12 = 6 × 2!", cls="sm dim")
    f.box(316, 178, 216, 52, colour=AMBER)
    f.text(424, 198, "Use when sequence matters", cls="sm")
    f.text(424, 216, "ranking, scheduling, distinct roles", cls="sm dim")
    return f


@figure("Independent Events", "Independence as a product of areas on the unit square",
        width=520)
def independent_events() -> Fig:
    f = Fig(W, 274)
    f.title("Independence multiplies: P(A ∩ B) = P(A) · P(B)")

    x0, y0, side = 80, 62, 152
    pa, pb = 0.6, 0.5
    f.rect(x0, y0, side, side, rx=4, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    f.rect(x0, y0, side * pa, side, rx=0, fill=BLUE, fill_opacity="0.14")
    f.rect(x0, y0, side, side * pb, rx=0, fill=AMBER, fill_opacity="0.14")
    f.rect(x0, y0, side * pa, side * pb, rx=0, fill=GREEN, fill_opacity="0.3")
    f.line(x0 + side * pa, y0, x0 + side * pa, y0 + side, cls="thin", stroke=BLUE,
           stroke_width="1.4")
    f.line(x0, y0 + side * pb, x0 + side, y0 + side * pb, cls="thin", stroke=AMBER,
           stroke_width="1.4")
    brace(f, x0, x0 + side * pa, y0 + side + 6, depth=7, label="P(A) = 0.6", colour=BLUE)
    f.text(x0 - 8, y0 + side * pb / 2 + 4, "P(B)", cls="sm", anchor="end", fill=AMBER)
    f.text(x0 - 8, y0 + side * pb / 2 + 18, "= 0.5", cls="sm", anchor="end", fill=AMBER)
    f.text(x0 + side * pa / 2, y0 + side * pb / 2 + 4, "0.30", cls="sm bold", fill=GREEN)

    f.text(410, 76, "Knowing B tells you nothing about A", cls="sm bold")
    rows = [
        ("P(A | B) = P(A)", "the conditional equals the unconditional", BLUE),
        ("P(A ∩ B) = P(A)P(B)", "0.6 × 0.5 = 0.30", GREEN),
        ("Verify, never assume", "a Venn overlap alone proves nothing", ROSE),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        y = 96 + i * 50
        f.line(300, y, 300, y + 32, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(312, y + 12, lab, cls="sm bold", anchor="start")
        f.text(312, y + 28, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 262, "Mutual independence needs the product rule on every subset")
    return f


@figure("Mutually Exclusive Events", "Disjoint events versus overlapping events",
        width=520)
def mutually_exclusive_events() -> Fig:
    f = Fig(W, 240)
    f.title("Mutually exclusive means the events cannot both occur")

    for i, (cx, sep, head, colour_b) in enumerate(((156, 92, "Mutually exclusive", AMBER),
                                                   (404, 44, "Not mutually exclusive",
                                                    AMBER))):
        f.rect(cx - 118, 58, 236, 118, rx=8, fill="var(--soft)", stroke="var(--edge)",
               stroke_width="1")
        f.text(cx - 106, 74, "S", cls="sm dim")
        venn2(f, cx, 118, r=46, sep=sep, colours=(BLUE, colour_b))
        if i == 0:
            f.text(cx, 190, "A ∩ B = ∅   →   P(A ∩ B) = 0", cls="sm")
            f.text(cx, 208, "P(A ∪ B) = P(A) + P(B)", cls="sm dim")
        else:
            f.defs.append(f'<clipPath id="meA"><circle cx="{cx - sep / 2}" cy="118" '
                          f'r="46"/></clipPath>')
            f.raw(f'<g clip-path="url(#meA)"><circle cx="{cx + sep / 2}" cy="118" '
                  f'r="46" fill="{ROSE}" fill-opacity="0.4"/></g>')
            f.text(cx, 190, "A ∩ B ≠ ∅   →   P(A ∩ B) > 0", cls="sm")
            f.text(cx, 208, "subtract the overlap once", cls="sm dim")
    f.text(280, 118, "vs", cls="sm dim")
    return f


@figure("Probability Addition Rule", "The addition rule correcting for a double-counted "
        "overlap", width=520)
def probability_addition_rule() -> Fig:
    f = Fig(W, 250)
    f.title("Add the parts, then subtract the double-counted overlap")

    cx, cy, r, sep = 158, 118, 54, 52
    f.rect(28, 56, 262, 126, rx=8, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1")
    f.text(40, 72, "S", cls="sm dim")
    ax, bx = cx - sep / 2, cx + sep / 2
    f.circle(ax, cy, r, fill=BLUE, fill_opacity="0.18", stroke=BLUE, stroke_width="1.5")
    f.circle(bx, cy, r, fill=AMBER, fill_opacity="0.18", stroke=AMBER, stroke_width="1.5")
    hh = math.sqrt(r * r - (sep / 2) ** 2)
    f.path(f"M{cx},{cy - hh:.2f} A{r},{r} 0 0 1 {cx},{cy + hh:.2f} "
           f"A{r},{r} 0 0 1 {cx},{cy - hh:.2f} Z",
           cls="", fill=ROSE, fill_opacity="0.4", stroke="none")
    f.text(ax - 26, cy + 4, "0.30", cls="sm")
    f.text(cx, cy + 4, "0.15", cls="sm bold")
    f.text(bx + 26, cy + 4, "0.25", cls="sm")
    f.text(ax - 30, cy - 44, "A", cls="bold", fill=BLUE)
    f.text(bx + 30, cy - 44, "B", cls="bold", fill=AMBER)
    f.text(158, 200, "P(A) = 0.45,  P(B) = 0.40,  P(A ∩ B) = 0.15", cls="sm dim")

    f.text(424, 82, "P(A ∪ B)", cls="bold")
    steps = [("+ P(A)", "0.45", BLUE), ("+ P(B)", "0.40", AMBER),
             ("− P(A ∩ B)", "0.15", ROSE), ("= P(A ∪ B)", "0.70", GREEN)]
    for i, (lab, val, colour) in enumerate(steps):
        y = 104 + i * 28
        if i == 3:
            f.line(322, y - 14, 526, y - 14, cls="rule")
        f.text(322, y, lab, cls="sm", anchor="start",
               fill=colour if i < 3 else "var(--ink)")
        f.text(526, y, val, cls="sm bold" if i == 3 else "sm", anchor="end",
               fill=GREEN if i == 3 else "var(--ink)")
    f.note(424, 232, "Disjoint events have nothing to subtract")
    return f


@figure("Probability Multiplication Rule", "A two-stage probability tree whose branch "
        "probabilities multiply", width=520)
def probability_multiplication_rule() -> Fig:
    f = Fig(W, 284)
    f.title("Chain the stages: P(A ∩ B) = P(A) · P(B | A)")

    root = (58, 150)
    f.circle(*root, 6, fill="var(--dim)")
    first = [("A", 0.30, 92, BLUE), ("Aᶜ", 0.70, 208, "var(--dim)")]
    for lab, p, y, colour in first:
        f.arrow(root[0] + 8, root[1], 148, y, colour=colour, width=1.5)
        f.text(102, (root[1] + y) / 2 - 8, f"{p:.2f}", cls="sm", fill=colour)
        f.circle(156, y, 15, fill=colour, fill_opacity="0.14", stroke=colour,
                 stroke_width="1.3")
        f.text(156, y + 4, lab, cls="sm")

    branches = [
        (92, "B | A", 0.80, 66, GREEN, "0.30 × 0.80 = 0.24", True),
        (92, "Bᶜ | A", 0.20, 122, "var(--dim)", "0.30 × 0.20 = 0.06", False),
        (208, "B | Aᶜ", 0.10, 182, GREEN, "0.70 × 0.10 = 0.07", False),
        (208, "Bᶜ | Aᶜ", 0.90, 238, "var(--dim)", "0.70 × 0.90 = 0.63", False),
    ]
    for y_from, lab, p, y_to, colour, product, highlight in branches:
        f.arrow(172, y_from, 268, y_to, colour=colour, width=1.4)
        f.text(216, (y_from + y_to) / 2 - 7, f"{p:.2f}", cls="sm", fill=colour)
        f.circle(278, y_to, 15, fill=colour, fill_opacity="0.14", stroke=colour,
                 stroke_width="1.3")
        f.text(278, y_to + 4, lab.split(" ")[0], cls="sm")
        f.text(306, y_to + 4, product, cls="sm bold" if highlight else "sm dim",
               anchor="start")

    f.line(28, 262, 532, 262, cls="rule")
    f.note(W / 2, 278, "The four paths partition the space — their probabilities sum to 1")
    return f


@figure("Inclusion-Exclusion Principle", "Alternating signs over the seven regions of a "
        "three-set Venn diagram", width=540)
def inclusion_exclusion() -> Fig:
    f = Fig(W, 286)
    f.title("Add singles, subtract pairs, add back the triple")

    cx, cy, r = 168, 146, 58
    centres = [(cx, cy - 32), (cx - 34, cy + 26), (cx + 34, cy + 26)]
    colours = [BLUE, AMBER, GREEN]
    names = ["A", "B", "C"]
    for (x, y), colour in zip(centres, colours):
        f.circle(x, y, r, fill=colour, fill_opacity="0.16", stroke=colour,
                 stroke_width="1.5")
    f.text(centres[0][0], centres[0][1] - r - 8, "A", cls="bold", fill=BLUE)
    f.text(centres[1][0] - r - 4, centres[1][1] + r - 6, "B", cls="bold", fill=AMBER)
    f.text(centres[2][0] + r + 4, centres[2][1] + r - 6, "C", cls="bold", fill=GREEN)
    del names
    signs = [(cx, cy - 62, "+"), (cx - 52, cy + 44, "+"), (cx + 52, cy + 44, "+"),
             (cx - 30, cy - 6, "−"), (cx + 30, cy - 6, "−"), (cx, cy + 46, "−"),
             (cx, cy + 12, "+")]
    for x, y, s in signs:
        f.text(x, y + 4, s, cls="bold")
    f.text(168, 250, "every region ends up counted exactly once", cls="sm dim")

    f.text(420, 78, "P(A ∪ B ∪ C)", cls="bold")
    lines = [
        ("+ P(A) + P(B) + P(C)", BLUE),
        ("− P(A∩B) − P(A∩C) − P(B∩C)", ROSE),
        ("+ P(A∩B∩C)", GREEN),
    ]
    for i, (s, colour) in enumerate(lines):
        f.text(310, 106 + i * 26, s, cls="sm", anchor="start", fill=colour)
    f.box(300, 182, 236, 62, colour=AMBER)
    f.text(418, 202, "Two events", cls="sm bold")
    f.text(418, 220, "P(A ∪ B) = P(A) + P(B) − P(A∩B)", cls="sm dim")
    f.text(418, 236, "disjoint events drop every ∩ term", cls="sm dim")
    return f


@figure("Conditional Probability", "Conditioning on B rescales the sample space to B",
        width=540)
def conditional_probability() -> Fig:
    f = Fig(W, 262)
    f.title("Conditioning shrinks the sample space to B")

    # Left — the full space
    f.rect(30, 58, 234, 130, rx=8, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1")
    f.text(42, 74, "S", cls="sm dim")
    cx, cy, r, sep = 146, 122, 50, 52
    ax, bx = cx - sep / 2, cx + sep / 2
    f.circle(ax, cy, r, fill=BLUE, fill_opacity="0.16", stroke=BLUE, stroke_width="1.5")
    f.circle(bx, cy, r, fill=AMBER, fill_opacity="0.16", stroke=AMBER, stroke_width="1.5")
    hh = math.sqrt(r * r - (sep / 2) ** 2)
    f.path(f"M{cx},{cy - hh:.2f} A{r},{r} 0 0 1 {cx},{cy + hh:.2f} "
           f"A{r},{r} 0 0 1 {cx},{cy - hh:.2f} Z",
           cls="", fill=VIOLET, fill_opacity="0.4", stroke="none")
    f.text(ax - 28, cy - 40, "A", cls="bold", fill=BLUE)
    f.text(bx + 28, cy - 40, "B", cls="bold", fill=AMBER)
    f.text(cx, cy + 4, "0.12", cls="sm bold")
    f.text(bx + 24, cy + 4, "0.28", cls="sm")
    f.text(147, 206, "P(A ∩ B) = 0.12,  P(B) = 0.40", cls="sm dim")

    f.arrow(276, 122, 306, 122, colour="var(--dim)", width=1.5)
    f.text(291, 108, "given B", cls="sm dim")

    # Right — B becomes the new universe, and A takes 30% of it
    ccx, ccy, cr, frac = 404, 122, 60, 0.30
    f.text(ccx, 66, "the new sample space is B", cls="sm dim")
    f.circle(ccx, ccy, cr, fill=AMBER, fill_opacity="0.12", stroke=AMBER,
             stroke_width="1.6")
    theta = 2 * math.pi * frac
    ex, ey = ccx + cr * math.sin(theta), ccy - cr * math.cos(theta)
    f.path(f"M{ccx},{ccy} L{ccx},{ccy - cr} A{cr},{cr} 0 0 1 {ex:.2f},{ey:.2f} Z",
           cls="", fill=VIOLET, fill_opacity="0.42", stroke="none")
    f.line(ccx, ccy, ccx, ccy - cr, cls="thin", stroke=VIOLET, stroke_width="1.2")
    f.line(ccx, ccy, ex, ey, cls="thin", stroke=VIOLET, stroke_width="1.2")
    f.text(ccx + 26, ccy - 22, "A ∩ B", cls="sm bold", fill=VIOLET)
    f.text(ccx - 16, ccy + 26, "B ∩ Aᶜ", cls="sm dim")
    f.text(ccx, 202, "P(A | B) = 0.12 / 0.40 = 0.30", cls="sm bold")
    f.note(ccx, 222, "30% of B is also A")
    f.note(W / 2, 248, "P(A | B) = P(A ∩ B) / P(B),  P(B) > 0")
    return f


@figure("The Law of Total Probability", "B decomposed across a partition of the sample "
        "space", width=540)
def law_of_total_probability() -> Fig:
    f = Fig(W, 276)
    f.title("Split B across a partition, then weight the pieces")

    x0, y0, w, h = 32, 58, 268, 140
    f.rect(x0, y0, w, h, rx=8, fill="var(--soft)", stroke="var(--edge)", stroke_width="1")
    parts = [("A₁", 0.30, BLUE), ("A₂", 0.25, AMBER), ("A₃", 0.25, GREEN),
             ("A₄", 0.20, VIOLET)]
    x = x0
    for lab, frac, colour in parts:
        pw = w * frac
        f.rect(x, y0, pw, h, rx=0, fill=colour, fill_opacity="0.12")
        f.line(x, y0, x, y0 + h, cls="", stroke="var(--edge)", stroke_width="1")
        f.text(x + pw / 2, y0 + 18, lab, cls="sm bold", fill=colour)
        x += pw
    f.ellipse(x0 + w * 0.46, y0 + 84, 96, 40, fill=ROSE, fill_opacity="0.28",
              stroke=ROSE, stroke_width="1.6")
    f.text(x0 + w * 0.46, y0 + 88, "B", cls="bold", fill=ROSE)
    f.text(166, 214, "S is partitioned; B is cut into B ∩ Aᵢ", cls="sm dim")

    f.text(426, 74, "P(B) = Σ P(B | Aᵢ) P(Aᵢ)", cls="sm bold")
    rows = [("A₁", 0.30, 0.10, BLUE), ("A₂", 0.25, 0.40, AMBER),
            ("A₃", 0.25, 0.20, GREEN), ("A₄", 0.20, 0.05, VIOLET)]
    f.text(322, 96, "P(Aᵢ)", cls="sm dim", anchor="start")
    f.text(392, 96, "P(B | Aᵢ)", cls="sm dim", anchor="middle")
    f.text(528, 96, "product", cls="sm dim", anchor="end")
    total = 0.0
    for i, (lab, pa, pb, colour) in enumerate(rows):
        y = 116 + i * 22
        total += pa * pb
        f.text(322, y, f"{lab}   {pa:.2f}", cls="sm", anchor="start", fill=colour)
        f.text(392, y, f"{pb:.2f}", cls="sm")
        f.text(528, y, f"{pa * pb:.3f}", cls="sm", anchor="end")
    f.line(322, 212, 528, 212, cls="rule")
    f.text(322, 228, "P(B)", cls="sm bold", anchor="start")
    f.text(528, 228, f"{total:.3f}", cls="sm bold", anchor="end", fill=ROSE)
    f.note(W / 2, 262, "The Aᵢ must be mutually exclusive and exhaustive")
    return f


@figure("Discrete Univariate Distributions", "A decision path from the wording of a "
        "question to the right discrete family", width=540)
def discrete_univariate() -> Fig:
    f = Fig(W, 300)
    f.title("Identifying the discrete family", "read for what is counted and whether the "
            "trial count is fixed")

    branches = [
        ("Fixed number of trials", [
            ("with replacement / independent", "Binomial (n, p)", "E[X] = np", BLUE),
            ("without replacement, finite pool", "Hypergeometric (N, K, n)",
             "E[X] = nK/N", VIOLET),
        ]),
        ("Trials until a success", [
            ("first success", "Geometric (p)", "E[X] = 1/p", GREEN),
            ("r-th success", "Negative binomial (r, p)", "E[X] = r/p", TEAL),
        ]),
        ("No trials at all", [
            ("count per unit time or space", "Poisson (λ)", "E[X] = λ", AMBER),
            ("n equally likely values", "Discrete uniform", "E[X] = (n+1)/2", ROSE),
        ]),
    ]
    y = 66
    for head, rows in branches:
        f.text(34, y + 12, head, cls="sm bold", anchor="start")
        for cue, family, moment, colour in rows:
            f.line(34, y + 24, 34, y + 44, cls="", stroke=colour, stroke_width="2.4",
                   stroke_linecap="round")
            f.text(44, y + 36, cue, cls="sm dim", anchor="start")
            f.text(300, y + 36, family, cls="sm bold", anchor="start", fill=colour)
            f.text(544 - 16, y + 36, moment, cls="sm dim", anchor="end")
            y += 24
        y += 18
    f.line(28, 258, 532, 258, cls="rule")
    f.text(34, 274, "Variance ÷ mean:  < 1 binomial   = 1 Poisson   > 1 negative binomial",
           cls="sm dim", anchor="start")
    f.text(34, 290, "\"At least one\" → use 1 − P(X = 0)", cls="sm dim", anchor="start")
    return f


@figure("Continuous Univariate Distributions", "Shapes and supports of the six continuous "
        "families on the syllabus", width=540)
def continuous_univariate() -> Fig:
    f = Fig(W, 312)
    f.title("The six continuous families", "match the story and check the support")

    def draw(px, py, pw, ph, fn, colour, xa, xb, name, support, mean):
        a = axes(f, 0, 1, 0, 1)
        a.x0, a.y0, a.x1, a.y1 = px, py, px + pw, py + ph
        a.xmin, a.xmax = xa, xb
        ys = [fn(xa + (xb - xa) * i / 60) for i in range(61)]
        a.ymin, a.ymax = 0, max(ys) * 1.18
        f.line(px, py + ph, px + pw, py + ph, cls="axis")
        a.area(fn, xa, xb, colour=colour, opacity="0.16")
        a.curve(fn, colour=colour, n=90)
        f.text(px + pw / 2, py - 6, name, cls="sm bold", fill=colour)
        f.text(px + pw / 2, py + ph + 15, support, cls="sm dim")
        f.text(px + pw / 2, py + ph + 29, mean, cls="sm dim")

    cw, gap = 150, 22
    x0 = (W - (3 * cw + 2 * gap)) / 2
    row_y = [80, 200]
    specs = [
        (lambda x: 1.0 if 0.15 < x < 0.85 else 0.001, BLUE, 0, 1, "Uniform (a, b)",
         "on (a, b)", "E[X] = (a+b)/2"),
        (lambda x: math.exp(-x), AMBER, 0, 4, "Exponential (θ)", "on (0, ∞)",
         "E[X] = θ  ·  memoryless"),
        (lambda x: x * math.exp(-x), GREEN, 0, 8, "Gamma (α, θ)", "on (0, ∞)",
         "E[X] = αθ"),
        (lambda x: max(x, 1e-6) ** 1.5 * max(1 - x, 1e-6) ** 2.5, VIOLET, 0, 1,
         "Beta (α, β)", "on (0, 1)", "E[X] = α/(α+β)"),
        (lambda x: math.exp(-x * x / 2), ROSE, -3.2, 3.2, "Normal (μ, σ²)", "on ℝ",
         "E[X] = μ  ·  sums & averages"),
        (lambda x: math.exp(-((math.log(max(x, 1e-6)) - 0.0) ** 2) / (2 * 0.6 ** 2)) /
                   max(x, 1e-6), TEAL, 0.02, 5, "Lognormal (μ, σ²)", "on (0, ∞)",
         "ln X is normal"),
    ]
    for i, (fn, colour, xa, xb, name, support, mean) in enumerate(specs):
        px = x0 + (i % 3) * (cw + gap)
        py = row_y[i // 3]
        draw(px, py, cw, 56, fn, colour, xa, xb, name, support, mean)
    f.note(W / 2, 302, "All probability is area: P(a ≤ X ≤ b) = ∫ f(x) dx")
    return f


def _npdf(x, mu=0.0, sd=1.0):
    return math.exp(-((x - mu) ** 2) / (2 * sd * sd)) / (sd * math.sqrt(2 * math.pi))


def _lognorm(x, mu=0.0, sd=0.7):
    if x <= 0:
        return 0.0
    return math.exp(-((math.log(x) - mu) ** 2) / (2 * sd * sd)) / (x * sd * math.sqrt(2 * math.pi))


# ═══════════════════════════════════════════════════════════════════════════
# 2. Univariate random variables
# ═══════════════════════════════════════════════════════════════════════════

@figure("Random Variable", "A random variable mapping outcomes of two coin tosses to the "
        "number of heads", width=520)
def random_variable() -> Fig:
    f = Fig(W, 254)
    f.title("A random variable is a function from outcomes to numbers")

    universe(f, 30, 62, 176, 150, "S")
    outcomes = [("HH", 2), ("HT", 1), ("TH", 1), ("TT", 0)]
    for i, (lab, _) in enumerate(outcomes):
        cy = 92 + i * 36
        f.rect(56, cy - 14, 60, 28, rx=6, fill=BLUE, fill_opacity="0.12", stroke=BLUE,
               stroke_width="1.2")
        f.text(86, cy + 4, lab, cls="sm")
    f.text(118, 228, "outcomes of two coin tosses", cls="sm dim")

    # the real line
    lx0, lx1, ly = 300, 500, 138
    f.arrow(lx0 - 16, ly, lx1 + 14, ly, colour="var(--axis)", width=1.1)
    f.text(lx1 + 24, ly + 4, "ℝ", cls="sm dim", anchor="start")
    targets = {}
    for k in (0, 1, 2):
        x = lx0 + k * (lx1 - lx0) / 2
        targets[k] = x
        f.line(x, ly - 5, x, ly + 5, cls="tick")
        f.circle(x, ly, 4.5, fill=VIOLET)
        f.text(x, ly + 20, str(k), cls="sm")
    for i, (_, k) in enumerate(outcomes):
        cy = 92 + i * 36
        f.arrow(120, cy, targets[k] - 4, ly - 10, colour="var(--dim)", width=1, dash=True)
    f.text(400, 88, "X = number of heads", cls="sm bold")
    f.text(400, 186, "X : S → ℝ", cls="sm dim")
    f.note(400, 210, "Discrete: countably many values")
    f.note(400, 226, "Continuous: an interval of values")
    return f


@figure("Probability Density Function (PDF)", "Probability as the area under a density "
        "curve between a and b", width=520)
def pdf() -> Fig:
    f = Fig(W, 268)
    f.title("For a density, probability is area — never height")

    a = axes(f, -3.4, 3.4, 0, 0.46, left=52, right=180, top=58, bottom=56)
    a.area(_npdf, -0.6, 1.5, colour=BLUE, opacity="0.26")
    a.curve(_npdf, colour=BLUE)
    a.frame(ylabel="f(x)", xticks=[-0.6, 1.5],
            xfmt=lambda t: "a" if t < 0 else "b")
    a.label(0.45, 0.10, "P(a ≤ X ≤ b)", cls="sm bold")
    a.vline(-0.6, y_top=_npdf(-0.6), colour=BLUE)
    a.vline(1.5, y_top=_npdf(1.5), colour=BLUE)

    rows = [
        ("f(x) ≥ 0", "a density is never negative", BLUE),
        ("∫ f(x) dx = 1", "total area is exactly 1", GREEN),
        ("P(X = c) = 0", "a single point has no width", ROSE),
        ("f(x) may exceed 1", "a density is not a probability", AMBER),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        y = 66 + i * 46
        f.line(376, y, 376, y + 30, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(386, y + 11, lab, cls="sm bold", anchor="start")
        f.text(386, y + 26, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 256, "P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx — endpoints never matter")
    return f


@figure("Cumulative Distribution Function (CDF)", "A density and the CDF that accumulates "
        "its area", width=540)
def cdf() -> Fig:
    f = Fig(W, 320)
    f.title("The CDF accumulates the density from the left")

    x_star = 0.7
    a1 = axes(f, -3.2, 3.2, 0, 0.46, left=54, right=210, top=60, bottom=190)
    a1.area(_npdf, -3.2, x_star, colour=BLUE, opacity="0.24")
    a1.curve(_npdf, colour=BLUE)
    a1.frame(ylabel="f(x)", xticks=[x_star], xfmt=lambda t: "x")
    a1.label(-0.9, 0.11, "area = F(x)", cls="sm bold")

    a2 = axes(f, -3.2, 3.2, 0, 1.08, left=54, right=210, top=206, bottom=48)
    a2.curve(lambda t: 0.5 * (1 + math.erf(t / math.sqrt(2))), colour=VIOLET)
    a2.frame(ylabel="F(x)", xticks=[x_star], yticks=[0, 0.5, 1],
             xfmt=lambda t: "x", yfmt=lambda t: f"{t:g}")
    fv = 0.5 * (1 + math.erf(x_star / math.sqrt(2)))
    a2.hline(fv, x_to=x_star, colour=VIOLET)
    f.text(a2.x0 - 8, a2.py(fv) + 3.6, f"{fv:.2f}", cls="sm bold", anchor="end",
           fill=VIOLET)
    a2.vline(x_star, y_top=fv, colour=VIOLET)
    a2.point(x_star, fv, colour=VIOLET)

    rows = [
        ("F(x) = P(X ≤ x)", VIOLET),
        ("non-decreasing, right-continuous", "var(--dim)"),
        ("F(−∞) = 0,  F(∞) = 1", "var(--dim)"),
        ("f(x) = F′(x)", BLUE),
        ("P(a < X ≤ b) = F(b) − F(a)", GREEN),
    ]
    f.text(356, 92, "Reading the CDF", cls="sm bold", anchor="start")
    for i, (lab, colour) in enumerate(rows):
        f.text(356, 116 + i * 24, lab, cls="sm" if i in (0, 3, 4) else "sm dim",
               anchor="start", fill=colour if i in (0, 3, 4) else None)
    f.note(356, 252, "A discrete CDF is a staircase:", anchor="start")
    f.note(356, 268, "flat, then jumping by p(k)", anchor="start")
    return f


@figure("Percentile", "The percentile read off the CDF and the matching tail area",
        width=540)
def percentile() -> Fig:
    f = Fig(W, 300)
    f.title("The 100p-th percentile inverts the CDF")

    p = 0.90
    xp = 1.2816
    a1 = axes(f, -3.2, 3.4, 0, 0.46, left=54, right=304, top=62, bottom=112)
    a1.area(_npdf, -3.2, xp, colour=BLUE, opacity="0.2")
    a1.area(_npdf, xp, 3.4, colour=ROSE, opacity="0.3")
    a1.curve(_npdf, colour=BLUE)
    a1.frame(xticks=[xp], xfmt=lambda t: "x₀.₉₀", ylabel="f(x)")
    a1.label(-0.8, 0.11, "0.90", cls="sm bold")
    a1.label(2.15, 0.05, "0.10", cls="sm bold")

    a2 = axes(f, -3.2, 3.4, 0, 1.08, left=336, right=26, top=62, bottom=112)
    a2.curve(lambda t: 0.5 * (1 + math.erf(t / math.sqrt(2))), colour=VIOLET)
    a2.frame(xticks=[xp], xfmt=lambda t: "x₀.₉₀", yticks=[0, 0.5, 0.9],
             yfmt=lambda t: f"{t:g}", ylabel="F(x)")
    a2.hline(p, x_to=xp, colour=VIOLET)
    a2.vline(xp, y_top=p, colour=VIOLET)
    a2.point(xp, p, colour=VIOLET)
    a2.label(-1.6, 0.97, "start at p, read across, drop down", cls="sm dim")

    f.line(28, 214, 532, 214, cls="rule")
    rows = [
        ("xₚ = F⁻¹(p)", "smallest x with F(x) = p", VIOLET),
        ("p = 0.50", "the median", BLUE),
        ("Value at Risk", "a high percentile of loss", ROSE),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        x = 40 + i * 172
        f.line(x, 230, x, 260, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(x + 10, 241, lab, cls="sm bold", anchor="start")
        f.text(x + 10, 256, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 288, "Where F is flat or jumps, take the smallest x that works")
    return f


@figure("Expected Value", "The mean as the balance point of a distribution", width=520)
def expected_value() -> Fig:
    f = Fig(W, 276)
    f.title("The mean is the balance point of the distribution")

    a = axes(f, 0, 6.2, 0, 0.42, left=52, right=250, top=62, bottom=86)
    a.curve(lambda t: _lognorm(t, 0.55, 0.55), colour=BLUE)
    a.area(lambda t: _lognorm(t, 0.55, 0.55), 0.02, 6.2, colour=BLUE, opacity="0.14")
    a.frame(xlabel="x", ylabel="f(x)")
    mu = math.exp(0.55 + 0.55 ** 2 / 2)
    a.vline(mu, colour=AMBER, y_top=0.40)
    a.label(mu, 0.30, "μ = E[X]", cls="sm bold", dx=34, dy=-2)
    px = a.px(mu)
    f.polygon([(px, a.y1 + 2), (px - 9, a.y1 + 16), (px + 9, a.y1 + 16)], fill=AMBER)
    f.line(a.x0, a.y1 + 2, a.x1, a.y1 + 2, cls="", stroke=AMBER, stroke_width="1.6")
    f.text((a.x0 + a.x1) / 2, a.y1 + 34, "the distribution balances here", cls="sm dim")

    f.text(414, 84, "E[X] weights every value", cls="sm bold")
    f.text(414, 106, "by how likely it is", cls="sm dim")
    rows = [
        ("Discrete", "E[X] = Σ k · f(k)", BLUE),
        ("Continuous", "E[X] = ∫ x · f(x) dx", VIOLET),
        ("Linearity", "E[aX + b] = a E[X] + b", GREEN),
        ("Moments", "n-th moment E[Xⁿ]", AMBER),
    ]
    for i, (lab, formula, colour) in enumerate(rows):
        y = 128 + i * 38
        f.line(312, y, 312, y + 26, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(322, y + 10, lab, cls="sm bold", anchor="start")
        f.text(322, y + 24, formula, cls="sm dim", anchor="start")
    return f


@figure("Variance", "Two distributions with the same mean and different variance",
        width=520)
def variance() -> Fig:
    f = Fig(W, 276)
    f.title("Variance is the average squared distance from the mean")

    a = axes(f, -5, 5, 0, 0.46, left=52, right=228, top=62, bottom=76)
    a.curve(lambda t: _npdf(t, 0, 1.9), colour=AMBER)
    a.curve(lambda t: _npdf(t, 0, 1.0), colour=BLUE)
    a.frame(xlabel="x", ylabel="f(x)", xticks=[0], xfmt=lambda t: "μ")
    a.label(0.45, 0.42, "σ² = 1", cls="sm bold", anchor="start")
    a.label(2.6, 0.20, "σ² = 3.6", cls="sm bold", anchor="start")
    for sd, colour, y in ((1.0, BLUE, 0.055), (1.9, AMBER, 0.02)):
        x1, y1 = a.p(-sd, y)
        x2, _ = a.p(sd, y)
        f.arrow(x1, y1, x2, y1, colour=colour, width=1.3)
        f.arrow(x2, y1, x1, y1, colour=colour, width=1.3)
    f.text(a.px(0), a.py(0.055) - 8, "±σ", cls="sm", fill=BLUE)

    f.text(432, 86, "Var(X) = E[(X − μ)²]", cls="sm bold")
    f.text(432, 106, "= E[X²] − μ²", cls="sm dim")
    rows = [
        ("Var(aX + b) = a² Var(X)", "shifts do not change spread", GREEN),
        ("Var(X) ≥ 0", "zero only for a constant X", BLUE),
        ("Units are squared", "take √ for standard deviation", AMBER),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        y = 126 + i * 46
        f.line(336, y, 336, y + 32, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(346, y + 12, lab, cls="sm bold", anchor="start")
        f.text(346, y + 28, sub, cls="sm dim", anchor="start")
    return f


@figure("Standard Deviation", "The one-, two- and three-sigma bands of a distribution",
        width=520)
def standard_deviation() -> Fig:
    f = Fig(W, 268)
    f.title("Standard deviation measures spread in the units of X")

    a = axes(f, -3.6, 3.6, 0, 0.44, left=54, right=54, top=64, bottom=84)
    bands = [(1, "68%", BLUE), (2, "95%", VIOLET), (3, "99.7%", AMBER)]
    for k, _, colour in reversed(bands):
        a.area(_npdf, -k, k, colour=colour, opacity="0.14")
    a.curve(_npdf, colour=BLUE)
    a.frame(xlabel="x", ylabel="f(x)", xticks=[-3, -2, -1, 0, 1, 2, 3],
            xfmt=lambda t: "μ" if t == 0 else (f"μ{'+' if t > 0 else '−'}{abs(int(t))}σ"))
    for k, lab, colour in bands:
        a.label(0, 0.44 - 0.0, "", cls="sm")
        y = {1: 0.20, 2: 0.105, 3: 0.028}[k]
        x1, y1 = a.p(-k, y)
        x2, _ = a.p(k, y)
        f.arrow(x1, y1, x2, y1, colour=colour, width=1.2)
        f.arrow(x2, y1, x1, y1, colour=colour, width=1.2)
        f.text(a.px(0), y1 - 6, lab, cls="sm bold", fill=colour)

    f.line(28, 204, 532, 204, cls="rule")
    f.text(150, 226, "σ = √Var(X)", cls="sm bold")
    f.text(150, 244, "same units as X — directly interpretable", cls="sm dim")
    f.text(400, 226, "σ(aX + b) = |a| σ(X)", cls="sm bold")
    f.text(400, 244, "the bands shown are the normal case", cls="sm dim")
    return f


@figure("Coefficient of Variation", "Equal standard deviations meaning very different "
        "relative risk", width=520)
def coefficient_of_variation() -> Fig:
    f = Fig(W, 272)
    f.title("CV measures spread relative to the mean")

    a = axes(f, 0, 12, 0, 0.46, left=52, right=214, top=62, bottom=96)
    a.curve(lambda t: _npdf(t, 2.2, 0.9), colour=ROSE)
    a.curve(lambda t: _npdf(t, 8.0, 0.9), colour=BLUE)
    a.frame(ylabel="f(x)", xticks=[2.2, 8.0], xfmt=lambda t: f"μ = {t:g}")
    a.label(2.2, 0.47, "CV = 0.41", cls="sm bold", dy=-4)
    a.label(8.0, 0.47, "CV = 0.11", cls="sm bold", dy=-4)
    for mu, colour in ((2.2, ROSE), (8.0, BLUE)):
        x1, y1 = a.p(mu - 0.9, 0.06)
        x2, _ = a.p(mu + 0.9, 0.06)
        f.arrow(x1, y1, x2, y1, colour=colour, width=1.2)
        f.arrow(x2, y1, x1, y1, colour=colour, width=1.2)
    f.text((a.x0 + a.x1) / 2, a.y1 + 36, "both have σ = 0.9 — only the mean differs",
           cls="sm dim")

    f.text(432, 84, "CV = σ / μ", cls="sm bold")
    f.text(432, 104, "= √Var(X) / E[X]", cls="sm dim")
    rows = [
        ("Dimensionless", "compares across units and scales", GREEN),
        ("Larger CV", "more risk per dollar of expected loss", ROSE),
        ("Needs E[X] > 0", "meaningless around a zero mean", AMBER),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        y = 126 + i * 46
        f.line(336, y, 336, y + 32, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(346, y + 12, lab, cls="sm bold", anchor="start")
        f.text(346, y + 28, sub, cls="sm dim", anchor="start")
    return f


@figure("Uniform Discrete", "The discrete uniform PMF and CDF for a fair die", width=520)
def uniform_discrete() -> Fig:
    f = Fig(W, 274)
    f.title("Discrete uniform: every one of n values is equally likely")

    a1 = axes(f, 0.3, 6.7, 0, 0.24, left=52, right=310, top=64, bottom=96)
    a1.stems([(k, 1 / 6) for k in range(1, 7)], colour=BLUE)
    a1.frame(xlabel="k", ylabel="P(X = k)", xticks=list(range(1, 7)),
             yticks=[1 / 6], yfmt=lambda t: "1/6")
    f.text((a1.x0 + a1.x1) / 2, a1.y1 + 38, "PMF — a fair die, n = 6", cls="sm dim")

    a2 = axes(f, 0.3, 6.9, 0, 1.1, left=336, right=40, top=64, bottom=96)
    pts = []
    for k in range(1, 7):
        pts.append((k, k / 6))
    a2.frame(xlabel="k", ylabel="F(k)", xticks=list(range(1, 7)), yticks=[0, 0.5, 1],
             yfmt=lambda t: f"{t:g}")
    prev = 0.0
    for k, v in pts:
        x1 = a2.px(k)
        x2 = a2.px(k + 1) if k < 6 else a2.x1
        f.line(x1, a2.py(v), x2, a2.py(v), cls="curve", stroke=VIOLET, stroke_width="2")
        f.line(x1, a2.py(prev), x1, a2.py(v), cls="curve dash", stroke=VIOLET,
               stroke_width="1.2")
        f.circle(x1, a2.py(v), 3, fill=VIOLET)
        prev = v
    f.text((a2.x0 + a2.x1) / 2, a2.y1 + 38, "CDF — a staircase of 1/n jumps",
           cls="sm dim")

    f.line(28, 216, 532, 216, cls="rule")
    f.text(150, 238, "E[X] = (n+1)/2 = 3.5", cls="sm bold")
    f.text(150, 256, "Var(X) = (n²−1)/12 = 35/12 ≈ 2.92", cls="sm dim")
    f.text(400, 238, "Spread depends only on how many values", cls="sm bold")
    f.text(400, 256, "not on where the range sits", cls="sm dim")
    return f


@figure("Uniform Continuous Distribution", "The continuous uniform density and its "
        "straight-line CDF", width=520)
def uniform_continuous() -> Fig:
    f = Fig(W, 274)
    f.title("Continuous uniform: constant density across (a, b)")

    aa, bb = 2.0, 7.0
    dens = 1 / (bb - aa)
    a1 = axes(f, 0.5, 8.5, 0, 0.30, left=52, right=310, top=64, bottom=96)
    a1.area(lambda t: dens if aa <= t <= bb else 0.0, aa, bb, colour=BLUE, opacity="0.2")
    a1.polyline([(0.5, 0), (aa, 0), (aa, dens), (bb, dens), (bb, 0), (8.5, 0)],
                colour=BLUE)
    a1.frame(xlabel="x", ylabel="f(x)", xticks=[aa, bb],
             xfmt=lambda t: "a" if t == aa else "b", yticks=[dens],
             yfmt=lambda t: "1/(b−a)")
    a1.label((aa + bb) / 2, dens / 2, "area = 1", cls="sm bold")

    a2 = axes(f, 0.5, 8.5, 0, 1.12, left=336, right=40, top=64, bottom=96)
    a2.polyline([(0.5, 0), (aa, 0), (bb, 1), (8.5, 1)], colour=VIOLET)
    a2.frame(xlabel="x", ylabel="F(x)", xticks=[aa, bb],
             xfmt=lambda t: "a" if t == aa else "b", yticks=[0, 1],
             yfmt=lambda t: f"{t:g}")
    a2.label(4.5, 0.62, "F(x) = (x−a)/(b−a)", cls="sm", anchor="middle")

    f.line(28, 216, 532, 216, cls="rule")
    f.text(150, 238, "E[X] = (a+b)/2", cls="sm bold")
    f.text(150, 256, "Var(X) = (b−a)²/12", cls="sm dim")
    f.text(400, 238, "Conditioning on a sub-interval", cls="sm bold")
    f.text(400, 256, "leaves it uniform on that sub-interval", cls="sm dim")
    return f


@figure("Transformations of Random Variables", "A monotone transformation carrying the "
        "density of X into the density of Y", width=540)
def transformations() -> Fig:
    f = Fig(W, 328)
    f.title("A transformation carries the density of X into the density of Y")

    # y = g(x) = x² on x > 0, with the density of X below and of Y at the left.
    gx0, gx1, gy0, gy1 = 214, 424, 70, 210
    a = Axes(f, gx0, gy0, gx1, gy1, 0, 2.6, 0, 6.8)
    a.frame(arrows=True)
    a.curve(lambda t: t * t, colour=VIOLET, xa=0, xb=2.6)
    f.text(gx1 + 14, gy0 + 6, "y = g(x)", cls="sm bold", anchor="start", fill=VIOLET)

    xv = 1.5
    a.vline(xv, y_top=xv * xv, colour="var(--dim)")
    f.line(gx0, a.py(xv * xv), a.px(xv), a.py(xv * xv), cls="thin dash",
           stroke="var(--dim)", stroke_width="1.2")
    a.point(xv, xv * xv, colour=VIOLET, r=3.4)

    # density of X, under the x-axis
    dx = Axes(f, gx0, gy1 + 12, gx1, gy1 + 58, 0, 2.6, 0, 0.95)
    dx.area(lambda t: _npdf(t, 1.4, 0.45), 0, 2.6, colour=BLUE, opacity="0.2")
    dx.curve(lambda t: _npdf(t, 1.4, 0.45), colour=BLUE, n=90)
    f.line(gx0, gy1 + 58, gx1, gy1 + 58, cls="axis")
    f.text(gx1 + 14, gy1 + 48, "f_X(x)", cls="sm bold", fill=BLUE, anchor="start")

    # density of Y, rotated onto the y-axis (drawn to the left of the plot)
    ypts = []
    for i in range(81):
        yv = 0.06 + (6.8 - 0.06) * i / 80
        xx = math.sqrt(yv)
        dens = _npdf(xx, 1.4, 0.45) / (2 * xx)
        ypts.append((dens, yv))
    scale = 118 / max(d for d, _ in ypts)
    poly = [(gx0 - d * scale, a.py(yv)) for d, yv in ypts]
    f.polygon([(gx0, a.py(0.06))] + poly + [(gx0, a.py(6.8))], fill=GREEN,
              fill_opacity="0.18", stroke="none")
    f.poly(poly, cls="curve", stroke=GREEN, stroke_width="2")
    f.text(gx0 - 66, gy0 - 8, "f_Y(y)", cls="sm bold", fill=GREEN)

    f.line(28, 272, 532, 272, cls="rule")
    f.text(34, 292, "CDF method (always works):  F_Y(y) = P(g(X) ≤ y), then differentiate",
           cls="sm", anchor="start")
    f.text(34, 310, "Monotone shortcut:  f_Y(y) = f_X(g⁻¹(y)) · |d g⁻¹/dy|  — the Jacobian "
           "gets forgotten", cls="sm dim", anchor="start")
    return f


@figure("Calculus", "The derivative as a tangent slope and the integral as an area",
        width=540)
def calculus() -> Fig:
    f = Fig(W, 282)
    f.title("The two operations Exam P leans on")

    fn = lambda t: 0.28 * t * t - 0.2 * t + 1.1
    a1 = axes(f, 0, 3.4, 0, 3.6, left=54, right=300, top=70, bottom=92)
    a1.curve(fn, colour=BLUE)
    a1.frame(xlabel="x", arrows=True)
    x0 = 2.2
    slope = 0.56 * x0 - 0.2
    a1.polyline([(x0 - 1.1, fn(x0) - 1.1 * slope), (x0 + 1.0, fn(x0) + 1.0 * slope)],
                colour=AMBER, width=1.6)
    a1.point(x0, fn(x0), colour=AMBER)
    f.text((a1.x0 + a1.x1) / 2, a1.y1 + 26, "Differentiation", cls="sm bold")
    f.text((a1.x0 + a1.x1) / 2, a1.y1 + 42, "f′(x) — the slope of the tangent",
           cls="sm dim")

    a2 = axes(f, 0, 3.4, 0, 3.6, left=316, right=34, top=70, bottom=92)
    a2.area(fn, 0.8, 2.6, colour=GREEN, opacity="0.22")
    a2.curve(fn, colour=BLUE)
    a2.frame(xlabel="x", xticks=[0.8, 2.6], xfmt=lambda t: "a" if t < 2 else "b",
             arrows=True)
    a2.label(1.7, 0.7, "∫ₐᵇ f", cls="sm bold")
    f.text((a2.x0 + a2.x1) / 2, a2.y1 + 26, "Integration", cls="sm bold")
    f.text((a2.x0 + a2.x1) / 2, a2.y1 + 42, "the signed area under the curve",
           cls="sm dim")

    f.line(28, 232, 532, 232, cls="rule")
    items = [
        ("Chain rule", "[f(g(x))]′ = f′(g(x)) g′(x)"),
        ("By parts", "∫ u dv = uv − ∫ v du"),
        ("Geometric series", "Σ arᵏ = a/(1−r)"),
    ]
    for i, (lab, formula) in enumerate(items):
        x = 40 + i * 172
        f.text(x, 252, lab, cls="sm bold", anchor="start")
        f.text(x, 270, formula, cls="sm dim", anchor="start")
    return f


@figure("Discrete Mathematics", "The power set of a three-element set", width=520)
def discrete_mathematics() -> Fig:
    f = Fig(W, 264)
    f.title("Counting distinct structures: the power set of {a, b, c}")

    levels = [["∅"], ["{a}", "{b}", "{c}"], ["{a,b}", "{a,c}", "{b,c}"], ["{a,b,c}"]]
    colours = ["var(--dim)", BLUE, VIOLET, GREEN]
    y0 = 74
    positions = []
    for li, row in enumerate(levels):
        y = y0 + li * 42
        xs = []
        for i, lab in enumerate(row):
            x = 178 + (i - (len(row) - 1) / 2) * 104
            f.rect(x - 30, y - 13, 60, 26, rx=6, fill=colours[li], fill_opacity="0.13",
                   stroke=colours[li], stroke_width="1.2")
            f.text(x, y + 4, lab, cls="sm")
            xs.append(x)
        positions.append((y, xs))
    for li in range(3):
        y_a, xs_a = positions[li]
        y_b, xs_b = positions[li + 1]
        for xa in xs_a:
            for xb in xs_b:
                f.line(xa, y_a + 13, xb, y_b - 13, cls="thin", stroke="var(--edge)",
                       stroke_width="1")
    f.text(178, 238, "8 subsets in all", cls="sm dim")

    f.text(444, 88, "|𝒫(S)| = 2^|S|", cls="sm bold")
    f.text(444, 108, "2³ = 8", cls="sm dim")
    f.box(360, 128, 168, 84, colour=AMBER)
    f.text(444, 150, "Every subset is an event", cls="sm bold")
    f.text(444, 168, "each element is either in", cls="sm dim")
    f.text(444, 184, "or out — two choices, |S| times", cls="sm dim")
    f.text(444, 202, "2 × 2 × 2 = 8", cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# 3. Insurance applications — the loss becomes the payment
# ═══════════════════════════════════════════════════════════════════════════

def _payment_axes(f, title_ticks=True, left=54, right=250, top=64, bottom=64):
    """A shared payment-vs-loss panel: Y on the vertical, X on the horizontal."""
    a = axes(f, 0, 10, 0, 10, left=left, right=right, top=top, bottom=bottom)
    a.polyline([(0, 0), (10, 10)], colour="var(--dim)", width=1.1, dash=True)
    a.frame(xlabel="loss X", ylabel="payment Y",
            xticks=[] if not title_ticks else None)
    return a


@figure("Deductible", "Insurer payment against loss under an ordinary and a franchise "
        "deductible", width=540)
def deductible() -> Fig:
    f = Fig(W, 292)
    f.title("A deductible removes the first d of every loss")

    d = 3.0
    a = axes(f, 0, 10, 0, 10, left=54, right=232, top=64, bottom=76)
    a.polyline([(0, 0), (10, 10)], colour="var(--dim)", width=1.1, dash=True)
    a.label(8.6, 9.4, "Y = X", cls="sm dim")
    a.polyline([(0, 0), (d, 0)], colour=BLUE, width=2.4)
    a.polyline([(d, 0), (10, 7)], colour=BLUE, width=2.4)
    a.polyline([(0, 0), (d, 0)], colour=AMBER, width=2.4)
    a.polyline([(d, d), (10, 10)], colour=AMBER, width=2.4)
    a.point(d, d, colour=AMBER, r=3)
    f.circle(a.px(d), a.py(0), 3.2, fill="var(--surf)", stroke=AMBER, stroke_width="1.4")
    a.frame(xlabel="loss X", ylabel="payment Y", xticks=[d], xfmt=lambda t: "d")
    a.vline(d, y_top=d, colour="var(--dim)")
    a.label(1.5, 1.1, "insurer pays 0", cls="sm dim")
    f.legend(a.x0 + 6, a.y0 + 12, [(BLUE, "ordinary: Y = (X − d)₊"),
                                   (AMBER, "franchise: pays all of X once X > d")])

    f.text(420, 96, "Ordinary deductible", cls="sm bold")
    f.text(420, 114, "Y = max(X − d, 0)", cls="sm dim")
    f.box(316, 132, 208, 66, colour=BLUE)
    f.text(420, 152, "A mass sits at Y = 0", cls="sm bold")
    f.text(420, 170, "every loss below d pays nothing,", cls="sm dim")
    f.text(420, 186, "so Y is a mixed random variable", cls="sm dim")
    f.text(420, 222, "E[Y] = ∫_d^∞ (x − d) f(x) dx", cls="sm")
    f.text(420, 240, "Exponential: E[Y] = θ e^(−d/θ)", cls="sm dim")
    f.note(W / 2, 278, "Deductibles cut small claims, curb moral hazard, and lower premium")
    return f


@figure("Benefit Limit", "Insurer payment capped at the benefit limit u", width=540)
def benefit_limit() -> Fig:
    f = Fig(W, 288)
    f.title("A benefit limit caps what the insurer will pay")

    u = 6.0
    a = axes(f, 0, 10, 0, 10, left=54, right=232, top=64, bottom=76)
    a.polyline([(0, 0), (10, 10)], colour="var(--dim)", width=1.1, dash=True)
    a.label(8.8, 9.4, "Y = X", cls="sm dim")
    a.polyline([(0, 0), (u, u)], colour=BLUE, width=2.4)
    a.polyline([(u, u), (10, u)], colour=BLUE, width=2.4)
    f.polygon([a.p(u, u), a.p(10, 10), a.p(10, u)], fill=ROSE, fill_opacity="0.2",
              stroke="none")
    a.label(8.3, 8.2, "insured keeps", cls="sm")
    a.label(8.3, 7.4, "the excess", cls="sm")
    a.frame(xlabel="loss X", ylabel="payment Y", xticks=[u], xfmt=lambda t: "u",
            yticks=[u], yfmt=lambda t: "u")
    a.hline(u, colour="var(--dim)")
    f.legend(a.x0 + 6, a.y0 + 12, [(BLUE, "Y = min(X, u)")])

    f.text(420, 96, "The limit is the deductible's mirror", cls="sm bold")
    rows = [
        ("Deductible d", "removes the small losses", AMBER),
        ("Limit u", "removes the large ones", BLUE),
        ("Both together", "Y = min(α(X − d)₊, u)", GREEN),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        y = 116 + i * 46
        f.line(316, y, 316, y + 32, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(326, y + 12, lab, cls="sm bold", anchor="start")
        f.text(326, y + 28, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 274, "Above d + u/α the insurer pays exactly u, whatever the loss")
    return f


@figure("Coinsurance Percentage", "Coinsurance flattening the payment line by the factor "
        "alpha", width=540)
def coinsurance() -> Fig:
    f = Fig(W, 282)
    f.title("Coinsurance shares each covered dollar")

    d, alpha = 2.0, 0.8
    a = axes(f, 0, 10, 0, 10, left=54, right=232, top=64, bottom=76)
    a.polyline([(0, 0), (10, 10)], colour="var(--dim)", width=1.1, dash=True)
    a.label(8.8, 9.4, "Y = X", cls="sm dim")
    a.polyline([(0, 0), (d, 0), (10, alpha * (10 - d))], colour=BLUE, width=2.4)
    a.polyline([(0, 0), (d, 0), (10, 10 - d)], colour="var(--dim)", width=1.4, dash=True)
    f.polygon([a.p(d, 0), a.p(10, 10 - d), a.p(10, alpha * (10 - d))], fill=AMBER,
              fill_opacity="0.22", stroke="none")
    a.label(8.0, 7.6, "insured's", cls="sm")
    a.label(8.0, 6.8, "1 − α share", cls="sm")
    a.frame(xlabel="loss X", ylabel="payment Y", xticks=[d], xfmt=lambda t: "d")
    f.legend(a.x0 + 6, a.y0 + 12, [(BLUE, "Y = α (X − d)₊,  α = 0.8"),
                                   ("var(--dim)", "α = 1: insurer pays it all")])

    f.text(420, 100, "α ∈ (0, 1] is the insurer's share", cls="sm bold")
    rows = [
        ("E[Y] scales by α", "expectation is linear", BLUE),
        ("Var(Y) scales by α²", "coefficients enter squared", VIOLET),
        ("Order matters", "deductible first, then α, then the limit", AMBER),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        y = 122 + i * 46
        f.line(316, y, 316, y + 32, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(326, y + 12, lab, cls="sm bold", anchor="start")
        f.text(326, y + 28, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 268, "The insured keeps the fraction 1 − α of every covered dollar")
    return f


@figure("Policy Information", "Deductible, coinsurance and limit applied in order to a "
        "ground-up loss", width=540)
def policy_information() -> Fig:
    f = Fig(W, 300)
    f.title("Policy provisions, applied in order")

    d, alpha, u = 2.0, 0.8, 4.0
    cap_x = d + u / alpha

    def pay(x):
        return min(alpha * max(x - d, 0.0), u)

    a = axes(f, 0, 10, 0, 10, left=54, right=232, top=64, bottom=90)
    a.polyline([(0, 0), (10, 10)], colour="var(--dim)", width=1.1, dash=True)
    a.label(8.8, 9.4, "Y = X", cls="sm dim")
    a.polyline([(0, 0), (d, 0), (cap_x, u), (10, u)], colour=BLUE, width=2.4)
    a.frame(xlabel="loss X", ylabel="payment Y", xticks=[d, cap_x],
            xfmt=lambda t: "d" if t < 3 else "d + u/α", yticks=[u], yfmt=lambda t: "u")
    a.hline(u, colour="var(--dim)")
    a.vline(d, y_top=u, colour="var(--dim)")
    a.label(1.0, 0.9, "nothing", cls="sm dim")
    a.label(4.5, 1.4, "slope α", cls="sm", anchor="middle")
    a.label(7.4, u - 1.0, "capped at u", cls="sm dim")
    del pay

    f.text(420, 92, "Y = min( α (X − d)₊ , u )", cls="sm bold")
    steps = [
        ("1. Deductible d", "subtract d, floor at 0", AMBER),
        ("2. Coinsurance α", "multiply the excess by α", VIOLET),
        ("3. Benefit limit u", "cap the result at u", BLUE),
    ]
    for i, (lab, sub, colour) in enumerate(steps):
        y = 112 + i * 48
        f.box(316, y, 210, 40, colour=colour)
        f.text(326, y + 17, lab, cls="sm bold", anchor="start")
        f.text(326, y + 32, sub, cls="sm dim", anchor="start")
    f.line(28, 264, 532, 264, cls="rule")
    f.note(W / 2, 284, "Provisions decide how the loss is split between insured and insurer")
    return f


@figure("Loss Random Variable", "The ground-up loss distribution and the part of it the "
        "insurer sees", width=540)
def loss_random_variable() -> Fig:
    f = Fig(W, 284)
    f.title("X is the ground-up loss — before any policy terms")

    d = 1.6
    dens = lambda t: _lognorm(t, 0.6, 0.62)
    a = axes(f, 0, 8, 0, 0.42, left=54, right=232, top=64, bottom=84)
    a.area(dens, 0.02, d, colour="var(--dim)", opacity="0.18")
    a.area(dens, d, 8, colour=BLUE, opacity="0.2")
    a.curve(dens, colour=BLUE, xa=0.02)
    a.frame(xlabel="x", ylabel="f_X(x)", xticks=[d], xfmt=lambda t: "d")
    a.vline(d, y_top=dens(d), colour=AMBER)
    a.label(0.78, 0.155, "X ≤ d", cls="sm dim")
    a.label(0.78, 0.105, "no pay", cls="sm dim")
    a.label(4.4, 0.13, "X > d  →  insurer pays X − d", cls="sm")

    f.text(420, 96, "Loss X  vs  payment Y", cls="sm bold")
    rows = [
        ("X is ground-up", "the full economic loss", BLUE),
        ("Y = (X − d)₊", "truncated below, censored above", AMBER),
        ("E[Y] ≠ E[X] − d", "the zero payments drag the mean down", ROSE),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        y = 118 + i * 48
        f.line(316, y, 316, y + 34, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(326, y + 13, lab, cls="sm bold", anchor="start")
        f.text(326, y + 29, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 270, "Choose the severity model for X first, then transform it")
    return f


@figure("Payment Random Variable", "The mixed distribution of the insurer's payment",
        width=540)
def payment_random_variable() -> Fig:
    f = Fig(W, 290)
    f.title("Y is mixed: a mass at zero, a body, and a mass at the limit")

    a = axes(f, -0.9, 8, 0, 0.42, left=58, right=232, top=66, bottom=88)
    dens = lambda t: _lognorm(t + 1.6, 0.6, 0.62) * 0.8
    a.area(lambda t: dens(t) if 0.05 <= t <= 5 else 0.0, 0.05, 5, colour=BLUE,
           opacity="0.2")
    a.curve(lambda t: dens(t), colour=BLUE, xa=0.05, xb=5)
    a.frame(xlabel="y", ylabel="density / mass", xticks=[0, 5],
            xfmt=lambda t: "0" if t == 0 else "u")
    # the two point masses
    f.line(a.px(0), a.y1, a.px(0), a.py(0.34), cls="", stroke=AMBER, stroke_width="3",
           stroke_linecap="round")
    f.circle(a.px(0), a.py(0.34), 4, fill=AMBER)
    f.text(a.px(0), a.py(0.34) - 10, "P(X ≤ d)", cls="sm bold", fill=AMBER)
    f.line(a.px(5), a.y1, a.px(5), a.py(0.16), cls="", stroke=ROSE, stroke_width="3",
           stroke_linecap="round")
    f.circle(a.px(5), a.py(0.16), 4, fill=ROSE)
    f.text(a.px(5) + 4, a.py(0.16) - 10, "P(X ≥ d + u/α)", cls="sm bold", fill=ROSE,
           anchor="middle")

    f.text(420, 96, "Y = α min( (X − d)₊ , u )", cls="sm bold")
    rows = [
        ("Mass at Y = 0", "every loss the deductible absorbs", AMBER),
        ("Continuous middle", "partial losses, scaled by α", BLUE),
        ("Mass at Y = u", "everything the limit truncates", ROSE),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        y = 118 + i * 48
        f.line(316, y, 316, y + 34, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(326, y + 13, lab, cls="sm bold", anchor="start")
        f.text(326, y + 29, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 276, "E[Y] and Var(Y) must be computed from Y — never rescaled from X")
    return f


@figure("Inflation", "Inflation shifting the loss distribution and leveraging the "
        "deductible", width=540)
def inflation() -> Fig:
    f = Fig(W, 292)
    f.title("Inflation is leveraged: a fixed deductible shrinks in real terms")

    d, r = 2.0, 0.25
    base = lambda t: _lognorm(t, 0.75, 0.55)
    infl = lambda t: base(t / (1 + r)) / (1 + r)
    a = axes(f, 0, 9, 0, 0.42, left=54, right=232, top=66, bottom=84)
    a.curve(base, colour="var(--dim)", xa=0.02)
    a.area(infl, d, 9, colour=BLUE, opacity="0.16")
    a.curve(infl, colour=BLUE, xa=0.02)
    a.frame(xlabel="loss", ylabel="density", xticks=[d], xfmt=lambda t: "d")
    a.vline(d, colour=AMBER, y_top=0.40)
    f.legend(a.x0 + 8, a.y0 + 10, [("var(--dim)", "X — this year"),
                                   (BLUE, "X′ = (1 + r) X")])
    a.label(5.6, 0.13, "more mass now clears d", cls="sm dim")

    f.text(420, 100, "X′ = (1 + r) X", cls="sm bold")
    rows = [
        ("Severity rises", "every loss is (1 + r) times bigger", BLUE),
        ("Frequency over d rises", "more losses breach a fixed d", AMBER),
        ("Payments rise faster than r", "the leveraged effect of inflation", ROSE),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        y = 120 + i * 48
        f.line(316, y, 316, y + 34, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(326, y + 13, lab, cls="sm bold", anchor="start")
        f.text(326, y + 29, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 278, "Deductibles and limits are fixed in dollars — inflation erodes both")
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


def _joint_table(f, x0, y0, cell=52, row_h=30, highlight=None, show_margins=True,
                 title=None):
    """Draw the shared 3×3 joint PMF, optionally with margins and a highlight."""
    if title:
        f.text(x0 + 1.5 * cell, y0 - 26, title, cls="sm bold")
    for j in range(3):
        f.text(x0 + (j + 0.5) * cell, y0 - 6, f"y = {j}", cls="sm dim")
    for i in range(3):
        f.text(x0 - 10, y0 + (i + 0.5) * row_h + 4, f"x = {i}", cls="sm dim", anchor="end")
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
        f.text(x0 + 3 * cell + cell / 2, y0 - 6, "pₓ(x)", cls="sm dim", fill=AMBER)
        for i in range(3):
            cx, cy = x0 + 3 * cell, y0 + i * row_h
            f.rect(cx + 6, cy, cell, row_h, rx=3, fill=AMBER, fill_opacity="0.16",
                   stroke=AMBER, stroke_width="1")
            f.text(cx + 6 + cell / 2, cy + row_h / 2 + 4, f"{sum(JOINT[i]):.2f}",
                   cls="sm bold")
        f.text(x0 - 10, y0 + 3 * row_h + 21, "p_Y(y)", cls="sm dim", anchor="end",
               fill=GREEN)
        for j in range(3):
            cx, cy = x0 + j * cell, y0 + 3 * row_h + 6
            f.rect(cx, cy, cell, row_h, rx=3, fill=GREEN, fill_opacity="0.16",
                   stroke=GREEN, stroke_width="1")
            f.text(cx + cell / 2, cy + row_h / 2 + 4,
                   f"{sum(JOINT[i][j] for i in range(3)):.2f}", cls="sm bold")


@figure("Multivariate Distribution", "A joint distribution with its marginals shown on "
        "the axes", width=540)
def multivariate_distribution() -> Fig:
    f = Fig(W, 306)
    f.title("A joint distribution, and the four things it is asked for")

    # The joint density sits in a box; each marginal is drawn just outside the
    # axis it survives on, so "integrate the other one out" is visible.
    bx0, by0, side = 146, 84, 150
    bx1, by1 = bx0 + side, by0 + side
    ccx, ccy = bx0 + side / 2, by0 + side / 2
    f.rect(bx0, by0, side, side, rx=4, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1")
    for k, op in ((1, "0.30"), (1.7, "0.17"), (2.4, "0.08")):
        f.raw(f'<ellipse cx="{ccx}" cy="{ccy}" rx="{30 * k:.0f}" ry="{17 * k:.0f}" '
              f'transform="rotate(-28 {ccx} {ccy})" fill="{BLUE}" fill-opacity="{op}" '
              f'stroke="{BLUE}" stroke-width="1"/>')
    f.arrow(bx0, by1, bx1 + 14, by1, colour="var(--axis)", width=1.1)
    f.arrow(bx0, by1, bx0, by0 - 12, colour="var(--axis)", width=1.1)
    f.text(bx1 + 20, by1 + 4, "x", cls="sm dim", anchor="start")
    f.text(bx0 - 6, by0 - 16, "y", cls="sm dim", anchor="end")

    fx = [(bx0 + side * i / 60, by1 + 46 - 92 * _npdf(-3 + 6 * i / 60))
          for i in range(61)]
    f.poly(fx, cls="curve", stroke=AMBER, stroke_width="1.8")
    f.text(bx1 + 6, by1 + 40, "f_X", cls="sm bold", fill=AMBER, anchor="start")
    fy = [(bx0 - 40 + 80 * _npdf(-3 + 6 * i / 60), by1 - side * i / 60)
          for i in range(61)]
    f.poly(fy, cls="curve", stroke=GREEN, stroke_width="1.8")
    f.text(bx0 - 34, by0 - 6, "f_Y", cls="sm bold", fill=GREEN, anchor="middle")
    f.text(ccx, 288, "joint density of (X, Y), with both marginals", cls="sm dim")

    rows = [
        ("Marginals", "sum / integrate the other variable out", AMBER),
        ("Conditionals", "fix one variable, renormalise", VIOLET),
        ("Covariance", "the tilt of the cloud", ROSE),
        ("Independence", "the joint factors into the marginals", GREEN),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        y = 82 + i * 50
        f.line(324, y, 324, y + 34, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(334, y + 13, lab, cls="sm bold", anchor="start")
        f.text(334, y + 29, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 300, "Everything on the multivariate syllabus is read off the joint law")
    return f


@figure("Joint Probability Function", "A joint probability mass function laid out as a "
        "table", width=540)
def joint_probability_function() -> Fig:
    f = Fig(W, 288)
    f.title("The joint PMF: one probability for every (x, y) pair")

    _joint_table(f, 66, 92, show_margins=False)
    f.text(144, 234, "p(x, y) = P(X = x, Y = y)", cls="sm bold")

    f.text(400, 96, "Two requirements", cls="sm bold")
    rows = [
        ("p(x, y) ≥ 0", "no negative entries", BLUE),
        ("Σ Σ p(x, y) = 1", "the whole table sums to 1", GREEN),
        ("Unknown constant c", "solve by forcing the sum to 1", AMBER),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        y = 116 + i * 46
        f.line(304, y, 304, y + 32, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(314, y + 12, lab, cls="sm bold", anchor="start")
        f.text(314, y + 28, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 272, "Marginals are row and column sums; conditionals are single rows")
    return f


@figure("Marginal Probability Function", "Marginals as the row and column sums of a joint "
        "table", width=540)
def marginal_probability_function() -> Fig:
    f = Fig(W, 300)
    f.title("A marginal is a row sum or a column sum")

    _joint_table(f, 74, 92)
    f.arrow(74 + 3 * 52 - 6, 92 + 15, 74 + 3 * 52 + 2, 92 + 15, colour=AMBER, width=1.4)
    f.arrow(74 + 26, 92 + 3 * 30 - 4, 74 + 26, 92 + 3 * 30 + 2, colour=GREEN, width=1.4)

    f.text(430, 96, "Sum the other variable out", cls="sm bold")
    f.text(430, 118, "pₓ(x) = Σ_y p(x, y)", cls="sm", fill=AMBER)
    f.text(430, 138, "p_Y(y) = Σ_x p(x, y)", cls="sm", fill=GREEN)
    f.box(342, 156, 176, 62, colour=VIOLET)
    f.text(430, 176, "Continuous case", cls="sm bold")
    f.text(430, 194, "f_X(x) = ∫ f(x, y) dy", cls="sm dim")
    f.text(430, 210, "limits depend on the support", cls="sm dim")
    f.line(28, 240, 532, 240, cls="rule")
    f.text(W / 2, 260, "If y survives in your f_X(x), the inner limits were wrong",
           cls="sm dim")
    f.text(W / 2, 280, "Both margins sum to 1 — a fast arithmetic check", cls="sm dim")
    return f


@figure("Conditional Probability Function", "One row of a joint table renormalised into a "
        "conditional distribution", width=540)
def conditional_probability_function() -> Fig:
    f = Fig(W, 292)
    f.title("Fix one variable, then renormalise that slice")

    _joint_table(f, 60, 96, highlight=lambda i, j: i == 1, show_margins=False)
    f.text(60 + 78, 232, "the row X = 1 sums to 0.40", cls="sm dim")

    f.arrow(248, 141, 288, 141, colour=VIOLET, width=1.6)
    f.text(268, 128, "÷ 0.40", cls="sm", fill=VIOLET)

    x0 = 306
    f.text(x0 + 78, 92, "P(Y = y | X = 1)", cls="sm bold", fill=VIOLET)
    row = JOINT[1]
    total = sum(row)
    for j, v in enumerate(row):
        cx = x0 + j * 52
        f.text(cx + 26, 116, f"y = {j}", cls="sm dim")
        f.rect(cx, 126, 52, 30, rx=3, fill=VIOLET, fill_opacity="0.18", stroke=VIOLET,
               stroke_width="1.1")
        f.text(cx + 26, 146, f"{v / total:.2f}", cls="sm bold")
    f.text(x0 + 78, 178, "0.15 + 0.50 + 0.35 = 1.00", cls="sm dim")
    f.box(x0 - 6, 194, 216, 60, colour=BLUE)
    f.text(x0 + 102, 214, "f_{X|Y}(x | y) = f(x, y) / f_Y(y)", cls="sm")
    f.text(x0 + 102, 234, "defined wherever f_Y(y) > 0", cls="sm dim")
    f.note(W / 2, 280, "A conditional distribution is a distribution — it must sum to 1")
    return f


@figure("Joint Cumulative Distribution Function", "The joint CDF as the probability mass "
        "in the lower-left quadrant", width=540)
def joint_cdf() -> Fig:
    f = Fig(W, 292)
    f.title("The joint CDF accumulates over a lower-left quadrant")

    px0, py0, side = 76, 76, 168
    f.rect(px0, py0, side, side, rx=4, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1")
    xq, yq = px0 + side * 0.62, py0 + side * 0.42
    f.rect(px0, yq, xq - px0, py0 + side - yq, fill=BLUE, fill_opacity="0.22")
    f.line(xq, py0, xq, py0 + side, cls="thin dash", stroke=BLUE, stroke_width="1.3")
    f.line(px0, yq, px0 + side, yq, cls="thin dash", stroke=BLUE, stroke_width="1.3")
    f.arrow(px0, py0 + side, px0 + side + 16, py0 + side, colour="var(--axis)", width=1.1)
    f.arrow(px0, py0 + side, px0, py0 - 12, colour="var(--axis)", width=1.1)
    f.text(xq, py0 + side + 18, "x", cls="sm dim")
    f.text(px0 - 10, yq + 4, "y", cls="sm dim", anchor="end")
    f.text(px0 + (xq - px0) / 2, yq + (py0 + side - yq) / 2 + 4, "F(x, y)",
           cls="sm bold", fill=BLUE)
    f.text(px0 + side / 2, py0 + side + 40, "P(X ≤ x and Y ≤ y)", cls="sm dim")

    rows = [
        ("F(x, y) = P(X ≤ x, Y ≤ y)", "non-decreasing in each argument", BLUE),
        ("F(−∞, y) = F(x, −∞) = 0", "and F(∞, ∞) = 1", "var(--dim)"),
        ("f(x, y) = ∂²F / ∂x∂y", "differentiate twice to get back", VIOLET),
        ("F(x, y) = F_X(x) F_Y(y)", "exactly when X and Y are independent", GREEN),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        y = 86 + i * 50
        f.line(310, y, 310, y + 34, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(320, y + 13, lab, cls="sm bold", anchor="start")
        f.text(320, y + 29, sub, cls="sm dim", anchor="start")
    return f


@figure("Joint Probability Density Function", "Setting up the limits of a double integral "
        "over a triangular support", width=540)
def joint_pdf() -> Fig:
    f = Fig(W, 316)
    f.title("The integrand is easy — the region is the work", "support 0 < x < y < 1")

    px0, py1, side = 84, 236, 176
    py0 = py1 - side
    px1 = px0 + side
    f.polygon([(px0, py1), (px1, py0), (px0, py0)], fill=BLUE, fill_opacity="0.2",
              stroke=BLUE, stroke_width="1.4")
    f.arrow(px0, py1, px1 + 22, py1, colour="var(--axis)", width=1.1)
    f.arrow(px0, py1, px0, py0 - 20, colour="var(--axis)", width=1.1)
    f.line(px0, py1, px1, py0, cls="thin", stroke=BLUE, stroke_width="1.2")
    f.text(px1 + 28, py1 + 4, "x", cls="sm dim", anchor="start")
    f.text(px0 - 8, py0 - 24, "y", cls="sm dim", anchor="end")
    for v, lab in ((0, "0"), (1, "1")):
        f.text(px0 + v * side, py1 + 17, lab, cls="sm dim")
        f.text(px0 - 8, py1 - v * side + 4, lab, cls="sm dim", anchor="end")
    # the slice at a fixed x
    xs = px0 + side * 0.42
    f.line(xs, py1, xs, py0 + side * 0.58, cls="", stroke=AMBER, stroke_width="2.4")
    f.arrow(xs, py1 - 4, xs, py0 + side * 0.58, colour=AMBER, width=1.6)
    f.text(xs + 8, (py1 + py0 + side * 0.58) / 2, "y runs x → 1", cls="sm", fill=AMBER,
           anchor="start")
    f.text(xs, py1 + 32, "fix x", cls="sm dim")
    f.text(px1 - 30, py0 + 16, "y = x", cls="sm", fill=BLUE, anchor="start")

    f.text(400, 88, "Work outside in", cls="sm bold")
    steps = [
        ("1. Sketch the support", "shade where f > 0"),
        ("2. Outer limits", "must be numbers: 0 < x < 1"),
        ("3. Slice", "inner limits may use x: x < y < 1"),
        ("4. Check", "the outer symbol never appears outside"),
    ]
    for i, (lab, sub) in enumerate(steps):
        y = 108 + i * 40
        f.text(300, y, lab, cls="sm bold", anchor="start")
        f.text(300, y + 15, sub, cls="sm dim", anchor="start")
    f.line(28, 274, 532, 274, cls="rule")
    f.text(W / 2, 294, "∫₀¹ ∫ₓ¹ f(x, y) dy dx     — reversing the order means re-reading "
           "the sketch", cls="sm dim")
    f.text(W / 2, 310, "A triangular support forces dependence, however the formula factors",
           cls="sm dim")
    return f


@figure("Moments for Joint Distributions", "E[XY] built cell by cell from a joint table",
        width=540)
def moments_for_joint() -> Fig:
    f = Fig(W, 288)
    f.title("Every joint moment is one weighted sum over the table")

    _joint_table(f, 66, 96, show_margins=False)
    f.text(144, 236, "each cell contributes g(x, y) · p(x, y)", cls="sm dim")

    f.text(400, 92, "E[g(X, Y)] = Σ Σ g(x, y) p(x, y)", cls="sm bold")
    rows = [
        ("E[X] = Σ Σ x p(x, y)", "= 1.34 here", BLUE),
        ("E[Y] = Σ Σ y p(x, y)", "= 1.28 here", GREEN),
        ("E[XY] = Σ Σ xy p(x, y)", "= 1.88 here", VIOLET),
        ("Cov(X, Y) = E[XY] − E[X]E[Y]", "= 0.16 → positive tilt", ROSE),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        y = 112 + i * 42
        f.line(304, y, 304, y + 28, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(314, y + 11, lab, cls="sm bold", anchor="start")
        f.text(314, y + 26, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 276, "Independence would force E[XY] = E[X]E[Y] — it does not hold here")
    return f


@figure("Covariance", "Covariance as the signed contribution of each quadrant around the "
        "means", width=540)
def covariance() -> Fig:
    f = Fig(W, 292)
    f.title("Covariance adds up signed rectangles around the means")

    px0, py0, side = 74, 76, 170
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
    # a positively-tilted cloud
    seed = 7
    for i in range(46):
        seed = (1103515245 * seed + 12345) % 2147483648
        u1 = seed / 2147483648
        seed = (1103515245 * seed + 12345) % 2147483648
        u2 = seed / 2147483648
        z1 = math.sqrt(-2 * math.log(u1 + 1e-9)) * math.cos(2 * math.pi * u2)
        z2 = math.sqrt(-2 * math.log(u1 + 1e-9)) * math.sin(2 * math.pi * u2)
        zx, zy = z1, 0.72 * z1 + 0.7 * z2
        x = mx + zx * side / 6.4
        y = my - zy * side / 6.4
        if px0 + 3 < x < px0 + side - 3 and py0 + 3 < y < py0 + side - 3:
            f.circle(x, y, 2.6, fill=BLUE, fill_opacity="0.75")
    f.text(mx, py0 + side + 18, "μₓ", cls="sm dim")
    f.text(px0 - 8, my + 4, "μ_Y", cls="sm dim", anchor="end")
    f.text(px0 + side / 2, py0 + side + 40, "Cov > 0: the + quadrants dominate",
           cls="sm dim")

    f.text(404, 92, "Cov(X, Y) = E[(X − μₓ)(Y − μ_Y)]", cls="sm bold")
    f.text(404, 112, "= E[XY] − E[X] E[Y]", cls="sm dim")
    rows = [
        ("Sign, not strength", "the units make the size unreadable", AMBER),
        ("Independent ⇒ Cov = 0", "the converse is not true", GREEN),
        ("Cov(X, X) = Var(X)", "variance is self-covariance", VIOLET),
        ("Standardise it", "ρ = Cov / (σₓ σ_Y) lands in [−1, 1]", BLUE),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        y = 130 + i * 42
        f.line(296, y, 296, y + 28, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(306, y + 11, lab, cls="sm bold", anchor="start")
        f.text(306, y + 26, sub, cls="sm dim", anchor="start")
    return f


@figure("Independent Random Variables", "Independent variables give a rectangular, "
        "untilted joint density", width=540)
def independent_random_variables() -> Fig:
    f = Fig(W, 322)
    f.title("Independence: the joint density factors and the support is a rectangle")

    for k, (label, rot, sub) in enumerate((
        ("Independent", 0, "f(x, y) = f_X(x) f_Y(y)"),
        ("Dependent", -30, "cannot be factored"),
    )):
        cx = 152 + k * 250
        px0, py0, side = cx - 76, 82, 152
        f.rect(px0, py0, side, side, rx=4, fill="var(--soft)", stroke="var(--edge)",
               stroke_width="1")
        colour = GREEN if k == 0 else ROSE
        for j, op in ((1.0, "0.28"), (1.7, "0.17"), (2.4, "0.08")):
            f.raw(f'<ellipse cx="{cx}" cy="{py0 + side / 2}" rx="{26 * j:.0f}" '
                  f'ry="{18 * j:.0f}" transform="rotate({rot} {cx} {py0 + side / 2})" '
                  f'fill="{colour}" fill-opacity="{op}" stroke="{colour}" '
                  f'stroke-width="1"/>')
        f.arrow(px0, py0 + side, px0 + side + 12, py0 + side, colour="var(--axis)",
                width=1.1)
        f.arrow(px0, py0 + side, px0, py0 - 10, colour="var(--axis)", width=1.1)
        f.text(cx, py0 + side + 24, label, cls="sm bold", fill=colour)
        f.text(cx, py0 + side + 40, sub, cls="sm dim")
        f.text(cx, py0 + side + 56, "Cov = 0" if k == 0 else "Cov ≠ 0 here", cls="sm dim")

    f.line(28, 266, 532, 266, cls="rule")
    items = [
        ("F(x,y) = F_X F_Y", "equivalently f = f_X f_Y"),
        ("E[XY] = E[X] E[Y]", "so Cov(X, Y) = 0"),
        ("Var(X+Y) = VarX + VarY", "no covariance survives"),
    ]
    for i, (lab, sub) in enumerate(items):
        x = 38 + i * 172
        f.text(x, 288, lab, cls="sm bold", anchor="start")
        f.text(x, 306, sub, cls="sm dim", anchor="start")
    return f


@figure("Order Statistics", "A sample sorted into order statistics, with the densities of "
        "the minimum and maximum", width=540)
def order_statistics() -> Fig:
    f = Fig(W, 300)
    f.title("Order statistics are the sorted sample")

    sample = [0.62, 0.18, 0.87, 0.41, 0.29]
    lx0, lx1 = 74, 274
    for row, (vals, lab, colour) in enumerate((
            (sample, "X₁ … X₅  as observed", "var(--dim)"),
            (sorted(sample), "X₍₁₎ … X₍₅₎  sorted", BLUE))):
        y = 92 + row * 62
        f.arrow(lx0 - 10, y, lx1 + 14, y, colour="var(--axis)", width=1.1)
        for i, v in enumerate(vals):
            x = lx0 + v * (lx1 - lx0)
            f.circle(x, y, 5, fill=colour if row else "var(--dim)")
            f.text(x, y - 12, f"{'X' if row == 0 else 'X₍'}{i + 1}{'' if row == 0 else '₎'}",
                   cls="sm dim")
        f.text((lx0 + lx1) / 2, y + 24, lab, cls="sm dim")
    f.arrow(174, 128, 174, 146, colour=VIOLET, width=1.5)
    f.text(196, 142, "sort", cls="sm", fill=VIOLET, anchor="start")

    a = axes(f, 0, 1, 0, 5.2, left=74, right=274, top=196, bottom=64)
    a.curve(lambda t: 5 * (1 - t) ** 4, colour=AMBER)
    a.curve(lambda t: 5 * t ** 4, colour=ROSE)
    a.frame(xticks=[0, 1], yticks=[])
    f.text(a.px(0.16), a.py(3.4), "min", cls="sm bold", fill=AMBER)
    f.text(a.px(0.84), a.py(3.4), "max", cls="sm bold", fill=ROSE)
    f.text((a.x0 + a.x1) / 2, a.y1 + 34, "Uniform(0,1), n = 5", cls="sm dim")

    f.text(410, 96, "f_{X₍ₖ₎}(x) =", cls="sm bold")
    f.text(410, 118, "n! / [(k−1)!(n−k)!]", cls="sm dim")
    f.text(410, 136, "× F(x)^{k−1} [1−F(x)]^{n−k} f(x)", cls="sm dim")
    f.box(304, 156, 216, 56, colour=BLUE)
    f.text(412, 176, "Shortcuts worth memorising", cls="sm bold")
    f.text(412, 194, "F_min = 1 − [1−F]ⁿ,  F_max = Fⁿ", cls="sm dim")
    f.box(304, 222, 216, 52, colour=GREEN)
    f.text(412, 242, "Uniform(0,1)", cls="sm bold")
    f.text(412, 260, "E[X₍ₖ₎] = k / (n + 1)", cls="sm dim")
    return f


@figure("Variance for Conditional and Marginal Distributions", "The law of total variance "
        "splitting spread into within-group and between-group parts", width=540)
def conditional_variance() -> Fig:
    f = Fig(W, 306)
    f.title("Total variance = average within-group + variance of the group means")

    a = axes(f, 0, 10, 0, 0.62, left=60, right=268, top=68, bottom=88)
    groups = [(2.4, 0.62, BLUE, "Y = 1"), (5.0, 0.62, VIOLET, "Y = 2"),
              (7.6, 0.62, GREEN, "Y = 3")]
    for mu, sd, colour, lab in groups:
        a.curve(lambda t, m=mu, s=sd: _npdf(t, m, s) / 3, colour=colour, width=1.7)
        a.vline(mu, y_top=0.24, colour=colour)
        a.label(mu, 0.235, lab, cls="sm", dy=-6)
    a.curve(lambda t: sum(_npdf(t, m, s) for m, s, _, _ in groups) / 3, colour=AMBER,
            width=2.2)
    a.frame(xlabel="x", ylabel="density")
    f.legend(a.x0 + 6, a.y0 + 8, [(AMBER, "marginal of X")])
    x1, y1 = a.p(2.4 - 0.62, 0.06)
    x2, _ = a.p(2.4 + 0.62, 0.06)
    f.arrow(x1, y1, x2, y1, colour=BLUE, width=1.2)
    f.arrow(x2, y1, x1, y1, colour=BLUE, width=1.2)
    f.text(a.px(2.4), y1 + 16, "within", cls="sm dim")
    bx1, by1 = a.p(2.4, 0.30)
    bx2, _ = a.p(7.6, 0.30)
    f.arrow(bx1, by1, bx2, by1, colour=ROSE, width=1.2)
    f.arrow(bx2, by1, bx1, by1, colour=ROSE, width=1.2)
    f.text(a.px(5.0), by1 - 8, "between", cls="sm", fill=ROSE)

    f.text(414, 96, "Var(X) =", cls="sm bold")
    f.text(414, 118, "E[ Var(X | Y) ]", cls="sm", fill=BLUE)
    f.text(414, 136, "+ Var( E[X | Y] )", cls="sm", fill=ROSE)
    f.box(306, 156, 218, 58, colour=AMBER)
    f.text(415, 176, "E[X] = E[ E[X | Y] ]", cls="sm bold")
    f.text(415, 194, "the law of total expectation", cls="sm dim")
    f.box(306, 224, 218, 58, colour=VIOLET)
    f.text(415, 244, "E[X | Y = y] is a number", cls="sm bold")
    f.text(415, 262, "E[X | Y] is a random variable", cls="sm dim")
    f.note(W / 2, 298, "Stopping at Var(E[X | Y]) is the classic half-answer")
    return f


@figure("Linear Combinations of Random Variables", "The mean and variance of a weighted "
        "sum, with and without covariance", width=540)
def linear_combinations() -> Fig:
    f = Fig(W, 288)
    f.title("Collapsing several variables into one weighted sum")

    y = 92
    f.text(60, y, "L = c₁X₁ + c₂X₂ + ⋯ + cₙXₙ", cls="sm bold", anchor="start")
    for i, (lab, colour) in enumerate((("X₁", BLUE), ("X₂", VIOLET), ("X₃", GREEN))):
        cx = 96 + i * 76
        f.chip(cx, y + 44, lab, colour=colour, w=54)
    f.arrow(252, y + 44, 292, y + 44, colour="var(--dim)", width=1.5)
    f.chip(340, y + 44, "L", colour=AMBER, w=60)
    f.text(60, y + 88, "Expectation is always linear", cls="sm bold", anchor="start")
    f.text(60, y + 106, "E[L] = Σ cᵢ E[Xᵢ] — no independence needed", cls="sm dim",
           anchor="start")

    f.line(28, 214, 532, 214, cls="rule")
    f.text(40, 234, "Var(L) = Σ cᵢ² Var(Xᵢ) + 2 Σ_{i<j} cᵢcⱼ Cov(Xᵢ, Xⱼ)", cls="sm",
           anchor="start")
    f.text(40, 254, "Independent Xᵢ: every covariance term drops out", cls="sm dim",
           anchor="start")
    f.text(40, 274, "Coefficients enter squared — so Var(X − Y) = Var X + Var Y",
           cls="sm dim", anchor="start")
    f.box(348, 82, 176, 96, colour=GREEN)
    f.text(436, 104, "The sample mean X̄", cls="sm bold")
    f.text(436, 124, "of n i.i.d. variables has", cls="sm dim")
    f.text(436, 142, "mean μ and variance σ²/n", cls="sm dim")
    f.text(436, 162, "→ approximately normal (CLT)", cls="sm dim")
    return f


@figure("Moments for Linear Combinations", "Variance of a sum with and without the "
        "covariance term", width=540)
def moments_for_linear_combinations() -> Fig:
    f = Fig(W, 284)
    f.title("The covariance term is what independence buys you")

    for k, (head, cov, colour) in enumerate((("Independent", 0.0, GREEN),
                                             ("Positively correlated", 0.35, ROSE))):
        x0 = 60 + k * 250
        f.text(x0 + 96, 78, head, cls="sm bold", fill=colour)
        var_x, var_y = 1.0, 0.7
        total = var_x + var_y + 2 * cov
        segs = [(var_x, BLUE, "a₁²Var(X₁)"), (var_y, VIOLET, "a₂²Var(X₂)")]
        if cov:
            segs.append((2 * cov, ROSE, "2a₁a₂Cov"))
        x = x0
        scale = 192 / (1.0 + 0.7 + 2 * 0.35)
        for v, c, lab in segs:
            wpx = v * scale
            f.rect(x, 100, wpx, 34, rx=3, fill=c, fill_opacity="0.55")
            f.text(x + wpx / 2, 122, f"{v:.2f}", cls="sm bold")
            x += wpx
        f.line(x0, 146, x0 + total * scale, 146, cls="", stroke=colour,
               stroke_width="1.6")
        f.text(x0 + total * scale / 2, 164, f"Var(W) = {total:.2f}", cls="sm bold")
        legend_y = 186
        for i, (_, c, lab) in enumerate(segs):
            f.line(x0, legend_y + i * 18, x0 + 12, legend_y + i * 18, cls="", stroke=c,
                   stroke_width="2.4", stroke_linecap="round")
            f.text(x0 + 18, legend_y + i * 18 + 4, lab, cls="sm dim", anchor="start")

    f.line(28, 244, 532, 244, cls="rule")
    f.text(W / 2, 264, "E[W] = Σ aᵢ E[Xᵢ] always;  Var(W) = Σ aᵢ² Var(Xᵢ) only when "
           "independent", cls="sm dim")
    return f


@figure("Probabilities for Linear Combinations", "A sum of independent normals is normal "
        "with added means and added variances", width=540)
def probabilities_for_linear_combinations() -> Fig:
    f = Fig(W, 296)
    f.title("A linear combination of independent normals is exactly normal")

    a = axes(f, -2, 22, 0, 0.30, left=58, right=44, top=70, bottom=110)
    a.curve(lambda t: _npdf(t, 5, 1.4), colour=BLUE)
    a.curve(lambda t: _npdf(t, 8, 2.0), colour=VIOLET)
    a.curve(lambda t: _npdf(t, 13, math.sqrt(1.4 ** 2 + 2.0 ** 2)), colour=AMBER,
            width=2.4)
    a.frame(xlabel="value", ylabel="density", xticks=[5, 8, 13],
            xfmt=lambda t: f"{t:g}")
    f.legend(a.x0 + 8, a.y0 + 10, [
        (BLUE, "X₁ ~ N(5, 1.4²)"),
        (VIOLET, "X₂ ~ N(8, 2.0²)"),
        (AMBER, "X₁ + X₂ ~ N(13, 1.4² + 2.0²)"),
    ])

    f.line(28, 208, 532, 208, cls="rule")
    rows = [
        ("Means add", "13 = 5 + 8", BLUE),
        ("Variances add", "5.96 = 1.96 + 4.00", VIOLET),
        ("Then standardise", "P(L ≤ c) = Φ((c − μ_L)/σ_L)", AMBER),
    ]
    for i, (lab, sub, colour) in enumerate(rows):
        x = 40 + i * 172
        f.line(x, 226, x, 256, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(x + 10, 237, lab, cls="sm bold", anchor="start")
        f.text(x + 10, 252, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 284, "Standard deviations never add — only variances do")
    return f
