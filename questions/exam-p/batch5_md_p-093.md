---
id: p-093
topic: Multivariate Random Variables
subtopic: Variance and Standard Deviation
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - poisson-distribution
  - uniform-distribution
  - conditional-variance
wiki_link: Concepts/Variance
answer: E
points: 1
---

The number of workplace injuries, $N$, occurring in a factory on any given day is Poisson distributed with mean $\lambda$. The parameter $\lambda$ is a random variable that is determined by the level of activity in the factory, and is uniformly distributed on the interval $[0, 3]$.

Calculate $Var(N)$.

- A) $\lambda$
- B) $2\lambda$
- C) 0.75
- D) 1.50
- E) 2.25

## Explanation

We use the Law of Total Variance:
$$Var(N) = E[Var(N \mid \lambda)] + Var(E[N \mid \lambda])$$

Since $N \mid \lambda$ is Poisson with parameter $\lambda$:
$$E[N \mid \lambda] = \lambda$$
$$Var(N \mid \lambda) = \lambda$$

So:
$$Var(N) = E[\lambda] + Var(\lambda)$$

Since $\lambda \sim \text{Uniform}[0, 3]$:
$$E[\lambda] = \frac{0 + 3}{2} = 1.5$$
$$Var(\lambda) = \frac{(3 - 0)^2}{12} = \frac{9}{12} = 0.75$$

$$Var(N) = 1.5 + 0.75 = 2.25$$
