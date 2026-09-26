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


@figure("Health Care Insurance", "What medicare covers and what private insurance "
        "is left to fill, under the five Canada Health Act principles",
        width=WID)
def health_care_insurance() -> Fig:
    f = vcard()

    f.text(BCX, 100, "one household's health spending", cls="sm dim")
    _hbar(f, 138, [(0.68, "medicare", BLUE), (0.32, "private", AMBER)],
          x0=40, x1=320, height=34)
    f.text(112, 176, "hospital, physician", cls="sm dim")
    f.text(266, 176, "drugs, dental,", cls="sm dim")
    f.text(266, 191, "vision, paramedical", cls="sm dim")
    f.line(30, 212, 330, 212, cls="rule")
    f.text(BCX, 234, "the five Canada Health Act principles", cls="sm bold")
    _pill_row(f, 262, ["public", "comprehensive", "universal"],
              [BLUE, TEAL, GREEN], x0=32, x1=328, h=24)
    _pill_row(f, 292, ["portable", "accessible"], [AMBER, VIOLET],
              x0=84, x1=276, h=24)
    f.text(BCX, 330, "meet them and the federal transfer is paid in full",
           cls="sm dim")
    f.text(BCX, 358, "and a provincial health insurer subrogates against",
           cls="sm dim")
    f.text(BCX, 374, "the at-fault auto insurer for what it spent",
           cls="sm dim")
    return f


@figure("Residual Market", "The two residual structures — a facility the driver "
        "sees and a pool the driver never learns of", width=WID)
def residual_market() -> Fig:
    f = vcard()

    _columns(f, 100, ["Facility", "Pool"],
             [["written by FA", "FA's own rate", "the driver knows",
               "risks nobody", "will write"],
              ["written by an", "ordinary insurer", "at the normal rate",
               "risks everybody", "must write"]],
             x0=30, x1=330, row_h=21, head_h=26, colours=(ROSE, TEAL))
    f.line(30, 262, 330, 262, cls="rule")
    f.text(BCX, 284, "size is a diagnostic, not a goal", cls="sm bold")
    f.text(BCX, 308, "a growing residual market says the approved", cls="sm dim")
    f.text(BCX, 324, "rate no longer covers part of the risk —", cls="sm dim")
    f.text(BCX, 340, "depopulation is the direction to want", cls="sm dim")
    f.text(BCX, 368, "the business is adversely selected by construction,",
           cls="sm dim")
    f.text(BCX, 384, "so its loss ratio exceeds the voluntary market's",
           cls="sm dim")
    return f


@figure("Workers Compensation Insurance", "The historic bargain — the worker's "
        "tort action traded for a no-fault benefit an employer pool funds",
        width=WID)
def workers_compensation_insurance() -> Fig:
    f = vcard()

    f.chip(96, 108, "worker", colour=BLUE, w=112, h=28)
    f.chip(264, 108, "employer", colour=AMBER, w=112, h=28)
    f.arrow(152, 100, 208, 100, colour=BLUE, width=1.5)
    f.arrow(208, 118, 152, 118, colour=AMBER, width=1.5)
    f.text(BCX, 146, "gives up the right to sue", cls="sm dim")
    f.text(BCX, 162, "gets a no-fault benefit for life", cls="sm dim")
    f.line(30, 184, 330, 184, cls="rule")
    _bullets(f, 208, ["no private insurer writes it, in any province",
                      "WSIB · WorkSafeBC · WCB Alberta · CNESST",
                      "rate groups by industry, experience rated",
                      "permanent disability is a lifetime annuity —",
                      "the board's liability behaves like a pension"],
             x=36, gap=24, colour=TEAL)
    f.text(BCX, 348, "a general liability policy does not cover employee",
           cls="sm dim")
    f.text(BCX, 364, "injury — the board has exclusive jurisdiction",
           cls="sm dim")
    return f


@figure("Facility Association", "How a driver reaches FARM, and the market-share "
        "formula that spreads its result across every auto insurer", width=WID)
def facility_association() -> Fig:
    f = vcard()

    _flow(f, 110, ["driver", "broker", "carrier", "FA"],
          colours=[BLUE, TEAL, AMBER, ROSE], h=26)
    f.text(BCX, 144, "the servicing carrier issues and adjusts for", cls="sm dim")
    f.text(BCX, 160, "a fee — it does not bear the risk", cls="sm dim")
    f.line(30, 182, 330, 182, cls="rule")
    f.text(BCX, 204, "and the result lands on everyone", cls="sm bold")
    _hbar(f, 240, [(0.34, "A", BLUE), (0.27, "B", TEAL), (0.22, "C", AMBER),
                   (0.17, "D", GREEN)], x0=40, x1=320, height=30)
    f.text(BCX, 274, "by voluntary market share, serviced or not",
           cls="sm dim")
    f.text(BCX, 306, "who ends up in FARM: serious conviction records,",
           cls="sm dim")
    f.text(BCX, 322, "specialty vehicles no rating plan contemplates,",
           cls="sm dim")
    f.text(BCX, 338, "and — where rates are suppressed — ordinary risks",
           cls="sm dim")
    f.text(BCX, 366, "so FA volume reads the province's rate regime",
           cls="sm dim")
    return f


@figure("Risk Sharing Pool", "A compelled policy ceded to the pool while the "
        "policyholder keeps the ordinary rate and never learns of it",
        width=WID)
def risk_sharing_pool() -> Fig:
    f = vcard()

    f.chip(BCX, 104, "applicant meets the filed rules", colour=BLUE, w=250,
           h=28)
    f.arrow(BCX, 120, BCX, 144, colour="var(--dim)", width=1.3)
    f.chip(BCX, 160, "insurer must write, at its filed rate", colour=AMBER,
           w=270, h=28)
    f.arrow(120, 176, 96, 208, colour="var(--dim)", width=1.3)
    f.arrow(240, 176, 264, 208, colour=ROSE, width=1.3)
    f.box(36, 220, 130, 66, label="policyholder", colour=GREEN,
          sub="normal rate, and")
    f.text(101, 274, "never told", cls="sm dim")
    f.box(194, 220, 130, 66, label="the pool", colour=ROSE,
          sub="premium and losses")
    f.text(259, 274, "shared by share", cls="sm dim")
    f.text(BCX, 314, "cede where your own expected loss exceeds the",
           cls="sm dim")
    f.text(BCX, 330, "approved premium net of the pool's terms —", cls="sm dim")
    f.text(BCX, 346, "inside a cession window and a cession limit", cls="sm dim")
    f.text(BCX, 374, "no price signal ever reaches the driver", cls="sm dim")
    return f


@figure("Meredith Principles", "The five principles of Canadian workers' "
        "compensation, and what each is under pressure from", width=WID)
def meredith_principles() -> Fig:
    f = vcard()

    rows = [("1. No-fault compensation", GREEN),
            ("2. Collective liability", TEAL),
            ("3. Security of payment", BLUE),
            ("4. Exclusive jurisdiction", VIOLET),
            ("5. An independent board", AMBER)]
    for i, (name, colour) in enumerate(rows):
        y = 100 + i * 40
        f.rect(40, y, 280, 32, rx=6, fill=colour, fill_opacity="0.18",
               stroke=colour, stroke_width="1.2")
        f.text(BCX, y + 21, name, cls="sm")
    f.line(30, 314, 330, 314, cls="rule")
    f.text(BCX, 336, "and each is under strain: experience rating", cls="sm dim")
    f.text(BCX, 352, "against 2, an underfunded board against 3,", cls="sm dim")
    f.text(BCX, 368, "judicial review against 4 — and gig work", cls="sm dim")
    f.text(BCX, 384, "sits outside all five at once", cls="sm dim")
    return f


@figure("Public Auto Insurance", "The four Canadian public auto models and the "
        "trade each makes", width=WID)
def public_auto_insurance() -> Fig:
    f = vcard()

    for i, (name, note, colour) in enumerate(
            [("ICBC — BC", "monopoly, basic", BLUE),
             ("SGI — Sask.", "monopoly, basic", TEAL),
             ("MPI — Manitoba", "monopoly, basic", GREEN),
             ("SAAQ — Quebec", "bodily injury only", AMBER)]):
        y = 100 + i * 40
        f.rect(40, y, 280, 32, rx=6, fill=colour, fill_opacity="0.16",
               stroke=colour, stroke_width="1.2")
        f.text(52, y + 21, name, cls="sm bold", anchor="start")
        f.text(308, y + 21, note, cls="sm dim", anchor="end")
    f.line(30, 274, 330, 274, cls="rule")
    _columns(f, 288, ["For", "Against"],
             [["no commission", "no profit load", "universal access"],
              ["no competition", "political rates", "no MCT, no OSFI"]],
             x0=30, x1=330, row_h=20, head_h=24, colours=(GREEN, ROSE))
    return f


@figure("Disaster Financial Assistance Arrangements", "The federal share of a "
        "province's disaster cost rising in steps with cost per capita",
        width=WID)
def dfaa() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 30, 0, 100, left=48, right=16, top=26, bottom=158)
    ax.frame(xticks=[], yticks=[0, 50, 90], yfmt=lambda v: f"{v:.0f}%",
             grid=True)
    ax.polyline([(0, 0), (3, 0)], colour="var(--dim)", width=2)
    ax.polyline([(3, 50), (9, 50)], colour=BLUE, width=2.4)
    ax.polyline([(9, 75), (18, 75)], colour=TEAL, width=2.4)
    ax.polyline([(18, 90), (30, 90)], colour=GREEN, width=2.4)
    f.text(BCX, ax.y1 + 22, "provincial cost per capita", cls="sm dim")
    f.text(BCX, 274, "the province designs and delivers; Ottawa reimburses",
           cls="sm dim")
    f.line(30, 290, 330, 290, cls="rule")
    f.rect(40, 304, 280, 44, rx=7, fill=ROSE, fill_opacity="0.12", stroke=ROSE,
           stroke_width="1.2")
    f.text(BCX, 322, "nothing is reimbursed where insurance was", cls="sm")
    f.text(BCX, 339, "reasonably and readily available", cls="sm")
    f.text(BCX, 370, "so as flood became insurable, DFAA narrowed —", cls="sm dim")
    f.text(BCX, 386, "and reliable assistance is itself a moral hazard",
           cls="sm dim")
    return f


@figure("Social Insurance", "Individual equity against social adequacy — the "
        "trade every social insurance program makes", width=WID)
def social_insurance() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 10, left=48, right=18, top=28, bottom=142)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.polyline([(0.5, 0.5), (9.5, 9.5)], colour=BLUE, width=2, dash=True)
    ax.polyline([(0.5, 3.4), (9.5, 6.6)], colour=ROSE, width=2.4)
    ax.label(7.6, 8.8, "private", cls="sm bold", fill=BLUE)
    ax.label(7.4, 5.4, "social", cls="sm bold", fill=ROSE)
    f.text(BCX, ax.y1 + 22, "own expected cost", cls="sm dim")
    f.text(52, ax.y0 - 14, "contribution", cls="sm dim", anchor="start")
    f.line(30, 292, 330, 292, cls="rule")
    _bullets(f, 314, ["compulsory, because adverse selection unravels",
                      "a voluntary version of the same cover",
                      "and pay-as-you-go funding is the weak point",
                      "when the demographics turn"],
             x=38, gap=24, colour=AMBER)
    return f


@figure("Risk Transfer", "The two risks a reinsurance contract must transfer, and "
        "the features that destroy the transfer", width=WID)
def risk_transfer() -> Fig:
    f = vcard()

    f.chip(102, 108, "underwriting", colour=BLUE, w=124, h=28)
    f.text(102, 136, "how much", cls="sm dim")
    f.chip(258, 108, "timing", colour=TEAL, w=124, h=28)
    f.text(258, 136, "when", cls="sm dim")
    f.line(30, 158, 330, 158, cls="rule")
    f.text(BCX, 180, "features that destroy the transfer", cls="sm bold",
           fill=ROSE)
    _bullets(f, 204, ["a loss ratio corridor",
                      "an aggregate limit just above expected loss",
                      "retrospective premium adjustment",
                      "profit commissions that give the profit back",
                      "and any side letter, documented or not"],
             x=38, gap=24, colour=ROSE)
    f.rect(40, 330, 280, 46, rx=7, fill=AMBER, fill_opacity="0.12",
           stroke=AMBER, stroke_width="1.2")
    f.text(BCX, 350, "fail the test and it is deposit accounting:", cls="sm")
    f.text(BCX, 367, "no ceded premium, no ceded losses, no relief", cls="sm")
    return f


@figure("Adverse Selection", "The death spiral — pricing at the average drives the "
        "good risks out, and the average rises behind them", width=WID)
def adverse_selection() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 6, 0, 100, left=48, right=18, top=26, bottom=140)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.polyline([(0, 30), (1, 34), (2, 40), (3, 49), (4, 62), (5, 80),
                 (6, 100)], colour=ROSE, width=2.6)
    ax.polyline([(0, 96), (1, 82), (2, 66), (3, 50), (4, 34), (5, 20),
                 (6, 10)], colour=BLUE, width=2.6)
    ax.label(4.4, 88, "price", cls="sm bold", fill=ROSE)
    ax.label(4.4, 26, "insureds", cls="sm bold", fill=BLUE)
    f.text(BCX, ax.y1 + 22, "rounds of repricing — each loses the best risk",
           cls="sm dim")
    f.line(30, 292, 330, 292, cls="rule")
    _bullets(f, 314, ["defences: classification, underwriting,",
                      "waiting periods, compulsory participation",
                      "and every classification restriction puts",
                      "a little of the spiral back"],
             x=38, gap=24, colour=GREEN)
    return f


