---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:afa5eb209799e47a87d52a76bab3688251fd23c2500d2dfe26c6de71f3d58b8a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/CGL Coverage A Insuring Agreement.md
---

The **CGL Coverage A insuring agreement** is the grant of bodily injury and property damage liability coverage in the ISO [[Commercial General Liability|Commercial General Liability Coverage Form]] (CG 00 01, 04 13 edition). The insurer promises to pay the damages an insured becomes legally obligated to pay because of "bodily injury" or "property damage" to which the insurance applies, and to defend the insured against any "suit" seeking those damages, provided the injury or damage is caused by an "occurrence" in the coverage territory, happens during the policy period and was not known to certain insureds before the policy began.

> $$t_0 \le t_{\text{inj}} \le t_1$$

> $$t_{\text{known}} \ge t_0$$

> $$\text{Paid} = \min\left(D,\ L,\ G\right)$$

- **Symbols:** $t_0$ and $t_1$ are the start and end of the policy period, $t_{\text{inj}}$ is when the bodily injury or property damage happens, and $t_{\text{known}}$ is the earliest time a listed insured or an authorized employee knew of it. $D$ is the damages the insured is legally obligated to pay, $L$ is the each occurrence limit and $G$ is what remains of the applicable aggregate ([[CGL Limits of Insurance]]). Defense costs are not in this expression: they are [[CGL Supplementary Payments|supplementary payments]], paid in addition to the limits.
- **Two promises:** The insurer pays damages and has both the right and the [[Duty to Defend|duty to defend]] a suit seeking them. It has no duty to defend a suit seeking damages to which the insurance does not apply, and it may investigate any occurrence and settle any claim or suit at its discretion.
- **Where the promises stop:** What the insurer pays for damages is limited by Section III, Limits of Insurance. Its right and duty to defend end once the applicable limit has been used up paying judgments or settlements under Coverages A or B, or medical expenses under Coverage C. No other obligation to pay sums or perform services is covered unless the Supplementary Payments section provides for it.
- **The three conditions in paragraph b:** The insurance applies only if (1) the injury or damage is caused by an occurrence that takes place in the coverage territory, (2) the injury or damage occurs during the policy period, and (3) before the policy period no insured listed in paragraph 1 of [[CGL Who Is an Insured|Section II, Who Is an Insured]], and no employee authorized to give or receive notice of an occurrence or claim, knew that it had occurred, in whole or in part. If such a person knew, any continuation, change or resumption of the injury during or after the policy period is deemed known before the policy period too.
- **Continuing injury (paragraph c):** Injury or damage that occurs during the policy period, and that no listed insured or authorized employee knew of beforehand, includes its continuation, change or resumption after the policy period ends. The policy in force when the injury began keeps responding to it.
- **When injury is known (paragraph d):** Injury or damage is deemed known at the earliest time a listed insured or authorized employee reports any part of it to this or any other insurer, receives a written or verbal demand or claim for damages because of it, or becomes aware by any other means that it has occurred or has begun to occur.
- **Consequential damages (paragraph e):** Damages because of bodily injury include damages any person or organization claims for care, loss of services or death resulting at any time from the bodily injury, such as a spouse's claim for loss of services.
- **The definitions it turns on:** "Bodily injury" is bodily injury, sickness or disease sustained by a person, including death resulting from any of them. "Property damage" is physical injury to tangible property, including all resulting loss of use (deemed to occur when the physical injury did), or loss of use of tangible property that is not physically injured (deemed to occur when the occurrence did); electronic data is not tangible property. An "occurrence" is an accident, including continuous or repeated exposure to substantially the same general harmful conditions. A "suit" is a civil proceeding alleging such damages, including an arbitration the insured must submit to or submits to with the insurer's consent, and any other alternative dispute resolution proceeding the insured submits to with consent.
- **Coverage territory:** The United States (including its territories and possessions), Puerto Rico and Canada; international waters or airspace while travelling between those places; and anywhere else in the world if the injury arises from goods made or sold by the named insured in that territory, from the activities of a person whose home is in it but who is away for a short time on the insured's business, or from personal and advertising injury offenses committed through the Internet. For the worldwide part, the insured's responsibility to pay must be decided in a suit on the merits in the United States, Puerto Rico or Canada, or in a settlement the insurer agrees to.
- **An injury trigger:** Coverage A of CG 00 01 is triggered by injury or damage during the policy period, not by when the claim is made, which is what makes it an [[Occurrence Coverage|occurrence]] form. The claims-made version, CG 00 02, adds a retroactive date and a claim-reporting requirement ([[CGL Endorsements]]). Whatever falls within this insuring agreement can still be removed by the [[CGL Coverage A Exclusions|Coverage A exclusions]].

