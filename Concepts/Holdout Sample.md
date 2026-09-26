---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bd259666ce3208cfef2bd5c6ff61076b498176601c945fb47d599dd9ee9e317a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Holdout Sample.md
---

A **Holdout Sample** is data deliberately kept out of model building so the finished model can be tested on observations it has never seen. [[ASOP 56 - Modeling (ASB - 2019)|ASOP No. 56]] defines hold-out data as "a subset of data that is withheld intentionally when developing a predictive model so that the model may be validated later with data that were not used to develop the model."

> $$\text{Holdout deviance} = \sum_{i \,\in\, \text{holdout}} d\big(y_i, \hat{\mu}_i^{\text{(train)}}\big)$$

- $d(y_i, \hat{\mu}_i)$ is observation $i$'s contribution to the [[Deviance|deviance]], and $\hat{\mu}_i^{\text{(train)}}$ is its prediction from the model fit on the **training** data only. Any loss measure works (squared error for a normal model), but it must be computed on data the fit never used
- Training error always falls as terms are added; holdout error falls, then **rises** once the model starts fitting noise. ASOP 56 calls that **overfitting**: "a model fits the data used to develop the model so closely that prediction accuracy materially decreases when the model is applied to different data." See [[Bias-Variance Tradeoff]]
- **How to split:** a random split (commonly $60$–$80\%$ training) or an **out-of-time** split (fit on earlier years, test on the latest), which also tests stability over time. Split by policy, not by row, so one policy's renewals do not land on both sides
- A **three-way** split keeps a validation set for choosing between candidate models and a test set touched only once, at the end. [[Cross-Validation]] reuses the data more efficiently when the sample is small
- Everything that learns from the response must use the training data only. That includes [[Variable Selection|selecting variables]], banding them, and tuning. Otherwise the holdout has already influenced the model
- The CAS post-project summary for PCPA lists **not holding out data** (no train/test split or cross-validation), and **not stating how the data were split**, among the most common mistakes. Validation exhibits belong on the holdout data, and the report should say so

> [!example]- Setting Up a Train/Test Split {Example}
> A personal auto data set has $250{,}000$ policy-years. The analyst uses a $70/30$ random split by policy. How many policy-years land in each part, and what should the report say about it?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Training} &= 0.70 \times 250{,}000 = 175{,}000 \\
> > \text{Holdout} &= 0.30 \times 250{,}000 = 75{,}000
> > \end{align*}
> > $$
> > The report should state the split in one line — "$70\%$/$30\%$ random sample by policy, seed fixed for reproducibility." It should also confirm that every validation exhibit (the [[Quantile Plot|lift plot]], the [[Double Lift Chart|double lift chart]], the Gini index) was built on the $75{,}000$ holdout policy-years.

> [!example]- Reading Training vs. Holdout Deviance {Example}
> Three frequency models give (training deviance, holdout deviance): Model A $(10{,}480,\ 4{,}520)$; Model B $(10{,}310,\ 4{,}470)$; Model C $(9{,}950,\ 4{,}610)$. Which should be selected?
>
> > [!answer]-
> > **Model B.** Training deviance falls steadily from A to C, as it always does when terms are added. Holdout deviance is lowest for B ($4{,}470$) and rises again for C ($4{,}610$). C's gains on the training data are fitted noise that does not carry over to new data. That is overfitting in exactly the sense ASOP 56 defines.
