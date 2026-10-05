---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:7ab2a55bc4f5042851d591856daded7937a96662befc63f4c99f9ba41ea54395
  sources:
    - "Shumway & Stoffer, Time Series Analysis and Applications Using the R Statistical Package, EZ Edition (version 2016.12.30, CC BY-NC), §1.4 Defs 1.4-1.5 (PDF p.18); §1.5 Def 1.10 eq (1.21) joint stationarity and ccvf cov(x_{t+h},y_t), Def 1.11 eq (1.22) ccf, -1<=rho<=1, not symmetric, rho_xy(h)=rho_yx(-h) eq (1.23) (PDF p.21); Example 1.22 y_t=A x_{t-l}+w_t, gamma_yx(h)=A gamma_x(h-l), peak at h=l (PDF p.22); §1.6 eq (1.27) and Def 1.13 eqs (1.30)-(1.31) sample ccvf with 1/n over n-h terms, gamma_xy(-h)=gamma_yx(h), sample ccf over sqrt(gamma_x(0) gamma_y(0)); Property 1.3 large-sample sd 1/sqrt(n) (PDF p.25); Example 1.25 ccf(soi,rec) peak at h=-6 = SOI leads, negative sign = opposite directions (PDF p.26); Example 1.26 prewhitening, footnote 4 z rounded to 2 (PDF pp.25-28); Example 1.6 white noise vs white independent noise (PDF p.10), sha256:a0fd39387167c0c6b618f4bd853e99782e418ba4679b42542a4fb664b4aa463d — http://www.math-evry.cnrs.fr/_media/members/aguilloux/enseignements/timeseries_light_free.pdf"
    - "Penn State STAT 510 Applied Time Series Analysis, Lesson 8 §8.2 Cross Correlation Functions and Lagged Regressions ('In R, the sample CCF is defined as the set of sample correlations between x_{t+h} and y_t'; h negative = x leads y, h positive = x lags y; 'Note to Minitab Users': Minitab correlates x_t with y_{t+h}, so the x-leading-y side is h positive; CCF lags as candidate predictors in a lagged regression), sha256:276e9e7dfcd5cb50e3dbfd1523ca0159597e8ec2a5539a11202f223907f8a5e2 — https://online.stat.psu.edu/stat510/Lesson08"
    - "Penn State STAT 510, Lesson 9 §9.1 Pre-whitening as an Aid to Interpreting the CCF (CCF 'affected by the time series structure of the x-variable and any in-common trends'; prewhitening steps; alternatives incl. de-trending by differencing or regression on time), sha256:2f8535df3c9f269bb2e5579fdc0c4dd52eef84cef0158db5f41a11d510a667f7 — https://online.stat.psu.edu/stat510/Lesson09"
    - "R Documentation, acf {stats} (R 4.6.0): ccf(x, y, ..., type = c('correlation','covariance')); 'The lag k value returned by ccf(x, y) estimates the correlation between x[t+k] and y[t]', sha256:d776b037b86c28a8dd45b7cd4c89f3cd44851fccf829af80e9f6efef4f8a61c1 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/acf.html"
    - "R Documentation, plot.acf {stats} (R 4.6.0): ci = 0.95, ci.type 'white' assumes a white-noise input; Note: interval 'based on an uncorrelated series', sha256:b8a5d2ec101f6fa5dd76b49ad1d84e3c6dcf45f476844b43827d5a2982c23e8a — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/plot.acf.html"
    - "Cowpertwait & Metcalfe, Introductory Time Series with R (Springer, 2009), Ch 3 pp.45-46: §3.1 a related variable that leads by one or more intervals is a very efficient forecasting basis, 'the closer the relationship and the longer the lead time, the better'; §3.2.2 building activity 'tends to lag one quarter behind the building approvals' — Springer chapter preview PDF, sha256:4e82ea222f4086d8fe28f8c2db0fff93f4c41b910d754e0d335f196b5d77fdf2 — https://page-one.springer.com/pdf/preview/10.1007/978-0-387-88698-5_3"
    - "Cowpertwait & Metcalfe, Introductory Time Series with R (Springer, 2009), Ch 4 p.68 §4.2.2: discrete white noise defined as iid with mean zero — Springer chapter preview PDF, sha256:d8e42f4527e38bf7ba4354ff4d0198fd31e7afd4680564195dbc6b38b8bacc6b — https://page-one.springer.com/pdf/preview/10.1007/978-0-387-88698-5_4"
    - "CAS Exam MAS-II Content Outline 2026, Domain D Time Series with Constant Variance (PDF p.3) and Complete Text References (PDF p.4: Cowpertwait Chapters 1-5 excluding Sections 3.3 and 3.4, so §3.2 is examinable; Domain D questions may show R output), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
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
