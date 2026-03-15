[[Wiki]] / [[Concepts]] / **Gamma**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Gamma"
     data-prev="Exponential|Concepts/Exponential"
     data-next="Lognormal|Concepts/Lognormal"
     data-objectives="P-1|Probability|Continuous Univariate Distributions|Exam P-1 (SOA)">
</div>

# Gamma

## Definition

The ==Gamma== distribution generalizes the Exponential distribution. The Exponential is the special case $\alpha = 1$.

$$ f(x) = \frac{\lambda^\alpha x^{\alpha-1}e^{-\lambda x}}{\Gamma(\alpha)} \text{ for } x > 0, \qquad E[X] = \frac{\alpha}{\lambda}, \qquad \text{Var}(X) = \frac{\alpha}{\lambda^2} $$

> [!example]- <u>Example</u>
> Total annual claims for a small portfolio follow a Gamma distribution with $\alpha = 3$ and $\lambda = 0.002$ (in dollars).
>
> - $E[X] = \frac{3}{0.002} = \$1{,}500$
> - $\text{Var}(X) = \frac{3}{(0.002)^2} = 750{,}000$
> - $\sigma = \sqrt{750{,}000} \approx \$866.03$
>
> Note: A $\text{Gamma}(3, \lambda)$ distribution is equivalent to the sum of 3 independent $\text{Exponential}(\lambda)$ random variables. If individual claims average $\$500$ each and 3 claims are expected, the total averages $\$1{,}500$.
