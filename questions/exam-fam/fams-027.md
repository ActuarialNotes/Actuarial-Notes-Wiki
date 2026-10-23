---
id: "fams-027"
exam: "Exam FAM"
topic: "Mean Excess Loss"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Mean+Excess+Loss
  - Concepts/Limited+Expected+Value
  - Concepts/Deductible
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:33dc356673e5f349ee28e5f667247c8fd3509143560d36f558737ca2cfd9aaed
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q27, p.22, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q27, p.13, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-027.md
---

The random variable for a loss, $X$, has the following characteristics:

| $x$ | $F(x)$ | $E(X \wedge x)$ |
|---|---|---|
| 0 | 0.0 | 0 |
| 100 | 0.2 | 91 |
| 200 | 0.6 | 153 |
| 1000 | 1.0 | 331 |

Calculate the mean excess loss for a deductible of 100.

- A) 250
- B) 300
- C) 350
- D) 400
- E) 450

## Explanation

$$\begin{align*}
\text{Mean excess loss} &= \frac{E(X) - E(X \wedge 100)}{1 - F(100)} \\
&= \frac{331 - 91}{0.8} \\
&= 300
\end{align*}$$

Note that $E(X) = E(X \wedge 1000)$ because $F(1000) = 1$.

The answer is **B**.
