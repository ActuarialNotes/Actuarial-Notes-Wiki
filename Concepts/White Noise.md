---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8b55b44f05596f84656b49c5f9b99db3f93b9a0bd399f3384fa0db0def1e35e9
  sources: []
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
