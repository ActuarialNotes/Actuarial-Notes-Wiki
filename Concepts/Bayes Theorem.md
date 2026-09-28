---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:f56a785366ae7c1d0b9670139fea89f4772dfc6ad6ef2a417c169dbab0a55245
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.1 (p.139, PDF p.147), Bayes formula and eqs. (4.2)-(4.3) (pp.145-146, PDF pp.153-154), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability, learning outcome 1g (PDF p.2), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bayes Theorem.md
---

**Bayes' Theorem** is a formula for reversing conditional probabilities, updating the prior probability $P(H)$ of a hypothesis to the posterior probability $P(H \mid E)$ after observing evidence $E$.
- The denominator $P(E)$ is computed via [[The Law of Total Probability]] across a partition $\{H_i\}$ of the sample space:

> $$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$

> $$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$

- $H$ is the hypothesis and $E$ is the observed evidence
- If $H$ and $E$ are independent (with $P(E) > 0$), observing $E$ leaves the prior unchanged: $P(H \mid E) = P(H)$
- See also [[Bayesian Credibility]]

![[Media/Figures/Bayes_Theorem.svg|340]]

> [!example]- Identifying a High-Risk Policyholder After a Claim {Example}
> 20% of policyholders are high-risk ($H$) and 80% are low-risk ($L$). A high-risk policyholder files a claim in year 1 with probability 0.40; a low-risk one with probability 0.10. A randomly selected policyholder files a claim. What is the probability they are high-risk?
>
> > [!answer]-
> > First find $P(\text{claim})$ by the Law of Total Probability:
> > $$P(C) = P(C \mid H)P(H) + P(C \mid L)P(L) = (0.40)(0.20) + (0.10)(0.80) = 0.08 + 0.08 = 0.16$$
> > Now apply Bayes' Theorem:
> > $$P(H \mid C) = \frac{P(C \mid H)\,P(H)}{P(C)} = \frac{0.40 \times 0.20}{0.16} = \frac{0.08}{0.16} = 0.50$$
> > After observing a claim, the probability the policyholder is high-risk rises from 20% to 50%.
