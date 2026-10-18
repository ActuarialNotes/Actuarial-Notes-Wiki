---
target: Concepts/Seasonality.md
created: 2026-10-18
---

## [F-001] Example's closing sentence misdescribes an additive fit
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- severity: minor
- status: open
- locus: example 'Additive or Multiplicative?', last sentence of the answer
- claim: Modelling the raw series additively would under-fit the early years and over-fit the late ones.
- evidence: Recomputed: a constant additive Q1 effect fitted across the years is near the average excess (~303 over 180, 310, 420), so it overstates the Q1 effect in year 1 (fitted ~303 vs 180) and understates it in year 9 (~303 vs 420). 'Under-fit early / over-fit late' reads backwards on predictions and misuses over-fit (a model-complexity term). fpp3 §3.2 says only that a multiplicative decomposition is appropriate when the seasonal variation is proportional to the level. Rank-5 falsification; the sentence adds nothing the example needs.
- source_rank: 5
- proposed_action: Delete the sentence.
- applied: true
- fingerprint: 525ae81ab0f5

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Deleted the sentence; the answer ends at '... an additive seasonal model applies.'

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Recomputed before reading the answer: 180/900 = 310/1550 = 420/2100 = 20%; log(1.20) = 0.182 (agree). Fixed known period vs cycle per fpp3 §2.3; ACF spikes at multiples of the period per §2.8 and NIST 6.4.4.3; additive vs multiplicative and log equivalence per §3.2; seasonal components summing to zero per §3.4; dummies/Fourier per §7.4; seasonal difference and multiplicative seasonal ARIMA per §9.1/§9.9. One misleading sentence deleted (F-001). Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §2.3 Time series patterns (seasonal vs cyclic), §2.8 seasonal ACF, read 2026-10-18, sha256:a13a2a978731e95537586c671e4b4edda0fbb1711e81a1f01e2c2b967f4212b7 — https://otexts.com/fpp3/graphics.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §3.2 additive vs multiplicative, log transform equivalence; §3.4 seasonal components adjusted to add to zero / to m, read 2026-10-18, sha256:c11e3a143a4e52c5365ce641b76b17dd41e682b285de613906a5a661dab3e00f — https://otexts.com/fpp3/decomposition.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §7.4 seasonal dummy variables and Fourier series, read 2026-10-18, sha256:0ef490a9dabfd7bb9be230474135cd45077cf20a695a4fdc3be360ac1ebfd5f4 — https://otexts.com/fpp3/regression.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.1 seasonal differencing, §9.9 seasonal ARIMA, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html; NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.3 Seasonality, sha256:adf8c97f38a47374958e44f0839ee93378ac58d664cfb81526b475ea520cfeb5 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc443.htm
- note: Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.
