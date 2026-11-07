---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:749e6c04f61fc7d2a100d54cd0199c723e54585d0a7a49084b0c8bcd08e51e6a
  sources:
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.5 §5.8 Evaluating point forecast accuracy: e = y − ŷ, MAE = mean|e|, RMSE = sqrt(mean e²), errors 'on the same scale as the data', p_t = 100 e_t/y_t, MAPE = mean|p_t|, percentage errors unit-free but infinite/undefined at y_t = 0 and extreme near 0; §5.5 naïve σ_h = σ√h, read 2026-10-31, sha256:3f114823a602e9008e8a85e0e7557e03e9c59232317d61304a8b02353e4e7016 — https://otexts.com/fpp3/accuracy.html"
    - "Hyndman & Athanasopoulos, Forecasting: Principles and Practice, 3rd ed. (OTexts, open online text), Ch.9 §9.3 AR(p), §9.4 AR(1) as MA(∞) with weights φ1^j, §9.5 eq.(9.4) c = μ(1 − φ1 − … − φp), §9.8 Forecasting (point-forecast recursion; MA(q) interval σ²[1+Σθ²]; AR(1) via MA(∞); stationary intervals converge; intervals too narrow — parameter and order uncertainty not included), §9.10 ETS(A,N,N) = ARIMA(0,1,1), read 2026-10-31, sha256:5f778f68d8dcb368933b34ee303bb1bc883425b2da4a801a7d5622a98a7ffa47 — https://otexts.com/fpp3/arima.html"
    - "R. Nau (Duke), 'What's the bottom line? How to compare models', 'The mean error (ME) and mean percentage error (MPE)… are signed measures of error which indicate whether the forecasts are biased'; MSE = VAR(E) + ME², sha256:fd3d4ff8bd34dc51afcdcf2636240c3622b315ef75eb7de03e2845acafcc060e — https://people.duke.edu/~rnau/compare.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Time Series Forecast.md
---

![[Media/Figures/Time_Series_Forecast.svg|340]]

A **Time Series Forecast** is the expected value of a future value $x_{t+k}$ of a [[Time Series|time series]], given the series observed up to time $t$. The $k$-step forecast is

> $$\hat{x}_{t+k \mid t} = E[x_{t+k} \mid x_t, x_{t-1}, \ldots]$$

The forecast is built recursively. Each known past value stands for itself, each future value is replaced by its forecast, and each future [[White Noise|white noise]] term is replaced by its mean, 0.

> [!example]- A series follows $x_t = 20 + 0.6x_{t-1} + w_t$, and $x_{50} = 61$. What are the one- and two-step forecasts? {Example}
> - $\hat{x}_{51 \mid 50} = 20 + 0.6(61) = 56.6$.
> - $\hat{x}_{52 \mid 50} = 20 + 0.6(56.6) = 53.96$, the forecast of $x_{51}$ standing in for its unknown value.

## Forecast error variance

The forecast error $x_{t+k} - \hat{x}_{t+k \mid t}$ is a sum of the $k$ future white noise terms, weighted, and its variance is

> $$\text{Var}(e_{t+k}) = \sigma^2\sum_{j=0}^{k-1}\psi_j^2$$

- $\sigma^2$ is the white noise variance, estimated by the mean square error of the fitted model.
- $\psi_0 = 1, \psi_1, \psi_2, \ldots$ are the weights of the model written as an infinite moving average.

The forecast standard error is the square root of this variance. For a stationary [[Autoregressive Model|AR(1)]] with coefficient $\alpha_1$, $\psi_j = \alpha_1^{\,j}$. The variance then levels off at the series' own variance $\sigma^2/(1 - \alpha_1^2)$, and the forecast decays to the mean. An [[Moving Average Model|MA($q$)]] forecast reaches the mean after $q$ steps.

> [!example]- A fitted AR(1) is $\hat{x}_t = 5 + 0.85x_{t-1}$, with an estimated mean square error of $13.645$. What is the standard error of the two-step forecast? {Example}
> - The two-step error variance is $\sigma^2(1 + \alpha_1^2) = 13.645(1 + 0.85^2) = 23.50$.
> - The standard error is $\sqrt{23.50} = 4.85$.

## Forecasting a random walk

A [[Random Walk|random walk]] $x_t = x_{t-1} + c_t$ has increments $c_t$ that are white noise with a mean, estimated by the sample mean $\bar{c}$ and sample standard deviation $s_c$ of the observed increments. Its $k$-step forecast and its standard error are

> $$\hat{x}_{t+k \mid t} = x_t + k\bar{c}$$

> $$\text{SE} = s_c\sqrt{k}$$

The forecast error is the sum of the $k$ actual future increments minus $k\bar{c}$. The forecast continues the trend of the increments from the last value, and its interval widens without limit.

> [!example]- A random walk's last value is 100, and its six observed increments are $3, 5, -1, 4, 2, 6$. What are the three-step forecast and its standard error? {Example}
> - The increments have mean $\bar{c} = 3.17$ and standard deviation $s_c = 2.48$.
> - The forecast is $100 + 3(3.17) = 109.5$.
> - The standard error is $2.48\sqrt{3} = 4.30$.

## Measuring forecast accuracy

A forecast is assessed on a held-out stretch of the series, not on the fitted data. With $m$ out-of-sample errors $e_t = x_t - \hat{x}_t$, each the actual observation minus its forecast, and percentage errors $p_t = 100\,e_t/x_t$, the comparison statistics are:

1. Mean error $\text{ME} = \frac{1}{m}\sum e_t$ and mean percentage error $\text{MPE} = \frac{1}{m}\sum p_t$ measure bias. Errors of opposite sign cancel in them.
2. Mean squared error $\text{MSE} = \frac{1}{m}\sum e_t^2$, or its root, and mean absolute error $\text{MAE} = \frac{1}{m}\sum |e_t|$ measure size in the data's units.
3. Mean absolute percentage error $\text{MAPE} = \frac{1}{m}\sum |p_t|$ measures size without units, but breaks down when some $x_t$ is zero or near it.

> [!example]- Three held-out values are $50, 40, 60$, and their forecasts are $48, 44, 57$. What are the ME and the MAE? {Example}
> - The errors are $50 - 48 = 2$, $40 - 44 = -4$ and $60 - 57 = 3$.
> - $\text{ME} = (2 - 4 + 3)/3 = 0.33$, a small bias because the errors largely cancel.
> - $\text{MAE} = (2 + 4 + 3)/3 = 3$.

The intervals built from these variances assume the model and its parameters are correct. They carry no parameter or model uncertainty, so they are optimistic in practice. A [[Prediction Interval|prediction interval]] turns the standard error into a range.
