"""Figures for the Exam MAS-I (Modern Actuarial Statistics I) concept pages.

Same contract as `figures_exam_p.py` / `figures_exam_fm.py`: each builder returns
a `Fig` from `vcard()` — a portrait card with a title, one picture, and one
formula. Grouped in syllabus order:

A. Probability models — Poisson processes, survival models, life contingencies
B. Statistics — summarizing a sample, estimation, testing, incomplete data
C. Extended linear models — model families, specification, evaluation,
   diagnostics, exploratory data analysis

Running examples, kept consistent across the section so the pages read as one
story: claims arriving at λ = 4 per month; a 3-level territory rating variable;
a frequency GLM with base rate e^(−2.3) = 0.10 claims per exposure-year.
"""

from __future__ import annotations

import math

from figure_kit import (
    AMBER, BLUE, GREEN, ROSE, TEAL, VIOLET,
    Axes, Fig, brace, vaxes, vcard,
    BX0, BY0, BX1, BY1, BCX, BCY,
    building, car, coins, cross, document, house, person, scales, shield, tower,
)
from figure_registry import figure

WID = 340   # the |NNN| every portrait embed asks for


# ── shared helpers ───────────────────────────────────────────────────────────
def _npdf(x, mu=0.0, sd=1.0):
    return math.exp(-((x - mu) ** 2) / (2 * sd * sd)) / (sd * math.sqrt(2 * math.pi))


def _gammapdf(x, shape, scale):
    if x <= 0:
        return 0.0
    return (x ** (shape - 1) * math.exp(-x / scale)
            / (math.gamma(shape) * scale ** shape))


def _poispmf(k, lam):
    return math.exp(-lam) * lam ** k / math.factorial(k)


def _rng(seed: int):
    """A tiny LCG — reproducible across Python builds, unlike `random`."""
    state = seed

    def nxt() -> float:
        nonlocal state
        state = (1103515245 * state + 12345) % 2147483648
        return state / 2147483648

    return nxt


def _normals(seed: int, n: int) -> list[tuple[float, float]]:
    u = _rng(seed)
    out = []
    for _ in range(n):
        r = math.sqrt(-2 * math.log(u() + 1e-9))
        t = 2 * math.pi * u()
        out.append((r * math.cos(t), r * math.sin(t)))
    return out


def _panel(f: Fig, px, py, pw, ph, name, colour, cls="sm bold"):
    """A small titled sub-plot, used by the figures that compare three pictures."""
    f.text(px + pw / 2, py - 6, name, cls=cls, fill=colour)
    f.line(px, py + ph, px + pw, py + ph, cls="axis")
    return Axes(f, px, py, px + pw, py + ph, 0, 1, 0, 1)


def _zcurve(ax: Axes, mu=0.0, sd=1.0, colour=BLUE, width=2):
    return ax.curve(lambda x: _npdf(x, mu, sd), colour=colour, width=width)


# ═══════════════════════════════════════════════════════════════════════════
# A. Probability models
# ═══════════════════════════════════════════════════════════════════════════

@figure("Stochastic Processes", "Three sample paths of one counting process over the "
        "same time axis, one path per outcome", width=WID)
def stochastic_processes() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 7.4, left=40, right=30, top=26, bottom=44)
    ax.frame(xlabel="time t", xticks=[0, 2, 4, 6, 8, 10], yticks=[0, 2, 4, 6])
    paths = [
        ([0.6, 1.5, 3.4, 5.0, 6.1, 8.2], BLUE, "ω₁"),
        ([1.2, 2.0, 2.6, 4.8, 7.4], AMBER, "ω₂"),
        ([0.9, 3.1, 4.2, 4.9, 6.6, 7.8, 9.1], GREEN, "ω₃"),
    ]
    for jumps, colour, name in paths:
        pts = [(0.0, 0.0)]
        n = 0
        for t in jumps:
            pts.append((t, n))
            n += 1
            pts.append((t, n))
        pts.append((10.0, n))
        ax.polyline(pts, colour=colour, width=1.8)
        ax.label(10, n, name, cls="sm bold", anchor="start", dx=6, dy=4)
    return f


@figure("Poisson Process", "A counting path climbing around its mean line λt, with "
        "exponential gaps between the jumps", width=WID)
def poisson_process() -> Fig:
    f = vcard()

    lam = 4
    ax = vaxes(f, 0, 3, 0, 13, left=40, top=26, bottom=40)
    ax.frame(xlabel="months", xticks=[0, 1, 2, 3], yticks=[0, 4, 8, 12])
    jumps = [0.12, 0.31, 0.58, 0.74, 1.02, 1.21, 1.62, 1.75, 1.97, 2.31, 2.52, 2.83]
    ax.polyline([(0, 0), (3, lam * 3)], colour="var(--dim)", width=1.4, dash=True)
    ax.label(1.6, 5.3, "λt", cls="sm bold", anchor="start")
    pts = [(0.0, 0.0)]
    n = 0
    for t in jumps:
        pts.append((t, n))
        n += 1
        pts.append((t, n))
    pts.append((3.0, n))
    ax.polyline(pts, colour=BLUE, width=2)
    for i, t in enumerate(jumps):
        ax.point(t, i + 1, colour=BLUE, r=2.8)
        f.line(ax.px(t), ax.py(0), ax.px(t), ax.py(0.45), cls="", stroke=AMBER,
               stroke_width="1.4")
    brace(f, ax.px(jumps[5]), ax.px(jumps[6]), ax.py(0.8), depth=6, colour=AMBER,
          label="T ~ Exp(λ)", below=False, label_cls="sm")
    return f


@figure("Nonhomogeneous Poisson Process", "A rising intensity with the area under it "
        "to month 4 shaded, and arrivals growing denser as the rate climbs", width=WID)
def nonhomogeneous_poisson_process() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 6, 0, 16, left=42, top=34, bottom=44)
    ax.frame(xlabel="month t", xticks=[0, 2, 4, 6], yticks=[0, 5, 10, 15],
             ylabel="λ(t)")
    rate = lambda t: 3 + 2 * t
    ax.area(rate, 0, 4, colour=BLUE, opacity="0.18")
    ax.curve(rate, colour=BLUE, width=2.2)
    ax.vline(4, colour=BLUE, y_top=rate(4))
    ax.label(2.0, 5.0, "m(4)", cls="bold", dy=4)
    # arrivals: gaps shrink as the rate climbs
    t, u = 0.0, _rng(11)
    while True:
        t += -math.log(1 - u() * 0.999) / rate(t)
        if t >= 6:
            break
        f.line(ax.px(t), ax.py(0), ax.px(t), ax.py(0.9), cls="", stroke=AMBER,
               stroke_width="1.3")
    return f


@figure("Compound Poisson Process", "Aggregate losses as a staircase whose steps come "
        "at random times and have random sizes", width=WID)
def compound_poisson_process() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 12, 0, 13, left=48, top=30, bottom=46)
    ax.frame(xlabel="months", xticks=[0, 4, 8, 12], yticks=[0, 4, 8, 12],
             ylabel="S(t)  (000s)")
    jumps = [(1.1, 1.4), (2.6, 3.1), (4.0, 0.8), (5.8, 2.2), (7.4, 1.1),
             (9.0, 3.4), (10.8, 0.9)]
    pts = [(0.0, 0.0)]
    total = 0.0
    for t, size in jumps:
        pts.append((t, total))
        total += size
        pts.append((t, total))
    pts.append((12.0, total))
    ax.polyline(pts, colour=BLUE, width=2)
    running = 0.0
    for i, (t, size) in enumerate(jumps[:3]):
        f.arrow(ax.px(t) - 13, ax.py(running + size / 2), ax.px(t) - 13,
                ax.py(running), colour=AMBER, width=1.3)
        f.text(ax.px(t) - 17, ax.py(running + size / 2) - 2, f"X{'₁₂₃'[i]}", cls="sm",
               anchor="end", fill=AMBER)
        running += size
    return f


@figure("Mixed Poisson Process", "Three risks' Poisson count distributions at rates 2, "
        "4 and 8, and the wider mixed distribution of the portfolio drawn as bars",
        width=WID)
def mixed_poisson_process() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.7, 14.7, 0, 0.3, left=40, top=24, bottom=44)
    ax.frame(xlabel="claims", xticks=[0, 4, 8, 12], yticks=[0, 0.1, 0.2],
             yfmt=lambda v: f"{v:g}")
    rates = (2, 4, 8)
    ax.bars([(k, sum(_poispmf(k, r) for r in rates) / 3) for k in range(15)],
            colour=BLUE, bw=12, opacity="0.55")
    for r in rates:
        pmf = [(k, _poispmf(k, r)) for k in range(15)]
        ax.polyline(pmf, colour=VIOLET, width=1.5)
        peak = max(pmf, key=lambda kp: kp[1])
        ax.label(peak[0], peak[1], f"Λ = {r}", cls="sm bold", dy=-9)
    ax.label(10.3, 0.05, "mixed", cls="sm bold", fill=BLUE)
    return f


@figure("Interarrival Time", "The exponential waiting-time density, with twelve "
        "observed gaps between arrivals marked along its axis and the mean 1/λ", width=WID)
def interarrival_time() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 1.2, 0, 4.4, left=40, top=26, bottom=44)
    ax.frame(xlabel="gap T (months)", xticks=[0, 0.25, 0.5, 0.75, 1.0],
             xfmt=lambda t: f"{t:g}", yticks=[])
    dens = lambda x: 4 * math.exp(-4 * x)
    ax.area(dens, 0, 1.2, colour=AMBER, opacity="0.16")
    ax.curve(dens, colour=AMBER, width=2.2)
    ax.vline(0.25, colour=AMBER, y_top=dens(0.25))
    ax.label(0.25, 0.7, "1/λ", cls="sm bold", anchor="start", dx=6)
    gaps = [0.02, 0.05, 0.08, 0.11, 0.15, 0.19, 0.23, 0.29, 0.36, 0.47, 0.63, 0.94]
    for g in gaps:
        f.circle(ax.px(g), ax.py(0) - 7, 3.2, fill=BLUE, fill_opacity="0.85")
    return f


@figure("Survival Model", "A survival function falling from one, with its height at "
        "age 60 marked as the probability of surviving past 60", width=WID)
def survival_model() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 100, 0, 1.05, left=44, top=30, bottom=46)
    ax.frame(xlabel="age t", xticks=[0, 25, 50, 75, 100], yticks=[0, 0.5, 1.0],
             ylabel="S(t)")
    surv = lambda t: math.exp(-((t / 82) ** 4.5))
    s60 = surv(60)
    ax.curve(surv, colour=BLUE, width=2.4)
    ax.hline(s60, colour=BLUE, x_to=60)
    f.text(ax.x0 - 8, ax.py(s60) + 3.6, f"{s60:.2f}", cls="sm bold", anchor="end")
    f.line(ax.px(60), ax.py(0), ax.px(60), ax.py(s60), cls="", stroke=BLUE,
           stroke_width="3", stroke_opacity="0.55")
    ax.point(60, s60, colour=BLUE, r=3.8)
    ax.label(60, 0.25, "P(T > 60)", cls="sm bold", anchor="start", dx=7)
    return f


@figure("Hazard Rate", "The bathtub-shaped hazard curve: high in infancy, low and flat "
        "through the useful life, rising again with wear-out", width=WID)
def hazard_rate() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 100, 0, 0.05, left=40, top=30, bottom=46)
    ax.frame(xlabel="age t", xticks=[0, 25, 50, 75, 100], yticks=[], ylabel="h(t)")
    haz = lambda t: 0.03 * math.exp(-t / 6) + 0.004 + 0.00000004 * t ** 3
    ax.area(haz, 0, 100, colour=ROSE, opacity="0.12")
    ax.curve(haz, colour=ROSE, width=2.4)
    ax.label(8, 0.031, "infant", cls="sm bold", anchor="start")
    ax.label(46, 0.016, "useful life", cls="sm bold")
    ax.label(80, 0.041, "wear-out", cls="sm bold", anchor="end")
    return f


@figure("Life Table", "The ℓx column falling from 8,000 at age 60 to 7,170 at 64, with "
        "the deaths dx drawn as the drop between ages", width=WID)
