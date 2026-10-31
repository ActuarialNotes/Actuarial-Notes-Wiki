---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:checker-ts
  content_hash: sha256:307bd3f1b27a2d6af6852d69498b29933e542777a06f11007cf6beafe1a9bbe4
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 2, §2.8 Autocorrelation (r_k formula; trended ACF large, positive, slowly decaying; seasonal peaks), §2.9 White noise (95% of spikes within ±1.96/√T), read 2026-10-31, sha256:9ac4109a793cf41388d4d737c2b457334d63fe527f8276ded8ebe829b8e1d72c — https://otexts.com/fpp3/acf.html"
    - "Shumway & Stoffer, Time Series Analysis and Its Applications Using R, EZ Edition (CC BY-NC 4.0, version 2016.12.30), Property 1.2 (PDF p.24: white-noise sample ACF approx N(0,1/n), ±2/√n), §1.5 CCF Def. 1.5/1.11, §3.2 eqs (3.3), (3.9), (3.13) (PDF pp.57-61: φ(B)x_t = θ(B)w_t), §3.7 overdifferencing (PDF p.88), §3.9 Regression with Autocorrelated Errors (PDF pp.94-96), §5.2 Unit Root Testing (PDF p.161: DF null H0: φ = 1), sha256:a0fd39387167c0c6b618f4bd853e99782e418ba4679b42542a4fb664b4aa463d — http://www.math-evry.cnrs.fr/_media/members/aguilloux/enseignements/timeseries_light_free.pdf"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 5, §5.4 Residual diagnostics, §5.5 prediction intervals (naïve σ√h), read 2026-10-31, sha256:3f114823a602e9008e8a85e0e7557e03e9c59232317d61304a8b02353e4e7016 — https://otexts.com/fpp3/residuals.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 9, §9.1 unit-root tests, §9.2 Backshift notation, §9.3 AR(1) as MA(∞), §9.5 ARIMA in backshift form (eq. 9.2), roots outside unit circle, ACF/PACF patterns for AR/MA identification, §9.8 forecasting steps and prediction intervals, read 2026-10-31, sha256:5f778f68d8dcb368933b34ee303bb1bc883425b2da4a801a7d5622a98a7ffa47 — https://otexts.com/fpp3/backshift.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Correlogram.md
---

**A correlogram** is the plot of the sample autocorrelations $r_k$ of a [[Time Series|time series]] against the lag $k$. It is drawn with bounds that mark how large a correlation must be before it can be told apart from zero. It is the picture through which the [[Autocorrelation Function|ACF]] (and, drawn the same way, the [[Partial Autocorrelation Function|PACF]]) is read, both to identify a model and to check its residuals.

> $$r_k = \frac{c_k}{c_0}$$
>
> $$c_k = \frac{1}{n}\sum_{t=1}^{n-k}(x_t - \bar{x})(x_{t+k} - \bar{x})$$
>
> $$\text{bounds} = \pm\frac{1.96}{\sqrt{n}} \approx \pm\frac{2}{\sqrt{n}}$$

- Lag $k$ runs along the horizontal axis and $r_k$ up the vertical. The first bar is always $r_0 = 1$. For a white-noise series and large $n$, each $r_k$ is approximately normal with mean $0$ and standard deviation $1/\sqrt{n}$, so about $95\%$ of the bars should fall within $\pm 1.96/\sqrt{n}$, usually rounded to two standard errors, $\pm 2/\sqrt{n}$. If a question prints its own bounds, use the ones it gives.
- **Patterns to recognise:**
  - slow, near-linear decay from close to $1$ means a trend or other non-stationarity; [[Differencing|difference]] before reading anything else. It shows that a trend is there, not which way it runs: a rising and a falling trend give the same slow decay, since $r_k$ is unchanged when every $x_t$ is replaced by $-x_t$ (each deviation from $\bar{x}$ changes sign, so their products do not)
  - peaks at lags $s, 2s, \ldots$ ($s = 12$ for monthly data, $s = 4$ for quarterly) mean [[Seasonality|seasonality]]
  - geometric decay, alternating in sign if $\phi < 0$, suggests AR behaviour; spikes up to lag $q$ and nothing after suggest MA($q$)
  - everything inside the bounds looks like [[White Noise|white noise]]
- **Residual check.** After fitting, the correlogram of the [[Residual|residuals]] should look like white noise. If it does not, the lag of the surviving spike says what is missing. A spike at lag $1$ or $2$ suggests an extra AR or MA term. One at lag $12$ (monthly) or $4$ (quarterly) suggests a seasonal term. Read the residual PACF the same way.
- **Chance breaches.** The bounds are pointwise $95\%$ limits, so about $1$ lag in $20$ crosses them by chance. A marginal breach at an unremarkable lag is weak evidence. A clear breach at lag $1$ or at a seasonal lag is not.
- The bounds assume stationarity. On a trending series nearly every bar is significant, and the plot says nothing about the ARMA orders until the trend is removed. See [[Deterministic and Stochastic Trend]].
- The [[Cross-Correlation|cross-correlation]] of two series is plotted the same way, but over negative as well as positive lags.

> [!example]- Reading the Raw Correlogram of Monthly Claim Counts {Example}
> A series of $n = 96$ monthly reported claim counts has $r_1 = 0.91$. The autocorrelations decline slowly to $0.55$ at lag $24$, with local peaks at lags $12$ and $24$. What does the correlogram show, and what should be done next?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{bounds} &= \pm \frac{2}{\sqrt{96}} \\
> > &= \pm 0.204
> > \end{align*}
> > $$
> > Every bar is far outside. The **slow decay** says the series is not stationary (a trend in claim volume), and the **peaks at 12 and 24** say there is an annual cycle.
> >
> > No AR or MA order can be read from this plot. Remove the trend and the seasonal pattern first (a first difference and a lag-12 seasonal difference, or a decomposition), then re-plot the ACF and PACF of what remains.

> [!example]- Residual Correlogram After an AR(1) Fit {Example}
> An AR(1) is fitted to $120$ months of claim frequency. The residual correlogram, plotted to lag $24$, shows $r_1 = 0.04$, $r_2 = -0.07$, $r_5 = 0.19$ and $r_{12} = 0.31$. All other lags lie within $\pm 0.10$. Is the model adequate?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{bounds} &= \pm \frac{2}{\sqrt{120}} \\
> > &= \pm 0.183
> > \end{align*}
> > $$
> > $r_5 = 0.19$ is only just outside, at an unremarkable lag. With $24$ lags plotted, about $1.2$ breaches are expected by chance, so it is not evidence on its own.
> >
> > $r_{12} = 0.31$ is well outside, **and at the seasonal lag**. The AR(1) has left the annual pattern in the residuals. **Not adequate:** add a seasonal term (a seasonal AR or MA at lag $12$, or a seasonal difference), refit, and check the correlogram again.
