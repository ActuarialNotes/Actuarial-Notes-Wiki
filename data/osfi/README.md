# OSFI P&C regulatory-return dumps

This directory holds the raw OSFI Property & Casualty regulatory-return dumps that
feed `scripts/etl_osfi.py`. The large `.txt` dumps are **gitignored** (see the
root `.gitignore`) — only the derived, committed CSV
(`scripts/osfi_benchmark_rows.csv`) and the company roster live in git.

## What to put here

Drop the per-quarter Canadian P&C dumps, named as OSFI ships them:

```
CanadianPC_<YYYY>_Q<N>.txt        # premiums, claims, provincial exhibits (PC1/PC2)
CanadianPC_MCT_<YYYY>_Q<N>.txt    # capital adequacy (PC4 / MCT) — for future solvency work
2025_PC_Companies.csv             # company-code → name roster (committed for reference)
```

For a multi-year trend, add as many quarters as you have (the ETL ingests every
`CanadianPC_*.txt` it finds and labels each by the `Qn/yy` header inside the file).
Year-end (Q4) dumps give the cleanest annual comparison.

## Record format (from OSFI's "File layout")

Record 1 is the `Qn/yy` quarter header. Every other record is four tab-separated
fields: `company_code`, `statement` (PC1/PC2/PC4/…), `address`, `value` (CAD '000).
The `address` is a page/row/column coordinate into the return templates — 8 chars =
page(4)+row(2)+col(2), 9 chars = page(4)+row(3)+col(2). The PC1/PC2/PC4 `.xlsx`
templates map those coordinates to line-item meanings.

## Workflow

```bash
# 1. drop dumps here, then derive the benchmark rows:
python3 scripts/etl_osfi.py            # → scripts/osfi_benchmark_rows.csv
# 2. fold them into the seed migration:
python3 scripts/generate_benchmark_seed.py
# 3. commit scripts/osfi_benchmark_rows.csv + the regenerated migration (NOT the .txt)
```
