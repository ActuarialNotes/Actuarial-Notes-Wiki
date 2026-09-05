---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7c1ecc251757f2d463f6cfe6fc0bec4d64111f59ad6fa6cead243395ff632bdd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Contract Boundary.md
---

**The Contract Boundary** is the point beyond which future cash flows are **not** part of an existing insurance contract. Under [[IFRS 17]], cash flows are within the boundary while the insurer can compel the policyholder to pay premiums or has a substantive obligation to provide coverage — and the boundary ends when the insurer can reprice the contract or portfolio to fully reflect the risks.

> $$\text{Within boundary} \iff \text{insurer cannot fully reprice for the risk}$$

- **The repricing test** is the operative one. If at renewal the insurer can set a price that fully reflects the risks of that policyholder (or of the portfolio containing them), the renewal is a **new contract**, and its cash flows are outside the current contract's boundary.
- **Consequence for P&C:** most annual policies have a boundary of one year, because the insurer can reprice at renewal. Expected renewals are therefore **not** in the measurement — no matter how certain the insurer is that the policyholder will renew.
- **Guaranteed renewability breaks this.** Where a contract obliges the insurer to renew at a price that cannot reflect deterioration in the individual risk, the boundary extends beyond the stated term, and the measurement must project all the way to the point the insurer regains repricing power.
- **The boundary determines the model too.** A one-year boundary makes a group [[Premium Allocation Approach|PAA]]-eligible automatically; an extended boundary can push a nominally annual product into the [[General Measurement Model|GMM]].
- **[[Insurance Acquisition Cash Flows]] are the exception that proves the rule.** Costs of acquiring *expected renewals* are outside the boundary of the current contract, yet IFRS 17 permits allocating some acquisition cost to those anticipated renewals — which is why an acquisition cash flow asset can exist for contracts not yet written.
- **Judgement, not arithmetic.** Whether the insurer can "fully reprice" is a legal and practical question — regulatory constraints on repricing ([[Rate Regulation]]) can restrict it, and a filed-rate regime that prevents individual repricing is an argument for a longer boundary.

> [!example]- Where Does the Boundary Fall? {Example}
> Determine the contract boundary in each case.
>
> 1. A twelve-month homeowner policy, renewable annually at the insurer's discretion.
> 2. A twelve-month group accident policy where the insurer has guaranteed the rate for three years.
> 3. A commercial liability policy in a province where the regulator must approve any rate change and has historically refused increases above inflation.
> 4. A multi-year construction policy with a single premium and no repricing right.
>
> > [!answer]-
> > 1. **Twelve months.** The insurer can reprice or decline at renewal, so the boundary is the policy term. Expected renewals are new contracts.
> > 2. **Three years.** The rate guarantee removes the repricing right for two further years, so the boundary extends to the end of the guarantee. The group is unlikely to be PAA-eligible without demonstration, and the measurement must project claims over the full three years.
> > 3. **Judgement, and the interesting case.** Regulatory approval delay is not the same as an inability to reprice — if the insurer has a *right* to file for a rate reflecting the risk, the boundary is the policy term even if approval is slow or grudging. But where the regulation genuinely prevents pricing to the risk (a mandated rate, a prohibition on repricing an individual), the argument for an extended boundary is real. The conclusion must be documented, because it changes both the measurement model and the [[Onerous Contract|onerous]] assessment.
> > 4. **The full construction period.** A single premium and no repricing right put every year's cash flows inside the boundary, forcing the [[General Measurement Model|GMM]] and a full multi-year projection.
> >
> > The pattern: **the boundary is set by the insurer's power to reprice, not by the policy's stated term.**
