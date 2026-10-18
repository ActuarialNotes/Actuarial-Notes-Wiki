---
id: "faml-3-07"
exam: "Exam FAM"
topic: "Fractional Age Assumption"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Fractional+Age+Assumption
  - Concepts/Life+Table
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:130faad0e536b5b3dc1f318cecbc2a4afae31872a230e3991176c0a7cb926ace
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-07.md
---

For a mortality table with a select period of two years, you are given:

| $x$ | $q_{[x]}$ | $q_{[x]+1}$ | $q_{x+2}$ | $x+2$ |
|---|---|---|---|---|
| 50 | 0.0050 | 0.0063 | 0.0080 | 52 |
| 51 | 0.0060 | 0.0073 | 0.0090 | 53 |
| 52 | 0.0070 | 0.0083 | 0.0100 | 54 |
| 53 | 0.0080 | 0.0093 | 0.0110 | 55 |

The force of mortality is constant between integral ages.

Calculate $1000\;{}_{2.5}q_{[50]+0.4}$.

[Question 20 on the Fall 2014 exam]

- A) 15.2
- B) 16.4
- C) 17.7
- D) 19.0
- E) 20.2

## Explanation

$$\begin{align*}
{}_{2.5}q_{[50]+0.4} &= 1 - {}_{2.5}p_{[50]+0.4} \\
&= 1 - {}_{2.9}p_{[50]} / \left(p_{[50]}\right)^{0.4} \\
&= 1 - \left\{p_{[50]}\,p_{[50]+1}\left(p_{52}\right)^{0.9}\right\} / \left(1 - q_{[50]}\right)^{0.4} \\
&= 1 - \left\{\left(1 - q_{[50]}\right)\left(1 - q_{[50]+1}\right)\left(1 - q_{52}\right)^{0.9}\right\} / \left(1 - q_{[50]}\right)^{0.4} \\
&= 1 - \left\{(1 - 0.0050)(1 - 0.0063)(1 - 0.0080)^{0.9}\right\} / (1 - 0.0050)^{0.4} \\
&= 0.01642
\end{align*}$$

$$1000\;{}_{2.5}q_{[50]+0.4} = 16.42$$

The answer is **B**.
