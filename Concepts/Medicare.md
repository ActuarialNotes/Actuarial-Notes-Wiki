---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a031b57dcabbd7c5f5ab73b540538fc1c6bc61987c5626f029bea4a2c81c9131
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Medicare.md
---

**Medicare** is the U.S. federal [[Social Insurance|social insurance]] program that pays for health care for people aged 65 and over, for younger people who have received Social Security disability benefits for two years, and for people with end-stage renal disease. It is run by the Centers for Medicare & Medicaid Services (CMS) in four parts: hospital insurance (Part A), medical insurance (Part B), private Medicare Advantage plans (Part C) and prescription drug coverage (Part D). A Medicare Advantage plan is paid a monthly amount per member that CMS sets from the plan's bid and adjusts for each member's expected cost.

> $$R_i = \left(d_i + \sum_{h \in H_i} \beta_h\right) \frac{1 - c}{N}$$

> $$\text{Pay}_i = R_i \times \min(b,\ B)$$

> $$\text{Rebate} = \rho \times \max(B - b,\ 0)$$

- **Symbols:** $R_i$ is member $i$'s risk score under the CMS hierarchical condition category (CMS-HCC) model. $d_i$ is the demographic factor for the member's age, sex, Medicaid status and reason for entitlement, $H_i$ is the set of condition categories the member's diagnoses map to, and $\beta_h$ is the coefficient of category $h$. $N$ is the normalization factor and $c$ the coding adjustment. $b$ is the plan's bid and $B$ the benchmark, both for a member of average risk, per member per month (PMPM), and $\rho$ is the rebate percentage.
- **Part A, hospital insurance:** Part A pays for inpatient hospital stays, skilled nursing facility care after a hospital stay, hospice and some home health care, subject to a deductible per benefit period. It is financed mainly by a payroll tax on employers and employees, and most beneficiaries pay no premium for it because they or a spouse paid that tax while working.
- **Part B, medical insurance:** Part B pays for physician services, outpatient care, preventive services and durable medical equipment. It is voluntary, with a monthly premium that funds about a quarter of its cost and general federal revenue funding the rest. The beneficiary pays an annual deductible and coinsurance of 20% of allowed charges, and Original Medicare (Parts A and B) has no out-of-pocket maximum.
- **Part C, Medicare Advantage (MA):** A beneficiary can instead enroll in a private MA plan, usually a managed care plan with a network, which must cover everything Parts A and B cover. Each plan submits a bid for that coverage, and CMS compares it with a county benchmark derived from fee-for-service spending, increased for plans with high quality star ratings. A plan that bids below the benchmark is paid its bid and receives a rebate of part of the difference, which it must return to members as extra benefits or lower premiums. A plan that bids above it is paid the benchmark, and its members pay the excess as a premium.
- **Risk adjustment:** CMS pays each MA member's capitation at the plan's rate times the member's risk score, so a plan with sicker members is paid more and has no reason to avoid them. The CMS-HCC model is prospective: diagnoses recorded in one year predict cost in the next. Within a hierarchy of related conditions only the most severe one counts. Scores are divided by a normalization factor, so that the average fee-for-service beneficiary scores 1.0 in the payment year, and reduced for the more complete coding that MA plans achieve compared with fee-for-service.
- **Part D, prescription drugs:** Drug coverage is sold by private plans, either alone or within an MA plan, which bid against a national average and are paid with their own risk adjustment model (RxHCC).
- **Medicare Supplement:** Private Medicare Supplement (Medigap) policies pay the deductibles and coinsurance of Original Medicare. The benefits come in standardized plans identified by letters, so insurers compete on price and service rather than coverage. The claim cost moves with Medicare's own cost sharing, which makes its trend leveraged.
- **Medicare in Canada:** In Canadian usage, "medicare" means the provincial single-payer system of [[Health Care Insurance]], which covers the whole population. The U.S. program leaves most people under 65 to employer coverage, [[Medicaid]] and individual coverage.

