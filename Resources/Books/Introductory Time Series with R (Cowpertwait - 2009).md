---
Title: "Introductory Time Series with R"
Authors: "Paul S.P. Cowpertwait and Andrew V. Metcalfe"
Publisher: "Springer"
Year: "2009"
date: "2009"
Type: "Textbook"
ISBN: "978-0-387-88697-8"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1185bb79ff9e7fad79777b6c36647fee515907db21f52fba80f7502d5fc98eec
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Introductory Time Series with R (Cowpertwait - 2009).md
---
![[Introductory Time Series with R (Cowpertwait - 2009) - Cover.svg]]

A concise text that takes the non-specialist, at a fairly quick pace, to where they can confidently apply a range of time series methods using R. It assumes a first-year university statistics course and treats each model the same way: a motivating section, the model defined in mathematical notation, R code that simulates data from it and fits the model to recover its parameters, and a fit to a historical data set with diagnostic plots. Each chapter ends with a summary of the R commands used and exercises; derivations sit in starred sections that can be skipped. Part of Springer's Use R! series.

> [!info] On the syllabus
> - [[Exam MAS-II (CAS)|Exam MAS-II]] — objectives D1–D4; Chapters 1–5 (excluding Sections 3.3 and 3.4), 6, and 7 (Sections 7.1, 7.2 and 7.3).

## 1 Time Series Data
- 1.1 Purpose
- 1.2 Time series
- 1.3 R language
- 1.4 Plots, trends, and seasonal variation
    - 1.4.1 A flying start: Air passenger bookings
    - 1.4.2 Unemployment: Maine
    - 1.4.3 Multiple time series: Electricity, beer and chocolate data
    - 1.4.4 Quarterly exchange rate: GBP to NZ dollar
    - 1.4.5 Global temperature series
- 1.5 [[Time Series Decomposition|Decomposition of series]]
    - 1.5.1 Notation
    - 1.5.2 Models
    - 1.5.3 Estimating trends and seasonal effects
    - 1.5.4 Smoothing
    - 1.5.5 Decomposition in R
- 1.6 Summary of commands used in examples
- 1.7 Exercises

## 2 Correlation
- 2.1 Purpose
- 2.2 Expectation and the ensemble
    - 2.2.1 Expected value
    - 2.2.2 The ensemble and stationarity
    - 2.2.3 Ergodic series\*
    - 2.2.4 Variance function
    - 2.2.5 [[Autocorrelation Function|Autocorrelation]]
- 2.3 The [[Correlogram|correlogram]]
    - 2.3.1 General discussion
    - 2.3.2 Example based on air passenger series
    - 2.3.3 Example based on the Font Reservoir series
- 2.4 Covariance of sums of random variables
- 2.5 Summary of commands used in examples
- 2.6 Exercises

## 3 Forecasting Strategies
- 3.1 Purpose
- 3.2 Leading variables and associated variables
    - 3.2.1 Marine coatings
    - 3.2.2 Building approvals publication
    - 3.2.3 Gas supply
- 3.3 Bass model
    - 3.3.1 Background
    - 3.3.2 Model definition
    - 3.3.3 Interpretation of the Bass model\*
    - 3.3.4 Example
- 3.4 [[Exponential Smoothing|Exponential smoothing]] and the Holt-Winters method
    - 3.4.1 Exponential smoothing
    - 3.4.2 Holt-Winters method
    - 3.4.3 Four-year-ahead forecasts for the air passenger data
- 3.5 Summary of commands used in examples
- 3.6 Exercises

## 4 Basic Stochastic Models
- 4.1 Purpose
- 4.2 [[White Noise|White noise]]
    - 4.2.1 Introduction
    - 4.2.2 Definition
    - 4.2.3 Simulation in R
    - 4.2.4 Second-order properties and the correlogram
    - 4.2.5 Fitting a white noise model
- 4.3 [[Random Walk|Random walks]]
    - 4.3.1 Introduction
    - 4.3.2 Definition
    - 4.3.3 The [[Backward Shift Operator|backward shift operator]]
    - 4.3.4 Random walk: Second-order properties
    - 4.3.5 Derivation of second-order properties\*
    - 4.3.6 The [[Differencing|difference operator]]
    - 4.3.7 Simulation
