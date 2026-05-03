---
id: p-052
topic: Univariate Random Variables
subtopic: Expected Value
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - continuous-distributions
  - expected-value
wiki_link: Concepts/Expected+Value
answer: C
points: 1
---

An insurance company's monthly claims are modeled by a continuous, positive random variable $X$, whose probability density function is proportional to $(1+x)^{-4}$, for $0 < x < \infty$.

Calculate the company's expected monthly claims.

- A) 1/6
- B) 1/3
- C) 1/2
- D) 1
- E) 3

## Explanation

First, find the constant $k$ such that $f(x) = k(1+x)^{-4}$ integrates to 1 over $[0, \infty)$.
$$1 = \int_{0}^{\infty} k(1+x)^{-4} dx = \left[ -\frac{k}{3}(1+x)^{-3} \right]_0^{\infty} = \frac{k}{3} \implies k = 3$$
So $f(x) = 3(1+x)^{-4}$.

The expected value is:
$$E[X] = \int_{0}^{\infty} x \cdot 3(1+x)^{-4} dx$$
Let $u = 1+x$, then $x = u-1$ and $dx = du$. The bounds change from $0 \to \infty$ to $1 \to \infty$.
$$E[X] = \int_{1}^{\infty} 3(u-1)u^{-4} du = \int_{1}^{\infty} (3u^{-3} - 3u^{-4}) du$$
$$= \left[ -\frac{3}{2}u^{-2} + u^{-3} \right]_1^{\infty} = 0 - \left( -\frac{3}{2} + 1 \right) = \frac{1}{2}$$
