---
id: "masii-an-022"
exam: "Exam MAS-II"
topic: "Partial Autocorrelation Function"
learning_objective: "Time Series with Constant Variance"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Partial+Autocorrelation+Function
  - Concepts/Autocorrelation+Function
  - Concepts/Autoregressive+Model
answer: "E"
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:abb8b9b31919a0f33f1de7cd66648864028c463c5fffe9ecde4ca68cf3889eee
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-022.md
---

A stationary series of 200 quarterly loss ratios has the following sample autocorrelations (ACF) and partial autocorrelations (PACF):

| Lag | 1 | 2 | 3 | 4 | 5 | 6 |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| ACF | 0.80 | 0.52 | 0.30 | 0.15 | 0.06 | 0.02 |
| PACF | 0.80 | -0.32 | 0.05 | -0.04 | 0.06 | 0.03 |

The approximate 95% significance bounds are $\pm 2/\sqrt{200} = \pm 0.14$.

Which model is best supported by these plots?

- A) A random walk
- B) MA(1)
- C) MA(2)
- D) AR(1)
- E) AR(2)

## Explanation

The two functions are read together:

- The **ACF tails off** — it decays gradually (0.80, 0.52, 0.30, ...) rather than dropping to zero after a few lags. That rules out a pure moving average model, whose ACF cuts off after lag $q$.
- The **PACF cuts off after lag 2** — lags 1 and 2 (0.80 and -0.32) are outside $\pm 0.14$, and every later lag is inside.

An AR($p$) process has a PACF that is zero beyond lag $p$, so the series is best described as **AR(2)**. The answer is **E**.

**Why not the others**

- **A** — a random walk is not stationary, and its sample ACF decays very slowly from near 1; this ACF falls to 0.15 by lag 4.
- **B** and **C** — an MA($q$) process has an ACF that cuts off after lag $q$; here the ACF is still 0.30 at lag 3.
- **D** — the partial autocorrelation at lag 2, -0.32, is significant. An AR(1) would leave nothing beyond lag 1, because its lag-2 autocorrelation would be inherited entirely through lag 1.
