---
aliases:
  - Automobile Insurance
  - ISO Personal Auto Policy
  - PAP
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:511d39c6e73a56dca56127fede4fabb631f90fa4bc225606c23539dfe0ce633f
  sources:
    - "ISO Personal Auto Policy PP 00 01 09 18 (Virginia SCC specimen), Definitions and Parts A–F, pp.1–14, sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf"
    - "NAIC, Automobile Insurance: A Shopping Tool for Consumers (© 2014), pp.10–11 (printed 8–9), sha256:b03458a5fdf0192a263ce489c66c4c4d50cebc54a90916f3e18b266f30073977 — https://doi.colorado.gov/sites/doi/files/documents/Buyers%20Guide%20to%20Auto%20Insurance.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Personal Auto Policy.md
---

The **Personal Auto Policy** (PAP) is the Insurance Services Office (ISO) form most U.S. insurers use to insure individuals and families for the autos they own and drive. After the declarations and definitions it has six parts:

1. **Part A, liability**, pays others for injury and damage the insured is legally responsible for.
2. **Part B, medical payments**, pays the medical expenses of insureds regardless of fault.
3. **Part C, uninsured motorists**, pays what an insured could have recovered from an uninsured driver.
4. **Part D, coverage for damage to your auto**, pays for damage to the insured's own covered auto.
5. **Part E, duties after an accident or loss**, lists what the insured must do after a loss.
6. **Part F, general provisions**, holds the policy's conditions.

## Definitions

- **"You"** means the named insured and a spouse living in the same household.
- A **family member** is a resident of the household related to the named insured by blood, marriage or adoption.
- **"Your covered auto"** is any vehicle in the declarations, a newly acquired auto (subject to a short notice period), a trailer the insured owns, and a temporary substitute for a covered auto that is out of use for repair, servicing, loss or destruction.

## Part A, liability

Part A pays damages for bodily injury or property damage for which any insured becomes legally responsible because of an auto accident, and the insurer defends the insured. The insureds are the named insured and family members using any auto, anyone using the covered auto, and a person or organization held liable for their use. Supplementary payments, such as bail bond costs and interest on a judgment, are paid in addition to the limit, and the [[Duty to Defend|duty to defend]] ends once the limit is used up. The part is worked through on [[PAP Liability Coverage]].

Part A's limits are usually split limits. A split limit of 100/300/50 is an each person bodily injury limit $L_{\text{pp}} = \$100{,}000$, an each accident bodily injury limit $L_{\text{acc}} = \$300{,}000$ and a property damage limit $L_{\text{PD}} = \$50{,}000$. For one accident the bodily injury payment is

> $$\text{BI} = \min\Big(\sum_i \min(D_i,\ L_{\text{pp}}),\ L_{\text{acc}}\Big)$$

- $D_i$ is the bodily injury damages owed to injured person $i$.

The property damage payment is

> $$\text{PD} = \min(D_{\text{PD}},\ L_{\text{PD}})$$

- $D_{\text{PD}}$ is the property damage from the same accident.

A single limit replaces all three with one amount per accident.

> [!example]- What does Part A pay for this accident, and what is left to the insured? {Example}
> The insured runs a red light and hits another car. The PAP has limits of 100/300/50.
>
> | Damage | Amount |
> | :--- | ---: |
> | Other driver's bodily injury | \$140,000 |
> | Other driver's passenger's bodily injury | \$60,000 |
> | Other car, a total loss | \$28,000 |
> | Roadside fence | \$4,000 |
>
> > [!answer]-
> > - The other driver's \$140,000 is capped at the \$100,000 each person limit, and the passenger's \$60,000 is within it.
> > - Their sum, \$160,000, is within the \$300,000 each accident limit, so $\text{BI} = \$160{,}000$.
> > - The car and the fence share the property damage limit, and $\$28{,}000 + \$4{,}000 = \$32{,}000$ is within it, so $\text{PD} = \$32{,}000$.
> > - The insured is personally liable for the other driver's remaining \$40,000.

