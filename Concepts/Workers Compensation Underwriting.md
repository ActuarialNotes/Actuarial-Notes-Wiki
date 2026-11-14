---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:72a9b096a5390d1c648da54cff4d736af02f92ba376275aaa0f1df81053edf4f
  sources:
    - "NCCI WC 00 00 00 C (Ed. 1-15) Workers Compensation and Employers Liability Insurance Policy (Guard copy), General Section C; Part One A-F; Part Two A-C; Part Three; Part Five B, C, E, G; Part Six A, sha256:f0723f4875806fb2237386a91b554c3edbdb10b94315204ab8bb19696a1e64dd — https://policyholder.guard.com/wwwroot/static/Policy_Docs/POLICY_WC-2015-01.pdf"
    - "NCCI, ABCs of Experience Rating (CEIWC copy), pp.2-4, 10-11, sha256:268bbb28e4894f10ca942274a62ac2bcd6237e9278ddd1df8f414da99e0f31ed — https://www.ceiwc.com/PDFs/ABCs-of-Experience-Rating-NCCI.pdf"
    - "North Carolina Basic Manual (NCRB), Rule 1 – Assignment of Classifications, 1-A, 1-B-2, 1-B-5 table, 1-D-3, sha256:cf8907fcf5fbe01060a1f9cebaf941c349f947b039c59e56356fe3f474042190 — https://www.ncrb.org/digitallibrary/basicmanual/Rule_1_-_Assignment_of_Classifications.htm"
    - "Marsh, 'What TRIPRA's Approaching Expiration Means for Workers' Compensation Programs' (Nov 2019), pp.1-2, sha256:7e1e9b8050931b6ae102f02670106b56d0f7cd78f9570ca2dac845b3da21ae37 — https://www.marsh.com/content/dam/marsh/Documents/PDF/US-en/tripra-expiration-and-workers-compensation-programs.pdf"
    - "Insurance Thought Leadership (Marsh), 'Employee Concentration Impacting Workers' Compensation Renewals', entry, sha256:069c1273909e9f4499661a3390a3541a5c4663bd8aff764398a089099ee9e0e8 — https://www.insurancethoughtleadership.com/commercial-lines/employee-concentration-impacting-workers-compensation-renewals"
    - "Texas Department of Insurance, maximum and minimum weekly benefits, FY2026 row, sha256:3f8f1a20ad7813d115e3e8dbb1161e5d693b47522706dcf6066483e28c5d64dc — https://tdi.texas.gov/wc/employee/maxminbens.html"
    - "Texas Department of Insurance, employer workers' compensation page, entry, sha256:6de23951e8eba909520e9384d0c03a3ed3b8caa2aa7c9f6f434ca3a29dd537e8 — https://www.tdi.texas.gov/wc/employer/index.html"
    - "IRMI Glossary, 'assigned risk plan', entry, sha256:b73e8f7c5737d90162c6e7c7cd52ddd8261413a8690d122faabd5d13f0992fad — https://www.irmi.com/term/insurance-definitions/assigned-risk-plan"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Workers Compensation Underwriting.md
---

**Workers Compensation Underwriting** is the evaluation of an employer for a U.S. workers compensation and employers liability policy, the NCCI form WC 00 00 00 C. The underwriter weighs the employer's operations and class codes, its payroll, its experience modification, its safety programs, the benefit levels of the states involved, and how many employees it concentrates in one place.

Remuneration is the usual [[Exposure Base|premium base]]. With payroll $P_c$ in classification $c$ and a rate $r_c$ per $\$100$ of payroll for that class, the premium is

> $$\text{Premium} = M \times \sum_c \frac{P_c}{100} \times r_c$$

- $M$ is the experience rating modification, or mod.

The rate is per $\$100$ of payroll, where general liability rates are usually per $\$1{,}000$. The premium on the information page uses estimated payroll. The final premium uses the audited payroll, the proper classes and the rates that apply (Part Five E), so the audit adjustment is

> $$\text{Audit adjustment} = \text{Premium}_{\text{actual } P_c} - \text{Premium}_{\text{estimated } P_c}$$

- A positive adjustment is paid by the employer, and a negative one is refunded by the insurer.

The premium base includes the pay of everyone engaged in covered work, and of anyone else whose injury could make the insurer liable under Part One, such as an uninsured subcontractor's workers. If the employer has no payroll records for them, the contract price for their services and materials is used, unless the employer proves the subcontractor secured its own compensation coverage. The insurer may audit during the policy period and for three years after, and the final premium cannot be less than the highest minimum premium of the policy's classes ([[Premium Audit]]).

> [!example]- What are this roofing contractor's estimated premium and its audit adjustment? {Example}
> A roofing contractor's mod is 0.85. Its rates are hypothetical. At audit, it had also paid \$150,000 to a subcontractor that did roofing work and kept no payroll records, and the contractor has no certificate showing the subcontractor carried workers compensation.
>
> | Class | Rate per \$100 | Estimated payroll | Audited payroll |
> | :--- | ---: | ---: | ---: |
> | Roofing | 18.00 | 1,200,000 | 1,320,000 |
> | Clerical office | 0.20 | 150,000 | 150,000 |
>
> > [!answer]-
> > - The estimated premium is $0.85 \times (12{,}000 \times 18.00 + 1{,}500 \times 0.20) = 0.85 \times 216{,}300 = \$183{,}855$.
> > - The subcontractor's workers could make the insurer liable under Part One, so the \$150,000 contract price is added to roofing payroll, which becomes \$1,470,000.
> > - The final premium is $0.85 \times (14{,}700 \times 18.00 + 1{,}500 \times 0.20) = 0.85 \times 264{,}900 = \$225{,}165$.
> > - The contractor owes $225{,}165 - 183{,}855 = \$41{,}310$ of additional premium. With a certificate of the subcontractor's coverage, the \$150,000 would have been left out and the adjustment would have been \$18,360.

