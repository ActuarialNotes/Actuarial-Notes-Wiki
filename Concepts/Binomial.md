[[Wiki]] / [[Concepts]] / **Binomial**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Binomial"
     data-prev=""
     data-next="Geometric|Concepts/Geometric"
     data-objectives="P-1|Probability|Discrete Univariate Distributions|Exam P-1 (SOA)">
</div>

# Binomial

## Definition

The ==Binomial== distribution counts the number of successes in $n$ independent Bernoulli trials, each with success probability $p$:

$$ P(X=k) = \binom{n}{k}p^k(1-p)^{n-k}, \qquad E[X] = np, \qquad \text{Var}(X) = np(1-p) $$

> [!example]- <u>Example</u>
> An insurer issues $n = 10$ independent policies, each with a $p = 0.05$ probability of a claim. Let $X$ be the number of claims.
>
> $X \sim \text{Binomial}(10, 0.05)$
>
> - $E[X] = 10(0.05) = 0.5$
> - $\text{Var}(X) = 10(0.05)(0.95) = 0.475$
> - $P(X = 0) = \binom{10}{0}(0.05)^0(0.95)^{10} = (0.95)^{10} \approx 0.5987$
> - $P(X = 1) = \binom{10}{1}(0.05)^1(0.95)^9 = 10(0.05)(0.6302) \approx 0.3151$
> - $P(X \geq 2) = 1 - 0.5987 - 0.3151 = 0.0862$
