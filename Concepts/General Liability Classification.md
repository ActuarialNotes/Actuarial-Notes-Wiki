---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a8ac91f492eb5465b66495cbbd94637b195fae7618092953388393496b528cc8
  sources:
    - "IRMI Expert Commentary, 'The ISO Classification System and the CGL Policy', Rule 25 purpose; code ranges; Rule 25.C; bicycle/moped and outlet examples; classification vs coverage; liquor/shoe repair; classification limitation endorsement; CG 22 50, CG 22 92; audit, sha256:5ff8d6216bca0ffb174a3463b5e9298621240d2aba4ba9481d9487467446334c — https://irmi.com/articles/expert-commentary/the-iso-classification-system-and-the-cgl-policy"
    - "FC&S Editors, 'Bases of Liability Premium', PropertyCasualty360, 9 Oct 2012, all eight bases, sha256:3098468d31acf87f67490601c66a720666953277f266b0692ff23c3d387ab3ed — https://www.propertycasualty360.com/fcs/2012/10/09/bases-of-liability-premium/"
    - "Big 'I' Virtual University, \"'Dagger' or Plus Symbol Classes: What They Mean\", dagger classes, sha256:1fd8d55831527c9c2665b618bb06bc257bfc5aefe3ec495d252dda3980c10f24 — https://www.independentagent.com/vu_resource/dagger-or-plus-symbol-classes-what-they-mean/"
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form, IV.5 Premium Audit; V.16.b(3) PCOH, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/General Liability Classification.md
---

**General Liability Classification** is the assignment of each operation of a [[Commercial General Liability|commercial general liability]] account to a classification in ISO's Commercial Lines Manual (CLM). Each classification has a five-digit code, a description, a premium base, and loss costs for premises and operations and for products-completed operations. Rule 25 of the CLM states the purpose: to group insureds so that the rate for each classification reflects the hazards common to them.

> $$\text{Premium} = \sum_j \frac{E_j}{u_j} \times \big(r_j^{\text{PO}} + r_j^{\text{PCO}}\big)$$

> $$r = \text{Loss cost} \times \text{LCM}$$

- **Symbols:** $E_j$ is the exposure of classification $j$ on its premium base, $u_j$ the unit its rate is quoted per (\$1,000 of sales, 1,000 square feet), and $r_j^{\text{PO}}$ and $r_j^{\text{PCO}}$ its premises and operations and its products-completed operations rates. ISO publishes loss costs, the part of the premium meant for losses only, and each insurer turns them into rates with its own loss cost multiplier (LCM), which in most states must be filed with the insurance department.
- **The code says the kind of business:** The first digits place the insured in a group: mercantile (10000 to 19999), miscellaneous (40000 to 49999), manufacturing or processing (50000 to 59999), building or premises (60000 to 69999), and contracting or servicing (90000 to 99999). Each group has a typical premium base. Manufacturers and stores are rated on gross sales and contractors on payroll, both per \$1,000, while building or premises classes use area per 1,000 square feet or units. See [[Exposure Base]].
- **The premium bases, as the CLM defines them:**
  - *Gross sales* is the gross amount charged for goods sold or distributed, operations performed, rentals, and dues or fees. It includes bad debts, freight allowances and discounts, and excludes sales and excise taxes and finance charges.
  - *Payroll* includes commissions, bonuses, overtime, holiday, vacation and sick pay, the value of lodging, executive officers' pay, and leased and temporary workers. It excludes tips, severance pay, outside salespersons, and drivers whose main duties are on their vehicles.
  - *Area* is the outside horizontal dimensions times the number of floors, basement included, but leaves out floor openings and any basement or floor at least half used for storage, building maintenance, heating, power or air conditioning.
  - *Total cost* is the cost of all work let or sublet, including labor, materials, equipment and fees, the base for work given to subcontractors.
  - *Admissions* is people admitted to events, paid or not, per 1,000. *Units* are separate living quarters, as in apartment buildings. *Each* is a unit named in the classification's footnote, such as each person. *Total operating expenditures* is the base for governmental subdivisions.
- **Choosing the classification:** The CLM directs the underwriter to the classification that best describes the operation, and an account with separate operations gets a classification for each, each rated on its own base. A bicycle manufacturer that also makes mopeds needs a second manufacturing class for the mopeds' sales. Classifying is a judgment, since few businesses fit a description exactly.
- **Products-completed operations:** In a standard classification the premises and operations rate and the products-completed operations rate are separate, and the PCO hazard has its own aggregate limit ([[CGL Limits of Insurance]]). In a classification marked with a plus sign (a "dagger" class), products-completed operations coverage is included in the premises and operations rate at no extra charge, and the classification states that products-completed operations are subject to the general aggregate limit. About 40% of ISO's GL classes were dagger classes, chosen because their products-completed operations exposure is statistically negligible. Getting this right decides both the premium for the [[Products and Completed Operations Liability|products-completed operations]] exposure and which aggregate a loss erodes.
- **Why it matters:** The wrong classification gives a premium that is too high, so the insurer is not competitive, or too low, so it loses money on the account. Some classifications also call for an endorsement, such as the failure-to-supply exclusion for fuel oil dealers or the snowplowing coverage endorsement for snow removal contractors.
- **Classification and coverage:** An unendorsed ISO CGL does not limit coverage to the classified operations, so an unlisted operation is still covered, although a missing classification may be evidence of misrepresentation. Under the representations condition, the classification can bind the insurer: an insurer that classified the insured as a shoe repair shop will find it hard to argue the insured was "in the business" of selling alcohol. Some surplus lines insurers attach a classification limitation endorsement, which excludes injury arising from any classification not scheduled.
- **Misclassification found at audit:** Most CGL policies are subject to [[Premium Audit|premium audit]], and the insurer computes all premiums by its rules and rates (CG 00 01 Section IV, condition 5). At audit it can correct a classification or add one for an operation begun during the policy period, charging on that operation's exposure from the date it began.

