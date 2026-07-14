**Probability Theory** is the mathematical framework for quantifying uncertainty. A probability measure $P$ assigns to each [[Event]] in a [[Sample Space]] $S$ a number in $[0, 1]$ satisfying Kolmogorov's three axioms: non-negativity, normalization, and countable additivity.

> $$P(E) \ge 0$$

> $$P(S) = 1$$

> $$P\!\left(\bigcup_{i=1}^{\infty} E_i\right) = \sum_{i=1}^{\infty} P(E_i)$$

- The domain $\mathcal{F}$ is the event algebra — the collection of subsets of $S$ to which probabilities are assigned.
- Countable additivity applies only to [[Mutually Exclusive Events|mutually exclusive]] events $E_i$.
- Every other rule — the complement rule, addition rule, and [[Conditional Probability]] — is derived from these axioms.
- It provides the foundation for statistics, actuarial science, and stochastic modeling.

> [!example]- Verifying Probability Axioms for a Die Roll {Example}
> A fair six-sided die is rolled, so $S = \{1, 2, 3, 4, 5, 6\}$ with each outcome having probability $\tfrac{1}{6}$. What is the probability of rolling a number greater than 4?
>
> > [!answer]-
> > The event $E = \{5, 6\}$ consists of two mutually exclusive outcomes, so by countable additivity:
> > $$P(E) = P(\{5\}) + P(\{6\}) = \frac{1}{6} + \frac{1}{6} = \frac{1}{3}$$
> > As a check, $P(E) + P(E^c) = \frac{1}{3} + \frac{2}{3} = 1 = P(S)$, consistent with the axioms.
