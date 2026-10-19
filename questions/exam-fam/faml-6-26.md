---
id: "faml-6-26"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
  - Concepts/Life+Annuity
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:da589a93506eda9507be7d8e1f0c43dd943f489b1b9c901d31d7fe8827f11247
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-26.md
---

For a special fully discrete whole life insurance policy of 1000 on (90), you are given:

(i) The first year premium is 0

(ii) $P$ is the renewal premium

(iii) Mortality follows the Standard Ultimate Life Table

(iv) $i = 0.05$

(v) Premiums are calculated using the equivalence principle

Calculate $P$.

[A modified version of Question 10 on the Spring 2015 exam]

- A) 150
- B) 160
- C) 170
- D) 180
- E) 190

## Explanation

$$\begin{align*}
\text{EPV (Premiums)} &= Pa_{90} \\
&= P(\ddot{a}_{90} - 1) \\
&= (4.1835)P
\end{align*}$$

$$\begin{align*}
\text{EPV(Benefits)} &= 1000A_{90} \\
&= 1000(0.75317) \\
&= 753.17
\end{align*}$$

Therefore,

$$\begin{align*}
P &= \frac{753.17}{4.1835} \\
&= 180.03
\end{align*}$$

The answer is **D**.
