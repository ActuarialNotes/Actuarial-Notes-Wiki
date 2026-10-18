---
id: "faml-7-23"
exam: "Exam FAM"
topic: "Modified Net Premium Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Modified+Net+Premium+Policy+Value
  - Concepts/Endowment+Insurance
  - Concepts/Equivalence+Principle
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4541a648f7094dd97dfef1582bc952c7d4c672e7f1758132b93c40004bd58fee
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-23.md
---

For a 40-year endowment insurance of 10,000 issued to (25), you are given:

(i) $i = 0.04$

(ii) $p_{25} = 0.995$

(iii) $\ddot{a}_{25:\overline{20}|} = 11.087$

(iv) $\ddot{a}_{25:\overline{40}|} = 16.645$

(v) The annual level net premium is 216

(vi) A modified net premium reserving method is used for this policy, where the valuation premiums are:

- A first year premium equal to the first year net cost of insurance,
- Level premiums of $\beta$ for years 2 through 20, and
- Level premiums of 216 thereafter.

Calculate $\beta$.

[Question 15 on the Spring 2016 exam]

- A) 140
- B) 170
- C) 200
- D) 230
- E) 260

## Explanation

We have Present Value of Modified Premiums = Present Value of level net premiums

$$v q_{x} + \beta\left(\ddot{a}_{25:\overline{20}|} - 1\right) + P \cdot {}_{20}E_{25} \cdot \ddot{a}_{45:\overline{20}|} = P\ddot{a}_{25:\overline{40}|}$$

$$\begin{align*}
\Rightarrow \beta &= \frac{P\left(\ddot{a}_{25:\overline{40}|}\right) - P \cdot {}_{20}E_{25} \cdot \ddot{a}_{45:\overline{20}|} - v q_{x}}{\ddot{a}_{25:\overline{20}|} - 1} \\
&= \frac{P\,\ddot{a}_{25:\overline{20}|} - v q_{x}}{\ddot{a}_{25:\overline{20}|} - 1}
\end{align*}$$

We are given that $P = 0.0216$

$$\begin{align*}
\Rightarrow \beta &= \frac{0.0216(11.087) - (1.04)^{-1}(0.005)}{11.087 - 1} \\
&= 0.023265
\end{align*}$$

For insurance of 10,000, $\beta = 233$.

The answer is **D**.
