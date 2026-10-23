---
id: "fams-042"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Stop-Loss+Reinsurance
  - Concepts/Deductible
  - Concepts/Convolution
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:d45e0210b209bcf38e25832b7490b4a2c9b40ee65e464156653e97f85b49860c
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q42, p.34, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q42, p.19, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-042.md
---

For a collective risk model:

(i) The number of losses has a Poisson distribution with $\lambda = 2$.

(ii) The common distribution of the individual losses is:

| $x$ | $f_X(x)$ |
|---|---|
| 1 | 0.6 |
| 2 | 0.4 |

An insurance covers aggregate losses subject to a deductible of 3.

Calculate the expected aggregate payments of the insurance.

- A) 0.74
- B) 0.79
- C) 0.84
- D) 0.89
- E) 0.94

## Explanation

$$E[(S - 3)_+] = E(S) - 3 + 3f_S(0) + 2f_S(1) + 1f_S(2)$$

$$\begin{align*}
E(S) &= 2[0.6 + 2(0.4)] \\
&= 2.8 \\
f_S(0) &= e^{-2} \\
f_S(1) &= e^{-2}(2)(0.6) \\
&= 1.2e^{-2} \\
f_S(2) &= e^{-2}(2)(0.4) + \frac{e^{-2}2^2}{2!}(0.6)^2 \\
&= 1.52e^{-2}
\end{align*}$$

$$\begin{align*}
E[(S - 3)_+] &= 2.8 - 3 + 3e^{-2} + 2(1.2e^{-2}) + 1(1.52e^{-2}) \\
&= -0.2 + 6.92e^{-2} \\
&= 0.7365
\end{align*}$$

The answer is **A**.
