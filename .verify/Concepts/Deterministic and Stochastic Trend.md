---
target: Concepts/Deterministic and Stochastic Trend.md
created: 2026-10-18
---

## [F-001] Spurious regression attributed to a 'shared drift' and stated as certain
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Spurious regression'
- claim: two independent series with stochastic trends will show a highly significant regression and a high $R^2$ purely from the shared drift.
- evidence: fpp3 §7.3 'Spurious regression': 'Regressing non-stationary time series can lead to spurious regressions ... High R^2 and high residual autocorrelation can be signs of spurious regression' - 'can', not 'will', and nothing about drift. Two independent series have no shared drift, and independent driftless random walks regress spuriously too (rank-5 reasoning), so 'purely from the shared drift' misstates the cause.
- source_rank: 3
- proposed_action: Restate to the source: 'can show a highly significant regression and a high R^2', deleting 'purely from the shared drift'.
- applied: true
- fingerprint: b58cc731cbda

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated to fpp3 §7.3: '... stochastic trends can show a highly significant regression and a high $R^2$.' Clause 'purely from the shared drift' deleted.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Recomputed the example's reasoning before reading the answer: detrended residuals with rho_1 = 0.93 slowly decaying + first difference near white noise -> stochastic trend, random walk with drift (agrees). Deterministic y = b0 + b1 t + eta (ARMA) vs stochastic (ARIMA d=1, random walk with drift when eta is white noise) per fpp3 §10.4; widening intervals for the stochastic trend per §10.4 and §5.5 (sigma*sqrt(h) for the naive method); over-differencing per §9.1. 'Objective D3' matches outline task D3 ('deterministic vs. stochastic trend'). One misstatement fixed (F-001). Dickey-Fuller null (unit root) is standard; fpp3 uses KPSS (null stationary), consistent with the page naming DF specifically. Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §10.4 Stochastic and deterministic trends, read 2026-10-18, sha256:95550082cbf540253feec34756c1bddb6550fd2cdf02857beb82defb0b570c7e — https://otexts.com/fpp3/dynamic-regression.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §7.3 Spurious regression, read 2026-10-18, sha256:0ef490a9dabfd7bb9be230474135cd45077cf20a695a4fdc3be360ac1ebfd5f4 — https://otexts.com/fpp3/regression.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.1 differencing and unit root tests, Table 9.1, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html; CAS, Exam MAS-II Content Outline 2026 (MASII_CO_S_2026), p.3 Domain D tasks 1-4 and p.4 Cowpertwait citation 'Chapters 1-5 (excluding Sections 3.3 and 3.4), 6, 7 (Sections 7.1, 7.2 and 7.3)', D1-D4, B, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:checker-ts
- run_id: 2026-10-31T04:58Z/1486
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Whole page re-read. Deterministic vs stochastic forms, treatments, widening intervals per fpp3 §10.4 (naïve σ√h, §5.5); spurious regression 'can' per §7.3; overdifferencing introduces MA(1) dependence (S&S p.88: ∇w_t = w_t - w_{t-1}, a negative MA coefficient); DF null of unit root per S&S §5.2; Var grows for a random walk. New bullets: (1) extrapolation assumes unchanged slope, stochastic safer at longer horizons — fpp3 §10.4; the clause that the assumption is easiest to defend a short way ahead is the converse reading of fpp3's 'safer ... especially for longer forecast horizons' (stochastic trends 'can change'), not stated in those words by an open text — accepted as a faithful restatement, noted here. (2) Correlated errors: OLS SEs underestimate, intervals narrow, p-values low, adjacent times positively correlated — ISLR §3.3.3; fpp3 §10.1. (3) GLS formula and variance, MLE under N(0,Σ), Σ from ρ_s / AR(1) errors — Fox §1-2; OLS-ARMA-GLS/MLE-whiteness procedure — S&S §3.9 steps (i)-(iv); GLS reduces to OLS when Σ = σ²I is algebra on Fox's formula. Example reasoning rechecked (agrees). Rule 10: compared with masi-2018f-q44 and masi-2019s-q44 — no question's wording or numbers on the page.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 10, §10.1 Estimation (ignoring error autocorrelation: tests incorrect, p-values too small), §10.4 Stochastic and deterministic trends (implicit assumption slope won't change; stochastic safer especially for longer horizons; wider intervals), read 2026-10-31, sha256:d593f252a70f4c83982101b306992502d55992de8bc4cfc02e8b27174e9db52c — https://otexts.com/fpp3/regarima.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 7, §7.3 Spurious regression, read 2026-10-31, sha256:84b44c855b4aae3d30f8ebcfc93c3c29c7aa43d57b8c4d00147e1bbda41cfbc5 — https://otexts.com/fpp3/regression.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 9, §9.1 unit-root tests, §9.2 Backshift notation, §9.3 AR(1) as MA(∞), §9.5 ARIMA in backshift form (eq. 9.2), roots outside unit circle, ACF/PACF patterns for AR/MA identification, §9.8 forecasting steps and prediction intervals, read 2026-10-31, sha256:5f778f68d8dcb368933b34ee303bb1bc883425b2da4a801a7d5622a98a7ffa47 — https://otexts.com/fpp3/backshift.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 5, §5.4 Residual diagnostics, §5.5 prediction intervals (naïve σ√h), read 2026-10-31, sha256:3f114823a602e9008e8a85e0e7557e03e9c59232317d61304a8b02353e4e7016 — https://otexts.com/fpp3/residuals.html; Shumway & Stoffer, Time Series Analysis and Its Applications Using R, EZ Edition (CC BY-NC 4.0, version 2016.12.30), Property 1.2 (PDF p.24: white-noise sample ACF approx N(0,1/n), ±2/√n), §1.5 CCF Def. 1.5/1.11, §3.2 eqs (3.3), (3.9), (3.13) (PDF pp.57-61: φ(B)x_t = θ(B)w_t), §3.7 overdifferencing (PDF p.88), §3.9 Regression with Autocorrelated Errors (PDF pp.94-96), §5.2 Unit Root Testing (PDF p.161: DF null H0: φ = 1), sha256:a0fd39387167c0c6b618f4bd853e99782e418ba4679b42542a4fb664b4aa463d — http://www.math-evry.cnrs.fr/_media/members/aguilloux/enseignements/timeseries_light_free.pdf; Fox & Weisberg, Time-Series Regression and Generalized Least Squares in R, online appendix to An R Companion to Applied Regression, 3rd ed. (rev. 2018-09-26), §1 (OLS Var σ²(X'X)^-1; ε ~ N(0,Σ) log-likelihood maximized by b_GLS = (X'Σ^-1X)^-1X'Σ^-1y, Var = (X'Σ^-1X)^-1), §2 (Σ from error autocorrelations ρ_s, AR(1) errors), read 2026-10-31, sha256:27e9d3c8913e367ad2f6d03aab0bda79ecaeef9c19a3edef7c68b62419100974 — https://www.john-fox.ca/Companion/appendices/Appendix-Timeseries-Regression.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (Springer, seventh printing, free PDF), §3.3.3 Potential Problems, 2. Correlation of Error Terms, pp.94-95 (correlated errors: SEs underestimate the true SEs, intervals too narrow, p-values too low; adjacent time points often positively correlated) — same passage as ISLR 2nd ed. §3.3.3, read 2026-10-31, sha256:dd6997f961a132293e79cdf1b4969be666dcd4a1660fc5716691b46e29e118f9 — https://www.statlearning.com/s/ISLR-Seventh-Printing.pdf
- note: Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read; checked against open texts covering the same ground (D7), so confidence is medium.
