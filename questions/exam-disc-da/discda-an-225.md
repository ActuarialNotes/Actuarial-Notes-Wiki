---
id: "discda-an-225"
exam: "Exam DISC-DA"
topic: "Linear Regression"
learning_objective: "Basic Data Analysis"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Linear+Regression
answer: "B"
points: 1
---

A linear model for auto physical damage severity is fitted as

$$\hat{y} = 1{,}200 + 85\,x_1 - 40\,x_2$$

where $x_1$ is the vehicle's value in thousands of dollars and $x_2$ is the driver's years of experience. What is the predicted severity for a \$20,000 vehicle driven by someone with 10 years of experience?

- A) 1,300
- B) 2,500
- C) 2,900
- D) 3,300

## Explanation

Substitute $x_1 = 20$ (thousands) and $x_2 = 10$:

$$
\begin{align*}
\hat{y} &= 1{,}200 + 85(20) - 40(10) \\
&= 1{,}200 + 1{,}700 - 400 \\
&= 2{,}500
\end{align*}
$$

Each additional \$1,000 of vehicle value adds \$85 to the predicted severity and each year of experience subtracts \$40, holding the other predictor fixed. The answer is **B**.

**Why not the others**

- **A** — 1,300 leaves out the intercept of 1,200.
- **C** — 2,900 leaves out the experience term.
- **D** — 3,300 adds the experience term instead of subtracting it.
