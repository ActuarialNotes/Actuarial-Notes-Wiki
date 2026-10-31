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

## [F-001] MSE said to be in the data's units
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T19:16Z/23c2
- date: 2026-10-31
- severity: minor
- status: open
- locus: bullet 'Assess a forecast on a held-out tail', second sub-bullet, last sentence
- claim: ME, MSE and MAE are in the data's units; MPE and MAPE are unit-free
- evidence: FPP3 §5.8 (https://otexts.com/fpp3/accuracy.html, sha256:3f114823…) defines RMSE = sqrt(mean(e_t²)) and MAE = mean(|e_t|) as the scale-dependent measures 'on the same scale as the data'. MSE = mean(e_t²) is the square of RMSE, so it is in the square of the data's units (errors in $ give MSE in $²); it is RMSE, not MSE, that shares the data's units. The page's own sub-bullet defines MSE as (1/m)Σe_t², so the slip is in the units clause only.
- source_rank: 3
- proposed_action: Replace 'ME, MSE and MAE' with 'ME, RMSE and MAE'.
- applied: true
- fingerprint: ad20c279ce21

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T19:16Z/23c2
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Changed 'ME, MSE and MAE are in the data's units' to 'ME, RMSE and MAE are in the data's units', per FPP3 §5.8 (RMSE and MAE scale-dependent, on the data's scale).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:16Z/23c2
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole-page re-check after the G8 writer's edit (MAS-II page shares it — rule 6 delta check done in the same pass): conditional-expectation forecast and recursive point forecasts vs FPP3 §9.8; ψ_j = φ^j and AR(1) h-step variance vs FPP3 §9.4/§9.8 (MA(∞) weights); MA(q) at mean beyond q, stationary intervals converge, random walk σ√h vs FPP3 §9.8 and §5.5; intervals optimistic (no parameter/model-order uncertainty) vs FPP3 §9.8; new error-measure bullet: e_t = y_t − ŷ_t, p_t = 100e_t/y_t, MAE, RMSE, MAPE, percentage errors break down at y_t = 0 vs FPP3 §5.8; ME and MPE signed measures of bias vs Nau 'compare'; worked example recomputed before reading (56.6, 53.96, var 21.76, SD 4.665, (44.8, 63.1), μ = 50, SD → 5) — agrees
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.5 §5.8 Evaluating point forecast accuracy: e = y − ŷ, MAE = mean|e|, RMSE = sqrt(mean e²), errors 'on the same scale as the data', p_t = 100 e_t/y_t, MAPE = mean|p_t|, percentage errors unit-free but infinite/undefined at y_t = 0 and extreme near 0; §5.5 naïve σ_h = σ√h, read 2026-10-31, sha256:3f114823a602e9008e8a85e0e7557e03e9c59232317d61304a8b02353e4e7016 — https://otexts.com/fpp3/accuracy.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.9 §9.3 AR(p), §9.4 AR(1) as MA(∞) with weights φ1^j, §9.5 eq.(9.4) c = μ(1 − φ1 − … − φp), §9.8 Forecasting (point-forecast recursion; MA(q) interval σ²[1+Σθ²]; AR(1) via MA(∞); stationary intervals converge; intervals too narrow — parameter and order uncertainty not included), §9.10 ETS(A,N,N) = ARIMA(0,1,1), read 2026-10-31, sha256:5f778f68d8dcb368933b34ee303bb1bc883425b2da4a801a7d5622a98a7ffa47 — https://otexts.com/fpp3/arima.html; R. Nau (Duke), 'What's the bottom line? How to compare models', 'The mean error (ME) and mean percentage error (MPE)… are signed measures of error which indicate whether the forecasts are biased'; MSE = VAR(E) + ME², sha256:fd3d4ff8bd34dc51afcdcf2636240c3622b315ef75eb7de03e2845acafcc060e — https://people.duke.edu/~rnau/compare.htm
- note: Writer's new passage on ME/MPE/MSE/MAE/MAPE confirmed against FPP3 §5.8 and Nau, except the units slip (F-001, fixed). ME/MPE as averages of e_t and p_t: FPP3 gives the p_t definition and the mean-of-errors measures, Nau names ME and MPE as the signed bias measures. Frees 2010 Ch.9 (the SRM text) is commercial and was not read; open texts cover the same ground (D7). Checked by a different agent from the writer.
