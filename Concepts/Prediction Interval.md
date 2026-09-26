---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:783e6eea0d48915ecea03224a1e69b723d1d2854e2b1cc2afe614373b633f456
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Prediction Interval.md
---

**A prediction interval** is a range that will contain a *future observation*, such as next quarter's claim frequency or next month's claim count, with a stated probability. A [[Confidence Interval|confidence interval]] covers a fixed parameter such as a mean. A prediction interval must also allow for the random shock the new observation will carry, so it is always wider.

> $$\hat{x}_{t+h} \pm z_{1-\alpha/2}\,\mathrm{SE}(e_{t+h})$$
>
> $$\mathrm{SE}(e_{t+h}) = \sigma\sqrt{\sum_{j=0}^{h-1}\psi_j^{2}}$$

- $\hat{x}_{t+h}$ is the $h$-step [[Time Series Forecast|forecast]] and $e_{t+h} = x_{t+h} - \hat{x}_{t+h}$ its error. $\sigma$ is the white-noise standard deviation, and the $\psi_j$ are the weights of the model's MA($\infty$) form, with $\psi_0 = 1$. For $95\%$, $z = 1.96$.
- **How the width grows with $h$:**
  - [[Moving Average Model|MA($q$)]]: the $\psi_j$ vanish beyond $q$, so the width stops growing after $q$ steps, at $\sigma\sqrt{1 + \theta_1^2 + \cdots + \theta_q^2}$
  - stationary [[Autoregressive Model|AR(1)]]: $\psi_j = \phi^j$, so the variance is $\sigma^2(1 - \phi^{2h})/(1 - \phi^2)$, levelling off at the series' own variance $\sigma^2/(1 - \phi^2)$
  - [[Random Walk|random walk]]: $\psi_j = 1$, so the variance is $h\sigma^2$ and the interval widens without limit, the signature of a unit root
- **Reading software output.** In R, `predict()` on a fitted `arima` model returns the point forecasts (`pred`) and their standard errors (`se`). The interval is `pred` $\pm\ 1.96 \times$ `se`. A `se` column that rises with $h$ is the $\psi$-sum accumulating.
- **Regression analogue.** For a new observation at $\mathbf{x}_0$ in a [[Linear Regression]], the interval is $\hat{y}_0 \pm t_{n-p-1}\,s\sqrt{1 + \mathbf{x}_0^{\top}(\mathbf{X}^{\top}\mathbf{X})^{-1}\mathbf{x}_0}$. The "$1 +$" is the new observation's own noise. It is why a prediction interval does not shrink to zero as $n$ grows, while the confidence interval for the mean does.
- **Caveats.** The usual intervals assume the model is correct, its parameters are known and the errors are normal, so check the residuals with a [[Correlogram|correlogram]] and a [[QQ Plot]]. They omit parameter and model uncertainty, so real outcomes land outside them more often than the nominal $5\%$. For a model fitted to logs, build the interval on the log scale and exponentiate the endpoints.

> [!example]- Reading an AR(1) Forecast Table {Example}
> Quarterly claim frequency (claims per $100$ exposures) is fitted as $x_t = 2.4 + 0.6x_{t-1} + \varepsilon_t$, and the latest value is $x_t = 7.0$. The software reports:
>
> | $h$ | `pred` | `se` |
> |---|---|---|
> | 1 | $6.600$ | $0.500$ |
> | 2 | $6.360$ | $0.583$ |
> | 3 | $6.216$ | $0.610$ |
>
> Give $95\%$ prediction intervals for $h = 1$ and $h = 3$, explain why `se` grows and where it stops, and recover $\phi$ from the `se` column.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{PI}_{1} &= 6.600 \pm 1.96(0.500) \\
> > &= 6.600 \pm 0.980 \\
> > &= (5.62,\ 7.58) \\
> > \text{PI}_{3} &= 6.216 \pm 1.96(0.610) \\
> > &= 6.216 \pm 1.196 \\
> > &= (5.02,\ 7.41)
> > \end{align*}
> > $$
> > Each extra step adds one more unknown shock, so the error variance is $\sigma^2(1 + \phi^2 + \phi^4 + \cdots)$. The standard error levels off at $\sigma/\sqrt{1 - \phi^2} = 0.5/0.8 = 0.625$. Far ahead, the interval becomes the long-run mean $2.4/0.4 = 6.0$ plus or minus $1.96(0.625) = 1.225$.
> >
> > The ratio of the first two standard errors gives $\phi$:
> > $$
> > \begin{align*}
> > 1 + \phi^{2} &= \left(\frac{0.583}{0.500}\right)^{2} \\
> > &= 1.36 \\
> > \lvert\phi\rvert &= 0.6
> > \end{align*}
> > $$
> > This matches the fitted coefficient: the `se` column alone carries the AR structure of the model.

> [!example]- Back-Transforming a Log-Scale Interval {Example}
> An ARIMA model is fitted to the log of monthly average paid severity. Next month's forecast is $8.70$ on the log scale, with standard error $0.08$. Give a $95\%$ prediction interval for the severity in dollars.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{log scale} &= 8.70 \pm 1.96(0.08) \\
> > &= (8.543,\ 8.857) \\
> > \text{dollars} &= \left(e^{8.543},\ e^{8.857}\right) \\
> > &= (\$5{,}132,\ \$7{,}022)
> > \end{align*}
> > $$
> > The point forecast is $e^{8.70} = \$6{,}003$. The interval is **asymmetric**: $\$871$ below and $\$1{,}019$ above, as a lognormal should be. $\$6{,}003$ is the *median* forecast. The mean is higher, $e^{8.70 + 0.08^2/2} = \$6{,}022$.
