"""Figures for the Exam MAS-II (Modern Actuarial Statistics II) concept pages.

Same contract as `figures_exam_p.py` / `figures_exam_fm.py`: each builder returns
a `Fig` from `vcard()` — a portrait card carrying a title, one picture and one
formula. Grouped in syllabus order:

A. Credibility — classical, Bühlmann, Bayesian, empirical Bayes
B. Linear mixed models — fixed/random effects, variance components, REML, BLUP
C. Statistical learning — the framework, trees and ensembles, PCA, clustering,
   neural networks, model evaluation
D. Time series — stationarity, ACF/PACF, ARIMA, trend and seasonality

Consistent examples run through the families, as on the other two exams: the
credibility figures all price the same 300-claim class against a 1,082-claim
standard, the mixed-model figures all use the same five grouped territories, and
the time-series figures all draw the same quarterly loss index.
"""

from __future__ import annotations

import math

from figure_kit import (
    AMBER, BLUE, GREEN, ROSE, TEAL, VIOLET, SERIES,
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


def _blend_bar(f: Fig, y, z, left_label, right_label, mid_label, height=20,
               x0=48, x1=312, left_colour=AMBER, right_colour=BLUE):
    """The credibility bar: complement on the left, experience on the right."""
    w = x1 - x0
    f.rect(x0, y - height / 2, w * (1 - z), height, rx=4, fill=left_colour,
           fill_opacity="0.28", stroke=left_colour, stroke_width="1.2")
    f.rect(x0 + w * (1 - z), y - height / 2, w * z, height, rx=4, fill=right_colour,
           fill_opacity="0.4", stroke=right_colour, stroke_width="1.2")
    f.text(x0 + w * (1 - z) / 2, y + 4, left_label, cls="sm")
    f.text(x0 + w * (1 - z) + w * z / 2, y + 4, right_label, cls="sm")
    if mid_label:
        f.text(BCX, y - height / 2 - 9, mid_label, cls="sm dim")
    return x0 + w * (1 - z)


# ═══════════════════════════════════════════════════════════════════════════
# A. Credibility
# ═══════════════════════════════════════════════════════════════════════════

@figure("Credibility Theory", "A credibility estimate shown as a weighted blend "
        "between a manual rate and observed experience", width=WID)
def credibility_theory() -> Fig:
    f = vcard("Credibility blends experience with a complement",
              "Est = Z·X̄ + (1 − Z)·μ")

    z = 0.527
    x0, x1 = 48, 312
    f.text(BCX, 104, "300 claims against a 1,082-claim standard", cls="sm dim")
    _blend_bar(f, 150, z, "manual 380", "own data 420", "Z = 0.53")

    # the resulting estimate on a scale from complement to experience
    sy = 250
    f.line(x0, sy, x1, sy, cls="axis")
    for v, lab, colour in ((0.0, "380", AMBER), (1.0, "420", BLUE)):
        x = x0 + (x1 - x0) * v
        f.line(x, sy - 5, x, sy + 5, cls="tick")
        f.text(x, sy + 19, lab, cls="sm", fill=colour)
    xe = x0 + (x1 - x0) * z
    f.arrow(xe, sy - 34, xe, sy - 7, colour=GREEN, width=1.8)
    f.text(xe, sy - 41, "401", cls="bold", fill=GREEN)
    f.text(BCX, 300, "Z = 0 leans wholly on the complement,", cls="sm dim")
    f.text(BCX, 316, "Z = 1 wholly on the class's own data", cls="sm dim")
    return f


@figure("Limited Fluctuation Credibility", "The square-root credibility curve "
        "rising to full credibility at the standard", width=WID)
def limited_fluctuation() -> Fig:
    f = vcard("Classical credibility: √(n / n_F), capped at 1",
              "Z = min(√(n / 1,082), 1)")

    ax = vaxes(f, 0, 2000, 0, 1.15, left=42, right=16, top=26, bottom=44)
    ax.frame(xticks=[0, 500, 1000, 1500, 2000],
             yticks=[0, 0.5, 1.0], grid=True,
             xfmt=lambda t: f"{t/1000:.1f}k" if t else "0")
    ax.curve(lambda n: min(math.sqrt(n / 1082), 1.0), colour=BLUE, width=2.4)
    ax.hline(1.0, colour="var(--dim)", x_to=2000, label=None)
    ax.vline(1082, colour=GREEN, y_top=1.0)
    ax.label(1082, 1.0, "n_F = 1,082", cls="sm bold", dy=-8, dx=-4, anchor="end")
    ax.point(300, math.sqrt(300 / 1082), colour=AMBER, label="Z = 0.53", dy=-10, dx=22)
    f.text(BCX, ax.y1 + 32, "claims n", cls="sm dim")
    f.text(BCX, BY1 - 2, "full credibility at the standard, √ below it", cls="sm dim")
    return f


@figure("Full Credibility Standard", "The tolerance band around the true mean "
        "that sets the full-credibility claim count", width=WID)
def full_credibility_standard() -> Fig:
    f = vcard("Full credibility: inside ±k, p of the time",
              "n_F = (z / k)² = (1.645 / 0.05)² = 1,082")

    ax = vaxes(f, -3.6, 3.6, 0, 0.45, left=26, right=16, top=40, bottom=68)
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
    f.text(BCX, BY1 - 4, "tighter k or higher p ⇒ larger n_F", cls="sm dim")
    return f


@figure("Partial Credibility", "The square-root rule compared with a "
        "proportional rule below the full-credibility standard", width=WID)
def partial_credibility() -> Fig:
    f = vcard("The square root, not the ratio", "Z = √(n / n_F)")

    ax = vaxes(f, 0, 1, 0, 1.05, left=42, right=18, top=24, bottom=62)
    ax.frame(xticks=[0, 0.25, 0.5, 0.75, 1],
             yticks=[0, 0.5, 1.0], grid=True)
    ax.curve(lambda t: math.sqrt(t), colour=BLUE, width=2.4)
    ax.curve(lambda t: t, colour="var(--dim)", width=1.6, dash=True)
    ax.label(0.55, 0.80, "√(n/n_F)", cls="sm bold", fill=BLUE, dy=-4)
    ax.label(0.80, 0.72, "n/n_F", cls="sm dim", dy=6)
    ax.point(300 / 1082, math.sqrt(300 / 1082), colour=AMBER)
    ax.label(300 / 1082, math.sqrt(300 / 1082), "300 claims → 0.53",
             cls="sm", anchor="start", dx=8, dy=-8)
    f.text(BCX, ax.y1 + 32, "n / n_F", cls="sm dim")
    f.text(BCX, BY1 - 2, "28% of the data still earns 53% of the weight", cls="sm dim")
    return f


@figure("Bühlmann Credibility", "The Bühlmann credibility curve Z = n/(n+k) for "
        "three values of k", width=WID)
def buhlmann_credibility() -> Fig:
    f = vcard("Z rises with n, slowed by k = v / a", "Z = n / (n + k),  k = v / a")

    ax = vaxes(f, 0, 30, 0, 1.05, left=42, right=44, top=24, bottom=62)
    ax.frame(xticks=[0, 10, 20, 30], yticks=[0, 0.5, 1.0], grid=True)
    for k, colour in ((2, GREEN), (6, BLUE), (20, ROSE)):
        ax.curve(lambda n, k=k: n / (n + k), colour=colour, width=2.2)
        ax.label(30, 30 / (30 + k), f"k = {k}", cls="sm bold", fill=colour,
                 anchor="start", dx=6, dy=4)
    ax.point(6, 0.5, colour=BLUE)
    ax.label(6, 0.5, "n = k ⇒ Z = ½", cls="sm", anchor="start", dx=8, dy=-8)
    f.text(BCX, ax.y1 + 32, "years n", cls="sm dim")
    f.text(BCX, BY1 - 2, "noisy risks (large k) earn credibility slowly", cls="sm dim")
    return f


@figure("Expected Value of Process Variance", "Three risks with the same within-risk "
        "spread, averaged to give the EPV", width=WID)
def epv() -> Fig:
    f = vcard("EPV averages the spread inside each risk",
              "v = E[Var(X | Θ)]")

    ax = vaxes(f, -1.2, 5.2, 0, 0.62, left=24, right=16, top=40, bottom=58)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    for mu, colour in ((0.6, GREEN), (2.0, BLUE), (3.6, ROSE)):
        ax.area(lambda x, m=mu: _npdf(x, m, 0.62), mu - 1.9, mu + 1.9,
                colour=colour, opacity="0.14")
        ax.curve(lambda x, m=mu: _npdf(x, m, 0.62), colour=colour, width=1.9)
        y = ax.py(_npdf(mu + 0.62, mu, 0.62))
        f.line(ax.px(mu - 0.62), y, ax.px(mu + 0.62), y, cls="thin",
               stroke=colour, stroke_width="1.6")
    f.text(BCX, ax.y1 + 22, "each risk's own year-to-year noise", cls="sm dim")
    f.text(BCX, ax.y1 + 40, "σ²(Θ) = 0.38 for all three  ⇒  v = 0.38",
           cls="sm bold")
    f.text(BCX, BY1 - 2, "large v ⇒ own data unreliable ⇒ Z falls", cls="sm dim")
    return f


@figure("Variance of Hypothetical Means", "The spread between three risks' means, "
        "which is the VHM", width=WID)
def vhm() -> Fig:
    f = vcard("VHM measures how far apart the risks are",
              "a = Var(E[X | Θ])")

    ax = vaxes(f, -1.2, 5.2, 0, 0.62, left=24, right=16, top=40, bottom=58)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    mus = (0.6, 2.0, 3.6)
    for mu, colour in zip(mus, (GREEN, BLUE, ROSE)):
        ax.curve(lambda x, m=mu: _npdf(x, m, 0.62), colour=colour, width=1.5)
        ax.vline(mu, colour=colour, y_top=_npdf(mu, mu, 0.62), dash=False)
        ax.point(mu, 0, colour=colour, r=4)
    grand = sum(mus) / 3
    ax.vline(grand, colour="var(--dim)", y_top=0.60)
    ax.label(grand, 0.60, "μ", cls="sm dim", dy=-6)
    brace(f, ax.px(mus[0]), ax.px(mus[2]), ax.y1 + 20, depth=7,
          label="spread of the means = a")
    f.text(BCX, ax.y1 + 47, "a = 1.51 here", cls="sm bold")
    f.text(BCX, BY1 - 2, "a = 0 ⇒ identical risks ⇒ Z = 0", cls="sm dim")
    return f


@figure("Bühlmann-Straub Credibility", "Credibility built on unequal yearly "
        "exposures rather than a count of years", width=WID)
def buhlmann_straub() -> Fig:
    f = vcard("Exposure, not years, drives the weight",
              "Z = m / (m + k),  m = Σ mᵢ")

    exposures = [140, 260, 190, 410, 320]
    scale = 0.42
    base = 268
    for i, m in enumerate(exposures):
        x = 52 + i * 55
        h = m * scale
        f.rect(x, base - h, 36, h, rx=3, fill=BLUE, fill_opacity="0.55")
        f.text(x + 18, base + 15, f"Y{i+1}", cls="sm dim")
        f.text(x + 18, base - h - 7, str(m), cls="sm")
    f.line(44, base, 320, base, cls="axis")
    f.text(BCX, 106, "exposures mᵢ by year", cls="sm dim")
    brace(f, 52, 306, base + 24, depth=8, label="m = 1,320")
    f.text(BCX, 350, "k = 480  ⇒  Z = 1,320 / 1,800 = 0.73", cls="bold")
    f.text(BCX, BY1 - 2, "one big year can outweigh several small ones", cls="sm dim")
    return f


@figure("Bayesian Credibility", "A prior distribution updated by observed "
        "experience into a narrower posterior", width=WID)
def bayesian_credibility() -> Fig:
    f = vcard("Data pulls the prior toward the observed mean",
              "Est = E[θ | x] = posterior mean")

    ax = vaxes(f, 0, 0.9, 0, 9.0, left=26, right=16, top=34, bottom=56)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    ax.curve(lambda t: _gamma_pdf(t, 2, 0.10), colour="var(--dim)", width=1.8,
             dash=True)
    ax.area(lambda t: _gamma_pdf(t, 3, 0.0769), 0.001, 0.9, colour=BLUE,
            opacity="0.16")
    ax.curve(lambda t: _gamma_pdf(t, 3, 0.0769), colour=BLUE, width=2.3)
    ax.label(0.44, 3.2, "prior", cls="sm bold", anchor="start")
    ax.label(0.30, 6.6, "posterior", cls="sm bold", fill=BLUE, anchor="start")
    for v, lab, colour in ((0.20, "μ = 0.20", "var(--dim)"),
                           (0.333, "x̄ = 0.33", AMBER),
                           (0.231, "0.231", GREEN)):
        ax.vline(v, colour=colour, y_top=8.6, dash=(colour != GREEN))
    f.text(ax.px(0.231), ax.y1 + 20, "posterior mean 0.231", cls="sm bold",
           fill=GREEN)
    f.text(BCX, ax.y1 + 38, "3 years, 1 claim, Gamma(2, 0.10) prior", cls="sm dim")
    f.text(BCX, BY1 - 2, "the posterior is narrower than the prior", cls="sm dim")
    return f


@figure("Conjugate Prior", "A Gamma prior updated by Poisson data staying in the "
        "Gamma family", width=WID)
def conjugate_prior() -> Fig:
    f = vcard("The posterior stays in the prior's family",
              ["Gamma prior + Poisson data", "⇒ Gamma(α + Σx, θ / (1 + nθ))"])

    f.box(38, 100, 118, 62, label="Gamma(2, 0.10)", colour=VIOLET,
          sub="prior", label_cls="sm bold")
    f.box(204, 100, 118, 62, label="Gamma(3, 0.077)", colour=BLUE,
          sub="posterior", label_cls="sm bold")
    f.arrow(160, 131, 200, 131, colour="var(--ink)", width=1.6)
    f.text(180, 122, "data", cls="sm dim")

    f.text(BCX, 184, "n = 3 years, Σx = 1 claim", cls="sm dim")
    rows = [("Poisson", "Gamma", "Gamma"),
            ("Bernoulli", "Beta", "Beta"),
            ("Normal", "Normal", "Normal"),
            ("Exponential", "Inv. Gamma", "Inv. Gamma")]
    y0 = 222
    f.line(38, y0 - 14, 322, y0 - 14, cls="rule")
    for j, lab in enumerate(("likelihood", "prior", "posterior")):
        f.text(60 + j * 100, y0 - 20, lab, cls="sm dim")
    for i, row in enumerate(rows):
        y = y0 + 8 + i * 25
        for j, cell in enumerate(row):
            f.text(60 + j * 100, y, cell, cls="sm")
        f.line(38, y + 8, 322, y + 8, cls="rule")
    f.text(BCX, BY1 - 2, "conjugate ⇒ Bayesian = Bühlmann exactly", cls="sm dim")
    return f


@figure("Predictive Distribution", "A Poisson pmf beside the wider negative "
        "binomial that mixing it over a Gamma produces", width=WID)
def predictive_distribution() -> Fig:
    f = vcard("Mixing over the posterior widens the forecast",
              "f(xₙ₊₁ | x) = ∫ f(xₙ₊₁ | θ) π(θ | x) dθ")

    ax = vaxes(f, -0.7, 6.7, 0, 0.42, left=40, right=14, top=34, bottom=54)
    ax.frame(xticks=[0, 1, 2, 3, 4, 5, 6], yticks=[0, 0.2, 0.4], arrows=False)
    for k in range(7):
        p = _pois(k, 1.0)
        q = _nbin(k, 2, 0.5)
        ax.fig.rect(ax.px(k) - 10, ax.py(p), 9, ax.y1 - ax.py(p), rx=1.5,
                    fill="var(--dim)", fill_opacity="0.55")
        ax.fig.rect(ax.px(k) + 1, ax.py(q), 9, ax.y1 - ax.py(q), rx=1.5,
                    fill=BLUE, fill_opacity="0.75")
    f.legend(BX0 + 150, BY0 + 30, [("var(--dim)", "Poisson(1), fixed λ"),
                                   (BLUE, "predictive, λ ~ Gamma")])
    f.text(BCX, ax.y1 + 36, "same mean 1.0, variance 1.0 vs 1.5", cls="sm")
    f.text(BCX, BY1 - 2, "parameter uncertainty fattens the tail", cls="sm dim")
    return f


@figure("Empirical Bayes Credibility", "Group means whose spread must be corrected "
        "for process noise before it estimates the VHM", width=WID)
def empirical_bayes() -> Fig:
    f = vcard("Estimate v and a from the experience itself",
              "â = between-group spread − v̂ / n")

    r = _Rand(7)
    ax = vaxes(f, 0.3, 5.7, 2, 14, left=38, right=16, top=26, bottom=80)
    ax.frame(xticks=[1, 2, 3, 4, 5], yticks=[4, 8, 12], grid=True,
             xfmt=lambda t: f"R{int(t)}")
    means = [5.5, 9.2, 7.0, 11.6, 6.4]
    for i, m in enumerate(means):
        colour = SERIES[i % len(SERIES)]
        pts = [m + r.n(0, 1.15) for _ in range(4)]
        for k, v in enumerate(pts):
            ax.point(i + 1 + (k - 1.5) * 0.11, v, colour=colour, r=2.8)
        ax.fig.line(ax.px(i + 0.78), ax.py(m), ax.px(i + 1.22), ax.py(m),
                    cls="thin", stroke=colour, stroke_width="2.2")
    grand = sum(means) / len(means)
    ax.hline(grand, colour="var(--dim)", x_to=5.7, label="X̄", label_dx=2)
    f.text(BCX, ax.y1 + 40, "within-risk scatter ⇒ v̂", cls="sm dim")
    f.text(BCX, ax.y1 + 57, "spread of the bars, less v̂/n ⇒ â", cls="sm dim")
    f.text(BCX, BY1 - 2, "â < 0 is set to 0, giving Z = 0", cls="sm dim")
    return f


@figure("Complement of Credibility", "The complement carrying the weight that "
        "experience does not", width=WID)
def complement_of_credibility() -> Fig:
    f = vcard("The complement carries the other (1 − Z)",
              "Est = Z × experience + (1 − Z) × complement")

    for i, (z, lab) in enumerate(((0.15, "thin class"), (0.53, "300 claims"),
                                  (0.90, "large class"))):
        y = 120 + i * 62
        _blend_bar(f, y, z, "complement", "experience", None, height=26)
        f.text(BCX, y - 22, f"{lab} — Z = {z:.2f}", cls="sm dim")
    f.text(BCX, 322, "the smaller Z is, the more the complement", cls="sm dim")
    f.text(BCX, 338, "decides the answer — so choose it well", cls="sm dim")
    f.text(BCX, BY1 - 2, "accurate · unbiased · independent · available",
           cls="sm bold")
    return f


@figure("Frequency", "Claim counts over exposures, drawn as claims per car-year",
        width=WID)
def frequency() -> Fig:
    f = vcard("Frequency counts claims per unit of exposure",
              "Frequency = claims / exposures")

    rows, cols = 5, 8
    claims = {3, 9, 14, 22, 27, 31, 35}
    f.text(BCX, 104, "40 car-years, 7 claims", cls="sm dim")
    for i in range(rows * cols):
        cx = 52 + (i % cols) * 34
        cy = 138 + (i // cols) * 34
        on = i in claims
        f.rect(cx - 12, cy - 12, 24, 24, rx=5,
               fill=ROSE if on else "var(--soft)",
               fill_opacity="0.75" if on else "1",
               stroke=ROSE if on else "var(--edge)", stroke_width="1.2")
    f.text(BCX, 330, "7 / 40 = 0.175 claims per car-year", cls="bold")
    f.text(BCX, BY1 - 2, "pure premium = frequency × severity", cls="sm dim")
    return f


@figure("Severity", "The average cost per claim marked on a right-skewed claim "
        "size distribution", width=WID)
def severity() -> Fig:
    f = vcard("Severity is the average cost per claim",
              "Severity = total losses / claims")

    ax = vaxes(f, 0, 30, 0, 0.13, left=28, right=16, top=36, bottom=56)
    def dens(x):
        if x <= 0.2:
            return 0.0
        return math.exp(-((math.log(x) - 1.6) ** 2) / (2 * 0.7 ** 2)) / (x * 0.7 * math.sqrt(2 * math.pi))
    ax.area(dens, 0.2, 30, colour=BLUE, opacity="0.16")
    ax.curve(dens, colour=BLUE, width=2.2, xa=0.2)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    for v, lab, colour in ((5.0, "median 5.0", "var(--dim)"),
                           (6.35, "mean 6.35", GREEN)):
        ax.vline(v, colour=colour, y_top=0.125)
        ax.label(v, 0.125, lab, cls="sm bold", dy=-6,
                 anchor="end" if v < 6 else "start", dx=-3 if v < 6 else 3,
                 fill=colour)
    f.text(BCX, ax.y1 + 20, "claim size ($000s)", cls="sm dim")
    f.text(BCX, ax.y1 + 40, "the long right tail pulls the mean", cls="sm dim")
    f.text(BCX, ax.y1 + 55, "above the median", cls="sm dim")
    return f


@figure("Aggregate Loss Model", "A random number of claims of random size summing "
        "to the aggregate loss", width=WID)
def aggregate_loss_model() -> Fig:
    f = vcard("A random count of random claim sizes",
              "S = X₁ + ⋯ + X_N")

    f.text(BCX, 100, "N ~ Poisson(λ)  draws the count", cls="sm dim")
    sizes = [34, 18, 52, 26, 41]
    x = 46
    base = 214
    for i, s in enumerate(sizes):
        h = s * 1.5
        f.rect(x, base - h, 38, h, rx=3, fill=SERIES[i % len(SERIES)],
               fill_opacity="0.6")
        f.text(x + 19, base + 15, f"X{'₁₂₃₄₅'[i]}", cls="sm dim")
        x += 56
    f.line(38, base, 322, base, cls="axis")
    f.text(BCX, 258, "N = 5 this year — next year it is a different N",
           cls="sm dim")

    total = sum(sizes)
    f.rect(70, 288, 220, 34, rx=6, fill=GREEN, fill_opacity="0.18", stroke=GREEN,
           stroke_width="1.4")
    f.text(BCX, 310, f"S = {total}", cls="bold", fill=GREEN)
    f.text(BCX, BY1 - 2, "E[S] = E[N]E[X];  both vary", cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Linear mixed models
#
# One running example: five territories, each with its own baseline loss ratio,
# observed over four development periods.
# ═══════════════════════════════════════════════════════════════════════════

_TERR = [(-0.26, 0.052), (-0.11, 0.030), (0.02, 0.041), (0.14, 0.024),
         (0.30, 0.038)]   # (intercept offset, slope offset) per territory


@figure("Linear Mixed Model", "A mixed model drawn as a population line with one "
        "shifted line per group", width=WID)
def linear_mixed_model() -> Fig:
    f = vcard("One population line, one shifted line per group",
              "y = Xβ + Zb + ε")

    ax = vaxes(f, 0, 4.4, 0.55, 1.45, left=42, right=16, top=30, bottom=54)
    ax.frame(xticks=[1, 2, 3, 4], yticks=[0.7, 1.0, 1.3], grid=True)
    for i, (b0, _) in enumerate(_TERR):
        colour = SERIES[i % len(SERIES)]
        ax.polyline([(t, 0.98 + 0.06 * t + b0) for t in (0.6, 4.3)],
                    colour=colour, width=1.5)
    ax.polyline([(t, 0.98 + 0.06 * t) for t in (0.6, 4.3)], colour="var(--ink)",
                width=2.8)
    ax.label(4.3, 0.98 + 0.06 * 4.3, "Xβ", cls="sm bold", anchor="end", dy=-8)
    f.text(BCX, ax.y1 + 32, "development period", cls="sm dim")
    f.text(BCX, ax.y1 + 50, "the heavy line is the fixed part; each thin", cls="sm dim")
    f.text(BCX, ax.y1 + 65, "line is one group's random intercept", cls="sm dim")
    return f


@figure("Fixed Effects", "A fixed effect estimated separately per level against a "
        "random effect shrunk toward the mean", width=WID)
def fixed_effects() -> Fig:
    f = vcard("Fixed effects are estimated, one per level",
              "E[y] = Xβ")

    ax = vaxes(f, 0.3, 5.7, -0.42, 0.42, left=44, right=16, top=34, bottom=72)
    ax.frame(yticks=[-0.3, 0, 0.3], grid=True, arrows=False)
    for i in range(5):
        f.text(ax.px(i + 1), ax.y1 + 17, f"T{i+1}", cls="sm dim")
    for i, (b0, _) in enumerate(_TERR):
        ax.fig.rect(ax.px(i + 0.78), min(ax.py(b0), ax.py(0)),
                    ax.px(1.22) - ax.px(0.78), abs(ax.py(b0) - ax.py(0)), rx=2,
                    fill=BLUE, fill_opacity="0.7")
    ax.hline(0, colour="var(--axis)", dash=False, x_to=5.7)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="rule")
    f.text(BCX, ax.y1 + 38, "one coefficient per territory —", cls="sm dim")
    f.text(BCX, ax.y1 + 53, "5 levels cost 4 parameters, no shrinkage", cls="sm dim")
    f.text(BCX, BY1 - 2, "use when the levels themselves are the interest",
           cls="sm dim")
    return f


@figure("Random Effects", "Raw group deviations shrunk toward zero by a random "
        "effect", width=WID)
def random_effects() -> Fig:
    f = vcard("Random effects are drawn from a distribution",
              "b ~ N(0, D)")

    ax = vaxes(f, 0.3, 5.7, -0.46, 0.52, left=44, right=16, top=42, bottom=76)
    ax.frame(yticks=[-0.3, 0, 0.3], grid=True, arrows=False)
    for i in range(5):
        f.text(ax.px(i + 1), ax.y1 + 17, f"T{i+1}", cls="sm dim")
    zs = [0.35, 0.72, 0.55, 0.86, 0.48]
    for i, ((b0, _), z) in enumerate(zip(_TERR, zs)):
        x = ax.px(i + 1)
        ax.fig.circle(x - 7, ax.py(b0), 3.6, fill="var(--dim)")
        ax.fig.circle(x + 7, ax.py(b0 * z), 3.8, fill=BLUE)
        ax.fig.arrow(x - 3, ax.py(b0), x + 3.6, ax.py(b0 * z),
                     colour="var(--axis)", width=1.0)
    ax.hline(0, colour="var(--axis)", dash=False, x_to=5.7)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="rule")
    f.legend_row(BX0 + 32, BY0 + 12, [("var(--dim)", "raw"), (BLUE, "predicted b̂")],
                 gap=104)
    f.text(BCX, ax.y1 + 40, "every group is pulled toward 0 —", cls="sm dim")
    f.text(BCX, ax.y1 + 55, "the thin ones furthest", cls="sm dim")
    f.text(BCX, BY1 - 2, "5 levels cost one variance, σ²_b", cls="sm dim")
    return f


@figure("Hierarchical Model", "Observations nested inside groups nested inside a "
        "population", width=WID)
def hierarchical_model() -> Fig:
    f = vcard("Levels nested inside levels",
              "y_ij = β₀ + b_i + ε_ij")

    f.box(74, 92, 212, 34, label="population  β₀", colour=VIOLET,
          label_cls="sm bold")
    for i in range(3):
        x = 32 + i * 100
        f.box(x, 168, 88, 34, label=f"group {i+1}", colour=BLUE, label_cls="sm")
        f.arrow(180, 128, x + 44, 164, colour="var(--axis)", width=1.1)
        for j in range(3):
            cx = x + 18 + j * 26
            f.circle(cx, 264, 9, fill=GREEN, fill_opacity="0.25", stroke=GREEN,
                     stroke_width="1.2")
            f.arrow(x + 44, 204, cx, 252, colour="var(--axis)", width=1.0)
    f.text(BCX, 300, "level 3 · level 2 · level 1", cls="sm dim")
    f.text(BCX, 326, "variance is split across the levels,", cls="sm dim")
    f.text(BCX, 342, "one component each", cls="sm dim")
    f.text(BCX, BY1 - 2, "observations in a group are correlated", cls="sm dim")
    return f


@figure("Random Intercept and Slope", "Parallel group lines under a random "
        "intercept against fanning lines when the slope is random too", width=WID)
def random_intercept_slope() -> Fig:
    f = vcard("Random intercept shifts; random slope fans",
              "y = (β₀ + b₀ᵢ) + (β₁ + b₁ᵢ)x + ε")

    for panel, (title, use_slope) in enumerate((("random intercept", False),
                                                ("+ random slope", True))):
        y0 = 92 + panel * 150
        ax = Axes(f, BX0 + 40, y0 + 16, BX1 - 18, y0 + 112, 0, 4.4, 0.55, 1.55)
        ax.frame(xticks=[1, 2, 3, 4], yticks=[0.8, 1.2], grid=True, arrows=False)
        f.text(BCX, y0 + 8, title, cls="sm bold")
        for i, (b0, b1) in enumerate(_TERR):
            colour = SERIES[i % len(SERIES)]
            slope = 0.06 + (b1 - 0.037) * 4.0 if use_slope else 0.06
            ax.polyline([(t, 0.98 + slope * t + b0) for t in (0.5, 4.3)],
                        colour=colour, width=1.5)
    f.text(BCX, BY1 - 2, "a random slope costs σ²₁ and σ₀₁", cls="sm dim")
    return f


@figure("Variance Components", "Total variance split into a between-group and a "
        "within-group component", width=WID)
def variance_components() -> Fig:
    f = vcard("Total variance splits between and within",
              "Var(y) = σ²_b + σ²")

    sb, se = 250.0, 1000.0
    total = sb + se
    x0, w = 60, 200
    ytop, h = 108, 150
    hb = h * sb / total
    f.rect(x0, ytop, w, hb, rx=4, fill=VIOLET, fill_opacity="0.5")
    f.rect(x0, ytop + hb, w, h - hb, rx=4, fill=BLUE, fill_opacity="0.35")
    f.text(x0 + w / 2, ytop + hb / 2 + 4, "σ²_b = 250", cls="sm bold")
    f.text(x0 + w / 2, ytop + hb + (h - hb) / 2 + 4, "σ² = 1,000", cls="sm bold")
    f.text(x0 - 10, ytop + hb / 2 + 4, "between", cls="sm dim", anchor="end")
    f.text(x0 - 10, ytop + hb + (h - hb) / 2 + 4, "within", cls="sm dim", anchor="end")
    f.text(BCX, 286, "total 1,250", cls="bold")
    f.text(BCX, 314, "ICC = 250 / 1,250 = 0.20", cls="sm")
    f.text(BCX, 340, "the mixed-model names for VHM and EPV", cls="sm dim")
    f.text(BCX, BY1 - 2, "σ²_b = 0 collapses to ordinary regression", cls="sm dim")
    return f


@figure("Covariance Structure", "Compound symmetry, AR(1) and unstructured "
        "correlation matrices side by side", width=WID)
def covariance_structure() -> Fig:
    f = vcard("The pattern imposed on within-group correlation",
              "V = ZDZᵀ + R")

    mats = [
        ("compound symmetry", [[1, .6, .6, .6], [.6, 1, .6, .6],
                               [.6, .6, 1, .6], [.6, .6, .6, 1]], BLUE),
        ("AR(1), ρ = 0.6", [[1, .6, .36, .22], [.6, 1, .6, .36],
                            [.36, .6, 1, .6], [.22, .36, .6, 1]], AMBER),
        ("unstructured", [[1, .71, .28, .44], [.71, 1, .55, .19],
                          [.28, .55, 1, .63], [.44, .19, .63, 1]], VIOLET),
    ]
    cell = 21
    for r, (name, m, colour) in enumerate(mats):
        y0 = 96 + r * 100
        x0 = BCX - 2 * cell
        f.text(BCX, y0 - 6, name, cls="sm bold", fill=colour)
        for i in range(4):
            for j in range(4):
                v = m[i][j]
                f.rect(x0 + j * cell, y0 + i * cell, cell - 1.5, cell - 1.5, rx=2,
                       fill=colour, fill_opacity=f"{0.10 + 0.75 * v:.2f}")
        f.text(x0 - 8, y0 + 2 * cell + 4, "R", cls="sm dim", anchor="end")
    f.text(BCX, BY1 - 2, "darker = more correlated; params 2, 2, 10", cls="sm dim")
    return f


@figure("Intraclass Correlation", "The share of variance sitting between groups, "
        "and the design effect it causes", width=WID)
def intraclass_correlation() -> Fig:
    f = vcard("ICC is the between-group share of variance",
              "ρ = σ²_b / (σ²_b + σ²)")

    x0, w, y, h = 56, 208, 112, 30
    f.rect(x0, y, w * 0.2, h, rx=4, fill=VIOLET, fill_opacity="0.55")
    f.rect(x0 + w * 0.2, y, w * 0.8, h, rx=4, fill=BLUE, fill_opacity="0.28")
    f.text(x0 + w * 0.1, y + 20, "0.20", cls="sm bold")
    f.text(x0 + w * 0.6, y + 20, "0.80", cls="sm")
    f.text(x0 + w * 0.1, y - 8, "between", cls="sm dim")
    f.text(x0 + w * 0.6, y - 8, "within", cls="sm dim")

    ax = Axes(f, BX0 + 48, 186, BX1 - 20, 318, 0, 1, 0, 22)
    ax.frame(xticks=[0, 0.25, 0.5, 0.75, 1], yticks=[1, 10, 20], grid=True)
    f.text(BCX, ax.y1 + 32, "ρ", cls="sm dim")
    ax.curve(lambda p: 1 + 19 * p, colour=ROSE, width=2.3)
    ax.point(0.2, 1 + 19 * 0.2, colour=ROSE, label="4.8", dy=-9, dx=14)
    ax.label(0.52, 17.5, "design effect, n = 20", cls="sm dim")
    f.text(BCX, BY1 - 2, "500 clustered claims ≈ 104 independent ones",
           cls="sm dim")
    return f


@figure("Restricted Maximum Likelihood", "REML correcting the downward bias in the "
        "maximum-likelihood variance estimate", width=WID)
def reml() -> Fig:
    f = vcard("REML pays for the fixed effects it estimated",
              "ℓ_R adds log|XᵀV⁻¹X| to the likelihood")

    ax = vaxes(f, 0, 1.9, 0, 2.6, left=40, right=16, top=32, bottom=78)
    ax.frame(xlabel="σ̂²", xticks=[0.5, 1.0, 1.5], yticks=[], grid=True)
    ax.curve(lambda s: _npdf(s, 0.86, 0.20), colour=ROSE, width=2.2)
    ax.curve(lambda s: _npdf(s, 1.00, 0.21), colour=BLUE, width=2.2)
    ax.vline(1.0, colour="var(--dim)", y_top=2.3)
    ax.label(1.0, 2.3, "truth", cls="sm dim", dy=-6)
    ax.label(0.66, 1.55, "ML", cls="sm bold", fill=ROSE, anchor="end")
    ax.label(1.34, 1.55, "REML", cls="sm bold", fill=BLUE, anchor="start")
    f.text(BCX, ax.y1 + 40, "ML ignores the p df spent on β̂ —", cls="sm dim")
    f.text(BCX, ax.y1 + 55, "the same reason s² divides by n − 1", cls="sm dim")
    f.text(BCX, BY1 - 2, "compare fixed effects on ML, random on REML",
           cls="sm dim")
    return f


@figure("Likelihood Ratio Test", "The chi-square reference distribution with the "
        "observed deviance difference in its tail", width=WID)
def likelihood_ratio_test() -> Fig:
    f = vcard("Twice the log-likelihood gap, read off χ²",
              "Λ = −2(ℓ_reduced − ℓ_full) ~ χ²_df")

    def chi1(x):
        if x <= 0.02:
            return 0.0
        return math.exp(-x / 2) / math.sqrt(2 * math.pi * x)

    ax = vaxes(f, 0, 12, 0, 0.5, left=30, right=16, top=52, bottom=62)
    ax.area(chi1, 3.84, 12, colour=ROSE, opacity="0.22")
    ax.curve(chi1, colour=BLUE, width=2.2, xa=0.05)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    for v, lab, colour in ((3.84, "3.84", ROSE), (6.6, "Λ = 6.6", GREEN)):
        ax.vline(v, colour=colour, y_top=0.30)
        ax.label(v, 0.30, lab, cls="sm bold", fill=colour, dy=-6,
                 anchor="end" if v < 5 else "start", dx=-3 if v < 5 else 4)
    f.text(ax.px(7.6), ax.py(0.06), "5%", cls="sm", fill=ROSE)
    f.text(BCX, ax.y1 + 22, "χ²₁ — one variance component tested", cls="sm dim")
    f.text(BCX, ax.y1 + 40, "6.6 > 3.84 ⇒ keep the random effect", cls="sm bold")
    f.text(BCX, BY1 - 2, "at a boundary the true p-value is halved", cls="sm dim")
    return f


@figure("AIC", "Fit improving with parameters while the AIC penalty turns the "
        "total around", width=WID)
def aic() -> Fig:
    f = vcard("AIC = fit penalized by parameter count",
              "AIC = −2ℓ + 2k")

    ax = vaxes(f, 0.4, 8.6, 190, 240, left=44, right=16, top=30, bottom=72)
    ax.frame(xticks=[2, 4, 6, 8], yticks=[200, 220, 240], grid=True)
    fits = {1: 232, 2: 218, 3: 208, 4: 203, 5: 201, 6: 200.4, 7: 200.1, 8: 200.0}
    ax.polyline([(k, v) for k, v in fits.items()], colour="var(--dim)", width=1.8,
                dash=True)
    ax.polyline([(k, v + 2 * k) for k, v in fits.items()], colour=BLUE, width=2.4)
    best = min(fits, key=lambda k: fits[k] + 2 * k)
    ax.point(best, fits[best] + 2 * best, colour=GREEN, label="best AIC", dy=-10)
    ax.label(8, fits[8], "−2ℓ", cls="sm dim", anchor="end", dy=12)
    ax.label(2.6, fits[2] + 4 + 8, "AIC", cls="sm bold", fill=BLUE, anchor="start")
    f.text(BCX, ax.y1 + 32, "parameters k", cls="sm dim")
    f.text(BCX, ax.y1 + 50, "fit always improves; AIC does not", cls="sm dim")
    f.text(BCX, BY1 - 2, "lower is better — the value alone means nothing",
           cls="sm dim")
    return f


@figure("BIC", "The BIC penalty growing with sample size against AIC's fixed 2 per "
        "parameter", width=WID)
def bic() -> Fig:
    f = vcard("BIC's penalty grows with the sample",
              "BIC = −2ℓ + k·log n")

    ax = vaxes(f, 0, 1000, 0, 8, left=44, right=18, top=26, bottom=76)
    ax.frame(xticks=[0, 250, 500, 750, 1000], yticks=[0, 2, 4, 6, 8], grid=True)
    ax.curve(lambda n: math.log(max(n, 1.2)), colour=VIOLET, width=2.4)
    ax.hline(2, colour=BLUE, dash=False, x_to=1000)
    ax.label(760, 2, "AIC penalty = 2", cls="sm bold", fill=BLUE, dy=-8)
    ax.label(700, math.log(700), "BIC penalty = log n", cls="sm bold", fill=VIOLET,
             dy=-8, anchor="end")
    ax.vline(7.39, colour="var(--dim)", y_top=2)
    f.text(BCX, ax.y1 + 32, "sample size n", cls="sm dim")
    f.text(BCX, ax.y1 + 50, "past n ≈ 8 the BIC penalty is the harsher —",
           cls="sm dim")
    f.text(BCX, ax.y1 + 65, "so BIC picks the sparser model", cls="sm dim")
    return f


@figure("Model Structure", "The same predictors assembled into three different "
        "linear predictors", width=WID)
def model_structure() -> Fig:
    f = vcard("Which terms enter the linear predictor",
              "η = β₀ + β₁x₁ + β₂x₂ + β₃x₁x₂ + ⋯")

    rows = [("main effects", ["x₁", "x₂"], BLUE, "AIC 4,102"),
            ("+ interaction", ["x₁", "x₂", "x₁·x₂"], GREEN, "AIC 4,085"),
            ("+ polynomial", ["x₁", "x₂", "x₁·x₂", "x₁²"], AMBER, "AIC 4,088")]
    for i, (name, terms, colour, note) in enumerate(rows):
        y = 108 + i * 92
        f.text(BCX, y - 14, name, cls="sm bold", fill=colour)
        x = BCX - (len(terms) * 62 - 8) / 2
        for t in terms:
            f.chip(x + 27, y + 14, t, colour=colour, w=54)
            x += 62
        f.text(BCX, y + 48, note, cls="sm dim")
    f.text(BCX, BY1 - 2, "structure is separate from link and distribution",
           cls="sm dim")
    return f


@figure("Variable Selection", "Forward selection adding predictors while AIC "
        "falls and then rises", width=WID)
def variable_selection() -> Fig:
    f = vcard("Add a term only while the criterion improves",
              "compare by AIC, BIC or deviance")

    ax = vaxes(f, -0.4, 5.4, 4080, 4140, left=48, right=16, top=48, bottom=58)
    ax.frame(xticks=[0, 1, 2, 3, 4, 5], yticks=[4090, 4110, 4130], grid=True,
             xfmt=lambda t: f"+{int(t)}", arrows=False)
    pts = [(0, 4136), (1, 4112), (2, 4096), (3, 4085), (4, 4088), (5, 4094)]
    ax.polyline(pts, colour=BLUE, width=2.4)
    for x, y in pts:
        ax.point(x, y, colour=BLUE if x != 3 else GREEN, r=3.6)
    ax.point(3, 4085, colour=GREEN, r=5)
    ax.label(3, 4085, "stop here", cls="sm bold", fill=GREEN, dy=-11)
    f.text(BCX, BY0 + 26, "terms added, in order of significance", cls="sm dim")
    f.text(BCX, ax.y1 + 34, "forward · backward · stepwise · criterion-based",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "statistics propose; judgement disposes", cls="sm dim")
    return f


@figure("Best Linear Unbiased Predictor", "Group deviations shrunk by a credibility "
        "weight that grows with the group's size", width=WID)
def blup() -> Fig:
    f = vcard("A BLUP is a credibility-weighted deviation",
              "b̂ᵢ = [nᵢ / (nᵢ + k)] (ȳᵢ − ȳ)")

    ax = vaxes(f, 0, 22, 0, 1.05, left=44, right=18, top=30, bottom=78)
    ax.frame(xticks=[0, 5, 10, 15, 20], yticks=[0, 0.5, 1.0], grid=True)
    ax.curve(lambda n: n / (n + 4), colour=BLUE, width=2.4)
    ax.vline(4, colour="var(--dim)", y_top=0.5)
    ax.label(4, 0.5, "n = k = 4", cls="sm dim", dy=-7, anchor="start", dx=4)
    ax.point(6, 6 / 10, colour=GREEN)
    ax.label(6, 0.6, "Z = 0.60", cls="sm bold", fill=GREEN, anchor="start",
             dx=10, dy=-6)
    f.text(BCX, ax.y1 + 32, "group size nᵢ", cls="sm dim")
    f.text(BCX, ax.y1 + 50, "k = σ² / σ²_b — Bühlmann's k exactly", cls="sm dim")
    f.text(BCX, ax.y1 + 66, "raw 260 vs mean 200 ⇒ fitted 236", cls="sm bold")
    return f


@figure("Generalized Linear Model", "A linear predictor passed through a link "
        "function to a non-normal mean", width=WID)
def glm() -> Fig:
    f = vcard("A link carries the linear predictor to the mean",
              "g(μ) = β₀ + β₁x₁ + ⋯ + βₚxₚ")

    f.box(34, 100, 96, 46, label="β₀ + Σβⱼxⱼ", colour=BLUE, label_cls="sm bold")
    f.text(82, 160, "linear predictor η", cls="sm dim")
    f.box(228, 100, 96, 46, label="μ = E[y]", colour=GREEN, label_cls="sm bold")
    f.text(276, 160, "mean response", cls="sm dim")
    f.arrow(136, 123, 222, 123, colour="var(--ink)", width=1.7)
    f.text(179, 114, "g⁻¹", cls="sm bold")

    ax = Axes(f, BX0 + 46, 202, BX1 - 20, 322, -2.2, 2.2, 0, 6)
    ax.frame(yticks=[2, 4, 6], grid=True, arrows=False)
    f.text(ax.x1, ax.y1 + 16, "η", cls="sm dim", anchor="end")
    ax.curve(math.exp, colour=GREEN, width=2.3)
    ax.label(1.05, 4.6, "log link ⇒ μ = e^η", cls="sm bold", fill=GREEN,
             anchor="end")
    f.text(BCX, BY1 - 2, "log link ⇒ multiplicative rating factors", cls="sm dim")
    return f


@figure("Linear Algebra", "A design matrix times a coefficient vector giving the "
        "fitted values", width=WID)
def linear_algebra() -> Fig:
    f = vcard("Regression is one matrix equation",
              "β̂ = (XᵀX)⁻¹Xᵀy")

    def matrix(x, y, rows, cols, label, colour, cw=22, ch=20):
        f.rect(x - 5, y - 5, cols * cw + 10, rows * ch + 10, rx=5,
               fill=colour, fill_opacity="0.10", stroke=colour, stroke_width="1.3")
        for i in range(rows):
            for j in range(cols):
                f.rect(x + j * cw + 2, y + i * ch + 2, cw - 4, ch - 4, rx=2,
                       fill=colour, fill_opacity="0.35")
        f.text(x + cols * cw / 2, y + rows * ch + 24, label, cls="sm bold",
               fill=colour)
        return x + cols * cw + 10

    x = 40
    x = matrix(x, 128, 5, 3, "X  (n × p)", BLUE)
    f.text(x + 8, 178, "×", cls="bold")
    x = matrix(x + 22, 158, 3, 1, "β  (p × 1)", AMBER)
    f.text(x + 8, 178, "=", cls="bold")
    matrix(x + 22, 128, 5, 1, "ŷ  (n × 1)", GREEN)
    f.text(BCX, 268, "each row is one observation,", cls="sm dim")
    f.text(BCX, 284, "each column one predictor", cls="sm dim")
    f.text(BCX, 320, "XᵀX must be invertible — collinear", cls="sm dim")
    f.text(BCX, 336, "columns are what break it", cls="sm dim")
    f.text(BCX, BY1 - 2, "eigenvectors of XᵀX are the PCA loadings", cls="sm dim")
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


@figure("Statistical Learning", "The supervised learning loop from training data "
        "through a fitted model to test error", width=WID)
def statistical_learning() -> Fig:
    f = vcard("Learn f from data, judge it on data it never saw",
              "Y = f(X) + ε")

    steps = [("training data", BLUE), ("fit f̂", VIOLET), ("predict", GREEN),
             ("test error", ROSE)]
    for i, (lab, colour) in enumerate(steps):
        y = 108 + i * 62
        f.box(74, y, 212, 40, label=lab, colour=colour, label_cls="sm bold")
        if i < len(steps) - 1:
            f.arrow(BCX, y + 42, BCX, y + 58, colour="var(--axis)", width=1.4)
    f.text(BCX, 366, "training error always falls with flexibility —",
           cls="sm dim")
    f.text(BCX, 382, "only test error decides", cls="sm dim")
    return f


@figure("Supervised Learning", "Labelled points fitted by a boundary, against "
        "unlabelled points with no answer to fit", width=WID)
def supervised_learning() -> Fig:
    f = vcard("Every training point carries its answer",
              "fit f̂ minimizing Σ L(yᵢ, f(xᵢ))")

    r = _Rand(11)
    ax = vaxes(f, 0, 10, 0, 10, left=34, right=14, top=34, bottom=76)
    ax.frame(xticks=[], yticks=[], arrows=False, grid=False)
    f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=6, fill="var(--soft)",
           stroke="var(--edge)")
    for _ in range(26):
        x, y = 1 + 8 * r.u(), 1 + 8 * r.u()
        pos = y > 0.85 * x + 1.1
        ax.point(x, y, colour=ROSE if pos else BLUE, r=3.4)
    ax.polyline([(0.4, 1.44), (9.6, 9.26)], colour="var(--ink)", width=2)
    ax.label(7.4, 9.0, "f̂", cls="sm bold")
    f.legend_row(BX0 + 34, BY1 - 62, [(ROSE, "claim"), (BLUE, "no claim")], gap=104)
    f.text(BCX, BY1 - 36, "regression → numeric Y · classification → class Y",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "scored against the label it was given", cls="sm dim")
    return f