def life_table() -> Fig:
    f = vcard()

    ages = [60, 61, 62, 63, 64]
    ell = [8000, 7840, 7650, 7430, 7170]
    ax = vaxes(f, 59.7, 64.3, 6950, 8250, left=30, top=30, bottom=48)
    ax.frame(xlabel="age x", xticks=ages, xfmt=lambda t: f"{t:.0f}", yticks=[],
             ylabel="ℓx")
    ax.polyline(list(zip(ages, ell)), colour=BLUE, width=2.2)
    for x, v in zip(ages, ell):
        ax.point(x, v, colour=BLUE, r=3.4)
        ax.label(x, v, f"{v:,}", cls="sm", dy=17, dx=-6)
    for i, (top, bot) in enumerate(zip(ell, ell[1:])):
        px = ax.px(ages[i + 1])
        f.arrow(px, ax.py(top), px, ax.py(bot) + 3, colour=ROSE, width=1.5)
        f.line(ax.px(ages[i]), ax.py(top), px, ax.py(top), cls="thin dot",
               stroke=ROSE, stroke_width="1.2")
    f.text(ax.px(61) + 6, (ax.py(8000) + ax.py(7840)) / 2 + 4, "d₆₀", cls="sm bold",
           anchor="start")
    return f


@figure("Joint Life", "Joint-life and last-survivor status curves either side of the "
        "two single lives", width=WID)
def joint_life() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 30, 0, 1.05, left=44, top=34, bottom=48)
    ax.frame(xlabel="years t", xticks=[0, 10, 20, 30], yticks=[0, 0.5, 1.0])
    px = lambda t: math.exp(-((t / 26) ** 2.2))
    py = lambda t: math.exp(-((t / 30) ** 2.2))
    ax.curve(lambda t: px(t) * py(t), colour=ROSE, width=2.4)
    ax.curve(px, colour=BLUE, width=1.6, dash=True)
    ax.curve(py, colour=AMBER, width=1.6, dash=True)
    ax.curve(lambda t: px(t) + py(t) - px(t) * py(t), colour=GREEN, width=2.4)
    ax.label(9.5, 0.30, "joint life (xy)", cls="sm", fill=ROSE)
    ax.label(20.5, 0.92, "last survivor", cls="sm", fill=GREEN, anchor="start")
    ax.label(29, 0.30, "(x)", cls="sm", fill=BLUE)
    ax.label(29, 0.44, "(y)", cls="sm", fill=AMBER)
    return f


@figure("Whole Life Insurance", "Bars for the chance of dying in each policy year, and "
        "a benefit of 1 paid at the end of year 4 discounted back to issue by v⁴",
        width=WID)
def whole_life_insurance() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 6.6, 0, 1.3, left=20, right=20, top=10, bottom=44)
    xs = [ax.px(k) for k in range(7)]
    y = ax.py(0)
    f.arrow(xs[0] - 8, y, ax.x1 + 12, y, colour="var(--axis)", width=1.2)
    for k, x in enumerate(xs):
        f.line(x, y - 4, x, y + 4, cls="tick")
        f.text(x, y + 18, str(k) if k < 6 else "…", cls="sm dim")

    probs = [0.05, 0.07, 0.10, 0.14, 0.19, 0.24]
    for k, p in enumerate(probs):
        ax.bars([(k + 0.5, p * 2)], colour=ROSE, bw=(xs[1] - xs[0]) * 0.72,
                opacity="0.75" if k == 3 else "0.3")
    ax.label(5.5, probs[-1] * 2, "ₖ|qₓ", cls="sm bold", dy=-7)

    f.arrow(xs[4], y - 2, xs[4], ax.py(0.95), colour=ROSE, width=2)
    ax.label(4, 0.95, "1", cls="bold", dy=-7)
    f.arrow(xs[4] - 4, ax.py(1.14), xs[0] + 2, ax.py(1.14), colour=BLUE, width=1.6,
            dash=True)
    ax.label(2, 1.14, "v⁴", cls="bold", dy=-7)
    return f


@figure("Life Annuity", "Payments of 1 promised every year, each one shaded down to "
        "the chance ₖpₓ that the annuitant is still alive to collect it", width=WID)
def life_annuity() -> Fig:
    f = vcard()

    n = 9
    ax = vaxes(f, 0, n - 0.4, 0, 1.12, left=20, right=24, top=18, bottom=44)
    xs = [ax.px(k) for k in range(n)]
    y = ax.py(0)
    f.arrow(xs[0] - 8, y, ax.x1 + 12, y, colour="var(--axis)", width=1.2)
    for k, x in enumerate(xs):
        f.line(x, y - 4, x, y + 4, cls="tick")
        f.text(x, y + 18, str(k), cls="sm dim")
    probs = [1.00, 0.97, 0.93, 0.88, 0.81, 0.72, 0.62, 0.51, 0.40]
    for k, p in enumerate(probs):
        f.line(xs[k], ax.py(p), xs[k], ax.py(1), cls="thin dash", stroke=BLUE,
               stroke_width="1.3", stroke_opacity="0.6")
        f.arrow(xs[k], y - 2, xs[k], ax.py(p), colour=BLUE, width=2.2)
    ax.polyline(list(enumerate(probs)), colour=AMBER, width=1.4, dash=True)
    ax.label(0, 1, "1", cls="bold", dy=-8)
    ax.label(n - 1, probs[-1], "ₖpₓ", cls="sm bold", dx=14, dy=4, anchor="start")
    return f


@figure("Limited Expected Value", "The severity density with everything above the "
        "limit collapsed onto it", width=WID)
def limited_expected_value() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 5, 0, 0.62, left=44, top=34, bottom=48)
    ax.frame(xlabel="loss (000s)", xticks=[0, 1, 2, 3, 4, 5], yticks=[])
    dens = lambda x: 0.6 * math.exp(-0.6 * x)
    ax.area(dens, 0, 2.5, colour=BLUE, opacity="0.18")
    ax.area(dens, 2.5, 5, colour=AMBER, opacity="0.26")
    ax.curve(dens, colour=BLUE, width=2.2)
    ax.vline(2.5, colour=AMBER, y_top=0.55, label="limit u")
    ax.label(1.15, 0.12, "paid in full", cls="sm", fill=BLUE)
    ax.label(3.9, 0.30, "capped at u", cls="sm", fill=AMBER)
    f.arrow(ax.px(4.3), ax.py(0.24), ax.px(2.7), ax.py(0.24), colour=AMBER, width=1.5)
    return f


@figure("Probability Distributions", "A discrete Poisson distribution drawn as bars, "
        "with the continuous normal curve that approximates it laid over them", width=WID)
def probability_distributions() -> Fig:
    f = vcard()

    lam = 6
    ax = vaxes(f, -0.8, 14.8, 0, 0.19, left=24, top=24, bottom=44)
    ax.frame(xlabel="x", xticks=[0, 3, 6, 9, 12], yticks=[])
    ax.bars([(k, _poispmf(k, lam)) for k in range(15)], colour=BLUE, bw=12,
            opacity="0.6")
    ax.curve(lambda x: _npdf(x, lam, math.sqrt(lam)), colour=GREEN, width=2.4)
    ax.label(1.6, _poispmf(2, lam), "Poisson", cls="sm bold", dy=-8, anchor="end")
    ax.label(9.3, _npdf(9.3, lam, math.sqrt(lam)), "Normal", cls="sm bold",
             anchor="start", dx=6, dy=-6)
    return f


@figure("Frequency", "The distribution of claim counts per policy at 0.25 claims per "
        "exposure-year, most of them zero", width=WID)
def frequency() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.6, 4.6, 0, 0.9, left=24, top=30, bottom=48)
    ax.frame(xlabel="claims", xticks=[0, 1, 2, 3, 4], xfmt=lambda t: f"{t:.0f}",
             yticks=[])
    vals = [_poispmf(k, 0.25) for k in range(5)]
    ax.bars(list(enumerate(vals)), colour=BLUE, bw=36, opacity="0.7")
    for k, v in enumerate(vals):
        if v > 0.005:
            ax.label(k, v, f"{v:.3f}", cls="sm", dy=-8)
    return f


@figure("Severity", "A right-skewed severity density with mean, median and mode "
        "marked", width=WID)
def severity() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 30, 0, 0.13, left=24, top=54, bottom=48)
    ax.frame(xlabel="claim size (000s)", xticks=[0, 10, 20, 30], yticks=[])
    dens = lambda x: _gammapdf(x, 1.8, 3.4)
    ax.area(dens, 0, 30, colour=AMBER, opacity="0.14")
    ax.curve(dens, colour=AMBER, width=2.4)
    for x, lab, colour, dy in ((2.7, "mode", "var(--dim)", -36),
                               (4.9, "median", TEAL, -20),
                               (6.1, "mean", ROSE, -4)):
        ax.vline(x, colour=colour, y_top=0.124)
        ax.label(x, 0.124, lab, cls="sm", fill=colour, dy=dy, dx=6, anchor="start")
    return f


@figure("Aggregate Loss Model", "The aggregate loss distribution built as layers — "
        "losses from one claim, two claims and three or more — with a spike at zero for "
        "no claims", width=WID)
def aggregate_loss_model() -> Fig:
    f = vcard()

    lam, shape, scale = 1.4, 1.8, 3.0
    pn = [_poispmf(n, lam) for n in range(12)]
    layers = [
        (BLUE, "N = 1", lambda x: pn[1] * _gammapdf(x, shape, scale)),
        (AMBER, "N = 2", lambda x: pn[2] * _gammapdf(x, 2 * shape, scale)),
        (VIOLET, "N ≥ 3", lambda x: sum(pn[n] * _gammapdf(x, n * shape, scale)
                                        for n in range(3, 12))),
    ]
    top = max(sum(g(x / 4) for _, _, g in layers) for x in range(1, 160))
    ax = vaxes(f, 0, 40, 0, top * 1.12, left=30, top=24, bottom=44)
    ax.frame(xlabel="aggregate loss S", xticks=[0, 10, 20, 30, 40], yticks=[])
    below = lambda x: 0.0
    for colour, _, g in layers:
        upper = (lambda b, g_: lambda x: b(x) + g_(x))(below, g)
        pts = [ax.p(x / 4, below(x / 4)) for x in range(1, 161)]
        pts += [ax.p(x / 4, upper(x / 4)) for x in range(160, 0, -1)]
        f.polygon(pts, fill=colour, fill_opacity="0.5", stroke=colour, stroke_width="1")
        below = upper
    ax.label(3.2, 0.3 * top, "N = 1", cls="sm bold", anchor="start")
    for (colour, name, _), (x0, y0), (x1, y1) in zip(
            layers[1:], ((8.6, 0.52), (14.5, 0.32)), ((17, 0.66), (21, 0.44))):
        f.line(ax.px(x0), ax.py(y0 * top), ax.px(x1) - 3, ax.py(y1 * top) - 4, cls="",
               stroke=colour, stroke_width="1.2")
        f.circle(ax.px(x0), ax.py(y0 * top), 2.4, fill=colour)
        ax.label(x1, y1 * top, name, cls="sm bold", anchor="start")
    f.line(ax.px(0), ax.py(0), ax.px(0), ax.py(top * 1.02), cls="", stroke=GREEN,
           stroke_width="3", stroke_linecap="round")
    ax.point(0, top * 1.02, colour=GREEN, r=4.4)
    ax.label(0, top * 1.02, "N = 0", cls="sm bold", anchor="start", dx=9, dy=4)
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Statistics
# ═══════════════════════════════════════════════════════════════════════════

@figure("Statistics", "A population curve over the sample drawn from it, with the "
        "sample mean X̄ and the spread S marked on the sample", width=WID)
def statistics() -> Fig:
    f = vcard()

    ax = Axes(f, BX0 + 20, BY0 + 34, BX1 - 20, BY0 + 196, -3.4, 3.4, 0, 0.42)
    ax.area(lambda x: _npdf(x), -3.4, 3.4, colour="var(--dim)", opacity="0.12")
    ax.curve(lambda x: _npdf(x), colour="var(--dim)", width=1.8)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    ax.vline(0, colour="var(--dim)", y_top=_npdf(0), label="μ", label_cls="sm bold",
             label_dy=-10)

    pts = [-1.6, -0.9, -0.4, 0.1, 0.35, 0.8, 1.1, 1.9]
    mean = sum(pts) / len(pts)
    sd = math.sqrt(sum((v - mean) ** 2 for v in pts) / (len(pts) - 1))
    y = BY0 + 262
    f.line(ax.x0, y, ax.x1, y, cls="axis")
    for v in pts:
        f.circle(ax.px(v), y, 5, fill=BLUE, fill_opacity="0.9")
    brace(f, ax.px(mean - sd), ax.px(mean + sd), y - 11, depth=8, colour=AMBER,
          label="± S", label_cls="sm bold", below=False)
    f.arrow(ax.px(mean), y + 50, ax.px(mean), y + 9, colour=ROSE, width=1.8)
    f.text(ax.px(mean) + 8, y + 50, "X̄", cls="bold", anchor="start")
    return f


