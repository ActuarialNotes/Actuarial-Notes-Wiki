[[Wiki]] / [[Concepts]] / **Hypergeometric**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Hypergeometric"
     data-prev="Geometric|Concepts/Geometric"
     data-next="Negative Binomial|Concepts/Negative Binomial"
     data-objectives="P-1|Probability|Discrete Univariate Distributions|Exam P-1 (SOA)">
</div>

# Hypergeometric

## Definition

The ==Hypergeometric== distribution models the number of successes in $n$ draws **without replacement** from a population of $N$ items containing $K$ successes:

$$ P(X=k) = \frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}, \qquad E[X] = \frac{nK}{N} $$

> [!example]- <u>Example</u>
> A lot of $N = 20$ items contains $K = 4$ defectives. A sample of $n = 5$ is drawn without replacement. Let $X$ = number of defectives in the sample.
>
> $X \sim \text{Hypergeometric}(N=20, K=4, n=5)$
>
> - $E[X] = \frac{5 \cdot 4}{20} = 1$
>
> $P(X = 0) = \frac{\binom{4}{0}\binom{16}{5}}{\binom{20}{5}} = \frac{1 \cdot 4368}{15504} \approx 0.2817$
>
> $P(X = 1) = \frac{\binom{4}{1}\binom{16}{4}}{\binom{20}{5}} = \frac{4 \cdot 1820}{15504} \approx 0.4696$
>
> $P(X \geq 2) = 1 - 0.2817 - 0.4696 = 0.2487$
