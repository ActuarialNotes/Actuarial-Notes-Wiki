---
id: p-056
topic: Univariate Random Variables
subtopic: Variance and Standard Deviation
difficulty: hard
type: multiple-choice
tags:
  - exam-p
  - mixed-distributions
  - variance
wiki_link: Concepts/Variance
answer: C
points: 1
---

A random variable $X$ has the cumulative distribution function
$$F(x) = \begin{cases} 0, & x < 1 \\ \frac{x^2 - 2x + 2}{2}, & 1 \le x < 2 \\ 1, & x \ge 2. \end{cases}$$

Calculate the variance of $X$.

- A) 7/72
- B) 1/8
- C) 5/36
- D) 4/3
- E) 23/12

## Explanation

Notice that $F(1) = \frac{1^2 - 2(1) + 2}{2} = \frac{1}{2}$. Since $F(x) = 0$ for $x < 1$, there is a point mass at $x=1$ with probability $0.5$.
For $1 < x < 2$, the density is $f(x) = F'(x) = \frac{2x - 2}{2} = x - 1$.

Calculate the first moment $E[X]$:
$$E[X] = 1 \cdot P(X=1) + \int_{1}^{2} x f(x) dx = 1(0.5) + \int_{1}^{2} x(x-1) dx$$
$$= 0.5 + \left[ \frac{x^3}{3} - \frac{x^2}{2} \right]_{1}^{2} = 0.5 + \left( \left(\frac{8}{3} - 2\right) - \left(\frac{1}{3} - \frac{1}{2}\right) \right) = \frac{1}{2} + \frac{2}{3} + \frac{1}{6} = \frac{4}{3}$$

Calculate the second moment $E[X^2]$:
$$E[X^2] = 1^2(0.5) + \int_{1}^{2} x^2(x-1) dx = 0.5 + \int_{1}^{2} (x^3 - x^2) dx$$
$$= 0.5 + \left[ \frac{x^4}{4} - \frac{x^3}{3} \right]_{1}^{2} = 0.5 + \left( \left(4 - \frac{8}{3}\right) - \left(\frac{1}{4} - \frac{1}{3}\right) \right) = \frac{1}{2} + \frac{4}{3} + \frac{1}{12} = \frac{23}{12}$$

Calculate variance:
$$Var(X) = E[X^2] - (E[X])^2 = \frac{23}{12} - \left(\frac{4}{3}\right)^2 = \frac{23}{12} - \frac{16}{9} = \frac{69 - 64}{36} = \frac{5}{36}$$
