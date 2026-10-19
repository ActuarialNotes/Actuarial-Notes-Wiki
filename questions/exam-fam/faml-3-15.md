---
id: "faml-3-15"
exam: "Exam FAM"
topic: "Hazard Rate"
learning_objective: "Mortality Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Hazard+Rate
  - Concepts/Survival+Model
  - Concepts/Parametric+Survival+Model
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:67c8782268af206e7ac12d99624f084f15aa98e1253714231ab3418c90e02c94
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-15.md
---

You are given the following survival function:

$$S_{0}(x) = \left(1 - \frac{x}{100}\right)^{0.5}, \quad 0 \le x \le 100$$

Calculate $1000\mu_{25}$.

[Question on October 2022 FAM-L Exam]

- A) 6.7
- B) 10.0
- C) 13.3
- D) 16.7
- E) 20.0

## Explanation

$$\begin{align*}
\mu_{25} &= \frac{-s'(25)}{s(25)} \\
&= \frac{0.5(0.01)(1 - 0.01 \times 25)^{-0.5}}{(1 - 0.01 \times 25)^{0.5}} \\
&= 0.00667
\end{align*}$$

So $1000\mu_{25} = 6.7$. The answer is **A**.
