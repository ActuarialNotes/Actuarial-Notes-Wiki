---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:checker-ts
  content_hash: sha256:0e35e2e819cacb971cd93103ceb1771f7a014a449e33955834b196dfb75173ee
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 2, §2.8 Autocorrelation (r_k formula; trended ACF large, positive, slowly decaying; seasonal peaks), §2.9 White noise (95% of spikes within ±1.96/√T), read 2026-10-31, sha256:9ac4109a793cf41388d4d737c2b457334d63fe527f8276ded8ebe829b8e1d72c — https://otexts.com/fpp3/acf.html"
    - "Shumway & Stoffer, Time Series Analysis and Its Applications Using R, EZ Edition (CC BY-NC 4.0, version 2016.12.30), Property 1.2 (PDF p.24: white-noise sample ACF approx N(0,1/n), ±2/√n), §1.5 CCF Def. 1.5/1.11, §3.2 eqs (3.3), (3.9), (3.13) (PDF pp.57-61: φ(B)x_t = θ(B)w_t), §3.7 overdifferencing (PDF p.88), §3.9 Regression with Autocorrelated Errors (PDF pp.94-96), §5.2 Unit Root Testing (PDF p.161: DF null H0: φ = 1), sha256:a0fd39387167c0c6b618f4bd853e99782e418ba4679b42542a4fb664b4aa463d — http://www.math-evry.cnrs.fr/_media/members/aguilloux/enseignements/timeseries_light_free.pdf"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 5, §5.4 Residual diagnostics, §5.5 prediction intervals (naïve σ√h), read 2026-10-31, sha256:3f114823a602e9008e8a85e0e7557e03e9c59232317d61304a8b02353e4e7016 — https://otexts.com/fpp3/residuals.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 9, §9.1 unit-root tests, §9.2 Backshift notation, §9.3 AR(1) as MA(∞), §9.5 ARIMA in backshift form (eq. 9.2), roots outside unit circle, ACF/PACF patterns for AR/MA identification, §9.8 forecasting steps and prediction intervals, read 2026-10-31, sha256:5f778f68d8dcb368933b34ee303bb1bc883425b2da4a801a7d5622a98a7ffa47 — https://otexts.com/fpp3/backshift.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Correlogram.md
---

A **Correlogram** is a plot of the sample autocorrelations $r_k$ of a [[Time Series|time series]] against the lag $k$. It is drawn with bounds that mark how large an autocorrelation must be before it can be told apart from zero. It is the picture through which the [[Autocorrelation Function|autocorrelation function]] is read, both to identify a model and to check its residuals. The [[Partial Autocorrelation Function|partial autocorrelation function]] is plotted the same way.

For a [[White Noise|white noise]] series of $n$ observations, $r_k$ is approximately normal with mean $-1/n$ and variance $1/n$, so the approximate 95% bounds are

> $$-\frac{1}{n} \pm \frac{2}{\sqrt{n}}$$

For large $n$ the bounds are simply $\pm 2/\sqrt{n}$. If a question prints its own bounds, use the ones it gives.

The first bar is always $r_0 = 1$, and it is ignored when testing for autocorrelation. A series shows significant autocorrelation if at least one bar beyond lag 0 crosses the bounds, at an early lag or a later one. A series whose bars all lie within the bounds is consistent with white noise.

> [!example]- A series of $n = 100$ observations has $r_1 = 0.15$, $r_7 = 0.23$ and every other $r_k$ between $-0.1$ and $0.1$. Does it show significant autocorrelation? {Example}
> - The bounds are $-1/100 \pm 2/\sqrt{100} = -0.01 \pm 0.2$, from $-0.21$ to $0.19$.
> - $r_1 = 0.15$ is inside them.
> - $r_7 = 0.23$ is outside them, so the series shows significant autocorrelation.

## Patterns in a correlogram

1. A slow, near-linear decay from close to $1$ means a trend or other non-[[Stationarity|stationarity]]. [[Differencing|Difference]] the series before reading anything else.
2. Peaks at lags $12, 24, \ldots$ for monthly data, or $4, 8, \ldots$ for quarterly data, mean [[Seasonality|seasonality]].
3. A geometric decay, alternating in sign if the coefficient is negative, suggests an [[Autoregressive Model|AR]] model.
4. Spikes up to lag $q$ and nothing after suggest an [[Moving Average Model|MA($q$)]] model.
5. All bars inside the bounds look like white noise.

The slow decay shows that a trend is there, not which way it runs. A rising and a falling trend give the same correlogram, since $r_k$ is unchanged when every $x_t$ is replaced by $-x_t$. The correlogram measures linear correlation between observations at different lags. It says nothing about their distribution, such as whether they are normal.

> [!example]- A series of $n = 96$ monthly claim counts has $r_1 = 0.91$, and its autocorrelations decline slowly to $0.55$ at lag 24, with local peaks at lags 12 and 24. What does the correlogram show? {Example}
> - The bounds are about $\pm 2/\sqrt{96} = \pm 0.204$, and every bar is far outside them.
> - The slow decay says the series is not stationary, with a trend in claim volume.
> - The peaks at lags 12 and 24 say there is an annual cycle.
> - No AR or MA order can be read until the trend and the seasonal pattern are removed, for example by a first difference and a lag-12 difference.

## Residual correlogram

After a model is fitted, the correlogram of its [[Residual|residuals]] should look like white noise. If it does not, the lag of the surviving spike says what is missing:

1. A spike at a short lag, such as lag 2 after an AR(1) fit, suggests the AR or MA order is too low.
2. A spike at the seasonal lag, 12 for monthly data or 4 for quarterly, suggests a seasonal term the model lacks.
3. Autocorrelations decaying slowly across many lags suggest a trend the model has not removed.

The bounds are pointwise 95% limits, so about 1 lag in 20 crosses them by chance. A few marginal breaches at unremarkable lags are weak evidence. A clear breach at a short lag or at the seasonal lag is not.

> [!example]- An AR(1) is fitted to 120 months of claim frequency. Its residual correlogram, plotted to lag 24, has $r_5 = 0.19$ and $r_{12} = 0.31$, with every other lag within $\pm 0.10$. Is the model adequate? {Example}
> - The bounds are about $\pm 2/\sqrt{120} = \pm 0.183$.
> - $r_5 = 0.19$ is only just outside, at an unremarkable lag. With 24 lags plotted, about $24/20 = 1.2$ breaches are expected by chance.
> - $r_{12} = 0.31$ is well outside, at the seasonal lag.
> - The model is not adequate: it has left the annual pattern in the residuals, so a seasonal term is needed.

> [!trap] A trending series in the correlogram
> On a trending series nearly every bar is significant, and the plot says nothing about the AR or MA order. Remove the trend first, as described in [[Deterministic and Stochastic Trend]], then read the correlogram of what remains.
