[[Wiki]] / [[Concepts]] / **expected value**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="expected value"
     data-prev=""
     data-next="variance|Concepts/variance"
     data-objectives="P-1|Probability|3. Univariate Random Variables|Exam P-1 (SOA)">
</div>

# expected value

## Definition

The ==expected value== (also called the mean or first moment) of a random variable $X$ is:

$$ E[X] = \sum_x x \cdot P(X=x) \quad \text{(discrete)}, \qquad E[X] = \int_{-\infty}^{\infty} x \cdot f(x)\,dx \quad \text{(continuous)} $$

> [!example]- <u>Example</u>
> A discrete random variable $X$ has the following distribution:
>
> | $x$ | 1 | 2 | 3 | 4 |
> |---|---|---|---|---|
> | $P(X=x)$ | 0.1 | 0.3 | 0.4 | 0.2 |
>
> $E[X] = 1(0.1) + 2(0.3) + 3(0.4) + 4(0.2) = 0.1 + 0.6 + 1.2 + 0.8 = 2.7$
>
> Also, $E[X^2] = 1^2(0.1) + 2^2(0.3) + 3^2(0.4) + 4^2(0.2) = 0.1 + 1.2 + 3.6 + 3.2 = 8.1$
