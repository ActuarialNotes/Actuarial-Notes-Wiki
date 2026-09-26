"""Figures for the Exam 5 (CAS) concept pages — ratemaking and reserving.

Same contract as `figures_exam_p.py` / `figures_exam_fm.py` /
`figures_exam_mas_i.py` / `figures_exam_mas_ii.py`: each builder returns a `Fig`
from `vcard()` carrying one picture and nothing else — no title, no formula, no
caption, no table. Grouped in syllabus order:

A. Ratemaking — data aggregation, premium, losses, trend, expenses, the overall
   indication, classification and individual risk rating
B. Estimating claim liabilities — triangles, development factors, the reserving
   methods, operational distortions, recoveries and monitoring

Two running examples hold the families together, as on the other exams.

*Ratemaking* is one personal-auto book throughout: a projected pure premium of
$360 per exposure, $25 of fixed expense, 26% variable expense and a 5% profit
provision — so the permissible loss ratio is 0.69, the indicated rate is
$385 / 0.69 = $557.97 against a current average rate of $520, and the indication
is +7.3%. Every expense, premium and indication figure prices that same book.

*Reserving* is one 5×5 cumulative reported triangle ($000s) whose selected
age-to-age factors are 1.500, 1.160, 1.060 and 1.020 with a 1.010 tail, so
CDF(12) = 1.900 and 52.6% of AY 2024 has been reported. Its four ultimates for
AY 2024 sit in a fixed order that several figures refer back to: expected loss
2,600, BF 2,732, Benktander 2,794, chain ladder 2,850.

The figures are generated — edit the builder, not the SVG. See
`docs/concept-figures.md`.
"""

from __future__ import annotations

import math

from figure_kit import (
    AMBER, BLUE, GREEN, ROSE, TEAL, VIOLET,
    Axes, Fig, brace, vaxes, vcard,
    BCX, BCY,
    building, car, coins, document, house, person, scales, shield, tower,
)
from figure_registry import figure

WID = 340   # the |NNN| every portrait embed asks for


# ── the running ratemaking book ──────────────────────────────────────────────
PP = 360.0                      # projected pure premium per exposure
FIXED = 25.0                    # fixed expense per exposure
VAR = 0.26                      # variable expense provision
PROF = 0.05                     # target underwriting profit provision
PLR = 1 - VAR - PROF            # 0.69 — the permissible loss ratio
CUR_RATE = 520.0                # current average rate
IND_RATE = (PP + FIXED) / PLR   # 557.97
IND_CHG = IND_RATE / CUR_RATE - 1   # +7.3%

# ── the running reserving triangle (cumulative reported, $000) ───────────────
AYS = ["2020", "2021", "2022", "2023", "2024"]
AGES = ["12", "24", "36", "48", "60"]
LDF = [1.500, 1.160, 1.060, 1.020]
TAIL = 1.010

TRI = [
    [1000, 1500, 1740, 1845, 1882],
    [1100, 1650, 1914, 2029],
    [1200, 1800, 2088],
    [1350, 2025],
    [1500],
]
PAID = [
    [400, 950, 1400, 1700, 1830],
    [440, 1045, 1540, 1870],
    [480, 1140, 1681],
    [540, 1282],
    [600],
]
CNT = [
    [620, 806, 858, 877, 886],
    [640, 832, 886, 906],
    [660, 858, 914],
    [680, 884],
    [700],
]
CNT_LDF = [1.300, 1.065, 1.022, 1.010]

EP = [3000, 3200, 3500, 3800, 4000]   # earned premium by AY ($000)
ELR = 0.65                            # a priori loss ratio


def _cdf(age: int) -> float:
    """Cumulative development factor from `age` (0-indexed column) to ultimate."""
    out = TAIL
    for f in LDF[age:]:
        out *= f
    return out


CDF = [_cdf(k) for k in range(5)]      # 1.900, 1.267, 1.092, 1.030, 1.010
PCT_RPT = 1 / CDF[0]                   # 52.6% of AY 2024 reported
U_CL = TRI[4][0] * CDF[0]              # 2,850 chain ladder
U_EL = ELR * EP[4]                     # 2,600 expected loss
U_BF = TRI[4][0] + (1 - PCT_RPT) * U_EL          # 2,732
U_GB = TRI[4][0] + (1 - PCT_RPT) * U_BF          # 2,794


def _money(v: float, dp: int = 0) -> str:
    return f"{v:,.{dp}f}"


# ── shared drawing helpers ───────────────────────────────────────────────────


def _fill_triangle(f: Fig, rows, x0, y0, cw, ch, scale, colour=BLUE, ncols=5,
                   ring=None, ring_colour=ROSE):
    """A development triangle drawn as cells that fill up as losses develop.

    Each known cell holds a bar whose height is its value over `scale`, so a
    row reads as a cohort climbing towards its ultimate. The cells still to
    come are left as dashed outlines. Returns a (row, col) → (cx, cy) map.
    """
    at = {}
    for i in range(len(rows)):
        for j in range(ncols):
            cx, cy = x0 + cw * (j + 0.5), y0 + ch * (i + 0.5)
            at[(i, j)] = (cx, cy)
            x, y, w, h = cx - cw / 2 + 2, cy - ch / 2 + 2, cw - 4, ch - 4
            if j >= len(rows[i]):
                f.rect(x, y, w, h, rx=3, fill="none", stroke="var(--edge)",
                       stroke_width="1", stroke_dasharray="3 3")
                continue
            f.rect(x, y, w, h, rx=3, fill="var(--soft)", stroke="var(--edge)",
                   stroke_width="1")
            fh = (h - 6) * rows[i][j] / scale
            f.rect(x + 5, y + h - 3 - fh, w - 10, fh, rx=2, fill=colour,
                   fill_opacity="0.75")
            if ring and ring(i, j):
                f.rect(x, y, w, h, rx=3, fill="none", stroke=ring_colour,
                       stroke_width="1.8")
    return at


def _policy_bars(f: Fig, y0, spans, x0=48, x1=318, t0=0.0, t1=3.0, gap=22,
                 colour=BLUE, height=11, labels=None):
    """Policy terms drawn as bars on a shared calendar-time axis.

    `spans` is a list of (start, end) in years from `t0`. Returns bar y centres.
    """
    def px(t):
        return x0 + (x1 - x0) * (t - t0) / (t1 - t0)

    ys = []
    for i, (a, b) in enumerate(spans):
        y = y0 + i * gap
        f.rect(px(a), y - height / 2, px(b) - px(a), height, rx=3, fill=colour,
               fill_opacity="0.34", stroke=colour, stroke_width="1.1")
        if labels:
            f.text(px(a) - 6, y + 4, labels[i], cls="sm dim", anchor="end")
        ys.append(y)
    return px, ys


def _calendar_axis(f: Fig, y, years, x0=48, x1=318, band=None, band_colour=AMBER,
                   y_top=None, label_dy=16):
    """A year axis with boundary rules; optionally shades one whole year."""
    n = len(years)
    step = (x1 - x0) / n
    top = y_top if y_top is not None else y - 96
    if band is not None:
        f.rect(x0 + step * band, top, step, y - top, rx=3, fill=band_colour,
               fill_opacity="0.13")
    for k in range(n + 1):
        x = x0 + step * k
        f.line(x, top, x, y, cls="grid")
    f.arrow(x0 - 8, y, x1 + 16, y, colour="var(--axis)", width=1.2)
    for k, name in enumerate(years):
        f.text(x0 + step * (k + 0.5), y + label_dy, name, cls="sm dim")
    return lambda t: x0 + step * t


# ═══════════════════════════════════════════════════════════════════════════
# A. Ratemaking — the framework
# ═══════════════════════════════════════════════════════════════════════════

@figure("Ratemaking", "A $558 premium column standing level with the stack it has to "
        "pay for: $360 of losses and LAE, $170 of expenses and $28 of profit", width=WID)
def ratemaking() -> Fig:
    f = vcard()

    top, base = 94, 352
    k = (base - top) / IND_RATE
    mid = (top + base) / 2
    f.rect(44, top, 84, base - top, rx=4, fill=VIOLET, fill_opacity="0.30",
           stroke=VIOLET, stroke_width="1.2")
    f.text(86, mid + 4, _money(IND_RATE), cls="bold")
    f.text(86, base + 20, "premium", cls="sm dim")
    for dy in (-5, 5):
        f.line(144, mid + dy, 164, mid + dy, cls="", stroke="var(--ink)",
               stroke_width="2.4", stroke_linecap="round")

    y = base
    for value, name, colour in ((PP, "loss & LAE", BLUE),
                                (FIXED + VAR * IND_RATE, "expenses", AMBER),
                                (PROF * IND_RATE, "profit", GREEN)):
        h = value * k
        f.rect(180, y - h, 84, h, rx=3, fill=colour, fill_opacity="0.30",
               stroke=colour, stroke_width="1.2")
        f.text(222, y - h / 2 + 4, _money(value), cls="sm")
        f.text(274, y - h / 2 + 4, name, cls="sm", anchor="start")
        y -= h
    return f


@figure("Exposure Base", "Expected loss rising in a straight line with car-years, each "
        "extra car adding the same $360", width=WID)
def exposure_base() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 5, 0, 2000, left=52, right=18, top=30)
    ax.frame(xticks=[0, 1, 2, 3, 4, 5], yticks=[0, 1000, 2000],
             yfmt=lambda t: f"{t:,.0f}", grid=True, xlabel="car-years",
             ylabel="expected loss")
    ax.curve(lambda x: PP * x, colour=BLUE, width=2.4)
    ax.polyline([(3, PP * 3), (4, PP * 3), (4, PP * 4)], colour=AMBER, width=1.6,
                dash=True)
    ax.label(4, PP * 3.5, "+360", cls="sm bold", anchor="start", dx=7, dy=4)
    car(f, ax.px(3.5), ax.py(PP * 3) + 20, 36, AMBER)
    for x in (1, 2, 3, 4):
        ax.point(x, PP * x, colour=BLUE, r=3.4)
    return f


@figure("Line of Business", "Four lines of business — auto, home, workers comp and "
        "liability — each with its own indicated rate change", width=WID)
def line_of_business() -> Fig:
    f = vcard()

    rows = [("Personal auto", car, 50, 7.3, BLUE),
            ("Homeowners", house, 38, 12.5, AMBER),
            ("Workers comp", person, 38, -2.4, GREEN),
            ("General liability", tower, 36, 4.1, VIOLET)]
    x_zero, scale = 176, 9.0
    f.line(x_zero, 78, x_zero, 380, cls="rule")
    for i, (name, icon, size, chg, colour) in enumerate(rows):
        y = 98 + i * 80
        icon(f, 66, y, size, colour)
        f.text(66, y + 36, name, cls="sm")
        w = abs(chg) * scale
        x = x_zero if chg > 0 else x_zero - w
        f.rect(x, y - 11, w, 22, rx=3, fill=colour, fill_opacity="0.65")
        f.text(x_zero + (w + 8 if chg > 0 else -w - 8), y + 4,
               f"{chg:+.1f}%".replace("-", "−"), cls="sm",
               anchor="start" if chg > 0 else "end")
    return f


@figure("Ratemaking Data Organization", "The four data aggregations placed along a "
        "falling line of accuracy against availability, policy year at the accurate end "
        "and calendar year at the available end", width=WID)
def ratemaking_data_organization() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 10, left=44, right=20, top=34, bottom=36)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.curve(lambda x: 10.4 - 0.95 * x, colour="var(--dim)", width=1.3, dash=True,
             xa=0.6, xb=9.4)
    pts = [(8.6, 2.2, "Calendar", GREEN), (5.4, 6.0, "Accident", BLUE),
           (5.0, 4.2, "Report", TEAL), (1.8, 8.8, "Policy", AMBER)]
    for x, y, name, colour in pts:
        ax.point(x, y, colour=colour, r=5)
        ax.label(x, y, name, cls="sm bold", fill=colour, dy=-11)
    f.text(ax.x0 - 6, ax.y0 - 14, "accuracy", cls="sm dim", anchor="start")
    f.text(ax.x1, ax.y1 + 20, "availability", cls="sm dim", anchor="end")
    return f


@figure("Calendar Year", "Five policies crossing a shaded calendar year 2024, the part "
        "of each that falls inside the year picked out, whichever year it was written",
        width=WID)
def calendar_year() -> Fig:
    f = vcard()

    px = _calendar_axis(f, 350, ["2023", "2024", "2025"], band=1, y_top=100)
    spans = [(0.20, 1.20), (0.55, 1.55), (0.95, 1.95), (1.30, 2.30), (1.70, 2.70)]
    _, ys = _policy_bars(f, 128, spans, gap=46, height=14)
    for (a, b), y in zip(spans, ys):
        lo, hi = max(a, 1.0), min(b, 2.0)
        f.rect(px(lo), y - 7, px(hi) - px(lo), 14, rx=3, fill=AMBER,
               fill_opacity="0.8")
    f.text(px(1.5), 88, "CY 2024", cls="sm bold")
    return f


@figure("Policy Year", "The policies that incept in 2024 highlighted in full, running "
        "on into 2025, while the one written in 2023 is left out", width=WID)
def policy_year() -> Fig:
    f = vcard()

    px = _calendar_axis(f, 350, ["2023", "2024", "2025"], band=1, y_top=100)
    spans = [(0.62, 1.62), (1.05, 2.05), (1.35, 2.35), (1.62, 2.62), (1.90, 2.90)]
    for i, (a, b) in enumerate(spans):
        y = 128 + i * 46
        colour = AMBER if 1.0 <= a < 2.0 else "var(--axis)"
        f.rect(px(a), y - 7, px(b) - px(a), 14, rx=3, fill=colour,
               fill_opacity="0.45" if colour == AMBER else "0.3", stroke=colour,
               stroke_width="1.1")
        f.circle(px(a), y, 4.6, fill=colour)
    f.text(px(1.5), 88, "PY 2024", cls="sm bold")
    return f


@figure("Accident Year", "Accidents dotted along five policies, the four that happen in "
        "2024 picked out whichever policy they fall on", width=WID)
def accident_year() -> Fig:
    f = vcard()

    px = _calendar_axis(f, 350, ["2023", "2024", "2025"], band=1, y_top=100)
    spans = [(0.20, 1.20), (0.55, 1.55), (0.95, 1.95), (1.30, 2.30), (1.70, 2.70)]
    _, ys = _policy_bars(f, 128, spans, gap=46, height=14)
    events = [(0, 0.62), (0, 1.10), (1, 1.40), (2, 1.64), (3, 1.86), (3, 2.12),
              (4, 2.40)]
    for i, t in events:
        colour = ROSE if 1.0 <= t < 2.0 else "var(--dim)"
        f.circle(px(t), ys[i], 5, fill=colour)
    f.text(px(1.5), 88, "AY 2024", cls="sm bold")
    return f


@figure("Report Year", "Five claims drawn as arrows from accident to report date, the "
        "three reported during 2024 picked out", width=WID)
def report_year() -> Fig:
    f = vcard()

    px = _calendar_axis(f, 350, ["2023", "2024", "2025"], band=1, y_top=100)
    lags = [(0.25, 0.85), (0.55, 1.25), (0.90, 1.60), (1.30, 1.85), (1.55, 2.45)]
    for i, (acc, rpt) in enumerate(lags):
        y = 128 + i * 46
        colour = ROSE if 1.0 <= rpt < 2.0 else "var(--dim)"
        f.circle(px(acc), y, 4.6, fill=BLUE)
        f.arrow(px(acc) + 6, y, px(rpt) - 5, y, colour=colour, width=1.5)
        f.circle(px(rpt), y, 4.6, fill=colour)
    f.text(px(lags[1][0]), 162, "accident", cls="sm dim")
    f.text(px(lags[1][1]), 162, "report", cls="sm dim")
    f.text(px(1.5), 88, "RY 2024", cls="sm bold")
    return f


@figure("Close Year", "Five claims drawn as arrows from accident to settlement, the "
        "three closed during 2024 picked out", width=WID)
def close_year() -> Fig:
    f = vcard()

    px = _calendar_axis(f, 350, ["2023", "2024", "2025"], band=1, y_top=100)
    lags = [(0.15, 0.80), (0.30, 1.15), (0.55, 1.65), (0.95, 1.85), (1.25, 2.50)]
    for i, (acc, close) in enumerate(lags):
        y = 128 + i * 46
        colour = GREEN if 1.0 <= close < 2.0 else "var(--dim)"
        f.circle(px(acc), y, 4.6, fill=BLUE)
        f.arrow(px(acc) + 6, y, px(close) - 8, y, colour=colour, width=1.5)
        for d in (1, -1):
            f.line(px(close) - 5, y - 5 * d, px(close) + 5, y + 5 * d, cls="",
                   stroke=colour, stroke_width="2.2", stroke_linecap="round")
    f.text(px(lags[1][0]), 162, "accident", cls="sm dim")
    f.text(px(lags[1][1]), 162, "closed", cls="sm dim")
    f.text(px(1.5), 88, "Close year 2024", cls="sm bold")
    return f


@figure("In-Force", "A dashed valuation date cutting through five policies, the three "
        "it crosses highlighted as in force", width=WID)
def in_force() -> Fig:
    f = vcard()

    px = _calendar_axis(f, 350, ["2023", "2024", "2025"], y_top=100)
    spans = [(0.15, 1.15), (0.60, 1.60), (1.05, 2.05), (1.40, 2.40),
             (1.75, 2.75)]
    t = 1.50
    for i, (a, b) in enumerate(spans):
        y = 128 + i * 46
        live = a <= t < b
        colour = BLUE if live else "var(--axis)"
        f.rect(px(a), y - 7, px(b) - px(a), 14, rx=3, fill=colour,
               fill_opacity="0.45" if live else "0.3", stroke=colour,
               stroke_width="1.1")
    f.line(px(t), 98, px(t), 350, cls="thin dash", stroke=ROSE, stroke_width="1.6")
    for i, (a, b) in enumerate(spans):
        if a <= t < b:
            f.circle(px(t), 128 + i * 46, 4.8, fill=ROSE)
    f.text(px(t), 88, "valuation date", cls="sm bold")
    return f


@figure("Net of Reinsurance", "A 2,850 gross loss bar split into the 2,050 the insurer "
        "keeps and the 800 it cedes to the reinsurer", width=WID)
