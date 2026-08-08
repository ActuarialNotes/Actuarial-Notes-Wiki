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

@figure("Stochastic Processes", "Three sample paths of a counting process over the "
        "same time axis", width=WID)
def stochastic_processes() -> Fig:
    f = vcard("A process is a whole family of paths",
              ["{ X(t) : t ≥ 0 }", "one path per outcome ω"])

    ax = vaxes(f, 0, 10, 0, 7, left=40, top=26, bottom=44)
    ax.frame(xlabel="time t", xticks=[0, 2, 4, 6, 8, 10], yticks=[0, 2, 4, 6])
    paths = [
        ([0.6, 1.5, 3.4, 5.0, 6.1, 8.2], BLUE),
        ([1.2, 2.0, 2.6, 4.8, 7.4], AMBER),
        ([0.9, 3.1, 4.2, 4.9, 6.6, 7.8, 9.1], GREEN),
    ]
    for jumps, colour in paths:
        pts = [(0.0, 0.0)]
        n = 0
        for t in jumps:
            pts.append((t, n))
            n += 1
            pts.append((t, n))
        pts.append((10.0, n))
        ax.polyline(pts, colour=colour, width=1.8)
    return f


@figure("Poisson Process", "A Poisson counting path with exponential gaps between "
        "jumps", width=WID)
def poisson_process() -> Fig:
    f = vcard("Counts by time t are Poisson(λt)",
              ["N(t) ~ Poi(λt)", "E[N(t)] = Var(N(t)) = λt"])

    ax = vaxes(f, 0, 3, 0, 8, left=40, top=36, bottom=40)
    ax.frame(xlabel="months", xticks=[0, 1, 2, 3], yticks=[0, 2, 4, 6, 8])
    jumps = [0.18, 0.42, 0.71, 1.05, 1.36, 1.9, 2.44]
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
        f.line(ax.px(t), ax.py(0), ax.px(t), ax.py(0.28), cls="", stroke=AMBER,
               stroke_width="1.4")
    brace(f, ax.px(jumps[4]), ax.px(jumps[5]), ax.py(1.4), depth=6, colour=AMBER,
          label="T ~ Exp(λ)", below=False, label_cls="sm")
    f.text(BCX, BY0 + 20, "λ = 4 claims per month", cls="sm dim")
    return f


@figure("Nonhomogeneous Poisson Process", "A time-varying intensity with the "
        "integrated rate shaded", width=WID)
def nonhomogeneous_poisson_process() -> Fig:
    f = vcard("A rate that changes with time",
              ["m(t) = ∫₀ᵗ λ(u) du", "N(b) − N(a) ~ Poi(m(b) − m(a))"])

    ax = vaxes(f, 0, 6, 0, 16, left=42, top=34, bottom=44)
    ax.frame(xlabel="month t", xticks=[0, 2, 4, 6], yticks=[0, 5, 10, 15],
             ylabel="λ(t)")
    rate = lambda t: 3 + 2 * t
    ax.area(rate, 0, 4, colour=BLUE, opacity="0.18")
    ax.curve(rate, colour=BLUE, width=2.2)
    ax.vline(4, colour=BLUE, y_top=rate(4))
    ax.label(2.0, 5.0, "m(4) = 28", cls="bold", dy=4)
    ax.label(5.1, 14.6, "λ(t) = 3 + 2t", cls="sm", fill=BLUE, anchor="end")
    return f


@figure("Compound Poisson Process", "Aggregate losses as a staircase of randomly "
        "sized jumps", width=WID)
def compound_poisson_process() -> Fig:
    f = vcard("A random number of random-sized claims",
              ["S(t) = X₁ + ⋯ + X_N(t)", "E[S] = λt·E[X],  Var(S) = λt·E[X²]"])

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
    for t, size in jumps[:3]:
        f.arrow(ax.px(t) - 13, ax.py(running + size / 2), ax.px(t) - 13,
                ax.py(running), colour=AMBER, width=1.3)
        f.text(ax.px(t) - 17, ax.py(running + size / 2) - 2, "Xᵢ", cls="sm",
               anchor="end", fill=AMBER)
        running += size
    return f


@figure("Mixed Poisson Process", "A random rate across risks widening the count "
        "distribution", width=WID)
def mixed_poisson_process() -> Fig:
    f = vcard("Each risk carries its own rate Λ",
              ["N | Λ ~ Poi(Λt)", "Var(N) = t·E[Λ] + t²·Var(Λ) > E[N]"])

    ax1 = Axes(f, BX0 + 44, BY0 + 16, BX1 - 16, BY0 + 118, 0, 0.6, 0, 5)
    ax1.frame(xticks=[0, 0.2, 0.4, 0.6], yticks=[])
    ax1.curve(lambda x: _gammapdf(x, 1.0, 0.2), colour=VIOLET, width=2.2)
    ax1.label(0.42, 3.4, "Λ varies by risk", cls="sm", fill=VIOLET)
    f.text(BX0 + 44, BY0 + 10, "mixing distribution of Λ", cls="sm dim", anchor="start")

    ax2 = Axes(f, BX0 + 44, BY0 + 168, BX1 - 16, BY1 - 40, 0, 5, 0, 0.85)
    ax2.frame(xlabel="claims in a year", xticks=[0, 1, 2, 3, 4, 5], yticks=[])
    ax2.bars([(k, _poispmf(k, 0.2)) for k in range(6)], colour=BLUE, bw=13,
             opacity="0.75")
    nb = [0.836, 0.139, 0.021, 0.003, 0.0005, 0.0001]
    ax2.bars([(k + 0.32, p) for k, p in enumerate(nb)], colour=ROSE, bw=13,
             opacity="0.75")
    f.legend(BX0 + 150, BY0 + 186, [(BLUE, "single Poisson"),
                                    (ROSE, "mixed (negative binomial)")], gap=15)
    return f


@figure("Interarrival Time", "Exponential gaps between arrivals, drawn against the "
        "waiting-time density", width=WID)
def interarrival_time() -> Fig:
    f = vcard("Gaps between arrivals are exponential",
              ["Tᵢ ~ Exp(λ),  E[T] = 1/λ", "Sₙ = T₁ + ⋯ + Tₙ ~ Gamma(n, λ)"])

    y = BY0 + 42
    xs = [BX0 + 20, BX0 + 74, BX0 + 116, BX0 + 196, BX0 + 234, BX0 + 292]
    f.arrow(BX0 + 8, y, BX1 - 6, y, colour="var(--axis)", width=1.2)
    for i, x in enumerate(xs):
        f.line(x, y - 6, x, y + 6, cls="tick")
        f.circle(x, y, 3.4, fill=BLUE)
        f.text(x, y - 12, f"S{'₁₂₃₄₅₆'[i]}", cls="sm dim")
    for i in range(3):
        brace(f, xs[i], xs[i + 1], y + 9, depth=6, colour=AMBER,
              label=f"T{'₁₂₃'[i]}", label_cls="sm")

    ax = Axes(f, BX0 + 44, BY0 + 130, BX1 - 16, BY1 - 42, 0, 1.2, 0, 4.4)
    ax.frame(xlabel="waiting time (months)", xticks=[0, 0.25, 0.5, 0.75, 1.0],
             xfmt=lambda t: f"{t:g}", yticks=[])
    ax.area(lambda x: 4 * math.exp(-4 * x), 0, 1.2, colour=AMBER, opacity="0.16")
    ax.curve(lambda x: 4 * math.exp(-4 * x), colour=AMBER, width=2.2)
    ax.vline(0.25, colour=AMBER, y_top=4 * math.exp(-1), label="mean 1/λ")
    return f


@figure("Survival Model", "A survival function falling from one, with the "
        "probability of surviving past t marked", width=WID)
def survival_model() -> Fig:
    f = vcard("S(t) is the chance of lasting past t",
              ["S(t) = P(T > t) = 1 − F(t)", "S(0) = 1,  S(∞) = 0"])

    ax = vaxes(f, 0, 100, 0, 1.05, left=44, top=30, bottom=46)
    ax.frame(xlabel="age t", xticks=[0, 25, 50, 75, 100], yticks=[0, 0.5, 1.0],
             ylabel="S(t)")
    surv = lambda t: math.exp(-((t / 82) ** 4.5))
    ax.area(surv, 60, 100, colour=BLUE, opacity="0.14")
    ax.curve(surv, colour=BLUE, width=2.4)
    ax.vline(60, colour=BLUE, y_top=surv(60))
    ax.hline(surv(60), colour=BLUE, x_to=60, label="")
    ax.point(60, surv(60), colour=BLUE, r=3.6)
    ax.label(60, surv(60), "S(60) = 0.75", cls="sm bold", dy=-10, dx=22)
    ax.label(84, 0.16, "P(T > 60)", cls="sm", fill=BLUE)
    return f


@figure("Hazard Rate", "The bathtub hazard curve beside the survival function it "
        "generates", width=WID)
def hazard_rate() -> Fig:
    f = vcard("Hazard is the failure rate given survival",
              ["h(t) = f(t) / S(t)", "S(t) = exp{ −∫₀ᵗ h(u) du }"])

    ax1 = Axes(f, BX0 + 46, BY0 + 22, BX1 - 16, BY0 + 150, 0, 100, 0, 0.1)
    ax1.frame(xticks=[0, 25, 50, 75, 100], yticks=[], ylabel="h(t)")
    haz = lambda t: 0.03 * math.exp(-t / 6) + 0.004 + 0.00000004 * t ** 3
    ax1.curve(haz, colour=ROSE, width=2.4)
    ax1.label(14, 0.062, "infant", cls="sm dim")
    ax1.label(50, 0.026, "useful life", cls="sm dim")
    ax1.label(88, 0.072, "wear-out", cls="sm dim")

    ax2 = Axes(f, BX0 + 46, BY0 + 190, BX1 - 16, BY1 - 40, 0, 100, 0, 1.05)
    ax2.frame(xlabel="age t", xticks=[0, 25, 50, 75, 100], yticks=[0, 1],
              ylabel="S(t)")
    ax2.curve(lambda t: math.exp(-(0.18 * (1 - math.exp(-t / 6))
                                   + 0.004 * t + 0.00000001 * t ** 4)),
              colour=BLUE, width=2.4)
    return f


