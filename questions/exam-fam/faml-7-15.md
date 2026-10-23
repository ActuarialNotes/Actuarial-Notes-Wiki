---
id: "faml-7-15"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Fractional+Age+Assumption
  - Concepts/Recursion
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:16ce5cf0e9fbe41a138257cf627c9afab60b9d00d270657e686df2ae45970b6e
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.15, p.104, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.15, p.72, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-15.md
---

For a fully discrete whole life insurance of 100 on ($x$), you are given:

(i) $q_{x+15} = 0.10$

(ii) Deaths are uniformly distributed over each year of age

(iii) $i = 0.05$

(iv) $_{t}V$ denotes the net premium policy value at time $t$

(v) $_{16}V = 49.78$

Calculate $_{15.6}V$.

[A modified version of Question 14 on the Fall 2014 exam]

- A) 49.7
- B) 50.0
- C) 50.3
- D) 50.6
- E) 50.9

## Explanation

$$\begin{align*}
{}_{15.6}V(1 + i)^{0.4} &= {}_{0.4}p_{x+15.6}\,{}_{16}V + {}_{0.4}q_{x+15.6}\,100 \\
{}_{15.6}V(1.05)^{0.4} &= 0.957447(49.78) + 0.042553(100) \\
{}_{15.6}V &= 50.91
\end{align*}$$

The answer is **E**.
