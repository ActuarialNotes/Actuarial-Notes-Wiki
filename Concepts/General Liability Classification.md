---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:789ecfa005dba3ac49be99dcce1d7ef159a677e2eb5d132151cb43e7546670f7
  sources:
    - "IRMI Expert Commentary, 'The ISO Classification System and the CGL Policy', Rule 25 purpose; code ranges; Rule 25.C; bicycle/moped and outlet examples; classification vs coverage; liquor/shoe repair; classification limitation endorsement; CG 22 50, CG 22 92; audit, sha256:5ff8d6216bca0ffb174a3463b5e9298621240d2aba4ba9481d9487467446334c — https://irmi.com/articles/expert-commentary/the-iso-classification-system-and-the-cgl-policy"
    - "FC&S Editors, 'Bases of Liability Premium', PropertyCasualty360, 9 Oct 2012, all eight bases, sha256:3098468d31acf87f67490601c66a720666953277f266b0692ff23c3d387ab3ed — https://www.propertycasualty360.com/fcs/2012/10/09/bases-of-liability-premium/"
    - "Big 'I' Virtual University, \"'Dagger' or Plus Symbol Classes: What They Mean\", dagger classes, sha256:1fd8d55831527c9c2665b618bb06bc257bfc5aefe3ec495d252dda3980c10f24 — https://www.independentagent.com/vu_resource/dagger-or-plus-symbol-classes-what-they-mean/"
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form, IV.5 Premium Audit; V.16.b(3) PCOH, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/General Liability Classification.md
---

**General Liability Classification** is the assignment of each operation of a [[Commercial General Liability|commercial general liability]] account to a classification in ISO's Commercial Lines Manual (CLM). Each classification has a five-digit code, a description, a premium base, and loss costs for premises and operations and for products-completed operations.

Rule 25 of the CLM states the purpose: to group insureds so that the rate for each classification reflects the hazards common to them.

If an account's operation in classification $j$ has exposure $E_j$ on that classification's premium base, its general liability premium is

> $$\text{Premium} = \sum_j \frac{E_j}{u_j} \times \big(r_j^{\text{PO}} + r_j^{\text{PCO}}\big)$$

- $u_j$ is the unit the rate is quoted per, such as $\$1{,}000$ of sales or 1,000 square feet.
- $r_j^{\text{PO}}$ is the premises and operations rate of classification $j$.
- $r_j^{\text{PCO}}$ is its products-completed operations rate.

ISO publishes [[Loss Cost|loss costs]], the part of the premium meant for losses only. Each insurer turns a loss cost into a rate with its own loss cost multiplier (LCM), which in most states must be filed with the insurance department, so a rate is

> $$r = \text{Loss cost} \times \text{LCM}$$

## Classification groups and premium bases

The first digits of the code place the insured in a group:

| Group | Codes |
| --- | --- |
| Mercantile | 10000 to 19999 |
| Miscellaneous | 40000 to 49999 |
| Manufacturing or processing | 50000 to 59999 |
| Building or premises | 60000 to 69999 |
| Contracting or servicing | 90000 to 99999 |

Each group has a typical premium base, its [[Exposure Base|exposure base]]. Manufacturers and stores are rated on gross sales and contractors on payroll, both per $\$1{,}000$, while building or premises classes use area per 1,000 square feet or units.

The CLM defines each premium base:

- **Gross sales** is the gross amount charged for goods sold or distributed, operations performed, rentals, and dues or fees. It includes bad debts, freight allowances and discounts, and excludes sales and excise taxes and finance charges.
- **Payroll** includes commissions, bonuses, overtime, holiday, vacation and sick pay, the value of lodging, executive officers' pay, and leased and temporary workers. It excludes tips, severance pay, outside salespersons, and drivers whose main duties are on their vehicles, so a payroll figure taken from the workers compensation policy usually needs adjusting.
- **Area** is the outside horizontal dimensions times the number of floors, basement included. It leaves out floor openings and any basement or floor at least half used for storage, building maintenance, heating, power or air conditioning.
- **Total cost** is the cost of all work let or sublet, including labor, materials, equipment and fees. It is the base for work given to subcontractors, whose exposure the insured's own payroll does not measure.
- **Admissions** is the number of people admitted to events, paid or not, per 1,000.
- **Units** are separate living quarters, as in apartment buildings.
- **Each** is a unit named in the classification's footnote, such as each person.
- **Total operating expenditures** is the base for governmental subdivisions.

