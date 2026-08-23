---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5fe34bc2e38764ebff0fc0c8493ec88b862dc4eaf4b611bd0a9572ac4f32469d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Double Lift Chart.md
---

A **double lift chart** compares two candidate models directly by sorting the data on the *ratio* of their predictions and plotting each model's average prediction against the actual over that sort. Where a single [[Lift|lift chart]] asks "is this model any good?", a double lift chart asks "**which of these two is better, and where?**"

> $$\text{sort by } r_i = \frac{\hat{y}_i^{\text{(model A)}}}{\hat{y}_i^{\text{(model B)}}}, \quad \text{bucket, then plot } \frac{\overline{\hat{y}}^{A}}{\bar{y}},\ \frac{\overline{\hat{y}}^{B}}{\bar{y}} \text{ per bucket}$$

- Sorting on the ratio isolates the risks the two models **disagree** about — the left buckets are where B predicts more than A, the right where A predicts more
- The winner is the model whose curve tracks the **actual** line across the buckets; the loser bends away at the ends, where the disagreement is largest
- Everything is normalized to the overall average so a systematic level difference does not mask the shape
- Requires a **held-out** dataset — on training data the more flexible model wins by construction
- Complements the other comparison tools: a [[Quantile Plot]] or [[Lift]] chart scores one model at a time, [[AUROC]] and the [[Gini Index]] give a single number and no picture of *where* the models differ

![[Media/Figures/Double_Lift_Chart.svg|340]]

> [!example]- Reading a Double Lift Chart {Example}
> Buckets sorted by (new model / current model): in the leftmost bucket the actual loss ratio is 0.78, the new model predicts 0.80 and the current 1.02. In the rightmost, actual 1.31, new 1.28, current 1.05. Which model wins?
>
> > [!answer]-
> > **The new model.** Where the two disagree most, the new model's predictions land on the actuals (0.80 vs 0.78; 1.28 vs 1.31) while the current model stays flat near 1.0 in both tails — it is failing to separate exactly the risks the new model has identified.
> > The current model's flat curve is the signature of the loser: the disagreement is real signal, and the model that misses it is under-predicting the good risks and over-predicting the bad.
