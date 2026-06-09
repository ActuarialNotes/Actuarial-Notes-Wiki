#!/usr/bin/env python3
"""
generate_benchmark_seed.py — generate the Research benchmark seed migration.

Reads scripts/benchmark_seed.csv (the editable source of truth) and emits
supabase/migrations/20260610_research_benchmark_seed.sql, which:

  1. Inserts one synthetic source-of-record `research_documents` row per unique
     source_url (type annual_report / industry_statistics), with a DETERMINISTIC
     uuid (uuid5 of the url) so re-runs reference the same document.
  2. Deletes any prior seed metrics for those documents, then inserts the
     `research_metrics` rows from the CSV referencing them.

This keeps the provenance-required schema intact — every seeded metric still
points at a real document_id + source_page + source_text — while staying
idempotent (documents upsert on the unique url; metrics are delete-then-insert
scoped to the seed document ids).

IMPORTANT: the figures in benchmark_seed.csv are REPRESENTATIVE starter values
for several insurers/years. Public-company figures (Intact) are grounded in
reported results; others are illustrative. Verify/replace against the cited
source before relying on any value for a real decision, then re-run this script.

Usage:
    python3 scripts/generate_benchmark_seed.py

Re-running is safe and produces a stable diff.
"""

import csv
import re
import sys
import uuid
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
CSV_PATH = REPO / "scripts" / "benchmark_seed.csv"
OUT_PATH = REPO / "supabase" / "migrations" / "20260610_research_benchmark_seed.sql"

# Deterministic namespace so document UUIDs are stable across runs/machines.
NAMESPACE = uuid.uuid5(uuid.NAMESPACE_URL, "actuarial-notes-wiki/research-benchmark-seed")

# Agent slugs seeded in 20260608_research.sql — FK target of every seed row.
KNOWN_AGENTS = {
    "osfi", "fsra", "airb", "amf", "bcfsa", "ibc", "gisa", "icbc",
    "intact-financial", "desjardins-general", "aviva-canada", "td-insurance",
    "cooperators",
}

# Document types valid for synthetic source-of-record rows (subset of the
# document_type enum that makes sense for a benchmark source).
DOC_TYPES = {"annual_report", "quarterly_supplement", "industry_statistics", "md_and_a"}

# Canonical metric_name vocabulary — keep in sync with
# quiz/src/lib/researchMetrics.ts and the edge extract.ts CANONICAL_METRIC_NAMES.
KNOWN_METRICS = {
    "combined_ratio", "loss_ratio", "expense_ratio",
    "mct_ratio", "roe", "premium_growth", "net_written_premium",
}

KNOWN_PROVINCES = {"ON", "AB", "QC", "BC", "NB", "NL", "NS", "PE", "ATL"}
PERIOD_RE = re.compile(r"^(Q[1-4]_\d{4}|FY\d{4})$")


def fail(msg):
    print(f"generate_benchmark_seed: {msg}", file=sys.stderr)
    sys.exit(1)


def sql_str(value):
    """Render a Python value as a SQL string literal (or NULL)."""
    if value is None or value == "":
        return "null"
    return "'" + str(value).replace("'", "''") + "'"


def sql_array(values):
    """Render a list of strings as a Postgres text[] literal (or NULL)."""
    if not values:
        return "null"
    inner = ",".join(v.replace("\\", "\\\\").replace('"', '\\"') for v in values)
    return "'{" + inner + "}'"


def doc_id_for(url):
    return str(uuid.uuid5(NAMESPACE, url))


def read_rows():
    if not CSV_PATH.exists():
        fail(f"missing {CSV_PATH}")
    with CSV_PATH.open(newline="", encoding="utf-8") as fh:
        # Allow '#'-prefixed comment/banner lines in the CSV.
        lines = [ln for ln in fh if not ln.lstrip().startswith("#")]
    rows = list(csv.DictReader(lines))
    if not rows:
        fail("no data rows in benchmark_seed.csv")
    return rows


