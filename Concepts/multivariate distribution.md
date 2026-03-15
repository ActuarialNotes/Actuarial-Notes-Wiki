[[Wiki]] / [[Concepts]] / **Multivariate Distribution**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Multivariate Distribution"
     data-prev=""
     data-next="distribution of order statistics|Concepts/distribution of order statistics"
     data-objectives="P-1|Probability|Multivariate Random Variables|Exam P-1 (SOA)">
</div>

# Multivariate Distribution

## Definition

A ==multivariate distribution== is a distribution describing the simultaneous behavior of two or more random variables.

**Joint PMF:**

$$p(x,y) = P(X=x, Y=y)$$

**Joint PDF:**

$$f(x,y) \quad \text{where} \quad P((X,Y) \in A) = \iint_A f(x,y)\,dx\,dy$$

**Marginal Distribution:**

$$f_X(x) = \int f(x,y)\,dy$$

> [!example]- <u>Example</u>
> Suppose $X$ and $Y$ have joint PDF $f(x,y) = 6(1-y)$ for $0 < x < y < 1$.
>
> Find the marginal PDF of $X$.
>
> $$f_X(x) = \int_x^1 6(1-y)\,dy = 6\left[(1-y) \cdot (-1)\right]\bigg|_x^1 - 6\int_x^1 (-1)\,dy$$
>
> $$= 6\left[y - \frac{y^2}{2}\right]_x^1 = 6\left[\left(1 - \frac{1}{2}\right) - \left(x - \frac{x^2}{2}\right)\right] = 6\left[\frac{1}{2} - x + \frac{x^2}{2}\right]$$
>
> $$= 3(1 - x)^2, \quad 0 < x < 1$$
