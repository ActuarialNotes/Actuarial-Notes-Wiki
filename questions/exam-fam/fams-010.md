---
id: "fams-010"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Variance
  - Concepts/Frequency+Distribution
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:273b9f5d5090ec33328ef903f185a919124ecc26ccc8be5abd8c78b8c2bb0b65
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-010.md
---

You are given:

| Number of Claims | Probability | Claim Size | Probability |
|---|---|---|---|
| 0 | 1/5 | | |
| 1 | 3/5 | 25 | 1/3 |
| | | 150 | 2/3 |
| 2 | 1/5 | 50 | 2/3 |
| | | 200 | 1/3 |

Claim sizes are independent.

Calculate the variance of the aggregate loss.

- A) 4,050
- B) 8,100
- C) 10,500
- D) 12,510
- E) 15,612

## Explanation

First obtain the distribution of aggregate losses:

| Value | Probability |
|---|---|
| 0 | 1/5 |
| 25 | (3/5)(1/3) = 1/5 |
| 100 | (1/5)(2/3)(2/3) = 4/45 |
| 150 | (3/5)(2/3) = 2/5 |
| 250 | (1/5)(2)(2/3)(1/3) = 4/45 |
| 400 | (1/5)(1/3)(1/3) = 1/45 |

$$\begin{align*}
\mu &= (1/5)(0) + (1/5)(25) + (4/45)(100) + (2/5)(150) + (4/45)(250) + (1/45)(400) \\
&= 105 \\
\sigma^2 &= (1/5)(0^2) + (1/5)(25) + (4/45)(100^2) + (2/5)(150^2) + (4/45)(250^2) + (1/45)(400^2) - 105^2 \\
&= 8100
\end{align*}$$

The answer is **B**.
