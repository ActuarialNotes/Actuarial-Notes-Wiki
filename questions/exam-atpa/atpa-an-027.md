---
id: "atpa-an-027"
exam: "Exam ATPA"
topic: "Table Importability"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: hard
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Table+Importability
  - Concepts/Generalized+Linear+Model
  - Concepts/Boosting
  - Concepts/Neural+Network
  - Concepts/Stacking
  - Concepts/Explainability
answer: "B"
points: 1
---

A personal auto insurer files its rating relativities with the regulator, who reviews the effect of every rating variable. Its rating engine can load a base rate with one-way and two-way tables of relativities and nothing else. The team compares five candidates by holdout deviance against the current log-link GLM:

| Candidate | Change in holdout deviance |
| :--- | ---: |
| Current GLM | 0.0% |
| Current GLM plus the two interactions a GBM points to, as two-way tables | $-1.4\%$ |
| GBM of 1,500 trees, each with five splits | $-2.6\%$ |
| Neural network with two hidden layers | $-2.8\%$ |
| Stack of the GLM, the GBM and the neural network | $-3.3\%$ |

Which candidate should the team recommend for the filed rates?

- A) The current GLM, because any change to a filed model needs a new filing
- B) The GLM with the two added interactions
- C) The GBM, explained to the regulator with Shapley values
- D) The neural network, explained to the regulator with partial dependence plots
- E) The stack, because it has the lowest holdout deviance

## Explanation

The use sets the criteria. The output is a filed rate, so the model must load into the existing engine as tables, and the regulator must be able to review each variable's effect. A log-link GLM is table-importable by construction, and an interaction enters as a two-way table, so the GLM with the two interactions loads into the engine as it stands. It also gains 1.4% on holdout deviance. Using a GBM to find the interactions worth adding to a GLM is one way to take part of its accuracy into tables. The answer is **B**.

**Why not the others**

- **A** — keeps a model that the holdout data show is less accurate, when a better one meets every constraint. A new filing is a cost of any change, not a reason to rule one out.
- **C** — a GBM of 1,500 five-split trees predicts from combinations of up to five variables at once, which no set of one-way and two-way tables reproduces. Shapley values explain it but do not make it importable, so it would need new scoring software in production.
- **D** — the network's prediction passes through layers of non-linear units and has no base-rate-times-relativities form, so it cannot be loaded either, and plots made after fitting are what the regulator would have to review in place of relativities.
- **E** — the stack is the most accurate, but it depends on every base model and the meta-model, so its output cannot be loaded as rating tables and no single set of relativities explains it.
