---
target: Concepts/Time Series.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Worked both examples before reading the answers (trend + period-12 seasonality; slow ACF decay -> non-stationary, difference) - agree. Components table per fpp3 §2.3 (cycle = rises and falls not of fixed frequency); weak stationarity conditions per NIST 6.4.4.2; differencing and seasonal differencing per §9.1. Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §2.3 trend, seasonal, cyclic patterns, §2.8 ACF, read 2026-10-18, sha256:a13a2a978731e95537586c671e4b4edda0fbb1711e81a1f01e2c2b967f4212b7 — https://otexts.com/fpp3/graphics.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.1 stationarity, differencing, seasonal differencing; §9.5 partial autocorrelations, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html; NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.2 Stationarity, sha256:bdd8bd72f717c2b0488542dade0efc709ed5cf65224e586ceb9af681f08c2099 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc442.htm
- note: Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.
