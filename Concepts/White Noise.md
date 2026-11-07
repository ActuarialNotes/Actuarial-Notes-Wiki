---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:3b3511187696333dc72b29e27809f907935223d98f433f52382f83bfd428046a
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §2.9 White noise (no autocorrelation; 95% of spikes within ±1.96/√T), read 2026-10-18, sha256:a13a2a978731e95537586c671e4b4edda0fbb1711e81a1f01e2c2b967f4212b7 — https://otexts.com/fpp3/graphics.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §5.4 Ljung-Box Q* = T(T+2) sum r_k^2/(T-k), read 2026-10-18, sha256:d72117b50768eed014ba8ec8bc835940cdfa2b34ca7ec76b22ce2b0484877f9a — https://otexts.com/fpp3/toolbox.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.7 portmanteau degrees of freedom l - K; §9.8 intervals assume uncorrelated, normal residuals, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/White Noise.md
---

![[Media/Figures/White_Noise.svg|340]]

**White Noise** is a [[Time Series|time series]] $\{w_t\}$ of uncorrelated variables with mean zero and the same variance $\sigma^2$. Its properties are

> $$E[w_t] = 0, \quad \text{Var}(w_t) = \sigma^2, \quad \text{Cov}(w_t, w_s) = 0 \ (t \ne s)$$

When the $w_t$ are also independent and normal, the series is **Gaussian white noise**. Uncorrelated variables are not necessarily independent, so the normality is an extra assumption.

White noise is [[Stationarity|stationary]], and its autocorrelation is $\rho_k = 0$ for every lag $k \ge 1$. It cannot be forecast: future white noise terms have expectation zero, so they drop out of the point forecast of any time series model.

> [!example]- A series is $x_t = 50 + 2t + w_t$, with $\{w_t\}$ white noise. What is the forecast of $x_{21}$ made at time 20? {Example}
> - The future term $w_{21}$ has expectation zero, so it drops out of the forecast.
> - The forecast is $50 + 2(21) = 92$.

## White noise as a residual check

A fitted model has captured the dependence in a series when its residuals look like white noise. For white noise, the sample autocorrelations $r_k$ of $n$ observations lie within

> $$\pm \frac{2}{\sqrt{n}}$$

- The bands are approximately 95% bounds, $\pm 1.96/\sqrt{n}$.

About one sample autocorrelation in 20 falls outside the bands by chance. A large value at a low lag is evidence of structure the model has missed.

> [!example]- After fitting a model to 100 observations, the residuals have $r_1 = 0.05$, $r_2 = -0.31$ and $r_3 = 0.08$. Are the residuals white noise? {Example}
> - The bands are $\pm 1.96/\sqrt{100} = \pm 0.196$.
> - $r_1$ and $r_3$ are inside the bands.
> - $r_2 = -0.31$ is outside, at a low lag.
> - The residuals are not white noise, so the model has missed structure at lag 2.
