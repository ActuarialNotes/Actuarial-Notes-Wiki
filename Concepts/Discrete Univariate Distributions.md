$$P(X = k) = f(k), \quad k \in \{x_1, x_2, \ldots\}$$

A Discrete Univariate Distribution describes the probability law of a single random variable $X$ that takes on a countable (finite or countably infinite) set of values.

The probability mass function (PMF) $f(k) = P(X = k)$ must satisfy $f(k) \geq 0$ for all $k$ and $\sum_{k} f(k) = 1$. The cumulative distribution function is $F(x) = P(X \leq x) = \sum_{k \leq x} f(k)$.

> [!example]- PMF Verification for a Simple Discrete Distribution {💡 Example}
> A random variable $X$ has PMF $f(k) = c \cdot k$ for $k = 1, 2, 3, 4$. Find $c$ and compute $P(X \leq 3)$.
>
> > [!answer]- Answer
> > For $f$ to be a valid PMF we need $\sum_{k=1}^{4} c \cdot k = 1$, so
> > $$c(1 + 2 + 3 + 4) = 10c = 1 \implies c = \frac{1}{10}$$
> > Then
> > $$P(X \leq 3) = F(3) = \frac{1}{10}(1+2+3) = \frac{6}{10} = 0.6$$
