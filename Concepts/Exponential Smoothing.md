---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:272cdeec25ad361b0af1abad4d00bc3153bee7911205f1f927d09a3f09d71504
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.8 §8.1 simple exponential smoothing (flat forecasts; α and ℓ0 by minimising SSE), §8.2 Holt's linear trend (α and β*, level and trend equations, forecast = level + h × trend), §8.5–8.7 state space models give prediction intervals, read 2026-10-31, sha256:79e2144efc6ce25dcf7e20b566972d67ac4713ac3e7ad3355c9f53b97c261c21 — https://otexts.com/fpp3/ses.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.9 §9.3 AR(p), §9.4 AR(1) as MA(∞) with weights φ1^j, §9.5 eq.(9.4) c = μ(1 − φ1 − … − φp), §9.8 Forecasting (point-forecast recursion; MA(q) interval σ²[1+Σθ²]; AR(1) via MA(∞); stationary intervals converge; intervals too narrow — parameter and order uncertainty not included), §9.10 ETS(A,N,N) = ARIMA(0,1,1), read 2026-10-31, sha256:5f778f68d8dcb368933b34ee303bb1bc883425b2da4a801a7d5622a98a7ffa47 — https://otexts.com/fpp3/arima.html"
    - "Wikipedia, 'Exponential smoothing', §Double exponential smoothing (Holt linear), Brown's LES: one smoothing factor α; s'_t = αx_t + (1−α)s'_{t−1}; s''_t = αs'_t + (1−α)s''_{t−1}; a_t = 2s'_t − s''_t; b_t = α/(1−α)(s'_t − s''_t); F_{t+m} = a_t + m b_t, sha256:8464aa86ba580d17d37c42f4a3de908e859d91590e091f9166b6475c76a59ba8 — https://en.wikipedia.org/wiki/Exponential_smoothing"
    - "R. Nau (Duke), 'Averaging and exponential smoothing models', 'Brown's Linear (i.e., double) Exponential Smoothing' (equation images image034–068: S'_t = αY_t + (1−α)S'_{t−1}, S''_t = αS'_t + (1−α)S''_{t−1}, Ŷ_{t+k} = L_t + kT_t) and the equivalent form image070 Ŷ_t = 2Y_{t−1} − Y_{t−2} − 2(1−α)e_{t−1} + (1−α)²e_{t−2}; Holt's two-parameter L_t, T_t (image076–078), sha256:ff2e53c1722b0717c922b7072245c9197701f9ecdf274e70a8a5bde58583fc55 — https://people.duke.edu/~rnau/411avg.htm"
    - "Frees (2010), Regression Modeling with Actuarial and Financial Applications — publisher's index (Cambridge), index entries 'double smoothing, 274', 'exponential smoothed estimate, 276', 'lag k autocorrelation, 253', explanatory variable 'omitted, 197, 201' — locates the syllabus text's treatment (the book itself is commercial and was not read), sha256:1b66298471851d67b5963ff635a7aea743e34afb4ed76006e0b99fc77ad379de — https://assets.cambridge.org/97805217/60119/index/9780521760119_index.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exponential Smoothing.md
---

![[Media/Figures/Exponential_Smoothing.svg|340]]

**Exponential Smoothing** is a method that forecasts a [[Time Series|time series]] with a weighted average of its past values, with weights that decay geometrically into the past. With a smoothing weight $w$ on the past, the smoothed value at time $t$, $\hat{s}_t$, is

> $$\hat{s}_t = (1-w)\,y_t + w\,\hat{s}_{t-1}$$

> $$\hat{s}_t = (1-w)\sum_{j=0}^{\infty}w^{j}\,y_{t-j}$$

- $y_t$ is the value of the series observed at time $t$.
- $0 < w < 1$.

Other sources write $\alpha = 1 - w$, the weight on the newest value, so a $w$ of $0.9$ is an $\alpha$ of $0.1$. A $w$ near 0 tracks the series closely and reacts fast to shocks. A $w$ near 1 smooths heavily and reacts slowly. The weight is chosen by minimizing the sum of squared one-step forecast errors.

Simple exponential smoothing forecasts $\hat{s}_T$, the last smoothed value, at every horizon $l$, so its forecast is flat. It assumes no trend, and it is the optimal forecast for an ARIMA(0,1,1) model. The recursion needs only the current smoothed value in storage. It is a model-free method, with no [[Stationarity|stationarity]] requirement and no [[Autocorrelation Function|ACF]] identification, but it gives no prediction intervals without an underlying state-space model.

> [!example]- With $w = 0.7$ and $\hat{s}_9 = 420$, the values $y_{10} = 470$ and $y_{11} = 440$ are observed. What is the forecast of $y_{14}$? {Example}
> - The weight on each new value is $1 - w = 0.3$.
> - $\hat{s}_{10} = 0.3(470) + 0.7(420) = 141 + 294 = 435$.
> - $\hat{s}_{11} = 0.3(440) + 0.7(435) = 132 + 304.5 = 436.5$.
> - The forecast is flat at every horizon, so the forecast of $y_{14}$ is $436.5$.

## Double exponential smoothing

Double exponential smoothing (Brown's linear method) handles a series with a linear trend using one smoothing weight. It smooths the series, then smooths the smoothed series again, so the two smoothed values at time $t$ are

> $$\hat{s}^{(1)}_t = (1-w)\,y_t + w\,\hat{s}^{(1)}_{t-1}$$

> $$\hat{s}^{(2)}_t = (1-w)\,\hat{s}^{(1)}_t + w\,\hat{s}^{(2)}_{t-1}$$

The doubly smoothed series lags the singly smoothed one when the series trends, and the gap between them measures the trend. At the last time $T$, the intercept is

> $$a_T = 2\hat{s}^{(1)}_T - \hat{s}^{(2)}_T$$

The slope is

> $$b_T = \frac{1-w}{w}\left(\hat{s}^{(1)}_T - \hat{s}^{(2)}_T\right)$$

The forecast $l$ periods ahead continues the line, and is

> $$\hat{y}_{T+l} = a_T + b_T\, l$$

Brown's method is not Holt's linear method. Holt smooths the level and the slope with two separate parameters, and Holt-Winters adds a seasonal equation for [[Seasonality|seasonality]].

> [!example]- What are the double-smoothing and simple-smoothing forecasts of $y_{T+2}$ for this trending series? {Example}
> A trending series is smoothed with $w = 0.75$. At time $T - 1$ the smoothed values are $\hat{s}^{(1)}_{T-1} = 48$ and $\hat{s}^{(2)}_{T-1} = 44$, and then $y_T = 56$ is observed.
>
> > [!answer]-
> > - The weight on each new value is $1 - w = 0.25$.
> > - $\hat{s}^{(1)}_T = 0.25(56) + 0.75(48) = 50$.
> > - $\hat{s}^{(2)}_T = 0.25(50) + 0.75(44) = 45.5$.
> > - The intercept is $a_T = 2(50) - 45.5 = 54.5$.
> > - The slope is $b_T = \frac{0.25}{0.75}(50 - 45.5) = 1.5$.
> > - Double smoothing forecasts $\hat{y}_{T+2} = 54.5 + 1.5(2) = 57.5$.
> > - Simple smoothing forecasts $\hat{s}^{(1)}_T = 50$ at every horizon.

> [!trap] Mixing up $w$ and $\alpha$
> In $\hat{s}_t = (1-w)\,y_t + w\,\hat{s}_{t-1}$, the weight $w$ is on the past. A question that gives $w = 0.8$ puts $0.2$ on the new value. Using $0.8$ on the new value gives a forecast that follows the last observation far too closely.
