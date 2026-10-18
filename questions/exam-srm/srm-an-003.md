---
id: "srm-an-003"
exam: "Exam SRM"
topic: "K-Nearest Neighbors"
learning_objective: "Linear Models"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/K-Nearest+Neighbors
  - Concepts/Ordinary+Least+Squares
  - Concepts/Statistical+Learning
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:91ff273d93e967fbcd2a1c7cc3fb2b0834f446828b7b59a0b882c14db674ea60
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021), §3.5 Comparison of Linear Regression with K-Nearest Neighbors, KNN regression definition (3.39), p.105 (PDF p.115), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "SOA Exam SRM syllabus, January 2027 (Basics of Statistical Learning; Linear Models obj. 7; Time Series Models obj. 1-2; readings ISLR Ch.2 §1-3, Ch.3 §1-6, Ch.5 §1; Frees Ch.8 §1-4, Ch.9 §1-5), sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-srm/srm-an-003.md
---

An actuary models average claim severity (in thousands) on vehicle age (in years) using six training observations:

| Vehicle age $x$ | 1 | 2 | 4 | 5 | 7 | 9 |
|---|---|---|---|---|---|---|
| Severity $y$ | 8.0 | 7.2 | 6.1 | 5.0 | 4.4 | 2.9 |

The ordinary least squares line fitted to these data is $\hat{y} = 8.4926 - 0.6199x$.

Calculate the K-nearest neighbors regression prediction of severity for a vehicle aged 4.6 years, using $K = 3$ and Euclidean distance.

- A) 5.00
- B) 5.17
- C) 5.55
- D) 5.64
- E) 6.10

## Explanation

KNN regression predicts the average response of the $K$ training observations closest to the new point (James et al., §3.5):

$$
\hat{f}(x_0) = \frac{1}{K}\sum_{x_i \in \mathcal{N}_0} y_i
$$

With one predictor, the Euclidean distance is $|x_i - 4.6|$:

| $x_i$ | 1 | 2 | 4 | 5 | 7 | 9 |
|---|---|---|---|---|---|---|
| Distance | 3.6 | 2.6 | 0.6 | 0.4 | 2.4 | 4.4 |

The three nearest are $x = 5$ (0.4), $x = 4$ (0.6) and $x = 7$ (2.4), so

$$
\begin{align*}
\hat{f}(4.6) &= \frac{5.0 + 6.1 + 4.4}{3} \\
&= \frac{15.5}{3} \\
&= 5.17
\end{align*}
$$

The answer is **B**. Unlike least squares, KNN assumes no functional form for $f$: the prediction is a local average of nearby responses, and the line's slope plays no part in it.

**Why not the others**

- **A** uses $K = 1$, the single nearest neighbor $x = 5$.
- **C** averages only the two nearest neighbors, $(5.0 + 6.1)/2 = 5.55$.
- **D** is the least squares prediction, $\hat{y} = 8.4926 - 0.6199(4.6) = 5.64$, a global linear fit rather than a local average.
- **E** takes $x = 2$ (distance 2.6) as the third neighbor instead of $x = 7$ (distance 2.4), giving $(5.0 + 6.1 + 7.2)/3 = 6.10$.