## The policy's three parts

Part One, workers compensation, pays promptly when due the benefits the workers compensation law of each state listed in Item 3.A of the information page requires. It covers bodily injury by accident that occurs during the policy period, and by disease where the employee's last day of last exposure to the conditions causing it falls in the policy period. It has no dollar limit.

Part Two, employers liability, pays damages the employer is legally obligated to pay because of bodily injury to an employee that arises out of and in the course of employment, outside the compensation law. It includes a third party's suit against the employer over the employee's injury, claims for care and loss of services, and consequential injury to a spouse, child, parent, brother or sister. It has limits, shown in Item 3.B: bodily injury by accident, each accident, and bodily injury by disease, a policy limit and an each-employee limit. These limits do not apply to Part One. It excludes, among others, liability assumed under a contract, obligations imposed by a workers compensation or similar law, injury the employer intentionally causes, and employment practices claims.

Part Three, other states, extends coverage to the states listed in Item 3.C if the employer begins work there after the policy starts. Work the employer already has, on the effective date, in a state not listed in Item 3.A is covered only if the insurer is told within thirty days, so the underwriter asks where the employer works now and where it may work next.

Because Part One pays what the statute requires, the benefits behind the rate differ by state. Texas, for example, publishes a maximum weekly income benefit tied to its state average weekly wage, \$1,271 for injuries from October 2025 through September 2026. In the four monopolistic states (North Dakota, Ohio, Washington and Wyoming) the state administers its own plans and rates. Every other state has a workers compensation assigned risk plan for employers the voluntary market won't write. Canada's provincial boards are a different system, described in [[Workers Compensation Insurance]].

## Classification

Under NCCI's Basic Manual it is the employer's business in a state that is classified, not each employee's job ([[Workers Compensation Classification]]). The **governing classification** is the basic classification with the most payroll. A few common jobs are **standard exceptions** rated on their own: clerical office employees (Code 8810, or 8871 for telecommuters) whose work area is physically separated from the operating hazards, drivers (7380), and outside salespersons (8742). A standard exception never governs when a basic classification applies, even if it has more payroll.

A second basic classification is allowed only in set cases, such as construction, or an operation that could exist as a separate business, is physically separated, and has its own payroll records.

> [!example]- What is this bakery's governing classification, and how is the warehouse worker rated? {Example}
> A bakery has \$220,000 of payroll for its bakers, \$120,000 for staff in its retail shop, and \$240,000 for office staff who work on a separate floor away from the ovens. One office worker spends her day in the warehouse checking deliveries against invoices.
>
> > [!answer]-
> > - The governing classification is bakery (Code 2003), the basic classification with the most payroll.
> > - The clerical payroll is larger, but Code 8810 is a standard exception and never governs when a basic class applies.
> > - The office staff qualify for 8810: their duties are clerical and their work area is separated from the operating hazards by a floor.
> > - The warehouse worker does clerical tasks in an area exposed to the business's hazards, so she does not meet the site requirement and is rated in the business's class.

## Experience rating

NCCI's [[Experience Rating|experience rating]] plan is mandatory for an employer that meets the state's premium eligibility. It compares the employer's losses, usually from the three most recent available policy years, with those expected for its classes and size. Each loss is split at a split point, \$18,000 in most states, into a primary part that reflects frequency and an excess part that reflects severity. The primary part carries more weight, and only 30% of a medical-only claim enters the formula in most states. With an excess weight $w$ and a ballast $B$, the mod is

> $$M = \frac{A_p + w A_e + (1 - w) E_e + B}{E_p + E_e + B}$$

- $A_p$ and $A_e$ are the actual primary and excess losses.
- $E_p$ and $E_e$ are the expected primary and excess losses.

A mod below 1.00 is a credit and above 1.00 a debit. A debit mod tells the underwriter to review the employer's safety program. The mod gives the employer an incentive to prevent injuries and to return injured employees to work quickly.

> [!example]- Which of these two employers, with the same total losses, gets the higher mod? {Example}
> Two employers in the same class each have expected losses of \$100,000, of which \$30,000 is expected primary. The split point is \$18,000, and the (hypothetical) excess weight is $w = 0.10$ and the ballast $B = 30{,}000$. Employer A had one \$60,000 claim. Employer B had ten \$6,000 claims.
>
> > [!answer]-
> > - A's claim splits into \$18,000 primary and \$42,000 excess. B's ten claims are all primary.
> > - Expected excess is \$70,000, so the denominator is $30{,}000 + 70{,}000 + 30{,}000 = 130{,}000$, and $(1 - w)E_e = 63{,}000$.
> > - $M_A = (18{,}000 + 4{,}200 + 63{,}000 + 30{,}000)/130{,}000 = 0.886$.
> > - $M_B = (60{,}000 + 0 + 63{,}000 + 30{,}000)/130{,}000 = 1.177$.
> > - B's frequency earns a debit mod and A's single large claim a credit, which is how the plan treats frequency as the better predictor.

## Accumulation of employees

A workers compensation policy has no limit on Part One and cannot exclude terrorism, so the insurer's exposure to one event is unlimited. Insurers track how many insured employees are concentrated in one building, campus or ZIP code, first for earthquakes and, since 2001, for terrorism ([[TRIA]]). They limit the capacity they deploy in an area or surcharge a large concentration. Peak-shift headcounts, building locations and the share of staff working elsewhere let the employer show its real exposure.

> [!trap] Letting clerical payroll govern
> The governing class is the basic classification with the most payroll, even when a standard exception such as 8810 has more. Picking the class with the largest payroll overall makes an office the governing class of a bakery or a roofer.
