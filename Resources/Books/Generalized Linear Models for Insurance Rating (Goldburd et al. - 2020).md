---
Title: "Generalized Linear Models for Insurance Rating"
Authors: "Mark Goldburd, Anand Khare, Dan Tevet, Dmitriy Guller"
Year: "2020"
date: "2020"
Edition: 2nd
Publisher: Casualty Actuarial Society
Type: Monograph
Available from: "[casact.org](https://www.casact.org/monograph/cas-monograph-no-5)"
---
**CAS Monograph No. 5.** On the [[Exam MAS-II (CAS)|MAS-II]] syllabus for objectives C10–C11 — the model-evaluation half of section C — and the standard reference for how a [[Generalized Linear Model]] is actually built into a rating plan.

Where [[An Introduction to Statistical Learning (James et al. - 2021)|James et al.]] supplies the algorithms, this monograph supplies the **insurance context**: what a model has to demonstrate before it can be filed, and the diagnostics an actuary is expected to produce for it.

## What the syllabus takes from it

### Measuring model performance

- Held-out data: train/test splits and [[Cross-Validation|cross-validation]] in a rating context
- [[Quantile Plot|Quantile (lift) plots]] — sorting the holdout by predicted loss cost into equal-exposure buckets and reading ranking and calibration off the result
- Loss ratio charts as the same diagnostic on an existing rating plan

### Comparing candidate models

- [[Lift|Simple lift charts]] and the spread between the best and worst buckets
- The [[Double Lift Chart|double lift chart]] — sorting on the *ratio* of two models' predictions to see where they disagree and which one the actuals favour
- [[Gini Index|Gini coefficient]] and the Lorenz curve as a one-number summary of ranking power

### Classification measures

- The [[Confusion Matrix|confusion matrix]], sensitivity and specificity, and the effect of the decision threshold
- The ROC curve and [[AUROC]], and the relationship $\text{Gini} = 2 \times \mathrm{AUROC} - 1$

### Practical model building

- [[Variable Selection]], [[Interaction|interactions]] and the treatment of [[Categorical Predictor|categorical predictors]]
- [[Offset Variable|Offsets]] for exposure, and the choice of [[Link Function|link]] and error distribution
- Model refinement, validation, and translating a fitted GLM into a [[Rating Algorithm|rating algorithm]]

## Links
- [CAS Monograph No. 5 (Casualty Actuarial Society)](https://www.casact.org/monograph/cas-monograph-no-5)
- [Monograph PDF](https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf)
