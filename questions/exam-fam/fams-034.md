---
id: "fams-034"
exam: "Exam FAM"
topic: "Aggregate Loss Model"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Normal+Approximation
  - Concepts/Poisson+Distribution
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3195fb95174ad183a03c5bfb8e77a429a592f3ba329086c74ad26108a620aeb3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-034.md
---

Two types of insurance claims are made to an insurance company.  For each type, the number of claims follows a Poisson distribution and the amount of each claim is uniformly distributed as follows:

| Type of Claim | Poisson Parameter $\lambda$ for Number of Claims in one year | Range of Each Claim Amount |
|---|---|---|
| I | 12 | (0, 1) |
| II | 4 | (0, 5) |

The numbers of claims of the two types are independent and the claim amounts and claim numbers are independent.

Calculate the normal approximation to the probability that the total of claim amounts in one year exceeds 18.

- A) 0.37
- B) 0.39
- C) 0.41
- D) 0.43
- E) 0.45

## Explanation

$N_I, N_{II}$ denote the random variables for # of claims for Types I and II in one year.

$X_I, X_{II}$ denote the claim amount random variables for Types I and II.

$S_I, S_{II}$ denote the total claim amount random variables for Types I and II.

$S = S_I + S_{II}$

$$\begin{align*}
E(N_I) &= Var(N_I) = 12 \\
E(N_{II}) &= Var(N_{II}) = 4 \\
E(X_I) &= (0 + 1)/2 \\
&= 1/2 \\
Var(X_I) &= (1 - 0)^2/12 \\
&= 1/12 \\
E(X_{II}) &= (0 + 5)/2 \\
&= 5/2 \\
Var(X_{II}) &= (5 - 0)^2/12 \\
&= 25/12
\end{align*}$$

$$\begin{align*}
E(S) &= E(N_I)E(X_I) + E(N_{II})E(X_{II}) \\
&= 12(1/2) + 4(5/2) \\
&= 16 \\
Var(S) &= E(N_I)Var(X_I) + E(X_I)^2 Var(N_I) + E(N_{II})Var(X_{II}) + E(X_{II})^2 Var(N_{II}) \\
&= 12(1/12) + (1/2)^2(12) + 4(25/12) + (5/2)^2(4) \\
&= 37.33
\end{align*}$$

$$\begin{align*}
\Pr(S > 18) &= \Pr\left(Z > \frac{18 - 16}{\sqrt{37.33}} = 0.327\right) \\
&= 1 - \Phi(0.327) \\
&= 0.37
\end{align*}$$

The answer is **A**.
