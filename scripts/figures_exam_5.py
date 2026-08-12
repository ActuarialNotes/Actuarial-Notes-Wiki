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
    f = vcard("Premium must fund every future cost",
              ["Premium = Loss + LAE + Expense + Profit",
               "the fundamental insurance equation"])

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
    f = vcard("A good base moves with expected loss",
              ["Premium = Rate × Exposures",
               "Pure Premium = Losses / Earned Exposures"])

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
    f = vcard("Each line is priced and reserved on its own",
              "Rate is set per line, per class, per territory")

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
    f = vcard("Accuracy and availability pull against each other",
              ["Experience Ratio = developed losses", "÷ on-level premium"])

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
    f = vcard("Everything booked in the year, whatever it belongs to",
              ["CY EP = Written Premium − ΔUEP",
               "CY Incurred = Paid + ΔCase + ΔIBNR"])

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
    f = vcard("Every transaction on policies incepting in the year",
              ["PY Loss Ratio = losses on those policies",
               "÷ premium on those policies"])

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
    f = vcard("Losses by when the event happened",
              ["AY Loss Ratio = losses occurring in the year",
               "÷ premium earned in that year"])

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
    f = vcard("Claims by when the insurer heard about them",
              "Report lag = report date − accident date")

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
    f = vcard("Claims by when they finally settled",
              "Settlement lag = close − accident date")

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
    f = vcard("A stock at a date, not a flow over a period",
              ["In-force = # { effective ≤ t < expiry }",
               "measured at an instant, not over a period"])

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
    f = vcard("What the insurer keeps after cessions",
              ["Net = Gross − Ceded",
               "the cedant stays liable to its policyholders"])

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
    f = vcard("Booked in full the day the policy is issued",
              ["WP = full-term premium, at issue",
               "Earned Premium = WP − ΔUEP"])

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
    f = vcard("Recognized as the coverage is provided",
              ["EP = WP × (days elapsed / policy term)",
               "EP = Written Premium − ΔUEP"])

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
    f = vcard("The coverage still owed — a balance-sheet liability",
              ["UEP = WP × (days remaining / term)",
               "UEP + EP = Written Premium"])

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
    f = vcard("Exposure earns exactly as premium does",
              ["Earned Exposure = Written − ΔUnearned",
               "Pure Premium = Losses / Earned Exposures"])

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
    f = vcard("One rate only fits a group that is alike",
              ["E[Loss Cost_i] ≈ E[Loss Cost_j]",
               "for every i, j in the group"])

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
    f = vcard("Blend the data you have with what it lacks",
              ["Estimate = Z · Own + (1 − Z) · Complement",
               "Z = √(n / n_F)  or  n / (n + K)"])

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
    f = vcard("Claims cost more than the indemnity paid",
              ["Loss & LAE = Loss + ALAE + ULAE",
               "Ratio = (Loss + LAE) / Earned Premium"])

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
    f = vcard("The loss cost of one unit of exposure",
              ["Pure Premium = (Loss + LAE) / Exposures",
               "= Frequency × Severity"])

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
    f = vcard("The share of premium the claims consume",
              ["Loss Ratio = (Loss + LAE) / Premium",
               "= Pure Premium / Average Premium"])

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
    f = vcard("Immature years must be grown to ultimate",
              ["Ultimate = Losses at age n × CDF(n → ult)",
               "1,500 × 1.900 = 2,850"])

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
    f = vcard("Trend bridges two average accident dates",
              ["Trend Factor = (1 + t)ⁿ = 1.05^2.75 = 1.142",
               "1 + t_PP = (1 + t_freq)(1 + t_sev)"])

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
    f = vcard("Covered by the policy in force when it happened",
              "Covered ⇔ effective ≤ accident ≤ expiry")

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
    f = vcard("Covered by the policy in force when it was reported",
              ["Covered ⇔ accident ≥ retro date",
               "and report date inside the term"])

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
    f = vcard("Premium restated at today's rates",
              ["On-Level Premium = Historical EP × OLF",
               "OLF = current index / average index"])

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
    f = vcard("The parallelogram method reads areas as weights",
              ["area at the new level = ½(1 − p)²",
               "p = 0.5 ⇒ 0.125 of CY 2023 earned premium"])

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
    f = vcard("The exposure is only known afterwards",
              ["Audited Premium = Rate × Actual Exposure",
               "Adjustment = Audited − Deposit"])

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
    f = vcard("An inflating base absorbs part of loss trend",
              ["Trended Exposure = Exposure × (1 + t_E)ⁿ",
               "1 + t_net = (1 + t_L) / (1 + t_E)"])

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
    f = vcard("Average premium drifts even at a fixed rate level",
              ["Avg Premium at CRL = On-Level EP / Exp",
               "Premium Trend Factor = (1 + t_P)ⁿ"])

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
    f = vcard("Fixed expense is added, variable expense divided",
              ["Rate = (Pure Premium + F) / (1 − V − Q)",
               "(360 + 25) / (1 − 0.26 − 0.05) = 557.97"])

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
    f = vcard("The same dollars whatever the premium",
              ["F = Fixed Expenses / Earned Exposures",
               "Rate = (Pure Premium + F) / (1 − V − Q)"])

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
    f = vcard("A constant share of whatever the premium is",
              ["V = Variable Expenses / Premium = 26%",
               "Rate = (Pure Premium + F) / (1 − V − Q)"])

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
    f = vcard("Non-claim cost as a share of premium",
              ["Expense Ratio = UW Expenses / Premium",
               "20.0 + 3.0 + 3.0 variable + 4.8 fixed = 30.8%"])

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
    f = vcard("The margin for capital, and for being wrong",
              ["Rate = (Pure Premium + F) / (1 − V − Q_T)",
               "Target Combined Ratio = 1 − Q_T = 95%"])

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
    f = vcard("What the insurance operation earns on its own",
              ["UW Profit = EP − Loss − LAE − Expenses",
               "UW Margin = 1 − Combined Ratio"])

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
    f = vcard("What the average rate has to become",
              ["Change = Indicated Rate / Current − 1",
               "557.97 / 520 − 1 = +7.3%"])

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
    f = vcard("Build the rate; never divide by premium",
              ["Rate = (Pure Premium + F) / (1 − V − Q_T)",
               "(360 + 25) / 0.69 = $557.97"])

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
    f = vcard("Compare the projected ratio with the permissible",
              ["Change = (Proj Loss Ratio + F%) / PLR − 1",
               "(0.692 + 0.048) / 0.69 − 1 = +7.3%"])

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
    f = vcard("What is left for losses after everything else",
              ["PLR = 1 − V − Q_T = 1 − 0.26 − 0.05 = 0.69",
               "Change = (Proj Ratio + F%) / PLR − 1"])

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
    f = vcard("Indicated and selected are two different numbers",
              ["Change = Indicated Rate / Current − 1",
               "selected = indicated, adjusted and documented"])

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
    f = vcard("The indication is the start of the conversation",
              "Selected = f(Indication, Z, Constraints)")

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
    f = vcard("Relativity changes move revenue on their own",
              ["New Base = Base × (1 + overall) / (1 + OB)",
               "1.073 / 1.030 ⇒ base rate +4.2%"])

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
    f = vcard("A floor under the smallest risks",
              "Premium = max(Rate × Exposure, Min)")

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
    f = vcard("The order of operations is part of the filing",
              ["Premium = [Base × ∏Rᵢ + ΣAⱼ](1 − D) + Fees",
               "558 × 1.25 × 0.90 + 40 − 5% = $636"])

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
    f = vcard("Four statements define an actuarially sound rate",
              "Rate = E[Loss + LAE + Expense + Capital]")

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
    f = vcard("Cap the shock, then spread it back",
              ["Capped Loss = min(X, M)",
               "Excess Load = ILF(U) / ILF(M) − 1"])

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
    f = vcard("A load, not an average of recent years",
              ["Total PP = Non-Cat PP + Cat Load",
               "Cat Load = expected annual cat loss / exposures"])

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
    f = vcard("Each class pays its own expected cost",
              ["Relativity_i = PP_i / PP_base",
               "Rate_i = Base Rate × ∏ R_i,k"])

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
    f = vcard("Geography is correlated with its neighbours",
              ["Territory Relativity = PP_i / PP_base",
               "Rate_i = Base Rate × Territory Relativity"])

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
    f = vcard("The share of loss a deductible removes",
              ["LER(d) = E[X ∧ d] / E[X]",
               "Deductible Relativity = 1 − LER(d)"])

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
    f = vcard("The credit is what the insured keeps",
              ["Deductible Relativity = 1 − LER(d)",
               "1 − 0.34 = 0.66 for a $500 deductible"])

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
    f = vcard("The extra cost of a higher limit",
              ["ILF(L) = E[X ∧ L] / E[X ∧ B]",
               "layer (M, L] = Basic LC × [ILF(L) − ILF(M)]"])

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
    f = vcard("Under-insure and the clause pays only a share",
              ["Share = min(Carried / (Coins% × Value), 1)",
               "600k / (0.80 × 1,000k) = 0.75, then × Loss"])

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
    f = vcard("The manual rate is a starting point",
              "Standard = Manual × M_exp × (1 + sched)")

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
    f = vcard("The risk's own past, weighted by credibility",
              ["M = Z × (A / E) + (1 − Z)",
               "0.40 × 0.70 + 0.60 = 0.88"])

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


