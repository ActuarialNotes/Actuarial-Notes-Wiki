---
id: "faml-4-16"
exam: "Exam FAM"
topic: "Term Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Term+Life+Insurance
  - Concepts/Life+Table
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:950d6fff2665ff49004a5652f20c059c6c50c74cfb0a7bb4859a351cec7ed4d3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-16.md
---

You are given the following extract of ultimate mortality rates from a two-year select and ultimate mortality table:

| $x$ | $q_{x}$ |
|---|---|
| 50 | 0.045 |
| 51 | 0.050 |
| 52 | 0.055 |
| 53 | 0.060 |

The select mortality rates satisfy the following:

- $q_{[x]} = 0.7q_{x}$
- $q_{[x]+1} = 0.8q_{x+1}$

You are also given that $i = 0.04$.

Calculate $A^{1}_{[50]:\overline{3}|}$.

[Question 5 on the Fall 2016 exam]

- A) 0.08
- B) 0.09
- C) 0.10
- D) 0.11
- E) 0.12

## Explanation

$$\begin{align*}
A^{1}_{[50]:\overline{3}|} &= vq_{[50]} + v^{2}p_{[50]}q_{[50]+1} + v^{3}p_{[50]}p_{[50]+1}q_{52}
\end{align*}$$

where: $v = \dfrac{1}{1.04}$

$$\begin{align*}
q_{[50]} &= 0.7(0.045) \\
&= 0.0315 \\
p_{[50]} &= 1 - q_{[50]} \\
&= 0.9685 \\
q_{[50]+1} &= 0.8(0.050) \\
&= 0.040 \\
p_{[50]+1} &= 1 - q_{[50]+1} \\
&= 0.960 \\
q_{52} &= 0.055
\end{align*}$$

So: $A^{1}_{[50]:\overline{3}|} = 0.1116$

The answer is **D**.