> [!example]- A Medicare Advantage Member's Monthly Payment {Example}
> A Medicare Advantage plan bids \$1,000 PMPM for Part A and B benefits for a member of average risk, against a county benchmark of \$1,100. Its star rating earns a rebate percentage of 65%. A member has an illustrative demographic factor of 0.45 and diagnoses mapping to two condition categories with illustrative coefficients 0.30 (diabetes with chronic complications) and 0.33 (congestive heart failure). The normalization factor is 1.05 and the coding adjustment 5.9%. Find the plan's rebate per member and its payment for this member.
>
> > [!answer]-
> > The bid is below the benchmark, so the plan is paid on its bid and keeps 65% of the difference as a rebate.
> > $$
> > \begin{align*}
> > \text{Rebate} &= 0.65 \times (1{,}100 - 1{,}000) \\
> > &= 65.00 \\
> > R &= (0.45 + 0.30 + 0.33)\times\frac{1 - 0.059}{1.05} \\
> > &= 1.08 \times 0.896190 \\
> > &= 0.9679 \\
> > \text{Pay} &= 0.9679 \times 1{,}000 \\
> > &= 967.90
> > \end{align*}
> > $$
> > The plan is paid \$967.90 a month for this member, and the \$65.00 rebate must fund supplemental benefits or lower premiums. The raw score of 1.08 falls below 1.0 once normalization and the coding adjustment are applied.

> [!example]- Leveraged Trend in a Medicare Supplement Plan {Example}
> A Medicare Supplement plan pays the Part A inpatient deductible and the 20% Part B coinsurance, but not the Part B deductible. With illustrative figures, members have 0.25 admissions a year, the Part A deductible is \$1,600, each member has \$6,000 of Part B allowed charges a year, and the Part B deductible is \$250. Find the annual claim cost and the PMPM. Then find the increase in the Part B claim cost if allowed charges rise 6% and the Part B deductible does not change.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > C_A &= 0.25 \times 1{,}600 \\
> > &= 400 \\
> > C_B &= 0.20 \times (6{,}000 - 250) \\
> > &= 1{,}150 \\
> > \text{PMPM} &= \frac{400 + 1{,}150}{12} \\
> > &= 129.17
> > \end{align*}
> > $$
> > After the increase in allowed charges:
> > $$
> > \begin{align*}
> > C_B' &= 0.20 \times (6{,}360 - 250) \\
> > &= 1{,}222 \\
> > \frac{C_B'}{C_B} - 1 &= \frac{1{,}222}{1{,}150} - 1 \\
> > &= 6.26\%
> > \end{align*}
> > $$
> > The supplement's Part B cost rises faster than the 6% allowed-charge trend because the fixed deductible absorbs none of the increase. When Medicare raises its own deductibles, the supplement plan's cost rises for the same reason.

> [!tip]- How it appears on the exam
> - **GH-301:** The Healthcare Risk Adjustment section asks candidates to apply risk adjustment to underwriting, pricing, claims and care management, with Medicare among the named applications, and to use it to normalize population claims experience. The calculation builds a member's or a population's risk score from demographic and condition factors and turns it into a payment or a risk-adjusted cost.
> - **CP-321:** Medicare Supplement is one of the long-duration contracts in the Plan and Product Provisions section, and a Manual Rates reading covers pricing its benefits. Candidates describe the contract and who offers it, and calculate assumptions and manual rates for it.
> - **GH-201U:** The candidate describes Medicare benefits and evaluates pricing and filing requirements, which for Medicare Advantage means the bid against the benchmark.

> [!warning]- Exam traps
> - **Raw and payment scores:** The payment uses the risk score after normalization and the coding adjustment. Multiplying the base rate by the raw sum of factors overpays a plan whose members score above 1.0 by several percent.
> - **Hierarchies:** A member with both a severe and a milder form of the same condition is given only the severe category's coefficient. Adding both double counts the condition.
> - **The rebate is not profit:** A plan that bids below the benchmark is paid its bid, not the benchmark, and its rebate must go back to members. Treating the whole difference as revenue overstates the plan's income.
> - **Prospective timing:** Diagnoses from the base year set the score for the payment year. A condition first diagnosed during the payment year does not raise that year's payment.
> - **Supplement versus Advantage:** A Medicare Supplement policy pays the cost sharing of Original Medicare and is not used with a Medicare Advantage plan, which replaces Original Medicare's cost sharing with its own. Pricing a supplement off MA cost sharing gets the benefit wrong.
