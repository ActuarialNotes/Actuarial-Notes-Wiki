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


def _acc(n, i):
    """s₍ₙ₎ — the accumulated value of an n-period annuity-immediate."""
    return ((1 + i) ** n - 1) / i


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
        width=540)
def loans() -> Fig:
    f = Fig(W, 300)
    f.title("A loan: principal in, payments out, balance in between")

    y = 116
    xs = timeline(f, y, 116, 424, 6, labels=["0", "1", "2", "3", "…", "n−1", "n"])
    cash_arrow(f, xs[0], y, 52, colour=GREEN, label="L", up=False)
    for j in range(1, 7):
        cash_arrow(f, xs[j], y, 34, colour=BLUE, label="P", up=True)
    f.text(100, y + 4, "borrower", cls="sm dim", anchor="end")

    f.line(28, 186, 532, 186, cls="rule")
    parts = [
        ("Principal L", "the amount borrowed", GREEN),
        ("Rate i", "charged on the balance", AMBER),
        ("Term n", "how many payments", VIOLET),
        ("Payment P", "L / a₍ₙ₎ when level", BLUE),
    ]
    for k, (lab, sub, colour) in enumerate(parts):
        x = 36 + k * 128
        f.line(x, 202, x, 232, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(x + 9, 213, lab, cls="sm bold", anchor="start")
        f.text(x + 9, 228, sub, cls="sm dim", anchor="start")
    f.text(150, 262, "Prospective:  OB_k = P · a₍ₙ₋ₖ₎", cls="sm bold")
    f.text(150, 282, "PV of the payments still to come", cls="sm dim")
    f.text(412, 262, "Retrospective:  OB_k = L(1+i)ᵏ − P·s₍ₖ₎", cls="sm bold")
    f.text(412, 282, "loan grown forward, less payments made", cls="sm dim")
    return f


@figure("Amortization", "A level payment splitting into shrinking interest and growing "
        "principal", width=540)
def amortization() -> Fig:
    f = Fig(W, 296)
    f.title("The payment is level; its split is not")

    rows, P = _schedule()
    a = axes(f, 0.4, LOAN_N + 0.6, 0, P * 1.12, left=68, right=228, top=68, bottom=84)
    _amort_bars(f, a, rows, P)
    a.hline(P, colour=VIOLET, dash=False)
    a.frame(xlabel="payment number", ylabel="payment",
            xticks=list(range(1, LOAN_N + 1)), yticks=[0, 1000, P],
            yfmt=lambda t: f"P = {t:,.0f}" if t > 1400 else f"{t:,.0f}")
    f.legend_row(a.x0 + 2, a.y1 + 46, [(AMBER, "interest I_k"),
                                       (BLUE, "principal PR_k")], gap=124)

    f.text(430, 96, "P = L / a₍ₙ₎", cls="sm bold")
    f.text(430, 116, f"= {LOAN_L:,.0f} / a₍₈₎ at 8% = {P:,.2f}", cls="sm dim")
    rows2 = [
        ("I_k = P (1 − v^(n−k+1))", "falls every period", AMBER),
        ("PR_k = P v^(n−k+1)", "rises every period", BLUE),
        ("OB_k = P a₍ₙ₋ₖ₎", "hits zero at k = n", VIOLET),
    ]
    for k, (lab, sub, colour) in enumerate(rows2):
        yy = 140 + k * 46
        f.line(340, yy, 340, yy + 32, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(350, yy + 12, lab, cls="sm bold", anchor="start")
        f.text(350, yy + 28, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 284, "The principal repaid grows by a factor of (1 + i) each period")
    return f


@figure("Principal", "The principal portion of each payment growing as the balance falls",
        width=540)
def principal() -> Fig:
    f = Fig(W, 292)
    f.title("Principal: what is borrowed, and what each payment returns")

    rows, P = _schedule()
    a = axes(f, 0.4, LOAN_N + 0.6, 0, P * 1.12, left=68, right=234, top=68, bottom=84)
    _amort_bars(f, a, rows, P)
    a.frame(xlabel="payment number", ylabel="payment",
            xticks=list(range(1, LOAN_N + 1)), yticks=[0, 1000],
            yfmt=lambda t: f"{t:,.0f}")
    f.legend_row(a.x0 + 2, a.y1 + 46, [(BLUE, "principal repaid"), (AMBER, "interest")], gap=124)

    f.text(428, 96, "L = 10,000 borrowed", cls="sm bold")
    f.text(428, 116, "Σ PR_k = L exactly", cls="sm dim")
    rows2 = [
        ("First interest", "I₁ = L · i = 800", AMBER),
        ("PR_k = P − I_k", "grows by (1+i) each period", BLUE),
        ("In bonds", "principal means the redemption value", VIOLET),
    ]
    for k, (lab, sub, colour) in enumerate(rows2):
        yy = 140 + k * 46
        f.line(340, yy, 340, yy + 32, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(350, yy + 12, lab, cls="sm bold", anchor="start")
        f.text(350, yy + 28, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 280, "Every payment is interest first, principal second")
    return f


@figure("Interest", "Interest charged on the declining balance, period by period",
        width=540)
def interest() -> Fig:
    f = Fig(W, 292)
    f.title("Interest is charged on whatever is still owed")

    rows, P = _schedule()
    a = axes(f, 0.4, LOAN_N + 0.6, 0, 11000, left=72, right=234, top=68, bottom=84)
    bw = (a.px(1) - a.px(0)) * 0.6
    for k, (bal, interest_, _, _) in enumerate(rows):
        x = a.px(k + 1)
        f.rect(x - bw / 2, a.py(bal), bw, a.y1 - a.py(bal), rx=2, fill="var(--dim)",
               fill_opacity="0.2")
        f.rect(x - bw / 2, a.py(interest_ * 10), bw, a.y1 - a.py(interest_ * 10), rx=2,
               fill=AMBER, fill_opacity="0.75")
    a.frame(xlabel="period", ylabel="balance", xticks=list(range(1, LOAN_N + 1)),
            yticks=[0, 5000, 10000], yfmt=lambda t: f"{t:,.0f}")
    f.legend_row(a.x0 + 2, a.y1 + 46, [("var(--dim)", "balance OB₍ₖ₋₁₎"),
                                       (AMBER, "interest I_k (×10)")], gap=140)

    f.text(428, 96, "I_k = i · OB₍ₖ₋₁₎", cls="sm bold")
    f.text(428, 116, "PR_k = payment − I_k", cls="sm dim")
    rows2 = [
        ("Falling balance", "so falling interest", AMBER),
        ("Front-loaded", "early payments are mostly interest", ROSE),
        ("Never on the original L", "always on the current balance", VIOLET),
    ]
    for k, (lab, sub, colour) in enumerate(rows2):
        yy = 140 + k * 46
        f.line(340, yy, 340, yy + 32, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(350, yy + 12, lab, cls="sm bold", anchor="start")
        f.text(350, yy + 28, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 280, "Interest is shown at ten times scale so both series are visible")
    return f


@figure("Outstanding Balance", "The loan balance falling to zero, found prospectively or "
        "retrospectively", width=540)
def outstanding_balance() -> Fig:
    f = Fig(W, 296)
    f.title("Two routes to the same balance")

    rows, P = _schedule()
    balances = [LOAN_L] + [r[3] for r in rows]
    a = axes(f, 0, LOAN_N, 0, 11000, left=72, right=234, top=68, bottom=84)
    a.area(lambda t: balances[min(int(t), LOAN_N)] +
           (balances[min(int(t) + 1, LOAN_N)] - balances[min(int(t), LOAN_N)]) *
           (t - int(t)), 0, LOAN_N, colour=BLUE, opacity="0.16")
    a.polyline(list(enumerate(balances)), colour=BLUE)
    for k, b in enumerate(balances):
        a.point(k, b, colour=BLUE, r=3)
    k0 = 3
    a.vline(k0, y_top=balances[k0], colour=VIOLET)
    a.label(k0, balances[k0], f"OB₃ = {balances[k0]:,.0f}", cls="sm bold", dy=-10)
    a.frame(xlabel="payments made", ylabel="balance", xticks=list(range(LOAN_N + 1)),
            yticks=[0, 5000, 10000], yfmt=lambda t: f"{t:,.0f}")

    f.text(428, 96, "Same number, two derivations", cls="sm bold")
    f.box(340, 114, 190, 62, colour=GREEN)
    f.text(435, 136, "Prospective", cls="sm bold")
    f.text(435, 156, "OB_k = P · a₍ₙ₋ₖ₎", cls="sm dim")
    f.box(340, 184, 190, 62, colour=AMBER)
    f.text(435, 206, "Retrospective", cls="sm bold")
    f.text(435, 226, "OB_k = L(1+i)ᵏ − P·s₍ₖ₎", cls="sm dim")
    f.note(W / 2, 284, "OB_k = L − P·a₍ₖ₎ is wrong — it ignores the interest accrued")
    return f


@figure("Term of Loan", "How the term trades off against the level payment", width=540)
def term_of_loan() -> Fig:
    f = Fig(W, 292)
    f.title("Term, payment, rate and principal — any three fix the fourth")

    a = axes(f, 2, 30, 0, 5200, left=76, right=238, top=70, bottom=88)
    a.curve(lambda n: LOAN_L / _ann_imm(n, LOAN_I), colour=BLUE, xa=2, xb=30)
    for n_ in (5, 10, 20):
        a.point(n_, LOAN_L / _ann_imm(n_, LOAN_I), colour=AMBER, r=3.4)
        a.label(n_, LOAN_L / _ann_imm(n_, LOAN_I),
                f"{LOAN_L / _ann_imm(n_, LOAN_I):,.0f}", cls="sm", dy=-10)
    a.frame(xlabel="term n (years)", ylabel="level payment",
            xticks=[5, 10, 20, 30], yticks=[0, 2000, 4000],
            yfmt=lambda t: f"{t:,.0f}")
    f.text((a.x0 + a.x1) / 2, a.y1 + 54, "L = 10,000 at i = 8%", cls="sm dim")

    f.text(430, 100, "P = L / a₍ₙ₎", cls="sm bold")
    rows = [
        ("Longer term", "smaller payment, more total interest", BLUE),
        ("Non-integer n", "the last payment differs", AMBER),
        ("Solve for n", "n = −ln(1 − iL/P)/ln(1 + i)", VIOLET),
    ]
    for k, (lab, sub, colour) in enumerate(rows):
        yy = 124 + k * 48
        f.line(342, yy, 342, yy + 34, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(352, yy + 13, lab, cls="sm bold", anchor="start")
        f.text(352, yy + 29, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 280, "A drop or balloon payment is what a non-integer term looks like")
    return f


@figure("Final Payment", "A drop payment and a balloon payment against the regular "
        "payment", width=540)
def final_payment() -> Fig:
    f = Fig(W, 292)
    f.title("When the term is not a whole number, the last payment differs")

    for k, (head, last_h, colour, note) in enumerate((
            ("Drop payment", 20, GREEN, "smaller than P — the loan was slightly over-paid"),
            ("Balloon payment", 62, ROSE, "larger than P — the payments under-amortised"))):
        y = 110 + k * 84
        xs = timeline(f, y, 168, 424, 5, labels=["0", "1", "2", "3", "4", "5"])
        f.text(152, y + 4, head, cls="sm bold", anchor="end", fill=colour)
        for j in range(1, 5):
            cash_arrow(f, xs[j], y, 34, colour=BLUE, label="P", up=True)
        cash_arrow(f, xs[5], y, last_h, colour=colour, up=True)
        f.text(444, y + 4, note.split(" — ")[0], cls="sm dim", anchor="start")

    f.line(28, 232, 532, 232, cls="rule")
    f.text(150, 254, "Drop:  B_n(1 + i),  smaller than P", cls="sm bold")
    f.text(150, 274, "the balance was already nearly cleared", cls="sm dim")
    f.text(412, 254, "Balloon:  OB₍ₙ₋₁₎(1 + i)", cls="sm bold")
    f.text(412, 274, "the regular payments left a stub", cls="sm dim")
    return f


@figure("Drop Payment", "A final payment smaller than the regular one, clearing a small "
        "remaining balance", width=540)
def drop_payment() -> Fig:
    f = Fig(W, 288)
    f.title("A drop payment clears the small balance that is left")

    y = 124
    xs = timeline(f, y, 130, 420, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    for j in range(1, 6):
        cash_arrow(f, xs[j], y, 42, colour=BLUE, label="P", up=True)
    cash_arrow(f, xs[6], y, 18, colour=GREEN, label="drop", up=True)
    f.line(xs[1] - 12, y - 42, xs[6] + 12, y - 42, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.2")
    f.text(444, y - 46, "level P", cls="sm dim", anchor="start")

    f.line(28, 190, 532, 190, cls="rule")
    f.text(150, 212, "Drop = B_n (1 + i)", cls="sm bold")
    f.text(150, 232, "the last balance, accumulated one period", cls="sm dim")
    f.text(150, 252, "occurs on the regular payment date", cls="sm dim")
    f.text(412, 212, "Why it happens", cls="sm bold")
    f.text(412, 232, "P was rounded up, so the loan clears early", cls="sm dim")
    f.text(412, 252, "contrast with a balloon, which is larger", cls="sm dim")
    f.note(W / 2, 278, "Find the balance first — the drop is never P minus something")
    return f


@figure("Balloon Payment", "A final payment larger than the regular one, retiring the "
        "remaining balance", width=540)
def balloon_payment() -> Fig:
    f = Fig(W, 288)
    f.title("A balloon payment retires a balance the regular payments never cleared")

    y = 132
    xs = timeline(f, y, 130, 420, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    for j in range(1, 6):
        cash_arrow(f, xs[j], y, 32, colour=BLUE, label="K", up=True)
    cash_arrow(f, xs[6], y, 78, colour=ROSE, label="B", up=True)
    f.line(xs[1] - 12, y - 32, xs[5] + 12, y - 32, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.2")
    f.text(444, y - 36, "level K", cls="sm dim", anchor="start")

    f.line(28, 194, 532, 194, cls="rule")
    f.text(150, 216, "B = OB₍ₙ₋₁₎ (1 + i)", cls="sm bold")
    f.text(150, 236, "equivalently  B = L(1+i)ⁿ − K·s₍ₙ₋₁₎(1+i)", cls="sm dim")
    f.text(412, 216, "Why it happens", cls="sm bold")
    f.text(412, 236, "K is set below the full amortising payment", cls="sm dim")
    f.text(412, 256, "so principal is still outstanding at the end", cls="sm dim")
    f.note(W / 2, 278, "Mortgages with a short fixed term and a long amortisation do this")
    return f


@figure("Loan Repayment Comparison", "Level payments against constant-principal "
        "repayment on the same loan", width=540)
def loan_repayment_comparison() -> Fig:
    f = Fig(W, 306)
    f.title("Same loan, two repayment shapes")

    rows, P = _schedule()
    n, L, i = LOAN_N, LOAN_L, LOAN_I
    for k, (head, colour) in enumerate((("Level payment", BLUE),
                                        ("Constant principal", GREEN))):
        a = axes(f, 0.4, n + 0.6, 0, 2400, left=54 + k * 256, right=306 - k * 256 + 22,
                 top=88, bottom=134)
        bw = (a.px(1) - a.px(0)) * 0.66
        for t in range(1, n + 1):
            if k == 0:
                pr = rows[t - 1][2]
                inte = rows[t - 1][1]
            else:
                pr = L / n
                inte = i * L * (n - t + 1) / n
            x = a.px(t) - bw / 2
            f.rect(x, a.py(pr), bw, a.y1 - a.py(pr), rx=2, fill=colour,
                   fill_opacity="0.7")
            f.rect(x, a.py(pr + inte), bw, a.py(pr) - a.py(pr + inte), rx=2, fill=AMBER,
                   fill_opacity="0.7")
        a.frame(xticks=[1, 4, 8], yticks=[0, 1000, 2000], yfmt=lambda t: f"{t:,.0f}")
        f.text((a.x0 + a.x1) / 2, 78, head, cls="sm bold", fill=colour)
        total = (n * P - L) if k == 0 else (i * L * (n + 1) / 2)
        f.text((a.x0 + a.x1) / 2, a.y1 + 32, "payment is level" if k == 0
               else "payment falls each period", cls="sm dim")
        f.text((a.x0 + a.x1) / 2, a.y1 + 50, f"total interest {total:,.0f}",
               cls="sm bold")

    f.legend_row(158, 250, [(AMBER, "interest"), (BLUE, "principal (level)"),
                            (GREEN, "principal (constant)")], gap=124)
    f.line(28, 268, 532, 268, cls="rule")
    f.text(150, 288, "P_level = L / a₍ₙ₎", cls="sm bold")
    f.text(412, 288, "Constant-principal interest = i·L·(n+1)/2", cls="sm bold")
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


def _bond_timeline(f, y, n=6, x0=104, x1=424, coupon_h=28, redemption_h=62,
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
        width=540)
def bonds() -> Fig:
    f = Fig(W, 300)
    f.title("A bond is a coupon annuity plus a single redemption")

    y = 122
    xs = _bond_timeline(f, y, 6)
    cash_arrow(f, xs[0], y, 48, colour=AMBER, label="P", up=False)
    f.text(444, y - 30, "coupons Fr", cls="sm", fill=BLUE, anchor="start")
    f.text(444, y - 62, "redemption C", cls="sm", fill=GREEN, anchor="start")

    f.line(28, 198, 532, 198, cls="rule")
    f.text(W / 2, 220, "P = Fr · a₍ₙ₎ⱼ  +  C · vⁿ", cls="sm bold")
    terms = [
        ("F  face value", "sets the coupon", GREEN),
        ("r  coupon rate", "fixed at issue", BLUE),
        ("j  yield rate", "set by the market", AMBER),
        ("n  term", "number of coupons", VIOLET),
    ]
    for k, (lab, sub, colour) in enumerate(terms):
        x = 36 + k * 128
        f.line(x, 244, x, 274, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(x + 9, 255, lab, cls="sm bold", anchor="start")
        f.text(x + 9, 270, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 292, "Fr > Cj → premium · Fr = Cj → par · Fr < Cj → discount")
    return f


@figure("Bond Price", "Bond price against yield, showing premium, par and discount",
        width=540)
def bond_price() -> Fig:
    f = Fig(W, 292)
    f.title("Price falls as yield rises — the two move in opposite directions")

    a = axes(f, 0.01, 0.10, 700, 1400, left=72, right=234, top=68, bottom=88)
    a.curve(lambda j: _bond_price(j), colour=BLUE, xa=0.012, xb=0.10)
    a.hline(BOND_C, colour="var(--dim)")
    a.vline(BOND_R, y_top=_bond_price(BOND_R), colour=GREEN)
    a.point(BOND_R, BOND_C, colour=GREEN)
    a.label(BOND_R, BOND_C, "par:  j = r", cls="sm bold", dy=-10, dx=26)
    a.area(lambda j: _bond_price(j), 0.012, BOND_R, colour=AMBER, opacity="0.12",
           base=BOND_C)
    a.label(0.026, 1240, "premium", cls="sm bold", anchor="middle")
    a.label(0.078, 820, "discount", cls="sm bold", anchor="middle")
    a.frame(xlabel="yield j per period", ylabel="price",
            xticks=[0.02, 0.05, 0.08], xfmt=lambda t: f"{t * 100:.0f}%",
            yticks=[800, 1000, 1200], yfmt=lambda t: f"{t:,.0f}")

    f.text(430, 100, "P = Fr·a₍ₙ₎ⱼ + C·vⁿ", cls="sm bold")
    f.text(430, 120, "F = C = 1,000, r = 5%, n = 10", cls="sm dim")
    f.box(340, 138, 190, 58, colour=VIOLET)
    f.text(434, 158, "Premium/discount form", cls="sm bold")
    f.text(434, 176, "P = C + (Fr − Cj) a₍ₙ₎", cls="sm dim")
    f.box(340, 204, 190, 58, colour=AMBER)
    f.text(434, 224, "The sign of (Fr − Cj)", cls="sm bold")
    f.text(434, 242, "decides premium or discount", cls="sm dim")
    f.note(W / 2, 282, "Price is just the PV of the bond's own cash flows at the yield")
    return f


@figure("Book Value", "Book value converging to the redemption value for a premium and a "
        "discount bond", width=540)
def book_value() -> Fig:
    f = Fig(W, 296)
    f.title("Book value walks the price to the redemption value")

    a = axes(f, 0, BOND_N, 800, 1250, left=72, right=234, top=68, bottom=88)
    prem = _book_values(0.03)
    disc = _book_values(0.07)
    a.polyline(list(enumerate(prem)), colour=AMBER)
    a.polyline(list(enumerate(disc)), colour=BLUE)
    a.hline(BOND_C, colour="var(--dim)")
    for series, colour in ((prem, AMBER), (disc, BLUE)):
        for k, b in enumerate(series):
            a.point(k, b, colour=colour, r=2.6)
    a.label(2.4, 1195, "premium bond", cls="sm bold", anchor="start")
    a.label(2.4, 872, "discount bond", cls="sm bold", anchor="start")
    a.label(BOND_N, BOND_C, "C", cls="sm bold", dy=-8, dx=-8)
    a.frame(xlabel="coupons paid", ylabel="book value", xticks=[0, 5, 10],
            yticks=[900, 1000, 1100, 1200], yfmt=lambda t: f"{t:,.0f}")

    f.text(430, 100, "BV₀ = P   and   BVₙ = C", cls="sm bold")
    f.box(340, 118, 190, 62, colour=GREEN)
    f.text(435, 140, "Prospective", cls="sm bold")
    f.text(435, 160, "BV_k = Fr·a₍ₙ₋ₖ₎ + C·v^(n−k)", cls="sm dim")
    f.box(340, 188, 190, 62, colour=AMBER)
    f.text(435, 210, "Retrospective", cls="sm bold")
    f.text(435, 230, "BV_k = P(1+j)ᵏ − Fr·s₍ₖ₎", cls="sm dim")
    f.note(W / 2, 284, "Always at the original yield j — book value is not market value")
    return f


@figure("Market Value", "Market value moving with the prevailing yield while book value "
        "follows its own schedule", width=540)
def market_value() -> Fig:
    f = Fig(W, 296)
    f.title("Market value follows today's yield; book value follows the original one")

    a = axes(f, 0, BOND_N, 850, 1200, left=72, right=234, top=68, bottom=88)
    book = _book_values(0.05)
    a.polyline(list(enumerate(book)), colour=VIOLET, width=2)
    market_yields = [0.05, 0.045, 0.038, 0.042, 0.055, 0.065, 0.058, 0.05, 0.046,
                     0.05, 0.05]
    market = [BOND_F * BOND_R * _ann_imm(BOND_N - k, market_yields[k]) +
              BOND_C * (1 + market_yields[k]) ** -(BOND_N - k) if k < BOND_N else BOND_C
              for k in range(BOND_N + 1)]
    a.polyline(list(enumerate(market)), colour=BLUE)
    a.frame(xlabel="coupons paid", ylabel="value", xticks=[0, 5, 10],
            yticks=[900, 1000, 1100], yfmt=lambda t: f"{t:,.0f}")
    f.legend_row(a.x0 + 2, a.y1 + 56, [(VIOLET, "book value"), (BLUE, "market value")],
                 gap=118)

    f.text(430, 100, "MV = Fr·a₍ₙ₎ + C·vⁿ", cls="sm bold")
    f.text(430, 120, "at the prevailing market yield", cls="sm dim")
    rows = [
        ("Market yield > r", "trades below face — a discount", BLUE),
        ("Market yield < r", "trades above face — a premium", AMBER),
        ("Three different things", "market, book and face value", VIOLET),
    ]
    for k, (lab, sub, colour) in enumerate(rows):
        yy = 142 + k * 46
        f.line(340, yy, 340, yy + 32, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(350, yy + 12, lab, cls="sm bold", anchor="start")
        f.text(350, yy + 28, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 284, "Both converge on C at maturity, whatever happens in between")
    return f


@figure("Amortization of Premium", "A premium bond's book value written down to the "
        "redemption value", width=540)
def amortization_of_premium() -> Fig:
    f = Fig(W, 296)
    f.title("The premium is written off, coupon by coupon")

    j = 0.03
    book = _book_values(j)
    a = axes(f, 0, BOND_N, 950, 1250, left=76, right=234, top=68, bottom=88)
    a.area(lambda t: book[min(int(t), BOND_N)] +
           (book[min(int(t) + 1, BOND_N)] - book[min(int(t), BOND_N)]) * (t - int(t)),
           0, BOND_N, colour=AMBER, opacity="0.16", base=BOND_C)
    a.polyline(list(enumerate(book)), colour=AMBER)
    for k, b in enumerate(book):
        a.point(k, b, colour=AMBER, r=2.8)
    a.hline(BOND_C, colour="var(--dim)", label="C", anchor="start")
    a.label(3.0, 1195, "premium P − C", cls="sm bold", anchor="start")
    a.frame(xlabel="coupons paid", ylabel="book value", xticks=[0, 5, 10],
            yticks=[1000, 1100, 1200], yfmt=lambda t: f"{t:,.0f}")

    f.text(428, 100, "Fr > Cj  →  the coupon overpays", cls="sm bold")
    f.box(340, 120, 190, 66, colour=AMBER)
    f.text(435, 142, "Written off in period t", cls="sm bold")
    f.text(435, 162, "(Fr − Cj) · v^(n−t+1)", cls="sm dim")
    f.text(435, 180, "growing every period", cls="sm dim")
    f.box(340, 194, 190, 66, colour=VIOLET)
    f.text(435, 216, "Interest earned", cls="sm bold")
    f.text(435, 236, "j · BV₍ₜ₋₁₎, less than the coupon", cls="sm dim")
    f.text(435, 254, "the excess reduces book value", cls="sm dim")
    f.note(W / 2, 284, "The mirror of accumulation of discount — same schedule, other sign")
    return f


@figure("Accumulation of Discount", "A discount bond's book value written up to the "
        "redemption value", width=540)
def accumulation_of_discount() -> Fig:
    f = Fig(W, 296)
    f.title("The discount is written up, coupon by coupon")

    j = 0.07
    book = _book_values(j)
    a = axes(f, 0, BOND_N, 830, 1060, left=76, right=234, top=68, bottom=88)
    a.area(lambda t: book[min(int(t), BOND_N)] +
           (book[min(int(t) + 1, BOND_N)] - book[min(int(t), BOND_N)]) * (t - int(t)),
           0, BOND_N, colour=BLUE, opacity="0.16", base=BOND_C)
    a.polyline(list(enumerate(book)), colour=BLUE)
    for k, b in enumerate(book):
        a.point(k, b, colour=BLUE, r=2.8)
    a.hline(BOND_C, colour="var(--dim)", label="C", anchor="start")
    a.label(3.2, 895, "discount C − P", cls="sm bold", anchor="start")
    a.frame(xlabel="coupons paid", ylabel="book value", xticks=[0, 5, 10],
            yticks=[850, 950, 1050], yfmt=lambda t: f"{t:,.0f}")

    f.text(428, 100, "Fr < Cj  →  the coupon underpays", cls="sm bold")
    f.box(340, 120, 190, 66, colour=BLUE)
    f.text(435, 142, "Written up in period t", cls="sm bold")
    f.text(435, 162, "(Cj − Fr) · v^(n−t+1)", cls="sm dim")
    f.text(435, 180, "growing every period", cls="sm dim")
    f.box(340, 194, 190, 66, colour=GREEN)
    f.text(435, 216, "The shortfall is made up", cls="sm bold")
    f.text(435, 236, "by the capital gain at redemption", cls="sm dim")
    f.text(435, 254, "so the investor still earns j", cls="sm dim")
    f.note(W / 2, 284, "The mirror of amortization of premium — same schedule, other sign")
    return f


@figure("Face Value", "Face value as the base for coupons and, usually, the redemption",
        width=540)
def face_value() -> Fig:
    f = Fig(W, 288)
    f.title("Face value sets the coupon — it is not the price")

    f.box(56, 84, 172, 76, colour=GREEN)
    f.text(142, 112, "F = 1,000", cls="ttl")
    f.text(142, 136, "face (par) value", cls="sm dim")
    f.arrow(236, 108, 292, 108, colour=BLUE, width=1.6)
    f.text(264, 98, "× r", cls="sm", fill=BLUE)
    f.box(300, 84, 172, 76, colour=BLUE)
    f.text(386, 112, "coupon = 50", cls="ttl")
    f.text(386, 136, "F × r each period", cls="sm dim")
    f.arrow(142, 172, 142, 200, colour=GREEN, width=1.6)
    f.text(152, 190, "usually C = F at maturity", cls="sm dim", anchor="start")

    f.line(28, 216, 532, 216, cls="rule")
    cols = [
        ("Face value F", "on the certificate", GREEN),
        ("Redemption C", "what is repaid", VIOLET),
        ("Price P", "what the buyer pays", AMBER),
    ]
    for k, (lab, sub, colour) in enumerate(cols):
        x = 40 + k * 172
        f.line(x, 234, x, 264, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(x + 10, 245, lab, cls="sm bold", anchor="start")
        f.text(x + 10, 260, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 282, "All three are equal only when the bond sells at par")
    return f


@figure("Redemption Value", "The redemption payment at maturity, at, above or below par",
        width=540)
def redemption_value() -> Fig:
    f = Fig(W, 288)
    f.title("C is what the bondholder is repaid at maturity")

    y = 124
    xs = _bond_timeline(f, y, 6, x0=120, x1=420)
    f.text(444, y - 60, "C at time n", cls="sm bold", fill=GREEN, anchor="start")

    f.line(28, 190, 532, 190, cls="rule")
    cols = [
        ("C = F", "at par — the usual case", GREEN),
        ("C > F", "redeemed above par", AMBER),
        ("C < F", "redeemed below par", ROSE),
    ]
    for k, (lab, sub, colour) in enumerate(cols):
        x = 40 + k * 172
        f.line(x, 208, x, 238, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(x + 10, 219, lab, cls="sm bold", anchor="start")
        f.text(x + 10, 234, sub, cls="sm dim", anchor="start")
    f.text(W / 2, 262, "P = Fr · a₍ₙ₎ⱼ + C · vⁿ  — the coupon uses F, the terminal "
           "payment uses C", cls="sm dim")
    f.text(W / 2, 280, "For a callable bond, C changes with the assumed call date",
           cls="sm dim")
    return f


@figure("Coupon", "The level coupon stream a bond pays until maturity", width=540)
def coupon() -> Fig:
    f = Fig(W, 286)
    f.title("The coupon is the bond's income stream")

    y = 126
    xs = timeline(f, y, 104, 424, 8, labels=["0", "1", "2", "3", "4", "5", "6", "7", "8"])
    for k in range(1, 9):
        cash_arrow(f, xs[k], y, 34, colour=BLUE, label="Fr" if k in (1, 8) else None,
                   up=True)
    f.text(444, y - 34, "n coupons", cls="sm dim", anchor="start")
    brace(f, xs[1], xs[8], y + 30, depth=9, label="coupon annuity: Fr · a₍ₙ₎",
          colour=BLUE)

    f.line(28, 200, 532, 200, cls="rule")
    f.text(150, 222, "Coupon = F × r", cls="sm bold")
    f.text(150, 242, "1,000 × 3% = 30 per half-year", cls="sm dim")
    f.text(150, 262, "for a 6% bond paying semi-annually", cls="sm dim")
    f.text(412, 222, "The other half of the return", cls="sm bold")
    f.text(412, 242, "is the capital gain or loss at redemption", cls="sm dim")
    f.text(412, 262, "coupons are level; the split of the yield is not", cls="sm dim")
    return f


@figure("Coupon Rate", "Coupon rate against yield rate, and the pricing it implies",
        width=540)
def coupon_rate() -> Fig:
    f = Fig(W, 288)
    f.title("Coupon rate is fixed at issue; yield is set by the market")

    cases = [
        ("r > j", "premium", "P > C", AMBER, 1.18),
        ("r = j", "par", "P = C", GREEN, 1.0),
        ("r < j", "discount", "P < C", BLUE, 0.84),
    ]
    base_y, height = 176, 84
    for k, (rel, name, price, colour, ratio) in enumerate(cases):
        cx = 128 + k * 152
        h = height * ratio
        f.rect(cx - 44, base_y - h, 88, h, rx=4, fill=colour, fill_opacity="0.35",
               stroke=colour, stroke_width="1.3")
        f.line(cx - 56, base_y - height, cx + 56, base_y - height, cls="thin dash",
               stroke="var(--dim)", stroke_width="1.2")
        f.text(cx, base_y - h / 2 + 4, price, cls="sm bold")
        f.text(cx, base_y + 18, rel, cls="sm bold")
        f.text(cx, base_y + 34, name, cls="sm dim")
    f.text(60, 176 - height + 4, "C", cls="sm dim", anchor="end")

    f.line(28, 230, 532, 230, cls="rule")
    f.text(150, 252, "r = coupon / F", cls="sm bold")
    f.text(150, 272, "stated per coupon period, fixed for life", cls="sm dim")
    f.text(412, 252, "The comparison that matters is Fr vs Cj", cls="sm bold")
    f.text(412, 272, "not r vs j, unless C = F", cls="sm dim")
    return f


@figure("Yield Rate", "The yield rate as the discount rate that reproduces the market "
        "price", width=540)
def yield_rate() -> Fig:
    f = Fig(W, 292)
    f.title("The yield is the rate that makes the price come out right")

    a = axes(f, 0.01, 0.10, 700, 1400, left=76, right=234, top=68, bottom=88)
    a.curve(lambda j: _bond_price(j), colour=BLUE, xa=0.012, xb=0.10)
    target = 920.0
    jstar = 0.062
    a.hline(target, colour=AMBER, x_to=jstar)
    a.vline(jstar, y_top=target, colour=AMBER)
    a.point(jstar, target, colour=AMBER)
    a.label(jstar, target, "solve for j", cls="sm bold", dy=-12, dx=34)
    a.frame(xlabel="yield j", ylabel="price", xticks=[0.02, 0.05, 0.08],
            xfmt=lambda t: f"{t * 100:.0f}%", yticks=[800, 1000, 1200],
            yfmt=lambda t: f"{t:,.0f}")
    f.text(a.x0 + 12, a.py(target) - 10, "market price", cls="sm dim", anchor="start")

    f.text(428, 100, "P = Fr·a₍ₙ₎ⱼ + C·vⁿ", cls="sm bold")
    f.text(428, 120, "the j that solves this is the yield", cls="sm dim")
    rows = [
        ("An internal rate of return", "no closed form — solve numerically", BLUE),
        ("Price and yield move apart", "yield up, price down", ROSE),
        ("r is fixed, j is not", "j reflects today's price", AMBER),
    ]
    for k, (lab, sub, colour) in enumerate(rows):
        yy = 142 + k * 46
        f.line(340, yy, 340, yy + 32, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(350, yy + 12, lab, cls="sm bold", anchor="start")
        f.text(350, yy + 28, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 284, "Yield to maturity assumes the bond is held to maturity")
    return f


@figure("Term of Bond", "How the bond's term drives its price sensitivity", width=540)
def term_of_bond() -> Fig:
    f = Fig(W, 292)
    f.title("A longer term means more coupons — and more price risk")

    a = axes(f, 0, 30, 700, 1350, left=76, right=234, top=68, bottom=88)
    for j, colour, lab in ((0.03, AMBER, "j = 3%"), (0.05, "var(--dim)", "j = 5%"),
                           (0.07, BLUE, "j = 7%")):
        a.curve(lambda n, jj=j: _bond_price(jj, n=max(n, 0.5)), colour=colour, xa=1,
                xb=30)
        a.label(30, _bond_price(j, n=30), lab, cls="sm", dx=-24, dy=-8, fill=colour)
    a.frame(xlabel="term n (coupon periods)", ylabel="price", xticks=[0, 10, 20, 30],
            yticks=[800, 1000, 1200], yfmt=lambda t: f"{t:,.0f}")
    f.text((a.x0 + a.x1) / 2, a.y1 + 54, "the fan widens with term — that is price risk",
           cls="sm dim")

    f.text(428, 100, "n = term × coupons per year", cls="sm bold")
    rows = [
        ("Longer n", "price moves more per 1% of yield", ROSE),
        ("Higher duration", "the formal measure of that risk", VIOLET),
        ("Callable bonds", "the effective term is uncertain", AMBER),
    ]
    for k, (lab, sub, colour) in enumerate(rows):
        yy = 128 + k * 48
        f.line(340, yy, 340, yy + 34, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(350, yy + 13, lab, cls="sm bold", anchor="start")
        f.text(350, yy + 29, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 282, "At j = r the price stays at par whatever the term")
    return f


@figure("Callable Bond", "The issuer's call option and the worst-case pricing rule",
        width=540)
def callable_bond() -> Fig:
    f = Fig(W, 300)
    f.title("A callable bond can be redeemed early — price the worst case")

    y = 122
    xs = timeline(f, y, 96, 424, 8,
                  labels=["0", "1", "…", "", "call", "", "…", "", "n"])
    for k in range(1, 9):
        cash_arrow(f, xs[k], y, 26, colour=BLUE, up=True)
    for k, (colour, lab) in ((4, (AMBER, "earliest call")), (8, (GREEN, "maturity"))):
        cash_arrow(f, xs[k], y, 56, colour=colour, up=True)
        f.text(xs[k], y - 66, lab, cls="sm bold", fill=colour)
    f.line(xs[4], y + 26, xs[8], y + 26, cls="thin dash", stroke=VIOLET,
           stroke_width="1.3")
    f.text((xs[4] + xs[8]) / 2, y + 42, "the issuer chooses somewhere in here",
           cls="sm dim")

    f.line(28, 190, 532, 190, cls="rule")
    f.text(W / 2, 212, "Price at the redemption date that is worst for the investor",
           cls="sm bold")
    cases = [
        ("Priced at a premium", "assume the earliest call date", AMBER),
        ("Priced at a discount", "assume the latest date — maturity", BLUE),
    ]
    for k, (lab, sub, colour) in enumerate(cases):
        x = 60 + k * 250
        f.box(x, 232, 226, 48, colour=colour)
        f.text(x + 113, 252, lab, cls="sm bold")
        f.text(x + 113, 270, sub, cls="sm dim")
    f.note(W / 2, 294, "Issuers call when rates fall — that is the investor's "
           "reinvestment risk")
    return f


@figure("Non-Callable Bond", "A bullet bond with certain cash flows to maturity",
        width=540)
def non_callable_bond() -> Fig:
    f = Fig(W, 288)
    f.title("A non-callable bond has no uncertainty about when it ends")

    y = 124
    xs = _bond_timeline(f, y, 8, x0=104, x1=424, coupon_h=28, redemption_h=58)
    f.text(444, y - 58, "certain", cls="sm bold", fill=GREEN, anchor="start")

    f.line(28, 194, 532, 194, cls="rule")
    f.text(150, 216, "P = Fr · a₍ₙ₎ⱼ + C · vⁿ", cls="sm bold")
    f.text(150, 236, "one term, one price, no cases", cls="sm dim")
    f.text(150, 256, "also called a bullet bond", cls="sm dim")
    f.text(412, 216, "No call risk", cls="sm bold")
    f.text(412, 236, "the schedule cannot be cut short", cls="sm dim")
    f.text(412, 256, "the baseline case for every bond formula", cls="sm dim")
    f.note(W / 2, 280, "Compare with a callable bond, where n itself is uncertain")
    return f


@figure("Call Price", "The call price replacing the redemption value at a call date",
        width=540)
def call_price() -> Fig:
    f = Fig(W, 292)
    f.title("At a call date, the call price takes the place of C")

    y = 122
    xs = timeline(f, y, 104, 420, 8, labels=["0", "", "", "n_c", "", "", "", "", "n"])
    for k in range(1, 9):
        cash_arrow(f, xs[k], y, 24, colour=BLUE, up=True)
    cash_arrow(f, xs[3], y, 60, colour=AMBER, label="C_call", up=True)
    cash_arrow(f, xs[8], y, 60, colour=GREEN, label="C", up=True)
    f.line(xs[3], y - 78, xs[3], y - 10, cls="thin dash", stroke=AMBER,
           stroke_width="1.2")

    f.line(28, 196, 532, 196, cls="rule")
    f.text(150, 218, "P_call = Fr·a₍ₙ_c₎ⱼ + C_call·v^(n_c)", cls="sm bold")
    f.text(150, 240, "the same formula, a shorter term", cls="sm dim")
    f.text(150, 260, "and a different terminal payment", cls="sm dim")
    f.text(412, 218, "Call price ≥ face value", cls="sm bold")
    f.text(412, 240, "the excess is the call premium", cls="sm dim")
    f.text(412, 260, "it compensates for the lost coupons", cls="sm dim")
    f.note(W / 2, 284, "Price every possible call date and take the lowest price")
    return f


@figure("Call Premium", "The call premium shrinking to zero as maturity approaches",
        width=540)
def call_premium() -> Fig:
    f = Fig(W, 292)
    f.title("The call premium narrows as the bond nears maturity")

    a = axes(f, 4, 10, 980, 1075, left=76, right=234, top=68, bottom=88)
    call_prices = {4: 1060, 5: 1050, 6: 1040, 7: 1030, 8: 1020, 9: 1010, 10: 1000}
    a.polyline([(k, v) for k, v in sorted(call_prices.items())], colour=AMBER)
    for k, v in sorted(call_prices.items()):
        a.point(k, v, colour=AMBER, r=3)
    a.hline(BOND_C, colour="var(--dim)")
    a.label(9.4, 1006, "face value", cls="sm dim")
    for k in (4, 7):
        f.line(a.px(k), a.py(call_prices[k]), a.px(k), a.py(BOND_C), cls="thin",
               stroke=ROSE, stroke_width="2")
    a.label(4.5, 1030, "call premium", cls="sm bold", anchor="start")
    a.frame(xlabel="call date (period)", ylabel="call price", xticks=[4, 6, 8, 10],
            yticks=[1000, 1050], yfmt=lambda t: f"{t:,.0f}")

    f.text(428, 100, "Call premium = call price − F", cls="sm bold")
    rows = [
        ("Compensation", "for the coupons the investor loses", AMBER),
        ("Declines with time", "reaching zero at maturity", VIOLET),
        ("A cost to the issuer", "the price of holding the option", ROSE),
    ]
    for k, (lab, sub, colour) in enumerate(rows):
        yy = 126 + k * 48
        f.line(340, yy, 340, yy + 34, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(350, yy + 13, lab, cls="sm bold", anchor="start")
        f.text(350, yy + 29, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 282, "A call schedule is a table of call dates and their call prices")
    return f


@figure("Reinvestment of Coupons", "Realised return depending on the rate coupons are "
        "reinvested at", width=540)
def reinvestment_of_coupons() -> Fig:
    f = Fig(W, 296)
    f.title("The promised yield assumes coupons are reinvested at that yield")

    j = 0.05
    coupon_amt = BOND_F * BOND_R
    a = axes(f, 0.01, 0.09, 1480, 1800, left=80, right=234, top=68, bottom=88)
    a.curve(lambda ri: coupon_amt * _acc(BOND_N, max(ri, 1e-4)) + BOND_C,
            colour=BLUE, xa=0.012, xb=0.09)
    target = coupon_amt * _acc(BOND_N, j) + BOND_C
    a.hline(target, colour="var(--dim)")
    a.vline(j, y_top=target, colour=GREEN)
    a.point(j, target, colour=GREEN)
    a.label(j, target, "r_i = j", cls="sm bold", dy=-10, dx=26)
    a.label(0.021, 1560, "short of the yield", cls="sm", anchor="start")
    a.label(0.076, 1745, "ahead of it", cls="sm", anchor="middle")
    a.frame(xlabel="reinvestment rate r_i", ylabel="accumulated value",
            xticks=[0.02, 0.05, 0.08], xfmt=lambda t: f"{t * 100:.0f}%",
            yticks=[1500, 1600, 1700], yfmt=lambda t: f"{t:,.0f}")

    f.text(428, 100, "AV = Fr · s₍ₙ₎ at r_i  +  C", cls="sm bold")
    rows = [
        ("r_i = j", "AV = P(1+j)ⁿ — exactly the yield", GREEN),
        ("r_i < j", "the realised return falls short", ROSE),
        ("r_i > j", "the investor beats the promised yield", BLUE),
    ]
    for k, (lab, sub, colour) in enumerate(rows):
        yy = 126 + k * 48
        f.line(340, yy, 340, yy + 34, cls="", stroke=colour, stroke_width="2.6",
               stroke_linecap="round")
        f.text(350, yy + 13, lab, cls="sm bold", anchor="start")
        f.text(350, yy + 29, sub, cls="sm dim", anchor="start")
    f.note(W / 2, 284, "This gap is reinvestment risk — the reason duration matters")
    return f