@figure("Sample Mean", "A sample of eight draws scattered along the axis with their "
        "average marked, over the distribution of the average narrowing around μ as n "
        "grows from 1 to 10 to 50", width=WID)
def sample_mean() -> Fig:
    f = vcard()

    ax = vaxes(f, -3, 3, 0, 3.35, left=20, right=20, top=26, bottom=62)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    for n, colour, sd in ((1, "var(--dim)", 1.0), (10, BLUE, 0.32), (50, GREEN, 0.14)):
        ax.curve(lambda x, s=sd: _npdf(x, 0, s), colour=colour, width=2)
    ax.vline(0, colour="var(--dim)", y_top=3.2, label="μ", label_cls="sm bold")
    ax.label(-1.75, 0.42, "n = 1", cls="sm")
    ax.label(-0.72, 1.2, "n = 10", cls="sm", anchor="end")
    ax.label(0.36, 2.55, "n = 50", cls="sm", anchor="start")

    pts = [-1.8, -1.2, -0.7, -0.2, 0.4, 0.9, 1.5, 2.3]
    mean = sum(pts) / len(pts)
    y = ax.y1
    for v in pts:
        f.circle(ax.px(v), y + 14, 4.4, fill=BLUE, fill_opacity="0.85")
    f.arrow(ax.px(mean), y + 48, ax.px(mean), y + 22, colour=ROSE, width=1.8)
    f.text(ax.px(mean) + 8, y + 48, "X̄", cls="bold", anchor="start")
    return f


@figure("Sample Variance", "Five observations as stems from their mean of 10, each "
        "stem the deviation that gets squared", width=WID)
def sample_variance() -> Fig:
    f = vcard()

    data = [4, 6, 9, 11, 20]
    ax = vaxes(f, 0, 6, 0, 22, left=30, top=30, bottom=36)
    ax.frame(xticks=[], yticks=[0, 10, 20])
    ax.hline(10, colour=ROSE, dash=True)
    ax.label(0.3, 10, "X̄", cls="sm bold", anchor="start", dy=-7)
    for i, v in enumerate(data):
        x = i + 1
        ax.polyline([(x, 10), (x, v)], colour=BLUE, width=1.6)
        ax.point(x, v, colour=BLUE, r=4)
        ax.label(x, (v + 10) / 2, f"{v - 10:+d}", cls="sm", dx=13, fill=BLUE)
    return f


@figure("Sampling Distribution", "Sample means from many repeated samples stacked into "
        "a dot plot, with the normal curve they settle into drawn over them", width=WID)
def sampling_distribution() -> Fig:
    f = vcard()

    n, width, r = 150, 0.3, 5.4
    step = 2 * r + 0.6
    ax = vaxes(f, -3, 3, 0, 1, left=20, right=20, top=26, bottom=44)
    ax.ymax = (ax.y1 - ax.y0) / (n * width * step)   # one dot = one sample mean
    ax.frame(xlabel="X̄", xticks=[0], xfmt=lambda t: "μ", yticks=[], arrows=False)
    for k in range(-9, 10):
        for j in range(round(n * width * _npdf(k * width))):
            f.circle(ax.px(k * width), ax.y1 - r - 0.5 - j * step, r, fill=VIOLET,
                     fill_opacity="0.7")
    ax.curve(_npdf, colour=VIOLET, width=2.2)
    return f


@figure("Sufficient Statistic", "Six claim counts funnelled into their total, the one "
        "number the estimate of λ is built from", width=WID)
def sufficient_statistic() -> Fig:
    f = vcard()

    counts = [2, 0, 1, 3, 0, 1]
    ty, ey = BY0 + 180, BY0 + 280
    for i, c in enumerate(counts):
        x = BX0 + 40 + i * 48
        f.line(x, BY0 + 58, BCX, ty - 30, cls="", stroke=BLUE, stroke_width="1.1",
               stroke_opacity="0.6")
        f.circle(x, BY0 + 46, 15, fill=BLUE, fill_opacity="0.16", stroke=BLUE,
                 stroke_width="1.4")
        f.text(x, BY0 + 50.5, str(c), cls="bold")
    f.circle(BCX, ty, 30, fill=ROSE, fill_opacity="0.16", stroke=ROSE,
             stroke_width="1.8")
    f.text(BCX, ty + 6, str(sum(counts)), cls="ttl")
    f.text(BCX + 40, ty + 5, "T", cls="bold", anchor="start")
    f.arrow(BCX, ty + 32, BCX, ey - 24, colour="var(--dim)", width=1.5)
    f.circle(BCX, ey, 22, fill=GREEN, fill_opacity="0.16", stroke=GREEN,
             stroke_width="1.6")
    f.text(BCX, ey + 5, "λ̂", cls="ttl")
    return f


@figure("Sufficiency", "Likelihood curves of two samples with the same total: one is "
        "a constant multiple of the other, so both peak at the same estimate", width=WID)
def sufficiency() -> Fig:
    f = vcard()

    lik = lambda lam, h: h * math.exp(-6 * lam) * lam ** 7
    a, b = 1 / 12, 1 / 4          # 1 / Π xᵢ! for (2,0,1,3,0,1) and (1,1,2,0,2,1)
    hat = 7 / 6
    ax = vaxes(f, 0, 3, 0, lik(hat, b) * 1.14, left=24, top=24, bottom=44)
    ax.frame(xlabel="λ", xticks=[0, hat, 2, 3],
             xfmt=lambda t: "λ̂" if abs(t - hat) < 1e-9 else f"{t:g}", yticks=[])
    ax.area(lambda x: lik(x, b), 0, 3, colour=AMBER, opacity="0.1")
    ax.curve(lambda x: lik(x, b), colour=AMBER, width=2.4)
    ax.area(lambda x: lik(x, a), 0, 3, colour=BLUE, opacity="0.14")
    ax.curve(lambda x: lik(x, a), colour=BLUE, width=2.4)
    ax.vline(hat, colour="var(--dim)", y_top=lik(hat, a))
    f.arrow(ax.px(hat), ax.py(lik(hat, a)) - 4, ax.px(hat), ax.py(lik(hat, b)) + 3,
            colour=ROSE, width=1.8)
    ax.label(hat, (lik(hat, a) + lik(hat, b)) / 2, "× 3", cls="sm bold", dx=8,
             anchor="start", dy=4)
    ax.label(2.05, lik(2.05, b), "sample B", cls="sm bold", anchor="start", dx=4, dy=-4)
    ax.label(1.9, lik(1.9, a), "sample A", cls="sm bold", anchor="start", dx=4, dy=-4)
    return f


@figure("Maximum Likelihood Estimation", "The log-likelihood of a Poisson rate given "
        "20 claims in 80 exposure-years, peaking at the estimate 0.25", width=WID)
def maximum_likelihood_estimation() -> Fig:
    f = vcard()

    ax = vaxes(f, 0.05, 0.55, -72, -48, left=30, top=30, bottom=46)
    ax.frame(xlabel="λ", xticks=[0.1, 0.25, 0.4], xfmt=lambda t: f"{t:g}", yticks=[],
             ylabel="ℓ(λ)")
    ll = lambda lam: -80 * lam + 20 * math.log(lam) - 4
    ax.curve(ll, colour=BLUE, width=2.4)
    hat = 0.25
    ax.vline(hat, colour=ROSE, y_top=ll(hat))
    ax.point(hat, ll(hat), colour=ROSE, r=4.4)
    ax.label(hat, ll(hat), "λ̂", cls="bold", dy=-12)
    return f


@figure("Method of Moments", "A histogram of claim sizes with a gamma curve fitted by "
        "matching moments, both sharing the mean of 500", width=WID)
def method_of_moments() -> Fig:
    f = vcard()

    u = _rng(22)
    sizes = [-250 * (math.log(1 - u() * 0.999) + math.log(1 - u() * 0.999))
             for _ in range(200)]
    shares = [(b + 50, sum(b <= s < b + 100 for s in sizes) / len(sizes) / 100)
              for b in range(0, 1800, 100)]
    top = max(v for _, v in shares)
    ax = vaxes(f, 0, 1800, 0, top * 1.12, left=20, right=20, top=26, bottom=44)
    ax.frame(xlabel="claim size", xticks=[0, 500, 1000, 1500],
             xfmt=lambda t: "X̄" if t == 500 else f"{t:,.0f}", yticks=[])
    ax.bars(shares, colour=BLUE, bw=ax.px(88) - ax.px(0), opacity="0.45")
    ax.curve(lambda x: _gammapdf(x, 2, 250), colour=AMBER, width=2.6)
    ax.vline(500, colour=ROSE, y_top=top * 1.02)
    ax.label(500, top * 1.02, "αθ", cls="bold", dy=-6)
    return f


@figure("Fisher Information", "A sharply curved log-likelihood with high information "
        "beside a flat one with low information, both peaking at the estimate", width=WID)
def fisher_information() -> Fig:
    f = vcard()

    ax = vaxes(f, -3, 3, -5.2, 0.4, left=30, top=30, bottom=20)
    ax.frame(xlabel="θ", xticks=[0], xfmt=lambda t: "θ̂", yticks=[], ylabel="ℓ(θ)")
    ax.curve(lambda x: -1.4 * x * x, colour=BLUE, width=2.4, xa=-1.9, xb=1.9)
    ax.curve(lambda x: -0.28 * x * x, colour=AMBER, width=2.4)
    ax.label(1.25, -3.4, "high I(θ)", cls="sm bold", anchor="start")
    ax.label(2.55, -1.5, "low I(θ)", cls="sm bold", anchor="end")
    ax.point(0, 0, colour=ROSE, r=4)
    return f


@figure("Unbiasedness", "Two estimators' sampling distributions, one centred on the "
        "parameter θ and one shifted off it by the bias", width=WID)
def unbiasedness() -> Fig:
    f = vcard()

    ax = vaxes(f, -4, 4, 0, 0.46, left=20, right=20, top=30, bottom=44)
    ax.frame(xticks=[0], xfmt=lambda t: "θ", yticks=[])
    ax.area(lambda x: _npdf(x, 0, 1.0), -4, 4, colour=GREEN, opacity="0.14")
    ax.curve(lambda x: _npdf(x, 0, 1.0), colour=GREEN, width=2.4)
    ax.curve(lambda x: _npdf(x, 1.8, 1.0), colour=ROSE, width=2.2, dash=True)
    ax.vline(0, colour=GREEN, y_top=0.42)
    ax.vline(1.8, colour=ROSE, y_top=0.42)
    ax.label(-0.15, 0.44, "unbiased", cls="sm", fill=GREEN, anchor="end")
    ax.label(1.95, 0.44, "biased", cls="sm", fill=ROSE, anchor="start")
    brace(f, ax.px(0), ax.px(1.8), ax.py(0.06), depth=7, colour=ROSE, label="bias",
          label_cls="sm")
    return f


@figure("Bias", "An estimator's sampling distribution centred at E[θ̂], off the true θ "
        "by the bias, with its spread marked", width=WID)
def bias() -> Fig:
    f = vcard()

    ax = vaxes(f, -3.4, 4.6, 0, 0.62, left=20, right=20, top=30, bottom=48)
    ax.frame(xticks=[0], xfmt=lambda t: "θ", yticks=[])
    ax.curve(lambda x: _npdf(x, 1.5, 0.75), colour=ROSE, width=2.4)
    ax.area(lambda x: _npdf(x, 1.5, 0.75), -3.4, 4.6, colour=ROSE, opacity="0.12")
    ax.vline(0, colour="var(--dim)", y_top=0.58)
    ax.vline(1.5, colour=ROSE, y_top=0.58)
    ax.label(1.5, 0.60, "E[θ̂]", cls="sm", fill=ROSE)
    brace(f, ax.px(0), ax.px(1.5), ax.py(0.03), depth=8, colour=ROSE, label="bias",
          label_cls="sm")
    brace(f, ax.px(0.75), ax.px(2.25), ax.py(0.30), depth=8, colour=AMBER,
          label="spread", below=False, label_cls="sm")
    return f


@figure("Consistency", "The sampling distribution collapsing onto the parameter θ as "
        "the sample grows from 25 to 1,600", width=WID)
def consistency() -> Fig:
    f = vcard()

    ax = vaxes(f, -3, 3, 0, 3.4, left=20, right=20, top=26, bottom=44)
    ax.frame(xticks=[0], xfmt=lambda t: "θ", yticks=[])
    for n, sd, colour in ((25, 1.0, "var(--dim)"), (100, 0.5, BLUE),
                          (400, 0.25, GREEN), (1600, 0.125, ROSE)):
        ax.curve(lambda x, s=sd: _npdf(x, 0, s), colour=colour, width=2)
    ax.label(-1.7, 0.30, "n = 25", cls="sm", fill="var(--dim)")
    ax.label(-0.95, 0.72, "n = 100", cls="sm", fill=BLUE, anchor="end")
    ax.label(0.62, 1.5, "n = 400", cls="sm", fill=GREEN, anchor="start")
    ax.label(0.62, 2.9, "n = 1600", cls="sm", fill=ROSE, anchor="start")
    return f


