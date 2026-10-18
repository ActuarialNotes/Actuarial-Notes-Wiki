---
target: Concepts/Time Series Forecast.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Recomputed before reading the answer: Y51 = 56.6, Y52 = 53.96, var 16*1.36 = 21.76, sd 4.665, interval (44.8, 63.1), limit mu = 50, sd limit 4/sqrt(0.64) = 5 (agree); AR(1) h-step variance sigma^2(1-phi^2h)/(1-phi^2) recomputed from psi_j = phi^j. Recursion per fpp3 §9.8; interval formula per §9.8; 'too narrow' per §9.8; test-set accuracy measures per §5.8. 'Objective D4' matches outline task D4. Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.8 Forecasting (three-step recursion; one-step interval ±1.96 sigma; MA(q) forecast variance; AR(1) via MA(∞); intervals too narrow because parameter and order variation are excluded), read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §5.8 Evaluating point forecast accuracy (test set, MAE, RMSE, MAPE), read 2026-10-18, sha256:d72117b50768eed014ba8ec8bc835940cdfa2b34ca7ec76b22ce2b0484877f9a — https://otexts.com/fpp3/toolbox.html; CAS, Exam MAS-II Content Outline 2026 (MASII_CO_S_2026), p.3 Domain D tasks 1-4 and p.4 Cowpertwait citation 'Chapters 1-5 (excluding Sections 3.3 and 3.4), 6, 7 (Sections 7.1, 7.2 and 7.3)', D1-D4, B, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.
