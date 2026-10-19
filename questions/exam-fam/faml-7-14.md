---
id: "faml-7-14"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Recursion
  - Concepts/Expenses
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:18fedd2973feaa77b4dd02c0068ac9cf6278631732a07138ad13f7aaf63846f2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-14.md
---

For a fully discrete whole life insurance of 100,000 on (45), you are given:

(i) The gross premium policy value at duration 5 is 5500 and at duration 6 is 7100

(ii) $q_{50} = 0.009$

(iii) $i = 0.05$

(iv) Renewal expenses at the start of each year are 50 plus 4% of the gross premium.

(v) Claim expenses are 200.

Calculate the gross premium.

[A modified version of Question 13 on the Fall 2014 exam]

- A) 2200
- B) 2250
- C) 2300
- D) 2350
- E) 2400

## Explanation

$$\begin{align*}
\left({}_{5}V + 0.96G - 50\right)(1.05) &= q_{50}(100{,}200) + p_{50}\,{}_{6}V \\
\left(5500 + 0.96G - 50\right)(1.05) &= (0.009)(100{,}200) + (1 - 0.009)(7100) \\
(1.05)(0.96)G + 5722.5 &= 7937.9 \\
(1.05)(0.96)G &= 2215.4 \\
G &= 2197.8
\end{align*}$$

The answer is **A**.
