---
target: Concepts/Correlogram.md
created: 2026-10-18
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: in_review
- checks_run: Recomputed both examples before reading the answers: bounds -1/96 ± 2/√96 = (-0.215, 0.194); -1/120 ± 2/√120 = (-0.191, 0.174); r5 = 0.18 just outside, 24*0.05 = 1.2 chance breaches; r12 = 0.31 outside at the seasonal lag (all agree). r_k = c_k/c_0 matches fpp3 §2.8; patterns (slow decay for trend, peaks at seasonal lags, white noise inside bounds, ~5% chance breaches) per §2.8-2.9 and §5.4; residual-check use per §5.4. Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §2.8 Autocorrelation (r_k, ACF of trended and seasonal data), §2.9 White noise (95% of spikes within ±1.96/√T), read 2026-10-18, sha256:a13a2a978731e95537586c671e4b4edda0fbb1711e81a1f01e2c2b967f4212b7 — https://otexts.com/fpp3/graphics.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.5 identification, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §5.4 residual diagnostics, read 2026-10-18, sha256:d72117b50768eed014ba8ec8bc835940cdfa2b34ca7ec76b22ce2b0484877f9a — https://otexts.com/fpp3/toolbox.html
- note: in_review: the page's bounds -1/n ± 2/√n (r_k approximately N(-1/n, 1/n) under rho_k = 0) are attributed to Cowpertwait §2.3.1 (pp.35-36), which was not readable; the open text gives only ±1.96/√T. The examples are computed with the Cowpertwait bounds, so they cannot be confirmed by a second source until §2.3.1 is read. Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.
