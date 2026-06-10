#!/usr/bin/env python3
"""
etl_osfi.py — derive segmented Personal P&C benchmark rows from OSFI returns.

OSFI publishes the quarterly P&C regulatory returns of every federally
regulated insurer as flat, tab-separated dumps (`CanadianPC_<YYYY>_Q<N>.txt`).
Each record is `company_code <TAB> statement <TAB> address <TAB> value`, where
`address` is a page/row/column coordinate into the PC1/PC2 return templates
(see scripts' sibling note and OSFI's "File layout" description). The value is
in thousands of CAD.

This script reads those dumps from a local (gitignored) directory and emits
`scripts/osfi_benchmark_rows.csv` — a GENERATED, committed CSV that
`generate_benchmark_seed.py` folds into the Research benchmark seed migration
alongside the hand-curated `benchmark_seed.csv`. The raw dumps are large and
NOT committed; only the derived CSV is.

What it extracts — the PC2 "Provincial and Territorial Summaries", which break
each insurer's book down by Class of Insurance (rows) × province (columns):

  - p.67.40  Insurance Revenue            (CONSOLIDATED)  → earned_premium
  - p.67.70  Insurance Service Result     (CONSOLIDATED)  → combined_ratio
  - p.93.30  Premiums Written (direct)    (NON-CONSOL.)   → direct_written_premium

  combined_ratio = (1 − insurance_service_result ÷ insurance_revenue) × 100
  — the IFRS 17 net insurance-service ratio, i.e. claims + attributable
  expenses + net reinsurance over insurance revenue. (OSFI does not split
  claims from expenses by province on these exhibits, so we report the combined
  ratio rather than a separate loss/expense ratio per province.)

Lines of business mapped:
  - personal_auto      ← Private Passenger automobile subtotal
  - personal_property  ← Personal property subtotal (excl. commercial)

Insurer groups: OSFI reports per legal entity, but a market view needs the
GROUP. A single entity is misleading — e.g. TD's main underwriter is Security
National (Meloche Monnex), with TD General carrying only Ontario; Desjardins
writes through Certas + The Personal; etc. GROUP_MAP aggregates the dollar
figures of each group's entities BEFORE computing ratios. Membership is curated
and should be reviewed by someone who knows the group structures — correct it
here and re-run.

Usage:
    # put CanadianPC_<YYYY>_Q<N>.txt files in data/osfi/ first
    python3 scripts/etl_osfi.py
    python3 scripts/generate_benchmark_seed.py   # CSV → SQL migration

Re-running is deterministic and produces a stable diff.
"""

import csv
import glob
import os
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DATA_DIR = REPO / "data" / "osfi"
OUT_PATH = REPO / "scripts" / "osfi_benchmark_rows.csv"

# OSFI values are in thousands of CAD; the metric catalog wants CAD millions.
THOUSANDS_TO_MILLIONS = 1000.0

# Below this insurance-revenue floor (in CAD thousands) a combined ratio is
# noise — e.g. federally-regulated insurers write almost no personal auto in the
# public-monopoly provinces (BC/SK/MB), so a few $M of optional coverage yields a
# meaningless 3-digit ratio. Premium rows are still factual and kept; only the
# ratio is suppressed below the floor.
MIN_REVENUE_FOR_RATIO = 10_000.0  # $10M

# Province column codes on the PC2 provincial exhibits → our province slugs.
# Column 19 is the all-province TOTAL → seeded as a national (province-blank)
# consolidated figure. Manitoba/Saskatchewan/territories are omitted (not in the
# app's province filter); add them here + to KNOWN_PROVINCES to surface them.
PROV_COLS = {
    "06": "ON", "09": "AB", "05": "QC", "10": "BC",
    "03": "NS", "04": "NB", "01": "NL", "02": "PE",
    "19": "",  # all-province total → national consolidated
}

# Line of business → (consolidated-exhibit row code, premiums-written row code).
# Consolidated exhibits (67.40/67.70) use 3-digit row codes; the premiums-written
# exhibit (93.30) uses 2-digit row codes for the same lines.
LOB_ROWS = {
    # private passenger auto subtotal
    "personal_auto": {"consol_row": "119", "pw_row": "14"},
    # personal property subtotal (excludes commercial property)
    "personal_property": {"consol_row": "039", "pw_row": "06"},
}