@figure("Moral Hazard", "The three moral hazards of an insured loss — before it, "
        "after it, and at the provider's desk", width=WID)
def moral_hazard() -> Fig:
    f = vcard()

    rows = [("Ex ante", "the sprinkler never gets installed", BLUE),
            ("Ex post", "treatment runs longer, repair runs richer", AMBER),
            ("Provider side", "the bill answers to an insured payer", ROSE)]
    _stack(f, 100, rows, x0=34, x1=326, h=48, gap=12, arrows=False)
    f.text(BCX, 292, "the last is usually the largest", cls="sm dim")
    f.line(30, 312, 330, 312, cls="rule")
    f.text(BCX, 334, "controls: deductible, coinsurance, experience",
           cls="sm dim")
    f.text(BCX, 350, "rating, claims management, benefit protocols",
           cls="sm dim")
    f.text(BCX, 378, "it is a rational response to incentives — not fraud",
           cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# C. Financial reporting, solvency and professional responsibility
# ═══════════════════════════════════════════════════════════════════════════

@figure("Solvency", "The three levels of solvency, and why only the third is the "
        "one a regulator acts on", width=WID)
def solvency() -> Fig:
    f = vcard()

    rows = [("Balance sheet", "assets exceed liabilities", TEAL),
            ("Regulatory", "and by the required margin", BLUE),
            ("Economic", "and would still, under stress", VIOLET)]
    _stack(f, 100, rows, x0=34, x1=326, h=48, gap=14)
    f.text(BCX, 296, "a ratio at a point in time says little —", cls="sm dim")
    f.text(BCX, 312, "the questions are which way it is moving,", cls="sm dim")
    f.text(BCX, 328, "and what would happen if the tail arrived", cls="sm dim")
    f.text(BCX, 358, "OSFI does not promise zero failures: a regime",
           cls="sm dim")
    f.text(BCX, 374, "with none is a regime charging far too much",
           cls="sm dim")
    return f


@figure("Canadian Annual Return", "What the annual return carries, and the "
        "quarterly return that keeps OSFI current between filings", width=WID)
def canadian_annual_return() -> Fig:
    f = vcard()

    rows = [("Audited statements", "position, income, OCI, equity, cash", BLUE),
            ("Supplementary exhibits", "by province and class; claims "
             "development", TEAL),
            ("The MCT calculation", "available, required, buffer", AMBER),
            ("The AA's report", "and the Statement of Actuarial Opinion",
             VIOLET)]
    _stack(f, 96, rows, x0=30, x1=330, h=46, gap=10, arrows=False,
           sub_cls="sm dim")
    f.line(30, 328, 330, 328, cls="rule")
    f.text(BCX, 350, "the claims development exhibit is the one analysts",
           cls="sm dim")
    f.text(BCX, 366, "read first — it shows every prior year's estimate",
           cls="sm dim")
    f.text(BCX, 382, "moving, filing after filing", cls="sm dim")
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


@figure("Insurance Companies Act", "The sections of the ICA that create and "
        "protect the Appointed Actuary's role", width=WID)
def insurance_companies_act() -> Fig:
    f = vcard()

    rows = [("s. 357", "the directors appoint, and only they remove", BLUE),
            ("s. 365", "value in accordance with accepted practice", TEAL),
            ("ss. 358–368", "access to records, and the duty to report",
             AMBER),
            ("s. 361", "civil immunity for good-faith statements", GREEN),
            ("s. 515", "adequate capital and appropriate liquidity", VIOLET)]
    for i, (sec, what, colour) in enumerate(rows):
        y = 98 + i * 50
        f.rect(34, y, 292, 42, rx=6, fill=colour, fill_opacity="0.14",
               stroke=colour, stroke_width="1.2")
        f.text(44, y + 18, sec, cls="sm bold", anchor="start", fill=colour)
        f.text(44, y + 33, what, cls="sm", anchor="start")
    f.text(BCX, 372, "a provincial Insurance Act mirrors all of it",
           cls="sm dim")
    return f


@figure("Financial Position", "The running insurer's balance sheet, and the step "
        "from equity to capital available", width=WID)
def financial_position() -> Fig:
    f = vcard()

    f.text(BCX, 100, "the running insurer, $M", cls="sm dim")
    scale = 200 / ASSETS
    f.rect(46, 118, 110, ASSETS * scale, rx=6, fill=BLUE, fill_opacity="0.20",
           stroke=BLUE, stroke_width="1.3")
    f.text(101, 208, "assets", cls="sm bold")
    f.text(101, 224, "1,240", cls="sm dim")
    f.rect(204, 118, 110, LIABS * scale, rx=6, fill=AMBER, fill_opacity="0.20",
           stroke=AMBER, stroke_width="1.3")
    f.text(259, 190, "liabilities", cls="sm bold")
    f.text(259, 206, "980", cls="sm dim")
    f.rect(204, 118 + LIABS * scale + 4, 110, EQUITY * scale - 4, rx=6,
           fill=GREEN, fill_opacity="0.24", stroke=GREEN, stroke_width="1.3")
    f.text(259, 300, "equity 260", cls="sm bold")
    f.text(180, 200, "=", cls="ttl", fill="var(--dim)")
    f.line(30, 330, 330, 330, cls="rule")
    f.text(BCX, 352, "less $12M of intangibles and goodwill", cls="sm dim")
    f.text(BCX, 368, "→ capital available $248M", cls="sm bold", fill=GREEN)
    f.text(BCX, 388, "IFRS 17 grossed both sides up — reinsurance is an asset",
           cls="sm dim")
    return f


@figure("Net Income", "Net income built from the insurance service result and the "
        "net financial result, separately", width=WID)
def net_income() -> Fig:
    f = vcard()

    _waterfall(f, 260,
               [("ISR", 38.0, BLUE), ("financial", 22.0, TEAL),
                ("other", -6.0, AMBER), ("tax", -14.6, ROSE),
                ("net", None, GREEN)],
               x0=40, x1=322, top=118, fmt=lambda v: f"{abs(v):,.0f}")
    f.text(BCX, 298, "$M, the running insurer", cls="sm dim")
    f.line(30, 318, 330, 318, cls="rule")
    f.text(BCX, 338, "before IFRS 17 the two were mingled, so a rate",
           cls="sm dim")
    f.text(BCX, 354, "move could flatter or spoil the underwriting result",
           cls="sm dim")
    f.text(BCX, 380, "and net income is not cash — premium comes first",
           cls="sm dim")
    return f


@figure("Comprehensive Income", "Net income plus the items IFRS keeps outside "
        "profit or loss, and where they end up", width=WID)
def comprehensive_income() -> Fig:
    f = vcard()

    _waterfall(f, 250,
               [("net income", 39.4, GREEN), ("OCI", -14.0, ROSE),
                ("total", None, BLUE)],
               x0=64, x1=298, top=104, bar_frac=0.52,
               fmt=lambda v: f"{abs(v):,.0f}")
    f.text(BCX, 288, "$M, the running insurer", cls="sm dim")
    f.line(30, 306, 330, 306, cls="rule")
    _bullets(f, 328, ["FVOCI bonds — where the portfolio sits",
                      "the discount-rate effect, if OCI is elected",
                      "pension remeasurement and translation"],
             x=38, gap=24, colour=VIOLET)
    return f


@figure("Statement of Changes in Equity", "Opening equity reconciled to closing "
        "through comprehensive income, dividends and capital transactions",
        width=WID)
def statement_of_changes_in_equity() -> Fig:
    f = vcard()

    _waterfall(f, 264,
               [("open", 245.0, TEAL), ("net income", 39.4, GREEN),
                ("OCI", -14.0, ROSE), ("dividends", -10.4, AMBER),
                ("close", None, BLUE)],
               x0=36, x1=326, top=126, bar_frac=0.62,
               fmt=lambda v: f"{abs(v):,.0f}")
    f.text(BCX, 302, "$M, the running insurer", cls="sm dim")
    f.line(30, 320, 330, 320, cls="rule")
    f.text(BCX, 342, "the dividend is the line OSFI watches: paying it",
           cls="sm dim")
    f.text(BCX, 358, "out while the capital ratio falls is distributing",
           cls="sm dim")
    f.text(BCX, 374, "capital the insurer may shortly need", cls="sm dim")
    return f


@figure("Quarterly Return", "Three quarterly filings between annual returns, and "
        "what a regulator would otherwise miss", width=WID)
def quarterly_return() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 5, 100, 175, left=48, right=18, top=28, bottom=162)
    ax.frame(xticks=[], yticks=[100, 150], yfmt=lambda v: f"{v:.0f}%",
             grid=True)
    pts = [(0.5, 168), (1.5, 160), (2.5, 149), (3.5, 133), (4.5, 118)]
    ax.polyline(pts, colour=ROSE, width=2.4)
    for x, y in pts:
        ax.point(x, y, colour=ROSE, r=3.6)
    ax.label(0.5, 168, "annual", cls="sm dim", dy=-10)
    ax.label(4.5, 118, "annual", cls="sm dim", dy=16)
    ax.hline(150, colour=AMBER, label=None)
    ax.label(2.4, 155, "supervisory target", cls="sm", fill=AMBER)
    f.text(BCX, ax.y1 + 22, "quarters", cls="sm dim")
    f.text(BCX, 276, "without the three points between, this insurer",
           cls="sm dim")
    f.text(BCX, 292, "looks fine until it does not", cls="sm dim")
    f.line(30, 310, 330, 310, cls="rule")
    f.text(BCX, 332, "the liabilities are still estimated each quarter,",
           cls="sm dim")
    f.text(BCX, 348, "usually rolled forward — which is exactly what",
           cls="sm dim")
    f.text(BCX, 364, "will not catch a deterioration in the emergence",
           cls="sm dim")
    f.text(BCX, 388, "read the sequence, not any one ratio", cls="sm dim")
    return f


@figure("Notes to Financial Statements", "The IFRS 17 disclosures that decide "
        "whether two insurers' numbers can be compared at all", width=WID)
def notes_to_financial_statements() -> Fig:
    f = vcard()

    _bullets(f, 106, ["the LRC, loss component, LIC and CSM,",
                      "reconciled opening to closing",
                      "the risk adjustment's confidence level",
                      "the discount rate method and the curves",
                      "the coverage unit driver",
                      "claims development tables",
                      "the transition approach taken"],
             x=38, gap=26, colour=BLUE)
    f.line(30, 306, 330, 306, cls="rule")
    f.text(BCX, 328, "two insurers can hold identical risk and report",
           cls="sm dim")
    f.text(BCX, 344, "different liabilities — the confidence level and",
           cls="sm dim")
    f.text(BCX, 360, "the discount method are where the difference is",
           cls="sm dim")
    f.text(BCX, 386, "plus IFRS 7 risk, sensitivity and credit disclosures",
           cls="sm dim")
    return f


@figure("MSA Ratios", "The combined ratio split into its parts, and the four "
        "families of ratio a Canadian analyst reads", width=WID)
def msa_ratios() -> Fig:
    f = vcard()

    _hbar(f, 132, [(0.64, "loss 64%", BLUE), (0.31, "exp 31%", AMBER),
                   (0.05, "", GREEN)], x0=40, x1=320, height=34)
    f.text(320, 166, "underwriting profit 5%", cls="sm", fill=GREEN,
           anchor="end")
    f.line(30, 190, 330, 190, cls="rule")
    _bullets(f, 212, ["profitability — loss, expense, combined, ROE",
                      "leverage — premium and reserves to surplus",
                      "adequacy — one- and two-year development",
                      "capital — the MCT ratio, and its trend"],
             x=38, gap=26, colour=TEAL)
    f.text(BCX, 336, "no single ratio diagnoses anything — distress is",
           cls="sm dim")
    f.text(BCX, 352, "rapid growth, thin capital and adverse development",
           cls="sm dim")
    f.text(BCX, 368, "arriving together", cls="sm dim")
    f.text(BCX, 390, "and under IFRS 17 revenue is not earned premium",
           cls="sm dim")
    return f


@figure("Accepted Actuarial Practice", "The hierarchy the phrase points at, and "
        "the statutory hook that gives it legal effect", width=WID)
def accepted_actuarial_practice() -> Fig:
    f = vcard()

    rows = [("Rules of Professional Conduct", "how to behave", VIOLET),
            ("Standards of Practice", "binding — what must be done", BLUE),
            ("Educational Notes", "guidance, not binding", TEAL),
            ("Generally accepted practice", "where the standards are silent",
             GREEN)]
    _stack(f, 96, rows, x0=30, x1=330, h=46, gap=10, arrows=False)
    f.line(30, 326, 330, 326, cls="rule")
    f.text(BCX, 348, "departure is allowed, with the departure and", cls="sm dim")
    f.text(BCX, 364, "its reason disclosed — silence is not", cls="sm dim")
    f.text(BCX, 388, "and it moves: MfADs became the risk adjustment",
           cls="sm dim")
    return f


