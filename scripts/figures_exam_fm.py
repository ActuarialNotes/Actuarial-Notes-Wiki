"""Figures for the Exam FM (Financial Mathematics) concept pages.

Grouped in syllabus order:

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
    Axes, Fig, axes, brace, cash_arrow, timeline,
)
from figure_registry import figure

W = 560


def _ann_imm(n, i):
    return (1 - (1 + i) ** -n) / i


def _ann_due(n, i):
    return _ann_imm(n, i) * (1 + i)


# ═══════════════════════════════════════════════════════════════════════════
# 1. Interest theory
# ═══════════════════════════════════════════════════════════════════════════

@figure("Present Value", "A future payment discounted back to today along a timeline",
        width=520)
def present_value() -> Fig:
    f = Fig(W, 256)
    f.title("Discounting moves a payment backwards in time")

    y = 130
    xs = timeline(f, y, 76, 460, 5, labels=["0", "1", "2", "3", "4", "5"])
    cash_arrow(f, xs[5], y, 62, colour=BLUE, label="1,000", up=True)
    f.arrow(xs[5] - 8, y - 84, xs[0] + 8, y - 84, colour=AMBER, width=1.6)
    f.text((xs[0] + xs[5]) / 2, y - 92, "× v⁵ = (1.06)⁻⁵", cls="sm bold", fill=AMBER)
    cash_arrow(f, xs[0], y, 40, colour=AMBER, label="747.26", up=True)
    f.text(xs[0], y + 34, "PV", cls="sm dim")
    f.text(xs[5], y + 34, "FV", cls="sm dim")

    f.line(28, 186, 532, 186, cls="rule")
    f.text(150, 208, "PV = FV · (1 + i)⁻ⁿ = FV · vⁿ", cls="sm bold")
    f.text(150, 228, "a dollar later is worth less than one now", cls="sm dim")
    f.text(410, 208, "Several cash flows", cls="sm bold")
    f.text(410, 228, "PV = Σ C_t v^t", cls="sm dim")
    return f


@figure("Future Value", "Cash flows accumulated forward to a valuation date", width=520)
def future_value() -> Fig:
    f = Fig(W, 262)
    f.title("Accumulating moves payments forward in time")

    y = 132
    xs = timeline(f, y, 76, 452, 4, labels=["0", "1", "2", "3", "4"])
    for k, amt in ((0, "100"), (1, "100"), (2, "100")):
        cash_arrow(f, xs[k], y, 40, colour=BLUE, label=amt, up=True)
    for k in (0, 1, 2):
        f.arrow(xs[k] + 6, y - 66, xs[4] - 8, y - 66, colour=AMBER, width=1.2, dash=True)
    f.text((xs[0] + xs[4]) / 2, y - 74, "× (1 + i)^(n − t)", cls="sm bold", fill=AMBER)
    cash_arrow(f, xs[4], y, 74, colour=GREEN, label="FV₄", up=True)

    f.line(28, 192, 532, 192, cls="rule")
    f.text(150, 214, "FV = PV · (1 + i)ⁿ", cls="sm bold")
    f.text(150, 234, "the inverse of discounting", cls="sm dim")
    f.text(410, 214, "FVₙ = Σ C_t (1 + i)^(n − t)", cls="sm bold")
    f.text(410, 234, "each flow grows for the time it has left", cls="sm dim")
    return f


@figure("Accumulated Value", "A single sum growing forward under the accumulation "
        "function", width=520)
def accumulated_value() -> Fig:
    f = Fig(W, 268)
    f.title("Accumulated value is present value run forward")

    a = axes(f, 0, 6, 0, 1.55, left=58, right=252, top=66, bottom=76)
    a.curve(lambda t: 1.07 ** t, colour=BLUE)
    a.area(lambda t: 1.07 ** t, 0, 6, colour=BLUE, opacity="0.1")
    a.frame(xlabel="time t", ylabel="value of 1", xticks=[0, 2, 4, 6],
            yticks=[1.0, 1.5], yfmt=lambda t: f"{t:g}")
    a.point(0, 1, colour=AMBER, label="PV", dy=-10, dx=14)
    a.point(4.6, 1.07 ** 4.6, colour=GREEN, label="AV", dy=-10)
    a.vline(4.6, y_top=1.07 ** 4.6, colour=GREEN)

    f.text(420, 96, "AV = PV · a(t) = PV (1 + i)^t", cls="sm bold")
    rows = [
        ("Accumulation factor", "a(t)/a(s) grows a flow s → t", BLUE),
        ("A stream of flows", "AV = Σ C_t (1+i)^(n−t)", GREEN),
        ("The mirror of PV", "PV goes back, AV goes forward", AMBER),
    ]
    for i_, (lab, sub, colour) in enumerate(rows):
        yy = 116 + i_ * 46
        f.line(316, yy, 316, yy + 32, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(326, yy + 12, lab, cls="sm bold", anchor="start")
        f.text(326, yy + 28, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 254, "Same rate, same timeline — only the valuation date changes")
    return f


@figure("Current Value", "Cash flows moved to a reference date part-way through the "
        "timeline", width=540)
def current_value() -> Fig:
    f = Fig(W, 264)
    f.title("Current value picks a reference date and moves everything to it")

    y = 140
    xs = timeline(f, y, 68, 470, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    ref = xs[3]
    f.line(ref, y - 96, ref, y + 30, cls="thin dash", stroke=VIOLET, stroke_width="1.4")
    f.text(ref, y - 104, "reference date t", cls="sm bold", fill=VIOLET)
    for k, amt, colour in ((0, "C₀", BLUE), (1, "C₁", BLUE), (5, "C₅", AMBER),
                           (6, "C₆", AMBER)):
        cash_arrow(f, xs[k], y, 44, colour=colour, label=amt, up=True)
    f.arrow(xs[1] + 8, y - 58, ref - 8, y - 58, colour=BLUE, width=1.4)
    f.text((xs[1] + ref) / 2, y - 66, "accumulate", cls="sm", fill=BLUE)
    f.arrow(xs[5] - 8, y - 58, ref + 8, y - 58, colour=AMBER, width=1.4)
    f.text((xs[5] + ref) / 2, y - 66, "discount", cls="sm", fill=AMBER)

    f.line(28, 196, 532, 196, cls="rule")
    f.text(W / 2, 218, "Current value at t  =  Σ C_k · a(t) / a(t_k)", cls="sm bold")
    f.text(W / 2, 240, "Flows before t are grown forward; flows after t are discounted back",
           cls="sm dim")
    f.text(W / 2, 258, "PV is the t = 0 case; AV is the t = n case", cls="sm dim")
    return f


@figure("Interest Rate", "The interest rate as the two-way bridge between present and "
        "future value", width=520)
def interest_rate() -> Fig:
    f = Fig(W, 250)
    f.title("The interest rate is the exchange rate between dates")

    f.box(66, 88, 148, 74, colour=AMBER)
    f.text(140, 118, "PV", cls="ttl")
    f.text(140, 140, "value today", cls="sm dim")
    f.box(346, 88, 148, 74, colour=GREEN)
    f.text(420, 118, "FV", cls="ttl")
    f.text(420, 140, "value at time n", cls="sm dim")

    f.arrow(222, 108, 338, 108, colour=GREEN, width=1.8)
    f.text(280, 98, "× (1 + i)ⁿ", cls="sm bold", fill=GREEN)
    f.arrow(338, 146, 222, 146, colour=AMBER, width=1.8)
    f.text(280, 166, "× vⁿ = (1 + i)⁻ⁿ", cls="sm bold", fill=AMBER)

    f.line(28, 190, 532, 190, cls="rule")
    items = [
        ("Effective i", "compounded once per period"),
        ("Nominal i⁽ᵐ⁾", "credited m times a year"),
        ("Force δ", "the continuous-time limit"),
    ]
    for i_, (lab, sub) in enumerate(items):
        x = 44 + i_ * 172
        f.text(x, 212, lab, cls="sm bold", anchor="start")
        f.text(x, 230, sub, cls="sm dim", anchor="start")
    return f


@figure("Simple Interest", "Simple interest growing linearly against compound interest",
        width=520)
def simple_interest() -> Fig:
    f = Fig(W, 268)
    f.title("Simple interest is linear — the interest never earns interest")

    i = 0.10
    a = axes(f, 0, 10, 0.9, 2.7, left=58, right=234, top=66, bottom=76)
    a.area(lambda t: (1 + i) ** t, 0, 10, colour=AMBER, opacity="0.1", base=0.9)
    a.curve(lambda t: (1 + i) ** t, colour=AMBER)
    a.curve(lambda t: 1 + i * t, colour=BLUE)
    a.frame(xlabel="years", ylabel="a(t)", xticks=[0, 5, 10], yticks=[1, 2],
            yfmt=lambda t: f"{t:g}")
    f.legend(a.x0 + 8, a.y0 + 12, [(BLUE, "simple: 1 + it"),
                                   (AMBER, "compound: (1 + i)ᵗ")])
    a.label(8.4, 2.30, "the gap is", cls="sm dim")
    a.label(8.4, 2.16, "interest on interest", cls="sm dim")

    f.text(432, 96, "A(t) = P (1 + i t)", cls="sm bold")
    rows = [
        ("Linear in t", "each year adds the same P·i", BLUE),
        ("Equal at t = 1", "they agree after one period", GREEN),
        ("Short-term use", "T-bills, part-period conventions", AMBER),
    ]
    for i_, (lab, sub, colour) in enumerate(rows):
        yy = 116 + i_ * 46
        f.line(340, yy, 340, yy + 32, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(350, yy + 12, lab, cls="sm bold", anchor="start")
        f.text(350, yy + 28, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 256, "Below one period, simple interest is the larger of the two")
    return f


@figure("Compound Interest", "Compound growth split into principal, simple interest and "
        "interest on interest", width=520)
def compound_interest() -> Fig:
    f = Fig(W, 274)
    f.title("Compounding: interest that itself earns interest")

    i = 0.10
    a = axes(f, 0, 10, 0, 2.8, left=58, right=234, top=66, bottom=82)
    a.area(lambda t: (1 + i) ** t, 0, 10, colour=VIOLET, opacity="0.16", base=0)
    a.area(lambda t: 1 + i * t, 0, 10, colour=BLUE, opacity="0.18", base=0)
    a.area(lambda t: 1.0, 0, 10, colour="var(--dim)", opacity="0.16", base=0)
    a.curve(lambda t: (1 + i) ** t, colour=VIOLET)
    a.curve(lambda t: 1 + i * t, colour=BLUE, width=1.4, dash=True)
    a.frame(xlabel="years", ylabel="a(t)", xticks=[0, 5, 10], yticks=[1, 2],
            yfmt=lambda t: f"{t:g}")
    a.label(4.4, 0.5, "principal", cls="sm")
    a.label(5.6, 1.24, "simple interest", cls="sm")
    a.label(6.6, 2.22, "interest on interest", cls="sm")

    f.text(432, 100, "A(t) = P (1 + i)ᵗ", cls="sm bold")
    f.text(432, 120, "a(t) = (1 + i)ᵗ", cls="sm dim")
    f.box(340, 138, 186, 92, colour=VIOLET)
    f.text(433, 158, "The standard convention", cls="sm bold")
    f.text(433, 178, "(1 + i)ⁿ accumulation factor", cls="sm dim")
    f.text(433, 196, "vⁿ = (1 + i)⁻ⁿ discount factor", cls="sm dim")
    f.text(433, 216, "exponential, not linear", cls="sm dim")
    f.note(W / 2, 262, "Every annuity, loan and bond formula assumes compound interest")
    return f


@figure("Accumulation Function", "The accumulation function under the three standard "
        "interest regimes", width=520)
def accumulation_function() -> Fig:
    f = Fig(W, 276)
    f.title("a(t): the value at time t of 1 invested at time 0")

    a = axes(f, 0, 8, 0.9, 2.3, left=58, right=222, top=66, bottom=80)
    a.curve(lambda t: 1 + 0.10 * t, colour=BLUE)
    a.curve(lambda t: 1.10 ** t, colour=AMBER)
    a.curve(lambda t: math.exp(0.0953 * t), colour=GREEN, dash=True)
    a.frame(xlabel="time t", ylabel="a(t)", xticks=[0, 4, 8], yticks=[1, 2],
            yfmt=lambda t: f"{t:g}")
    a.point(0, 1, colour="var(--dim)", label="a(0) = 1", dy=-10, dx=30)
    f.legend(a.x0 + 8, a.y0 + 12, [(BLUE, "simple: 1 + it"),
                                   (AMBER, "compound: (1 + i)ᵗ"),
                                   (GREEN, "force δ: e^(δt)")])

    f.text(438, 96, "a(t) = exp( ∫₀ᵗ δ(s) ds )", cls="sm bold")
    rows = [
        ("a(0) = 1", "and a(t) never decreases", BLUE),
        ("δ(t) = a′(t)/a(t)", "the force recovered from a(t)", GREEN),
        ("A(t) = k · a(t)", "the amount function for k", AMBER),
    ]
    for i_, (lab, sub, colour) in enumerate(rows):
        yy = 118 + i_ * 46
        f.line(348, yy, 348, yy + 32, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(358, yy + 12, lab, cls="sm bold", anchor="start")
        f.text(358, yy + 28, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 264, "Every regime on the syllabus is one choice of δ(t)")
    return f


@figure("Fund Accumulation", "A fund balance stepping up with deposits and interest",
        width=540)
def fund_accumulation() -> Fig:
    f = Fig(W, 284)
    f.title("A fund grows from interest and from what is paid into it")

    i = 0.08
    bal = 1000.0
    flows = [0, 300, 300, -200, 300]
    balances = [bal]
    for k in range(1, 6):
        bal = bal * (1 + i) + flows[k - 1]
        balances.append(bal)
    a = axes(f, 0, 5, 0, 2400, left=64, right=234, top=66, bottom=80)
    for k in range(5):
        x1, x2 = a.px(k), a.px(k + 1)
        f.rect(x1 + 4, a.py(balances[k + 1]), x2 - x1 - 8,
               a.y1 - a.py(balances[k + 1]), rx=2, fill=BLUE, fill_opacity="0.22")
        f.rect(x1 + 4, a.py(balances[k]), x2 - x1 - 8, a.y1 - a.py(balances[k]), rx=2,
               fill=BLUE, fill_opacity="0.34")
    a.polyline([(k, balances[k]) for k in range(6)], colour=VIOLET, width=2)
    a.frame(xlabel="year", ylabel="fund balance", xticks=[0, 1, 2, 3, 4, 5],
            yticks=[0, 1000, 2000], yfmt=lambda t: f"{t:,.0f}")
    for k, c in enumerate(flows):
        if not c:
            continue
        colour = GREEN if c > 0 else ROSE
        f.text(a.px(k + 0.5), a.py(balances[k + 1]) - 8,
               f"{'+' if c > 0 else ''}{c}", cls="sm bold", fill=colour)

    f.text(428, 96, "AVₙ = F₀(1+i)ⁿ + Σ C_t (1+i)^(n−t)", cls="sm bold")
    rows = [
        ("Level deposits", "the sum becomes C · s₍ₙ₎", GREEN),
        ("Withdrawals", "enter as negative flows", ROSE),
        ("Two funds", "each grows at its own rate", VIOLET),
    ]
    for i_, (lab, sub, colour) in enumerate(rows):
        yy = 118 + i_ * 48
        f.line(348, yy, 348, yy + 34, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(358, yy + 13, lab, cls="sm bold", anchor="start")
        f.text(358, yy + 29, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 270, "Each deposit accumulates only for the time it is actually invested")
    return f


@figure("Net Present Value", "Project cash flows discounted and summed into an NPV",
        width=540)
def net_present_value() -> Fig:
    f = Fig(W, 296)
    f.title("NPV discounts every flow to time 0 and adds them up")

    i = 0.10
    flows = [-1000, 300, 400, 400, 300]
    a = axes(f, -0.6, 4.6, -1100, 500, left=64, right=228, top=66, bottom=84)
    for t, c in enumerate(flows):
        pv = c * (1 + i) ** -t
        x = a.px(t)
        colour = GREEN if c > 0 else ROSE
        f.rect(x - 17, min(a.py(c), a.py(0)), 15, abs(a.py(c) - a.py(0)), rx=2,
               fill=colour, fill_opacity="0.32")
        f.rect(x + 2, min(a.py(pv), a.py(0)), 15, abs(a.py(pv) - a.py(0)), rx=2,
               fill=colour, fill_opacity="0.8")
    a.frame(ylabel="cash flow", xticks=[0, 1, 2, 3, 4],
            yticks=[-1000, 0, 500], yfmt=lambda t: f"{t:,.0f}")
    f.text(a.x1, a.y1 + 18, "year", cls="sm dim", anchor="end")
    f.legend(a.x0 + 8, a.y0 + 12, [("var(--dim)", "nominal"), (GREEN, "discounted")])

    npv = sum(c * (1 + i) ** -t for t, c in enumerate(flows))
    f.text(430, 96, "NPV = Σ C_t v^t", cls="sm bold")
    f.text(430, 116, f"at i = 10%:  NPV ≈ {npv:,.0f}", cls="sm dim")
    f.box(340, 134, 186, 58, colour=GREEN)
    f.text(433, 154, "NPV > 0", cls="sm bold")
    f.text(433, 172, "the project beats the rate i", cls="sm dim")
    f.box(340, 200, 186, 58, colour=AMBER)
    f.text(433, 220, "IRR", cls="sm bold")
    f.text(433, 238, "the rate i* where NPV = 0", cls="sm dim")
    f.note(W / 2, 284, "Inflows positive, outflows negative — sign discipline is the trick")
    return f


@figure("Discount Factor", "The discount factor as the present value of 1 due in one "
        "period", width=520)
def discount_factor() -> Fig:
    f = Fig(W, 264)
    f.title("v is what 1 payable next period is worth today")

    y = 118
    xs = timeline(f, y, 130, 390, 1, labels=["0", "1"])
    cash_arrow(f, xs[1], y, 56, colour=BLUE, label="1", up=True)
    cash_arrow(f, xs[0], y, 40, colour=AMBER, label="v = 1/(1+i)", up=True)
    f.arrow(xs[1] - 10, y - 68, xs[0] + 10, y - 68, colour=AMBER, width=1.6)
    f.text((xs[0] + xs[1]) / 2, y - 76, "× v", cls="sm bold", fill=AMBER)

    bx0, bx1, by = 130, 420, 176
    i = 0.06
    v = 1 / (1 + i)
    f.rect(bx0, by, (bx1 - bx0) * v, 26, rx=4, fill=AMBER, fill_opacity="0.3",
           stroke=AMBER, stroke_width="1.2")
    f.rect(bx0 + (bx1 - bx0) * v, by, (bx1 - bx0) * (1 - v), 26, rx=4, fill=ROSE,
           fill_opacity="0.3", stroke=ROSE, stroke_width="1.2")
    f.text(bx0 + (bx1 - bx0) * v / 2, by + 17, "v = 0.9434", cls="sm bold")
    f.text(bx1 + 8, by + 17, "d = 0.0566", cls="sm bold", anchor="start", fill=ROSE)
    f.text(bx0 - 8, by + 17, "1", cls="sm dim", anchor="end")
    f.text((bx0 + bx1) / 2, by + 44, "v + d = 1", cls="sm dim")

    f.line(28, 232, 532, 232, cls="rule")
    f.text(W / 2, 252, "v = (1 + i)⁻¹ = 1 − d = e^(−δ)     ·     n periods: vⁿ = (1 + i)⁻ⁿ",
           cls="sm dim")
    return f


@figure("Discount Rate", "Interest collected up front, so only 1 minus d is advanced",
        width=540)
def discount_rate() -> Fig:
    f = Fig(W, 274)
    f.title("Discount charges the interest at the start of the period")

    for k, (head, colour, up_lab, down_lab, rate, when) in enumerate((
            ("Interest rate i", BLUE, "receive 1", "repay 1 + i", "6.00%",
             "paid at the end"),
            ("Discount rate d", AMBER, "receive 1 − d", "repay 1", "5.66%",
             "paid up front"))):
        y = 112 + k * 76
        xs = timeline(f, y, 190, 330, 1, labels=["0", "1"], label_dy=15)
        f.text(56, y + 4, head, cls="sm bold", anchor="start", fill=colour)
        cash_arrow(f, xs[0], y, 32, colour=colour, label=up_lab, up=True)
        cash_arrow(f, xs[1], y, 32, colour="var(--dim)", label=down_lab, up=True)
        f.text(392, y + 4, rate, cls="sm bold", anchor="start")
        f.text(444, y + 4, when, cls="sm dim", anchor="start")

    f.line(28, 226, 532, 226, cls="rule")
    f.text(150, 248, "d = i/(1 + i) = iv = 1 − v", cls="sm bold")
    f.text(150, 266, "i = d/(1 − d)", cls="sm dim")
    f.text(410, 248, "d < i for every positive rate", cls="sm bold")
    f.text(410, 266, "1 today accumulates to 1/(1 − d)", cls="sm dim")
    return f


@figure("Effective Discount Rate", "The effective discount rate measured over one period",
        width=520)
def effective_discount_rate() -> Fig:
    f = Fig(W, 262)
    f.title("d is the interest deducted from the front of the loan")

    y = 122
    xs = timeline(f, y, 160, 400, 1, labels=["0", "1"])
    cash_arrow(f, xs[0], y, 46, colour=AMBER, label="1 − d", up=True)
    cash_arrow(f, xs[1], y, 62, colour=BLUE, label="1", up=True)
    f.arrow(xs[0] + 10, y - 78, xs[1] - 10, y - 78, colour=BLUE, width=1.5)
    f.text((xs[0] + xs[1]) / 2, y - 86, "grows by 1/(1 − d)", cls="sm bold", fill=BLUE)
    f.text(xs[0], y + 34, "d stays with the lender", cls="sm dim")

    f.line(28, 182, 532, 182, cls="rule")
    cols = [
        ("d = i / (1 + i)", "= iv = 1 − v"),
        ("1 − d = v", "= 1/(1 + i)"),
        ("i = d / (1 − d)", "invert to recover i"),
    ]
    for i_, (lab, sub) in enumerate(cols):
        x = 42 + i_ * 172
        f.text(x, 204, lab, cls="sm bold", anchor="start")
        f.text(x, 222, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 250, "Same money, same period — only the timing of the interest differs")
    return f


@figure("Convertible m-thly", "Compounding m times a year climbing towards the effective "
        "annual rate", width=540)
def convertible_m_thly() -> Fig:
    f = Fig(W, 284)
    f.title("Convertible m-thly: interest credited m times a year")

    nom = 0.12
    a = axes(f, 0, 1, 0.99, 1.135, left=60, right=248, top=66, bottom=80)
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
    f.legend(a.x0 + 8, a.y0 + 10, [("var(--dim)", "annual"), (BLUE, "quarterly"),
                                   (AMBER, "monthly"), (GREEN, "continuous")])

    f.text(430, 92, "(1 + i⁽ᵐ⁾/m)ᵐ = 1 + i", cls="sm bold")
    f.text(430, 112, "i⁽ᵐ⁾ = 12% quoted throughout", cls="sm dim")
    rows = [("m = 1", 1), ("m = 4", 4), ("m = 12", 12), ("m = ∞", None)]
    for i_, (lab, m) in enumerate(rows):
        yy = 142 + i_ * 26
        eff = math.exp(nom) - 1 if m is None else (1 + nom / m) ** m - 1
        f.text(340, yy, lab, cls="sm", anchor="start")
        f.text(524, yy, f"i = {eff * 100:.3f}%", cls="sm bold", anchor="end")
    f.line(340, 252, 524, 252, cls="rule")
    f.text(432, 270, "more frequent → higher effective i", cls="sm dim")
    return f


@figure("Nominal Interest Rate", "The nominal rate needed to hit a fixed effective annual "
        "rate as compounding gets more frequent", width=540)
def nominal_interest_rate() -> Fig:
    f = Fig(W, 284)
    f.title("For a fixed effective rate, i⁽ᵐ⁾ falls as m rises")

    i_eff = 0.08
    a = axes(f, 1, 26, 0.0765, 0.0805, left=72, right=232, top=66, bottom=84)
    a.curve(lambda m: m * ((1 + i_eff) ** (1 / m) - 1), colour=BLUE, xa=1, xb=26)
    delta = math.log(1 + i_eff)
    a.hline(delta, colour=GREEN)
    a.label(15, delta + 0.0004, "δ = ln(1 + i)", cls="sm", fill=GREEN)
    for m in (1, 2, 4, 12):
        a.point(m, m * ((1 + i_eff) ** (1 / m) - 1), colour=BLUE, r=3.2)
    a.frame(xlabel="compounding frequency m", ylabel="i⁽ᵐ⁾",
            xticks=[1, 4, 12, 24], yticks=[0.077, 0.079],
            yfmt=lambda t: f"{t * 100:.1f}%")

    f.text(428, 94, "(1 + i⁽ᵐ⁾/m)ᵐ = 1 + i", cls="sm bold")
    f.text(428, 114, "i⁽ᵐ⁾ = m[(1 + i)^(1/m) − 1]", cls="sm dim")
    rows = [("i⁽¹⁾", 1), ("i⁽²⁾", 2), ("i⁽⁴⁾", 4), ("i⁽¹²⁾", 12)]
    for i_, (lab, m) in enumerate(rows):
        yy = 144 + i_ * 24
        val = m * ((1 + i_eff) ** (1 / m) - 1)
        f.text(340, yy, lab, cls="sm", anchor="start")
        f.text(524, yy, f"{val * 100:.4f}%", cls="sm bold", anchor="end")
    f.line(340, 250, 524, 250, cls="rule")
    f.text(432, 268, "all equivalent to i = 8% effective", cls="sm dim")
    return f


@figure("Nominal Interest Rate Convertible m-thly", "One year of interest split into m "
        "sub-period credits", width=540)
def nominal_convertible() -> Fig:
    f = Fig(W, 278)
    f.title("i⁽ᵐ⁾ is a quoted rate — the periodic rate is i⁽ᵐ⁾/m")

    m = 4
    y = 126
    xs = timeline(f, y, 96, 400, m, labels=["0", "¼", "½", "¾", "1"])
    for k in range(1, m + 1):
        f.arrow(xs[k - 1] + 6, y - 34, xs[k] - 6, y - 34, colour=BLUE, width=1.3)
        f.text((xs[k - 1] + xs[k]) / 2, y - 42, "× 1.03", cls="sm", fill=BLUE)
    f.text(xs[0], y + 34, "1", cls="sm dim")
    f.text(xs[m], y + 34, "1.03⁴ = 1.1255", cls="sm dim")
    f.text(430, y - 34, "i⁽⁴⁾/4 = 3%", cls="sm bold", anchor="start", fill=BLUE)

    f.line(28, 178, 532, 178, cls="rule")
    f.text(150, 200, "(1 + i⁽ᵐ⁾/m)ᵐ = 1 + i", cls="sm bold")
    f.text(150, 220, "i⁽⁴⁾ = 12% quoted", cls="sm dim")
    f.text(150, 238, "i = 12.55% effective", cls="sm dim")
    f.text(412, 200, "i⁽ᵐ⁾ = m[(1 + i)^(1/m) − 1]", cls="sm bold")
    f.text(412, 220, "as m → ∞, i⁽ᵐ⁾ → δ", cls="sm dim")
    f.text(412, 238, "a quoted rate is not an earned rate", cls="sm dim")
    f.note(W / 2, 266, "Never use a nominal rate in a formula without dividing by m first")
    return f


@figure("Nominal Discount Rate Convertible m-thly", "Discount deducted at the start of "
        "each of m sub-periods", width=540)
def nominal_discount_convertible() -> Fig:
    f = Fig(W, 282)
    f.title("d⁽ᵐ⁾ deducts interest at the start of each sub-period")

    m = 4
    y = 126
    xs = timeline(f, y, 96, 400, m, labels=["0", "¼", "½", "¾", "1"])
    for k in range(m):
        f.arrow(xs[k] + 6, y - 34, xs[k + 1] - 6, y - 34, colour=AMBER, width=1.3)
        f.text((xs[k] + xs[k + 1]) / 2, y - 42, "÷ (1 − d⁽⁴⁾/4)", cls="sm", fill=AMBER)
        f.circle(xs[k], y - 34, 3.4, fill=AMBER)
    f.text(xs[0], y + 34, "deducted up front", cls="sm dim")
    f.text(xs[m], y + 34, "1", cls="sm dim")

    f.line(28, 178, 532, 178, cls="rule")
    f.text(150, 200, "(1 − d⁽ᵐ⁾/m)ᵐ = 1 − d = v", cls="sm bold")
    f.text(150, 220, "d⁽ᵐ⁾ = m[1 − (1 + i)^(−1/m)]", cls="sm dim")
    f.text(150, 238, "as m → ∞, d⁽ᵐ⁾ → δ", cls="sm dim")
    f.text(412, 200, "Ordering for any m > 1", cls="sm bold")
    f.text(412, 220, "d < d⁽ᵐ⁾ < δ < i⁽ᵐ⁾ < i", cls="sm dim")
    f.text(412, 238, "everything meets at δ as m → ∞", cls="sm dim")
    f.note(W / 2, 268, "The discount mirror of i⁽ᵐ⁾ — same year, interest taken earlier")
    return f


@figure("Effective Rate", "One period of growth, and the equivalent nominal rates that "
        "produce it", width=540)
def effective_rate() -> Fig:
    f = Fig(W, 276)
    f.title("The effective rate is what actually happened over the period")

    y = 118
    xs = timeline(f, y, 160, 400, 1, labels=["0", "1"])
    cash_arrow(f, xs[0], y, 40, colour="var(--dim)", label="1", up=True)
    cash_arrow(f, xs[1], y, 66, colour=BLUE, label="1 + i", up=True)
    f.arrow(xs[0] + 10, y - 82, xs[1] - 10, y - 82, colour=BLUE, width=1.6)
    f.text((xs[0] + xs[1]) / 2, y - 90, "one measurement period", cls="sm bold",
           fill=BLUE)

    f.line(28, 172, 532, 172, cls="rule")
    f.text(W / 2, 194, "These all describe the same 8% effective annual rate",
           cls="sm bold")
    i_eff = 0.08
    entries = [
        ("i = 8.0000%", "effective annual"),
        (f"i⁽²⁾ = {2 * ((1 + i_eff) ** 0.5 - 1) * 100:.4f}%", "semi-annual"),
        (f"i⁽¹²⁾ = {12 * ((1 + i_eff) ** (1 / 12) - 1) * 100:.4f}%", "monthly"),
        (f"δ = {math.log(1 + i_eff) * 100:.4f}%", "continuous"),
    ]
    for i_, (lab, sub) in enumerate(entries):
        x = 44 + i_ * 128
        f.text(x, 224, lab, cls="sm bold", anchor="start")
        f.text(x, 242, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 266, "Convert every quoted rate to an effective rate before comparing")
    return f


@figure("Real Rate of Interest", "The nominal rate deflated by inflation into a real "
        "rate", width=540)
def real_rate_of_interest() -> Fig:
    f = Fig(W, 274)
    f.title("The real rate is what is left after inflation")

    scale = 3200
    rows = [
        ("Nominal i = 7%", 0.07, BLUE),
        ("Inflation r = 4%", 0.04, ROSE),
        ("Real i_r = 2.88%", (1.07 / 1.04) - 1, GREEN),
    ]
    for k, (lab, v, colour) in enumerate(rows):
        y = 84 + k * 46
        f.text(196, y + 17, lab, cls="sm bold", anchor="end")
        f.rect(210, y, v * scale, 26, rx=4, fill=colour, fill_opacity="0.4",
               stroke=colour, stroke_width="1.2")
        f.text(210 + v * scale + 8, y + 17, f"{v * 100:.2f}%", cls="sm", anchor="start",
               fill=colour)
    f.text(300, 218, "≈ i − r, but only approximately", cls="sm dim")

    f.line(28, 232, 532, 232, cls="rule")
    f.text(150, 252, "1 + i_r = (1 + i)/(1 + r)", cls="sm bold")
    f.text(150, 268, "i_r ≈ i − r for small rates", cls="sm dim")
    f.text(412, 252, "r > i gives a negative real rate", cls="sm bold")
    f.text(412, 268, "purchasing power shrinks", cls="sm dim")
    return f


@figure("Force of Interest", "The force of interest as the instantaneous growth rate of "
        "the accumulation function", width=540)
def force_of_interest() -> Fig:
    f = Fig(W, 282)
    f.title("δ is the instantaneous rate at which a(t) grows")

    delta = 0.10
    a = axes(f, 0, 6, 0.9, 1.9, left=60, right=252, top=66, bottom=82)
    a.curve(lambda t: math.exp(delta * t), colour=BLUE)
    t0 = 3.2
    v0 = math.exp(delta * t0)
    a.polyline([(t0 - 1.5, v0 - 1.5 * delta * v0), (t0 + 1.5, v0 + 1.5 * delta * v0)],
               colour=AMBER, width=1.6)
    a.point(t0, v0, colour=AMBER)
    a.label(t0 - 0.4, v0 + 0.14, "slope a′(t)", cls="sm", fill=AMBER)
    a.frame(xlabel="time t", ylabel="a(t) = e^(δt)", xticks=[0, 3, 6], yticks=[1, 1.5],
            yfmt=lambda t: f"{t:g}")

    f.text(420, 96, "δ = a′(t) / a(t)", cls="sm bold")
    f.text(420, 116, "= d/dt · ln a(t)", cls="sm dim")
    rows = [
        ("δ = ln(1 + i)", "and i = e^δ − 1", BLUE),
        ("a(t) = e^(δt)", "constant force", GREEN),
        ("Varying force", "a(t) = exp(∫₀ᵗ δ(s) ds)", VIOLET),
    ]
    for i_, (lab, sub, colour) in enumerate(rows):
        yy = 136 + i_ * 46
        f.line(316, yy, 316, yy + 32, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(326, yy + 12, lab, cls="sm bold", anchor="start")
        f.text(326, yy + 28, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 270, "δ is the m → ∞ limit of both i⁽ᵐ⁾ and d⁽ᵐ⁾")
    return f


@figure("Variable Force of Interest", "A time-varying force and the accumulation it "
        "integrates to", width=540)
def variable_force() -> Fig:
    f = Fig(W, 308)
    f.title("Under a varying force, accumulation is an integral")

    d_fn = lambda t: 0.04 + 0.016 * t
    a1 = axes(f, 0, 6, 0, 0.16, left=60, right=290, top=68, bottom=176)
    a1.area(d_fn, 0, 4, colour=AMBER, opacity="0.24")
    a1.curve(d_fn, colour=AMBER)
    a1.frame(ylabel="δ(t)", xticks=[0, 2, 4, 6], yticks=[0.05, 0.10, 0.15],
             yfmt=lambda t: f"{t:.2f}")
    a1.label(2.0, 0.045, "∫₀⁴ δ(s) ds", cls="sm bold")

    a2 = axes(f, 0, 6, 0.9, 2.0, left=60, right=290, top=194, bottom=52)
    a2.curve(lambda t: math.exp(0.04 * t + 0.008 * t * t), colour=BLUE)
    a2.frame(xlabel="time t", ylabel="a(t)", xticks=[0, 2, 4, 6], yticks=[1, 1.5],
             yfmt=lambda t: f"{t:g}")
    a2.vline(4, y_top=math.exp(0.04 * 4 + 0.008 * 16), colour=BLUE)
    a2.point(4, math.exp(0.04 * 4 + 0.008 * 16), colour=BLUE)

    f.text(418, 100, "a(t) = exp( ∫₀ᵗ δ(s) ds )", cls="sm bold")
    f.box(300, 120, 226, 62, colour=GREEN)
    f.text(413, 142, "From s to t", cls="sm bold")
    f.text(413, 162, "a(t)/a(s) = exp( ∫ₛᵗ δ(u) du )", cls="sm dim")
    f.box(300, 192, 226, 62, colour=VIOLET)
    f.text(413, 214, "Discounting", cls="sm bold")
    f.text(413, 234, "v(t) = exp( −∫₀ᵗ δ(s) ds )", cls="sm dim")
    f.note(W / 2, 296, "Set up the integral before reaching for any (1 + i)ⁿ shortcut")
    return f


@figure("Equation of Value", "Inflows and outflows balanced at a chosen comparison date",
        width=540)
def equation_of_value() -> Fig:
    f = Fig(W, 288)
    f.title("Move every cash flow to one comparison date, then balance")

    y = 138
    xs = timeline(f, y, 76, 464, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    ref = xs[0]
    f.line(ref, y - 96, ref, y + 46, cls="thin dash", stroke=VIOLET, stroke_width="1.4")
    f.text(ref + 8, y - 102, "comparison date", cls="sm bold", fill=VIOLET,
           anchor="start")
    for k in (2, 4, 6):
        cash_arrow(f, xs[k], y, 44, colour=GREEN, label="in", up=True)
        f.arrow(xs[k] - 8, y - 62, ref + 8, y - 62, colour=GREEN, width=1, dash=True)
    for k in (1, 3):
        cash_arrow(f, xs[k], y, 36, colour=ROSE, label="out", up=False)
        f.arrow(xs[k] - 8, y + 52, ref + 8, y + 52, colour=ROSE, width=1, dash=True)

    f.line(28, 216, 532, 216, cls="rule")
    f.text(W / 2, 238, "PV of inflows  =  PV of outflows,  at the comparison date",
           cls="sm bold")
    f.text(W / 2, 260, "Any date works — a different date gives a different equation but "
           "the same answer", cls="sm dim")
    f.text(W / 2, 278, "Pick the date that cancels the most terms", cls="sm dim")
    return f


@figure("Time Value of Money Equations", "The moves that connect any two valuation dates",
        width=540)
def tvm_equations() -> Fig:
    f = Fig(W, 274)
    f.title("Every FM calculation is one of these moves")

    nodes = [
        (120, 108, "PV", AMBER), (300, 108, "FV", GREEN),
        (120, 200, "a₍ₙ₎ — level PV", BLUE), (300, 200, "s₍ₙ₎ — level AV", VIOLET),
    ]
    for x, y, lab, colour in nodes:
        f.box(x - 76, y - 24, 152, 48, colour=colour)
        f.text(x, y + 5, lab, cls="sm bold")
    f.arrow(200, 96, 220, 96, colour=GREEN, width=1.5)
    f.text(210, 84, "× (1 + i)ⁿ", cls="sm", fill=GREEN)
    f.arrow(220, 122, 200, 122, colour=AMBER, width=1.5)
    f.text(210, 140, "× vⁿ", cls="sm", fill=AMBER)
    f.arrow(120, 172, 120, 136, colour=BLUE, width=1.4, dash=True)
    f.text(112, 158, "× payment", cls="sm dim", anchor="end")
    f.arrow(300, 172, 300, 136, colour=VIOLET, width=1.4, dash=True)
    f.text(310, 158, "× payment", cls="sm dim", anchor="start")
    f.arrow(200, 200, 220, 200, colour="var(--dim)", width=1.4)
    f.text(210, 220, "× (1 + i)ⁿ", cls="sm dim")

    f.text(524, 96, "FV = PV (1 + i)ⁿ", cls="sm bold", anchor="end")
    f.text(524, 116, "PV = FV vⁿ", cls="sm dim", anchor="end")
    f.text(524, 150, "s₍ₙ₎ = (1 + i)ⁿ a₍ₙ₎", cls="sm bold", anchor="end")
    f.text(524, 170, "the same two-date move", cls="sm dim", anchor="end")
    f.text(524, 204, "General form", cls="sm bold", anchor="end")
    f.text(524, 224, "Σ C_k · a(t₀)/a(t_k)", cls="sm dim", anchor="end")

    f.line(28, 244, 532, 244, cls="rule")
    f.note(W / 2, 264, "Same rate, same timeline — only the valuation date ever changes")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# 2. Annuities
# ═══════════════════════════════════════════════════════════════════════════

def _payment_timeline(f, y, n, x0=76, x1=452, heights=None, colour=BLUE, labels=None,
                      tick_labels=None, base_h=34):
    """A timeline with one payment arrow per period. Returns the node positions."""
    xs = timeline(f, y, x0, x1, n, labels=tick_labels)
    for k in range(n + 1):
        h = None if heights is None else heights[k]
        if not h:
            continue
        cash_arrow(f, xs[k], y, h if heights else base_h, colour=colour,
                   label=None if labels is None else labels[k], up=True)
    return xs


@figure("Cash Flow", "A cash-flow stream with inflows above and outflows below the "
        "timeline", width=540)
def cash_flow() -> Fig:
    f = Fig(W, 296)
    f.title("A cash flow is an amount attached to a date")

    y = 142
    xs = timeline(f, y, 76, 464, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    stream = [(-500, ROSE), (150, GREEN), (150, GREEN), (200, GREEN), (-80, ROSE),
              (200, GREEN), (260, GREEN)]
    for k, (c, colour) in enumerate(stream):
        h = abs(c) / 500 * 50 + 12
        cash_arrow(f, xs[k], y, h, colour=colour, label=f"{c:+,}", up=c > 0)

    f.line(28, 236, 532, 236, cls="rule")
    f.text(150, 258, "PV = Σ C_t v^t", cls="sm bold")
    f.text(150, 278, "value the stream at any date you like", cls="sm dim")
    f.text(412, 258, "Signs carry the direction", cls="sm bold")
    f.text(412, 278, "inflows up and positive, outflows down", cls="sm dim")
    return f


@figure("Annuities", "The annuity family, sorted by payment timing and pattern",
        width=540)
def annuities() -> Fig:
    f = Fig(W, 318)
    f.title("The annuity family", "one payment stream, valued four ways")

    rows = [
        ("Annuity-immediate", "a₍ₙ₎ = (1 − vⁿ)/i", "payments at period end", BLUE),
        ("Annuity-due", "ä₍ₙ₎ = (1 + i) a₍ₙ₎", "payments at period start", VIOLET),
        ("Perpetuity", "a₍∞₎ = 1/i", "payments forever", GREEN),
        ("Continuous", "ā₍ₙ₎ = (1 − vⁿ)/δ", "payments flow continuously", TEAL),
    ]
    for k, (lab, formula, sub, colour) in enumerate(rows):
        y = 66 + k * 54
        f.box(30, y, 250, 46, colour=colour)
        f.text(42, y + 20, lab, cls="sm bold", anchor="start")
        f.text(42, y + 36, sub, cls="sm dim", anchor="start")
        f.text(268, y + 28, formula, cls="sm", anchor="end", fill=colour)

    f.text(420, 84, "Non-level patterns", cls="sm bold")
    others = [
        ("Arithmetic", "P, P+Q, P+2Q, …", AMBER),
        ("Geometric", "1, (1+g), (1+g)², …", ROSE),
        ("Payable m-thly", "m payments of 1/m a year", BLUE),
    ]
    for k, (lab, sub, colour) in enumerate(others):
        y = 104 + k * 48
        f.line(304, y, 304, y + 34, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(314, y + 13, lab, cls="sm bold", anchor="start")
        f.text(314, y + 29, sub, cls="sm dim", anchor="start")
    f.box(300, 254, 230, 42, colour=VIOLET)
    f.text(415, 280, "s₍ₙ₎ = (1 + i)ⁿ a₍ₙ₎", cls="sm")
    f.note(155, 302, "Everything else is built from a₍ₙ₎")
    return f


@figure("Annuity Due", "An annuity-due paying at the start of each period, one period "
        "ahead of an annuity-immediate", width=540)
def annuity_due() -> Fig:
    f = Fig(W, 296)
    f.title("An annuity-due pays at the start of each period")

    for k, (head, offset, colour, sym) in enumerate((
            ("Annuity-immediate", 1, "var(--dim)", "a₍ₙ₎"),
            ("Annuity-due", 0, VIOLET, "ä₍ₙ₎"))):
        y = 104 + k * 84
        xs = timeline(f, y, 168, 424, 5, labels=["0", "1", "2", "3", "4", "5"])
        f.text(152, y + 4, head, cls="sm bold", anchor="end", fill=colour)
        for j in range(5):
            cash_arrow(f, xs[j + offset], y, 32, colour=colour, label="1", up=True)
        f.text(444, y + 4, sym, cls="sm bold", anchor="start", fill=colour)
    f.arrow(228, 212, 176, 212, colour=VIOLET, width=1.5)
    f.text(238, 216, "every payment moves one period earlier", cls="sm", fill=VIOLET,
           anchor="start")

    f.line(28, 234, 532, 234, cls="rule")
    f.text(150, 256, "ä₍ₙ₎ = (1 + i) a₍ₙ₎ = (1 − vⁿ)/d", cls="sm bold")
    f.text(150, 276, "s̈₍ₙ₎ = (1 + i) s₍ₙ₎", cls="sm dim")
    f.text(412, 256, "Where it shows up", cls="sm bold")
    f.text(412, 276, "leases, premiums, rent paid in advance", cls="sm dim")
    return f


@figure("Level Annuity", "A level annuity valued as a present value and as an accumulated "
        "value", width=540)
def level_annuity() -> Fig:
    f = Fig(W, 282)
    f.title("A level annuity: the same payment, every period")

    y = 136
    xs = timeline(f, y, 108, 424, 5, labels=["0", "1", "2", "3", "4", "5"])
    for j in range(1, 6):
        cash_arrow(f, xs[j], y, 36, colour=BLUE, label="P", up=True)
    f.arrow(xs[1] - 8, y + 44, xs[0] + 4, y + 44, colour=AMBER, width=1.5)
    f.text(xs[0] - 4, y + 48, "P · a₍ₙ₎", cls="sm bold", fill=AMBER, anchor="end")
    f.arrow(xs[4] + 8, y + 44, xs[5] - 4, y + 44, colour=GREEN, width=1.5)
    f.text(xs[5] + 6, y + 48, "P · s₍ₙ₎", cls="sm bold", fill=GREEN, anchor="start")

    f.line(28, 208, 532, 208, cls="rule")
    cols = [
        ("PV = P · a₍ₙ₎", "= P (1 − vⁿ)/i", AMBER),
        ("FV = P · s₍ₙ₎", "= P ((1+i)ⁿ − 1)/i", GREEN),
        ("s₍ₙ₎ = (1+i)ⁿ a₍ₙ₎", "same stream, later date", VIOLET),
    ]
    for i_, (lab, sub, colour) in enumerate(cols):
        x = 40 + i_ * 172
        f.line(x, 226, x, 256, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(x + 10, 237, lab, cls="sm bold", anchor="start")
        f.text(x + 10, 252, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 274, "The building block for loans, bonds and reserves")
    return f


@figure("Level Payment Annuity", "The two standard annuity factors read off one payment "
        "stream", width=540)
def level_payment_annuity() -> Fig:
    f = Fig(W, 288)
    f.title("Level payments, two standard factors")

    y = 128
    xs = timeline(f, y, 108, 424, 5, labels=["0", "1", "2", "3", "4", "5"])
    for j in range(1, 6):
        cash_arrow(f, xs[j], y, 34, colour=BLUE, label="P", up=True)
    f.line(xs[0], y - 78, xs[0], y - 6, cls="thin dash", stroke=AMBER,
           stroke_width="1.3")
    f.text(xs[0], y - 86, "value here → a₍ₙ₎", cls="sm bold", fill=AMBER)
    f.line(xs[5], y - 78, xs[5], y - 6, cls="thin dash", stroke=GREEN,
           stroke_width="1.3")
    f.text(xs[5], y - 86, "value here → s₍ₙ₎", cls="sm bold", fill=GREEN)

    f.line(28, 190, 532, 190, cls="rule")
    f.text(150, 212, "a₍ₙ₎ = (1 − vⁿ)/i", cls="sm bold")
    f.text(150, 232, "one period before the first payment", cls="sm dim")
    f.text(150, 252, "s₍ₙ₎ = ((1+i)ⁿ − 1)/i", cls="sm bold")
    f.text(150, 272, "at the date of the last payment", cls="sm dim")
    f.box(304, 202, 226, 74, colour=VIOLET)
    f.text(417, 224, "Worked at i = 6%, n = 5", cls="sm bold")
    f.text(417, 244, "a₍₅₎ = 4.2124", cls="sm dim")
    f.text(417, 262, "s₍₅₎ = 5.6371 = 1.06⁵ × 4.2124", cls="sm dim")
    return f


@figure("Perpetuity", "A perpetuity's payments and the finite present value they "
        "converge to", width=540)
def perpetuity() -> Fig:
    f = Fig(W, 288)
    f.title("A perpetuity pays forever, but its present value is finite")

    y = 122
    xs = timeline(f, y, 90, 420, 6, labels=["0", "1", "2", "3", "4", "5", "…"])
    for j in range(1, 7):
        cash_arrow(f, xs[j], y, 32, colour=BLUE, label="1" if j < 6 else "", up=True)
    f.text(444, y + 4, "forever", cls="sm dim", anchor="start")

    a = axes(f, 0, 40, 0, 22, left=74, right=286, top=176, bottom=52)
    a.curve(lambda n: (1 - 1.05 ** -n) / 0.05, colour=VIOLET, xa=0.2)
    a.hline(20, colour=GREEN, label="1/i = 20", anchor="start")
    a.frame(xlabel="number of payments n", ylabel="a₍ₙ₎", xticks=[0, 20, 40],
            yticks=[10, 20], yfmt=lambda t: f"{t:g}")

    f.text(430, 190, "a₍∞₎ = 1/i", cls="sm bold")
    f.text(430, 210, "ä₍∞₎ = 1/d = (1+i)/i", cls="sm dim")
    f.text(430, 234, "ä₍∞₎ = 1 + a₍∞₎", cls="sm bold")
    f.text(430, 254, "one payment now, then a perpetuity", cls="sm dim")
    f.text(430, 276, "consols, ground rent, endowments", cls="sm dim")
    return f


@figure("Level Perpetuity", "Payments that never stop, discounted to a finite value",
        width=540)
def level_perpetuity() -> Fig:
    f = Fig(W, 284)
    f.title("Level perpetuity: each payment's present value shrinks geometrically")

    i = 0.05
    a = axes(f, 0, 21, 0, 1.05, left=64, right=234, top=70, bottom=84)
    a.bars([(k, (1 + i) ** -k) for k in range(1, 21)], colour=BLUE, opacity="0.7")
    a.frame(xlabel="payment number", ylabel="present value of that payment",
            xticks=[1, 5, 10, 15, 20], yticks=[0.5, 1.0], yfmt=lambda t: f"{t:g}")
    f.text((a.x0 + a.x1) / 2, a.y1 + 46, "the terms shrink fast enough to converge",
           cls="sm dim")

    f.text(430, 100, "a₍∞₎ = Σ vᵏ = 1/i", cls="sm bold")
    f.text(430, 120, "at i = 5%:  1/0.05 = 20", cls="sm dim")
    f.box(340, 140, 186, 58, colour=VIOLET)
    f.text(433, 160, "Perpetuity-due", cls="sm bold")
    f.text(433, 178, "ä₍∞₎ = 1/d = 21", cls="sm dim")
    f.box(340, 206, 186, 58, colour=AMBER)
    f.text(433, 226, "Growing at g < i", cls="sm bold")
    f.text(433, 244, "PV = 1/(i − g)", cls="sm dim")
    return f


@figure("Term of Annuity", "The term as the count of payments, solved from the present "
        "value", width=540)
def term_of_annuity() -> Fig:
    f = Fig(W, 280)
    f.title("The term n is how many payments there are")

    y = 118
    xs = timeline(f, y, 100, 430, 6, labels=["0", "1", "2", "…", "n−1", "n", ""])
    for j in range(1, 6):
        cash_arrow(f, xs[j], y, 30, colour=BLUE, label="P", up=True)
    brace(f, xs[1], xs[5], y + 34, depth=9, label="term = n payments", colour=VIOLET)

    a = axes(f, 0, 30, 0, 16, left=74, right=280, top=180, bottom=48)
    a.curve(lambda n: (1 - 1.06 ** -n) / 0.06, colour=BLUE, xa=0.2)
    a.point(12, (1 - 1.06 ** -12) / 0.06, colour=AMBER)
    a.vline(12, y_top=(1 - 1.06 ** -12) / 0.06, colour=AMBER)
    a.hline((1 - 1.06 ** -12) / 0.06, x_to=12, colour=AMBER)
    a.frame(xlabel="term n", ylabel="a₍ₙ₎", xticks=[0, 12, 30], yticks=[5, 10, 15],
            yfmt=lambda t: f"{t:g}")

    f.text(424, 196, "n = −ln(1 − i·PV/P) / ln(1 + i)", cls="sm bold")
    f.text(424, 218, "invert the annuity factor with logs", cls="sm dim")
    f.text(424, 244, "A perpetuity is the n → ∞ case", cls="sm dim")
    f.text(424, 264, "A non-integer n implies a final part payment", cls="sm dim")
    return f


@figure("Non-level Annuities", "Three non-level payment patterns on one timeline",
        width=540)
def non_level_annuities() -> Fig:
    f = Fig(W, 300)
    f.title("When payments vary, discount each one — or decompose")

    patterns = [
        ("Arithmetic", [1, 2, 3, 4, 5], AMBER, "P, P+Q, P+2Q, …"),
        ("Geometric", [1, 1.5, 2.25, 3.4, 5.1], ROSE, "1, (1+g), (1+g)², …"),
        ("Irregular", [3, 1, 4, 2, 5], VIOLET, "no pattern at all"),
    ]
    for k, (lab, seq, colour, sub) in enumerate(patterns):
        y = 92 + k * 66
        xs = timeline(f, y, 152, 386, 5, labels=["", "1", "2", "3", "4", "5"],
                      label_dy=14)
        f.text(140, y - 4, lab, cls="sm bold", anchor="end", fill=colour)
        f.text(140, y + 12, sub, cls="sm dim", anchor="end")
        top = max(seq)
        for j, v in enumerate(seq):
            cash_arrow(f, xs[j + 1], y, 8 + 30 * v / top, colour=colour)

    f.line(28, 254, 532, 254, cls="rule")
    f.text(150, 276, "PV = Σ C_t v^t", cls="sm bold")
    f.text(150, 294, "always available, never wrong", cls="sm dim")
    f.text(412, 276, "Or decompose", cls="sm bold")
    f.text(412, 294, "level part + pure increasing part", cls="sm dim")
    return f


@figure("Arithmetic Increasing Annuity", "Payments rising by a constant amount, split "
        "into a level and an increasing piece", width=540)
def arithmetic_increasing() -> Fig:
    f = Fig(W, 300)
    f.title("An arithmetic annuity is a level annuity plus a staircase")

    y = 128
    xs = timeline(f, y, 96, 430, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    for j in range(1, 7):
        h_level = 24
        h_step = 9 * (j - 1)
        f.rect(xs[j] - 9, y - h_level, 18, h_level, rx=2, fill=BLUE,
               fill_opacity="0.55")
        if h_step:
            f.rect(xs[j] - 9, y - h_level - h_step, 18, h_step, rx=2, fill=AMBER,
                   fill_opacity="0.55")
        f.text(xs[j], y - h_level - h_step - 7, str(j), cls="sm")
    f.legend(452, y - 46, [(BLUE, "level P"), (AMBER, "increase Q")])

    f.line(28, 200, 532, 200, cls="rule")
    f.text(150, 222, "(Ia)₍ₙ₎ = (ä₍ₙ₎ − n vⁿ) / i", cls="sm bold")
    f.text(150, 242, "payments 1, 2, 3, …, n", cls="sm dim")
    f.text(150, 264, "(Is)₍ₙ₎ = (1+i)ⁿ (Ia)₍ₙ₎", cls="sm dim")
    f.text(412, 222, "General P and Q", cls="sm bold")
    f.text(412, 242, "PV = P·a₍ₙ₎ + (Q/i)(a₍ₙ₎ − n vⁿ)", cls="sm dim")
    f.text(412, 264, "the two pieces are valued separately", cls="sm dim")
    f.note(W / 2, 290, "(Ia)₍ₙ₎ + (Da)₍ₙ₎ = (n + 1) a₍ₙ₎ — the pair sums to n+1 each period")
    return f


@figure("Decreasing Annuity", "Payments falling by a constant amount, and the identity "
        "pairing them with an increasing annuity", width=540)
def decreasing_annuity() -> Fig:
    f = Fig(W, 300)
    f.title("A decreasing annuity is the mirror of an increasing one")

    y = 132
    n = 5
    xs = timeline(f, y, 108, 420, n, labels=["0", "1", "2", "3", "4", "5"])
    for j in range(1, n + 1):
        dec = n - j + 1
        inc = j
        f.rect(xs[j] - 9, y - 9 * dec, 18, 9 * dec, rx=2, fill=VIOLET,
               fill_opacity="0.55")
        f.rect(xs[j] - 9, y - 9 * (dec + inc), 18, 9 * inc, rx=2, fill=BLUE,
               fill_opacity="0.3")
        f.text(xs[j], y - 9 * dec + 14, str(dec), cls="sm")
    f.line(xs[1] - 14, y - 9 * (n + 1), xs[n] + 14, y - 9 * (n + 1), cls="thin dash",
           stroke=GREEN, stroke_width="1.4")
    f.text(xs[n] + 20, y - 9 * (n + 1) + 4, "n + 1", cls="sm bold", fill=GREEN,
           anchor="start")
    f.legend(452, y - 40, [(VIOLET, "(Da)₍ₙ₎"), (BLUE, "(Ia)₍ₙ₎")])

    f.line(28, 202, 532, 202, cls="rule")
    f.text(150, 224, "(Da)₍ₙ₎ = (n − a₍ₙ₎) / i", cls="sm bold")
    f.text(150, 244, "payments n, n−1, …, 1", cls="sm dim")
    f.text(150, 266, "(Ds)₍ₙ₎ = (1+i)ⁿ (Da)₍ₙ₎", cls="sm dim")
    f.text(412, 224, "The pairing identity", cls="sm bold")
    f.text(412, 244, "(Ia)₍ₙ₎ + (Da)₍ₙ₎ = (n+1) a₍ₙ₎", cls="sm dim")
    f.text(412, 266, "each period's two payments sum to n+1", cls="sm dim")
    f.note(W / 2, 292, "P decreasing by Q:  PV = P·a₍ₙ₎ − (Q/i)(a₍ₙ₎ − n vⁿ)")
    return f


@figure("Arithmetic Progression", "An arithmetic payment stream decomposed into level "
        "and increasing parts", width=540)
def arithmetic_progression() -> Fig:
    f = Fig(W, 294)
    f.title("Decompose: a level annuity of P plus a pure increase of Q")

    y = 126
    xs = timeline(f, y, 96, 424, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    P, Q = 100, 50
    top = P + 5 * Q
    for j in range(1, 7):
        amt = P + (j - 1) * Q
        hl = 52 * P / top
        hq = 52 * ((j - 1) * Q) / top
        f.rect(xs[j] - 11, y - hl, 22, hl, rx=2, fill=BLUE, fill_opacity="0.55")
        if hq:
            f.rect(xs[j] - 11, y - hl - hq, 22, hq, rx=2, fill=AMBER,
                   fill_opacity="0.55")
        f.text(xs[j], y - hl - hq - 7, str(amt), cls="sm")
    f.legend(452, y - 44, [(BLUE, "P = 100"), (AMBER, "+ Q = 50")])

    f.line(28, 196, 532, 196, cls="rule")
    f.text(W / 2, 218, "PV = P · a₍ₙ₎  +  (Q / i) · ( a₍ₙ₎ − n vⁿ )", cls="sm bold")
    f.text(W / 2, 242, "the level piece uses the ordinary annuity factor; the increase "
           "uses (Ia)₍ₙ₎", cls="sm dim")
    f.text(W / 2, 262, "(Ia)₍ₙ₎ = (ä₍ₙ₎ − n vⁿ) / i", cls="sm dim")
    f.text(W / 2, 282, "A negative Q gives a decreasing annuity — same formula",
           cls="sm dim")
    return f


@figure("Geometric Increasing Annuity", "Payments growing at a constant rate against a "
        "level stream", width=540)
def geometric_increasing() -> Fig:
    f = Fig(W, 298)
    f.title("Geometric payments multiply, they do not add")

    y = 132
    xs = timeline(f, y, 96, 424, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    g = 0.20
    top = (1 + g) ** 5
    for j in range(1, 7):
        amt = (1 + g) ** (j - 1)
        f.rect(xs[j] - 11, y - 56 * amt / top, 22, 56 * amt / top, rx=2, fill=ROSE,
               fill_opacity="0.55")
        f.text(xs[j], y - 56 * amt / top - 7, f"{amt:.2f}", cls="sm")
    f.text(444, y - 40, "× (1 + g) each", cls="sm", fill=ROSE, anchor="start")

    f.line(28, 200, 532, 200, cls="rule")
    f.text(150, 222, "PV = [1 − ((1+g)/(1+i))ⁿ] / (i − g)", cls="sm bold")
    f.text(150, 244, "for i ≠ g", cls="sm dim")
    f.text(150, 264, "i = g:  PV = n · v", cls="sm dim")
    f.text(412, 222, "Geometric perpetuity", cls="sm bold")
    f.text(412, 244, "PV = 1/(i − g), needs i > g", cls="sm dim")
    f.text(412, 264, "otherwise the sum diverges", cls="sm dim")
    f.note(W / 2, 288, "Equivalently: a level annuity valued at rate j = (1+i)/(1+g) − 1")
    return f


@figure("Geometric Progression", "A geometric payment stream and the shifted rate that "
        "values it", width=540)
def geometric_progression() -> Fig:
    f = Fig(W, 290)
    f.title("A geometric stream is a level annuity at a shifted rate")

    i, g = 0.08, 0.03
    a = axes(f, 0, 11, 0, 1.6, left=64, right=252, top=70, bottom=88)
    a.bars([(k, (1 + g) ** (k - 1)) for k in range(1, 11)], colour=ROSE, opacity="0.6")
    a.bars([(k, (1 + g) ** (k - 1) * (1 + i) ** -k) for k in range(1, 11)], colour=BLUE,
           opacity="0.85")
    a.frame(xlabel="payment number", ylabel="amount", xticks=[1, 5, 10],
            yticks=[0.5, 1.0, 1.5], yfmt=lambda t: f"{t:g}")
    f.legend(a.x0 + 8, a.y0 + 10, [(ROSE, "payment (1+g)^(k−1)"),
                                   (BLUE, "its present value")])

    f.text(430, 100, "PV = [1 − ((1+g)/(1+i))ⁿ] / (i − g)", cls="sm bold")
    f.box(338, 120, 190, 62, colour=VIOLET)
    f.text(433, 142, "The shifted rate", cls="sm bold")
    f.text(433, 162, "j = (1+i)/(1+g) − 1", cls="sm dim")
    f.box(338, 190, 190, 62, colour=GREEN)
    f.text(433, 212, "Then PV = a₍ₙ₎ⱼ / (1 + g)", cls="sm bold")
    f.text(433, 232, "an ordinary annuity at rate j", cls="sm dim")
    f.note(W / 2, 278, "Growth and discount both compound — subtract them in ratio, not "
           "in level")
    return f


@figure("Payable m-thly", "An annual payment of 1 split into m sub-period payments",
        width=540)
def payable_m_thly() -> Fig:
    f = Fig(W, 288)
    f.title("Payable m-thly: the same 1 per year, paid in m pieces")

    for k, (head, m, colour) in enumerate((("m = 1", 1, "var(--dim)"),
                                           ("m = 4", 4, BLUE))):
        y = 106 + k * 76
        xs = timeline(f, y, 152, 424, 4 * (1 if m == 1 else 1),
                      labels=["0", "1", "2", "3", "4"], label_dy=15)
        f.text(140, y + 4, head, cls="sm bold", anchor="end", fill=colour)
        step = (xs[1] - xs[0]) / m
        for yr in range(4):
            for j in range(1, m + 1):
                x = xs[yr] + step * j
                cash_arrow(f, x, y, 30 if m == 1 else 22, colour=colour,
                           label="1" if m == 1 else "", up=True)
        f.text(440, y + 4, "1 per year" if m == 1 else "¼ each quarter",
               cls="sm dim", anchor="start")

    f.line(28, 220, 532, 220, cls="rule")
    f.text(150, 242, "a⁽ᵐ⁾₍ₙ₎ = (1 − vⁿ) / i⁽ᵐ⁾", cls="sm bold")
    f.text(150, 262, "the only change is i → i⁽ᵐ⁾", cls="sm dim")
    f.text(412, 242, "Because money arrives earlier", cls="sm bold")
    f.text(412, 262, "a⁽ᵐ⁾₍ₙ₎ > a₍ₙ₎ for every m > 1", cls="sm dim")
    return f


@figure("Payable Continuously", "The m-thly annuity in the limit, paying as a continuous "
        "stream", width=540)
def payable_continuously() -> Fig:
    f = Fig(W, 292)
    f.title("Let m → ∞ and the payments become a stream")

    for k, (head, m, colour) in enumerate((("m = 4", 4, BLUE), ("m = 12", 12, VIOLET))):
        y = 96 + k * 56
        xs = timeline(f, y, 150, 424, 1, labels=["", ""], label_dy=0)
        f.text(138, y + 4, head, cls="sm bold", anchor="end", fill=colour)
        step = (xs[1] - xs[0]) / m
        for j in range(1, m + 1):
            cash_arrow(f, xs[0] + step * j, y, 22, colour=colour)
    y = 208
    xs = timeline(f, y, 150, 424, 1, labels=["0", "n"])
    f.rect(xs[0], y - 24, xs[1] - xs[0], 24, rx=2, fill=TEAL, fill_opacity="0.4")
    f.text(138, y + 4, "m → ∞", cls="sm bold", anchor="end", fill=TEAL)
    f.text(444, y - 12, "a continuous stream", cls="sm dim", anchor="start")

    f.line(28, 240, 532, 240, cls="rule")
    f.text(150, 262, "ā₍ₙ₎ = ∫₀ⁿ e^(−δt) dt = (1 − vⁿ)/δ", cls="sm bold")
    f.text(150, 282, "the discount rate i becomes δ", cls="sm dim")
    f.text(412, 262, "Since δ < i⁽ᵐ⁾ < i", cls="sm bold")
    f.text(412, 282, "ā₍ₙ₎ is the largest of the three", cls="sm dim")
    return f


@figure("Continuous Annuity", "The continuous annuity as area under the discount curve",
        width=540)
def continuous_annuity() -> Fig:
    f = Fig(W, 288)
    f.title("A continuous annuity is the area under the discount curve")

    delta = math.log(1.06)
    n = 8
    a = axes(f, 0, 10, 0, 1.1, left=64, right=240, top=70, bottom=84)
    a.area(lambda t: math.exp(-delta * t), 0, n, colour=TEAL, opacity="0.24")
    a.curve(lambda t: math.exp(-delta * t), colour=TEAL)
    a.frame(xlabel="time t", ylabel="v^t = e^(−δt)", xticks=[0, n],
            xfmt=lambda t: "0" if t == 0 else "n", yticks=[0.5, 1.0],
            yfmt=lambda t: f"{t:g}")
    a.label(3.4, 0.34, "ā₍ₙ₎ = ∫₀ⁿ v^t dt", cls="sm bold")
    a.vline(n, y_top=math.exp(-delta * n), colour=TEAL)

    f.text(424, 100, "ā₍ₙ₎ = (1 − vⁿ)/δ", cls="sm bold")
    f.text(424, 120, "s̄₍ₙ₎ = ((1+i)ⁿ − 1)/δ", cls="sm dim")
    f.box(330, 140, 196, 58, colour=VIOLET)
    f.text(428, 160, "Only the denominator changes", cls="sm bold")
    f.text(428, 178, "a₍ₙ₎ uses i, ā₍ₙ₎ uses δ", cls="sm dim")
    f.box(330, 206, 196, 58, colour=GREEN)
    f.text(428, 226, "δ < i, so ā₍ₙ₎ > a₍ₙ₎", cls="sm bold")
    f.text(428, 244, "money arriving sooner is worth more", cls="sm dim")
    f.note(W / 2, 278, "s̄₍ₙ₎ = (1 + i)ⁿ ā₍ₙ₎ — the same two-date move as always")
    return f
