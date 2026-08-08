"""Figures for the Exam FM (Financial Mathematics) concept pages.

Each builder returns a **portrait** `Fig` built by `vcard()`: a title, one
picture, and the one formula worth remembering. Grouped in syllabus order:

1. Interest theory — accumulation, discounting, rate conversions
2. Annuities — the payment-timeline family
3. Loans — amortisation and outstanding balance
4. Bonds — price, book value, callability
5. Duration, immunization and the term structure

Almost every figure here is built on a payment timeline (`figure_kit.timeline`)
or on a growth curve, because that is how the material is actually reasoned
about on the exam.
"""

from __future__ import annotations

import math

from figure_kit import (
    AMBER, BLUE, GREEN, ROSE, TEAL, VIOLET,
    Axes, Fig, brace, cash_arrow, timeline, vaxes, vcard,
    BX0, BY0, BX1, BY1, BCX,
)
from figure_registry import figure

WID = 340   # the |NNN| every portrait embed asks for

TL0, TL1 = 56, 306          # the timeline's left and right ends


def _ann_imm(n, i):
    return (1 - (1 + i) ** -n) / i


def _ann_due(n, i):
    return _ann_imm(n, i) * (1 + i)


def _acc(n, i):
    """s₍ₙ₎ — the accumulated value of an n-period annuity-immediate."""
    return ((1 + i) ** n - 1) / i


# ═══════════════════════════════════════════════════════════════════════════
# 1. Interest theory
# ═══════════════════════════════════════════════════════════════════════════

@figure("Present Value", "A future payment discounted back to today along a timeline",
        width=WID)
def present_value() -> Fig:
    f = vcard("Discounting moves a payment backwards",
              ["PV = FV · vⁿ = FV (1 + i)⁻ⁿ", "747.26 = 1,000 × 1.06⁻⁵"])

    y = 250
    xs = timeline(f, y, TL0, TL1, 5, labels=["0", "1", "2", "3", "4", "5"])
    cash_arrow(f, xs[5], y, 78, colour=BLUE, label="1,000", up=True)
    f.arrow(xs[5] - 8, y - 104, xs[0] + 8, y - 104, colour=AMBER, width=1.8)
    f.text((xs[0] + xs[5]) / 2, y - 112, "× v⁵", cls="bold", fill=AMBER)
    cash_arrow(f, xs[0], y, 50, colour=AMBER, label="747.26", up=True)
    f.text(xs[0], y + 36, "PV", cls="sm dim")
    f.text(xs[5], y + 36, "FV", cls="sm dim")
    f.text(BCX, 340, "a dollar later is worth less than one now", cls="sm dim")
    return f


@figure("Future Value", "Cash flows accumulated forward to a valuation date", width=WID)
def future_value() -> Fig:
    f = vcard("Accumulating moves payments forward",
              "FVₙ = Σ C_t (1 + i)^(n − t)")

    y = 250
    xs = timeline(f, y, TL0, TL1, 4, labels=["0", "1", "2", "3", "4"])
    for k in (0, 1, 2):
        cash_arrow(f, xs[k], y, 44, colour=BLUE, label="100", up=True)
        f.arrow(xs[k] + 6, y - 74, xs[4] - 8, y - 74, colour=AMBER, width=1.2, dash=True)
    f.text((xs[0] + xs[4]) / 2, y - 82, "× (1 + i)^(n − t)", cls="bold", fill=AMBER)
    cash_arrow(f, xs[4], y, 100, colour=GREEN, label="FV₄", up=True)
    f.text(BCX, 340, "each flow grows for the time it has left", cls="sm dim")
    return f


@figure("Accumulated Value", "A single sum growing forward under the accumulation "
        "function", width=WID)
def accumulated_value() -> Fig:
    f = vcard("Accumulated value is present value run forward",
              "AV = PV · a(t) = PV (1 + i)ᵗ")

    a = vaxes(f, 0, 6, 0, 1.55, top=30)
    a.curve(lambda t: 1.07 ** t, colour=BLUE)
    a.area(lambda t: 1.07 ** t, 0, 6, colour=BLUE, opacity="0.12")
    a.frame(xlabel="time t", ylabel="value of 1", xticks=[0, 2, 4, 6],
            yticks=[1.0, 1.5], yfmt=lambda t: f"{t:g}")
    a.point(0, 1, colour=AMBER, label="PV", dy=-12, dx=16)
    a.point(4.6, 1.07 ** 4.6, colour=GREEN, label="AV", dy=-12)
    a.vline(4.6, y_top=1.07 ** 4.6, colour=GREEN)
    return f


@figure("Current Value", "Cash flows moved to a reference date part-way through the "
        "timeline", width=WID)
