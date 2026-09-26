"""Figures for the Exam MAS-II (Modern Actuarial Statistics II) concept pages.

Same contract as `figures_exam_p.py` / `figures_exam_fm.py`: each builder returns
a `Fig` from `vcard()` carrying one picture and nothing else — no title, no
formula, no caption, no table. Grouped in syllabus order:

A. Credibility — classical, Bühlmann, Bayesian, empirical Bayes
B. Linear mixed models — fixed/random effects, variance components, REML, BLUP
C. Statistical learning — the framework, trees and ensembles, PCA, clustering,
   neural networks, model evaluation
D. Time series — stationarity, ACF/PACF, ARIMA, trend and seasonality

Consistent examples run through the families, as on the other exams: the
credibility figures all price the same 300-claim class against a 1,082-claim
standard, the mixed-model figures all use the same five grouped territories, and
the time-series figures all draw the same quarterly loss index.

Thirteen concepts on this syllabus are also on MAS-I (`AIC`, `BIC`,
`Aggregate Loss Model`, `Bias-Variance Tradeoff`, `Cross-Validation`, `Frequency`,
`Generalized Linear Model`, `Likelihood Ratio Test`, `Linear Mixed Model`,
`Model Structure`, `Residual Sum of Squares`, `Severity`, `Variable Selection`).
They are drawn by `figures_exam_mas_i.py` and deliberately absent here — two
builders for one concept would fight over the same slug.
"""

from __future__ import annotations

import math

from figure_kit import (
    AMBER, BLUE, GREEN, ROSE, SERIES, VIOLET,
    Axes, Fig, brace, vaxes, vcard,
    BX0, BY0, BX1, BY1, BCX, BCY,
)
from figure_registry import figure

WID = 340   # the |NNN| every portrait embed asks for


# ── small numeric helpers (no dependencies, deterministic) ───────────────────
def _npdf(x, mu=0.0, sd=1.0):
    return math.exp(-((x - mu) ** 2) / (2 * sd * sd)) / (sd * math.sqrt(2 * math.pi))


def _pois(k, lam):
    return math.exp(-lam) * lam ** k / math.factorial(k)


def _nbin(k, r, beta):
    """Negative binomial pmf in the (r, beta) parameterization Tse uses."""
    p = 1.0 / (1.0 + beta)
    return math.comb(k + r - 1, k) * p ** r * (1 - p) ** k


def _gamma_pdf(x, alpha, theta):
    if x <= 0:
        return 0.0
    return (x ** (alpha - 1) * math.exp(-x / theta)
            / (theta ** alpha * math.gamma(alpha)))


class _Rand:
    """A tiny LCG so every scatter comes out identical on every machine."""

    def __init__(self, seed: int):
        self.s = seed

    def u(self) -> float:
        self.s = (1103515245 * self.s + 12345) % 2147483648
        return self.s / 2147483648

    def n(self, mu=0.0, sd=1.0) -> float:
        u1, u2 = self.u() + 1e-9, self.u()
        return mu + sd * math.sqrt(-2 * math.log(u1)) * math.cos(2 * math.pi * u2)


# ═══════════════════════════════════════════════════════════════════════════
# A. Credibility
# ═══════════════════════════════════════════════════════════════════════════

@figure("Credibility Theory", "A seesaw balancing the manual rate of 380 against the "
        "class's own 420, weighted 1 − Z and Z, so it tips at the estimate 401",
        width=WID)
def credibility_theory() -> Fig:
    f = vcard()

    z = 0.527                      # 300 claims against the 1,082-claim standard
    xl, xr = 64, 296               # the manual rate 380 and the class's own 420
    xf = xl + (xr - xl) * z        # the balance point: 401
    beam, ground, bw, tall = 262, 312, 58, 230
    for x, share, colour, name, weight in ((xl, 1 - z, AMBER, "manual", "1 − Z"),
                                           (xr, z, BLUE, "own data", "Z")):
        h = tall * share
        f.rect(x - bw / 2, beam - h, bw, h, rx=4, fill=colour, fill_opacity="0.3",
               stroke=colour, stroke_width="1.4")
        f.text(x, beam - h / 2 + 4, weight, cls="bold")
        f.text(x, beam - h - 10, name, cls="sm")
        f.line(x, beam + 6, x, ground, cls="thin dash", stroke="var(--axis)",
               stroke_width="1.1")
    f.rect(xl - bw / 2 - 4, beam, xr - xl + bw + 8, 6, rx=3, fill="var(--ink)",
           fill_opacity="0.7")
    f.polygon([(xf, beam + 6), (xf - 20, ground), (xf + 20, ground)], fill=GREEN,
              fill_opacity="0.3", stroke=GREEN, stroke_width="1.4",
              stroke_linejoin="round")
    f.line(BX0 + 8, ground, BX1 - 8, ground, cls="axis")
    for x, lab, cls in ((xl, "380", "sm dim"), (xf, "401", "bold"),
                        (xr, "420", "sm dim")):
        f.text(x, ground + 19, lab, cls=cls)
    return f


@figure("Limited Fluctuation Credibility", "The square-root credibility curve rising "
        "to full credibility at the 1,082-claim standard, with 300 claims earning 0.53",
        width=WID)
def limited_fluctuation() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 2000, 0, 1.15, left=42, right=16, top=26, bottom=44)
    ax.frame(xticks=[0, 500, 1000, 1500, 2000],
             yticks=[0, 0.5, 1.0], grid=True,
             xfmt=lambda t: f"{t/1000:.1f}k" if t else "0")
    ax.curve(lambda n: min(math.sqrt(n / 1082), 1.0), colour=BLUE, width=2.4)
    ax.hline(1.0, colour="var(--dim)", x_to=2000, label=None)
    ax.vline(1082, colour=GREEN, y_top=1.0)
    ax.label(1082, 1.0, "n_F = 1,082", cls="sm bold", dy=-8, dx=-4, anchor="end")
    ax.point(300, math.sqrt(300 / 1082), colour=AMBER, label="Z = 0.53", dy=15, dx=30)
    f.text(BCX, ax.y1 + 32, "claims n", cls="sm dim")
    return f


@figure("Full Credibility Standard", "A normal curve with 90% of its area shaded "
        "inside ±5% of the true mean, the band that sets the full-credibility claim count",
        width=WID)
def full_credibility_standard() -> Fig:
    f = vcard()

    ax = vaxes(f, -3.6, 3.6, 0, 0.45, left=26, right=16, top=30, bottom=64)
    ax.area(lambda x: _npdf(x), -1.645, 1.645, colour=BLUE, opacity="0.22")
    ax.curve(lambda x: _npdf(x), colour=BLUE, width=2.2)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    for v, lab in ((-1.645, "μ(1−k)"), (0, "μ"), (1.645, "μ(1+k)")):
        x = ax.px(v)
        f.line(x, ax.y1, x, ax.y1 + 4, cls="tick")
        f.text(x, ax.y1 + 17, lab, cls="sm dim")
        if v:
            f.line(x, ax.y1, x, ax.py(_npdf(v)), cls="thin dash",
                   stroke="var(--dim)", stroke_width="1.1")
    f.text(ax.px(0), ax.py(0.17), "p = 90%", cls="bold", fill=BLUE)
    brace(f, ax.px(-1.645), ax.px(1.645), ax.y1 + 26, depth=7, label="±k = ±5%")
    return f


@figure("Partial Credibility", "The square-root credibility curve above the "
        "proportional diagonal, lifting 300 claims from 0.28 of the standard to a "
        "weight of 0.53", width=WID)
def partial_credibility() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 1, 0, 1.05, left=42, right=18, top=24, bottom=44)
    ax.frame(xticks=[0, 0.25, 0.5, 0.75, 1],
             yticks=[0, 0.5, 1.0], grid=True)
    ax.curve(lambda t: math.sqrt(t), colour=BLUE, width=2.4)
    ax.curve(lambda t: t, colour="var(--dim)", width=1.6, dash=True)
    ax.label(0.55, 0.80, "√(n/n_F)", cls="sm bold", fill=BLUE, dy=-4)
    ax.label(0.80, 0.72, "n/n_F", cls="sm dim", dy=6)
    t = 300 / 1082
    f.line(ax.px(t), ax.py(t), ax.px(t), ax.py(math.sqrt(t)), cls="thin",
           stroke=AMBER, stroke_width="2.2")
    ax.point(t, t, colour="var(--dim)", r=3.2)
    ax.point(t, math.sqrt(t), colour=AMBER)
    ax.label(t, math.sqrt(t), "0.53", cls="sm bold", anchor="end", dx=-8, dy=-4)
    ax.label(t, t, "0.28", cls="sm", anchor="start", dx=8, dy=10)
    f.text(BCX, ax.y1 + 32, "n / n_F", cls="sm dim")
    return f


@figure("Bühlmann Credibility", "The Bühlmann credibility curve Z = n/(n+k) for k = 2, "
        "6 and 20, each crossing one half where n equals k", width=WID)
def buhlmann_credibility() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 30, 0, 1.05, left=42, right=44, top=24, bottom=44)
    ax.frame(xticks=[0, 10, 20, 30], yticks=[0, 0.5, 1.0], grid=True)
    for k, colour in ((2, GREEN), (6, BLUE), (20, ROSE)):
        ax.curve(lambda n, k=k: n / (n + k), colour=colour, width=2.2)
        ax.label(30, 30 / (30 + k), f"k = {k}", cls="sm bold", fill=colour,
                 anchor="start", dx=6, dy=4)
    ax.point(6, 0.5, colour=BLUE)
    ax.label(6, 0.5, "n = k", cls="sm", anchor="start", dx=8, dy=-8)
    f.text(BCX, ax.y1 + 32, "years n", cls="sm dim")
    return f


@figure("Expected Value of Process Variance", "Three risks' loss distributions, each "
        "with the same within-risk spread marked across it; averaging that spread "
        "gives v", width=WID)
def epv() -> Fig:
    f = vcard()

    ax = vaxes(f, -1.2, 5.2, 0, 0.7, left=24, right=16, top=30, bottom=44)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    for mu, colour in ((0.6, GREEN), (2.0, BLUE), (3.6, ROSE)):
        ax.area(lambda x, m=mu: _npdf(x, m, 0.62), mu - 1.9, mu + 1.9,
                colour=colour, opacity="0.14")
        ax.curve(lambda x, m=mu: _npdf(x, m, 0.62), colour=colour, width=1.9)
        y = ax.py(_npdf(mu + 0.62, mu, 0.62))
        for sgn in (-1, 1):
            f.arrow(ax.px(mu), y, ax.px(mu + sgn * 0.62), y, colour=colour, width=1.8)
    f.text(BCX, ax.y1 + 24, "v = 0.38", cls="bold")
    return f


@figure("Variance of Hypothetical Means", "Three risks' loss distributions with their "
        "means marked on the axis and a brace spanning them: the spread of the means "
        "is a", width=WID)
def vhm() -> Fig:
    f = vcard()

    ax = vaxes(f, -1.2, 5.2, 0, 0.7, left=24, right=16, top=30, bottom=56)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    mus = (0.6, 2.0, 3.6)
    for mu, colour in zip(mus, (GREEN, BLUE, ROSE)):
        ax.curve(lambda x, m=mu: _npdf(x, m, 0.62), colour=colour, width=1.5)
        ax.vline(mu, colour=colour, y_top=_npdf(mu, mu, 0.62), dash=False)
        ax.point(mu, 0, colour=colour, r=4)
    brace(f, ax.px(mus[0]), ax.px(mus[2]), ax.y1 + 12, depth=9, colour=VIOLET,
          label="a = 1.50", label_cls="bold")
    return f


@figure("Bühlmann-Straub Credibility", "Five years drawn as bars as wide as their "
        "exposure, beside a complement block as wide as k = 480; the exposure-weighted "
        "level across them all is the estimate, and the years carry Z = 0.73",
        width=WID)
def buhlmann_straub() -> Fig:
    f = vcard()

    exposures = [140, 260, 190, 410, 320]      # m = 1,320
    ratios = [0.82, 0.64, 0.74, 0.58, 0.69]    # each year's observed loss ratio
    k, mu = 480, 0.75                          # the complement, as k units of exposure
    x0, x1, base, top, gap = 34, 326, 334, 120, 3
    scale = (x1 - x0 - len(exposures) * gap) / (sum(exposures) + k)
    hy = lambda v: base - (base - top) * v
    x = x0
    for m, v in zip(exposures, ratios):
        f.rect(x, hy(v), m * scale, base - hy(v), rx=2, fill=BLUE, fill_opacity="0.45",
               stroke=BLUE, stroke_width="1.2")
        x += m * scale + gap
    xm, wk = x - gap, k * scale
    f.rect(x, hy(mu), wk, base - hy(mu), rx=2, fill=AMBER, fill_opacity="0.4",
           stroke=AMBER, stroke_width="1.2")
    est = ((sum(m * v for m, v in zip(exposures, ratios)) + k * mu)
           / (sum(exposures) + k))
    f.line(x0 - 6, hy(est), x1 + 6, hy(est), cls="thin dash", stroke="var(--ink)",
           stroke_width="1.6")
    f.text(x + wk / 2, hy(est) + 16, "estimate", cls="sm")
    f.line(x0 - 6, base, x1 + 6, base, cls="axis")
    f.text((x0 + xm) / 2, hy(max(ratios)) - 14, "Z = 0.73", cls="bold")
    brace(f, x0, xm, base + 8, depth=8, colour=BLUE, label="m = 1,320",
          label_cls="sm bold")
    brace(f, x, x + wk, base + 8, depth=8, colour=AMBER, label="k = 480",
          label_cls="sm bold")
    return f


@figure("Bayesian Credibility", "A dashed Gamma prior and the posterior it becomes "
        "after three years with one claim, its mean 0.231 pulled off the prior mean μ "
        "toward the observed mean x̄", width=WID)
