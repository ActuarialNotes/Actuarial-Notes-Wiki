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

@figure("Insurance Legislation", "The four layers of Canadian insurance rules, "
        "with the line between what is law and what is expectation", width=WID)
def insurance_legislation() -> Fig:
    f = vcard("Four layers, and only two of them are law",
              "Statute → Regulation → Guideline → Bulletin")

    _stack(f, 92, [("Statute", "Insurance Companies Act, Insurance Acts", BLUE),
                   ("Regulation", "Ontario Reg. 664 — cabinet, not the House",
                    TEAL)],
           x0=34, x1=326, h=44, gap=12)
    f.line(30, 208, 330, 208, cls="thin dash", stroke=ROSE, stroke_width="1.4")
    f.text(BCX, 202, "binding law above", cls="sm", fill=ROSE)
    f.text(BCX, 224, "supervisory expectation below", cls="sm", fill=ROSE)
    _stack(f, 238, [("Guideline", "OSFI B-series, MCT — what OSFI expects",
                     AMBER),
                    ("Bulletin", "the regulator's reading of the day", VIOLET)],
           x0=34, x1=326, h=44, gap=12, arrows=False)
    f.arrow(BCX, 226, BCX, 236, colour="var(--dim)", width=1.3)
    f.text(BCX, 362, "departing from a guideline is allowed —", cls="sm dim")
    f.text(BCX, 378, "explaining it to OSFI is the price", cls="sm dim")
    return f


@figure("Insurance Regulation", "One insurer answering to a federal solvency "
        "regulator and to every province it writes in", width=WID)
def insurance_regulation() -> Fig:
    f = vcard("No one regulator sees the whole insurer",
              ["Regulation = Solvency + Market conduct",
               "federal / provincial — the same company"])

    f.chip(BCX, 100, "one insurer", colour=VIOLET, w=140, h=28)
    f.arrow(BCX - 30, 116, 116, 142, colour="var(--dim)", width=1.3)
    f.arrow(BCX + 30, 116, 244, 142, colour="var(--dim)", width=1.3)
    _columns(f, 150, ["OSFI", "The provinces"],
             [["capital", "valuation", "reserves", "intervention"],
              ["licensing", "rates", "policy forms", "claims conduct"]],
             x0=30, x1=330, colours=(BLUE, AMBER))
    f.text(BCX, 344, "solvency is federal, the contract is provincial —",
           cls="sm dim")
    f.text(BCX, 360, "and both apply to every policy sold", cls="sm dim")
    return f


@figure("Federal-Provincial Jurisdiction", "The constitutional split: Parliament "
        "regulates the insurer, the provinces regulate the policy", width=WID)
def federal_provincial_jurisdiction() -> Fig:
    f = vcard("Parliament takes the insurer, the provinces take the policy",
              ["Federal: the institution — s. 91",
               "Provincial: the contract — s. 92(13)"])

    _columns(f, 104, ["Federal", "Provincial"],
             [["incorporation", "capital, MCT", "Appointed Actuary",
               "intervention"],
              ["licence to write", "rate approval", "policy wordings",
               "agents, adjusters"]],
             x0=30, x1=330, colours=(BLUE, AMBER))
    f.text(BCX, 268, "property and civil rights in the province", cls="sm dim")
    f.text(BCX, 296, "so a national insurer holds one federal order",
           cls="sm dim")
    f.text(BCX, 312, "to commence business and ten provincial licences",
           cls="sm dim")
    f.text(BCX, 344, "the United States has no federal half at all",
           cls="sm dim")
    f.text(BCX, 360, "— McCarran-Ferguson leaves it to the states", cls="sm dim")
    return f


@figure("OSFI", "OSFI's intervention ladder, from normal supervision to "
        "non-viability", width=WID)
def osfi() -> Fig:
    f = vcard("Prudential supervision runs on a ladder",
              ["Composite risk rating → stage 0–4",
               "solvency only — never rates or conduct"])

    rows = [("Stage 0 — normal", "routine supervision", GREEN),
            ("Stage 1 — early warning", "issues identified", TEAL),
            ("Stage 2 — risk to viability", "capital plan required", AMBER),
            ("Stage 3 — serious doubt", "business restricted", ROSE),
            ("Stage 4 — non-viable", "control of assets", VIOLET)]
    for i, (label, sub, colour) in enumerate(rows):
        y = 100 + i * 52
        f.rect(38, y, 284 * (0.52 + 0.12 * i), 40, rx=6, fill=colour,
               fill_opacity="0.18", stroke=colour, stroke_width="1.3")
        f.text(46, y + 17, label, cls="sm bold", anchor="start")
        f.text(46, y + 31, sub, cls="sm dim", anchor="start")
    f.text(BCX, 384, "escalation is graduated, and never automatic",
           cls="sm dim")
    return f


@figure("Superintendent of Insurance", "The provincial superintendent's powers "
        "beside the federal solvency regulator's", width=WID)
def superintendent_of_insurance() -> Fig:
    f = vcard("The province licenses; Ottawa capitalises",
              ["One licence per province, every province",
               "plus one federal order to commence"])

    _columns(f, 96, ["Superintendent", "OSFI"],
             [["licence insurers", "licence agents", "approve rates",
               "police conduct", "set benefits"],
              ["capital, MCT", "valuation", "guidelines", "intervention", ""]],
             x0=30, x1=330, colours=(AMBER, BLUE))
    f.text(BCX, 274, "FSRA · AMF · Alberta · BCFSA — one office", cls="sm dim")
    f.text(BCX, 290, "per province, under a different name each time",
           cls="sm dim")
    f.text(BCX, 322, "a provincially chartered insurer gets both halves",
           cls="sm dim")
    f.text(BCX, 338, "from the same office — it adopts the MCT rather", cls="sm dim")
    f.text(BCX, 354, "than writing a capital rule of its own", cls="sm dim")
    return f


@figure("Financial Services Regulatory Authority of Ontario",
        "The Ontario file-and-approve auto rate cycle, from filing to "
        "implementation", width=WID)
def fsra() -> Fig:
    f = vcard("Ontario auto rates are used only once approved",
              ["File → review → approve → use",
               "the level and the classification plan"])

    _flow(f, 116, ["file", "review", "approve", "use"],
          colours=[BLUE, AMBER, GREEN, TEAL], h=26)
    f.text(BCX, 152, "and the review takes months, so the rate", cls="sm dim")
    f.text(BCX, 168, "in force always trails the cost that justified it",
           cls="sm dim")
    _bullets(f, 208, ["created 2019, replacing FSCO",
                      "self-funded by industry assessment",
                      "principles-based, outcome-focused",
                      "runs the Minor Injury Guideline",
                      "publishes what support a filing needs"],
             x=44, gap=26, colour=BLUE)
    f.text(BCX, 372, "solvency is still OSFI's — FSRA does not do capital",
           cls="sm dim")
    return f


@figure("Autorité des marchés financiers", "Quebec's integrated regulator and its "
        "split public–private auto market", width=WID)
def amf() -> Fig:
    f = vcard("Quebec supervises everything in one body",
              ["Prudential + conduct + securities",
               "one regulator, one civil-law contract"])

    f.chip(BCX, 106, "Autorité des marchés financiers", colour=VIOLET, w=250,
           h=28, cls="sm")
    for i, (label, colour) in enumerate([("insurance", BLUE), ("securities", TEAL),
                                         ("deposits", AMBER),
                                         ("distribution", GREEN)]):
        cx = 62 + i * 79
        f.arrow(BCX, 122, cx, 150, colour="var(--dim)", width=1.1)
        f.text(cx, 168, label, cls="sm")
    f.line(30, 196, 330, 196, cls="rule")
    f.text(BCX, 222, "Quebec auto is split down the middle", cls="sm bold")
    _columns(f, 240, ["Bodily injury", "Property damage"],
             [["public SAAQ", "no-fault"], ["private insurers", "under the AMF"]],
             x0=34, x1=326, row_h=22, head_h=26, colours=(AMBER, BLUE))
    f.text(BCX, 372, "the Civil Code governs the contract, not an Insurance Act",
           cls="sm dim")
    return f


@figure("Canadian Council of Insurance Regulators", "CCIR harmonising a position "
        "that each member regulator must then adopt itself", width=WID)
def ccir() -> Fig:
    f = vcard("It harmonises; it cannot compel",
              ["CCIR position → each regulator adopts",
               "no legal authority of its own"])

    f.chip(BCX, 108, "CCIR agrees a position", colour=VIOLET, w=220, h=28)
    for i, name in enumerate(["FSRA", "AMF", "BCFSA", "Alberta"]):
        cx = 62 + i * 79
        f.arrow(BCX, 124, cx, 158, colour="var(--dim)", width=1.1, dash=True)
        f.chip(cx, 176, name, colour=BLUE, w=66, h=24)
        f.text(cx, 204, "adopts", cls="sm dim")
        f.text(cx, 219, "separately", cls="sm dim")
    f.line(30, 244, 330, 244, cls="rule")
    _bullets(f, 268, ["the Market Conduct Annual Statement",
                      "the fair-treatment-of-customers guidance",
                      "harmonised forms and filings"],
             x=44, gap=24, colour=TEAL)
    f.text(BCX, 356, "it is not a regulator, and OSFI keeps solvency",
           cls="sm dim")
    return f


@figure("Solvency Regulation", "The solvency condition — assets covering "
        "liabilities plus required capital — and the three pillars", width=WID)
