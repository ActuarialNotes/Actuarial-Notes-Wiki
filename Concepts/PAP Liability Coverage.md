---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:1b49b486f1aab6e679baf0c4b82d5d529a39bd81f5118a84c47f1ebdc4457e09
  sources:
    - "ISO Personal Auto Policy PP 00 01 09 18 (Virginia SCC specimen), Definitions A–L, pp.1–2; Part A, pp.2–4, sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf"
    - "ISO PP 13 59 01 20 Single Liability Limit – Virginia, Limit Of Liability A–B, p.1, sha256:2769afaf7eb8187dd6440f529cc194ba459b61cb4a6363ee38c8555e7f3fe3fb — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-13-59-01-20.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/PAP Liability Coverage.md
---

**PAP Liability Coverage** is Part A of the ISO [[Personal Auto Policy|personal auto policy]] (PP 00 01, 09 18 edition). It pays the damages for bodily injury or property damage that an insured becomes legally responsible for because of an auto accident, and it settles or defends claims for those damages, paying defense costs in addition to the limit.

> $$\text{BI} = \min\Big(\sum_i \min(D_i,\ L_{\text{pp}}),\ L_{\text{acc}}\Big)$$

> $$\text{PD} = \min(D_{\text{PD}},\ L_{\text{PD}})$$

> $$\text{Share} = \frac{L_{\text{ours}}}{\sum_k L_k}$$

- **Symbols:** $D_i$ is the bodily injury damages owed to injured person $i$, $D_{\text{PD}}$ is all the property damage from the accident, $L_{\text{pp}}$ and $L_{\text{acc}}$ are the each person and each accident bodily injury limits, and $L_{\text{PD}}$ is the each accident property damage limit. In the other insurance share, $L_{\text{ours}}$ is this policy's limit and $\sum_k L_k$ the total of all applicable limits.
- **Insuring agreement:** The insurer pays damages for "bodily injury" or "property damage" for which any insured becomes legally responsible because of an auto accident, and damages include prejudgment interest awarded against the insured. It will settle or defend any claim or suit for these damages as it considers appropriate, and it pays its defense costs in addition to the limit. The [[Duty to Defend|duty to settle or defend]] ends when the limit has been used up by paying judgments or settlements, and there is no duty to defend a claim the policy does not cover.
- **Definitions it turns on:** "You" is the named insured and a spouse living in the same household. A spouse who moves out stays "you" until the earliest of 90 days after the move, the start of another policy naming the spouse, or the end of the policy period. A "family member" is a resident of the household related by blood, marriage or adoption, including a ward or foster child. "Your covered auto" is a vehicle in the declarations, a "newly acquired auto", a trailer the named insured owns, and a non-owned auto or trailer used as a temporary substitute while a covered vehicle is out of normal use for breakdown, repair, servicing, loss or destruction. A newly acquired private passenger auto, or a pickup or van of 10,000 lbs. gross vehicle weight rating or less, gets the broadest liability coverage on any listed vehicle if the named insured asks for coverage within 14 days of becoming the owner.
- **Who is an insured:** (1) You or a family member, for the ownership, maintenance or use of any auto or trailer; (2) anyone using your covered auto; (3) for your covered auto, any person or organization, but only for its legal responsibility for the acts of a person covered under Part A, such as an employer whose employee drives the named insured's car on an errand; and (4) for any other auto or trailer, any other person or organization, but only for its responsibility for the acts of you or a family member, and only if it does not own or hire that vehicle.
- **Supplementary payments:** In addition to the limit, the insurer pays up to \$250 for bail bonds required because of an accident that caused covered injury or damage, including related traffic violations; premiums on appeal bonds and bonds to release attachments in a suit it defends; interest accruing after judgment in a suit it defends, until it offers to pay the judgment up to its limit; up to \$250 a day for loss of earnings, but not other income, for attending hearings or trials at its request; and other reasonable expenses incurred at its request.
- **Exclusions tied to the insured (A.1–A.10):** No coverage for an insured who (1) intentionally causes injury or damage; for (2) damage to property the insured owns or is transporting; for (3) damage to property rented to, used by or in the care of the insured, except a residence or private garage; for (4) injury to the insured's employee in the course of employment, though a domestic employee is covered unless workers compensation benefits are required or available; for (5) a vehicle used as a public or livery conveyance, including any time the driver is logged into a transportation network platform, except a share-the-expense car pool or volunteer or charitable use; for (6) an insured employed in the business of selling, repairing, servicing, storing or parking vehicles, including road testing and delivery, except for your covered auto used by you, a family member or your partner, agent or employee; for (7) using any vehicle in any other business (other than farming or ranching), except a private passenger auto, pickup, van or a trailer used with one; for (8) using a vehicle without a reasonable belief of being entitled to, except a family member using your covered auto that you own; for (9) injury for which the insured is covered, or would be but for exhaustion, under a nuclear energy liability policy; and for (10) your covered auto while enrolled in a personal vehicle sharing program and used by someone other than you or a family member.
- **Exclusions tied to the vehicle (B.1–B.5):** No coverage for the ownership, maintenance or use of (1) a vehicle with fewer than four wheels or designed mainly for use off public roads, except in a medical emergency, for any trailer, or for a non-owned golf cart; (2) a vehicle other than your covered auto that you own or that is furnished or available for your regular use; (3) a vehicle other than your covered auto owned by or available for the regular use of a family member, though this one does not apply to you while you maintain or occupy such a vehicle; (4) a vehicle inside a racing facility for racing, a speed contest or a driver skill event or training, or practice for one; and (5) a vehicle that is designed or can be used for flight.
- **Limit of liability:** The each person limit is the most paid for all damages from bodily injury to one person in one accident, including care, loss of services and death. Subject to it, the each accident limit caps all bodily injury from the accident, and the property damage limit caps all property damage. The limits do not grow with the number of insureds, claims, vehicles or premiums shown, or vehicles involved, and nobody is paid twice for the same element of loss under Part A and Parts B or C or underinsured motorists coverage. A single limit endorsement replaces the three amounts with one per accident ([[PAP Endorsements]]).
- **Out of state coverage and financial responsibility:** For an accident in another state or province, the policy provides that jurisdiction's higher financial responsibility limits if its law requires more than the declarations show, and the minimum amounts and types of coverage its compulsory insurance law requires of nonresidents ([[Compulsory Auto Insurance]]). When the policy is certified as proof of future financial responsibility, it complies with that law to the extent required.
- **Other insurance:** When other liability insurance applies, Part A pays its pro rata share by limits. For a vehicle the named insured does not own, including a temporary substitute, it is excess over any other collectible insurance.

