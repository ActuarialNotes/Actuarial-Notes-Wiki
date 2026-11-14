---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:1b5447b5ab4564f3cb4c5c58dd244210ee592e3bc8266acfe9394421c9bb339a
  sources:
    - "Shumway & Stoffer, Time Series Analysis and Applications Using the R Statistical Package, EZ Edition (version 2016.12.30, CC BY-NC), Example 1.6 white noise wn(0,s^2) = uncorrelated vs white independent noise iid(0,s^2) (PDF p.10); §1.5 Defs 1.10-1.11 eqs (1.21)-(1.23) ccvf cov(x_{t+h},y_t), ccf, -1<=rho<=1, rho_xy(h)=rho_yx(-h) (PDF p.21); Example 1.22 y_t=A x_{t-l}+w_t peak at h=l (PDF p.22); §1.6 Def 1.13 eqs (1.30)-(1.31) sample ccvf/ccf (PDF pp.24-25); Property 1.3 large-sample normal, sd 1/sqrt(n) 'if at least one of the processes is independent white noise', footnote 4 z rounded to 2 (PDF p.25); Fig. 1.15 caption 'lag axes are in terms of seasons (12 months)' and Example 1.25 peak at h=-6, SOI leads, negative sign (PDF p.26); Example 1.26 prewhitening (PDF pp.26-28); R primer quarterly ts frequency=4, time() steps 0.25 (PDF p.174), sha256:a0fd39387167c0c6b618f4bd853e99782e418ba4679b42542a4fb664b4aa463d — http://www.math-evry.cnrs.fr/_media/members/aguilloux/enseignements/timeseries_light_free.pdf"
    - "R Documentation, acf {stats} (R 4.6.0): ccf(x, y, ..., type = c('correlation','covariance')); Details 'The lag is returned and plotted in units of time, and not numbers of observations'; 'The lag k value returned by ccf(x, y) estimates the correlation between x[t+k] and y[t]', sha256:d776b037b86c28a8dd45b7cd4c89f3cd44851fccf829af80e9f6efef4f8a61c1 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/acf.html"
    - "R Documentation, plot.acf {stats} (R 4.6.0): ci.type 'white' assumes white noise; interval based on an uncorrelated series, sha256:b8a5d2ec101f6fa5dd76b49ad1d84e3c6dcf45f476844b43827d5a2982c23e8a — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/plot.acf.html"
    - "Penn State STAT 510 Applied Time Series Analysis, Lesson 8 §8.2 Cross Correlation Functions and Lagged Regressions (R sample CCF = correlations between x_{t+h} and y_t; h negative = x leads y, h positive = x lags y; 'Note to Minitab Users': Minitab correlates x_t with y_{t+h}), sha256:276e9e7dfcd5cb50e3dbfd1523ca0159597e8ec2a5539a11202f223907f8a5e2 — https://online.stat.psu.edu/stat510/Lesson08"
    - "Penn State STAT 510, Lesson 9 §9.1 Pre-whitening as an Aid to Interpreting the CCF (CCF 'affected by the time series structure of the x-variable and any in common trends'), sha256:2f8535df3c9f269bb2e5579fdc0c4dd52eef84cef0158db5f41a11d510a667f7 — https://online.stat.psu.edu/stat510/Lesson09"
    - "Cowpertwait & Metcalfe, Introductory Time Series with R (Springer, 2009), Ch 3 pp.45-46: §3.1 related variable leading by one or more intervals, 'the closer the relationship and the longer the lead time, the better'; Fig. 3.1 building activity 'tends to lag one quarter behind the building approvals' — Springer chapter preview PDF, sha256:4e82ea222f4086d8fe28f8c2db0fff93f4c41b910d754e0d335f196b5d77fdf2 — https://page-one.springer.com/pdf/preview/10.1007/978-0-387-88698-5_3"
    - "Cowpertwait & Metcalfe, Introductory Time Series with R (Springer, 2009), Ch 4 p.68 §4.2.2: discrete white noise = iid with mean zero — Springer chapter preview PDF, sha256:d8e42f4527e38bf7ba4354ff4d0198fd31e7afd4680564195dbc6b38b8bacc6b — https://page-one.springer.com/pdf/preview/10.1007/978-0-387-88698-5_4"
    - "CAS Exam MAS-II Content Outline 2026, Domain D Time Series with Constant Variance (PDF p.3) and Complete Text References (PDF p.4: Cowpertwait Chapters 1-5 excluding Sections 3.3 and 3.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cross-Correlation.md
