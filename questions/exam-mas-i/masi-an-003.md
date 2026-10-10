---
id: "masi-an-003"
exam: "Exam MAS-I"
topic: "Frequency"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Frequency
  - Concepts/Poisson+Process
  - Concepts/Poisson+Distribution
  - Concepts/Earned+Exposure
  - Concepts/Poisson+Superposition
answer: "0.1048"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c35fe336da8241b05542eb26511ce48d8fbf566f2d687eb2354f614756edd6a4
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008), MAS-I reading, Def. & Properties 1.1 (Poisson pmf), PDF p.4; Fact 1.15 (sum of independent Poisson processes is Poisson, rates add), PDF p.9; Fact 1.25 (mean = rate x length), PDF p.13, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-003.md
---

A fleet's claims occur as a Poisson process at a frequency of 0.12 claims per vehicle-year, independently across vehicles. The fleet has 50 vehicles from January 1 to June 30 and 150 vehicles from July 1 to December 31.

Calculate the probability that the fleet has exactly 10 claims during the year. Give your answer as a decimal to four decimal places.

## Explanation

Frequency is per unit of exposure, so the expected count is the frequency times the vehicle-years actually earned:

$$
\begin{align*}
\text{Exposure} &= 50(0.5) + 150(0.5) \\
&= 100 \text{ vehicle-years} \\
E[N] &= 0.12 \times 100 \\
&= 12
\end{align*}
$$

The independent vehicles' Poisson processes superpose into one Poisson process, so $N \sim \text{Poisson}(12)$:

$$
\begin{align*}
P(N = 10) &= \frac{e^{-12}\,12^{10}}{10!} \\
&= \mathbf{0.1048}
\end{align*}
$$

**Common wrong entries**

- **0.0150** uses the year-end fleet of 150 vehicles for the whole year, a mean of 18.
- **0.0007** adds the two fleet sizes as if 200 vehicles were exposed all year, a mean of 24.
- **0.0413** uses the starting fleet of 50 vehicles for the whole year, a mean of 6.
