---
id: p-049
topic: Univariate Random Variables
subtopic: Expected Value
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - discrete-distributions
  - deductibles
wiki_link: Concepts/Expected+Value
answer: A
points: 1
---

An insurance company sells a one-year automobile policy with a deductible of 2. The probability that the insured will incur a loss is 0.05. If there is a loss, the probability of a loss of amount $N$ is $K/N$, for $N=1, \dots, 5$ and $K$ a constant. These are the only possible loss amounts and no more than one loss can occur.

Calculate the expected payment for this policy.

- A) 0.031
- B) 0.066
- C) 0.072
- D) 0.110
- E) 0.150

## Explanation

First, determine $K$. Given there is a loss, the probabilities sum to 1:
$$1 = K\left(1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \frac{1}{5}\right) = K\left(\frac{60+30+20+15+12}{60}\right) = K\left(\frac{137}{60}\right)$$
So, $K = \frac{60}{137}$.

The policy has a deductible of 2. The payout $Y$ given a loss $N$ is $\max(0, N-2)$. The expected payment is:
$$E[Y] = 0.05 \sum_{N=1}^{5} \max(0, N-2) P(N)$$
$$= 0.05 \left[ (3-2)P(N=3) + (4-2)P(N=4) + (5-2)P(N=5) \right]$$
$$= 0.05 \left[ 1\left(\frac{K}{3}\right) + 2\left(\frac{K}{4}\right) + 3\left(\frac{K}{5}\right) \right]$$
$$= 0.05 \left( \frac{60}{137} \right) \left[ \frac{1}{3} + \frac{1}{2} + \frac{3}{5} \right] = 0.05 \left( \frac{60}{137} \right) \left( \frac{43}{30} \right) \approx 0.0314$$
