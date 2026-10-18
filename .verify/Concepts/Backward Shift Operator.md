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
