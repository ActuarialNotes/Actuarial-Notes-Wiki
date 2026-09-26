"""Figures for the Exam 5 (CAS) concept pages — ratemaking and reserving.

Same contract as `figures_exam_p.py` / `figures_exam_fm.py` /
`figures_exam_mas_i.py` / `figures_exam_mas_ii.py`: each builder returns a `Fig`
from `vcard()` — a portrait card carrying a title, one picture and one formula.
Grouped in syllabus order:

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
    Axes, Fig, brace, timeline, vaxes, vcard,
    BX0, BY0, BX1, BY1, BCX, BCY,
    building, car, coins, cross, document, house, person, scales, shield, tower,
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
def _hbar(f: Fig, y, parts, x0=40, x1=320, height=30, label_cls="sm",
          opacity="0.30"):
    """A horizontal stacked bar. `parts` is a list of (share, label, colour).

    Returns the list of segment centres, so a caller can hang a note under one.
    """
    total = sum(p[0] for p in parts) or 1.0
    x, centres = x0, []
    for share, label, colour in parts:
        w = (x1 - x0) * share / total
        f.rect(x, y - height / 2, w, height, rx=4, fill=colour,
               fill_opacity=opacity, stroke=colour, stroke_width="1.2")
        if label:
            f.text(x + w / 2, y + 4, label, cls=label_cls)
        centres.append(x + w / 2)
        x += w
    return centres


def _vbars(f: Fig, values, labels, y_base, x0=52, x1=316, top=None, colour=BLUE,
           fmt=None, bar_frac=0.58, value_cls="sm", label_cls="sm dim",
           colours=None):
    """A simple column chart drawn straight onto the card. Returns bar centres."""
    top = top or (max(values) * 1.0)
    n = len(values)
    slot = (x1 - x0) / n
    bw = slot * bar_frac
    height = 132
    centres = []
    for i, v in enumerate(values):
        cx = x0 + slot * (i + 0.5)
        h = height * v / top
        col = colours[i] if colours else colour
        f.rect(cx - bw / 2, y_base - h, bw, h, rx=3, fill=col, fill_opacity="0.75")
        if fmt:
            f.text(cx, y_base - h - 7, fmt(v), cls=value_cls)
        f.text(cx, y_base + 15, labels[i], cls=label_cls)
        centres.append(cx)
    f.line(x0 - 6, y_base, x1 + 6, y_base, cls="axis")
    return centres


def _flow(f: Fig, y, labels, colours=None, x0=32, x1=328, h=26, cls="sm"):
    """A left-to-right chain of chips joined by arrows."""
    n = len(labels)
    slot = (x1 - x0) / n
    centres = []
    for i, label in enumerate(labels):
        cx = x0 + slot * (i + 0.5)
        colour = (colours or [BLUE] * n)[i]
        f.chip(cx, y, label, colour=colour, w=slot - 14, h=h, cls=cls)
        centres.append(cx)
        if i:
            f.arrow(centres[i - 1] + (slot - 14) / 2 + 1, y,
                    cx - (slot - 14) / 2 - 1, y, colour="var(--dim)", width=1.3)
    return centres


def _triangle(f: Fig, rows, x0=32, y0=126, cw=52, ch=27, ages=None, labels=None,
              fmt=_money, cell_cls="sm", head_cls="sm dim", shade=None,
              shade_colour=BLUE, ring=None, ring_colour=ROSE):
    """A development triangle: cohorts down, maturities across.

    `shade` and `ring` are predicates on (row, col) — the first fills a cell,
    the second outlines it. Returns a (row, col) → (cx, cy) map.
    """
    ages = ages or AGES
    labels = labels or AYS
    at = {}
    for j, age in enumerate(ages):
        f.text(x0 + 40 + cw * (j + 0.5), y0 - 8, age, cls=head_cls)
    for i, row in enumerate(rows):
        cy = y0 + ch * (i + 0.5)
        f.text(x0 + 34, cy + 4, labels[i], cls=head_cls, anchor="end")
        for j, v in enumerate(row):
            cx = x0 + 40 + cw * (j + 0.5)
            if shade and shade(i, j):
                f.rect(cx - cw / 2 + 1.5, cy - ch / 2 + 1.5, cw - 3, ch - 3, rx=3,
                       fill=shade_colour, fill_opacity="0.18")
            if ring and ring(i, j):
                f.rect(cx - cw / 2 + 1.5, cy - ch / 2 + 1.5, cw - 3, ch - 3, rx=3,
                       fill="none", stroke=ring_colour, stroke_width="1.6")
            f.text(cx, cy + 4, fmt(v), cls=cell_cls)
            at[(i, j)] = (cx, cy)
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

@figure("Ratemaking", "The premium dollar split into losses, LAE, expenses and "
        "underwriting profit", width=WID)
def ratemaking() -> Fig:
    f = vcard()

    f.text(BCX, 100, "where a $520 average premium goes", cls="sm dim")
    x, w, y = 62, 78, 128
    for share, name, colour in ((0.62, "losses", BLUE), (0.07, "LAE", TEAL),
                                (0.26, "expenses", AMBER),
                                (0.05, "profit", GREEN)):
        h = share * 210
        f.rect(x, y, w, h, rx=4, fill=colour, fill_opacity="0.30", stroke=colour,
               stroke_width="1.2")
        f.text(x + w + 12, y + h / 2 + 4, f"{name}  {share:.0%}", cls="sm",
               anchor="start")
        y += h
    f.text(BCX, 360, "and every one of them is a projection", cls="sm dim")
    return f


@figure("Exposure Base", "Expected loss rising in proportion to the exposure base",
        width=WID)
def exposure_base() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 5, 0, 2000, left=52, right=18, top=30, bottom=66)
    ax.frame(xticks=[0, 1, 2, 3, 4, 5], yticks=[0, 1000, 2000],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    ax.curve(lambda x: 360 * x, colour=BLUE, width=2.4)
    for x in (1, 2, 3, 4):
        ax.point(x, 360 * x, colour=BLUE, r=3.4)
    ax.label(3.05, 360 * 3.4, "360 per car-year", cls="sm bold", fill=BLUE,
             anchor="end")
    f.text(BCX, ax.y1 + 32, "earned exposures (car-years)", cls="sm dim")
    f.text(BCX, BY1 - 18, "proportional, practical, verifiable,", cls="sm dim")
    f.text(BCX, BY1 - 2, "and not manipulable by the insured", cls="sm dim")
    return f


@figure("Line of Business", "Four lines of business with their exposure bases and "
        "indicated changes", width=WID)
def line_of_business() -> Fig:
    f = vcard()

    rows = [("Personal auto", "car-year", 7.3, BLUE),
            ("Homeowners", "house-year", 12.5, AMBER),
            ("Workers comp", "payroll/100", -2.4, GREEN),
            ("General liability", "sales/1,000", 4.1, VIOLET)]
    x_zero, scale = 236, 4.6
    for i, (name, base, chg, colour) in enumerate(rows):
        y = 128 + i * 52
        f.text(34, y - 6, name, cls="sm bold", anchor="start")
        f.text(34, y + 10, base, cls="sm dim", anchor="start")
        w = abs(chg) * scale
        x = x_zero if chg > 0 else x_zero - w
        f.rect(x, y - 12, w, 20, rx=3, fill=colour, fill_opacity="0.65")
        f.text(x_zero + (w + 8 if chg > 0 else -w - 8), y + 3,
               f"{chg:+.1f}%", cls="sm", anchor="start" if chg > 0 else "end")
    f.line(x_zero, 106, x_zero, 340, cls="rule")
    f.text(BCX, 366, "one exposure base, one rating plan, one triangle",
           cls="sm dim")
    return f


@figure("Ratemaking Data Organization", "The four data aggregations placed on the "
        "accuracy-versus-availability trade-off", width=WID)
def ratemaking_data_organization() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 10, left=44, right=20, top=34, bottom=54)
    ax.frame(xticks=[], yticks=[], arrows=True)
    pts = [(8.6, 2.2, "Calendar", GREEN), (5.4, 6.0, "Accident", BLUE),
           (5.0, 4.2, "Report", TEAL), (1.8, 8.8, "Policy", AMBER)]
    for x, y, name, colour in pts:
        ax.point(x, y, colour=colour, r=5)
        ax.label(x, y, name, cls="sm bold", fill=colour, dy=-11)
    ax.curve(lambda x: 10.4 - 0.95 * x, colour="var(--dim)", width=1.3, dash=True,
             xa=0.6, xb=9.4)
    f.text(ax.x0 - 6, ax.y0 - 14, "accuracy", cls="sm dim", anchor="start")
    f.text(ax.x1, ax.y1 + 20, "availability", cls="sm dim", anchor="end")
    f.text(BCX, BY1 - 2, "policy year matches best and closes last",
           cls="sm dim")
    return f


@figure("Calendar Year", "Calendar-year aggregation capturing every transaction "
        "booked inside one year", width=WID)
def calendar_year() -> Fig:
    f = vcard()

    px = _calendar_axis(f, 300, ["2023", "2024", "2025"], band=1, y_top=126)
    spans = [(0.30, 1.30), (0.75, 1.75), (1.20, 2.20), (1.65, 2.65)]
    _policy_bars(f, 150, spans, x0=48, x1=318, t0=0.0, t1=3.0, gap=30)
    f.text(BCX, 112, "CY 2024", cls="sm bold", fill=AMBER)
    f.text(BCX, 336, "the year closes at 12/31 and never reopens",
           cls="sm dim")
    f.text(BCX, 354, "— fast to obtain, but it mixes cohorts", cls="sm dim")
    return f


@figure("Policy Year", "Policy-year aggregation following the policies written in "
        "one year to their expiry", width=WID)
def policy_year() -> Fig:
    f = vcard()

    _calendar_axis(f, 300, ["2023", "2024", "2025"], band=1, y_top=126)
    spans = [(1.02, 2.02), (1.28, 2.28), (1.55, 2.55), (1.86, 2.86)]
    _policy_bars(f, 150, spans, x0=48, x1=318, t0=0.0, t1=3.0, gap=30,
                 colour=AMBER)
    f.text(BCX, 112, "PY 2024", cls="sm bold", fill=AMBER)
    f.text(BCX, 336, "losses and premium come from the same policies", cls="sm dim")
    f.text(BCX, 354, "— the cleanest match, and 24 months to fill", cls="sm dim")
    return f


@figure("Accident Year", "Accident-year aggregation grouping losses by the date of "
        "the event", width=WID)
def accident_year() -> Fig:
    f = vcard()

    _calendar_axis(f, 300, ["2023", "2024", "2025"], band=1, y_top=126)
    spans = [(0.55, 1.55), (0.90, 1.90), (1.35, 2.35), (1.70, 2.70)]
    px, ys = _policy_bars(f, 150, spans, x0=48, x1=318, t0=0.0, t1=3.0, gap=30)
    events = [(0, 1.22), (1, 1.10), (1, 1.62), (2, 1.48), (3, 2.10)]
    for i, t in events:
        colour = ROSE if 1.0 <= t < 2.0 else "var(--dim)"
        f.circle(px(t), ys[i], 4.2, fill=colour)
    f.text(BCX, 112, "AY 2024", cls="sm bold", fill=AMBER)
    f.text(BCX, 336, "four of the five accidents fall in 2024 —", cls="sm dim")
    f.text(BCX, 354, "the policies they came from do not matter", cls="sm dim")
    return f


@figure("Report Year", "Claims grouped by report date, with the reporting lag drawn "
        "from each accident", width=WID)
def report_year() -> Fig:
    f = vcard()

    px = _calendar_axis(f, 300, ["2023", "2024", "2025"], band=1, y_top=126)
    lags = [(0.45, 1.15), (0.80, 1.42), (1.10, 1.70), (1.35, 2.30)]
    for i, (acc, rpt) in enumerate(lags):
        y = 150 + i * 30
        f.circle(px(acc), y, 4.2, fill=BLUE)
        colour = ROSE if 1.0 <= rpt < 2.0 else "var(--dim)"
        f.arrow(px(acc) + 5, y, px(rpt), y, colour=colour, width=1.5)
        f.circle(px(rpt), y, 4.2, fill=colour)
    f.text(BCX, 112, "RY 2024", cls="sm bold", fill=AMBER)
    f.text(58, 336, "● accident", cls="sm dim", anchor="start")
    f.text(200, 336, "→ ● report", cls="sm dim", anchor="start")
    f.text(BCX, 358, "a report year has no pure IBNR — only IBNER", cls="sm dim")
    return f


@figure("Close Year", "Claims grouped by settlement date, with the settlement lag "
        "drawn from each accident", width=WID)
def close_year() -> Fig:
    f = vcard()

    px = _calendar_axis(f, 300, ["2023", "2024", "2025"], band=1, y_top=126)
    lags = [(0.30, 1.05), (0.55, 1.60), (0.95, 1.85), (1.25, 2.50)]
    for i, (acc, close) in enumerate(lags):
        y = 150 + i * 30
        f.circle(px(acc), y, 4.2, fill=BLUE)
        colour = GREEN if 1.0 <= close < 2.0 else "var(--dim)"
        f.arrow(px(acc) + 5, y, px(close), y, colour=colour, width=1.5)
        f.text(px(close) + 6, y + 4, "✕", cls="sm", fill=colour, anchor="start")
    f.text(BCX, 112, "Close year 2024", cls="sm bold", fill=AMBER)
    f.text(BCX, 336, "the settled cost is a fact, not an estimate —", cls="sm dim")
    f.text(BCX, 354, "but the cohort is biased toward fast claims", cls="sm dim")
    return f


@figure("In-Force", "A vertical cut through the book at one date, counting the "
        "policies then providing coverage", width=WID)
def in_force() -> Fig:
    f = vcard()

    px = _calendar_axis(f, 306, ["2023", "2024", "2025"], y_top=124)
    spans = [(0.15, 1.15), (0.60, 1.60), (1.05, 2.05), (1.40, 2.40),
             (1.75, 2.75)]
    _, ys = _policy_bars(f, 146, spans, x0=48, x1=318, t0=0.0, t1=3.0, gap=30)
    t = 1.50
    f.line(px(t), 122, px(t), 306, cls="thin dash", stroke=ROSE, stroke_width="1.6")
    f.text(px(t), 114, "valuation date", cls="sm bold", fill=ROSE)
    for i, (a, b) in enumerate(spans):
        if a <= t < b:
            f.circle(px(t), ys[i], 4.4, fill=ROSE)
    f.text(BCX, 344, "3 of the 5 policies are in force —", cls="sm dim")
    f.text(BCX, 362, "written and earned both count different things", cls="sm dim")
    return f


@figure("Net of Reinsurance", "Gross losses split into the reinsurer's share and "
        "the retained net", width=WID)
def net_of_reinsurance() -> Fig:
    f = vcard()

    f.text(BCX, 118, "AY 2024 ultimate losses ($000)", cls="sm dim")
    f.text(46, 152, "Gross", cls="sm bold", anchor="start")
    f.rect(46, 162, 268, 30, rx=4, fill=VIOLET, fill_opacity="0.28",
           stroke=VIOLET, stroke_width="1.2")
    f.text(180, 182, "2,850", cls="sm")

    f.text(46, 228, "Ceded", cls="sm bold", anchor="start")
    f.rect(46, 238, 268 * 0.28, 30, rx=4, fill=AMBER, fill_opacity="0.34",
           stroke=AMBER, stroke_width="1.2")
    f.text(46 + 268 * 0.14, 258, "800", cls="sm")

    f.text(46, 304, "Net", cls="sm bold", anchor="start")
    f.rect(46, 314, 268 * 0.72, 30, rx=4, fill=BLUE, fill_opacity="0.34",
           stroke=BLUE, stroke_width="1.2")
    f.text(46 + 268 * 0.36, 334, "2,050", cls="sm")
    f.text(BCX, 372, "reserve gross first, then cede — never the reverse",
           cls="sm dim")
    return f


@figure("Written Premium", "A full-term premium booked at inception against the "
        "premium earned month by month", width=WID)
def written_premium() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 12, 0, 1.15, left=48, right=20, top=32, bottom=66)
    ax.frame(xticks=[0, 3, 6, 9, 12], yticks=[0, 0.5, 1.0],
             yfmt=lambda t: f"{t:.0%}", grid=True)
    ax.polyline([(0, 0), (0, 1.0), (12, 1.0)], colour=AMBER, width=2.4)
    ax.polyline([(0, 0), (12, 1.0)], colour=BLUE, width=2.4)
    ax.label(6.2, 1.03, "written", cls="sm bold", fill=AMBER, dy=-6)
    ax.label(8.6, 0.62, "earned", cls="sm bold", fill=BLUE, dy=8)
    f.text(BCX, ax.y1 + 32, "months since inception", cls="sm dim")
    f.text(BCX, BY1 - 18, "a $600 annual policy written 12/1 is $600", cls="sm dim")
    f.text(BCX, BY1 - 2, "of CY written premium and $50 of CY earned", cls="sm dim")
    return f


@figure("Earned Premium", "Premium earned pro rata across the policy term",
        width=WID)
def earned_premium() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 12, 0, 1.1, left=48, right=20, top=32, bottom=66)
    ax.area(lambda t: t / 12, 0, 8, colour=BLUE, opacity="0.20")
    ax.frame(xticks=[0, 4, 8, 12], yticks=[0, 0.5, 1.0],
             yfmt=lambda t: f"{t:.0%}", grid=True)
    ax.polyline([(0, 0), (12, 1.0)], colour=BLUE, width=2.4)
    ax.vline(8, colour=ROSE, y_top=8 / 12)
    ax.point(8, 8 / 12, colour=ROSE)
    ax.label(8, 8 / 12, "$400 earned", cls="sm bold", fill=ROSE, anchor="end",
             dx=-8, dy=-6)
    ax.label(10.2, 0.28, "$200 still", cls="sm dim")
    ax.label(10.2, 0.28, "unearned", cls="sm dim", dy=13)
    f.text(BCX, ax.y1 + 32, "months into a $600 annual policy", cls="sm dim")
    f.text(BCX, BY1 - 2, "earned premium is the ratemaking denominator",
           cls="sm dim")
    return f


@figure("Unearned Premium", "The unearned portion of a policy shrinking to zero "
        "over its term", width=WID)
def unearned_premium() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 12, 0, 1.1, left=48, right=20, top=32, bottom=66)
    ax.area(lambda t: 1 - t / 12, 0, 12, colour=AMBER, opacity="0.20")
    ax.frame(xticks=[0, 4, 8, 12], yticks=[0, 0.5, 1.0],
             yfmt=lambda t: f"{t:.0%}", grid=True)
    ax.polyline([(0, 1.0), (12, 0)], colour=AMBER, width=2.4)
    ax.point(8, 1 / 3, colour=ROSE)
    ax.label(8, 1 / 3, "$200 unearned", cls="sm bold", fill=ROSE, anchor="start",
             dx=8, dy=-6)
    f.text(BCX, ax.y1 + 32, "months into a $600 annual policy", cls="sm dim")
    f.text(BCX, BY1 - 18, "cancel today and $200 goes back —", cls="sm dim")
    f.text(BCX, BY1 - 2, "the reserve is an obligation, not income", cls="sm dim")
    return f


@figure("Earned Exposure", "Written exposure earning out over the policy term in "
        "car-years", width=WID)
def earned_exposure() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 12, 0, 1.1, left=52, right=20, top=32, bottom=66)
    ax.frame(xticks=[0, 4, 8, 12], yticks=[0, 0.5, 1.0],
             yfmt=lambda t: f"{t:.2f}", grid=True)
    ax.polyline([(0, 0), (12, 1.0)], colour=GREEN, width=2.4)
    for m, lab in ((6, "0.50"), (12, "1.00")):
        ax.point(m, m / 12, colour=GREEN)
        ax.label(m, m / 12, lab, cls="sm bold", fill=GREEN, anchor="end",
                 dx=-7, dy=-5)
    f.text(BCX, ax.y1 + 32, "months of a one-car annual policy", cls="sm dim")
    f.text(BCX, BY1 - 18, "a six-month policy is 0.5 car-years,", cls="sm dim")
    f.text(BCX, BY1 - 2, "not one — exposure is counted, not policies",
           cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# A. Ratemaking — grouping the data
# ═══════════════════════════════════════════════════════════════════════════

@figure("Homogeneity", "A homogeneous group's tight loss-cost distribution beside a "
        "heterogeneous group's two humps", width=WID)
def homogeneity() -> Fig:
    f = vcard()

    def bump(x, mu, sd):
        return math.exp(-((x - mu) ** 2) / (2 * sd * sd))

    for k, (title, fn, colour) in enumerate((
            ("homogeneous", lambda x: bump(x, 360, 55), GREEN),
            ("heterogeneous",
             lambda x: 0.85 * bump(x, 230, 45) + bump(x, 520, 55), ROSE))):
        y0 = 112 + k * 132
        ax = Axes(f, 56, y0, 316, y0 + 88, 120, 640, 0, 1.15)
        ax.area(fn, 120, 640, colour=colour, opacity="0.18")
        ax.curve(fn, colour=colour, width=2.2)
        f.line(ax.x0, ax.y1, ax.x1, ax.y1, cls="axis")
        ax.vline(360, colour="var(--dim)", dash=True)
        f.text(56, y0 - 8, title, cls="sm bold", fill=colour, anchor="start")
        f.text(ax.px(360), ax.y1 + 15, "one rate of 360", cls="sm dim")
    f.text(BCX, BY1 - 4, "split further and each group gets thinner — that is "
           "the trade", cls="sm dim")
    return f


@figure("Credibility", "A territory indication blended with the statewide "
        "indication by a credibility weight", width=WID)
def credibility() -> Fig:
    f = vcard()

    f.text(BCX, 106, "Territory 07: +18% indicated on 430 claims", cls="sm dim")
    x0, x1, z = 44, 316, 0.40
    w = x1 - x0
    f.rect(x0, 134, w * (1 - z), 30, rx=4, fill=AMBER, fill_opacity="0.28",
           stroke=AMBER, stroke_width="1.2")
    f.rect(x0 + w * (1 - z), 134, w * z, 30, rx=4, fill=BLUE, fill_opacity="0.34",
           stroke=BLUE, stroke_width="1.2")
    f.text(x0 + w * (1 - z) / 2, 154, "statewide +7.3%", cls="sm")
    f.text(x0 + w * (1 - z) + w * z / 2, 154, "own +18%", cls="sm")
    f.text(x0 + w * (1 - z) / 2, 126, "1 − Z = 0.60", cls="sm dim")
    f.text(x0 + w * (1 - z) + w * z / 2, 126, "Z = 0.40", cls="sm dim")

    sy = 250
    f.line(x0, sy, x1, sy, cls="axis")
    for v, lab, colour in ((0.0, "+7.3%", AMBER), (1.0, "+18%", BLUE)):
        x = x0 + w * v
        f.line(x, sy - 5, x, sy + 5, cls="tick")
        f.text(x, sy + 19, lab, cls="sm", fill=colour)
    xe = x0 + w * z
    f.arrow(xe, sy - 36, xe, sy - 7, colour=GREEN, width=1.8)
    f.text(xe, sy - 43, "+11.6%", cls="bold", fill=GREEN)
    f.text(BCX, 310, "Z rises with volume, never above 1 —", cls="sm dim")
    f.text(BCX, 328, "and the complement carries the rest", cls="sm dim")
    return f


@figure("Loss and Loss Adjustment Expense", "The claim dollar split into indemnity, "
        "ALAE and ULAE", width=WID)
def loss_and_lae() -> Fig:
    f = vcard()

    f.text(BCX, 106, "the $360 pure premium, by component", cls="sm dim")
    x, w, y = 60, 78, 128
    rows = [(300, "Indemnity  $300", "paid to the claimant", BLUE),
            (36, "ALAE  $36", "traceable to one claim", TEAL),
            (24, "ULAE  $24", "claims-department overhead", AMBER)]
    label_y = 0.0
    for amount, name, note, colour in rows:
        h = amount / 360 * 210
        f.rect(x, y, w, h, rx=4, fill=colour, fill_opacity="0.32", stroke=colour,
               stroke_width="1.2")
        # a 24-dollar slice is 14px tall, so labels are spaced, not centred
        label_y = max(y + h / 2, label_y + 42)
        f.line(x + w + 4, y + h / 2, x + w + 10, label_y - 4, cls="thin",
               stroke=colour, stroke_width="1")
        f.text(x + w + 14, label_y, name, cls="sm bold", anchor="start")
        f.text(x + w + 14, label_y + 15, note, cls="sm dim", anchor="start")
        y += h
    f.text(BCX, BY1 - 2, "ALAE follows the claim, ULAE the department",
           cls="sm dim")
    return f


@figure("Pure Premium", "Frequency times severity giving the loss cost per exposure",
        width=WID)
def pure_premium() -> Fig:
    f = vcard()

    y = 170
    f.chip(88, y, "0.060", colour=BLUE, w=104, h=44, cls="ttl")
    f.text(88, y - 34, "frequency", cls="sm dim")
    f.text(88, y + 40, "claims per", cls="sm dim")
    f.text(88, y + 54, "car-year", cls="sm dim")
    f.text(BCX, y + 6, "×", cls="ttl")
    f.chip(272, y, "6,000", colour=AMBER, w=104, h=44, cls="ttl")
    f.text(272, y - 34, "severity", cls="sm dim")
    f.text(272, y + 40, "cost per", cls="sm dim")
    f.text(272, y + 54, "claim", cls="sm dim")

    f.arrow(BCX, y + 66, BCX, 288, colour="var(--dim)", width=1.4)
    f.chip(BCX, 314, "$360 per car-year", colour=GREEN, w=190, h=44, cls="ttl")
    f.text(BCX, BY1 - 2, "the part of the rate that pays claims", cls="sm dim")
    return f


@figure("Loss Ratio", "The projected loss and LAE ratio measured against the "
        "permissible loss ratio", width=WID)
def loss_ratio() -> Fig:
    f = vcard()

    x0, x1, y = 46, 314, 150
    f.rect(x0, y, x1 - x0, 40, rx=5, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    w = (x1 - x0) * 0.692
    f.rect(x0, y, w, 40, rx=5, fill=BLUE, fill_opacity="0.34", stroke=BLUE,
           stroke_width="1.2")
    f.text(x0 + w / 2, y + 25, "69.2% losses", cls="sm")
    f.text(x0 + w + (x1 - x0 - w) / 2, y + 25, "30.8%", cls="sm dim")
    f.text(BCX, y - 14, "$520 of earned premium", cls="sm dim")
    f.text(x0 + w + (x1 - x0 - w) / 2, y + 58, "expenses", cls="sm dim")
    f.text(x0 + w + (x1 - x0 - w) / 2, y + 73, "+ profit", cls="sm dim")

    xp = x0 + (x1 - x0) * PLR
    f.line(xp, y - 24, xp, y + 44, cls="thin dash", stroke=ROSE, stroke_width="1.6")
    f.text(xp, y - 32, "PLR 69.0%", cls="sm bold", fill=ROSE)
    f.text(BCX, 274, "360 / 520 = 69.2%, against 69.0% available", cls="sm dim")
    f.text(BCX, 312, "above the PLR ⇒ the rate is inadequate", cls="sm")
    f.text(BCX, 340, "below it ⇒ there is room to give back", cls="sm dim")
    return f


@figure("Loss Development", "An immature accident year grown to ultimate by its "
        "cumulative development factor", width=WID)
def loss_development() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 84, 0, 3200, left=52, right=22, top=32, bottom=62)
    ax.frame(xticks=[12, 24, 36, 48, 60, 72, 84], yticks=[0, 1500, 3000],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    pattern = [(12, 1500), (24, 2250), (36, 2610), (48, 2767), (60, 2822),
               (72, 2845), (84, 2850)]
    ax.polyline(pattern, colour=BLUE, width=2.4)
    for x, y in pattern:
        ax.point(x, y, colour=BLUE, r=3)
    ax.hline(2850, colour=GREEN, x_to=84)
    ax.label(46, 2850, "ultimate 2,850", cls="sm bold", fill=GREEN, dy=-8)
    ax.point(12, 1500, colour=ROSE, r=4.4)
    ax.label(12, 1500, "1,500 reported", cls="sm bold", fill=ROSE, anchor="start",
             dx=8, dy=14)
    f.arrow(ax.px(12), ax.py(1560), ax.px(12), ax.py(2790), colour=AMBER, width=1.8)
    f.text(ax.px(12) - 6, ax.py(2200), "× 1.900", cls="sm bold", fill=AMBER,
           anchor="end")
    f.text(BCX, ax.y1 + 32, "age in months", cls="sm dim")
    f.text(BCX, BY1 - 2, "AY 2024 is 52.6% reported at 12 months", cls="sm dim")
    return f


@figure("Loss Trend", "Historical losses trended from the experience period's "
        "midpoint to the future policy period's", width=WID)
def loss_trend() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 4.0, 300, 460, left=52, right=20, top=36, bottom=70)
    ax.frame(xticks=[0, 1, 2, 3, 4], yticks=[300, 380, 460],
             xfmt=lambda t: "", yfmt=lambda t: f"{t:,.0f}", grid=True)
    ax.curve(lambda x: 360 * 1.05 ** x, colour=BLUE, width=2.4)
    ax.point(0.0, 360, colour=AMBER, r=4.2)
    ax.label(0.0, 360, "360", cls="sm bold", fill=AMBER, anchor="start", dx=6,
             dy=16)
    ax.point(2.75, 360 * 1.05 ** 2.75, colour=GREEN, r=4.2)
    ax.label(2.75, 360 * 1.05 ** 2.75, "411", cls="sm bold", fill=GREEN,
             anchor="end", dx=-6, dy=-8)
    ax.vline(0.0, colour=AMBER, y_top=360)
    ax.vline(2.75, colour=GREEN, y_top=360 * 1.05 ** 2.75)
    brace(f, ax.px(0), ax.px(2.75), ax.y1 + 18, depth=7, label="2.75 years")
    f.text(ax.px(0), ax.y1 + 54, "experience", cls="sm dim")
    f.text(ax.px(2.75), ax.y1 + 54, "new rates", cls="sm dim")
    f.text(BCX, BY1 - 2, "the length of the bridge is the calculation",
           cls="sm dim")
    return f


def _trigger_plane(f: Fig, y0=126, size=176, x0=92):
    """The accident-date × report-date plane both coverage triggers live on."""
    f.rect(x0, y0, size, size, rx=6, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    # below the diagonal a claim would be reported before it happened
    f.polygon([(x0, y0 + size), (x0 + size, y0), (x0 + size, y0 + size)],
              fill="var(--edge)", fill_opacity="0.5")
    f.line(x0, y0 + size, x0 + size, y0, cls="thin dash", stroke="var(--axis)",
           stroke_width="1.1")
    f.text(x0 + size * 0.74, y0 + size * 0.88, "impossible", cls="sm dim")
    f.text(x0 + size / 2, y0 + size + 44, "accident date →", cls="sm dim")
    f.text(x0 - 8, y0 + size / 2, "report", cls="sm dim", anchor="end")
    f.text(x0 - 8, y0 + size / 2 + 14, "date ↑", cls="sm dim", anchor="end")
    return lambda a: x0 + size * a, lambda r: y0 + size * (1 - r), size


@figure("Occurrence Coverage", "The occurrence trigger drawn on the accident-date "
        "by report-date plane", width=WID)
def occurrence_coverage() -> Fig:
    f = vcard()

    px, py, size = _trigger_plane(f)
    f.polygon([(px(0.34), py(0.34)), (px(0.66), py(0.66)), (px(0.66), py(1.0)),
               (px(0.34), py(1.0))], fill=BLUE, fill_opacity="0.24", stroke=BLUE,
              stroke_width="1.4")
    f.text((px(0.34) + px(0.66)) / 2, py(0.86), "covered", cls="sm bold",
           fill=BLUE)
    brace(f, px(0.34), px(0.66), py(0.0) + 6, depth=7, label="policy period")
    f.text(BCX, BY1 - 18, "any report date, however late —", cls="sm dim")
    f.text(BCX, BY1 - 2, "so the insurer carries a long IBNR tail", cls="sm dim")
    return f


@figure("Claims Made Coverage", "The claims-made trigger drawn on the accident-date "
        "by report-date plane, with the retroactive date", width=WID)
def claims_made_coverage() -> Fig:
    f = vcard()

    px, py, size = _trigger_plane(f)
    f.polygon([(px(0.18), py(0.42)), (px(0.42), py(0.42)), (px(0.68), py(0.68)),
               (px(0.18), py(0.68))],
              fill=AMBER, fill_opacity="0.26", stroke=AMBER, stroke_width="1.4")
    f.line(px(0.18), py(0.0), px(0.18), py(1.0), cls="thin dash", stroke=ROSE,
           stroke_width="1.4")
    f.text(px(0.18), py(1.0) - 8, "retro date", cls="sm bold", fill=ROSE)
    f.text(px(0.32), py(0.55) + 4, "covered", cls="sm bold", fill=AMBER)
    f.text(px(0.74), py(0.55) + 4, "report", cls="sm dim", anchor="start")
    f.text(px(0.74), py(0.55) + 18, "year", cls="sm dim", anchor="start")
    f.text(BCX, BY1 - 18, "no pure IBNR — but the retro date has to be",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "bought back, and a tail policy ends the cover",
           cls="sm dim")
    return f


@figure("On Level Premium", "Historical earned premium restated at the rate level "
        "now in force", width=WID)
def on_level_premium() -> Fig:
    f = vcard()

    rows = [("2023", 3800, 1.1034), ("2024", 3900, 1.0136), ("2025", 4000, 1.000)]
    x0, scale = 88, 0.042
    for i, (year, ep, olf) in enumerate(rows):
        y = 132 + i * 66
        f.text(84, y + 14, year, cls="sm dim", anchor="end")
        f.rect(x0, y, ep * scale, 24, rx=3, fill=BLUE, fill_opacity="0.30",
               stroke=BLUE, stroke_width="1.1")
        extra = ep * (olf - 1) * scale
        if extra > 1:
            f.rect(x0 + ep * scale, y, extra, 24, rx=3, fill=GREEN,
                   fill_opacity="0.55")
        f.text(x0 + 8, y + 17, f"{ep:,}", cls="sm", anchor="start")
        f.text(x0 + (ep * olf) * scale + 10, y + 17, f"× {olf:.4f}", cls="sm dim",
               anchor="start")
    f.text(BCX, 116, "earned premium ($000) and its on-level factor", cls="sm dim")
    f.text(BCX, 334, "a 12% increase on 7/1/2023 takes two full", cls="sm dim")
    f.text(BCX, 352, "years to work through earned premium", cls="sm dim")
    return f


@figure("On-Leveling", "The parallelogram method: a mid-year rate change earning "
        "over the unit square", width=WID)
def on_leveling() -> Fig:
    f = vcard()

    x0, y0, s = 96, 122, 168
    f.rect(x0, y0, s, s, rx=4, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    f.polygon([(x0 + s * 0.5, y0 + s), (x0 + s, y0 + s), (x0 + s, y0 + s * 0.5)],
              fill=GREEN, fill_opacity="0.30", stroke=GREEN, stroke_width="1.3")
    f.text(x0 + s * 0.84, y0 + s * 0.86, "0.125", cls="sm bold", fill=GREEN)
    f.text(x0 + s * 0.34, y0 + s * 0.42, "0.875", cls="sm bold", fill=BLUE)
    f.text(x0 + s * 0.34, y0 + s * 0.56, "old rates", cls="sm dim")
    f.text(x0 + s * 0.84, y0 + s * 0.70, "new", cls="sm dim", fill=GREEN)
    f.line(x0 + s * 0.5, y0 + s, x0 + s * 0.5, y0 + s + 8, cls="tick")
    f.text(x0 + s * 0.5, y0 + s + 22, "7/1", cls="sm dim")
    f.text(x0 + s / 2, y0 + s + 42, "calendar year 2023 →", cls="sm dim")
    f.text(x0 - 8, y0 + s / 2, "fraction of", cls="sm dim", anchor="end")
    f.text(x0 - 8, y0 + s / 2 + 14, "term elapsed", cls="sm dim", anchor="end")
    f.text(BCX, BY1 - 20, "uniform writing, one policy term — where those",
           cls="sm dim")
    f.text(BCX, BY1 - 4, "fail, extend exposures instead", cls="sm dim")
    return f


@figure("Premium Audit", "A deposit premium corrected to the audited exposure after "
        "the policy expires", width=WID)
def premium_audit() -> Fig:
    f = vcard()

    f.text(BCX, 112, "workers compensation, payroll per $100", cls="sm dim")
    x0, scale = 96, 0.0135
    rows = [("estimated", 9_000, BLUE), ("actual", 12_400, GREEN)]
    for i, (name, payroll, colour) in enumerate(rows):
        y = 146 + i * 62
        f.text(88, y + 15, name, cls="sm dim", anchor="end")
        f.rect(x0, y, payroll * scale, 26, rx=3, fill=colour, fill_opacity="0.34",
               stroke=colour, stroke_width="1.2")
        f.text(x0 + payroll * scale / 2, y + 18, f"${payroll:,}", cls="sm")
    f.rect(x0 + 9_000 * scale, 208, 3_400 * scale, 26, rx=3, fill=AMBER,
           fill_opacity="0.55")
    f.arrow(x0 + 9_000 * scale, 264, x0 + 12_400 * scale, 264, colour=AMBER,
            width=1.6)
    f.text(x0 + 10_700 * scale, 284, "+$3,400 billed at audit", cls="sm bold",
           fill=AMBER)
    f.text(BCX, 326, "audits also correct classification and", cls="sm dim")
    f.text(BCX, 344, "must be booked before the data is used", cls="sm dim")
    return f


@figure("Exposure Trend", "An inflation-sensitive exposure base trending alongside "
        "losses, leaving only the net trend", width=WID)
def exposure_trend() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 4, 0.95, 1.30, left=48, right=44, top=34, bottom=64)
    ax.frame(xticks=[0, 1, 2, 3, 4], yticks=[1.0, 1.1, 1.2, 1.3],
             yfmt=lambda t: f"{t:.2f}", grid=True)
    for rate, colour, name in ((0.06, ROSE, "losses  6%"),
                               (0.035, BLUE, "payroll  3.5%"),
                               (0.024, GREEN, "net  2.4%")):
        ax.curve(lambda x, r=rate: (1 + r) ** x, colour=colour, width=2.2)
        ax.label(4, (1 + rate) ** 4, name, cls="sm bold", fill=colour,
                 anchor="end", dx=-4, dy=-7)
    f.text(BCX, ax.y1 + 32, "years", cls="sm dim")
    f.text(BCX, BY1 - 18, "1.060 / 1.035 = 1.024 — trend the pure", cls="sm dim")
    f.text(BCX, BY1 - 2, "premium at the net rate, not the gross", cls="sm dim")
    return f


@figure("Premium Trend", "Average premium at current rate level drifting upward "
        "between the experience and forecast periods", width=WID)
def premium_trend() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 4.0, 480, 580, left=54, right=20, top=34, bottom=70)
    ax.frame(xticks=[0, 1, 2, 3, 4], xfmt=lambda t: "",
             yticks=[480, 530, 580], yfmt=lambda t: f"{t:,.0f}", grid=True)
    pts = [(0, 496), (1, 505), (2, 512), (3, 520)]
    ax.polyline(pts, colour=BLUE, width=2.2)
    for x, y in pts:
        ax.point(x, y, colour=BLUE, r=3.2)
    ax.polyline([(3, 520), (4, 529)], colour=GREEN, width=2.2, dash=True)
    ax.point(4.0, 529, colour=GREEN, r=4.2)
    ax.label(4.0, 529, "forecast", cls="sm bold", fill=GREEN, anchor="end",
             dx=-6, dy=-9)
    f.text(BCX, ax.y1 + 30, "average written premium at current rate level",
           cls="sm dim")
    f.text(BCX, BY1 - 18, "limits, deductibles and mix move it —",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "rate changes do not; on-levelling handles those",
           cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# A. Ratemaking — expenses, profit and the overall indication
# ═══════════════════════════════════════════════════════════════════════════

@figure("Expense Provisions", "The rate built up from pure premium and fixed "
        "expense, then grossed up for variable expense and profit", width=WID)
def expense_provisions() -> Fig:
    f = vcard()

    f.rect(72, 122, 216, 62, rx=6, fill=BLUE, fill_opacity="0.16", stroke=BLUE,
           stroke_width="1.2")
    f.text(BCX, 146, "360  pure premium", cls="sm")
    f.text(BCX, 166, "+ 25  fixed expense F", cls="sm")
    f.line(72, 196, 288, 196, cls="rule")
    f.text(BCX, 216, "385", cls="ttl")

    f.arrow(BCX, 228, BCX, 258, colour="var(--dim)", width=1.4)
    f.text(BCX + 10, 248, "÷ 0.69", cls="sm bold", fill=AMBER, anchor="start")
    f.rect(72, 262, 216, 60, rx=6, fill=AMBER, fill_opacity="0.16", stroke=AMBER,
           stroke_width="1.2")
    f.text(BCX, 284, "1 − V(0.26) − Q(0.05)", cls="sm")
    f.text(BCX, 308, "= 0.69 permissible", cls="sm dim")
    f.chip(BCX, 356, "indicated rate  $557.97", colour=GREEN, w=228, h=32)
    return f


@figure("Fixed Expenses", "A flat per-exposure expense weighing far more heavily on "
        "a small policy than a large one", width=WID)
def fixed_expenses() -> Fig:
    f = vcard()

    f.text(BCX, 112, "$25 of fixed expense, as a share of premium", cls="sm dim")
    x0, x1 = 46, 314
    for i, (prem, colour) in enumerate(((200, ROSE), (2000, BLUE))):
        y = 152 + i * 96
        f.text(x0, y - 12, f"a ${prem:,} policy", cls="sm bold", anchor="start")
        f.rect(x0, y, x1 - x0, 34, rx=4, fill="var(--soft)", stroke="var(--edge)",
               stroke_width="1.2")
        share = 25 / prem
        f.rect(x0, y, (x1 - x0) * share, 34, rx=4, fill=colour,
               fill_opacity="0.75")
        f.text(x1 - 10, y + 23, f"F = {share:.2%}", cls="sm", anchor="end")
    f.text(BCX, BY1 - 34, "the same $25 is a tenth of one premium", cls="sm dim")
    f.text(BCX, BY1 - 16, "and a rounding error in the other — so it is",
           cls="sm dim")
    f.text(BCX, BY1 + 2, "charged per exposure, never as a percentage",
           cls="sm dim")
    return f


@figure("Variable Expenses", "Commission and taxes rising in proportion to premium",
        width=WID)
def variable_expenses() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 2200, 0, 620, left=54, right=22, top=34, bottom=64)
    ax.frame(xticks=[0, 1000, 2000], yticks=[0, 300, 600],
             xfmt=lambda t: f"{t:,.0f}", yfmt=lambda t: f"{t:,.0f}", grid=True)
    ax.curve(lambda p: 0.26 * p, colour=AMBER, width=2.4)
    ax.hline(25, colour=BLUE, x_to=2200, dash=False)
    ax.label(1500, 60, "fixed F = 25", cls="sm bold", fill=BLUE)
    ax.point(2000, 520, colour=AMBER, r=4)
    ax.label(2000, 520, "520", cls="sm bold", fill=AMBER, anchor="end", dx=-8,
             dy=2)
    ax.point(200, 52, colour=AMBER, r=3.4)
    f.text(BCX, ax.y1 + 32, "policy premium", cls="sm dim")
    f.text(BCX, BY1 - 2, "so it belongs in the denominator, not the numerator",
           cls="sm dim")
    return f


@figure("Expense Ratio", "The underwriting expense ratio broken into its four "
        "components", width=WID)
def expense_ratio() -> Fig:
    f = vcard()

    rows = [("Commission & brokerage", 20.0, True, BLUE),
            ("Taxes, licences, fees", 3.0, True, TEAL),
            ("Other acquisition", 3.0, True, VIOLET),
            ("General expenses", 4.8, False, AMBER)]
    x0, scale = 178, 6.6
    for i, (name, pct, variable, colour) in enumerate(rows):
        y = 128 + i * 48
        f.text(170, y + 4, name, cls="sm", anchor="end")
        f.rect(x0, y - 9, pct * scale, 20, rx=3, fill=colour, fill_opacity="0.70")
        f.text(x0 + pct * scale + 7, y + 4, f"{pct:.1f}", cls="sm", anchor="start")
        f.text(170, y + 19, "variable" if variable else "fixed", cls="sm dim",
               anchor="end")
    f.line(x0, 112, x0, 328, cls="rule")
    f.text(BCX, 356, "which column an expense sits in decides", cls="sm dim")
    f.text(BCX, 374, "whether it is divided or added", cls="sm dim")
    return f


@figure("Profit and Contingency Provision", "The profit provision as the last slice "
        "of the premium dollar and the combined ratio it targets", width=WID)
def profit_and_contingency() -> Fig:
    f = vcard()

    f.text(BCX, 112, "the $520 premium dollar", cls="sm dim")
    _hbar(f, 152, [(0.692, "losses & LAE 69.2%", BLUE),
                   (0.258, "expense", AMBER), (0.05, "Q", GREEN)],
          x0=40, x1=320, height=34)
    f.line(40 + 280 * 0.95, 126, 40 + 280 * 0.95, 186, cls="thin dash",
           stroke=ROSE, stroke_width="1.5")
    f.text(40 + 280 * 0.95, 202, "combined ratio 95%", cls="sm bold", fill=ROSE,
           anchor="end")
    f.text(BCX, 262, "Q_T pays for the capital held behind the book;", cls="sm dim")
    f.text(BCX, 282, "the contingency half covers a rate built on", cls="sm dim")
    f.text(BCX, 302, "expected values being exceeded", cls="sm dim")
    f.text(BCX, 352, "investment income may reduce it, never remove it",
           cls="sm dim")
    return f


@figure("Underwriting Profit", "Earned premium less losses, LAE and expenses "
        "leaving the underwriting margin", width=WID)
def underwriting_profit() -> Fig:
    f = vcard()

    x0, x1 = 46, 314
    f.text(BCX, 116, "per $520 of earned premium", cls="sm dim")
    f.rect(x0, 136, x1 - x0, 30, rx=4, fill=VIOLET, fill_opacity="0.24",
           stroke=VIOLET, stroke_width="1.2")
    f.text(BCX, 156, "earned premium  520", cls="sm")

    steps = [("− losses", 300, BLUE), ("− LAE", 60, TEAL),
             ("− expenses", 134, AMBER), ("= profit", 26, GREEN)]
    for i, (name, amt, colour) in enumerate(steps):
        y = 190 + i * 44
        w = (x1 - x0) * amt / 520
        f.rect(x0, y, max(w, 3), 26, rx=3, fill=colour, fill_opacity="0.6")
        f.text(x0 + max(w, 3) + 10, y + 18, f"{name} {amt}",
               cls="sm bold" if i == 3 else "sm", anchor="start")
    f.text(BCX, 380, "26 / 520 = 5.0% — a 95% combined ratio", cls="sm dim")
    return f


@figure("Overall Rate Level Indication", "The indicated average rate against the "
        "current one", width=WID)
def overall_rate_level_indication() -> Fig:
    f = vcard()

    x0, scale = 62, 0.40
    for i, (name, rate, colour) in enumerate((("current", CUR_RATE, BLUE),
                                              ("indicated", IND_RATE, GREEN))):
        y = 148 + i * 74
        f.text(BCX, y - 14, name, cls="sm dim")
        f.rect(x0, y, rate * scale, 34, rx=4, fill=colour, fill_opacity="0.34",
               stroke=colour, stroke_width="1.2")
        f.text(x0 + rate * scale / 2, y + 23, f"${rate:,.2f}", cls="sm")
    f.rect(x0 + CUR_RATE * scale, 222, (IND_RATE - CUR_RATE) * scale, 34, rx=4,
           fill=GREEN, fill_opacity="0.75")
    f.arrow(x0 + IND_RATE * scale + 46, 268, x0 + IND_RATE * scale - 4, 250,
            colour=GREEN, width=1.5)
    f.text(x0 + IND_RATE * scale + 50, 278, "+$37.97 = +7.3%", cls="sm bold",
           fill=GREEN, anchor="end")
    f.text(BCX, 330, "the aggregate answer — classification work", cls="sm dim")
    f.text(BCX, 348, "distributes it but must not change it", cls="sm dim")
    return f


@figure("Pure Premium Method", "The pure premium method building the indicated rate "
        "from loss cost per exposure", width=WID)
def pure_premium_method() -> Fig:
    f = vcard()

    _flow(f, 136, ["losses", "÷ exposures", "PP 360"],
          colours=[BLUE, BLUE, BLUE], x0=32, x1=328)
    f.arrow(BCX, 156, BCX, 186, colour="var(--dim)", width=1.3)
    _flow(f, 206, ["+ F 25", "= 385", "÷ 0.69"],
          colours=[AMBER, AMBER, AMBER], x0=32, x1=328)
    f.arrow(BCX, 226, BCX, 256, colour="var(--dim)", width=1.3)
    f.chip(BCX, 278, "indicated rate  $557.97", colour=GREEN, w=228, h=34)
    f.text(BCX, 328, "no on-levelling needed — premium never", cls="sm dim")
    f.text(BCX, 346, "enters. It needs a reliable exposure count,", cls="sm dim")
    f.text(BCX, 364, "which new or changed classes may not have", cls="sm dim")
    return f


@figure("Loss Ratio Method", "The loss ratio method comparing the projected ratio "
        "with the permissible loss ratio", width=WID)
def loss_ratio_method() -> Fig:
    f = vcard()

    x0, x1 = 46, 314
    f.text(BCX, 116, "projected loss & LAE ratio plus fixed expense", cls="sm dim")
    f.rect(x0, 140, (x1 - x0) * 0.692 / 0.80, 34, rx=4, fill=BLUE,
           fill_opacity="0.34", stroke=BLUE, stroke_width="1.2")
    f.rect(x0 + (x1 - x0) * 0.692 / 0.80, 140, (x1 - x0) * 0.048 / 0.80, 34, rx=4,
           fill=TEAL, fill_opacity="0.55")
    f.text(x0 + (x1 - x0) * 0.346 / 0.80, 163, "69.2%", cls="sm")
    f.text(x0 + (x1 - x0) * 0.716 / 0.80, 190, "+4.8%", cls="sm dim")

    f.rect(x0, 232, (x1 - x0) * 0.69 / 0.80, 34, rx=4, fill=AMBER,
           fill_opacity="0.30", stroke=AMBER, stroke_width="1.2")
    f.text(x0 + (x1 - x0) * 0.345 / 0.80, 255, "PLR 69.0%", cls="sm")
    f.text(BCX, 218, "against what the premium makes available", cls="sm dim")
    f.text(BCX, 300, "74.0 / 69.0 = 1.073 ⇒ +7.3%", cls="bold", fill=GREEN)
    f.text(BCX, 344, "works without exposure counts, but the", cls="sm dim")
    f.text(BCX, 362, "premium must be brought on level first", cls="sm dim")
    return f


@figure("Permissible Loss Ratio", "The share of the premium dollar left for losses "
        "once expenses and profit are provided for", width=WID)
def permissible_loss_ratio() -> Fig:
    f = vcard()

    f.text(BCX, 122, "the premium dollar, from the top down", cls="sm dim")
    x, w, y = 88, 96, 148
    for share, name, colour in ((0.26, "V  26%", AMBER), (0.05, "Q  5%", GREEN),
                                (0.69, "PLR  69%", BLUE)):
        h = share * 190
        f.rect(x, y, w, h, rx=4, fill=colour, fill_opacity="0.32", stroke=colour,
               stroke_width="1.2")
        f.text(x + w + 14, y + h / 2 + 4, name, cls="sm bold", anchor="start")
        y += h
    f.text(BCX, BY1 - 18, "raise V or Q and the PLR falls, so the same",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "loss ratio becomes an inadequate one", cls="sm dim")
    return f


@figure("Rate Change", "The indicated change, the selected change, and the gap "
        "between them", width=WID)
def rate_change() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.5, 4.5, 0, 16, left=48, right=20, top=40, bottom=78)
    ax.frame(xticks=[0, 1, 2, 3, 4], xfmt=lambda t: f"{2021 + int(t)}",
             yticks=[0, 5, 10, 15], yfmt=lambda t: f"{t:.0f}%", grid=True)
    ind = [11.4, 9.8, 13.2, 8.6, 7.3]
    sel = [7.0, 7.0, 9.0, 7.0, 5.0]
    bw = (ax.px(1) - ax.px(0)) * 0.34
    for k, (a, b) in enumerate(zip(ind, sel)):
        x = ax.px(k)
        f.rect(x - bw - 1, ax.py(a), bw, ax.y1 - ax.py(a), rx=2, fill=BLUE,
               fill_opacity="0.7")
        f.rect(x + 1, ax.py(b), bw, ax.y1 - ax.py(b), rx=2, fill=AMBER,
               fill_opacity="0.7")
    f.legend_row(96, 96, [(BLUE, "indicated"), (AMBER, "selected")], gap=104)
    f.text(BCX, BY1 - 34, "taking less than the indication is allowed;",
           cls="sm dim")
    f.text(BCX, BY1 - 16, "taking it every year without closing the gap",
           cls="sm dim")
    f.text(BCX, BY1 + 2, "is how a book becomes permanently inadequate",
           cls="sm dim")
    return f


@figure("Ratemaking Constraints", "The band of filed changes the regulatory, "
        "competitive and operational limits leave open", width=WID)
def ratemaking_constraints() -> Fig:
    f = vcard()

    x0, x1, y = 52, 312, 168
    f.line(x0, y, x1, y, cls="axis")
    for v, lab in ((0.0, "0%"), (0.5, "+5%"), (1.0, "+10%")):
        x = x0 + (x1 - x0) * v
        f.line(x, y - 5, x, y + 5, cls="tick")
        f.text(x, y + 20, lab, cls="sm dim")
    f.rect(x0 + (x1 - x0) * 0.30, y - 34, (x1 - x0) * 0.35, 24, rx=4, fill=GREEN,
           fill_opacity="0.24", stroke=GREEN, stroke_width="1.2")
    f.text(x0 + (x1 - x0) * 0.475, y - 17, "filable band", cls="sm", fill=GREEN)
    f.arrow(x0 + (x1 - x0) * 0.73, y - 58, x0 + (x1 - x0) * 0.73, y - 8,
            colour=BLUE, width=1.8)
    f.text(x0 + (x1 - x0) * 0.73, y - 66, "indicated +7.3%", cls="sm bold",
           fill=BLUE)
    rows = [("Regulatory", "prior approval, capping rules", ROSE),
            ("Competitive", "what the market will bear", AMBER),
            ("Operational", "systems, filing lead times", VIOLET)]
    for i, (name, note, colour) in enumerate(rows):
        yy = 246 + i * 42
        f.rect(52, yy - 9, 11, 11, rx=2, fill=colour, fill_opacity="0.8")
        f.text(70, yy + 1, name, cls="sm bold", anchor="start")
        f.text(70, yy + 17, note, cls="sm dim", anchor="start")
    f.text(BCX, BY1 - 2, "compute it properly, then say why you departed",
           cls="sm dim")
    return f


@figure("Considerations for Implementing Rates", "An off-balance correction keeping "
        "a relativity change revenue-neutral", width=WID)
def considerations_for_implementing_rates() -> Fig:
    f = vcard()

    _flow(f, 132, ["overall +7.3%", "relativities"], colours=[BLUE, AMBER],
          x0=44, x1=316, h=30)
    f.text(BCX, 176, "new relativities alone would raise revenue 3.0%",
           cls="sm dim")
    f.text(BCX, 200, "even before any base-rate change", cls="sm dim")
    f.arrow(BCX, 214, BCX, 244, colour="var(--dim)", width=1.4)
    f.chip(BCX, 266, "base rate +4.2%", colour=GREEN, w=196, h=34)
    f.text(BCX, 308, "so the book gets +7.3% overall", cls="sm dim")
    f.text(BCX, 344, "dislocation, capping and the effective date", cls="sm dim")
    f.text(BCX, 362, "are decided here, not in the indication", cls="sm dim")
    return f


@figure("Minimum Premium", "A premium floor holding the smallest risks above the "
        "cost of writing them", width=WID)
def minimum_premium() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 1.0, 0, 620, left=54, right=20, top=36, bottom=66)
    ax.frame(xticks=[0, 0.25, 0.5, 0.75, 1.0], yticks=[0, 200, 400, 600],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    ax.curve(lambda e: 558 * e, colour="var(--dim)", width=1.6, dash=True)
    ax.curve(lambda e: max(558 * e, 150), colour=BLUE, width=2.6)
    ax.vline(150 / 558, colour=ROSE, y_top=150)
    ax.label(150 / 558, 0, "0.27 exposures", cls="sm", fill=ROSE, anchor="start",
             dx=8, dy=-10)
    ax.hline(150, colour=ROSE, x_to=150 / 558)
    ax.label(0, 150, "minimum $150", cls="sm bold", fill=ROSE, anchor="start",
             dx=6, dy=-8)
    f.text(BCX, ax.y1 + 32, "earned exposures", cls="sm dim")
    f.text(BCX, BY1 - 2, "issuing and servicing cost the same either way",
           cls="sm dim")
    return f


@figure("Rating Algorithm", "The ordered steps that turn a base rate into a quoted "
        "premium", width=WID)
def rating_algorithm() -> Fig:
    f = vcard()

    steps = [("base rate", "558", BLUE), ("× class 1.25", "698", BLUE),
             ("× territory 0.90", "628", BLUE), ("+ endorsements", "668", TEAL),
             ("− discounts 5%", "634", AMBER), ("+ policy fee", "$636", GREEN)]
    for i, (name, value, colour) in enumerate(steps):
        y = 118 + i * 42
        f.rect(46, y, 190, 30, rx=5, fill=colour, fill_opacity="0.16",
               stroke=colour, stroke_width="1.1")
        f.text(56, y + 20, name, cls="sm", anchor="start")
        f.text(300, y + 20, value, cls="sm bold", anchor="end")
        if i:
            f.line(66, y - 12, 66, y, cls="thin", stroke="var(--dim)",
                   stroke_width="1")
    f.text(BCX, BY1 - 2, "multiply before adding — a reordered algorithm "
           "is a different rate", cls="sm dim")
    return f


@figure("Principles of Ratemaking", "The four CAS ratemaking principles", width=WID)
def principles_of_ratemaking() -> Fig:
    f = vcard()

    items = [("1", "A rate is an estimate of the expected value",
              "of future costs", BLUE),
             ("2", "A rate provides for all costs associated",
              "with the transfer of risk", TEAL),
             ("3", "A rate provides for the costs associated",
              "with an individual risk transfer", VIOLET),
             ("4", "A rate is reasonable and not excessive,",
              "inadequate or unfairly discriminatory", GREEN)]
    for i, (n, line1, line2, colour) in enumerate(items):
        y = 118 + i * 66
        f.circle(46, y + 14, 13, fill=colour, fill_opacity="0.22", stroke=colour,
                 stroke_width="1.2")
        f.text(46, y + 18, n, cls="sm bold", fill=colour)
        f.text(66, y + 10, line1, cls="sm", anchor="start")
        f.text(66, y + 26, line2, cls="sm", anchor="start")
    f.text(BCX, BY1 - 2, "only the fourth is a judgment; the first three are "
           "definitions", cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# A. Ratemaking — extraordinary losses
# ═══════════════════════════════════════════════════════════════════════════

@figure("Large Loss", "A claim-size distribution capped at a threshold, with the "
        "excess reloaded across the class", width=WID)
def large_loss() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 12, 0, 1.05, left=44, right=20, top=34, bottom=76)
    cap = 5.0

    def pdf(x):
        return math.exp(-x / 2.4) if x > 0 else 0.0

    ax.area(pdf, 0, cap, colour=BLUE, opacity="0.20")
    ax.area(pdf, cap, 12, colour=ROSE, opacity="0.28")
    ax.curve(pdf, colour=BLUE, width=2.2)
    ax.frame(xticks=[0, 5, 10], xfmt=lambda t: f"{t * 50:,.0f}k", yticks=[])
    ax.vline(cap, colour=ROSE, y_top=pdf(cap) + 0.35)
    ax.label(cap, pdf(cap) + 0.35, "cap M = 250k", cls="sm bold", fill=ROSE,
             anchor="start", dx=6, dy=-4)
    ax.label(8.2, 0.14, "excess", cls="sm bold", fill=ROSE)
    f.text(BCX, ax.y1 + 30, "claim size", cls="sm dim")
    f.text(BCX, ax.y1 + 56, "price the capped losses on the class's own", cls="sm dim")
    f.text(BCX, ax.y1 + 74, "data, then add a wider-based excess load", cls="sm dim")
    return f


@figure("Catastrophe Loss", "Twenty years of catastrophe ratios against the "
        "long-term load they average to", width=WID)
def catastrophe_loss() -> Fig:
    f = vcard()

    ax = vaxes(f, 0.4, 20.6, 0, 68, left=48, right=18, top=34, bottom=66)
    ax.frame(xticks=[1, 5, 10, 15, 20], yticks=[0, 25, 50],
             yfmt=lambda t: f"{t:.0f}%", grid=True)
    ratios = [2, 1, 4, 0, 58, 3, 1, 0, 6, 2, 1, 41, 2, 0, 3, 1, 9, 0, 2, 4]
    ax.bars([(k + 1, v) for k, v in enumerate(ratios)], colour=ROSE, opacity="0.7")
    ax.hline(7.0, colour=GREEN, dash=False)
    ax.label(20.4, 7.0, "load 7%", cls="sm bold", fill=GREEN, anchor="end",
             dy=-7)
    f.text(BCX, ax.y1 + 32, "cat losses as a % of premium, by year", cls="sm dim")
    f.text(BCX, BY1 - 18, "a five-year experience period would price", cls="sm dim")
    f.text(BCX, BY1 - 2, "this book at 0% or at 12% — never at 7%", cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# A. Ratemaking — classification and individual risk rating
# ═══════════════════════════════════════════════════════════════════════════

@figure("Classification Ratemaking", "Class relativities measured against the base "
        "class's pure premium", width=WID)
def classification_ratemaking() -> Fig:
    f = vcard()

    classes = [("Youthful", 612, 1.70), ("Adult single", 396, 1.10),
               ("Adult married", 360, 1.00), ("Mature", 288, 0.80),
               ("Senior", 234, 0.65)]
    x0, scale = 172, 0.196
    for i, (name, pp, rel) in enumerate(classes):
        y = 124 + i * 44
        base = rel == 1.00
        f.text(164, y + 4, name, cls="sm bold" if base else "sm", anchor="end")
        f.rect(x0, y - 10, pp * scale, 22, rx=3, fill=BLUE if base else AMBER,
               fill_opacity="0.7" if base else "0.55")
        f.text(x0 + pp * scale + 7, y + 4, f"{rel:.2f}", cls="sm", anchor="start")
    f.line(x0 + 360 * scale, 108, x0 + 360 * scale, 336, cls="thin dash",
           stroke=BLUE, stroke_width="1.3")
    f.text(BCX, 356, "the base class is a choice of denominator —",
           cls="sm dim")
    f.text(BCX, 374, "it changes the factors, not anyone's premium",
           cls="sm dim")
    return f


@figure("Territory Ratemaking", "A grid of territories carrying spatially "
        "correlated relativities", width=WID)
def territory_ratemaking() -> Fig:
    f = vcard()

    grid = [[0.72, 0.78, 0.88, 0.95],
            [0.80, 0.95, 1.15, 1.10],
            [0.90, 1.20, 1.45, 1.22],
            [0.85, 1.05, 1.18, 1.00]]
    x0, y0, c = 108, 122, 42
    for i, row in enumerate(grid):
        for j, rel in enumerate(row):
            opacity = max(0.06, min(0.62, (rel - 0.65) * 0.72))
            f.rect(x0 + j * c, y0 + i * c, c - 2, c - 2, rx=3, fill=ROSE,
                   fill_opacity=f"{opacity:.2f}", stroke="var(--edge)",
                   stroke_width="0.8")
            f.text(x0 + j * c + (c - 2) / 2, y0 + i * c + (c - 2) / 2 + 4,
                   f"{rel:.2f}", cls="sm")
    f.text(BCX, y0 + 4 * c + 26, "the city centre and its ring, not a list",
           cls="sm dim")
    f.text(BCX, y0 + 4 * c + 44, "of independent cells", cls="sm dim")
    f.text(BCX, BY1 - 18, "neighbouring territories inform one another —",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "and the boundaries are themselves a decision",
           cls="sm dim")
    return f


@figure("Loss Elimination Ratio", "The share of ground-up losses a deductible "
        "removes, as the deductible rises", width=WID)
def loss_elimination_ratio() -> Fig:
    f = vcard()

    mean = 2.4

    def ler(d):
        return (mean * (1 - math.exp(-d / mean))) / mean

    ax = vaxes(f, 0, 6, 0, 1.05, left=48, right=20, top=32, bottom=66)
    ax.frame(xticks=[0, 1, 2, 3, 4, 5, 6], xfmt=lambda t: f"{t * 500:,.0f}",
             yticks=[0, 0.5, 1.0], yfmt=lambda t: f"{t:.0%}", grid=True)
    ax.curve(ler, colour=BLUE, width=2.4)
    ax.point(1.0, ler(1.0), colour=ROSE, r=4)
    ax.label(1.0, ler(1.0), "d = 500 ⇒ 34%", cls="sm bold", fill=ROSE,
             anchor="start", dx=8, dy=-6)
    ax.point(2.0, ler(2.0), colour=AMBER, r=4)
    ax.label(2.0, ler(2.0), "1,000 ⇒ 57%", cls="sm bold", fill=AMBER,
             anchor="start", dx=8, dy=-6)
    f.text(BCX, ax.y1 + 32, "deductible", cls="sm dim")
    f.text(BCX, BY1 - 18, "doubling the deductible does not double the",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "credit — small claims are eliminated first",
           cls="sm dim")
    return f


@figure("Deductible Rating", "A ground-up loss distribution split at the deductible "
        "into the insured's retention and the insurer's share", width=WID)
def deductible_rating() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 12, 0, 1.05, left=44, right=20, top=34, bottom=82)

    def pdf(x):
        return math.exp(-x / 3.0) if x > 0 else 0.0

    ax.area(pdf, 0, 2.0, colour=AMBER, opacity="0.30")
    ax.area(pdf, 2.0, 12, colour=BLUE, opacity="0.20")
    ax.curve(pdf, colour=BLUE, width=2.2)
    ax.frame(xticks=[0, 2, 4, 8, 12], xfmt=lambda t: f"{t * 250:,.0f}",
             yticks=[])
    ax.vline(2.0, colour=ROSE, y_top=1.0)
    ax.label(2.0, 1.0, "d = 500", cls="sm bold", fill=ROSE, anchor="start", dx=6,
             dy=-2)
    ax.label(0.95, 0.30, "kept", cls="sm bold", fill=AMBER)
    ax.label(5.6, 0.20, "insured", cls="sm bold", fill=BLUE)
    f.text(BCX, ax.y1 + 30, "loss size", cls="sm dim")
    f.text(BCX, ax.y1 + 58, "the credit must be less than the loss share",
           cls="sm dim")
    f.text(BCX, ax.y1 + 76, "removed — fixed expenses do not go away",
           cls="sm dim")
    return f


@figure("Increased Limits", "Increased limits factors rising with the policy limit, "
        "and the cost of a layer between two of them", width=WID)
def increased_limits() -> Fig:
    f = vcard()

    pts = [(100, 1.00), (250, 1.32), (500, 1.55), (1000, 1.73), (2000, 1.86),
           (5000, 1.97)]
    ax = vaxes(f, 0, 5200, 0.9, 2.1, left=48, right=20, top=34, bottom=70)
    ax.frame(xticks=[100, 1000, 2000, 5000], xfmt=lambda t: f"{t / 1000:.0f}M"
             if t >= 1000 else "100k", yticks=[1.0, 1.5, 2.0],
             yfmt=lambda t: f"{t:.1f}", grid=True)
    ax.polyline(pts, colour=BLUE, width=2.4)
    for x, y in pts:
        ax.point(x, y, colour=BLUE, r=3.2)
    ax.vline(500, colour=AMBER, y_top=1.55, dash=True)
    ax.vline(1000, colour=AMBER, y_top=1.73, dash=True)
    f.line(ax.px(500), ax.py(1.55), ax.px(1000), ax.py(1.55), cls="thin",
           stroke=AMBER, stroke_width="1.4")
    f.line(ax.px(1000), ax.py(1.55), ax.px(1000), ax.py(1.73), cls="thin",
           stroke=AMBER, stroke_width="1.4")
    ax.label(1050, 1.64, "0.18", cls="sm bold", fill=AMBER, anchor="start", dx=4)
    f.text(BCX, ax.y1 + 32, "policy limit", cls="sm dim")
    f.text(BCX, BY1 - 18, "the curve must be concave — a layer higher",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "up cannot cost more than the one below it",
           cls="sm dim")
    return f


@figure("Coinsurance Rating", "The coinsurance penalty applied when the insurance "
        "carried falls below the required percentage of value", width=WID)
def coinsurance_rating() -> Fig:
    f = vcard()

    ax = vaxes(f, 0.4, 1.02, 0, 1.1, left=52, right=20, top=34, bottom=70)
    ax.frame(xticks=[0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
             xfmt=lambda t: f"{t:.0%}" if abs(t * 10 % 2) < 0.01 else "",
             yticks=[0, 0.5, 1.0], yfmt=lambda t: f"{t:.0%}", grid=True)
    ax.curve(lambda c: min(c / 0.80, 1.0), colour=BLUE, width=2.6)
    ax.vline(0.80, colour=GREEN, y_top=1.0)
    ax.label(0.80, 1.0, "80% required", cls="sm bold", fill=GREEN, anchor="end",
             dx=-6, dy=-6)
    ax.point(0.60, 0.75, colour=ROSE, r=4.2)
    ax.label(0.60, 0.75, "carried 60%", cls="sm bold", fill=ROSE, anchor="start",
             dx=10, dy=16)
    ax.label(0.60, 0.75, "⇒ 75% paid", cls="sm", fill=ROSE, anchor="start",
             dx=10, dy=31)
    f.text(BCX, ax.y1 + 32, "insurance carried, as a % of value", cls="sm dim")
    f.text(BCX, BY1 - 18, "the penalty applies to every loss, including",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "the partial ones the insured expected to collect",
           cls="sm dim")
    return f


@figure("Commercial Lines Rating", "The chain of adjustments from a manual premium "
        "to a commercial risk's final price", width=WID)
def commercial_lines_rating() -> Fig:
    f = vcard()

    steps = [("Manual premium", "100,000", "class rate × exposure", VIOLET),
             ("× Experience mod", "0.88", "the risk's own losses", BLUE),
             ("× Schedule mod", "0.95", "underwriter judgment", TEAL),
             ("Standard premium", "83,600", "before any retro", GREEN)]
    for i, (name, value, note, colour) in enumerate(steps):
        y = 120 + i * 62
        f.rect(44, y, 272, 46, rx=6, fill=colour, fill_opacity="0.14",
               stroke=colour, stroke_width="1.2")
        f.text(56, y + 20, name, cls="sm bold", anchor="start")
        f.text(56, y + 36, note, cls="sm dim", anchor="start")
        f.text(304, y + 28, value, cls="sm bold", anchor="end")
        if i:
            f.arrow(BCX, y - 15, BCX, y - 2, colour="var(--dim)", width=1.2)
    f.text(BCX, BY1 - 2, "and a retro plan can still move it afterwards",
           cls="sm dim")
    return f


@figure("Experience Rating", "The experience modification as a credibility blend "
        "between a risk's own loss ratio and the class average", width=WID)
def experience_rating() -> Fig:
    f = vcard()

    x0, x1, y = 52, 312, 196
    f.text(BCX, 112, "actual losses 70% of expected, Z = 0.40", cls="sm dim")
    f.line(x0, y, x1, y, cls="axis")
    for v, lab in ((0.0, "0.60"), (0.5, "1.00"), (1.0, "1.40")):
        x = x0 + (x1 - x0) * v
        f.line(x, y - 5, x, y + 5, cls="tick")
        f.text(x, y + 20, lab, cls="sm dim")
    f.text(BCX, y + 42, "experience modification", cls="sm dim")
    for v, lab, colour, dy in ((0.5, "no mod 1.00", "var(--dim)", 66),
                               (0.35, "M = 0.88", GREEN, 40)):
        x = x0 + (x1 - x0) * v
        f.arrow(x, y - dy, x, y - 8, colour=colour, width=1.7)
        f.text(x, y - dy - 8, lab, cls="sm bold", fill=colour)
    f.text(BCX, 284, "a credit of 12% on the manual premium", cls="sm")
    f.text(BCX, 322, "Z rises with the risk's own volume — a small",
           cls="sm dim")
    f.text(BCX, 340, "insured's good year barely moves the mod,",
           cls="sm dim")
    f.text(BCX, 358, "and its bad year barely hurts", cls="sm dim")
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

@figure("Development Triangle", "The running reported-loss triangle, accident years "
        "down and ages across, with the latest diagonal shaded", width=WID)
def development_triangle() -> Fig:
    f = vcard()

    at = _triangle(f, TRI, x0=26, y0=128, cw=54, ch=44,
                   shade=lambda i, j: i + j == 4, shade_colour=ROSE)
    f.text(66 + 54 * 2.5, 98, "age in months", cls="sm dim")
    cx, cy = at[(4, 0)]
    f.text(cx + 34, cy + 4, "latest diagonal", cls="sm bold", anchor="start")
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


@figure("Claim Count Triangle", "The running claim-count triangle, with AY 2024's 700 "
        "claims developed to 1,000 ultimate claims", width=WID)
def claim_count_triangle() -> Fig:
    f = vcard()

    at = _triangle(f, CNT, x0=16, y0=128, cw=46, ch=44)
    f.text(56 + 46 * 2.5, 98, "age in months", cls="sm dim")
    cx, cy = 56 + 46 * 5.5, 128 + 44 * 4.5
    f.text(cx, 120, "ult", cls="sm dim")
    f.rect(cx - 21.5, cy - 20.5, 43, 41, rx=3, fill=GREEN, fill_opacity="0.18",
           stroke=GREEN, stroke_width="1.4")
    f.text(cx, cy + 4, "1,000", cls="sm bold")
    x_start = at[(4, 0)][0] + 18
    f.arrow(x_start, cy, cx - 25, cy, colour=GREEN, width=1.6, dash=True)
    f.text((x_start + cx - 25) / 2, cy - 8, "× 1.429", cls="sm bold")
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

    for cx, colour, name in ((100, BLUE, "coverage A"), (260, AMBER, "coverage B")):
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


@figure("Underwriting Changes", "Three segments at fixed loss ratios on a beam, their "
        "weights shifting from the 2022 mix to the 2024 mix, which moves the balance "
        "point, the aggregate loss ratio, from 65.2% to 73.4%", width=WID)
def underwriting_changes() -> Fig:
    f = vcard()

    segs = [0.55, 0.70, 0.88]
    old_w = [0.50, 0.35, 0.15]
    new_w = [0.25, 0.35, 0.40]
    colours = [GREEN, BLUE, ROSE]
    beam, w = 300, 40

    def px(lr):
        return 40 + (lr - 0.45) * 560

    for lr, wo, wn, colour in zip(segs, old_w, new_w, colours):
        x = px(lr)
        f.rect(x - w / 2, beam - wn * 360, w, wn * 360, rx=3, fill=colour,
               fill_opacity="0.45", stroke=colour, stroke_width="1.2")
        f.rect(x - w / 2, beam - wo * 360, w, wo * 360, rx=3, fill="none",
               stroke="var(--dim)", stroke_width="1.3", stroke_dasharray="4 3")
        f.text(x, beam - max(wo, wn) * 360 - 8, f"{lr:.0%}", cls="sm bold")
    f.line(34, beam, 326, beam, cls="", stroke="var(--ink)", stroke_width="2.4",
           stroke_linecap="round")
    for ws, solid in ((old_w, False), (new_w, True)):
        x = px(sum(wt * lr for wt, lr in zip(ws, segs)))
        f.polygon([(x, beam + 2), (x - 10, beam + 20), (x + 10, beam + 20)],
                  fill=ROSE if solid else "none", fill_opacity="0.5",
                  stroke=ROSE if solid else "var(--dim)", stroke_width="1.4",
                  stroke_dasharray=None if solid else "3 2")
        f.text(x, beam + 36, f"{sum(wt * lr for wt, lr in zip(ws, segs)):.1%}",
               cls="sm bold" if solid else "sm dim")
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


@figure("Settlement Rate", "A shifting disposal rate distorting paid development",
        width=WID)
def settlement_rate() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.4, 4.4, 0, 0.72, left=54, right=22, top=42, bottom=76)
    ax.frame(xticks=[0, 1, 2, 3, 4], xfmt=lambda t: AYS[int(t)],
             yticks=[0, 0.3, 0.6], yfmt=lambda t: f"{t:.0%}", grid=True)
    rates = [0.34, 0.35, 0.36, 0.47, 0.52]
    ax.bars([(k, v) for k, v in enumerate(rates)], colour=TEAL, opacity="0.72")
    ax.hline(0.35, colour="var(--dim)", x_to=4.4)
    ax.label(4.3, 0.35, "old level", cls="sm dim", anchor="end", dy=-7)
    f.text(BCX, ax.y1 + 30, "claims closed at 12 months, by accident year",
           cls="sm dim")
    f.text(BCX, BY1 - 16, "paid factors then fall for reasons that have",
           cls="sm dim")
    f.text(BCX, BY1 + 2, "nothing to do with what the claims will cost",
           cls="sm dim")
    return f


@figure("Mix of Business", "A weighted average moving because the weights moved",
        width=WID)
def mix_of_business() -> Fig:
    f = vcard()

    segs = [("Territory 1", 0.58, GREEN), ("Territory 2", 0.72, BLUE),
            ("Territory 3", 0.91, ROSE)]
    old_w = [0.45, 0.35, 0.20]
    new_w = [0.25, 0.35, 0.40]
    ax = vaxes(f, -0.5, 2.5, 0, 0.55, left=56, right=22, top=48, bottom=88)
    ax.frame(xticks=[0, 1, 2], xfmt=lambda t: f"Terr {int(t) + 1}",
             yticks=[0, 0.25, 0.5], yfmt=lambda t: f"{t:.0%}", grid=True)
    bw = (ax.px(1) - ax.px(0)) * 0.32
    for k in range(3):
        x = ax.px(k)
        f.rect(x - bw - 1, ax.py(old_w[k]), bw, ax.y1 - ax.py(old_w[k]), rx=2,
               fill="var(--dim)", fill_opacity="0.45")
        f.rect(x + 1, ax.py(new_w[k]), bw, ax.y1 - ax.py(new_w[k]), rx=2,
               fill=BLUE, fill_opacity="0.72")
    f.legend_row(66, 108, [("var(--dim)", "2022 mix"), (BLUE, "2024 mix")],
                 gap=112)
    lr_old = sum(w * s[1] for w, s in zip(old_w, segs))
    lr_new = sum(w * s[1] for w, s in zip(new_w, segs))
    f.text(BCX, ax.y1 + 30, "share of the book, by territory", cls="sm dim")
    f.text(BCX, ax.y1 + 54, f"aggregate loss ratio {lr_old:.1%} → {lr_new:.1%}",
           cls="sm bold")
    f.text(BCX, ax.y1 + 76, "with every territory's own ratio unchanged",
           cls="sm dim")
    return f


@figure("Rate Level Change", "The cumulative rate index that makes premium from "
        "different years comparable", width=WID)
def rate_level_change() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.3, 4.6, 0.95, 1.35, left=54, right=24, top=36, bottom=70)
    ax.frame(xticks=[0, 1, 2, 3, 4], xfmt=lambda t: AYS[int(t)],
             yticks=[1.0, 1.1, 1.2, 1.3], yfmt=lambda t: f"{t:.2f}", grid=True)
    steps = [(0, 1.000), (1, 1.000), (1, 1.060), (2, 1.060), (2, 1.156),
             (3, 1.156), (3, 1.214), (4, 1.214), (4, 1.278), (4.5, 1.278)]
    ax.polyline(steps, colour=BLUE, width=2.4)
    for k, v in ((1, 1.060), (2, 1.156), (3, 1.214), (4, 1.278)):
        ax.point(k, v, colour=BLUE, r=3.2)
    ax.label(4.4, 1.278, "current", cls="sm bold", fill=BLUE, anchor="end",
             dy=-8)
    f.text(BCX, ax.y1 + 30, "cumulative rate level index", cls="sm dim")
    f.text(BCX, BY1 - 16, "a loss ratio on 2020 premium runs 28% high",
           cls="sm dim")
    f.text(BCX, BY1 + 2, "until it is on level — and so does any ELR from it",
           cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Estimating claim liabilities — recoveries and reinsurance
# ═══════════════════════════════════════════════════════════════════════════

@figure("Deductible Recovery", "Claims paid in full by the insurer and billed back "
        "within the insured's large deductible", width=WID)
def deductible_recovery() -> Fig:
    f = vcard()

    _flow(f, 142, ["claim occurs", "insurer pays", "insured repays"],
          colours=[BLUE, BLUE, GREEN], x0=32, x1=328, h=30)
    f.text(BCX, 190, "a $700k claim under a $250k deductible", cls="sm dim")
    x0, x1 = 46, 314
    f.rect(x0, 216, x1 - x0, 34, rx=4, fill=BLUE, fill_opacity="0.32",
           stroke=BLUE, stroke_width="1.2")
    f.text(BCX, 238, "insurer pays 700", cls="sm")
    f.rect(x0, 272, (x1 - x0) * 250 / 700, 34, rx=4, fill=GREEN,
           fill_opacity="0.6")
    f.text(x0 + (x1 - x0) * 125 / 700, 294, "billed back 250", cls="sm")
    f.text(BCX, 336, "the credit risk stays with the insurer —", cls="sm dim")
    f.text(BCX, 354, "reserve gross and hold the recovery as an asset",
           cls="sm dim")
    return f


@figure("Salvage and Subrogation", "Gross ultimate reduced by salvage and "
        "subrogation recoveries", width=WID)
def salvage_and_subrogation() -> Fig:
    f = vcard()

    x0, x1 = 46, 314
    f.text(BCX, 120, "AY 2024 ultimate ($000)", cls="sm dim")
    f.rect(x0, 144, x1 - x0, 34, rx=4, fill=VIOLET, fill_opacity="0.28",
           stroke=VIOLET, stroke_width="1.2")
    f.text(BCX, 166, "gross 2,850", cls="sm")
    for i, (name, amt, colour) in enumerate((("salvage", 90, TEAL),
                                             ("subrogation", 160, ROSE))):
        y = 200 + i * 44
        f.rect(x0, y, (x1 - x0) * amt / 2850, 30, rx=3, fill=colour,
               fill_opacity="0.7")
        f.text(x0 + (x1 - x0) * amt / 2850 + 10, y + 21, f"{name} {amt}",
               cls="sm", anchor="start")
    f.rect(x0, 292, (x1 - x0) * 2600 / 2850, 34, rx=4, fill=BLUE,
           fill_opacity="0.34", stroke=BLUE, stroke_width="1.2")
    f.text(x0 + (x1 - x0) * 1300 / 2850, 314, "net 2,600", cls="sm")
    f.text(BCX, 358, "S&S has its own long development pattern —",
           cls="sm dim")
    f.text(BCX, 376, "estimate it, do not net it out of the triangle",
           cls="sm dim")
    return f


@figure("Reinsurance Recovery", "Gross unpaid claims split into the ceded "
        "recoverable and the insurer's net liability", width=WID)
def reinsurance_recovery() -> Fig:
    f = vcard()

    x0, x1 = 46, 314
    f.text(BCX, 120, "AY 2024 unpaid claims ($000)", cls="sm dim")
    f.rect(x0, 148, x1 - x0, 38, rx=4, fill=VIOLET, fill_opacity="0.26",
           stroke=VIOLET, stroke_width="1.2")
    f.text(BCX, 172, "gross unpaid 2,250", cls="sm")
    f.rect(x0, 210, (x1 - x0) * 640 / 2250, 34, rx=4, fill=AMBER,
           fill_opacity="0.6")
    f.text(x0 + (x1 - x0) * 320 / 2250, 232, "ceded 640", cls="sm")
    f.rect(x0, 268, (x1 - x0) * 1610 / 2250, 34, rx=4, fill=BLUE,
           fill_opacity="0.4", stroke=BLUE, stroke_width="1.2")
    f.text(x0 + (x1 - x0) * 805 / 2250, 290, "net 1,610", cls="sm")
    f.text(BCX, 330, "the balance sheet carries the gross liability", cls="sm dim")
    f.text(BCX, 348, "and the recoverable separately, because the", cls="sm dim")
    f.text(BCX, 366, "cedant owes its policyholders either way", cls="sm dim")
    return f


@figure("Gross Losses", "Gross losses as the base from which net and ceded figures "
        "are derived", width=WID)
def gross_losses() -> Fig:
    f = vcard()

    f.text(BCX, 118, "AY 2024 ultimate ($000)", cls="sm dim")
    x, w, y = 100, 82, 146
    for amount, name, colour in ((1610, "net 1,610", BLUE),
                                 (640, "ceded 640", AMBER),
                                 (250, "S&S 250", GREEN),
                                 (350, "deductible 350", ROSE)):
        h = amount / 2850 * 196
        f.rect(x, y, w, h, rx=4, fill=colour, fill_opacity="0.36", stroke=colour,
               stroke_width="1.2")
        f.text(x + w + 14, y + h / 2 + 4, name, cls="sm", anchor="start")
        y += h
    f.text(x - 14, 244, "gross", cls="sm bold", anchor="end")
    f.text(x - 14, 260, "2,850", cls="sm bold", anchor="end")
    f.line(x - 6, 146, x - 6, 342, cls="thin", stroke="var(--dim)",
           stroke_width="1.4")
    f.text(BCX, BY1 - 2, "reserve here first — every other view is a subtraction",
           cls="sm dim")
    return f


@figure("Ceded Losses", "The reinsurer's share of each claim under a quota share "
        "and an excess treaty", width=WID)
def ceded_losses() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 2600, 0, 1400, left=56, right=22, top=40, bottom=76)
    ax.frame(xticks=[0, 1000, 2000], xfmt=lambda t: f"{t:,.0f}",
             yticks=[0, 700, 1400], yfmt=lambda t: f"{t:,.0f}", grid=True)
    ax.curve(lambda x: 0.30 * x, colour=TEAL, width=2.2)
    ax.curve(lambda x: min(max(x - 500, 0), 1500), colour=AMBER, width=2.6)
    ax.label(1500, 450, "quota share 30%", cls="sm bold", fill=TEAL,
             anchor="start", dy=18)
    ax.label(1350, 850, "1,500 xs 500", cls="sm bold", fill=AMBER, anchor="end",
             dy=-10)
    f.text(BCX, ax.y1 + 30, "gross claim size ($000)", cls="sm dim")
    f.text(BCX, BY1 - 16, "a ceded triangle develops on its own pattern —",
           cls="sm dim")
    f.text(BCX, BY1 + 2, "excess cessions emerge later than the gross",
           cls="sm dim")
    return f


@figure("Net Losses", "Gross losses reduced step by step to what the insurer "
        "finally bears", width=WID)
def net_losses() -> Fig:
    f = vcard()

    x0, x1 = 46, 314
    steps = [("gross", 2850, VIOLET), ("− ceded 640", 2210, AMBER),
             ("− S&S 250", 1960, GREEN), ("− deductible 350", 1610, ROSE),
             ("net", 1610, BLUE)]
    for i, (name, value, colour) in enumerate(steps):
        y = 132 + i * 44
        f.rect(x0, y, (x1 - x0) * value / 2850, 30, rx=4, fill=colour,
               fill_opacity="0.45" if i < 4 else "0.7")
        f.text(x0 + 8, y + 21, name, cls="sm", anchor="start")
        f.text(x1, y + 21, f"{value:,}", cls="sm bold" if i == 4 else "sm",
               anchor="end")
    f.text(BCX, 372, "net is a derived figure — the estimate is made gross",
           cls="sm dim")
    return f


@figure("Unallocated Loss Adjustment Expenses ULAE", "The classical ULAE reserve, "
        "charging half the ratio to case reserves and all of it to IBNR",
        width=WID)
def ulae() -> Fig:
    f = vcard()

    f.text(BCX, 112, "R = 96 / 1,600 = 6.0%", cls="sm dim")
    rows = [("Case reserves", 900, 0.5, AMBER), ("IBNR", 1350, 1.0, VIOLET)]
    x0, scale = 60, 0.10
    for i, (name, amount, weight, colour) in enumerate(rows):
        y = 152 + i * 74
        f.text(x0, y - 12, name, cls="sm bold", anchor="start")
        f.rect(x0, y, amount * scale, 28, rx=3, fill=colour, fill_opacity="0.30",
               stroke=colour, stroke_width="1.1")
        f.rect(x0, y, amount * weight * scale, 28, rx=3, fill=colour,
               fill_opacity="0.72")
        f.text(x0 + amount * scale + 10, y + 20,
               f"× {weight:.1f} × 6.0% = {amount * weight * 0.06:,.0f}",
               cls="sm", anchor="start")
    f.text(BCX, 306, "ULAE reserve = 27 + 81 = $108k", cls="bold", fill=GREEN)
    f.text(BCX, 344, "half, because the claims behind the case", cls="sm dim")
    f.text(BCX, 362, "reserves are already half handled — a", cls="sm dim")
    f.text(BCX, 380, "convention, not a measurement", cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Estimating claim liabilities — monitoring and communication
# ═══════════════════════════════════════════════════════════════════════════

@figure("Reserve Adequacy", "The carried reserve compared with the indicated "
        "estimate and the range around it", width=WID)
def reserve_adequacy() -> Fig:
    f = vcard()

    x0, x1, y = 52, 312, 186
    f.rect(x0 + (x1 - x0) * 0.18, y - 30, (x1 - x0) * 0.62, 48, rx=6,
           fill=BLUE, fill_opacity="0.14", stroke=BLUE, stroke_width="1.2")
    f.text(x0 + (x1 - x0) * 0.32, y - 4, "reasonable", cls="sm", fill=BLUE)
    f.text(x0 + (x1 - x0) * 0.32, y + 10, "range", cls="sm", fill=BLUE)
    f.line(x0, y + 40, x1, y + 40, cls="axis")
    for v, lab in ((0.10, "2,000"), (0.50, "2,250"), (0.90, "2,500")):
        x = x0 + (x1 - x0) * v
        f.line(x, y + 36, x, y + 44, cls="tick")
        f.text(x, y + 58, lab, cls="sm dim")
    f.line(x0 + (x1 - x0) * 0.50, y - 34, x0 + (x1 - x0) * 0.50, y + 40,
           cls="thin dash", stroke=GREEN, stroke_width="1.6")
    f.text(x0 + (x1 - x0) * 0.50, y - 44, "indicated 2,250", cls="sm bold",
           fill=GREEN)
    f.arrow(x0 + (x1 - x0) * 0.39, y + 96, x0 + (x1 - x0) * 0.39, y + 46,
            colour=ROSE, width=1.8)
    f.text(x0 + (x1 - x0) * 0.39, y + 112, "carried 2,180", cls="sm bold",
           fill=ROSE)
    f.text(BCX, 322, "inside the range, but below the point estimate",
           cls="sm dim")
    f.text(BCX, 340, "— a deficiency to disclose, not necessarily", cls="sm dim")
    f.text(BCX, 358, "an unreasonable one", cls="sm dim")
    return f


@figure("Pure Premium Analysis", "Pure premium by accident year decomposed into "
        "frequency and severity", width=WID)
def pure_premium_analysis() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.3, 4.3, 0.92, 1.20, left=54, right=26, top=40, bottom=72)
    ax.frame(xticks=[0, 1, 2, 3, 4], xfmt=lambda t: AYS[int(t)],
             yticks=[0.95, 1.05, 1.15], yfmt=lambda t: f"{t:.2f}", grid=True)
    for series, colour, name in (
            ([1.000, 1.046, 1.093, 1.143, 1.196], ROSE, "severity"),
            ([1.000, 0.988, 0.976, 0.964, 0.953], BLUE, "frequency"),
            ([1.000, 1.033, 1.067, 1.102, 1.140], GREEN, "pure premium")):
        ax.polyline([(k, v) for k, v in enumerate(series)], colour=colour,
                    width=2.2)
        ax.label(4, series[4], name, cls="sm bold", fill=colour, anchor="end",
                 dx=-4, dy=-8 if colour is not BLUE else 16)
    f.text(BCX, ax.y1 + 30, "indexed to accident year 2020", cls="sm dim")
    f.text(BCX, BY1 - 16, "a rising pure premium built on falling frequency",
           cls="sm dim")
    f.text(BCX, BY1 + 2, "is a different problem from a rising one on both",
           cls="sm dim")
    return f


@figure("Actual vs Expected Analysis", "Emergence in the period against what the "
        "previous valuation implied", width=WID)
def actual_vs_expected_analysis() -> Fig:
    f = vcard()

    ax = vaxes(f, -0.5, 4.5, 0, 700, left=56, right=22, top=48, bottom=80)
    ax.frame(xticks=[0, 1, 2, 3, 4], xfmt=lambda t: AYS[int(t)],
             yticks=[0, 300, 600], yfmt=lambda t: f"{t:,.0f}", grid=True)
    expected = [40, 90, 180, 340, 640]
    actual = [36, 84, 210, 420, 610]
    bw = (ax.px(1) - ax.px(0)) * 0.32
    for k in range(5):
        x = ax.px(k)
        f.rect(x - bw - 1, ax.py(expected[k]), bw, ax.y1 - ax.py(expected[k]),
               rx=2, fill="var(--dim)", fill_opacity="0.45")
        colour = ROSE if actual[k] > expected[k] * 1.05 else BLUE
        f.rect(x + 1, ax.py(actual[k]), bw, ax.y1 - ax.py(actual[k]), rx=2,
               fill=colour, fill_opacity="0.72")
    f.legend_row(104, 106, [("var(--dim)", "expected"), (BLUE, "actual")],
                 gap=112)
    f.text(BCX, ax.y1 + 30, "emergence during 2024 ($000)", cls="sm dim")
    f.text(BCX, ax.y1 + 54, "2022 and 2023 ran hot: A/E 1.17 and 1.24",
           cls="sm bold")
    f.text(BCX, ax.y1 + 74, "— investigate before the next full review",
           cls="sm dim")
    return f


@figure("Roll Forward Analysis", "The reserve balance reconciled from one valuation "
        "to the next", width=WID)
def roll_forward_analysis() -> Fig:
    f = vcard()

    bars = [("opening", 5200, 0, VIOLET), ("new AY", 2850, 5200, GREEN),
            ("paid", -2400, 5650, ROSE), ("PY dev", 180, 5650, AMBER),
            ("closing", 5830, 0, BLUE)]
    ax = vaxes(f, -0.6, 4.6, 0, 8600, left=58, right=20, top=44, bottom=80)
    ax.frame(xticks=[0, 1, 2, 3, 4],
             xfmt=lambda t: bars[int(t)][0], yticks=[0, 4000, 8000],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    bw = (ax.px(1) - ax.px(0)) * 0.5
    for k, (name, delta, base, colour) in enumerate(bars):
        x = ax.px(k)
        lo, hi = (base, base + delta) if delta > 0 else (base + delta, base)
        f.rect(x - bw / 2, ax.py(hi), bw, ax.py(lo) - ax.py(hi), rx=2,
               fill=colour, fill_opacity="0.72")
        f.text(x, ax.py(hi) - 8, f"{abs(delta):,}", cls="sm")
    f.text(BCX, ax.y1 + 32, "unpaid claims ($000) through calendar 2024",
           cls="sm dim")
    f.text(BCX, BY1 - 16, "only the prior-year development is a change of",
           cls="sm dim")
    f.text(BCX, BY1 + 2, "view — the rest is mechanics", cls="sm dim")
    return f


@figure("Reserve Communication", "A point estimate shown with the range and the "
        "drivers of its change", width=WID)
def reserve_communication() -> Fig:
    f = vcard()

    ax = vaxes(f, 1700, 2800, 0, 1.15, left=44, right=22, top=40, bottom=104)

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
    f.text(BCX, ax.y1 + 40, "estimate and reasonable range ($000)", cls="sm dim")
    f.text(BCX, ax.y1 + 68, "ASOP 43 requires the intended measure, the",
           cls="sm dim")
    f.text(BCX, ax.y1 + 86, "basis, and any material change in method or",
           cls="sm dim")
    f.text(BCX, ax.y1 + 104, "assumption to be disclosed with the number",
           cls="sm dim")
    return f


@figure("Stakeholder Reporting", "One estimate reported at four depths to four "
        "audiences", width=WID)
def stakeholder_reporting() -> Fig:
    f = vcard()

    rows = [("Actuarial report", "methods, data, every selection", 272, VIOLET),
            ("Management", "drivers, ranges, what changed", 236, BLUE),
            ("Board & regulator", "adequacy and the opinion", 200, TEAL),
            ("Investors", "the number and its move", 164, GREEN)]
    for i, (name, note, w, colour) in enumerate(rows):
        y = 130 + i * 62
        f.rect(BCX - w / 2, y, w, 44, rx=6, fill=colour, fill_opacity="0.16",
               stroke=colour, stroke_width="1.2")
        f.text(BCX, y + 19, name, cls="sm bold")
        f.text(BCX, y + 35, note, cls="sm dim")
    f.text(BCX, BY1 - 2, "narrower is not different — it is the same estimate",
           cls="sm dim")
    return f


@figure("Regulatory Reporting", "The three linked regulatory deliverables and the "
        "range the opinion turns on", width=WID)
def regulatory_reporting() -> Fig:
    f = vcard()

    rows = [("Schedule P", "ten years of triangles, filed", BLUE),
            ("Statement of Actuarial Opinion",
             "reasonable / deficient / redundant", AMBER),
            ("Actuarial Report", "the work supporting the opinion", VIOLET)]
    for i, (name, note, colour) in enumerate(rows):
        y = 122 + i * 68
        f.rect(44, y, 272, 50, rx=6, fill=colour, fill_opacity="0.14",
               stroke=colour, stroke_width="1.2")
        f.text(BCX, y + 22, name, cls="sm bold")
        f.text(BCX, y + 38, note, cls="sm dim")
        if i:
            f.arrow(BCX, y - 16, BCX, y - 2, colour="var(--dim)", width=1.2)

    x0, x1, y = 66, 294, 348
    f.line(x0, y, x1, y, cls="axis")
    f.rect(x0 + (x1 - x0) * 0.2, y - 9, (x1 - x0) * 0.62, 18, rx=4, fill=GREEN,
           fill_opacity="0.20", stroke=GREEN, stroke_width="1.1")
    f.text(BCX, y - 18, "carried inside the range ⇒ reasonable", cls="sm dim")
    f.text(x0, y + 18, "low", cls="sm dim")
    f.text(x1, y + 18, "high", cls="sm dim")
    return f


@figure("External Information in Reserving", "Thin internal experience blended with "
        "an industry development pattern", width=WID)
def external_information_in_reserving() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 60, 0.95, 2.0, left=54, right=24, top=36, bottom=84)
    ax.frame(xticks=[12, 24, 36, 48, 60], yticks=[1.0, 1.5, 2.0],
             yfmt=lambda t: f"{t:.1f}", grid=True)
    own = [(12, 1.62), (24, 1.09), (36, 1.14), (48, 0.99), (60, 1.03)]
    ind = [(12, 1.48), (24, 1.16), (36, 1.07), (48, 1.03), (60, 1.01)]
    ax.polyline(ind, colour=AMBER, width=2.2, dash=True)
    for x, y in own:
        ax.point(x, y, colour=BLUE, r=3.6)
    ax.polyline(own, colour=BLUE, width=1.6)
    ax.label(30, 1.72, "own data — 4 observations", cls="sm bold", fill=BLUE)
    ax.label(46, 1.28, "industry", cls="sm bold", fill=AMBER)
    f.text(BCX, ax.y1 + 30, "age-to-age factors by age in months", cls="sm dim")
    f.text(BCX, ax.y1 + 56, "an industry pattern is a complement, not a",
           cls="sm dim")
    f.text(BCX, ax.y1 + 74, "substitute — check the mix and limits behind it",
           cls="sm dim")
    return f
