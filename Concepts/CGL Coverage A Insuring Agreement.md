---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:872bcd3d76aae6596a4efd05c5286c0a6d31d64ae1fc757d9ca3d2a4e22aff11
  sources:
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), Section I Coverage A para 1.a-1.e (p.1); Section II para 1 (p.9); Section V defs 3, 4, 13, 17, 18 (pp.13-16), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "FC&S Editors, 'Claims-Made CGL Form' (PropertyCasualty360, Feb 18 2014), reproducing CG 00 02 04 13 Coverage A/B triggers, conditions and Section V Extended Reporting Periods, Coverage A trigger para b-c of CG 00 02 04 13, sha256:50deda297f1951ab725a435ed84e2aef1287e833a2365374cede46df9213a9b7 — https://www.propertycasualty360.com/fcs/2014/02/18/claims-made-cgl-form"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/CGL Coverage A Insuring Agreement.md
---

The **CGL Coverage A insuring agreement** is the grant of bodily injury and property damage liability coverage in the ISO [[Commercial General Liability|Commercial General Liability Coverage Form]] (CG 00 01, 04 13 edition). The insurer promises to pay the damages an insured becomes legally obligated to pay because of "bodily injury" or "property damage" to which the insurance applies, and to defend the insured against any "suit" seeking those damages.

Under paragraph b, the insurance applies only if:

1. the injury or damage is caused by an "occurrence" that takes place in the coverage territory,
2. the injury or damage occurs during the policy period, and
3. before the policy period, no insured listed in paragraph 1 of [[CGL Who Is an Insured|Section II, Who Is an Insured]], and no employee authorized to give or receive notice of an occurrence or claim, knew that it had occurred, in whole or in part.

Whatever falls within this insuring agreement can still be removed by the [[CGL Coverage A Exclusions|Coverage A exclusions]].

## Damages and the duty to defend

The insurer pays damages and has both the right and the [[Duty to Defend|duty to defend]] a suit seeking them. It has no duty to defend a suit seeking damages to which the insurance does not apply, and it may investigate any occurrence and settle any claim or suit at its discretion. What it pays for damages is limited by Section III, Limits of Insurance:

> $$\text{Paid} = \min\left(D,\ L,\ G\right)$$

- $D$ is the damages the insured is legally obligated to pay.
- $L$ is the each occurrence limit.
- $G$ is what remains of the applicable aggregate ([[CGL Limits of Insurance]]).

Defense costs are not in this expression. They are [[CGL Supplementary Payments|supplementary payments]], paid in addition to the limits. The right and duty to defend end once the applicable limit has been used up paying judgments or settlements under Coverages A or B, or medical expenses under Coverage C. No other obligation to pay sums or perform services is covered unless the Supplementary Payments section provides for it.

## The definitions it turns on

The insuring agreement uses four defined terms:

- **"Bodily injury"** is bodily injury, sickness or disease sustained by a person, including death resulting from any of them.
- **"Property damage"** is physical injury to tangible property, including all resulting loss of use, deemed to occur when the physical injury did. It is also loss of use of tangible property that is not physically injured, deemed to occur when the occurrence that caused it did. Electronic data is not tangible property.
- **An "occurrence"** is an accident, including continuous or repeated exposure to substantially the same general harmful conditions.
- **A "suit"** is a civil proceeding alleging such damages, including an arbitration the insured must submit to or submits to with the insurer's consent, and any other alternative dispute resolution proceeding the insured submits to with consent.

Under paragraph e, damages because of bodily injury include damages any person or organization claims for care, loss of services or death resulting at any time from the bodily injury, such as a spouse's claim for loss of services.

> [!example]- A crane blocks a hotel's entrance and strikes a passer-by, whose wife sues for loss of his services. Which claims are within the insuring agreement? {Example}
> A contractor's crane topples during the policy period and blocks the only entrance to a neighbouring hotel for five days. Nothing at the hotel is physically damaged, but it loses $\$60{,}000$ of room revenue.
>
> > [!answer]-
> > - The hotel's claim is property damage under the second half of the definition, loss of use of tangible property that is not physically injured.
> > - That loss of use is deemed to occur at the time of the occurrence that caused it, the crane's collapse during the policy period.
> > - The wife's claim is for damages because of bodily injury, because paragraph e includes damages claimed by any person for loss of services resulting from the bodily injury.
> > - Both claims are within the insuring agreement. Whether either is finally paid still depends on the exclusions and the limits.

