---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7bdf692b022c2b5b0cdb47c4bf2ccae306d419a54f930c78718006d3df804ca3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/CGL Limits of Insurance.md
---

**CGL Limits of Insurance** is Section III of the ISO [[Commercial General Liability|Commercial General Liability Coverage Form]] (CG 00 01, 04 13 edition): six limits shown in the declarations, and the rules for stacking them, that fix the most the insurer will pay however many insureds, claims, suits or claimants there are. Two aggregates cap the policy year, and four per-event limits sit inside them.

> $$\text{Paid}_k = \min\left(X_k,\ L_k,\ G_{k-1}\right)$$

> $$G_k = G_{k-1} - \text{Paid}_k$$

- **Symbols:** $X_k$ is what claim $k$ would cost without limits (Coverage A damages plus Coverage C medical expenses for one occurrence, or Coverage B damages for one person). $L_k$ is the per-event limit that applies to it: the each occurrence limit, the Personal and Advertising Injury limit, or a sublimit inside the each occurrence limit. $G_{k-1}$ is what remains of the aggregate the claim falls under before it is paid. Defense costs are [[CGL Supplementary Payments|supplementary payments]] and appear nowhere here.
- **1. No multiplication:** The limits and rules fix the most the insurer pays regardless of the number of insureds, claims made or suits brought, or persons or organizations making claims or bringing suits. Adding insureds, including additional insureds, does not add limits.
- **2. General Aggregate Limit:** The most paid for the sum of medical expenses under Coverage C, damages under Coverage A except those within the products-completed operations hazard, and damages under Coverage B.
- **3. Products-Completed Operations Aggregate Limit:** The most paid under Coverage A for damages because of bodily injury and property damage within the [[Products and Completed Operations Liability|products-completed operations hazard]]. A claim reduces one aggregate or the other, never both.
- **4. Personal and Advertising Injury Limit:** Subject to the general aggregate, the most paid under [[CGL Coverage B|Coverage B]] for all personal and advertising injury sustained by any one person or organization.
- **5. Each Occurrence Limit:** Subject to whichever aggregate applies, the most paid for the sum of Coverage A damages and Coverage C medical expenses because of all bodily injury and property damage arising out of any one occurrence. A medical payment and a later judgment from the same accident share it.
- **6. Damage to Premises Rented to You Limit:** Subject to the each occurrence limit, the most paid under Coverage A for property damage to any one premises while rented to the named insured, or, for fire damage, while rented to it or temporarily occupied by it with the owner's permission ([[CGL Coverage A Exclusions]]).
- **7. Medical Expense Limit:** Subject to the each occurrence limit, the most paid under [[CGL Coverage C|Coverage C]] for all medical expenses because of bodily injury sustained by any one person.
- **Annual periods:** The limits apply separately to each consecutive annual period, and to any remaining period of less than 12 months, starting from the beginning of the policy period. If the policy period is extended after issuance for less than 12 months, the extension is treated as part of the last preceding period, so it gets no fresh aggregate.
- **Exhaustion and defense:** When the applicable limit is used up in judgments or settlements under Coverages A or B, or medical expenses under Coverage C, the insurer's right and duty to defend end ([[CGL Coverage A Insuring Agreement]]). An [[Umbrella Liability Insurance|umbrella]] or [[Excess Insurance|excess]] policy is what responds above the limits.
- **Endorsements that change the structure:** A per-project or per-location aggregate endorsement gives each designated construction project its own general aggregate ([[CGL Endorsements]]); a contract can also cap what an additional insured receives.

