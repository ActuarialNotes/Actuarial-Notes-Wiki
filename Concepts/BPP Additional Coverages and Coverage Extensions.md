---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:70a9a0435615ed2921dfdb428bf64ebb556fddc5d79597b18e8f9456430feeb7
  sources:
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §A.4.a–f, A.5 preamble and a–g, C pp.3–10, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/BPP Additional Coverages and Coverage Extensions.md
---

The **BPP Additional Coverages and Coverage Extensions** are the parts of the [[Building and Personal Property Coverage Form|building and personal property coverage form]] (BPP) that pay for costs and property the main insuring agreement leaves out. They follow ISO CP 00 10 10 12, sections A.4 and A.5. The two groups differ in when they apply:

1. The six **additional coverages** apply on every BPP: debris removal, preservation of property, fire department service charge, pollutant clean-up and removal, increased cost of construction, and electronic data.
2. The seven coverage extensions apply only when the declarations show a coinsurance percentage of 80% or more, or a value reporting period symbol, and each carries a small limit of its own.

What is covered property in the first place is on [[BPP Covered Property]].

## Debris removal

Debris removal pays to remove debris of covered property and other debris on the described premises caused by a covered cause of loss during the policy period, if the expense is reported in writing within 180 days. Within the limit it pays up to 25% of the deductible plus the direct loss payment, and the loss payment plus debris removal cannot exceed the limit. The debris removal paid within the limit is

> $$B = \min\big(0.25\,(P + d),\ C - P,\ E\big)$$

- $P$ is what the insurer pays for the direct physical loss to the damaged covered property.
- $d$ is the deductible.
- $C$ is that property's limit of insurance.
- $E$ is the actual debris removal expense.

If either cap binds, up to $\$25{,}000$ more per location is paid. The total debris removal payment is

> $$\text{Debris} = \min\big(E,\ B + 25{,}000\big)$$

If no covered property was damaged, the most paid to remove other property's debris is $\$5{,}000$ per location. Debris removal does not pay to remove deposits of mud or earth, to extract pollutants from land or water, or to remove property not covered.

> [!example]- How much does the insurer pay for debris removal here, and how much does the insured bear? {Example}
> A warehouse is insured for $\$200{,}000$ with a $\$1{,}000$ deductible and no coinsurance penalty. A fire causes $\$170{,}000$ of direct damage, and removing the debris costs $\$70{,}000$.
>
> > [!answer]-
> > - The loss payment is the loss less the deductible, $P = 170{,}000 - 1{,}000 = \$169{,}000$, within the limit.
> > - The 25% cap is $0.25 \times (169{,}000 + 1{,}000) = \$42{,}500$, and the room left under the limit is $200{,}000 - 169{,}000 = \$31{,}000$.
> > - So $B = \min(42{,}500,\ 31{,}000,\ 70{,}000) = \$31{,}000$.
> > - The expense exceeds $B$, so the additional amount applies: $\min(70{,}000,\ 31{,}000 + 25{,}000) = \$56{,}000$.
> > - The insurer pays $\$56{,}000$ for debris removal, and the insured bears the other $\$14{,}000$ of it as well as the deductible.

## The other additional coverages

- **Preservation of property** covers direct physical loss to covered property while it is moved to protect it from a covered cause of loss, or while temporarily stored elsewhere, for damage within 30 days after it is first moved. It does not increase the limit.
- **Fire department service charge** pays up to $\$1{,}000$ per described premises, unless the declarations show more, for the insured's liability for fire department service charges assumed by contract before the loss or required by local ordinance. No deductible applies, and the limit holds however many departments respond.
- **Pollutant clean-up and removal** pays to extract pollutants from land or water at the described premises when their release was caused by a covered cause of loss during the policy period, reported within 180 days. The most paid is $\$10{,}000$ per described premises for each separate 12-month period of the policy.
- **Increased cost of construction** applies only to buildings to which the replacement cost optional coverage applies. It pays the increased cost of meeting a building, zoning or land-use ordinance or law in force at the time of loss when repairing or rebuilding, and nothing until the building is actually repaired or replaced, within two years. The limit is the lesser of $\$10{,}000$ and 5% of the building's limit.
- **Electronic data** pays to replace or restore electronic data destroyed or corrupted by a covered cause of loss, up to $\$2{,}500$ for all loss in a policy year unless the declarations show more. A virus or harmful code is covered, but manipulation by an employee or by someone retained to work on the system is not.