A **non-owned auto** is an auto the insured does not own but is driving or has in their custody. A car furnished or available for the regular use of the insured or a family member is not a non-owned auto, so the PAP gives no coverage for it without an endorsement such as extended non-owned coverage. For a non-owned auto, liability insurance follows the car first. The owner's policy is primary, and the insured's PAP is excess over it for an auto the insured doesn't own.

> [!example]- How is this claim from a borrowed car shared between the two policies? {Example}
> The insured borrows a friend's car for a weekend and causes an accident that injures one person, whose damages are \$180,000. The friend's PAP on the car has limits of 50/100/25, and the insured's own PAP has limits of 250/500/100.
>
> > [!answer]-
> > - The friend's car is not furnished for the insured's regular use, so it is a non-owned auto.
> > - The owner's policy is primary and pays $\min(\$180{,}000,\ \$50{,}000) = \$50{,}000$.
> > - The insured's PAP is excess and pays the remaining $\$180{,}000 - \$50{,}000 = \$130{,}000$, which is within its \$250,000 each person limit.

> [!trap] Each person before each accident
> Under split limits each injured person's damages are capped at the each person limit before they are added and compared with the each accident limit. Comparing the total damages with the each accident limit alone overstates the payment.

## Part B, medical payments

Part B pays reasonable medical and funeral expenses of an insured injured in an accident, regardless of fault, for services rendered within a set period after the accident. The named insured and family members are insured in any motor vehicle or as pedestrians struck by one, and anyone else is insured while occupying the covered auto. An injured passenger can still claim the rest of the damages against the insured under Part A, and the medical payment is credited against anything recovered there, so the same expense is not paid twice. The part is worked through on [[Medical Payments Coverage]].

## Part C, uninsured motorists

Part C pays what an insured could have recovered from an uninsured or hit-and-run driver who was legally liable. It is a first-party coverage that still turns on fault, unlike Part B, which pays whatever the cause. The part and underinsured motorists coverage are worked through on [[Uninsured Motorists Coverage]], and Canada's statutory counterpart is [[Uninsured Automobile Coverage]].

## Part D, coverage for damage to your auto

Part D covers direct and accidental loss to the covered auto and to a non-owned auto the insured drives, under collision and other than collision. Damage the insured causes to another driver's car is a Part A claim. For one loss, Part D pays

> $$\text{Part D} = \min(\text{ACV},\ \text{Repair}) - d$$

- $\text{ACV}$ is the actual cash value of the damaged auto.
- $\text{Repair}$ is the cost to repair or replace it with property of like kind and quality.
- $d$ is the deductible.

The perils that count as other than collision, theft among them, the transportation expenses and the exclusions are on [[Auto Physical Damage Coverage]].

> [!example]- The insured's car costs $\$9{,}200$ to repair after a collision, its ACV is $\$14{,}000$ and the collision deductible is $\$500$. What does Part D pay? {Example}
> - The repair cost is less than the ACV, so the lesser of the two is \$9,200.
> - Part D pays $\$9{,}200 - \$500 = \$8{,}700$.

## Parts E and F

Part E lists the insured's duties after a loss: prompt notice, cooperation, sending legal papers, medical examinations, and reporting a theft or a hit-and-run to the police. Part F holds the conditions, including the policy territory, the insurer's [[Salvage and Subrogation|right of recovery]], and cancellation and nonrenewal. Under Part F, an insured covered by two or more auto policies issued by the same insurer can't collect more than the highest single limit. Both parts are worked through on [[PAP Duties and General Provisions]], and the endorsements for other vehicles and added coverages on [[PAP Endorsements]].

## Underwriting

A personal auto underwriter weighs the drivers' ages, experience and driving records, how the auto is used and how far it is driven, where it is garaged, the [[Vehicle Make and Model|vehicle]] and its value, prior insurance and, where permitted, [[Credit-Based Insurance Scoring|credit-based insurance scores]]. Most are also [[Rating Variable|rating variables]]. The detail is on [[Personal Auto Underwriting]], and the state laws the policy is written to meet are on [[Personal Auto Insurance Laws]].

[[Usage-Based Insurance|Usage-based insurance]] prices the policy on measured driving collected by telematics, which raises questions of privacy, data use and fairness. In Canada auto coverage is not written on the ISO form, and its minimum contents are set by statute ([[Compulsory Auto Insurance]]).