@figure("Efficiency", "Two unbiased estimators centred on θ: the efficient one tight, "
        "the other wider", width=WID)
def efficiency() -> Fig:
    f = vcard()

    ax = vaxes(f, -4, 4, 0, 0.86, left=20, right=20, top=26, bottom=44)
    ax.frame(xticks=[0], xfmt=lambda t: "θ", yticks=[])
    ax.area(lambda x: _npdf(x, 0, 0.5), -4, 4, colour=GREEN, opacity="0.14")
    ax.curve(lambda x: _npdf(x, 0, 0.5), colour=GREEN, width=2.4)
    ax.curve(lambda x: _npdf(x, 0, 1.2), colour=AMBER, width=2.2)
    ax.label(0.62, 0.74, "efficient", cls="sm bold", anchor="start")
    ax.label(2.0, 0.18, "inefficient", cls="sm bold", anchor="start")
    return f


@figure("Minimum Variance", "Variances of four competing unbiased estimators, with the "
        "sample mean's the smallest", width=WID)
def minimum_variance() -> Fig:
    f = vcard()

    ests = [("X̄", 1.00, GREEN), ("median", 1.57, BLUE), ("midrange", 2.30, AMBER),
            ("X₁", 4.00, ROSE)]
    ax = vaxes(f, -0.7, 3.7, 0, 4.6, left=30, top=30, bottom=36)
    ax.frame(xticks=[], yticks=[0, 2, 4], ylabel="Var(θ̂)")
    for i, (name, v, colour) in enumerate(ests):
        ax.bars([(i, v)], colour=colour, bw=46, opacity="0.7")
        ax.label(i, 0, name, cls="sm", dy=18)
        ax.label(i, v, f"{v:.2f}", cls="sm", dy=-8)
    ax.hline(1.0, colour=GREEN, dash=True, x_to=3.6)
    return f


@figure("Mean Square Error", "Three estimators' mean square errors as stacked bars of "
        "variance plus squared bias", width=WID)
def mean_square_error() -> Fig:
    f = vcard()

    rows = [("A", 100, 0), ("B", 50, 16), ("C", 20, 64)]
    ax = vaxes(f, -0.7, 2.7, 0, 105, left=36, top=30, bottom=36)
    ax.frame(xticks=[], yticks=[0, 50, 100], ylabel="MSE")
    for i, (name, var, b2) in enumerate(rows):
        ax.bars([(i, var)], colour=BLUE, bw=64, opacity="0.7")
        yb, yt = ax.py(var), ax.py(var + b2)
        f.rect(ax.px(i) - 32, yt, 64, yb - yt, rx=1.5, fill=ROSE, fill_opacity="0.7")
        ax.label(i, 0, name, cls="sm", dy=18)
        ax.label(i, var + b2, f"{var + b2}", cls="sm bold", dy=-8)
    ax.label(0, 50, "Var", cls="sm bold", dy=4)
    ax.label(2, 52, "bias²", cls="sm bold", dy=4)
    return f


@figure("Hypothesis Testing", "The null distribution of Z with its rejection region "
        "beyond 1.645 and an observed statistic of 2.50 falling in it", width=WID)
def hypothesis_testing() -> Fig:
    f = vcard()

    ax = vaxes(f, -3.6, 3.6, 0, 0.46, left=20, right=20, top=30, bottom=44)
    ax.frame(xlabel="Z", xticks=[0, 1.645],
             xfmt=lambda t: {1.645: "1.645", 0.0: "0"}.get(round(t, 3), ""),
             yticks=[])
    ax.area(lambda x: _npdf(x), -3.6, 1.645, colour=BLUE, opacity="0.12")
    ax.area(lambda x: _npdf(x), 1.645, 3.6, colour=ROSE, opacity="0.5")
    ax.curve(lambda x: _npdf(x), colour=BLUE, width=2.4)
    ax.vline(1.645, colour=ROSE, y_top=0.42)
    ax.label(-0.9, 0.20, "do not reject", cls="sm")
    ax.label(2.35, 0.10, "reject", cls="sm bold", dy=-16)
    ax.point(2.5, 0.014, colour=AMBER, r=4.4)
    ax.label(2.5, 0.014, "2.50", cls="sm bold", dy=-10, dx=8, anchor="start")
    return f


@figure("Type I Error", "The α tail of the null distribution beyond the critical "
        "value — rejecting a null that is true", width=WID)
def type_i_error() -> Fig:
    f = vcard()

    ax = vaxes(f, -3.6, 3.6, 0, 0.46, left=20, right=20, top=30, bottom=44)
    ax.frame(xticks=[0, 1.645], xfmt=lambda t: "μ₀" if t == 0 else "critical value",
             yticks=[])
    ax.curve(lambda x: _npdf(x), colour=BLUE, width=2.4)
    ax.area(lambda x: _npdf(x), 1.645, 3.6, colour=ROSE, opacity="0.55")
    ax.vline(1.645, colour=ROSE, y_top=0.42)
    f.arrow(ax.px(2.9), ax.py(0.20), ax.px(2.1), ax.py(0.045), colour=ROSE, width=1.5)
    ax.label(2.9, 0.22, "α", cls="bold")
    ax.label(-1.6, 0.34, "H₀", cls="sm bold")
    return f


@figure("Type II Error", "The null and alternative distributions either side of the "
        "critical value, with the β region of the alternative that fails to reject",
        width=WID)
def type_ii_error() -> Fig:
    f = vcard()

    ax = vaxes(f, -3.4, 6.4, 0, 0.46, left=20, right=20, top=30, bottom=44)
    ax.frame(xticks=[0, 1.645, 3], xfmt=lambda t: {0.0: "μ₀", 3.0: "μ₁"}.get(t, ""),
             yticks=[])
    ax.curve(lambda x: _npdf(x), colour="var(--dim)", width=1.8)
    ax.curve(lambda x: _npdf(x, 3), colour=BLUE, width=2.4)
    ax.area(lambda x: _npdf(x, 3), -3.4, 1.645, colour=AMBER, opacity="0.5")
    ax.area(lambda x: _npdf(x), 1.645, 6.4, colour=ROSE, opacity="0.35")
    ax.vline(1.645, colour="var(--dim)", y_top=0.42)
    ax.label(0.55, 0.055, "β", cls="bold", fill=AMBER)
    ax.label(2.2, 0.04, "α", cls="bold", fill=ROSE)
    ax.label(-1.5, 0.36, "H₀", cls="sm", fill="var(--dim)")
    ax.label(4.3, 0.36, "H₁", cls="sm", fill=BLUE)
    return f


@figure("Power of a Test", "The power curve rising from α as the truth moves away "
        "from the null", width=WID)
def power_of_a_test() -> Fig:
    f = vcard()

    ax = vaxes(f, 4800, 5500, 0, 1.05, left=44, top=42, bottom=50)
    ax.frame(xlabel="true mean μ", xticks=[4900, 5100, 5300, 5500],
             xfmt=lambda t: f"{t:,.0f}", yticks=[0, 0.5, 1.0],
             yfmt=lambda v: f"{v:g}", ylabel="power")

    def power(mu, n):
        crit = 5000 + 1.645 * 800 / math.sqrt(n)
        z = (crit - mu) / (800 / math.sqrt(n))
        return 1 - 0.5 * (1 + math.erf(z / math.sqrt(2)))

    ax.curve(lambda m: power(m, 100), colour=BLUE, width=2.4)
    ax.curve(lambda m: power(m, 25), colour=AMBER, width=2.2)
    ax.hline(0.05, colour="var(--dim)", label="α", label_dx=6, label_cls="sm dim")
    ax.point(5200, power(5200, 100), colour=ROSE, r=4)
    ax.label(5200, power(5200, 100), "0.80", cls="sm bold", fill=ROSE, dy=-10, dx=16)
    ax.label(5185, 0.28, "n = 25", cls="sm", fill=AMBER, anchor="start")
    ax.label(5075, 0.72, "n = 100", cls="sm", fill=BLUE, anchor="start")
    return f


@figure("p-Value", "The null distribution with the α region beyond the critical value "
        "and the smaller p-value tail beyond the observed 2.50", width=WID)
def p_value() -> Fig:
    f = vcard()

    ax = vaxes(f, -3.6, 3.6, 0, 0.46, left=20, right=20, top=30, bottom=44)
    ax.frame(xticks=[0, 2.5], xfmt=lambda t: "0" if t == 0 else "2.50", yticks=[])
    ax.curve(lambda x: _npdf(x), colour=BLUE, width=2.4)
    ax.area(lambda x: _npdf(x), 1.645, 3.6, colour="var(--dim)", opacity="0.18")
    ax.area(lambda x: _npdf(x), 2.5, 3.6, colour=ROSE, opacity="0.65")
    ax.vline(2.5, colour=ROSE, y_top=0.30)
    ax.vline(1.645, colour="var(--dim)", y_top=0.22, label="α", label_cls="sm bold")
    f.arrow(ax.px(3.1), ax.py(0.26), ax.px(2.75), ax.py(0.03), colour=ROSE, width=1.5)
    ax.label(3.1, 0.28, "p", cls="bold")
    return f


@figure("Confidence Interval", "Twenty intervals from twenty samples around the true "
        "mean μ, one of which misses it", width=WID)
def confidence_interval() -> Fig:
    f = vcard()

    x0, x1 = BX0 + 34, BX1 - 20
    mid = (x0 + x1) / 2
    f.line(mid, BY0 + 20, mid, BY1 - 4, cls="thin dash", stroke=ROSE,
           stroke_width="1.4")
    f.text(mid, BY0 + 14, "μ", cls="sm bold", fill=ROSE)
    u = _rng(2027)
    miss = 11                      # exactly one interval in the twenty misses
    for i in range(20):
        y = BY0 + 32 + i * 15
        half = 46 + (u() - 0.5) * 12
        offset = (u() - 0.5) * 1.4 * half
        centre = mid + (half + 14 if i == miss else offset)
        hit = abs(centre - mid) < half
        colour = BLUE if hit else ROSE
        f.line(centre - half, y, centre + half, y, cls="", stroke=colour,
               stroke_width="2.4", stroke_linecap="round")
        f.circle(centre, y, 2.6, fill=colour)
        for end in (centre - half, centre + half):
            f.line(end, y - 4, end, y + 4, cls="", stroke=colour, stroke_width="1.4")
    return f


@figure("Likelihood Ratio Test", "A log-likelihood curve with the full model at its "
        "peak and the reduced model held lower down, the gap between them marked",
        width=WID)
def likelihood_ratio_test() -> Fig:
    f = vcard()

    full, reduced, hat, nul = -407.1, -412.6, 0.6, -1.2
    ll = lambda t: full - (full - reduced) / (hat - nul) ** 2 * (t - hat) ** 2
    ax = vaxes(f, -2, 3, -420, -404, left=24, top=30, bottom=44)
    ax.frame(xticks=[nul, hat], xfmt=lambda t: "θ̂" if t == hat else "θ₀", yticks=[],
             ylabel="log-likelihood")
    ax.curve(ll, colour=BLUE, width=2.4)
    xg = 2.2
    for t, v, colour in ((hat, full, BLUE), (nul, reduced, AMBER)):
        ax.vline(t, colour=colour, y_top=v)
        f.line(ax.px(t), ax.py(v), ax.px(xg), ax.py(v), cls="thin dash", stroke=colour,
               stroke_width="1.3")
        ax.point(t, v, colour=colour, r=4.4)
    ax.label(hat, full, "full", cls="sm bold", dy=-10)
    ax.label(nul, reduced, "reduced", cls="sm bold", dx=-8, dy=-8, anchor="end")
    f.arrow(ax.px(xg), ax.py(reduced), ax.px(xg), ax.py(full) + 2, colour=ROSE,
            width=1.8)
    ax.label(xg, (full + reduced) / 2, "5.5", cls="sm bold", dx=8, dy=4,
             anchor="start")
    return f


@figure("Censoring", "Six claims drawn as bars from zero: four observed in full, two "
        "stopped at the policy limit with their true size unknown", width=WID)
