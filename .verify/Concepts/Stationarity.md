---
target: Concepts/Stationarity.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Recomputed before reading the answer: roots of 1-0.5B-0.6B^2 = -1.773 and 0.940 -> one inside the unit circle, not stationary; phi1+phi2 = 1.1 > 1 fails fpp3 §9.3's AR(2) condition (agrees). Definition (constant mean, variance, autocovariance depending on lag) per NIST 6.4.4.2 and fpp3 §9.1; fixes (differencing, log for variance, curve fit) per NIST 6.4.4.2; AR(1) |phi|<1 and random walk at phi=1 per §9.3. Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.1 stationarity, §9.3 AR(1) and AR(2) stationarity constraints, §9.4 MA always stationary/invertibility, §9.5 'I' = differences, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html; NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.2 Stationarity, sha256:bdd8bd72f717c2b0488542dade0efc709ed5cf65224e586ceb9af681f08c2099 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc442.htm
- note: Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.