@figure("IFRS 17", "The two liabilities, the three measurement models, and which "
        "one a Canadian P&C insurer actually uses", width=WID)
def ifrs_17() -> Fig:
    f = vcard()

    f.box(38, 100, 128, 62, label="LRC", colour=BLUE,
          sub="service not yet given")
    f.box(194, 100, 128, 62, label="LIC", colour=AMBER,
          sub="claims already incurred")
    f.line(30, 180, 330, 180, cls="rule")
    f.text(BCX, 202, "three measurement models", cls="sm bold")
    for i, (name, note, colour) in enumerate(
            [("GMM", "the default — building blocks", TEAL),
             ("PAA", "short contracts — most Canadian P&C", GREEN),
             ("VFA", "direct participating — not P&C", VIOLET)]):
        y = 220 + i * 44
        f.rect(34, y, 292, 36, rx=6, fill=colour, fill_opacity="0.16",
               stroke=colour, stroke_width="1.2")
        f.text(46, y + 23, name, cls="sm bold", anchor="start", fill=colour)
        f.text(314, y + 23, note, cls="sm dim", anchor="end")
    f.text(BCX, 372, "discounting is mandatory, the RA replaced MfADs,",
           cls="sm dim")
    f.text(BCX, 388, "and reinsurance held is never netted", cls="sm dim")
    return f


@figure("Insurance Contract Liabilities", "The insurer's contract liability split "
        "into the two halves, measured on entirely different bases", width=WID)
def insurance_contract_liabilities() -> Fig:
    f = vcard()

    _hbar(f, 128, [(LRC_CO, "LRC 190", BLUE), (LIC_CO, "LIC 450", AMBER)],
          x0=40, x1=320, height=38)
    _columns(f, 168, ["LRC", "LIC"],
             [["premium-driven", "released as", "coverage is given",
               "unearned premium's", "successor"],
              ["claim-driven", "run off as", "claims are paid",
               "case, IBNR, ALAE", "— the actuary's half"]],
             x0=30, x1=330, row_h=20, head_h=24, colours=(BLUE, AMBER))
    f.text(BCX, 322, "confusing the two is the commonest IFRS 17 error",
           cls="sm dim")
    f.text(BCX, 348, "reinsurance held is a separate asset, so the",
           cls="sm dim")
    f.text(BCX, 364, "balance sheet shows both liabilities gross",
           cls="sm dim")
    f.text(BCX, 388, "and the Appointed Actuary opines on the total",
           cls="sm dim")
    return f


@figure("Liability for Remaining Coverage", "The running PAA book's LRC at six "
        "months, and the loss component the onerous test adds to it", width=WID)
def liability_for_remaining_coverage() -> Fig:
    f = vcard()

    f.text(BCX, 100, "$24M written 1 July, at 31 December ($M)", cls="sm dim")
    rows = [("premium unearned", 12.0, BLUE),
            ("less acquisition", -2.4, AMBER),
            ("LRC carried", 9.6, TEAL),
            ("fulfilment cash flows", 11.5, ROSE)]
    for i, (name, value, colour) in enumerate(rows):
        y = 124 + i * 44
        f.text(40, y, name, cls="sm", anchor="start")
        f.rect(40, y + 8, abs(value) * 19, 20, rx=3, fill=colour,
               fill_opacity="0.55")
        f.text(40 + abs(value) * 19 + 8, y + 23,
               f"{value:+.1f}" if value < 0 else f"{value:.1f}", cls="sm",
               anchor="start")
    f.line(30, 302, 330, 302, cls="rule")
    f.rect(40, 316, 280, 46, rx=7, fill=ROSE, fill_opacity="0.12", stroke=ROSE,
           stroke_width="1.2")
    f.text(BCX, 336, "the group is onerous by $1.9M — recognised", cls="sm")
    f.text(BCX, 353, "in full now, and tracked as the loss component",
           cls="sm")
    f.text(BCX, 384, "the test is per group: no profitable group offsets it",
           cls="sm dim")
    return f


@figure("Liability for Incurred Claims", "The LIC as discounted fulfilment cash "
        "flows plus a risk adjustment, and no margin beyond", width=WID)
def liability_for_incurred_claims() -> Fig:
    f = vcard()

    _waterfall(f, 236,
               [("undiscounted", 486.0, "var(--dim)"),
                ("discount", -66.0, TEAL), ("RA", 30.0, VIOLET),
                ("LIC", None, BLUE)],
               x0=48, x1=314, top=118, bar_frac=0.58,
               fmt=lambda v: f"{abs(v):,.0f}")
    f.text(BCX, 274, "$M — case, IBNR and ALAE, at current rates",
           cls="sm dim")
    f.line(30, 294, 330, 294, cls="rule")
    _bullets(f, 316, ["no CSM — the service is already provided",
                      "the estimate is the mean, not a prudent figure",
                      "discounting is mandatory, with no PAA relief"],
             x=38, gap=24, colour=AMBER)
    f.text(BCX, 390, "reinsurance recoveries sit in the separate asset",
           cls="sm dim")
    return f


@figure("Fulfilment Cash Flows", "The three building blocks of a fulfilment "
        "measurement, and where each lands on the income statement", width=WID)
def fulfilment_cash_flows() -> Fig:
    f = vcard()

    rows = [("Expected cash flows", "unbiased, probability-weighted", BLUE),
            ("Time value of money", "current, market-consistent rates", TEAL),
            ("Risk adjustment", "for non-financial uncertainty", VIOLET)]
    _stack(f, 100, rows, x0=34, x1=326, h=48, gap=12, arrows=False)
    f.line(30, 268, 330, 268, cls="rule")
    f.text(BCX, 290, "and the split drives the income statement", cls="sm bold")
    f.text(BCX, 316, "a change in the cash flow estimate →", cls="sm dim")
    f.text(BCX, 332, "insurance service expenses", cls="sm", fill=AMBER)
    f.text(BCX, 356, "a change in the discount rate →", cls="sm dim")
    f.text(BCX, 372, "insurance finance income or expenses", cls="sm", fill=TEAL)
    return f


@figure("Risk Adjustment for Non-Financial Risk", "The risk adjustment read off "
        "the liability distribution, and the confidence level that must be "
        "disclosed", width=WID)
def risk_adjustment() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 0.42, left=44, right=16, top=30, bottom=150)
    ax.area(lambda x: 0.40 * 2.718 ** (-0.5 * (x - 3.4) ** 2 / 1.6), 0, 4.2,
            colour=BLUE, opacity="0.16")
    ax.area(lambda x: 0.40 * 2.718 ** (-0.5 * (x - 3.4) ** 2 / 1.6), 4.2, 10,
            colour=VIOLET, opacity="0.24")
    ax.curve(lambda x: 0.40 * 2.718 ** (-0.5 * (x - 3.4) ** 2 / 1.6),
             colour=BLUE, width=2.2)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.vline(3.4, colour="var(--dim)", y_top=0.40)
    ax.vline(6.0, colour=VIOLET, y_top=0.30)
    ax.label(3.4, 0.42, "mean", cls="sm dim", dy=-4)
    ax.label(6.0, 0.32, "75th", cls="sm bold", fill=VIOLET, dy=-4)
    brace(f, ax.px(3.4), ax.px(6.0), ax.y1 + 8, depth=8, colour=VIOLET,
          label="the RA is the gap between them")
    f.line(30, 282, 330, 282, cls="rule")
    _bullets(f, 304, ["higher for low-frequency, high-severity risk",
                      "higher for long duration and wide uncertainty",
                      "released as the risk expires, so slowly on",
                      "a long-tail line"],
             x=38, gap=24, colour=TEAL)
    return f


@figure("IFRS 17 Discount Rates", "The bottom-up and top-down constructions "
        "arriving at the same curve from opposite ends", width=WID)
def ifrs_17_discount_rates() -> Fig:
    f = vcard()

    f.text(100, 112, "bottom-up", cls="sm bold", fill=BLUE)
    f.text(260, 112, "top-down", cls="sm bold", fill=AMBER)
    f.rect(52, 224, 96, 76, rx=6, fill=BLUE, fill_opacity="0.30")
    f.text(100, 266, "risk-free", cls="sm")
    f.rect(52, 176, 96, 44, rx=6, fill=TEAL, fill_opacity="0.40")
    f.text(100, 202, "illiquidity", cls="sm")
    f.rect(212, 176, 96, 124, rx=6, fill=AMBER, fill_opacity="0.30")
    f.text(260, 242, "what is left", cls="sm")
    f.rect(212, 124, 96, 46, rx=6, fill=ROSE, fill_opacity="0.40")
    f.text(260, 143, "less credit", cls="sm")
    f.text(260, 159, "and market risk", cls="sm")
    f.line(40, 173, 320, 173, cls="thin dash", stroke=VIOLET,
           stroke_width="1.5")
    f.text(BCX, 322, "the dashed line is the rate — built up from below",
           cls="sm dim")
    f.text(BCX, 338, "or from above, and IFRS 17 does not make them meet",
           cls="sm dim")
    f.text(BCX, 364, "current every period, except the CSM's locked-in rate",
           cls="sm dim")
    f.text(BCX, 386, "the effects land in insurance finance income or expense",
           cls="sm dim")
    return f


@figure("Contractual Service Margin", "The CSM set so there is no day-one gain, "
        "then released over coverage units", width=WID)
def contractual_service_margin() -> Fig:
    f = vcard()

    _hbar(f, 124, [(44.0, "outflows 44", AMBER), (5.0, "RA", VIOLET),
                   (11.0, "CSM 11", GREEN)], x0=40, x1=320, height=34)
    f.text(BCX, 162, "the $60M premium, divided so no gain", cls="sm dim")
    f.text(BCX, 178, "is recognised on day one", cls="sm dim")
    f.line(30, 198, 330, 198, cls="rule")
    _vbars(f, [4.4, 3.85, 2.75], ["year 1", "year 2", "year 3"], 306,
           x0=68, x1=292, top=5.0, height=84, fmt=lambda v: f"{v:.1f}",
           colours=[GREEN, GREEN, GREEN])
    f.text(BCX, 340, "released on coverage units — 40%, 35%, 25%",
           cls="sm dim")
    f.text(BCX, 364, "a revision to future service adjusts the CSM;",
           cls="sm dim")
    f.text(BCX, 380, "one to past service hits profit at once", cls="sm dim")
    return f


@figure("General Measurement Model", "The GMM's three building blocks stacked "
        "into one liability, all remeasured every period", width=WID)
def general_measurement_model() -> Fig:
    f = vcard()

    x0, w = 116, 128
    f.rect(x0, 230, w, 74, rx=6, fill=BLUE, fill_opacity="0.28", stroke=BLUE,
           stroke_width="1.2")
    f.text(x0 + w / 2, 262, "PV of expected", cls="sm")
    f.text(x0 + w / 2, 278, "cash flows", cls="sm")
    f.rect(x0, 178, w, 48, rx=6, fill=VIOLET, fill_opacity="0.28",
           stroke=VIOLET, stroke_width="1.2")
    f.text(x0 + w / 2, 207, "risk adjustment", cls="sm")
    f.rect(x0, 126, w, 48, rx=6, fill=GREEN, fill_opacity="0.28", stroke=GREEN,
           stroke_width="1.2")
    f.text(x0 + w / 2, 155, "CSM", cls="sm")
    f.text(x0 - 8, 150, "profit", cls="sm dim", anchor="end")
    f.text(x0 - 8, 203, "risk", cls="sm dim", anchor="end")
    f.text(x0 - 8, 270, "cost", cls="sm dim", anchor="end")
    f.text(BCX, 328, "the LIC is measured the same way under both",
           cls="sm dim")
    f.text(BCX, 344, "models — the choice only ever touches the LRC",
           cls="sm dim")
    f.text(BCX, 370, "and it is the expensive one: full projection, a",
           cls="sm dim")
    f.text(BCX, 386, "locked-in rate, and coverage units to track", cls="sm dim")
    return f


@figure("Premium Allocation Approach", "The PAA eligibility test, and the half of "
        "the liability it does not simplify", width=WID)
def premium_allocation_approach() -> Fig:
    f = vcard()

    f.text(BCX, 102, "eligible if either holds", cls="sm dim")
    f.box(36, 118, 130, 64, label="coverage ≤", colour=GREEN,
          sub="one year")
    f.box(194, 118, 130, 64, label="or it gives", colour=TEAL,
          sub="a similar answer")
    f.line(30, 198, 330, 198, cls="rule")
    f.text(BCX, 220, "but only the LRC is simplified", cls="sm bold")
    f.box(36, 236, 130, 62, label="LRC", colour=GREEN, sub="simplified")
    f.box(194, 236, 130, 62, label="LIC", colour=ROSE,
          sub="identical to GMM")
    f.text(BCX, 326, "no CSM, so profit emerges as revenue exceeds",
           cls="sm dim")
    f.text(BCX, 342, "claims — but the onerous test still bites", cls="sm dim")
    f.text(BCX, 368, "not available for multi-year commercial contracts,",
           cls="sm dim")
    f.text(BCX, 384, "extended warranty, surety or long-term liability",
           cls="sm dim")
    return f


@figure("Contract Boundary", "The boundary ending where the insurer can reprice, "
        "and the guarantee that pushes it out", width=WID)
