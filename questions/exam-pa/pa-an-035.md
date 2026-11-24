---
id: "pa-an-035"
exam: "Exam PA"
topic: "Random Forest"
learning_objective: "Tree-Based Models"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Random+Forest
  - Concepts/Out-of-Bag+Error
  - Concepts/Hyperparameter
answer: "A"
points: 1
---

An actuary tunes a random forest of 1,000 trees that classifies auto claims as likely or unlikely to involve litigation, using $p = 25$ predictors. The out-of-bag error rate for several values of $m$, the number of predictors tried at each split, is:

| $m$ | 2 | 5 | 8 | 15 | 25 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Out-of-bag error rate | 14.6% | 12.9% | 13.4% | 14.1% | 15.2% |

Which setting should the actuary use?

- A) $m = 5$, because it has the lowest out-of-bag error rate
- B) $m = 2$, because the smallest $m$ makes the trees the least alike
- C) $m = 25$, because each tree then uses all the information in the predictors
- D) $m = 5$, but only after confirming it with a separate cross-validation, because the out-of-bag error is a training error
- E) $m = 8$, and then raise the number of trees until the out-of-bag error rate stops falling, to avoid overfitting

## Explanation

The out-of-bag error estimates test error with no extra fitting, using for each claim only the trees that never saw it, and $m$ can be chosen by it. The lowest out-of-bag error rate is 12.9%, at $m = 5$, which is also the classification starting point $\sqrt{25} = 5$. The answer is **A**.

**Why not the others**

- **B** decorrelates the trees most, but a smaller $m$ also weakens each tree, and the out-of-bag error at $m = 2$ is higher.
- **C** is bagging. Every tree has the same predictors at the top, so the trees are highly correlated, and its error is the highest in the table.
- **D** treats the out-of-bag error as a training error. Each claim is predicted only by trees fitted without it, and with many trees the estimate is virtually equivalent to leave-one-out cross-validation.
- **E** picks a value with a higher error, and its reasoning is wrong: adding trees to a random forest does not cause overfitting.