---

The **Cross-Correlation** of two [[Time Series|time series]] $x_t$ and $y_t$ at lag $h$, $\rho_{xy}(h)$, is the correlation between $x_{t+h}$ and $y_t$, one series set against the other shifted by $h$ periods. Read across the lags as the **cross-correlation function** (ccf), it shows whether one series **leads** the other.

The **cross-covariance function** (ccvf) is the [[Covariance|covariance]] of the pairs $(x_{t+h}, y_t)$:

> $$\gamma_{xy}(h) = \mathrm{Cov}(x_{t+h},\, y_t) = E\big[(x_{t+h} - \mu_x)(y_t - \mu_y)\big]$$

- $\mu_x$ and $\mu_y$ are the means of the two series.

It depends on the lag $h$ alone when the two series are **jointly stationary**: each is [[Stationarity|stationary]], and the cross-covariance does not change with $t$. The cross-correlation is

> $$\rho_{xy}(h) = \frac{\gamma_{xy}(h)}{\sqrt{\gamma_x(0)\,\gamma_y(0)}}$$

- $\gamma_x(0)$ and $\gamma_y(0)$ are the variances of the two series.
- $-1 \le \rho_{xy}(h) \le 1$.

With $y = x$ the ccf is the [[Autocorrelation Function|ACF]]. Unlike the ACF, the ccf is not symmetric: $\rho_{xy}(h) \ne \rho_{xy}(-h)$ in general. Instead $\rho_{xy}(h) = \rho_{yx}(-h)$, so the plot runs over negative and positive lags, and swapping the two series mirrors it.

## Sample cross-correlation

From $n$ observations of each series, the sample cross-covariance at lag $h \ge 0$ is

> $$\hat{\gamma}_{xy}(h) = \frac{1}{n}\sum_{t=1}^{n-h}(x_{t+h} - \bar{x})(y_t - \bar{y})$$

- $\bar{x}$ and $\bar{y}$ are the sample means.

As in the sample ACF, the sum has $n - h$ terms but is divided by $n$. Negative lags come from $\hat{\gamma}_{xy}(-h) = \hat{\gamma}_{yx}(h)$. The sample cross-correlation is

> $$\hat{\rho}_{xy}(h) = \frac{\hat{\gamma}_{xy}(h)}{\sqrt{\hat{\gamma}_x(0)\,\hat{\gamma}_y(0)}}$$

- $\hat{\gamma}_x(0)$ and $\hat{\gamma}_y(0)$ are the lag-0 sample autocovariances, each series' sum of squared deviations divided by $n$.

The autocovariances at lag $h$ do not enter the denominator.

> [!example]- What are the sample cross-correlations at lags $-1$, $0$ and $1$, and which series leads? {Example}
> Over six quarters an insurer wrote $x_t = 3, 6, 4, 7, 5, 5$ (hundreds of new policies) and received $y_t = 5, 3, 6, 4, 6, 6$ (tens of claims).
>
> > [!answer]-
> > - Both means are $5$, so the deviations are $(-2, 1, -1, 2, 0, 0)$ for $x$ and $(0, -2, 1, -1, 1, 1)$ for $y$.
> > - Their sums of squares are $10$ and $8$. The $1/n$ factors cancel, so each $\hat{\rho}_{xy}(h)$ is a sum of deviation products divided by $\sqrt{10 \times 8} = 8.944$.
> > - Lag $-1$ pairs $x_{t-1}$ with $y_t$: $(-2)(-2) + (1)(1) + (-1)(-1) + (2)(1) + (0)(1) = 8$, so $\hat{\rho}_{xy}(-1) = 8/8.944 = 0.894$.
> > - Lag $0$ pairs $x_t$ with $y_t$: $0 - 2 - 1 - 2 + 0 + 0 = -5$, so $\hat{\rho}_{xy}(0) = -5/8.944 = -0.559$.
> > - Lag $1$ pairs $x_{t+1}$ with $y_t$: $0 + 2 + 2 + 0 + 0 = 4$, so $\hat{\rho}_{xy}(1) = 4/8.944 = 0.447$.
> > - Lag $-1$ is the peak, so **new policies lead claims by one quarter**.
> > - The lag-0 correlation is negative, so correlating the two columns side by side would have missed the relationship.

