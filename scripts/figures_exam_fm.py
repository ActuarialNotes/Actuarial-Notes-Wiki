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
    building, car, coins, cross, document, house, person, scales, shield, tower,
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

@figure("Present Value", "A payment of 1,000 at time 5 carried back to time 0, its value "
        "shrinking along a dotted discount curve to 747.26", width=WID)
def present_value() -> Fig:
    f = vcard()

    y, n, v, h = 344, 5, 1 / 1.06, 196          # h: the 1,000's height
    xs = timeline(f, y, TL0, TL1, n, labels=["0", "1", "2", "3", "4", "5"])
    # the payment's value at every earlier date, shrinking by v a period
    f.poly([(xs[0] + (xs[n] - xs[0]) * t / 50, y - h * v ** (n - n * t / 50))
            for t in range(51)], cls="thin dot", stroke=AMBER, stroke_width="1.6")
    cash_arrow(f, xs[n], y, h, colour=BLUE, label="1,000", up=True, width=2.2)
    cash_arrow(f, xs[0], y, h * v ** n, colour=AMBER, label="747.26", up=True, width=2.2)
    f.arrow(xs[n] - 10, y - h - 30, xs[0] + 10, y - h - 30, colour=AMBER, width=1.8)
    f.text((xs[0] + xs[n]) / 2, y - h - 38, "× v⁵", cls="bold", fill=AMBER)
    f.text(xs[0], y + 34, "PV", cls="sm bold")
    f.text(xs[n], y + 34, "FV", cls="sm bold")
    return f


@figure("Future Value", "Payments of 100 at times 0, 1 and 2 piled up at time 4, each "
        "block topped by the interest it earned — largest for the payment made first",
        width=WID)
def future_value() -> Fig:
    f = vcard()

    y, i, u, bw = 344, 0.10, 54, 30               # u: the height of one 100
    xs = timeline(f, y, TL0, TL1, 4, labels=["0", "1", "2", "3", "4"])
    top = y
    for k, colour in enumerate((BLUE, VIOLET, TEAL)):
        f.rect(xs[k] - bw / 2, y - u, bw, u, rx=2, fill=colour, fill_opacity="0.75")
        f.text(xs[k], y - u - 8, "100", cls="sm")
        # at time 4: the same 100, with the interest it earned piled on top
        grown = u * (1 + i) ** (4 - k)
        f.rect(xs[4] - bw / 2, top - u, bw, u, rx=2, fill=colour, fill_opacity="0.75")
        f.rect(xs[4] - bw / 2, top - grown, bw, grown - u, rx=2, fill=colour,
               fill_opacity="0.3", stroke=colour, stroke_width="1.2")
        top -= grown
    f.arrow(xs[2] + bw / 2 + 8, y - u / 2, xs[4] - bw / 2 - 10, y - u / 2, colour=GREEN,
            width=1.6)
    f.text(xs[4], top - 8, "FV₄", cls="bold")
    return f


@figure("Accumulated Value", "A single sum growing forward under the accumulation "
        "function", width=WID)
def accumulated_value() -> Fig:
    f = vcard()

    a = vaxes(f, 0, 6, 0, 1.55, top=30)
    a.curve(lambda t: 1.07 ** t, colour=BLUE)
    a.area(lambda t: 1.07 ** t, 0, 6, colour=BLUE, opacity="0.12")
    a.frame(xlabel="time t", ylabel="value of 1", xticks=[0, 2, 4, 6],
            yticks=[1.0, 1.5], yfmt=lambda t: f"{t:g}")
    a.point(0, 1, colour=AMBER, label="PV", dy=-12, dx=16)
    a.point(4.6, 1.07 ** 4.6, colour=GREEN, label="AV", dy=-12)
    a.vline(4.6, y_top=1.07 ** 4.6, colour=GREEN)
    return f


@figure("Current Value", "Payments at times 0, 1, 5 and 6 moved to a reference date at "
        "time 3 and piled up there: the earlier ones grown, the later ones discounted",
        width=WID)
