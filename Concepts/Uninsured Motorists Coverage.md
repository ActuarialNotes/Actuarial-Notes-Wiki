---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:be6b66b108b0a5d8acaa12c73455f617d0299ed25249acc2f24ddaa056cee876
  sources:
    - "ISO Personal Auto Policy PP 00 01 09 18 (Virginia SCC specimen), Part C, pp.6–8; Part E C, p.12, sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf"
    - "ISO PP 03 11 01 05 Underinsured Motorists Coverage (© ISO 2003; copy posted by Hagerty), Insuring Agreement, def. C, Limit of Liability B, pp.1–2, sha256:0238ec0f9164ddbe715c8defafd275ee1fe5f2b30ba4a561aea53904fbc1e7cf — https://www.hagerty.com/EDocs/Download?id=2835"
    - "ISO PP 14 03 07 23 Uninsured Motorists Coverage – Virginia, Insuring Agreement A–F, pp.1–2, sha256:6db2461c87cfbed2327bf312f4d18144c7d628f976a4525362293aea01b22207 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-14-03-07-23.pdf"
    - "Rough Notes PF&M, PP 03 11 Underinsured Motorists Coverage (Sept 2024), Definition of underinsured motor vehicle; Lyman example, sha256:1a6f7981b53258f842a14cf19b7962139c903a0a65c0c443e26cd8034be6dd6e — https://www.rnc-pro.com/rnc-pro/pfm/400/410_0607.HTM"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Uninsured Motorists Coverage.md
---

**Uninsured Motorists Coverage** (UM) is Part C of the ISO [[Personal Auto Policy|personal auto policy]] (PP 00 01, 09 18 edition). It pays the compensatory damages an insured is legally entitled to recover from the owner or operator of an uninsured motor vehicle because of bodily injury caused by an accident, so the insured's own insurer stands in for the liability insurer the at-fault driver didn't have. Underinsured motorists coverage (UIM), added by endorsement, does the same when the at-fault driver is insured for too little. Canada's statutory counterpart is [[Uninsured Automobile Coverage]].

The damages must be ones the insured is legally entitled to recover, so the uninsured driver must be at fault, and the driver's liability must arise from owning, maintaining or using the uninsured vehicle. Part C covers bodily injury only: the insured's damaged car is Part D collision, unless a state endorsement adds UM property damage. A judgment from a suit brought without the insurer's written consent does not bind it.

## Who is an insured

1. You or any family member, in any vehicle or as a pedestrian.
2. Anyone else occupying your covered auto.
3. Anyone entitled to recover damages because of bodily injury to a person in (1) or (2), such as a parent claiming for an injured child.

## Uninsured motor vehicle

An uninsured motor vehicle is a land motor vehicle or trailer of any type:

1. With no bodily injury liability bond or policy at the time of the accident.
2. With one whose limit is below the minimum bodily injury limit of the financial responsibility law of the state where your covered auto is principally garaged. Such a driver is uninsured, not underinsured.
3. A hit-and-run vehicle whose owner and operator can't be identified and which hits you or a family member, a vehicle either of you is occupying, or your covered auto.
4. Whose bonding or insuring company denies coverage or is or becomes insolvent.

The ISO definition requires the unidentified vehicle to hit the insured, the vehicle occupied or the covered auto. A phantom vehicle that runs the insured off the road without contact is not uninsured under PP 00 01, though some state forms cover it.

It does not include a vehicle owned by or furnished for the regular use of you or a family member, one owned or operated by a solvent self-insurer, a government-owned vehicle, a vehicle operated on rails or crawler treads, a vehicle designed mainly for off-road use while it is off public roads, or one located for use as a residence or premises.

## Exclusions

Part C does not cover bodily injury sustained:

1. By an insured in, or struck by, a motor vehicle that insured owns which this policy doesn't insure for UM.
2. By a family member in, or struck by, a vehicle the named insured owns that another policy insures for UM on a primary basis.
3. By an insured who settles the bodily injury claim in a way that prejudices the insurer's right to recover.
4. In your covered auto while it is used as a public or livery conveyance, including while the driver is logged into a transportation network platform, except a share-the-expense car pool or volunteer use.
5. Using a vehicle without a reasonable belief of being entitled to, except a family member in your owned covered auto.
6. In or struck by your covered auto while it is in a personal vehicle sharing program and used by someone else.
7. In or struck by a vehicle that can fly.

The coverage does not directly or indirectly benefit a workers compensation or disability benefits insurer, and it does not pay punitive or exemplary damages.

## Limit of liability

The each person and each accident limits work as Part A's do, and they do not grow with the number of insureds, claims, vehicles, premiums or vehicles involved. For one accident, Part C pays

> $$\text{UM} = \min\Big(\sum_i \min(D_i - R_i,\ L_{\text{pp}}),\ L_{\text{acc}}\Big)$$