Under the limits clause, fire department service charge, pollutant clean-up, increased cost of construction and electronic data are paid separately from the limits ([[BPP Limits of Insurance and Deductible]]). Debris removal is within the limit, plus the $\$25{,}000$ additional amount, and preservation of property does not increase the limit.

## Coverage extensions

Each extension is additional insurance unless it says otherwise, and the coinsurance condition does not apply to them. The seven are:

1. **Newly acquired or constructed property:** new buildings being built on the described premises and buildings acquired elsewhere for a similar use or as a warehouse, up to $\$250{,}000$ per building; business personal property at newly acquired locations (not fairs, trade shows or exhibitions) or in newly acquired or constructed buildings at the described location, up to $\$100{,}000$ per building. Coverage ends at the earliest of policy expiration, 30 days after acquisition or the start of construction, or when the insured reports values.
2. **Personal effects and property of others:** personal effects of the insured, its officers, partners or members, managers and employees, and property of others in the insured's care, up to $\$2{,}500$ per described premises. Theft of personal effects is not covered.
3. **Valuable papers and records (other than electronic data):** the cost to restore lost information for which no duplicates exist, up to $\$2{,}500$ per described premises.
4. **Property off-premises:** covered property temporarily at a location the insured does not own, lease or operate, in storage at a location leased after the policy term began, or at a fair, trade show or exhibition, up to $\$10{,}000$.
5. **Outdoor property:** fences, antennas and satellite dishes, trees, shrubs and plants, including debris removal, but only against fire, lightning, explosion, riot or civil commotion and aircraft. The limit is $\$1{,}000$ per occurrence, and no more than $\$250$ for any one tree, shrub or plant.
6. **Non-owned detached trailers:** trailers used in the business, in the insured's care at the premises, that the insured is contractually responsible for, up to $\$5{,}000$, excess over other insurance.
7. **Business personal property temporarily in portable storage units:** within 100 feet of the building or premises, for up to 90 days, up to $\$10{,}000$. This limit is part of, not in addition to, the business personal property limit.

The building item covers only the building described in the declarations, so a building the insured acquires during the term is covered only by the newly acquired or constructed property extension.

> [!example]- What do the extensions and additional coverages pay after this fire, and what if wind had felled the trees? {Example}
> A florist's BPP declarations show a 90% coinsurance percentage. A fire at the shop burns three ornamental trees worth $\$400$ each and $\$600$ of fence, both outdoors. An employee's coat, worth $\$300$, burns in the back room. The town charges $\$1{,}800$ for the fire department's response, as its ordinance allows.
>
> > [!answer]-
> > - The coinsurance percentage is 80% or more, so the extensions apply.
> > - Fire is one of the five causes of loss for outdoor property. Each tree is capped at $\$250$, so the trees pay $3 \times 250 = \$750$.
> > - With the fence, outdoor property comes to $750 + 600 = \$1{,}350$, capped at $\$1{,}000$ per occurrence.
> > - The coat is an employee's personal effect, paid in full under the $\$2{,}500$ personal effects extension.
> > - The fire department service charge is required by ordinance, so it is paid up to $\$1{,}000$ with no deductible.
> > - Windstorm is not one of the outdoor property causes of loss, so trees and fence blown down by wind would not be covered at all.

> [!trap] Outdoor property is covered for named perils only
> Trees, fences and antennas are covered only against fire, lightning, explosion, riot or civil commotion and aircraft, even under the special causes of loss form. Wind and hail damage to them is not covered.