@figure("Life Table", "The ℓx column falling with age and the deaths dx between "
        "ages", width=WID)
def life_table() -> Fig:
    f = vcard("ℓx survivors, dx deaths in the year",
              ["ₜpₓ = ℓ₍ₓ₊ₜ₎ / ℓₓ", "dₓ = ℓₓ − ℓ₍ₓ₊₁₎"])

    ages = [60, 61, 62, 63, 64]
    ell = [8000, 7840, 7650, 7430, 7170]
    ax = vaxes(f, 59.7, 64.3, 6950, 8250, left=54, top=42, bottom=48)
    ax.frame(xlabel="age x", xticks=ages, xfmt=lambda t: f"{t:.0f}",
             yticks=[7000, 7500, 8000], yfmt=lambda v: f"{v:,.0f}", ylabel="ℓx")
    ax.polyline(list(zip(ages, ell)), colour=BLUE, width=2.2)
    for x, v in zip(ages, ell):
        ax.point(x, v, colour=BLUE, r=3.4)
        ax.label(x, v, f"{v:,}", cls="sm", dy=17)
    for i, (top, bot) in enumerate(zip(ell, ell[1:])):
        px = ax.px(ages[i + 1])
        f.arrow(px, ax.py(top), px, ax.py(bot) + 3, colour=ROSE, width=1.5)
        if i == 0:
            f.text(px + 6, (ax.py(top) + ax.py(bot)) / 2 + 4,
                   f"dₓ = {top - bot}", cls="sm", anchor="start", fill=ROSE)
    return f


@figure("Joint Life", "Joint-life and last-survivor status curves either side of the "
        "two single lives", width=WID)
def joint_life() -> Fig:
    f = vcard("Two lives, two statuses",
              ["ₜp_xy = ₜpₓ · ₜp_y   (joint life)",
               "ₜp_x̄y = ₜpₓ + ₜp_y − ₜpₓ·ₜp_y   (last survivor)"])

    ax = vaxes(f, 0, 30, 0, 1.05, left=44, top=34, bottom=48)
    ax.frame(xlabel="years t", xticks=[0, 10, 20, 30], yticks=[0, 0.5, 1.0])
    px = lambda t: math.exp(-((t / 26) ** 2.2))
    py = lambda t: math.exp(-((t / 30) ** 2.2))
    ax.curve(lambda t: px(t) * py(t), colour=ROSE, width=2.4)
    ax.curve(px, colour=BLUE, width=1.6, dash=True)
    ax.curve(py, colour=AMBER, width=1.6, dash=True)
    ax.curve(lambda t: px(t) + py(t) - px(t) * py(t), colour=GREEN, width=2.4)
    ax.label(9.5, 0.30, "joint life (xy)", cls="sm", fill=ROSE)
    ax.label(22.5, 0.72, "last survivor", cls="sm", fill=GREEN, anchor="end")
    ax.label(29, 0.30, "(x)", cls="sm", fill=BLUE)
    ax.label(29, 0.44, "(y)", cls="sm", fill=AMBER)
    return f


@figure("Whole Life Insurance", "A death benefit of 1 discounted from the year of "
        "death back to issue", width=WID)
def whole_life_insurance() -> Fig:
    f = vcard("Pay 1 at the end of the year of death",
              ["Aₓ = Σ vᵏ⁺¹ · ₖ|qₓ", "= E[ v^(K+1) ]"])

    y = BY0 + 96
    n = 6
    x0, x1 = BX0 + 26, BX1 - 26
    xs = [x0 + (x1 - x0) * k / n for k in range(n + 1)]
    f.arrow(x0 - 10, y, x1 + 16, y, colour="var(--axis)", width=1.2)
    for k, x in enumerate(xs):
        f.line(x, y - 4, x, y + 4, cls="tick")
        f.text(x, y + 18, str(k) if k < n else "…", cls="sm dim")
    f.text(x0, y - 34, "issue", cls="sm dim")

    death = xs[4]
    f.circle(death, y, 4.6, fill=ROSE)
    f.text(death, y + 36, "death in year 4", cls="sm", fill=ROSE)
    f.arrow(death, y - 12, death, y - 58, colour=ROSE, width=1.8)
    f.text(death, y - 64, "1", cls="bold", fill=ROSE)
    f.arrow(death - 6, y - 74, x0 + 4, y - 74, colour=BLUE, width=1.5, dash=True)
    f.text((x0 + death) / 2, y - 80, "discount v⁴", cls="sm", fill=BLUE)

    ax = Axes(f, BX0 + 46, BY0 + 190, BX1 - 20, BY1 - 40, -0.5, 5.5, 0, 0.3)
    ax.frame(xlabel="year of death k", xticks=[0, 1, 2, 3, 4, 5], yticks=[])
    ax.bars([(k, p) for k, p in enumerate([0.05, 0.07, 0.10, 0.14, 0.19, 0.24])],
            colour=ROSE, bw=22, opacity="0.6")
    f.text(BX0 + 46, BY0 + 184, "probability of dying in year k", cls="sm dim",
           anchor="start")
    return f


@figure("Life Annuity", "Annual payments continuing only while the annuitant is "
        "alive", width=WID)
def life_annuity() -> Fig:
    f = vcard("Pay 1 a year while (x) is alive",
              ["äₓ = Σ vᵏ · ₖpₓ", "aₓ = äₓ − 1"])

    y = BCY + 46
    n = 6
    x0, x1 = BX0 + 26, BX1 - 30
    xs = [x0 + (x1 - x0) * k / n for k in range(n + 1)]
    f.arrow(x0 - 10, y, x1 + 18, y, colour="var(--axis)", width=1.2)
    for k, x in enumerate(xs):
        f.line(x, y - 4, x, y + 4, cls="tick")
        f.text(x, y + 18, str(k) if k < n else "…", cls="sm dim")
    probs = [1.00, 0.97, 0.93, 0.88, 0.81, 0.72]
    for k, x in enumerate(xs[:-1]):
        h = 26 + 62 * probs[k]
        f.arrow(x, y - 6, x, y - h, colour=BLUE, width=1.8)
        f.text(x, y - h - 8, "1", cls="sm bold", fill=BLUE)
        f.text(x, y - h - 22, f"{probs[k]:.2f}", cls="sm dim")
    f.text(BCX, BY0 + 30, "each payment weighted by ₖpₓ", cls="sm dim")
    return f


@figure("Limited Expected Value", "The severity density with everything above the "
        "limit collapsed onto it", width=WID)
def limited_expected_value() -> Fig:
    f = vcard("Cap the loss, then take the mean",
              ["E[X ∧ u] = ∫₀ᵘ x f(x) dx + u·S(u)", "= ∫₀ᵘ S(x) dx"])

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


@figure("Probability Distributions", "Three distribution shapes an actuary reaches "
        "for, side by side", width=WID)
def probability_distributions() -> Fig:
    f = vcard("A distribution is a shape plus parameters",
              ["discrete: P(X = k)", "continuous: f(x), F(x) = ∫ f"])

    px, pw = BX0 + 34, BX1 - BX0 - 54
    for i, (name, colour, kind) in enumerate((("Poisson — counts", BLUE, "pois"),
                                              ("Gamma — severity", AMBER, "gam"),
                                              ("Normal — averages", GREEN, "norm"))):
        py = BY0 + 26 + i * 100
        ax = Axes(f, px, py, px + pw, py + 62, 0, 8, 0, 1.0)
        f.text(px, py - 8, name, cls="sm bold", fill=colour, anchor="start")
        f.line(px, py + 62, px + pw, py + 62, cls="axis")
        if kind == "pois":
            vals = [_poispmf(k, 2.2) for k in range(9)]
            top = max(vals)
            ax.bars([(k, v / top) for k, v in enumerate(vals)], colour=colour,
                    bw=17, opacity="0.7")
        elif kind == "gam":
            top = max(_gammapdf(x / 20, 2, 1.2) for x in range(1, 160))
            ax.curve(lambda x: _gammapdf(x, 2, 1.2) / top, colour=colour, width=2.2)
        else:
            ax.curve(lambda x: _npdf(x, 4, 1.1) / _npdf(4, 4, 1.1), colour=colour,
                     width=2.2)
    return f


@figure("Frequency", "The distribution of claim counts per policy, most of them "
        "zero", width=WID)
def frequency() -> Fig:
    f = vcard("How often a risk produces a claim",
              ["frequency = claims / exposure", "E[N] = λ per exposure-year"])

    ax = vaxes(f, -0.6, 4.6, 0, 0.9, left=48, top=44, bottom=48)
    ax.frame(xlabel="claims in a year", xticks=[0, 1, 2, 3, 4],
             xfmt=lambda t: f"{t:.0f}", yticks=[0, 0.4, 0.8],
             yfmt=lambda v: f"{v:g}")
    vals = [_poispmf(k, 0.25) for k in range(5)]
    ax.bars(list(enumerate(vals)), colour=BLUE, bw=30, opacity="0.7")
    for k, v in enumerate(vals):
        if v > 0.005:
            ax.label(k, v, f"{v:.3f}", cls="sm", dy=-8)
    f.text(BCX, BY0 + 24, "λ = 0.25 claims per exposure-year", cls="sm dim")
    return f


@figure("Severity", "A right-skewed severity density with mean, median and mode "
        "marked", width=WID)
