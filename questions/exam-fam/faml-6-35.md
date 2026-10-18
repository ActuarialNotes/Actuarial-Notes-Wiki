---
id: "faml-6-35"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Expenses
  - Concepts/Whole+Life+Insurance
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b9ea7fbced2e9717dd2d09e589641be6a549628884afc3e0922df8e73100887f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-35.md
---

For a fully discrete whole life insurance policy of 100,000 on (35), you are given:

(i) First year commissions are 19% of the annual gross premium

(ii) Renewal year commissions are 4% of the annual gross premium

(iii) Mortality follows the Standard Ultimate Life Table

(iv) $i = 0.05$

Calculate the annual gross premium for this policy using the equivalence principle.

[A modified version of Question 7 on the Spring 2016 exam]

- A) 410
- B) 450
- C) 490
- D) 530
- E) 570

## Explanation

Let $G$ be the annual gross premium. By the equivalence principle, we have

$$G\ddot{a}_{35} = 100{,}000A_{35} + 0.15G + 0.04G\ddot{a}_{35}$$

so that

$$\begin{align*}
G &= \frac{100{,}000A_{35}}{0.96\ddot{a}_{35} - 0.15} \\
&= \frac{100{,}000(0.09653)}{0.96(18.9728) - 0.15} \\
&= 534.38
\end{align*}$$

The answer is **D**.