def bayesian_credibility() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 0.9, 0, 4.4, left=26, right=16, top=34, bottom=40)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    ax.curve(lambda t: _gamma_pdf(t, 2, 0.10), colour="var(--dim)", width=1.8,
             dash=True)
    ax.area(lambda t: _gamma_pdf(t, 3, 0.0769), 0.001, 0.9, colour=BLUE,
            opacity="0.16")
    ax.curve(lambda t: _gamma_pdf(t, 3, 0.0769), colour=BLUE, width=2.3)
    ax.label(0.45, 0.9, "prior", cls="sm bold", anchor="start")
    ax.label(0.31, 2.3, "posterior", cls="sm bold", fill=BLUE, anchor="start")
    ax.vline(0.20, colour="var(--dim)", y_top=4.2, label="μ", label_cls="sm bold")
    ax.vline(0.333, colour=AMBER, y_top=4.2, label="x̄", label_cls="sm bold")
    ax.vline(0.231, colour=GREEN, y_top=4.2, dash=False)
    f.text(ax.px(0.231), ax.y1 + 17, "0.231", cls="sm bold")
    return f


@figure("Conjugate Prior", "A Gamma(2, 0.10) prior curve, an arrow carrying three "
        "years of Poisson data with one claim, and the Gamma(3, 0.077) posterior "
        "curve of the same family", width=WID)
def conjugate_prior() -> Fig:
    f = vcard()

    base = 292
    for x0, x1, a, th, colour, name, law in (
            (30, 142, 2, 0.10, VIOLET, "prior", "Gamma(2, 0.10)"),
            (218, 330, 3, 0.0769, BLUE, "posterior", "Gamma(3, 0.077)")):
        ax = Axes(f, x0, 128, x1, base, 0, 0.7, 0, 4.0)
        ax.area(lambda t, a=a, th=th: _gamma_pdf(t, a, th), 0.001, 0.7,
                colour=colour, opacity="0.2")
        ax.curve(lambda t, a=a, th=th: _gamma_pdf(t, a, th), colour=colour,
                 width=2.3, xa=0.001)
        f.line(x0, base, x1, base, cls="axis")
        f.text((x0 + x1) / 2, 112, name, cls="sm bold")
        f.text((x0 + x1) / 2, base + 22, law, cls="sm")
    # the data: three policy years, one of them with a claim
    for j in range(3):
        x = 150 + j * 21
        f.rect(x, 192, 18, 18, rx=3, fill=AMBER, fill_opacity="0.18", stroke=AMBER,
               stroke_width="1.2")
        if j == 1:
            f.circle(x + 9, 201, 4, fill=AMBER)
    f.text(180, 186, "Poisson", cls="sm")
    f.arrow(150, 228, 212, 228, colour="var(--ink)", width=1.8)
    return f


@figure("Predictive Distribution", "Poisson(1) claim-count bars beside the wider "
        "negative binomial bars that mixing λ over a Gamma produces", width=WID)
def predictive_distribution() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.7, 6.7, 0, 0.5, left=40, right=14, top=24, bottom=44)
    ax.frame(xlabel="claims", xticks=[0, 1, 2, 3, 4, 5, 6], yticks=[0, 0.2, 0.4],
             arrows=False)
    for k in range(7):
        p = _pois(k, 1.0)
        q = _nbin(k, 2, 0.5)
        ax.fig.rect(ax.px(k) - 10, ax.py(p), 9, ax.y1 - ax.py(p), rx=1.5,
                    fill="var(--dim)", fill_opacity="0.55")
        ax.fig.rect(ax.px(k) + 1, ax.py(q), 9, ax.y1 - ax.py(q), rx=1.5,
                    fill=BLUE, fill_opacity="0.75")
    f.legend(ax.px(3.3), ax.py(0.4), [("var(--dim)", "Poisson"), (BLUE, "predictive")])
    return f


def _eb_bracket(f: Fig, x, ya, yb, colour, label):
    """A vertical bracket from ya to yb, its label hung off the right side."""
    f.path(f"M{x - 4:.1f},{ya:.1f} H{x:.1f} V{yb:.1f} H{x - 4:.1f}", cls="thin",
           stroke=colour, stroke_width="1.6")
    f.text(x + 6, (ya + yb) / 2 + 4, label, cls="bold", anchor="start")


@figure("Empirical Bayes Credibility", "Five risks' yearly results scattered about "
        "their own means, with one risk's scatter bracketed as v̂ and the spread of "
        "the means bracketed as â", width=WID)
def empirical_bayes() -> Fig:
    f = vcard()

    r = _Rand(7)
    ax = vaxes(f, 0.3, 6.2, 2, 14, left=38, right=14, top=24, bottom=44)
    ax.frame(xticks=[1, 2, 3, 4, 5], yticks=[4, 8, 12], grid=True,
             xfmt=lambda t: f"R{int(t)}")
    means = [5.5, 9.2, 7.0, 11.6, 6.4]
    spread = None
    for i, m in enumerate(means):
        colour = SERIES[i % len(SERIES)]
        pts = [m + r.n(0, 1.15) for _ in range(4)]
        for k, v in enumerate(pts):
            ax.point(i + 1 + (k - 1.5) * 0.11, v, colour=colour, r=2.8)
        ax.fig.line(ax.px(i + 0.78), ax.py(m), ax.px(i + 1.22), ax.py(m),
                    cls="thin", stroke=colour, stroke_width="2.2")
        if i == 1:
            spread = (min(pts), max(pts))
    grand = sum(means) / len(means)
    ax.hline(grand, colour="var(--dim)", x_to=6.2)
    ax.label(0.42, grand, "X̄", cls="sm dim", anchor="start", dy=-5)
    _eb_bracket(f, ax.px(2.3), ax.py(spread[1]), ax.py(spread[0]), "var(--ink)", "v̂")
    _eb_bracket(f, ax.px(5.5), ax.py(max(means)), ax.py(min(means)), VIOLET, "â")
    return f


@figure("Complement of Credibility", "Three stacked bars for a thin class, the "
        "300-claim class and a large class: experience fills Z of each and the "
        "complement carries the rest, shrinking as Z grows", width=WID)
def complement_of_credibility() -> Fig:
    f = vcard()

    base, top, bw = 334, 100, 76
    hy = lambda v: base - (base - top) * v
    splits = []
    for x, z in ((70, 0.15), (180, 0.53), (290, 0.90)):
        f.rect(x - bw / 2, hy(z), bw, base - hy(z), rx=3, fill=BLUE,
               fill_opacity="0.45", stroke=BLUE, stroke_width="1.2")
        f.rect(x - bw / 2, top, bw, hy(z) - top, rx=3, fill=AMBER,
               fill_opacity="0.3", stroke=AMBER, stroke_width="1.2")
        f.text(x, base + 20, f"Z = {z:.2f}", cls="sm bold" if z == 0.53 else "sm")
        splits.append((x, hy(z)))
    for (xa, ya), (xb, yb) in zip(splits, splits[1:]):
        f.line(xa + bw / 2, ya, xb - bw / 2, yb, cls="thin dash", stroke="var(--axis)",
               stroke_width="1.2")
    f.text(70, (top + hy(0.15)) / 2 + 4, "complement", cls="sm")
    f.text(290, (hy(0.90) + base) / 2 + 4, "experience", cls="sm")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Linear mixed models
#
# One running example: five territories, each with its own baseline loss ratio,
# observed over four development periods.
# ═══════════════════════════════════════════════════════════════════════════

_TERR = [(-0.26, 0.052), (-0.11, 0.030), (0.02, 0.041), (0.14, 0.024),
         (0.30, 0.038)]   # (intercept offset, slope offset) per territory


@figure("Fixed Effects", "Five territory bars above and below zero, each its own "
        "separately estimated coefficient β̂, with nothing pulling them toward the mean",
        width=WID)
def fixed_effects() -> Fig:
    f = vcard()

    ax = vaxes(f, 0.3, 5.7, -0.42, 0.42, left=44, right=16, top=24, bottom=40)
    ax.frame(yticks=[-0.3, 0, 0.3], grid=True, arrows=False)
    for i, (b0, _) in enumerate(_TERR):
        f.text(ax.px(i + 1), ax.y1 + 17, f"T{i+1}", cls="sm dim")
        ax.fig.rect(ax.px(i + 0.78), min(ax.py(b0), ax.py(0)),
                    ax.px(1.22) - ax.px(0.78), abs(ax.py(b0) - ax.py(0)), rx=2,
                    fill=BLUE, fill_opacity="0.7")
        ax.label(i + 1, b0, f"β̂{'₁₂₃₄₅'[i]}", cls="sm bold",
                 dy=-7 if b0 > 0 else 15)
    ax.hline(0, colour="var(--axis)", dash=False, x_to=5.7)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="rule")
    return f


@figure("Random Effects", "Each territory's raw deviation pulled toward zero into its "
        "predicted random effect b̂, beside the normal curve the effects are drawn from",
        width=WID)
def random_effects() -> Fig:
    f = vcard()

    ax = vaxes(f, 0.3, 6.5, -0.46, 0.52, left=44, right=10, top=34, bottom=40)
    ax.frame(yticks=[-0.3, 0, 0.3], grid=True, arrows=False)
    zs = [0.35, 0.72, 0.55, 0.86, 0.48]
    for i, ((b0, _), z) in enumerate(zip(_TERR, zs)):
        f.text(ax.px(i + 1), ax.y1 + 17, f"T{i+1}", cls="sm dim")
        x = ax.px(i + 1)
        ax.fig.circle(x - 7, ax.py(b0), 3.6, fill="var(--dim)")
        ax.fig.circle(x + 7, ax.py(b0 * z), 3.8, fill=BLUE)
        ax.fig.arrow(x - 3, ax.py(b0), x + 3.6, ax.py(b0 * z),
                     colour="var(--axis)", width=1.0)
    ax.hline(0, colour="var(--axis)", dash=False, x_to=6.5)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="rule")
    ax.label(5, 0.30, "raw", cls="sm", dx=-7, dy=-9)
    ax.label(5, 0.30 * zs[4], "b̂", cls="sm bold", fill=BLUE, anchor="start", dx=14,
             dy=4)
    # the distribution the effects are drawn from, on its side
    sd = 0.16
    pts = [(ax.px(5.75) + 34 * math.exp(-(v / sd) ** 2 / 2), ax.py(v))
           for v in [(-0.44 + 0.88 * j / 60) for j in range(61)]]
    f.polygon([(ax.px(5.75), ax.py(-0.44))] + pts + [(ax.px(5.75), ax.py(0.44))],
              fill=VIOLET, fill_opacity="0.18", stroke="none")
    f.poly(pts, cls="curve", stroke=VIOLET, stroke_width="1.8")
    ax.label(5.75, 0.44, "N(0, σ²_b)", cls="sm", anchor="start", dy=-8, dx=-6)
    return f


@figure("Hierarchical Model", "A tree from one population node through five territory "
        "nodes to three observations each, its levels marked β₀, bᵢ and εᵢⱼ", width=WID)
def hierarchical_model() -> Fig:
    f = vcard()

    root = (196, 110)
    xs = [76 + j * 60 for j in range(5)]
    ym, yo = 222, 334
    for j, x in enumerate(xs):
        f.line(root[0], root[1] + 15, x, ym - 12, cls="thin", stroke="var(--axis)",
               stroke_width="1.3")
        for dx in (-17, 0, 17):
            f.line(x, ym + 12, x + dx, yo - 7, cls="thin", stroke="var(--axis)",
                   stroke_width="1.1")
    f.circle(*root, 15, fill=VIOLET, fill_opacity="0.25", stroke=VIOLET,
             stroke_width="1.6")
    for j, x in enumerate(xs):
        colour = SERIES[j % len(SERIES)]
        f.circle(x, ym, 12, fill=colour, fill_opacity="0.25", stroke=colour,
                 stroke_width="1.5")
        for dx in (-17, 0, 17):
            f.circle(x + dx, yo, 6.5, fill=colour, fill_opacity="0.55")
    for y, lab in ((root[1], "β₀"), (ym, "bᵢ"), (yo, "εᵢⱼ")):
        f.text(BX0 + 4, y + 5, lab, cls="bold", anchor="start")
    return f


@figure("Random Intercept and Slope", "Five territory lines starting at different "
        "heights and fanning at different slopes around a dashed mean line, the "
        "intercept spread bracketed b₀ᵢ and one line's extra slope marked b₁ᵢ",
        width=WID)
def random_intercept_slope() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 4.4, 0.55, 1.65, left=52, right=16, top=20, bottom=40)
    ax.frame(xticks=[1, 2, 3, 4], yticks=[], grid=True, arrows=False)
    lines = []
    for i, (b0, b1) in enumerate(_TERR):
        a, s = 0.98 + b0, 0.06 + (b1 - 0.037) * 4.0
        lines.append((a, s))
        ax.polyline([(0, a), (4.3, a + s * 4.3)], colour=SERIES[i % len(SERIES)],
                    width=1.8)
        ax.point(0, a, colour=SERIES[i % len(SERIES)], r=3)
    ax.polyline([(0, 0.98), (4.3, 0.98 + 0.06 * 4.3)], colour="var(--ink)", width=2.2,
                dash=True)
    # the intercepts' spread, bracketed on the y axis
    lo, hi = min(a for a, _ in lines), max(a for a, _ in lines)
    xb = ax.x0 - 10
    f.path(f"M{xb + 4:.1f},{ax.py(hi):.1f} H{xb:.1f} V{ax.py(lo):.1f} H{xb + 4:.1f}",
           cls="thin", stroke="var(--ink)", stroke_width="1.5")
    f.text(xb - 5, (ax.py(lo) + ax.py(hi)) / 2 + 4, "b₀ᵢ", cls="bold", anchor="end")
    # the steepest line's extra slope: its own direction against a parallel of the mean
    a, s = lines[0]
    ax.polyline([(0, a), (2.6, a + 0.06 * 2.6)], colour="var(--dim)", width=1.3,
                dash=True)
    x0, y0 = ax.p(0, a)
    r = 118
    t_mean = math.atan2(ax.py(a + 0.06) - y0, ax.px(1) - x0)
    t_own = math.atan2(ax.py(a + s) - y0, ax.px(1) - x0)
    p1 = (x0 + r * math.cos(t_mean), y0 + r * math.sin(t_mean))
    p2 = (x0 + r * math.cos(t_own), y0 + r * math.sin(t_own))
    f.path(f"M{p1[0]:.1f},{p1[1]:.1f} A{r},{r} 0 0 0 {p2[0]:.1f},{p2[1]:.1f}",
           cls="thin", stroke=BLUE, stroke_width="1.6")
    tm = (t_mean + t_own) / 2
    f.text(x0 + (r + 16) * math.cos(tm), y0 + (r + 16) * math.sin(tm) + 4, "b₁ᵢ",
           cls="bold")
    return f


