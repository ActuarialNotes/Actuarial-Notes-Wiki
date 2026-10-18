---
id: "masii-an-005"
exam: "Exam MAS-II"
topic: "Residual"
learning_objective: "Time Series with Constant Variance"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Residual
  - Concepts/Correlogram
  - Concepts/Autocorrelation+Function
  - Concepts/White+Noise
  - Concepts/Seasonality
answer: "A"
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:173ab19c2163b7b3e1638f3fcd97da3ee3b2a902dec457ef8960d210e700fe9a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-005.md
---

An actuary fits an AR(1) model to 120 months of claim counts for a homeowners book. The correlogram of the model's residuals shows every autocorrelation for lags 1 through 24 inside the approximate 95% bounds $\pm 2/\sqrt{120} = \pm 0.18$, except for a single autocorrelation of 0.35 at lag 12.

Which of the following conclusions is best supported?

- A) The residuals still carry dependence at a twelve-month lag, so the model has missed a seasonal component
- B) The residuals are white noise, since one exceedance among 24 lags is what chance alone produces
- C) The autoregressive order is too low, so the model should be refitted as an AR(2)
- D) The series still contains a trend, so it should be differenced before an AR model is fitted
- E) The residuals are not normally distributed, so the claim counts should be log-transformed

## Explanation

If a time series model has captured the dependence in a series, its residuals behave like white noise: no autocorrelation outside the significance bounds at any lag. A spike in the residual correlogram is dependence the model left behind, and its lag says what kind. For monthly data, a spike at lag 12 (well outside the bounds, at 0.35) is the signature of an annual cycle — a **seasonal** pattern the AR(1) does not describe. The answer is **A**.

**Why not the others**

- **B** — about one lag in twenty can fall outside 95% bounds by chance, but a large exceedance at exactly the seasonal lag of monthly data is not a random lag. Where the spike falls matters as much as how many there are.
- **C** — a missing second AR term would leave dependence at short lags (lag 2), not an isolated spike at lag 12.
- **D** — an unremoved trend shows as autocorrelations that decay slowly across many lags, not as one spike.
- **E** — a correlogram measures correlation between residuals at different lags; it says nothing about their distribution.
