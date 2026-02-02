---
tags: [probability, set-theory]
concepts: [[Inclusion-Exclusion Principle]]
difficulty: medium
shuffle: true
---

# Question

A survey of a group's viewing habits over the last year revealed the following information:

- (i) 28% watched gymnastics
- (ii) 29% watched baseball
- (iii) 19% watched soccer
- (iv) 14% watched gymnastics and baseball
- (v) 12% watched baseball and soccer
- (vi) 10% watched gymnastics and soccer
- (vii) 8% watched all three sports

Calculate the percentage of the group that watched none of the three sports during the last year.

## Answer Choices

(A) 24%
(B) 36%
(C) 41%
(D) 52%
(E) 60%

## Solution

Let $G$, $B$, and $S$ represent the events that a person watched gymnastics, baseball, and soccer respectively.

Given:
- $P(G) = 0.28$
- $P(B) = 0.29$
- $P(S) = 0.19$
- $P(G \cap B) = 0.14$
- $P(B \cap S) = 0.12$
- $P(G \cap S) = 0.10$
- $P(G \cap B \cap S) = 0.08$

Using the Inclusion-Exclusion Principle:

$$P(G \cup B \cup S) = P(G) + P(B) + P(S) - P(G \cap B) - P(B \cap S) - P(G \cap S) + P(G \cap B \cap S)$$

The probability of watching at least one of the three sports is:

$$P(G \cup B \cup S) = 0.28 + 0.29 + 0.19 - 0.14 - 0.12 - 0.10 + 0.08 = 0.48$$

Therefore, the probability of watching none of the three sports is:

$$P(\text{none}) = 1 - P(G \cup B \cup S) = 1 - 0.48 = 0.52 = 52\%$$

**Answer: (D)**
