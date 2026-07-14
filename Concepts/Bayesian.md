**Bayesian** probability interprets probability as a degree of belief about uncertain propositions, updated as new evidence arrives. Starting from a prior $P(H)$ for a hypothesis $H$ and evidence $E$ with likelihood $P(E \mid H)$, [[Bayes Theorem]] yields the posterior $P(H \mid E)$.

> $$P(H \mid E) = \frac{P(E \mid H)\, P(H)}{P(E)}$$

- The denominator $P(E) = \sum_i P(E \mid H_i)\,P(H_i)$ is the marginal probability of the evidence, from the law of total probability over all competing hypotheses.
- The prior encodes initial belief; the [[Conditional Probability|likelihood]] reweights it by how well each hypothesis explains the evidence.
- This contrasts with the frequentist view, which treats probability as a long-run frequency rather than a belief to be updated.

> [!example]- Updating Disease Probability After a Positive Test {Example}
> A disease affects 1% of the population. A diagnostic test has 95% sensitivity (true positive rate) and a 5% false positive rate. A randomly selected person tests positive. What is the probability they actually have the disease?
>
> > [!answer]-
> > Let $H$ = has the disease and $E$ = tests positive, so $P(H) = 0.01$, $P(E \mid H) = 0.95$, $P(E \mid H^c) = 0.05$. First find the marginal probability of a positive test:
> > $$\begin{align*} P(E) &= P(E \mid H)P(H) + P(E \mid H^c)P(H^c) \\ &= 0.95(0.01) + 0.05(0.99) \\ &= 0.059 \end{align*}$$
> > Then apply Bayes' theorem:
> > $$\begin{align*} P(H \mid E) &= \frac{P(E \mid H)\,P(H)}{P(E)} \\ &= \frac{0.95(0.01)}{0.059} \\ &\approx 0.161 \end{align*}$$
> > Despite the positive test, there is only about a 16.1% chance the person has the disease, because the disease is rare.
