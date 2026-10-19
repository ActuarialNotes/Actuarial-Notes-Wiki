---
id: "faml-6-31"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
  - Concepts/Survival+Model
  - Concepts/Life+Annuity
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f17c2678709a1efb30d0e1a54426a22dfe03854fb9439ddd67cb600784941d3c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-31.md
---

For a fully continuous whole life insurance policy of 100,000 on (35), you are given:

(i) The density function of the future lifetime of a newborn:

$$f(t) = \begin{cases} 0.01e^{-0.01t}, & 0 \le t < 70 \\ g(t), & t \ge 70 \end{cases}$$

(ii) $\delta = 0.05$

(iii) $\bar{A}_{70} = 0.51791$

Calculate the annual net premium rate for this policy.

[Question 10 on the Fall 2015 exam]

- A) 1000
- B) 1110
- C) 1220
- D) 1330
- E) 1440

## Explanation

$$\begin{align*}
\bar{A}_{35} &= \left(1 - e^{-35(\mu + \delta)}\right) \times \left(\frac{\mu}{\mu + \delta}\right) + e^{-35(\mu + \delta)}\bar{A}_{70} \\
&= 0.063421 + 0.146257 \\
&= 0.209679
\end{align*}$$

$$\begin{align*}
\bar{a}_{35} &= \frac{1 - \bar{A}_{35}}{\delta} \\
&= \frac{1 - 0.209679}{0.05} \\
&= 15.80642
\end{align*}$$

$$\begin{align*}
\bar{P}_{35} &= \frac{\bar{A}_{35}}{\bar{a}_{35}} \\
&= \frac{0.209679}{15.80642} \\
&= 0.0132654
\end{align*}$$

The annual net premium for this policy is therefore

$$\begin{align*}
100{,}000 \times 0.0132654 &= 1{,}326.54
\end{align*}$$

The answer is **D**.
