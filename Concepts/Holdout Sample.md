---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:90c30eb227bc5e3d8146c7712de94ba6089c9e3c15c0a64defd5805805876dbd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Holdout Sample.md
---

A **Holdout Sample** is data deliberately kept out of model building so the finished model can be tested on observations it has never seen. [[ASOP 56 - Modeling (ASB - 2019)|ASOP No. 56]] defines hold-out data as "a subset of data that is withheld intentionally when developing a predictive model so that the model may be validated later with data that were not used to develop the model."

The deviance of a model on the holdout sample is

> $$\text{Holdout deviance} = \sum_{i \,\in\, \text{holdout}} d\big(y_i, \hat{\mu}_i^{\text{(train)}}\big)$$

- $d(y_i, \hat{\mu}_i)$ is observation $i$'s contribution to the [[Deviance|deviance]].
- $\hat{\mu}_i^{\text{(train)}}$ is observation $i$'s prediction from the model fit on the training data only.

Any loss measure works (squared error for a normal model), but it must be computed on data the fit never used.

## Training error and holdout error

Training error always falls as terms are added. Holdout error falls, then **rises** once the model starts fitting noise. ASOP 56 calls that **overfitting**: "a model fits the data used to develop the model so closely that prediction accuracy materially decreases when the model is applied to different data." Of the candidate models, the one with the lowest holdout error is selected. The trade-off behind this shape is the [[Bias-Variance Tradeoff|bias-variance tradeoff]].

> [!example]- Which of these three frequency models should be selected? {Example}
> The deviances of three frequency models are:
>
> | Model | Training deviance | Holdout deviance |
> | :--- | ---: | ---: |
> | A | 10,480 | 4,520 |
> | B | 10,310 | 4,470 |
> | C | 9,950 | 4,610 |
>
> > [!answer]-
> > - Training deviance falls from A to C, as it always does when terms are added.
> > - Holdout deviance is lowest for B ($4{,}470$) and rises again for C ($4{,}610$).
> > - C's gains on the training data are fitted noise that does not carry over to new data, which is overfitting.
> > - Model B is selected.

## Splitting the data

A random split commonly puts $60$–$80\%$ of the data in training. An **out-of-time** split fits on earlier years and tests on the latest, which also tests stability over time. Either way, the split is made by policy, not by row, so one policy's renewals do not land on both sides.

A **three-way** split keeps a validation set for choosing between candidate models and a test set touched only once, at the end. [[Cross-Validation]] reuses the data more efficiently when the sample is small.

> [!example]- A personal auto data set of $250{,}000$ policy-years is split $70/30$ at random by policy. How many policy-years land in each part? {Example}
> - The training data are $0.70 \times 250{,}000 = 175{,}000$ policy-years.
> - The holdout data are $0.30 \times 250{,}000 = 75{,}000$ policy-years.
> - The report states the split in one line: "$70\%$/$30\%$ random sample by policy, seed fixed for reproducibility."

## Reporting the split

The CAS post-project summary for PCPA lists **not holding out data** (no train/test split or cross-validation), and **not stating how the data were split**, among the most common mistakes. Validation exhibits, such as the [[Quantile Plot|lift plot]], the [[Double Lift Chart|double lift chart]] and the Gini index, belong on the holdout data, and the report says so.

> [!trap] Selecting variables before the split
> Everything that learns from the response must use the training data only. That includes [[Variable Selection|selecting variables]], banding them, and tuning. Otherwise the holdout has already influenced the model, and its error understates the error on new data.
