---
aliases:
  - ISO Homeowner
  - HO
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:62f6e4dfc17b812914bb99e668183bd3078067ff7af144f487a4098fb080340e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Homeowners Policy.md
---
A **Homeowners Policy** (HO) is a package policy that insures a household's dwelling and personal property and its personal [[Liability Insurance|liability]] in one contract. The Insurance Services Office (ISO) publishes a family of homeowners forms, and the HO-3 special form is the most widely sold. Section I covers the property and Section II the liability, each with its own coverages, perils, exclusions and conditions.

> $$B = 0.10 \times A$$

> $$C = 0.50 \times A$$

> $$\text{Section I} = \sum_k \min(L_k,\ \text{Limit}_k) - d$$

> $$\text{Section II} = \min(D,\ L_E) + \sum_j \min(M_j,\ L_F)$$

- **Symbols:** $A$ is the Coverage A limit on the dwelling. The HO-3 form itself caps Coverage B at 10% of A, in addition to A. Coverage C's limit is whatever the declarations show; the 50% of A used here and in the example below is an illustrative setting, not a term of the form. $L_k$ is the covered loss under Section I coverage $k$, valued as the form's loss settlement condition says, and $d$ is the deductible, which applies once to all the Section I loss from one occurrence. In Section II, $D$ is the damages the insured is liable for from one occurrence, $L_E$ the Coverage E limit, $M_j$ the medical expenses of injured person $j$ and $L_F$ the Coverage F limit per person. Defense costs are paid in addition to $L_E$.
- **Section I coverages:** Coverage A insures the dwelling and attached structures, and Coverage B other structures set apart from it, such as a detached garage or a fence. Coverage C insures personal property owned or used by an insured anywhere in the world, with special limits for categories such as money, securities, watercraft and the theft of jewelry, firearms and silverware. Coverage D, loss of use, pays the additional living expense of living elsewhere while the home is repaired, or the fair rental value of a part rented to others. Additional coverages include debris removal, reasonable repairs, trees and shrubs, and collapse.
- **Perils insured against:** Coverages A and B are written on an open perils basis: the HO-3 covers risk of direct physical loss unless it is excluded. Coverage C is written on a named perils basis and covers only the sixteen listed perils, which the [[Causes of Loss]] page lists.
- **Section I exclusions:** The general exclusions remove ordinance or law, earth movement, water damage (flood, surface water, sewer backup and underground water), power failure away from the premises, neglect, war, nuclear hazard, intentional loss and governmental action. They are excluded because they are catastrophic, uninsurable or better insured elsewhere, as with [[Flood Insurance|flood insurance]] and earthquake endorsements. The open perils coverage also excludes wear and tear, deterioration, mechanical breakdown, settling, and damage by insects, vermin or the insured's own animals.
- **Section I conditions:** The insured must give prompt notice, protect the property from further damage, inventory the damaged property and submit a sworn proof of loss. Loss settlement pays [[Replacement Cost|replacement cost]] on buildings when the dwelling is insured for at least 80% of its replacement cost ([[Insurance to Value]]), and actual cash value on personal property unless an endorsement changes it. Other conditions cover appraisal, other insurance, the mortgage clause and suits against the insurer.
- **Section II coverages:** Coverage E, personal liability, pays damages for bodily injury or property damage caused by an occurrence for which an insured is legally liable, and it defends the insured. Coverage F, medical payments to others, pays the necessary medical expenses of others injured on the insured location or by the insured's activities, without regard to fault. Coverage F does not pay the named insured or regular residents of the household.
- **Section II exclusions and conditions:** The liability exclusions remove exposures that belong on other policies: motor vehicles, most watercraft and aircraft, business and professional activities, injury expected or intended by the insured, and injury to an insured. Coverage E also excludes property the insured owns or has in its care, and injury to anyone eligible for workers compensation benefits from the insured. The limit applies per occurrence however many insureds are involved, and severability of insurance applies the policy to each insured separately.
- **Each part in depth:** Section I is worked through on [[HO-3 Property Coverages]], [[HO-3 Section I Perils Insured Against and Exclusions]] and [[HO-3 Property Conditions]]; Section II on [[HO-3 Liability Coverages]], [[HO-3 Liability Exclusions]] and [[HO-3 Coverage Conditions]]; and the forms that fill its gaps on [[Homeowners Endorsements]].
- **The HO forms:** The HO-2 covers dwelling and contents for named perils (broad form), the HO-3 covers the dwelling for open perils and contents for named perils, and the HO-5 covers both for open perils. The HO-4 covers a tenant's contents and liability, the HO-6 a condominium unit owner's, and the HO-8 is a modified form for older homes whose replacement cost far exceeds their market value. Coverage is broadened or adjusted by [[Endorsement|endorsements]].

