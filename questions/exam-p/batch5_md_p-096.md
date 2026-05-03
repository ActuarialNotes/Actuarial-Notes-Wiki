---
id: p-096
topic: Univariate Random Variables
subtopic: Discrete Univariate Distributions
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - negative-binomial-distribution
  - mode
wiki_link: Concepts/Negative+Binomial+Distribution
answer: B
points: 1
---

Each time a hurricane arrives, a new home has a 0.4 probability of experiencing damage. The occurrences of damage in different hurricanes are mutually independent.

Calculate the mode of the number of hurricanes it takes for the home to experience damage from two hurricanes.

- A) 2
- B) 3
- C) 4
- D) 5
- E) 6

## Explanation

Let $X$ equal the number of hurricanes it takes for two losses to occur.
Then $X$ is negative binomial with "success" probability $p=0.4$ and $r=2$ "successes" needed.
$$P[X=n] = \binom{n-1}{r-1} p^r (1-p)^{n-r} = \binom{n-1}{1} (0.4)^2 (0.6)^{n-2} = (n-1)(0.16)(0.6)^{n-2}$$

We test the first few values for $n \ge 2$:
* $P[X=2] = (1)(0.16)(0.6)^0 = 0.16$
* $P[X=3] = (2)(0.16)(0.6)^1 = 0.192$
* $P[X=4] = (3)(0.16)(0.6)^2 = 0.1728$
* $P[X=5] = (4)(0.16)(0.6)^3 = 0.13824$

The probability is maximized at $n=3$. The mode is 3.