- $D_i$ is the bodily injury damages insured $i$ could recover from the uninsured driver.
- $R_i$ is what has already been paid for the same elements of loss by or for a person legally responsible.
- $L_{\text{pp}}$ and $L_{\text{acc}}$ are the Part C each person and each accident limits.

Nobody is paid twice for the same element of loss under Part C and Part A, Part B or underinsured motorists coverage, and Part C pays nothing for a loss payable under a workers compensation or disability benefits law.

> [!example]- What does Part C pay for these three injured insureds? {Example}
> An uninsured driver runs a red light and hits the named insured's covered auto, injuring her, her daughter, who lives with her, and a friend riding with them. Part C limits are 50/100. Their damages are \$80,000, \$40,000 and \$30,000, and no one legally responsible has paid anything.
>
> > [!answer]-
> > - All three are insureds: the named insured and her family member in any vehicle, and the friend because she occupies the covered auto.
> > - The uninsured driver is at fault, so the damages are ones they are legally entitled to recover.
> > - Capped at \$50,000 each person, the damages are $50{,}000 + 40{,}000 + 30{,}000 = 120{,}000$.
> > - The each accident limit binds, so Part C pays $\min(120{,}000,\ 100{,}000) = \$100{,}000$.

## Other insurance

When similar coverage applies under other policies, the insured's total recovery may not exceed the highest applicable limit for any one vehicle, primary or excess. Two policies with UM limits of \$25,000 and \$100,000 do not give \$125,000. For a vehicle the named insured doesn't own, including a temporary substitute, Part C is excess over any primary coverage. Within the primary layer, and within the excess layer, each policy pays its share in proportion to its limit.

> [!example]- How is her claim paid under the two policies? {Example}
> The named insured is a passenger in a friend's car when an uninsured driver causes a crash. Her damages are \$60,000. The friend's PAP has UM limits of 25/50 on that car, and her own PAP has UM limits of 100/300.
>
> > [!answer]-
> > - She is an insured under both policies: under the friend's as a person occupying his covered auto, and under her own as the named insured.
> > - Her own Part C is excess for a vehicle she doesn't own, so the friend's policy pays first: $\min(60{,}000,\ 25{,}000) = \$25{,}000$.
> > - Her policy pays the rest, $60{,}000 - 25{,}000 = \$35{,}000$.
> > - Her total recovery of \$60,000 is within the highest single applicable limit, \$100,000, so the cap does not bind.

## Arbitration and duties

If the insurer and the insured disagree on whether the insured is legally entitled to recover, or on how much, the dispute may be arbitrated if both agree, but a dispute over coverage may not. Each side picks an arbitrator and the two choose a third. A decision of two arbitrators binds both sides only up to the state's financial responsibility minimum. Above it, either side may demand a trial within 60 days.

Besides Part E's duties ([[PAP Duties and General Provisions]]), a person seeking UM must promptly notify the police if a hit-and-run driver is involved and promptly send the insurer copies of the legal papers if a suit is brought.

## Underinsured motorists coverage

The ISO endorsement PP 03 11 has its own insuring agreement, exclusions, limit and arbitration ([[PAP Endorsements]]). An underinsured vehicle carries liability insurance whose bodily injury limit is less than the insured's UIM limit, and the coverage responds once the at-fault driver's limits are exhausted by judgments or settlements, or once the insured gives the insurer written notice of a tentative settlement. The insurer then has 30 days to advance the settlement amount to preserve its right to recover from the at-fault driver. What the at-fault driver's insurance pays is offset against the UIM payment.

> [!example]- The insured has \$50,000 of UIM under PP 03 11. What does UIM pay if (a) a \$15,000-limit driver causes \$27,000 of damages, or (b) a \$50,000-limit driver causes \$90,000? {Example}
> - (a) The driver's \$15,000 limit is less than the \$50,000 UIM limit, so the vehicle is underinsured.
> - The driver's insurer pays its \$15,000 limit, which is offset, so UIM pays $27{,}000 - 15{,}000 = \$12{,}000$.
> - (b) The driver's limit equals the UIM limit, so under PP 03 11 the vehicle is not underinsured and UIM pays nothing, though \$40,000 of damages go unpaid.

## State forms

UM and UIM are regulated state by state, and the state's endorsement often replaces Part C. Virginia's UM endorsement (PP 14 03 07 23), for example, covers property damage as well as bodily injury, counts a hit-and-run vehicle that causes an accident without hitting anything, and defines an underinsured vehicle by comparing the liability coverage available with the insured's damages, not with the UIM limit. In case (b) above, the vehicle would be underinsured under Virginia's definition, and UIM would pay in addition to the liability coverage.

> [!trap] Paying Part C to the insured who caused the accident
> Part C pays only what the insured is legally entitled to recover from a liable driver. An insured who caused the accident collects nothing under it, however uninsured the other driver. Part B medical payments, by contrast, pay without regard to fault.
