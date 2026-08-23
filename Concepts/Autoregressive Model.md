---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:510dcd274ffc36f1c322bd8c4937a9787b80776186974aecc94fe3a38d01fcf6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Autoregressive Model.md
---

An **autoregressive model of order $p$**, AR($p$), regresses a [[Time Series]] on its own past $p$ values. It is the "AR" in [[ARIMA]] and the natural model for a series that reverts to a mean at a rate set by $\phi$.

> $$Y_t = c + \phi_1 Y_{t-1} + \cdots + \phi_p Y_{t-p} + \varepsilon_t$$
>
> $$\phi(B)Y_t = c + \varepsilon_t, \qquad \phi(B) = 1 - \phi_1 B - \cdots - \phi_p B^{p}$$

- **AR(1)**: $\mathrm{Corr}(Y_t, Y_{t-k}) = \phi^{k}$, mean $\mu = c/(1-\phi)$, variance $\sigma^2/(1-\phi^2)$
- [[Stationarity]] requires all roots of $\phi(B) = 0$ **outside** the unit circle; for AR(1) that is $\lvert\phi\rvert < 1$, and $\phi = 1$ is a [[Random Walk]]
- **Identification:** the [[Autocorrelation Function|ACF]] tails off geometrically, the [[Partial Autocorrelation Function|PACF]] cuts off after lag $p$
- $\phi$ near 1 means slow mean reversion and long memory; $\phi$ near 0 means the series is nearly [[White Noise]]. Negative $\phi$ gives an alternating, oscillating series
- Forecasts decay geometrically back to the mean: $\hat Y_{t+h} = \mu + \phi^{h}(Y_t - \mu)$

![[Media/Figures/Autoregressive_Model.svg|340]]

> [!example]- AR(1) Mean, Variance and Two-Step Forecast {Example}
> An annual loss ratio follows $Y_t = 0.24 + 0.70Y_{t-1} + \varepsilon_t$ with $\sigma = 0.05$, and $Y_{20} = 0.92$. Find the long-run mean, the stationary variance, and the two-step forecast.
>
> > [!answer]-
> > $$\mu = \frac{c}{1-\phi} = \frac{0.24}{0.30} = 0.80 \qquad \mathrm{Var}(Y_t) = \frac{0.05^{2}}{1 - 0.49} = 0.0049$$
> > $$\hat Y_{21} = 0.24 + 0.70(0.92) = 0.884$$
> > $$\hat Y_{22} = 0.24 + 0.70(0.884) = 0.859$$
> > Equivalently $\hat Y_{22} = 0.80 + 0.70^{2}(0.92 - 0.80) = 0.80 + 0.0588 = 0.859$ ✓ — the deviation from the mean shrinks by a factor $\phi$ each step.
