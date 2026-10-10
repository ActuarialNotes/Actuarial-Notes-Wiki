---
id: "discda-an-207"
exam: "Exam DISC-DA"
topic: "Similarity and Distance Measures"
learning_objective: "Understanding Fundamental Modeling Concepts"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Similarity+and+Distance+Measures
  - Concepts/K-Nearest+Neighbors
answer: "C"
points: 1
---

A nearest-neighbor model for auto physical damage describes each policy by driver age (years) and vehicle value (dollars). A new policy has driver age 40 and vehicle value \$30,000. Three training records are:

| Record | Driver age | Vehicle value |
| :--- | ---: | ---: |
| R1 | 42 | 40,000 |
| R2 | 60 | 31,000 |
| R3 | 35 | 36,000 |

In the training data, driver age has a standard deviation of 10 years and vehicle value \$8,000. Which record is the nearest neighbor by Euclidean distance, on raw values and on standardized values?

- A) R2 on both raw and standardized values
- B) R2 on raw values and R1 on standardized values
- C) R2 on raw values and R3 on standardized values
- D) R3 on both raw and standardized values

## Explanation

**Raw values.** Vehicle value differences are in thousands of dollars and swamp age:

$$
\begin{align*}
d(R1) &= \sqrt{2^2 + 10{,}000^2} \\
&= 10{,}000.0 \\
d(R2) &= \sqrt{20^2 + 1{,}000^2} \\
&= 1{,}000.2 \\
d(R3) &= \sqrt{5^2 + 6{,}000^2} \\
&= 6{,}000.0
\end{align*}
$$

R2 is nearest, although its driver is 20 years older.

**Standardized values.** Divide each difference by its standard deviation:

$$
\begin{align*}
d(R1) &= \sqrt{0.2^2 + 1.25^2} \\
&= 1.266 \\
d(R2) &= \sqrt{2.0^2 + 0.125^2} \\
&= 2.004 \\
d(R3) &= \sqrt{0.5^2 + 0.75^2} \\
&= 0.901
\end{align*}
$$

R3 is nearest. The answer is **C**.

**Why not the others**

- **A** — keeps the raw-value answer after standardizing, as if scaling did not matter. Standardizing gives age equal weight and moves R2 from nearest to farthest.
- **B** — R1 is the second-nearest after standardizing; its vehicle value differs by 1.25 standard deviations, more than R3's 0.75.
- **D** — on raw values R3 is 6,000 away against R2's 1,000; the raw ranking is driven by vehicle value alone.
