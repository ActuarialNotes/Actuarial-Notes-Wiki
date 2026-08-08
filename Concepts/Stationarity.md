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
