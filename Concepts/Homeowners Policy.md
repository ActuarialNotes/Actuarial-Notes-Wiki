---
aliases:
  - ISO Homeowner
  - HO
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5fc6db773ae3c8b9c21ceabc67f7a6cf5223cd846d68dee50446e18eb3d9d696
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Homeowners Policy.md
---
A **Homeowners Policy** (HO) is a package policy that insures a household's dwelling and personal property and its personal [[Liability Insurance|liability]] in one contract. The Insurance Services Office (ISO) publishes a family of homeowners forms, and the HO-3 special form is the most widely sold. Section I covers the property and Section II the liability, each with its own coverages, perils, exclusions and conditions.

The HO-3's coverages are:

| Section | Coverage | What it pays for |
| --- | --- | --- |
| I | A, dwelling | The dwelling and attached structures |
| I | B, other structures | Structures set apart from the dwelling, such as a detached garage or a fence |
| I | C, personal property | Personal property owned or used by an insured anywhere in the world |
| I | D, loss of use | Additional living expense, or fair rental value |
| II | E, personal liability | Damages the insured is legally liable for, and defense |
| II | F, medical payments to others | Medical expenses of others, without regard to fault |

Section I's coverages pay for damage to the insured's own property. Section II pays for injury or damage the insured causes to others. Each part is worked through in depth on [[HO-3 Property Coverages]], [[HO-3 Section I Perils Insured Against and Exclusions]], [[HO-3 Property Conditions]], [[HO-3 Liability Coverages]], [[HO-3 Liability Exclusions]] and [[HO-3 Coverage Conditions]], and the forms that fill its gaps on [[Homeowners Endorsements]].

## Section I, property

The HO-3 form caps Coverage B at 10% of the Coverage A limit, in addition to A. Coverage C's limit is whatever the declarations show. Coverage C insures personal property owned or used by an insured anywhere in the world, with special limits for categories such as money, securities, watercraft and the theft of jewelry, firearms and silverware. Coverage D, loss of use, pays the additional living expense of living elsewhere while the home is repaired, or the fair rental value of a part rented to others. Additional coverages include debris removal, reasonable repairs, trees and shrubs, and collapse.

Coverages A and B are written on an open perils basis: the HO-3 covers risk of direct physical loss unless it is excluded. Coverage C is written on a named perils basis and covers only the sixteen listed perils, which the [[Causes of Loss]] page lists.

The general exclusions remove ordinance or law, earth movement, water damage (flood, surface water, sewer backup and underground water), power failure away from the premises, neglect, war, nuclear hazard, intentional loss and governmental action. They are excluded because they are catastrophic, uninsurable or better insured elsewhere, as with [[Flood Insurance|flood insurance]] and earthquake endorsements. The open perils coverage also excludes wear and tear, deterioration, mechanical breakdown, settling, and damage by insects, vermin or the insured's own animals.

The insured must give prompt notice, protect the property from further damage, inventory the damaged property and submit a sworn proof of loss. Loss settlement pays [[Replacement Cost|replacement cost]] on buildings when the dwelling is insured for at least 80% of its replacement cost ([[Insurance to Value]]), and actual cash value on personal property unless an endorsement changes it. Other conditions cover appraisal, other insurance, the mortgage clause and suits against the insurer.

For one occurrence, the insurer pays under Section I

> $$\text{Section I} = \sum_k \min(L_k,\ \text{Limit}_k) - d$$

- $L_k$ is the covered loss under Section I coverage $k$, valued as the form's loss settlement condition says. Within Coverage C, a category with a special limit is capped at that limit, and other property is paid up to its loss, all within the Coverage C limit.
- $\text{Limit}_k$ is the limit of coverage $k$.
- $d$ is the deductible, which applies once to all the Section I loss from one occurrence.

