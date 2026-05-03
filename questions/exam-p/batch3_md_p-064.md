---
id: p-064
topic: Multivariate Random Variables
subtopic: Distribution of Order Statistics
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - order-statistics
  - expected-value
wiki_link: Concepts/Order+Statistics
answer: A
points: 1
---

Claim amounts for wind damage to insured homes are mutually independent random variables with common density function
$$f(x) = \begin{cases} \frac{3}{x^4}, & x > 1 \\ 0, & \text{otherwise,} \end{cases}$$
where $x$ is the amount of a claim in thousands.

Suppose 3 such claims will be made.

Calculate the expected value of the largest of the three claims.

- A) 2025
- B) 2700
- C) 3232
- D) 3375
- E) 4500

## Explanation

The cumulative distribution function of a single claim $X$ is:
$$F(x) = \int_{1}^{x} \frac{3}{t^4} dt = \left[ -\frac{1}{t^3} \right]_1^x = 1 - x^{-3}, \quad x > 1$$

Let $Y = \max(X_1, X_2, X_3)$. The CDF of $Y$ is:
$$G(y) = (P[X \le y])^3 = (1 - y^{-3})^3$$

The density function of $Y$ is:
$$g(y) = G'(y) = 3(1 - y^{-3})^2(3y^{-4}) = 9y^{-4}(1 - 2y^{-3} + y^{-6}) = 9(y^{-4} - 2y^{-7} + y^{-10})$$

The expected value of $Y$ is:
$$E[Y] = \int_{1}^{\infty} y g(y) dy = 9 \int_{1}^{\infty} (y^{-3} - 2y^{-6} + y^{-9}) dy$$
$$= 9 \left[ \frac{y^{-2}}{-2} - \frac{2y^{-5}}{-5} + \frac{y^{-8}}{-8} \right]_1^{\infty} = 9 \left( 0 - \left( -\frac{1}{2} + \frac{2}{5} - \frac{1}{8} \right) \right)$$
$$= 9 \left( \frac{1}{2} - \frac{2}{5} + \frac{1}{8} \right) = 9 \left( \frac{20 - 16 + 5}{40} \right) = 9 \left( \frac{9}{40} \right) = \frac{81}{40} = 2.025$$

Since $x$ is in thousands, the expected value is $2.025 \times 1000 = 2025$.
