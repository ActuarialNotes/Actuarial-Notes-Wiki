---
id: "faml-6-41"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Term+Life+Insurance
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a96910866894c42d30a8368db2b4fd4cb407ddca5d90b3cf7475b5bb30b477b1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-41.md
---

For a special fully discrete 2-year term insurance on $(x)$, you are given:

(i) $q_{x} = 0.01$

(ii) $q_{x+1} = 0.02$

(iii) $i = 0.05$

(iv) The death benefit in the first year is 100,000

(v) Both the benefits and premiums increase by 1% in the second year

Calculate the annual net premium in the first year.

[Question 9 on the Fall 2016 exam]

- A) 1410
- B) 1417
- C) 1424
- D) 1431
- E) 1438

## Explanation

Let $P$ be the net premium for year 1.

Then:

$$\begin{align*}
P + 1.01Pvp_{x} &= 100{,}000vq_{x} + (1.01)(100{,}000)v^{2}p_{x}q_{x+1} \\
P\left[1 + \frac{1.01}{1.05}0.99\right] &= 100{,}000\left(\frac{0.01}{1.05} + \frac{(1.01)(0.99)(0.02)}{(1.05)^{2}}\right) \\
\Rightarrow P &= 1416.93
\end{align*}$$

The answer is **B**.
