---
id: "faml-6-16"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Expenses
  - Concepts/Endowment+Insurance
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:43091a00cacbed8569078e5c13275946591241489ba35ad1e0fb417b0ac29a74
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-16.md
---

For a fully discrete 20-year endowment insurance of 100,000 on (30), you are given:

(i) $d = 0.05$

(ii) Expenses, payable at the beginning of each year, are:

| | First Year: Percent of Premium | First Year: Per Policy | Renewal Years: Percent of Premium | Renewal Years: Per Policy |
|---|---|---|---|---|
| Taxes | 4% | 0 | 4% | 0 |
| Sales Commission | 35% | 0 | 2% | 0 |
| Policy Maintenance | 0% | 250 | 0% | 50 |

(iii) The net premium is 2143

Calculate the gross premium using the equivalence principle.

[Question 10 on the Spring 2014 exam]

- A) 2410
- B) 2530
- C) 2800
- D) 3130
- E) 3280

## Explanation

$$\begin{align*}
P_{30:\overline{20}|} = \frac{1}{\ddot{a}_{30:\overline{20}|}} - d \Rightarrow \frac{2{,}143}{100{,}000} + 0.05 &= \frac{1}{\ddot{a}_{30:\overline{20}|}} \\
\Rightarrow \ddot{a}_{30:\overline{20}|} &= 14
\end{align*}$$

$$\begin{align*}
A_{30:\overline{20}|} &= 1 - d\,\ddot{a}_{30:\overline{20}|} \\
&= 1 - 0.05(14) \\
&= 0.3
\end{align*}$$

$$\begin{align*}
G\ddot{a}_{30:\overline{20}|} &= 100{,}000A_{30:\overline{20}|} + (200 + 50\ddot{a}_{30:\overline{20}|}) + (0.33G + 0.06G\,\ddot{a}_{30:\overline{20}|}) \\
14G &= 100{,}000(0.3) + [200 + 50(14)] + (0.33G + 0.84G) \\
12.83G &= 30{,}900 \\
G &= 2408
\end{align*}$$

The answer is **A**.
