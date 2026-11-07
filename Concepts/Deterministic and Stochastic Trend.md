---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:checker-ts
  content_hash: sha256:bc523b0ed11531f4e348cd853d937bda52d95be7482cc17c0161c67199886415
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 10, §10.1 Estimation (ignoring error autocorrelation: tests incorrect, p-values too small), §10.4 Stochastic and deterministic trends (implicit assumption slope won't change; stochastic safer especially for longer horizons; wider intervals), read 2026-10-31, sha256:d593f252a70f4c83982101b306992502d55992de8bc4cfc02e8b27174e9db52c — https://otexts.com/fpp3/regarima.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 7, §7.3 Spurious regression, read 2026-10-31, sha256:84b44c855b4aae3d30f8ebcfc93c3c29c7aa43d57b8c4d00147e1bbda41cfbc5 — https://otexts.com/fpp3/regression.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 9, §9.1 unit-root tests, §9.2 Backshift notation, §9.3 AR(1) as MA(∞), §9.5 ARIMA in backshift form (eq. 9.2), roots outside unit circle, ACF/PACF patterns for AR/MA identification, §9.8 forecasting steps and prediction intervals, read 2026-10-31, sha256:5f778f68d8dcb368933b34ee303bb1bc883425b2da4a801a7d5622a98a7ffa47 — https://otexts.com/fpp3/backshift.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch. 5, §5.4 Residual diagnostics, §5.5 prediction intervals (naïve σ√h), read 2026-10-31, sha256:3f114823a602e9008e8a85e0e7557e03e9c59232317d61304a8b02353e4e7016 — https://otexts.com/fpp3/residuals.html"
    - "Shumway & Stoffer, Time Series Analysis and Its Applications Using R, EZ Edition (CC BY-NC 4.0, version 2016.12.30), Property 1.2 (PDF p.24: white-noise sample ACF approx N(0,1/n), ±2/√n), §1.5 CCF Def. 1.5/1.11, §3.2 eqs (3.3), (3.9), (3.13) (PDF pp.57-61: φ(B)x_t = θ(B)w_t), §3.7 overdifferencing (PDF p.88), §3.9 Regression with Autocorrelated Errors (PDF pp.94-96), §5.2 Unit Root Testing (PDF p.161: DF null H0: φ = 1), sha256:a0fd39387167c0c6b618f4bd853e99782e418ba4679b42542a4fb664b4aa463d — http://www.math-evry.cnrs.fr/_media/members/aguilloux/enseignements/timeseries_light_free.pdf"
    - "Fox & Weisberg, Time-Series Regression and Generalized Least Squares in R, online appendix to An R Companion to Applied Regression, 3rd ed. (rev. 2018-09-26), §1 (OLS Var σ²(X'X)^-1; ε ~ N(0,Σ) log-likelihood maximized by b_GLS = (X'Σ^-1X)^-1X'Σ^-1y, Var = (X'Σ^-1X)^-1), §2 (Σ from error autocorrelations ρ_s, AR(1) errors), read 2026-10-31, sha256:27e9d3c8913e367ad2f6d03aab0bda79ecaeef9c19a3edef7c68b62419100974 — https://www.john-fox.ca/Companion/appendices/Appendix-Timeseries-Regression.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (Springer, seventh printing, free PDF), §3.3.3 Potential Problems, 2. Correlation of Error Terms, pp.94-95 (correlated errors: SEs underestimate the true SEs, intervals too narrow, p-values too low; adjacent time points often positively correlated) — same passage as ISLR 2nd ed. §3.3.3, read 2026-10-31, sha256:dd6997f961a132293e79cdf1b4969be666dcd4a1660fc5716691b46e29e118f9 — https://www.statlearning.com/s/ISLR-Seventh-Printing.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Deterministic and Stochastic Trend.md
---

![[Media/Figures/Deterministic_and_Stochastic_Trend.svg|340]]

A **Deterministic Trend** is a trend that is a fixed function of time, such as a line, a polynomial or a sine-cosine term, usually with a plausible physical explanation. A **Stochastic Trend** is a trend that changes direction unpredictably, with no plausible physical explanation, and is modelled as a random process. A linear deterministic trend is

> $$x_t = \alpha_0 + \alpha_1 t + z_t$$

- $\{z_t\}$ is a [[Stationarity|stationary]] series.

The simplest stochastic trend is a [[Random Walk|random walk]] with drift $\delta$:

> $$x_t = x_{t-1} + \delta + w_t$$

- $\{w_t\}$ is [[White Noise|white noise]].

Both have a mean that grows linearly in $t$. They differ in what a shock does. Under a deterministic trend the series returns to the trend line, and under a stochastic trend each shock moves the level for good. High serial correlation with random error is the mark of a stochastic trend.

> [!example]- A trend regression on 60 quarters gives $R^2 = 0.94$, but its residuals have a lag 1 autocorrelation of 0.93 that decays very slowly. The first differences have a lag 1 autocorrelation of 0.11 and nothing else significant. Which kind of trend is it? {Example}
> - A deterministic trend would leave stationary residuals, and these residuals are not stationary.
> - The first differences look like white noise.
> - The trend is stochastic, and the series is a random walk with drift.

## Fitting a deterministic trend by regression

A deterministic trend is fitted by [[Linear Regression|regression]] of the series on functions of time $t$, and the residuals are then modelled as a stationary series. Its forecast extends the fitted function:

> $$\hat{x}_{t} = \hat{\alpha}_0 + \hat{\alpha}_1 t$$

A deterministic trend follows a fixed form, so it is better suited to extrapolation than a stochastic trend, whose future path is driven by random shocks. Short-term extrapolation is the easiest to justify, because underlying trends usually change slowly relative to the forecast lead time.

> [!example]- A trend regression gives $\hat{x}_t = 140 + 3.2t$. What is the forecast for $t = 50$? {Example}
> - The forecast extends the fitted line to $t = 50$.
> - $\hat{x}_{50} = 140 + 3.2(50) = 300$.

## Autocorrelated residuals in a trend regression

The standard errors of [[Ordinary Least Squares|least squares]] assume uncorrelated errors. When adjacent errors are positively correlated, those standard errors understate the true ones, so a trend can look significant when it is not. Generalized least squares fits the regression with the errors' correlation modelled, for example as an AR(1), and its estimator is

> $$\hat{\boldsymbol{\beta}}_{GLS} = (\mathbf{X}^T\boldsymbol{\Sigma}^{-1}\mathbf{X})^{-1}\mathbf{X}^T\boldsymbol{\Sigma}^{-1}\mathbf{y}$$

- $\boldsymbol{\Sigma}$ is the covariance matrix of the errors.

With uncorrelated errors of equal variance, it reduces to least squares.

> [!example]- A trend regression's residuals have a lag 1 autocorrelation of 0.6. What happens to the least squares standard errors, and what is done instead? {Example}
> - Positively correlated errors make the least squares standard errors too small.
> - The regression is refitted by generalized least squares with an AR(1) model for the errors.
> - The new residuals are checked to look like white noise.

> [!trap] Differencing a deterministic trend
> Differencing a series whose trend is deterministic removes the trend but over-differences the stationary part, creating a large negative lag 1 autocorrelation. Regressing a series with a stochastic trend on $t$ leaves residuals that are still not stationary. Check which trend it is before choosing the treatment.
