#!/usr/bin/env python3
"""OSFI's insurer filings, from the Open Government Portal's API → dated snapshots.

OSFI publishes what federally regulated insurers file, as filed, on the Open
Government Portal (Open Government Licence – Canada): one dataset for P&C
companies, one for life companies, a resource per return (PC1, PC2, PC3, PC4;
LF1, LF2, LF3, LCQ, LCA), each loaded into the portal's CKAN datastore. This
script pages ``datastore_search`` for one period of one return and writes what
it read to ``.osfi/<dataset>/<period>/`` — read mechanically, labelled only with
the labels OSFI ships with each cell, and hashed. See docs/osfi-pc-data.md.

    python3 scripts/osfi_extract.py periods                      # which quarters each P&C return holds
    python3 scripts/osfi_extract.py extract --period 2026Q2       # PC1–PC4 for one quarter
    python3 scripts/osfi_extract.py extract --period 2026Q2 --returns PC1,PC4
    python3 scripts/osfi_extract.py extract --dataset life --period 2026Q2
    python3 scripts/osfi_extract.py extract --period 2026Q2 --offline   # from the cache only

What the API is like (found 2026-11-08, and the reason for the code below):
filters are exact-match and the only way in (full-text search is refused over
100,000 rows, and there's no SQL); a response holds at most 1,000 records
whatever ``limit`` asks; a query takes ~6 s; field ids are the CSV headers with
the accents stripped; every value is text; zeros aren't published. Pages are
fetched in ``_id`` order, a few at a time, retried with backoff, and cached
outside the repo (``--cache``), so a re-run costs nothing.

The snapshot never corrects a figure. ``checks.json`` lists what didn't add up
— a finding about the filing, not a fix. Stdlib only.
"""

from __future__ import annotations

import argparse
import concurrent.futures as cf
import datetime as dt
import hashlib
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from decimal import Decimal, InvalidOperation
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / ".osfi"
API = "https://open.canada.ca/data/en/api/3/action"
USER_AGENT = "Actuarial Notes OSFI extract (https://actuarialnotes.com)"
PAGE = 1000  # the datastore's cap on records per response
WORKERS = 4

DATASETS = {
    "pc": {
        "package": "4c6c515f-7c44-4bb6-ab56-c5f79f75f705",
        "title": "Property and casualty companies",
        "returns": ["PC1", "PC2", "PC3", "PC4"],
    },
    "life": {
        "package": "1358284b-26e7-4c69-abd8-398d3da2c270",
        "title": "Life insurance companies",
        "returns": ["LF1", "LF2", "LF3", "LCQ", "LCA"],
    },
}

LICENCE = {
    "name": "Open Government Licence – Canada",
    "url": "https://open.canada.ca/en/open-government-licence-canada",
    "attribution": "Contains information licensed under the Open Government Licence – Canada.",
}

# The datastore's field ids, found on the first page by these tests, so a
# renamed French header or a dataset with "Life" in place of "P&C" still reads.
FIELD_TESTS = {
    "year": lambda f: f.startswith("Fiscal Year"),
    "quarter": lambda f: f == "Fiscal Quarter",
    "id": lambda f: f == "Id",
    "name_en": lambda f: f.startswith("Total ") and f.endswith("/FIs"),
    "name_fr": lambda f: f.startswith("Total Soci"),
    "group_en": lambda f: f == "Industry Group",
    "group_fr": lambda f: f == "Groupe Sectoriel",
    "return": lambda f: f.startswith("Return/"),
    "address": lambda f: f.startswith("Data Point Address/"),
    "label_en": lambda f: f == "Data Point Address Label",
    "label_fr": lambda f: f.startswith("Libelle de l"),
    "inactive": lambda f: f.startswith("FI Inactive Date"),
    "value": lambda f: f.startswith("Measure Value"),
}


# ── Periods ───────────────────────────────────────────────────────────────────

PERIOD_RE = re.compile(r"^(\d{4})Q([1-4])$")
API_PERIOD_RE = re.compile(r"^Q([1-4]) - (\d{4})$")


def api_period(period: str) -> str:
    """``2026Q2`` → ``Q2 - 2026``, the datastore's spelling."""
    m = PERIOD_RE.match(period)
    if not m:
        raise ValueError(f"period {period!r} isn't YYYYQn")
    return f"Q{m.group(2)} - {m.group(1)}"


