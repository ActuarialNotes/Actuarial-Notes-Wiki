[[Wiki]] / [[Concepts]] / **Loss Random Variable**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Loss Random Variable"
     data-prev=""
     data-next="Payment Random Variable|Concepts/Payment Random Variable"
     data-objectives="P-1|Probability|6. Univariate Random Variables|Exam P-1 (SOA)">
</div>

# Loss Random Variable

## Definition

A ==Loss Random Variable== $X$ represents the total amount of a loss. $E[X]$ is the expected loss and $\text{Var}(X)$ measures loss variability.

$$ E[X] = \int_0^\infty x \cdot f(x)\,dx, \qquad \text{Var}(X) = E[X^2] - (E[X])^2 $$

> [!example]- <u>Example</u>
> An insurer models losses $X$ with an exponential distribution with mean $\$800$ (i.e., $\lambda = 1/800$).
>
> - $E[X] = 800$
> - $\text{Var}(X) = 800^2 = 640{,}000$
> - $\sigma_X = 800$
>
> $P(X > 1000) = e^{-1000/800} = e^{-1.25} \approx 0.287$
>
> About 28.7% of losses exceed \$1,000.
