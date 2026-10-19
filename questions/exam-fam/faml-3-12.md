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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:30a13d0d19cd3ddbf82c504681873ea1bf417bbf1dd609cca563ebd30722d8bf
  sources: []
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