- 4.4 Fitted models and diagnostic plots
    - 4.4.1 Simulated random walk series
    - 4.4.2 Exchange rate series
    - 4.4.3 Random walk with drift
- 4.5 [[Autoregressive Model|Autoregressive models]]
    - 4.5.1 Definition
    - 4.5.2 Stationary and non-stationary AR processes
    - 4.5.3 Second-order properties of an AR(1) model
    - 4.5.4 Derivation of second-order properties for an AR(1) process\*
    - 4.5.5 Correlogram of an AR(1) process
    - 4.5.6 [[Partial Autocorrelation Function|Partial autocorrelation]]
    - 4.5.7 Simulation
- 4.6 Fitted models
    - 4.6.1 Model fitted to simulated series
    - 4.6.2 Exchange rate series: Fitted AR model
    - 4.6.3 Global temperature series: Fitted AR model
- 4.7 Summary of R commands
- 4.8 Exercises

## 5 Regression
- 5.1 Purpose
- 5.2 Linear models
    - 5.2.1 Definition
    - 5.2.2 [[Stationarity]]
    - 5.2.3 Simulation
- 5.3 Fitted models
    - 5.3.1 Model fitted to simulated data
    - 5.3.2 Model fitted to the temperature series (1970–2005)
    - 5.3.3 Autocorrelation and the estimation of sample statistics\*
- 5.4 Generalised least squares
    - 5.4.1 GLS fit to simulated series
    - 5.4.2 Confidence interval for the trend in the temperature series
- 5.5 Linear models with seasonal variables
    - 5.5.1 Introduction
    - 5.5.2 Additive seasonal indicator variables
    - 5.5.3 Example: Seasonal model for the temperature series
- 5.6 Harmonic seasonal models
    - 5.6.1 Simulation
    - 5.6.2 Fit to simulated series
    - 5.6.3 Harmonic model fitted to temperature series (1970–2005)
- 5.7 Logarithmic transformations
    - 5.7.1 Introduction
    - 5.7.2 Example using the air passenger series
- 5.8 Non-linear models
    - 5.8.1 Introduction
    - 5.8.2 Example of a simulated and fitted non-linear series
- 5.9 [[Time Series Forecast|Forecasting]] from regression
    - 5.9.1 Introduction
    - 5.9.2 Prediction in R
- 5.10 Inverse transform and bias correction
    - 5.10.1 Log-normal residual errors
    - 5.10.2 Empirical correction factor for forecasting means
    - 5.10.3 Example using the air passenger data
- 5.11 Summary of R commands
- 5.12 Exercises

## 6 Stationary Models
- 6.1 Purpose
- 6.2 Strictly stationary series
- 6.3 [[Moving Average Model|Moving average models]]
    - 6.3.1 MA(q) process: Definition and properties
    - 6.3.2 R examples: Correlogram and simulation
- 6.4 Fitted MA models
    - 6.4.1 Model fitted to simulated series
    - 6.4.2 Exchange rate series: Fitted MA model
- 6.5 Mixed models: The ARMA process
    - 6.5.1 Definition
    - 6.5.2 Derivation of second-order properties\*
- 6.6 ARMA models: Empirical analysis
    - 6.6.1 Simulation and fitting
    - 6.6.2 Exchange rate series
    - 6.6.3 Electricity production series
    - 6.6.4 Wave tank data
- 6.7 Summary of R commands
- 6.8 Exercises

## 7 Non-stationary Models
- 7.1 Purpose
- 7.2 Non-seasonal [[ARIMA]] models
    - 7.2.1 Differencing and the electricity series
    - 7.2.2 Integrated model
    - 7.2.3 Definition and examples
    - 7.2.4 Simulation and fitting
    - 7.2.5 IMA(1, 1) model fitted to the beer production series
- 7.3 Seasonal ARIMA models
    - 7.3.1 Definition
    - 7.3.2 Fitting procedure
- 7.4 ARCH models
    - 7.4.1 S&P500 series
    - 7.4.2 Modelling volatility: Definition of the ARCH model
    - 7.4.3 Extensions and GARCH models
    - 7.4.4 Simulation and fitted GARCH model
    - 7.4.5 Fit to S&P500 series
    - 7.4.6 Volatility in climate series
    - 7.4.7 GARCH in forecasts and simulations
