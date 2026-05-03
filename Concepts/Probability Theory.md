$$ P: \mathcal{F} \to [0, 1], \quad P(S) = 1, \quad P(E) \geq 0, \quad P\!\left(\bigcup_{i=1}^{\infty} E_i\right) = \sum_{i=1}^{\infty} P(E_i) $$

==Probability Theory== is the mathematical framework for quantifying uncertainty. A probability measure $P$ is defined on a sample space $S$ and its event algebra $\mathcal{F}$, satisfying Kolmogorov's three axioms: non-negativity, normalization ($P(S) = 1$), and countable additivity for mutually exclusive events. From these axioms all other rules of probability—including the complement rule, addition rule, and conditional probability—can be derived. Probability theory provides the foundation for statistics, actuarial science, and stochastic modeling.

> [!example]- Verifying Probability Axioms for a Simple Experiment {💡 Example}
> A fair six-sided die is rolled. The sample space is $S = \{1, 2, 3, 4, 5, 6\}$, each outcome equally likely with probability $\frac{1}{6}$. What is the probability of rolling a number greater than 4?
>
> > [!answer]- Answer
> > The event $E = \{5, 6\}$ consists of two mutually exclusive outcomes. By countable additivity:
> > $$ P(E) = P(\{5\}) + P(\{6\}) = \frac{1}{6} + \frac{1}{6} = \frac{2}{6} = \frac{1}{3} $$
> > We can verify: $P(E) + P(E^c) = \frac{1}{3} + \frac{2}{3} = 1 = P(S)$, consistent with the axioms.
