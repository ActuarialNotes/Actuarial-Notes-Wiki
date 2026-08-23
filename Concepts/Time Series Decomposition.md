---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ef294381eee2a7f233116f6808e04d2d785d6b4d62baf5809264de564acdf5f5
  sources: []
  open_findings: 0
  log: .verify/Concepts/Time Series Decomposition.md
---

**Decomposition** splits a [[Time Series]] into a trend-cycle component, a seasonal component and an irregular remainder, so each can be inspected and modelled on its own.

> $$\text{additive: } Y_t = m_t + s_t + z_t$$
>
> $$\text{multiplicative: } Y_t = m_t \times s_t \times z_t$$

- **Trend $m_t$** is estimated by a centred moving average of length $s$ — for quarterly data $\hat m_t = \tfrac{1}{8}Y_{t-2} + \tfrac14(Y_{t-1}+Y_t+Y_{t+1}) + \tfrac18 Y_{t+2}$, the two half-weights at the ends keeping the window centred
- **Seasonal $s_t$** is the average detrended value for each period, re-centred so the $s$ factors sum to 0 (additive) or average 1 (multiplicative)
- **Irregular $z_t$** is what is left, and is what an [[ARIMA]] model is then fitted to
- A multiplicative decomposition is an additive one on $\log Y_t$: $\log Y_t = \log m_t + \log s_t + \log z_t$
- The moving average **loses $s/2$ observations at each end**, so the most recent trend estimate — the one a forecaster wants — is the one decomposition cannot give
- **Seasonal adjustment** is $Y_t - \hat s_t$ (or $Y_t/\hat s_t$), the series with [[Seasonality]] removed

![[Media/Figures/Time_Series_Decomposition.svg|340]]

> [!example]- Extracting a Seasonal Factor {Example}
> Quarterly claim counts for one year are 880, 1,020, 1,150, 950, and the centred moving average at Q3 is 1,000. What is the Q3 detrended value under each decomposition?
>
> > [!answer]-
> > $$\text{additive: } 1{,}150 - 1{,}000 = +150$$
> > $$\text{multiplicative: } 1{,}150 / 1{,}000 = 1.15$$
> > Averaging these over all the years in the data gives the raw Q3 seasonal, which is then re-centred so the four additive factors sum to 0 (or the four multiplicative factors average 1). Reporting an unadjusted factor is the common slip — it leaves a bias in the trend.
