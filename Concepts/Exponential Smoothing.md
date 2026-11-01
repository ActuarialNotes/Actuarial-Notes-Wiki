---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:5acb6dd298ecdfe2e11d107354b3127e59172b44e455de0cd42a6ed37007466f
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

**Exponential smoothing** forecasts a [[Time Series]] with a weighted average of its past values, the weights decaying geometrically into the past. Simple exponential smoothing has one parameter; Holt adds a trend and Holt-Winters adds [[Seasonality|seasonality]].

> $$\hat{Y}_{t+1} = \alpha Y_t + (1-\alpha)\hat{Y}_t, \qquad 0 < \alpha < 1$$
>
> $$\hat{Y}_{t+1} = \alpha\sum_{j=0}^{\infty}(1-\alpha)^{j}Y_{t-j}$$

- $\alpha$ near 1 tracks the series closely and reacts fast to shocks; $\alpha$ near 0 smooths heavily and reacts slowly. It is chosen by minimizing one-step forecast SSE
- **Simple** smoothing has a flat $h$-step forecast — it assumes no trend, and is the optimal forecast for an ARIMA(0,1,1)
- **Holt's linear method** adds a level and a slope equation ($\beta$), giving a forecast that extrapolates the trend; **Holt-Winters** adds a seasonal equation ($\gamma$), additive or multiplicative
- The recursion needs no history in storage — only the current level (and slope, and seasonals)
- It is a **model-free** method: no [[Stationarity]] requirement and no [[Autocorrelation Function|ACF]]/PACF identification, but also no prediction intervals without an underlying state-space model

**Double exponential smoothing (Brown's linear method)** handles a series with a linear trend using one smoothing parameter: smooth the series, then smooth the smoothed series again, and read a level and a slope off the two. Frees (2010, Ch. 9) writes it with $w$, the weight on the *past*, so $w = 1 - \alpha$ in the notation above. In Frees' notation, simple smoothing is $\hat{s}_t = (1-w)\,y_t + w\,\hat{s}_{t-1}$, and the double-smoothing recursions are:

> $$\hat{s}^{(1)}_t = (1-w)\,y_t + w\,\hat{s}^{(1)}_{t-1}$$

> $$\hat{s}^{(2)}_t = (1-w)\,\hat{s}^{(1)}_t + w\,\hat{s}^{(2)}_{t-1}$$

At the last time $T$, the intercept (level) and slope estimates and the $l$-step forecast are:

> $$a_T = 2\hat{s}^{(1)}_T - \hat{s}^{(2)}_T$$

> $$b_T = \frac{1-w}{w}\left(\hat{s}^{(1)}_T - \hat{s}^{(2)}_T\right)$$

> $$\hat{y}_{T+l} = a_T + b_T\, l$$

- With $\alpha = 1 - w$ these are the usual $a_T = 2s'_T - s''_T$ and $b_T = \frac{\alpha}{1-\alpha}(s'_T - s''_T)$. Check which convention a source uses before plugging in: a $w$ of $0.9$ is an $\alpha$ of $0.1$
- The doubly smoothed series lags the singly smoothed one when the series trends, and the gap between them measures the trend. Simple smoothing's forecast stays flat at $\hat{s}^{(1)}_T$ at every horizon; the double-smoothing forecast continues the line
- Brown's method is not Holt's: Holt smooths the level and the slope with two separate parameters, while Brown's uses one parameter for both

![[Media/Figures/Exponential_Smoothing.svg|340]]

> [!example]- Two Steps of Simple Smoothing {Example}
> With $\alpha = 0.3$ and a current forecast $\hat Y_{10} = 420$, the actual $Y_{10} = 470$ arrives, then $Y_{11} = 440$. Find $\hat Y_{11}$ and $\hat Y_{12}$, and the 3-step forecast.
>
> > [!answer]-
> > $$\hat Y_{11} = 0.3(470) + 0.7(420) = 141 + 294 = 435$$
> > $$\hat Y_{12} = 0.3(440) + 0.7(435) = 132 + 304.5 = 436.5$$
> > The 3-step forecast is also **436.5** — simple exponential smoothing gives a flat forecast at every horizon. In error-correction form, $\hat Y_{11} = 420 + 0.3(470-420)$: the update is $\alpha$ times the last forecast error.

> [!example]- Double Exponential Smoothing {Example}
> A trending series is smoothed with $w = 0.75$. At time $T - 1$ the smoothed values are $\hat{s}^{(1)}_{T-1} = 48$ and $\hat{s}^{(2)}_{T-1} = 44$, and then $y_T = 56$ is observed. Forecast $y_{T+2}$ by double smoothing and by simple smoothing.
>
> > [!answer]-
> > **Plan.** Update both smoothed series, then read off the level and slope. The weight on each new value is $1 - w = 0.25$.
> >
> > $$
> > \begin{align*}
> > \hat{s}^{(1)}_T &= 0.25(56) + 0.75(48) \\
> > &= 50 \\
> > \hat{s}^{(2)}_T &= 0.25(50) + 0.75(44) \\
> > &= 45.5
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > a_T &= 2(50) - 45.5 \\
> > &= 54.5 \\
> > b_T &= \frac{0.25}{0.75}(50 - 45.5) \\
> > &= 1.5 \\
> > \hat{y}_{T+2} &= 54.5 + 1.5(2) \\
> > &= 57.5
> > \end{align*}
> > $$
> >
> > Simple smoothing forecasts $\hat{s}^{(1)}_T = 50$ for every horizon. Double smoothing sits above the last smoothed value and keeps climbing, because the gap of $4.5$ between the two smoothed series says the series is trending upward.
