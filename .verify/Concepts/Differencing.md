---
target: Concepts/Differencing.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Example worked before reading the answer: slow linear ACF decay -> difference; ACF dying out after one difference; -0.48 at lag 1 after a second -> d = 1 (agrees). Operators per fpp3 §9.2; seasonal difference y_t - y_{t-m} per §9.1; over-differencing per §9.1; NIST 6.4.4.2 'one difference is usually sufficient' and fitting a curve to remove a trend. Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.1 Stationarity and differencing (first, second and seasonal differences; 'do as few differences as necessary'; false dynamics from over-differencing), §9.2 backshift form, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html; NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.2 Stationarity, sha256:bdd8bd72f717c2b0488542dade0efc709ed5cf65224e586ceb9af681f08c2099 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc442.htm
- note: Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.