> [!example]- A Leak the Insured Already Knew About {Example}
> A restaurant's CGL policy runs from January 1 to December 31. In November of the previous year, water from the restaurant's ice machine began seeping through the floor into the clothing store below, and the store's owner phoned the restaurant's sole owner, who is the named insured, to complain. The seepage continues into March, and in April the store sues for damage to its stock. Does the current policy's Coverage A respond?
>
> > [!answer]-
> > No. The damage is property damage caused by an occurrence (continuous exposure to the same harmful condition), but paragraph b(3) fails. The named insured is an insured listed in paragraph 1 of Who Is an Insured, and the neighbour's call in November made him aware that the damage had begun, before the policy period. Because he knew of it, the continuation of the damage into the new policy period is deemed known before that period too, so the current policy does not apply. The store must look to the policy that was in force when the damage began.

> [!example]- A Product Injury Abroad {Example}
> A U.S. manufacturer sells power tools to a U.S. retailer. A buyer takes one on holiday to Mexico, where it shatters and injures him. Analyse coverage territory in two cases: (a) he sues the manufacturer in a U.S. court and wins a judgment; (b) he sues in a Mexican court and wins a judgment there.
>
> > [!answer]-
> > Mexico is outside the core territory of the United States, Puerto Rico and Canada, so coverage depends on the worldwide extension. The injury arises from goods the named insured made and sold within the core territory, so the extension can apply, but only if the insured's responsibility to pay is decided in a suit on the merits in the United States, Puerto Rico or Canada, or in a settlement the insurer agrees to.
> >
> > - **(a)** The suit on the merits is in a U.S. court, so the occurrence is within the coverage territory and Coverage A applies.
> > - **(b)** Liability was decided in Mexico, so the occurrence is outside the coverage territory and Coverage A does not apply, unless the insurer agrees to a settlement.

> [!example]- Loss of Use Without Physical Injury {Example}
> A contractor's crane topples during the policy period and blocks the only entrance to a neighbouring hotel for five days. Nothing at the hotel is physically damaged, but it loses \$60,000 of room revenue. A guest walking past is also struck and his wife sues for loss of her husband's services. Which parts are within the Coverage A insuring agreement?
>
> > [!answer]-
> > Both. The hotel's claim is property damage under the second half of the definition, loss of use of tangible property that is not physically injured, deemed to occur at the time of the occurrence that caused it, which was the crane's collapse during the policy period. The wife's claim is for damages because of bodily injury, because paragraph e includes damages claimed by any person for loss of services resulting from the bodily injury. Whether either claim is finally paid still depends on the exclusions and the limits.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Section 10 asks candidates to apply the Coverage A insuring agreement to a loss: is it bodily injury or property damage, was it caused by an occurrence, did it happen in the coverage territory and during the policy period, and did a listed insured already know about it?
> - **Coverage analysis:** In a full [[Coverage Analysis|coverage analysis]], the insuring agreement is the step after the declarations and before the exclusions, so many questions describe a loss that fails the insuring agreement before any exclusion is reached.
> - **Defense:** Questions test when the duty to defend ends and that defense costs sit outside the limits.

> [!warning]- Exam traps
> - **The occurrence is not the trigger:** Coverage A asks when the bodily injury or property damage happened, not when the negligent act happened or when the claim was made. A product sold years ago that injures someone this year is covered by this year's policy.
> - **Known injury:** Knowledge by an ordinary employee does not defeat coverage unless that employee was authorized to give or receive notice of occurrences or claims. Knowledge by the named insured or an executive officer does.
> - **Loss of use is property damage:** A claim for loss of use of undamaged property is property damage, dated to the occurrence that caused it. Rejecting it as "no physical damage" misreads the definition.
> - **Electronic data:** Electronic data is not tangible property, so its loss or corruption is not property damage, and an exclusion removes it as well.
> - **Worldwide claims need a home forum:** The worldwide part of the territory applies only if liability is decided on the merits in the United States, Puerto Rico or Canada, or settled with the insurer's agreement.
