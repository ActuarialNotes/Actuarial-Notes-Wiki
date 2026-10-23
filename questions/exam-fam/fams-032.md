---
id: "fams-032"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Variance
  - Concepts/Frequency+Distribution
  - Concepts/Probability
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:281e35d88a9cb2e0912eac18feba729fe1cfa157e4e0a6d840871a6d36fdd1fb
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q32, p.26, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q32, p.15, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-032.md
---

The number of claims, $N$, made on an insurance portfolio follows the following distribution:

| $n$ | $\Pr(N = n)$ |
|---|---|
| 0 | 0.7 |
| 2 | 0.2 |
| 3 | 0.1 |

If a claim occurs, the benefit is 0 or 10 with probability 0.8 and 0.2, respectively.

The number of claims and the benefit for each claim are independent.

Calculate the probability that aggregate benefits will exceed expected benefits by more than 2 standard deviations.

- A) 0.02
- B) 0.05
- C) 0.07
- D) 0.09
- E) 0.12

## Explanation

$$\begin{align*}
E(N) &= 0.7(0) + 0.2(2) + 0.1(3) \\
&= 0.7 \\
Var(N) &= 0.7(0) + 0.2(4) + 0.1(9) - 0.7^2 \\
&= 1.21 \\
E(X) &= 0.8(0) + 0.2(10) \\
&= 2 \\
Var(X) &= 0.8(0) + 0.2(100) - 2^2 \\
&= 16 \\
E(S) &= E(N)E(X) \\
&= 0.7(2) \\
&= 1.4 \\
Var(S) &= E(N)Var(X) + E(X)^2 Var(N) \\
&= 0.7(16) + 4(1.21) \\
&= 16.04 \\
SD(S) &= \sqrt{16.04} \\
&= 4
\end{align*}$$

$$\begin{align*}
\Pr(S > 1.4 + 2(4) = 9.4) &= 1 - \Pr(S = 0) \\
&= 1 - 0.7 - 0.2(0.8)^2 - 0.1(0.8)^3 \\
&= 0.12
\end{align*}$$

The last line follows because there are no possible values for $S$ between 0 and 10. A value of 0 can be obtained three ways: no claims, two claims both for 0, three claims all for 0.

The answer is **E**.
