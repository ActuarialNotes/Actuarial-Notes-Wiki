---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:8f62bb440001aba2e3da33d6040727cf036e45613bdc1e696a3553c6e573adca
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §5.1 Cross-Validation (printed pp.198-206, PDF pp.207-215); §6.1.3 'Validation and Cross-Validation' (printed p.235, PDF p.243); §6.5.1 lab (printed p.271, PDF p.279), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §4.3.1 out-of-time validation PDF p.50; §4.3.4 cross validation PDF pp.51-52, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Cross-Validation.md
---

**Cross-Validation** estimates how well a model predicts **new** data by repeatedly holding part of the sample out of the fit and scoring the model on it. It measures test error directly, rather than penalizing complexity indirectly as [[AIC]] and [[BIC]] do.

> $$\text{CV}_{(k)} = \frac{1}{k}\sum_{j=1}^{k} \text{MSE}_j$$

> $$\text{CV}_{(n)} = \frac{1}{n}\sum_{i=1}^{n}\left(\frac{y_i - \hat{y}_i}{1 - h_{ii}}\right)^{2} \qquad \text{(LOOCV, linear model)}$$

- **$k$-fold**: split the data into $k$ equal parts, fit on $k-1$ and score on the held-out fold, then rotate. $k = 5$ or $10$ is the standard choice, a bias–variance compromise: each fit uses $(k-1)n/k$ observations, so the bias is modest, and the $k$ training sets overlap less than LOOCV's, so the estimate has lower variance — at a cost of only $k$ fits
- **Leave-one-out** ($k = n$) is nearly unbiased but has high variance and is expensive — except in a linear model, where the shortcut above gets it from a single fit using the leverages $h_{ii}$
- Cross-validation is what turns the [[Bias-Variance Tradeoff]] into a decision: training error falls monotonically with complexity, while CV error is U-shaped, and its minimum marks the right model size
- It compares **non-nested** models freely (a GLM against a tree, different link functions, different sets of predictors) where a [[Likelihood Ratio Test]] cannot
- Every step that touches the response — [[Variable Selection]], banding a variable by its indicated relativities, tuning a penalty — must sit **inside** the fold, or the held-out data has already influenced the fit and the CV error is optimistic
- With time-ordered data, random folds leak the future into the past; use a rolling-origin split, and for grouped data (repeated policies) hold out whole groups

![[Media/Figures/Cross-Validation.svg|340]]

> [!example]- Choosing Model Complexity by CV Error {Example}
> Five candidate models give training MSE of $520, 410, 350, 320, 305$ and 10-fold CV MSE of $530, 430, 395, 415, 470$. Which model should be selected?
>
> > [!answer]-
> > **Model 3.** Training error keeps falling as terms are added — it always does — but CV error bottoms out at $395$ and rises afterwards. Models 4 and 5 are fitting noise: the gap between training ($305$) and CV error ($470$) for model 5 is the overfitting made visible.

> [!example]- Leaking the Response into the Folds {Example}
> An analyst screens $200$ candidate predictors on the full data set, keeps the $10$ with the strongest correlation to the response, then runs 10-fold CV on a model using those $10$. Why is the resulting error too low?
>
> > [!answer]-
> > The screening step used **every** observation, including the ones later held out, so the selected predictors are already tuned to the whole sample — the held-out folds are not new data. The correct procedure repeats the screening **inside each fold**, selecting from the $200$ using only that fold's training rows. Done properly, the CV error is typically much higher, and often the ten "strong" predictors turn out to be noise.