def solvency_regulation() -> Fig:
    f = vcard("Assets must cover the liabilities and a buffer",
              "Assets ≥ Liabilities + Required capital")

    f.text(BCX, 100, "the balance sheet the regulator tests", cls="sm dim")
    f.rect(46, 118, 110, 176, rx=6, fill=BLUE, fill_opacity="0.20",
           stroke=BLUE, stroke_width="1.3")
    f.text(101, 210, "assets", cls="sm bold")
    f.rect(204, 118, 110, 118, rx=6, fill=AMBER, fill_opacity="0.20",
           stroke=AMBER, stroke_width="1.3")
    f.text(259, 182, "liabilities", cls="sm bold")
    f.rect(204, 240, 110, 54, rx=6, fill=GREEN, fill_opacity="0.24",
           stroke=GREEN, stroke_width="1.3")
    f.text(259, 265, "required", cls="sm bold")
    f.text(259, 280, "capital", cls="sm bold")
    f.text(180, 210, "≥", cls="ttl", fill="var(--dim)")
    _pill_row(f, 322, ["capital", "governance", "disclosure"],
              [BLUE, AMBER, TEAL], x0=36, x1=324, h=24)
    f.text(BCX, 358, "three pillars — and not a zero-failure regime:",
           cls="sm dim")
    f.text(BCX, 374, "PACICC exists because insurers are allowed to fail",
           cls="sm dim")
    return f


@figure("Market Conduct Regulation", "The conduct chain from sale to complaint, "
        "with claims handling carrying the largest exposure", width=WID)
def market_conduct_regulation() -> Fig:
    f = vcard("How the insurer behaves, start to finish",
              ["Fair treatment of customers",
               "product design → sale → claim → complaint"])

    rows = [("Product design", "suitability, target market", BLUE),
            ("Distribution", "licensing, disclosure, take-all-comers", TEAL),
            ("Claims handling", "good faith — bad faith is actionable", ROSE),
            ("Complaints", "ombudservice, regulator reporting", AMBER)]
    _stack(f, 100, rows, x0=34, x1=326, h=44, gap=12)
    f.text(BCX, 348, "the Market Conduct Annual Statement is CCIR's,",
           cls="sm dim")
    f.text(BCX, 364, "and separate from OSFI's prudential return", cls="sm dim")
    return f


@figure("Rate Regulation", "The statutory three-part rate standard and the three "
        "regimes, ordered by how tightly they grip", width=WID)
def rate_regulation() -> Fig:
    f = vcard("Not excessive, not inadequate, not unfair",
              ["Prior approval → file-and-use → use-and-file",
               "grip loosens as the line gets less compulsory"])

    for i, (label, why, colour) in enumerate(
            [("not excessive", "consumer protection", BLUE),
             ("not inadequate", "solvency", AMBER),
             ("not unfairly", "equity", GREEN)]):
        y = 100 + i * 40
        f.text(52, y, label + ("" if i != 2 else " discriminatory"), cls="sm bold",
               anchor="start", fill=colour)
        f.text(52, y + 16, why, cls="sm dim", anchor="start")
    f.line(30, 222, 330, 222, cls="rule")
    for i, (name, note, colour, w) in enumerate(
            [("Prior approval", "Ontario auto", ROSE, 268),
             ("File-and-use", "used at once", AMBER, 196),
             ("Use-and-file", "commercial lines", GREEN, 124)]):
        y = 246 + i * 44
        f.rect(40, y, w, 32, rx=5, fill=colour, fill_opacity="0.20",
               stroke=colour, stroke_width="1.2")
        f.text(50, y + 20, f"{name} — {note}", cls="sm", anchor="start")
    f.text(BCX, 388, "the tighter the grip, the longer the lag", cls="sm dim")
    return f


@figure("Risk Classification Restrictions", "A banned rating variable's signal "
        "migrating into the permitted variables correlated with it", width=WID)
def risk_classification_restrictions() -> Fig:
    f = vcard("Ban a variable and its signal moves next door",
              ["Prohibited ≠ unpredictive",
               "the question is whether pricing on it is acceptable"])

    f.chip(BCX, 108, "credit score — banned", colour=ROSE, w=210, h=28)
    f.line(BCX - 105, 108, BCX + 105, 108, cls="thin", stroke=ROSE,
           stroke_width="1.6")
    for i, name in enumerate(["territory", "vehicle", "tenure"]):
        cx = 82 + i * 98
        f.arrow(BCX, 126, cx, 162, colour=AMBER, width=1.4, dash=True)
        f.chip(cx, 180, name, colour=AMBER, w=88, h=24)
    f.text(BCX, 214, "the signal reappears as a proxy", cls="sm bold", fill=AMBER)
    f.line(30, 238, 330, 238, cls="rule")
    _bullets(f, 262, ["cross-subsidy: good risks pay for bad",
                      "good risks leave, or the residual market grows",
                      "the plan differs by province, so a national",
                      "insurer runs a different one in each"],
             x=40, gap=24, colour=BLUE)
    f.text(BCX, 380, "restriction is a policy choice, not an actuarial one",
           cls="sm dim")
    return f


@figure("Territorial Rating", "Territory relativities across a city, with the "
        "cross-subsidy that flattening them creates", width=WID)
def territorial_rating() -> Fig:
    f = vcard("The most predictive variable, and the most contested",
              ["Relativity = territory pure premium",
               "÷ overall pure premium"])

    cents = _vbars(f, [1.42, 1.15, 0.94, 0.78], ["urban", "suburb", "town", "rural"],
                   250, x0=48, x1=316, top=1.6, height=126,
                   fmt=lambda v: f"{v:.2f}",
                   colours=[ROSE, AMBER, TEAL, GREEN])
    f.line(48, 250 - 126 / 1.6, 322, 250 - 126 / 1.6, cls="thin dash",
           stroke="var(--dim)", stroke_width="1.3")
    f.text(322, 250 - 126 / 1.6 - 6, "1.00", cls="sm dim", anchor="end")
    f.text(BCX, 292, "flatten them and the two on the right", cls="sm dim")
    f.text(BCX, 308, "pay for the two on the left", cls="sm dim")
    f.text(BCX, 336, "traffic density, theft, weather, litigation —", cls="sm dim")
    f.text(BCX, 352, "all real, and all correlated with who lives there",
           cls="sm dim")
    f.text(BCX, 380, "Ontario limits how narrowly a territory is drawn",
           cls="sm dim")
    return f


@figure("Unfair Discrimination", "The two distinct failures — a rate difference "
        "with no cost basis, and a cost-based difference on a barred basis",
        width=WID)
def unfair_discrimination() -> Fig:
    f = vcard("Same expected cost, same price",
              "Premium ratio = expected loss ratio")

    f.text(BCX, 100, "two failures that get confused", cls="sm dim")
    f.rect(36, 118, 288, 86, rx=7, fill=ROSE, fill_opacity="0.12", stroke=ROSE,
           stroke_width="1.2")
    f.text(BCX, 140, "No cost basis", cls="sm bold", fill=ROSE)
    f.text(BCX, 162, "priced on elasticity, not on loss —", cls="sm")
    f.text(BCX, 180, "an actuarial failure", cls="sm")
    f.rect(36, 218, 288, 86, rx=7, fill=VIOLET, fill_opacity="0.12",
           stroke=VIOLET, stroke_width="1.2")
    f.text(BCX, 240, "Barred basis", cls="sm bold", fill=VIOLET)
    f.text(BCX, 262, "the data supports the difference and", cls="sm")
    f.text(BCX, 280, "the law forbids it anyway", cls="sm")
    f.text(BCX, 330, "the second is a policy override, and the actuary's",
           cls="sm dim")
    f.text(BCX, 346, "job is to say so rather than to defend the rate",
           cls="sm dim")
    f.text(BCX, 374, "a proxy reproduces a barred variable — also unfair",
           cls="sm dim")
    return f


@figure("Bias in Actuarial Practice", "Testing a model on outputs by group, and "
        "the three fairness definitions that cannot all hold at once", width=WID)
def bias_in_actuarial_practice() -> Fig:
    f = vcard("Dropping the variable does not remove the effect",
              ["Test the outputs, not the inputs",
               "predicted vs actual cost, by group"])

    f.text(BCX, 100, "loss ratio by group, one model", cls="sm dim")
    _vbars(f, [0.63, 0.72, 0.66], ["group A", "group B", "group C"], 208,
           x0=60, x1=306, top=0.85, height=82, fmt=lambda v: f"{v:.0%}",
           colours=[TEAL, ROSE, TEAL])
    f.text(BCX, 244, "group B pays too little for its cost —", cls="sm dim")
    f.text(BCX, 260, "found only by looking at the output", cls="sm dim")
    f.line(30, 280, 330, 280, cls="rule")
    f.text(BCX, 302, "and these three cannot all hold", cls="sm bold")
    _pill_row(f, 328, ["equal premium", "equal LR", "equal risk"],
              [BLUE, AMBER, GREEN], x0=32, x1=328, h=24)
    f.text(BCX, 362, "so fairness has to be chosen, stated and documented",
           cls="sm dim")
    f.text(BCX, 378, "in the model risk framework — not assumed", cls="sm dim")
    return f


@figure("Take-All-Comers Rule", "An applicant who meets the filed rules must be "
        "written at the filed rate; one who fails them may be declined",
        width=WID)