def current_value() -> Fig:
    f = vcard()

    y, i, u, bw = 344, 0.10, 50, 24              # u: the height of one payment
    xs = timeline(f, y, TL0, TL1, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    ref, top = 3, y
    for k, amt, colour, fo in ((0, "C₀", BLUE, "0.8"), (1, "C₁", BLUE, "0.45"),
                               (5, "C₅", AMBER, "0.8"), (6, "C₆", AMBER, "0.45")):
        f.rect(xs[k] - bw / 2, y - u, bw, u, rx=2, fill=colour, fill_opacity=fo)
        f.text(xs[k], y - u - 8, amt, cls="sm")
        moved = u * (1 + i) ** (ref - k)
        f.rect(xs[ref] - bw / 2, top - moved, bw, moved, rx=2, fill=colour, fill_opacity=fo)
        top -= moved
    f.line(xs[ref], top - 6, xs[ref], BY0 + 18, cls="thin dash", stroke=VIOLET,
           stroke_width="1.4")
    f.text(xs[ref], BY0 + 8, "reference date", cls="sm bold", fill=VIOLET)
    ya = y - u - 34
    f.arrow(xs[1] + 8, ya, xs[ref] - bw / 2 - 8, ya, colour=BLUE, width=1.6)
    f.text((xs[1] + xs[ref]) / 2 - 4, ya - 8, "grow", cls="sm", fill=BLUE)
    f.arrow(xs[5] - 8, ya, xs[ref] + bw / 2 + 8, ya, colour=AMBER, width=1.6)
    f.text((xs[5] + xs[ref]) / 2 + 4, ya - 8, "discount", cls="sm", fill=AMBER)
    return f


@figure("Interest Rate", "A short stack of coins at time 0 and a taller one at time n, "
        "with arrows exchanging one for the other: forward at × (1+i)ⁿ, back at × vⁿ",
        width=WID)
def interest_rate() -> Fig:
    f = vcard()

    y = 344
    xs = timeline(f, y, 88, 272, 1, labels=["0", "n"])
    coins(f, xs[0], y - 6, n=20, r=26, colour=AMBER)
    coins(f, xs[1], y - 6, n=34, r=26, colour=GREEN)
    f.text(xs[0], y - 146, "PV", cls="bold")
    f.text(xs[1], y - 230, "FV", cls="bold")
    f.arrow(xs[0] + 36, 236, xs[1] - 36, 236, colour=GREEN, width=1.8)
    f.text(BCX, 226, "× (1+i)ⁿ", cls="bold", fill=GREEN)
    f.arrow(xs[1] - 36, 280, xs[0] + 36, 280, colour=AMBER, width=1.8)
    f.text(BCX, 300, "× vⁿ", cls="bold", fill=AMBER)
    return f


@figure("Simple Interest", "Simple interest growing in a straight line beneath the "
        "compound-interest curve, the shaded wedge between them the interest on interest it "
        "never earns", width=WID)
def simple_interest() -> Fig:
    f = vcard()

    i = 0.10
    a = vaxes(f, 0, 10, 0.9, 2.7, top=30)
    # the wedge between the two is the interest simple interest never earns
    wedge = [a.p(t / 4, (1 + i) ** (t / 4)) for t in range(41)]
    wedge += [a.p(t / 4, 1 + i * t / 4) for t in range(40, -1, -1)]
    f.polygon(wedge, fill=AMBER, fill_opacity="0.22", stroke="none")
    a.curve(lambda t: (1 + i) ** t, colour=AMBER)
    a.curve(lambda t: 1 + i * t, colour=BLUE)
    a.frame(xlabel="years", ylabel="a(t)", xticks=[0, 5, 10], yticks=[1, 2],
            yfmt=lambda t: f"{t:g}")
    a.label(9.6, 2.62, "compound", cls="sm bold", anchor="end", fill=AMBER)
    a.label(9.6, 1.85, "simple", cls="sm bold", anchor="end", fill=BLUE)
    return f


@figure("Compound Interest", "Compound growth split into principal, simple interest and "
        "interest on interest", width=WID)
def compound_interest() -> Fig:
    f = vcard()

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


@figure("Accumulation Function", "The accumulation function under simple interest, "
        "compound interest and the equivalent constant force, all starting from 1 at time 0",
        width=WID)
def accumulation_function() -> Fig:
    f = vcard()

    a = vaxes(f, 0, 8, 0.9, 2.3, top=30)
    a.curve(lambda t: 1 + 0.10 * t, colour=BLUE)
    a.curve(lambda t: 1.10 ** t, colour=AMBER)
    a.curve(lambda t: math.exp(0.0953 * t), colour=GREEN, dash=True)
    a.frame(xlabel="time t", ylabel="a(t)", xticks=[0, 4, 8], yticks=[1, 2],
            yfmt=lambda t: f"{t:g}")
    a.point(0, 1, colour="var(--dim)")
    a.label(7.7, 2.20, "compound", cls="sm bold", anchor="end", fill=AMBER)
    a.label(7.7, 1.94, "force δ", cls="sm bold", anchor="end", fill=GREEN)
    a.label(7.7, 1.72, "simple", cls="sm bold", anchor="end", fill=BLUE)
    return f


@figure("Fund Accumulation", "A fund balance stepping up with deposits and interest",
        width=WID)
def fund_accumulation() -> Fig:
    f = vcard()

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


@figure("Net Present Value", "Project cash flows drawn as dashed outlines with their "
        "discounted values filled inside, summed into a small positive NPV bar at the end",
        width=WID)
def net_present_value() -> Fig:
    f = vcard()

    i = 0.10
    flows = [-1000, 300, 400, 400, 300]
    a = vaxes(f, -0.6, 5.8, -1100, 500, left=54, top=30)
    bw, y0, npv = 24, a.py(0), 0.0
    for t, c in enumerate(flows):
        pv = c * (1 + i) ** -t
        npv += pv
        x = a.px(t)
        colour = GREEN if c > 0 else ROSE
        # the flow as paid (outline) and what it is worth today (fill)
        f.rect(x - bw / 2, min(a.py(c), y0), bw, abs(a.py(c) - y0), rx=2, fill="none",
               stroke=colour, stroke_width="1.2", stroke_dasharray="3 2")
        f.rect(x - bw / 2, min(a.py(pv), y0), bw, abs(a.py(pv) - y0), rx=2,
               fill=colour, fill_opacity="0.7")
    xn = a.px(5.2)
    f.rect(xn - bw / 2, a.py(npv), bw, y0 - a.py(npv), rx=2, fill=VIOLET,
           fill_opacity="0.85")
    f.text(xn, a.py(npv) - 8, f"{npv:,.0f}", cls="sm bold")
    a.frame(ylabel="cash flow", xticks=[], yticks=[-1000, 0, 500],
            yfmt=lambda t: f"{t:,.0f}")
    for t in range(5):
        f.text(a.px(t), a.y1 + 16, str(t), cls="sm dim")
    f.text(xn, a.y1 + 16, "NPV", cls="sm bold")
    return f


@figure("Discount Factor", "A payment of 1 at time 4 valued at each earlier date, every "
        "step back one period multiplying it by v, down to v⁴ at time 0", width=WID)
def discount_factor() -> Fig:
    f = vcard()

    y, n, v, h, bw = 344, 4, 1 / 1.12, 220, 28    # v exaggerated so each step shows
    xs = timeline(f, y, TL0, TL1, n, labels=["0", "1", "2", "3", "4"])
    tops = [y - h * v ** (n - k) for k in range(n + 1)]
    for k in range(n + 1):
        f.rect(xs[k] - bw / 2, tops[k], bw, y - tops[k], rx=2,
               fill=BLUE if k == n else AMBER,
               fill_opacity="0.75" if k in (0, n) else "0.4")
    for k in range(n):
        f.arrow(xs[k + 1] - bw / 2 - 3, tops[k + 1] - 10, xs[k] + bw / 2 + 3, tops[k] - 10,
                colour=AMBER, width=1.5)
        f.text((xs[k] + xs[k + 1]) / 2, (tops[k] + tops[k + 1]) / 2 - 20, "× v",
               cls="sm bold", fill=AMBER)
    f.text(xs[n], tops[n] - 10, "1", cls="bold")
    f.text(xs[0], tops[0] - 10, "v⁴", cls="bold")
    return f


@figure("Discount Rate", "A loan of 1 due at time 1, with the interest d taken off the top "
        "at time 0 so only 1 − d is advanced", width=WID)
def discount_rate() -> Fig:
    f = vcard()

    y, top, d = 330, 130, 0.25          # d exaggerated so the slice can be seen
    xs = timeline(f, y, 96, 264, 1, labels=["0", "1"])
    h = y - top
    bw = 56
    # time 0: the loan of 1, with d kept by the lender and 1 − d advanced
    f.rect(xs[0] - bw / 2, top + d * h, bw, (1 - d) * h, rx=3, fill=AMBER,
           fill_opacity="0.7")
    f.rect(xs[0] - bw / 2, top, bw, d * h, rx=3, fill=ROSE, fill_opacity="0.25",
           stroke=ROSE, stroke_width="1.3", stroke_dasharray="4 3")
    f.text(xs[0] - bw / 2 - 8, top + d * h / 2 + 4, "d", cls="bold", anchor="end",
           fill=ROSE)
    f.text(xs[0] - bw / 2 - 8, top + d * h + (1 - d) * h / 2 + 4, "1 − d",
           cls="bold", anchor="end", fill=AMBER)
    # time 1: the 1 repaid
    f.rect(xs[1] - bw / 2, top, bw, h, rx=3, fill=BLUE, fill_opacity="0.7")
    f.text(xs[1] + bw / 2 + 8, top + h / 2 + 4, "1", cls="bold", anchor="start",
           fill=BLUE)
    f.line(xs[0] + bw / 2, top, xs[1] - bw / 2, top, cls="thin dash",
           stroke="var(--dim)", stroke_width="1.2")
    return f


@figure("Effective Discount Rate", "The 1 − d invested at time 0 grows to 1 at time 1, and "
        "the interest earned is the top slice d of that end value", width=WID)
def effective_discount_rate() -> Fig:
    f = vcard()

    y, top, d, bw = 330, 110, 0.25, 56           # d exaggerated so the slice can be seen
    xs = timeline(f, y, 96, 264, 1, labels=["0", "1"])
    h = y - top
    f.rect(xs[0] - bw / 2, top + d * h, bw, (1 - d) * h, rx=3, fill=AMBER,
           fill_opacity="0.7")
    f.text(xs[0] - bw / 2 - 8, top + d * h + (1 - d) * h / 2 + 4, "1 − d", cls="bold",
           anchor="end", fill=AMBER)
    # time 1: the same 1 − d returned, with the interest d on top of it
    f.rect(xs[1] - bw / 2, top + d * h, bw, (1 - d) * h, rx=3, fill=AMBER,
           fill_opacity="0.7")
    f.rect(xs[1] - bw / 2, top, bw, d * h, rx=3, fill=GREEN, fill_opacity="0.6",
           stroke=GREEN, stroke_width="1.3")
    f.text(xs[1] + bw / 2 + 8, top + d * h / 2 + 4, "d", cls="bold", anchor="start",
           fill=GREEN)
    f.line(xs[0] + bw / 2, top + d * h, xs[1] - bw / 2, top + d * h, cls="thin dash",
           stroke="var(--dim)", stroke_width="1.2")
    f.text(xs[1], top - 10, "1", cls="bold")
    return f


@figure("Convertible m-thly", "One unit grown for a year at a quoted 12% credited once, "
        "quarterly and continuously — the more often it is credited, the higher it ends",
        width=WID)
def convertible_m_thly() -> Fig:
    f = vcard()

    nom = 0.12
    a = vaxes(f, 0, 1, 1, 1.135, left=46, bottom=40)
    for m, colour in ((1, BLUE), (4, AMBER)):
        pts = [(0, 1.0)]
        for k in range(1, m + 1):
            pts += [(k / m, (1 + nom / m) ** (k - 1)), (k / m, (1 + nom / m) ** k)]
        a.polyline(pts, colour=colour)
    a.curve(lambda t: math.exp(nom * t), colour=GREEN, dash=True)
    a.label(0.5, 1, "annual", cls="sm bold", dy=-8, fill=BLUE)
    a.label(0.56, (1 + nom / 4) ** 2, "quarterly", cls="sm bold", anchor="start", dx=10,
            dy=14, fill=AMBER)
    a.label(0.42, math.exp(nom * 0.42), "continuous", cls="sm bold", anchor="end", dx=-6,
            dy=-8, fill=GREEN)
    a.frame(xticks=[0, 1], yticks=[1, 1 + nom], yfmt=lambda t: f"{t:.2f}")
    return f


@figure("Nominal Interest Rate", "The nominal rate needed to hit a fixed effective annual "
        "rate as compounding gets more frequent", width=WID)
def nominal_interest_rate() -> Fig:
    f = vcard()

    i_eff = 0.08
    a = vaxes(f, 1, 26, 0.0765, 0.0805, left=52, top=30)
    a.curve(lambda m: m * ((1 + i_eff) ** (1 / m) - 1), colour=BLUE, xa=1, xb=26)
    delta = math.log(1 + i_eff)
    a.hline(delta, colour=GREEN)
    a.label(24, delta, "δ", cls="bold", dy=-8, fill=GREEN)
    for m in (1, 2, 4, 12):
        a.point(m, m * ((1 + i_eff) ** (1 / m) - 1), colour=BLUE, r=3.2)
    a.frame(xlabel="m", ylabel="i⁽ᵐ⁾",
            xticks=[1, 4, 12, 24], yticks=[0.077, 0.079],
            yfmt=lambda t: f"{t * 100:.1f}%")
    return f


@figure("Nominal Interest Rate Convertible m-thly", "A balance stepping up by × 1.03 at "
        "each quarter to 1.1255, above the straight dashed line to the quoted 1.12",
        width=WID)
def nominal_convertible() -> Fig:
    f = vcard()

    m, j = 4, 0.03                                # i⁽⁴⁾ = 12%, so 3% a quarter
    a = vaxes(f, 0, 1, 1, 1.135, left=46, bottom=40)
    a.polyline([(0, 1), (1, 1 + m * j)], colour="var(--dim)", width=1.6, dash=True)
    pts = [(0, 1.0)]
    for k in range(1, m + 1):
        pts += [(k / m, (1 + j) ** (k - 1)), (k / m, (1 + j) ** k)]
    a.polyline(pts, colour=BLUE)
    a.label(0.375, 1 + j, "× 1.03", cls="sm bold", dy=16, fill=BLUE)
    a.point(1, (1 + j) ** m, colour=BLUE, label="1.1255", dx=-24, dy=-4)
    a.frame(xticks=[0, 0.25, 0.5, 0.75, 1],
            xfmt=lambda t: {0: "0", 0.25: "¼", 0.5: "½", 0.75: "¾", 1: "1"}[t],
            yticks=[1, 1 + m * j], yfmt=lambda t: f"{t:g}")
    return f


@figure("Nominal Discount Rate Convertible m-thly", "A payment of 1 at time 1 carried back a "
        "quarter at a time, a slice d⁽⁴⁾/4 of its value taken off the top at the start of "
        "each quarter", width=WID)
def nominal_discount_convertible() -> Fig:
    f = vcard()

    m, y, h, bw = 4, 344, 250, 30
    q = 0.10                                      # d⁽⁴⁾/4, exaggerated so each slice shows
    xs = timeline(f, y, 70, 290, m, labels=["0", "¼", "½", "¾", "1"])
    f.rect(xs[m] - bw / 2, y - h, bw, h, rx=2, fill=BLUE, fill_opacity="0.7")
    f.text(xs[m], y - h - 8, "1", cls="bold")
    for k in range(m - 1, -1, -1):
        due = h * (1 - q) ** (m - 1 - k)           # what the quarter's end is worth
        kept = due * (1 - q)
        f.rect(xs[k] - bw / 2, y - kept, bw, kept, rx=2, fill=AMBER, fill_opacity="0.7")
        f.rect(xs[k] - bw / 2, y - due, bw, due - kept, rx=2, fill=ROSE,
               fill_opacity="0.25", stroke=ROSE, stroke_width="1.2", stroke_dasharray="3 2")
        f.line(xs[k] + bw / 2, y - due, xs[k + 1] - bw / 2, y - due, cls="thin dash",
               stroke="var(--dim)", stroke_width="1.1")
    f.text(xs[m - 1] - bw / 2 - 6, y - h + h * q / 2 + 4, "d⁽⁴⁾/4", cls="sm bold",
           anchor="end", fill=ROSE)
    return f


@figure("Effective Rate", "One unit grown over a year by annual, quarterly and continuous "
        "compounding — three paths that all arrive at the same 1 + i", width=WID)
def effective_rate() -> Fig:
    f = vcard()

    i = 0.08
    a = vaxes(f, 0, 1, 1, 1.09, left=46, bottom=40)
    a.hline(1 + i, colour="var(--dim)")
    for m, colour in ((1, BLUE), (4, AMBER)):
        g = (1 + i) ** (1 / m)
        pts = [(0, 1)]
        for k in range(1, m + 1):
            pts += [(k / m, g ** (k - 1)), (k / m, g ** k)]
        a.polyline(pts, colour=colour)
    a.curve(lambda t: (1 + i) ** t, colour=GREEN, dash=True)
    a.point(1, 1 + i, colour=VIOLET, r=4.5)
    a.label(0.5, 1, "annual", cls="sm bold", dy=-8, fill=BLUE)
    a.label(0.56, (1 + i) ** 0.5, "quarterly", cls="sm bold", anchor="start", dx=10,
            dy=12, fill=AMBER)
    a.label(0.42, (1 + i) ** 0.42, "continuous", cls="sm bold", anchor="end", dx=-6,
            dy=-8, fill=GREEN)
    a.frame(xticks=[0, 1], yticks=[1, 1 + i],
            yfmt=lambda t: "1" if t == 1 else "1 + i")
    return f


@figure("Real Rate of Interest", "Money growing at 7% and prices at 4% over 20 years; "
        "their ratio, what the money buys, grows at only 2.88%", width=WID)
def real_rate_of_interest() -> Fig:
    f = vcard()

    i, r, years = 0.07, 0.04, 20
    real = (1 + i) / (1 + r) - 1
    a = vaxes(f, 0, years, 0.8, 4.1, left=36, right=74, top=24)
    a.area(lambda t: (1 + real) ** t, 0, years, colour=GREEN, opacity="0.14", base=1)
    for rate, colour, lab in ((i, BLUE, "money 7%"), (r, ROSE, "prices 4%"),
                              (real, GREEN, "real 2.88%")):
        a.curve(lambda t, g=rate: (1 + g) ** t, colour=colour)
        a.label(years, (1 + rate) ** years, lab, cls="sm bold", anchor="start", dx=6, dy=4,
                fill=colour)
    a.frame(xlabel="years", xticks=[0, 10, 20], yticks=[1, 2, 3, 4],
            yfmt=lambda t: f"{t:g}")
    return f


@figure("Force of Interest", "The accumulation curve a(t) with its tangent at one point: "
        "the slope there, per unit of height, is the force of interest", width=WID)
def force_of_interest() -> Fig:
    f = vcard()

    delta = 0.10
    a = vaxes(f, 0, 6, 0.9, 1.9, top=30)
    a.curve(lambda t: math.exp(delta * t), colour=BLUE)
    t0 = 3.2
    v0 = math.exp(delta * t0)
    a.polyline([(t0 - 1.5, v0 - 1.5 * delta * v0), (t0 + 1.5, v0 + 1.5 * delta * v0)],
               colour=AMBER, width=1.6)
    a.point(t0, v0, colour=AMBER)
    a.label(t0 - 0.5, v0 + 0.16, "slope a′(t)", cls="sm bold", fill=AMBER, anchor="end")
    a.frame(xlabel="time t", ylabel="a(t)", xticks=[0, 3, 6], yticks=[1, 1.5],
            yfmt=lambda t: f"{t:g}")
    return f


@figure("Variable Force of Interest", "A force of interest rising over time, the area under "
        "it from 0 to 4 shaded: the integral that accumulates 1 to a(4)", width=WID)
def variable_force() -> Fig:
    f = vcard()

    d_fn = lambda t: 0.04 + 0.016 * t
    a = vaxes(f, 0, 6, 0, 0.16, left=48, top=24)
    a.area(d_fn, 0, 4, colour=AMBER, opacity="0.24")
    a.curve(d_fn, colour=AMBER)
    a.vline(4, y_top=d_fn(4), colour=AMBER, dash=False)
    a.frame(xlabel="time t", ylabel="δ(t)", xticks=[0, 2, 4, 6],
            yticks=[0.05, 0.10, 0.15], yfmt=lambda t: f"{t:.2f}")
    a.label(2.0, 0.045, "∫₀⁴ δ(s) ds", cls="bold")
    return f


@figure("Equation of Value", "Inflows above the timeline and outflows below it, each "
        "moved back to time 0, where their present values stack into two equal bars",
        width=WID)
def equation_of_value() -> Fig:
    f = vcard()

    y, v, u, bw = 229, 1 / 1.10, 50, 14            # u: the height of one unit
    out = 1 / (v + v ** 3) * (v ** 2 + v ** 4 + v ** 6)   # sized so the two sides balance
    xs = timeline(f, y, 76, 306, 6, labels=["", "1", "2", "3", "4", "5", "6"])
    for k in (2, 4, 6):
        cash_arrow(f, xs[k], y, u, colour=GREEN, width=2)
    for k in (1, 3):
        cash_arrow(f, xs[k], y, u * out, colour=ROSE, up=False, width=2)
    # at time 0: each side's present value, stacked flow by flow
    top = y
    for k in (2, 4, 6):
        h = u * v ** k
        f.rect(xs[0] - bw / 2, top - h, bw, h, rx=2, fill=GREEN, fill_opacity="0.7",
               stroke="var(--surf)", stroke_width="1")
        top -= h
    bot = y
    for k in (1, 3):
        h = u * out * v ** k
        f.rect(xs[0] - bw / 2, bot, bw, h, rx=2, fill=ROSE, fill_opacity="0.7",
               stroke="var(--surf)", stroke_width="1")
        bot += h
    f.arrow(xs[6], top - 14, xs[0] + bw / 2 + 6, top - 14, colour=GREEN, width=1.2,
            dash=True)
    f.arrow(xs[3], bot + 14, xs[0] + bw / 2 + 6, bot + 14, colour=ROSE, width=1.2,
            dash=True)
    f.text(xs[0] - bw / 2 - 6, y + 4, "0", cls="sm dim", anchor="end")
    f.text(xs[0], top - 26, "PV in", cls="sm bold")
    f.text(xs[0], bot + 30, "PV out", cls="sm bold")
    return f


@figure("Time Value of Money Equations", "Five level payments collected into one value at "
        "time 0 and one at time 5, the two linked forward by × (1+i)ⁿ and back by × vⁿ",
        width=WID)
def tvm_equations() -> Fig:
    f = vcard()

    y, n, i, u, bw = 344, 5, 0.08, 34, 26         # u: the height of one payment
    xs = timeline(f, y, TL0, TL1, n, labels=["0", "1", "2", "3", "4", "5"])
    for k in range(1, n):
        cash_arrow(f, xs[k], y, u, colour=BLUE, width=2)
    pv, fv = u * _ann_imm(n, i), u * _acc(n, i)
    f.rect(xs[0] - bw / 2, y - pv, bw, pv, rx=2, fill=AMBER, fill_opacity="0.7")
    f.text(xs[0], y - pv - 8, "a₍ₙ₎", cls="bold")
    f.rect(xs[n] - bw / 2, y - fv, bw, fv, rx=2, fill=GREEN, fill_opacity="0.7")
    f.rect(xs[n] - bw / 2, y - u, bw, u, rx=2, fill=BLUE, fill_opacity="0.55")
    f.text(xs[n], y - fv - 8, "s₍ₙ₎", cls="bold")
    ya, yb = y - fv + 16, y - fv + 50
    f.arrow(xs[0] + bw / 2 + 8, ya, xs[n] - bw / 2 - 8, ya, colour=GREEN, width=1.6)
    f.text(BCX, ya - 8, "× (1+i)ⁿ", cls="sm bold", fill=GREEN)
    f.arrow(xs[n] - bw / 2 - 8, yb, xs[0] + bw / 2 + 8, yb, colour=AMBER, width=1.6)
    f.text(BCX, yb - 8, "× vⁿ", cls="sm bold", fill=AMBER)
    return f


# ═══════════════════════════════════════════════════════════════════════════
# 2. Annuities
# ═══════════════════════════════════════════════════════════════════════════

@figure("Cash Flow", "A cash-flow stream on a timeline: an outlay of 500 and an outflow of "
        "80 drawn down from it, inflows of 150 to 260 drawn up", width=WID)
def cash_flow() -> Fig:
    f = vcard()

    y = 214
    xs = timeline(f, y, TL0, TL1, 6, labels=[""] * 7)
    stream = [(-500, ROSE), (150, GREEN), (150, GREEN), (200, GREEN), (-80, ROSE),
              (200, GREEN), (260, GREEN)]
    for k, (c, colour) in enumerate(stream):
        cash_arrow(f, xs[k], y, abs(c) / 500 * 136 + 8, colour=colour,
                   label=f"{c:+,}", up=c > 0, label_cls="sm", width=2.2)
        # the time sits on whichever side of the line its arrow leaves free
        f.text(xs[k], y + 17 if c > 0 else y - 9, str(k), cls="sm dim")
    return f


@figure("Annuities", "One timeline carrying the annuity family: short due payments at the "
        "start of each period, tall immediate ones at the end, and a perpetuity's carrying "
        "on past n", width=WID)
def annuities() -> Fig:
    f = vcard()

    y, n = 320, 4
    xs = timeline(f, y, 46, 306, 6, labels=["0", "1", "2", "3", "n", "", ""])
    for k in range(n):
        cash_arrow(f, xs[k] - 5, y, 130, colour=VIOLET, width=2.2)
    for k in range(1, n + 1):
        cash_arrow(f, xs[k] + 5, y, 196, colour=BLUE, width=2.2)
    for k, fo in ((5, 0.55), (6, 0.25)):             # a perpetuity never stops
        f.raw(f'<g opacity="{fo}">')
        cash_arrow(f, xs[k] + 5, y, 196, colour=BLUE, width=2.2)
        f.raw("</g>")
    f.text(xs[6] + 18, y - 98, "…", cls="bold", anchor="start")
    f.text(xs[0] - 5, y - 142, "due", cls="sm bold")
    f.text(xs[n] + 5, y - 208, "immediate", cls="sm bold")
    f.text((xs[5] + xs[6]) / 2 + 5, y - 226, "perpetuity", cls="sm bold")
    return f


@figure("Annuity Due", "Five payments at the start of each period, each shifted one period "
        "earlier from where an annuity-immediate pays it — leaving the grey payment at time 5 "
        "behind", width=WID)
def annuity_due() -> Fig:
    f = vcard()

    y, n, h = 340, 5, 150
    xs = timeline(f, y, 66, 300, n, labels=["0", "1", "2", "3", "4", "5"])
    f.arrow(xs[n], y, xs[n], y - h, colour="var(--axis)", width=2, dash=True)
    for k in range(n):
        cash_arrow(f, xs[k], y, h, colour=VIOLET, width=2.2)
        f.arrow(xs[k + 1] - 6, y - h - 16, xs[k] + 6, y - h - 16, colour=VIOLET,
                width=1.4)
    f.text(xs[0], y - h - 32, "due", cls="sm bold", fill=VIOLET)
    f.text(xs[n], y - h - 32, "immediate", cls="sm bold")
    return f


@figure("Level Annuity", "Five equal payments P, each discounted into a shrinking block of "
        "the stack at time 0 and grown into a widening block of the stack at time 5",
        width=WID)
def level_annuity() -> Fig:
    f = vcard()

    y, n, i, u, bw = 344, 5, 0.08, 36, 24          # u: the height of one P
    xs = timeline(f, y, 66, 294, n, labels=["0", "1", "2", "3", "4", "5"])
    pv_top = fv_top = y
    for k in range(1, n + 1):
        if k < n:
            f.rect(xs[k] - bw / 2, y - u, bw, u, rx=2, fill=BLUE, fill_opacity="0.75")
            f.text(xs[k], y - u - 8, "P", cls="sm bold")
        h = u * (1 + i) ** -k                        # payment k, discounted to 0
        f.rect(xs[0] - bw / 2, pv_top - h, bw, h, rx=2, fill=AMBER, fill_opacity="0.75",
               stroke="var(--surf)", stroke_width="1")
        pv_top -= h
        h = u * (1 + i) ** (k - 1)                   # payment n − k + 1, grown to n
        f.rect(xs[n] - bw / 2, fv_top - h, bw, h, rx=2,
               fill=BLUE if k == 1 else GREEN, fill_opacity="0.75",
               stroke="var(--surf)", stroke_width="1")
        fv_top -= h
    f.text(xs[0], pv_top - 8, "P·a₍ₙ₎", cls="bold")
    f.text(xs[n], fv_top - 8, "P·s₍ₙ₎", cls="bold")
    return f


@figure("Level Payment Annuity", "Payments of 1 at times 1 to 5, worth a₍₅₎ = 4.2124 as one "
        "bar at time 0 and s₍₅₎ = 5.6371 as one bar at time 5, at 6%", width=WID)
def level_payment_annuity() -> Fig:
    f = vcard()

    y, n, i, u, bw = 330, 5, 0.06, 38, 28           # u: the height of one payment
    xs = timeline(f, y, 66, 294, n, labels=["0", "1", "2", "3", "4", "5"])
    for k in range(1, n):
        cash_arrow(f, xs[k], y, u, colour=BLUE, width=2)
    for k, fac, colour, name in ((0, _ann_imm(n, i), AMBER, "a₍₅₎"),
                                 (n, _acc(n, i), GREEN, "s₍₅₎")):
        f.rect(xs[k] - bw / 2, y - u * fac, bw, u * fac, rx=2, fill=colour,
               fill_opacity="0.7")
        f.text(xs[k], y - u * fac - 8, f"{fac:.4f}", cls="sm bold")
        f.text(xs[k], y + 34, name, cls="bold")
    f.rect(xs[n] - bw / 2, y - u, bw, u, rx=2, fill=BLUE, fill_opacity="0.55")
    return f


@figure("Perpetuity", "Bars rising one payment at a time, each the present value of that "
        "many payments of 1 at 5%, levelling off under the perpetuity's finite value of 20",
        width=WID)
def perpetuity() -> Fig:
    f = vcard()

    i, last = 0.05, 40
    a = vaxes(f, 0, last + 1, 0, 22, left=40, top=24)
    a.hline(1 / i, colour=GREEN, x_to=last + 1)
    for k in range(1, last + 1):
        a.bars([(k, _ann_imm(k, i))], colour=BLUE, bw=4.2, opacity="0.8")
    a.label(last + 1, 1 / i, "a₍∞₎", cls="sm bold", anchor="end", dy=-8, fill=GREEN)
    a.frame(xlabel="payments", xticks=[1, 20, 40], yticks=[10, 20],
            yfmt=lambda t: f"{t:g}")
    return f


@figure("Level Perpetuity", "Payments that never stop, discounted to a finite value",
        width=WID)
def level_perpetuity() -> Fig:
    f = vcard()

    i = 0.05
    a = vaxes(f, 0, 21, 0, 1.05, left=50, top=30)
    a.bars([(k, (1 + i) ** -k) for k in range(1, 21)], colour=BLUE, opacity="0.7")
    a.frame(xlabel="payment number", ylabel="present value",
            xticks=[1, 5, 10, 15, 20], yticks=[0.5, 1.0], yfmt=lambda t: f"{t:g}")
    return f


@figure("Term of Annuity", "Bars rising one payment at a time, each the present value of "
        "that many payments; the term n is the count that reaches the loan's present value",
        width=WID)
def term_of_annuity() -> Fig:
    f = vcard()

    i, n, last = 0.06, 12, 20
    target = _ann_imm(n, i)
    a = vaxes(f, 0, last + 0.8, 0, 12.4, left=40, bottom=64)
    for k in range(1, last + 1):
        colour = BLUE if k <= n else "var(--axis)"
        a.bars([(k, _ann_imm(k, i))], colour=colour, bw=9.5,
               opacity="0.8" if k <= n else "0.45")
    a.hline(target, colour=AMBER, x_to=last + 0.8)
    f.text(a.x0 - 8, a.py(target) + 4, "PV", cls="sm bold", anchor="end", fill=AMBER)
    a.frame(xticks=[1, n, last], xfmt=lambda t: {1: "1", n: "n", last: ""}[t])
    brace(f, a.px(1) - 5, a.px(n) + 5, a.y1 + 26, depth=9, colour=VIOLET,
          label="n payments", label_cls="sm bold")
    return f


@figure("Non-level Annuities", "Five payments of different sizes drawn as dashed outlines, "
        "each discounted separately into the filled bar inside it, the filled pieces stacked "
        "at time 0 into the present value", width=WID)
def non_level_annuities() -> Fig:
    f = vcard()

    y, i, u, bw = 344, 0.10, 22, 24                 # u: the height of one unit
    xs = timeline(f, y, TL0, TL1, 5, labels=["0", "1", "2", "3", "4", "5"])
    top = y
    for k, c in enumerate((3, 1, 4, 2, 5), start=1):
        pv = u * c * (1 + i) ** -k
        f.rect(xs[k] - bw / 2, y - u * c, bw, u * c, rx=2, fill="none", stroke=VIOLET,
               stroke_width="1.2", stroke_dasharray="3 2")
        f.rect(xs[k] - bw / 2, y - pv, bw, pv, rx=2, fill=VIOLET, fill_opacity="0.7")
        f.rect(xs[0] - bw / 2, top - pv, bw, pv, rx=2, fill=VIOLET, fill_opacity="0.7",
               stroke="var(--surf)", stroke_width="1")
        top -= pv
    f.text(xs[0], top - 8, "PV", cls="bold")
    return f


@figure("Arithmetic Increasing Annuity", "Six payments rising by a constant amount, each "
        "bar a level block P with a staircase of Q steps on top", width=WID)
def arithmetic_increasing() -> Fig:
    f = vcard()

    y, hl, hq = 344, 44, 32
    xs = timeline(f, y, 56, 300, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    for j in range(1, 7):
        f.rect(xs[j] - 11, y - hl, 22, hl, rx=2, fill=BLUE, fill_opacity="0.6")
        for s in range(j - 1):
            f.rect(xs[j] - 11, y - hl - hq * (s + 1), 22, hq, rx=2, fill=AMBER,
                   fill_opacity="0.6", stroke="var(--surf)", stroke_width="1")
    f.text(xs[1] - 16, y - hl / 2 + 4, "P", cls="bold", anchor="end")
    f.text(xs[2] - 16, y - hl - hq / 2 + 4, "Q", cls="bold", anchor="end")
    return f


@figure("Decreasing Annuity", "Payments falling 5, 4, 3, 2, 1 with the increasing payments "
        "1 to 5 stacked on top, so every column reaches the same height n + 1", width=WID)
def decreasing_annuity() -> Fig:
    f = vcard()

    y, n, u = 344, 5, 34                             # u: the height of one unit
    xs = timeline(f, y, 66, 300, n, labels=["0", "1", "2", "3", "4", "5"])
    for j in range(1, n + 1):
        dec, inc = n - j + 1, j
        f.rect(xs[j] - 12, y - u * dec, 24, u * dec, rx=2, fill=VIOLET,
               fill_opacity="0.6")
        f.rect(xs[j] - 12, y - u * (dec + inc), 24, u * inc, rx=2, fill=BLUE,
               fill_opacity="0.28")
        f.text(xs[j], y - u * dec + 20, str(dec), cls="sm")
    f.line(xs[1] - 16, y - u * (n + 1), xs[n] + 16, y - u * (n + 1), cls="thin dash",
           stroke=GREEN, stroke_width="1.4")
    f.text(xs[n] + 16, y - u * (n + 1) - 8, "n + 1", cls="sm bold", anchor="end")
    f.text(xs[1] - 17, y - u * n / 2 + 4, "(Da)₍ₙ₎", cls="sm bold", anchor="end")
    f.text(xs[1] - 17, y - u * (n + 0.5) + 4, "(Ia)₍ₙ₎", cls="sm bold", anchor="end")
    return f


@figure("Arithmetic Progression", "Payments of 100 rising by 50 a period to 350, each bar a "
        "level block P with the accumulated increases Q on top", width=WID)
def arithmetic_progression() -> Fig:
    f = vcard()

    y = 344
    xs = timeline(f, y, 56, 300, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    P, Q = 100, 50
    top = P + 5 * Q
    hl = 210 * P / top
    for j in range(1, 7):
        amt = P + (j - 1) * Q
        hq = 210 * ((j - 1) * Q) / top
        f.rect(xs[j] - 12, y - hl, 24, hl, rx=2, fill=BLUE, fill_opacity="0.6")
        if hq:
            f.rect(xs[j] - 12, y - hl - hq, 24, hq, rx=2, fill=AMBER, fill_opacity="0.6")
        f.text(xs[j], y - hl - hq - 8, str(amt), cls="sm")
    f.text(xs[1] - 17, y - hl / 2 + 4, "P", cls="bold", anchor="end")
    f.text(xs[2] + 17, y - hl - 210 * Q / top / 2 + 4, "Q", cls="bold", anchor="start")
    return f


@figure("Geometric Increasing Annuity", "Six payments, each 1.2 times the one before, "
        "rising from 1.00 to 2.49", width=WID)
def geometric_increasing() -> Fig:
    f = vcard()

    y = 344
    xs = timeline(f, y, 56, 300, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    g = 0.20
    top = (1 + g) ** 5
    for j in range(1, 7):
        amt = (1 + g) ** (j - 1)
        h = 240 * amt / top
        f.rect(xs[j] - 12, y - h, 24, h, rx=2, fill=ROSE, fill_opacity="0.6")
        f.text(xs[j], y - h - 8, f"{amt:.2f}", cls="sm")
    return f


@figure("Geometric Progression", "Ten payments growing 3% a period, each with its present "
        "value at 8% drawn inside it, the present values shrinking at a steady shifted rate",
        width=WID)
def geometric_progression() -> Fig:
    f = vcard()

    i, g, n = 0.08, 0.03, 10
    a = vaxes(f, 0, 11, 0, 1.45, left=40, right=30, top=24)
    a.bars([(k, (1 + g) ** (k - 1)) for k in range(1, n + 1)], colour=ROSE, opacity="0.6")
    a.bars([(k, (1 + g) ** (k - 1) * (1 + i) ** -k) for k in range(1, n + 1)], colour=BLUE,
           opacity="0.85")
    a.frame(xlabel="payment", xticks=[1, 5, 10], yticks=[0.5, 1.0],
            yfmt=lambda t: f"{t:g}")
    top, pv = (1 + g) ** (n - 1), (1 + g) ** (n - 1) * (1 + i) ** -n
    a.label(n, top, "payment", cls="sm bold", anchor="end", dx=8, dy=-8)
    a.label(n, pv / 2, "PV", cls="sm bold", anchor="start", dx=12, dy=4)
    return f


@figure("Payable m-thly", "Four years of payments: the annual 1 drawn as a tall grey arrow "
        "at each year end, and the same 1 paid as four blue quarter-payments of ¼ through "
        "the year", width=WID)
def payable_m_thly() -> Fig:
    f = vcard()

    y, m, h = 330, 4, 180
    xs = timeline(f, y, 62, 300, 4, labels=["0", "1", "2", "3", "4"])
    step = (xs[1] - xs[0]) / m
    for yr in range(4):
        f.arrow(xs[yr + 1], y, xs[yr + 1], y - h, colour="var(--axis)", width=2, dash=True)
        for j in range(1, m + 1):
            cash_arrow(f, xs[yr] + step * j, y, h / m, colour=BLUE, width=2)
    f.text(xs[1], y - h - 8, "1", cls="bold")
    f.text(xs[0] + step, y - h / m - 8, "¼", cls="bold")
    return f


@figure("Payable Continuously", "One year's payment of 1 split into 4 tall quarterly arrows, "
        "12 shorter monthly ones, and in the limit a continuous band along the timeline",
        width=WID)
def payable_continuously() -> Fig:
    f = vcard()

    y, h = 340, 220
    xs = timeline(f, y, 62, 300, 1, labels=["0", "1"])
    f.rect(xs[0], y - 16, xs[1] - xs[0], 16, rx=2, fill=TEAL, fill_opacity="0.45",
           stroke=TEAL, stroke_width="1.2")
    for m, colour in ((12, VIOLET), (4, BLUE)):      # each payment is 1/m tall
        step = (xs[1] - xs[0]) / m
        for j in range(1, m + 1):
            cash_arrow(f, xs[0] + step * j, y - 16, h / m, colour=colour, width=2)
    step = (xs[1] - xs[0]) / 4
    f.text(xs[0] + step, y - 16 - h / 4 - 8, "m = 4", cls="sm bold", fill=BLUE)
    f.text(xs[0] + step / 3, y - 16 - h / 12 - 8, "m = 12", cls="sm bold", fill=VIOLET)
    f.text(BCX, y + 18, "m → ∞", cls="sm bold", fill=TEAL)
    return f


@figure("Continuous Annuity", "The discount curve vᵗ falling from 1, the area under it from "
        "0 to n shaded as the continuous annuity", width=WID)
def continuous_annuity() -> Fig:
    f = vcard()

    delta = math.log(1.06)
    n = 8
    a = vaxes(f, 0, 10, 0, 1.1, top=30)
    a.area(lambda t: math.exp(-delta * t), 0, n, colour=TEAL, opacity="0.26")
    a.curve(lambda t: math.exp(-delta * t), colour=TEAL)
    a.frame(xlabel="time t", ylabel="vᵗ", xticks=[0, n],
            xfmt=lambda t: "0" if t == 0 else "n", yticks=[0.5, 1.0],
            yfmt=lambda t: f"{t:g}")
    a.label(3.6, 0.36, "ā₍ₙ₎", cls="bold")
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


def _amort_bars(f, a, rows, P, bar_frac=0.62, faded=False):
    """Stacked principal (below) and interest (above) bars, one per payment."""
    bw = (a.px(1) - a.px(0)) * bar_frac
    for k, (_, interest, principal, _) in enumerate(rows):
        x = a.px(k + 1) - bw / 2
        f.rect(x, a.py(principal), bw, a.y1 - a.py(principal), rx=2, fill=BLUE,
               fill_opacity="0.7")
        f.rect(x, a.py(P), bw, a.py(principal) - a.py(P), rx=2, fill=AMBER,
               fill_opacity="0.25" if faded else "0.7")
    return bw


@figure("Loans", "A loan of 10,000 advanced at time 0 and repaid by eight payments of "
        "1,740 above the timeline, while the balance still owed shrinks to nothing below it",
        width=WID)
def loans() -> Fig:
    f = vcard()

    rows, P = _schedule()
    y, s = 150, 0.021                                # s: pixels per unit of money
    xs = timeline(f, y, 66, 306, LOAN_N, labels=[""] * (LOAN_N + 1))
    owed = [(xs[0], y + LOAN_L * s)] + [(xs[k + 1], y + r[3] * s) for k, r in enumerate(rows)]
    f.polygon([(xs[0], y)] + owed, fill=GREEN, fill_opacity="0.16", stroke="none")
    f.poly(owed, cls="thin", stroke=GREEN, stroke_width="1.4")
    cash_arrow(f, xs[0], y, LOAN_L * s, colour=GREEN, label="10,000", up=False, width=2.2)
    for k in range(1, LOAN_N + 1):
        cash_arrow(f, xs[k], y, P * s, colour=BLUE, width=2)
        f.text(xs[k], y + 16, str(k), cls="sm dim")
    f.text(xs[1], y - P * s - 8, f"{P:,.0f}", cls="sm bold")
    f.text(xs[2] + 4, y + 110, "balance", cls="sm bold", anchor="start")
    return f


@figure("Amortization", "Eight level payments on the 10,000 loan, each split into a "
        "principal part growing from the bottom and an interest part shrinking on top",
        width=WID)
def amortization() -> Fig:
    f = vcard()

    rows, P = _schedule()
    a = vaxes(f, 0.4, LOAN_N + 0.6, 0, P * 1.12, left=54, top=44)
    _amort_bars(f, a, rows, P)
    a.hline(P, colour=VIOLET, dash=False)
    a.frame(xlabel="payment", xticks=list(range(1, LOAN_N + 1)),
            yticks=[0, 1000], yfmt=lambda t: f"{t:,.0f}")
    a.label(1.5, 1380, "interest", cls="sm bold")
    a.label(7.5, 700, "principal", cls="sm bold")
    return f


@figure("Principal", "The principal part of each payment on the 10,000 loan, growing from "
        "940 to 1,611 as the interest part above it fades", width=WID)
def principal() -> Fig:
    f = vcard()

    rows, P = _schedule()
    a = vaxes(f, 0.4, LOAN_N + 0.6, 0, P * 1.12, left=54, top=44)
    _amort_bars(f, a, rows, P, faded=True)
    a.frame(xlabel="payment", xticks=list(range(1, LOAN_N + 1)),
            yticks=[0, 1000], yfmt=lambda t: f"{t:,.0f}")
    for k in (1, LOAN_N):
        a.label(k, rows[k - 1][2], f"{rows[k - 1][2]:,.0f}", cls="sm bold", dy=-6)
    return f


@figure("Interest", "The balance owed on the 10,000 loan before each payment, topped by "
        "the 8% interest charged on it — 800 at first, 129 by the last", width=WID)
def interest() -> Fig:
    f = vcard()

    rows, P = _schedule()
    a = vaxes(f, 0.4, LOAN_N + 0.6, 0, 11200, left=58, top=24)
    bw = (a.px(1) - a.px(0)) * 0.62
    for k, (bal, interest_, _, _) in enumerate(rows):
        x = a.px(k + 1)
        f.rect(x - bw / 2, a.py(bal), bw, a.y1 - a.py(bal), rx=2, fill="var(--dim)",
               fill_opacity="0.3")
        f.rect(x - bw / 2, a.py(bal + interest_), bw, a.py(bal) - a.py(bal + interest_),
               rx=2, fill=AMBER, fill_opacity="0.85")
    a.frame(xlabel="period", ylabel="balance", xticks=list(range(1, LOAN_N + 1)),
            yticks=[0, 5000, 10000], yfmt=lambda t: f"{t:,.0f}")
    for k in (1, LOAN_N):
        bal, interest_ = rows[k - 1][0], rows[k - 1][1]
        a.label(k, bal + interest_, f"{interest_:,.0f}", cls="sm bold", dy=-6)
    return f


@figure("Outstanding Balance", "The 10,000 loan's balance falling to zero over eight "
        "payments, the 6,948 left after three reached from the past and from the future "
        "alike", width=WID)
def outstanding_balance() -> Fig:
    f = vcard()

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
    # the same balance two ways: looking back at what was paid, or forward at what is due
    ob = balances[k0]
    f.arrow(a.px(0.15), a.py(ob), a.px(k0) - 7, a.py(ob), colour=AMBER, width=1.6)
    a.label(0.25, ob, "retrospective", cls="sm bold", anchor="start", dy=16, fill=AMBER)
    f.arrow(a.px(7.6), a.py(ob), a.px(k0) + 7, a.py(ob), colour=GREEN, width=1.6)
    a.label(7.6, ob, "prospective", cls="sm bold", anchor="end", dy=-7, fill=GREEN)
    a.frame(xlabel="payments made", ylabel="balance", xticks=list(range(LOAN_N + 1)),
            yticks=[0, ob, 10000], yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Term of Loan", "The level payment on a 10,000 loan at 8% falling as the term "
        "lengthens: 2,505 over 5 years, 1,740 over 8, 1,019 over 20", width=WID)
def term_of_loan() -> Fig:
    f = vcard()

    a = vaxes(f, 2, 30, 0, 5200, left=58, top=30)
    a.curve(lambda n: LOAN_L / _ann_imm(n, LOAN_I), colour=BLUE, xa=2, xb=30)
    for n_ in (5, LOAN_N, 20):
        a.point(n_, LOAN_L / _ann_imm(n_, LOAN_I), colour=AMBER, r=3.4)
        a.label(n_, LOAN_L / _ann_imm(n_, LOAN_I),
                f"{LOAN_L / _ann_imm(n_, LOAN_I):,.0f}", cls="sm bold", dy=-12, dx=16)
    a.frame(xlabel="term n (years)", ylabel="level payment",
            xticks=[5, 10, 20, 30], yticks=[0, 2000, 4000], yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Final Payment", "Four level payments P, then two alternatives at time 5: a short "
        "drop payment below the level line or a tall balloon payment above it", width=WID)
def final_payment() -> Fig:
    f = vcard()

    y, h = 330, 110
    xs = timeline(f, y, 66, 300, 5, labels=["0", "1", "2", "3", "4", "5"])
    for j in range(1, 5):
        cash_arrow(f, xs[j], y, h, colour=BLUE, width=2)
    f.text(xs[1], y - h - 8, "P", cls="bold")
    f.line(xs[1] - 12, y - h, xs[5] + 22, y - h, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.2")
    cash_arrow(f, xs[5] - 9, y, 0.35 * h, colour=GREEN, label="drop", label_cls="sm bold",
               width=2.2)
    cash_arrow(f, xs[5] + 9, y, 2.1 * h, colour=ROSE, label="balloon", label_cls="sm bold",
               width=2.2)
    return f


@figure("Drop Payment", "Five level payments P, then a final drop payment filling only part "
        "of the dashed outline a full payment would have", width=WID)
def drop_payment() -> Fig:
    f = vcard()

    y, h = 330, 170
    xs = timeline(f, y, 56, 300, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    for j in range(1, 6):
        cash_arrow(f, xs[j], y, h, colour=BLUE, width=2)
    f.text(xs[1], y - h - 8, "P", cls="bold")
    f.arrow(xs[6], y, xs[6], y - h, colour="var(--axis)", width=2, dash=True)
    cash_arrow(f, xs[6], y, 0.3 * h, colour=GREEN, width=2.6)
    f.text(xs[6] - 8, y - 0.3 * h / 2 + 4, "drop", cls="sm bold", anchor="end",
           fill=GREEN)
    return f


@figure("Balloon Payment", "Five reduced payments K, then a final balloon payment B towering "
        "over the dashed level of the others", width=WID)
def balloon_payment() -> Fig:
    f = vcard()

    y, h = 344, 70
    xs = timeline(f, y, 56, 300, 6, labels=["0", "1", "2", "3", "4", "5", "6"])
    for j in range(1, 6):
        cash_arrow(f, xs[j], y, h, colour=BLUE, width=2)
    f.text(xs[1], y - h - 8, "K", cls="bold")
    f.line(xs[1] - 12, y - h, xs[6] + 12, y - h, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.2")
    cash_arrow(f, xs[6], y, 3.6 * h, colour=ROSE, label="B", label_cls="bold", width=2.6)
    return f


@figure("Loan Repayment Comparison", "The 10,000 loan repaid two ways: solid bars for level "
        "payments of 1,740, each split into principal and interest, and dashed outlines for "
        "constant principal of 1,250 plus falling interest", width=WID)
def loan_repayment_comparison() -> Fig:
    f = vcard()

    rows, P = _schedule()
    n, L, i = LOAN_N, LOAN_L, LOAN_I
    a = vaxes(f, 0.4, n + 0.6, 0, 2250, left=54, top=24)
    bw = _amort_bars(f, a, rows, P)
    # constant principal: L/n of principal every time, plus interest on what is left
    for t in range(1, n + 1):
        total = L / n + i * L * (n - t + 1) / n
        f.rect(a.px(t) - bw / 2 - 3, a.py(total), bw + 6, a.y1 - a.py(total), rx=3,
               fill="none", stroke=GREEN, stroke_width="1.4", stroke_dasharray="4 3")
    a.hline(L / n, colour=GREEN, dash=False)
    a.frame(xlabel="payment", xticks=list(range(1, n + 1)), yticks=[0, 1000, 2000],
            yfmt=lambda t: f"{t:,.0f}")
    a.label(1, L / n + i * L, "constant", cls="sm bold", dy=-8, fill=GREEN)
    a.label(n, P, "level", cls="sm bold", dy=-8, fill=BLUE)
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
                   coupon_label="Fr", redemption_label="C", zero_above=False):
    labels = ["0"] + [str(k) for k in range(1, n)] + ["n"]
    if n > 4:
        for k in range(3, n - 1):
            labels[k] = "…" if k == 3 else ""
    if zero_above:                     # leave the space below 0 to a price drawn down
        labels[0] = ""
        f.text(x0, y - 9, "0", cls="sm dim")
    xs = timeline(f, y, x0, x1, n, labels=labels)
    for k in range(1, n + 1):
        cash_arrow(f, xs[k], y, coupon_h, colour=BLUE,
                   label=coupon_label if k == 1 else None, up=True)
    cash_arrow(f, xs[n], y, redemption_h, colour=GREEN, label=redemption_label, up=True)
    return xs


@figure("Bonds", "A bond on one timeline: the price P paid down at time 0, a coupon Fr up "
        "at every period, and the redemption C up at maturity", width=WID)
def bonds() -> Fig:
    f = vcard()

    y = 250
    xs = _bond_timeline(f, y, 6, coupon_h=44, redemption_h=160, zero_above=True)
    cash_arrow(f, xs[0], y, 100, colour=AMBER, label="P", up=False, width=2.2)
    return f


@figure("Bond Price", "Bond price falling as the yield rises: above par at yields under "
        "the coupon rate, at par where they meet, below par beyond", width=WID)
def bond_price() -> Fig:
    f = vcard()

    a = vaxes(f, 0.01, 0.10, 700, 1400, left=58, top=30)
    a.curve(lambda j: _bond_price(j), colour=BLUE, xa=0.012, xb=0.10)
    a.hline(BOND_C, colour="var(--dim)")
    a.vline(BOND_R, y_top=_bond_price(BOND_R), colour=GREEN)
    a.point(BOND_R, BOND_C, colour=GREEN)
    a.label(BOND_R, BOND_C, "par", cls="sm bold", dy=-12, dx=16)
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
    f = vcard()

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


@figure("Market Value", "The 1,000 par bond's market value swinging with the prevailing "
        "yield while its book value holds a steady line, both ending at 1,000", width=WID)
def market_value() -> Fig:
    f = vcard()

    a = vaxes(f, 0, BOND_N, 850, 1120, left=58, top=24)
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
    a.label(2, market[2], "market value", cls="sm bold", dy=-10, fill=BLUE)
    a.label(8.2, BOND_C, "book value", cls="sm bold", dy=18, fill=VIOLET)
    return f


@figure("Amortization of Premium", "A premium bond's book value written down to the "
        "redemption value", width=WID)
def amortization_of_premium() -> Fig:
    f = vcard()

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
    a.label(3.2, 1060, "premium", cls="sm bold", anchor="start")
    a.frame(xlabel="coupons paid", ylabel="book value", xticks=[0, 5, 10],
            yticks=[1000, 1100, 1200], yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Accumulation of Discount", "A discount bond's book value written up to the "
        "redemption value", width=WID)
def accumulation_of_discount() -> Fig:
    f = vcard()

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
    a.label(2.2, 972, "discount", cls="sm bold", anchor="start")
    a.frame(xlabel="coupons paid", ylabel="book value", xticks=[0, 5, 10],
            yticks=[850, 950, 1050], yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Face Value", "The face value of 1,000 drawn as a column of twenty 50 blocks, one of "
        "them the coupon, beside a dashed price bar of 1,081 that differs from it", width=WID)
def face_value() -> Fig:
    f = vcard()

    y, s, bw = 350, 0.24, 64                          # s: pixels per unit of money
    xf, xp = 120, 236
    block = BOND_F * BOND_R * s                       # one coupon, F × r = 50
    for k in range(int(round(1 / BOND_R))):
        top = k == int(round(1 / BOND_R)) - 1
        f.rect(xf - bw / 2, y - (k + 1) * block, bw, block, rx=1.5,
               fill=BLUE if top else GREEN, fill_opacity="0.8" if top else "0.5",
               stroke="var(--surf)", stroke_width="1")
    price = _bond_price(0.04)
    f.rect(xp - bw / 2, y - price * s, bw, price * s, rx=3, fill=AMBER,
           fill_opacity="0.12", stroke=AMBER, stroke_width="1.4", stroke_dasharray="4 3")
    f.line(xf - bw / 2 - 10, y, xp + bw / 2 + 10, y, cls="axis")
    f.text(xf, y - BOND_F * s - 22, "1,000", cls="sm bold")
    f.text(xf - bw / 2 - 8, y - BOND_F * s + block / 2 + 4, "50", cls="sm bold",
           anchor="end", fill=BLUE)
    f.text(xp, y - price * s - 8, f"{price:,.0f}", cls="sm bold")
    f.text(xf, y + 18, "F", cls="bold")
    f.text(xp, y + 18, "P", cls="bold")
    return f


@figure("Redemption Value", "Coupons along a timeline and, at maturity, three possible "
        "redemption payments around the dashed face-value level: above it, at it, below it",
        width=WID)
def redemption_value() -> Fig:
    f = vcard()

    y, n, hf = 330, 6, 170                           # hf: the height of F
    xs = timeline(f, y, 56, 288, n, labels=["0", "1", "2", "…", "", "", "n"])
    for k in range(1, n + 1):
        cash_arrow(f, xs[k], y, 36, colour=BLUE, width=2)
    f.text(xs[1], y - 44, "Fr", cls="sm bold")
    f.line(xs[1] - 12, y - hf, xs[n] - 32, y - hf, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.2")
    f.text(xs[1] - 16, y - hf + 4, "F", cls="bold", anchor="end")
    for dx, ratio, colour, lab in ((-16, 0.8, ROSE, "C < F"), (0, 1.0, GREEN, "C = F"),
                                   (16, 1.22, AMBER, "C > F")):
        cash_arrow(f, xs[n] + dx, y, hf * ratio, colour=colour, label=lab,
                   label_cls="sm bold", width=2.2)
    return f


@figure("Coupon", "Eight equal coupons Fr rising from a timeline, spanned by a brace, with "
        "the redemption at the end drawn only as a dashed outline", width=WID)
def coupon() -> Fig:
    f = vcard()

    y, h = 318, 90
    xs = timeline(f, y, 56, 300, 8,
                  labels=["0", "1", "2", "3", "4", "5", "6", "7", "8"])
    f.arrow(xs[8], y, xs[8], y - 2.5 * h, colour="var(--axis)", width=2, dash=True)
    f.text(xs[8], y - 2.5 * h - 8, "C", cls="sm dim")
    for k in range(1, 9):
        cash_arrow(f, xs[k], y, h, colour=BLUE, width=2.2)
    f.text(xs[1], y - h - 8, "Fr", cls="bold")
    brace(f, xs[1], xs[8], y + 32, depth=9, label="n coupons", colour=BLUE,
          label_cls="sm bold")
    return f


@figure("Coupon Rate", "Three price bars against the dashed redemption level: above it when "
        "the coupon rate exceeds the yield, level with it at par, below it when the yield is "
        "higher", width=WID)
def coupon_rate() -> Fig:
    f = vcard()

    cases = [("r > j", "premium", AMBER, 1.18),
             ("r = j", "par", GREEN, 1.0),
             ("r < j", "discount", BLUE, 0.84)]
    base_y, height = 330, 190
    f.line(40, base_y - height, 322, base_y - height, cls="thin dash",
           stroke="var(--dim)", stroke_width="1.2")
    f.text(34, base_y - height + 4, "C", cls="sm bold", anchor="end")
    for k, (rel, name, colour, ratio) in enumerate(cases):
        cx = 88 + k * 94
        h = height * ratio
        f.rect(cx - 32, base_y - h, 64, h, rx=4, fill=colour, fill_opacity="0.35",
               stroke=colour, stroke_width="1.3")
        f.text(cx, base_y - h - 8, name, cls="sm bold")
        f.text(cx, base_y + 20, rel, cls="bold")
    return f


@figure("Yield Rate", "The price–yield curve of the 1,000 par bond, read across from a "
        "market price of 920 and down to the yield j that produces it", width=WID)
def yield_rate() -> Fig:
    f = vcard()

    a = vaxes(f, 0.01, 0.10, 700, 1400, left=58, top=30)
    a.curve(lambda j: _bond_price(j), colour=BLUE, xa=0.012, xb=0.10)
    target, jstar = 920.0, 0.062
    a.hline(target, colour=AMBER, x_to=jstar)
    a.vline(jstar, y_top=target, colour=AMBER)
    a.point(jstar, target, colour=AMBER)
    a.label(0.015, target, "market price", cls="sm bold", anchor="start", dy=-7,
            fill=AMBER)
    a.frame(xlabel="yield", ylabel="price", xticks=[0.02, 0.05, 0.08],
            xfmt=lambda t: f"{t * 100:.0f}%", yticks=[800, 1000, 1200],
            yfmt=lambda t: f"{t:,.0f}")
    f.text(a.px(jstar), a.y1 + 16, "j", cls="sm bold")
    return f


@figure("Term of Bond", "Price against term for the 1,000 par bond at three yields: the "
        "longer the term, the further the price strays from par", width=WID)
def term_of_bond() -> Fig:
    f = vcard()

    a = vaxes(f, 0, 30, 650, 1450, left=58, top=30)
    for j, colour, lab, dy in ((0.03, AMBER, "j = 3%", -8), (0.05, "var(--dim)", "j = 5%", -8),
                               (0.07, BLUE, "j = 7%", 16)):
        a.curve(lambda n, jj=j: _bond_price(jj, n=max(n, 0.5)), colour=colour, xa=1,
                xb=30)
        a.label(30, _bond_price(j, n=30), lab, cls="sm bold", dx=-6, dy=dy, fill=colour,
                anchor="end")
    a.frame(xlabel="term n", ylabel="price", xticks=[0, 10, 20, 30],
            yticks=[800, 1000, 1200, 1400], yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Callable Bond", "Coupons to maturity with the redemption possible at any call date "
        "from the earliest call on: dashed arrows at each call date, a solid one at maturity",
        width=WID)
def callable_bond() -> Fig:
    f = vcard()

    y, h = 318, 200
    xs = timeline(f, y, 56, 300, 8, labels=["0", "", "", "", "", "", "", "", "n"])
    for k in range(1, 9):
        cash_arrow(f, xs[k], y, 36, colour=BLUE, width=2)
    for k in range(4, 8):                             # the issuer may call on any of these
        f.arrow(xs[k], y, xs[k], y - h, colour=AMBER, width=1.8, dash=True)
    cash_arrow(f, xs[8], y, h, colour=GREEN, width=2.2)
    f.text(xs[4], y - h - 8, "earliest call", cls="sm bold", fill=AMBER)
    f.text(xs[8], y - h - 8, "maturity", cls="sm bold", anchor="end", fill=GREEN)
    brace(f, xs[4], xs[8], y + 30, depth=9, colour=AMBER, label="call dates",
          label_cls="sm bold")
    return f


@figure("Non-Callable Bond", "A bullet bond's coupons and redemption on one timeline, "
        "the whole schedule fixed from issue to maturity", width=WID)
def non_callable_bond() -> Fig:
    f = vcard()

    y = 318
    xs = _bond_timeline(f, y, 8, coupon_h=44, redemption_h=210)
    brace(f, xs[0], xs[8], y + 32, depth=9, colour=GREEN, label="fixed term",
          label_cls="sm bold")
    return f


@figure("Call Price", "Coupons with a call date part-way along: the call price paid there "
        "stands a little above the dashed face-value level, and the coupons after it fade",
        width=WID)
def call_price() -> Fig:
    f = vcard()

    y, h, kc = 330, 190, 4
    xs = timeline(f, y, 56, 300, 8, labels=["0", "", "", "", "", "", "", "", "n"])
    for k in range(1, 9):
        f.raw(f'<g opacity="{1 if k <= kc else 0.35}">')
        cash_arrow(f, xs[k], y, 36, colour=BLUE, width=2)
        f.raw("</g>")
    f.line(xs[1] - 12, y - h, xs[8] + 14, y - h, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.2")
    f.text(xs[1] - 16, y - h + 4, "F", cls="bold", anchor="end")
    cash_arrow(f, xs[kc], y, 1.14 * h, colour=AMBER, label="call price",
               label_cls="sm bold", width=2.4)
    f.raw('<g opacity="0.35">')
    cash_arrow(f, xs[8], y, h, colour=GREEN, width=2.2)
    f.raw("</g>")
    return f


@figure("Call Premium", "The call premium shrinking to zero as maturity approaches",
        width=WID)
def call_premium() -> Fig:
    f = vcard()

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


@figure("Reinvestment of Coupons", "The 1,000 par bond's value at maturity against the rate "
        "its coupons are reinvested at: short of the promised amount below the 5% yield, "
        "ahead of it above", width=WID)
def reinvestment_of_coupons() -> Fig:
    f = vcard()

    j = 0.05
    coupon_amt = BOND_F * BOND_R
    av = lambda ri: coupon_amt * _acc(BOND_N, max(ri, 1e-4)) + BOND_C
    a = vaxes(f, 0.01, 0.09, 1480, 1800, left=62, top=30)
    target = av(j)
    for lo, hi, colour in ((0.012, j, ROSE), (j, 0.09, GREEN)):
        pts = [a.p(lo + (hi - lo) * t / 40, av(lo + (hi - lo) * t / 40)) for t in range(41)]
        f.polygon(pts + [a.p(hi, target), a.p(lo, target)], fill=colour,
                  fill_opacity="0.2", stroke="none")
    a.curve(av, colour=BLUE, xa=0.012, xb=0.09)
    a.hline(target, colour="var(--dim)")
    a.vline(j, y_top=target, colour=VIOLET)
    a.point(j, target, colour=VIOLET)
    a.label(0.03, 1596, "short", cls="sm bold", fill=ROSE)
    a.label(0.075, 1686, "ahead", cls="sm bold", fill=GREEN)
    a.frame(xlabel="reinvestment rate", ylabel="accumulated value",
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


@figure("Duration", "The present values of the 1,000 par bond's cash flows standing as "
        "weights on the time axis, which balances on a fulcrum at 8.11", width=WID)
def duration() -> Fig:
    f = vcard()

    j = 0.05
    pv = [(t, c * (1 + j) ** -t) for t, c in _dur_cashflows()]
    dmac, _ = _macaulay(j)
    a = vaxes(f, 0, BOND_N + 0.8, 0, 700, left=54, top=20, bottom=60)
    a.bars(pv, colour=BLUE, opacity="0.7")
    a.frame(ylabel="PV", xticks=[1, 5, 10], yticks=[0, 300, 600], arrows=False,
            yfmt=lambda t: f"{t:,.0f}")
    # the time axis is a beam: the fulcrum under it sits where the weights balance
    px = a.px(dmac)
    f.line(a.x0, a.y1, a.x1, a.y1, cls="", stroke=AMBER, stroke_width="2.4")
    f.polygon([(px, a.y1 + 2), (px - 13, a.y1 + 24), (px + 13, a.y1 + 24)], fill=AMBER)
    f.text(px, a.y1 + 40, f"{dmac:.2f}", cls="sm bold")
    return f


@figure("Macaulay Duration", "Each cash flow's share of the bond's price as a bar at its "
        "time, the weights' average time marked by a line at 8.11", width=WID)
def macaulay_duration() -> Fig:
    f = vcard()

    j = 0.05
    pv = [(t, c * (1 + j) ** -t) for t, c in _dur_cashflows()]
    dmac, price = _macaulay(j)
    a = vaxes(f, 0, BOND_N + 0.8, 0, 0.72, left=54, top=30)
    a.bars([(t, v / price) for t, v in pv], colour=VIOLET, opacity="0.7")
    a.frame(xlabel="time t", ylabel="weight",
            xticks=list(range(1, BOND_N + 1)), yticks=[0, 0.25, 0.5],
            yfmt=lambda t: f"{t:g}")
    a.vline(dmac, colour=AMBER)
    f.text(a.px(dmac), a.y0 + 14, f"{dmac:.2f}", cls="sm bold", fill=AMBER)
    return f


@figure("Modified Duration", "The tangent line duration provides at the current yield",
        width=WID)
def modified_duration() -> Fig:
    f = vcard()

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


@figure("1st-Order Linear Approximation", "The price–yield curve with its tangent at 5%: "
        "at yields either side the tangent's estimate falls short of the true price by the "
        "red gaps", width=WID)
def first_order_approximation() -> Fig:
    f = vcard()

    j0 = 0.05
    p0 = _bond_price(j0)
    dmac, _ = _macaulay(j0)
    dmod = dmac / (1 + j0)
    tangent = lambda jj: p0 - dmod * p0 * (jj - j0)
    a = vaxes(f, 0.02, 0.08, 740, 1300, left=58, top=24)
    a.curve(lambda j: _bond_price(j), colour=BLUE, xa=0.02, xb=0.08)
    a.polyline([(0.02, tangent(0.02)), (0.08, tangent(0.08))], colour=AMBER, width=1.6)
    a.point(j0, p0, colour="var(--dim)", r=3.2)
    for jj in (0.03, 0.07):
        true = _bond_price(jj)
        f.line(a.px(jj), a.py(true), a.px(jj), a.py(tangent(jj)), cls="", stroke=ROSE,
               stroke_width="2.6")
        a.point(jj, true, colour=BLUE, r=3)
        a.point(jj, tangent(jj), colour=AMBER, r=3)
    a.label(0.0205, _bond_price(0.0205), "true price", cls="sm bold", anchor="start",
            dx=8, dy=-2, fill=BLUE)
    a.label(0.0785, tangent(0.0785), "duration estimate", cls="sm bold", anchor="end",
            dy=16, fill=AMBER)
    a.frame(xlabel="yield j", xticks=[0.03, 0.05, 0.07],
            xfmt=lambda t: f"{t * 100:.0f}%", yticks=[900, 1100],
            yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Convexity", "A long bond's curved price–yield line against its straight duration "
        "tangent, the shaded gap between them the convexity the tangent misses", width=WID)
def convexity() -> Fig:
    f = vcard()

    n_long, j0 = 30, 0.05
    price = lambda j: _bond_price(j, n=n_long)
    p0 = price(j0)
    dmac, _ = _macaulay(j0, flows=_dur_cashflows(n=n_long))
    dmod = dmac / (1 + j0)
    lo, hi = 0.015, 0.09
    a = vaxes(f, lo, hi, 500, 1950, left=58, top=24)
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
    a.label(0.024, 1620, "convexity", cls="sm bold", anchor="start", fill=GREEN)
    a.label(0.052, price(0.052), "price", cls="sm bold", anchor="start", dx=8, dy=-8,
            fill=BLUE)
    a.label(0.074, p0 - dmod * p0 * (0.074 - j0), "tangent", cls="sm bold",
            anchor="end", dx=-4, dy=14, fill=AMBER)
    a.frame(xlabel="yield j", xticks=[0.02, 0.05, 0.08],
            xfmt=lambda t: f"{t * 100:.0f}%", yticks=[700, 1100, 1500, 1900],
            yfmt=lambda t: f"{t:,.0f}")
    return f


@figure("Portfolio", "Three holdings of 300k, 500k and 200k standing at their durations of "
        "2.1, 6.4 and 14.2 on a beam, which balances on a fulcrum at the portfolio's 6.67",
        width=WID)
def portfolio() -> Fig:
    f = vcard()

    holdings = [(300_000, 2.1, BLUE), (500_000, 6.4, VIOLET), (200_000, 14.2, ROSE)]
    total_v = sum(v for v, _, _ in holdings)
    port_d = sum(v * d for v, d, _ in holdings) / total_v

    y, x0, s, bw = 290, 44, 18.0, 34                  # s: pixels per year of duration
    for val, dur, colour in holdings:
        h = 180 * val / 500_000
        f.rect(x0 + s * dur - bw / 2, y - h, bw, h, rx=3, fill=colour, fill_opacity="0.4",
               stroke=colour, stroke_width="1.3")
        f.text(x0 + s * dur, y - h - 8, f"{val / 1000:,.0f}k", cls="sm bold")
    f.line(x0, y, x0 + s * 15.5, y, cls="", stroke=AMBER, stroke_width="2.4")
    for t in (0, 5, 10, 15):
        f.line(x0 + s * t, y, x0 + s * t, y + 4, cls="tick")
        f.text(x0 + s * t, y + 18, str(t), cls="sm dim")
    px = x0 + s * port_d
    f.polygon([(px, y + 2), (px - 13, y + 24), (px + 13, y + 24)], fill=AMBER)
    f.text(px, y + 40, f"{port_d:.2f}", cls="sm bold")
    f.text(x0 + s * 15.5, y + 40, "duration", cls="sm dim", anchor="end")
    return f


@figure("Spot Rate", "Spot rates as the yield on each zero-coupon maturity", width=WID)
def spot_rate() -> Fig:
    f = vcard()

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


@figure("Forward Rate", "One unit grown to year 3 two ways — at the 3-year spot rate all "
        "the way, or at the 2-year spot rate and then the forward rate for year 3 — both "
        "arriving at the same value", width=WID)
def forward_rate() -> Fig:
    f = vcard()

    s2, s3 = 0.035, 0.039                             # the spot curve's 2- and 3-year rates
    fwd = (1 + s3) ** 3 / (1 + s2) ** 2 - 1
    a = vaxes(f, 0, 3.3, 0.99, 1.135, left=44, top=24)
    a.curve(lambda t: (1 + s3) ** t, colour=VIOLET, xa=0, xb=3)
    a.curve(lambda t: (1 + s2) ** t, colour=BLUE, xa=0, xb=2)
    a.curve(lambda t: (1 + s2) ** 2 * (1 + fwd) ** (t - 2), colour=AMBER, xa=2, xb=3,
            width=2.6)
    a.point(2, (1 + s2) ** 2, colour=BLUE, r=3.4)
    a.point(3, (1 + s3) ** 3, colour=VIOLET, r=4.5)
    a.label(1.5, (1 + s3) ** 1.5, "s₃", cls="bold", dx=-8, dy=-8, fill=VIOLET)
    a.label(1.2, (1 + s2) ** 1.2, "s₂", cls="bold", dx=8, dy=16, fill=BLUE)
    a.label(2.5, (1 + s2) ** 2 * (1 + fwd) ** 0.5, "f₂,₃", cls="bold", dx=10, dy=14,
            fill=AMBER)
    a.frame(xlabel="year", xticks=[0, 1, 2, 3], yticks=[1], yfmt=lambda t: "1")
    return f


@figure("Yield Curve", "Normal, flat and inverted term structures on one set of axes",
        width=WID)
def yield_curve() -> Fig:
    f = vcard()

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


@figure("Duration Matching", "Two asset payments above a timeline and one liability below "
        "it, equal in value, with the assets' balance point and the liability's falling on "
        "the same dashed line", width=WID)
def duration_matching() -> Fig:
    f = vcard()

    y, u = 220, 120                                    # u: the height of the total value
    xs = timeline(f, y, 56, 300, 8, labels=["0", "", "", "", "", "", "", "", ""])
    # 2 and 7 weighted 2 : 3 balance at 5, where the liability falls
    for k, w in ((2, 0.4), (7, 0.6)):
        cash_arrow(f, xs[k], y, u * w, colour=BLUE, width=2.4)
    f.text(xs[7], y - u * 0.6 - 8, "assets", cls="sm bold")
    cash_arrow(f, xs[5], y, u, colour=ROSE, up=False, width=2.4)
    f.text(xs[5], y + u + 18, "liability", cls="sm bold")
    f.line(xs[5], y - u + 6, xs[5], y - 6, cls="thin dash", stroke=VIOLET,
           stroke_width="1.6")
    f.polygon([(xs[5], y - 2), (xs[5] - 8, y - 14), (xs[5] + 8, y - 14)], fill=VIOLET)
    f.text(xs[5], y - u - 2, "D", cls="bold", fill=VIOLET)
    return f


@figure("Immunization", "Surplus against a shift in yield: the immunized curve bottoms out "
        "at zero and rises either way, the unmatched one falls below zero", width=WID)
def immunization() -> Fig:
    f = vcard()

    a = vaxes(f, -0.03, 0.03, -20, 30, left=58, top=30)
    a.curve(lambda d: 25000 * d * d, colour=GREEN)
    a.curve(lambda d: -450 * d - 3000 * d * d, colour=ROSE, dash=True)
    a.hline(0, colour="var(--dim)", dash=False)
    a.frame(ylabel="surplus", xticks=[-0.02, 0.02],
            xfmt=lambda t: f"{t * 100:+.0f}%", yticks=[-15, 0, 15],
            yfmt=lambda t: f"{t:g}")
    f.text(a.x1, a.y1 + 30, "Δj", cls="sm dim", anchor="end")
    a.label(0.020, 25, "immunized", cls="sm bold", anchor="end", fill=GREEN)
    a.label(0.027, -14, "not immunized", cls="sm bold", anchor="end", fill=ROSE)
    return f


@figure("Redington Immunization", "Surplus against a shift in yield: a local minimum of "
        "zero at the current yield, positive for small shifts either way, negative again for "
        "large ones", width=WID)
def redington_immunization() -> Fig:
    f = vcard()

    s_fn = lambda d: 30000 * d * d - 30e6 * d ** 4
    edge = 0.001 ** 0.5                                # where the surplus turns negative
    a = vaxes(f, -0.04, 0.04, -30, 12, left=48, top=24)
    a.area(s_fn, -edge, edge, colour=GREEN, opacity="0.22", base=0)
    for lo, hi in ((-0.04, -edge), (edge, 0.04)):
        pts = [a.p(lo + (hi - lo) * k / 30, s_fn(lo + (hi - lo) * k / 30))
               for k in range(31)]
        f.polygon(pts + [a.p(hi, 0), a.p(lo, 0)], fill=ROSE, fill_opacity="0.2",
                  stroke="none")
    a.curve(s_fn, colour=GREEN)
    a.hline(0, colour="var(--dim)", dash=False)
    a.point(0, 0, colour=AMBER, r=4)
    a.label(0, 0, "local minimum", cls="sm bold", dy=18)
    a.frame(ylabel="surplus", xticks=[-0.02, 0.02], xfmt=lambda t: f"{t * 100:+.0f}%",
            yticks=[-20, 0, 10], yfmt=lambda t: f"{t:g}")
    f.text(a.x1, a.y1 + 30, "Δj", cls="sm dim", anchor="end")
    return f


@figure("Full Immunization", "A liability below the timeline with an asset payment on each "
        "side of it above, the pair shielding it", width=WID)
def full_immunization() -> Fig:
    f = vcard()

    y, h = 230, 110
    xs = timeline(f, y, 56, 300, 8, labels=["0", "", "", "", "", "", "", "", ""])
    for k in (2, 7):
        cash_arrow(f, xs[k], y, h, colour=BLUE, label="asset", label_cls="sm bold",
                   width=2.4)
    cash_arrow(f, xs[5], y, h, colour=ROSE, label="liability", label_cls="sm bold",
               up=False, width=2.4)
    shield(f, xs[5], y - 62, 64, GREEN)
    return f


@figure("Asset-Liability Portfolio", "Asset cash flows rising above the timeline set "
        "against the liability outflows they fund falling below it", width=WID)
def asset_liability_portfolio() -> Fig:
    f = vcard()

    y, k_h = 226, 2.2
    xs = timeline(f, y, 52, 302, 8, labels=["0"] + [""] * 8)
    assets = {1: 28, 2: 36, 3: 32, 4: 44, 5: 32, 6: 36, 7: 28, 8: 66}
    liabs = {2: 32, 4: 40, 6: 32, 8: 54}
    for k, h in assets.items():
        cash_arrow(f, xs[k] - 5, y, h * k_h, colour=BLUE, width=2.2)
    for k, h in liabs.items():
        cash_arrow(f, xs[k] + 5, y, h * k_h, colour=ROSE, up=False, width=2.2)
    f.text(xs[1] - 5, y - 28 * k_h - 10, "assets", cls="sm bold")
    f.text(xs[2] + 5, y + 32 * k_h + 18, "liabilities", cls="sm bold")
    return f


@figure("Annuity Immediate", "Five periods shaded along a timeline, each ending in a "
        "payment of 1 at its right edge, with a₍ₙ₎ marked one period before the first "
        "payment and s₍ₙ₎ at the last", width=WID)
def annuity_immediate() -> Fig:
    f = vcard()

    y, n, h = 330, 5, 150
    xs = timeline(f, y, 66, 300, n, labels=["0", "1", "2", "3", "4", "5"])
    for k in range(1, n + 1):                         # the period, paid for at its end
        f.rect(xs[k - 1] + 3, y - h, xs[k] - xs[k - 1] - 6, h - 2, rx=4, fill=BLUE,
               fill_opacity="0.1" if k % 2 else "0.18")
        cash_arrow(f, xs[k], y, h, colour=BLUE, width=2.2)
    f.text(xs[1], y - h - 8, "1", cls="bold")
    f.line(xs[0], y - h - 44, xs[0], y - 6, cls="thin dash", stroke=AMBER,
           stroke_width="1.6")
    f.text(xs[0], y - h - 52, "a₍ₙ₎", cls="bold", fill=AMBER)
    f.line(xs[n], y - h - 44, xs[n], y - h - 16, cls="thin dash", stroke=GREEN,
           stroke_width="1.6")
    f.text(xs[n], y - h - 52, "s₍ₙ₎", cls="bold", fill=GREEN)
    return f
