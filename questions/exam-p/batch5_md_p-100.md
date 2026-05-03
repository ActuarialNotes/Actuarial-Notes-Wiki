---
id: p-100
topic: General Probability
subtopic: Set Theory and Venn Diagrams
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - set-theory
  - inclusion-exclusion
wiki_link: Concepts/Set+Theory
answer: B
points: 1
---

A survey of 100 TV viewers revealed that over the last year:
i) 34 watched CBS.
ii) 15 watched NBC.
iii) 10 watched ABC.
iv) 7 watched CBS and NBC.
v) 6 watched CBS and ABC.
vi) 5 watched NBC and ABC.
vii) 4 watched CBS, NBC, and ABC.
viii) 18 watched HGTV, and of these, none watched CBS, NBC, or ABC.

Calculate how many of the 100 TV viewers did not watch any of the four channels (CBS, NBC, ABC or HGTV).

- A) 1
- B) 37
- C) 45
- D) 55
- E) 82

## Explanation

Let $C, N, A$ be the sets of viewers watching CBS, NBC, and ABC.
Using the Principle of Inclusion-Exclusion for these three:
$$n(C \cup N \cup A) = n(C) + n(N) + n(A) - n(C \cap N) - n(C \cap A) - n(N \cap A) + n(C \cap N \cap A)$$
$$n(C \cup N \cup A) = 34 + 15 + 10 - 7 - 6 - 5 + 4 = 45$$

Since HGTV ($H$) is mutually exclusive to $C, N$, and $A$:
$$n(C \cup N \cup A \cup H) = 45 + 18 = 63$$

The number of viewers who watched none of the four is $100 - 63 = 37$.
