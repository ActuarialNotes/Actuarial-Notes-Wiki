---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e286adc9ab94e9bc6150859f4b310d8698563fec19b59dbd51e054067e3de3a5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Contract Boundary.md
---

![[Media/Figures/Contract_Boundary.svg|340]]

The **Contract Boundary** is the point beyond which future cash flows are not part of an existing insurance contract. Under [[IFRS 17]], cash flows are within the boundary while either:

1. the insurer can compel the policyholder to pay premiums, or
2. the insurer has a substantive obligation to provide coverage.

The obligation ends, and with it the boundary, when the insurer can reprice the contract, or the portfolio containing it, to fully reflect the risks.

The repricing test is the one that decides most cases. If at renewal the insurer can set a price that fully reflects the risks of that policyholder or of its portfolio, the renewal is a new contract, and its cash flows are outside the current contract's boundary.

## Annual P&C policies

Most annual P&C policies have a boundary of one year, because the insurer can reprice at renewal. Expected renewals are therefore not in the measurement, however certain the insurer is that the policyholder will renew. A one-year boundary makes a group eligible for the [[Premium Allocation Approach|PAA]] automatically.

## Guaranteed renewability

Where a contract obliges the insurer to renew at a price that cannot reflect deterioration in the individual risk, the boundary extends beyond the stated term. The measurement must then project to the point the insurer regains the power to reprice. An extended boundary can push a nominally annual product into the [[General Measurement Model|GMM]].

## Acquisition cash flows for expected renewals

The costs of acquiring expected renewals are outside the boundary of the current contract. IFRS 17 nevertheless permits allocating some [[Insurance Acquisition Cash Flows|acquisition cash flows]] to those anticipated renewals, which is why an acquisition cash flow asset can exist for contracts not yet written.

## Regulatory constraints on repricing

Whether the insurer can fully reprice is a legal and practical question. [[Rate Regulation]] can restrict repricing, and a filed-rate regime that prevents individual repricing is an argument for a longer boundary.

> [!example]- Where does the contract boundary fall for each of these four policies? {Example}
> 1. A twelve-month homeowners policy, renewable annually at the insurer's discretion.
> 2. A twelve-month group accident policy whose rate the insurer has guaranteed for three years.
> 3. A commercial liability policy in a province where the regulator must approve any rate change and has historically refused increases above inflation.
> 4. A multi-year construction policy with a single premium and no repricing right.
>
> > [!answer]-
> > - Policy 1: twelve months. The insurer can reprice or decline at renewal, so expected renewals are new contracts.
> > - Policy 2: three years. The guarantee removes the repricing right for two further years, so the measurement projects claims over all three, and the group is unlikely to be PAA-eligible without demonstration.
> > - Policy 3: a judgement. A slow approval is not an inability to reprice, so if the insurer has the right to file a rate that reflects the risk, the boundary is the policy term.
> > - Policy 3, continued: where regulation genuinely prevents pricing to the risk (a mandated rate, a ban on repricing an individual), the case for an extended boundary is real. The conclusion is documented, because it changes the measurement model and the [[Onerous Contract|onerous]] assessment.
> > - Policy 4: the full construction period. A single premium and no repricing right put every year's cash flows inside the boundary, which forces the [[General Measurement Model|GMM]].

> [!trap] Setting the boundary by the stated policy term
> The boundary is set by the insurer's power to reprice, not by the policy's term. A twelve-month policy with a three-year rate guarantee has a three-year boundary.