def contract_boundary() -> Fig:
    f = vcard()

    y = 148
    f.arrow(40, y, 330, y, colour="var(--axis)", width=1.2)
    for x, lab in ((56, "issue"), (168, "renewal"), (280, "renewal")):
        f.line(x, y - 5, x, y + 5, cls="tick")
        f.text(x, y + 19, lab, cls="sm dim")
    f.rect(56, y - 26, 112, 18, rx=3, fill=BLUE, fill_opacity="0.50")
    f.text(112, y - 13, "in boundary", cls="sm")
    f.text(240, y - 13, "outside", cls="sm dim")
    f.text(BCX, 108, "an ordinary annual policy", cls="sm dim")
    f.line(30, 190, 330, 190, cls="rule")
    y2 = 250
    f.arrow(40, y2, 330, y2, colour="var(--axis)", width=1.2)
    f.rect(56, y2 - 26, 224, 18, rx=3, fill=ROSE, fill_opacity="0.50")
    f.text(168, y2 - 13, "in boundary", cls="sm")
    f.text(BCX, 214, "guaranteed renewable, at a capped price",
           cls="sm dim")
    f.text(BCX, y2 + 20, "the insurer cannot price for deterioration",
           cls="sm dim")
    f.text(BCX, 306, "so the boundary picks the model too: one year", cls="sm dim")
    f.text(BCX, 322, "makes a group PAA-eligible without argument",
           cls="sm dim")
    f.text(BCX, 350, "it is a legal and practical judgement, not", cls="sm dim")
    f.text(BCX, 366, "arithmetic — a regulatory cap on repricing", cls="sm dim")
    f.text(BCX, 382, "can extend a boundary the wording does not",
           cls="sm dim")
    return f


@figure("Level of Aggregation", "A portfolio cut by annual cohort and by "
        "profitability into the groups IFRS 17 measures", width=WID)
def level_of_aggregation() -> Fig:
    f = vcard()

    f.chip(BCX, 106, "portfolio — personal auto, Ontario", colour=VIOLET,
           w=276, h=28)
    for j, cohort in enumerate(["2024", "2025"]):
        x0 = 44 + j * 142
        f.text(x0 + 60, 146, cohort, cls="sm bold", fill=BLUE)
        for i, (name, colour) in enumerate(
                [("onerous", ROSE), ("may become", AMBER),
                 ("profitable", GREEN)]):
            y = 160 + i * 44
            f.rect(x0, y, 120, 36, rx=5, fill=colour, fill_opacity="0.22",
                   stroke=colour, stroke_width="1.2")
            f.text(x0 + 60, y + 22, name, cls="sm")
    f.text(BCX, 318, "six groups from one portfolio, and the onerous",
           cls="sm dim")
    f.text(BCX, 334, "test runs in each of them separately", cls="sm dim")
    f.text(BCX, 360, "the annual cohort is what stops new profitable",
           cls="sm dim")
    f.text(BCX, 376, "business from hiding an older loss", cls="sm dim")
    return f


@figure("Coverage Units", "The same CSM released on two different drivers, and "
        "the profit pattern each produces", width=WID)
def coverage_units() -> Fig:
    f = vcard()

    f.text(BCX, 102, "$11M of CSM, released three ways ($M)", cls="sm dim")
    for i, (name, pat, colour) in enumerate(
            [("policy count", [3.67, 3.67, 3.66], BLUE),
             ("sum insured", [4.40, 3.85, 2.75], AMBER)]):
        y = 126 + i * 100
        f.text(40, y, name, cls="sm bold", anchor="start", fill=colour)
        for k, v in enumerate(pat):
            f.rect(56 + k * 88, y + 62 - v * 10, 62, v * 10, rx=3, fill=colour,
                   fill_opacity="0.70")
            f.text(87 + k * 88, y + 58 - v * 10, f"{v:.1f}", cls="sm")
            f.text(87 + k * 88, y + 78, f"yr {k + 1}", cls="sm dim")
        f.line(50, y + 62, 300, y + 62, cls="axis")
    f.text(BCX, 330, "same total, different years — which is why the",
           cls="sm dim")
    f.text(BCX, 346, "driver has to be disclosed", cls="sm dim")
    f.text(BCX, 372, "units count expected coverage, so expected lapses are",
           cls="sm dim")
    f.text(BCX, 388, "in them — and none of it applies under the PAA",
           cls="sm dim")
    return f


@figure("Onerous Contract", "The onerous test at group level, and the asymmetry "
        "between a loss and a profit", width=WID)
def onerous_contract() -> Fig:
    f = vcard()

    for i, (name, inflow, outflow, colour) in enumerate(
            [("group A", 100, 86, GREEN), ("group B", 100, 118, ROSE)]):
        y = 112 + i * 100
        f.text(40, y, name, cls="sm bold", anchor="start")
        f.rect(40, y + 12, inflow * 2.3, 22, rx=3, fill=BLUE,
               fill_opacity="0.35")
        f.text(46, y + 28, "consideration", cls="sm", anchor="start")
        f.rect(40, y + 42, outflow * 2.3, 22, rx=3, fill=colour,
               fill_opacity="0.50")
        f.text(46, y + 58, "fulfilment cash flows", cls="sm", anchor="start")
    f.text(BCX, 188, "profitable — the margin is deferred as CSM",
           cls="sm dim")
    f.text(BCX, 296, "onerous — the shortfall is a loss today", cls="sm",
           fill=ROSE)
    f.line(30, 316, 330, 316, cls="rule")
    f.text(BCX, 338, "tested per group, at issue and at every", cls="sm dim")
    f.text(BCX, 354, "reporting date — no profitable group offsets it",
           cls="sm dim")
    f.text(BCX, 380, "a rate approved below the indication is the warning",
           cls="sm dim")
    return f


@figure("Loss Component", "The two parts of an onerous group's LRC, and why only "
        "one of them ever becomes revenue", width=WID)
def loss_component() -> Fig:
    f = vcard()

    _hbar(f, 128, [(9.6, "coverage 9.6", BLUE), (1.9, "1.9", ROSE)],
          x0=40, x1=320, height=36)
    f.text(320, 164, "the loss component", cls="sm", fill=ROSE, anchor="end")
    f.text(BCX, 196, "the blue is released as revenue; the red is", cls="sm dim")
    f.text(BCX, 212, "released against expenses and never becomes any",
           cls="sm dim")
    f.line(30, 232, 330, 232, cls="rule")
    _bullets(f, 254, ["the loss is already in profit or loss, so the",
                      "claims it anticipated must not be charged twice",
                      "so reported revenue on an onerous group is",
                      "lower than the premium written for it"],
             x=38, gap=24, colour=AMBER)
    f.text(BCX, 366, "improve the estimate and the loss component reverses",
           cls="sm dim")
    f.text(BCX, 382, "first — before any CSM can be established", cls="sm dim")
    return f


@figure("Insurance Acquisition Cash Flows", "Directly attributable acquisition "
        "costs absorbed into the LRC — with no deferred asset left behind",
        width=WID)
def insurance_acquisition_cash_flows() -> Fig:
    f = vcard()

    _columns(f, 100, ["Directly", "Not"],
             [["commission", "premium tax", "underwriting", "policy issue"],
              ["brand advertising", "product design", "sales overhead",
               "IT projects"]],
             x0=30, x1=330, row_h=22, colours=(GREEN, ROSE))
    f.text(BCX, 242, "attributable to the portfolio, or not", cls="sm dim")
    f.line(30, 256, 330, 256, cls="rule")
    f.text(BCX, 278, "and the choice under the PAA", cls="sm bold")
    _pill_row(f, 306, ["defer into the LRC", "or expense at once"],
              [BLUE, AMBER], x0=36, x1=324, h=26)
    f.text(BCX, 342, "available only where coverage is a year or less,",
           cls="sm dim")
    f.text(BCX, 358, "applied consistently by group, and disclosed",
           cls="sm dim")
    f.text(BCX, 384, "they are fulfilment cash flows — so they feed the "
           "onerous test", cls="sm dim")
    return f


@figure("Insurance Revenue", "The GMM revenue build-up for year one of the running "
        "group, component by component", width=WID)
def insurance_revenue() -> Fig:
    f = vcard()

    _waterfall(f, 254,
               [("claims", 17.6, BLUE), ("RA", 2.0, VIOLET),
                ("CSM", 4.4, GREEN), ("revenue", None, TEAL)],
               x0=52, x1=310, top=118, bar_frac=0.56,
               fmt=lambda v: f"{v:.1f}")
    f.text(BCX, 292, "$M — year 1 of the running group, 40% of coverage",
           cls="sm dim")
    f.line(30, 312, 330, 312, cls="rule")
    _bullets(f, 334, ["deposit components are excluded",
                      "ceded premium is not deducted from it",
                      "under the PAA it is simply premium earned"],
             x=38, gap=24, colour=AMBER)
    return f


@figure("Insurance Service Expenses", "What lands in insurance service expenses "
        "and what is routed to finance instead", width=WID)
def insurance_service_expenses() -> Fig:
    f = vcard()

    _columns(f, 100, ["In", "Out"],
             [["incurred claims", "and ALAE", "claims handling",
               "acquisition", "amortised", "onerous losses"],
              ["discount unwind", "rate changes", "general overhead",
               "not attributable", "reinsurance", "recoveries"]],
             x0=30, x1=330, row_h=20, head_h=24, colours=(BLUE, ROSE))
    f.line(30, 288, 330, 288, cls="rule")
    f.text(BCX, 310, "the routing rule, in one line", cls="sm bold")
    f.text(BCX, 334, "past service → here, in profit or loss", cls="sm",
           fill=BLUE)
    f.text(BCX, 354, "future service → the CSM, or a loss component",
           cls="sm", fill=GREEN)
    f.text(BCX, 380, "and on an onerous group the loss component offsets it",
           cls="sm dim")
    return f


@figure("Insurance Service Result", "The IFRS 17 income statement down to the "
        "insurance service result, with reinsurance on its own line", width=WID)
def insurance_service_result() -> Fig:
    f = vcard()

    rows = [("Insurance revenue", "420", BLUE),
            ("Insurance service expenses", "(370)", AMBER),
            ("Net reinsurance expense", "(12)", VIOLET),
            ("Insurance service result", "38", GREEN)]
    for i, (name, amount, colour) in enumerate(rows):
        y = 108 + i * 52
        f.rect(34, y, 292, 40, rx=6, fill=colour, fill_opacity="0.16",
               stroke=colour, stroke_width="1.2")
        f.text(46, y + 25, name, cls="sm", anchor="start")
        f.text(314, y + 25, amount, cls="sm bold", anchor="end")
        if i == 3:
            f.line(34, y - 6, 326, y - 6, cls="rule")
    f.text(BCX, 336, "$M, the running insurer — investment return and",
           cls="sm dim")
    f.text(BCX, 352, "every interest-rate effect are reported below this",
           cls="sm dim")
    f.text(BCX, 380, "close to an underwriting result, but not the "
           "combined ratio", cls="sm dim")
    return f


@figure("Insurance Finance Income or Expenses", "The predictable unwind of "
        "discount beside the volatile effect of a rate change", width=WID)
def insurance_finance_income_or_expenses() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 6, 380, 540, left=48, right=16, top=28, bottom=160)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.polyline([(0, 420), (1, 431), (2, 443), (3, 455), (4, 468), (5, 481),
                 (6, 495)], colour=TEAL, width=2.4)
    ax.polyline([(3, 455), (3.06, 500)], colour=ROSE, width=2.4)
    ax.polyline([(3.06, 500), (4, 512), (5, 525), (6, 538)], colour=ROSE,
                width=2.4, dash=True)
    ax.label(1.5, 428, "unwind", cls="sm bold", fill=TEAL, dy=13)
    ax.label(3.2, 512, "rates fall", cls="sm bold", fill=ROSE, anchor="start")
    f.text(BCX, ax.y1 + 22, "the liability, period by period", cls="sm dim")
    f.line(30, 274, 330, 274, cls="rule")
    f.text(BCX, 296, "kept out of the insurance service result, so", cls="sm dim")
    f.text(BCX, 312, "underwriting is measured on its own", cls="sm dim")
    f.text(BCX, 340, "a fall in rates raises the liability and produces",
           cls="sm dim")
    f.text(BCX, 356, "a finance expense — while the bonds backing it",
           cls="sm dim")
    f.text(BCX, 372, "gain in value, often through OCI", cls="sm dim")
    return f


@figure("Other Comprehensive Income Option", "The same rate effect routed to OCI "
        "instead of profit, leaving a systematic amount behind", width=WID)
def other_comprehensive_income_option() -> Fig:
    f = vcard()

    f.chip(BCX, 106, "IFIE for the period", colour=VIOLET, w=210, h=28)
    f.arrow(BCX - 40, 122, 106, 152, colour="var(--dim)", width=1.3)
    f.arrow(BCX + 40, 122, 254, 152, colour="var(--dim)", width=1.3)
    f.box(38, 164, 132, 74, label="profit or loss", colour=BLUE,
          sub="systematic, at the")
    f.text(104, 226, "locked-in rate", cls="sm dim")
    f.box(190, 164, 132, 74, label="OCI", colour=TEAL,
          sub="the effect of the")
    f.text(256, 226, "rate change", cls="sm dim")
    f.line(30, 256, 330, 256, cls="rule")
    f.text(BCX, 278, "comprehensive income is identical either way",
           cls="sm bold")
    f.text(BCX, 306, "elected by portfolio, applied to every group in it",
           cls="sm dim")
    f.text(BCX, 332, "the point is the mismatch: bonds at FVOCI move",
           cls="sm dim")
    f.text(BCX, 348, "through OCI, so the liability should too", cls="sm dim")
    f.text(BCX, 376, "and what is left in OCI is the duration mismatch",
           cls="sm dim")
    return f