def censoring() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, -0.6, 6.4, left=20, top=30, bottom=48)
    ax.frame(xlabel="claim size (000s)", xticks=[0, 2, 4, 6, 8, 10], yticks=[])
    limit = 6.0
    ax.vline(limit, colour=ROSE, dash=True, y_top=6.2, label="policy limit u",
             label_cls="sm", label_dy=-6)
    obs = [(3.4, False), (5.1, False), (6.0, True), (2.2, False), (6.0, True),
           (4.4, False)]
    for i, (v, cens) in enumerate(obs):
        y = 5.6 - i * 0.95
        ax.polyline([(0, y), (v, y)], colour=BLUE if not cens else ROSE, width=2)
        if cens:
            ax.point(v, y, colour=ROSE, r=3.6)
            ax.label(v, y, "→ ?", cls="sm", fill=ROSE, dx=22, dy=4)
        else:
            ax.point(v, y, colour=BLUE, r=3.6)
    return f


@figure("Truncation", "A loss density cut at the deductible: the part below is never "
        "seen, and the part above is rescaled to integrate to one", width=WID)
def truncation() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 12, 0, 0.36, left=20, top=30, bottom=48)
    ax.frame(xlabel="loss (000s)", xticks=[0, 3, 6, 9, 12], yticks=[])
    dens = lambda x: _gammapdf(x, 2.0, 2.0)
    ax.area(dens, 0, 3, colour="var(--dim)", opacity="0.18")
    ax.curve(dens, colour="var(--dim)", width=1.8, dash=True)
    surv = 1 - (1 - math.exp(-1.5) * (1 + 1.5))
    ax.curve(lambda x: dens(x) / surv if x >= 3 else None, colour=BLUE, width=2.4,
             xa=3, xb=12)
    ax.area(lambda x: dens(x) / surv, 3, 12, colour=BLUE, opacity="0.14")
    ax.vline(3, colour=ROSE, y_top=0.34, label="deductible d", label_cls="sm")
    ax.label(1.75, 0.045, "never seen", cls="sm")
    ax.label(6.4, 0.16, "rescaled", cls="sm bold", anchor="start")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# C. Extended linear models — the model families
# ═══════════════════════════════════════════════════════════════════════════

@figure("Extended Linear Model", "Three nested regions: ordinary linear regression "
        "inside the generalized linear model, inside the extended linear model",
        width=WID)
def extended_linear_model() -> Fig:
    f = vcard()

    base = BY1 - 6
    rings = [(156, 158, GREEN, "extended"), (116, 112, AMBER, "GLM"),
             (70, 62, BLUE, "linear")]
    for rx, ry, colour, _ in rings:
        f.ellipse(BCX, base - ry, rx, ry, fill=colour, fill_opacity="0.12",
                  stroke=colour, stroke_width="1.6")
    for rx, ry, colour, name in rings:
        f.text(BCX, base - 2 * ry + 24, name, cls="bold")

    # one glyph per ring, under its name: crossing lines, a curved mean, a line fit
    y = base - 258
    f.line(BCX - 26, y + 10, BCX + 26, y - 10, cls="", stroke=GREEN, stroke_width="2")
    f.line(BCX - 26, y - 6, BCX + 26, y + 8, cls="", stroke=GREEN, stroke_width="2")
    y = base - 164
    f.path(f"M{BCX - 30},{y + 12} Q{BCX + 12},{y + 12} {BCX + 30},{y - 14}",
           cls="curve", stroke=AMBER)
    y = base - 50
    f.line(BCX - 30, y + 14, BCX + 30, y - 12, cls="", stroke=BLUE, stroke_width="2")
    for dx, dy in ((-22, 4), (-8, 10), (6, -8), (20, -2)):
        f.circle(BCX + dx, y + dy, 2.6, fill=BLUE)
    return f


@figure("Linear Regression", "A fitted least-squares line through ten points, with the "
        "residuals it minimizes drawn as vertical gaps", width=WID)
def linear_regression() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 60, left=30, top=30, bottom=48)
    ax.frame(xlabel="predictor x", xticks=[0, 5, 10], yticks=[0, 30, 60],
             ylabel="response y")
    fit = lambda x: 25.8 + 1.6 * x * 1.35
    pts = [(0.8, 33), (1.9, 27), (2.9, 36), (3.8, 30), (4.7, 41), (5.6, 38),
           (6.6, 49), (7.5, 43), (8.4, 53), (9.2, 48)]
    for x, y in pts:
        f.line(ax.px(x), ax.py(y), ax.px(x), ax.py(fit(x)), cls="thin",
               stroke=ROSE, stroke_width="1.3")
    ax.curve(fit, colour=BLUE, width=2.4)
    for x, y in pts:
        ax.point(x, y, colour=BLUE, r=3.6)
    ax.label(10, fit(10), "ŷ", cls="bold", dx=-4, dy=18)
    ax.label(7.3, 24, "residual", cls="sm", anchor="start")
    f.arrow(ax.px(7.9), ax.py(26), ax.px(7.5), ax.py(45), colour=ROSE, width=1.2,
            dash=True)
    return f


@figure("Generalized Linear Model", "A curved mean running through the data, with the "
        "response distribution at three points drawn sideways and widening as the mean "
        "grows", width=WID)
def generalized_linear_model() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 16, left=30, top=30, bottom=44)
    ax.frame(xlabel="x", xticks=[0, 5, 10], yticks=[], ylabel="y")
    mean = lambda x: math.exp(0.4 + 0.18 * x)
    shape = 4
    u = _rng(61)
    for _ in range(26):
        x = 0.3 + u() * 9.4
        y = -mean(x) / shape * sum(math.log(1 - u() * 0.999) for _ in range(shape))
        if y < 16:
            ax.point(x, y, colour="var(--dim)", r=2.4)
    for x in (2, 5, 8):
        m = mean(x)
        dens = lambda y, m=m: _gammapdf(y, shape, m / shape)
        peak = dens(m * (shape - 1) / shape)
        ys = [m * 2.4 * i / 60 for i in range(61)]
        ys = [y for y in ys if y <= 16]
        pts = [(ax.px(x) + 38 * dens(y) / peak, ax.py(y)) for y in ys]
        f.polygon([(ax.px(x), ax.py(ys[0]))] + pts + [(ax.px(x), ax.py(ys[-1]))],
                  fill=AMBER, fill_opacity="0.3", stroke=AMBER, stroke_width="1.4")
    ax.curve(mean, colour=BLUE, width=2.6)
    ax.label(9.6, mean(9.6), "μ(x)", cls="sm bold", anchor="end", dx=-6, dy=-4)
    return f


@figure("Linear Mixed Model", "Three groups' lines sharing one slope but with their "
        "own intercepts, scattered around the population line", width=WID)
def linear_mixed_model() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 60, left=30, top=30, bottom=44)
    ax.frame(xlabel="x", xticks=[0, 5, 10], yticks=[0, 30, 60], ylabel="y")
    ax.curve(lambda x: 20 + 2.6 * x, colour=ROSE, width=2.8)
    u = _rng(88)
    for g, colour in enumerate((BLUE, AMBER, GREEN)):
        b = (g - 1) * 11.0
        ax.curve(lambda x, b=b: 20 + b + 2.6 * x, colour=colour, width=1.6,
                 dash=True)
        for k in range(4):
            x = 1.2 + k * 2.6 + (u() - 0.5)
            ax.point(x, 20 + b + 2.6 * x + (u() - 0.5) * 5, colour=colour, r=3)
    ax.label(1.2, 20 + 2.6 * 1.2, "population", cls="sm", fill=ROSE,
             anchor="start", dy=-9)
    return f


@figure("Model Structure", "The linear predictor built as a waterfall of terms: the "
        "intercept, two main effects, an interaction and a squared term, summing to η",
        width=WID)
def model_structure() -> Fig:
    f = vcard()

    terms = [("β₀", 1.0, "var(--dim)"), ("β₁x₁", 0.6, BLUE), ("β₂x₂", -0.3, BLUE),
             ("β₃x₁x₂", 0.4, AMBER), ("β₄x₁²", -0.2, GREEN)]
    ax = vaxes(f, -0.6, 5.6, 0, 1.9, left=20, right=20, top=30, bottom=36)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    bw = (ax.px(1) - ax.px(0)) * 0.62
    level = 0.0
    for i, (name, v, colour) in enumerate(terms):
        lo, hi = sorted((level, level + v))
        f.rect(ax.px(i) - bw / 2, ax.py(hi), bw, ax.py(lo) - ax.py(hi), rx=2,
               fill=colour, fill_opacity="0.7")
        if i:
            f.line(ax.px(i - 1) + bw / 2, ax.py(level), ax.px(i) - bw / 2, ax.py(level),
                   cls="thin dot", stroke="var(--dim)", stroke_width="1.2")
        level += v
        ax.label(i, 0, name, cls="sm bold", dy=18)
    f.line(ax.px(4) + bw / 2, ax.py(level), ax.px(5) - bw / 2, ax.py(level),
           cls="thin dot", stroke="var(--dim)", stroke_width="1.2")
    f.rect(ax.px(5) - bw / 2, ax.py(level), bw, ax.py(0) - ax.py(level), rx=2,
           fill=VIOLET, fill_opacity="0.7")
    ax.label(5, 0, "η", cls="bold", dy=18)
    return f


@figure("Link Function", "The log link's mean curve staying above zero across the "
        "linear predictor, while an identity link's straight line drops below zero",
        width=WID)
def link_function() -> Fig:
    f = vcard()

    ax = vaxes(f, -2.6, 2.6, -2.4, 8, left=30, top=30, bottom=20)
    f.rect(ax.x0, ax.py(0), ax.x1 - ax.x0, ax.py(-2.4) - ax.py(0), fill=ROSE,
           fill_opacity="0.12")
    ax.frame(xlabel="η", xticks=[], yticks=[0, 4, 8], ylabel="mean μ")
    ax.curve(lambda e: math.exp(e), colour=BLUE, width=2.6, xb=2.05)
    ax.curve(lambda e: 2.6 + 1.6 * e, colour="var(--dim)", width=1.8, dash=True)
    ax.label(1.95, 7.4, "log link", cls="sm bold", anchor="end", dx=-8)
    ax.label(-0.6, 2.6, "identity", cls="sm", anchor="end")
    ax.label(1.2, -1.4, "μ < 0", cls="sm bold")
    return f


@figure("Exponential Family", "Variance functions of four exponential-family members "
        "against the mean: flat for the normal, then μ, μ² and μ³", width=WID)
def exponential_family() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 3.2, 0, 10, left=30, top=30, bottom=44)
    ax.frame(xlabel="mean μ", xticks=[0, 1, 2, 3], yticks=[0, 5, 10],
             ylabel="V(μ)")
    for power, colour in ((0, "var(--dim)"), (1, BLUE), (2, AMBER), (3, GREEN)):
        ax.curve(lambda m, p=power: m ** p, colour=colour, width=2.2,
                 xb=min(3.2, 10 ** (1 / power)) if power else None)
    ax.label(3.15, 1, "Normal", cls="sm bold", anchor="end", dy=-7)
    ax.label(3.15, 3.15, "Poisson", cls="sm bold", anchor="end", dy=-9)
    ax.label(2.85, 8.1, "Gamma", cls="sm bold", anchor="end", dx=-8)
    ax.label(2.05, 9.6, "inv. Gaussian", cls="sm bold", anchor="end", dx=-8)
    return f


@figure("Logistic Regression", "A falling logistic curve of renewal probability "
        "against rate increase, fitted to policies that renewed at 1 or lapsed at 0",
        width=WID)
def logistic_regression() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 40, -0.08, 1.12, left=30, top=30, bottom=44)
    ax.frame(xlabel="rate increase (%)", xticks=[0, 10, 20, 30, 40],
             yticks=[0, 0.5, 1.0], yfmt=lambda v: f"{v:g}", ylabel="P(renew)")
    curve = lambda x: 1 / (1 + math.exp(-(1.20 - 0.075 * x)))
    ax.curve(curve, colour=BLUE, width=2.6)
    u = _rng(404)
    for _ in range(22):
        x = u() * 40
        hit = u() < curve(x)
        ax.point(x, 1.0 if hit else 0.0, colour=GREEN if hit else ROSE, r=2.8)
    ax.point(10, curve(10), colour=AMBER, r=4.4)
    ax.label(10, curve(10), "0.71", cls="sm bold", dx=10, dy=-10, anchor="start")
    return f


@figure("Poisson Regression", "Expected claim frequency as bars growing step by step "
        "from a base of 0.100 as each rating factor multiplies it", width=WID)
