---
aliases:
  - Commercial Auto Insurance
  - ISO Commercial Automobile Policy
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:03b01d3fbe18531a2900e422c862a6e5b6d6e47557b24578c39105e3ab68de09
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
**Business Auto Coverage** insures a business against [[Liability Insurance|liability]] for bodily injury and property damage arising from the ownership, maintenance or use of its autos, and against physical damage to the autos themselves. In the U.S. it is usually written on the ISO Business Auto Coverage Form, which uses numbered covered auto symbols to say which autos each coverage applies to. The form is the core of commercial auto insurance, alongside ISO's motor carrier, truckers and garage coverage forms.

> $$P_{\text{liab}} = B \times \sum_i \left(f_i + s\right) \times \text{ILF}(L) \times (1 + m)$$

> $$P_{\text{PD}} = \sum_i r_{\text{PD}} \times \frac{V_i}{100}$$

- **Symbols:** $B$ is the base liability rate per vehicle for the territory at a basic limit, $f_i$ is vehicle $i$'s primary rating factor, which reflects its size class, its use and its radius of operation, and $s$ is the secondary rating factor for the insured's business classification. The manual adds the secondary factor to the primary factor to give each vehicle's combined rating factor, rather than multiplying by it (for example Rule 53 of the CAR Commercial Automobile Insurance Manual). $\text{ILF}(L)$ is the [[Increased Limits|increased limits factor]] for the limit $L$, and $m$ is an [[Experience Rating|experience]] or [[Schedule Rating|schedule]] modification. In the physical damage premium, $V_i$ is vehicle $i$'s value and $r_{\text{PD}}$ is an illustrative rate per \$100 of value. Manual physical damage rating uses the vehicle's original cost new, its age and the rating territory, with relativities for the deductible.
- **Loss exposures:** A business with autos faces liability for accidents its drivers cause, including vicarious liability for employees and liability for negligently entrusting a vehicle to an unfit driver. It also faces damage to or theft of its own vehicles and the loss of their use, injuries to occupants, and liability arising from autos it hires or that its employees drive on its business. Cargo is a separate exposure, insured under inland marine forms.
- **Covered auto symbols:** Symbol 1 is any auto. Symbols 2 to 6 are owned autos only, owned private passenger autos only, owned autos other than private passenger autos, owned autos subject to no-fault, and owned autos subject to a compulsory uninsured motorists law. Symbol 7 is specifically described autos, 8 hired autos only, 9 non-owned autos only, and 19 mobile equipment subject to a compulsory or financial responsibility law. Each coverage on the declarations carries its own symbols, so an auto can be covered for liability but not for physical damage.
- **Liability coverage:** The insurer pays damages for bodily injury and property damage from an accident resulting from the use of a covered auto, and covered pollution cost or expense, up to a single limit for each accident. It has a [[Duty to Defend|duty to defend]] and pays defense costs in addition to the limit. Insureds include the named insured for any covered auto and anyone else using, with permission, a covered auto the named insured owns, hires or borrows, with exceptions such as an employee driving the employee's own car.
- **Physical damage coverage:** Comprehensive covers loss from any cause except collision or overturn, specified causes of loss covers a listed set of perils such as fire, theft, flood and vandalism, and collision covers impact with another object or overturn. The insurer pays the lesser of the auto's [[Actual Cash Value|actual cash value]] and the cost of repair, less the deductible ([[Auto Physical Damage Coverage]]).
- **Other coverages:** Medical payments, [[Uninsured Automobile Coverage|uninsured motorists]] and no-fault personal injury protection are added by endorsement as each state requires or allows ([[No-Fault Insurance]]).
- **Other ISO commercial auto forms:** The motor carrier coverage form is for a person or organization providing transportation by auto in the furtherance of a commercial enterprise. The truckers coverage form, which ISO is withdrawing, is for a business transporting property for hire for another. The garage coverage form is issued to franchised and nonfranchised auto and trailer dealers, repair shops, service stations, storage garages and public parking places. The business auto form is used for commercial auto risks that do not meet the eligibility requirements of the other three.
- **Liability underwriting:** The underwriter looks at vehicle type and weight, since a heavy truck causes far more severe injuries than a car, at what the vehicles are used for and what they carry, especially hazardous cargo, and at the radius of operation, since long-distance driving means more miles, fatigue and unfamiliar roads. Driver selection is central, through motor vehicle records, age and experience, training and supervision, and so is the fleet's maintenance program.
- **Physical damage underwriting:** The exposure depends on the vehicles' values, ages and types, their theft attractiveness, where they are garaged and parked, and how many sit in one place exposed to hail or flood. The deductible and the choice between comprehensive and specified causes of loss are the underwriter's main tools.

