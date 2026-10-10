---
id: "masi-an-002"
exam: "Exam MAS-I"
topic: "Frequency"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Frequency
  - Concepts/Poisson+Process
  - Concepts/Poisson+Distribution
  - Concepts/Earned+Exposure
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:ad4e6817b17d5c890ba189e41652afa6ebbebf98bbee8d9fcf8fcc0da14fbde4
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008), MAS-I reading, Def. & Properties 1.1 (Poisson E[M]=Var[M]=Lambda), PDF p.4; Fact 1.25 (increment over length h is Poisson with mean lambda*h), PDF p.13, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-002.md
---

Claims on a commercial auto book occur as a Poisson process at a rate of 0.06 claims per vehicle-year, independently across vehicles. Next year the book grows from 5,000 to 10,000 vehicle-years, and the rate per vehicle-year does not change.

Let $F$ be the observed claim frequency for a year: the number of claims divided by the vehicle-years. Compared with this year, how do the mean and the variance of $F$ change next year?

- A) The mean doubles and the variance doubles
- B) The mean doubles and the variance is unchanged
- C) The mean is unchanged and the variance doubles
- D) The mean is unchanged and the variance is unchanged
- E) The mean is unchanged and the variance halves

## Explanation

With $E$ vehicle-years, the claim count is $N \sim \text{Poisson}(\lambda E)$ and $F = N/E$:

$$
\begin{align*}
E[F] &= \frac{\lambda E}{E} \\
&= \lambda \\
\text{Var}(F) &= \frac{\lambda E}{E^2} \\
&= \frac{\lambda}{E}
\end{align*}
$$

The mean frequency stays at 0.06. The variance falls from $\text{Var}(F) = 0.06/5{,}000 = 1.2 \times 10^{-5}$ to $\text{Var}(F) = 0.06/10{,}000 = 6 \times 10^{-6}$, so it **halves**. The answer is **E**: more exposure makes the observed frequency a more precise estimate of the same rate.

**Why not the others**

- **A** describes the claim *count* $N$, whose mean and variance both double; frequency divides the count by exposure.
- **B** also treats frequency as if it grew with exposure, which it does not, since frequency is measured per vehicle-year.
- **C** divides the count's variance by $E$ instead of $E^2$; scaling a random variable by $E^{-1}$ scales its variance by $E^{-2}$.
- **D** keeps the right mean but forgets that a larger book averages out more of the Poisson noise.
