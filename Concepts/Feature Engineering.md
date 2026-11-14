---
aliases:
  - Existing Data
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:813aff69719b437acd78eb8fe46bb02b2e86cb95567962bc97556cbc527f8059
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Feature Engineering.md
---

**Feature Engineering** is creating new predictors, called features, from existing data by transforming, binning, combining, encoding or extracting parts of the variables already in a data set. It lets a model use information it could not reach from the raw columns.

A new feature for record $i$ is a function of that record's existing columns, so it is

> $$x_i^{\text{new}} = h\left(x_{i1}, x_{i2}, \ldots, x_{ip}\right)$$

- $h$ is any function chosen by the analyst rather than estimated from the target.
- $x_{i1}, \ldots, x_{ip}$ are the $p$ existing columns of record $i$.

A feature adds value when it relates to the target more directly, more stably or more interpretably than the inputs it was built from. It must be computable from information that is available when the prediction is made.

> [!example]- What features can be derived from this homeowners file, and what does the ratio add? {Example}
> A homeowners file for policies effective in 2025 holds the year built, the year the roof was last replaced, Coverage A (the dwelling limit), the square footage and the number of claims in the prior three years.
>
> | Policy | Year built | Roof replaced | Coverage A | Square feet | Prior claims |
> |---|---|---|---|---|---|
> | H1 | 1978 | 2019 | \$380,000 | 2,000 | 0 |
> | H2 | 2012 | 2012 | \$300,000 | 2,500 | 2 |
> | H3 | 1995 | 2003 | \$520,000 | 2,600 | 1 |
>
> > [!answer]-
> > - Using 2025 as the policy year, the home ages are 47, 13 and 30 years.
> > - The roof ages are 6, 13 and 22 years.
> > - Coverage per square foot is $380{,}000/2{,}000 = 190$ for H1, $300{,}000/2{,}500 = 120$ for H2 and $520{,}000/2{,}600 = 200$ for H3.
> > - A claim-free indicator is 1 for H1 and 0 for H2 and H3.
> > - By home age H1 looks the riskiest, but its roof, the part most exposed to wind and hail, is the newest of the three.
> > - If rebuilding costs about \$200 a square foot, as the other two policies suggest, H2 would need about \$500,000 of coverage, so it may be underinsured ([[Insurance to Value|insurance to value]]).
> > - The ratio flags H2's possible underinsurance, which neither Coverage A nor the square footage shows alone.

## Feature engineering techniques

| Technique | Insurance example | What it gives the model |
|---|---|---|
| Transformation | $\ln(\text{amount of insurance})$ | A proportional effect, less skew |
| Binning | Driver age in bands | A non-linear shape in a few levels |
| Combining levels | Rare vehicle makes merged into "Other" | Enough data per level |
| Ratio | Coverage per square foot | A relative measure neither column holds |
| Date parts | Month of loss, years since first policy | Seasonality and tenure |
| Interaction | Young driver $\times$ sports car | An effect that depends on another variable |
| Encoding | Territory as $k - 1$ indicators | A categorical variable in numeric form |
| Unsupervised | Principal component scores, cluster labels | Many correlated inputs compressed into a few |

Many features come from [[Variable Transformation|variable transformations]] and [[Interaction|interactions]] suggested by [[Exploratory Data Analysis|exploratory plots]]. The most valuable often come from knowing how losses arise, such as the age of a roof rather than of the house for wind and hail claims. [[Principal Components Analysis|Principal component]] scores and [[K-Means Clustering|K-means]] or [[Hierarchical Clustering|hierarchical]] cluster labels are features too. Word counts turn text into features ([[Unstructured Data]]), and [[External Data|external data]] can be joined on a key such as postal code.

A tree finds interactions on its own, so a hand-built interaction matters most for a GLM, whose effects are additive on the link scale unless an interaction term is included.

## Encoding a categorical predictor

A [[Categorical Predictor|categorical predictor]] with $k$ levels enters a model as $k-1$ indicator (dummy) variables. The indicator for level $\ell$ of record $i$ is

> $$x_{i\ell} = I\left(\text{level}_i = \ell\right), \quad \ell = 2, \ldots, k$$

- Level 1 is the base level, absorbed into the intercept.

> [!trap] A numeric code is still categorical
> A territory or class code stored as a number is still categorical. Entered as a single numeric feature, it imposes an order and equal steps that the labels do not have.

## Value against cost

Each feature adds a parameter, or several for a categorical one, so a feature that does not lower the hold-out error adds variance and risks [[Overfitting|overfitting]]. A feature that is a near copy of another, such as vehicle age and model year in a single policy year, adds collinearity and no information, so one of the pair should go. A feature earns its place through a reason to expect it to relate to the target and a lower error on held-out data.

A feature recorded only after the outcome, such as a cancellation code or a claim's final payment, leaks the target. It looks excellent in testing and is useless in practice. Features built with the target, such as the average lapse rate of each territory, must be computed from the training data alone, or the [[Train-Test Split|held-out data]] leak into the fit.

> [!example]- Which of these proposed features for a lapse model can be used, and how? {Example}
> A model predicts, at the time the renewal offer is made, whether a policy will lapse. The team proposes four features: (a) the number of missed payments in the current term, (b) the cancellation reason code, (c) the rate change on the renewal offer, and (d) each territory's lapse rate computed from all the data.
>
> > [!answer]-
> > - Missed payments (a) are known when the offer is made, so the feature can be used.
> > - The cancellation reason code (b) is filled in only after a policy lapses, so it encodes the answer and must be dropped.
> > - The rate change (c) is set by the offer, so it is known in advance, and it is the one driver of lapse the insurer controls.
> > - The territory lapse rate (d) uses the target, and computed on all the data it includes the held-out policies' own outcomes. It is valid only if computed from the training data and applied to the other sets, preferably with thin territories combined or credibility-weighted.
> > - Features (a) and (c) can be used as they are, (d) only when rebuilt from the training data, and (b) not at all.
