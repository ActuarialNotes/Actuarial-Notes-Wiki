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
