#!/usr/bin/env python3
"""
osfi_storage.py — sync raw OSFI dumps with the private Supabase Storage bucket.

The raw quarterly returns (CanadianPC_*.txt, ~18 MB each) are the canonical ETL
inputs but are too large/churny for git. Their durable home is the private
`osfi-raw` Storage bucket (created by supabase/migrations/20260617_*.sql). This
script pushes local dumps up and pulls them back down, so the ETL can run on any
machine — not just the laptop that first downloaded them from OSFI.

Workflow:
    python3 scripts/osfi_storage.py push       # upload data/osfi/*.txt to the bucket
    python3 scripts/osfi_storage.py list       # list dumps in the bucket
    python3 scripts/osfi_storage.py pull        # download dumps into data/osfi/
    python3 scripts/etl_osfi.py                 # then derive osfi_benchmark_rows.csv

Environment (server-side secrets — NOT VITE_*):
    SUPABASE_URL                 (or VITE_SUPABASE_URL)
    SUPABASE_SERVICE_ROLE_KEY    service-role key (bypasses RLS; keep secret)
"""

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DATA_DIR = REPO / "data" / "osfi"
BUCKET = "osfi-raw"
# Only the raw dumps belong in the bucket; the roster/README stay in git.
DUMP_GLOB = "CanadianPC_*.txt"


def env(name, *fallbacks):
    val = os.environ.get(name)
    for fb in fallbacks:
        val = val or os.environ.get(fb)
    if not val:
        sys.exit(f"osfi_storage: set {name}" + (f" (or {', '.join(fallbacks)})" if fallbacks else ""))
    return val


def base_url():
    return env("SUPABASE_URL", "VITE_SUPABASE_URL").rstrip("/")


def key():
    return env("SUPABASE_SERVICE_ROLE_KEY")


def storage_request(method, path, *, body=None, raw=None, content_type="application/json"):
    headers = {"apikey": key(), "Authorization": f"Bearer {key()}"}
    if raw is not None:
        data = raw
        headers["Content-Type"] = "application/octet-stream"
        headers["x-upsert"] = "true"
    elif body is not None:
        data = json.dumps(body).encode()
        headers["Content-Type"] = content_type
    else:
        data = None
    req = urllib.request.Request(f"{base_url()}/storage/v1{path}", data=data,
                                 method=method, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.read()
    except urllib.error.HTTPError as exc:
        sys.exit(f"osfi_storage: {method} {path} -> {exc.code}\n{exc.read().decode(errors='replace')}")


def cmd_push(_args):
    files = sorted(DATA_DIR.glob(DUMP_GLOB))
    if not files:
        sys.exit(f"osfi_storage: no {DUMP_GLOB} in {DATA_DIR}")
    for f in files:
        storage_request("POST", f"/object/{BUCKET}/{f.name}", raw=f.read_bytes())
        print(f"osfi_storage: pushed {f.name} ({f.stat().st_size:,} bytes)")


def cmd_list(_args):
    out = storage_request("POST", f"/object/list/{BUCKET}", body={"prefix": "", "limit": 1000})
    for obj in json.loads(out):
        size = (obj.get("metadata") or {}).get("size", "?")
        print(f"{obj['name']}\t{size}")


def cmd_pull(_args):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    out = storage_request("POST", f"/object/list/{BUCKET}", body={"prefix": "", "limit": 1000})
    names = [o["name"] for o in json.loads(out) if o["name"].endswith(".txt")]
    if not names:
        sys.exit(f"osfi_storage: bucket {BUCKET} has no .txt dumps")
    for name in names:
        data = storage_request("GET", f"/object/{BUCKET}/{name}")
        (DATA_DIR / name).write_bytes(data)
        print(f"osfi_storage: pulled {name} ({len(data):,} bytes)")


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("push", help="upload local data/osfi/*.txt to the bucket")
    sub.add_parser("list", help="list dumps in the bucket")
    sub.add_parser("pull", help="download dumps from the bucket into data/osfi/")
    args = ap.parse_args()
    {"push": cmd_push, "list": cmd_list, "pull": cmd_pull}[args.cmd](args)


if __name__ == "__main__":
    main()
