---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:843e4ccd164434297a99ebea6db07030b43a1b61ced3f8375c185068dd1e7ef7
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.1 Stationarity and differencing (first, second and seasonal differences; 'do as few differences as necessary'; false dynamics from over-differencing), §9.2 backshift form, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.2 Stationarity, sha256:bdd8bd72f717c2b0488542dade0efc709ed5cf65224e586ceb9af681f08c2099 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc442.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Differencing.md
---

![[Media/Figures/Differencing.svg|340]]

**Differencing** is the replacement of a [[Time Series|time series]] by its changes from one period to the next. It turns a series with a stochastic trend into a [[Stationarity|stationary]] one. The first difference of a series $\{x_t\}$ is

> $$\nabla x_t = x_t - x_{t-1}$$

In the [[Backward Shift Operator|backward shift operator]], $\nabla = 1 - \mathbf{B}$, and differencing $d$ times is $\nabla^d = (1 - \mathbf{B})^d$. The number of differences is the $d$ of an [[ARIMA]]$(p, d, q)$ model.

> [!example]- A series is $12, 15, 19, 22, 27$. What are its first differences? {Example}
> - Each first difference is a value minus the one before it.
> - The differences are $3, 4, 3, 5$.

## Differencing a linear trend

For a linear trend plus a stationary series, $x_t = \alpha_0 + \alpha_1 t + z_t$, the first difference is

> $$\nabla x_t = \alpha_1 + z_t - z_{t-1}$$

The intercept cancels and the slope remains as a constant. One difference removes a linear trend, and a second removes a quadratic one.

> [!example]- A series is $x_t = 5 + 2t + z_t$, with $\{z_t\}$ white noise. What is the mean of its first differences? {Example}
> - The first difference is $2 + z_t - z_{t-1}$.
> - The white noise terms have mean zero, so the mean of the differences is $2$, the slope.

## Seasonal differencing

The seasonal difference at lag $s$ removes a pattern that repeats every $s$ periods:

> $$\nabla_s x_t = x_t - x_{t-s} = (1 - \mathbf{B}^s)\,x_t$$

- $s = 4$ for quarterly data and $s = 12$ for monthly data.

> [!example]- Quarterly claim counts are 210 in Q1 of one year and 234 in Q1 of the next. What is the seasonal difference at the second Q1? {Example}
> - The seasonal difference compares a quarter with the same quarter a year earlier, at lag $s = 4$.
> - $\nabla_4 x_t = 234 - 210 = 24$.

## Choosing the number of differences

A series whose sample [[Autocorrelation Function|autocorrelations]] decay very slowly is differenced. When the autocorrelations of the differences die out quickly, the differences are stationary and no further difference is needed. Differencing more than needed inflates the variance and creates a large negative autocorrelation at lag 1.

> [!example]- A series' autocorrelations fall from 0.97 at lag 1 to 0.71 at lag 10. After one difference they are 0.31, 0.05 and −0.02, and after a second they are −0.48, 0.02 and 0.01. How many differences should be taken? {Example}
> - The slow decay of the original autocorrelations shows the series is not stationary.
> - After one difference the autocorrelations die out quickly, so the differences are stationary.
> - The second difference creates a large negative lag 1 autocorrelation, the sign of differencing too often.
> - One difference should be taken.