## The policy period and known injury

Coverage A of CG 00 01 is triggered by injury or damage during the policy period, not by when the negligent act happened or when the claim is made, which is what makes it an [[Occurrence Coverage|occurrence]] form. The injury must happen within the policy period:

> $$t_0 \le t_{\text{inj}} \le t_1$$

- $t_0$ and $t_1$ are the start and end of the policy period.
- $t_{\text{inj}}$ is when the bodily injury or property damage happens.

and no one whose knowledge counts may have known of it before the period began:

> $$t_{\text{known}} \ge t_0$$

- $t_{\text{known}}$ is the earliest time a listed insured or an authorized employee knew of the injury or damage.

Under paragraph d, injury or damage is deemed known at the earliest time a listed insured or authorized employee reports any part of it to this or any other insurer, receives a written or verbal demand or claim for damages because of it, or becomes aware by any other means that it has occurred or has begun to occur. Knowledge by an ordinary employee does not count unless that employee was authorized to give or receive notice of occurrences or claims. Knowledge by the named insured or an executive officer does.

If such a person knew before the policy period, any continuation, change or resumption of the injury during or after the policy period is deemed known before the policy period too. Under paragraph c, injury or damage that occurs during the policy period, and that no listed insured or authorized employee knew of beforehand, includes its continuation, change or resumption after the policy period ends. The policy in force when the injury began keeps responding to it.

The claims-made version, CG 00 02, adds a retroactive date and requires that a claim be first made against an insured during the policy period or an extended reporting period ([[CGL Endorsements]]).

> [!example]- Does the restaurant's current policy respond to this leak? {Example}
> A restaurant's CGL policy runs from January 1 to December 31. In November of the previous year, water from the restaurant's ice machine began seeping through the floor into the clothing store below, and the store's owner phoned the restaurant's sole owner, who is the named insured, to complain. The seepage continues into March, and in April the store sues for damage to its stock.
>
> > [!answer]-
> > - The damage is property damage caused by an occurrence, continuous exposure to the same harmful condition.
> > - The named insured is an insured listed in paragraph 1 of Who Is an Insured, and the November call made him aware that the damage had begun, before the policy period.
> > - Because he knew of it, the continuation of the damage into the new policy period is deemed known before that period too, so paragraph b(3) fails.
> > - The current policy does not respond. The store must look to the policy that was in force when the damage began.

## Coverage territory

The coverage territory is:

1. The United States (including its territories and possessions), Puerto Rico and Canada.
2. International waters or airspace while travelling between those places.
3. Anywhere else in the world, if the injury arises from goods made or sold by the named insured in the territory in (1), from the activities of a person whose home is in it but who is away for a short time on the insured's business, or from personal and advertising injury offenses committed through the Internet.

For the worldwide part, the insured's responsibility to pay must be decided in a suit on the merits in the United States, Puerto Rico or Canada, or in a settlement the insurer agrees to.

> [!example]- Is a U.S.-made tool's injury to a buyer in Mexico within the coverage territory if liability is decided in a U.S. or a Mexican court? {Example}
> - Mexico is outside the United States, Puerto Rico and Canada, so coverage depends on the worldwide part of the territory.
> - The injury arises from goods the named insured made and sold in the United States, so the worldwide part can apply.
> - If he sues the manufacturer in a U.S. court, the suit on the merits is in the United States, so the occurrence is within the coverage territory and Coverage A applies.
> - If liability is decided in a Mexican court, the occurrence is outside the coverage territory and Coverage A does not apply, unless the insurer agrees to a settlement.

> [!trap] Dating coverage by the negligent act or the claim
> Coverage A asks when the bodily injury or property damage happened, not when the negligent act happened or when the claim was made. A product sold years ago that injures someone this year is covered by this year's policy.
