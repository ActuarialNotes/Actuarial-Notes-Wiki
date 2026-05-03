---
id: p-084
topic: Multivariate Random Variables
subtopic: Law of Total Probability
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - conditional-probability
  - exponential-distribution
  - law-of-total-probability
wiki_link: Concepts/The+Law+of+Total+Probability
answer: C
points: 1
---

You are given the following information about $N$, the annual number of claims for a randomly selected insured:
$$P(N=0) = \frac{1}{2}, \quad P(N=1) = \frac{1}{3}, \quad P(N>1) = \frac{1}{6}$$

Let $S$ denote the total annual claim amount for an insured. When $N=1$, $S$ is exponentially distributed with mean 5. When $N>1$, $S$ is exponentially distributed with mean 8.

Calculate $P(4 < S < 8)$.

- A) 0.04
- B) 0.08
- C) 0.12
- D) 0.24
- E) 0.25

## Explanation

From the Law of Total Probability:
$$P(4 < S < 8) = P(4 < S < 8 \mid N=0)P(N=0) + P(4 < S < 8 \mid N=1)P(N=1) + P(4 < S < 8 \mid N>1)P(N>1)$$

If $N=0$, the claim amount $S$ is exactly 0. Thus $P(4 < S < 8 \mid N=0) = 0$.

If $N=1$, $S \sim \text{Exp}(\lambda = 1/5)$:
$$P(4 < S < 8 \mid N=1) = \int_4^8 \frac{1}{5}e^{-s/5} ds = e^{-4/5} - e^{-8/5}$$

If $N>1$, $S \sim \text{Exp}(\lambda = 1/8)$:
$$P(4 < S < 8 \mid N>1) = \int_4^8 \frac{1}{8}e^{-s/8} ds = e^{-4/8} - e^{-8/8} = e^{-1/2} - e^{-1}$$

So:
$$P(4 < S < 8) = 0\left(\frac{1}{2}\right) + (e^{-0.8} - e^{-1.6})\left(\frac{1}{3}\right) + (e^{-0.5} - e^{-1})\left(\frac{1}{6}\right)$$
$$= \frac{0.4493 - 0.2019}{3} + \frac{0.6065 - 0.3679}{6} = \frac{0.2474}{3} + \frac{0.2386}{6}$$
$$= 0.0825 + 0.0398 = 0.1223 \approx 0.12$$