def take_all_comers_rule() -> Fig:
    f = vcard("Meet the filed rules and the insurer must write you",
              ["Compulsory product ⇒ compulsory offer",
               "at the filed rate, on the filed rules"])

    f.chip(BCX, 104, "applicant for compulsory auto", colour=VIOLET, w=250, h=28)
    f.text(BCX, 142, "does the applicant meet the filed rules?", cls="sm dim")
    f.arrow(BCX, 152, 106, 178, colour="var(--dim)", width=1.3)
    f.arrow(BCX, 152, 254, 178, colour="var(--dim)", width=1.3)
    f.text(120, 172, "yes", cls="sm bold", fill=GREEN)
    f.text(240, 172, "no", cls="sm bold", fill=AMBER)
    f.box(38, 190, 130, 76, label="must write", colour=GREEN,
          sub="at the filed rate")
    f.box(192, 190, 130, 76, label="may decline", colour=AMBER,
          sub="rule must be filed")
    f.arrow(257, 268, 257, 292, colour="var(--dim)", width=1.3)
    f.chip(257, 306, "Facility Association", colour=ROSE, w=140, h=24)
    f.text(BCX, 344, "so an insurer cannot underwrite its way out of", cls="sm dim")
    f.text(BCX, 360, "an inadequate approved rate — it must file for more",
           cls="sm dim")
    f.text(BCX, 384, "refusing to quote is a market-conduct offence", cls="sm dim")
    return f


@figure("Automobile Insurance Reform", "The reform cycle, and the levers ranked "
        "by the savings each delivers", width=WID)
def automobile_insurance_reform() -> Fig:
    f = vcard("Under rate regulation, only cost can be cut",
              ["Premium ≈ Freq × Sev ÷ (1 − V − Q)",
               "so the only durable saving is a cheaper product"])

    cx, cy, r = BCX, 168, 62
    steps = [("costs rise", -90, BLUE), ("rates lag", 0, AMBER),
             ("crisis", 90, ROSE), ("reform", 180, GREEN)]
    for label, deg, colour in steps:
        a = math.radians(deg)
        f.chip(cx + r * math.cos(a) * 1.55, cy + r * math.sin(a) * 0.95, label,
               colour=colour, w=92, h=24)
    for deg in (-45, 45, 135, 225):
        a0, a1 = math.radians(deg - 26), math.radians(deg + 26)
        f.arrow(cx + r * 0.95 * math.cos(a0), cy + r * 0.62 * math.sin(a0),
                cx + r * 0.95 * math.cos(a1), cy + r * 0.62 * math.sin(a1),
                colour="var(--dim)", width=1.3)
    f.line(30, 244, 330, 244, cls="rule")
    f.text(BCX, 264, "the levers, by savings delivered", cls="sm dim")
    for i, (name, colour, w) in enumerate(
            [("restrict tort access", ROSE, 264),
             ("cap or define benefits", AMBER, 216),
             ("convert to first party", TEAL, 172),
             ("attack cost drivers", GREEN, 140)]):
        y = 280 + i * 28
        f.rect(40, y, w, 22, rx=4, fill=colour, fill_opacity="0.24",
               stroke=colour, stroke_width="1.1")
        f.text(48, y + 15, name, cls="sm", anchor="start")
    return f


@figure("No-Fault Insurance", "The trade a no-fault scheme makes — first-party "
        "benefits at once against the right to sue", width=WID)
def no_fault_insurance() -> Fig:
    f = vcard("Certainty of benefit bought with the right to sue",
              ["Benefits from your own insurer,",
               "whoever caused the collision"])

    _columns(f, 98, ["You gain", "You give up"],
             [["payment in weeks", "no fault to prove", "everyone covered",
               "lower legal cost"],
              ["the tort action", "pain and suffering", "full damages",
               "deterrence"]],
             x0=30, x1=330, colours=(GREEN, ROSE))
    f.text(BCX, 244, "Canadian schemes are almost all partial", cls="sm bold")
    f.rect(40, 262, 280, 30, rx=5, fill=BLUE, fill_opacity="0.18", stroke=BLUE,
           stroke_width="1.2")
    f.rect(40, 262, 168, 30, rx=5, fill=BLUE, fill_opacity="0.34", stroke="none")
    f.text(124, 281, "accident benefits", cls="sm")
    f.text(264, 281, "tort above", cls="sm")
    f.line(208, 256, 208, 300, cls="thin dash", stroke=ROSE, stroke_width="1.4")
    f.text(208, 314, "threshold", cls="sm", fill=ROSE)
    f.text(BCX, 348, "Quebec and Manitoba bodily injury are pure —", cls="sm dim")
    f.text(BCX, 364, "the tort action is gone entirely", cls="sm dim")
    f.text(BCX, 388, "severity risk becomes frequency risk", cls="sm dim")
    return f


@figure("Statutory Accident Benefits", "The benefit heads every auto policy must "
        "carry, and the tiered limits that drive their cost", width=WID)
def statutory_accident_benefits() -> Fig:
    f = vcard("First-party benefits set by regulation, not by the insurer",
              ["Medical · attendant care · income",
               "· death and funeral — regardless of fault"])

    _bullets(f, 104, ["medical and rehabilitation",
                      "attendant care — the severe-claim driver",
                      "income replacement, after an elimination period",
                      "non-earner, caregiver, housekeeping",
                      "death and funeral"],
             x=40, gap=25, colour=BLUE)
    f.line(30, 236, 330, 236, cls="rule")
    f.text(BCX, 254, "and the tier decides the limit", cls="sm dim")
    for i, (tier, amount, w, colour) in enumerate(
            [("minor", "$3,500", 34, GREEN),
             ("non-catastrophic", "$65,000", 112, AMBER),
             ("catastrophic", "$1,000,000", 232, ROSE)]):
        y = 274 + i * 38
        f.text(44, y, f"{tier} — {amount}", cls="sm", anchor="start")
        f.rect(44, y + 6, w, 16, rx=3, fill=colour, fill_opacity="0.55")
    f.text(BCX, 388, "so the fight is over the tier, not the treatment",
           cls="sm dim")
    return f


@figure("Minor Injury Guideline", "The MIG cap turning a continuous severity "
        "distribution into a spike at the cap and a tail beyond it", width=WID)
def minor_injury_guideline() -> Fig:
    f = vcard("A cap turns severity into a spike and a tail",
              ["Ontario MIG cap = $3,500 med/rehab",
               "escape the MIG and the limit multiplies"])

    ax = vaxes(f, 0, 10, 0, 1.0, left=40, right=16, top=34, bottom=72)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.area(lambda x: 0.62 * 2.718 ** (-0.55 * x), 0, 3.0, colour=GREEN,
            opacity="0.20")
    ax.curve(lambda x: 0.62 * 2.718 ** (-0.55 * x), colour=GREEN, width=2,
             xa=0, xb=3.0)
    ax.fig.rect(ax.px(2.85), ax.py(0.94), 10, ax.y1 - ax.py(0.94), rx=2,
                fill=ROSE, fill_opacity="0.6")
    ax.curve(lambda x: 0.055 + 0.10 * 2.718 ** (-0.30 * (x - 3)), colour=AMBER,
             width=2, xa=3.2, xb=9.8)
    ax.label(1.6, 0.44, "inside the MIG", cls="sm bold", fill=GREEN)
    ax.label(3.05, 0.99, "$3,500", cls="sm bold", fill=ROSE, dy=-6)
    ax.label(6.6, 0.30, "outside it", cls="sm bold", fill=AMBER)
    f.text(BCX, ax.y1 + 22, "cost of a soft-tissue claim", cls="sm dim")
    f.text(BCX, 356, "numerous, hard to verify, and the boundary is", cls="sm dim")
    f.text(BCX, 372, "the most litigated line in Canadian auto", cls="sm dim")
    return f


@figure("Catastrophic Impairment", "The order-of-magnitude step between the "
        "non-catastrophic and catastrophic benefit limits", width=WID)
def catastrophic_impairment() -> Fig:
    f = vcard("One designation multiplies the limit tenfold",
              ["A defined list, not a judgement",
               "— and then a lifetime care annuity"])

    f.text(BCX, 104, "Ontario medical, rehab and attendant care", cls="sm dim")
    f.rect(46, 126, 40, 10, rx=2, fill=AMBER, fill_opacity="0.75")
    f.text(96, 136, "non-catastrophic — $65,000", cls="sm", anchor="start")
    f.rect(46, 162, 268, 40, rx=4, fill=ROSE, fill_opacity="0.55")
    f.text(180, 187, "catastrophic — $1,000,000", cls="sm")
    f.line(30, 226, 330, 226, cls="rule")
    _bullets(f, 250, ["paraplegia, amputation, blindness",
                      "a listed impairment score, or",
                      "a catastrophic brain injury"],
             x=44, gap=24, colour=VIOLET)
    f.text(BCX, 330, "a few per cent of claims, a large share of cost",
           cls="sm dim")
    f.text(BCX, 354, "designation arrives years late, and the reserve", cls="sm dim")
    f.text(BCX, 370, "is a lifetime annuity — so discount rate and", cls="sm dim")
    f.text(BCX, 386, "care inflation move it more than the claim does",
           cls="sm dim")
    return f


@figure("Tort Threshold and Deductible", "Four bodily injury awards against a "
        "verbal threshold and a $45,000 deductible", width=WID)