PAGE_REVENUE = "6740"        # 67.40 Insurance Revenue (consolidated)
PAGE_SERVICE_RESULT = "6770"  # 67.70 Insurance Service Result (consolidated)
PAGE_PREMIUMS_WRITTEN = "9330"  # 93.30 Premiums Written (non-consolidated, direct)

# agent_id (must already exist in 20260608_research.sql) → OSFI company codes.
# Group membership curated from the 2025 P&C company roster; REVIEW before
# relying on market-share figures. belairdirect reports within Intact (A480);
# Sonnet is Definity (not seeded here yet, so excluded). Minor/legacy shells are
# included where they still report personal-lines premium.
GROUP_MAP = {
    "intact-financial": ["A480", "A115", "A522", "A823", "A648", "A639"],
    # Intact, Novex, Jevco, Trafalgar, Pembridge, Pafco
    "desjardins-general": ["A193", "A191", "A650", "A249"],
    # Certas Home & Auto, Certas Direct, The Personal, Verassure
    "aviva-canada": ["A390", "A393", "A820", "A807", "A310", "A685", "A751", "A470"],
    # Aviva ICC, Aviva General, Traders, S&Y, Elite, Pilot, Scottish & York, Nordic
    "td-insurance": ["A760", "A045", "A717", "A635", "A085"],
    # Security National (Meloche Monnex), TD General, TD Home & Auto, TD Direct, Primmum
    "cooperators": ["A252", "A255", "A135", "A740"],
    # Co-operators General, CUMIS, Canadian Northern Shield, Sandbox
}

# The file's own "TOTAL" record = all federally-regulated P&C insurers. Seeded
# as an industry benchmark under the existing `osfi` agent. (Excludes the
# provincial public auto insurers ICBC/SGI/MPI/SAAQ, which OSFI does not regulate.)
INDUSTRY_AGENT = "osfi"
INDUSTRY_CODE = "TOTAL"

OSFI_SOURCE_BASE = (
    "https://www.osfi-bsif.gc.ca/en/data-forms/financial-data/"
    "property-casualty-insurance-companies-financial-data"
)


def fail(msg):
    print(f"etl_osfi: {msg}", file=sys.stderr)
    sys.exit(1)


def parse_period(header):
    """'Q3/25' → 'Q3_2025'."""
    header = header.strip().lstrip("﻿")
    try:
        q, yy = header.split("/")
        q = q.strip().upper()
        year = 2000 + int(yy.strip())
        if q not in ("Q1", "Q2", "Q3", "Q4"):
            raise ValueError
        return f"{q}_{year}"
    except (ValueError, IndexError):
        fail(f"could not parse quarter/year header {header!r}")


def split_address(addr):
    """Return (page, row, col) per OSFI's PC1/PC2 layout (8- or 9-char)."""
    if len(addr) == 9:
        return addr[:4], addr[4:7], addr[7:9]
    if len(addr) == 8:
        return addr[:4], addr[4:6], addr[6:8]
    return None, None, None


def read_dump(path):
    """Parse one CanadianPC dump → (period, {(code,page,row,col): value})."""
    values = {}
    with open(path, encoding="utf-8", errors="replace") as fh:
        period = parse_period(fh.readline())
        for line in fh:
            parts = line.rstrip("\n").split("\t")
            if len(parts) != 4:
                continue
            code, _stmt, addr, val = parts
            page, row, col = split_address(addr)
            if page is None:
                continue
            try:
                values[(code, page, row, col)] = float(val)
            except ValueError:
                continue
    return period, values


def group_sum(values, codes, page, row, col):
    """Sum a coordinate across a group's entity codes (None if all absent)."""
    total = None
    for code in codes:
        v = values.get((code, page, row, col))
        if v is not None:
            total = (total or 0.0) + v
    return total


