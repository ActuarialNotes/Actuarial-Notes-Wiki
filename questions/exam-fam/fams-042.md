---
id: "fams-042"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Stop-Loss+Reinsurance
  - Concepts/Deductible
  - Concepts/Convolution
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d45e0210b209bcf38e25832b7490b4a2c9b40ee65e464156653e97f85b49860c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-042.md
---

For a collective risk model:

(i) The number of losses has a Poisson distribution with $\lambda = 2$.

(ii) The common distribution of the individual losses is:

| $x$ | $f_X(x)$ |
|---|---|
| 1 | 0.6 |
| 2 | 0.4 |

An insurance covers aggregate losses subject to a deductible of 3.

Calculate the expected aggregate payments of the insurance.

- A) 0.74
- B) 0.79
- C) 0.84
- D) 0.89
- E) 0.94

## Explanation

$$E[(S - 3)_+] = E(S) - 3 + 3f_S(0) + 2f_S(1) + 1f_S(2)$$

$$\begin{align*}
E(S) &= 2[0.6 + 2(0.4)] \\
&= 2.8 \\
f_S(0) &= e^{-2} \\
f_S(1) &= e^{-2}(2)(0.6) \\
&= 1.2e^{-2} \\
f_S(2) &= e^{-2}(2)(0.4) + \frac{e^{-2}2^2}{2!}(0.6)^2 \\
&= 1.52e^{-2}
\end{align*}$$

$$\begin{align*}
E[(S - 3)_+] &= 2.8 - 3 + 3e^{-2} + 2(1.2e^{-2}) + 1(1.52e^{-2}) \\
&= -0.2 + 6.92e^{-2} \\
&= 0.7365
\end{align*}$$

The answer is **A**.