def our_period(text: str) -> str:
    """``Q2 - 2026`` → ``2026Q2``."""
    m = API_PERIOD_RE.match(text)
    if not m:
        raise ValueError(f"datastore period {text!r} isn't 'Qn - YYYY'")
    return f"{m.group(2)}Q{m.group(1)}"


def quarters(start: str, end: str) -> list[str]:
    """Every quarter from ``start`` to ``end``, inclusive."""
    y, q = (int(x) for x in PERIOD_RE.match(start).groups())  # type: ignore[union-attr]
    ey, eq = (int(x) for x in PERIOD_RE.match(end).groups())  # type: ignore[union-attr]
    out = []
    while (y, q) <= (ey, eq):
        out.append(f"{y}Q{q}")
        y, q = (y + 1, 1) if q == 4 else (y, q + 1)
    return out


# ── The API ───────────────────────────────────────────────────────────────────


class Api:
    """``datastore_search`` and ``package_show``, with retries and a page cache."""

    def __init__(self, cache: Path, offline: bool = False, refresh: bool = False, log=print):
        self.cache = cache
        self.offline = offline
        self.refresh = refresh
        self.log = log

    def _get(self, action: str, params: dict) -> dict:
        url = f"{API}/{action}?" + urllib.parse.urlencode(params)
        delay = 2.0
        for attempt in range(5):
            try:
                req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
                with urllib.request.urlopen(req, timeout=120) as resp:
                    body = json.load(resp)
                if not body.get("success"):
                    raise RuntimeError(f"{action} refused: {body.get('error')}")
                return body["result"]
            except (urllib.error.URLError, TimeoutError, ConnectionError) as e:
                if attempt == 4:
                    raise
                self.log(f"  retrying in {delay:.0f}s after {e}")
                time.sleep(delay)
                delay *= 2
        raise AssertionError("unreachable")

    def resources(self, package: str) -> tuple[dict[str, dict], str]:
        """The package's datastore resources by return code, and its last change."""
        result = self._get("package_show", {"id": package})
        out = {}
        for r in result["resources"]:
            code = r["name"].split(" -")[0].strip()
            if r.get("datastore_active"):
                out[code] = {
                    "id": r["id"],
                    "name": r["name"].strip().replace("​", ""),
                    "last_modified": r.get("last_modified"),
                }
        return out, result.get("metadata_modified")

    def count(self, resource: str, filters: dict) -> int:
        result = self._get(
            "datastore_search",
            {"resource_id": resource, "filters": json.dumps(filters), "limit": 0},
        )
        return int(result["total"])

    def page(self, resource: str, filters: dict, offset: int, key: Path) -> dict:
        """One page, from the cache when it's there (unless ``refresh``)."""
        if key.exists() and not self.refresh:
            return json.loads(key.read_text())
        if self.offline:
            raise FileNotFoundError(f"offline and not cached: {key}")
        result = self._get(
            "datastore_search",
            {
                "resource_id": resource,
                "filters": json.dumps(filters, ensure_ascii=False),
                "limit": PAGE,
                "offset": offset,
                "sort": "_id",
            },
        )
        page = {
            "total": result["total"],
            "fields": [f["id"] for f in result["fields"]],
            "records": result["records"],
            "read_at": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        }
        key.parent.mkdir(parents=True, exist_ok=True)
        key.write_text(json.dumps(page, ensure_ascii=False))
        return page

    def all_pages(self, resource: str, filters: dict, cache_dir: Path) -> list[dict]:
        """Every page of a filtered query: the first to learn the total, the rest a few at a time."""
        first = self.page(resource, filters, 0, cache_dir / "page-000000.json")
        total = first["total"]
        offsets = list(range(PAGE, total, PAGE))
        pages = [first]
        if offsets:
            self.log(f"  {total:,} rows → {len(offsets) + 1} pages")
            with cf.ThreadPoolExecutor(WORKERS) as pool:
                futures = {
                    pool.submit(self.page, resource, filters, o, cache_dir / f"page-{o:06d}.json"): o
                    for o in offsets
                }
                done = {}
                for i, fut in enumerate(cf.as_completed(futures), 1):
                    done[futures[fut]] = fut.result()
                    if i % 25 == 0:
                        self.log(f"  {i}/{len(offsets)}")
            pages += [done[o] for o in offsets]
        got = sum(len(p["records"]) for p in pages)
        if got != total:
            raise RuntimeError(f"read {got} rows, the datastore said {total} — re-run with --refresh")
        return pages


