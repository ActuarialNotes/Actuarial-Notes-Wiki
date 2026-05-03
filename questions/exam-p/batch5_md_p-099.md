---
id: p-099
topic: General Probability
subtopic: Set Theory and Venn Diagrams
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - set-theory
  - probability-rules
wiki_link: Concepts/Set+Theory
answer: E
points: 1
---

The probability that a member of a certain class of homeowners with liability and property coverage will file a liability claim is 0.04, and the probability that a member of this class will file a property claim is 0.10. The probability that a member of this class will file a liability claim but not a property claim is 0.01.

Calculate the probability that a randomly selected member of this class of homeowners will not file a claim of either type.

- A) 0.850
- B) 0.860
- C) 0.864
- D) 0.870
- E) 0.890

## Explanation

Let $L$ be a liability claim and $P$ be a property claim.
We are given:
* $P(L) = 0.04$
* $P(P) = 0.10$
* $P(L \cap P^c) = 0.01$

Since $P(L) = P(L \cap P^c) + P(L \cap P)$, we have:
$$0.04 = 0.01 + P(L \cap P) \implies P(L \cap P) = 0.03$$

The probability of at least one claim is:
$$P(L \cup P) = P(L) + P(P) - P(L \cap P) = 0.04 + 0.10 - 0.03 = 0.11$$

The probability of neither claim is:
$$P(L^c \cap P^c) = 1 - P(L \cup P) = 1 - 0.11 = 0.890$$