def net_of_reinsurance() -> Fig:
    f = vcard()

    gross, ceded = 2850, 800
    x0, x1, y0, h = 36, 324, 112, 44
    xs = x0 + (x1 - x0) * (gross - ceded) / gross
    f.text(BCX, y0 - 14, f"gross {_money(gross)}", cls="bold")
    parts = (((x0 + xs) / 2, x0, xs, gross - ceded, BLUE, "net", "insurer"),
             ((xs + x1) / 2, xs, x1, ceded, AMBER, "ceded", "reinsurer"))
    for cx, a, b, value, colour, name, who in parts:
        f.rect(a, y0, b - a, h, rx=4, fill=colour, fill_opacity="0.34",
               stroke=colour, stroke_width="1.2")
        f.text(cx, y0 + h / 2 + 4, _money(value), cls="sm")
        f.arrow(cx, y0 + h + 8, cx, 240, colour=colour, width=1.8)
        f.text(cx + 8, 208, name, cls="sm", anchor="start")
        tower(f, cx, 292, 70, colour)
        f.text(cx, 350, who, cls="sm bold")
    return f


@figure("Written Premium", "A $600 annual policy's written premium jumping to the full "
        "$600 on the day it is issued, while earned premium climbs to it over twelve "
        "months", width=WID)
def written_premium() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 12, 0, 690, left=48, right=20, top=32)
    ax.frame(xticks=[0, 3, 6, 9, 12], yticks=[0, 200, 400, 600], grid=True,
             xlabel="months", ylabel="premium")
    ax.polyline([(0, 0), (0, 600), (12, 600)], colour=AMBER, width=2.4)
    ax.polyline([(0, 0), (12, 600)], colour=BLUE, width=2.4)
    ax.label(6, 600, "written", cls="sm bold", dy=-8)
    ax.label(8.6, 372, "earned", cls="sm bold", dy=8)
    return f


@figure("Earned Premium", "A $600 annual policy's earned premium climbing in a straight "
        "line, with $400 earned by month eight", width=WID)
def earned_premium() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 12, 0, 690, left=48, right=20, top=32)
    ax.area(lambda t: 50 * t, 0, 8, colour=BLUE, opacity="0.20")
    ax.frame(xticks=[0, 4, 8, 12], yticks=[0, 200, 400, 600], grid=True,
             xlabel="months", ylabel="premium")
    ax.polyline([(0, 0), (12, 600)], colour=BLUE, width=2.4)
    ax.vline(8, colour=ROSE, y_top=400)
    ax.point(8, 400, colour=ROSE)
    ax.label(8, 400, "$400 earned", cls="sm bold", anchor="end", dx=-8, dy=-6)
    return f


@figure("Unearned Premium", "A $600 annual policy's unearned premium falling in a "
        "straight line to zero, with $200 still unearned at month eight", width=WID)
def unearned_premium() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 12, 0, 690, left=48, right=20, top=32)
    ax.area(lambda t: 600 - 50 * t, 0, 12, colour=AMBER, opacity="0.20")
    ax.frame(xticks=[0, 4, 8, 12], yticks=[0, 200, 400, 600], grid=True,
             xlabel="months", ylabel="premium")
    ax.polyline([(0, 600), (12, 0)], colour=AMBER, width=2.4)
    ax.point(8, 200, colour=ROSE)
    ax.label(8, 200, "$200 unearned", cls="sm bold", anchor="start", dx=8, dy=-6)
    return f


@figure("Earned Exposure", "One car on an annual policy earning exposure in a straight "
        "line, 0.50 car-years at six months and 1.00 at twelve", width=WID)
def earned_exposure() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 12, 0, 1.1, left=52, right=20, top=32)
    ax.frame(xticks=[0, 3, 6, 9, 12], yticks=[0, 0.5, 1.0],
             yfmt=lambda t: f"{t:.2f}", grid=True, xlabel="months",
             ylabel="car-years")
    ax.polyline([(0, 0), (12, 1.0)], colour=GREEN, width=2.4)
    for m, lab in ((6, "0.50"), (12, "1.00")):
        ax.point(m, m / 12, colour=GREEN)
        ax.label(m, m / 12, lab, cls="sm bold", anchor="end", dx=-7, dy=-5)
    car(f, ax.px(8.2), ax.py(0.3), 54, GREEN)
    return f


# ═══════════════════════════════════════════════════════════════════════════
# A. Ratemaking — grouping the data
# ═══════════════════════════════════════════════════════════════════════════

@figure("Homogeneity", "One tight loss-cost curve centred on the $360 rate beside a "
        "two-humped curve that the same rate fits badly", width=WID)
def homogeneity() -> Fig:
    f = vcard()

    def bump(x, mu, sd):
        return math.exp(-((x - mu) ** 2) / (2 * sd * sd))

    ax = Axes(f, 36, 104, 324, 350, 120, 640, 0, 1.12)
    curves = ((lambda x: 0.56 * bump(x, 230, 42) + 0.6 * bump(x, 520, 48), ROSE),
              (lambda x: bump(x, PP, 36), GREEN))
    for fn, colour in curves:
        ax.area(fn, 120, 640, colour=colour, opacity="0.16")
        ax.curve(fn, colour=colour, width=2.2)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    ax.vline(PP, colour="var(--dim)", dash=True)
    ax.label(PP, 1.12, "rate 360", cls="sm dim", dy=-8)
    ax.label(PP, 1.0, "homogeneous", cls="sm bold", anchor="start", dx=10, dy=4)
    ax.label(520, 0.6, "heterogeneous", cls="sm bold", dy=-10)
    f.text(ax.x1, ax.y1 + 18, "loss cost", cls="sm dim", anchor="end")
    return f


@figure("Credibility", "A beam balanced at +11.6%, carrying the statewide +7.3% with "
        "weight 0.60 at one end and the territory's own +18% with weight 0.40 at the "
        "other", width=WID)
def credibility() -> Fig:
    f = vcard()

    lo, hi, z = 7.3, 18.0, 0.40
    est = z * hi + (1 - z) * lo

    def bx(v):
        return 74 + (v - lo) / (hi - lo) * 220

    y = 268
    f.line(30, y, 330, y, cls="", stroke="var(--ink)", stroke_width="3",
           stroke_linecap="round")
    xf = bx(est)
    f.polygon([(xf, y + 2), (xf - 22, y + 50), (xf + 22, y + 50)], fill=GREEN,
              fill_opacity="0.3", stroke=GREEN, stroke_width="1.4")
    f.text(xf, y + 70, f"+{est:.1f}%", cls="bold")
    for v, w, name, colour in ((lo, 1 - z, "statewide", AMBER),
                               (hi, z, "territory", BLUE)):
        s = 118 * math.sqrt(w)
        f.rect(bx(v) - s / 2, y - 2 - s, s, s, rx=4, fill=colour,
               fill_opacity="0.34", stroke=colour, stroke_width="1.2")
        f.text(bx(v), y - 2 - s / 2 + 4, f"{w:.2f}", cls="sm")
        f.text(bx(v), y - s - 12, name, cls="sm bold")
        f.text(bx(v), y + 18, f"+{v:g}%", cls="sm")
    return f


@figure("Loss and Loss Adjustment Expense", "The $360 pure premium drawn as a column: "
        "$300 of indemnity to the claimant, $36 of ALAE tied to the claim file, and $24 "
        "of ULAE for the claims department", width=WID)
def loss_and_lae() -> Fig:
    f = vcard()

    top, base, x0, w = 94, 356, 60, 76
    k = (base - top) / PP
    y = top
    rows = [(300, "indemnity", person, BLUE, 146),
            (36, "ALAE", document, TEAL, 254),
            (24, "ULAE", tower, AMBER, 344)]
    for amount, name, icon, colour, row_y in rows:
        h = amount * k
        f.rect(x0, y, w, h, rx=3, fill=colour, fill_opacity="0.32", stroke=colour,
               stroke_width="1.2")
        f.line(x0 + w + 4, y + h / 2, 176, row_y, cls="thin", stroke=colour,
               stroke_width="1")
        icon(f, 200, row_y, 40, colour)
        f.text(230, row_y + 4, f"{name} {amount}", cls="sm bold", anchor="start")
        y += h
    return f


@figure("Pure Premium", "A rectangle 0.060 claims per car-year wide and $6,000 per claim "
        "tall, whose area is the $360 pure premium", width=WID)
def pure_premium() -> Fig:
    f = vcard()

    freq, sev = 0.060, 6000
    ax = vaxes(f, 0, 0.08, 0, 8000, left=52, right=18, top=30)
    ax.frame(xticks=[0, 0.02, 0.04, 0.06, 0.08], yticks=[0, 2000, 4000, 6000, 8000],
             xfmt=lambda t: f"{t:.2f}" if t else "0",
             yfmt=lambda t: f"{t:,.0f}", grid=True, xlabel="frequency",
             ylabel="severity")
    (xa, ya), (xb, yb) = ax.p(0, 0), ax.p(freq, sev)
    f.rect(xa, yb, xb - xa, ya - yb, fill=GREEN, fill_opacity="0.3", stroke=GREEN,
           stroke_width="1.6")
    f.text((xa + xb) / 2, (ya + yb) / 2 + 4, "$360", cls="bold")
    return f


@figure("Loss Ratio", "A $520 premium column filled to 69.2% by $360 of losses, the "
        "other 30.8% left for expenses and profit", width=WID)
def loss_ratio() -> Fig:
    f = vcard()

    x0, x1, top, base = 84, 204, 100, 356
    level = base - (base - top) * PP / CUR_RATE
    f.rect(x0, top, x1 - x0, base - top, rx=5, fill="var(--soft)",
           stroke="var(--edge)", stroke_width="1.2")
    f.rect(x0, level, x1 - x0, base - level, rx=5, fill=BLUE, fill_opacity="0.34",
           stroke=BLUE, stroke_width="1.2")
    f.text((x0 + x1) / 2, top - 10, f"premium {CUR_RATE:.0f}", cls="sm bold")
    f.text((x0 + x1) / 2, (level + base) / 2 + 4, f"losses {PP:.0f}", cls="sm")
    xd = x1 + 20
    for a, b, colour, share in ((level, base, BLUE, PP / CUR_RATE),
                                (top, level, "var(--dim)", 1 - PP / CUR_RATE)):
        f.line(xd, a + 2, xd, b - 2, cls="", stroke=colour, stroke_width="1.6")
        for y in (a + 2, b - 2):
            f.line(xd - 5, y, xd + 5, y, cls="", stroke=colour, stroke_width="1.6")
        f.text(xd + 12, (a + b) / 2 + 4, f"{share:.1%}",
               cls="bold" if colour == BLUE else "sm dim", anchor="start")
    return f


@figure("Loss Development", "AY 2024's reported losses growing from 1,500 at 12 months "
        "to an ultimate of 2,850, a factor of 1.900", width=WID)
def loss_development() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 84, 0, 3200, left=52, right=22, top=32)
    ax.frame(xticks=[12, 24, 36, 48, 60, 72, 84], yticks=[0, 1500, 3000],
             yfmt=lambda t: f"{t:,.0f}", grid=True, xlabel="months")
    pattern = [(12, 1500), (24, 2250), (36, 2610), (48, 2767), (60, 2822),
               (72, 2845), (84, 2850)]
    ax.polyline(pattern, colour=BLUE, width=2.4)
    for x, y in pattern:
        ax.point(x, y, colour=BLUE, r=3)
    ax.hline(2850, colour=GREEN, x_to=84)
    ax.label(46, 2850, "ultimate 2,850", cls="sm bold", dy=-8)
    ax.point(12, 1500, colour=ROSE, r=4.4)
    ax.label(12, 1500, "1,500 reported", cls="sm bold", anchor="start", dx=8, dy=14)
    f.arrow(ax.px(12), ax.py(1560), ax.px(12), ax.py(2790), colour=AMBER, width=1.8)
    f.text(ax.px(12) - 6, ax.py(2200), "× 1.900", cls="sm bold", anchor="end")
    return f


@figure("Loss Trend", "A pure premium of 360 trended at 5% a year across the 2.75 "
        "years from the experience period to the new rates, arriving at 411", width=WID)
def loss_trend() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 4.0, 300, 460, left=52, right=20, top=36, bottom=64)
    ax.frame(xticks=[0, 2.75], yticks=[300, 380, 460],
             xfmt=lambda t: "new rates" if t else "experience",
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    ax.curve(lambda x: PP * 1.05 ** x, colour=BLUE, width=2.4)
    ax.vline(0.0, colour=AMBER, y_top=PP)
    ax.vline(2.75, colour=GREEN, y_top=PP * 1.05 ** 2.75)
    ax.point(0.0, PP, colour=AMBER, r=4.2)
    ax.label(0.0, PP, "360", cls="sm bold", anchor="start", dx=6, dy=16)
    ax.point(2.75, PP * 1.05 ** 2.75, colour=GREEN, r=4.2)
    ax.label(2.75, PP * 1.05 ** 2.75, "411", cls="sm bold", anchor="end", dx=-6,
             dy=-8)
    brace(f, ax.px(0), ax.px(2.75), ax.y1 + 28, depth=7, label="2.75 years")
    return f


def _trigger_plane(f: Fig, x0=104, y0=100, size=216):
    """The accident-date × report-date plane both coverage triggers live on."""
    f.rect(x0, y0, size, size, rx=6, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    # below the diagonal a claim would be reported before it happened
    f.polygon([(x0, y0 + size), (x0 + size, y0), (x0 + size, y0 + size)],
              fill="var(--edge)", fill_opacity="0.5")
    f.line(x0, y0 + size, x0 + size, y0, cls="thin dash", stroke="var(--axis)",
           stroke_width="1.1")
    f.text(x0 + size * 0.74, y0 + size * 0.88, "impossible", cls="sm dim")
    f.text(x0 + size, y0 + size + 48, "accident date", cls="sm dim", anchor="end")
    f.text(x0 - 8, y0 + 12, "report date", cls="sm dim", anchor="end")
    return lambda a: x0 + size * a, lambda r: y0 + size * (1 - r)


@figure("Occurrence Coverage", "On a plane of accident date against report date, the "
        "covered region is a column: accidents inside the policy period, reported at any "
        "later date", width=WID)
def occurrence_coverage() -> Fig:
    f = vcard()

    px, py = _trigger_plane(f)
    f.polygon([(px(0.34), py(0.34)), (px(0.66), py(0.66)), (px(0.66), py(1.0)),
               (px(0.34), py(1.0))], fill=BLUE, fill_opacity="0.24", stroke=BLUE,
              stroke_width="1.4")
    f.text((px(0.34) + px(0.66)) / 2, py(0.86), "covered", cls="sm bold")
    brace(f, px(0.34), px(0.66), py(0.0) + 6, depth=7, label="policy period")
    return f


@figure("Claims Made Coverage", "On a plane of accident date against report date, the "
        "covered region is a band: claims reported inside the policy period for "
        "accidents after the retro date", width=WID)
def claims_made_coverage() -> Fig:
    f = vcard()

    px, py = _trigger_plane(f)
    f.polygon([(px(0.18), py(0.42)), (px(0.42), py(0.42)), (px(0.68), py(0.68)),
               (px(0.18), py(0.68))],
              fill=AMBER, fill_opacity="0.26", stroke=AMBER, stroke_width="1.4")
    f.line(px(0.18), py(0.0), px(0.18), py(1.0), cls="thin dash", stroke=ROSE,
           stroke_width="1.4")
    f.text(px(0.18), py(1.0) - 8, "retro date", cls="sm bold")
    f.text(px(0.33), py(0.55) + 4, "covered", cls="sm bold")
    xb = px(0) - 6
    f.path(f"M{xb + 4:.1f},{py(0.42):.1f} H{xb:.1f} V{py(0.68):.1f} H{xb + 4:.1f}",
           cls="thin", stroke="var(--dim)", stroke_width="1.2")
    f.text(xb - 6, (py(0.42) + py(0.68)) / 2 + 4, "policy period", cls="sm dim",
           anchor="end")
    return f


@figure("On Level Premium", "Three years of earned premium drawn as bars, the two older "
        "years lengthened by their on-level factors to today's rate level", width=WID)
def on_level_premium() -> Fig:
    f = vcard()

    rows = [("2023", 3800, 1.1034), ("2024", 3900, 1.0136), ("2025", 4000, 1.000)]
    x0, scale = 76, 0.058
    for i, (year, ep, olf) in enumerate(rows):
        y = 112 + i * 92
        f.text(x0 - 8, y + 26, year, cls="sm dim", anchor="end")
        f.rect(x0, y, ep * scale, 40, rx=3, fill=BLUE, fill_opacity="0.30",
               stroke=BLUE, stroke_width="1.1")
        extra = ep * (olf - 1) * scale
        if extra > 1:
            f.rect(x0 + ep * scale, y, extra, 40, rx=3, fill=GREEN,
                   fill_opacity="0.6")
            f.text(x0 + ep * olf * scale, y + 58, f"× {olf:.4f}", cls="sm",
                   anchor="end")
        f.text(x0 + 10, y + 25, f"{ep:,}", cls="sm", anchor="start")
    return f


@figure("On-Leveling", "The parallelogram method: calendar year 2023 as a unit square, "
        "cut by the diagonal of a 7/1 rate change into 0.875 earned at the old rates and "
        "a 0.125 triangle at the new", width=WID)
def on_leveling() -> Fig:
    f = vcard()

    x0, y0, s = 76, 100, 236
    f.rect(x0, y0, s, s, rx=4, fill=BLUE, fill_opacity="0.14", stroke="var(--edge)",
           stroke_width="1.2")
    f.polygon([(x0 + s * 0.5, y0 + s), (x0 + s, y0 + s), (x0 + s, y0 + s * 0.5)],
              fill=GREEN, fill_opacity="0.34", stroke=GREEN, stroke_width="1.4")
    f.text(x0 + s * 0.38, y0 + s * 0.46, "old 0.875", cls="sm bold")
    f.text(x0 + s * 0.83, y0 + s * 0.86, "new 0.125", cls="sm bold")
    for frac, lab in ((0.0, "1/1"), (0.5, "7/1"), (1.0, "12/31")):
        f.line(x0 + s * frac, y0 + s, x0 + s * frac, y0 + s + 6, cls="tick")
        f.text(x0 + s * frac, y0 + s + 20, lab, cls="sm dim")
    for frac, lab in ((0.0, "0"), (1.0, "1")):
        f.text(x0 - 8, y0 + s * (1 - frac) + 4, lab, cls="sm dim", anchor="end")
    f.text(x0, y0 - 10, "earned", cls="sm dim", anchor="start")
    f.text(x0 + s, y0 + s + 42, "CY 2023", cls="sm dim", anchor="end")
    return f


@figure("Premium Audit", "A $9,000 deposit premium beside the $12,400 audited premium, "
        "the $3,400 difference billed once the actual exposure is known", width=WID)
def premium_audit() -> Fig:
    f = vcard()

    base, k = 352, 236 / 12_400
    deposit, audited = 9_000, 12_400
    cols = ((100, deposit, "deposit", BLUE), (240, audited, "audited", GREEN))
    for cx, amount, name, colour in cols:
        h = amount * k
        f.rect(cx - 40, base - h, 80, h, rx=3, fill=colour, fill_opacity="0.34",
               stroke=colour, stroke_width="1.2")
        f.text(cx, base - h - 8, f"{amount:,}", cls="sm bold")
        f.text(cx, base + 18, name, cls="sm dim")
    top, extra = base - audited * k, (audited - deposit) * k
    f.rect(200, top, 80, extra, rx=3, fill=AMBER, fill_opacity="0.6", stroke=AMBER,
           stroke_width="1.2")
    f.text(240, top + extra / 2 + 4, f"+{audited - deposit:,}", cls="sm bold")
    f.line(140, base - deposit * k, 200, base - deposit * k, cls="thin dash",
           stroke="var(--dim)", stroke_width="1.2")
    return f


@figure("Exposure Trend", "Losses trending at 6% a year and payroll at 3.5%, leaving a "
        "net trend of 2.4% on the pure premium", width=WID)
def exposure_trend() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 4, 0.95, 1.30, left=48, right=20, top=34)
    ax.frame(xticks=[0, 1, 2, 3, 4], yticks=[1.0, 1.1, 1.2, 1.3],
             yfmt=lambda t: f"{t:.2f}", grid=True, xlabel="years")
    for rate, colour, name in ((0.06, ROSE, "losses 6%"),
                               (0.035, BLUE, "payroll 3.5%"),
                               (0.024, GREEN, "net 2.4%")):
        ax.curve(lambda x, r=rate: (1 + r) ** x, colour=colour, width=2.2)
        ax.label(4, (1 + rate) ** 4, name, cls="sm bold", anchor="end", dx=-4, dy=-7)
    return f


@figure("Premium Trend", "Average premium at the current rate level drifting up from "
        "496 to 520 over the experience years, projected on to 529", width=WID)
def premium_trend() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 4.0, 480, 540, left=54, right=20, top=34)
    ax.frame(xticks=[0, 1, 2, 3, 4], xfmt=lambda t: "",
             yticks=[480, 500, 520, 540], yfmt=lambda t: f"{t:,.0f}", grid=True,
             xlabel="years", ylabel="average premium")
    pts = [(0, 496), (1, 505), (2, 512), (3, 520)]
    ax.polyline(pts, colour=BLUE, width=2.2)
    for x, y in pts:
        ax.point(x, y, colour=BLUE, r=3.2)
    ax.polyline([(3, 520), (4, 529)], colour=GREEN, width=2.2, dash=True)
    ax.point(4.0, 529, colour=GREEN, r=4.2)
    ax.label(4.0, 529, "forecast", cls="sm bold", anchor="end", dx=-6, dy=-9)
    return f