def current_value() -> Fig:
    f = vcard("Pick a reference date, move everything to it",
              "CV_t = Σ C_k · a(t) / a(t_k)")

    y = 252
    xs = timeline(f, y, TL0, TL1, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    ref = xs[3]
    f.line(ref, y - 116, ref, y + 34, cls="thin dash", stroke=VIOLET, stroke_width="1.4")
    f.text(ref, y - 124, "reference date t", cls="sm bold", fill=VIOLET)
    for k, amt, colour in ((0, "C₀", BLUE), (1, "C₁", BLUE), (5, "C₅", AMBER),
                           (6, "C₆", AMBER)):
        cash_arrow(f, xs[k], y, 46, colour=colour, label=amt, up=True)
    f.arrow(xs[1] + 8, y - 74, ref - 8, y - 74, colour=BLUE, width=1.4)
    f.text((xs[1] + ref) / 2, y - 82, "grow", cls="sm", fill=BLUE)
    f.arrow(xs[5] - 8, y - 74, ref + 8, y - 74, colour=AMBER, width=1.4)
    f.text((xs[5] + ref) / 2, y - 82, "discount", cls="sm", fill=AMBER)
    f.text(BCX, 340, "PV is t = 0;  AV is t = n", cls="sm dim")
    return f


@figure("Interest Rate", "The interest rate as the two-way bridge between present and "
        "future value", width=WID)
def interest_rate() -> Fig:
    f = vcard("i is the interest earned per unit, per period",
              ["FV = PV (1 + i)ⁿ", "PV = FV vⁿ"])

    f.box(76, 96, 208, 76, colour=AMBER)
    f.text(180, 130, "PV", cls="ttl")
    f.text(180, 152, "value today", cls="sm dim")
    f.box(76, 292, 208, 76, colour=GREEN)
    f.text(180, 326, "FV", cls="ttl")
    f.text(180, 348, "value at time n", cls="sm dim")

    f.arrow(136, 182, 136, 282, colour=GREEN, width=1.8)
    f.text(126, 236, "× (1 + i)ⁿ", cls="sm bold", fill=GREEN, anchor="end")
    f.arrow(228, 282, 228, 182, colour=AMBER, width=1.8)
    f.text(238, 236, "× vⁿ", cls="sm bold", fill=AMBER, anchor="start")
    return f


@figure("Simple Interest", "Simple interest growing linearly against compound interest",
        width=WID)
def simple_interest() -> Fig:
    f = vcard("Simple interest is earned on the principal only",
              ["A(t) = P (1 + i t)", "compound: P (1 + i)ᵗ"])

    i = 0.10
    a = vaxes(f, 0, 10, 0.9, 2.7, top=30)
    a.area(lambda t: (1 + i) ** t, 0, 10, colour=AMBER, opacity="0.1", base=0.9)
    a.curve(lambda t: (1 + i) ** t, colour=AMBER)
    a.curve(lambda t: 1 + i * t, colour=BLUE)
    a.frame(xlabel="years", ylabel="a(t)", xticks=[0, 5, 10], yticks=[1, 2],
            yfmt=lambda t: f"{t:g}")
    a.label(9.6, 2.62, "compound", cls="sm bold", anchor="end", fill=AMBER)
    a.label(9.6, 1.85, "simple", cls="sm bold", anchor="end", fill=BLUE)
    a.label(0.4, 2.62, "the gap is", cls="sm dim", anchor="start")
    a.label(0.4, 2.48, "interest on interest", cls="sm dim", anchor="start")
    return f


@figure("Compound Interest", "Compound growth split into principal, simple interest and "
        "interest on interest", width=WID)
def compound_interest() -> Fig:
    f = vcard("Compounding: interest that earns interest",
              "A(t) = P (1 + i)ᵗ,   a(t) = (1 + i)ᵗ")

    i = 0.10
    a = vaxes(f, 0, 10, 0, 2.8, top=30)
    a.area(lambda t: (1 + i) ** t, 0, 10, colour=VIOLET, opacity="0.16", base=0)
    a.area(lambda t: 1 + i * t, 0, 10, colour=BLUE, opacity="0.18", base=0)
    a.area(lambda t: 1.0, 0, 10, colour="var(--dim)", opacity="0.16", base=0)
    a.curve(lambda t: (1 + i) ** t, colour=VIOLET)
    a.curve(lambda t: 1 + i * t, colour=BLUE, width=1.4, dash=True)
    a.frame(xlabel="years", ylabel="a(t)", xticks=[0, 5, 10], yticks=[1, 2],
            yfmt=lambda t: f"{t:g}")
    a.label(4.4, 0.5, "principal", cls="sm")
    a.label(5.2, 1.26, "simple interest", cls="sm")
    a.label(6.0, 2.28, "interest on interest", cls="sm")
    return f


@figure("Accumulation Function", "The accumulation function under the three standard "
        "interest regimes", width=WID)
def accumulation_function() -> Fig:
    f = vcard("a(t): the value at t of 1 invested at 0",
              "a(t) = exp( ∫₀ᵗ δ(s) ds ),   a(0) = 1")

    a = vaxes(f, 0, 8, 0.9, 2.3, top=30)
    a.curve(lambda t: 1 + 0.10 * t, colour=BLUE)
    a.curve(lambda t: 1.10 ** t, colour=AMBER)
    a.curve(lambda t: math.exp(0.0953 * t), colour=GREEN, dash=True)
    a.frame(xlabel="time t", ylabel="a(t)", xticks=[0, 4, 8], yticks=[1, 2],
            yfmt=lambda t: f"{t:g}")
    a.point(0, 1, colour="var(--dim)", label="a(0) = 1", dy=-12, dx=32)
    a.label(7.7, 2.20, "compound", cls="sm bold", anchor="end", fill=AMBER)
    a.label(7.7, 1.94, "force δ", cls="sm bold", anchor="end", fill=GREEN)
    a.label(7.7, 1.72, "simple", cls="sm bold", anchor="end", fill=BLUE)
    return f


@figure("Fund Accumulation", "A fund balance stepping up with deposits and interest",
        width=WID)
def fund_accumulation() -> Fig:
    f = vcard("A fund grows from interest and from deposits",
              "AVₙ = F₀(1 + i)ⁿ + Σ C_t (1 + i)^(n − t)")

    i = 0.08
    bal = 1000.0
    flows = [0, 300, 300, -200, 300]
    balances = [bal]
    for k in range(1, 6):
        bal = bal * (1 + i) + flows[k - 1]
        balances.append(bal)
    a = vaxes(f, 0, 5, 0, 2400, left=54, top=30)
    for k in range(5):
        x1, x2 = a.px(k), a.px(k + 1)
        f.rect(x1 + 3, a.py(balances[k + 1]), x2 - x1 - 6,
               a.y1 - a.py(balances[k + 1]), rx=2, fill=BLUE, fill_opacity="0.22")
        f.rect(x1 + 3, a.py(balances[k]), x2 - x1 - 6, a.y1 - a.py(balances[k]), rx=2,
               fill=BLUE, fill_opacity="0.34")
    a.polyline([(k, balances[k]) for k in range(6)], colour=VIOLET, width=2)
    a.frame(xlabel="year", ylabel="fund balance", xticks=[0, 1, 2, 3, 4, 5],
            yticks=[0, 1000, 2000], yfmt=lambda t: f"{t:,.0f}")
    for k, c in enumerate(flows):
        if not c:
            continue
        f.text(a.px(k + 0.5), a.py(balances[k + 1]) - 8,
               f"{'+' if c > 0 else ''}{c}", cls="sm bold", fill=GREEN if c > 0 else ROSE)
    return f


@figure("Net Present Value", "Project cash flows discounted and summed into an NPV",
        width=WID)
def net_present_value() -> Fig:
    f = vcard("NPV discounts every flow to time 0",
              ["NPV = Σ C_t v^t", "at i = 10%:  NPV ≈ 96"])

    i = 0.10
    flows = [-1000, 300, 400, 400, 300]
    a = vaxes(f, -0.6, 4.6, -1100, 500, left=54, top=30)
    for t, c in enumerate(flows):
        pv = c * (1 + i) ** -t
        x = a.px(t)
        colour = GREEN if c > 0 else ROSE
        f.rect(x - 15, min(a.py(c), a.py(0)), 13, abs(a.py(c) - a.py(0)), rx=2,
               fill=colour, fill_opacity="0.3")
        f.rect(x + 2, min(a.py(pv), a.py(0)), 13, abs(a.py(pv) - a.py(0)), rx=2,
               fill=colour, fill_opacity="0.85")
    a.frame(ylabel="cash flow", xticks=[], yticks=[-1000, 0, 500],
            yfmt=lambda t: f"{t:,.0f}")
    for t in range(5):
        f.text(a.px(t), a.y1 + 16, str(t), cls="sm dim")
    f.text(a.x1, a.y1 + 32, "year", cls="sm dim", anchor="end")
    f.text(BCX, 388, "pale = nominal,  solid = discounted", cls="sm dim")
    return f


@figure("Discount Factor", "The discount factor as the present value of 1 due in one "
        "period", width=WID)
def discount_factor() -> Fig:
    f = vcard("v is what 1 next period is worth today",
              ["v = (1 + i)⁻¹ = 1 − d", "n periods:  vⁿ = (1 + i)⁻ⁿ"])

    y = 190
    xs = timeline(f, y, 96, 268, 1, labels=["0", "1"])
    cash_arrow(f, xs[1], y, 66, colour=BLUE, label="1", up=True)
    cash_arrow(f, xs[0], y, 46, colour=AMBER, label="v", up=True)
    f.arrow(xs[1] - 10, y - 84, xs[0] + 10, y - 84, colour=AMBER, width=1.6)
    f.text((xs[0] + xs[1]) / 2, y - 92, "× v", cls="bold", fill=AMBER)

    bx0, bx1, by = 62, 268, 288
    v = 1 / 1.06
    f.rect(bx0, by, (bx1 - bx0) * v, 30, rx=4, fill=AMBER, fill_opacity="0.3",
           stroke=AMBER, stroke_width="1.2")
    f.rect(bx0 + (bx1 - bx0) * v, by, (bx1 - bx0) * (1 - v), 30, rx=4, fill=ROSE,
           fill_opacity="0.3", stroke=ROSE, stroke_width="1.2")
    f.text(bx0 + (bx1 - bx0) * v / 2, by + 20, "v = 0.9434", cls="sm bold")
    f.text(bx1 + 8, by + 20, "d", cls="sm bold", anchor="start", fill=ROSE)
    f.text((bx0 + bx1) / 2, by + 50, "v + d = 1", cls="sm dim")
    return f


@figure("Discount Rate", "Interest collected up front, so only 1 minus d is advanced",
        width=WID)
def discount_rate() -> Fig:
    f = vcard("Discount charges the interest at the start",
              ["d = i/(1 + i) = iv = 1 − v", "i = d/(1 − d),   d < i always"])

    for k, (head, colour, up_lab, down_lab) in enumerate((
            ("Interest rate i", BLUE, "receive 1", "repay 1 + i"),
            ("Discount rate d", AMBER, "receive 1 − d", "repay 1"))):
        y = 160 + k * 136
        f.text(BCX, y - 78, head, cls="bold", fill=colour)
        xs = timeline(f, y, 110, 260, 1, labels=["0", "1"], label_dy=16)
        cash_arrow(f, xs[0], y, 34, colour=colour, label=up_lab, up=True)
        cash_arrow(f, xs[1], y, 34, colour="var(--dim)", label=down_lab, up=True)
    return f


@figure("Effective Discount Rate", "The effective discount rate measured over one period",
        width=WID)
def effective_discount_rate() -> Fig:
    f = vcard("d is the interest taken off the front",
              ["1 / (1 − d) = 1 + i", "d = i / (1 + i) = 1 − v"])

    y = 240
    xs = timeline(f, y, 96, 268, 1, labels=["0", "1"])
    cash_arrow(f, xs[0], y, 54, colour=AMBER, label="1 − d", up=True)
    cash_arrow(f, xs[1], y, 80, colour=BLUE, label="1", up=True)
    f.arrow(xs[0] + 10, y - 100, xs[1] - 10, y - 100, colour=BLUE, width=1.6)
    f.text((xs[0] + xs[1]) / 2, y - 108, "grows by 1/(1 − d)", cls="sm bold", fill=BLUE)
    f.text(BCX, y + 40, "d stays with the lender", cls="sm dim")
    return f


@figure("Convertible m-thly", "Compounding m times a year climbing towards the effective "
        "annual rate", width=WID)
def convertible_m_thly() -> Fig:
    f = vcard("Interest credited m times a year",
              ["(1 + i⁽ᵐ⁾/m)ᵐ = 1 + i", "i⁽ᵐ⁾ = 12% quoted throughout"])

    nom = 0.12
    a = vaxes(f, 0, 1, 0.99, 1.135, left=52, top=30)
    for m, colour in ((1, "var(--dim)"), (4, BLUE), (12, AMBER)):
        pts = [(0, 1.0)]
        for k in range(1, m + 1):
            pts.append((k / m, (1 + nom / m) ** (k - 1)))
            pts.append((k / m, (1 + nom / m) ** k))
        a.polyline(pts, colour=colour, width=1.8)
    a.curve(lambda t: math.exp(nom * t), colour=GREEN, dash=True, width=1.5)
    a.frame(xlabel="year", ylabel="value of 1", xticks=[0, 0.5, 1],
            xfmt=lambda t: f"{t:g}", yticks=[1.0, 1.06, 1.12],
            yfmt=lambda t: f"{t:.2f}")
    f.legend(a.px(0.04), a.py(1.128), [("var(--dim)", "annual"), (BLUE, "quarterly"),
                                       (AMBER, "monthly"), (GREEN, "continuous")])
    return f


@figure("Nominal Interest Rate", "The nominal rate needed to hit a fixed effective annual "
        "rate as compounding gets more frequent", width=WID)
def nominal_interest_rate() -> Fig:
    f = vcard("For a fixed effective rate, i⁽ᵐ⁾ falls as m rises",
              ["i⁽ᵐ⁾ = m[(1 + i)^(1/m) − 1]", "all equivalent to i = 8% effective"])

    i_eff = 0.08
    a = vaxes(f, 1, 26, 0.0765, 0.0805, left=52, top=30)
    a.curve(lambda m: m * ((1 + i_eff) ** (1 / m) - 1), colour=BLUE, xa=1, xb=26)
    delta = math.log(1 + i_eff)
    a.hline(delta, colour=GREEN)
    a.label(14, delta + 0.0005, "δ = ln(1 + i)", cls="sm bold", fill=GREEN)
    for m in (1, 2, 4, 12):
        a.point(m, m * ((1 + i_eff) ** (1 / m) - 1), colour=BLUE, r=3.2)
    a.frame(xlabel="compounding frequency m", ylabel="i⁽ᵐ⁾",
            xticks=[1, 4, 12, 24], yticks=[0.077, 0.079],
            yfmt=lambda t: f"{t * 100:.1f}%")
    return f


@figure("Nominal Interest Rate Convertible m-thly", "One year of interest split into m "
        "sub-period credits", width=WID)
def nominal_convertible() -> Fig:
    f = vcard("The periodic rate is i⁽ᵐ⁾ / m",
              ["(1 + i⁽ᵐ⁾/m)ᵐ = 1 + i", "1.03⁴ = 1.1255,  so i = 12.55%"])

    m, y = 4, 220
    xs = timeline(f, y, 60, 300, m, labels=["0", "¼", "½", "¾", "1"])
    for k in range(1, m + 1):
        f.arrow(xs[k - 1] + 6, y - 40, xs[k] - 6, y - 40, colour=BLUE, width=1.3)
        f.text((xs[k - 1] + xs[k]) / 2, y - 48, "× 1.03", cls="sm", fill=BLUE)
    f.text(BCX, y - 78, "i⁽⁴⁾ / 4 = 3% each quarter", cls="bold", fill=BLUE)
    f.text(xs[0], y + 40, "1", cls="sm dim")
    f.text(xs[m], y + 40, "1.1255", cls="sm dim")
    f.text(BCX, 330, "a quoted rate is not an earned rate", cls="sm dim")
    return f


@figure("Nominal Discount Rate Convertible m-thly", "Discount deducted at the start of "
        "each of m sub-periods", width=WID)
def nominal_discount_convertible() -> Fig:
    f = vcard("d⁽ᵐ⁾ deducts interest at each sub-period start",
              ["(1 − d⁽ᵐ⁾/m)ᵐ = 1 − d = v", "d < d⁽ᵐ⁾ < δ < i⁽ᵐ⁾ < i"])

    m, y = 4, 220
    xs = timeline(f, y, 60, 300, m, labels=["0", "¼", "½", "¾", "1"])
    for k in range(m):
        f.arrow(xs[k] + 6, y - 40, xs[k + 1] - 6, y - 40, colour=AMBER, width=1.3)
        f.circle(xs[k], y - 40, 3.6, fill=AMBER)
    f.text(BCX, y - 70, "÷ (1 − d⁽⁴⁾/4)  each quarter", cls="bold", fill=AMBER)
    f.text(xs[0], y + 40, "deducted up front", cls="sm dim", anchor="start")
    f.text(xs[m], y + 40, "1", cls="sm dim")
    f.text(BCX, 330, "everything meets at δ as m → ∞", cls="sm dim")
    return f


@figure("Effective Rate", "One period of growth, and the equivalent nominal rates that "
        "produce it", width=WID)
def effective_rate() -> Fig:
    f = vcard("The effective rate is the growth over one full period",
              "1 + i = A(1) / A(0),   here i = 8%")

    y = 172
    xs = timeline(f, y, 96, 268, 1, labels=["0", "1"])
    cash_arrow(f, xs[0], y, 38, colour="var(--dim)", label="1", up=True)
    cash_arrow(f, xs[1], y, 66, colour=BLUE, label="1 + i", up=True)
    f.arrow(xs[0] + 10, y - 84, xs[1] - 10, y - 84, colour=BLUE, width=1.6)
    f.text(BCX, y - 92, "one measurement period", cls="sm bold", fill=BLUE)

    i_eff = 0.08
    f.text(BCX, 240, "all of these are the same 8%", cls="sm dim")
    entries = [
        ("i", "8.0000%", BLUE),
        ("i⁽²⁾", f"{2 * ((1 + i_eff) ** 0.5 - 1) * 100:.4f}%", VIOLET),
        ("i⁽¹²⁾", f"{12 * ((1 + i_eff) ** (1 / 12) - 1) * 100:.4f}%", TEAL),
        ("δ", f"{math.log(1 + i_eff) * 100:.4f}%", GREEN),
    ]
    for k, (lab, val, colour) in enumerate(entries):
        yy = 254 + k * 32
        f.line(58, yy, 58, yy + 20, cls="", stroke=colour, stroke_width="2.8",
               stroke_linecap="round")
        f.text(72, yy + 15, lab, cls="bold", anchor="start")
        f.text(300, yy + 15, val, cls="bold", anchor="end", fill=colour)
    return f


@figure("Real Rate of Interest", "The nominal rate deflated by inflation into a real "
        "rate", width=WID)
def real_rate_of_interest() -> Fig:
    f = vcard("The real rate is what is left after inflation",
              ["1 + i_r = (1 + i) / (1 + r)", "i_r ≈ i − r only for small rates"])

    scale = 2600
    rows = [
        ("Nominal  i = 7%", 0.07, BLUE),
        ("Inflation  r = 4%", 0.04, ROSE),
        ("Real  i_r", (1.07 / 1.04) - 1, GREEN),
    ]
    for k, (lab, v, colour) in enumerate(rows):
        y = 130 + k * 76
        f.text(56, y - 8, lab, cls="sm bold", anchor="start")
        f.rect(56, y, v * scale, 30, rx=4, fill=colour, fill_opacity="0.4",
               stroke=colour, stroke_width="1.2")
        f.text(56 + v * scale + 10, y + 21, f"{v * 100:.2f}%", cls="bold",
               anchor="start", fill=colour)
    f.text(BCX, 366, "purchasing power, not dollars", cls="sm dim")
    return f


@figure("Force of Interest", "The force of interest as the instantaneous growth rate of "
        "the accumulation function", width=WID)
def force_of_interest() -> Fig:
    f = vcard("δ is the instantaneous rate a(t) grows at",
              ["δ = a′(t) / a(t) = ln(1 + i)", "a(t) = e^(δt)"])

    delta = 0.10
    a = vaxes(f, 0, 6, 0.9, 1.9, top=30)
    a.curve(lambda t: math.exp(delta * t), colour=BLUE)
    t0 = 3.2
    v0 = math.exp(delta * t0)
    a.polyline([(t0 - 1.5, v0 - 1.5 * delta * v0), (t0 + 1.5, v0 + 1.5 * delta * v0)],
               colour=AMBER, width=1.6)
    a.point(t0, v0, colour=AMBER)
    a.label(t0 - 0.5, v0 + 0.16, "slope a′(t)", cls="sm bold", fill=AMBER, anchor="end")
    a.frame(xlabel="time t", ylabel="a(t) = e^(δt)", xticks=[0, 3, 6], yticks=[1, 1.5],
            yfmt=lambda t: f"{t:g}")
    return f


@figure("Variable Force of Interest", "A time-varying force and the accumulation it "
        "integrates to", width=WID)
def variable_force() -> Fig:
    f = vcard("Under a varying force, accumulation is an integral",
              "a(t) = exp( ∫₀ᵗ δ(s) ds )")

    d_fn = lambda t: 0.04 + 0.016 * t
    a1 = Axes(f, 70, 96, 326, 214, 0, 6, 0, 0.16)
    a1.area(d_fn, 0, 4, colour=AMBER, opacity="0.24")
    a1.curve(d_fn, colour=AMBER)
    a1.frame(ylabel="δ(t)", xticks=[0, 2, 4, 6], yticks=[0.05, 0.10, 0.15],
             yfmt=lambda t: f"{t:.2f}")
    a1.label(2.0, 0.05, "∫₀⁴ δ(s) ds", cls="sm bold")

    a2 = Axes(f, 70, 266, 326, 356, 0, 6, 0.9, 2.0)
    a2.curve(lambda t: math.exp(0.04 * t + 0.008 * t * t), colour=BLUE)
    a2.frame(xlabel="time t", ylabel="a(t)", xticks=[0, 2, 4, 6], yticks=[1, 1.5],
             yfmt=lambda t: f"{t:g}")
    a2.vline(4, y_top=math.exp(0.04 * 4 + 0.008 * 16), colour=BLUE)
    a2.point(4, math.exp(0.04 * 4 + 0.008 * 16), colour=BLUE)
    return f


@figure("Equation of Value", "Inflows and outflows balanced at a chosen comparison date",
        width=WID)
def equation_of_value() -> Fig:
    f = vcard("Move every flow to one date, then balance",
              ["PV(inflows) = PV(outflows)", "any date works — pick the one that cancels most"])

    y = 236
    xs = timeline(f, y, TL0, TL1, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    ref = xs[0]
    f.line(ref, y - 106, ref, y + 74, cls="thin dash", stroke=VIOLET, stroke_width="1.4")
    f.text(ref + 8, y - 112, "comparison date", cls="sm bold", fill=VIOLET,
           anchor="start")
    for k in (2, 4, 6):
        cash_arrow(f, xs[k], y, 48, colour=GREEN, label="in", up=True)
        f.arrow(xs[k] - 8, y - 68, ref + 8, y - 68, colour=GREEN, width=1, dash=True)
    for k in (1, 3):
        cash_arrow(f, xs[k], y, 40, colour=ROSE, label="out", up=False)
        f.arrow(xs[k] - 8, y + 74, ref + 8, y + 74, colour=ROSE, width=1, dash=True)
    return f


@figure("Time Value of Money Equations", "The moves that connect any two valuation dates",
        width=WID)
def tvm_equations() -> Fig:
    f = vcard("Value moves forward by (1 + i)ⁿ and back by vⁿ",
              ["FV = PV (1 + i)ⁿ,   PV = FV vⁿ", "s₍ₙ₎ = (1 + i)ⁿ a₍ₙ₎"])

    nodes = [(88, 122, "PV", AMBER), (272, 122, "FV", GREEN),
             (88, 302, "a₍ₙ₎", BLUE), (272, 302, "s₍ₙ₎", VIOLET)]
    for x, y, lab, colour in nodes:
        f.box(x - 54, y - 32, 108, 64, colour=colour)
        f.text(x, y + 6, lab, cls="ttl")
    f.arrow(146, 108, 214, 108, colour=GREEN, width=1.5)
    f.text(180, 100, "× (1 + i)ⁿ", cls="sm", fill=GREEN)
    f.arrow(214, 138, 146, 138, colour=AMBER, width=1.5)
    f.text(180, 156, "× vⁿ", cls="sm", fill=AMBER)
    f.arrow(88, 262, 88, 160, colour=BLUE, width=1.4, dash=True)
    f.text(80, 214, "× P", cls="sm dim", anchor="end")
    f.arrow(272, 262, 272, 160, colour=VIOLET, width=1.4, dash=True)
    f.text(280, 214, "× P", cls="sm dim", anchor="start")
    f.arrow(146, 302, 214, 302, colour="var(--dim)", width=1.4)
    f.text(180, 294, "× (1 + i)ⁿ", cls="sm dim")
    f.text(BCX, 372, "same rate, same timeline — only the date changes", cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# 2. Annuities
# ═══════════════════════════════════════════════════════════════════════════

@figure("Cash Flow", "A cash-flow stream with inflows above and outflows below the "
        "timeline", width=WID)
def cash_flow() -> Fig:
    f = vcard("A cash flow is an amount attached to a date",
              "PV = Σ C_t v^t")

    y = 236
    xs = timeline(f, y, TL0, TL1, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    stream = [(-500, ROSE), (150, GREEN), (150, GREEN), (200, GREEN), (-80, ROSE),
              (200, GREEN), (260, GREEN)]
    for k, (c, colour) in enumerate(stream):
        cash_arrow(f, xs[k], y, abs(c) / 500 * 56 + 14, colour=colour,
                   label=f"{c:+,}", up=c > 0, label_cls="sm")
    f.text(BCX, 372, "inflows up, outflows down — signs carry direction",
           cls="sm dim")
    return f


@figure("Annuities", "The annuity family, sorted by payment timing and pattern",
        width=WID)
def annuities() -> Fig:
    f = vcard("An annuity is a stream of periodic payments",
              ["a₍ₙ₎ = (1 − vⁿ)/i", "everything else is built from it"])

    rows = [
        ("a₍ₙ₎  immediate", 1, BLUE, False),
        ("ä₍ₙ₎  due", 0, VIOLET, False),
        ("a₍∞₎  perpetuity", 1, GREEN, True),
        ("ā₍ₙ₎  continuous", None, TEAL, False),
    ]
    for k, (lab, offset, colour, forever) in enumerate(rows):
        y = 116 + k * 76
        f.text(BCX, y - 34, lab, cls="bold", fill=colour)
        xs = timeline(f, y, 68, 296, 4, labels=["", "", "", "", ""], label_dy=0)
        if offset is None:
            f.rect(xs[0], y - 22, xs[4] - xs[0], 22, rx=2, fill=colour,
                   fill_opacity="0.42")
        else:
            for j in range(4):
                cash_arrow(f, xs[j + offset], y, 24, colour=colour)
            if forever:
                f.text(xs[4] + 14, y - 6, "…", cls="bold", fill=colour, anchor="start")
    return f


@figure("Annuity Due", "An annuity-due paying at the start of each period, one period "
        "ahead of an annuity-immediate", width=WID)
def annuity_due() -> Fig:
    f = vcard("An annuity-due pays at the start of each period",
              ["ä₍ₙ₎ = (1 + i) a₍ₙ₎ = (1 − vⁿ)/d", "s̈₍ₙ₎ = (1 + i) s₍ₙ₎"])

    for k, (head, offset, colour) in enumerate((("a₍ₙ₎  immediate", 1, "var(--dim)"),
                                                ("ä₍ₙ₎  due", 0, VIOLET))):
        y = 150 + k * 118
        f.text(BCX, y - 62, head, cls="bold", fill=colour)
        xs = timeline(f, y, 66, 300, 5, labels=["0", "1", "2", "3", "4", "5"])
        for j in range(5):
            cash_arrow(f, xs[j + offset], y, 34, colour=colour, label="1", up=True)
    f.arrow(160, 320, 114, 320, colour=VIOLET, width=1.6)
    f.text(BCX, 344, "every payment moves one period earlier", cls="sm", fill=VIOLET)
    return f


@figure("Level Annuity", "A level annuity valued as a present value and as an accumulated "
        "value", width=WID)
def level_annuity() -> Fig:
    f = vcard("The same payment, every period",
              ["PV = P · a₍ₙ₎", "FV = P · s₍ₙ₎ = (1 + i)ⁿ · PV"])

    y = 230
    xs = timeline(f, y, 66, 300, 5, labels=["0", "1", "2", "3", "4", "5"])
    for j in range(1, 6):
        cash_arrow(f, xs[j], y, 44, colour=BLUE, label="P", up=True)
    f.arrow(xs[1] - 8, y + 48, xs[0] + 4, y + 48, colour=AMBER, width=1.5)
    f.text(xs[0] + 4, y + 72, "P · a₍ₙ₎", cls="bold", fill=AMBER)
    f.arrow(xs[4] + 8, y + 48, xs[5] - 4, y + 48, colour=GREEN, width=1.5)
    f.text(xs[5] - 4, y + 72, "P · s₍ₙ₎", cls="bold", fill=GREEN)
    return f


@figure("Level Payment Annuity", "The two standard annuity factors read off one payment "
        "stream", width=WID)
def level_payment_annuity() -> Fig:
    f = vcard("Level payments: a₍ₙ₎ for the PV, s₍ₙ₎ for the FV",
              ["a₍ₙ₎ = (1 − vⁿ)/i,   s₍ₙ₎ = ((1+i)ⁿ − 1)/i",
               "at i = 6%, n = 5:  a₍₅₎ = 4.2124,  s₍₅₎ = 5.6371"])

    y = 250
    xs = timeline(f, y, 66, 300, 5, labels=["0", "1", "2", "3", "4", "5"])
    for j in range(1, 6):
        cash_arrow(f, xs[j], y, 40, colour=BLUE, label="P", up=True)
    f.line(xs[0], y - 92, xs[0], y - 8, cls="thin dash", stroke=AMBER, stroke_width="1.3")
    f.text(xs[0], y - 100, "a₍ₙ₎ here", cls="sm bold", fill=AMBER)
    f.line(xs[5], y - 92, xs[5], y - 8, cls="thin dash", stroke=GREEN, stroke_width="1.3")
    f.text(xs[5], y - 100, "s₍ₙ₎ here", cls="sm bold", fill=GREEN)
    f.text(xs[0], y + 40, "one period", cls="sm dim", anchor="start")
    f.text(xs[0], y + 54, "before", cls="sm dim", anchor="start")
    f.text(xs[5], y + 40, "at the last", cls="sm dim", anchor="end")
    f.text(xs[5], y + 54, "payment", cls="sm dim", anchor="end")
    return f


@figure("Perpetuity", "A perpetuity's payments and the finite present value they "
        "converge to", width=WID)
def perpetuity() -> Fig:
    f = vcard("Payments forever, but a finite present value",
              ["a₍∞₎ = 1/i", "ä₍∞₎ = 1/d = 1 + a₍∞₎"])

    y = 132
    xs = timeline(f, y, 62, 288, 6, labels=["0", "1", "2", "3", "4", "5", "…"])
    for j in range(1, 7):
        cash_arrow(f, xs[j], y, 32, colour=BLUE, label="1" if j < 6 else "", up=True)

    a = Axes(f, 74, 218, 320, 348, 0, 40, 0, 22)
    a.curve(lambda n: (1 - 1.05 ** -n) / 0.05, colour=VIOLET, xa=0.2)
    a.hline(20, colour=GREEN)
    a.label(20, 20, "1/i = 20", cls="sm bold", fill=GREEN, dy=-8)
    a.frame(xlabel="number of payments n", ylabel="a₍ₙ₎", xticks=[0, 20, 40],
            yticks=[10, 20], yfmt=lambda t: f"{t:g}")
    return f


@figure("Level Perpetuity", "Payments that never stop, discounted to a finite value",
        width=WID)
def level_perpetuity() -> Fig:
    f = vcard("Each payment's present value shrinks geometrically",
              ["a₍∞₎ = Σ vᵏ = 1/i", "at i = 5%:  1/0.05 = 20"])

    i = 0.05
    a = vaxes(f, 0, 21, 0, 1.05, left=50, top=30)
    a.bars([(k, (1 + i) ** -k) for k in range(1, 21)], colour=BLUE, opacity="0.7")
    a.frame(xlabel="payment number", ylabel="present value",
            xticks=[1, 5, 10, 15, 20], yticks=[0.5, 1.0], yfmt=lambda t: f"{t:g}")
    return f


@figure("Term of Annuity", "The term as the count of payments, solved from the present "
        "value", width=WID)
def term_of_annuity() -> Fig:
    f = vcard("The term n is how many payments there are",
              "n = −ln(1 − i · PV/P) / ln(1 + i)")

    y = 130
    xs = timeline(f, y, 60, 296, 6, labels=["0", "1", "2", "…", "n−1", "n", ""])
    for j in range(1, 6):
        cash_arrow(f, xs[j], y, 30, colour=BLUE, label="P", up=True)
    brace(f, xs[1], xs[5], y + 34, depth=9, label="n payments", colour=VIOLET)

    a = Axes(f, 76, 224, 320, 348, 0, 30, 0, 16)
    a.curve(lambda n: (1 - 1.06 ** -n) / 0.06, colour=BLUE, xa=0.2)
    a.point(12, (1 - 1.06 ** -12) / 0.06, colour=AMBER)
    a.vline(12, y_top=(1 - 1.06 ** -12) / 0.06, colour=AMBER)
    a.hline((1 - 1.06 ** -12) / 0.06, x_to=12, colour=AMBER)
    a.frame(xlabel="term n", ylabel="a₍ₙ₎", xticks=[0, 12, 30], yticks=[5, 10, 15],
            yfmt=lambda t: f"{t:g}")
    return f


@figure("Non-level Annuities", "Three non-level payment patterns on one timeline",
        width=WID)
def non_level_annuities() -> Fig:
    f = vcard("When payments vary, discount each one",
              ["PV = Σ C_t v^t", "or decompose into level + increasing"])

    patterns = [
        ("Arithmetic", [1, 2, 3, 4, 5], AMBER),
        ("Geometric", [1, 1.5, 2.25, 3.4, 5.1], ROSE),
        ("Irregular", [3, 1, 4, 2, 5], VIOLET),
    ]
    for k, (lab, seq, colour) in enumerate(patterns):
        y = 132 + k * 92
        f.text(BCX, y - 62, lab, cls="bold", fill=colour)
        xs = timeline(f, y, 76, 300, 5, labels=["", "1", "2", "3", "4", "5"],
                      label_dy=15)
        top = max(seq)
        for j, v in enumerate(seq):
            cash_arrow(f, xs[j + 1], y, 8 + 38 * v / top, colour=colour)
    return f


@figure("Arithmetic Increasing Annuity", "Payments rising by a constant amount, split "
        "into a level and an increasing piece", width=WID)
def arithmetic_increasing() -> Fig:
    f = vcard("Payments rise by a constant amount each period",
              ["(Ia)₍ₙ₎ = (ä₍ₙ₎ − n vⁿ) / i", "(Ia)₍ₙ₎ + (Da)₍ₙ₎ = (n + 1) a₍ₙ₎"])

    y = 344
    xs = timeline(f, y, 56, 300, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    for j in range(1, 7):
        h_level, h_step = 34, 18 * (j - 1)
        f.rect(xs[j] - 11, y - h_level, 22, h_level, rx=2, fill=BLUE,
               fill_opacity="0.6")
        if h_step:
            f.rect(xs[j] - 11, y - h_level - h_step, 22, h_step, rx=2, fill=AMBER,
                   fill_opacity="0.6")
        f.text(xs[j], y - h_level - h_step - 8, str(j), cls="sm")
    f.legend(58, 94, [(BLUE, "level P"), (AMBER, "increase Q")])
    return f


@figure("Decreasing Annuity", "Payments falling by a constant amount, and the identity "
        "pairing them with an increasing annuity", width=WID)
def decreasing_annuity() -> Fig:
    f = vcard("A decreasing annuity is the mirror of an increasing one",
              ["(Da)₍ₙ₎ = (n − a₍ₙ₎) / i", "(Ia)₍ₙ₎ + (Da)₍ₙ₎ = (n + 1) a₍ₙ₎"])

    y, n = 344, 5
    xs = timeline(f, y, 66, 300, n, labels=["0", "1", "2", "3", "4", "5"])
    for j in range(1, n + 1):
        dec, inc = n - j + 1, j
        f.rect(xs[j] - 12, y - 20 * dec, 24, 20 * dec, rx=2, fill=VIOLET,
               fill_opacity="0.6")
        f.rect(xs[j] - 12, y - 20 * (dec + inc), 24, 20 * inc, rx=2, fill=BLUE,
               fill_opacity="0.28")
        f.text(xs[j], y - 20 * dec + 22, str(dec), cls="sm")
    f.line(xs[1] - 16, y - 20 * (n + 1), xs[n] + 16, y - 20 * (n + 1), cls="thin dash",
           stroke=GREEN, stroke_width="1.4")
    f.text(BCX, y - 20 * (n + 1) - 10, "every column totals n + 1", cls="sm bold",
           fill=GREEN)
    f.legend(58, 94, [(VIOLET, "(Da)₍ₙ₎"), (BLUE, "(Ia)₍ₙ₎")])
    return f


@figure("Arithmetic Progression", "An arithmetic payment stream decomposed into level "
        "and increasing parts", width=WID)
def arithmetic_progression() -> Fig:
    f = vcard("Level P plus a pure increase of Q",
              ["PV = P · a₍ₙ₎ + (Q/i)( a₍ₙ₎ − n vⁿ )", "a negative Q gives a decreasing annuity"])

    y = 344
    xs = timeline(f, y, 56, 300, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    P, Q = 100, 50
    top = P + 5 * Q
    for j in range(1, 7):
        amt = P + (j - 1) * Q
        hl = 108 * P / top
        hq = 108 * ((j - 1) * Q) / top
        f.rect(xs[j] - 12, y - hl, 24, hl, rx=2, fill=BLUE, fill_opacity="0.6")
        if hq:
            f.rect(xs[j] - 12, y - hl - hq, 24, hq, rx=2, fill=AMBER, fill_opacity="0.6")
        f.text(xs[j], y - hl - hq - 8, str(amt), cls="sm")
    f.legend(58, 94, [(BLUE, "P = 100"), (AMBER, "+ Q = 50 each period")])
    return f


@figure("Geometric Increasing Annuity", "Payments growing at a constant rate against a "
        "level stream", width=WID)
def geometric_increasing() -> Fig:
    f = vcard("Geometric payments multiply, they do not add",
              ["PV = [1 − ((1+g)/(1+i))ⁿ] / (i − g)", "i = g:  PV = n v"])

    y = 344
    xs = timeline(f, y, 56, 300, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    g = 0.20
    top = (1 + g) ** 5
    for j in range(1, 7):
        amt = (1 + g) ** (j - 1)
        h = 116 * amt / top
        f.rect(xs[j] - 12, y - h, 24, h, rx=2, fill=ROSE, fill_opacity="0.6")
        f.text(xs[j], y - h - 8, f"{amt:.2f}", cls="sm")
    f.text(BCX, 98, "× (1 + g) each period", cls="bold", fill=ROSE)
    return f


@figure("Geometric Progression", "A geometric payment stream and the shifted rate that "
        "values it", width=WID)
def geometric_progression() -> Fig:
    f = vcard("A geometric stream is a level annuity at a shifted rate",
              ["j = (1 + i)/(1 + g) − 1", "then PV = a₍ₙ₎ⱼ / (1 + g)"])

    i, g = 0.08, 0.03
    a = vaxes(f, 0, 11, 0, 1.6, left=50, top=44)
    a.bars([(k, (1 + g) ** (k - 1)) for k in range(1, 11)], colour=ROSE, opacity="0.6")
    a.bars([(k, (1 + g) ** (k - 1) * (1 + i) ** -k) for k in range(1, 11)], colour=BLUE,
           opacity="0.85")
    a.frame(xlabel="payment number", xticks=[1, 5, 10],
            yticks=[0.5, 1.0, 1.5], yfmt=lambda t: f"{t:g}")
    f.legend(62, 92, [(ROSE, "payment (1+g)^(k−1)"), (BLUE, "its present value")])
    return f


@figure("Payable m-thly", "An annual payment of 1 split into m sub-period payments",
        width=WID)
def payable_m_thly() -> Fig:
    f = vcard("The same 1 per year, paid in m pieces",
              ["a⁽ᵐ⁾₍ₙ₎ = (1 − vⁿ) / i⁽ᵐ⁾", "a⁽ᵐ⁾₍ₙ₎ > a₍ₙ₎ — the money arrives earlier"])

    for k, (head, m, colour) in enumerate((("m = 1", 1, "var(--dim)"), ("m = 4", 4, BLUE))):
        y = 156 + k * 122
        f.text(BCX, y - 66, head, cls="bold", fill=colour)
        xs = timeline(f, y, 62, 300, 4, labels=["0", "1", "2", "3", "4"], label_dy=16)
        step = (xs[1] - xs[0]) / m
        for yr in range(4):
            for j in range(1, m + 1):
                cash_arrow(f, xs[yr] + step * j, y, 34 if m == 1 else 24, colour=colour,
                           label="1" if m == 1 else "", up=True)
        f.text(BCX, y + 42, "1 per year" if m == 1 else "¼ each quarter", cls="sm dim")
    return f


@figure("Payable Continuously", "The m-thly annuity in the limit, paying as a continuous "
        "stream", width=WID)
def payable_continuously() -> Fig:
    f = vcard("Let m → ∞ and the payments become a stream",
              ["ā₍ₙ₎ = ∫₀ⁿ e^(−δt) dt = (1 − vⁿ)/δ", "δ < i⁽ᵐ⁾ < i, so ā₍ₙ₎ is the largest"])

    for k, (head, m, colour) in enumerate((("m = 4", 4, BLUE), ("m = 12", 12, VIOLET))):
        y = 130 + k * 92
        f.text(BCX, y - 50, head, cls="bold", fill=colour)
        xs = timeline(f, y, 62, 300, 1, labels=["", ""], label_dy=0)
        step = (xs[1] - xs[0]) / m
        for j in range(1, m + 1):
            cash_arrow(f, xs[0] + step * j, y, 26, colour=colour)
    y = 344
    xs = timeline(f, y, 62, 300, 1, labels=["0", "n"])
    f.rect(xs[0], y - 28, xs[1] - xs[0], 28, rx=2, fill=TEAL, fill_opacity="0.42")
    f.text(BCX, y - 44, "m → ∞", cls="bold", fill=TEAL)
    return f


@figure("Continuous Annuity", "The continuous annuity as area under the discount curve",
        width=WID)
def continuous_annuity() -> Fig:
    f = vcard("Payments arrive as a continuous stream at rate 1",
              ["ā₍ₙ₎ = (1 − vⁿ) / δ", "only the denominator changes: i becomes δ"])

    delta = math.log(1.06)
    n = 8
    a = vaxes(f, 0, 10, 0, 1.1, top=30)
    a.area(lambda t: math.exp(-delta * t), 0, n, colour=TEAL, opacity="0.26")
    a.curve(lambda t: math.exp(-delta * t), colour=TEAL)
    a.frame(xlabel="time t", ylabel="v^t = e^(−δt)", xticks=[0, n],
            xfmt=lambda t: "0" if t == 0 else "n", yticks=[0.5, 1.0],
            yfmt=lambda t: f"{t:g}")
    a.label(3.4, 0.36, "ā₍ₙ₎ = ∫₀ⁿ v^t dt", cls="sm bold")
    a.vline(n, y_top=math.exp(-delta * n), colour=TEAL)
    return f


# ═══════════════════════════════════════════════════════════════════════════
# 3. Loans
# ═══════════════════════════════════════════════════════════════════════════

# One amortised loan is reused across the loan pages, so a student reading them
# in sequence sees the same schedule from several angles.
LOAN_L, LOAN_I, LOAN_N = 10_000.0, 0.08, 8
LOAN_P = LOAN_L / _ann_imm(LOAN_N, LOAN_I)


def _schedule(L=LOAN_L, i=LOAN_I, n=LOAN_N, P=None):
    """Return (balance_before, interest, principal, balance_after) per period."""
    P = P if P is not None else L / _ann_imm(n, i)
    rows, bal = [], L
    for _ in range(n):
        interest = bal * i
        principal = P - interest
        rows.append((bal, interest, principal, bal - principal))
        bal -= principal
    return rows, P


def _amort_bars(f, a, rows, P, bar_frac=0.62):
    """Stacked interest/principal bars, one per payment."""
    bw = (a.px(1) - a.px(0)) * bar_frac
    for k, (_, interest, principal, _) in enumerate(rows):
        x = a.px(k + 1) - bw / 2
        f.rect(x, a.py(P), bw, a.py(principal) - a.py(P), rx=2, fill=BLUE,
               fill_opacity="0.7")
        f.rect(x, a.py(principal), bw, a.y1 - a.py(principal), rx=2, fill=AMBER,
               fill_opacity="0.7")
    return bw


@figure("Loans", "The four moving parts of a loan and the two ways to find the balance",
        width=WID)
def loans() -> Fig:
    f = vcard("Principal in, payments out, balance in between",
              ["L = P · a₍ₙ₎", "OB_k = P · a₍ₙ₋ₖ₎ = L(1+i)ᵏ − P·s₍ₖ₎"])

    y = 240
    xs = timeline(f, y, 60, 300, 6, labels=["0", "1", "2", "3", "…", "n−1", "n"])
    cash_arrow(f, xs[0], y, 96, colour=GREEN, label="L", up=False)
    for j in range(1, 7):
        cash_arrow(f, xs[j], y, 60, colour=BLUE, label="P", up=True)
    f.text(BCX, 110, "the lender advances L, the borrower repays P", cls="sm dim")
    return f


@figure("Amortization", "A level payment splitting into shrinking interest and growing "
        "principal", width=WID)
def amortization() -> Fig:
    f = vcard("The payment is level; its split is not",
              ["P = L / a₍ₙ₎ = 1,740.15", "I_k = P(1 − v^(n−k+1)),  PR_k = P v^(n−k+1)"])

    rows, P = _schedule()
    a = vaxes(f, 0.4, LOAN_N + 0.6, 0, P * 1.12, left=54, top=44)
    _amort_bars(f, a, rows, P)
    a.hline(P, colour=VIOLET, dash=False)
    a.frame(xlabel="payment number", xticks=list(range(1, LOAN_N + 1)),
            yticks=[0, 1000], yfmt=lambda t: f"{t:,.0f}")
    f.legend(58, 92, [(AMBER, "interest I_k"), (BLUE, "principal PR_k")])
    return f


@figure("Principal", "The principal portion of each payment growing as the balance falls",
        width=WID)
def principal() -> Fig:
    f = vcard("The principal portion is what actually repays the loan",
              ["PR_k = P − I_k = P v^(n−k+1)", "Σ PR_k = L exactly"])

    rows, P = _schedule()
    a = vaxes(f, 0.4, LOAN_N + 0.6, 0, P * 1.12, left=54, top=44)
    _amort_bars(f, a, rows, P)
    a.frame(xlabel="payment number", xticks=list(range(1, LOAN_N + 1)),
            yticks=[0, 1000], yfmt=lambda t: f"{t:,.0f}")
    f.legend(58, 92, [(BLUE, "principal repaid"), (AMBER, "interest")])
    return f


@figure("Interest", "Interest charged on the declining balance, period by period",
        width=WID)
def interest() -> Fig:
    f = vcard("Interest is charged on whatever is still owed",
              ["I_k = i · OB₍ₖ₋₁₎", "never on the original loan amount"])

    rows, P = _schedule()
    a = vaxes(f, 0.4, LOAN_N + 0.6, 0, 11000, left=58, top=44)
    bw = (a.px(1) - a.px(0)) * 0.6
    for k, (bal, interest_, _, _) in enumerate(rows):
        x = a.px(k + 1)
        f.rect(x - bw / 2, a.py(bal), bw, a.y1 - a.py(bal), rx=2, fill="var(--dim)",
               fill_opacity="0.2")
        f.rect(x - bw / 2, a.py(interest_ * 10), bw, a.y1 - a.py(interest_ * 10), rx=2,
               fill=AMBER, fill_opacity="0.75")
    a.frame(xlabel="period", xticks=list(range(1, LOAN_N + 1)),
            yticks=[0, 5000, 10000], yfmt=lambda t: f"{t:,.0f}")
    f.legend(62, 92, [("var(--dim)", "balance OB₍ₖ₋₁₎"), (AMBER, "interest I_k (×10)")])
    return f


@figure("Outstanding Balance", "The loan balance falling to zero, found prospectively or "
        "retrospectively", width=WID)
def outstanding_balance() -> Fig:
    f = vcard("Prospective or retrospective — the same balance",
              ["prospective:  OB_k = P · a₍ₙ₋ₖ₎",
               "retrospective:  OB_k = L(1+i)ᵏ − P·s₍ₖ₎"])

    rows, P = _schedule()
    balances = [LOAN_L] + [r[3] for r in rows]
    a = vaxes(f, 0, LOAN_N, 0, 11000, left=58, top=30)
    a.area(lambda t: balances[min(int(t), LOAN_N)] +
           (balances[min(int(t) + 1, LOAN_N)] - balances[min(int(t), LOAN_N)]) *
           (t - int(t)), 0, LOAN_N, colour=BLUE, opacity="0.16")
    a.polyline(list(enumerate(balances)), colour=BLUE)
    for k, b in enumerate(balances):
        a.point(k, b, colour=BLUE, r=3)
    k0 = 3
    a.vline(k0, y_top=balances[k0], colour=VIOLET)
    a.label(k0, balances[k0], f"OB₃ = {balances[k0]:,.0f}", cls="sm bold", dy=-12, dx=30)
    a.frame(xlabel="payments made", ylabel="balance", xticks=list(range(LOAN_N + 1)),
            yticks=[0, 5000, 10000], yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Term of Loan", "How the term trades off against the level payment", width=WID)
def term_of_loan() -> Fig:
    f = vcard("Term and payment trade off against each other",
              ["P = L / a₍ₙ₎", "L = 10,000 at i = 8%"])

    a = vaxes(f, 2, 30, 0, 5200, left=58, top=30)
    a.curve(lambda n: LOAN_L / _ann_imm(n, LOAN_I), colour=BLUE, xa=2, xb=30)
    for n_ in (5, 10, 20):
        a.point(n_, LOAN_L / _ann_imm(n_, LOAN_I), colour=AMBER, r=3.4)
        a.label(n_, LOAN_L / _ann_imm(n_, LOAN_I),
                f"{LOAN_L / _ann_imm(n_, LOAN_I):,.0f}", cls="sm bold", dy=-12, dx=16)
    a.frame(xlabel="term n (years)", ylabel="level payment",
            xticks=[5, 10, 20, 30], yticks=[0, 2000, 4000], yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Final Payment", "A drop payment and a balloon payment against the regular "
        "payment", width=WID)
def final_payment() -> Fig:
    f = vcard("A non-integer term makes the last payment differ",
              ["drop = B_n (1 + i),  smaller than P",
               "balloon = OB₍ₙ₋₁₎ (1 + i),  larger than P"])

    for k, (head, last_h, colour) in enumerate((("Drop payment", 18, GREEN),
                                                ("Balloon payment", 70, ROSE))):
        y = 158 + k * 128
        f.text(BCX, y - 84, head, cls="bold", fill=colour)
        xs = timeline(f, y, 66, 300, 5, labels=["0", "1", "2", "3", "4", "5"])
        for j in range(1, 5):
            cash_arrow(f, xs[j], y, 36, colour=BLUE, label="P", up=True)
        cash_arrow(f, xs[5], y, last_h, colour=colour, up=True)
    return f


@figure("Drop Payment", "A final payment smaller than the regular one, clearing a small "
        "remaining balance", width=WID)
def drop_payment() -> Fig:
    f = vcard("A drop payment clears the small balance left",
              ["drop = B_n (1 + i)", "the last balance, accumulated one period"])

    y = 250
    xs = timeline(f, y, 56, 300, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    for j in range(1, 6):
        cash_arrow(f, xs[j], y, 54, colour=BLUE, label="P", up=True)
    cash_arrow(f, xs[6], y, 20, colour=GREEN, label="drop", up=True)
    f.line(xs[1] - 12, y - 54, xs[6] + 12, y - 54, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.2")
    f.text(BCX, y - 76, "level P", cls="sm dim")
    f.text(BCX, 340, "P was rounded up, so the loan clears early", cls="sm dim")
    return f


@figure("Balloon Payment", "A final payment larger than the regular one, retiring the "
        "remaining balance", width=WID)
def balloon_payment() -> Fig:
    f = vcard("A balloon retires the balance left over",
              ["B = OB₍ₙ₋₁₎ (1 + i)", "K was set below the amortising payment"])

    y = 268
    xs = timeline(f, y, 56, 300, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    for j in range(1, 6):
        cash_arrow(f, xs[j], y, 34, colour=BLUE, label="K", up=True)
    cash_arrow(f, xs[6], y, 100, colour=ROSE, label="B", up=True)
    f.line(xs[1] - 12, y - 34, xs[5] + 12, y - 34, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.2")
    f.text(BCX, 118, "principal is still outstanding at the end", cls="sm dim")
    return f


@figure("Loan Repayment Comparison", "Level payments against constant-principal "
        "repayment on the same loan", width=WID)
def loan_repayment_comparison() -> Fig:
    f = vcard("Level payment versus level principal",
              ["level:  P = L / a₍ₙ₎", "constant principal: interest = i·L·(n+1)/2"])

    rows, P = _schedule()
    n, L, i = LOAN_N, LOAN_L, LOAN_I
    for k, (head, colour) in enumerate((("Level payment", BLUE),
                                        ("Constant principal", GREEN))):
        top = 110 + k * 154
        a = Axes(f, 66, top, 322, top + 92, 0.4, n + 0.6, 0, 2400)
        bw = (a.px(1) - a.px(0)) * 0.66
        for t in range(1, n + 1):
            if k == 0:
                pr, inte = rows[t - 1][2], rows[t - 1][1]
            else:
                pr, inte = L / n, i * L * (n - t + 1) / n
            x = a.px(t) - bw / 2
            f.rect(x, a.py(pr), bw, a.y1 - a.py(pr), rx=2, fill=colour,
                   fill_opacity="0.7")
            f.rect(x, a.py(pr + inte), bw, a.py(pr) - a.py(pr + inte), rx=2, fill=AMBER,
                   fill_opacity="0.7")
            if t == 1:
                f.text(x + bw + 4, a.py(pr + inte) + 10, "interest", cls="sm",
                       fill=AMBER, anchor="start")
        a.frame(xticks=[1, 4, 8], yticks=[0, 1000, 2000], yfmt=lambda t: f"{t:,.0f}")
        f.text(BCX, top - 14, head, cls="bold", fill=colour)
        total = (n * P - L) if k == 0 else (i * L * (n + 1) / 2)
        f.text(BCX, top + 128, f"total interest {total:,.0f}", cls="sm bold")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# 4. Bonds
# ═══════════════════════════════════════════════════════════════════════════

BOND_F = BOND_C = 1000.0
BOND_R = 0.05          # coupon rate per period
BOND_N = 10


def _bond_price(j, n=BOND_N, F=BOND_F, r=BOND_R, C=BOND_C):
    return F * r * _ann_imm(n, j) + C * (1 + j) ** -n


def _book_values(j, n=BOND_N, F=BOND_F, r=BOND_R, C=BOND_C):
    return [F * r * _ann_imm(n - k, j) + C * (1 + j) ** -(n - k) for k in range(n + 1)]


def _bond_timeline(f, y, n=6, x0=56, x1=300, coupon_h=30, redemption_h=72,
                   coupon_label="Fr", redemption_label="C"):
    labels = ["0"] + [str(k) for k in range(1, n)] + ["n"]
    if n > 4:
        for k in range(3, n - 1):
            labels[k] = "…" if k == 3 else ""
    xs = timeline(f, y, x0, x1, n, labels=labels)
    for k in range(1, n + 1):
        cash_arrow(f, xs[k], y, coupon_h, colour=BLUE,
                   label=coupon_label if k == 1 else None, up=True)
    cash_arrow(f, xs[n], y, redemption_h, colour=GREEN, label=redemption_label, up=True)
    return xs


@figure("Bonds", "A bond's coupon stream and redemption payment on one timeline",
        width=WID)
def bonds() -> Fig:
    f = vcard("A coupon annuity plus a single redemption",
              ["P = Fr · a₍ₙ₎ⱼ + C · vⁿ",
               "Fr > Cj premium,  Fr < Cj discount"])

    y = 236
    xs = _bond_timeline(f, y, 6)
    cash_arrow(f, xs[0], y, 56, colour=AMBER, label="P", up=False)
    f.text(BCX, 128, "coupons Fr, then C at maturity", cls="sm dim")
    return f


@figure("Bond Price", "Bond price against yield, showing premium, par and discount",
        width=WID)
def bond_price() -> Fig:
    f = vcard("Price falls as yield rises",
              ["P = Fr · a₍ₙ₎ⱼ + C · vⁿ", "= C + (Fr − Cj) a₍ₙ₎"])

    a = vaxes(f, 0.01, 0.10, 700, 1400, left=58, top=30)
    a.curve(lambda j: _bond_price(j), colour=BLUE, xa=0.012, xb=0.10)
    a.hline(BOND_C, colour="var(--dim)")
    a.vline(BOND_R, y_top=_bond_price(BOND_R), colour=GREEN)
    a.point(BOND_R, BOND_C, colour=GREEN)
    a.label(BOND_R, BOND_C, "par:  j = r", cls="sm bold", dy=-12, dx=30)
    a.area(lambda j: _bond_price(j), 0.012, BOND_R, colour=AMBER, opacity="0.14",
           base=BOND_C)
    a.label(0.028, 1250, "premium", cls="sm bold", fill=AMBER)
    a.label(0.080, 830, "discount", cls="sm bold", fill=BLUE)
    a.frame(xlabel="yield j", ylabel="price", xticks=[0.02, 0.05, 0.08],
            xfmt=lambda t: f"{t * 100:.0f}%", yticks=[800, 1000, 1200],
            yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Book Value", "Book value converging to the redemption value for a premium and a "
        "discount bond", width=WID)
def book_value() -> Fig:
    f = vcard("Book value walks the price to the redemption value",
              ["BV_k = Fr · a₍ₙ₋ₖ₎ + C · v^(n−k)", "BV₀ = P  and  BVₙ = C"])

    a = vaxes(f, 0, BOND_N, 800, 1250, left=58, top=30)
    prem = _book_values(0.03)
    disc = _book_values(0.07)
    a.polyline(list(enumerate(prem)), colour=AMBER)
    a.polyline(list(enumerate(disc)), colour=BLUE)
    a.hline(BOND_C, colour="var(--dim)")
    for series, colour in ((prem, AMBER), (disc, BLUE)):
        for k, b in enumerate(series):
            a.point(k, b, colour=colour, r=2.6)
    a.label(1.4, 1200, "premium bond", cls="sm bold", anchor="start", fill=AMBER)
    a.label(1.4, 866, "discount bond", cls="sm bold", anchor="start", fill=BLUE)
    a.label(BOND_N, BOND_C, "C", cls="sm bold", dy=-8, dx=-10)
    a.frame(xlabel="coupons paid", ylabel="book value", xticks=[0, 5, 10],
            yticks=[900, 1000, 1100, 1200], yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Market Value", "Market value moving with the prevailing yield while book value "
        "follows its own schedule", width=WID)
def market_value() -> Fig:
    f = vcard("Market value follows today's yield",
              ["MV = Fr · a₍ₙ₎ + C · vⁿ at today's yield",
               "book value keeps using the original yield"])

    a = vaxes(f, 0, BOND_N, 850, 1200, left=58, top=44)
    book = _book_values(0.05)
    a.polyline(list(enumerate(book)), colour=VIOLET, width=2)
    market_yields = [0.05, 0.045, 0.038, 0.042, 0.055, 0.065, 0.058, 0.05, 0.046,
                     0.05, 0.05]
    market = [BOND_F * BOND_R * _ann_imm(BOND_N - k, market_yields[k]) +
              BOND_C * (1 + market_yields[k]) ** -(BOND_N - k) if k < BOND_N else BOND_C
              for k in range(BOND_N + 1)]
    a.polyline(list(enumerate(market)), colour=BLUE)
    a.frame(xlabel="coupons paid", xticks=[0, 5, 10],
            yticks=[900, 1000, 1100], yfmt=lambda t: f"{t:,.0f}")
    f.legend(62, 92, [(VIOLET, "book value"), (BLUE, "market value")])
    return f


@figure("Amortization of Premium", "A premium bond's book value written down to the "
        "redemption value", width=WID)
def amortization_of_premium() -> Fig:
    f = vcard("The premium is written off, coupon by coupon",
              ["Fr > Cj  →  the coupon overpays",
               "written off in period t:  (Fr − Cj) v^(n−t+1)"])

    j = 0.03
    book = _book_values(j)
    a = vaxes(f, 0, BOND_N, 950, 1250, left=58, top=30)
    a.area(lambda t: book[min(int(t), BOND_N)] +
           (book[min(int(t) + 1, BOND_N)] - book[min(int(t), BOND_N)]) * (t - int(t)),
           0, BOND_N, colour=AMBER, opacity="0.18", base=BOND_C)
    a.polyline(list(enumerate(book)), colour=AMBER)
    for k, b in enumerate(book):
        a.point(k, b, colour=AMBER, r=2.8)
    a.hline(BOND_C, colour="var(--dim)", label="C", anchor="end", label_dx=-6)
    a.label(2.6, 1200, "premium P − C", cls="sm bold", anchor="start")
    a.frame(xlabel="coupons paid", ylabel="book value", xticks=[0, 5, 10],
            yticks=[1000, 1100, 1200], yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Accumulation of Discount", "A discount bond's book value written up to the "
        "redemption value", width=WID)
def accumulation_of_discount() -> Fig:
    f = vcard("The discount is written up, coupon by coupon",
              ["Fr < Cj  →  the coupon underpays",
               "written up in period t:  (Cj − Fr) v^(n−t+1)"])

    j = 0.07
    book = _book_values(j)
    a = vaxes(f, 0, BOND_N, 830, 1060, left=58, top=30)
    a.area(lambda t: book[min(int(t), BOND_N)] +
           (book[min(int(t) + 1, BOND_N)] - book[min(int(t), BOND_N)]) * (t - int(t)),
           0, BOND_N, colour=BLUE, opacity="0.18", base=BOND_C)
    a.polyline(list(enumerate(book)), colour=BLUE)
    for k, b in enumerate(book):
        a.point(k, b, colour=BLUE, r=2.8)
    a.hline(BOND_C, colour="var(--dim)", label="C", anchor="end", label_dx=-6)
    a.label(2.8, 890, "discount C − P", cls="sm bold", anchor="start")
    a.frame(xlabel="coupons paid", ylabel="book value", xticks=[0, 5, 10],
            yticks=[850, 950, 1050], yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Face Value", "Face value as the base for coupons and, usually, the redemption",
        width=WID)
def face_value() -> Fig:
    f = vcard("Face value sets the coupon — it is not the price",
              ["coupon = F × r", "usually C = F, but not always"])

    f.box(66, 108, 228, 84, colour=GREEN)
    f.text(180, 144, "F = 1,000", cls="ttl")
    f.text(180, 168, "face (par) value", cls="sm dim")
    f.arrow(180, 202, 180, 244, colour=BLUE, width=1.8)
    f.text(192, 228, "× r", cls="sm bold", fill=BLUE, anchor="start")
    f.box(66, 254, 228, 84, colour=BLUE)
    f.text(180, 290, "coupon = 50", cls="ttl")
    f.text(180, 314, "F × r each period", cls="sm dim")
    f.text(BCX, 374, "price P is a third thing again", cls="sm dim")
    return f


@figure("Redemption Value", "The redemption payment at maturity, at, above or below par",
        width=WID)
def redemption_value() -> Fig:
    f = vcard("C is what the bondholder is repaid at maturity",
              ["P = Fr · a₍ₙ₎ⱼ + C · vⁿ", "C = F at par;  C > F or C < F otherwise"])

    y = 224
    _bond_timeline(f, y, 6)
    f.text(BCX, 102, "the coupons use F, the last payment uses C", cls="sm dim")
    for k, (lab, colour) in enumerate((("C = F", GREEN), ("C > F", AMBER),
                                       ("C < F", ROSE))):
        x = 66 + k * 106
        f.line(x, 296, x, 320, cls="", stroke=colour, stroke_width="2.8",
               stroke_linecap="round")
        f.text(x + 12, 312, lab, cls="bold", anchor="start")
    f.text(BCX, 350, "for a callable bond, C depends on the call date", cls="sm dim")
    return f


@figure("Coupon", "The level coupon stream a bond pays until maturity", width=WID)
def coupon() -> Fig:
    f = vcard("The coupon is the bond's income stream",
              ["coupon = F × r", "the coupon annuity is worth Fr · a₍ₙ₎"])

    y = 230
    xs = timeline(f, y, 56, 300, 8,
                  labels=["0", "1", "2", "3", "4", "5", "6", "7", "8"])
    for k in range(1, 9):
        cash_arrow(f, xs[k], y, 40, colour=BLUE, label="Fr" if k in (1, 8) else None,
                   up=True)
    brace(f, xs[1], xs[8], y + 34, depth=9, label="n coupons", colour=BLUE)
    f.text(BCX, 340, "the capital gain or loss is the other half of the return",
           cls="sm dim")
    return f


@figure("Coupon Rate", "Coupon rate against yield rate, and the pricing it implies",
        width=WID)
def coupon_rate() -> Fig:
    f = vcard("Coupon rate is fixed at issue; yield is not",
              ["r = coupon / F", "what matters is Fr vs Cj, not r vs j"])

    cases = [("r > j", "premium", "P > C", AMBER, 1.18),
             ("r = j", "par", "P = C", GREEN, 1.0),
             ("r < j", "discount", "P < C", BLUE, 0.84)]
    base_y, height = 300, 128
    for k, (rel, name, price, colour, ratio) in enumerate(cases):
        cx = 82 + k * 98
        h = height * ratio
        f.rect(cx - 34, base_y - h, 68, h, rx=4, fill=colour, fill_opacity="0.35",
               stroke=colour, stroke_width="1.3")
        f.line(cx - 44, base_y - height, cx + 44, base_y - height, cls="thin dash",
               stroke="var(--dim)", stroke_width="1.2")
        f.text(cx, base_y - h / 2 + 4, price, cls="sm bold")
        f.text(cx, base_y + 20, rel, cls="bold")
        f.text(cx, base_y + 38, name, cls="sm dim")
    f.text(46, base_y - height + 4, "C", cls="sm dim", anchor="end")
    return f


@figure("Yield Rate", "The yield rate as the discount rate that reproduces the market "
        "price", width=WID)
def yield_rate() -> Fig:
    f = vcard("The yield makes the price come out right",
              ["P = Fr · a₍ₙ₎ⱼ + C · vⁿ", "an IRR — solve for j numerically"])

    a = vaxes(f, 0.01, 0.10, 700, 1400, left=58, top=30)
    a.curve(lambda j: _bond_price(j), colour=BLUE, xa=0.012, xb=0.10)
    target, jstar = 920.0, 0.062
    a.hline(target, colour=AMBER, x_to=jstar)
    a.vline(jstar, y_top=target, colour=AMBER)
    a.point(jstar, target, colour=AMBER)
    a.label(jstar, target, "solve for j", cls="sm bold", dy=-14, dx=36)
    a.label(0.015, 990, "market price", cls="sm dim", anchor="start")
    a.frame(xlabel="yield j", ylabel="price", xticks=[0.02, 0.05, 0.08],
            xfmt=lambda t: f"{t * 100:.0f}%", yticks=[800, 1000, 1200],
            yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Term of Bond", "How the bond's term drives its price sensitivity", width=WID)
def term_of_bond() -> Fig:
    f = vcard("A longer term means more price risk",
              ["n = years × coupons per year", "at j = r the price stays at par"])

    a = vaxes(f, 0, 30, 700, 1350, left=58, top=30)
    for j, colour, lab in ((0.03, AMBER, "j = 3%"), (0.05, "var(--dim)", "j = 5%"),
                           (0.07, BLUE, "j = 7%")):
        a.curve(lambda n, jj=j: _bond_price(jj, n=max(n, 0.5)), colour=colour, xa=1,
                xb=30)
        a.label(30, _bond_price(j, n=30), lab, cls="sm bold", dx=-6, dy=-8, fill=colour,
                anchor="end")
    a.frame(xlabel="term n (coupon periods)", ylabel="price", xticks=[0, 10, 20, 30],
            yticks=[800, 1000, 1200], yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Callable Bond", "The issuer's call option and the worst-case pricing rule",
        width=WID)
def callable_bond() -> Fig:
    f = vcard("A callable bond can be redeemed early",
              ["price at the worst redemption date",
               "premium → earliest call;  discount → maturity"])

    y = 218
    xs = timeline(f, y, 56, 300, 8,
                  labels=["0", "", "…", "", "call", "", "…", "", "n"])
    for k in range(1, 9):
        cash_arrow(f, xs[k], y, 26, colour=BLUE, up=True)
    for k, colour, lab in ((4, AMBER, "earliest call"), (8, GREEN, "maturity")):
        cash_arrow(f, xs[k], y, 62, colour=colour, up=True)
        f.text(xs[k] - (0 if k == 4 else 10), y - 72, lab, cls="sm bold", fill=colour,
               anchor="middle" if k == 4 else "end")
    f.line(xs[4], y + 30, xs[8], y + 30, cls="thin dash", stroke=VIOLET,
           stroke_width="1.3")
    f.text(BCX, y + 50, "the issuer picks somewhere in here", cls="sm dim")
    f.text(BCX, 348, "issuers call when rates fall", cls="sm dim")
    return f


@figure("Non-Callable Bond", "A bullet bond with certain cash flows to maturity",
        width=WID)
def non_callable_bond() -> Fig:
    f = vcard("A bullet bond ends when it says it will",
              ["P = Fr · a₍ₙ₎ⱼ + C · vⁿ", "one term, one price, no cases"])

    y = 230
    _bond_timeline(f, y, 8, coupon_h=30, redemption_h=68)
    f.text(BCX, 130, "the schedule cannot be cut short", cls="sm dim")
    f.text(BCX, 340, "the baseline case for every bond formula", cls="sm dim")
    return f


@figure("Call Price", "The call price replacing the redemption value at a call date",
        width=WID)
def call_price() -> Fig:
    f = vcard("At a call date the call price replaces C",
              ["P_call = Fr · a₍n_c₎ⱼ + C_call · v^(n_c)",
               "price every call date and take the lowest"])

    y = 236
    xs = timeline(f, y, 56, 300, 8, labels=["0", "", "", "n_c", "", "", "", "", "n"])
    for k in range(1, 9):
        cash_arrow(f, xs[k], y, 26, colour=BLUE, up=True)
    cash_arrow(f, xs[3], y, 68, colour=AMBER, label="C_call", up=True)
    cash_arrow(f, xs[8], y, 68, colour=GREEN, label="C", up=True)
    f.line(xs[3], y - 88, xs[3], y - 12, cls="thin dash", stroke=AMBER,
           stroke_width="1.2")
    f.text(BCX, 132, "call price ≥ face value", cls="sm dim")
    return f


@figure("Call Premium", "The call premium shrinking to zero as maturity approaches",
        width=WID)
def call_premium() -> Fig:
    f = vcard("The call premium narrows towards maturity",
              ["call premium = call price − F", "it reaches zero at maturity"])

    a = vaxes(f, 4, 10, 980, 1075, left=58, top=30)
    call_prices = {4: 1060, 5: 1050, 6: 1040, 7: 1030, 8: 1020, 9: 1010, 10: 1000}
    a.polyline([(k, v) for k, v in sorted(call_prices.items())], colour=AMBER)
    for k, v in sorted(call_prices.items()):
        a.point(k, v, colour=AMBER, r=3)
    a.hline(BOND_C, colour="var(--dim)")
    a.label(9.2, 1005, "face value", cls="sm dim", anchor="end")
    for k in (4, 7):
        f.line(a.px(k), a.py(call_prices[k]), a.px(k), a.py(BOND_C), cls="",
               stroke=ROSE, stroke_width="2.4")
    a.label(4.4, 1032, "call premium", cls="sm bold", anchor="start", fill=ROSE)
    a.frame(xlabel="call date (period)", ylabel="call price", xticks=[4, 6, 8, 10],
            yticks=[1000, 1050], yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Reinvestment of Coupons", "Realised return depending on the rate coupons are "
        "reinvested at", width=WID)
def reinvestment_of_coupons() -> Fig:
    f = vcard("The promised yield assumes coupons are reinvested at it",
              ["AV = Fr · s₍ₙ₎ at r_i  +  C", "r_i = j gives exactly P(1 + j)ⁿ"])

    j = 0.05
    coupon_amt = BOND_F * BOND_R
    a = vaxes(f, 0.01, 0.09, 1480, 1800, left=62, top=30)
    a.curve(lambda ri: coupon_amt * _acc(BOND_N, max(ri, 1e-4)) + BOND_C,
            colour=BLUE, xa=0.012, xb=0.09)
    target = coupon_amt * _acc(BOND_N, j) + BOND_C
    a.hline(target, colour="var(--dim)")
    a.vline(j, y_top=target, colour=GREEN)
    a.point(j, target, colour=GREEN)
    a.label(j, target, "r_i = j", cls="sm bold", dy=-12, dx=26)
    a.label(0.016, 1508, "short of the yield", cls="sm", anchor="start")
    a.label(0.086, 1760, "ahead of it", cls="sm", anchor="end")
    a.frame(xlabel="reinvestment rate r_i", ylabel="accumulated value",
            xticks=[0.02, 0.05, 0.08], xfmt=lambda t: f"{t * 100:.0f}%",
            yticks=[1500, 1600, 1700], yfmt=lambda t: f"{t:,.0f}")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# 5. Duration, immunization and the term structure
# ═══════════════════════════════════════════════════════════════════════════

def _dur_cashflows(n=BOND_N, F=BOND_F, r=BOND_R, C=BOND_C):
    return [(t, F * r + (C if t == n else 0.0)) for t in range(1, n + 1)]


def _macaulay(j, flows=None):
    flows = flows or _dur_cashflows()
    pv = [(t, c * (1 + j) ** -t) for t, c in flows]
    total = sum(v for _, v in pv)
    return sum(t * v for t, v in pv) / total, total


@figure("Duration", "Duration as the balance point of the discounted cash flows",
        width=WID)
def duration() -> Fig:
    f = vcard("Duration is the average time to payment, weighted by PV",
              ["D_Mac = Σ t · PV(C_t) / P", "measured in periods, not percent"])

    j = 0.05
    pv = [(t, c * (1 + j) ** -t) for t, c in _dur_cashflows()]
    dmac, _ = _macaulay(j)
    a = vaxes(f, 0, BOND_N + 0.8, 0, 700, left=54, top=30, bottom=76)
    a.bars(pv, colour=BLUE, opacity="0.7")
    a.frame(xlabel="time t", ylabel="PV of cash flow",
            xticks=list(range(1, BOND_N + 1)), yticks=[0, 300, 600],
            yfmt=lambda t: f"{t:,.0f}")
    px = a.px(dmac)
    f.line(a.x0, a.y1 + 44, a.x1, a.y1 + 44, cls="", stroke=AMBER, stroke_width="1.8")
    f.polygon([(px, a.y1 + 44), (px - 10, a.y1 + 60), (px + 10, a.y1 + 60)], fill=AMBER)
    f.text(px, a.y0 + 14, f"D_Mac = {dmac:.2f}", cls="sm bold", fill=AMBER)
    return f


@figure("Macaulay Duration", "Each cash flow's present value weighting its own time",
        width=WID)
def macaulay_duration() -> Fig:
    f = vcard("Each date is weighted by its share of the price",
              ["D_Mac = Σ t · PV(C_t) / P", "the weights sum to 1"])

    j = 0.05
    pv = [(t, c * (1 + j) ** -t) for t, c in _dur_cashflows()]
    dmac, price = _macaulay(j)
    a = vaxes(f, 0, BOND_N + 0.8, 0, 0.72, left=54, top=30)
    a.bars([(t, v / price) for t, v in pv], colour=VIOLET, opacity="0.7")
    a.frame(xlabel="time t", ylabel="weight PV(C_t)/P",
            xticks=list(range(1, BOND_N + 1)), yticks=[0, 0.25, 0.5],
            yfmt=lambda t: f"{t:g}")
    a.vline(dmac, colour=AMBER)
    f.text(a.px(dmac), a.y0 + 14, f"{dmac:.2f}", cls="sm bold", fill=AMBER)
    return f


@figure("Modified Duration", "The tangent line duration provides at the current yield",
        width=WID)
def modified_duration() -> Fig:
    f = vcard("Modified duration is the slope of the price–yield curve",
              ["D_Mod = −(1/P) dP/dj = D_Mac/(1 + j)", "ΔP ≈ −D_Mod · P · Δj"])

    j0 = 0.05
    p0 = _bond_price(j0)
    dmac, _ = _macaulay(j0)
    dmod = dmac / (1 + j0)
    a = vaxes(f, 0.01, 0.09, 700, 1400, left=58, top=30)
    a.curve(lambda j: _bond_price(j), colour=BLUE, xa=0.012, xb=0.09)
    a.polyline([(0.012, p0 + dmod * p0 * (j0 - 0.012)),
                (0.09, p0 - dmod * p0 * (0.09 - j0))], colour=AMBER, width=1.6)
    a.point(j0, p0, colour=AMBER)
    a.label(j0, p0, "current yield", cls="sm bold", dy=-14, dx=36)
    a.frame(xlabel="yield j", ylabel="price", xticks=[0.02, 0.05, 0.08],
            xfmt=lambda t: f"{t * 100:.0f}%", yticks=[800, 1000, 1200],
            yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("1st-Order Linear Approximation", "The duration estimate against the true price "
        "change", width=WID)
def first_order_approximation() -> Fig:
    f = vcard("The duration estimate is a tangent",
              ["ΔP ≈ −D_Mod · P · Δj", "always short: add ½ · C · P · (Δj)²"])

    j0 = 0.05
    p0 = _bond_price(j0)
    dmac, _ = _macaulay(j0)
    dmod = dmac / (1 + j0)
    a = vaxes(f, 0.02, 0.08, 800, 1250, left=58, top=44)
    a.curve(lambda j: _bond_price(j), colour=BLUE, xa=0.02, xb=0.08)
    a.polyline([(0.02, p0 + dmod * p0 * (j0 - 0.02)),
                (0.08, p0 - dmod * p0 * (0.08 - j0))], colour=AMBER, width=1.6)
    a.point(j0, p0, colour="var(--dim)", r=3.2)
    for jj in (0.03, 0.07):
        true = _bond_price(jj)
        approx = p0 - dmod * p0 * (jj - j0)
        f.line(a.px(jj), a.py(true), a.px(jj), a.py(approx), cls="", stroke=ROSE,
               stroke_width="2.6")
        a.point(jj, true, colour=BLUE, r=3)
        a.point(jj, approx, colour=AMBER, r=3)
    a.label(0.036, 1195, "understates the gain", cls="sm", anchor="start")
    a.label(0.074, 880, "overstates the loss", cls="sm", anchor="end")
    a.frame(xlabel="yield j", xticks=[0.03, 0.05, 0.07],
            xfmt=lambda t: f"{t * 100:.0f}%", yticks=[900, 1100],
            yfmt=lambda t: f"{t:,.0f}")
    f.legend(62, 92, [(BLUE, "true price"), (AMBER, "duration estimate")])
    return f


@figure("Convexity", "Convexity as the curvature the duration line misses", width=WID)
def convexity() -> Fig:
    f = vcard("Convexity is the curvature the tangent leaves out",
              ["ΔP/P ≈ −D_Mod · Δj + ½ · C · (Δj)²",
               "C = (1/P) d²P/dj² = Σ t(t+1) C_t v^(t+2) / P"])

    n_long, j0 = 30, 0.05
    price = lambda j: _bond_price(j, n=n_long)
    p0 = price(j0)
    dmac, _ = _macaulay(j0, flows=_dur_cashflows(n=n_long))
    dmod = dmac / (1 + j0)
    lo, hi = 0.015, 0.09
    a = vaxes(f, lo, hi, 500, 1750, left=58, top=44)
    curve_pts = [a.p(lo + (hi - lo) * k / 60, price(lo + (hi - lo) * k / 60))
                 for k in range(61)]
    tangent_pts = [a.p(lo + (hi - lo) * k / 60,
                       max(500, p0 - dmod * p0 * (lo + (hi - lo) * k / 60 - j0)))
                   for k in range(60, -1, -1)]
    f.polygon(curve_pts + tangent_pts, fill=GREEN, fill_opacity="0.22", stroke="none")
    a.curve(price, colour=BLUE, xa=lo, xb=hi)
    a.polyline([(lo, p0 + dmod * p0 * (j0 - lo)),
                (hi, max(500, p0 - dmod * p0 * (hi - j0)))], colour=AMBER, width=1.6)
    a.point(j0, p0, colour="var(--dim)", r=3.2)
    a.label(0.042, 1420, "the gap is convexity", cls="sm bold", anchor="start")
    a.frame(xlabel="yield j", xticks=[0.02, 0.05, 0.08],
            xfmt=lambda t: f"{t * 100:.0f}%", yticks=[700, 1100, 1500],
            yfmt=lambda t: f"{t:,.0f}")
    f.legend(62, 92, [(BLUE, "true price"), (AMBER, "duration only")])
    return f


@figure("Portfolio", "Portfolio duration as the value-weighted average of its holdings",
        width=WID)
def portfolio() -> Fig:
    f = vcard("A portfolio's duration is its value-weighted average",
              "D_port = Σ Pᵢ Dᵢ / Σ Pᵢ")

    holdings = [("Short", 300_000, 2.1, BLUE), ("Medium", 500_000, 6.4, VIOLET),
                ("Long", 200_000, 14.2, ROSE)]
    total_v = sum(v for _, v, _, _ in holdings)
    port_d = sum(v * d for _, v, d, _ in holdings) / total_v

    x0, bar_w = 92, 168
    for k, (lab, val, dur, colour) in enumerate(holdings):
        y = 122 + k * 62
        f.text(x0 - 8, y + 20, lab, cls="sm bold", anchor="end")
        w = bar_w * val / 500_000
        f.rect(x0, y, w, 30, rx=4, fill=colour, fill_opacity="0.4", stroke=colour,
               stroke_width="1.2")
        f.text(x0 + w / 2, y + 21, f"{val / 1000:,.0f}k", cls="sm bold")
        f.text(x0 + bar_w + 12, y + 21, f"D = {dur:.1f}", cls="sm", anchor="start")
    f.line(40, 316, 320, 316, cls="rule")
    f.text(x0 - 8, 344, "Portfolio", cls="sm bold", anchor="end")
    f.text(x0 + bar_w / 2, 344, f"{total_v / 1000:,.0f}k", cls="sm bold")
    f.text(x0 + bar_w + 12, 344, f"D = {port_d:.2f}", cls="sm bold", anchor="start",
           fill=GREEN)
    return f


@figure("Spot Rate", "Spot rates as the yield on each zero-coupon maturity", width=WID)
def spot_rate() -> Fig:
    f = vcard("A spot rate is the yield on one future payment",
              ["P = Σ C_t / (1 + s_t)^t", "discount each flow at its own rate"])

    spots = [(1, 0.030), (2, 0.035), (3, 0.039), (4, 0.042), (5, 0.044), (6, 0.045)]
    a = vaxes(f, 0.4, 6.6, 0.025, 0.050, left=58, top=30)
    a.bars(spots, colour=BLUE, opacity="0.55", base=0.025)
    a.polyline(spots, colour=VIOLET, width=2)
    for t, s_ in spots:
        a.point(t, s_, colour=VIOLET, r=3)
    a.frame(xlabel="maturity n (years)", ylabel="spot rate sₙ",
            xticks=[1, 2, 3, 4, 5, 6], yticks=[0.03, 0.04, 0.05],
            yfmt=lambda t: f"{t * 100:.0f}%")
    return f


@figure("Forward Rate", "The forward rate implied by two spot rates", width=WID)
def forward_rate() -> Fig:
    f = vcard("A forward rate is locked in today for a future period",
              ["(1 + s₃)³ = (1 + s₂)² · (1 + f₂,₃)",
               "two routes to year 3 must cost the same today"])

    y = 250
    xs = timeline(f, y, 66, 296, 4, labels=["0", "1", "2", "3", "4"])
    f.arrow(xs[0] + 6, y - 40, xs[2] - 6, y - 40, colour=BLUE, width=1.5)
    f.text((xs[0] + xs[2]) / 2, y - 48, "s₂ for 2 years", cls="sm", fill=BLUE)
    f.arrow(xs[0] + 6, y - 76, xs[3] - 6, y - 76, colour=VIOLET, width=1.5)
    f.text((xs[0] + xs[3]) / 2, y - 84, "s₃ for 3 years", cls="sm", fill=VIOLET)
    f.arrow(xs[2] + 6, y + 40, xs[3] - 6, y + 40, colour=AMBER, width=1.7)
    f.text((xs[2] + xs[3]) / 2, y + 60, "f₂,₃", cls="bold", fill=AMBER)
    f.text(BCX, 340, "implied, not quoted", cls="sm dim")
    return f


@figure("Yield Curve", "Normal, flat and inverted term structures on one set of axes",
        width=WID)
def yield_curve() -> Fig:
    f = vcard("The yield curve plots the spot rate at each maturity",
              ["P = Σ C_t / (1 + s_t)^t", "every maturity has its own spot rate"])

    mats = [1, 2, 3, 5, 7, 10, 20, 30]
    shapes = (
        ("normal", GREEN, [4.2, 4.35, 4.5, 4.75, 4.95, 5.1, 5.3, 5.4], 5.4, -10),
        ("flat", BLUE, [4.7] * len(mats), 4.7, -10),
        ("inverted", ROSE, [5.1, 4.9, 4.7, 4.4, 4.2, 4.0, 3.7, 3.6], 3.6, 16),
    )
    a = vaxes(f, 0, 31, 3.3, 5.7, left=52, top=34)
    for _, colour, series, _, _ in shapes:
        a.polyline(list(zip(mats, series)), colour=colour)
        for t, s_ in zip(mats, series):
            a.point(t, s_, colour=colour, r=2.6)
    # Labelled at the long end, where the three curves are furthest apart.
    for label, colour, _, y, dy in shapes:
        a.label(29, y, label, cls="sm bold", fill=colour, anchor="end", dy=dy)
    a.frame(xlabel="maturity (years)", ylabel="spot rate", xticks=[1, 10, 20, 30],
            yticks=[3.5, 4.0, 4.5, 5.0, 5.5], yfmt=lambda t: f"{t:.1f}%")
    return f


@figure("Duration Matching", "Assets and liabilities matched in value and duration",
        width=WID)
def duration_matching() -> Fig:
    f = vcard("Match value and duration and small rate moves cancel",
              ["PV(A) = PV(L)   and   D(A) = D(L)", "add C(A) ≥ C(L) for Redington"])

    y = 216
    xs = timeline(f, y, 56, 300, 8, labels=["0", "", "", "", "", "", "", "", ""])
    for k, h in ((2, 44), (7, 58)):
        cash_arrow(f, xs[k], y, h, colour=BLUE, label="asset", up=True)
    cash_arrow(f, xs[5], y, 58, colour=ROSE, label="liability", up=False)
    dbar = (xs[0] + xs[8]) / 2
    f.line(xs[0], y + 100, xs[8], y + 100, cls="", stroke=AMBER, stroke_width="1.8")
    f.polygon([(dbar, y + 100), (dbar - 10, y + 116), (dbar + 10, y + 116)], fill=AMBER)
    f.text(dbar, y + 140, "both streams balance at the same point", cls="sm dim")
    return f


@figure("Immunization", "The surplus curve under each immunization strategy", width=WID)
def immunization() -> Fig:
    f = vcard("Immunization keeps the surplus non-negative",
              ["PV(A) = PV(L),  D(A) = D(L),  C(A) > C(L)",
               "ΔS ≈ ½ (C_A − C_L) V (Δj)² ≥ 0"])

    a = vaxes(f, -0.03, 0.03, -20, 30, left=58, top=30)
    a.curve(lambda d: 25000 * d * d, colour=GREEN)
    a.curve(lambda d: -450 * d - 3000 * d * d, colour=ROSE, dash=True)
    a.hline(0, colour="var(--dim)", dash=False)
    a.frame(ylabel="surplus S = V_A − V_L", xticks=[-0.02, 0.02],
            xfmt=lambda t: f"{t * 100:+.0f}%", yticks=[-15, 0, 15],
            yfmt=lambda t: f"{t:g}")
    f.text(a.x1, a.y1 + 30, "shift in yield Δj", cls="sm dim", anchor="end")
    a.label(0.020, 25, "immunized", cls="sm bold", anchor="end", fill=GREEN)
    a.label(0.024, -14, "not", cls="sm bold", anchor="end", fill=ROSE)
    return f


@figure("Redington Immunization", "The three Redington conditions and the surplus they "
        "produce", width=WID)
def redington_immunization() -> Fig:
    f = vcard("Redington: a local minimum of the surplus",
              ["ΔS ≈ ½ (C_A − C_L) · V · (Δj)²",
               "small parallel shifts only"])

    a = vaxes(f, -0.025, 0.025, -4, 24, left=58, top=30)
    a.area(lambda d: 32000 * d * d, -0.025, 0.025, colour=GREEN, opacity="0.16")
    a.curve(lambda d: 32000 * d * d, colour=GREEN)
    a.hline(0, colour="var(--dim)", dash=False)
    a.point(0, 0, colour=AMBER, r=4)
    a.label(0, 0, "S = 0 at the current yield", cls="sm", dy=30)
    a.frame(ylabel="surplus S", xticks=[-0.02, 0.02],
            xfmt=lambda t: f"{t * 100:+.0f}%", yticks=[0, 10, 20],
            yfmt=lambda t: f"{t:g}")
    f.text(a.x1, a.y1 + 30, "Δj", cls="sm dim", anchor="end")
    return f


@figure("Full Immunization", "Asset cash flows surrounding each liability payment",
        width=WID)
def full_immunization() -> Fig:
    f = vcard("Assets on both sides of every liability",
              ["PV(A) = PV(L),   D(A) = D(L)",
               "one asset before and one after each liability date"])

    y = 232
    xs = timeline(f, y, 56, 300, 8, labels=["0", "", "", "", "", "", "", "", ""])
    cash_arrow(f, xs[2], y, 50, colour=BLUE, label="asset", up=True)
    cash_arrow(f, xs[7], y, 50, colour=BLUE, label="asset", up=True)
    cash_arrow(f, xs[5], y, 54, colour=ROSE, label="liability", up=False)
    f.line(xs[2], y - 62, xs[7], y - 62, cls="thin dash", stroke=GREEN,
           stroke_width="1.4")
    f.text(BCX, y - 72, "the liability is surrounded", cls="sm bold", fill=GREEN)
    f.text(BCX, 352, "protects against any single shift", cls="sm dim")
    return f


@figure("Asset-Liability Portfolio", "Asset cash flows set against the liabilities they "
        "fund", width=WID)
def asset_liability_portfolio() -> Fig:
    f = vcard("Assets are held to fund liabilities",
              ["PV(A) = PV(L)", "match the cash flows, or the durations"])

    y = 236
    xs = timeline(f, y, 52, 302, 8,
                  labels=["0", "1", "2", "3", "4", "5", "6", "7", "8"])
    assets = {1: 28, 2: 36, 3: 32, 4: 44, 5: 32, 6: 36, 7: 28, 8: 66}
    liabs = {2: 32, 4: 40, 6: 32, 8: 54}
    for k, h in assets.items():
        cash_arrow(f, xs[k] - 4, y, h, colour=BLUE)
    for k, h in liabs.items():
        cash_arrow(f, xs[k] + 4, y, h, colour=ROSE, up=False)
    f.text(BCX, 128, "assets", cls="bold", fill=BLUE)
    f.text(BCX, 366, "liabilities", cls="bold", fill=ROSE)
    return f


@figure("Annuity Immediate", "An annuity-immediate paying at the end of each period, "
        "valued at both ends", width=WID)
def annuity_immediate() -> Fig:
    f = vcard("An annuity-immediate pays at the end of each period",
              ["a₍ₙ₎ = (1 − vⁿ)/i", "s₍ₙ₎ = (1 + i)ⁿ · a₍ₙ₎"])

    y = 250
    xs = timeline(f, y, 66, 300, 5, labels=["0", "1", "2", "3", "4", "5"])
    for j in range(1, 6):
        cash_arrow(f, xs[j], y, 42, colour=BLUE, label="1", up=True)
    f.line(xs[0], y - 88, xs[0], y - 8, cls="thin dash", stroke=AMBER, stroke_width="1.3")
    f.text(xs[0], y - 96, "a₍ₙ₎ here", cls="sm bold", fill=AMBER)
    f.line(xs[5], y - 88, xs[5], y - 8, cls="thin dash", stroke=GREEN, stroke_width="1.3")
    f.text(xs[5], y - 96, "s₍ₙ₎ here", cls="sm bold", fill=GREEN)
    f.text(BCX, 342, "at i = 6%, n = 5:  a₍₅₎ = 4.2124,  s₍₅₎ = 5.6371", cls="sm dim")
    return f
