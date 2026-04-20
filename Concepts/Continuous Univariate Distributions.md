$$P(a \leq X \leq b) = \int_a^b f(x)\, dx$$

A Continuous Univariate Distribution describes the probability law of a single random variable $X$ that can take any value in a continuous interval (or union of intervals).

The probability density function (PDF) $f(x)$ must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)\,dx = 1$. Individual point probabilities are zero; all probabilities are computed as areas under $f$.

> [!example]- Finding a Probability from a PDF {💡 Example}
> A random variable $X$ has PDF $f(x) = 3x^2$ for $0 < x < 1$. Find $P(0.5 < X < 1)$.
>
> > [!answer]- Answer
> > $$P(0.5 < X < 1) = \int_{0.5}^{1} 3x^2\, dx = \left[x^3\right]_{0.5}^{1} = 1 - (0.5)^3 = 1 - 0.125 = 0.875$$
