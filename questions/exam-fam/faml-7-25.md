---
id: "faml-7-25"
exam: "Exam FAM"
topic: "Modified Net Premium Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Modified+Net+Premium+Policy+Value
  - Concepts/Whole+Life+Insurance
  - Concepts/Life+Table
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c7d72df568e06c17c5724fdadb03a57f6ba1889d418ef55c58a8835b0d9852b1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-25.md
---

For a fully discrete whole life insurance policy of 100,000 on [55], a professional skydiver, you are given:

(i) Level premiums are paid annually

(ii) Mortality follows a 2-year select and ultimate table

(iii) $i = 0.04$

(iv) The following table of values for $A_{[x]+t}$:

| $x$ | $A_{[x]}$ | $A_{[x]+1}$ | $A_{x+2}$ |
|---|---|---|---|
| 55 | 0.23 | 0.24 | 0.25 |
| 56 | 0.25 | 0.26 | 0.27 |
| 57 | 0.27 | 0.28 | 0.29 |
| 58 | 0.29 | 0.30 | 0.31 |

Calculate the Full Preliminary Term reserve at time 3.

[A modified version of Question 12 on the Fall 2016 exam]

- A) 2700
- B) 3950
- C) 5200
- D) 6450
- E) 7800

## Explanation

$$\begin{align*}
{}_{3}V^{FPT} &= 100{,}000A_{[55]+3} - 100{,}000P_{[55]+1}\,\ddot{a}_{[55]+3} \\
&= 100{,}000A_{58} - 100{,}000\,\frac{A_{[55]+1}}{\ddot{a}_{[55]+1}}\,\ddot{a}_{58} \\
&= 100{,}000\left(0.27 - \frac{0.24}{\dfrac{1 - 0.24}{d}} \cdot \frac{1 - 0.27}{d}\right) \\
&= 3947.37
\end{align*}$$

The answer is **B**.
