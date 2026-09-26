---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8ce8d9780795d7438eeca17de923c5875d7fbb8b800adcbffb225789bd4074ae
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Correlogram.md
---

**A correlogram** is the plot of the sample autocorrelations $r_k$ of a [[Time Series|time series]] against the lag $k$. It is drawn with bounds that mark how large a correlation must be before it can be told apart from zero. It is the picture through which the [[Autocorrelation Function|ACF]] (and, drawn the same way, the [[Partial Autocorrelation Function|PACF]]) is read, both to identify a model and to check its residuals.

> $$r_k = \frac{c_k}{c_0}$$
>
> $$c_k = \frac{1}{n}\sum_{t=1}^{n-k}(x_t - \bar{x})(x_{t+k} - \bar{x})$$
>
> $$\text{bounds} = -\frac{1}{n} \pm \frac{2}{\sqrt{n}}$$

- Lag $k$ runs along the horizontal axis and $r_k$ up the vertical. The first bar is always $r_0 = 1$. When the true $\rho_k = 0$, $r_k$ is approximately normal with mean $-1/n$ and variance $1/n$. That gives the bounds Cowpertwait draws. The simpler $\pm 1.96/\sqrt{n}$ used elsewhere in this vault differs from them by about $0.01$ when $n$ is around $100$.
- **Patterns to recognise:**
  - slow, near-linear decay from close to $1$ means a trend or other non-stationarity; [[Differencing|difference]] before reading anything else
  - peaks at lags $s, 2s, \ldots$ ($s = 12$ for monthly data, $s = 4$ for quarterly) mean [[Seasonality|seasonality]]
  - geometric decay, alternating in sign if $\phi < 0$, suggests AR behaviour; spikes up to lag $q$ and nothing after suggest MA($q$)
  - everything inside the bounds looks like [[White Noise|white noise]]
- **Residual check.** After fitting, the correlogram of the [[Residual|residuals]] should look like white noise. If it does not, the lag of the surviving spike says what is missing. A spike at lag $1$ or $2$ suggests an extra AR or MA term. One at lag $12$ (monthly) or $4$ (quarterly) suggests a seasonal term. Read the residual PACF the same way.
- **Chance breaches.** The bounds are pointwise $95\%$ limits, so about $1$ lag in $20$ crosses them by chance. A marginal breach at an unremarkable lag is weak evidence. A clear breach at lag $1$ or at a seasonal lag is not.
- The bounds assume stationarity. On a trending series nearly every bar is significant, and the plot says nothing about the ARMA orders until the trend is removed. See [[Deterministic and Stochastic Trend]].

> [!example]- Reading the Raw Correlogram of Monthly Claim Counts {Example}
> A series of $n = 96$ monthly reported claim counts has $r_1 = 0.91$. The autocorrelations decline slowly to $0.55$ at lag $24$, with local peaks at lags $12$ and $24$. What does the correlogram show, and what should be done next?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{bounds} &= -\frac{1}{96} \pm \frac{2}{\sqrt{96}} \\
> > &= -0.010 \pm 0.204 \\
> > &= (-0.215,\ 0.194)
> > \end{align*}
> > $$
> > Every bar is far outside. The **slow decay** says the series is not stationary (a trend in claim volume), and the **peaks at 12 and 24** say there is an annual cycle.
> >
> > No AR or MA order can be read from this plot. Remove the trend and the seasonal pattern first (a first difference and a lag-12 seasonal difference, or a decomposition), then re-plot the ACF and PACF of what remains.

> [!example]- Residual Correlogram After an AR(1) Fit {Example}
> An AR(1) is fitted to $120$ months of claim frequency. The residual correlogram, plotted to lag $24$, shows $r_1 = 0.04$, $r_2 = -0.07$, $r_5 = 0.18$ and $r_{12} = 0.31$. All other lags lie within $\pm 0.10$. Is the model adequate?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{bounds} &= -\frac{1}{120} \pm \frac{2}{\sqrt{120}} \\
> > &= -0.008 \pm 0.183 \\
> > &= (-0.191,\ 0.174)
> > \end{align*}
> > $$
> > $r_5 = 0.18$ is only just outside, at an unremarkable lag. With $24$ lags plotted, about $1.2$ breaches are expected by chance, so it is not evidence on its own.
> >
> > $r_{12} = 0.31$ is well outside, **and at the seasonal lag**. The AR(1) has left the annual pattern in the residuals. **Not adequate:** add a seasonal term (a seasonal AR or MA at lag $12$, or a seasonal difference), refit, and check the correlogram again.
