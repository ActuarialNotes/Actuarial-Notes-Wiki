---
aliases:
  - Automobile Insurance
  - ISO Personal Auto Policy
  - PAP
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d8bd4aa2fc39915908e800c6b7e72140768da3bd507dc947bca51756cdbb991c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Personal Auto Policy.md
---
The **Personal Auto Policy** (PAP) is the Insurance Services Office (ISO) form most U.S. insurers use to insure individuals and families for the autos they own and drive. After the declarations and definitions it has six parts: Part A [[Liability Insurance|liability]], Part B medical payments, Part C [[Uninsured Motorists Coverage|uninsured motorists]], Part D coverage for damage to your auto, Part E duties after an accident or loss, and Part F general provisions.

> $$\text{BI} = \min\Big(\sum_i \min(D_i,\ L_{\text{pp}}),\ L_{\text{acc}}\Big)$$

> $$\text{PD} = \min(D_{\text{PD}},\ L_{\text{PD}})$$

> $$\text{Part D} = \min(\text{ACV},\ \text{Repair}) - d$$

- **Symbols:** $D_i$ is the bodily injury damages owed to injured person $i$, and $D_{\text{PD}}$ is the property damage from the same accident. Under split limits, $L_{\text{pp}}$ is the each person limit, $L_{\text{acc}}$ the each accident limit and $L_{\text{PD}}$ the property damage limit, so 100/300/50 means \$100,000, \$300,000 and \$50,000. A single limit replaces all three with one amount per accident. In Part D, ACV is the actual cash value of the damaged auto, Repair is the cost to repair or replace it with property of like kind and quality, and $d$ is the deductible.
- **Definitions:** "You" means the named insured and a spouse living in the same household, and a "family member" is a resident of the household related by blood, marriage or adoption. "Your covered auto" is any vehicle in the declarations, a newly acquired auto (subject to a short notice period), a trailer the insured owns, and a temporary substitute for a covered auto that is out of use for repair, servicing, loss or destruction.
- **Part A, liability:** The insurer pays damages for bodily injury or property damage for which any insured becomes legally responsible because of an auto accident, and it defends the insured. The insureds are the named insured and family members using any auto, anyone using the covered auto, and a person or organization held liable for their use. Supplementary payments, such as bail bond costs and interest on a judgment, are paid in addition to the limit, and the [[Duty to Defend|duty to defend]] ends once the limit is used up.
- **Part B, medical payments:** Part B pays reasonable medical and funeral expenses of an insured injured in an accident, without regard to fault, for services rendered within a set period after the accident. The insureds are the named insured and family members in any motor vehicle or as pedestrians struck by one, and anyone occupying the covered auto.
- **Part C, uninsured motorists:** Part C pays what an insured could have recovered from an uninsured or hit-and-run driver who was legally liable. It is a first-party coverage that still turns on fault ([[Uninsured Motorists Coverage]]); Canada's statutory counterpart is [[Uninsured Automobile Coverage]].
- **Part D, damage to your auto:** Part D covers direct and accidental loss to the covered auto and to a non-owned auto the insured drives, under collision and other than collision. The payment rules, the coverage for transportation expenses and the exclusions are on the [[Auto Physical Damage Coverage]] page.
- **Parts E and F:** Part E lists the insured's duties after a loss: prompt notice, cooperation, sending legal papers, medical examinations, and reporting a theft or a hit-and-run to the police. Part F holds the conditions, including the policy territory, the insurer's [[Salvage and Subrogation|right of recovery]], cancellation and nonrenewal, and the rule that an insured covered by two or more auto policies issued by the same insurer can't collect more than the highest single limit.
- **Each part in depth:** Part A is worked through on [[PAP Liability Coverage]], Part B on [[Medical Payments Coverage]], Part C and underinsured motorists on [[Uninsured Motorists Coverage]], Part D on [[Auto Physical Damage Coverage]], Parts E and F on [[PAP Duties and General Provisions]], and the endorsements for other vehicles and added coverages on [[PAP Endorsements]].
- **Underwriting:** A personal auto underwriter weighs the drivers' ages, experience and driving records, how the auto is used and how far it is driven, where it is garaged, the [[Vehicle Make and Model|vehicle]] and its value, prior insurance and, where permitted, [[Credit-Based Insurance Scoring|credit-based insurance scores]]. Most are also [[Rating Variable|rating variables]]. See [[Personal Auto Underwriting]], and for the state laws the policy is written to meet, [[Personal Auto Insurance Laws]].
- **Beyond the ISO form:** [[Usage-Based Insurance|Usage-based insurance]] prices the policy on measured driving collected by telematics, which raises the privacy, data-use and fairness questions GI-201 asks about. In Canada auto coverage is not written on the ISO form at all, and its minimum contents are set by statute ([[Compulsory Auto Insurance]]).