@figure("Transition to IFRS 17", "The transition hierarchy — full retrospective "
        "first, and the two fallbacks only where it is impracticable",
        width=WID)
def transition_to_ifrs_17() -> Fig:
    f = vcard()

    f.box(38, 100, 284, 62, label="Full retrospective", colour=GREEN,
          sub="as if IFRS 17 had always applied")
    f.text(BCX, 178, "only if that is impracticable", cls="sm dim", )
    f.arrow(BCX, 186, 108, 208, colour="var(--dim)", width=1.2)
    f.arrow(BCX, 186, 252, 208, colour="var(--dim)", width=1.2)
    f.box(38, 220, 132, 74, label="Modified", colour=AMBER,
          sub="specified reliefs,")
    f.text(104, 282, "where data exist", cls="sm dim")
    f.box(190, 220, 132, 74, label="Fair value", colour=TEAL,
          sub="CSM = fair value")
    f.text(256, 282, "− fulfilment CF", cls="sm dim")
    f.line(30, 312, 330, 312, cls="rule")
    f.text(BCX, 334, "a higher CSM at transition defers more profit into",
           cls="sm dim")
    f.text(BCX, 350, "later years and opens equity lower", cls="sm dim")
    f.text(BCX, 376, "little of it bites in P&C — the PAA has no CSM",
           cls="sm dim")
    return f


@figure("Reinsurance Contract Liabilities", "Reinsurance assumed measured exactly "
        "as insurance issued — and the reporting lag that makes it harder",
        width=WID)
def reinsurance_contract_liabilities() -> Fig:
    f = vcard()

    _columns(f, 100, ["Held", "Issued"],
             [["reinsurance bought", "an asset", "recoveries in"],
              ["reinsurance", "assumed", "a liability", "claims out"]],
             x0=30, x1=330, row_h=22, head_h=26, colours=(GREEN, ROSE))
    f.text(BCX, 234, "confusing the direction is the first error",
           cls="sm dim")
    f.line(30, 254, 330, 254, cls="rule")
    f.text(BCX, 276, "and the assuming reinsurer's own problem", cls="sm bold")
    y = 316
    f.arrow(48, y, 322, y, colour="var(--axis)", width=1.2)
    for x, lab in ((70, "loss"), (150, "cedant"), (250, "report")):
        f.line(x, y - 5, x, y + 5, cls="tick")
        f.text(x, y + 19, lab, cls="sm dim")
    f.rect(70, y - 22, 180, 16, rx=3, fill=AMBER, fill_opacity="0.45")
    f.text(160, y - 10, "not yet reported to the reinsurer", cls="sm")
    f.text(BCX, 362, "so a reinsurer's disclosed confidence level sits",
           cls="sm dim")
    f.text(BCX, 378, "above a primary insurer's — the data are later",
           cls="sm dim")
    return f


@figure("Margin for Adverse Deviations", "The three MfADs of the old Canadian "
        "regime, and where each of them went under IFRS 17", width=WID)
def margin_for_adverse_deviations() -> Fig:
    f = vcard()

    rows = [("claims development", "→ the risk adjustment", VIOLET),
            ("reinsurance recovery", "→ non-performance risk", AMBER),
            ("interest rate", "→ nothing; the rate is market", TEAL)]
    for i, (name, went, colour) in enumerate(rows):
        y = 106 + i * 54
        f.rect(34, y, 292, 44, rx=6, fill=colour, fill_opacity="0.16",
               stroke=colour, stroke_width="1.2")
        f.text(46, y + 19, name, cls="sm bold", anchor="start")
        f.text(46, y + 34, went, cls="sm dim", anchor="start")
    f.line(30, 284, 330, 284, cls="rule")
    f.text(BCX, 306, "prescribed ranges were comparable but arbitrary;",
           cls="sm dim")
    f.text(BCX, 322, "an entity-specific RA is neither", cls="sm dim")
    f.text(BCX, 350, "note the interest MfAD: prudence used to sit inside",
           cls="sm dim")
    f.text(BCX, 366, "the discount rate, which confused financial risk",
           cls="sm dim")
    f.text(BCX, 382, "with insurance risk — IFRS 17 separates them",
           cls="sm dim")
    return f


@figure("Reinsurance Accounting", "Whether a contract transfers significant "
        "insurance risk, and the two accountings that follow", width=WID)
def reinsurance_accounting() -> Fig:
    f = vcard()

    f.chip(BCX, 104, "does it transfer significant risk?", colour=VIOLET,
           w=270, h=28)
    f.arrow(BCX, 120, 106, 152, colour="var(--dim)", width=1.3)
    f.arrow(BCX, 120, 254, 152, colour="var(--dim)", width=1.3)
    f.text(120, 146, "yes", cls="sm bold", fill=GREEN)
    f.text(240, 146, "no", cls="sm bold", fill=ROSE)
    f.box(36, 164, 132, 92, label="reinsurance", colour=GREEN,
          sub="a separate asset,")
    f.text(102, 244, "never netted", cls="sm dim")
    f.box(192, 164, 132, 92, label="deposit", colour=ROSE,
          sub="an asset accruing")
    f.text(258, 244, "interest — no relief", cls="sm dim")
    f.line(30, 274, 330, 274, cls="rule")
    _bullets(f, 296, ["non-performance risk reduces the asset",
                      "the income statement shows one net line",
                      "and the MCT credit still needs registration"],
             x=38, gap=26, colour=AMBER)
    return f


@figure("Reinsurance Contracts Held", "The reinsurance asset's components, and the "
        "CSM that is normally a net cost rather than a profit", width=WID)
def reinsurance_contracts_held() -> Fig:
    f = vcard()

    _columns(f, 100, ["Issued", "Held"],
             [["a liability", "the RA raises it", "the CSM is", "unearned profit",
               "no credit item"],
              ["an asset", "the RA is risk", "sent away", "the CSM is a",
               "net cost"]],
             x0=30, x1=330, row_h=21, head_h=26, colours=(AMBER, GREEN))
    f.text(BCX, 258, "several rules are deliberate mirror images",
           cls="sm dim")
    f.line(30, 278, 330, 278, cls="rule")
    _bullets(f, 300, ["reinsurance costs more than it recovers, so",
                      "the CSM is a cost — and that is not a loss",
                      "non-performance risk reduces the asset, explicitly",
                      "and an onerous group gets a loss-recovery component"],
             x=36, gap=24, colour=ROSE)
    return f


@figure("Registered Reinsurance", "Full MCT credit for a cession OSFI can reach, "
        "and none for one it cannot", width=WID)
def registered_reinsurance() -> Fig:
    f = vcard()

    _columns(f, 100, ["Registered", "Unregistered"],
             [["OSFI licensed", "examined and", "supervised",
               "full MCT credit"],
              ["offshore or", "a foreign parent", "no reach",
               "credit only up to", "collateral"]],
             x0=30, x1=330, row_h=21, head_h=26, colours=(GREEN, AMBER))
    f.line(30, 256, 330, 256, cls="rule")
    f.rect(40, 272, 280, 46, rx=7, fill=ROSE, fill_opacity="0.12", stroke=ROSE,
           stroke_width="1.2")
    f.text(BCX, 292, "registration is supervision, not strength —", cls="sm")
    f.text(BCX, 309, "counterparty analysis is still the cedant's job",
           cls="sm")
    f.text(BCX, 342, "OSFI's B-3 expectations: a documented reinsurance",
           cls="sm dim")
    f.text(BCX, 358, "risk policy, due diligence, and concentration limits",
           cls="sm dim")
    f.text(BCX, 384, "and the cedant is never released to its policyholders",
           cls="sm dim")
    return f


@figure("Unregistered Reinsurance", "Capital credit for an unregistered cession "
        "capped at the collateral posted behind it", width=WID)
def unregistered_reinsurance() -> Fig:
    f = vcard()

    f.text(BCX, 102, "$100M ceded, $70M collateralised", cls="sm dim")
    f.text(40, 132, "ceded liabilities", cls="sm", anchor="start")
    f.rect(40, 140, 260, 24, rx=3, fill=BLUE, fill_opacity="0.35")
    f.text(40, 190, "acceptable collateral", cls="sm", anchor="start")
    f.rect(40, 198, 182, 24, rx=3, fill=GREEN, fill_opacity="0.55")
    f.text(40, 248, "capital credit", cls="sm", anchor="start")
    f.rect(40, 256, 182, 24, rx=3, fill=GREEN, fill_opacity="0.75")
    f.rect(222, 256, 78, 24, rx=3, fill=ROSE, fill_opacity="0.30")
    f.text(261, 272, "none", cls="sm", fill=ROSE)
    f.line(30, 300, 330, 300, cls="rule")
    _bullets(f, 322, ["assets in a Canadian trust, or a letter of credit",
                      "used anyway for capacity and intra-group cessions",
                      "and the cost is real: LOC fees, trapped assets,",
                      "and enforcement across a border"],
             x=36, gap=24, colour=AMBER)
    return f


@figure("Finite Reinsurance", "A finite contract's outcome band, narrow enough "
        "that the reinsurer's result barely moves", width=WID)
def finite_reinsurance() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, -20, 40, left=52, right=16, top=28, bottom=152)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.area(lambda x: 4.0, 0, 10, colour=TEAL, opacity="0.25", base=1.0)
    ax.polyline([(0, 2.5), (10, 2.5)], colour=TEAL, width=2.4)
    ax.polyline([(0, 34), (10, -16)], colour=ROSE, width=2.2, dash=True)
    ax.label(6.6, 12, "a real treaty", cls="sm bold", fill=ROSE)
    ax.label(3.2, 9, "finite", cls="sm bold", fill=TEAL)
    f.text(BCX, ax.y1 + 22, "how bad the cedant's losses turn out",
           cls="sm dim")
    f.text(52, ax.y0 - 14, "reinsurer's result", cls="sm dim", anchor="start")
    f.line(30, 266, 330, 266, cls="rule")
    _bullets(f, 288, ["a low aggregate limit relative to premium",
                      "an experience account crediting the cedant",
                      "retrospective premium, profit commission",
                      "and — the classic vice — a side letter"],
             x=36, gap=25, colour=AMBER)
    return f


@figure("Commutations", "A commutation replacing a stream of future recoveries "
        "with cash today, and handing the tail back", width=WID)
def commutations() -> Fig:
    f = vcard()

    y = 150
    f.arrow(48, y, 322, y, colour="var(--axis)", width=1.2)
    for k in range(6):
        x = 74 + k * 44
        f.arrow(x, y, x, y - 14 - k * 4, colour=TEAL, width=1.6)
    f.text(BCX, 104, "recoveries the reinsurer would have paid", cls="sm dim")
    f.text(BCX, y + 20, "spread over decades", cls="sm dim")
    f.arrow(BCX, 186, BCX, 210, colour="var(--dim)", width=1.4)
    f.chip(BCX, 228, "one lump sum today", colour=GREEN, w=200, h=28)
    f.line(30, 256, 330, 256, cls="rule")
    _columns(f, 270, ["Cedant wants", "Reinsurer wants"],
             [["credit risk gone", "cash now", "a closed file"],
              ["capital released", "the tail capped", "out of the line"]],
             x0=30, x1=330, row_h=20, head_h=24, colours=(BLUE, AMBER))
    f.text(BCX, 380, "afterwards the cedant carries the whole tail again",
           cls="sm dim")
    return f


@figure("MCT", "The running insurer's MCT ratio against the minimum, supervisory "
        "and internal thresholds", width=WID)
def mct() -> Fig:
    f = vcard()

    py = _ladder(f, 96, 340, 122, 0.80, 2.00,
                 [(MIN_RATIO, "100% minimum", ROSE),
                  (SUP_TARGET, "150% supervisory", AMBER),
                  (INT_TARGET, "185% internal", VIOLET)],
                 at=MCT_RATIO, width=44, label_x=136, fill=BLUE)
    f.text(96, py(MCT_RATIO) - 12, "104.6%", cls="sm bold", fill=BLUE)
    f.line(30, 352, 330, 352, cls="rule")
    f.text(BCX, 374, "$248M ÷ (1.5 × $158M) — above the minimum,",
           cls="sm dim")
    f.text(BCX, 390, "and in serious difficulty", cls="sm dim")
    return f


@figure("Capital Available", "Accounting equity reduced to capital available by "
        "the deductions for things that would not absorb a loss", width=WID)
