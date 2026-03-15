[[Wiki]] / [[Concepts]] / **Poisson**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Poisson"
     data-prev="Negative Binomial|Concepts/Negative Binomial"
     data-next="Uniform|Concepts/Uniform"
     data-objectives="P-1|Probability|Discrete Univariate Distributions|Exam P-1 (SOA)">
</div>

# Poisson

## Definition

The ==Poisson== distribution models the number of events occurring in a fixed interval with rate $\lambda$:

$$ P(X=k) = \frac{\lambda^k e^{-\lambda}}{k!}, \qquad E[X] = \lambda, \qquad \text{Var}(X) = \lambda $$

> [!example]- <u>Example</u>
> An insurance company receives an average of $\lambda = 3$ claims per day. Let $X$ be the number of claims on a given day.
>
> $X \sim \text{Poisson}(3)$
>
> - $E[X] = 3$, $\text{Var}(X) = 3$, $\sigma = \sqrt{3} \approx 1.732$
>
> $P(X = 0) = \frac{3^0 e^{-3}}{0!} = e^{-3} \approx 0.0498$
>
> $P(X = 2) = \frac{3^2 e^{-3}}{2!} = \frac{9 \cdot 0.0498}{2} \approx 0.2240$
>
> $P(X \geq 5) = 1 - \sum_{k=0}^{4} P(X=k) = 1 - e^{-3}\left(1 + 3 + 4.5 + 4.5 + 3.375\right) \approx 1 - 0.8153 = 0.1847$
