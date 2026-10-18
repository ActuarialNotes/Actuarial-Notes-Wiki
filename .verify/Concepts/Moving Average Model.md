---
target: Concepts/Moving Average Model.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Recomputed before reading the answer: Var = 25*1.16 = 29, rho_1 = 0.4/1.16 = 0.345, one-step 50+0.4*(-3) = 48.8, two-step = mean 50 (agree). MA(q) definition per fpp3 §9.4; invertibility condition (|theta_1|<1 for MA(1)) per §9.4; ACF cut-off at q per §9.5; MA forecast beyond q = mean follows from §9.8 (future errors replaced by zero). |rho_1| <= 0.5 recomputed (max of theta/(1+theta^2) at theta=1). Over-differencing remark consistent with §9.1 ('more differences than required will induce false dynamics or autocorrelations'). Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.4 Moving average models (definition, invertibility, MA(1) constraint), §9.5 identification, §9.8 MA(q) forecast variance, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html
- note: Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.
