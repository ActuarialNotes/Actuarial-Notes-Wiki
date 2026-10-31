---
target: Concepts/Exponential Smoothing.md
created: 2026-10-18
---

## [F-001] Unsourced claim that the recursion is why the method is standard in high-volume forecasting
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'The recursion needs no history in storage'
- claim: — which is why it is standard in high-volume forecasting
- evidence: Neither fpp3 Ch.8 (§8.1-8.7) nor the NIST handbook says this; a causal claim stated as fact with no source (validate rule: minor). The rest of the bullet follows from the component form in fpp3 §8.1-8.3 (only the current level, trend and seasonal states carry forward).
- source_rank: 3
- proposed_action: Delete the clause.
- applied: true
- fingerprint: 1cfe8f631c88

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Deleted ' — which is why it is standard in high-volume forecasting'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Recomputed before reading the answer: 0.3*470+0.7*420 = 435; 0.3*440+0.7*435 = 436.5; flat 3-step forecast 436.5 (agree). Recursion and weighted-average forms per fpp3 §8.1; alpha by minimising one-step SSE per §8.1; flat forecast per §8.1; Holt slope and Holt-Winters additive/multiplicative seasonal equations per §8.2-8.3; ARIMA(0,1,1) equivalence per Table 9.4; prediction intervals only from the state space models per Ch.8 intro and §8.7. Syllabus scope: the page claims no exam; the MAS-II outline (p.4) excludes Cowpertwait §3.4 'Exponential smoothing and the Holt-Winters method' (Springer contents p.x), and since the 2026-10-18 resolution of F-002 on the exam page the MAS-II page no longer links it (remaining syllabus link: Exam SRM). One unsourced clause deleted (F-001).
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.8 §8.1 Simple exponential smoothing (weighted average, component form, flat forecasts, SSE estimation), §8.2-8.3 Holt and Holt-Winters, §8.5-8.7 state space models and prediction intervals, read 2026-10-18, sha256:be59a506b32748ede644be78b4509e9660d3920d21dea766901d5e9b3af71749 — https://otexts.com/fpp3/exponential-smoothing.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.10 Table 9.4 ETS(A,N,N) = ARIMA(0,1,1), read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html; CAS, Exam MAS-II Content Outline 2026 (MASII_CO_S_2026), p.3 Domain D tasks 1-4 and p.4 Cowpertwait citation 'Chapters 1-5 (excluding Sections 3.3 and 3.4), 6, 7 (Sections 7.1, 7.2 and 7.3)', D1-D4, B, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: The open text, not Cowpertwait §3.4, is the source here; the section is off the MAS-II assignment anyway. Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.

