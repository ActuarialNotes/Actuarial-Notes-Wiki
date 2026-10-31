---
target: Concepts/Backward Shift Operator.md
created: 2026-10-18
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: in_review
- checks_run: Recomputed both examples before reading the answers: (1-0.5B)(1-B) = 1-1.5B+0.5B^2, roots B = 1, 2; MA root 1/0.3 = 3.33; ARIMA(1,1,1) with phi=0.5, theta=-0.3 (agrees); forecast 1.6*120-0.6*115+0.3*2 = 123.6 (agrees). B y_t = y_{t-1}, B^k, (1-B), (1-B)^d, seasonal (1-B^m), and multiplying B-polynomials per fpp3 §9.2; ARIMA operator form per §9.5; inversion of (1-phi B) per §9.4; forecast procedure per §9.8. Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.2 Backshift notation, §9.4 AR(1) as MA(∞), §9.5 ARIMA in backshift form, §9.8 ARIMA(3,1,1) expansion and forecasting steps, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html
- note: in_review: one sentence is a claim about the assigned reading's own notation ('Cowpertwait writes the same model as theta_p(B)x_t = phi_q(B)w_t, with alpha_i for the AR coefficients and beta_j for the MA ones') that no open text can confirm; it needs Cowpertwait §4.5.1 and §6.3.1/6.5.1 (pp.79, 122, 127), which were not readable. Everything else on the page checked. Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.

## [F-001] Claim about Cowpertwait's notation, unconfirmable
- entry_type: finding
- author: agent:checker-ts
- run_id: 2026-10-31T04:58Z/1486
- date: 2026-10-31
- severity: minor
- status: open
- locus: first bullet, last sentences
- claim: Previous version: 'Cowpertwait writes the same model as θ_p(B)x_t = φ_q(B)w_t, with α_i for the AR coefficients and β_j for the MA ones...'
- evidence: Cowpertwait not readable in this campaign. Replaced (commit 95e9cd30) by a sentence citing Shumway & Stoffer EZ §3.2 eq. (3.13), PDF p.61: φ(B)x_t = θ(B)w_t, with φ(B) = 1 − φ1B − … (eq. 3.3, p.57) and θ(B) = 1 + θ1B + … (eq. 3.9, p.59) — the same polynomials as the page's; confirmed in this run.
- source_rank: 3
- proposed_action: Replace the Cowpertwait notation claim with a sourced note on the w_t notation.
- applied: true
- fingerprint: 9b3ef2f749bc

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:checker-ts
- run_id: 2026-10-31T04:58Z/1486
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied (writer's edit, checked here): Cowpertwait notation claim removed; replacement sentence on Shumway & Stoffer's φ(B)x_t = θ(B)w_t confirmed against S&S EZ eqs (3.3), (3.9), (3.13).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:checker-ts
- run_id: 2026-10-31T04:58Z/1486
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Whole page re-read. B y_t = y_{t-1}, B^k, (1 - B), (1 - B)^d, seasonal (1 - B^m), multiplying B-polynomials by ordinary algebra per fpp3 §9.2; ARIMA operator form, φ(B) and θ(B), roots of φ(B) and θ(B) outside the unit circle for stationarity and invertibility per §9.5; AR(1) as MA(∞) with weights φ^j per §9.3; ψ weights in prediction intervals per §9.8; forecast steps per §9.8. New sentence on w_t notation: S&S eqs (3.3), (3.9), (3.13) — same polynomials, confirmed. Examples recomputed: (1-0.5B)(1-B) = 1-1.5B+0.5B², roots 1 and 2, MA root 1/0.3 = 3.33, ARIMA(1,1,1); (1-0.6B)(1-B) = 1-1.6B+0.6B², forecast 192 - 69 + 0.6 = 123.6 (agree).
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 9, §9.1 unit-root tests, §9.2 Backshift notation, §9.3 AR(1) as MA(∞), §9.5 ARIMA in backshift form (eq. 9.2), roots outside unit circle, ACF/PACF patterns for AR/MA identification, §9.8 forecasting steps and prediction intervals, read 2026-10-31, sha256:5f778f68d8dcb368933b34ee303bb1bc883425b2da4a801a7d5622a98a7ffa47 — https://otexts.com/fpp3/backshift.html; Shumway & Stoffer, Time Series Analysis and Its Applications Using R, EZ Edition (CC BY-NC 4.0, version 2016.12.30), Property 1.2 (PDF p.24: white-noise sample ACF approx N(0,1/n), ±2/√n), §1.5 CCF Def. 1.5/1.11, §3.2 eqs (3.3), (3.9), (3.13) (PDF pp.57-61: φ(B)x_t = θ(B)w_t), §3.7 overdifferencing (PDF p.88), §3.9 Regression with Autocorrelated Errors (PDF pp.94-96), §5.2 Unit Root Testing (PDF p.161: DF null H0: φ = 1), sha256:a0fd39387167c0c6b618f4bd853e99782e418ba4679b42542a4fb664b4aa463d — http://www.math-evry.cnrs.fr/_media/members/aguilloux/enseignements/timeseries_light_free.pdf
- note: G4 blocker cleared: the Cowpertwait notation claim is gone (F-001). Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read; checked against open texts covering the same ground (D7), so confidence is medium.
