---
id: p-042
topic: Univariate Random Variables
subtopic: Expected Value
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - expected-value
  - discrete-distributions
wiki_link: Concepts/Expected+Value
answer: C
points: 1
---

An insurance policy pays 100 per day for up to three days of hospitalization and 50 per day for each day of hospitalization thereafter.

The number of days of hospitalization, $X$, is a discrete random variable with probability function
$$P[X=k] = \begin{cases} \frac{6-k}{15}, & k=1,2,3,4,5 \\ 0, & \text{otherwise.} \end{cases}$$

Determine the expected payment for hospitalization under this policy.

- A) 123
- B) 210
- C) 220
- D) 270
- E) 367

## Explanation

First, calculate the probabilities for $X = 1, 2, 3, 4, 5$:
* $P(1) = 5/15$
* $P(2) = 4/15$
* $P(3) = 3/15$
* $P(4) = 2/15$
* $P(5) = 1/15$

Next, calculate the payment $Y(k)$ for each $k$ days:
* $Y(1) = 100(1) = 100$
* $Y(2) = 100(2) = 200$
* $Y(3) = 100(3) = 300$
* $Y(4) = 100(3) + 50(1) = 350$
* $Y(5) = 100(3) + 50(2) = 400$

The expected payment is:
$$E[Y] = \sum_{k=1}^5 Y(k)P(k) = 100\left(\frac{5}{15}\right) + 200\left(\frac{4}{15}\right) + 300\left(\frac{3}{15}\right) + 350\left(\frac{2}{15}\right) + 400\left(\frac{1}{15}\right)$$
$$= \frac{500 + 800 + 900 + 700 + 400}{15} = \frac{3300}{15} = 220$$