def tort_threshold_and_deductible() -> Fig:
    f = vcard("The threshold truncates, the deductible shifts",
              "Paid = max(0, damages − deductible)")

    f.text(BCX, 100, "assessed vs paid, deductible $45,000", cls="sm dim")
    rows = [("$40,000", 40, 0, "$0", ROSE),
            ("$120,000", 120, 75, "$75,000", AMBER),
            ("$350,000", 350, 305, "$305,000", GREEN)]
    x0, scale = 44, 0.60
    for i, (name, gross, net, paid, colour) in enumerate(rows):
        y = 132 + i * 58
        f.text(x0, y, name, cls="sm", anchor="start")
        f.rect(x0, y + 8, gross * scale, 20, rx=3, fill="var(--soft)",
               stroke="var(--edge)", stroke_width="1.1")
        f.rect(x0, y + 8, net * scale, 20, rx=3, fill=colour, fill_opacity="0.65")
        f.text(x0 + gross * scale + 8, y + 23, paid, cls="sm", anchor="start",
               fill=colour)
    f.line(x0 + 45 * scale, 126, x0 + 45 * scale, 300, cls="thin dash",
           stroke=VIOLET, stroke_width="1.4")
    f.text(x0 + 45 * scale + 4, 314, "deductible", cls="sm", fill=VIOLET,
           anchor="start")
    f.text(BCX, 344, "a claim that fails the threshold never gets", cls="sm dim")
    f.text(BCX, 360, "as far as the deductible — it is paid nothing",
           cls="sm dim")
    f.text(BCX, 386, "the deductible takes 100% from one and 13% from another",
           cls="sm dim")
    return f


@figure("Direct Compensation Property Damage", "DCPD paying the insured's own "
        "vehicle damage in proportion to the other driver's fault", width=WID)
def direct_compensation_property_damage() -> Fig:
    f = vcard("Your own insurer pays for the other driver's fault",
              ["Recovery = Damage × (1 − fault share)",
               "first-party, but fault still decides how much"])

    f.text(BCX, 100, "tort", cls="sm bold", fill=ROSE)
    f.chip(88, 128, "insured", colour=BLUE, w=100, h=24)
    f.chip(272, 128, "other insurer", colour=AMBER, w=118, h=24)
    f.arrow(140, 128, 212, 128, colour=ROSE, width=1.5)
    f.text(BCX, 152, "a claim against a stranger — slow, expensive",
           cls="sm dim")
    f.line(30, 172, 330, 172, cls="rule")
    f.text(BCX, 194, "DCPD", cls="sm bold", fill=GREEN)
    f.chip(88, 222, "insured", colour=BLUE, w=100, h=24)
    f.chip(272, 222, "own insurer", colour=GREEN, w=118, h=24)
    f.arrow(140, 222, 212, 222, colour=GREEN, width=1.5)
    f.text(BCX, 246, "a first-party claim — fast, cheap", cls="sm dim")
    f.text(BCX, 280, "fault still decides how much", cls="sm bold")
    _hbar(f, 308, [(0.75, "75% paid", GREEN), (0.25, "25% not", "var(--dim)")],
          x0=46, x1=314, height=28)
    f.text(BCX, 342, "the insured was 25% at fault", cls="sm dim")
    f.text(BCX, 368, "DCPD experience tracks the cars you insure —", cls="sm dim")
    f.text(BCX, 384, "not the cars your policyholders hit", cls="sm dim")
    return f


@figure("Fault Determination Rules", "Fault read off a diagram in 25% increments, "
        "mechanically and without regard to the facts around it", width=WID)
def fault_determination_rules() -> Fig:
    f = vcard("Fault read off a diagram, not argued",
              ["Fault ∈ {0, 25, 50, 75, 100}%",
               "the physical facts, and nothing else"])

    f.rect(44, 100, 272, 96, rx=7, fill="var(--soft)", stroke="var(--edge)",
           stroke_width="1.2")
    f.text(BCX, 120, "rear-end collision — scenario 6", cls="sm dim")
    f.rect(96, 140, 52, 24, rx=4, fill=GREEN, fill_opacity="0.55")
    f.rect(178, 140, 52, 24, rx=4, fill=ROSE, fill_opacity="0.55")
    f.arrow(238, 152, 274, 152, colour="var(--dim)", width=1.3)
    f.text(122, 180, "0%", cls="sm bold", fill=GREEN)
    f.text(204, 180, "100%", cls="sm bold", fill=ROSE)
    _pill_row(f, 226, ["0%", "25%", "50%", "75%", "100%"],
              [GREEN, TEAL, AMBER, ROSE, VIOLET], x0=42, x1=318, h=24)
    f.text(BCX, 258, "50% or more counts as at fault", cls="sm dim")
    f.line(30, 278, 330, 278, cls="rule")
    _bullets(f, 300, ["certainty beats accuracy at this volume",
                      "wrong in the odd case, and deliberately so",
                      "binds first-party recovery and rating —",
                      "not a court hearing a bodily injury action"],
             x=40, gap=24, colour=BLUE)
    return f


@figure("Uninsured Automobile Coverage", "The two triggers — an uninsured driver "
        "and an unidentified one — and who ends up paying", width=WID)
def uninsured_automobile_coverage() -> Fig:
    f = vcard("Insured drivers absorb the cost of uninsured ones",
              ["Two triggers: uninsured · unidentified",
               "and the insured still proves liability"])

    _columns(f, 100, ["Uninsured", "Unidentified"],
             [["a real driver", "with no policy", "subrogation lies",
               "— rarely collects"],
              ["hit-and-run", "no defendant", "physical evidence",
               "requirements"]],
             x0=30, x1=330, colours=(AMBER, VIOLET))
    f.text(BCX, 248, "the insured must still show the other", cls="sm dim")
    f.text(BCX, 264, "driver was legally liable — so tort law", cls="sm dim")
    f.text(BCX, 280, "comes back inside a no-fault policy", cls="sm dim")
    f.line(30, 300, 330, 300, cls="rule")
    f.text(BCX, 322, "cost follows the province's uninsured rate", cls="sm bold")
    f.text(BCX, 350, "underinsured motorist coverage is the adjacent —", cls="sm dim")
    f.text(BCX, 366, "and usually optional — protection: insured,", cls="sm dim")
    f.text(BCX, 382, "but for less than the loss", cls="sm dim")
    return f


@figure("Insurance Bureau of Canada", "What the industry's trade association does, "
        "and the one thing it is not", width=WID)
def insurance_bureau_of_canada() -> Fig:
    f = vcard("The industry's voice — and not a regulator",
              ["Advocacy · data · consumer information",
               "membership is voluntary, output is not law"])

    f.chip(BCX, 106, "Insurance Bureau of Canada", colour=VIOLET, w=248, h=28)
    for i, (name, colour) in enumerate([("advocacy", BLUE), ("data", TEAL),
                                        ("consumers", GREEN), ("the Code", AMBER)]):
        cx = 62 + i * 79
        f.arrow(BCX, 122, cx, 152, colour="var(--dim)", width=1.1)
        f.text(cx, 170, name, cls="sm")
    f.line(30, 194, 330, 194, cls="rule")
    _bullets(f, 218, ["auto reform, flood and tax consultations",
                      "industry aggregates and catastrophe totals",
                      "the Vehicle Information Centre rating data",
                      "disaster response and anti-fraud work"],
             x=40, gap=25, colour=BLUE)
    f.rect(44, 322, 272, 44, rx=7, fill=ROSE, fill_opacity="0.12", stroke=ROSE,
           stroke_width="1.2")
    f.text(BCX, 340, "it does not licence, approve rates,", cls="sm", fill=ROSE)
    f.text(BCX, 357, "set capital or adjudicate a complaint", cls="sm", fill=ROSE)
    return f


@figure("Code of Consumer Rights and Responsibilities", "A voluntary code's "
        "two halves, and the four limits that make it self-regulation",
        width=WID)
def code_of_consumer_rights() -> Fig:
    f = vcard("A voluntary bargain, with no statutory remedy",
              ["Rights ↔ responsibilities",
               "adopted by members, enacted by nobody"])

    _columns(f, 96, ["Your rights", "Your duties"],
             [["plain-language", "information", "professional", "service",
               "prompt claims"],
              ["ask, and", "understand", "full and honest", "disclosure",
               "report promptly"]],
             x0=30, x1=330, row_h=22, colours=(GREEN, AMBER))
    f.line(30, 250, 330, 250, cls="rule")
    f.text(BCX, 272, "and the four limits the exam wants", cls="sm bold",
           fill=ROSE)
    _bullets(f, 296, ["no statutory remedy for a breach",
                      "binds members only",
                      "written by the industry it governs",
                      "enforced only if a Superintendent acts"],
             x=40, gap=24, colour=ROSE)
    return f


@figure("Court Case", "A single appellate decision moving the reserve on every "
        "open claim, not just the one before the court", width=WID)
def court_case() -> Fig:
    f = vcard("One decision reprices every open claim",
              ["A ruling binds until a higher court",
               "or the legislature answers it"])

    for i, (name, colour, w) in enumerate(
            [("Supreme Court of Canada", VIOLET, 272),
             ("provincial court of appeal", BLUE, 220),
             ("trial court", TEAL, 168)]):
        y = 100 + i * 44
        f.rect(44 + (272 - w) / 2, y, w, 34, rx=6, fill=colour,
               fill_opacity="0.18", stroke=colour, stroke_width="1.2")
        f.text(BCX, y + 22, name, cls="sm")
        if i:
            f.arrow(BCX, y - 10, BCX, y - 1, colour="var(--dim)", width=1.2)
    f.text(BCX, 254, "binds downward, everywhere below it", cls="sm dim")
    f.line(30, 274, 330, 274, cls="rule")
    ax = vaxes(f, 0, 6, 0, 100, left=44, right=16, top=228, bottom=30)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.polyline([(0, 40), (3, 44)], colour=BLUE, width=2.4)
    ax.polyline([(3, 44), (3, 74), (6, 82)], colour=ROSE, width=2.4)
    ax.label(1.4, 24, "reserve", cls="sm dim")
    ax.label(3.05, 88, "decision", cls="sm bold", fill=ROSE, anchor="start")
    f.text(BCX, 382, "and the effect is retroactive — it lands on claims",
           cls="sm dim")
    return f


