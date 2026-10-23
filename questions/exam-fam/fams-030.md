---
id: "fams-030"
exam: "Exam FAM"
topic: "Frequency Distribution"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Frequency+Distribution
  - Concepts/Poisson+Distribution
  - Concepts/Recursion
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:59b26d096a18d38d3c095783f0b387d9acab7ea6f2c24a28f6e378aadf182bec
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q30, p.25, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q30, p.15, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-030.md
---

For a discrete probability distribution, you are given the recursion relation

$$p(k) = \frac{2}{k}p(k-1), \quad k = 1, 2, \ldots$$

Calculate $p(4)$.

- A) 0.07
- B) 0.08
- C) 0.09
- D) 0.10
- E) 0.11

## Explanation

$$p(k) = \frac{2}{k}p(k-1) = \left(0 + \frac{2}{k}\right)p(k-1)$$

Thus an $(a, b, 0)$ distribution with $a = 0$, $b = 2$.

Thus, Poisson with $\lambda = 2$.

$$\begin{align*}
p(4) &= \frac{e^{-2}2^4}{4!} \\
&= 0.09
\end{align*}$$

The answer is **C**.
