---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:checker-islr-a
  content_hash: sha256:d6173f2c60e9c405f237ab3d7031b6f4cdbb9ca304a686e62a1d8bc23d2d14ae
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §7.2 and §7.2.1 'Simple Quantile Plots' incl. the three criteria, printed pp.76-78 (PDF pp.86-88), §7.2.2, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Van Calster, McLernon, van Smeden, Wynants & Steyerberg, 'Calibration: the Achilles heel of predictive analytics', BMC Medicine 17:230 (2019), open access, PMC6912996, sections on overfitting and the calibration slope ('estimated risks are too extreme, i.e., too high ... at high risk and too low ... at low risk'), Europe PMC full-text XML sha256:c31e3eb24e490682a92af5c5ff1b197579a09122c867354392e9edce63c1ffaf — https://bmcmedicine.biomedcentral.com/articles/10.1186/s12916-019-1466-7"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Quantile Plot.md
---

![[Media/Figures/Quantile_Plot.svg|340]]

A **Quantile Plot** is a plot of a model's average predicted value against the average actual value in each quantile of a holdout data set, sorted by the model's predictions. It is built in four steps:

1. Sort the holdout data by the model's predicted loss cost.
2. Group it into quantiles of equal exposure.
3. In each quantile, compute the average predicted and the average actual loss cost.
4. Plot the two in each quantile, often each divided by the overall average prediction.

It must be built on holdout data, since on training data it flatters the more flexible model.

> [!example]- In five equal-exposure quintiles of a holdout set, actual loss costs relative to the average prediction are $0.68$, $0.84$, $0.97$, $1.11$ and $1.42$, against predictions of $0.71$, $0.86$, $0.98$, $1.12$ and $1.33$. What does the plot show? {Example}
> - The actuals rise in every quintile, so the model is monotonic.
> - The lift is $1.42/0.68 = 2.09$.
> - Actual and predicted agree within 5% in the first four quintiles, but the model under-predicts the worst risks by $1.42/1.33 - 1 = 7\%$.

## Criteria for the winning model

Three criteria pick the winning model from simple quantile plots:

1. **Predictive accuracy**: how closely the actual value tracks the predicted value in each quantile.
2. **Monotonicity**: the actual values rise from one quantile to the next, small reversals being acceptable.
3. **[[Lift]]**: the vertical distance between the actual values of the first and last quantiles. A large difference means the model can maximally distinguish the best and worst risks.

A narrow range of predictions close to the average is no evidence of accuracy. Each quantile's prediction is judged against what actually emerged in it.

> [!example]- In five quintiles, Model A's actuals are $0.70$, $0.85$, $1.00$, $1.15$, $1.35$, and Model B's are $0.80$, $0.95$, $0.90$, $1.10$, $1.25$. Both track their predictions closely. Which model wins? {Example}
> - Model A is monotonic, and Model B has a reversal from $0.95$ to $0.90$.
> - Model A's lift is $1.35/0.70 = 1.93$, and Model B's is $1.25/0.80 = 1.56$.
> - Model A wins on monotonicity and lift.

## Between the null and saturated models

A model that ranks nothing, the null model, has a flat plot at the overall mean, even though it is well calibrated on average. The saturated model is the most extreme, separating the actual values completely. A practical model's plot lies between the two, with predictions rising across the quantiles. A model can also rank well and be badly calibrated, its actuals rising but sitting above its predictions throughout.

## Comparing two models

Records are sorted by each model's own predictions, so each model's quantiles hold different records and each model needs its own plot. Two models are compared on their two plots, on the same holdout data. A [[Double Lift Chart|double lift chart]] compares them directly.
