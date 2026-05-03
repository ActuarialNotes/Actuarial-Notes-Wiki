---
id: p-083
topic: Multivariate Random Variables
subtopic: Conditional Probability Function
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - discrete-distributions
  - conditional-variance
wiki_link: Concepts/Conditional+Probability+Function
answer: D
points: 1
---

An actuary determines that the annual number of tornadoes in counties P and Q are jointly distributed as follows:

| Annual number of tornadoes in county P | Annual number of tornadoes in county Q: 0 | 1 | 2 | 3 |
| :--- | :--- | :--- | :--- | :--- |
| 0 | 0.12 | 0.06 | 0.05 | 0.02 |
| 1 | 0.13 | 0.15 | 0.12 | 0.03 |
| 2 | 0.05 | 0.15 | 0.10 | 0.02 |

Calculate the conditional variance of the annual number of tornadoes in county Q, given that there are no tornadoes in county P.

- A) 0.51
- B) 0.84
- C) 0.88
- D) 0.99
- E) 1.76

## Explanation

We need the conditional distribution of $Q$ given $P=0$.
$P(P=0) = 0.12 + 0.06 + 0.05 + 0.02 = 0.25$.

The conditional probabilities are:
* $P(Q=0 \mid P=0) = 0.12 / 0.25 = 12/25$
* $P(Q=1 \mid P=0) = 0.06 / 0.25 = 6/25$
* $P(Q=2 \mid P=0) = 0.05 / 0.25 = 5/25$
* $P(Q=3 \mid P=0) = 0.02 / 0.25 = 2/25$

Calculate the conditional mean $E[Q \mid P=0]$:
$$E[Q \mid P=0] = 0(12/25) + 1(6/25) + 2(5/25) + 3(2/25) = \frac{6 + 10 + 6}{25} = \frac{22}{25}$$

Calculate the conditional second moment $E[Q^2 \mid P=0]$:
$$E[Q^2 \mid P=0] = 0^2(12/25) + 1^2(6/25) + 2^2(5/25) + 3^2(2/25) = \frac{6 + 20 + 18}{25} = \frac{44}{25}$$

Calculate the conditional variance:
$$Var(Q \mid P=0) = E[Q^2 \mid P=0] - (E[Q \mid P=0])^2 = \frac{44}{25} - \left(\frac{22}{25}\right)^2 = 1.76 - 0.7744 = 0.9856 \approx 0.99$$
