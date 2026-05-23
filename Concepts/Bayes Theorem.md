- **Bayes' Theorem** is a formula for reversing conditional probabilities
- Bayes' Theorem updates the prior probability $P(H)$ of a hypothesis to the posterior probability $P(H \mid E)$ after observing evidence $E$.
- $$P(H \mid E) = \frac{P(E \mid H)\P(H)}{P(E)}$$
- The probability of $E$ can be broken down into parts:
- $$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$
- $$H$$ is the hypothesis
- $$E$$ is the observed evidence
- The denominator $P(E)$ is computed via the Law of Total Probability across a partition $\{H_i\}$ of the sample space.
- Bayes' Theorem is central to
  - [[Credibility Theory]]
  - [[Risk Classification]]
  - [[Predictive Modeling]]

> [!example]- Identifying a High-Risk Policyholder After a Claim {Example}
> 20% of policyholders are high-risk ($H$) and 80% are low-risk ($L$). A high-risk policyholder files a claim in year 1 with probability 0.40; a low-risk one with probability 0.10. A randomly selected policyholder files a claim. What is the probability they are high-risk?
>
> > [!answer]- Answer
> > First find $P(\text{claim})$ by the Law of Total Probability:
> > $$P(C) = P(C \mid H)P(H) + P(C \mid L)P(L) = (0.40)(0.20) + (0.10)(0.80) = 0.08 + 0.08 = 0.16$$
> > Now apply Bayes' Theorem:
> > $$P(H \mid C) = \frac{P(C \mid H)\,P(H)}{P(C)} = \frac{0.40 \times 0.20}{0.16} = \frac{0.08}{0.16} = 0.50$$
> > After observing a claim, the probability the policyholder is high-risk rises from 20% to 50%.