def capital_available() -> Fig:
    f = vcard()

    _waterfall(f, 244,
               [("equity", 260.0, GREEN), ("goodwill", -8.0, ROSE),
                ("intangibles", -4.0, ROSE), ("available", None, BLUE)],
               x0=44, x1=316, top=120, bar_frac=0.56,
               fmt=lambda v: f"{abs(v):,.0f}")
    f.text(BCX, 282, "$M, the running insurer", cls="sm dim")
    f.line(30, 300, 330, 300, cls="rule")
    f.text(BCX, 322, "category A is common shares, retained earnings",
           cls="sm dim")
    f.text(BCX, 338, "and accumulated OCI; category B is lower quality",
           cls="sm dim")
    f.text(BCX, 364, "the test behind every deduction is the same:",
           cls="sm dim")
    f.text(BCX, 380, "would this absorb a loss when things go wrong?",
           cls="sm dim")
    return f


@figure("Capital Required", "The four risk margins summed and then reduced by the "
        "diversification credit", width=WID)
def capital_required() -> Fig:
    f = vcard()

    _waterfall(f, 250,
               [("ins.", M_INS, BLUE), ("mkt", M_MKT, TEAL),
                ("cr.", M_CRD, AMBER), ("ops", M_OPS, VIOLET),
                ("div.", -DIVERS, GREEN), ("CR", None, ROSE)],
               x0=34, x1=326, top=120, bar_frac=0.62,
               fmt=lambda v: f"{abs(v):,.0f}")
    f.text(BCX, 288, "$M, the running insurer", cls="sm dim")
    f.line(30, 306, 330, 306, cls="rule")
    f.text(BCX, 328, "insurance risk is normally the largest, and it",
           cls="sm dim")
    f.text(BCX, 344, "grows with volume even at unchanged quality",
           cls="sm dim")
    f.text(BCX, 372, "then × 1.5 for the base solvency buffer — $237M",
           cls="sm bold")
    return f


@figure("Base Solvency Buffer", "The 1.5 multiplier, and how the supervisory "
        "target compounds it into 2.25 times capital required", width=WID)
def base_solvency_buffer() -> Fig:
    f = vcard()

    f.text(BCX, 102, "capital required, and what it becomes", cls="sm dim")
    for i, (label, mult, colour) in enumerate(
            [("capital required", 1.0, BLUE),
             ("base solvency buffer  ×1.5", 1.5, TEAL),
             ("at the 150% target  ×2.25", 2.25, AMBER),
             ("at a 185% internal target  ×2.8", 2.78, VIOLET)]):
        y = 126 + i * 52
        f.text(40, y, label, cls="sm", anchor="start")
        f.rect(40, y + 8, mult * 100, 24, rx=3, fill=colour, fill_opacity="0.55")
        f.text(40 + mult * 100 + 8, y + 25, f"{mult * 158:,.0f}", cls="sm",
               anchor="start")
    f.line(30, 336, 330, 336, cls="rule")
    f.text(BCX, 358, "$M — so a ratio can fall because capital fell,",
           cls="sm dim")
    f.text(BCX, 374, "or because the buffer rose. Decompose before", cls="sm dim")
    f.text(BCX, 390, "concluding anything about it", cls="sm dim")
    return f


@figure("Insurance Risk Margin", "The three parts of the insurance risk margin, "
        "and why growth alone raises it", width=WID)
def insurance_risk_margin() -> Fig:
    f = vcard()

    _vbars(f, [58.0, 22.0, 12.0],
           ["claim", "premium", "catastrophe"], 240, x0=54, x1=310, top=64,
           height=112, fmt=lambda v: f"{v:,.0f}",
           colours=[BLUE, TEAL, ROSE])
    f.text(BCX, 278, "$M — the running insurer's $92M margin", cls="sm dim")
    f.line(30, 298, 330, 298, cls="rule")
    _bullets(f, 320, ["factors by line — long-tail lines carry more",
                      "reinsurance reduces it, but only if registered",
                      "— which swaps insurance risk for credit risk"],
             x=36, gap=24, colour=AMBER)
    return f


@figure("Market Risk Margin", "Interest rate risk measured on the duration "
        "mismatch, not on the assets alone", width=WID)
def market_risk_margin() -> Fig:
    f = vcard()

    for i, (label, a, l, colour) in enumerate(
            [("matched", 3.4, 3.4, GREEN), ("mismatched", 6.2, 3.4, ROSE)]):
        y = 108 + i * 88
        f.text(40, y, label, cls="sm bold", anchor="start", fill=colour)
        f.rect(40, y + 10, a * 34, 20, rx=3, fill=BLUE, fill_opacity="0.45")
        f.text(40 + a * 34 + 8, y + 25, "assets", cls="sm dim", anchor="start")
        f.rect(40, y + 38, l * 34, 20, rx=3, fill=AMBER, fill_opacity="0.45")
        f.text(40 + l * 34 + 8, y + 53, "liabilities", cls="sm dim",
               anchor="start")
    f.text(BCX, 282, "duration, in years — only the second attracts",
           cls="sm dim")
    f.text(BCX, 298, "an interest rate charge", cls="sm dim")
    f.line(30, 318, 330, 318, cls="rule")
    f.text(BCX, 340, "equity carries a high factor, and it falls when",
           cls="sm dim")
    f.text(BCX, 356, "the insurer most needs the capital", cls="sm dim")
    f.text(BCX, 382, "so the extra yield has to pay for the extra capital",
           cls="sm dim")
    return f


@figure("Credit Risk Margin", "The credit exposures behind the margin, with "
        "reinsurance recoverables usually the largest", width=WID)
def credit_risk_margin() -> Fig:
    f = vcard()

    for i, (name, w, colour) in enumerate(
            [("reinsurance recoverables", 148, ROSE),
             ("corporate bonds", 96, AMBER),
             ("premiums receivable", 52, TEAL),
             ("Government of Canada", 6, GREEN)]):
        y = 112 + i * 40
        f.text(40, y, name, cls="sm", anchor="start")
        f.rect(170, y + 2, w, 18, rx=3, fill=colour, fill_opacity="0.60")
    f.text(BCX, 288, "and the formula cannot see concentration:",
           cls="sm dim")
    f.text(BCX, 304, "80% of recoverables from one reinsurer attracts",
           cls="sm dim")
    f.text(BCX, 320, "the same charge as a spread programme", cls="sm dim")
    f.line(30, 340, 330, 340, cls="rule")
    f.text(BCX, 362, "unregistered cessions get no credit at all unless",
           cls="sm dim")
    f.text(BCX, 378, "collateralised — the IFRS 17 parallel is",
           cls="sm dim")
    f.text(BCX, 392, "non-performance risk on the reinsurance asset",
           cls="sm dim")
    return f


@figure("Operational Risk Margin", "A formula on volume and growth, blind to how "
        "well the insurer is actually run", width=WID)
def operational_risk_margin() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 40, 0, 30, left=48, right=18, top=28, bottom=160)
    ax.frame(xticks=[0, 20, 40], xfmt=lambda v: f"{v:.0f}%", yticks=[],
             arrows=True)
    ax.polyline([(0, 9), (20, 9), (40, 9)], colour=BLUE, width=2.2, dash=True)
    ax.polyline([(0, 9), (20, 9), (28, 16), (40, 27)], colour=ROSE, width=2.4)
    ax.label(9, 12, "base charge", cls="sm dim")
    ax.label(33, 22, "growth", cls="sm bold", fill=ROSE, anchor="end")
    f.text(BCX, ax.y1 + 34, "premium growth in the year", cls="sm dim")
    f.line(30, 274, 330, 274, cls="rule")
    _bullets(f, 296, ["not built from the insurer's own loss history —",
                      "operational losses are too rare to fit",
                      "added after the diversification credit, not into it",
                      "and it cannot see the quality of the controls"],
             x=36, gap=24, colour=AMBER)
    return f


@figure("Diversification Credit", "The credit removing the over-statement in "
        "adding insurance and market risk together", width=WID)
def diversification_credit() -> Fig:
    f = vcard()

    _vbars(f, [92.0, 54.0, 146.0, 120.0],
           ["insurance", "market", "added", "combined"], 242,
           x0=44, x1=316, top=150, height=118, fmt=lambda v: f"{v:,.0f}",
           colours=[BLUE, TEAL, "var(--dim)", GREEN])
    f.text(BCX, 280, "$M — the $26M credit is the difference", cls="sm dim")
    f.line(30, 300, 330, 300, cls="rule")
    f.text(BCX, 322, "credit and operational risk get no credit at all",
           cls="sm dim")
    f.text(BCX, 346, "and the credit is largest when the two risks are",
           cls="sm dim")
    f.text(BCX, 362, "of similar size — an insurer that is almost all",
           cls="sm dim")
    f.text(BCX, 378, "insurance risk has little to diversify against",
           cls="sm dim")
    return f


@figure("Earthquake Exposure Risk Margin", "The 1-in-500 PML met by reinsurance, "
        "reserves and capital — with the shortfall the requirement", width=WID)
def earthquake_exposure_risk_margin() -> Fig:
    f = vcard()

    f.text(BCX, 104, "$600M gross PML, and what meets it ($M)", cls="sm dim")
    f.rect(40, 124, 268, 26, rx=4, fill=ROSE, fill_opacity="0.45")
    f.text(174, 142, "PML 600", cls="sm")
    y = 172
    x = 40
    for share, label, colour in ((0.62, "reinsurance", TEAL),
                                 (0.10, "reserve", AMBER),
                                 (0.28, "capital", BLUE)):
        w = 268 * share
        f.rect(x, y, w, 26, rx=4, fill=colour, fill_opacity="0.50")
        if share > 0.15:
            f.text(x + w / 2, y + 18, label, cls="sm")
        x += w
    f.text(BCX, 218, "reinsurance and the reserve go first — the capital",
           cls="sm dim")
    f.text(BCX, 233, "band is what OSFI requires you to hold behind them",
           cls="sm dim")
    f.line(30, 250, 330, 250, cls="rule")
    _bullets(f, 272, ["two zones carry it — coastal BC, and the",
                      "Quebec City–Montreal corridor",
                      "exposure data quality is a supervisory matter",
                      "and a programme sized for one event may be",
                      "exhausted before the aftershock"],
             x=36, gap=24, colour=VIOLET)
    return f


@figure("Probable Maximum Loss", "The catastrophe loss distribution with the "
        "1-in-500 tail read off it, gross and net of reinsurance", width=WID)
def probable_maximum_loss() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 1.0, left=44, right=16, top=30, bottom=160)
    ax.area(lambda x: 0.95 * 2.718 ** (-0.62 * x), 0, 10, colour=BLUE,
            opacity="0.14")
    ax.area(lambda x: 0.95 * 2.718 ** (-0.62 * x), 7.4, 10, colour=ROSE,
            opacity="0.34")
    ax.curve(lambda x: 0.95 * 2.718 ** (-0.62 * x), colour=BLUE, width=2.2)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.vline(7.4, colour=ROSE, y_top=0.42)
    ax.label(7.4, 0.46, "1-in-500", cls="sm bold", fill=ROSE, dy=-4)
    ax.vline(4.6, colour=TEAL, y_top=0.42)
    ax.label(4.6, 0.46, "net", cls="sm bold", fill=TEAL, dy=-4)
    f.text(BCX, ax.y1 + 22, "portfolio catastrophe loss", cls="sm dim")
    f.line(30, 272, 330, 272, cls="rule")
    _bullets(f, 294, ["gross PML sizes the reinsurance programme;",
                      "net PML is what the capital has to carry",
                      "over 30 years, the chance of one such year is 6%",
                      "and exposure data beats model sophistication"],
             x=36, gap=24, colour=AMBER)
    return f


@figure("Supervisory Target Capital Ratio", "The 150% supervisory target and the "
        "100% minimum, and the space between them", width=WID)
def supervisory_target_capital_ratio() -> Fig:
    f = vcard()

    _ladder(f, 108, 322, 122, 0.80, 2.10,
            [(MIN_RATIO, "100% minimum", ROSE),
             (SUP_TARGET, "150% supervisory", AMBER),
             (INT_TARGET, "185% internal", VIOLET)],
            at=None, width=52, label_x=150)
    f.rect(82, 322 - (SUP_TARGET - 0.80) / 1.30 * 200,
           52, (SUP_TARGET - MIN_RATIO) / 1.30 * 200, rx=4, fill=AMBER,
           fill_opacity="0.18")
    f.text(150, 268, "room to act", cls="sm dim", anchor="start")
    f.line(30, 340, 330, 340, cls="rule")
    f.text(BCX, 360, "below 150% is not a breach of law — it is a",
           cls="sm dim")
    f.text(BCX, 376, "capital restoration plan, a dividend stop and",
           cls="sm dim")
    f.text(BCX, 392, "closer reporting", cls="sm dim")
    return f


@figure("Internal Target Capital Ratio", "The insurer's own target set above the "
        "supervisory one, derived from its own adverse scenarios", width=WID)
def internal_target_capital_ratio() -> Fig:
    f = vcard()

    _flow(f, 110, ["scenarios", "capital need", "target"],
          colours=[BLUE, TEAL, VIOLET], h=28)
    f.text(BCX, 148, "ORSA works backwards from what could go wrong",
           cls="sm dim")
    f.line(30, 170, 330, 170, cls="rule")
    _bullets(f, 194, ["a catastrophe at the PML",
                      "a reserve strengthening on a long-tail line",
                      "a reinsurer failing on its recoverables",
                      "a market fall against an equity holding"],
             x=38, gap=26, colour=AMBER)
    f.rect(40, 300, 280, 46, rx=7, fill=ROSE, fill_opacity="0.12",
           stroke=ROSE, stroke_width="1.2")
    f.text(BCX, 320, "breaching the internal target is the first", cls="sm")
    f.text(BCX, 337, "tripwire — and it is management's, not OSFI's",
           cls="sm")
    f.text(BCX, 372, "a target that does not follow from the scenarios",
           cls="sm dim")
    f.text(BCX, 388, "is a governance finding, and OSFI challenges it",
           cls="sm dim")
    return f


