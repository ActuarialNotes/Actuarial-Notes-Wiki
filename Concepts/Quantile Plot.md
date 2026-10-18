---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:b9961cf8533dd7dcec4f3bb3439ddfe701b7749947abdcc66268140c536f1c98
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Quantile Plot.md
---

A **quantile plot** (or lift chart by predicted quantile) sorts a held-out dataset by predicted loss cost, splits it into equal-exposure buckets, and plots the actual against the predicted average in each. It is the standard first look at whether a rating model separates risk.

> $$\text{sort by } \hat{y}_i,\ \text{split into } q \text{ equal-exposure buckets, plot } \bar{y}_b \text{ and } \overline{\hat{y}}_b$$

- Three criteria pick the winning model: **predictive accuracy** — does each bucket's actual match its predicted level? — **monotonicity** — do the actuals rise across the buckets (small reversals are okay)? — and the **vertical distance** between the first and last quantiles
- A model can rank well and be badly calibrated (bars rise but sit above the predicted line throughout), or be well calibrated on average and rank nothing (flat bars at the overall mean)
- That vertical distance is the model's **[[Lift|lift]]**: a large difference between the actual pure premium in the lowest and highest buckets means the model can maximally distinguish the best and worst risks
- Buckets are **equal exposure**, not equal count
- Must be built on **held-out** data; on training data the plot flatters the more flexible model. Two models are compared on their two quantile plots; a [[Double Lift Chart]] compares them directly

![[Media/Figures/Quantile_Plot.svg|340]]

> [!example]- Does the Model Rank Risk? {Example}
> Five equal-exposure quintiles of a held-out set give actual loss costs, relative to the average prediction, of 0.68, 0.84, 0.97, 1.11, 1.42 against predicted 0.71, 0.86, 0.98, 1.12, 1.33. What does the plot say?
>
> > [!answer]-
> > **Ranking is good** — actuals rise monotonically across all five buckets, and the spread from 0.68 to 1.42 is genuine lift of roughly $1.42/0.68 = 2.1\times$.
> > **Calibration is good in the middle, weak in the top bucket** — the model predicts 1.33 where 1.42 emerged, under-predicting the worst risks by about 7%.
