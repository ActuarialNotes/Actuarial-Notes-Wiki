---
target: Concepts/White Noise.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Recomputed before reading the answer: bands ±1.96/10 = ±0.196; rho_2 = -0.31 outside -> not white noise (agrees). Definition per fpp3 §2.9; bounds and chance breaches per §2.9; Ljung-Box statistic per §5.4 and df h-p-q per §9.7; normality needed for intervals per §9.8. Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §2.9 White noise (no autocorrelation; 95% of spikes within ±1.96/√T), read 2026-10-18, sha256:a13a2a978731e95537586c671e4b4edda0fbb1711e81a1f01e2c2b967f4212b7 — https://otexts.com/fpp3/graphics.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §5.4 Ljung-Box Q* = T(T+2) sum r_k^2/(T-k), read 2026-10-18, sha256:d72117b50768eed014ba8ec8bc835940cdfa2b34ca7ec76b22ce2b0484877f9a — https://otexts.com/fpp3/toolbox.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.7 portmanteau degrees of freedom l - K; §9.8 intervals assume uncorrelated, normal residuals, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html
- note: Cowpertwait's own definition of discrete white noise (§4.2.2) was not read; if it is the i.i.d. form, the page's uncorrelated (weak) form is the fpp3 one - a notation note for a later reader of §4.2.2, not a finding. Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.