# ═══════════════════════════════════════════════════════════════════════════
# A. Ratemaking — expenses, profit and the overall indication
# ═══════════════════════════════════════════════════════════════════════════

@figure("Expense Provisions", "Three columns building the rate: the $360 pure premium, "
        "$25 of fixed expense added to make $385, then divided by 0.69 to make room for "
        "variable expense and profit, reaching $558", width=WID)
def expense_provisions() -> Fig:
    f = vcard()

    base, k, w = 356, 250 / IND_RATE, 56
    cols = [(60, [(PP, BLUE)]),
            (174, [(PP, BLUE), (FIXED, TEAL)]),
            (288, [(PP, BLUE), (FIXED, TEAL), (VAR * IND_RATE, AMBER),
                   (PROF * IND_RATE, GREEN)])]
    tops = []
    for cx, parts in cols:
        y = base
        for value, colour in parts:
            h = value * k
            f.rect(cx - w / 2, y - h, w, h, rx=2, fill=colour, fill_opacity="0.32",
                   stroke=colour, stroke_width="1.1")
            y -= h
        tops.append(y)
        f.text(cx, y - 8, _money(sum(v for v, _ in parts)), cls="sm bold")
    ya = base - 40
    for (xa, _), (xb, _), lab in ((cols[0], cols[1], "+ 25"),
                                  (cols[1], cols[2], f"÷ {PLR:.2f}")):
        f.arrow(xa + w / 2 + 6, ya, xb - w / 2 - 6, ya, colour="var(--dim)", width=1.4)
        f.text((xa + xb) / 2, ya - 8, lab, cls="sm bold")
    x3 = cols[2][0]
    yv = base - (PP + FIXED + VAR * IND_RATE / 2) * k
    f.text(x3, yv + 4, "V", cls="sm bold")
    f.text(x3 + w / 2 + 6, tops[2] + PROF * IND_RATE * k / 2 + 4, "Q", cls="sm bold",
           anchor="start")
    return f


@figure("Fixed Expenses", "The same $25 fixed expense shaded on three premiums of $200, "
        "$520 and $2,000, where it is 12.5%, 4.8% and 1.25% of the bar", width=WID)
def fixed_expenses() -> Fig:
    f = vcard()

    x0, x1 = 30, 330
    for i, prem in enumerate((200, CUR_RATE, 2000)):
        y = 104 + i * 110
        f.text(x0, y - 10, f"${prem:,.0f} policy", cls="sm bold", anchor="start")
        f.rect(x0, y, x1 - x0, 46, rx=4, fill="var(--soft)", stroke="var(--edge)",
               stroke_width="1.2")
        share = FIXED / prem
        w = (x1 - x0) * share
        f.rect(x0, y, w, 46, rx=4, fill=AMBER, fill_opacity="0.75")
        f.text(x0 + w + 8, y + 27, f"{100 * share:.3g}%", cls="sm", anchor="start")
    return f


@figure("Variable Expenses", "Variable expense rising as a straight 26% line through "
        "the origin as premium grows, against a flat $25 fixed expense", width=WID)
def variable_expenses() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 2200, 0, 620, left=54, right=22, top=34)
    ax.frame(xticks=[0, 1000, 2000], yticks=[0, 300, 600],
             xfmt=lambda t: f"{t:,.0f}", yfmt=lambda t: f"{t:,.0f}", grid=True,
             xlabel="premium", ylabel="expense")
    ax.curve(lambda p: VAR * p, colour=AMBER, width=2.4)
    ax.hline(FIXED, colour=BLUE, x_to=2200, dash=False)
    ax.label(1500, 60, "fixed 25", cls="sm bold")
    ax.label(1100, VAR * 1100, "variable 26%", cls="sm bold", anchor="end", dx=-8,
             dy=-8)
    ax.point(2000, 520, colour=AMBER, r=4)
    ax.label(2000, 520, "520", cls="sm bold", anchor="end", dx=-8, dy=2)
    return f


@figure("Expense Ratio", "A 30.8% expense column stacked from commission 20.0, taxes "
        "3.0 and other acquisition 3.0 — the 26% that varies with premium — topped by "
        "4.8 of fixed general expense", width=WID)
def expense_ratio() -> Fig:
    f = vcard()

    base, k, x0, w = 368, 9.0, 128, 80
    rows = [(20.0, "commission", BLUE), (3.0, "taxes", TEAL),
            (3.0, "other acq.", VIOLET), (4.8, "general", AMBER)]
    y = base
    for pct, name, colour in rows:
        h = pct * k
        f.rect(x0, y - h, w, h, rx=2, fill=colour, fill_opacity="0.34",
               stroke=colour, stroke_width="1.1")
        f.text(x0 + w + 10, y - h / 2 + 4, f"{name} {pct:.1f}", cls="sm",
               anchor="start")
        y -= h
    f.text(x0 + w / 2, y - 10, "30.8%", cls="bold")
    xb = x0 - 8
    for lo, hi, lab in ((0, 26.0, "variable"), (26.0, 30.8, "fixed")):
        ya, yb = base - lo * k - 2, base - hi * k + 2
        f.path(f"M{xb + 4},{ya:.1f} H{xb} V{yb:.1f} H{xb + 4}", cls="thin",
               stroke="var(--dim)", stroke_width="1.2")
        f.text(xb - 6, (ya + yb) / 2 + 4, lab, cls="sm dim", anchor="end")
    return f


@figure("Profit and Contingency Provision", "The premium column split into 69% for "
        "losses, 26% for expenses and a thin 5% profit slice on top, with the 95% "
        "combined ratio marked below it", width=WID)
def profit_and_contingency() -> Fig:
    f = vcard()

    x0, w, top, base = 126, 84, 96, 376
    k = (base - top) / 100
    y = base
    for pct, lab, colour in ((100 * PLR, "losses", BLUE), (100 * VAR, "expenses", AMBER),
                             (100 * PROF, None, GREEN)):
        h = pct * k
        f.rect(x0, y - h, w, h, rx=2, fill=colour, fill_opacity="0.32",
               stroke=colour, stroke_width="1.2")
        if lab:
            f.text(x0 + w / 2, y - h / 2 + 4, f"{pct:.0f}%", cls="sm")
            f.text(x0 + w + 12, y - h / 2 + 4, lab, cls="sm", anchor="start")
        y -= h
    yq = top + 100 * PROF * k
    f.line(x0 - 12, yq, x0 + w + 6, yq, cls="thin dash", stroke=ROSE,
           stroke_width="1.6")
    f.text(x0 - 16, yq + 4, "combined 95%", cls="sm bold", anchor="end")
    shield(f, x0 + w + 22, top + 4, 30, GREEN)
    f.text(x0 + w + 44, top + 9, "Q 5%", cls="sm bold", anchor="start")
    return f


@figure("Underwriting Profit", "A waterfall from $558 of premium down through $300 of "
        "losses, $60 of LAE and $170 of expenses to $28 of underwriting profit",
        width=WID)
def underwriting_profit() -> Fig:
    f = vcard()

    base, k = 348, 240 / IND_RATE
    steps = [("premium", IND_RATE, VIOLET), ("losses", -300, BLUE),
             ("LAE", -60, TEAL), ("expenses", -(FIXED + VAR * IND_RATE), AMBER)]
    slot, w, x = 62, 42, 44
    level = 0.0
    for i, (name, amt, colour) in enumerate(steps):
        cx = x + slot * i
        hi = level if amt < 0 else amt
        lo = level + amt if amt < 0 else 0
        f.rect(cx - w / 2, base - hi * k, w, (hi - lo) * k, rx=2, fill=colour,
               fill_opacity="0.34", stroke=colour, stroke_width="1.2")
        f.text(cx, base - hi * k - 8, _money(abs(amt)), cls="sm")
        f.text(cx, base + 18, name, cls="sm dim")
        if i:
            f.line(cx - slot + w / 2, base - level * k, cx - w / 2, base - level * k,
                   cls="thin dash", stroke="var(--dim)", stroke_width="1")
        level = hi if amt > 0 else lo
    cx = x + slot * len(steps)
    f.line(cx - slot + w / 2, base - level * k, cx - w / 2, base - level * k,
           cls="thin dash", stroke="var(--dim)", stroke_width="1")
    f.rect(cx - w / 2, base - level * k, w, level * k, rx=2, fill=GREEN,
           fill_opacity="0.6", stroke=GREEN, stroke_width="1.2")
    f.text(cx, base - level * k - 8, _money(level), cls="sm bold")
    f.text(cx, base + 18, "profit", cls="sm bold")
    return f


@figure("Overall Rate Level Indication", "The current $520 average rate beside the "
        "indicated $558, the $38 gap between them marked +7.3%", width=WID)
def overall_rate_level_indication() -> Fig:
    f = vcard()

    base, k = 356, 250 / IND_RATE
    for cx, rate, name, colour in ((110, CUR_RATE, "current", BLUE),
                                   (230, IND_RATE, "indicated", GREEN)):
        h = rate * k
        f.rect(cx - 44, base - h, 88, h, rx=3, fill=colour, fill_opacity="0.30",
               stroke=colour, stroke_width="1.2")
        f.text(cx, base - h / 2 + 4, _money(rate), cls="sm bold")
        f.text(cx, base + 18, name, cls="sm dim")
    ya, yb = base - CUR_RATE * k, base - IND_RATE * k
    f.rect(186, yb, 88, ya - yb, rx=3, fill=GREEN, fill_opacity="0.75")
    f.line(154, ya, 186, ya, cls="thin dash", stroke="var(--dim)", stroke_width="1.2")
    f.text(230, yb - 10, f"+{IND_CHG:.1%}", cls="bold")
    return f


@figure("Pure Premium Method", "Losses over exposures giving a $360 pure premium per "
        "car, which becomes the base of a $558 rate column topped by $25 of fixed "
        "expense and the variable and profit loads", width=WID)
def pure_premium_method() -> Fig:
    f = vcard()

    # losses ÷ exposures, drawn as a fraction
    ym = 276
    coins(f, 72, ym - 14, 4, 20, BLUE)
    f.line(40, ym, 104, ym, cls="", stroke="var(--ink)", stroke_width="2",
           stroke_linecap="round")
    car(f, 72, ym + 26, 58, BLUE)
    f.text(72, ym - 56, "losses", cls="sm dim")
    f.text(72, ym + 62, "exposures", cls="sm dim")
    for dy in (-5, 5):
        f.line(128, ym + dy, 148, ym + dy, cls="", stroke="var(--ink)",
               stroke_width="2.2", stroke_linecap="round")

    # …the per-exposure pure premium, built up into the rate
    base, k, x0, w = 356, 250 / IND_RATE, 176, 84
    y = base
    for value, colour, lab in ((PP, BLUE, _money(PP)), (FIXED, TEAL, None),
                               (IND_RATE * (VAR + PROF), AMBER, "V + Q")):
        h = value * k
        f.rect(x0, y - h, w, h, rx=2, fill=colour, fill_opacity="0.32",
               stroke=colour, stroke_width="1.2")
        if lab:
            f.text(x0 + w / 2, y - h / 2 + 4, lab, cls="sm bold")
        y -= h
    f.text(x0 + w + 8, base - (PP + FIXED / 2) * k + 4, "+ 25", cls="sm",
           anchor="start")
    f.text(x0 + w / 2, y - 10, _money(IND_RATE), cls="bold")
    return f


@figure("Loss Ratio Method", "The projected ratio of 74.0 — 69.2 of loss and LAE plus "
        "4.8 of fixed expense — standing taller than the 69.0 permissible column, a gap "
        "of +7.3%", width=WID)
def loss_ratio_method() -> Fig:
    f = vcard()

    lr, fx = 100 * PP / CUR_RATE, 100 * FIXED / CUR_RATE
    base, k, w = 352, 3.4, 90
    for cx, parts, name in ((100, [(lr, BLUE), (fx, TEAL)], "projected"),
                            (240, [(100 * PLR, AMBER)], "permissible")):
        y = base
        for value, colour in parts:
            h = value * k
            f.rect(cx - w / 2, y - h, w, h, rx=2, fill=colour, fill_opacity="0.34",
                   stroke=colour, stroke_width="1.2")
            y -= h
        f.text(cx, base + 18, name, cls="sm dim")
    for cy, value in ((base - lr * k / 2, lr), (base - (lr + fx / 2) * k, fx),
                      (base - 50 * PLR * k, 100 * PLR)):
        f.text(100 if value != 100 * PLR else 240, cy + 4, f"{value:.1f}", cls="sm")
    ya, yb = base - 100 * PLR * k, base - (lr + fx) * k
    f.text(100, yb - 10, f"{lr + fx:.1f}", cls="bold")
    f.line(145, yb, 195, yb, cls="thin dash", stroke="var(--dim)", stroke_width="1.2")
    f.rect(195, yb, w, ya - yb, rx=2, fill=ROSE, fill_opacity="0.14", stroke=ROSE,
           stroke_width="1.4", stroke_dasharray="4 3")
    f.text(240 + w / 2 + 8, (ya + yb) / 2 + 4, f"+{IND_CHG:.1%}", cls="bold",
           anchor="start")
    return f


@figure("Permissible Loss Ratio", "The premium column with the 26% variable expense "
        "and 5% profit slices lifted out to the side, leaving the 69% permissible loss "
        "ratio behind", width=WID)
def permissible_loss_ratio() -> Fig:
    f = vcard()

    x0, w, top, base = 64, 96, 88, 368
    k = (base - top) / 100
    yp = base - 100 * PLR * k
    f.rect(x0, top, w, yp - top, rx=3, fill="none", stroke="var(--axis)",
           stroke_width="1.2", stroke_dasharray="4 3")
    f.rect(x0, yp, w, base - yp, rx=3, fill=BLUE, fill_opacity="0.34", stroke=BLUE,
           stroke_width="1.2")
    f.text(x0 + w / 2, (yp + base) / 2 + 4, f"PLR {PLR:.0%}", cls="bold")
    y, xo = top, 214
    for share, name, colour in ((VAR, "V", AMBER), (PROF, "Q", GREEN)):
        h = share * 100 * k
        f.rect(xo, y - (8 if name == "V" else -8), w, h, rx=3, fill=colour,
               fill_opacity="0.34", stroke=colour, stroke_width="1.2")
        f.text(xo + w / 2, y - (8 if name == "V" else -8) + h / 2 + 4,
               f"{name} {share:.0%}", cls="sm bold")
        f.arrow(x0 + w + 8, y + h / 2, xo - 8, y + h / 2 - (8 if name == "V" else -8),
                colour=colour, width=1.4)
        y += h
    return f


@figure("Rate Change", "Indicated and selected rate changes for 2021–2025 drawn as two "
        "lines, the selected always below, with the gap between them shaded", width=WID)
def rate_change() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.4, 4.4, 0, 16, left=48, right=20, top=40)
    ax.frame(xticks=[0, 1, 2, 3, 4], xfmt=lambda t: f"{2021 + int(t)}",
             yticks=[0, 5, 10, 15], yfmt=lambda t: f"{t:.0f}%", grid=True)
    ind = [11.4, 9.8, 13.2, 8.6, 100 * IND_CHG]
    sel = [7.0, 7.0, 9.0, 7.0, 5.0]
    f.polygon([ax.p(k, v) for k, v in enumerate(ind)]
              + [ax.p(k, v) for k, v in reversed(list(enumerate(sel)))],
              fill=ROSE, fill_opacity="0.16", stroke="none")
    for vals, colour in ((ind, BLUE), (sel, AMBER)):
        ax.polyline(list(enumerate(vals)), colour=colour, width=2.4)
        for k, v in enumerate(vals):
            ax.point(k, v, colour=colour, r=3.6)
    ax.label(0, ind[0], "indicated", cls="sm bold", dy=-10)
    ax.label(0, sel[0], "selected", cls="sm bold", dy=18)
    ax.label(2, (ind[2] + sel[2]) / 2, "gap", cls="sm dim", dy=4)
    return f


@figure("Ratemaking Constraints", "A regulator, the market and the insurer's own "
        "systems pressing down on a narrow band of allowed rate changes, while the "
        "+7.3% indication sits outside it", width=WID)
