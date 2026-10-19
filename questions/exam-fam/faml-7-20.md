---
id: "faml-7-20"
exam: "Exam FAM"
topic: "Modified Net Premium Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Modified+Net+Premium+Policy+Value
  - Concepts/Policy+Value
  - Concepts/Equivalence+Principle
  - Concepts/Expenses
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:94efca521ee4b6d2d16537315dc6a89544e41d4c1f7ade8be6a00a85dda12043
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-20.md
---

For a fully discrete whole life insurance of 1000 on (35), you are given:

(i) First year expenses are 30% of the gross premium plus 300

(ii) Renewal expenses are 4% of the gross premium plus 30

(iii) All expenses are incurred at the beginning of the policy year

(iv) Gross premiums are calculated using the equivalence principle

(v) The gross premium policy value at the end of the first policy year is *R*

(vi) Using the Full Preliminary Term Method, the modified net premium reserve at the end of the first policy year is *S*

(vii) Mortality follows the Standard Ultimate Life Table

(viii) $i = 0.05$

Calculate $R - S$.

[A modified version of Question 15 on the Fall 2015 exam]

- A) -280
- B) -140
- C) 0
- D) 140
- E) 280

## Explanation

If $G$ denotes the gross premium, then

$$\begin{align*}
G &= \frac{1000A_{35} + 30\ddot{a}_{35} + 270}{0.96\ddot{a}_{35} - 0.26} \\
&= \frac{1000(0.09653) + 30(18.9728) + 270}{0.96(18.9728) - 0.26} \\
&= 52.12
\end{align*}$$

So that,

$$\begin{align*}
R &= 1000A_{36} + (30 - 0.96G)\,\ddot{a}_{36} \\
&= 1000(0.10101) + (30 - 0.96 \times 52.12)(18.8788) \\
&= -277.23
\end{align*}$$

Note that $S = 0$ as per definition of FPT reserve.

The answer is **A**.
