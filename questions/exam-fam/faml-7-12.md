---
id: "faml-7-12"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Recursion
  - Concepts/Endowment+Insurance
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2dc86727f2d1bb8870c4e976f52ff864544ce6b1f8be3cf1371b278872c449f4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-12.md
---

For a special fully discrete 25-year endowment insurance on (44), you are given:

(i) The death benefit is $(26 - k)$ for death in year $k$, for $k = 1, 2, 3 \ldots 25$

(ii) The endowment benefit in year 25 is 1

(iii) Net premiums are level

(iv) $q_{55} = 0.15$

(v) $i = 0.04$

(vi) $_{11}V$, the net premium policy value at the end of year 11, is 5.00

(vii) $_{24}V$, the net premium policy value at the end of year 24, is 0.60

Calculate $_{12}V$, the net premium policy value at end of year 12.

[A modified version of Question 13 on the Spring 2014 exam]

- A) 3.63
- B) 3.74
- C) 3.88
- D) 3.98
- E) 4.09

## Explanation

In the final year:

$$({}_{24}V + P)(1 + i) = b_{25}(q_{68}) + 1(p_{68})$$

Since $b_{25} = 1$, this reduces to

$$\begin{align*}
({}_{24}V + P)(1 + i) &= 1 \\
\Rightarrow (0.6 + P)(1.04) &= 1 \\
\Rightarrow P &= 0.36154
\end{align*}$$

Looking back to the 12th year:

$$\begin{align*}
({}_{11}V + P)(1 + i) &= b_{12}(q_{55}) + {}_{12}V(p_{55}) \\
\Rightarrow (5.36154)(1.04) &= 14(0.15) + {}_{12}V(0.85) \\
\Rightarrow {}_{12}V &= 4.089
\end{align*}$$

The answer is **E**.
