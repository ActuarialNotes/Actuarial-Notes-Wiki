---
id: p-087
topic: General Probability
subtopic: Set Theory and Venn Diagrams
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - set-theory
  - mutually-exclusive
wiki_link: Concepts/Set+Theory
answer: B
points: 1
---

An insurance agent offers his clients auto insurance, homeowners insurance and renters insurance. The purchase of homeowners insurance and the purchase of renters insurance are mutually exclusive. The profile of the agent's clients is as follows:

i) 17% of the clients have none of these three products.
ii) 64% of the clients have auto insurance.
iii) Twice as many of the clients have homeowners insurance as have renters insurance.
iv) 35% of the clients have two of these three products.
v) 11% of the clients have homeowners insurance, but not auto insurance.

Calculate the percentage of the agent's clients that have both auto and renters insurance.

- A) 7%
- B) 10%
- C) 16%
- D) 25%
- E) 28%

## Explanation

Let $A$ be auto, $H$ be homeowners, and $R$ be renters insurance.
$H$ and $R$ are mutually exclusive $\implies P(H \cap R) = 0$.
Therefore, nobody has all three products.
Since 17% have no products, the union of all three is $1 - 0.17 = 0.83$.
We are given $P(A) = 0.64$ and $P(H) = 2P(R)$.
Since nobody has all three, having "two of these three" means $P(A \cap H) + P(A \cap R) + P(H \cap R) = 0.35$. Since $P(H \cap R)=0$, $P(A \cap H) + P(A \cap R) = 0.35$.

From inclusion-exclusion:
$$P(A \cup H \cup R) = P(A) + P(H) + P(R) - P(A \cap H) - P(A \cap R) - P(H \cap R) + P(A \cap H \cap R)$$
$$0.83 = 0.64 + P(H) + P(R) - 0.35 - 0 + 0$$
$$0.83 = 0.29 + 3P(R) \implies 3P(R) = 0.54 \implies P(R) = 0.18$$
Then $P(H) = 2(0.18) = 0.36$.

We are given $P(H \cap A^c) = 0.11$. Since $P(H) = P(H \cap A^c) + P(H \cap A)$, we have:
$$0.36 = 0.11 + P(H \cap A) \implies P(H \cap A) = 0.25$$

We know $P(A \cap H) + P(A \cap R) = 0.35$, so:
$$0.25 + P(A \cap R) = 0.35 \implies P(A \cap R) = 0.10$$
