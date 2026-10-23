---
id: "faml-7-16"
exam: "Exam FAM"
topic: "Future Loss Random Variable"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Future+Loss+Random+Variable
  - Concepts/Policy+Value
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:3912cf68e1d065ded764415372bb80d4c49b1bf5c293a87ad421954bc053a9d2
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.16, p.105, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.16, p.73, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-16.md
---

For a fully discrete 5-payment whole life insurance of 1000 on (80), you are given:

(i) The gross premium is 130

(ii) $q_{80+k} = 0.01(k+1), \quad k = 0, 1, 2, \ldots, 5$

(iii) $v = 0.95$

(iv) $1000A_{86} = 683$

(v) $_{3}L$ is the prospective loss random variable at time 3, based on the gross premium

Calculate $E[{}_{3}L]$.

[Question 15 on the Fall 2014 exam]

- A) 330
- B) 350
- C) 360
- D) 380
- E) 390

## Explanation

$$\begin{align*}
\text{APV future benefits} &= 1000\left[0.04v + 0.05 \times 0.96v^{2} + 0.96 \times 0.95 \times (0.06 + 0.94 \times 0.683)v^{3}\right] \\
&= 630.25
\end{align*}$$

$$\begin{align*}
\text{APV future premiums} &= 130(1 + 0.96v) \\
&= 248.56
\end{align*}$$

$$\begin{align*}
E[{}_{3}L] &= 630.25 - 248.56 \\
&= 381.69
\end{align*}$$

The answer is **D**.
