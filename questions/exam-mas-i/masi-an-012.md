---
id: "masi-an-012"
exam: "Exam MAS-I"
topic: "Mixing Distribution"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Mixing+Distribution
  - Concepts/Mixed+Poisson+Process
  - Concepts/Gamma
  - Concepts/Posterior+Distribution
  - Concepts/Bayesian+Credibility
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:37704c8f6075ba9062f3f282942bc6f6673a74452304d951f6ab96ed4cb2720a
  sources:
    - "Mahler & Dean, \"Credibility\", ch.8 of Foundations of Casualty Actuarial Science (SOA study note C-21-01), 5.3 conjugate priors: gamma posterior alpha+C, lambda+Y; posterior mean (alpha+C)/(lambda+Y), PDF pp.101-102, sha256:bccdb7968ae276e041bf7f6eb5aea3aea473f1dc7739bc64352419c8a6a0f3c5 — https://www.soa.org/globalassets/assets/files/edu/C-21-01.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-012.md
---

Annual claim rates across a portfolio follow a gamma distribution with $\alpha = 2$ and $\theta = 0.1$, so the mean rate is 0.2. Given its rate, each insured's claims follow a Poisson process.

- Insured A has had 1 claim in 1 year.
- Insured B has had 2 claims in 4 years.

Calculate the posterior mean of each insured's claim rate.

- A) A: 0.273; B: 0.227
- B) A: 0.273; B: 0.286
- C) A: 0.300; B: 0.400
- D) A: 0.467; B: 0.400
- E) A: 1.000; B: 0.500

## Explanation

With a gamma mixing distribution, $n$ claims in $t$ years give a gamma posterior with shape $\alpha + n$ and scale $\theta/(1 + \theta t)$, so

$$
E[\Lambda \mid n, t] = \frac{\alpha + n}{1/\theta + t}
$$

$$
\begin{align*}
\text{A:}\quad \frac{2 + 1}{10 + 1} &= 0.273 \\
\text{B:}\quad \frac{2 + 2}{10 + 4} &= 0.286
\end{align*}
$$

The answer is **B**. Insured B ends up with the higher estimate even though its observed rate (0.5 a year) is half of A's (1.0). As a credibility weighting, $Z = t/(t + 1/\theta)$: A's single year earns $Z = 1/11$, B's four years earn $Z = 4/14$. More exposure, not a higher raw rate, decides how far the posterior moves from the prior mean of 0.2.

**Why not the others**

- **A** treats B's 2 claims in 4 years as one year with 0.5 claims, $(2 + 0.5)/(10 + 1) = 0.227$, discarding three years of exposure.
- **C** updates the shape but not the scale, $(\alpha + n)\theta$, so it ignores how long each insured was observed.
- **D** uses $\alpha$ in place of $\theta^{-1}$ in the credibility factor, $Z = t/(t + \alpha)$, giving far too much weight to the data.
- **E** uses the raw observed rates, giving the data full credibility and ignoring the mixing distribution.
