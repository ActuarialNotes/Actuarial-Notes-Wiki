---
id: "discda-an-205"
exam: "Exam DISC-DA"
topic: "Visualization Design Principles"
learning_objective: "Presenting Data Effectively"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Visualization+Design+Principles
  - Concepts/Chart+Selection
answer: "D"
points: 1
---
A bar chart compares the pure premium relativities of two territories, 0.90 and 1.20. The chart's vertical axis starts at 0.80. How many times as long as the first bar does the second bar appear?

- A) 1.33
- B) 1.50
- C) 3.00
- D) 4.00

## Explanation

A bar's visible length is its value minus the axis starting point:

$$
\begin{align*}
\text{Apparent ratio} &= \frac{1.20 - 0.80}{0.90 - 0.80} \\
&= \frac{0.40}{0.10} \\
&= 4.00
\end{align*}
$$

The second bar looks four times as long, though the relativity is only $\tfrac{1.20}{0.90} = 1.33$ times as large. That is why bars must start at zero (the principle of proportional ink). The answer is **D**.

**Why not the others**

- **A** — 1.33 is the true ratio of the values, which is what the chart *should* convey, not what it shows.
- **B** — 1.50 divides the second value by the axis start, $\tfrac{1.20}{0.80}$, which is not the length of either bar.
- **C** — 3.00 divides the gap between the bars, $0.30$, by the first bar's length, mixing a difference with a length.
