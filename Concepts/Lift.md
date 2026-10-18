---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:6beb82f0c2389bfb65f66af216f52618a1be0b6ab010937ace2dd8cc6e104cbc
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §§1-4, pp.1-12 (whole note), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Lift.md
---

**Lift**, in the GLM reading, is about rating models. **Model lift** is a model's economic value: its ability to charge each insured an actuarially fair rate, and so to prevent adverse selection. It is a relative concept, measured as one model's lift over another, and always on [[Holdout Sample|holdout data]]. Among the measures of model lift, **lift** itself is the vertical distance between the first and last quantiles of a [[Quantile Plot|simple quantile plot]]. That is the difference in actual pure premium between the risks the model thinks are best and the risks it thinks are worst.

> $$L_{\text{ratio}} = \frac{Y_Q}{Y_1}$$

> $$L_{\text{odds ratio}} = \left(\frac{Y_Q}{1 - Y_Q}\right)\left(\frac{1 - Y_1}{Y_1}\right)$$

> $$L_{\text{difference}} = Y_Q - Y_1$$

- $Y_1$ and $Y_Q$ are the **actual** target rates in the first and last quantiles, the buckets the model predicts lowest and highest
- In insurance (frequency, severity, pure premium, loss ratio) the vertical distance is usually measured as the **ratio**. For a binary target it can be measured as the **odds ratio**, and in some contexts the **difference** is used
- A large lift means the model can maximally distinguish the best and worst risks. It is one of three criteria for picking the winning model from simple quantile plots, with predictive accuracy and monotonicity
- The measures of model lift are the simple [[Quantile Plot|quantile plot]], the [[Double Lift Chart|double lift chart]], the loss ratio chart and the [[Gini Index|Gini index]]
- The MAS-II study note says the exam will not test the calculation of lift as a metric directly. Knowing how the vertical distance can be measured still helps in comparing competing models

![[Media/Figures/Lift.svg|340]]

> [!example]- The Monograph's Decile Plots {Example}
> Goldburd et al. compare the current rating plan with a new model on simple decile plots, with loss costs divided by the average predicted loss cost. The actual loss costs run from $0.55$ to $1.30$ for the current plan and from $0.40$ to $1.60$ for the new model. What is each plan's lift, measured as a ratio?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > L_{\text{current}} &= \frac{1.30}{0.55} = 2.36 \\
> > L_{\text{new}} &= \frac{1.60}{0.40} = 4.00
> > \end{align*}
> > $$
> > The current plan's best risks are $45\%$ below average and its worst only $30\%$ above. The new model separates the extremes much further, so it has the greater lift.
