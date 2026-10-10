---
id: "masi-an-011"
exam: "Exam MAS-I"
topic: "Mixing Distribution"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Mixing+Distribution
  - Concepts/Mixed+Poisson+Process
  - Concepts/Poisson+Distribution
  - Concepts/Bayes+Theorem
  - Concepts/Posterior+Distribution
answer: "0.1421"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:5e91c129cc29f8c3bbb575628f41fcccc7a1444f7aa3aba76258ad2283b036ee
  sources:
    - "Mahler & Dean, \"Credibility\", ch.8 of Foundations of Casualty Actuarial Science (SOA study note C-21-01), 4.2 Bayesian analysis, two-type example: posterior probability of each type = prior x likelihood / total, posterior mean frequency, PDF p.81, sha256:bccdb7968ae276e041bf7f6eb5aea3aea473f1dc7739bc64352419c8a6a0f3c5 — https://www.soa.org/globalassets/assets/files/edu/C-21-01.pdf"
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008), MAS-I reading, Mixing Method, Fact 1.17 and Example 1.18 (Poisson with a discrete random mean), PDF pp.10-11, sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-011.md
---

In a motor portfolio, 80% of drivers have a Poisson claim rate of 0.1 per year and 20% have a rate of 0.6 per year. Each driver's rate is fixed over time. A driver selected at random has had no claims in each of the past 2 years.

Calculate the driver's expected number of claims next year. Give your answer as a decimal to four decimal places.

## Explanation

The two-point mixing distribution is the prior; two claim-free years update it. Given rate $\lambda$, the probability of no claims in 2 years is $e^{-2\lambda}$:

$$
\begin{align*}
\text{Low:}\quad 0.8\,e^{-0.2} &= 0.8(0.81873) = 0.65498 \\
\text{High:}\quad 0.2\,e^{-1.2} &= 0.2(0.30119) = 0.06024 \\
\text{Total} &= 0.71522
\end{align*}
$$

The posterior probabilities are $P(\text{low}) = 0.65498/0.71522 = 0.91578$ and $P(\text{high}) = 0.08422$, so

$$
\begin{align*}
E[\Lambda \mid \text{no claims in 2 years}] &= 0.91578(0.1) + 0.08422(0.6) \\
&= \mathbf{0.1421}
\end{align*}
$$

Two clean years cut the chance that this driver is high-risk from 20% to about 8.4%.

**Common wrong entries**

- **0.2000** is the prior mean, ignoring the driver's history.
- **0.1658** updates on only one claim-free year, using $e^{-\lambda}$ in place of $e^{-2\lambda}$.
- **0.1016** forgets to divide by the total probability 0.71522, so the posterior weights do not sum to 1.
- **0.1235** uses $(1 - \lambda)$ as the probability of a claim-free year; under a Poisson rate it is $e^{-\lambda}$.
