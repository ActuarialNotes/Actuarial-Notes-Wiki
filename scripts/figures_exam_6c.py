"""Figures for the Exam 6C (CAS) concept pages — Canadian regulation, government
programs, financial reporting and solvency.

Same contract as `figures_exam_p.py` / `figures_exam_fm.py` /
`figures_exam_mas_i.py` / `figures_exam_mas_ii.py` / `figures_exam_5.py`: each
builder returns a `Fig` from `vcard()` — a portrait card carrying a title, one
picture and one formula. Grouped in syllabus order:

A. Regulation of insurance and Canadian insurance law — who regulates what,
   rate and classification regulation, the compulsory auto product, the case law
B. Canadian government and industry insurance programs — the residual market,
   the social insurance schemes, the guaranty fund
C. Financial reporting, solvency and professional responsibility — the annual
   return, IFRS 17, reinsurance, the MCT, and the Appointed Actuary's duties

6C is a qualitative exam, so most of these figures are *structures* rather than
plots — a jurisdictional split, a waterfall, a ladder of thresholds, a decision
tree. Where a number teaches more than a shape, three running examples hold the
families together, as on the other exams.

*The running insurer* carries every solvency figure: capital available $248M
against insurance, market, credit and operational risk margins of $92M, $54M,
$21M and $17M less a $26M diversification credit — capital required $158M, a
base solvency buffer of $237M, and an MCT ratio of 104.6%. It clears the 100%
minimum and sits far below the 150% supervisory target, so the same company is
the one being escalated, stress-tested and recapitalised across the figures.

The same company's statements carry the reporting figures: $1,240M of assets
against $980M of liabilities, so equity is $260M and — after deducting $12M of
intangibles — capital available is the $248M above. Its insurance service result
is $38M, its net financial result $22M and other expenses $6M, so net income is
$39M after 27% tax, and other comprehensive income of −$14M leaves comprehensive
income at $25M.

*The running PAA book* carries the IFRS 17 measurement figures that a Canadian
P&C insurer actually meets: annual policies written 1 July for $24M of premium
with $4.8M of acquisition cash flows, so at 31 December the LRC is $9.6M against
fulfilment cash flows of $11.5M — an onerous group with a $1.9M loss component.

*The running GMM group* carries the general-model figures: $60M of premium,
$44M of PV outflows and a $5M risk adjustment, so the CSM opens at $11M and is
released over coverage units of 40% / 35% / 25%.

The figures are generated — edit the builder, not the SVG. See
`docs/concept-figures.md`.
"""

from __future__ import annotations

import math

from figure_kit import (
    AMBER, BLUE, GREEN, ROSE, TEAL, VIOLET,
    Fig, brace, vaxes, vcard, BCX,
    building, car, coins, cross, document, house, person, scales, shield, tower,
)
from figure_registry import figure

WID = 340   # the |NNN| every portrait embed asks for


# ── the running insurer (solvency, $M) ───────────────────────────────────────
CAP_AVAIL = 248.0
M_INS, M_MKT, M_CRD, M_OPS, DIVERS = 92.0, 54.0, 21.0, 17.0, 26.0
CAP_REQ = M_INS + M_MKT + M_CRD + M_OPS - DIVERS      # 158
BSB = 1.5 * CAP_REQ                                    # 237
MCT_RATIO = CAP_AVAIL / BSB                            # 104.6%
MIN_RATIO, SUP_TARGET, INT_TARGET = 1.00, 1.50, 1.85

# ── the running insurer's statements ($M) ────────────────────────────────────
ASSETS, LIABS = 1240.0, 980.0
EQUITY = ASSETS - LIABS                                # 260
INTANGIBLES = EQUITY - CAP_AVAIL                       # 12 — the MCT deduction
ICL = 640.0                                            # insurance contract liabilities
LRC_CO, LIC_CO = 190.0, 450.0                          # its two halves
LIC_FCF, LIC_RA = 420.0, 30.0                          # and the LIC's own two
REVENUE, SVC_EXP, NET_REINS = 420.0, 370.0, 12.0
ISR = REVENUE - SVC_EXP - NET_REINS                    # 38
NET_FIN, OTHER, TAX = 22.0, -6.0, 0.27
NET_INCOME = (ISR + NET_FIN + OTHER) * (1 - TAX)       # 39.4
OCI = -14.0
COMP_INCOME = NET_INCOME + OCI                         # 25.4

# ── the running PAA book (IFRS 17, $M) ───────────────────────────────────────
PAA_PREM, PAA_ACQ = 24.0, 4.8
PAA_LRC = (PAA_PREM - PAA_PREM / 2) - (PAA_ACQ - PAA_ACQ / 2)   # 9.6
PAA_FCF = 11.5
PAA_LOSS = PAA_FCF - PAA_LRC                                     # 1.9

# ── the running GMM group (IFRS 17, $M) ──────────────────────────────────────
GMM_PREM, GMM_OUT, GMM_RA = 60.0, 44.0, 5.0
CSM0 = GMM_PREM - GMM_OUT - GMM_RA                               # 11
CU = [0.40, 0.35, 0.25]


# ── shared drawing helpers ───────────────────────────────────────────────────
def _stack(f: Fig, y0, rows, x0=44, x1=316, h=40, gap=10, cls="sm",
           arrows=True, sub_cls="sm dim"):
    """A vertical stack of labelled boxes, top to bottom, optionally chained.

    `rows` is a list of (label, sub, colour); `sub` may be None. Returns the
    list of box centre y-positions.
    """
    ys = []
    for i, (label, sub, colour) in enumerate(rows):
        y = y0 + i * (h + gap)
        f.rect(x0, y, x1 - x0, h, rx=6, fill=colour, fill_opacity="0.16",
               stroke=colour, stroke_width="1.3")
        if sub:
            f.text((x0 + x1) / 2, y + h / 2 - 3, label, cls=cls)
            f.text((x0 + x1) / 2, y + h / 2 + 12, sub, cls=sub_cls)
        else:
            f.text((x0 + x1) / 2, y + h / 2 + 4, label, cls=cls)
        if arrows and i:
            f.arrow((x0 + x1) / 2, y - gap - 1, (x0 + x1) / 2, y - 1,
                    colour="var(--dim)", width=1.3)
        ys.append(y + h / 2)
    return ys


def _columns(f: Fig, y0, heads, rows, x0=30, x1=330, gap=14, row_h=24,
             head_h=28, colours=(BLUE, AMBER)):
    """Two (or three) labelled columns of short lines — the workhorse for a
    "this side / that side" split. `rows` is a list of per-column string lists.
    """
    n = len(heads)
    w = (x1 - x0 - gap * (n - 1)) / n
    for k, head in enumerate(heads):
        cx = x0 + k * (w + gap) + w / 2
        colour = colours[k % len(colours)]
        depth = head_h + 10 + row_h * len(rows[k])
        f.rect(x0 + k * (w + gap), y0, w, depth, rx=7, fill=colour,
               fill_opacity="0.08", stroke=colour, stroke_width="1.2")
        f.rect(x0 + k * (w + gap), y0, w, head_h, rx=7, fill=colour,
               fill_opacity="0.22", stroke="none")
        f.text(cx, y0 + head_h / 2 + 4, head, cls="sm bold", fill=colour)
        for i, line in enumerate(rows[k]):
            if line:
                f.text(cx, y0 + head_h + 20 + i * row_h, line, cls="sm")
    return w


def _ladder(f: Fig, x, y_bottom, y_top, lo, hi, marks, at=None, label_x=None,
            width=26, fill=BLUE):
    """A vertical ratio thermometer with labelled thresholds.

    `marks` is a list of (value, label, colour); `at` fills the bar to a value.
    """
    def py(v):
        return y_bottom - (v - lo) / (hi - lo) * (y_bottom - y_top)

    f.rect(x - width / 2, y_top, width, y_bottom - y_top, rx=4,
           fill="var(--soft)", stroke="var(--edge)", stroke_width="1.1")
    if at is not None:
        f.rect(x - width / 2, py(at), width, y_bottom - py(at), rx=4,
               fill=fill, fill_opacity="0.42")
    lx = label_x if label_x is not None else x + width / 2 + 10
    for value, label, colour in marks:
        y = py(value)
        f.line(x - width / 2 - 8, y, x + width / 2 + 6, y, cls="thin dash",
               stroke=colour, stroke_width="1.4")
        f.text(lx, y + 4, label, cls="sm", fill=colour, anchor="start")
    return py


def _waterfall(f: Fig, y_base, items, x0=40, x1=322, scale=None, top=132,
               bar_frac=0.68, fmt=None, label_cls="sm dim"):
    """A running-total waterfall. `items` is a list of (label, delta, colour);
    a delta of None draws the running total as a full column.
    """
    running, cols = 0.0, []
    peak = 0.0
    for _, delta, _ in items:
        if delta is not None:
            running += delta
            peak = max(peak, abs(running))
    scale = scale or (top / (peak or 1))
    n = len(items)
    slot = (x1 - x0) / n
    bw = slot * bar_frac
    running = 0.0
    for i, (label, delta, colour) in enumerate(items):
        cx = x0 + slot * (i + 0.5)
        if delta is None:
            h = running * scale
            f.rect(cx - bw / 2, y_base - h, bw, h, rx=3, fill=colour,
                   fill_opacity="0.72")
            value = running
        else:
            y_from = y_base - running * scale
            running += delta
            y_to = y_base - running * scale
            f.rect(cx - bw / 2, min(y_from, y_to), bw, abs(y_to - y_from), rx=3,
                   fill=colour, fill_opacity="0.72")
            value = delta
        f.text(cx, y_base - max(running, running - (delta or 0)) * scale - 8,
               (fmt(value) if fmt else f"{value:,.0f}"), cls="sm")
        f.text(cx, y_base + 15, label, cls=label_cls)
        cols.append(cx)
    f.line(x0 - 6, y_base, x1 + 6, y_base, cls="axis")
    return cols


def _hbar(f: Fig, y, parts, x0=40, x1=320, height=30, label_cls="sm",
          opacity="0.30"):
    """A horizontal stacked bar. `parts` is a list of (share, label, colour)."""
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
           fmt=None, bar_frac=0.58, height=132, value_cls="sm",
           label_cls="sm dim", colours=None):
    """A simple column chart drawn straight onto the card."""
    top = top or max(values)
    n = len(values)
    slot = (x1 - x0) / n
    bw = slot * bar_frac
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


def _flow(f: Fig, y, labels, colours=None, x0=30, x1=330, h=26, cls="sm"):
    """A left-to-right chain of chips joined by arrows."""
    n = len(labels)
    slot = (x1 - x0) / n
    centres = []
    for i, label in enumerate(labels):
        cx = x0 + slot * (i + 0.5)
        colour = (colours or [BLUE] * n)[i]
        f.chip(cx, y, label, colour=colour, w=slot - 12, h=h, cls=cls)
        centres.append(cx)
        if i:
            f.arrow(centres[i - 1] + (slot - 12) / 2 + 1, y,
                    cx - (slot - 12) / 2 - 1, y, colour="var(--dim)", width=1.3)
    return centres


def _bullets(f: Fig, y0, lines, x=40, gap=24, colour=BLUE, cls="sm",
             marker="•"):
    """A left-aligned list with coloured markers. Returns the last y used."""
    y = y0
    for line in lines:
        f.text(x, y, marker, cls="sm", fill=colour, anchor="start")
        f.text(x + 16, y, line, cls=cls, anchor="start")
        y += gap
    return y - gap


def _pill_row(f: Fig, y, labels, colours, x0=32, x1=328, h=24, cls="sm"):
    """A row of pills sharing one line, no arrows."""
    n = len(labels)
    slot = (x1 - x0) / n
    centres = []
    for i, label in enumerate(labels):
        cx = x0 + slot * (i + 0.5)
        f.chip(cx, y, label, colour=colours[i % len(colours)], w=slot - 8, h=h,
               cls=cls)
        centres.append(cx)
    return centres


# ═══════════════════════════════════════════════════════════════════════════
# A. Regulation of insurance and Canadian insurance law
# ═══════════════════════════════════════════════════════════════════════════

@figure("Insurance Legislation", "Four documents stacked by force: a statute and a "
        "regulation above a dashed line under the scales of law, a guideline and a "
        "bulletin below it under the regulator's expectation", width=WID)
def insurance_legislation() -> Fig:
    f = vcard()

    # binding law above the line, supervisory expectation below it
    f.rect(30, 80, 300, 142, rx=10, fill=BLUE, fill_opacity="0.07")
    f.rect(30, 234, 300, 146, rx=10, fill=AMBER, fill_opacity="0.07")
    f.line(30, 228, 330, 228, cls="thin dash", stroke=ROSE, stroke_width="1.6")
    layers = [(120, 52, BLUE, "statute"), (192, 44, TEAL, "regulation"),
              (272, 40, AMBER, "guideline"), (340, 36, VIOLET, "bulletin")]
    for i, (y, s, colour, name) in enumerate(layers):
        document(f, 92, y, s, colour)
        f.text(126, y + 4, name, cls="sm bold", anchor="start")
        if i:
            above_y, above_s = layers[i - 1][:2]
            f.arrow(92, above_y + above_s / 2 + 4, 92, y - s / 2 - 5,
                    colour="var(--dim)", width=1.3)
    scales(f, 272, 152, 66, BLUE)
    f.text(272, 206, "law", cls="bold")
    building(f, 272, 298, 58, AMBER)
    f.text(272, 350, "expectation", cls="bold")
    return f


@figure("Insurance Regulation", "One insurer between two regulators: OSFI's arrow "
        "reaches it for solvency, the provinces' arrow for conduct", width=WID)
def insurance_regulation() -> Fig:
    f = vcard()

    building(f, 84, 132, 64, BLUE)
    f.text(84, 184, "OSFI", cls="bold")
    for x in (238, 276, 314):
        building(f, x, 138, 36, AMBER)
    f.text(276, 184, "provinces", cls="bold")
    tower(f, BCX, 296, 88, VIOLET)
    f.text(BCX, 360, "insurer", cls="bold")
    f.arrow(96, 198, 150, 266, colour=BLUE, width=2)
    f.text(112, 244, "solvency", cls="sm", anchor="end")
    f.arrow(264, 198, 210, 266, colour=AMBER, width=2)
    f.text(248, 244, "conduct", cls="sm", anchor="start")
    return f


@figure("Federal-Provincial Jurisdiction", "A dashed line splits the country: on the "
        "federal side Parliament governs the insurer under s. 91, on the provincial "
        "side the provinces govern the policy it writes under s. 92(13)", width=WID)