def severity() -> Fig:
    f = vcard("How large a claim is when it happens",
              ["severity = losses / claim count", "mean > median > mode when skewed"])

    ax = vaxes(f, 0, 30, 0, 0.115, left=44, top=42, bottom=48)
    ax.frame(xlabel="claim size (000s)", xticks=[0, 10, 20, 30], yticks=[])
    dens = lambda x: _gammapdf(x, 1.8, 3.4)
    ax.area(dens, 0, 30, colour=AMBER, opacity="0.14")
    ax.curve(dens, colour=AMBER, width=2.4)
    for x, lab, colour, dy in ((2.7, "mode", "var(--dim)", -46),
                               (4.9, "median", TEAL, -30),
                               (6.1, "mean", ROSE, -14)):
        ax.vline(x, colour=colour, y_top=0.108)
        ax.label(x, 0.108, lab, cls="sm", fill=colour, dy=dy, dx=8, anchor="start")
    return f


@figure("Aggregate Loss Model", "Frequency and severity combining into the aggregate "
        "loss distribution", width=WID)
def aggregate_loss_model() -> Fig:
    f = vcard("Aggregate = counts × sizes",
              ["S = X₁ + ⋯ + X_N", "E[S] = E[N]E[X],  Var(S) = E[N]Var(X) + Var(N)E[X]²"])

    ax1 = Axes(f, BX0 + 16, BY0 + 26, BX0 + 146, BY0 + 96, -0.6, 4.6, 0, 0.5)
    f.text(BX0 + 81, BY0 + 18, "frequency N", cls="sm bold", fill=BLUE)
    ax1.frame(xticks=[0, 1, 2, 3, 4], xfmt=lambda t: f"{t:.0f}", yticks=[])
    ax1.bars([(k, _poispmf(k, 1.4)) for k in range(5)], colour=BLUE, bw=16,
             opacity="0.7")

    ax2 = Axes(f, BX0 + 186, BY0 + 26, BX1 - 14, BY0 + 96, 0, 20, 0, 0.14)
    f.text((BX0 + 186 + BX1 - 14) / 2, BY0 + 18, "severity X", cls="sm bold", fill=AMBER)
    ax2.frame(xticks=[0, 10, 20], yticks=[])
    ax2.curve(lambda x: _gammapdf(x, 1.8, 3.0), colour=AMBER, width=2)

    f.text(BCX, BY0 + 128, "⊕", cls="ttl", fill="var(--dim)")
    f.arrow(BCX, BY0 + 136, BCX, BY0 + 162, colour="var(--dim)", width=1.4)

    ax3 = Axes(f, BX0 + 46, BY0 + 186, BX1 - 20, BY1 - 40, 0, 40, 0, 0.075)
    ax3.frame(xlabel="aggregate loss S", xticks=[0, 10, 20, 30, 40], yticks=[])
    ax3.curve(lambda x: _gammapdf(x, 1.9, 4.2) if x > 0 else 0, colour=GREEN, width=2.4)
    ax3.area(lambda x: _gammapdf(x, 1.9, 4.2) if x > 0 else 0, 0.01, 40, colour=GREEN,
             opacity="0.14")
    f.circle(ax3.px(0), ax3.py(0), 4.4, fill=GREEN)
    ax3.label(1.6, 0.012, "P(S = 0)", cls="sm", fill=GREEN, anchor="start", dy=-6)
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Statistics
# ═══════════════════════════════════════════════════════════════════════════

@figure("Statistics", "A sample condensed into the two summaries that estimate the "
        "population mean and variance", width=WID)
def statistics() -> Fig:
    f = vcard("A statistic condenses the sample",
              ["X̄ = (1/n) Σ Xᵢ", "S² = (1/(n−1)) Σ (Xᵢ − X̄)²"])

    f.text(BCX, BY0 + 18, "population", cls="sm dim")
    ax = Axes(f, BX0 + 40, BY0 + 26, BX1 - 20, BY0 + 96, -3.4, 3.4, 0, 0.42)
    ax.curve(lambda x: _npdf(x), colour="var(--dim)", width=1.6)
    f.line(BX0 + 40, BY0 + 96, BX1 - 20, BY0 + 96, cls="axis")
    f.text(BX1 - 24, BY0 + 60, "μ, σ²", cls="sm dim", anchor="end")

    f.arrow(BCX, BY0 + 104, BCX, BY0 + 132, colour="var(--dim)", width=1.4)
    f.text(BCX + 8, BY0 + 122, "sample of n", cls="sm dim", anchor="start")

    pts = [-1.6, -0.9, -0.4, 0.1, 0.35, 0.8, 1.1, 1.9]
    y = BY0 + 156
    f.line(BX0 + 40, y, BX1 - 20, y, cls="axis")
    sx = Axes(f, BX0 + 40, y - 20, BX1 - 20, y, -3.4, 3.4, 0, 1)
    for v in pts:
        f.circle(sx.px(v), y, 4.2, fill=BLUE, fill_opacity="0.85")
    mean = sum(pts) / len(pts)
    f.arrow(sx.px(mean), y + 30, sx.px(mean), y + 8, colour=ROSE, width=1.6)

    f.box(BX0 + 22, BY0 + 208, 132, 46, label="X̄ = 0.169", colour=ROSE, sub="centre")
    f.box(BX0 + 168, BY0 + 208, 132, 46, label="S² = 1.30", colour=AMBER, sub="spread")
    f.text(BCX, BY1 - 24, "estimates of μ and σ²", cls="sm dim")
    return f


@figure("Sample Mean", "One sample's average, and how the average of n draws "
        "concentrates as n grows", width=WID)
def sample_mean() -> Fig:
    f = vcard("The average of n draws, and its spread",
              ["E[X̄] = μ", "Var(X̄) = σ² / n"])

    y = BY0 + 44
    pts = [-1.7, -1.1, -0.5, -0.2, 0.3, 0.6, 1.2, 2.0]
    sx = Axes(f, BX0 + 34, y - 18, BX1 - 24, y, -3, 3, 0, 1)
    f.line(BX0 + 34, y, BX1 - 24, y, cls="axis")
    for v in pts:
        f.circle(sx.px(v), y, 4.2, fill=BLUE, fill_opacity="0.85")
    mean = sum(pts) / len(pts)
    f.arrow(sx.px(mean), y + 28, sx.px(mean), y + 7, colour=ROSE, width=1.7)
    f.text(sx.px(mean), y + 42, "X̄", cls="sm bold", fill=ROSE)

    ax = Axes(f, BX0 + 40, BY0 + 122, BX1 - 20, BY1 - 44, -3, 3, 0, 1.75)
    ax.frame(xticks=[-2, 0, 2], xfmt=lambda t: "μ" if t == 0 else "", yticks=[])
    for n, colour, sd in ((1, "var(--dim)", 1.0), (10, BLUE, 0.32), (50, GREEN, 0.14)):
        ax.curve(lambda x, s=sd: _npdf(x, 0, s), colour=colour, width=2)
    ax.label(-1.85, 0.36, "n = 1", cls="sm", fill="var(--dim)")
    ax.label(-0.95, 1.05, "n = 10", cls="sm", fill=BLUE, anchor="end")
    ax.label(0.72, 1.6, "n = 50", cls="sm", fill=GREEN, anchor="start")
    return f


@figure("Sample Variance", "Squared deviations from the sample mean, divided by "
        "n − 1", width=WID)
def sample_variance() -> Fig:
    f = vcard("Average the squared deviations",
              ["S² = Σ (Xᵢ − X̄)² / (n − 1)", "E[S²] = σ²"])

    data = [4, 6, 9, 11, 20]
    ax = vaxes(f, 0, 6, 0, 22, left=44, top=40, bottom=48)
    ax.frame(xticks=[], yticks=[0, 10, 20])
    ax.hline(10, colour=ROSE, dash=True)
    ax.label(0.35, 10, "X̄ = 10", cls="sm", fill=ROSE, anchor="start", dy=-6)
    for i, v in enumerate(data):
        x = i + 1
        ax.polyline([(x, 10), (x, v)], colour=BLUE, width=1.6)
        ax.point(x, v, colour=BLUE, r=4)
        ax.label(x, (v + 10) / 2, f"{v - 10:+d}", cls="sm", dx=13, fill=BLUE)

    f.text(BX0 + 24, BY1 - 10, "Σ(Xᵢ − X̄)² = 154", cls="sm", anchor="start")
    f.text(BX1 - 24, BY1 - 10, "S² = 154 / 4 = 38.5", cls="sm bold", anchor="end")
    return f


@figure("Sampling Distribution", "Repeated samples turning one statistic into a "
        "distribution of its own", width=WID)
def sampling_distribution() -> Fig:
    f = vcard("A statistic has a distribution too",
              ["X̄ ~ N(μ, σ²/n)  approximately", "by the Central Limit Theorem"])

    f.text(BX0 + 10, BY0 + 16, "samples", cls="sm dim", anchor="start")
    seeds = [(0.28, BLUE), (-0.35, AMBER), (0.62, GREEN)]
    for i, (m, colour) in enumerate(seeds):
        y = BY0 + 34 + i * 30
        sx = Axes(f, BX0 + 20, y - 10, BX0 + 190, y, -2.6, 2.6, 0, 1)
        f.line(BX0 + 20, y, BX0 + 190, y, cls="rule")
        u = _rng(17 + i * 7)
        for _ in range(7):
            v = m + (u() - 0.5) * 3
            f.circle(sx.px(max(-2.5, min(2.5, v))), y - 4, 3, fill=colour,
                     fill_opacity="0.8")
        f.arrow(sx.px(m), y - 4, BX0 + 214, BY0 + 150, colour=colour, width=1.1,
                dash=True)
        f.text(BX0 + 198, y - 1, "X̄", cls="sm", fill=colour, anchor="start")

    ax = Axes(f, BX0 + 44, BY0 + 186, BX1 - 20, BY1 - 44, -2.6, 2.6, 0, 0.46)
    ax.frame(xticks=[0], xfmt=lambda t: "μ", yticks=[])
    ax.area(lambda x: _npdf(x, 0, 0.9), -2.6, 2.6, colour=VIOLET, opacity="0.16")
    ax.curve(lambda x: _npdf(x, 0, 0.9), colour=VIOLET, width=2.2)
    f.text(BCX, BY0 + 178, "distribution of X̄ over samples", cls="sm dim")
    return f


