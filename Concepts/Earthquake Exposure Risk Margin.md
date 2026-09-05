---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:085ffad5fa3cdd9b4115b4da0ef9810731c86eb3fb933df8f99f842cc4e385b2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Earthquake Exposure Risk Margin.md
---

**The Earthquake Exposure Risk Margin** is the [[MCT]] requirement that an insurer hold financial resources sufficient to meet its earthquake exposure at a prescribed return period — under [[OSFI]]'s guidance, the **$1$-in-$500$ year** [[Probable Maximum Loss|PML]]. Earthquake is treated separately from other catastrophe perils because Canada's exposure is concentrated, severe, and capable of failing multiple insurers at once.

> $$\text{Requirement} = \text{PML}_{1/500} - \text{Reinsurance} - \text{Other resources}$$

- **Why earthquake is singled out.** Canadian earthquake exposure concentrates in two zones — coastal British Columbia and the Quebec City–Montreal–Ottawa corridor — so a single event would strike a large share of the industry simultaneously. It is the archetypal [[Concentration Risk]] and the scenario most likely to exhaust [[PACICC]]'s capacity.
- **What counts as financial resources:** capital and surplus, reinsurance (with [[Registered Reinsurance|registration]] and collateral rules applying), any earthquake reserve or premium reserve accumulated, and capital markets instruments such as catastrophe bonds where they genuinely respond.
- **PML data quality is explicitly a supervisory matter.** OSFI expects documented exposure data, model validation, an understanding of model limitations, and a stated basis for the selected PML — see [[Model Risk]]. An insurer that cannot demonstrate the quality of its exposure data cannot demonstrate its PML.
- **The earthquake exposure requirement is separate from the [[Insurance Risk Margin|ordinary insurance risk margin]]**, because ordinary factors applied to liabilities capture the expected cost of business as usual, not a tail event that has not occurred.
- **Take-up is a policy problem beside the capital one.** Earthquake insurance penetration in high-hazard Canadian regions is low, so a major event would produce large uninsured losses and heavy pressure for [[Disaster Financial Assistance Arrangements|government assistance]] — the same coverage-gap structure as [[Flood Insurance]].
- **Reinstatement and the second event.** A programme adequate for one event may be exhausted for the aftershock; OSFI expects insurers to consider it, and [[FCT]] scenarios frequently test a second event.

> [!example]- Meeting the Requirement {Example}
> An insurer's $1$-in-$500$ earthquake PML is $\$520$ million. Its reinsurance programme covers $\$40$ million to $\$420$ million with one reinstatement. It holds an earthquake reserve of $\$25$ million and capital available of $\$310$ million.
>
> Does it meet the requirement, and what would improve the position?
>
> > [!answer]-
> > **Net retained exposure at the $1$-in-$500$ level:**
> >
> > $$\begin{align*}
> > \text{Retention} &= \$40\text{M} \\
> > \text{Above the programme} &= \$520\text{M} - \$420\text{M} = \$100\text{M} \\[4pt]
> > \text{Net} &= \$140\text{M}
> > \end{align*}$$
> >
> > **Resources available:** the $\$25$ million earthquake reserve plus capital. The retained $\$140$ million is covered by $\$310$ million of capital available, so the requirement is met in the narrow sense.
> >
> > **But look at what it leaves.** After the event, capital available falls to roughly $\$310 - \$140 + \$25 = \$195$ million before tax effects. If the base solvency buffer is $\$185$ million, the MCT ratio falls from $168\%$ to about $105\%$ — barely above the minimum, and in the aftermath of a catastrophe that has also damaged the insurer's operations and its market.
> >
> > **What would improve it, in order of effectiveness:**
> >
> > 1. **Extend the programme above $\$420$ million.** The $\$100$ million of unprotected exposure above the top of the tower is the single largest item, and top-layer capacity is the cheapest part of a catastrophe programme per dollar of limit.
> > 2. **Reduce the exposure.** Underwriting action in the highest-hazard postal codes, or higher earthquake deductibles, lowers the PML itself — the only remedy that does not depend on someone else paying.
> > 3. **Verify the reinstatement.** One reinstatement covers a second event, but the reinstatement premium is payable at the worst possible moment and should be in the cash flow scenario.
> > 4. **Raise the [[Internal Target Capital Ratio|internal target]]** so that the post-event ratio lands above the supervisory target rather than above the minimum.
> >
> > **And test the PML itself.** A $\$520$ million figure from one model with imperfect exposure data could plausibly be $\$650$ million, at which point the retained loss is $\$270$ million and the insurer does not survive in any meaningful sense. That sensitivity, not the point estimate, is what the board needs to see.