def ratemaking_constraints() -> Fig:
    f = vcard()

    def px(v):
        return 40 + 28 * v

    y = 286
    lo, hi = 3.0, 6.5
    for cx, icon, name, colour in ((70, building, "regulator", ROSE),
                                   (180, tower, "market", AMBER),
                                   (290, document, "systems", VIOLET)):
        icon(f, cx, 118, 44, colour)
        f.text(cx, 162, name, cls="sm")
        target = min(max(cx, px(lo) + 12), px(hi) - 12)
        f.arrow(cx, 172, target, y - 34, colour=colour, width=1.5)
    f.rect(px(lo), y - 30, px(hi) - px(lo), 30, rx=3, fill=GREEN,
           fill_opacity="0.26", stroke=GREEN, stroke_width="1.2")
    f.text((px(lo) + px(hi)) / 2, y - 11, "allowed", cls="sm")
    f.line(px(0) - 6, y, px(10) + 6, y, cls="axis")
    for v, lab in ((0, "0%"), (5, "+5%"), (10, "+10%")):
        f.line(px(v), y, px(v), y + 5, cls="tick")
        f.text(px(v), y + 19, lab, cls="sm dim")
    xi = px(100 * IND_CHG)
    f.arrow(xi, y + 64, xi, y + 4, colour=BLUE, width=2)
    f.text(xi, y + 80, f"indicated +{IND_CHG:.1%}", cls="sm bold")
    return f


@figure("Considerations for Implementing Rates", "Revenue climbing in two steps: new "
        "relativities alone add 3.0%, so the base rate needs only +4.2% to reach the "
        "+7.3% overall target", width=WID)
def considerations_for_implementing_rates() -> Fig:
    f = vcard()

    off = 1.030
    target = 1 + IND_CHG
    ax = vaxes(f, 0, 3, 0.99, 1.085, left=52, right=16, top=30)
    ax.frame(xticks=[0.5, 1.5, 2.5], yticks=[1.0, off, target],
             xfmt=lambda t: {0.5: "current", 1.5: "relativities", 2.5: "base rate"}[t],
             yfmt=lambda t: f"{t:.3f}", grid=True, arrows=False, xlabel=None,
             ylabel="revenue")
    ax.hline(target, colour=GREEN)
    ax.label(0.5, target, f"+{IND_CHG:.1%}", cls="sm bold", dy=-7)
    levels = [(0, 1, 1.0), (1, 2, off), (2, 3, target)]
    for a, b, v in levels:
        ax.polyline([(a, v), (b, v)], colour=BLUE, width=2.6)
    for x, a, b, colour in ((1, 1.0, off, AMBER), (2, off, target, GREEN)):
        f.arrow(ax.px(x), ax.py(a), ax.px(x), ax.py(b) + 2, colour=colour, width=2)
        ax.label(x, (a + b) / 2, f"+{b / a - 1:.1%}", cls="sm bold", anchor="end",
                 dx=-8, dy=4)
    return f


@figure("Minimum Premium", "Premium rising with exposure along the rate line, held up "
        "by a $150 floor for every risk smaller than 0.27 exposures", width=WID)
def minimum_premium() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 1.0, 0, 620, left=54, right=20, top=36)
    ax.frame(xticks=[0, 0.25, 0.5, 0.75, 1.0], yticks=[0, 200, 400, 600],
             yfmt=lambda t: f"{t:,.0f}", grid=True, xlabel="exposures",
             ylabel="premium")
    ax.curve(lambda e: IND_RATE * e, colour="var(--dim)", width=1.6, dash=True)
    ax.curve(lambda e: max(IND_RATE * e, 150), colour=BLUE, width=2.6)
    ax.vline(150 / IND_RATE, colour=ROSE, y_top=150)
    ax.label(150 / IND_RATE, 0, "0.27 exposures", cls="sm", anchor="start", dx=8,
             dy=-10)
    ax.hline(150, colour=ROSE, x_to=150 / IND_RATE)
    ax.label(0, 150, "minimum $150", cls="sm bold", anchor="start", dx=6, dy=-8)
    return f


@figure("Rating Algorithm", "A staircase of the premium through the filed steps in "
        "order: $558 base rate, × 1.25 class, × 0.90 territory, + $40 endorsements, "
        "− 5% discount and + $25 policy fee, ending at $659", width=WID)
def rating_algorithm() -> Fig:
    f = vcard()

    steps = [("× 1.25", lambda p: p * 1.25, BLUE), ("× 0.90", lambda p: p * 0.90, BLUE),
             ("+ 40", lambda p: p + 40, TEAL), ("− 5%", lambda p: p * 0.95, AMBER),
             ("+ 25", lambda p: p + 25, TEAL)]
    ax = vaxes(f, 0, 6, 540, 720, left=48, right=14, top=30)
    ax.frame(xticks=[], yticks=[550, 600, 650, 700], grid=True, arrows=False,
             ylabel="premium")
    level = IND_RATE
    ax.polyline([(0, level), (1, level)], colour=VIOLET, width=2.6)
    ax.label(0.5, level, _money(level), cls="sm bold", dy=-8)
    for k, (lab, op, colour) in enumerate(steps, start=1):
        new = op(level)
        f.arrow(ax.px(k), ax.py(level), ax.px(k), ax.py(new) + (3 if new > level else -3),
                colour=colour, width=2)
        ax.label(k, (level + new) / 2, lab, cls="sm bold", anchor="end", dx=-6, dy=4)
        ax.polyline([(k, new), (k + 1, new)], colour=VIOLET, width=2.6)
        level = new
    ax.label(5.5, level, f"${level:,.0f}", cls="bold", dy=-9)
    return f


@figure("Principles of Ratemaking", "One risk's rate drawn as a column of every expected "
        "cost — loss, LAE, expense and capital — whose top lands in the narrow sound band "
        "between inadequate and excessive", width=WID)
def principles_of_ratemaking() -> Fig:
    f = vcard()

    x0, w, base, k = 120, 84, 330, 1.6
    y = base
    for pct, name, colour in ((64, "loss", BLUE), (8, "LAE", TEAL),
                              (20, "expense", AMBER), (8, "capital", GREEN)):
        h = pct * k
        f.rect(x0, y - h, w, h, rx=2, fill=colour, fill_opacity="0.32",
               stroke=colour, stroke_width="1.2")
        f.text(x0 - 10, y - h / 2 + 4, name, cls="sm", anchor="end")
        y -= h
    car(f, x0 + w / 2, base + 26, 64, VIOLET)
    # the gauge the top of the rate is read against
    gx, gw = 254, 22
    for a, b, colour, opacity in ((76, y - 14, ROSE, "0.2"), (y - 14, y + 14, GREEN, "0.5"),
                                  (y + 14, base, AMBER, "0.2")):
        f.rect(gx, a, gw, b - a, rx=3, fill=colour, fill_opacity=opacity, stroke=colour,
               stroke_width="1.1")
    f.line(x0 + w + 4, y, gx - 4, y, cls="thin dash", stroke="var(--ink)",
           stroke_width="1.4")
    f.text(gx + gw + 8, (76 + y - 14) / 2 + 4, "excessive", cls="sm", anchor="start")
    f.text(gx + gw + 8, y + 4, "sound", cls="sm bold", anchor="start")
    f.text(gx + gw + 8, (y + 14 + base) / 2 + 4, "inadequate", cls="sm",
           anchor="start")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# A. Ratemaking — extraordinary losses
# ═══════════════════════════════════════════════════════════════════════════

@figure("Large Loss", "A claim-size curve capped at 250k, the excess tail beyond the "
        "cap shaded and spread back over the body of the distribution", width=WID)
def large_loss() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 12, 0, 1.05, left=44, right=20, top=34)
    cap = 5.0

    def pdf(x):
        return math.exp(-x / 2.4) if x > 0 else 0.0

    ax.area(pdf, 0, cap, colour=BLUE, opacity="0.20")
    ax.area(pdf, cap, 12, colour=ROSE, opacity="0.28")
    ax.curve(pdf, colour=BLUE, width=2.2)
    ax.frame(xticks=[0, 5, 10], xfmt=lambda t: f"{t * 50:,.0f}k", yticks=[],
             xlabel="claim size")
    ax.vline(cap, colour=ROSE, y_top=pdf(cap) + 0.35)
    ax.label(cap, pdf(cap) + 0.35, "cap 250k", cls="sm bold", anchor="start", dx=6,
             dy=-4)
    ax.label(8.4, 0.12, "excess", cls="sm bold")
    f.arrow(ax.px(8.2), ax.py(0.2), ax.px(2.6), ax.py(0.62), colour=ROSE, width=1.6,
            dash=True)
    ax.label(4.4, 0.6, "load", cls="sm bold", dy=-6)
    return f


@figure("Catastrophe Loss", "Twenty years of catastrophe loss ratios, mostly near zero "
        "with two huge spikes, against the flat long-run load of 7% they average to",
        width=WID)
def catastrophe_loss() -> Fig:
    f = vcard()

    ax = vaxes(f, 0.4, 20.6, 0, 68, left=48, right=18, top=34)
    ax.frame(xticks=[1, 5, 10, 15, 20], yticks=[0, 25, 50],
             yfmt=lambda t: f"{t:.0f}%", grid=True, xlabel="year")
    ratios = [2, 1, 4, 0, 58, 3, 1, 0, 6, 2, 1, 41, 2, 0, 3, 1, 9, 0, 2, 4]
    ax.bars([(k + 1, v) for k, v in enumerate(ratios)], colour=ROSE, opacity="0.7")
    ax.hline(7.0, colour=GREEN, dash=False)
    ax.label(20.4, 7.0, "load 7%", cls="sm bold", anchor="end", dy=-7)
    return f


# ═══════════════════════════════════════════════════════════════════════════
# A. Ratemaking — classification and individual risk rating
# ═══════════════════════════════════════════════════════════════════════════

@figure("Classification Ratemaking", "Five driver classes' pure premiums as bars "
        "measured against the adult-married base class, with relativities from 1.70 "
        "down to 0.65", width=WID)
def classification_ratemaking() -> Fig:
    f = vcard()

    classes = [("Youthful", 612, 1.70), ("Adult single", 396, 1.10),
               ("Adult married", PP, 1.00), ("Mature", 288, 0.80),
               ("Senior", 234, 0.65)]
    x0, scale = 124, 0.29
    for i, (name, pp, rel) in enumerate(classes):
        y = 104 + i * 62
        base = rel == 1.00
        f.text(x0 - 8, y + 4, name, cls="sm bold" if base else "sm", anchor="end")
        f.rect(x0, y - 14, pp * scale, 28, rx=3, fill=BLUE if base else AMBER,
               fill_opacity="0.7" if base else "0.55")
        f.text(x0 + pp * scale + 7, y + 4, f"{rel:.2f}", cls="sm", anchor="start")
    f.line(x0 + PP * scale, 80, x0 + PP * scale, 372, cls="thin dash", stroke=BLUE,
           stroke_width="1.3")
    return f


@figure("Territory Ratemaking", "A four-by-four map of territories shaded by relativity, "
        "hottest at 1.45 in the city centre and cooling smoothly to 0.72 at the edge",
        width=WID)
def territory_ratemaking() -> Fig:
    f = vcard()

    grid = [[0.72, 0.78, 0.88, 0.95],
            [0.80, 0.95, 1.15, 1.10],
            [0.90, 1.20, 1.45, 1.22],
            [0.85, 1.05, 1.18, 1.00]]
    x0, y0, c = 40, 88, 70
    for i, row in enumerate(grid):
        for j, rel in enumerate(row):
            opacity = max(0.06, min(0.85, (rel - 0.68) * 1.1))
            f.rect(x0 + j * c, y0 + i * c, c - 3, c - 3, rx=4, fill=ROSE,
                   fill_opacity=f"{opacity:.2f}", stroke="var(--edge)",
                   stroke_width="0.8")
            if rel in (0.72, 1.45):
                f.text(x0 + j * c + (c - 3) / 2, y0 + i * c + (c - 3) / 2 + 4,
                       f"{rel:.2f}", cls="bold")
    return f


@figure("Loss Elimination Ratio", "The loss elimination ratio rising and flattening as "
        "the deductible grows: 34% at a $500 deductible, only 57% at $1,000", width=WID)
def loss_elimination_ratio() -> Fig:
    f = vcard()

    mean = 2.4

    def ler(d):
        return (mean * (1 - math.exp(-d / mean))) / mean

    ax = vaxes(f, 0, 6, 0, 1.05, left=48, right=20, top=32)
    ax.frame(xticks=[0, 1, 2, 3, 4, 5, 6], xfmt=lambda t: f"{t * 500:,.0f}",
             yticks=[0, 0.5, 1.0], yfmt=lambda t: f"{t:.0%}", grid=True,
             xlabel="deductible", ylabel="LER")
    ax.curve(ler, colour=BLUE, width=2.4)
    for d, colour in ((1.0, ROSE), (2.0, AMBER)):
        ax.vline(d, colour=colour, y_top=ler(d))
        ax.point(d, ler(d), colour=colour, r=4)
        ax.label(d, ler(d), f"{ler(d):.0%}", cls="sm bold", anchor="end", dx=-8, dy=-6)
    return f


@figure("Deductible Rating", "A ground-up loss curve split at the $500 deductible: the "
        "small losses the insured keeps to the left, the part the insurer pays to the "
        "right", width=WID)
def deductible_rating() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 12, 0, 1.05, left=44, right=20, top=34)

    def pdf(x):
        return math.exp(-x / 3.0) if x > 0 else 0.0

    ax.area(pdf, 0, 2.0, colour=AMBER, opacity="0.30")
    ax.area(pdf, 2.0, 12, colour=BLUE, opacity="0.20")
    ax.curve(pdf, colour=BLUE, width=2.2)
    ax.frame(xticks=[0, 2, 4, 8, 12], xfmt=lambda t: f"{t * 250:,.0f}",
             yticks=[], xlabel="loss size")
    ax.vline(2.0, colour=ROSE, y_top=1.0)
    ax.label(2.0, 1.0, "deductible", cls="sm bold", anchor="start", dx=6, dy=-2)
    ax.label(1.0, 0.3, "kept", cls="sm bold")
    ax.label(5.8, 0.24, "covered", cls="sm bold")
    return f


@figure("Increased Limits", "Increased limits factors rising and flattening from 1.00 "
        "at the 100k basic limit to 1.97 at 5M, the layer from 500k to 1M costing 0.18",
        width=WID)
def increased_limits() -> Fig:
    f = vcard()

    pts = [(100, 1.00), (250, 1.32), (500, 1.55), (1000, 1.73), (2000, 1.86),
           (5000, 1.97)]
    ax = vaxes(f, 0, 5200, 0.9, 2.1, left=48, right=20, top=34)
    ax.frame(xticks=[100, 1000, 2000, 5000], xfmt=lambda t: f"{t / 1000:.0f}M"
             if t >= 1000 else "100k", yticks=[1.0, 1.5, 2.0],
             yfmt=lambda t: f"{t:.1f}", grid=True, xlabel="limit", ylabel="ILF")
    ax.polyline(pts, colour=BLUE, width=2.4)
    for x, y in pts:
        ax.point(x, y, colour=BLUE, r=3.2)
    ax.vline(500, colour=AMBER, y_top=1.55, dash=True)
    ax.vline(1000, colour=AMBER, y_top=1.73, dash=True)
    f.line(ax.px(500), ax.py(1.55), ax.px(1000), ax.py(1.55), cls="thin",
           stroke=AMBER, stroke_width="1.4")
    f.line(ax.px(1000), ax.py(1.55), ax.px(1000), ax.py(1.73), cls="thin",
           stroke=AMBER, stroke_width="1.4")
    ax.label(1050, 1.64, "0.18", cls="sm bold", anchor="start", dx=4)
    return f


@figure("Coinsurance Rating", "The share of each loss paid rising in a straight line "
        "with the insurance carried until it reaches the 80% requirement, so carrying "
        "60% pays only 75%", width=WID)
