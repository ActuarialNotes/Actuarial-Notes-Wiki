---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9c6169a6422a289521588c74950b081c9132c39d8da13b5b2644d15327b0c1a7
  sources: []
  open_findings: 0
  log: .verify/Concepts/Autocorrelation Function.md
---

The **autocorrelation function (ACF)** gives the correlation between a [[Time Series]] and itself $k$ periods earlier. Plotted against $k$ — the **correlogram** — it is the primary tool for identifying the MA order of an [[ARIMA]] model and for checking residuals.

> $$\rho_k = \frac{\gamma_k}{\gamma_0} = \frac{\mathrm{Cov}(Y_t, Y_{t+k})}{\mathrm{Var}(Y_t)}$$
>
> $$\hat{\rho}_k = \frac{\sum_{t=1}^{n-k}(y_t - \bar{y})(y_{t+k} - \bar{y})}{\sum_{t=1}^{n}(y_t - \bar{y})^{2}}$$

- $\rho_0 = 1$ always, and $\rho_k = \rho_{-k}$, so only positive lags are plotted
- **Significance bands** are $\pm 1.96/\sqrt{n}$; a spike inside them is indistinguishable from zero
- **The identification rule:** an MA($q$) process has $\rho_k = 0$ for $k > q$ — the ACF **cuts off** after lag $q$. An AR($p$) process has an ACF that **tails off** geometrically
- Slow, near-linear decay signals non-stationarity and calls for [[Differencing]]; a spike at lag $s$ and its multiples signals [[Seasonality]]
- On residuals it is the [[White Noise]] check: all spikes inside the bands means the model has extracted the structure
- The companion [[Partial Autocorrelation Function]] does the reverse job, cutting off for AR and tailing off for MA

![[Media/Figures/Autocorrelation_Function.svg|340]]

> [!example]- Identifying a Model from the ACF {Example}
> A differenced series of 144 monthly observations has $\hat\rho_1 = -0.52$, $\hat\rho_2 = 0.06$, $\hat\rho_3 = -0.04$, $\hat\rho_4 = 0.09$, with the PACF tailing off. What model does this suggest?
>
> > [!answer]-
> > Bands: $\pm 1.96/\sqrt{144} = \pm 0.163$. Only $\hat\rho_1$ clears them; lags 2–4 are all inside.
> > ACF **cuts off after lag 1**, PACF **tails off** → **MA(1)** on the differenced series, i.e. **ARIMA(0, 1, 1)**.
