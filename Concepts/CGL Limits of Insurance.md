---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:44fb098dd695556cd091b56b100e2b18b4ee4c7cbc1453156a2633a9f1fb038e
  sources:
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), Section III paras 1-7 and the annual-period paragraph (pp.10-11), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "ISO CG 25 03 05 09 Designated Construction Project(s) General Aggregate Limit (NY OGS SPC Exhibit 21), paras A-E, sha256:509a3393d259f4582657f70278d7e328c56fcf7c1af5b0fc3fc6a091ec1bec17 — https://ogs.ny.gov/spc-exhibit-21"
    - "ISO CG 20 10 04 13 Additional Insured – Owners, Lessees or Contractors – Scheduled Person or Organization (City of Hayward sample), para C (lesser of contract or available limits), sha256:1b76886d2dc2530490dd2f276acf6cacd08529e5fc75b33ed76b0cf3a15aba04 — https://hayward-ca.gov/sites/default/files/documents/Sample-Additional-Insured_0.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/CGL Limits of Insurance.md
---

**CGL Limits of Insurance** is Section III of the ISO [[Commercial General Liability|Commercial General Liability Coverage Form]] (CG 00 01, 04 13 edition): six limits shown in the declarations, and the rules for stacking them, that fix the most the insurer will pay. Two aggregates cap the policy year, and four per-event limits sit inside them.

The limits fix the most the insurer pays regardless of the number of insureds, claims made or suits brought, or persons or organizations making claims or bringing suits. Adding insureds, including additional insureds, does not add limits. The six limits are:

1. **General Aggregate Limit**: the most paid for the sum of medical expenses under Coverage C, damages under Coverage A except those within the products-completed operations hazard, and damages under Coverage B.
2. **Products-Completed Operations Aggregate Limit**: the most paid under Coverage A for damages because of bodily injury and property damage within the [[Products and Completed Operations Liability|products-completed operations hazard]].
3. **Personal and Advertising Injury Limit**: subject to the general aggregate, the most paid under [[CGL Coverage B|Coverage B]] for all personal and advertising injury sustained by any one person or organization.
4. **Each Occurrence Limit**: subject to whichever aggregate applies, the most paid for the sum of Coverage A damages and Coverage C medical expenses because of all bodily injury and property damage arising out of any one occurrence.
5. **Damage to Premises Rented to You Limit**: subject to the each occurrence limit, the most paid under Coverage A for property damage to any one premises while rented to the named insured, or, for fire damage, while rented to it or temporarily occupied by it with the owner's permission ([[CGL Coverage A Exclusions]]).
6. **Medical Expense Limit**: subject to the each occurrence limit, the most paid under [[CGL Coverage C|Coverage C]] for all medical expenses because of bodily injury sustained by any one person.

A claim reduces one aggregate or the other, never both, and an amount one aggregate can't pay is not paid from the other. A medical payment and a later judgment from the same accident share the each occurrence limit. Claims are applied in the order they are paid, and the payment on claim $k$ is

> $$\text{Paid}_k = \min\left(X_k,\ L_k,\ G_{k-1}\right)$$

- $X_k$ is what claim $k$ would cost without limits: Coverage A damages plus Coverage C medical expenses for one occurrence, or Coverage B damages for one person.
- $L_k$ is the per-event limit that applies to it: the each occurrence limit, the Personal and Advertising Injury limit, or a sublimit inside the each occurrence limit.
- $G_{k-1}$ is what remains of the aggregate the claim falls under before it is paid.

The aggregate is then reduced by the payment:

> $$G_k = G_{k-1} - \text{Paid}_k$$

Defense costs are [[CGL Supplementary Payments|supplementary payments]] and appear nowhere here.