def federal_provincial_jurisdiction() -> Fig:
    f = vcard()

    f.line(BCX, 80, BCX, 380, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.3")
    building(f, 96, 132, 64, BLUE)
    f.text(96, 184, "Parliament", cls="bold")
    f.arrow(96, 196, 96, 250, colour=BLUE, width=2)
    f.text(104, 228, "s. 91", cls="sm", anchor="start")
    tower(f, 96, 296, 76, BLUE)
    f.text(96, 356, "insurer", cls="bold")

    for x in (226, 264, 302):
        building(f, x, 138, 36, AMBER)
    f.text(264, 184, "provinces", cls="bold")
    f.arrow(264, 196, 264, 256, colour=AMBER, width=2)
    f.text(272, 228, "s. 92(13)", cls="sm", anchor="start")
    document(f, 264, 298, 58, AMBER)
    f.text(264, 356, "policy", cls="bold")
    f.arrow(122, 298, 236, 298, colour="var(--dim)", width=1.4, dash=True)
    return f


@figure("OSFI", "OSFI above a staircase of five intervention stages, from stage 0, "
        "normal supervision, up to stage 4, non-viability", width=WID)
def osfi() -> Fig:
    f = vcard()

    base, step_w = 374, 56
    colours = [GREEN, TEAL, AMBER, ROSE, VIOLET]
    tops = []
    for i, colour in enumerate(colours):
        x, top = 40 + i * step_w, 334 - i * 46
        f.rect(x, top, step_w, base - top, rx=4, fill=colour, fill_opacity="0.22",
               stroke=colour, stroke_width="1.3")
        f.text(x + step_w / 2, top + 24, str(i), cls="bold")
        tops.append((x + step_w / 2, top))
    f.text(tops[0][0], tops[0][1] - 10, "normal", cls="sm")
    f.text(tops[4][0], tops[4][1] - 10, "non-viable", cls="sm")
    building(f, 92, 132, 64, BLUE)
    f.text(92, 184, "OSFI", cls="bold")
    return f


@figure("Superintendent of Insurance", "The provincial superintendent licensing "
        "insurers and agents and approving rates, beside OSFI holding only the "
        "capital", width=WID)
def superintendent_of_insurance() -> Fig:
    f = vcard()

    building(f, 122, 128, 66, AMBER)
    f.text(122, 180, "superintendent", cls="bold")
    targets = [(52, "insurer"), (122, "agent"), (192, "rates")]
    for x, name in targets:
        f.arrow(122 + (x - 122) * 0.25, 194, x, 262, colour=AMBER, width=1.6)
        f.text(x, 352, name, cls="sm bold")
    tower(f, 52, 302, 62, VIOLET)
    person(f, 122, 304, 54, TEAL)
    document(f, 192, 302, 50, AMBER)

    f.line(238, 90, 238, 370, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.3")
    building(f, 290, 128, 54, BLUE)
    f.text(290, 176, "OSFI", cls="bold")
    f.arrow(290, 190, 290, 266, colour=BLUE, width=1.6)
    coins(f, 290, 332, 6, 16, BLUE)
    f.text(290, 352, "capital", cls="sm bold")
    return f


@figure("Financial Services Regulatory Authority of Ontario",
        "An Ontario auto rate on a timeline: filed, sent up to FSRA for a review "
        "that takes months, approved, and only then used on the car", width=WID)
def fsra() -> Fig:
    f = vcard()

    y = 314
    f.arrow(36, y, 332, y, colour="var(--axis)", width=1.2)
    stops = [(64, "file"), (234, "approve"), (298, "use")]
    for x, name in stops:
        f.line(x, y - 4, x, y + 4, cls="tick")
        f.text(x, y + 20, name, cls="sm bold")
    document(f, 64, 268, 50, BLUE)
    document(f, 234, 268, 50, GREEN)
    car(f, 298, 290, 66, TEAL)
    building(f, 149, 142, 72, AMBER)
    f.text(149, 198, "FSRA", cls="bold")
    f.arrow(78, 236, 116, 192, colour=BLUE, width=1.6)
    f.arrow(182, 192, 220, 236, colour=GREEN, width=1.6)
    brace(f, 64, 236, y + 32, depth=8, label="months", label_cls="sm bold")
    return f


@figure("Autorité des marchés financiers", "One regulator for all of Quebec: the AMF "
        "with arrows down to insurers, securities, deposits and distribution",
        width=WID)
def amf() -> Fig:
    f = vcard()

    f.rect(24, 80, 312, 300, rx=12, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    f.text(40, 100, "Quebec", cls="sm dim", anchor="start")
    building(f, BCX, 136, 72, VIOLET)
    f.text(BCX, 192, "AMF", cls="bold")
    sectors = [(64, "insurers"), (140, "securities"), (216, "deposits"),
               (290, "distribution")]
    for x, name in sectors:
        f.arrow(BCX + (x - BCX) * 0.18, 204, x, 262, colour=VIOLET, width=1.5)
        f.text(x, 350, name, cls="sm bold")
    tower(f, 64, 298, 56, BLUE)
    document(f, 140, 298, 50, TEAL)
    coins(f, 216, 322, 5, 16, AMBER)
    person(f, 290, 300, 52, GREEN)
    return f


@figure("Canadian Council of Insurance Regulators", "The council's position reaching "
        "FSRA, the AMF, BCFSA and Alberta by dashed arrows it cannot enforce; each "
        "regulator binds its own insurers with a solid one", width=WID)
def ccir() -> Fig:
    f = vcard()

    for x in (146, 180, 214):
        person(f, x, 112, 34, VIOLET)
    f.text(180, 152, "CCIR", cls="bold")
    regulators = [(60, "FSRA"), (140, "AMF"), (220, "BCFSA"), (300, "Alberta")]
    for x, name in regulators:
        f.arrow(180 + (x - 180) * 0.2, 162, x, 196, colour=VIOLET, width=1.5,
                dash=True)
        building(f, x, 222, 46, BLUE)
        f.text(x, 264, name, cls="sm bold")
        f.arrow(x, 272, x, 302, colour=BLUE, width=1.6)
        tower(f, x, 330, 42, GREEN)
    f.text(180, 376, "insurers", cls="sm bold")
    return f


@figure("Solvency Regulation", "The running insurer's balance sheet as two "
        "columns: assets standing just taller than liabilities plus required "
        "capital", width=WID)
def solvency_regulation() -> Fig:
    f = vcard()

    base, scale = 374, 284 / ASSETS
    f.rect(46, base - ASSETS * scale, 110, ASSETS * scale, rx=6, fill=BLUE,
           fill_opacity="0.20", stroke=BLUE, stroke_width="1.3")
    f.text(101, base - ASSETS * scale / 2 + 4, "assets", cls="bold")
    liab_top = base - LIABS * scale
    f.rect(204, liab_top, 110, LIABS * scale, rx=6, fill=AMBER,
           fill_opacity="0.20", stroke=AMBER, stroke_width="1.3")
    f.text(259, liab_top + LIABS * scale / 2 + 4, "liabilities", cls="bold")
    req_top = liab_top - BSB * scale
    f.rect(204, req_top, 110, BSB * scale - 3, rx=6, fill=GREEN,
           fill_opacity="0.26", stroke=GREEN, stroke_width="1.3")
    f.text(259, req_top + BSB * scale / 2 + 3, "required capital", cls="sm bold")
    f.line(40, base - ASSETS * scale, 320, base - ASSETS * scale, cls="thin dash",
           stroke="var(--dim)", stroke_width="1.2")
    f.text(180, base - ASSETS * scale / 2 + 8, "≥", cls="bold",
           style="font-size:22px")
    return f


def _c6a_bubble(f: Fig, cx, cy, s, colour=AMBER):
    """A speech bubble with an exclamation mark — a complaint, an objection."""
    w, h = s, 0.72 * s
    x0, y0 = cx - w / 2, cy - h / 2
    f.rect(x0, y0, w, h, rx=0.2 * s, fill=colour, fill_opacity="0.18", stroke=colour,
           stroke_width="1.4")
    f.polygon([(x0 + 0.22 * w, y0 + h - 1), (x0 + 0.14 * w, y0 + h + 0.24 * s),
               (x0 + 0.46 * w, y0 + h - 1)], fill=colour, fill_opacity="0.18",
              stroke=colour, stroke_width="1.4", stroke_linejoin="round")
    f.line(cx, y0 + 0.16 * h, cx, y0 + 0.6 * h, cls="", stroke=colour,
           stroke_width="2.4", stroke_linecap="round")
    f.circle(cx, y0 + 0.8 * h, 1.5, fill=colour)


@figure("Market Conduct Regulation", "A loop between insurer and customer: the "
        "product is designed and sold one way, the claim and the complaint come back "
        "the other, with the regulator watching every step", width=WID)
def market_conduct_regulation() -> Fig:
    f = vcard()

    tower(f, 48, 236, 70, VIOLET)
    f.text(48, 290, "insurer", cls="sm bold")
    person(f, 312, 238, 58, BLUE)
    f.text(312, 290, "customer", cls="sm bold")
    building(f, BCX, 238, 52, AMBER)
    f.text(BCX, 290, "regulator", cls="sm bold")
    # out along the top: design and sale; back along the bottom: claim, complaint
    f.arrow(62, 180, 298, 180, colour="var(--dim)", width=1.4)
    f.arrow(298, 306, 62, 306, colour="var(--dim)", width=1.4)
    document(f, 130, 148, 40, BLUE)
    f.text(130, 116, "design", cls="sm")
    coins(f, 230, 172, 4, 13, TEAL)
    f.text(230, 116, "sale", cls="sm")
    document(f, 230, 334, 40, ROSE)
    f.text(230, 372, "claim", cls="sm")
    _c6a_bubble(f, 130, 332, 40, AMBER)
    f.text(130, 372, "complaint", cls="sm")
    return f


@figure("Rate Regulation", "Rate against expected cost: a band along the diagonal "
        "is fair, the region above it is excessive and the region below it is "
        "inadequate", width=WID)
def rate_regulation() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 10, left=36, right=18, top=18, bottom=36)
    lo = [(x, max(0.0, x - 1.4)) for x in (0, 1.4, 10)]
    hi = [(x, min(10.0, x + 1.4)) for x in (0, 8.6, 10)]
    f.polygon([ax.p(0, 10)] + [ax.p(x, y) for x, y in hi] + [ax.p(10, 10)],
              fill=ROSE, fill_opacity="0.12")
    f.polygon([ax.p(0, 0)] + [ax.p(x, y) for x, y in lo] + [ax.p(10, 0)],
              fill=AMBER, fill_opacity="0.14")
    f.polygon([ax.p(x, y) for x, y in hi] + [ax.p(x, y) for x, y in reversed(lo)],
              fill=GREEN, fill_opacity="0.22")
    ax.polyline([(0, 0), (10, 10)], colour=GREEN, width=2)
    ax.frame(xlabel="expected cost", ylabel="rate", arrows=True)
    ax.label(2.6, 7.6, "excessive", cls="bold")
    ax.label(7.4, 2.4, "inadequate", cls="bold")
    fx, fy = ax.p(5.2, 5.2)
    f.text(fx - 5, fy - 5, "fair", cls="bold",
           transform=f"rotate(-44 {fx - 5:.1f} {fy - 5:.1f})")
    return f


def _c6a_ban(f: Fig, cx, cy, r, colour=ROSE):
    """A no-entry sign laid over whatever sits at (cx, cy)."""
    f.circle(cx, cy, r, fill="none", stroke=colour, stroke_width="3")
    d = r * 0.707
    f.line(cx - d, cy - d, cx + d, cy + d, cls="", stroke=colour, stroke_width="3")


def _c6a_clock(f: Fig, cx, cy, r, colour=BLUE):
    """A clock face — a period of time, a deadline."""
    f.circle(cx, cy, r, fill=colour, fill_opacity="0.18", stroke=colour,
             stroke_width="1.4")
    for k in range(12):
        a = math.radians(30 * k)
        f.line(cx + 0.78 * r * math.cos(a), cy + 0.78 * r * math.sin(a),
               cx + 0.9 * r * math.cos(a), cy + 0.9 * r * math.sin(a), cls="",
               stroke=colour, stroke_width="1.2")
    f.line(cx, cy, cx, cy - 0.62 * r, cls="", stroke=colour, stroke_width="2",
           stroke_linecap="round")
    f.line(cx, cy, cx + 0.44 * r, cy + 0.12 * r, cls="", stroke=colour,
           stroke_width="2", stroke_linecap="round")


@figure("Risk Classification Restrictions", "A banned credit score crossed out, its "
        "signal flowing down dashed arrows into the territory, the vehicle and the "
        "tenure that correlate with it", width=WID)
def risk_classification_restrictions() -> Fig:
    f = vcard()

    document(f, BCX, 126, 64, BLUE)
    _c6a_ban(f, BCX, 126, 40)
    f.text(BCX, 188, "credit score", cls="bold")
    proxies = [(70, "territory"), (BCX, "vehicle"), (290, "tenure")]
    for x, name in proxies:
        f.arrow(BCX + (x - BCX) * 0.2, 200, x, 262, colour=AMBER, width=1.6,
                dash=True)
        f.text(x, 352, name, cls="sm bold")
    house(f, 70, 300, 60, AMBER)
    car(f, BCX, 308, 76, AMBER)
    _c6a_clock(f, 290, 304, 28, AMBER)
    return f


@figure("Territorial Rating", "Territory relativities of 1.42 urban, 1.15 suburb, "
        "0.94 town and 0.78 rural, as columns about a dashed 1.00 base", width=WID)
def territorial_rating() -> Fig:
    f = vcard()

    base, height, top = 352, 236, 1.6
    values = [1.42, 1.15, 0.94, 0.78]
    xs = _vbars(f, values, ["urban", "suburb", "town", "rural"], base, x0=48,
                x1=316, top=top, height=height, colours=[ROSE, AMBER, TEAL, GREEN])
    y1 = base - height / top
    f.line(42, y1, 322, y1, cls="thin dash", stroke="var(--dim)", stroke_width="1.3")
    f.text(322, y1 - 6, "1.00", cls="sm dim", anchor="end")
    for x, v in zip(xs, values):
        top_y = base - height * v / top
        f.text(x, top_y - 7 if v > 1 else top_y + 17, f"{v:.2f}", cls="sm bold")
    return f


@figure("Unfair Discrimination", "Two identical risks with the same expected cost: "
        "one's premium stops at the cost line, the other's runs past it into an "
        "unfair excess", width=WID)
def unfair_discrimination() -> Fig:
    f = vcard()

    x0, cost_x = 98, 236
    f.line(cost_x, 106, cost_x, 376, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.4")
    f.text(cost_x, 96, "same cost", cls="sm bold")
    f.text((x0 + cost_x) / 2, 162, "premium", cls="sm")
    for y, extra in ((186, 0), (320, 76)):
        person(f, 54, y + 4, 60, BLUE)
        f.rect(x0, y - 16, cost_x - x0, 32, rx=4, fill=BLUE, fill_opacity="0.40",
               stroke=BLUE, stroke_width="1.2")
        if extra:
            f.rect(cost_x, y - 16, extra, 32, rx=4, fill=ROSE, fill_opacity="0.55",
                   stroke=ROSE, stroke_width="1.2")
            f.text(cost_x + extra / 2, y - 24, "unfair", cls="sm bold")
    return f


@figure("Bias in Actuarial Practice", "One model's loss ratio by group, 63%, 72% and "
        "66%, with group B's column standing out above the others", width=WID)
def bias_in_actuarial_practice() -> Fig:
    f = vcard()

    base, height, top = 304, 190, 0.8
    f.text(40, 96, "loss ratio", cls="sm dim", anchor="start")
    groups = [(84, 0.63, TEAL, "A"), (180, 0.72, ROSE, "B"), (276, 0.66, TEAL, "C")]
    for x, lr, colour, name in groups:
        h = height * lr / top
        f.rect(x - 34, base - h, 68, h, rx=4, fill=colour, fill_opacity="0.70")
        f.text(x, base - h - 8, f"{lr:.0%}", cls="bold")
        person(f, x, 344, 40, colour)
        f.text(x + 26, 358, name, cls="bold", anchor="start")
    f.line(34, base, 326, base, cls="axis")
    return f


@figure("Take-All-Comers Rule", "An applicant with a car checked against the filed "
        "rules: meet them and the insurer must write the policy, fail them and the "
        "way leads to the Facility Association", width=WID)
def take_all_comers_rule() -> Fig:
    f = vcard()

    person(f, 56, 126, 58, VIOLET)
    car(f, 116, 140, 58, VIOLET)
    f.text(84, 184, "applicant", cls="bold")
    document(f, 256, 126, 60, BLUE)
    f.text(256, 184, "filed rules", cls="bold")
    f.arrow(150, 128, 218, 128, colour="var(--dim)", width=1.5)
    f.arrow(238, 198, 128, 262, colour=GREEN, width=2)
    f.text(172, 246, "meets", cls="sm", anchor="end")
    f.arrow(262, 198, 276, 262, colour=ROSE, width=2, dash=True)
    f.text(282, 232, "fails", cls="sm", anchor="start")
    tower(f, 104, 306, 70, GREEN)
    f.text(104, 366, "must write", cls="bold")
    tower(f, 280, 306, 60, ROSE)
    f.text(280, 366, "Facility Assoc.", cls="sm bold")
    return f


@figure("Automobile Insurance Reform", "Claim cost climbing while approved rates "
        "trail it in steps, until the gap becomes a crisis and a reform cuts the cost "
        "back, and the climb starts again", width=WID)
def automobile_insurance_reform() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 12, 0, 100, left=30, right=18, top=26, bottom=40)
    ax.frame(xlabel="years", arrows=True)

    def cost(t):
        return 34 * math.exp(0.15 * t) if t < 5 else 50 * math.exp(0.11 * (t - 5))

    ax.curve(cost, colour=ROSE, width=2.4, xa=0, xb=4.99)
    ax.curve(cost, colour=ROSE, width=2.4, xa=5, xb=11.6)
    ax.polyline([(5, cost(4.99)), (5, cost(5))], colour=ROSE, width=1.4, dash=True)
    steps = [(0, 30), (1.5, 38), (3.5, 52), (6.5, 58), (9, 68), (11.6, 68)]
    pts = []
    for (t0, r), (t1, _) in zip(steps, steps[1:]):
        pts += [(t0, r), (t1, r)]
    ax.polyline(pts, colour=BLUE, width=2.2)
    ax.vline(5, colour=GREEN, y_top=96)
    ax.label(5, 96, "reform", cls="sm bold", dy=-6)
    x, y_lo, y_hi = ax.px(4.6), ax.py(52), ax.py(cost(4.6))
    f.line(x, y_lo - 2, x, y_hi + 2, cls="", stroke="var(--ink)", stroke_width="1.2")
    f.text(x - 6, (y_lo + y_hi) / 2 + 4, "crisis", cls="sm bold", anchor="end")
    ax.label(10.4, cost(10.4), "cost", cls="sm bold", dx=-6, dy=-10, anchor="end")
    ax.label(10.2, 68, "rate", cls="sm bold", dy=16)
    return f


def _c6a_car_left(f: Fig, cx, cy, s, colour):
    """`car`, mirrored to face left."""
    f.raw(f'<g transform="translate({2 * cx:g},0) scale(-1,1)">')
    car(f, cx, cy, s, colour)
    f.raw("</g>")


@figure("No-Fault Insurance", "After a collision the injured driver is paid benefits "
        "by their own insurer, and the right to sue the driver at fault is crossed "
        "out", width=WID)
def no_fault_insurance() -> Fig:
    f = vcard()

    car(f, 146, 124, 74, BLUE)
    _c6a_car_left(f, 218, 124, 74, ROSE)
    tower(f, 58, 132, 60, GREEN)
    f.text(58, 184, "own insurer", cls="sm bold")
    person(f, 72, 306, 62, BLUE)
    f.text(72, 362, "you", cls="bold")
    person(f, 292, 306, 62, ROSE)
    f.text(292, 362, "at fault", cls="bold")
    f.arrow(64, 196, 70, 262, colour=GREEN, width=2.2)
    f.text(78, 234, "benefits", cls="sm", anchor="start")
    f.arrow(112, 312, 250, 312, colour=ROSE, width=1.6, dash=True)
    _c6a_ban(f, 180, 312, 20)
    f.text(180, 280, "sue", cls="sm bold")
    return f


def _c6a_headstone(f: Fig, cx, cy, s, colour):
    """A headstone — a death benefit."""
    w, h = 0.62 * s, 0.86 * s
    x0, x1, y0, y1 = cx - w / 2, cx + w / 2, cy - s / 2, cy - s / 2 + h
    f.path(f"M{x0:.1f},{y1:.1f} V{y0 + w / 2:.1f} A{w / 2:.1f},{w / 2:.1f} 0 0 1 "
           f"{x1:.1f},{y0 + w / 2:.1f} V{y1:.1f} Z", cls="", fill=colour,
           fill_opacity="0.18", stroke=colour, stroke_width="1.4")
    f.rect(cx - 0.44 * s, y1, 0.88 * s, 0.14 * s, rx=2, fill=colour,
           fill_opacity="0.3", stroke=colour, stroke_width="1.2")
    f.line(cx, y0 + 0.22 * s, cx, y0 + 0.54 * s, cls="", stroke=colour,
           stroke_width="1.6")
    f.line(cx - 0.12 * s, y0 + 0.32 * s, cx + 0.12 * s, y0 + 0.32 * s, cls="",
           stroke=colour, stroke_width="1.6")


@figure("Statutory Accident Benefits", "A regulation fixing what the insurer pays, "
        "and the insurer's arrows fanning out to four benefit heads: medical, "
        "attendant care, income and death", width=WID)
def statutory_accident_benefits() -> Fig:
    f = vcard()

    document(f, 72, 128, 58, VIOLET)
    f.text(72, 184, "regulation", cls="bold")
    f.arrow(106, 128, 184, 128, colour=VIOLET, width=1.6)
    tower(f, 234, 128, 76, BLUE)
    f.text(234, 184, "insurer", cls="bold")
    heads = [(54, "medical"), (138, "care"), (222, "income"), (306, "death")]
    for x, name in heads:
        f.arrow(234 + (x - 234) * 0.2, 196, x, 272, colour=BLUE, width=1.5)
        f.text(x, 360, name, cls="sm bold")
    cross(f, 54, 310, 42, ROSE)
    person(f, 138, 312, 54, TEAL)
    coins(f, 222, 334, 5, 17, AMBER)
    _c6a_headstone(f, 306, 308, 50, VIOLET)
    return f


@figure("Minor Injury Guideline", "The claim cost curve for minor injuries, fenced "
        "into a spike at the $3,500 cap inside the MIG, with a thin tail of claims "
        "that escape it", width=WID)
def minor_injury_guideline() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 1.0, left=40, right=16, top=34, bottom=42)
    ax.frame(xlabel="claim cost", xticks=[], yticks=[], arrows=True)
    ax.area(lambda x: 0.62 * 2.718 ** (-0.55 * x), 0, 3.0, colour=GREEN,
            opacity="0.20")
    ax.curve(lambda x: 0.62 * 2.718 ** (-0.55 * x), colour=GREEN, width=2,
             xa=0, xb=3.0)
    ax.fig.rect(ax.px(2.85), ax.py(0.94), 10, ax.y1 - ax.py(0.94), rx=2,
                fill=ROSE, fill_opacity="0.6")
    ax.curve(lambda x: 0.055 + 0.10 * 2.718 ** (-0.30 * (x - 3)), colour=AMBER,
             width=2, xa=3.2, xb=9.8)
    ax.label(1.3, 0.42, "inside the MIG", cls="sm bold", fill=GREEN)
    ax.label(3.05, 0.99, "$3,500", cls="sm bold", fill=ROSE, dy=-6)
    ax.label(6.6, 0.30, "outside it", cls="sm bold", fill=AMBER)
    return f


@figure("Catastrophic Impairment", "A $65,000 column beside a $1,000,000 one, with "
        "the catastrophic designation carrying a claim from the short column to the "
        "tall one", width=WID)
def catastrophic_impairment() -> Fig:
    f = vcard()

    base, scale = 352, 250 / 1_000_000
    for x, amount, colour, name in ((96, 65_000, AMBER, "non-catastrophic"),
                                    (256, 1_000_000, ROSE, "catastrophic")):
        h = amount * scale
        f.rect(x - 44, base - h, 88, h, rx=4, fill=colour, fill_opacity="0.62")
        f.text(x, base - h - 8, f"${amount:,}", cls="bold")
        f.text(x, base + 18, name, cls="sm bold")
    f.line(34, base, 326, base, cls="axis")
    f.arrow(112, 300, 196, 150, colour=VIOLET, width=2, dash=True)
    f.text(146, 214, "designation", cls="sm", anchor="end")
    return f


@figure("Tort Threshold and Deductible", "Three bodily injury awards of $40,000, "
        "$120,000 and $350,000 cut by a dashed $45,000 deductible line to $0, "
        "$75,000 and $305,000 paid", width=WID)
def tort_threshold_and_deductible() -> Fig:
    f = vcard()

    rows = [("$40,000", 40, 0, "$0", ROSE),
            ("$120,000", 120, 75, "$75,000", AMBER),
            ("$350,000", 350, 305, "$305,000", GREEN)]
    x0, scale = 40, 0.62
    dx = x0 + 45 * scale
    for i, (name, gross, net, paid, colour) in enumerate(rows):
        y = 128 + i * 92
        f.text(x0, y, name, cls="sm dim", anchor="start")
        f.line(dx, y + 4, dx, y + 46, cls="thin dash", stroke=VIOLET,
               stroke_width="1.6")
        f.rect(x0, y + 10, gross * scale, 30, rx=3, fill="var(--soft)",
               stroke="var(--edge)", stroke_width="1.1")
        f.rect(x0 + 45 * scale, y + 10, net * scale, 30, rx=3, fill=colour,
               fill_opacity="0.65")
        f.text(x0 + gross * scale + 8, y + 30, paid, cls="sm bold", anchor="start")
    f.line(dx, 358, dx, 368, cls="thin dash", stroke=VIOLET, stroke_width="1.6")
    f.text(dx, 382, "deductible", cls="sm bold")
    return f


@figure("Direct Compensation Property Damage", "After a collision the insured's "
        "damage is split 75% paid by their own insurer and 25% left for their own "
        "fault, while the claim against the other insurer is crossed out", width=WID)
def direct_compensation_property_damage() -> Fig:
    f = vcard()

    car(f, 144, 118, 76, BLUE)
    _c6a_car_left(f, 216, 118, 76, ROSE)
    parts = [(0.75, "75%", GREEN), (0.25, "25%", "var(--dim)")]
    _hbar(f, 190, parts, x0=58, x1=302, height=30, label_cls="sm bold")
    tower(f, 86, 300, 66, GREEN)
    f.text(86, 358, "own insurer", cls="sm bold")
    f.arrow(96, 262, 120, 212, colour=GREEN, width=2)
    tower(f, 280, 300, 66, AMBER)
    f.text(280, 358, "other insurer", cls="sm bold")
    f.arrow(196, 214, 256, 262, colour=ROSE, width=1.5, dash=True)
    _c6a_ban(f, 226, 238, 16)
    return f


@figure("Fault Determination Rules", "A rear-end collision drawn on a road, with the "
        "car in front pointed to 0% and the car behind to 100% on a fault scale in "
        "25% steps", width=WID)
def fault_determination_rules() -> Fig:
    f = vcard()

    f.rect(24, 110, 312, 132, rx=6, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.1")
    f.line(24, 176, 336, 176, cls="thin dash", stroke="var(--axis)",
           stroke_width="1.6")
    for y in (142, 210):
        f.arrow(318, y, 282, y, colour="var(--axis)", width=1.3)
    _c6a_car_left(f, 110, 210, 84, GREEN)
    _c6a_car_left(f, 206, 210, 84, ROSE)
    y = 322
    f.line(60, y, 300, y, cls="axis")
    for k in range(5):
        x = 60 + 60 * k
        f.line(x, y - 5, x, y + 5, cls="tick")
        f.text(x, y + 22, f"{25 * k}%", cls="sm bold")
    for car_x, x, colour in ((110, 60, GREEN), (206, 300, ROSE)):
        f.line(car_x, 234, x, y - 16, cls="thin dot", stroke=colour,
               stroke_width="1.6")
        f.polygon([(x - 7, y - 16), (x + 7, y - 16), (x, y - 5)], fill=colour)
    return f


@figure("Uninsured Automobile Coverage", "An uninsured car and a hit-and-run car "
        "both striking the insured's car, and the insured's own insurer paying for "
        "it", width=WID)
def uninsured_automobile_coverage() -> Fig:
    f = vcard()

    car(f, 78, 116, 80, ROSE)
    f.text(78, 158, "uninsured", cls="sm bold")
    f.raw('<g opacity="0.75" stroke-dasharray="3 2.5">')
    _c6a_car_left(f, 282, 116, 80, ROSE)
    f.raw("</g>")
    f.text(282, 158, "hit-and-run", cls="sm bold")
    car(f, BCX, 226, 88, BLUE)
    f.text(BCX + 52, 242, "insured", cls="sm bold", anchor="start")
    f.arrow(96, 168, 140, 204, colour=ROSE, width=1.8)
    f.arrow(264, 168, 220, 204, colour=ROSE, width=1.8)
    tower(f, BCX, 324, 58, GREEN)
    f.text(BCX, 374, "own insurer", cls="sm bold")
    f.arrow(BCX, 292, BCX, 260, colour=GREEN, width=2)
    return f


@figure("Insurance Bureau of Canada", "Member insurers feeding up into the IBC, and "
        "the IBC's arrows out to government, to industry data and to consumers",
        width=WID)
def insurance_bureau_of_canada() -> Fig:
    f = vcard()

    outputs = [(60, "government"), (BCX, "data"), (300, "consumers")]
    for x, name in outputs:
        f.text(x, 80, name, cls="sm bold")
        f.arrow(BCX + (x - BCX) * 0.1, 178, x, 144, colour=VIOLET, width=1.5)
    building(f, 60, 114, 50, BLUE)
    document(f, BCX, 114, 46, TEAL)
    person(f, 300, 116, 50, GREEN)
    tower(f, BCX, 214, 64, VIOLET)
    f.text(BCX + 26, 218, "IBC", cls="bold", anchor="start")
    for x in (72, 144, 216, 288):
        tower(f, x, 316, 44, BLUE)
        f.arrow(x + (BCX - x) * 0.12, 290, BCX + (x - BCX) * 0.12, 252,
                colour=BLUE, width=1.4)
    f.text(BCX, 364, "members", cls="sm bold")
    return f


@figure("Code of Consumer Rights and Responsibilities", "An insurer and a consumer "
        "under a voluntary code, rights running one way and duties the other, above "
        "scales of law crossed out for want of a statutory remedy", width=WID)
def code_of_consumer_rights() -> Fig:
    f = vcard()

    document(f, BCX, 108, 50, VIOLET)
    f.text(BCX + 30, 112, "code", cls="bold", anchor="start")
    tower(f, 58, 190, 72, BLUE)
    f.text(58, 246, "insurer", cls="bold")
    person(f, 302, 192, 64, GREEN)
    f.text(302, 246, "consumer", cls="bold")
    f.arrow(92, 172, 266, 172, colour=GREEN, width=1.8)
    f.text(BCX, 164, "rights", cls="sm")
    f.arrow(266, 210, 92, 210, colour=AMBER, width=1.8)
    f.text(BCX, 228, "duties", cls="sm")
    scales(f, BCX, 318, 74, VIOLET)
    _c6a_ban(f, BCX, 314, 42)
    f.text(BCX, 380, "no remedy", cls="sm bold")
    return f


@figure("Court Case", "The scales of one ruling fanning out to five open claims, each "
        "reserve column topped with a new increment the ruling added", width=WID)
def court_case() -> Fig:
    f = vcard()

    scales(f, BCX, 118, 76, VIOLET)
    f.text(BCX + 58, 122, "ruling", cls="bold", anchor="start")
    base = 340
    for i, old in enumerate([54, 76, 44, 66, 58]):
        x = 60 + 60 * i
        new = old * 1.6
        f.arrow(BCX + (x - BCX) * 0.25, 166, x, base - new - 10, colour=VIOLET,
                width=1.3)
        f.rect(x - 20, base - new, 40, new - old, rx=3, fill=ROSE,
               fill_opacity="0.62")
        f.rect(x - 20, base - old, 40, old, rx=3, fill=BLUE, fill_opacity="0.40")
    f.line(30, base, 330, base, cls="axis")
    f.text(BCX, base + 22, "open claims", cls="sm bold")
    return f


@figure("Duty of Good Faith", "Scales with the insurer weighing down one pan and the "
        "insured lifted on the other, and arrows of duty running both ways above "
        "them", width=WID)
def duty_of_good_faith() -> Fig:
    f = vcard()

    scales(f, BCX, 272, 190, VIOLET, tilt=0.8)
    tower(f, 92.6, 256, 62, AMBER)
    f.text(92.6, 334, "insurer", cls="bold")
    person(f, 267.4, 228, 50, BLUE)
    f.text(267.4, 300, "insured", cls="bold")
    f.arrow(80, 118, 280, 118, colour=AMBER, width=1.8)
    f.text(BCX, 110, "fair dealing", cls="sm")
    f.arrow(280, 150, 80, 150, colour=BLUE, width=1.8)
    f.text(BCX, 168, "disclosure", cls="sm")
    return f


@figure("Bad Faith Damages", "A bad-faith award built column by column — benefit, "
        "aggravated, punitive and costs — to $1.6M, far above the dashed policy "
        "limit at the benefit", width=WID)
def bad_faith_damages() -> Fig:
    f = vcard()

    base, top = 350, 236
    _waterfall(f, base,
               [("benefit", 320.0, BLUE), ("aggravated", 100.0, AMBER),
                ("punitive", 1000.0, ROSE), ("costs", 180.0, VIOLET),
                ("total", None, TEAL)],
               x0=40, x1=322, top=top, fmt=lambda v: f"{v/1000:,.2f}M"
               if v >= 1000 else f"{v:,.0f}k")
    y_lim = base - 320 * (top / 1600)
    f.line(36, y_lim, 326, y_lim, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.3")
    f.text(270, y_lim + 16, "policy limit", cls="sm bold", anchor="end")
    return f


@figure("Punitive Damages", "Whiten as two stacks of coins: the $345k fire claim "
        "under a house, and the $1M punitive award under the court's scales standing "
        "nearly three times taller", width=WID)
def punitive_damages() -> Fig:
    f = vcard()

    base = 350
    for x, n, amount, name, colour in ((96, 6, "$345k", "claim", BLUE),
                                       (264, 17, "$1M", "punitive", ROSE)):
        coins(f, x, base, n, 30, colour)
        f.text(x, base - 5 - (n - 1) * 6 - 14, amount, cls="bold")
        f.text(x, base + 22, name, cls="sm bold")
    f.line(34, base, 326, base, cls="axis")
    house(f, 96, 234, 64, BLUE)
    scales(f, 264, 170, 72, VIOLET)
    return f


@figure("Duty to Defend", "A large circle of what is alleged, where the insurer's "
        "shield defends, holding a smaller circle of what is proven, where it pays "
        "to indemnify", width=WID)
def duty_to_defend() -> Fig:
    f = vcard()

    f.circle(BCX, 229, 150, fill=BLUE, fill_opacity="0.12", stroke=BLUE,
             stroke_width="1.6")
    f.circle(BCX, 290, 80, fill=AMBER, fill_opacity="0.20", stroke=AMBER,
             stroke_width="1.6")
    f.text(BCX, 108, "alleged", cls="bold")
    shield(f, BCX, 150, 42, BLUE)
    f.text(BCX, 192, "defend", cls="sm bold")
    f.text(BCX, 244, "proven", cls="bold")
    coins(f, BCX, 306, 4, 18, AMBER)
    f.text(BCX, 330, "indemnify", cls="sm bold")
    return f


@figure("Vicarious Liability", "A careless driver beside the car, with liability "
        "arrows running up to the car's owner, who consented, and to the employer, "
        "for driving at work", width=WID)
def vicarious_liability() -> Fig:
    f = vcard()

    person(f, 108, 304, 64, ROSE)
    f.text(108, 360, "driver", cls="bold")
    car(f, 230, 320, 100, ROSE)
    person(f, 76, 128, 58, BLUE)
    f.text(76, 178, "owner", cls="bold")
    tower(f, 284, 128, 64, BLUE)
    f.text(284, 178, "employer", cls="bold")
    f.arrow(100, 264, 80, 192, colour=ROSE, width=2)
    f.text(84, 232, "consent", cls="sm", anchor="end")
    f.arrow(124, 266, 262, 192, colour=ROSE, width=2)
    f.text(206, 244, "at work", cls="sm", anchor="start")
    return f


@figure("Limitation Period", "A timeline from the accident to discovery, when the "
        "clock starts: a short basic period runs two years from discovery inside an "
        "ultimate period running fifteen years from the act", width=WID)
def limitation_period() -> Fig:
    f = vcard()

    y = 318
    marks = [(52, "act"), (130, "discovery"), (236, "2 years"), (312, "15 years")]
    f.arrow(34, y, 334, y, colour="var(--axis)", width=1.2)
    for x, name in marks:
        f.line(x, y - 5, x, y + 5, cls="tick")
        f.text(x, y + 22, name, cls="sm bold")
    f.rect(52, 206, 260, 30, rx=4, fill=VIOLET, fill_opacity="0.30",
           stroke=VIOLET, stroke_width="1.2")
    f.text(182, 226, "ultimate", cls="sm bold")
    f.rect(130, 250, 106, 30, rx=4, fill=BLUE, fill_opacity="0.45",
           stroke=BLUE, stroke_width="1.2")
    f.text(183, 270, "basic", cls="sm bold")
    car(f, 52, 150, 64, ROSE)
    _c6a_clock(f, 130, 150, 28, BLUE)
    for x in (52, 130):
        f.line(x, 184, x, 204, cls="thin dot", stroke="var(--dim)",
               stroke_width="1.4")
    return f


@figure("Prejudgment Interest", "$250,000 of damages owed from the accident as a "
        "block, with a red wedge of interest growing on top of it to $68,750 by "
        "judgment five and a half years later", width=WID)
def prejudgment_interest() -> Fig:
    f = vcard()

    owed, rate, years = 250.0, 0.05, 5.5
    ax = vaxes(f, 0, 6.2, 0, 360, left=22, right=16, top=24, bottom=42)
    ax.frame(xlabel="years", xticks=[0, 1, 2, 3, 4, 5.5], arrows=True)
    f.polygon([ax.p(0, 0), ax.p(0, owed), ax.p(years, owed), ax.p(years, 0)],
              fill=BLUE, fill_opacity="0.30", stroke=BLUE, stroke_width="1.3")
    top = owed * (1 + rate * years)
    f.polygon([ax.p(0, owed), ax.p(years, top), ax.p(years, owed)], fill=ROSE,
              fill_opacity="0.55", stroke=ROSE, stroke_width="1.3")
    ax.label(years / 2, owed / 2, "$250,000", cls="bold")
    ax.label(years * 0.8, owed + owed * rate * years * 0.8 / 2, "$68,750",
             cls="bold", dy=4)
    return f


@figure("Collateral Benefits", "Three heads of a tort award as bars, the income and "
        "care heads each losing a red slice of accident benefits already paid, "
        "traced back to the benefits insurer", width=WID)
def collateral_benefits() -> Fig:
    f = vcard()

    rows = [("income loss", 220, 85, BLUE),
            ("future care", 130, 40, TEAL),
            ("non-pecuniary", 150, 0, AMBER)]
    x0, scale = 36, 1.05
    for i, (head, gross, offset, colour) in enumerate(rows):
        y = 112 + i * 92
        f.text(x0, y, head, cls="sm bold", anchor="start")
        f.rect(x0, y + 10, gross * scale, 32, rx=3, fill=colour,
               fill_opacity="0.40")
        if offset:
            f.rect(x0 + (gross - offset) * scale, y + 10, offset * scale, 32, rx=3,
                   fill=ROSE, fill_opacity="0.60")
            f.text(x0 + (gross - offset / 2) * scale, y + 31, f"−${offset}k",
                   cls="sm")
        f.text(x0 + gross * scale + 8, y + 31, f"${gross}k", cls="sm dim",
               anchor="start")
    tower(f, 300, 320, 58, ROSE)
    f.text(300, 372, "benefits", cls="sm bold")
    f.arrow(292, 286, 218, 158, colour=ROSE, width=1.4, dash=True)
    f.arrow(284, 292, 152, 250, colour=ROSE, width=1.4, dash=True)
    return f


@figure("Tort Litigation", "A bodily injury award built as a waterfall — income, "
        "care and pain up to $1.85M, then 20% contributory negligence and the "
        "accident benefits taken off — to $1.38M paid", width=WID)
def tort_litigation() -> Fig:
    f = vcard()

    _waterfall(f, 350,
               [("income", 1366.6, BLUE), ("care", 300.0, TEAL),
                ("pain", 180.0, AMBER), ("−20%", -369.3, ROSE),
                ("−AB", -95.0, ROSE), ("paid", None, GREEN)],
               x0=36, x1=326, top=236, bar_frac=0.62,
               fmt=lambda v: f"{abs(v)/1000:.2f}M" if abs(v) >= 1000
               else f"{abs(v):,.0f}k")
    return f


@figure("Tort Reform", "Claim cost over the years: flat, then cut sharply at the "
        "reform, then climbing back as the saving erodes", width=WID)
def tort_reform() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 60, 108, left=30, right=16, top=28, bottom=42)
    ax.frame(xlabel="years", xticks=[], yticks=[], arrows=True)
    ax.polyline([(0, 100), (2.9, 100)], colour=BLUE, width=2.4)
    ax.polyline([(3, 100), (3, 74)], colour=ROSE, width=2.4)
    ax.polyline([(3, 74), (6, 82), (10, 94)], colour=AMBER, width=2.4)
    ax.vline(3, colour=ROSE, dash=True)
    ax.label(3, 105, "reform", cls="sm bold", fill=ROSE, dy=-4)
    ax.label(3, 87, "saving", cls="sm bold", anchor="start", dx=8)
    ax.label(7.4, 78, "erosion", cls="sm bold", fill=AMBER)
    ax.label(1.4, 96, "cost", cls="sm bold")
    return f


def _c6a_gate(f: Fig, cx, cy, w, h, colour):
    """A field gate — a test a claim has to pass."""
    x0, x1 = cx - w / 2, cx + w / 2
    for x in (x0, x1):
        f.rect(x - 3, cy - h / 2, 6, h, rx=2, fill=colour, fill_opacity="0.5",
               stroke=colour, stroke_width="1.2")
    for k in range(3):
        y = cy - h / 2 + 10 + k * (h - 20) / 2
        f.line(x0 + 3, y, x1 - 3, y, cls="", stroke=colour, stroke_width="2.4")
    f.line(x0 + 3, cy - h / 2 + 10, x1 - 3, cy + h / 2 - 10, cls="", stroke=colour,
           stroke_width="2")


@figure("Class Action", "A crowd of small claimants funnelled through the "
        "certification gate into one action before the court, with one claimant "
        "standing apart after opting out", width=WID)
def class_action() -> Fig:
    f = vcard()

    for r in range(3):
        for c in range(4):
            person(f, 44 + c * 32, 132 + r * 50, 38, BLUE)
    f.text(92, 276, "class", cls="bold")
    f.arrow(166, 182, 184, 182, colour="var(--dim)", width=1.6)
    _c6a_gate(f, 210, 182, 40, 66, AMBER)
    f.text(210, 236, "certification", cls="sm bold")
    f.arrow(236, 182, 258, 182, colour="var(--dim)", width=1.6)
    scales(f, 296, 182, 64, VIOLET)
    f.text(296, 236, "one action", cls="sm bold")
    f.raw('<g opacity="0.55">')
    person(f, 60, 342, 38, BLUE)
    f.raw("</g>")
    f.text(86, 350, "opts out", cls="sm", anchor="start")
    return f


@figure("Structured Settlement", "A dashed $1M lump sum beside the solid $900k that "
        "buys the annuity instead, and the annuity's comb of $52k payments running "
        "for 30 years", width=WID)
def structured_settlement() -> Fig:
    f = vcard()

    base, scale = 334, 224 / 1_000_000
    f.rect(24, base - 1_000_000 * scale, 42, 1_000_000 * scale, rx=3,
           fill="none", stroke=AMBER, stroke_width="1.6", stroke_dasharray="4 3")
    f.text(45, base - 1_000_000 * scale - 8, "$1M", cls="bold")
    f.rect(84, base - 900_000 * scale, 42, 900_000 * scale, rx=3, fill=GREEN,
           fill_opacity="0.6")
    f.text(105, base - 900_000 * scale - 8, "$900k", cls="bold")
    f.text(45, base + 20, "lump sum", cls="sm bold")
    f.text(105, base + 20, "annuity", cls="sm bold")
    x0, x1 = 142, 330
    step = (x1 - x0) / 30
    for k in range(30):
        x = x0 + step * (k + 0.5)
        f.rect(x - step * 0.34, base - 52_000 * scale, step * 0.68,
               52_000 * scale, rx=1, fill=GREEN, fill_opacity="0.8")
    f.line(x0 - 4, base, x1 + 2, base, cls="axis")
    f.arrow(130, 200, 170, 300, colour=GREEN, width=1.6)
    f.text(236, base - 52_000 * scale - 12, "$52k a year", cls="sm bold")
    brace(f, x0, x1, base + 6, depth=8, label="30 years", label_cls="sm bold")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Canadian government and industry insurance programs
# ═══════════════════════════════════════════════════════════════════════════

@figure("Agricultural Insurance", "A column of four layers stacked up a rising loss "
        "axis: AgriInvest at the bottom, then AgriStability, AgriInsurance and "
        "AgriRecovery at the top", width=WID)
def agricultural_insurance() -> Fig:
    f = vcard()

    layers = [("AgriInvest", 36, GREEN), ("AgriStability", 64, TEAL),
              ("AgriInsurance", 92, AMBER), ("AgriRecovery", 118, ROSE)]
    y = 378
    for name, h, colour in layers:
        f.rect(84, y - h, 104, h - 4, rx=5, fill=colour, fill_opacity="0.40",
               stroke=colour, stroke_width="1.3")
        f.text(202, y - h / 2 + 2, name, cls="sm bold", anchor="start")
        y -= h
    f.arrow(58, 378, 58, y + 4, colour="var(--axis)", width=1.4)
    f.text(58, y - 6, "loss", cls="sm bold")
    return f


@figure("Employment Insurance", "Weekly benefit against insurable earnings: a line "
        "rising at 55% until the maximum insurable earnings ceiling, then flat",
        width=WID)
def employment_insurance() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 100, 0, 60, left=30, right=16, top=28, bottom=42)
    ax.frame(xlabel="insurable earnings", ylabel="weekly benefit", xticks=[],
             yticks=[], arrows=True)
    ax.polyline([(0, 0), (66, 36), (100, 36)], colour=BLUE, width=2.4)
    ax.vline(66, colour=ROSE, y_top=36)
    ax.label(66, 44, "ceiling", cls="sm bold", fill=ROSE)
    ax.label(34, 22, "55%", cls="sm bold", fill=BLUE, dy=-4, anchor="end")
    ax.label(86, 36, "flat", cls="sm bold", dy=-8)
    return f


@figure("Flood Insurance", "A riverbank in cross-section: homes high on the bank "
        "sit above both flood levels and are insurable, one lower home is priced "
        "high, and the home at the water's edge is uninsurable", width=WID)
def flood_insurance() -> Fig:
    f = vcard()

    top, x_brow, slope, x_toe = 176, 110, 1.025, 270

    def ground(x):
        return top if x <= x_brow else top + (x - x_brow) * slope

    def bank_x(y):
        return x_brow + (y - top) / slope

    bank = [(20, top), (x_brow, top), (x_toe, ground(x_toe)), (296, 370), (336, 370)]
    f.polygon(bank + [(336, 392), (20, 392)], fill="var(--soft)")
    river = 330
    for level, colour in ((262, AMBER), (296, ROSE)):
        f.polygon([(bank_x(level), level), (336, level), (336, river),
                   (bank_x(river), river)], fill=colour, fill_opacity="0.20")
        f.line(bank_x(level), level, 336, level, cls="thin dash", stroke=colour,
               stroke_width="1.5")
    f.polygon([(bank_x(river), river), (336, river), (336, 370), (296, 370),
               (x_toe, ground(x_toe))], fill=BLUE, fill_opacity="0.40")
    f.poly(bank, cls="thin", stroke="var(--axis)", stroke_width="1.6")
    s = 34
    for x, colour in ((36, GREEN), (70, GREEN), (104, GREEN), (140, GREEN),
                      (206, AMBER), (243, ROSE)):
        house(f, x, ground(x) - s / 2, s, colour)
    f.text(88, 132, "insurable", cls="sm bold")
    f.text(226, 254, "priced high", cls="sm bold", anchor="start")
    f.text(264, 316, "uninsurable", cls="sm bold", anchor="start")
    return f


@figure("Guaranty Funds", "A failed insurer crossed out, and four surviving insurers "
        "sized by market share paying up into the fund by arrows of matching weight, "
        "which covers the failed insurer's policyholders", width=WID)
def guaranty_funds() -> Fig:
    f = vcard()

    tower(f, 64, 124, 60, ROSE)
    _c6a_ban(f, 64, 124, 32)
    f.text(64, 178, "failed", cls="bold")
    for x in (250, 280, 310):
        person(f, x, 128, 36, BLUE)
    f.text(280, 94, "policyholders", cls="sm bold")
    shield(f, BCX, 200, 60, GREEN)
    f.text(BCX + 30, 236, "fund", cls="bold", anchor="start")
    f.arrow(206, 184, 254, 154, colour=GREEN, width=2.2)
    for i, share in enumerate((0.40, 0.30, 0.20, 0.10)):
        x, s = 60 + 80 * i, 44 + 100 * share
        tower(f, x, 356 - s / 2, s, BLUE)
        f.text(x, 376, f"{share:.0%}", cls="sm bold")
        f.arrow(x + (BCX - x) * 0.1, 350 - s - 4, BCX + (x - BCX) * 0.18, 238,
                colour=BLUE, width=1 + share * 8)
    return f


@figure("PACICC", "Why Canadian insurers fail, as bars in the order PACICC's research "
        "ranks them: underpricing and under-reserving longest, investments shortest",
        width=WID)
def pacicc() -> Fig:
    f = vcard()

    causes = [("underpricing", 146, ROSE), ("under-reserving", 131, ROSE),
              ("rapid growth", 96, AMBER), ("reinsurance", 64, AMBER),
              ("catastrophe", 50, TEAL), ("investments", 29, GREEN)]
    for i, (cause, w, colour) in enumerate(causes):
        y = 104 + i * 48
        f.text(36, y + 18, cause, cls="sm bold", anchor="start")
        f.rect(140, y + 2, w * 1.2, 24, rx=3, fill=colour, fill_opacity="0.62")
    f.line(140, 96, 140, 384, cls="axis")
    return f


@figure("Health Care Insurance", "A household's health spending as one bar: the "
        "tax-funded provincial plan pays the larger hospital-and-doctor share, a "
        "premium-funded private insurer the drugs-and-dental rest", width=WID)
def health_care_insurance() -> Fig:
    f = vcard()

    # the two payers, each funded its own way
    coins(f, 52, 150, 3, 12, BLUE)
    f.text(52, 170, "taxes", cls="sm")
    f.arrow(70, 134, 102, 134, colour=BLUE)
    building(f, 135, 122, 56, BLUE)
    f.text(135, 170, "province", cls="sm bold")
    tower(f, 258, 122, 56, AMBER)
    f.text(258, 170, "insurer", cls="sm bold")
    f.arrow(300, 134, 280, 134, colour=AMBER)
    coins(f, 318, 150, 3, 12, AMBER)
    f.text(318, 170, "premium", cls="sm")

    # what each one pays for, out of one household's spending
    split = 40 + 280 * 0.68
    f.arrow(135, 180, 135, 204, colour=BLUE)
    f.arrow(262, 180, (split + 320) / 2, 204, colour=AMBER)
    f.rect(40, 208, split - 40, 42, rx=4, fill=BLUE, fill_opacity="0.30",
           stroke=BLUE, stroke_width="1.2")
    f.rect(split, 208, 320 - split, 42, rx=4, fill=AMBER, fill_opacity="0.30",
           stroke=AMBER, stroke_width="1.2")
    f.text((40 + split) / 2, 233, "hospital, doctor", cls="sm")
    f.text((split + 320) / 2, 233, "drugs, dental", cls="sm")
    brace(f, 40, 320, 258, depth=10)
    person(f, BCX, 318, 58, TEAL)
    f.text(BCX, 366, "household", cls="sm bold")
    return f


@figure("Residual Market", "A driver no one will write reaches one of two residual "
        "structures: the Facility Association, which writes the driver directly, or an "
        "ordinary insurer that quietly cedes the policy to a pool", width=WID)
def residual_market() -> Fig:
    f = vcard()

    car(f, 58, 232, 64, BLUE)
    f.text(58, 270, "driver", cls="sm bold")

    # the facility: a policy the driver can see is FA's
    tower(f, 292, 132, 64, ROSE)
    f.text(292, 180, "FA", cls="sm bold")
    f.arrow(88, 210, 256, 144, colour=ROSE, width=1.8)

    # the pool: an ordinary policy, ceded where the driver never looks
    tower(f, 188, 316, 64, TEAL)
    f.text(188, 366, "insurer", cls="sm bold")
    f.arrow(86, 254, 152, 300, colour=TEAL, width=1.8)
    f.circle(292, 316, 34, fill=ROSE, fill_opacity="0.10", stroke=ROSE,
             stroke_width="1.3", stroke_dasharray="4 3")
    coins(f, 292, 334, 3, 13, ROSE)
    f.text(292, 366, "pool", cls="sm bold")
    f.arrow(214, 316, 254, 316, colour=ROSE, dash=True)
    return f


@figure("Workers Compensation Insurance", "The historic bargain: the worker's right "
        "to sue the employer is struck out, and a board funded by employer assessments "
        "pays the worker a no-fault benefit instead", width=WID)
def workers_compensation_insurance() -> Fig:
    f = vcard()

    person(f, 70, 136, 64, BLUE)
    f.text(70, 188, "worker", cls="sm bold")
    tower(f, 290, 136, 64, AMBER)
    f.text(290, 188, "employer", cls="sm bold")

    # the tort action, given up
    f.arrow(108, 136, 252, 136, colour=ROSE, dash=True)
    f.line(170, 124, 190, 148, cls="", stroke=ROSE, stroke_width="2.4",
           stroke_linecap="round")
    f.line(190, 124, 170, 148, cls="", stroke=ROSE, stroke_width="2.4",
           stroke_linecap="round")
    f.text(BCX, 114, "sue", cls="sm")

    # the board that replaces it
    building(f, BCX, 304, 76, TEAL)
    f.text(BCX, 362, "board", cls="sm bold")
    f.arrow(282, 202, 262, 228, colour=AMBER)
    coins(f, 252, 262, 3, 12, AMBER)
    f.arrow(238, 258, 222, 276, colour=AMBER)
    f.text(270, 250, "assessment", cls="sm", anchor="start")
    f.arrow(136, 270, 84, 204, colour=TEAL)
    f.text(104, 252, "benefit", cls="sm", anchor="end")
    return f


@figure("Facility Association", "A driver reaches FA through a broker and a "
        "servicing carrier, and FA's result is spread across every auto insurer by "
        "voluntary market share", width=WID)
def facility_association() -> Fig:
    f = vcard()

    # the route in
    car(f, 50, 118, 56, BLUE)
    f.text(50, 150, "driver", cls="sm")
    f.arrow(82, 116, 118, 116, colour="var(--dim)")
    person(f, 144, 116, 46, TEAL)
    f.text(144, 150, "broker", cls="sm")
    f.arrow(170, 116, 208, 116, colour="var(--dim)")
    tower(f, 232, 116, 50, AMBER)
    f.text(232, 158, "carrier", cls="sm")

    # FA holds the risk ...
    f.arrow(232, 168, 204, 196, colour=ROSE)
    tower(f, BCX, 226, 60, ROSE)
    f.text(BCX + 26, 230, "FA", cls="sm bold", anchor="start")

    # ... and the result lands on every insurer, by market share
    shares = [(0.34, "A", BLUE), (0.27, "B", VIOLET), (0.22, "C", GREEN),
              (0.17, "D", AMBER)]
    x = 40
    for share, name, colour in shares:
        w = 280 * share
        f.rect(x, 306, w, 36, rx=4, fill=colour, fill_opacity="0.30",
               stroke=colour, stroke_width="1.2")
        f.text(x + w / 2, 328, name, cls="sm bold")
        f.arrow(BCX, 260, x + w / 2, 302, colour=ROSE, width=1.3)
        x += w
    f.text(BCX, 362, "market share", cls="sm dim")
    return f


@figure("Risk Sharing Pool", "The driver pays the insurer its normal rate and keeps "
        "the policy, while the insurer cedes the risk to a pool the driver never sees",
        width=WID)
def risk_sharing_pool() -> Fig:
    f = vcard()

    # the customer, kept
    person(f, 70, 142, 64, BLUE)
    f.text(70, 196, "driver", cls="sm bold")
    tower(f, 290, 142, 68, AMBER)
    f.text(290, 196, "insurer", cls="sm bold")
    f.arrow(108, 134, 250, 134, colour=BLUE)
    f.arrow(250, 152, 108, 152, colour=AMBER)
    f.text(BCX, 124, "normal rate", cls="sm")

    # the risk, ceded
    f.circle(BCX, 304, 54, fill=ROSE, fill_opacity="0.12", stroke=ROSE,
             stroke_width="1.3")
    car(f, BCX, 304, 66, BLUE)
    f.text(BCX, 376, "pool", cls="sm bold")
    f.arrow(282, 206, 226, 268, colour=ROSE, dash=True)
    f.text(266, 246, "cede", cls="sm", anchor="start")
    return f


@figure("Meredith Principles", "Workers' compensation as a temple of 1913 held up by "
        "five columns: no-fault compensation, collective liability, security of "
        "payment, exclusive jurisdiction and an independent board", width=WID)
def meredith_principles() -> Fig:
    f = vcard()

    f.polygon([(34, 142), (BCX, 92), (326, 142)], fill=TEAL, fill_opacity="0.18",
              stroke=TEAL, stroke_width="1.4", stroke_linejoin="round")
    f.text(BCX, 130, "1913", cls="bold")
    f.rect(34, 144, 292, 14, rx=2, fill=TEAL, fill_opacity="0.30", stroke=TEAL,
           stroke_width="1.2")
    for i, (name, colour) in enumerate(
            [("no-fault", GREEN), ("collective", TEAL), ("security", BLUE),
             ("exclusive", VIOLET), ("independent", AMBER)]):
        x = 64 + i * 58
        f.rect(x - 17, 162, 34, 172, rx=3, fill=colour, fill_opacity="0.20",
               stroke=colour, stroke_width="1.3")
        f.text(x, 252, name, cls="sm", transform=f"rotate(-90 {x} 248)")
    f.rect(30, 338, 300, 14, rx=2, fill=TEAL, fill_opacity="0.30", stroke=TEAL,
           stroke_width="1.2")
    f.rect(22, 354, 316, 14, rx=2, fill=TEAL, fill_opacity="0.30", stroke=TEAL,
           stroke_width="1.2")
    return f


@figure("Public Auto Insurance", "The four provinces with public auto: in BC, "
        "Saskatchewan and Manitoba the Crown insurer covers the driver and the car, "
        "while in Quebec it covers only bodily injury and private insurers cover the "
        "car", width=WID)
def public_auto_insurance() -> Fig:
    f = vcard()

    for i, prov in enumerate(["BC", "SK", "MB", "QC"]):
        y = 108 + i * 76
        f.text(40, y + 5, prov, cls="bold")
        building(f, 88, y, 40, BLUE)
        f.arrow(112, y, 144, y, colour=BLUE)
        quebec = prov == "QC"
        # what the Crown insurer covers — all of it, or only the injury
        f.rect(148, y - 27, (56 if quebec else 126), 54, rx=8, fill=BLUE,
               fill_opacity="0.10", stroke=BLUE, stroke_width="1.2")
        person(f, 175, y + 2, 40, BLUE)
        if quebec:
            f.rect(210, y - 27, 64, 54, rx=8, fill=AMBER, fill_opacity="0.10",
                   stroke=AMBER, stroke_width="1.2")
            car(f, 242, y + 4, 50, AMBER)
            f.arrow(302, y, 278, y, colour=AMBER)
            tower(f, 316, y, 40, AMBER)
            f.text(316, y + 36, "private", cls="sm")
        else:
            car(f, 240, y + 4, 50, BLUE)
    return f


@figure("Disaster Financial Assistance Arrangements", "Provincial disaster cost per "
        "capita along the bottom: the federal share, shaded, steps up from nothing to "
        "50%, 75% and 90% as the cost grows, and the province bears the rest",
        width=WID)
def dfaa() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 30, 0, 100, left=52, right=18, top=24, bottom=40)
    for a, b, share in [(0, 3, 0), (3, 9, 50), (9, 18, 75), (18, 30, 90)]:
        x0, x1 = ax.px(a), ax.px(b)
        f.rect(x0, ax.py(100), x1 - x0, ax.py(share) - ax.py(100), fill=AMBER,
               fill_opacity="0.16", stroke="none")
        if share:
            f.rect(x0, ax.py(share), x1 - x0, ax.py(0) - ax.py(share), fill=BLUE,
                   fill_opacity="0.30", stroke="none")
    ax.polyline([(0, 0), (3, 0), (3, 50), (9, 50), (9, 75), (18, 75), (18, 90),
                 (30, 90)], colour=BLUE, width=2.4)
    ax.frame(xticks=[], yticks=[50, 75, 90, 100], yfmt=lambda v: f"{v:.0f}%")
    ax.label(20, 42, "Ottawa", cls="bold")
    ax.label(13.5, 84, "province", cls="bold")
    f.text(ax.x1, ax.y1 + 20, "cost per capita", cls="sm dim", anchor="end")
    return f


