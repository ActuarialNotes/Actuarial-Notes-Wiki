---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:0cecb42673457c4f904a40c486782f0dd7795156ea63d07555af69f7592cb6bc
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §2.3 Time series patterns (seasonal vs cyclic), §2.8 seasonal ACF, read 2026-10-18, sha256:a13a2a978731e95537586c671e4b4edda0fbb1711e81a1f01e2c2b967f4212b7 — https://otexts.com/fpp3/graphics.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §3.2 additive vs multiplicative, log transform equivalence; §3.4 seasonal components adjusted to add to zero / to m, read 2026-10-18, sha256:c11e3a143a4e52c5365ce641b76b17dd41e682b285de613906a5a661dab3e00f — https://otexts.com/fpp3/decomposition.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §7.4 seasonal dummy variables and Fourier series, read 2026-10-18, sha256:0ef490a9dabfd7bb9be230474135cd45077cf20a695a4fdc3be360ac1ebfd5f4 — https://otexts.com/fpp3/regression.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.1 seasonal differencing, §9.9 seasonal ARIMA, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.3 Seasonality, sha256:adf8c97f38a47374958e44f0839ee93378ac58d664cfb81526b475ea520cfeb5 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc443.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Seasonality.md
---

**Seasonality** is a pattern in a [[Time Series]] that repeats at a fixed, known period $s$ — 4 for quarterly data, 12 for monthly, 7 for daily. It is distinct from a cycle, whose length is not fixed.

> $$Y_t = m_t + s_t + z_t \quad \text{with } s_t = s_{t+s} \text{ and } \sum_{j=1}^{s}s_j = 0$$
>
> $$\text{seasonal ARIMA: } (p,d,q)\times(P,D,Q)_s$$

- **Additive** seasonality adds a fixed amount each period; **multiplicative** scales the level, so it grows with the trend. A log transform turns the second into the first
- Signature on the [[Autocorrelation Function|ACF]]: significant spikes at lags $s, 2s, 3s, \dots$ that do not die away
- **Handling it:** seasonal [[Differencing]] $\nabla_s Y_t = Y_t - Y_{t-s}$ removes a stochastic seasonal pattern; seasonal dummies or a sine/cosine pair in a regression remove a deterministic one
- A seasonal ARIMA multiplies the seasonal and non-seasonal polynomials, so it models within-period and across-period dependence at once
- Actuarial cases: winter freeze losses, quarterly reporting lags, the seasonal pattern in the reporting of accident-year claims

![[Media/Figures/Seasonality.svg|340]]

> [!example]- Additive or Multiplicative? {Example}
> Quarterly claim counts show a Q1 excess over the yearly average of +180 in year 1 (average 900), +310 in year 5 (average 1,550) and +420 in year 9 (average 2,100). Which form of seasonality, and what transform helps?
>
> > [!answer]-
> > As a share of the level: $180/900 = 20\%$, $310/1550 = 20\%$, $420/2100 = 20\%$ — constant in **proportional** terms, growing in absolute terms.
> > **Multiplicative.** Fit on $\log Y_t$, where the Q1 effect becomes a constant $\log(1.20) = 0.182$ addition and an additive seasonal model applies.
