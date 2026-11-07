---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:d18dc2c119096e7a499c77eb5821f27d167ea73599e62138b509dc5faa148669
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §§1-4, pp.1-12 (whole note), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Lift.md
---

![[Media/Figures/Lift.svg|340]]

**Lift** is the vertical distance between the first and last quantiles of a [[Quantile Plot|simple quantile plot]]: the difference in actual results between the risks a model predicts best and the risks it predicts worst. In insurance it is usually measured as the ratio

> $$L_{\text{ratio}} = \frac{Y_Q}{Y_1}$$

- $Y_1$ and $Y_Q$ are the **actual** target rates in the first and last quantiles, the buckets the model predicts lowest and highest.

It is one of the measures of **model lift**, a model's economic value: its ability to charge each insured an actuarially fair rate, and so to prevent adverse selection. Model lift is relative, measured as one model's lift over another's, and always on [[Holdout Sample|holdout data]]. A large lift means the model can maximally distinguish the best and worst risks.

> [!example]- On decile plots with loss costs divided by the average predicted loss cost, the current rating plan's actual loss costs run from $0.55$ to $1.30$, and a new model's from $0.40$ to $1.60$. What is each plan's lift as a ratio? {Example}
> - The current plan's lift is $1.30/0.55 = 2.36$.
> - The new model's lift is $1.60/0.40 = 4.00$.
> - The new model separates the best and worst risks much further, so it has the greater lift.

## Other measures of the vertical distance

For a binary target, lift can be measured as the odds ratio:

> $$L_{\text{odds ratio}} = \left(\frac{Y_Q}{1 - Y_Q}\right)\left(\frac{1 - Y_1}{Y_1}\right)$$

In some contexts the difference is used:

> $$L_{\text{difference}} = Y_Q - Y_1$$

The MAS-II study note says the exam will not test the calculation of lift as a metric directly. Knowing how the vertical distance can be measured still helps in comparing competing models.

> [!example]- A fraud model's lowest decile has an actual fraud rate of $0.05$ and its highest decile $0.20$. What is its lift as a ratio, an odds ratio and a difference? {Example}
> - The ratio is $0.20/0.05 = 4.0$.
> - The odds ratio is $(0.20/0.80)(0.95/0.05) = 0.25 \times 19 = 4.75$.
> - The difference is $0.20 - 0.05 = 0.15$.

## Measures of model lift

The measures of model lift are:

1. The simple [[Quantile Plot|quantile plot]], judged on predictive accuracy, monotonicity and lift.
2. The [[Double Lift Chart|double lift chart]], which compares two models directly.
3. The loss ratio chart.
4. The [[Gini Index|Gini index]], where a higher Gini index means greater lift.

> [!trap] Lift is read off the actual values
> A model's predictions rise across its own quantiles by construction, because the quantiles are sorted on them. A wide spread of predictions shows nothing. Only the spread of the actual values in the first and last quantiles measures lift.
