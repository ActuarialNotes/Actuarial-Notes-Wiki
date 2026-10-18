---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:8b55b44f05596f84656b49c5f9b99db3f93b9a0bd399f3384fa0db0def1e35e9
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §2.9 White noise (no autocorrelation; 95% of spikes within ±1.96/√T), read 2026-10-18, sha256:a13a2a978731e95537586c671e4b4edda0fbb1711e81a1f01e2c2b967f4212b7 — https://otexts.com/fpp3/graphics.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §5.4 Ljung-Box Q* = T(T+2) sum r_k^2/(T-k), read 2026-10-18, sha256:d72117b50768eed014ba8ec8bc835940cdfa2b34ca7ec76b22ce2b0484877f9a — https://otexts.com/fpp3/toolbox.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.7 portmanteau degrees of freedom l - K; §9.8 intervals assume uncorrelated, normal residuals, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/White Noise.md
---

**White noise** is a [[Time Series]] of uncorrelated, mean-zero, constant-variance terms. It is the input every [[ARIMA]] model is built from, and the thing a fitted model's residuals must look like if the model has captured everything.

> $$E[\varepsilon_t] = 0, \quad \mathrm{Var}(\varepsilon_t) = \sigma^{2}, \quad \mathrm{Cov}(\varepsilon_t, \varepsilon_s) = 0 \ (t \neq s)$$
>
> $$\rho_k = 0 \ \text{ for all } k \geq 1$$

- White noise is [[Stationarity|stationary]] by construction and completely **unforecastable** — the best prediction of $\varepsilon_{t+1}$ is 0, whatever the history
- **Gaussian white noise** additionally assumes normality, which is what prediction intervals need; uncorrelated does not imply independent without it
- The diagnostic use is the important one: after fitting, the residual [[Autocorrelation Function|ACF]] should show no spike outside the $\pm 1.96/\sqrt{n}$ bands. A surviving spike means structure the model has missed
- The **Ljung-Box** portmanteau test checks several lags at once: $Q = n(n+2)\sum_{k=1}^{h}\frac{\hat\rho_k^2}{n-k} \sim \chi^2_{h-p-q}$
- About 1 lag in 20 will breach the bands by chance — a single mid-range spike is not evidence of misfit

![[Media/Figures/White_Noise.svg|340]]

> [!example]- Are These Residuals White Noise? {Example}
> After fitting an ARIMA(1,1,0) to 100 observations, the residual ACF shows $\hat\rho_1 = 0.05$, $\hat\rho_2 = -0.31$, $\hat\rho_3 = 0.08$. Is the fit adequate?
>
> > [!answer]-
> > The bands are $\pm 1.96/\sqrt{100} = \pm 0.196$.
> > $\hat\rho_1$ and $\hat\rho_3$ sit well inside. $\hat\rho_2 = -0.31$ is **outside** — and at lag 2, not at some random high lag where a chance breach would be unsurprising.
> > **Not white noise.** There is structure left at lag 2; try adding an MA(2) or AR(2) term and re-check.