# ── Reading the rows ──────────────────────────────────────────────────────────


def field_map(fields: list[str]) -> dict[str, str]:
    out = {}
    for name, test in FIELD_TESTS.items():
        hits = [f for f in fields if test(f)]
        if len(hits) != 1:
            raise RuntimeError(f"field {name!r}: expected one match in {fields}, got {hits}")
        out[name] = hits[0]
    return out


def parse_value(text: str) -> float:
    """The measure, which the datastore stores as text. Anything not a number is an error."""
    try:
        d = Decimal(str(text).strip())
    except InvalidOperation:
        raise ValueError(f"not a number: {text!r}") from None
    if not d.is_finite():
        raise ValueError(f"not a finite number: {text!r}")
    return float(d)


def read_rows(pages: list[dict], period: str, code: str) -> list[dict]:
    """The pages' records as plain rows, each checked to belong to this period and return."""
    fm = field_map(pages[0]["fields"])
    want = api_period(period)
    rows = []
    for p in pages:
        for r in p["records"]:
            if r[fm["quarter"]] != want:
                raise RuntimeError(f"row for {r[fm['quarter']]!r} in a {want!r} query")
            if r[fm["return"]] != code:
                raise RuntimeError(f"row for return {r[fm['return']]!r} in {code}")
            rows.append(
                {
                    "id": str(r[fm["id"]]).strip(),
                    "name_en": r[fm["name_en"]].strip(),
                    "name_fr": r[fm["name_fr"]].strip(),
                    "group_en": r[fm["group_en"]].strip(),
                    "group_fr": r[fm["group_fr"]].strip(),
                    "address": r[fm["address"]].strip(),
                    "label_en": (r[fm["label_en"]] or "").strip(),
                    "label_fr": (r[fm["label_fr"]] or "").strip(),
                    "inactive": (r[fm["inactive"]] or "").strip(),
                    "value_text": str(r[fm["value"]]).strip(),
                }
            )
    return rows


def content_hash(rows: list[dict]) -> str:
    """sha256 of the rows' content in a canonical order — independent of ``_id`` and paging."""
    keys = ("id", "address", "value_text", "label_en", "label_fr", "name_en", "inactive")
    h = hashlib.sha256()
    for r in sorted(rows, key=lambda r: (r["id"], r["address"])):
        h.update(("\t".join(r[k] for k in keys) + "\n").encode("utf-8"))
    return "sha256:" + h.hexdigest()


def is_aggregate(row: dict) -> bool:
    """OSFI's industry rows ("Total Canadian Property & Casualty") — column sums, never a company."""
    return row["name_en"].startswith("Total ")


# ── Checks (findings about a filing, never corrections) ───────────────────────

# PC4's ratio line is labelled "Ratio (Line 10 or line 25 as a % of line 130)":
# capital available (line 10) or, for a branch, net assets available (line 25),
# as a percentage of minimum capital required (line 130). The addresses below
# are that label's own lines, column 01.
MCT_RATIO = "P100014001"
MCT_NUMERATORS = ("P100002501", "P100001001")  # a branch files both; line 25 is its test
MCT_DENOMINATOR = "P100013001"


def decimals(text: str) -> int:
    """How many decimal places a value may have been filed to.

    The datastore pads every value to two places ("5020.00"), so the text can't
    say a filer rounded to a whole unit. A whole number is therefore taken as
    possibly rounded to one ("7063.00" → 0); anything else to its decimals
    ("228.50" → 2, "1.11" → 2)."""
    value = Decimal(str(text).strip())
    if value == value.to_integral_value():
        return 0
    _, _, frac = str(text).strip().partition(".")
    return len(frac)


def rounding_band(num: float, num_dp: int, den: float, den_dp: int, ratio_dp: int = 2) -> float:
    """The most a ratio 100·num/den can move when num and den are only known to the
    precision they were filed at, plus the ratio's own rounding (some filers round
    it to a whole percent)."""
    hn, hd, hr = (0.5 * 10 ** -dp for dp in (num_dp, den_dp, ratio_dp))
    return 100 * (hn / abs(den) + abs(num) * hd / den ** 2) + hr