@figure("Schedule Rating", "Underwriter debits and credits accumulating into one "
        "schedule modifier", width=WID)
def schedule_rating() -> Fig:
    f = vcard("Judgment the class plan does not capture",
              ["Premium = Manual × (1 + Σ s_k)",
               "−10 −5 +8 −3 +5 ⇒ 0.95"])

    items = [("Premises condition", -10), ("Classification", -5),
             ("Employee selection", 8), ("Management", -3), ("Equipment", 5)]
    x_zero, scale = 248, 3.6
    for i, (name, pts) in enumerate(items):
        y = 132 + i * 42
        f.text(44, y + 4, name, cls="sm", anchor="start")
        colour = ROSE if pts > 0 else GREEN
        w = abs(pts) * scale
        x = x_zero if pts > 0 else x_zero - w
        f.rect(x, y - 9, w, 20, rx=3, fill=colour, fill_opacity="0.65")
        f.text(x_zero + (w + 8 if pts > 0 else -w - 8), y + 4, f"{pts:+d}",
               cls="sm", anchor="start" if pts > 0 else "end")
    f.line(x_zero, 114, x_zero, 348, cls="rule")
    f.text(BCX, 372, "net −5% — and the file has to say why", cls="sm dim")
    return f


@figure("Retrospective Rating", "Retrospective premium rising with the insured's own "
        "losses between a guaranteed minimum and maximum", width=WID)
def retrospective_rating() -> Fig:
    f = vcard("The insured pays for its own year, within limits",
              ["R = (BP + CL × LCF) × TM",
               "clamped to [R_min, R_max]"])

    ax = vaxes(f, 0, 160, 0, 190, left=52, right=20, top=32, bottom=70)
    ax.frame(xticks=[0, 50, 100, 150], yticks=[0, 50, 100, 150],
             xfmt=lambda t: f"{t:.0f}", yfmt=lambda t: f"{t:.0f}", grid=True)
    ax.curve(lambda L: min(max(30 + 1.15 * L, 45), 150), colour=BLUE, width=2.6)
    ax.hline(45, colour=GREEN, x_to=160, dash=True)
    ax.label(158, 45, "minimum", cls="sm bold", fill=GREEN, anchor="end", dy=-7)
    ax.hline(150, colour=ROSE, x_to=160, dash=True)
    ax.label(158, 150, "maximum", cls="sm bold", fill=ROSE, anchor="end", dy=-7)
    ax.label(70, 100, "basic + converted losses", cls="sm", fill=BLUE,
             anchor="start", dx=-6, dy=-10)
    f.text(BCX, ax.y1 + 32, "the insured's own losses ($000)", cls="sm dim")
    f.text(BCX, BY1 - 18, "retrospective, not prospective — this year's",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "losses adjust this year's premium", cls="sm dim")
    return f


@figure("Self-Insured Retention", "Claims split at the retention between the "
        "entity's own layer and the insurer's", width=WID)
