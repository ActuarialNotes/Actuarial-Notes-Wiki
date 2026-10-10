---
id: "masi-an-098"
exam: "Exam MAS-I"
topic: "Statistical Software"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Statistical+Software
  - Concepts/Model+Output
  - Concepts/Parameter+Estimate+Tables
  - Concepts/Poisson+Regression
  - Concepts/Categorical+Predictor
  - Concepts/p-Value
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f3fb2baeff1e86089dd686476bdea2eca8553e8a189262beaee40dbf8231b51b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-098.md
---

A fleet insurer's data file has 5,000 records, one per fleet-year, with claim counts, exposure in vehicle-years, a territory (Central, East, North or West) and the fleet's average vehicle age in years, which ranges from 0 to 20. A Poisson GLM is fitted in R:

```
glm(formula = claims ~ territory + veh_age, family = poisson,
    data = fleet, offset = log(exposure))

Coefficients:
                Estimate Std. Error z value Pr(>|z|)
(Intercept)    -2.181899   0.045474 -47.981  < 2e-16 ***
territoryEast   0.234277   0.049284   4.754 2.00e-06 ***
territoryNorth  0.141441   0.054419   2.599  0.00935 **
territoryWest  -0.081736   0.058413  -1.399  0.16173
veh_age        -0.023588   0.003254  -7.250 4.18e-13 ***

(Dispersion parameter for poisson family taken to be 1)

    Null deviance: 4816.1  on 4962  degrees of freedom
Residual deviance: 4723.0  on 4958  degrees of freedom
  (37 observations deleted due to missingness)
AIC: 9006.9
```

Determine which of the following statements are true.

- I. The intercept, $-2.1819$, is the log of the expected claim frequency of a Central fleet whose vehicle age equals the mean vehicle age in the data.
- II. The model was fitted to 4,963 of the 5,000 records.
- III. Holding vehicle age fixed, West's expected frequency is about 8% below Central's, and the difference is not significant at the 5% level.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

Take each statement in turn.

**I — false.** Central has no row in the table, so it is the base level (R takes the alphabetically first level by default). But `veh_age` is entered as itself, not centred, so the intercept is the log frequency at `veh_age` $= 0$ — a Central fleet of brand-new vehicles:

$$
e^{-2.1819} = 0.113 \text{ claims per vehicle-year at age } 0
$$

A Central fleet at the mean age $\bar{a}$ has log frequency $-2.1819 - 0.0236\,\bar{a}$, which is lower.

**II — true.** The null model fits only the intercept, so its degrees of freedom are $n - 1$: $n = 4{,}962 + 1 = 4{,}963$. The residual degrees of freedom agree, 4,963 - 5 = 4,958 for five parameters. The footer says why: R dropped the 37 records with a missing value, and 4,963 + 37 = 5,000.

**III — true.** With a log link,

$$
e^{-0.081736} = 0.9215
$$

so West's expected frequency is 7.8% below Central's at the same vehicle age. Its $z$ value is $-0.081736 / 0.058413 = -1.399$, with $p = 0.162 > 0.05$, so the difference is not significant.

II and III are true, so the answer is **D**.

**Why not the others**

- **A**, **B** and **C** — each accepts I, reading the intercept as the base level at the *mean* covariate value; it is the base level at a covariate value of zero, because `veh_age` enters the formula uncentred.
- **B** also rejects III, and **A** and **C** reject II — the record count is in the degrees of freedom, not in the 5,000 rows of the file, because R drops rows with a missing value (and says so in the footer).
- **E** — would need all three statements true (or none of the listed sets right); I is false.