def check_mct(texts: dict[str, dict[str, str]], labels: dict[str, dict]) -> tuple[list[dict], dict]:
    """Recompute each filed MCT/BAAT ratio from its own filed lines.

    A ratio counts as reproduced when it is within what the inputs' filed
    precision allows (``rounding_band``) — a company filing 7,063 over 228.5
    can't be held to the cent. Anything further out is a finding.
    """
    tally = {"filed": 0, "exact": 0, "within_rounding": 0, "mismatch": 0, "incomplete": 0}
    findings: list[dict] = []
    if "line 130" not in labels.get(MCT_RATIO, {}).get("en", ""):
        return [{"check": "mct-ratio", "kind": "skipped",
                 "detail": f"{MCT_RATIO} isn't labelled as the ratio this check knows"}], tally
    for inst, cells in texts.items():
        if MCT_RATIO not in cells:
            continue
        tally["filed"] += 1
        filed = parse_value(cells[MCT_RATIO])
        num_addr = next((a for a in MCT_NUMERATORS if a in cells and parse_value(cells[a])), None)
        den_text = cells.get(MCT_DENOMINATOR)
        if num_addr is None or den_text is None or not parse_value(den_text):
            tally["incomplete"] += 1
            findings.append({"check": "mct-ratio", "kind": "incomplete", "institution": inst,
                             "detail": "the ratio is filed but a line it is computed from isn't"})
            continue
        num, den = parse_value(cells[num_addr]), parse_value(den_text)
        recomputed = 100 * num / den
        if abs(recomputed - filed) <= 0.005 + 1e-9:
            tally["exact"] += 1
        elif abs(recomputed - filed) <= rounding_band(num, decimals(cells[num_addr]), den, decimals(den_text),
                                                     decimals(cells[MCT_RATIO])):
            tally["within_rounding"] += 1
        else:
            tally["mismatch"] += 1
            findings.append({"check": "mct-ratio", "kind": "mismatch", "institution": inst,
                             "filed": filed, "recomputed": round(recomputed, 2),
                             "from": [num_addr, MCT_DENOMINATOR]})
    return findings, tally


# PC1 20.10 / 20.11, current-period column 01. Line 89 is TOTAL ASSETS; 20.11's
# line 799 is a Canadian insurer's TOTAL LIABILITIES AND EQUITY and line 999 a
# foreign branch's TOTAL LIABILITIES, EQUITY, HEAD OFFICE ACCOUNT, RESERVES & AOCI.
TOTAL_ASSETS = "P20108901"
TOTAL_LIABILITIES_AND_EQUITY = ("P201199901", "P201179901")  # a branch files both; 999 is its total
ASSET_LINE = re.compile(r"^P2010\d\d01$")
BALANCE_TOLERANCE = 1.0  # $1,000: one unit of the return, for lines filed in whole thousands


def check_balance(values: dict[str, dict[str, float]]) -> tuple[list[dict], dict]:
    """Two identities of the statement of financial position, each company:
    total assets = total liabilities and equity, and total assets = the sum of
    20.10's asset lines. Only zeros are omitted from the portal, so a missing
    line is a zero."""
    tally = {"companies": 0, "balanced": 0, "unbalanced": 0, "lines_sum": 0, "lines_differ": 0}
    findings: list[dict] = []
    for inst, cells in values.items():
        if TOTAL_ASSETS not in cells:
            continue
        tally["companies"] += 1
        assets = cells[TOTAL_ASSETS]
        other = next((cells[a] for a in TOTAL_LIABILITIES_AND_EQUITY if a in cells), 0.0)
        if abs(assets - other) <= BALANCE_TOLERANCE:
            tally["balanced"] += 1
        else:
            tally["unbalanced"] += 1
            findings.append({"check": "balance", "kind": "mismatch", "institution": inst,
                             "total_assets": assets, "total_liabilities_and_equity": other})
        lines = sum(v for a, v in cells.items() if ASSET_LINE.match(a) and a != TOTAL_ASSETS)
        if abs(lines - assets) <= BALANCE_TOLERANCE:
            tally["lines_sum"] += 1
        else:
            tally["lines_differ"] += 1
            findings.append({"check": "asset-lines", "kind": "mismatch", "institution": inst,
                             "total_assets": assets, "sum_of_lines": round(lines, 2)})
    return findings, tally


