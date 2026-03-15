[[Wiki]] / [[Concepts]] / **Geometric**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Geometric"
     data-prev="Binomial|Concepts/Binomial"
     data-next="Hypergeometric|Concepts/Hypergeometric"
     data-objectives="P-1|Probability|Discrete Univariate Distributions|Exam P-1 (SOA)">
</div>

# Geometric

## Definition

The ==Geometric== distribution models the number of trials until the first success. It has the memoryless property: $P(X > s+t \mid X > s) = P(X > t)$.

$$ P(X=k) = (1-p)^{k-1}p, \qquad E[X] = \frac{1}{p}, \qquad \text{Var}(X) = \frac{1-p}{p^2} $$

> [!example]- <u>Example</u>
> A fair die is rolled repeatedly until a six appears. Let $X$ be the number of rolls needed ($p = 1/6$).
>
> $X \sim \text{Geometric}(1/6)$
>
> - $E[X] = \frac{1}{1/6} = 6$ rolls on average
> - $\text{Var}(X) = \frac{5/6}{(1/6)^2} = \frac{5/6}{1/36} = 30$
> - $P(X = 1) = \frac{1}{6} \approx 0.1667$
> - $P(X = 4) = (5/6)^3(1/6) = \frac{125}{1296} \approx 0.0965$
> - $P(X > 6) = (5/6)^6 \approx 0.3349$
>
> Memoryless property: Given you have rolled 10 times without a six, the expected number of additional rolls is still 6.
