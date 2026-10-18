---
id: "masii-an-023"
exam: "Exam MAS-II"
topic: "Exponential Smoothing"
learning_objective: "Time Series with Constant Variance"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Exponential+Smoothing
  - Concepts/Time+Series+Forecast
answer: "C"
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2f6096379a230b86c3453e80d626518091d4a2452cd9b23a35c3d0f291fe4e1e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-023.md
---

Monthly reported claim counts with no trend or seasonality are forecast by simple exponential smoothing with smoothing parameter $\alpha = 0.2$:

$$
a_t = \alpha x_t + (1 - \alpha)\,a_{t-1}
$$

The smoothed level after month 10 is $a_{10} = 150$. The counts for months 11 and 12 are $x_{11} = 170$ and $x_{12} = 140$.

Calculate the forecast of the claim count for month 15, made at the end of month 12.

- A) 140.0
- B) 145.2
- C) 151.2
- D) 154.0
- E) 166.0

## Explanation

Update the level with each new observation:

$$
\begin{aligned}
a_{11} &= 0.2(170) + 0.8(150) \\
&= 154.0 \\
a_{12} &= 0.2(140) + 0.8(154.0) \\
&= 151.2
\end{aligned}
$$

Simple exponential smoothing assumes no trend or seasonality, so its forecast for every future month is the current level:

$$
\hat{x}_{15 \mid 12} = a_{12} = \mathbf{151.2}
$$

The answer is **C**.

**Why not the others**

- **A** — the last observation (the naive forecast), which is smoothing with $\alpha = 1$.
- **B** — swaps the weights, putting 0.8 on each new observation. A small $\alpha$ puts most of the weight on the past level and smooths heavily.
- **D** — stops at $a_{11}$, ignoring month 12.
- **E** — swaps the weights and stops after month 11.
