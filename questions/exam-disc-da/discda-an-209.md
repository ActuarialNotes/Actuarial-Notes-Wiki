---
id: "discda-an-209"
exam: "Exam DISC-DA"
topic: "Similarity and Distance Measures"
learning_objective: "Understanding Fundamental Modeling Concepts"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Similarity+and+Distance+Measures
  - Concepts/Clustering
answer: "D"
points: 1
---

Two commercial property risks are compared with Gower's coefficient, using equal weights on four features: occupancy class (nominal), whether a central-station alarm is installed (binary), building age and total insured value (TIV). Both risks have the same occupancy class; one has an alarm and the other does not; their building ages differ by 15 years, where ages in the portfolio range over 60 years; and their TIVs differ by \$3 million, where TIV ranges over \$12 million. What is the Gower dissimilarity between the two risks?

- A) 0.125
- B) 0.167
- C) 0.250
- D) 0.375

## Explanation

Gower's coefficient averages one contribution per feature. A nominal or binary feature contributes 0 if the two values match and 1 if not; a numeric feature contributes its absolute difference divided by its range.

$$
\begin{align*}
d &= \tfrac{1}{4}\left(0 + 1 + \tfrac{15}{60} + \tfrac{3}{12}\right) \\
&= \tfrac{1}{4}\left(1.50\right) \\
&= 0.375
\end{align*}
$$

The answer is **D**.

**Why not the others**

- **A** — 0.125 sums only the two numeric contributions, 0.50, but divides by all four features, dropping the alarm mismatch.
- **B** — 0.167 drops the alarm feature and averages the other three, $0.50 / 3$. The binary mismatch counts as 1.
- **C** — 0.250 averages only the numeric features, ignoring both categorical ones.