def validate(rows):
    for i, r in enumerate(rows, start=1):
        if r["agent_id"] not in KNOWN_AGENTS:
            fail(f"row {i}: unknown agent_id {r['agent_id']!r}")
        if r["doc_type"] not in DOC_TYPES:
            fail(f"row {i}: unsupported doc_type {r['doc_type']!r}")
        if not PERIOD_RE.match(r["period"]):
            fail(f"row {i}: bad period {r['period']!r} (expected Qn_YYYY or FYYYYY)")
        if r["metric_name"] not in KNOWN_METRICS:
            fail(f"row {i}: unknown metric_name {r['metric_name']!r}")
        prov = r.get("province", "").strip()
        if prov and prov not in KNOWN_PROVINCES:
            fail(f"row {i}: unknown province {prov!r}")
        try:
            float(r["value"])
            int(r["source_page"])
            float(r["confidence"])
        except (ValueError, KeyError) as exc:
            fail(f"row {i}: bad numeric field ({exc})")
        if not r.get("source_text", "").strip():
            fail(f"row {i}: empty source_text")


def build_documents(rows):
    """One research_documents row per unique source_url."""
    docs = {}
    for r in rows:
        url = r["source_url"]
        if url not in docs:
            provinces = []
            prov = r.get("province", "").strip()
            if prov and prov != "ATL":
                provinces = [prov]
            docs[url] = {
                "id": doc_id_for(url),
                "agent_id": r["agent_id"],
                "type": r["doc_type"],
                "title": r["source_title"],
                "published_at": r["published_at"],
                "url": url,
                "provinces": provinces,
            }
    return docs


def render(rows, docs):
    seed_ids = sorted({d["id"] for d in docs.values()})
    out = []
    out.append("-- Research benchmark seed — GENERATED by scripts/generate_benchmark_seed.py.")
    out.append("-- Do not edit by hand; edit scripts/benchmark_seed.csv and regenerate.")
    out.append("--")
    out.append("-- Seeds synthetic source-of-record documents + curated benchmark metrics so")
    out.append("-- the Benchmarks tab has real numbers to show. Figures are REPRESENTATIVE")
    out.append("-- starter values — verify against the cited source before relying on them.")
    out.append("")
    out.append("-- Synthetic source documents (idempotent on the unique url).")
    out.append(
        "insert into research_documents "
        "(id, agent_id, type, title, published_at, url, "
        "jurisdiction_provinces, extraction_confidence, is_in_review, summary)"
    )
    out.append("values")
    doc_values = []
    for d in sorted(docs.values(), key=lambda x: (x["agent_id"], x["url"])):
        summary = f"Source-of-record for seeded benchmark metrics ({d['title']})."
        doc_values.append(
            "  ("
            f"{sql_str(d['id'])}, {sql_str(d['agent_id'])}, {sql_str(d['type'])}, "
            f"{sql_str(d['title'])}, {sql_str(d['published_at'])}, {sql_str(d['url'])}, "
            f"{sql_array(d['provinces'])}, 1, false, {sql_str(summary)})"
        )
    out.append(",\n".join(doc_values))
    out.append("on conflict (url) do nothing;")
    out.append("")
    out.append("-- Clear any prior seed metrics, then insert the curated set (idempotent).")
    id_list = ", ".join(sql_str(i) for i in seed_ids)
    out.append(f"delete from research_metrics where document_id in ({id_list});")
    out.append("")
    out.append(
        "insert into research_metrics "
        "(document_id, agent_id, metric_name, value, unit, period, province, "
        "source_page, source_text, confidence)"
    )
    out.append("values")
    metric_values = []
    for r in rows:
        doc_id = doc_id_for(r["source_url"])
        prov = r.get("province", "").strip()
        metric_values.append(
            "  ("
            f"{sql_str(doc_id)}, {sql_str(r['agent_id'])}, {sql_str(r['metric_name'])}, "
            f"{float(r['value'])}, {sql_str(r['unit'])}, {sql_str(r['period'])}, "
            f"{sql_str(prov)}, {int(r['source_page'])}, {sql_str(r['source_text'])}, "
            f"{float(r['confidence'])})"
        )
    out.append(",\n".join(metric_values))
    out.append(";")
    out.append("")
    return "\n".join(out)


def main():
    rows = read_rows()
    validate(rows)
    docs = build_documents(rows)
    sql = render(rows, docs)
    OUT_PATH.write_text(sql, encoding="utf-8")
    print(
        f"generate_benchmark_seed: wrote {OUT_PATH.relative_to(REPO)} "
        f"({len(docs)} documents, {len(rows)} metrics)"
    )


if __name__ == "__main__":
    main()
