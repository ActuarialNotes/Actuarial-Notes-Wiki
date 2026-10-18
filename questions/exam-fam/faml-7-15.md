---
id: "faml-7-15"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Fractional+Age+Assumption
  - Concepts/Recursion
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:16ce5cf0e9fbe41a138257cf627c9afab60b9d00d270657e686df2ae45970b6e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-15.md
---

For a fully discrete whole life insurance of 100 on ($x$), you are given:

(i) $q_{x+15} = 0.10$

(ii) Deaths are uniformly distributed over each year of age

(iii) $i = 0.05$

(iv) $_{t}V$ denotes the net premium policy value at time $t$

(v) $_{16}V = 49.78$

Calculate $_{15.6}V$.

[A modified version of Question 14 on the Fall 2014 exam]

- A) 49.7
- B) 50.0
- C) 50.3
- D) 50.6
- E) 50.9

## Explanation

$$\begin{align*}
{}_{15.6}V(1 + i)^{0.4} &= {}_{0.4}p_{x+15.6}\,{}_{16}V + {}_{0.4}q_{x+15.6}\,100 \\
{}_{15.6}V(1.05)^{0.4} &= 0.957447(49.78) + 0.042553(100) \\
{}_{15.6}V &= 50.91
\end{align*}$$

The answer is **E**.
