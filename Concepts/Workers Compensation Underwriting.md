---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:cbf0bee8c52082ddcc710eb203c6cb7be39a9833282b3f0f7a6c070162fab910
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

**Workers Compensation Underwriting** is the evaluation of an employer for a U.S. workers compensation and employers liability policy, the NCCI form WC 00 00 00 C. Part One pays the benefits the state's workers compensation law requires, and Part Two covers the employer's liability for injury to its employees that falls outside that law. The underwriter weighs the employer's operations and class codes, its payroll, its experience modification, its safety programs, the benefit levels of the states involved, and how many employees it concentrates in one place.

> $$\text{Premium} = M \times \sum_c \frac{P_c}{100} \times r_c$$

> $$\text{Audit adjustment} = \text{Premium}_{\text{actual } P_c} - \text{Premium}_{\text{estimated } P_c}$$

- **Symbols:** $P_c$ is the payroll (remuneration) in classification $c$, $r_c$ the rate per $\$100$ of payroll for that class, and $M$ the experience rating modification, or mod. The premium on the information page uses estimated payroll, and the final premium uses the audited payroll, the proper classes and the rates that apply (Part Five E). If the final premium is more than what was paid, the employer pays the balance, and if it is less, the insurer refunds it.
- **Part One, workers compensation:** The policy pays promptly when due the benefits the workers compensation law of each state listed in Item 3.A of the information page requires, for bodily injury by accident that occurs during the policy period, or by disease where the employee's last day of last exposure to the conditions causing it falls in the policy period. It has no dollar limit, and the insurer has the right and duty to defend claims for those benefits. Federal compensation laws are not part of the "workers compensation law" the policy follows. The employer must repay anything paid above the regular statutory benefits because of its serious and willful misconduct, knowingly employing someone in violation of law, breaking a health or safety law, or discriminating against an employee in violation of the compensation law.
- **Part Two, employers liability:** It pays damages the employer is legally obligated to pay because of bodily injury to an employee that arises out of and in the course of employment, including a third party's suit against the employer over the employee's injury, claims for care and loss of services, consequential injury to a spouse, child, parent, brother or sister, and suits against the employer in a capacity other than employer. It has limits, shown in Item 3.B: bodily injury by accident, each accident, and bodily injury by disease, a policy limit and an each-employee limit. It excludes, among others, liability assumed under a contract, obligations imposed by a workers compensation or similar law, injury the employer intentionally causes, employment practices claims, and work subject to federal laws such as the Longshore and Harbor Workers' Compensation Act, FELA and maritime crew obligations.
- **Part Three, other states:** Coverage extends to the states listed in Item 3.C if the employer begins work there after the policy starts. Work the employer already has, on the effective date, in a state not listed in Item 3.A is covered only if the insurer is told within thirty days, so the underwriter asks where the employer works now and where it may work next.
- **The state sets the cost:** Because Part One pays what the statute requires, the benefits behind the rate differ by state. Texas, for example, publishes a maximum weekly income benefit tied to its state average weekly wage, \$1,271 for injuries from October 2025 through September 2026. Employers must buy coverage in nearly all states, but Texas lets most private employers choose not to carry it, and in the four monopolistic states (North Dakota, Ohio, Washington and Wyoming) the state administers its own plans and rates. Canada's provincial boards are a different system, described in [[Workers Compensation Insurance]].

## What the underwriter weighs

- **Operations and classification:** Under NCCI's Basic Manual it is the employer's business in a state that is classified, not each employee's job. The **governing classification** is the basic classification with the most payroll. A few common jobs are **standard exceptions** rated on their own: clerical office employees (Code 8810, or 8871 for telecommuters) whose work area is physically separated from the operating hazards, drivers (7380), and outside salespersons (8742). A second basic classification is allowed only in set cases, such as construction, or an operation that could exist as a separate business, is physically separated, and has its own payroll records. An additional operation that fails those tests is rated at the principal business's class if its rate is lower, and the whole business takes the additional operation's class if its rate is higher or equal. Misdescribed exposures are reclassified by endorsement (Part Five B). See [[Workers Compensation Classification]].
- **Payroll and its audit:** Remuneration is the usual [[Exposure Base|premium base]]. It includes the pay of everyone engaged in covered work, and of anyone else whose injury could make the insurer liable under Part One, such as an uninsured subcontractor's workers. If the employer has no payroll records for them, the contract price for their services and materials is used, unless the employer proves the subcontractor secured its own compensation coverage. The insurer may audit during the policy period and for three years after, and the final premium cannot be less than the highest minimum premium of the policy's classes. See [[Premium Audit]].
- **Experience rating:** NCCI's [[Experience Rating|experience rating]] plan is mandatory for an employer that meets the state's premium eligibility. It compares the employer's losses, usually from the three most recent available policy years, with those expected for its classes and size. Each loss is split at a split point, \$18,000 in most states, into a primary part that reflects frequency and an excess part that reflects severity. The primary part carries more weight, and only 30% of a medical-only claim enters the formula in most states. A mod below 1.00 is a credit and above 1.00 a debit, and a debit mod tells the underwriter to review the employer's safety program.
- **Loss control and safety:** The insurer may inspect workplaces at any time to judge insurability and premium (Part Six A), though its inspections are not safety inspections and it does not warrant the workplace is safe. The mod gives the employer an incentive to prevent injuries and to return injured employees to work quickly. Underwriters ask about safety programs, loss trends, emergency plans and how injured workers are brought back. See [[Risk Control]].
- **Accumulation of employees:** A workers compensation policy has no limit on Part One and cannot exclude terrorism, so the insurer's exposure to one event is unlimited. Insurers track how many insured employees are concentrated in one building, campus or ZIP code, first for earthquakes and, since 2001, for terrorism ([[TRIA]]), and they limit the capacity they deploy in an area or surcharge a large concentration. Hotels, hospitals, financial institutions, universities and professional services firms often face this. Peak-shift headcounts, building locations and the share of staff working elsewhere let the employer show its real exposure.
- **The residual market:** Every state except the monopolistic ones has a workers compensation assigned risk plan for employers the voluntary market won't write, and every insurer writing the line in the state participates.

