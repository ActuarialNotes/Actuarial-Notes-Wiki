---
id: "faml-7-27"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Expenses
  - Concepts/Equivalence+Principle
  - Concepts/Endowment+Insurance
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:63119af6a30df09647c38ca4b81364bf323a27501592b75e3201ec8dc845ae50
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.27, p.116, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.27, p.77, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-27.md
---

The gross annual premium, *G*, for a fully discrete 5-year endowment insurance of 1000 issued on (*x*) is calculated using the equivalence principle. You are given:

(i) $1000P_{x:\overline{5}|} = 187.00$

(ii) The expense policy value at the end of the first year, $_{1}V^{e} = -38.70$

(iii) $q_{x} = 0.008$

(iv) Expenses, payable at the beginning of the year, are:

| Year | Percent of Premium | Per Policy |
|---|---|---|
| First | 25% | 10 |
| Renewal | 5% | 5 |

(v) $i = 0.03$

Calculate *G*.

[Question 17 on the Fall 2016 exam]

- A) 200
- B) 213
- C) 226
- D) 239
- E) 252

## Explanation

Since $G$ is determined using the equivalence principle, ${}_{0}V = 0$.

Then,

$$\begin{align*}
{}_{1}V^{e} &= \frac{\left(0 + \overbrace{G - 187}^{P^{e}} - 0.25G - 10\right)(1.03)}{0.992} \\
&= -38.7
\end{align*}$$

$$\begin{align*}
\Rightarrow 0.75G &= \frac{-38.7(0.992)}{1.03} + 187 + 10 \\
&= 159.72
\end{align*}$$

$$\Rightarrow G = 212.97$$

The answer is **B**.
