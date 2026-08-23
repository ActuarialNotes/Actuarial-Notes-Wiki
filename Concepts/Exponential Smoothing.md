---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8992e4cf94f299fad2bd69879eed1878ed2782fd0afc8363c66c34e7a1c55442
  sources: []
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
- The recursion needs no history in storage — only the current level (and slope, and seasonals) — which is why it is standard in high-volume forecasting
- It is a **model-free** method: no [[Stationarity]] requirement and no [[Autocorrelation Function|ACF]]/PACF identification, but also no prediction intervals without an underlying state-space model

![[Media/Figures/Exponential_Smoothing.svg|340]]

> [!example]- Two Steps of Simple Smoothing {Example}
> With $\alpha = 0.3$ and a current forecast $\hat Y_{10} = 420$, the actual $Y_{10} = 470$ arrives, then $Y_{11} = 440$. Find $\hat Y_{11}$ and $\hat Y_{12}$, and the 3-step forecast.
>
> > [!answer]-
> > $$\hat Y_{11} = 0.3(470) + 0.7(420) = 141 + 294 = 435$$
> > $$\hat Y_{12} = 0.3(440) + 0.7(435) = 132 + 304.5 = 436.5$$
> > The 3-step forecast is also **436.5** — simple exponential smoothing gives a flat forecast at every horizon. In error-correction form, $\hat Y_{11} = 420 + 0.3(470-420)$: the update is $\alpha$ times the last forecast error.
