---
id: p-085
topic: Univariate Random Variables
subtopic: Discrete Univariate Distributions
difficulty: hard
type: multiple-choice
tags:
  - exam-p
  - arithmetic-progression
  - discrete-distributions
wiki_link: Concepts/Discrete+Univariate+Distributions
answer: C
points: 1
---

Under an insurance policy, a maximum of five claims may be filed per year by a policyholder. Let $p(n)$ be the probability that a policyholder files $n$ claims during a given year, where $n = 0, 1, 2, 3, 4, 5$.

An actuary makes the following observations:
i) $p(n) \ge p(n+1)$ for $n = 0, 1, 2, 3, 4$
ii) The difference between $p(n)$ and $p(n+1)$ is the same for $n = 0, 1, 2, 3, 4$
iii) Exactly 40% of policyholders file fewer than two claims during a given year.

Calculate the probability that a random policyholder will file more than three claims during a given year.

- A) 0.14
- B) 0.16
- C) 0.27
- D) 0.29
- E) 0.33

## Explanation

Due to the equal spacing of probabilities (observation ii), $p(n)$ is an arithmetic progression: $p(n) = p(0) - nc$ for some constant $c \ge 0$ and $n=0,1,2,3,4,5$.

From observation iii:
$$P(N < 2) = p(0) + p(1) = 0.40$$
$$p(0) + (p(0) - c) = 0.40 \implies 2p(0) - c = 0.40$$

The sum of all probabilities must equal 1:
$$1 = \sum_{n=0}^5 p(n) = p(0) + (p(0)-c) + (p(0)-2c) + (p(0)-3c) + (p(0)-4c) + (p(0)-5c)$$
$$1 = 6p(0) - 15c$$

We have a system of two equations:
1) $2p(0) - c = 0.4 \implies c = 2p(0) - 0.4$
2) $6p(0) - 15c = 1$

Substitute (1) into (2):
$$6p(0) - 15(2p(0) - 0.4) = 1$$
$$6p(0) - 30p(0) + 6 = 1 \implies -24p(0) = -5 \implies p(0) = \frac{5}{24}$$
Then $c = 2\left(\frac{5}{24}\right) - \frac{2}{5} = \frac{10}{24} - \frac{2}{5} = \frac{50 - 48}{120} = \frac{2}{120} = \frac{1}{60}$.

The probability of more than three claims is $p(4) + p(5)$:
$$p(4) = p(0) - 4c = \frac{25}{120} - \frac{8}{120} = \frac{17}{120}$$
$$p(5) = p(0) - 5c = \frac{25}{120} - \frac{10}{120} = \frac{15}{120}$$
$$P(N > 3) = p(4) + p(5) = \frac{17}{120} + \frac{15}{120} = \frac{32}{120} = \frac{4}{15} \approx 0.267$$