@figure("Unsupervised Learning", "Unlabelled points whose structure has to be "
        "inferred without any response", width=WID)
def unsupervised_learning() -> Fig:
    f = vcard("No response — only structure to find",
              "given X₁, …, Xₙ ∈ ℝᵖ, find structure")

    r = _Rand(23)
    ax = vaxes(f, 0, 10, 0, 10, left=34, right=14, top=34, bottom=74)
    ax.frame(xticks=[], yticks=[], arrows=False)
    f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=6, fill="var(--soft)",
           stroke="var(--edge)")
    for cx, cy in ((2.8, 7.2), (7.2, 7.6), (5.2, 2.8)):
        for _ in range(9):
            ax.point(cx + r.n(0, 0.85), cy + r.n(0, 0.75), colour="var(--dim)",
                     r=3.2)
    for cx, cy in ((2.8, 7.2), (7.2, 7.6), (5.2, 2.8)):
        f.circle(ax.px(cx), ax.py(cy), 30, fill="none", stroke=VIOLET,
                 stroke_width="1.4", stroke_dasharray="4 3")
    f.text(BCX, BY1 - 50, "every point the same colour — there is", cls="sm dim")
    f.text(BCX, BY1 - 34, "no label to score a fit against", cls="sm dim")
    f.text(BCX, BY1 - 2, "PCA and clustering, judged by judgement", cls="sm dim")
    return f