> [!example]- Rating a Small Contractor's Fleet {Example}
> A building contractor owns three light trucks used for service within a local radius and two medium trucks used to haul materials over an intermediate radius. With illustrative figures, the base liability rate is \$1,000 per vehicle, the primary factors are 1.00 for the light trucks and 1.65 for the medium trucks, the secondary rating factor for building contractors is +0.10, the increased limits factor for a \$1,000,000 single limit is 1.45, and the underwriter allows a 5% schedule credit for the contractor's driver training program. Collision and comprehensive together are rated at \$2.80 per \$100 of value, and the light trucks are worth \$40,000 each and the medium trucks \$85,000 each. Find the premium.
>
> > [!answer]-
> > Each vehicle's combined rating factor is its primary factor plus the secondary factor; the account's increased limits factor and schedule credit then apply to the total.
> > $$
> > \begin{align*}
> > \textstyle\sum (f_i + s) &= 3(1.00 + 0.10) + 2(1.65 + 0.10) \\
> > &= 6.80 \\
> > P_{\text{liab}} &= 1{,}000 \times 6.80 \times 1.45 \times 0.95 \\
> > &= 9{,}367.00 \\
> > V &= 3(40{,}000) + 2(85{,}000) \\
> > &= 290{,}000 \\
> > P_{\text{PD}} &= 2.80 \times \frac{290{,}000}{100} \\
> > &= 8{,}120.00
> > \end{align*}
> > $$
> > The total is \$17,487.00. The two medium trucks are 40% of the vehicles but account for 51% of the liability base, because their weight and radius make each accident more severe and more likely.

> [!example]- Which Autos Are Covered? {Example}
> A consulting firm's business auto declarations show liability with symbols 7, 8 and 9, and collision with symbol 7. All of the firm's owned autos are scheduled. Three losses occur: (a) a van the firm bought 10 days ago, not yet reported to the insurer, rear-ends another car; (b) an employee driving her own car to a client meeting injures a pedestrian; (c) a truck the firm rented for an office move is damaged in a collision that was its driver's fault. Which coverages respond?
>
> > [!answer]-
> > (a) Symbol 7 covers a newly acquired auto if the insurer already covers all the autos the firm owns for that coverage, or the new auto replaces a covered one, and the firm asks for coverage within 30 days. Both conditions can be met, so liability responds, and so does collision, since every owned auto has collision. (b) Symbol 9 covers the firm's liability for a non-owned auto used in its business, so the firm is protected if the pedestrian sues it. The employee is not an insured under the firm's policy for her own car, and her personal auto policy is her protection. (c) Symbol 8 gives liability coverage for the rented truck, but collision is written only with symbol 7, so damage to the truck is not covered. The firm owes the rental company for the damage unless it bought the rental company's waiver or added symbol 8 to physical damage.

> [!tip]- How it appears on the exam
> - **DISC-RM:** Questions ask for the underwriting considerations for business auto liability, such as vehicle weight and use, radius, driver selection and maintenance, and for physical damage, such as vehicle value, garaging and catastrophe accumulation.
> - **GI-302:** Candidates describe commercial auto loss exposures and the contents of the ISO commercial auto forms: the business auto form's sections, the covered auto symbols, liability and physical damage coverage, and what the motor carrier, truckers and garage forms add. Applied questions give declarations and a loss and ask which symbol, if any, covers it.

> [!warning]- Exam traps
> - **Symbols are per coverage:** Symbol 8 on liability doesn't put hired autos under physical damage. Read the symbols listed against each coverage separately.
> - **Symbol 7 needs notice:** A newly acquired auto under symbol 7 is covered only on the stated conditions and only if the insured asks for coverage within 30 days. Symbols 1 to 6 and 19 cover new autos of the right kind automatically for the rest of the policy period.
> - **The employee's own car:** Symbol 9 protects the business, not the employee who owns the car. An employee's liability while driving the employee's own auto is a matter for the employee's personal policy.
> - **Primary versus secondary factors:** Size, use and radius describe each vehicle, while the secondary factor describes the business and is added to each vehicle's primary factor, not multiplied by it. Applying a vehicle's factor to the whole fleet misprices a mixed fleet.
> - **Cargo is not auto physical damage:** Damage to the goods a truck carries is an inland marine exposure, not covered by the business auto form's physical damage coverage.
