---
id: p-066
topic: Multivariate Random Variables
subtopic: Linear Combinations of Random Variables
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - normal-distribution
  - sample-mean
wiki_link: Concepts/Linear+Combinations+of+Random+Variables
answer: C
points: 1
---

Claims filed under auto insurance policies follow a normal distribution with mean 19,400 and standard deviation 5,000.

Calculate the probability that the average of 25 randomly selected claims exceeds 20,000.

- A) 0.01
- B) 0.15
- C) 0.27
- D) 0.33
- E) 0.45

## Explanation

Let $\bar{X}$ be the average of 25 claims. Since individual claims are normally distributed, $\bar{X}$ is exactly normally distributed.

Mean of $\bar{X}$: $\mu_{\bar{X}} = \mu = 19,400$
Standard deviation of $\bar{X}$: $\sigma_{\bar{X}} = \frac{\sigma}{\sqrt{n}} = \frac{5000}{\sqrt{25}} = \frac{5000}{5} = 1000$

We want to find $P(\bar{X} > 20,000)$:
$$P(\bar{X} > 20,000) = P\left(Z > \frac{20,000 - 19,400}{1000}\right) = P(Z > 0.6)$$

From standard normal tables, $P(Z \le 0.6) = 0.7257$.
So, $P(Z > 0.6) = 1 - 0.7257 = 0.2743 \approx 0.27$.