> [!example]- Limits and Supplementary Payments in One Accident {Example}
> An insured with limits of 50/100/25 runs a stop sign and hits a car carrying three people. Their bodily injury damages are \$70,000, \$40,000 and \$20,000. The other car's damage is \$18,000, and a fence costs \$9,000. The insurer spends \$15,000 defending the suit. The insured paid \$300 for a bail bond after the accident and lost three days' wages of \$300 a day attending the trial at the insurer's request. What does Part A pay?
>
> > [!answer]-
> > The first person's damages are capped at the each person limit before the each accident limit is applied, and the car and the fence share the property damage limit.
> > $$
> > \begin{align*}
> > \text{BI} &= \min(50{,}000 + 40{,}000 + 20{,}000,\ 100{,}000) \\
> > &= 100{,}000 \\
> > \text{PD} &= \min(18{,}000 + 9{,}000,\ 25{,}000) \\
> > &= 25{,}000 \\
> > \text{Supplementary} &= 250 + 3(250) + 15{,}000 \\
> > &= 16{,}000 \\
> > \text{Total} &= 100{,}000 + 25{,}000 + 16{,}000 \\
> > &= 141{,}000
> > \end{align*}
> > $$
> > The defense costs and supplementary payments do not reduce the limits. The insured is personally responsible for the \$30,000 of bodily injury and \$2,000 of property damage the limits don't reach.

> [!example]- Primary, Excess and Pro Rata {Example}
> (a) The named insured's car is in the shop, and she drives a loaner car that the dealer's policy insures for \$100,000. She injures a pedestrian whose damages are \$160,000. Her PAP has a \$300,000 each person limit. (b) In a separate accident, \$200,000 of damages arise from an owned car that two liability policies cover, with limits of \$100,000 and \$300,000. How is each loss shared?
>
> > [!answer]-
> > (a) The loaner is a temporary substitute, so it is "your covered auto" and she is an insured, but it is a vehicle she does not own, so her PAP is excess over the dealer's policy.
> > $$
> > \begin{align*}
> > \text{Dealer's policy} &= \min(160{,}000,\ 100{,}000) \\
> > &= 100{,}000 \\
> > \text{Her PAP} &= 160{,}000 - 100{,}000 \\
> > &= 60{,}000
> > \end{align*}
> > $$
> > (b) For an owned car each policy pays the proportion its limit bears to the total of the limits.
> > $$
> > \begin{align*}
> > \text{Policy 1} &= 200{,}000 \times \frac{100{,}000}{400{,}000} \\
> > &= 50{,}000 \\
> > \text{Policy 2} &= 200{,}000 \times \frac{300{,}000}{400{,}000} \\
> > &= 150{,}000
> > \end{align*}
> > $$

> [!example]- Which Exclusion Applies? {Example}
> The named insured's PAP covers her sedan. Decide whether Part A covers each claim: (a) she is logged into a ride-hailing app waiting for a request when she rear-ends another car; (b) her teenage son, who lives with her, takes the sedan without asking and causes an accident; (c) her daughter, a family member, causes an accident while driving a car her employer furnishes for her regular use; (d) she backs into and damages the garage of a house she is renting.
>
> > [!answer]-
> > - **(a) Excluded:** Being logged into a transportation network platform as a driver is public or livery use, whether or not a passenger is aboard.
> > - **(b) Covered:** The reasonable belief exclusion does not apply to a family member using a covered auto that the named insured owns.
> > - **(c) Excluded:** A vehicle furnished for a family member's regular use is excluded for that family member. The exclusion would not apply to the named insured herself if she drove it.
> > - **(d) Covered:** Damage to property rented to the insured is excluded, but the exclusion does not apply to a residence or a private garage.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Section 4.3 examines personal auto liability coverage. Questions describe an accident and ask whether the driver is an insured, whether an exclusion removes coverage, how the split limits apply, and what supplementary payments add.
> - **Applied questions:** A scenario puts the insured in a borrowed, rented or employer-furnished vehicle, or in another state, and asks which policy pays first and up to what limit.

> [!warning]- Exam traps
> - **Defense is outside the limit:** Defense costs and supplementary payments are paid in addition to the limit. Subtracting them from the each accident limit understates what the insurer pays.
> - **Regular use, not ownership:** A car furnished for regular use is excluded even though the insured doesn't own it. A friend's car borrowed once is a non-owned auto and is covered; the company car driven daily is not.
> - **The family member exception runs one way:** Exclusion B.3 removes coverage for a family member in a car another family member owns or regularly uses, but not for the named insured.
> - **Business use of a car is covered:** The business exclusion A.7 does not reach a private passenger auto, pickup or van. A salesperson driving her own car to clients is covered; the trap answer applies the exclusion to every business use.
> - **Logged in counts:** Under the 09 18 edition the livery exclusion applies while the driver is logged into a ride-hailing app, even with no passenger.
