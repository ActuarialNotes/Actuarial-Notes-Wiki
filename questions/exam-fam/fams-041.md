---
id: "fams-041"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Deductible
  - Concepts/Poisson+Thinning
  - Concepts/Limited+Expected+Value
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:a7cc4b33e0296dab5b562ad89373b4c0b61a781f9f809ac08fdaa179572f7465
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q41, p.33, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q41, p.19, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-041.md
---

For a collective risk model the number of losses, $N$, has a Poisson distribution with $\lambda = 20$.

The common distribution of the individual losses has the following characteristics:

(i) $E[X] = 70$

(ii) $E[X \wedge 30] = 25$

(iii) $\Pr(X > 30) = 0.75$

(iv) $E[X^2 \mid X > 30] = 9000$

An insurance covers aggregate losses subject to an ordinary deductible of 30 per loss.

Calculate the variance of the aggregate payments of the insurance.

- A) 54,000
- B) 67,500
- C) 81,000
- D) 94,500
- E) 108,000

## Explanation

Losses in excess of the deductible occur at a Poisson rate of

$$\begin{align*}
\lambda^* &= [1 - F(30)]\lambda \\
&= 0.75(20) \\
&= 15
\end{align*}$$

The expected payment squared per payment is

$$\begin{align*}
E[(X - 30)^2 \mid X > 30] &= E(X^2 - 60X + 900 \mid X > 30) \\
&= E[X^2 - 60(X - 30) - 900 \mid X > 30] \\
&= E[X^2 \mid X > 30] - 60\,\frac{E(X) - E(X \wedge 30)}{1 - F(30)} - 900 \\
&= 9000 - 60\,\frac{70 - 25}{0.75} - 900 \\
&= 4500
\end{align*}$$

The variance of $S$ is the expected number of payments times the second moment, $15(4500) = 67{,}500$.

The answer is **B**.
