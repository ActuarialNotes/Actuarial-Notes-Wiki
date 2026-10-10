---
id: "masi-an-096"
exam: "Exam MAS-I"
topic: "Data Types"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Data+Types
  - Concepts/Categorical+Predictor
  - Concepts/Poisson+Regression
  - Concepts/Parameter+Estimate+Tables
  - Concepts/Deviance
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:8ec9a67e10fa64cced46b43edee56bc3f3bc4ed598cbf0a717987eeb10e30402
  sources:
    - "Goldburd, Khare & Tevet, Generalized Linear Models for Insurance Rating, CAS Monograph No. 5 (CAS syllabus reading for MAS-II, Exam 8 and PCPA), 2.4 categorical variables may be numeric, e.g. territory 1 to 8, PDF p.20, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (2021), CAS-hosted copy, MAS-I reading, 4.2: coding a qualitative variable with numbers implies an ordering and equal spacing, PDF p.141, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Larsen, \"Generalized Linear Models\", CAS Study Note (rev. June 2016), MAS-I reading, quasi-likelihood for overdispersion in Poisson regression, PDF p.1, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain C tasks 1-9 and readings (Dobson & Barnett, Hogg, James et al., Larsen), PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-096.md
---

An insurer's five territories carry the codes 1 to 5, assigned in the order the territories were added to its system. Exposure and claims by territory:

| Territory code | Exposure | Claims | Claim frequency |
|---|---|---|---|
| 1 | 4,000 | 240 | 0.0600 |
| 2 | 4,000 | 380 | 0.0950 |
| 3 | 4,000 | 220 | 0.0550 |
| 4 | 4,000 | 360 | 0.0900 |
| 5 | 4,000 | 290 | 0.0725 |

An analyst fits a Poisson GLM with a log link and an offset of $\ln(\text{exposure})$ to these five rows, using the territory code as the only predictor:

```
Coefficients:
            Estimate Std. Error z value Pr(>|z|)
(Intercept) -2.67824    0.06167 -43.428   <2e-16 ***
territory    0.02685    0.01833   1.465    0.143

    Null deviance: 67.620  on 4  degrees of freedom
Residual deviance: 65.472  on 3  degrees of freedom
AIC: 107.03
```

Which conclusion is best supported?

- A) The code was fitted as one slope although its order means nothing; refit territory as categorical
- B) The territory coefficient is not significant at the 5% level, so territory can be dropped from the model
- C) Each step up in territory code raises frequency by about 2.7%, so territory 5 has the highest frequency
- D) The residual deviance of 65.5 on 3 degrees of freedom shows overdispersion; refit the same model as quasi-Poisson
- E) The poor fit shows exposure should be entered as a predictor with an estimated coefficient instead of an offset

## Explanation

Territory is a **nominal** variable that happens to be stored as integers. Entered as a number, it gets a single coefficient, which forces the fitted frequency to change by the same factor, $e^{0.02685} = 1.027$, from each code to the next — a smooth trend across labels whose order was set by the date each territory was added.

The one-way frequencies are not monotone in the code at all: they zig-zag between about 0.055 and 0.095. The slope model averages that pattern into fitted frequencies of 0.0706 to 0.0786, and its residual deviance barely moves from the null deviance:

$$
\begin{aligned}
\Delta D &= 67.620 - 65.472 \\
&= 2.15 \text{ on 1 df}
\end{aligned}
$$

Refitting territory as categorical (4 indicators against a base) reproduces all five frequencies; its drop in deviance from the null model is the full 67.62 on 4 degrees of freedom, far beyond $\chi^2_{0.05,\,4} = 9.49$, and its AIC falls from 107.0 to 47.6. Territory matters a great deal — the numeric coding hid it. The answer is **A**.

**Why not the others**

- **B** — an insignificant slope only says there is no *linear trend in the code*; it says nothing about differences between territories, which are large.
- **C** — reads the code as a measurement; the fitted 2.7% per step is an artefact of the coding, and territory 2, not 5, has the highest observed frequency.
- **D** — the large residual deviance is lack of fit from a misspecified linear predictor, not extra-Poisson variation; quasi-Poisson would only widen the standard errors of the wrong model.
- **E** — the exposures are all equal, so how exposure enters cannot explain the misfit; the problem is how territory enters.
