---
id: p-095
topic: Multivariate Random Variables
subtopic: Conditional Probability
difficulty: hard
type: multiple-choice
tags:
  - exam-p
  - continuous-distributions
  - conditional-expectation
wiki_link: Concepts/Conditional+Probability
answer: B
points: 1
---

A driver and a passenger are in a car accident. Each of them independently has probability 0.3 of being hospitalized.

When a hospitalization occurs, the loss is uniformly distributed on $[0, 1]$. When two hospitalizations occur, the losses are independent.

Calculate the expected number of people in the car who are hospitalized, given that the total loss due to hospitalizations from the accident is less than 1.

- A) 0.510
- B) 0.534
- C) 0.600
- D) 0.628
- E) 0.800

## Explanation

Let $N$ be the number of people hospitalized. $N \sim \text{Binomial}(n=2, p=0.3)$.
* $P[N=0] = (0.7)^2 = 0.49$
* $P[N=1] = 2(0.3)(0.7) = 0.42$
* $P[N=2] = (0.3)^2 = 0.09$

Let $L$ be the total loss. We are given $L < 1$.
If $N=0$, $L=0 < 1$ with probability 1.
If $N=1$, $L \sim U[0, 1]$, so $P[L < 1 \mid N=1] = 1$.
If $N=2$, $L = L_1 + L_2$ where $L_1, L_2 \sim U[0, 1]$. The probability $P[L_1 + L_2 < 1]$ corresponds to the area of a triangle in the unit square, which is $0.5$.

The marginal probability of $L < 1$ is:
$$P[L < 1] = P[L < 1 \mid N=0]P(N=0) + P[L < 1 \mid N=1]P(N=1) + P[L < 1 \mid N=2]P(N=2)$$
$$= 1(0.49) + 1(0.42) + 0.5(0.09) = 0.49 + 0.42 + 0.045 = 0.955$$

We want the conditional expected value of $N$:
$$E[N \mid L < 1] = \frac{0 \cdot P(N=0, L<1) + 1 \cdot P(N=1, L<1) + 2 \cdot P(N=2, L<1)}{P[L < 1]}$$
$$= \frac{0 + 1(0.42) + 2(0.045)}{0.955} = \frac{0.42 + 0.09}{0.955} = \frac{0.51}{0.955} \approx 0.534$$
