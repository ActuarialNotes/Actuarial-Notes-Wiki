[[Wiki]] / [[Concepts]] / **Negative Binomial**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Negative Binomial"
     data-prev="Hypergeometric|Concepts/Hypergeometric"
     data-next="Poisson|Concepts/Poisson"
     data-objectives="P-1|Probability|Discrete Univariate Distributions|Exam P-1 (SOA)">
</div>

# Negative Binomial

## Definition

The ==Negative Binomial== distribution models the number of trials until the $r$-th success:

$$ P(X=k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}, \qquad E[X] = \frac{r}{p}, \qquad \text{Var}(X) = \frac{r(1-p)}{p^2} $$

> [!example]- <u>Example</u>
> A telemarketer has a $p = 0.10$ chance of making a sale on each call. Let $X$ be the number of calls needed to make $r = 3$ sales.
>
> $X \sim \text{Negative Binomial}(r=3, p=0.10)$
>
> - $E[X] = \frac{3}{0.10} = 30$ calls
> - $\text{Var}(X) = \frac{3(0.90)}{0.01} = 270$
> - $\sigma = \sqrt{270} \approx 16.43$
>
> $P(X = 3) = \binom{2}{2}(0.10)^3(0.90)^0 = 0.001$ (three sales in exactly three calls)
>
> $P(X = 5) = \binom{4}{2}(0.10)^3(0.90)^2 = 6(0.001)(0.81) = 0.00486$
