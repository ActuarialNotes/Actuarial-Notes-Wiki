---
id: "faml-3-11"
exam: "Exam FAM"
topic: "Fractional Age Assumption"
learning_objective: "Mortality Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Fractional+Age+Assumption
  - Concepts/Life+Table
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ed286c083ef33127025fdde3e08f2f9ace7e1944eb98deac9327a3dd53d5c493
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-11.md
---

For the country of Bienna, you are given:

(i) Bienna publishes mortality rates in biennial form, that is, mortality rates are of the form: $_{2}q_{2x}$, for $x = 0, 1, 2, \ldots$

(ii) Deaths are assumed to be uniformly distributed between ages $2x$ and $2x + 2$, for $x = 0, 1, 2, \ldots$

(iii) $_{2}q_{50} = 0.02$

(iv) $_{2}q_{52} = 0.04$

Calculate the probability that (50) dies during the next 2.5 years.

[Question 1 on the Fall 2016 exam]

- A) 0.02
- B) 0.03
- C) 0.04
- D) 0.05
- E) 0.06

## Explanation

$$\begin{align*}
{}_{2.5}q_{50} &= {}_{2}q_{50} + {}_{2}p_{50}\;{}_{0.5}q_{52} \\
&= 0.02 + (0.98)\left(\frac{0.5}{2}\right)(0.04) \\
&= 0.0298
\end{align*}$$

The answer is **B**.
