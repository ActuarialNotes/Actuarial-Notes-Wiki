---
id: "discrm-an-465"
exam: "Exam DISC-RM"
topic: "Risk Classifications"
learning_objective: "1. Introduction to Risk Management"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Risk+Classifications
  - Concepts/Law+of+Large+Numbers
  - Concepts/Coefficient+of+Variation
answer: "B"
points: 1
---
Insurer A pools 900 similar homes and Insurer B pools 3,600. Each home has an independent probability of 0.02 of a fire claim in a year. Measuring objective risk as the standard deviation of the number of claims divided by the expected number, how does Insurer B's objective risk compare with Insurer A's?

- A) It is one-quarter of Insurer A's
- B) It is one-half of Insurer A's
- C) It is the same as Insurer A's
- D) It is four times Insurer A's

## Explanation

For $n$ independent homes with claim probability $p$ and $q = 1 - p$, the number of claims has mean $np$ and standard deviation $\sqrt{npq}$:

$$
\begin{align*}
\text{A: } \sigma/\mu &= \sqrt{900(0.02)(0.98)} / 18 \\
&= 4.2 / 18 \\
&\approx 0.233 \\
\text{B: } \sigma/\mu &= \sqrt{3{,}600(0.02)(0.98)} / 72 \\
&= 8.4 / 72 \\
&\approx 0.117
\end{align*}
$$

Four times the exposures gives twice the standard deviation and four times the mean, so the relative variation **halves**. The answer is **B**.

**Why not the others**

- **A** — One-quarter assumes the relative variation falls in proportion to the number of exposures; it falls with the *square root* of that number.
- **C** — The probability per home is the same, but the variation of actual from expected claims, relative to the expected number, is not.
- **D** — Four times describes the expected number of claims, not the objective risk.
