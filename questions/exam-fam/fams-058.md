---
id: "fams-058"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Poisson+Distribution
  - Concepts/Severity+Distribution
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6f07be38eb9647bce5edccc2183f24abb68c93b154c2bf7e3a721ece260a28dc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-058.md
---

Aggregate losses are modeled as follows:

(i) The number of losses has a Poisson distribution with $\lambda = 3$.

(ii) The amount of each loss has a Burr distribution with $\alpha = 3, \theta = 2, \gamma = 1$.

(iii) The number of losses and the amounts of the losses are mutually independent.

Calculate the variance of aggregate losses.

- A) 12
- B) 14
- C) 16
- D) 18
- E) 20

## Explanation

Let $S$ = aggregate losses, $X$ = severity. Since the frequency is Poisson,

$$\begin{align*}
Var(S) &= \lambda E\left(X^2\right) \\
E(X^2) &= \frac{2^2\,\Gamma(3)\Gamma(1)}{\Gamma(3)} \quad \text{(table lookup)} \\
&= 4 \\
Var(S) &= 3(4) \\
&= 12
\end{align*}$$

You would get the same result if you used

$$Var(S) = E(N)Var(X) + Var(N)E(X)^2$$

The answer is **A**.