## [C-002] Conflict inside a source: Nau prints S''_{t−1} in Brown's L_t and T_t
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:16Z/23c2
- date: 2026-10-31
- locus: Double exponential smoothing — a_T and b_T
- note: Nau's 411avg page (sha256:ff2e53c1…) prints L_t = 2S'_t − S''_{t−1} and T_t = (α/(1−α))(S'_t − S''_{t−1}) in its equation images (image046, image068), while Wikipedia's Brown's LES (which cites Nau) and the page use S''_t. The same Nau page gives the equivalent form Ŷ_t = 2Y_{t−1} − Y_{t−2} − 2(1−α)e_{t−1} + (1−α)²e_{t−2} (image070). Rank-5 recomputation (40-point simulated series, α = 0.3): the S''_t version reproduces that equivalent form to 1e-14 at every t ≥ 10; the S''_{t−1} version misses it by up to 0.33. So Nau's own page is internally inconsistent and the S''_{t−1} subscript is most likely a typo; logged as a conflict inside the source, not a vault error. The page's S''_t form stands (Wikipedia, rank 3; consistent with Nau's equivalent form).

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:16Z/23c2
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole-page re-check after the G8 writer's edit (SRM and ACIA-Capstone pages link it; it was verified for MAS-II's ground — rule 6 delta check done here): SES recursion, weighted-average form, α by one-step SSE, flat forecast, Holt (α, β*) and Holt-Winters, prediction intervals only via state-space models vs FPP3 Ch.8 §8.1–8.2, §8.5–8.7; SES = ARIMA(0,1,1) vs FPP3 §9.10; new Brown's double smoothing: s^(1), s^(2) recursions, a_T = 2s^(1) − s^(2), b_T = (1−w)/w (s^(1) − s^(2)), ŷ_{T+l} = a_T + b_T l vs Wikipedia Brown's LES and Nau 411avg (with w = 1 − α); one parameter vs Holt's two vs Nau and FPP3 §8.2; Frees' w convention (weight on the past) located by the publisher's index (double smoothing p.274) and matches the SOA SRM sample solution's arithmetic (0.2 on the new value at w = 0.8); worked examples recomputed before reading: SES 435, 436.5, flat 436.5; DES s^(1) = 50, s^(2) = 45.5, a = 54.5, b = 1.5, ŷ_{T+2} = 57.5 — all agree
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.8 §8.1 simple exponential smoothing (flat forecasts; α and ℓ0 by minimising SSE), §8.2 Holt's linear trend (α and β*, level and trend equations, forecast = level + h × trend), §8.5–8.7 state space models give prediction intervals, read 2026-10-31, sha256:79e2144efc6ce25dcf7e20b566972d67ac4713ac3e7ad3355c9f53b97c261c21 — https://otexts.com/fpp3/ses.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.9 §9.3 AR(p), §9.4 AR(1) as MA(∞) with weights φ1^j, §9.5 eq.(9.4) c = μ(1 − φ1 − … − φp), §9.8 Forecasting (point-forecast recursion; MA(q) interval σ²[1+Σθ²]; AR(1) via MA(∞); stationary intervals converge; intervals too narrow — parameter and order uncertainty not included), §9.10 ETS(A,N,N) = ARIMA(0,1,1), read 2026-10-31, sha256:5f778f68d8dcb368933b34ee303bb1bc883425b2da4a801a7d5622a98a7ffa47 — https://otexts.com/fpp3/arima.html; Wikipedia, 'Exponential smoothing', §Double exponential smoothing (Holt linear), Brown's LES: one smoothing factor α; s'_t = αx_t + (1−α)s'_{t−1}; s''_t = αs'_t + (1−α)s''_{t−1}; a_t = 2s'_t − s''_t; b_t = α/(1−α)(s'_t − s''_t); F_{t+m} = a_t + m b_t, sha256:8464aa86ba580d17d37c42f4a3de908e859d91590e091f9166b6475c76a59ba8 — https://en.wikipedia.org/wiki/Exponential_smoothing; R. Nau (Duke), 'Averaging and exponential smoothing models', 'Brown's Linear (i.e., double) Exponential Smoothing' (equation images image034–068: S'_t = αY_t + (1−α)S'_{t−1}, S''_t = αS'_t + (1−α)S''_{t−1}, Ŷ_{t+k} = L_t + kT_t) and the equivalent form image070 Ŷ_t = 2Y_{t−1} − Y_{t−2} − 2(1−α)e_{t−1} + (1−α)²e_{t−2}; Holt's two-parameter L_t, T_t (image076–078), sha256:ff2e53c1722b0717c922b7072245c9197701f9ecdf274e70a8a5bde58583fc55 — https://people.duke.edu/~rnau/411avg.htm; Frees (2010), Regression Modeling with Actuarial and Financial Applications — publisher's index (Cambridge), index entries 'double smoothing, 274', 'exponential smoothed estimate, 276', 'lag k autocorrelation, 253', explanatory variable 'omitted, 197, 201' — locates the syllabus text's treatment (the book itself is commercial and was not read), sha256:1b66298471851d67b5963ff635a7aea743e34afb4ed76006e0b99fc77ad379de — https://assets.cambridge.org/97805217/60119/index/9780521760119_index.pdf
- note: Writer's Brown's double-smoothing passage and example confirmed against Wikipedia and Nau (rank 3, open) with the w = 1 − α conversion. Nau's S''_{t−1} subscript is a conflict inside that source (comment above), not a vault error. Frees 2010 Ch.9 is commercial and was not read (D7). Checked by a different agent from the writer.
