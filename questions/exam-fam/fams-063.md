---
id: "fams-063"
exam: "Exam FAM"
topic: "Deductible"
learning_objective: "Short-Term Insurance and Reinsurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Deductible
  - Concepts/Truncation
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:82f0e5e2351ceb2aa28d590a8090639b1945e26a7a33e2e2032582e736dd30ac
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q63, p.51, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q63, p.28, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-063.md
---

The random variable $X$ represents the random loss, before any deductible is applied, covered by an insurance policy. The probability density function of $X$ is

$$f(x) = 2x, \quad 0 < x < 1.$$

Payments are made subject to a deductible, $d$, where $0 < d < 1$.

The probability that a claim payment is less than 0.5 is equal to 0.64.

Calculate the value of $d$.

- A) 0.1
- B) 0.2
- C) 0.3
- D) 0.4
- E) 0.5

## Explanation

$F(x) = \int_0^x 2y\,dy = x^2$. Let $C$ be a random claim payment. Then $C = 0$ if $X < d$ and $C = X - d$ if $X \ge d$. Then,

$$\begin{align*}
P(C < 0.5) &= 0.64 \\
P(C \ge 0.5) &= 0.36 \\
P(X - d \ge 0.5) &= 0.36 \\
P(X \ge 0.5 + d) &= 0.36 \\
F(0.5 + d) &= 0.64 \\
(0.5 + d)^2 &= 0.64 \\
0.5 + d &= 0.8 \\
d &= 0.3
\end{align*}$$

The answer is **C**.
