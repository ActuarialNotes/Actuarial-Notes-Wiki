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

## [F-001] Bounds centred at -1/n credited to Cowpertwait, unconfirmable
- entry_type: finding
- author: agent:checker-ts
- run_id: 2026-10-31T04:58Z/1486
- date: 2026-10-31
- severity: minor
- status: open
- locus: formula block (bounds) and first bullet; both examples' bounds
- claim: Previous version: bounds = -1/n ± 2/√n, 'r_k approximately normal with mean -1/n and variance 1/n. That gives the bounds Cowpertwait draws', examples computed with those bounds.
- evidence: No open text read gives -1/n centring: Shumway & Stoffer EZ Property 1.2 (PDF p.24): white-noise sample ACF approx normal, zero mean, sd 1/√n, ±2/√n two standard errors ~95%; fpp3 §2.9: 95% of spikes within ±1.96/√T. The page now states exactly that (writer's edit in commit 95e9cd30), examples recomputed: 2/√96 = 0.204, 2/√120 = 0.183 (r5 = 0.19 just outside; r12 = 0.31 outside).
- source_rank: 3
- proposed_action: Restate bounds to ±1.96/√n ≈ ±2/√n per the open texts; drop the Cowpertwait attribution; recompute examples.
- applied: true
- fingerprint: 275840466b43

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:checker-ts
- run_id: 2026-10-31T04:58Z/1486
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied (writer's edit, checked here): bounds now ±1.96/√n ≈ ±2/√n with r_k ~ N(0, 1/n) for white noise, per Shumway & Stoffer Property 1.2 and fpp3 §2.9; no Cowpertwait attribution remains; examples recomputed and agree.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:checker-ts
- run_id: 2026-10-31T04:58Z/1486
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Whole page re-read. r_k = c_k/c_0 with c_k's 1/n cancels to fpp3 §2.8's r_k. Bounds ±1.96/√n ≈ ±2/√n and r_k ~ N(0, 1/n) for white noise per S&S Property 1.2 and fpp3 §2.9. Patterns: slow decay for trend (fpp3 §2.8; S&S p.88), seasonal peaks (§2.8), AR geometric/MA cut-off at lag q (fpp3 §9.5; AR(1) ρ_k = φ^k), white noise within bounds (§2.9). Residual check per fpp3 §5.4. Chance breaches 1 in 20 per §2.9. Bounds hold only for assessing whiteness (S&S after Property 1.2). CCF over ± lags (S&S Def. 1.11, not symmetric). Direction-of-trend sentence: r_k is invariant under x_t -> -x_t — verified as an algebraic identity on fpp3's r_k formula (numerator: both deviations change sign, product unchanged; denominator squared) — a derivation from a sourced formula, no further source needed. Examples recomputed before reading answers: 2/√96 = 0.204 (all bars to 0.55 outside); 2/√120 = 0.1826 -> 0.183, r5 = 0.19 just outside, r12 = 0.31 outside at the seasonal lag, 24 × 0.05 = 1.2 (agree). Rule 10: compared with masi-2018f-q41, masi-2018s-042, masii-an-005: the new text carries no served question's numbers.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 2, §2.8 Autocorrelation (r_k formula; trended ACF large, positive, slowly decaying; seasonal peaks), §2.9 White noise (95% of spikes within ±1.96/√T), read 2026-10-31, sha256:9ac4109a793cf41388d4d737c2b457334d63fe527f8276ded8ebe829b8e1d72c — https://otexts.com/fpp3/acf.html; Shumway & Stoffer, Time Series Analysis and Its Applications Using R, EZ Edition (CC BY-NC 4.0, version 2016.12.30), Property 1.2 (PDF p.24: white-noise sample ACF approx N(0,1/n), ±2/√n), §1.5 CCF Def. 1.5/1.11, §3.2 eqs (3.3), (3.9), (3.13) (PDF pp.57-61: φ(B)x_t = θ(B)w_t), §3.7 overdifferencing (PDF p.88), §3.9 Regression with Autocorrelated Errors (PDF pp.94-96), §5.2 Unit Root Testing (PDF p.161: DF null H0: φ = 1), sha256:a0fd39387167c0c6b618f4bd853e99782e418ba4679b42542a4fb664b4aa463d — http://www.math-evry.cnrs.fr/_media/members/aguilloux/enseignements/timeseries_light_free.pdf; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 5, §5.4 Residual diagnostics, §5.5 prediction intervals (naïve σ√h), read 2026-10-31, sha256:3f114823a602e9008e8a85e0e7557e03e9c59232317d61304a8b02353e4e7016 — https://otexts.com/fpp3/residuals.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 9, §9.1 unit-root tests, §9.2 Backshift notation, §9.3 AR(1) as MA(∞), §9.5 ARIMA in backshift form (eq. 9.2), roots outside unit circle, ACF/PACF patterns for AR/MA identification, §9.8 forecasting steps and prediction intervals, read 2026-10-31, sha256:5f778f68d8dcb368933b34ee303bb1bc883425b2da4a801a7d5622a98a7ffa47 — https://otexts.com/fpp3/backshift.html
- note: G4 blocker cleared: the Cowpertwait -1/n bounds are gone (F-001). Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read; checked against open texts covering the same ground (D7), so confidence is medium. Observation, not a finding: the pre-existing Example 2 (120 months, AR(1), lag-12 residual spike) parallels the vault's own masii-an-005, added in the same commit 5bdec92f; numbers differ (0.31 vs 0.35).
