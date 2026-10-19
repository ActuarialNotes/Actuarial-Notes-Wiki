---
id: "faml-6-49"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Woolhouse's+Formula
  - Concepts/Fractional+Age+Assumption
  - Concepts/Expenses
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:642ce76a6c23229fb708259427967844eb61575f947b41a073cbc786624474d8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-49.md
---

For a special whole life insurance of 100,000 on (40), you are given:

(i) The death benefit is payable at the moment of death

(ii) Level gross premiums are payable monthly for a maximum of 20 years

(iii) Mortality follows the Standard Ultimate Life Table

(iv) $i = 0.05$

(v) Deaths are uniformly distributed over each year of age

(vi) Initial expenses are 200

(vii) Renewal expenses are 4% of each premium including the first

(viii) Gross premiums are calculated using the equivalence principle

Calculate the monthly gross premium.

[A modified version of Question 10 on the Fall 2017 exam]

- A) 66
- B) 76
- C) 86
- D) 96
- E) 106

## Explanation

$$G\ddot{a}^{(12)}_{40:\overline{20}|} = 100{,}000\left(\frac{i}{\delta}\right)A_{40} + 200 + 0.04G\ddot{a}^{(12)}_{40:\overline{20}|}$$

$$\begin{align*}
\ddot{a}^{(12)}_{40:\overline{20}|} &= \alpha(12)\,\ddot{a}_{40:\overline{20}|} - (1 - {}_{20}E_{40})\,\beta(12) \\
&= 1.00020 \cdot 12.9935 - (1 - 0.36663) \cdot 0.46651 \\
&= 12.700625
\end{align*}$$

$$\begin{align*}
G &= \frac{(100{,}000)(1.02480)(0.12106) + 200}{0.96 \times 12.700625} \\
&= 1033.92
\end{align*}$$

$$\Rightarrow G/12 = 86.16$$

The answer is **C**.
