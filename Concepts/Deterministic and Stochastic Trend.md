---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d31f6d62fc2b0c1bd31b48e572563f3fa3c8d37bcb5237a0615fd9db7c5ed9d2
  sources: []
  open_findings: 0
  log: .verify/Concepts/Deterministic and Stochastic Trend.md
---

A **deterministic trend** is a fixed function of time that the series returns to after a shock; a **stochastic trend** is a unit root, where each shock permanently moves the level. They look alike on a plot and demand opposite treatments — the distinction that objective D3 turns on.

> $$\text{deterministic: } Y_t = \alpha + \beta t + z_t, \quad z_t \text{ stationary}$$
>
> $$\text{stochastic: } Y_t = \delta + Y_{t-1} + \varepsilon_t \quad (\text{[[Random Walk]] with drift})$$

| | Deterministic (trend-stationary) | Stochastic (difference-stationary) |
| :--- | :--- | :--- |
| Effect of a shock | dies out — the series returns to the line | **permanent** — the level shifts forever |
| Correct treatment | regress on $t$, model the residuals | [[Differencing|difference]] the series |
| $\mathrm{Var}(Y_t)$ | bounded | grows with $t$ |
| Long-horizon forecast | the trend line | last value plus $h\delta$, with a widening interval |

- **Getting it wrong costs both ways.** Differencing a trend-stationary series over-differences it, injecting a spurious negative MA(1) term. Detrending a unit-root series leaves the trend behind and the residuals still non-stationary
- The formal test is a unit-root (Dickey–Fuller) test: $H_0$ is a stochastic trend
- Forecast intervals differ sharply — a deterministic trend gives intervals of roughly constant width, a stochastic one gives intervals widening as $\sqrt{h}$
- **Spurious regression**: two independent series with stochastic trends will show a highly significant regression and a high $R^2$ purely from the shared drift. Always check the residual [[Autocorrelation Function|ACF]] before believing a time-series regression

![[Media/Figures/Deterministic_and_Stochastic_Trend.svg|340]]

> [!example]- Which Trend Is It? {Example}
> A 60-quarter premium index trends upward. Regressing on $t$ gives $R^2 = 0.94$ but residuals with $\hat\rho_1 = 0.93$ decaying very slowly. First-differencing gives a series with $\hat\rho_1 = 0.11$ and nothing else significant. Which trend, and what is the model?
>
> > [!answer]-
> > **Stochastic.** The detrended residuals are still non-stationary — $\hat\rho_1 = 0.93$ with slow decay is a unit root that the regression did not remove. A true deterministic trend would leave stationary residuals.
> > First differencing produces something close to [[White Noise]], so the model is a **random walk with drift**, ARIMA(0,1,0) with a constant. The $R^2 = 0.94$ from the trend regression is the spurious-regression trap.
