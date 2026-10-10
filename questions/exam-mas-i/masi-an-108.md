---
id: "masi-an-108"
exam: "Exam MAS-I"
topic: "Regression Through the Origin"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Regression+Through+the+Origin
  - Concepts/R-Squared
  - Concepts/Linear+Regression
  - Concepts/Model+Output
  - Concepts/Model+Selection
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c1aa67edfda3e796876e328cd8f6a9549f25a2a9f44c10dab09d0e8cabc16552
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-108.md
---

An insurer regresses annual operating expense $y$ (\$000s) on the number of policies $x$ (hundreds) for its 8 branch offices. Management believes expenses are almost entirely variable with the number of policies. Two models are fitted in R.

Model 1, with an intercept:

```
            Estimate Std. Error t value Pr(>|t|)
(Intercept)   2.0425     2.6175   0.780    0.465
policies      2.4229     0.1072  22.607  4.9e-07 ***

Residual standard error: 2.267 on 6 degrees of freedom
Multiple R-squared:  0.9884,  Adjusted R-squared:  0.9865
```

Model 2, through the origin:

```
         Estimate Std. Error t value Pr(>|t|)
policies  2.50251    0.03189   78.47  1.4e-11 ***

Residual standard error: 2.203 on 7 degrees of freedom
Multiple R-squared:  0.9989,  Adjusted R-squared:  0.9987
```

Which choice is best supported, for the reason given?

- A) Model 2, because its R-squared of 0.9989 is higher than Model 1's 0.9884
- B) Model 1, because its residual sum of squares is smaller than Model 2's
- C) Model 1, because Model 2's residuals do not sum to zero, so its slope is biased
- D) Model 2, because dropping a parameter always lowers the residual standard error
- E) Model 2, because the intercept is not significant and Model 2's residual standard error is lower

## Explanation

Judge each reason, not just each model.

- The intercept's $t$ value is $t = 2.0425/2.6175 = 0.78$ on 6 degrees of freedom ($p = 0.465$): the data cannot distinguish it from zero, and management's belief says it should be zero.
- The residual standard errors are directly comparable, since each is an estimate of the same $\sigma$. Model 2's is smaller, 2.203 < 2.267: its residual sum of squares is a little larger ($\text{SSE} = 2.203^2 \times 7 = 33.97$ against $\text{SSE} = 2.267^2 \times 6 = 30.84$), but it keeps one more degree of freedom.

Both criteria favour the simpler model through the origin. The answer is **E**.

**Why not the others**

- **A** — without an intercept, R reports $R^2 = 1 - \text{SSE}/\sum y_i^2$, variation measured about **zero**, which is not comparable with the usual $R^2$ about $\bar y$. Measured about $\bar y$, Model 2's $R^2$ is 0.9872, *below* Model 1's — the right model, for the wrong reason.
- **B** — adding a parameter can never increase the residual sum of squares, so a smaller SSE for the larger model is guaranteed and proves nothing.
- **C** — through the origin only $\sum x_i e_i = 0$ holds, so the residuals need not sum to zero; that does not make $\hat\beta$ biased when the no-intercept model is correct.
- **D** — dropping a parameter raises the SSE and adds a degree of freedom; the residual standard error can go either way. It fell here only because the intercept explained so little.
