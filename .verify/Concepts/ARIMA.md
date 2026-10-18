---
target: Concepts/ARIMA.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: Recomputed before reading the answers: AR(1) forecast 10+0.7*15 = 20.5 (agrees); ACF cut-off at lag 1 + PACF tailing after one difference -> ARIMA(0,1,1) (agrees). Definition phi(B)(1-B)^d y = theta(B)e with theta(B)=1+theta_1B+... matches fpp3 §9.5 backshift form; p/d/q meanings; special cases (AR(p)=ARIMA(p,0,0), MA(q)=ARIMA(0,0,q), random walk=ARIMA(0,1,0)) match Table 9.1; identification rules match §9.5 (ARIMA(p,d,0): ACF decaying, PACF spike at p and none beyond; mirror for q); seasonal (p,d,q)(P,D,Q)_m per §9.9. Links resolve.
- sources_checked: Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.9 §9.1 (differencing), §9.2 (backshift), §9.3-9.5 (AR, MA, ARIMA definition, Table 9.1 special cases, ACF/PACF identification), §9.9 (seasonal ARIMA), read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html; NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.6 Box-Jenkins Model Identification, sha256:f6bec26320777b285bb8a39e47608912daa869d9303a23d4d47dc3f5678e8ee7 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc446.htm
- note: Assigned reading Cowpertwait & Metcalfe (2009) is commercial and was not read beyond its front matter; checked against an open text covering the same ground (decision D7), so confidence is capped at medium.
