[[Wiki]] / [[Concepts]] / **discrete univariate distributions**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="discrete univariate distributions"
     data-prev=""
     data-next="continuous univariate distributions|Concepts/continuous univariate distributions"
     data-objectives="P-1|Probability|1. Univariate Random Variables|Exam P-1 (SOA)">
</div>

# discrete univariate distributions

## Definition

==Discrete univariate distributions== are probability distributions for a single discrete random variable, where the set of possible values is countable. They are characterized by a probability mass function (PMF):

$$ p(x) = P(X = x) $$

The key discrete distributions include: **Binomial**, **Geometric**, **Hypergeometric**, **Negative Binomial**, **Poisson**, and **Uniform**.

> [!example]- <u>Example</u>
> Suppose $X$ is discrete with PMF:
> - $P(X = 1) = 0.2$, $P(X = 2) = 0.5$, $P(X = 3) = 0.3$
>
> Verify it is a valid PMF: $0.2 + 0.5 + 0.3 = 1.0$ ✓ and all probabilities are non-negative ✓
>
> $P(X \leq 2) = P(X=1) + P(X=2) = 0.2 + 0.5 = 0.7$
>
> $E[X] = 1(0.2) + 2(0.5) + 3(0.3) = 0.2 + 1.0 + 0.9 = 2.1$
