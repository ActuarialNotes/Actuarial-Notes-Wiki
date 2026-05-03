---
id: p-092
topic: General Probability
subtopic: Probability Rules
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - probability-rules
wiki_link: Concepts/Probability
answer: C
points: 1
---

A mattress store sells only king, queen and twin-size mattresses. Sales records at the store indicate that the number of queen-size mattresses sold is one-fourth the number of king and twin-size mattresses combined. Records also indicate that three times as many king-size mattresses are sold as twin-size mattresses.

Calculate the probability that the next mattress sold is either king or queen-size.

- A) 0.12
- B) 0.15
- C) 0.80
- D) 0.85
- E) 0.95

## Explanation

Let $k, q, t$ be the relative frequencies (probabilities) of selling a king, queen, or twin mattress, respectively.
We know $k + q + t = 1$.

From the problem:
1) $q = \frac{1}{4}(k + t)$
2) $k = 3t$

Substitute (2) into (1):
$$q = \frac{1}{4}(3t + t) = \frac{1}{4}(4t) = t$$

Now substitute into the total probability equation:
$$3t + t + t = 1 \implies 5t = 1 \implies t = 0.2$$
Then $q = 0.2$ and $k = 0.6$.

The probability the next mattress is either king or queen is $k + q = 0.6 + 0.2 = 0.80$.
