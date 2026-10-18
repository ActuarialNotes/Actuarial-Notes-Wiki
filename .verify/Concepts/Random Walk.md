---
target: Concepts/Random Walk.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Recomputed before reading the answer: 218 + 3*1.4 = 222.2; sd = sqrt(27) = 5.196; 222.2 ± 10.18 = (212.0, 232.4); 3*sqrt(6) = 7.35 (agree). Var = t sigma^2 and Corr = sqrt(t/(t+k)) recomputed from Y_t = Y_0 + sum of shocks. ARIMA(0,1,0), drift as ARIMA(0,1,0) with constant (Table 9.1); differencing gives white noise (§9.1); flat naive forecast and sqrt(h) widening (§5.2, Table 5.2). Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.1 random walk and random walk with drift, Table 9.1, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html; Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §5.2 naive forecasts optimal for a random walk, §5.5 Table 5.2 naive h-step sd = sigma*sqrt(h), read 2026-10-18, sha256:d72117b50768eed014ba8ec8bc835940cdfa2b34ca7ec76b22ce2b0484877f9a — https://otexts.com/fpp3/toolbox.html
- note: Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.
