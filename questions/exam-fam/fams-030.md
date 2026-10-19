---
id: "fams-030"
exam: "Exam FAM"
topic: "Frequency Distribution"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Frequency+Distribution
  - Concepts/Poisson+Distribution
  - Concepts/Recursion
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:59b26d096a18d38d3c095783f0b387d9acab7ea6f2c24a28f6e378aadf182bec
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-030.md
---

For a discrete probability distribution, you are given the recursion relation

$$p(k) = \frac{2}{k}p(k-1), \quad k = 1, 2, \ldots$$

Calculate $p(4)$.

- A) 0.07
- B) 0.08
- C) 0.09
- D) 0.10
- E) 0.11

## Explanation

$$p(k) = \frac{2}{k}p(k-1) = \left(0 + \frac{2}{k}\right)p(k-1)$$

Thus an $(a, b, 0)$ distribution with $a = 0$, $b = 2$.

Thus, Poisson with $\lambda = 2$.

$$\begin{align*}
p(4) &= \frac{e^{-2}2^4}{4!} \\
&= 0.09
\end{align*}$$

The answer is **C**.