@figure("Duty of Good Faith", "The duty running both ways, and the imbalance in "
        "what a breach costs each side", width=WID)
def duty_of_good_faith() -> Fig:
    f = vcard("A duty owed in both directions, unequally felt",
              ["uberrimae fidei — utmost good faith",
               "at application, in force, and on the claim"])

    f.chip(88, 112, "insured", colour=BLUE, w=104, h=28)
    f.chip(272, 112, "insurer", colour=AMBER, w=104, h=28)
    f.arrow(146, 104, 214, 104, colour=BLUE, width=1.5)
    f.arrow(214, 122, 146, 122, colour=AMBER, width=1.5)
    _columns(f, 148, ["owes", "owes"],
             [["full disclosure", "honest claims", "cooperation"],
              ["prompt, fair", "investigation", "reasons on denial",
               "equal regard"]],
             x0=30, x1=330, row_h=22, head_h=24, colours=(BLUE, AMBER))
    f.line(30, 274, 330, 274, cls="rule")
    f.text(BCX, 296, "but the positions are not equal", cls="sm bold", fill=ROSE)
    f.text(BCX, 320, "the claimant has just suffered a loss and", cls="sm dim")
    f.text(BCX, 336, "cannot fund years of litigation — which is why", cls="sm dim")
    f.text(BCX, 352, "the duty is enforced with damages of its own",
           cls="sm dim")
    f.text(BCX, 380, "in Quebec it comes from the Civil Code, not equity",
           cls="sm dim")
    return f


@figure("Bad Faith Damages", "An insurer's exposure to a bad-faith claim building "
        "past the policy limit", width=WID)
def bad_faith_damages() -> Fig:
    f = vcard("The policy limit does not cap this",
              ["Exposure = benefit + aggravated",
               "+ punitive + costs"])

    _waterfall(f, 268,
               [("benefit", 320.0, BLUE), ("aggravated", 100.0, AMBER),
                ("punitive", 1000.0, ROSE), ("costs", 180.0, VIOLET),
                ("total", None, TEAL)],
               x0=40, x1=322, top=124, fmt=lambda v: f"{v/1000:,.2f}M"
               if v >= 1000 else f"{v:,.0f}k")
    f.line(40, 268 - 320 * (124 / 1600), 322, 268 - 320 * (124 / 1600),
           cls="thin dash", stroke="var(--dim)", stroke_width="1.3")
    f.text(BCX, 304, "the dashed line is the policy limit — it caps",
           cls="sm dim")
    f.text(BCX, 320, "the benefit, and nothing else on this chart",
           cls="sm dim")
    f.text(BCX, 346, "Whiten v. Pilot Insurance (SCC, 2002): a fire claim",
           cls="sm dim")
    f.text(BCX, 362, "denied on an unsupported arson allegation", cls="sm dim")
    f.text(BCX, 386, "the claim is not on the contract, so the contract",
           cls="sm dim")
    return f


@figure("Punitive Damages", "The four quantum factors a Canadian court weighs, "
        "and the rationality test that bounds the award", width=WID)
def punitive_damages() -> Fig:
    f = vcard("Punishment, not compensation — and exceptional",
              ["Awarded only for an independent wrong",
               "and only if compensation has not deterred"])

    f.text(BCX, 102, "what raises the award", cls="sm dim")
    _bullets(f, 128, ["how reprehensible the conduct was",
                      "how vulnerable the plaintiff was",
                      "the harm caused or intended",
                      "the profit the insurer made from it"],
             x=44, gap=26, colour=ROSE)
    f.line(30, 244, 330, 244, cls="rule")
    f.rect(44, 264, 272, 60, rx=7, fill=AMBER, fill_opacity="0.12",
           stroke=AMBER, stroke_width="1.2")
    f.text(BCX, 288, "no fixed multiplier — the award must be", cls="sm")
    f.text(BCX, 306, "no more than rationally needed to deter", cls="sm")
    f.text(BCX, 348, "Whiten: $1M punitive on a $345k fire claim,", cls="sm dim")
    f.text(BCX, 364, "modest by American standards and not trivial", cls="sm dim")
    f.text(BCX, 386, "a policyholder cannot insure their own", cls="sm dim")
    return f


@figure("Duty to Defend", "The duty to defend read off the pleadings, sitting "
        "outside the narrower duty to indemnify", width=WID)
def duty_to_defend() -> Fig:
    f = vcard("Read the pleadings, not the evidence",
              ["Duty to defend ⊃ duty to indemnify",
               "one arguable allegation defends the whole claim"])

    f.circle(178, 202, 84, fill=BLUE, fill_opacity="0.14", stroke=BLUE,
             stroke_width="1.6")
    f.circle(178, 224, 44, fill=AMBER, fill_opacity="0.22", stroke=AMBER,
             stroke_width="1.6")
    f.text(178, 138, "alleged", cls="sm bold", fill=BLUE)
    f.text(178, 232, "proven", cls="sm bold", fill=AMBER)
    f.text(178, 168, "defend", cls="sm", fill=BLUE)
    f.text(178, 250, "indemnify", cls="sm", fill=AMBER)
    f.text(BCX, 306, "so an insurer defends claims it may never pay",
           cls="sm dim")
    f.text(BCX, 330, "under a reservation of rights — and where the", cls="sm dim")
    f.text(BCX, 346, "defence could steer the outcome, the insured", cls="sm dim")
    f.text(BCX, 362, "picks independent counsel at the insurer's cost",
           cls="sm dim")
    f.text(BCX, 386, "defence cost is ALAE, and it can rival indemnity",
           cls="sm dim")
    return f


@figure("Vicarious Liability", "Liability passing to the vehicle owner and the "
        "employer, neither of whom was careless", width=WID)
def vicarious_liability() -> Fig:
    f = vcard("Liable for someone else's negligence",
              ["Owner ← permitted driver",
               "Employer ← employee, in the course of work"])

    f.chip(96, 116, "driver", colour=ROSE, w=110, h=26)
    f.chip(264, 116, "owner", colour=BLUE, w=110, h=26)
    f.arrow(152, 116, 208, 116, colour="var(--dim)", width=1.4)
    f.text(BCX, 148, "consent to use the vehicle", cls="sm dim")
    f.chip(96, 186, "employee", colour=ROSE, w=110, h=26)
    f.chip(264, 186, "employer", colour=BLUE, w=110, h=26)
    f.arrow(152, 186, 208, 186, colour="var(--dim)", width=1.4)
    f.text(BCX, 218, "in the course of employment", cls="sm dim")
    f.line(30, 240, 330, 240, cls="rule")
    f.text(BCX, 262, "neither of the two on the right did anything wrong",
           cls="sm dim")
    _bullets(f, 292, ["control of the activity, and the deeper pocket",
                      "so the risk is the car and everyone who drives it",
                      "— which is why a household member matters",
                      "some provinces cap the owner's share"],
             x=40, gap=24, colour=TEAL)
    return f


@figure("Limitation Period", "Discoverability starting the clock, tolling stopping "
        "it, and the ultimate period that ends exposure regardless", width=WID)
def limitation_period() -> Fig:
    f = vcard("The clock starts on discovery, not on the accident",
              ["Basic: 2 years from discovery",
               "Ultimate: 15 years from the act"])

    y = 166
    f.arrow(40, y, 330, y, colour="var(--axis)", width=1.2)
    for x, lab in ((52, "act"), (128, "discovery"), (232, "2 years"),
                   (312, "15 years")):
        f.line(x, y - 5, x, y + 5, cls="tick")
        f.text(x, y + 20, lab, cls="sm dim")
    f.rect(128, y - 22, 104, 16, rx=3, fill=BLUE, fill_opacity="0.45")
    f.text(180, y - 10, "basic period", cls="sm")
    f.rect(52, y - 46, 260, 16, rx=3, fill=VIOLET, fill_opacity="0.30")
    f.text(182, y - 34, "ultimate period", cls="sm")
    f.text(BCX, 104, "two clocks, and the outer one always runs", cls="sm dim")
    f.line(30, 208, 330, 208, cls="rule")
    _bullets(f, 232, ["tolling stops the clock for minors and",
                      "persons under disability",
                      "the limitation period is the IBNR tail —",
                      "lengthen it and reserves rise on business",
                      "already written and long since priced"],
             x=40, gap=24, colour=AMBER)
    f.text(BCX, 366, "Quebec calls it prescription and counts differently",
           cls="sm dim")
    return f


@figure("Prejudgment Interest", "Interest accruing on the heads of damage it "
        "applies to over five and a half years to settlement", width=WID)
def prejudgment_interest() -> Fig:
    f = vcard("Years of delay are paid for at a prescribed rate",
              ["Judgment = Damages × (1 + r t)",
               "$250,000 × 5% × 5.5 = $68,750"])

    f.text(BCX, 102, "a $400,000 award settled 5.5 years on", cls="sm dim")
    for i, (head, amount, gets, colour) in enumerate(
            [("non-pecuniary", 150, True, BLUE),
             ("past income loss", 100, True, TEAL),
             ("future care", 150, False, AMBER)]):
        y = 130 + i * 46
        f.rect(44, y, amount * 1.1, 26, rx=4, fill=colour, fill_opacity="0.45")
        f.text(50, y + 18, f"${amount},000", cls="sm", anchor="start")
        f.text(224, y + 18, "PJI" if gets else "no PJI", cls="sm",
               fill=colour if gets else "var(--dim)", anchor="start")
    f.line(30, 278, 330, 278, cls="rule")
    f.text(BCX, 300, "future losses are already valued as at judgment",
           cls="sm dim")
    f.text(BCX, 316, "— interest runs only on what was already owed",
           cls="sm dim")
    f.text(BCX, 348, "set below market and delay pays; set above it", cls="sm dim")
    f.text(BCX, 364, "and the plaintiff has no reason to settle", cls="sm dim")
    f.text(BCX, 388, "PJI is claim cost — it belongs in the reserve",
           cls="sm dim")
    return f


