---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:11143675a5ffd52051c4c4834ea7654e1b4e3a306125ec85f8282800bdebf60f
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.5 partial autocorrelations (removing lags 1..k-1; first PACF = first ACF; last coefficient of an AR(k); same ±1.96/√T critical values; identification rules), read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Partial Autocorrelation Function.md
---

![[Media/Figures/Partial_Autocorrelation_Function.svg|340]]

A **Partial Autocorrelation Function** (PACF) is the correlation between $x_t$ and $x_{t-k}$ after removing the effect of the values between them, $x_{t-1}, \ldots, x_{t-k+1}$, as a function of the lag $k$. The partial autocorrelation at lag $k$ is

> $$\alpha_{kk} = \text{the coefficient of } x_{t-k} \text{ in an AR}(k) \text{ model fitted to the series}$$

At lag 1 nothing lies between the two values, so $\alpha_{11} = \rho_1$, the lag-1 [[Autocorrelation Function|autocorrelation]]. The sample PACF is plotted against $k$ with the same bounds as the [[Correlogram|correlogram]], about $\pm 2/\sqrt{n}$.

> [!example]- An AR(1) model has $\alpha_1 = 0.8$. What are its autocorrelation and partial autocorrelation at lag 2? {Example}
> - The autocorrelation is $\rho_2 = 0.8^2 = 0.64$.
> - $x_{t-2}$ affects $x_t$ only through $x_{t-1}$, so once $x_{t-1}$ is accounted for nothing is left.
> - The partial autocorrelation at lag 2 is $\alpha_{22} = 0$.

> [!idea] The idea
> The PACF cuts off where the ACF tails off, so reading the two together identifies the model.

For an [[Autoregressive Model|AR]], a [[Moving Average Model|moving average]] and an [[ARIMA|ARMA]] model the two behave as follows:

| Model | ACF | PACF |
| --- | --- | --- |
| AR($p$) | tails off | cuts off after lag $p$ |
| MA($q$) | cuts off after lag $q$ | tails off |
| ARMA($p$, $q$) | tails off | tails off |

A function cuts off when its sample values stay within the bounds after some lag. A function tails off when its values decay gradually.

> [!example]- A stationary series of 100 observations has sample ACF $0.71, 0.48, 0.35, 0.24, 0.17$ and sample PACF $0.71, -0.05, 0.08, 0.02, -0.03$ at lags 1 to 5. What model does this suggest? {Example}
> - The bounds are about $\pm 2/\sqrt{100} = \pm 0.2$.
> - The ACF decays geometrically and stays significant for four lags, so it tails off.
> - The PACF has one significant value, at lag 1, and nothing after, so it cuts off after lag 1.
> - The model is AR(1), with $\alpha_1 \approx 0.71$.

> [!trap] A significant lag-2 partial autocorrelation
> An AR(1) process has a PACF that is zero beyond lag 1. A sample PACF with a significant value at lag 2 rules out AR(1), however large the lag-1 value is.
