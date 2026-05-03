---
id: p-067
topic: Multivariate Random Variables
subtopic: Central Limit Theorem
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - poisson-distribution
  - central-limit-theorem
wiki_link: Concepts/Central+Limit+Theorem
answer: B
points: 1
---

An insurance company issues 1250 vision care insurance policies. The number of claims filed by a policyholder under a vision care insurance policy during one year is a Poisson random variable with mean 2. Assume the numbers of claims filed by different policyholders are mutually independent.

Calculate the approximate probability that there is a total of between 2450 and 2600 claims during a one-year period.

- A) 0.68
- B) 0.82
- C) 0.87
- D) 0.95
- E) 1.00

## Explanation

Let $S$ be the total number of claims. The sum of 1250 independent Poisson random variables with mean 2 is a Poisson random variable with mean $1250 \times 2 = 2500$.

For a Poisson distribution, the variance equals the mean. So, $\mu_S = 2500$ and $\sigma_S^2 = 2500$, which gives $\sigma_S = \sqrt{2500} = 50$.

Using the normal approximation to the Poisson (continuity correction is generally not required for such large numbers unless specified, though it barely changes the result):
$$P(2450 \le S \le 2600) \approx P\left(\frac{2450 - 2500}{50} \le Z \le \frac{2600 - 2500}{50}\right)$$
$$= P(-1 \le Z \le 2) = P(Z \le 2) - P(Z \le -1)$$

From the standard normal table:
$P(Z \le 2) = 0.9772$
$P(Z \le -1) = 1 - P(Z \le 1) = 1 - 0.8413 = 0.1587$

$P(-1 \le Z \le 2) = 0.9772 - 0.1587 = 0.8185 \approx 0.82$.
