---
Title: "Selected benchmark bond yields"
Authors: "Bank of Canada"
Publisher: "Bank of Canada"
Year: "2026"
date: "2026"
Type: "Dataset"
Code: "bond_yields_benchmark"
Available from: "[bankofcanada.ca](https://www.bankofcanada.ca/rates/interest-rates/canadian-bonds/)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:df65f64df5d28ab8b2fed868335f29dee587043c568637ad32379973931bc1da
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Data/Bank of Canada Selected Benchmark Bond Yields.md
---
![[Bank of Canada Selected Benchmark Bond Yields - Cover.svg]]

The Bank of Canada's daily yields for a set of benchmark Government of Canada bonds, at the 2-, 3-, 5-, 7- and 10-year terms, long-term and the long-term Real Return Bond. In the Bank's description, these yields serve as reference rates for Canadian dollar-denominated fixed income securities and are used to assess market conditions and inform monetary policy decisions. The Bank publishes the series on its *Selected bond yields* page and through its Valet API as the group `bond_yields_benchmark`, as CSV, JSON and XML; the copy read here runs daily from 2001-01-02 to 2026-10-29.

## Series
- `BD.CDN.2YR.DQ.YLD` — Benchmark bond yield, 2-year
- `BD.CDN.3YR.DQ.YLD` — Benchmark bond yield, 3-year
- `BD.CDN.5YR.DQ.YLD` — Benchmark bond yield, 5-year
- `BD.CDN.7YR.DQ.YLD` — Benchmark bond yield, 7-year
- `BD.CDN.10YR.DQ.YLD` — Benchmark bond yield, 10-year
- `BD.CDN.LONG.DQ.YLD` — Benchmark bond yield, long-term
- `BD.CDN.RRB.DQ.YLD` — Real Return Bonds yield, long-term

## How the benchmarks are selected
- The yields are based on mid-market closing yields of selected Government of Canada bond issues that mature approximately in the indicated terms; the issues used are not necessarily the ones whose remaining time to maturity is closest to the indicated term, and may differ from other sources.
- The selected 2-, 5-, 10- and 30-year issues are generally changed when a building benchmark bond is adopted by financial markets as a benchmark, typically after the last auction for that bond; the 3-year issue is usually updated with the 2-year (and sometimes the 5-year), and the 7-year with the 5- or 10-year.
- The page lists the current benchmark issues and the dates they took effect: 2 year — 2028.11.01, 3.00% (2026.10.23); 3 year — 2029.09.01, 3.50% (2026.10.23); 5 year — 2031.09.01, 3.00% (2026.09.10); 7 year — 2033.06.01, 2.75% (2026.09.10); 10 year — 2036.06.01, 3.25% (2026.06.23); Long — 2057.12.01, 3.50% (2026.03.06); RRB — 2050.12.01, 0.50% (2020.06.01).
- Sources named on the page: CanDeal Data and Analytics (CanDeal DNA) and Bank of Canada.

## Related series on the same page
- Marketable bond average yields — Government of Canada marketable bonds, average yield, 1 to 3 year, 3 to 5 year, 5 to 10 year and over 10 years.
- The page links a lookup of the past ten years of these series, treasury bill yields and benchmark Canada bonds; see [[Yield Curve]] and [[Interest Rate]].

## Sources
- [Selected bond yields (Bank of Canada)](https://www.bankofcanada.ca/rates/interest-rates/canadian-bonds/) — the page: the series, how the benchmark issues are selected, the current benchmark issues and their effective dates, the data sources (read 2026-10-30, sha256 `c3f9dc3094aa4b02…`)
- [Valet: bond_yields_benchmark, CSV](https://www.bankofcanada.ca/valet/observations/group/bond_yields_benchmark/csv) — the dataset's name, description, series identifiers and labels, and the range of observations, 2001-01-02 to 2026-10-29 (read 2026-10-30, sha256 `2af20b4058e7a739…`)
- [Bank of Canada terms and conditions](https://www.bankofcanada.ca/terms/) — the terms the CSV names for the data's use
