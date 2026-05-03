---
id: p-077
topic: Multivariate Random Variables
subtopic: Linear Combinations of Random Variables
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - independent-variables
  - variance
wiki_link: Concepts/Linear+Combinations+of+Random+Variables
answer: D
points: 1
---

The profit for a new product is given by $Z = 3X - Y - 5$. $X$ and $Y$ are independent random variables with $Var(X) = 1$ and $Var(Y) = 2$.

Calculate $Var(Z)$.

- A) 1
- B) 5
- C) 7
- D) 11
- E) 16

## Explanation

Because $X$ and $Y$ are independent random variables, $Cov(X,Y) = 0$.
The variance of a linear combination $aX + bY + c$ is given by $a^2 Var(X) + b^2 Var(Y) + 2ab Cov(X,Y)$.

$$Var(Z) = Var(3X - Y - 5)$$
$$= 3^2 Var(X) + (-1)^2 Var(Y)$$
$$= 9(1) + 1(2) = 9 + 2 = 11$$