@figure("Sufficient Statistic", "A sample funnelled into one number that keeps every "
        "piece of information about the parameter", width=WID)
def sufficient_statistic() -> Fig:
    f = vcard("One number that keeps all the information",
              ["f(x | T = t, θ) = f(x | T = t)", "f(x | θ) = g(T(x), θ) · h(x)"])

    f.text(BCX, BY0 + 20, "X₁, X₂, …, Xₙ", cls="bold")
    for i in range(6):
        x = BX0 + 46 + i * 46
        f.circle(x, BY0 + 52, 12, fill=BLUE, fill_opacity="0.16", stroke=BLUE,
                 stroke_width="1.3")
        f.text(x, BY0 + 56, "xᵢ", cls="sm")
        f.arrow(x, BY0 + 66, BCX, BY0 + 104, colour=BLUE, width=1.1, dash=True)

    f.chip(BCX, BY0 + 122, "T(X) = Σ Xᵢ", colour=ROSE, w=150, h=30, cls="bold")
    f.arrow(BCX, BY0 + 140, BCX, BY0 + 168, colour="var(--dim)", width=1.4)
    f.box(BX0 + 40, BY0 + 170, 240, 52, label="θ̂ built from T alone",
          colour=GREEN, sub="loses nothing")

    f.text(BCX, BY0 + 250, "the leftover detail carries no θ", cls="sm dim")
    f.text(BCX, BY0 + 274, "Poisson: T = ΣXᵢ      Normal: T = (ΣXᵢ, ΣXᵢ²)",
           cls="sm dim")
    return f


@figure("Sufficiency", "The likelihood factorizing into a piece that sees θ and a "
        "piece that does not", width=WID)
def sufficiency() -> Fig:
    f = vcard("The likelihood splits in two",
              ["f(x₁,…,xₙ | θ) = g(T(x), θ) · h(x)", "Fisher–Neyman factorization"])

    f.box(BX0 + 20, BY0 + 30, 300, 44, label="f(x₁, …, xₙ | θ)", colour=BLUE)
    f.arrow(BX0 + 100, BY0 + 78, BX0 + 76, BY0 + 112, colour="var(--dim)", width=1.3)
    f.arrow(BX0 + 240, BY0 + 78, BX0 + 264, BY0 + 112, colour="var(--dim)", width=1.3)

    f.box(BX0 + 14, BY0 + 116, 146, 66, label="g(T(x), θ)", colour=ROSE,
          sub="sees θ, only via T")
    f.box(BX0 + 180, BY0 + 116, 146, 66, label="h(x)", colour="var(--dim)",
          sub="free of θ")

    f.text(BCX, BY0 + 214, "so once T is known,", cls="sm dim")
    f.box(BX0 + 34, BY0 + 226, 252, 44, label="the rest of the data is noise",
          colour=GREEN)
    f.text(BCX, BY0 + 292, "Rao–Blackwell: conditioning on T", cls="sm dim")
    f.text(BCX, BY0 + 310, "never raises the variance", cls="sm dim")
    return f


@figure("Maximum Likelihood Estimation", "The log-likelihood curve peaking at the "
        "maximum likelihood estimate", width=WID)
def maximum_likelihood_estimation() -> Fig:
    f = vcard("Pick the parameter the data likes best",
              ["ℓ(θ) = Σ ln f(xᵢ | θ)", "solve ∂ℓ/∂θ = 0"])

    ax = vaxes(f, 0.05, 0.55, -72, -48, left=46, top=36, bottom=46)
    ax.frame(xlabel="λ", xticks=[0.1, 0.2, 0.3, 0.4, 0.5],
             xfmt=lambda t: f"{t:g}", yticks=[], ylabel="ℓ(λ)")
    ll = lambda lam: -80 * lam + 20 * math.log(lam) - 4
    ax.curve(ll, colour=BLUE, width=2.4)
    hat = 0.25
    ax.vline(hat, colour=ROSE, y_top=ll(hat))
    ax.point(hat, ll(hat), colour=ROSE, r=4.4)
    ax.label(hat, ll(hat), "λ̂ = 0.25", cls="sm bold", fill=ROSE, dy=-10, dx=30)
    ax.label(0.52, ll(0.52) - 2.4, "ℓ(λ)", cls="sm", fill=BLUE, anchor="end")
    f.text(BCX, BY0 + 22, "20 claims from 80 exposure-years", cls="sm dim")
    return f


@figure("Method of Moments", "Sample moments set equal to the model's moments and "
        "solved", width=WID)
def method_of_moments() -> Fig:
    f = vcard("Match the moments, then solve",
              ["X̄ = E[X | θ]", "(1/n)ΣXᵢ² = E[X² | θ]"])

    f.box(BX0 + 12, BY0 + 24, 138, 56, label="X̄ = 500", colour=BLUE, sub="sample")
    f.box(BX0 + 190, BY0 + 24, 138, 56, label="αθ", colour=AMBER, sub="model")
    f.text(BCX, BY0 + 56, "=", cls="ttl")

    f.box(BX0 + 12, BY0 + 96, 138, 56, label="s² = 125,000", colour=BLUE,
          sub="sample")
    f.box(BX0 + 190, BY0 + 96, 138, 56, label="αθ²", colour=AMBER, sub="model")
    f.text(BCX, BY0 + 128, "=", cls="ttl")

    f.arrow(BCX, BY0 + 160, BCX, BY0 + 190, colour="var(--dim)", width=1.4)
    f.box(BX0 + 44, BY0 + 194, 232, 48, label="θ = 250,  α = 2", colour=GREEN,
          label_cls="bold")
    f.text(BCX, BY0 + 268, "two unknowns, two equations", cls="sm dim")
    f.text(BCX, BY0 + 292, "simple, consistent — but not efficient", cls="sm dim")
    return f


@figure("Fisher Information", "A sharply peaked likelihood beside a flat one, and the "
        "bound the curvature sets", width=WID)
def fisher_information() -> Fig:
    f = vcard("Curvature is information",
              ["I(θ) = −E[ ∂²ln f / ∂θ² ]", "Var(θ̂) ≥ 1 / (n I(θ))"])

    ax = vaxes(f, -3, 3, -5.2, 0.4, left=44, top=38, bottom=52)
    ax.frame(xlabel="θ", xticks=[0], xfmt=lambda t: "θ̂", yticks=[], ylabel="ℓ(θ)")
    ax.curve(lambda x: -1.4 * x * x, colour=BLUE, width=2.4, xa=-1.9, xb=1.9)
    ax.curve(lambda x: -0.28 * x * x, colour=AMBER, width=2.4)
    ax.label(1.25, -3.4, "high I(θ)", cls="sm", fill=BLUE, anchor="start")
    ax.label(2.55, -1.5, "low I(θ)", cls="sm", fill=AMBER, anchor="end")
    ax.point(0, 0, colour=ROSE, r=4)

    f.text(BX0 + 16, BY1 - 26, "sharp peak → small SE", cls="sm", anchor="start",
           fill=BLUE)
    f.text(BX0 + 16, BY1 - 10, "flat peak → wide SE", cls="sm", anchor="start",
           fill=AMBER)
    return f


@figure("Unbiasedness", "Two estimators' sampling distributions, one centred on the "
        "parameter and one not", width=WID)
def unbiasedness() -> Fig:
    f = vcard("Right on average, sample after sample",
              ["E[θ̂] = θ", "Bias(θ̂) = E[θ̂] − θ = 0"])

    ax = vaxes(f, -4, 4, 0, 0.46, left=40, top=54, bottom=48)
    ax.frame(xticks=[0], xfmt=lambda t: "θ", yticks=[])
    ax.area(lambda x: _npdf(x, 0, 1.0), -4, 4, colour=GREEN, opacity="0.14")
    ax.curve(lambda x: _npdf(x, 0, 1.0), colour=GREEN, width=2.4)
    ax.curve(lambda x: _npdf(x, 1.8, 1.0), colour=ROSE, width=2.2, dash=True)
    ax.vline(0, colour=GREEN, y_top=0.42)
    ax.vline(1.8, colour=ROSE, y_top=0.42)
    ax.label(-0.15, 0.44, "unbiased", cls="sm", fill=GREEN, anchor="end")
    ax.label(1.95, 0.44, "biased", cls="sm", fill=ROSE, anchor="start")
    f.text(BCX, BY0 + 30, "distribution of θ̂ over repeated samples", cls="sm dim")
    brace(f, ax.px(0), ax.px(1.8), ax.py(0.06), depth=7, colour=ROSE, label="bias",
          label_cls="sm")
    return f


@figure("Bias", "Bias and variance as the two parts of mean square error", width=WID)
def bias() -> Fig:
    f = vcard("Off-centre by a fixed amount",
              ["Bias(θ̂) = E[θ̂] − θ", "MSE = Var(θ̂) + Bias²"])

    ax = vaxes(f, -3.4, 4.6, 0, 0.62, left=40, top=44, bottom=76)
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

    f.text(BX0 + 20, BY1 - 26, "biased but tight can beat", cls="sm dim",
           anchor="start")
    f.text(BX0 + 20, BY1 - 10, "unbiased but wide — on MSE", cls="sm dim",
           anchor="start")
    return f


@figure("Consistency", "The sampling distribution collapsing onto the parameter as "
        "the sample grows", width=WID)
