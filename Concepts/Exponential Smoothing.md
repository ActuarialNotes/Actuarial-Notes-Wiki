---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:b011bcecf50e71216f916a53a21d61ecdc72b391fab17c3f1c80a30def61a9b2
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.8 §8.1 Simple exponential smoothing (weighted average, component form, flat forecasts, SSE estimation), §8.2-8.3 Holt and Holt-Winters, §8.5-8.7 state space models and prediction intervals, read 2026-10-18, sha256:be59a506b32748ede644be78b4509e9660d3920d21dea766901d5e9b3af71749 — https://otexts.com/fpp3/exponential-smoothing.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.10 Table 9.4 ETS(A,N,N) = ARIMA(0,1,1), read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
    - "CAS, Exam MAS-II Content Outline 2026 (MASII_CO_S_2026), p.3 Domain D tasks 1-4 and p.4 Cowpertwait citation 'Chapters 1-5 (excluding Sections 3.3 and 3.4), 6, 7 (Sections 7.1, 7.2 and 7.3)', D1-D4, B, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
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

![[Media/Figures/Exponential_Smoothing.svg|340]]

> [!example]- Two Steps of Simple Smoothing {Example}
> With $\alpha = 0.3$ and a current forecast $\hat Y_{10} = 420$, the actual $Y_{10} = 470$ arrives, then $Y_{11} = 440$. Find $\hat Y_{11}$ and $\hat Y_{12}$, and the 3-step forecast.
>
> > [!answer]-
> > $$\hat Y_{11} = 0.3(470) + 0.7(420) = 141 + 294 = 435$$
> > $$\hat Y_{12} = 0.3(440) + 0.7(435) = 132 + 304.5 = 436.5$$
> > The 3-step forecast is also **436.5** — simple exponential smoothing gives a flat forecast at every horizon. In error-correction form, $\hat Y_{11} = 420 + 0.3(470-420)$: the update is $\alpha$ times the last forecast error.
