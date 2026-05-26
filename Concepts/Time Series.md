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
