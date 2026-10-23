---
id: "fams-023"
exam: "Exam FAM"
topic: "Coverage Modifications"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Coverage+Modifications
  - Concepts/Deductible
  - Concepts/Inflation
  - Concepts/Aggregate+Loss+Model
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:fa2e55c915e001df918a6fe1cdab032d1dbae34c52dda3311d44eae66288e037
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q23, p.19, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q23, p.12, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-023.md
---

A group dental policy has a negative binomial claim count distribution with mean 300 and variance 800.

Ground-up severity is given by the following table:

| Severity | Probability |
|---|---|
| 40 | 0.25 |
| 80 | 0.25 |
| 120 | 0.25 |
| 200 | 0.25 |

You expect severity to increase 50% with no change in frequency. You decide to impose a per claim deductible of 100.

Calculate the expected total claim payment after these changes.

- A) Less than 18,000
- B) At least 18,000, but less than 20,000
- C) At least 20,000, but less than 22,000
- D) At least 22,000, but less than 24,000
- E) At least 24,000

## Explanation

| Severity after increase | Severity after increase and deductible |
|---|---|
| 60 | 0 |
| 120 | 20 |
| 180 | 80 |
| 300 | 200 |

$$\begin{align*}
\text{Expected payment per loss} &= 0.25(0) + 0.25(20) + 0.25(80) + 0.25(200) \\
&= 75
\end{align*}$$

$$\begin{align*}
\text{Expected payments} &= \text{Expected number of losses} \times \text{Expected payment per loss} \\
&= 300(75) \\
&= 22{,}500
\end{align*}$$

The answer is **D**.
