---
id: "faml-7-37"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Endowment+Insurance
  - Concepts/Annuity+Due
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ed39b0e8080901832899bae30ff31533d918d2c0c46c8d3232689051acb24f41
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-37.md
---

For a fully discrete increasing 20-year endowment insurance on (50), you are given:

i) The level annual net premium is 5,808

ii) The net premium policy value at the end of year 15 is 130,580

iii) Mortality after age 60 follows the Standard Ultimate Life Table

iv) $i = 0.05$

Calculate the expected present value of future death and endowment benefits at age 65.

[Question on October 2022 FAM-L Exam]

- A) 156,530
- B) 156,570
- C) 156,610
- D) 156,650
- E) 156,690

## Explanation

$$\begin{align*}
\ddot{a}_{65:\overline{5}|} &= \ddot{a}_{65} - {}_{5}E_{65} \times \ddot{a}_{70} \\
&= 13.5498 - 0.75455(12.0083) \\
&= 4.4889
\end{align*}$$

$$\begin{align*}
\text{EPV future net premiums} &= 4.4889(5{,}808) \\
&= 26{,}072
\end{align*}$$

$$\begin{align*}
130{,}580 &= \text{EPV future benefits} - \text{EPV future net premiums} \\
&= \text{EPV future benefits} - 26{,}072
\end{align*}$$

$$\text{EPV future benefits} = 156{,}652$$

The answer is **D**.
