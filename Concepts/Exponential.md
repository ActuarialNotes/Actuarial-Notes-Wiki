[[Wiki]] / [[Concepts]] / **Exponential**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Exponential"
     data-prev="Beta|Concepts/Beta"
     data-next="Gamma|Concepts/Gamma"
     data-objectives="P-1|Probability|Continuous Univariate Distributions|Exam P-1 (SOA)">
</div>

# Exponential

## Definition

The ==Exponential== distribution models waiting times between events. It has the **memoryless property**: $P(X > s+t \mid X > s) = P(X > t)$.

$$ f(x) = \lambda e^{-\lambda x} \text{ for } x \geq 0, \qquad E[X] = \frac{1}{\lambda}, \qquad \text{Var}(X) = \frac{1}{\lambda^2} $$

> [!example]- <u>Example</u>
> Claims arrive at a rate of $\lambda = 0.5$ per hour, so the time between claims is $X \sim \text{Exponential}(0.5)$.
>
> - $E[X] = 1/0.5 = 2$ hours
> - $\text{Var}(X) = 1/0.25 = 4$, $\sigma = 2$ hours
>
> $P(X > 3) = e^{-0.5 \cdot 3} = e^{-1.5} \approx 0.2231$
>
> $P(1 \leq X \leq 4) = e^{-0.5} - e^{-2} = 0.6065 - 0.1353 = 0.4712$
>
> **Memoryless**: If 2 hours have passed with no claim, the probability of waiting at least 1 more hour is still $P(X > 1) = e^{-0.5} \approx 0.6065$.
