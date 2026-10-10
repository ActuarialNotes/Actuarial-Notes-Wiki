---
id: "masi-an-164"
exam: "Exam MAS-I"
topic: "Step Function"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Step+Function
  - Concepts/Categorical+Predictor
  - Concepts/Design+Matrix
  - Concepts/Model+Output
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e157455c1970d01536ce3eee89b5601fb0794eedefc8aac856acde876f541fa0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-164.md
---

An analyst fits claim frequency as a step function of driver age $X$ with cutpoints 30, 50 and 70. She creates all four indicators

$$
C_0 = I(X < 30), \quad C_1 = I(30 \le X < 50), \quad C_2 = I(50 \le X < 70), \quad C_3 = I(70 \le X)
$$

and enters all four, together with an intercept, in a least-squares fit. The data include 214 drivers aged 70 or older. The software reports:

| Term | Estimate |
| :--- | ---: |
| (Intercept) | 0.140 |
| $C_0$ | 0.085 |
| $C_1$ | 0.020 |
| $C_2$ | -0.030 |
| $C_3$ | NA |

Calculate the predicted claim frequency for a 24-year-old driver.

- A) 0.055
- B) 0.085
- C) 0.140
- D) 0.160
- E) 0.225

## Explanation

**Why $C_3$ is NA.** Every driver is in exactly one bin, so $C_0 + C_1 + C_2 + C_3 = 1$ for every row: the four indicator columns add up to the intercept column, and the design matrix is not of full rank. The 70+ bin is not empty (214 drivers), so the NA does not come from an empty column; the software has dropped the redundant column $C_3$. The remaining fit is a step function with **70 and over** as the reference bin:

- the intercept, 0.140, is the mean frequency of drivers aged 70 and over;
- each other coefficient is its bin's mean minus that reference mean.

A 24-year-old is in the $C_0$ bin:

$$
\begin{align*}
\hat y &= 0.140 + 0.085 \\
&= 0.225
\end{align*}
$$

The answer is **E**. The full set of bin means is 0.225, 0.160, 0.110 and 0.140.

**Why not the others**

- **A** — reverses the contrast, reading each coefficient as the reference mean minus the bin's mean: 0.140 - 0.085.
- **B** — reports the $C_0$ coefficient alone, forgetting that it is a difference from the intercept.
- **C** — assumes the youngest bin is the reference, as in the usual coding that leaves out $C_0$. Here the NA shows that $C_3$ was left out instead.
- **D** — numbers the bins from 1, so reads $C_1$ as the youngest bin and uses 0.140 + 0.020. $C_1$ is the bin from 30 to 49; the youngest bin is $C_0$.
