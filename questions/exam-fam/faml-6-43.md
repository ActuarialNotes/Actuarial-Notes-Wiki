---
id: "faml-6-43"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Expenses
  - Concepts/Term+Life+Insurance
  - Concepts/Life+Annuity
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cf4824e606a0a3b67973cb114551ec6e6f6fd845f1a7f338fb905b3b7f000eab
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-43.md
---

For a fully discrete, 5-payment 10-year term insurance of 200,000 on (30), you are given:

(i) Mortality follows the Standard Ultimate Life Table

(ii) The following expenses are incurred at the beginning of each respective year:

|  | Year 1 |  | Years 2 - 10 |  |
|---|---|---|---|---|
|  | Percent of Premium | Per Policy | Percent of Premium | Per Policy |
| Taxes | 5% | 0 | 5% | 0 |
| Commissions | 30% | 0 | 10% | 0 |
| Maintenance | 0% | 8 | 0% | 4 |

(iii) $i = 0.05$

(iv) $\ddot{a}_{30:\overline{5}|} = 4.5431$

Calculate the annual gross premium using the equivalence principle.

[A modified version of Question 11 on the Fall 2016 exam]

- A) 150
- B) 160
- C) 170
- D) 180
- E) 190

## Explanation

$$\begin{align*}
APV(\text{expenses}) &= 0.35G + 8 + 0.15Ga_{30:\overline{4}|} + 4a_{30:\overline{9}|} \\
&= 0.20G + 4 + 0.15G\ddot{a}_{30:\overline{5}|} + 4\ddot{a}_{30:\overline{10}|}
\end{align*}$$

$$G\ddot{a}_{30:\overline{5}|} = 0.20G + 4 + 0.15G\ddot{a}_{30:\overline{5}|} + 4\ddot{a}_{30:\overline{10}|} + 200{,}000A^{1}_{30:\overline{10}|}$$

$$G = \frac{200{,}000A^{1}_{30:\overline{10}|} + 4 + 4\ddot{a}_{30:\overline{10}|}}{0.85\ddot{a}_{30:\overline{5}|} - 0.20}$$

$$\begin{align*}
200{,}000\,A^{1}_{30:\overline{10}|} &= 200{,}000\left[A_{30:\overline{10}|} - {}_{10}E_{30}\right] \\
&= 200{,}000(0.61447 - 0.61152) \\
&= 590
\end{align*}$$

$$\begin{align*}
G &= \frac{590 + 4 + 4(8.0961)}{0.85(4.5431) - 0.20} \\
&= 171.07
\end{align*}$$

The answer is **C**.
