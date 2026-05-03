---
id: p-090
topic: Univariate Random Variables
subtopic: Discrete Univariate Distributions
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - hypergeometric-distribution
wiki_link: Concepts/Hypergeometric+Distribution
answer: C
points: 1
---

A store has 80 modems in its inventory, 30 coming from Source A and the remainder from Source B. Of the modems in inventory from Source A, 20% are defective. Of the modems in inventory from Source B, 8% are defective.

Calculate the probability that exactly two out of a sample of five modems selected without replacement from the store's inventory are defective.

- A) 0.010
- B) 0.078
- C) 0.102
- D) 0.105
- E) 0.125

## Explanation

First, find the total number of defective modems in the inventory.
Source A has 30 modems. Defective from A: $30 \times 0.20 = 6$.
Source B has $80 - 30 = 50$ modems. Defective from B: $50 \times 0.08 = 4$.
Total defective modems = $6 + 4 = 10$.
Total non-defective modems = $80 - 10 = 70$.

We are selecting 5 modems without replacement from a population of 80 where 10 are defective and 70 are non-defective. This follows a hypergeometric distribution.
The probability of getting exactly 2 defective modems is:
$$P(X=2) = \frac{\binom{10}{2} \binom{70}{3}}{\binom{80}{5}} = \frac{45 \times 54740}{24040016} = \frac{2463300}{24040016} \approx 0.10247$$
