---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:0e9620f26a5b9a39fb6a55e04f1389f1f7a9b8349c2bd4267116d627cc20c2c2
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.4 Moving average models (definition, invertibility, MA(1) constraint), §9.5 identification, §9.8 MA(q) forecast variance, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Moving Average Model.md
---

![[Media/Figures/Moving_Average_Model.svg|340]]

A **Moving Average Model** of order $q$, MA($q$), expresses the value $x_t$ of a [[Time Series|time series]] as the current [[White Noise|white noise]] term plus a linear combination of the previous $q$ white noise terms. The MA($q$) model is

> $$x_t = w_t + \beta_1 w_{t-1} + \beta_2 w_{t-2} + \cdots + \beta_q w_{t-q}$$

- $\beta_1, \ldots, \beta_q$ are the model's coefficients.
- $w_t$ has mean 0 and variance $\sigma^2$.

A series with mean $\mu$ adds $\mu$ to the right-hand side. A shock affects the series for exactly $q$ periods and then leaves it. An MA model is the "MA" in [[ARIMA]]. Its [[Autocorrelation Function|ACF]] cuts off after lag $q$, and its [[Partial Autocorrelation Function|PACF]] tails off.

An MA model is always [[Stationarity|stationary]], because a finite sum of white noise terms has a constant mean and variance whatever the coefficients. The condition on the coefficients is invertibility: every root of $1 + \beta_1\mathbf{B} + \cdots + \beta_q\mathbf{B}^q = 0$ lies outside the unit circle. A pure [[Autoregressive Model|autoregressive model]] has no MA terms, so it is always invertible.

> [!example]- A series follows $x_t = 50 + w_t + 0.4w_{t-1}$, and the latest estimated noise term is $\hat{w}_t = -3$. What are the forecasts of $x_{t+1}$ and $x_{t+2}$? {Example}
> - The future noise terms are forecast as 0.
> - $\hat{x}_{t+1} = 50 + 0.4(-3) = 48.8$.
> - $\hat{x}_{t+2} = 50$, because the shock at time $t$ has left the model after one period.

## The MA(1) model

The MA(1) model $x_t = w_t + \beta_1 w_{t-1}$ has variance and lag-1 autocorrelation

> $$\text{Var}(x_t) = \sigma^2(1 + \beta_1^2)$$

> $$\rho_1 = \frac{\beta_1}{1 + \beta_1^2}$$

Its autocorrelations at lags 2 and beyond are 0. The lag-1 autocorrelation of an MA(1) can never exceed $0.5$ in absolute value.

> [!example]- A series follows $x_t = 50 + w_t + 0.4w_{t-1}$ with $\sigma^2 = 25$. What are its variance and its lag-1 autocorrelation? {Example}
> - $\text{Var}(x_t) = 25(1 + 0.4^2) = 25(1.16) = 29$.
> - $\rho_1 = 0.4/1.16 = 0.345$.

> [!trap] An MA(1) cannot have a large lag-1 autocorrelation
> A sample ACF with $r_1 = 0.7$ that cuts off after lag 1 does not fit an MA(1), whose $|\rho_1|$ is at most $0.5$.