## Reading lead and lag

In R, `ccf(x, y)` at lag $k$ estimates the correlation between $x_{t+k}$ and $y_t$, and `type = "covariance"` gives the ccvf. A peak at a **negative** lag $h = -\ell$ means $x_{t-\ell}$ moves with $y_t$, so $x$ **leads** $y$ by $\ell$ periods. A peak at a positive lag means $x$ lags $y$. A negative peak means the two move in opposite directions. R returns and plots the lag in units of time, not observations, so on a quarterly `ts` object a one-quarter lead peaks at $-0.25$.

The peak marks the lead because, if $y_t = A x_{t-\ell} + w_t$ with noise $w_t$ uncorrelated with $x_t$, then $\gamma_{yx}(h) = A\,\gamma_x(h - \ell)$. The cross-covariance is the input's own autocovariance moved to lag $\ell$, and it is largest in absolute value there.

## Significance bounds

If $x_t$ and $y_t$ are independent and at least one of them is iid [[White Noise|white noise]] (independent, not merely uncorrelated), $\hat{\rho}_{xy}(h)$ is approximately normal with mean $0$ and standard deviation $1/\sqrt{n}$. Values outside $\pm 2/\sqrt{n}$ then point to a real relationship.

When both series carry their own structure (a [[Deterministic and Stochastic Trend|trend]] or a seasonal cycle), independent series can show sizeable cross-correlations. Remove the trend, or **prewhiten** one series (strip its own structure so that what is left is white noise), before reading the plot.

> [!example]- Which of these cross-correlations are significant, and what do they say? {Example}
> Over $n = 100$ months, $x_t$ is the monthly change in a construction-cost index, already prewhitened to iid white noise, and $y_t$ is the monthly change in average property claim severity. The sample variances are $\hat{\gamma}_x(0) = 0.36$ and $\hat{\gamma}_y(0) = 2.25$, and the sample cross-covariances are:
>
> | $h$ | $-3$ | $-2$ | $-1$ | $0$ | $1$ | $2$ |
> |:-:|:-:|:-:|:-:|:-:|:-:|:-:|
> | $\hat{\gamma}_{xy}(h)$ | $0.063$ | $0.405$ | $0.108$ | $0.045$ | $-0.081$ | $0.027$ |
>
> > [!answer]-
> > - The denominator is $\sqrt{0.36 \times 2.25} = 0.9$.
> > - Dividing each cross-covariance by $0.9$ gives $\hat{\rho}_{xy}(h) = 0.07,\ 0.45,\ 0.12,\ 0.05,\ -0.09,\ 0.03$ for $h = -3, \ldots, 2$.
> > - $x_t$ is iid white noise, so the bounds $\pm 2/\sqrt{100} = \pm 0.2$ apply.
> > - Only lag $-2$ is outside them, so **cost changes lead severity changes by two months**.
> > - The positive sign says they move in the same direction, which makes $x_{t-2}$ a candidate predictor of $y_t$.

## Use in forecasting

A related variable that leads the one to be forecast by one or more periods is an efficient basis for a [[Time Series Forecast|forecast]]. The closer the relationship and the longer the lead, the better. Cowpertwait's example is Australian building activity, which tends to lag building approvals by about a quarter. The lags the ccf picks out are candidate predictors in a lagged [[Linear Regression|regression]] of $y_t$ on past values of $x_t$.

> [!trap] Reading the sign of the lag backwards
> In R's `ccf(x, y)`, a peak at a negative lag means $x$ leads $y$. Minitab shifts $y$ instead, so its plot reads the other way round.
