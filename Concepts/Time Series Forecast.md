A **time series forecast** is the conditional expectation of a future value given the history, $\hat Y_{t+h} = E[Y_{t+h} \mid Y_t, Y_{t-1}, \dots]$, together with an interval expressing how uncertain it is. Producing and reading one is objective D4.

> $$\hat{Y}_{t+h} = E\!\left[Y_{t+h} \mid \mathcal{F}_t\right]$$
>
> $$\hat{Y}_{t+h} \pm z_{1-\alpha/2}\,\sigma\sqrt{\textstyle\sum_{j=0}^{h-1}\psi_j^{2}}$$

- **Build it recursively**: replace future shocks with 0, future observations with their forecasts, and known past values with themselves
- The $\psi_j$ are the coefficients of the infinite MA representation; for an AR(1), $\psi_j = \phi^{j}$, so the $h$-step variance is $\sigma^{2}\dfrac{1-\phi^{2h}}{1-\phi^{2}}$
- **Where each model converges:** a stationary [[Autoregressive Model|AR]] decays to the mean with a bounded interval; an [[Moving Average Model|MA($q$)]] hits the mean exactly at $h > q$; a [[Random Walk]] stays flat at the last value with an interval widening as $\sqrt{h}$
- The intervals assume the model and its parameters are **correct** — they carry process variance only, no parameter or model uncertainty, so they are optimistic in practice
- Assess a forecast on a held-out tail of the series, not on the fitted data, using MAE, RMSE or MAPE

![[Media/Figures/Time_Series_Forecast.svg|340]]

> [!example]- Two-Step Forecast Interval for an AR(1) {Example}
> $Y_t = 20 + 0.6Y_{t-1} + \varepsilon_t$, $\sigma = 4$, and $Y_{50} = 61$. Give the two-step forecast and a 95% interval.
>
> > [!answer]-
> > $$\hat Y_{51} = 20 + 0.6(61) = 56.6 \qquad \hat Y_{52} = 20 + 0.6(56.6) = 53.96$$
> > Two-step error is $\varepsilon_{52} + \phi\varepsilon_{51}$, with variance $\sigma^2(1 + \phi^{2}) = 16(1.36) = 21.76$ and SD $4.665$:
> > $$53.96 \pm 1.96(4.665) = (44.8,\ 63.1)$$
> > The one-step interval would be the narrower $\pm 1.96(4) = \pm 7.84$. As $h$ grows the forecast converges to $\mu = 20/0.4 = 50$ and the SD to $4/\sqrt{1-0.36} = 5$.