def self_insured_retention() -> Fig:
    f = vcard("The layer the entity funds itself",
              ["Retained = Σ min(X_i, R)",
               "Excess = Σ max(X_i − R, 0)"])

    claims = [120, 340, 90, 780, 250, 60, 1150, 200]
    R = 250
    ax = vaxes(f, 0.3, len(claims) + 0.7, 0, 1250, left=52, right=20, top=34,
               bottom=70)
    ax.frame(xticks=[], yticks=[0, 250, 750, 1250],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    bw = (ax.px(2) - ax.px(1)) * 0.56
    for k, x in enumerate(claims):
        cx = ax.px(k + 1)
        lo = min(x, R)
        f.rect(cx - bw / 2, ax.py(lo), bw, ax.y1 - ax.py(lo), rx=2, fill=AMBER,
               fill_opacity="0.75")
        if x > R:
            f.rect(cx - bw / 2, ax.py(x), bw, ax.py(R) - ax.py(x), rx=2,
                   fill=BLUE, fill_opacity="0.7")
    ax.hline(R, colour=ROSE, x_to=len(claims) + 0.7, dash=False)
    ax.label(len(claims) + 0.6, R, "SIR 250", cls="sm bold", fill=ROSE,
             anchor="end", dy=-7)
    f.text(BCX, ax.y1 + 30, "individual claims ($000)", cls="sm dim")
    f.legend_row(56, ax.y1 + 52, [(AMBER, "retained"), (BLUE, "insured")],
                 gap=120)
    f.text(BCX, BY1 - 2, "the retained layer still needs a reserve estimate",
           cls="sm dim")
    return f


@figure("Reinsurance", "An excess-of-loss treaty cutting each claim into the "
        "cedant's retention, the reinsured layer and the excess above it",
        width=WID)
def reinsurance() -> Fig:
    f = vcard("The insurer's own insurance",
              ["Net = Gross − Ceded",
               "Ceded_XOL = min(max(X − R, 0), L)"])

    claims = [180, 620, 300, 1400, 2600, 240, 900]
    R, L = 500, 1500
    ax = vaxes(f, 0.3, len(claims) + 0.7, 0, 2800, left=54, right=20, top=36,
               bottom=76)
    ax.frame(xticks=[], yticks=[0, 500, 2000, 2800],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    bw = (ax.px(2) - ax.px(1)) * 0.56
    for k, x in enumerate(claims):
        cx = ax.px(k + 1)
        for lo, hi, colour in ((0, min(x, R), BLUE),
                               (R, min(max(x, R), R + L), AMBER),
                               (R + L, max(x, R + L), ROSE)):
            if hi <= lo:
                continue
            f.rect(cx - bw / 2, ax.py(hi), bw, ax.py(lo) - ax.py(hi), rx=2,
                   fill=colour, fill_opacity="0.72")
    ax.hline(R, colour=BLUE, x_to=len(claims) + 0.7, dash=False)
    ax.hline(R + L, colour=AMBER, x_to=len(claims) + 0.7, dash=False)
    f.text(BCX, ax.y1 + 30, "individual claims ($000)", cls="sm dim")
    f.legend_row(46, ax.y1 + 52,
                 [(BLUE, "retained 500"), (AMBER, "1,500 xs 500")], gap=136)
    f.text(BCX, ax.y1 + 72, "the layer above the treaty comes back to the cedant",
           cls="sm dim")
    return f


@figure("Lifetime Value", "The present value of a customer's profit over the years "
        "they are expected to stay", width=WID)
def lifetime_value() -> Fig:
    f = vcard("A customer is worth more than one policy",
              ["LTV = Σ (P_t − L_t − E_t) · ₜp / (1 + r)ᵗ",
               "Retention = renewed / eligible to renew"])

    ax = vaxes(f, 0.4, 6.6, -40, 60, left=52, right=18, top=36, bottom=72)
    ax.frame(xticks=[1, 2, 3, 4, 5, 6], yticks=[-40, 0, 40],
             yfmt=lambda t: f"{t:.0f}", grid=True)
    profit = [-34, 22, 30, 26, 21, 16]
    ax.bars([(k + 1, v) for k, v in enumerate(profit)], colour=BLUE,
            opacity="0.72")
    for k, v in enumerate(profit):
        if v < 0:
            ax.bars([(k + 1, v)], colour=ROSE, opacity="0.72")
    ax.label(1.6, -26, "year 1 loses money", cls="sm", fill=ROSE, anchor="start")
    ax.label(4.4, 40, "PV of profit = $81", cls="sm bold", fill=BLUE)
    f.text(BCX, ax.y1 + 32, "policy year, discounted and survival-weighted",
           cls="sm dim")
    f.text(BCX, BY1 - 18, "it is a marketing and retention frame laid over",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "the indication — it never replaces one", cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Estimating claim liabilities — the framework
# ═══════════════════════════════════════════════════════════════════════════

@figure("Loss Reserving", "Reserving looking backwards at claims already incurred "
        "while ratemaking looks forwards", width=WID)
def loss_reserving() -> Fig:
    f = vcard("The retrospective half of the actuarial job",
              ["Total Reserve = Case Reserves + IBNR",
               "IBNR = Pure IBNR + IBNER"])

    y = 168
    f.line(44, y, 316, y, cls="axis")
    f.line(BCX, y - 12, BCX, y + 12, cls="tick")
    f.text(BCX, y + 30, "valuation date", cls="sm dim")
    f.arrow(BCX - 10, y - 34, 52, y - 34, colour=BLUE, width=1.8)
    f.text(BCX - 90, y - 44, "reserving", cls="sm bold", fill=BLUE)
    f.text(BCX - 90, y - 60, "what past losses will cost", cls="sm dim")
    f.arrow(BCX + 10, y - 34, 308, y - 34, colour=AMBER, width=1.8)
    f.text(BCX + 90, y - 44, "ratemaking", cls="sm bold", fill=AMBER)
    f.text(BCX + 90, y - 60, "what future losses will cost", cls="sm dim")

    f.text(BCX, 246, "the liability being estimated", cls="sm dim")
    _hbar(f, 288, [(0.42, "case reserves", AMBER), (0.58, "IBNR", VIOLET)],
          x0=44, x1=316, height=34)
    f.text(BCX, 344, "the claims department sets the first;", cls="sm dim")
    f.text(BCX, 362, "the actuary is responsible for the second", cls="sm dim")
    return f


@figure("Unpaid Claims", "The ultimate loss split into what has been paid, the case "
        "reserves and IBNR", width=WID)
def unpaid_claims() -> Fig:
    f = vcard("Everything still owed on losses already incurred",
              ["Unpaid = Ultimate − Paid to date",
               "Unpaid = Case Reserves + IBNR"])

    f.text(BCX, 118, "AY 2024 at 12 months ($000)", cls="sm dim")
    x0, x1 = 44, 316
    parts = [(600, "paid 600", GREEN), (900, "case 900", AMBER),
             (1350, "IBNR 1,350", VIOLET)]
    x = x0
    for amount, label, colour in parts:
        w = (x1 - x0) * amount / 2850
        f.rect(x, 160, w, 44, rx=4, fill=colour, fill_opacity="0.34",
               stroke=colour, stroke_width="1.2")
        x += w
    brace(f, x0, x1, 156, depth=8, below=False, label="ultimate 2,850")
    brace(f, x0 + (x1 - x0) * 600 / 2850, x1, 210, depth=8,
          label="unpaid claim estimate 2,250")
    for i, (amount, label, colour) in enumerate(parts):
        y = 268 + i * 32
        f.rect(84, y - 9, 11, 11, rx=2, fill=colour, fill_opacity="0.8")
        f.text(102, y + 1, label, cls="sm", anchor="start")
    f.text(BCX, BY1 - 2, "reported = paid + case; the rest is the actuary's",
           cls="sm dim")
    return f


@figure("Reserving Data Organization", "Segmenting a book into triangles that each "
        "hold a stable emergence pattern", width=WID)
def reserving_data_organization() -> Fig:
    f = vcard("Segment until each triangle behaves like itself",
              ["Unpaid = Ultimate − Paid",
               "IBNR = Ultimate − Reported"])

    f.text(BCX, 112, "one book, three defensible segmentations", cls="sm dim")
    groups = [("Coverage", ["BI", "PD", "Coll", "Comp"], BLUE),
              ("Claim type", ["litigated", "not litigated"], TEAL),
              ("Limit band", ["basic", "excess"], VIOLET)]
    for i, (name, cells, colour) in enumerate(groups):
        y = 146 + i * 68
        f.text(46, y - 10, name, cls="sm bold", anchor="start")
        w = 268 / len(cells)
        for j, cell in enumerate(cells):
            f.rect(46 + j * w, y, w - 5, 30, rx=4, fill=colour,
                   fill_opacity="0.18", stroke=colour, stroke_width="1.1")
            f.text(46 + j * w + (w - 5) / 2, y + 20, cell, cls="sm")
    f.text(BCX, 358, "more homogeneous, less credible — the same", cls="sm dim")
    f.text(BCX, 376, "trade as ratemaking, decided per triangle", cls="sm dim")
    return f


@figure("Underwriting Year", "Reinsurance treaties grouped by the year the contract "
        "was bound", width=WID)
def underwriting_year() -> Fig:
    f = vcard("Policy year, carried into reinsurance",
              ["UY Loss Ratio = ceded losses ÷ premium",
               "on the contracts bound that year"])

    _calendar_axis(f, 296, ["2023", "2024", "2025"], band=1, y_top=128)
    spans = [(1.0, 2.0), (1.0, 2.4), (1.0, 3.0)]
    labels = ["treaty A", "treaty B", "treaty C"]
    _policy_bars(f, 154, spans, x0=48, x1=318, t0=0.0, t1=3.0, gap=36,
                 colour=VIOLET, labels=None)
    for i, name in enumerate(labels):
        f.text(52, 154 + i * 36 - 12, name, cls="sm dim", anchor="start")
    f.text(BCX, 114, "UY 2024", cls="sm bold", fill=AMBER)
    f.text(BCX, 334, "a treaty bound 1/1 covers policies written", cls="sm dim")
    f.text(BCX, 352, "all year, so a UY runs longer than a policy year",
           cls="sm dim")
    return f


@figure("Types of Insurance", "Lines of insurance placed by claim frequency and "
        "claim severity", width=WID)
def types_of_insurance() -> Fig:
    f = vcard("Frequency, severity and how long the tail runs",
              "Pure Premium = Frequency × Severity")

    ax = vaxes(f, 0, 10, 0, 10, left=48, right=24, top=36, bottom=70)
    ax.frame(xticks=[], yticks=[], arrows=True)
    lines = [(8.4, 1.4, "Auto PD", GREEN), (6.6, 3.2, "Homeowners", GREEN),
             (4.4, 5.6, "CGL", BLUE), (2.6, 6.8, "Auto BI", BLUE),
             (3.2, 8.8, "Workers comp", ROSE), (0.9, 9.4, "Med mal", ROSE)]
    for x, y, name, colour in lines:
        ax.point(x, y, colour=colour, r=4.6)
        ax.label(x, y, name, cls="sm bold", fill=colour, dy=-10)
    f.text(ax.x0 - 6, ax.y0 - 14, "severity", cls="sm dim", anchor="start")
    f.text(ax.x1, ax.y1 + 20, "frequency", cls="sm dim", anchor="end")
    f.text(BCX, BY1 - 16, "low frequency and high severity means a long",
           cls="sm dim")
    f.text(BCX, BY1 + 2, "tail — and colour is the tail length here", cls="sm dim")
    return f


def _emergence(ax: Axes, pattern, colour, label=None, width=2.4, dash=False):
    ax.polyline(pattern, colour=colour, width=width, dash=dash)
    for x, y in pattern:
        ax.point(x, y, colour=colour, r=3)
    if label:
        ax.label(pattern[-1][0], pattern[-1][1], label, cls="sm bold",
                 fill=colour, anchor="end", dx=-4, dy=-8)


@figure("Long Tail Lines", "A long-tail reporting pattern taking years to reach "
        "ultimate", width=WID)
def long_tail_lines() -> Fig:
    f = vcard("Most of the cost is still an estimate for years",
              ["Reported % = 1 / CDF(n → ult)",
               "52.6% reported at 12 months"])

    ax = vaxes(f, 0, 96, 0, 1.08, left=50, right=22, top=32, bottom=66)
    ax.frame(xticks=[12, 36, 60, 84], yticks=[0, 0.5, 1.0],
             yfmt=lambda t: f"{t:.0%}", grid=True)
    long_p = [(12, 0.526), (24, 0.789), (36, 0.916), (48, 0.971), (60, 0.990),
              (72, 0.998), (84, 1.0), (96, 1.0)]
    short_p = [(12, 0.94), (24, 0.99), (36, 1.0), (48, 1.0), (60, 1.0),
               (72, 1.0), (84, 1.0), (96, 1.0)]
    ax.polyline(short_p, colour="var(--dim)", width=1.6, dash=True)
    _emergence(ax, long_p, BLUE)
    ax.label(60, 0.30, "long tail", cls="sm bold", fill=BLUE)
    ax.label(60, 0.30, "auto BI, WC, med mal", cls="sm dim", dy=15)
    ax.label(40, 1.0, "short tail", cls="sm dim", anchor="start", dx=4, dy=-7)
    ax.point(12, 0.526, colour=ROSE, r=4.2)
    f.text(BCX, ax.y1 + 32, "age in months", cls="sm dim")
    f.text(BCX, BY1 - 2, "the reserve, not the payment, is the whole exposure",
           cls="sm dim")
    return f


@figure("Short Tail Insurance", "A short-tail reporting pattern reaching ultimate "
        "within a year", width=WID)
def short_tail_insurance() -> Fig:
    f = vcard("Reported is almost ultimate straight away",
              ["CDF(12 → ult) ≈ 1.0",
               "IBNR is small beside the case reserves"])

    ax = vaxes(f, 0, 60, 0, 1.08, left=50, right=22, top=32, bottom=66)
    ax.frame(xticks=[12, 24, 36, 48, 60], yticks=[0, 0.5, 1.0],
             yfmt=lambda t: f"{t:.0%}", grid=True)
    short_p = [(12, 0.94), (24, 0.99), (36, 1.0), (48, 1.0), (60, 1.0)]
    long_p = [(12, 0.526), (24, 0.789), (36, 0.916), (48, 0.971), (60, 0.990)]
    ax.polyline(long_p, colour="var(--dim)", width=1.6, dash=True)
    _emergence(ax, short_p, GREEN)
    ax.label(30, 0.62, "long tail", cls="sm dim")
    ax.label(34, 0.94, "auto PD, property", cls="sm bold", fill=GREEN, dy=-8)
    f.text(BCX, ax.y1 + 32, "age in months", cls="sm dim")
    f.text(BCX, BY1 - 18, "development is a small correction, so a", cls="sm dim")
    f.text(BCX, BY1 - 2, "distorted factor costs far less than on a long tail",
           cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Estimating claim liabilities — triangles and development factors
# ═══════════════════════════════════════════════════════════════════════════

@figure("Development Triangle", "A cumulative reported-loss triangle with its rows, "
        "columns and latest diagonal marked", width=WID)
def development_triangle() -> Fig:
    f = vcard("Cohorts down, maturities across, valuations diagonal",
              ["rows = accident year, columns = age",
               "the latest diagonal is one valuation date"])

    f.text(BCX, 110, "cumulative reported losses ($000)", cls="sm dim")
    _triangle(f, TRI, y0=140,
              shade=lambda i, j: i + j == 4, shade_colour=ROSE)
    f.text(BCX, 300, "age in months →", cls="sm dim")
    f.text(BCX, 328, "the shaded diagonal is 12/31/2024 — every", cls="sm dim")
    f.text(BCX, 346, "cell on it was valued on the same day", cls="sm dim")
    f.text(BCX, 372, "a pattern that moves along it is a calendar-year effect",
           cls="sm dim")
    return f


@figure("Paid Losses", "Paid losses developing toward the same ultimate as reported "
        "losses, from further below", width=WID)
def paid_losses() -> Fig:
    f = vcard("The only figure that contains no estimate",
              ["Reported = Paid + Case Reserves",
               "Ultimate = Paid_n × CDF_paid(n → ult)"])

    ax = vaxes(f, 0, 84, 0, 3200, left=54, right=20, top=32, bottom=66)
    ax.frame(xticks=[12, 36, 60, 84], yticks=[0, 1500, 3000],
             yfmt=lambda t: f"{t:,.0f}", grid=True)
    rpt = [(12, 1500), (24, 2250), (36, 2610), (48, 2767), (60, 2822),
           (72, 2845), (84, 2850)]
    pd_ = [(12, 600), (24, 1500), (36, 2150), (48, 2560), (60, 2740),
           (72, 2820), (84, 2850)]
    ax.polyline(rpt, colour=BLUE, width=2.2)
    ax.polyline(pd_, colour=GREEN, width=2.4)
    ax.hline(2850, colour="var(--dim)", x_to=84)
    ax.label(30, 2500, "reported", cls="sm bold", fill=BLUE, dy=-6)
    ax.label(46, 1900, "paid", cls="sm bold", fill=GREEN, dy=14)
    ax.label(78, 2850, "ultimate", cls="sm dim", anchor="end", dy=-8)
    f.text(BCX, ax.y1 + 32, "age in months", cls="sm dim")
    f.text(BCX, BY1 - 18, "immune to case-reserving changes, and", cls="sm dim")
    f.text(BCX, BY1 - 2, "distorted instead by the speed of settlement",
           cls="sm dim")
    return f


@figure("Incurred Losses", "Reported losses as paid losses plus the case reserves "
        "still outstanding", width=WID)
def incurred_losses() -> Fig:
    f = vcard("Paid plus case — what is known, not what is owed",
              ["Reported = Paid + Case Reserves",
               "Ultimate = Reported + IBNR"])

    ax = vaxes(f, 0.4, 5.6, 0, 3000, left=54, right=20, top=34, bottom=76)
    ax.frame(xticks=[1, 2, 3, 4, 5], xfmt=lambda t: AGES[int(t) - 1],
             yticks=[0, 1500, 3000], yfmt=lambda t: f"{t:,.0f}", grid=True)
    reported = [1882, 2029, 2088, 2025, 1500]
    paid = [1830, 1870, 1681, 1282, 600]
    bw = (ax.px(2) - ax.px(1)) * 0.56
    for k in range(5):
        cx = ax.px(k + 1)
        f.rect(cx - bw / 2, ax.py(paid[k]), bw, ax.y1 - ax.py(paid[k]), rx=2,
               fill=GREEN, fill_opacity="0.72")
        f.rect(cx - bw / 2, ax.py(reported[k]), bw,
               ax.py(paid[k]) - ax.py(reported[k]), rx=2, fill=AMBER,
               fill_opacity="0.72")
    f.text(BCX, ax.y1 + 30, "age of each accident year at 12/31/2024",
           cls="sm dim")
    f.legend_row(60, ax.y1 + 52, [(GREEN, "paid"), (AMBER, "case")], gap=104)
    f.text(BCX, BY1 - 2, "case reserves are an estimate — so reported is too",
           cls="sm dim")
    return f


@figure("Claim Count Triangle", "A claim-count development triangle beside the "
        "severity it makes computable", width=WID)
def claim_count_triangle() -> Fig:
    f = vcard("Counts separate more claims from costlier ones",
              ["Ultimate Counts = N_n × CDF_count(n → ult)",
               "Severity = Ultimate Losses / Ultimate Counts"])

    f.text(BCX, 110, "cumulative reported claim counts", cls="sm dim")
    _triangle(f, CNT, y0=140)
    f.text(BCX, 300, "age in months →", cls="sm dim")
    f.text(BCX, 332, "AY 2024: 700 × 1.429 = 1,000 ultimate claims",
           cls="sm")
    f.text(BCX, 360, "2,850,000 / 1,000 = $2,850 average severity",
           cls="sm dim")
    return f


@figure("Allocated Loss Adjustment Expense", "ALAE developing more slowly than "
        "indemnity, as a rising ratio to loss", width=WID)
def allocated_lae() -> Fig:
    f = vcard("Defence cost that belongs to one claim",
              ["Loss & ALAE = Indemnity + ALAE",
               "ALAE Ratio = ALAE / Indemnity"])

    ax = vaxes(f, 0, 84, 0, 0.24, left=52, right=22, top=36, bottom=70)
    ax.frame(xticks=[12, 36, 60, 84], yticks=[0, 0.1, 0.2],
             yfmt=lambda t: f"{t:.0%}", grid=True)
    ratio = [(12, 0.085), (24, 0.112), (36, 0.135), (48, 0.152), (60, 0.163),
             (72, 0.168), (84, 0.170)]
    _emergence(ax, ratio, VIOLET)
    ax.label(56, 0.163, "17% at ultimate", cls="sm bold", fill=VIOLET, dy=-10)
    f.text(BCX, ax.y1 + 32, "age in months", cls="sm dim")
    f.text(BCX, BY1 - 16, "ALAE outlives the indemnity it defends, so its",
           cls="sm dim")
    f.text(BCX, BY1 + 2, "own triangle develops longer — reserve it apart",
           cls="sm dim")
    return f


@figure("Age to Age Factor", "One column of link ratios and the selections drawn "
        "from it", width=WID)
def age_to_age_factor() -> Fig:
    f = vcard("The ratio of one maturity to the previous one",
              ["f = C(AY, n+1) / C(AY, n)",
               "vol-weighted = Σ C(·, n+1) / Σ C(·, n)"])

    f.text(BCX, 108, "the 12–24 column of the reported triangle", cls="sm dim")
    rows = [("2020", 1500, 1000), ("2021", 1650, 1100), ("2022", 1800, 1200),
            ("2023", 2025, 1350)]
    for i, (ay, num, den) in enumerate(rows):
        y = 140 + i * 32
        f.text(52, y, ay, cls="sm dim", anchor="start")
        f.text(160, y, f"{num:,} / {den:,}", cls="sm", anchor="end")
        f.text(232, y, f"{num / den:.3f}", cls="sm", anchor="end")
    f.line(46, 284, 314, 284, cls="rule")
    f.text(160, 306, "6,975 / 4,650", cls="sm dim", anchor="end")
    f.text(232, 306, "1.500", cls="sm bold", anchor="end")
    f.text(280, 306, "selected", cls="sm dim", anchor="start")
    f.text(BCX, 344, "factors need not exceed 1.000 — salvage and", cls="sm dim")
    f.text(BCX, 362, "over-reserved claims develop downward", cls="sm dim")
    return f


@figure("Cumulative Development Factor", "The selected link ratios multiplied "
        "through to a factor to ultimate", width=WID)
def cumulative_development_factor() -> Fig:
    f = vcard("The link ratios, multiplied out to ultimate",
              ["CDF(n → ult) = ∏ f(k → k+1) × Tail",
               "1.500 × 1.160 × 1.060 × 1.020 × 1.010 = 1.900"])

    ages = ["12–24", "24–36", "36–48", "48–60", "tail"]
    facs = [1.500, 1.160, 1.060, 1.020, 1.010]
    x0, slot = 40, 56
    for i, (name, fac) in enumerate(zip(ages, facs)):
        cx = x0 + slot * i + slot / 2
        f.chip(cx, 148, f"{fac:.3f}", colour=BLUE if i < 4 else AMBER,
               w=slot - 8, h=28)
        f.text(cx, 122, name, cls="sm dim")
        if i:
            f.text(cx - slot / 2, 152, "×", cls="sm dim")
    f.text(BCX, 202, "cumulated back from ultimate", cls="sm dim")
    cdfs = [(0, 1.900), (1, 1.267), (2, 1.092), (3, 1.030), (4, 1.010)]
    for i, (k, v) in enumerate(cdfs):
        cx = x0 + slot * i + slot / 2
        f.chip(cx, 232, f"{v:.3f}", colour=GREEN, w=slot - 8, h=28)
        f.text(cx, 262, AGES[i], cls="sm dim")
    f.text(BCX, 306, "1 / 1.900 = 52.6% of AY 2024 is reported", cls="sm")
    f.text(BCX, 344, "the CDF is a property of the pattern, not of", cls="sm dim")
    f.text(BCX, 362, "the year it is applied to", cls="sm dim")
    return f


@figure("Tail Factor", "The development the triangle cannot see, beyond its last "
        "observed age", width=WID)
def tail_factor() -> Fig:
    f = vcard("The development past the end of the data",
              ["CDF(last → ult) = f(last observed) × Tail",
               "1.020 × 1.010 = 1.030"])

    ax = vaxes(f, 0, 132, 0.95, 1.62, left=52, right=20, top=34, bottom=70)
    ax.frame(xticks=[12, 60, 108], yticks=[1.0, 1.3, 1.6],
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
    ax.label(84, 1.10, "extrapolated", cls="sm bold", fill=AMBER)
    f.text(BCX, ax.y1 + 32, "age in months", cls="sm dim")
    f.text(BCX, BY1 - 16, "a curve fit or an industry benchmark — and on",
           cls="sm dim")
    f.text(BCX, BY1 + 2, "a long tail, the largest assumption in the analysis",
           cls="sm dim")
    return f


@figure("Severity Analysis", "Average claim severity by accident year with the "
        "trend fitted through it", width=WID)
def severity_analysis() -> Fig:
    f = vcard("Average cost per claim, year over year",
              ["Average Severity = Losses / Claim Counts",
               "Annual Trend = (S_n / S_0)^(1/n) − 1"])

    ax = vaxes(f, -0.4, 4.4, 2200, 3000, left=56, right=20, top=34, bottom=70)
    ax.frame(xticks=[0, 1, 2, 3, 4], xfmt=lambda t: AYS[int(t)],
             yticks=[2200, 2600, 3000], yfmt=lambda t: f"{t:,.0f}", grid=True)
    sev = [2380, 2470, 2600, 2705, 2850]
    ax.bars([(k, v) for k, v in enumerate(sev)], colour=BLUE, opacity="0.6",
            base=2200)
    ax.curve(lambda x: 2380 * 1.0455 ** x, colour=ROSE, width=2.2)
    ax.label(2.1, 2900, "4.6% a year", cls="sm bold", fill=ROSE)
    f.text(BCX, ax.y1 + 30, "ultimate severity by accident year", cls="sm dim")
    f.text(BCX, BY1 - 18, "read down the column for trend and across",
           cls="sm dim")
    f.text(BCX, BY1 - 2, "the row for a change in case reserving", cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Estimating claim liabilities — the methods
# ═══════════════════════════════════════════════════════════════════════════

@figure("Chain Ladder Method", "The latest diagonal of the triangle multiplied by "
        "each year's cumulative development factor", width=WID)
def chain_ladder_method() -> Fig:
    f = vcard("Multiply the latest diagonal out to ultimate",
              ["U = C(AY, n) × CDF(n → ult)",
               "1,500 × 1.900 = 2,850"])

    f.text(BCX, 108, "reported to date × CDF = ultimate ($000)", cls="sm dim")
    rows = [("2020", 1882, 1.010), ("2021", 2029, 1.030), ("2022", 2088, 1.092),
            ("2023", 2025, 1.267), ("2024", 1500, 1.900)]
    for i, (ay, c, cdf) in enumerate(rows):
        y = 146 + i * 34
        last = i == 4
        f.text(56, y, ay, cls="sm bold" if last else "sm dim", anchor="start")
        f.text(150, y, f"{c:,}", cls="sm", anchor="end")
        f.text(216, y, f"× {cdf:.3f}", cls="sm dim", anchor="end")
        f.text(304, y, f"{c * cdf:,.0f}", cls="sm bold" if last else "sm",
               anchor="end", fill=GREEN if last else "var(--ink)")
    f.text(BCX, 320, "every dollar of the diagonal is scaled by the", cls="sm dim")
    f.text(BCX, 338, "full factor — so a distorted diagonal is", cls="sm dim")
    f.text(BCX, 356, "multiplied, not merely added to", cls="sm dim")
    return f


@figure("Case Outstanding Development Method", "Future payments projected from the "
        "case reserve balance instead of from reported losses", width=WID)
def case_outstanding_development_method() -> Fig:
    f = vcard("Develop the case reserve, not the losses",
              ["U = Paid to date + Case O/S × f_case",
               "600 + 900 × 2.500 = 2,850"])

    x0, x1 = 46, 314
    f.text(BCX, 116, "AY 2024 at 12 months ($000)", cls="sm dim")
    f.rect(x0, 140, (x1 - x0) * 600 / 2850, 34, rx=4, fill=GREEN,
           fill_opacity="0.6")
    f.text(x0 + 8, 162, "paid 600", cls="sm", anchor="start")
    f.rect(x0, 196, (x1 - x0) * 900 / 2850, 34, rx=4, fill=AMBER,
           fill_opacity="0.6")
    f.text(x0 + 8, 218, "case 900", cls="sm", anchor="start")
    f.arrow(x0 + (x1 - x0) * 900 / 2850 + 6, 213, x0 + (x1 - x0) * 2250 / 2850,
            213, colour=ROSE, width=1.6)
    f.text(x0 + (x1 - x0) * 1600 / 2850, 205, "× 2.500", cls="sm bold", fill=ROSE)
    f.rect(x0, 252, (x1 - x0) * 2250 / 2850, 34, rx=4, fill=ROSE,
           fill_opacity="0.35", stroke=ROSE, stroke_width="1.2")
    f.text(x0 + 8, 274, "future payments 2,250", cls="sm", anchor="start")
    f.text(BCX, 322, "the factor is all future payments per dollar", cls="sm dim")
    f.text(BCX, 340, "of case reserve, so it inherits every change", cls="sm dim")
    f.text(BCX, 358, "in case-reserving adequacy directly", cls="sm dim")
    return f


@figure("Expected Loss Method", "An ultimate taken wholly from the a priori "
        "expectation, ignoring what has been reported", width=WID)
def expected_loss_method() -> Fig:
    f = vcard("The a priori, and nothing else",
              ["U = ELR × Earned Premium",
               "0.65 × 4,000 = 2,600"])

    ax = vaxes(f, 0, 3000, 2000, 3200, left=54, right=22, top=40, bottom=76)
    ax.frame(xticks=[0, 1000, 2000, 3000], xfmt=lambda t: f"{t:,.0f}",
             yticks=[2000, 2600, 3200], yfmt=lambda t: f"{t:,.0f}", grid=True)
    ax.curve(lambda c: 2600, colour=VIOLET, width=2.6)
    ax.curve(lambda c: c * 1.900, colour="var(--dim)", width=1.6, dash=True,
             xa=1050, xb=1680)
    ax.point(1500, 2600, colour=VIOLET, r=4.4)
    ax.label(2050, 2720, "expected loss", cls="sm bold", fill=VIOLET)
    ax.label(1500, 2850, "chain ladder", cls="sm dim", anchor="start", dx=6)
    f.text(BCX, ax.y1 + 30, "reported losses to date", cls="sm dim")
    f.text(BCX, ax.y1 + 56, "the estimate does not move when the data does",
           cls="sm dim")
    f.text(BCX, ax.y1 + 74, "— the right answer only when the data is useless",
           cls="sm dim")
    return f


@figure("Bornhuetter-Ferguson Method", "Reported losses taken at face value with "
        "only the unreported portion estimated from the a priori", width=WID)
def bornhuetter_ferguson_method() -> Fig:
    f = vcard("Trust what emerged, estimate only what has not",
              ["U = C + (1 − 1/CDF) × U₀",
               "1,500 + 0.474 × 2,600 = 2,732"])

    x0, x1 = 46, 314
    f.text(BCX, 116, "AY 2024, CDF = 1.900 ⇒ 52.6% reported", cls="sm dim")
    f.rect(x0, 142, (x1 - x0) * 1500 / 2732, 36, rx=4, fill=BLUE,
           fill_opacity="0.42", stroke=BLUE, stroke_width="1.2")
    f.text(x0 + (x1 - x0) * 750 / 2732, 165, "reported 1,500", cls="sm")
    f.rect(x0 + (x1 - x0) * 1500 / 2732, 142, (x1 - x0) * 1232 / 2732, 36, rx=4,
           fill=VIOLET, fill_opacity="0.34", stroke=VIOLET, stroke_width="1.2")
    f.text(x0 + (x1 - x0) * 2116 / 2732, 165, "IBNR 1,232", cls="sm")
    f.text(x0 + (x1 - x0) * 2116 / 2732, 200, "0.474 × 2,600", cls="sm dim")

    f.text(BCX, 246, "it is a credibility blend in disguise", cls="sm dim")
    _hbar(f, 286, [(0.474, "a priori 2,600", VIOLET),
                   (0.526, "chain ladder 2,850", BLUE)], x0=46, x1=314,
          height=30)
    f.text(BCX, 320, "Z = 1 / CDF = 0.526", cls="sm dim")
    f.text(BCX, 358, "a reporting anomaly moves BF dollar for dollar",
           cls="sm dim")
    f.text(BCX, 376, "and the chain ladder by CDF times as much", cls="sm dim")
    return f


@figure("Cape Cod Method", "The a priori loss ratio derived from the triangle's own "
        "used-up premium", width=WID)
def cape_cod_method() -> Fig:
    f = vcard("Bornhuetter-Ferguson with the ELR taken from the data",
              ["ELR = Σ C_i / Σ (EP_i / CDF_i)",
               "9,524 / 14,387 = 66.2%"])

    f.text(BCX, 110, "used-up premium: EP ÷ CDF ($000)", cls="sm dim")
    rows = list(zip(AYS, EP, list(reversed(CDF)), [1882, 2029, 2088, 2025, 1500]))
    for i, (ay, ep, cdf, c) in enumerate(rows):
        y = 140 + i * 30
        f.text(52, y, ay, cls="sm dim", anchor="start")
        f.text(140, y, f"{ep:,}", cls="sm", anchor="end")
        f.text(206, y, f"÷ {cdf:.3f}", cls="sm dim", anchor="end")
        f.text(272, y, f"{ep / cdf:,.0f}", cls="sm", anchor="end")
        f.text(312, y, f"{c:,}", cls="sm dim", anchor="end")
    f.line(46, 300, 314, 300, cls="rule")
    f.text(272, 322, "14,387", cls="sm bold", anchor="end")
    f.text(312, 322, "9,524", cls="sm bold", anchor="end")
    f.text(BCX, 356, "an ELR that reflects this book's own rate level",
           cls="sm dim")
    f.text(BCX, 374, "and mix — no external assumption to go stale",
           cls="sm dim")
    return f


@figure("Benktander Method", "The four ultimates for one accident year, with "
        "Benktander sitting between BF and the chain ladder", width=WID)
def benktander_method() -> Fig:
    f = vcard("Bornhuetter-Ferguson, run a second time",
              ["U_GB = C + (1 − 1/CDF) × U_BF",
               "1,500 + 0.474 × 2,732 = 2,794"])

    ax = vaxes(f, 2500, 2920, 0, 4.4, left=44, right=24, top=42, bottom=70)
    ax.frame(xticks=[2600, 2700, 2800, 2900], xfmt=lambda t: f"{t:,.0f}",
             yticks=[], grid=True)
    rows = [("expected loss", U_EL, VIOLET), ("Bornhuetter-Ferguson", U_BF, TEAL),
            ("Benktander", U_GB, GREEN), ("chain ladder", U_CL, BLUE)]
    for i, (name, value, colour) in enumerate(rows):
        y = 3.6 - i * 0.95
        px_, py_ = ax.p(value, y)
        f.circle(px_, py_, 5, fill=colour)
        f.line(ax.x0, py_, px_, py_, cls="thin", stroke=colour,
               stroke_width="1.4")
        f.text(px_ + 9, py_ + 4, f"{value:,.0f}", cls="sm bold", fill=colour,
               anchor="start")
        f.text(ax.x0 + 4, py_ - 9, name, cls="sm dim", anchor="start")
    f.text(BCX, ax.y1 + 30, "AY 2024 ultimate ($000)", cls="sm dim")
    f.text(BCX, BY1 - 16, "each iteration leans a little further on the",
           cls="sm dim")
    f.text(BCX, BY1 + 2, "data; iterate forever and you reach chain ladder",
           cls="sm dim")
    return f


@figure("Frequency-Severity Method", "Ultimate counts and ultimate severity "
        "projected separately, then multiplied", width=WID)
def frequency_severity_method() -> Fig:
    f = vcard("Project counts and severity, then multiply",
              ["U = N_ult × S_ult",
               "1,000 × 2,850 = 2,850,000"])

    y = 176
    f.chip(94, y, "1,000", colour=BLUE, w=110, h=44, cls="ttl")
    f.text(94, y - 34, "ultimate counts", cls="sm dim")
    f.text(94, y + 42, "700 × 1.429", cls="sm dim")
    f.text(BCX, y + 6, "×", cls="ttl")
    f.chip(266, y, "$2,850", colour=AMBER, w=110, h=44, cls="ttl")
    f.text(266, y - 34, "ultimate severity", cls="sm dim")
    f.text(266, y + 42, "trended 4.6%/yr", cls="sm dim")
    f.arrow(BCX, y + 62, BCX, 274, colour="var(--dim)", width=1.4)
    f.chip(BCX, 296, "$2,850,000 ultimate", colour=GREEN, w=200, h=40, cls="ttl")
    f.text(BCX, 350, "counts develop faster and more stably than", cls="sm dim")
    f.text(BCX, 368, "dollars, and severity carries the inflation", cls="sm dim")
    return f


@figure("Berquist-Sherman Method", "Historical case reserves restated onto the "
        "latest year's adequacy before factors are selected", width=WID)
def berquist_sherman_method() -> Fig:
    f = vcard("Restate the triangle onto today's practice",
              ["Adj Case = Case(latest, n) × (1 + t)^−k",
               "Adj Reported = Paid + Adj Case"])

    ax = vaxes(f, -0.4, 4.4, 0, 1500, left=56, right=22, top=40, bottom=74)
    ax.frame(xticks=[0, 1, 2, 3, 4], xfmt=lambda t: AYS[int(t)],
             yticks=[0, 700, 1400], yfmt=lambda t: f"{t:,.0f}", grid=True)
    actual = [620, 660, 720, 900, 1180]
    restated = [880, 940, 1010, 1090, 1180]
    bw = (ax.px(1) - ax.px(0)) * 0.34
    for k in range(5):
        x = ax.px(k)
        f.rect(x - bw - 1, ax.py(actual[k]), bw, ax.y1 - ax.py(actual[k]), rx=2,
               fill="var(--dim)", fill_opacity="0.45")
        f.rect(x + 1, ax.py(restated[k]), bw, ax.y1 - ax.py(restated[k]), rx=2,
               fill=BLUE, fill_opacity="0.72")
    f.legend_row(120, 100, [("var(--dim)", "as reported"), (BLUE, "restated")],
                 gap=112)
    f.text(BCX, ax.y1 + 30, "average case outstanding at 12 months", cls="sm dim")
    f.text(BCX, BY1 - 16, "case adequacy strengthened, so old years are",
           cls="sm dim")
    f.text(BCX, BY1 + 2, "raised to it — then factors are reselected",
           cls="sm dim")
    return f


@figure("IBNR", "IBNR split into claims not yet reported and further development on "
        "claims already known", width=WID)
def ibnr() -> Fig:
    f = vcard("Two different things under one name",
              ["IBNR = Ultimate − Reported",
               "IBNR = Pure IBNR + IBNER"])

    f.text(BCX, 116, "AY 2024 IBNR of 1,350 ($000)", cls="sm dim")
    _hbar(f, 156, [(780, "pure IBNR 780", VIOLET), (570, "IBNER 570", ROSE)],
          x0=44, x1=316, height=36)
    rows = [("Pure IBNR", "claims that have happened but", VIOLET,
             "have not been reported at all"),
            ("IBNER", "development on the claims", ROSE,
             "already in the case reserves")]
    for i, (name, line1, colour, line2) in enumerate(rows):
        y = 220 + i * 78
        f.rect(48, y - 9, 11, 11, rx=2, fill=colour, fill_opacity="0.8")
        f.text(66, y + 1, name, cls="sm bold", anchor="start")
        f.text(66, y + 20, line1, cls="sm dim", anchor="start")
        f.text(66, y + 37, line2, cls="sm dim", anchor="start")
    f.text(BCX, BY1 - 2, "a triangle estimates the sum; only claim data "
           "splits it", cls="sm dim")
    return f


@figure("Ultimate Loss", "Four methods' ultimates for one accident year and the "
        "figure selected from them", width=WID)
def ultimate_loss() -> Fig:
    f = vcard("The number every method is trying to estimate",
              ["U = Paid + Case Reserves + IBNR",
               "U = Reported + IBNR"])

    f.text(BCX, 112, "AY 2024 at 12 months ($000)", cls="sm dim")
    rows = [("Expected loss", U_EL, VIOLET), ("Bornhuetter-Ferguson", U_BF, TEAL),
            ("Benktander", U_GB, GREEN), ("Chain ladder", U_CL, BLUE),
            ("Selected", 2780, AMBER)]
    x0, base, scale = 176, 2550, 0.45
    for i, (name, value, colour) in enumerate(rows):
        y = 146 + i * 38
        sel = i == 4
        f.text(168, y + 4, name, cls="sm bold" if sel else "sm", anchor="end")
        f.rect(x0, y - 10, (value - base) * scale, 22, rx=3, fill=colour,
               fill_opacity="0.8" if sel else "0.6")
        f.text(x0 + (value - base) * scale + 7, y + 4, f"{value:,.0f}",
               cls="sm bold" if sel else "sm", anchor="start")
    f.line(x0, 128, x0, 330, cls="rule")
    f.text(x0, 346, "2,550", cls="sm dim")
    f.text(BCX, 374, "the selection is a judgment about which method",
           cls="sm dim")
    f.text(BCX, 390, "the data supports — and it has to be documented",
           cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Estimating claim liabilities — operational changes
# ═══════════════════════════════════════════════════════════════════════════

@figure("Claims Coding Changes", "A recoding moving claim volume between segments "
        "without changing the total", width=WID)
def claims_coding_changes() -> Fig:
    f = vcard("Volume moves between cells; nothing costs more",
              "Apparent = True + Reclassification")

    for k, (title, split, y0) in enumerate((("before", (0.62, 0.38), 146),
                                            ("after", (0.44, 0.56), 250))):
        f.text(46, y0 - 12, title, cls="sm bold", anchor="start")
        _hbar(f, y0 + 16, [(split[0], "coverage A", BLUE),
                           (split[1], "coverage B", AMBER)],
              x0=46, x1=314, height=32)
    f.arrow(BCX, 198, BCX, 232, colour=ROSE, width=1.6)
    f.text(BCX + 8, 220, "recoded", cls="sm bold", fill=ROSE, anchor="start")
    f.text(BCX, 322, "coverage B's triangle now shows a jump in", cls="sm dim")
    f.text(BCX, 340, "counts that never happened — and A a drop", cls="sm dim")
    f.text(BCX, 372, "the total is unchanged, so only the segments lie",
           cls="sm dim")
    return f


@figure("Claims Processing Changes", "A faster settlement pattern distorting the "
        "paid development it is measured with", width=WID)
def claims_processing_changes() -> Fig:
    f = vcard("A change of timing looks like a change of cost",
              ["Disposal Rate = closed ÷ ultimate counts",
               "Avg Case O/S = case reserves / open claims"])

    ax = vaxes(f, 0, 60, 0, 1.05, left=52, right=22, top=34, bottom=66)
    ax.frame(xticks=[12, 24, 36, 48, 60], yticks=[0, 0.5, 1.0],
             yfmt=lambda t: f"{t:.0%}", grid=True)
    old = [(12, 0.36), (24, 0.62), (36, 0.80), (48, 0.92), (60, 0.98)]
    new = [(12, 0.52), (24, 0.76), (36, 0.89), (48, 0.96), (60, 0.99)]
    ax.polyline(old, colour="var(--dim)", width=1.8, dash=True)
    _emergence(ax, new, ROSE)
    ax.label(30, 0.52, "before", cls="sm dim", dy=12)
    ax.label(26, 0.80, "after", cls="sm bold", fill=ROSE, dy=-8)
    f.text(BCX, ax.y1 + 32, "disposal rate by age in months", cls="sm dim")
    f.text(BCX, BY1 - 16, "closing sooner raises paid losses at every age,",
           cls="sm dim")
    f.text(BCX, BY1 + 2, "so paid factors fall and the method under-reserves",
           cls="sm dim")
    return f


@figure("Underwriting Changes", "A shift in risk selection moving the aggregate loss "
        "ratio while no segment's own ratio moves", width=WID)
def underwriting_changes() -> Fig:
    f = vcard("The same segments, a different book",
              "Aggregate LR = Σ wᵢ × LRᵢ")

    segs = [("Preferred", 0.55), ("Standard", 0.70), ("Non-standard", 0.88)]
    mixes = [("2022", [0.50, 0.35, 0.15]), ("2024", [0.25, 0.35, 0.40])]
    colours = [GREEN, BLUE, ROSE]
    for k, (year, weights) in enumerate(mixes):
        y = 146 + k * 96
        f.text(46, y - 12, year, cls="sm bold", anchor="start")
        parts = [(w, f"{w:.0%}", colours[j]) for j, w in enumerate(weights)]
        _hbar(f, y + 16, parts, x0=46, x1=314, height=30)
        lr = sum(w * s[1] for w, s in zip(weights, segs))
        f.text(BCX, y + 54, f"aggregate loss ratio {lr:.1%}",
               cls="sm bold" if k else "sm dim")
    f.legend_row(46, 330, [(GREEN, "pref 55%"), (BLUE, "std 70%")], gap=112)
    f.legend_row(46, 350, [(ROSE, "non-standard 88%")], gap=112)
    f.text(BCX, 380, "no segment changed — only their weights did",
           cls="sm dim")
    return f


@figure("Policy Provision Changes", "One loss shared differently after a deductible "
        "and limit change", width=WID)
def policy_provision_changes() -> Fig:
    f = vcard("The same loss, split on different terms",
              ["Adjusted Loss = Σ [min(X, L_new)",
               "− min(X, d_new)]"])

    f.text(BCX, 116, "a $1,200k ground-up loss ($000)", cls="sm dim")
    for k, (title, d, L, y) in enumerate((("old: 100 xs 0, limit 1,000", 0, 1000,
                                           158),
                                          ("new: deductible 250, limit 750", 250,
                                           750, 254))):
        f.text(46, y - 14, title, cls="sm", anchor="start")
        x0, x1, loss = 46, 314, 1200
        scale = (x1 - x0) / loss
        f.rect(x0, y, loss * scale, 32, rx=4, fill="var(--soft)",
               stroke="var(--edge)", stroke_width="1.1")
        f.rect(x0, y, d * scale, 32, rx=4, fill=AMBER, fill_opacity="0.6")
        covered = min(loss, d + L) - d
        f.rect(x0 + d * scale, y, covered * scale, 32, rx=4, fill=BLUE,
               fill_opacity="0.55")
        if loss > d + L:
            f.rect(x0 + (d + L) * scale, y, (loss - d - L) * scale, 32, rx=4,
                   fill=ROSE, fill_opacity="0.55")
        f.text(x0 + d * scale + covered * scale / 2, y + 21, f"{covered:,}",
               cls="sm")
    f.legend_row(46, 322, [(AMBER, "insured keeps"), (BLUE, "insurer pays")],
                 gap=140)
    f.legend_row(46, 342, [(ROSE, "above the limit")], gap=140)
    f.text(BCX, 374, "the loss did not change — the triangle did", cls="sm dim")
    return f


@figure("Case Adequacy", "Average case outstanding strengthening along the calendar "
        "diagonal", width=WID)
def case_adequacy() -> Fig:
    f = vcard("A stronger case reserve looks like a bigger loss",
              ["Avg Case O/S = case reserves / open claims",
               "Adequacy = case reserve / eventual cost"])

    ax = vaxes(f, -0.4, 4.4, 0, 1400, left=56, right=22, top=42, bottom=76)
    ax.frame(xticks=[0, 1, 2, 3, 4], xfmt=lambda t: AYS[int(t)],
             yticks=[0, 700, 1400], yfmt=lambda t: f"{t:,.0f}", grid=True)
    labels = []
    for age, series, colour in (("at 12 months", [620, 660, 720, 900, 1180], BLUE),
                                ("at 24 months", [880, 940, 1010, 1240, None],
                                 AMBER)):
        pts = [(k, v) for k, v in enumerate(series) if v is not None]
        ax.polyline(pts, colour=colour, width=2.2)
        for x, y in pts:
            ax.point(x, y, colour=colour, r=3.2)
        labels.append((colour, age))
    f.legend_row(120, 106, labels, gap=104)
    f.text(BCX, ax.y1 + 30, "average case outstanding by accident year",
           cls="sm dim")
    f.text(BCX, BY1 - 16, "both ages jump together in 2023 — a calendar",
           cls="sm dim")
    f.text(BCX, BY1 + 2, "effect, so reported factors must be restated",
           cls="sm dim")
    return f


@figure("Settlement Rate", "A shifting disposal rate distorting paid development",
        width=WID)
def settlement_rate() -> Fig:
    f = vcard("How much of the year is closed, by age",
              "Disposal Rate = closed ÷ ultimate counts")

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
    f = vcard("The average moves when only the weights do",
              "Aggregate LR = Σ wᵢ × LRᵢ")

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
    f = vcard("Premium from different years is not comparable",
              ["OLF = current index / index in force",
               "1.278 / 1.000 = 1.278 for 2020"])

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
    f = vcard("Paid in full, then billed back",
              ["Recovery = min(X, d) per occurrence",
               "Net Loss = Gross Paid − Collected Recoveries"])

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
    f = vcard("Two recoveries that arrive after the payment",
              "Net Ultimate = Gross Ultimate − S&S")

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
    f = vcard("An asset, not a smaller liability",
              ["Net Unpaid = Gross Unpaid − Ceded Unpaid",
               "Ceded Ultimate = Ceded Reported × CDF_ceded"])

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
    f = vcard("Before any cession or recovery",
              ["Gross = Net + Ceded + Other Recoveries",
               "Gross Ultimate = Gross Reported × CDF_gross"])

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
    f = vcard("The reinsurer's share, claim by claim",
              ["Ceded_QS = c × Gross",
               "Ceded_XOL = min(max(X − R, 0), L)"])

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
    f = vcard("What is left after every recovery",
              ["Net = Gross − Ceded − S&S − Deductibles",
               "2,850 − 640 − 250 − 350 = 1,610"])

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
    f = vcard("Overhead that belongs to no single claim",
              ["Ratio = CY Paid ULAE / CY Paid Loss",
               "Reserve = R × (0.5 × Case + 1.0 × IBNR)"])

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
    f = vcard("Is the carried number enough?",
              ["Redundancy = Carried − Indicated",
               "2,180 − 2,250 = (70) deficient"])

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
    f = vcard("Which half of the loss cost moved?",
              ["Pure Premium = Frequency × Severity",
               "+4.6% severity, −1.2% frequency ⇒ +3.3%"])

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
    f = vcard("Did the year emerge the way it was meant to?",
              ["Expected = U_prior × Δ(1 / CDF)",
               "A/E = Actual emergence / Expected emergence"])

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
    f = vcard("Where the reserve balance actually went",
              ["R_end = R_begin + New AY − Paid ± PY dev",
               "5,200 + 2,850 − 2,400 + 180 = 5,830"])

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
    f = vcard("The number, its basis, and how it moved",
              "ΔReserve = New AY − Payments ± PY dev")

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
    f = vcard("Same substance, four depths",
              "one estimate, one basis, four depths")

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
    f = vcard("Schedule P, the opinion, and the report behind it",
              "Opinion: Low ≤ Carried Reserve ≤ High")

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
    f = vcard("Borrow a pattern when your own is too thin",
              ["Selected = Z × own + (1 − Z) × industry",
               "0.30 × 1.62 + 0.70 × 1.48 = 1.52"])

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
