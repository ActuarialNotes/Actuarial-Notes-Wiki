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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:37704c8f6075ba9062f3f282942bc6f6673a74452304d951f6ab96ed4cb2720a
  sources: []
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
