---
id: "fams-087"
exam: "Exam FAM"
topic: "Risk Measure"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Risk+Measure
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:742d8a0d0505ef01480cf3536eef2e1862c7be0ab94efbd3dfd884eb7e985418
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q87, p.69, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q87, p.34, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-087.md
---

You are asked to consider whether the risk measure $\rho(X) = E(X)$ is coherent.

Determine which of the following statements is correct.

- A) $\rho(X)$ does NOT possess subadditivity.
- B) $\rho(X)$ does NOT possess monotonicity.
- C) $\rho(X)$ does NOT possess positive homogeneity.
- D) $\rho(X)$ does NOT possess translation invariance.
- E) $\rho(X)$ is a coherent risk measure.

## Explanation

Subadditivity holds:

$$\begin{align*}
\rho(X+Y) &= E(X+Y) \\
&= E(X) + E(Y) \\
&= \rho(X) + \rho(Y)
\end{align*}$$

Monotonicity holds: If $X \le Y$, then $\rho(X) = E(X) \le \rho(Y) = E(Y)$.

Positive homogeneity holds:

$$\begin{align*}
\rho(cX) &= E(cX) \\
&= cE(X) \\
&= c\rho(X)
\end{align*}$$

Translation invariance holds:

$$\begin{align*}
\rho(X+c) &= E(X+c) \\
&= E(X) + c \\
&= \rho(X) + c
\end{align*}$$

Since $\rho(X) = E(X)$ satisfies all four properties, it is coherent.

The answer is **E**.
