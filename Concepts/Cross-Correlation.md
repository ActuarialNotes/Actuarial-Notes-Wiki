---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7ab2a55bc4f5042851d591856daded7937a96662befc63f4c99f9ba41ea54395
  sources: []
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Cross-Correlation.md
---

The **cross-correlation function** (ccf) $\rho_{xy}(h)$ of two [[Time Series|time series]] $x_t$ and $y_t$ is the correlation between $x_{t+h}$ and $y_t$, one series set against the other shifted by $h$ periods. Read across the lags, it shows whether one series **leads** the other, which makes it a forecasting tool: a variable that moves ahead of the one to be forecast is a ready-made predictor.

> $$\gamma_{xy}(h) = \mathrm{Cov}(x_{t+h},\, y_t) = E\big[(x_{t+h} - \mu_x)(y_t - \mu_y)\big]$$
>
> $$\rho_{xy}(h) = \frac{\gamma_{xy}(h)}{\sqrt{\gamma_x(0)\,\gamma_y(0)}}$$
>
> $$\hat{\gamma}_{xy}(h) = \frac{1}{n}\sum_{t=1}^{n-h}(x_{t+h} - \bar{x})(y_t - \bar{y})$$
>
> $$\hat{\rho}_{xy}(h) = \frac{\hat{\gamma}_{xy}(h)}{\sqrt{\hat{\gamma}_x(0)\,\hat{\gamma}_y(0)}}$$

- $\gamma_{xy}(h)$ is the **cross-covariance function** (ccvf), the [[Covariance|covariance]] of the pairs $(x_{t+h}, y_t)$. It depends on the lag $h$ alone when the two series are **jointly stationary**: each is [[Stationarity|stationary]], and the cross-covariance does not change with $t$. $\gamma_x(0)$ and $\gamma_y(0)$ are the two variances, so $-1 \le \rho_{xy}(h) \le 1$. With $y = x$ the ccf is the [[Autocorrelation Function|ACF]].
- **The sample ccf divides by the lag-0 autocovariances.** The lag-$h$ cross-covariance is scaled by $\hat{\gamma}_x(0)$ and $\hat{\gamma}_y(0)$, each series' sum of squared deviations divided by $n$. The autocovariances at lag $h$ do not enter. As in the sample ACF, the sum has $n - h$ terms but is divided by $n$. Negative lags come from $\hat{\gamma}_{xy}(-h) = \hat{\gamma}_{yx}(h)$.
- **Not symmetric.** Unlike the ACF, $\rho_{xy}(h) \ne \rho_{xy}(-h)$ in general. Instead $\rho_{xy}(h) = \rho_{yx}(-h)$, so the plot runs over negative and positive lags, and swapping the two series mirrors it.
- **Reading lead and lag.** In R, `ccf(x, y)` at lag $k$ estimates the correlation between $x_{t+k}$ and $y_t$ (`type = "covariance"` gives the ccvf). A peak at a **negative** lag $h = -\ell$ means $x_{t-\ell}$ moves with $y_t$, so $x$ **leads** $y$ by $\ell$ periods. A peak at a positive lag means $x$ lags $y$. A negative peak means the two move in opposite directions. Minitab shifts $y$ instead, so its plot reads the other way round.
- **Why the peak marks the lead.** If $y_t = A x_{t-\ell} + w_t$, with noise $w_t$ uncorrelated with $x_t$, then $\gamma_{yx}(h) = A\,\gamma_x(h - \ell)$. The cross-covariance is the input's own autocovariance moved to lag $\ell$, and it is largest in absolute value there.
- **Significance bounds.** If $x_t$ and $y_t$ are independent and at least one of them is [[White Noise|white noise]], $\hat{\rho}_{xy}(h)$ is approximately normal with mean $0$ and standard deviation $1/\sqrt{n}$, so values outside $\pm 2/\sqrt{n}$ point to a real relationship. When both series carry their own structure (a [[Deterministic and Stochastic Trend|trend]] or a seasonal cycle), independent series can show sizeable cross-correlations. Remove the trend, or **prewhiten** one series (strip its own structure so that what is left is white noise), before reading the plot.
- **Use in forecasting.** A related variable that leads the one to be forecast by one or more periods is an efficient basis for a [[Time Series Forecast|forecast]]. The closer the relationship and the longer the lead, the better. Cowpertwait's example is Australian building activity, which tends to lag building approvals by about a quarter. The lags the ccf picks out are candidate predictors in a lagged [[Linear Regression|regression]] of $y_t$ on past values of $x_t$.

