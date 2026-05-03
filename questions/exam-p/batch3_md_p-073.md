---
id: p-073
topic: Multivariate Random Variables
subtopic: Independent Random Variables
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - exponential-distribution
  - independent-variables
wiki_link: Concepts/Independent+Random+Variables
answer: C
points: 1
---

The waiting time for the first claim from a good driver and the waiting time for the first claim from a bad driver are independent and follow exponential distributions with means 6 years and 3 years, respectively.

Calculate the probability that the first claim from a good driver will be filed within 3 years and the first claim from a bad driver will be filed within 2 years.

- A) $\frac{1}{18}(1-e^{-2/3}-e^{-1/2}+e^{-7/6})$
- B) $\frac{1}{18}e^{-7/6}$
- C) $1-e^{-2/3}-e^{-1/2}+e^{-7/6}$
- D) $1-e^{-2/3}-e^{-1/2}+e^{-1/3}$
- E) $1-\frac{1}{3}e^{-2/3}-\frac{1}{6}e^{-1/2}+\frac{1}{18}e^{-7/6}$

## Explanation

Let $T_G$ be the time for the good driver. $T_G \sim \text{Exp}(\lambda_G = 1/6)$.
Let $T_B$ be the time for the bad driver. $T_B \sim \text{Exp}(\lambda_B = 1/3)$.

The probability the good driver files within 3 years is $P[T_G \le 3] = 1 - e^{-3(1/6)} = 1 - e^{-1/2}$.
The probability the bad driver files within 2 years is $P[T_B \le 2] = 1 - e^{-2(1/3)} = 1 - e^{-2/3}$.

Since the events are independent, the joint probability is the product:
$$P[T_G \le 3 \cap T_B \le 2] = P[T_G \le 3] \times P[T_B \le 2]$$
$$= (1 - e^{-1/2})(1 - e^{-2/3}) = 1 - e^{-1/2} - e^{-2/3} + e^{-1/2}e^{-2/3}$$
$$= 1 - e^{-1/2} - e^{-2/3} + e^{-7/6}$$
