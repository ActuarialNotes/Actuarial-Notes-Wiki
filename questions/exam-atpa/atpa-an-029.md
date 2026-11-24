---
id: "atpa-an-029"
exam: "Exam ATPA"
topic: "Decision Tree"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: medium
type: multi-part
bloom: analyze
wiki_link:
  - Concepts/Decision+Tree
points: 2
---

A modeler compares a regression tree with a linear regression on six observations of a predictor $x$ and a response $y$:

| $x$ | 1 | 2 | 3 | 4 | 5 | 6 |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| $y$ | 3 | 4 | 4 | 5 | 12 | 14 |

The tree is grown by recursive binary splitting on the residual sum of squares and stopped after one split. The least squares line through the same data is $\hat{y} = -1.00 + 2.29x$.

## Part a (1 point)
Which cutoff does the tree's split use?

- A) $x < 1.5$
- B) $x < 2.5$
- C) $x < 3.5$
- D) $x < 4.5$
- E) $x < 5.5$

### Answer
D

### Explanation
Each candidate split predicts the mean of each side, and the tree takes the one with the smallest total RSS:

| Cutoff | Left mean | Right mean | RSS |
| :--- | ---: | ---: | ---: |
| $x < 1.5$ | 3.00 | 7.80 | 92.80 |
| $x < 2.5$ | 3.50 | 8.75 | 75.25 |
| $x < 3.5$ | 3.67 | 10.33 | 45.33 |
| $x < 4.5$ | 4.00 | 13.00 | 4.00 |
| $x < 5.5$ | 5.60 | 14.00 | 53.20 |

The split at $x < 4.5$ separates the four low responses from the two high ones and leaves an RSS of only 4. The answer is **D**.

- **A**, **B** and **C** — each leaves low responses in the right region, which pulls its mean down and leaves large squared errors.
- **E** — isolates the single largest response but leaves 12 among the low ones.

## Part b (1 point)
A new observation has $x = 8$, beyond the range of the data. What do the two models predict for it?

- A) The tree predicts 13.0 and the line predicts 17.3
- B) The tree predicts 14.0 and the line predicts 17.3
- C) The tree predicts 17.3 and the line predicts 17.3
- D) The tree predicts 13.0 and the line predicts 13.0

### Answer
A

### Explanation
The tree predicts the same value for every observation in a region. $x = 8$ falls in the region $x \geq 4.5$, whose training mean is $(12 + 14)/2 = 13.0$. The line continues its slope:

$$
-1.00 + 2.29(8) = 17.3
$$

A tree's prediction stays flat beyond the data, while the linear model extrapolates the trend. The answer is **A**.

- **B** — uses the last training response, 14, instead of the mean of the region.
- **C** — assumes the tree extends the trend as the line does.
- **D** — assumes the line also levels off where the data end.
