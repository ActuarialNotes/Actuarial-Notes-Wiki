---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:fc93120ef9772202dfaa93f51b861eb54eefb596faa5e67c1a1a30ef67d5a8f5
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Earthquake Exposure Risk Margin.md
---

![[Media/Figures/Earthquake_Exposure_Risk_Margin.svg|340]]

The **Earthquake Exposure Risk Margin** is the [[MCT]] requirement that an insurer hold financial resources sufficient to meet its earthquake exposure at a prescribed return period, which under [[OSFI]]'s guidance is the $1$-in-$500$ year [[Probable Maximum Loss|PML]], $\text{PML}_{1/500}$. The part of that loss the insurer must meet from its own capital is

> $$\text{Requirement} = \text{PML}_{1/500} - \text{Reinsurance} - \text{Other resources}$$

- $\text{Reinsurance}$ is the recovery from the insurer's reinsurance programme at that loss, subject to the [[Registered Reinsurance|registration]] and collateral rules.
- $\text{Other resources}$ are any earthquake reserve or premium reserve accumulated, and capital markets instruments such as catastrophe bonds where they genuinely respond.

The earthquake requirement is separate from the [[Insurance Risk Margin|ordinary insurance risk margin]], because factors applied to liabilities capture the cost of business as usual, not a tail event that has not occurred.

> [!example]- Does this insurer meet its earthquake requirement? {Example}
> An insurer's $1$-in-$500$ earthquake PML is $\$520$ million. Its reinsurance programme covers $\$40$ million to $\$420$ million with one reinstatement. It holds an earthquake reserve of $\$25$ million and capital available of $\$310$ million. Its minimum capital required is $\$185$ million.
>
> > [!answer]-
> > - The insurer retains the first $\$40$ million and the $\$520 - \$420 = \$100$ million above the programme, a net $\$140$ million.
> > - The $\$310$ million of capital available covers the retained $\$140$ million, so the requirement is met in the narrow sense.
> > - After the event, capital available falls to roughly $\$310 - \$140 + \$25 = \$195$ million before tax effects.
> > - The [[MCT]] ratio falls from $310/185 = 168\%$ to $195/185 = 105\%$, barely above the minimum.
> > - Extending the programme above $\$420$ million removes the largest unprotected item, and top-layer capacity is the cheapest part of a catastrophe programme per dollar of limit.
> > - Underwriting action in the highest-hazard postal codes, or higher earthquake deductibles, lowers the PML itself.
> > - If the PML were $\$650$ million, the retained loss would be $\$40 + \$650 - \$420 = \$270$ million, so the board needs to see that sensitivity, not only the point estimate.
> > - The insurer meets the requirement, but with little margin after the event.

## Why earthquake is singled out

Canadian earthquake exposure concentrates in two zones, coastal British Columbia and the Quebec City–Montreal–Ottawa corridor, so a single event would strike a large share of the industry at once. It is the archetypal [[Concentration Risk|concentration risk]] and the scenario most likely to exhaust [[PACICC]]'s capacity.

Earthquake insurance penetration in high-hazard Canadian regions is low, so a major event would also produce large uninsured losses and heavy pressure for [[Disaster Financial Assistance Arrangements|government assistance]]. That is the same coverage gap as in [[Flood Insurance|flood insurance]].

## PML data quality

OSFI treats PML data quality as a supervisory matter. It expects documented exposure data, model validation, an understanding of model limitations and a stated basis for the selected PML (see [[Model Risk]]). An insurer that cannot demonstrate the quality of its exposure data cannot demonstrate its PML.

## Reinstatement and the second event

A programme adequate for one event may be exhausted by the aftershock. OSFI expects insurers to consider a second event, and [[FCT]] scenarios frequently test one. A reinstatement covers the second event, but its premium is payable at the worst moment and belongs in the cash flow scenario.

> [!trap] Netting only the retention
> The retained loss includes the exposure above the top of the reinsurance tower as well as the retention. In the example, the $\$100$ million above $\$420$ million is the larger part of the $\$140$ million net.