@figure("Social Insurance", "Contribution against each person's own expected cost: "
        "private insurance charges along the diagonal, social insurance along a "
        "flatter line, so low-cost members pay more than their cost and high-cost "
        "members less", width=WID)
def social_insurance() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 10, left=40, right=16, top=24, bottom=40)

    def social(x):
        return 3.4 + (x - 0.5) * 3.2 / 9

    f.polygon([ax.p(0.5, 0.5), ax.p(5, 5), ax.p(0.5, social(0.5))], fill=AMBER,
              fill_opacity="0.22", stroke="none")
    f.polygon([ax.p(5, 5), ax.p(9.5, 9.5), ax.p(9.5, social(9.5))], fill=GREEN,
              fill_opacity="0.22", stroke="none")
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.polyline([(0.5, 0.5), (9.5, 9.5)], colour=BLUE, width=2, dash=True)
    ax.polyline([(0.5, social(0.5)), (9.5, social(9.5))], colour=ROSE, width=2.4)
    ax.label(7.2, 8.6, "private", cls="sm bold")
    ax.label(7.8, 5.2, "social", cls="sm bold")
    f.text(ax.x1, ax.y1 + 20, "own expected cost", cls="sm dim", anchor="end")
    f.text(ax.x0 + 6, ax.y0 - 6, "contribution", cls="sm dim", anchor="start")
    return f


