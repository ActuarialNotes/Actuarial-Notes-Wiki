#!/usr/bin/env python3
"""Make a batch of single-use Pro access keys.

Each key grants Pro for --months to the one account that redeems it on the
Upgrade page (the `redeem-beta-code` edge function, `pro_access_keys` table).
Prints nothing secret to the repo: the keys go to a CSV you keep, and the SQL
inserts only their sha256 hashes.

    python3 scripts/pro_access_keys.py --count 25 --months 3 --batch launch-2026 \\
        --out-dir /path/outside/the/repo

Writes <batch>-keys.csv (the keys — hand these out) and <batch>-insert.sql
(run it in the Supabase SQL editor). Standard library only.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import re
import secrets
from pathlib import Path

# No 0/O, 1/I/L, or U: nothing a reader can mistype off a screen.
ALPHABET = "23456789ABCDEFGHJKMNPQRSTVWXYZ"
GROUPS, GROUP_LEN = 3, 4  # PRO-XXXX-XXXX-XXXX, ~59 bits


def make_key() -> str:
    groups = ("".join(secrets.choice(ALPHABET) for _ in range(GROUP_LEN)) for _ in range(GROUPS))
    return "PRO-" + "-".join(groups)


def key_hash(key: str) -> str:
    """The hash `redeem-beta-code` computes: upper-cased, dashes and spaces removed."""
    normalized = re.sub(r"[\s-]", "", key.upper())
    return hashlib.sha256(normalized.encode()).hexdigest()


def insert_sql(hashes: list[str], months: int, batch: str, expires_at: str | None) -> str:
    expires = f"'{expires_at}'" if expires_at else "NULL"
    rows = ",\n".join(f"  ('{h}', {months}, '{batch}', {expires})" for h in hashes)
    return (
        "INSERT INTO pro_access_keys (code_hash, duration_months, batch, expires_at) VALUES\n"
        f"{rows};\n"
    )


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--count", type=int, default=25)
    p.add_argument("--months", type=int, default=3)
    p.add_argument("--batch", required=True, help="a label for this batch, e.g. launch-2026")
    p.add_argument("--expires-at", help="last date a key can be redeemed (ISO, e.g. 2027-06-30)")
    p.add_argument("--out-dir", type=Path, required=True)
    a = p.parse_args()

    if not re.fullmatch(r"[A-Za-z0-9_-]+", a.batch):
        p.error("--batch may use letters, digits, - and _ only")
    if not 1 <= a.months <= 36:
        p.error("--months must be 1 to 36")

    keys: set[str] = set()
    while len(keys) < a.count:
        keys.add(make_key())
    ordered = sorted(keys)

    a.out_dir.mkdir(parents=True, exist_ok=True)
    csv_path = a.out_dir / f"{a.batch}-keys.csv"
    sql_path = a.out_dir / f"{a.batch}-insert.sql"
    with csv_path.open("w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["key", "months", "batch"])
        w.writerows([k, a.months, a.batch] for k in ordered)
    sql_path.write_text(insert_sql([key_hash(k) for k in ordered], a.months, a.batch, a.expires_at))
    print(f"{len(ordered)} keys -> {csv_path}\nSQL     -> {sql_path}")


if __name__ == "__main__":
    main()