@figure("Bias-Variance Tradeoff", "Test error as a U-shape over flexibility, with "
        "the bias and variance components underneath", width=WID)
def bias_variance() -> Fig:
    f = vcard("Test error is a U over flexibility",
              "E[(y − f̂)²] = Bias² + Var + Var(ε)")

    ax = vaxes(f, 0, 10, 0, 52, left=42, right=16, top=28, bottom=76)
    ax.frame(xticks=[], yticks=[], grid=False)
    bias = lambda t: 34 * math.exp(-0.55 * t) + 1
    var = lambda t: 1.6 * math.exp(0.30 * t)
    noise = 8.0
    ax.curve(bias, colour=AMBER, width=1.9, xa=0.2)
    ax.curve(var, colour=VIOLET, width=1.9, xa=0.2)
    ax.hline(noise, colour="var(--dim)", x_to=10)
    ax.curve(lambda t: bias(t) + var(t) + noise, colour=ROSE, width=2.6, xa=0.2)
    ax.curve(lambda t: 30 * math.exp(-0.42 * t) + 1.5, colour=BLUE, width=1.9,
             dash=True, xa=0.2)
    best = min(range(20, 900), key=lambda i: bias(i / 100) + var(i / 100))
    ax.vline(best / 100, colour=GREEN, y_top=50)
    ax.label(best / 100, 50, "best", cls="sm bold", fill=GREEN, dy=-5)
    ax.label(5.4, bias(5.4) + 4.5, "bias²", cls="sm", fill=AMBER)
    ax.label(8.4, var(8.4) + 5, "var", cls="sm", fill=VIOLET, anchor="end")
    ax.label(9.5, noise + 4.5, "Var(ε)", cls="sm dim", anchor="end")
    ax.label(1.4, 46, "test", cls="sm bold", fill=ROSE)
    ax.label(1.5, 22, "train", cls="sm", fill=BLUE, anchor="start")
    f.text(BCX, ax.y1 + 20, "flexibility →", cls="sm dim")
    f.text(BCX, BY1 - 2, "the noise floor no method beats", cls="sm dim")
    return f


