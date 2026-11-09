---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:0b2cee5cfc5b48967ea02a5282e0fb49d536ff98200a4f603337f3d23549953c
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.1 random walk and random walk with drift, Table 9.1, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §5.2 naive forecasts optimal for a random walk, §5.5 Table 5.2 naive h-step sd = sigma*sqrt(h), read 2026-10-18, sha256:d72117b50768eed014ba8ec8bc835940cdfa2b34ca7ec76b22ce2b0484877f9a — https://otexts.com/fpp3/toolbox.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Random Walk.md
---

![[Media/Figures/Random_Walk.svg|340]]

A **Random Walk** is a [[Time Series|time series]] $\{x_t\}$ in which each value is the previous value plus a [[White Noise|white noise]] term $w_t$ with variance $\sigma^2$:

> $$x_t = x_{t-1} + w_t$$

It is an [[Autoregressive Model|AR(1)]] model with coefficient $\alpha_1 = 1$, which is ARIMA$(0, 1, 0)$. Substituting back for the earlier values writes the series as its starting value plus the sum of the white noise terms:

> $$x_t = x_0 + w_1 + w_2 + \cdots + w_t$$

With $x_0$ fixed, the variance is

> $$\text{Var}(x_t) = t\sigma^2$$

The variance grows with $t$, so a random walk is not [[Stationarity|stationary]]. It wanders, with no mean to return to, and its sample [[Autocorrelation Function|autocorrelations]] start near 1 and decay very slowly.

> [!example]- A random walk starts at $x_0 = 100$, and its white noise has variance $\sigma^2 = 4$. What are the mean and standard deviation of $x_{25}$? {Example}
> - Each white noise term has mean zero, so $E[x_{25}] = 100$.
> - The variance is $25 \times 4 = 100$, so the standard deviation is $10$.

## Differencing a random walk

The first [[Differencing|difference]] of a random walk is

> $$\nabla x_t = x_t - x_{t-1} = w_t$$

The differenced series is white noise, so it is stationary. A random walk varies more than its differences do, because each value adds up all the earlier white noise terms.

> [!example]- Why is the standard deviation of a random walk's values larger than that of its first differences? {Example}
> - The first differences are the white noise terms, each with variance $\sigma^2$.
> - The value $x_t$ adds $t$ of those terms, and its variance $t\sigma^2$ grows with time.

## Random walk with drift

A random walk with drift $\delta$ adds a constant to each step:

> $$x_t = x_{t-1} + \delta + w_t$$

Its mean $x_0 + t\delta$ is a linear trend, but the trend is a [[Deterministic and Stochastic Trend|stochastic trend]], because each shock moves the level for good. The $h$-step forecast starts at the last observation and adds the drift for each step:

> $$\hat{x}_{t+h \mid t} = x_t + h\delta$$

The forecast error is the sum of $h$ white noise terms, so its standard deviation is $\sigma\sqrt{h}$. Without drift, the forecast is the last observation for every $h$.

> [!example]- A quarterly index follows $x_t = x_{t-1} + 1.4 + w_t$ with $\sigma = 3$, and $x_{40} = 218$. What is the forecast of $x_{43}$, with a 95% prediction interval? {Example}
> - The forecast is $218 + 3(1.4) = 222.2$.
> - The forecast error is $w_{41} + w_{42} + w_{43}$, with variance $3 \times 3^2 = 27$ and standard deviation $5.20$.
> - The interval is $222.2 \pm 1.96(5.20)$, from $212.0$ to $232.4$.

> [!trap] An AR(1) near 1 is not a random walk
> An AR(1) with $\alpha_1 = 0.98$ wanders like a random walk and has slowly decaying autocorrelations, but it is stationary and returns to its mean in the long run. Only $\alpha_1 = 1$ is a random walk.
