[[Wiki]] / [[Concepts]] / **Normal**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Normal"
     data-prev="Lognormal|Concepts/Lognormal"
     data-next=""
     data-objectives="P-1|Probability|Continuous Univariate Distributions|Exam P-1 (SOA)">
</div>

# Normal

## Definition

The ==Normal== (Gaussian) distribution is the most important continuous distribution. The **standard normal** is obtained via $Z = (X - \mu)/\sigma$. The **68-95-99.7 rule** states that approximately 68%, 95%, and 99.7% of values fall within 1, 2, and 3 standard deviations of the mean.

$$ f(x) = \frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/(2\sigma^2)}, \qquad E[X] = \mu, \qquad \text{Var}(X) = \sigma^2 $$

> [!example]- <u>Example</u>
> Annual losses for a company are $X \sim N(\mu = 50{,}000, \sigma^2 = 100{,}000{,}000)$, so $\sigma = 10{,}000$.
>
> Standardize: $Z = \frac{X - 50{,}000}{10{,}000}$
>
> $P(X > 65{,}000) = P\!\left(Z > \frac{65000 - 50000}{10000}\right) = P(Z > 1.5) \approx 0.0668$
>
> $P(30{,}000 < X < 70{,}000) = P(-2 < Z < 2) \approx 0.9544$
>
> By the 68-95-99.7 rule:
> - 68% of losses fall in $[40{,}000,\; 60{,}000]$
> - 95% of losses fall in $[30{,}000,\; 70{,}000]$
> - 99.7% of losses fall in $[20{,}000,\; 80{,}000]$
