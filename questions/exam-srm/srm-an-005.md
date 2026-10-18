---
id: "srm-an-005"
exam: "Exam SRM"
topic: "ARCH Model"
learning_objective: "Time Series Models"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/ARCH+Model
  - Concepts/Autocorrelation+Function
  - Concepts/Autoregressive+Model
  - Concepts/White+Noise
  - Concepts/Stationarity
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:5faebcbe29c67c836d973d6ac72ee1ffb641a6349e917957cb98f2cce7219b2f
  sources:
    - "Frees, Regression Modeling with Actuarial and Financial Applications (Cambridge, 2010) — author-posted online text, Ch. 9 Forecasting and Time Series Models, §9.5 ARCH/GARCH Models (volatility clustering; ARCH(p) conditional variance recursion; weak stationarity with constant unconditional variance), sha256:b2cb2744c12fcd2d8921bc23c8fe10c2304561e9c117b8ee2d0039791a7f4b3f — https://users.ssc.wisc.edu/~ewfrees/ActuarialRegression2009/C9Forecast.html"
    - "Frees, Regression Modeling with Actuarial and Financial Applications (Cambridge, 2010) — author-posted online text, Ch. 8 Autocorrelations and Autoregressive Models, §8.2 (se(r_k) = 1/sqrt(T); rule of thumb |r_k| > 2 se(r_k) at 5%), sha256:815296f6791408afe67faf1e7bf9f91f23dcc23c3461e56bd40da90f89bd6ff8 — https://users.ssc.wisc.edu/~ewfrees/ActuarialRegression2009/C8AR.html"
    - "SOA Exam SRM syllabus, January 2027 (Basics of Statistical Learning; Linear Models obj. 7; Time Series Models obj. 1-2; readings ISLR Ch.2 §1-3, Ch.3 §1-6, Ch.5 §1; Frees Ch.8 §1-4, Ch.9 §1-5), sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-srm/srm-an-005.md
---

An actuary fits an AR(1) model to 240 monthly returns on an insurer's equity portfolio. The sample autocorrelations of the returns die out after the first lag. For the residuals of the fitted model:

- every sample autocorrelation lies within the bands $\pm 2/\sqrt{240}$;
- the sample autocorrelations of the *squared* residuals are positive and well outside the bands at lags 1, 2 and 3;
- a time plot shows bursts of large residuals of either sign separated by quiet stretches, with no trend in the overall level of variability.

Which conclusion is best supported?

- A) The residuals behave like white noise, so the errors can be treated as independent with a constant variance
- B) The mean model is misspecified, and a higher autoregressive order is needed to remove the leftover autocorrelation
- C) The returns are not stationary, so they should be differenced before an autoregressive model is fitted
- D) The errors' conditional variance depends on recent squared shocks, so an ARCH model for the errors is indicated
- E) The error variance is growing steadily over time, so it should be modeled as a deterministic function of time

## Explanation

Separate what each diagnostic says about the errors $\varepsilon_t$.

- The residuals are **uncorrelated**: no autocorrelation lies outside the bands, so the AR(1) has captured the dependence in the *level* of returns.
- Their **squares are positively autocorrelated**: a large residual, of either sign, tends to be followed by other large ones. The size of the shocks is predictable from recent shocks even though their direction is not.
- The overall variability shows no trend, so the long-run variance is stable; only the variance from one month to the next, given the recent past, changes.

This is the behavior an autoregressive conditionally heteroskedastic model describes (Frees, §9.5). In an ARCH($p$) model the conditional variance of today's shock is a linear function of recent squared shocks,

$$
\sigma_t^2 = \omega + \gamma_1 \varepsilon_{t-1}^2 + \cdots + \gamma_p \varepsilon_{t-p}^2,
$$

so a large $\varepsilon_{t-1}^2$ raises $\sigma_t^2$ and makes a large $\varepsilon_t^2$ more likely, which is the positive autocorrelation in the squares. When $\sum \gamma_j < 1$ the process is stationary with constant unconditional variance $\omega/(1 - \sum \gamma_j)$, consistent with the absence of a trend. The answer is **D**.

**Why not the others**

- **A** equates uncorrelated with independent. Errors whose squares are autocorrelated are dependent, and their variance given the past is not constant.
- **B** would follow from autocorrelation left in the residuals themselves, but every residual autocorrelation is inside the bands; the leftover structure is in the variance, not the mean.
- **C** confuses changing conditional variance with non-stationarity. The returns' autocorrelations die out quickly rather than decaying slowly, and an ARCH process with $\sum \gamma_j < 1$ is stationary.
- **E** describes variance that changes deterministically over time, but the plot shows no trend in variability, only bursts that come and go.
