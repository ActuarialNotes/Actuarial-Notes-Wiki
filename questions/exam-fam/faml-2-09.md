---
id: "faml-2-09"
exam: "Exam FAM"
topic: "Parametric Survival Model"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Parametric+Survival+Model
  - Concepts/Binomial+Distribution
  - Concepts/Variance
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:87e4a91e44ffe36c3eca4d6cb601f60ee0e527d682a0bc7d9a48fb01e5836022
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-09.md
---

You are given that mortality follows Makeham's Law with the following parameters:

i) $A = 0.004$

ii) $B = 0.00003$

iii) $c = 1.1$

Let $L_{15}$ be the random variable representing the number of lives alive at the end of 15 years if there are 10,000 lives age 50 at time 0.

Calculate $Var[L_{15}]$.

[Question on October 2022 FAM-L Exam]

- A) 1,317
- B) 1,328
- C) 1,339
- D) 1,350
- E) 1,361

## Explanation

The distribution is binomial with 10,000 trials.

$$Var[L_{15}] = npq = 10{,}000\left({}_{15}p_{50}\right)\left({}_{15}q_{50}\right)$$

$$\begin{align*}
{}_{15}p_{50} &= e^{\left[-A(15) - \frac{B}{\ln C} \times c^{50}\left(c^{15} - 1\right)\right]} \\
&= 0.837445
\end{align*}$$

$$\begin{align*}
{}_{15}q_{50} &= 1 - {}_{15}p_{50} \\
&= 0.162555
\end{align*}$$

$$\begin{align*}
Var[L_{15}] &= 10{,}000(0.837445)(0.162555) \\
&= 1361.3
\end{align*}$$

The answer is **E**.
