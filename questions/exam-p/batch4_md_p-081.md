---
id: p-081
topic: General Probability
subtopic: Conditional Probability
difficulty: hard
type: multiple-choice
tags:
  - exam-p
  - conditional-probability
  - mutually-exclusive
wiki_link: Concepts/Conditional+Probability
answer: E
points: 1
---

Two life insurance policies, each with a death benefit of 10,000 and a one-time premium of 500, are sold to a married couple, one for each person. The policies will expire at the end of the tenth year.

The probability that only the wife will survive at least ten years is 0.025, the probability that only the husband will survive at least ten years is 0.01, and the probability that both of them will survive at least ten years is 0.96.

Calculate the expected excess of premiums over claims, given that the husband survives at least ten years.

- A) 350
- B) 385
- C) 397
- D) 870
- E) 897

## Explanation

Because the husband has survived, the only possible claim payment is to the wife. We need the conditional probability that the wife dies within ten years (i.e. does not survive) given that the husband survives.

* $P(\text{Only husband survives}) = 0.01$
* $P(\text{Both survive}) = 0.96$
* $P(\text{Husband survives}) = 0.96 + 0.01 = 0.97$

The probability that the wife dies, given that the husband survives is:
$$P(\text{Wife dies} \mid \text{Husband survives}) = \frac{P(\text{Only husband survives})}{P(\text{Husband survives})} = \frac{0.01}{0.97} = \frac{1}{97}$$

The total premium collected is $500 \times 2 = 1000$. The only potential claim payout is 10,000 for the wife.
The expected claim payment is $10,000 \times \frac{1}{97} \approx 103.09$.

The expected excess of premiums over claims is:
$$1000 - 103.09 = 896.91 \approx 897$$
