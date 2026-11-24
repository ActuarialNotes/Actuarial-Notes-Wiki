---
id: "atpa-an-023"
exam: "Exam ATPA"
topic: "Train-Test Split"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: hard
type: multi-part
bloom: evaluate
wiki_link:
  - Concepts/Train-Test+Split
  - Concepts/Holdout+Sample
points: 2
---

A modeling team tries 20 candidate severity models and keeps the one with the smallest mean squared error on a single holdout sample. Unknown to the team, all 20 candidates have the same true test MSE of 250. Each holdout MSE equals the true value plus an independent error with standard deviation 10. The expected maximum of 20 independent standard normal variables is 1.867.

## Part a (1 point)
Calculate the expected holdout MSE of the model the team keeps. Give your answer to one decimal place.

### Answer
231.3

### Explanation
The team keeps the smallest of 20 noisy estimates. By symmetry, the smallest of 20 independent standard normal variables has expected value $-1.867$, so

$$
E[\text{reported MSE}] = 250 - 1.867(10) = 250 - 18.67 = \mathbf{231.3}
$$

The reported error understates the true 250 by about 7.5%, although no candidate is better than any other.

**Common wrong entries**

- **250.0** — treats the winner's holdout MSE as unbiased. Each estimate is unbiased for its own model, but the smallest of them is not.
- **268.7** — adds the shift, as if the team kept the largest error.

## Part b (1 point)
Which procedure gives an unbiased estimate of the kept model's test error?

- A) Report the kept model's MSE on the holdout sample, since each candidate's estimate is unbiased
- B) Score the kept model once on a test set that played no part in choosing it
- C) Repeat the comparison on a new random holdout sample and report the new winner's MSE
- D) Choose the model by training MSE instead, and report its holdout MSE after a refit with tuned settings

### Answer
B

### Explanation
Once the holdout sample has chosen anything, a different set must report the result. A test set kept out of every decision and used once gives an unbiased estimate, and here it would show about 250. The answer is **B**.

- **A** — is the optimistic estimate from part a.
- **C** — keeps the smallest of 20 noisy estimates again, so the new figure is biased downward in the same way.
- **D** — retuning after looking at the holdout error fits the model to that sample, so the reported error is still optimistic. Training MSE also favours the most flexible model.