def coinsurance_rating() -> Fig:
    f = vcard()

    ax = vaxes(f, 0.4, 1.02, 0, 1.1, left=52, right=20, top=34)
    ax.frame(xticks=[0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
             xfmt=lambda t: f"{t:.0%}" if abs(t * 10 % 2) < 0.01 else "",
             yticks=[0, 0.5, 1.0], yfmt=lambda t: f"{t:.0%}", grid=True,
             xlabel="insurance carried", ylabel="share paid")
    ax.curve(lambda c: min(c / 0.80, 1.0), colour=BLUE, width=2.6)
    ax.vline(0.80, colour=GREEN, y_top=1.0)
    ax.label(0.80, 1.0, "required 80%", cls="sm bold", anchor="end", dx=-6, dy=-6)
    ax.vline(0.60, colour=ROSE, y_top=0.75)
    ax.hline(0.75, colour=ROSE, x_to=0.60)
    ax.point(0.60, 0.75, colour=ROSE, r=4.2)
    ax.label(0.60, 0.75, "75% paid", cls="sm bold", anchor="start", dx=10, dy=16)
    return f


@figure("Commercial Lines Rating", "A $100,000 manual premium stepping down through an "
        "experience mod of 0.88 and a schedule mod of 0.95 to a standard premium of "
        "$83,600", width=WID)
def commercial_lines_rating() -> Fig:
    f = vcard()

    base, k, w = 356, 200 / 100_000, 64
    values = [100_000, 88_000, 83_600]
    xs = [60, 180, 300]
    for x, v, name, colour in zip(xs, values, ("manual", None, "standard"),
                                  (VIOLET, BLUE, GREEN)):
        h = v * k
        f.rect(x - w / 2, base - h, w, h, rx=3, fill=colour, fill_opacity="0.32",
               stroke=colour, stroke_width="1.2")
        f.text(x, base - h - 8, f"{v:,}", cls="sm bold")
        if name:
            f.text(x, base + 18, name, cls="sm dim")
    for (xa, xb), mod, icon, name, colour in (((xs[0], xs[1]), 0.88, document,
                                               "experience", BLUE),
                                              ((xs[1], xs[2]), 0.95, person,
                                               "schedule", TEAL)):
        xm = (xa + xb) / 2
        icon(f, xm, 104, 34, colour)
        f.text(xm, 138, name, cls="sm")
        f.arrow(xa + w / 2 + 4, 236, xb - w / 2 - 4, 236, colour=colour, width=1.6)
        f.text(xm, 228, f"× {mod:.2f}", cls="sm bold")
    return f


@figure("Experience Rating", "A beam balanced at a mod of 0.88, carrying the risk's own "
        "0.70 actual-to-expected with weight 0.40 at one end and the class's 1.00 with "
        "weight 0.60 at the other", width=WID)
def experience_rating() -> Fig:
    f = vcard()

    own, z = 0.70, 0.40
    mod = z * own + (1 - z) * 1.0

    def bx(v):
        return 74 + (v - own) / (1.0 - own) * 220

    y = 268
    f.line(30, y, 330, y, cls="", stroke="var(--ink)", stroke_width="3",
           stroke_linecap="round")
    xf = bx(mod)
    f.polygon([(xf, y + 2), (xf - 22, y + 50), (xf + 22, y + 50)], fill=GREEN,
              fill_opacity="0.3", stroke=GREEN, stroke_width="1.4")
    f.text(xf, y + 70, f"{mod:.2f}", cls="bold")
    for v, w, name, colour in ((own, z, "risk", BLUE), (1.0, 1 - z, "class", AMBER)):
        s = 118 * math.sqrt(w)
        f.rect(bx(v) - s / 2, y - 2 - s, s, s, rx=4, fill=colour,
               fill_opacity="0.34", stroke=colour, stroke_width="1.2")
        f.text(bx(v), y - 2 - s / 2 + 4, f"{w:.2f}", cls="sm")
        f.text(bx(v), y - s - 12, name, cls="sm bold")
        f.text(bx(v), y + 18, f"{v:.2f}", cls="sm")
    return f


@figure("Schedule Rating", "Underwriter credits and debits stepping the manual 1.00 "
        "down, row by row, to a 0.95 schedule modifier", width=WID)
def schedule_rating() -> Fig:
    f = vcard()

    items = [("premises", -10), ("class", -5), ("staff", 8), ("management", -3),
             ("equipment", 5)]

    def px(p):
        return 120 + (p - 82) * 10

    f.line(px(100), 94, px(100), 370, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.2")
    f.text(px(100), 86, "1.00", cls="sm dim")
    level = 100
    ys = [114 + i * 46 for i in range(len(items))] + [356]
    for i, (name, pts) in enumerate(items):
        y = ys[i]
        colour = ROSE if pts > 0 else GREEN
        lo, hi = sorted((level, level + pts))
        f.rect(px(lo), y - 11, px(hi) - px(lo), 22, rx=3, fill=colour,
               fill_opacity="0.6", stroke=colour, stroke_width="1.2")
        f.text(108, y + 4, name, cls="sm", anchor="end")
        level += pts
        f.line(px(level), y + 11, px(level), ys[i + 1] - 11, cls="thin dot",
               stroke="var(--dim)", stroke_width="1.2")
    y = ys[-1]
    f.rect(px(level), y - 12, px(100) - px(level), 24, rx=3, fill=BLUE,
           fill_opacity="0.6", stroke=BLUE, stroke_width="1.2")
    f.text(108, y + 4, "modifier", cls="sm bold", anchor="end")
    f.text(px(level) - 6, y + 4, "0.95", cls="sm bold", anchor="end")
    return f


@figure("Retrospective Rating", "Retrospective premium rising with the insured's own "
        "losses, held between a minimum and a maximum premium", width=WID)
def retrospective_rating() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 160, 0, 190, left=52, right=20, top=28, bottom=48)
    ax.frame(xlabel="own losses", ylabel="premium", xticks=[0, 50, 100, 150],
             yticks=[0, 50, 100, 150], xfmt=lambda t: f"{t:.0f}",
             yfmt=lambda t: f"{t:.0f}", grid=True)
    ax.curve(lambda L: min(max(30 + 1.15 * L, 45), 150), colour=BLUE, width=2.6)
    ax.hline(45, colour=GREEN, x_to=160, dash=True)
    ax.label(158, 45, "minimum", cls="sm bold", fill=GREEN, anchor="end", dy=-7)
    ax.hline(150, colour=ROSE, x_to=160, dash=True)
    ax.label(158, 150, "maximum", cls="sm bold", fill=ROSE, anchor="end", dy=-7)
    return f


@figure("Self-Insured Retention", "Eight claims cut at a 250 retention: the entity "
        "keeps each claim up to the line and the insurer pays what rises above it",
        width=WID)
def self_insured_retention() -> Fig:
    f = vcard()

    claims = [120, 340, 90, 780, 250, 60, 1150, 200]
    R = 250
    ax = vaxes(f, 0.3, 10.6, 0, 1250, left=52, right=14, top=28, bottom=48)
    ax.frame(xlabel="claims", xticks=[], yticks=[0, 250, 750, 1250],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    bw = (ax.px(2) - ax.px(1)) * 0.62
    for k, x in enumerate(claims):
        cx = ax.px(k + 1)
        lo = min(x, R)
        f.rect(cx - bw / 2, ax.py(lo), bw, ax.y1 - ax.py(lo), rx=2, fill=AMBER,
               fill_opacity="0.75")
        if x > R:
            f.rect(cx - bw / 2, ax.py(x), bw, ax.py(R) - ax.py(x), rx=2,
                   fill=BLUE, fill_opacity="0.7")
    ax.hline(R, colour=ROSE, x_to=10.6, dash=False)
    ax.label(9.6, R, "SIR", cls="sm bold", dy=-7)
    ax.label(9.6, 700, "insured", cls="sm")
    ax.label(9.6, 125, "retained", cls="sm", dy=4)
    return f


@figure("Reinsurance", "Seven claims cut by a 1,500 xs 500 excess-of-loss treaty into "
        "the cedant's retention, the reinsured layer and the excess above it",
        width=WID)
def reinsurance() -> Fig:
    f = vcard()

    claims = [180, 620, 300, 1400, 2600, 240, 900]
    R, L = 500, 1500
    ax = vaxes(f, 0.3, 10.2, 0, 2800, left=54, right=14, top=28, bottom=48)
    ax.frame(xlabel="claims", xticks=[], yticks=[0, 500, 2000, 2800],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    bw = (ax.px(2) - ax.px(1)) * 0.62
    for k, x in enumerate(claims):
        cx = ax.px(k + 1)
        for lo, hi, colour in ((0, min(x, R), BLUE),
                               (R, min(max(x, R), R + L), AMBER),
                               (R + L, max(x, R + L), ROSE)):
            if hi <= lo:
                continue
            f.rect(cx - bw / 2, ax.py(hi), bw, ax.py(lo) - ax.py(hi), rx=2,
                   fill=colour, fill_opacity="0.72")
    ax.hline(R, colour=BLUE, x_to=10.2, dash=False)
    ax.hline(R + L, colour=AMBER, x_to=10.2, dash=False)
    ax.label(8.9, R / 2, "retained", cls="sm", dy=4)
    ax.label(8.9, R + L / 2, "1,500 xs 500", cls="sm bold", dy=4)
    ax.label(8.9, (R + L + 2800) / 2, "above limit", cls="sm", dy=4)
    return f


@figure("Lifetime Value", "A customer's discounted profit by policy year, negative in "
        "the first year, with the running total climbing to a lifetime value of 81",
        width=WID)
def lifetime_value() -> Fig:
    f = vcard()

    ax = vaxes(f, 0.4, 6.6, -40, 95, left=48, right=18, top=28, bottom=48)
    ax.frame(xticks=[], yticks=[-40, 0, 40, 80], yfmt=lambda t: f"{t:.0f}",
             grid=True)
    profit = [-34, 22, 30, 26, 21, 16]
    running, total = [], 0
    for k, v in enumerate(profit):
        ax.bars([(k + 1, v)], colour=ROSE if v < 0 else BLUE, bw=22,
                opacity="0.72")
        f.text(ax.px(k + 1), ax.y1 + 16, str(k + 1), cls="sm dim")
        total += v
        running.append((k + 1, total))
    f.text(ax.x1, ax.y1 + 32, "policy year", cls="sm dim", anchor="end")
    ax.polyline(running, colour=GREEN, width=2.4)
    for x, y in running:
        ax.point(x, y, colour=GREEN, r=3.2)
    ax.label(6, total, f"{total:.0f}", cls="sm bold", anchor="start", dx=8, dy=4)
    ax.label(5, 65, "lifetime value", cls="sm bold", anchor="end", dx=-6, dy=-8)
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Estimating claim liabilities — the framework
# ═══════════════════════════════════════════════════════════════════════════

@figure("Loss Reserving", "A time axis split at the valuation date: reserving looks "
        "back at claims already incurred, some carried as case reserves and some "
        "still IBNR, while ratemaking looks ahead at claims yet to happen", width=WID)
def loss_reserving() -> Fig:
    f = vcard()

    y, xv = 340, 200
    past = [(52, 110, True), (72, 72, True), (92, 160, True), (112, 96, True),
            (130, 64, False), (146, 128, True), (162, 88, False), (180, 146, False)]
    future = [(224, 86), (246, 128), (270, 70), (292, 112), (314, 94)]
    for x, h, reported in past:
        colour = AMBER if reported else VIOLET
        f.line(x, y, x, y - h, cls="thin" if reported else "thin dash",
               stroke=colour, stroke_width="2")
        f.circle(x, y - h, 5, fill=colour if reported else "var(--surf)",
                 fill_opacity="0.8" if reported else None, stroke=colour,
                 stroke_width="1.6")
    for x, h in future:
        f.line(x, y, x, y - h, cls="thin dot", stroke="var(--dim)",
               stroke_width="1.6")
        f.circle(x, y - h, 5, fill="none", stroke="var(--dim)", stroke_width="1.2",
                 stroke_dasharray="2 2")
    f.text(92, y - 160 - 12, "case", cls="sm bold")
    f.text(180, y - 146 - 12, "IBNR", cls="sm bold")

    f.arrow(36, y, 332, y, colour="var(--axis)", width=1.2)
    f.line(xv, 96, xv, y + 6, cls="thin dash", stroke="var(--ink)",
           stroke_width="1.3")
    f.text(xv, y + 22, "valuation date", cls="sm dim")
    f.arrow(xv - 8, 120, 46, 120, colour=BLUE, width=2)
    f.text(122, 110, "reserving", cls="sm bold")
    f.arrow(xv + 8, 120, 322, 120, colour=AMBER, width=2)
    f.text(264, 110, "ratemaking", cls="sm bold")
    return f


@figure("Unpaid Claims", "AY 2024's 2,850 ultimate stacked as paid, case and IBNR, "
        "with the 1,500 reported bracketed on one side and the 2,250 unpaid on the "
        "other", width=WID)
def unpaid_claims() -> Fig:
    f = vcard()

    x0, x1, base, scale = 140, 220, 372, 280 / 2850
    parts = [(600, "paid 600", GREEN), (900, "case 900", AMBER),
             (1350, "IBNR 1,350", VIOLET)]
    edges = [base]
    for amount, label, colour in parts:
        h = amount * scale
        top = edges[-1] - h
        f.rect(x0, top, x1 - x0, h, rx=3, fill=colour, fill_opacity="0.34",
               stroke=colour, stroke_width="1.2")
        f.text((x0 + x1) / 2, top + h / 2 + 4, label, cls="sm bold")
        edges.append(top)
    f.text((x0 + x1) / 2, edges[-1] - 10, "ultimate 2,850", cls="sm bold")

    def bracket(x, ya, yb, tick):
        f.path(f"M{x + tick},{ya:.1f} H{x} V{yb:.1f} H{x + tick}", cls="thin",
               stroke="var(--dim)", stroke_width="1.3")

    bracket(128, edges[0], edges[2], 6)
    f.text(120, (edges[0] + edges[2]) / 2 + 4, "reported 1,500", cls="sm",
           anchor="end")
    bracket(232, edges[1], edges[3], -6)
    f.text(240, (edges[1] + edges[3]) / 2 + 4, "unpaid 2,250", cls="sm",
           anchor="start")
    return f


@figure("Reserving Data Organization", "One triangle whose cells mix four coverages, "
        "split into four smaller triangles that each hold a single coverage",
        width=WID)
def reserving_data_organization() -> Fig:
    f = vcard()

    colours = [BLUE, AMBER, TEAL, VIOLET]

    def cells(x0, y0, n, c, colour_at):
        for i in range(n):
            for j in range(n - i):
                colour = colour_at(i, j)
                f.rect(x0 + j * c + 1, y0 + i * c + 1, c - 2, c - 2, rx=2,
                       fill=colour, fill_opacity="0.55", stroke=colour,
                       stroke_width="1")

    cells(BCX - 65, 80, 5, 26, lambda i, j: colours[(2 * i + 3 * j + i * j) % 4])
    for k, name in enumerate(["BI", "PD", "Coll", "Comp"]):
        cx = 60 + 80 * k
        f.arrow(BCX - 18 + 12 * k, 220, cx, 268, colour="var(--dim)", width=1.3)
        cells(cx - 34, 278, 4, 17, lambda i, j: colours[k])
        f.text(cx, 368, name, cls="sm bold")
    return f


@figure("Underwriting Year", "A treaty bound at the start of 2024 and the policies "
        "that attach to it through the year, so underwriting year 2024 runs for 24 "
        "months", width=WID)
def underwriting_year() -> Fig:
    f = vcard()

    px = _calendar_axis(f, 340, ["2023", "2024", "2025"], band=1, y_top=96)
    f.rect(px(1), 117, px(2) - px(1), 18, rx=3, fill=VIOLET, fill_opacity="0.4",
           stroke=VIOLET, stroke_width="1.2")
    f.text(px(0.5), 130, "treaty", cls="sm bold")
    for k in range(6):
        t = 1 + 0.18 * k
        y = 166 + 22 * k
        f.rect(px(t), y - 5.5, px(t + 1) - px(t), 11, rx=3, fill=BLUE,
               fill_opacity="0.34", stroke=BLUE, stroke_width="1.1")
    f.text(px(0.5), 226, "policies", cls="sm")
    brace(f, px(1), px(2.9), 296, depth=8, label="24 months", label_cls="sm bold")
    return f


@figure("Types of Insurance", "Six lines of insurance placed by claim frequency and "
        "claim severity, with the tail lengthening toward low frequency and high "
        "severity", width=WID)
def types_of_insurance() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 10, left=36, right=20, top=26, bottom=40)
    ax.frame(xlabel="frequency", ylabel="severity", xticks=[], yticks=[],
             arrows=True)
    lines = [(8.4, 1.4, "Auto PD", GREEN), (6.6, 3.2, "Homeowners", GREEN),
             (4.4, 5.6, "CGL", BLUE), (2.6, 6.8, "Auto BI", BLUE),
             (3.2, 8.8, "Workers comp", ROSE), (0.9, 9.4, "Med mal", ROSE)]
    for x, y, name, colour in lines:
        ax.point(x, y, colour=colour, r=4.6)
        ax.label(x, y, name, cls="sm bold", fill=colour, dy=-10)
    f.arrow(ax.px(9.2), ax.py(5.0), ax.px(6.6), ax.py(8.4), colour="var(--dim)",
            width=1.6)
    ax.label(8.1, 7.3, "longer tail", cls="sm dim", anchor="start")
    return f


def _emergence(ax: Axes, pattern, colour, label=None, width=2.4, dash=False):
    ax.polyline(pattern, colour=colour, width=width, dash=dash)
    for x, y in pattern:
        ax.point(x, y, colour=colour, r=3)
    if label:
        ax.label(pattern[-1][0], pattern[-1][1], label, cls="sm bold",
                 fill=colour, anchor="end", dx=-4, dy=-8)


@figure("Long Tail Lines", "A long-tail reporting pattern only 52.6% reported at 12 "
        "months, the unreported gap shaded as IBNR, beside a short-tail pattern that "
        "is nearly complete at once", width=WID)
def long_tail_lines() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 96, 0, 1.08, left=50, right=22, top=28, bottom=48)
    ax.frame(xlabel="age in months", xticks=[12, 36, 60, 84],
             yticks=[0, 0.5, 1.0], yfmt=lambda t: f"{t:.0%}", grid=True)
    long_p = [(12, 0.526), (24, 0.789), (36, 0.916), (48, 0.971), (60, 0.990),
              (72, 0.998), (84, 1.0), (96, 1.0)]
    short_p = [(12, 0.94), (24, 0.99), (36, 1.0), (48, 1.0), (60, 1.0),
               (72, 1.0), (84, 1.0), (96, 1.0)]
    f.polygon([ax.p(x, y) for x, y in long_p] + [ax.p(12, 1.0)], fill=BLUE,
              fill_opacity="0.14", stroke="none")
    ax.polyline(short_p, colour="var(--dim)", width=1.6, dash=True)
    _emergence(ax, long_p, BLUE)
    ax.point(12, 0.526, colour=ROSE, r=4.2)
    ax.label(12, 0.526, "52.6%", cls="sm bold", anchor="start", dx=8, dy=14)
    ax.label(19, 0.86, "IBNR", cls="sm bold")
    ax.label(60, 0.62, "long tail", cls="sm bold", fill=BLUE)
    ax.label(40, 1.0, "short tail", cls="sm dim", anchor="start", dx=4, dy=-7)
    return f


@figure("Short Tail Insurance", "A short-tail reporting pattern already 94% reported "
        "at 12 months and complete by 36, beside a long-tail pattern still climbing",
        width=WID)
def short_tail_insurance() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 60, 0, 1.08, left=50, right=22, top=28, bottom=48)
    ax.frame(xlabel="age in months", xticks=[12, 24, 36, 48, 60],
             yticks=[0, 0.5, 1.0], yfmt=lambda t: f"{t:.0%}", grid=True)
    short_p = [(12, 0.94), (24, 0.99), (36, 1.0), (48, 1.0), (60, 1.0)]
    long_p = [(12, 0.526), (24, 0.789), (36, 0.916), (48, 0.971), (60, 0.990)]
    ax.polyline(long_p, colour="var(--dim)", width=1.6, dash=True)
    _emergence(ax, short_p, GREEN)
    ax.label(12, 0.94, "94%", cls="sm bold", anchor="start", dx=8, dy=14)
    ax.label(42, 1.0, "short tail", cls="sm bold", fill=GREEN, dy=-9)
    ax.label(30, 0.62, "long tail", cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Estimating claim liabilities — triangles and development factors
# ═══════════════════════════════════════════════════════════════════════════

@figure("Development Triangle", "The running reported-loss triangle as a grid of cells, "
        "accident years down and ages across, each cell filled to its reported losses, "
        "the latest diagonal outlined and the cells still to come left empty", width=WID)
def development_triangle() -> Fig:
    f = vcard()

    x0, y0, cw, ch = 64, 108, 52, 54
    _fill_triangle(f, TRI, x0, y0, cw, ch, scale=U_CL, ring=lambda i, j: i + j == 4)
    for j, age in enumerate(AGES):
        f.text(x0 + cw * (j + 0.5), y0 - 10, age, cls="sm dim")
    for i, ay in enumerate(AYS):
        f.text(x0 - 8, y0 + ch * (i + 0.5) + 4, ay, cls="sm dim", anchor="end")
    f.text(x0 + cw * 2.5, y0 - 28, "age in months", cls="sm dim")
    return f


@figure("Paid Losses", "Paid losses climbing to the same ultimate as reported "
        "losses, from further below", width=WID)
def paid_losses() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 84, 0, 3200, left=54, right=20, top=28, bottom=48)
    ax.frame(xlabel="age in months", xticks=[12, 36, 60, 84],
             yticks=[0, 1500, 3000], yfmt=lambda t: f"{t:,.0f}", grid=True)
    rpt = [(12, 1500), (24, 2250), (36, 2610), (48, 2767), (60, 2822),
           (72, 2845), (84, 2850)]
    pd_ = [(12, 600), (24, 1500), (36, 2150), (48, 2560), (60, 2740),
           (72, 2820), (84, 2850)]
    ax.polyline(rpt, colour=BLUE, width=2.2)
    ax.polyline(pd_, colour=GREEN, width=2.4)
    ax.hline(2850, colour="var(--dim)", x_to=84)
    ax.label(20, 2250, "reported", cls="sm bold", fill=BLUE, anchor="end", dx=-4)
    ax.label(40, 2000, "paid", cls="sm bold", fill=GREEN, dy=14)
    ax.label(78, 2850, "ultimate", cls="sm dim", anchor="end", dy=-8)
    return f


