---
id: "faml-6-28"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Expenses
  - Concepts/Whole+Life+Insurance
  - Concepts/Life+Annuity
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2dbbfccee29485725ff151611f5e41ce48e7ba24207470dd808620c4662ced30
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-28.md
---

For a fully discrete 5-payment whole life insurance of 1000 on (40), you are given:

(i) Expenses incurred at the beginning of the first five policy years are as follows:

|  | Year 1 |  | Years 2-5 |  |
|---|---|---|---|---|
|  | Percent of premium | Per policy | Percent of premium | Per policy |
| Sales Commissions | 20% | 0 | 5% | 0 |
| Policy Maintenance | 0% | 10 | 0% | 5 |

(ii) No expenses are incurred after Year 5

(iii) Mortality follows the Standard Ultimate Life Table

(iv) $i = 0.05$

Calculate the gross premium using the equivalence principle.

[A modified version of Question 12 on the Spring 2015 exam]

- A) 31
- B) 36
- C) 41
- D) 46
- E) 51

## Explanation

$$G\ddot{a}_{40:\overline{5}|} = 1000A_{40} + 0.15G + 0.05G\ddot{a}_{40:\overline{5}|} + 5 + 5\ddot{a}_{40:\overline{5}|}$$

$$\begin{align*}
\ddot{a}_{40:\overline{5}|} &= \ddot{a}_{40} - {}_{5}E_{40} \cdot \ddot{a}_{45} \\
&= 18.4578 - (0.78113)(17.8162) \\
&= 4.5410
\end{align*}$$

$$\begin{align*}
G &= \frac{121.06 + 5 + 5(4.5410)}{-0.15 + 0.95(4.5410)} \\
&= 35.73
\end{align*}$$

The answer is **B**.
