---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:checker-ts
  content_hash: sha256:b3b6ed16776aeb5171419fe6f3838bb0b305527acb4f348747defa2b1b10f132
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

A **deterministic trend** is a fixed function of time that the series returns to after a shock; a **stochastic trend** is a unit root, where each shock permanently moves the level. They look alike on a plot and demand opposite treatments — the distinction that objective D3 turns on.

> $$\text{deterministic: } Y_t = \alpha + \beta t + z_t, \quad z_t \text{ stationary}$$
>
> $$\text{stochastic: } Y_t = \delta + Y_{t-1} + \varepsilon_t \quad (\text{[[Random Walk]] with drift})$$

| | Deterministic (trend-stationary) | Stochastic (difference-stationary) |
| :--- | :--- | :--- |
| Effect of a shock | dies out — the series returns to the line | **permanent** — the level shifts forever |
| Correct treatment | regress on $t$, model the residuals | [[Differencing|difference]] the series |
| $\mathrm{Var}(Y_t)$ | bounded | grows with $t$ |
| Long-horizon forecast | the trend line | last value plus $h\delta$, with a widening interval |

- **Getting it wrong costs both ways.** Differencing a trend-stationary series over-differences it, injecting a spurious negative MA(1) term. Detrending a unit-root series leaves the trend behind and the residuals still non-stationary
- The formal test is a unit-root (Dickey–Fuller) test: $H_0$ is a stochastic trend
- Forecast intervals differ sharply — a deterministic trend gives intervals of roughly constant width, a stochastic one gives intervals widening as $\sqrt{h}$
- **Spurious regression**: two independent series with stochastic trends can show a highly significant regression and a high $R^2$. Always check the residual [[Autocorrelation Function|ACF]] before believing a time-series regression
- **Extrapolating a deterministic trend** carries the fitted slope forward unchanged, so it assumes the slope will not change over the forecast horizon. That assumption is easiest to defend a short way ahead, where the trend has little time to change; a stochastic trend is the safer forecast over longer horizons, because its intervals allow for the growth rate to change
- **Autocorrelated residuals in a trend regression.** [[Ordinary Least Squares|OLS]] standard errors assume uncorrelated errors. Errors at adjacent times are often positively correlated, and then the OLS standard errors tend to underestimate the true ones: confidence intervals are too narrow and p-values too small, so a coefficient can look significant when it is not
- **Generalized least squares (GLS)** fixes this by modelling the errors' correlation instead of assuming it away. With error covariance matrix $\Sigma$ (for time series, built from the residual autocorrelations, e.g. an AR(1) error), $\hat\beta_{GLS} = (X'\Sigma^{-1}X)^{-1}X'\Sigma^{-1}y$ with $\mathrm{Var}(\hat\beta_{GLS}) = (X'\Sigma^{-1}X)^{-1}$, so its standard errors account for the autocorrelation that the OLS formula $\sigma^2(X'X)^{-1}$ ignores. Its advantage comes from that correlation structure: GLS is the maximum likelihood estimator under correlated normal errors, not under white noise, where it reduces to OLS. In practice, fit OLS, identify an ARMA model for its residuals, then refit by GLS (or maximum likelihood) with that error model and check that the new residuals look like [[White Noise|white noise]]

![[Media/Figures/Deterministic_and_Stochastic_Trend.svg|340]]

> [!example]- Which Trend Is It? {Example}
> A 60-quarter premium index trends upward. Regressing on $t$ gives $R^2 = 0.94$ but residuals with $\hat\rho_1 = 0.93$ decaying very slowly. First-differencing gives a series with $\hat\rho_1 = 0.11$ and nothing else significant. Which trend, and what is the model?
>
> > [!answer]-
> > **Stochastic.** The detrended residuals are still non-stationary — $\hat\rho_1 = 0.93$ with slow decay is a unit root that the regression did not remove. A true deterministic trend would leave stationary residuals.
> > First differencing produces something close to [[White Noise]], so the model is a **random walk with drift**, ARIMA(0,1,0) with a constant. The $R^2 = 0.94$ from the trend regression is the spurious-regression trap.
