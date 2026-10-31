---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:50845118250bc20c44c69c3238bb01b5efc98342b19cb44132d6e45bd9ac75f7
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.8 Forecasting (three-step recursion; one-step interval ±1.96 sigma; MA(q) forecast variance; AR(1) via MA(∞); intervals too narrow because parameter and order variation are excluded), read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §5.8 Evaluating point forecast accuracy (test set, MAE, RMSE, MAPE), read 2026-10-18, sha256:d72117b50768eed014ba8ec8bc835940cdfa2b34ca7ec76b22ce2b0484877f9a — https://otexts.com/fpp3/toolbox.html"
    - "CAS, Exam MAS-II Content Outline 2026 (MASII_CO_S_2026), p.3 Domain D tasks 1-4 and p.4 Cowpertwait citation 'Chapters 1-5 (excluding Sections 3.3 and 3.4), 6, 7 (Sections 7.1, 7.2 and 7.3)', D1-D4, B, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
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
  - **Mean squared error** $\text{MSE} = \frac{1}{m}\sum e_t^2$ (or its root, RMSE), **mean absolute error** $\text{MAE} = \frac{1}{m}\sum |e_t|$ and **mean absolute percentage error** $\text{MAPE} = \frac{1}{m}\sum |p_t|$ measure size, so they never cancel. ME, MSE and MAE are in the data's units; MPE and MAPE are unit-free but break down when some $y_t$ is zero or near it

![[Media/Figures/Time_Series_Forecast.svg|340]]

> [!example]- Two-Step Forecast Interval for an AR(1) {Example}
> $Y_t = 20 + 0.6Y_{t-1} + \varepsilon_t$, $\sigma = 4$, and $Y_{50} = 61$. Give the two-step forecast and a 95% interval.
>
> > [!answer]-
> > $$\hat Y_{51} = 20 + 0.6(61) = 56.6 \qquad \hat Y_{52} = 20 + 0.6(56.6) = 53.96$$
> > Two-step error is $\varepsilon_{52} + \phi\varepsilon_{51}$, with variance $\sigma^2(1 + \phi^{2}) = 16(1.36) = 21.76$ and SD $4.665$:
> > $$53.96 \pm 1.96(4.665) = (44.8,\ 63.1)$$
> > The one-step interval would be the narrower $\pm 1.96(4) = \pm 7.84$. As $h$ grows the forecast converges to $\mu = 20/0.4 = 50$ and the SD to $4/\sqrt{1-0.36} = 5$.
