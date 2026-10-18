---
id: "faml-6-51"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Deferred+Annuity
  - Concepts/Term+Life+Insurance
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d59d78f52d25af5662804db454932ae6b51240b341fe91f62c8feaf982e465a5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-51.md
---

For a special 10-year deferred whole life annuity-due of 50,000 on (62), you are given:

(i) Level annual net premiums are payable for 10 years

(ii) A death benefit, payable at the end of the year of death, is provided only over the deferral period and is the sum of the net premiums paid without interest

(iii) $\ddot{a}_{62} = 12.2758$

(iv) $\ddot{a}_{62:\overline{10}|} = 7.4574$

(v) $A^{1}_{62:\overline{10}|} = 0.0910$

(vi) $\displaystyle\sum_{k=1}^{10} A^{1}_{62:\overline{k}|} = 0.4891$

Calculate the net premium for this special annuity.

[A modified version of Question 14 on the Fall 2013 exam

- A) 34,400
- B) 34,500
- C) 34,600
- D) 34,700
- E) 34,800

## Explanation

Under the Equivalence Principle

$$P\ddot{a}_{62:\overline{10}|} = 50{,}000\left(\ddot{a}_{62} - \ddot{a}_{62:\overline{10}|}\right) + P\left((IA)^{1}_{62:\overline{10}|}\right)$$

where

$$\begin{align*}
(IA)^{1}_{62:\overline{10}|} &= 11A^{1}_{62:\overline{10}|} - \sum_{k=1}^{10} A^{1}_{62:\overline{k}|} \\
&= 11(0.091) - 0.4891 \\
&= 0.5119
\end{align*}$$

So

$$\begin{align*}
P &= \frac{50{,}000\left(\ddot{a}_{62} - \ddot{a}_{62:\overline{10}|}\right)}{\ddot{a}_{62:\overline{10}|} - (IA)^{1}_{62:\overline{10}|}} \\
&= \frac{50{,}000(12.2758 - 7.4574)}{7.4574 - 0.5119} \\
&= 34{,}687
\end{align*}$$

The answer is **D**.
