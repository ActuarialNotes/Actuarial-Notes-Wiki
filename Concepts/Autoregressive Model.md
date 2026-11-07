---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:c517f77a2d2fcbeac0804f13b0f04c797e4ed647741b7ea25b0a326662a1d9e4
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

![[Media/Figures/Autoregressive_Model.svg|340]]

An **Autoregressive Model** of order $p$, AR($p$), expresses the value $x_t$ of a [[Time Series|time series]] as a linear combination of its previous $p$ values plus a [[White Noise|white noise]] term $w_t$. The AR($p$) model is

> $$x_t = \alpha_1 x_{t-1} + \alpha_2 x_{t-2} + \cdots + \alpha_p x_{t-p} + w_t$$

- $\alpha_1, \ldots, \alpha_p$ are the model's coefficients.
- $w_t$ has mean 0 and variance $\sigma^2$.

The order is the largest lag with a nonzero coefficient, so a model with lags 1 and 2 is AR(2). An AR model is the "AR" in [[ARIMA]]. Its [[Autocorrelation Function|ACF]] tails off, and its [[Partial Autocorrelation Function|PACF]] cuts off after lag $p$.

> [!example]- A series follows $x_t = 0.6x_{t-1} - 0.2x_{t-2} + w_t$, with $x_{9} = 5$ and $x_{10} = 8$. What is the one-step forecast of $x_{11}$? {Example}
> - The future noise term $w_{11}$ is forecast as its mean, 0.
> - $\hat{x}_{11} = 0.6(8) - 0.2(5) = 4.8 - 1.0 = 3.8$.

## Model with a constant

A series with a nonzero mean is modelled with a constant $\alpha_0$:

> $$x_t = \alpha_0 + \alpha_1 x_{t-1} + \cdots + \alpha_p x_{t-p} + w_t$$

If the model is stationary, its mean is

> $$\mu = \frac{\alpha_0}{1 - \alpha_1 - \cdots - \alpha_p}$$

The one-step forecast is $\alpha_0$ plus the coefficients times the latest values, and multi-step forecasts converge toward $\mu$. A stationary AR model is therefore mean reverting.

> [!example]- A stationary series follows $x_t = 12 + 0.5x_{t-1} + 0.3x_{t-2} + w_t$. What is its mean? {Example}
> - $\mu = 12/(1 - 0.5 - 0.3) = 12/0.2 = 60$.

## Stationarity of an AR model

The characteristic equation of an AR($p$) model, in the [[Backward Shift Operator|backward shift operator]] $\mathbf{B}$, is

> $$1 - \alpha_1\mathbf{B} - \alpha_2\mathbf{B}^2 - \cdots - \alpha_p\mathbf{B}^p = 0$$

The model is [[Stationarity|stationary]] if and only if every root of this equation lies outside the unit circle, that is, has absolute value greater than 1. A root on or inside the unit circle makes the series non-stationary. The constant $\alpha_0$ plays no part. A pure AR model has no moving average terms, so it is always invertible.

> [!example]- Are $x_t = 0.5x_{t-1} + 0.3x_{t-2} + w_t$ and $x_t = 0.5x_{t-1} + 0.5x_{t-2} + w_t$ stationary? {Example}
> - The first model's equation is $1 - 0.5\mathbf{B} - 0.3\mathbf{B}^2 = 0$, with roots $1.17$ and $-2.84$.
> - Both roots are outside the unit circle, so the first model is stationary.
> - The second model's equation is $1 - 0.5\mathbf{B} - 0.5\mathbf{B}^2 = 0$, and $\mathbf{B} = 1$ solves it, since $1 - 0.5 - 0.5 = 0$.
> - A root on the unit circle makes the second model non-stationary.

## The AR(1) model

The AR(1) model $x_t = \alpha_1 x_{t-1} + w_t$ has the characteristic equation $1 - \alpha_1\mathbf{B} = 0$, with root $\mathbf{B} = 1/\alpha_1$. It is stationary if and only if $|\alpha_1| < 1$. With $\alpha_1 = 1$ it is a [[Random Walk|random walk]]. A stationary AR(1) has autocorrelation and variance

> $$\rho_k = \alpha_1^{\,k}$$

> $$\text{Var}(x_t) = \frac{\sigma^2}{1 - \alpha_1^2}$$

A negative $\alpha_1$ makes consecutive values negatively correlated, so the series alternates in sign and looks jagged. A positive $\alpha_1$ gives a smoother series. As $|\alpha_1|$ approaches 1 the variance grows, the swings are larger and deviations from the mean persist longer. A small $|\alpha_1|$ gives a series close to white noise. The one-step forecast of a zero-mean AR(1) is $\hat{x}_{t+1} = \alpha_1 x_t$, which depends only on the latest value.

> [!example]- An annual loss ratio follows $x_t = 0.24 + 0.70x_{t-1} + w_t$ with $\sigma = 0.05$, and $x_{20} = 0.92$. What are its mean, its variance and the forecasts of $x_{21}$ and $x_{22}$? {Example}
> - The mean is $\mu = 0.24/(1 - 0.70) = 0.80$.
> - The variance is $0.05^2/(1 - 0.70^2) = 0.0025/0.51 = 0.0049$.
> - $\hat{x}_{21} = 0.24 + 0.70(0.92) = 0.884$.
> - $\hat{x}_{22} = 0.24 + 0.70(0.884) = 0.859$, a step closer to the mean of 0.80.

## Fitting an AR(1) by conditional least squares

Written as $x_t = \alpha_0 + \alpha_1 x_{t-1} + w_t$, an AR(1) fitted to $n$ observations by approximate conditional least squares has the estimates

> $$\hat{\alpha}_1 = r_1$$

> $$\hat{\alpha}_0 = \bar{x}(1 - \hat{\alpha}_1)$$

- $r_1$ is the lag-1 sample [[Autocorrelation Function#Sample autocorrelation|autocorrelation]] of the series.
- $\bar{x}$ is the sample mean of all $n$ observations.

The fitted value at time $t$ is $\hat{\alpha}_0 + \hat{\alpha}_1 x_{t-1}$, and the [[Residual|residual]] $e_t$ is $x_t$ minus it. The first observation has no predecessor, so there are $n - 1$ residuals. The variance $\sigma^2$ is estimated by their mean square error, centred on their own average $\bar{e}$, with divisor $n - 3$:

> $$s^2 = \frac{1}{n - 3}\sum_{t=2}^{n}(e_t - \bar{e})^2$$

> [!example]- An AR(1) is fitted to the series $10, 11, 13, 12, 14$ by approximate conditional least squares. What are $\hat{\alpha}_1$, $\hat{\alpha}_0$ and $s^2$? {Example}
> - The mean is $\bar{x} = 12$, and the lag-1 sample autocorrelation is $r_1 = 1/10 = 0.1$, so $\hat{\alpha}_1 = 0.1$.
> - $\hat{\alpha}_0 = 12(1 - 0.1) = 10.8$.
> - The fitted values for $t = 2, \ldots, 5$ are $11.8, 11.9, 12.1, 12.0$, so the residuals are $-0.8, 1.1, -0.1, 2.0$, with average $\bar{e} = 0.55$.
> - Their squared deviations from $0.55$ sum to $4.65$, so $s^2 = 4.65/(5 - 3) = 2.325$.
