---
id: "faml-4-06"
exam: "Exam FAM"
topic: "Term Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Term+Life+Insurance
  - Concepts/Life+Table
  - Concepts/Mortality
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4b8e8ecc54ede04dcf9553065826de85767e9c1e331de56a8d0eba4abac20e53
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-06.md
---

For a 3-year term insurance of 1000 on (70), you are given:

(i) $q^{SULT}_{70+k}$ is the mortality rate from the Standard Ultimate Life Table, for $k = 0, 1, 2$

(ii) $q_{70+k}$ is the mortality rate used to price this insurance, for $k = 0, 1, 2$

(iii) $q_{70+k} = (0.95)^{k}\,q^{SULT}_{70+k}$, for $k = 0, 1, 2$

(iv) $i = 0.05$

Calculate the single net premium.

[A modified version of Question 13 on the Fall 2013 exam]

- A) 29.05
- B) 29.85
- C) 30.65
- D) 31.45
- E) 32.25

## Explanation

| Time | Age | $q^{SULT}_{x}$ | Improvement factor | $q_{x}$ |
|---|---|---|---|---|
| 0 | 70 | 0.010413 | 100.00% | 0.010413 |
| 1 | 71 | 0.011670 | 95.00% | 0.011087 |
| 2 | 72 | 0.013081 | 90.25% | 0.011806 |

$$\begin{align*}
v &= 1/1.05 \\
&= 0.952381
\end{align*}$$

$$\begin{align*}
EPV &= 1{,}000[0.010413v + 0.989587(0.011087)v^{2} + 0.989587(0.988913)(0.011806)v^{3}] \\
&= 29.85
\end{align*}$$

The answer is **B**.
