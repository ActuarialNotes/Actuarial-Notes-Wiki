#!/usr/bin/env python3
"""Pearson VUE's spreadsheet function list → the quiz's exam-day spreadsheet rules.

The CAS sits its exams in Pearson VUE's test driver, whose spreadsheet supports
a published set of functions. Pearson VUE publishes that set as a workbook
comparing it with Excel and Google Sheets ("Athena Spreadsheet Function
Comparison", linked from its CAS page). This script reads the workbook's
"Pearson VUE test driver spreadsheet" column, mechanically, and writes
``quiz/src/data/pearsonVueFunctions.json`` with the file's URL, sha256 and the
date it was read. The quiz's Warn and Enforce rules check formulas against it
(docs/question-spreadsheet.md). Never hand-edit the JSON: re-run this for a new
edition, and the diff is the PR.

    python3 scripts/spreadsheet_functions.py             # download and extract
    python3 scripts/spreadsheet_functions.py --file X    # from a local copy

Needs openpyxl, imported where it is used.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import io
import json
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "quiz" / "src" / "data" / "pearsonVueFunctions.json"
URL = (
    "https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/cas/"
    "Athena-Spreadsheet-Function-Comparison.xlsx"
)
PAGE = "https://www.pearsonvue.com/us/en/cas.html"
SHEET = "Functions"
PEARSON_COLUMN = "Pearson VUE test driver spreadsheet"
EXCEL_COLUMN = "Microsoft Excel"
USER_AGENT = "Mozilla/5.0 (Actuarial Notes spreadsheet rules extract)"


def cell_text(value: object) -> str:
    """A cell as the workbook shows it: TRUE/FALSE are booleans in the file."""
    if value is None:
        return ""
    if isinstance(value, bool):
        return "TRUE" if value else "FALSE"
    return str(value).replace("\xa0", " ").strip()


def is_name(text: str) -> bool:
    """A function name, not the workbook's "-------" for "not offered"."""
    return bool(text) and not text.startswith("-")


def extract(rows: list[tuple]) -> dict:
    """The Pearson VUE column's functions, with each one's category, and the
    Excel (Office 365) functions the Pearson column leaves blank."""
    header = [cell_text(v) for v in rows[0]]
    try:
        pearson = next(i for i, h in enumerate(header) if h.startswith(PEARSON_COLUMN))
        excel = next(i for i, h in enumerate(header) if h.startswith(EXCEL_COLUMN))
    except StopIteration:
        raise SystemExit(f"columns not found in header: {header}")
    pearson_title = header[pearson]
    functions: dict[str, str] = {}
    missing: list[str] = []
    for row in rows[1:]:
        if not any(v is not None for v in row):
            continue
        name = cell_text(row[pearson]) if pearson < len(row) else ""
        category = cell_text(row[0])
        if is_name(name):
            functions[name.upper()] = category
        else:
            other = cell_text(row[excel]) if excel < len(row) else ""
            if is_name(other):
                missing.append(other.upper())
    return {
        "column": pearson_title,
        "functions": sorted(functions),
        "categories": {name: functions[name] for name in sorted(functions)},
        "notInPearsonButInExcel": sorted(set(missing)),
    }


def read_workbook(data: bytes) -> list[tuple]:
    import openpyxl  # noqa: PLC0415 — the one non-stdlib dependency

    wb = openpyxl.load_workbook(io.BytesIO(data), read_only=True)
    return list(wb[SHEET].iter_rows(values_only=True))


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--file", type=Path, help="read a local copy instead of downloading")
    args = ap.parse_args(argv)

    if args.file:
        data = args.file.read_bytes()
    else:
        req = urllib.request.Request(URL, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = resp.read()

    out = {
        "source": {
            "title": "Athena Spreadsheet Function Comparison (Pearson VUE, for CAS exams)",
            "url": URL,
            "page": PAGE,
            "sha256": hashlib.sha256(data).hexdigest(),
            "read": dt.date.today().isoformat(),
        },
        **extract(read_workbook(data)),
    }
    OUT.write_text(json.dumps(out, indent=2) + "\n", encoding="utf-8")
    print(f"{len(out['functions'])} functions → {OUT.relative_to(ROOT)}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
