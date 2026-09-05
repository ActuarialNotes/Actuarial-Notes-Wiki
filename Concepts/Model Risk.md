---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:905162b6f47f831eda333341c613611bbeac0982647942e1bfdb596e0415dc61
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Risk.md
---

**Model Risk** is the risk of adverse consequences from decisions based on models that are wrong or misused — a mis-specified pricing model, a reserving method applied outside its assumptions, a catastrophe model run on poor exposure data, or a correct model whose output is misunderstood. [[OSFI]] treats it as an [[Operational Risk Margin|operational risk]] requiring a formal governance framework, and the [[Canadian Institute of Actuaries (CIA)]] has issued guidance on the actuary's responsibilities.

- **The three sources:**
  - **Model error** — the model is a wrong representation: an omitted variable, an inappropriate distribution, development factors borrowed from a different line.
  - **Input error** — the model is sound and the data are not. Exposure data with missing or mis-coded locations makes a catastrophe [[Probable Maximum Loss|PML]] meaningless regardless of the model's quality.
  - **Use error** — the output is applied outside its intended scope, or its uncertainty is stripped away as it travels up the organisation. A range presented to a committee as a point estimate is a use error.
- **The governance framework** OSFI expects: an inventory of models with an owner for each; independent **validation** before use and periodically thereafter; documentation sufficient for someone else to reproduce the model; controls over data and change; and monitoring of performance against actual experience.
- **Validation is independent of development.** A model checked only by the person who built it has not been validated, and this is the most common gap found in supervisory reviews.
- **Complexity has a cost.** Machine learning models can outperform on accuracy while being harder to validate, harder to explain to a policyholder or a regulator, and harder to test for [[Bias in Actuarial Practice|bias]]. The trade-off between accuracy, explainability and fairness is a model risk decision, not only a technical one.
- **The actuary's professional obligation.** Under the [[Standards of Practice]] the actuary is responsible for the appropriateness of the models used, for data quality, and for communicating limitations and uncertainty. "The model produced it" is not an answer, and the standards say so.
- **Back-testing is the discipline that catches drift**: compare what the model predicted with what happened, by segment, every period. A model that was right when built and has not been checked since is an unmonitored exposure.

> [!example]- Three Model Failures {Example}
> Diagnose each, and say what control would have prevented it.
>
> 1. An insurer entering commercial trucking reserves it using its personal auto development factors. Three years later it strengthens reserves by $\$60$ million.
> 2. A catastrophe PML of $\$400$ million is computed from an exposure file in which $18\%$ of locations failed geocoding and were assigned to the province's centroid.
> 3. A pricing model's output range of $+6\%$ to $+14\%$ is presented to the executive committee as "the indication is $+10\%$," and the filing is made at $+10\%$ with no range disclosed.
>
> > [!answer]-
> > 1. **Model error.** Commercial trucking develops far more slowly and severely than personal auto; borrowing the factors understates the reserve *and* conceals the underpricing, because reported loss ratios look fine while the claims are immature. **The control:** validation would ask whether the method's assumptions hold for the new line, and the answer — no relevant experience, so use industry benchmarks or an exposure method — would have been obvious. This is also the [[PACICC]] failure pattern.
> > 2. **Input error, and a severe one.** Assigning $18\%$ of exposure to a single point creates a spurious concentration if the centroid is in a high-hazard zone, or spuriously removes exposure if it is not. Either way the PML is not measuring the portfolio. **The control:** data quality standards with a geocoding threshold, and disclosure of the unmatched percentage alongside the PML — the number should never travel without it.
> > 3. **Use error, and the one candidates most often overlook.** The model was fine; the uncertainty was discarded between the actuary and the decision. An $8$-point range means the true indication could be $+6\%$, in which case the filing over-charges, or $+14\%$, in which case it leaves the business [[Onerous Contract|onerous]]. **The control:** a communication standard requiring ranges and key sensitivities to accompany a selection — which is what the [[Standards of Practice]] already require, and what makes this a professionalism failure as much as a technical one.