@figure("Risk Transfer", "The amount and the timing of loss each either transferred "
        "or not: only a contract transferring both is reinsurance, and every other "
        "combination is accounted for as a deposit", width=WID)
def risk_transfer() -> Fig:
    f = vcard()

    x0, xm, x1 = 64, 196, 326
    y1, ym, y0 = 92, 224, 352
    f.polygon([(x0, y1), (xm, y1), (xm, ym), (x1, ym), (x1, y0), (x0, y0)],
              fill=AMBER, fill_opacity="0.10", stroke="none")
    f.rect(xm, y1, x1 - xm, ym - y1, fill=GREEN, fill_opacity="0.18", stroke=GREEN,
           stroke_width="1.3")
    f.line(xm, ym, xm, y0, cls="thin dash", stroke="var(--dim)", stroke_width="1.2")
    f.line(x0, ym, xm, ym, cls="thin dash", stroke="var(--dim)", stroke_width="1.2")
    f.arrow(x0, y0, x1 + 12, y0, colour="var(--axis)", width=1.2)
    f.arrow(x0, y0, x0, y1 - 12, colour="var(--axis)", width=1.2)
    f.text(x1, y0 + 20, "when", cls="sm dim", anchor="end")
    f.text(x0 - 10, y1 + 4, "how much", cls="sm dim", anchor="end",
           transform=f"rotate(-90 {x0 - 10} {y1 + 4})")

    shield(f, (xm + x1) / 2, 150, 64, GREEN)
    f.text((xm + x1) / 2, 208, "reinsurance", cls="sm bold")
    coins(f, (x0 + xm) / 2, 312, 4, 16, AMBER)
    f.text((x0 + xm) / 2, 334, "deposit", cls="sm bold")
    return f


@figure("Adverse Selection", "The death spiral over rounds of repricing: the price "
        "climbs as the number insured falls, each round losing the best risks left",
        width=WID)
def adverse_selection() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 6, 0, 100, left=36, right=18, top=24, bottom=40)
    ax.frame(xticks=[], yticks=[], arrows=True)
    price = [(0, 30), (1, 34), (2, 40), (3, 49), (4, 62), (5, 80), (6, 100)]
    insured = [(0, 96), (1, 82), (2, 66), (3, 50), (4, 34), (5, 20), (6, 10)]
    ax.polyline(price, colour=ROSE, width=2.6)
    ax.polyline(insured, colour=BLUE, width=2.6)
    for (x, p), (_, q) in zip(price, insured):
        ax.point(x, p, colour=ROSE, r=3.4)
        ax.point(x, q, colour=BLUE, r=3.4)
    ax.label(4.2, 86, "price", cls="bold")
    ax.label(1.3, 90, "insureds", cls="bold", anchor="start")
    f.text(ax.x1, ax.y1 + 20, "rounds", cls="sm dim", anchor="end")
    return f


def _moral_burst(f: Fig, cx, cy, r, colour):
    """A spiky burst marking the moment of loss."""
    pts = []
    for k in range(16):
        rr = r if k % 2 == 0 else r * 0.45
        a = math.pi * k / 8
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    f.polygon(pts, fill=colour, fill_opacity="0.30", stroke=colour,
              stroke_width="1.3", stroke_linejoin="round")


@figure("Moral Hazard", "An insurer paying out along a timeline of one loss: before "
        "it, less care of the house; after it, a claimant who spends more and a "
        "provider who bills more, because the insurer pays", width=WID)
def moral_hazard() -> Fig:
    f = vcard()

    tower(f, BCX, 112, 60, AMBER)
    f.text(BCX + 26, 116, "insurer", cls="sm bold", anchor="start")

    y = 316
    f.arrow(30, y, 334, y, colour="var(--axis)", width=1.2)
    _moral_burst(f, 128, y, 17, ROSE)
    f.text(128, y + 32, "loss", cls="sm bold")

    house(f, 66, 266, 54, BLUE)
    f.text(66, y + 32, "ex ante", cls="sm")
    person(f, 200, 266, 52, BLUE)
    f.text(200, y + 32, "ex post", cls="sm")
    cross(f, 290, 268, 42, TEAL)
    f.text(290, y + 32, "provider", cls="sm")

    for x, yy in ((80, 232), (198, 230), (282, 240)):
        f.arrow(BCX + (x - BCX) * 0.12, 146, x, yy, colour=AMBER)
    f.text(236, 196, "pays", cls="sm", anchor="start")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# C. Financial reporting, solvency and professional responsibility
# ═══════════════════════════════════════════════════════════════════════════

@figure("Solvency", "Three hurdles against one level of assets: liabilities alone, "
        "liabilities plus the required buffer — the one OSFI enforces — and that again "
        "with a stress on top", width=WID)
def solvency() -> Fig:
    f = vcard()

    base, top = 350, 112
    f.line(34, top, 326, top, cls="thin dash", stroke=BLUE, stroke_width="1.6")
    f.text(36, top - 8, "assets", cls="sm bold", anchor="start")
    liab, buffer, stress = 232, 172, 136
    for i, (name, levels) in enumerate(
            [("balance sheet", [(liab, AMBER)]),
             ("regulatory", [(liab, AMBER), (buffer, ROSE)]),
             ("economic", [(liab, AMBER), (buffer, ROSE), (stress, VIOLET)])]):
        x = 44 + i * 96
        prev = base
        for y, colour in levels:
            dashed = colour == VIOLET
            f.rect(x, y, 80, prev - y, rx=3, fill=colour,
                   fill_opacity="0.10" if dashed else "0.28", stroke=colour,
                   stroke_width="1.3", stroke_dasharray="4 3" if dashed else None)
            prev = y
        f.text(x + 40, base + 18, name, cls="sm bold")
    building(f, 44 + 96 + 40, 142, 40, ROSE)
    for y0, y1, name in ((stress, buffer, "stress"), (buffer, liab, "buffer"),
                         (liab, base, "liabilities")):
        f.text(44 + 2 * 96 + 40, (y0 + y1) / 2 + 4, name, cls="sm")
    f.line(30, base, 330, base, cls="axis")
    return f


@figure("Canadian Annual Return", "Three insurers each filing the same standardised "
        "annual return to OSFI, so their numbers line up side by side", width=WID)
def canadian_annual_return() -> Fig:
    f = vcard()

    building(f, BCX, 110, 64, ROSE)
    f.text(BCX + 40, 116, "OSFI", cls="bold", anchor="start")
    for x, colour in ((80, BLUE), (BCX, TEAL), (280, VIOLET)):
        document(f, x, 228, 58, AMBER, lines=4)
        f.arrow(x + (BCX - x) * 0.1, 194, BCX + (x - BCX) * 0.24, 150, colour=AMBER)
        tower(f, x, 332, 56, colour)
        f.arrow(x, 302, x, 262, colour=colour)
    f.text(308, 232, "return", cls="sm", anchor="start")
    f.text(BCX, 380, "insurers", cls="sm bold")
    return f


@figure("Appointed Actuary", "Inside the insurer, the board appoints the Appointed Actuary "
        "and receives the valuation; the Appointed Actuary can also escalate outside the "
        "company to OSFI", width=WID)
def appointed_actuary() -> Fig:
    f = vcard()

    # the insurer: the board, and the actuary it appoints
    f.rect(30, 84, 200, 292, rx=12, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    f.text(44, 104, "insurer", cls="sm dim", anchor="start")
    for x in (100, 130, 160):
        person(f, x, 146, 34, VIOLET)
    f.text(130, 186, "board", cls="sm bold")
    f.arrow(112, 198, 112, 250, colour=VIOLET)
    f.text(104, 228, "appoints", cls="sm", anchor="end")
    f.arrow(148, 250, 148, 198, colour=BLUE, dash=True)
    f.text(156, 228, "reports", cls="sm", anchor="start")
    person(f, 130, 290, 50, BLUE)
    f.text(130, 336, "AA", cls="bold")
    document(f, 66, 296, 38, AMBER)
    f.text(66, 336, "valuation", cls="sm")

    # the regulator outside it
    building(f, 290, 202, 60, ROSE)
    f.text(290, 250, "OSFI", cls="bold")
    f.arrow(160, 286, 268, 232, colour=ROSE, width=2)
    f.text(236, 290, "escalates", cls="sm", anchor="middle")
    return f


@figure("Insurance Companies Act", "The Act as a statute branching into the "
        "Appointed Actuary's footing: the board's appointment (s. 357), the valuation "
        "(s. 365), immunity (s. 361) and adequate capital (s. 515)", width=WID)
def insurance_companies_act() -> Fig:
    f = vcard()

    document(f, BCX, 116, 70, VIOLET, lines=4)
    f.text(BCX + 36, 124, "ICA", cls="bold", anchor="start")
    parts = [(58, "board", "s. 357"), (138, "valuation", "s. 365"),
             (222, "immunity", "s. 361"), (302, "capital", "s. 515")]
    for x, name, sec in parts:
        f.arrow(BCX + (x - BCX) * 0.18, 156, x, 250, colour=VIOLET, width=1.4)
        f.text(x, 340, name, cls="sm bold")
        f.text(x, 358, sec, cls="sm dim")
    for dx in (-15, 0, 15):
        person(f, 58 + dx, 292, 28, BLUE)
    document(f, 138, 294, 50, AMBER)
    shield(f, 222, 294, 54, GREEN)
    coins(f, 302, 318, 4, 15, TEAL)
    return f


@figure("Financial Position", "The running insurer's balance sheet as two columns of "
        "equal height — $1,240M of assets against $980M of liabilities and $260M of "
        "equity — and the equity cut by $12M of intangibles to $248M of capital "
        "available", width=WID)
def financial_position() -> Fig:
    f = vcard()

    base, scale = 374, 262 / ASSETS
    top = base - ASSETS * scale
    f.rect(36, top, 100, ASSETS * scale, rx=5, fill=BLUE, fill_opacity="0.24",
           stroke=BLUE, stroke_width="1.3")
    f.text(86, (top + base) / 2 - 4, "assets", cls="sm bold")
    f.text(86, (top + base) / 2 + 12, f"{ASSETS:,.0f}", cls="sm")
    y_eq = base - LIABS * scale
    f.rect(158, y_eq, 100, LIABS * scale, rx=5, fill=AMBER, fill_opacity="0.24",
           stroke=AMBER, stroke_width="1.3")
    f.text(208, (y_eq + base) / 2 - 4, "liabilities", cls="sm bold")
    f.text(208, (y_eq + base) / 2 + 12, f"{LIABS:,.0f}", cls="sm")
    f.rect(158, top, 100, y_eq - top, rx=5, fill=GREEN, fill_opacity="0.30",
           stroke=GREEN, stroke_width="1.3")
    f.text(208, (top + y_eq) / 2 - 4, "equity", cls="sm bold")
    f.text(208, (top + y_eq) / 2 + 12, f"{EQUITY:,.0f}", cls="sm")

    # equity less intangibles is where capital available starts
    cap_top = y_eq - CAP_AVAIL * scale
    f.arrow(262, (top + y_eq) / 2, 288, (top + y_eq) / 2, colour=GREEN)
    f.text(275, (top + y_eq) / 2 - 8, f"−{INTANGIBLES:.0f}", cls="sm")
    f.rect(292, cap_top, 38, y_eq - cap_top, rx=4, fill=GREEN, fill_opacity="0.50",
           stroke=GREEN, stroke_width="1.3")
    f.text(311, (cap_top + y_eq) / 2 + 4, f"{CAP_AVAIL:.0f}", cls="sm bold")
    f.text(311, y_eq + 18, "capital", cls="sm")
    return f


@figure("Net Income", "The running insurer's net income as a waterfall: the $38M "
        "insurance service result and the $22M net financial result as separate "
        "steps, less $6M of other expenses and tax, to $39M", width=WID)
def net_income() -> Fig:
    f = vcard()

    tax = (ISR + NET_FIN + OTHER) * TAX
    _waterfall(f, 350,
               [("ISR", ISR, BLUE), ("financial", NET_FIN, TEAL),
                ("other", OTHER, AMBER), ("tax", -tax, ROSE),
                ("net", None, GREEN)],
               x0=40, x1=322, top=236, fmt=lambda v: f"{abs(v):,.0f}")
    return f


@figure("Comprehensive Income", "The running insurer's $39M of net income less $14M "
        "of other comprehensive income, leaving $25M of comprehensive income",
        width=WID)
def comprehensive_income() -> Fig:
    f = vcard()

    _waterfall(f, 350,
               [("net income", NET_INCOME, GREEN), ("OCI", OCI, ROSE),
                ("comprehensive", None, BLUE)],
               x0=54, x1=306, top=236, bar_frac=0.56,
               fmt=lambda v: f"{abs(v):,.0f}")
    return f


@figure("Statement of Changes in Equity", "The running insurer's equity as a "
        "waterfall from $245M opening, up $39M of net income, down $14M of OCI and "
        "$10M of dividends, to $260M closing", width=WID)
def statement_of_changes_in_equity() -> Fig:
    f = vcard()

    dividends = 10.4
    opening = EQUITY - COMP_INCOME + dividends                  # 245
    _waterfall(f, 350,
               [("open", opening, TEAL), ("net income", NET_INCOME, GREEN),
                ("OCI", OCI, ROSE), ("dividends", -dividends, AMBER),
                ("close", None, BLUE)],
               x0=36, x1=326, top=236, bar_frac=0.62,
               fmt=lambda v: f"{abs(v):,.0f}")
    return f


@figure("Quarterly Return", "The MCT ratio over a year: the two annual returns "
        "show only its start and end, while the three quarterly returns between "
        "them catch it falling through the supervisory target", width=WID)
def quarterly_return() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 4, 100, 180, left=48, right=20, top=24, bottom=40)
    ax.hline(SUP_TARGET * 100, colour=AMBER)
    ax.frame(xticks=[0, 1, 2, 3, 4], yticks=[100, 150],
             xfmt=lambda t: ["Dec", "Mar", "Jun", "Sep", "Dec"][int(t)],
             yfmt=lambda v: f"{v:.0f}%")
    pts = [(0, 168), (1, 160), (2, 149), (3, 133), (4, 118)]
    ax.polyline(pts, colour=ROSE, width=2.4)
    for x, y in pts[1:-1]:
        ax.point(x, y, colour=ROSE, r=4)
    for x, y in (pts[0], pts[-1]):
        ax.point(x, y, colour=BLUE, r=6)
    ax.label(0, 168, "annual", cls="sm bold", dy=-12, anchor="start", dx=-6)
    ax.label(4, 118, "annual", cls="sm bold", dy=20, anchor="end", dx=6)
    ax.label(1.15, 167, "quarterly", cls="sm bold", anchor="start")
    ax.label(0.2, 150, "target", cls="sm", dy=14, anchor="start")
    return f


@figure("Notes to Financial Statements", "Two insurers holding the same risk report "
        "different liabilities, because each chose a different risk adjustment; the "
        "notes attached to each column say which", width=WID)
def notes_to_financial_statements() -> Fig:
    f = vcard()

    base, pv = 368, 214
    for x, name, ra in ((90, "A", 176), (230, "B", 140)):
        tower(f, x, 98, 44, TEAL)
        f.text(x + 20, 104, name, cls="bold", anchor="start")
        f.rect(x - 40, pv, 80, base - pv, rx=4, fill=BLUE, fill_opacity="0.28",
               stroke=BLUE, stroke_width="1.3")
        f.rect(x - 40, ra, 80, pv - ra, rx=4, fill=VIOLET, fill_opacity="0.34",
               stroke=VIOLET, stroke_width="1.3")
        f.text(x, (ra + pv) / 2 + 4, "RA", cls="sm bold")
        document(f, x + 58, (ra + pv) / 2, 34, AMBER)
        f.line(x + 40, (ra + pv) / 2, x + 46, (ra + pv) / 2, cls="",
               stroke=AMBER, stroke_width="1.4")
    f.text(90, 296, "PV", cls="sm bold")
    f.text(230, 296, "PV", cls="sm bold")
    f.line(40, pv, 280, pv, cls="thin dash", stroke="var(--dim)", stroke_width="1.2")
    f.text(288, pv + 4, "same", cls="sm dim", anchor="start")
    f.text(288, 152, "notes", cls="sm")
    return f


@figure("MSA Ratios", "Earned premium as 100% beside claims of 64% and expenses of "
        "31%: a 95% combined ratio, leaving a 5% underwriting profit", width=WID)