@figure("Cross-Validation", "Five folds each taking a turn as the validation set",
        width=WID)
def cross_validation() -> Fig:
    f = vcard("Each fold takes a turn as the held-out set",
              "CV₍K₎ = (1/K) Σ MSEₖ")

    x0, w, cw = 52, 236, 236 / 5
    for k in range(5):
        y = 106 + k * 34
        for j in range(5):
            held = j == k
            f.rect(x0 + j * cw + 1.5, y, cw - 3, 24, rx=3,
                   fill=ROSE if held else BLUE,
                   fill_opacity="0.6" if held else "0.22",
                   stroke=ROSE if held else BLUE, stroke_width="1")
        f.text(x0 - 8, y + 17, f"{k+1}", cls="sm dim", anchor="end")
        f.text(x0 + w + 10, y + 17, f"MSE{k+1}", cls="sm dim", anchor="start")
    f.legend_row(BX0 + 40, 292, [(BLUE, "train"), (ROSE, "validate")], gap=110)
    f.text(BCX, 326, "average the five to estimate test error", cls="sm dim")
    f.text(BCX, 352, "K = n is LOOCV: near-unbiased, high variance",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "select variables inside the fold, not before",
           cls="sm dim")
    return f


@figure("Bootstrap", "One sample resampled with replacement into many bootstrap "
        "samples", width=WID)
def bootstrap() -> Fig:
    f = vcard("Resample with replacement, B times",
              "SE_B = sd of the B bootstrap estimates")

    orig = [1, 2, 3, 4, 5, 6]
    draws = [[3, 1, 5, 3, 6, 2], [2, 2, 4, 6, 1, 4], [5, 3, 3, 1, 6, 6]]
    cw = 30
    x0 = BCX - len(orig) * cw / 2
    for j, v in enumerate(orig):
        f.rect(x0 + j * cw + 2, 100, cw - 4, 24, rx=3, fill="var(--dim)",
               fill_opacity="0.3", stroke="var(--edge)")
        f.text(x0 + j * cw + cw / 2, 117, str(v), cls="sm")
    f.text(BCX, 92, "the observed sample", cls="sm dim")
    for i, row in enumerate(draws):
        y = 164 + i * 44
        seen = set()
        for j, v in enumerate(row):
            dup = v in seen
            seen.add(v)
            f.rect(x0 + j * cw + 2, y, cw - 4, 24, rx=3, fill=BLUE,
                   fill_opacity="0.5" if dup else "0.24", stroke=BLUE,
                   stroke_width="1")
            f.text(x0 + j * cw + cw / 2, y + 17, str(v), cls="sm")
        f.text(x0 - 10, y + 17, f"*{i+1}", cls="sm dim", anchor="end")
    f.text(BCX, 316, "darker = a repeat draw", cls="sm dim")
    f.text(BCX, 342, "(1 − 1/n)ⁿ → e⁻¹ : ~37% of rows are left out", cls="sm")
    f.text(BCX, BY1 - 2, "those left out are the out-of-bag set", cls="sm dim")
    return f


@figure("Regularization", "Ridge shrinking coefficients smoothly while lasso "
        "drives them to zero", width=WID)
def regularization() -> Fig:
    f = vcard("A penalty on size shrinks the coefficients",
              ["ridge:  min RSS + λ Σ βⱼ²", "lasso:  min RSS + λ Σ |βⱼ|"])

    for panel, (name, colour, lasso) in enumerate((("ridge (ℓ₂)", BLUE, False),
                                                   ("lasso (ℓ₁)", VIOLET, True))):
        y0 = 92 + panel * 148
        ax = Axes(f, BX0 + 42, y0 + 16, BX1 - 16, y0 + 108, 0, 6, -1.1, 1.5)
        ax.frame(xticks=[2, 4, 6], yticks=[-1, 0, 1], grid=True, arrows=False)
        f.text(BCX, y0 + 8, name, cls="sm bold", fill=colour)
        starts = [1.30, 0.85, -0.90, 0.35, -0.20]
        for i, b in enumerate(starts):
            if lasso:
                hit = 0.7 + 1.0 * abs(b)
                fn = lambda t, b=b, h=hit: (0 if t >= h else b * (1 - t / h))
            else:
                fn = lambda t, b=b: b / (1 + 0.42 * t)
            ax.curve(fn, colour=SERIES[i % len(SERIES)], width=1.8, n=90)
        ax.hline(0, colour="var(--axis)", dash=False, x_to=6)
    f.text(BCX, BY1 - 2, "λ → increasing;  lasso zeroes, ridge only shrinks",
           cls="sm dim")
    return f


@figure("K-Nearest Neighbors", "A query point classified by a vote of its five "
        "nearest neighbours", width=WID)
def knn() -> Fig:
    f = vcard("Vote among the k nearest points",
              "ŷ₀ = majority of the k nearest xᵢ")

    r = _Rand(31)
    ax = vaxes(f, 0, 10, 0, 10, left=30, right=14, top=34, bottom=74)
    ax.frame(xticks=[], yticks=[], arrows=False)
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
        ax.point(x, y, colour=ROSE if pos else BLUE, r=3.8 if i < 5 else 3.0)
    f.circle(ax.px(q[0]), ax.py(q[1]), 5, fill="var(--surf)", stroke="var(--ink)",
             stroke_width="1.8")
    ax.label(q[0], q[1], "x₀", cls="sm bold", dy=-11)
    f.text(BCX, BY1 - 50, "k = 5 — three blue, two rose ⇒ blue", cls="sm")
    f.text(BCX, BY1 - 30, "k = 1 interpolates: no bias, all variance", cls="sm dim")
    f.text(BCX, BY1 - 2, "k large oversmooths: all bias, no variance",
           cls="sm dim")
    return f


@figure("Decision Tree", "A tree of binary splits and the rectangles it carves "
        "out of predictor space", width=WID)
def decision_tree() -> Fig:
    f = vcard("Recursive binary splits of predictor space",
              "split to minimize RSS (or Gini / entropy)")

    f.circle(BCX, 106, 9, fill=BLUE, fill_opacity="0.2", stroke=BLUE,
             stroke_width="1.5")
    f.text(BCX, 92, "age < 25?", cls="sm dim")
    for sgn, lab in ((-1, "yes"), (1, "no")):
        x = BCX + sgn * 74
        f.line(BCX + sgn * 6, 113, x, 146, cls="thin", stroke="var(--axis)",
               stroke_width="1.2")
        f.text(BCX + sgn * 42, 128, lab, cls="sm dim")
    f.circle(BCX - 74, 154, 9, fill=BLUE, fill_opacity="0.2", stroke=BLUE,
             stroke_width="1.5")
    f.text(BCX - 74, 142, "power > 150?", cls="sm dim")
    f.rect(BCX + 56, 146, 36, 18, rx=3, fill=GREEN, fill_opacity="0.5")
    f.text(BCX + 74, 159, "R₃", cls="sm")
    for sgn, lab in ((-1, "R₁"), (1, "R₂")):
        x = BCX - 74 + sgn * 38
        f.line(BCX - 74 + sgn * 6, 161, x, 190, cls="thin", stroke="var(--axis)",
               stroke_width="1.2")
        f.rect(x - 18, 190, 36, 18, rx=3, fill=GREEN, fill_opacity="0.5")
        f.text(x, 203, lab, cls="sm")

    ax = Axes(f, BX0 + 46, 236, BX1 - 24, 348, 0, 1, 0, 1)
    ax.frame(xticks=[], yticks=[], arrows=False)
    f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=4, fill="var(--soft)",
           stroke="var(--edge)")
    xs, ys = ax.px(0.45), ax.py(0.55)
    f.rect(ax.x0, ax.y0, xs - ax.x0, ys - ax.y0, fill=BLUE, fill_opacity="0.16")
    f.rect(ax.x0, ys, xs - ax.x0, ax.y1 - ys, fill=AMBER, fill_opacity="0.16")
    f.rect(xs, ax.y0, ax.x1 - xs, ax.y1 - ax.y0, fill=GREEN, fill_opacity="0.16")
    f.line(xs, ax.y0, xs, ax.y1, cls="thin", stroke="var(--ink)", stroke_width="1.4")
    f.line(ax.x0, ys, xs, ys, cls="thin", stroke="var(--ink)", stroke_width="1.4")
    for lab, px, py in (("R₁", 0.22, 0.28), ("R₂", 0.22, 0.78), ("R₃", 0.72, 0.5)):
        ax.label(px, py, lab, cls="sm bold")
    f.text(BCX, BY1 - 2, "age →,  power ↑", cls="sm dim")
    return f


@figure("Tree Pruning", "The cost-complexity score picking a subtree as alpha "
        "rises", width=WID)