@figure("Variance Components", "One block of total variance 1,250 split into a "
        "between-group slice of 250 and a within-group slice of 1,000", width=WID)
def variance_components() -> Fig:
    f = vcard()

    sb, se = 250.0, 1000.0
    x0, w, ytop, h = 118, 150, 96, 270
    hb = h * sb / (sb + se)
    f.rect(x0, ytop, w, hb, rx=4, fill=VIOLET, fill_opacity="0.5")
    f.rect(x0, ytop + hb + 2, w, h - hb - 2, rx=4, fill=BLUE, fill_opacity="0.35")
    f.text(x0 + w / 2, ytop + hb / 2 + 4, "σ²_b = 250", cls="sm bold")
    f.text(x0 + w / 2, ytop + hb + (h - hb) / 2 + 4, "σ² = 1,000", cls="sm bold")
    f.text(x0 - 10, ytop + hb / 2 + 4, "between", cls="sm", anchor="end")
    f.text(x0 - 10, ytop + hb + (h - hb) / 2 + 4, "within", cls="sm", anchor="end")
    _eb_bracket(f, x0 + w + 14, ytop, ytop + h, "var(--ink)", "1,250")
    return f


@figure("Covariance Structure", "Correlation against lag under three structures: "
        "compound symmetry flat at 0.6, AR(1) decaying as 0.6ᵏ, and unstructured "
        "scattered freely", width=WID)
def covariance_structure() -> Fig:
    f = vcard()

    ax = vaxes(f, 0.5, 3.5, 0, 1.0, left=44, right=16, top=30, bottom=44)
    ax.frame(xlabel="lag", ylabel="ρ", xticks=[1, 2, 3], yticks=[0, 0.5, 1.0],
             grid=True, arrows=False)
    ax.polyline([(0.7, 0.6), (3.3, 0.6)], colour=BLUE, width=2.4)
    ax.curve(lambda k: 0.6 ** k, colour=AMBER, width=2.4, xa=0.7, xb=3.3)
    for k in (1, 2, 3):
        ax.point(k, 0.6, colour=BLUE, r=4)
        ax.point(k, 0.6 ** k, colour=AMBER, r=4)
    for k, v in ((0.9, .71), (1.0, .55), (1.1, .63), (1.95, .28), (2.05, .19),
                 (3.0, .44)):
        f.rect(ax.px(k) - 4, ax.py(v) - 4, 8, 8, rx=1.5, fill=VIOLET,
               fill_opacity="0.8")
    ax.label(3.3, 0.6, "compound symmetry", cls="sm bold", anchor="end", dy=-9)
    ax.label(3.3, 0.6 ** 3.3, "AR(1)", cls="sm bold", anchor="end", dy=-9)
    ax.label(3.0, 0.44, "unstructured", cls="sm bold", anchor="end", dx=-9, dy=4)
    return f


@figure("Intraclass Correlation", "An axis bar split into the between-group share 0.20 "
        "and the within-group 0.80, under the design-effect line that reaches 4.8 at "
        "that share", width=WID)
def intraclass_correlation() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 1, 0, 21, left=44, right=18, top=24, bottom=62)
    ax.frame(yticks=[1, 10, 20], grid=True, arrows=False)
    ax.curve(lambda p: 1 + 19 * p, colour=ROSE, width=2.4)
    rho = 0.2
    ax.vline(rho, colour="var(--dim)", y_top=1 + 19 * rho)
    ax.hline(1 + 19 * rho, colour="var(--dim)", x_to=rho)
    ax.point(rho, 1 + 19 * rho, colour=ROSE, r=4.2, label="4.8", dx=-14, dy=-8,
             cls="sm bold")
    ax.label(0.55, 1 + 19 * 0.55, "design effect", cls="sm bold", anchor="start",
             dx=10, dy=8)
    # the ρ axis drawn as the variance itself: between share, then within
    y, h = ax.y1 + 6, 22
    xs = ax.px(rho)
    f.rect(ax.x0, y, xs - ax.x0, h, rx=3, fill=VIOLET, fill_opacity="0.55")
    f.rect(xs + 1.5, y, ax.x1 - xs - 1.5, h, rx=3, fill=BLUE, fill_opacity="0.3")
    f.text((ax.x0 + xs) / 2, y + 15, "between", cls="sm")
    f.text((xs + ax.x1) / 2, y + 15, "within", cls="sm")
    f.text(xs, y + h + 16, "ρ = 0.20", cls="sm bold")
    return f


@figure("Restricted Maximum Likelihood", "The sampling distribution of the ML variance "
        "estimate centred below the truth, and REML's centred on it", width=WID)
def reml() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 1.9, 0, 2.6, left=40, right=16, top=32, bottom=44)
    ax.frame(xlabel="σ̂²", xticks=[0.5, 1.0, 1.5], yticks=[], grid=True)
    ax.curve(lambda s: _npdf(s, 0.86, 0.20), colour=ROSE, width=2.2)
    ax.curve(lambda s: _npdf(s, 1.00, 0.21), colour=BLUE, width=2.2)
    ax.vline(1.0, colour="var(--dim)", y_top=2.3)
    ax.label(1.0, 2.3, "truth", cls="sm dim", dy=-6)
    ax.label(0.66, 1.55, "ML", cls="sm bold", fill=ROSE, anchor="end")
    ax.label(1.34, 1.55, "REML", cls="sm bold", fill=BLUE, anchor="start")
    return f


@figure("Best Linear Unbiased Predictor", "A group's fitted value rising with its size "
        "from the overall mean 200 toward its raw mean 260, with a group of six shrunk "
        "to 236", width=WID)
def blup() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 22, 186, 272, left=44, right=18, top=24, bottom=44)
    ax.frame(xticks=[0, 5, 10, 15, 20], yticks=[200, 260], grid=True)
    ax.hline(260, colour=ROSE, x_to=22)
    ax.hline(200, colour="var(--dim)", x_to=22)
    ax.label(21.8, 260, "raw", cls="sm bold", anchor="end", dy=-6)
    ax.label(21.8, 200, "mean", cls="sm dim", anchor="end", dy=-6)
    ax.curve(lambda n: 200 + 60 * n / (n + 4), colour=BLUE, width=2.4)
    f.arrow(ax.px(6), ax.py(260), ax.px(6), ax.py(237.5), colour=ROSE, width=1.8)
    ax.point(6, 236, colour=GREEN, r=4.4)
    ax.label(6, 236, "236", cls="sm bold", anchor="start", dx=9, dy=12)
    f.text(BCX, ax.y1 + 32, "group size nᵢ", cls="sm dim")
    return f


@figure("Linear Algebra", "A 5 × 3 design matrix X times a 3 × 1 coefficient vector β "
        "giving a 5 × 1 vector of fitted values ŷ, drawn as grids of cells", width=WID)
def linear_algebra() -> Fig:
    f = vcard()

    cw, ch, top = 30, 32, 150

    def matrix(x, rows, cols, name, dims, colour):
        y = top + (5 - rows) * ch / 2
        f.rect(x - 5, y - 5, cols * cw + 10, rows * ch + 10, rx=5,
               fill=colour, fill_opacity="0.10", stroke=colour, stroke_width="1.3")
        for i in range(rows):
            for j in range(cols):
                f.rect(x + j * cw + 2, y + i * ch + 2, cw - 4, ch - 4, rx=2,
                       fill=colour, fill_opacity="0.35")
        mid = x + cols * cw / 2
        f.text(mid, top - 18, name, cls="bold")
        f.text(mid, top + 5 * ch + 26, dims, cls="sm dim")
        return x + cols * cw + 5

    ymid = top + 5 * ch / 2 + 5
    x = matrix(66, 5, 3, "X", "n × p", BLUE)
    f.text(x + 17, ymid, "×", cls="bold")
    x = matrix(x + 34, 3, 1, "β", "p × 1", AMBER)
    f.text(x + 17, ymid, "=", cls="bold")
    matrix(x + 34, 5, 1, "ŷ", "n × 1", GREEN)
    return f


# ═══════════════════════════════════════════════════════════════════════════
# C. Statistical learning
# ═══════════════════════════════════════════════════════════════════════════

def _tree(f: Fig, x, y, depth, spread, dy, colour, leaf_colours=None, r=7,
          level=0):
    """A little binary tree, drawn recursively. Returns the leaf centres."""
    if depth == 0:
        c = (leaf_colours[level % len(leaf_colours)] if leaf_colours else colour)
        f.rect(x - 9, y - 7, 18, 14, rx=3, fill=c, fill_opacity="0.55")
        return [(x, y)]
    f.circle(x, y, r, fill=colour, fill_opacity="0.2", stroke=colour,
             stroke_width="1.4")
    out = []
    for sgn in (-1, 1):
        xc = x + sgn * spread
        f.line(x + sgn * 5, y + 5, xc, y + dy - 8, cls="thin",
               stroke="var(--axis)", stroke_width="1.2")
        out += _tree(f, xc, y + dy, depth - 1, spread / 2, dy, colour,
                     leaf_colours, r, level + (0 if sgn < 0 else 1))
    return out


@figure("Statistical Learning", "A curve f̂ fitted through filled training points, "
        "judged by the gaps to hollow test points it never saw", width=WID)
def statistical_learning() -> Fig:
    f = vcard()

    r = _Rand(5)
    true_f = lambda x: 2.2 + 0.55 * x + 1.5 * math.sin(0.85 * x)
    fit = lambda x: 2.35 + 0.53 * x + 1.35 * math.sin(0.85 * x - 0.05)
    ax = vaxes(f, 0, 10, 1.8, 10, left=36, right=14, top=24, bottom=40)
    ax.frame(xlabel="X", ylabel="Y", xticks=[], yticks=[])
    ax.curve(fit, colour=VIOLET, width=2.6, xa=0.3, xb=9.7)
    for _ in range(16):
        x = 0.4 + 9.2 * r.u()
        ax.point(x, true_f(x) + r.n(0, 0.7), colour=BLUE, r=3.4)
    for x in (1.3, 3.1, 4.6, 6.2, 7.4, 8.9):
        y = true_f(x) + r.n(0, 0.9)
        if x == 6.2:
            ax.label(x, y, "test", cls="sm bold", dy=18)
        f.line(ax.px(x), ax.py(y), ax.px(x), ax.py(fit(x)), cls="thin",
               stroke=ROSE, stroke_width="1.8")
        f.circle(ax.px(x), ax.py(y), 4.2, fill="var(--surf)", stroke=ROSE,
                 stroke_width="1.8")
    ax.label(9.7, fit(9.7), "f̂", cls="bold", anchor="start", dx=6, dy=5)
    ax.label(5.2, 6.4, "training", cls="sm bold", fill=BLUE)
    return f


@figure("Supervised Learning", "Labelled claim and no-claim points on either side of "
        "a fitted boundary f̂", width=WID)
def supervised_learning() -> Fig:
    f = vcard()

    r = _Rand(11)
    ax = vaxes(f, 0, 10, 0, 10, left=20, right=6, top=6, bottom=10)
    f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=6, fill="var(--soft)",
           stroke="var(--edge)")
    for _ in range(26):
        x, y = 1 + 8 * r.u(), 1 + 8 * r.u()
        pos = y > 0.85 * x + 1.1
        ax.point(x, y, colour=ROSE if pos else BLUE, r=3.8)
    ax.polyline([(0.4, 1.44), (9.6, 9.26)], colour="var(--ink)", width=2)
    ax.label(8.6, 8.4, "f̂", cls="bold", anchor="start", dx=8)
    ax.label(1.6, 9.2, "claim", cls="sm bold", anchor="start")
    ax.label(8.4, 0.6, "no claim", cls="sm bold", anchor="end")
    return f


@figure("Unsupervised Learning", "Unlabelled grey points with no response, and the "
        "three groups hiding in them circled", width=WID)
def unsupervised_learning() -> Fig:
    f = vcard()

    r = _Rand(23)
    ax = vaxes(f, 0, 10, 0, 10, left=20, right=6, top=6, bottom=10)
    f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=6, fill="var(--soft)",
           stroke="var(--edge)")
    for cx, cy in ((2.8, 7.2), (7.2, 7.6), (5.2, 2.8)):
        for _ in range(9):
            ax.point(cx + r.n(0, 0.85), cy + r.n(0, 0.75), colour="var(--dim)",
                     r=3.4)
    for cx, cy in ((2.8, 7.2), (7.2, 7.6), (5.2, 2.8)):
        f.circle(ax.px(cx), ax.py(cy), 44, fill="none", stroke=VIOLET,
                 stroke_width="1.5", stroke_dasharray="4 3")
    return f


@figure("Bootstrap", "A sample of six values and four resamples drawn from it with "
        "replacement, repeated draws shaded darker", width=WID)
def bootstrap() -> Fig:
    f = vcard()

    orig = [1, 2, 3, 4, 5, 6]
    draws = [("*1", [3, 1, 5, 3, 6, 2]), ("*2", [2, 2, 4, 6, 1, 4]),
             ("*3", [5, 3, 3, 1, 6, 6]), ("*B", [4, 6, 6, 2, 5, 1])]
    cw, ch = 36, 28
    x0 = BCX - len(orig) * cw / 2 + 10
    for j, v in enumerate(orig):
        f.rect(x0 + j * cw + 2, 90, cw - 4, ch, rx=3, fill="var(--dim)",
               fill_opacity="0.3", stroke="var(--ink)", stroke_width="1.2")
        f.text(x0 + j * cw + cw / 2, 109, str(v), cls="bold")
    f.arrow(BCX + 10, 126, BCX + 10, 152, colour="var(--ink)", width=1.8)
    for i, (name, row) in enumerate(draws):
        y = 162 + i * 48 + (18 if i == 3 else 0)
        seen = set()
        for j, v in enumerate(row):
            dup = v in seen
            seen.add(v)
            f.rect(x0 + j * cw + 2, y, cw - 4, ch, rx=3, fill=BLUE,
                   fill_opacity="0.55" if dup else "0.2", stroke=BLUE,
                   stroke_width="1")
            f.text(x0 + j * cw + cw / 2, y + 19, str(v), cls="sm")
        f.text(x0 - 10, y + 19, name, cls="sm dim", anchor="end")
    f.text(BCX + 10, 318, "⋮", cls="bold")
    return f


