---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:51a43e15fd6c9077757265c42dcee91c47999ee5caceb95325924929c4b41ba3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Auto Physical Damage Coverage.md
---

**Auto Physical Damage Coverage** insures the insured's own vehicle against damage, destruction and theft. It is first-party coverage, paid to the insured whoever was at fault, unlike [[Liability Insurance|liability coverage]], which pays others. In the [[Personal Auto Policy|personal auto policy]] it is Part D, coverage for damage to your auto, written as collision and other than collision. The ISO business auto form offers comprehensive, specified causes of loss and collision.

> $$\text{Payment} = \min(\text{ACV},\ \text{Repair}) - d$$

> $$\text{Net cost} = \text{Payment} - S$$

- **Symbols:** ACV is the vehicle's actual cash value at the time of loss, Repair is the cost to repair or replace the damaged property with property of like kind and quality, and $d$ is the deductible shown in the declarations. When the repair cost exceeds the ACV the vehicle is a total loss: the insurer pays the ACV less the deductible, takes the vehicle, and sells it for its salvage value $S$, so its net cost is lower than the payment ([[Salvage and Subrogation]]).
- **Collision:** Collision means the upset of the vehicle or its impact with another vehicle or an object. It pays whoever was at fault, and if another driver caused the accident, the insurer pays its own insured first and recovers from the other driver's liability insurer by subrogation, including the deductible on the insured's behalf.
- **Other than collision:** This covers the listed perils that are not collision, among them fire, theft, explosion, earthquake, windstorm, hail, flood, vandalism, missiles or falling objects, riot, contact with a bird or animal, and glass breakage. Glass broken in a collision can be treated as collision so that only one deductible applies. Hitting a deer is other than collision, and swerving into a tree to avoid one is collision.
- **Limit of liability:** The insurer pays the lesser of the ACV and the repair cost, so the vehicle's value, not a stated limit, caps the payment. Depreciation and physical condition are reflected in the ACV of a total loss, and the insurer doesn't pay for betterment that leaves the vehicle in better condition than before.
- **Non-owned autos:** Part D also covers a non-owned auto the insured drives, such as a rental car, with the broadest physical damage coverage the policy gives any covered auto. Like liability, it is excess over other collectible insurance on that car.
- **Transportation expenses:** The insurer also pays temporary transportation expenses after a covered loss, and the loss-of-use charges a rental company can bill the insured for a damaged non-owned auto. Both are subject to a waiting period and to a daily and total cap set in the form.
- **Exclusions:** The coverage excludes wear and tear, freezing, mechanical or electrical breakdown and road damage to tires, because those are maintenance costs rather than accidents. It also excludes use as a public or livery conveyance, racing, some electronic equipment, and a non-owned auto used in the auto business.
- **Business auto underwriting:** For a fleet, physical damage exposure is driven by the vehicles' values and types, their ages, how they are used and how far they travel, where they are garaged and parked, the drivers' quality, and maintenance. Theft exposure depends on the vehicle and the location, and vehicles parked together create a catastrophe accumulation from hail or flood ([[Catastrophe Risk]]). The underwriter's tools are the deductible, the choice between comprehensive and specified causes of loss, and declining coverage on high-value or hard-to-repair units.

> [!example]- A Repairable Loss and a Total Loss {Example}
> A car with an ACV of \$12,000 is insured for collision with a \$500 deductible. Find the payment if the repair estimate after an accident is (a) \$7,800 and (b) \$13,500. In (b), the insurer sells the wreck for \$2,200.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{(a) Payment} &= \min(12{,}000,\ 7{,}800) - 500 \\
> > &= 7{,}300 \\
> > \text{(b) Payment} &= \min(12{,}000,\ 13{,}500) - 500 \\
> > &= 11{,}500 \\
> > \text{Net cost} &= 11{,}500 - 2{,}200 \\
> > &= 9{,}300
> > \end{align*}
> > $$
> > In (b) the repair would cost more than the car is worth, so the insurer declares a total loss and pays the ACV less the deductible. The insured bears the \$500 deductible in both cases, and recovers it as well if the insurer subrogates successfully against an at-fault driver.

> [!example]- Pricing a Higher Fleet Deductible {Example}
> A business insures 40 vans, each with an ACV of \$30,000, for collision. With illustrative figures, each van has 0.12 collisions a year. Of collisions, 70% cost \$4,000 to repair, 25% cost \$12,000, and 5% are total losses with a salvage value of \$6,000. Find the insurer's expected annual net cost for the fleet at a \$1,000 and a \$2,500 deductible.
>
> > [!answer]-
> > Every loss exceeds both deductibles, so the deductible comes off each one in full.
> > $$
> > \begin{align*}
> > E_{1{,}000} &= 0.70(3{,}000) + 0.25(11{,}000) + 0.05(23{,}000) \\
> > &= 6{,}000 \\
> > E_{2{,}500} &= 0.70(1{,}500) + 0.25(9{,}500) + 0.05(21{,}500) \\
> > &= 4{,}500 \\
> > \text{Fleet}_{1{,}000} &= 40(0.12)(6{,}000) \\
> > &= 28{,}800 \\
> > \text{Fleet}_{2{,}500} &= 40(0.12)(4{,}500) \\
> > &= 21{,}600
> > \end{align*}
> > $$
> > The higher deductible removes \$7,200 a year of expected cost, which is \$1,500 on each of the 4.8 expected collisions. The business keeps those small losses, and the insurer's remaining exposure is concentrated in the larger repairs and total losses.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions ask what PAP Part D pays for a described loss: whether it is collision or other than collision, whether the vehicle is a covered auto or a non-owned auto, the lesser of ACV and repair cost less the deductible, and whether transportation expenses or an exclusion apply.
> - **DISC-RM:** The business auto questions ask which characteristics of a fleet and its operations an underwriter evaluates for physical damage coverage, and how the deductible and the choice of covered causes of loss respond to them.

> [!warning]- Exam traps
> - **Collision or not:** Contact with a bird or animal is other than collision, but hitting a tree to avoid the animal is collision. The two often carry different deductibles, so the classification changes the payment.
> - **Value caps the payment:** Part D has no dollar limit in the usual case. The payment is capped by the lesser of ACV and repair cost, so a repair estimate above the ACV is paid as a total loss, not in full.
> - **Deductible after the cap:** The deductible comes off the lesser of ACV and repair cost. Subtracting it from the repair estimate first and then comparing with the ACV overpays a total loss by the deductible.
> - **Physical damage is not liability:** Damage to the insured's own car is never paid under Part A, and damage to the other driver's car is never paid under Part D. Placing a loss under the wrong part misreads whose property it is.