> [!example]- A Kitchen Fire Across Section I {Example}
> An HO-3 has a Coverage A limit of \$350,000, the dwelling's full replacement cost, Coverage B at its 10% of A, Coverage C set at 50% of A, and a \$1,000 deductible. A kitchen fire causes \$72,000 of damage to the dwelling at replacement cost and \$6,000 to a detached garage that would cost \$30,000 to rebuild. Damaged contents would cost \$30,000 to replace and have an actual cash value of \$18,000. The family rents elsewhere for three months, at \$2,400 a month above its normal living costs. What does the insurer pay?
>
> > [!answer]-
> > The Coverage B limit is \$35,000, and with Coverage C set at half of A its limit is \$175,000, so no limit binds. Both buildings are insured for more than 80% of their replacement cost, so they are settled at replacement cost, and the contents at actual cash value.
> > $$
> > \begin{align*}
> > \text{Loss} &= 72{,}000 + 6{,}000 + 18{,}000 + 3(2{,}400) \\
> > &= 103{,}200 \\
> > \text{Section I} &= 103{,}200 - 1{,}000 \\
> > &= 102{,}200
> > \end{align*}
> > $$
> > The deductible applies once, because all four coverages respond to one occurrence. A personal property replacement cost endorsement would have added the \$12,000 of depreciation on the contents.

> [!example]- A Dog Bite Under Section II {Example}
> With illustrative limits of \$300,000 for Coverage E and \$5,000 per person for Coverage F, the insured's dog bites a guest at the home. The insurer pays the guest's \$3,800 of medical bills at once, and the guest later sues for other damages, which the insurer settles for \$45,000 after spending \$12,000 on defense. The same week, the dog bites the insured's own child. What does the insurer pay?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Coverage F} &= \min(3{,}800,\ 5{,}000) \\
> > &= 3{,}800 \\
> > \text{Coverage E} &= \min(45{,}000,\ 300{,}000) \\
> > &= 45{,}000 \\
> > \text{Total} &= 3{,}800 + 45{,}000 + 12{,}000 \\
> > &= 60{,}800
> > \end{align*}
> > $$
> > Coverage F pays without any finding of fault, and the defense is paid in addition to the Coverage E limit. The child's injury is not covered: Coverage F excludes residents of the household, and Coverage E excludes injury to an insured. The child's medical costs belong to the family's health insurance.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions take the HO-3 one section at a time: the property coverages, the perils insured against and exclusions, the property conditions, then the liability coverages, exclusions and conditions. The applied version describes a loss or an injury and asks which coverage responds, whether a peril or exclusion applies, and how much the insurer pays after limits, special limits, loss settlement and the deductible.
> - **GI-302:** Candidates describe the contents of the ISO homeowners policies and the coverages they provide, including how the HO forms differ, alongside the ISO personal auto policy.

> [!warning]- Exam traps
> - **Open perils for the house, named perils for the contents:** Under the HO-3 a loss can be covered for the dwelling and not for the contents in it, because only the dwelling is on an open perils basis. Applying the dwelling's coverage to the contents covers losses the form does not.
> - **Contents at actual cash value:** The 80% replacement cost condition applies to buildings. Personal property is settled at actual cash value unless an endorsement provides replacement cost.
> - **One deductible per occurrence:** The deductible comes off the total Section I loss from one occurrence, not once per coverage. Subtracting it from each coverage understates the payment.
> - **Coverage F is not for the household:** Medical payments to others never pay the named insured or regular residents of the household, though they do pay a residence employee. An answer that pays a resident family member's medical bills under Coverage F has missed the exclusion.
