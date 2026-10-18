---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:02e84889f3bbff527b798217824dfbc56e1cac13621703c9396943229e1f7504
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §2.3 trend, seasonal, cyclic patterns, §2.8 ACF, read 2026-10-18, sha256:a13a2a978731e95537586c671e4b4edda0fbb1711e81a1f01e2c2b967f4212b7 — https://otexts.com/fpp3/graphics.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.1 stationarity, differencing, seasonal differencing; §9.5 partial autocorrelations, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.2 Stationarity, sha256:bdd8bd72f717c2b0488542dade0efc709ed5cf65224e586ceb9af681f08c2099 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc442.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Time Series.md
---

A **Time Series** is a sequence of observations $\{Y_t\}$ indexed by time $t = 1, 2, \ldots, T$. Time series analysis models temporal dependence to understand structure and make forecasts.

**Key components of a time series:**

| Component | Description |
| :--- | :--- |
| **Trend** | Long-run upward or downward movement |
| **Seasonality** | Periodic fluctuations at fixed intervals (e.g., monthly, quarterly) |
| **Cycle** | Irregular longer-term oscillations |
| **Irregular/Noise** | Random, unpredictable variation |

**Stationarity** — a time series is (weakly) **stationary** if:
1. $E[Y_t] = \mu$ (constant mean)
2. $\text{Var}(Y_t) = \sigma^2$ (constant variance)
3. $\text{Cov}(Y_t, Y_{t+h}) = \gamma(h)$ depends only on lag $h$, not on $t$

- Non-stationary series with a **trend** can often be made stationary by **differencing**: $\nabla Y_t = Y_t - Y_{t-1}$
- **Seasonal differencing**: $\nabla_s Y_t = Y_t - Y_{t-s}$ removes seasonality of period $s$
- The **autocorrelation function (ACF)** $\rho(h) = \text{Cor}(Y_t, Y_{t+h})$ and **partial ACF (PACF)** describe temporal dependence
- [[ARIMA]] models are the standard framework for stationary (and differenced) time series

![[Media/Figures/Time_Series.svg|340]]

> [!example]- Identifying Trend and Seasonality {Example}
> Monthly insurance premium volumes show a consistent upward drift over 5 years and a recurring spike each January. Identify the components.
>
> > [!answer]-
> > The upward drift is a **trend** (likely due to inflation and portfolio growth). The January spike is **seasonality** (period $s = 12$). An appropriate model might include a linear trend term and seasonal indicator variables, or seasonal differencing in an [[ARIMA]] framework.

> [!example]- Testing for Stationarity {Example}
> The ACF of a series $\{Y_t\}$ decays very slowly, remaining significantly positive for many lags. What does this suggest?
>
> > [!answer]-
> > Slow decay of the ACF is a hallmark of a **non-stationary** series (often a random walk or trend-stationary process). First-differencing $\nabla Y_t = Y_t - Y_{t-1}$ is typically applied to induce stationarity before fitting an [[ARIMA]] model.
