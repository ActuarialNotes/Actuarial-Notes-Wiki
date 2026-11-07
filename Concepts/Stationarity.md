---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:65d93d2d75c1845c55a1bdb2aa41b382628d2531418f9ee53a967ba273178c5a
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.1 stationarity, §9.3 AR(1) and AR(2) stationarity constraints, §9.4 MA always stationary/invertibility, §9.5 'I' = differences, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.2 Stationarity, sha256:bdd8bd72f717c2b0488542dade0efc709ed5cf65224e586ceb9af681f08c2099 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc442.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stationarity.md
---

![[Media/Figures/Stationarity.svg|340]]

**Stationarity** is the property of a [[Time Series|time series]] whose mean and autocovariances do not change over time. A series $\{x_t\}$ is second-order stationary when, for every $t$,

> $$E[x_t] = \mu$$

> $$\text{Cov}(x_t, x_{t+k}) = \gamma_k$$

- $\gamma_k$ depends only on the lag $k$.

Taking $k = 0$, the variance $\gamma_0$ is also constant. A series is stationary in the mean when $E[x_t]$ is constant, and stationary in the variance when $\text{Var}(x_t)$ is constant. Strict stationarity, which needs the whole joint distribution to be unchanged by a shift in time, is a stronger condition.

> [!example]- A random walk $x_t = x_{t-1} + w_t$ starts at $x_0 = 0$, and its white noise has variance $\sigma^2$. Is it stationary? {Example}
> - Its mean is $0$ at every $t$, so it is stationary in the mean.
> - Its variance is $t\sigma^2$, which grows with $t$.
> - It is not stationary in the variance, so it is not stationary.

The signs that a series is not stationary are a trend in its level, a variance that changes over time, and sample [[Autocorrelation Function|autocorrelations]] that decay very slowly and nearly linearly. A stationary series has autocorrelations that die out quickly. [[Differencing]] removes a stochastic trend, and a log transform steadies a variance that grows with the level.

## Stationarity of an AR(1) model

The [[Autoregressive Model|AR(1)]] model is

> $$x_t = \alpha_1 x_{t-1} + w_t$$

- $\{w_t\}$ is [[White Noise|white noise]].
- The model is stationary if and only if $\lvert \alpha_1 \rvert < 1$.

A constant added to the model shifts the mean but does not change this condition. At $\alpha_1 = 1$ the model is a [[Random Walk|random walk]].

> [!example]- Which of $x_t = 0.9x_{t-1} + w_t$, $x_t = -0.5x_{t-1} + w_t$ and $x_t = 1.1x_{t-1} + w_t$ are stationary? {Example}
> - $\lvert 0.9 \rvert < 1$ and $\lvert -0.5 \rvert < 1$, so the first two are stationary.
> - $\lvert 1.1 \rvert > 1$, so the third is not.

## Stationarity of an AR($p$) model

An AR($p$) model $x_t = \alpha_1 x_{t-1} + \cdots + \alpha_p x_{t-p} + w_t$ is stationary when every root of its characteristic equation is greater than 1 in absolute value. The characteristic equation, written in the [[Backward Shift Operator|backward shift operator]] $\mathbf{B}$, is

> $$1 - \alpha_1\mathbf{B} - \cdots - \alpha_p\mathbf{B}^p = 0$$

A [[Moving Average Model|moving average model]] of finite order is stationary for any coefficients.

> [!example]- Is $x_t = 0.5x_{t-1} + 0.6x_{t-2} + w_t$ stationary? {Example}
> - The characteristic equation is $1 - 0.5\mathbf{B} - 0.6\mathbf{B}^2 = 0$.
> - Its roots are $\mathbf{B} = 0.940$ and $\mathbf{B} = -1.773$.
> - The root $0.940$ is less than 1 in absolute value, so the model is not stationary.
