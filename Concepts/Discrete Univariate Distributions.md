A **Discrete Univariate Distribution** describes the probability law of a single [[Random Variable]] $X$ that takes on a countable set of values.
- The probability mass function (PMF) $f(k)$ specifies the probability that the variable takes a particular distinct value $k$
- The PMF must satisfy $f(k) \geq 0$ for all $k$ and $\sum_{k} f(k) = 1$:

> $$P(X = k) = f(k), \quad k \in \{x_1, x_2, \ldots\}$$

- The cumulative distribution function (CDF) specifies the probability that the variable is at most $x$:

> $$F(x) = P(X \leq x)$$

> $$= \sum_{k \leq x} f(k)$$

## Choosing the right one

Most of the difficulty is identification, not computation. Read the question for **what is being counted** and **whether the trial count is fixed**:

- Successes in a **fixed** number of independent trials → [[Binomial Distribution]] $(n,p)$, with $E[X] = np$
- Successes in a **fixed** number of draws taken **without replacement** from a finite pool → [[Hypergeometric Distribution]] $(N,K,n)$, with $E[X] = nK/N$
- **Trials until** the first success, the trial count not fixed in advance → [[Geometric Distribution]] $(p)$, with $E[X] = 1/p$
- **Trials until** the $r$-th success → [[Negative Binomial Distribution]] $(r,p)$, with $E[X] = r/p$
- Events occurring over a fixed interval of **time or space**, with no trial count at all → [[Poisson Distribution]] $(\lambda)$, with $E[X] = \lambda$
- One of $n$ equally likely outcomes → [[Uniform Discrete|Discrete Uniform]], with $E[X] = (n+1)/2$

- **Binomial vs. hypergeometric** turns entirely on replacement. When the population is large relative to the sample the two nearly agree, and the binomial is the intended shortcut.
- **Binomial vs. Poisson**: a fixed number of trials points to binomial; "per year", "per hour", "per 100 policies" with no trial count points to Poisson.
- The **variance-to-mean ratio** is a fast identification check: it is $< 1$ for binomial, $= 1$ for Poisson, and $> 1$ for negative binomial.
- For "at least one", reach for the complement $1 - P(X=0)$ rather than summing the tail.

> [!example]- PMF Verification for a Simple Discrete Distribution {Example}
> A random variable $X$ has PMF $f(k) = c \cdot k$ for $k = 1, 2, 3, 4$. Find $c$ and compute $P(X \leq 3)$.
>
> > [!answer]-
> > For $f$ to be a valid PMF we need $\sum_{k=1}^{4} c \cdot k = 1$, so
> > $$c(1 + 2 + 3 + 4) = 10c = 1 \implies c = \frac{1}{10}$$
> > Then
> > $$P(X \leq 3) = F(3) = \frac{1}{10}(1+2+3) = \frac{6}{10} = 0.6$$
