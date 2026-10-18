---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:f54bbcbabf6d75479097ee1d8830e1bf5546326ed9e509eec65658a01cae021a
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.1 stationarity, §9.3 AR(1) and AR(2) stationarity constraints, §9.4 MA always stationary/invertibility, §9.5 'I' = differences, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.2 Stationarity, sha256:bdd8bd72f717c2b0488542dade0efc709ed5cf65224e586ceb9af681f08c2099 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc442.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stationarity.md
---

A [[Time Series]] is **(weakly) stationary** when its mean, variance and autocovariances do not depend on time — only on the lag. Stationarity is the assumption every [[ARIMA]] result rests on, because a model whose behaviour drifts cannot be estimated from one realization.

> $$E[Y_t] = \mu \quad \text{for all } t$$
>
> $$\mathrm{Cov}(Y_t, Y_{t+k}) = \gamma_k \quad \text{depends on } k \text{ only}$$

- Weak (second-order) stationarity constrains the first two moments; **strict** stationarity requires the whole joint distribution to be shift-invariant and is rarely needed
- Symptoms of non-stationarity: a visible **trend** in the mean, a variance that grows with level, or an [[Autocorrelation Function]] that decays very slowly and nearly linearly
- **Fixes**: [[Differencing]] removes a stochastic trend, a log transform stabilizes a variance that scales with the mean, and seasonal differencing removes fixed [[Seasonality]]
- An AR(1) $Y_t = \phi Y_{t-1} + \varepsilon_t$ is stationary exactly when $\lvert\phi\rvert < 1$; at $\phi = 1$ it is a [[Random Walk]] and there is no fixed mean to return to
- MA processes are stationary for any finite parameters — it is the AR side that carries the condition
- The "I" in ARIMA is the number of differences taken to reach stationarity

![[Media/Figures/Stationarity.svg|340]]

> [!example]- Is This AR(2) Stationary? {Example}
> Is $Y_t = 0.5Y_{t-1} + 0.6Y_{t-2} + \varepsilon_t$ stationary?
>
> > [!answer]-
> > The characteristic equation is $1 - 0.5B - 0.6B^2 = 0$; stationarity requires all roots **outside** the unit circle.
> > $$B = \frac{0.5 \pm \sqrt{0.25 + 2.4}}{-1.2} \Rightarrow B = \frac{0.5 \pm 1.628}{-1.2}$$
> > giving $B = -1.774$ and $B = 0.940$. The second root has $\lvert B\rvert = 0.94 < 1$ — **inside** the unit circle, so the series is **not stationary**.
> > (Quick check for AR(2): stationarity needs $\phi_1 + \phi_2 < 1$. Here $0.5 + 0.6 = 1.1 > 1$, which fails immediately.)
