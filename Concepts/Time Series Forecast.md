---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:f86231649eb883f045450fa03eaaf930efffdd7490fa5b62586ae8dc03ad2b67
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.5 §5.8 Evaluating point forecast accuracy: e = y − ŷ, MAE = mean|e|, RMSE = sqrt(mean e²), errors 'on the same scale as the data', p_t = 100 e_t/y_t, MAPE = mean|p_t|, percentage errors unit-free but infinite/undefined at y_t = 0 and extreme near 0; §5.5 naïve σ_h = σ√h, read 2026-10-31, sha256:3f114823a602e9008e8a85e0e7557e03e9c59232317d61304a8b02353e4e7016 — https://otexts.com/fpp3/accuracy.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.9 §9.3 AR(p), §9.4 AR(1) as MA(∞) with weights φ1^j, §9.5 eq.(9.4) c = μ(1 − φ1 − … − φp), §9.8 Forecasting (point-forecast recursion; MA(q) interval σ²[1+Σθ²]; AR(1) via MA(∞); stationary intervals converge; intervals too narrow — parameter and order uncertainty not included), §9.10 ETS(A,N,N) = ARIMA(0,1,1), read 2026-10-31, sha256:5f778f68d8dcb368933b34ee303bb1bc883425b2da4a801a7d5622a98a7ffa47 — https://otexts.com/fpp3/arima.html"
    - "R. Nau (Duke), 'What's the bottom line? How to compare models', 'The mean error (ME) and mean percentage error (MPE)… are signed measures of error which indicate whether the forecasts are biased'; MSE = VAR(E) + ME², sha256:fd3d4ff8bd34dc51afcdcf2636240c3622b315ef75eb7de03e2845acafcc060e — https://people.duke.edu/~rnau/compare.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Time Series Forecast.md
---

A **time series forecast** is the conditional expectation of a future value given the history, $\hat Y_{t+h} = E[Y_{t+h} \mid Y_t, Y_{t-1}, \dots]$, together with an interval expressing how uncertain it is. Producing and reading one is objective D4.

> $$\hat{Y}_{t+h} = E\!\left[Y_{t+h} \mid \mathcal{F}_t\right]$$
>
> $$\hat{Y}_{t+h} \pm z_{1-\alpha/2}\,\sigma\sqrt{\textstyle\sum_{j=0}^{h-1}\psi_j^{2}}$$

- **Build it recursively**: replace future shocks with 0, future observations with their forecasts, and known past values with themselves
- The $\psi_j$ are the coefficients of the infinite MA representation; for an AR(1), $\psi_j = \phi^{j}$, so the $h$-step variance is $\sigma^{2}\dfrac{1-\phi^{2h}}{1-\phi^{2}}$
- **Where each model converges:** a stationary [[Autoregressive Model|AR]] decays to the mean with a bounded interval; an [[Moving Average Model|MA($q$)]] hits the mean exactly at $h > q$; a [[Random Walk]] stays flat at the last value with an interval widening as $\sqrt{h}$
- The intervals assume the model and its parameters are **correct** — they carry process variance only, no parameter or model uncertainty, so they are optimistic in practice
- Assess a forecast on a held-out tail of the series, not on the fitted data. With $m$ out-of-sample forecast errors $e_t = y_t - \hat{y}_t$ and percentage errors $p_t = 100\,e_t / y_t$, the comparison statistics are averages of them:
  - **Mean error** $\text{ME} = \frac{1}{m}\sum e_t$ and **mean percentage error** $\text{MPE} = \frac{1}{m}\sum p_t = \frac{100}{m}\sum e_t / y_t$ are signed: they measure **bias**, whether the forecasts run too high or too low, and errors of opposite sign cancel
  - **Mean squared error** $\text{MSE} = \frac{1}{m}\sum e_t^2$ (or its root, RMSE), **mean absolute error** $\text{MAE} = \frac{1}{m}\sum |e_t|$ and **mean absolute percentage error** $\text{MAPE} = \frac{1}{m}\sum |p_t|$ measure size, so they never cancel. ME, RMSE and MAE are in the data's units; MPE and MAPE are unit-free but break down when some $y_t$ is zero or near it

![[Media/Figures/Time_Series_Forecast.svg|340]]

> [!example]- Two-Step Forecast Interval for an AR(1) {Example}
> $Y_t = 20 + 0.6Y_{t-1} + \varepsilon_t$, $\sigma = 4$, and $Y_{50} = 61$. Give the two-step forecast and a 95% interval.
>
> > [!answer]-
> > $$\hat Y_{51} = 20 + 0.6(61) = 56.6 \qquad \hat Y_{52} = 20 + 0.6(56.6) = 53.96$$
> > Two-step error is $\varepsilon_{52} + \phi\varepsilon_{51}$, with variance $\sigma^2(1 + \phi^{2}) = 16(1.36) = 21.76$ and SD $4.665$:
> > $$53.96 \pm 1.96(4.665) = (44.8,\ 63.1)$$
> > The one-step interval would be the narrower $\pm 1.96(4) = \pm 7.84$. As $h$ grows the forecast converges to $\mu = 20/0.4 = 50$ and the SD to $4/\sqrt{1-0.36} = 5$.
