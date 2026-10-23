---
id: "fams-051"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Deductible
  - Concepts/Poisson+Thinning
  - Concepts/Variance
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:3147176acecf399a34a24518cff3ea69a91b8411953828e54a490b59ed4388d4
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q51, p.42, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q51, p.23, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-051.md
---

For an insurance:

(i) The number of losses per year has a Poisson distribution with $\lambda = 10$.

(ii) Loss amounts are uniformly distributed on (0, 10).

(iii) Loss amounts and the number of losses are mutually independent.

(iv) There is an ordinary deductible of 4 per loss.

Calculate the variance of aggregate payments in a year.

- A) 36
- B) 48
- C) 72
- D) 96
- E) 120

## Explanation

Since loss amounts are uniform on (0, 10), 40% of losses are below the deductible (4), and 60% are above.  Thus, claims occur at a Poisson rate $\lambda^* = 0.6(10) = 6$.

Since loss amounts were uniform on (0, 10), claims are uniform on (0, 6).

Let $N$ = number of claims; $X$ = claim amount; $S$ = aggregate claims.

$$\begin{align*}
E(N) &= Var(N) = \lambda^* \\
&= 6 \\
E(X) &= (6 - 0)/2 \\
&= 3 \\
Var(X) &= (6 - 0)^2/12 \\
&= 3 \\
Var(S) &= E(N)Var(X) + E(X)^2 Var(N) \\
&= 6(3) + 3^2(6) \\
&= 72
\end{align*}$$

The answer is **C**.
