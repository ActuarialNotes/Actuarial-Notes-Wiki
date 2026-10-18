---
id: "faml-7-35"
exam: "Exam FAM"
topic: "Modified Net Premium Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Modified+Net+Premium+Policy+Value
  - Concepts/Whole+Life+Insurance
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e14b97bc0463b822269845a7306654b1f6cf076f0bbea59a3527bd6bda897c7f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-35.md
---

For a fully discrete whole life insurance of 100,000 on (60), you are given:

i) Reserves are determined using a modified net premium reserve method

ii) The modified net premium reserve at the end of year 2 is 0

iii) Valuation premiums in years 3 and later are level

iv) Mortality follows the Standard Ultimate Life Table

v) $i = 0.05$

Calculate the valuation premium for year 5.

[Question on October 2022 FAM-L Exam]

- A) 1,950
- B) 2,050
- C) 2,120
- D) 2,190
- E) 2,290

## Explanation

The modified net premium reserve at duration 2 is:

$${}_{2}V^{\text{mod}} = 100000A_{62} - P^{\text{mod}}\ddot{a}_{62}$$

Setting it to 0,

$$\begin{align*}
P^{\text{mod}} &= 100000\,\frac{A_{62}}{\ddot{a}_{62}} \\
&= 100000\left(\frac{0.31495}{14.3861}\right) \\
&= 2189
\end{align*}$$

The answer is **D**.
