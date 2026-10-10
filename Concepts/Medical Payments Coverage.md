---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:6d01b24cfa6b258aa329468a01f8093e62a87225555ebb4e44f70e40d1910c80
  sources:
    - "ISO Personal Auto Policy PP 00 01 09 18 (Virginia SCC specimen), Part B, pp.5–6; Part A Limit of Liability B, p.4, sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Medical Payments Coverage.md
---

**Medical Payments Coverage** is Part B of the [[Personal Auto Policy|personal auto policy]] (PAP). It pays the reasonable expenses for necessary medical and funeral services of an insured who suffers bodily injury in an auto accident, without regard to who caused it, for services rendered within three years of the accident. It is first-party, [[No-Fault Insurance|no-fault]] coverage with a modest per-person limit, so injured family members and passengers are paid quickly without having to prove anyone liable.

> $$\text{Paid}_i = \min\big(E_i^{(3)},\ M\big)$$

> $$\text{Paid}_{\text{accident}} = \sum_{i \in \mathcal{I}} \text{Paid}_i$$

- **Symbols:** $E_i^{(3)}$ is person $i$'s reasonable expenses for necessary medical and funeral services rendered within three years of the accident, $M$ is the Part B limit shown in the declarations, and $\mathcal{I}$ is the set of injured people who qualify as insureds. The limit applies to each person in each accident, with no per-accident aggregate.
- **Who is an insured:** The named insured and family members are covered while occupying any motor vehicle designed mainly for use on public roads, or a trailer, and while a pedestrian struck by one. Any other person is covered only while occupying the named insured's covered auto. A pedestrian the insured strikes is not an insured under Part B and must claim under Part A liability.
- **What counts as an expense:** Covered services include medical, surgical, X-ray, dental, ambulance, hospital and professional nursing services, prosthetic devices and funeral services. The expenses must be reasonable and the services necessary, and services after the three-year window are not paid however reasonable.
- **No-fault:** Part B pays whether or not the named insured was at fault, which is its value to a passenger who would otherwise have to sue the driver, often a friend or relative, under Part A. Payment under Part B does not bar a liability claim, but the policy will not pay the same expense twice under Parts A, B and C.
- **Exclusions:** In the ISO PP 00 01 09 18 edition, Part B does not cover bodily injury sustained (1) occupying a motorized vehicle with fewer than four wheels; (2) occupying the covered auto while it is used as a public or livery conveyance, including while the driver is logged into a transportation network platform, except a share-the-expense car pool or volunteer or charitable use; (3) occupying a vehicle located for use as a residence or premises; (4) in the course of employment if [[Workers Compensation Insurance|workers compensation]] benefits are required or available; (5) occupying or struck by a vehicle, other than the covered auto, that the named insured owns or has available for regular use; (6) occupying or struck by a vehicle, other than the covered auto, that a family member owns or has available for regular use, though this one does not apply to the named insured; (7) occupying a vehicle without a reasonable belief of being entitled to, except a family member in the named insured's owned covered auto; (8) occupying a vehicle used in an insured's business, unless it is a private passenger auto, pickup, van or a trailer used with one; (9) from war or nuclear weapons, or (10) from nuclear reaction, radiation or radioactive contamination; (11) occupying a vehicle in a racing facility for racing, a speed contest or a driver skill event; (12) occupying or struck by the covered auto while it is in a personal vehicle sharing program and used by someone else; or (13) occupying or struck by a vehicle that can fly.
- **Limit of liability:** The limit is the most paid for each person injured in one accident, whatever the number of insureds, claims, vehicles or premiums shown. Insuring two cars does not double it.
- **Other insurance:** For an owned vehicle, Part B shares with other applicable auto medical payments coverage in proportion to the limits. For a vehicle the insured does not own, it is excess over any other collectible auto medical payments coverage, so a passenger in someone else's car is paid first by that car's policy.

> [!example]- Four People Hurt in One Accident {Example}
> The named insured is driving her covered auto with her husband and two friends when she runs a stop sign. Part B has a limit of \$5,000 per person. Reasonable medical expenses are \$3,200 for her, \$7,800 for her husband, \$6,000 for the first friend, of which \$1,500 is for physical therapy given more than three years after the accident, and \$1,500 for the second friend, who has a PAP of his own with medical payments coverage. The car also strikes a pedestrian, whose medical bills are \$9,000. What does her Part B pay?
>
> > [!answer]-
> > The driver, her husband and both friends are insureds: the couple in any vehicle, the friends because they occupy her covered auto. The pedestrian is not an insured under her Part B. The first friend's therapy outside the three-year window is not covered, which leaves \$4,500.
> > $$
> > \begin{align*}
> > \text{Paid}_{\text{accident}} &= \min(3{,}200,\ 5{,}000) + \min(7{,}800,\ 5{,}000) \\
> > &\quad + \min(4{,}500,\ 5{,}000) + \min(1{,}500,\ 5{,}000) \\
> > &= 3{,}200 + 5{,}000 + 4{,}500 + 1{,}500 \\
> > &= 14{,}200
> > \end{align*}
> > $$
> > The second friend is paid by the driver's policy first, because his own PAP is excess for a vehicle he does not own. The husband's remaining \$2,800 is not paid by Part B. The pedestrian's \$9,000 is a Part A claim, payable because the driver was at fault, and the friends can also bring Part A claims for amounts Part B did not pay.

> [!example]- Is the Family Covered? {Example}
> A named insured's PAP includes Part B. In separate accidents during the year: (a) her teenage son, who lives with her, is struck by a stranger's car while crossing a street; (b) her daughter, who also lives with her, is hurt riding as a passenger on a friend's motorcycle; (c) the named insured is hurt driving her employer's delivery van on the job, where workers compensation applies; and (d) her neighbor is hurt riding as a passenger in her covered auto. Which injuries does her Part B cover?
>
> > [!answer]-
> > - **(a) Covered:** A family member is an insured as a pedestrian struck by a motor vehicle designed for public roads, whoever owns or drives it.
> > - **(b) Excluded:** Part B does not cover injury while occupying a motorized vehicle with fewer than four wheels.
> > - **(c) Excluded:** The injury happened in the course of employment and workers compensation benefits are available, so they respond instead. Part B would also exclude a vehicle furnished for her regular use that is not a covered auto.
> > - **(d) Covered:** Any person occupying the covered auto is an insured, so the neighbor is paid up to the per-person limit, without proving the named insured was at fault.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective covers PAP medical payments coverage alongside [[Uninsured Motorists Coverage|uninsured motorists coverage]]. Questions describe an accident and ask who is an insured, which expenses are covered, how the per-person limit applies, and whether an exclusion removes coverage.
> - **Combined PAP questions:** A full PAP question asks what each of Parts A to D pays for one accident, so Part B is worked alongside the liability limits and the physical damage deductible ([[Personal Auto Policy]]).
> - **Other insurance:** A question can place an insured in a non-owned vehicle and ask which policy's medical payments coverage pays first.

> [!warning]- Exam traps
> - **The pedestrian you hit:** A pedestrian struck by the covered auto is not an insured under its Part B. Only the named insured and family members are covered as pedestrians, and an injured stranger claims under Part A.
> - **Per person, not per accident:** The limit applies to each injured person. Capping the total for the accident at one limit understates the payment.
> - **Three years from the accident:** Services must be rendered within three years of the accident. Expenses for later treatment are excluded even if the injury caused them.
> - **No-fault is not no-liability:** Part B pays regardless of fault, but it does not stop an injured passenger from claiming under Part A for losses above the Part B payment. The policy only prevents paying the same expense twice.
