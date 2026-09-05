---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c35f61fafc498e5afed0ad0514ff91996c4f05236024378530abf27c96a9ea1a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bias in Actuarial Practice.md
---

**Bias in Actuarial Practice** is the risk that a rating model, reserving analysis or automated decision system produces systematically different outcomes for a protected group without a cost justification — even when the protected characteristic is absent from the model. It is distinct from statistical [[Bias|estimator bias]] and is now an explicit professionalism topic in Canada, addressed in CIA guidance on bias in actuarial work.

- **Omitting the variable is not enough.** In a model with many correlated inputs, a prohibited characteristic can be reconstructed from permitted ones — postal code, occupation, vehicle, credit-adjacent data — so the model reproduces the prohibited effect without ever seeing it. This is **proxy discrimination**, and it is invisible to an input audit.
- **Testing means looking at outputs.** The practical method is to obtain or infer group membership *for testing purposes only* and compare predicted relativities, loss ratios and decline rates across groups. A difference in predicted premium that is not matched by a difference in observed loss is the signal.
- **Definitions of fairness conflict mathematically.** Equal average premium, equal loss ratio by group and equal treatment of identical risks cannot generally all hold at once. The actuary's job is to state which definition a filing is using, not to pretend a single objective "fair" exists.
- **Data bias upstream.** Historical claims data reflects historical decisions — where claims were investigated, which were denied, which neighbourhoods were policed or served — so a model trained on it can inherit patterns that are not cost-based. [[Loss Development]] and territory data are both exposed to this.
- **Governance.** Bias testing belongs in the [[Model Risk]] framework: documented at build, tested before deployment, monitored after, and disclosed to the regulator on request. The [[Standards of Practice]]' requirement that work be reasonable and communicated clearly is the professional hook.
- The three-way tension to be able to articulate: **accuracy** (the model predicts cost), **fairness** (the model does not disadvantage a protected group without cost justification), and **explainability** (the customer can be told why they pay what they pay). Complex models buy accuracy at the expense of the other two.

> [!example]- A Model With No Prohibited Variables {Example}
> An insurer builds a GLM for auto rating. Sex, age, race and credit score are excluded. Post-implementation testing shows that policyholders in three postal-code clusters — which happen to be the province's most racially diverse — are charged relativities averaging $1.34$, while their observed loss ratio is in line with the rest of the book.
>
> What has happened, and what should the actuary do?
>
> > [!answer]-
> > **What happened.** The model is charging those clusters more than their experience warrants. If the relativity were cost-justified, the higher premium would be matched by higher losses and the loss ratio would be *in line* — which it is, meaning the extra premium has no loss behind it. Some combination of correlated variables is standing in for area characteristics rather than for cost, and the effect concentrates in those clusters.
> >
> > **What to do, in order:**
> >
> > 1. **Diagnose, don't assume.** Decompose the $1.34$ into contributing variables. If one variable drives it and has no causal cost story, that is the proxy.
> > 2. **Test the alternative.** Refit without the suspect variable and measure the loss in predictive power. Often the loss is small — the variable was adding separation, not signal.
> > 3. **Re-examine the data.** An in-line loss ratio with a high relativity can also mean the *exposure* or premium data for those areas is wrong.
> > 4. **Document and escalate.** This is a filing and conduct exposure under [[Unfair Discrimination]], not just a modelling nicety. It belongs in front of the pricing committee and, if the model is in use, the regulator.
> >
> > What is not acceptable is the defence that "the algorithm found it." Under the [[Standards of Practice]] the actuary is responsible for the model's output, and an unexplainable relativity concentrated on a protected group is the case the guidance was written for.