@figure("Regularization", "RSS contour ellipses around the least-squares estimate "
        "β̂, first touching the lasso diamond at a corner where β₁ = 0 and the ridge "
        "circle at a point where neither coefficient is zero", width=WID)
def regularization() -> Fig:
    f = vcard()

    ax = vaxes(f, -1.4, 2.7, -1.2, 3.0, left=22, right=18, top=14, bottom=18)
    c = (0.8, 1.4)                                # the least-squares estimate
    th, a1, a2 = math.radians(-40), 1.0, 0.4      # the RSS ellipses' tilt and axes
    ct, st = math.cos(th), math.sin(th)

    def rss(b1, b2):
        u, v = b1 - c[0], b2 - c[1]
        p, q = ct * u + st * v, -st * u + ct * v
        return (p / a1) ** 2 + (q / a2) ** 2

    def ellipse(level, colour, width, opacity="1"):
        k = math.sqrt(level)
        pts = []
        for i in range(121):
            t = 2 * math.pi * i / 120
            p, q = a1 * k * math.cos(t), a2 * k * math.sin(t)
            pts.append(ax.p(c[0] + ct * p - st * q, c[1] + st * p + ct * q))
        f.poly(pts, cls="curve", stroke=colour, stroke_width=str(width),
               stroke_opacity=opacity)

    ring = [2 * math.pi * i / 2000 for i in range(2000)]
    lasso = min(((math.cos(t) / (abs(math.cos(t)) + abs(math.sin(t))),
                  math.sin(t) / (abs(math.cos(t)) + abs(math.sin(t)))) for t in ring),
                key=lambda b: rss(*b))
    ridge = min(((math.cos(t), math.sin(t)) for t in ring), key=lambda b: rss(*b))

    f.arrow(ax.px(-1.35), ax.py(0), ax.px(2.6), ax.py(0), colour="var(--axis)", width=1.1)
    f.arrow(ax.px(0), ax.py(-1.15), ax.px(0), ax.py(2.9), colour="var(--axis)", width=1.1)
    f.polygon([ax.p(1, 0), ax.p(0, 1), ax.p(-1, 0), ax.p(0, -1)], fill=VIOLET,
              fill_opacity="0.2", stroke=VIOLET, stroke_width="1.6")
    f.circle(ax.px(0), ax.py(0), ax.px(1) - ax.px(0), fill=BLUE, fill_opacity="0.12",
             stroke=BLUE, stroke_width="1.6")
    for level in (rss(*lasso), rss(*ridge)):
        ellipse(level, AMBER, 1.8)
    ellipse(rss(*lasso) * 0.2, AMBER, 1.2, "0.55")
    ax.point(*c, colour=AMBER, r=4, label="β̂", dx=10, dy=-6, cls="bold")
    ax.point(*lasso, colour=VIOLET, r=4.4)
    ax.point(*ridge, colour=BLUE, r=4.4)
    ax.label(-0.7, -0.62, "lasso", cls="sm bold", anchor="end")
    ax.label(0.62, -0.95, "ridge", cls="sm bold", anchor="start")
    ax.label(2.6, 0, "β₁", cls="sm dim", anchor="end", dy=16)
    ax.label(0, 2.9, "β₂", cls="sm dim", anchor="start", dx=8, dy=6)
    return f


@figure("K-Nearest Neighbors", "A query point x₀ inside a dashed circle reaching its "
        "five nearest neighbours, four rose and one blue, so it is classed rose",
        width=WID)
def knn() -> Fig:
    f = vcard()

    r = _Rand(31)
    ax = vaxes(f, 0, 10, 0, 10, left=20, right=6, top=6, bottom=10)
    f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=6, fill="var(--soft)",
           stroke="var(--edge)")
    q = (5.0, 5.2)
    pts = []
    for _ in range(30):
        x, y = 0.7 + 8.6 * r.u(), 0.7 + 8.6 * r.u()
        pts.append((x, y, y + 0.4 * r.n() > 0.8 * x + 0.8))
    pts.sort(key=lambda p: (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2)
    rad = math.dist(q, pts[4][:2])
    f.circle(ax.px(q[0]), ax.py(q[1]),
             abs(ax.px(rad) - ax.px(0)), fill=GREEN, fill_opacity="0.10",
             stroke=GREEN, stroke_width="1.3", stroke_dasharray="4 3")
    for i, (x, y, pos) in enumerate(pts):
        ax.point(x, y, colour=ROSE if pos else BLUE, r=4.4 if i < 5 else 3.2)
    f.circle(ax.px(q[0]), ax.py(q[1]), 5.5, fill="var(--surf)", stroke="var(--ink)",
             stroke_width="1.8")
    ax.label(q[0], q[1], "x₀", cls="sm bold", dy=-11)
    ax.label(q[0] + rad * 0.72, q[1] - rad * 0.72, "k = 5", cls="sm bold",
             anchor="start", dx=6, dy=10)
    return f


@figure("Decision Tree", "Predictor space cut by a first split on age at 25 and a "
        "second on power at 150 into three rectangular regions R₁, R₂ and R₃",
        width=WID)
def decision_tree() -> Fig:
    f = vcard()

    r = _Rand(19)
    ax = vaxes(f, 0, 1, 0, 1, left=44, right=14, top=22, bottom=44)
    xs, ys = 0.45, 0.55
    regions = ((0, 0, xs, ys, AMBER, "R₁"), (0, ys, xs, 1, BLUE, "R₂"),
               (xs, 0, 1, 1, GREEN, "R₃"))
    for xa, ya, xb, yb, colour, _ in regions:
        f.rect(ax.px(xa), ax.py(yb), ax.px(xb) - ax.px(xa), ax.py(ya) - ax.py(yb),
               fill=colour, fill_opacity="0.16")
    for _ in range(34):
        x, y = 0.04 + 0.92 * r.u(), 0.04 + 0.92 * r.u()
        colour = GREEN if x > xs else (BLUE if y > ys else AMBER)
        ax.point(x, y, colour=colour, r=2.8)
    ax.frame(xlabel="age", ylabel="power", xticks=[xs], yticks=[ys],
             xfmt=lambda t: "25", yfmt=lambda t: "150", arrows=False)
    f.line(ax.px(xs), ax.y0, ax.px(xs), ax.y1, cls="thin", stroke="var(--ink)",
           stroke_width="2.4")
    f.line(ax.x0, ax.py(ys), ax.px(xs), ax.py(ys), cls="thin", stroke="var(--ink)",
           stroke_width="1.8")
    for xa, ya, xb, yb, _, lab in regions:
        cx, cy = (xa + xb) / 2, (ya + yb) / 2
        f.circle(ax.px(cx), ax.py(cy), 14, fill="var(--surf)", stroke="var(--edge)")
        ax.label(cx, cy, lab, cls="bold", dy=4)
    return f


@figure("Tree Pruning", "A large tree cut back to five leaves: the kept branches drawn "
        "solid, the pruned subtrees below them dashed and faded", width=WID)
def tree_pruning() -> Fig:
    f = vcard()

    depth, top, dy, x0, w = 4, 100, 62, BX0 + 6, BX1 - BX0 - 12
    pos = lambda lv, i: (x0 + (i + 0.5) * w / 2 ** lv, top + lv * dy)
    leaves = {(2, 0), (3, 2), (3, 3), (2, 2), (2, 3)}     # the pruned tree's |T| = 5

    def kept(lv, i):
        """Still in the pruned tree: no leaf of it lies above this node."""
        return not any(lv > a and i >> (lv - a) == b for a, b in leaves)

    for lv in range(depth):
        for i in range(2 ** lv):
            px_, py_ = pos(lv, i)
            for c in (2 * i, 2 * i + 1):
                cx, cy = pos(lv + 1, c)
                on = kept(lv + 1, c)
                f.line(px_, py_, cx, cy, cls="thin" if on else "thin dash",
                       stroke="var(--ink)" if on else "var(--axis)",
                       stroke_width="1.6" if on else "1.1")
    for lv in range(depth + 1):
        for i in range(2 ** lv):
            x, y = pos(lv, i)
            if (lv, i) in leaves:
                f.rect(x - 9, y - 7, 18, 14, rx=3, fill=GREEN, fill_opacity="0.6")
                f.line(x - 12, y + 18, x + 12, y + 18, cls="", stroke=ROSE,
                       stroke_width="2.4", stroke_linecap="round")
            elif kept(lv, i):
                f.circle(x, y, 7, fill=BLUE, fill_opacity="0.25", stroke=BLUE,
                         stroke_width="1.5")
            else:
                f.circle(x, y, 4, fill="var(--axis)", fill_opacity="0.6")
    return f


@figure("Gini Index", "Gini impurity against the class-1 share, peaking at one half "
        "for a 50-50 node and falling to zero at a pure one, with entropy/2 dashed for "
        "comparison", width=WID)
def gini_index() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 1, 0, 0.78, left=44, right=16, top=30, bottom=44)
    ax.frame(xticks=[0, 0.25, 0.5, 0.75, 1], yticks=[0, 0.25, 0.5, 0.75],
             grid=True)
    ax.curve(lambda p: 2 * p * (1 - p), colour=BLUE, width=2.4)
    ax.curve(lambda p: 0 if p in (0, 1) else
             -(p * math.log(p) + (1 - p) * math.log(1 - p)) / 2,
             colour=VIOLET, width=1.9, dash=True, xa=0.004, xb=0.996)
    ax.label(0.5, 0.53, "Gini", cls="sm bold", fill=BLUE)
    ax.label(0.80, 0.44, "entropy/2", cls="sm", fill=VIOLET, anchor="start")
    ax.point(0.5, 0.5, colour=BLUE, r=3.6)
    ax.point(0.9, 2 * 0.9 * 0.1, colour=GREEN, r=3.6)
    ax.label(0.9, 0.18, "0.18", cls="sm", fill=GREEN, anchor="start", dx=7, dy=14)
    f.text(BCX, ax.y1 + 32, "class-1 share", cls="sm dim")
    return f


def _entropy_node(f: Fig, cx, cy, ones):
    """A node of four observations, `ones` of them in class 1 (rose)."""
    f.circle(cx, cy, 13, fill="var(--soft)", stroke="var(--edge)", stroke_width="1.2")
    for k in range(4):
        x = cx + (-4.5 if k % 2 == 0 else 4.5)
        y = cy + (-4.5 if k < 2 else 4.5)
        f.circle(x, y, 3.2, fill=ROSE if k < ones else BLUE)


@figure("Entropy", "Entropy against the class-1 share, one bit at a 50-50 node and zero "
        "at either pure node, with the nodes drawn beneath the axis", width=WID)
def entropy() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 1, 0, 1.12, left=44, right=18, top=30, bottom=48)
    ax.frame(xticks=[0, 0.5, 1], yticks=[0, 0.5, 1.0], grid=True,
             xfmt=lambda t: "")
    ax.curve(lambda p: 0 if p <= 0 or p >= 1 else
             -(p * math.log2(p) + (1 - p) * math.log2(1 - p)),
             colour=VIOLET, width=2.4, xa=0.002, xb=0.998)
    ax.point(0.5, 1.0, colour=VIOLET, r=4)
    ax.label(0.5, 1.0, "1 bit", cls="sm bold", fill=VIOLET, dy=-9)
    ax.point(0.9, -(0.9 * math.log2(0.9) + 0.1 * math.log2(0.1)), colour=GREEN)
    ax.label(0.9, 0.47, "0.47", cls="sm", fill=GREEN, anchor="end", dx=-8, dy=-7)
    for p, ones in ((0, 0), (0.5, 2), (1, 4)):
        _entropy_node(f, ax.px(p), ax.y1 + 25, ones)
    return f


@figure("Tree Ensemble", "Three small trees whose predictions all flow into one combined "
        "prediction", width=WID)
def tree_ensemble() -> Fig:
    f = vcard()

    for i, x in enumerate((70, 180, 290)):
        _tree(f, x, 108, 2, 24, 40, SERIES[i % len(SERIES)], r=6)
        f.arrow(x, 202, BCX + (x - BCX) * 0.14, 286, colour="var(--axis)", width=1.3)
    f.circle(BCX, 310, 22, fill=GREEN, fill_opacity="0.25", stroke=GREEN,
             stroke_width="1.8")
    f.text(BCX, 315, "ŷ", cls="bold")
    f.text(BCX, 352, "average", cls="sm bold")
    return f


@figure("Bagging", "Six observations resampled with replacement into three coloured "
        "bootstrap samples, each growing its own tree, their predictions averaged into one",
        width=WID)
def bagging() -> Fig:
    f = vcard()

    sq, gap = 12, 2
    strip = 6 * sq + 5 * gap

    def cells(cx, y, colours):
        x0 = cx - strip / 2
        for j, colour in enumerate(colours):
            f.rect(x0 + j * (sq + gap), y, sq, sq, rx=2, fill=colour, fill_opacity="0.75")

    cells(BCX, 90, SERIES)
    draws = ([2, 0, 4, 2, 5, 1], [1, 1, 3, 5, 0, 3], [4, 2, 2, 0, 5, 5])
    for i, row in enumerate(draws):
        x = 70 + i * 110
        f.arrow(BCX + (x - BCX) * 0.3, 108, x, 142, colour="var(--axis)", width=1.2)
        cells(x, 148, [SERIES[k] for k in row])
        f.line(x, 164, x, 180, cls="thin", stroke="var(--axis)", stroke_width="1.2")
        _tree(f, x, 188, 2, 20, 32, "var(--ink)", r=5)
        f.arrow(x, 262, BCX + (x - BCX) * 0.14, 300, colour="var(--axis)", width=1.2)
    f.circle(BCX, 320, 18, fill=GREEN, fill_opacity="0.25", stroke=GREEN,
             stroke_width="1.8")
    f.text(BCX, 325, "ŷ", cls="bold")
    f.text(BCX, 356, "average", cls="sm bold")
    return f


