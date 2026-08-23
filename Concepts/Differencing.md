---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b6c04fec0fa40853bfafa2b48cb79b2388d27c83093bb53394077ce016929507
  sources: []
  open_findings: 0
  log: .verify/Concepts/Differencing.md
---

**Differencing** replaces a [[Time Series]] by its period-to-period changes. It is the standard route from a non-stationary series to a [[Stationarity|stationary]] one, and the operation the "I" in [[ARIMA]] counts.

> $$\nabla Y_t = Y_t - Y_{t-1} = (1 - B)Y_t$$
>
> $$\nabla^{d} Y_t = (1-B)^{d}Y_t, \qquad \nabla_s Y_t = Y_t - Y_{t-s}$$

- **One difference removes a linear trend**; two remove a quadratic. In practice $d \in \{0, 1, 2\}$ — beyond that the series is almost certainly being over-differenced
- **Seasonal differencing** $\nabla_s$ at lag $s$ (4 for quarterly, 12 for monthly) removes a fixed seasonal pattern, and is written $D$ in ARIMA$(p,d,q)(P,D,Q)_s$
- **Over-differencing** is a real cost: it inflates the variance and injects an artificial negative MA term, visible as an [[Autocorrelation Function|ACF]] with a large negative spike at lag 1
- Differencing handles a **stochastic** trend; a genuinely [[Deterministic and Stochastic Trend|deterministic]] trend is better removed by regressing on $t$
- Forecasts must be **integrated back** to the original scale, which is where a random walk's flat forecast comes from
- Signals for $d$: an ACF decaying very slowly and near-linearly means difference again; a negative lag-1 spike after differencing means go back one

![[Media/Figures/Differencing.svg|340]]

> [!example]- How Many Differences? {Example}
> A quarterly premium series rises steadily. Its ACF decays from 0.97 at lag 1 to 0.71 at lag 10. After one difference the ACF is 0.31, 0.05, −0.02, …; after a second it is −0.48, 0.02, 0.01, …. Choose $d$.
>
> > [!answer]-
> > **$d = 1$.** The original ACF's slow near-linear decay is the unit-root signature. After one difference the autocorrelations die out quickly — that is stationary, with a small MA(1) or AR(1) left to model.
> > The second difference introduces $\hat\rho_1 = -0.48$, a large negative lag-1 spike from **over-differencing**, and inflates the variance for nothing.
