---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:248a95d05c7c532fe5d3e3970fb487a517414d53b6eca09e0377d994edac4a4a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bayesian.md
---

**Bayesian** probability interprets probability as a degree of belief about uncertain propositions, updated as new evidence arrives. This contrasts with the frequentist view, which treats probability as a long-run frequency rather than a belief to be updated.

Starting from a prior $P(H)$ for a hypothesis $H$, the belief after observing evidence $E$, the posterior $P(H \mid E)$, follows from [[Bayes Theorem|Bayes' theorem]] and is

> $$P(H \mid E) = \frac{P(E \mid H)\, P(H)}{P(E)}$$

- $P(E \mid H)$ is the likelihood, the [[Conditional Probability|conditional probability]] of the evidence if $H$ is true.
- $P(E) = \sum_i P(E \mid H_i)\,P(H_i)$ is the marginal probability of the evidence, from the law of total probability over all competing hypotheses $H_i$.

The prior encodes initial belief, and the likelihood reweights it by how well each hypothesis explains the evidence. A hypothesis under which the evidence has probability 0 has posterior probability 0, however large its prior.

> [!example]- What is the probability that a person who tests positive has the disease? {Example}
> A disease affects 1% of the population. A diagnostic test has 95% sensitivity (true positive rate) and a 5% false positive rate. A randomly selected person tests positive.
>
> > [!answer]-
> > - Let $H$ be "has the disease" and $E$ be "tests positive", so $P(H) = 0.01$, $P(E \mid H) = 0.95$ and $P(E \mid H^c) = 0.05$.
> > - The marginal probability of a positive test is $P(E) = 0.95(0.01) + 0.05(0.99) = 0.059$.
> > - The posterior is $P(H \mid E) = 0.95(0.01)/0.059 = 0.161$.
> > - Despite the positive test, there is only about a 16.1% chance the person has the disease, because the disease is rare.