def tree_pruning() -> Fig:
    f = vcard("Grow it too big, then cut back",
              "RSS + α·|T|,  α chosen by CV")

    ax = vaxes(f, 0, 9, 230, 580, left=48, right=20, top=42, bottom=76)
    ax.frame(xticks=[1, 3, 5, 8], yticks=[300, 400, 500], grid=True)
    data = [(1, 520), (3, 340), (5, 285), (8, 262)]
    ax.polyline(data, colour="var(--dim)", width=1.8, dash=True)
    ax.polyline([(n, r + 25 * n) for n, r in data], colour=BLUE, width=2.4)
    for n, r in data:
        ax.point(n, r + 25 * n, colour=GREEN if n == 5 else BLUE,
                 r=5 if n == 5 else 3.4)
    ax.label(5, 410, "best at α = 25", cls="sm bold", fill=GREEN, dy=-12)
    ax.label(7.4, 262, "RSS", cls="sm dim", anchor="end", dy=14)
    ax.label(1.2, 545, "RSS + α|T|", cls="sm bold", fill=BLUE, anchor="start",
             dy=-8)
    f.text(BCX, ax.y1 + 32, "terminal nodes |T|", cls="sm dim")
    f.text(BCX, ax.y1 + 50, "raising α collapses the tree from the leaves up",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "grow first, prune second — never stop early",
           cls="sm dim")
    return f


@figure("Gini Index", "Node impurity as a function of the class proportion, "
        "compared with entropy", width=WID)
def gini_index() -> Fig:
    f = vcard("Impurity is highest at a 50-50 node",
              "G = Σ p̂ₘₖ(1 − p̂ₘₖ)")

    ax = vaxes(f, 0, 1, 0, 0.78, left=44, right=16, top=30, bottom=76)
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
    ax.label(0.9, 0.18, "0.18", cls="sm", fill=GREEN, anchor="end", dx=-7, dy=-7)
    f.text(BCX, ax.y1 + 32, "proportion in class 1", cls="sm dim")
    f.text(BCX, ax.y1 + 50, "0 at a pure node, ½ at 50-50", cls="sm dim")
    f.text(BCX, BY1 - 2, "in a lift context, Gini = 2·AUROC − 1", cls="sm dim")
    return f


@figure("Entropy", "Entropy peaking at maximum uncertainty and vanishing at "
        "certainty", width=WID)
def entropy() -> Fig:
    f = vcard("Entropy measures uncertainty in bits",
              "D = −Σ p̂ₘₖ log p̂ₘₖ")

    ax = vaxes(f, 0, 1, 0, 1.12, left=44, right=16, top=30, bottom=76)
    ax.frame(xticks=[0, 0.25, 0.5, 0.75, 1], yticks=[0, 0.5, 1.0], grid=True)
    ax.curve(lambda p: 0 if p <= 0 or p >= 1 else
             -(p * math.log2(p) + (1 - p) * math.log2(1 - p)),
             colour=VIOLET, width=2.4, xa=0.002, xb=0.998)
    ax.point(0.5, 1.0, colour=VIOLET, r=4)
    ax.label(0.5, 1.0, "1 bit — a coin flip", cls="sm bold", fill=VIOLET, dy=-8)
    ax.point(0.9, -(0.9 * math.log2(0.9) + 0.1 * math.log2(0.1)), colour=GREEN)
    ax.label(0.9, 0.47, "0.47", cls="sm", fill=GREEN, anchor="end", dx=-8, dy=-7)
    f.text(BCX, ax.y1 + 32, "proportion in class 1", cls="sm dim")
    f.text(BCX, ax.y1 + 50, "0 when the node is pure", cls="sm dim")
    f.text(BCX, BY1 - 2, "like Gini, but steeper near a pure node", cls="sm dim")
    return f


@figure("Residual Sum of Squares", "Vertical residuals from a fitted line, squared "
        "and summed", width=WID)
def rss() -> Fig:
    f = vcard("The squared vertical gaps, added up",
              "RSS = Σ (yᵢ − ŷᵢ)²")

    r = _Rand(5)
    ax = vaxes(f, 0, 10, 0, 10, left=36, right=16, top=32, bottom=70)
    ax.frame(xticks=[], yticks=[], grid=True)
    line = lambda x: 1.4 + 0.72 * x
    ax.curve(line, colour="var(--ink)", width=2)
    for i in range(9):
        x = 0.9 + i * 1.02
        y = line(x) + r.n(0, 1.15)
        y = max(0.5, min(9.5, y))
        f.line(ax.px(x), ax.py(y), ax.px(x), ax.py(line(x)), cls="thin",
               stroke=ROSE, stroke_width="1.6")
        ax.point(x, y, colour=BLUE, r=3.4)
    ax.label(8.4, line(8.4), "ŷ", cls="sm bold", dy=-9, dx=6)
    f.text(BCX, ax.y1 + 26, "the rose segments are the residuals", cls="sm dim")
    f.text(BCX, ax.y1 + 44, "squaring punishes the big misses hardest",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "the splitting criterion for a regression tree",
           cls="sm dim")
    return f


@figure("Tree Ensemble", "Many trees fitted and combined into one prediction",
        width=WID)
def tree_ensemble() -> Fig:
    f = vcard("Many weak trees beat one strong tree",
              "f̂(x) = average (or vote) over B trees")

    for i in range(3):
        x = 78 + i * 102
        _tree(f, x, 118, 2, 26, 40, SERIES[i % len(SERIES)], r=6)
        f.text(x, 214, f"tree {i+1}", cls="sm dim")
    f.text(BCX + 96, 178, "…", cls="bold")
    for i in range(3):
        f.arrow(78 + i * 102, 226, BCX, 258, colour="var(--axis)", width=1.1)
    f.box(102, 262, 156, 34, label="average / vote", colour=GREEN,
          label_cls="sm bold")
    f.text(BCX, 322, "bagging & random forests: parallel, cut variance",
           cls="sm dim")
    f.text(BCX, 338, "boosting: sequential, cuts bias", cls="sm dim")
    f.text(BCX, BY1 - 2, "accuracy bought with interpretability", cls="sm dim")
    return f


@figure("Bagging", "Bootstrap resamples each growing their own tree, averaged into "
        "one prediction", width=WID)
def bagging() -> Fig:
    f = vcard("Average trees grown on bootstrap resamples",
              "f̂_bag(x) = (1/B) Σ f̂*ᵇ(x)")

    f.box(112, 92, 136, 30, label="training data", colour="var(--edge)",
          label_cls="sm")
    for i in range(3):
        x = 78 + i * 102
        f.arrow(180, 124, x, 152, colour="var(--axis)", width=1.1)
        f.rect(x - 34, 154, 68, 22, rx=4, fill=BLUE, fill_opacity="0.18",
               stroke=BLUE, stroke_width="1.1")
        f.text(x, 169, f"resample {i+1}", cls="sm")
        _tree(f, x, 200, 2, 22, 32, SERIES[i % len(SERIES)], r=5)
        f.arrow(x, 278, BCX, 302, colour="var(--axis)", width=1.1)
    f.box(112, 306, 136, 30, label="average", colour=GREEN, label_cls="sm bold")
    f.text(BCX, 358, "Var = ρσ² + (1 − ρ)σ²/B — averaging kills", cls="sm dim")
    f.text(BCX, 374, "the second term, never the first", cls="sm dim")
    f.text(BCX, BY1 - 2, "trees grown deep and unpruned", cls="sm dim")
    return f


@figure("Random Forest", "Splits restricted to a random subset of predictors so "
        "the trees decorrelate", width=WID)
def random_forest() -> Fig:
    f = vcard("Only m of p predictors may split each node",
              "m ≈ √p  (classification),  p/3  (regression)")

    p = 9
    for row, (m, label, colour) in enumerate(((9, "bagging: m = p", "var(--dim)"),
                                              (3, "forest: m = √p = 3", BLUE))):
        y = 108 + row * 74
        f.text(BCX, y - 10, label, cls="sm bold", fill=colour)
        chosen = ({0, 1, 2, 3, 4, 5, 6, 7, 8} if m == 9 else {1, 4, 7})
        for j in range(p):
            x = 62 + j * 28
            on = j in chosen
            f.rect(x, y, 22, 22, rx=4, fill=colour if on else "var(--soft)",
                   fill_opacity="0.55" if on else "1",
                   stroke=colour if on else "var(--edge)", stroke_width="1.1")
        f.text(BCX, y + 42, "eligible at this split" if row else
               "every predictor eligible — the strong one always wins",
               cls="sm dim")

    ax = Axes(f, BX0 + 46, 258, BX1 - 20, 338, 1, 40, 0, 1.08)
    ax.frame(xticks=[], yticks=[], arrows=False)
    for rho, colour, lab in ((0.85, "var(--dim)", "bagging, ρ = 0.85"),
                             (0.35, BLUE, "forest, ρ = 0.35")):
        ax.curve(lambda b, r=rho: r + (1 - r) / b, colour=colour, width=2.2)
        ax.hline(rho, colour=colour, x_to=40)
        ax.label(39, rho + 0.09, lab, cls="sm bold", fill=colour, anchor="end")
    f.text(BCX, ax.y1 + 18, "trees B →   variance floors at ρσ²", cls="sm dim")
    f.text(BCX, BY1 - 2, "m = p is bagging; small m decorrelates more",
           cls="sm dim")
    return f


@figure("Boosting", "Trees fitted in sequence to the residuals left by the ones "
        "before", width=WID)
def boosting() -> Fig:
    f = vcard("Each small tree fits what is left over",
              "f̂ ← f̂ + λ f̂ᵇ,   r ← r − λ f̂ᵇ")

    for i in range(3):
        x = 66 + i * 96
        f.rect(x - 30, 100, 60, 22, rx=4, fill=ROSE, fill_opacity="0.18",
               stroke=ROSE, stroke_width="1.1")
        f.text(x, 115, f"residual r{i+1}", cls="sm")
        f.arrow(x, 124, x, 144, colour="var(--axis)", width=1.1)
        _tree(f, x, 156, 1, 18, 28, BLUE, r=5)
        if i < 2:
            f.arrow(x + 34, 156, x + 62, 111, colour="var(--axis)", width=1.1)
    f.text(BCX, 214, "stumps, depth d = 1–4 — deliberately weak", cls="sm dim")

    ax = Axes(f, BX0 + 46, 244, BX1 - 20, 334, 0, 5000, 0, 1)
    ax.frame(xticks=[0, 2500, 5000], yticks=[], grid=True,
             xfmt=lambda t: f"{int(t/1000)}k" if t else "0")
    ax.curve(lambda b: 0.9 * math.exp(-b / 1400) + 0.04, colour=BLUE, width=2)
    ax.curve(lambda b: 0.42 + 0.55 * math.exp(-b / 700) + (b / 5000) ** 2 * 0.42,
             colour=ROSE, width=2.2)
    ax.vline(1200, colour=GREEN, y_top=0.95)
    ax.label(1200, 0.95, "stop", cls="sm bold", fill=GREEN, dy=-5)
    ax.label(4200, 0.16, "train", cls="sm", fill=BLUE)
    ax.label(4100, 0.86, "CV", cls="sm bold", fill=ROSE)
    f.text(BCX, ax.y1 + 36, "trees B →", cls="sm dim")
    f.text(BCX, BY1 - 2, "too many trees overfits — unlike bagging", cls="sm dim")
    return f


@figure("Out-of-Bag Error", "The observations a bootstrap resample leaves out, "
        "used as a free test set", width=WID)
