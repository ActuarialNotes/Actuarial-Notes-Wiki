#!/usr/bin/env python3
"""Published tables → the Actuarial Tools' Data Sources (docs/actuarial-tools.md §4.11).

Each dataset is read mechanically off its publisher's own file — no model and
no hand retypes a number — and written to
``quiz/src/lib/tools/data/datasets/<id>.json`` with, for every file it was read
from, the URL, the sha256 of the bytes read, and the date it was read, plus the
publisher's licence. Re-running it is how a new edition comes in: the diff is
the PR.

    python3 scripts/dataset_extract.py                # every dataset
    python3 scripts/dataset_extract.py bls-cpi        # one
    python3 scripts/dataset_extract.py --offline      # from the cache only

Downloads are cached outside the repo (``--cache``, default
``~/.cache/actuarial-notes/datasets``). Only free-to-reuse sources are here: US
federal works (public domain) and Statistics Canada's Open Licence. A source
whose terms aren't confirmed (the SOA's exam tables, the CAS Loss Reserving
Database, the Bank of Canada's curves) waits — see §14 of the plan.

Stdlib only, but reading an ``.xlsx`` (NCHS's life tables) needs openpyxl,
imported where it is used.
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import hashlib
import io
import json
import os
import sys
import urllib.request
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "quiz" / "src" / "lib" / "tools" / "data" / "datasets"
# BLS refuses scripted downloads without a way to reach whoever runs them.
USER_AGENT = "Actuarial Notes dataset extract (jordan@actuarialnotes.com)"
START = "2000-01"

PUBLIC_DOMAIN = {
    "name": "Public domain (a work of the US federal government)",
    "url": "https://www.usa.gov/government-copyright",
}
STATCAN_LICENCE = {
    "name": "Statistics Canada Open Licence",
    "url": "https://www.statcan.gc.ca/en/reference/licence",
}


# ── Fetching ──────────────────────────────────────────────────────────────────


class Fetcher:
    def __init__(self, cache: Path, offline: bool):
        self.cache = cache
        self.offline = offline
        cache.mkdir(parents=True, exist_ok=True)

    def get(self, url: str) -> tuple[bytes, dict]:
        """The bytes at ``url`` and its provenance record (URL, sha256, date read)."""
        name = hashlib.sha256(url.encode()).hexdigest()[:24]
        path = self.cache / name
        meta_path = self.cache / f"{name}.json"
        if path.exists() and meta_path.exists() and (self.offline or _fresh(meta_path)):
            data = path.read_bytes()
            read = json.loads(meta_path.read_text())["read"]
        else:
            if self.offline:
                raise SystemExit(f"Not cached and --offline: {url}")
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "*/*"})
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = resp.read()
            read = dt.date.today().isoformat()
            path.write_bytes(data)
            meta_path.write_text(json.dumps({"url": url, "read": read}))
        return data, {"url": url, "sha256": hashlib.sha256(data).hexdigest(), "read": read}


def _fresh(meta: Path) -> bool:
    """A cached download from today is reused; anything older is fetched again."""
    return json.loads(meta.read_text())["read"] == dt.date.today().isoformat()


# ── Shared shapes ─────────────────────────────────────────────────────────────


def months_from(start: str, end: str) -> list[str]:
    y, m = map(int, start.split("-"))
    ey, em = map(int, end.split("-"))
    out = []
    while (y, m) <= (ey, em):
        out.append(f"{y:04d}-{m:02d}")
        m += 1
        if m == 13:
            y, m = y + 1, 1
    return out


def aligned(periods: list[str], points: dict[str, float]) -> list[float | None]:
    return [points.get(p) for p in periods]


def write(dataset: dict) -> Path:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"{dataset['id']}.json"
    path.write_text(json.dumps(dataset, ensure_ascii=False, separators=(",", ":")) + "\n")
    return path


# ── NCHS: United States Life Tables ───────────────────────────────────────────

NCHS_REPORT = "https://www.cdc.gov/nchs/data/nvsr/nvsr75/nvsr75-05.pdf"
NCHS_TABLES = {
    "total": "https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/NVSR/75-05/Table01.xlsx",
    "male": "https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/NVSR/75-05/Table02.xlsx",
    "female": "https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/NVSR/75-05/Table03.xlsx",
}


def parse_nchs_table(data: bytes) -> tuple[str, dict[str, list[float]]]:
    """One NCHS life table workbook: its title, and qx, lx, ex by single year of age 0–100."""
    import openpyxl  # noqa: PLC0415 — only this source needs it

    ws = openpyxl.load_workbook(io.BytesIO(data), read_only=True).worksheets[0]
    rows = list(ws.iter_rows(values_only=True))
    title = str(rows[0][0])
    header = [str(c).strip() if c is not None else "" for c in rows[2]]
    col = {name: header.index(name) for name in ("qx", "lx", "ex")}
    out: dict[str, list[float]] = {"qx": [], "lx": [], "ex": []}
    for r in rows[3:]:
        label = r[0]
        if not isinstance(label, str) or not label[:1].isdigit():
            continue
        for key, k in col.items():
            out[key].append(float(r[k]))
    if len(out["qx"]) != 101:
        raise SystemExit(f"Expected ages 0–100 in {title!r}, read {len(out['qx'])}")
    return title, out


def nchs_life_tables(f: Fetcher) -> dict:
    sources, series, titles = [], {}, {}
    for sex, url in NCHS_TABLES.items():
        data, prov = f.get(url)
        title, cols = parse_nchs_table(data)
        sources.append({**prov, "title": title})
        series[sex] = cols
        titles[sex] = title
    year = titles["total"].rsplit(",", 1)[-1].strip()
    return {
        "id": "nchs-us-life-tables",
        "kind": "life_table",
        "title": f"United States Life Tables, {year}",
        "publisher": "National Center for Health Statistics (CDC)",
        "edition": year,
        "report": NCHS_REPORT,
        "licence": PUBLIC_DOMAIN,
        "page": "Resources/Data/United States Life Tables (NCHS).md",
        "sources": sources,
        "ages": list(range(0, 101)),
        "last_age_open": True,
        "sexes": {"total": "Total population", "male": "Males", "female": "Females"},
        "series": series,
    }


# ── Statistics Canada: complete life table, three-year estimates ──────────────

STATCAN_LIFE = "https://www150.statcan.gc.ca/n1/tbl/csv/13100114-eng.zip"
STATCAN_LIFE_PAGE = "https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1310011401"


def read_statcan_zip(data: bytes, table: str) -> list[dict]:
    with zipfile.ZipFile(io.BytesIO(data)) as z:
        with z.open(f"{table}.csv") as fh:
            return list(csv.DictReader(io.TextIOWrapper(fh, encoding="utf-8-sig")))


def statcan_life_table(f: Fetcher) -> dict:
    data, prov = f.get(STATCAN_LIFE)
    rows = [r for r in read_statcan_zip(data, "13100114") if r["GEO"] == "Canada"]
    latest = max(r["REF_DATE"] for r in rows)
    rows = [r for r in rows if r["REF_DATE"] == latest]
    elements = {
        "qx": "Death probability between age x and x+1 (qx)",
        "lx": "Number of survivors at age x (lx)",
        "ex": "Life expectancy (in years) at age x (ex)",
    }
    sexes = {"total": "Both sexes", "male": "Males", "female": "Females"}
    series: dict[str, dict[str, list[float]]] = {}
    for key, sex in sexes.items():
        series[key] = {}
        for col, element in elements.items():
            values: dict[int, float] = {}
            for r in rows:
                if r["Sex"] != sex or r["Element"] != element or r["VALUE"] == "":
                    continue
                age = int(r["Age group"].split()[0])
                values[age] = float(r["VALUE"])
            if sorted(values) != list(range(0, 111)):
                raise SystemExit(f"StatCan {sex} {col}: expected ages 0–110, read {len(values)}")
            series[key][col] = [values[a] for a in range(0, 111)]
    return {
        "id": "statcan-life-table",
        "kind": "life_table",
        "title": f"Complete life table, Canada, {latest.replace('/', '–')}",
        "publisher": "Statistics Canada",
        "edition": latest.replace("/", "–"),
        "report": STATCAN_LIFE_PAGE,
        "licence": STATCAN_LICENCE,
        "page": "Resources/Data/Complete Life Table, Canada (Statistics Canada).md",
        "sources": [{**prov, "title": "Table 13-10-0114-01, Life expectancy and other elements of the complete life table, three-year estimates"}],
        "ages": list(range(0, 111)),
        "last_age_open": True,
        "sexes": {"total": "Both sexes", "male": "Males", "female": "Females"},
        "series": series,
    }


# ── BLS: Consumer Price Index and Employment Cost Index ───────────────────────

BLS = "https://download.bls.gov/pub/time.series"
CPI_SERIES = ["CUUR0000SA0", "CUUR0000SAM", "CUUR0000SETD", "CUUR0000SETE", "CUUR0000SETA02", "CUUR0000SAH1"]
ECI_SERIES = ["CIU2020000000000I"]


def bls_titles(text: str) -> dict[str, str]:
    lines = text.splitlines()
    head = [h.strip() for h in lines[0].split("\t")]
    sid, title = head.index("series_id"), head.index("series_title")
    out = {}
    for line in lines[1:]:
        cells = line.split("\t")
        if len(cells) > title:
            out[cells[sid].strip()] = cells[title].strip()
    return out


def bls_points(text: str, wanted: set[str]) -> dict[str, dict[str, float]]:
    """series → period ("2024-03", or "2024-Q1" for a quarterly series) → value."""
    out: dict[str, dict[str, float]] = {s: {} for s in wanted}
    for line in text.splitlines()[1:]:
        cells = [c.strip() for c in line.split("\t")]
        if len(cells) < 4 or cells[0] not in wanted:
            continue
        year, period, value = cells[1], cells[2], cells[3]
        # BLS prints "-" for a month it didn't publish (October 2025's CPI,
        # lost to the shutdown): a gap, never a guess.
        try:
            float(value)
        except ValueError:
            continue
        if period.startswith("M") and period != "M13":
            out[cells[0]][f"{year}-{period[1:]}"] = float(value)
        elif period.startswith("Q") and period != "Q05":
            out[cells[0]][f"{year}-Q{int(period[1:])}"] = float(value)
    return out


def bls_indexes(f: Fetcher) -> dict:
    cu_series, p1 = f.get(f"{BLS}/cu/cu.series")
    cu_data, p2 = f.get(f"{BLS}/cu/cu.data.0.Current")
    ci_series, p3 = f.get(f"{BLS}/ci/ci.series")
    ci_data, p4 = f.get(f"{BLS}/ci/ci.data.1.AllData")
    titles = {**bls_titles(cu_series.decode()), **bls_titles(ci_series.decode())}
    cpi = bls_points(cu_data.decode(), set(CPI_SERIES))
    eci = bls_points(ci_data.decode(), set(ECI_SERIES))
    series = []
    for sid in CPI_SERIES:
        pts = {p: v for p, v in cpi[sid].items() if p >= START}
        months = months_from(START, max(pts))
        series.append({"id": sid, "title": titles[sid], "frequency": "monthly", "start": START, "values": aligned(months, pts)})
    for sid in ECI_SERIES:
        pts = {p: v for p, v in eci[sid].items() if p >= START}
        quarters = sorted(pts)
        series.append({"id": sid, "title": titles[sid], "frequency": "quarterly", "start": quarters[0], "values": [pts[q] for q in quarters]})
    latest = max(s["start"] for s in series)
    last = max(months_from(START, max(cpi[CPI_SERIES[0]])))
    return {
        "id": "bls-price-indexes",
        "kind": "index_series",
        "title": "Consumer Price Index and Employment Cost Index (BLS)",
        "publisher": "U.S. Bureau of Labor Statistics",
        "edition": last,
        "report": "https://www.bls.gov/cpi/",
        "licence": PUBLIC_DOMAIN,
        "page": "Resources/Data/Consumer Price Index (BLS).md",
        "sources": [
            {**p1, "title": "CPI series definitions (cu.series)"},
            {**p2, "title": "CPI data, current series (cu.data.0.Current)"},
            {**p3, "title": "ECI series definitions (ci.series)"},
            {**p4, "title": "ECI data (ci.data.1.AllData)"},
        ],
        "series": series,
        "_latest_start": latest,
    }


# ── Statistics Canada: Consumer Price Index ───────────────────────────────────

STATCAN_CPI = "https://www150.statcan.gc.ca/n1/tbl/csv/18100004-eng.zip"
STATCAN_CPI_PRODUCTS = [
    "All-items",
    "Passenger vehicle insurance premiums",
    "Passenger vehicle parts, maintenance and repairs",
    "Health care",
    "Shelter",
]


def statcan_cpi(f: Fetcher) -> dict:
    data, prov = f.get(STATCAN_CPI)
    rows = [r for r in read_statcan_zip(data, "18100004") if r["GEO"] == "Canada" and r["Products and product groups"] in STATCAN_CPI_PRODUCTS]
    series = []
    last = START
    for product in STATCAN_CPI_PRODUCTS:
        pts = {r["REF_DATE"]: float(r["VALUE"]) for r in rows if r["Products and product groups"] == product and r["VALUE"] != "" and r["REF_DATE"] >= START}
        months = months_from(START, max(pts))
        last = max(last, months[-1])
        uom = next(r["UOM"] for r in rows if r["Products and product groups"] == product)
        series.append({
            "id": product,
            "title": f"{product}, Canada ({uom}), not seasonally adjusted",
            "frequency": "monthly",
            "start": START,
            "values": aligned(months, pts),
        })
    return {
        "id": "statcan-cpi",
        "kind": "index_series",
        "title": "Consumer Price Index, monthly (Statistics Canada)",
        "publisher": "Statistics Canada",
        "edition": last,
        "report": "https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810000401",
        "licence": STATCAN_LICENCE,
        "page": "Resources/Data/Consumer Price Index, Canada (Statistics Canada).md",
        "sources": [{**prov, "title": "Table 18-10-0004-01, Consumer Price Index, monthly, not seasonally adjusted"}],
        "series": series,
    }


# ── US Treasury: daily par yield curve, month-end ─────────────────────────────

TREASURY = (
    "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/"
    "{year}/all?type=daily_treasury_yield_curve&field_tdr_date_value={year}&page&_format=csv"
)
TERMS = [("1 Mo", 1 / 12), ("2 Mo", 2 / 12), ("3 Mo", 0.25), ("6 Mo", 0.5), ("1 Yr", 1), ("2 Yr", 2), ("3 Yr", 3),
         ("5 Yr", 5), ("7 Yr", 7), ("10 Yr", 10), ("20 Yr", 20), ("30 Yr", 30)]


def treasury_curves(f: Fetcher) -> dict:
    sources, month_end = [], {}
    for year in range(int(START[:4]), dt.date.today().year + 1):
        data, prov = f.get(TREASURY.format(year=year))
        sources.append({**prov, "title": f"Daily Treasury Par Yield Curve Rates, {year}"})
        for r in csv.DictReader(io.StringIO(data.decode("utf-8-sig"))):
            m, d, y = r["Date"].split("/")
            iso = f"{y}-{m}-{d}"
            key = iso[:7]
            if key not in month_end or iso > month_end[key]["date"]:
                month_end[key] = {"date": iso, "yields": [round(float(r[t]) / 100, 6) if r.get(t) not in (None, "", "N/A") else None for t, _ in TERMS]}
    curves = [month_end[k] for k in sorted(month_end)]
    return {
        "id": "us-treasury-par-yields",
        "kind": "yield_curve",
        # The last trading day of each month, and the latest day of the month in progress.
        "title": "Daily Treasury Par Yield Curve Rates, month-end",
        "publisher": "U.S. Department of the Treasury",
        "edition": curves[-1]["date"],
        "report": "https://home.treasury.gov/policy-issues/financing-the-government/interest-rate-statistics",
        "licence": PUBLIC_DOMAIN,
        "page": "Resources/Data/Daily Treasury Par Yield Curve Rates.md",
        "basis": "Par yields on a bond-equivalent basis: nominal annual rates convertible semiannually, read off the most recently auctioned securities.",
        "sources": sources,
        "terms": [t for _, t in TERMS],
        "term_labels": [label for label, _ in TERMS],
        "curves": curves,
    }


DATASETS = {
    "nchs-us-life-tables": nchs_life_tables,
    "statcan-life-table": statcan_life_table,
    "bls-price-indexes": bls_indexes,
    "statcan-cpi": statcan_cpi,
    "us-treasury-par-yields": treasury_curves,
}


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("ids", nargs="*", help=f"datasets to extract (default all): {', '.join(DATASETS)}")
    ap.add_argument("--cache", type=Path, default=Path(os.environ.get("XDG_CACHE_HOME", Path.home() / ".cache")) / "actuarial-notes" / "datasets")
    ap.add_argument("--offline", action="store_true", help="read only from the cache")
    args = ap.parse_args(argv)
    fetcher = Fetcher(args.cache, args.offline)
    for ds_id in args.ids or DATASETS:
        if ds_id not in DATASETS:
            print(f"Unknown dataset {ds_id!r}", file=sys.stderr)
            return 2
        ds = DATASETS[ds_id](fetcher)
        ds.pop("_latest_start", None)
        path = write(ds)
        print(f"{ds_id}: {ds['title']} — edition {ds['edition']} → {path.relative_to(ROOT)} ({path.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
