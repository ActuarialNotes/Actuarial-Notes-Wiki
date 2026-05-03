---
id: p-075
topic: Multivariate Random Variables
subtopic: Variance and Standard Deviation
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - covariance
  - linear-combinations
wiki_link: Concepts/Covariance
answer: C
points: 1
---

An insurance policy pays a total medical benefit consisting of two parts for each claim. Let $X$ represent the part of the benefit that is paid to the surgeon, and let $Y$ represent the part that is paid to the hospital.

The variance of $X$ is 5000, the variance of $Y$ is 10,000, and the variance of the total benefit, $X+Y$ is 17,000.

Due to increasing medical costs, the company that issues the policy decides to increase $X$ by a flat amount of 100 per claim and to increase $Y$ by 10% per claim.

Calculate the variance of the total benefit after these revisions have been made.

- A) 18,200
- B) 18,800
- C) 19,300
- D) 19,520
- E) 20,670

## Explanation

First, find the covariance between $X$ and $Y$:
$$Var(X+Y) = Var(X) + Var(Y) + 2Cov(X,Y)$$
$$17,000 = 5000 + 10,000 + 2Cov(X,Y) \implies 2Cov(X,Y) = 2000 \implies Cov(X,Y) = 1000$$

The new total benefit is $W = (X + 100) + 1.1Y$. The variance of $W$ is:
$$Var(X + 100 + 1.1Y) = Var(X + 1.1Y)$$
$$= Var(X) + Var(1.1Y) + 2Cov(X, 1.1Y)$$
$$= Var(X) + (1.1)^2 Var(Y) + 2(1.1)Cov(X,Y)$$
$$= 5000 + 1.21(10,000) + 2.2(1000)$$
$$= 5000 + 12,100 + 2200 = 19,300$$