> [!example]- Five Claims Against One Policy Year {Example}
> A furniture retailer's CGL policy has these limits: each occurrence \$1,000,000; general aggregate \$2,000,000; products-completed operations aggregate \$2,000,000; personal and advertising injury \$1,000,000; damage to premises rented to you \$300,000; medical expense \$10,000. During one policy year, in this order:
>
> 1. A fire caused by the retailer's negligence does \$420,000 of damage to the warehouse it leases.
> 2. A customer tripped in the showroom reports \$14,000 of medical expenses under Coverage C.
> 3. An advertisement defames two competitors, who recover \$1,200,000 and \$300,000.
> 4. A recliner sold last year collapses in a buyer's home; the buyer recovers \$1,500,000.
> 5. A delivery helper's dropped mirror injures a visitor at the showroom, who recovers \$600,000.
>
> What does the insurer pay on each?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Paid}_1 &= \min(420{,}000,\ 300{,}000) \\
> > &= 300{,}000 \\
> > \text{Paid}_2 &= \min(14{,}000,\ 10{,}000) \\
> > &= 10{,}000 \\
> > \text{Paid}_{3} &= \min(1{,}200{,}000,\ 1{,}000{,}000) + \min(300{,}000,\ 1{,}000{,}000) \\
> > &= 1{,}300{,}000 \\
> > G_3 &= 2{,}000{,}000 - 300{,}000 - 10{,}000 - 1{,}300{,}000 \\
> > &= 390{,}000 \\
> > \text{Paid}_4 &= \min(1{,}500{,}000,\ 1{,}000{,}000,\ 2{,}000{,}000) \\
> > &= 1{,}000{,}000 \\
> > \text{Paid}_5 &= \min(600{,}000,\ 1{,}000{,}000,\ 390{,}000) \\
> > &= 390{,}000
> > \end{align*}
> > $$
> > Claims 1, 2, 3 and 5 all reduce the general aggregate, which is exhausted by claim 5. Claim 4 is within the products-completed operations hazard, so it reduces only that aggregate, leaving \$1,000,000 of it. The insurer pays \$3,000,000 in all; the retailer bears \$120,000 of the fire, \$4,000 of the medical expenses (which the customer may still pursue as damages), \$200,000 of the first libel, \$500,000 of the recliner and \$210,000 of the showroom injury.

> [!example]- A Fifteen-Month Policy {Example}
> Two contractors each buy a CGL policy with a \$2,000,000 general aggregate. Contractor A's policy is issued for January 1, 2026 to April 1, 2027. Contractor B's policy is issued for January 1, 2026 to January 1, 2027 and, after issuance, is extended to April 1, 2027. Each has \$1,800,000 of general-aggregate claims in 2026 and \$700,000 of claims in the first quarter of 2027. How much of the 2027 claims does each policy pay, assuming every claim is within the each occurrence limit?
>
> > [!answer]-
> > Contractor A's policy was issued for fifteen months, so the limits apply separately to the first annual period and to the remaining three months. The 2027 claims draw on a fresh \$2,000,000 aggregate and are paid in full: \$700,000.
> >
> > Contractor B's extension was added after issuance for less than 12 months, so the three months are part of the last preceding period and share its aggregate.
> > $$
> > \begin{align*}
> > G_{2026} &= 2{,}000{,}000 - 1{,}800{,}000 \\
> > &= 200{,}000 \\
> > \text{Paid}_{2027} &= \min(700{,}000,\ 200{,}000) \\
> > &= 200{,}000
> > \end{align*}
> > $$
> > Contractor B's policy pays \$200,000 of the 2027 claims and the contractor bears \$500,000.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Section 11 asks candidates to apply the limits to a series of claims: pick the per-event limit, pick the aggregate, and track what remains. Questions mix Coverages A, B and C and a products claim.
> - **With supplementary payments:** A common twist adds defense costs and asks whether they reduce the limits (they don't).

> [!warning]- Exam traps
> - **One aggregate per claim:** A products-completed operations claim reduces only the products aggregate; every other Coverage A claim, every Coverage B claim and every Coverage C payment reduces the general aggregate.
> - **Sublimits are inside, not on top:** The damage to premises rented and medical expense limits are subject to the each occurrence limit; they don't add to it.
> - **Per person, not per occurrence, for Coverage B:** The personal and advertising injury limit applies to each person or organization injured.
> - **Extensions don't refresh the aggregate:** An extension of less than 12 months added after issuance shares the last period's aggregate; a policy issued for more than a year gets a separate aggregate for its stub period.
