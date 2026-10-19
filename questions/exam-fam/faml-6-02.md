---
id: "faml-6-02"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Expenses
  - Concepts/Term+Life+Insurance
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f8c49a3fa6f8e73e22a2f169104e40301d113bc5b770790575115ca8d8de6b88
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-02.md
---

For a fully discrete 10-year term life insurance policy on $(x)$, you are given:

(i) Death benefits are 100,000 plus the return of all gross premiums paid without interest

(ii) Expenses are 50% of the first year's gross premium, 5% of renewal gross premiums and 200 per policy expenses each year

(iii) Expenses are payable at the beginning of the year

(iv) $A^{1}_{x:\overline{10}|} = 0.17094$

(v) $(IA)^{1}_{x:\overline{10}|} = 0.96728$

(vi) $\ddot{a}_{x:\overline{10}|} = 6.8865$

Calculate the gross premium using the equivalence principle.

[Question 25 on the Fall 2012 exam]

- A) 3200
- B) 3300
- C) 3400
- D) 3500
- E) 3600

## Explanation

$$G\ddot{a}_{x:\overline{10}|} = 100{,}000A^{1}_{x:\overline{10}|} + G(IA)^{1}_{x:\overline{10}|} + 0.45G + 0.05G\ddot{a}_{x:\overline{10}|} + 200\ddot{a}_{x:\overline{10}|}$$

$$\begin{align*}
G &= \frac{(100{,}000)(0.17094) + 200(6.8865)}{(1-0.05)(6.8865) - 0.96728 - 0.45} \\
&= 3604.23
\end{align*}$$

The answer is **E**.
