[[Wiki]] / [[Concepts]] / **Distribution of Order Statistics**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Distribution of Order Statistics"
     data-prev="multivariate distribution|Concepts/multivariate distribution"
     data-next="independent random variables|Concepts/independent random variables"
     data-objectives="P-1|Probability|Multivariate Random Variables|Exam P-1 (SOA)">
</div>

# Distribution of Order Statistics

## Definition

For $n$ iid random variables with CDF $F$ and PDF $f$, the ==distribution of order statistics== gives the PDF of the $k$-th smallest value $X_{(k)}$:

$$f_{X_{(k)}}(x) = \frac{n!}{(k-1)!(n-k)!}[F(x)]^{k-1}[1-F(x)]^{n-k}f(x)$$

**Minimum (first order statistic):** Setting $k = 1$:

$$f_{X_{(1)}}(x) = n[1-F(x)]^{n-1}f(x)$$

**Maximum (last order statistic):** Setting $k = n$:

$$f_{X_{(n)}}(x) = n[F(x)]^{n-1}f(x)$$

> [!example]- <u>Example</u>
> Let $X_1, X_2, X_3$ be iid $\text{Uniform}(0,1)$ random variables, so $F(x) = x$ and $f(x) = 1$ for $0 < x < 1$.
>
> **PDF of the maximum** $X_{(3)}$:
>
> $$f_{X_{(3)}}(x) = 3[F(x)]^{2}f(x) = 3x^2, \quad 0 < x < 1$$
>
> **PDF of the minimum** $X_{(1)}$:
>
> $$f_{X_{(1)}}(x) = 3[1-F(x)]^{2}f(x) = 3(1-x)^2, \quad 0 < x < 1$$
>
> **Expected value of the maximum:**
>
> $$E[X_{(3)}] = \int_0^1 x \cdot 3x^2\,dx = 3\int_0^1 x^3\,dx = 3 \cdot \frac{1}{4} = \frac{3}{4}$$