def consistency() -> Fig:
    f = vcard("It closes in on θ as n grows",
              ["θ̂ₙ →ᵖ θ", "P(|θ̂ₙ − θ| > ε) → 0"])

    ax = vaxes(f, -3, 3, 0, 3.1, left=40, top=44, bottom=48)
    ax.frame(xticks=[0], xfmt=lambda t: "θ", yticks=[])
    for n, sd, colour in ((25, 1.0, "var(--dim)"), (100, 0.5, BLUE),
                          (400, 0.25, GREEN), (1600, 0.125, ROSE)):
        ax.curve(lambda x, s=sd: _npdf(x, 0, s), colour=colour, width=2)
    ax.label(-1.7, 0.30, "n = 25", cls="sm", fill="var(--dim)")
    ax.label(-0.95, 0.72, "n = 100", cls="sm", fill=BLUE, anchor="end")
    ax.label(0.62, 1.5, "n = 400", cls="sm", fill=GREEN, anchor="start")
    ax.label(0.62, 2.9, "n = 1600", cls="sm", fill=ROSE, anchor="start")
    f.text(BCX, BY0 + 30, "spread → 0, centre → θ", cls="sm dim")
    return f


@figure("Efficiency", "Two unbiased estimators with different variances against the "
        "Cramér–Rao bound", width=WID)
def efficiency() -> Fig:
    f = vcard("Among unbiased estimators, the tightest wins",
              ["eff(θ̂) = [1 / (n I(θ))] / Var(θ̂)", "efficient ⇔ attains the bound"])

    ax = vaxes(f, -4, 4, 0, 0.86, left=40, top=52, bottom=52)
    ax.frame(xticks=[0], xfmt=lambda t: "θ", yticks=[])
    ax.area(lambda x: _npdf(x, 0, 0.5), -4, 4, colour=GREEN, opacity="0.14")
    ax.curve(lambda x: _npdf(x, 0, 0.5), colour=GREEN, width=2.4)
    ax.curve(lambda x: _npdf(x, 0, 1.2), colour=AMBER, width=2.2)
    ax.label(0.62, 0.80, "efficient", cls="sm", fill=GREEN, anchor="start")
    ax.label(2.1, 0.20, "unbiased, but", cls="sm", fill=AMBER, anchor="start")
    ax.label(2.1, 0.11, "wider", cls="sm", fill=AMBER, anchor="start")
    f.text(BCX, BY0 + 28, "both centred on θ — only the spread differs",
           cls="sm dim")
    f.text(BCX, BY1 - 14, "no unbiased estimator beats 1 / (n I(θ))", cls="sm dim")
    return f


@figure("Minimum Variance", "Variances of competing unbiased estimators, with the "
        "smallest marked", width=WID)
def minimum_variance() -> Fig:
    f = vcard("The unbiased estimator with least spread",
              ["Var(θ̂*) ≤ Var(θ̂) for all unbiased θ̂",
               "UMVUE — uniformly minimum variance"])

    ests = [("X̄", 1.00, GREEN), ("median", 1.57, BLUE), ("midrange", 2.30, AMBER),
            ("X₁", 4.00, ROSE)]
    ax = vaxes(f, -0.7, 3.7, 0, 4.9, left=52, top=52, bottom=48)
    ax.frame(xticks=[], yticks=[0, 2, 4], ylabel="n · Var(θ̂) / σ²")
    ax.bars([(i, v) for i, (_, v, _) in enumerate(ests)], colour=BLUE, bw=42,
            opacity="0.35")
    for i, (name, v, colour) in enumerate(ests):
        ax.bars([(i, v)], colour=colour, bw=42, opacity="0.7")
        ax.label(i, 0, name, cls="sm", dy=18)
        ax.label(i, v, f"{v:.2f}", cls="sm", dy=-8)
    ax.hline(1.0, colour=GREEN, dash=True, label="", x_to=3.6)
    return f


@figure("Mean Square Error", "Mean square error split into variance and squared "
        "bias for three estimators", width=WID)
def mean_square_error() -> Fig:
    f = vcard("Variance plus squared bias",
              ["MSE(θ̂) = E[(θ̂ − θ)²]", "= Var(θ̂) + Bias(θ̂)²"])

    rows = [("A", 100, 0), ("B", 50, 16), ("C", 20, 64)]
    ax = vaxes(f, -0.7, 2.7, 0, 105, left=48, top=46, bottom=54)
    ax.frame(xticks=[], yticks=[0, 50, 100], ylabel="MSE")
    for i, (name, var, b2) in enumerate(rows):
        ax.bars([(i, var)], colour=BLUE, bw=56, opacity="0.7")
        yb, yt = ax.py(var), ax.py(var + b2)
        f.rect(ax.px(i) - 28, yt, 56, yb - yt, rx=1.5, fill=ROSE, fill_opacity="0.7")
        ax.label(i, 0, name, cls="sm", dy=18)
        ax.label(i, var + b2, f"{var + b2}", cls="sm bold", dy=-8)
    f.legend(BX1 - 96, BY0 + 26, [(BLUE, "variance"), (ROSE, "bias²")], gap=15)
    return f


@figure("Hypothesis Testing", "The null distribution with its rejection region and "
        "the observed statistic", width=WID)
def hypothesis_testing() -> Fig:
    f = vcard("Reject when the statistic is too extreme",
              ["reject H₀ if Z > z_α", "α = P(reject H₀ | H₀ true)"])

    ax = vaxes(f, -3.6, 3.6, 0, 0.46, left=36, top=52, bottom=50)
    ax.frame(xlabel="Z", xticks=[-2, 0, 1.645, 3],
             xfmt=lambda t: {1.645: "1.645", 0.0: "0"}.get(round(t, 3), ""),
             yticks=[])
    ax.area(lambda x: _npdf(x), -3.6, 1.645, colour=BLUE, opacity="0.12")
    ax.area(lambda x: _npdf(x), 1.645, 3.6, colour=ROSE, opacity="0.5")
    ax.curve(lambda x: _npdf(x), colour=BLUE, width=2.4)
    ax.vline(1.645, colour=ROSE, y_top=0.42)
    ax.label(-0.9, 0.20, "do not reject", cls="sm", fill=BLUE)
    ax.label(2.35, 0.10, "reject", cls="sm bold", fill=ROSE, dy=-16)
    ax.point(2.5, 0.014, colour=AMBER, r=4.4)
    ax.label(2.5, 0.014, "z = 2.50", cls="sm bold", fill=AMBER, dy=-10, dx=8,
             anchor="start")
    f.text(BCX, BY0 + 30, "distribution of Z when H₀ is true", cls="sm dim")
    return f


@figure("Type I Error", "The α tail of the null distribution — rejecting a true "
        "null", width=WID)
def type_i_error() -> Fig:
    f = vcard("Rejecting a null that is true",
              ["α = P(reject H₀ | H₀ true)", "the significance level you choose"])

    ax = vaxes(f, -3.6, 3.6, 0, 0.46, left=36, top=64, bottom=56)
    ax.frame(xticks=[0, 1.645], xfmt=lambda t: "μ₀" if t == 0 else "critical value",
             yticks=[])
    ax.curve(lambda x: _npdf(x), colour=BLUE, width=2.4)
    ax.area(lambda x: _npdf(x), 1.645, 3.6, colour=ROSE, opacity="0.55")
    ax.vline(1.645, colour=ROSE, y_top=0.42)
    f.arrow(ax.px(2.9), ax.py(0.20), ax.px(2.1), ax.py(0.045), colour=ROSE, width=1.5)
    ax.label(2.9, 0.22, "α = 0.05", cls="sm bold", fill=ROSE)
    f.text(BCX, BY0 + 34, "everything drawn under H₀", cls="sm dim")
    f.text(BCX, BY1 - 20, "a false alarm: the claim was fine", cls="sm dim")
    return f


@figure("Type II Error", "The β region under the alternative — missing a false "
        "null", width=WID)
def type_ii_error() -> Fig:
    f = vcard("Missing a null that is false",
              ["β = P(fail to reject H₀ | H₁ true)", "power = 1 − β"])

    ax = vaxes(f, -3.4, 6.4, 0, 0.46, left=36, top=64, bottom=56)
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
    f.text(BCX, BY1 - 20, "shift the line and α, β trade off", cls="sm dim")
    return f


@figure("Power of a Test", "The power curve rising from α as the truth moves away "
        "from the null", width=WID)
def power_of_a_test() -> Fig:
    f = vcard("The chance of catching a real effect",
              ["Power(θ) = 1 − β(θ)", "Power(θ₀) = α"])

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


@figure("p-Value", "The tail area beyond the observed statistic, compared with α",
        width=WID)
def p_value() -> Fig:
    f = vcard("The tail beyond what you observed",
              ["p = P(statistic this extreme | H₀)", "reject H₀ when p < α"])

    ax = vaxes(f, -3.6, 3.6, 0, 0.46, left=36, top=60, bottom=54)
    ax.frame(xticks=[0, 2.5], xfmt=lambda t: "0" if t == 0 else "z = 2.50",
             yticks=[])
    ax.curve(lambda x: _npdf(x), colour=BLUE, width=2.4)
    ax.area(lambda x: _npdf(x), 1.645, 3.6, colour="var(--dim)", opacity="0.18")
    ax.area(lambda x: _npdf(x), 2.5, 3.6, colour=ROSE, opacity="0.65")
    ax.vline(2.5, colour=ROSE, y_top=0.30)
    ax.vline(1.645, colour="var(--dim)", y_top=0.22)
    f.arrow(ax.px(3.1), ax.py(0.26), ax.px(2.75), ax.py(0.03), colour=ROSE, width=1.5)
    ax.label(3.1, 0.28, "p = 0.0062", cls="sm bold", fill=ROSE, anchor="end")
    ax.label(1.645, 0.24, "α = 0.05", cls="sm dim")
    f.text(BCX, BY0 + 34, "p smaller than α → reject", cls="sm dim")
    return f


@figure("Confidence Interval", "Twenty intervals from twenty samples, one of which "
        "misses the parameter", width=WID)
def confidence_interval() -> Fig:
    f = vcard("Coverage is a property of the recipe",
              ["X̄ ± z_(α/2) · σ/√n", "95% of such intervals cover μ"])

    x0, x1 = BX0 + 34, BX1 - 20
    mid = (x0 + x1) / 2
    f.line(mid, BY0 + 26, mid, BY1 - 34, cls="thin dash", stroke=ROSE,
           stroke_width="1.4")
    f.text(mid, BY0 + 20, "μ", cls="sm bold", fill=ROSE)
    u = _rng(2027)
    miss = 9                       # exactly one interval in the twenty misses
    for i in range(16):
        y = BY0 + 40 + i * 17
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
    f.text(BX0 + 6, BY1 - 14, "one interval in twenty misses", cls="sm dim",
           anchor="start")
    return f