# ── Writing the snapshot ──────────────────────────────────────────────────────


def build(rows_by_return: dict[str, list[dict]]) -> tuple[dict, dict, dict, list[dict], dict]:
    """Rows → (institutions, dictionary, values, findings, check tallies)."""
    institutions: dict[str, dict] = {}
    dictionary: dict[str, dict[str, dict]] = {}
    values: dict[str, dict[str, dict[str, float]]] = {}
    findings: list[dict] = []
    texts: dict[str, dict[str, dict[str, str]]] = {}
    for code, rows in rows_by_return.items():
        variants: dict[str, dict[tuple[str, str], int]] = {}
        vals = values.setdefault(code, {})
        for r in rows:
            inst = institutions.setdefault(
                r["id"],
                {
                    "id": r["id"],
                    "name": {"en": r["name_en"], "fr": r["name_fr"]},
                    "group": {"en": r["group_en"], "fr": r["group_fr"]},
                    "inactive": None if r["inactive"].startswith("9999") else r["inactive"] or None,
                    "aggregate": is_aggregate(r),
                    "returns": [],
                },
            )
            if code not in inst["returns"]:
                inst["returns"].append(code)
            seen = variants.setdefault(r["address"], {})
            key = (r["label_en"], r["label_fr"])
            seen[key] = seen.get(key, 0) + 1
            cells = vals.setdefault(r["id"], {})
            if r["address"] in cells:
                findings.append({"check": "duplicate", "kind": "duplicate", "return": code,
                                 "institution": r["id"], "address": r["address"]})
            cells[r["address"]] = parse_value(r["value_text"])
            texts.setdefault(code, {}).setdefault(r["id"], {})[r["address"]] = r["value_text"]
        # An address should carry one label. When rows disagree (Q4 2024 mixes two versions
        # of the PC1 form), the dictionary keeps the label most rows carry, and the finding
        # lists every variant with its row count.
        labels = dictionary.setdefault(code, {})
        for address, seen in variants.items():
            ranked = sorted(seen.items(), key=lambda kv: -kv[1])  # stable: first seen wins a tie
            labels[address] = {"en": ranked[0][0][0], "fr": ranked[0][0][1]}
            if len(ranked) > 1:
                findings.append({"check": "label", "kind": "conflict", "return": code, "address": address,
                                 "variants": [{"en": en, "fr": fr, "rows": n} for (en, fr), n in ranked]})
    tallies = {}
    if "PC1" in values:
        companies = {i: c for i, c in values["PC1"].items() if not institutions[i]["aggregate"]}
        balance_findings, tallies["balance_sheet"] = check_balance(companies)
        findings += balance_findings
    if "PC4" in texts:
        companies = {i: c for i, c in texts["PC4"].items() if not institutions[i]["aggregate"]}
        mct_findings, tallies["mct_ratio"] = check_mct(companies, dictionary["PC4"])
        findings += mct_findings
    return institutions, dictionary, values, findings, tallies


def dump_lines(obj: dict) -> str:
    """One key per line: compact, and a refiling shows up as a one-line diff."""
    lines = [
        f"  {json.dumps(k, ensure_ascii=False)}: {json.dumps(v, ensure_ascii=False, separators=(',', ':'), sort_keys=True)}"
        for k, v in sorted(obj.items())
    ]
    return "{\n" + ",\n".join(lines) + "\n}\n"