@figure("Incurred Losses", "Each accident year's reported losses stacked as paid "
        "losses plus the case reserves still outstanding, case shrinking as the year "
        "ages", width=WID)
def incurred_losses() -> Fig:
    f = vcard()

    ax = vaxes(f, 0.4, 5.6, 0, 2400, left=54, right=20, top=28, bottom=48)
    ax.frame(xlabel="accident year", xticks=[1, 2, 3, 4, 5],
             xfmt=lambda t: AYS[int(t) - 1], yticks=[0, 1000, 2000],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    reported = [row[-1] for row in TRI]
    paid = [row[-1] for row in PAID]
    bw = (ax.px(2) - ax.px(1)) * 0.56
    for k in range(5):
        cx = ax.px(k + 1)
        f.rect(cx - bw / 2, ax.py(paid[k]), bw, ax.y1 - ax.py(paid[k]), rx=2,
               fill=GREEN, fill_opacity="0.72")
        f.rect(cx - bw / 2, ax.py(reported[k]), bw,
               ax.py(paid[k]) - ax.py(reported[k]), rx=2, fill=AMBER,
               fill_opacity="0.72")
    ax.label(1, paid[0] / 2, "paid", cls="sm bold", dy=4)
    ax.label(5, (paid[4] + reported[4]) / 2, "case", cls="sm bold", dy=4)
    ax.label(3, reported[2], "reported", cls="sm bold", dy=-8)
    return f


@figure("Claim Count Triangle", "The running claim-count triangle as cells filled to "
        "each reported count, with AY 2024's 700 claims carried across by 1.429 to "
        "1,000 ultimate claims", width=WID)
def claim_count_triangle() -> Fig:
    f = vcard()

    x0, y0, cw, ch = 56, 108, 44, 54
    cdf = math.prod(CNT_LDF)                      # 1.429
    ult = CNT[4][0] * cdf                         # 1,000
    at = _fill_triangle(f, CNT, x0, y0, cw, ch, scale=ult, colour=TEAL)
    for j, age in enumerate(AGES + ["ult"]):
        f.text(x0 + cw * (j + 0.5), y0 - 10, age, cls="sm dim")
    for i, ay in enumerate(AYS):
        f.text(x0 - 8, y0 + ch * (i + 0.5) + 4, ay, cls="sm dim", anchor="end")
    cx, cy = x0 + cw * 5.5, y0 + ch * 4.5
    f.rect(cx - cw / 2 + 2, cy - ch / 2 + 2, cw - 4, ch - 4, rx=3, fill=GREEN,
           fill_opacity="0.75", stroke=GREEN, stroke_width="1.4")
    f.text(cx, cy + ch / 2 + 16, _money(ult), cls="sm bold")
    x_start = at[(4, 0)][0] + cw / 2 - 2
    f.arrow(x_start, cy, cx - cw / 2 - 2, cy, colour=GREEN, width=1.6, dash=True)
    f.text((x_start + cx - cw / 2) / 2, cy - 8, f"× {cdf:.3f}", cls="sm bold")
    f.text(at[(4, 0)][0], cy + ch / 2 + 16, _money(CNT[4][0]), cls="sm bold")
    return f


@figure("Allocated Loss Adjustment Expense", "The ratio of ALAE to loss rising with "
        "age to 17% at ultimate, because defence costs develop more slowly than "
        "indemnity", width=WID)
def allocated_lae() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 84, 0, 0.24, left=52, right=22, top=28, bottom=48)
    ax.frame(xlabel="age in months", ylabel="ALAE / loss",
             xticks=[12, 36, 60, 84], yticks=[0, 0.1, 0.2],
             yfmt=lambda t: f"{t:.0%}", grid=True)
    ratio = [(12, 0.085), (24, 0.112), (36, 0.135), (48, 0.152), (60, 0.163),
             (72, 0.168), (84, 0.170)]
    _emergence(ax, ratio, VIOLET)
    ax.label(56, 0.163, "17% at ultimate", cls="sm bold", fill=VIOLET, dy=-10)
    return f


@figure("Age to Age Factor", "The 12 and 24-month columns of the running triangle "
        "linked by a 1.500 factor, which carries AY 2024's 1,500 to 2,250 at 24 "
        "months", width=WID)
def age_to_age_factor() -> Fig:
    f = vcard()

    x0, y0, cw, ch = 70, 128, 54, 44
    for j, age in enumerate(AGES):
        f.text(x0 + cw * (j + 0.5), y0 - 10, age, cls="sm dim")
    for i, row in enumerate(TRI):
        cy = y0 + ch * (i + 0.5)
        f.text(x0 - 8, cy + 4, AYS[i], cls="sm dim", anchor="end")
        for j, v in enumerate(row):
            cx = x0 + cw * (j + 0.5)
            colour = (AMBER, BLUE)[j] if j < 2 else None
            f.rect(cx - cw / 2 + 1.5, cy - ch / 2 + 1.5, cw - 3, ch - 3, rx=3,
                   fill=colour or "var(--soft)",
                   fill_opacity="0.2" if colour else None,
                   stroke=colour or "var(--edge)", stroke_width="1")
            if j < 2:
                f.text(cx, cy + 4, _money(v), cls="sm")
    cx, cy = x0 + cw * 1.5, y0 + ch * 4.5
    f.rect(cx - cw / 2 + 1.5, cy - ch / 2 + 1.5, cw - 3, ch - 3, rx=3, fill="none",
           stroke=ROSE, stroke_width="1.4", stroke_dasharray="3 2")
    f.text(cx, cy + 4, "2,250", cls="sm bold")
    f.arrow(x0 + cw * 0.5 + 10, y0 - 34, x0 + cw * 1.5 - 10, y0 - 34, colour=BLUE,
            width=1.8)
    f.text(x0 + cw, y0 - 44, "× 1.500", cls="sm bold")
    return f


@figure("Cumulative Development Factor", "The cumulative factor at each age drawn as a "
        "bar, each one the bar below it times one link ratio, climbing from 1.000 at "
        "ultimate to 1.900 at 12 months", width=WID)
def cumulative_development_factor() -> Fig:
    f = vcard()

    ages = AGES + ["ult"]
    cdfs = CDF + [1.0]
    x0, scale, ys = 70, 90, [100 + 50 * k for k in range(6)]
    ends = [x0 + scale * c for c in cdfs]
    for k, (age, c) in enumerate(zip(ages, cdfs)):
        colour = AMBER if k == 5 else BLUE
        f.rect(x0, ys[k] - 13, ends[k] - x0, 26, rx=3, fill=colour,
               fill_opacity="0.3", stroke=colour, stroke_width="1.2")
        f.text(x0 - 8, ys[k] + 4, age, cls="sm dim", anchor="end")
    f.text(ends[0] - 6, ys[0] + 4, f"{CDF[0]:.3f}", cls="sm bold", anchor="end")
    for k, fac in enumerate(LDF + [TAIL]):
        f.arrow(ends[k + 1] + 4, ys[k + 1] - 13, ends[k] + 4, ys[k] + 13,
                colour="var(--dim)", width=1.4)
        f.text(max(ends[k], ends[k + 1]) + 18, (ys[k] + ys[k + 1]) / 2 + 4,
               f"× {fac:.3f}", cls="sm", anchor="start")
    return f


@figure("Tail Factor", "Observed link ratios falling toward 1.000 until the data "
        "ends at 48 months, and the dashed extrapolation beyond it that the 1.010 "
        "tail factor stands for", width=WID)
def tail_factor() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 132, 0.95, 1.62, left=52, right=20, top=28, bottom=48)
    ax.frame(xlabel="age in months", xticks=[12, 60, 108], yticks=[1.0, 1.3, 1.6],
             yfmt=lambda t: f"{t:.1f}", grid=True)
    obs = [(12, 1.500), (24, 1.160), (36, 1.060), (48, 1.020)]
    ax.polyline(obs, colour=BLUE, width=2.4)
    for x, y in obs:
        ax.point(x, y, colour=BLUE, r=3.4)
    ax.polyline([(48, 1.020), (60, 1.006), (72, 1.003), (84, 1.001),
                 (96, 1.000), (108, 1.000), (120, 1.000)], colour=AMBER,
                width=2.2, dash=True)
    ax.vline(54, colour="var(--dim)")
    ax.label(54, 1.44, "data ends", cls="sm dim", anchor="end", dx=-6)
    ax.label(88, 1.10, "tail 1.010", cls="sm bold", fill=AMBER)
    return f


@figure("Severity Analysis", "Average claim severity by accident year rising from "
        "2,380 to 2,850, with a 4.6% annual trend fitted through it", width=WID)
def severity_analysis() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.4, 4.4, 2200, 3000, left=56, right=20, top=28, bottom=48)
    ax.frame(xlabel="accident year", ylabel="severity", xticks=[0, 1, 2, 3, 4],
             xfmt=lambda t: AYS[int(t)], yticks=[2200, 2600, 3000],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    sev = [2380, 2470, 2600, 2705, 2850]
    ax.bars([(k, v) for k, v in enumerate(sev)], colour=BLUE, opacity="0.6",
            base=2200)
    ax.curve(lambda x: 2380 * 1.0455 ** x, colour=ROSE, width=2.2)
    ax.label(1.6, 2860, "4.6% a year", cls="sm bold", fill=ROSE)
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Estimating claim liabilities — the methods
# ═══════════════════════════════════════════════════════════════════════════

@figure("Chain Ladder Method", "Each accident year's latest diagonal cell carried "
        "out to an ultimate column, AY 2024's 1,500 multiplied by 1.900 to 2,850",
        width=WID)
def chain_ladder_method() -> Fig:
    f = vcard()

    x0, y0, cw, ch, xu = 56, 128, 40, 44, 302
    for j, age in enumerate(AGES):
        f.text(x0 + cw * (j + 0.5), y0 - 10, age, cls="sm dim")
    f.text(xu, y0 - 10, "ult", cls="sm dim")
    for i, row in enumerate(TRI):
        cy = y0 + ch * (i + 0.5)
        f.text(x0 - 8, cy + 4, AYS[i], cls="sm dim", anchor="end")
        for j in range(len(row)):
            cx = x0 + cw * (j + 0.5)
            last = j == len(row) - 1
            f.rect(cx - cw / 2 + 1.5, cy - ch / 2 + 1.5, cw - 3, ch - 3, rx=3,
                   fill=BLUE if last else "var(--soft)",
                   fill_opacity="0.3" if last else None,
                   stroke=BLUE if last else "var(--edge)", stroke_width="1")
        f.rect(xu - cw / 2 + 1.5, cy - ch / 2 + 1.5, cw - 3, ch - 3, rx=3,
               fill=GREEN, fill_opacity="0.3", stroke=GREEN, stroke_width="1")
        f.arrow(x0 + cw * len(row) + 2, cy, xu - cw / 2 - 2, cy, colour=GREEN,
                width=1.4, dash=True)
    cy = y0 + ch * 4.5
    f.text(x0 + cw / 2, cy + 4, "1,500", cls="sm bold")
    f.text(xu, cy + 4, "2,850", cls="sm bold")
    f.text((x0 + cw + xu - cw / 2) / 2, cy - 8, "× 1.900", cls="sm bold")
    return f


@figure("Case Outstanding Development Method", "AY 2024's 900 of case reserves "
        "fanned out by a 2.500 factor into 2,250 of future payments, which with the "
        "600 already paid make the 2,850 ultimate", width=WID)
def case_outstanding_development_method() -> Fig:
    f = vcard()

    x0, x1 = 40, 320

    def px(v):
        return x0 + (x1 - x0) * v / 2850

    top, bot, h = 110, 256, 44
    f.rect(px(0), top, px(600) - px(0), h, rx=4, fill=GREEN, fill_opacity="0.4",
           stroke=GREEN, stroke_width="1.2")
    f.text((px(0) + px(600)) / 2, top + h / 2 + 4, "paid 600", cls="sm bold")
    f.rect(px(600), top, px(1500) - px(600), h, rx=4, fill=AMBER,
           fill_opacity="0.4", stroke=AMBER, stroke_width="1.2")
    f.text((px(600) + px(1500)) / 2, top + h / 2 + 4, "case 900", cls="sm bold")
    f.polygon([(px(600), top + h), (px(1500), top + h), (px(2850), bot),
               (px(600), bot)], fill=ROSE, fill_opacity="0.1", stroke="none")
    f.text((px(600) + px(2850)) / 2 - 20, (top + h + bot) / 2 + 4, "× 2.500",
           cls="sm bold")
    f.rect(px(0), bot, px(600) - px(0), h, rx=4, fill=GREEN, fill_opacity="0.4",
           stroke=GREEN, stroke_width="1.2")
    f.rect(px(600), bot, px(2850) - px(600), h, rx=4, fill=ROSE,
           fill_opacity="0.34", stroke=ROSE, stroke_width="1.2")
    f.text((px(600) + px(2850)) / 2, bot + h / 2 + 4, "future 2,250", cls="sm bold")
    brace(f, px(0), px(2850), bot + h + 6, depth=8, label="ultimate 2,850",
          label_cls="sm bold")
    return f


@figure("Expected Loss Method", "The expected-loss ultimate held flat at 2,600 "
        "whatever has been reported, against a chain-ladder ultimate that moves with "
        "reported losses", width=WID)
def expected_loss_method() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 3000, 2000, 3200, left=54, right=22, top=28, bottom=48)
    ax.frame(xlabel="reported losses", ylabel="ultimate",
             xticks=[0, 1000, 2000, 3000], xfmt=lambda t: f"{t:,.0f}",
             yticks=[2000, 2600, 3200], yfmt=lambda t: f"{t:,.0f}", grid=True)
    ax.curve(lambda c: 2600, colour=VIOLET, width=2.6)
    ax.curve(lambda c: c * 1.900, colour="var(--dim)", width=1.6, dash=True,
             xa=1050, xb=1680)
    ax.point(1500, 2600, colour=VIOLET, r=4.4)
    ax.label(2350, 2600, "expected loss", cls="sm bold", fill=VIOLET, dy=-8)
    ax.label(1500, 2850, "chain ladder", cls="sm dim", anchor="start", dx=6)
    return f


@figure("Bornhuetter-Ferguson Method", "The a priori 2,600 split into its expected "
        "reported and unreported shares, the unreported 47.4% carried down beside "
        "AY 2024's actual 1,500 reported to make a 2,732 ultimate", width=WID)
def bornhuetter_ferguson_method() -> Fig:
    f = vcard()

    x0, x1 = 40, 320

    def px(v):
        return x0 + (x1 - x0) * v / U_BF

    c, ibnr = TRI[4][0], (1 - PCT_RPT) * U_EL
    top, bot, h = 130, 280, 44
    f.text(x0, top - 10, "a priori 2,600", cls="sm bold", anchor="start")
    f.rect(px(0), top, px(U_EL - ibnr) - px(0), h, rx=4, fill="var(--dim)",
           fill_opacity="0.14", stroke="var(--dim)", stroke_width="1.2",
           stroke_dasharray="4 3")
    f.text((px(0) + px(U_EL - ibnr)) / 2, top + h / 2 + 4,
           f"{PCT_RPT:.1%}", cls="sm")
    f.rect(px(U_EL - ibnr), top, px(U_EL) - px(U_EL - ibnr), h, rx=4, fill=VIOLET,
           fill_opacity="0.34", stroke=VIOLET, stroke_width="1.2")
    f.text((px(U_EL - ibnr) + px(U_EL)) / 2, top + h / 2 + 4,
           f"{1 - PCT_RPT:.1%}", cls="sm bold")
    f.polygon([(px(U_EL - ibnr), top + h), (px(U_EL), top + h), (px(U_BF), bot),
               (px(c), bot)], fill=VIOLET, fill_opacity="0.1", stroke="none")
    f.rect(px(0), bot, px(c) - px(0), h, rx=4, fill=BLUE, fill_opacity="0.4",
           stroke=BLUE, stroke_width="1.2")
    f.text((px(0) + px(c)) / 2, bot + h / 2 + 4, f"reported {c:,}", cls="sm bold")
    f.rect(px(c), bot, px(U_BF) - px(c), h, rx=4, fill=VIOLET, fill_opacity="0.34",
           stroke=VIOLET, stroke_width="1.2")
    f.text((px(c) + px(U_BF)) / 2, bot + h / 2 + 4, f"IBNR {ibnr:,.0f}",
           cls="sm bold")
    brace(f, px(0), px(U_BF), bot + h + 6, depth=8, label=f"BF {U_BF:,.0f}",
          label_cls="sm bold")
    return f


@figure("Cape Cod Method", "Five years' premium, the used-up share of it and their "
        "reported losses, each stacked by accident year, with the losses coming to "
        "66.2% of the used-up premium", width=WID)
def cape_cod_method() -> Fig:
    f = vcard()

    used = [ep / cdf for ep, cdf in zip(EP, reversed(CDF))]
    rpt = [row[-1] for row in TRI]
    base, scale, w = 360, 250 / sum(EP), 64
    tops = []
    for cx, parts, colour, name in ((80, EP, "var(--dim)", "premium"),
                                    (180, used, BLUE, "used up"),
                                    (280, rpt, AMBER, "reported")):
        y = base
        for v in parts:
            h = v * scale
            f.rect(cx - w / 2, y - h, w, h, fill=colour, fill_opacity="0.3",
                   stroke=colour, stroke_width="1")
            y -= h
        f.text(cx, base + 18, name, cls="sm")
        tops.append(y)
    f.text(180, tops[1] - 8, f"{sum(used):,.0f}", cls="sm bold")
    f.text(280, tops[2] - 8, f"{sum(rpt):,}", cls="sm bold")
    f.arrow(180 + w / 2 + 2, tops[1] + 2, 280 - w / 2 - 2, tops[2] - 2,
            colour="var(--dim)", width=1.4)
    f.text(240, (tops[1] + tops[2]) / 2 - 6, f"ELR {sum(rpt) / sum(used):.1%}",
           cls="sm bold", anchor="start")
    return f


