[[Wiki]] / [[Concepts]] / **Independent Random Variables**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Independent Random Variables"
     data-prev="distribution of order statistics|Concepts/distribution of order statistics"
     data-next=""
     data-objectives="P-1|Probability|Multivariate Random Variables|Exam P-1 (SOA)">
</div>

# Independent Random Variables

## Definition

Random variables $X$ and $Y$ are ==independent random variables== iff:

$$f_{X,Y}(x,y) = f_X(x) \cdot f_Y(y) \quad \text{for all } x, y$$

Equivalently:

$$F_{X,Y}(x,y) = F_X(x) \cdot F_Y(y)$$

**Key properties for independent variables:**

$$E[XY] = E[X]E[Y]$$

$$\text{Var}(X+Y) = \text{Var}(X) + \text{Var}(Y)$$

> [!example]- <u>Example</u>
> Suppose $X$ and $Y$ are independent with $E[X] = 3$, $E[Y] = 5$, $\text{Var}(X) = 2$, and $\text{Var}(Y) = 4$.
>
> Find $E[XY]$ and $\text{Var}(X + Y)$.
>
> Since $X$ and $Y$ are independent:
>
> $$E[XY] = E[X]E[Y] = 3 \cdot 5 = 15$$
>
> $$\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) = 2 + 4 = 6$$
