---
id: p-076
topic: Multivariate Random Variables
subtopic: Variance and Standard Deviation
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - discrete-distributions
  - marginal-distribution
wiki_link: Concepts/Marginal+Distribution
answer: B
points: 1
---

A car dealership sells 0, 1, or 2 luxury cars on any day. When selling a car, the dealer also tries to persuade the customer to buy an extended warranty for the car. Let $X$ denote the number of luxury cars sold in a given day, and let $Y$ denote the number of extended warranties sold.

$$P[X=0, Y=0] = 1/6$$
$$P[X=1, Y=0] = 1/12$$
$$P[X=1, Y=1] = 1/6$$
$$P[X=2, Y=0] = 1/12$$
$$P[X=2, Y=1] = 1/3$$
$$P[X=2, Y=2] = 1/6$$

Calculate the variance of $X$.

- A) 0.47
- B) 0.58
- C) 0.83
- D) 1.42
- E) 2.58

## Explanation

First, find the marginal probability distribution of $X$ by summing the probabilities over all values of $Y$:
* $P[X=0] = P[X=0, Y=0] = 1/6$
* $P[X=1] = P[X=1, Y=0] + P[X=1, Y=1] = 1/12 + 1/6 = 3/12 = 1/4$
* $P[X=2] = P[X=2, Y=0] + P[X=2, Y=1] + P[X=2, Y=2] = 1/12 + 1/3 + 1/6 = 1/12 + 4/12 + 2/12 = 7/12$

Calculate the first moment $E[X]$:
$$E[X] = 0(1/6) + 1(3/12) + 2(7/12) = 0 + 3/12 + 14/12 = 17/12$$

Calculate the second moment $E[X^2]$:
$$E[X^2] = 0^2(1/6) + 1^2(3/12) + 2^2(7/12) = 0 + 3/12 + 28/12 = 31/12$$

Calculate the variance $Var(X)$:
$$Var(X) = E[X^2] - (E[X])^2 = \frac{31}{12} - \left(\frac{17}{12}\right)^2 = \frac{372}{144} - \frac{289}{144} = \frac{83}{144} \approx 0.5764$$