> [!example]- What does the insurer pay on each of these five claims in one policy year? {Example}
> A furniture retailer's CGL policy has these limits:
>
> | Limit | Amount ($) |
> | :--- | ---: |
> | Each occurrence | 1,000,000 |
> | General aggregate | 2,000,000 |
> | Products-completed operations aggregate | 2,000,000 |
> | Personal and advertising injury | 1,000,000 |
> | Damage to premises rented to you | 300,000 |
> | Medical expense | 10,000 |
>
> During one policy year, in this order:
>
> 1. A fire caused by the retailer's negligence does $\$420{,}000$ of damage to the warehouse it leases.
> 2. A customer who tripped in the showroom reports $\$14{,}000$ of medical expenses under Coverage C.
> 3. An advertisement defames two competitors, who recover $\$1{,}200{,}000$ and $\$300{,}000$.
> 4. A recliner sold last year collapses in a buyer's home, and the buyer recovers $\$1{,}500{,}000$.
> 5. A delivery helper's dropped mirror injures a visitor at the showroom, who recovers $\$600{,}000$.
>
> > [!answer]-
> > - Claim 1 is capped by the damage to premises rented limit: $\min(420{,}000,\ 300{,}000) = \$300{,}000$.
> > - Claim 2 is capped by the medical expense limit: $\min(14{,}000,\ 10{,}000) = \$10{,}000$.
> > - Claim 3 is capped per competitor: $1{,}000{,}000 + 300{,}000 = \$1{,}300{,}000$.
> > - Claims 1 to 3 all reduce the general aggregate, which has $2{,}000{,}000 - 300{,}000 - 10{,}000 - 1{,}300{,}000 = \$390{,}000$ left.
> > - Claim 4 is within the products-completed operations hazard, so it is paid $\min(1{,}500{,}000,\ 1{,}000{,}000,\ 2{,}000{,}000) = \$1{,}000{,}000$ from that aggregate alone.
> > - Claim 5 reduces the general aggregate and is paid $\min(600{,}000,\ 1{,}000{,}000,\ 390{,}000) = \$390{,}000$, which exhausts it.
> > - The insurer pays $\$3{,}000{,}000$ in all. The retailer bears $\$120{,}000$ of the fire, $\$4{,}000$ of the medical expenses (which the customer may still pursue as damages), $\$200{,}000$ of the first libel, $\$500{,}000$ of the recliner and $\$210{,}000$ of the showroom injury.

## Annual periods

The limits apply separately to each consecutive annual period, and to any remaining period of less than 12 months, starting from the beginning of the policy period. If the policy period is extended after issuance for less than 12 months, the extension is treated as part of the last preceding period, so it gets no fresh aggregate. The form does not prorate limits by the length of a period.

> [!example]- How much of the 2027 claims does each contractor's policy pay? {Example}
> Two contractors each buy a CGL policy with a $\$2{,}000{,}000$ general aggregate. Contractor A's policy is issued for January 1, 2026 to April 1, 2027. Contractor B's policy is issued for January 1, 2026 to January 1, 2027 and, after issuance, is extended to April 1, 2027. Each has $\$1{,}800{,}000$ of general-aggregate claims in 2026 and $\$700{,}000$ of claims in the first quarter of 2027. Every claim is within the each occurrence limit.
>
> > [!answer]-
> > - Contractor A's policy was issued for fifteen months, so the limits apply separately to the first annual period and to the remaining three months.
> > - Contractor A's 2027 claims draw on a fresh $\$2{,}000{,}000$ aggregate and are paid in full, $\$700{,}000$.
> > - Contractor B's extension was added after issuance for less than 12 months, so the three months share the 2026 aggregate, which has $2{,}000{,}000 - 1{,}800{,}000 = \$200{,}000$ left.
> > - Contractor B's policy pays $\min(700{,}000,\ 200{,}000) = \$200{,}000$ of the 2027 claims, and the contractor bears $\$500{,}000$.

## Exhaustion and the duty to defend

When the applicable limit is used up in judgments or settlements under Coverages A or B, or medical expenses under Coverage C, the insurer's right and duty to defend end ([[CGL Coverage A Insuring Agreement]]). A claim that is larger than the limit does not end the duty by itself. An [[Umbrella Liability Insurance|umbrella]] or [[Excess Insurance|excess]] policy is what responds above the limits.

A designated construction project aggregate endorsement gives each scheduled project its own general aggregate, and a contract can cap what an additional insured receives ([[CGL Endorsements]]).

> [!trap] Adding a sublimit to the each occurrence limit
> The damage to premises rented and medical expense limits are inside the each occurrence limit, not on top of it. A $\$10{,}000$ medical payment and a $\$995{,}000$ judgment from the same accident under a $\$1{,}000{,}000$ each occurrence limit leave $\$990{,}000$ for the judgment.
