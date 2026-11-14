---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:ce4205a60fa946a88e34b246c4ffccaf54ac4eed60e676d6915a1c4e0da33ae5
  sources:
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), Coverage C para 1-2 (p.8); Section III paras 2, 5, 7 (pp.10-11); Section V def 20 (p.16), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "ISO PP 00 01 09 18 Personal Auto Policy (Virginia SCC filed copy), Part B Medical Payments, Part B Insuring Agreement, p.5 (services rendered within three years of the accident), sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/CGL Coverage C.md
---

**CGL Coverage C** is the medical payments coverage of the ISO [[Commercial General Liability|Commercial General Liability Coverage Form]] (CG 00 01, 04 13 edition). It pays reasonable medical expenses for bodily injury caused by an accident on premises the named insured owns or rents, on the ways next to them, or because of its operations, regardless of fault. Unlike Coverages A and B, it requires no proof that the insured is legally liable.

Coverage C pays only when three conditions are met:

1. The accident takes place in the coverage territory and during the policy period.
2. The expenses are incurred and reported to the insurer within one year of the accident.
3. The injured person submits to examination, at the insurer's expense, by physicians of its choice as often as it reasonably requires.

It pays reasonable expenses for first aid at the time of the accident; necessary medical, surgical, X-ray and dental services, including prosthetic devices; and necessary ambulance, hospital, professional nursing and funeral services. The payment to injured person $i$ is

> $$\text{Paid}_i = \min\left(E_i,\ M\right)$$

- $E_i$ is person $i$'s reasonable covered expenses incurred and reported to the insurer within one year of the accident.
- $M$ is the Medical Expense limit, which applies per person.

> [!example]- What does Coverage C pay for these three customers hurt in one accident? {Example}
> A shelving unit collapses in a hardware store during the policy period, injuring three customers. The store's CGL has a $\$10{,}000$ Medical Expense limit and a $\$1{,}000{,}000$ each occurrence limit. Within a year, reasonable expenses are reported of $\$2{,}600$ for the first customer, $\$9{,}800$ for the second and $\$14{,}500$ for the third. A store employee was also hurt and received workers compensation benefits.
>
> > [!answer]-
> > - Each customer is paid regardless of fault, up to the $\$10{,}000$ per-person limit.
> > - The customers are paid $\$2{,}600$, $\$9{,}800$ and $\min(14{,}500,\ 10{,}000) = \$10{,}000$.
> > - The employee is excluded twice over: as an insured (exclusion a) and because workers compensation benefits are payable (exclusion d).
> > - Coverage C pays $2{,}600 + 9{,}800 + 10{,}000 = \$22{,}400$.
> > - The $\$22{,}400$ counts toward the each occurrence limit for the collapse and reduces the general aggregate. If the third customer sues for her remaining $\$4{,}500$ and more, that is a Coverage A claim, and her damages must be proved.

## Exclusions

Coverage C pays no expenses for bodily injury:

| Exclusion | Who or what is excluded |
| :--- | :--- |
| a, any insured | Injury to any insured, except "volunteer workers". A partner, an employee or an executive officer is not paid ([[CGL Who Is an Insured]]). |
| b, hired person | A person hired to do work for or on behalf of any insured or a tenant of any insured, such as an independent contractor |
| c, injury on normally occupied premises | A person injured on the part of premises the named insured owns or rents that the person normally occupies, such as a tenant in the apartment it rents from the insured |
| d, workers compensation and similar laws | A person, whether or not an employee of any insured, if benefits for the injury are payable or must be provided under a workers compensation or disability benefits law or a similar law |
| e, athletics activities | A person injured while practicing, instructing or participating in physical exercises or games, sports or athletic contests |
| f, products-completed operations hazard | Injury within the [[Products and Completed Operations Liability|products-completed operations hazard]] |
| g, Coverage A exclusions | Anything excluded under Coverage A, such as an auto accident or injury from expected or intended acts ([[CGL Coverage A Exclusions]]) |

Exclusion b reaches only a person hired, so an unpaid volunteer worker injured on the premises can be paid.

> [!example]- Which of these injuries at an apartment building does Coverage C pay? {Example}
> An apartment building owner's CGL includes Coverage C. During the policy period:
>
> - (a) A tenant slips in her own kitchen.
> - (b) A visitor trips on the building's front steps.
> - (c) A plumber hired by the owner falls from a ladder in the boiler room.
> - (d) A resident twists an ankle in a pickup basketball game in the building's gym.
> - (e) The visitor in (b) reports more physiotherapy expenses fourteen months after the fall.
>
> > [!answer]-
> > - Injury (a) is not paid. Exclusion c removes injury on the part of the premises the person normally occupies.
> > - Injury (b) is paid. It is an accident on premises the named insured owns, to a member of the public, and fault does not matter.
> > - Injury (c) is not paid. Exclusion b removes a person hired to do work for an insured.
> > - Injury (d) is not paid. Exclusion e removes injury while participating in games or sports.
> > - The expenses in (e) are not paid. Expenses must be incurred and reported within one year of the accident.

## Coverage C alongside Coverage A

A Coverage C payment does not stop the injured person from claiming damages under Coverage A, but the two share the each occurrence limit for the accident, and both reduce the general aggregate ([[CGL Limits of Insurance]]). For one occurrence,

> $$\sum_i \text{Paid}_i + D_A \le L_{\text{occ}}$$

- $D_A$ is the Coverage A damages paid for the same occurrence.
- $L_{\text{occ}}$ is the each occurrence limit.

The Coverage A payment is therefore the lesser of the damages and the each occurrence limit left after the Coverage C payments. The personal auto policy's Part B is a different coverage with different rules ([[Medical Payments Coverage]]).

> [!trap] Using the personal auto policy's three years
> The CGL requires expenses incurred and reported within one year of the accident. The three-year window belongs to the personal auto policy's medical payments coverage.
