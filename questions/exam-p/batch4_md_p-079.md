---
id: p-079
topic: Multivariate Random Variables
subtopic: Distribution of Order Statistics
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - order-statistics
  - independent-variables
  - exponential-distribution
wiki_link: Concepts/Order+Statistics
answer: E
points: 1
---

In a small metropolitan area, annual losses due to storm, fire, and theft are assumed to be mutually independent, exponentially distributed random variables with respective means 1.0, 1.5, and 2.4.

Calculate the probability that the maximum of these losses exceeds 3.

- A) 0.002
- B) 0.050
- C) 0.159
- D) 0.287
- E) 0.414

## Explanation

Let $S, F,$ and $T$ be the losses due to storm, fire, and theft respectively.
The cumulative distribution functions are:
* $P[S \le s] = 1 - e^{-s/1.0}$
* $P[F \le f] = 1 - e^{-f/1.5}$
* $P[T \le t] = 1 - e^{-t/2.4}$

Let $Y = \max(S, F, T)$. We want $P[Y > 3]$.
$P[Y \le 3]$ is the probability that *all* three losses are less than or equal to 3. Because they are independent, this is the product of their individual probabilities:
$$P[Y \le 3] = P[S \le 3] P[F \le 3] P[T \le 3]$$
$$= (1 - e^{-3/1.0})(1 - e^{-3/1.5})(1 - e^{-3/2.4})$$
$$= (1 - e^{-3})(1 - e^{-2})(1 - e^{-1.25})$$
$$= (1 - 0.0498)(1 - 0.1353)(1 - 0.2865) = (0.9502)(0.8647)(0.7135) \approx 0.5861$$

Therefore, the required probability is:
$$P[Y > 3] = 1 - P[Y \le 3] = 1 - 0.5861 = 0.4139 \approx 0.414$$
