---
id: "atpa-an-041"
exam: "Exam ATPA"
topic: "Interpretability"
learning_objective: "Model Explainability and Communication"
difficulty: medium
type: multi-part
bloom: analyze
wiki_link:
  - Concepts/Interpretability
  - Concepts/Partial+Dependence+Plot
  - Concepts/Shapley+Value
points: 5
---

A homeowners insurer documents the interpretability of its models. Match each item in the documentation to the kind of interpretability in Lipton's taxonomy that it provides. An option may be used more than once or not at all.

## Part a (1 point)
A plot of how a GBM's average predicted loss cost changes with the age of the roof.

- A) Simulatability
- B) Decomposability
- C) Algorithmic transparency
- D) Post-hoc interpretability

### Answer
D

### Explanation
A partial dependence plot is extracted from the fitted GBM and shows its average response to roof age without revealing how the trees produce it, so it is a post-hoc visualization. **B** would need each parameter of the GBM to mean something on its own, which one split of one tree does not.

## Part b (1 point)
A table in the rate manual listing, for each level of each rating variable of a log-link GLM, the factor $e^{\hat{\beta}_j}$ that multiplies the base rate.

- A) Simulatability
- B) Decomposability
- C) Algorithmic transparency
- D) Post-hoc interpretability

### Answer
B

### Explanation
Each $e^{\hat{\beta}_j}$ is a rating relativity with a meaning of its own, which is decomposability. **D** is wrong because the table is the model's own parameters, not information extracted from a fitted model after the fact.

## Part c (1 point)
A decision tree with three splits that an underwriter applies by hand to any application in under a minute.

- A) Simulatability
- B) Decomposability
- C) Algorithmic transparency
- D) Post-hoc interpretability

### Answer
A

### Explanation
A person can take in the whole tree and work out a prediction by hand in reasonable time, so the tree is simulatable. Each split also has a meaning, but what this item describes is following the whole model by hand, which is the higher level of transparency.

## Part d (1 point)
An appendix showing that the GLM's coefficients are maximum likelihood estimates, so their standard errors and deviance tests follow from known theory.

- A) Simulatability
- B) Decomposability
- C) Algorithmic transparency
- D) Post-hoc interpretability

### Answer
C

### Explanation
The appendix explains how the fit is produced and what its properties are, which is algorithmic transparency. **B** concerns what each fitted parameter means, not how the parameters were estimated.

## Part e (1 point)
A list of the five past applications most similar to one declined application, all of which went on to have large water-damage claims.

- A) Simulatability
- B) Decomposability
- C) Algorithmic transparency
- D) Post-hoc interpretability

### Answer
D

### Explanation
Justifying an output by pointing to similar records is explanation by example, one of Lipton's four kinds of post-hoc interpretability. It says nothing about the model's mechanism, so none of the three kinds of transparency (**A**, **B**, **C**) applies.
