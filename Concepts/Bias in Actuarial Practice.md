---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ffac77b91efea64d67d785bfe4b518aa76a449c9c1037b9e3647bd62f67a4f85
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bias in Actuarial Practice.md
---

![[Media/Figures/Bias_in_Actuarial_Practice.svg|340]]

**Bias in Actuarial Practice** is the risk that a rating model, reserving analysis or automated decision system produces systematically different outcomes for a protected group without a cost justification, even when the protected characteristic is absent from the model. It is distinct from statistical [[Bias|estimator bias]], and CIA guidance addresses it as a professionalism topic in Canada.

Bias enters a model in two ways:

1. **Proxy discrimination.** In a model with many correlated inputs, a prohibited characteristic can be reconstructed from permitted ones — postal code, occupation, vehicle, credit-adjacent data — so the model reproduces the prohibited effect without ever seeing it. An audit of the inputs cannot find it.
2. **Data bias.** Historical claims data reflects historical decisions, such as where claims were investigated, which were denied and which neighbourhoods were policed or served. A model trained on it can inherit patterns that are not cost-based. [[Loss Development|Loss development]] and territory data are both exposed to this.

## Testing for bias

Bias is tested on a model's outputs. The actuary obtains or infers group membership for testing purposes only and compares predicted relativities, loss ratios and decline rates across groups. A difference in predicted premium that is not matched by a difference in observed loss is the signal.

> [!example]- What has happened with this auto rating model, and what should the actuary do? {Example}
> An insurer builds a GLM for auto rating that excludes sex, age, race and credit score. Testing after implementation shows that policyholders in three postal-code clusters, the province's most racially diverse, are charged relativities averaging $1.34$. Their observed loss cost per exposure is in line with the rest of the book, so their loss ratio is well below it.
>
> > [!answer]-
> > - A cost-justified relativity of $1.34$ would be matched by losses about $34\%$ higher, leaving the loss ratio in line. Here the losses are average, so the extra premium has no loss behind it.
> > - Some combination of correlated variables is standing in for area characteristics rather than for cost.
> > - Diagnose first. Decompose the $1.34$ into contributing variables. If one variable drives it and has no causal cost story, that is the proxy.
> > - Refit without the suspect variable and measure the loss in predictive power. The loss is often small, because the variable was adding separation rather than signal.
> > - Re-examine the data, since a high relativity with a low loss ratio can also mean the exposure or premium data for those areas is wrong.
> > - Document and escalate. This is a filing and conduct exposure under [[Unfair Discrimination|unfair discrimination]], and it belongs in front of the pricing committee and, if the model is in use, the regulator.
> > - "The algorithm found it" is no defence. Under the [[Standards of Practice|standards of practice]] the actuary is responsible for the model's output.

## Definitions of fairness

Equal average premium, equal loss ratio by group and equal treatment of identical risks cannot generally all hold at once. The actuary states which definition a filing uses rather than claiming a single objective "fair" exists.

A model also trades off three goals:

| Goal | Meaning |
| :--- | :--- |
| Accuracy | The model predicts cost. |
| Fairness | The model does not disadvantage a protected group without cost justification. |
| Explainability | The customer can be told why they pay what they pay. |

Complex models buy accuracy at the expense of the other two.

## Governance

Bias testing belongs in the [[Model Risk|model risk]] framework: documented at build, tested before deployment, monitored after, and disclosed to the regulator on request. The requirement in the [[Standards of Practice|standards of practice]] that work be reasonable and communicated clearly is the professional basis for it.

> [!trap] Auditing the inputs instead of the outputs
> Removing sex, race or another protected characteristic from a model does not remove its effect, because correlated inputs can reconstruct it. The test compares outcomes across groups.
