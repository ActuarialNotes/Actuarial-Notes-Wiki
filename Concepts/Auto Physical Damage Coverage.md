---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a8afacd6381e9944e4a7db7c04847d36a3e250401b279b90638c407954285c9f
  sources:
    - "ISO PP 00 01 09 18 Personal Auto Policy (Virginia SCC specimen), Part D insuring agreement, collision definition, other than collision 1-10, non-owned auto, custom equipment, transportation expenses, exclusions 1-16, limit of liability A-C, payment of loss, appraisal, other sources of recovery (pp.8-12), sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf"
    - "ISO CA 00 01 10 13 Business Auto Coverage Form, III physical damage, sha256:b8e36d4e31f05a7eaad97cba8b091f8a45cf1ea302e616bad96b4c132c1457e8 — https://assets.touchpointmarkets.com/80/d7/be854d714678be5fefc9d17cc365/ca-00-01-10-13-business-auto-coverage-form.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Auto Physical Damage Coverage.md
---

**Auto Physical Damage Coverage** insures the insured's own vehicle against damage, destruction and theft. It is first-party coverage, paid to the insured whoever was at fault, unlike [[Liability Insurance|liability coverage]], which pays others. In the [[Personal Auto Policy|personal auto policy]] it is Part D, coverage for damage to your auto, written as collision and other than collision. The ISO business auto form offers comprehensive, specified causes of loss and collision.

The insurer pays the lesser of the vehicle's [[Actual Cash Value|actual cash value]] at the time of loss, $\text{ACV}$, and the cost to repair or replace it with property of like kind and quality, $\text{Repair}$. The vehicle's value, not a stated limit, caps the payment, which is

> $$\text{Payment} = \min(\text{ACV},\ \text{Repair}) - d$$

- $d$ is the [[Deductible|deductible]] shown in the declarations.

When the repair cost exceeds the ACV, the vehicle is a total loss. The insurer pays the ACV less the deductible, takes the vehicle and sells it for its [[Salvage and Subrogation|salvage]] value $S$, so its net cost is

> $$\text{Net cost} = \text{Payment} - S$$

> [!example]- What does the insurer pay for this car at each repair estimate? {Example}
> A car with an ACV of \$12,000 is insured for collision with a \$500 deductible. After an accident the repair estimate is either \$7,800 or \$13,500. In the second case the insurer sells the wreck for \$2,200.
>
> > [!answer]-
> > - At \$7,800 the repair costs less than the ACV, so the payment is $7{,}800 - 500 = \$7{,}300$.
> > - At \$13,500 the repair would cost more than the car is worth, so it is a total loss and the payment is $12{,}000 - 500 = \$11{,}500$.
> > - Selling the wreck brings the insurer's net cost on the total loss to $11{,}500 - 2{,}200 = \$9{,}300$.
> > - The insured bears the \$500 deductible in both cases.

Depreciation and physical condition are reflected in the ACV of a total loss, and the insurer doesn't pay for betterment that leaves the vehicle in better condition than before. It may pay in money, including the applicable sales tax, or repair or replace the property. If the insured and insurer disagree on the amount of loss, either may demand appraisal.

## Collision and other than collision

Collision means the upset of the vehicle or its impact with another vehicle or an object. If another driver caused the accident, the insurer pays its own insured first and recovers from the other driver's liability insurer by subrogation, including the deductible on the insured's behalf.

Other than collision covers the listed perils that are not collision, among them fire, theft, explosion, earthquake, windstorm, hail, flood, vandalism, missiles or falling objects, riot, contact with a bird or animal, and glass breakage. Glass broken in a collision can be treated as collision so that only one deductible applies. Hitting a deer is other than collision, and swerving into a tree to avoid one is collision. The two often carry different deductibles, so the classification changes the payment.

> [!example]- A driver swerves to miss a deer and hits a tree. Which Part D coverage pays, and which deductible applies? {Example}
> - The car never touched the deer, so the loss is not contact with an animal.
> - Impact with an object, the tree, is collision.
> - Collision coverage pays, less the collision deductible.

## Covered autos and non-owned autos

The insurer pays for direct and accidental loss to "your covered auto" or any "non-owned auto", including its equipment, minus the deductible. An owned auto has collision or other than collision coverage only if the declarations show it for that auto, while a non-owned auto gets the broadest coverage the policy gives any covered auto. If one collision damages more than one covered or non-owned auto, only the highest deductible applies.

A non-owned auto is a private passenger auto, pickup, van or trailer that is not owned by, or furnished or available for the regular use of, the named insured or a family member, while one of them has custody of it or is driving it, and any auto used as a temporary substitute for a covered auto out of normal use. Coverage for it is excess over any other source of recovery, including the owner's coverage and any other physical damage insurance; for an owned auto, other sources share pro rata by limits.

## Limits on equipment and transportation expenses

Within the lesser of ACV and repair cost, the most paid is \$1,500 for a non-owned trailer, \$1,000 for electronic equipment permanently installed where the manufacturer doesn't install such equipment, and \$1,500 for "custom equipment" such as special paint, custom wheels or a height-extending roof.

Without a deductible, the insurer pays up to \$30 a day and \$900 in total for temporary transportation after a covered loss to a covered auto, and for loss-of-use charges after a loss to a non-owned auto, provided the policy carries the coverage that the loss falls under. After a total theft, expenses are paid from 48 hours after the theft until the auto is returned or the loss is paid; after any other loss, from when the auto has been out of use for more than 24 hours.

## Exclusions

Part D does not pay for loss while the vehicle is used as a public or livery conveyance, including while the driver is logged into a transportation network platform. Nor does it pay for damage due and confined to wear and tear, freezing, mechanical or electrical breakdown, or road damage to tires, unless it results from a total theft. These are maintenance costs rather than accidents. Other exclusions include radioactive contamination and war, electronic equipment that is not permanently installed, radar or laser detectors, custom equipment above the first \$1,500, a non-owned auto used in the auto business, racing in a racing facility, and a vehicle that can fly.

## Business auto physical damage underwriting

For a fleet, physical damage exposure is driven by the vehicles' values and types, their ages, how they are used and how far they travel, where they are garaged and parked, the drivers' quality, and maintenance. Theft exposure depends on the vehicle and the location, and vehicles parked together create a catastrophe accumulation from hail or flood ([[Catastrophe Risk]]). The underwriter's tools are the deductible, the choice between comprehensive and specified causes of loss, and declining coverage on high-value or hard-to-repair units.

> [!trap] Subtracting the deductible before the cap
> The deductible comes off the lesser of ACV and repair cost. Taking it off a \$13,500 estimate first gives \$13,000, still above a \$12,000 ACV, and paying the ACV then overpays the total loss by the \$500 deductible.
