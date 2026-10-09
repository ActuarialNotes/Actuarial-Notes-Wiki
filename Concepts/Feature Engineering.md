---
aliases:
  - Existing Data
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:25f974d3fda4821f6725ce993f44443d9975f5c3aff31962f284f5cec87c346e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Feature Engineering.md
---
**Feature engineering** is creating new predictors (features) from existing data: transforming, binning, combining, encoding or extracting parts of the variables already in a data set, so that a model can use information it could not reach from the raw columns. A feature adds value when it relates to the target more directly, more stably or more interpretably than the inputs it was built from, and it must be computable from information that is available when the prediction is made.

> $$x_i^{\text{new}} = h\left(x_{i1}, x_{i2}, \ldots, x_{ip}\right)$$

> $$x_{i\ell} = I\left(\text{level}_i = \ell\right), \quad \ell = 2, \ldots, k$$

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

- **Symbols:** $h$ is any function of the existing columns of record $i$, chosen by the analyst rather than estimated from the target. The second block is the indicator (dummy) coding of a [[Categorical Predictor|categorical predictor]] with $k$ levels, in which level 1 is the base and is absorbed into the intercept.
- **Where features come from:** Many come from [[Variable Transformation|variable transformations]] and [[Interaction|interactions]] suggested by [[Exploratory Data Analysis|exploratory plots]], and the most valuable often come from knowing how losses arise, such as the age of a roof rather than of the house for wind and hail claims. [[Principal Components Analysis|Principal component]] scores and [[K-Means Clustering|K-means]] or [[Hierarchical Clustering|hierarchical]] cluster labels are features too, word counts turn text into features ([[Unstructured Data]]), and [[External Data|external data]] can be joined on a key such as postal code.
- **Value against cost:** Each feature adds a parameter, or several for a categorical one, so a feature that does not lower the hold-out error adds variance and risks [[Overfitting|overfitting]]. Features built with the target, such as the average lapse rate of each territory, must be computed from the training data alone, or the [[Train-Test Split|held-out data]] leak into the fit.

> [!example]- Deriving Features for a Homeowners Model {Example}
> A homeowners file for policies effective in 2025 holds the year built, the year the roof was last replaced, Coverage A (the dwelling limit), the square footage, and the number of claims in the prior three years.
>
> | Policy | Year built | Roof replaced | Coverage A | Square feet | Prior claims |
> |---|---|---|---|---|---|
> | H1 | 1978 | 2019 | \$380,000 | 2,000 | 0 |
> | H2 | 2012 | 2012 | \$300,000 | 2,500 | 2 |
> | H3 | 1995 | 2003 | \$520,000 | 2,600 | 1 |
>
> Derive the home age, the roof age, the coverage per square foot and a claim-free indicator, and say what the ratio adds.
>
> > [!answer]-
> > Each feature is a function of one row's columns, using 2025 as the policy year.
> > $$
> > \begin{align*}
> > \text{Home age (H1, H2, H3)} &= 47,\ 13,\ 30 \\
> > \text{Roof age (H1, H2, H3)} &= 6,\ 13,\ 22 \\
> > \text{Coverage per sq ft (H1)} &= \frac{380{,}000}{2{,}000} \\
> > &= 190 \\
> > \text{Coverage per sq ft (H2)} &= \frac{300{,}000}{2{,}500} \\
> > &= 120 \\
> > \text{Coverage per sq ft (H3)} &= \frac{520{,}000}{2{,}600} \\
> > &= 200
> > \end{align*}
> > $$
> > The claim-free indicator is 1 for H1 and 0 for H2 and H3. By home age H1 looks the riskiest, but its roof, the part most exposed to wind and hail, is the newest of the three. Coverage per square foot flags H2: if rebuilding costs about \$200 a square foot, as the other two policies suggest, H2 would need about \$500,000 of coverage, so it may be underinsured ([[Insurance to Value|insurance to value]]). Neither Coverage A nor the square footage shows this alone.

> [!example]- Which Proposed Features Leak? {Example}
> A model predicts, at the time the renewal offer is made, whether a policy will lapse. The team proposes four features: (a) the number of missed payments in the current term, (b) the cancellation reason code, (c) the rate change on the renewal offer, and (d) each territory's lapse rate computed from all the data. Which can be used, and how?
>
> > [!answer]-
> > - **(a) Missed payments:** These are known when the offer is made, so the feature can be used.
> > - **(b) Cancellation reason:** The code is filled in only after a policy lapses, so it encodes the answer and would score almost perfectly in testing and fail in use. It must be dropped.
> > - **(c) Rate change:** The offer sets it, so it is known in advance, and it is the one driver of lapse the insurer controls.
> > - **(d) Territory lapse rate:** It uses the target, and, computed on all the data, it includes the held-out policies' own outcomes. It is valid only if it is computed from the training data and applied to the other sets, preferably with thin territories combined or credibility-weighted.

> [!tip]- How it appears on the exam
> - **PA** asks candidates to create features from existing data that may add value, in written tasks set on a business problem. A task describes a data set and asks which new variables to build and why, or what a proposed feature (a log, a binned variable, an interaction, combined factor levels) does to the model.
> - **Unsupervised features:** The same section of PA applies principal components and clustering to transform data, so a task may ask what the new variables represent and when they help a GLM or a tree.
> - **Justification:** A feature earns its place through a reason to expect it to relate to the target and a lower error on held-out data. A strong answer gives both for a few features rather than listing many.

> [!warning]- Exam traps
> - **Future information:** A feature that is recorded only after the outcome, such as a cancellation code or a claim's final payment, leaks the target. It looks excellent in testing and is useless in practice.
> - **Target-based features on all the data:** Group averages of the response must be computed from the training data alone, or the model has seen the held-out outcomes.
> - **Numeric codes:** A territory or class code stored as a number is still categorical. Entered as a single numeric feature, it imposes an order and equal steps that the labels do not have.
> - **Redundant features:** A feature that is a near copy of another (vehicle age and model year in a single policy year) adds collinearity and no information. One of the pair should go.
> - **Trees and interactions:** A tree finds interactions on its own, so a hand-built interaction matters most for a GLM, whose effects are additive on the link scale unless an interaction term is included.
