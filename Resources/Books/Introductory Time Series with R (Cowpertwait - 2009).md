---
Title: "Introductory Time Series with R"
Authors: "Paul S.P. Cowpertwait, Andrew V. Metcalfe"
Year: "2009"
date: "2009"
Publisher: Springer (Use R! series)
Type: Textbook
Available from: "[link.springer.com](https://link.springer.com/book/10.1007/978-0-387-88698-5)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:390632ddda18a94661c1f8a219040aff2def9cd015390d6b62ebf66604e00c31
  sources: []
  open_findings: 0
  log: .verify/Resources/Books/Introductory Time Series with R (Cowpertwait - 2009).md
---
![[Introductory Time Series with R (Cowpertwait - 2009) - Cover.svg]]

The [[Time Series]] text on the [[Exam MAS-II (CAS)|MAS-II]] syllabus, covering section D (objectives D1–D4). The book runs to 12 chapters, covering in order: time series data, correlation, forecasting strategies, basic stochastic models, regression, stationary models, non-stationary models, long-memory processes, spectral analysis, system identification, multivariate models, and state space models. **MAS-II is examined on the first seven** — the constant-variance material through non-stationary models — and does not reach spectral analysis or state space models.

Every method is developed alongside R code on a real series; the data sets are on the authors' companion site.

## What the syllabus takes from it

### Time series data

- Plotting a series; [[Time Series Decomposition|decomposition]] into trend, [[Seasonality|seasonal]] and irregular components
- Additive versus multiplicative decomposition, and the log transform that converts one to the other
- The centred moving-average trend estimate and the observations it loses at each end

### Correlation

- The [[Autocorrelation Function]] and the correlogram, with the $\pm 1.96/\sqrt{n}$ significance bands
- The [[Partial Autocorrelation Function]] and what it isolates that the ACF does not
- Reading non-stationarity and seasonality off a correlogram

### Forecasting strategies

- [[Exponential Smoothing|Simple exponential smoothing]], Holt's linear method and Holt-Winters seasonal smoothing
- Choosing $\alpha$, $\beta$, $\gamma$ by minimizing one-step forecast error

### Basic stochastic models

- [[White Noise]] and the [[Random Walk]]; the random walk with drift
- [[Stationarity]] and the unit-root problem
- [[Differencing]] to achieve stationarity, and the cost of over-differencing

### Regression

- Fitting a [[Deterministic and Stochastic Trend|deterministic trend]] and seasonal indicators by regression
- Autocorrelated residuals and generalized least squares
- Spurious regression between two series with stochastic trends

### Stationary and non-stationary models

- [[Autoregressive Model|AR]], [[Moving Average Model|MA]] and ARMA processes; identification from the ACF/PACF pair
- [[ARIMA]] models and seasonal ARIMA $(p,d,q)(P,D,Q)_s$
- Model selection by [[AIC]] and residual diagnostics
- [[Time Series Forecast|Forecasting]] and prediction intervals

## Links
- [Introductory Time Series with R (Springer)](https://link.springer.com/book/10.1007/978-0-387-88698-5)
- [Companion data sets](http://staff.elena.aut.ac.nz/Paul-Cowpertwait/ts/)