@figure("Likelihood Ratio Test", "Two nested log-likelihoods and the deviance drop "
        "between them", width=WID)
def likelihood_ratio_test() -> Fig:
    f = vcard("Compare the fits of nested models",
              ["−2 ln Λ = 2[ℓ(full) − ℓ(reduced)]", "≈ χ²_r under H₀"])

    ax = vaxes(f, -3, 3, -418, -404, left=54, top=40, bottom=64)
    ax.frame(xticks=[], yticks=[-416, -412, -408], yfmt=lambda v: f"{v:.0f}",
             ylabel="log-likelihood")
    ax.hline(-407.1, colour=BLUE, dash=False, label="", x_to=3)
    ax.hline(-412.6, colour=AMBER, dash=False, label="", x_to=3)
    ax.label(-2.8, -406.4, "full model", cls="sm", fill=BLUE, anchor="start")
    ax.label(-2.8, -413.9, "reduced model", cls="sm", fill=AMBER, anchor="start")
    xg = 1.6
    f.arrow(ax.px(xg), ax.py(-412.6), ax.px(xg), ax.py(-407.1), colour=ROSE,
            width=1.8)
    f.text(ax.px(xg) + 8, (ax.py(-412.6) + ax.py(-407.1)) / 2 + 4, "5.5",
           cls="sm bold", anchor="start", fill=ROSE)
    f.text(BCX, BY1 - 28, "−2 ln Λ = 11.0 on 2 df", cls="bold")
    f.text(BCX, BY1 - 10, "χ²₀.₀₅,₂ = 5.99 → reject the reduced model",
           cls="sm dim")
    return f


@figure("Censoring", "Policies observed to a limit, with the true values beyond it "
        "unknown", width=WID)
def censoring() -> Fig:
    f = vcard("Known to exceed the limit, size unknown",
              ["contribute S(u) to the likelihood", "not the density f(x)"])

    ax = vaxes(f, 0, 10, -0.6, 6.4, left=40, top=42, bottom=48)
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
    f.text(BCX, BY0 + 26, "two claims hit the limit", cls="sm dim")
    return f


@figure("Truncation", "Losses below the deductible never entering the data at all",
        width=WID)
def truncation() -> Fig:
    f = vcard("Below the threshold, nothing is recorded",
              ["f(x | X > d) = f(x) / S(d)", "rescale to the observed range"])

    ax = vaxes(f, 0, 12, 0, 0.36, left=40, top=52, bottom=48)
    ax.frame(xlabel="loss (000s)", xticks=[0, 3, 6, 9, 12], yticks=[])
    dens = lambda x: _gammapdf(x, 2.0, 2.0)
    ax.area(dens, 0, 3, colour="var(--dim)", opacity="0.18")
    ax.curve(dens, colour="var(--dim)", width=1.8, dash=True)
    surv = 1 - (1 - math.exp(-1.5) * (1 + 1.5))
    ax.curve(lambda x: dens(x) / surv if x >= 3 else None, colour=BLUE, width=2.4,
             xa=3, xb=12)
    ax.area(lambda x: dens(x) / surv, 3, 12, colour=BLUE, opacity="0.14")
    ax.vline(3, colour=ROSE, y_top=0.34, label="deductible d", label_cls="sm")
    ax.label(1.4, 0.055, "never seen", cls="sm dim")
    ax.label(6.6, 0.16, "rescaled to", cls="sm", fill=BLUE, anchor="start")
    ax.label(6.6, 0.135, "integrate to 1", cls="sm", fill=BLUE, anchor="start")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# C. Extended linear models — the model families
# ═══════════════════════════════════════════════════════════════════════════

@figure("Extended Linear Model", "The ladder from ordinary regression to the extended "
        "linear model, and what each rung relaxes", width=WID)
def extended_linear_model() -> Fig:
    f = vcard("Each rung relaxes one assumption",
              ["g(μ) = β₀ + β₁x₁ + ⋯ + βₚxₚ", "distribution and link both chosen"])

    rungs = [
        ("Ordinary regression", "Normal · identity link", BLUE),
        ("Generalized linear model", "exponential family · any link", AMBER),
        ("Extended linear model", "+ interactions, transforms, mixed effects", GREEN),
    ]
    for i, (name, sub, colour) in enumerate(rungs):
        y = BY0 + 34 + i * 88
        f.box(BX0 + 14, y, 292, 62, label=name, colour=colour, sub=sub,
              label_cls="bold")
        if i < 2:
            f.arrow(BCX, y + 64, BCX, y + 84, colour="var(--dim)", width=1.4)
    f.text(BX1 - 8, BY0 + 302, "more flexible", cls="sm dim", anchor="end")
    f.arrow(BX0 + 14, BY0 + 306, BX1 - 14, BY0 + 306, colour="var(--dim)", width=1.2)
    return f


@figure("Linear Regression", "A fitted least-squares line with the residuals it "
        "minimizes", width=WID)
def linear_regression() -> Fig:
    f = vcard("Least squares: minimise the residuals",
              ["Y = β₀ + β₁x + ε,  ε ~ N(0, σ²)", "β̂ = (XᵀX)⁻¹Xᵀy"])

    ax = vaxes(f, 0, 10, 0, 60, left=46, top=44, bottom=48)
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
    ax.label(7.3, 24, "residual", cls="sm", fill=ROSE, anchor="start")
    f.arrow(ax.px(7.9), ax.py(26), ax.px(7.5), ax.py(45), colour=ROSE, width=1.2,
            dash=True)
    f.text(BX1 - 16, BY0 + 26, "ŷ = 25.8 + 2.16x", cls="sm bold", fill=BLUE,
           anchor="end")
    return f


@figure("Generalized Linear Model", "The three components of a GLM: distribution, "
        "linear predictor, link", width=WID)
def generalized_linear_model() -> Fig:
    f = vcard("Three parts: distribution, predictor, link",
              ["g(μᵢ) = ηᵢ = β₀ + Σ βⱼxᵢⱼ", "Yᵢ ~ exponential family, Var = φV(μ)"])

    f.box(BX0 + 12, BY0 + 26, 296, 60, label="η = β₀ + β₁x₁ + ⋯ + βₚxₚ",
          colour=BLUE, sub="systematic component — linear in the parameters",
          label_cls="bold")
    f.arrow(BCX, BY0 + 88, BCX, BY0 + 116, colour="var(--dim)", width=1.5)
    f.box(BX0 + 12, BY0 + 118, 296, 60, label="μ = g⁻¹(η)", colour=AMBER,
          sub="link function — log keeps μ > 0", label_cls="bold")
    f.arrow(BCX, BY0 + 180, BCX, BY0 + 208, colour="var(--dim)", width=1.5)
    f.box(BX0 + 12, BY0 + 210, 296, 60, label="Y ~ Poisson, Gamma, binomial, …",
          colour=GREEN, sub="random component — variance tied to the mean",
          label_cls="bold")

    f.text(BCX, BY0 + 296, "ordinary regression is the case", cls="sm dim")
    f.text(BCX, BY0 + 314, "Normal + identity link", cls="sm dim")
    return f


@figure("Linear Mixed Model", "Group-specific intercepts scattered around the "
        "population line", width=WID)
def linear_mixed_model() -> Fig:
    f = vcard("Fixed effects plus group random effects",
              ["y = Xβ + Zu + ε", "u ~ N(0, G),  ε ~ N(0, R)"])

    ax = vaxes(f, 0, 10, 0, 60, left=46, top=46, bottom=48)
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
    f.text(BX0 + 12, BY1 - 8, "one slope, three intercepts", cls="sm dim",
           anchor="start")
    return f


@figure("Model Structure", "The terms of a linear predictor: main effects, an "
        "interaction and a transform", width=WID)
def model_structure() -> Fig:
    f = vcard("Which terms go into the predictor",
              ["η = β₀ + β₁x₁ + β₂x₂ + β₃x₁x₂ + β₄x₁²",
               "distribution and link are chosen separately"])

    rows = [("β₀", "intercept — the base level", "var(--dim)"),
            ("β₁x₁", "main effect: territory", BLUE),
            ("β₂x₂", "main effect: vehicle age", BLUE),
            ("β₃x₁x₂", "interaction — effects not additive", AMBER),
            ("β₄x₁²", "transform — a curved effect", GREEN)]
    for i, (term, note, colour) in enumerate(rows):
        y = BY0 + 26 + i * 56
        f.chip(BX0 + 54, y + 18, term, colour=colour, w=76, h=28, cls="bold")
        f.text(BX0 + 104, y + 22, note, cls="sm dim", anchor="start")
        if i:
            f.text(BX0 + 20, y + 22, "+", cls="bold")
    return f


@figure("Link Function", "The log link mapping a positive mean onto the whole real "
        "line", width=WID)
def link_function() -> Fig:
    f = vcard("The link keeps the mean in range",
              ["g(μ) = η,  μ = g⁻¹(η)", "log link: μ = e^η > 0 always"])

    ax = vaxes(f, -2.6, 2.6, 0, 8, left=46, top=52, bottom=54)
    ax.frame(xlabel="linear predictor η", xticks=[-2, 0, 2], yticks=[0, 4, 8],
             ylabel="mean μ")
    ax.curve(lambda e: math.exp(e), colour=BLUE, width=2.6, xb=2.05)
    ax.curve(lambda e: 4 + 1.6 * e, colour="var(--dim)", width=1.8, dash=True)
    ax.label(2.0, 7.4, "log link", cls="sm", fill=BLUE, anchor="end")
    ax.label(-0.35, 3.1, "identity", cls="sm dim", anchor="end")
    f.text(BX0 + 12, BY1 - 8, "identity can predict μ < 0 — log cannot",
           cls="sm dim", anchor="start")
    return f


