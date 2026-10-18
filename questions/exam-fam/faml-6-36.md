---
id: "faml-6-36"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Term+Life+Insurance
  - Concepts/Expenses
  - Concepts/Survival+Model
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2e3115930b446122a1c3ba42b763b6bb442b1e2eac2301affa4fd03cf1e580e7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-36.md
---

For a fully continuous 20-year term insurance policy of 100,000 on (50), you are given:

(i) Gross premiums, calculated using the equivalence principle, are payable at an annual rate of 4500

(ii) Expenses at an annual rate of $R$ are payable continuously throughout the life of the policy

(iii) $\mu_{50+t} = 0.04$, for $t > 0$

(iv) $\delta = 0.08$

Calculate $R$.

[Question 8 on the Spring 2016 exam]

- A) 400
- B) 500
- C) 600
- D) 700
- E) 800

## Explanation

By the equivalence principle,

$$4500\bar{a}_{x:\overline{20}|} = 100{,}000\bar{A}^{1}_{x:\overline{20}|} + R\bar{a}_{x:\overline{20}|}$$

where

$$\begin{align*}
\bar{A}^{1}_{x:\overline{20}|} &= \frac{\mu}{\mu + \delta}\left(1 - e^{-20(\mu + \delta)}\right) \\
&= \frac{0.04}{0.12}\left(1 - e^{-20(0.12)}\right) \\
&= 0.3031
\end{align*}$$

$$\begin{align*}
\bar{a}_{x:\overline{20}|} &= \frac{1 - e^{-20(\mu + \delta)}}{\mu + \delta} \\
&= \frac{1 - e^{-20(0.12)}}{0.12} \\
&= 7.5774
\end{align*}$$

Solving for $R$, we have

$$\begin{align*}
R &= 4500 - 100{,}000\left(\frac{0.3031}{7.5774}\right) \\
&= 500
\end{align*}$$

The answer is **B**.
