---
id: p-071
topic: Multivariate Random Variables
subtopic: Central Limit Theorem
difficulty: hard
type: multiple-choice
tags:
  - exam-p
  - conditional-probability
  - central-limit-theorem
wiki_link: Concepts/Central+Limit+Theorem
answer: E
points: 1
---

A city has just added 100 new female recruits to its police force. The city will provide a pension to each new hire who remains with the force until retirement. In addition, if the new hire is married at the time of her retirement, a second pension will be provided for her husband.

A consulting actuary makes the following assumptions:
(i) Each new recruit has a 0.4 probability of remaining with the police force until retirement.
(ii) Given that a new recruit reaches retirement with the police force, the probability that she is not married at the time of retirement is 0.25.
(iii) The events of different new hires reaching retirement and the events of different new hires being married at retirement are all mutually independent events.

Calculate the probability that the city will provide at most 90 pensions to the 100 new hires and their husbands.

- A) 0.60
- B) 0.67
- C) 0.75
- D) 0.93
- E) 0.99

## Explanation

For a single recruit, let $Y$ be the number of pensions provided. $Y$ can take values 0, 1, or 2.
* $P(Y=0) = P(\text{does not reach retirement}) = 1 - 0.4 = 0.6$
* $P(Y=1) = P(\text{reaches retirement and not married}) = 0.4 \times 0.25 = 0.1$
* $P(Y=2) = P(\text{reaches retirement and married}) = 0.4 \times (1 - 0.25) = 0.3$

The expected value and variance for a single recruit:
$$E[Y] = 0(0.6) + 1(0.1) + 2(0.3) = 0.7$$
$$E[Y^2] = 0^2(0.6) + 1^2(0.1) + 2^2(0.3) = 0.1 + 1.2 = 1.3$$
$$Var(Y) = 1.3 - (0.7)^2 = 1.3 - 0.49 = 0.81$$

For 100 recruits, the total pensions $S$ is approximately normal:
$$\mu_S = 100(0.7) = 70$$
$$\sigma_S^2 = 100(0.81) = 81 \implies \sigma_S = 9$$

We want the probability of at most 90 pensions. Using the continuity correction, we calculate $P(S < 90.5)$:
$$P(S < 90.5) = P\left(Z < \frac{90.5 - 70}{9}\right) = P(Z < 2.278)$$
From normal tables, $P(Z < 2.28) \approx 0.9887$, which rounds to 0.99.
