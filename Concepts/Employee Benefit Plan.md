---
aliases:
  - Employee Benefit Strategy
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e14e7a68c6f9ef62f622143669021d0bb51069c95a580aa319eac9c71a1681cc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Employee Benefit Plan.md
---
An **Employee Benefit Plan** is the program of insured and self-funded benefits an employer provides to its employees and their dependents in addition to pay, such as medical, prescription drug, dental and vision coverage, [[Group Life Insurance|group life]] and [[Disability Income Insurance|disability income]] insurance, and tax-advantaged accounts. An **employee benefit strategy** is the employer's choice of which benefits to offer, how rich to make them, how to fund them and how to split their cost with employees, set to meet its objectives for attracting and keeping staff, cost and risk.

> $$R_j = \rho_j\,R_{\text{EE}}$$

> $$C^{\text{EE}}_j = \frac{12\,(1 - k_j)\,R_j}{p}$$

> $$\text{ER cost} = 12 \sum_{j} N_j\,k_j\,R_j$$

- **Symbols:** $R_j$ is the monthly premium, or premium equivalent for a self-funded plan, for coverage tier $j$, such as employee only, employee plus spouse, employee plus children, and family. $\rho_j$ is the tier's ratio to the employee-only rate $R_{\text{EE}}$. $k_j$ is the share of the tier's cost the employer pays, $C^{\text{EE}}_j$ is the employee's contribution per pay period, $p$ is the number of pay periods in a year, and $N_j$ is the number of employees enrolled in the tier.
- **What the plan comprises:** A typical U.S. plan offers one or more medical plans with drug coverage, dental and vision, basic and supplemental life, short and long-term disability, and often a [[Retirement Plan|retirement plan]] alongside. Many employers add a high-deductible health plan paired with a health savings account (HSA), and some give employees a fixed contribution to spend on a private exchange or a flexible benefits menu.
- **Why employers offer it:** Benefits help attract and keep employees and keep them healthy and productive, and some are required by law or expected under a collective agreement. Benefits are also tax-efficient: in the U.S., the employer's contribution to health coverage is not taxable income to the employee, and employee contributions can be paid before tax through a cafeteria plan.
- **Funding:** The employer chooses for each benefit between fully insured, self-funded with stop-loss protection, and arrangements in between. Self-funding shifts the claim risk to the employer and saves premium taxes and some insurer margins, so it suits larger employers whose claims are more predictable.
- **Contribution strategy:** The employer sets employee contributions by tier. It can pay a percentage of each tier's cost, a fixed dollar amount, or a percentage of the employee-only cost plus a smaller share for dependents, and it can vary contributions by plan option, salary band or wellness participation. The split decides who bears the cost of trend: under a percentage strategy the employer and the employees share it in proportion, and under a fixed-dollar strategy the employees bear all of it.
- **Selection effects:** Contributions shape who enrolls. High dependent contributions push spouses who can get coverage elsewhere off the plan, and when several options are offered, healthier employees choose the cheaper plans, which is [[Adverse Selection|adverse selection]] between options. A contribution strategy is therefore priced together with the enrollment it is expected to produce.
- **Setting a strategy:** A strategy starts from the employer's objectives, such as its target position against competitors, its budget, its workforce and its tolerance for risk. The actuary benchmarks the current plan, models options for design, funding and contributions, projects their cost with [[Medical Cost Trend|medical trend]], and recommends the option that best meets the objectives.

> [!example]- Contributions Under a Percentage-of-Cost Strategy {Example}
> An employer's medical plan has monthly premiums of \$700 for employee only, \$1,470 for employee plus spouse, \$1,260 for employee plus children and \$2,030 for family. Enrollment is 400, 150, 100 and 250 employees. The employer pays 80% of the cost of every tier, and employees are paid biweekly, with 26 pay periods a year. Find each tier's employee contribution per pay period and the employer's annual cost. An employee with family coverage has a combined marginal tax rate of 30%; how much does paying the contribution before tax save?
>
> > [!answer]-
> > The tier ratios are 1.0, 2.1, 1.8 and 2.9. For family coverage, the employer pays $0.8 \times 2{,}030 = 1{,}624$ dollars a month and the employee pays \$406.
> > $$
> > \begin{align*}
> > C^{\text{EE}}_{\text{fam}} &= \frac{12 \times 406}{26} \\
> > &= 187.38 \\
> > \text{ER cost} &= 12\,(400 \times 560 + 150 \times 1{,}176 \\
> > &\quad + 100 \times 1{,}008 + 250 \times 1{,}624) \\
> > &= 10{,}886{,}400
> > \end{align*}
> > $$
> > The other contributions per pay period are \$64.62 for employee only, \$135.69 for employee plus spouse and \$116.31 for employee plus children. The family employee contributes \$4,872 a year, so paying it before tax saves $0.30 \times 4{,}872 = 1{,}461.60$ dollars of tax. The employer pays 80% of the \$13,608,000 total cost.

> [!example]- Lowering the Employer's Share for Dependents {Example}
> The same employer considers paying 80% of the employee-only cost but only 50% of the cost of the three dependent tiers. Assuming enrollment doesn't change, find the new family contribution per pay period and the employer's saving.
>
> > [!answer]-
> > The employer now pays \$560, \$735, \$630 and \$1,015 a month for the four tiers.
> > $$
> > \begin{align*}
> > C^{\text{EE}}_{\text{fam}} &= \frac{12 \times 1{,}015}{26} \\
> > &= 468.46 \\
> > \text{ER cost} &= 12\,(400 \times 560 + 150 \times 735 \\
> > &\quad + 100 \times 630 + 250 \times 1{,}015) \\
> > &= 7{,}812{,}000
> > \end{align*}
> > $$
> > The employer saves \$3,074,400 a year, and its share of the total cost falls from 80% to 57.4%. The family contribution rises from \$187.38 to \$468.46 a pay period, so the employer should expect some spouses and children with access to other coverage to leave the plan. Those who leave tend to be the healthier ones, so the true saving is less than the static calculation, and the change may hurt the plan's standing against competitors for staff with families.

> [!tip]- How it appears on the exam
> - **GH-101 objective 4a:** Written questions ask candidates to describe the structure of employee benefit plans and the products in them, such as HDHPs with HSAs, private exchanges and Canadian flexible benefits, and to explain why an employer would offer each structure.
> - **GH-101 objective 4b:** Case questions describe an employer's workforce, objectives and current plan and ask for a recommended benefit strategy, including a payroll contribution strategy, with the reasons for it and its risks.
> - **Calculation:** Questions give tier rates, enrollment and a contribution policy and ask for the employee contributions per pay period and the employer's cost, sometimes before and after a change in design or trend.

> [!warning]- Exam traps
> - **Pay periods:** A monthly contribution of \$406 is \$187.38 per biweekly pay, not \$203.00, because a year has 26 biweekly pays, not 24. Convert through the annual amount.
> - **Who bears trend:** Under a fixed-dollar employer contribution, the employee's contribution grows faster than the premium. A \$700 premium with a \$560 employer contribution leaves \$140 for the employee, and a 7% premium increase raises that by 35%.
> - **Static enrollment:** A contribution change moves enrollment between tiers and plan options. Pricing the change on today's enrollment overstates the saving when the members who leave are the healthier ones.
> - **Objectives first:** A recommendation that minimizes cost without regard to the employer's stated objectives, such as being a leading employer in its market, loses the marks the case is built on. Tie each recommendation to an objective.