def msa_ratios() -> Fig:
    f = vcard()

    base, full = 368, 276
    top = base - full
    f.rect(52, top, 90, full, rx=4, fill=TEAL, fill_opacity="0.24", stroke=TEAL,
           stroke_width="1.3")
    f.text(97, (top + base) / 2 - 4, "premium", cls="sm bold")
    f.text(97, (top + base) / 2 + 12, "100%", cls="sm")
    y = base
    for share, name, colour in ((0.64, "loss", BLUE), (0.31, "expense", AMBER)):
        h = full * share
        f.rect(176, y - h, 90, h, rx=4, fill=colour, fill_opacity="0.30",
               stroke=colour, stroke_width="1.3")
        f.text(221, y - h / 2 - 4, name, cls="sm bold")
        f.text(221, y - h / 2 + 12, f"{share:.0%}", cls="sm")
        y -= h
    f.rect(176, top, 90, y - top, rx=2, fill=GREEN, fill_opacity="0.30",
           stroke=GREEN, stroke_width="1.2", stroke_dasharray="3 2")
    f.line(142, top, 300, top, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.1")
    f.text(272, top + 5, "profit 5%", cls="sm", anchor="start")
    # the combined ratio: loss and expense together
    f.path(f"M272,{y:.1f} h8 V{base} h-8", cls="thin", stroke="var(--dim)",
           stroke_width="1.2")
    f.text(286, (y + base) / 2 + 4, "95%", cls="bold", anchor="start")
    f.line(40, base, 320, base, cls="axis")
    return f


@figure("Accepted Actuarial Practice", "Parliament pointing, through s. 365 of the "
        "Insurance Companies Act, at the profession's own stack of rules: the Rules of "
        "Professional Conduct, the Standards of Practice, the educational notes and "
        "general practice", width=WID)
def accepted_actuarial_practice() -> Fig:
    f = vcard()

    building(f, 62, 146, 58, ROSE)
    f.text(62, 194, "Parliament", cls="sm bold")
    f.arrow(92, 174, 146, 214, colour=ROSE, width=1.8)
    f.text(104, 222, "s. 365", cls="sm", anchor="end")
    for i, (name, colour, w) in enumerate(
            [("rules", VIOLET, 100), ("standards", BLUE, 148),
             ("notes", TEAL, 196), ("practice", GREEN, 216)]):
        y = 104 + i * 66
        guidance = i >= 2
        f.rect(226 - w / 2, y, w, 58, rx=5, fill=colour,
               fill_opacity="0.14" if guidance else "0.30", stroke=colour,
               stroke_width="1.3", stroke_dasharray="4 3" if guidance else None)
        f.text(226, y + 33, name, cls="sm bold")
    return f


@figure("IFRS 17", "A policy's coverage on a timeline at the reporting date: the "
        "coverage still to come is the liability for remaining coverage, and claims "
        "already incurred but not yet paid are the liability for incurred claims",
        width=WID)
def ifrs_17() -> Fig:
    f = vcard()

    y, x_issue, x_now, x_end = 266, 52, 172, 300
    # coverage above the line: given, and still to come
    f.rect(x_issue, 170, x_now - x_issue, 60, rx=4, fill="var(--soft)",
           stroke="var(--edge)", stroke_width="1.2")
    f.rect(x_now, 170, x_end - x_now, 60, rx=4, fill=BLUE, fill_opacity="0.30",
           stroke=BLUE, stroke_width="1.3")
    f.text((x_now + x_end) / 2, 205, "LRC", cls="bold")
    f.arrow(30, y, 334, y, colour="var(--axis)", width=1.2)
    # claims below it: incurred before the date, paid after it
    for x in (80, 116, 150):
        _moral_burst(f, x, 322, 13, ROSE)
    f.arrow(166, 322, x_now + 8, 322, colour=AMBER)
    f.rect(x_now + 12, 300, x_end - x_now + 18, 44, rx=4, fill=AMBER,
           fill_opacity="0.30", stroke=AMBER, stroke_width="1.3")
    f.text((x_now + x_end) / 2 + 15, 327, "LIC", cls="bold")
    f.line(x_now, 136, x_now, 362, cls="thin dash", stroke="var(--ink)",
           stroke_width="1.3")
    f.text(x_now, 126, "now", cls="sm bold")
    f.text(x_issue, y + 18, "issue", cls="sm dim")
    f.text(x_end, y + 18, "expiry", cls="sm dim")
    return f


@figure("Insurance Contract Liabilities", "The running insurer's $640M contract "
        "liability as one bar split into a $190M liability for remaining coverage, "
        "fed by premium, and a $450M liability for incurred claims, fed by claims",
        width=WID)
def insurance_contract_liabilities() -> Fig:
    f = vcard()

    x0, x1 = 40, 320
    split = x0 + (x1 - x0) * LRC_CO / ICL
    brace(f, x0, x1, 162, depth=10, below=False, label=f"{ICL:,.0f}",
          label_cls="bold")
    f.rect(x0, 170, split - x0, 66, rx=5, fill=BLUE, fill_opacity="0.30",
           stroke=BLUE, stroke_width="1.3")
    f.rect(split, 170, x1 - split, 66, rx=5, fill=AMBER, fill_opacity="0.30",
           stroke=AMBER, stroke_width="1.3")
    f.text((x0 + split) / 2, 208, f"LRC {LRC_CO:.0f}", cls="bold")
    f.text((split + x1) / 2, 208, f"LIC {LIC_CO:.0f}", cls="bold")

    # what drives each half
    lrc_x, lic_x = (x0 + split) / 2, (split + x1) / 2
    f.arrow(lrc_x, 278, lrc_x, 242, colour=BLUE)
    coins(f, lrc_x, 330, 4, 16, BLUE)
    f.text(lrc_x, 352, "premium", cls="sm")
    f.arrow(lic_x, 278, lic_x, 242, colour=AMBER)
    for dx in (-34, 0, 34):
        _moral_burst(f, lic_x + dx, 306, 14, ROSE)
    f.text(lic_x, 352, "claims", cls="sm")
    return f


@figure("Liability for Remaining Coverage", "The running PAA book at 31 December: "
        "$12.0M of unearned premium less $2.4M of acquisition cash flows carries an "
        "LRC of $9.6M, which the $1.9M loss component tops up to the $11.5M of "
        "fulfilment cash flows", width=WID)
def liability_for_remaining_coverage() -> Fig:
    f = vcard()

    base, scale, bw = 350, 19.5, 52
    unearned = PAA_PREM / 2
    acq = PAA_ACQ / 2

    def y(v):
        return base - v * scale

    cols = [(70, "unearned", [(0, unearned, BLUE)], f"{unearned:.1f}"),
            (145, "acquisition", [(PAA_LRC, unearned, AMBER)], f"−{acq:.1f}"),
            (220, "LRC", [(0, PAA_LRC, TEAL), (PAA_LRC, PAA_FCF, ROSE)], None),
            (295, "FCF", [(0, PAA_FCF, VIOLET)], f"{PAA_FCF:.1f}")]
    for cx, name, segs, value in cols:
        for lo, hi, colour in segs:
            f.rect(cx - bw / 2, y(hi), bw, y(lo) - y(hi), rx=3, fill=colour,
                   fill_opacity="0.34", stroke=colour, stroke_width="1.2")
        if value:
            f.text(cx, y(segs[-1][1]) - 8, value, cls="sm")
        f.text(cx, base + 17, name, cls="sm dim")
    f.text(220, (y(0) + y(PAA_LRC)) / 2 + 4, f"{PAA_LRC:.1f}", cls="sm bold")
    f.text(220, (y(PAA_LRC) + y(PAA_FCF)) / 2 + 4, f"{PAA_LOSS:.1f}", cls="sm bold")
    f.line(190, y(PAA_FCF), 324, y(PAA_FCF), cls="thin dash", stroke=VIOLET,
           stroke_width="1.3")
    f.line(38, base, 326, base, cls="axis")
    return f


@figure("Liability for Incurred Claims", "The running insurer's LIC as a waterfall: "
        "$486M of undiscounted claims, less $66M of discount, plus a $30M risk "
        "adjustment, to $450M", width=WID)
def liability_for_incurred_claims() -> Fig:
    f = vcard()

    undiscounted = 486.0
    _waterfall(f, 350,
               [("undiscounted", undiscounted, "var(--dim)"),
                ("discount", LIC_FCF - undiscounted, TEAL), ("RA", LIC_RA, VIOLET),
                ("LIC", None, BLUE)],
               x0=44, x1=318, top=236, bar_frac=0.58,
               fmt=lambda v: f"{abs(v):,.0f}")
    return f


@figure("Fulfilment Cash Flows", "Five expected future cash flows, each shrunk by "
        "discounting and gathered at time zero into a present value, with the risk "
        "adjustment stacked on top", width=WID)
def fulfilment_cash_flows() -> Fig:
    f = vcard()

    base, v = 350, 0.88
    xs = [150, 186, 222, 258, 294]
    flows = [110, 86, 64, 44, 26]
    pv = 0.0
    for t, (x, h) in enumerate(zip(xs, flows), start=1):
        d = h * v ** t
        pv += d
        f.rect(x - 12, base - h, 24, h, rx=2, fill="none", stroke="var(--dim)",
               stroke_width="1.2", stroke_dasharray="3 2")
        f.rect(x - 12, base - d, 24, d, rx=2, fill=BLUE, fill_opacity="0.55")
        f.line(x, base, x, base + 4, cls="tick")
        f.text(x, base + 17, str(t), cls="sm dim")
    f.arrow(40, base, 330, base, colour="var(--axis)", width=1.2)
    f.text(186, base - flows[1] - 10, "expected", cls="sm", anchor="start")
    f.arrow(136, 290, 104, 290, colour=BLUE)
    f.text(120, 282, "× v", cls="sm")

    ra = 30
    f.rect(52, base - pv, 44, pv, rx=3, fill=BLUE, fill_opacity="0.34", stroke=BLUE,
           stroke_width="1.3")
    f.rect(52, base - pv - ra, 44, ra, rx=3, fill=VIOLET, fill_opacity="0.40",
           stroke=VIOLET, stroke_width="1.3")
    f.text(74, base - pv / 2 + 4, "PV", cls="sm bold")
    f.text(74, base - pv - ra / 2 + 4, "RA", cls="sm bold")
    f.text(74, base + 17, "0", cls="sm dim")
    return f


@figure("Risk Adjustment for Non-Financial Risk", "The liability's probability "
        "distribution with its mean and its 75th percentile marked; the risk "
        "adjustment is the gap between them", width=WID)
def risk_adjustment() -> Fig:
    f = vcard()

    def density(x):
        return 0.40 * math.exp(-0.5 * (x - 3.4) ** 2 / 1.6)

    ax = vaxes(f, 0, 10, 0, 0.44, left=24, right=16, top=30, bottom=64)
    ax.area(density, 0, 3.4, colour=BLUE, opacity="0.16")
    ax.area(density, 3.4, 6.0, colour=VIOLET, opacity="0.30")
    ax.area(density, 6.0, 10, colour=BLUE, opacity="0.16")
    ax.curve(density, colour=BLUE, width=2.2)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.vline(3.4, colour="var(--dim)", y_top=density(3.4))
    ax.vline(6.0, colour=VIOLET, y_top=0.30)
    ax.label(3.4, density(3.4), "mean", cls="sm", dy=-8)
    ax.label(6.0, 0.30, "75th", cls="sm bold", dy=-8)
    brace(f, ax.px(3.4), ax.px(6.0), ax.y1 + 8, depth=9, colour=VIOLET,
          label="RA", label_cls="bold")
    return f


@figure("IFRS 17 Discount Rates", "The discount rate built two ways: bottom-up, a "
        "risk-free rate plus an illiquidity premium; top-down, an asset yield less its "
        "credit and market risk — landing close, but not necessarily together",
        width=WID)
def ifrs_17_discount_rates() -> Fig:
    f = vcard()

    base = 356
    # bottom-up: built from the risk-free rate
    f.rect(60, 236, 96, base - 236, rx=5, fill=BLUE, fill_opacity="0.30",
           stroke=BLUE, stroke_width="1.2")
    f.text(108, 300, "risk-free", cls="sm")
    f.rect(60, 180, 96, 54, rx=5, fill=TEAL, fill_opacity="0.36", stroke=TEAL,
           stroke_width="1.2")
    f.text(108, 211, "illiquidity", cls="sm")
    f.arrow(40, 340, 40, 186, colour=BLUE, width=1.6)
    # top-down: cut down from an asset yield
    f.rect(204, 170, 96, base - 170, rx=5, fill=AMBER, fill_opacity="0.30",
           stroke=AMBER, stroke_width="1.2")
    f.text(252, 270, "asset yield", cls="sm")
    f.rect(204, 108, 96, 60, rx=5, fill=ROSE, fill_opacity="0.10", stroke=ROSE,
           stroke_width="1.2", stroke_dasharray="4 3")
    f.text(252, 142, "credit risk", cls="sm")
    f.arrow(320, 112, 320, 164, colour=ROSE, width=1.6)
    for x0, x1, yy in ((52, 164, 180), (196, 308, 170)):
        f.line(x0, yy, x1, yy, cls="thin dash", stroke=VIOLET, stroke_width="1.8")
    f.line(34, base, 330, base, cls="axis")
    f.text(108, base + 18, "bottom-up", cls="sm bold")
    f.text(252, base + 18, "top-down", cls="sm bold")
    return f


@figure("Contractual Service Margin", "The running GMM group's $60M premium split into "
        "$44M of outflows, a $5M risk adjustment and an $11M CSM, and the CSM released "
        "as profit over three years of coverage: $4.4M, $3.85M and $2.75M", width=WID)
def contractual_service_margin() -> Fig:
    f = vcard()

    x0, x1 = 40, 320
    per = (x1 - x0) / GMM_PREM
    brace(f, x0, x1, 112, depth=10, below=False, label=f"premium {GMM_PREM:.0f}",
          label_cls="sm bold")
    x = x0
    for value, name, colour in ((GMM_OUT, f"outflows {GMM_OUT:.0f}", AMBER),
                                (GMM_RA, "RA", VIOLET),
                                (CSM0, f"CSM {CSM0:.0f}", GREEN)):
        w = value * per
        f.rect(x, 118, w, 44, rx=4, fill=colour, fill_opacity="0.30", stroke=colour,
               stroke_width="1.3")
        f.text(x + w / 2, 144, name, cls="sm bold")
        x += w
    csm_x = x1 - CSM0 * per / 2

    # the CSM, released on coverage units
    base, scale = 352, 30
    f.arrow(csm_x, 168, 258, 226, colour=GREEN)
    for k, share in enumerate(CU):
        v = CSM0 * share
        cx = 100 + k * 80
        f.rect(cx - 24, base - v * scale, 48, v * scale, rx=3, fill=GREEN,
               fill_opacity="0.55")
        f.text(cx, base - v * scale - 7, f"{v:.2f}".rstrip("0").rstrip("."),
               cls="sm")
        f.text(cx, base + 17, f"yr {k + 1}", cls="sm dim")
    f.line(52, base, 308, base, cls="axis")
    return f


@figure("General Measurement Model", "The running GMM group's liability as three "
        "stacked building blocks — $44M present value of cash flows, a $5M risk "
        "adjustment and an $11M CSM — with an arrow looping round to show all three "
        "remeasured every period", width=WID)
def general_measurement_model() -> Fig:
    f = vcard()

    base, scale, x0, w = 364, 4.5, 124, 112
    y = base
    for value, name, side, colour in ((GMM_OUT, f"PV {GMM_OUT:.0f}", "cost", BLUE),
                                      (GMM_RA, f"RA {GMM_RA:.0f}", "risk", VIOLET),
                                      (CSM0, f"CSM {CSM0:.0f}", "profit", GREEN)):
        h = value * scale
        f.rect(x0, y - h, w, h, rx=4, fill=colour, fill_opacity="0.30",
               stroke=colour, stroke_width="1.3")
        f.text(x0 + w / 2, y - h / 2 + 4, name, cls="sm bold")
        f.text(x0 - 10, y - h / 2 + 4, side, cls="sm dim", anchor="end")
        y -= h
    # remeasured each period
    top, bot, rx = y + 10, base - 10, x0 + w + 16
    f.path(f"M{rx},{bot} C{rx + 56},{bot} {rx + 56},{top} {rx + 12},{top}",
           cls="thin", stroke=TEAL, stroke_width="1.8")
    f.arrow(rx + 14, top, rx + 2, top, colour=TEAL, width=1.8)
    f.text(rx + 60, (top + bot) / 2, "remeasure", cls="sm",
           transform=f"rotate(-90 {rx + 60} {(top + bot) / 2})")
    return f


@figure("Premium Allocation Approach", "The running PAA book's LRC over its one-year "
        "coverage: a straight line of unearned premium less acquisition cash flows, "
        "$9.6M at 31 December, running almost on top of the curve the general model "
        "would give", width=WID)
def premium_allocation_approach() -> Fig:
    f = vcard()

    start = PAA_PREM - PAA_ACQ                                  # 19.2
    ax = vaxes(f, 0, 1, 0, 22, left=44, right=18, top=24, bottom=72)
    ax.frame(xticks=[0, 0.5, 1], yticks=[start],
             xfmt=lambda t: {0: "Jul", 0.5: "Dec", 1: "Jun"}[t],
             yfmt=lambda v: f"{v:.1f}")
    ax.curve(lambda t: start * (1 - t) + 1.4 * math.sin(math.pi * t), colour=VIOLET,
             width=2, dash=True)
    ax.polyline([(0, start), (1, 0)], colour=BLUE, width=2.6)
    ax.vline(0.5, colour="var(--dim)", y_top=PAA_LRC)
    ax.point(0.5, PAA_LRC, colour=BLUE, r=4.5)
    ax.label(0.5, PAA_LRC, f"{PAA_LRC:.1f}", cls="sm bold", dx=-10, dy=-6,
             anchor="end")
    ax.label(0.22, start * 0.78, "PAA", cls="bold", dx=-8, dy=18, anchor="end")
    ax.label(0.68, start * 0.32 + 1.2, "GMM", cls="bold", dx=8, anchor="start")
    brace(f, ax.px(0), ax.px(1), ax.y1 + 26, depth=9, colour=BLUE,
          label="1 year", label_cls="sm bold")
    return f


@figure("Contract Boundary", "One timeline with two boundaries: an ordinary annual "
        "policy's ends at the first renewal, where the insurer can reprice, while a "
        "guaranteed-renewable policy's runs through every capped renewal", width=WID)
def contract_boundary() -> Fig:
    f = vcard()

    y = 318
    xs = [56, 146, 236, 326]
    f.arrow(36, y, 336, y, colour="var(--axis)", width=1.2)
    for x, lab in zip(xs, ["issue", "renew", "renew", "renew"]):
        f.line(x, y - 5, x, y + 5, cls="tick")
        f.text(x, y + 19, lab, cls="sm dim")
    f.rect(xs[0], 136, xs[3] - xs[0], 52, rx=5, fill=ROSE, fill_opacity="0.26",
           stroke=ROSE, stroke_width="1.3")
    f.text((xs[0] + xs[3]) / 2, 167, "guaranteed", cls="bold")
    f.rect(xs[0], 222, xs[1] - xs[0], 52, rx=5, fill=BLUE, fill_opacity="0.30",
           stroke=BLUE, stroke_width="1.3")
    f.text((xs[0] + xs[1]) / 2, 253, "annual", cls="bold")
    for x, y_top, colour in ((xs[1], 222, BLUE), (xs[3], 136, ROSE)):
        f.line(x, y_top - 14, x, y, cls="thin dash", stroke=colour, stroke_width="1.6")
    f.text(xs[1] + 8, 252, "reprice", cls="sm", anchor="start")
    return f


@figure("Level of Aggregation", "A personal auto portfolio cut into six groups — two "
        "annual cohorts, each split into onerous, at-risk and profitable contracts — "
        "with a dot for each contract", width=WID)
def level_of_aggregation() -> Fig:
    f = vcard()

    car(f, 52, 104, 50, VIOLET)
    f.text(84, 108, "portfolio", cls="sm bold", anchor="start")
    rows = [("onerous", ROSE, 3), ("at risk", AMBER, 5), ("profitable", GREEN, 8)]
    for j, year in enumerate(["2024", "2025"]):
        cx0 = 114 + j * 110
        f.text(cx0 + 50, 142, year, cls="sm bold")
        for i, (name, colour, n) in enumerate(rows):
            ry = 154 + i * 76
            f.rect(cx0, ry, 100, 68, rx=6, fill=colour, fill_opacity="0.16",
                   stroke=colour, stroke_width="1.3")
            for k in range(n + j):
                dx = 16 + (k % 4) * 22 + (6 if (k // 4) % 2 else 0)
                dy = 16 + (k // 4) * 18 + (k * 7 % 5)
                f.circle(cx0 + dx, ry + dy, 4.5, fill=colour, fill_opacity="0.85")
            if j == 0:
                f.text(cx0 - 10, ry + 38, name, cls="sm", anchor="end")
    return f


@figure("Coverage Units", "The running GMM group's $11M CSM released over three "
        "years on two drivers: evenly by policy count, or front-loaded by sum insured "
        "(40%, 35%, 25%) — the same total landing in different years", width=WID)
def coverage_units() -> Fig:
    f = vcard()

    ax = vaxes(f, 0.4, 3.6, 0, 5, left=40, right=18, top=24, bottom=40)
    ax.frame(xticks=[], yticks=[0, 2, 4])
    even = CSM0 / 3
    for k, share in enumerate(CU, start=1):
        for dx, v, colour in ((-0.19, even, BLUE), (0.19, CSM0 * share, AMBER)):
            x0, x1 = ax.px(k + dx - 0.17), ax.px(k + dx + 0.17)
            f.rect(x0, ax.py(v), x1 - x0, ax.py(0) - ax.py(v), rx=3, fill=colour,
                   fill_opacity="0.55")
        f.text(ax.px(k), ax.y1 + 17, f"yr {k}", cls="sm dim")
    for dx, name in ((-0.19, "policy count"), (0.19, "sum insured")):
        x, yy = ax.px(1 + dx) + 4, (ax.py(0) + ax.py(2.2)) / 2
        f.text(x, yy, name, cls="sm bold", transform=f"rotate(-90 {x - 4} {yy})")
    return f


@figure("Onerous Contract", "Two groups' inflows against their fulfilment cash "
        "flows: where inflows exceed them the margin is deferred as CSM, and where "
        "the fulfilment cash flows exceed the inflows the excess is a loss recognised "
        "at once", width=WID)
def onerous_contract() -> Fig:
    f = vcard()

    base, scale, bw = 330, 2.0, 44
    for x, fcf, gap_colour, gap_name, group in (
            (62, 86, GREEN, "CSM", "profitable"),
            (206, 118, ROSE, "loss", "onerous")):
        inflow = 100
        f.rect(x, base - inflow * scale, bw, inflow * scale, rx=3, fill=BLUE,
               fill_opacity="0.30", stroke=BLUE, stroke_width="1.2")
        f.rect(x + bw + 6, base - fcf * scale, bw, fcf * scale, rx=3, fill=AMBER,
               fill_opacity="0.30", stroke=AMBER, stroke_width="1.2")
        lo, hi = sorted((inflow, fcf))
        gx = x + bw + 6 if fcf < inflow else x
        f.rect(gx, base - hi * scale, bw, (hi - lo) * scale, rx=3, fill=gap_colour,
               fill_opacity="0.40", stroke=gap_colour, stroke_width="1.3",
               stroke_dasharray="4 3" if fcf < inflow else None)
        f.text(gx + bw / 2, base - hi * scale - 8, gap_name, cls="sm bold")
        f.text(x + bw / 2, base + 16, "in", cls="sm dim")
        f.text(x + 1.5 * bw + 6, base + 16, "FCF", cls="sm dim")
        f.text(x + bw + 3, base + 38, group, cls="sm bold")
    f.line(40, base, 320, base, cls="axis")
    return f


@figure("Loss Component", "The running PAA book's LRC as one column — $9.6M of "
        "remaining coverage under a $1.9M loss component — with the coverage part "
        "released to revenue and the loss component released against expenses",
        width=WID)
def loss_component() -> Fig:
    f = vcard()

    base, scale, x0, w = 350, 21, 58, 80
    y_split = base - PAA_LRC * scale
    y_top = y_split - PAA_LOSS * scale
    f.rect(x0, y_split, w, base - y_split, rx=4, fill=BLUE, fill_opacity="0.30",
           stroke=BLUE, stroke_width="1.3")
    f.text(x0 + w / 2, (y_split + base) / 2 + 4, f"{PAA_LRC:.1f}", cls="bold")
    f.rect(x0, y_top, w, y_split - y_top, rx=4, fill=ROSE, fill_opacity="0.34",
           stroke=ROSE, stroke_width="1.3")
    f.text(x0 + w / 2, (y_top + y_split) / 2 + 4, f"{PAA_LOSS:.1f}", cls="bold")
    f.text(x0 + w / 2, base + 18, "LRC", cls="sm bold")

    # where each part goes when it is released
    f.arrow(x0 + w + 6, (y_top + y_split) / 2, 226, (y_top + y_split) / 2,
            colour=ROSE, width=1.8)
    coins(f, 266, (y_top + y_split) / 2 + 22, 4, 16, AMBER)
    f.text(266, (y_top + y_split) / 2 + 44, "expenses", cls="sm")
    f.arrow(x0 + w + 6, (y_split + base) / 2, 226, (y_split + base) / 2,
            colour=BLUE, width=1.8)
    coins(f, 266, (y_split + base) / 2 + 22, 4, 16, BLUE)
    f.text(266, (y_split + base) / 2 + 44, "revenue", cls="sm")
    return f


@figure("Insurance Acquisition Cash Flows", "The running PAA book's $24M premium "
        "less $4.8M of acquisition cash flows leaving a $19.2M LRC, with the deferred "
        "acquisition asset that used to hold them struck out", width=WID)
def insurance_acquisition_cash_flows() -> Fig:
    f = vcard()

    base, top = 350, 236
    scale = top / PAA_PREM
    _waterfall(f, base,
               [("premium", PAA_PREM, BLUE), ("acquisition", -PAA_ACQ, AMBER),
                ("LRC", None, TEAL)],
               x0=36, x1=258, top=top, bar_frac=0.62,
               fmt=lambda v: f"{abs(v):.1f}")
    # the deferred acquisition asset IFRS 17 no longer has
    y0, y1 = base - PAA_PREM * scale, base - (PAA_PREM - PAA_ACQ) * scale
    f.rect(280, y0, 44, y1 - y0, rx=3, fill="none", stroke=AMBER,
           stroke_width="1.3", stroke_dasharray="4 3")
    for a, b in (((280, y0), (324, y1)), ((324, y0), (280, y1))):
        f.line(*a, *b, cls="", stroke=ROSE, stroke_width="2.2", stroke_linecap="round")
    f.text(302, base + 15, "DAC", cls="sm dim")
    return f


@figure("Insurance Revenue", "Year one of the running GMM group's revenue built as a "
        "waterfall: $17.6M of expected claims, $2.0M of risk adjustment and $4.4M of "
        "CSM released, to $24.0M", width=WID)
def insurance_revenue() -> Fig:
    f = vcard()

    share = CU[0]
    _waterfall(f, 350,
               [("claims", GMM_OUT * share, BLUE), ("RA", GMM_RA * share, VIOLET),
                ("CSM", CSM0 * share, GREEN), ("revenue", None, TEAL)],
               x0=44, x1=318, top=236, bar_frac=0.58, fmt=lambda v: f"{v:.1f}")
    return f


@figure("Insurance Service Expenses", "Incurred claims, acquisition cash flows and "
        "onerous losses routed into insurance service expenses, while the discount "
        "unwind is routed past them to insurance finance", width=WID)
def insurance_service_expenses() -> Fig:
    f = vcard()

    # the destination: service expenses above the line, finance below it
    f.rect(206, 96, 122, 196, rx=8, fill=AMBER, fill_opacity="0.16", stroke=AMBER,
           stroke_width="1.3")
    f.text(267, 198, "service expenses", cls="sm bold")
    f.rect(206, 318, 122, 52, rx=8, fill=TEAL, fill_opacity="0.16", stroke=TEAL,
           stroke_width="1.3")
    f.text(267, 348, "finance", cls="bold")

    for dx in (-20, 0, 20):
        _moral_burst(f, 62 + dx, 112, 9, ROSE)
    f.text(62, 138, "claims", cls="sm")
    f.arrow(96, 118, 200, 148, colour=AMBER)
    coins(f, 62, 206, 3, 13, AMBER)
    f.text(62, 224, "acquisition", cls="sm")
    f.arrow(96, 196, 200, 196, colour=AMBER)
    document(f, 62, 268, 34, ROSE)
    f.text(62, 300, "onerous", cls="sm")
    f.arrow(96, 266, 200, 238, colour=AMBER)
    coins(f, 62, 362, 3, 13, TEAL)
    f.text(62, 380, "discount", cls="sm")
    f.arrow(96, 346, 200, 346, colour=TEAL)
    return f


@figure("Insurance Service Result", "The running insurer's insurance service result "
        "as a waterfall: $420M of insurance revenue, less $370M of service expenses "
        "and $12M of net reinsurance expense, to $38M", width=WID)
def insurance_service_result() -> Fig:
    f = vcard()

    _waterfall(f, 350,
               [("revenue", REVENUE, BLUE), ("expenses", -SVC_EXP, AMBER),
                ("reinsurance", -NET_REINS, VIOLET), ("ISR", None, GREEN)],
               x0=40, x1=322, top=236, bar_frac=0.6,
               fmt=lambda v: f"{abs(v):,.0f}")
    return f


@figure("Insurance Finance Income or Expenses", "The liability period by period: "
        "a steady rise from the unwind of discount, then a sudden jump when interest "
        "rates fall", width=WID)
def insurance_finance_income_or_expenses() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 6, 380, 545, left=40, right=18, top=24, bottom=40)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.polyline([(0, 420), (1, 431), (2, 443), (3, 455), (4, 468), (5, 481),
                 (6, 495)], colour=TEAL, width=2.4)
    ax.polyline([(3, 455), (3.06, 500)], colour=ROSE, width=2.4)
    ax.polyline([(3.06, 500), (4, 512), (5, 525), (6, 538)], colour=ROSE,
                width=2.4, dash=True)
    ax.label(1.5, 428, "unwind", cls="bold", dy=18)
    ax.label(3, 500, "rates fall", cls="bold", anchor="end", dx=-8, dy=4)
    f.text(ax.x1, ax.y1 + 20, "period", cls="sm dim", anchor="end")
    f.text(ax.x0 + 6, ax.y0 - 6, "liability", cls="sm dim", anchor="start")
    return f


@figure("Other Comprehensive Income Option", "One period's insurance finance "
        "expense split in two: the systematic amount at the locked-in rate in profit "
        "or loss, and the effect of the rate change in OCI, adding up to the same "
        "total", width=WID)
def other_comprehensive_income_option() -> Fig:
    f = vcard()

    base, total, locked = 350, 232, 132
    f.rect(46, base - total, 72, total, rx=4, fill=VIOLET, fill_opacity="0.30",
           stroke=VIOLET, stroke_width="1.3")
    f.rect(160, base - locked, 72, locked, rx=4, fill=BLUE, fill_opacity="0.30",
           stroke=BLUE, stroke_width="1.3")
    f.text(196, base - locked / 2 + 4, "locked-in", cls="sm")
    f.rect(256, base - total, 72, total - locked, rx=4, fill=TEAL,
           fill_opacity="0.34", stroke=TEAL, stroke_width="1.3")
    f.text(292, base - (total + locked) / 2 + 4, "rate change", cls="sm")
    f.line(118, base - total, 256, base - total, cls="thin dash",
           stroke="var(--dim)", stroke_width="1.2")
    f.line(232, base - locked, 256, base - locked, cls="thin dash",
           stroke="var(--dim)", stroke_width="1.2")
    f.line(34, base, 334, base, cls="axis")
    for x, name in ((82, "IFIE"), (196, "P&L"), (292, "OCI")):
        f.text(x, base + 18, name, cls="sm bold")
    return f


@figure("Transition to IFRS 17", "Three bars running back in time from the transition "
        "date: full retrospective reaching all the way to inception, modified "
        "retrospective approximating the early years, and fair value measured at "
        "transition alone — the two fallbacks reached only if the first is "
        "impracticable", width=WID)
def transition_to_ifrs_17() -> Fig:
    f = vcard()

    x_inc, x_tr, x_mod, h = 56, 282, 168, 28
    y_ax = 364
    f.arrow(x_inc - 12, y_ax, x_tr + 30, y_ax, colour="var(--axis)", width=1.2)
    for x, lab in ((x_inc, "inception"), (x_tr, "transition")):
        f.line(x, y_ax - 4, x, y_ax + 4, cls="tick")
        f.text(x, y_ax + 18, lab, cls="sm dim")
    f.line(x_tr, 86, x_tr, y_ax, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.2")

    y_full, y_mod, y_fv = 104, 204, 304
    f.rect(x_inc, y_full, x_tr - x_inc, h, rx=4, fill=GREEN, fill_opacity="0.6")
    # the early years approximated, the recent ones measured
    f.rect(x_inc, y_mod, x_mod - x_inc, h, rx=4, fill=AMBER, fill_opacity="0.1",
           stroke=AMBER, stroke_width="1.3", stroke_dasharray="4 3")
    f.rect(x_mod, y_mod, x_tr - x_mod, h, rx=4, fill=AMBER, fill_opacity="0.6")
    f.circle(x_tr, y_fv + h / 2, 10, fill=TEAL, fill_opacity="0.7", stroke=TEAL,
             stroke_width="1.4")
    for y, lab in ((y_full, "full retrospective"), (y_mod, "modified"),
                   (y_fv, "fair value")):
        f.text(x_tr - 6, y - 8, lab, cls="sm bold", anchor="end")

    # the fallback: from the first row down to either of the other two
    xc = 318
    f.line(x_tr, y_full + h / 2, xc, y_full + h / 2, cls="thin", stroke=ROSE,
           stroke_width="1.5")
    f.line(xc, y_full + h / 2, xc, y_fv + h / 2, cls="thin", stroke=ROSE,
           stroke_width="1.5")
    f.arrow(xc, y_mod + h / 2, x_tr + 3, y_mod + h / 2, colour=ROSE, width=1.5)
    f.arrow(xc, y_fv + h / 2, x_tr + 13, y_fv + h / 2, colour=ROSE, width=1.5)
    f.text(xc - 6, 172, "impracticable", cls="sm", anchor="end")
    return f


@figure("Reinsurance Contract Liabilities", "A cedant and the reinsurer it cedes to, "
        "each carrying the same liability stack of LRC and LIC — the reinsurer's "
        "with a larger unreported IBNR share, because its claims arrive later",
        width=WID)
def reinsurance_contract_liabilities() -> Fig:
    f = vcard()

    tower(f, 100, 118, 58, BLUE)
    tower(f, 260, 118, 58, VIOLET)
    f.text(100, 166, "cedant", cls="bold")
    f.text(260, 166, "reinsurer", cls="bold")
    f.arrow(126, 118, 228, 118, colour=AMBER, width=1.8)
    f.text(BCX, 108, "cedes", cls="sm")

    # the same stack on both sides: LIC (reported, then IBNR), LRC on top
    base, lrc, lic = 372, 56, 124
    w = 64
    for cx, reported in ((100, 96), (260, 52)):
        x = cx - w / 2
        f.rect(x, base - reported, w, reported, rx=2, fill=AMBER,
               fill_opacity="0.6")
        f.rect(x, base - lic, w, lic - reported, rx=2, fill=AMBER,
               fill_opacity="0.12", stroke=AMBER, stroke_width="1.3",
               stroke_dasharray="4 3")
        f.text(cx, base - (reported + lic) / 2 + 4, "IBNR", cls="sm")
        f.rect(x, base - lic - lrc, w, lrc, rx=2, fill=TEAL, fill_opacity="0.6")
    top = base - lic - lrc
    f.line(132, base - lic, 228, base - lic, cls="thin dot", stroke="var(--dim)")
    f.line(132, top, 228, top, cls="thin dot", stroke="var(--dim)")
    f.text(BCX, base - lic - lrc / 2 + 4, "LRC", cls="sm bold")
    f.text(BCX, base - lic / 2 + 4, "LIC", cls="sm bold")
    return f


@figure("Margin for Adverse Deviations", "Two liability columns on one baseline: the "
        "old Canadian best estimate topped by three prescribed margins — claims, "
        "reinsurance and interest — and the IFRS 17 column topped by a single risk "
        "adjustment that replaces them", width=WID)
def margin_for_adverse_deviations() -> Fig:
    f = vcard()

    base, be = 352, 160
    xo, xn, w = 100, 226, 82
    f.rect(xo, base - be, w, be, rx=3, fill=BLUE, fill_opacity="0.5")
    f.rect(xn, base - be, w, be, rx=3, fill=BLUE, fill_opacity="0.5")
    f.text(xo + w / 2, base - be / 2 + 4, "best estimate", cls="sm")
    f.text(xn + w / 2, base - be / 2 + 4, "best estimate", cls="sm")

    # three prescribed margins, bottom to top, each joined to the one RA
    y = base - be
    ra_h = 44
    ra_mid = base - be - ra_h / 2
    for label, hgt, colour in (("interest", 22, TEAL), ("reinsurance", 18, AMBER),
                               ("claims", 26, VIOLET)):
        f.rect(xo, y - hgt, w, hgt, rx=2, fill=colour, fill_opacity="0.6")
        f.text(xo - 6, y - hgt / 2 + 4, label, cls="sm", anchor="end")
        f.line(xo + w + 2, y - hgt / 2, xn - 2, ra_mid, cls="thin dash",
               stroke=colour, stroke_width="1.3")
        y -= hgt
    f.rect(xn, base - be - ra_h, w, ra_h, rx=2, fill=VIOLET, fill_opacity="0.6")
    f.text(xn + w / 2, ra_mid + 4, "RA", cls="bold")

    f.line(xo - 14, base, xn + w + 14, base, cls="axis")
    f.text(xo + w / 2, base + 18, "pre-2023", cls="sm dim")
    f.text(xn + w / 2, base + 18, "IFRS 17", cls="sm dim")
    return f


@figure("Reinsurance Accounting", "A reinsurance contract forking on whether it "
        "transfers significant insurance risk: yes leads to reinsurance accounting, "
        "no to deposit accounting", width=WID)
def reinsurance_accounting() -> Fig:
    f = vcard()

    document(f, BCX, 122, 70, VIOLET)
    f.text(BCX, 186, "significant risk?", cls="bold")
    f.arrow(BCX - 22, 198, 112, 248, colour=GREEN, width=1.8)
    f.arrow(BCX + 22, 198, 248, 248, colour=ROSE, width=1.8)
    f.text(124, 218, "yes", cls="sm bold", anchor="end")
    f.text(236, 218, "no", cls="sm bold", anchor="start")

    shield(f, 96, 298, 78, GREEN)
    f.text(96, 362, "reinsurance", cls="bold")
    coins(f, 264, 336, 7, 28, AMBER)
    f.text(264, 362, "deposit", cls="bold")
    return f


@figure("Reinsurance Contracts Held", "The premiums paid for reinsurance held as one "
        "column, matched by a second built from the recoveries, the risk "
        "adjustment and the CSM that closes the gap — a net cost, since the cover "
        "costs more than it recovers", width=WID)
def reinsurance_contracts_held() -> Fig:
    f = vcard()

    base, w = 356, 80
    xl, xr = 70, 210
    prem, rec, ra = 232, 156, 26
    csm = prem - rec - ra
    f.rect(xl, base - prem, w, prem, rx=3, fill=ROSE, fill_opacity="0.55")
    f.text(xl + w / 2, base - prem / 2 + 4, "premiums", cls="sm")

    f.rect(xr, base - rec, w, rec, rx=3, fill=GREEN, fill_opacity="0.55")
    f.text(xr + w / 2, base - rec / 2 + 4, "recoveries", cls="sm")
    f.rect(xr, base - rec - ra, w, ra, rx=2, fill=TEAL, fill_opacity="0.6")
    f.text(xr + w / 2, base - rec - ra / 2 + 4, "RA", cls="sm")
    f.rect(xr, base - prem, w, csm, rx=2, fill=AMBER, fill_opacity="0.14",
           stroke=AMBER, stroke_width="1.3", stroke_dasharray="4 3")
    f.text(xr + w / 2, base - prem + csm / 2 + 4, "CSM", cls="sm bold")
    f.line(xl + w, base - prem, xr, base - prem, cls="thin dot",
           stroke="var(--dim)")
    f.text(xr + w + 8, base - prem + csm / 2 + 4, "net cost", cls="sm",
           anchor="start")
    f.line(xl - 14, base, xr + w + 14, base, cls="axis")
    f.text(xl + w / 2, base + 18, "paid", cls="sm dim")
    f.text(xr + w / 2, base + 18, "received", cls="sm dim")
    return f


@figure("Registered Reinsurance", "A cedant inside Canada, within OSFI's reach, "
        "ceding to a registered reinsurer beside it for full capital credit and "
        "across the border to an unregistered one for none", width=WID)
def registered_reinsurance() -> Fig:
    f = vcard()

    border = 238
    f.rect(28, 80, 304, border - 80, rx=10, fill=ROSE, fill_opacity="0.06",
           stroke="none")
    f.line(28, border, 332, border, cls="thin dash", stroke=ROSE,
           stroke_width="1.4")
    f.text(40, 100, "Canada", cls="sm dim", anchor="start")
    f.text(40, 384, "offshore", cls="sm dim", anchor="start")

    building(f, 72, 164, 56, ROSE)
    f.text(72, 212, "OSFI", cls="bold")
    tower(f, 178, 160, 56, BLUE)
    f.text(178, 208, "cedant", cls="bold")
    tower(f, 288, 160, 56, GREEN)
    f.text(288, 208, "registered", cls="bold")
    tower(f, 288, 316, 56, AMBER)
    f.text(288, 364, "unregistered", cls="bold")

    f.arrow(200, 160, 262, 160, colour=GREEN, width=2)
    f.text(231, 146, "full credit", cls="sm")
    f.arrow(192, 196, 264, 300, colour=AMBER, width=2, dash=True)
    f.text(216, 280, "no credit", cls="sm", anchor="end")
    return f


@figure("Unregistered Reinsurance", "Three bars on one scale — $100M of ceded "
        "liabilities, $70M of acceptable collateral, and capital credit that "
        "stops at the collateral, leaving $30M with none", width=WID)
def unregistered_reinsurance() -> Fig:
    f = vcard()

    x0, x1 = 40, 316

    def px(v):
        return x0 + (x1 - x0) * v / 100

    h = 42
    rows = [(110, "ceded liabilities"), (214, "collateral"), (318, "capital credit")]
    for y, name in rows:
        f.text(x0, y - 9, name, cls="sm bold", anchor="start")
    y_ced, y_col, y_cr = (r[0] for r in rows)
    f.rect(x0, y_ced, px(100) - x0, h, rx=4, fill=BLUE, fill_opacity="0.55")
    f.text(px(50), y_ced + h / 2 + 4, "100", cls="sm")
    f.rect(x0, y_col, px(70) - x0, h, rx=4, fill=GREEN, fill_opacity="0.55")
    f.text(px(35), y_col + h / 2 + 4, "70", cls="sm")
    f.rect(x0, y_cr, px(70) - x0, h, rx=4, fill=GREEN, fill_opacity="0.75")
    f.text(px(35), y_cr + h / 2 + 4, "70", cls="sm")
    f.rect(px(70), y_cr, px(100) - px(70), h, rx=4, fill=ROSE,
           fill_opacity="0.1", stroke=ROSE, stroke_width="1.3",
           stroke_dasharray="4 3")
    f.text(px(85), y_cr + h / 2 + 4, "none", cls="sm")
    # the credit stops where the collateral stops
    f.line(px(70), y_col - 6, px(70), y_cr + h + 8, cls="thin dash",
           stroke="var(--dim)", stroke_width="1.3")
    return f


@figure("Finite Reinsurance", "The reinsurer's result plotted against how bad the "
        "cedant's losses turn out: steeply falling for a real treaty, and nearly "
        "flat inside a narrow band for a finite contract", width=WID)
def finite_reinsurance() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, -20, 40, left=40, right=18, top=26, bottom=46)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.hline(0, colour="var(--axis)")
    ax.area(lambda x: 4.0, 0, 10, colour=TEAL, opacity="0.25", base=1.0)
    ax.polyline([(0, 2.5), (10, 2.5)], colour=TEAL, width=2.4)
    ax.polyline([(0, 34), (10, -16)], colour=ROSE, width=2.2, dash=True)
    ax.label(6.9, 12, "real treaty", cls="sm bold")
    ax.label(2.4, 7.5, "finite", cls="sm bold")
    f.text(ax.x0 + 4, ax.y0 - 12, "reinsurer's result", cls="sm dim",
           anchor="start")
    f.text(ax.x1, ax.y1 + 22, "cedant's losses", cls="sm dim", anchor="end")
    return f


def _c6c_curved_arrow(f: Fig, x0, y0, qx, qy, x1, y1, colour, width=1.6):
    """A quadratic curve from (x0, y0) to (x1, y1) with a head at the end."""
    f.path(f"M{x0},{y0} Q{qx},{qy} {x1},{y1}", cls="thin", stroke=colour,
           stroke_width=str(width))
    t = 0.12
    f.arrow(x1 - t * (x1 - qx), y1 - t * (y1 - qy), x1, y1, colour=colour,
            width=width)


@figure("Commutations", "A timeline on which the reinsurer's future recoveries, "
        "spread over decades, are gathered into one lump sum paid now — while "
        "the cedant's claim payments below the line run on to the end of the "
        "tail", width=WID)
def commutations() -> Fig:
    f = vcard()

    y, x_now = 222, 62
    f.arrow(x_now - 16, y, 334, y, colour="var(--axis)", width=1.2)
    f.line(x_now, y - 4, x_now, y + 4, cls="tick")
    f.text(x_now, y + 18, "now", cls="sm dim")
    xs = [112 + k * 38 for k in range(6)]
    for k, x in enumerate(xs):
        f.arrow(x, y, x, y - 72 + k * 7, colour=TEAL, width=1.5, dash=True)
        f.arrow(x, y, x, y + 118 - k * 14, colour=ROSE, width=1.6)
    f.text(xs[3], 132, "recoveries", cls="sm")
    f.text(xs[0], y + 136, "the tail", cls="sm")

    # all of them, gathered into one payment today
    f.arrow(x_now, y, x_now, 90, colour=GREEN, width=3.2)
    f.text(x_now + 10, 96, "lump sum", cls="sm bold", anchor="start")
    _c6c_curved_arrow(f, xs[2], 142, 146, 106, x_now + 10, 126, GREEN,
                      width=1.4)
    return f


@figure("MCT", "A capital-ratio thermometer filled to the running insurer's 104.6%, "
        "just above the 100% minimum line and well short of the 150% supervisory "
        "and 185% internal targets", width=WID)
def mct() -> Fig:
    f = vcard()

    py = _ladder(f, 120, 372, 90, 0.80, 2.00,
                 [(MIN_RATIO, "100% minimum", ROSE),
                  (SUP_TARGET, "150% supervisory", AMBER),
                  (INT_TARGET, "185% internal", VIOLET)],
                 at=MCT_RATIO, width=60, label_x=166, fill=BLUE)
    f.text(82, py(MCT_RATIO) - 3, f"{MCT_RATIO:.1%}", cls="bold", anchor="end")
    tower(f, 58, py(MCT_RATIO) + 34, 36, BLUE)
    return f


@figure("Capital Available", "A waterfall on a broken axis: the running insurer's "
        "$260M of equity, less $8M of goodwill and $4M of other intangibles, "
        "leaving $248M of capital available", width=WID)
def capital_available() -> Fig:
    f = vcard()

    floor, base, s = 200.0, 344, 3.9       # the axis starts at $200M

    def py(v):
        return base - (v - floor) * s

    items = [("equity", EQUITY, EQUITY, GREEN),
             ("goodwill", EQUITY, EQUITY - 8, ROSE),
             ("intangibles", EQUITY - 8, CAP_AVAIL, ROSE),
             ("available", CAP_AVAIL, floor, BLUE)]
    x0, slot, bw = 36, 72, 48
    for i, (label, top, bottom, colour) in enumerate(items):
        cx = x0 + slot * (i + 0.5)
        lo = base if i in (0, 3) else py(bottom)
        f.rect(cx - bw / 2, py(top), bw, lo - py(top), rx=3, fill=colour,
               fill_opacity="0.7")
        value = top if i in (0, 3) else top - bottom
        f.text(cx, py(top) - 8, f"{value:,.0f}", cls="sm bold")
        f.text(cx, base + 18, label, cls="sm dim")
        if i in (0, 3):     # the break in the axis, drawn through the bar
            for dy in (0, 6):
                f.line(cx - bw / 2 - 3, base - 20 - dy + 4, cx + bw / 2 + 3,
                       base - 20 - dy - 4, cls="", stroke="var(--surf)",
                       stroke_width="2.4")
    for i in range(3):
        x_from = x0 + slot * (i + 0.5) + bw / 2
        level = py(items[i][2])
        f.line(x_from, level, x_from + slot - bw, level, cls="thin dot",
               stroke="var(--dim)")
    f.line(x0 - 6, base, x0 + slot * 4 + 6, base, cls="axis")
    return f


@figure("Capital Required", "A waterfall of the running insurer's risk margins — "
        "insurance $92M, market $54M, credit $21M and operational $17M — less the "
        "$26M diversification credit, landing on $158M of capital required",
        width=WID)
def capital_required() -> Fig:
    f = vcard()

    _waterfall(f, 352,
               [("insurance", M_INS, BLUE), ("market", M_MKT, TEAL),
                ("credit", M_CRD, AMBER), ("ops", M_OPS, VIOLET),
                ("divers.", -DIVERS, GREEN), ("required", None, ROSE)],
               x0=28, x1=334, top=236, bar_frac=0.66,
               fmt=lambda v: f"{v:,.0f}" if v >= 0 else f"−{-v:,.0f}")
    return f


@figure("Base Solvency Buffer", "Four bars growing from the running insurer's $158M "
        "of capital required to the $237M base solvency buffer (×1.5) and on to "
        "$356M at the 150% target and $439M at 185%, with its $248M of capital "
        "available cutting across them", width=WID)
def base_solvency_buffer() -> Fig:
    f = vcard()

    x0, s, h = 36, 0.64, 32

    def px(v):
        return x0 + v * s

    rows = [("required", CAP_REQ, BLUE), ("buffer ×1.5", BSB, TEAL),
            ("150% target", SUP_TARGET * BSB, AMBER),
            ("185% internal", INT_TARGET * BSB, VIOLET)]
    for i, (label, v, colour) in enumerate(rows):
        y = 104 + i * 70
        f.text(x0, y - 8, label, cls="sm bold", anchor="start")
        f.rect(x0, y, px(v) - x0, h, rx=3, fill=colour, fill_opacity="0.6")
        f.text(px(v) - 6, y + h / 2 + 4, f"{v:,.0f}", cls="sm", anchor="end")
    # what the running insurer actually holds
    xa = px(CAP_AVAIL)
    f.line(xa, 84, xa, 364, cls="thin dash", stroke=GREEN, stroke_width="1.6")
    f.text(xa, 380, f"available {CAP_AVAIL:,.0f}", cls="sm bold")
    return f


@figure("Insurance Risk Margin", "The running insurer's $92M insurance risk margin "
        "as three columns — claim liabilities $58M, premium liabilities $22M and "
        "catastrophe $12M — and a fourth stacking them into the total", width=WID)
def insurance_risk_margin() -> Fig:
    f = vcard()

    parts = [("claims", 58.0, BLUE), ("premium", 22.0, TEAL),
             ("cat", 12.0, ROSE)]
    base, s, bw = 350, 2.6, 46
    xs = [62, 136, 210, 288]
    for x, (label, v, colour) in zip(xs, parts):
        f.rect(x - bw / 2, base - v * s, bw, v * s, rx=3, fill=colour,
               fill_opacity="0.7")
        f.text(x, base - v * s - 8, f"{v:,.0f}", cls="sm")
        f.text(x, base + 18, label, cls="sm dim")
    y = base
    for _, v, colour in parts:
        f.rect(xs[3] - bw / 2, y - v * s, bw, v * s, rx=2, fill=colour,
               fill_opacity="0.7")
        y -= v * s
    f.text(xs[3], y - 8, f"{M_INS:,.0f}", cls="sm bold")
    f.text(xs[3], base + 18, "total", cls="sm dim")
    f.line(30, base, 330, base, cls="axis")
    return f


@figure("Market Risk Margin", "Asset and liability durations for a matched and a "
        "mismatched insurer on one scale — only the mismatched one's excess asset "
        "duration, shaded, attracts an interest rate charge", width=WID)
def market_risk_margin() -> Fig:
    f = vcard()

    x0, s, h = 40, 34, 30

    def px(v):
        return x0 + v * s

    for i, (label, a, l) in enumerate([("matched", 3.4, 3.4),
                                       ("mismatched", 7.2, 3.4)]):
        y = 102 + i * 128
        f.text(x0, y - 8, label, cls="sm bold", anchor="start")
        f.rect(x0, y, px(min(a, l)) - x0, h, rx=3, fill=BLUE, fill_opacity="0.55")
        f.text(x0 + 8, y + h / 2 + 4, "assets", cls="sm", anchor="start")
        f.rect(x0, y + h + 8, px(l) - x0, h, rx=3, fill=AMBER, fill_opacity="0.55")
        f.text(x0 + 8, y + 1.5 * h + 12, "liabilities", cls="sm",
               anchor="start")
        if a > l:
            f.rect(px(l), y, px(a) - px(l), h, rx=3, fill=ROSE,
                   fill_opacity="0.6")
            f.line(px(l), y - 6, px(l), y + 2 * h + 14, cls="thin dash",
                   stroke="var(--dim)", stroke_width="1.2")
            f.text((px(l) + px(a)) / 2, y + h / 2 + 4, "mismatch", cls="sm bold")
    y_ax = 352
    f.arrow(x0, y_ax, 332, y_ax, colour="var(--axis)", width=1.1)
    for t in (0, 2, 4, 6, 8):
        f.line(px(t), y_ax, px(t), y_ax + 4, cls="tick")
        f.text(px(t), y_ax + 17, str(t), cls="sm dim")
    f.text(332, y_ax + 34, "duration", cls="sm dim", anchor="end")
    return f


@figure("Credit Risk Margin", "The credit charge by counterparty, largest for "
        "reinsurance recoverables and shrinking through corporate bonds and "
        "premiums receivable to almost nothing for Government of Canada bonds",
        width=WID)
def credit_risk_margin() -> Fig:
    f = vcard()

    x0 = 84
    for i, (name, icon, w, colour) in enumerate(
            [("reinsurers", tower, 226, ROSE), ("corporate bonds", document, 146, AMBER),
             ("receivables", None, 80, TEAL), ("Canada bonds", building, 8, GREEN)]):
        cy = 118 + i * 76
        if icon is None:
            coins(f, 50, cy + 16, 4, 16, colour)
        else:
            icon(f, 50, cy, 40, colour)
        f.text(x0, cy - 8, name, cls="sm bold", anchor="start")
        f.rect(x0, cy, w, 20, rx=3, fill=colour, fill_opacity="0.6")
    return f


@figure("Operational Risk Margin", "The operational risk charge plotted against the "
        "year's premium growth: flat at the base charge up to 20% growth, then "
        "climbing — however well the insurer is run", width=WID)
def operational_risk_margin() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 40, 0, 30, left=40, right=18, top=26, bottom=48)
    ax.frame(xticks=[0, 20, 40], xfmt=lambda v: f"{v:.0f}%", yticks=[],
             arrows=True)
    ax.polyline([(0, 9), (20, 9), (40, 9)], colour=BLUE, width=2.2, dash=True)
    ax.polyline([(0, 9), (20, 9), (28, 16), (40, 27)], colour=ROSE, width=2.4)
    ax.label(9, 10.8, "base charge", cls="sm")
    ax.label(31, 22, "growth", cls="sm bold", anchor="end")
    f.text(ax.x0 + 4, ax.y0 - 12, "charge", cls="sm dim", anchor="start")
    f.text(ax.x1, ax.y1 + 34, "premium growth", cls="sm dim", anchor="end")
    return f


@figure("Diversification Credit", "The running insurer's $92M insurance and $54M "
        "market margins stacked to $146M beside the $120M actually required once "
        "they are combined — the outlined $26M gap is the diversification credit",
        width=WID)
def diversification_credit() -> Fig:
    f = vcard()

    base, s, bw = 352, 1.72, 84
    xa, xc = 110, 250
    added = M_INS + M_MKT
    combined = added - DIVERS
    y = base
    for label, v, colour in (("insurance", M_INS, BLUE), ("market", M_MKT, TEAL)):
        f.rect(xa - bw / 2, y - v * s, bw, v * s, rx=3, fill=colour,
               fill_opacity="0.7")
        f.text(xa, y - v * s / 2 + 4, f"{label} {v:,.0f}", cls="sm")
        y -= v * s
    f.text(xa, y - 8, f"{added:,.0f}", cls="sm bold")
    f.text(xa, base + 18, "added", cls="sm dim")

    f.rect(xc - bw / 2, base - combined * s, bw, combined * s, rx=3, fill=GREEN,
           fill_opacity="0.7")
    f.text(xc, base - combined * s / 2 + 4, f"{combined:,.0f}", cls="bold")
    f.rect(xc - bw / 2, base - added * s, bw, DIVERS * s, rx=3, fill=ROSE,
           fill_opacity="0.1", stroke=ROSE, stroke_width="1.3",
           stroke_dasharray="4 3")
    f.text(xc, base - added * s + DIVERS * s / 2 + 4, f"credit −{DIVERS:,.0f}",
           cls="sm bold")
    f.text(xc, base + 18, "combined", cls="sm dim")
    f.line(xa + bw / 2, base - added * s, xc - bw / 2, base - added * s,
           cls="thin dot", stroke="var(--dim)")
    f.line(40, base, 320, base, cls="axis")
    return f


@figure("Earthquake Exposure Risk Margin", "A $600M 1-in-500 earthquake PML as one "
        "column beside the resources that meet it — $372M of reinsurance, a $60M "
        "reserve and, on top, the $168M of capital the margin requires", width=WID)
def earthquake_exposure_risk_margin() -> Fig:
    f = vcard()

    pml, base, s, bw = 600.0, 352, 0.42, 88
    xp, xr = 104, 246
    f.rect(xp - bw / 2, base - pml * s, bw, pml * s, rx=3, fill=ROSE,
           fill_opacity="0.6")
    f.text(xp, base - pml * s - 8, f"PML {pml:,.0f}", cls="sm bold")
    f.text(xp, base + 18, "1-in-500", cls="sm dim")
    y = base
    for label, v, colour in (("reinsurance", 0.62 * pml, TEAL),
                             ("reserve", 0.10 * pml, AMBER),
                             ("capital", 0.28 * pml, BLUE)):
        f.rect(xr - bw / 2, y - v * s, bw, v * s, rx=3, fill=colour,
               fill_opacity="0.6")
        f.text(xr, y - v * s / 2 + 4, f"{label} {v:,.0f}" if label == "capital"
               else label, cls="sm bold" if label == "capital" else "sm")
        y -= v * s
    f.text(xr, base + 18, "resources", cls="sm dim")
    f.line(xp + bw / 2, base - pml * s, xr - bw / 2, base - pml * s,
           cls="thin dot", stroke="var(--dim)")
    f.line(40, base, 320, base, cls="axis")
    return f


@figure("Probable Maximum Loss", "A skewed catastrophe loss distribution with a "
        "line at the 1-in-500 loss and the 0.2% tail beyond it shaded — the PML is "
        "that percentile", width=WID)
def probable_maximum_loss() -> Fig:
    f = vcard()

    def dens(x):
        return x * math.exp(-x / 1.6)

    ax = vaxes(f, 0, 10, 0, 0.64, left=24, right=18, top=26, bottom=48)
    ax.area(dens, 0, 10, colour=BLUE, opacity="0.14")
    ax.area(dens, 7.4, 10, colour=ROSE, opacity="0.5")
    ax.curve(dens, colour=BLUE, width=2.2)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.vline(7.4, colour=ROSE, y_top=0.34)
    ax.label(7.4, 0.34, "1-in-500", cls="sm bold", dy=-8)
    ax.label(8.9, 0.14, "0.2%", cls="sm bold")
    f.arrow(ax.px(8.9), ax.py(0.12), ax.px(8.2), ax.py(0.05), colour=ROSE,
            width=1.2)
    f.text(ax.x1, ax.y1 + 22, "catastrophe loss", cls="sm dim", anchor="end")
    return f


@figure("Supervisory Target Capital Ratio", "A capital-ratio thermometer banded red "
        "below the 100% minimum, amber from there to the 150% supervisory target "
        "and green above it — with the running insurer at 104.6%, low in the amber "
        "band", width=WID)
def supervisory_target_capital_ratio() -> Fig:
    f = vcard()

    x, w, yb, yt, lo, hi = 124, 64, 376, 88, 0.60, 2.00

    def py(v):
        return yb - (v - lo) / (hi - lo) * (yb - yt)

    f.rect(x - w / 2, yt, w, yb - yt, rx=4, fill="var(--soft)",
           stroke="var(--edge)", stroke_width="1.1")
    for v0, v1, colour in ((lo, MIN_RATIO, ROSE), (MIN_RATIO, SUP_TARGET, AMBER),
                           (SUP_TARGET, hi, GREEN)):
        f.rect(x - w / 2, py(v1), w, py(v0) - py(v1), fill=colour,
               fill_opacity="0.3")
    for v, label, colour in ((MIN_RATIO, "100% minimum", ROSE),
                             (SUP_TARGET, "150% target", AMBER)):
        f.line(x - w / 2 - 8, py(v), x + w / 2 + 8, py(v), cls="thin",
               stroke=colour, stroke_width="1.8")
        f.text(x + w / 2 + 16, py(v) + 4, label, cls="sm bold", anchor="start")
    f.text(x + w / 2 + 16, py(1.25) + 4, "room to act", cls="sm dim",
           anchor="start")
    f.text(x + w / 2 + 16, py(1.78) + 4, "operate here", cls="sm dim",
           anchor="start")

    # the running insurer, just above the floor
    y = py(MCT_RATIO)
    f.polygon([(x - w / 2 - 2, y), (x - w / 2 - 12, y - 6), (x - w / 2 - 12, y + 6)],
              fill=BLUE)
    tower(f, 56, y, 34, BLUE)
    f.text(56, y + 32, f"{MCT_RATIO:.1%}", cls="sm bold")
    return f


@figure("Internal Target Capital Ratio", "Four scenario arrows — catastrophe, "
        "reserves, a reinsurer failing and a market fall — dropping from a 185% "
        "internal target, the worst of them landing just above the 150% "
        "supervisory target below it", width=WID)
def internal_target_capital_ratio() -> Fig:
    f = vcard()

    lo, hi, yb, yt = 1.44, 1.88, 372, 80

    def py(v):
        return yb - (v - lo) / (hi - lo) * (yb - yt)

    f.rect(34, py(INT_TARGET), 296, py(SUP_TARGET) - py(INT_TARGET), fill=VIOLET,
           fill_opacity="0.08")
    for v, label, colour in ((INT_TARGET, "185% internal", VIOLET),
                             (SUP_TARGET, "150% target", AMBER)):
        f.line(34, py(v), 330, py(v), cls="thin", stroke=colour,
               stroke_width="1.8")
        f.text(34, py(v) - 7, label, cls="sm bold", anchor="start")
    for x, label, drop, colour in ((152, "cat", 0.33, ROSE),
                                   (206, "reserves", 0.20, AMBER),
                                   (260, "reinsurer", 0.12, TEAL),
                                   (314, "market", 0.25, BLUE)):
        f.text(x, py(INT_TARGET) - 7, label, cls="sm")
        f.arrow(x, py(INT_TARGET), x, py(INT_TARGET - drop), colour=colour,
                width=2.6)
    return f


@figure("Stress Testing", "A plane of two risk drivers with the failure region "
        "shaded beyond its frontier: a sensitivity test moving along one axis, a "
        "scenario moving both together, and a reverse test starting at the "
        "frontier and working back", width=WID)
def stress_testing() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 1, 0, 1, left=30, right=18, top=26, bottom=40)
    front = [(0.86 * math.cos(math.radians(a)), 0.82 * math.sin(math.radians(a)))
             for a in range(90, -1, -5)]
    f.polygon([ax.p(x, y) for x, y in front + [(1, 0), (1, 1), (0, 1)]],
              fill=ROSE, fill_opacity="0.14", stroke="none")
    ax.polyline(front, colour=ROSE, width=2)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.label(0.9, 0.9, "failure", cls="sm bold", anchor="end")

    b = (0.06, 0.06)
    ax.point(*b, colour="var(--ink)", r=4)
    ax.label(b[0] + 0.04, b[1] + 0.05, "base", cls="sm dim", anchor="start")
    f.arrow(*ax.p(*b), *ax.p(0.56, b[1]), colour=BLUE, width=2.2)
    ax.label(0.56, b[1] + 0.05, "sensitivity", cls="sm", anchor="end")
    f.arrow(*ax.p(*b), *ax.p(0.46, 0.44), colour=TEAL, width=2.2)
    ax.label(0.47, 0.46, "scenario", cls="sm", anchor="start", dx=4)
    fx, fy = front[4]
    f.arrow(*ax.p(fx, fy), *ax.p(0.16, 0.4), colour=ROSE, width=2.2, dash=True)
    ax.label(fx, fy, "reverse", cls="sm", anchor="start", dx=8, dy=-4)
    f.text(ax.x1, ax.y1 + 20, "reserve shock", cls="sm dim", anchor="end")
    f.text(ax.x0 + 4, ax.y0 - 12, "market fall", cls="sm dim", anchor="start")
    return f


@figure("Reverse Stress Testing", "Two runs along one line from today to "
        "non-viability: a forward test applying one known shock that stops well "
        "short, and a reverse test starting at non-viability and working back to "
        "the combination of shocks that would reach it", width=WID)
def reverse_stress_testing() -> Fig:
    f = vcard()

    x0, x1 = 44, 268
    f.rect(x1, 84, 332 - x1, 290, rx=6, fill=ROSE, fill_opacity="0.14",
           stroke="none")
    f.line(x1, 84, x1, 374, cls="thin", stroke=ROSE, stroke_width="1.8")
    f.text(x1 + 32, 110, "non-viable", cls="sm bold")
    f.line(x0, 84, x0, 374, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.2")
    f.text(x0, 388, "today", cls="sm dim")

    # forward: one known shock, applied and measured
    y, h = 132, 38
    f.rect(x0, y, 104, h, rx=3, fill=BLUE, fill_opacity="0.6")
    f.arrow(x0 + 110, y + h / 2, x0 + 150, y + h / 2, colour=BLUE, width=2)
    f.text(x0 + 6, y - 10, "forward", cls="sm bold", anchor="start")

    # reverse: fix the end point, find what adds up to it
    y = 278
    f.arrow(x1 - 2, y - 30, x0 + 60, y - 30, colour=ROSE, width=2, dash=True)
    f.text(x1 - 6, y - 44, "reverse", cls="sm bold", anchor="end")
    x = x0
    for label, share, colour in (("cat", 0.40, ROSE), ("reserves", 0.34, AMBER),
                                 ("reinsurer", 0.26, TEAL)):
        w = (x1 - x0) * share
        f.rect(x, y, w, h, rx=3, fill=colour, fill_opacity="0.6")
        f.text(x + w / 2, y + h / 2 + 4, label, cls="sm")
        x += w
    return f


@figure("Ripple Effect", "A waterfall turning a $50M catastrophe into $85M: an $8M "
        "reinstatement premium, a $15M dearer renewal and $12M of business lost "
        "stacked on the direct loss", width=WID)
def ripple_effect() -> Fig:
    f = vcard()

    _waterfall(f, 350,
               [("cat", 50.0, ROSE), ("reinstate", 8.0, AMBER),
                ("renewal", 15.0, AMBER), ("lost", 12.0, VIOLET),
                ("total", None, BLUE)],
               x0=30, x1=330, top=236, bar_frac=0.62,
               fmt=lambda v: f"{abs(v):,.0f}")
    return f


@figure("Risk Appetite", "Three nested regions — risk capacity outermost, tolerance "
        "inside it and appetite at the centre — with the insurer's current risk "
        "profile a dot inside the appetite", width=WID)
def risk_appetite() -> Fig:
    f = vcard()

    cx, cy = BCX, 232
    for r, label, colour, op in ((156, "capacity", ROSE, "0.08"),
                                 (112, "tolerance", AMBER, "0.12"),
                                 (68, "appetite", GREEN, "0.2")):
        f.circle(cx, cy, r, fill=colour, fill_opacity=op, stroke=colour,
                 stroke_width="1.6")
        f.text(cx, cy - r + 20, label, cls="sm bold")
    f.circle(cx - 14, cy + 16, 7, fill=BLUE, stroke="var(--surf)",
             stroke_width="1.5")
    f.text(cx - 14, cy + 40, "profile", cls="sm")
    return f


@figure("Concentration Risk", "A scatter of insured houses that look like separate "
        "risks, six of them inside the footprint of one earthquake", width=WID)
def concentration_risk() -> Fig:
    f = vcard()

    cx, cy, r = 138, 250, 92
    for rr in (r, r * 0.64, r * 0.3):
        f.circle(cx, cy, rr, fill=ROSE, fill_opacity="0.07", stroke=ROSE,
                 stroke_width="1.3", stroke_dasharray="5 4")
    f.text(cx, cy - r - 10, "one event", cls="sm bold")
    inside = [(104, 214), (164, 206), (88, 272), (138, 294), (186, 262),
              (132, 246)]
    outside = [(262, 112), (300, 196), (252, 250), (292, 312), (64, 116),
               (232, 356)]
    for x, y in inside:
        house(f, x, y, 30, ROSE)
    for x, y in outside:
        house(f, x, y, 30, BLUE)
    return f


@figure("Climate Risk", "Hazard over time: a flat record in the past, a dashed "
        "assumption extending it past today, and physical and transition risk "
        "both climbing away from that assumption", width=WID)
def climate_risk() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 13, 0, 10, left=24, right=14, top=26, bottom=40)
    ax.frame(xticks=[], yticks=[], arrows=True)
    past = [(0.4, 2.6), (1.0, 3.3), (1.6, 2.8), (2.2, 3.1), (2.8, 2.5),
            (3.4, 3.2), (4.0, 2.9), (4.6, 3.4)]
    for x, y in past:
        ax.point(x, y, colour="var(--dim)", r=2.8)
    ax.vline(5, colour="var(--dim)", label="today", label_cls="sm dim")
    ax.polyline([(0, 3.0), (10, 3.0)], colour="var(--dim)", width=1.8,
                dash=True)
    ax.curve(lambda x: 3.0 + 0.22 * (x - 5) ** 2, colour=ROSE, width=2.4,
             xa=5, xb=10)
    ax.curve(lambda x: 3.0 + 2.6 * (1 - math.exp(-(x - 5) / 1.8)),
             colour=TEAL, width=2.4, xa=5, xb=10)
    ax.label(10, 8.5, "physical", cls="sm bold", anchor="start", dx=6, dy=4)
    ax.label(10, 5.44, "transition", cls="sm bold", anchor="start", dx=6, dy=4)
    ax.label(8.2, 3.0, "assumed", cls="sm dim", dy=18)
    return f


@figure("Rating Agency", "A downgrade spiral drawn as a loop around an A− rating: "
        "the downgrade loses business, the lost business raises costs, higher "
        "costs weaken the metrics, and weaker metrics bring the next downgrade",
        width=WID)
def rating_agency() -> Fig:
    f = vcard()

    cx, cy, r = BCX, 234, 108
    f.text(cx, cy + 10, "A−", cls="bold", style="font-size:30px")
    f.arrow(cx + 32, cy - 14, cx + 32, cy + 12, colour=ROSE, width=2.4)

    stations = [(-90, document, "downgrade", ROSE, -34),
                (0, tower, "business lost", AMBER, 38),
                (90, coins, "costs rise", VIOLET, 42),
                (180, None, "metrics fall", TEAL, 38)]
    for deg, icon, label, colour, dy in stations:
        a = math.radians(deg)
        x, y = cx + r * math.cos(a), cy + r * math.sin(a)
        if icon is coins:
            coins(f, x, y + 16, 4, 16, colour)
        elif icon is None:      # a falling line: the ratios, going the wrong way
            f.poly([(x - 22, y - 18), (x - 8, y - 4), (x + 4, y - 10), (x + 22, y + 16)],
                   stroke=colour, stroke_width="2.6")
        else:
            icon(f, x, y, 38, colour)
        f.text(x, y + dy, label, cls="sm bold")
    for deg in (-90, 0, 90, 180):
        a0, a1 = math.radians(deg + 26), math.radians(deg + 64)
        am = (a0 + a1) / 2
        rc = r / math.cos((a1 - a0) / 2)
        _c6c_curved_arrow(f, cx + r * math.cos(a0), cy + r * math.sin(a0),
                          cx + rc * math.cos(am), cy + rc * math.sin(am),
                          cx + r * math.cos(a1), cy + r * math.sin(a1),
                          "var(--dim)", width=1.6)
    return f


@figure("Principles-Based Regulation", "OSFI above two layers: the MCT drawn as a "
        "ruler at the base — rules — and ORSA, FCT and B-15 resting on it as the "
        "principles-based expectations on top", width=WID)
def principles_based_regulation() -> Fig:
    f = vcard()

    building(f, BCX, 112, 54, ROSE)
    f.text(BCX, 160, "OSFI", cls="bold")

    # principles on top: outcomes asked for, no method given
    f.text(40, 194, "principles", cls="sm dim", anchor="start")
    for x, label in ((82, "ORSA"), (180, "FCT"), (278, "B-15")):
        f.rect(x - 42, 206, 84, 52, rx=16, fill=TEAL, fill_opacity="0.3",
               stroke=TEAL, stroke_width="1.4")
        f.text(x, 236, label, cls="bold")

    # the rules underneath: a ruler, every tick prescribed
    y0, h = 272, 58
    f.rect(40, y0, 280, h, rx=4, fill=BLUE, fill_opacity="0.3", stroke=BLUE,
           stroke_width="1.4")
    for k in range(1, 28):
        x = 40 + k * 10
        f.line(x, y0, x, y0 + (14 if k % 5 == 0 else 8), cls="", stroke=BLUE,
               stroke_width="1.2")
    f.text(BCX, y0 + 42, "MCT", cls="bold")
    f.text(40, y0 + h + 18, "rules", cls="sm dim", anchor="start")
    return f


@figure("ORSA", "Two capital columns: the MCT's standard-formula requirement, and "
        "the insurer's own view — the same requirement plus the risks the formula "
        "does not capture — with the internal target drawn at the top of the "
        "second", width=WID)
def orsa() -> Fig:
    f = vcard()

    base, s, bw = 350, 1.1, 92
    xm, xo = 108, 252
    formula, extra = CAP_REQ * s, 52
    for x in (xm, xo):
        f.rect(x - bw / 2, base - formula, bw, formula, rx=3, fill=BLUE,
               fill_opacity="0.55")
    f.rect(xo - bw / 2, base - formula - extra, bw, extra, rx=3, fill=AMBER,
           fill_opacity="0.14", stroke=AMBER, stroke_width="1.3",
           stroke_dasharray="4 3")
    f.text(xo, base - formula - extra / 2 + 4, "not captured", cls="sm bold")
    f.line(xm + bw / 2, base - formula, xo - bw / 2, base - formula,
           cls="thin dot", stroke="var(--dim)")

    y_t = base - formula - extra - 18
    f.line(40, y_t, 320, y_t, cls="thin", stroke=VIOLET, stroke_width="2")
    f.text(40, y_t - 8, "internal target", cls="sm bold", anchor="start")
    f.line(40, base, 320, base, cls="axis")
    f.text(xm, base + 18, "MCT", cls="sm dim")
    f.text(xo, base + 18, "ORSA", cls="sm dim")
    return f


@figure("FCT", "Four MCT-ratio bars from the FCT: the base scenario at 168%, above the "
        "150% supervisory target, and the adverse scenarios at 124% and 112% above "
        "the 100% minimum — but the solvency scenario at 86%, below it", width=WID)
def fct() -> Fig:
    f = vcard()

    base, top, lo, hi = 348, 96, 0.60, 1.80

    def py(v):
        return base - (v - lo) / (hi - lo) * (base - top)

    for level, label, colour in ((MIN_RATIO, "100%", ROSE),
                                 (SUP_TARGET, "150%", AMBER)):
        f.line(74, py(level), 330, py(level), cls="thin dash", stroke=colour,
               stroke_width="1.6")
        f.text(66, py(level) + 4, label, cls="sm bold", anchor="end")
    for i, (label, v, colour) in enumerate(
            [("base", 1.68, GREEN), ("cat", 1.24, TEAL),
             ("reserves", 1.12, AMBER), ("solvency", 0.86, ROSE)]):
        x = 112 + i * 64
        f.rect(x - 22, py(v), 44, base - py(v), rx=3, fill=colour,
               fill_opacity="0.6")
        f.text(x, py(v) - 8, f"{v:.0%}", cls="sm")
        f.text(x, base + 18, label, cls="sm dim")
    f.line(74, base, 330, base, cls="axis")
    return f


@figure("Solvency II", "Solvency II drawn as a temple of three pillars — the SCR, "
        "ORSA and the SFCR — with the Canadian piece that answers to each beneath "
        "it: the MCT, ORSA and FCT, and the annual return", width=WID)
def solvency_ii() -> Fig:
    f = vcard()

    xs = (100, 190, 280)
    f.polygon([(52, 136), (BCX + 10, 88), (328, 136)], fill="var(--soft)",
              stroke="var(--edge)", stroke_width="1.4")
    f.text(BCX + 10, 126, "Solvency II", cls="bold")
    f.rect(52, 136, 276, 14, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.4")
    for x, eu, colour in zip(xs, ("SCR", "ORSA", "SFCR"), (BLUE, TEAL, AMBER)):
        f.rect(x - 28, 150, 56, 168, fill=colour, fill_opacity="0.25",
               stroke=colour, stroke_width="1.4")
        f.text(x, 240, eu, cls="bold")
    f.rect(52, 318, 276, 14, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.4")
    f.text(22, 370, "Canada", cls="sm dim", anchor="start")
    for x, ca in zip(xs, ("MCT", "ORSA, FCT", "annual return")):
        f.arrow(x, 336, x, 352, colour="var(--dim)", width=1.2)
        f.text(x, 370, ca, cls="sm bold")
    return f


def _c6c_stamp(f: Fig, cx, cy, ok, colour):
    """A round stamp carrying a tick (ok) or a cross."""
    f.circle(cx, cy, 13, fill="var(--surf)", stroke=colour, stroke_width="2")
    if ok:
        f.poly([(cx - 6, cy), (cx - 1.5, cy + 5), (cx + 7, cy - 5)], stroke=colour,
               stroke_width="2.6")
    else:
        for d in (1, -1):
            f.line(cx - 5.5, cy - 5.5 * d, cx + 5.5, cy + 5.5 * d, cls="",
                   stroke=colour, stroke_width="2.6", stroke_linecap="round")


@figure("Statement of Actuarial Opinion", "A liability scale with the actuary's range "
        "of reasonable estimates shaded: a carried amount inside the range stamped "
        "unqualified, and one below it stamped adverse", width=WID)
def statement_of_actuarial_opinion() -> Fig:
    f = vcard()

    y_ax, lo, hi, x0, x1 = 312, 370, 460, 40, 320

    def px(v):
        return x0 + (v - lo) / (hi - lo) * (x1 - x0)

    f.rect(px(395), 248, px(440) - px(395), y_ax - 248, rx=3, fill=GREEN,
           fill_opacity="0.2", stroke=GREEN, stroke_width="1.2")
    f.text(px(426), 284, "range", cls="sm bold")
    f.arrow(x0 - 8, y_ax, x1 + 16, y_ax, colour="var(--axis)", width=1.2)
    for t in (380, 400, 420, 440, 460):
        f.line(px(t), y_ax, px(t), y_ax + 4, cls="tick")
        f.text(px(t), y_ax + 17, str(t), cls="sm dim")
    f.text(x1 + 16, y_ax + 36, "liability, $M", cls="sm dim", anchor="end")

    for v, label, ok, colour in ((412, "unqualified", True, GREEN),
                                 (380, "adverse", False, ROSE)):
        x = px(v)
        f.line(x, 180, x, y_ax, cls="thin", stroke=colour, stroke_width="2")
        f.circle(x, y_ax, 4, fill=colour)
        document(f, x, 146, 58, colour)
        _c6c_stamp(f, x + 18, 166, ok, colour)
        f.text(x, 100, label, cls="sm bold")
    return f


@figure("Appointed Actuary's Report", "The Appointed Actuary handing a report to "
        "another actuary, whose redone result stands the same height as the "
        "original — the report is detailed enough to reproduce", width=WID)
def appointed_actuarys_report() -> Fig:
    f = vcard()

    person(f, 64, 132, 58, BLUE)
    f.text(64, 180, "AA", cls="bold")
    document(f, BCX, 132, 76, AMBER)
    f.text(BCX, 190, "report", cls="bold")
    person(f, 296, 132, 58, TEAL)
    f.text(296, 180, "another actuary", cls="sm bold")
    f.arrow(92, 132, 146, 132, colour=BLUE, width=2)
    f.arrow(214, 132, 268, 132, colour=TEAL, width=2)

    # the two results, side by side
    base = 352
    for x, colour in ((64, BLUE), (296, TEAL)):
        f.rect(x - 22, 244, 44, base - 244, rx=3, fill=colour, fill_opacity="0.6")
    f.line(86, 244, 274, 244, cls="thin dot", stroke="var(--dim)")
    f.text(BCX, 302, "=", cls="bold", style="font-size:30px")
    f.line(24, base, 336, base, cls="axis")
    f.text(BCX, base + 20, "same result", cls="sm dim")
    return f


@figure("Standards of Practice", "An actuary bound by the Rules of Professional "
        "Conduct and the Standards of Practice, drawn with solid arrows, and guided "
        "but not bound by educational notes and research, drawn dashed", width=WID)
def standards_of_practice() -> Fig:
    f = vcard()

    f.line(BCX, 90, BCX, 208, cls="thin dash", stroke="var(--dim)",
           stroke_width="1.2")
    f.text(96, 98, "binding", cls="sm bold")
    f.text(264, 98, "guidance", cls="sm bold")
    person(f, BCX, 330, 66, BLUE)
    f.text(BCX, 384, "actuary", cls="sm bold")
    for x, label, colour, solid in ((56, "conduct", VIOLET, True),
                                    (136, "standards", BLUE, True),
                                    (224, "notes", TEAL, False),
                                    (304, "research", GREEN, False)):
        document(f, x, 146, 48, colour)
        f.text(x, 188, label, cls="sm")
        f.arrow(x + (BCX - x) * 0.08, 198, BCX + (x - BCX) * 0.14, 290,
                colour=colour, width=1.8, dash=not solid)
    return f


@figure("Materiality", "The same $6M error laid against three of the running "
        "insurer's yardsticks, each drawn full width: under 1% of its $640M "
        "insurance contract liabilities, 2.4% of its $248M capital and 11% of its "
        "$54M pre-tax income", width=WID)
def materiality() -> Fig:
    f = vcard()

    err = 6.0
    pre_tax = ISR + NET_FIN + OTHER                     # 54
    x0, x1, h = 40, 282, 34
    f.rect(x0, 92, 14, 14, rx=2, fill=ROSE, fill_opacity="0.85")
    f.text(x0 + 22, 104, f"${err:,.0f}M error", cls="sm bold", anchor="start")
    for i, (name, base, colour) in enumerate([("liabilities", ICL, BLUE),
                                              ("capital", CAP_AVAIL, TEAL),
                                              ("pre-tax income", pre_tax, AMBER)]):
        y = 150 + i * 80
        share = err / base
        w = (x1 - x0) * share
        f.text(x0, y - 9, f"{name} {base:,.0f}", cls="sm bold", anchor="start")
        f.rect(x0, y, x1 - x0, h, rx=4, fill=colour, fill_opacity="0.45")
        f.rect(x1 - w, y, w, h, rx=1, fill=ROSE, fill_opacity="0.85")
        f.text(x1 + 8, y + h / 2 + 4, f"{share:.1%}" if share < 0.1
               else f"{share:.0%}", cls="sm bold", anchor="start")
    return f


@figure("Subsequent Events", "A timeline from the valuation date to the report date "
        "with two events inside the window: a court ruling on an existing claim, "
        "arrowed back to adjust the valuation, and a new catastrophe, arrowed "
        "forward to be disclosed", width=WID)
def subsequent_events() -> Fig:
    f = vcard()

    y, xv, xr = 236, 64, 296
    f.rect(xv, y - 12, xr - xv, 24, rx=4, fill=VIOLET, fill_opacity="0.16",
           stroke="none")
    f.arrow(xv - 24, y, xr + 32, y, colour="var(--axis)", width=1.2)
    for x, lab in ((xv, "valuation"), (xr, "report")):
        f.line(x, y - 16, x, y + 16, cls="thin", stroke="var(--ink)",
               stroke_width="1.8")
        f.text(x, y + 32, lab, cls="sm dim")

    # evidence about the valuation date: reach back and adjust
    xe = 174
    f.circle(xe, y, 5, fill=BLUE)
    scales(f, xe, 138, 60, BLUE)
    f.line(xe, 168, xe, y - 6, cls="thin dot", stroke=BLUE)
    _c6c_curved_arrow(f, xe - 30, 128, xv + 12, 116, xv, y - 20, BLUE, width=2)
    f.text(xv + 4, 104, "adjust", cls="sm bold")

    # a new condition after it: carry forward and disclose
    xn = 238
    f.circle(xn, y, 5, fill=ROSE)
    house(f, xn, 322, 54, ROSE)
    f.line(xn, y + 6, xn, 294, cls="thin dot", stroke=ROSE)
    _c6c_curved_arrow(f, xn + 26, 328, xr + 8, 338, xr + 4, y + 42, AMBER,
                      width=2)
    f.text(xr + 12, 374, "disclose", cls="sm bold", anchor="end")
    return f


@figure("Model Risk", "Data flowing into a model and out to the person who uses its "
        "answer, with a warning at each of the three places it can go wrong, and "
        "an independent validator checking the model from below", width=WID)
def model_risk() -> Fig:
    f = vcard()

    y = 188
    document(f, 58, y, 56, AMBER)
    f.rect(146, y - 30, 68, 60, rx=10, fill=VIOLET, fill_opacity="0.2",
           stroke=VIOLET, stroke_width="1.4")
    nodes = [(162, y - 12), (162, y + 12), (198, y - 14), (198, y + 2),
             (198, y + 16)]
    for a in nodes[:2]:
        for b in nodes[2:]:
            f.line(*a, *b, cls="", stroke=VIOLET, stroke_width="1")
    for x, yy in nodes:
        f.circle(x, yy, 4, fill=VIOLET)
    person(f, 302, y, 60, BLUE)
    f.arrow(90, y, 140, y, colour="var(--dim)", width=1.8)
    f.arrow(220, y, 270, y, colour="var(--dim)", width=1.8)
    for x, label in ((58, "input"), (180, "model"), (302, "use")):
        f.text(x, y + 50, label, cls="sm bold")
        f.polygon([(x, 92), (x - 14, 118), (x + 14, 118)], fill=ROSE,
                  fill_opacity="0.2", stroke=ROSE, stroke_width="1.6",
                  stroke_linejoin="round")
        f.text(x, 114, "!", cls="bold")

    person(f, 180, 330, 56, GREEN)
    f.text(180, 376, "validator", cls="sm bold")
    f.arrow(180, 296, 180, y + 36, colour=GREEN, width=1.8, dash=True)
    return f


@figure("Runoff", "Claims payments falling away through the years of a run-off while "
        "the expense line barely falls, so expenses become an ever larger share",
        width=WID)
def runoff() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 100, left=24, right=18, top=26, bottom=40)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.area(lambda x: 92 * math.exp(-0.30 * x), 0, 10, colour=BLUE,
            opacity="0.18")
    ax.curve(lambda x: 92 * math.exp(-0.30 * x), colour=BLUE, width=2.4)
    ax.area(lambda x: 22 - 0.6 * x, 0, 10, colour=ROSE, opacity="0.14")
    ax.polyline([(0, 22), (10, 16)], colour=ROSE, width=2.4)
    ax.label(2.6, 52, "claims", cls="sm bold", anchor="start")
    ax.label(8.2, 19, "expenses", cls="sm bold", dy=-8)
    f.text(ax.x1, ax.y1 + 22, "years in run-off", cls="sm dim", anchor="end")
    return f


@figure("Educational Note", "Bars of authority falling from the Rules of Professional "
        "Conduct and the Standards of Practice, which cross the binding line, to "
        "educational notes and draft notes, which stop short of it", width=WID)
def educational_note() -> Fig:
    f = vcard()

    x0, x1 = 40, 316
    xb = x0 + 0.72 * (x1 - x0)
    for i, (name, weight, colour) in enumerate(
            [("conduct rules", 1.00, VIOLET), ("standards", 0.9, BLUE),
             ("educational notes", 0.56, TEAL), ("draft notes", 0.36, GREEN)]):
        y = 120 + i * 66
        f.text(x0, y - 9, name, cls="sm bold", anchor="start")
        f.rect(x0, y, (x1 - x0) * weight, 30, rx=4, fill=colour,
               fill_opacity="0.6" if i != 2 else "0.8",
               stroke=colour if i == 2 else "none", stroke_width="1.6")
    f.line(xb, 96, xb, 372, cls="thin dash", stroke=ROSE, stroke_width="1.6")
    f.text(xb, 388, "binding", cls="sm bold")
    return f


@figure("Duty to Report", "A three-step staircase the Appointed Actuary climbs one "
        "step at a time: first the CEO and CFO, then the directors, and only then "
        "OSFI at the top", width=WID)
def duty_to_report() -> Fig:
    f = vcard()

    base = 372
    steps = [(96, 316, "CEO & CFO", BLUE), (178, 248, "directors", AMBER),
             (260, 180, "OSFI", ROSE)]
    for x, top, label, colour in steps:
        f.rect(x - 41, top, 82, base - top, rx=3, fill=colour,
               fill_opacity="0.14", stroke=colour, stroke_width="1.3")
        f.text(x, top + 20, label, cls="sm bold")
    person(f, 34, 350, 36, VIOLET)
    f.text(34, 390, "AA", cls="sm bold")
    person(f, 82, 294, 32, BLUE)
    person(f, 110, 294, 32, BLUE)
    for x in (156, 178, 200):
        person(f, x, 228, 28, AMBER)
    building(f, 260, 146, 54, ROSE)
    for (x0, y0), (x1, y1) in (((44, 322), (70, 286)), ((126, 280), (152, 222)),
                               ((208, 210), (234, 150))):
        _c6c_curved_arrow(f, x0, y0, x0 + 2, y1 - 6, x1, y1, "var(--dim)",
                          width=1.6)
    return f


def _c6c_magnifier(f: Fig, cx, cy, r, colour, handle=(1, 1)):
    """A magnifying glass: a lens centred on (cx, cy), its handle pointing along
    `handle` — a review, an audit, a close look."""
    hx, hy = handle
    n = math.hypot(hx, hy)
    hx, hy = hx / n, hy / n
    f.circle(cx, cy, r, fill=colour, fill_opacity="0.12", stroke=colour,
             stroke_width="2.4")
    f.line(cx + hx * r, cy + hy * r, cx + hx * r * 2.1, cy + hy * r * 2.1, cls="",
           stroke=colour, stroke_width="4.4", stroke_linecap="round")


@figure("Peer Review", "An independent reviewer outside the insurer examining the "
        "Appointed Actuary's opinion through a magnifying glass and sending a "
        "challenge back — while the opinion itself stays with the Appointed "
        "Actuary", width=WID)
def peer_review() -> Fig:
    f = vcard()

    f.rect(26, 188, 180, 196, rx=12, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    f.text(40, 208, "insurer", cls="sm dim", anchor="start")
    person(f, 76, 290, 62, BLUE)
    f.text(76, 346, "AA", cls="bold")
    document(f, 158, 290, 60, AMBER)
    f.text(158, 346, "opinion", cls="sm bold")

    person(f, 294, 290, 62, TEAL)
    f.text(294, 346, "reviewer", cls="sm bold")
    _c6c_magnifier(f, 196, 266, 20, TEAL, handle=(1, 0.8))

    _c6c_curved_arrow(f, 290, 244, 190, 84, 88, 244, TEAL, width=2)
    f.text(190, 152, "challenge", cls="sm bold")
    return f


@figure("External Auditor", "The actuary and the auditor facing each other — the "
        "valuation passing one way and the data the other — and both reporting "
        "down to the audit committee", width=WID)
def external_auditor() -> Fig:
    f = vcard()

    person(f, 66, 150, 64, BLUE)
    f.text(66, 202, "actuary", cls="bold")
    person(f, 294, 150, 64, AMBER)
    f.text(294, 202, "auditor", cls="bold")
    f.arrow(104, 130, 256, 130, colour=BLUE, width=2)
    f.text(BCX, 120, "valuation", cls="sm")
    f.arrow(256, 160, 104, 160, colour=AMBER, width=2)
    f.text(BCX, 178, "data", cls="sm")

    for x in (148, 180, 212):
        person(f, x, 312, 40, VIOLET)
    f.text(BCX, 354, "audit committee", cls="sm bold")
    f.arrow(76, 216, 136, 284, colour=BLUE, width=1.8)
    f.arrow(284, 216, 224, 284, colour=AMBER, width=1.8)
    return f


@figure("Corporate Governance", "The three lines under a board: the business "
        "reporting through management, while the oversight functions and internal "
        "audit each report straight to the board", width=WID)
def corporate_governance() -> Fig:
    f = vcard()

    for x in (146, 180, 214):
        person(f, x, 112, 36, VIOLET)
    f.text(240, 118, "board", cls="bold", anchor="start")
    person(f, 72, 214, 44, "var(--dim)")
    f.text(72, 256, "management", cls="sm")

    y = 316
    tower(f, 72, y, 48, BLUE)
    person(f, 180, y, 48, TEAL)
    _c6c_magnifier(f, 280, y - 6, 15, AMBER)
    for k, (x, label) in enumerate(((72, "business"), (180, "oversight"),
                                    (288, "audit"))):
        f.text(x, y + 42, label, cls="sm bold")
        f.circle(x - 34, y - 22, 9, fill="var(--soft)", stroke="var(--edge)",
                 stroke_width="1.1")
        f.text(x - 34, y - 18, str(k + 1), cls="sm bold")
    f.arrow(72, y - 30, 72, 266, colour=BLUE, width=1.8)
    f.arrow(94, 200, 136, 136, colour="var(--dim)", width=1.8)
    f.arrow(180, y - 30, 180, 140, colour=TEAL, width=1.8)
    f.arrow(282, y - 28, 222, 140, colour=AMBER, width=1.8)
    return f