> [!example]- One Accident Across Parts A, B and D {Example}
> The insured runs a red light and hits another car. The PAP has limits of 100/300/50, Part B medical payments of \$5,000 per person and a \$500 collision deductible. The other driver's damages are \$140,000, that driver's passenger's are \$60,000, the other car is a \$28,000 total loss and a roadside fence costs \$4,000 to repair. The insured's own passenger, a friend, has \$7,500 of medical bills. The insured's car costs \$9,200 to repair and has an ACV of \$14,000. What does each part pay?
>
> > [!answer]-
> > Part A applies the each person limit first and the each accident limit second, and the fence and the car share the property damage limit.
> > $$
> > \begin{align*}
> > \text{BI} &= \min\big(100{,}000 + 60{,}000,\ 300{,}000\big) \\
> > &= 160{,}000 \\
> > \text{PD} &= \min(28{,}000 + 4{,}000,\ 50{,}000) \\
> > &= 32{,}000 \\
> > \text{Part D} &= \min(14{,}000,\ 9{,}200) - 500 \\
> > &= 8{,}700
> > \end{align*}
> > $$
> > The insured is personally liable for the other driver's remaining \$40,000. Part B pays the friend \$5,000 regardless of fault. The friend can still claim the rest against the insured under Part A, and the medical payment is credited against anything recovered there, so the same expense is not paid twice.

> [!example]- Driving a Borrowed Car {Example}
> The insured borrows a friend's car for a weekend and causes an accident that injures one person, whose damages are \$180,000. The friend's PAP on the car has limits of 50/100/25, and the insured's own PAP has limits of 250/500/100. How is the claim shared?
>
> > [!answer]-
> > The friend's car is not furnished for the insured's regular use, so it is a non-owned auto. Liability insurance follows the car first, so the owner's policy is primary, and the insured's PAP is excess over it for an auto the insured doesn't own.
> > $$
> > \begin{align*}
> > \text{Owner's PAP} &= \min(180{,}000,\ 50{,}000) \\
> > &= 50{,}000 \\
> > \text{Insured's PAP} &= \min(180{,}000 - 50{,}000,\ 250{,}000) \\
> > &= 130{,}000
> > \end{align*}
> > $$
> > Had the insured regularly used the friend's car, it would not be a non-owned auto, and the insured's own PAP would not cover it at all without an endorsement such as extended non-owned coverage.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions walk through the form part by part: who is an insured, what is a covered auto, what each of Parts A to D pays and excludes, and the duties and general provisions. The applied version describes an accident and asks which parts respond and for how much, often with split limits and more than one policy.
> - **DISC-RM:** The underwriting questions ask which characteristics of drivers and vehicles an underwriter evaluates for personal auto and why each one predicts losses.
> - **GI-302:** Candidates describe the contents of the ISO PAP and the coverages it provides, alongside the ISO homeowners policies.
> - **GI-201:** The regulatory questions on automobile insurance concern usage-based insurance and telematics: what is measured, how it is priced, and the privacy and fairness issues it raises.

> [!warning]- Exam traps
> - **Each person before each accident:** Under split limits each injured person's damages are capped at the each person limit before they are added and compared with the each accident limit. Comparing the total damages with the each accident limit alone overstates the payment.
> - **Coverage follows the car:** For a borrowed car the owner's policy pays first, and the driver's own PAP is excess. Splitting the claim pro rata between the two policies is wrong for a non-owned auto.
> - **Regular use:** A car furnished or available for the regular use of the insured or a family member is not a non-owned auto, so the PAP gives no coverage for it. A company car driven every day is the usual example.
> - **Part B is no-fault, Part C is not:** Medical payments are paid whatever the cause, but uninsured motorists coverage pays only if the uninsured driver was legally liable. An answer that pays Part C to an insured who caused the accident has mixed them up.
