---
id: "pa-an-034"
exam: "Exam PA"
topic: "Random Forest"
learning_objective: "Tree-Based Models"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Random+Forest
  - Concepts/Bagging
  - Concepts/Hyperparameter
answer: "E"
points: 1
---

An actuary fits a random forest to predict the cost of commercial property claims from $p = 30$ predictors. One predictor, the building's insured value, is far stronger than the others. The actuary reports the forest's settings to a reviewer.

Determine which of the following statements are true.

- I. A typical starting value for the number of predictors tried at each split is $m = 10$.
- II. A single tree in the forest can split on all 30 predictors, even with $m = 10$.
- III. Setting $m = 30$ would make the model bagging, and its trees would be more alike, because insured value would be chosen for the top split of nearly every tree.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

**I is true.** The response, claim cost, is quantitative, so this is a regression forest, and the typical starting value is $m \approx p/3 = 30/3 = 10$. The value $\sqrt{30} \approx 5$ is the starting point for classification.

**II is true.** A fresh random sample of $m$ predictors is drawn at every split of every tree, not once per tree, so across its many splits one tree can use all 30 predictors.

**III is true.** With $m = p$ every predictor is available at every split, which is bagging. The dominant predictor then takes the top split of nearly every tree, the trees are highly correlated, and averaging them reduces the variance less. Restricting $m$ keeps insured value out of many splits and decorrelates the trees.

All three statements are true. The fixed key has no option for I, II and III, so the answer is **E**.

**Why not the others**

- **A** rejects II and III, treating the predictor subset as fixed for a whole tree and missing that $m = p$ is bagging.
- **B** rejects III.
- **C** rejects II, the belief that the $m$ predictors are drawn once for each tree.
- **D** rejects I, applying the classification rule $m \approx \sqrt{p}$ to a regression problem.
