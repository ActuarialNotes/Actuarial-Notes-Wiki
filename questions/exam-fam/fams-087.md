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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:742d8a0d0505ef01480cf3536eef2e1862c7be0ab94efbd3dfd884eb7e985418
  sources: []
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
