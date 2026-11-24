---
id: "pa-an-032"
exam: "Exam PA"
topic: "Bagging"
learning_objective: "Tree-Based Models"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Bagging
  - Concepts/Random+Forest
answer: "C"
points: 1
---

An actuary bags 50 deep regression trees to predict claim severity. For a given policy, each tree's prediction has variance $\sigma^2 = 4$, and any two trees' predictions have correlation $\rho = 0.5$. Calculate the variance of the bagged prediction for that policy.

- A) 0.08
- B) 2.00
- C) 2.04
- D) 2.08
- E) 4.00

## Explanation

The variance of an average of $B$ predictions, each with variance $\sigma^2$ and pairwise correlation $\rho$, is

$$
\mathrm{Var}(\bar{Z}) = \rho\sigma^{2} + \frac{1 - \rho}{B}\sigma^{2} = 0.5(4) + \frac{0.5(4)}{50} = 2 + 0.04 = 2.04
$$

The answer is **C**. Adding trees removes only the second term, so no number of these trees brings the variance below 2. Reducing $\rho$, which is what a random forest does, is the way to go lower.

**Why not the others**

- **A** is $\sigma^2 / B$, the variance of an average of independent trees. Bagged trees are fitted to overlapping bootstrap samples and are correlated.
- **B** is $\rho\sigma^2$ alone, the limit as $B$ grows without bound, not the variance with 50 trees.
- **D** is $\rho\sigma^2 + \sigma^2/B$, which forgets the factor $(1 - \rho)$ in the second term.
- **E** is the variance of one tree, as if averaging did nothing.
