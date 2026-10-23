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
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:4541a648f7094dd97dfef1582bc952c7d4c672e7f1758132b93c40004bd58fee
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.23, p.112, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.23, p.76, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
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
