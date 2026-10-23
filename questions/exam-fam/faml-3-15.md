---
id: "faml-3-15"
exam: "Exam FAM"
topic: "Hazard Rate"
learning_objective: "Mortality Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Hazard+Rate
  - Concepts/Survival+Model
  - Concepts/Parametric+Survival+Model
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:67c8782268af206e7ac12d99624f084f15aa98e1253714231ab3418c90e02c94
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q3.15, p.23 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q3.15, p.16 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-15.md
---

You are given the following survival function:

$$S_{0}(x) = \left(1 - \frac{x}{100}\right)^{0.5}, \quad 0 \le x \le 100$$

Calculate $1000\mu_{25}$.

[Question on October 2022 FAM-L Exam]

- A) 6.7
- B) 10.0
- C) 13.3
- D) 16.7
- E) 20.0

## Explanation

$$\begin{align*}
\mu_{25} &= \frac{-s'(25)}{s(25)} \\
&= \frac{0.5(0.01)(1 - 0.01 \times 25)^{-0.5}}{(1 - 0.01 \times 25)^{0.5}} \\
&= 0.00667
\end{align*}$$

So $1000\mu_{25} = 6.7$. The answer is **A**.
