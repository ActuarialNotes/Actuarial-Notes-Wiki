---
id: "faml-6-20"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Term+Life+Insurance
  - Concepts/Life+Table
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4fb8d1632b3ecd106e9a5975364323c75a0005c9f7f339a8c3d8e64304b5330a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-20.md
---

For a special fully discrete 3-year term insurance on (75), you are given:

(i) The death benefit during the first two years is the sum of the net premiums paid without interest

(ii) The death benefit in the third year is 10,000

(iii)

| $x$ | $p_{x}$ |
|---|---|
| 75 | 0.90 |
| 76 | 0.88 |
| 77 | 0.85 |

(iv) $i = 0.04$

Calculate the annual net premium.

[Question 8 on the Fall 2014 exam]

- A) 449
- B) 459
- C) 469
- D) 479
- E) 489

## Explanation

EPV(premiums) = EPV(benefits)

$$\begin{align*}
P\left(1 + v p_{x} + v^{2}\,{}_{2}p_{x}\right) &= P\left(v q_{x} + 2v^{2} p_{x} q_{x+1}\right) + 10000\left(v^{3}\,{}_{2}p_{x} q_{x+2}\right) \\
P\left(1 + \frac{0.9}{1.04} + \frac{0.9 \times 0.88}{1.04^{2}}\right) &= P\left(\frac{0.1}{1.04} + \frac{2 \times 0.9 \times 0.12}{1.04^{2}}\right) + 10000\left(\frac{0.9 \times 0.88 \times 0.15}{1.04^{3}}\right) \\
2.5976P &= 0.29588P + 1056.13 \\
P &= 459
\end{align*}$$

The answer is **B**.