def _forest_node(f: Fig, cx, cy, eligible, chosen):
    """A split node: nine predictors, the eligible few tinted, the one used inked."""
    sq, gap = 12, 3
    w = 9 * sq + 8 * gap
    f.rect(cx - w / 2 - 6, cy - sq / 2 - 6, w + 12, sq + 12, rx=6, fill="var(--soft)",
           stroke="var(--edge)", stroke_width="1.2")
    for j in range(9):
        x = cx - w / 2 + j * (sq + gap)
        on = j in eligible
        f.rect(x, cy - sq / 2, sq, sq, rx=2,
               fill=BLUE if on else "var(--axis)",
               fill_opacity=("1" if j == chosen else "0.6") if on else "0.3",
               stroke="var(--ink)" if j == chosen else "none",
               stroke_width="1.4" if j == chosen else None)
    return w / 2 + 6


@figure("Random Forest", "A tree whose every split may choose only among m = 3 of the "
        "p = 9 predictors, a different random three at each node", width=WID)
def random_forest() -> Fig:
    f = vcard()

    nodes = {(0, 0): (BCX, 116, {1, 4, 7}, 4),
             (1, 0): (100, 222, {0, 5, 6}, 5),
             (1, 1): (260, 222, {2, 3, 8}, 2)}
    for (lv, _), (x, y, _, _) in nodes.items():
        if lv == 1:
            f.line(BCX, 130, x, y - 14, cls="thin", stroke="var(--axis)",
                   stroke_width="1.3")
            for dx in (-34, 34):
                f.line(x, y + 14, x + dx, 318, cls="thin", stroke="var(--axis)",
                       stroke_width="1.2")
                f.rect(x + dx - 11, 318, 22, 16, rx=3, fill=GREEN, fill_opacity="0.55")
    halves = [_forest_node(f, x, y, eligible, chosen)
              for x, y, eligible, chosen in nodes.values()]
    f.text(BCX + halves[0] + 8, 120, "p = 9", cls="sm dim", anchor="start")
    f.text(BCX - halves[0] - 8, 120, "m = 3", cls="sm bold", anchor="end")
    return f


@figure("Boosting", "Three stumps fitted in turn, each to the residuals the ones before "
        "it left, the residual bars shrinking from one round to the next", width=WID)
def boosting() -> Fig:
    f = vcard()

    base = [0.9, -0.7, 1.0, -0.4, 0.8, -0.9]
    xs = [70, 180, 290]
    for i, x in enumerate(xs):
        shrink = 0.5 ** i
        y0 = 166
        f.line(x - 42, y0, x + 42, y0, cls="axis")
        for j, v in enumerate(base):
            h = 46 * v * shrink * (1 if j % 3 else 0.8)
            bx = x - 38 + j * 13.5
            f.rect(bx, min(y0, y0 - h), 9.5, abs(h), rx=1.5, fill=ROSE,
                   fill_opacity="0.7")
        f.text(x, 108, f"r{'₁₂₃'[i]}", cls="bold")
        f.arrow(x, 224, x, 258, colour="var(--axis)", width=1.3)
        _tree(f, x, 274, 1, 22, 38, BLUE, r=7)
        if i < 2:
            f.arrow(x + 34, 276, xs[i + 1] - 44, 196, colour=ROSE, width=1.3,
                    dash=True)
    for k in range(2):
        f.text((xs[k] + xs[k + 1]) / 2, 318, "+", cls="bold")
    return f


@figure("Out-of-Bag Error", "A grid of rows by trees with each cell in the bag or out of "
        "it; one row's out-of-bag cells, about a third of the trees, supply its "
        "prediction", width=WID)
def oob_error() -> Fig:
    f = vcard()

    r = _Rand(36)
    rows, cols, cw, ch = 8, 7, 33, 27
    x0, y0 = 34, 124
    focus = 3
    for j in range(cols):
        x = x0 + j * cw + cw / 2
        for dx in (-7, 7):
            f.line(x, y0 - 30, x + dx, y0 - 16, cls="thin", stroke="var(--axis)",
                   stroke_width="1.1")
            f.rect(x + dx - 4, y0 - 17, 8, 7, rx=1.5, fill=GREEN, fill_opacity="0.7")
        f.circle(x, y0 - 32, 3.8, fill="var(--surf)", stroke="var(--ink)",
                 stroke_width="1.2")
    for i in range(rows):
        for j in range(cols):
            out = r.u() < 0.37
            x, y = x0 + j * cw, y0 + i * ch
            f.rect(x + 2, y + 2, cw - 4, ch - 4, rx=3, fill=ROSE if out else BLUE,
                   fill_opacity=("0.85" if i == focus else "0.45") if out else "0.28")
    yf = y0 + focus * ch
    f.rect(x0 - 2, yf, cols * cw + 4, ch, rx=4, fill="none", stroke="var(--ink)",
           stroke_width="1.6")
    xe = x0 + cols * cw + 4
    f.arrow(xe, yf + ch / 2, xe + 26, yf + ch / 2, colour=ROSE, width=1.8)
    f.circle(xe + 40, yf + ch / 2, 12, fill=ROSE, fill_opacity="0.2", stroke=ROSE,
             stroke_width="1.6")
    f.text(xe + 40, yf + ch / 2 + 4, "ŷ", cls="bold")
    f.legend_row(x0 + 4, y0 + rows * ch + 26, [(BLUE, "in bag"), (ROSE, "out of bag")],
                 gap=100)
    return f


@figure("Variable Importance", "Six claim predictors ranked by the impurity they remove, "
        "prior claims longest and gender barely there", width=WID)
def variable_importance() -> Fig:
    f = vcard()

    items = [("prior claims", 100), ("claim amount", 71), ("days to report", 64),
             ("territory", 12), ("policy age", 9), ("gender", 2)]
    x0, w, y0, step = 128, 184, 94, 40
    for i, (lab, v) in enumerate(items):
        y = y0 + i * step
        f.text(x0 - 10, y + 16, lab, cls="sm", anchor="end")
        f.rect(x0, y, max(w * v / 100, 2), 24, rx=3, fill=BLUE,
               fill_opacity=f"{0.25 + 0.005 * v:.2f}")
    ya = y0 + len(items) * step + 2
    f.line(x0, y0 - 8, x0, ya, cls="axis")
    f.line(x0, ya, x0 + w + 6, ya, cls="axis")
    for t in (0, 50, 100):
        x = x0 + w * t / 100
        f.line(x, ya, x, ya + 4, cls="tick")
        f.text(x, ya + 17, str(t), cls="sm dim")
    return f


@figure("Principal Components Analysis", "A tilted scatter with the first principal "
        "component drawn along its longest spread and the second at right angles to it",
        width=WID)
def pca() -> Fig:
    f = vcard()

    r = _Rand(41)
    ax = vaxes(f, -2.7, 2.7, -2.7, 2.7, left=20, right=16, top=18, bottom=22)
    ax.frame(xticks=[], yticks=[], arrows=True)
    for _ in range(48):
        a, b = r.n(), r.n()
        x = 1.02 * a + 0.30 * b
        y = 0.62 * a - 0.42 * b
        ax.point(x, y, colour=BLUE, r=3.0)
    for v, colour, lab, ln in (((0.85, 0.53), ROSE, "PC1", 2.9),
                               ((-0.53, 0.85), VIOLET, "PC2", 1.5)):
        f.arrow(ax.px(0), ax.py(0), ax.px(v[0] * ln), ax.py(v[1] * ln),
                colour=colour, width=2.4)
        ax.label(v[0] * ln, v[1] * ln, lab, cls="sm bold", fill=colour,
                 dy=-8 if lab == "PC1" else 12, dx=10 if lab == "PC1" else -6)
    return f


@figure("Loading Vector", "Paired bars of the first two loading vectors across four "
        "driving variables: φ₁ weighs all four about equally, φ₂ sets braking and "
        "cornering against night and mileage", width=WID)
def loading_vector() -> Fig:
    f = vcard()

    vars_ = ["braking", "cornering", "night", "mileage"]
    pcs = [([0.52, 0.51, 0.49, 0.48], BLUE, "φ₁", -0.19),
           ([0.61, 0.55, -0.42, -0.39], VIOLET, "φ₂", 0.19)]
    ax = vaxes(f, 0.4, 4.6, -0.55, 0.75, left=40, right=12, top=24, bottom=40)
    ax.frame(yticks=[-0.5, 0, 0.5], grid=True, arrows=False)
    for load, colour, name, off in pcs:
        for j, v in enumerate(load):
            x = j + 1 + off
            ax.fig.rect(ax.px(x - 0.16), min(ax.py(v), ax.py(0)),
                        ax.px(0.32) - ax.px(0), abs(ax.py(v) - ax.py(0)), rx=2,
                        fill=colour, fill_opacity="0.7")
        ax.label(1 + off, load[0], name, cls="sm bold", dy=-7)
    ax.hline(0, colour="var(--axis)", dash=False, x_to=4.6)
    for j, name in enumerate(vars_):
        f.text(ax.px(j + 1), ax.y1 + 17, name, cls="sm dim")
    return f


@figure("Proportion of Variance Explained", "Bars of the variance each of eight "
        "components explains, under a cumulative line that clears the 80% mark at the "
        "third", width=WID)
def pve() -> Fig:
    f = vcard()

    lam = [3.6, 1.9, 1.0, 0.6, 0.4, 0.3, 0.2, 0.0]
    total = sum(lam)
    ax = vaxes(f, 0.3, 8.7, 0, 1.05, left=44, right=16, top=28, bottom=44)
    ax.frame(xticks=[1, 2, 3, 4, 5, 6, 7, 8], yticks=[0, 0.5, 1.0], grid=True,
             arrows=False)
    ax.bars([(i + 1, v / total) for i, v in enumerate(lam)], colour=BLUE, bw=18,
            opacity="0.6")
    cum, pts = 0.0, []
    for i, v in enumerate(lam):
        cum += v / total
        pts.append((i + 1, cum))
    ax.polyline(pts, colour=ROSE, width=2.2)
    for x, y in pts:
        ax.point(x, y, colour=ROSE, r=2.8)
    ax.hline(0.8, colour=GREEN, x_to=8.7, label=None)
    ax.label(8.6, 0.8, "80%", cls="sm bold", fill=GREEN, anchor="end", dy=14)
    ax.vline(3, colour=GREEN, y_top=0.8125)
    ax.label(1.4, 0.45, "each", cls="sm bold", fill=BLUE, anchor="start", dy=-3)
    ax.label(5.0, cum, "cumulative", cls="sm bold", fill=ROSE, dy=-10)
    f.text(BCX, ax.y1 + 32, "component m", cls="sm dim")
    return f


@figure("Scree Plot", "Eigenvalues falling steeply over the first two components and "
        "then flattening, with the elbow marked and the λ = 1 line drawn", width=WID)
def scree_plot() -> Fig:
    f = vcard()

    lam = [2.9, 1.6, 0.7, 0.4, 0.3, 0.1]
    ax = vaxes(f, 0.4, 6.6, 0, 3.3, left=44, right=18, top=28, bottom=44)
    ax.frame(xticks=[1, 2, 3, 4, 5, 6], yticks=[0, 1, 2, 3], grid=True)
    ax.polyline([(i + 1, v) for i, v in enumerate(lam)], colour=BLUE, width=2.4)
    for i, v in enumerate(lam):
        ax.point(i + 1, v, colour=GREEN if i == 1 else BLUE,
                 r=5 if i == 1 else 3.4)
    ax.hline(1.0, colour=VIOLET, x_to=6.6)
    ax.label(6.4, 1.0, "λ = 1", cls="sm bold", fill=VIOLET, anchor="end", dy=-7)
    ax.label(2, 1.6, "elbow", cls="sm bold", fill=GREEN, dy=-11, dx=14)
    f.text(BCX, ax.y1 + 32, "component m", cls="sm dim")
    return f


@figure("Clustering", "Three clusters of points, each tight around its own centre and "
        "far from the others", width=WID)
def clustering() -> Fig:
    f = vcard()

    r = _Rand(53)
    ax = vaxes(f, 0, 10, 0, 10, left=20, right=6, top=6, bottom=10)
    f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=6, fill="var(--soft)",
           stroke="var(--edge)")
    for (cx, cy), colour in (((2.7, 7.3), BLUE), ((7.4, 7.6), AMBER),
                             ((5.1, 2.7), GREEN)):
        for _ in range(10):
            ax.point(cx + r.n(0, 0.8), cy + r.n(0, 0.72), colour=colour, r=3.6)
        f.circle(ax.px(cx), ax.py(cy), 44, fill="none", stroke=colour,
                 stroke_width="1.4", stroke_dasharray="4 3")
        f.circle(ax.px(cx), ax.py(cy), 5.2, fill=colour, stroke="var(--surf)",
                 stroke_width="1.4")
    return f


@figure("K-Means Clustering", "Points coloured by the cluster they end in, with each "
        "centroid's path from a hollow starting square, step by step, to its cluster's "
        "centre", width=WID)
def kmeans() -> Fig:
    f = vcard()

    r = _Rand(67)
    pts = []
    for (cx, cy) in ((2.8, 7.2), (7.2, 7.4), (5.0, 2.9)):
        for _ in range(9):
            pts.append((cx + r.n(0, 0.85), cy + r.n(0, 0.75)))
    colours = (BLUE, AMBER, GREEN)
    cents = [(4.4, 5.2), (8.8, 4.4), (2.2, 1.6)]     # deliberately poor starts
    paths = [[c] for c in cents]
    for _ in range(10):                              # assign, recentre, repeat
        groups = [[] for _ in cents]
        for x, y in pts:
            k = min(range(3), key=lambda j: (x - cents[j][0]) ** 2
                    + (y - cents[j][1]) ** 2)
            groups[k].append((x, y))
        new = [(sum(x for x, _ in g) / len(g), sum(y for _, y in g) / len(g))
               for g in groups]
        if new == cents:
            break
        cents = new
        for j, c in enumerate(cents):
            paths[j].append(c)
    ax = vaxes(f, 0, 10, 0, 10, left=20, right=6, top=6, bottom=10)
    f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=6, fill="var(--soft)",
           stroke="var(--edge)")
    for j, members in enumerate(groups):
        for x, y in members:
            ax.point(x, y, colour=colours[j], r=3.4)
    for j, path in enumerate(paths):
        (sx, sy), (ex, ey) = path[0], path[-1]
        f.rect(ax.px(sx) - 6, ax.py(sy) - 6, 12, 12, rx=2, fill="var(--surf)",
               stroke=colours[j], stroke_width="1.8")
        for (xa, ya), (xb, yb) in zip(path, path[1:]):
            f.arrow(ax.px(xa), ax.py(ya), ax.px(xb), ax.py(yb), colour="var(--ink)",
                    width=1.5)
        f.rect(ax.px(ex) - 6, ax.py(ey) - 6, 12, 12, rx=2, fill=colours[j],
               stroke="var(--surf)", stroke_width="1.6")
    return f