@figure("Stress Testing", "The three kinds of test, from moving one variable to "
        "starting at failure and working back", width=WID)
def stress_testing() -> Fig:
    f = vcard()

    rows = [("Sensitivity", "move one variable — +100 bp, +10% reserves", BLUE),
            ("Scenario", "move a coherent set that could happen together",
             TEAL),
            ("Reverse", "start at non-viability and work backwards", ROSE)]
    _stack(f, 100, rows, x0=30, x1=330, h=48, gap=14)
    f.line(30, 292, 330, 292, cls="rule")
    f.text(BCX, 314, "too mild reveals nothing; too extreme is dismissed",
           cls="sm dim")
    f.text(BCX, 340, "model the ripples and the realistic management",
           cls="sm dim")
    f.text(BCX, 356, "actions — assuming neither gives the wrong answer",
           cls="sm dim")
    f.text(BCX, 382, "a test that changes no limit was not worth running",
           cls="sm dim")
    return f


@figure("Reverse Stress Testing", "A forward test searching outward from known "
        "risks, against a reverse test searching inward from failure", width=WID)
def reverse_stress_testing() -> Fig:
    f = vcard()

    f.chip(96, 116, "known risks", colour=BLUE, w=118, h=28)
    f.arrow(158, 116, 214, 116, colour=BLUE, width=1.5)
    f.chip(268, 116, "outcomes", colour=BLUE, w=104, h=28)
    f.text(BCX, 150, "forward — and it only ever tests what", cls="sm dim")
    f.text(BCX, 166, "management already had in mind", cls="sm dim")
    f.line(30, 188, 330, 188, cls="rule")
    f.chip(96, 220, "failure modes", colour=ROSE, w=124, h=28)
    f.arrow(214, 220, 158, 220, colour=ROSE, width=1.5)
    f.chip(268, 220, "non-viable", colour=ROSE, w=110, h=28)
    f.text(BCX, 254, "reverse — and it finds the combinations", cls="sm dim")
    f.text(BCX, 270, "nobody thought to put together", cls="sm dim")
    f.line(30, 292, 330, 292, cls="rule")
    _bullets(f, 314, ["the endpoint is non-viability, not a bad year",
                      "plausibility is judged afterwards, not first",
                      "and a credible failure mode has to be answered —",
                      "with capital, less exposure, or a recovery plan"],
             x=36, gap=23, colour=AMBER)
    return f


@figure("Ripple Effect", "A catastrophe's direct cost compounded by the second-"
        "order effects FCT requires to be modelled", width=WID)
def ripple_effect() -> Fig:
    f = vcard()

    _waterfall(f, 248,
               [("cat", 50.0, ROSE), ("reinst.", 8.0, AMBER),
                ("renewal", 15.0, AMBER), ("lost", 12.0, VIOLET),
                ("total", None, BLUE)],
               x0=34, x1=326, top=118, bar_frac=0.60,
               fmt=lambda v: f"{abs(v):,.0f}")
    f.text(BCX, 286, "$M — reinstatement premium, a dearer renewal and",
           cls="sm dim")
    f.text(BCX, 302, "the business lost turn $50M into $85M", cls="sm dim")
    f.line(30, 318, 330, 318, cls="rule")
    _bullets(f, 340, ["a downgrade, then dearer reinsurance and funding",
                      "and the ripple most often left out: the events",
                      "that damage capital also mean more is needed"],
             x=36, gap=22, colour=AMBER)
    return f


@figure("Risk Appetite", "The four layers of a risk appetite framework, from the "
        "board's statement down to the breach that escalates", width=WID)
def risk_appetite() -> Fig:
    f = vcard()

    rows = [("Appetite statement", "the board says what risk, and why", VIOLET),
            ("Limits", "PML as % of capital, single risk, targets", BLUE),
            ("Tolerances", "the breach point, and who is told", AMBER),
            ("Monitoring", "measured, reported, and acted on", GREEN)]
    _stack(f, 96, rows, x0=30, x1=330, h=46, gap=10)
    f.line(30, 326, 330, 326, cls="rule")
    f.text(BCX, 348, "capacity is what you could bear before failing;",
           cls="sm dim")
    f.text(BCX, 364, "appetite is how much of it you choose to use",
           cls="sm dim")
    f.text(BCX, 388, "a framework that stops no transaction is decorative",
           cls="sm dim")
    return f


@figure("Concentration Risk", "The five concentrations that turn separate "
        "exposures into one, and the formula that cannot see them", width=WID)
def concentration_risk() -> Fig:
    f = vcard()

    for i, (name, note, colour) in enumerate(
            [("Geographic", "one earthquake, one wildfire", ROSE),
             ("Counterparty", "one reinsurer, one issuer", AMBER),
             ("Line or product", "one reserving error", TEAL),
             ("Jurisdictional", "one province's rate regime", VIOLET),
             ("Distribution", "one broker, one channel", BLUE)]):
        y = 98 + i * 46
        f.rect(30, y, 300, 38, rx=6, fill=colour, fill_opacity="0.14",
               stroke=colour, stroke_width="1.2")
        f.text(42, y + 24, name, cls="sm bold", anchor="start")
        f.text(318, y + 24, note, cls="sm dim", anchor="end")
    f.line(30, 340, 330, 340, cls="rule")
    f.text(BCX, 362, "the MCT charges the same whether recoverables",
           cls="sm dim")
    f.text(BCX, 378, "sit with eight reinsurers or with one", cls="sm dim")
    return f


@figure("Climate Risk", "Physical and transition risk reaching the insurer by "
        "different routes, and the non-stationarity behind both", width=WID)
def climate_risk() -> Fig:
    f = vcard()

    _columns(f, 100, ["Physical", "Transition"],
             [["acute — flood,", "wildfire, hail", "chronic — sea level,",
               "shifting hazard"],
              ["investments", "repricing", "liability", "underwriting",
               "reputation"]],
             x0=30, x1=330, row_h=21, head_h=26, colours=(ROSE, TEAL))
    f.line(30, 254, 330, 254, cls="rule")
    ax = vaxes(f, 0, 10, 0, 10, left=48, right=18, top=210, bottom=52)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.polyline([(0, 3.0), (10, 3.0)], colour="var(--dim)", width=1.8,
                dash=True)
    ax.polyline([(0, 2.6), (4, 3.6), (7, 5.4), (10, 8.4)], colour=ROSE,
                width=2.4)
    ax.label(2.2, 1.4, "assumed", cls="sm dim")
    ax.label(7.4, 7.2, "actual", cls="sm bold", fill=ROSE, anchor="end")
    f.text(BCX, ax.y1 + 22, "hazard, over time — the ratemaking problem",
           cls="sm dim")
    f.text(BCX, 386, "OSFI B-15 makes it prudential, not reputational",
           cls="sm dim")
    return f


@figure("Rating Agency", "The downgrade spiral — a rating cut feeding the metrics "
        "that produced it", width=WID)
def rating_agency() -> Fig:
    f = vcard()

    cx, cy, r = BCX, 178, 58
    steps = [("downgrade", -90, ROSE), ("business lost", 0, AMBER),
             ("costs rise", 90, VIOLET), ("metrics fall", 180, TEAL)]
    for label, deg, colour in steps:
        a = math.radians(deg)
        f.chip(cx + r * math.cos(a) * 1.62, cy + r * math.sin(a) * 0.98, label,
               colour=colour, w=104, h=24)
    for deg in (-45, 45, 135, 225):
        a0, a1 = math.radians(deg - 26), math.radians(deg + 26)
        f.arrow(cx + r * 0.95 * math.cos(a0), cy + r * 0.62 * math.sin(a0),
                cx + r * 0.95 * math.cos(a1), cy + r * 0.62 * math.sin(a1),
                colour="var(--dim)", width=1.3)
    f.line(30, 254, 330, 254, cls="rule")
    _columns(f, 268, ["Rating", "Supervision"],
             [["published", "an opinion", "voluntary"],
              ["confidential", "legal powers", "compulsory"]],
             x0=30, x1=330, row_h=20, head_h=24, colours=(AMBER, BLUE))
    return f


@figure("Principles-Based Regulation", "The Canadian framework using both — a "
        "rules-based MCT with principles-based expectations on top", width=WID)
def principles_based_regulation() -> Fig:
    f = vcard()

    f.box(38, 100, 284, 54, label="ORSA · FCT · governance · B-15",
          colour=TEAL, sub="principles — the outcome is prescribed")
    f.arrow(BCX, 158, BCX, 176, colour="var(--dim)", width=1.3)
    f.box(38, 182, 284, 54, label="the MCT",
          colour=BLUE, sub="rules — the formula is prescribed")
    f.line(30, 254, 330, 254, cls="rule")
    _columns(f, 268, ["Rules", "Principles"],
             [["predictable", "comparable", "gameable"],
              ["proportionate", "innovation-proof", "unpredictable"]],
             x0=30, x1=330, row_h=20, head_h=24, colours=(BLUE, TEAL))
    f.text(BCX, 380, "and principles move the work onto the actuary",
           cls="sm dim")
    return f


@figure("ORSA", "ORSA asking whether the standard formula fits this insurer, and "
        "setting the internal target that follows", width=WID)
def orsa() -> Fig:
    f = vcard()

    f.chip(BCX, 106, "the MCT's standardised requirement", colour=BLUE,
           w=276, h=28)
    f.arrow(BCX, 122, BCX, 146, colour="var(--dim)", width=1.3)
    f.chip(BCX, 162, "risks it does not capture for us", colour=AMBER,
           w=250, h=28)
    f.arrow(BCX, 178, BCX, 202, colour="var(--dim)", width=1.3)
    f.chip(BCX, 218, "the internal target", colour=VIOLET, w=180, h=28)
    f.line(30, 246, 330, 246, cls="rule")
    _bullets(f, 268, ["all material risks identified and assessed",
                      "risk linked to capital",
                      "forward over the business plan, not the",
                      "balance sheet as it stands today",
                      "board-owned, at least annually"],
             x=36, gap=24, colour=TEAL)
    f.text(BCX, 388, "ORSA sets the target; FCT tests whether it holds",
           cls="sm dim")
    return f


@figure("FCT", "The FCT opinion — the base scenario above the supervisory target "
        "and every adverse scenario above the minimum", width=WID)
def fct() -> Fig:
    f = vcard()

    def py(v):
        return 300 - (v - 0.60) / 1.50 * (300 - 116)

    for level, label, colour in ((MIN_RATIO, "100%", ROSE),
                                 (SUP_TARGET, "150%", AMBER)):
        f.line(76, py(level), 322, py(level), cls="thin dash", stroke=colour,
               stroke_width="1.4")
        f.text(70, py(level) + 4, label, cls="sm", fill=colour, anchor="end")
    f.line(76, 300, 322, 300, cls="axis")
    for i, (label, base, adverse, colour) in enumerate(
            [("base", 1.68, None, GREEN), ("cat", None, 1.24, TEAL),
             ("reserves", None, 1.12, AMBER), ("solvency", None, 0.86, ROSE)]):
        x = 118 + i * 56
        v = base if base is not None else adverse
        f.rect(x - 18, py(v), 36, 300 - py(v), rx=3, fill=colour,
               fill_opacity="0.55")
        f.text(x, py(v) - 7, f"{v:.0%}", cls="sm")
        f.text(x, 318, label, cls="sm dim")
    f.text(BCX, 344, "the solvency scenario fails — the opinion cannot",
           cls="sm dim")
    f.text(BCX, 360, "be that the financial condition is satisfactory",
           cls="sm dim")
    f.text(BCX, 386, "it replaced DCAT in 2020, adding reverse stress testing",
           cls="sm dim")
    return f


@figure("Solvency II", "Solvency II's three pillars beside the Canadian pieces "
        "that answer to each", width=WID)
def solvency_ii() -> Fig:
    f = vcard()

    for i, (pillar, eu, ca, colour) in enumerate(
            [("Pillar 1", "SCR, MCR", "the MCT", BLUE),
             ("Pillar 2", "ORSA", "ORSA, FCT", TEAL),
             ("Pillar 3", "SFCR", "the annual return", AMBER)]):
        y = 104 + i * 58
        f.rect(30, y, 300, 46, rx=6, fill=colour, fill_opacity="0.14",
               stroke=colour, stroke_width="1.2")
        f.text(42, y + 20, pillar, cls="sm bold", anchor="start", fill=colour)
        f.text(42, y + 36, eu, cls="sm dim", anchor="start")
        f.text(318, y + 30, ca, cls="sm", anchor="end")
    f.line(30, 292, 330, 292, cls="rule")
    f.text(BCX, 314, "Solvency II states its calibration and is", cls="sm dim")
    f.text(BCX, 330, "market-consistent throughout; the MCT is", cls="sm dim")
    f.text(BCX, 346, "factor-based with a 1.5 multiplier on top", cls="sm dim")
    f.text(BCX, 374, "and it permits an approved internal model —", cls="sm dim")
    f.text(BCX, 390, "Canada does not", cls="sm dim")
    return f