def write_snapshot(out: Path, manifest: dict, institutions: dict, dictionary: dict,
                   values: dict, findings: list[dict]) -> None:
    out.mkdir(parents=True, exist_ok=True)
    (out / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    inst = sorted(institutions.values(), key=lambda i: (i["aggregate"], i["name"]["en"].casefold()))
    (out / "institutions.json").write_text(json.dumps(inst, ensure_ascii=False, indent=1) + "\n")
    (out / "checks.json").write_text(json.dumps(findings, ensure_ascii=False, indent=1) + "\n")
    for code in dictionary:
        (out / f"{code}.labels.json").write_text(dump_lines(dictionary[code]))
        (out / f"{code}.values.json").write_text(dump_lines(values[code]))


# ── Commands ──────────────────────────────────────────────────────────────────


def cmd_periods(api: Api, dataset: str, start: str, end: str) -> int:
    resources, modified = api.resources(DATASETS[dataset]["package"])
    print(f"{DATASETS[dataset]['title']} (modified {modified})")
    for code in DATASETS[dataset]["returns"]:
        if code not in resources:
            print(f"{code}: no datastore resource")
            continue
        counts = [(p, api.count(resources[code]["id"], {"Fiscal Quarter": api_period(p)}))
                  for p in quarters(start, end)]
        print(f"{code}: " + ", ".join(f"{p} {n:,}" for p, n in counts if n))
    return 0


def cmd_extract(api: Api, dataset: str, period: str, returns: list[str], out_root: Path) -> int:
    resources, modified = api.resources(DATASETS[dataset]["package"])
    rows_by_return: dict[str, list[dict]] = {}
    sources = {}
    for code in returns:
        if code not in resources:
            print(f"{code}: no datastore resource in this dataset", file=sys.stderr)
            return 1
        res = resources[code]
        print(f"{code} {period} ({res['id']})")
        cache_dir = api.cache / dataset / code / period
        pages = api.all_pages(res["id"], {"Fiscal Quarter": api_period(period)}, cache_dir)
        rows = read_rows(pages, period, code)
        if not rows:
            print(f"  no rows for {period}")
            continue
        rows_by_return[code] = rows
        sources[code] = {
            "resource_id": res["id"],
            "resource": res["name"],
            "resource_last_modified": res["last_modified"],
            "rows": len(rows),
            "pages": len(pages),
            "read_at": min(p["read_at"] for p in pages),
            "content_sha256": content_hash(rows),
        }
    if not rows_by_return:
        print("nothing to write", file=sys.stderr)
        return 1
    institutions, dictionary, values, findings, tallies = build(rows_by_return)
    manifest = {
        "dataset": dataset,
        "title": DATASETS[dataset]["title"],
        "publisher": "Office of the Superintendent of Financial Institutions (OSFI)",
        "page": f"https://open.canada.ca/data/en/dataset/{DATASETS[dataset]['package']}",
        "api": f"{API}/datastore_search",
        "package_last_modified": modified,
        "period": period,
        "units": "$ thousands (ratios in %), as filed",
        "licence": LICENCE,
        "returns": sources,
        "institutions": sum(1 for i in institutions.values() if not i["aggregate"]),
        "aggregates": sorted(i["name"]["en"] for i in institutions.values() if i["aggregate"]),
        "checks": {
            **tallies,
            "findings": {k: sum(1 for f in findings if f["kind"] == k)
                         for k in sorted({f["kind"] for f in findings})},
        },
        "note": "Only non-zero cells are published. Aggregate rows are OSFI's column sums "
                "(they add up ratios too) — never a company, never used for a ratio.",
    }
    out = out_root / dataset / period
    write_snapshot(out, manifest, institutions, dictionary, values, findings)
    print(f"wrote {out.relative_to(ROOT) if out.is_relative_to(ROOT) else out}: "
          f"{manifest['institutions']} institutions, checks {manifest['checks']}")
    return 0


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--cache", type=Path, default=Path.home() / ".cache" / "actuarial-notes" / "osfi")
    ap.add_argument("--offline", action="store_true", help="read cached pages only")
    ap.add_argument("--refresh", action="store_true", help="re-read every page from the API")
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("periods", help="row counts per quarter for each return")
    p.add_argument("--dataset", choices=DATASETS, default="pc")
    p.add_argument("--from", dest="start", default="2023Q1")
    p.add_argument("--to", dest="end", default=f"{dt.date.today().year}Q4")
    e = sub.add_parser("extract", help="one period → .osfi/<dataset>/<period>/")
    e.add_argument("--dataset", choices=DATASETS, default="pc")
    e.add_argument("--period", required=True, help="YYYYQn, e.g. 2026Q2")
    e.add_argument("--returns", help="comma-separated, default every current return")
    e.add_argument("--out", type=Path, default=OUT)
    args = ap.parse_args(argv)
    api = Api(args.cache, offline=args.offline, refresh=args.refresh)
    if args.cmd == "periods":
        return cmd_periods(api, args.dataset, args.start, args.end)
    returns = args.returns.split(",") if args.returns else DATASETS[args.dataset]["returns"]
    return cmd_extract(api, args.dataset, args.period, returns, args.out)


if __name__ == "__main__":
    sys.exit(main())
