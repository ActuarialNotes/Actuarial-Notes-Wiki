---
id: "masi-an-135"
exam: "Exam MAS-I"
topic: "Histogram"
learning_objective: "Extended Linear Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Histogram
  - Concepts/Probability+Density+Function+(PDF)
answer: "144"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:33284b0b7176b3bca8d916bd5369ead1352f54343a5e4e07232313e2b5af723c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-135.md
---

A histogram of 400 claim amounts (in thousands) is drawn on the **density scale**, with bins of unequal width. The bars are:

| Bin | 0 to 1 | 1 to 2 | 2 to 4 | 4 to 8 | 8 to 16 |
|---|---|---|---|---|---|
| Bar height | 0.34 | 0.20 | 0.10 | 0.04 | 0.0125 |

Each bin includes its left end and excludes its right end. Calculate the number of claims that are at least 2 but less than 8. Give your answer as a whole number.

## Explanation

On the density scale the **area** of a bar, height × width, is the proportion of observations in its bin (and the areas sum to 1: 0.34 + 0.20 + 0.20 + 0.16 + 0.10 = 1). For the two bins from 2 to 8:

$$
\begin{align*}
\text{proportion} &= 0.10 \times 2 + 0.04 \times 4 \\
&= 0.20 + 0.16 \\
&= 0.36 \\
\text{number of claims} &= 0.36 \times 400 \\
&= 144
\end{align*}
$$

The answer is **144**.

**Common wrong entries**

- **56** — reading the bar heights as proportions, $(0.10 + 0.04) \times 400$, ignoring that the bins are 2 and 4 wide.
- **184** — counting every claim of 2 or more, which adds the 8-to-16 bin (0.0125 × 8 × 400 = 40); that bin starts at 8, outside the range asked for.
- **80** — counting only the 2-to-4 bin (0.10 × 2 × 400) and forgetting that the range continues to 8.
