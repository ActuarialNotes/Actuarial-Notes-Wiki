---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:9f38fa115a5d03ad6491552a2e04e62a5f6c4876b0bf0afe70b3833f54097470
  sources:
    - "Insurance Information Institute, Background on: Compulsory Auto/Uninsured Motorists, sections on compulsory laws, enforcement, penalties, UM, no pay no play, history; limits table, sha256:aa7498e2fd868e312225a20ca08a888db7dab55acc680d4499b704d6b0ef7476 — https://www.iii.org/article/background-on-compulsory-auto-uninsured-motorists"
    - "Insurance Information Institute, Background on: No-fault auto insurance, The Different Auto Insurance Systems, sha256:e06a65313d6092233b852f044c19f24cc5214b323e033cb69169585a2fc65c0a — https://www.iii.org/article/background-on-no-fault-auto-insurance"
    - "Texas Department of Public Safety, Financial Responsibility Insurance Certificate (SR-22), SR-22 requirements, sha256:6e459c9ff0aab5821ec98ef355f31ea4eb9390fa0a3ae34d578ef86eb9105edc — https://www.dps.texas.gov/node/676"
    - "Maryland DBM FY2024 operating budget, Maryland Automobile Insurance Fund, D70J00.42 Insured Division and D70J00.47 Uninsured Division, pp.2–3, sha256:437ad83c90f881c250ec232531ed2df932434a466b22177563d20ed75fc104f2 — https://dbm.maryland.gov/budget/Documents/operbudget/2024/agency/MarylandAutomobileInsuranceFund.pdf"
    - "IRMI glossary, financial responsibility law, definition, sha256:60714ce8dd24be24f0d5c028e063e9abeeffc56ec0dd055628671d61b3741072 — https://www.irmi.com/term/insurance-definitions/financial-responsibility-law"
    - "IRMI glossary, assigned risk plan, definition, sha256:b73e8f7c5737d90162c6e7c7cd52ddd8261413a8690d122faabd5d13f0992fad — https://www.irmi.com/term/insurance-definitions/assigned-risk-plan"
    - "ISO Personal Auto Policy PP 00 01 09 18 (Virginia SCC specimen), Part A Out Of State Coverage and Financial Responsibility, p.4, sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Personal Auto Insurance Laws.md
---

**Personal Auto Insurance Laws** are the U.S. state laws that make a driver financially answerable for the harm an auto accident causes and that shape the market around the [[Personal Auto Policy|personal auto policy]]. Each state writes its own, so the rules, minimum limits and penalties differ from state to state.

The laws are of five kinds:

1. **Financial responsibility laws** require vehicle owners to show they can pay damages, usually after an accident, a conviction or a judgment.
2. **Compulsory insurance laws** require liability insurance, or another approved form of financial security, before a vehicle may be driven.
3. **Uninsured motorist funds and coverage** pay the victims of drivers who cannot pay.
4. **No-fault laws** pay injury benefits from the injured driver's own insurer and restrict suits for pain and suffering.
5. **Residual market plans** give drivers the voluntary market declines access to the coverage the law requires.

## Minimum liability limits

A state's minimum liability limits are written as split limits, such as Texas's 30/60/25: $L_{\text{pp}} = \$30{,}000$ of bodily injury liability for each person, $L_{\text{acc}} = \$60{,}000$ for all persons in one accident, and $L_{\text{PD}} = \$25{,}000$ of property damage liability. The insurer's bodily injury payment for one accident is

> $$\text{Paid}_{\text{BI}} = \min\Big(\sum_i \min(D_i,\ L_{\text{pp}}),\ L_{\text{acc}}\Big)$$

- $D_i$ is injured person $i$'s bodily injury damages.

Each person's loss is capped at the per-person limit, and the total is then capped at the per-accident limit. The property damage payment is

> $$\text{Paid}_{\text{PD}} = \min(D_{\text{PD}},\ L_{\text{PD}})$$

- $D_{\text{PD}}$ is the property damage.

The minimum is a floor, not a measure of the damages a driver can cause. The driver is personally liable for whatever the damages exceed the two payments.

> [!example]- How much does this driver's policy pay, and how much does the driver owe personally? {Example}
> A Texas driver carries the state minimum of 30/60/25 and causes a crash. One person has \$45,000 of bodily injury damages, another \$25,000, and the other car, worth \$28,000, is destroyed.
>
> > [!answer]-
> > - The first person's damages are capped at \$30,000, and the second person's \$25,000 is within the per-person limit.
> > - Their sum, \$55,000, is within the \$60,000 per-accident limit, so $\text{Paid}_{\text{BI}} = \$55{,}000$.
> > - The car is capped at the property damage limit, so $\text{Paid}_{\text{PD}} = \$25{,}000$.
> > - The policy pays $\$55{,}000 + \$25{,}000 = \$80{,}000$ of the $\$98{,}000$ of damages.
> > - The driver owes \$18,000 personally: \$15,000 of the first person's injury and \$3,000 of the car.

