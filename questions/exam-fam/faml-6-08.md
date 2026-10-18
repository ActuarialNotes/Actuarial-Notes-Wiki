---
id: "faml-6-08"
exam: "Exam FAM"
topic: "Expenses"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Expenses
  - Concepts/Equivalence+Principle
  - Concepts/Annuity+Due
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8f40ed88aa179ea0b7062379fcc1710424ff64fc1ffb36491bdb2b22bb6cdd07
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-08.md
---

For a fully discrete whole life insurance on (60), you are given:

(i) Mortality follows the Standard Ultimate Life Table

(ii) $i = 0.05$

(iii) The expected company expenses, payable at the beginning of the year, are:

- 50 in the first year
- 10 in years 2 through 10
- 5 in years 11 through 20
- 0 after year 20

Calculate the level annual amount that is actuarially equivalent to the expected company expenses.

[Question 2 on the Spring 2013 exam]

- A) 7.5
- B) 9.5
- C) 11.5
- D) 13.5
- E) 15.5

## Explanation

$$\ddot{a}_{60:\overline{10}|} = 7.9555$$

$$\ddot{a}_{60:\overline{20}|} = 12.3816$$

$$\begin{align*}
\text{Annual level amount} &= \frac{40 + 5\ddot{a}_{60:\overline{10}|} + 5\ddot{a}_{60:\overline{20}|}}{\ddot{a}_{60}} \\
&= \frac{141.686}{14.9041} \\
&= 9.51
\end{align*}$$

The answer is **B**.
