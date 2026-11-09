---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:a42b5cb51fa5f4adc44640d90226493b30fabc4eeafa07e9f561652a329943c5
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.2 §2.8 Autocorrelation (r_k formula, trend and seasonal ACF patterns), §2.9 White noise (bounds ±1.96/√T), read 2026-10-18, sha256:a13a2a978731e95537586c671e4b4edda0fbb1711e81a1f01e2c2b967f4212b7 — https://otexts.com/fpp3/graphics.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), §9.5 ACF/PACF identification, read 2026-10-18, sha256:35587d5a25830d81dcb41d6196d18eaee424556c40cae948bf52a5a1d1a79650 — https://otexts.com/fpp3/arima.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods (public domain), 6.4.4.6 Box-Jenkins Model Identification, sha256:f6bec26320777b285bb8a39e47608912daa869d9303a23d4d47dc3f5678e8ee7 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc446.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Autocorrelation Function.md
---

![[Media/Figures/Autocorrelation_Function.svg|340]]

An **Autocorrelation Function** (ACF) is the correlation between the values of a [[Stationarity|stationary]] [[Time Series|time series]] $\{x_t\}$ that are $k$ periods apart, as a function of the lag $k$. The autocorrelation at lag $k$ is

> $$\rho_k = \frac{\gamma_k}{\gamma_0}$$

- $\gamma_k = \text{Cov}(x_t, x_{t+k})$ is the autocovariance at lag $k$, the same for every $t$ in a stationary series.
- $\gamma_0$ is the variance of the series.

$\rho_0 = 1$ always, and $\rho_k = \rho_{-k}$, so only positive lags are reported. Positive autocorrelation means successive values tend to sit on the same side of the mean. The same measure is read off the successive draws of a simulated Markov chain, $k$ iterations apart.

> [!example]- A stationary series has variance $\gamma_0 = 25$ and autocovariance $\gamma_2 = 10$ at lag 2. What is its autocorrelation at lag 2? {Example}
> - $\rho_2 = \gamma_2/\gamma_0 = 10/25 = 0.4$.

## Sample autocorrelation

From $n$ observations $x_1, \ldots, x_n$ with sample mean $\bar{x}$, the sample autocovariance at lag $k$ is

> $$c_k = \frac{1}{n}\sum_{t=1}^{n-k}(x_t - \bar{x})(x_{t+k} - \bar{x})$$

and the sample autocorrelation is

> $$r_k = \frac{c_k}{c_0} = \frac{\sum_{t=1}^{n-k}(x_t - \bar{x})(x_{t+k} - \bar{x})}{\sum_{t=1}^{n}(x_t - \bar{x})^2}$$

- The numerator sums only the $n - k$ available pairs, and the denominator sums over all $n$ observations.
- Both use the one overall mean $\bar{x}$, not a separate mean for each set of pairs.

> [!example]- What are the sample autocorrelations at lags 1 and 2 of the series $10, 11, 13, 12, 14$? {Example}
> - The mean is $\bar{x} = 12$, so the deviations are $-2, -1, 1, 0, 2$.
> - The squared deviations sum to $4 + 1 + 1 + 0 + 4 = 10$.
> - The lag-1 products of deviations sum to $(-2)(-1) + (-1)(1) + (1)(0) + (0)(2) = 1$, so $r_1 = 1/10 = 0.1$.
> - The lag-2 products sum to $(-2)(1) + (-1)(0) + (1)(2) = 0$, so $r_2 = 0$.

## Autocorrelation of AR and MA models

An [[Autoregressive Model|AR(1)]] model $x_t = \alpha_1 x_{t-1} + w_t$ has autocorrelation

> $$\rho_k = \alpha_1^{\,k}$$

The ACF of an AR model tails off geometrically, alternating in sign when $\alpha_1 < 0$. The ACF of a [[Moving Average Model|moving average]] MA($q$) model cuts off: $\rho_k = 0$ for every $k > q$. An ACF that decays gradually without cutting off rules out a pure MA model. The [[Partial Autocorrelation Function|partial autocorrelation function]] does the reverse job, cutting off for AR models.

> [!example]- An AR(1) model has $\alpha_1 = 0.7$. What are its autocorrelations at lags 1, 2 and 3? {Example}
> - $\rho_1 = 0.7$.
> - $\rho_2 = 0.7^2 = 0.49$.
> - $\rho_3 = 0.7^3 = 0.343$, so the ACF tails off rather than cutting off.

## Autocorrelation of residuals

After a model is fitted, the sample ACF of its [[Residual|residuals]] should look like [[White Noise|white noise]]. If every residual autocorrelation lies within the approximate bounds $\pm 2/\sqrt{n}$, no serial correlation remains and the model's order is adequate. The plot of the sample ACF with its bounds is the [[Correlogram|correlogram]].

Sample autocorrelations of a stationary series die out quickly. Autocorrelations that decay slowly over many lags suggest a non-stationary series, which calls for [[Differencing|differencing]].

> [!example]- An AR(1) is fitted to 100 observations, and the residuals have $r_1 = 0.05$, $r_2 = -0.12$ and $r_3 = 0.08$. Is serial correlation left in the residuals? {Example}
> - The bounds are $\pm 2/\sqrt{100} = \pm 0.2$.
> - All three residual autocorrelations lie inside them.
> - No serial correlation remains, so the AR(1) order is adequate on this evidence.
