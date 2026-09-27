---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:99a18924c04416d578e655f4c39dd12b5012ecdff8715dfab2183eb6294407d2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Leakage.md
---

**Data Leakage** is letting a model see the target, or part of it, during training. It happens directly, through a feature built from the target, or through records correlated with the ones it is validated on. Training and [[Cross-Validation|cross-validation]] performance then overstate how the model will predict future risks, and since leakage is guaranteed to make the model worse, it is designed out of every step of the fit.

> $$x'_{k,(f)} = \frac{\sum_{i \in k,\ \text{fold}(i) \neq f} y_i}{\sum_{i \in k,\ \text{fold}(i) \neq f} e_i}$$

> $$r_i = \frac{y_i}{\hat{y}_i^{(-f(i))}}$$

- The first block is the **out-of-fold** [[Target Encoding|target encoding]] (before credibility) of level $k$ for records in fold $f$: claims $y_i$ over exposure $e_i$, using the level's records in the *other* folds only. The second is a **two-stage residual** built from the cross-validation prediction $\hat{y}_i^{(-f(i))}$, made by the first-stage model trained without record $i$'s fold.
- **The extreme case.** Give a GLM the target itself as a feature and it fits perfectly, learns nothing from the other features, and cannot predict a future risk whose outcome is unknown.
- **Where it creeps in:**
  - *Target encoding.* A thin level's mean response is nearly its own records' outcomes, so encode each validation fold from the other folds. Build one final encoding on all training data for the test set.
  - *Correlated records in different folds.* Renewals of one policy, several cars in one household, one area observed every quarter. Good validation results may only mean the model has seen the same customer. Derive the fold from the policy or customer number, or a hash of it, so a group stays in one fold. Clustered losses such as a parking-lot fire, or a hurricane in one region, need the same care; for weather perils each year can be a fold.
  - *Supervised feature building.* MARS chooses hinge knots by looking at the target, so hinges built on all the data let every fold "see" its validation targets, and the chosen penalty comes out too low. Build them within each fold ([[Hinge Function]]).
  - *[[Two-Stage Model|Two-stage models]].* A first stage that has seen each record's target, at worst a saturated model, "uses up" the signal and leaves the second stage residuals of $1$. Feed the second stage cross-validation predictions.
  - *Features derived from the outcome.* A road-accident model kept an overall deprivation index that is built partly from local accident rates, and a late principal component isolated that part. Including a feature derived from accidents to predict accidents is "the ultimate in leakage."
- **The test set** is kept out of every training decision for the same reason: once a graph or metric from it influences features, structure or parameters, it is no longer a test.

> [!example]- Out-of-Fold Target Encoding {Example}
> A vehicle model has $8$ car-years in the training data, split over four folds of $2$ car-years each, with $1$, $0$, $2$ and $1$ claims in folds 1–4. Compute the raw (pre-credibility) encoding each fold receives, and the encoding used for the test set. Why not simply use the level's overall frequency for every record?
>
> > [!answer]-
> > Each fold's encoding uses the other three folds: $6$ car-years and $4 - (\text{own claims})$ claims.
> >
> > $$
> > \begin{align*}
> > x'_{(1)} &= \frac{0 + 2 + 1}{6} \\
> > &= 0.500 \\[4pt]
> > x'_{(2)} &= \frac{1 + 2 + 1}{6} \\
> > &= 0.667 \\[4pt]
> > x'_{(3)} &= \frac{1 + 0 + 1}{6} \\
> > &= 0.333 \\[4pt]
> > x'_{(4)} &= \frac{1 + 0 + 2}{6} \\
> > &= 0.500 \\[4pt]
> > x'_{\text{test}} &= \frac{4}{8} \\
> > &= 0.500
> > \end{align*}
> > $$
> >
> > The in-sample value $0.500$ would contain each record's own claims. With so little data, a model validated on fold 3 would get a feature partly made of the claims it is being asked to predict, and would look better than it is. Out of fold, fold 3's two claims are invisible to fold 3's encoding. The out-of-fold values run opposite to each fold's own claims: on $8$ car-years the level mean is mostly noise, which is why credibility is applied next.

> [!example]- Cross-Validation Predictions for a Second Stage {Example}
> A first-stage frequency model is accidentally saturated: a record identifier was left in as a feature. Three records in different folds have $4$, $2$ and $6$ claims, and the overall mean is $4$. Compute the second-stage residuals using (a) the first stage's in-sample predictions and (b) its cross-validation predictions, and explain the difference.
>
> > [!answer]-
> > **(a) In-sample.** The saturated model predicts each record exactly:
> >
> > $$
> > \begin{align*}
> > r &= \frac{4}{4},\ \frac{2}{2},\ \frac{6}{6} \\
> > &= 1,\ 1,\ 1
> > \end{align*}
> > $$
> >
> > Every residual is $1$, and the second stage can fit only an intercept, whatever geography or credit signal is really there.
> >
> > **(b) Cross-validation.** Trained without each record's fold, the identifier is useless and each record gets roughly the overall mean of $4$:
> >
> > $$
> > \begin{align*}
> > r &= \frac{4}{4},\ \frac{2}{4},\ \frac{6}{4} \\
> > &= 1.0,\ 0.5,\ 1.5
> > \end{align*}
> > $$
> >
> > Residuals now vary where outcomes differ from what a model that never saw them expects, so a second stage has something to find. The same holds short of saturation: any first stage that has memorized noise in its training data steals signal from the second.

> [!example]- Spotting Leakage in a Validation Design {Example}
> An analyst builds a homeowners frequency model on five years of policy-year records. Renewals appear once per year, and a hurricane struck one county in year 3. Rows are assigned to ten folds at random. A county-level average loss ratio is added as a feature, computed on all five years, and the model's cross-validation [[Pseudo R-Squared|pseudo-R²]] is far above the current plan's. Evaluate the design.
>
> > [!answer]-
> > Three sources of leakage inflate the result:
> >
> > - **Renewals across folds.** The same house sits in training and validation, so the model is partly recognising policies it has seen. Assign folds by policy number, so every renewal of a policy shares a fold.
> > - **The hurricane across folds.** Year 3's county losses sit in every fold, so a large county effect "validates" well and would badly overprice that county next year. Use each year as a fold for weather perils, or treat the event separately.
> > - **The county loss ratio feature.** It is built from the target, including the validation records' own losses. Encode it out of fold, with credibility, as target encoding does.
> >
> > Once these are fixed, the cross-validation figure becomes a fair estimate of generalization error. It may well fall below the current plan's.
