---
id: "fams-027"
exam: "Exam FAM"
topic: "Mean Excess Loss"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Mean+Excess+Loss
  - Concepts/Limited+Expected+Value
  - Concepts/Deductible
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:33dc356673e5f349ee28e5f667247c8fd3509143560d36f558737ca2cfd9aaed
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-027.md
---

The random variable for a loss, $X$, has the following characteristics:

| $x$ | $F(x)$ | $E(X \wedge x)$ |
|---|---|---|
| 0 | 0.0 | 0 |
| 100 | 0.2 | 91 |
| 200 | 0.6 | 153 |
| 1000 | 1.0 | 331 |

Calculate the mean excess loss for a deductible of 100.

- A) 250
- B) 300
- C) 350
- D) 400
- E) 450

## Explanation

$$\begin{align*}
\text{Mean excess loss} &= \frac{E(X) - E(X \wedge 100)}{1 - F(100)} \\
&= \frac{331 - 91}{0.8} \\
&= 300
\end{align*}$$

Note that $E(X) = E(X \wedge 1000)$ because $F(1000) = 1$.

The answer is **B**.
