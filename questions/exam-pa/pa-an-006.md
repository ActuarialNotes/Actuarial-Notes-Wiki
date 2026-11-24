---
id: "pa-an-006"
exam: "Exam PA"
topic: "Bias-Variance Tradeoff"
learning_objective: "Predictive Analytics Problem Definition"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Bias-Variance+Tradeoff
  - Concepts/Bias
  - Concepts/Variance
answer: "54"
points: 1
---

An actuary compares two pure premium models at the profile of a typical policy, $x_0$. Simulation over many possible training sets gives:

| Model | Bias of $\hat{f}(x_0)$ | Variance of $\hat{f}(x_0)$ |
| :--- | ---: | ---: |
| A, a flexible model | $-2$ | 20 |
| B, a simple model | 5 | 4 |

The variance of the error term is 30. The actuary will use the model with the lower expected test mean squared error at $x_0$.

Calculate the expected test mean squared error of the model the actuary uses. Give your answer as a whole number.

## Explanation

The expected test MSE at $x_0$ is the variance of the prediction, plus the squared bias, plus the irreducible error:

$$
\begin{aligned}
\text{Model A:} \quad & 20 + (-2)^2 + 30 = 54 \\
\text{Model B:} \quad & 4 + 5^2 + 30 = 59
\end{aligned}
$$

Model A has the lower expected test MSE although its variance is five times Model B's, because Model B's bias is large and enters squared. The answer is **54**.

**Common wrong entries**

- **39**: adding the bias without squaring it gives Model B $\text{MSE} = 4 + 5 + 30 = 39$, which then looks like the better model.
- **24**: leaving out the irreducible error gives Model A $\text{MSE} = 20 + 4 = 24$.
- **59**: choosing the model with the lower variance, Model B, without comparing the totals.
