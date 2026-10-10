---
aliases:
  - Tax Incentive
  - Taxpayers' Perspective
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:39f3d49b53cc2cd680f2ba645d4cc7ca5570060043e93d675bf36cb660a5d1b5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tax Treatment of Retirement Plans.md
---
The **Tax Treatment of Retirement Plans** is the set of rules under which governments favour saving for retirement through a registered or qualified [[Retirement Plan|retirement plan]]: contributions are deductible, investment income is not taxed while it stays in the plan, and benefits are taxed when they are paid. That pattern is called EET (exempt, exempt, taxed). In exchange for the incentive, the law limits how much can be contributed or promised and who must be covered, and the revenue the government gives up, the tax expenditure, is the cost of the plan from the taxpayers' perspective.

> $$W^{\text{EET}} = C\,\ddot{s}_{\overline{n}|i}\,(1 - t_r)$$

> $$W^{\text{TEE}} = C\,(1 - t_w)\,\ddot{s}_{\overline{n}|i}$$

> $$W^{\text{TTE}} = C\,(1 - t_w)\,\ddot{s}_{\overline{n}|i(1-t_w)}$$

- **Symbols:** $C$ is the pre-tax income set aside each year at the start of the year, for $n$ years, at an investment return $i$. $t_w$ is the saver's marginal tax rate while working, $t_r$ the rate on retirement income, and $W$ the after-tax wealth at retirement. The letters name the treatment of contributions, investment income and withdrawals in turn, E for exempt and T for taxed.
- **Why EET helps:** When $t_r = t_w$, EET and TEE give the same wealth, so the gain over ordinary saving (TTE) comes from untaxed investment income. When the saver's rate falls in retirement, EET also gains from deferring tax to a lower bracket. A [[Registered Retirement Savings Plan|TFSA]] in Canada and a Roth account in the United States are TEE.
- **Why governments offer it:** Retirement saving reduces later reliance on [[Social Insurance|social insurance]] and means-tested benefits, and the incentive also lets an employer offer a [[Pension Plan|pension]] that is worth more than the same pay in cash. The incentive is therefore paired with rules that keep it aimed at retirement income for a broad workforce.
- **Contribution and benefit limits:** In Canada the Income Tax Act caps a registered [[Defined Benefit Plan|DB]] pension at a dollar amount per year of service and an accrual rate of 2% of pay, caps [[Defined Contribution Plan|DC]] contributions at the money purchase limit, and reduces RRSP room by the pension adjustment so members of every kind of plan get about the same shelter. In the United States, Internal Revenue Code section 415 limits DB benefits and DC annual additions, and section 401(a)(17) caps the pay a plan may count.
- **Coverage and nondiscrimination:** U.S. qualified plans must pass coverage tests and must not discriminate in favour of highly compensated employees in contributions or benefits. Canadian registration rules instead restrict benefits for connected persons and designated plans. These rules stop the incentive from being used mainly by owners and executives.
- **Pay above the limits:** Benefits above the tax limits are paid from an unregistered [[Executive Retirement Plan|supplementary plan]], which gets no EET treatment. The employer's deduction is deferred until benefits are paid, and the security of the benefit usually depends on the employer.
- **Taxpayers' perspective:** The tax expenditure is measured against a comprehensive income tax, roughly TTE. A design that moves benefits to the highly paid, that lets money leave the plan before retirement, or that is generous only because of the deduction asks taxpayers to fund a goal that is the sponsor's, not the public's.

> [!example]- After-Tax Wealth Under EET, TEE and TTE {Example}
> A worker sets aside \$10,000 of pre-tax income at the start of each year for 30 years, and the investments earn 6% a year. The worker's marginal tax rate is 30% while working. Find the after-tax wealth at retirement under EET, TEE and TTE when the retirement tax rate is 30%, and again under EET when it is 20%. Ignore the timing of withdrawals.
>
> > [!answer]-
> > At 6% the accumulation factor is $\ddot{s}_{\overline{30}|} = 83.8017$. Under TTE the worker invests \$7,000 a year and earns $6\%(1 - 0.30) = 4.2\%$ after tax, where $\ddot{s}_{\overline{30}|4.2\%} = 60.4318$.
> > $$
> > \begin{align*}
> > W^{\text{EET}} &= 10{,}000(83.8017)(0.70) \\
> > &= 586{,}612 \\
> > W^{\text{TEE}} &= 7{,}000(83.8017) \\
> > &= 586{,}612 \\
> > W^{\text{TTE}} &= 7{,}000(60.4318) \\
> > &= 423{,}022 \\
> > W^{\text{EET}}_{t_r = 20\%} &= 10{,}000(83.8017)(0.80) \\
> > &= 670{,}413
> > \end{align*}
> > $$
> > With equal tax rates, EET and TEE both leave the worker \$163,589 better off than TTE, which is the value of the untaxed investment income and the cost of the incentive to taxpayers. A lower rate in retirement adds another \$83,802 under EET, the gain from deferring tax to a lower bracket.

> [!example]- A Canadian Executive Above the Maximum Pension {Example}
> A registered DB plan pays 2% of final average earnings per year of service. An executive retires with 25 years of service and final average earnings of \$300,000. Using an illustrative Income Tax Act defined benefit limit of \$3,600 a year per year of service, find the pension the registered plan may pay, the part that needs a supplementary plan, and the earnings above which the limit binds.
>
> > [!answer]-
> > The registered pension is the lesser of the plan formula and the tax limit, each times service.
> > $$
> > \begin{align*}
> > \text{Formula} &= 0.02(300{,}000)(25) \\
> > &= 150{,}000 \\
> > \text{Max pension} &= 3{,}600(25) \\
> > &= 90{,}000 \\
> > \text{Supplementary} &= 150{,}000 - 90{,}000 \\
> > &= 60{,}000 \\
> > \text{Breakeven pay} &= 3{,}600 / 0.02 \\
> > &= 180{,}000
> > \end{align*}
> > $$
> > The registered plan pays \$90,000 a year, and \$60,000 must come from an unregistered arrangement with no tax shelter. Every member earning more than \$180,000 hits the cap, which is how the limit keeps the incentive from favouring the highly paid.

> [!tip]- How it appears on the exam
> - **RET-101 Plan Design:** Written questions ask a candidate to explain how tax incentives shape plan design, and to apply the contribution limits, benefit limits and coverage rules to a proposed design, noting where the rules conflict with the sponsor's goals.
> - **Taxpayers' perspective:** Questions ask where a sponsor's goal, such as rewarding executives or allowing early access to savings, contradicts the public purpose of the tax preference.
> - **Calculations:** Short calculations compare after-tax outcomes under EET, TEE and TTE, or test a benefit against a maximum and size the supplementary benefit.

> [!warning]- Exam traps
> - **EET is not always better than TEE:** The two give the same wealth when $t_r = t_w$. EET wins only when the retirement rate is lower, and TEE wins when it is higher, for example when retirement income is clawed back from income-tested benefits.
> - **Tax the investment income in TTE:** TTE accumulates at the after-tax return $i(1 - t_w)$. Accumulating the after-tax contribution at the full return $i$ is TEE, not TTE.
> - **Limits apply per year of service:** The Canadian DB limit is a dollar amount per year of service, not a total. Comparing the whole pension to one year's limit wrongly shows almost every pension over the cap.
> - **Supplementary plans are not tax-sheltered:** Benefits above the limits do not get EET treatment. A recommendation that relies on the registered plan to deliver an executive's full target pension ignores the cap.
