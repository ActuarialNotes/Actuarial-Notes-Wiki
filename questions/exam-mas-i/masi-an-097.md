---
id: "masi-an-097"
exam: "Exam MAS-I"
topic: "Statistical Software"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Statistical+Software
  - Concepts/Model+Output
  - Concepts/Parameter+Estimate+Tables
  - Concepts/Gamma
  - Concepts/Link+Function
  - Concepts/Categorical+Predictor
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:08548ed4240721cc2a3abde2c2c2c6ec0039d26415725abe1cc3588557daffcd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-097.md
---

A Gamma GLM for claim severity is fitted in R. `territory` has three levels, A, B and C, and `veh_value` is the vehicle's value in thousands of dollars. Part of the output:

```
glm(formula = severity ~ territory + log(veh_value),
    family = Gamma(link = "log"), data = claims)

Coefficients:
               Estimate Std. Error t value Pr(>|t|)
(Intercept)     5.00000    0.18000  27.778  < 2e-16 ***
territoryB      0.20000    0.05000   4.000 6.58e-05 ***
territoryC     -0.15000    0.06000  -2.500   0.0125 *
log(veh_value)  0.45000    0.04500  10.000  < 2e-16 ***

(Dispersion parameter for Gamma family taken to be 0.81)

    Residual deviance: 1580.2  on 1846  degrees of freedom
```

Calculate the model's expected severity for a claim in territory C on a vehicle worth \$40,000.

- A) Less than 500
- B) At least 500, but less than 700
- C) At least 700, but less than 850
- D) At least 850, but less than 1,000
- E) At least 1,000

## Explanation

Read off what the output says about the model's structure:

- the link is log, so the expected severity is $e^{\hat\eta}$;
- territory A has no row, so it is the base level; territory C's coefficient, $-0.15$, is added to the intercept;
- the predictor is `log(veh_value)` with value in thousands, so it takes $\ln 40$, not 40 or 40,000.

$$
\begin{aligned}
\hat\eta &= 5.00 - 0.15 + 0.45 \ln 40 \\
&= 4.85 + 0.45(3.6889) \\
&= 6.5100 \\
\hat\mu &= e^{6.5100} \\
&= 671.8
\end{aligned}
$$

The expected severity is about **672**, in range **B**. The dispersion of 0.81 does not enter a prediction of the mean; it sets the spread around it.

**Why not the others**

- **A** — using $\log_{10} 40$ in place of $\ln 40$ makes the term 0.45 × 1.6021 = 0.7209 and gives $e^{5.5709} = 263$. R's `log()` is the natural logarithm.
- **C** — leaving territory out (treating C as the base) gives $e^{6.6600} = 781$.
- **D** — adding $+0.15$ for territory C gives $e^{6.8100} = 907$, and picking up territory B's 0.20 by mistake gives $e^{6.8600} = 953$.
- **E** — entering the vehicle value unlogged, 0.45 × 40 = 18, gives $e^{22.85}$, an absurdly large severity; the formula shows the predictor is `log(veh_value)`.
