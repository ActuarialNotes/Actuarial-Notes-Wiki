---
id: p-080
topic: Multivariate Random Variables
subtopic: Covariance and Correlation
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - covariance
  - variance
wiki_link: Concepts/Covariance
answer: A
points: 1
---

Let $X$ denote the size of a surgical claim and let $Y$ denote the size of the associated hospital claim. An actuary is using a model in which
$$E[X] = 5, \quad E[X^2] = 27.4, \quad E[Y] = 7, \quad E[Y^2] = 51.4, \quad Var(X+Y) = 8.$$

Let $C_1 = X + Y$ denote the size of the combined claims before the application of a 20% surcharge on the hospital portion of the claim, and let $C_2$ denote the size of the combined claims after the application of that surcharge.

Calculate $Cov(C_1, C_2)$.

- A) 8.80
- B) 9.60
- C) 9.76
- D) 11.52
- E) 12.32

## Explanation

First, obtain the variances of $X$ and $Y$:
$$Var(X) = E[X^2] - (E[X])^2 = 27.4 - 25 = 2.4$$
$$Var(Y) = E[Y^2] - (E[Y])^2 = 51.4 - 49 = 2.4$$

Using $Var(X+Y) = Var(X) + Var(Y) + 2Cov(X,Y)$:
$$8 = 2.4 + 2.4 + 2Cov(X,Y) \implies 2Cov(X,Y) = 3.2 \implies Cov(X,Y) = 1.6$$

The combined claims are $C_1 = X + Y$ and $C_2 = X + 1.2Y$. We need $Cov(C_1, C_2)$:
$$Cov(C_1, C_2) = Cov(X + Y, X + 1.2Y)$$
By bilinearity of covariance:
$$= Cov(X,X) + 1.2Cov(X,Y) + Cov(Y,X) + 1.2Cov(Y,Y)$$
$$= Var(X) + 2.2Cov(X,Y) + 1.2Var(Y)$$
$$= 2.4 + 2.2(1.6) + 1.2(2.4) = 2.4 + 3.52 + 2.88 = 8.80$$