@figure("Exponential Family", "The variance functions that separate the family's "
        "members", width=WID)
def exponential_family() -> Fig:
    f = vcard("One form, many variance functions",
              ["f(y) = exp{ (yθ − b(θ))/a(φ) + c(y, φ) }", "Var(Y) = φ · V(μ)"])

    ax = vaxes(f, 0, 3.2, 0, 10, left=48, top=44, bottom=48)
    ax.frame(xlabel="mean μ", xticks=[0, 1, 2, 3], yticks=[0, 5, 10],
             ylabel="V(μ)")
    for power, colour, name, ly in ((0, "var(--dim)", "Normal  V = 1", 1.0),
                                    (1, BLUE, "Poisson  V = μ", 3.0),
                                    (2, AMBER, "Gamma  V = μ²", 6.4),
                                    (3, GREEN, "inv Gaussian  V = μ³", 9.4)):
        ax.curve(lambda m, p=power: m ** p, colour=colour, width=2.2)
        ax.label(3.15, ly, name, cls="sm", fill=colour, anchor="end", dy=-6)
    f.text(BX0 + 12, BY1 - 8, "the variance function picks the member",
           cls="sm dim", anchor="start")
    return f


@figure("Logistic Regression", "The logistic curve fitted to a binary response",
        width=WID)
def logistic_regression() -> Fig:
    f = vcard("Model the log-odds, predict a probability",
              ["ln(π / (1 − π)) = β₀ + β₁x", "π = 1 / (1 + e^(−η))"])

    ax = vaxes(f, 0, 40, -0.08, 1.12, left=44, top=44, bottom=50)
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
    ax.label(10, curve(10), "π̂ = 0.71", cls="sm bold", fill=AMBER, dx=10, dy=-10,
             anchor="start")
    f.text(BX0 + 12, BY1 - 8, "one point per policy: renewed or not",
           cls="sm dim", anchor="start")
    return f


@figure("Poisson Regression", "Log-link coefficients acting as multiplicative "
        "relativities on frequency", width=WID)
def poisson_regression() -> Fig:
    f = vcard("Coefficients become rating relativities",
              ["ln μ = ln(exposure) + β₀ + Σ βⱼxⱼ", "relativity = e^βⱼ"])

    rows = [("base  e^(−2.30)", 0.100, "var(--dim)"),
            ("× urban  e^0.26", 0.130, BLUE),
            ("× young  e^0.41", 0.196, AMBER),
            ("× prior claim  e^0.22", 0.244, ROSE)]
    ax = vaxes(f, 0, 0.30, 0, 4.6, left=126, top=46, bottom=50)
    ax.frame(xlabel="expected claims / year", xticks=[0, 0.1, 0.2],
             xfmt=lambda t: f"{t:g}", yticks=[])
    for i, (name, v, colour) in enumerate(rows):
        y = 4 - i
        f.rect(ax.px(0), ax.py(y) - 11, ax.px(v) - ax.px(0), 22, rx=3,
               fill=colour, fill_opacity="0.65")
        f.text(ax.px(0) - 8, ax.py(y) + 4, name, cls="sm", anchor="end")
        f.text(ax.px(v) + 6, ax.py(y) + 4, f"{v:.3f}", cls="sm", anchor="start")
    f.text(BCX, BY0 + 28, "each factor multiplies the one above", cls="sm dim")
    return f


@figure("Tweedie Distribution", "A point mass at zero with a skewed continuous part "
        "above it", width=WID)
def tweedie_distribution() -> Fig:
    f = vcard("A spike at zero, a skewed tail above",
              ["Var(Y) = φ μ^p,  1 < p < 2", "compound Poisson–Gamma"])

    ax = vaxes(f, -1.5, 26, 0, 0.115, left=44, top=52, bottom=50)
    ax.frame(xlabel="pure premium", xticks=[0, 10, 20], yticks=[])
    dens = lambda x: _gammapdf(x, 1.9, 3.4) * 0.55
    ax.area(dens, 0.1, 26, colour=AMBER, opacity="0.16")
    ax.curve(dens, colour=AMBER, width=2.4, xa=0.1)
    f.rect(ax.px(0) - 7, ax.py(0.098), 14, ax.py(0) - ax.py(0.098), rx=2,
           fill=BLUE, fill_opacity="0.7")
    ax.label(0, 0.098, "P(Y = 0)", cls="sm bold", fill=BLUE, dy=-9, dx=12,
             anchor="start")
    ax.label(12, 0.032, "claims, when they happen", cls="sm", fill=AMBER,
             anchor="start")
    f.text(BCX, BY0 + 30, "most policies claim nothing at all", cls="sm dim")
    return f


@figure("Dispersion Parameter", "The same fitted mean with three levels of scatter "
        "around it", width=WID)
def dispersion_parameter() -> Fig:
    f = vcard("How wide the scatter is around the mean",
              ["Var(Y) = φ · V(μ)", "φ̂ = Pearson χ² / (n − p)"])

    mean = lambda x: 12 + 2.4 * x
    for i, (phi, colour, spread) in enumerate(((0.4, GREEN, 0.35),
                                               (1.0, BLUE, 1.0),
                                               (2.5, ROSE, 1.9))):
        px = BX0 + 8 + i * 106
        ax = Axes(f, px + 12, BY0 + 46, px + 96, BY1 - 54, 0, 10, 0, 44)
        f.text(px + 54, BY0 + 38, f"φ = {phi:g}", cls="sm bold", fill=colour)
        f.line(px + 12, BY1 - 54, px + 96, BY1 - 54, cls="axis")
        ax.curve(mean, colour="var(--dim)", width=1.6)
        u = _rng(31 + i * 13)
        for k in range(9):
            x = 0.6 + k * 1.05
            y = mean(x) + (u() - 0.5) * 22 * spread
            ax.point(x, max(2.0, min(42.0, y)), colour=colour, r=2.8)
    f.text(BCX, BY0 + 20, "same fitted line, different φ", cls="sm dim")
    f.text(BCX, BY1 - 30, "φ does not move β̂ — it scales SE(β̂) by √φ",
           cls="sm dim")
    f.text(BCX, BY1 - 12, "so every p-value moves with it", cls="sm dim")
    return f


# ── specifying the model ─────────────────────────────────────────────────────

@figure("Categorical Predictor", "A three-level rating factor expanded into dummy "
        "variables against a base level", width=WID)
def categorical_predictor() -> Fig:
    f = vcard("Levels become dummies, one is the base",
              ["k levels → k − 1 dummy variables", "each β is relative to the base"])

    head = ["territory", "urban", "suburban"]
    rows = [("rural", "0", "0"), ("suburban", "0", "1"), ("urban", "1", "0")]
    x0, cw = BX0 + 18, 100
    y0, rh = BY0 + 46, 44
    for j, h in enumerate(head):
        f.text(x0 + cw * j + cw / 2, y0 - 10, h, cls="sm bold",
               fill=BLUE if j else "var(--ink)")
    for i, row in enumerate(rows):
        for j, cell in enumerate(row):
            y = y0 + i * rh
            colour = None if j == 0 else (BLUE if cell == "1" else None)
            f.box(x0 + cw * j + 3, y, cw - 6, rh - 6, label=cell, colour=colour,
                  label_cls="sm bold" if j else "sm")
    f.text(BCX, y0 + 3 * rh + 16, "rural is the base level — all dummies 0",
           cls="sm dim")
    f.text(BCX, y0 + 3 * rh + 52, "ordinal levels may instead be scored 1, 2, 3;",
           cls="sm dim")
    f.text(BCX, y0 + 3 * rh + 70, "a continuous predictor needs no dummies at all",
           cls="sm dim")
    return f


@figure("Interaction", "Parallel lines when effects are additive, crossing lines when "
        "they interact", width=WID)
def interaction() -> Fig:
    f = vcard("Non-parallel lines mean an interaction",
              ["η = β₀ + β₁x₁ + β₂x₂ + β₃x₁x₂", "β₃ ≠ 0 → the effect of x₁ depends on x₂"])

    for i, (title, slopes, colours) in enumerate(
            (("no interaction", ((14, 2.2), (26, 2.2)), (BLUE, AMBER)),
             ("interaction", ((14, 3.6), (30, 0.9)), (BLUE, AMBER)))):
        py = BY0 + 32 + i * 152
        ax = Axes(f, BX0 + 50, py, BX1 - 24, py + 108, 0, 10, 0, 60)
        f.text(BX0 + 50, py - 8, title, cls="sm bold", anchor="start")
        ax.frame(xticks=[], yticks=[], arrows=True)
        for (b0, b1), colour in zip(slopes, colours):
            ax.curve(lambda x, b0=b0, b1=b1: b0 + b1 * x, colour=colour, width=2.2)
            ax.label(9.6, b0 + b1 * 9.6, "young" if colour is AMBER else "mature",
                     cls="sm", fill=colour, anchor="end", dy=-7)
    f.text(BCX, BY1 - 12, "crossing lines: the territory effect differs by age group",
           cls="sm dim")
    return f


@figure("Control Variable", "A predictor kept in the model so the effect of interest "
        "is measured on like-for-like risks", width=WID)
def control_variable() -> Fig:
    f = vcard("Hold the confounder fixed",
              ["η = β₀ + β₁(variable of interest) + β₂(control)",
               "β₁ is now a like-for-like effect"])

    ax = vaxes(f, 0, 10, 0, 60, left=44, top=52, bottom=54)
    ax.frame(xlabel="vehicle age", xticks=[], yticks=[], ylabel="frequency")
    u = _rng(7)
    groups = ((14, BLUE, "low mileage"), (34, AMBER, "high mileage"))
    for b0, colour, name in groups:
        for k in range(7):
            x = 1.0 + k * 1.25 + (0 if colour is BLUE else 1.6)
            ax.point(x, b0 + 1.5 * x + (u() - 0.5) * 7, colour=colour, r=3)
        ax.curve(lambda x, b0=b0: b0 + 1.5 * x, colour=colour, width=1.8)
        ax.label(9.7, b0 + 1.5 * 9.7, name, cls="sm", fill=colour, anchor="end",
                 dy=-7)
    ax.curve(lambda x: 6 + 4.4 * x, colour=ROSE, width=2.2, dash=True)
    ax.label(3.4, 6 + 4.4 * 3.4, "ignoring mileage", cls="sm", fill=ROSE,
             anchor="end", dy=14)
    f.text(BX0 + 12, BY1 - 8, "the pooled slope overstates the effect",
           cls="sm dim", anchor="start")
    return f


