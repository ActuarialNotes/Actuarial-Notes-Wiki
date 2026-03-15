[[Wiki]] / [[Concepts]] / **Beta**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Beta"
     data-prev=""
     data-next="Exponential|Concepts/Exponential"
     data-objectives="P-1|Probability|Continuous Univariate Distributions|Exam P-1 (SOA)">
</div>

# Beta

## Definition

The ==Beta== distribution is defined on $[0, 1]$ with shape parameters $\alpha > 0$ and $\beta > 0$:

$$ f(x) = \frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)}, \qquad E[X] = \frac{\alpha}{\alpha+\beta}, \qquad \text{Var}(X) = \frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)} $$

> [!example]- <u>Example</u>
> An actuary models the probability of default for a bond portfolio using $X \sim \text{Beta}(\alpha=2, \beta=5)$.
>
> - $E[X] = \frac{2}{2+5} = \frac{2}{7} \approx 0.2857$
> - $\text{Var}(X) = \frac{2 \cdot 5}{(7)^2(8)} = \frac{10}{392} \approx 0.0255$
> - $\sigma = \sqrt{0.0255} \approx 0.1597$
>
> The mode (for $\alpha, \beta > 1$) is $\frac{\alpha - 1}{\alpha + \beta - 2} = \frac{1}{5} = 0.20$.
>
> The distribution is right-skewed, with most of the probability mass below 0.5, which is appropriate for modeling default rates.
