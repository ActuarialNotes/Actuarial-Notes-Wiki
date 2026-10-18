---
target: Concepts/Partial Autocorrelation Function.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Recomputed before reading the answer: bands ±1.96/10 = ±0.196; ACF geometric, PACF single spike -> AR(1); 0.71^2 = 0.504, 0.71^3 = 0.358 (agree). AR(1) phi=0.8 acf lag 2 = 0.64 recomputed. Definition, phi_11 = rho_1, AR(k) last-coefficient estimate, critical values and the identification table per fpp3 §9.5 (ARMA both tailing is the Box-Jenkins rule; fpp3 adds that the plots do not pin p and q when both are positive, consistent). Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.5 partial autocorrelations (removing lags 1..k-1; first PACF = first ACF; last coefficient of an AR(k); same ±1.96/√T critical values; identification rules), read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html
- note: Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.