> [!example]- A New Operation Found at Audit {Example}
> A bicycle manufacturer is classified in a manufacturing class rated on gross sales, with (hypothetical) rates of \$0.40 premises and operations and \$1.10 products-completed operations per \$1,000. Its deposit premium was based on estimated sales of \$8,000,000. During the year it opened a retail outlet selling and servicing bicycles to the public, which it did not report. At audit, sales to dealers were \$8,400,000 and the outlet had sales of \$600,000. The best mercantile class has rates of \$1.20 and \$0.30. Find the deposit premium and the audit adjustment.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Deposit} &= \frac{8{,}000{,}000}{1{,}000}(0.40 + 1.10) \\
> > &= 12{,}000 \\
> > \text{Earned} &= \frac{8{,}400{,}000}{1{,}000}(1.50) + \frac{600{,}000}{1{,}000}(1.20 + 0.30) \\
> > &= 12{,}600 + 900 \\
> > &= 13{,}500 \\
> > \text{Adjustment} &= 13{,}500 - 12{,}000 \\
> > &= 1{,}500
> > \end{align*}
> > $$
> > The insured owes \$1,500. Claims from the outlet were covered all year, because an unendorsed CGL doesn't restrict coverage to the listed classifications, but the outlet's premium is charged from the day it opened.

> [!example]- Measuring Area {Example}
> A law office is rated on area at a (hypothetical) rate of \$45 per 1,000 square feet. Its building measures 40 by 60 feet on the outside, with two floors and a basement used entirely for the furnace and storage. What is the premium?
>
> > [!answer]-
> > Area is the outside dimensions times the number of floors, basement included, but a basement at least half used for heating and storage is left out.
> > $$
> > \begin{align*}
> > \text{Area} &= 40 \times 60 \times 2 \\
> > &= 4{,}800 \\
> > \text{Premium} &= \frac{4{,}800}{1{,}000} \times 45 \\
> > &= 216
> > \end{align*}
> > $$
> > Counting the basement would have given 7,200 square feet and \$324.

> [!example]- Which Payroll Is Rated? {Example}
> A plumbing contractor rated on payroll at a (hypothetical) \$8.00 per \$1,000 paid its field employees \$640,000 of wages, \$40,000 of overtime and \$20,000 of vacation pay. It also paid \$90,000 to its president, an executive officer, \$60,000 to an outside salesperson, \$50,000 to a truck driver whose main duties are on the truck, and \$15,000 of severance to a laid-off plumber. What is the GL premium?
>
> > [!answer]-
> > Wages, overtime, vacation pay and the executive officer's pay are payroll. The outside salesperson, the driver and the severance pay are excluded.
> > $$
> > \begin{align*}
> > \text{Payroll} &= 640{,}000 + 40{,}000 + 20{,}000 + 90{,}000 \\
> > &= 790{,}000 \\
> > \text{Premium} &= \frac{790{,}000}{1{,}000} \times 8.00 \\
> > &= 6{,}320
> > \end{align*}
> > $$

> [!tip]- How it appears on the exam
> - **DISC-RM:** The objective is classifying general liability accounts. Questions describe a business and ask which classification group and premium base fit it, whether a second operation needs its own classification, or what happens when an audit finds an operation that was not classified.
> - **Products-completed operations:** A question may ask why a class with a plus sign carries no separate products-completed operations charge, or which aggregate a completed-work claim erodes in such a class.
> - **Paired with premium bases:** The next objective, CGL premium bases, builds on this one, so expect a calculation of rate times exposure per unit of the classification's base.

> [!warning]- Exam traps
> - **Per \$1,000, not per \$100:** GL rates on sales and payroll are per \$1,000, unlike workers compensation's per \$100 of payroll.
> - **The classification doesn't define coverage:** An unlisted operation is still covered under an unendorsed CGL. Only a classification limitation endorsement makes the schedule a limit on coverage, and the unlisted operation is charged at audit instead.
> - **GL payroll is not WC payroll:** GL payroll leaves out outside salespersons and drivers whose duties are on their vehicles, so a figure lifted from the workers compensation policy usually needs adjusting.
> - **A dagger class still covers completed work:** Products-completed operations coverage is included in the premises and operations rate, and such claims erode the general aggregate rather than a separate one.
