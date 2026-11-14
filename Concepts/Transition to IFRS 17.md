---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:60a3c6a7974270e1779f298239c3f940217aa1ea74756b4951b2e9a45c233489
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Transition to IFRS 17.md
---
![[Media/Figures/Transition_to_IFRS_17.svg|340]]

The **Transition to IFRS 17** is the restatement of existing insurance contracts onto the new measurement basis at the date of initial application. Three approaches are permitted, in a strict hierarchy:

1. **Full retrospective application (FRA)** is the default.
2. **Modified retrospective approach (MRA)** may be used only where FRA is impracticable.
3. **Fair value approach (FVA)** may be chosen in place of the MRA wherever FRA is impracticable.

Under FRA, every group is measured as if IFRS 17 had always applied. The [[Contractual Service Margin|CSM]] is reconstructed at original inception and rolled forward through every period, and comparatives are restated. FRA is required unless it is impracticable, which under IAS 8 means the entity cannot apply it after making every reasonable effort.

The MRA is permitted only where FRA is impracticable, and only to the extent reasonable and supportable information exists. It uses specified simplifications to approximate what FRA would have produced, and its objective is to get as close to FRA as the available information allows.

Under the FVA, the CSM at transition is the difference between the fair value of the group and its fulfilment cash flows. It requires far less historical data.

> [!example]- Which transition approach applies to each of these three books? {Example}
> An insurer holds three books at transition:
>
> 1. Annual personal lines contracts, all written within the last twelve months.
> 2. A book of ten-year commercial contracts written since 2009, with complete historical pricing and cash flow data.
> 3. A book of long-duration contracts acquired in a 2011 business combination, for which the original inception assumptions were never retained.
>
> > [!answer]-
> > - Book 1 takes full retrospective application, trivially. The contracts are [[Premium Allocation Approach|PAA]]-measured with no CSM, and the [[Liability for Remaining Coverage|LRC]] is essentially unearned premium less acquisition cash flows, so there is nothing to reconstruct. The [[Liability for Incurred Claims|LIC]] is remeasured at current [[IFRS 17 Discount Rates|discount rates]], with a [[Risk Adjustment for Non-Financial Risk|risk adjustment]] replacing the previous margins.
> > - Book 2 takes full retrospective application, and it is mandatory. The data exist, so FRA is not impracticable. Cost alone does not establish impracticability, so the insurer may not elect a simpler approach because FRA is expensive.
> > - Book 3 takes the fair value or the modified retrospective approach. Without the original inception assumptions, FRA is genuinely impracticable. The MRA needs reasonable and supportable information for its simplifications, which may also be missing, and then the FVA is the practical answer, since it needs only a current fair value and current fulfilment cash flows.
> > - The judgement to document is impracticability for book 3, because it is the gateway to the simpler approaches. An insurer asserting impracticability must show what it tried.

## Transition for P&C insurers

Transition matters less for P&C insurers than for life insurers. Most Canadian P&C business is short-duration and PAA-measured, so there is little or no CSM to reconstruct. The complexity lands on long-duration contracts and on multi-year [[Reinsurance Contracts Held|reinsurance held]].

## Effect on equity and future profit

The choice of approach changes reported equity and future profit. A higher CSM at transition means more profit deferred into future periods and lower opening equity, and a lower CSM means the reverse. Two insurers with identical books can choose differently, so IFRS 17 requires disclosure of the transition approach and a reconciliation of the CSM by approach. Because the FVA CSM can differ substantially from what FRA would have produced, the disclosure lets a reader see how much of the reported CSM rests on it.

## Capital transition in Canada

[[OSFI]] set transitional arrangements for the [[MCT]] so that the capital effect of transition was phased in rather than landing in a single quarter.

> [!trap] Treating cost as impracticability
> An insurer cannot move to the modified retrospective or fair value approach because full retrospective application is expensive. Impracticable means it cannot be done after every reasonable effort, so where the data exist, FRA is required.
