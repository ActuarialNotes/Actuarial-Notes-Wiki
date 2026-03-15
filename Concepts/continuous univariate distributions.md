[[Wiki]] / [[Concepts]] / **continuous univariate distributions**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="continuous univariate distributions"
     data-prev="discrete univariate distributions|Concepts/discrete univariate distributions"
     data-next=""
     data-objectives="P-1|Probability|1. Univariate Random Variables|Exam P-1 (SOA)">
</div>

# continuous univariate distributions

## Definition

==Continuous univariate distributions== are probability distributions for a single continuous random variable. They are characterized by a probability density function (PDF) $f(x)$ where:

$$ P(a \leq X \leq b) = \int_a^b f(x)\,dx $$

The key continuous distributions include: **Beta**, **Exponential**, **Gamma**, **Lognormal**, **Normal**, and **Uniform**.

> [!example]- <u>Example</u>
> Suppose $X$ has PDF $f(x) = 2x$ for $0 \leq x \leq 1$.
>
> Verify it is a valid PDF: $\int_0^1 2x\,dx = [x^2]_0^1 = 1$ ✓ and $f(x) \geq 0$ on $[0,1]$ ✓
>
> $P(0.5 \leq X \leq 0.8) = \int_{0.5}^{0.8} 2x\,dx = [x^2]_{0.5}^{0.8} = 0.64 - 0.25 = 0.39$
>
> $E[X] = \int_0^1 x \cdot 2x\,dx = \int_0^1 2x^2\,dx = \left[\frac{2x^3}{3}\right]_0^1 = \frac{2}{3} \approx 0.667$
