---
id: "atpa-an-030"
exam: "Exam ATPA"
topic: "Stacking"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Stacking
  - Concepts/Cross-Validation
answer: "0.70"
points: 1
---

A GLM and a GBM give these out-of-fold predictions of claim severity (in thousands) for five claims:

| Claim | Actual $y$ | GLM $a$ | GBM $b$ |
| ---: | ---: | ---: | ---: |
| 1 | 4 | 3 | 5 |
| 2 | 10 | 10 | 8 |
| 3 | 6 | 7 | 6 |
| 4 | 9 | 9 | 10 |
| 5 | 5 | 4 | 4 |

The meta-model is $\hat{y} = w\,a + (1 - w)\,b$, with $w$ chosen to minimize the squared error over the five claims.

Calculate $w$, the weight on the GLM. Give your answer to two decimal places.

## Explanation

Setting the derivative of $\sum_i \big(y_i - b_i - w(a_i - b_i)\big)^2$ to zero gives

$$
w = \frac{\sum_i (y_i - b_i)(a_i - b_i)}{\sum_i (a_i - b_i)^2}
$$

| Claim | $y - b$ | $a - b$ | Product | $(a - b)^2$ |
| ---: | ---: | ---: | ---: | ---: |
| 1 | $-1$ | $-2$ | 2 | 4 |
| 2 | 2 | 2 | 4 | 4 |
| 3 | 0 | 1 | 0 | 1 |
| 4 | $-1$ | $-1$ | 1 | 1 |
| 5 | 1 | 0 | 0 | 0 |

$$
w = \frac{7}{10} = \mathbf{0.70}
$$

The stacked predictions $\hat{y} = 0.7a + 0.3b$ have a mean squared error of 0.42, against 0.60 for the GLM and 1.40 for the GBM.

**Common wrong entries**

- **0.30** — the weight on the GBM, $w_{\text{GBM}} = 1 - w$.
- **0.50** — an equal-weight average, which stacking does not assume.
