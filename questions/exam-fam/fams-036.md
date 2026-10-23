---
id: "fams-036"
exam: "Exam FAM"
topic: "Loss Elimination Ratio"
learning_objective: "Short-Term Insurance and Reinsurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Loss+Elimination+Ratio
  - Concepts/Inflation
  - Concepts/Pareto+Distribution
  - Concepts/Limited+Expected+Value
  - Concepts/Scale+and+Shape+Parameters
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:adcad610cfe79cf1e2e88cd5ce837f19b17a0690b5dbe140c694395ce9e2b8cc
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q36, p.29, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q36, p.17, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-036.md
---

Losses in Year 1 follow a Pareto distribution with $\alpha = 2$ and $\theta = 5$.  Losses in Year 2 are uniformly 20% higher than in Year 1.  An insurance covers each loss subject to an ordinary deductible of 10.

Calculate the Loss Elimination Ratio in Year 2.

- A) 0.567
- B) 0.625
- C) 0.667
- D) 0.750
- E) 0.800

## Explanation

A Pareto $(\alpha = 2, \theta = 5)$ distribution with 20% inflation becomes Pareto with $\alpha = 2$, $\theta = 5(1.2) = 6$. In Year 2

$$\begin{align*}
E(X) &= \frac{6}{2 - 1} \\
&= 6 \\
E(X \wedge 10) &= \frac{6}{2 - 1}\left[1 - \left(\frac{6}{10 + 6}\right)^{2 - 1}\right] \\
&= 3.75 \\
E[(X - 10)_+]_+\text{ (as printed)} &= E(X) - E(X \wedge 10) \\
&= 6 - 3.75 - 2.25\text{ (as printed)} \\
\text{LER} &= 1 - \frac{E[(X - 10)_+]}{E(X)} \\
&= 1 - \frac{2.25}{6} \\
&= 0.625
\end{align*}$$

The answer is **B**.
