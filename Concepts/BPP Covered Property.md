---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4aa8a09b3c8372fec56b643d43d133f769c708a29744f8bd7b3798859438a487
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/BPP Covered Property.md
---

**Covered property** under the [[Building and Personal Property Coverage Form|building and personal property coverage form]] (BPP) is the property the form insures: the building, your business personal property and personal property of others, each covered only if a limit of insurance is shown for it in the declarations, and each cut back by the form's list of property not covered. The ISO form (CP 00 10 10 12) sets these out in its Coverage section as A.1 Covered Property and A.2 Property Not Covered.

> $$\text{Covered}(x) \iff t(x) \in \{\text{Bldg},\ \text{BPP},\ \text{PPO}\},\ C_{t(x)} > 0,\ x \notin \text{NC}$$

> $$\text{In zone}(x) \iff \min\big(\delta_B(x),\ \delta_P(x)\big) \leq 100 \text{ ft}$$

- **Symbols:** $x$ is an item of damaged property and $t(x)$ is the category it falls in: Building, Your Business Personal Property (BPP) or Personal Property of Others (PPO). $C_t$ is the limit shown in the declarations for that category, and $\text{NC}$ is the list of property not covered. In the second block, $\delta_B(x)$ and $\delta_P(x)$ are the distances from personal property in the open or in a vehicle to the described building and to the described premises. The form covers such property within 100 feet of the building or of the premises, whichever distance is greater, so it is enough to be within 100 feet of either.
- **Building:** The building or structure described in the declarations, including completed additions; fixtures, including outdoor fixtures; permanently installed machinery and equipment; and personal property the named insured owns that is used to maintain or service the building or its premises, such as fire-extinguishing equipment, outdoor furniture, floor coverings and appliances for refrigerating, ventilating, cooking, dishwashing or laundering. If no other insurance covers them, it also includes additions under construction, alterations and repairs, and the materials, equipment, supplies and temporary structures within 100 feet of the premises used to make them.
- **Your Business Personal Property:** Property located in or on the described building, or in the open or in a vehicle within the 100-foot zone, consisting of furniture and fixtures; machinery and equipment; "stock" (merchandise held for sale or storage, raw materials and goods in process or finished, including packing and shipping supplies); all other personal property owned by the insured and used in its business; labor, materials or services the insured furnished on personal property of others; the tenant's use interest in improvements and betterments; and leased personal property the insured has a contractual responsibility to insure.
- **Improvements and betterments:** These are fixtures, alterations, installations or additions made part of a building the insured occupies but does not own, which the insured acquired or made at its own expense but cannot legally remove. They are the tenant's business personal property, not the landlord's building, which is why a tenant insures them under its BPP limit.
- **Personal Property of Others:** Property of others in the insured's care, custody or control and within the same 100-foot zone. The insurer pays for it only for the account of the owner.
- **Property not covered:** Accounts, bills, currency, food stamps, evidences of debt, money, notes or securities; animals, except others' animals boarded by the insured or the insured's own animals held as stock inside buildings; automobiles held for sale; bridges, roadways, walks, patios and other paved surfaces; contraband; the cost of excavations, grading, backfilling or filling; foundations below the lowest basement floor or below ground where there is no basement; land, water, growing crops and lawns (other than a vegetated roof); personal property while airborne or waterborne; bulkheads, pilings, piers, wharves and docks; property more specifically insured elsewhere, except for the excess over that insurance; retaining walls not part of a building; underground pipes, flues and drains; electronic data, except under the Electronic Data additional coverage; the cost to restore information on valuable papers and records; vehicles and self-propelled machines licensed for public roads or operated mainly away from the premises (with exceptions for vehicles the insured manufactures or warehouses, non-auto vehicles held for sale, rowboats and canoes out of water, and trailers under the trailer extension); and, while outside buildings, grain, hay and crops, and fences, antennas, trees, shrubs and plants (other than stock), except as the coverage extensions provide.
- **Where the gaps go:** Money and securities are left to [[Commercial Crime Insurance|crime insurance]], whose insuring agreements cover them. Several other items on the list are given back in limited form by the [[BPP Additional Coverages and Coverage Extensions|additional coverages and extensions]]: outdoor fences, trees and antennas, valuable papers, electronic data and non-owned trailers.

> [!example]- Sorting a Fire Loss Into the Three Categories {Example}
> A hardware retailer owns its building and insures it under the BPP with limits shown for Building and for Your Business Personal Property, but no limit for Personal Property of Others. A fire causes this damage: walls and roof, \$180,000; the permanently installed heating and air conditioning system, \$40,000; fire extinguishers and floor coverings, \$6,000; inventory held for sale, \$75,000; a customer's lawn mower in for repair, \$900; cash in the register, \$3,000; the paved parking lot, \$12,000. Ignoring the deductible and limits, how much falls under each limit, and what is not covered?
>
> > [!answer]-
> > The walls and roof, the permanently installed system and the property used to service the building are all Building.
> > $$
> > \begin{align*}
> > \text{Building} &= 180{,}000 + 40{,}000 + 6{,}000 \\
> > &= 226{,}000 \\
> > \text{BPP} &= 75{,}000
> > \end{align*}
> > $$
> > The inventory is stock, so it is business personal property. Cash is money, and the parking lot is a paved surface, so both are property not covered. The customer's mower is personal property of others, which needs its own limit. Without one it can still be paid under the personal effects and property of others coverage extension, up to \$2,500 at each described premises, if the declarations show a coinsurance percentage of at least 80%.

> [!example]- A Tenant's Improvements {Example}
> A dental practice leases a suite and, at its own expense, installs built-in cabinetry and a reception counter that cannot be removed when the lease ends. It also leases an X-ray machine under a contract that makes it responsible for insuring the machine. The landlord insures the building. A fire damages the suite. Which of the practice's BPP categories responds to the cabinetry, the counter and the X-ray machine?
>
> > [!answer]-
> > The cabinetry and the counter are improvements and betterments: they were made part of a building the practice occupies but does not own, at its expense, and it cannot legally remove them. The practice's use interest in them is Your Business Personal Property. The leased X-ray machine is also Your Business Personal Property, because the practice has a contractual responsibility to insure it. The landlord's building policy covers the building itself, but the tenant's interest in improvements it paid for is insured under the tenant's own BPP limit.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective is covered property under the BPP. A question lists damaged items after a loss and asks which are building, business personal property, personal property of others or property not covered, or which limit pays for a given item.
> - **Paired topics:** Questions on property not covered often go on to ask whether a [[BPP Additional Coverages and Coverage Extensions|coverage extension]] restores some of it (outdoor trees, valuable papers, property off premises), and then into the [[BPP Limits of Insurance and Deductible|limits and deductible]].

> [!warning]- Exam traps
> - **A limit must be shown:** Each category is covered property only if the declarations show a limit for it. Personal property of others with no PPO limit is not covered under that category, however clearly it fits the description.
> - **Service property is Building:** Fire extinguishers, outdoor furniture, floor coverings and building appliances the owner uses to service the building are Building, not business personal property.
> - **Improvements belong to the tenant's BPP:** A tenant's improvements and betterments are covered as its use interest under Your Business Personal Property, not under the building limit, even though they are attached to the building.
> - **The 100-foot zone:** Personal property in the open or in a vehicle is covered within 100 feet of the building or of the premises, whichever is greater. Property further away is covered only under an extension, such as property off premises.
> - **Money is never covered property:** Cash, securities and similar items are property not covered under any limit; the loss belongs to a crime policy.
