[[Wiki]] / [[Concepts]] / **variance**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="variance"
     data-prev="expected value|Concepts/expected value"
     data-next="standard deviation|Concepts/standard deviation"
     data-objectives="P-1|Probability|4. Univariate Random Variables|Exam P-1 (SOA)">
</div>

# variance

## Definition

The ==variance== of a random variable $X$ measures the spread of its distribution around the mean:

$$ \text{Var}(X) = E[(X - \mu)^2] = E[X^2] - (E[X])^2 $$

> [!example]- <u>Example</u>
> Using the distribution from the expected value page:
>
> | $x$ | 1 | 2 | 3 | 4 |
> |---|---|---|---|---|
> | $P(X=x)$ | 0.1 | 0.3 | 0.4 | 0.2 |
>
> We found $E[X] = 2.7$ and $E[X^2] = 8.1$.
>
> $\text{Var}(X) = E[X^2] - (E[X])^2 = 8.1 - (2.7)^2 = 8.1 - 7.29 = 0.81$
