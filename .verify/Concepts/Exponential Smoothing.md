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