@figure("Benktander Method", "AY 2024's four ultimates in a column, the iteration "
        "stepping from expected loss through BF to Benktander and on toward the "
        "chain ladder", width=WID)
def benktander_method() -> Fig:
    f = vcard()

    ax = vaxes(f, 2500, 2920, 0, 4.4, left=44, right=24, top=28, bottom=48)
    ax.frame(xlabel="AY 2024 ultimate", xticks=[2600, 2700, 2800, 2900],
             xfmt=lambda t: f"{t:,.0f}", yticks=[], grid=True)
    rows = [("expected loss", U_EL, VIOLET), ("BF", U_BF, TEAL),
            ("Benktander", U_GB, GREEN), ("chain ladder", U_CL, BLUE)]
    pts = []
    for i, (name, value, colour) in enumerate(rows):
        y = 3.6 - i * 0.95
        px_, py_ = ax.p(value, y)
        f.circle(px_, py_, 5, fill=colour)
        f.line(ax.x0, py_, px_, py_, cls="thin", stroke=colour,
               stroke_width="1.4")
        f.text(px_ + 9, py_ + 4, f"{value:,.0f}", cls="sm bold", fill=colour,
               anchor="start")
        f.text(ax.x0 + 4, py_ - 9, name, cls="sm dim", anchor="start")
        pts.append((px_, py_))
    for k in range(3):
        (xa, ya), (xb, yb) = pts[k], pts[k + 1]
        f.arrow(xa + 3, ya + 8, xb - 3, yb - 8, colour="var(--dim)", width=1.3,
                dash=k == 2)
    return f


@figure("Frequency-Severity Method", "Ultimate losses drawn as a rectangle 1,000 "
        "ultimate claims wide and $2,850 of severity tall, with the 700 claims "
        "reported so far marked off", width=WID)
def frequency_severity_method() -> Fig:
    f = vcard()

    x0, x1, y0, y1 = 96, 320, 100, 330
    xr = x0 + (x1 - x0) * 0.7
    f.rect(x0, y0, xr - x0, y1 - y0, fill=GREEN, fill_opacity="0.3", stroke=GREEN,
           stroke_width="1.4")
    f.rect(xr, y0, x1 - xr, y1 - y0, fill=GREEN, fill_opacity="0.12", stroke=GREEN,
           stroke_width="1.4", stroke_dasharray="4 3")
    f.text((x0 + x1) / 2, (y0 + y1) / 2 + 4, "2,850,000", cls="bold")
    f.text(xr, y0 - 8, "700 reported", cls="sm")
    brace(f, x0, x1, y1 + 6, depth=8, label="1,000 claims", label_cls="sm bold")
    f.path(f"M{x0 - 6},{y0} H{x0 - 14} V{y1} H{x0 - 6}", cls="thin",
           stroke="var(--dim)", stroke_width="1.3")
    f.text(x0 - 20, (y0 + y1) / 2 + 4, "$2,850", cls="sm bold", anchor="end")
    return f


@figure("Berquist-Sherman Method", "Average case outstanding by accident year as "
        "reported, jumping in 2023, and restated onto 2024's adequacy as a smooth "
        "trend, with each old year raised to it", width=WID)
def berquist_sherman_method() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.4, 4.4, 400, 1300, left=56, right=22, top=28, bottom=48)
    ax.frame(xlabel="accident year", ylabel="average case", xticks=[0, 1, 2, 3, 4],
             xfmt=lambda t: AYS[int(t)], yticks=[400, 800, 1200],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    actual = [620, 660, 720, 900, 1180]
    restated = [880, 940, 1010, 1090, 1180]
    for k in range(4):
        x, ya = ax.px(k), ax.py(actual[k])
        f.arrow(x, ya - 6, x, ax.py(restated[k]) + 6, colour="var(--dim)",
                width=1.3)
    ax.polyline(list(enumerate(actual)), colour="var(--dim)", width=1.8, dash=True)
    ax.polyline(list(enumerate(restated)), colour=BLUE, width=2.4)
    for k in range(5):
        ax.point(k, actual[k], colour="var(--dim)", r=3.2)
        ax.point(k, restated[k], colour=BLUE, r=3.6)
    ax.label(2.5, 1050, "restated", cls="sm bold", fill=BLUE, dy=-18)
    ax.label(2.6, 720, "as reported", cls="sm dim", dy=24)
    return f


@figure("IBNR", "Reported claims whose case reserves will still grow, the IBNER, "
        "beside claims not yet reported at all, the pure IBNR", width=WID)
def ibnr() -> Fig:
    f = vcard()

    base, w = 340, 28
    known = [(50, 110, 70), (90, 65, 50), (130, 120, 68), (170, 65, 40)]
    unknown = [(230, 95), (270, 130), (310, 87)]
    for x, case, dev in known:
        f.rect(x - w / 2, base - case, w, case, rx=2, fill=AMBER, fill_opacity="0.5",
               stroke=AMBER, stroke_width="1.2")
        f.rect(x - w / 2, base - case - dev, w, dev, rx=2, fill=ROSE,
               fill_opacity="0.16", stroke=ROSE, stroke_width="1.3",
               stroke_dasharray="4 3")
    for x, h in unknown:
        f.rect(x - w / 2, base - h, w, h, rx=2, fill=VIOLET, fill_opacity="0.16",
               stroke=VIOLET, stroke_width="1.3", stroke_dasharray="4 3")
    f.line(28, base, 332, base, cls="axis")
    top_known = min(base - case - dev for _, case, dev in known)
    top_unknown = min(base - h for _, h in unknown)
    f.text(110, top_known - 10, "IBNER 570", cls="sm bold")
    f.text(270, top_unknown - 10, "pure IBNR 780", cls="sm bold")
    f.text(110, base + 18, "case 900", cls="sm")
    return f


@figure("Ultimate Loss", "AY 2024's losses by age as bands of paid, case reserves and "
        "IBNR that always stack to the same 2,850 ultimate, paid filling it as the "
        "claims settle", width=WID)
def ultimate_loss() -> Fig:
    f = vcard()

    ax = vaxes(f, 12, 84, 0, 3200, left=54, right=20, top=28, bottom=48)
    ax.frame(xlabel="age in months", xticks=[12, 36, 60, 84],
             yticks=[0, 1500, 3000], yfmt=lambda t: f"{t:,.0f}", grid=False)
    rpt = [(12, 1500), (24, 2250), (36, 2610), (48, 2767), (60, 2822),
           (72, 2845), (84, 2850)]
    paid = [(12, 600), (24, 1500), (36, 2150), (48, 2560), (60, 2740),
            (72, 2820), (84, 2850)]
    ult = U_CL
    bands = [([(12, 0)] + paid + [(84, 0)], GREEN),
             (paid + rpt[::-1], AMBER),
             (rpt + [(84, ult), (12, ult)], VIOLET)]
    for pts, colour in bands:
        f.polygon([ax.p(x, y) for x, y in pts], fill=colour, fill_opacity="0.3",
                  stroke="none")
    ax.polyline(paid, colour=GREEN, width=2)
    ax.polyline(rpt, colour=AMBER, width=2)
    ax.hline(ult, colour=VIOLET, dash=False, x_to=84)
    ax.label(22, 560, "paid", cls="sm bold")
    ax.label(20, 1500, "case", cls="sm bold")
    ax.label(22, 2500, "IBNR", cls="sm bold")
    ax.label(84, ult, f"ultimate {ult:,.0f}", cls="sm bold", anchor="end", dy=-8)
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Estimating claim liabilities — operational changes
# ═══════════════════════════════════════════════════════════════════════════

@figure("Claims Coding Changes", "Two bins of claims, four of them recoded out of "
        "coverage A and into coverage B, so each segment's count moves while the "
        "total stays the same", width=WID)
def claims_coding_changes() -> Fig:
    f = vcard()

    r, gap, base = 12, 38, 350

    def spot(cx, k):
        return cx + (k % 3 - 1) * gap, base - 20 - (k // 3) * gap

    for cx, name in ((100, "coverage A"), (260, "coverage B")):
        f.rect(cx - 66, 146, 132, base - 146 + 8, rx=8, fill="var(--soft)",
               stroke="var(--edge)", stroke_width="1.2")
        f.text(cx, base + 26, name, cls="sm bold")
    for k in range(14):
        x, y = spot(100, k)
        if k < 10:
            f.circle(x, y, r, fill=BLUE, fill_opacity="0.5", stroke=BLUE,
                     stroke_width="1.2")
        else:
            f.circle(x, y, r, fill="none", stroke=BLUE, stroke_width="1.2",
                     stroke_dasharray="3 2")
    for k in range(13):
        x, y = spot(260, k)
        moved = k >= 9
        f.circle(x, y, r, fill=AMBER, fill_opacity="0.5",
                 stroke=ROSE if moved else AMBER,
                 stroke_width="1.8" if moved else "1.2")
    f.arrow(130, 132, 230, 132, colour=ROSE, width=1.8)
    f.text(BCX, 120, "recoded", cls="sm bold")
    return f


@figure("Claims Processing Changes", "The share of claims closed by each age, "
        "higher at every age after claims start settling faster", width=WID)
def claims_processing_changes() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 60, 0, 1.05, left=52, right=22, top=28, bottom=48)
    ax.frame(xlabel="age in months", ylabel="claims closed",
             xticks=[12, 24, 36, 48, 60], yticks=[0, 0.5, 1.0],
             yfmt=lambda t: f"{t:.0%}", grid=True)
    old = [(12, 0.36), (24, 0.62), (36, 0.80), (48, 0.92), (60, 0.98)]
    new = [(12, 0.52), (24, 0.76), (36, 0.89), (48, 0.96), (60, 0.99)]
    ax.polyline(old, colour="var(--dim)", width=1.8, dash=True)
    _emergence(ax, new, ROSE)
    ax.label(30, 0.52, "before", cls="sm dim", dy=12)
    ax.label(26, 0.80, "after", cls="sm bold", fill=ROSE, dy=-8)
    return f


def _mix_beam(f: Fig, lrs, old_w, new_w, colours):
    """Segments standing on a beam at their own loss ratios, as tall as their share
    of the book: the old mix dashed, the new one filled. The aggregate loss ratio is
    the beam's balance point, so a fulcrum under each mix shows it move."""
    beam, w = 300, 40

    def px(lr):
        return 40 + (lr - 0.45) * 560

    for lr, wo, wn, colour in zip(lrs, old_w, new_w, colours):
        x = px(lr)
        f.rect(x - w / 2, beam - wn * 360, w, wn * 360, rx=3, fill=colour,
               fill_opacity="0.45", stroke=colour, stroke_width="1.2")
        f.rect(x - w / 2, beam - wo * 360, w, wo * 360, rx=3, fill="none",
               stroke="var(--dim)", stroke_width="1.3", stroke_dasharray="4 3")
        f.text(x, beam - max(wo, wn) * 360 - 8, f"{lr:.0%}", cls="sm bold")
    f.line(34, beam, 326, beam, cls="", stroke="var(--ink)", stroke_width="2.4",
           stroke_linecap="round")
    for ws, solid in ((old_w, False), (new_w, True)):
        agg = sum(wt * lr for wt, lr in zip(ws, lrs))
        x = px(agg)
        f.polygon([(x, beam + 2), (x - 10, beam + 20), (x + 10, beam + 20)],
                  fill=ROSE if solid else "none", fill_opacity="0.5",
                  stroke=ROSE if solid else "var(--dim)", stroke_width="1.4",
                  stroke_dasharray=None if solid else "3 2")
        f.text(x - 6 if solid else x + 6, beam + 36, f"{agg:.1%}",
               cls="sm bold" if solid else "sm dim",
               anchor="start" if solid else "end")


@figure("Underwriting Changes", "Three segments at fixed loss ratios on a beam, their "
        "weights shifting from the 2022 mix to the 2024 mix, which moves the balance "
        "point, the aggregate loss ratio, from 65.2% to 73.4%", width=WID)
def underwriting_changes() -> Fig:
    f = vcard()

    _mix_beam(f, [0.55, 0.70, 0.88], [0.50, 0.35, 0.15], [0.25, 0.35, 0.40],
              [GREEN, BLUE, ROSE])
    return f


@figure("Policy Provision Changes", "One 1,200 ground-up loss cut two ways: the old "
        "terms pay the first 1,000 of it, the new 250 deductible and 750 limit pay "
        "only the 750 above the deductible", width=WID)
def policy_provision_changes() -> Fig:
    f = vcard()

    x0, x1, base, scale = 140, 220, 370, 260 / 1200

    def py(v):
        return base - v * scale

    for lo, hi, colour, label in ((0, 250, AMBER, "deductible"),
                                  (250, 1000, BLUE, None),
                                  (1000, 1200, ROSE, "over limit")):
        f.rect(x0, py(hi), x1 - x0, py(lo) - py(hi), rx=3, fill=colour,
               fill_opacity="0.4", stroke=colour, stroke_width="1.2")
        if label:
            f.text((x0 + x1) / 2, (py(lo) + py(hi)) / 2 + 4, label, cls="sm")
    f.text((x0 + x1) / 2, py(1200) - 8, "1,200 loss", cls="sm bold")

    def bracket(x, lo, hi, tick):
        f.path(f"M{x + tick},{py(lo):.1f} H{x} V{py(hi):.1f} H{x + tick}",
               cls="thin", stroke="var(--ink)", stroke_width="1.4")

    bracket(128, 0, 1000, 6)
    f.text(120, (py(0) + py(1000)) / 2 + 4, "old 1,000", cls="sm bold",
           anchor="end")
    bracket(232, 250, 1000, -6)
    f.text(240, (py(250) + py(1000)) / 2 + 4, "new 750", cls="sm bold",
           anchor="start")
    return f


@figure("Case Adequacy", "Average case outstanding at 12 and 24 months by accident "
        "year, both stepping up together once case reserves are strengthened",
        width=WID)
def case_adequacy() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.4, 4.4, 0, 1400, left=56, right=22, top=28, bottom=48)
    f.rect(ax.px(2.5), ax.y0, ax.px(4.4) - ax.px(2.5), ax.y1 - ax.y0, fill=ROSE,
           fill_opacity="0.08", stroke="none")
    ax.frame(xlabel="accident year", ylabel="average case", xticks=[0, 1, 2, 3, 4],
             xfmt=lambda t: AYS[int(t)], yticks=[0, 700, 1400],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    for age, series, colour, at in (("12 months", [620, 660, 720, 900, 1180], BLUE,
                                     (1, 660, 18)),
                                    ("24 months", [880, 940, 1010, 1240], AMBER,
                                     (1, 940, -10))):
        pts = list(enumerate(series))
        ax.polyline(pts, colour=colour, width=2.2)
        for x, y in pts:
            ax.point(x, y, colour=colour, r=3.2)
        ax.label(at[0], at[1], age, cls="sm bold", dy=at[2])
    ax.label(3.45, 1400, "strengthened", cls="sm dim", dy=14)
    return f


@figure("Settlement Rate", "The share of claims closed at 12 months by accident year, "
        "level near 35% and then jumping in 2023 and 2024", width=WID)
def settlement_rate() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.4, 4.4, 0, 0.72, left=54, right=22, top=28, bottom=48)
    ax.frame(xlabel="accident year", ylabel="share closed",
             xticks=[0, 1, 2, 3, 4], xfmt=lambda t: AYS[int(t)],
             yticks=[0, 0.3, 0.6], yfmt=lambda t: f"{t:.0%}", grid=True)
    rates = [0.34, 0.35, 0.36, 0.47, 0.52]
    for k, v in enumerate(rates):
        ax.bars([(k, v)], colour=ROSE if k > 2 else TEAL, bw=30, opacity="0.72")
    ax.hline(0.35, colour="var(--dim)", x_to=4.4)
    ax.label(-0.3, 0.35, "old level", cls="sm dim", anchor="start", dy=-6)
    return f


@figure("Mix of Business", "Three territories at fixed loss ratios on a beam, their "
        "shares shifting from the 2022 mix to the 2024 mix, which moves the balance "
        "point, the aggregate loss ratio, from 69.5% to 76.1%", width=WID)
def mix_of_business() -> Fig:
    f = vcard()

    _mix_beam(f, [0.58, 0.72, 0.91], [0.45, 0.35, 0.20], [0.25, 0.35, 0.40],
              [GREEN, BLUE, ROSE])
    return f


@figure("Rate Level Change", "The cumulative rate level index stepping up from 1.000 "
        "in 2020 to 1.278 today, the gap that 2020 premium must be multiplied "
        "across to be comparable", width=WID)
def rate_level_change() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.3, 4.6, 0.95, 1.35, left=54, right=24, top=28, bottom=48)
    ax.frame(ylabel="rate index", xticks=[0, 1, 2, 3, 4],
             xfmt=lambda t: AYS[int(t)], yticks=[1.0, 1.1, 1.2, 1.3],
             yfmt=lambda t: f"{t:.2f}", grid=True)
    steps = [(0, 1.000), (1, 1.000), (1, 1.060), (2, 1.060), (2, 1.156),
             (3, 1.156), (3, 1.214), (4, 1.214), (4, 1.278), (4.5, 1.278)]
    ax.hline(1.278, colour="var(--dim)", x_to=4)
    ax.polyline(steps, colour=BLUE, width=2.4)
    for k, v in ((1, 1.060), (2, 1.156), (3, 1.214), (4, 1.278)):
        ax.point(k, v, colour=BLUE, r=3.2)
    ax.label(4.4, 1.278, "current", cls="sm bold", fill=BLUE, anchor="end",
             dy=-8)
    x = ax.px(0.15)
    f.arrow(x, ax.py(1.0) - 3, x, ax.py(1.278) + 3, colour=AMBER, width=1.8)
    ax.label(0.15, 1.14, "× 1.278", cls="sm bold", anchor="start", dx=7)
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Estimating claim liabilities — recoveries and reinsurance
# ═══════════════════════════════════════════════════════════════════════════

@figure("Deductible Recovery", "The insurer paying a claimant the full 700 of a claim, "
        "then billing the insured back for the 250 inside its deductible", width=WID)
