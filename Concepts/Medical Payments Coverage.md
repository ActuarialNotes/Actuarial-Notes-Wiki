---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:582f674c841115b82a5636aba499955e66a2f2046efe0252e369bb8743e2447d
  sources:
    - "ISO Personal Auto Policy PP 00 01 09 18 (Virginia SCC specimen), Part B, pp.5–6; Part A Limit of Liability B, p.4, sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf"
    - "ISO Personal Auto Policy PP 00 01 09 18 (Virginia SCC specimen), Part B Insuring Agreement A, p.5 (re-check of the F-001 fix), sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Medical Payments Coverage.md
---

**Medical Payments Coverage** is Part B of the [[Personal Auto Policy|personal auto policy]] (PAP). It pays the reasonable expenses for necessary medical and funeral services of an insured who suffers bodily injury in an auto accident, without regard to who caused it, for services rendered within three years of the accident.

It is first-party, [[No-Fault Insurance|no-fault]] coverage with a modest per-person limit, so injured family members and passengers are paid quickly without having to prove anyone liable. For each injured insured $i$, Part B pays

> $$\text{Paid}_i = \min\big(E_i,\ M\big)$$

- $E_i$ is person $i$'s reasonable expenses for necessary medical and funeral services rendered within three years of the accident.
- $M$ is the Part B limit shown in the declarations.

The payment for the accident is the sum over every injured person who is an insured, because the limit applies to each person in each accident, with no per-accident aggregate.

> $$\text{Paid}_{\text{accident}} = \sum_{i} \text{Paid}_i$$

The form does not list particular kinds of service. The expenses must be reasonable and the services necessary, and services after the three-year window are not paid however reasonable.

> [!example]- What does the named insured's Part B pay for this accident? {Example}
> The named insured is driving her covered auto with her husband and two friends when she runs a stop sign. Part B has a limit of \$5,000 per person. The car also strikes a pedestrian. Reasonable medical expenses are:
>
> | Injured person | Expenses ($) |
> | :--- | ---: |
> | Named insured | 3,200 |
> | Her husband | 7,800 |
> | First friend | 6,000 |
> | Second friend | 1,500 |
> | Pedestrian | 9,000 |
>
> Of the first friend's expenses, \$1,500 is for physical therapy given more than three years after the accident. The second friend has a PAP of his own with medical payments coverage.
>
> > [!answer]-
> > - The driver and her husband are insureds in any vehicle, and the friends are insureds because they occupy her covered auto.
> > - The pedestrian is not an insured under her Part B.
> > - The first friend's therapy outside the three-year window is not covered, which leaves \$4,500.
> > - Part B pays $3{,}200 + \min(7{,}800,\ 5{,}000) + 4{,}500 + 1{,}500 = \$14{,}200$.
> > - The second friend is paid by the driver's policy first, because his own PAP is excess for a vehicle he does not own.
> > - The husband's remaining \$2,800 is not paid by Part B.
> > - The pedestrian's \$9,000 is a Part A claim, payable because the driver was at fault, and the friends can also bring Part A claims for amounts Part B did not pay.

## Who is an insured

1. The named insured and family members, while occupying any motor vehicle designed mainly for use on public roads, or a trailer, and while a pedestrian struck by one.
2. Any other person, only while occupying the named insured's covered auto.

A pedestrian the insured strikes is not an insured under Part B and must claim under Part A liability.

## Part B and Part A

Part B pays whether or not the named insured was at fault, which is its value to a passenger who would otherwise have to sue the driver, often a friend or relative, under Part A. Payment under Part B does not bar a liability claim, but the policy will not pay the same expense twice under Parts A, B and C.

## Exclusions

In the ISO PP 00 01 09 18 edition, Part B does not cover bodily injury sustained:

1. occupying a motorized vehicle with fewer than four wheels;
2. occupying the covered auto while it is used as a public or livery conveyance, including while the driver is logged into a transportation network platform, except a share-the-expense car pool or volunteer or charitable use;
3. occupying a vehicle located for use as a residence or premises;
4. in the course of employment if [[Workers Compensation Insurance|workers compensation]] benefits are required or available;
5. occupying or struck by a vehicle, other than the covered auto, that the named insured owns or has available for regular use;
6. occupying or struck by a vehicle, other than the covered auto, that a family member owns or has available for regular use, though this one does not apply to the named insured;
7. occupying a vehicle without a reasonable belief of being entitled to, except a family member in the named insured's owned covered auto;
8. occupying a vehicle used in an insured's business, unless it is a private passenger auto, pickup, van or a trailer used with one;
9. from war or nuclear weapons;
10. from nuclear reaction, radiation or radioactive contamination;
11. occupying a vehicle in a racing facility for racing, a speed contest or a driver skill event;
12. occupying or struck by the covered auto while it is in a personal vehicle sharing program and used by someone else;
13. occupying or struck by a vehicle that can fly.

> [!example]- Which of these injuries does the named insured's Part B cover? {Example}
> A named insured's PAP includes Part B. In separate accidents during the year:
>
> 1. her teenage son, who lives with her, is struck by a stranger's car while crossing a street;
> 2. her daughter, who also lives with her, is hurt riding as a passenger on a friend's motorcycle;
> 3. the named insured is hurt driving her employer's delivery van on the job, where workers compensation applies;
> 4. her neighbor is hurt riding as a passenger in her covered auto.
>
> > [!answer]-
> > - The son is covered, because a family member is an insured as a pedestrian struck by a motor vehicle designed for public roads, whoever owns or drives it.
> > - The daughter is excluded, because Part B does not cover injury while occupying a motorized vehicle with fewer than four wheels.
> > - The named insured is excluded, because the injury happened in the course of employment and workers compensation benefits are available. Part B would also exclude a vehicle furnished for her regular use that is not a covered auto.
> > - The neighbor is covered, because any person occupying the covered auto is an insured, and is paid up to the per-person limit without proving the named insured was at fault.

## Limit of liability

The limit is the most paid for each person injured in one accident, whatever the number of insureds, claims, vehicles or premiums shown. Insuring two cars does not double it.

## Other insurance

For an owned vehicle, Part B shares with other applicable auto medical payments coverage in proportion to the limits. For a vehicle the insured does not own, it is excess over any other collectible auto medical payments coverage, so a passenger in someone else's car is paid first by that car's policy.

> [!trap] Paying the pedestrian the insured hits
> A pedestrian struck by the covered auto is not an insured under its Part B. Only the named insured and family members are covered as pedestrians, and an injured stranger claims under Part A.
