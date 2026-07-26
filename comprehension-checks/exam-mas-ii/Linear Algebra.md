---
concept: "Linear Algebra"
exam: exam-mas-ii
topic: "Prerequisite Knowledge"
correct: B
---
Two columns of a regression design matrix $X$ turn out to be exact duplicates of each other. What happens to $\hat{\boldsymbol{\beta}} = (X^\top X)^{-1} X^\top \mathbf{y}$?

- A) Nothing breaks — the duplicated predictors simply receive the same coefficient
- B) $X^\top X$ is singular, so it has no inverse and no unique solution exists
- C) The coefficients stay unique, but the residual sum of squares doubles
- D) The determinant doubles, inflating every coefficient

<!-- rationale: 0: assumes a solution exists and is merely shared, missing that the system is rank-deficient · 2: attaches the problem to the residuals rather than to invertibility · 3: guesses at the determinant's behaviour — duplication sends it to zero, not to double -->
