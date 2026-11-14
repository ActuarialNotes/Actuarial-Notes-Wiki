---
aliases:
  - Commercial Auto Insurance
  - ISO Commercial Automobile Policy
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7ea4910370373757cec8881a58dbbc1976da00c409fe63b30bdb9a64bc6d2f3f
  sources:
    - "ISO CA 00 01 10 13 Business Auto Coverage Form, I.A, I.B; II.A; III, sha256:b8e36d4e31f05a7eaad97cba8b091f8a45cf1ea302e616bad96b4c132c1457e8 — https://assets.touchpointmarkets.com/80/d7/be854d714678be5fefc9d17cc365/ca-00-01-10-13-business-auto-coverage-form.pdf"
    - "FC&S (PropertyCasualty360), 'Standard Commercial Auto Program', 2010, entry, sha256:b10e67950efd26d0bb4c9be857b79609ff3ae9e182974000ce96dae6359856a4 — https://propertycasualty360.com/fcs/2010/03/18/standard-commercial-auto-program"
    - "CAR Commercial Automobile Insurance Manual, Section III Trucks, Tractors and Trailers (eff. 2026.03.01), Rule 52.B (p.2); Rule 53.B-C (p.12); physical damage OCN/age (pp.13, 16), sha256:a695660aba89aad42dac4c609959576580c5213d90b4365dc9a92b39d5481de4 — https://www.commauto.com/manuals/commauto/2026/rules/Section3.pdf"
    - "Verisk, Commercial Auto Underwriting Solutions (2022) — radius misclassification, radius misclassification, sha256:488eb448967865774bea373b6b71c9d3b94e97a92ebc1841b7045cfdb4e7b39f — https://www.verisk.com/siteassets/media/downloads/underwriting/commercial-auto/commercial-auto-underwriting-solutions.pdf"
    - "IRMI Glossary, 'motor vehicle record (MVR)', entry, sha256:b8eac348a0f86568d7e92079c070b64dd60e132e3b3b580e6fc61e1a4892e035 — https://www.irmi.com/term/insurance-definitions/motor-vehicle-record"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Business Auto Coverage.md
---

**Business Auto Coverage** insures a business against [[Liability Insurance|liability]] for bodily injury and property damage arising from the ownership, maintenance or use of its autos, and against physical damage to the autos themselves. In the U.S. it is usually written on the ISO Business Auto Coverage Form, which uses numbered covered auto symbols to say which autos each coverage applies to.

A business with autos faces liability for accidents its drivers cause, including [[Vicarious Liability|vicarious liability]] for employees and liability for negligently entrusting a vehicle to an unfit driver. It also faces damage to or theft of its own vehicles and the loss of their use, injuries to occupants, and liability arising from autos it hires or that its employees drive on its business. Cargo is a separate exposure, insured under inland marine forms.

## Covered auto symbols

Each coverage on the declarations carries its own symbols, so an auto can be covered for liability but not for physical damage:

| Symbol | Covered autos |
| :--- | :--- |
| 1 | Any auto |
| 2 | Owned autos only |
| 3 | Owned private passenger autos only |
| 4 | Owned autos other than private passenger autos |
| 5 | Owned autos subject to no-fault |
| 6 | Owned autos subject to a compulsory uninsured motorists law |
| 7 | Specifically described autos |
| 8 | Hired autos only |
| 9 | Non-owned autos only |
| 19 | Mobile equipment subject to a compulsory or financial responsibility law |

Symbols 1 to 6 and 19 cover new autos of the right kind automatically for the rest of the policy period. Symbol 7 covers a newly acquired auto only if the insurer already covers all the autos the insured owns for that coverage, or the new auto replaces a covered one, and the insured asks for coverage within 30 days.

> [!example]- Which coverages respond to each of these three losses? {Example}
> A consulting firm's business auto declarations show liability with symbols 7, 8 and 9, and collision with symbol 7. All of the firm's owned autos are scheduled. Three losses occur:
>
> 1. A van the firm bought 10 days ago, not yet reported to the insurer, rear-ends another car.
> 2. An employee driving her own car to a client meeting injures a pedestrian.
> 3. A truck the firm rented for an office move is damaged in a collision that was its driver's fault.
>
> > [!answer]-
> > - The insurer already covers every auto the firm owns, so the new van is covered under symbol 7 for liability and collision, provided the firm asks for coverage within 30 days of buying it.
> > - Symbol 9 covers the firm's liability for the employee's car used in its business. The employee is not an insured under the firm's policy for her own car, and her personal auto policy protects her.
> > - Symbol 8 gives liability coverage for the rented truck, but collision is written only with symbol 7, so damage to the truck is not covered.

