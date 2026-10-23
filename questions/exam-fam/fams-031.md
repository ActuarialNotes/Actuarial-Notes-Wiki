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
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:a3e79bab53f670efaead4882869dba26f5fc723b6b41eceabc431b276397dbd7
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q31, p.25, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q31, p.15, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
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
