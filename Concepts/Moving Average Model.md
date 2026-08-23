---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:933b27c812b02687a9a55abbad676d656c21788af4c8f37fc84559507de6a668
  sources: []
  open_findings: 0
  log: .verify/Concepts/Moving Average Model.md
---

A **moving average model of order $q$**, MA($q$), writes a [[Time Series]] as a weighted sum of the current and last $q$ [[White Noise|white-noise]] shocks. It is the "MA" in [[ARIMA]], and it models a series where a shock has a **finite** memory of exactly $q$ periods.

> $$Y_t = \mu + \varepsilon_t + \theta_1\varepsilon_{t-1} + \cdots + \theta_q\varepsilon_{t-q}$$
>
> $$Y_t = \mu + \theta(B)\varepsilon_t, \qquad \theta(B) = 1 + \theta_1 B + \cdots + \theta_q B^{q}$$

- **Always [[Stationarity|stationary]]** — a finite sum of white-noise terms has constant mean and variance whatever the $\theta$'s. The condition on the $\theta$'s is *invertibility* (roots of $\theta(B)$ outside the unit circle), needed for the parameters to be identifiable
- **MA(1)**: $\mathrm{Var}(Y_t) = \sigma^2(1+\theta_1^2)$ and $\rho_1 = \dfrac{\theta_1}{1+\theta_1^{2}}$, with $\rho_k = 0$ for $k \ge 2$. That bounds $\lvert\rho_1\rvert \le 0.5$ — an MA(1) simply cannot produce a lag-1 correlation of 0.7
- **Identification:** the [[Autocorrelation Function|ACF]] cuts off after lag $q$, the [[Partial Autocorrelation Function|PACF]] tails off — the exact mirror of an [[Autoregressive Model|AR]]
- Beyond $q$ steps ahead the forecast is just the mean: shocks older than $q$ periods have left the model entirely
- An unexpected MA(1) term after [[Differencing]] is the fingerprint of over-differencing

![[Media/Figures/Moving_Average_Model.svg|340]]

> [!example]- MA(1) Autocorrelation and Forecast {Example}
> $Y_t = 50 + \varepsilon_t + 0.4\varepsilon_{t-1}$ with $\sigma^2 = 25$. Find $\mathrm{Var}(Y_t)$, $\rho_1$, and the one- and two-step forecasts given $\hat\varepsilon_t = -3$.
>
> > [!answer]-
> > $$\mathrm{Var}(Y_t) = 25(1 + 0.16) = 29 \qquad \rho_1 = \frac{0.4}{1.16} = 0.345$$
> > $$\hat Y_{t+1} = 50 + 0.4(-3) = 48.8$$
> > $$\hat Y_{t+2} = 50$$
> > Two steps out, both $\varepsilon_{t+2}$ and $\varepsilon_{t+1}$ are unknown and forecast as 0 — the shock at time $t$ has dropped out of the model, so the forecast is the mean.
