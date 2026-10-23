---
id: "faml-3-12"
exam: "Exam FAM"
topic: "Life Table"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Life+Table
  - Concepts/Fractional+Age+Assumption
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:30a13d0d19cd3ddbf82c504681873ea1bf417bbf1dd609cca563ebd30722d8bf
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q3.12, p.21 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q3.12, p.15 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-12.md
---

X and Y are both age 61. X has just purchased a whole life insurance policy. Y purchased a whole life insurance policy one year ago.

Both X and Y are subject to the following 3-year select and ultimate table:

| $x$ | $\ell_{[x]}$ | $\ell_{[x]+1}$ | $\ell_{[x]+2}$ | $\ell_{x+3}$ | $x+3$ |
|---|---|---|---|---|---|
| 60 | 10,000 | 9,600 | 8,640 | 7,771 | 63 |
| 61 | 8,654 | 8,135 | 6,996 | 5,737 | 64 |
| 62 | 7,119 | 6,549 | 5,501 | 4,016 | 65 |
| 63 | 5,760 | 4,954 | 3,765 | 2,410 | 66 |

The force of mortality is constant over each year of age.

Calculate the difference in the probability of survival to age 64.5 between X and Y.

[Question 2 on the Spring 2017 exam]

- A) 0.035
- B) 0.045
- C) 0.055
- D) 0.065
- E) 0.075

## Explanation

$$\begin{align*}
{}_{3.5}p_{[61]} - {}_{3.5}p_{[60]+1} &= {}_{0.5}p_{64}\left({}_{3}p_{[61]} - {}_{3}p_{[60]+1}\right) \\
&= \left(\frac{l_{65}}{l_{64}}\right)^{0.5}\left(\frac{l_{64}}{l_{[61]}} - \frac{l_{64}}{l_{[60]+1}}\right) \\
&= \left(\frac{4016}{5737}\right)^{0.5}\left(\frac{5737}{8654} - \frac{5737}{9600}\right) \\
&= 0.05466
\end{align*}$$

The answer is **C**.