@figure("Collateral Benefits", "Accident benefits deducted head by head from a "
        "tort award, before contributory negligence and the deductible",
        width=WID)
def collateral_benefits() -> Fig:
    f = vcard("Deducted head by head, not off the total",
              ["Net = damages − deductible benefits",
               "income against income, care against care"])

    f.text(BCX, 100, "$500,000 assessed, by head ($000)", cls="sm dim")
    rows = [("income loss", 220, 85, BLUE),
            ("future care", 130, 40, TEAL),
            ("non-pecuniary", 150, 0, AMBER)]
    for i, (head, gross, offset, colour) in enumerate(rows):
        y = 124 + i * 56
        f.text(44, y, head, cls="sm", anchor="start")
        f.rect(44, y + 8, gross * 0.92, 22, rx=3, fill=colour,
               fill_opacity="0.40")
        if offset:
            f.rect(44 + (gross - offset) * 0.92, y + 8, offset * 0.92, 22, rx=3,
                   fill=ROSE, fill_opacity="0.55")
            f.text(44 + (gross - offset / 2) * 0.92, y + 24, f"−{offset}",
                   cls="sm")
        f.text(44 + gross * 0.92 + 8, y + 24, f"{gross}", cls="sm dim",
               anchor="start")
    f.text(BCX, 302, "the red is the accident benefit already paid",
           cls="sm", fill=ROSE)
    f.text(BCX, 332, "then contributory negligence, then the tort", cls="sm dim")
    f.text(BCX, 348, "deductible on the non-pecuniary head — in that order",
           cls="sm dim")
    f.text(BCX, 378, "where a benefit is not deducted, its payer subrogates",
           cls="sm dim")
    return f


@figure("Tort Litigation", "A bodily injury award built head by head, then reduced "
        "for contributory negligence and benefits received", width=WID)
def tort_litigation() -> Fig:
    f = vcard("Four elements to prove, then two reductions",
              ["Damages = pecuniary + non-pecuniary",
               "duty · breach · causation · damage"])

    _flow(f, 106, ["duty", "breach", "cause", "damage"],
          colours=[BLUE, BLUE, BLUE, BLUE], h=24)
    f.text(BCX, 138, "fail any one and the claim fails entirely", cls="sm dim")
    f.line(30, 158, 330, 158, cls="rule")
    f.text(BCX, 180, "then the arithmetic", cls="sm dim")
    _waterfall(f, 318,
               [("income", 1366.6, BLUE), ("care", 300.0, TEAL),
                ("pain", 180.0, AMBER), ("−20%", -369.3, ROSE),
                ("−AB", -95.0, ROSE), ("paid", None, GREEN)],
               x0=36, x1=326, top=112, bar_frac=0.62,
               fmt=lambda v: f"{abs(v)/1000:.2f}M" if abs(v) >= 1000
               else f"{abs(v):,.0f}k")
    f.text(BCX, 358, "the non-pecuniary head is capped by the 1978 trilogy",
           cls="sm dim")
    f.text(BCX, 380, "and costs follow the event, which deters weak claims",
           cls="sm dim")
    return f


@figure("Tort Reform", "A reform's saving arriving at once and eroding as the "
        "courts and the bar adapt to it", width=WID)
def tort_reform() -> Fig:
    f = vcard("The saving is real, and it decays",
              ["Reform lowers premium by lowering",
               "compensation — say so plainly"])

    ax = vaxes(f, 0, 10, 60, 108, left=44, right=16, top=28, bottom=134)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.polyline([(0, 100), (2.9, 100)], colour=BLUE, width=2.4)
    ax.polyline([(3, 100), (3, 74)], colour=ROSE, width=2.4)
    ax.polyline([(3, 74), (6, 82), (10, 94)], colour=AMBER, width=2.4)
    ax.vline(3, colour=ROSE, dash=True)
    ax.label(3, 105, "reform", cls="sm bold", fill=ROSE, dy=-4)
    ax.label(7.4, 78, "erosion", cls="sm bold", fill=AMBER)
    ax.label(1.4, 94, "cost", cls="sm dim")
    f.text(BCX, ax.y1 + 22, "years since the reform", cls="sm dim")
    f.line(30, 282, 330, 282, cls="rule")
    _bullets(f, 302, ["restrict access — threshold, deductible",
                      "cap damages by category",
                      "shorten limitation, cut expert evidence",
                      "coordinate with the accident benefit"],
             x=40, gap=24, colour=TEAL)
    return f


@figure("Class Action", "Many uneconomic claims aggregated into one action, "
        "gated by certification", width=WID)
