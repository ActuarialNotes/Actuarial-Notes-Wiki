$$ P(H \mid E) = \frac{P(E \mid H)\, P(H)}{P(E)} $$

==Bayesian== probability interprets probability as a degree of belief about uncertain propositions, updated in light of new evidence. Starting from a prior probability $P(H)$ representing initial belief in hypothesis $H$, and observing evidence $E$ with likelihood $P(E \mid H)$, Bayes' theorem yields the posterior probability $P(H \mid E)$. The denominator $P(E) = \sum_i P(E \mid H_i) P(H_i)$ is the marginal probability of the evidence, computed by the law of total probability over all competing hypotheses.

> [!example]- Updating Disease Probability After a Positive Test {💡 Example}
> A disease affects 1% of the population. A diagnostic test has a 95% sensitivity (true positive rate) and a 5% false positive rate. A randomly selected person tests positive. What is the probability they actually have the disease?
>
> > [!answer]- Answer
> > Let $H$ = has the disease and $E$ = tests positive. The given information is:
> > $$ P(H) = 0.01, \quad P(E \mid H) = 0.95, \quad P(E \mid H^c) = 0.05 $$
> > First compute the marginal probability of a positive test:
> > $$ P(E) = P(E \mid H)P(H) + P(E \mid H^c)P(H^c) = 0.95 \times 0.01 + 0.05 \times 0.99 = 0.0095 + 0.0495 = 0.059 $$
> > Then apply Bayes' theorem:
> > $$ P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)} = \frac{0.95 \times 0.01}{0.059} = \frac{0.0095}{0.059} \approx 0.161 $$
> > Despite the positive test, there is only about a 16.1% chance the person has the disease, because the disease is rare.
