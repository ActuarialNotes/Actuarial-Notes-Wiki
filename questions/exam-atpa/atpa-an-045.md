---
id: "atpa-an-045"
exam: "Exam ATPA"
topic: "Partial Dependence Plot"
learning_objective: "Model Explainability and Communication"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Partial+Dependence+Plot
answer: "9.8"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0175a595d5eff9fb86eeec7c640eb61a05b0ec3adfa72d581c4abd9a7e8df63a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-045.md
---

A frequency model, written in closed form so it can be checked by hand, predicts

$$\hat{f} = 4 + 0.3\,m + 0.2\,m\,u\,y + 2\,y$$

claims per 100 car-years, where $m$ is annual distance in thousands of km, $u = 1$ for an urban territory (0 otherwise) and $y = 1$ for a driver under 25 (0 otherwise). The data hold four records:

| Record | $u$ | $y$ |
| :--- | ---: | ---: |
| 1 | 0 | 0 |
| 2 | 1 | 1 |
| 3 | 1 | 1 |
| 4 | 0 | 0 |

Calculate the value of the partial dependence plot for annual distance at $m = 12$. Give your answer to one decimal place.

## Explanation

The PDP at $m = 12$ is the average, over the four records, of the model's prediction with $m$ set to 12 and each record's own $u$ and $y$ kept:

$$\hat{f}_S(12) = \frac{1}{4}\sum_{i=1}^{4} \hat{f}\big(12, u_i, y_i\big)$$

Records 1 and 4 ($u = 0$, $y = 0$):

$$4 + 0.3(12) = 7.6$$

Records 2 and 3 ($u = 1$, $y = 1$):

$$4 + 0.3(12) + 0.2(12)(1)(1) + 2(1) = 12.0$$

$$\hat{f}_S(12) = \tfrac{1}{4}(7.6 + 12.0 + 12.0 + 7.6) = \mathbf{9.8}$$

**Common wrong entries**

- **9.2** puts the average record into the model: $\bar{u} = \bar{y} = 0.5$ gives $\hat{f} = 4 + 3.6 + 0.2(12)(0.5)(0.5) + 2(0.5) = 9.2$. Because $u$ and $y$ enter as a product, the average of $u y$ (0.5) is not the product of the averages (0.25).
- **7.6** or **12.0** is one record's ICE curve at $m = 12$, not the average of all four.
