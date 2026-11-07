---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:939badb7e04f41ca80ee28d731704853fe1c447ec29b4f1bf0497478564d5b75
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.9 §9.1 (differencing), §9.2 (backshift), §9.3-9.5 (AR, MA, ARIMA definition, Table 9.1 special cases, ACF/PACF identification), §9.9 (seasonal ARIMA), read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.6 Box-Jenkins Model Identification, sha256:f6bec26320777b285bb8a39e47608912daa869d9303a23d4d47dc3f5678e8ee7 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc446.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/ARIMA.md
---

![[Media/Figures/ARIMA.svg|340]]

An **ARIMA** (autoregressive integrated moving average) model is a [[Time Series|time series]] model whose $d$th [[Differencing|difference]] follows an ARMA model, an [[Autoregressive Model|autoregressive]] part of order $p$ and a [[Moving Average Model|moving average]] part of order $q$. In the [[Backward Shift Operator|backward shift operator]] $\mathbf{B}$, the ARIMA($p$, $d$, $q$) model is

> $$\alpha(\mathbf{B})(1 - \mathbf{B})^d x_t = \beta(\mathbf{B})w_t$$

- $\alpha(\mathbf{B}) = 1 - \alpha_1\mathbf{B} - \cdots - \alpha_p\mathbf{B}^p$ is the AR polynomial.
- $\beta(\mathbf{B}) = 1 + \beta_1\mathbf{B} + \cdots + \beta_q\mathbf{B}^q$ is the MA polynomial.
- $(1 - \mathbf{B})^d = \nabla^d$ takes the $d$th difference.
- $w_t$ is [[White Noise|white noise]] with variance $\sigma^2$.

With $d = 0$ the model is an ARMA($p$, $q$) model: $p$ lagged values of the series and $q$ lagged white noise terms. ARIMA($p$, 0, 0) is AR($p$), ARIMA(0, 0, $q$) is MA($q$), and ARIMA(0, 1, 0) is the [[Random Walk|random walk]] $x_t = x_{t-1} + w_t$.

> [!example]- A series follows ARIMA(1, 1, 0) with $\alpha_1 = 0.4$, and $x_{99} = 100$ and $x_{100} = 104$. What are the forecasts of $x_{101}$ and $x_{102}$? {Example}
> - The model is $\nabla x_t = 0.4\,\nabla x_{t-1} + w_t$, which expands to $x_t = 1.4x_{t-1} - 0.4x_{t-2} + w_t$.
> - $\hat{x}_{101} = 1.4(104) - 0.4(100) = 105.6$.
> - $\hat{x}_{102} = 1.4(105.6) - 0.4(104) = 106.24$.

## Stationarity and invertibility of an ARMA model

An ARMA($p$, $q$) model is [[Stationarity|stationary]] if and only if every root of $\alpha(\mathbf{B}) = 0$ lies outside the unit circle. A root on or inside the unit circle makes it non-stationary. It is invertible if and only if every root of $\beta(\mathbf{B}) = 0$ lies outside the unit circle. A unit root in $\alpha(\mathbf{B})$ is what differencing removes, so an ARIMA model with $d \ge 1$ is not stationary but its $d$th difference is.

> [!example]- Is $x_t = 0.9x_{t-1} + w_t + 1.5w_{t-1}$ stationary and invertible? {Example}
> - The AR equation $1 - 0.9\mathbf{B} = 0$ has root $1/0.9 = 1.11$, outside the unit circle, so the model is stationary.
> - The MA equation $1 + 1.5\mathbf{B} = 0$ has root $-1/1.5 = -0.67$, inside the unit circle, so the model is not invertible.

## Identifying the orders

1. Plot the series and its [[Correlogram|correlogram]]. A slowly decaying ACF means the series is not stationary: difference it, and count the differences as $d$.
2. Read the [[Autocorrelation Function|ACF]] and [[Partial Autocorrelation Function|PACF]] of the stationary series together. An ACF cutting off after lag $q$ suggests MA($q$). A PACF cutting off after lag $p$ suggests AR($p$). Both tailing off suggests ARMA.
3. Fit the model and check that the correlogram of its residuals looks like white noise.

> [!example]- After a first difference, an insurance loss series has an ACF with one significant spike, at lag 1, and a PACF that tails off. What model is suggested? {Example}
> - The ACF cuts off after lag 1, which suggests MA(1) for the differenced series.
> - The PACF tails off, so there is no pure AR part.
> - One difference was needed, so $d = 1$, and the model is ARIMA(0, 1, 1).

## Seasonal ARIMA

A seasonal ARIMA($p$, $d$, $q$)($P$, $D$, $Q$)$_s$ model adds AR, differencing and MA terms at the seasonal lag $s$, such as $s = 12$ for monthly data, to model [[Seasonality|seasonality]].
