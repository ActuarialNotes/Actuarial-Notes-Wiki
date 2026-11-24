---
id: "atpa-an-026"
exam: "Exam ATPA"
topic: "Neural Network"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: easy
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Neural+Network
  - Concepts/Activation+Function
answer: "1.4"
points: 1
---

A neural network for claim severity has one hidden layer of two units with the ReLU activation, $g(z) = \max(0, z)$. The weights are:

| | Bias | Weight on $X_1$ | Weight on $X_2$ |
| :--- | ---: | ---: | ---: |
| Hidden unit 1 | $-1.0$ | 0.5 | 1.0 |
| Hidden unit 2 | 2.0 | $-1.5$ | 0.5 |

The output weights are $\beta_0 = 0.2$, $\beta_1 = 1.2$ on unit 1 and $\beta_2 = -0.8$ on unit 2.

Calculate the network's prediction for $X_1 = 2$ and $X_2 = 1$. Give your answer to one decimal place.

## Explanation

Each hidden unit applies the ReLU to its weighted input:

$$
z_1 = -1.0 + 0.5(2) + 1.0(1) = 1.0, \qquad g(z_1) = \max(0, 1.0) = 1.0
$$

$$
z_2 = 2.0 - 1.5(2) + 0.5(1) = -0.5, \qquad g(z_2) = \max(0, -0.5) = 0
$$

The output layer combines the activations:

$$
f(X) = 0.2 + 1.2(1.0) - 0.8(0) = \mathbf{1.4}
$$

**Common wrong entries**

- **1.8** — skips the activation on unit 2 and carries its input $-0.5$ forward, so $-0.8(-0.5)$ adds 0.4.
- **1.2** — leaves out the output bias $\beta_0$.