## Financial responsibility laws

A financial responsibility law requires vehicle owners or drivers to show evidence of their ability to pay damages arising from owning or using a vehicle. It usually applies after an event. In Texas a driver whose license is suspended after a crash, who is convicted a second time of driving without insurance, or who has a civil judgment from a crash must have an insurer file an SR-22 with the state. The SR-22 is a certificate that the driver carries at least the minimum coverage. The driver must keep the coverage for two years, and the insurer tells the state if it lapses.

The ISO personal auto policy says that when it is certified as future proof of financial responsibility, it complies with the law. When an accident happens in another state with higher financial responsibility limits, it provides those limits.

> [!trap] Financial responsibility is not compulsory insurance
> A financial responsibility law requires proof of ability to pay, usually after an accident, conviction or judgment. A compulsory insurance law requires coverage before the car is driven at all.

## Compulsory insurance laws

Virtually all states require auto liability insurance, or another approved form of financial security, before a vehicle may legally be driven. Massachusetts was first, in 1927. New Hampshire has no compulsory insurance law and instead requires drivers to show they can pay if they cause an accident. Virginia lets a motorist pay a fee to register an uninsured vehicle.

States enforce the laws with proof-of-insurance cards, evidence of insurance at registration or after a crash, insurer reports to the motor vehicle department when a policy is cancelled or not renewed, and online verification of coverage. Penalties include fines, license or registration suspension, and in some states jail or impoundment.

Compulsory laws have not stopped uninsured driving. About 14% of U.S. motorists were uninsured in 2022, by the Insurance Research Council's estimate. The laws do nothing against hit-and-run drivers, stolen vehicles or a driver who cancels a policy right after getting the proof card. About a dozen states have **no pay, no play** laws, which bar uninsured drivers from suing for noneconomic damages such as pain and suffering.

Every Canadian province also makes auto insurance compulsory, on its own terms ([[Compulsory Auto Insurance]]).

## Uninsured motorist funds and coverage

An **unsatisfied judgment fund** pays accident victims who hold a judgment against an at-fault driver who cannot pay it. A few states set these up, and their effectiveness proved limited.

Maryland's Automobile Insurance Fund has an Uninsured Division. It pays Maryland residents injured in Maryland by uninsured or unidentified drivers when no other insurance recovery is available. It is funded by uninsured motorist fines, investment income and collections, and it may recover from the at-fault driver.

The more common remedy is [[Uninsured Motorists Coverage|uninsured and underinsured motorists coverage]], mandatory in about 20 jurisdictions and required to be offered in the others.

## No-fault laws

A no-fault law determines who pays injury benefits and when a driver may sue. Each driver claims first-party benefits, called personal injury protection (PIP), from their own insurer regardless of fault, and may sue for pain and suffering only above a threshold. Auto injury systems are classified by two features, whether the driver's own insurer pays first-party benefits and whether the right to sue is restricted:

| System | First-party benefits | Right to sue for pain and suffering |
| --- | --- | --- |
| No-fault | Paid by the driver's own insurer | Only above a threshold |
| Add-on | Paid by the driver's own insurer | Not restricted |
| Tort | None | Not restricted, against the at-fault driver's liability coverage |

Twelve states and Puerto Rico have no-fault laws. A **verbal threshold** allows a suit only for an injury that meets a statutory description of seriousness. Florida, Michigan, New Jersey, New York and Pennsylvania use one. A **monetary threshold** allows a suit only once medical expenses exceed a set amount. Hawaii, Kansas, Kentucky, Massachusetts, Minnesota, North Dakota and Utah use one. In New Jersey, Pennsylvania and Kentucky drivers may choose to keep an unrestricted right to sue. Canada's provincial schemes are described in [[No-Fault Insurance]].

> [!example]- A New Jersey driver who kept the lawsuit threshold is hurt in a crash. When may she sue for pain and suffering? {Example}
> - New Jersey has a no-fault law with a verbal threshold.
> - Her own insurer pays her PIP benefits regardless of fault.
> - New Jersey is a choice state, and the threshold applies because she did not reject it.
> - She may sue for pain and suffering only if her injury meets the statutory description of a serious injury.

## Residual markets and low-cost policies

Because coverage is compulsory, drivers the voluntary market declines must still be able to get it, through an assigned risk plan, a joint underwriting association, a reinsurance facility or a state fund ([[Automobile Plans]]). An automobile insurance plan, the assigned risk form, places such an applicant with an insurer. Some states add low-cost policies for low-income drivers, such as California's program, with limits of 10/20/3, and New Jersey's basic policy.
