---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:164143e21a1dd573bec329b520d47c67048251bfcad4d598676fea4e13b36c7c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Risk.md
---

![[Media/Figures/Model_Risk.svg|340]]

**Model Risk** is the risk of adverse consequences from decisions based on models that are wrong or misused, such as a mis-specified pricing model, a reserving method applied outside its assumptions, a catastrophe model run on poor exposure data, or a correct model whose output is misunderstood. [[OSFI]] treats it as an [[Operational Risk Margin|operational risk]] requiring a formal governance framework, and the [[Canadian Institute of Actuaries (CIA)]] has issued guidance on the actuary's responsibilities.

Model risk has three sources:

1. **Model error.** The model is a wrong representation: an omitted variable, an inappropriate distribution, development factors borrowed from a different line.
2. **Input error.** The model is sound and the data are not. Exposure data with missing or mis-coded locations makes a catastrophe [[Probable Maximum Loss|PML]] meaningless regardless of the model's quality.
3. **Use error.** The output is applied outside its intended scope, or its uncertainty is stripped away as it travels up the organisation. A range presented to a committee as a point estimate is a use error.

> [!example]- What kind of model failure is each of these, and what control would have prevented it? {Example}
> 1. An insurer entering commercial trucking reserves it using its personal auto development factors. Three years later it strengthens reserves by $\$60$ million.
> 2. A catastrophe PML of $\$400$ million is computed from an exposure file in which $18\%$ of locations failed geocoding and were assigned to the province's centroid.
> 3. A pricing model's output range of $+6\%$ to $+14\%$ is presented to the executive committee as "the indication is $+10\%$", and the filing is made at $+10\%$ with no range disclosed.
>
> > [!answer]-
> > - The first is model error. Commercial trucking develops far more slowly and severely than personal auto; borrowing the factors understates the reserve *and* conceals the underpricing, because reported loss ratios look fine while the claims are immature.
> > - Validation would have asked whether the method's assumptions hold for the new line. With no relevant experience, industry benchmarks or an exposure method were needed. This is also the [[PACICC]] failure pattern.
> > - The second is input error. Assigning $18\%$ of exposure to one point creates a spurious concentration if the centroid is in a high-hazard zone, or spuriously removes exposure if it is not, so the PML is not measuring the portfolio.
> > - Data quality standards with a geocoding threshold would have caught it, and the unmatched percentage should be disclosed alongside the PML.
> > - The third is use error. The model was fine, and the uncertainty was discarded between the actuary and the decision. The true indication could be $+6\%$, and the filing over-charges, or $+14\%$, and the business is left [[Onerous Contract|onerous]].
> > - A communication standard requiring ranges and key sensitivities to accompany a selection would have prevented it, which the [[Standards of Practice]] already require.

## The governance framework

OSFI expects a model risk framework with five parts:

1. An inventory of models, with an owner for each.
2. Independent validation before use and periodically thereafter.
3. Documentation sufficient for someone else to reproduce the model.
4. Controls over data and change.
5. Monitoring of performance against actual experience.

**Validation is independent of development.** A model checked only by the person who built it has not been validated, and this is the most common gap found in supervisory reviews.

**Back-testing is the discipline that catches drift**: compare what the model predicted with what happened, by segment, every period. A model that was right when built and has not been checked since is an unmonitored exposure.

Complexity has a cost. Machine learning models can outperform on accuracy while being harder to validate, harder to explain to a policyholder or a regulator, and harder to test for [[Bias in Actuarial Practice|bias]]. The trade-off between accuracy, explainability and fairness is a model risk decision as well as a technical one.

Under the [[Standards of Practice]] the actuary is responsible for the appropriateness of the models used, for data quality, and for communicating limitations and uncertainty. "The model produced it" is not an answer, and the standards say so.

> [!trap] Overlooking use error
> A sound model on good data can still fail when its range reaches the decision as a single number. Check how the output is presented as well as how it was produced.