> [!example]- What does the insurer pay for this kitchen fire? {Example}
> An HO-3 has a $\$1{,}000$ deductible and these limits:
>
> | Coverage | Limit ($) |
> | --- | ---: |
> | A, dwelling (its full replacement cost) | 350,000 |
> | B, other structures | 35,000 |
> | C, personal property | 175,000 |
>
> A kitchen fire causes $\$72{,}000$ of damage to the dwelling at replacement cost and $\$6{,}000$ to a detached garage that would cost $\$30{,}000$ to rebuild. Damaged contents would cost $\$30{,}000$ to replace and have an actual cash value of $\$18{,}000$. The family rents elsewhere for three months, at $\$2{,}400$ a month above its normal living costs.
>
> > [!answer]-
> > - Both buildings are insured for more than 80% of their replacement cost, so they are settled at replacement cost.
> > - The contents are settled at actual cash value, $\$18{,}000$.
> > - Coverage D pays $3 \times 2{,}400 = \$7{,}200$.
> > - No limit binds, so the loss is $72{,}000 + 6{,}000 + 18{,}000 + 7{,}200 = \$103{,}200$.
> > - The deductible applies once, because all four coverages respond to one occurrence, so the insurer pays $\$102{,}200$.
> > - A personal property replacement cost endorsement would have added the $\$12{,}000$ of depreciation on the contents.

## Section II, liability

Coverage E, personal liability, pays damages for bodily injury or property damage caused by an occurrence for which an insured is legally liable, and it defends the insured. Coverage F, medical payments to others, pays the necessary medical expenses of others injured on the insured location or by the insured's activities, without regard to fault. Coverage F does not pay the named insured or regular residents of the household, though it does pay a residence employee.

The liability exclusions remove exposures that belong on other policies: motor vehicles, most watercraft and aircraft, business and professional activities, injury expected or intended by the insured, and injury to an insured. Coverage E also excludes property the insured owns or has in its care, and injury to anyone eligible for workers compensation benefits from the insured. The limit applies per occurrence however many insureds are involved, and severability of insurance applies the policy to each insured separately.

For one occurrence, the insurer pays under Section II

> $$\text{Section II} = \min(D,\ L_E) + \sum_j \min(M_j,\ L_F)$$

- $D$ is the damages the insured is liable for from the occurrence.
- $L_E$ is the Coverage E limit.
- $M_j$ is the medical expenses of injured person $j$.
- $L_F$ is the Coverage F limit per person.

Defense costs are paid in addition to $L_E$.

> [!example]- What does the insurer pay for these dog bites? {Example}
> An HO-3 has limits of $\$300{,}000$ for Coverage E and $\$5{,}000$ per person for Coverage F. The insured's dog bites a guest at the home. The insurer pays the guest's $\$3{,}800$ of medical bills at once, and the guest later sues for other damages, which the insurer settles for $\$45{,}000$ after spending $\$12{,}000$ on defense. The same week, the dog bites the insured's own child.
>
> > [!answer]-
> > - Coverage F pays the guest $\min(3{,}800,\ 5{,}000) = \$3{,}800$, without any finding of fault.
> > - Coverage E pays the settlement, $\min(45{,}000,\ 300{,}000) = \$45{,}000$.
> > - The defense is paid in addition to the Coverage E limit, so the insurer pays $3{,}800 + 45{,}000 + 12{,}000 = \$60{,}800$.
> > - The child's injury is not covered, because Coverage F excludes residents of the household and Coverage E excludes injury to an insured.
> > - The child's medical costs belong to the family's health insurance.

## The HO forms

The HO-2 covers dwelling and contents for named perils (broad form), the HO-3 covers the dwelling for open perils and contents for named perils, and the HO-5 covers both for open perils. The HO-4 covers a tenant's contents and liability, the HO-6 a condominium unit owner's, and the HO-8 is a modified form for older homes whose replacement cost far exceeds their market value. Coverage is broadened or adjusted by [[Endorsement|endorsements]].

> [!trap] Applying the dwelling's open perils to the contents
> Under the HO-3 a loss can be covered for the dwelling and not for the contents in it, because only the dwelling is on an open perils basis. A loss to contents is covered only if one of the sixteen named perils caused it.
