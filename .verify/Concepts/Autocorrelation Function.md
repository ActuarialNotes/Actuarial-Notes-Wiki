---
target: Concepts/Autocorrelation Function.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Recomputed band ±1.96/√144 = ±0.163 and the MA(1)/ARIMA(0,1,1) reading before the answer (agrees). Sample ACF formula matches fpp3 §2.8 r_k (same sum, index shifted); bounds ±1.96/√T per §2.9; slow decay with trend and spikes at seasonal lags per §2.8 and NIST 6.4.4.6; cut-off/tail-off rules per §9.5. Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.2 §2.8 Autocorrelation (r_k formula, trend and seasonal ACF patterns), §2.9 White noise (bounds ±1.96/√T), read 2026-10-18, sha256:a13a2a978731e95537586c671e4b4edda0fbb1711e81a1f01e2c2b967f4212b7 — https://otexts.com/fpp3/graphics.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.5 ACF/PACF identification, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html; NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.6 Box-Jenkins Model Identification, sha256:f6bec26320777b285bb8a39e47608912daa869d9303a23d4d47dc3f5678e8ee7 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc446.htm
- note: Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.