def poisson_regression() -> Fig:
    f = vcard()

    rows = [("base", 0.100, "var(--dim)"), ("× urban", 0.130, BLUE),
            ("× young", 0.196, AMBER), ("× prior claim", 0.244, ROSE)]
    ax = vaxes(f, 0, 0.30, 0, 4.6, left=88, top=20, bottom=44)
    ax.frame(xlabel="frequency", xticks=[0, 0.1, 0.2], xfmt=lambda t: f"{t:g}",
             yticks=[])
    for i, (name, v, colour) in enumerate(rows):
        y = 4 - i
        f.rect(ax.px(0), ax.py(y) - 14, ax.px(v) - ax.px(0), 28, rx=3,
               fill=colour, fill_opacity="0.65")
        f.text(ax.px(0) - 8, ax.py(y) + 4, name, cls="sm", anchor="end")
        f.text(ax.px(v) + 6, ax.py(y) + 4, f"{v:.3f}", cls="sm", anchor="start")
        if i:
            prev = rows[i - 1][1]
            f.line(ax.px(prev), ax.py(y + 1) + 14, ax.px(prev), ax.py(y) - 14,
                   cls="thin dot", stroke="var(--dim)", stroke_width="1.2")
    return f


@figure("Tweedie Distribution", "A tall spike at zero for policies with no claim, "
        "beside a right-skewed curve for the cost of those that do claim", width=WID)
def tweedie_distribution() -> Fig:
    f = vcard()

    ax = vaxes(f, -1.5, 26, 0, 0.115, left=20, top=30, bottom=44)
    ax.frame(xlabel="pure premium", xticks=[0, 10, 20], yticks=[])
    dens = lambda x: _gammapdf(x, 1.9, 3.4) * 0.55
    ax.area(dens, 0.1, 26, colour=AMBER, opacity="0.16")
    ax.curve(dens, colour=AMBER, width=2.4, xa=0.1)
    f.rect(ax.px(0) - 7, ax.py(0.098), 14, ax.py(0) - ax.py(0.098), rx=2,
           fill=BLUE, fill_opacity="0.7")
    ax.label(0, 0.098, "no claim", cls="sm bold", dy=-9, dx=-4, anchor="start")
    ax.label(11, 0.03, "claim cost", cls="sm bold", anchor="start")
    return f


@figure("Dispersion Parameter", "One fitted line with three nested bands of scatter "
        "around it, widening as φ grows from 0.4 to 1 to 2.5", width=WID)
def dispersion_parameter() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 48, left=20, right=20, top=24, bottom=36)
    ax.frame(xlabel="x", xticks=[], yticks=[], ylabel="y")
    mean = lambda x: 16 + 2.0 * x
    for phi, colour in ((2.5, ROSE), (1.0, BLUE), (0.4, GREEN)):
        half = 8 * math.sqrt(phi)
        pts = [ax.p(x / 5, mean(x / 5) + half) for x in range(41)]
        pts += [ax.p(x / 5, mean(x / 5) - half) for x in range(40, -1, -1)]
        f.polygon(pts, fill=colour, fill_opacity="0.16", stroke=colour,
                  stroke_width="1.1")
        ax.label(8, mean(8) + half, f"φ = {phi:g}", cls="sm bold", anchor="start",
                 dx=6, dy=4)
    ax.curve(mean, colour="var(--ink)", width=2, xb=8)
    u = _rng(31)
    for k in range(11):
        x = 0.3 + k * 0.74
        ax.point(x, mean(x) + (u() - 0.5) * 16, colour="var(--dim)", r=2.6)
    return f


# ── specifying the model ─────────────────────────────────────────────────────

@figure("Categorical Predictor", "Three territory levels: the rural base at zero and "
        "one coefficient bar each for suburban and urban, measured from that base",
        width=WID)
def categorical_predictor() -> Fig:
    f = vcard()

    levels = [("rural", 0.0, "var(--dim)"), ("suburban", 0.17, AMBER),
              ("urban", 0.26, BLUE)]
    ax = vaxes(f, -0.6, 2.6, 0, 0.3, left=30, top=30, bottom=36)
    ax.frame(xticks=[], yticks=[], ylabel="β")
    for i, (name, beta, colour) in enumerate(levels):
        ax.label(i, 0, name, cls="sm bold", dy=18)
        if beta:
            ax.bars([(i, beta)], colour=colour, bw=64, opacity="0.7")
            ax.label(i, beta, f"{beta:.2f}", cls="sm", dy=-8)
        else:
            f.line(ax.px(i) - 32, ax.py(0) - 1, ax.px(i) + 32, ax.py(0) - 1, cls="",
                   stroke="var(--ink)", stroke_width="3")
            ax.label(i, 0, "base", cls="sm", dy=-10)
    return f


@figure("Interaction", "Two age groups' lines crossing, beside the dashed parallel "
        "line young drivers would follow with no interaction", width=WID)
def interaction() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 70, left=20, right=20, top=24, bottom=36)
    ax.frame(xlabel="territory", xticks=[], yticks=[], ylabel="frequency")
    ax.curve(lambda x: 30 + 3.6 * x, colour=AMBER, width=1.6, dash=True)
    ax.curve(lambda x: 14 + 3.6 * x, colour=BLUE, width=2.4)
    ax.curve(lambda x: 30 + 0.9 * x, colour=AMBER, width=2.4)
    ax.label(9.6, 14 + 3.6 * 9.6, "mature", cls="sm bold", anchor="end", dx=-8, dy=4)
    ax.label(9.6, 30 + 0.9 * 9.6, "young", cls="sm bold", anchor="end", dy=-8)
    ax.label(5.2, 30 + 3.6 * 5.2, "no interaction", cls="sm", anchor="end", dx=-8,
             dy=-6)
    return f


@figure("Control Variable", "Frequency against vehicle age for low- and high-mileage "
        "groups, each with a gentle slope, and the steeper dashed line pooling them "
        "without the mileage control", width=WID)
def control_variable() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 60, left=30, top=30, bottom=44)
    ax.frame(xlabel="vehicle age", xticks=[], yticks=[], ylabel="frequency")
    u = _rng(7)
    groups = ((14, BLUE), (34, AMBER))
    for b0, colour in groups:
        for k in range(7):
            x = 1.0 + k * 1.25 + (0 if colour is BLUE else 1.6)
            ax.point(x, b0 + 1.5 * x + (u() - 0.5) * 7, colour=colour, r=3)
        ax.curve(lambda x, b0=b0: b0 + 1.5 * x, colour=colour, width=1.8)
    ax.label(10.2, 20.8, "low mileage", cls="sm bold", anchor="end")
    ax.label(0.2, 29.8, "high mileage", cls="sm bold", anchor="start")
    ax.curve(lambda x: 6 + 4.4 * x, colour=ROSE, width=2.2, dash=True)
    ax.label(1.8, 7, "pooled", cls="sm bold", anchor="start")
    return f


@figure("Offset Variable", "Expected claims rising in a straight line through the "
        "origin as exposure grows from a quarter year to two years", width=WID)
def offset_variable() -> Fig:
    f = vcard()

    rows = [(0.25, 0.025), (0.5, 0.050), (1.0, 0.100), (2.0, 0.200)]
    ax = vaxes(f, 0, 2.3, 0, 0.235, left=30, top=30, bottom=44)
    ax.frame(xlabel="exposure (years)", xticks=[0, 1, 2], yticks=[],
             ylabel="expected claims")
    ax.curve(lambda e: 0.1 * e, colour=BLUE, width=2.4)
    for e, mu in rows:
        ax.point(e, mu, colour=BLUE, r=3.6)
        ax.label(e, mu, f"{mu:.3f}", cls="sm", dy=-9, dx=-4, anchor="end")
    return f


@figure("Multicollinearity", "Vehicle value against vehicle age: the points fall along "
        "a tight downward band, so the two predictors carry the same information",
        width=WID)
def multicollinearity() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 10, left=30, top=30, bottom=44)
    ax.frame(xlabel="vehicle age", xticks=[], yticks=[], ylabel="vehicle value")
    cx, cy = ax.p(5, 4.85)
    angle = math.degrees(math.atan2(ax.py(0) - ax.py(0.95), ax.px(1) - ax.px(0)))
    f.ellipse(cx, cy, (ax.px(10) - ax.px(0)) * 0.6, 24, fill=ROSE, fill_opacity="0.08",
              stroke=ROSE, stroke_width="1.4", stroke_dasharray="4 3",
              transform=f"rotate({angle:.1f} {cx:.1f} {cy:.1f})")
    u = _rng(515)
    for _ in range(26):
        x = u() * 9.4 + 0.3
        ax.point(x, max(0.3, min(9.7, 9.6 - 0.95 * x + (u() - 0.5) * 1.5)),
                 colour=BLUE, r=3.2)
    return f


# ── evaluating the model ─────────────────────────────────────────────────────

@figure("AIC", "The AIC curve over model size, bottoming out at four parameters where "
        "better fit stops paying for its parameters", width=WID)
def aic() -> Fig:
    f = vcard()

    ax = vaxes(f, 0.4, 7.6, 4080, 4180, left=46, top=30, bottom=44)
    ax.frame(xlabel="parameters p", xticks=[1, 3, 5, 7],
             xfmt=lambda t: f"{t:.0f}", yticks=[4100, 4150],
             yfmt=lambda v: f"{v:,.0f}", ylabel="AIC")
    vals = {1: 4172, 2: 4131, 3: 4102, 4: 4085, 5: 4089, 6: 4096, 7: 4108}
    ax.polyline(sorted(vals.items()), colour=BLUE, width=2.4)
    for p_, v in sorted(vals.items()):
        ax.point(p_, v, colour=BLUE, r=3.2)
    ax.point(4, vals[4], colour=ROSE, r=5)
    ax.label(4, vals[4], "best AIC", cls="sm bold", fill=ROSE, dy=20)
    return f


@figure("BIC", "AIC and BIC curves over model size: BIC's heavier penalty per "
        "parameter puts its minimum at a smaller model than AIC's", width=WID)
def bic() -> Fig:
    f = vcard()

    fit = {1: 4170, 2: 4127, 3: 4088, 4: 4084, 5: 4083, 6: 4082.5, 7: 4082}
    ax = vaxes(f, 0.4, 7.6, 4080, 4190, left=30, top=30, bottom=44)
    ax.frame(xlabel="parameters p", xticks=[1, 3, 5, 7], xfmt=lambda t: f"{t:.0f}",
             yticks=[])
    for colour, per, name in ((BLUE, 2.0, "AIC"), (ROSE, math.log(500), "BIC")):
        vals = sorted((p_, v + per * p_) for p_, v in fit.items())
        ax.polyline(vals, colour=colour, width=2.4)
        best = min(vals, key=lambda pv: pv[1])
        for p_, v in vals:
            ax.point(p_, v, colour=colour, r=5 if (p_, v) == best else 2.8)
        ax.label(7, vals[-1][1], name, cls="sm bold", dx=10, dy=4, anchor="start")
        f.line(ax.px(best[0]), ax.py(best[1]) + 7, ax.px(best[0]), ax.y1, cls="thin dash",
               stroke=colour, stroke_width="1.2")
    return f


@figure("Deviance", "Three model levels on a deviance scale: the saturated model at "
        "zero, the fitted model's deviance D above it, and the null model higher still",
        width=WID)
def deviance() -> Fig:
    f = vcard()

    levels = [("saturated model", 0.0, GREEN), ("fitted model", 30.8, BLUE),
              ("null model", 45.2, "var(--dim)")]
    ax = vaxes(f, 0, 10, -4, 52, left=30, top=30, bottom=36)
    ax.frame(xticks=[], yticks=[0, 20, 40], ylabel="deviance")
    for name, d, colour in levels:
        f.line(ax.px(0.6), ax.py(d), ax.px(9.4), ax.py(d), cls="thin",
               stroke=colour, stroke_width="2.4")
        f.text(ax.px(0.8), ax.py(d) - 8, name, cls="sm bold", anchor="start")
    f.arrow(ax.px(7), ax.py(0) - 2, ax.px(7), ax.py(30.8) + 2, colour=BLUE, width=2)
    f.text(ax.px(7) + 8, (ax.py(0) + ax.py(30.8)) / 2 + 4, "D", cls="bold",
           anchor="start")
    f.arrow(ax.px(7), ax.py(45.2) + 2, ax.px(7), ax.py(30.8) + 3, colour=ROSE,
            width=1.6)
    f.text(ax.px(7) + 8, (ax.py(45.2) + ax.py(30.8)) / 2 + 4, "ΔD", cls="sm bold",
           anchor="start")
    return f


@figure("R-Squared", "The total sum of squares split into the part the model explains "
        "and the part it does not", width=WID)