- 7.5 Summary of R commands
- 7.6 Exercises

## 8 Long-Memory Processes
- 8.1 Purpose
- 8.2 Fractional differencing
- 8.3 Fitting to simulated data
- 8.4 Assessing evidence of long-term dependence
    - 8.4.1 Nile minima
    - 8.4.2 Bellcore Ethernet data
    - 8.4.3 Bank loan rate
- 8.5 Simulation
- 8.6 Summary of additional commands used
- 8.7 Exercises

## 9 Spectral Analysis
- 9.1 Purpose
- 9.2 Periodic signals
    - 9.2.1 Sine waves
    - 9.2.2 Unit of measurement of frequency
- 9.3 Spectrum
    - 9.3.1 Fitting sine waves
    - 9.3.2 Sample spectrum
- 9.4 Spectra of simulated series
    - 9.4.1 White noise
    - 9.4.2 AR(1): Positive coefficient
    - 9.4.3 AR(1): Negative coefficient
    - 9.4.4 AR(2)
- 9.5 Sampling interval and record length
    - 9.5.1 Nyquist frequency
    - 9.5.2 Record length
- 9.6 Applications
    - 9.6.1 Wave tank data
    - 9.6.2 Fault detection on electric motors
    - 9.6.3 Measurement of vibration dose
    - 9.6.4 Climatic indices
    - 9.6.5 Bank loan rate
- 9.7 Discrete Fourier transform (DFT)\*
- 9.8 The spectrum of a random process\*
    - 9.8.1 Discrete white noise
    - 9.8.2 AR
    - 9.8.3 Derivation of spectrum
- 9.9 Autoregressive spectrum estimation
- 9.10 Finer details
    - 9.10.1 Leakage
    - 9.10.2 Confidence intervals
    - 9.10.3 Daniell windows
    - 9.10.4 Padding
    - 9.10.5 Tapering
    - 9.10.6 Spectral analysis compared with wavelets
- 9.11 Summary of additional commands used
- 9.12 Exercises

## 10 System Identification
- 10.1 Purpose
- 10.2 Identifying the gain of a linear system
    - 10.2.1 Linear system
    - 10.2.2 Natural frequencies
    - 10.2.3 Estimator of the gain function
- 10.3 Spectrum of an AR(p) process
- 10.4 Simulated single mode of vibration system
- 10.5 Ocean-going tugboat
- 10.6 Non-linearity
- 10.7 Exercises

## 11 Multivariate Models
- 11.1 Purpose
- 11.2 Spurious regression
- 11.3 Tests for unit roots
- 11.4 Cointegration
    - 11.4.1 Definition
    - 11.4.2 Exchange rate series
- 11.5 Bivariate and multivariate white noise
- 11.6 Vector autoregressive models
    - 11.6.1 VAR model fitted to US economic series
- 11.7 Summary of R commands
- 11.8 Exercises

## 12 State Space Models
- 12.1 Purpose
- 12.2 Linear state space models
    - 12.2.1 Dynamic linear model
    - 12.2.2 Filtering\*
    - 12.2.3 Prediction\*
    - 12.2.4 Smoothing\*
- 12.3 Fitting to simulated univariate time series
    - 12.3.1 Random walk plus noise model
    - 12.3.2 Regression model with time-varying coefficients
- 12.4 Fitting to univariate time series
- 12.5 Bivariate time series – river salinity
- 12.6 Estimating the variance matrices
- 12.7 Discussion
- 12.8 Summary of additional commands used
- 12.9 Exercises

## Sources
- [Introductory Time Series with R — front matter (Springer, 2009)](https://link.springer.com/content/pdf/bfm:978-0-387-88698-5/1) — the book's front matter, free from the publisher: title page, copyright page (ISBN, LCCN), the preface and the full table of contents
- [Introductory Time Series with R (Springer Nature Link)](https://link.springer.com/book/10.1007/978-0-387-88698-5) — the publisher's record: authors, the Use R! series, softcover and eBook ISBNs, and the list of 12 chapters, which agrees with the contents
- [CAS Exam MAS-II Content Outline (2025)](https://www.casact.org/sites/default/files/2023-06/MASII_Content_Outline.pdf) — the citation (Springer, 2009) and the assigned scope
