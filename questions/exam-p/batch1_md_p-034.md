---
id: p-034
topic: Univariate Random Variables
subtopic: Conditional Probability
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - continuous-distributions
  - conditional-probability
  - transformations
wiki_link: Concepts/Conditional+Probability
answer: B
points: 1
---

A group insurance policy covers the medical claims of the employees of a small company. The value, $V$, of the claims made in one year is described by $V = 100,000Y$ where $Y$ is a random variable with density function
$$f(y) = \begin{cases} k(1-y)^4, & 0 < y < 1 \\ 0, & \text{otherwise} \end{cases}$$
where $k$ is a constant.

Calculate the conditional probability that $V$ exceeds 40,000, given that $V$ exceeds 10,000.

- A) 0.08
- B) 0.13
- C) 0.17
- D) 0.20
- E) 0.51

## Explanation

To determine $k$:
$$1 = \int_{0}^{1} k(1-y)^4 dy = -\frac{k}{5}(1-y)^5 \Big|_{0}^{1} = \frac{k}{5} \implies k=5$$

We need to find $P[V > 10,000]$ and $P[V > 40,000]$:
$$P[V > 10,000] = P[100,000Y > 10,000] = P[Y > 0.1] = \int_{0.1}^{1} 5(1-y)^4 dy = -(1-y)^5 \Big|_{0.1}^{1} = 0.9^5 = 0.59049$$
$$P[V > 40,000] = P[100,000Y > 40,000] = P[Y > 0.4] = \int_{0.4}^{1} 5(1-y)^4 dy = -(1-y)^5 \Big|_{0.4}^{1} = 0.6^5 = 0.07776$$

The conditional probability is:
$$P[V > 40,000 \mid V > 10,000] = \frac{P[V > 40,000]}{P[V > 10,000]} = \frac{0.07776}{0.59049} \approx 0.1317$$
