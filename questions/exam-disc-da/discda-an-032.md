---
id: "discda-an-032"
exam: "Exam DISC-DA"
topic: "Types of Plots"
learning_objective: "Analyzing Data With Visualizations"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Types+of+Plots
  - Concepts/Exploratory+Data+Visualization
answer: "D"
points: 1
---

An analyst draws a heat map of auto claim frequency (claims per car-year) by territory and vehicle use. The data are:

| Territory | Use | Car-years | Claims |
| :--- | :--- | ---: | ---: |
| T1 | Pleasure | 4,000 | 200 |
| T1 | Commute | 6,000 | 420 |
| T2 | Pleasure | 1,000 | 75 |
| T2 | Commute | 2,000 | 130 |

Which tile is darkest?

- A) T1, pleasure
- B) T1, commute
- C) T2, commute
- D) T2, pleasure

## Explanation

Each tile shows claims divided by car-years:

$$
\begin{align*}
f_{T1,\text{pleasure}} &= \frac{200}{4{,}000} \\
&= 0.050 \\
f_{T1,\text{commute}} &= \frac{420}{6{,}000} \\
&= 0.070 \\
f_{T2,\text{pleasure}} &= \frac{75}{1{,}000} \\
&= 0.075 \\
f_{T2,\text{commute}} &= \frac{130}{2{,}000} \\
&= 0.065
\end{align*}
$$

T2 pleasure has the highest frequency, 0.075. The answer is **D**.

**Why not the others**

- **A** — T1 pleasure has the lowest frequency, 0.050.
- **B** — T1 commute has the most claims (420), so it would be darkest on a heat map of counts, which mostly shows where the exposure is.
- **C** — T2 commute, at 0.065, is below both T1 commute and T2 pleasure.