> [!example]- Premium, Mod and an Uninsured Subcontractor {Example}
> A roofing contractor estimates \$1,200,000 of roofing payroll at a (hypothetical) rate of \$18.00 per \$100 and \$150,000 of clerical office payroll at \$0.20, and its mod is 0.85. At audit, roofing payroll was \$1,320,000, and it also paid \$150,000 to a subcontractor that did roofing work and kept no payroll records. The contractor has no certificate showing the subcontractor carried workers compensation. Find the estimated premium and the audit adjustment.
>
> > [!answer]-
> > Because the subcontractor's workers could make the insurer liable under Part One, the contract price is added to roofing payroll.
> > $$
> > \begin{align*}
> > \text{Estimated} &= 0.85 \times \left(\frac{1{,}200{,}000}{100}(18.00) + \frac{150{,}000}{100}(0.20)\right) \\
> > &= 0.85 \times 216{,}300 \\
> > &= 183{,}855 \\
> > \text{Final} &= 0.85 \times \left(\frac{1{,}470{,}000}{100}(18.00) + \frac{150{,}000}{100}(0.20)\right) \\
> > &= 0.85 \times 264{,}900 \\
> > &= 225{,}165 \\
> > \text{Adjustment} &= 225{,}165 - 183{,}855 \\
> > &= 41{,}310
> > \end{align*}
> > $$
> > The contractor owes \$41,310 of additional premium. Had it produced a certificate of the subcontractor's coverage, the \$150,000 would have been left out and the adjustment would have been \$18,360.

> [!example]- Which Classes Apply? {Example}
> A bakery has \$220,000 of payroll for its bakers, \$120,000 for staff in its retail shop, and \$240,000 for office staff who work on a separate floor away from the ovens. One office worker spends her day in the warehouse checking deliveries against invoices. What is the governing classification, and how is the warehouse worker rated?
>
> > [!answer]-
> > The governing classification is the bakery's basic classification with the most payroll, bakery (Code 2003), even though the clerical payroll is larger, because Code 8810 is a standard exception and never governs when a basic class applies. The office staff qualify for 8810: their duties are clerical and their work area is separated from the operating hazards by a floor. The warehouse worker does clerical tasks but in an area exposed to the business's hazards, so she does not meet the site requirement and is rated in the business's class, not 8810.

> [!example]- Frequency Versus Severity in the Mod {Example}
> Two employers in the same class each have expected losses of \$100,000, of which \$30,000 is expected primary. With a (hypothetical) excess weight $w = 0.10$ and ballast $B = 30{,}000$, and a split point of \$18,000, employer A had one \$60,000 claim and employer B had ten \$6,000 claims. Compute each mod using
> $$M = \frac{A_p + w A_e + (1 - w) E_e + B}{E_p + w E_e + (1 - w) E_e + B}$$
> where $A_p, A_e$ are actual primary and excess losses and $E_p, E_e$ expected primary and excess.
>
> > [!answer]-
> > A's claim splits into \$18,000 primary and \$42,000 excess, and B's ten claims are all primary. Expected excess is \$70,000, and the denominator is $30{,}000 + 7{,}000 + 63{,}000 + 30{,}000 = 130{,}000$.
> > $$
> > \begin{align*}
> > M_A &= \frac{18{,}000 + 0.10(42{,}000) + 63{,}000 + 30{,}000}{130{,}000} \\
> > &= \frac{115{,}200}{130{,}000} \\
> > &= 0.886 \\
> > M_B &= \frac{60{,}000 + 0 + 63{,}000 + 30{,}000}{130{,}000} \\
> > &= \frac{153{,}000}{130{,}000} \\
> > &= 1.177
> > \end{align*}
> > $$
> > Both had \$60,000 of losses, but B's frequency earns a debit mod and A's single large claim a credit, which is how the plan treats frequency as the better predictor.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The objective asks for the considerations in underwriting workers compensation. Questions describe an employer and ask which factor matters most: its class codes and whether a job is a standard exception, its payroll and how audit will change it, its mod and what a debit or credit says, its safety program, or a concentration of employees.
> - **Coverage recognition:** A question may ask whether an injury is paid under Part One or Part Two, or why Part One carries no limit while Part Two does.
> - **Premium arithmetic:** Expect payroll per \$100 times the class rate, summed over classes, times the mod, and the audit adjustment that follows.

> [!warning]- Exam traps
> - **Payroll is per \$100:** Workers compensation rates are per \$100 of payroll, while general liability rates are usually per \$1,000. Dividing by the wrong unit gives a premium ten times too large or small.
> - **Clerical payroll never governs:** The governing class is the basic classification with the most payroll, even when a standard exception such as 8810 has more.
> - **Uninsured subcontractors count:** Payments to a subcontractor without its own coverage are added to the premium base at audit unless the employer proves the subcontractor was insured.
> - **Total losses are not the mod:** Two employers with the same total losses can get very different mods, because primary losses (frequency) carry more weight than excess losses (severity).
> - **No limit, no terrorism exclusion:** Part One pays whatever the statute requires, so a large concentration of employees is an accumulation risk the underwriter can't cap with a policy limit.
