[[Wiki]] / [[Concepts]] / **Uniform**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Uniform"
     data-prev="Poisson|Concepts/Poisson"
     data-next=""
     data-objectives="P-1|Probability|Discrete Univariate Distributions|Exam P-1 (SOA)">
</div>

# Uniform

## Definition (Discrete)

The ==discrete Uniform== distribution assigns equal probability to each of $n$ values:

$$ P(X=k) = \frac{1}{n} \quad \text{for } k \in \{a, a+1, \ldots, b\}, \qquad E[X] = \frac{a+b}{2} $$

## Definition (Continuous)

The ==continuous Uniform== distribution has constant density on the interval $[a, b]$:

$$ f(x) = \frac{1}{b-a} \quad \text{for } x \in [a, b], \qquad E[X] = \frac{a+b}{2}, \qquad \text{Var}(X) = \frac{(b-a)^2}{12} $$

> [!example]- <u>Example</u>
> **Discrete**: A fair six-sided die has $X \sim \text{Uniform}\{1,2,3,4,5,6\}$.
> - $P(X = k) = 1/6$ for each $k$
> - $E[X] = (1+6)/2 = 3.5$
> - $\text{Var}(X) = \frac{(6-1+1)^2 - 1}{12} = \frac{35}{12} \approx 2.917$
>
> **Continuous**: Losses $X$ are uniform on $[0, 1000]$.
> - $E[X] = (0 + 1000)/2 = 500$
> - $\text{Var}(X) = (1000 - 0)^2/12 = 83{,}333.33$
> - $\sigma = \sqrt{83333.33} \approx 288.68$
> - $P(200 \leq X \leq 700) = \frac{700 - 200}{1000} = 0.5$