def class_action() -> Fig:
    f = vcard("Certification is the whole exposure",
              ["Many small claims → one action",
               "binding everyone who does not opt out"])

    for i in range(12):
        f.circle(52 + (i % 6) * 20, 110 + (i // 6) * 22, 6, fill=BLUE,
                 fill_opacity="0.55")
    f.arrow(178, 122, 216, 122, colour="var(--dim)", width=1.4)
    f.chip(276, 122, "one action", colour=VIOLET, w=104, h=28)
    f.text(BCX, 162, "each claim is too small to litigate alone", cls="sm dim")
    f.line(30, 184, 330, 184, cls="rule")
    f.text(BCX, 206, "certification asks four questions", cls="sm bold")
    _bullets(f, 230, ["an identifiable class",
                      "common issues",
                      "a suitable representative",
                      "preferable to individual actions"],
             x=44, gap=24, colour=AMBER)
    f.text(BCX, 340, "reserving is binary around that decision, and", cls="sm dim")
    f.text(BCX, 356, "the exposure is to a practice, not to an event —", cls="sm dim")
    f.text(BCX, 372, "so it does not develop like an ordinary claim",
           cls="sm dim")
    return f


@figure("Structured Settlement", "A lump sum against the annuity that replaces it, "
        "and why the tax exemption makes the annuity cheaper", width=WID)
def structured_settlement() -> Fig:
    f = vcard("The tax exemption pays for the discount",
              ["Annuity cost < equivalent lump sum",
               "$900,000 buys $52,000 a year for 30"])

    _columns(f, 104, ["Lump sum", "Structure"],
             [["costs $1,000,000", "invested at 5%,", "taxed at 40%",
               "spends $51k a year"],
              ["costs $900,000", "paid by annuity,", "tax-free",
               "spends $52k a year"]],
             x0=30, x1=330, row_h=22, colours=(AMBER, GREEN))
    f.text(BCX, 250, "the claimant does better and the insurer", cls="sm dim")
    f.text(BCX, 266, "pays $100,000 less for it", cls="sm dim")
    f.line(30, 292, 330, 292, cls="rule")
    f.text(BCX, 314, "the casualty insurer stays liable if the life",
           cls="sm dim")
    f.text(BCX, 330, "insurer defaults, so the claim never fully closes",
           cls="sm dim")
    f.text(BCX, 356, "CRA's conditions: the insurer owns the annuity,",
           cls="sm dim")
    f.text(BCX, 372, "it is non-assignable, non-commutable and irrevocable",
           cls="sm dim")
    return f


# ═══════════════════════════════════════════════════════════════════════════
# B. Canadian government and industry insurance programs
# ═══════════════════════════════════════════════════════════════════════════

@figure("Agricultural Insurance", "The four business risk management programs "
        "layered by the size of the income decline each answers", width=WID)
def agricultural_insurance() -> Fig:
    f = vcard("Four programs stacked by the size of the loss",
              ["AgriInvest → AgriStability → AgriInsurance",
               "→ AgriRecovery, as the loss grows"])

    rows = [("AgriRecovery", "disaster response", ROSE),
            ("AgriInsurance", "yield loss, insured peril", AMBER),
            ("AgriStability", "margin decline", TEAL),
            ("AgriInvest", "matched savings", GREEN)]
    for i, (name, sub, colour) in enumerate(rows):
        y = 100 + i * 46
        w = 168 + i * 40
        f.rect(44 + (272 - w) / 2, y, w, 38, rx=6, fill=colour,
               fill_opacity="0.20", stroke=colour, stroke_width="1.2")
        f.text(BCX, y + 16, name, cls="sm bold")
        f.text(BCX, y + 30, sub, cls="sm dim")
    f.text(BCX, 306, "premiums are cost-shared federally and", cls="sm dim")
    f.text(BCX, 322, "provincially, and delivered by crown agencies",
           cls="sm dim")
    f.text(BCX, 350, "one drought hits every farm at once, so the law",
           cls="sm dim")
    f.text(BCX, 366, "of large numbers never gets going — which is why",
           cls="sm dim")
    f.text(BCX, 382, "no private market forms without the subsidy",
           cls="sm dim")
    return f


@figure("Employment Insurance", "The 55% benefit rate against the maximum "
        "insurable earnings ceiling, and who pays the premium", width=WID)
def employment_insurance() -> Fig:
    f = vcard("55% of earnings, up to a ceiling",
              ["Weekly benefit = 0.55 × insurable earnings",
               "employer pays 1.4 × the employee rate"])

    ax = vaxes(f, 0, 100, 0, 60, left=48, right=16, top=28, bottom=150)
    ax.frame(xticks=[], yticks=[], arrows=True)
    ax.polyline([(0, 0), (66, 36), (100, 36)], colour=BLUE, width=2.4)
    ax.vline(66, colour=ROSE, y_top=36)
    ax.label(66, 44, "ceiling", cls="sm bold", fill=ROSE)
    ax.label(30, 22, "55%", cls="sm bold", fill=BLUE, dy=-4)
    ax.label(86, 30, "flat", cls="sm dim")
    f.text(BCX, ax.y1 + 22, "insurable earnings", cls="sm dim")
    f.text(BCX - 90, ax.y0 - 14, "weekly benefit", cls="sm dim", anchor="start")
    f.line(30, 272, 330, 272, cls="rule")
    _bullets(f, 294, ["compulsory — the archetypal adverse selection risk",
                      "moral hazard is the design problem: replace too",
                      "much for too long and return-to-work slows",
                      "and no experience rating, unlike workers' comp"],
             x=38, gap=24, colour=AMBER)
    return f


@figure("Flood Insurance", "The share of homes that are insurable, and the "
        "high-risk tail that still is not", width=WID)
def flood_insurance() -> Fig:
    f = vcard("Priced at last — except at the top of the risk",
              ["Overland water, not sewer backup",
               "and not plumbing that let go inside"])

    f.text(BCX, 104, "Canadian homes, by flood risk", cls="sm dim")
    cs = _hbar(f, 142, [(0.80, "insurable", GREEN), (0.14, "", AMBER),
                        (0.06, "", ROSE)], x0=40, x1=320, height=34)
    f.text(320, 176, "priced high", cls="sm", fill=AMBER, anchor="end")
    f.text(320, 192, "uninsurable", cls="sm", fill=ROSE, anchor="end")
    f.line(30, 208, 330, 208, cls="rule")
    _columns(f, 222, ["Why it was", "What changed"],
             [["uninsurable:", "one event hits", "every house,", "and the buyer",
               "knows the risk"],
              ["flood mapping,", "cat models,", "2013 Alberta", "and 2013",
               "Toronto"]],
             x0=30, x1=330, row_h=20, head_h=24, colours=(ROSE, GREEN))
    f.text(BCX, 366, "disaster assistance after every flood is moral hazard",
           cls="sm dim")
    f.text(BCX, 382, "at the land-use level — it pays people to rebuild there",
           cls="sm dim")
    return f


@figure("Guaranty Funds", "A failed insurer's shortfall assessed on the surviving "
        "members by market share, after the fact", width=WID)
def guaranty_funds() -> Fig:
    f = vcard("The survivors pay, in proportion to market share",
              ["Assessment = shortfall × premium share",
               "levied after the failure, not before"])

    f.chip(BCX, 104, "insurer fails — shortfall", colour=ROSE, w=220, h=28)
    for i, (name, share, colour) in enumerate(
            [("A 40%", 0.40, BLUE), ("B 30%", 0.30, TEAL),
             ("C 20%", 0.20, AMBER), ("D 10%", 0.10, GREEN)]):
        cx = 64 + i * 77
        f.arrow(BCX, 120, cx, 152, colour="var(--dim)", width=1.1)
        h = 22 + share * 110
        f.rect(cx - 26, 196 - h, 52, h, rx=4, fill=colour, fill_opacity="0.55")
        f.text(cx, 214, name, cls="sm dim")
    f.text(BCX, 240, "none of them chose the failed insurer's risk",
           cls="sm dim")
    f.line(30, 262, 330, 262, cls="rule")
    _bullets(f, 284, ["post-assessment: the fund holds little standing cash",
                      "coverage is capped per claim and per policy",
                      "an annual cap spreads a big failure over years",
                      "and capacity runs out on a very large member"],
             x=36, gap=24, colour=VIOLET)
    return f


@figure("PACICC", "The causes of Canadian insurer failure, in the order PACICC's "
        "own research puts them", width=WID)
def pacicc() -> Fig:
    f = vcard("Pricing and reserves, not investments",
              ["Canada's P&C guaranty fund —",
               "compulsory for every licensed member"])

    f.text(BCX, 100, "why insurers fail, in order", cls="sm dim")
    for i, (cause, w, colour) in enumerate(
            [("inadequate pricing", 146, ROSE),
             ("deficient reserves", 131, ROSE),
             ("rapid growth, new lines", 96, AMBER),
             ("reinsurance failure", 64, AMBER),
             ("catastrophe exposure", 50, TEAL),
             ("investment losses", 29, GREEN)]):
        y = 122 + i * 30
        f.text(40, y + 16, cause, cls="sm", anchor="start")
        f.rect(170, y + 2, w, 18, rx=3, fill=colour, fill_opacity="0.60")
    f.text(BCX, 322, "the last line is the one candidates expect first",
           cls="sm dim")
    f.text(BCX, 350, "second half of the mandate, often forgotten:", cls="sm dim")
    f.text(BCX, 366, "to minimise the cost of failure — which is why", cls="sm dim")
    f.text(BCX, 382, "PACICC argues for early OSFI intervention", cls="sm dim")
    return f


@figure("Health Care Insurance", "What medicare covers and what private insurance "
        "is left to fill, under the five Canada Health Act principles",
        width=WID)
def health_care_insurance() -> Fig:
    f = vcard("Single payer for the core, private for the rest",
              ["Funded from taxation, not from premiums",
               "— and private duplication is barred"])

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
    f = vcard("Compulsory to buy means someone must sell",
              ["Results shared by voluntary market share,",
               "whether or not you service the business"])

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
    f = vcard("A monopoly board, funded by employer assessment",
              ["Assessment = rate per $100 of payroll",
               "× payroll, adjusted by experience"])

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
    f = vcard("Written by the industry, serviced by one carrier",
              ["Member share = voluntary premium",
               "÷ total voluntary premium"])

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
    f = vcard("The risk is ceded; the customer is kept",
              ["Cede the premium and the losses,",
               "keep the relationship and the servicing"])

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
    f = vcard("Five principles, one bargain, 1913",
              ["The worker's tort action, traded for",
               "a guaranteed benefit the employers fund"])

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
    f = vcard("A monopoly buys expense, and sells competition",
              ["BC · Saskatchewan · Manitoba — basic",
               "Quebec — bodily injury only"])

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
    f = vcard("Ottawa's share climbs as the disaster grows",
              ["Federal share rises in steps with",
               "provincial cost per capita"])

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
    f = vcard("Contributions track earnings, benefits track need",
              ["Compulsory · statutory benefit",
               "· contribution by earnings, not by risk"])

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
    f = vcard("Transfer both, or account for it as a deposit",
              ["Insurance risk = underwriting + timing",
               "how much is paid, and when"])

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
    f = vcard("Price the average and the average moves",
              ["E[loss | buys] > E[loss | population]",
               "the buyer knows what the seller does not"])

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
    f = vcard("Behaviour changes because someone else pays",
              ["Ex ante: less care taken",
               "Ex post: more cost incurred"])

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
    f = vcard("Three levels, and only one is the regulator's",
              ["MCT = Capital available",
               "÷ Base solvency buffer"])

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
    f = vcard("One standardised filing, so insurers compare",
              ["Statements + exhibits + MCT",
               "+ the Appointed Actuary's opinion"])

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


@figure("Appointed Actuary", "The Appointed Actuary's four statutory duties, and "
        "the escalation that ends at OSFI", width=WID)
def appointed_actuary() -> Fig:
    f = vcard("Appointed by the board, not by management",
              ["Value · opine · report on condition",
               "· escalate a material adverse matter"])

    _bullets(f, 106, ["value the liabilities (ICA s. 365)",
                      "give the Statement of Actuarial Opinion",
                      "report on financial condition — the FCT",
                      "document the valuation in the AA's Report"],
             x=38, gap=26, colour=BLUE)
    f.line(30, 216, 330, 216, cls="rule")
    f.text(BCX, 238, "and when something is materially wrong", cls="sm bold")
    _flow(f, 272, ["CEO, CFO", "directors", "OSFI"],
          colours=[TEAL, AMBER, ROSE], h=26)
    f.text(BCX, 310, "the dual accountability is the whole difficulty:",
           cls="sm dim")
    f.text(BCX, 326, "an employee, paid by the company, who owes a", cls="sm dim")
    f.text(BCX, 342, "duty that can run against it", cls="sm dim")
    f.text(BCX, 370, "removable only by the directors, and OSFI is told",
           cls="sm dim")
    f.text(BCX, 386, "— which is what makes the protection real", cls="sm dim")
    return f


@figure("Insurance Companies Act", "The sections of the ICA that create and "
        "protect the Appointed Actuary's role", width=WID)
def insurance_companies_act() -> Fig:
    f = vcard("The statute that makes the actuary's role real",
              ["s. 357 appoint · s. 365 value",
               "s. 361 immunity · s. 515 adequate capital"])

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
    f = vcard("Equity is where capital available starts",
              ["Assets = Liabilities + Equity",
               "$1,240M = $980M + $260M"])

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
    f = vcard("Underwriting and investment, kept apart",
              ["Net income = (ISR + financial + other)",
               "× (1 − tax)"])

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
    f = vcard("Everything but transactions with shareholders",
              ["Comprehensive income = net income + OCI",
               "$39M − $14M = $25M"])

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
    f = vcard("The audit trail from opening equity to closing",
              ["Close = open + comprehensive income",
               "− dividends + capital transactions"])

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
    f = vcard("Eleven months is too long to wait",
              ["A reduced annual return: statements,",
               "the MCT, and the key exhibits"])

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
    f = vcard("Where you find out what the numbers mean",
              ["Judgement-heavy measurement ⇒",
               "the notes carry the comparability"])

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
    f = vcard("One filing, one instruction set, comparable ratios",
              ["Combined = (claims + expenses)",
               "÷ earned premium — 64% + 31% = 95%"])

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
    f = vcard("Parliament pointed at the profession's own rules",
              ["ICA s. 365: value in accordance with",
               "accepted actuarial practice in Canada"])

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
    f = vcard("One current-value model, in force since 2023",
              ["Insurance contract liability = LRC + LIC",
               "future service, and claims already incurred"])

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
    f = vcard("Two halves that share nothing but a total",
              ["ICL = LRC + LIC",
               "$190M + $450M = $640M"])

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
    f = vcard("Premium not yet earned, less what buying it cost",
              ["LRC = premiums − acquisition amortised",
               "− revenue recognised"])

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
    f = vcard("Reserving's new name, and its two pieces",
              ["LIC = PV(expected cash flows) + RA",
               "$420M + $30M = $450M"])

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
    f = vcard("What it will cost to discharge the obligation",
              ["FCF = PV(E[cash flows]) + RA",
               "the insurer's own view, not an exit price"])

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
    f = vcard("Entity-specific, and the confidence level is disclosed",
              ["RA = what the insurer requires for",
               "bearing non-financial uncertainty"])

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
    f = vcard("Two ways to build it, and they need not agree",
              ["r = risk-free + illiquidity premium",
               "or asset yield − credit − market risk"])

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
    f = vcard("Unearned profit, released as coverage is given",
              ["CSM₀ = PV(inflows) − PV(outflows) − RA",
               "$60M − $44M − $5M = $11M"])

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
    f = vcard("The default model: cash flows, risk, profit",
              ["Liability = PV(cash flows) + RA + CSM",
               "and all three are remeasured each period"])

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
    f = vcard("Unearned premium, in IFRS 17 clothing",
              ["LRC = premium − acquisition",
               "− revenue recognised"])

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
    f = vcard("It ends where full repricing begins",
              ["In boundary ⟺ the insurer cannot",
               "reprice fully for the risk"])

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
    f = vcard("Measured in groups — never as a whole book",
              ["Group = portfolio ∩ annual cohort",
               "∩ profitability bucket"])

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
    f = vcard("The driver chooses when the profit appears",
              ["Released = CSM × units this period",
               "÷ total units remaining"])

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
    f = vcard("A loss is taken now; a profit is deferred",
              ["Onerous ⟺ PV(outflows) + RA",
               "> PV(inflows)"])

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
    f = vcard("The half of the LRC that never becomes revenue",
              ["LRC = remaining coverage",
               "+ loss component"])

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
    f = vcard("No deferred acquisition asset any more",
              ["They reduce the LRC instead —",
               "$24M premium less $4.8M of them"])

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
    f = vcard("Built from what was released, not from premium",
              ["Revenue = expected claims + RA released",
               "+ CSM released + acquisition"])

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
    f = vcard("Past service here; the discount effect elsewhere",
              ["Claims + acquisition amortised",
               "+ onerous losses — and nothing financial"])

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
    f = vcard("Underwriting, with every financial effect stripped out",
              ["ISR = revenue − service expenses",
               "− net reinsurance expense"])

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
    f = vcard("Two effects, one predictable and one not",
              ["IFIE = unwind of discount",
               "+ effect of rate changes"])

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
    f = vcard("Same total, different line",
              ["Profit keeps the locked-in unwind;",
               "OCI takes the rate change"])

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
    f = vcard("A hierarchy, not a menu",
              ["Full retrospective, unless impracticable",
               "— then modified retrospective or fair value"])

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
    f = vcard("Reinsurance assumed is insurance issued",
              ["Liability = LRC + LIC, as always",
               "— it is held reinsurance that is the asset"])

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
    f = vcard("Three prescribed margins, replaced by one judgement",
              ["Old: best estimate × (1 + MfADs)",
               "New: fulfilment cash flows + one RA"])

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
    f = vcard("Everything turns on the risk transfer test",
              ["No significant risk transfer",
               "⇒ deposit accounting"])

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
    f = vcard("An asset bought at more than it will recover",
              ["Asset = PV(recoveries) − PV(premiums)",
               "+ RA + CSM"])

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
    f = vcard("Credit follows the regulator's reach",
              ["Registered ⇒ full capital credit",
               "for the ceded liabilities"])

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
    f = vcard("Credit stops where the collateral stops",
              ["Credit = min(ceded liabilities,",
               "acceptable collateral)"])

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
    f = vcard("The reinsurer's result barely moves — so it is a loan",
              ["Reinsurer's outcome ≈ fee",
               "+ investment margin"])

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
    f = vcard("Cash today, and the tail comes home",
              ["Price ≈ PV(future recoveries)",
               "± who wants out more"])

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
    f = vcard("One ratio, and three lines it has to clear",
              ["MCT = capital available",
               "÷ base solvency buffer = 104.6%"])

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
    f = vcard("Only what would actually absorb a loss",
              ["Available = category A + B − deductions",
               "$260M equity − $12M = $248M"])

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
    f = vcard("Four margins, less one credit",
              ["CR = insurance + market + credit",
               "+ operational − diversification"])

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
    f = vcard("The multiplier that the ratio is measured against",
              ["BSB = 1.5 × capital required",
               "1.5 × $158M = $237M"])

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
    f = vcard("The largest margin, and it grows with volume",
              ["Insurance = claim liabilities",
               "+ premium liabilities + catastrophe"])

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
    f = vcard("Interest rate risk is measured on the mismatch",
              ["Market = interest + equity",
               "+ real estate + currency"])

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
    f = vcard("Cede the insurance risk, take on credit risk",
              ["Credit = factors × exposure,",
               "by counterparty type and quality"])

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
    f = vcard("A charge on volume — and on growth",
              ["Operational ≈ f(premiums,",
               "liabilities, growth)"])

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
    f = vcard("A hurricane and a market crash are not the same event",
              ["Credit applies between insurance",
               "and market risk — and nothing else"])

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
    f = vcard("Hold resources for the 1-in-500 year event",
              ["Requirement = PML₁/₅₀₀ − reinsurance",
               "− other financial resources"])

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
    f = vcard("A percentile of a modelled distribution",
              ["PML(p) = VaR at return period p",
               "1-in-500 = 0.2% in any one year"])

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
    f = vcard("150% is where OSFI expects you to operate",
              ["Supervisory target 150%",
               "Minimum 100%"])

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
    f = vcard("Your own target, from your own scenarios",
              ["Internal > 150% supervisory",
               "— set by ORSA, tested by FCT"])

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
    f = vcard("Severe but plausible — and it has to change something",
              ["Sensitivity → scenario → reverse",
               "one variable, a coherent set, then failure"])

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
    f = vcard("Start at failure and search backwards",
              ["Forward: what if X happens?",
               "Reverse: what would have to happen?"])

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
    f = vcard("The first impact is never the whole cost",
              ["Model the ripples — and the realistic",
               "management actions against them"])

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
    f = vcard("The board's statement, made operational",
              ["Appetite ≤ capacity",
               "how much of what you could bear, you will"])

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
    f = vcard("Exposures that look separate and are not",
              ["Diversification is the assumption —",
               "concentration is its failure"])

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
    f = vcard("Two risks, and the past no longer predicts either",
              ["Physical: acute and chronic",
               "Transition: policy, technology, litigation"])

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
    f = vcard("A published opinion, and it feeds back",
              ["A- is the common commercial threshold",
               "— below it, the business goes elsewhere"])

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
    f = vcard("Canada uses both, and on purpose",
              ["Rules say how; principles say what",
               "— the MCT under ORSA, FCT and B-15"])

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
    f = vcard("Does the standard formula fit this insurer?",
              ["The insurer's own view of required capital",
               "— and the internal target it implies"])

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
    f = vcard("Satisfactory means both tests pass",
              ["Base ≥ supervisory target",
               "Every adverse scenario ≥ minimum"])

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
    f = vcard("The international benchmark for the Canadian regime",
              ["Ratio = own funds ÷ SCR",
               "SCR = 99.5% VaR over one year"])

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
    f = vcard("An opinion on the amount carried, not on your own estimate",
              ["Does the reported liability make",
               "appropriate provision for the obligations?"])

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
    f = vcard("Detailed enough for another actuary to redo it",
              ["Data · methods · assumptions · results",
               "· sensitivity · subsequent events"])

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
    f = vcard("Binding practice, and principles rather than a recipe",
              ["General + practice-specific standards",
               "— compliance is mandatory for members"])

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
    f = vcard("A judgement for the purpose, not a percentage",
              ["Would this change a user's decision?",
               "— chosen, applied consistently, disclosed"])

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
    f = vcard("Evidence of what was already true, or a new fact?",
              ["Evidence at the valuation date → adjust",
               "A new condition after it → disclose"])

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
    f = vcard("Wrong model, wrong data, or wrongly used",
              ["Model error · input error · use error",
               "— and the last is the one that travels"])

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
    f = vcard("No new premium to spread the overhead across",
              ["Every claim still has to be handled",
               "— to the last one, with no new business"])

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
    f = vcard("Not binding, and you will be asked why you ignored it",
              ["It illustrates accepted practice —",
               "it does not define it"])

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
    f = vcard("Escalate, one step at a time",
              ["CEO and CFO → directors → OSFI",
               "on any material adverse effect"])

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
    f = vcard("Independent challenge — and the opinion stays yours",
              ["A reviewer's concurrence is not a defence",
               "for an opinion that was wrong"])

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
    f = vcard("Mutual reliance, and neither replaces the other",
              ["The auditor opines on the statements;",
               "the actuary on the liabilities"])

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
    f = vcard("Oversight that can actually say no",
              ["Three lines: own it · challenge it",
               "· audit it — and a board that challenges"])

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
