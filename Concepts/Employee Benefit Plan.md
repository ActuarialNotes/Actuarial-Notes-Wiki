---
aliases:
  - Employee Benefit Strategy
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3f0c079270d7493e8febe7c4508b04198c079c7bdb58b3fc3e6764c53564bb2e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Employee Benefit Plan.md
---
An **Employee Benefit Plan** is the program of insured and self-funded benefits an employer provides to its employees and their dependents in addition to pay, such as medical, prescription drug, dental and vision coverage, [[Group Life Insurance|group life]] and [[Disability Income Insurance|disability income]] insurance, and tax-advantaged accounts. An **employee benefit strategy** is the employer's choice of which benefits to offer, how rich to make them, how to fund them and how to split their cost with employees, set to meet its objectives for attracting and keeping staff, cost and risk.

A typical U.S. plan offers one or more medical plans with drug coverage, dental and vision, basic and supplemental life, and short and long-term disability, often with a [[Retirement Plan|retirement plan]] alongside. Many employers add a high-deductible health plan paired with a health savings account (HSA). Some give employees a fixed contribution to spend on a private exchange or a flexible benefits menu.

## Why employers offer benefits

Benefits help attract and keep employees and keep them healthy and productive. Some are required by law or expected under a collective agreement. Benefits are also tax-efficient. In the U.S., the employer's contribution to health coverage is not taxable income to the employee, and employee contributions can be paid before tax through a cafeteria plan.

## Funding

For each benefit the employer chooses between fully insured, self-funded with stop-loss protection, and arrangements in between. Self-funding shifts the claim risk to the employer and saves premium taxes and some insurer margins. It suits larger employers, whose claims are more predictable.

## Contribution strategy

Coverage is priced by tier, such as employee only, employee plus spouse, employee plus children, and family. The monthly premium, or premium equivalent for a self-funded plan, for tier $j$ is

> $$R_j = \rho_j\,R_{\text{EE}}$$

- $\rho_j$ is the tier's ratio to the employee-only rate.
- $R_{\text{EE}}$ is the employee-only monthly premium.

If the employer pays a share $k_j$ of the tier's cost, the employee's contribution per pay period is

> $$C^{\text{EE}}_j = \frac{12\,(1 - k_j)\,R_j}{p}$$

- $p$ is the number of pay periods in a year.

With $N_j$ employees enrolled in tier $j$, the employer's annual cost is

> $$\text{ER cost} = 12 \sum_{j} N_j\,k_j\,R_j$$

The employer can pay a percentage of each tier's cost, a fixed dollar amount, or a percentage of the employee-only cost plus a smaller share for dependents. It can vary contributions by plan option, salary band or wellness participation. The split decides who bears the cost of trend. Under a percentage strategy the employer and the employees share it in proportion. Under a fixed-dollar strategy the employees bear all of it, so their contribution grows faster than the premium: with a $\$700$ premium and a $\$560$ employer contribution, the employee pays $\$140$, and a 7% premium increase raises that by 35%.

> [!example]- What does each tier pay per pay period, and what does the plan cost the employer? {Example}
> An employer pays 80% of the cost of every tier, and employees are paid biweekly, 26 times a year. An employee with family coverage has a combined marginal tax rate of 30%.
>
> | Tier | Monthly premium ($) | Enrolled |
> | :--- | ---: | ---: |
> | Employee only | 700 | 400 |
> | Employee + spouse | 1,470 | 150 |
> | Employee + children | 1,260 | 100 |
> | Family | 2,030 | 250 |
>
> > [!answer]-
> > - The tier ratios are 1.0, 2.1, 1.8 and 2.9.
> > - The employer pays 80% a month: $\$560$, $\$1{,}176$, $\$1{,}008$ and $\$1{,}624$.
> > - The employees pay the other 20%: $\$140$, $\$294$, $\$252$ and $\$406$ a month.
> > - Per pay period that is $12 \times 406 / 26 = \$187.38$ for family, and $\$64.62$, $\$135.69$ and $\$116.31$ for the other tiers.
> > - Across the tiers' enrollment the employer pays $\$224{,}000 + \$176{,}400 + \$100{,}800 + \$406{,}000 = \$907{,}200$ a month.
> > - Its annual cost is $12 \times 907{,}200 = \$10{,}886{,}400$, which is 80% of the $\$13{,}608{,}000$ total.
> > - The family employee contributes $\$4{,}872$ a year, so paying it before tax saves $0.30 \times 4{,}872 = \$1{,}461.60$ of tax.

## Selection effects

Contributions shape who enrolls. High dependent contributions push spouses who can get coverage elsewhere off the plan. When several options are offered, healthier employees choose the cheaper plans, which is [[Adverse Selection|adverse selection]] between options. A contribution strategy is therefore priced together with the enrollment it is expected to produce, and pricing a change on today's enrollment overstates the saving when the members who leave are the healthier ones.

> [!example]- What does paying only 50% of the dependent tiers save this employer? {Example}
> The employer above considers paying 80% of the employee-only cost but only 50% of the cost of the three dependent tiers.
>
> > [!answer]-
> > - The employer now pays $\$560$, $\$735$, $\$630$ and $\$1{,}015$ a month for the four tiers.
> > - The family contribution per pay period rises to $12 \times 1{,}015 / 26 = \$468.46$, from $\$187.38$.
> > - On unchanged enrollment the employer pays $\$224{,}000 + \$110{,}250 + \$63{,}000 + \$253{,}750 = \$651{,}000$ a month.
> > - Its annual cost is $12 \times 651{,}000 = \$7{,}812{,}000$.
> > - That saves $\$3{,}074{,}400$ a year, and the employer's share of the total cost falls from 80% to 57.4%.
> > - Some spouses and children with other coverage will leave the plan, and they tend to be the healthier ones, so the true saving is less than this.
> > - The change may also hurt the plan's standing against competitors for staff with families.

## Setting a strategy

A strategy starts from the employer's objectives: its target position against competitors, its budget, its workforce and its tolerance for risk. The actuary then:

1. Benchmarks the current plan.
2. Models options for design, funding and contributions.
3. Projects their cost with [[Medical Cost Trend|medical trend]].
4. Recommends the option that best meets the objectives, tying each recommendation to one of them.

A recommendation that minimizes cost without regard to a stated objective, such as being a leading employer in its market, misses what the case asks.

> [!trap] Converting a monthly contribution to biweekly pay
> A year has 26 biweekly pays, not 24. A monthly contribution of $\$406$ is $12 \times 406 / 26 = \$187.38$ per pay, not $\$203.00$. Convert through the annual amount.