## Liability coverage

The insurer pays damages for bodily injury and property damage from an accident resulting from the use of a covered auto, and covered pollution cost or expense, up to a single limit for each accident. It has a [[Duty to Defend|duty to defend]] and pays defense costs in addition to the limit. Insureds include the named insured for any covered auto and anyone else using, with permission, a covered auto the named insured owns, hires or borrows, with exceptions such as an employee driving the employee's own car.

The underwriter looks at vehicle type and weight, since a heavy truck causes far more severe injuries than a car. The underwriter also looks at what the vehicles are used for and what they carry, especially hazardous cargo, and at the radius of operation, since long-distance driving means more miles, fatigue and unfamiliar roads. Driver selection is central, through motor vehicle records, age and experience, training and supervision, and so is the fleet's maintenance program.

## Physical damage coverage

Comprehensive covers loss from any cause except collision or overturn, specified causes of loss covers a listed set of perils such as fire, theft, flood and vandalism, and collision covers impact with another object or overturn. The insurer pays the lesser of the auto's [[Actual Cash Value|actual cash value]] and the cost of repair, less the deductible ([[Auto Physical Damage Coverage]]).

The exposure depends on the vehicles' values, ages and types, their theft attractiveness, where they are garaged and parked, and how many sit in one place exposed to hail or flood. The deductible and the choice between comprehensive and specified causes of loss are the underwriter's main tools.

Medical payments, [[Uninsured Automobile Coverage|uninsured motorists]] and no-fault personal injury protection are added by endorsement as each state requires or allows ([[No-Fault Insurance]]).

## Rating a fleet

The liability premium for a fleet is

> $$P_{\text{liab}} = B \times \sum_i \left(f_i + s\right) \times \text{ILF}(L) \times (1 + m)$$

- $B$ is the base liability rate per vehicle for the territory at a basic limit.
- $f_i$ is vehicle $i$'s primary rating factor, which reflects its size class, its use and its radius of operation.
- $s$ is the secondary rating factor for the insured's business classification.
- $\text{ILF}(L)$ is the [[Increased Limits|increased limits factor]] for the limit $L$.
- $m$ is an [[Experience Rating|experience]] or [[Schedule Rating|schedule]] modification.

The manual adds the secondary factor to the primary factor to give each vehicle's combined rating factor, rather than multiplying by it (for example Rule 53 of the CAR Commercial Automobile Insurance Manual). Manual physical damage rating uses the vehicle's original cost new, its age and the rating territory, with relativities for the deductible. With an illustrative rate $r_{\text{PD}}$ per \$100 of value, the physical damage premium is

> $$P_{\text{PD}} = \sum_i r_{\text{PD}} \times \frac{V_i}{100}$$

- $V_i$ is vehicle $i$'s value.

> [!example]- What is this contractor's fleet premium? {Example}
> A building contractor owns three light trucks used locally and two medium trucks that haul materials over an intermediate radius. With illustrative figures:
>
> | Item | Light trucks | Medium trucks |
> | :--- | ---: | ---: |
> | Primary factor | 1.00 | 1.65 |
> | Value per truck ($) | 40,000 | 85,000 |
>
> The base liability rate is \$1,000 per vehicle, the secondary factor for building contractors is +0.10, the increased limits factor for a \$1,000,000 single limit is 1.45, and the underwriter allows a 5% schedule credit. Physical damage is rated at \$2.80 per \$100 of value.
>
> > [!answer]-
> > - The combined factors sum to $3(1.00 + 0.10) + 2(1.65 + 0.10) = 6.80$.
> > - The liability premium is $1{,}000 \times 6.80 \times 1.45 \times 0.95 = \$9{,}367$.
> > - The fleet's value is $3(40{,}000) + 2(85{,}000) = \$290{,}000$.
> > - The physical damage premium is $2.80 \times 290{,}000/100 = \$8{,}120$.
> > - The total premium is $9{,}367 + 8{,}120 = \$17{,}487$.

## Other ISO commercial auto forms

The motor carrier coverage form is for a person or organization providing transportation by auto in the furtherance of a commercial enterprise. The truckers coverage form, which ISO is withdrawing, is for a business transporting property for hire for another. The garage coverage form is issued to franchised and nonfranchised auto and trailer dealers, repair shops, service stations, storage garages and public parking places. The business auto form is used for commercial auto risks that do not meet the eligibility requirements of the other three.

> [!trap] Reading one coverage's symbols as covering every coverage
> Symbol 8 on liability doesn't put hired autos under physical damage. Read the symbols listed against each coverage separately.
