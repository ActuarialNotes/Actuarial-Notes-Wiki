---
id: "faml-3-06"
exam: "Exam FAM"
topic: "Life Table"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Life+Table
  - Concepts/Future+Lifetime+Random+Variable
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:2ffed57ad9f946a09389951bda16e731b27a2acdc7f11ebb0402e3ebb81d0e0f
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q3.6, p.17 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q3.6, p.12 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-06.md
---

You are given the following extract from a table with a 3-year select period:

| $x$ | $q_{[x]}$ | $q_{[x]+1}$ | $q_{[x]+2}$ | $q_{x+3}$ | $x+3$ |
|---|---|---|---|---|---|
| 60 | 0.09 | 0.11 | 0.13 | 0.15 | 63 |
| 61 | 0.10 | 0.12 | 0.14 | 0.16 | 64 |
| 62 | 0.11 | 0.13 | 0.15 | 0.17 | 65 |
| 63 | 0.12 | 0.14 | 0.16 | 0.18 | 66 |
| 64 | 0.13 | 0.15 | 0.17 | 0.19 | 67 |

$e_{64} = 5.10$

Calculate $e_{[61]}$.

[Question 2 on the Spring 2014 exam]

- A) 5.30
- B) 5.39
- C) 5.68
- D) 5.85
- E) 6.00

## Explanation

$$e_{[61]} = e_{[61]:\overline{3}|} + {}_{3}p_{[61]}\left(e_{64}\right)$$

$p_{[61]} = 0.90$,

$$\begin{align*}
{}_{2}p_{[61]} &= 0.9(0.88) \\
&= 0.792
\end{align*}$$

$$\begin{align*}
{}_{3}p_{[61]} &= 0.792(0.86) \\
&= 0.68112
\end{align*}$$

$$\begin{align*}
e_{[61]:\overline{3}|} &= \sum_{k=1}^{3} {}_{k}p_{[61]} \\
&= 0.9 + 0.792 + 0.68112 \\
&= 2.37312
\end{align*}$$

$$\begin{align*}
e_{[61]} &= 2.37312 + 0.68112e_{64} \\
&= 2.37312 + 0.68112(5.10) \\
&= 5.847
\end{align*}$$

The answer is **D**.
