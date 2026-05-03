---
id: p-078
topic: Multivariate Random Variables
subtopic: Independent Random Variables
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - exponential-distribution
  - variance
wiki_link: Concepts/Independent+Random+Variables
answer: E
points: 1
---

A company has two electric generators. The time until failure for each generator follows an exponential distribution with mean 10. The company will begin using the second generator immediately after the first one fails.

Calculate the variance of the total time that the generators produce electricity.

- A) 10
- B) 20
- C) 50
- D) 100
- E) 200

## Explanation

Let $X$ and $Y$ denote the times that the first and second generators can operate, respectively. 
The total time is $T = X + Y$.

For an exponential distribution, the variance is the square of the mean. 
Thus, $Var(X) = 10^2 = 100$ and $Var(Y) = 10^2 = 100$.

Because the lifetimes of the generators are independent, the variance of the sum is the sum of their variances:
$$Var(T) = Var(X + Y) = Var(X) + Var(Y) = 100 + 100 = 200$$
