#!/usr/bin/env python3
"""
load_benchmarks.py — load the Research benchmark rows into Supabase.

This is the canonical, repeatable way to push benchmark data to the live
database. It reads the same committed CSVs as generate_benchmark_seed.py
(scripts/benchmark_seed.csv + the generated scripts/osfi_benchmark_rows.csv),
builds the identical documents + metrics via that script's SHARED row-builders,
and upserts them through Supabase's PostgREST API with the service-role key.

Why a loader instead of just a migration: one quarter of a handful of insurer
groups is already ~300 rows. Across 2020–2025 and the full set of material
personal-lines insurers that becomes tens of thousands — far too many to keep
shipping as INSERT statements in a tracked migration file. Migrations stay for
schema + the small fresh-DB bootstrap; bulk/refreshable benchmark data comes
through here. The operation is idempotent (documents upsert on their unique url;
each document's metrics are deleted then re-inserted), so re-running after an ETL
refresh just reconciles the data.

Environment (service-side secrets — NOT VITE_*):
    SUPABASE_URL                 e.g. https://xxxx.supabase.co  (or VITE_SUPABASE_URL)
    SUPABASE_SERVICE_ROLE_KEY    service-role key (bypasses RLS; keep secret)

Usage:
    python3 scripts/load_benchmarks.py --dry-run   # show what would change, no network
    python3 scripts/load_benchmarks.py             # upsert into Supabase
"""

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import generate_benchmark_seed as gen  # noqa: E402  (shared row-builders)

METRIC_BATCH = 500  # PostgREST insert chunk size


def env_url():
    url = os.environ.get("SUPABASE_URL") or os.environ.get("VITE_SUPABASE_URL")
    if not url:
        sys.exit("load_benchmarks: set SUPABASE_URL (or VITE_SUPABASE_URL)")
    return url.rstrip("/")


def env_key():
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not key:
        sys.exit("load_benchmarks: set SUPABASE_SERVICE_ROLE_KEY (service-role, server-side secret)")
    return key


def request(method, url, key, body=None, prefer=None):
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
    }
    if prefer:
        headers["Prefer"] = prefer
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, resp.read().decode()
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode(errors="replace")
        sys.exit(f"load_benchmarks: {method} {url} -> {exc.code}\n{detail}")


def chunked(seq, n):
    for i in range(0, len(seq), n):
        yield seq[i:i + n]


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--dry-run", action="store_true",
                    help="print what would be loaded without calling Supabase")
    args = ap.parse_args()

    rows = gen.read_rows()
    gen.validate(rows)
    docs = gen.build_documents(rows)
    documents = gen.document_rows(docs)
    metrics = gen.metric_rows(rows)
    doc_ids = sorted({d["id"] for d in documents})

    print(f"load_benchmarks: {len(documents)} documents, {len(metrics)} metrics "
          f"({sum(1 for m in metrics if m['province'] or m['line_of_business'])} segmented)")

    if args.dry_run:
        print("load_benchmarks: --dry-run, no changes. Sample metric:")
        if metrics:
            print("  " + json.dumps(metrics[0], ensure_ascii=False))
        return

    base = env_url()
    key = env_key()
    rest = f"{base}/rest/v1"

    # 1. Upsert source documents (idempotent on the unique url).
    request("POST", f"{rest}/research_documents?on_conflict=url", key,
            body=documents, prefer="resolution=merge-duplicates,return=minimal")
    print(f"load_benchmarks: upserted {len(documents)} documents")

    # 2. Clear prior metrics for these documents, then re-insert (idempotent).
    id_filter = ",".join(doc_ids)
    request("DELETE", f"{rest}/research_metrics?document_id=in.({id_filter})", key,
            prefer="return=minimal")
    inserted = 0
    for batch in chunked(metrics, METRIC_BATCH):
        request("POST", f"{rest}/research_metrics", key,
                body=batch, prefer="return=minimal")
        inserted += len(batch)
    print(f"load_benchmarks: inserted {inserted} metrics")


if __name__ == "__main__":
    main()
