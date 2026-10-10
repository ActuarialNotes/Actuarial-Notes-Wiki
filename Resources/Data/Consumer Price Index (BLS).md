---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:180feab2d07d15b67e52d06f1737712bfa9ca9ec7d44b32cbdcd94a2523efe78
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Data/Consumer Price Index (BLS).md
---

# Consumer Price Index (BLS)

The U.S. Bureau of Labor Statistics publishes the **Consumer Price Index** monthly and the **Employment Cost Index** quarterly. The series read here, from BLS's own time-series files, run from 2000-01 to 2026-08 for the CPI. They are indexes that loss-trend work often sets beside its own data: medical care for bodily-injury and workers' compensation severity, motor vehicle repair and used cars for physical damage, wages for indemnity.

> [!info] In Actuarial Tools
> The **Price Index** data source reads these series and gives the annualised change between two periods; it can send the window to **Trend Fit** or the annualised change to **Trend Factor**, as a selected trend. See [[Inflation]] and [[Loss Trend]].

## Series read

- `CUUR0000SA0`: All items in U.S. city average, all urban consumers, not seasonally adjusted (monthly, from 2000-01)
- `CUUR0000SAM`: Medical care in U.S. city average, all urban consumers, not seasonally adjusted (monthly, from 2000-01)
- `CUUR0000SETD`: Motor vehicle maintenance and repair in U.S. city average, all urban consumers, not seasonally adjusted (monthly, from 2000-01)
- `CUUR0000SETE`: Motor vehicle insurance in U.S. city average, all urban consumers, not seasonally adjusted (monthly, from 2000-01)
- `CUUR0000SETA02`: Used cars and trucks in U.S. city average, all urban consumers, not seasonally adjusted (monthly, from 2000-01)
- `CUUR0000SAH1`: Shelter in U.S. city average, all urban consumers, not seasonally adjusted (monthly, from 2000-01)
- `CIU2020000000000I`: Wages and salaries for all private industry workers, current dollar index (quarterly, from 2001-Q1)

A month the BLS did not publish is left as a gap, never filled in: in these files every CPI series read but used cars and trucks carries no value for October 2025, and motor vehicle insurance none for November 2025 either.

## Licence

A work of the US federal government, in the public domain.

## Sources

- CPI home: <https://www.bls.gov/cpi/>
- CPI series definitions (cu.series) — <https://download.bls.gov/pub/time.series/cu/cu.series> (read 2026-10-10, sha256 `f7367ea7851338d4…`)
- CPI data, current series (cu.data.0.Current) — <https://download.bls.gov/pub/time.series/cu/cu.data.0.Current> (read 2026-10-10, sha256 `70b9070ba38ebfd4…`)
- ECI series definitions (ci.series) — <https://download.bls.gov/pub/time.series/ci/ci.series> (read 2026-10-10, sha256 `e6dbe9438d6981a2…`)
- ECI data (ci.data.1.AllData) — <https://download.bls.gov/pub/time.series/ci/ci.data.1.AllData> (read 2026-10-10, sha256 `d48a9b1a798ae824…`)