> [!example]- What is this law office's general liability premium? {Example}
> A law office is rated on area at a rate of $\$45$ per 1,000 square feet. Its building measures 40 by 60 feet on the outside and has two floors and a basement used entirely for the furnace and storage.
>
> > [!answer]-
> > - The basement is at least half used for heating and storage, so it is left out of the area.
> > - The area is $40 \times 60 \times 2 = 4{,}800$ square feet.
> > - The premium is $4{,}800/1{,}000 \times 45 = \$216$.
> > - Counting the basement would have given 7,200 square feet and $\$324$.

> [!trap] GL rates are per \$1,000, not per \$100
> General liability rates on sales and payroll are per $\$1{,}000$ of exposure. Workers compensation rates are per $\$100$ of payroll, and applying a GL rate per $\$100$ overstates the premium tenfold.

## Choosing the classification

The CLM directs the underwriter to the classification that best describes the operation. An account with separate operations gets a classification for each, each rated on its own base. A bicycle manufacturer that also makes mopeds needs a second manufacturing class for the mopeds' sales. Classifying is a judgment, since few businesses fit a description exactly.

The wrong classification gives a premium that is too high, so the insurer is not competitive, or too low, so it loses money on the account. Some classifications also call for an endorsement, such as the failure-to-supply exclusion for fuel oil dealers.

## Products-completed operations and plus-sign classes

In a standard classification the premises and operations rate and the products-completed operations rate are separate, and the [[Products and Completed Operations Liability|products-completed operations]] hazard has its own aggregate limit ([[CGL Limits of Insurance]]).

In a classification marked with a plus sign (a "dagger" class), products-completed operations coverage is included in the premises and operations rate at no extra charge, and the classification states that products-completed operations are subject to the general aggregate limit. Such claims erode the general aggregate rather than a separate one. About 40% of ISO's GL classes were dagger classes, chosen because their products-completed operations exposure is statistically negligible.

## Classification and coverage

An unendorsed ISO CGL does not limit coverage to the classified operations, so an unlisted operation is still covered. A missing classification may be evidence of misrepresentation.

The classification can also bind the insurer under the representations condition. An insurer that classified the insured as a shoe repair shop will find it hard to argue the insured was "in the business" of selling alcohol.

Some surplus lines insurers attach a classification limitation endorsement, which excludes injury arising from any classification not scheduled. Only that endorsement makes the schedule a limit on coverage.

## Misclassification found at audit

Most CGL policies are subject to [[Premium Audit|premium audit]], and the insurer computes all premiums by its rules and rates (CG 00 01 Section IV, condition 5). At audit it can correct a classification, or add one for an operation begun during the policy period and charge that operation's exposure from the date it began.

> [!example]- What audit adjustment does this bicycle manufacturer owe? {Example}
> A bicycle manufacturer is in a manufacturing class rated on gross sales at $\$0.40$ premises and operations and $\$1.10$ products-completed operations per $\$1{,}000$. Its deposit premium was based on estimated sales of $\$8{,}000{,}000$. During the year it opened a retail outlet selling and servicing bicycles, which it did not report. At audit, sales to dealers were $\$8{,}400{,}000$ and the outlet's sales were $\$600{,}000$. The best mercantile class has rates of $\$1.20$ and $\$0.30$.
>
> > [!answer]-
> > - The deposit premium is $8{,}000 \times (0.40 + 1.10) = \$12{,}000$.
> > - The manufacturing premium on actual sales is $8{,}400 \times 1.50 = \$12{,}600$.
> > - The outlet is added in the mercantile class from the day it opened, at $600 \times (1.20 + 0.30) = \$900$.
> > - The earned premium is $12{,}600 + 900 = \$13{,}500$.
> > - The insured owes $13{,}500 - 12{,}000 = \$1{,}500$. Claims from the outlet were covered all year, because an unendorsed CGL does not restrict coverage to the listed classifications.
