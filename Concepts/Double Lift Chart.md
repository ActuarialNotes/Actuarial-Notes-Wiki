---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:25e393170fce45f177fa60aa4c11b0ef5945aa8e4108c2cc77496ec7880ca315
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Double Lift Chart.md
---

A **double lift chart** compares two candidate models directly by sorting the data on the *ratio* of their predictions and plotting each model's average prediction against the actual over that sort. Where a single [[Quantile Plot|lift chart]] asks "is this model any good?", a double lift chart asks "**which of these two is better, and where?**"

> $$\text{sort by } r_i = \frac{\hat{y}_i^{\text{(model A)}}}{\hat{y}_i^{\text{(model B)}}}, \quad \text{bucket, then plot } \frac{\overline{\hat{y}}^{A}_b}{\overline{\hat{y}}^{A}},\ \frac{\overline{\hat{y}}^{B}_b}{\overline{\hat{y}}^{B}},\ \frac{\bar{y}_b}{\bar{y}} \text{ per bucket } b$$

- Sorting on the ratio isolates the risks the two models **disagree** about — the left buckets are where B predicts more than A, the right where A predicts more
- The winner is the model whose curve tracks the **actual** line across the buckets; the loser bends away at the ends, where the disagreement is largest
- Each of the three quantities is divided by its own overall average, so a systematic level difference does not mask the shape
- Requires a **held-out** dataset — on training data the more flexible model wins by construction
- Complements the other comparison tools: a [[Quantile Plot]] scores one model at a time, [[AUROC]] and the [[Gini Index]] give a single number and no picture of *where* the models differ

![[Media/Figures/Double_Lift_Chart.svg|340]]

> [!example]- Reading a Double Lift Chart {Example}
> Buckets sorted by (new model / current model): in the leftmost bucket the actual loss ratio is 0.78, the new model predicts 0.80 and the current 1.02. In the rightmost, actual 1.31, new 1.28, current 1.05. Which model wins?
>
> > [!answer]-
> > **The new model.** Where the two disagree most, the new model's predictions land on the actuals (0.80 vs 0.78; 1.28 vs 1.31) while the current model stays flat near 1.0 in both tails — it is failing to separate exactly the risks the new model has identified.
> > The current model's flat curve is the signature of the loser: the disagreement is real signal, and the model that misses it is over-predicting the good risks and under-predicting the bad.