def oob_error() -> Fig:
    f = vcard("Each resample leaves ~37% of rows out",
              "(1 − 1/n)ⁿ → e⁻¹ ≈ 0.368")

    rows, cols = 6, 6
    inbag = {0, 1, 3, 4, 6, 8, 9, 11, 12, 14, 15, 17, 18, 20, 22, 23, 24, 26,
             28, 29, 30, 32, 34, 35}
    x0, y0, cell = 96, 100, 26
    for i in range(rows * cols):
        cx = x0 + (i % cols) * cell
        cy = y0 + (i // cols) * cell
        on = i in inbag
        f.rect(cx, cy, cell - 3, cell - 3, rx=3,
               fill=BLUE if on else ROSE, fill_opacity="0.5" if on else "0.55")
    f.legend_row(BX0 + 40, 268, [(BLUE, "in the bag"), (ROSE, "out of bag")],
                 gap=124)
    f.text(BCX, 300, "each row is predicted by the ~37% of trees", cls="sm dim")
    f.text(BCX, 316, "that never saw it — a free held-out set", cls="sm dim")
    f.text(BCX, 348, "B = 600 ⇒ ≈ 221 trees vote on each row", cls="sm")
    f.text(BCX, BY1 - 2, "≈ LOOCV, at no extra fitting cost", cls="sm dim")
    return f


@figure("Variable Importance", "Predictors ranked by the impurity they remove "
        "across the trees of an ensemble", width=WID)
def variable_importance() -> Fig:
    f = vcard("Rank predictors by impurity removed",
              "Imp(Xⱼ) = mean Δ impurity over splits on Xⱼ")

    items = [("prior claims", 100), ("claim amount", 71), ("days to report", 64),
             ("territory", 12), ("policy age", 9), ("gender", 2)]
    x0, w = 130, 178
    for i, (lab, v) in enumerate(items):
        y = 108 + i * 34
        f.text(x0 - 10, y + 14, lab, cls="sm", anchor="end")
        f.rect(x0, y, w * v / 100, 20, rx=3, fill=BLUE,
               fill_opacity=f"{0.25 + 0.005 * v:.2f}")
        f.text(x0 + w * v / 100 + 7, y + 14, str(v), cls="sm dim", anchor="start")
    f.line(x0, 100, x0, 320, cls="rule")
    f.text(BCX, 344, "importance says a variable matters,", cls="sm dim")
    f.text(BCX, 360, "not which way it pushes the prediction", cls="sm dim")
    f.text(BCX, BY1 - 2, "correlated predictors split the credit", cls="sm dim")
    return f


@figure("Principal Components Analysis", "The first principal component drawn as "
        "the direction of greatest variance in a scatter", width=WID)
def pca() -> Fig:
    f = vcard("PC1 is the direction of greatest variance",
              "PVE_m = λ_m / Σλⱼ")

    r = _Rand(41)
    ax = vaxes(f, -3.4, 3.4, -3.4, 3.4, left=34, right=16, top=32, bottom=78)
    ax.frame(xticks=[], yticks=[], arrows=True)
    for _ in range(48):
        a, b = r.n(), r.n()
        x = 1.02 * a + 0.30 * b
        y = 0.62 * a - 0.42 * b
        ax.point(x, y, colour=BLUE, r=3.0)
    for v, colour, lab, ln in (((0.85, 0.53), ROSE, "PC1", 2.9),
                               ((-0.53, 0.85), VIOLET, "PC2", 1.5)):
        f.arrow(ax.px(0), ax.py(0), ax.px(v[0] * ln), ax.py(v[1] * ln),
                colour=colour, width=2.2)
        ax.label(v[0] * ln, v[1] * ln, lab, cls="sm bold", fill=colour,
                 dy=-8 if lab == "PC1" else 12, dx=10 if lab == "PC1" else -6)
    f.text(BCX, ax.y1 + 22, "φ₁ = (0.85, 0.53), ‖φ₁‖ = 1", cls="sm")
    f.text(BCX, ax.y1 + 40, "λ₁ = 1.6, λ₂ = 0.4 ⇒ PVE₁ = 80%", cls="sm bold")
    f.text(BCX, BY1 - 2, "components are orthogonal by construction",
           cls="sm dim")
    return f


@figure("Loading Vector", "The weights of a loading vector shown as a bar per "
        "variable for two components", width=WID)
def loading_vector() -> Fig:
    f = vcard("A loading vector weights the variables",
              "z_im = Σⱼ φ_jm x_ij,   Σⱼ φ²_jm = 1")

    vars_ = ["braking", "cornering", "night", "mileage"]
    pcs = [("φ₁ — overall size", [0.52, 0.51, 0.49, 0.48], BLUE),
           ("φ₂ — a contrast", [0.61, 0.55, -0.42, -0.39], VIOLET)]
    for r_i, (name, load, colour) in enumerate(pcs):
        y0 = 104 + r_i * 132
        f.text(BCX, y0 - 6, name, cls="sm bold", fill=colour)
        base = y0 + 52
        f.line(52, base, 316, base, cls="axis")
        for j, v in enumerate(load):
            x = 66 + j * 62
            h = v * 46
            f.rect(x, base - max(h, 0), 34, abs(h), rx=2, fill=colour,
                   fill_opacity="0.6")
            f.text(x + 17, base + (16 if v > 0 else -8), vars_[j], cls="sm dim")
            f.text(x + 17, base - h + (-6 if v > 0 else 14), f"{v:+.2f}",
                   cls="sm")
    f.text(BCX, BY1 - 2, "sign is arbitrary — φ and −φ are one component",
           cls="sm dim")
    return f


@figure("Proportion of Variance Explained", "Per-component and cumulative variance "
        "explained across eight components", width=WID)
def pve() -> Fig:
    f = vcard("How much variance each component carries",
              "PVE_m = λ_m / Σλⱼ")

    lam = [3.6, 1.9, 1.0, 0.6, 0.4, 0.3, 0.2, 0.0]
    total = sum(lam)
    ax = vaxes(f, 0.3, 8.7, 0, 1.05, left=44, right=16, top=32, bottom=76)
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
    ax.label(1.1, 0.84, "80% target", cls="sm bold", fill=GREEN, anchor="start")
    ax.vline(3, colour=GREEN, y_top=0.8125)
    f.text(BCX, ax.y1 + 32, "component m", cls="sm dim")
    f.text(BCX, ax.y1 + 50, "three components clear 80%", cls="sm bold")
    f.text(BCX, BY1 - 2, "variance explained ≠ predictive power", cls="sm dim")
    return f


@figure("Scree Plot", "Eigenvalues falling steeply and then flattening, with the "
        "elbow marked", width=WID)
def scree_plot() -> Fig:
    f = vcard("Keep the components before the elbow",
              "plot λ_m against m")

    lam = [2.9, 1.6, 0.7, 0.4, 0.3, 0.1]
    ax = vaxes(f, 0.4, 6.6, 0, 3.3, left=44, right=18, top=34, bottom=76)
    ax.frame(xticks=[1, 2, 3, 4, 5, 6], yticks=[0, 1, 2, 3], grid=True)
    ax.polyline([(i + 1, v) for i, v in enumerate(lam)], colour=BLUE, width=2.4)
    for i, v in enumerate(lam):
        ax.point(i + 1, v, colour=GREEN if i == 1 else BLUE,
                 r=5 if i == 1 else 3.4)
    ax.hline(1.0, colour=VIOLET, x_to=6.6)
    ax.label(6.4, 1.0, "λ = 1", cls="sm bold", fill=VIOLET, anchor="end", dy=-7)
    ax.label(2, 1.6, "elbow", cls="sm bold", fill=GREEN, dy=-11, dx=14)
    f.text(BCX, ax.y1 + 32, "component m", cls="sm dim")
    f.text(BCX, ax.y1 + 50, "the flat tail is the scree — noise", cls="sm dim")
    f.text(BCX, BY1 - 2, "Kaiser agrees here: two components, 75%",
           cls="sm dim")
    return f


@figure("Clustering", "Points grouped into clusters that are tight inside and far "
        "apart", width=WID)
def clustering() -> Fig:
    f = vcard("Tight inside, far apart outside",
              "minimize within-cluster variation")

    r = _Rand(53)
    ax = vaxes(f, 0, 10, 0, 10, left=32, right=14, top=32, bottom=80)
    ax.frame(xticks=[], yticks=[], arrows=False)
    f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=6, fill="var(--soft)",
           stroke="var(--edge)")
    for (cx, cy), colour in (((2.7, 7.3), BLUE), ((7.4, 7.6), AMBER),
                             ((5.1, 2.7), GREEN)):
        for _ in range(10):
            ax.point(cx + r.n(0, 0.8), cy + r.n(0, 0.72), colour=colour, r=3.2)
        f.circle(ax.px(cx), ax.py(cy), 30, fill="none", stroke=colour,
                 stroke_width="1.3", stroke_dasharray="4 3")
        f.circle(ax.px(cx), ax.py(cy), 4.6, fill=colour, stroke="var(--surf)",
                 stroke_width="1.4")
    f.text(BCX, BY1 - 56, "K-means: fix K, partition, iterate", cls="sm dim")
    f.text(BCX, BY1 - 38, "hierarchical: no K, cut the dendrogram", cls="sm dim")
    f.text(BCX, BY1 - 2, "standardize first — distance is scale-sensitive",
           cls="sm dim")
    return f


@figure("K-Means Clustering", "One iteration of K-means: assign to the nearest "
        "centroid, then move the centroids", width=WID)
def kmeans() -> Fig:
    f = vcard("Assign to nearest centroid, then recentre",
              "minimize Σₖ Σ_{i∈Cₖ} ‖xᵢ − μₖ‖²")

    r = _Rand(67)
    pts = []
    for (cx, cy) in ((2.8, 7.2), (7.2, 7.4), (5.0, 2.9)):
        for _ in range(9):
            pts.append((cx + r.n(0, 0.85), cy + r.n(0, 0.75)))
    starts = [(2.0, 4.2), (6.4, 4.6), (5.4, 8.4)]
    finals = [(2.8, 7.2), (7.2, 7.4), (5.0, 2.9)]
    colours = (BLUE, AMBER, GREEN)

    for panel, (cents, title) in enumerate(((starts, "1 — assign"),
                                            (finals, "2 — recentre, repeat"))):
        y0 = 96 + panel * 148
        ax = Axes(f, BX0 + 30, y0 + 14, BX1 - 16, y0 + 118, 0, 10, 0, 10)
        ax.frame(xticks=[], yticks=[], arrows=False)
        f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=5,
               fill="var(--soft)", stroke="var(--edge)")
        f.text(BCX, y0 + 6, title, cls="sm bold")
        for x, y in pts:
            k = min(range(3), key=lambda j: (x - cents[j][0]) ** 2
                    + (y - cents[j][1]) ** 2)
            ax.point(x, y, colour=colours[k], r=2.9)
        for j, (cx, cy) in enumerate(cents):
            f.rect(ax.px(cx) - 4.5, ax.py(cy) - 4.5, 9, 9, rx=1.5,
                   fill=colours[j], stroke="var(--surf)", stroke_width="1.6")
    f.text(BCX, BY1 - 2, "different starts can give different answers",
           cls="sm dim")
    return f


@figure("Hierarchical Clustering", "Four territories fused pair by pair into a "
        "single cluster", width=WID)
def hierarchical_clustering() -> Fig:
    f = vcard("Fuse the closest pair, over and over",
              "no K chosen up front — cut the tree after")

    labels = ["T1", "T2", "T3", "T4"]
    xs = [70, 130, 230, 290]
    base = 306
    ax_y = lambda h: base - h * 20
    for x, lab in zip(xs, labels):
        f.text(x, base + 18, lab, cls="sm dim")
        f.line(x, base, x, base - 2, cls="tick")

    def link(x1, x2, h, colour):
        y = ax_y(h)
        f.line(x1, base, x1, y, cls="thin", stroke=colour, stroke_width="1.8")
        f.line(x2, base, x2, y, cls="thin", stroke=colour, stroke_width="1.8")
        f.line(x1, y, x2, y, cls="thin", stroke=colour, stroke_width="1.8")
        f.text((x1 + x2) / 2, y - 7, f"h = {h}", cls="sm", fill=colour)
        return (x1 + x2) / 2, y

    for x in xs:
        f.line(x, base, x, base, cls="thin")
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
    f.text(BCX, 348, "cutting at 7 leaves {T1,T2} and {T3,T4}", cls="sm")
    f.text(BCX, BY1 - 2, "deterministic — no random start", cls="sm dim")
    return f


@figure("Dendrogram", "Two adjacent leaves that fuse high, against a distant pair "
        "that fuses low", width=WID)
def dendrogram() -> Fig:
    f = vcard("Height, not left-right position, is similarity",
              "cut at height h ⇒ the clusters joined below h")

    base = 300
    hy = lambda h: base - h * 22
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
    f.text(ac[0], ac[1] - 7, "A + C at 3", cls="sm bold", fill=GREEN)
    acd = bar(ac[0], 268, ac[1], base, 6, BLUE)
    f.text(acd[0], acd[1] - 7, "+ D at 6", cls="sm", fill=BLUE)
    root = bar(76, acd[0], base, acd[1], 9, ROSE)
    f.text(root[0], root[1] - 8, "B joins only at 9", cls="sm bold", fill=ROSE)

    f.line(52, base, 320, base, cls="axis")
    for h in (0, 3, 6, 9):
        f.line(50, hy(h), 54, hy(h), cls="tick")
        f.text(46, hy(h) + 4, str(h), cls="sm dim", anchor="end")
    f.text(BCX, 346, "A is drawn next to B, but fuses with C first", cls="sm")
    f.text(BCX, BY1 - 2, "any branch may be flipped without changing the tree",
           cls="sm dim")
    return f


@figure("Linkage", "Complete, single and average linkage measuring the distance "
        "between the same two clusters", width=WID)
def linkage() -> Fig:
    f = vcard("Three ways to measure cluster distance",
              ["complete = max · single = min", "average = mean"])

    left = [(1.6, 6.6), (2.3, 5.4), (1.3, 4.6)]
    right = [(7.4, 6.9), (8.1, 5.3), (7.0, 4.2)]
    for panel, (name, colour, pair) in enumerate((
            ("complete — max", ROSE, ((1.3, 4.6), (7.4, 6.9))),
            ("single — min", GREEN, ((2.3, 5.4), (7.0, 4.2))),
            ("average — mean", BLUE, None))):
        y0 = 92 + panel * 100
        ax = Axes(f, BX0 + 20, y0 + 12, BX1 - 16, y0 + 76, 0, 10, 3.4, 8)
        f.text(BCX, y0 + 6, name, cls="sm bold", fill=colour)
        if pair is None:
            for a in left:
                for b in right:
                    f.line(ax.px(a[0]), ax.py(a[1]), ax.px(b[0]), ax.py(b[1]),
                           cls="thin", stroke=colour, stroke_width="0.9",
                           stroke_opacity="0.55")
        else:
            a, b = pair
            f.line(ax.px(a[0]), ax.py(a[1]), ax.px(b[0]), ax.py(b[1]),
                   cls="thin", stroke=colour, stroke_width="2")
        for a in left:
            ax.point(a[0], a[1], colour="var(--dim)", r=3.4)
        for b in right:
            ax.point(b[0], b[1], colour="var(--dim)", r=3.4)
    f.text(BCX, BY1 - 2, "single linkage chains; complete and average balance",
           cls="sm dim")
    return f


@figure("Neural Network", "A two-layer network with its input, hidden and output "
        "units wired together", width=WID)
def neural_network() -> Fig:
    f = vcard("Inputs, hidden units, output — all wired",
              "f(x) = β₀ + Σ βₖ g(w_k0 + Σ w_kj xⱼ)")

    layers = [(70, 4, "inputs Xⱼ", BLUE), (180, 5, "hidden A_k", VIOLET),
              (290, 1, "output f(x)", GREEN)]
    coords = []
    for x, n, lab, colour in layers:
        ys = [BCY - (n - 1) * 30 / 2 + i * 30 for i in range(n)]
        coords.append(ys)
        f.text(x, 116, lab, cls="sm dim")
    for a, (xa, _, _, _) in enumerate(layers[:-1]):
        xb = layers[a + 1][0]
        for ya in coords[a]:
            for yb in coords[a + 1]:
                f.line(xa + 9, ya, xb - 9, yb, cls="thin", stroke="var(--axis)",
                       stroke_width="0.7", stroke_opacity="0.55")
    for (x, n, _, colour), ys in zip(layers, coords):
        for y in ys:
            f.circle(x, y, 9, fill=colour, fill_opacity="0.25", stroke=colour,
                     stroke_width="1.4")
    f.text(BCX, 336, "each hidden unit applies a non-linear g", cls="sm dim")
    f.text(BCX, 356, "fitted by backpropagation + gradient descent",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "flexible, but the weights do not interpret",
           cls="sm dim")
    return f


@figure("Activation Function", "ReLU, sigmoid and tanh drawn on one pair of axes",
        width=WID)
def activation_function() -> Fig:
    f = vcard("The non-linearity that stops the layers collapsing",
              "A_k = g(w_k0 + Σ w_kj Xⱼ)")

    ax = vaxes(f, -4, 4, -1.2, 2.6, left=40, right=16, top=44, bottom=76)
    ax.frame(xticks=[-4, -2, 2, 4], yticks=[-1, 1, 2], grid=True)
    ax.curve(lambda z: max(0.0, z), colour=BLUE, width=2.4, clip_top=2.6)
    ax.curve(lambda z: 1 / (1 + math.exp(-z)), colour=AMBER, width=2.1)
    ax.curve(math.tanh, colour=VIOLET, width=2.1, dash=True)
    ax.label(2.5, 2.35, "ReLU", cls="sm bold", fill=BLUE)
    ax.label(3.8, 1.22, "sigmoid", cls="sm bold", fill=AMBER, anchor="end")
    ax.label(-2.2, -0.75, "tanh", cls="sm bold", fill=VIOLET)
    f.text(BCX, ax.y1 + 32, "compose two linear layers and you get one —",
           cls="sm dim")
    f.text(BCX, ax.y1 + 47, "g is where the flexibility comes from", cls="sm dim")
    f.text(BCX, BY1 - 2, "sigmoid and tanh saturate; ReLU does not",
           cls="sm dim")
    return f


@figure("Backpropagation", "A forward pass computing the loss and a backward pass "
        "returning the gradients", width=WID)
def backpropagation() -> Fig:
    f = vcard("Forward for the loss, backward for the gradient",
              "w ← w − η ∂L/∂w")

    boxes = [("x", BLUE), ("hidden", VIOLET), ("ŷ", GREEN), ("L", ROSE)]
    xs = [58, 138, 224, 298]
    for x, (lab, colour) in zip(xs, boxes):
        f.rect(x - 30, 150, 60, 34, rx=6, fill=colour, fill_opacity="0.16",
               stroke=colour, stroke_width="1.3")
        f.text(x, 172, lab, cls="sm bold")
    for a, b in zip(xs, xs[1:]):
        f.arrow(a + 32, 160, b - 32, 160, colour="var(--ink)", width=1.5)
    for a, b in zip(xs[1:], xs):
        f.arrow(a - 32, 176, b + 32, 176, colour=ROSE, width=1.5)
    f.text(BCX, 132, "forward: activations, then the loss", cls="sm dim")
    f.text(BCX, 208, "backward: ∂L/∂z carried layer by layer", cls="sm dim",)

    f.line(40, 232, 320, 232, cls="rule")
    f.text(BCX, 256, "one step, worked", cls="sm bold")
    for i, line in enumerate(("∂L/∂ŷ = −2(5 − 3) = −4",
                              "∂ŷ/∂w = A = 2  ⇒  ∂L/∂w = −8",
                              "w ← 0.40 − 0.05(−8) = 0.80")):
        f.text(BCX, 280 + i * 22, line, cls="sm")
    f.text(BCX, BY1 - 2, "one backward pass gets every weight's gradient",
           cls="sm dim")
    return f


