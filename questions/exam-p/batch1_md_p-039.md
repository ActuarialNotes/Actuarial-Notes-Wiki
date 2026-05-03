---
id: p-039
topic: Multivariate Random Variables
subtopic: Independent Random Variables
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - binomial-distribution
  - mutually-exclusive
wiki_link: Concepts/Independent+Random+Variables
answer: E
points: 1
---

A study is being conducted in which the health of two independent groups of ten policyholders is being monitored over a one-year period of time. Individual participants in the study drop out before the end of the study with probability 0.2 (independently of the other participants).

Calculate the probability that at least nine participants complete the study in one of the two groups, but not in both groups.

- A) 0.096
- B) 0.192
- C) 0.235
- D) 0.376
- E) 0.469

## Explanation

The number completing the study in a single group is binomial ($n=10, p=0.8$).
For a single group, the probability that at least nine complete the study is:
$$P = \binom{10}{9}(0.8)^9(0.2)^1 + \binom{10}{10}(0.8)^{10}(0.2)^0 = 10(0.1342)(0.2) + 0.1074 = 0.2684 + 0.1074 = 0.3758$$

Let this probability be $P \approx 0.376$. We want the probability that this happens for exactly one group out of the two. This is a binomial probability with $n=2$ trials:
$$P(\text{exactly 1}) = \binom{2}{1} (P)^1 (1-P)^1 = 2(0.376)(1 - 0.376) = 2(0.376)(0.624) = 0.469$$