def r_squared() -> Fig:
    f = vcard()

    x0, w = BX0 + 40, 240
    f.text(BCX, BY0 + 30, "SS_Tot = 1,000", cls="bold")
    f.rect(x0, BY0 + 44, w, 46, rx=6, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    f.rect(x0, BY0 + 44, w * 0.68, 46, rx=6, fill=BLUE, fill_opacity="0.55")
    f.text(x0 + w * 0.34, BY0 + 73, "SS_Reg = 680", cls="sm bold")
    f.text(x0 + w * 0.84, BY0 + 73, "RSS = 320", cls="sm")

    ax = vaxes(f, 0, 10, 0, 60, left=46, top=150, bottom=48)
    ax.frame(xticks=[], yticks=[])
    fit = lambda x: 16 + 3.1 * x
    pts = [(0.9, 22), (2.1, 20), (3.0, 30), (4.2, 26), (5.1, 36), (6.0, 32),
           (7.2, 44), (8.1, 38), (9.1, 47)]
    ax.curve(fit, colour=BLUE, width=2.2)
    ax.hline(31.7, colour="var(--dim)", dash=True)
    ax.label(0.6, 31.7, "ȳ", cls="sm dim", dy=-6, anchor="start")
    for x, y in pts:
        ax.point(x, y, colour=BLUE, r=3.2)
    f.text(BCX, BY1 - 8, "R² = 680 / 1,000 = 0.68", cls="bold")
    return f


@figure("Residual Sum of Squares", "Squared residuals as literal squares hung off the "
        "fitted line", width=WID)
def residual_sum_of_squares() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 62, left=46, top=48, bottom=48)
    ax.frame(xlabel="x", xticks=[], yticks=[], ylabel="y")
    fit = lambda x: 16 + 3.4 * x
    pts = [(1.4, 30), (3.2, 21), (5.0, 40), (6.8, 30), (8.4, 52)]
    ax.curve(fit, colour=BLUE, width=2.2)
    for x, y in pts:
        yf = fit(x)
        side = abs(ax.py(y) - ax.py(yf))
        left = ax.px(x) if y > yf else ax.px(x) - side
        top = min(ax.py(y), ax.py(yf))
        f.rect(left, top, side, side, fill=ROSE, fill_opacity="0.18", stroke=ROSE,
               stroke_width="1.1")
        ax.point(x, y, colour=BLUE, r=3.4)
    f.text(BX0 + 12, BY1 - 8, "each square is one residual, squared", cls="sm dim",
           anchor="start")
    return f


@figure("ANOVA", "The analysis-of-variance table as a split of the total sum of "
        "squares", width=WID)
def anova() -> Fig:
    f = vcard()

    x0, w = BX0 + 22, 276
    rows = [("Source", "SS", "df", "MS", True),
            ("Regression", "680", "2", "340", False),
            ("Residual", "320", "47", "6.8", False),
            ("Total", "1,000", "49", "", False)]
    for i, (a, b, c, d, head) in enumerate(rows):
        y = BY0 + 30 + i * 40
        if head:
            f.rect(x0, y, w, 34, rx=6, fill="var(--soft)", stroke="var(--edge)",
                   stroke_width="1")
        else:
            f.line(x0, y + 34, x0 + w, y + 34, cls="rule")
        cls = "sm bold" if head else "sm"
        f.text(x0 + 12, y + 22, a, cls=cls, anchor="start")
        for j, cell in enumerate((b, c, d)):
            f.text(x0 + 138 + j * 48, y + 22, cell, cls=cls, anchor="middle")

    f.box(BX0 + 46, BY0 + 210, 228, 52, label="F = 340 / 6.8 = 50.0", colour=ROSE,
          sub="p < 0.001 — the model beats the mean", label_cls="bold")
    f.text(BCX, BY0 + 288, "for nested GLMs the same table holds", cls="sm dim")
    f.text(BCX, BY0 + 306, "deviances in place of sums of squares", cls="sm dim")
    return f


@figure("Parameter Estimate Tables", "A GLM coefficient table read as multiplicative "
        "rating relativities", width=WID)
def parameter_estimate_tables() -> Fig:
    f = vcard()

    x0, w = BX0 + 8, 304
    cols = (10, 118, 168, 214, 262)
    rows = [("term", "β̂", "SE", "p", "e^β̂", True, None),
            ("intercept", "−2.30", "0.06", "<.001", "0.100", False, None),
            ("urban", "0.26", "0.08", "0.001", "1.30", False, GREEN),
            ("young driver", "0.41", "0.09", "<.001", "1.51", False, GREEN),
            ("prior claim", "0.18", "0.10", "0.069", "1.20", False, AMBER)]
    for i, (a, b, c, d, e, head, mark) in enumerate(rows):
        y = BY0 + 34 + i * 46
        if head:
            f.rect(x0, y, w, 36, rx=6, fill="var(--soft)", stroke="var(--edge)",
                   stroke_width="1")
        else:
            f.line(x0, y + 36, x0 + w, y + 36, cls="rule")
        cls = "sm bold" if head else "sm"
        f.text(x0 + cols[0], y + 23, a, cls=cls, anchor="start")
        for j, cell in enumerate((b, c, d, e)):
            colour = mark if (mark and j == 2) else None
            f.text(x0 + cols[j + 1], y + 23, cell,
                   cls="sm bold" if (head or colour) else "sm",
                   anchor="middle", fill=colour)
    f.text(BCX, BY1 - 26, "e^0.26 = 1.30 → urban risks 30% more often",
           cls="sm dim")
    f.text(BCX, BY1 - 8, "p = 0.069 → prior claim is not significant at 5%",
           cls="sm dim")
    return f


@figure("Variable Selection", "A stepwise path through candidate models, scored by "
        "AIC", width=WID)
def variable_selection() -> Fig:
    f = vcard()

    steps = [("intercept only", 4172, False),
             ("+ territory", 4131, False),
             ("+ vehicle age", 4102, False),
             ("+ driver age", 4085, True),
             ("+ prior claim", 4089, False)]
    for i, (name, aic_, best) in enumerate(steps):
        y = BY0 + 28 + i * 58
        colour = GREEN if best else ("var(--dim)" if i == 4 else BLUE)
        f.box(BX0 + 14, y, 208, 44, label=name, colour=colour, label_cls="sm bold")
        f.text(BX1 - 12, y + 28, f"{aic_:,}", cls="sm bold" if best else "sm",
               anchor="end", fill=colour if best else None)
        if i < 4:
            f.arrow(BX0 + 118, y + 46, BX0 + 118, y + 56, colour="var(--dim)",
                    width=1.2)
    f.text(BX1 - 12, BY0 + 18, "AIC", cls="sm dim", anchor="end")
    f.text(BCX, BY1 - 8, "stop where AIC turns back up", cls="sm dim")
    return f


@figure("Cross-Validation", "Five folds, each held out in turn, and the error curve "
        "that results", width=WID)
def cross_validation() -> Fig:
    f = vcard()

    x0, w = BX0 + 34, 264
    for i in range(5):
        y = BY0 + 28 + i * 30
        for j in range(5):
            held = j == i
            f.rect(x0 + j * (w / 5) + 2, y, w / 5 - 4, 22, rx=4,
                   fill=ROSE if held else BLUE, fill_opacity="0.6" if held else "0.22",
                   stroke="none")
        f.text(x0 - 8, y + 16, f"fit {i + 1}", cls="sm dim", anchor="end")
    f.legend(BX0 + 34, BY0 + 190, [(ROSE, "held out"), (BLUE, "trained on")], gap=16)

    ax = Axes(f, BX0 + 60, BY0 + 232, BX1 - 24, BY1 - 32, 0.6, 5.4, 280, 560)
    ax.frame(xticks=[1, 2, 3, 4, 5], xfmt=lambda t: f"{t:.0f}", yticks=[])
    ax.polyline([(1, 530), (2, 430), (3, 395), (4, 415), (5, 470)], colour=ROSE,
                width=2.2)
    ax.polyline([(1, 520), (2, 410), (3, 350), (4, 320), (5, 305)], colour=BLUE,
                width=2, dash=True)
    ax.point(3, 395, colour=ROSE, r=4)
    ax.label(3, 395, "best", cls="sm bold", fill=ROSE, dy=-10)
    ax.label(4.7, 320, "training", cls="sm", fill=BLUE, anchor="end", dy=-6)
    return f


@figure("Bias-Variance Tradeoff", "Test error as a U-curve over model complexity, "
        "with training error falling past it", width=WID)
def bias_variance_tradeoff() -> Fig:
    f = vcard()

    ax = vaxes(f, 0.6, 9.4, 0, 62, left=46, top=52, bottom=52)
    ax.frame(xlabel="model complexity", xticks=[], yticks=[], ylabel="error")
    bias2 = lambda c: 44 * math.exp(-0.55 * c)
    var = lambda c: 1.4 * math.exp(0.34 * c)
    ax.curve(lambda c: bias2(c) + var(c) + 8, colour=ROSE, width=2.6)
    ax.curve(bias2, colour=BLUE, width=1.8, dash=True)
    ax.curve(var, colour=AMBER, width=1.8, dash=True)
    ax.hline(8, colour="var(--dim)", dash=True)
    ax.label(8.9, 10.6, "irreducible σ²", cls="sm dim", anchor="end")
    ax.label(2.2, 30, "bias²", cls="sm", fill=BLUE, anchor="start")
    ax.label(8.4, 30, "variance", cls="sm", fill=AMBER, anchor="end")
    best = min(range(10, 90), key=lambda c: bias2(c / 10) + var(c / 10))
    ax.point(best / 10, bias2(best / 10) + var(best / 10) + 8, colour=ROSE, r=4.4)
    ax.label(best / 10, bias2(best / 10) + var(best / 10) + 8, "test error",
             cls="sm bold", fill=ROSE, dy=-12)
    f.text(BX0 + 12, BY1 - 8, "underfit ← → overfit", cls="sm dim", anchor="start")
    return f


# ── diagnostic plots ─────────────────────────────────────────────────────────

@figure("Residual Plot", "A healthy residual band beside a funnel that fails the "
        "constant-variance assumption", width=WID)
def residual_plot() -> Fig:
    f = vcard()

    for i, (title, fan, colour) in enumerate((("healthy", False, GREEN),
                                              ("variance grows", True, ROSE))):
        py = BY0 + 34 + i * 152
        ax = Axes(f, BX0 + 44, py, BX1 - 20, py + 108, 0, 10, -1.15, 1.15)
        f.text(BX0 + 44, py - 8, title, cls="sm bold", fill=colour, anchor="start")
        ax.frame(xticks=[], yticks=[0], yfmt=lambda v: "0", arrows=False)
        u = _rng(61 + i * 29)
        for k in range(26):
            x = 0.4 + u() * 9.2
            scale = (0.25 + 0.085 * x) if fan else 0.62
            ax.point(x, max(-1.1, min(1.1, (u() - 0.5) * 2 * scale)), colour=colour,
                     r=2.8)
        if fan:
            ax.curve(lambda x: 0.28 + 0.088 * x, colour=colour, width=1.3, dash=True)
            ax.curve(lambda x: -(0.28 + 0.088 * x), colour=colour, width=1.3,
                     dash=True)
    f.text(BX0 + 12, BY1 - 8, "fitted values →", cls="sm dim", anchor="start")
    return f


@figure("QQ Plot", "Sample quantiles against theoretical ones, straight for a good "
        "fit and bending in a heavy tail", width=WID)
def qq_plot() -> Fig:
    f = vcard()

    ax = vaxes(f, -2.6, 2.6, -3.4, 3.4, left=44, top=44, bottom=52)
    ax.frame(xlabel="theoretical quantile", xticks=[-2, 0, 2], yticks=[-2, 0, 2],
             ylabel="sample quantile")
    ax.curve(lambda x: x, colour="var(--dim)", width=1.6, dash=True)
    n = 21
    for i in range(1, n + 1):
        q = -2.4 + 4.8 * (i - 0.5) / n
        y = q + 0.36 * q ** 3 / 4.4
        ax.point(q, y, colour=BLUE, r=3)
    ax.label(1.4, 3.1, "heavy right tail", cls="sm", fill=BLUE, anchor="end")
    ax.label(-1.55, -3.1, "heavy left tail", cls="sm", fill=BLUE, anchor="start")
    f.text(BX0 + 12, BY1 - 8, "S-shape → tails fatter than assumed", cls="sm dim",
           anchor="start")
    return f


@figure("Marginal Model Plot", "Observed and fitted averages compared across the "
        "range of one predictor", width=WID)
