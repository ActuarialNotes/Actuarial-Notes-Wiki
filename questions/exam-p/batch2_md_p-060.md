---
id: p-060
topic: Univariate Random Variables
subtopic: Variance and Standard Deviation
difficulty: hard
type: multiple-choice
tags:
  - exam-p
  - poisson-distribution
  - variance
  - policy-limits
wiki_link: Concepts/Standard+Deviation
answer: B
points: 1
---

A baseball team has scheduled its opening game for April 1. If it rains on April 1, the game is postponed and will be played on the next day that it does not rain. The team purchases insurance against rain. The policy will pay 1000 for each day, up to 2 days, that the opening game is postponed.

The insurance company determines that the number of consecutive days of rain beginning on April 1 is a Poisson random variable with mean 0.6.

Calculate the standard deviation of the amount the insurance company will have to pay.

- A) 668
- B) 699
- C) 775
- D) 817
- E) 904

## Explanation

Let $N$ be consecutive days of rain. $N \sim \text{Poisson}(0.6)$.
The payout $Y$ is $1000N$ for $N=0, 1$, and $2000$ for $N \ge 2$.

* $P[N=0] = e^{-0.6} \approx 0.5488$ (Payout: 0)
* $P[N=1] = 0.6e^{-0.6} \approx 0.3293$ (Payout: 1000)
* $P[N \ge 2] = 1 - P[N=0] - P[N=1] = 1 - 0.5488 - 0.3293 = 0.1219$ (Payout: 2000)

$$E[Y] = 0 + 1000(0.3293) + 2000(0.1219) = 329.3 + 243.8 = 573.1$$
$$E[Y^2] = 0 + (1000)^2(0.3293) + (2000)^2(0.1219) = 329,300 + 487,600 = 816,900$$

$$Var(Y) = 816,900 - (573.1)^2 = 816,900 - 328,443.61 = 488,456.39$$
$$SD(Y) = \sqrt{488,456.39} \approx 698.9$$
