---
id: "fams-058"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Poisson+Distribution
  - Concepts/Severity+Distribution
  - Concepts/Moment
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:3cfec8e6c3a0c1768e448b3256d370e8b92e275de525f340982715e9c48fd5f3
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q58, p.47, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q58, p.26, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-058.md
---

Aggregate losses are modeled as follows:

(i) The number of losses has a Poisson distribution with $\lambda = 3$.

(ii) The amount of each loss has a Burr distribution with $\alpha = 3, \theta = 2, \gamma = 1$.

(iii) The number of losses and the amounts of the losses are mutually independent.

Calculate the variance of aggregate losses.

- A) 12
- B) 14
- C) 16
- D) 18
- E) 20

## Explanation

Let $S$ = aggregate losses, $X$ = severity. Since the frequency is Poisson,

$$\begin{align*}
Var(S) &= \lambda E\left(X^2\right) \\
E(X^2) &= \frac{2^2\,\Gamma(3)\Gamma(1)}{\Gamma(3)} \quad \text{(table lookup)} \\
&= 4 \\
Var(S) &= 3(4) \\
&= 12
\end{align*}$$

You would get the same result if you used

$$Var(S) = E(N)Var(X) + Var(N)E(X)^2$$

The answer is **A**.