def deductible_recovery() -> Fig:
    f = vcard()

    tower(f, BCX, 132, 64, BLUE)
    f.text(BCX, 184, "insurer", cls="sm bold")
    person(f, 72, 290, 62, VIOLET)
    f.text(72, 342, "claimant", cls="sm bold")
    house(f, 288, 290, 62, GREEN)
    f.text(288, 342, "insured", cls="sm bold")
    f.arrow(BCX - 26, 168, 96, 256, colour=BLUE, width=2.2)
    f.text(112, 206, "pays 700", cls="sm bold", anchor="end")
    f.arrow(264, 256, BCX + 26, 168, colour=GREEN, width=2.2, dash=True)
    f.text(248, 206, "repays 250", cls="sm bold", anchor="start")
    return f


@figure("Salvage and Subrogation", "A claim payment of 2,850 on a timeline, followed "
        "later by a salvage recovery of 90 from the wreck and a subrogation recovery "
        "of 160 from the party at fault", width=WID)
def salvage_and_subrogation() -> Fig:
    f = vcard()

    y = 230
    f.arrow(40, y, 330, y, colour="var(--axis)", width=1.2)
    f.text(330, y + 18, "time", cls="sm dim", anchor="end")
    f.arrow(80, y, 80, 370, colour=ROSE, width=2.4)
    f.text(90, 336, "paid 2,850", cls="sm bold", anchor="start")
    for x, top, name, amount, icon in ((196, 184, "salvage", 90, car),
                                       (284, 164, "subrogation", 160, scales)):
        f.arrow(x, y, x, top, colour=GREEN, width=2.4)
        f.text(x + 8, (y + top) / 2 + 4, f"+{amount}", cls="sm bold", anchor="start")
        icon(f, x, top - 38, 50, TEAL)
        f.text(x, top - 74, name, cls="sm bold")
    return f


@figure("Reinsurance Recovery", "The cedant's balance sheet carrying the full 2,250 of "
        "gross unpaid claims as a liability and the 640 due from the reinsurer as a "
        "separate asset", width=WID)
def reinsurance_recovery() -> Fig:
    f = vcard()

    base, scale = 370, 240 / 2250
    f.line(BCX, 90, BCX, base, cls="rule")
    f.line(30, base, 330, base, cls="axis")
    f.text(100, 100, "assets", cls="sm dim")
    f.text(260, 100, "liabilities", cls="sm dim")
    h = 2250 * scale
    f.rect(200, base - h, 120, h, rx=4, fill=VIOLET, fill_opacity="0.3",
           stroke=VIOLET, stroke_width="1.2")
    f.text(260, base - h / 2 + 4, "gross 2,250", cls="sm bold")
    h = 640 * scale
    f.rect(40, base - h, 120, h, rx=4, fill=AMBER, fill_opacity="0.4",
           stroke=AMBER, stroke_width="1.2")
    f.text(100, base - h / 2 + 4, "recoverable 640", cls="sm bold")
    tower(f, 100, 212, 56, AMBER)
    f.text(100, 172, "reinsurer", cls="sm bold")
    f.arrow(100, 244, 100, base - h - 4, colour=AMBER, width=1.8)
    return f


@figure("Gross Losses", "AY 2024's 2,850 gross ultimate as one column, stacked from "
        "the net the insurer keeps and the ceded, salvage and subrogation and "
        "deductible shares that come off it", width=WID)
def gross_losses() -> Fig:
    f = vcard()

    x, w, y = 110, 82, 120
    for amount, name, colour in ((1610, "net 1,610", BLUE),
                                 (640, "ceded 640", AMBER),
                                 (250, "S&S 250", GREEN),
                                 (350, "deductible 350", ROSE)):
        h = amount / 2850 * 240
        f.rect(x, y, w, h, rx=4, fill=colour, fill_opacity="0.36", stroke=colour,
               stroke_width="1.2")
        f.text(x + w + 14, y + h / 2 + 4, name, cls="sm", anchor="start")
        y += h
    f.path(f"M{x - 4},120 H{x - 12} V360 H{x - 4}", cls="thin",
           stroke="var(--ink)", stroke_width="1.4")
    f.text(x - 18, 244, "gross 2,850", cls="sm bold", anchor="end")
    return f


@figure("Ceded Losses", "The reinsurer's share of a claim against its gross size: a "
        "straight 30% under a quota share, and nothing below 500 then everything up "
        "to 1,500 more under an excess treaty", width=WID)
def ceded_losses() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 2600, 0, 1400, left=56, right=22, top=28, bottom=48)
    ax.frame(xlabel="gross claim", ylabel="ceded", xticks=[0, 1000, 2000],
             xfmt=lambda t: f"{t:,.0f}", yticks=[0, 700, 1400],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    ax.curve(lambda x: 0.30 * x, colour=TEAL, width=2.2)
    ax.curve(lambda x: min(max(x - 500, 0), 1500), colour=AMBER, width=2.6)
    ax.label(1500, 450, "quota share 30%", cls="sm bold", fill=TEAL,
             anchor="start", dy=18)
    ax.label(1350, 850, "1,500 xs 500", cls="sm bold", fill=AMBER, anchor="end",
             dy=-10)
    return f


@figure("Net Losses", "A waterfall from AY 2024's 2,850 gross ultimate, taking off "
        "640 ceded, 250 of salvage and subrogation and 350 of deductibles to leave "
        "1,610 net", width=WID)
def net_losses() -> Fig:
    f = vcard()

    def px(v):
        return 110 + v * 220 / 2850

    rows = [("gross", 0, 2850, VIOLET), ("ceded", 2210, 2850, AMBER),
            ("S&S", 1960, 2210, GREEN), ("deductible", 1610, 1960, ROSE),
            ("net", 0, 1610, BLUE)]
    ys = [112 + 60 * i for i in range(5)]
    for i, (name, lo, hi, colour) in enumerate(rows):
        y = ys[i]
        f.rect(px(lo), y - 14, px(hi) - px(lo), 28, rx=4, fill=colour,
               fill_opacity="0.4", stroke=colour, stroke_width="1.2")
        f.text(100, y + 4, name, cls="sm bold" if i in (0, 4) else "sm",
               anchor="end")
        if 0 < i < 4:
            f.text(px(lo) - 6, y + 4, f"−{hi - lo:,}", cls="sm", anchor="end")
            f.line(px(lo), y + 14, px(lo), ys[i + 1] - 14, cls="thin dot",
                   stroke="var(--dim)", stroke_width="1.2")
        else:
            f.text(px(hi) - 8, y + 4, f"{hi:,}", cls="sm bold", anchor="end")
    f.line(px(2850), ys[0] + 14, px(2850), ys[1] - 14, cls="thin dot",
           stroke="var(--dim)", stroke_width="1.2")
    return f


@figure("Unallocated Loss Adjustment Expenses ULAE", "The classical ULAE reserve: "
        "half of the 900 of case reserves and all of the 1,350 of IBNR, charged at the "
        "6.0% paid ratio, give a 108 reserve", width=WID)
def ulae() -> Fig:
    f = vcard()

    base, s = 356, 0.2
    for x, amount, weight, colour, name in ((40, 900, 0.5, AMBER, "case 900"),
                                            (130, 1350, 1.0, VIOLET, "IBNR 1,350")):
        f.rect(x, base - amount * s, 70, amount * s, rx=3, fill=colour,
               fill_opacity="0.14", stroke=colour, stroke_width="1.2",
               stroke_dasharray="4 3")
        h = amount * weight * s
        f.rect(x, base - h, 70, h, rx=3, fill=colour, fill_opacity="0.55",
               stroke=colour, stroke_width="1.2")
        f.text(x + 35, base - h / 2 + 4, f"× {weight:.1f}", cls="sm bold")
        f.text(x + 35, base + 18, name, cls="sm")
    ulae_h = 108 * s
    f.rect(262, base - ulae_h, 50, ulae_h, rx=3, fill=GREEN, fill_opacity="0.6",
           stroke=GREEN, stroke_width="1.2")
    f.text(287, base + 18, "ULAE 108", cls="sm bold")
    f.arrow(206, base - ulae_h / 2, 256, base - ulae_h / 2, colour="var(--dim)",
            width=1.6)
    f.text(231, base - ulae_h / 2 - 10, "× 6.0%", cls="sm bold")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Estimating claim liabilities — monitoring and communication
# ═══════════════════════════════════════════════════════════════════════════

@figure("Reserve Adequacy", "A carried reserve of 2,180 inside the 2,050 to 2,440 "
        "reasonable range but 70 short of the 2,250 indicated estimate", width=WID)
def reserve_adequacy() -> Fig:
    f = vcard()

    def px(v):
        return 78 + (v - 2000) * 208 / 500

    y = 280
    f.rect(px(2050), 140, px(2440) - px(2050), y - 144, rx=6, fill=BLUE,
           fill_opacity="0.12", stroke=BLUE, stroke_width="1.2")
    f.text(px(2050) + 8, 160, "range", cls="sm bold", anchor="start")
    f.line(52, y, 312, y, cls="axis")
    for v in (2000, 2250, 2500):
        f.line(px(v), y - 4, px(v), y + 4, cls="tick")
        f.text(px(v), y + 18, f"{v:,}", cls="sm dim")
    f.line(px(2250), 132, px(2250), y, cls="thin dash", stroke=GREEN,
           stroke_width="1.6")
    f.text(px(2250), 124, "indicated 2,250", cls="sm bold")
    f.rect(px(2180), y - 18, px(2250) - px(2180), 12, rx=2, fill=ROSE,
           fill_opacity="0.6")
    f.text((px(2180) + px(2250)) / 2, y - 26, "−70", cls="sm bold")
    f.arrow(px(2180), y + 76, px(2180), y + 8, colour=ROSE, width=1.8)
    f.text(px(2180), y + 92, "carried 2,180", cls="sm bold")
    return f


@figure("Pure Premium Analysis", "Pure premium, frequency and severity indexed to "
        "2020: severity rising 4.6% a year and frequency falling 1.2%, so pure "
        "premium rises 3.3%", width=WID)
def pure_premium_analysis() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.3, 4.3, 0.92, 1.20, left=54, right=26, top=28, bottom=48)
    ax.frame(xlabel="accident year", ylabel="index", xticks=[0, 1, 2, 3, 4],
             xfmt=lambda t: AYS[int(t)], yticks=[0.95, 1.05, 1.15],
             yfmt=lambda t: f"{t:.2f}", grid=True)
    for series, colour, name in (
            ([1.000, 1.046, 1.093, 1.143, 1.196], ROSE, "severity"),
            ([1.000, 0.988, 0.976, 0.964, 0.953], BLUE, "frequency"),
            ([1.000, 1.033, 1.067, 1.102, 1.140], GREEN, "pure premium")):
        ax.polyline([(k, v) for k, v in enumerate(series)], colour=colour,
                    width=2.2)
        ax.label(4, series[4], name, cls="sm bold", fill=colour, anchor="end",
                 dx=-4, dy=-8 if colour is ROSE else 16)
    return f


@figure("Actual vs Expected Analysis", "Each accident year's emergence during 2024 "
        "drawn inside the outline of what the prior valuation expected, 2022 and 2023 "
        "running over it at A/E ratios of 1.17 and 1.24", width=WID)
def actual_vs_expected_analysis() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.5, 4.5, 0, 700, left=56, right=22, top=28, bottom=48)
    ax.frame(xlabel="accident year", ylabel="emergence", xticks=[0, 1, 2, 3, 4],
             xfmt=lambda t: AYS[int(t)], yticks=[0, 300, 600],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    expected = [40, 90, 180, 340, 640]
    actual = [36, 84, 210, 420, 610]
    for k in range(5):
        x = ax.px(k)
        hot = actual[k] > expected[k] * 1.05
        colour = ROSE if hot else BLUE
        f.rect(x - 11, ax.py(actual[k]), 22, ax.y1 - ax.py(actual[k]), rx=2,
               fill=colour, fill_opacity="0.72")
        f.rect(x - 17, ax.py(expected[k]), 34, ax.y1 - ax.py(expected[k]), rx=2,
               fill="none", stroke="var(--dim)", stroke_width="1.3",
               stroke_dasharray="4 3")
        if hot:
            ax.label(k, actual[k], f"{actual[k] / expected[k]:.2f}",
                     cls="sm bold", dy=-8)
    ax.label(3.55, 640, "expected", cls="sm dim", anchor="end", dy=4)
    return f


@figure("Roll Forward Analysis", "A waterfall taking the reserve from 5,200 at the "
        "opening through 2,850 for the new accident year, 2,400 of payments and 180 of "
        "prior-year development to 5,830 at the close", width=WID)
def roll_forward_analysis() -> Fig:
    f = vcard()

    bars = [("opening", 5200, 0, VIOLET), ("new AY", 2850, 5200, GREEN),
            ("paid", -2400, 8050, ROSE), ("PY dev", 180, 5650, AMBER),
            ("closing", 5830, 0, BLUE)]
    ax = vaxes(f, -0.6, 4.6, 0, 8600, left=58, right=20, top=28, bottom=48)
    ax.frame(xticks=[0, 1, 2, 3, 4],
             xfmt=lambda t: bars[int(t)][0], yticks=[0, 4000, 8000],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    bw = (ax.px(1) - ax.px(0)) * 0.5
    ends = []
    for k, (_, delta, base, colour) in enumerate(bars):
        x = ax.px(k)
        lo, hi = sorted((base, base + delta))
        f.rect(x - bw / 2, ax.py(hi), bw, ax.py(lo) - ax.py(hi), rx=2,
               fill=colour, fill_opacity="0.72")
        sign = "" if k in (0, 4) else ("+" if delta > 0 else "−")
        f.text(x, ax.py(hi) - 8, f"{sign}{abs(delta):,}", cls="sm")
        ends.append(base + delta)
    for k in range(4):
        y = ax.py(ends[k])
        f.line(ax.px(k) + bw / 2, y, ax.px(k + 1) - bw / 2, y, cls="thin dot",
               stroke="var(--dim)", stroke_width="1.2")
    return f


@figure("Reserve Communication", "A 2,250 point estimate at the peak of a bell curve, "
        "with the reasonable range from low to high shaded beneath it", width=WID)
def reserve_communication() -> Fig:
    f = vcard()

    ax = vaxes(f, 1700, 2800, 0, 1.15, left=24, right=24, top=40, bottom=48)

    def dens(x):
        z = (x - 2250) / 190
        return math.exp(-z * z / 2)

    ax.area(dens, 1950, 2560, colour=BLUE, opacity="0.20")
    ax.curve(dens, colour=BLUE, width=2.2)
    f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
    for v, lab, colour in ((1950, "low", "var(--dim)"), (2250, "2,250", GREEN),
                           (2560, "high", "var(--dim)")):
        x = ax.px(v)
        f.line(x, ax.y1, x, ax.py(dens(v)), cls="thin dash", stroke=colour,
               stroke_width="1.3")
        f.text(x, ax.y1 + 17, lab, cls="sm bold" if colour is GREEN else "sm dim")
    return f


@figure("Stakeholder Reporting", "One reserve estimate at the centre, fanning out to "
        "the actuarial report, management, the regulator and investors in beams that "
        "narrow as each audience gets less detail", width=WID)
def stakeholder_reporting() -> Fig:
    f = vcard()

    cx, cy, r = BCX, BCY + 4, 36
    targets = [(76, 128, 46, "report", VIOLET, document),
               (284, 128, 30, "management", BLUE, person),
               (76, 322, 18, "regulator", TEAL, building),
               (284, 322, 8, "investors", AMBER, None)]
    for tx, ty, w, name, colour, icon in targets:
        dx, dy = tx - cx, ty - cy
        d = math.hypot(dx, dy)
        ux, uy = dx / d, dy / d
        nx, ny = -uy, ux
        sx, sy = cx + ux * (r - 4), cy + uy * (r - 4)
        ex, ey = tx - ux * 34, ty - uy * 34
        f.polygon([(sx + nx * 3, sy + ny * 3), (ex + nx * w / 2, ey + ny * w / 2),
                   (ex - nx * w / 2, ey - ny * w / 2), (sx - nx * 3, sy - ny * 3)],
                  fill=colour, fill_opacity="0.3", stroke="none")
        if icon:
            icon(f, tx, ty, 44, colour)
        else:
            coins(f, tx, ty + 20, 4, 15, colour)
        f.text(tx, ty + 42, name, cls="sm bold")
    f.circle(cx, cy, r, fill=GREEN, fill_opacity="0.25", stroke=GREEN,
             stroke_width="1.6")
    f.text(cx, cy + 5, "2,250", cls="bold")
    return f


@figure("Regulatory Reporting", "Schedule P and the actuarial opinion filed with the "
        "regulator, with the actuarial report standing behind the opinion", width=WID)
def regulatory_reporting() -> Fig:
    f = vcard()

    docs = [(112, "Schedule P", BLUE), (232, "opinion", AMBER),
            (340, "report", VIOLET)]
    for y, name, colour in docs:
        document(f, 80, y, 52, colour)
        f.text(112, y + 4, name, cls="sm bold", anchor="start")
    building(f, 284, 226, 72, ROSE)
    f.text(284, 286, "regulator", cls="sm bold")
    f.arrow(176, 118, 244, 196, colour=BLUE, width=1.8)
    f.arrow(166, 232, 242, 232, colour=AMBER, width=1.8)
    f.arrow(80, 312, 80, 262, colour=VIOLET, width=1.6, dash=True)
    return f


@figure("External Information in Reserving", "Link ratios from four thin years of own "
        "data swinging around a smooth industry pattern, and the selected pattern "
        "blended mostly from the industry", width=WID)
def external_information_in_reserving() -> Fig:
    f = vcard()

    ax = vaxes(f, -6, 60, 0.95, 1.75, left=54, right=24, top=28, bottom=48)
    ax.frame(xlabel="age in months", ylabel="link ratio",
             xticks=[12, 24, 36, 48, 60], yticks=[1.0, 1.25, 1.5],
             yfmt=lambda t: f"{t:.2f}", grid=True)
    own = [(12, 1.62), (24, 1.09), (36, 1.14), (48, 0.99), (60, 1.03)]
    ind = [(12, 1.48), (24, 1.16), (36, 1.07), (48, 1.03), (60, 1.01)]
    sel = [(x, 0.30 * a + 0.70 * b) for (x, a), (_, b) in zip(own, ind)]
    ax.polyline(ind, colour=AMBER, width=2.2, dash=True)
    ax.polyline(own, colour=BLUE, width=1.6)
    for x, y in own:
        ax.point(x, y, colour=BLUE, r=3.6)
    ax.polyline(sel, colour=GREEN, width=2.6)
    ax.label(36, 1.14, "own data", cls="sm bold", fill=BLUE, dy=-9)
    ax.label(36, 1.07, "industry", cls="sm bold", fill=AMBER, dy=17)
    ax.label(12, sel[0][1], "selected", cls="sm bold", fill=GREEN, anchor="end",
             dx=-8, dy=4)
    return f