> [!example]- Do New Policies Lead Claims? {Example}
> Over six quarters an insurer wrote $x_t = 3, 6, 4, 7, 5, 5$ (hundreds of new policies) and received $y_t = 5, 3, 6, 4, 6, 6$ (tens of claims). Compute the sample cross-correlations at lags $-1$, $0$ and $1$, and say which series leads.
>
> > [!answer]-
> > Both means are $5$, so the deviations are $(-2, 1, -1, 2, 0, 0)$ for $x$ and $(0, -2, 1, -1, 1, 1)$ for $y$. Their sums of squares are $10$ and $8$. The $1/n$ factors cancel, so each $\hat{\rho}_{xy}(h)$ is a sum of deviation products divided by $\sqrt{10 \times 8} = 8.944$.
> >
> > $$
> > \begin{align*}
> > \hat{\rho}_{xy}(-1) &= \frac{(-2)(-2) + (1)(1) + (-1)(-1) + (2)(1) + (0)(1)}{8.944} \\
> > &= \frac{8}{8.944} \\
> > &= 0.894
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \hat{\rho}_{xy}(0) &= \frac{(-2)(0) + (1)(-2) + (-1)(1) + (2)(-1) + (0)(1) + (0)(1)}{8.944} \\
> > &= \frac{-5}{8.944} \\
> > &= -0.559
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \hat{\rho}_{xy}(1) &= \frac{(1)(0) + (-1)(-2) + (2)(1) + (0)(-1) + (0)(1)}{8.944} \\
> > &= \frac{4}{8.944} \\
> > &= 0.447
> > \end{align*}
> > $$
> >
> > Lag $-1$ pairs $x_{t-1}$ with $y_t$, and it is the peak. **New policies lead claims by one quarter.** The lag-0 correlation is negative, so correlating the two columns side by side would have missed the relationship.

> [!example]- Is the Lead Real? {Example}
> Over $n = 100$ months, $x_t$ is the monthly change in a construction-cost index, already prewhitened to white noise, and $y_t$ is the monthly change in average property claim severity. The sample variances are $\hat{\gamma}_x(0) = 0.36$ and $\hat{\gamma}_y(0) = 2.25$, and the sample cross-covariances are:
>
> | $h$ | $-3$ | $-2$ | $-1$ | $0$ | $1$ | $2$ |
> |:-:|:-:|:-:|:-:|:-:|:-:|:-:|
> | $\hat{\gamma}_{xy}(h)$ | $0.063$ | $0.405$ | $0.108$ | $0.045$ | $-0.081$ | $0.027$ |
>
> Which cross-correlations are significant, and what do they say?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \sqrt{\hat{\gamma}_x(0)\,\hat{\gamma}_y(0)} &= \sqrt{0.36 \times 2.25} \\
> > &= 0.9
> > \end{align*}
> > $$
> >
> > Dividing each cross-covariance by $0.9$ gives $\hat{\rho}_{xy}(h) = 0.07,\ 0.45,\ 0.12,\ 0.05,\ -0.09,\ 0.03$ for $h = -3, \ldots, 2$.
> >
> > $x_t$ is white noise, so the bounds apply:
> >
> > $$
> > \begin{align*}
> > \pm\frac{2}{\sqrt{n}} &= \pm\frac{2}{\sqrt{100}} \\
> > &= \pm 0.2
> > \end{align*}
> > $$
> >
> > Only lag $-2$ is outside them. **Cost changes lead severity changes by two months**, and the positive sign says they move in the same direction. That makes $x_{t-2}$ a candidate predictor of $y_t$.