@figure("Hierarchical Clustering", "A dendrogram fusing T1 with T2 at height 2 and T3 "
        "with T4 at 4, then both pairs at 10, cut at 7 into two clusters", width=WID)
def hierarchical_clustering() -> Fig:
    f = vcard()

    labels = ["T1", "T2", "T3", "T4"]
    xs = [70, 130, 230, 290]
    base = 334
    ax_y = lambda h: base - h * 21
    for x, lab in zip(xs, labels):
        f.text(x, base + 18, lab, cls="sm dim")

    def link(x1, x2, h, colour):
        y = ax_y(h)
        f.line(x1, base, x1, y, cls="thin", stroke=colour, stroke_width="1.8")
        f.line(x2, base, x2, y, cls="thin", stroke=colour, stroke_width="1.8")
        f.line(x1, y, x2, y, cls="thin", stroke=colour, stroke_width="1.8")
        f.text(x1 - 6, y + 4, f"h = {h}", cls="sm", fill=colour, anchor="end")
        return (x1 + x2) / 2, y

    a = link(70, 130, 2, BLUE)
    b = link(230, 290, 4, AMBER)
    f.line(a[0], a[1], a[0], ax_y(10), cls="thin", stroke=VIOLET, stroke_width="1.8")
    f.line(b[0], b[1], b[0], ax_y(10), cls="thin", stroke=VIOLET, stroke_width="1.8")
    f.line(a[0], ax_y(10), b[0], ax_y(10), cls="thin", stroke=VIOLET,
           stroke_width="1.8")
    f.text(BCX, ax_y(10) - 8, "h = 10", cls="sm", fill=VIOLET)
    f.line(46, base, 320, base, cls="axis")
    f.line(46, ax_y(7), 320, ax_y(7), cls="thin dash", stroke=GREEN,
           stroke_width="1.4")
    f.text(322, ax_y(7) + 4, "cut", cls="sm bold", fill=GREEN, anchor="end")
    return f


@figure("Dendrogram", "A dendrogram where A, drawn beside B, fuses with C at height 3 "
        "and D at 6, while B joins only at 9", width=WID)
def dendrogram() -> Fig:
    f = vcard()

    base = 334
    hy = lambda h: base - h * 24
    leaves = [("B", 76), ("A", 132), ("C", 200), ("D", 268)]
    for lab, x in leaves:
        f.text(x, base + 18, lab, cls="sm bold")

    def bar(x1, x2, y1, y2, h, colour):
        y = hy(h)
        f.line(x1, y1, x1, y, cls="thin", stroke=colour, stroke_width="1.8")
        f.line(x2, y2, x2, y, cls="thin", stroke=colour, stroke_width="1.8")
        f.line(x1, y, x2, y, cls="thin", stroke=colour, stroke_width="1.8")
        return (x1 + x2) / 2, y

    ac = bar(132, 200, base, base, 3, GREEN)
    f.text(132 - 6, ac[1] + 4, "A + C", cls="sm bold", fill=GREEN, anchor="end")
    acd = bar(ac[0], 268, ac[1], base, 6, BLUE)
    f.text(ac[0] - 6, acd[1] + 4, "+ D", cls="sm bold", fill=BLUE, anchor="end")
    root = bar(76, acd[0], base, acd[1], 9, ROSE)
    f.text(root[0], root[1] - 8, "+ B", cls="sm bold", fill=ROSE)

    f.line(52, base, 320, base, cls="axis")
    for h in (0, 3, 6, 9):
        f.line(50, hy(h), 54, hy(h), cls="tick")
        f.text(46, hy(h) + 4, str(h), cls="sm dim", anchor="end")
    return f


@figure("Linkage", "Two clusters joined three ways: complete linkage by their farthest "
        "pair, single linkage by their closest pair, and average linkage by every pair "
        "at once", width=WID)