@figure("Statement of Actuarial Opinion", "The four opinions available to the "
        "Appointed Actuary, and the one thing the opinion is about", width=WID)
def statement_of_actuarial_opinion() -> Fig:
    f = vcard()

    for i, (name, note, colour) in enumerate(
            [("Unqualified", "it does", GREEN),
             ("Qualified", "except for one component", AMBER),
             ("Adverse", "it does not", ROSE),
             ("Denial", "the data will not support an opinion", VIOLET)]):
        y = 104 + i * 50
        f.rect(30, y, 300, 40, rx=6, fill=colour, fill_opacity="0.16",
               stroke=colour, stroke_width="1.2")
        f.text(42, y + 25, name, cls="sm bold", anchor="start")
        f.text(318, y + 25, note, cls="sm dim", anchor="end")
    f.line(30, 314, 330, 314, cls="rule")
    f.text(BCX, 336, "data sufficiency is a gate, not a formality: a",
           cls="sm dim")
    f.text(BCX, 352, "margin cannot cure data that cannot be relied on",
           cls="sm dim")
    f.text(BCX, 378, "subsequent events count up to the signing date",
           cls="sm dim")
    return f


@figure("Appointed Actuary's Report", "What the report has to record, and the "
        "actual-versus-expected section that tests last year's estimate",
        width=WID)
def appointed_actuarys_report() -> Fig:
    f = vcard()

    _bullets(f, 106, ["data, reconciled — and its deficiencies",
                      "methods by line and by LIC / LRC component",
                      "assumptions, and why each was selected",
                      "results against the prior valuation",
                      "sensitivity, and the range of reasonable estimates",
                      "subsequent events, materiality, reliance"],
             x=36, gap=26, colour=BLUE)
    f.line(30, 274, 330, 274, cls="rule")
    f.text(BCX, 296, "and the section that earns its place", cls="sm bold")
    f.text(BCX, 312, "actual versus expected", cls="sm dim")
    _vbars(f, [2.0, 7.0, 9.0, 12.0], ["2022", "2023", "2024", "2025"], 364,
           x0=64, x1=296, top=14.0, height=48,
           fmt=lambda v: f"+{v:.0f}%", colours=[ROSE] * 4)
    f.text(BCX, 390, "four years of adverse development is a method problem",
           cls="sm dim")
    return f


@figure("Standards of Practice", "The obligations an actuary works under, from "
        "conduct down to the guidance that is not binding", width=WID)
def standards_of_practice() -> Fig:
    f = vcard()

    rows = [("Rules of Professional Conduct", "binding — how to behave",
             VIOLET),
            ("Standards of Practice", "binding — how the work is done", BLUE),
            ("Educational notes", "not binding — how it may be applied", TEAL),
            ("Research and practice", "context, and nothing more", GREEN)]
    _stack(f, 96, rows, x0=30, x1=330, h=46, gap=10, arrows=False)
    f.line(30, 326, 330, 326, cls="rule")
    f.text(BCX, 348, "they say what must be considered and disclosed,",
           cls="sm dim")
    f.text(BCX, 364, "never which development factor to pick", cls="sm dim")
    f.text(BCX, 388, "deviation is allowed — undisclosed deviation is not",
           cls="sm dim")
    return f


@figure("Materiality", "One materiality standard, chosen for the purpose and "
        "applied in both directions", width=WID)
def materiality() -> Fig:
    f = vcard()

    f.text(BCX, 104, "common reference points, none of them a rule",
           cls="sm dim")
    for i, (name, w, colour) in enumerate(
            [("% of insurance contract liabilities", 232, BLUE),
             ("% of capital available", 176, TEAL),
             ("% of pre-tax income", 132, AMBER)]):
        y = 124 + i * 38
        f.text(40, y, name, cls="sm", anchor="start")
        f.rect(40, y + 6, w, 14, rx=3, fill=colour, fill_opacity="0.55")
    f.line(30, 250, 330, 250, cls="rule")
    _bullets(f, 272, ["it permits approximation below the threshold —",
                      "which is what makes the work possible at all",
                      "a threshold that moves with the answer it gives",
                      "is not a materiality standard",
                      "and small one-way items add up to a material one"],
             x=36, gap=24, colour=ROSE)
    return f


@figure("Subsequent Events", "The one question that decides the treatment of an "
        "event between the valuation date and the report", width=WID)
def subsequent_events() -> Fig:
    f = vcard()

    y = 134
    f.arrow(40, y, 330, y, colour="var(--axis)", width=1.2)
    for x, lab in ((78, "valuation"), (268, "report")):
        f.line(x, y - 5, x, y + 5, cls="tick")
        f.text(x, y + 19, lab, cls="sm dim")
    f.rect(78, y - 20, 190, 14, rx=3, fill=VIOLET, fill_opacity="0.40")
    f.text(173, y - 9, "events to consider", cls="sm")
    f.text(BCX, 104, "the window runs to the report date", cls="sm dim")
    f.box(34, 176, 136, 88, label="Adjusting", colour=BLUE,
          sub="a court decision on")
    f.text(102, 252, "a claim already open", cls="sm dim")
    f.box(190, 176, 136, 88, label="Non-adjusting", colour=AMBER,
          sub="a January catastrophe")
    f.text(258, 252, "after a 31 Dec date", cls="sm dim")
    f.line(30, 282, 330, 282, cls="rule")
    f.text(BCX, 304, "and a third category: an event that ends the",
           cls="sm dim")
    f.text(BCX, 320, "going concern changes the whole basis", cls="sm dim")
    f.text(BCX, 348, "an adjusting event of any size moves the opinion",
           cls="sm dim")
    f.text(BCX, 364, "and the MCT ratio — which is why the boundary",
           cls="sm dim")
    f.text(BCX, 380, "is where the argument happens", cls="sm dim")
    return f


@figure("Model Risk", "The three places a model goes wrong, and the validation "
        "that has to be independent of whoever built it", width=WID)
def model_risk() -> Fig:
    f = vcard()

    rows = [("Model error", "development factors from another line", ROSE),
            ("Input error", "a PML on mis-coded locations", AMBER),
            ("Use error", "a range presented as a point estimate", VIOLET)]
    _stack(f, 100, rows, x0=30, x1=330, h=48, gap=12, arrows=False)
    f.line(30, 268, 330, 268, cls="rule")
    f.text(BCX, 290, "and the governance OSFI expects", cls="sm bold")
    _bullets(f, 312, ["an inventory, with an owner for each model",
                      "validation independent of development",
                      "documented limitations, and periodic re-validation"],
             x=36, gap=24, colour=TEAL)
    f.text(BCX, 388, "a model checked by its builder has not been validated",
           cls="sm dim")
    return f


@figure("Runoff", "What changes when an insurer stops writing — expenses first, "
        "and they are usually understated", width=WID)
def runoff() -> Fig:
    f = vcard()

    ax = vaxes(f, 0, 10, 0, 100, left=48, right=18, top=28, bottom=170)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.area(lambda x: 92 * 2.718 ** (-0.30 * x), 0, 10, colour=BLUE,
            opacity="0.18")
    ax.curve(lambda x: 92 * 2.718 ** (-0.30 * x), colour=BLUE, width=2.4)
    ax.polyline([(0, 22), (10, 16)], colour=ROSE, width=2.4)
    ax.label(3.4, 46, "claims", cls="sm bold", fill=BLUE)
    ax.label(6.6, 24, "expenses", cls="sm bold", fill=ROSE)
    f.text(BCX, ax.y1 + 22, "years into the run-off", cls="sm dim")
    f.text(BCX, 264, "the expense line barely falls — and that is the",
           cls="sm dim")
    f.text(BCX, 280, "adjustment most often understated", cls="sm dim")
    f.line(30, 300, 330, 300, cls="rule")
    _bullets(f, 322, ["claimants and counsel behave differently",
                      "recoveries stretch out, so commutations appeal",
                      "and the FCT solvency scenario asks this question"],
             x=36, gap=24, colour=AMBER)
    return f


@figure("Educational Note", "Where an educational note sits — expected in "
        "practice, and binding on nobody", width=WID)
def educational_note() -> Fig:
    f = vcard()

    for i, (name, weight, colour) in enumerate(
            [("Rules of Professional Conduct", 1.00, VIOLET),
             ("Standards of Practice", 0.86, BLUE),
             ("Educational notes", 0.54, TEAL),
             ("Draft notes", 0.34, GREEN)]):
        y = 106 + i * 48
        f.text(40, y, name, cls="sm", anchor="start")
        f.rect(40, y + 8, weight * 262, 20, rx=3, fill=colour,
               fill_opacity="0.55")
        if i < 2:
            f.text(40 + weight * 262 - 8, y + 23, "binding", cls="sm",
                   anchor="end")
    f.line(30, 302, 330, 302, cls="rule")
    f.text(BCX, 324, "the standards are principles-based and prescribe",
           cls="sm dim")
    f.text(BCX, 340, "no method — notes are what fills that gap", cls="sm dim")
    f.text(BCX, 366, "they can lag a changed standard, and two written",
           cls="sm dim")
    f.text(BCX, 382, "years apart need not agree with each other",
           cls="sm dim")
    return f


@figure("Duty to Report", "The three-step escalation, each step given a real "
        "chance before the next", width=WID)
def duty_to_report() -> Fig:
    f = vcard()

    rows = [("CEO and CFO", "and give them a real chance to fix it", BLUE),
            ("The directors", "if it is not suitably addressed", AMBER),
            ("OSFI", "if it is still not addressed", ROSE)]
    _stack(f, 108, rows, x0=34, x1=326, h=52, gap=18)
    f.line(30, 300, 330, 300, cls="rule")
    _bullets(f, 322, ["s. 361 immunity is what makes it usable",
                      "resigning without reporting defeats the design",
                      "and the successor must ask you why you left"],
             x=36, gap=24, colour=TEAL)
    f.text(BCX, 390, "document the dates, the audience and the answer",
           cls="sm dim")
    return f


@figure("Peer Review", "What a peer review adds, and the one thing it cannot "
        "move", width=WID)
def peer_review() -> Fig:
    f = vcard()

    f.text(BCX, 102, "how deep the review goes", cls="sm dim")
    for i, (name, w, colour) in enumerate(
            [("full re-performance", 246, BLUE),
             ("methods and assumptions", 176, TEAL),
             ("targeted — one line, one issue", 106, AMBER)]):
        y = 124 + i * 42
        f.text(40, y, name, cls="sm", anchor="start")
        f.rect(40, y + 6, w, 16, rx=3, fill=colour, fill_opacity="0.55")
    f.line(30, 258, 330, 258, cls="rule")
    _bullets(f, 280, ["independence is the whole value — a reviewer",
                      "reporting to the same management adds little",
                      "OSFI may require one after adverse development",
                      "and the findings have to be recorded and actioned"],
             x=36, gap=24, colour=ROSE)
    f.text(BCX, 388, "an unaddressed finding is worse than no review",
           cls="sm dim")
    return f


@figure("External Auditor", "Actuary and auditor relying on each other, and the "
        "judgements they can genuinely disagree about", width=WID)
def external_auditor() -> Fig:
    f = vcard()

    f.chip(92, 112, "actuary", colour=BLUE, w=112, h=28)
    f.chip(268, 112, "auditor", colour=AMBER, w=112, h=28)
    f.arrow(150, 104, 210, 104, colour=BLUE, width=1.5)
    f.arrow(210, 122, 150, 122, colour=AMBER, width=1.5)
    f.text(BCX, 150, "the valuation and the AA's report go one way,",
           cls="sm dim")
    f.text(BCX, 166, "data and asset information the other", cls="sm dim")
    f.line(30, 188, 330, 188, cls="rule")
    f.text(BCX, 210, "where they can genuinely disagree", cls="sm bold")
    _bullets(f, 234, ["the risk adjustment's confidence level",
                      "the discount rate and illiquidity premium",
                      "which groups are onerous",
                      "and the materiality standard each applies"],
             x=36, gap=25, colour=VIOLET)
    f.text(BCX, 356, "they meet at the audit committee — a board that",
           cls="sm dim")
    f.text(BCX, 372, "hears them only separately loses the disagreement",
           cls="sm dim")
    return f


@figure("Corporate Governance", "The three lines model, and the Appointed "
        "Actuary's place outside management's reporting line", width=WID)
def corporate_governance() -> Fig:
    f = vcard()

    rows = [("The business", "owns and manages its risks", BLUE),
            ("Oversight functions", "risk, compliance, the actuary", TEAL),
            ("Internal audit", "independent assurance to the board", VIOLET)]
    _stack(f, 100, rows, x0=30, x1=330, h=48, gap=12, arrows=False)
    f.line(30, 268, 330, 268, cls="rule")
    _bullets(f, 290, ["the board approves strategy and risk appetite",
                      "a majority of independent directors, and a chair",
                      "independent of management",
                      "and the actuary answers to the directors — which",
                      "is what makes the duty to report workable"],
             x=36, gap=23, colour=AMBER)
    return f
