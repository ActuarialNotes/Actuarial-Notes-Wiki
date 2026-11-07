---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:de50e431372147383e5d9dec9035e2fffc3f1bf96546aa802084d0c7a06faa4f
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §2.3 trend, seasonal, cyclic patterns, §2.8 ACF, read 2026-10-18, sha256:a13a2a978731e95537586c671e4b4edda0fbb1711e81a1f01e2c2b967f4212b7 — https://otexts.com/fpp3/graphics.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.1 stationarity, differencing, seasonal differencing; §9.5 partial autocorrelations, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.2 Stationarity, sha256:bdd8bd72f717c2b0488542dade0efc709ed5cf65224e586ceb9af681f08c2099 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc442.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Time Series.md
---

![[Media/Figures/Time_Series.svg|340]]

A **Time Series** is a sequence of observations $\{x_t\}$ of one variable, recorded at successive times $t = 1, 2, \ldots, n$. Observations close together in time are usually correlated, and time series analysis models that dependence to explain the series and to forecast it.

For a [[Stationarity|stationary]] series, the dependence between observations $k$ time steps apart is measured by the autocovariance at lag $k$, which is

> $$\gamma_k = \text{Cov}(x_t, x_{t+k})$$

- $\gamma_k$ depends only on the lag $k$, not on $t$.

The lag $k$ autocorrelation $\rho_k = \gamma_k/\gamma_0$ is the correlation between observations $k$ periods apart. As a function of $k$ it is the [[Autocorrelation Function|autocorrelation function]], and its sample version is plotted as a [[Correlogram|correlogram]].

> [!example]- A stationary series has variance $\gamma_0 = 25$ and lag 1 autocovariance $\gamma_1 = 10$. What is the correlation between two consecutive observations? {Example}
> - The correlation between observations one period apart is $\rho_1 = \gamma_1/\gamma_0$.
> - $\rho_1 = 10/25 = 0.4$.

## Components of a time series

A time series is described by the features it shows over time:

1. **[[Deterministic and Stochastic Trend|Trend]]**: a long-run change in the mean level.
2. **[[Seasonality|Seasonal variation]]**: a pattern that repeats within each fixed period, such as each year.
3. **Cycles**: rises and falls with no fixed period.
4. **Random variation**: what remains, often modelled by [[White Noise|white noise]] or a stationary model.

A [[Time Series Decomposition|decomposition]] estimates the trend and the seasonal pattern and leaves the random part.

> [!example]- Monthly premium volume drifts upward over five years and spikes every January. What components does the series show? {Example}
> - The upward drift is a trend.
> - The January spike recurs every 12 months, so it is seasonal variation with period 12.

## Models for a time series

A series that is not stationary is first made stationary, by [[Differencing|differencing]] or by removing a fitted trend. The stationary part is then modelled by an [[Autoregressive Model|autoregressive model]], a [[Moving Average Model|moving average model]] or both, which together with the differencing make an [[ARIMA]] model. The fitted model gives a [[Time Series Forecast|forecast]] with a [[Prediction Interval|prediction interval]].

> [!example]- The sample autocorrelations of a series stay large and positive for many lags. What does this suggest, and what is done next? {Example}
> - Autocorrelations that decay very slowly are the sign of a series that is not stationary.
> - The series is differenced, and the differences are checked for stationarity before a model is fitted.
