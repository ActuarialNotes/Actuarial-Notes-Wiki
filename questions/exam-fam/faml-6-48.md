---
id: "faml-6-48"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Term+Life+Insurance
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3a39493fdcbc8267933476e514333bc5bca19249abfdfa418a847480a2a861a4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-48.md
---

For a special fully discrete 5-year deferred 3-year term insurance of 100,000 on ($x$) you are given:

(i) There are two premium payments, each equal to $P$. The first is paid at the beginning of the first year and the second is paid at the end of the 5-year deferral period

(ii) The following probabilities:

(iii) $_{5}p_{x} = 0.95$

(iv) $q_{x+5} = 0.02, \quad q_{x+6} = 0.03, \quad q_{x+7} = 0.04$

(v) $i = 0.06$

Calculate $P$ using the equivalence principle.

[Question 9 on the Fall 2017 exam]

- A) 3195
- B) 3345
- C) 3495
- D) 3645
- E) 3895

## Explanation

Actuarial present value of insured benefits:

$$\begin{align*}
&100{,}000\left[\frac{0.95 \times 0.02}{1.06^{6}} + \frac{0.95 \times 0.98 \times 0.03}{1.06^{7}} + \frac{0.95 \times 0.98 \times 0.97 \times 0.04}{1.06^{8}}\right] \\
&= 5{,}463.32
\end{align*}$$

$$\begin{align*}
P\left(1 + \frac{0.95}{1.06^{5}}\right) &= 5{,}463.32 \\
\Rightarrow P &= 3{,}195.12
\end{align*}$$

The answer is **A**.
