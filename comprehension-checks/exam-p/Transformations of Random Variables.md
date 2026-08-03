---
concept: "Transformations of Random Variables"
exam: exam-p
topic: "Univariate Random Variables"
correct: C
---
A student finds the density of $Y = g(X)$ by substituting $x = g^{-1}(y)$ straight into $f_X$, giving $f_Y(y) = f_X(g^{-1}(y))$. Their result does not integrate to 1. What did they leave out?

- A) A squaring step, needed to keep the density non-negative
- B) Division by $E[X]$ to renormalize the result
- C) The factor $\left|\tfrac{d}{dy}g^{-1}(y)\right|$, which rescales the density into the new variable's units
- D) Nothing; they should have substituted $g(y)$ in place of $g^{-1}(y)$

<!-- rationale: 1: densities are already non-negative, and squaring changes the distribution · 2: no such renormalization step exists · 3: the substitution direction is right, only the derivative factor is missing -->
