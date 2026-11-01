---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:2250e9ee4f719b0e05432f44a25c28395444030799486f45ecf9c64e6dcc8d9c
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.9 §9.3 AR(p), §9.4 AR(1) as MA(∞) with weights φ1^j, §9.5 eq.(9.4) c = μ(1 − φ1 − … − φp), §9.8 Forecasting (point-forecast recursion; MA(q) interval σ²[1+Σθ²]; AR(1) via MA(∞); stationary intervals converge; intervals too narrow — parameter and order uncertainty not included), §9.10 ETS(A,N,N) = ARIMA(0,1,1), read 2026-10-31, sha256:5f778f68d8dcb368933b34ee303bb1bc883425b2da4a801a7d5622a98a7ffa47 — https://otexts.com/fpp3/arima.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.2 §2.8 Autocorrelation: r_k = Σ_{t=k+1}^T (y_t − ȳ)(y_{t−k} − ȳ) / Σ_{t=1}^T (y_t − ȳ)², read 2026-10-31, sha256:9ac4109a793cf41388d4d737c2b457334d63fe527f8276ded8ebe829b8e1d72c — https://otexts.com/fpp3/acf.html"
    - "Wikipedia, 'Autoregressive model', §Calculation of the AR parameters, Yule–Walker equations, p = 1: γ1 = φ1γ0, hence ρ1 = φ1; AR(1) variance σ²/(1−φ²), autocovariance ∝ φ^|n|, sha256:f63c5614c92d1ccc852634c1cf08c9e59f3ece7ad5a4f78d96eed080185391f8 — https://en.wikipedia.org/wiki/Autoregressive_model"
    - "Frees, Regression Modeling with Actuarial and Financial Applications (Cambridge 2010) — the author's posted Chapter 8 R script (free, book website), 'Fit AR1 model' block: lagind=index[-51], ind=index[-1], e=ind-fitted, s=sqrt(sum((e-mean(e))^2)/(length(ind)-2)) — residuals for t = 2..T, centred on their mean, divisor (T−1)−2 = T−3, sha256:b308455a8cf8b10e777ade3982e3a883edabb5ffc11aafe87ff8db6af5bc07d5 — https://instruction.bus.wisc.edu/jfrees/jfreesbooks/Regression%20Modeling/BookWebDec2010/RScripts/Chap8RCode.txt"
    - "Frees (2010), Regression Modeling with Actuarial and Financial Applications — publisher's index (Cambridge), index entries 'double smoothing, 274', 'exponential smoothed estimate, 276', 'lag k autocorrelation, 253', explanatory variable 'omitted, 197, 201' — locates the syllabus text's treatment (the book itself is commercial and was not read), sha256:1b66298471851d67b5963ff635a7aea743e34afb4ed76006e0b99fc77ad379de — https://assets.cambridge.org/97805217/60119/index/9780521760119_index.pdf"
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
- $\phi$ near 1 means slow mean reversion; $\phi$ near 0 means the series is nearly [[White Noise]]. Negative $\phi$ gives an alternating, oscillating series
- Forecasts decay geometrically back to the mean: $\hat Y_{t+h} = \mu + \phi^{h}(Y_t - \mu)$

**Fitting an AR(1) quickly** (Frees 2010, Ch. 8, the AR(1) model). Writing the model as $y_t = \beta_0 + \beta_1 y_{t-1} + \varepsilon_t$ with $\mathrm{Var}(\varepsilon_t) = \sigma^2$, the approximation to conditional least squares takes the slope from the lag-1 [[Autocorrelation Function|autocorrelation]] $r_1$ of the $T$ observations:

> $$b_1 = r_1 = \frac{\sum_{t=2}^{T}(y_{t-1} - \bar{y})(y_t - \bar{y})}{\sum_{t=1}^{T}(y_t - \bar{y})^2}$$

> $$b_0 = \bar{y}\,(1 - b_1)$$

- The fitted value at time $t$ is $\hat{y}_t = b_0 + b_1 y_{t-1}$ and the residual is $e_t = y_t - \hat{y}_t$. The first observation has no predecessor, so there are residuals only for $t = 2, \dots, T$: $T - 1$ of them
- The mean square error estimates $\sigma^2$ from those residuals, centred on their own average $\bar{e}$ (which need not be zero under this approximation). Two parameters were estimated from $T - 1$ residuals, so the divisor is $T - 3$:

> $$s^2 = \frac{1}{T - 3}\sum_{t=2}^{T}(e_t - \bar{e})^2$$

![[Media/Figures/Autoregressive_Model.svg|340]]

> [!example]- AR(1) Mean, Variance and Two-Step Forecast {Example}
> An annual loss ratio follows $Y_t = 0.24 + 0.70Y_{t-1} + \varepsilon_t$ with $\sigma = 0.05$, and $Y_{20} = 0.92$. Find the long-run mean, the stationary variance, and the two-step forecast.
>
> > [!answer]-
> > $$\mu = \frac{c}{1-\phi} = \frac{0.24}{0.30} = 0.80 \qquad \mathrm{Var}(Y_t) = \frac{0.05^{2}}{1 - 0.49} = 0.0049$$
> > $$\hat Y_{21} = 0.24 + 0.70(0.92) = 0.884$$
> > $$\hat Y_{22} = 0.24 + 0.70(0.884) = 0.859$$
> > Equivalently $\hat Y_{22} = 0.80 + 0.70^{2}(0.92 - 0.80) = 0.80 + 0.0588 = 0.859$ ✓ — the deviation from the mean shrinks by a factor $\phi$ each step.

> [!example]- Fitting an AR(1) by the Lag-1 Autocorrelation {Example}
> A series has $T = 5$ observations: $10, 11, 13, 12, 14$. Fit an AR(1) with $b_1 = r_1$ and estimate $\sigma^2$.
>
> > [!answer]-
> > **Plan.** Compute $r_1$ from deviations about the mean, then $b_0$, then the four residuals and their spread.
> >
> > The mean is $\bar{y} = 12$, so the deviations are $-2, -1, 1, 0, 2$, with squares summing to $10$. The lagged products are $(-2)(-1) + (-1)(1) + (1)(0) + (0)(2) = 1$.
> >
> > $$
> > \begin{align*}
> > b_1 &= \frac{1}{10} \\
> > &= 0.1 \\
> > b_0 &= 12(1 - 0.1) \\
> > &= 10.8
> > \end{align*}
> > $$
> >
> > The fitted values for $t = 2, \dots, 5$ are $11.8, 11.9, 12.1, 12.0$, so the residuals are $-0.8, 1.1, -0.1, 2.0$, with average $\bar{e} = 0.55$. Their squared deviations from $0.55$ sum to $4.65$:
> >
> > $$
> > \begin{align*}
> > s^2 &= \frac{4.65}{5 - 3} \\
> > &= 2.325
> > \end{align*}
> > $$
> >
> > A small $r_1$ makes $b_0$ close to $\bar{y}$: the fit is nearly a constant mean, as it should be for a series with little lag-1 dependence.
