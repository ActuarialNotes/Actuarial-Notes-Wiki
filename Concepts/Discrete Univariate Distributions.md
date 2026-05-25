A **Discrete Univariate Distribution** describes the probability law of a single [[Random Variable]] $X$ that takes on a countable set of values.
- The probability mass function (PMF) $f(k)$ specifies the probability that the variable takes a particular distinct value $k$
- The PMF must satisfy $f(k) \geq 0$ for all $k$ and $\sum_{k} f(k) = 1$:

> $$P(X = k) = f(k), \quad k \in \{x_1, x_2, \ldots\}$$

- The cumulative distribution function (CDF) specifies the probability that the variable is at most $x$:

> $$F(x) = P(X \leq x) = \sum_{k \leq x} f(k)$$

> [!example]- PMF Verification for a Simple Discrete Distribution {Example}
> A random variable $X$ has PMF $f(k) = c \cdot k$ for $k = 1, 2, 3, 4$. Find $c$ and compute $P(X \leq 3)$.
>
> > [!answer]-
> > For $f$ to be a valid PMF we need $\sum_{k=1}^{4} c \cdot k = 1$, so
> > $$c(1 + 2 + 3 + 4) = 10c = 1 \implies c = \frac{1}{10}$$
> > Then
> > $$P(X \leq 3) = F(3) = \frac{1}{10}(1+2+3) = \frac{6}{10} = 0.6$$
