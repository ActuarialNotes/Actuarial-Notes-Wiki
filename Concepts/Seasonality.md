---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:7ef725d3bf51fd4f9f0fb9b5cd6f2bedd8b4667dc91d414b00c839894cd818f3
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

![[Media/Figures/Seasonality.svg|340]]

**Seasonality** is a pattern in a [[Time Series|time series]] that repeats with a fixed, known period $s$: 4 for quarterly data, 12 for monthly data. A cycle differs from it by having no fixed period. In an additive model, the seasonal effect $s_t$ is

> $$x_t = m_t + s_t + z_t$$

- $m_t$ is the trend and $z_t$ the random part.
- $s_t = s_{t+s}$, and the $s$ seasonal effects sum to zero.

In the sample [[Autocorrelation Function|autocorrelations]], seasonality shows as large values at lags $s, 2s, 3s, \ldots$ that do not die away.

> [!example]- The seasonal effects of a quarterly additive model are $-40$, $25$ and $60$ for Q1 to Q3. What is the Q4 effect? {Example}
> - The four effects sum to zero.
> - The Q4 effect is $-(-40 + 25 + 60) = -45$.

## Additive and multiplicative seasonality

In multiplicative seasonality the seasonal effect scales the level instead of adding to it:

> $$x_t = m_t \times s_t \times z_t$$

A seasonal effect that grows with the level is multiplicative. Taking logs turns a multiplicative model into an additive one, $\log x_t = \log m_t + \log s_t + \log z_t$.

> [!example]- Quarterly claim counts exceed the yearly average in Q1 by 180 when the average is 900, by 310 when it is 1,550 and by 420 when it is 2,100. Is the seasonality additive or multiplicative? {Example}
> - As a share of the level, the excess is $180/900$, $310/1{,}550$ and $420/2{,}100$, each $20\%$.
> - The effect is constant in proportion and grows in amount, so it is multiplicative.
> - On $\log x_t$ the Q1 effect is the constant $\log 1.2 = 0.182$.

## Seasonal effects in a regression

A deterministic seasonal pattern is fitted by [[Linear Regression|regression]] on indicator variables, one for each season, or on sine and cosine terms of period $s$. A stochastic seasonal pattern is removed by the seasonal [[Differencing|difference]] $\nabla_s x_t = x_t - x_{t-s}$.

> [!example]- A monthly regression has a linear trend and an indicator for each month, with $\hat{x}_t = 200 + 1.5t + \hat{s}_{\text{month}}$ and a December effect of 35. What is the forecast for $t = 48$, a December? {Example}
> - The trend part is $200 + 1.5(48) = 272$.
> - Adding the December effect gives $272 + 35 = 307$.
