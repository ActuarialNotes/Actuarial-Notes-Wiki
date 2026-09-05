---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8e159aa4693e5934589567b7c8c77fff253fe55925572654291fb17284c2450f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unfair Discrimination.md
---

**Unfair Discrimination** in insurance rating is charging different premiums to risks that present the **same expected cost**, or charging on a basis that is legally or socially prohibited. Insurance is inherently discriminatory in the neutral sense — the whole point is to separate risks — so the regulatory standard is not "no discrimination" but *no discrimination unsupported by expected cost and permitted by law*.

> $$\text{Fair} \iff \frac{\text{Premium}_A}{\text{Premium}_B} = \frac{E[\text{Loss}_A]}{E[\text{Loss}_B]}$$

- **Two distinct failures** get confused and should be kept apart:
  - *Rate differences with no cost basis* — price optimisation by elasticity, or a relativity kept because it is profitable rather than because it is indicated. This is unfair discrimination in the classical sense.
  - *Cost-based differences on a prohibited basis* — sex, race, or another characteristic the law excludes, even where the loss data supports the difference. Here the rate is actuarially sound and still unlawful.
- The second is a **policy override**, not an actuarial error, and the actuary's job is to say so plainly: the variable is predictive, its use is prohibited, and the consequence of prohibition is the cross-subsidy quantified in [[Risk Classification Restrictions]].
- **Proxy discrimination** is the live issue. A model that omits a prohibited variable can still reproduce its effect through correlated permitted variables, especially in high-dimensional models. Testing for it means measuring the model's output across the protected groups, not only checking that the variable is absent from the input — see [[Bias in Actuarial Practice]].
- Under the [[Standards of Practice]] and the [[Market Conduct Regulation|fair treatment of customers]] framework, the actuary is expected to be able to **explain** a rate difference in cost terms. A relativity that cannot be explained is a conduct exposure whatever its lift.
- Human rights legislation supplies the outer boundary; insurance statutes and rate filings supply the operational one, and the two are not the same list in every province.

> [!example]- Three Rate Differences {Example}
> Classify each as fair, unfairly discriminatory, or prohibited-though-cost-based.
>
> 1. A driver with two at-fault accidents pays $60\%$ more than an otherwise identical driver with none.
> 2. Two identical risks pay different premiums because one was identified by the model as unlikely to shop at renewal.
> 3. Male drivers aged $18$–$21$ show materially higher pure premiums than female drivers of the same age, and the insurer wishes to reflect it.
>
> > [!answer]-
> > 1. **Fair.** Accident history is causally related to expected loss, objective, verifiable, within the driver's control, and permitted everywhere in Canada. This is textbook acceptable classification.
> > 2. **Unfairly discriminatory.** The premium difference tracks elasticity, not expected cost. Identical risks are charged differently for the same coverage, which fails the definition directly, and Canadian regulators do not accept it in a filing.
> > 3. **Prohibited though cost-based** in provinces that ban sex as a rating variable. The data supports the difference; the law forbids using it. The predictable consequence is a cross-subsidy from young women to young men, and the honest filing states that rather than concealing it in a "years licensed" proxy.
> >
> > Case 3 is where candidates lose marks by arguing the statistics. The statistics are not in dispute; the question is whether the variable is permitted, and it is not.
