---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0aeebc40feb95d95d5d5d03a562c90d323a1d5e819ebaa4b081f1bea8c4a7b61
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium Allocation Approach.md
---

![[Media/Figures/Premium_Allocation_Approach.svg|340]]

The **Premium Allocation Approach** (PAA) is [[IFRS 17]]'s simplified measurement of the [[Liability for Remaining Coverage]] (LRC) for short-duration contracts: premium received less [[Insurance Acquisition Cash Flows|acquisition cash flows]], released to [[Insurance Revenue|insurance revenue]] over the coverage period, much like unearned premium. Almost all Canadian P&C business is measured with it.

Under the PAA, the LRC is

> $$\text{LRC} = \text{Premium received} - \text{Acquisition cash flows} - \text{Revenue recognised}$$

- $\text{Revenue recognised}$ is the premium released to insurance revenue for the coverage provided so far.

There is no [[Contractual Service Margin]]. Profit is not identified separately at inception and emerges as revenue exceeds incurred claims. The [[Onerous Contract|onerous]] test still applies, and an onerous group carries a [[Loss Component|loss component]] recognised immediately.

For a twelve-month policy, the [[General Measurement Model|general measurement model]] (GMM), with its full cash flow projection, CSM and coverage units, gives a number indistinguishable from unearned premium at much greater cost. The PAA keeps the answer and drops the machinery.

## Eligibility

A group qualifies for the PAA if either:

1. Its coverage period is one year or less.
2. The insurer can demonstrate that PAA measurement would not differ materially from the GMM. The demonstration is made at initial recognition, per group, and documented.

The PAA is usually not available for multi-year commercial contracts, extended warranty and surety, some [[Reinsurance Contracts Held|reinsurance held]] arrangements covering multiple underwriting years, and any group whose experience is expected to vary enough over a longer term that the two models would diverge.

> [!example]- Which of these groups are eligible for the PAA? {Example}
> 1. Annual personal automobile policies.
> 2. A five-year construction wrap-up liability policy.
> 3. A three-year commercial property policy with level annual premiums and stable expected claims.
> 4. An excess-of-loss reinsurance treaty covering losses occurring in a single year, with claims paid over eight years.
>
> > [!answer]-
> > - Group 1 is eligible. Its coverage period is one year, so no demonstration is needed.
> > - Group 2 is not eligible without a demonstration, which will almost certainly fail. Over five years, discount rates and claim expectations are revised repeatedly, and the GMM's CSM absorbs those revisions in a pattern materially different from the PAA's straight-line release.
> > - Group 3 may be eligible. Level premiums and stable claims mean the GMM's CSM would release roughly evenly, so the insurer must demonstrate and document at initial recognition that the two models would not differ materially.
> > - Group 4 is eligible on its coverage period of one year, even though claims are paid over eight. The long payout affects the liability for incurred claims, which is measured the same way under either model.

## Practical expedients

Two expedients are available under the PAA, each an accounting policy choice applied consistently:

- Acquisition cash flows may be expensed as incurred if the coverage period is one year or less.
- The LRC need not be discounted if the coverage period is one year or less, or if there is no significant financing component.

> [!trap] Applying the PAA to incurred claims
> The PAA simplifies only the LRC. The [[Liability for Incurred Claims]] is measured identically under both models, as the present value of [[Fulfilment Cash Flows|fulfilment cash flows]] plus the [[Risk Adjustment for Non-Financial Risk|risk adjustment]]. Coverage duration decides the model, and claim duration decides the discounting.
