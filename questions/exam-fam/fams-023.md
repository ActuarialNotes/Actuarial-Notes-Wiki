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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fa2e55c915e001df918a6fe1cdab032d1dbae34c52dda3311d44eae66288e037
  sources: []
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
