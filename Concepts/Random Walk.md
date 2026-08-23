---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e94a0682ef7dd93a483eb8c8de84240614cb179a66f2dc5d4654444986b429b0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Random Walk.md
---

A **random walk** is the non-stationary series whose change at each step is [[White Noise|white noise]]: $Y_t = Y_{t-1} + \varepsilon_t$. It is ARIMA$(0,1,0)$, the boundary case of an AR(1) at $\phi = 1$, and the null hypothesis a unit-root test is testing.

> $$Y_t = Y_{t-1} + \varepsilon_t = Y_0 + \sum_{i=1}^{t}\varepsilon_i$$
>
> $$\mathrm{Var}(Y_t) = t\sigma^{2}, \qquad \mathrm{Corr}(Y_t, Y_{t+k}) = \sqrt{\frac{t}{t+k}}$$

- The variance grows **without bound** in $t$, so the series is not [[Stationarity|stationary]] and has no mean to revert to — it wanders
- Its [[Autocorrelation Function|ACF]] decays extremely slowly and near-linearly, the classic visual signature of a unit root
- **First differencing** makes it white noise: $\nabla Y_t = \varepsilon_t$. That is the whole content of the "I" in ARIMA
- The **$h$-step forecast is the last observation**, $\hat Y_{t+h} = Y_t$, for every $h$ — and the forecast interval widens with $\sqrt{h}$
- A **random walk with drift**, $Y_t = \delta + Y_{t-1} + \varepsilon_t$, adds a linear trend of slope $\delta$ — a [[Deterministic and Stochastic Trend|stochastic trend]], not a deterministic one

![[Media/Figures/Random_Walk.svg|340]]

> [!example]- Forecasting a Random Walk with Drift {Example}
> A quarterly loss index follows $Y_t = 1.4 + Y_{t-1} + \varepsilon_t$ with $\sigma = 3$. The latest value is $Y_{40} = 218$. Forecast three quarters ahead and give a 95% interval.
>
> > [!answer]-
> > $$\hat Y_{43} = Y_{40} + 3(1.4) = 218 + 4.2 = 222.2$$
> > The forecast error is $\varepsilon_{41}+\varepsilon_{42}+\varepsilon_{43}$, with variance $3\sigma^2 = 27$ and SD $\sqrt{27} = 5.20$:
> > $$222.2 \pm 1.96(5.20) = (212.0,\ 232.4)$$
> > The interval widens with $\sqrt{h}$, not $h$ — six quarters out the SD would be $3\sqrt{6} = 7.35$, not double.