@figure("Confusion Matrix", "The four cells of a confusion matrix with the metrics "
        "each one feeds", width=WID)
def confusion_matrix() -> Fig:
    f = vcard("Every classification metric comes from four cells",
              ["sensitivity = TP / (TP + FN)",
               "specificity = TN / (TN + FP)"])

    cw, ch = 92, 60
    x0, y0 = 128, 132
    f.text(x0 + cw, y0 - 32, "actual", cls="sm dim")
    f.text(x0 + cw / 2, y0 - 12, "+", cls="sm bold")
    f.text(x0 + cw * 1.5, y0 - 12, "−", cls="sm bold")
    f.text(x0 - 14, y0 + ch / 2 + 4, "+", cls="sm bold", anchor="end")
    f.text(x0 - 14, y0 + ch * 1.5 + 4, "−", cls="sm bold", anchor="end")
    f.text(x0 - 30, y0 + ch, "pred", cls="sm dim", anchor="end")
    cells = [("TP", 45, GREEN), ("FP", 45, ROSE), ("FN", 15, ROSE),
             ("TN", 895, GREEN)]
    for i, (lab, n, colour) in enumerate(cells):
        cx = x0 + (i % 2) * cw
        cy = y0 + (i // 2) * ch
        f.rect(cx + 2, cy + 2, cw - 4, ch - 4, rx=5, fill=colour,
               fill_opacity="0.16", stroke=colour, stroke_width="1.2")
        f.text(cx + cw / 2, cy + 26, lab, cls="sm bold")
        f.text(cx + cw / 2, cy + 44, str(n), cls="sm")
    f.text(BCX, 278, "1,000 claims, 60 fraudulent, 90 flagged", cls="sm dim")
    for i, line in enumerate(("sensitivity 45/60 = 75%   specificity 95.2%",
                              "precision 45/90 = 50%     accuracy 94.0%",
                              "flagging nothing also scores 94% accuracy")):
        f.text(BCX, 306 + i * 22, line,
               cls="sm bold" if i == 2 else "sm")
    f.text(BCX, BY1 - 2, "the threshold moves every number here", cls="sm dim")
    return f


@figure("AUROC", "An ROC curve with the area under it shaded against the diagonal "
        "of a useless model", width=WID)
def auroc() -> Fig:
    f = vcard("Area under the ROC curve, over all thresholds",
              "Gini = 2 × AUROC − 1")

    ax = vaxes(f, 0, 1, 0, 1, left=44, right=18, top=32, bottom=78)
    ax.frame(xticks=[0, 0.5, 1], yticks=[0, 0.5, 1], grid=True, arrows=False)
    roc = lambda x: x ** 0.42
    ax.area(roc, 0, 1, colour=BLUE, opacity="0.16")
    ax.curve(roc, colour=BLUE, width=2.4)
    ax.polyline([(0, 0), (1, 1)], colour="var(--dim)", width=1.5, dash=True)
    ax.label(0.62, 0.55, "AUROC = 0.80", cls="sm bold", fill=BLUE)
    ax.label(0.78, 0.68, "chance", cls="sm dim", anchor="start", dy=8)
    ax.point(0.18, roc(0.18), colour=ROSE)
    ax.label(0.18, roc(0.18), "one threshold", cls="sm", fill=ROSE,
             anchor="start", dx=9, dy=15)
    f.text(BCX, ax.y1 + 30, "false positive rate →   sensitivity ↑", cls="sm dim")
    f.text(BCX, ax.y1 + 48, "0.5 is worthless, 1.0 is perfect separation",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "threshold-free — unlike accuracy", cls="sm dim")
    return f


@figure("Lift", "A lift chart of actual against predicted loss cost across "
        "equal-exposure buckets", width=WID)
def lift() -> Fig:
    f = vcard("Does the model separate good risk from bad?",
              "lift = worst bucket ÷ best bucket")

    actual = [0.68, 0.84, 0.97, 1.11, 1.42]
    pred = [0.71, 0.86, 0.98, 1.12, 1.33]
    ax = vaxes(f, 0.3, 5.7, 0, 1.6, left=44, right=16, top=32, bottom=82)
    ax.frame(xticks=[1, 2, 3, 4, 5], yticks=[0.5, 1.0, 1.5], grid=True,
             arrows=False)
    ax.bars([(i + 1, v) for i, v in enumerate(actual)], colour=BLUE, bw=26,
            opacity="0.55")
    ax.polyline([(i + 1, v) for i, v in enumerate(pred)], colour=ROSE, width=2.2)
    for i, v in enumerate(pred):
        ax.point(i + 1, v, colour=ROSE, r=3.2)
    ax.hline(1.0, colour="var(--dim)", x_to=5.7)
    f.legend_row(BX0 + 44, ax.y1 + 38, [(BLUE, "actual"), (ROSE, "predicted")],
                 gap=110)
    f.text(BCX, ax.y1 + 62, "lift = 1.42 / 0.68 = 2.1×", cls="sm bold")
    f.text(BCX, BY1 - 2, "rising bars = ranking; matching line = calibration",
           cls="sm dim")
    return f


@figure("Quantile Plot", "Held-out data sorted into equal-exposure buckets, actual "
        "against predicted", width=WID)
def quantile_plot() -> Fig:
    f = vcard("Sort by prediction, bucket by equal exposure",
              ["ranking = the slope", "calibration = the gap"])

    actual = [0.68, 0.84, 0.97, 1.11, 1.42]
    pred = [0.71, 0.86, 0.98, 1.12, 1.33]
    f.text(BCX, BY0 + 22, "buckets, worst predicted → best", cls="sm dim")
    ax = vaxes(f, 0.3, 5.7, 0.5, 1.6, left=44, right=16, top=46, bottom=84)
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
    f.legend_row(BX0 + 40, ax.y1 + 38, [(BLUE, "actual"), (ROSE, "predicted")],
                 gap=112)
    f.text(BCX, ax.y1 + 62, "top bucket under-predicted by 7%", cls="sm bold")
    f.text(BCX, BY1 - 2, "held-out data only — never the training set",
           cls="sm dim")
    return f


@figure("Double Lift Chart", "Two models compared on buckets sorted by the ratio of "
        "their predictions", width=WID)
def double_lift_chart() -> Fig:
    f = vcard("Sort on the ratio to see where two models differ",
              ["sort by ŷᴬ / ŷᴮ", "then plot both against actual"])

    actual = [0.78, 0.91, 1.00, 1.14, 1.31]
    new = [0.80, 0.92, 1.01, 1.12, 1.28]
    cur = [1.02, 1.00, 1.00, 1.02, 1.05]
    f.text(BCX, BY0 + 22, "buckets by ŷ_new / ŷ_current", cls="sm dim")
    ax = vaxes(f, 0.3, 5.7, 0.6, 1.45, left=44, right=16, top=46, bottom=86)
    ax.frame(xticks=[1, 2, 3, 4, 5], yticks=[0.8, 1.0, 1.2, 1.4], grid=True,
             arrows=False)
    ax.bars([(i + 1, v) for i, v in enumerate(actual)], colour="var(--dim)",
            bw=28, opacity="0.22", base=0.6)
    for series, colour, dash in ((new, GREEN, False), (cur, ROSE, True)):
        ax.polyline([(i + 1, v) for i, v in enumerate(series)], colour=colour,
                    width=2.3, dash=dash)
        for i, v in enumerate(series):
            ax.point(i + 1, v, colour=colour, r=3.2)
    f.legend_row(BX0 + 12, ax.y1 + 38,
                 [("var(--dim)", "actual"), (GREEN, "new"), (ROSE, "current")],
                 gap=98)
    f.text(BCX, ax.y1 + 64, "the flat curve is the loser", cls="sm bold")
    f.text(BCX, BY1 - 2, "the winner tracks the actuals in both tails",
           cls="sm dim")
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


@figure("Time Series", "A quarterly loss index showing trend, seasonality and "
        "irregular movement", width=WID)
def time_series() -> Fig:
    f = vcard("Observations ordered in time, and dependent",
              "Y_t = m_t + s_t + z_t")

    ys = _index_series()
    ax = _ts_axes(f, ys, top=34, bottom=80)
    ax.frame(xticks=[0, 8, 16, 24, 32, 40], yticks=[], grid=True,
             xfmt=lambda t: f"Y{int(t/4)+1}" if t % 8 == 0 else "")
    ax.polyline(list(enumerate(ys)), colour=BLUE, width=2)
    ax.polyline([(t, 10 + 0.9 * (t + 1)) for t in (0, len(ys) - 1)],
                colour=AMBER, width=1.8, dash=True)
    ax.label(len(ys) - 2, 10 + 0.9 * len(ys), "trend", cls="sm bold", fill=AMBER,
             anchor="end", dy=16)
    f.text(BCX, ax.y1 + 34, "consecutive values are correlated —", cls="sm dim")
    f.text(BCX, ax.y1 + 49, "the assumption regression starts by denying",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "40 quarters of a loss index", cls="sm dim")
    return f


@figure("Stationarity", "A stationary series oscillating about a fixed mean above "
        "a non-stationary one that wanders", width=WID)
def stationarity() -> Fig:
    f = vcard("Mean, variance and autocovariance fixed in time",
              "E[Y_t] = μ,  Cov(Y_t, Y_{t+k}) = γ_k")

    r = _Rand(13)
    stat, y = [], 0.0
    for _ in range(60):
        y = 0.55 * y + r.n(0, 1)
        stat.append(y)
    walk, y = [], 0.0
    for _ in range(60):
        y += r.n(0, 1)
        walk.append(y)

    for panel, (ys, title, colour, mean) in enumerate((
            (stat, "stationary — AR(1), φ = 0.55", GREEN, True),
            (walk, "non-stationary — random walk", ROSE, False))):
        y0 = 96 + panel * 132
        lo, hi = min(ys), max(ys)
        pad = (hi - lo) * 0.18
        ax = Axes(f, BX0 + 34, y0 + 14, BX1 - 16, y0 + 100, 0, 59,
                  lo - pad, hi + pad)
        f.text(BCX, y0 + 6, title, cls="sm bold", fill=colour)
        f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=5,
               fill="var(--soft)", stroke="var(--edge)")
        if mean:
            ax.hline(0, colour="var(--dim)", x_to=59)
        ax.polyline(list(enumerate(ys)), colour=colour, width=1.7)
    f.text(BCX, BY1 - 20, "|φ| < 1 is stationary; φ = 1 is a unit root",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "difference, or the ARIMA results do not hold",
           cls="sm dim")
    return f


@figure("White Noise", "An uncorrelated series and the flat correlogram it "
        "produces", width=WID)
def white_noise() -> Fig:
    f = vcard("Uncorrelated, mean zero, constant variance",
              "ρ_k = 0 for every k ≥ 1")

    r = _Rand(17)
    ys = [r.n(0, 1) for _ in range(60)]
    ax = Axes(f, BX0 + 34, 100, BX1 - 16, 190, 0, 59, -3.2, 3.2)
    f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=5, fill="var(--soft)",
           stroke="var(--edge)")
    ax.hline(0, colour="var(--dim)", x_to=59)
    ax.polyline(list(enumerate(ys)), colour=BLUE, width=1.6)

    lags = [0.06, -0.09, 0.03, 0.11, -0.05, 0.07, -0.02, 0.08]
    _corr_panel(f, 232, 322, lags, 60, "residual ACF", BLUE)
    f.text(BCX, 346, "every spike inside ±1.96/√n", cls="sm bold")
    f.text(BCX, BY1 - 2, "what a fitted model's residuals must look like",
           cls="sm dim")
    return f


@figure("Random Walk", "A random walk with drift and its flat forecast with a "
        "fan-shaped interval", width=WID)
def random_walk() -> Fig:
    f = vcard("Every shock moves the level permanently",
              "Y_t = δ + Y_{t−1} + ε_t")

    r = _Rand(29)
    ys, y = [], 218.0
    for _ in range(24):
        y += 1.4 + r.n(0, 3)
        ys.append(y)
    last = ys[-1]
    ax = vaxes(f, 0, 34, min(ys) - 14, last + 34, left=44, right=16, top=34,
               bottom=76)
    ax.frame(xticks=[0, 12, 24, 33], yticks=[], grid=True,
             xfmt=lambda t: "now" if t == 24 else "")
    ax.polyline(list(enumerate(ys)), colour=BLUE, width=1.9)
    fut = [(24 + h, last + 1.4 * h) for h in range(10)]
    ax.polyline(fut, colour=GREEN, width=2.2, dash=True)
    for sgn in (1, -1):
        ax.polyline([(24 + h, last + 1.4 * h + sgn * 1.96 * 3 * math.sqrt(h))
                     for h in range(10)], colour=GREEN, width=1.2)
    ax.vline(24, colour="var(--dim)", y_top=last + 30)
    ax.label(22, last + 26, "±1.96σ√h", cls="sm bold", fill=GREEN, anchor="end")
    f.text(BCX, ax.y1 + 32, "the forecast is the last value plus hδ", cls="sm dim")
    f.text(BCX, ax.y1 + 50, "the interval widens with √h, not h", cls="sm dim")
    f.text(BCX, BY1 - 2, "Var(Y_t) = tσ² — it never settles", cls="sm dim")
    return f


@figure("Differencing", "A trending series turned stationary by taking first "
        "differences", width=WID)
def differencing() -> Fig:
    f = vcard("Differences remove the trend",
              "∇Y_t = Y_t − Y_{t−1} = (1 − B)Y_t")

    ys = _index_series(n=48, season=False, seed=71)
    diff = [b - a for a, b in zip(ys, ys[1:])]
    for panel, (series, title, colour) in enumerate((
            (ys, "Y_t — trending, non-stationary", ROSE),
            (diff, "∇Y_t — stationary", GREEN))):
        y0 = 96 + panel * 132
        lo, hi = min(series), max(series)
        pad = (hi - lo) * 0.18
        ax = Axes(f, BX0 + 36, y0 + 14, BX1 - 16, y0 + 100, 0, len(series) - 1,
                  lo - pad, hi + pad)
        f.text(BCX, y0 + 6, title, cls="sm bold", fill=colour)
        f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=5,
               fill="var(--soft)", stroke="var(--edge)")
        if panel:
            ax.hline(0, colour="var(--dim)", x_to=len(series) - 1)
        ax.polyline(list(enumerate(series)), colour=colour, width=1.7)
    f.text(BCX, BY1 - 20, "d = 1 for a linear trend, 2 for a quadratic",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "over-differencing injects a negative MA(1)",
           cls="sm dim")
    return f


@figure("Autocorrelation Function", "A correlogram cutting off after lag 1, the "
        "signature of an MA(1)", width=WID)
