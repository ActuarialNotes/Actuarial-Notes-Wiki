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
  - Concepts/Convolution
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:c83df6a40c7c5e9657bcbba76b87ab645068c7d98011e393f0e5c720633ee24f
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q10, p.9, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q10, p.5, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
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
\sigma^2 &= (1/5)(0^2) + (1/5)(25)\text{ (as printed)} + (4/45)(100^2) + (2/5)(150^2) + (4/45)(250^2) + (1/45)(400^2) - 105^2 \\
&= 8100
\end{align*}$$

The answer is **B**.
