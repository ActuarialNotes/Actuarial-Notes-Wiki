---
id: "masii-an-026"
exam: "Exam MAS-II"
topic: "Autocorrelation Function"
learning_objective: "Time Series with Constant Variance"
difficulty: medium
type: multi-part
bloom: analyze
wiki_link:
  - Concepts/Autocorrelation+Function
  - Concepts/Partial+Autocorrelation+Function
  - Concepts/Autoregressive+Model
  - Concepts/Moving+Average+Model
  - Concepts/White+Noise
points: 4
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8128f8c28b7aef495c4d273b600e0ea5245e0ae0145658ff374e8886eeb5a08c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-026.md
---

An analyst models four stationary series, each 200 observations long, built from quarterly claim-frequency data. For each one she has the sample autocorrelation function (ACF) and partial autocorrelation function (PACF) at lags 1 to 4. The approximate 95% significance bands are $\pm 1.96/\sqrt{200} = \pm 0.139$.

Match each series to the model its correlogram identifies. An option may be used more than once or not at all.

## Part a (1 point)
ACF: -0.38, -0.02, -0.03, 0.04. PACF: -0.38, -0.19, -0.14, -0.04.

- A) AR(1)
- B) AR(2)
- C) MA(1)
- D) MA(2)
- E) White noise

### Answer
C

### Explanation
The ACF has one significant value, at lag 1, and **cuts off** after it. The PACF **tails off**, with values of the same sign shrinking toward zero over lags 1 to 3. An ACF that cuts off after lag $q$ with a PACF that tails off is the signature of an MA($q$), here **MA(1)**.

The lag-1 value fits too. An MA(1) has $\rho_1 = \theta/(1+\theta^2)$, which can never exceed 0.5 in size, and $-0.38$ is inside that bound. A series with $\theta = -0.6$ has $\rho_1 = -0.44$.

- **A** applies the identification rule backwards, reading a single ACF spike as an AR(1). An AR(1)'s ACF decays geometrically, $\rho_k = \phi^k$, so its lag-2 value would be about $\rho_2 = (-0.38)^2 = 0.14$, not $-0.02$.
- **D** counts the significant PACF values at lags 1 and 2 as a cut-off of order 2. The order of an MA is read off the ACF, and the ACF here has only one significant lag.
- **E** misses the lag-1 value, which is well outside the bands.

## Part b (1 point)
ACF: -0.67, 0.49, -0.37, 0.26. PACF: -0.67, 0.08, -0.03, -0.02.

- A) AR(1)
- B) AR(2)
- C) MA(1)
- D) MA(2)
- E) White noise

### Answer
A

### Explanation
The PACF has one significant value, at lag 1, and **cuts off** after it. The ACF **tails off** geometrically while alternating in sign. An AR($p$) has a PACF that cuts off after lag $p$, so this is an **AR(1)**, with a negative coefficient near $\hat\phi = -0.67$. Its ACF should then be close to $\phi^k$: $(-0.67)^2 = 0.45$, $(-0.67)^3 = -0.30$ and $(-0.67)^4 = 0.20$, which is the pattern observed.

- **B** is what a reader concludes from an ACF that stays significant at every lag shown. But both AR(1) and AR(2) tail off in the ACF, and the PACF is what fixes the order: only lag 1 is significant here.
- **C** and **D** are ruled out because the ACF never cuts off. The alternating sign comes from the negative $\phi$, not from a moving average term.

## Part c (1 point)
ACF: -0.07, 0.04, 0.01, -0.05. PACF: -0.07, 0.03, 0.02, -0.05.

- A) AR(1)
- B) AR(2)
- C) MA(1)
- D) MA(2)
- E) White noise

### Answer
E

### Explanation
No autocorrelation or partial autocorrelation is outside $\pm 0.139$. That is what **white noise** looks like: values that are uncorrelated at every lag, with sample correlations scattered around zero with a standard error of about $\text{SE} = 1/\sqrt{200} = 0.071$.

- **A** and **C** read the lag-1 value of $-0.07$ as a small but real effect. It is about half the band width, well within what sampling alone produces.
- **B** and **D** have no support: nothing is significant at lag 2 or any other lag.

## Part d (1 point)
ACF: 0.72, 0.62, 0.47, 0.38. PACF: 0.72, 0.21, -0.07, 0.00.

- A) AR(1)
- B) AR(2)
- C) MA(1)
- D) MA(2)
- E) White noise

### Answer
B

### Explanation
The ACF **tails off** slowly, so the series has an autoregressive part. The PACF has significant values at lags 1 **and** 2 (0.21 > 0.139) and cuts off after lag 2. A PACF that cuts off after lag $p = 2$ identifies an **AR(2)**.

The ACF also decays more slowly than an AR(1)'s would. An AR(1) with $\phi = 0.72$ would have $\rho_2 = 0.72^2 = 0.52$, but the observed lag-2 value is 0.62. The extra lag-2 dependence is what the second PACF spike measures. (The series was generated from $Y_t = 0.5Y_{t-1} + 0.3Y_{t-2} + \varepsilon_t$, whose theoretical ACF is 0.71, 0.66, 0.54.)

- **A** reads only the lag-1 PACF spike and overlooks the one at lag 2.
- **D** reverses the identification rule, taking two significant PACF values as the cut-off of an MA(2). An MA(2)'s ACF would be zero beyond lag 2, but this one is 0.47 and 0.38 at lags 3 and 4.
- **C** has an ACF that cuts off after lag 1, and its $\lvert\rho_1\rvert$ can never exceed 0.5. That is impossible with 0.72.