def marginal_model_plot() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 60, left=46, top=48, bottom=52)
    ax.frame(xlabel="vehicle age", xticks=[], yticks=[], ylabel="frequency")
    obs = [(0.8, 20), (2.0, 24), (3.2, 31), (4.4, 40), (5.6, 46), (6.8, 47),
           (8.0, 44), (9.2, 38)]
    ax.polyline(obs, colour=BLUE, width=2.4)
    for x, y in obs:
        ax.point(x, y, colour=BLUE, r=3.2)
    ax.curve(lambda x: 19 + 3.0 * x, colour=ROSE, width=2.2, dash=True)
    ax.label(3.0, 45, "observed", cls="sm", fill=BLUE, anchor="start")
    ax.label(6.0, 19 + 3.0 * 6.0, "fitted", cls="sm", fill=ROSE, anchor="start",
             dy=18)
    f.text(BX0 + 12, BY1 - 8, "the gap at both ends: add a curved term",
           cls="sm dim", anchor="start")
    return f


@figure("Added Variable Plot", "The extra variable's slope, once both it and the "
        "response are stripped of the other predictors", width=WID)
def added_variable_plot() -> Fig:
    f = vcard()

    ax = vaxes(f, -3.4, 3.4, -3.4, 3.4, left=48, top=48, bottom=54)
    ax.frame(xlabel="x₄ | other predictors", xticks=[], yticks=[0],
             yfmt=lambda v: "0", ylabel="y | other predictors")
    u = _rng(909)
    for _ in range(24):
        x = (u() - 0.5) * 6
        ax.point(x, max(-3.2, min(3.2, 0.62 * x + (u() - 0.5) * 2.4)), colour=BLUE,
                 r=3)
    ax.curve(lambda x: 0.62 * x, colour=ROSE, width=2.2)
    ax.label(3.2, 0.62 * 3.2, "slope = β̂₄", cls="sm bold", fill=ROSE, dy=-12,
             anchor="end")
    f.text(BX0 + 12, BY1 - 8, "a flat cloud means the variable adds nothing",
           cls="sm dim", anchor="start")
    return f


# ── exploratory data analysis ────────────────────────────────────────────────

@figure("Exploratory Data Analysis", "Four exploratory views of the same data set",
        width=WID)
def exploratory_data_analysis() -> Fig:
    f = vcard()

    pw, ph = 138, 96
    slots = [(BX0 + 14, BY0 + 34, "histogram"), (BX0 + 172, BY0 + 34, "box plot"),
             (BX0 + 14, BY0 + 196, "scatter"), (BX0 + 172, BY0 + 196, "bar chart")]
    for (px, py, name), colour in zip(slots, (BLUE, AMBER, GREEN, VIOLET)):
        f.text(px + pw / 2, py - 8, name, cls="sm bold", fill=colour)
        f.line(px, py + ph, px + pw, py + ph, cls="axis")
        ax = Axes(f, px, py, px + pw, py + ph, 0, 10, 0, 1.12)
        if name == "histogram":
            hs = [0.22, 0.55, 0.95, 0.78, 0.5, 0.3, 0.16, 0.08]
            ax.bars([(0.9 + i * 1.1, h) for i, h in enumerate(hs)], colour=colour,
                    bw=13, opacity="0.65")
        elif name == "box plot":
            ymid = 0.5
            f.rect(ax.px(2.6), ax.py(ymid + 0.26), ax.px(6.4) - ax.px(2.6),
                   ax.py(ymid - 0.26) - ax.py(ymid + 0.26), rx=3, fill=colour,
                   fill_opacity="0.2", stroke=colour, stroke_width="1.4")
            f.line(ax.px(4.2), ax.py(ymid + 0.26), ax.px(4.2), ax.py(ymid - 0.26),
                   cls="", stroke=colour, stroke_width="2")
            f.line(ax.px(0.8), ax.py(ymid), ax.px(2.6), ax.py(ymid), cls="thin",
                   stroke=colour, stroke_width="1.4")
            f.line(ax.px(6.4), ax.py(ymid), ax.px(8.4), ax.py(ymid), cls="thin",
                   stroke=colour, stroke_width="1.4")
            f.circle(ax.px(9.4), ax.py(ymid), 3, fill=colour)
        elif name == "scatter":
            u = _rng(1234)
            for _ in range(18):
                x = u() * 9.6
                ax.point(x, min(1.05, 0.14 + 0.075 * x + (u() - 0.5) * 0.34),
                         colour=colour, r=2.6)
        else:
            ax.bars([(1.6, 0.9), (4.0, 0.62), (6.4, 0.34), (8.8, 0.12)],
                    colour=colour, bw=22, opacity="0.65")
    return f


@figure("Histogram", "Binned counts of a right-skewed variable with its density "
        "overlaid", width=WID)
def histogram() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 20, 0, 0.115, left=46, top=48, bottom=50)
    ax.frame(xlabel="claim size (000s)", xticks=[0, 5, 10, 15, 20], yticks=[],
             ylabel="density")
    dens = lambda x: _gammapdf(x, 1.9, 3.1)
    bars = [(1, 0.075), (3, 0.101), (5, 0.083), (7, 0.058), (9, 0.038),
            (11, 0.024), (13, 0.015), (15, 0.009), (17, 0.005), (19, 0.003)]
    ax.bars(bars, colour=BLUE, bw=27, opacity="0.55")
    ax.curve(dens, colour=AMBER, width=2.4)
    ax.label(11.6, 0.062, "fitted density", cls="sm", fill=AMBER, anchor="start")
    brace(f, ax.px(14), ax.px(16), ax.py(0.017), depth=6, colour="var(--dim)",
          label="bin width w", below=False, label_cls="sm dim")
    return f


@figure("Box Plot", "The five-number summary, the fences, and one outlier beyond "
        "them", width=WID)
def box_plot() -> Fig:
    f = vcard()

    q1, med, q3, lo, hi, out = 4, 7, 11, 2, 14, 40
    ax = vaxes(f, 0, 44, 0, 10, left=26, top=150, bottom=54)
    ax.frame(xlabel="claim size (000s)", xticks=[0, 10, 20, 30, 40],
             xfmt=lambda t: f"{t:.0f}", yticks=[])
    ycen, half = 6.4, 2.6
    f.rect(ax.px(q1), ax.py(ycen + half), ax.px(q3) - ax.px(q1),
           ax.py(ycen - half) - ax.py(ycen + half), rx=3, fill=BLUE,
           fill_opacity="0.18", stroke=BLUE, stroke_width="1.6")
    f.line(ax.px(med), ax.py(ycen + half), ax.px(med), ax.py(ycen - half), cls="",
           stroke=BLUE, stroke_width="2.6")
    for a, b in ((lo, q1), (q3, hi)):
        f.line(ax.px(a), ax.py(ycen), ax.px(b), ax.py(ycen), cls="thin", stroke=BLUE,
               stroke_width="1.6")
    for x in (lo, hi):
        f.line(ax.px(x), ax.py(ycen + 1.4), ax.px(x), ax.py(ycen - 1.4), cls="",
               stroke=BLUE, stroke_width="1.6")
    ax.point(out, ycen, colour=ROSE, r=4.6)
    ax.label(out, ycen, "outlier", cls="sm bold", fill=ROSE, dy=-14)
    ax.vline(21.5, colour=ROSE, y_top=9.6, label="fence 21.5", label_cls="sm",
             label_dy=-6)
    brace(f, ax.px(q1), ax.px(q3), ax.py(ycen + half) - 6, depth=7, colour=AMBER,
          label="IQR = 7", below=False, label_cls="sm")

    # The five numbers as a column, so three labels do not fight over 50 pixels.
    rows = [("minimum", lo), ("Q₁", q1), ("median", med), ("Q₃", q3),
            ("maximum (whisker)", hi)]
    for i, (name, v) in enumerate(rows):
        y = BY0 + 26 + i * 20
        f.text(BX0 + 96, y, name, cls="sm dim", anchor="end")
        f.text(BX0 + 108, y, str(v), cls="sm bold", anchor="start")
    f.text(BX0 + 150, BY0 + 66, "the box holds the middle 50%", cls="sm dim",
           anchor="start")
    f.text(BX0 + 150, BY0 + 86, "of the claims", cls="sm dim", anchor="start")
    return f


@figure("Univariate Plot", "The same sample seen three ways: histogram, box plot, "
        "empirical CDF", width=WID)
def univariate_plot() -> Fig:
    f = vcard()

    px, pw = BX0 + 44, BX1 - BX0 - 64
    dens = lambda x: _gammapdf(x, 1.9, 3.1)

    py = BY0 + 30
    f.text(px, py - 8, "histogram — shape", cls="sm bold", fill=BLUE, anchor="start")
    ax1 = Axes(f, px, py, px + pw, py + 74, 0, 20, 0, 0.115)
    f.line(px, py + 74, px + pw, py + 74, cls="axis")
    ax1.bars([(1, 0.075), (3, 0.101), (5, 0.083), (7, 0.058), (9, 0.038),
              (11, 0.024), (13, 0.015), (15, 0.009), (17, 0.005), (19, 0.003)],
             colour=BLUE, bw=23, opacity="0.55")

    py = BY0 + 140
    f.text(px, py - 8, "box plot — outliers", cls="sm bold", fill=AMBER,
           anchor="start")
    ax2 = Axes(f, px, py, px + pw, py + 46, 0, 20, 0, 1)
    f.line(px, py + 46, px + pw, py + 46, cls="axis")
    f.rect(ax2.px(3.4), ax2.py(0.86), ax2.px(8.4) - ax2.px(3.4),
           ax2.py(0.24) - ax2.py(0.86), rx=3, fill=AMBER, fill_opacity="0.2",
           stroke=AMBER, stroke_width="1.4")
    f.line(ax2.px(5.4), ax2.py(0.86), ax2.px(5.4), ax2.py(0.24), cls="",
           stroke=AMBER, stroke_width="2.2")
    f.line(ax2.px(0.7), ax2.py(0.55), ax2.px(3.4), ax2.py(0.55), cls="thin",
           stroke=AMBER, stroke_width="1.4")
    f.line(ax2.px(8.4), ax2.py(0.55), ax2.px(14.5), ax2.py(0.55), cls="thin",
           stroke=AMBER, stroke_width="1.4")
    f.circle(ax2.px(17.6), ax2.py(0.55), 3.4, fill=ROSE)

    py = BY0 + 232
    f.text(px, py - 8, "empirical CDF — quantiles", cls="sm bold", fill=GREEN,
           anchor="start")
    ax3 = Axes(f, px, py, px + pw, py + 74, 0, 20, 0, 1.05)
    ax3.frame(xticks=[0, 5, 10, 15, 20], yticks=[0, 1], yfmt=lambda v: f"{v:g}")
    cdf = 0.0
    pts = [(0.0, 0.0)]
    for x in range(1, 21):
        cdf += dens(x) * 1.0
        pts.append((x, min(1.0, cdf)))
    ax3.polyline(pts, colour=GREEN, width=2.2)
    return f


@figure("Scatter Plot", "A curved relationship that a correlation of zero would "
        "hide", width=WID)
def scatter_plot() -> Fig:
    f = vcard()

    ax = vaxes(f, 16, 84, 0, 100, left=48, top=48, bottom=52)
    ax.frame(xlabel="driver age", xticks=[20, 40, 60, 80],
             xfmt=lambda t: f"{t:.0f}", yticks=[], ylabel="pure premium")
    u = _rng(3131)
    curve = lambda a: 20 + 0.038 * (a - 46) ** 2
    for _ in range(30):
        a = 18 + u() * 64
        ax.point(a, max(4, min(96, curve(a) + (u() - 0.5) * 26)), colour=BLUE, r=3)
    ax.curve(curve, colour=ROSE, width=2.2, dash=True)
    ax.label(50, 88, "r = −0.04", cls="sm bold", fill=ROSE)
    f.text(BX0 + 12, BY1 - 8, "band the variable or add a squared term",
           cls="sm dim", anchor="start")
    return f


@figure("Correlation", "Three scatter clouds at correlations of +0.9, 0 and −0.9",
        width=WID)
def correlation() -> Fig:
    f = vcard()

    for i, (r, colour) in enumerate(((0.9, GREEN), (0.0, "var(--dim)"), (-0.9, ROSE))):
        py = BY0 + 34 + i * 104
        ax = Axes(f, BX0 + 54, py, BX1 - 26, py + 74, -3, 3, -3, 3)
        f.line(BX0 + 54, py + 74, BX1 - 26, py + 74, cls="axis")
        f.line(BX0 + 54, py, BX0 + 54, py + 74, cls="axis")
        f.text(BX0 + 46, py + 40, f"ρ = {r:+.1f}".replace("+0.0", "0.0"), cls="sm bold",
               anchor="end", fill=colour)
        for x, z in _normals(41 + i * 17, 22):
            y = r * x + math.sqrt(max(0.0, 1 - r * r)) * z
            ax.point(max(-2.8, min(2.8, x * 1.3)), max(-2.8, min(2.8, y * 1.3)),
                     colour=colour, r=2.6)
    return f
