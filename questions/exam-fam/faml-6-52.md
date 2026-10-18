---
id: "faml-6-52"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Expenses
  - Concepts/Whole+Life+Insurance
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fcc535136b9e39d7e2df3463303da2d327a6637b0b744fc28dafdca4dc63fc37
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-52.md
---

For a fully discrete 10-payment whole life insurance of $H$ on (45), you are given:

(i) Expenses payable at the beginning of each year are as follows:

| Expense Type | First Year | Years 2-10 | Years 11+ |
|---|---|---|---|
| Per policy | 100 | 20 | 10 |
| % of Premium | 105% | 5% | 0% |

(ii) Mortality follows the Standard Ultimate Life Table

(iii) $i = 0.05$

(iv) The gross annual premium, calculated using the equivalence principle, is of the form $G = gH + f$, where $g$ is the premium rate per 1 of insurance and $f$ is the per policy fee

Calculate $f$.

[A modified version of Question 11 on the Spring 2017 exam]

- A) 42.00
- B) 44.20
- C) 46.40
- D) 48.60
- E) 50.80

## Explanation

$$G\ddot{a}_{45:\overline{10}|} = HA_{45} + G + 0.05G\ddot{a}_{45:\overline{10}|} + 80 + 10\ddot{a}_{45} + 10\ddot{a}_{45:\overline{10}|}$$

$$\begin{align*}
G &= \frac{HA_{45} + 80 + 10\left(\ddot{a}_{45} + \ddot{a}_{45:\overline{10}|}\right)}{0.95\ddot{a}_{45:\overline{10}|} - 1} \\
G &= \frac{HA_{45} + 80 + 10(17.8162 + 8.0751)}{(0.95 \times 8.0751) - 1} \\
G &= \frac{A_{45}}{(0.95 \times 8.0751) - 1}H + \frac{80 + 10(17.8162 + 8.0751)}{(0.95 \times 8.0751) - 1}
\end{align*}$$

$$g = \frac{A_{45}}{(0.95 \times 8.0751) - 1}$$

$$\begin{align*}
f &= \frac{80 + 10(17.8162 + 8.0751)}{(0.95 \times 8.0751) - 1} \\
&= 50.80
\end{align*}$$

The answer is **E**.