def linkage() -> Fig:
    f = vcard()

    left = [(1.4, 7.6), (2.4, 5.6), (1.2, 3.8)]
    right = [(7.6, 7.2), (8.4, 5.0), (7.2, 3.2)]
    ax = Axes(f, BX0 + 6, BY0 + 16, BX1 - 6, BY1 - 16, 0, 9.6, 2.5, 8.3)
    pairs = [(a, b) for a in left for b in right]
    far = max(pairs, key=lambda p: math.dist(*p))
    near = min(pairs, key=lambda p: math.dist(*p))
    for a, b in pairs:
        f.line(ax.px(a[0]), ax.py(a[1]), ax.px(b[0]), ax.py(b[1]), cls="thin",
               stroke=BLUE, stroke_width="1.1", stroke_opacity="0.5")
    for (a, b), colour in ((far, ROSE), (near, GREEN)):
        f.line(ax.px(a[0]), ax.py(a[1]), ax.px(b[0]), ax.py(b[1]), cls="thin",
               stroke=colour, stroke_width="2.8")
    for cluster in (left, right):
        cx = sum(x for x, _ in cluster) / 3
        cy = sum(y for _, y in cluster) / 3
        f.ellipse(ax.px(cx), ax.py(cy), 46, 116, fill="none", stroke="var(--axis)",
                  stroke_width="1.3", stroke_dasharray="4 3")
        for x, y in cluster:
            ax.point(x, y, colour="var(--ink)", r=4.2)
    mid = lambda p: ((p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2)
    ax.label(*mid(far), "complete", cls="sm bold", dy=-12)
    ax.label(*mid(near), "single", cls="sm bold", dy=20)
    ax.label(4.2, 3.5, "average", cls="sm bold", dy=18)
    return f


@figure("Neural Network", "A network of four input units, five hidden units and one "
        "output unit, every unit wired to every unit in the next layer", width=WID)
def neural_network() -> Fig:
    f = vcard()

    layers = [(70, 4, "inputs Xⱼ", BLUE), (180, 5, "hidden A_k", VIOLET),
              (290, 1, "output f(x)", GREEN)]
    step = 50
    coords = []
    for x, n, lab, colour in layers:
        ys = [BCY + 12 - (n - 1) * step / 2 + i * step for i in range(n)]
        coords.append(ys)
        f.text(x, BY0 + 22, lab, cls="sm dim")
    for a, (xa, _, _, _) in enumerate(layers[:-1]):
        xb = layers[a + 1][0]
        for ya in coords[a]:
            for yb in coords[a + 1]:
                f.line(xa + 12, ya, xb - 12, yb, cls="thin", stroke="var(--axis)",
                       stroke_width="0.8", stroke_opacity="0.6")
    for (x, n, _, colour), ys in zip(layers, coords):
        for y in ys:
            f.circle(x, y, 12, fill=colour, fill_opacity="0.25", stroke=colour,
                     stroke_width="1.5")
    return f


@figure("Activation Function", "ReLU, sigmoid and tanh drawn on one pair of axes",
        width=WID)
def activation_function() -> Fig:
    f = vcard()

    ax = vaxes(f, -4, 4, -1.2, 2.6, left=40, right=16, top=30, bottom=44)
    ax.frame(xticks=[-4, -2, 2, 4], yticks=[-1, 1, 2], grid=True)
    ax.curve(lambda z: max(0.0, z), colour=BLUE, width=2.4, xb=2.58)
    ax.curve(lambda z: 1 / (1 + math.exp(-z)), colour=AMBER, width=2.1)
    ax.curve(math.tanh, colour=VIOLET, width=2.1, dash=True)
    ax.label(2.1, 2.2, "ReLU", cls="sm bold", fill=BLUE, anchor="end", dx=-6)
    ax.label(3.8, 1.22, "sigmoid", cls="sm bold", fill=AMBER, anchor="end")
    ax.label(-2.2, -0.75, "tanh", cls="sm bold", fill=VIOLET)
    return f


@figure("Backpropagation", "A chain from input x through a hidden unit and the "
        "prediction ŷ to the loss L, a forward arrow running left to right above it and "
        "a gradient arrow running back below it", width=WID)
def backpropagation() -> Fig:
    f = vcard()

    nodes = [("x", BLUE), ("h", VIOLET), ("ŷ", GREEN), ("L", ROSE)]
    xs = [58, 139, 221, 302]
    y = 226
    for a, b in zip(xs, xs[1:]):
        f.line(a + 24, y, b - 24, y, cls="thin", stroke="var(--axis)", stroke_width="1.6")
    for x, (lab, colour) in zip(xs, nodes):
        f.circle(x, y, 24, fill=colour, fill_opacity="0.2", stroke=colour,
                 stroke_width="1.6")
        f.text(x, y + 5, lab, cls="bold")
    f.arrow(xs[0] - 14, 150, xs[-1] + 14, 150, colour="var(--ink)", width=2.2)
    f.text(BCX, 136, "forward", cls="sm bold")
    f.arrow(xs[-1] + 14, 302, xs[0] - 14, 302, colour=ROSE, width=2.2)
    f.text(BCX, 324, "gradients", cls="sm bold")
    for x in xs:
        f.line(x, 162, x, y - 30, cls="thin dot", stroke="var(--axis)", stroke_width="1.2")
        f.line(x, y + 30, x, 290, cls="thin dot", stroke=ROSE, stroke_width="1.2")
    return f


@figure("Confusion Matrix", "A two-by-two grid of predicted against actual fraud for "
        "1,000 claims: 45 true positives, 45 false positives, 15 false negatives and 895 "
        "true negatives", width=WID)
def confusion_matrix() -> Fig:
    f = vcard()

    cw, ch = 104, 100
    x0, y0 = 122, 128
    f.text(x0 + cw, y0 - 34, "actual", cls="sm dim")
    f.text(x0 + cw / 2, y0 - 12, "+", cls="bold")
    f.text(x0 + cw * 1.5, y0 - 12, "−", cls="bold")
    f.text(x0 - 14, y0 + ch / 2 + 5, "+", cls="bold", anchor="end")
    f.text(x0 - 14, y0 + ch * 1.5 + 5, "−", cls="bold", anchor="end")
    f.text(x0 - 44, y0 + ch, "predicted", cls="sm dim",
           transform=f"rotate(-90 {x0 - 44} {y0 + ch})")
    cells = [("TP", 45, GREEN), ("FP", 45, ROSE), ("FN", 15, ROSE),
             ("TN", 895, GREEN)]
    for i, (lab, n, colour) in enumerate(cells):
        cx = x0 + (i % 2) * cw
        cy = y0 + (i // 2) * ch
        f.rect(cx + 3, cy + 3, cw - 6, ch - 6, rx=6, fill=colour,
               fill_opacity="0.18", stroke=colour, stroke_width="1.4")
        f.text(cx + cw / 2, cy + ch / 2 + 5, f"{lab} {n}", cls="bold")
    return f


@figure("AUROC", "An ROC curve bowing above the diagonal of a useless model, the area "
        "under it shaded as the AUROC of 0.80", width=WID)
def auroc() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 1, 0, 1, left=44, right=18, top=30, bottom=44)
    ax.frame(xlabel="FPR", ylabel="TPR", xticks=[0, 0.5, 1], yticks=[0, 0.5, 1],
             grid=True, arrows=False)
    roc = lambda x: x ** 0.42
    ax.area(roc, 0, 1, colour=BLUE, opacity="0.16")
    ax.curve(roc, colour=BLUE, width=2.4)
    ax.polyline([(0, 0), (1, 1)], colour="var(--dim)", width=1.5, dash=True)
    ax.label(0.62, 0.55, "AUROC = 0.80", cls="sm bold", fill=BLUE)
    ax.label(0.78, 0.68, "chance", cls="sm dim", anchor="start", dy=8)
    ax.point(0.18, roc(0.18), colour=ROSE)
    ax.label(0.18, roc(0.18), "one threshold", cls="sm", fill=ROSE,
             anchor="start", dx=9, dy=15)
    return f


@figure("Lift", "Actual loss cost rising across five equal-exposure buckets with the "
        "predicted line tracking it, the top bucket 2.1 times the bottom one", width=WID)
def lift() -> Fig:
    f = vcard()

    actual = [0.68, 0.84, 0.97, 1.11, 1.42]
    pred = [0.71, 0.86, 0.98, 1.12, 1.33]
    ax = vaxes(f, 0.3, 6.1, 0, 1.6, left=44, right=10, top=26, bottom=44)
    ax.frame(xticks=[1, 2, 3, 4, 5], yticks=[0.5, 1.0, 1.5], grid=True,
             arrows=False)
    ax.bars([(i + 1, v) for i, v in enumerate(actual)], colour=BLUE, bw=26,
            opacity="0.55")
    ax.polyline([(i + 1, v) for i, v in enumerate(pred)], colour=ROSE, width=2.2)
    for i, v in enumerate(pred):
        ax.point(i + 1, v, colour=ROSE, r=3.2)
    ax.hline(1.0, colour="var(--dim)", x_to=6.1)
    ax.label(1, actual[0], "actual", cls="sm bold", dy=-8)
    ax.label(3.6, 1.14, "predicted", cls="sm bold", anchor="end")
    f.line(ax.px(1.2), ax.py(actual[0]), ax.px(5.55), ax.py(actual[0]),
           cls="thin dash", stroke="var(--axis)", stroke_width="1.2")
    f.arrow(ax.px(5.55), ax.py(actual[0]), ax.px(5.55), ax.py(actual[-1]),
            colour="var(--ink)", width=1.6)
    ax.label(5.55, (actual[0] + actual[-1]) / 2, "2.1×", cls="bold", anchor="start",
             dx=5)
    f.text(BCX, ax.y1 + 32, "bucket", cls="sm dim")
    return f


@figure("Quantile Plot", "Actual and predicted loss cost across five equal-exposure "
        "buckets of held-out data, the gap in each bucket marked", width=WID)
def quantile_plot() -> Fig:
    f = vcard()

    actual = [0.68, 0.84, 0.97, 1.11, 1.42]
    pred = [0.71, 0.86, 0.98, 1.12, 1.33]
    ax = vaxes(f, 0.3, 5.7, 0.5, 1.6, left=44, right=16, top=26, bottom=44)
    ax.frame(xticks=[1, 2, 3, 4, 5], yticks=[0.6, 1.0, 1.4], grid=True,
             arrows=False)
    for series, colour, dash in ((pred, ROSE, True), (actual, BLUE, False)):
        ax.polyline([(i + 1, v) for i, v in enumerate(series)], colour=colour,
                    width=2.3, dash=dash)
        for i, v in enumerate(series):
            ax.point(i + 1, v, colour=colour, r=3.2)
    ax.hline(1.0, colour="var(--dim)", x_to=5.7)
    for i in range(5):
        f.line(ax.px(i + 1), ax.py(min(actual[i], pred[i])), ax.px(i + 1),
               ax.py(max(actual[i], pred[i])), cls="thin", stroke=GREEN,
               stroke_width="2")
    ax.label(4.6, 1.34, "actual", cls="sm bold", anchor="end", dy=-6)
    ax.label(4.4, 1.12, "predicted", cls="sm bold", anchor="start", dx=8, dy=14)
    f.text(BCX, ax.y1 + 32, "bucket", cls="sm dim")
    return f


@figure("Double Lift Chart", "Actual loss cost in buckets sorted by the ratio of two "
        "models' predictions, the new model's line tracking it and the current model's "
        "staying flat", width=WID)
def double_lift_chart() -> Fig:
    f = vcard()

    actual = [0.78, 0.91, 1.00, 1.14, 1.31]
    new = [0.80, 0.92, 1.01, 1.12, 1.28]
    cur = [1.02, 1.00, 1.00, 1.02, 1.05]
    ax = vaxes(f, 0.3, 5.7, 0.6, 1.45, left=44, right=16, top=26, bottom=44)
    ax.frame(xticks=[1, 2, 3, 4, 5], yticks=[0.8, 1.0, 1.2, 1.4], grid=True,
             arrows=False)
    ax.bars([(i + 1, v) for i, v in enumerate(actual)], colour="var(--dim)",
            bw=28, opacity="0.22", base=0.6)
    for series, colour, dash in ((new, GREEN, False), (cur, ROSE, True)):
        ax.polyline([(i + 1, v) for i, v in enumerate(series)], colour=colour,
                    width=2.3, dash=dash)
        for i, v in enumerate(series):
            ax.point(i + 1, v, colour=colour, r=3.2)
    ax.label(1, 0.66, "actual", cls="sm")
    ax.label(4.6, 1.2, "new", cls="sm bold", anchor="end", dy=-4)
    ax.label(4.5, 1.02, "current", cls="sm bold", dy=16)
    f.text(BCX, ax.y1 + 32, "ŷ_new / ŷ_current", cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# D. Time series
#
# One running series: a quarterly loss index, drifting upward with a seasonal
# pattern, drawn from the same seed everywhere.
# ═══════════════════════════════════════════════════════════════════════════

_SEASON = [-0.9, 0.4, 1.5, -1.0]


def _index_series(n=40, drift=0.9, seed=97, season=True, noise=1.1):
    r = _Rand(seed)
    out, level = [], 10.0
    for t in range(n):
        level += drift + r.n(0, noise)
        out.append(level + (_SEASON[t % 4] * 2.2 if season else 0.0))
    return out


def _ts_axes(f: Fig, ys, top=32, bottom=76, pad=0.12):
    lo, hi = min(ys), max(ys)
    span = (hi - lo) or 1
    return vaxes(f, 0, len(ys) - 1, lo - span * pad, hi + span * pad,
                 left=42, right=16, top=top, bottom=bottom)


def _corr_panel(f: Fig, y0, y1, vals, n, title, colour, ylab=True):
    """A correlogram with ±1.96/√n bands. Returns the axes."""
    band = 1.96 / math.sqrt(n)
    ax = Axes(f, BX0 + 42, y0, BX1 - 16, y1, 0.4, len(vals) + 0.6, -1.05, 1.05)
    if title:
        f.text(BCX, y0 - 8, title, cls="sm bold", fill=colour)
    for v in (band, -band):
        f.line(ax.x0, ax.py(v), ax.x1, ax.py(v), cls="thin dash", stroke=ROSE,
               stroke_width="1.1")
    f.line(ax.x0, ax.py(0), ax.x1, ax.py(0), cls="axis")
    if ylab:
        for t in (-1, 0, 1):
            f.text(ax.x0 - 7, ax.py(t) + 3.6, str(t), cls="sm dim", anchor="end")
    for k, v in enumerate(vals, start=1):
        x = ax.px(k)
        f.line(x, ax.py(0), x, ax.py(v), cls="", stroke=colour,
               stroke_width="2.6", stroke_linecap="round")
        f.circle(x, ax.py(v), 2.6, fill=colour)
    return ax


@figure("Time Series", "Forty quarters of a loss index climbing along a dashed trend "
        "line with a repeating seasonal wiggle and irregular noise", width=WID)
def time_series() -> Fig:
    f = vcard()

    ys = _index_series()
    ax = _ts_axes(f, ys, top=28, bottom=44)
    ax.frame(xticks=[0, 8, 16, 24, 32, 40], yticks=[], grid=True,
             xfmt=lambda t: f"Y{int(t/4)+1}" if t % 8 == 0 else "")
    ax.polyline(list(enumerate(ys)), colour=BLUE, width=2)
    for t, y in enumerate(ys):
        ax.point(t, y, colour=BLUE, r=2)
    ax.polyline([(t, 10 + 0.9 * (t + 1)) for t in (0, len(ys) - 1)],
                colour=AMBER, width=1.8, dash=True)
    ax.label(len(ys) - 2, 10 + 0.9 * len(ys), "trend", cls="sm bold", fill=AMBER,
             anchor="end", dy=16)
    return f


@figure("Stationarity", "A stationary AR(1) series oscillating inside a fixed band "
        "about its mean, and a random walk from the same start wandering off", width=WID)
def stationarity() -> Fig:
    f = vcard()

    r = _Rand(90)
    stat, y = [], 0.0
    for _ in range(60):
        y = 0.55 * y + r.n(0, 1)
        stat.append(y)
    walk, y = [], 0.0
    for _ in range(60):
        y += r.n(0, 1)
        walk.append(y)
    lo, hi = min(stat + walk), max(stat + walk)
    pad = (hi - lo) * 0.08
    ax = vaxes(f, 0, 59, lo - pad, hi + pad, left=24, right=16, top=24, bottom=24)
    band = 2 / math.sqrt(1 - 0.55 ** 2)
    f.rect(ax.x0, ax.py(band), ax.x1 - ax.x0, ax.py(-band) - ax.py(band),
           fill=GREEN, fill_opacity="0.12")
    ax.hline(0, colour="var(--dim)", x_to=59)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    ax.polyline(list(enumerate(stat)), colour=GREEN, width=1.8)
    ax.polyline(list(enumerate(walk)), colour=ROSE, width=1.8)
    ax.label(59, -band, "stationary", cls="sm bold", anchor="end", dy=16)
    ax.label(59, max(walk), "random walk", cls="sm bold", anchor="end", dy=-4)
    return f


@figure("White Noise", "Sixty uncorrelated draws jumping about a zero mean with the "
        "same spread throughout, a constant ±1.96 band shaded behind them", width=WID)
def white_noise() -> Fig:
    f = vcard()

    r = _Rand(17)
    ys = [r.n(0, 1) for _ in range(60)]
    ax = vaxes(f, 0, 59, -3.4, 3.4, left=36, right=16, top=24, bottom=30)
    ax.frame(yticks=[-2, 0, 2], arrows=False)
    f.rect(ax.x0, ax.py(1.96), ax.x1 - ax.x0, ax.py(-1.96) - ax.py(1.96),
           fill=BLUE, fill_opacity="0.1")
    ax.hline(0, colour="var(--dim)", x_to=59)
    ax.polyline(list(enumerate(ys)), colour=BLUE, width=1.6)
    for t, y in enumerate(ys):
        ax.point(t, y, colour=BLUE, r=2)
    return f


@figure("Random Walk", "A random walk with drift up to now, then its forecast line "
        "continuing the drift inside an interval that fans out with the square root "
        "of the horizon", width=WID)
def random_walk() -> Fig:
    f = vcard()

    r = _Rand(29)
    ys, y = [], 218.0
    for _ in range(24):
        y += 1.4 + r.n(0, 3)
        ys.append(y)
    last = ys[-1]
    ax = vaxes(f, 0, 34, min(ys) - 14, last + 34, left=24, right=16, top=28,
               bottom=44)
    ax.frame(xticks=[0, 12, 24, 33], yticks=[], grid=True,
             xfmt=lambda t: "now" if t == 24 else "")
    ax.polyline(list(enumerate(ys)), colour=BLUE, width=1.9)
    fut = [(24 + h, last + 1.4 * h) for h in range(10)]
    upper = [(24 + h, last + 1.4 * h + 1.96 * 3 * math.sqrt(h)) for h in range(10)]
    lower = [(24 + h, last + 1.4 * h - 1.96 * 3 * math.sqrt(h)) for h in range(10)]
    f.polygon([ax.p(*q) for q in upper + lower[::-1]], fill=GREEN, fill_opacity="0.12",
              stroke="none")
    ax.polyline(fut, colour=GREEN, width=2.2, dash=True)
    for edge in (upper, lower):
        ax.polyline(edge, colour=GREEN, width=1.2)
    ax.vline(24, colour="var(--dim)", y_top=last + 30)
    ax.label(22, last + 26, "±1.96σ√h", cls="sm bold", fill=GREEN, anchor="end")
    return f


@figure("Differencing", "A trending series Y_t drawn as a staircase whose green risers "
        "are its differences, and those same differences laid out below as bars "
        "hovering around a flat level", width=WID)
def differencing() -> Fig:
    f = vcard()

    ys = _index_series(n=30, season=False, seed=89, noise=0.55)
    diff = [b - a for a, b in zip(ys, ys[1:])]
    n = len(ys)
    lo, hi = min(ys), max(ys)
    x0, x1 = BX0 + 16, BX1 - 8
    top = Axes(f, x0, BY0 + 18, x1, BY0 + 196, -0.5, n - 0.5, lo - 1, hi + 1)
    dmax = max(abs(d) for d in diff)
    low = Axes(f, x0, BY1 - 96, x1, BY1 - 20, -0.5, n - 0.5, -0.1, dmax * 1.1)
    hl = 17
    for t in range(n):
        top.fig.line(top.px(t - 0.5), top.py(ys[t]), top.px(t + 0.5), top.py(ys[t]),
                     cls="thin", stroke=ROSE, stroke_width="1.8")
    for t, d in enumerate(diff, start=1):
        xr = top.px(t - 0.5)
        wide = t == hl
        f.line(xr, top.py(ys[t - 1]), xr, top.py(ys[t]), cls="thin", stroke=GREEN,
               stroke_width="3" if wide else "1.8")
        f.rect(xr - 3, min(low.py(0), low.py(d)), 6, abs(low.py(d) - low.py(0)),
               rx=1, fill=GREEN, fill_opacity="0.9" if wide else "0.55")
    f.line(low.x0, low.py(0), low.x1, low.py(0), cls="axis")
    mean = sum(diff) / len(diff)
    f.line(low.x0, low.py(mean), low.x1, low.py(mean), cls="thin dash",
           stroke="var(--ink)", stroke_width="1.2")
    xr = top.px(hl - 0.5)
    f.line(xr, top.py(ys[hl - 1]) + 6, xr, low.py(diff[hl - 1]) - 6, cls="thin dash",
           stroke="var(--axis)", stroke_width="1.2")
    top.label(n - 1, ys[-1], "Y_t", cls="bold", anchor="end", dx=-4, dy=-10)
    low.label(-0.5, dmax * 1.1, "∇Y_t", cls="bold", anchor="start", dy=-6)
    return f


@figure("Autocorrelation Function", "A correlogram of a differenced series with one "
        "large negative spike at lag 1 and every later lag inside the ±1.96/√n band",
        width=WID)
def acf() -> Fig:
    f = vcard()

    ac = [-0.52, 0.06, -0.04, 0.09, -0.03, 0.05, 0.02, -0.06, 0.04, 0.01]
    ax = _corr_panel(f, BY0 + 24, BY1 - 44, ac, 144, None, BLUE)
    f.text(ax.px(1.5), ax.py(-0.52) + 6, "ρ₁ = −0.52", cls="sm bold",
           anchor="start")
    f.text(ax.x1, ax.py(1.96 / 12) - 6, "±0.163", cls="sm dim", anchor="end")
    for k in (1, 5, 10):
        f.text(ax.px(k), ax.y1 + 16, str(k), cls="sm dim")
    f.text(BCX, ax.y1 + 32, "lag k", cls="sm dim")
    return f


@figure("Partial Autocorrelation Function", "Paired spikes at each lag for an AR(1): "
        "the ACF tailing off geometrically, the PACF cutting off after lag 1", width=WID)
def pacf() -> Fig:
    f = vcard()

    phi = 0.71
    ac = [phi ** k for k in range(1, 9)]
    pac = [0.71, -0.05, 0.08, 0.02, -0.03, 0.05, -0.01, 0.03]
    ax = vaxes(f, 0.4, 8.6, -0.35, 0.85, left=40, right=16, top=30, bottom=44)
    band = 1.96 / math.sqrt(100)
    for v in (band, -band):
        f.line(ax.x0, ax.py(v), ax.x1, ax.py(v), cls="thin dash", stroke=ROSE,
               stroke_width="1.1")
    ax.frame(xticks=list(range(1, 9)), yticks=[0, 0.5], arrows=False,
             xfmt=lambda t: "")
    for k in range(1, 9):
        f.text(ax.px(k), ax.y1 + 16, str(k), cls="sm dim")
    f.line(ax.x0, ax.py(0), ax.x1, ax.py(0), cls="axis")
    for series, colour, off in ((ac, "var(--dim)", -0.16), (pac, VIOLET, 0.16)):
        for k, v in enumerate(series, start=1):
            x = ax.px(k + off)
            f.line(x, ax.py(0), x, ax.py(v), cls="", stroke=colour,
                   stroke_width="3", stroke_linecap="round")
            f.circle(x, ax.py(v), 2.8, fill=colour)
    ax.label(2 - 0.16, ac[1], "ACF", cls="sm bold", dy=-9)
    ax.label(1 + 0.16, pac[0], "PACF", cls="sm bold", anchor="start", dx=8, dy=4)
    f.text(BCX, ax.y1 + 32, "lag k", cls="sm dim")
    return f


@figure("Autoregressive Model", "An AR(1) series up to now and its dashed forecast "
        "decaying geometrically back to the long-run mean of 0.80", width=WID)
def autoregressive_model() -> Fig:
    f = vcard()

    r = _Rand(83)
    mu, phi = 0.80, 0.70
    ys, y = [], 0.92
    for _ in range(24):
        y = mu + phi * (y - mu) + r.n(0, 0.05)
        ys.append(y)
    ys[-1] = 0.92
    ax = vaxes(f, 0, 34, 0.62, 1.06, left=44, right=16, top=28, bottom=44)
    ax.frame(xticks=[0, 12, 23, 33], yticks=[0.7, 0.8, 0.9, 1.0], grid=True,
             xfmt=lambda t: "now" if t == 23 else "")
    ax.polyline(list(enumerate(ys)), colour=BLUE, width=1.9)
    fut = [(23 + h, mu + phi ** h * (0.92 - mu)) for h in range(11)]
    ax.polyline(fut, colour=GREEN, width=2.2, dash=True)
    for t, v in fut[1:4]:
        ax.point(t, v, colour=GREEN, r=3)
    ax.hline(mu, colour=AMBER, x_to=34)
    ax.label(33, 0.665, "μ = 0.80", cls="sm bold", fill=AMBER, anchor="end")
    ax.vline(23, colour="var(--dim)", y_top=1.02)
    return f


@figure("Moving Average Model", "An MA(1) series around its mean of 50 and a dashed "
        "forecast that moves once, to 48.8, then sits on the mean", width=WID)
def moving_average_model() -> Fig:
    f = vcard()

    r = _Rand(89)
    eps = [r.n(0, 5) for _ in range(26)]
    eps[25] = -3.0
    ys = [50 + eps[t] + 0.4 * eps[t - 1] for t in range(1, 26)]
    ax = vaxes(f, 0, 34, 36, 64, left=44, right=16, top=28, bottom=44)
    ax.frame(xticks=[0, 12, 24, 33], yticks=[40, 50, 60], grid=True,
             xfmt=lambda t: "now" if t == 24 else "")
    ax.polyline(list(enumerate(ys)), colour=BLUE, width=1.9)
    ax.polyline([(24, ys[-1]), (25, 48.8)] + [(25 + h, 50.0) for h in range(1, 9)],
                colour=GREEN, width=2.2, dash=True)
    ax.hline(50, colour=AMBER, x_to=34)
    ax.label(33, 38.5, "μ = 50", cls="sm bold", fill=AMBER, anchor="end")
    ax.point(25, 48.8, colour=GREEN)
    ax.label(25, 48.8, "48.8", cls="sm bold", fill=GREEN, dy=16, anchor="start",
             dx=4)
    ax.vline(24, colour="var(--dim)", y_top=62)
    return f


@figure("ARIMA", "The current value of a differenced series drawn as a node fed by "
        "arrows from its own past values (AR) and from past shocks (MA), with the "
        "series row tinted for differencing (I)", width=WID)
def arima() -> Fig:
    f = vcard()

    xs = [116, 204, 292]
    yy, ye, ry, re = 178, 314, 18, 15
    f.rect(xs[0] - 30, yy - 30, xs[-1] - xs[0] + 60, 60, rx=30, fill=AMBER,
           fill_opacity="0.1", stroke=AMBER, stroke_width="1.3", stroke_dasharray="4 3")
    # AR: the series' own past
    f.arrow(xs[1] + ry + 2, yy, xs[2] - ry - 3, yy, colour=BLUE, width=2)
    q = lambda t: ((1 - t) ** 2 * xs[0] + 2 * t * (1 - t) * xs[1] + t * t * xs[2],
                   (1 - t) ** 2 * (yy - ry) + 2 * t * (1 - t) * (yy - 94) + t * t * (yy - ry))
    f.poly([q(i / 40) for i in range(37)], cls="curve", stroke=BLUE, stroke_width="2")
    f.arrow(*q(0.9), *q(0.985), colour=BLUE, width=2)
    # MA: past and present shocks
    f.arrow(xs[1] + 11, ye - 11, xs[2] - 14, yy + 14, colour=GREEN, width=2)
    f.arrow(xs[2], ye - re - 2, xs[2], yy + ry + 3, colour="var(--ink)", width=1.6)
    for x in xs:
        f.circle(x, yy, ry, fill=BLUE, fill_opacity="0.2", stroke=BLUE,
                 stroke_width="1.6" if x != xs[2] else "2.4")
        f.circle(x, ye, re, fill=GREEN, fill_opacity="0.2", stroke=GREEN,
                 stroke_width="1.5")
    for x, lab in zip(xs, ("t−2", "t−1", "t")):
        f.text(x, ye + 34, lab, cls="sm dim")
    f.text(BX0 + 4, yy + 5, "∇ᵈY", cls="bold", anchor="start")
    f.text(BX0 + 4, ye + 5, "ε", cls="bold", anchor="start")
    f.text(xs[1], yy - 62, "AR(p)", cls="sm bold")
    f.text(xs[2] - 30, (yy + ye) / 2 + 4, "MA(q)", cls="sm bold", anchor="end")
    f.text(160, yy + 52, "I(d)", cls="sm bold")
    return f


@figure("Seasonality", "Two quarterly series on one axis, each repeating every four "
        "quarters: an additive one whose swing stays constant between parallel "
        "envelopes and a multiplicative one whose swing widens with its level",
        width=WID)
def seasonality() -> Fig:
    f = vcard()

    n = 28
    add_level = lambda t: 900 + 46 * t
    mul_level = lambda t: 1750 + 46 * t
    add = [add_level(t) + _SEASON[t % 4] * 120 for t in range(n)]
    mul = [mul_level(t) * (1 + 0.13 * _SEASON[t % 4]) for t in range(n)]
    lo, hi = min(add), max(mul)
    ax = vaxes(f, 0, n - 1, lo - 260, hi + 60, left=20, right=12, top=22, bottom=24)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    envelopes = ((add_level, lambda v: v + 1.5 * 120, lambda v: v - 1.0 * 120, BLUE),
                 (mul_level, lambda v: v * (1 + 0.13 * 1.5), lambda v: v * (1 - 0.13),
                  VIOLET))
    for level, up, down, colour in envelopes:
        for edge in (up, down):
            ax.polyline([(t, edge(level(t))) for t in (0, n - 1)], colour=colour,
                        width=1.1, dash=True)
    ax.polyline(list(enumerate(add)), colour=BLUE, width=1.9)
    ax.polyline(list(enumerate(mul)), colour=VIOLET, width=1.9)
    ax.label(0, mul_level(12) * 1.2, "multiplicative", cls="sm bold", anchor="start",
             dy=-8)
    ax.label(n - 1, add_level(n - 1) - 120, "additive", cls="sm bold", anchor="end",
             dy=18)
    y = ax.py(add_level(4) - 120) + 12
    brace(f, ax.px(2), ax.px(6), y, depth=7, label="s = 4", label_cls="sm bold")
    return f


@figure("Deterministic and Stochastic Trend", "Two series along the same dashed trend "
        "line hit by the same shock: the trend-stationary one returns to the line, the "
        "unit-root one stays shifted for good", width=WID)
def det_stoch_trend() -> Fig:
    f = vcard()

    r = _Rand(165)
    n = 44
    det, sto, z, y = [], [], 0.0, 0.0
    for t in range(n):
        shock = 9.0 if t == 18 else 0.0
        z = 0.55 * z + r.n(0, 0.8) + shock
        det.append(4 + 0.85 * t + z)
        y += 0.85 + r.n(0, 0.8) + shock
        sto.append(4 + y)
    lo, hi = min(det + sto), max(det + sto)
    ax = vaxes(f, 0, n - 1, lo - 2, hi + 3, left=24, right=12, top=22, bottom=30)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    ax.polyline([(t, 4 + 0.85 * t) for t in (0, n - 1)], colour="var(--dim)",
                width=1.4, dash=True)
    ax.vline(18, colour=AMBER, y_top=hi + 1)
    ax.label(18, hi + 1, "shock", cls="sm bold", dy=-6)
    ax.polyline(list(enumerate(det)), colour=GREEN, width=1.9)
    ax.polyline(list(enumerate(sto)), colour=ROSE, width=1.9)
    ax.label(n - 1, sto[-1], "stochastic", cls="sm bold", anchor="end", dy=-12)
    ax.label(n - 1, det[-1], "deterministic", cls="sm bold", anchor="end", dy=30)
    return f


@figure("Time Series Decomposition", "Twelve quarterly observations, each built up from "
        "a trend line, a seasonal bar off that line, and a small irregular step to the "
        "observed dot", width=WID)
def decomposition() -> Fig:
    f = vcard()

    r = _Rand(107)
    n = 12
    trend = [900 + 56 * t for t in range(n)]
    season = [_SEASON[t % 4] * 110 for t in range(n)]
    irreg = [r.n(0, 55) for _ in range(n)]
    obs = [a + b + c for a, b, c in zip(trend, season, irreg)]
    lo, hi = min(obs + trend), max(obs + trend)
    ax = vaxes(f, -0.6, n - 0.4, lo - 60, hi + 60, left=20, right=12, top=22,
               bottom=30)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    ax.polyline([(t, 900 + 56 * t) for t in (-0.4, n - 0.6)], colour=AMBER, width=2.4)
    for t in range(n):
        x = ax.px(t)
        s_top = trend[t] + season[t]
        f.rect(x - 6, min(ax.py(trend[t]), ax.py(s_top)), 12,
               abs(ax.py(trend[t]) - ax.py(s_top)), rx=2, fill=VIOLET,
               fill_opacity="0.6")
        f.line(x, ax.py(s_top), x, ax.py(obs[t]), cls="thin", stroke=GREEN,
               stroke_width="3")
    for t, v in enumerate(obs):
        ax.point(t, v, colour=BLUE, r=4.2)
    ti = max(range(n), key=lambda t: abs(irreg[t]))
    ax.label(ti, (obs[ti] + trend[ti] + season[ti]) / 2, "irregular", cls="sm bold",
             anchor="start", dx=9, dy=4)
    ax.label(2, trend[2] + season[2], "seasonal", cls="sm bold", anchor="end", dx=-10,
             dy=4)
    ax.label(1, trend[1], "trend", cls="sm bold", anchor="start", dx=10, dy=16)
    return f


@figure("Exponential Smoothing", "Bars of the weight α(1 − α)ʲ each past observation "
        "gets, falling geometrically from the latest at α = 0.3", width=WID)
def exponential_smoothing() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.6, 9.6, 0, 0.34, left=44, right=16, top=30, bottom=44)
    ax.frame(xticks=[0, 2, 4, 6, 8], yticks=[0, 0.1, 0.2, 0.3], grid=True,
             arrows=False, xfmt=lambda t: f"t−{int(t)}" if t else "t")
    ax.bars([(j, 0.3 * 0.7 ** j) for j in range(10)], colour=BLUE, bw=20,
            opacity="0.7")
    ax.curve(lambda j: 0.3 * 0.7 ** j, colour=AMBER, width=1.6, dash=True, xa=0,
             xb=9.3)
    ax.label(1.4, 0.26, "α = 0.3", cls="sm bold", anchor="start")
    return f


@figure("Time Series Forecast", "An AR(1) series up to now, then a forecast easing "
        "back to its mean of 50 inside a 95% interval that widens and then levels off",
        width=WID)
def ts_forecast() -> Fig:
    f = vcard()

    r = _Rand(113)
    mu, phi, sig = 50.0, 0.6, 4.0
    ys, y = [], 61.0
    for _ in range(22):
        y = mu + phi * (y - mu) + r.n(0, sig)
        ys.append(y)
    ys[-1] = 61.0
    ax = vaxes(f, 0, 32, 30, 78, left=44, right=16, top=28, bottom=44)
    ax.frame(xticks=[0, 10, 21, 31], yticks=[40, 50, 60, 70], grid=True,
             xfmt=lambda t: "now" if t == 21 else "")
    ax.polyline(list(enumerate(ys)), colour=BLUE, width=1.9)
    var = lambda h: sig ** 2 * sum(phi ** (2 * j) for j in range(h))
    fut = [(21 + h, mu + phi ** h * (61 - mu)) for h in range(11)]
    upper = [(t, v + 1.96 * math.sqrt(var(t - 21))) for t, v in fut]
    lower = [(t, v - 1.96 * math.sqrt(var(t - 21))) for t, v in fut]
    f.polygon([ax.p(*q) for q in upper + lower[::-1]], fill=GREEN, fill_opacity="0.12",
              stroke="none")
    ax.polyline(fut, colour=GREEN, width=2.3, dash=True)
    for edge in (upper, lower):
        ax.polyline(edge, colour=GREEN, width=1.2)
    ax.hline(mu, colour=AMBER, x_to=32)
    ax.vline(21, colour="var(--dim)", y_top=74)
    ax.point(23, mu + phi ** 2 * 11, colour=GREEN)
    ax.label(23, mu + phi ** 2 * 11, "53.96", cls="sm bold", fill=GREEN,
             anchor="start", dx=8, dy=-8)
    return f