@figure("Offset Variable", "Exposure entering the model with its coefficient fixed at "
        "one", width=WID)
def offset_variable() -> Fig:
    f = vcard("Exposure enters with coefficient 1",
              ["ln μ = ln(exposure) + β₀ + Σ βⱼxⱼ", "μ / exposure = e^(β₀ + Σ βⱼxⱼ)"])

    rows = [(0.25, 0.025), (0.5, 0.050), (1.0, 0.100), (2.0, 0.200)]
    ax = vaxes(f, 0, 2.3, 0, 0.235, left=54, top=54, bottom=52)
    ax.frame(xlabel="exposure (years)", xticks=[0, 1, 2], yticks=[0, 0.1, 0.2],
             yfmt=lambda v: f"{v:g}", ylabel="expected claims")
    ax.curve(lambda e: 0.1 * e, colour=BLUE, width=2.4)
    for e, mu in rows:
        ax.point(e, mu, colour=BLUE, r=3.6)
        ax.label(e, mu, f"{mu:.3f}", cls="sm", dy=-9, dx=-4, anchor="end")
    f.text(BX0 + 12, BY1 - 8, "double the exposure, double the count",
           cls="sm dim", anchor="start")
    return f


@figure("Multicollinearity", "Two predictors moving together, and the variance "
        "inflation that follows", width=WID)
def multicollinearity() -> Fig:
    f = vcard("Predictors that carry the same information",
              ["VIF ⱼ = 1 / (1 − R²ⱼ)", "SE(β̂ⱼ) inflated by √VIF"])

    ax = vaxes(f, 0, 10, 0, 10, left=50, top=48, bottom=132)
    ax.frame(xlabel="vehicle age", xticks=[], yticks=[], ylabel="vehicle value")
    u = _rng(515)
    for _ in range(26):
        x = u() * 9.4 + 0.3
        ax.point(x, max(0.3, min(9.7, 9.6 - 0.95 * x + (u() - 0.5) * 1.5)),
                 colour=BLUE, r=3)
    ax.label(6.6, 8.4, "r = −0.94", cls="sm bold", fill=ROSE)

    bars = [("uncorrelated", 1.0, GREEN), ("r = 0.92", 12.5, ROSE)]
    bx = BX0 + 74
    for i, (name, vif, colour) in enumerate(bars):
        y = BY1 - 96 + i * 42
        w = 6 + vif * 13
        f.rect(bx, y, w, 26, rx=4, fill=colour, fill_opacity="0.65")
        f.text(bx - 8, y + 18, name, cls="sm", anchor="end")
        f.text(bx + w + 8, y + 18, f"VIF {vif:g}", cls="sm bold", anchor="start",
               fill=colour)
    return f


# ── evaluating the model ─────────────────────────────────────────────────────

@figure("AIC", "The AIC curve bottoming out where fit stops paying for its "
        "parameters", width=WID)
def aic() -> Fig:
    f = vcard("Fit, minus a price per parameter",
              ["AIC = −2ℓ(β̂) + 2p", "smaller is better"])

    ax = vaxes(f, 0.4, 7.6, 4080, 4180, left=56, top=48, bottom=50)
    ax.frame(xlabel="parameters p", xticks=[1, 3, 5, 7],
             xfmt=lambda t: f"{t:.0f}", yticks=[4100, 4150],
             yfmt=lambda v: f"{v:,.0f}", ylabel="AIC")
    vals = {1: 4172, 2: 4131, 3: 4102, 4: 4085, 5: 4089, 6: 4096, 7: 4108}
    ax.polyline(sorted(vals.items()), colour=BLUE, width=2.4)
    for p_, v in sorted(vals.items()):
        ax.point(p_, v, colour=BLUE, r=3.2)
    ax.point(4, vals[4], colour=ROSE, r=5)
    ax.label(4, vals[4], "best AIC", cls="sm bold", fill=ROSE, dy=20)
    f.text(BX0 + 12, BY1 - 8, "adding terms stops paying at p = 4", cls="sm dim",
           anchor="start")
    return f


@figure("BIC", "BIC's heavier parameter penalty choosing a smaller model than AIC",
        width=WID)
def bic() -> Fig:
    f = vcard("A heavier price per parameter",
              ["BIC = −2ℓ(β̂) + p·ln n", "ln n > 2 whenever n ≥ 8"])

    ax = vaxes(f, 0.4, 7.6, 0, 60, left=48, top=52, bottom=50)
    ax.frame(xlabel="parameters p", xticks=[1, 3, 5, 7],
             xfmt=lambda t: f"{t:.0f}", yticks=[], ylabel="penalty")
    ax.curve(lambda p_: 2 * p_, colour=BLUE, width=2.4)
    ax.curve(lambda p_: math.log(500) * p_, colour=ROSE, width=2.4)
    ax.label(6.4, 2 * 6.4, "AIC:  2p", cls="sm", fill=BLUE, anchor="end", dy=14)
    ax.label(4.6, math.log(500) * 4.6, "BIC:  p·ln n", cls="sm", fill=ROSE,
             anchor="end", dy=-8)
    f.text(BX0 + 12, BY1 - 8, "n = 500 → ln n = 6.2, so BIC picks sparser models",
           cls="sm dim", anchor="start")
    return f


@figure("Deviance", "Deviance as the gap between the fitted model's likelihood and "
        "the saturated model's", width=WID)
def deviance() -> Fig:
    f = vcard("Distance from a perfect fit",
              ["D = −2[ℓ(fitted) − ℓ(saturated)]", "ΔD between nested models ~ χ²"])

    levels = [("saturated model", 0.0, GREEN, "one parameter per row"),
              ("fitted model", 30.8, BLUE, "D = 30.8"),
              ("null model", 45.2, "var(--dim)", "intercept only")]
    ax = vaxes(f, 0, 10, -4, 52, left=40, top=44, bottom=48)
    ax.frame(xticks=[], yticks=[0, 20, 40], ylabel="deviance")
    for name, d, colour, note in levels:
        f.line(ax.px(0.6), ax.py(d), ax.px(9.4), ax.py(d), cls="thin",
               stroke=colour, stroke_width="2.2")
        f.text(ax.px(0.8), ax.py(d) - 8, name, cls="sm bold", anchor="start",
               fill=colour)
        f.text(ax.px(9.2), ax.py(d) - 8, note, cls="sm dim", anchor="end")
    f.arrow(ax.px(5), ax.py(45.2), ax.px(5), ax.py(30.8), colour=ROSE, width=1.8)
    f.text(ax.px(5) + 8, (ax.py(45.2) + ax.py(30.8)) / 2 + 4, "ΔD = 14.4 on 2 df",
           cls="sm bold", anchor="start", fill=ROSE)
    return f


@figure("R-Squared", "The total sum of squares split into the part the model explains "
        "and the part it does not", width=WID)
def r_squared() -> Fig:
    f = vcard("The share of variation explained",
              ["R² = 1 − RSS / SS_Tot", "= SS_Reg / SS_Tot"])

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
    f = vcard("Add up the squared misses",
              ["RSS = Σ (yᵢ − ŷᵢ)²", "least squares minimises it"])

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
    f = vcard("Split the variation, then take a ratio",
              ["F = (SS_Reg / p) / (RSS / (n − p − 1))", "MS = SS / df"])

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
    f = vcard("Estimate, error, test, relativity",
              ["z = β̂ⱼ / SE(β̂ⱼ)", "relativity = e^β̂ⱼ (log link)"])

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
    f = vcard("Add terms while they earn their place",
              ["compare candidates on AIC / BIC", "or on held-out error"])

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
    f = vcard("Score the model on data it never saw",
              ["CV(k) = (1/k) Σ MSEⱼ", "k = 5 or 10 is the usual choice"])

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
    f = vcard("Squared bias down, variance up",
              ["E[(y₀ − f̂(x₀))²] = Bias² + Var + σ²", "test error is U-shaped"])

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
    f = vcard("Residuals against fitted values",
              ["eᵢ = yᵢ − ŷᵢ", "want a flat, even band around 0"])

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
    f = vcard("Quantiles against quantiles",
              ["plot x₍ᵢ₎ against F⁻¹(i / (n + 1))", "a straight line means it fits"])

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
    f = vcard("Does the model track the data here?",
              ["compare E[y | x] observed vs fitted", "one predictor at a time"])

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
    f = vcard("What a new variable adds, net of the rest",
              ["y residuals vs x residuals", "the slope is that variable's β̂"])

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
    f = vcard("Look at the data before modelling it",
              ["shape, spread, outliers, relationships", "one plot per question"])

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
    f = vcard("Bin the data, then compare shapes",
              ["bar height = nⱼ / (n · w)", "area of all bars = 1"])

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
    f = vcard("Five numbers, a box, and the outliers",
              ["IQR = Q₃ − Q₁", "outlier beyond Q₃ + 1.5·IQR"])

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
    f = vcard("Three views of one variable",
              ["shape · outliers · quantiles", "no second variable involved"])

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
    f = vcard("Two variables, one point per record",
              ["read direction, form, strength, outliers",
               "r near 0 rules out a line, not a curve"])

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
    f = vcard("How tightly two variables move together",
              ["ρ = Cov(X, Y) / (σ_X σ_Y)", "−1 ≤ ρ ≤ 1"])

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
