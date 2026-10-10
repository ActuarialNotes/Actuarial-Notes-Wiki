---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8e4a9c578393eab77a415b4b17b736b4d921f7c0626a4fa4291d1428c4c48c1f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Data/Daily Treasury Par Yield Curve Rates.md
---

# Daily Treasury Par Yield Curve Rates

The U.S. Department of the Treasury publishes **par yield curve rates** each trading day, read off the most recently auctioned Treasury securities. The yields are on a bond-equivalent basis: nominal annual rates, convertible semiannually. The dataset here keeps the curve of the last trading day of each month from 2000-01, and the latest day of the month in progress (2026-10-09).

> [!info] In Actuarial Tools
> The **Yield Curve** data source reads the curve on or before a date and the yield at a chosen term, which it can send to **Interest Converter** (nominal, convertible semiannually) for the effective annual rate a cash-flow tool takes. See [[Yield Curve]] and [[Spot Rate]] — a par yield is not a spot rate.

## Terms

1 Mo, 2 Mo, 3 Mo, 6 Mo, 1 Yr, 2 Yr, 3 Yr, 5 Yr, 7 Yr, 10 Yr, 20 Yr, 30 Yr. A term the Treasury did not publish on a date (the 1- and 2-month bills before they were issued) is left blank.

## Licence

A work of the US federal government, in the public domain.

## Sources

- Interest rate statistics: <https://home.treasury.gov/policy-issues/financing-the-government/interest-rate-statistics>
- Daily Treasury Par Yield Curve Rates, 2000 — <https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2000/all?type=daily_treasury_yield_curve&field_tdr_date_value=2000&page&_format=csv> (read 2026-10-10, sha256 `a8cde4c7a757ac74…`)
- Daily Treasury Par Yield Curve Rates, 2001 — <https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2001/all?type=daily_treasury_yield_curve&field_tdr_date_value=2001&page&_format=csv> (read 2026-10-10, sha256 `bc48181de2b452d1…`)
- Daily Treasury Par Yield Curve Rates, 2002 — <https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2002/all?type=daily_treasury_yield_curve&field_tdr_date_value=2002&page&_format=csv> (read 2026-10-10, sha256 `33f84b7c6f50bf3e…`)
- Daily Treasury Par Yield Curve Rates, 2003 — <https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2003/all?type=daily_treasury_yield_curve&field_tdr_date_value=2003&page&_format=csv> (read 2026-10-10, sha256 `0c255188cf596e5b…`)
- Daily Treasury Par Yield Curve Rates, 2004 — <https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2004/all?type=daily_treasury_yield_curve&field_tdr_date_value=2004&page&_format=csv> (read 2026-10-10, sha256 `0f0561773c7a3220…`)
- Daily Treasury Par Yield Curve Rates, 2005 — <https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2005/all?type=daily_treasury_yield_curve&field_tdr_date_value=2005&page&_format=csv> (read 2026-10-10, sha256 `ecf2ab3d1ca1b6ee…`)
- …and 21 more files of the same series, one per year, listed with their hashes in the dataset file.