def rows_for_scope(agent_id, codes, values, period, lob, prov_col, prov_slug):
    """Emit benchmark rows for one agent × line × province from one dump."""
    rows = []
    consol_row = LOB_ROWS[lob]["consol_row"]
    pw_row = LOB_ROWS[lob]["pw_row"]
    scope = f"{prov_slug or 'national'} {lob.replace('_', ' ')}"
    url = f"{OSFI_SOURCE_BASE}#{agent_id}-{period}"
    title = f"OSFI P&C return — {agent_id} ({period})"
    # Best-effort publication date: ~3 months after quarter end.
    q, year = period.split("_")
    pub = {"Q1": f"{year}-06-30", "Q2": f"{year}-09-30",
           "Q3": f"{year}-12-31", "Q4": f"{int(year)+1}-03-31"}[q]
    doc_type = "industry_statistics" if agent_id == INDUSTRY_AGENT else "quarterly_supplement"

    revenue = group_sum(values, codes, PAGE_REVENUE, consol_row, prov_col)
    result = group_sum(values, codes, PAGE_SERVICE_RESULT, consol_row, prov_col)
    dpw = group_sum(values, codes, PAGE_PREMIUMS_WRITTEN, pw_row, prov_col)

    def base(metric, value, unit, text):
        return {
            "agent_id": agent_id, "doc_type": doc_type, "period": period,
            "fiscal_label": title, "source_url": url, "source_title": title,
            "published_at": pub, "metric_name": metric, "value": value,
            "unit": unit, "province": prov_slug, "line_of_business": lob,
            "source_page": 6740, "source_text": text, "confidence": 0.9,
        }

    members = "+".join(codes) if agent_id != INDUSTRY_AGENT else "all federally-regulated P&C"
    if revenue and revenue > 0:
        rows.append(base(
            "earned_premium", round(revenue / THOUSANDS_TO_MILLIONS, 1), "CAD M",
            f"IFRS 17 insurance revenue, {scope}, OSFI PC2 p.67.40, "
            f"group={members}, YTD {period}.",
        ))
        if result is not None and revenue >= MIN_REVENUE_FOR_RATIO:
            cr = round((1 - result / revenue) * 100, 1)
            row = base(
                "combined_ratio", cr, "%",
                f"Combined ratio = 1 − insurance service result ÷ insurance revenue "
                f"(IFRS 17), {scope}, OSFI PC2 p.67.70/67.40, group={members}, YTD {period}.",
            )
            row["source_page"] = 6770
            rows.append(row)
    if dpw and dpw > 0:
        row = base(
            "direct_written_premium", round(dpw / THOUSANDS_TO_MILLIONS, 1), "CAD M",
            f"Direct premiums written, {scope}, OSFI PC2 p.93.30, "
            f"group={members}, YTD {period}.",
        )
        row["source_page"] = 9330
        rows.append(row)
    return rows


def main():
    dumps = sorted(glob.glob(str(DATA_DIR / "CanadianPC_*.txt")))
    dumps = [d for d in dumps if "_MCT_" not in os.path.basename(d)]
    if not dumps:
        fail(f"no CanadianPC_*.txt dumps found in {DATA_DIR} "
             f"(see this script's docstring; raw dumps are gitignored)")

    all_rows = []
    periods = []
    for path in dumps:
        period, values = read_dump(path)
        periods.append(period)
        groups = list(GROUP_MAP.items()) + [(INDUSTRY_AGENT, [INDUSTRY_CODE])]
        for agent_id, codes in groups:
            for lob in LOB_ROWS:
                for prov_col, prov_slug in PROV_COLS.items():
                    all_rows.extend(
                        rows_for_scope(agent_id, codes, values, period,
                                       lob, prov_col, prov_slug)
                    )

    if not all_rows:
        fail("no benchmark rows produced — check GROUP_MAP codes vs. the dump")

    fields = ["agent_id", "doc_type", "period", "fiscal_label", "source_url",
              "source_title", "published_at", "metric_name", "value", "unit",
              "province", "line_of_business", "source_page", "source_text",
              "confidence"]
    with OUT_PATH.open("w", newline="", encoding="utf-8") as fh:
        fh.write("# osfi_benchmark_rows.csv — GENERATED by scripts/etl_osfi.py.\n")
        fh.write("# Do not edit by hand. Real OSFI P&C regulatory-return figures,\n")
        fh.write("# group-aggregated by province × line. Re-run the ETL to refresh.\n")
        fh.write(f"# Source dumps: {', '.join(os.path.basename(d) for d in dumps)}\n")
        writer = csv.DictWriter(fh, fieldnames=fields)
        writer.writeheader()
        for r in all_rows:
            writer.writerow(r)

    print(f"etl_osfi: wrote {OUT_PATH.relative_to(REPO)} "
          f"({len(all_rows)} rows across periods {sorted(set(periods))})")


if __name__ == "__main__":
    main()
