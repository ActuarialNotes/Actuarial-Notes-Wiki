---
id: "fams-031"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Exponential+Distribution
  - Concepts/Deductible
  - Concepts/Poisson+Thinning
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a3e79bab53f670efaead4882869dba26f5fc723b6b41eceabc431b276397dbd7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-031.md
---

A company insures a fleet of vehicles.  Aggregate losses have a compound Poisson distribution.  The expected number of losses is 20.  Loss amounts, regardless of vehicle type, have exponential distribution with $\theta = 200$.

To reduce the cost of the insurance, two modifications are to be made:

(i) A certain type of vehicle will not be insured.  It is estimated that this will reduce loss frequency by 20%.

(ii) A deductible of 100 per loss will be imposed.

Calculate the expected aggregate amount paid by the insurer after the modifications.

- A) 1600
- B) 1940
- C) 2520
- D) 3200
- E) 3880

## Explanation

By the memoryless property, the distribution of amounts paid in excess of 100 is still exponential with mean 200.

With the deductible, the probability that the amount paid is 0 is

$$\begin{align*}
F(100) &= 1 - e^{-100/200} \\
&= 0.393
\end{align*}$$

Thus the average amount paid per loss is $(0.393)(0) + (0.607)(200) = 121.4$.

The expected number of losses is $(20)(0.8) = 16$.

The expected amount paid is $(16)(121.4) = 1942$.

The answer is **B**.