def acf() -> Fig:
    f = vcard("Correlation with the series k periods back",
              "ρ_k = γ_k / γ_0")

    ac = [-0.52, 0.06, -0.04, 0.09, -0.03, 0.05, 0.02, -0.06, 0.04, 0.01]
    ax = _corr_panel(f, 118, 240, ac, 144, "ACF of ∇Y_t", BLUE)
    f.text(ax.px(2.4), ax.py(-0.52) + 6, "ρ₁ = −0.52", cls="sm bold", fill=BLUE,
           anchor="start")
    f.text(ax.x1, 254, "lag k", cls="sm dim", anchor="end")
    f.text(BCX, 288, "±1.96/√144 = ±0.163 — only lag 1 clears it", cls="sm")
    f.text(BCX, 316, "MA(q): the ACF cuts off after lag q", cls="sm bold")
    f.text(BCX, 336, "AR(p): the ACF tails off geometrically", cls="sm dim")
    f.text(BCX, 358, "slow, near-linear decay ⇒ difference first", cls="sm dim")
    f.text(BCX, BY1 - 2, "on residuals, it is the white-noise check",
           cls="sm dim")
    return f


@figure("Partial Autocorrelation Function", "A PACF cutting off after lag 1 beside "
        "the ACF of the same AR(1) tailing off", width=WID)
def pacf() -> Fig:
    f = vcard("The direct link at lag k, intervening lags removed",
              "φ_kk = Corr(Y_t, Y_{t−k} | Y_{t−1}, …)")

    phi = 0.71
    ac = [phi ** k for k in range(1, 9)]
    pac = [0.71, -0.05, 0.08, 0.02, -0.03, 0.05, -0.01, 0.03]
    _corr_panel(f, 112, 200, ac, 100, "ACF — tails off", "var(--dim)")
    _corr_panel(f, 244, 332, pac, 100, "PACF — cuts off at 1", VIOLET)
    f.text(BCX, 214, "ρ₂ = 0.48 only because lag 1 carried it", cls="sm dim")
    f.text(BCX, 356, "AR(1): the direct link at lag 2 is zero", cls="sm bold")
    f.text(BCX, BY1 - 2, "AR cuts the PACF, MA cuts the ACF", cls="sm dim")
    return f


@figure("Autoregressive Model", "An AR(1) forecast decaying geometrically back to "
        "the long-run mean", width=WID)
def autoregressive_model() -> Fig:
    f = vcard("Regress the series on its own past",
              "Y_t = c + φ₁Y_{t−1} + ⋯ + φ_pY_{t−p} + ε_t")

    r = _Rand(83)
    mu, phi = 0.80, 0.70
    ys, y = [], 0.92
    for _ in range(24):
        y = mu + phi * (y - mu) + r.n(0, 0.05)
        ys.append(y)
    ys[-1] = 0.92
    ax = vaxes(f, 0, 34, 0.62, 1.06, left=44, right=16, top=34, bottom=80)
    ax.frame(xticks=[0, 12, 23, 33], yticks=[0.7, 0.8, 0.9, 1.0], grid=True,
             xfmt=lambda t: "now" if t == 23 else "")
    ax.polyline(list(enumerate(ys)), colour=BLUE, width=1.9)
    fut = [(23 + h, mu + phi ** h * (0.92 - mu)) for h in range(11)]
    ax.polyline(fut, colour=GREEN, width=2.2, dash=True)
    ax.hline(mu, colour=AMBER, x_to=34)
    ax.label(33, 0.665, "μ = c/(1 − φ) = 0.80", cls="sm bold", fill=AMBER,
             anchor="end")
    ax.vline(23, colour="var(--dim)", y_top=1.02)
    f.text(BCX, ax.y1 + 34, "Ŷ_{t+h} = μ + φ^h (Y_t − μ)", cls="sm bold")
    f.text(BCX, ax.y1 + 52, "0.884, then 0.859, then 0.841 …", cls="sm dim")
    f.text(BCX, BY1 - 2, "stationary iff every root lies outside the circle",
           cls="sm dim")
    return f


@figure("Moving Average Model", "An MA(1)'s memory ending after one period, so the "
        "forecast returns to the mean", width=WID)
def moving_average_model() -> Fig:
    f = vcard("A weighted sum of the last q shocks",
              "Y_t = μ + ε_t + θ₁ε_{t−1} + ⋯ + θ_qε_{t−q}")

    r = _Rand(89)
    eps = [r.n(0, 5) for _ in range(26)]
    eps[25] = -3.0
    ys = [50 + eps[t] + 0.4 * eps[t - 1] for t in range(1, 26)]
    ax = vaxes(f, 0, 34, 36, 64, left=44, right=16, top=34, bottom=82)
    ax.frame(xticks=[0, 12, 24, 33], yticks=[40, 50, 60], grid=True,
             xfmt=lambda t: "now" if t == 24 else "")
    ax.polyline(list(enumerate(ys)), colour=BLUE, width=1.9)
    ax.polyline([(24, ys[-1]), (25, 48.8)] + [(25 + h, 50.0) for h in range(1, 9)],
                colour=GREEN, width=2.2, dash=True)
    ax.hline(50, colour=AMBER, x_to=34)
    ax.label(33, 38.5, "μ = 50", cls="sm bold", fill=AMBER, anchor="end")
    ax.point(25, 48.8, colour=GREEN)
    ax.label(25, 48.8, "48.8", cls="sm bold", fill=GREEN, dy=-9, anchor="start",
             dx=6)
    ax.vline(24, colour="var(--dim)", y_top=62)
    f.text(BCX, ax.y1 + 32, "two steps out the shock has left the model —",
           cls="sm dim")
    f.text(BCX, ax.y1 + 47, "the forecast is simply μ", cls="sm dim")
    f.text(BCX, ax.y1 + 65, "always stationary; |ρ₁| ≤ 0.5 for an MA(1)",
           cls="sm bold")
    return f


@figure("ARIMA", "The three ARIMA parts assembled, with the ACF/PACF table that "
        "identifies them", width=WID)
def arima() -> Fig:
    f = vcard("Autoregressive, integrated, moving average",
              "φ(B)∇ᵈY_t = θ(B)ε_t")

    parts = [("AR (p)", "p lags of Y", BLUE), ("I (d)", "d differences", AMBER),
             ("MA (q)", "q lags of ε", GREEN)]
    for i, (lab, sub, colour) in enumerate(parts):
        x = 62 + i * 118
        f.box(x - 50, 96, 100, 50, label=lab, colour=colour, sub=sub,
              label_cls="sm bold")
    rows = [("AR(p)", "tails off", "cuts off at p"),
            ("MA(q)", "cuts off at q", "tails off"),
            ("ARMA", "tails off", "tails off")]
    y0 = 196
    f.text(70, y0, "model", cls="sm dim")
    f.text(180, y0, "ACF", cls="sm dim")
    f.text(286, y0, "PACF", cls="sm dim")
    f.line(38, y0 + 8, 322, y0 + 8, cls="rule")
    for i, row in enumerate(rows):
        y = y0 + 30 + i * 28
        for j, (cell, x) in enumerate(zip(row, (70, 180, 286))):
            f.text(x, y, cell, cls="sm bold" if j == 0 else "sm")
        f.line(38, y + 9, 322, y + 9, cls="rule")
    f.text(BCX, 322, "ARIMA(0,1,1): difference once, one MA term", cls="sm")
    f.text(BCX, 348, "seasonal form (p,d,q)(P,D,Q)_s adds lag-s terms",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "identify · estimate · check the residuals",
           cls="sm dim")
    return f


@figure("Seasonality", "An additive seasonal pattern beside a multiplicative one "
        "growing with the level", width=WID)
def seasonality() -> Fig:
    f = vcard("A pattern repeating at a fixed period s",
              "s_t = s_{t+s},  Σ s_j = 0")

    for panel, (title, mult, colour) in enumerate((("additive", False, BLUE),
                                                   ("multiplicative", True, VIOLET))):
        y0 = 94 + panel * 136
        ys = []
        for t in range(28):
            level = 900 + 46 * t
            season = _SEASON[t % 4] * (0.13 * level if mult else 120)
            ys.append(level + season)
        lo, hi = min(ys), max(ys)
        pad = (hi - lo) * 0.14
        ax = Axes(f, BX0 + 34, y0 + 16, BX1 - 16, y0 + 104, 0, 27,
                  lo - pad, hi + pad)
        f.text(BCX, y0 + 8, title, cls="sm bold", fill=colour)
        f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=5,
               fill="var(--soft)", stroke="var(--edge)")
        ax.polyline(list(enumerate(ys)), colour=colour, width=1.8)
        ax.polyline([(t, 900 + 46 * t) for t in (0, 27)], colour="var(--dim)",
                    width=1.3, dash=True)
    f.text(BCX, BY1 - 20, "constant swing vs. a constant percentage",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "a log transform turns the second into the first",
           cls="sm dim")
    return f


@figure("Deterministic and Stochastic Trend", "A trend-stationary series returning "
        "to its line against a unit-root series that does not", width=WID)
def det_stoch_trend() -> Fig:
    f = vcard("Does a shock fade, or move the level for good?",
              "α + βt + z_t   vs.   δ + Y_{t−1} + ε_t")

    r = _Rand(101)
    n = 44
    det, sto, y = [], [], 0.0
    for t in range(n):
        shock = 7.0 if t == 18 else 0.0
        det.append(4 + 0.85 * t + r.n(0, 1.4) + shock)
        y += 0.85 + r.n(0, 1.4) + shock
        sto.append(4 + y)
    for panel, (ys, title, colour) in enumerate((
            (det, "deterministic — returns to the line", GREEN),
            (sto, "stochastic — the level never comes back", ROSE))):
        y0 = 94 + panel * 136
        lo, hi = min(ys), max(ys)
        pad = (hi - lo) * 0.16
        ax = Axes(f, BX0 + 34, y0 + 16, BX1 - 16, y0 + 104, 0, n - 1,
                  lo - pad, hi + pad)
        f.text(BCX, y0 + 8, title, cls="sm bold", fill=colour)
        f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=5,
               fill="var(--soft)", stroke="var(--edge)")
        ax.polyline([(t, 4 + 0.85 * t) for t in (0, n - 1)], colour="var(--dim)",
                    width=1.4, dash=True)
        ax.polyline(list(enumerate(ys)), colour=colour, width=1.7)
        ax.vline(18, colour=AMBER, y_top=hi)
        if not panel:
            ax.label(18, lo, "shock", cls="sm bold", fill=AMBER, dy=-4)
    f.text(BCX, BY1 - 20, "detrend the first; difference the second",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "getting it wrong gives a spurious regression",
           cls="sm dim")
    return f


@figure("Time Series Decomposition", "A series split into its trend, seasonal and "
        "irregular components", width=WID)
def decomposition() -> Fig:
    f = vcard("Split the series into trend, season, remainder",
              "Y_t = m_t + s_t + z_t")

    r = _Rand(107)
    n = 32
    trend = [900 + 34 * t for t in range(n)]
    season = [_SEASON[t % 4] * 110 for t in range(n)]
    irreg = [r.n(0, 40) for _ in range(n)]
    obs = [a + b + c for a, b, c in zip(trend, season, irreg)]
    panels = [(obs, "Y_t observed", BLUE), (trend, "m_t trend", AMBER),
              (season, "s_t seasonal", VIOLET), (irreg, "z_t irregular", GREEN)]
    for i, (ys, lab, colour) in enumerate(panels):
        y0 = 88 + i * 74
        lo, hi = min(ys), max(ys)
        pad = (hi - lo) * 0.2 or 1
        ax = Axes(f, BX0 + 66, y0, BX1 - 14, y0 + 52, 0, n - 1, lo - pad, hi + pad)
        f.text(BX0 + 60, y0 + 30, lab, cls="sm bold", anchor="end", fill=colour)
        f.rect(ax.x0, ax.y0, ax.x1 - ax.x0, ax.y1 - ax.y0, rx=4,
               fill="var(--soft)", stroke="var(--edge)")
        ax.polyline(list(enumerate(ys)), colour=colour, width=1.6)
    f.text(BCX, BY1 - 2, "the moving average loses s/2 points at each end",
           cls="sm dim")
    return f


@figure("Exponential Smoothing", "Geometrically decaying weights on past "
        "observations, and the flat forecast they give", width=WID)
def exponential_smoothing() -> Fig:
    f = vcard("Weights decaying geometrically into the past",
              "Ŷ_{t+1} = αY_t + (1 − α)Ŷ_t")

    ax = vaxes(f, -0.6, 9.6, 0, 0.36, left=44, right=16, top=36, bottom=104)
    ax.frame(xticks=[0, 2, 4, 6, 8], yticks=[0, 0.15, 0.3], grid=True,
             arrows=False, xfmt=lambda t: f"t−{int(t)}" if t else "t")
    ax.bars([(j, 0.3 * 0.7 ** j) for j in range(10)], colour=BLUE, bw=17,
            opacity="0.7")
    ax.label(2.6, 0.245, "α = 0.3", cls="sm bold", fill=BLUE, anchor="start")

    f.line(40, 322, 320, 322, cls="rule")
    f.text(BCX, 344, "Ŷ₁₁ = 0.3(470) + 0.7(420) = 435", cls="sm")
    f.text(BCX, 364, "α near 1 reacts fast; α near 0 smooths hard",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "Holt adds a trend; Holt-Winters adds a season",
           cls="sm dim")
    return f


@figure("Time Series Forecast", "An AR(1) forecast with a prediction interval "
        "widening to the stationary bound", width=WID)
def ts_forecast() -> Fig:
    f = vcard("A forecast is a mean plus an interval",
              "Ŷ_{t+h} ± z·σ√(Σψ²_j)")

    r = _Rand(113)
    mu, phi, sig = 50.0, 0.6, 4.0
    ys, y = [], 61.0
    for _ in range(22):
        y = mu + phi * (y - mu) + r.n(0, sig)
        ys.append(y)
    ys[-1] = 61.0
    ax = vaxes(f, 0, 32, 30, 78, left=44, right=16, top=34, bottom=78)
    ax.frame(xticks=[0, 10, 21, 31], yticks=[40, 50, 60, 70], grid=True,
             xfmt=lambda t: "now" if t == 21 else "")
    ax.polyline(list(enumerate(ys)), colour=BLUE, width=1.9)
    var = lambda h: sig ** 2 * sum(phi ** (2 * j) for j in range(h))
    fut = [(21 + h, mu + phi ** h * (61 - mu)) for h in range(11)]
    ax.polyline(fut, colour=GREEN, width=2.3, dash=True)
    for sgn in (1, -1):
        ax.polyline([(21 + h, mu + phi ** h * (61 - mu)
                      + sgn * 1.96 * math.sqrt(var(h))) for h in range(11)],
                    colour=GREEN, width=1.2)
    ax.hline(mu, colour=AMBER, x_to=32)
    ax.vline(21, colour="var(--dim)", y_top=74)
    ax.point(23, mu + phi ** 2 * 11, colour=GREEN)
    ax.label(23, mu + phi ** 2 * 11, "53.96", cls="sm bold", fill=GREEN,
             anchor="start", dx=8, dy=-8)
    f.text(BCX, ax.y1 + 32, "two steps: (44.8, 63.1) at 95%", cls="sm bold")
    f.text(BCX, ax.y1 + 50, "the interval stops widening — unlike a walk's",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "it carries process variance only, not model risk",
           cls="sm dim")
    return f
