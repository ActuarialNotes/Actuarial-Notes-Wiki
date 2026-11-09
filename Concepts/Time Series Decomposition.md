---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:77ffa16f1b322ecba722078510ef624fbc6cbabc130a70469f80443a2de86588
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §3.2 components, additive/multiplicative and log equivalence; §3.3 2x4-MA weights [1/8,1/4,1/4,1/4,1/8]; §3.4 classical decomposition (seasonal averaged per season and adjusted to add to zero / m; no trend estimate for the first and last m/2 observations); seasonally adjusted series, read 2026-10-18, sha256:c11e3a143a4e52c5365ce641b76b17dd41e682b285de613906a5a661dab3e00f — https://otexts.com/fpp3/decomposition.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Time Series Decomposition.md
---

![[Media/Figures/Time_Series_Decomposition.svg|340]]

A **Time Series Decomposition** is the split of a [[Time Series|time series]] into a trend, a seasonal effect and a random part, so each can be studied on its own. The additive decomposition is

> $$x_t = m_t + s_t + z_t$$

- $m_t$ is the [[Deterministic and Stochastic Trend|trend]].
- $s_t$ is the [[Seasonality|seasonal effect]].
- $z_t$ is the random part, usually correlated over time.

When the seasonal effect grows with the trend, the multiplicative decomposition $x_t = m_t \times s_t \times z_t$ is used instead.

## Estimating the trend

The trend is estimated by a moving average centred on $t$, with a window equal to the seasonal period. For monthly data the window is 12 months, and the centred moving average is

> $$\hat{m}_t = \frac{\frac{1}{2}x_{t-6} + x_{t-5} + \cdots + x_{t+5} + \frac{1}{2}x_{t+6}}{12}$$

The half weights at the ends keep the even-length window centred on $t$. For quarterly data the window runs from $x_{t-2}$ to $x_{t+2}$, with the half weights at the ends and the total divided by 4.

> [!example]- Five consecutive quarterly values are 880, 1,020, 1,150, 950 and 920. What is the centred moving average at the third quarter? {Example}
> - The window is centred on 1,150, with half weights on the two end values.
> - $\hat{m}_t = (440 + 1{,}020 + 1{,}150 + 950 + 460)/4 = 1{,}005$.

## Estimating the seasonal effect

In the additive decomposition, the seasonal effect at time $t$ is estimated by the observation minus the estimated trend:

> $$\hat{s}_t = x_t - \hat{m}_t$$

In the multiplicative decomposition it is $x_t/\hat{m}_t$. The estimates for each season are averaged over the years and adjusted so that the $s$ effects sum to zero, or average 1 when multiplicative. The seasonally adjusted series is $x_t - \hat{s}_t$.

> [!example]- A quarter's value is 1,150 and its centred moving average is 1,005. What is its seasonal effect under each decomposition? {Example}
> - Additive: $1{,}150 - 1{,}005 = 145$.
> - Multiplicative: $1{,}150/1{,}005 = 1.144$.

> [!trap] The moving average loses the ends
> A centred moving average of window $s$ has no value for the first and last $s/2$ observations. The most recent trend, the one a forecast needs, is the one the decomposition cannot estimate.
