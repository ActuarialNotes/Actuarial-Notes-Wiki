[[Wiki]] / [[Concepts]] / **Lognormal**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Lognormal"
     data-prev="Gamma|Concepts/Gamma"
     data-next="Normal|Concepts/Normal"
     data-objectives="P-1|Probability|Continuous Univariate Distributions|Exam P-1 (SOA)">
</div>

# Lognormal

## Definition

A random variable $X$ has a ==Lognormal== distribution if $\ln(X) \sim N(\mu, \sigma^2)$:

$$ E[X] = e^{\mu + \sigma^2/2}, \qquad \text{Var}(X) = e^{2\mu+\sigma^2}(e^{\sigma^2}-1) $$

> [!example]- <u>Example</u>
> Insurance claim sizes are modeled as $X \sim \text{Lognormal}(\mu = 7, \sigma^2 = 1)$, meaning $\ln(X) \sim N(7, 1)$.
>
> - $E[X] = e^{7 + 0.5} = e^{7.5} \approx \$1{,}808.04$
> - $\text{Var}(X) = e^{14 + 1}(e^1 - 1) = e^{15}(e - 1) \approx 3{,}269{,}017 \times 1.7183 \approx 5{,}617{,}615$
> - $\sigma_X \approx \$2{,}370.15$
>
> The median of $X$ is $e^\mu = e^7 \approx \$1{,}096.63$, which is less than the mean (\$1,808.04), reflecting the right-skewed nature of the lognormal distribution.
>
> $P(X > 3000) = P(\ln X > \ln 3000) = P\!\left(Z > \frac{8.006 - 7}{1}\right) = P(Z > 1.006) \approx 0.157$
