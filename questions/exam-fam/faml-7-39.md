---
id: "faml-7-39"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Recursion
  - Concepts/Deferred+Annuity
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:9da06b5607d416bec0e0ea0a0df584986a6c90fb0bb20a6f24862a4cc12291fe
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.39, p.124, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.39, p.82, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-39.md
---

An insurer issues a 20-year deferred whole life annuity due on [45]. You are given:

i) Net premiums of 20,000 are payable at the beginning of each year during the deferral period

ii) There is no benefit paid upon death during the deferral period

iii) $_{t}V$ denotes the net premium policy value at time *t*, $t \ge 0$

iv) $_{19}V = 575{,}000$

v) $q_{[45]+18} = 0.023044$

vi) $i = 0.05$

Calculate $_{18}V$.

[Question on October 2022 FAM-L Exam]

- A) 495,000
- B) 505,000
- C) 515,000
- D) 525,000
- E) 535,000

## Explanation

$$\left({}_{18}V + P\right)(1+i) = p_{[45]+18} \times {}_{19}V$$

$$\begin{align*}
{}_{18}V &= 0.976956 \times 575{,}000/1.05 - 20{,}000 \\
&= 515{,}000
\end{align*}$$

The answer is **C**.
