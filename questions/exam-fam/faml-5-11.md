---
id: "faml-5-11"
exam: "Exam FAM"
topic: "Life Annuity"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Life+Annuity
  - Concepts/Variance+and+Standard+Deviation
  - Concepts/Annuity+Due
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c9e83271b99b0af99745fa38898fef29b12f5276f6705fb043c48a57951f1c72
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-11.md
---

For a 3-year temporary life annuity due, you are given:

i) The life annuity pays 10 at the beginning of each year

ii) $v = 0.93$

iii) $p_{x} = 0.95$, $p_{x+1} = 0.9$, $p_{x+2} = 0.8$

Calculate the standard deviation of the present value random variable for this annuity.

[Question on October 2022 FAM-L Exam]

- A) 4.4
- B) 4.5
- C) 4.6
- D) 4.7
- E) 4.8

## Explanation

| Discounted Payment | Probability |
|---|---|
| 10 | (1-0.95) = 0.05 |
| $10 + 10v = 19.3$ | (0.95)(1-0.9) = 0.095 |
| $10 + 10v + 10v^{2} = 27.949$ | (0.95)(0.9) = 0.855 |

$$Var(X) = E(X^{2}) - [E(X)]^{2}$$

$$\begin{align*}
E(X) &= 10(1-0.95) + [10+10v](0.95)(1-0.9) + [10+10v+10v^{2}](0.95)(0.9) \\
&= 26.23
\end{align*}$$

$$\begin{align*}
E(X^{2}) &= 10^{2}(1-0.95) + [10+10v]^{2}(0.95)(1-0.9) + [10+10v+10v^{2}]^{2}(0.95)(0.9) \\
&= 708.27
\end{align*}$$

$$\begin{align*}
Var(X) &= 708.27 - (26.23)^{2} \\
&= 20.26
\end{align*}$$

$$\begin{align*}
\text{Standard Deviation} &= (20.26)^{1/2} \\
&= 4.5
\end{align*}$$

It's not significantly less work, but since everyone receives the first 10, you could use the formula $Var(X - \text{constant}) = Var(X)$, and work with the three payment amounts as 0, $10v$, $10v + 10v^{2}$, and you would get the same answer.

The answer is **B**.
